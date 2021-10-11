import { Expression } from "../../core/Expression";
import { NapierianLogarithmExpression } from "./NapierianLogarithmExpression";

export const ln = (x: Expression) => NapierianLogarithmExpression.from(x);