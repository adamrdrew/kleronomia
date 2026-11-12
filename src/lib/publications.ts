import "server-only";
import { editorialImageIds } from "@/content/images";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { cache } from "react";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { featuredSlugs } from "@/content/library";
const frontmatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  author: z.string().default("The Kleronomia Society"),
  category: z.enum([
    "Philosophy",
    "Acceleration",
    "Governance",
    "Human Flourishing",
    "The Future",
  ]),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (value) =>
        !Number.isNaN(Date.parse(value)) &&
        new Date(value).toISOString().slice(0, 10) === value,
      "Invalid date",
    )
    .optional(),
  image: z.enum(editorialImageIds).optional(),
  cover: z.string().startsWith("/images/").optional(),
});
export type Publication = z.infer<typeof frontmatter> & {
  slug: string;
  body: string;
  readingTime: number;
};
export const getPublications = cache((): Publication[] => {
  const directory = path.join(process.cwd(), "src/content/publications");
  const articles = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(directory, file), "utf8"),
      );
      return {
        ...frontmatter.parse(data),
        slug: file.replace(/\.mdx$/, ""),
        body: content,
        readingTime: Math.max(
          1,
          Math.ceil(content.trim().split(/\s+/).length / 220),
        ),
      };
    })
    .sort(
      (a, b) =>
        (b.date || "").localeCompare(a.date || "") ||
        a.title.localeCompare(b.title),
    );
  for (const article of articles)
    for (const related of article.related)
      if (!articles.some((a) => a.slug === related))
        throw new Error(
          `Unknown related essay "${related}" in ${article.slug}`,
        );
  return articles;
});
export const getPublication = (slug: string) =>
  getPublications().find((a) => a.slug === slug);
export function getFeaturedPublications() {
  return featuredSlugs.map((slug) => {
    const article = getPublication(slug);
    if (!article) throw new Error(`Unknown featured essay: ${slug}`);
    return article;
  });
}
export function relatedPublications(article: Publication) {
  return getPublications()
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      const score = (item: Publication) =>
        (article.related.includes(item.slug)
          ? 100 - article.related.indexOf(item.slug)
          : 0) +
        (item.category === article.category ? 10 : 0) +
        item.tags.filter((tag) => article.tags.includes(tag)).length;
      return score(b) - score(a);
    })
    .slice(0, 3);
}
interface ContentNode {
  type: string;
  value?: string;
  children?: ContentNode[];
  depth?: number;
}
function nodeText(node: ContentNode): string {
  return node.value || node.children?.map(nodeText).join("") || "";
}
export function getArticleHeadings(body: string) {
  const tree = unified().use(remarkParse).parse(body);
  const slugger = new GithubSlugger();
  return tree.children
    .filter((node) => node.type === "heading")
    .flatMap((node) => {
      const title = nodeText(node);
      const id = `section-${slugger.slug(title)}`;
      return node.type === "heading" && node.depth <= 3
        ? [{ title, id, depth: node.depth }]
        : [];
    });
}
