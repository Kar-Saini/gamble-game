import {
  HEIGHT,
  OBSTACLE_RADIUS,
  WIDTH,
  OBSTACLE_RADIUS as obstacleRadius,
  SINK_WIDTH as sinkWidth,
} from "../utils/utils";
import { Obstacle, Sink, createObstacles, createSinks } from "../utils/utils";
import { getColor } from "../utils/utils";
import { Ball } from "./Ball";

export class BallManager {
  private balls: Ball[];
  private ctx: CanvasRenderingContext2D;
  private obstacles: Obstacle[];
  private sinks: Sink[];
  private requestId?: number;
  private onFinish?: (index: number, startX?: number) => void;
  private stopped: boolean;
  private setModalMessage?: (message: string) => void;

  constructor(
    canvasRef: HTMLCanvasElement,
    onFinish?: (index: number, startX?: number) => void,
    setModalMessage?: (message: string) => void
  ) {
    this.balls = [];
    this.ctx = canvasRef.getContext("2d")!;
    this.obstacles = createObstacles();
    this.sinks = createSinks();
    this.update();
    this.onFinish = onFinish;
    this.stopped = false;
    this.setModalMessage = setModalMessage;
  }

  addBall(startX?: number) {
    const newBall = new Ball(
      startX ||
        Math.random() * (this.obstacles[2].x - this.obstacles[0].x) +
          this.obstacles[0].x,
      this.ctx,
      this.obstacles,
      this.sinks
    );
    this.balls.push(newBall);
  }

  drawObstacles() {
    this.ctx.fillStyle = "white";
    this.obstacles.forEach((obstacle) => {
      this.ctx.beginPath();
      this.ctx.arc(obstacle.x, obstacle.y, OBSTACLE_RADIUS, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  drawSinks() {
    this.ctx.fillStyle = "green";
    const SPACING = obstacleRadius * 2;
    for (let i = 0; i < this.sinks.length; i++) {
      this.ctx.fillStyle = getColor(i).background;
      const sink = this.sinks[i];
      this.ctx.font = "normal 13px Arial";
      this.ctx.fillRect(
        sink.x,
        sink.y - sink.height / 2,
        sink.width - SPACING,
        sink.height
      );
      this.ctx.fillStyle = getColor(i).color;
      this.ctx.fillText(
        sink?.multiplier?.toString() + "x",
        sink.x - 15 + sinkWidth / 2,
        sink.y
      );
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.drawObstacles();
    this.drawSinks();
    this.balls.forEach((ball) => {
      ball.draw();
      ball.update();
    });
  }

  update() {
    this.draw();
    for (const ball of this.balls) {
      const [collided, multiplier, id] = ball.checkCollisionWithSinks();
      if (collided) {
        this.balls = this.balls.filter((ball) => ball.id !== id);
        if (this.setModalMessage) {
          this.setModalMessage(`Multiplier: ${multiplier}`);
        }
        console.log(multiplier);
      }
      ball.update();
    }
    this.requestId = requestAnimationFrame(this.update.bind(this));
  }

  stop() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }
}
