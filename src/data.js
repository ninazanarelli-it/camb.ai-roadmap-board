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
    id: "kavii-design-tokens",
    name: "Kavii",
    avatar: { light: { bg: "#E5FBED", fg: "#0F741F" }, dark: { bg: "#1E3E26", fg: "#76F295" } },
    current: {
      title: "Design tokens + Shared components",
      status: "In Progress",
      targetDate: "Sep 3",
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
    id: "kavii-lipsync",
    name: "Kavii",
    avatar: { light: { bg: "#E5FBED", fg: "#0F741F" }, dark: { bg: "#1E3E26", fg: "#76F295" } },
    current: { title: "Lipsync", status: "On going", targetDate: null, airtableUrl: "https://airtable.com/appPzA0m65mBklIhr/tblt9rVxbIXp5cYqw/viwlTXRWuh38X8PZc?blocks=hide" },
    roles: [{ label: "QA", name: "Kavyasree" }],
  },
];

// Reported by the Infra team.
export const backend = [
  {
    title: "MARS-Instruct quality patch in Dubbing",
    date: "Sep 2",
    reporter: "Matt",
    text: "A patch to MARS-Instruct quality in Dubbing is now in production. Customers should notice far fewer gaps and speedups in their generations.",
  },
  {
    title: "Transcription service overhaul",
    date: "Aug 27",
    reporter: "Matt",
    text: "A large overhaul of the transcription service is now in production. Users should notice a decent improvement in diarization and transcript accuracy.",
  },
];

// Shipped in the last 7 days.
export const releases = [
  {
    id: "divyam-website-seo",
    name: "Divyam",
    avatar: { light: { bg: "#E4EFFE", fg: "#2E6CB8" }, dark: { bg: "#1C2D41", fg: "#6FB0FE" } },
    title: "Website Translation SEO",
    releasedOn: "Sep 3",
    roles: [{ label: "QA", name: "Joshua" }],
    airtableUrl: null,
    details: [
      "Translated websites are now served SEO ready: translated pages are crawlable and indexable on the client's own hostname, served from the edge rather than hitting Redis and Postgres on every request.",
      "A detailed guide on how to set it up is coming soon.",
    ],
  },
  {
    id: "khushi-onboarding",
    name: "Khushi",
    avatar: { light: { bg: "#F2EEFF", fg: "#5B3FC4" }, dark: { bg: "#322C42", fg: "#C1AAFF" } },
    title: "No sign up onboarding",
    releasedOn: "Sep 1",
    roles: [{ label: "QA", name: "Prachi" }],
    airtableUrl: null,
    details: [
      "New users who arrive from a specific tool landing page now land directly on the tool they came for, without signing up or going through the whole onboarding flow first. They get the actual settings interface, can upload videos or type text, and set the job up exactly as a signed in user would.",
      "When they click generate, a small pop up asks them to sign up. Sign up takes one click, and the output starts generating straight after.",
      "Why we did it: the account form and onboarding sat in front of any output and were the biggest drop off in the funnel. The ask now comes after the user has set up a real job.",
      "Batch 1 covers Dubbing, Subtitles, Stories, TTS, Live Speech Translation and Image Translation. We track conversion and engagement per tool for two weeks, and how many users complete the one click sign up at the generate step. Batch 2 stays in the backlog and will be scoped from those results.",
    ],
    comparisons: [
      {
        title: "Text to Speech, before sign up",
        before: { src: "uploads/pasted-1788517959017-0.png", caption: "Full tool interface, no account — settings, voice, model and input are all usable" },
        after: { src: "uploads/pasted-1788518239986-0.png", caption: "On generate — one click sign up pop up, output starts right after" },
      },
    ],
  },
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
  { priority: 1, title: "Audiobook Chapters and Subchapters", status: "Not Started", note: "Backend changes", airtableUrl: null },
  {
    priority: 2,
    title: "Agentic Dubbing",
    status: "Not Started",
    note: "Hackathon results land next Monday, then product and tech work on it full time to get the tool to a finished state by the end of the month",
    airtableUrl: null,
    flag: "Focus of this sprint",
    highlight: true,
  },
];

export const backlog = [
  { title: "API Docs quick redesign", note: "24 hours" },
  { title: "Editors export modal", note: "Waiting on prioritisation" },
  { title: "UX/UI Folders Structure redesign", note: "Waiting on prioritisation" },
  { title: "No sign up onboarding (batch 2)", note: "Follows batch 1 results" },
];

// On-call rotates Monday to Monday, covering the Bugs and Portal Findings boards.
export const oncall = {
  current: { week: "Mon Aug 31 → Mon Sep 7", engineer: "Divyam", qa: "Joshua Almeida" },
  next: { week: "Mon Sep 7 → Mon Sep 14", engineer: "Khushi", qa: "Mohamed Nihaal" },
  handover: {
    author: "Kavii Suri",
    range: "Mon Aug 24 → Mon Aug 31",
    scope: "Bugs and Portal Findings boards",
    engineer: "Kavii Suri",
    qa: "Joshua Almeida",
    numbers: [
      { value: "27", label: "filed" },
      { value: "9", label: "resolved" },
      { value: "+18", label: "net" },
      { value: "20", label: "moved" },
    ],
    groups: [
      { label: "Shipped", items: [
        "Playback issue · Aug 24",
        "Stories: dialogue boxes could not be added in Chapter 019 · Aug 26",
        "PNG image translation and text issue · Aug 24",
        "Get started label fixed for enterprise · Aug 24 · internal",
        "Thai dubbing audio cut off on TMC Sanpo in Oyama · Aug 25",
        "Exporting taking far too long · Aug 27",
        "Lipsync: subject detection using a face prompt · Aug 27",
        "Lipsync: original video slowed down while the render came out faster · Aug 27",
        "Lipsync: dialogue out of sync · Aug 27",
      ] },
      { label: "In QA", items: [
        "Extra settings disabled for Mars instruct · Low · internal",
        "Preview playback mix UI regression · Low · internal",
        "Blur line at the beginning of Salma Shadi · High",
      ] },
      { label: "In progress", items: [
        "Lipsync: subject detection · High",
        "Lipsync: results not coming out as expected · High",
        "Lips not syncing · High",
        "Thin black vertical line on Julie's left side · High",
        "Lips not syncing · High",
      ] },
      { label: "In Todo", items: [
        "Lipsync: original lip movement, no modification happening",
        "Adel's lips not coming out properly",
        "Lipsync: original lip movement, no modification happening",
      ] },
    ],
    closing: "The Lipsync bugs are newly reported and mostly blocked: 9 filed, 3 shipped, 6 blocked on the provider. The provider has been notified and will send an update early this week, and we are following up.",
  },
};


// Notes are authored by Product only (read-only for everyone else).
export const seedNotes = {
  "ahmad-chatterbox": [
    { at: 44, date: "Aug 28, 2026", title: "Chatterbox 2.4.1 shipped", text: "A presentation only release that carries CAMB.AI branding through the sign in experience.\n\nWhat changed\nThe sign in screen now shows the CAMB.AI logo beneath the Sign In button, so the app identifies its provider on the first screen a new user sees.\nThe browser page confirming a successful sign in now closes with the CAMB.AI wordmark instead of the plain chatterbox.camb.ai text line.\n\nWhat did not change\nNothing else: no changes to translation, audio capture, sessions, settings, history or sign in behaviour, and no bug fixes.\n\nUpgrading\nWorth doing, but not urgent. Moving from 2.4.0 carries no functional risk, and users who wait lose no capability." },
    { at: 43, date: "Aug 26, 2026", title: "Chatterbox 2.4.0 shipped", text: "Translation now runs in both directions as speech, the model list is shorter, and two more languages are available.\n\nHighlights\nThe new Sage model translates speech to speech both ways, so the incoming side is spoken rather than shown as text.\nItalian and Russian join the list, bringing it to twenty two.\nA billing or network problem used to sign you out and reopen a sign in tab. Chatterbox now explains what happened and offers a retry.\n\nModels\nSage is generally available and no longer marked experimental.\nChanging model updates the language list with it, so the picker no longer holds on to the previous model's languages.\n\nGood to know\nUpgrading from 2.3.0 needs administrator rights, as before, and system requirements are unchanged." },
    { at: 42, date: "Aug 25, 2026", title: "Chatterbox 2.3.0 shipped", text: "Chatterbox now handles its own audio end to end: one installer with no dependencies, faster session start, and capture from a specific application on the machine.\n\nAudio\nThe bundled audio device installs with the app, and upgrading removes any device an earlier version left behind.\nThe device is set up once when Chatterbox opens and stays available for the session, so starting a call no longer waits on audio configuration.\nYou can point Chatterbox at a single app, such as a meeting client, softphone or browser, and it captures from that source.\nPausing a session stops capture, and nothing is sent onward until it resumes.\nThe system default recording device is restored when Chatterbox is done, so other apps keep working.\nSwitching or unplugging a headset mid call no longer ends the session; audio recovers and the call continues.\n\nSessions and settings\nThe in call session screen has been rebuilt.\nSettings now save reliably, including rapid changes, and report failed saves or loads instead of dropping them.\nDiagnostics are on by default and Support is a standard part of settings, so the information needed to resolve a client report is already captured." },
    { at: 41, date: "Aug 20, 2026", text: "Nina is currently preparing designs for Dictionary Support for single sessions, workspace selection, Fast and slow mode, Voice Cloning, and Voice Selection Support for incoming and outgoing audio." },
  ],
  "divyam-website-seo": [
    { at: 33, date: "Sep 3, 2026", text: "Released\nWebsite Translation SEO is live in production.\nA detailed guide on how to set it up is coming soon." },
    { at: 32, date: "Aug 25, 2026", text: "QA call moved to Aug 26: Kavii flagged an architectural issue in the implementation.\nThe worker hits Redis and Postgres on every request instead of the edge, so Divyam is moving to a Cloudflare KV pass through cache and generating certs for client hostnames, then testing end to end." },
    { at: 31, date: "Aug 20, 2026", text: "Late on schedule due to other priorities that came up. Divyam is starting work on it today. QA call is scheduled for Tuesday 25 August." },
  ],
  "kavii-design-tokens": [
    { at: 71, date: "Aug 31, 2026", text: "Icons and buttons are now standardized in production. Upload components and input fields are next." },
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
    { at: 63, date: "Sep 1, 2026", text: "Released\nNo sign up onboarding is live for Dubbing, Subtitles, Stories, TTS, Live Speech Translation and Image Translation.\n\nWhat it is\nNew users who arrive from a specific tool landing page now land directly on the tool they came for, without signing up or going through the whole onboarding flow first.\nThey get the actual settings interface, can upload videos or type text, and set the job up exactly as a signed in user would.\nWhen they click generate, a small pop up asks them to sign up. Sign up takes one click, and the output starts generating straight after.\n\nWhy we did it\nThe account form and onboarding sat in front of any output and were the biggest drop off in the funnel. The ask now comes after the user has set up a real job.\n\nWhat we measure\nConversion and engagement per tool for two weeks, and how many users complete the one click sign up at the generate step. Batch 2 is scoped from those results." },
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
  return {
    lastUpdated,
    team: team_,
    releases,
    backend,
    backlog,
    queue: queue.slice().sort((a, b) => a.priority - b.priority),
    oncall,
    seedNotes,
  };
}
