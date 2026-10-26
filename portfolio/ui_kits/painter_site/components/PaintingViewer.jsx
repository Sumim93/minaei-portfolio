// PaintingViewer.jsx — full-screen, zoomable, full-resolution painting viewer
// Shows the web copy instantly, streams the original in the background,
// then swaps it in. Zoom: wheel / pinch / double-click / buttons. Pan: drag.
const PaintingViewer = ({ painting, onClose }) => {
  const p = painting;
  const { isMobile } = useBreakpoint();
  const previewSrc = p.hero || p.image;

  const stageRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const [stage, setStage] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  const [nat, setNat] = React.useState(null);          // aspect source (preview natural size)
  const [fullSrc, setFullSrc] = React.useState(null);  // object URL of the original
  const [fullSize, setFullSize] = React.useState(null);
  const [progress, setProgress] = React.useState({ loaded: 0, total: 0, done: false });
  const [view, setViewState] = React.useState({ s: 1, x: 0, y: 0 });
  const [animate, setAnimate] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [hint, setHint] = React.useState(true);
  // The ref is updated synchronously so rapid wheel/pinch events that land
  // before React re-renders still build on the latest zoom level.
  const viewRef = React.useRef(view);
  const setView = (v) => { viewRef.current = v; setViewState(v); };

  // ── Geometry ──────────────────────────────────────────────────────────
  const top = isMobile ? 64 : 76;
  const bottom = isMobile ? 132 : 112;
  const side = isMobile ? 12 : 48;
  const offY = (top - bottom) / 2;
  const availW = Math.max(100, stage.w - side * 2);
  const availH = Math.max(100, stage.h - top - bottom);
  const aspect = nat ? nat.w / nat.h : 0.75;
  const fitW = Math.min(availW, availH * aspect);
  const fitH = fitW / aspect;
  const maxScale = Math.max(4, fullSize ? (fullSize.w / fitW) * 1.25 : 4);

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const clampView = (v) => {
    const s = clamp(v.s, 1, maxScale);
    if (s <= 1.001) return { s: 1, x: 0, y: 0 };
    const mx = Math.max(0, (fitW * s - stage.w) / 2 + 48);
    const my = Math.max(0, (fitH * s - stage.h) / 2 + 48);
    return { s, x: clamp(v.x, -mx, mx), y: clamp(v.y, -my, my) };
  };
  // Screen point → coordinates relative to the image's resting centre
  const toLocal = (cx, cy) => {
    const r = stageRef.current.getBoundingClientRect();
    return { x: cx - r.left - r.width / 2, y: cy - r.top - r.height / 2 - offY };
  };
  // Zoom to scale `s2` keeping the point (px, py) fixed under the cursor/fingers
  const zoomAt = (s2, px, py, anim) => {
    const v = viewRef.current;
    const s = clamp(s2, 1, maxScale);
    setAnimate(anim);
    setView(clampView({ s, x: px - (px - v.x) * (s / v.s), y: py - (py - v.y) * (s / v.s) }));
  };
  const zoomBy = (f) => { setHint(false); zoomAt(viewRef.current.s * f, 0, -offY, true); };
  const fit = () => { setAnimate(true); setView({ s: 1, x: 0, y: 0 }); };

  // ── Stream the full-resolution original ──────────────────────────────
  React.useEffect(() => {
    let cancelled = false;
    let objectUrl = null;
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(p.image, { signal: ctrl.signal });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const total = Number(res.headers.get("content-length")) || 0;
        let blob;
        if (res.body && total) {
          const reader = res.body.getReader();
          const chunks = [];
          let loaded = 0;
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            loaded += value.length;
            if (!cancelled) setProgress({ loaded, total, done: false });
          }
          blob = new Blob(chunks, { type: res.headers.get("content-type") || "image/jpeg" });
        } else {
          blob = await res.blob();
        }
        objectUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.src = objectUrl;
        await img.decode();
        if (cancelled) return;
        setFullSize({ w: img.naturalWidth, h: img.naturalHeight });
        setFullSrc(objectUrl);
        setProgress({ loaded: blob.size, total: blob.size, done: true });
      } catch (err) {
        if (cancelled) return;
        // Fall back to letting the browser load the original directly
        setFullSrc(p.image);
        setProgress((pr) => ({ ...pr, done: true }));
      }
    })();
    return () => {
      cancelled = true;
      ctrl.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [p.image]);

  // ── Window size, keyboard, scroll lock ───────────────────────────────
  React.useEffect(() => {
    const onResize = () => {
      setStage({ w: window.innerWidth, h: window.innerHeight });
      setAnimate(false);
      setView({ s: 1, x: 0, y: 0 });
    };
    window.addEventListener("resize", onResize);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (closeRef.current) closeRef.current.focus();
    const t = setTimeout(() => setHint(false), 4000);
    return () => {
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") zoomBy(1.5);
      else if (e.key === "-" || e.key === "_") zoomBy(1 / 1.5);
      else if (e.key === "0") fit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Wheel / trackpad pinch (needs a non-passive listener to block page zoom)
  React.useEffect(() => {
    const el = stageRef.current;
    const onWheel = (e) => {
      if (e.target.closest && e.target.closest("[data-ui]")) return;
      e.preventDefault();
      setHint(false);
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const f = Math.exp(-dy * (e.ctrlKey ? 0.01 : 0.0015));
      const pt = toLocal(e.clientX, e.clientY);
      zoomAt(viewRef.current.s * f, pt.x, pt.y, false);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  // ── Pointer gestures: drag to pan, two fingers to pinch, double-tap ──
  const pointers = React.useRef(new Map());
  const gesture = React.useRef(null);
  const press = React.useRef(null);
  const lastTap = React.useRef({ t: 0, x: 0, y: 0 });

  const startGesture = () => {
    const pts = [...pointers.current.values()];
    const v = viewRef.current;
    if (pts.length >= 2) {
      const [a, b] = pts;
      gesture.current = {
        type: "pinch", v0: v,
        d0: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        mid0: toLocal((a.x + b.x) / 2, (a.y + b.y) / 2),
      };
    } else if (pts.length === 1) {
      gesture.current = { type: "pan", v0: v, x0: pts[0].x, y0: pts[0].y };
    } else {
      gesture.current = null;
    }
  };

  const onPointerDown = (e) => {
    if (e.target.closest("[data-ui]")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setHint(false);
    setAnimate(false);
    if (pointers.current.size === 1) press.current = { x: e.clientX, y: e.clientY, t: Date.now(), moved: false };
    startGesture();
    if (viewRef.current.s > 1) setDragging(true);
  };

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;
    if (press.current && Math.hypot(e.clientX - press.current.x, e.clientY - press.current.y) > 6) press.current.moved = true;
    if (g.type === "pan") {
      if (g.v0.s <= 1) return;
      setView(clampView({ s: g.v0.s, x: g.v0.x + e.clientX - g.x0, y: g.v0.y + e.clientY - g.y0 }));
    } else {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = toLocal((a.x + b.x) / 2, (a.y + b.y) / 2);
      const s = clamp(g.v0.s * (d / g.d0), 1, maxScale);
      const ix = (g.mid0.x - g.v0.x) / g.v0.s;
      const iy = (g.mid0.y - g.v0.y) / g.v0.s;
      setView(clampView({ s, x: mid.x - ix * s, y: mid.y - iy * s }));
      if (press.current) press.current.moved = true;
    }
  };

  const endPointer = (e, cancelled) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.delete(e.pointerId);
    const pr = press.current;
    if (!cancelled && pointers.current.size === 0 && pr && !pr.moved && Date.now() - pr.t < 300) {
      const now = Date.now();
      const lt = lastTap.current;
      if (now - lt.t < 320 && Math.hypot(e.clientX - lt.x, e.clientY - lt.y) < 30) {
        const pt = toLocal(e.clientX, e.clientY);
        if (viewRef.current.s > 1.05) fit();
        else zoomAt(Math.min(3, maxScale), pt.x, pt.y, true);
        lastTap.current = { t: 0, x: 0, y: 0 };
      } else {
        lastTap.current = { t: now, x: e.clientX, y: e.clientY };
      }
    }
    if (pointers.current.size === 0) { press.current = null; setDragging(false); }
    startGesture();
  };

  // ── UI ────────────────────────────────────────────────────────────────
  const zoomed = view.s > 1.001;
  const cursor = zoomed ? (dragging ? "grabbing" : "grab") : "zoom-in";
  const mb = (n) => (n / 1048576).toFixed(1);
  const pct = progress.total ? Math.round((progress.loaded / progress.total) * 100) : 0;

  const ctrlBtn = {
    width: isMobile ? 44 : 40, height: isMobile ? 44 : 40,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    background: "transparent", border: 0, borderRadius: 999,
    color: "var(--dark-on-1)", cursor: "pointer", fontSize: 20, lineHeight: 1,
    fontFamily: "var(--font-ui)",
  };
  const pill = {
    background: "rgba(30,27,24,0.88)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(240,230,210,0.14)", borderRadius: 999,
  };

  return (
    <div
      ref={stageRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title} — full resolution viewer`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => endPointer(e, false)}
      onPointerCancel={(e) => endPointer(e, true)}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "#0e0c0b", overflow: "hidden",
        touchAction: "none", userSelect: "none", WebkitUserSelect: "none",
        cursor,
      }}
    >
      {/* The painting */}
      <img
        src={fullSrc || previewSrc}
        alt={p.title}
        draggable={false}
        onLoad={(e) => {
          const t = e.currentTarget;
          if (!nat) setNat({ w: t.naturalWidth, h: t.naturalHeight });
          if (fullSrc && !fullSize) setFullSize({ w: t.naturalWidth, h: t.naturalHeight });
        }}
        style={{
          position: "absolute", left: "50%", top: "50%",
          width: fitW, height: fitH, maxWidth: "none",
          transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y + offY}px) scale(${view.s})`,
          transformOrigin: "center",
          transition: animate ? "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)" : "none",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          opacity: nat ? 1 : 0,
          willChange: "transform",
          pointerEvents: "none",
        }}
      />

      {/* Top bar — title + close */}
      <div data-ui style={{
        position: "absolute", top: 0, left: 0, right: 0, height: top,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        padding: `0 ${isMobile ? 16 : 32}px`,
        background: "linear-gradient(rgba(14,12,11,0.92), rgba(14,12,11,0))",
        color: "var(--dark-on-1)", cursor: "default",
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
            fontSize: isMobile ? 19 : 24, letterSpacing: "-0.01em", lineHeight: 1.1,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{p.title}</div>
          <div style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: isMobile ? 12 : 14, color: "var(--dark-on-2)", marginTop: 3 }}>
            {p.year} · {p.medium} · {p.dimensions}
          </div>
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close viewer"
          style={{
            flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--dark-on-1)", background: "transparent",
            border: "1px solid rgba(240,230,210,0.35)", borderRadius: 999,
            padding: isMobile ? "10px 14px" : "9px 18px", cursor: "pointer",
          }}
        >
          {!isMobile && "Close"}<span style={{ fontSize: 15, lineHeight: 1 }}>✕</span>
        </button>
      </div>

      {/* Bottom — quality badge, hint, zoom controls */}
      <div data-ui style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: `0 16px ${isMobile ? 20 : 24}px`,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        background: "linear-gradient(rgba(14,12,11,0), rgba(14,12,11,0.85) 45%)",
        paddingTop: 28, cursor: "default", pointerEvents: "none",
      }}>
        {/* Quality badge */}
        <div style={{
          ...pill, pointerEvents: "auto",
          padding: "8px 16px", minWidth: isMobile ? 0 : 280,
          fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          color: progress.done ? "var(--pigment-ochre)" : "var(--dark-on-2)",
          textAlign: "center",
        }}>
          {progress.done ? (
            <span>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "var(--pigment-ochre)", marginRight: 8, verticalAlign: "middle" }} />
              Full resolution{fullSize ? ` · ${fullSize.w} × ${fullSize.h} px` : ""}
            </span>
          ) : (
            <span style={{ display: "block" }}>
              Loading full resolution{progress.total ? ` · ${mb(progress.loaded)} / ${mb(progress.total)} MB` : "…"}
              <span style={{ display: "block", height: 2, marginTop: 7, background: "rgba(240,230,210,0.15)", borderRadius: 2, overflow: "hidden" }}>
                <span style={{
                  display: "block", height: "100%", background: "var(--pigment-ochre)",
                  width: progress.total ? `${pct}%` : "30%",
                  transition: "width 0.2s linear",
                }} />
              </span>
            </span>
          )}
        </div>

        {/* Zoom controls */}
        <div style={{ ...pill, pointerEvents: "auto", display: "flex", alignItems: "center", padding: 4, gap: 2 }}>
          <button aria-label="Zoom out" onClick={() => zoomBy(1 / 1.6)} disabled={!zoomed}
            style={{ ...ctrlBtn, opacity: zoomed ? 1 : 0.35, cursor: zoomed ? "pointer" : "default" }}>−</button>
          <div style={{
            minWidth: 58, textAlign: "center", fontFamily: "var(--font-ui)", fontSize: 11,
            letterSpacing: "0.12em", color: "var(--dark-on-1)",
          }}>{zoomed ? `${Math.round(view.s * 100)}%` : "FIT"}</div>
          <button aria-label="Zoom in" onClick={() => zoomBy(1.6)} disabled={view.s >= maxScale - 0.01}
            style={{ ...ctrlBtn, opacity: view.s >= maxScale - 0.01 ? 0.35 : 1 }}>+</button>
          <span style={{ width: 1, height: 22, background: "rgba(240,230,210,0.18)", margin: "0 4px" }} />
          <button aria-label="Fit to screen" onClick={fit} disabled={!zoomed}
            style={{ ...ctrlBtn, width: "auto", padding: "0 14px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: zoomed ? 1 : 0.35, cursor: zoomed ? "pointer" : "default" }}>
            Reset
          </button>
        </div>
      </div>

      {/* First-open hint */}
      <div style={{
        position: "absolute", left: "50%", top: top + 12, transform: "translateX(-50%)",
        ...pill, padding: "8px 16px", pointerEvents: "none",
        fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
        color: "var(--dark-on-1)", whiteSpace: "nowrap",
        opacity: hint ? 1 : 0, transition: "opacity 0.6s ease",
      }}>
        {isMobile ? "Pinch or double-tap to zoom" : "Scroll or double-click to zoom · drag to explore"}
      </div>
    </div>
  );
};

window.PaintingViewer = PaintingViewer;
