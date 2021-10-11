import { Variable } from "../../core/Variable";
import { SubtractionExpression } from "./SubtractionExpression";

describe('test SubtractionExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 8);
    const result = new SubtractionExpression(var1, var2);
    expect(result.value).toBe(2);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 8);
    const result = new SubtractionExpression(var1, var2);
    expect(result.toString()).toBe('x - y');
  });

  it('should correctly calculate both partial derivatives', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 8);
    const result = SubtractionExpression.from(var1, var2);
    const partialDerivative1 = result.deriv(var1);
    const partialDerivative2 = result.deriv(var2);
    expect(partialDerivative1.isConstant).toBe(true);
    expect(partialDerivative2.isConstant).toBe(true);
    expect(partialDerivative1.value).toBe(1);
    expect(partialDerivative2.value).toBe(-1);
  });
});