import "server-only";
import { topics, readingPaths, type ReadingPath } from "@/content/library";
import { getPublication, getPublications } from "./publications";
export const getTopic = (slug: string) =>
  topics.find((topic) => topic.slug === slug);
export const topicForCategory = (category: string) =>
  topics.find((topic) => topic.category === category)!;
export const getReadingPath = (slug: string) =>
  readingPaths.find((path) => path.slug === slug);
export function pathArticles(path: ReadingPath) {
  return path.steps.map((step) => {
    const article = getPublication(step.slug);
    if (!article)
      throw new Error(
        `Unknown essay in reading path ${path.slug}: ${step.slug}`,
      );
    return { ...step, article };
  });
}
export const pathDuration = (path: ReadingPath) =>
  pathArticles(path).reduce((sum, step) => sum + step.article.readingTime, 0);
export const pathsForArticle = (slug: string) =>
  readingPaths.filter((path) => path.steps.some((step) => step.slug === slug));
export function topicArticles(category: string) {
  return getPublications().filter((a) => a.category === category);
}
