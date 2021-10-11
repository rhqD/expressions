import { isConstant0 } from "../../common/utils";
import { BinaryExpression, Constant, Expression } from "../../core/Expression";
import { neg } from "../neg";

export class SubtractionExpression extends BinaryExpression {
  static from = (a: Expression, b: Expression) => {
    if (a.isConstant && b.isConstant) return Constant.from(a.value - b.value);
    if (isConstant0(b)) return a;
    if (isConstant0(a)) return neg(b);
    return new SubtractionExpression(a, b);
  }

  protected opName: string = '-';
  public priority = 1;
  protected calculateValue = (a: number, b: number) => {
    return a - b;
  }

  protected getChildDerivatives = () => {
    return [Constant.from(1), Constant.from(-1)];
  }
}