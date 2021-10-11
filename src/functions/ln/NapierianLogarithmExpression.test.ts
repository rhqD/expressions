import { Variable } from "../../core/Variable";
import { ln } from "./ln";

describe('NapierianLogarithmExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 10);
    const result = ln(var1);
    expect(result.value).toBe(Math.log(10));
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x');
    const result = ln(var1);
    expect(result.toString()).toBe('ln(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 10);
    const result = ln(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative.toString()).toBe('x ^ -1');
    expect(partialDerivative.value).toBe(1 / 10);
  });
});