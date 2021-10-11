import { Expression } from "../../core/Expression";
import { NegationExpression } from "./NegationExpression";

export const neg = (x: Expression) => NegationExpression.from(x);