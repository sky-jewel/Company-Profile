# Sky Jewel — Company Profile Website

A premium, bilingual (EN/AR), single-page interactive company profile.

## Quick Start

1. **Drop your brand assets** into the `assets/` folder:
   - `assets/logo.png` — the Sky Jewel teal logo you uploaded
   - `assets/pattern.png` — the Arabic-letters teal pattern you uploaded
2. **Drop your Redex Pro font files** into `assets/fonts/` (rename to match):
   - `RedexPro-Light.woff2`
   - `RedexPro-Regular.woff2`  *(used as "mid")*
   - `RedexPro-Bold.woff2`
   *(If you only have OTF/TTF, also acceptable — update `@font-face` in `styles.css` accordingly.)*
3. Open `index.html` in a browser, or run any static server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

## Brand System Used

| Token | Value |
|---|---|
| Primary (Teal) | `#38adad` |
| Accent Orange | `#FE582A` |
| Black / Ink | `#000000` |
| Cream / Background | `#fcf7f5` |
| Indigo | `#3F33D3` |
| Font | Redex Pro (Light 300 / Regular 500 / Bold 700) |
| Arabic fallback | Tajawal (loaded from Google Fonts) |

## Features

- Hero with animated drifting Arabic-letter pattern, soft glows and CTA
- Sticky blurred navigation + scroll progress bar
- Fade/slide reveals on every section
- Animated number counters
- **Horizontal scrolling services rail** (11 service cards, A–K)
- Vision / Mission / Positioning split cards
- Saudi Heritage section (dark, with brand pattern)
- Animated process timeline (6 steps)
- Industries pill grid + auto-scrolling marquee strip
- Asymmetric image gallery with hover reveal captions
- Contact section with social, email, phone & CTA
- **EN ⇄ AR language toggle** with full RTL switch (persists in localStorage)
- Fully responsive (desktop / tablet / mobile)
- Reduced-motion aware

## Files

```
sky-jewel-profile/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── logo.png        ← drop here
    ├── pattern.png     ← drop here
    └── fonts/
        ├── RedexPro-Light.woff2
        ├── RedexPro-Regular.woff2
        └── RedexPro-Bold.woff2
```

## Replacing the Gallery Placeholders

The gallery currently uses gradient + pattern placeholder tiles (labelled by service).
To use real photos, replace each `.gallery__ph` div in `index.html` with:
```html
<img src="assets/gallery/your-photo.jpg" alt="..." />
```
and add corresponding CSS to make the `<img>` cover the figure.

## Replacing Contact Info

Edit the `#contact` section in `index.html`:
- Email: `hello@skyjewel.sa`
- Phone: `+966 5XX XXX XXX`
- Location, social links

---
© Sky Jewel
