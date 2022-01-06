import { getNextGeneration } from "./getNextGeneration";

describe("getNextGeneration", () => {
  it("is a function", () => {
    expect(getNextGeneration).toBeInstanceOf(Function);
  });

  it("returns new state", () => {
    expect(
      getNextGeneration([
        [0, 0],
        [0, 0],
      ])
    ).toEqual([
      [0, 0],
      [0, 0],
    ]);

    expect(
      getNextGeneration([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ])
    ).toEqual([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]);
  });

  it("returns completely new state", () => {
    const oldState: number[][] = [
      [0, 0],
      [0, 0],
    ];
    const newState: number[][] = getNextGeneration(oldState);
    expect(newState).not.toBe(oldState);
    expect(newState[0] !== oldState[0]).toBe(true);
    expect(newState[1] !== oldState[1]).toBe(true);
  });

  it("returns new state (more cases)", () => {
    expect(
      getNextGeneration([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ])
    ).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]);

    expect(
      getNextGeneration([
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ])
    ).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
