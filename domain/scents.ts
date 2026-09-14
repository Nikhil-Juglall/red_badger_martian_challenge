import type { Scents, Position, PositionKey } from "./types";

// Converts a coordinate pair to a key for Set storage
export const positionToKey = (position: Position): PositionKey => {
  return `${position.x},${position.y}`;
};

// Check whether the supplied position is a lost robot position
export const hasScent = (scents: Scents, position: Position): boolean => {
  return scents.has(positionToKey(position));
};

// Returns a new scent containing the position where a robot was lost
export const addScent = (scents: Scents, lostPosition: Position): Scents => {
  const updatedScents = new Set(scents);
  updatedScents.add(positionToKey(lostPosition));

  return updatedScents;
};
