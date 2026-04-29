// Footer.jsx
const Footer = ({ onNavigate }) => {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <footer style={{
      borderTop: "1px solid var(--border-soft)",
      padding: isMobile ? "48px 20px 36px" : "64px 48px 48px",
      marginTop: 96,
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1.2fr 1fr 1fr 1fr",
      gap: isMobile ? 36 : 40,
      color: "var(--ink-2)",
    }}>
      <div>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "var(--ink-1)",
        }}>Sumim</div>
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
        { title: "Studio", items: ["Works", "Series", "About"] },
        { title: "Write to me", items: ["Commissions", "Studio visits", "Contact"] },
        { title: "Elsewhere", items: [{ label: "Instagram", href: "https://www.instagram.com/Somaye_Minaei" }, { label: "Substack", href: "#" }] },
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
            {col.items.map(it => {
              const label = typeof it === "string" ? it : it.label;
              const href  = typeof it === "string" ? "#" : it.href;
              const external = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      color: "var(--ink-2)",
                      textDecoration: "none",
                    }}
                  >{label}</a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div style={{
        gridColumn: "1 / -1",
        borderTop: "1px solid var(--border-soft)",
        paddingTop: 24,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap: isMobile ? 8 : 0,
        fontFamily: "var(--font-ui)",
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--fg-subtle)",
        marginTop: 32,
      }}>
        <span>© 2026 Sumim · Art by Sumi</span>
        <span>Site last pruned — April 2026</span>
      </div>
    </footer>
  );
};

window.Footer = Footer;
