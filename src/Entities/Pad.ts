import { c } from "../Config/Canvas";

export class Pad {
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  color: string;
  speed: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = "white",
    speed: number
  ) {
    this.position = { x, y };
    this.dimensions = { width, height };
    this.color = color;
    this.speed = speed;
  }

  render() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    );
    c.fill();
    c.closePath();
  }
}
