import type { Directions } from "./types";

const DIRECTIONS: readonly Directions[] = ["N", "E", "S", "W"];

// Uses the clockwise direction order and indexing to handle wraparound
const rotate = (direction: Directions, step: number): Directions => {
  const currentIndex = DIRECTIONS.indexOf(direction);

  const nextIndex =
    (currentIndex + step + DIRECTIONS.length) % DIRECTIONS.length;

  return DIRECTIONS[nextIndex];
};

export const turnRight = (direction: Directions): Directions =>
  rotate(direction, 1);

export const turnLeft = (direction: Directions): Directions =>
  rotate(direction, -1);
