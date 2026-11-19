import { useEffect, useState } from "react";
import "./AboutSection.css";

// Replace these four src values to change the About carousel images.
const aboutSlides = [
  { src: "/optimized/demo1.webp", alt: "Gordon's gin beverage campaign" },
  { src: "/optimized/demo2.webp", alt: "Luxury perfume product campaign" },
  { src: "/optimized/demo3.webp", alt: "Kenyan coffee product campaign" },
  { src: "/optimized/demo4.webp", alt: "Skincare serum campaign" },
];

export function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % aboutSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + aboutSlides.length) % aboutSlides.length);
  };
  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % aboutSlides.length);
  };

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-inner">
        <div className="about-kicker">
          <span>ABOUT LUMINUS</span>
          <span>WHO WE ARE</span>
        </div>

        <div className="about-content-grid">
          <div className="about-copy-column">
            <header className="about-intro">
              <h2 id="about-title">We make brands <em>impossible</em> to ignore.</h2>
            </header>

            <div className="about-story-copy">
              <p className="about-lead">
                In a world where attention is everything, showing up isn’t enough. Your brand needs to stand out, stay relevant, and give people a reason to care.
              </p>
              <p>
                Luminus is a creative marketing agency built to work alongside ambitious brands. We bring strategy, content creation, creative campaigns, and digital marketing together to build a consistent, compelling brand presence.
              </p>
              <p>
                From the first idea to the final post, we’re the team behind the content, the campaigns, and the conversations that keep your brand moving.
              </p>
              <div className="about-promise">
                <span className="about-promise-mark" aria-hidden="true">✳</span>
                <p>Think of us as your marketing team, <em>without the in-house overhead.</em></p>
              </div>
              <a className="about-cta" href="/contact">
                Start a partnership <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <figure className="about-image-slot">
            <div className="about-carousel" role="region" aria-label="About Luminus campaign images" aria-roledescription="carousel">
              <div className="about-carousel-slides" aria-live="off">
                {aboutSlides.map((slide, index) => (
                  <img
                    className={`about-carousel-slide${index === activeSlide ? " about-carousel-slide--active" : ""}`}
                    src={slide.src}
                    alt={index === activeSlide ? slide.alt : ""}
                    aria-hidden={index !== activeSlide}
                    key={slide.src}
                    loading={index === activeSlide ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index === activeSlide ? "high" : "low"}
                  />
                ))}
              </div>
              <button className="about-carousel-arrow about-carousel-arrow--previous" type="button" onClick={showPreviousSlide} aria-label="Show previous image">
                <span aria-hidden="true">‹</span>
              </button>
              <button className="about-carousel-arrow about-carousel-arrow--next" type="button" onClick={showNextSlide} aria-label="Show next image">
                <span aria-hidden="true">›</span>
              </button>
              <div className="about-carousel-pagination" aria-label="Choose an image">
                {aboutSlides.map((slide, index) => (
                  <button
                    className={`about-carousel-indicator${index === activeSlide ? " about-carousel-indicator--active" : ""}`}
                    type="button"
                    key={slide.src}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show image ${index + 1} of ${aboutSlides.length}`}
                    aria-current={index === activeSlide ? "true" : undefined}
                  />
                ))}
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
