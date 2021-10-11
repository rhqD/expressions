import { Constant, Expression, MultiplicationExpression, SummationExpression } from "./Expression";
import { Variable } from "./Variable";

describe('Test Expression', () => {
  it('should init children from constructor param array', () => {
    const var1 = new Variable('x', 1);
    const var2 = new Variable('y', 2);
    const var3 = new Variable('z', 3);
    const exp = new Expression(var1, var2, var3);
    expect((exp as any).children.length).toBe(3)
    expect((exp as any).children[0]).toBe(var1)
    expect((exp as any).children[1]).toBe(var2)
    expect((exp as any).children[2]).toBe(var3)
    expect((var1 as any).fathers).toEqual([exp]);
    expect((var2 as any).fathers).toEqual([exp]);
    expect((var3 as any).fathers).toEqual([exp]);
  });

  it('should throw Error when try to get value without all leaf node having value', () => {
    const var1 = new Variable('x');
    const var2 = new Variable('y');
    const var3 = new Variable('z');
    const exp = new Expression(var1, var2, var3);
    var1.value = 1;
    var2.value = 2;
    expect(() => exp.value).toThrow('variable z has no value');
  });

  it('should throw Error when try to get value on a abstract node', () => {
    const var1 = new Variable('x');
    const var2 = new Variable('y');
    const var3 = new Variable('z');
    const exp = new Expression(var1, var2, var3);
    var1.value = 1;
    var2.value = 2;
    var3.value = 3;
    expect(() => exp.value).toThrow('calculateValue not implemented');
  });

  it('should init isDirty as true except for leaf nodes', () => {
    const var1 = new Variable('x', 1);
    const var2 = Constant.from(2);
    const var3 = new Variable('z', 3);
    const var4 = new Variable('w', 4);
    const varA = new Expression(var1, var2);
    const varB = new Expression(var3, var4);
    const top = new Expression(varA, varB);
    expect((var1 as any).isDirty).toBe(false);
    expect((var2 as any).isDirty).toBe(false);
    expect((var3 as any).isDirty).toBe(false);
    expect((var4 as any).isDirty).toBe(false);
    expect((varA as any).isDirty).toBe(true);
    expect((varB as any).isDirty).toBe(true);
    expect((top as any).isDirty).toBe(true);
  });

  it('should mark all nodes as not dirty after evaluating value on top node', () => {
    const var1 = new Variable('x', 1);
    const var2 = Constant.from(2);
    const var3 = new Variable('z', 3);
    const var4 = new Variable('w', 4);
    const varA = new SummationExpression(var1, var2);
    const varB = new SummationExpression(var3, var4);
    const top = new MultiplicationExpression(varA, varB);
    expect(top.value).toBe(21);
    expect((var1 as any).isDirty).toBe(false);
    expect((var2 as any).isDirty).toBe(false);
    expect((var3 as any).isDirty).toBe(false);
    expect((var4 as any).isDirty).toBe(false);
    expect((varA as any).isDirty).toBe(false);
    expect((varB as any).isDirty).toBe(false);
    expect((top as any).isDirty).toBe(false);
  });

  it('should spread dirty to all ancestor', () => {
    const var1 = new Variable('x', 1);
    const var2 = Constant.from(2);
    const var3 = new Variable('z', 3);
    const var4 = new Variable('w', 4);
    const varA = new SummationExpression(var1, var2);
    const varB = new SummationExpression(var3, var4);
    const top = new MultiplicationExpression(varA, varB);
    expect(top.value).toBe(21);
    var1.value = 3;
    expect((var1 as any).isDirty).toBe(false);
    expect((var2 as any).isDirty).toBe(false);
    expect((var3 as any).isDirty).toBe(false);
    expect((var4 as any).isDirty).toBe(false);
    expect((varA as any).isDirty).toBe(true);
    expect((varB as any).isDirty).toBe(false);
    expect((top as any).isDirty).toBe(true);
    expect(top.value).toBe(35);
    expect((var1 as any).isDirty).toBe(false);
    expect((var2 as any).isDirty).toBe(false);
    expect((var3 as any).isDirty).toBe(false);
    expect((var4 as any).isDirty).toBe(false);
    expect((varA as any).isDirty).toBe(false);
    expect((varB as any).isDirty).toBe(false);
    expect((top as any).isDirty).toBe(false);
  });

  it('should only call calculateValue when necessary', () => {
    const var1 = new Variable('x', 1);
    const var2 = Constant.from(2);
    const var3 = new Variable('z', 3);
    const var4 = new Variable('w', 4);
    const varA = new SummationExpression(var1, var2);
    const varB = new SummationExpression(var3, var4);
    const top = new MultiplicationExpression(varA, varB);
    const spyTop = jest.spyOn((top as any), 'calculateValue');
    const spyA = jest.spyOn((varA as any), 'calculateValue');
    const spyB = jest.spyOn((varB as any), 'calculateValue');
    expect(top.value).toBe(21);
    expect(top.value).toBe(21);
    expect(spyTop).toBeCalledTimes(1);
    expect(spyA).toBeCalledTimes(1);
    expect(spyB).toBeCalledTimes(1);
    var1.value = 2;
    expect(top.value).toBe(28);
    expect(spyTop).toBeCalledTimes(2);
    expect(spyA).toBeCalledTimes(2);
    expect(spyB).toBeCalledTimes(1);
  });

  it('should call correctly calculate value for expression with constant', () => {
    const var1 = new Variable('x', 1);
    const var2 = Constant.from(2);
    const var3 = new Variable('y', 3);
    const var4 = Constant.from(4);
    const varA = new SummationExpression(var1, var2);
    const varB = new SummationExpression(var3, var4);
    const top = new MultiplicationExpression(varA, varB);
    expect(top.value).toBe(21);
  });

  it('should correctly calculate summation of one variable', () => {
    const var1 = new Variable('x', 10);
    const summation = new SummationExpression(var1);
    expect(summation.value).toBe(10);
  });

  it('should correctly calculate summation of two variables', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 12);
    const summation = new SummationExpression(var1, var2);
    expect(summation.value).toBe(22);
  });

  it('should correctly calculate summation of three variables', () => {
    const var1 = new Variable('x', 10);
    const var2 = new Variable('y', 12);
    const var3 = new Variable('z', 7);
    const summation = new SummationExpression(var1, var2, var3);
    expect(summation.value).toBe(29);
  });
});