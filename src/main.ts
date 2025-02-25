import { canvas, c } from "./Config/Canvas";
import { Sphere } from "./Entities/Sphere";

console.log("Game started!");

let gameStopped: Boolean = true;
let lastScore: string = "left";

const p1Score: HTMLElement = document.getElementById("p1_score") as HTMLElement;
const p2Score: HTMLElement = document.getElementById("p2_score") as HTMLElement;

const sphere: Sphere = new Sphere(canvas.width / 2, canvas.height / 2, 8, 5);

const padHeight: number = 120;
const padWidth: number = 10;
let padSpeed: number = 5;
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
  c.clearRect(0, 0, canvas.width, canvas.height);

  sphere.render();
  renderPad(padLeftX, padLeftY);
  renderPad(padRigthX, padRightY);

  if (!gameStopped) {
    sphere.position.x += sphere.dx;
    sphere.position.y += sphere.dy;
  }

  if (
    sphere.position.y + sphere.size > canvas.height ||
    sphere.position.y - sphere.size < 0
  ) {
    sphere.dy = -sphere.dy;
  }

  if (sphere.position.x + sphere.size < canvas.width && sphere.position.x > 0) {
    if (
      sphere.position.x + sphere.size > padRigthX &&
      sphere.position.y + sphere.size > padRightY &&
      sphere.position.y <= padRightY + padHeight
    ) {
      sphere.dx = -sphere.dx;
    }
    if (
      sphere.position.x <= padLeftX + padWidth &&
      sphere.position.y + sphere.size > padLeftY &&
      sphere.position.y < padLeftY + padHeight
    ) {
      sphere.dx = -sphere.dx;
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
  true
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

    if (e.key === " ") {
      gameStopped = !gameStopped;
    }
  },
  true
);

function renderPad(posX: number, posY: number) {
  c.fillStyle = "white";
  c.fillRect(posX, posY, padWidth, padHeight);
  c.fill();
}

function computePoints(): void {
  if (sphere.position.x + sphere.size > canvas.width) {
    p1Score.textContent = (Number(p1Score?.textContent) + 1).toString();
    lastScore = "left";
  } else if (sphere.position.x - sphere.size < 0) {
    p2Score.textContent = (Number(p2Score?.textContent) + 1).toString();
    lastScore = "right";
  }

  gameStopped = true;
  sphere.reset(lastScore);
}

requestAnimationFrame(gameloop);
