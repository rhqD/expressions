import memoize from "lodash/memoize";
import { radianToDegree } from "../../common/utils";
import { Constant, Expression, UnaryExpression } from "../../core/Expression";
import { pow } from "../pow";
import { sub } from "../subtraction";

// const arcsin = (x) => {
//   const p = new Node({
//     op: Math.asin,
//     opName: 'asin',
//     varbs: [x],
//     diffGetters: [(x) => (div(Node.constant(1), pow(minus(Node.constant(1), pow(x, Node.constant(2))), Node.constant(0.5))))],
//     priority: Infinity
//   });
//   p.toExpression = () => (`arcsin(${p.varbs[0].toExpression()})`);
//   return p;
// };

export class ArcsineExpression extends UnaryExpression {
  static from = memoize((x: Expression) => new ArcsineExpression(x));

  opName = 'arcsin'

  priority = Infinity;

  calculateValue = (x: number) => radianToDegree(Math.asin(x));

  getChildDerivatives = (x: Expression) => [pow(sub(Constant.from(1), pow(x, Constant.from(2))), Constant.from(-0.5))]
}