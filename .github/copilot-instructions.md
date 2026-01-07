## Purpose

This file gives concise, actionable guidance for AI coding agents working on the CalculaTetris static site so they can be productive immediately.

**Project Overview**

- **What it is:** a single-page static app that skins a simple calculator as a Game Boy / Tetris theme.
- **Files of interest:** `index.html`, `script.js`, `styles.css`, and the `assets/` directory (audio + images).

**Quick Start (local preview)**

- Serve files with a static server (recommended) instead of opening file:// to avoid audio/autoplay quirks:

```bash
python -m http.server 8000
# then open http://localhost:8000/
```

or

```bash
npx http-server -p 8000
```

**High-level architecture / why**

- Static, DOM-driven UI: `index.html` contains the calculator markup with inline `onclick` handlers that call global functions defined in `script.js`.
- All behavior (input, sounds, music) is implemented in `script.js` — there is intentionally no build step or framework.
- Styling and layout are in `styles.css`. The layout relies on absolute positioning to place the calculator over the Game Boy background image in `assets/gameboy2.jpg`.

**Key patterns and project-specific conventions**

- Global functions: Keep global function names intact (`appendToDisplay`, `clearDisplay`, `deleteLast`, `calculateResult`) because `index.html` uses inline handlers.
- Sound pool utility: `makeSoundPool(src, poolSize=6, volume=0.45)` creates a small pool of `Audio` objects. Add new sounds by adding an asset to `assets/` and creating a pool in `script.js` (follow existing naming like `sTap`, `sOp`, `sClear`).
- Button behavior mapping: Comments in `script.js` map UI actions to Tetris sounds (e.g., digits → `sTap`, operators → `sOp`). Preserve or update the comment mappings when changing sound behavior.
- Background music: `index.html` includes `<audio id="bgm">` and `script.js` starts playback only after first user interaction (click/keydown) to satisfy browser autoplay rules.
- Eval usage: `calculateResult()` uses `eval(display.value)` — input normally comes only from the calculator buttons, but if changing input sources (keyboard, paste), be cautious of injection risks.
- CSS layout tweaks: `.screen` uses absolute `top`/`left` to align the calculator inside the Game Boy background — if you change image or container size, update those values.

**Editing examples (copy-paste ready)**

- Add a new sound pool in `script.js`:
```js
const sNew = makeSoundPool('assets/new_sound.wav', 4, 0.35);
// call sNew() where appropriate
```
- Add a new calculator button in `index.html` (keeps inline handler convention):
```html
<button class="btn" onclick="appendToDisplay('π')">π</button>
```
Note: if you add non-numeric tokens that `eval` doesn't understand, update `calculateResult()` accordingly.

**Testing / manual checks**

- Manual playthrough in browser (verify audio triggers, display updates, and layout in multiple widths). Use the static server commands above.
- Check that sounds play by pressing digits / operators and that background music starts only after interaction.

**Files to inspect for changes / common edit targets**

- `index.html` — button markup and `audio` tag.
- `script.js` — sound pools, button handlers, `eval` logic, `DOMContentLoaded` music hook.
- `styles.css` — layout anchors for `.gameboy` and `.screen`, CSS variables in `:root` for theming.

If anything in this guidance is unclear or you want me to cover additional workflows (CI, commit hooks, or a specific refactor), tell me which area to expand. 
