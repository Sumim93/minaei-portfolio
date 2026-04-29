// About.jsx — editorial bio + photo layout
const About = () => {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : "48px";

  return (
    <div style={{ background: "var(--paper-1)" }}>
      <section style={{ padding: isMobile ? "64px 20px 40px" : "96px 48px 72px" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>The artist · A reading</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.035em", margin: 0, lineHeight: 1.02, maxWidth: 900 }}>
          I came to painting on my own,<br/><em style={{ fontWeight: 300 }}>and stayed for the faces.</em>
        </h1>
      </section>

      <section style={{
        padding: isMobile ? "0 20px 64px" : "0 48px 96px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "5fr 7fr",
        gap: isMobile ? 36 : 72,
        alignItems: "start",
      }}>
        <div>
          <Frame src="assets/Profile.jpg" alt="Somaye Minaei" matted={true}/>
          <div style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 15, color: "var(--fg-muted)", marginTop: 14, textAlign: "center" }}>
            Somaye Minaei — painter.
          </div>
        </div>

        <div style={{ paddingTop: isMobile ? 0 : 20 }}>
          <p style={{ fontFamily: "'Lora', serif", fontSize: isMobile ? 20 : 24, fontStyle: "italic", lineHeight: 1.55, color: "var(--ink-1)", margin: 0 }}>
            I paint to look more slowly — a portrait is my way of staying with someone until they soften.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", marginTop: 32, maxWidth: 620 }}>
            I'm Somaye Minaei, a self-taught oil painter, born in Iran and now living in Switzerland. I learned by looking closely and returning to the canvas again and again, letting mistakes guide me forward.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", marginTop: 20, maxWidth: 620 }}>
            My portraits are built in layers, beginning cool and gradually finding warmth over time, shaped through patience and repeated sittings. Between them, I paint small landscapes and quiet still moments from my walks and travels — simple pauses that carry a sense of place, light, and breath into everything I do.
          </p>

          {/* Timeline */}
          <div style={{ marginTop: 64 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>A brief chronology</div>
            <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px 32px", borderTop: "1px solid var(--border)", paddingTop: 24, margin: 0 }}>
              {[
                ["Now",     "Living and painting in Switzerland — portraits, with landscapes and still lifes between"],
                ["Recent",  "Portrait series painted from life, over multiple sittings"],
                ["Earlier", "Landscapes carried home from travels — the American southwest, the sea, the lake"],
                ["Origin",  "Born in Iran. Self-taught. Years of looking before the first painting"],
              ].map(([y, t]) => (
                <React.Fragment key={y}>
                  <dt style={{ fontFamily: "var(--font-display)", fontSize: 22, fontStyle: "italic", color: "var(--pigment-sienna)", margin: 0 }}>{y}</dt>
                  <dd style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink-1)", lineHeight: 1.55, margin: 0, borderBottom: "1px solid var(--border-soft)", paddingBottom: 18 }}>{t}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* In the studio */}
      <section style={{ padding: isMobile ? "64px 20px" : "96px 48px", background: "var(--paper-0)", borderTop: "1px solid var(--border-soft)" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 16, textAlign: "center" }}>In the studio</div>
        <div style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 20, color: "var(--ink-2)", textAlign: "center", marginBottom: 48 }}>
          Now in the works — details from a portrait in progress.
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 16,
          maxWidth: 1400,
          margin: "0 auto",
        }}>
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{ aspectRatio: "1/1", overflow: "hidden", boxShadow: "var(--shadow-2)" }}>
              <img
                src={`assets/studio/studio-${n}.jpg`}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

window.About = About;
