// Header.jsx — editorial top bar
const Header = ({ current = "works", onNavigate, variant = "light" }) => {
  const { isMobile } = useBreakpoint();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const dark = variant === "dark";

  const items = [
    { key: "works",   label: "Works" },
    { key: "series",  label: "Series" },
    { key: "about",   label: "About" },
    { key: "contact", label: "Contact" },
  ];

  const navLinkStyle = (key) => ({
    fontFamily: "var(--font-ui)",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "inherit",
    textDecoration: "none",
    opacity: current === key ? 1 : 0.7,
    paddingBottom: 4,
    borderBottom: current === key ? "1px solid currentColor" : "1px solid transparent",
    transition: "opacity var(--dur-fast) var(--ease-out)",
  });

  return (
    <header style={{
      padding: isMobile ? "18px 20px" : "22px 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: dark ? "1px solid rgba(240,230,210,0.12)" : "1px solid var(--border-soft)",
      background: "transparent",
      color: dark ? "var(--dark-on-1)" : "var(--ink-1)",
      position: "relative",
      zIndex: 10,
    }}>
      {/* Logo */}
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.("home"); setMenuOpen(false); }} style={{
        fontFamily: "var(--font-display)",
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: "inherit",
        textDecoration: "none",
      }}>Sumim</a>

      {/* Desktop nav */}
      {!isMobile && (
        <nav style={{ display: "flex", gap: 36 }}>
          {items.map(it => (
            <a key={it.key} href="#"
              onClick={(e) => { e.preventDefault(); onNavigate?.(it.key); }}
              style={navLinkStyle(it.key)}>
              {it.label}
            </a>
          ))}
        </nav>
      )}

      {/* Desktop right label */}
      {!isMobile && (
        <div style={{
          fontFamily: "var(--font-ui)", fontSize: 11,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "inherit", opacity: 0.6,
        }}>Art by Sumi</div>
      )}

      {/* Mobile hamburger */}
      {isMobile && (
        <button onClick={() => setMenuOpen(o => !o)} style={{
          background: "transparent", border: 0, cursor: "pointer",
          color: "inherit", padding: 4, lineHeight: 1,
        }}>
          {menuOpen
            ? <span style={{ fontSize: 24 }}>✕</span>
            : <span style={{ fontSize: 22, letterSpacing: 2 }}>☰</span>
          }
        </button>
      )}

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: dark ? "var(--dark-1)" : "var(--paper-0)",
          borderBottom: "1px solid var(--border-soft)",
          display: "flex", flexDirection: "column",
          padding: "12px 0", zIndex: 50,
        }}>
          {items.map(it => (
            <a key={it.key} href="#"
              onClick={(e) => { e.preventDefault(); onNavigate?.(it.key); setMenuOpen(false); }}
              style={{
                fontFamily: "var(--font-ui)", fontSize: 11,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: dark ? "var(--dark-on-1)" : "var(--ink-1)",
                textDecoration: "none", padding: "14px 20px",
                borderBottom: "1px solid var(--border-soft)",
                opacity: current === it.key ? 1 : 0.7,
              }}>
              {it.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

window.Header = Header;
