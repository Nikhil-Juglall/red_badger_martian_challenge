# Martian Robots

## Overview

This is a small React application for running the Martian Robots assessment interactively. Enter the assessment input, run the simulation, and view the final robot positions and orientations.

## Problem

Mars is a bounded rectangular grid with lower-left coordinate `0 0` and a supplied upper-right coordinate. Each robot has an `x` coordinate, a `y` coordinate, and an orientation (`N`, `E`, `S`, or `W`).

Robots receive `L`, `R`, and `F` commands. `L` and `R` rotate the robot, while `F` attempts to move it one grid point forward. A robot that moves outside the grid becomes `LOST` and leaves a scent at its last valid position. A later robot attempting an invalid `F` from a scented position ignores that command instead of becoming lost. Robots are processed sequentially.

## Tech stack

- React
- TypeScript
- Vite
- Vitest
- ESLint

## Running locally

From the project directory:

```bash
npm install
npm run dev
npm run test
npm run lint
npm run build
```

`npm run dev` starts the development server. `npm run build` runs TypeScript checking before creating the production build in `dist/`.

## Architecture

- React presentation lives in `App.tsx` and is responsible for input state, button interaction, and displaying results/errors.
- Raw text conversion lives in `parser/parseInput.ts`.
- Movement, rotation, grid checks, scents, instruction execution, and sequential simulation live in `domain/`.

The simulation is kept outside React so it remains pure, independently testable, and usable by another interface without duplicating business rules in components.

## Key design decisions

- Directions use a TypeScript union type rather than unrestricted strings.
- Movement and rotation are pure functions that return new values.
- Grid boundaries are checked separately from raw forward movement.
- Scent positions are stored in a `Set` using unambiguous coordinate keys such as `"1,23"`.
- The simulation carries the scent set from one robot to the next.
- The implementation uses small functions and plain data instead of classes, state-management libraries, or other unnecessary abstractions.

## Testing

Vitest runs the application smoke test and a regression test for the supplied assessment sample. The sample is expected to produce:

Input:

```text
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

Output:

```text
1 1 E
3 3 N LOST
2 3 S
```

## Future improvements

With more time, the project could add more domain edge-case tests, more precise parser error reporting, and a small UI test covering error and result rendering. The assessment does not require a visual grid, backend, persistence, or additional state-management infrastructure.
