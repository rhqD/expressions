import { Expression, MultiplicationExpression } from "../../core/Expression";

export const mul = (...exps: Expression[]) => {
  return MultiplicationExpression.from(...exps);
};