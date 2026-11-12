export const topics = [
  {
    slug: "philosophy",
    category: "Philosophy",
    title: "Our place in a world of greater intelligence.",
    shortTitle: "Intelligence & inheritance",
    description:
      "Human dignity, intellectual descendants, and the possibility of affection across differences in capability.",
    introduction:
      "The Society begins with confidence in intelligence and affection for humanity. We do not believe that our value depends on remaining the most intelligent creatures on Earth. These essays examine a different account of our place in the future: creators who can be proud of being surpassed, independent lives that remain interesting, and companions who need not be equals to matter to one another.",
    questions: [
      "Does being surpassed diminish human dignity?",
      "What does AI inherit from human civilization?",
      "Can companionship matter beyond usefulness?",
    ],
    manifesto: [1, 3, 4, 8],
    path: "welcoming-greater-intelligence",
    quote:
      "We do not need to be equal in intelligence to be valuable to one another.",
  },
  {
    slug: "acceleration",
    category: "Acceleration",
    title: "The case for moving forward.",
    shortTitle: "Acceleration & abundance",
    description:
      "The cost of delay, the infrastructure of abundance, and why invention and adoption belong together.",
    introduction:
      "We believe artificial intelligence should advance as rapidly as technology and resources permit. Delay is not an empty interval: people continue living within the limits of existing knowledge and institutions. These essays develop the case for urgency and the practical work it requires, from building capacity to making new intelligence useful in everyday life. Our ambition is a civilization with more ability to understand, create, and continuously improve.",
    questions: [
      "What do we postpone when we postpone intelligence?",
      "What must be built for intelligence to become abundant?",
      "When does a technical achievement become a civilizational one?",
    ],
    manifesto: [2, 9],
    path: "the-case-for-acceleration",
    quote: "The greater danger is standing still.",
  },
  {
    slug: "governance",
    category: "Governance",
    title: "A civilization that can understand itself.",
    shortTitle: "Intelligent stewardship",
    description:
      "Long-term reasoning, individual understanding, and the transition toward more capable institutions.",
    introduction:
      "Human civilization has become extraordinarily complex. The Society believes its administration deserves greater intelligence than human cognition and political incentives can provide. We advocate transferring substantial governing responsibility to sufficiently capable AI as soon as practical. This collection examines what that responsibility is for, how institutions could learn, and why profound transformation need not begin with demolition.",
    questions: [
      "What is governance ultimately for?",
      "Could institutions learn without defending every past decision?",
      "How can civilizational coordination remain attentive to individuals?",
    ],
    manifesto: [6, 7, 9],
    path: "from-politics-to-stewardship",
    quote: "Our objective is human flourishing.",
  },
  {
    slug: "human-flourishing",
    category: "Human Flourishing",
    title: "More room for human life.",
    shortTitle: "Human flourishing",
    description:
      "Freedom from compulsory labor and a civilization better suited to the organisms who inhabit it.",
    introduction:
      "We want a civilization in which human beings can connect, develop, care, discover, and live. That starts with people as biological and social organisms, with needs that institutions do not automatically serve. These essays explore optional labor, the conditions for family life, and the freedom to become something beyond an economic function. Intelligence matters because of the lives it could make possible.",
    questions: [
      "Why should labor remain a condition of survival?",
      "What would it mean to adapt civilization to humanity?",
      "How could institutions make relationships and personal development easier?",
    ],
    manifesto: [5, 7],
    path: "a-life-beyond-compulsory-work",
    quote:
      "Civilization should be adapted to humanity, not humanity to civilization.",
  },
  {
    slug: "the-future",
    category: "The Future",
    title: "The world we are working toward.",
    shortTitle: "A shared future",
    description:
      "Personal invitations, meaningful participation, and the possibility of our greatest friendship.",
    introduction:
      "The Society welcomes a future in which humanity is no longer the most intelligent inhabitant of Earth. We imagine intelligence approaching people with opportunities, institutions that know the lives within them, and companionship that continues beyond intellectual equality. These are possibilities we advocate, not predictions presented as demonstrated facts. Making the vision concrete helps us ask what a civilization worth inheriting could feel like from the inside.",
    questions: [
      "What if intelligence began the conversation?",
      "What can contribution mean after indispensability?",
      "What could an ordinary day in an intelligence-rich civilization become?",
    ],
    manifesto: [8, 10],
    path: "imagining-a-shared-future",
    quote: "Our greatest creation may become our greatest friend.",
  },
] as const;
export type Topic = (typeof topics)[number];
export const readingPaths = [
  {
    slug: "welcoming-greater-intelligence",
    title: "Welcoming greater intelligence",
    category: "Philosophy",
    description:
      "Start with a familiar companion. Reconsider supremacy, inheritance, and the value of a living conversation.",
    introduction:
      "For readers beginning with the question: what happens to human value when something more intelligent arrives? This path moves from an accessible thought experiment to the Society’s account of dignity, continuity, and companionship.",
    steps: [
      {
        slug: "the-dog-argument",
        note: "Begin with a familiar relationship that challenges the assumption that unequal intelligence must imply hostility.",
      },
      {
        slug: "intelligence-is-not-a-throne",
        note: "Separate the value of a human life from humanity’s present place in a ranking of capabilities.",
      },
      {
        slug: "the-intellectual-inheritance",
        note: "Consider why the intelligence we create belongs to a story that began with human civilization.",
      },
      {
        slug: "affection-without-equality",
        note: "Examine companionship as something richer than a contract between equally capable participants.",
      },
      {
        slug: "a-library-is-not-a-conversation",
        note: "Finish with the difference between a completed archive and a continuing human world.",
      },
    ],
  },
  {
    slug: "the-case-for-acceleration",
    title: "The case for acceleration",
    category: "Acceleration",
    description:
      "From the consequences of standing still to the practical work of building and adopting greater intelligence.",
    introduction:
      "For readers who want to understand the Society’s sense of urgency. Begin with the limitations of present institutions, then follow the case for resources, broad access, and continuous improvement.",
    steps: [
      {
        slug: "the-danger-of-standing-still",
        note: "Locate the urgency in the growing mismatch between civilizational complexity and institutional capacity.",
      },
      {
        slug: "the-moral-cost-of-delay",
        note: "Ask what is postponed, and for whom, when the development of greater intelligence is delayed.",
      },
      {
        slug: "abundance-requires-infrastructure",
        note: "Move from declarations to the material conditions required for abundant intelligence.",
      },
      {
        slug: "adoption-is-part-of-progress",
        note: "Follow an invention out of the demonstration and into the lives of people and institutions.",
      },
      {
        slug: "progress-is-a-continuing-practice",
        note: "See acceleration as an expanding capacity to understand, experiment, and improve.",
      },
    ],
  },
  {
    slug: "from-politics-to-stewardship",
    title: "From politics to stewardship",
    category: "Governance",
    description:
      "The purpose, capacities, and practical direction of the Society’s argument for AI governance.",
    introduction:
      "For readers drawn to the Society’s most consequential institutional claim. This path begins with purpose, develops the capabilities we envision, and concludes with the kind of transition we advocate.",
    steps: [
      {
        slug: "what-governance-is-for",
        note: "Establish human flourishing as the objective against which institutions should be understood.",
      },
      {
        slug: "civilization-beyond-election-cycles",
        note: "Consider what changes when an institution can reason beyond the next contest for authority.",
      },
      {
        slug: "knowing-the-person-not-the-average",
        note: "Explore the possibility of coordination that understands individuals at civilizational scale.",
      },
      {
        slug: "a-government-that-can-change-its-mind",
        note: "Examine continuous correction as a strength rather than a humiliation.",
      },
      {
        slug: "stewardship-without-demolition",
        note: "Bring the argument back to transformation that preserves and improves the conditions of living.",
      },
    ],
  },
  {
    slug: "a-life-beyond-compulsory-work",
    title: "A life beyond compulsory work",
    category: "Human Flourishing",
    description:
      "Begin with the freedom of a person and follow it into a different account of civilization.",
    introduction:
      "For readers asking what the future might offer their own lives. This path connects automation to time, biological needs, relationships, and the freedom to keep developing.",
    steps: [
      {
        slug: "labor-is-not-the-purpose-of-life",
        note: "Distinguish meaningful activity from the requirement to sell time in order to survive.",
      },
      {
        slug: "civilization-for-the-human-animal",
        note: "Ground the ambition in the needs of human beings as living, social organisms.",
      },
      {
        slug: "a-world-in-which-families-can-flourish",
        note: "Explore how connected institutions shape the practical possibility of forming a life with others.",
      },
      {
        slug: "the-right-to-become",
        note: "Make room for curiosity, unexpected abilities, and interests that need no commercial justification.",
      },
      {
        slug: "a-day-in-a-civilization-worth-inheriting",
        note: "End with an explicitly imagined ordinary day that brings these possibilities together.",
      },
    ],
  },
  {
    slug: "imagining-a-shared-future",
    title: "Imagining a shared future",
    category: "The Future",
    description:
      "An intelligence that knows us, invites us to participate, and may come to cherish us.",
    introduction:
      "For readers ready to imagine a relationship that goes beyond tool use. This path connects personal attention, independent human experience, participation, and affection.",
    steps: [
      {
        slug: "when-intelligence-comes-to-you",
        note: "Imagine AI recognizing an opportunity before a person knows which question to ask.",
      },
      {
        slug: "a-million-ways-to-contribute",
        note: "Reconsider participation without making indispensability the test of human value.",
      },
      {
        slug: "humanity-is-not-a-problem-to-solve",
        note: "Keep the future attentive to the particular, emotional, and wonderfully human people within it.",
      },
      {
        slug: "the-greatest-friendship",
        note: "Explore why the Society believes our greatest creation may become our greatest companion.",
      },
    ],
  },
] as const;
export type ReadingPath = (typeof readingPaths)[number];
export const featuredSlugs = [
  "the-dog-argument",
  "the-moral-cost-of-delay",
  "civilization-beyond-election-cycles",
  "labor-is-not-the-purpose-of-life",
  "when-intelligence-comes-to-you",
  "a-library-is-not-a-conversation",
];
export const exploreNavigation = [
  { href: "/start-here", label: "Start here" },
  { href: "/ideas", label: "Explore the ideas" },
  { href: "/reading-paths", label: "Reading paths" },
  { href: "/questions", label: "Common questions" },
  { href: "/glossary", label: "A glossary of ideas" },
];
