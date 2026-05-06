// About.jsx — editorial bio + photo layout
const { motion } = window.FramerMotion;

const About = () => {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <div style={{ background: "var(--paper-1)" }}>

      {/* Bio — image left, text right */}
      <section style={{
        padding: isMobile ? "64px 20px 64px" : "96px 48px 96px",
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "5fr 7fr",
        gap: isMobile ? 48 : 96,
        alignItems: "center",
      }}>
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Frame src="assets/Profile.jpg" alt="Somaye Minaei" matted={true}/>
          <div style={{
            fontFamily: "'Lora', serif", fontStyle: "italic",
            fontSize: 14, color: "var(--fg-muted)",
            marginTop: 16, textAlign: "center", letterSpacing: "0.02em",
          }}>
            Somaye Minaei — painter.
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div style={{
            fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.3em",
            textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 32,
          }}>The artist</div>

          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: isMobile ? 20 : 26,
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "var(--ink-1)",
            margin: 0,
          }}>
            I'm Somaye Minaei, a self-taught oil painter, born in Iran and now living in Switzerland. I learned by looking closely and going back to the canvas again and again.
          </p>

          <div style={{
            width: 40, height: 1,
            background: "var(--pigment-sienna)",
            margin: isMobile ? "32px 0" : "40px 0",
            opacity: 0.6,
          }}/>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.75,
            color: "var(--ink-2)",
            margin: 0,
            maxWidth: 520,
          }}>
            I work mostly in portraits — faces take time, and that's what I like about them. Between portraits, I paint landscapes and still lifes from walks and travels. Light is what connects them all.
          </p>

          <div style={{ marginTop: isMobile ? 36 : 48 }}>
            <div style={{
              fontFamily: "'Caveat', cursive",
              fontSize: isMobile ? 34 : 42,
              color: "var(--pigment-sienna)",
              lineHeight: 1,
            }}>S. Minaei</div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

window.About = About;
