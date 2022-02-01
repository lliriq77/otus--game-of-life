import { getNumberOfAliveAround } from "./getNumberOfAliveAround";

export function drawField(
  el: HTMLElement,
  field: number[][],
  onCellClick: (a: number, b: number, c: boolean) => void
): void {
  el.innerHTML = "";

  const table: HTMLTableElement = document.createElement("table");

  field.forEach((row, y) => {
    const tr: HTMLTableRowElement = document.createElement("tr");

    row.forEach((cell, x) => {
      const td: HTMLTableCellElement = document.createElement("td");

      td.classList.add("cell");
      td.classList.add(
        cell === 0
          ? "cell--dead"
          : getNumberOfAliveAround(field, x, y) === 2 ||
            getNumberOfAliveAround(field, x, y) === 3
          ? "cell--alive"
          : "cell--dying"
      );
      td.dataset.x = `${x}`;
      td.dataset.y = `${y}`;
      tr.append(td);
    });
    table.append(tr);
  });

  table.addEventListener("click", (evt) => {
    const element = <HTMLElement>evt.target;

    if (element.classList.contains("cell")) {
      const isAlive: boolean =
        element.classList.contains("cell--alive") ||
        element.classList.contains("cell--dying");

      onCellClick(
        Number(element.dataset.x),
        Number(element.dataset.y),
        isAlive
      );
    }
  });
  el.append(table);
}
