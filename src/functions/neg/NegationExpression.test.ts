import { Constant } from "../../core/Expression";
import { Variable } from "../../core/Variable";
import { neg } from "./neg";

describe('test NegationExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 30);
    const result = neg(var1);
    expect(result.value).toBe(-30);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 30);
    const result = neg(var1);
    expect(result.toString()).toBe('-(x)');
  });

  it('should correctly calculate partial derivatives', () => {
    const var1 = new Variable('x', 30);
    const result = neg(var1);
    const partialDerivative = result.deriv(var1);
    expect(partialDerivative).toBe(Constant.from(-1));
    expect(partialDerivative.value).toBe(-1);
  });
});