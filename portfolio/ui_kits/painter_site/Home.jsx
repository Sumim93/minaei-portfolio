// Home.jsx — Monograph edition (deepened, sole variant)
const { motion } = window.FramerMotion;

const Home = ({ onNavigate }) => {
  const { isMobile, isTablet } = useBreakpoint();
  const hero = PAINTINGS[Math.floor(Math.random() * PAINTINGS.length)];
  const plates = PAINTINGS.slice(0, 5);
  const px = isMobile ? 20 : 48;

  return (
    <div style={{ background: "var(--dark-1)", color: "var(--dark-on-1)" }}>

      {/* ── 01 · Cover ─────────────────────────────────────────────── */}
      <section style={{
        padding: "0 0 0", position: "relative", minHeight: "92vh",
        display: "grid", gridTemplateColumns: "1fr",
        backgroundColor: "var(--dark-1)",
        backgroundImage: `url(${hero.hero || hero.image})`,
        backgroundSize: "cover", backgroundPosition: "center 18%",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(20,17,13,0.38) 0%, rgba(20,17,13,0.52) 45%, rgba(20,17,13,0.82) 80%, rgba(20,17,13,1) 100%)",
          pointerEvents: "none", zIndex: 1,
        }} />
        <div style={{
          alignSelf: "end", padding: isMobile ? "0 20px 72px" : "0 48px 96px", maxWidth: 980,
          position: "relative", zIndex: 2,
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(3.5rem, 16vw, 6rem)" : "clamp(4.5rem, 11vw, 10rem)",
              fontWeight: 300, lineHeight: 0.92, letterSpacing: "-0.045em",
              margin: 0, color: "var(--dark-on-1)",
              fontVariationSettings: '"opsz" 144, "SOFT" 100',
            }}
          >
            <em style={{ fontWeight: 300 }}>Sumim.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              fontFamily: "'Lora', serif", fontSize: isMobile ? 20 : 26, lineHeight: 1.5,
              fontStyle: "italic", fontWeight: 300,
              color: "var(--dark-on-2)", maxWidth: 640, marginTop: 28,
            }}
          >
            I paint to look more slowly. That is the whole of it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.66 }}
            style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 24, marginTop: 36, alignItems: isMobile ? "flex-start" : "center" }}
          >
            <Button variant="onDark" onClick={() => onNavigate("works")}>Open the catalogue</Button>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("painting", hero); }} style={{
              fontFamily: "var(--font-body)", fontSize: isMobile ? 15 : 17, fontStyle: "italic",
              color: "var(--pigment-ochre)", textDecoration: "underline",
              textDecorationColor: "rgba(201,169,97,0.35)", textUnderlineOffset: "0.25em",
            }}>Begin with no. {String(hero.number).padStart(2,"0")} — <em>{hero.title}</em> →</a>
          </motion.div>
        </div>

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{
              position: "absolute", bottom: 32, left: 48,
              fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "rgba(240,230,210,0.4)",
            }}
          >↓ Scroll to explore</motion.div>
        )}
      </section>

      {/* ── 02 · Foreword ─────────────────────────────────────────── */}
      <section style={{
        background: "var(--paper-1)", color: "var(--ink-1)",
        padding: isMobile ? "72px 20px" : "120px 48px",
        borderTop: "1px solid rgba(240,230,210,0.12)",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}
        >
          <div style={{
            fontFamily: "'Caveat', cursive",
            fontSize: isMobile ? 36 : 44,
            color: "var(--pigment-sienna)",
            lineHeight: 1,
            marginBottom: isMobile ? 32 : 44,
          }}>
            S. Minaei
          </div>

          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: isMobile ? 19 : 24,
            lineHeight: 1.65,
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--ink-1)",
            margin: "0 auto",
            maxWidth: 760,
          }}>
            I work in oil, mostly on canvas. My subjects range from portraits to landscapes, sometimes a face caught in candlelight, sometimes a tree on a rock or red desert cliffs. I'm drawn to light and what it does to a surface, whether that's skin, stone, or water. Each piece starts with something that makes me want to look longer.
          </p>
        </motion.div>
      </section>

      {/* ── 03 · Plates index ─────────────────────────────────────── */}
      <section style={{
        background: "var(--paper-2)", color: "var(--ink-1)",
        padding: isMobile ? "72px 20px" : "120px 48px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: isMobile ? 40 : 64, flexWrap: "wrap", gap: 16 }}
          >
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 300, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.05,
              maxWidth: 720,
            }}>
              Selected works.
            </h2>
            <Button variant="link" onClick={() => onNavigate("works")}>See the full catalogue →</Button>
          </motion.div>

          {/* Plate list — alternating L/R on desktop, stacked on mobile */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 64 : 120 }}>
            {plates.map((p, i) => {
              const flipped = !isMobile && i % 2 === 1;
              return (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.72, ease: [0.2, 0.8, 0.2, 1] }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : flipped ? "5fr 7fr" : "7fr 5fr",
                    gap: isMobile ? 24 : 72,
                    alignItems: "center",
                  }}
                >
                  <div style={{ order: flipped ? 2 : 1 }}>
                    <Frame src={p.image} alt={p.title} onClick={() => onNavigate("painting", p)} />
                  </div>
                  <div style={{ order: flipped ? 1 : 2, paddingTop: isMobile ? 0 : 20 }}>
                    <div style={{
                      fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.3em",
                      textTransform: "uppercase", color: "var(--pigment-sienna)", marginBottom: 16,
                    }}>{p.subject}</div>

                    <h3 style={{
                      fontFamily: "var(--font-display)", fontSize: isMobile ? 32 : 48, fontStyle: "italic",
                      fontWeight: 300, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05,
                      color: "var(--ink-1)",
                    }}>{p.title}</h3>

                    <div style={{
                      fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: isMobile ? 16 : 19,
                      color: "var(--fg-muted)", marginTop: 12,
                    }}>{p.year} · {p.medium} · {p.dimensions}</div>

                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: isMobile ? 15 : 17, lineHeight: 1.65,
                      color: "var(--ink-2)", marginTop: 20, maxWidth: 520,
                    }}>{(() => {
                      const s = (p.note || "").split(". ").slice(0, 2).join(". ");
                      return s.endsWith(".") ? s : s + ".";
                    })()}</p>

                    <a href="#" onClick={e => { e.preventDefault(); onNavigate("painting", p); }} style={{
                      display: "inline-block", marginTop: 20,
                      fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.22em",
                      textTransform: "uppercase", color: "var(--ink-1)",
                      borderBottom: "1px solid var(--ink-1)", paddingBottom: 4, textDecoration: "none",
                    }}>View painting →</a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 04 · In the studio ───────────────────────────────────── */}
      <section style={{ background: "var(--dark-2)", color: "var(--dark-on-1)", padding: isMobile ? "72px 20px" : "120px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "var(--pigment-ochre)",
              marginBottom: 16, textAlign: "center",
            }}>In the studio</div>
            <div style={{
              fontFamily: "'Lora', serif", fontStyle: "italic",
              fontSize: isMobile ? 18 : 22, color: "var(--dark-on-2)",
              textAlign: "center", marginBottom: isMobile ? 40 : 56,
            }}>
              Now in the works — details from a portrait in progress.
            </div>
          </motion.div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 16 : 24,
          }}>
            {[1, 2, 3].map((n, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.13, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ aspectRatio: "4/3", overflow: "hidden", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }}
              >
                <img
                  src={`assets/studio/studio-${n}.jpg`}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 · Series photo strip ───────────────────────────────── */}
      <section style={{ background: "var(--paper-1)", color: "var(--ink-1)", padding: isMobile ? "64px 0 56px" : "96px 0 80px", overflow: "hidden" }}>
        <style>{`
          @keyframes marquee {
            0%   { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .photo-strip {
            display: flex;
            width: max-content;
            animation: marquee 60s linear infinite;
            will-change: transform;
            backface-visibility: hidden;
          }
          .photo-strip:hover { animation-play-state: paused; }
          .strip-img { width: 180px; height: 260px; object-fit: cover; display: block; flex-shrink: 0; }
          @media (min-width: 768px) {
            .strip-img { width: 220px; height: 300px; }
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ padding: isMobile ? "0 20px" : "0 48px", marginBottom: 36, display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 3.5rem)",
            fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.03em", margin: 0,
          }}>
            the world outside the studio.
          </h2>
          <Button variant="link" onClick={() => onNavigate("series")}>View all →</Button>
        </motion.div>

        <div style={{ cursor: "pointer" }} onClick={() => onNavigate("series")}>
          <div className="photo-strip">
            {[...Array(31).keys()].concat([...Array(31).keys()]).map((i, idx) => (
              <img
                key={idx}
                src={`assets/series-thumb/thumb-${i + 1}.jpg`}
                alt=""
                className="strip-img"
                loading="eager"
                style={{ marginRight: 12 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 · Colophon ─────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65 }}
        style={{
          background: "var(--dark-1)", color: "var(--dark-on-1)",
          padding: isMobile ? "72px 20px" : "96px 48px",
          borderTop: "1px solid rgba(240,230,210,0.12)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: isMobile ? 28 : 38, fontStyle: "italic",
            fontWeight: 300, color: "var(--dark-on-1)", letterSpacing: "-0.02em",
          }}>Write to me.</div>
          <p style={{
            fontFamily: "'Lora', serif", fontSize: isMobile ? 17 : 19, fontStyle: "italic",
            color: "var(--dark-on-2)", marginTop: 16, maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          }}>
            For commissions, studio visits, or a slow reply about painting.
          </p>
          <div style={{ marginTop: 32 }}>
            <Button variant="onDark" onClick={() => onNavigate("contact")}>Open the note</Button>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

window.Home = Home;
