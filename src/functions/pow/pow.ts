import { Expression } from "../../core/Expression";
import { PowerExpression } from "./PowerExpression";

export const pow = (x: Expression, y: Expression) => PowerExpression.from(x, y);