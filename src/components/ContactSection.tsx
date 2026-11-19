import { FormEvent } from "react";
import "./ContactSection.css";

const WHATSAPP_NUMBER = "254790653820";

function ContactArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none">
      <path d="M16 3.3a12.2 12.2 0 0 0-10.4 18.6L4 28l6.3-1.6A12.2 12.2 0 1 0 16 3.3Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M12.1 10.2c-.3-.7-.7-.7-1-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.5 1.5 3.8c.2.2 2.5 4 6.2 5.4 3.1 1.2 3.7 1 4.4.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5l-2.6-1.2c-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.4-.6.1-.2.1-.5 0-.7l-1.1-2.6Z" fill="currentColor" />
    </svg>
  );
}

function handleWhatsAppSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const name = value("name");
  const business = value("business");
  const phone = value("phone");
  const email = value("email");
  const service = value("service");
  const project = value("project");

  const message = [
    "Hello Luminus,",
    "",
    "I'd like to enquire about your services.",
    "",
    `Name: ${name}`,
    `Business: ${business || "Not provided"}`,
    `Phone: ${phone}`,
    `Email: ${email || "Not provided"}`,
    `Interested in: ${service || "Not specified"}`,
    "",
    "Project details:",
    project,
    "",
    "Looking forward to hearing from you.",
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-section-inner">
        <div className="contact-layout">
          <div className="contact-introduction">
            <p className="contact-eyebrow">LET'S TALK / CONTACT</p>
            <h2 id="contact-title">Have a project in mind? Let's make something happen.</h2>
            <p className="contact-description">
              Whether you're looking to build your brand, create compelling content, develop a digital experience or bring an idea to life, we'd love to hear from you. Tell us what you're working on and let's explore what's possible.
            </p>

            <div className="contact-details" aria-label="Contact details">
              <a className="contact-detail-link" href="mailto:luminusagency@gmail.com">
                <span className="contact-detail-label">EMAIL</span>
                <span>luminusagency@gmail.com</span>
                <span className="contact-detail-arrow" aria-hidden="true">↗</span>
              </a>
              <a className="contact-detail-link" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <span className="contact-detail-label">WHATSAPP</span>
                <span>+254790653820</span>
                <span className="contact-detail-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="contact-form-panel">
            <div className="contact-form-heading">
              <h3 className="contact-form-kicker">TELL US ABOUT YOUR PROJECT</h3>
              <p>Share a few details and let's start a conversation.</p>
            </div>

            <form className="contact-form" onSubmit={handleWhatsAppSubmit}>
              <div className="contact-form-grid">
                <label className="contact-field">
                  <span>Full Name <span className="contact-required" aria-hidden="true">*</span></span>
                  <input autoComplete="name" name="name" type="text" placeholder="Your full name" required />
                </label>
                <label className="contact-field">
                  <span>Business / Brand Name</span>
                  <input autoComplete="organization" name="business" type="text" placeholder="Your business or brand" />
                </label>
                <label className="contact-field">
                  <span>Phone number <span className="contact-required" aria-hidden="true">*</span></span>
                  <input autoComplete="tel" inputMode="tel" name="phone" type="tel" placeholder="Your phone number" required />
                </label>
                <label className="contact-field">
                  <span>Email Address</span>
                  <input autoComplete="email" name="email" type="email" placeholder="you@example.com" />
                </label>
                <label className="contact-field contact-field--full">
                  <span>What are you interested in?</span>
                  <select name="service" defaultValue="">
                    <option value="">Select a service (optional)</option>
                    <option>Creative &amp; Content</option>
                    <option>Digital Development</option>
                    <option>Events &amp; Activations</option>
                    <option>Monthly Marketing Partnership</option>
                    <option>Something Else</option>
                  </select>
                </label>
                <label className="contact-field contact-field--full">
                  <span>Tell us about your project <span className="contact-required" aria-hidden="true">*</span></span>
                  <textarea name="project" rows={5} placeholder="A little about your goals, timeline, or what you have in mind..." required />
                </label>
              </div>

              <button className="button button--primary contact-submit" type="submit">
                SEND ENQUIRY VIA WHATSAPP <ContactArrowIcon />
              </button>
              <p className="contact-form-note">Your message will open in WhatsApp so you can review and send it.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatsAppFloatingButton() {
  return (
    <a
      className="contact-whatsapp-fab"
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Luminus on WhatsApp"
      title="Chat with Luminus on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
