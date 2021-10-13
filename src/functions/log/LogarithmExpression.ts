import { memorizeBinaryFunction } from "../../common/utils";
import { BinaryExpression, Constant, Expression } from "../../core/Expression";
import { ln } from "../ln";
import { mul } from "../multiply";
import { pow } from "../pow";

export class LogarithmExpression extends BinaryExpression {
  static from = memorizeBinaryFunction((x: Expression, y: Expression) => {
    return new LogarithmExpression(x, y);
  });

  priority = Infinity;

  calculateValue = (x: number, y: number) => Math.log(y) / Math.log(x);

  getChildDerivatives = (x: Expression, y: Expression): Expression[] => {
    return [
      mul(ln(y), pow(ln(x), Constant.from(-2)), pow(x, Constant.from(-1))),
      pow(mul(ln(x), y), Constant.from(-1))
    ];
  }

  toString = () => {
    const [x, y] = this.children;
    return `log(${this.childToString(x)}, ${this.childToString(y)})`;
  }
}