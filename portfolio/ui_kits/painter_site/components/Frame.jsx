// Frame.jsx — painting shown with matted frame shadow
const Frame = ({ src, alt = "", ratio, matted = true, onClick, children }) => {
  const handleMouseMove = (e) => {
    if (!onClick) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5 left to right
    const y = (e.clientY - rect.top)  / rect.height - 0.5;  // -0.5 → 0.5 top to bottom
    el.style.transition = "box-shadow 0.15s ease, transform 0.08s linear";
    el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
    el.style.boxShadow = matted
      ? `${-x * 12}px ${y * 12}px 40px -12px rgba(74,52,36,0.28), inset 0 0 0 1px rgba(74,52,36,0.08)`
      : "none";
  };

  const handleMouseLeave = (e) => {
    if (!onClick) return;
    const el = e.currentTarget;
    el.style.transition = "transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.5s cubic-bezier(0.2,0.8,0.2,1)";
    el.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    el.style.boxShadow = matted ? "var(--shadow-frame)" : "none";
  };

  return (
  <figure
    onClick={onClick}
    style={{
      margin: 0,
      background: matted ? "var(--paper-0)" : "transparent",
      padding: matted ? "14px 14px 18px" : 0,
      boxShadow: matted ? "var(--shadow-frame)" : "none",
      cursor: onClick ? "zoom-in" : "default",
      transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.5s cubic-bezier(0.2,0.8,0.2,1)",
      display: "inline-block",
      width: "100%",
      boxSizing: "border-box",
      willChange: "transform",
    }}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
  >
    {src && (
      <img src={src} alt={alt} style={{
        width: "100%",
        display: "block",
        aspectRatio: ratio || undefined,
        objectFit: "cover",
      }}/>
    )}
    {children}
  </figure>
  );
};

// PaintingCard — frame + caption block, editorial style
const PaintingCard = ({ painting, onClick, size = "md", showTags = true }) => {
  const p = painting;
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Frame src={p.thumb || p.image} alt={p.title} onClick={onClick} matted={size !== "sm"} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: size !== "sm" ? 14 : 0 }}>
        <div style={{
          fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.22em",
          textTransform: "uppercase", color: "var(--fg-muted)"
        }}>
          № {String(p.number || 1).padStart(2, "0")} · {p.subject}
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: size === "lg" ? 32 : 22,
          fontStyle: "italic", fontWeight: 400, color: "var(--ink-1)",
          margin: 0, lineHeight: 1.1,
        }}>{p.title}</h3>
        <div style={{
          fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 14,
          color: "var(--fg-muted)",
        }}>
          {p.year} · {p.medium} · {p.dimensions}
        </div>
      </div>
    </article>
  );
};

window.Frame = Frame;
window.PaintingCard = PaintingCard;
