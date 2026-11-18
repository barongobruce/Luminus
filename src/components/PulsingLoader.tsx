import type { CSSProperties } from "react";

type PulsingLoaderProps = {
  label?: string;
  fullScreen?: boolean;
  className?: string;
};

export function PulsingLoader({
  label = "Loading",
  fullScreen = false,
  className = "",
}: PulsingLoaderProps) {
  const style = { "--loader-label": `"${label.replaceAll('"', "'")}"` } as CSSProperties;

  return (
    <div
      className={`pulsing-loader${fullScreen ? " pulsing-loader--fullscreen" : ""}${className ? ` ${className}` : ""}`}
      role="status"
      aria-live="polite"
      aria-label={label}
      style={style}
    >
      <span className="pulsing-loader__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      {fullScreen && <span className="pulsing-loader__brand">LUMINUS</span>}
      <span className="pulsing-loader__label">{label}</span>
    </div>
  );
}
