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
  "glass",
  "transparent",
  "radical",
  "chartreuse",
  "catppuccinMocha",
];

const Index = () => {
  const [username, setUsername] = useState("ShaonMajumder");
  const [theme, setTheme] = useState("glass");
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
    }, 300);

    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    if (!username.trim()) return;
    setIsLoaded(false);
    setPreviewUrl(buildCardUrl());
  }, [theme, font, colors, extension, site]);

  useEffect(() => {
    if (!previewUrl) return;
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [previewUrl]);

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
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">LC</span>
          <div>
            <p className="brand-title">LeetCode Stats Card</p>
            <p className="brand-subtitle">A clean SVG snapshot for your profile</p>
          </div>
        </div>
        <div className="topbar-links">
          <a
            href="https://github.com/ShaonMajumder/LeetCode-Stats-Card"
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </a>
          <a
            href="https://github.com/ShaonMajumder/LeetCode-Stats-Card"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </header>

      <main className="hero">
        <section className="hero-copy">
          <span className="eyebrow">LeetCode to SVG</span>
          <h1>Turn your LeetCode progress into a bold stats card.</h1>
          <p className="hero-subtitle">
            Build a shareable SVG for GitHub, portfolios, or resumes. Curate themes, fonts,
            and extensions in minutes without any design work.
          </p>
          <div className="step-row">
            <div className="step">
              <span className="step-index">01</span>
              <span className="step-text">Enter a username</span>
            </div>
            <div className="step">
              <span className="step-index">02</span>
              <span className="step-text">Pick a style</span>
            </div>
            <div className="step">
              <span className="step-index">03</span>
              <span className="step-text">Embed anywhere</span>
            </div>
          </div>
          <div className="meta-grid">
            <div className="meta-card">
              <p className="meta-title">SVG Ready</p>
              <p className="meta-text">Ideal for GitHub and docs</p>
            </div>
            <div className="meta-card">
              <p className="meta-title">Theme Driven</p>
              <p className="meta-text">Switch styles instantly</p>
            </div>
          </div>
        </section>

        <section className="hero-panel">
          <div className="config-card">
            <div className="config-header">
              <p className="config-label">Input</p>
              <h2>Configure your card</h2>
              <p className="config-desc">
                Adjust the visuals and generate a personalized LeetCode stats card.
              </p>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  placeholder="Your LeetCode username"
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
            </div>

            <div className="button-group">
              <button type="button" className="action-button primary" onClick={handlePreview}>
                Generate Card
              </button>
              <button type="button" className="action-button ghost" onClick={handleGo}>
                Open SVG
              </button>
              <button type="button" className="action-button ghost" onClick={handleMarkdown}>
                Copy Markdown
              </button>
            </div>
            <p className="config-note">
              Tip: use the preview to verify layout before sharing the SVG link.
            </p>
          </div>
        </section>
      </main>

      <section className="preview-section">
        <div className="preview-header">
          <h3>Live preview</h3>
          <p>Refreshes automatically as you adjust theme, font, or extensions.</p>
        </div>
        <div className={`preview-container ${previewUrl && !isLoaded ? "loading" : ""}`}>
          <div className="loading-spinner" />
          {previewUrl ? (
            <img
              key={previewUrl}
              id="preview"
              src={previewUrl}
              alt="LeetCode Stats preview"
              className={isLoaded ? "loaded" : ""}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsLoaded(true)}
            />
          ) : null}
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <p className="feature-kicker">Editorial layout</p>
          <h4>Minimal by design</h4>
          <p>Keep the spotlight on your solved count with a clean, typographic layout.</p>
        </article>
        <article className="feature-card">
          <p className="feature-kicker">Live data</p>
          <h4>Always up to date</h4>
          <p>Cards update from your profile so your stats stay current.</p>
        </article>
        <article className="feature-card">
          <p className="feature-kicker">Embed ready</p>
          <h4>Share anywhere</h4>
          <p>Use Markdown, HTML, or the raw SVG URL for instant sharing.</p>
        </article>
      </section>

      <footer className="footer">
        <p>Built by Shaon Majumder - Senior Software Engineer (AI &amp; Scalability)</p>
        <div className="footer-links">
          <a
            href="https://github.com/ShaonMajumder/LeetCode-Stats-Card"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="https://shaon-spark.netlify.app/" target="_blank" rel="noreferrer">
            Portfolio
          </a>
          <a href="https://medium.com/@shaon-spark" target="_blank" rel="noreferrer">
            Medium
          </a>
        </div>
      </footer>

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
