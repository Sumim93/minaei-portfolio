// Gallery.jsx — works index with filter
const Gallery = ({ onNavigate }) => {
  const { isMobile, isTablet } = useBreakpoint();
  const [filter, setFilter] = React.useState("all");
  const [animKey, setAnimKey] = React.useState(0);
  const filters = [
    { key: "all", label: "All works" },
    { key: "Portrait Studies", label: "Portraits" },
    { key: "Landscape", label: "Landscapes" },
    { key: "Still Life", label: "Still life" },
  ];
  const filtered = filter === "all" ? PAINTINGS : PAINTINGS.filter(p => p.subject === filter);
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  const hdr = useReveal({ y: 28, duration: 0.65 });

  const handleFilter = (key) => {
    setFilter(key);
    setAnimKey(k => k + 1);
  };

  return (
    <div style={{ background: "var(--paper-1)" }}>
      <section ref={hdr.ref} style={{
        ...hdr.style,
        padding: isMobile ? "64px 20px 36px" : "80px 48px 48px",
        borderBottom: "1px solid var(--border-soft)",
      }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 20 }}>№ The catalogue · 2022 — 2026</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.035em", margin: 0, lineHeight: 1.02 }}>
          Works, <em style={{ fontWeight: 300 }}>arranged by the last</em><br/>time I looked at them.
        </h1>
        <div style={{ display: "flex", gap: 10, marginTop: 40, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f.key} onClick={() => handleFilter(f.key)} style={{
              fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.2em",
              textTransform: "uppercase", padding: "10px 18px", borderRadius: 999,
              border: `1px solid ${filter === f.key ? "var(--ink-1)" : "var(--border)"}`,
              background: filter === f.key ? "var(--ink-1)" : "transparent",
              color: filter === f.key ? "var(--paper-0)" : "var(--ink-2)",
              cursor: "pointer", transition: "all var(--dur-fast) var(--ease-out)",
            }}>{f.label}</button>
          ))}
        </div>
      </section>

      <section style={{ padding: isMobile ? "48px 20px" : "72px 48px" }}>
        <div
          key={animKey}
          style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 48 : 56, rowGap: isMobile ? 56 : 80 }}
        >
          {filtered.map((p, i) => {
            const card = useReveal({ y: 36, duration: 0.6, delay: Math.min(i, 5) * 0.07 });
            return (
              <div key={p.slug} ref={card.ref} style={card.style}>
                <PaintingCard painting={p} onClick={() => onNavigate("painting", p)} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

window.Gallery = Gallery;
