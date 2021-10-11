import memoize from "lodash/memoize";
import { Constant, Expression, UnaryExpression } from "../../core/Expression";
import { PowerExpression } from "../pow/PowerExpression";

export class NapierianLogarithmExpression extends UnaryExpression {
  static from = memoize((x: Expression) => {
    return new NapierianLogarithmExpression(x);
  })

  opName = 'ln';

  priority = Infinity;

  calculateValue = (x: number) => Math.log(x);

  getChildDerivatives = (x: Expression) => {
    return [PowerExpression.from(x, Constant.from(-1))];
  }
}