import { drawField } from "./utils/drawField";
import { getNextGeneration } from "./utils/getNextGeneration";

let WIDTH = 20;
let HEIGHT = 20;
const GAME_STEP_DELAY_IN_MS = 1000;
let field: number[][];

export function createGameOfLife(
  el: HTMLElement,
  step = GAME_STEP_DELAY_IN_MS
): void {
  field = Array.from({ length: HEIGHT }).map(
    () => Array.from({ length: WIDTH }).fill(0) as number[]
  );

  const fieldEl: HTMLDivElement = document.createElement("div");
  fieldEl.classList.add("field");
  el.append(fieldEl);

  const buttonEl: HTMLButtonElement = document.createElement("button");
  buttonEl.innerHTML = "Start";
  el.append(buttonEl);

  const buttonPlus: HTMLButtonElement = document.createElement("button");
  buttonPlus.innerHTML = "+";
  el.append(buttonPlus);

  const buttonMin: HTMLButtonElement = document.createElement("button");
  buttonMin.innerHTML = "-";
  el.append(buttonMin);

  let intervalId: any;
  buttonEl.addEventListener("click", () => {
    if (buttonEl.innerHTML === "Start") {
      buttonEl.innerHTML = "Stop";
      intervalId = setInterval(makeGameStep, step);
    } else {
      buttonEl.innerHTML = "Start";
      clearInterval(intervalId);
    }
  });

  buttonPlus.addEventListener("click", () => {
    WIDTH += 1;
    HEIGHT += 1;
    const newField = Array.from({ length: HEIGHT }).map(
      () => Array.from({ length: WIDTH }).fill(0) as number[]
    );
    field = getNextGeneration(field);

    for (let y = 0; y < newField.length - 1; y += 1) {
      for (let x = 0; x < newField[y].length - 1; x += 1) {
        newField[y][x] = field[y][x];
      }
    }
    drawField(fieldEl, newField, onCellClick);
    field = newField;
  });

  buttonMin.addEventListener("click", () => {
    WIDTH -= 1;
    HEIGHT -= 1;

    const newField = Array.from({ length: HEIGHT }).map(
      () => Array.from({ length: WIDTH }).fill(0) as number[]
    );
    field = getNextGeneration(field);

    for (let y = 0; y < newField.length; y += 1) {
      for (let x = 0; x < newField[y].length; x += 1) {
        newField[y][x] = field[y][x];
      }
    }

    drawField(fieldEl, newField, onCellClick);
    field = newField;
  });

  function makeGameStep(): void {
    if (
      el.querySelectorAll(".cell--dying").length +
        el.querySelectorAll(".cell--alive").length !==
      0
    ) {
      field = getNextGeneration(field);
      drawField(fieldEl, field, onCellClick);
    } else {
      clearInterval(intervalId);
      buttonEl.innerHTML = "Start";
    }
  }

  const onCellClick: (a: number, b: number) => void = (x, y) => {
    field[y][x] = field[y][x] ? 0 : 1;
    drawField(fieldEl, field, onCellClick);
  };

  drawField(fieldEl, field, onCellClick);
}
