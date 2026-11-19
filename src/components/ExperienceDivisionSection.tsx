import { useEffect, useRef, useState } from "react";
import "./ExperienceDivisionSection.css";

type ExperienceProject = {
  number: string;
  title: string;
  image: string;
  alt: string;
};

// Replace these four image paths independently with Luminus event photographs later.
const experienceProjects: ExperienceProject[] = [
  {
    number: "01",
    title: "Event Production & Setups",
    image: "/optimized/experience-event-production.webp",
    alt: "Wide-angle premium corporate event setup with stage lighting and an unbranded backdrop.",
  },
  {
    number: "02",
    title: "Brand Activations",
    image: "/optimized/experience-brand-activation.webp",
    alt: "Visitors exploring an elegant pop-up sampling booth in a contemporary venue.",
  },
  {
    number: "03",
    title: "Experiential Campaigns",
    image: "/optimized/experience-experiential-campaign.webp",
    alt: "People interacting with an outdoor experiential installation in an urban plaza.",
  },
  {
    number: "04",
    title: "Influencer & Brand Collaborations",
    image: "/optimized/experience-influencer-collaboration.webp",
    alt: "A content creator filming an unbranded product experience at an intimate event.",
  },
];

const experienceCapabilities = [
  "Event Production & Setups",
  "Brand Activations",
  "Experiential Campaigns",
  "Influencer & Brand Collaborations",
  "Product Launches & Promotional Experiences",
];

export function ExperienceDivisionSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      openerRef.current?.focus();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => current === null ? null : (current - 1 + experienceProjects.length) % experienceProjects.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => current === null ? null : (current + 1) % experienceProjects.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  const openProject = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setActiveIndex(index);
  };

  const moveProject = (direction: -1 | 1) => {
    setActiveIndex((current) => current === null ? null : (current + direction + experienceProjects.length) % experienceProjects.length);
  };

  const activeProject = activeIndex === null ? null : experienceProjects[activeIndex];

  return (
    <section className="experience-division-section" id="experience-division" aria-labelledby="experience-division-title">
      <div className="experience-division-inner">
        <header className="experience-division-intro">
          <p className="experience-division-label">OUR DIVISIONS / 03</p>
          <h2 id="experience-division-title">Experience</h2>
          <p className="experience-division-headline">Take your brand beyond the screen.</p>
          <p className="experience-division-description">
            We create meaningful brand experiences that bring businesses closer to their audiences. From immersive events and brand activations to influencer partnerships and product experiences, we turn brand moments into lasting connections.
          </p>
        </header>

        <div className="experience-project-grid" aria-label="Experience portfolio placeholders">
          {experienceProjects.map((project, index) => (
            <button
              className={`experience-project${index === 0 ? " experience-project-featured" : ""}`}
              key={project.number}
              type="button"
              onClick={(event) => openProject(index, event.currentTarget)}
              aria-label={`View larger image: ${project.title}`}
              aria-haspopup="dialog"
            >
              <span className="experience-project-image-wrap">
                <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
                <span className="experience-project-open" aria-hidden="true">↗</span>
              </span>
              <span className="experience-project-caption">
                <span className="experience-project-number">{project.number} / EXPERIENCE</span>
                <span className="experience-project-title">{project.title}</span>
              </span>
            </button>
          ))}
        </div>

        <section className="experience-capabilities" aria-labelledby="experience-capabilities-title">
          <div className="experience-capabilities-heading">
            <p className="experience-division-label">WHAT WE DO</p>
            <h3 id="experience-capabilities-title">Made to be experienced.</h3>
          </div>
          <ul className="experience-capability-list">
            {experienceCapabilities.map((capability, index) => (
              <li key={capability}>
                <span className="experience-capability-number">0{index + 1}</span>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {activeProject && (
        <div
          className="experience-lightbox-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <div className="experience-lightbox" role="dialog" aria-modal="true" aria-label={`${activeProject.title} image viewer`}>
            <button
              className="experience-lightbox-close"
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
              ref={closeButtonRef}
            >
              <span aria-hidden="true">×</span>
            </button>
            <button className="experience-lightbox-nav experience-lightbox-prev" type="button" onClick={() => moveProject(-1)} aria-label="Previous image">
              <span aria-hidden="true">←</span>
            </button>
            <figure className="experience-lightbox-figure">
              <img src={activeProject.image} alt={activeProject.alt} decoding="async" />
              <figcaption>
                <span className="experience-project-number">{activeProject.number} / EXPERIENCE</span>
                <span>{activeProject.title}</span>
              </figcaption>
            </figure>
            <button className="experience-lightbox-nav experience-lightbox-next" type="button" onClick={() => moveProject(1)} aria-label="Next image">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
