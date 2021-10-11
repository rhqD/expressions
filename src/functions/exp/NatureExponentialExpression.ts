import { memoize } from "lodash";
import { Expression, UnaryExpression } from "../../core/Expression";
import { exp } from "./exp";

export class NatureExponentialExpression extends UnaryExpression {
  static from = memoize((x: Expression) => new NatureExponentialExpression(x));

  opName = 'exp';

  priority = Infinity;

  calculateValue = (x: number) => Math.exp(x);

  getChildDerivatives = (x: Expression) => [exp(x)]
}