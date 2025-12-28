import { useEffect, useState } from "react";
import { fonts } from "@/data/google-fonts";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").trim().replace(/\/$/, "");

const themes = [
  "light",
  "dark",
  "nord",
  "forest",
  "wtf",
  "unicorn",
  "transparent",
  "radical",
  "chartreuse",
  "catppuccinMocha",
];

const Index = () => {
  const [username, setUsername] = useState("ShaonMajumder");
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("Baloo 2");
  const [colors, setColors] = useState("");
  const [extension, setExtension] = useState("activity");
  const [site, setSite] = useState("us");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const buildCardUrl = () => {
    const trimmed = username.trim();
    if (!trimmed) return "";

    const base =
      API_BASE_URL ||
      (typeof window !== "undefined"
        ? import.meta.env.DEV
          ? "http://localhost:8787"
          : window.location.origin
        : "");
    const params = new URLSearchParams();
    params.set("theme", theme);
    params.set("font", font);
    if (colors.trim()) params.set("colors", colors.trim());
    if (extension) params.set("ext", extension);
    if (site === "cn") params.set("site", "cn");

    return `${base}/${encodeURIComponent(trimmed)}?${params.toString()}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!username.trim()) {
        setPreviewUrl("");
        return;
      }
      setIsLoaded(false);
      setPreviewUrl(buildCardUrl());
    }, 1000);

    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    if (!username.trim()) return;
    setIsLoaded(false);
    setPreviewUrl(buildCardUrl());
  }, [theme, font, colors, extension, site]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handlePreview = () => {
    if (!username.trim()) return;
    setIsLoaded(false);
    setPreviewUrl(buildCardUrl());
  };

  const handleGo = () => {
    const cardUrl = buildCardUrl();
    if (!cardUrl) return;
    window.open(cardUrl, "_blank", "noreferrer");
  };

  const handleMarkdown = async () => {
    const cardUrl = buildCardUrl();
    if (!cardUrl) return;
    const markdown = `![LeetCode Stats](${cardUrl})`;
    try {
      await navigator.clipboard.writeText(markdown);
      window.alert("Markdown copied to clipboard.");
    } catch {
      window.prompt("Copy markdown", markdown);
    }
  };

  return (
    <div className="container">
      <h1>LeetCode Stats Card</h1>

      <div className="card">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            placeholder="Your LeetCode Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="theme">Theme</label>
          <select id="theme" value={theme} onChange={(event) => setTheme(event.target.value)}>
            {themes.map((themeName) => (
              <option key={themeName} value={themeName}>
                {themeName}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="font">Font</label>
          <select id="font" value={font} onChange={(event) => setFont(event.target.value)}>
            {fonts.map((fontName) => (
              <option key={fontName} value={fontName}>
                {fontName}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="colors">Colors</label>
          <input
            id="colors"
            placeholder="#1e1e2e,#45475a,#cdd6f4,#bac2de,#fab387,#a6e3a1,#f9e2af,#f38ba8"
            value={colors}
            onChange={(event) => setColors(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="extension">Extension</label>
          <select
            id="extension"
            value={extension}
            onChange={(event) => setExtension(event.target.value)}
          >
            <option value="">No Extension</option>
            <option value="activity">Activity</option>
            <option value="contest">Contest</option>
            <option value="heatmap">Heatmap</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="site">Source</label>
          <select id="site" value={site} onChange={(event) => setSite(event.target.value)}>
            <option value="us">LeetCode</option>
            <option value="cn">LeetCode CN</option>
          </select>
        </div>

        <div className="button-group">
          <button type="button" onClick={handlePreview}>
            Preview
          </button>
          <button type="button" onClick={handleGo}>
            Go
          </button>
          <button type="button" onClick={handleMarkdown}>
            Markdown
          </button>
        </div>
      </div>

      <div className={`preview-container ${previewUrl && !isLoaded ? "loading" : ""}`}>
        <div className="loading-spinner" />
        {previewUrl ? (
          <img
            id="preview"
            src={previewUrl}
            alt="LeetCode Stats preview"
            className={isLoaded ? "loaded" : ""}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
          />
        ) : null}
      </div>

      <div className="footer">
        <a
          href="https://github.com/ShaonMajumder/LeetCode-Stats-Card"
          target="_blank"
          rel="noreferrer"
        >
          Documentation on GitHub
        </a>
      </div>

      <button
        type="button"
        className="theme-toggle"
        onClick={() => setDarkMode((prev) => !prev)}
        title="Toggle theme"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2" />
          <path d="M12 21v2" />
          <path d="M4.22 4.22l1.42 1.42" />
          <path d="M18.36 18.36l1.42 1.42" />
          <path d="M1 12h2" />
          <path d="M21 12h2" />
          <path d="M4.22 19.78l1.42-1.42" />
          <path d="M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
