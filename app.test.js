import { add, getColor } from "./app";

test("add test", () => {
  expect(add(1, 2)).toBe(3);
});

describe("check color range", () => {
  test.each([1, 2, 3, 4])("testing group %p", (group) => {
    const color = getColor(group);
    for (let i = 0; i < 3; i += 1) {
      expect(color[i]).toBeGreaterThanOrEqual(0);
      expect(color[i]).toBeLessThan(256);
    }
  });
});
