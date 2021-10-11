import memoize from "lodash/memoize";
import { degreeToRadian } from "../../common/utils";
import { Constant, Expression, UnaryExpression } from "../../core/Expression";
import { cos } from "../cos";
import { pow } from "../pow";

// const tan = (x) => {
//   const p = new Node({
//     op: Math.tan,
//     opName: 'tan',
//     varbs: [x],
//     diffGetters: [(x) => (pow(cos(x), Node.constant(-2)))],
//     priority: Infinity
//   });
//   p.toExpression = () => (`tan(${p.varbs[0].toExpression()})`);
//   return p;
// };

export class TangentExpression extends UnaryExpression {
  static from = memoize((x: Expression) => new TangentExpression(x));

  opName = 'tan';
  
  priority = Infinity;

  calculateValue = (x: number) => Math.tan(degreeToRadian(x));

  getChildDerivatives = (x: Expression) => [pow(cos(x), Constant.from(-2))]
}