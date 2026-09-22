import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import PlatformRoadmap from "./PlatformRoadmap.jsx";
import ChatterboxRoadmap from "./ChatterboxRoadmap.jsx";
import AuthGate from "./AuthGate.jsx";
import "./index.css";

// Tiny hash router: the board links to roadmap sub-pages via `#/platform` and
// `#/chatterbox`; everything else renders the board.
function routeOf() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return hash.split(/[?#]/)[0];
}

function Root() {
  const [route, setRoute] = useState(routeOf);
  useEffect(() => {
    const onHash = () => {
      setRoute(routeOf());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route === "platform") return <PlatformRoadmap />;
  if (route === "chatterbox") return <ChatterboxRoadmap />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthGate>
    <Root />
  </AuthGate>
);
