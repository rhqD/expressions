import { Variable } from "../../core/Variable";
import { asin } from "./asin";

describe('test ArcsineExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 0.5);
    const result = asin(var1);
    expect(result.value).toBeCloseTo(30);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 30);
    const result = asin(var1);
    expect(result.toString()).toBe('arcsin(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 0.5);
    const result = asin(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative.toString()).toBe('(1 - x ^ 2) ^ -0.5');
    expect(partialDerivative.value).toBeCloseTo(0.75 ** -0.5);
  });
});