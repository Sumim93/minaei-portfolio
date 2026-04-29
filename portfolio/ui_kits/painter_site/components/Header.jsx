// Header.jsx — editorial top bar
const Header = ({ current = "works", onNavigate, variant = "light" }) => {
  const items = [
    { key: "works", label: "Works" },
    { key: "series", label: "Series" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];
  const dark = variant === "dark";
  return (
    <header style={{
      padding: "22px 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: dark ? "1px solid rgba(240,230,210,0.12)" : "1px solid var(--border-soft)",
      background: "transparent",
      color: dark ? "var(--dark-on-1)" : "var(--ink-1)",
      position: "relative",
      zIndex: 10,
    }}>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.("home"); }} style={{
        fontFamily: "var(--font-display)",
        fontSize: 30,
        fontWeight: 300,
        letterSpacing: "-0.02em",
        color: "inherit",
        textDecoration: "none",
        fontVariationSettings: '"opsz" 144, "SOFT" 100',
      }}>Sumim</a>

      <nav style={{ display: "flex", gap: 36 }}>
        {items.map(it => (
          <a key={it.key}
             href="#"
             onClick={(e) => { e.preventDefault(); onNavigate?.(it.key); }}
             style={{
               fontFamily: "var(--font-ui)",
               fontSize: 11,
               letterSpacing: "0.22em",
               textTransform: "uppercase",
               color: "inherit",
               textDecoration: "none",
               opacity: current === it.key ? 1 : 0.7,
               position: "relative",
               paddingBottom: 4,
               borderBottom: current === it.key ? `1px solid currentColor` : "1px solid transparent",
               transition: "opacity var(--dur-fast) var(--ease-out)",
             }}>
            {it.label}
          </a>
        ))}
      </nav>

      <div style={{
        fontFamily: "var(--font-ui)",
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "inherit",
        opacity: 0.6,
      }}>
        Art by Sumi
      </div>
    </header>
  );
};

window.Header = Header;
