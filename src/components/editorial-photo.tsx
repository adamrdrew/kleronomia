import Image from "next/image";
import { editorialImages, type EditorialImageId } from "@/content/images";
export function EditorialPhoto({
  image,
  className = "",
  sizes = "(max-width: 720px) calc(100vw - 48px), 44vw",
  preload = false,
  decorative = false,
}: {
  image: EditorialImageId;
  className?: string;
  sizes?: string;
  preload?: boolean;
  decorative?: boolean;
}) {
  const asset = editorialImages[image];
  return (
    <div className={`editorial-photo ${className}`} data-study={asset.study}>
      <Image
        src={asset.src}
        alt={decorative ? "" : asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        preload={preload}
        placeholder="blur"
        blurDataURL={asset.blurDataURL}
        style={{ objectPosition: asset.position }}
      />
    </div>
  );
}
export function PhotoStudy({
  image,
  className = "",
  sizes,
}: {
  image: EditorialImageId;
  className?: string;
  sizes?: string;
}) {
  const asset = editorialImages[image];
  return (
    <figure className={`photo-study ${className}`}>
      <EditorialPhoto image={image} sizes={sizes} />
      <figcaption>
        <span>STUDY {asset.study}</span>
        <span>{asset.title}</span>
      </figcaption>
    </figure>
  );
}
