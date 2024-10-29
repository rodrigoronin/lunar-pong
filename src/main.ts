console.log("Game started!");

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

let x: number = 100;
let y: number = 75;
let ballSize: number = 8;
const speed: number = 5;
let dx: number = speed;
let dy: number = -speed;

let padRigthX: number = 10;
let padLeftX: number = 580;
const padHeight: number = 160;

function gameloop(): void {
  context.clearRect(0, 0, canvas.width, canvas.height);

  renderBall();
  renderPad(padLeftX);
  renderPad(padRigthX);

  x += dx;
  y += dy;

  if (x + ballSize > canvas.width || x - ballSize < 0) {
    dx = -dx;
  }
  if (y + ballSize > canvas.height || y - ballSize < 0) {
    dy = -dy;
  }

  requestAnimationFrame(gameloop);
}

function renderBall(): void {
  context.beginPath();
  context.fillStyle = "white";
  context.arc(x, y, ballSize, 0, 2 * Math.PI);
  context.fill();
}

function renderPad(posX: number) {
  context.fillStyle = "white";
  context.fillRect(posX, canvas.height / 2 - padHeight / 2, 10, padHeight);
  context.fill();
}

requestAnimationFrame(gameloop);
