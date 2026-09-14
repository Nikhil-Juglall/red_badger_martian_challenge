import type { Directions, Position } from "./types";

const DIRECTION_DELTAS: Record<Directions, Position> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

export const nextPosition = (
  position: Position,
  direction: Directions,
): Position => {
  const delta = DIRECTION_DELTAS[direction];

  return {
    x: position.x + delta.x,
    y: position.y + delta.y,
  };
};
