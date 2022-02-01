import { createGameOfLife } from "./createGameOfLife";
import { sleep } from "./utils/sleep";

describe("createGameOfLife", () => {
  let el: HTMLElement;
  const step = 50;

  function clickCell(x: number, y: number): void {
    (
      el.querySelector(`
      .cell[data-y="${y}"][data-x="${x}"]
      `) as HTMLElement
    ).click();
  }

  function isCellAlive(x: number, y: number): boolean {
    return (
      (
        el.querySelector(`
      .cell[data-y="${y}"][data-x="${x}"]
      `) as HTMLElement
      ).classList.contains("cell--alive") ||
      (
        el.querySelector(`
    .cell[data-y="${y}"][data-x="${x}"]
    `) as HTMLElement
      ).classList.contains("cell--dying")
    );
  }

  beforeEach(() => {
    el = document.createElement("div");
    createGameOfLife(el, step);
  });

  it("renders initial field", () => {
    expect(el.querySelector(".field") as HTMLDivElement).toBeTruthy();
    expect(
      (el.querySelector(".field") as HTMLDivElement).querySelectorAll(".cell")
        .length
    ).toBe(400);
  });
  it("render button (and toggles it state on click)", () => {
    const button = el.querySelector("button") as HTMLButtonElement;
    expect(button).toBeTruthy();
    expect(button.innerHTML).toBe("Start");

    button.click();
    expect(button.innerHTML).toBe("Stop");
    button.click();
    expect(button.innerHTML).toBe("Start");
  });
  it("changes cell status on cell click", () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    const selector = `.cell[data-y="${y}"][data-x="${x}"]`;
    expect(
      (el.querySelector(selector) as HTMLElement).classList.contains(
        "cell--alive"
      )
    ).toBe(false);
    expect(
      (el.querySelector(selector) as HTMLElement).classList.contains(
        "cell--dead"
      )
    ).toBe(true);

    (el.querySelector(selector) as HTMLElement).click();
    expect(
      (el.querySelector(selector) as HTMLElement).classList.contains(
        "cell--dying"
      )
    ).toBe(true);
    expect(
      (el.querySelector(selector) as HTMLElement).classList.contains(
        "cell--dead"
      )
    ).toBe(false);

    (el.querySelector(selector) as HTMLElement).click();
    expect(
      (el.querySelector(selector) as HTMLElement).classList.contains(
        "cell--alive"
      )
    ).toBe(false);
    expect(
      (el.querySelector(selector) as HTMLElement).classList.contains(
        "cell--dead"
      )
    ).toBe(true);
  });
  it("it changes field state over time (runs game loop) and stops it", async () => {

    clickCell(2, 1);
    clickCell(2, 2);
    clickCell(2, 3);

    expect(isCellAlive(2, 1)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(2, 3)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);

    (el.querySelector("button") as HTMLButtonElement).click();

    await sleep(step);

    expect(isCellAlive(1, 2)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(3, 2)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(2, 1)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(2, 3)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);

    await sleep(step);

    expect(isCellAlive(2, 1)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(2, 3)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);

    (el.querySelector("button") as HTMLButtonElement).click();

    await sleep(20 * step);

    expect(isCellAlive(2, 1)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(2, 3)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);
  });
});
