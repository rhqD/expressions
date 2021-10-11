import { Variable } from "../../core/Variable";
import { tanh } from "./tanh";

describe('test HyperbolicTangentExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 1);
    const result = tanh(var1);
    expect(result.value).toBeCloseTo((Math.exp(1) - Math.exp(-1)) / (Math.exp(1) + Math.exp(-1)));
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x');
    const result = tanh(var1);
    expect(result.toString()).toBe('tanh(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 1);
    const result = tanh(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative.toString()).toBe('1 - (tanh(x)) ^ 2');
    expect(partialDerivative.value).toBeCloseTo(1 - ((Math.exp(1) - Math.exp(-1)) / (Math.exp(1) + Math.exp(-1))) ** 2);
  });
});