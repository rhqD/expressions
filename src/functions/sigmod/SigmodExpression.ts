import { memoize } from "lodash";
import { Constant, Expression, UnaryExpression } from "../../core/Expression";
import { mul } from "../multiply";
import { sub } from "../subtraction";

export class SigmodExpression extends UnaryExpression {
  static from = memoize((x: Expression) => new SigmodExpression(x));

  opName = 'sigmod';

  priority = 10;

  calculateValue = (x: number) => 1 / (1 + Math.exp(-x))

  getChildDerivatives = (x: Expression): Expression[] => [mul(this, sub(Constant.from(1), this))];
}