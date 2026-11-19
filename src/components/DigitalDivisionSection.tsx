import "./DigitalDivisionSection.css";

type DigitalProject = {
  id: string;
  title?: string;
  description?: string;
  screenshot: string;
  destination: string;
};

// Replace each screenshot and destination independently when the real project is ready.
const digitalProjects: DigitalProject[] = [
  { id: "01", title: "DIGITAL PROJECT / 01", description: "Replaceable website preview", screenshot: "/demo5.png", destination: "https://www.barongoacademy.co.ke/" },
  { id: "02", title: "DIGITAL PROJECT / 02", description: "Replaceable website preview", screenshot: "/demo6.png", destination: "https://riversidetimbersuppliers.netlify.app/" },
  { id: "03", title: "DIGITAL PROJECT / 03", description: "Replaceable website preview", screenshot: "/demo7.png", destination: "https://scissors-clip-spa.netlify.app/" },
  { id: "04", title: "DIGITAL PROJECT / 04", description: "Replaceable website preview", screenshot: "/demo8.png", destination: "https://tagoption-tan.vercel.app/" },
];

const digitalCapabilities = [
  "Website Design & Development",
  "Web Applications",
  "Digital Products & Experiences",
  "Website Optimization & Performance",
  "SEO & Digital Visibility",
];

function DesktopMockup({ project }: { project: DigitalProject }) {
  return (
    <a
      className="digital-project-link"
      href={project.destination}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title ?? `digital project ${project.id}`} in a new tab`}
    >
      <div className="digital-project-image">
        <img src={project.screenshot} alt="" loading="lazy" />
      </div>
      <div className="digital-project-caption">
        <div>
          {project.title && <span className="digital-project-title">{project.title}</span>}
          {project.description && <span className="digital-project-description">{project.description}</span>}
        </div>
        <span className="digital-project-arrow" aria-hidden="true">↗</span>
      </div>
    </a>
  );
}

export function DigitalDivisionSection() {
  return (
    <section className="digital-division-section" id="digital-division" aria-labelledby="digital-division-title">
      <div className="digital-division-inner">
        <header className="digital-division-intro">
          <p className="digital-division-label">OUR DIVISIONS / 02</p>
          <h2 id="digital-division-title">Digital</h2>
          <p className="digital-division-headline">Build beyond the ordinary.</p>
          <p className="digital-division-description">
            We design and develop powerful digital experiences that help businesses grow. From high-performing websites and web applications to digital products, we combine thoughtful design, intelligent development and optimization to turn ideas into meaningful online experiences.
          </p>
        </header>

        <div className="digital-project-grid">
          {digitalProjects.map((project) => <DesktopMockup key={project.id} project={project} />)}
        </div>

        <section className="digital-capabilities" aria-labelledby="digital-capabilities-title">
          <div className="digital-capabilities-heading">
            <p className="digital-division-label">OUR CAPABILITIES</p>
            <h3 id="digital-capabilities-title">What we do</h3>
          </div>
          <ul className="digital-capability-list">
            {digitalCapabilities.map((capability, index) => (
              <li key={capability}>
                <span className="digital-capability-number">0{index + 1}</span>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
