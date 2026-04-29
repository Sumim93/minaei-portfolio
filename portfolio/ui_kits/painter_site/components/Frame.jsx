// Frame.jsx — painting shown with matted frame shadow
const Frame = ({ src, alt = "", ratio, matted = true, onClick, children }) => (
  <figure
    onClick={onClick}
    style={{
      margin: 0,
      background: matted ? "var(--paper-0)" : "transparent",
      padding: matted ? "14px 14px 18px" : 0,
      boxShadow: matted ? "var(--shadow-frame)" : "none",
      cursor: onClick ? "zoom-in" : "default",
      display: "inline-block",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
    }}
    onMouseEnter={e => {
      if (!onClick) return;
      const img = e.currentTarget.querySelector("img");
      if (img) img.style.transform = "scale(1.06)";
    }}
    onMouseLeave={e => {
      if (!onClick) return;
      const img = e.currentTarget.querySelector("img");
      if (img) img.style.transform = "scale(1)";
    }}
  >
    {src && (
      <img src={src} alt={alt} style={{
        width: "100%",
        display: "block",
        aspectRatio: ratio || undefined,
        objectFit: "cover",
        transition: "transform 0.8s cubic-bezier(0.2,0.8,0.2,1)",
      }}/>
    )}
    {children}
  </figure>
);

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
