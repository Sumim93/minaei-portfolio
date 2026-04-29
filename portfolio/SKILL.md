# {brand}-design

---
name: painter-portfolio-design
description: Use this skill to generate well-branded interfaces and assets for a painter's personal portfolio (oil paintings, portraits and landscapes, romantic-painterly editorial register), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill first, and explore the other available files:

- `colors_and_type.css` — CSS variables for color, typography, spacing, motion. Use these tokens everywhere.
- `assets/paintings/` — painting reference and crops. Use these in mocks; do not generate fake paintings.
- `assets/textures/` — paper, canvas, moody-wash backgrounds. Apply at 10–20% opacity for warmth.
- `assets/logo/` — wordmark and monogram SVGs. Prefer the monogram for favicons and tight corners.
- `ui_kits/painter_site/` — click-through prototype + factored React components. Copy components (Frame, PaintingCard, Header, Footer, Button, Icon) rather than rebuilding them.
- `preview/` — design system preview cards documenting tokens and usage.

**Core rules:**
- Warm paper neutrals (`--paper-*`) + warm umber ink (`--ink-*`) + one pigment accent per screen. Never cool greys, never pure black/white.
- Type is Fraunces (display + body) and Cormorant Garamond (italic prose), with Inter only for micro-labels and Caveat only for signatures.
- Sentence case everywhere except tracked-out uppercase labels (`--ls-label`).
- No emoji. No icons in prose. No rounded cards with colored left-borders. No bluish-purple gradients.
- Square corners by default; `--r-md` only on buttons and inputs.
- Motion is slow (`--dur-med` or `--dur-slow`), fades over translates, no bounces.
- Painting titles in *italics* with year and medium inline: *Bust with Veil, 2024. Oil on linen, 18 × 24 in.*

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out of this skill's folders and create static HTML files for the user to view. If working on production code, copy assets and apply the rules here to become an expert in designing for this painter's brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience, page type, whether they want variations), and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.
