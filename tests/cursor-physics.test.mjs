import assert from "node:assert/strict";
import test from "node:test";
import { advanceTrail } from "../components/cursor-physics.mjs";

test("advanceTrail chains each point behind its updated leader", () => {
  const points = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  const unsettled = advanceTrail(points, { x: 10, y: 4 }, [0.5, 0.5]);

  assert.equal(unsettled, true);
  assert.deepEqual(points, [
    { x: 5, y: 2 },
    { x: 2.5, y: 1 },
  ]);
});

test("advanceTrail sleeps when every point has converged", () => {
  const points = [{ x: 10, y: 4 }];

  const unsettled = advanceTrail(points, { x: 10, y: 4 }, [0.28]);

  assert.equal(unsettled, false);
  assert.deepEqual(points, [{ x: 10, y: 4 }]);
});
