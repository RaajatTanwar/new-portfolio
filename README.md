# Rajat: The Key Ball

One-page portfolio: a navigation bar and one hero with a 3D ball of 90 keycaps (CSS 3D + vanilla JS, no WebGL).

## Run
Open `index.html`, or serve the folder:  `python3 -m http.server 8000`  then visit http://localhost:8000
It is fully static, so it deploys as-is to Vercel, Netlify or GitHub Pages.

## Files
- `index.html`   markup (nav + hero)
- `styles.css`   look, layout, keycap buttons, 3D keys
- `script.js`    key content (LETTERS / CHECK / OTHER), ball physics, lighting, interactions
- `logo.svg`     hand-drawn "rajat" wordmark (swap for your own logo.png if you like)
- `Rajat_Resume.pdf`  linked from the "Download résumé" link and the CV key

## Edit
- Email, LinkedIn, GitHub: the constants at the top of `script.js` (and the `mailto:` in `index.html`).
- Any key's text: find it in `script.js` (each key is one line).
- Fonts load from Fontshare (Clash Display, Cabinet Grotesk) and Google Fonts (Instrument Serif).
