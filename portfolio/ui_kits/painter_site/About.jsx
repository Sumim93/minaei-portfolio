// About.jsx — editorial bio + photo layout
const About = () => (
  <div style={{ background: "var(--paper-1)" }}>
    <section style={{ padding: "96px 48px 72px" }}>
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>The artist · A reading</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.035em", margin: 0, lineHeight: 1.02, maxWidth: 900 }}>
        I came to painting on my own,<br/><em style={{ fontWeight: 300 }}>and stayed for the faces.</em>
      </h1>
    </section>

    <section style={{ padding: "0 48px 96px", display: "grid", gridTemplateColumns: "5fr 7fr", gap: 72, alignItems: "start" }}>
      <div>
        <Frame src="assets/Profile.jpg" alt="Somaye Minaei" matted={true}/>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: "var(--fg-muted)", marginTop: 14, textAlign: "center" }}>
          Somaye Minaei — painter.
        </div>
      </div>

      <div style={{ paddingTop: 20 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontStyle: "italic", lineHeight: 1.55, color: "var(--ink-1)", margin: 0 }}>
          I paint to look more slowly. That is the whole of it — a portrait, for me, is just permission to keep looking at someone until they soften.
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", marginTop: 32, maxWidth: 620 }}>
          My name is Somaye Minaei. I sign my paintings <em>S. Minaei</em>. I was born in Iran and live now in Switzerland, where I paint in oil — mostly portraits, with the occasional landscape carried home from a walk, and small still lifes when a single colour asks to be looked at on its own.
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", marginTop: 20, maxWidth: 620 }}>
          I am self-taught. There was no academy, no atelier — only years of looking at paintings I loved and trying, slowly, to understand how they were made. I taught myself in the way you teach yourself any patient thing: by getting it wrong, by sitting with the wrong, and by going back to the canvas the next morning.
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", marginTop: 20, maxWidth: 620 }}>
          The portraits are the centre of the work. I build them in layers — a cool underpainting first, then warm half-tones, then the slow correction of the face over many sittings. I keep coming back to the same kind of question: what does a face look like once you have stopped trying to make it look like anyone in particular, and only painted what is in front of you?
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", marginTop: 20, maxWidth: 620 }}>
          The landscapes are the rest in between. They are smaller, made faster, and carry the places I have been — a desert in the American southwest, a stretch of sea in the spring, the coast of a lake near home. I take them as breath between portraits.
        </p>

        {/* Timeline */}
        <div style={{ marginTop: 64 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>A brief chronology</div>
          <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px 40px", borderTop: "1px solid var(--border)", paddingTop: 24, margin: 0 }}>
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

    {/* Now in the works */}
    <section style={{ padding: "96px 48px", background: "var(--paper-0)", borderTop: "1px solid var(--border-soft)" }}>
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 16, textAlign: "center" }}>In the studio</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20, color: "var(--ink-2)", textAlign: "center", marginBottom: 48 }}>
        Now in the works — details from a portrait in progress.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 1400, margin: "0 auto" }}>
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

window.About = About;
