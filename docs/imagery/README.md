# Photographic studies for the Kleronomia Society

Eight original images generated with the **built-in `image_gen` tool** for this site. The visual brief is intimate, extremely close photography with a narrow plane of sharp detail: physical subjects remain recognizable while their textures become almost abstract. Soft natural light, warm ivory, olive, ochre, and deep shadows connect the collection to the editorial design.

## Final website assets

| Study | Subject                                  | Saved asset                                                        |
| ----- | ---------------------------------------- | ------------------------------------------------------------------ |
| 01    | A newly unfolding leaf                   | [new-leaf.webp](../../public/images/editorial/new-leaf.webp)       |
| 02    | A dog's amber eye and fur                | [companion.webp](../../public/images/editorial/companion.webp)     |
| 03    | A child's eyelashes and freckled profile | [curiosity.webp](../../public/images/editorial/curiosity.webp)     |
| 04    | Limestone and a bronze city window       | [city-stone.webp](../../public/images/editorial/city-stone.webp)   |
| 05    | A bee, pollen, and a translucent wing    | [pollinator.webp](../../public/images/editorial/pollinator.webp)   |
| 06    | Ripe grain and awns                      | [grain.webp](../../public/images/editorial/grain.webp)             |
| 07    | Living bark and lichen                   | [living-bark.webp](../../public/images/editorial/living-bark.webp) |
| 08    | A fingertip and a worn piano key         | [human-touch.webp](../../public/images/editorial/human-touch.webp) |

The exact final prompt set is in [prompts.json](prompts.json). The original generation locations from this session are recorded in [sources.json](sources.json); the site uses only the final workspace assets listed above and does not depend on those original locations.

## Editing and reuse

`src/content/images.ts` is the central catalog of descriptions, focus positions, and study titles. `src/content/image-metadata.json` holds actual dimensions and small blur placeholders. Each publication selects a study with the typed `image` field in its MDX frontmatter. The reusable `EditorialPhoto` and `PhotoStudy` components render responsive Next.js images with reserved dimensions and lazy loading, with a preloaded homepage hero.

Image descriptions identify physical content; card thumbnails are decorative alongside their linked essay titles. The generated nature of the collection is disclosed in the footer and the About page. Images depict imagined subjects rather than Society members, a specific city, or documentary events.

The leaf is the homepage hero. On mobile, the section index comes before the photograph. Other home sections pair bark with inheritance, the dog with companionship, the piano with participation, city stone with governance, and a child's profile with human flourishing. The Principles diptych uses a pollinator and grain; the Future and topic pages use matching studies. All 24 existing essays have selected covers and matching library thumbnails.

`node scripts/prepare-editorial-images.mjs` converts the recorded generated originals to WebP and rebuilds dimension/placeholder metadata. It performs format preparation, with no new generation. To use it on another machine, first update `sources.json` to locally available original files. The optimized images are already included and need no regeneration for development or deployment.
