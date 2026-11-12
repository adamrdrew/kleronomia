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
    alt: "The fine veins of a newly unfurling green leaf, with its edges falling into soft focus.",
    position: "50% 50%",
  },
  dog: {
    ...metadata.dog,
    study: "02",
    title: "Companionship",
    alt: "The amber eye of a golden-brown dog and individual hairs in sharp focus, with the muzzle softly blurred.",
    position: "58% 42%",
  },
  child: {
    ...metadata.child,
    study: "03",
    title: "Curiosity",
    alt: "A close profile of a child, with eyelashes and freckles in focus against a softly blurred background.",
    position: "52% 42%",
  },
  city: {
    ...metadata.city,
    study: "04",
    title: "Civilization",
    alt: "Weathered limestone and a bronze window frame, with the rest of the city facade fading into soft focus.",
    position: "50% 50%",
  },
  bee: {
    ...metadata.bee,
    study: "05",
    title: "Interdependence",
    alt: "A honeybee’s eye, pollen-covered hairs, and translucent wing seen close among cream-colored petals.",
    position: "43% 45%",
  },
  grain: {
    ...metadata.grain,
    study: "06",
    title: "Abundance",
    alt: "Ripe golden grain kernels and fine awns in a narrow plane of focus.",
    position: "50% 50%",
  },
  bark: {
    ...metadata.bark,
    study: "07",
    title: "Continuity",
    alt: "A ridge of tree bark and pale lichen in sharp focus, with the surrounding surface softly blurred.",
    position: "60% 45%",
  },
  piano: {
    ...metadata.piano,
    study: "08",
    title: "Human possibility",
    alt: "A fingertip touching a worn ivory-colored piano key while neighboring keys fall out of focus.",
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
