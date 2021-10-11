import { Variable } from "../../core/Variable";
import { sin } from "./sin";

describe('test SineExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 30);
    const result = sin(var1);
    expect(result.value).toBeCloseTo(0.5);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 30);
    const result = sin(var1);
    expect(result.toString()).toBe('sin(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 30);
    const result = sin(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative.toString()).toBe('cos(x)');
    expect(partialDerivative.value).toBeCloseTo((3 ** 0.5) / 2);
  });
});