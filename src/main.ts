import { canvas, c } from "./Config/Canvas";
import { Sphere } from "./Entities/Sphere";
import { Pad } from "./Entities/Pad";

console.log("Game started!");

let gameStopped: Boolean = true;
let lastScore: string = "left";

const p1Score: HTMLElement = document.getElementById("p1_score") as HTMLElement;
const p2Score: HTMLElement = document.getElementById("p2_score") as HTMLElement;
const padWidth: number = 10;
const padHeight: number = 120;
let padSpeed: number = 7;
let sphereSpeed: number = 8;

const sphere: Sphere = new Sphere(
  canvas.width / 2,
  canvas.height / 2,
  8,
  sphereSpeed
);
const padLeft: Pad = new Pad(
  10,
  canvas.height / 2 - padHeight / 2,
  padWidth,
  padHeight,
  "green",
  padSpeed
);
const padRight: Pad = new Pad(
  580,
  canvas.height / 2 - padHeight / 2,
  padWidth,
  padHeight,
  "red",
  padSpeed
);

const keys = {
  w: { pressed: false },
  s: { pressed: false },
  arrowUp: { pressed: false },
  arrowDown: { pressed: false },
};

function gameloop(): void {
  c.clearRect(0, 0, canvas.width, canvas.height);

  sphere.render();
  padLeft.render();
  padRight.render();

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
      sphere.position.x + sphere.size > padRight.position.x &&
      sphere.position.y + sphere.size > padRight.position.y &&
      sphere.position.y <= padRight.position.y + padHeight
    ) {
      sphere.dx = -sphere.dx;
      let relativeIntersectY =
        padRight.position.y + padHeight / 2 - sphere.position.y;
      let normalizedRelativeIntersectionY =
        relativeIntersectY / (padHeight / 2);
      sphere.dy = -normalizedRelativeIntersectionY * sphere.speed;
    }
    if (
      sphere.position.x <= padLeft.position.x + padWidth &&
      sphere.position.y + sphere.size > padLeft.position.y &&
      sphere.position.y < padLeft.position.y + padHeight
    ) {
      sphere.dx = -sphere.dx;
      let relativeIntersectY =
        padLeft.position.y + padHeight / 2 - sphere.position.y;
      let normalizedRelativeIntersectionY =
        relativeIntersectY / (padHeight / 2);
      sphere.dy = -normalizedRelativeIntersectionY * sphere.speed;
    }
  } else {
    computePoints();
  }

  if (keys.w.pressed && padLeft.position.y > 0) {
    padLeft.position.y -= padSpeed;
  }
  if (keys.s.pressed && padLeft.position.y < canvas.height - padHeight) {
    padLeft.position.y += padSpeed;
  }

  if (keys.arrowUp.pressed && padRight.position.y > 0) {
    padRight.position.y -= padSpeed;
  }
  if (
    keys.arrowDown.pressed &&
    padRight.position.y < canvas.height - padHeight
  ) {
    padRight.position.y += padSpeed;
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
