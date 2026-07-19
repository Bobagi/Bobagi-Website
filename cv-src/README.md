# CV sources

`cv-en.html` / `cv-pt.html` are the sources for the public CV PDFs served at
`/cv/gustavo-antonio-perin-cv-{en,pt}.pdf` (files live in `public/cv/`).

Regenerate after editing (chrome-headless-shell path may vary):

```bash
CHS=/root/.cache/puppeteer/chrome-headless-shell/*/chrome-headless-shell-linux64/chrome-headless-shell
$CHS --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=public/cv/gustavo-antonio-perin-cv-en.pdf cv-src/cv-en.html
# same for -pt; then `npm run build` (or cp into dist/cv/) to publish.
```

Keep it ONE page: content must stay under 297mm; the body `zoom` (0.975 EN /
0.95 PT) is the final fit knob — check with `pdfinfo | grep Pages`.
Privacy: the PDFs are public — no phone number or street address in them.
