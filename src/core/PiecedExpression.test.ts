import { exp } from "../functions/exp";
import { square } from "../functions/square/square";
import { PiecedExpression, Piece } from "./Expression";
import { Variable } from "./Variable";

describe('PiecedExpression', () => {
  it('should correctly calculate value', () => {
    const var1 = new Variable('x');
    const var2 = exp(var1);
    const var3 = square(var1);
    const piecedExpression = new PiecedExpression([
      {
        range: (x: number) => x > 3,
        expression: var2,
      },
      {
        range: (x: number) => x <= 3,
        expression: var3,
      }
    ], [ var1 ]);
    var1.value = 3;
    expect(piecedExpression.value).toBe(9);
    var1.value = 4;
    expect(piecedExpression.value).toBeCloseTo(Math.E ** 4);
    var1.value = 2;
    expect(piecedExpression.value).toBe(4);
  });

  it('should correctly calculate derivatives', () => {
    const var1 = new Variable('x');
    const var2 = exp(var1);
    const var3 = square(var1);
    const piecedExpression = new PiecedExpression([
      {
        range: (x: number) => x > 3,
        expression: var2,
      },
      {
        range: (x: number) => x <= 3,
        expression: var3,
      }
    ], [ var1 ]);
    const derivative = piecedExpression.deriv(var1);
    const [piece1, piece2] = (derivative as any).pieces as Piece[];
    expect(piece1.expression.toString()).toBe('exp(x)');
    expect(piece2.expression.toString()).toBe('2 * x');
    var1.value = 3;
    expect(derivative.value).toBe(6);
    var1.value = 4;
    expect(derivative.value).toBeCloseTo(Math.E ** 4);
    var1.value = 2;
    expect(derivative.value).toBe(4);
  });
});