// Icon.jsx — bespoke 1.25px stroke SVG set
const Icon = ({ name, size = 20, ...rest }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.25,
    strokeLinecap: "round", strokeLinejoin: "round", ...rest,
  };
  switch (name) {
    case "close": return <svg {...common}><path d="M5 5l14 14M19 5L5 19"/></svg>;
    case "arrow-left": return <svg {...common}><path d="M15 5l-7 7 7 7M8 12h13"/></svg>;
    case "arrow-right": return <svg {...common}><path d="M9 5l7 7-7 7M16 12H3"/></svg>;
    case "arrow-up-right": return <svg {...common}><path d="M7 17L17 7M9 7h8v8"/></svg>;
    case "zoom": return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5M8 11h6M11 8v6"/></svg>;
    case "menu": return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "instagram": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/></svg>;
    case "mail": return <svg {...common}><rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/></svg>;
    case "plus": return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    default: return null;
  }
};

window.Icon = Icon;
