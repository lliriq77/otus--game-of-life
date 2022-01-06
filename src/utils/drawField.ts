export function drawField(
  el: HTMLElement,
  field: number[][],
  onCellClick: (a: number, b: number, c: boolean) => void
) {
  el.innerHTML = "";

  const table: HTMLTableElement = document.createElement("table");

  field.forEach((row, y) => {
    const tr: HTMLTableRowElement = document.createElement("tr");

    row.forEach((cell, x) => {
      const td: HTMLTableCellElement = document.createElement("td");

      td.classList.add("cell");
      td.classList.add(cell === 0 ? "cell--dead" : "cell--alive");
      td.dataset.x = `${x}`;
      td.dataset.y = `${y}`;
      tr.append(td);
    });
    table.append(tr);
  });

  table.addEventListener("click", (evt) => {
    const element = <HTMLElement>evt.target;

    if (element.classList.contains("cell")) {
      const isAlive: boolean = element.classList.contains("cell--alive");

      onCellClick(
        Number(element.dataset.x),
        Number(element.dataset.y),
        isAlive
      );
    }
  });
  el.append(table);
}
