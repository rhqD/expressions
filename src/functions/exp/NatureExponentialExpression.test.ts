import { Variable } from "../../core/Variable";
import { exp } from "./exp";

describe('test NatureExponentialExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 2);
    const result = exp(var1);
    expect(result.value).toBe(Math.exp(2));
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 2);
    const result = exp(var1);
    expect(result.toString()).toBe('exp(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 10);
    const result = exp(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative).toBe(result);
  });
});