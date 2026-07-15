# Peekaboo animation (self-contained)

The exact Sage Intacct product-tour motion mock — bars grow left→right, the donut
draws in radially, leader lines + labels fade in, then a centered form. This folder
has **everything it needs**; nothing external.

```
peekaboo-animation/
├── index.html        # the animation (open this)
├── lib/motion.js     # GSAP motion presets
├── vendor/gsap.min.js
└── images/           # Sage brand fonts (.otf/.ttf)
```

## Run it
Open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000   # then visit http://localhost:8000
```
(Fonts need to be served over http:// to load, so use the server rather than a file:// path.)

## Reuse in another project
Copy this whole `peekaboo-animation/` folder in, keeping the internal structure
(`index.html` expects `lib/`, `vendor/`, and `images/` as siblings). Then either:
- **Standalone page** — link/iframe `index.html`, or
- **Embed** — copy the `.frame` markup + its `<style>` + the three `<script>` tags
  into your page. Keep the relative paths to `vendor/gsap.min.js`, `lib/motion.js`,
  and `images/…` fonts valid.

### Prompt for Claude Code in the other project
> I've added a `peekaboo-animation/` folder — a self-contained GSAP + SVG animation
> (index.html + lib/motion.js + vendor/gsap.min.js + images/ fonts). Wire it into
> [this page / this route] as-is: either iframe `peekaboo-animation/index.html`, or
> inline its `.frame` element with its `<style>` and the three `<script>` tags,
> keeping the relative paths to `lib/`, `vendor/`, and `images/` intact. Don't
> rewrite the animation — reuse it exactly.

## Tuning (optional)
All timing lives in the timeline at the bottom of `index.html` (the `tl.call(...)`
offsets) and the tokens in `lib/motion.js` (`DURATIONS`, `EASINGS`, `STAGGERS`).
