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

let padRigthX: number = 580;
let padLeftX: number = 10;
const padHeight: number = 160;
let padRightY: number = canvas.height / 2 - padHeight / 2;
let padLeftY: number = canvas.height / 2 - padHeight / 2;
let padSpeed: number = 5;
let padLeftUp: boolean = false;
let padLeftDown: boolean = false;

function gameloop(): void {
  context.clearRect(0, 0, canvas.width, canvas.height);

  renderBall();
  renderPad(padLeftX, padLeftY);
  renderPad(padRigthX, padLeftY);

  x += dx;
  y += dy;

  if (y + ballSize > canvas.height || y - ballSize < 0) {
    dy = -dy;
  }

  if (
    x + ballSize >= canvas.width - 20 &&
    y + ballSize < padRightY + padHeight &&
    y + ballSize > padRightY
  ) {
    console.log("inside padright bounds");
    dx = -dx;
  }
  if (
    x + ballSize < padLeftX + 20 &&
    y + ballSize < padLeftY + padHeight &&
    y + ballSize > padLeftY
  ) {
    console.log("inside padright bounds");
    dx = -dx;
  }

  if (padLeftUp && padLeftY > 0) {
    padLeftY -= padSpeed;
    padRightY -= padSpeed;
  }
  if (padLeftDown && padLeftY < canvas.height - padHeight) {
    padLeftY += padSpeed;
    padRightY += padSpeed;
  }

  requestAnimationFrame(gameloop);
}

document.addEventListener(
  "keydown",
  (e: KeyboardEvent) => {
    if (e.key === "a") {
      padLeftUp = true;
    } else if (e.key === "d") {
      padLeftDown = true;
    }
  },
  true
);

document.addEventListener(
  "keyup",
  (e: KeyboardEvent) => {
    if (e.key === "a") {
      padLeftUp = false;
    } else if (e.key === "d") {
      padLeftDown = false;
    }
  },
  true
);

function renderBall(): void {
  context.beginPath();
  context.fillStyle = "white";
  context.arc(x, y, ballSize, 0, 2 * Math.PI);
  context.fill();
}

function renderPad(posX: number, posY: number) {
  context.fillStyle = "white";
  context.fillRect(posX, posY, 10, padHeight);
  context.fill();
}

requestAnimationFrame(gameloop);
