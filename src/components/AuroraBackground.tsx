const blobs = [
  { color: "#9EC5FF", size: "60vmax", top: "-20%", left: "-15%", dx: "8vw", dy: "6vh", duration: "26s" },
  { color: "#C9B8FF", size: "55vmax", top: "10%", left: "55%", dx: "-10vw", dy: "8vh", duration: "32s" },
  { color: "#FFD1DC", size: "45vmax", top: "55%", left: "-10%", dx: "10vw", dy: "-6vh", duration: "29s" },
  { color: "#B5E3FF", size: "50vmax", top: "70%", left: "60%", dx: "-6vw", dy: "-10vh", duration: "35s" },
];

// Fixed iOS-wallpaper-like backdrop that gives the glass surfaces something to refract.
// Blobs only drift on larger screens; phones and reduced-motion users get a static wallpaper.
const AuroraBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#EAF2FF]">
    {blobs.map((b) => (
      <div
        key={b.color}
        className="aurora-blob absolute rounded-full opacity-70 blur-3xl md:[animation:aurora-drift_var(--t)_ease-in-out_infinite]"
        style={
          {
            background: b.color,
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            "--dx": b.dx,
            "--dy": b.dy,
            "--t": b.duration,
          } as React.CSSProperties
        }
      />
    ))}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.55),transparent_60%)]" />
  </div>
);

export default AuroraBackground;
