import { Variable } from "../../core/Variable";
import { mul } from "./mul";

describe('MultiplicationExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 2);
    const var3 = new Variable('z', 3);
    const result = mul(var1, var2, var3);
    expect(result.value).toBe(60);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 2);
    const var3 = new Variable('z', 3);
    const result = mul(var1, var2, var3);
    expect(result.toString()).toBe('x * y * z');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 2);
    const var3 = new Variable('z', 3);
    const result = mul(var1, var2, var3);
    const partialDerivative1 = result.deriv(var1);
    const partialDerivative2 = result.deriv(var2);
    const partialDerivative3 = result.deriv(var3);
    expect(partialDerivative1.toString()).toBe('y * z');
    expect(partialDerivative2.toString()).toBe('x * z');
    expect(partialDerivative3.toString()).toBe('x * y');
    expect(partialDerivative1.value).toBe(6);
    expect(partialDerivative2.value).toBe(30);
    expect(partialDerivative3.value).toBe(20);
  });
});