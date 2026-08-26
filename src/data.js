// Data layer. Swap loadBoard() for an Airtable API call later — the UI only
// depends on the shape returned here.

// __BUILD_TIME__ is injected by vite.config.js at build time, so this always
// reflects when the site was last deployed rather than a hand-edited date.
function formatBuildTime(iso) {
  const date = new Date(iso);
  const datePart = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Dubai",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Dubai",
  }).format(date);
  return `${datePart} · ${timePart}`;
}

export const lastUpdated = formatBuildTime(__BUILD_TIME__);

export const team = [
  {
    id: "divyam-website-seo",
    name: "Divyam",
    avatar: { light: { bg: "#E4EFFE", fg: "#2E6CB8" }, dark: { bg: "#1C2D41", fg: "#6FB0FE" } },
    current: { title: "Website Translation SEO", status: "Delayed", targetDate: "Aug 21", airtableUrl: null },
    roles: [{ label: "QA", name: "Joshua" }],
  },
  {
    id: "kavii-design-tokens",
    name: "Kavii",
    avatar: { light: { bg: "#E5FBED", fg: "#0F741F" }, dark: { bg: "#1E3E26", fg: "#76F295" } },
    current: {
      title: "Design tokens + Shared components",
      status: "In Progress",
      targetDate: "Aug 28",
      airtableUrl: "https://airtable.com/appPzA0m65mBklIhr/tblt9rVxbIXp5cYqw/viwhN607ZEcp5Ii7X?blocks=hide",
    },
    roles: [{ label: "Product", name: "Nina" }, { label: "QA", name: "Prachi" }],
  },
  {
    id: "ahmad-chatterbox",
    name: "Ahmad",
    avatar: { light: { bg: "#FFF0E4", fg: "#B5561B" }, dark: { bg: "#3B2A1E", fg: "#FFB782" } },
    current: {
      title: "Chatterbox",
      status: "On going",
      targetDate: null,
      airtableUrl: "https://airtable.com/appPzA0m65mBklIhr/tblt9rVxbIXp5cYqw/viwc4hvtTifTvB3Sb?blocks=hide",
    },
    roles: [{ label: "Product", name: "Nina" }, { label: "QA", name: "Joshua" }],
  },
  {
    id: "khushi-onboarding",
    name: "Khushi",
    avatar: { light: { bg: "#F2EEFF", fg: "#5B3FC4" }, dark: { bg: "#322C42", fg: "#C1AAFF" } },
    current: {
      title: "No sign up onboarding",
      status: "In Progress",
      targetDate: "Aug 31",
      airtableUrl: "https://airtable.com/appPzA0m65mBklIhr/tblt9rVxbIXp5cYqw/viwDE1Auo8LdbQ77k?blocks=hide",
    },
    roles: [{ label: "QA", name: "Prachi" }],
  },
  {
    id: "kavii-lipsync",
    name: "Kavii",
    avatar: { light: { bg: "#E5FBED", fg: "#0F741F" }, dark: { bg: "#1E3E26", fg: "#76F295" } },
    current: { title: "Lipsync", status: "On going", targetDate: null, airtableUrl: "https://airtable.com/appPzA0m65mBklIhr/tblt9rVxbIXp5cYqw/viwlTXRWuh38X8PZc?blocks=hide" },
    roles: [{ label: "QA", name: "Kavyasree" }],
  },
];

// Shipped in the last 7 days.
export const releases = [
  {
    id: "khushi-profile-settings",
    name: "Khushi",
    avatar: { light: { bg: "#F2EEFF", fg: "#5B3FC4" }, dark: { bg: "#322C42", fg: "#C1AAFF" } },
    title: "Profile and Workspace Settings",
    releasedOn: "Aug 20",
    roles: [{ label: "QA", name: "Prachi" }],
    airtableUrl: null,
    details: [
      "We restructured the Profile and Workspace Settings section. The design was pretty outdated, so both workspace and profile settings are now reached from the dropdown menu in the nav bar.",
      "They are more compact and more polished, while keeping exactly the same functions as before.",
    ],
    comparisons: [
      {
        title: "Account settings",
        before: { src: "uploads/pasted-1787213539394-0.png", caption: "Before — Account Settings" },
        after: { src: "uploads/pasted-1787214242503-0.png", caption: "After — Settings / Profile" },
      },
      {
        title: "Workspace settings",
        before: { src: "uploads/pasted-1787213551229-0.png", caption: "Before — General Settings page" },
        after: { src: "uploads/pasted-1787214266960-0.png", caption: "After — Settings / Workspaces" },
      },
      {
        title: "Members",
        before: { src: "uploads/pasted-1787213573604-0.png", caption: "Before — Members page" },
        after: { src: "uploads/pasted-1787214291341-0.png", caption: "After — Members modal" },
      },
      {
        title: "Storage",
        before: { src: "uploads/pasted-1787213579110-0.png", caption: "Before — Storage Settings page" },
        after: { src: "uploads/pasted-1787216781400-0.png", caption: "After — Storage modal" },
      },
    ],
  },
  {
    id: "divyam-image-translation",
    name: "Divyam",
    avatar: { light: { bg: "#E4EFFE", fg: "#2E6CB8" }, dark: { bg: "#1C2D41", fg: "#6FB0FE" } },
    title: "Image Translation quality",
    releasedOn: "Aug 20",
    roles: [{ label: "QA", name: "Joshua" }],
    airtableUrl: null,
    details: [
      "The problem: Telugu output was hallucinating distorted words that read like spelling mistakes even though the input text was correct. The root cause was the LLM hallucinating the wrong fonts when rendering the image — glyphs break on low-resource languages, and Telugu is where the model is weakest. Hindi, Spanish, French and Indonesian were unaffected.",
      "The solution: we stopped relying on the LLM to draw glyphs. We built our own text rendering engine that renders characters faithfully and reduced the LLM's role to in-painting and cleanup around that rendered text.",
      "Abdulla confirmed the quality is now correct on Indic scripts and the release went to CSM for client delivery.",
    ],
  },
];

export const queue = [
  { priority: 1, title: "API Docs redesign + Split Dubbing API", status: "Not Started", airtableUrl: null },
  { priority: 2, title: "Audiobook Chapters and Subchapters", status: "Not Started", airtableUrl: null },
  { priority: 3, title: "Editors export modal", status: "Not Started", airtableUrl: null },
  { priority: 4, title: "UX/UI Folders Structure redesign", status: "Not Started", airtableUrl: null },
];

// On-call rotates Monday to Monday, covering the Bugs and Portal Findings boards.
export const oncall = {
  current: { week: "Mon Aug 24 → Mon Aug 31", engineer: "Kavii", qa: "Joshua Almeida" },
  next: { week: "Mon Aug 31 → Mon Sep 7", engineer: "Divyam", qa: "Mohamed Nihaal" },
  handover: {
    author: "Khushi Chhonkare",
    range: "Mon Aug 17 → Mon Aug 24",
    scope: "Bugs and Portal Findings boards",
    engineer: "Khushi Chhonkare",
    qa: "Mohamed Nihaal",
    numbers: [
      { value: "14", label: "filed" },
      { value: "13", label: "resolved" },
      { value: "+1", label: "net" },
      { value: "21", label: "moved" },
    ],
    groups: [
      { label: "Shipped", items: [
        "Artifacts, words cut at the start or end of dialogues, and hallucinations · Aug 18",
        "Artifacts, dropouts and cut offs · Aug 17",
        "Cannot generate voice · Aug 18",
        "Sample music for Audio Separation changed · Aug 19 · internal",
        "Chapter name not displayed properly while typing · Aug 18 · internal",
        "Create voice button too close to the title in the voice library · Aug 17 · internal",
        "Final mix export broken · Aug 19 · internal",
        "More files allowed for supplemental assets, with drag and drop when the toggle is off · Aug 18 · internal",
        "Audio generation too slow · Aug 16",
        "Top button tooltip said re-generate all audio · Aug 19",
        "Transcription box disappearing and erroring on boxes that had text · Aug 18 · internal",
        "Bulk selection dialogue generation failing · Aug 22",
        "Cut offs, artifacts, hallucinations and source leaking into target · Aug 18",
        "Play and pause button not working · Aug 19",
      ] },
      { label: "Cleared QA, ready to close", items: [
        "Get started label fixed for enterprise · Medium · internal",
        "Final mix shown as a preview in the editor · Low · internal",
        "Toggle between original and background audio in the project editor · Low · internal",
      ] },
      { label: "In QA", items: [
        "PNG image translation and text issue · blocking the project",
      ] },
      { label: "Failed QA, back for rework", items: [
        "Users blocked from generating translations when the language is not detected · Low · internal",
      ] },
      { label: "In progress", items: [
        "Audiobooks: Tamil pronunciation and word truncation issues on the instruct model · High",
        "Frequent hallucinations in Tamil audiobooks · Low",
      ] },
    ],
  },
};


// Notes are authored by Product only (read-only for everyone else).
export const seedNotes = {
  "ahmad-chatterbox": [
    {
      at: 64,
      date: "Aug 26, 2026",
      groups: [
        { heading: "2.4.0", items: [
          "Sage speech-to-speech now works both ways.",
          "Italian and Russian added, bringing the total to 22 languages.",
          "Sign-in failures now retry instead of signing the user out.",
          "Sage is now generally available (GA).",
          "The language list now follows the model.",
          "Admin rights are still needed to upgrade.",
        ] },
      ],
    },
    {
      at: 63,
      date: "Aug 25, 2026",
      groups: [
        { heading: "2.3.0", items: [
          "Audio is now self-contained.",
          "Ships as a single installer.",
          "Capture is app-specific.",
          "Pausing a call stops capture.",
          "The default audio device is restored afterwards.",
          "Mid-call device changes now survive.",
          "The session screen has been rebuilt.",
          "Settings are now reliable.",
          "Diagnostics are on by default.",
        ] },
      ],
    },
    { at: 41, date: "Aug 20, 2026", text: "Nina is currently preparing designs for Dictionary Support for single sessions, workspace selection, Fast and slow mode, Voice Cloning, and Voice Selection Support for incoming and outgoing audio." },
  ],
  "divyam-website-seo": [
    { at: 32, date: "Aug 25, 2026", text: "QA call moved to Aug 26: Kavii flagged an architectural issue in the implementation.\nThe worker hits Redis and Postgres on every request instead of the edge, so Divyam is moving to a Cloudflare KV pass through cache and generating certs for client hostnames, then testing end to end." },
    { at: 31, date: "Aug 20, 2026", text: "Late on schedule due to other priorities that came up. Divyam is starting work on it today. QA call is scheduled for Tuesday 25 August." },
  ],
  "kavii-design-tokens": [
    { at: 12, date: "Aug 20, 2026", text: "Text and color are now standardised in production. Icons and buttons should go soon as well. Kavii continues to work on the other components." },
    { at: 11, date: "Aug 19, 2026", text: "Colors, typography and buttons are under review. Kavii is working on implementing all the other components." },
  ],
  "kavii-lipsync": [
    {
      at: 51,
      date: "Aug 22, 2026",
      groups: [
        { heading: "Shipped", items: [
          "Edge Blend controls, which fix the compositing artifacts.",
          "Frame leaks on different frame rates are fixed.",
          "Review comments for Lipsync are built, and Niyati has given feedback on them.",
        ] },
        { heading: "Investigated", items: [
          "Issues with variable frame rate sources.",
          "Issues with non-square pixels (SAR).",
        ] },
        { heading: "In progress", items: [
          "Warnings when two faces are detected for one subject.",
        ] },
        { heading: "Looking for solutions", items: [
          "Color changes introduced by the Lipsync provider.",
          "Mouths not closing during silence, which the provider does not handle.",
        ] },
      ],
    },
  ],
  "khushi-onboarding": [
    { at: 62, date: "Aug 25, 2026", text: "First scope\nNo sign up onboarding will be implemented for Dubbing, Subtitles, Stories, TTS, Live Speech Translation and Image Translation.\n\nAfter launch\nWe track conversion and engagement for two weeks, and roll it out to the remaining tools if the numbers improve." },
    { at: 61, date: "Aug 24, 2026", text: "Kickoff call set up with Nina, Khushi and Kavii." },
  ],
  "khushi-profile-settings": [
    { at: 4, date: "Aug 19, 2026", text: "Everything will be ready to be released by tonight. Meeting 5:30pm Dubai time." },
    { at: 3, date: "Aug 18, 2026", text: "Prachi reported some UI/UX fixes Khushi is solving. Khushi is working on the FSMs." },
  ],
};

export function loadBoard() {
  const team_ = team
    .map((t, i) => ({ t, i, ongoing: t.current.status === "On going" ? 1 : 0 }))
    .sort((a, b) => a.ongoing - b.ongoing || a.i - b.i)
    .map((x) => x.t);
  return { lastUpdated, team: team_, releases, queue: queue.slice().sort((a, b) => a.priority - b.priority), oncall, seedNotes };
}
