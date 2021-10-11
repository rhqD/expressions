
// const tanh = (x) => {
  //   const p = new Node({
  //     op: (v) => (Math.sinh(v) / Math.cosh(v)),
  //     opName: 'tanh',
  //     varbs: [x],
  //     diffGetters: [(x) => (minus(Node.constant(1), square(p)))],
  //     priority: Infinity
  //   });
  //   p.toExpression = () => (`tanh(${p.varbs[0].toExpression()})`);
  //   return p;
  // };

import { memoize } from "lodash";
import { degreeToRadian } from "../../common/utils";
import { Constant, Expression, UnaryExpression } from "../../core/Expression";
import { pow } from "../pow";
import { sub } from "../subtraction";

export class HyperbolicTangentExpression extends UnaryExpression {
  static from = memoize((x: Expression) => new HyperbolicTangentExpression(x));

  opName = 'tanh';

  priority = Infinity;

  calculateValue = (x: number) => Math.tanh(x)

  getChildDerivatives = (x: Expression): Expression[] => [sub(Constant.from(1), pow(this, Constant.from(2)))]
}