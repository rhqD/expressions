import { memoize } from "lodash";
import { Constant, Expression } from "../../core/Expression";
import { pow } from "../pow";

export const square = memoize((x: Expression) => pow(x, Constant.from(2)));