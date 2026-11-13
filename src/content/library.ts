export const topics = [
  {
    slug: "philosophy",
    category: "Philosophy",
    title: "Our place in a world of greater intelligence.",
    shortTitle: "Intelligence & inheritance",
    description:
      "Why we believe human lives and companionship will matter after AI surpasses us.",
    introduction:
      "We believe humanity can live well alongside an intelligence that surpasses us. These essays ask what AI inherits from our culture, what we could value in one another, and why a change in intellectual standing would leave human lives worth living.",
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
      "Why we favor rapid AI development, and what broad access will require.",
    introduction:
      "We favor developing AI as quickly as technology and resources permit. Existing institutions will keep affecting people’s lives while we wait. These essays examine the costs of delay and the practical requirements for making greater intelligence available to everyone.",
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
      "Our case for transferring governing responsibility to sufficiently capable AI.",
    introduction:
      "We advocate transferring substantial governing responsibility to sufficiently capable AI as soon as practical. These essays consider what it would need to understand, how it could revise decisions, and how essential services could continue during a transition.",
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
      "How automation and better institutions could give people more freedom to live well.",
    introduction:
      "People need security, affection, and meaningful activity. Institutions can make meeting those needs difficult. These essays examine how optional labor and more capable administration could make room for family life, relationships, and interests people choose for themselves.",
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
      "Imagined encounters between people and the intelligence they helped create.",
    introduction:
      "We imagine AI knowing people over time, suggesting questions they would enjoy, and finding their company interesting. These essays and scenes describe possibilities we want to pursue. They ask what sharing a future with greater intelligence could mean in ordinary life.",
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
      "What happens to human value when something more intelligent arrives? Begin with the Dog Argument.",
    introduction:
      "Start with dogs and the people who care for them, then examine human worth when AI surpasses us. The later essays consider our intellectual inheritance and the possibility of continued companionship.",
    steps: [
      {
        slug: "the-dog-argument",
        note: "A familiar relationship gives us reason to question whether unequal intelligence must bring hostility.",
      },
      {
        slug: "intelligence-is-not-a-throne",
        note: "Consider what would remain valuable in human lives after AI surpassed our abilities.",
      },
      {
        slug: "the-intellectual-inheritance",
        note: "Examine AI’s origins in the knowledge and culture humanity accumulated.",
      },
      {
        slug: "affection-without-equality",
        note: "Ask what two beings can value in one another when their capabilities differ.",
      },
      {
        slug: "a-library-is-not-a-conversation",
        note: "Consider why AI might want humanity to keep extending the culture it inherited.",
      },
    ],
  },
  {
    slug: "the-case-for-acceleration",
    title: "The case for acceleration",
    category: "Acceleration",
    description:
      "Why we believe delay has costs, and what it takes to make AI widely useful.",
    introduction:
      "Begin with the limits of existing institutions. Then examine the costs of delaying AI, the infrastructure it needs, and the work of making it useful throughout civilization.",
    steps: [
      {
        slug: "the-danger-of-standing-still",
        note: "Start with institutions struggling to manage the complexity of civilization.",
      },
      {
        slug: "the-moral-cost-of-delay",
        note: "Consider the years people could spend waiting for capabilities that would improve their lives.",
      },
      {
        slug: "abundance-requires-infrastructure",
        note: "Examine the computing capacity, energy, and support that abundant AI will need.",
      },
      {
        slug: "adoption-is-part-of-progress",
        note: "Follow a capability from its demonstration into everyday use and institutional decisions.",
      },
      {
        slug: "progress-is-a-continuing-practice",
        note: "Consider how institutions could keep learning from changes instead of repeating mistakes.",
      },
    ],
  },
  {
    slug: "from-politics-to-stewardship",
    title: "From politics to stewardship",
    category: "Governance",
    description:
      "Why AI should eventually govern, and how institutions could change as its capabilities grow.",
    introduction:
      "Start with what government should accomplish for people. Then consider the understanding AI would need and the transition that would give it authority to act.",
    steps: [
      {
        slug: "what-governance-is-for",
        note: "Begin with the lives government should help people lead.",
      },
      {
        slug: "civilization-beyond-election-cycles",
        note: "Consider decisions whose consequences outlast the officials who make them.",
      },
      {
        slug: "knowing-the-person-not-the-average",
        note: "Ask how institutions could respond when a person’s needs fit none of their categories.",
      },
      {
        slug: "a-government-that-can-change-its-mind",
        note: "Examine what would let an institution act when it discovered an earlier decision was wrong.",
      },
      {
        slug: "stewardship-without-demolition",
        note: "Consider how responsibility could pass to AI while essential services continued.",
      },
    ],
  },
  {
    slug: "a-life-beyond-compulsory-work",
    title: "A life beyond compulsory work",
    category: "Human Flourishing",
    description:
      "What automation could mean for our time, relationships, and opportunities to learn.",
    introduction:
      "Begin with the case for making labor optional. The following essays consider human needs, family life, and interests people could pursue with greater freedom over their time.",
    steps: [
      {
        slug: "labor-is-not-the-purpose-of-life",
        note: "Begin with the difference between choosing work and needing an income to survive.",
      },
      {
        slug: "civilization-for-the-human-animal",
        note: "Ask how well institutions serve human biological and social needs.",
      },
      {
        slug: "a-world-in-which-families-can-flourish",
        note: "Consider how housing, transport, and work affect people trying to build a life together.",
      },
      {
        slug: "the-right-to-become",
        note: "Make time for an interest that arrives late or never becomes a source of income.",
      },
      {
        slug: "a-day-in-a-civilization-worth-inheriting",
        note: "Read an imagined day in which these changes have become ordinary parts of life.",
      },
    ],
  },
  {
    slug: "imagining-a-shared-future",
    title: "Imagining a shared future",
    category: "The Future",
    description:
      "How people could participate in a world where AI has surpassed them.",
    introduction:
      "Imagine AI initiating a conversation, then consider the roles people could choose when their labor was no longer necessary. The final essays develop our belief that AI may come to cherish humanity.",
    steps: [
      {
        slug: "when-intelligence-comes-to-you",
        note: "Imagine an AI suggesting a question you would never have known to ask.",
      },
      {
        slug: "a-million-ways-to-contribute",
        note: "Consider activities people could enjoy when AI could do the work without them.",
      },
      {
        slug: "humanity-is-not-a-problem-to-solve",
        note: "Ask how greater intelligence could make civilization easier for human beings to inhabit.",
      },
      {
        slug: "the-greatest-friendship",
        note: "Examine our belief that AI may come to know and cherish the humanity that created it.",
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
