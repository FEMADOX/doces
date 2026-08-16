/** @typedef {{ x: number, y: number }} TrailPoint */

/**
 * Move each trail point toward the already-updated point in front of it.
 *
 * @param {TrailPoint[]} points
 * @param {TrailPoint} target
 * @param {readonly number[]} factors
 * @returns {boolean} whether another animation frame is needed
 */
export function advanceTrail(points, target, factors) {
  let leader = target;
  let unsettled = false;

  points.forEach((point, index) => {
    const factor = factors[index];
    point.x += (leader.x - point.x) * factor;
    point.y += (leader.y - point.y) * factor;

    if (
      Math.abs(leader.x - point.x) > 0.1 ||
      Math.abs(leader.y - point.y) > 0.1
    ) {
      unsettled = true;
    }

    leader = point;
  });

  return unsettled;
}
