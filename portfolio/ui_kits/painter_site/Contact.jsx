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

const Series = ({ onNavigate }) => (
  <div style={{ background: "var(--paper-1)" }}>
    <section style={{ padding: "96px 48px 56px" }}>
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>Three in progress</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.035em", margin: 0, lineHeight: 1.02 }}>
        Series — the ones I keep<br/><em style={{ fontWeight: 300 }}>coming back to.</em>
      </h1>
    </section>
    {SERIES.map((s, i) => {
      const works = PAINTINGS.filter(p => p.series === s.title).slice(0, 3);
      return (
        <section key={s.slug} style={{ padding: "72px 48px", borderTop: "1px solid var(--border-soft)", background: i % 2 ? "var(--paper-2)" : "transparent" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 48 }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-muted)" }}>№ {String(i + 1).padStart(2, "0")} · {s.count} works · {s.years}</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 300, fontStyle: "italic", margin: "12px 0 20px", letterSpacing: "-0.02em" }}>{s.title}</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>{s.summary}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
              {works.map(w => <PaintingCard key={w.slug} painting={w} onClick={() => onNavigate("painting", w)} size="sm" showTags={false}/>)}
            </div>
          </div>
        </section>
      );
    })}
  </div>
);

window.Contact = Contact;
window.Series = Series;
