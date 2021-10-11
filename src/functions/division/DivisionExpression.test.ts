import { Variable } from "../../core/Variable";
import { div } from "./div";

describe('DivisionExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 5);
    const result = div(var1, var2);
    expect(result.value).toBe(2);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 8);
    const result = div(var1, var2);
    expect(result.toString()).toBe('x ÷ y');
  });

  it('should correctly calculate both partial derivatives', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 8);
    const result = div(var1, var2);
    const partialDerivative1 = result.deriv(var1);
    const partialDerivative2 = result.deriv(var2);
    expect(partialDerivative1.toString()).toBe('y ^ -1');
    expect(partialDerivative2.toString()).toBe('x * y ^ -2');
    expect(partialDerivative1.value).toBe(1 / 8);
    expect(partialDerivative2.value).toBe(10 * (8 ** -2));
  });
});