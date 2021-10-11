import { Variable } from "../../core/Variable";
import { pow } from "./pow";

describe('test PowerExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 2);
    const var2 = new Variable('y', 3);
    const result = pow(var1, var2);
    expect(result.value).toBe(8);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 8);
    const result = pow(var1, var2);
    expect(result.toString()).toBe('x ^ y');
  });

  it('should correctly calculate both partial derivatives', () => {
    const var1 = new Variable('x', 2);
    const var2 = new Variable('y', 3);
    const result = pow(var1, var2);
    const partialDerivative1 = result.deriv(var1);
    const partialDerivative2 = result.deriv(var2);
    expect(partialDerivative1.toString()).toBe('y * x ^ (y - 1)');
    expect(partialDerivative2.toString()).toBe('ln(x) * x ^ y');
    expect(partialDerivative1.value).toBe(12);
    expect(partialDerivative2.value).toBe(Math.log(2) * 8);
  });
});