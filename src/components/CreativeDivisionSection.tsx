import { useEffect, useRef, useState } from "react";
import "./CreativeDivisionSection.css";

type CreativeProject = {
  id: string;
  poster: string;
  videoSrc: string;
};

type CreativeProjectSource = {
  id: string;
  videoSrc: string;
  posterOverride?: string;
};

function cloudinaryThumbnail(videoSrc: string) {
  return videoSrc
    .replace("/video/upload/", "/video/upload/so_auto,w_600,q_auto/")
    .replace(/\.mp4(?:\?.*)?$/i, ".jpg");
}

// Cloudinary selects a representative frame automatically; set posterOverride for any custom still.
const creativeProjectSources: CreativeProjectSource[] = [
  { id: "01", videoSrc: "https://res.cloudinary.com/liktjduy/video/upload/v1783372172/reel4_zed4wl.mp4" },
  { id: "02", videoSrc: "https://res.cloudinary.com/liktjduy/video/upload/v1783372174/reel3_chjyf3.mp4" },
  { id: "03", videoSrc: "https://res.cloudinary.com/liktjduy/video/upload/v1783372202/reel6_ivzuqs.mp4" },
  { id: "04", videoSrc: "https://res.cloudinary.com/liktjduy/video/upload/v1783372206/reel1_notwgb.mp4" },
];

const creativeProjects: CreativeProject[] = creativeProjectSources.map((project) => ({
  id: project.id,
  videoSrc: project.videoSrc,
  poster: project.posterOverride ?? cloudinaryThumbnail(project.videoSrc),
}));

// The source video and any poster override stay independently replaceable per project.

function PlayIcon({ isPlaying = false }: { isPlaying?: boolean }) {
  return isPlaying ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
      <path d="M5 3.5h3.2v13H5zm6.8 0H15v13h-3.2z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6 3.8c0-.6.7-1 1.2-.7l9 5.4a1.7 1.7 0 0 1 0 3l-9 5.4c-.5.3-1.2-.1-1.2-.7V3.8Z" />
    </svg>
  );
}

export function CreativeDivisionSection() {
  const [activeProject, setActiveProject] = useState<CreativeProject | null>(null);
  const [placeholderPlaying, setPlaceholderPlaying] = useState(true);
  const [placeholderMuted, setPlaceholderMuted] = useState(true);
  const [placeholderProgress, setPlaceholderProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const playerStageRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(frame);
      returnFocusRef.current?.focus();
    };
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject || activeProject.videoSrc || !placeholderPlaying) return;
    const timer = window.setInterval(() => {
      setPlaceholderProgress((progress) => (progress >= 100 ? 0 : progress + 0.4));
    }, 200);
    return () => window.clearInterval(timer);
  }, [activeProject, placeholderPlaying]);

  const openProject = (project: CreativeProject, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger;
    setPlaceholderPlaying(true);
    setPlaceholderMuted(true);
    setPlaceholderProgress(0);
    setActiveProject(project);
  };

  const toggleFullscreen = () => {
    const target = activeProject?.videoSrc ? videoRef.current : playerStageRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    } else {
      void target.requestFullscreen().catch(() => undefined);
    }
  };

  return (
    <section className="creative-division-section" id="creative-division" aria-labelledby="creative-division-title">
      <div className="creative-division-inner">
        <header className="creative-division-intro">
          <p className="creative-division-label">OUR DIVISIONS / 01</p>
          <h2 id="creative-division-title">Creative</h2>
          <p className="creative-division-headline">Make them feel something.</p>
          <p className="creative-division-description">
            We turn ideas into identities, content and campaigns that capture attention. From brand storytelling to high-impact visual production, we create work that makes brands memorable.
          </p>
        </header>

        <div className="creative-project-grid" aria-label="Creative video project previews">
          {creativeProjects.map((project, index) => (
            <button
              className={`creative-project-trigger creative-project-trigger--${index + 1}`}
              type="button"
              key={project.id}
              onClick={(event) => openProject(project, event.currentTarget)}
              aria-label={`Open video project placeholder ${project.id}`}
            >
              <span className="creative-phone" aria-hidden="true">
                <span className="creative-phone-left-buttons"><i /><i /><i /></span>
                <span className="creative-phone-right-button" />
                <span className="creative-phone-frame">
                  <span className="creative-phone-screen">
                    <img className="creative-phone-poster" src={project.poster} alt="" loading={index === 0 ? "eager" : "lazy"} decoding="async" fetchPriority={index === 0 ? "high" : "auto"} />
                    <span className="creative-phone-shade" />
                    <span className="creative-phone-status">
                      <span>9:41</span>
                      <span className="creative-phone-status-icons" aria-hidden="true">
                        <span className="creative-phone-cell-bars"><i /><i /><i /></span>
                        <svg className="creative-phone-wifi" viewBox="0 0 16 12" fill="none"><path d="M1.2 4.1a10.3 10.3 0 0 1 13.6 0M3.7 6.7a6.5 6.5 0 0 1 8.6 0M6.3 9.2a2.7 2.7 0 0 1 3.4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <span className="creative-phone-battery"><i /></span>
                      </span>
                    </span>
                    <span className="creative-phone-notch"><i className="creative-phone-earpiece" /><i className="creative-phone-camera" /></span>
                    <span className="creative-phone-screen-label">LUMINUS <span>/</span> CREATIVE</span>
                    <span className="creative-phone-play">
                      <svg viewBox="0 0 20 20" fill="currentColor"><path d="M6 3.8c0-.6.7-1 1.2-.7l9 5.4a1.7 1.7 0 0 1 0 3l-9 5.4c-.5.3-1.2-.1-1.2-.7V3.8Z" /></svg>
                    </span>
                    <span className="creative-phone-index">PROJECT {project.id} <span>↗</span></span>
                    <span className="creative-phone-home-indicator" />
                  </span>
                </span>
              </span>
              <span className="creative-project-caption"><span>VIDEO PREVIEW</span><span>{project.id} / 04</span></span>
            </button>
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="creative-player-backdrop" onClick={() => setActiveProject(null)}>
          <section
            className="creative-player-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Creative video project placeholder ${activeProject.id}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="creative-player-topbar">
              <span>LUMINUS <i>/</i> CREATIVE <i>/</i> {activeProject.id}</span>
              <button ref={closeButtonRef} className="creative-player-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close video player">
                <span aria-hidden="true">×</span>
              </button>
            </div>

            {activeProject.videoSrc ? (
              <video
                ref={videoRef}
                className="creative-player-video"
                src={activeProject.videoSrc}
                poster={activeProject.poster}
                controls
                autoPlay
                muted
                playsInline
              />
            ) : (
              <div className="creative-player-stage" ref={playerStageRef}>
                <img className={`creative-player-poster${placeholderPlaying ? " creative-player-poster--playing" : ""}`} src={activeProject.poster} alt="" />
                <div className="creative-player-placeholder-note">
                  <span>VIDEO PLACEHOLDER</span>
                  <span>Add this project&apos;s video source in the project data.</span>
                </div>
                <div className="creative-player-controls" aria-label="Placeholder video controls">
                  <button type="button" onClick={() => setPlaceholderPlaying((playing) => !playing)} aria-label={placeholderPlaying ? "Pause placeholder preview" : "Play placeholder preview"}>
                    <PlayIcon isPlaying={placeholderPlaying} />
                  </button>
                  <span className="creative-player-time">{placeholderPlaying ? "PREVIEW" : "PAUSED"}</span>
                  <div className="creative-player-progress" role="progressbar" aria-label="Placeholder preview progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(placeholderProgress)}>
                    <span style={{ width: `${placeholderProgress}%` }} />
                  </div>
                  <button type="button" onClick={() => setPlaceholderMuted((muted) => !muted)} aria-label={placeholderMuted ? "Unmute placeholder preview" : "Mute placeholder preview"}>
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3 8v4h3l4 3V5L6 8H3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d={placeholderMuted ? "m13 8 4 4m0-4-4 4" : "M13 7a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  </button>
                  <button type="button" onClick={toggleFullscreen} aria-label="View placeholder preview fullscreen">
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M7 3H3v4m10-4h4v4M3 13v4h4m10-4v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </section>
  );
}
