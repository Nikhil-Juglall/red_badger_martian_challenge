import type { Grid, Position } from "./types";

export const isWithinGrid = (position: Position, grid: Grid): boolean => {
  return (
    position.x >= 0 &&
    position.y >= 0 &&
    position.x <= grid.upperRight.x &&
    position.y <= grid.upperRight.y
  );
};
