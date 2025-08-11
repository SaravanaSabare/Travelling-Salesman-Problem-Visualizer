# Traveling Salesman Problem (TSP) Visualizer

Interactive, browser-based visualizer for the Traveling Salesman Problem built with p5.js. Generate points, drag to reposition, and watch a 2-Opt heuristic iteratively improve the tour.

## Features
- Add points by clicking on the canvas; drag points to move them
- Generate a random set of points with adjustable count (3–50)
- Stepwise 2-Opt improvement with live distance updates
- Toggle solving on/off; reset to the initial tour

## How it works
- Rendering: p5.js draws points and the current tour on a square canvas
- Tour representation: an `order` array indexes into the `points` array
- Distance: total Euclidean distance including the return to the starting point
- Heuristic: 2-Opt tries reversing segments `i..j` and keeps changes that shorten the tour; repeats until no improvement is found (locally optimal, not guaranteed globally optimal)

## Getting started
1. Open `index.html` in a modern desktop browser (Chrome, Edge, Firefox). No build step required.
   - p5.js is loaded via CDN; internet connectivity is required for the first load.
2. Optional: use a local server for cleaner file access (e.g., VS Code Live Server extension) and open `index.html`.

## Controls
- Points slider: sets how many random points to generate
- Generate Random Points: creates a new set of points
- Solve TSP: starts/stops the 2-Opt improvement loop; shows “Solving…” then “Solved!” when no improvement remains
- Reset Solution: restores the tour to the initial order
- Canvas interactions: click to add points; drag to move existing points

## Project structure
- `index.html` – page layout and controls; loads p5.js and the sketch
- `sketch.js` – p5.js sketch, state, and 2-Opt logic
- `style.css` – basic styling for layout and controls

## Customization
- Canvas size: change `canvasSize` in `sketch.js`
- Point radius/appearance: adjust drawing in `draw()` within `sketch.js`
- Styling: edit colors, spacing, and animations in `style.css`

## Notes and limitations
- 2-Opt finds a local minimum; results depend on the initial tour
- Runtime grows roughly with the square of the number of points per improvement pass
- Distance metric is Euclidean in a plane; no support for constraints or obstacles

## Acknowledgments
- [p5.js](https://p5js.org/) for rendering and interaction
