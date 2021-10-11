import memoize from "lodash/memoize";
import { radianToDegree } from "../../common/utils";
import { Constant, Expression, UnaryExpression } from "../../core/Expression";
import { neg } from "../neg";
import { pow } from "../pow";
import { sub } from "../subtraction";

export class ArccosineExpression extends UnaryExpression {
  static from = memoize((x: Expression) => new ArccosineExpression(x));

  opName = 'arccos';

  priority = Infinity;

  calculateValue = (x: number) => radianToDegree(Math.acos(x));

  getChildDerivatives = (x: Expression) => ([neg(pow(sub(Constant.from(1), pow(x, Constant.from(2))), Constant.from(-0.5)))])
}