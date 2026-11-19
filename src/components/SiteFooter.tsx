import "./SiteFooter.css";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Divisions", href: "/divisions" },
];

const services = [
  "Creative Strategy",
  "Content Production",
  "Digital Marketing",
  "Campaigns & Growth",
];

const socialLinks = [
  // Add the real profile URLs here when they are ready; no social accounts are assumed.
  { label: "Instagram", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "TikTok", href: "" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <section className="site-footer-cta" aria-labelledby="site-footer-title">
          <h2 id="site-footer-title">Let&apos;s make your brand impossible to ignore.</h2>
          <a className="site-footer-cta-button" href="/contact">
            LET&apos;S WORK TOGETHER <span aria-hidden="true">↗</span>
          </a>
        </section>

        <div className="site-footer-columns">
          <nav className="site-footer-column" aria-label="Explore">
            <h3>EXPLORE</h3>
            <ul>
              {exploreLinks.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="site-footer-column">
            <h3>WHAT WE DO</h3>
            <ul>
              {services.map((service) => <li key={service}><span>{service}</span></li>)}
            </ul>
          </div>

          <address className="site-footer-column site-footer-contact">
            <h3>GET IN TOUCH</h3>
            <ul>
              <li><a href="mailto:luminusagency@gmail.com">luminusagency@gmail.com</a></li>
              <li><a href="https://wa.me/254790653820" target="_blank" rel="noreferrer">0790653820</a></li>
            </ul>
          </address>

          <nav className="site-footer-column" aria-label="Social media">
            <h3>FOLLOW US</h3>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                  ) : (
                    <span className="site-footer-social-placeholder">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer-bottom">
          <a className="site-footer-brand" href="/" aria-label="Luminus home">LUMINUS<span>.</span></a>
          <p>© 2026 Luminus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
