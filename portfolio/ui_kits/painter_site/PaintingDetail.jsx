// PaintingDetail.jsx — big image + notes + technical info
const PaintingDetail = ({ painting, onNavigate }) => {
  const p = painting || PAINTINGS[0];
  const [zoomed, setZoomed] = React.useState(false);
  const idx = PAINTINGS.findIndex(x => x.slug === p.slug);
  const next = PAINTINGS[(idx + 1) % PAINTINGS.length];
  const prev = PAINTINGS[(idx - 1 + PAINTINGS.length) % PAINTINGS.length];

  return (
    <div style={{ background: "var(--paper-1)" }}>
      {/* Breadcrumb */}
      <div style={{ padding: "32px 48px 0", fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
        <a href="#" onClick={e => { e.preventDefault(); onNavigate("works"); }} style={{ color: "inherit", textDecoration: "none" }}>← Works</a>
        <span style={{ margin: "0 14px" }}>·</span>
        <span>{p.series}</span>
        <span style={{ margin: "0 14px" }}>·</span>
        <span>№ {String(p.number).padStart(2, "0")}</span>
      </div>

      {/* Hero image, off-center, with caption column */}
      <section style={{ padding: "64px 48px 96px", display: "grid", gridTemplateColumns: "7fr 5fr", gap: 72, alignItems: "start" }}>
        <Frame src={p.image} alt={p.title} onClick={() => setZoomed(true)} />
        <div style={{ position: "sticky", top: 48, paddingTop: 20 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 16 }}>
            № {String(p.number).padStart(2, "0")} · {p.subject}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 64, fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05 }}>{p.title}</h1>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: "var(--fg-muted)", marginTop: 14 }}>
            {p.year} · {p.medium} · {p.dimensions}
          </div>

          {/* Technical info table */}
          <dl style={{ marginTop: 48, display: "grid", gridTemplateColumns: "auto 1fr", gap: "14px 32px", borderTop: "1px solid var(--border)", paddingTop: 24 }}>
            {[
              ["Year", p.year],
              ["Medium", p.medium],
              ["Support", "Belgian linen on stretcher"],
              ["Dimensions", p.dimensions],
              ["Series", p.series],
            ].map(([k, v]) => (
              <React.Fragment key={k}>
                <dt style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-muted)", margin: 0 }}>{k}</dt>
                <dd style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-1)", margin: 0 }}>{v}</dd>
              </React.Fragment>
            ))}
          </dl>

          <div style={{ marginTop: 36 }}>
            <Button variant="ghost" onClick={() => setZoomed(true)}>View full painting ↗</Button>
          </div>
        </div>
      </section>

      {/* The note */}
      <section style={{ padding: "96px 48px", background: "var(--paper-2)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>The note</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", lineHeight: 1.55, color: "var(--ink-1)", margin: 0 }}>
            {p.note}
          </p>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 30, color: "var(--ink-2)", marginTop: 28 }}>
            — S. Minaei
          </div>
        </div>
      </section>

      {/* Brushwork detail */}
      {p.detail && (
        <section style={{ padding: "96px 48px" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>Closer · Brushwork detail</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", boxShadow: "var(--shadow-3)", position: "relative" }}>
              <img src={p.detail} alt="" style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transform: "scale(2.6)", transformOrigin: "55% 38%",
              }}/>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 300, fontStyle: "italic", margin: 0, letterSpacing: "-0.02em" }}>
                How the paint sits.
              </h3>
              {p.progress && (
                <ol style={{ listStyle: "none", padding: 0, margin: "32px 0 0", counterReset: "step" }}>
                  {p.progress.map((step, i) => (
                    <li key={i} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 16, padding: "14px 0", borderTop: "1px solid var(--border-soft)" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontStyle: "italic", color: "var(--pigment-sienna)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink-1)", lineHeight: 1.5 }}>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Prev / next */}
      <section style={{ padding: "64px 48px", borderTop: "1px solid var(--border-soft)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <a href="#" onClick={e => { e.preventDefault(); onNavigate("painting", prev); }} style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 10 }}>← Previous</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontStyle: "italic", fontWeight: 300, color: "var(--ink-1)" }}>{prev.title}</div>
        </a>
        <a href="#" onClick={e => { e.preventDefault(); onNavigate("painting", next); }} style={{ textDecoration: "none", textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 10 }}>Next →</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontStyle: "italic", fontWeight: 300, color: "var(--ink-1)" }}>{next.title}</div>
        </a>
      </section>

      {/* Lightbox */}
      {zoomed && (
        <div onClick={() => setZoomed(false)} style={{
          position: "fixed", inset: 0, background: "rgba(20,17,13,0.94)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 48,
          cursor: "zoom-out", backdropFilter: "blur(8px)",
        }}>
          <img src={p.image} alt={p.title} style={{ maxWidth: "88%", maxHeight: "88vh", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}/>
          <button onClick={e => { e.stopPropagation(); setZoomed(false); }} style={{
            position: "absolute", top: 32, right: 32, background: "transparent", border: 0, color: "var(--dark-on-1)", cursor: "pointer",
          }}><Icon name="close" size={28}/></button>
          <div style={{ position: "absolute", bottom: 32, left: 0, right: 0, textAlign: "center", color: "var(--dark-on-2)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16 }}>
            {p.title}, {p.year} · {p.dimensions}
          </div>
        </div>
      )}
    </div>
  );
};

window.PaintingDetail = PaintingDetail;
