// Button.jsx — three variants
const Button = ({ children, variant = "primary", onClick, as = "button", href, ...rest }) => {
  const base = {
    fontFamily: "var(--font-ui)",
    fontSize: 12,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontWeight: 500,
    padding: "14px 26px",
    borderRadius: "var(--r-md)",
    cursor: "pointer",
    transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
    border: "1px solid transparent",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  };
  const variants = {
    primary: { background: "var(--ink-1)", color: "var(--paper-0)" },
    ghost: { background: "transparent", color: "var(--ink-1)", borderColor: "var(--ink-3)" },
    onDark: { background: "var(--paper-0)", color: "var(--ink-1)" },
    link: {
      background: "transparent", color: "var(--pigment-umber)",
      padding: 0, letterSpacing: 0, textTransform: "none",
      fontFamily: "var(--font-body)", fontSize: 16, fontStyle: "italic",
      textDecoration: "underline", textDecorationColor: "color-mix(in oklch, currentColor 30%, transparent)",
      textUnderlineOffset: "0.22em",
    },
  };
  const style = { ...base, ...variants[variant] };
  const hoverEnter = e => {
    if (variant === "primary") e.currentTarget.style.background = "var(--pigment-sienna)";
    else if (variant === "ghost") { e.currentTarget.style.borderColor = "var(--ink-1)"; e.currentTarget.style.background = "var(--paper-0)"; }
    else if (variant === "onDark") e.currentTarget.style.background = "var(--pigment-ochre)";
    else if (variant === "link") e.currentTarget.style.color = "var(--pigment-sienna)";
  };
  const hoverLeave = e => {
    Object.assign(e.currentTarget.style, variants[variant]);
  };
  const props = { style, onMouseEnter: hoverEnter, onMouseLeave: hoverLeave, onClick, ...rest };
  if (as === "a") return <a href={href || "#"} {...props}>{children}</a>;
  return <button {...props}>{children}</button>;
};

window.Button = Button;
