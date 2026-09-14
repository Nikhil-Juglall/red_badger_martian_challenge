import { useState } from "react";
import { simulate } from "./domain";
import { parseInput } from "./parser";

const SAMPLE_INPUT = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

const formatResults = (robots: ReturnType<typeof simulate>["robots"]): string =>
  robots
    .map(
      ({ position, direction, lost }) =>
        `${position.x} ${position.y} ${direction}${lost ? " LOST" : ""}`,
    )
    .join("\n");

const App = () => {
  const [input, setInput] = useState<string>(SAMPLE_INPUT);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSimulate = () => {
    try {
      const parsed = parseInput(input);
      const result = simulate(parsed.grid, parsed.robots);

      setOutput(formatResults(result.robots));
      setError("");
    } catch (error) {
      setOutput("");
      setError(
        error instanceof Error ? error.message : "Unable to simulate input",
      );
    }
  };

  return (
    <main className="app-shell">
      <h1>Martian Robots</h1>

      <p>Enter the robot instructions and run the simulation.</p>

      <label htmlFor="simulation-input">Input</label>

      <textarea
        id="simulation-input"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={12}
        spellCheck={false}
      />

      <button type="button" onClick={handleSimulate}>
        Run simulation
      </button>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {output && (
        <section aria-labelledby="results-heading">
          <h2 id="results-heading">Results</h2>
          <pre>{output}</pre>
        </section>
      )}
    </main>
  );
};

export default App;
