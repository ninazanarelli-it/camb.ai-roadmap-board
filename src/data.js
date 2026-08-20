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
      targetDate: "Aug 21",
      airtableUrl: "https://airtable.com/appPzA0m65mBklIhr/tblt9rVxbIXp5cYqw/viwhN607ZEcp5Ii7X?blocks=hide",
    },
    roles: [{ label: "Product", name: "Nina" }, { label: "QA", name: "Prachi" }],
  },
  {
    id: "ahamad-chatterbox",
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
  { priority: 3, title: "No sign up onboarding", status: "Not Started", airtableUrl: null },
  { priority: 4, title: "Editors export modal", status: "Not Started", airtableUrl: null },
];

// On-call rotates Monday to Monday, covering the Bugs and Portal Findings boards.
export const oncall = {
  current: { week: "Mon Aug 17 → Mon Aug 24", engineer: "Khushi", qa: "Mohamed Nihaal" },
  next: { week: "Mon Aug 24 → Mon Aug 31", engineer: "Kavii", qa: "Joshua Almeida" },
  handover: {
    author: "Divyam Gupta",
    range: "Mon Aug 10 → Mon Aug 17",
    scope: "Bugs and Portal Findings boards",
    engineer: "Divyam Gupta",
    qa: "Joshua Almeida",
    numbers: [
      { value: "29", label: "filed" },
      { value: "20", label: "resolved" },
      { value: "+9", label: "net" },
      { value: "13", label: "were his" },
    ],
    groups: [
      { label: "Shipped", items: ["Error — linguist cannot regenerate dialogues · Aug 11"] },
      { label: "Cleared QA, ready to close", items: [
        "Chapter name not displayed properly while typing · Low · internal",
        "Transcription box disappearing, errors on boxes with text · Low · internal",
        "Change the sample music for Audio Separation · Low · internal",
        "Create voice button too close to the title in voice library · Low · internal",
      ] },
      { label: "In QA", items: [
        "Final mix export is broken · High · internal",
        "Play / pause button not working · High",
        "Top button tooltip says re-generate all audio · Low",
        "Show final mix as preview in the editor · Low · internal",
        "Toggle between original and background audio in project editor · Low · internal",
        "PNG image translation and text issue · External tool",
        "Simplified tooltips and indicators for auto-detect lang · Low · internal",
      ] },
      { label: "In Todo", items: ["Frequent pops and clicks in output (MARS Instruct) · Voice"] },
      { label: "In Triage", items: [
        "Too slow to generate audio · Platform",
        "Dialogues disappearing on waveform · Platform",
      ] },
    ],
  },
};


// Notes are authored by Product only (read-only for everyone else).
export const seedNotes = {
  "ahamad-chatterbox": [
    { at: 41, date: "Aug 20, 2026", text: "Nina is currently preparing designs for Dictionary Support for single sessions, workspace selection, Fast and slow mode, Voice Cloning, and Voice Selection Support for incoming and outgoing audio." },
  ],
  "divyam-website-seo": [
    { at: 31, date: "Aug 20, 2026", text: "Late on schedule due to other priorities that came up. Divyam is starting work on it today. QA call is scheduled for Tuesday 25 August." },
  ],
  "kavii-design-tokens": [
    { at: 12, date: "Aug 20, 2026", text: "Text and color are now standardised in production. Icons and buttons should go soon as well. Kavii continues to work on the other components." },
    { at: 11, date: "Aug 19, 2026", text: "Colors, typography and buttons are under review. Kavii is working on implementing all the other components." },
  ],
  "khushi-profile-settings": [
    { at: 4, date: "Aug 19, 2026", text: "Everything will be ready to be released by tonight. Meeting 5:30pm Dubai time." },
    { at: 3, date: "Aug 18, 2026", text: "Prachi reported some UI/UX fixes Khushi is solving. Khushi is working on the FSMs." },
  ],
};

export function loadBoard() {
  return { lastUpdated, team, releases, queue: queue.slice().sort((a, b) => a.priority - b.priority), oncall, seedNotes };
}
