import { isConstant0, isConstant1, memorizeBinaryFunction } from "../../common/utils";
import { BinaryExpression, Constant, Expression } from "../../core/Expression";
import { ln } from "../ln";
import { mul } from "../multiply";
import { sub } from "../subtraction";
import { pow } from "./pow";

export class PowerExpression extends BinaryExpression {
  static from = memorizeBinaryFunction((x: Expression, y: Expression) => {
    if (isConstant1(y)) {
      return x;
    }
    if (isConstant0(y)) {
      return Constant.from(1);
    }
    if (isConstant0(x)) {
      return Constant.from(0);
    }
    if (isConstant1(x)) {
      return Constant.from(1);
    }
    return new PowerExpression(x, y);
  });
  opName = '^';
  priority = Infinity;

  calculateValue = (a: number, b: number) => a ** b;

  getChildDerivatives = (x: Expression, y: Expression): Expression[] => {
    return [
      mul(y, pow(x, sub(y, Constant.from(1)))),
      mul(ln(x), pow(x, y))
    ];
  }
}