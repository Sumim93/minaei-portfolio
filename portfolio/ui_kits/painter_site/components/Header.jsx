// Header.jsx — always-fixed, scroll-aware
const Header = ({ current = "", onNavigate, variant = "light" }) => {
  const { isMobile } = useBreakpoint();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const isHome = variant === "dark"; // home uses dark/transparent at top

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // check immediately on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on page change
  React.useEffect(() => { setMenuOpen(false); }, [current]);

  // On home at top → transparent dark. Everywhere else / scrolled → frosted paper.
  const solid = !isHome || scrolled;

  const bg          = solid ? "rgba(245,241,234,0.97)" : "transparent";
  const textColor   = solid ? "var(--ink-1)"           : "var(--dark-on-1)";
  const borderColor = solid ? "var(--border-soft)"     : "rgba(240,230,210,0.12)";
  const shadow      = solid ? "0 2px 20px rgba(60,45,30,0.07)" : "none";

  const items = [
    { key: "works",   label: "Works" },
    { key: "series",  label: "Series" },
    { key: "about",   label: "About" },
    { key: "contact", label: "Contact" },
  ];

  const go = (key) => { onNavigate?.(key); setMenuOpen(false); };

  const navLinkStyle = (key) => ({
    fontFamily: "var(--font-ui)",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "inherit",
    textDecoration: "none",
    opacity: current === key ? 1 : 0.65,
    paddingBottom: 4,
    borderBottom: current === key ? "1px solid currentColor" : "1px solid transparent",
    transition: "opacity 0.2s ease",
  });

  return (
    <header style={{
      padding: isMobile ? "18px 20px" : "20px 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: bg,
      backdropFilter: solid ? "blur(18px)" : "none",
      WebkitBackdropFilter: solid ? "blur(18px)" : "none",
      borderBottom: `1px solid ${borderColor}`,
      boxShadow: shadow,
      color: textColor,
      transition: "background 0.4s ease, color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
    }}>

      {/* Logo */}
      <a href="/" onClick={e => { e.preventDefault(); go("home"); }} style={{
        fontFamily: "var(--font-display)",
        fontSize: 28,
        fontWeight: 300,
        letterSpacing: "-0.02em",
        color: "inherit",
        textDecoration: "none",
        fontVariationSettings: '"opsz" 144, "SOFT" 100',
      }}>Sumim</a>

      {/* Desktop nav */}
      {!isMobile && (
        <nav style={{ display: "flex", gap: 36 }}>
          {items.map(it => (
            <a key={it.key} href={`/${it.key}`}
              onClick={e => { e.preventDefault(); go(it.key); }}
              style={navLinkStyle(it.key)}>
              {it.label}
            </a>
          ))}
        </nav>
      )}

      {/* Desktop CTA */}
      {!isMobile && (
        <a href="/contact"
          onClick={e => { e.preventDefault(); go("contact"); }}
          style={{
            fontFamily: "var(--font-ui)", fontSize: 11,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "inherit", textDecoration: "none",
            border: "1px solid currentColor",
            padding: "8px 18px", borderRadius: 999, opacity: 0.8,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
        >Send a Note</a>
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

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(245,241,234,0.98)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--border-soft)",
          display: "flex", flexDirection: "column",
          padding: "8px 0", zIndex: 50,
        }}>
          {items.map(it => (
            <a key={it.key} href={`/${it.key}`}
              onClick={e => { e.preventDefault(); go(it.key); }}
              style={{
                fontFamily: "var(--font-ui)", fontSize: 11,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "var(--ink-1)",
                textDecoration: "none", padding: "15px 20px",
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
