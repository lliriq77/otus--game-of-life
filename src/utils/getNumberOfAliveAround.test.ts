import { getNumberOfAliveAround } from "./getNumberOfAliveAround";

describe("getNumberOfAliveAround", () => {
  const field: number[][] = [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];

  it("returns number with normal params", () => {
    expect(typeof getNumberOfAliveAround(field, 1, 1)).toBe("number");
  });
  it("returns valid number for coordinates inside field", () => {
    expect(getNumberOfAliveAround(field, 1, 1)).toBe(6);
    expect(getNumberOfAliveAround(field, 2, 1)).toBe(5);
    expect(getNumberOfAliveAround(field, 1, 2)).toBe(6);
    expect(getNumberOfAliveAround(field, 2, 2)).toBe(6);
  });
  it("returns valid number for field border", () => {
    expect(getNumberOfAliveAround(field, 0, 0)).toBe(1);
    expect(getNumberOfAliveAround(field, 0, 1)).toBe(3);
    expect(getNumberOfAliveAround(field, 0, 2)).toBe(3);
    expect(getNumberOfAliveAround(field, 0, 3)).toBe(3);
    expect(getNumberOfAliveAround(field, 1, 0)).toBe(2);
    expect(getNumberOfAliveAround(field, 2, 0)).toBe(2);
    expect(getNumberOfAliveAround(field, 3, 0)).toBe(2);
    expect(getNumberOfAliveAround(field, 3, 1)).toBe(4);
    expect(getNumberOfAliveAround(field, 3, 2)).toBe(4);
    expect(getNumberOfAliveAround(field, 3, 3)).toBe(3);
    expect(getNumberOfAliveAround(field, 1, 3)).toBe(5);
    expect(getNumberOfAliveAround(field, 2, 3)).toBe(5);
  });
  it("returns valid number for field outside", () => {
    expect(getNumberOfAliveAround(field, -1, -1)).toBe(0);
    expect(getNumberOfAliveAround(field, -1, 2)).toBe(2);
    expect(getNumberOfAliveAround(field, -1, 3)).toBe(2);
    expect(getNumberOfAliveAround(field, -1, 4)).toBe(1);
    expect(getNumberOfAliveAround(field, -1, 5)).toBe(0);
    expect(getNumberOfAliveAround(field, 4, 4)).toBe(1);
    expect(getNumberOfAliveAround(field, 4, -1)).toBe(0);
    expect(getNumberOfAliveAround(field, 100, -100)).toBe(0);
  });
});
