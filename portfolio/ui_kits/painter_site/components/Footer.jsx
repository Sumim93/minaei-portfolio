// Footer.jsx
const Footer = ({ onNavigate }) => (
  <footer style={{
    borderTop: "1px solid var(--border-soft)",
    padding: "64px 48px 48px",
    marginTop: 96,
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
    gap: 40,
    color: "var(--ink-2)",
  }}>
    <div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: 32,
        fontWeight: 300,
        letterSpacing: "-0.02em",
        color: "var(--ink-1)",
      }}>Minaei</div>
      <p style={{
        fontFamily: "var(--font-body)",
        fontStyle: "italic",
        fontSize: 15,
        color: "var(--fg-muted)",
        marginTop: 14,
        lineHeight: 1.5,
        maxWidth: 280,
      }}>
        An oil-painting studio. Portraits, landscapes, and the long looking between them.
      </p>
    </div>

    {[
      { title: "Studio", items: ["Works", "Series", "About", "Journal"] },
      { title: "Writing to me", items: ["Commissions", "Press & exhibitions", "Write to me", "Newsletter"] },
      { title: "Elsewhere", items: ["Instagram", "Substack", "Prints"] },
    ].map(col => (
      <div key={col.title}>
        <div style={{
          fontFamily: "var(--font-ui)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--fg-muted)",
          marginBottom: 18,
        }}>{col.title}</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {col.items.map(it => (
            <li key={it}>
              <a href="#" style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "var(--ink-2)",
                textDecoration: "none",
              }}>{it}</a>
            </li>
          ))}
        </ul>
      </div>
    ))}

    <div style={{
      gridColumn: "1 / -1",
      borderTop: "1px solid var(--border-soft)",
      paddingTop: 24,
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-ui)",
      fontSize: 11,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--fg-subtle)",
      marginTop: 32,
    }}>
      <span>© 2026 Minaei Studio · All works reproduced with permission</span>
      <span>Site last pruned — October</span>
    </div>
  </footer>
);

window.Footer = Footer;
