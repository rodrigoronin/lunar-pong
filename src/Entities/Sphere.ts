import { canvas, c } from "../Config/Canvas";

export class Sphere {
  position: { x: number; y: number };
  size: number;
  speed: number;
  dx: number;
  dy: number;

  constructor(x: number, y: number, size: number, speed: number) {
    this.position = { x, y };
    this.size = size;
    this.speed = speed;
    this.dx = speed;
    this.dy = -speed;
  }

  render() {
    c.beginPath();
    c.fillStyle = "white";
    c.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    c.fill();
  }

  reset(direction: string) {
    this.position.x = canvas.width / 2;
    this.position.y = canvas.height / 2;
    this.dx = this.speed;
    this.dy = this.speed;

    // Changes X direction based on who scored and randomizes the Y direction
    // from center to top or bottom
    if (direction === "left") {
      this.dx = -this.dx;
      this.dy = (Math.random() < 0.5 ? -1 : 1) * this.speed;
    } else {
      this.dx = this.speed;
      this.dy = (Math.random() < 0.5 ? -1 : 1) * this.speed;
    }
  }
}
