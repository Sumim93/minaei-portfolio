// Gallery.jsx — works index with filter
const Gallery = ({ onNavigate }) => {
  const [filter, setFilter] = React.useState("all");
  const filters = [
    { key: "all", label: "All works" },
    { key: "Portrait Studies", label: "Portraits" },
    { key: "Landscape", label: "Landscapes" },
    { key: "Still Life", label: "Still life" },
  ];
  const filtered = filter === "all" ? PAINTINGS : PAINTINGS.filter(p => p.subject === filter);

  return (
    <div style={{ background: "var(--paper-1)" }}>
      <section style={{ padding: "80px 48px 48px", borderBottom: "1px solid var(--border-soft)" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 20 }}>№ The catalogue · 2022 — 2026</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.035em", margin: 0, lineHeight: 1.02 }}>
          Works, <em style={{ fontWeight: 300 }}>arranged by the last</em><br/>time I looked at them.
        </h1>
        <div style={{ display: "flex", gap: 12, marginTop: 48, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
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

      <section style={{ padding: "72px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 56, rowGap: 80 }}>
          {filtered.map(p => (
            <PaintingCard key={p.slug} painting={p} onClick={() => onNavigate("painting", p)} />
          ))}
        </div>
      </section>
    </div>
  );
};

window.Gallery = Gallery;
