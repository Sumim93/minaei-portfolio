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
      <div style={{ padding: `28px ${px} 0` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="/works"
            onClick={e => { e.preventDefault(); onNavigate("works"); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--ink-1)", textDecoration: "none",
              background: "var(--paper-2)",
              border: "1px solid var(--border)",
              padding: "9px 18px", borderRadius: 999,
              transition: "background 0.18s ease, border-color 0.18s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--ink-1)"; e.currentTarget.style.color = "var(--paper-0)"; e.currentTarget.style.borderColor = "var(--ink-1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--paper-2)"; e.currentTarget.style.color = "var(--ink-1)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            ← Back to Works
          </a>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
            {p.series}{!isMobile && <> · № {String(p.number).padStart(2, "0")}</>}
          </span>
        </div>
      </div>

      {/* Hero image + info panel */}
      <section style={{ padding: isMobile ? "28px 20px 64px" : "48px 48px 80px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 64,
          alignItems: "start",
        }}>
          <div ref={heroImg.ref} style={heroImg.style}>
            <Frame src={p.image} alt={p.title} onClick={() => setZoomed(true)} />
          </div>

          <div ref={heroInfo.ref} style={{
            ...infoStyle,
            position: isMobile ? "static" : "sticky",
            top: isMobile ? "auto" : 88,   /* clears the fixed 68px header */
            paddingTop: isMobile ? 0 : 8,
          }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 16 }}>
              № {String(p.number).padStart(2, "0")} · {p.subject}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 36 : 52, fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05 }}>{p.title}</h1>
            <div style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: isMobile ? 16 : 20, color: "var(--fg-muted)", marginTop: 12 }}>
              {p.year} · {p.medium} · {p.dimensions}
            </div>

            <dl style={{ marginTop: 36, display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px 24px", borderTop: "1px solid var(--border)", paddingTop: 20 }}>
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

            <div style={{ marginTop: 32 }}>
              <Button variant="ghost" onClick={() => setZoomed(true)}>View full painting ↗</Button>
            </div>
          </div>
        </div>
      </section>

      {/* The note */}
      {p.note ? (
        <section ref={noteRef.ref} style={{ ...noteRef.style, padding: isMobile ? "56px 20px" : "80px 48px", background: "var(--paper-2)" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>The note</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: isMobile ? 18 : 21, fontStyle: "italic", lineHeight: 1.6, color: "var(--ink-1)", margin: 0 }}>
              {p.note}
            </p>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: "var(--ink-2)", marginTop: 24 }}>
              — S. Minaei
            </div>
          </div>
        </section>
      ) : null}

      {/* Brushwork detail — 3 close-up images */}
      {p.details && p.details.length > 0 && (
        <section ref={brushRef.ref} style={{ ...brushRef.style, padding: isMobile ? "56px 20px" : "80px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: isMobile ? 28 : 40 }}>
              Closer · Brushwork detail
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? 16 : 24,
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
          </div>
        </section>
      )}

      {/* Prev / next */}
      <section ref={navRef.ref} style={{
        ...navRef.style,
        padding: isMobile ? "40px 20px" : "56px 48px",
        borderTop: "1px solid var(--border-soft)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 24 : 48 }}>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate("painting", prev); }} style={{ textDecoration: "none" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 10 }}>← Previous</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 18 : 26, fontStyle: "italic", fontWeight: 300, color: "var(--ink-1)" }}>{prev.title}</div>
          </a>
          <a href="#" onClick={e => { e.preventDefault(); onNavigate("painting", next); }} style={{ textDecoration: "none", textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 10 }}>Next →</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 18 : 26, fontStyle: "italic", fontWeight: 300, color: "var(--ink-1)" }}>{next.title}</div>
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {zoomed && (
        <div onClick={() => setZoomed(false)} style={{
          position: "fixed", inset: 0, background: "rgba(20,17,13,0.94)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? 16 : 48,
          cursor: "zoom-out", backdropFilter: "blur(8px)",
        }}>
          <img src={p.image} alt={p.title} style={{ maxWidth: "92%", maxHeight: "88vh", objectFit: "contain", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}/>
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
