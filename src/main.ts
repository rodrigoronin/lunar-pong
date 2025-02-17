console.log("Game started!");

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas",
) as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext(
  "2d",
) as CanvasRenderingContext2D;

const p1Score: HTMLElement = document.getElementById("p1_score") as HTMLElement;
const p2Score: HTMLElement = document.getElementById("p2_score") as HTMLElement;

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

class Sphere {
  x: number;
  y: number;
  radius: number;
  speed: number;

  constructor(
    x = canvas.width / 2,
    y = canvas.height / 2,
    radius = 8,
    speed = 5,
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  draw(): void {
    context.beginPath();
    context.fillStyle = "white";
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }
}

const sphere = new Sphere();

function gameloop(): void {
  context.clearRect(0, 0, canvas.width, canvas.height);

  sphere.draw();
  renderPad(padLeftX, padLeftY);
  renderPad(padRigthX, padRightY);

  sphere.x += dx;
  sphere.y += dy;

  if (
    sphere.y + sphere.radius > canvas.height ||
    sphere.y - sphere.radius < 0
  ) {
    dy = -dy;
  }

  if (sphere.x + sphere.radius < canvas.width && sphere.x > 0) {
    if (
      sphere.x + sphere.radius > padRigthX &&
      sphere.y + sphere.radius > padRightY &&
      sphere.y <= padRightY + padHeight
    ) {
      dx = -dx;
    }
    if (
      sphere.x <= padLeftX + padWidth &&
      sphere.y + sphere.radius > padLeftY &&
      sphere.y < padLeftY + padHeight
    ) {
      dx = -dx;
    }
  } else {
    computePoints();
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

function renderPad(posX: number, posY: number) {
  context.fillStyle = "white";
  context.fillRect(posX, posY, padWidth, padHeight);
  context.fill();
}

function computePoints(): void {
  if (sphere.x + sphere.radius > canvas.width) {
    p1Score.textContent = (Number(p1Score?.textContent) + 1).toString();
    resetBall("left");
  } else if (sphere.x - sphere.radius < 0) {
    p2Score.textContent = (Number(p2Score?.textContent) + 1).toString();
    resetBall("right");
  }
}

function resetBall(direction: string): void {
  sphere.x = canvas.width / 2;
  sphere.y = canvas.height / 2;
  dx = speed;
  dy = speed;

  // Changes X direction based on who scored and randomizes the Y direction
  // from center to top or bottom
  if (direction === "left") {
    dx = -dx;
    dy = (Math.random() < 0.5 ? -1 : 1) * speed;
  } else {
    dx = speed;
    dy = (Math.random() < 0.5 ? -1 : 1) * speed;
  }
}

requestAnimationFrame(gameloop);
