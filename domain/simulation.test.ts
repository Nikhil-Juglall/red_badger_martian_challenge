import { describe, expect, it } from "vitest";
import { simulate } from "./simulation";
import { parseInput } from "../parser";

describe("Martian Robots sample", () => {
  it("produces the expected output", () => {
    const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;
    const parsed = parseInput(input);
    const result = simulate(parsed.grid, parsed.robots);

    expect(result.robots).toEqual([
      { position: { x: 1, y: 1 }, direction: "E", lost: false },
      { position: { x: 3, y: 3 }, direction: "N", lost: true },
      { position: { x: 2, y: 3 }, direction: "S", lost: false },
    ]);
  });
});
