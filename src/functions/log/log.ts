import { Expression } from "../../core/Expression";
import { LogarithmExpression } from "./LogarithmExpression";

export const log = (a: Expression, b: Expression) => LogarithmExpression.from(a, b);