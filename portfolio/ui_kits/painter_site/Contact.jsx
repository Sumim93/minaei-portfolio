// Contact.jsx & Series.jsx
const Contact = ({ prefill }) => {
  const [sent, setSent] = React.useState(false);
  return (
    <div style={{ background: "var(--paper-1)" }}>
      <section style={{ padding: "96px 48px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>Write to me</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.05 }}>
          For commissions, studio visits,<br/><em style={{ fontWeight: 300 }}>or a slow reply about painting.</em>
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontStyle: "italic", lineHeight: 1.55, color: "var(--ink-2)", marginTop: 28, maxWidth: 600 }}>
          I read everything that arrives, and I reply within a week — usually less. Tell me what you're looking at, and what you'd like to know.
        </p>
      </section>

      <section style={{ padding: "32px 48px 96px", maxWidth: 900, margin: "0 auto" }}>
        {sent ? (
          <div style={{ padding: "64px 48px", background: "var(--paper-2)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--pigment-sienna)", marginBottom: 16 }}>Thank you</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontStyle: "italic", fontWeight: 300, margin: 0, color: "var(--ink-1)" }}>Your note is on its way.</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "var(--fg-muted)", marginTop: 16 }}>I'll write back soon — likely after Wednesday, after the October sitting ends.</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {[
              { k: "name", label: "Your name", placeholder: "Elena Morris" },
              { k: "email", label: "Email", placeholder: "elena@morris.studio" },
            ].map(f => (
              <Field key={f.k} {...f}/>
            ))}
            <Field k="interest" label="Interested in" placeholder={prefill?.title || "A commission, a studio visit, or a specific work"} boxed defaultValue={prefill ? `${prefill.title}, ${prefill.year}` : ""} style={{ gridColumn: "1/-1" }}/>
            <FieldArea k="note" label="Your note" placeholder="Tell me what you're looking at." style={{ gridColumn: "1/-1" }}/>

            <div style={{ gridColumn: "1/-1", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, borderTop: "1px solid var(--border-soft)", paddingTop: 24 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: "var(--fg-muted)" }}>
                Or, write directly — <a href="mailto:hello@minaei.studio" style={{ color: "var(--pigment-umber)" }}>hello@minaei.studio</a>
              </div>
              <Button variant="primary" onClick={() => {}}>Send the note</Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

const Field = ({ k, label, placeholder, boxed, defaultValue = "", style }) => (
  <div style={style}>
    <label style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 8 }}>{label}</label>
    <input type="text" placeholder={placeholder} defaultValue={defaultValue} style={{
      width: "100%", boxSizing: "border-box", background: boxed ? "var(--paper-0)" : "transparent",
      border: boxed ? "1px solid var(--border)" : 0, borderBottom: "1px solid var(--border)",
      padding: boxed ? "14px 16px" : "10px 0", fontFamily: "var(--font-body)", fontSize: 17, color: "var(--ink-1)",
      outline: "none", borderRadius: boxed ? "var(--r-md)" : 0,
    }}/>
  </div>
);

const FieldArea = ({ k, label, placeholder, style }) => (
  <div style={style}>
    <label style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 8 }}>{label}</label>
    <textarea rows={5} placeholder={placeholder} style={{
      width: "100%", boxSizing: "border-box", background: "var(--paper-0)",
      border: "1px solid var(--border)", padding: "14px 16px",
      fontFamily: "var(--font-body)", fontSize: 17, color: "var(--ink-1)", outline: "none",
      borderRadius: "var(--r-md)", resize: "vertical",
    }}/>
  </div>
);

const PHOTO_SERIES = [
  {
    slug: "the-garden",
    title: "The Garden",
    description: "Summer afternoons in a rose garden, my paintings laid out around me. A day of open air and warm light — letting the work breathe outside the studio for the first time.",
    photos: [1, 3, 5],
  },
  {
    slug: "blossom",
    title: "Blossom",
    description: "April in Switzerland. Cherry trees in full flower, fields of dandelions still wet from the night. These were taken before the season turned — that week when everything arrives at once.",
    photos: [2, 4, 6, 8],
  },
  {
    slug: "golden-hour",
    title: "Golden Hour",
    description: "Photographed at dusk in the open fields near home. The light at that hour does something to the world — it makes everything feel both present and already past.",
    photos: [7, 9, 10, 11],
  },
  {
    slug: "above-the-treeline",
    title: "Above the Treeline",
    description: "Autumn in the Swiss Alps — first snow on the peaks, the valley still amber and green below. I go to the mountains to remember what scale feels like, and to be quietly small inside it.",
    photos: [12, 13, 14, 15, 16, 17],
  },
  {
    slug: "carrying-it",
    title: "Carrying It",
    description: "A portrait carried out into a snowy field. I wanted to see what it looked like in the world — the painting held against winter, its warm candlelight pressed against all that white and grey.",
    photos: [18, 19, 20, 21, 22],
  },
  {
    slug: "by-the-water",
    title: "By the Water",
    description: "Autumn, beside a still river. The painting rested in the tall grass while I stood behind it — two portraits facing the same water, the same low light, the same quiet.",
    photos: [23, 24, 25, 26],
  },
  {
    slug: "wandering",
    title: "Wandering",
    description: "October walks through the park and over the old bridge, always carrying something. The painting travels with me — it changes when the season does, and so do I.",
    photos: [27, 28, 29, 30, 31],
  },
];

const Series = ({ onNavigate }) => {
  const [lightbox, setLightbox] = React.useState(null);

  return (
    <div style={{ background: "var(--paper-1)" }}>
      <section style={{ padding: "96px 48px 72px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.035em", margin: 0, lineHeight: 1.02 }}>
          Photographs — <em style={{ fontWeight: 300 }}>the world outside the studio.</em>
        </h1>
      </section>

      {PHOTO_SERIES.map((s, i) => (
        <section key={s.slug} style={{
          padding: "80px 48px",
          borderTop: "1px solid var(--border-soft)",
          background: i % 2 === 1 ? "var(--paper-2)" : "transparent",
        }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.8rem)", fontWeight: 300, fontStyle: "italic", margin: "0 0 16px", letterSpacing: "-0.025em" }}>
              {s.title}
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", lineHeight: 1.6, color: "var(--ink-2)", margin: 0, maxWidth: 680 }}>
              {s.description}
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(s.photos.length, 4)}, 1fr)`,
            gap: 16,
            alignItems: "start",
          }}>
            {s.photos.map((n) => (
              <div key={n} style={{ aspectRatio: "2/3", overflow: "hidden", cursor: "zoom-in" }}
                onClick={() => setLightbox(`assets/series/series-${n}.jpg`)}>
                <img
                  src={`assets/series/series-${n}.jpg`}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, background: "rgba(20,17,13,0.94)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 48,
          cursor: "zoom-out", backdropFilter: "blur(8px)",
        }}>
          <img src={lightbox} alt="" style={{ maxHeight: "90vh", maxWidth: "90vw", objectFit: "contain", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}/>
          <button onClick={() => setLightbox(null)} style={{
            position: "absolute", top: 32, right: 32, background: "transparent", border: 0,
            color: "var(--dark-on-1)", cursor: "pointer", fontSize: 28, lineHeight: 1,
          }}>✕</button>
        </div>
      )}
    </div>
  );
};

window.Contact = Contact;
window.Series = Series;
