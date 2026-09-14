import type { Directions, Grid, RobotInstructions } from "../domain/types";

export type ParsedRobot = RobotInstructions;
export interface ParsedInput {
  grid: Grid;
  robots: ParsedRobot[];
}

const DIRECTIONS = new Set<Directions>(["N", "E", "S", "W"]);

// Parse coordinates explicitly so malformed values fail at the input boundary
const parseInteger = (value: string, context: string): number => {
  if (!/^-?\d+$/.test(value)) throw new Error(`Invalid ${context}: ${value}`);

  return Number(value);
};

export const parseInput = (input: string): ParsedInput => {
  // Normalize line endings and whitespace while preserving non empty line order
  const lines = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) throw new Error("Input is empty");

  // The first line defines the inclusive upper right corner of the grid
  const gridParts = lines[0].split(/\s+/);

  if (gridParts.length !== 2)
    throw new Error("Grid must contain upper right x and y coordinates");

  const grid: Grid = {
    upperRight: {
      x: parseInteger(gridParts[0], "grid x coordinate"),
      y: parseInteger(gridParts[1], "grid y coordinate"),
    },
  };

  if (grid.upperRight.x < 0 || grid.upperRight.y < 0)
    throw new Error("Grid coordinates must be positive integers");

  // Every robot occupies two lines - its starting state and its commands
  const robotLines = lines.slice(1);
  if (robotLines.length % 2 !== 0) {
    throw new Error(
      "Each robot must have a position line and an instruction line",
    );
  }

  const robots: ParsedRobot[] = [];
  for (let index = 0; index < robotLines.length; index += 2) {
    const positionParts = robotLines[index].split(/\s+/);
    if (positionParts.length !== 3) {
      throw new Error("Robot position must contain x, y, and direction");
    }

    const direction = positionParts[2] as Directions;
    if (!DIRECTIONS.has(direction)) {
      throw new Error(`Invalid robot direction: ${positionParts[2]}`);
    }

    // Validate commands so the simulation receives known instructions only
    const instructions = robotLines[index + 1];
    if (!/^[LRF]*$/.test(instructions))
      throw new Error(`Invalid instruction string: ${instructions}`);

    robots.push({
      robot: {
        position: {
          x: parseInteger(positionParts[0], "robot x coordinate"),
          y: parseInteger(positionParts[1], "robot y coordinate"),
        },
        direction,
      },
      instructions,
    });
  }

  return { grid, robots };
};
