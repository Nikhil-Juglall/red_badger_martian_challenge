# Testing strategy

The current tests include the application smoke test and a regression test for the assessment sample. If I had more time, I would extend coverage around the domain logic first.

I would add unit tests for:

- All left and right rotations, including `W -> N` and `N -> W`.
- Forward movement in each direction without mutating the original position.
- Inclusive grid boundaries and invalid positions outside the grid.
- Collision-safe scent keys, scent lookup, and immutable scent updates.
- Unscented boundary attempts causing a robot to become lost and stop.
- Scented boundary attempts being ignored so later commands continue.

I would also add parser tests for whitespace, robot ordering, incomplete input, invalid directions, and invalid commands.

Finally, I would add a small number of UI tests to check the initial sample input, displayed results, and user-friendly error messages. I would keep the robot rules tested in the domain layer rather than duplicating those tests through React components.
