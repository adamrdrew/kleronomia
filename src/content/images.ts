import metadata from "./image-metadata.json";
export const editorialImageIds = [
  "leaf",
  "dog",
  "child",
  "city",
  "bee",
  "grain",
  "bark",
  "piano",
] as const;
export type EditorialImageId = (typeof editorialImageIds)[number];
export const editorialImages = {
  leaf: {
    ...metadata.leaf,
    study: "01",
    title: "New growth",
    alt: "Fine veins on an unfurling green leaf; its edges fade out of focus.",
    position: "50% 50%",
  },
  dog: {
    ...metadata.dog,
    study: "02",
    title: "Companionship",
    alt: "A golden-brown dog’s amber eye and fine hairs in sharp focus; its muzzle blurs.",
    position: "58% 42%",
  },
  child: {
    ...metadata.child,
    study: "03",
    title: "Curiosity",
    alt: "A child in profile, with eyelashes and freckles in focus against a blurred background.",
    position: "52% 42%",
  },
  city: {
    ...metadata.city,
    study: "04",
    title: "Civilization",
    alt: "Weathered limestone and a bronze window frame in focus against a blurred facade.",
    position: "50% 50%",
  },
  bee: {
    ...metadata.bee,
    study: "05",
    title: "Interdependence",
    alt: "A close view of a honeybee’s eye, pollen-covered hairs, and translucent wing among cream-colored petals.",
    position: "43% 45%",
  },
  grain: {
    ...metadata.grain,
    study: "06",
    title: "Abundance",
    alt: "Ripe golden grain, with kernels and fine awns in focus.",
    position: "50% 50%",
  },
  bark: {
    ...metadata.bark,
    study: "07",
    title: "Continuity",
    alt: "Tree bark and pale lichen in sharp focus against a blurred surface.",
    position: "60% 45%",
  },
  piano: {
    ...metadata.piano,
    study: "08",
    title: "Human possibility",
    alt: "A fingertip touches a worn ivory-colored piano key; neighboring keys blur.",
    position: "52% 56%",
  },
} as const;
export const topicImages: Record<string, EditorialImageId> = {
  Philosophy: "bark",
  Acceleration: "grain",
  Governance: "city",
  "Human Flourishing": "child",
  "The Future": "leaf",
};
