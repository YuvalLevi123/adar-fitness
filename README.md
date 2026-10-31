# Adar Fitness — landing page

Single-page Hebrew (RTL) site for Adar Fitness. Plain HTML + CSS + a little JavaScript — no build step.

```
index.html   page content
styles.css   all styling (colors and sizes are variables at the top)
main.js      sticky header, mobile menu, mobile WhatsApp bar, scroll fade-ins
assets/      logo, favicon, share image, optimized photos
```

## Preview locally

Open `index.html` in a browser, or run a tiny server from this folder:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Before going live — replace the placeholders

Search `index.html` for `TODO` to find each one.

| What | Where |
|------|-------|
| WhatsApp number | Find & replace `972500000000` (all buttons use it) |
| Instagram link | Footer, `href="#"` next to the Instagram icon |
| Numbers (10+, 20–70, ★ 5.0) | Stat tiles under the hero |
| "מאמנת מוסמכת" | About section — keep only if true |
| Reviews | Reviews section — real quotes, names, how long they've trained |
| FAQ answers + studio address | FAQ section |

The WhatsApp message text is URL-encoded inside each link. To change it, encode the new text (e.g. with `encodeURIComponent` in a browser console) and replace the `?text=...` part.

## Hosting

Live at **https://adarfitness.github.io** — GitHub Pages, served from the `main` branch of
the `adarfitness/adarfitness.github.io` repository. Every push to `main` republishes the site within a minute or two.

If the address ever changes (e.g. a custom domain), update `canonical`, `og:url` and `og:image` in `<head>`.
