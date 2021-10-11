import { Variable } from "../../core/Variable";
import { sigmod } from "./sigmod";

describe('test SigmodExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 2);
    const result = sigmod(var1);
    expect(result.value).toBeCloseTo(1 / (1 + Math.exp(-2)));
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 2);
    const result = sigmod(var1);
    expect(result.toString()).toBe('sigmod(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 30);
    const result = sigmod(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative.toString()).toBe('(sigmod(x)) * (1 - sigmod(x))');
    expect(partialDerivative.value).toBeCloseTo(result.value * (1 - result.value));
  });
});