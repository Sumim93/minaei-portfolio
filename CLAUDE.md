# Sumim — painter portfolio (sumim.art)

Portfolio site for Somaye "Sumi" Minaei, self-taught oil painter based in Switzerland.
`START HERE.md` is the owner-facing guide; keep it in sync if the layout changes.

## Layout
- `portfolio/` — the deployed site (Vercel Root Directory). App lives in
  `portfolio/ui_kits/painter_site/`.
- `Originals/` — master files, **gitignored** (repo is public). `Paintings/` holds
  full-res photos named `NN - Title (Year).jpg`; also `Series Photos/` and
  `Studio - Now in the Works/`.

## Stack
- Static React 18 via CDN + Babel standalone, no bundler, no npm install. Each
  `.jsx` is a `<script type="text/babel">` in `index.html` and exports via `window.X`.
- `<base href="/ui_kits/painter_site/">` — asset paths in code are relative to that.
- Clean URLs (`/works`, `/about`, `/series`, `/contact`, `/painting/:slug`) via
  `history.pushState`; `portfolio/vercel.json` rewrites them to `index.html`.
- Painting data: `components/data.js` (`PAINTINGS`). Never call hooks inside
  `.map()` (caused blank pages before) — use CSS keyframes for per-item animation.
- Full-screen zoom viewer: `components/PaintingViewer.jsx` (streams `p.image`).

## Image conventions (assets/ under painter_site)
| Folder | Use | Spec |
|---|---|---|
| `paintings/{slug}.jpg` | full original — viewer only | as supplied |
| `paintings-hero/` | homepage, painting page | 1400px wide, JPEG q85 |
| `paintings-thumb/` | Works grid | 700px wide, q82 |
| `paintings-detail/{slug}-1..3.jpg` | brushwork close-ups | 900×900 crop from original, q88 — pick face / hands-or-jewellery / fabric; check each crop visually |
| `series/` full, `series-web/` grid (900px, q82), `series-thumb/` homepage strip |

No ImageMagick/Python on the machine: resize/crop with PowerShell `System.Drawing`
(save to a temp file then move — saving over an open file fails silently).
Never load full originals in page layouts; only the viewer/lightboxes may.

## Adding a painting
Copy the original into `Originals/Paintings/` and `assets/paintings/{slug}.jpg`, make
hero/thumb/3 details, add an entry at the **top** of `PAINTINGS` (next `number`,
`subject` one of `Portrait Studies` / `Landscape` / `Still Life`). Confirm year and
size with the owner — don't guess silently.

## Copy voice
- Painting notes: poetic, third-person/observational, **no "I"**, two sentences max.
- Owner prefers short copy; trims when asked.

## Deploy
- GitHub `Sumim93/minaei-portfolio`, branch `master`. Push → Vercel auto-deploys
  production in ~30–60 s. Check: `gh api repos/Sumim93/minaei-portfolio/commits/<sha>/status`.
- Before pushing: `gh auth switch -h github.com -u Sumim93` (a stale `shayanps` account
  may be active). No Vercel CLI needed.
- Local preview needs a server that mimics the rewrites (plain file server breaks
  `/painting/...` URLs); serve `portfolio/` and map the clean URLs to
  `/ui_kits/painter_site/index.html`.
