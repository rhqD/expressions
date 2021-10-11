import { Expression, UnaryExpression } from "../../core/Expression";
import memoize from "lodash/memoize";
import { neg } from "../neg";
import { sin } from "../sin";
import { degreeToRadian } from "../../common/utils";

export class CosineExpression extends UnaryExpression {
  static from = memoize((x: Expression) => new CosineExpression(x));

  priority = Infinity;

  opName = 'cos';

  calculateValue = (x: number) => Math.cos(degreeToRadian(x));

  getChildDerivatives = (x: Expression): Expression[] => ([neg(sin(x))])
}