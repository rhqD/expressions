import { Expression } from "../../core/Expression";
import { SubtractionExpression } from "./SubtractionExpression";

export const sub = (a: Expression, b: Expression) => {
  return SubtractionExpression.from(a, b);
}