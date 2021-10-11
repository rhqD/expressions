import { Expression } from "../../core/Expression";
import { SigmodExpression } from "./SigmodExpression";

export const sigmod = (x: Expression) => SigmodExpression.from(x);