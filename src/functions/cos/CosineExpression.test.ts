import { Variable } from "../../core/Variable";
import { cos } from "./cos";

describe('test CosineExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 30);
    const result = cos(var1);
    expect(result.value).toBeCloseTo(3 ** 0.5 / 2);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 30);
    const result = cos(var1);
    expect(result.toString()).toBe('cos(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 30);
    const result = cos(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative.toString()).toBe('-(sin(x))');
    expect(partialDerivative.value).toBeCloseTo(-0.5);
  });
});