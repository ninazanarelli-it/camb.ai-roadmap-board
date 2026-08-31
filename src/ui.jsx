import React from "react";

export function Icon({ name, size = 16 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "rules")
    return (
      <svg {...common}>
        <path d="M15 12h-5M13 16H10M15 8h-5M20 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 4Z" />
        <path d="M14 2v4h6" />
      </svg>
    );
  if (name === "backlog")
    return (
      <svg {...common}>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    );
  if (name === "moon")
    return (
      <svg {...common}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    );
  if (name === "sun")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    );
  if (name === "updates")
    return (
      <svg {...common}>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v4.5h4.5" />
        <path d="M12 8v4l3 2" />
      </svg>
    );
  if (name === "info")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-5" />
        <path d="M12 8h.01" />
      </svg>
    );
  if (name === "close")
    return (
      <svg {...common}>
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    );
  if (name === "chevronLeft")
    return (
      <svg {...common}>
        <path d="M15 18l-6-6 6-6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function IconButton({ label, onClick, size = 36, color = "var(--ink-2)", children }) {
  return (
    <button
      type="button"
      className="iconBtn"
      onClick={onClick}
      title={label}
      aria-label={label}
      style={{
        flex: "none",
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
        borderRadius: size > 30 ? 8 : 7,
        border: "1px solid var(--line)",
        background: "transparent",
        color,
        cursor: "pointer",
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}

export function StatusDot({ color }) {
  return <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />;
}

export function SectionHead({ title, aside, gap = 4 }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>{title}</h2>
        {aside}
      </div>
      <div style={{ height: 1, background: "var(--line)", marginBottom: gap }} />
    </>
  );
}

export function Modal({ label, maxWidth, onClose, padding = "64px 24px", children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(0,0,0,0.42)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding,
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={{
          width: "100%",
          maxWidth,
          background: "var(--bg)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          borderRadius: 12,
          boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Avatar({ name, avatar, dark }) {
  const tone = dark ? avatar.dark : avatar.light;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, paddingTop: 3 }}>
      <span
        style={{
          width: 24,
          height: 24,
          flex: "none",
          display: "grid",
          placeItems: "center",
          fontSize: 12,
          fontWeight: 600,
          color: tone.fg,
          background: tone.bg,
          borderRadius: 6,
        }}
      >
        {name.slice(0, 1)}
      </span>
      <span style={{ fontSize: 15, fontWeight: 500 }}>{name}</span>
    </div>
  );
}
