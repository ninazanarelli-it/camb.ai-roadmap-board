# Product Roadmap Board — React

React + Vite port of the roadmap board (same layout, dark mode, Golden Rules, per-project updates, release before/after comparisons).

## Run

```bash
npm install
npm run dev
```

## Structure

- `src/App.jsx` — the whole page: header, Currently working on, Up next, Bugs management, Just Released, and all four overlays (updates, release info, image zoom, Golden Rules).
- `src/data.js` — all content: team, queue, on-call rotation + handover report, releases (with `details` and before/after `comparisons`), and `seedNotes`. Swap `loadBoard()` for an Airtable API call and the UI needs no changes.
- `src/goldenRules.js` — the nine Golden Rules plus status/group color and hint maps.
- `src/ui.jsx` — small shared pieces (Icon, IconButton, Modal, Avatar, SectionHead, StatusDot).
- `src/index.css` — the light/dark design tokens (`[data-theme="dark"]`) and hover rules.
- `public/uploads/` — the release screenshots referenced from `data.js`.

## Notes

- Theme choice persists in `localStorage` under `roadmap-board-theme`.
- Updates are seeded from `data.js` into `localStorage` (`roadmap-board-notes-v2`); bump `SEED_VERSION` in `App.jsx` after editing `seedNotes` so clients pick up the new content.
- Updates are read-only in the UI — Product edits them in `data.js`.
