// Home.jsx — Monograph edition (deepened, sole variant)
const Home = ({ onNavigate }) => {
  const hero = PAINTINGS[Math.floor(Math.random() * PAINTINGS.length)];
  const plates = PAINTINGS.slice(0, 5);
  return (
    <div style={{ background: "var(--dark-1)", color: "var(--dark-on-1)" }}>

      {/* ── 01 · Cover ─────────────────────────────────────────────── */}
      <section style={{
        padding: "0 0 0", position: "relative", minHeight: "92vh",
        display: "grid", gridTemplateColumns: "1fr",
        backgroundColor: "var(--dark-1)",
        backgroundImage: `url(${hero.image})`,
        backgroundSize: "cover", backgroundPosition: "center 18%",
        overflow: "hidden",
      }}>
        {/* Solid dark overlay — reliable legibility for text layer above */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(20,17,13,0.38) 0%, rgba(20,17,13,0.52) 45%, rgba(20,17,13,0.82) 80%, rgba(20,17,13,1) 100%)",
          pointerEvents: "none", zIndex: 1,
        }} />
        <div style={{
          alignSelf: "end", padding: "0 48px 96px", maxWidth: 980,
          position: "relative", zIndex: 2,
        }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4.5rem, 11vw, 10rem)",
            fontWeight: 300, lineHeight: 0.92, letterSpacing: "-0.045em",
            margin: 0, color: "var(--dark-on-1)",
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
          }}>
            <em style={{ fontWeight: 300 }}>Sumim.</em>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 26, lineHeight: 1.5,
            fontStyle: "italic", fontWeight: 300,
            color: "var(--dark-on-2)", maxWidth: 640, marginTop: 36,
          }}>
            I paint to look more slowly. That is the whole of it.
          </p>

          <div style={{ display: "flex", gap: 24, marginTop: 44, alignItems: "center" }}>
            <Button variant="onDark" onClick={() => onNavigate("works")}>Open the catalogue</Button>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("painting", hero); }} style={{
              fontFamily: "var(--font-body)", fontSize: 17, fontStyle: "italic",
              color: "var(--pigment-ochre)", textDecoration: "underline",
              textDecorationColor: "rgba(201,169,97,0.35)", textUnderlineOffset: "0.25em",
            }}>Begin with no. {String(hero.number).padStart(2,"0")} — <em>{hero.title}</em> →</a>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 32, left: 48,
          fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.3em",
          textTransform: "uppercase", color: "rgba(240,230,210,0.4)",
        }}>↓ Scroll to explore</div>
      </section>

      {/* ── 02 · Foreword ─────────────────────────────────────────── */}
      <section style={{
        background: "var(--paper-1)", color: "var(--ink-1)",
        padding: "120px 48px", borderTop: "1px solid rgba(240,230,210,0.12)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 96, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 48 }}>
            <div style={{
              fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "var(--fg-muted)",
            }}>Foreword · I.</div>
            <div style={{ marginTop: 18, fontFamily: "'Caveat', cursive", fontSize: 38, color: "var(--pigment-sienna)", lineHeight: 1 }}>
              S. Minaei
            </div>
            <div style={{
              fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "var(--fg-muted)", marginTop: 8,
            }}>Studio · North-facing light</div>
          </div>

          <div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 30, lineHeight: 1.45,
              fontStyle: "italic", fontWeight: 300, color: "var(--ink-1)",
              margin: 0, maxWidth: 760,
            }}>
              I paint to look more slowly. A portrait, for me, is just permission to keep looking at someone until they soften.
            </p>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.72,
              color: "var(--ink-2)", marginTop: 36, maxWidth: 680,
            }}>
              This is a working monograph. The paintings collected here span a handful of years — some were made last month, some I almost can't recognise. I start each portrait cold, almost blue, and let warmth enter only when the shapes are sure.
            </p>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.72,
              color: "var(--ink-2)", marginTop: 20, maxWidth: 680,
            }}>
              The sitters are patient — willing to give me six Sundays and a good window. The landscapes come from walks and trips: small panels carried in a bag, worked in a single afternoon, finished back in the studio only if they earn it.
            </p>

            <div style={{ color: "var(--fg-subtle)", letterSpacing: "1.2em", fontSize: 12, marginTop: 56, textAlign: "center" }}>·   ·   ·</div>
          </div>
        </div>
      </section>

      {/* ── 03 · Plates index ─────────────────────────────────────── */}
      <section style={{
        background: "var(--paper-2)", color: "var(--ink-1)",
        padding: "120px 48px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 64 }}>
            <div>
              <h2 style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
                fontWeight: 300, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.05,
                maxWidth: 720,
              }}>
                Selected works.
              </h2>
            </div>
            <Button variant="link" onClick={() => onNavigate("works")}>See the full catalogue →</Button>
          </div>

          {/* Plate list — alternating L/R editorial layout */}
          <div style={{ display: "flex", flexDirection: "column", gap: 120 }}>
            {plates.map((p, i) => {
              const flipped = i % 2 === 1;
              return (
                <article key={p.slug} style={{
                  display: "grid",
                  gridTemplateColumns: flipped ? "5fr 7fr" : "7fr 5fr",
                  gap: 72, alignItems: "center",
                }}>
                  <div style={{ order: flipped ? 2 : 1 }}>
                    <Frame src={p.image} alt={p.title} onClick={() => onNavigate("painting", p)} />
                  </div>
                  <div style={{ order: flipped ? 1 : 2, paddingTop: 20 }}>
                    <div style={{
                      fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.3em",
                      textTransform: "uppercase", color: "var(--pigment-sienna)", marginBottom: 20,
                    }}>{p.subject}</div>

                    <h3 style={{
                      fontFamily: "var(--font-display)", fontSize: 48, fontStyle: "italic",
                      fontWeight: 300, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05,
                      color: "var(--ink-1)",
                    }}>{p.title}</h3>

                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 19,
                      color: "var(--fg-muted)", marginTop: 12,
                    }}>{p.year} · {p.medium} · {p.dimensions}</div>

                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.65,
                      color: "var(--ink-2)", marginTop: 28, maxWidth: 520,
                    }}>{(() => {
                      const s = (p.note || "").split(". ").slice(0, 2).join(". ");
                      return s.endsWith(".") ? s : s + ".";
                    })()}</p>

                    <a href="#" onClick={e => { e.preventDefault(); onNavigate("painting", p); }} style={{
                      display: "inline-block", marginTop: 24,
                      fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.22em",
                      textTransform: "uppercase", color: "var(--ink-1)",
                      borderBottom: "1px solid var(--ink-1)", paddingBottom: 4, textDecoration: "none",
                    }}>View painting →</a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 04 · Notes from my paintings ─────────────────────────── */}
      {(() => {
        const withNotes = PAINTINGS.filter(p => p.note);
        const noted = withNotes[Math.floor(Math.random() * withNotes.length)];
        return (
          <section style={{ background: "var(--dark-2)", color: "var(--dark-on-1)", padding: "120px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <img src={noted.image} alt={noted.title} style={{ width: "100%", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)" }}/>
              <div>
                <div style={{
                  fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.3em",
                  textTransform: "uppercase", color: "var(--pigment-ochre)", marginBottom: 28,
                }}>Notes from my paintings</div>
                <blockquote style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 28, lineHeight: 1.55,
                  fontStyle: "italic", fontWeight: 300, color: "var(--dark-on-1)", margin: 0,
                }}>
                  <span style={{ color: "var(--pigment-ochre)", fontSize: 54, lineHeight: 0, verticalAlign: "-0.2em", marginRight: 4 }}>"</span>
                  {noted.note}
                </blockquote>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: 22, fontStyle: "italic",
                  color: "var(--pigment-ochre)", marginTop: 36, opacity: 0.85,
                }}>— {noted.title}, {noted.year}</div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── 05 · Series photo strip ───────────────────────────────── */}
      <section style={{ background: "var(--paper-1)", color: "var(--ink-1)", padding: "96px 0 80px", overflow: "hidden" }}>
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .photo-strip { display: flex; animation: marquee 40s linear infinite; width: max-content; }
          .photo-strip:hover { animation-play-state: paused; }
        `}</style>

        <div style={{ padding: "0 48px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.03em", margin: 0,
          }}>
            the world outside the studio.
          </h2>
          <Button variant="link" onClick={() => onNavigate("series")}>View all →</Button>
        </div>

        <div style={{ position: "relative" }}>
          <div className="photo-strip">
            {[...Array(31).keys()].concat([...Array(31).keys()]).map((i, idx) => (
              <div key={idx} onClick={() => onNavigate("series")} style={{
                flexShrink: 0, width: 220, height: 300, marginRight: 16,
                overflow: "hidden", cursor: "pointer",
              }}>
                <img
                  src={`assets/series/series-${i + 1}.jpg`}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 · Colophon ─────────────────────────────────────────── */}
      <section style={{
        background: "var(--dark-1)", color: "var(--dark-on-1)",
        padding: "96px 48px", borderTop: "1px solid rgba(240,230,210,0.12)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 38, fontStyle: "italic",
            fontWeight: 300, color: "var(--dark-on-1)", letterSpacing: "-0.02em",
          }}>Write to me.</div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontStyle: "italic",
            color: "var(--dark-on-2)", marginTop: 16, maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          }}>
            For commissions, studio visits, or a slow reply about painting.
          </p>
          <div style={{ marginTop: 32 }}>
            <Button variant="onDark" onClick={() => onNavigate("contact")}>Open the note</Button>
          </div>
        </div>
      </section>

    </div>
  );
};

window.Home = Home;
