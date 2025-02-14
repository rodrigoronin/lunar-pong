console.log("Game started!");

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas",
) as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext(
  "2d",
) as CanvasRenderingContext2D;

let x: number = 100;
let y: number = 75;
let ballSize: number = 8;
const speed: number = 5;
let dx: number = speed;
let dy: number = -speed;

const padHeight: number = 120;
const padWidth: number = 10;
let padSpeed: number = 4;
let padRigthX: number = 580;
let padRightY: number = canvas.height / 2 - padHeight / 2;
let padLeftX: number = 10;
let padLeftY: number = canvas.height / 2 - padHeight / 2;

const keys = {
  w: { pressed: false },
  s: { pressed: false },
  arrowUp: { pressed: false },
  arrowDown: { pressed: false },
};

function gameloop(): void {
  context.clearRect(0, 0, canvas.width, canvas.height);

  renderBall();
  renderPad(padLeftX, padLeftY);
  renderPad(padRigthX, padRightY);

  x += dx;
  y += dy;

  if (y + ballSize > canvas.height || y - ballSize < 0) {
    dy = -dy;
  }

  if (x + ballSize < canvas.width && x > 0) {
    if (
      x + ballSize > padRigthX &&
      y + ballSize > padRightY &&
      y <= padRightY + padHeight
    ) {
      dx = -dx;
    }
    if (
      x <= padLeftX + padWidth &&
      y + ballSize > padLeftY &&
      y < padLeftY + padHeight
    ) {
      dx = -dx;
    }
  }

  if (keys.w.pressed && padLeftY > 0) {
    padLeftY -= padSpeed;
  }
  if (keys.s.pressed && padLeftY < canvas.height - padHeight) {
    padLeftY += padSpeed;
  }

  if (keys.arrowUp.pressed && padRightY > 0) {
    padRightY -= padSpeed;
  }
  if (keys.arrowDown.pressed && padRightY < canvas.height - padHeight) {
    padRightY += padSpeed;
  }

  requestAnimationFrame(gameloop);
}

document.addEventListener(
  "keydown",
  (e: KeyboardEvent) => {
    if (e.key === "w") {
      keys.w.pressed = true;
    } else if (e.key === "s") {
      keys.s.pressed = true;
    } else if (e.key === "ArrowUp") {
      keys.arrowUp.pressed = true;
    } else if (e.key === "ArrowDown") {
      keys.arrowDown.pressed = true;
    }
  },
  true,
);

document.addEventListener(
  "keyup",
  (e: KeyboardEvent) => {
    if (e.key === "w") {
      keys.w.pressed = false;
    } else if (e.key === "s") {
      keys.s.pressed = false;
    } else if (e.key === "ArrowUp") {
      keys.arrowUp.pressed = false;
    } else if (e.key === "ArrowDown") {
      keys.arrowDown.pressed = false;
    }
  },
  true,
);

function renderBall(): void {
  context.beginPath();
  context.fillStyle = "white";
  context.arc(x, y, ballSize, 0, 2 * Math.PI);
  context.fill();
}

function renderPad(posX: number, posY: number) {
  context.fillStyle = "white";
  context.fillRect(posX, posY, padWidth, padHeight);
  context.fill();
}

requestAnimationFrame(gameloop);
