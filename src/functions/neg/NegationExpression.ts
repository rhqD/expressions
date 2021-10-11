import { Constant, Expression, UnaryExpression } from "../../core/Expression";
import memoize from "lodash/memoize";

export class NegationExpression extends UnaryExpression {
  static from = memoize((x: Expression) => new NegationExpression(x));

  priority = 100;

  opName = '-';

  calculateValue = (x: number) => -x;

  getChildDerivatives = (x: Expression) => ([Constant.from(-1)])
}