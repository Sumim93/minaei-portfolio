// Shared responsive hook
const useBreakpoint = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: width < 768, isTablet: width < 1024 };
};
window.useBreakpoint = useBreakpoint;

// Scroll-reveal hook — fades + slides element up when it enters the viewport
// Usage: const { ref, style } = useReveal();  →  <div ref={ref} style={style}>
const useReveal = (options = {}) => {
  const { delay = 0, y = 32, duration = 0.65 } = options;
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity ${duration}s cubic-bezier(0.2,0.8,0.2,1) ${delay}s, transform ${duration}s cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
  };

  return { ref, style };
};
window.useReveal = useReveal;
