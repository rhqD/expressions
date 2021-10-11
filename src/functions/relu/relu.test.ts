import { Variable } from "../../core/Variable";
import { relu } from "./relu";

describe('test relu', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x');
    const result = relu(var1);
    var1.value = -1;
    expect(result.value).toBe(0);
    var1.value = 10;
    expect(result.value).toBe(10);
  });

  it('should correctly toString', () => {
    const var1 = new Variable('x');
    const result = relu(var1);
    expect(result.toString()).toBe('@');
  });

  it('should correctly calculate derivative', () => {
    const var1 = new Variable('x');
    const result = relu(var1);
    const derivative = result.deriv(var1);
    var1.value = -2;
    expect(derivative.value).toBe(0);
    var1.value = 10;
    expect(derivative.value).toBe(1);
  });
});