import React, { useEffect, useState } from "react";

// Platform roadmap: road to December 1. Ported from the design-compiler export
// (Platform Roadmap.dc.html) — an interactive Gantt with a who-filter, a
// weeks/days zoom, a live countdown, and a detail dock.

const DETAIL = {
  v0: { t: "Non live product quality", w: "weeks 6 to 9", b: [
    "Details, milestones and staffing still need to be defined."] },
  c0: { t: "Live and edge personalization", w: "weeks 6 to 9", b: [
    "Details, milestones and staffing still need to be defined."] },
  g1: { t: "Generative commentary", w: "weeks 1 to 5", b: [
    "Five week block. Scope, milestones and staffing still need to be defined."] },
  s1: { t: "Agentic dubbing", w: "Kavii, Khushi, Divyam, this week", b: [
    "Finished by end of this week.",
    "On dev for the whole team Wednesday, that is the internal checkpoint, not the release.",
    "Production Monday 28. Agent first, with the editor view still one click away.",
    "This is the shell every other tool copies. Getting the agentic and editor toggle right here saves having the same argument four more times."] },
  s2: { t: "Image translation, agentic", w: "now to Mon 28", b: [
    "Already in flight. Ships to production the same day as dubbing.",
    "Adithya joins Arnav on subtitles in week 2, so anything unfinished here follows him."] },
  m1: { t: "Prod, Mon 28: both tools agent first", w: "Monday 28 September", b: [
    "The first thing customers see of the new direction. Worth an email and a short film, not a silent push.",
    "It also sets the internal rhythm: build, dev midweek, prod Monday."] },
  s3: { t: "Audiobooks", w: "Kavii from Thu wk 1, Divyam and Khushi from wk 2", b: [
    "Kavii starts setting it up Thursday while dubbing is still closing out.",
    "Divyam and Khushi join once dubbing is on production.",
    "Ships Friday morning of week 3, the same morning as subtitles."] },
  s4: { t: "Subtitles and closed captions", w: "Arnav from Thu wk 1, Adithya from wk 2, to Fri am wk 3", b: [
    "Arnav starts setting it up Thursday, alongside Kavii on audiobooks. Adithya joins once image translation is on production.",
    "This commits us to building subtitles in house rather than conceding to the external tools Nati and Gustavo prefer.",
    "Worth telling them the decision is made, so the conversation moves to what quality means rather than whether to build at all.",
    "Ships Friday morning of week 3."] },
  m2: { t: "Audiobooks ship", w: "Friday morning, week 3", b: [
    "Third revenue tool agent first."] },
  m3: { t: "Subtitles and CC ship", w: "Friday morning, week 3", b: [
    "Fourth revenue tool agent first. After this only document translation and audio are left on the old surface."] },
  m4: { t: "Everything that earns is an agent", w: "End of week 3", b: [
    "Akshat's first node on the sketch. Dubbing, image, audiobooks, subtitles and document translation all agent first, editor still reachable.",
    "Our staffing puts it at week 3, which means the fork has four weeks behind it, not six."] },
  s5: { t: "Document translation", w: "all of week 3", b: [
    "Starts Monday of week 3, closes Friday.",
    "Arnav is also carrying subtitles to its Friday morning delivery the same week. That is the one real double booking on this track: either accept a soft landing on one, or move the doc translation start to the following Monday."] },
  b1: { t: "Timed knowledge graph on real VOD", w: "weeks 1 to 3", b: [
    "Audio, video, metadata, scraped context and general knowledge into one graph that grows and forgets across the runtime.",
    "Faris is the only person on this so far, and the graph in the video Nina saw is his. Matt and Nour join now, Arnav is locked to the shipping track until week 4.",
    "Nour on this from the start is worth more than it looks: he takes the live branch in week 6, so he will be implementing a system he helped build rather than one handed to him.",
    "Success here is the representation, not output quality yet."] },
  b2: { t: "Graph to regeneration loop", w: "weeks 4 to 5", b: [
    "Narrate the graph state at each beat, hand it to a model, ask for that moment recreated in the target language inside the timing window.",
    "Generation, not transformation. The first outputs will be bad, the loop existing is the milestone.",
    "Arnav joins once document translation closes at the end of week 3.",
    "Run the soccer commentary test first: translate five lines versus generate five. Twenty minutes, and it is the clearest way to explain the thesis to the team."] },
  b4: { t: "Beats the linear pipeline, blind", w: "End of week 5", b: [
    "One vertical, one language pair, end to end.",
    "Blind A/B against ASR to translate to TTS, judged by Nati's linguists.",
    "This is the technical claim both branches rest on. Nothing downstream is safe to start until it holds."] },
  b6: { t: "Runs with little or no source audio", w: "End of week 5", b: [
    "Akshat's deaf artist argument: if the graph is built from video, metadata and prior context, speech stops being the source of truth and becomes one signal among several.",
    "This is the checkpoint that makes the live branch possible at all. No audio means no ASR step, which is where the latency lives."] },
  b7: { t: "Style and tone on demand, not just language", w: "End of week 5", b: [
    "The same prompt slot that says recreate this in Italian takes anything: a register, a dialect, a tone for a kids film, Akshat's pirate example.",
    "This is the line between localization and personalization, and the cheapest demo moment on the board: one asset, several versions, side by side.",
    "Film it the first week it works."] },
  v1: { t: "Generative pipeline into the non live tools", w: "weeks 6 to 8", b: [
    "The upper branch of Akshat's sketch. Whatever the graph and regeneration loop taught us goes back into dubbing, subtitles and audiobooks.",
    "Kavii is the right person for it, he built the agentic shell for all three, so he knows exactly where the linear pipeline is wired in.",
    "Mostly backend. The UI should barely move, that was the explicit hope, and it is what makes two weeks plausible.",
    "It may also change how image translation works underneath, even though the interface stays put."] },
  v2: { t: "Non live product quality at 100%", w: "End of week 8", b: [
    "Akshat's own endpoint for this branch: upload, free form prompt, agent handles the rest, you review without leaving comments.",
    "Nov 16. Akshat's sketch put this at week 6, a two week loop plus a three week build lands it two weeks later.",
    "There is no runway left after this. Week 9 is the only gap before the Nov 23 freeze, and the customer launch is already in it. If either branch slips, it slips into the demo."] },
  v3: { t: "Carry into the remaining tools", w: "Week 9", b: [
    "Document translation, image, audio, whatever did not make the first pass.",
    "Runs alongside the unified interface build, so coordinate: same tools, two kinds of change at once."] },
  c2: { t: "Generative pipeline into live and edge build", w: "weeks 6 to 8", b: [
    "The lower branch. Same source system, different destination, which is why the audio optional checkpoint matters so much here.",
    "Pieter and Nour take the feed in and put the result out. Akshat was explicit this does not need an agent, it is a drop in.",
    "The device side leg from the slide already made runs inside this window."] },
  c3: { t: "Fully edge personalization", w: "End of week 8", b: [
    "Akshat's endpoint for this branch. The demo able version of the live personalization story.",
    "Record a backup film the day it first works. Do not wait for the polished version."] },
  c4: { t: "Harden the demo on a real stream", w: "Week 9", b: [
    "Repeatable on a live feed, not a rehearsed clip. This is what has to survive December 1."] },
  d2: { t: "Unified agent interface, built", w: "weeks 4 to 6", b: [
    "Every shipped agentic tool moves inside the unified interface.",
    "Timing works cleanly: they come off audiobooks on the Friday of week 3 and start here on the Monday.",
    "They need a design to build from by the Monday of week 4, so the discoverability question has to be settled inside week 3.",
    "Old editors stay reachable so nobody logs in and wonders what happened.",
    "This runs in parallel with the two generative branches, on the same tools. Coordinate, the surface and the backend are both moving at once."] },
  d5: { t: "Marketing content and demo films", w: "weeks 5 to 6", b: [
    "Emails to every existing customer, demo videos, site copy.",
    "Localize becomes personalize across the site, that costs a word and buys the story.",
    "They are filming a product that finishes building the same week they finish cutting. Give them the week 5 build to work from and re shoot the hero moments in week 6 rather than waiting for final."] },
  d6: { t: "New platform launches", w: "Monday 2 November, start of week 7", b: [
    "Everything lands the Friday before: the interface finishes building and the marketing team finishes cutting at the end of week 6. Launch Monday.",
    "A real launch moment, not a silent swap.",
    "Four weeks of real usage before investors see it, and usage is evidence.",
    "It does mean launching while the generative branches are still landing underneath. The surface is what customers notice, the quality jump arrives after."] },
  e1: { t: "Rehearse and film backups", w: "Week 9", b: [
    "Run the demo end to end, daily. Record a backup film of every live moment so nothing on stage depends on a network.",
    "Anything not working by the Friday of week 9 is cut from the demo rather than fixed in week 10."] },
  e2: { t: "Code freeze, test only", w: "Week 10, from Mon 23 Nov", b: [
    "No new work. Test, rehearse, and fix only what breaks.",
    "Demo day: Tuesday 1 December."] },
};

const LANES = [
  { id: "ship", name: "Ship revenue tools", cvar: "--t-ship", who: "Kavii, Divyam, Khushi, Arnav, Adithya", note: "agentified in parallel", rows: 5, items: [
    { k: "s1", row: 1, from: 1, to: 6, title: "Dubbing", sub: "Kavii, Khushi, Divyam", crew: ["Kavii", "Khushi", "Divyam"] },
    { k: "m1", row: 1, at: 6, type: "milestone", title: "Both tools on prod, Mon 28", crew: ["Kavii", "Khushi", "Divyam", "Adithya"] },
    { k: "s2", row: 2, from: 1, to: 6, title: "Image translation", sub: "Adithya", crew: ["Adithya"] },
    { k: "s3", row: 3, from: 4, to: 15, title: "Audiobooks", sub: "Kavii from Thu, Divyam and Khushi from wk 2", crew: ["Kavii", "Divyam", "Khushi"] },
    { k: "m2", row: 3, at: 15, type: "milestone", title: "Ships Fri am, wk 3", crew: ["Kavii", "Divyam", "Khushi"] },
    { k: "s4", row: 4, from: 4, to: 15, title: "Subtitles and closed captions", sub: "Arnav from Thu, Adithya joins from wk 2", crew: ["Arnav", "Adithya"] },
    { k: "m3", row: 4, at: 15, type: "milestone", title: "Ships Fri am, wk 3", crew: ["Arnav", "Adithya"] },
    { k: "s5", row: 5, from: 11, to: 16, title: "Document translation", sub: "Arnav", crew: ["Arnav"] },
    { k: "m4", row: 5, at: 16, type: "milestone", title: "Everything that earns is an agent", crew: ["Kavii", "Khushi", "Divyam", "Arnav", "Adithya"] },
  ] },
  { id: "gen", name: "Generative commentary", cvar: "--t-gen", who: "Faris, Matt, Nour, Arnav", note: "scope to be defined", rows: 1, items: [
    { k: "g1", row: 1, from: 1, to: 26, title: "Generative commentary", sub: "Faris, Matt, Nour, Arnav. Needs to be defined", crew: ["Faris", "Matt", "Nour", "Arnav"] },
  ] },
  { id: "vod", name: "Non live product quality", cvar: "--t-vod", who: "Kavii, Faris", note: "details to be defined", rows: 1, items: [
    { k: "v0", row: 1, from: 26, to: 46, title: "Non live product quality", sub: "Kavii, Faris. Details to be defined", crew: ["Kavii", "Faris"] },
  ] },
  { id: "live", name: "Live and edge personalization", cvar: "--t-live", who: "Pieter, Nour", note: "details to be defined", rows: 1, items: [
    { k: "c0", row: 1, from: 26, to: 46, title: "Live and edge personalization", sub: "Pieter, Nour. Details to be defined", crew: ["Pieter", "Nour"] },
  ] },
  { id: "prod", name: "Product surface and launch", cvar: "--t-prod", who: "Nina, Divyam, Khushi", note: "marketing: Arsalan, Sahil, Ananya, Ameer", rows: 2, items: [
    { k: "d2", row: 1, from: 16, to: 31, title: "Unified agent interface, built", sub: "Divyam, Khushi", crew: ["Divyam", "Khushi", "Nina"] },
    { k: "d5", row: 2, from: 21, to: 31, title: "Marketing content and demo films", sub: "Arsalan, Sahil, Ananya, Ameer", crew: ["Arsalan", "Sahil", "Ananya", "Ameer"] },
    { k: "d6", row: 2, at: 31, type: "milestone", title: "New platform launches, Mon 2 Nov", crew: ["Nina", "Divyam", "Khushi"] },
  ] },
  { id: "demo", name: "Demo preparation", cvar: "--t-demo", who: "everyone", note: "nothing new gets built", rows: 1, items: [
    { k: "e1", row: 1, from: 41, to: 46, title: "Rehearse and film backups", sub: "week 9", crew: null },
    { k: "e2", row: 1, from: 46, to: 51, type: "stop", title: "Code freeze, test only", sub: "week 10", crew: null },
  ] },
];

const ROSTER = ["Kavii", "Divyam", "Khushi", "Arnav", "Adithya", "Faris", "Matt", "Nour", "Pieter", "Maria", "Nina", "Arsalan", "Sahil", "Ananya", "Ameer"];
const START = new Date(2026, 8, 21);
const DEMO = new Date(2026, 11, 1, 9, 0, 0);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dayDate(slot) {
  const wk = Math.floor(slot / 5);
  const dow = slot % 5;
  const d = new Date(START.getTime());
  d.setDate(d.getDate() + wk * 7 + dow);
  return d;
}

export default function PlatformRoadmap() {
  const [sel, setSel] = useState(null);
  const [theme, setTheme] = useState("light");
  const [person, setPerson] = useState(null);
  const [zoom, setZoom] = useState("weeks");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    try {
      const saved = localStorage.getItem("roadmap-theme");
      if (saved) setTheme(saved);
    } catch (e) {}
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dark = theme === "dark";
  const dayMs = 86400000;

  const today = new Date(now.getTime());
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - START) / dayMs);
  let nowSlot = null;
  if (diff >= 0) {
    const wk = Math.floor(diff / 7);
    const dow = Math.min(diff % 7, 4);
    if (wk < 10) nowSlot = wk * 5 + dow;
  }
  const nowLeft = nowSlot === null ? (diff < 0 ? "0%" : "100%") : ((nowSlot / 50) * 100).toFixed(2) + "%";
  const todayLabel = "Today, " + DAYS[now.getDay()] + " " + now.getDate() + " " + MONTHS[now.getMonth()];

  const msLeft = Math.max(0, DEMO - now);
  const cdDays = Math.floor(msLeft / dayMs);
  const pad = (n) => (n < 10 ? "0" + n : "" + n);
  const cdClock =
    pad(Math.floor((msLeft % dayMs) / 3600000)) + ":" +
    pad(Math.floor((msLeft % 3600000) / 60000)) + ":" +
    pad(Math.floor((msLeft % 60000) / 1000));
  const span = DEMO - START;
  const pct = Math.min(100, Math.max(0, ((now - START) / span) * 100));

  const zoomDays = zoom === "days";
  const ruler = [];
  if (zoomDays) {
    for (let i = 0; i < 50; i++) {
      const d = dayDate(i);
      const mon = i % 5 === 0;
      ruler.push({
        top: DAYS[d.getDay()].slice(0, 1) + " " + d.getDate(),
        sub: mon ? "wk " + (1 + i / 5) : "",
        size: "11px",
        color: mon ? "var(--ink)" : "var(--ink-2)",
        border: mon ? "1px solid var(--line)" : "1px solid var(--line-soft)",
      });
    }
  } else {
    for (let i = 0; i < 10; i++) {
      const d = dayDate(i * 5);
      const last = i === 9;
      ruler.push({
        top: "Week " + (1 + i),
        sub: last ? "Nov 23" : MONTHS[d.getMonth()] + " " + d.getDate(),
        size: "13px",
        color: last ? "var(--primary)" : (i === 8 ? "var(--ink)" : "var(--ink-2)"),
        border: "1px solid var(--line-soft)",
      });
    }
  }

  const toggleSel = (k) => setSel((s) => (s === k ? null : k));
  const match = (crew) => !person || !crew || crew.indexOf(person) !== -1;

  let lanes = LANES.map((lane) => {
    const color = "var(" + lane.cvar + ")";
    const tint = "var(" + lane.cvar + "-tint)";
    const hit = !!person && lane.items.some((it) => match(it.crew));
    const bars = [];
    const marks = [];
    lane.items.forEach((it) => {
      const on = match(it.crew);
      const isSel = sel === it.k;
      const opacity = on ? 1 : 0.14;
      if (it.type === "milestone") {
        marks.push({
          k: it.k,
          title: it.title,
          left: ((it.at - 1) / 50 * 100).toFixed(2) + "%",
          top: (16 + (it.row - 1) * 50 + 10) + "px",
          color: isSel ? "var(--ink)" : color,
          fill: isSel ? color : "var(--bg)",
          ring: isSel ? "0 0 0 3px " + tint : "none",
          opacity,
        });
      } else {
        const stop = it.type === "stop";
        const tentative = it.type === "tentative";
        bars.push({
          k: it.k,
          title: it.title,
          sub: it.sub || "",
          who: (it.crew || ["everyone"]).join(", "),
          col: it.from + " / " + it.to,
          row: String(it.row),
          bg: tentative ? "transparent" : (stop ? "var(--error-tint)" : tint),
          border: tentative ? "1px dashed " + color : "0",
          leftBorder: tentative ? "1px dashed " + color : "3px solid " + (stop ? "var(--error-ink)" : color),
          ring: isSel ? "0 0 0 2px var(--bg), 0 0 0 4px " + color : "none",
          opacity,
        });
      }
    });
    return { id: lane.id, name: lane.name, who: lane.who, note: lane.note, color, rowsCss: "repeat(" + lane.rows + ", 42px)", bars, marks, opacity: !person || hit ? 1 : 0.4, hit };
  });
  if (person) lanes = lanes.slice().sort((a, b) => (b.hit ? 1 : 0) - (a.hit ? 1 : 0));

  let hits = 0;
  LANES.forEach((l) => l.items.forEach((it) => { if (person && it.crew && it.crew.indexOf(person) !== -1) hits++; }));

  const chip = (on) => ({
    bg: on ? "var(--primary)" : "transparent",
    fg: on ? "#FFFFFF" : "var(--ink-2)",
    border: on ? "var(--primary)" : "var(--line)",
  });
  const d = sel ? DETAIL[sel] : null;
  let selCrew = "";
  if (sel) {
    LANES.forEach((l) => l.items.forEach((it) => { if (it.k === sel) selCrew = (it.crew || ["Everyone"]).join(" , ") + "  |  " + l.name; }));
  }
  let selColor = "var(--ink-3)";
  LANES.forEach((l) => l.items.forEach((it) => { if (it.k === sel) selColor = "var(" + l.cvar + ")"; }));

  const rulerCount = zoomDays ? 50 : 10;
  const boardWidth = zoomDays ? "2800px" : "1280px";
  const gridBg = zoomDays
    ? "repeating-linear-gradient(to right, var(--line-soft) 0 1px, transparent 1px 10%), repeating-linear-gradient(to right, var(--line-soft) 0 1px, transparent 1px 2%)"
    : "repeating-linear-gradient(to right, var(--line-soft) 0 1px, transparent 1px 10%)";
  const progressPct = pct.toFixed(1) + "%";
  const all = chip(!person);

  const toggleTheme = () =>
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      try { localStorage.setItem("roadmap-theme", next); } catch (e) {}
      return next;
    });

  return (
    <div
      className="platform-page"
      data-theme={theme}
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--ink)",
        padding: "0 40px 40px",
        transition: "background 140ms ease, color 140ms ease",
      }}
    >
      <div style={{ position: "sticky", top: 0, zIndex: 40, margin: "0 -40px 40px", background: "var(--bg)" }}>
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            height: 40,
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span style={{ color: "var(--ink-2)" }}>Road to demo day, Tue 1 Dec</span>
          <span style={{ display: "flex", alignItems: "baseline", gap: 6, flex: "none", whiteSpace: "nowrap" }}>
            <b style={{ fontWeight: 600, color: "var(--ink)" }}>{cdDays} days</b>
            <span style={{ color: "var(--ink-2)" }}>{cdClock}</span>
          </span>
        </div>
        <div style={{ height: 2, background: "var(--line-soft)" }}>
          <div style={{ height: "100%", width: progressPct, background: "var(--primary)" }} />
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <a
          className="rm-back"
          href="#/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--ink-2)",
            marginBottom: 18,
            textDecoration: "none",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Product Roadmap Board
        </a>

        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 40,
            flexWrap: "wrap",
            paddingBottom: 28,
            marginBottom: 24,
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div>
            <h1 style={{ margin: "0 0 10px", fontSize: 40, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              Platform roadmap: road to December 1
            </h1>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 680, textWrap: "pretty" }}>
              Four tracks, ten weeks, day by day. Ship the revenue tools as agents in parallel, solve generative
              commentary by mid program, fold what it teaches us back into VOD, and arrive with a product that matches
              the story.
            </p>
          </div>
          <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 10 }}>
            <button
              type="button"
              className="rm-icontoggle"
              onClick={toggleTheme}
              title={dark ? "Switch to light" : "Switch to dark"}
              aria-label={dark ? "Switch to light" : "Switch to dark"}
              style={{
                flex: "none",
                width: 36,
                height: 36,
                display: "grid",
                placeItems: "center",
                borderRadius: 8,
                border: "1px solid var(--line)",
                background: "transparent",
                color: "var(--ink-2)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {dark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)", marginRight: 2 }}>Who</span>
            <button
              type="button"
              className="rm-person"
              onClick={() => setPerson(null)}
              style={{
                height: 28,
                padding: "0 11px",
                borderRadius: 7,
                border: "1px solid " + all.border,
                background: all.bg,
                color: all.fg,
                font: "inherit",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Everyone
            </button>
            {ROSTER.map((name) => {
              const c = chip(person === name);
              return (
                <button
                  key={name}
                  type="button"
                  className="rm-person"
                  onClick={() => setPerson((p) => (p === name ? null : name))}
                  style={{
                    height: 28,
                    padding: "0 11px",
                    borderRadius: 7,
                    border: "1px solid " + c.border,
                    background: c.bg,
                    color: c.fg,
                    font: "inherit",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
            <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{person ? person + " is on " + hits + " blocks" : ""}</span>
            <div style={{ display: "inline-flex", padding: 2, borderRadius: 8, border: "1px solid var(--line)" }}>
              <button
                type="button"
                onClick={() => setZoom("weeks")}
                style={{
                  height: 26,
                  padding: "0 12px",
                  border: 0,
                  borderRadius: 6,
                  background: zoomDays ? "transparent" : "var(--hover)",
                  color: zoomDays ? "var(--ink-2)" : "var(--ink)",
                  font: "inherit",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Weeks
              </button>
              <button
                type="button"
                onClick={() => setZoom("days")}
                style={{
                  height: 26,
                  padding: "0 12px",
                  border: 0,
                  borderRadius: 6,
                  background: zoomDays ? "var(--hover)" : "transparent",
                  color: zoomDays ? "var(--ink)" : "var(--ink-2)",
                  font: "inherit",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Days
              </button>
            </div>
          </div>
        </div>

        <div className="board-scroll" style={{ overflowX: "auto", overflowY: "hidden", paddingBottom: 8, scrollbarWidth: "none" }}>
          <div style={{ minWidth: boardWidth }}>
            <div style={{ display: "grid", gridTemplateColumns: "190px 1fr" }}>
              <div />
              <div style={{ position: "relative", height: 30 }}>
                <span style={{ position: "absolute", left: nowLeft, top: 0, transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: "var(--now-tint)", color: "var(--ink)" }}>
                  {todayLabel}
                </span>
                <span style={{ position: "absolute", right: 0, top: 0, whiteSpace: "nowrap", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: "var(--primary-tint)", color: "var(--ink)" }}>
                  Demo day
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "190px 1fr", alignItems: "end" }}>
              <div />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(" + rulerCount + ", 1fr)" }}>
                {ruler.map((c, i) => (
                  <div key={i} style={{ padding: "0 0 8px 6px", borderLeft: c.border, fontSize: 11, color: "var(--ink-3)", lineHeight: 1.3, overflow: "hidden", whiteSpace: "nowrap" }}>
                    <b style={{ display: "block", fontSize: c.size, fontWeight: 600, color: c.color }}>{c.top}</b>
                    {c.sub}
                  </div>
                ))}
              </div>
            </div>

            {lanes.map((lane) => (
              <div key={lane.id} style={{ display: "grid", gridTemplateColumns: "190px 1fr", borderTop: "1px solid var(--line-soft)", opacity: lane.opacity, transition: "opacity 160ms ease" }}>
                <div style={{ padding: "18px 20px 18px 0", borderRight: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 9, fontSize: 15, fontWeight: 600, letterSpacing: "-0.015em" }}>
                    <span style={{ width: 9, height: 9, flex: "none", borderRadius: 2, background: lane.color }} />
                    {lane.name}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.4, color: "var(--ink-3)" }}>{lane.who}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.4, color: "var(--ink-3)" }}>{lane.note}</div>
                </div>
                <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(50, 1fr)", gridTemplateRows: lane.rowsCss, gap: "8px 0", padding: "16px 0 16px 1px", backgroundImage: gridBg }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: nowLeft, background: "var(--past)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: nowLeft, borderLeft: "2px solid var(--now)", pointerEvents: "none" }} />
                  {lane.bars.map((bar) => (
                    <button
                      key={bar.k}
                      type="button"
                      className="rm-bar"
                      onClick={() => toggleSel(bar.k)}
                      title={bar.who}
                      style={{
                        gridColumn: bar.col,
                        gridRow: bar.row,
                        position: "relative",
                        zIndex: 2,
                        textAlign: "left",
                        height: 42,
                        margin: "0 3px",
                        padding: "7px 11px",
                        overflow: "hidden",
                        border: bar.border,
                        borderLeft: bar.leftBorder,
                        borderRadius: 6,
                        background: bar.bg,
                        color: "var(--ink)",
                        font: "inherit",
                        fontSize: 13,
                        fontWeight: 600,
                        lineHeight: 1.2,
                        cursor: "pointer",
                        opacity: bar.opacity,
                        boxShadow: bar.ring,
                        transition: "opacity 160ms ease, box-shadow 120ms ease",
                      }}
                    >
                      <span style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{bar.title}</span>
                      <span style={{ display: "block", fontWeight: 400, fontSize: 11, color: "var(--ink-2)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{bar.sub}</span>
                    </button>
                  ))}
                  {lane.marks.map((mk) => (
                    <button
                      key={mk.k}
                      type="button"
                      className="rm-mark"
                      onClick={() => toggleSel(mk.k)}
                      style={{
                        position: "absolute",
                        left: mk.left,
                        top: mk.top,
                        zIndex: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        height: 22,
                        padding: "0 8px 0 0",
                        border: 0,
                        background: "transparent",
                        font: "inherit",
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        color: mk.color,
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        opacity: mk.opacity,
                        transform: "translateX(-2px)",
                        transition: "opacity 160ms ease",
                      }}
                    >
                      <span style={{ width: 11, height: 11, flex: "none", transform: "rotate(45deg)", borderRadius: 2, background: mk.fill, border: "2px solid " + mk.color, boxShadow: mk.ring }} />
                      {mk.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ height: 1, background: "var(--line-soft)" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 20px", marginTop: 18, fontSize: 12.5, color: "var(--ink-2)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <i style={{ width: 22, height: 10, borderRadius: 3, background: "var(--t-ship-tint)", borderLeft: "3px solid var(--t-ship)" }} />
            work in progress, width is duration
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <i style={{ width: 10, height: 10, transform: "rotate(45deg)", borderRadius: 2, border: "2px solid var(--ink-2)" }} />
            milestone, a single date
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <i style={{ width: 22, height: 10, borderRadius: 3, border: "1px dashed var(--ink-2)" }} />
            not yet committed
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <i style={{ width: 2, height: 12, background: "var(--now)" }} />
            today
          </span>
        </div>

        <section
          aria-live="polite"
          style={{
            position: "sticky",
            bottom: 20,
            marginTop: 22,
            zIndex: 30,
            border: "1px solid var(--line)",
            borderRadius: 12,
            background: "var(--surface)",
            boxShadow: d ? "var(--shadow)" : "none",
            padding: "18px 22px",
            transition: "box-shadow 160ms ease",
          }}
        >
          {!d ? (
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: "78ch" }}>
              Click any block or milestone to read what it actually means. The green line is today.
            </p>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
                <div>
                  <p style={{ margin: "0 0 4px", fontSize: 13, color: "var(--ink-2)" }}>{d.w}</p>
                  <h2 style={{ margin: "0 0 4px", display: "flex", alignItems: "center", gap: 9, fontSize: 21, fontWeight: 600, letterSpacing: "-0.02em" }}>
                    <span style={{ width: 9, height: 9, flex: "none", borderRadius: 2, background: selColor }} />
                    {d.t}
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--ink-2)" }}>{selCrew}</p>
                </div>
                <button
                  type="button"
                  className="rm-close"
                  onClick={() => setSel(null)}
                  aria-label="Close"
                  style={{
                    flex: "none",
                    width: 30,
                    height: 30,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 8,
                    border: "1px solid var(--line)",
                    background: "transparent",
                    color: "var(--ink-2)",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, maxWidth: "86ch", display: "flex", flexDirection: "column", gap: 6 }}>
                {d.b.map((line, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink)", textWrap: "pretty" }}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
