import { Variable } from "../../core/Variable";
import { tan } from "./tan";

describe('test TangentExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 45);
    const result = tan(var1);
    expect(result.value).toBeCloseTo(1);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x');
    const result = tan(var1);
    expect(result.toString()).toBe('tan(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 45);
    const result = tan(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative.toString()).toBe('(cos(x)) ^ -2');
    expect(partialDerivative.value).toBeCloseTo(2);
  });
});