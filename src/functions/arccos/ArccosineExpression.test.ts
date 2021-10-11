import { Variable } from "../../core/Variable";
import { acos } from "./acos";

describe('test ArccosineExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 0.5);
    const result = acos(var1);
    expect(result.value).toBeCloseTo(60);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 30);
    const result = acos(var1);
    expect(result.toString()).toBe('arccos(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 0.5);
    const result = acos(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative.toString()).toBe('-((1 - x ^ 2) ^ -0.5)');
    expect(partialDerivative.value).toBeCloseTo(-(0.75 ** -0.5));
  });
});