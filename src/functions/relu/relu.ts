import { Constant, Expression, PiecedExpression } from "../../core/Expression";

export const relu = (x: Expression) => {
  return new PiecedExpression([
    {
      range: (value: number) => value <= 0,
      expression: Constant.from(0),
    }, {
      range: (value: number) => value > 0,
      expression: x,
    }
  ], [x]);
};