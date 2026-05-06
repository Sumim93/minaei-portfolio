// PaintingDetail.jsx — big image + notes + technical info
const PaintingDetail = ({ painting, onNavigate }) => {
  const { isMobile } = useBreakpoint();
  const p = painting || PAINTINGS[0];
  const [zoomed, setZoomed] = React.useState(false);
  const idx = PAINTINGS.findIndex(x => x.slug === p.slug);
  const next = PAINTINGS[(idx + 1) % PAINTINGS.length];
  const prev = PAINTINGS[(idx - 1 + PAINTINGS.length) % PAINTINGS.length];
  const px = isMobile ? "20px" : "48px";

  const heroImg  = useReveal({ y: 28, duration: 0.75, delay: 0.1 });
  const heroInfo = useReveal({ y: 0,  duration: 0.75, delay: 0.22 });
  const noteRef  = useReveal({ y: 32, duration: 0.7 });
  const brushRef = useReveal({ y: 32, duration: 0.7 });
  const navRef   = useReveal({ y: 0,  duration: 0.5 });

  // Slide info from right on desktop
  const infoStyle = {
    ...heroInfo.style,
    transform: heroInfo.style.opacity === 0
      ? (isMobile ? "translateY(0)" : "translateX(28px)")
      : "translate(0,0)",
  };

  return (
    <div style={{ background: "var(--paper-1)" }}>
      {/* Breadcrumb */}
      <div style={{ padding: `32px ${px} 0`, fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
        <a href="#" onClick={e => { e.preventDefault(); onNavigate("works"); }} style={{ color: "inherit", textDecoration: "none" }}>← Works</a>
        <span style={{ margin: "0 14px" }}>·</span>
        <span>{p.series}</span>
        {!isMobile && <><span style={{ margin: "0 14px" }}>·</span><span>№ {String(p.number).padStart(2, "0")}</span></>}
      </div>

      {/* Hero image + caption */}
      <section style={{
        padding: isMobile ? "32px 20px 64px" : "64px 48px 96px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "7fr 5fr",
        gap: isMobile ? 36 : 72,
        alignItems: "start",
      }}>
        <div ref={heroImg.ref} style={heroImg.style}>
          <Frame src={p.image} alt={p.title} onClick={() => setZoomed(true)} />
        </div>

        <div ref={heroInfo.ref} style={{ ...infoStyle, position: isMobile ? "static" : "sticky", top: 48, paddingTop: isMobile ? 0 : 20 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 16 }}>
            № {String(p.number).padStart(2, "0")} · {p.subject}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 40 : 64, fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05 }}>{p.title}</h1>
          <div style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: isMobile ? 17 : 22, color: "var(--fg-muted)", marginTop: 14 }}>
            {p.year} · {p.medium} · {p.dimensions}
          </div>

          <dl style={{ marginTop: 40, display: "grid", gridTemplateColumns: "auto 1fr", gap: "14px 24px", borderTop: "1px solid var(--border)", paddingTop: 24 }}>
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
      {p.note ? (
        <section ref={noteRef.ref} style={{ ...noteRef.style, padding: isMobile ? "64px 20px" : "96px 48px", background: "var(--paper-2)" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>The note</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: isMobile ? 19 : 22, fontStyle: "italic", lineHeight: 1.55, color: "var(--ink-1)", margin: 0 }}>
              {p.note}
            </p>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: 30, color: "var(--ink-2)", marginTop: 28 }}>
              — S. Minaei
            </div>
          </div>
        </section>
      ) : null}

      {/* Brushwork detail — 3 close-up images */}
      {p.details && p.details.length > 0 && (
        <section ref={brushRef.ref} style={{ ...brushRef.style, padding: isMobile ? "64px 20px" : "96px 48px" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: isMobile ? 32 : 48 }}>
            Closer · Brushwork detail
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 20 : 28,
          }}>
            {p.details.map((src, i) => (
              <div key={i} style={{ overflow: "hidden", boxShadow: "var(--shadow-frame)" }}>
                <img
                  src={src}
                  alt={`${p.title} — detail ${i + 1}`}
                  style={{
                    width: "100%", display: "block", aspectRatio: "1/1",
                    objectFit: "cover",
                    transition: "transform 0.8s cubic-bezier(0.2,0.8,0.2,1)",
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prev / next */}
      <section ref={navRef.ref} style={{ ...navRef.style, padding: isMobile ? "48px 20px" : "64px 48px", borderTop: "1px solid var(--border-soft)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 24 : 48 }}>
        <a href="#" onClick={e => { e.preventDefault(); onNavigate("painting", prev); }} style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 10 }}>← Previous</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 20 : 28, fontStyle: "italic", fontWeight: 300, color: "var(--ink-1)" }}>{prev.title}</div>
        </a>
        <a href="#" onClick={e => { e.preventDefault(); onNavigate("painting", next); }} style={{ textDecoration: "none", textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 10 }}>Next →</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 20 : 28, fontStyle: "italic", fontWeight: 300, color: "var(--ink-1)" }}>{next.title}</div>
        </a>
      </section>

      {/* Lightbox */}
      {zoomed && (
        <div onClick={() => setZoomed(false)} style={{
          position: "fixed", inset: 0, background: "rgba(20,17,13,0.94)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? 16 : 48,
          cursor: "zoom-out", backdropFilter: "blur(8px)",
        }}>
          <img src={p.image} alt={p.title} style={{ maxWidth: "92%", maxHeight: "88vh", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}/>
          <button onClick={e => { e.stopPropagation(); setZoomed(false); }} style={{
            position: "absolute", top: 24, right: 24, background: "transparent", border: 0, color: "var(--dark-on-1)", cursor: "pointer",
          }}><Icon name="close" size={28}/></button>
          <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center", color: "var(--dark-on-2)", fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 15 }}>
            {p.title}, {p.year} · {p.dimensions}
          </div>
        </div>
      )}
    </div>
  );
};

window.PaintingDetail = PaintingDetail;
