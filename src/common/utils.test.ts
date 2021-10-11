import { memorizeBinaryFunction } from "./utils";

describe('test utils', () => {
  it('memorizeBinaryFunction', () => {
    const test = jest.fn((a: number, b: number) => Math.random());
    const memorizedTest = memorizeBinaryFunction(test);
    const result1 = memorizedTest(1, 2);
    const result2 = memorizedTest(1, 2);
    expect(result1).toBe(result2);
    expect(test).toBeCalledTimes(1);
  });
});