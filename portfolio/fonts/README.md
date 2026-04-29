# Fonts

This design system uses **Google Fonts CDN** for all typefaces. No TTFs are bundled here yet.

| Family | Role | Weights used |
|---|---|---|
| **Fraunces** | Display + body serif (variable; opsz + SOFT axes) | 300, 400, 500 (+ italic) |
| **Cormorant Garamond** | Secondary serif for italic prose & pull-quotes | 300, 400 italic |
| **Inter** | UI micro-labels, form fields, navigation | 400, 500, 600 |
| **Caveat** | Handwritten signature accent (used sparingly) | 400, 600 |

### How the UI kit loads them

In `ui_kits/painter_site/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..600,0..100;1,9..144,300..600,0..100&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@400;500;600&family=Caveat:wght@400;600&display=swap" rel="stylesheet">
```

### If you want them self-hosted

Ask and I'll pull the TTF/WOFF2 files into this folder and rewrite `colors_and_type.css` with `@font-face` declarations. None of the rest of the system needs to change.
