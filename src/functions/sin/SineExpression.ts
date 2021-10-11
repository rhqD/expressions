import { Expression, UnaryExpression } from "../../core/Expression";
import memoize from "lodash/memoize";
import { cos } from "../cos";
import { degreeToRadian } from "../../common/utils";

export class SineExpression extends UnaryExpression {
  static from = memoize((x: Expression) => new SineExpression(x));

  priority = Infinity;

  opName = 'sin';

  calculateValue = (x: number) => Math.sin(degreeToRadian(x));

  getChildDerivatives = (x: Expression) => ([cos(x)])
}