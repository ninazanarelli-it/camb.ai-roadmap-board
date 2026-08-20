import React, { useEffect, useRef, useState } from "react";

const ALLOWED_DOMAIN = "camb.ai";
const AUTH_KEY = "roadmap-board-auth";
const SESSION_DAYS = 7;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Decodes the JWT payload without verifying its signature — this is a
// client-side convenience gate for an internal tool, not a security boundary.
function decodeJwt(token) {
  const payload = token.split(".")[1];
  const json = decodeURIComponent(
    atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
  return JSON.parse(json);
}

function readSession() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session.expiresAt || session.expiresAt < Date.now()) return null;
    return session;
  } catch (e) {
    return null;
  }
}

export default function AuthGate({ children }) {
  const [session, setSession] = useState(readSession);
  const [error, setError] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (session || !CLIENT_ID) return;
    let cancelled = false;

    function handleCredential(response) {
      const payload = decodeJwt(response.credential);
      const domain = payload.hd || (payload.email || "").split("@")[1];
      if (domain !== ALLOWED_DOMAIN) {
        setError(`Access is restricted to @${ALLOWED_DOMAIN} accounts (signed in as ${payload.email}).`);
        return;
      }
      setError(null);
      const next = {
        email: payload.email,
        name: payload.name,
        expiresAt: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(next));
      setSession(next);
    }

    function trySetup() {
      if (cancelled) return;
      if (!window.google?.accounts?.id) {
        setTimeout(trySetup, 100);
        return;
      }
      window.google.accounts.id.initialize({ client_id: CLIENT_ID, callback: handleCredential });
      if (buttonRef.current) {
        window.google.accounts.id.renderButton(buttonRef.current, { theme: "outline", size: "large" });
      }
    }
    trySetup();
    return () => {
      cancelled = true;
    };
  }, [session]);

  if (session) return children;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F5F5",
        color: "#202020",
        fontFamily: "'InterDisplay', 'Inter', system-ui, sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          padding: "40px 32px",
          borderRadius: 14,
          border: "1px solid #E0E0E0",
          background: "#fff",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#89898A",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Product Roadmap Board
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>Sign in to continue</h1>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5, margin: "0 0 24px" }}>
          Access is restricted to camb.ai Google accounts.
        </p>
        <div ref={buttonRef} style={{ display: "flex", justifyContent: "center" }} />
        {error && <p style={{ fontSize: 13, color: "#9F2626", marginTop: 18, lineHeight: 1.5 }}>{error}</p>}
        {!CLIENT_ID && (
          <p style={{ fontSize: 12, color: "#9F2626", marginTop: 18 }}>
            Missing VITE_GOOGLE_CLIENT_ID — sign-in is not configured.
          </p>
        )}
      </div>
    </div>
  );
}
