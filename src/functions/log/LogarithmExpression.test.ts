import { Variable } from "../../core/Variable";
import { log } from "./log";

describe('LogarithmExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 2);
    const var2 = new Variable('y', 8);
    const result = log(var1, var2);
    expect(result.value).toBe(3);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 2);
    const var2 = new Variable('y', 8);
    const result = log(var1, var2);
    expect(result.toString()).toBe('log(x, y)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 2);
    const var2 = new Variable('y', 8);
    const result = log(var1, var2);
    const partialDerivative1 = result.deriv(var1);
    const partialDerivative2 = result.deriv(var2);
    expect(partialDerivative1.toString()).toBe('ln(y) * (ln(x)) ^ -2 * x ^ -1');
    expect(partialDerivative2.toString()).toBe('(ln(x) * y) ^ -1');
    expect(partialDerivative1.value).toBe(Math.log(8) * (Math.log(2) ** -2) * 0.5);
    expect(partialDerivative2.value).toBe((Math.log(2) * 8) ** -1);
  });
});