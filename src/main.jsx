import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Pages/App";

if (import.meta.env.DEV) {
  const shouldIgnoreReactDevToolsMessage = (args) => {
    const first = args?.[0];
    return (
      typeof first === "string" &&
      (first.includes("Download the React DevTools") ||
        first.includes("react.dev/link/react-devtools"))
    );
  };

  const wrapConsole =
    (fn) =>
    (...args) => {
      if (shouldIgnoreReactDevToolsMessage(args)) return;
      fn(...args);
    };

  console.info = wrapConsole(console.info);
  console.log = wrapConsole(console.log);
  console.warn = wrapConsole(console.warn);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
