# Rajat: The Key Ball

Portfolio: a hero with a 3D ball of 90 keycaps (CSS 3D + vanilla JS, no WebGL), plus pages for work, experience, skills, about and contact that slide over the ball.

## Run
Serve the folder:  `python -m http.server 8000`  then visit http://localhost:8000
(Serve it rather than double-clicking `index.html`: the contact form needs an http origin.)
It is fully static, so it deploys as-is to Vercel, Netlify or GitHub Pages.

## Pages
Pages are hash routes, so deep links and the back button work with no server config:

| Route | Page |
|---|---|
| `#/work` | all projects |
| `#/work/<slug>` | a case study (`researchgpt`, `receipts-ai`, `uniwell`, `galaxy-morphology`) |
| `#/experience[/<id>]` | timeline; `/fokel` or `/ibm` scrolls to and highlights that entry |
| `#/skills[/<id>]` | skills by field; `/rag`, `/python`… opens that skill |
| `#/about[/process]` | about me and how I build |
| `#/contact` | contact form |

Clicking a key on the ball opens its page (on touch screens, the first tap previews and the second opens).
Which page a key opens is decided by `routeOf()` in `data.js`; give any key a `go: "route"` to override it.
`Esc` goes up one level (case study → all work → ball).

## Contact form
Messages are sent from the browser via Web3Forms, with no mail app involved.
Get a free access key at https://web3forms.com (enter your email; the key arrives in your inbox) and paste it into `WEB3FORMS_KEY` at the top of `data.js`. The key is safe to commit: it can only send mail to you.

Send yourself a test message after deploying.

## Light / dark theme
The sun/moon key in the nav switches themes. The site follows the visitor's system setting until they pick one, then remembers it.
All theme colours are CSS variables at the top of `styles.css` (`:root` for light, `html[data-theme="dark"]` for dark).

## Files
- `index.html`   markup (nav, hero, page container)
- `data.js`      **all content**: contact details, ball keys, projects, experience, skill groups
- `script.js`    the key ball: layout, physics, lighting, interactions
- `pages.js`     router + page templates + contact form
- `styles.css`   nav, hero, keycap buttons, 3D keys
- `pages.css`    page styles
- `logo.svg`     hand-drawn "rajat" wordmark
- `Rajat_Resume.pdf`  linked from the résumé links and the CV key

## Edit
- Email, LinkedIn, GitHub, form key: constants at the top of `data.js`.
- A project's case study: its entry in `PROJECTS` in `data.js` (overview, problem, field, built, flow, stack, metrics).
- Any key's text: find it in `data.js` (each key is one line).
- Fonts load from Fontshare (Clash Display, Cabinet Grotesk) and Google Fonts (Instrument Serif).
