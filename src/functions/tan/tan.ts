import { Expression } from "../../core/Expression";
import { TangentExpression } from "./TangentExpression";

export const tan = (x: Expression) => TangentExpression.from(x);