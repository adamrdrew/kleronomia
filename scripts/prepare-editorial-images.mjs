import fs from "node:fs/promises";
import sharp from "sharp";
const sources = JSON.parse(
  await fs.readFile(
    new URL("../docs/imagery/sources.json", import.meta.url),
    "utf8",
  ),
);
const filenames = {
  leaf: "new-leaf",
  dog: "companion",
  child: "curiosity",
  city: "city-stone",
  bee: "pollinator",
  grain: "grain",
  bark: "living-bark",
  piano: "human-touch",
};
const destination = new URL("../public/images/editorial/", import.meta.url);
await fs.mkdir(destination, { recursive: true });
const metadata = {};
for (const [key, source] of Object.entries(sources)) {
  const target = new URL(`${filenames[key]}.webp`, destination);
  const info = await sharp(source)
    .rotate()
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 6 })
    .toFile(target.pathname);
  const blur = await sharp(source)
    .resize({ width: 24 })
    .webp({ quality: 35 })
    .toBuffer();
  metadata[key] = {
    src: `/images/editorial/${filenames[key]}.webp`,
    width: info.width,
    height: info.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  process.stdout.write(
    `${key}: ${info.width} × ${info.height}, ${Math.round(info.size / 1024)} KB\n`,
  );
}
await fs.writeFile(
  new URL("../src/content/image-metadata.json", import.meta.url),
  JSON.stringify(metadata, null, 2) + "\n",
);
