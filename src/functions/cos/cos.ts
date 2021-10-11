import { Expression } from "../../core/Expression";
import { CosineExpression } from "./CosineExpression";

export const cos = (x: Expression) => CosineExpression.from(x);