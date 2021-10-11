import { Expression, SummationExpression } from "../../core/Expression";

export const sum = (...exps: Expression[]) => {
  return SummationExpression.from(...exps);
}