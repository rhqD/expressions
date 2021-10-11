import { Expression } from "../../core/Expression";
import { DivisionExpression } from "./DivisionExpression";

export const div = (x: Expression, y: Expression) => DivisionExpression.from(x, y);