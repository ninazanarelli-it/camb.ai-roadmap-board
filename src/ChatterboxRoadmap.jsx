import React, { useEffect, useState } from "react";

// Chatterbox roadmap — placeholder page. Mirrors the design export: a back link
// to the board and a "waiting on detailed content" note. Theme follows the
// shared roadmap sub-page preference so it is not blinding in dark mode.
export default function ChatterboxRoadmap() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("roadmap-theme");
      if (saved) setTheme(saved);
    } catch (e) {}
  }, []);

  return (
    <div
      data-theme={theme}
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--ink)",
        padding: "72px 40px 120px",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <a
          className="navLink"
          href="#/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--ink-2)",
            marginBottom: 20,
            textDecoration: "none",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Product Roadmap Board
        </a>
        <h1 style={{ margin: "0 0 12px", fontSize: 40, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
          Chatterbox roadmap
        </h1>
        <p style={{ margin: "0 0 40px", fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 700, textWrap: "pretty" }}>
          The detailed view of the Chatterbox track: workstreams, owners, dependencies and dates.
        </p>
        <div style={{ height: 1, background: "var(--line)", marginBottom: 28 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "18px 20px",
            border: "1px dashed var(--line)",
            borderRadius: 10,
            color: "var(--ink-2)",
            fontSize: 14,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l3 2" />
          </svg>
          Waiting on the detailed roadmap content. Send it over and this page gets built out.
        </div>
      </div>
    </div>
  );
}
