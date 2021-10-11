import { Expression } from "../../core/Expression";
import { HyperbolicTangentExpression } from "./HyperbolicTangentExpression";

export const tanh = (x: Expression) => HyperbolicTangentExpression.from(x); 