# its-vv.github.io

Personal homepage, served by GitHub Pages at <https://its-vv.github.io>.

Plain HTML + CSS, no build step.

## Editing

- **Content**: `index.html` — each section is marked with a `<!-- ==== SECTION ==== -->` comment.
- **Photo**: put your photo at `assets/photo.jpg` and change the `<img class="avatar">` `src` in `index.html`.
- **CV**: drop a PDF at `assets/cv.pdf` and add a link in the header. Strip phone number and GPA first; this repo is public.
- **Colors / fonts**: CSS variables at the top of `assets/style.css`.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish

```bash
git add -A && git commit -m "Update homepage" && git push
```

GitHub Pages rebuilds automatically within about a minute.
