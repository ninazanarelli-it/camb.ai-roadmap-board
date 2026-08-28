import React, { useEffect, useMemo, useState } from "react";
import { loadBoard } from "./data.js";
import { GOLDEN_RULES, GROUP_COLOR, GROUP_HINT, STATUS_COLOR } from "./goldenRules.js";
import { Avatar, Icon, IconButton, Modal, SectionHead, StatusDot } from "./ui.jsx";

const NOTES_KEY = "roadmap-board-notes-v2";
const SEED_KEY = "roadmap-board-notes-seed";
const SEED_VERSION = "20";
const THEME_KEY = "roadmap-board-theme";
const dot = (s) => STATUS_COLOR[s] || "#89898A";
const pad = (n) => String(n).padStart(2, "0");
const rolesLabel = (roles) => roles.map((r) => `${r.label}: ${r.name}`).join("  |  ");

const ROW = {
  display: "grid",
  gridTemplateColumns: "150px 1fr 210px",
  gap: 20,
  alignItems: "start",
  padding: "18px 12px",
  margin: "0 -12px",
  borderRadius: 8,
  borderBottom: "1px solid var(--line-soft)",
};

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved;
    } catch (e) {}
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const set = (next) => {
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
  };
  return [theme, set];
}

function useSeededNotes(board) {
  const [notes, setNotes] = useState({});
  useEffect(() => {
    if (!board) return;
    let stored = {};
    try {
      stored = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
    } catch (e) {}
    let stamped = null;
    try {
      stamped = localStorage.getItem(SEED_KEY);
    } catch (e) {}
    if (stamped !== SEED_VERSION) {
      const merged = { ...stored, ...(board.seedNotes || {}) };
      try {
        localStorage.setItem(NOTES_KEY, JSON.stringify(merged));
        localStorage.setItem(SEED_KEY, SEED_VERSION);
      } catch (e) {}
      setNotes(merged);
    } else {
      setNotes(stored);
    }
  }, [board]);
  return notes;
}

function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const y = window.scrollY;
    const el = document.documentElement;
    el.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    el.scrollTop = y;
    return () => {
      el.style.overflow = "";
      document.body.style.overflow = "";
      window.scrollTo(0, y);
    };
  }, [locked]);
}

export default function App() {
  const [theme, setTheme] = useTheme();
  const dark = theme === "dark";
  const board = useMemo(() => loadBoard(), []);
  const notes = useSeededNotes(board);

  const [reportOpen, setReportOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [notesFor, setNotesFor] = useState(null);
  const [infoFor, setInfoFor] = useState(null);
  const [zoomIndex, setZoomIndex] = useState(null);

  const release = (board.releases || []).find((r) => r.id === infoFor) || null;
  const shots = useMemo(
    () => ((release?.comparisons || []).flatMap((g) => [g.before, g.after].filter(Boolean))),
    [release]
  );

  useScrollLock(rulesOpen || !!notesFor || !!infoFor || zoomIndex !== null);

  useEffect(() => {
    const onKey = (e) => {
      if (zoomIndex !== null && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        const dir = e.key === "ArrowRight" ? 1 : -1;
        setZoomIndex((i) => (i + dir + shots.length) % shots.length);
        return;
      }
      if (e.key !== "Escape") return;
      if (zoomIndex !== null) setZoomIndex(null);
      else {
        setRulesOpen(false);
        setNotesFor(null);
        setInfoFor(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomIndex, shots.length]);

  const subjects = [
    ...board.team.map((t) => ({ id: t.id, name: t.name, projectTitle: t.current.title })),
    ...(board.releases || []).map((r) => ({ id: r.id, name: r.name, projectTitle: r.title })),
  ];
  const subject = subjects.find((s) => s.id === notesFor);
  const noteList = notes[notesFor] || [];

  const h = board.oncall.handover;
  const total = h.groups.reduce((n, g) => n + g.items.length, 0);
  const num = (label) => (h.numbers.find((n) => n.label === label) || { value: "\u2014" }).value;

  return (
    <div
      data-theme={theme}
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--ink)",
        padding: "72px 40px 120px",
        transition: "background 140ms ease, color 140ms ease",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <header
          style={{
            marginBottom: 52,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)", marginBottom: 18 }}>
              Product &nbsp;/&nbsp; Frontend
            </div>
            <h1 style={{ margin: "0 0 12px", fontSize: 40, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              Product Roadmap Board
            </h1>
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                textWrap: "pretty",
                maxWidth: 700,
              }}
            >
              A company-wide view of what the product team is building now and what comes next. Airtable stays the
              source of truth for every task — this board is the summary, without the detail.
            </p>
            <div style={{ fontSize: 13, color: "var(--ink-2)" }}>Last updated {board.lastUpdated}</div>
          </div>
          <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <IconButton label="Golden Rules" onClick={() => setRulesOpen(true)}>
              <Icon name="rules" size={18} />
            </IconButton>
            <IconButton
              label={dark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setTheme(dark ? "light" : "dark")}
            >
              <Icon name={dark ? "sun" : "moon"} size={18} />
            </IconButton>
          </div>
        </header>

        <section style={{ marginBottom: 60 }}>
          <SectionHead title="Currently working on" />
          {board.team.map((dev) => (
            <div className="row" key={dev.id} style={ROW}>
              <Avatar name={dev.name} avatar={dev.avatar} dark={dark} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                    {dev.current.title}
                  </span>
                  {dev.current.airtableUrl ? (
                    <a
                      className="airtableLink"
                      href={dev.current.airtableUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)" }}
                    >
                      Airtable ↗
                    </a>
                  ) : (
                    <span
                      title="Project not available on Airtable"
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--ink-3)",
                        cursor: "help",
                        borderBottom: "1px dotted var(--ink-3)",
                      }}
                    >
                      Airtable
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 14, color: "var(--ink-2)" }}>{rolesLabel(dev.roles)}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 14,
                  paddingTop: 5,
                }}
              >
                {dev.current.targetDate && (
                  <span style={{ fontSize: 13, color: "var(--ink-2)" }}>Due {dev.current.targetDate}</span>
                )}
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 500 }}>
                  <StatusDot color={dot(dev.current.status)} />
                  {dev.current.status}
                </span>
                <IconButton
                  label={`Updates on ${dev.current.title}`}
                  size={28}
                  color={(notes[dev.id] || []).length ? "var(--ink)" : "var(--ink-2)"}
                  onClick={() => setNotesFor(dev.id)}
                >
                  <Icon name="updates" size={15} />
                </IconButton>
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 60 }}>
          <SectionHead
            title="Up next"
            aside={<span style={{ fontSize: 13, color: "var(--ink-2)" }}>Pick in this order</span>}
          />
          {board.queue.map((item) => {
            const placeholder = item.title === "Placeholder";
            return (
              <div
                className="row"
                key={item.priority}
                style={{
                  display: "grid",
                  gridTemplateColumns: "46px 1fr 230px",
                  gap: 16,
                  alignItems: "center",
                  padding: "15px 12px",
                  margin: "0 -12px",
                  borderRadius: 8,
                  borderBottom: "1px solid var(--line-soft)",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--ink-2)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {pad(item.priority)}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        letterSpacing: "-0.015em",
                        color: placeholder ? "var(--ink-2)" : "var(--ink)",
                      }}
                    >
                      {item.title}
                    </span>
                    {item.urgent && (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 5,
                          background: "var(--error-tint)",
                          color: "var(--error-ink)",
                        }}
                      >
                        {item.urgent}
                      </span>
                    )}
                  </div>
                  {item.note && <span style={{ fontSize: 14, color: "var(--ink-2)" }}>{item.note}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "flex-end" }}>
                  {item.due && <span style={{ fontSize: 13, color: "var(--ink-2)" }}>Due {item.due}</span>}
                  <span
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, color: "var(--ink-2)" }}
                  >
                    <StatusDot color={dot(item.status)} />
                    {item.owner ? `${item.owner} · ${item.status}` : item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        <section>
          <SectionHead
            title="Bugs management"
            gap={18}
            aside={
              <span
                style={{ display: "inline-flex", alignItems: "baseline", gap: 8, fontSize: 13, color: "var(--ink-2)" }}
              >
                On-call rotates Monday to Monday
                <a
                  className="airtableLink"
                  href="https://airtable.com/appPzA0m65mBklIhr/tblt9rVxbIXp5cYqw/viwwav6BPINRp2uiT?blocks=hide"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontWeight: 500, color: "var(--ink-2)" }}
                >
                  Bugs board ↗
                </a>
              </span>
            }
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <OncallCard
              now
              shift={board.oncall.current}
              blurb="They triage every new bug and are the first point of contact this week."
            />
            <OncallCard
              shift={board.oncall.next}
              blurb="Rotation hands over Monday morning with a written summary."
            />
          </div>

          <div style={{ borderRadius: 10, border: "1px solid var(--line)", overflow: "hidden" }}>
            <button
              type="button"
              className="reportToggle"
              onClick={() => setReportOpen((v) => !v)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "16px 20px",
                background: "transparent",
                border: 0,
                cursor: "pointer",
                font: "inherit",
                textAlign: "left",
                color: "var(--ink)",
              }}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Last week's bug report — {h.range}</span>
                <span style={{ fontSize: 13, color: "var(--ink-2)" }}>
                  Handed over by {h.author} · {num("filed")} filed, {num("resolved")} resolved
                </span>
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)", whiteSpace: "nowrap" }}>
                {reportOpen ? "Hide details" : "Show details"}
              </span>
            </button>

            {reportOpen && (
              <div style={{ padding: "4px 20px 22px" }}>
                <div
                  style={{
                    padding: "16px 0 20px",
                    borderTop: "1px solid var(--line-soft)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--ink-2)",
                    textWrap: "pretty",
                  }}
                >
                  {num("filed")} bugs were filed last week and {num("resolved")} were resolved, so the backlog grew by{" "}
                  {num("net").replace("+", "")}. The {total} items below are what the on-call pair tracked across the{" "}
                  {h.scope}, grouped by where each one sits right now.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {h.groups.map((group) => (
                    <div key={group.label}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                        <span style={{ alignSelf: "center" }}>
                          <StatusDot color={GROUP_COLOR[group.label] || "#89898A"} />
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{group.label}</span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--ink-2)",
                            background: "var(--surface)",
                            borderRadius: 20,
                            padding: "2px 9px",
                          }}
                        >
                          {group.items.length}
                        </span>
                        <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{GROUP_HINT[group.label] || ""}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {group.items.map((line) => {
                          const [text, ...meta] = line.split(" · ");
                          return (
                            <div
                              key={line}
                              style={{
                                display: "flex",
                                alignItems: "baseline",
                                justifyContent: "space-between",
                                gap: 20,
                                padding: "8px 0 8px 18px",
                                borderBottom: "1px solid var(--line-soft)",
                              }}
                            >
                              <span style={{ fontSize: 14, lineHeight: 1.45, textWrap: "pretty" }}>{text}</span>
                              <span
                                style={{
                                  flex: "none",
                                  fontSize: 12,
                                  color: "var(--ink-2)",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {meta.join(" · ")}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section style={{ marginTop: 60 }}>
          <SectionHead
            title="Just Released (last 7 days)"
            aside={<span style={{ fontSize: 13, color: "var(--ink-2)" }}>Open info for what was done</span>}
          />
          {(board.releases || []).map((rel) => (
            <div className="row" key={rel.id} style={ROW}>
              <Avatar name={rel.name} avatar={rel.avatar} dark={dark} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                    {rel.title}
                  </span>
                  {rel.airtableUrl && (
                    <a
                      className="airtableLink"
                      href={rel.airtableUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)" }}
                    >
                      Airtable ↗
                    </a>
                  )}
                </div>
                <div style={{ fontSize: 14, color: "var(--ink-2)" }}>{rolesLabel(rel.roles)}</div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14, paddingTop: 5 }}
              >
                <span style={{ fontSize: 13, color: "var(--ink-2)" }}>Released {rel.releasedOn}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 500 }}>
                  <StatusDot color="#0F741F" />
                  Shipped
                </span>
                <IconButton label={`What was done — ${rel.title}`} size={28} onClick={() => setInfoFor(rel.id)}>
                  <Icon name="info" size={15} />
                </IconButton>
              </div>
            </div>
          ))}
        </section>
      </div>

      {zoomIndex !== null && shots[zoomIndex] && (
        <div
          onClick={() => setZoomIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 80,
            background: "rgba(0,0,0,0.82)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: 40,
            cursor: "zoom-out",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flex: "none" }}
          >
            <span
              style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 14, fontWeight: 500, color: "#fff" }}
            >
              {shots[zoomIndex].caption}
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                {zoomIndex + 1} / {shots.length}
              </span>
            </span>
            <ZoomButton label="Close" onClick={() => setZoomIndex(null)} size={34}>
              <Icon name="close" size={16} />
            </ZoomButton>
          </div>
          <div style={{ flex: "1 1 auto", minHeight: 0, display: "flex", alignItems: "center", gap: 16 }}>
            <ZoomButton
              label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setZoomIndex((i) => (i - 1 + shots.length) % shots.length);
              }}
            >
              <Icon name="chevronLeft" size={20} />
            </ZoomButton>
            <div
              role="img"
              aria-label={shots[zoomIndex].caption}
              style={{
                flex: "1 1 auto",
                alignSelf: "stretch",
                minHeight: 0,
                backgroundImage: `url("${shots[zoomIndex].src}")`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <ZoomButton
              label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setZoomIndex((i) => (i + 1) % shots.length);
              }}
            >
              <Icon name="chevronRight" size={20} />
            </ZoomButton>
          </div>
        </div>
      )}

      {release && (
        <Modal label="Release details" maxWidth={620} onClose={() => setInfoFor(null)}>
          <ModalHead
            kicker={`Released ${release.releasedOn} \u00a0·\u00a0 ${release.name}`}
            title={release.title}
            titleSize={24}
            onClose={() => setInfoFor(null)}
          />
          <div
            style={{
              padding: "22px 30px 28px",
              maxHeight: "62vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {(release.details || []).map((text) => (
              <p key={text} style={{ margin: 0, fontSize: 15, lineHeight: 1.62, color: "var(--ink-2)", textWrap: "pretty" }}>
                {text}
              </p>
            ))}
            {!!(release.comparisons || []).length && (
              <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 10 }}>
                {release.comparisons.map((group) => (
                  <div key={group.title}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>
                      {group.title}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      {[group.before, group.after].filter(Boolean).map((img) => (
                        <button
                          key={img.src}
                          type="button"
                          title={img.caption}
                          onClick={() => setZoomIndex(shots.findIndex((s) => s.src === img.src))}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 7,
                            padding: 0,
                            border: 0,
                            background: "transparent",
                            font: "inherit",
                            textAlign: "left",
                            color: "inherit",
                            cursor: "zoom-in",
                          }}
                        >
                          <div
                            role="img"
                            aria-label={img.caption}
                            style={{
                              width: "100%",
                              aspectRatio: "2 / 1",
                              backgroundImage: `url("${img.src}")`,
                              backgroundSize: "cover",
                              backgroundPosition: "top center",
                              backgroundColor: "var(--surface)",
                              border: "1px solid var(--line)",
                              borderRadius: 7,
                            }}
                          />
                          <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{img.caption}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      {notesFor && (
        <Modal label="Project updates" maxWidth={560} onClose={() => setNotesFor(null)}>
          <ModalHead
            kicker={`Updates \u00a0·\u00a0 ${subject?.name || ""}`}
            title={subject?.projectTitle || ""}
            titleSize={22}
            padding="26px 28px 20px"
            onClose={() => setNotesFor(null)}
          />
          <div style={{ padding: "6px 28px 22px", maxHeight: "60vh", overflowY: "auto" }}>
            {!noteList.length && (
              <div style={{ padding: "30px 0 26px", fontSize: 14, color: "var(--ink-2)" }}>
                No updates on this project yet.
              </div>
            )}
            {noteList.map((note) => (
              <div
                key={note.at}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "18px 0",
                  borderBottom: "1px solid var(--line-soft)",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    fontSize: 15,
                    lineHeight: 1.55,
                    overflowWrap: "anywhere",
                    textWrap: "pretty",
                  }}
                >
                  {note.groups ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {note.groups.map((group) => (
                        <div key={group.heading}>
                          <div style={{ fontWeight: 600, marginBottom: 6 }}>{group.heading}</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {group.items.map((item) => (
                              <div key={item} style={{ color: "var(--ink-2)" }}>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : note.title ? (
                    <>
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>{note.title}</div>
                      <span style={{ whiteSpace: "pre-line" }}>{note.text}</span>
                    </>
                  ) : (
                    <span style={{ whiteSpace: "pre-line" }}>{note.text}</span>
                  )}
                </div>
                <span
                  style={{
                    flex: "none",
                    fontSize: 12,
                    color: "var(--ink-2)",
                    whiteSpace: "nowrap",
                    paddingTop: 3,
                  }}
                >
                  {note.date}
                </span>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {rulesOpen && (
        <Modal label="Golden Rules" maxWidth={760} padding="48px 24px" onClose={() => setRulesOpen(false)}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 24,
              padding: "32px 40px 24px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-2)",
                  marginBottom: 12,
                }}
              >
                Product &amp; Engineering &nbsp;·&nbsp; Working Agreement
              </div>
              <h2 style={{ margin: "0 0 10px", fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Golden Rules
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--ink-2)",
                  maxWidth: 520,
                  textWrap: "pretty",
                }}
              >
                The development process every product release follows. Visible to everyone, applied consistently — nine
                clauses, not renegotiated mid-release.
              </p>
            </div>
            <IconButton label="Close" size={34} onClick={() => setRulesOpen(false)}>
              <Icon name="close" size={16} />
            </IconButton>
          </div>

          <div style={{ padding: "8px 40px 0" }}>
            {GOLDEN_RULES.map((rule, i) => (
              <div
                key={rule.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr",
                  gap: 20,
                  padding: "24px 0",
                  borderBottom: "1px solid var(--line-soft)",
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--primary)",
                    fontVariantNumeric: "tabular-nums",
                    paddingTop: 2,
                  }}
                >
                  {pad(i + 1)}
                </div>
                <div>
                  <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.3 }}>
                    {rule.title}
                  </h3>
                  {rule.paras.map((text) => (
                    <p
                      key={text}
                      style={{ margin: "0 0 8px", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", textWrap: "pretty" }}
                    >
                      {text}
                    </p>
                  ))}
                  {rule.list && (
                    <ul
                      style={{
                        margin: "10px 0 0",
                        padding: "0 0 0 18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      {rule.list.map((li) => (
                        <li key={li} style={{ fontSize: 15, lineHeight: 1.5, color: "var(--ink-2)" }}>
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                  {rule.closing && (
                    <p
                      style={{
                        margin: "12px 0 0",
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "var(--ink)",
                        fontWeight: 500,
                        textWrap: "pretty",
                      }}
                    >
                      {rule.closing}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", padding: "28px 40px 34px" }}>
            <div style={{ flex: "1 1 100%", minWidth: 240 }}>
              <div style={{ height: 1, background: "var(--ink-3)", marginBottom: 8 }} />
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 12, color: "var(--ink-2)" }}>
                <span>Product &amp; Engineering</span>
                <span>In effect Aug 2026</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function OncallCard({ now, shift, blurb }) {
  return (
    <div
      style={{
        padding: "18px 20px",
        borderRadius: 10,
        background: "var(--surface)",
        opacity: now ? 1 : 0.72,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          fontWeight: 600,
          color: now ? "var(--primary)" : "var(--ink-2)",
          marginBottom: 4,
        }}
      >
        {now && <StatusDot color="var(--primary)" />}
        {now ? "On call now" : "On call next"}
      </div>
      <div style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 14 }}>{shift.week}</div>
      <div style={{ display: "grid", gridTemplateColumns: "78px 1fr", rowGap: 8, fontSize: 15 }}>
        <span style={{ color: "var(--ink-2)", fontSize: 13, alignSelf: "center" }}>Engineer</span>
        <span style={{ fontWeight: 600 }}>{shift.engineer}</span>
        <span style={{ color: "var(--ink-2)", fontSize: 13, alignSelf: "center" }}>QA</span>
        <span style={{ fontWeight: 600 }}>{shift.qa}</span>
      </div>
      <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.5, color: "var(--ink-2)", textWrap: "pretty" }}>
        {blurb}
      </div>
    </div>
  );
}

function ModalHead({ kicker, title, titleSize, padding = "26px 30px 20px", onClose }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        padding,
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-2)",
            marginBottom: 10,
          }}
        >
          {kicker}
        </div>
        <h2 style={{ margin: 0, fontSize: titleSize, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
          {title}
        </h2>
      </div>
      <IconButton label="Close" size={32} onClick={onClose}>
        <Icon name="close" size={16} />
      </IconButton>
    </div>
  );
}

function ZoomButton({ label, onClick, size = 40, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        flex: "none",
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(0,0,0,0.3)",
        color: "#fff",
        cursor: "pointer",
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}
