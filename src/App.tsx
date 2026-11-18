import { useEffect, useState } from "react";
import { PulsingLoader } from "./components/PulsingLoader";

type Theme = "light" | "dark";

const navItems = ["Home", "About", "Divisions", "Blog", "Contacts", "Footer"] as const;

const divisions = [
  {
    id: "creative",
    number: "01",
    title: "Luminus Creative",
    services: "Branding · Content · Campaigns",
    className: "creative",
  },
  {
    id: "digital",
    number: "02",
    title: "Luminus Digital",
    services: "Web · E-commerce · Applications",
    className: "digital",
  },
  {
    id: "experience",
    number: "03",
    title: "Luminus Experience",
    services: "Activations · Events · Influence",
    className: "experience",
  },
] as const;

function readSavedTheme(): Theme {
  try {
    const savedTheme = window.localStorage.getItem("luminus-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {
    // Storage can be unavailable in private browsing; use the system preference instead.
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function SparkMark() {
  return (
    <svg aria-hidden="true" className="brand-mark" viewBox="0 0 40 40" fill="none">
      <path d="M8 31V9h6.2v16.3H31V31H8Z" fill="currentColor" />
      <path d="M22 8h10v10h-5.2v-4.8H22V8Z" fill="var(--accent)" />
      <circle cx="30.7" cy="9.3" r="2.5" fill="var(--accent)" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === "light" ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 1.8v2M10 16.2v2M18.2 10h-2M3.8 10h-2m14-5.8-1.4 1.4M5.6 14.4l-1.4 1.4m11.6 0-1.4-1.4M5.6 5.6 4.2 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M16.9 12.4A7.5 7.5 0 0 1 7.6 3.1a7.7 7.7 0 1 0 9.3 9.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(readSavedTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem("luminus-theme", theme);
    } catch {
      // The selected theme still works for this session if storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));
  const scrollToDivisions = () => {
    document.getElementById("division-showcase")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="site-shell">
      <div className="page-glow page-glow--one" aria-hidden="true" />
      <div className="page-glow page-glow--two" aria-hidden="true" />

      <header className="site-header">
        <div className="navbar" aria-label="Main navigation">
          <div className="brand-lockup" aria-label="Luminus">
            <SparkMark />
            <span>LUMINUS</span>
            <span className="brand-period" aria-hidden="true">.</span>
          </div>

          <nav id="mobile-menu" className={`nav-links${isMenuOpen ? " nav-links--open" : ""}`} aria-label="Main menu">
            {navItems.map((item) => (
              <button
                className={`nav-link${item === "Home" ? " nav-link--active" : ""}`}
                type="button"
                key={item}
                aria-current={item === "Home" ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-pressed={theme === "dark"}
          >
            <ThemeIcon theme={theme} />
            <span>{theme === "light" ? "Light" : "Dark"}</span>
          </button>

          <button
            className="mobile-menu-toggle"
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <main className="hero-layout">
        <section className="hero-copy" aria-labelledby="hero-title">
          <p className="eyebrow"><span className="eyebrow-dot" /> creative agency</p>
          <h1 id="hero-title" aria-label="Bringing Brands into the light.">
            <span aria-hidden="true">Bringing Brands</span>
            <span className="hero-title-second" aria-hidden="true">into the <em>light.</em></span>
          </h1>
          <p className="hero-description">
            We illuminate business potential through strategic marketing, creative storytelling,
            and innovative digital solutions that make brands impossible to overlook.
          </p>

          <div className="hero-actions" aria-label="Explore Luminus">
            <button className="button button--primary" type="button">
              Start a project <ArrowIcon />
            </button>
            <button className="button button--secondary" type="button" onClick={scrollToDivisions}>
              Meet the divisions <span aria-hidden="true" className="button-spark">↗</span>
            </button>
          </div>

          <div className="hero-footnote">
            <span className="footnote-rule" aria-hidden="true" />
            <span>Clarity. Creativity. Growth.</span>
          </div>
        </section>

        <section className="hero-visual" id="division-showcase" aria-label="Luminus divisions">
          <div className="visual-orbit visual-orbit--outer" aria-hidden="true" />
          <div className="visual-orbit visual-orbit--inner" aria-hidden="true" />
          <span className="visual-index" aria-hidden="true">L / 03</span>

          <div className="light-card">
            <div className="light-card-topline">
              <span>THE LUMINUS IDEA</span>
              <span>EST. FOR WHAT’S NEXT</span>
            </div>
            <div className="light-card-sun" aria-hidden="true">
              <span className="sun-core" />
              <span className="sun-ray sun-ray--one" />
              <span className="sun-ray sun-ray--two" />
              <span className="sun-ray sun-ray--three" />
            </div>
            <div className="light-card-title" aria-hidden="true">
              <span>MAKE</span>
              <span>IT</span>
              <em>MATTER.</em>
            </div>
            <div className="light-card-footer">
              <span>STRATEGY · STORY · DIGITAL</span>
              <span className="footer-star" aria-hidden="true">✳</span>
            </div>
          </div>

          <div className="division-cards">
            {divisions.map((division) => (
              <article className={`division-card division-card--${division.className}`} key={division.id}>
                <div className="division-card-meta">
                  <span>{division.number} / DIVISION</span>
                  <span className="division-card-arrow" aria-hidden="true">↗</span>
                </div>
                <h2>{division.title}</h2>
                <p>{division.services}</p>
              </article>
            ))}
          </div>

          <div className="visual-caption" aria-hidden="true">
            <span className="caption-dot" /> A brighter kind of growth
          </div>
        </section>
      </main>

      {isLoading && <PulsingLoader fullScreen label="Luminus is getting ready" />}
    </div>
  );
}

export default App;
