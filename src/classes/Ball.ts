import {
  BALL_COLOR,
  BALL_RADIUS,
  DEFAULT_Y_BALL_DROP,
  GRAVITY,
  horizontalFriction,
  Obstacle,
  OBSTACLE_RADIUS,
  Sink,
  verticalFriction,
} from "../utils/utils";

export class Ball {
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private ctx: CanvasRenderingContext2D;
  private obstacles: Obstacle[];
  private sinks: Sink[];
  private hasCollidedWithSink: boolean;
  public id: number;

  constructor(
    x: number,
    ctx: CanvasRenderingContext2D,
    obstacles: Obstacle[],
    sinks: Sink[]
  ) {
    this.x = x;
    this.y = DEFAULT_Y_BALL_DROP;
    this.vx = 0;
    this.vy = 0;
    this.ctx = ctx;
    this.obstacles = obstacles;
    this.sinks = sinks;
    this.hasCollidedWithSink = false;
    this.id = Math.ceil(Math.random() * 1000);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
    this.ctx.fillStyle = BALL_COLOR;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    if (this.hasCollidedWithSink) {
      console.log("Stopping");
      return;
    }
    console.log("Ball Updating");
    this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;

    // Collision with obstacles
    this.obstacles.forEach((obstacle) => {
      const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
      if (dist < BALL_RADIUS + OBSTACLE_RADIUS) {
        // Calculate collision angle
        const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
        // Reflect velocity
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vx = Math.cos(angle) * speed * horizontalFriction;
        this.vy = Math.sin(angle) * speed * verticalFriction;

        // Adjust position to prevent sticking
        const overlap = BALL_RADIUS + OBSTACLE_RADIUS - dist;
        this.x += Math.cos(angle) * overlap;
        this.y += Math.sin(angle) * overlap;
      }
    });

    // Collision with sinks
    for (let i = 0; i < this.sinks.length; i++) {
      const sink = this.sinks[i];
      if (
        this.x > sink.x - sink.width / 2 &&
        this.x < sink.x + sink.width / 2 &&
        this.y + BALL_RADIUS > sink.y - sink.height / 2
      ) {
        this.vx = 0;
        this.vy = 0;
        this.hasCollidedWithSink = true;
        break;
      }
    }
  }
  checkCollisionWithSinks(): [boolean, number | null, number | null] {
    for (let i = 0; i < this.sinks.length; i++) {
      const sink = this.sinks[i];
      if (
        this.x > sink.x - sink.width / 2 &&
        this.x < sink.x + sink.width / 2 &&
        this.y + BALL_RADIUS > sink.y - sink.height / 2
      ) {
        return [true, sink.multiplier, this.id];
      }
    }
    return [false, null, null];
  }
  stop() {
    this.hasCollidedWithSink = true;
  }
  collisionWithSink() {
    return this.hasCollidedWithSink;
  }
}
