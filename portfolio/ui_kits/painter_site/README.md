# Painter site — UI kit

Interactive click-through prototype for the painter's portfolio. Open `index.html`.

### Files
- `index.html` — app shell + route switching + Home variation picker
- `Home.jsx` — three homepage variants: *Editorial* · *Monograph* · *Gallery-wall*
- `Gallery.jsx` — works index with subject filter
- `PaintingDetail.jsx` — big image, note, brushwork detail, technical info, lightbox
- `About.jsx` — editorial bio, chronology, photo layout placeholder
- `Series.jsx` — three series with summaries and representative works
- `Contact.jsx` — commission/inquiry form (with success state)
- `components/`
  - `Header.jsx` · `Footer.jsx` · `Button.jsx` · `Frame.jsx` · `PaintingCard` (inside Frame.jsx) · `Icon.jsx` · `data.js`

### Flows you can try
1. Land on home → pick a home variation from the bottom switcher
2. Click any painting → painting detail → click the image → lightbox → Esc/click to close
3. Works → filter by Portrait / Landscape / Still life
4. Painting detail → "Inquire" prefills the contact form
5. Series → each series previews its first three works

### What's mocked vs real
- Router is in-memory state, not URL-based.
- Form submit is a fake success state.
- Only one real painting reference; crops are reused with slight tones to suggest variety.
