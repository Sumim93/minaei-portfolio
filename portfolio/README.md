# Painter Portfolio — Design System

A design system for a painter's personal portfolio website, built to showcase oil paintings (portraits and landscapes) in a **romantic, painterly, museum-intimate** register. The system favors quiet editorial layouts, warm paper neutrals, ornamental serif typography, and soft painterly textures — so the art, not the interface, does the talking.

> *"A portfolio should feel like a monograph, not an app."*

---

## At a glance

| | |
|---|---|
| **Artist (placeholder)** | S. Minaci — replace with your name in the logo lockup |
| **Medium** | Oil on canvas — portraits and landscapes |
| **Aesthetic** | Romantic / painterly — soft washes, ornamental serifs, moody |
| **Voice** | First-person, warm, curatorial ("I paint to…") |
| **Type** | Fraunces (display + body, variable), Cormorant Garamond (secondary serif), Inter (UI labels), Caveat (signatures) |
| **Color anchor** | Warm cream paper + umber ink + pigment accents pulled from the oil palette |

---

## Sources used to build this system

There was **no existing codebase, Figma, or style guide** provided — the system was designed from scratch to match the artist's answered preferences and the single painting reference:

- **Reference painting** — `uploads/assets_upload-1777020042138.jpg` — *"Statuary Bust with Veil"* (5788 × 7237 oil on canvas, signed *S. Minaci*). A grisaille-toned classical-bust portrait. Downscaled crops live in `assets/paintings/`.
- **Answered preferences** (from the intake form): oil / portraits + landscapes / romantic-painterly direction / editorial modern serif / first-person warm voice / 3 homepage variations / pages needed = home, gallery, painting detail, about, series, contact.

> Because this system is inferred rather than extracted, it is best treated as a **starting direction**. The "Caveats & asks" section at the bottom of this README flags what you should review.

---

## Repository index

```
.
├── README.md                   ← you are here
├── SKILL.md                    ← Agent-SKILL compatible entry point
├── colors_and_type.css         ← CSS variables: color, type, spacing, motion
├── assets/
│   ├── paintings/              ← painting reference + crops
│   ├── textures/               ← paper, canvas, moody wash backgrounds
│   └── logo/                   ← wordmark & monogram SVGs
├── fonts/                      ← local font notes (we use Google Fonts CDN)
├── preview/                    ← preview cards for the Design System tab
└── ui_kits/
    └── painter_site/
        ├── README.md
        ├── index.html          ← interactive click-through prototype
        ├── Home.jsx            ← 3 home-page variations (Editorial, Monograph, Gallery-wall)
        ├── Gallery.jsx         ← works index
        ├── PaintingDetail.jsx  ← big image + notes + technical info
        ├── About.jsx           ← editorial bio & portrait layout
        ├── Contact.jsx         ← commissions & inquiry
        └── components/         ← Header, Footer, Frame, PaintingCard, Button, etc.
```

---

## Content fundamentals

The writing on a painter's site should feel **personal, quiet, and observed** — like a catalogue essay, not marketing copy. Readers arrive wanting to understand the work; prose should invite them closer without over-explaining.

### Voice & point of view
- **First-person, singular, warm.** The artist is present in the writing. "I paint slowly. I start with the bones of the composition and let warmth enter only later."
- **Avoid the marketing *we*.** Never "we offer commissions" — always "I take commissions."
- **Curatorial third-person is reserved for press** ("In Minaci's recent portraits…"), never the artist's own site.

### Tone
- **Observed, not hyped.** No "stunning," "breathtaking," "one-of-a-kind." Instead: specific, sensory, plain. *"The underpainting is cold — almost blue. Flesh tones are built up in glazes over three or four sittings."*
- **Slow cadence.** Longer sentences. Semicolons and em-dashes are welcome. Short sentences are for emphasis at the end of a thought.
- **Specific over general.** Not *"I use classical techniques"* — *"I grind my own ivory black and build shadows in glazes of raw umber."*

### Casing & rhythm
- **Sentence case everywhere** — titles, nav, buttons. Title Case and ALL CAPS both feel corporate. The one exception is small tracked-out **LABELS** (e.g. eyebrow text, nav in some layouts), which are uppercase with wide letter-spacing as a typographic device, not a casing rule.
- **Painting titles get italics**, always. *Still Life with Quince, 2024.*
- **Years are bare** (2024), never "copyright 2024."
- **Numbers as digits** in technical info (18 × 24 in), **spelled out** in prose ("over the past eight years").

### Emoji & special characters
- **No emoji.** Ever. This is a formal-ish editorial register.
- **Typographic characters are encouraged** — `—` (em dash), `–` (en dash, for ranges), `·` (middot as separator), `"curly quotes"`, `'proper apostrophes'`, `№`, small caps where helpful.
- Ornamental dividers use `·   ·   ·` or a single thin rule, never emoji or icons.

### Vibe examples

> **Homepage lead, yes:**
> *"I paint to look more slowly. These are oils — some recent, some from the past eight years — mostly portraits, with a few landscapes made during long walks."*

> **Homepage lead, no:**
> *"Welcome! ✨ I create stunning, one-of-a-kind oil paintings that capture the beauty of life's most cherished moments. Let's connect!"*

> **Painting caption, yes:**
> *Bust with Veil, 2024. Oil on linen, 18 × 24 in. The sitter is a plaster cast I inherited from my grandmother; I painted her over six sittings across October.*

> **Painting caption, no:**
> *"Beautiful portrait! Available for purchase. DM for price."*

### Button & CTA copy
- Verbs in sentence case. *View the series · Inquire about this piece · Read the note · Write to me.*
- Avoid "Learn more," "Get started," "Click here." Replace with what you actually do next: *"Read the full note," "See this in the studio," "View related works."*

---

## Visual foundations

A single sentence captures the aesthetic: **warm paper, ink, and pigment, arranged quietly.**

### Color

- **Neutrals are warm, never cool grey.** Backgrounds sit on a cream / linen / kraft / aged-paper scale (`--paper-0` through `--paper-4`). Text is warm umber (`--ink-1` through `--ink-5`), never black.
- **Accents come from the oil palette** — burnt sienna, yellow ochre, raw umber, prussian lapis, olive sage, rose madder, alabaster. Use one pigment per screen as a quiet accent (e.g. a single link color, a frame shadow warmth) — never a rainbow.
- **Dark mode is a "moody" mode, not a negation.** When used (hero sections, gallery lightbox), it is warm near-black (`--dark-1: #14110d`) with alabaster type (`--dark-on-1: #f0e6d2`), not pure `#000`/`#fff`.
- **No gradients** in UI chrome. Gradients exist only as extremely subtle vignettes on images, or as atmospheric wash backgrounds behind imagery.

### Type

- **Fraunces** is the workhorse — a variable serif with optical sizing. Display sizes use `"opsz" 144` and `"SOFT" 100` for an ornamental feel; body sizes use default. Light (300) and Regular (400) only — never bold display.
- **Cormorant Garamond** is the secondary serif for long prose and italic pull-quotes.
- **Inter** is used *only* for micro-labels, form fields, and the occasional navigation — when an interface element needs to step out of the editorial register to be read at 11–13 px.
- **Caveat** is the signature/handwritten accent — used once or twice per site (a signature under the artist photo, a handwritten caption). Never for long text.
- **Italic is a feature, not an emphasis.** Painting titles, pull-quotes, and leads are italic by default.
- **Letter-spacing is negative on display type** (`-0.035em` on the hero) and wide on small caps labels (`0.16em`–`0.24em`).

### Backgrounds & texture
- **Page default is `--paper-1`** — warm cream. Subtle paper-grain textures live in `assets/textures/` and may be applied at 10–20% opacity on sections that need warmth.
- **Full-bleed imagery is used sparingly but dramatically** — the home hero, section dividers between chapters of the gallery, the About page portrait.
- **Hand-drawn illustrations: none.** The artwork itself is the illustration.
- **Repeating patterns: none** (save the optional subtle paper grain).
- **Gradients: only as atmospheric image overlays or gallery-wall vignettes.**

### Spacing & layout
- **Layouts breathe.** Minimum section padding on desktop is `--sp-9` (96 px); hero sections use `--sp-10`–`--sp-11` (128–192 px).
- **Content max-widths are deliberately narrow.** Reading prose caps at `--measure-reading` (44 rem / ~700 px). Gallery grids cap at `--measure-wide` (88 rem / ~1400 px). Full-bleed is a conscious break.
- **Grids are asymmetric.** Paintings live on a 12-column grid but rarely span symmetrically — a portrait takes 7 columns and sits against a 4-column caption block, offset from center. See `PaintingDetail.jsx`.
- **Fixed elements:** the top header is fixed only on the home page and fades to transparent over the hero; on interior pages it's static. There is no fixed footer. A "Next work" pagination at the bottom of painting pages is inline, not sticky.

### Borders & shadows
- **Borders are hairlines in `--border` (warm taupe), never black.**
- **Shadows are warm and soft** — `--shadow-2` / `--shadow-3` use `rgba(74, 52, 36, …)`, never pure black. Painting "frame shadows" (`--shadow-frame`) combine a soft drop with a warm inset hairline to suggest matted framing.
- **Cards are mostly frameless.** A painting "card" is an image + caption with no border and only a faint shadow; the image's own edge does the framing.

### Radii
- **Corners are square.** `--r-none: 0` is default. `--r-md: 6px` appears only on buttons and form fields. Pills (`--r-pill`) are reserved for filter chips in the gallery and meta tags (year, medium).

### Motion
- **Slow, observed.** Default transitions are `--dur-med` (360 ms) with `--ease-out`. Reveals on scroll use `--dur-reveal` (1200 ms).
- **Fades over translates.** Image reveals are opacity + slight blur-to-focus, not slides.
- **No bounces, no springs.** The system is calm.
- **Hover states: opacity and underline.** Images dim to `0.92` opacity on hover; links gain an underline. Buttons do not shift, shrink, or bounce — they warm up slightly (ochre underline, sienna text).
- **Press states: slight opacity dip** (`0.85`) and a `200ms` return.

### Cards & framing
- **A painting is not a card.** It sits directly on the page — image, title (italic), year, medium, dimensions, optional short note — with generous vertical whitespace between it and the next work.
- When a container *is* needed (a pull-out quote, a commission enquiry box), it uses `--paper-2` background, no border, soft `--shadow-2`, and `--r-sm` radius.

### Transparency & blur
- **Sparingly.** The home hero has a sticky nav that goes from fully transparent (over the painting) to a blurred `rgba(251, 247, 239, 0.85)` with `backdrop-filter: blur(12px)` after scroll. That's the only blur in the system.

### Imagery tone
- **Paintings are shown as they are** — no cropping, no filters, no artificial warming. The color accuracy of the reproduction is a point of pride.
- **Artist photos** (About page) are **warm editorial** — natural light, paper-white walls, occasionally a wash of oil paint visible behind the figure. They may be lightly toned to sit on the paper background but never duotoned.

---

## Iconography

**The system is deliberately nearly icon-free.** A painter's portfolio is a reading experience; icons introduce a UI register that fights the editorial tone.

### Rules
- **No icons inside prose or headers.**
- **No icons as bullets, callouts, or decoration.**
- **Typographic characters replace most icons:** middot `·`, em-dash `—`, arrow glyph `→`, and the occasional `№`.
- **Where a functional icon is unavoidable** (close-X for lightbox, arrow for next/prev, hamburger for mobile nav), we use a handful of **thin-stroke custom SVGs at 1.25px stroke weight**, stored as `currentColor` inline SVG in the component files. These live in `ui_kits/painter_site/components/Icon.jsx` — a tiny set: `Close`, `ArrowLeft`, `ArrowRight`, `ZoomIn`, `Menu`, `Instagram`, `Mail`.
- **No emoji. No unicode symbols as icons** (no ⭐, no ♥, no 🎨).
- **Lucide / Heroicons etc. are not used** — they would over-UI the design. The bespoke set of ~7 icons is sufficient.

The painter's hand-drawn monogram in the logo counts as an "icon" in brand terms but is not listed with functional icons.

---

## UI kits

- **`ui_kits/painter_site/`** — the full click-through prototype covering all six requested pages (home, gallery, painting detail, about, series, contact). Three homepage variations are exposed as switchable options inside the index. Components are factored into `components/` for reuse.

---

## Caveats & asks

I inferred a lot here; please review and tell me what to adjust.

1. **Fonts are served from Google Fonts (CDN).** I have not downloaded TTFs — Fraunces, Cormorant Garamond, Inter, and Caveat are loaded via `<link>` tags in the UI kit. If you want them self-hosted, I can pull them into `fonts/` — tell me.
2. **The artist name is a placeholder.** The painting is signed "S. Minaci" so I used that in the logo and mocks. **If that is you, confirm. If not, tell me your name** and I'll swap.
3. **There is only one real painting reference.** The gallery mocks repeat variations/crops of the same piece to give a sense of rhythm. Drop more painting images into `assets/paintings/` (any size, any format — I'll handle resizing) and I'll repopulate.
4. **No artist photos were provided.** The About page uses a warm paper wash as a portrait placeholder. Upload 2–3 editorial portraits and I'll drop them in.
5. **Three homepage variations** are wired as a switcher in the UI kit index — *Editorial, Monograph, Gallery-wall*. All three live on the same system but diverge in rhythm and hero treatment. Pick a favorite and I'll deepen it and retire the others.
6. **Tone samples are fictional.** I wrote representative copy; please send me 1–2 paragraphs of your own writing so I can calibrate voice more precisely.
7. **No icon set** beyond the 7 bespoke SVGs. If you'd rather use Lucide or Heroicons, say so and I'll swap.

**👉 Pick a direction, flag what feels off, and I'll tighten the system toward the one you like.**
