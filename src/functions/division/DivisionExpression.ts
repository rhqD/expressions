import { memorizeBinaryFunction } from "../../common/utils";
import { BinaryExpression, Constant, Expression, MultiplicationExpression } from "../../core/Expression";
import { mul } from "../multiply";
import { pow } from "../pow";

export class DivisionExpression extends BinaryExpression {
  static from = memorizeBinaryFunction((x: Expression, y: Expression) => {
    return new DivisionExpression(x, y);
  });

  public priority: number = 10;

  opName = '÷';

  calculateValue = (x: number, y: number) => x / y;

  protected getChildDerivatives = (x: Expression, y: Expression): Expression[] => {
    return [
      pow(y, Constant.from(-1)),
      mul(
        x,
        pow(y, Constant.from(-2))
      )
    ];
  }
}
