import { executeInstructions } from "./executor";
import type {
  Grid,
  RobotInstructions,
  Scents,
  SimulationResult,
} from "./types";

export const simulate = (
  grid: Grid,
  robotInstructions: readonly RobotInstructions[],
): SimulationResult => {
  let scents: Scents = new Set();

  const robots = robotInstructions.map(({ robot, instructions }) => {
    const result = executeInstructions(grid, robot, instructions, scents);

    scents = result.scents;

    return result.robot;
  });

  return { robots, scents };
};
