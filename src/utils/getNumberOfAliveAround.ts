export function getNumberOfAliveAround(
  field: number[][],
  x: number,
  y: number
) {
  /**
   * x - 1, y - 1
   * x , y - 1
   * x + 1, y - 1
   * x - 1, y
   * x + 1, y
   * x - 1, y + 1
   * x, y + 1
   * x + 1, y + 1
   */
  let num = 0;
  if (y - 1 >= 0 && y - 1 < field.length) {
    num += field[y - 1][x - 1] || 0;
    num += field[y - 1][x] || 0;
    num += field[y - 1][x + 1] || 0;
  }
  if (y >= 0 && y < field.length) {
    num += field[y][x - 1] || 0;
    num += field[y][x + 1] || 0;
  }
  if (y + 1 >= 0 && y + 1 < field.length) {
    num += field[y + 1][x - 1] || 0;
    num += field[y + 1][x] || 0;
    num += field[y + 1][x + 1] || 0;
  }
  return num;
}
