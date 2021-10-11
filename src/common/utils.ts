import memoize from "lodash/memoize";
import { Expression } from "../core/Expression";

export const isConstant1 = (exp: Expression) => exp.isConstant && exp.value === 1;

export const isConstant0 = (exp: Expression) => exp.isConstant && exp.value === 0;

type BinaryFunctionMemorizer = <P1, P2, R> (func: (a: P1, b: P2) => R) => (a: P1, b: P2) => R;

export const memorizeBinaryFunction: BinaryFunctionMemorizer = (func) => {
  const curriedFunc = memoize((a: any) => memoize((b: any) => func(a, b)));
  return (a, b) => curriedFunc(a)(b);
}

export const degreeToRadian = (angleInDegree: number) => angleInDegree * Math.PI / 180;

export const radianToDegree = (angleInRadian: number) => angleInRadian * 180 / Math.PI;