# Lumina — Feature Expansion Plan

## New Features to Add

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Progress Bar** | Thin glowing bar at the top of reader showing % complete |
| 2 | **Font Size Control** | +/- buttons to resize text in the reader on the fly |
| 3 | **Focus Line** | A soft highlight band across the center of the screen — where your eyes should be |
| 4 | **3-2-1 Countdown** | Countdown overlay before auto-scroll begins |
| 5 | **Time Remaining** | Live estimate of time left based on scroll position + speed |
| 6 | **Mirror Mode** | Flip text horizontally for real hardware teleprompter setups |
| 7 | **Auto-Save Text** | Persist the last pasted script in `localStorage` — reloads automatically |
| 8 | **Text Color Selector** | White / Teleprompter Green / Yellow presets in setup panel |

## Files to Update
- `index.html` — new controls, progress bar, countdown overlay, focus line
- `style.css` — styles for all new elements
- `script.js` — all logic for new features
