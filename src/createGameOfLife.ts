import { drawField } from "./utils/drawField";
import { getNextGeneration } from "./utils/getNextGeneration";

const WIDTH = 20;
const HEIGHT = 20;
const GAME_STEP_DELAY_IN_MS = 1000;

export function createGameOfLife(
  el: HTMLElement,
  step = GAME_STEP_DELAY_IN_MS
): void {
  let field = Array.from({ length: HEIGHT }).map(
    () => Array.from({ length: WIDTH }).fill(0) as number[]
  );

  const fieldEl: HTMLDivElement = document.createElement("div");
  fieldEl.classList.add("field");
  el.append(fieldEl);

  const buttonEl: HTMLButtonElement = document.createElement("button");
  buttonEl.innerHTML = "Start";
  el.append(buttonEl);

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

  function makeGameStep(): void {
    field = getNextGeneration(field);
    drawField(fieldEl, field, onCellClick);
  }

  const onCellClick: (a: number, b: number) => void = (x, y) => {
    field[y][x] = field[y][x] ? 0 : 1;
    drawField(fieldEl, field, onCellClick);
  };

  drawField(fieldEl, field, onCellClick);
}
