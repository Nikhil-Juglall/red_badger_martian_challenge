/** The four directions supported by the grid. */
export type Directions = "N" | "E" | "S" | "W";

export interface Position {
  x: number;
  y: number;
}

/** The upper right corner, the lower left corner is 0,0. */
export interface Grid {
  upperRight: Position;
}

export interface Robot {
  position: Position;
  direction: Directions;
}

/** A value for storing a position in a Set */
export type PositionKey = `${number},${number}`;

export type Scents = Set<PositionKey>;

export interface TurnLeft {
  type: "turn-left";
}

export interface TurnRight {
  type: "turn-right";
}

export interface MoveForward {
  type: "move-forward";
}

export type Commands = TurnLeft | TurnRight | MoveForward;

export type InstructionSequence = Commands[];

export interface SimulationRobot extends Robot {
  lost: boolean;
}

export interface SimulationResult {
  robots: SimulationRobot[];
  scents: Scents;
}
