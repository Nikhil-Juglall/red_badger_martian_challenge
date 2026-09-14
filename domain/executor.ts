import { isWithinGrid } from "./grid";
import { nextPosition } from "./movement";
import { addScent, hasScent } from "./scents";
import { turnLeft, turnRight } from "./rotation";
import type { Grid, Robot, Scents, SimulationRobot } from "./types";

export interface RobotExecutionResult {
  robot: SimulationRobot;
  scents: Scents;
}

// Executes one robots commands against the scents from earlier robots
export const executeInstructions = (
  grid: Grid,
  robot: Robot,
  instructions: string,
  scents: Scents,
): RobotExecutionResult => {
  let currentRobot: SimulationRobot = { ...robot, lost: false };
  let currentScents = scents;

  for (const instruction of instructions) {
    if (instruction === "L") {
      currentRobot = {
        ...currentRobot,
        direction: turnLeft(currentRobot.direction),
      };
      continue;
    }

    if (instruction === "R") {
      currentRobot = {
        ...currentRobot,
        direction: turnRight(currentRobot.direction),
      };
      continue;
    }

    if (instruction !== "F") {
      continue;
    }

    const proposedPosition = nextPosition(
      currentRobot.position,
      currentRobot.direction,
    );

    // Check if the proposed position is within the grid boundaries
    if (isWithinGrid(proposedPosition, grid)) {
      currentRobot = { ...currentRobot, position: proposedPosition };
      continue;
    }

    // Check if theres a scent
    if (hasScent(currentScents, currentRobot.position)) {
      continue;
    }

    currentScents = addScent(currentScents, currentRobot.position);
    currentRobot = { ...currentRobot, lost: true };
    break;
  }

  return { robot: currentRobot, scents: currentScents };
};
