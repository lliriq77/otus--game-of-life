export function getNextCellState(state: boolean, neighbors: number): boolean {
  if (state === false && neighbors === 3) {
    return true;
  }
  // if (state === true && (neighbors === 2 || neighbors === 3)) {
  //   return true;
  // }
  // return false;
  return state === true && (neighbors === 2 || neighbors === 3);
}
