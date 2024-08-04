export const HEIGHT = 800;
export const WIDTH = 800;
export const OBSTACLE_RADIUS = 4;
export const GRAVITY = 0.1;
export const SINK_WIDTH = 36;
export const horizontalFriction = 0.3;
export const verticalFriction = 0.8;
export const BALL_COLOR = "red";
export const BALL_RADIUS = 7;
export const DEFAULT_Y_BALL_DROP = 20;
const numOfSinks = 17;

export interface Obstacle {
  x: number;
  y: number;
}
export interface Sink {
  x: number;
  y: number;
  height: number;
  width: number;
  multiplier: number;
}
export function createObstacles() {
  const obstacles: Obstacle[] = [];
  const rows = 18;
  for (let row = 2; row < rows; row++) {
    const noOfObstaclesInRow = row + 1;
    const spacingBWObstacles = 36;
    const y = row * 36;
    for (let col = 0; col < noOfObstaclesInRow; col++) {
      const x = WIDTH / 2 - spacingBWObstacles * (row / 2 - col);
      obstacles.push({ x, y });
    }
  }
  return obstacles;
}

export function createSinks() {
  const sinks: Sink[] = [];
  const spacing = OBSTACLE_RADIUS * 2;
  for (let i = 0; i < numOfSinks; i++) {
    const x =
      WIDTH / 2 + SINK_WIDTH * (i - Math.floor(numOfSinks / 2)) - spacing * 1.5;
    const y = HEIGHT - 150;
    sinks.push({
      x,
      y,
      height: SINK_WIDTH,
      width: SINK_WIDTH,
      multiplier: MULTIPLIERS[i + 1],
    });
  }
  return sinks;
}

const MULTIPLIERS: { [key: number]: number } = {
  1: 16,
  2: 9,
  3: 2,
  4: 1.4,
  5: 1.4,
  6: 1.2,
  7: 1.1,
  8: 1,
  9: 0.5,
  10: 1,
  11: 1.1,
  12: 1.2,
  13: 1.4,
  14: 1.4,
  15: 2,
  16: 9,
  17: 16,
};

export function getColor(index: number) {
  if (index < 3 || index > numOfSinks - 3) {
    return { background: "#ff003f", color: "white" };
  }
  if (index < 6 || index > numOfSinks - 6) {
    return { background: "#ff7f00", color: "white" };
  }
  if (index < 9 || index > numOfSinks - 9) {
    return { background: "#ffbf00", color: "black" };
  }
  if (index < 12 || index > numOfSinks - 12) {
    return { background: "#ffff00", color: "black" };
  }
  if (index < 15 || index > numOfSinks - 15) {
    return { background: "#bfff00", color: "black" };
  }
  return { background: "#7fff00", color: "black" };
}
