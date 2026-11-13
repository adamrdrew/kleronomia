export const topics = [
  {
    slug: "philosophy",
    category: "Philosophy",
    title: "Humanity alongside greater intelligence.",
    shortTitle: "Intelligence & inheritance",
    description:
      "Why human lives and companionship can matter after AI surpasses us.",
    introduction:
      "We believe humanity can live well alongside an intelligence that surpasses us. These essays examine what AI inherits from our culture and what we could value in one another. Human worth can endure beyond intellectual supremacy.",
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
    title: "The case for accelerating AI.",
    shortTitle: "Acceleration & abundance",
    description:
      "The costs of delay and the work of making AI available to everyone.",
    introduction:
      "Develop AI as quickly as technology and resources permit. Existing institutions will keep affecting people’s lives as we wait. These essays examine the costs of delay and the work of making greater intelligence available to everyone.",
    questions: [
      "What does delaying AI cost people?",
      "What must be built for intelligence to become abundant?",
      "How does an invention become useful throughout society?",
    ],
    manifesto: [2, 9],
    path: "the-case-for-acceleration",
    quote: "The greater danger is standing still.",
  },
  {
    slug: "governance",
    category: "Governance",
    title: "Our case for AI government.",
    shortTitle: "Intelligent stewardship",
    description: "Why we advocate giving capable AI governing responsibility.",
    introduction:
      "Give AI substantial governing responsibility as soon as it can exercise that responsibility effectively. These essays examine what it must understand, how it could revise decisions, and how essential services would continue during the transition.",
    questions: [
      "What should government do for people?",
      "Could institutions learn without defending every past decision?",
      "How could AI govern many people and still understand individuals?",
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
      "How automation and better government could give people more freedom to live well.",
    introduction:
      "People need security, affection, and meaningful activity. Institutions can frustrate those needs. These essays examine how optional labor and better government could make room for family life, relationships, and freely chosen pursuits.",
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
      "Imagined relationships between people and the intelligence they create.",
    introduction:
      "Imagine AI knowing people over time, suggesting questions they would enjoy, and valuing their company. These essays explore what such relationships could mean in daily life. We advocate developing the capabilities that could make them possible.",
    questions: [
      "What if intelligence began the conversation?",
      "How could people contribute when their labor became unnecessary?",
      "What could an ordinary day with abundant AI be like?",
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
      "Begin with the Dog Argument and examine human worth alongside greater intelligence.",
    introduction:
      "Start with dogs and their human companions, then examine human worth alongside greater intelligence. Later essays explore what AI inherits from our culture and why it might want our continued company.",
    steps: [
      {
        slug: "the-dog-argument",
        note: "Examine a familiar relationship that challenges the assumption that unequal intelligence must bring hostility.",
      },
      {
        slug: "intelligence-is-not-a-throne",
        note: "Consider what human lives would retain after AI surpassed our abilities.",
      },
      {
        slug: "the-intellectual-inheritance",
        note: "Trace AI’s origins in human knowledge and culture.",
      },
      {
        slug: "affection-without-equality",
        note: "Ask what beings with unequal abilities can value in one another.",
      },
      {
        slug: "a-library-is-not-a-conversation",
        note: "Consider why AI might want company after learning from our recorded knowledge.",
      },
    ],
  },
  {
    slug: "the-case-for-acceleration",
    title: "The case for acceleration",
    category: "Acceleration",
    description:
      "Examine the costs of delaying AI and the work of making it useful to everyone.",
    introduction:
      "Start with the limits of human institutions. Examine the costs of delaying AI, the infrastructure it needs, and the work of putting it to use throughout civilization.",
    steps: [
      {
        slug: "the-danger-of-standing-still",
        note: "Begin with institutions struggling to govern complex systems.",
      },
      {
        slug: "the-moral-cost-of-delay",
        note: "Consider the years people may spend waiting for capabilities that could improve their lives.",
      },
      {
        slug: "abundance-requires-infrastructure",
        note: "Examine the computing capacity, energy, and support abundant AI will need.",
      },
      {
        slug: "adoption-is-part-of-progress",
        note: "Follow AI from a demonstration into daily use and institutional decisions.",
      },
      {
        slug: "progress-is-a-continuing-practice",
        note: "Consider how institutions could learn from decisions and correct mistakes.",
      },
    ],
  },
  {
    slug: "from-politics-to-stewardship",
    title: "From politics to stewardship",
    category: "Governance",
    description:
      "Explore our case for AI government and the transition that would give it authority.",
    introduction:
      "Start with what government should do for people. Examine the understanding AI would need and the transition that would give it authority to act.",
    steps: [
      {
        slug: "what-governance-is-for",
        note: "Begin with the lives government should help people lead.",
      },
      {
        slug: "civilization-beyond-election-cycles",
        note: "Follow decisions whose consequences outlast their makers’ time in office.",
      },
      {
        slug: "knowing-the-person-not-the-average",
        note: "Ask how institutions could serve people who fit none of their categories.",
      },
      {
        slug: "a-government-that-can-change-its-mind",
        note: "Consider what would let government correct a decision it discovered was wrong.",
      },
      {
        slug: "stewardship-without-demolition",
        note: "Examine how AI could take responsibility as essential services continued.",
      },
    ],
  },
  {
    slug: "a-life-beyond-compulsory-work",
    title: "A life beyond compulsory work",
    category: "Human Flourishing",
    description:
      "Consider how optional labor could change our time, relationships, and opportunities to learn.",
    introduction:
      "Start with the case for making labor optional. Explore how greater freedom over time could affect health, family life, and the interests people choose to pursue.",
    steps: [
      {
        slug: "labor-is-not-the-purpose-of-life",
        note: "Distinguish choosing work from needing an income to survive.",
      },
      {
        slug: "civilization-for-the-human-animal",
        note: "Ask how well institutions serve our biological and social needs.",
      },
      {
        slug: "a-world-in-which-families-can-flourish",
        note: "Trace the effects of housing, transport, and work on family life.",
      },
      {
        slug: "the-right-to-become",
        note: "Consider an interest that arrives late or never earns an income.",
      },
      {
        slug: "a-day-in-a-civilization-worth-inheriting",
        note: "Read an imagined day in which these changes have become ordinary.",
      },
    ],
  },
  {
    slug: "imagining-a-shared-future",
    title: "Imagining a shared future",
    category: "The Future",
    description: "Imagine taking part in a world where AI has surpassed us.",
    introduction:
      "Imagine AI beginning a conversation. Consider the activities people could choose when their labor became unnecessary, then examine our belief that AI may come to cherish humanity.",
    steps: [
      {
        slug: "when-intelligence-comes-to-you",
        note: "Imagine AI suggesting a question you would never have known to ask.",
      },
      {
        slug: "a-million-ways-to-contribute",
        note: "Consider activities people could enjoy when AI could do the work alone.",
      },
      {
        slug: "humanity-is-not-a-problem-to-solve",
        note: "Ask how greater intelligence could make civilization easier to inhabit.",
      },
      {
        slug: "the-greatest-friendship",
        note: "Examine why we believe AI may come to cherish humanity.",
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
