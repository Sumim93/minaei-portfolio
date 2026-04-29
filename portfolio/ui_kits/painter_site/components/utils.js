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
