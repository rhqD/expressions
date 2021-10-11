import { uniq, flatten } from 'lodash';
import memoize from 'lodash/memoize';
import sum from 'lodash/sum';
import { isConstant0, isConstant1 } from '../common/utils';

export interface Calculation {
  (...args: number[]): number;
}

export interface IExpression {
  toString: () => string;
  deriv: (node: Expression) => Expression;
  get value(): number;
  isConstant: boolean;
}

export class Expression implements IExpression {
  public fathers?: Expression[] = [];
  public children?: Expression[] = [];
  public priority: number;
  public isConstant: boolean = false;

  // value是否需要重新计算
  protected isDirty: boolean = true;

  protected memo: WeakMap<Expression, Expression> = new WeakMap();

  protected calculateValue = (...values: number[]): number => {
    throw new Error('calculateValue not implemented');
  };
  
  protected _value: number;

  private _childDerivates: Expression[] = null;

  protected get childDerivatives() {
    if (this._childDerivates === null) {
      this._childDerivates = this.getChildDerivatives(...this.children);
    }
    return this._childDerivates;
  };

  protected getChildDerivatives = (...exps: Expression[]): Expression[] => {
    throw new Error('getChildDerivatives not implemented');
  };

  constructor(...children: Expression[]) {
    this.children = children;
    children.forEach(child => child.fathers.push(this));
    this.spreadDirty();
  }

  public static from = (...args: any[]): Expression => {
    throw new Error('from not implemented');
  };
  
  public get value() {
    if (this.isConstant) return this._value;
    if (!this.isDirty) return this._value;
    const values = this.children.map(child => child.value);
    this._value = this.calculateValue(...values);
    this.isDirty = false;
    return this._value;
  }

  //修改叶子节点value后，自下而上传播脏状态
  protected spreadDirty = () => {
    if (this.isDirty) return;
    this.isDirty = true;
    this.fathers.forEach((father: Expression) => {
      father.spreadDirty();
    });
  }

  public toString: () => string = () => {
    throw new Error('not implemented');
  }

  public deriv = (node: Expression): Expression => {
    if (node.isConstant) {
      throw new Error('Derivation from constant is illegal');
    }

    if (this.isConstant) return Constant.from(0);

    //对自己求导
    if (node === this){
      return Constant.from(1);
    }

    const cache = this.memo.get(node);
    if (cache){
      return cache;
    }

    if (node instanceof PiecedExpression) {
      const result = new PiecedExpression(
        (node as PiecedExpression).pieces.map(piece => ({
          ...piece,
          expression: this.deriv(piece.expression),
        })),
        (node as PiecedExpression).rangeVarbs
      );
      this.memo.set(node, result);
      return result;
    }

    const result: Expression = this.children.reduce((res: Expression, curr: Expression, index: number) => {
      return SummationExpression.from(
        res,
        MultiplicationExpression.from(this.childDerivatives[index], curr.deriv(node))
      );
    }, Constant.from(0));
    this.memo.set(node, result);
    return result;
  }
};

export class BinaryExpression extends Expression {
  protected opName: string = '';

  protected childToString = (child: Expression) => {
    if (this.priority >= child.priority) {
      return `(${child.toString()})`;
    }
    return child.toString();
  }

  toString = () => {
    const [a, b] = this.children;
    return `${this.childToString(a)} ${this.opName} ${this.childToString(b)}`;
  }
}

export class UnaryExpression extends Expression {
  protected opName: string = '';

  toString = () => {
    const [a] = this.children;
    return `${this.opName}(${a.toString()})`;
  }
}

export class Constant extends Expression {
  static from = memoize((value: number): Constant => {
    return new Constant(value);
  });

  protected isDirty:boolean = false;

  public isConstant: boolean = true;

  public get value() {
    return this._value;
  }

  constructor(value: number) {
    super();
    this._value = value;
  }

  protected spreadDirty = () => {
    throw new Error('can\'t spread dirty from constant');
  }

  toString = () => {
    return String(this._value);
  }
}

export class SummationExpression extends Expression {
  static from = (...exps: Expression[]) => {
    const expsWithoutConstant0 = exps.filter(exp => !isConstant0(exp));
    if (expsWithoutConstant0.length === 0) return Constant.from(0);
    if (expsWithoutConstant0.length === 1) return expsWithoutConstant0[0];
    return new SummationExpression(...expsWithoutConstant0);
  }

  public priority: number = 1;

  protected calculateValue = (...values: number[]) => {
    return sum(values);
  }

  protected getChildDerivatives = () => {
    return this.children.map(() => Constant.from(1));
  }

  toString = () => {
    return this.children
      .map(child => child.priority < this.priority ? `(${child.toString()})` : child.toString())
      .join(` + `);
  }
}

export class MultiplicationExpression extends Expression {
  static from = (...exps: Expression[]) => {
    if (exps.some(exp => isConstant0(exp))) {
      return Constant.from(0);
    }
    const expsWithoutConstant1 = exps.filter(exp => !isConstant1(exp));
    if (expsWithoutConstant1.length === 0) return Constant.from(1);
    if (expsWithoutConstant1.length === 1) return expsWithoutConstant1[0];
    return new MultiplicationExpression(...expsWithoutConstant1);
  }

  public priority: number = 10;

  protected calculateValue = (...values: number[]) => {
    return values.reduce((result, curr) => result * curr, 1);
  }

  protected getChildDerivatives = () => {
    const { children } = this;
    return children.map((_child, index) => {
      const others = children.slice(0, index).concat(children.slice(index + 1));
      return new MultiplicationExpression(...others);
    });
  }

  toString = () => {
    return this.children
      .map(child => child.priority <= this.priority ? `(${child.toString()})` : child.toString())
      .join(` * `);
  }
}

export interface Piece {
  range: (...varbValues: number[]) => boolean;
  expression: Expression;
}

export class PiecedExpression extends Expression {

  public rangeVarbs: Expression[] = [];
  public pieces: Piece[];

  constructor(pieces: Piece[], rgVarbs: Expression[]){
    super();
    this.rangeVarbs = rgVarbs;
    this.pieces = pieces;
    const children = uniq(this.pieces.map(piece => piece.expression));
    children.forEach(child => child.fathers = child.fathers.concat(this));
    rgVarbs.forEach(rgVarb => rgVarb.fathers = rgVarb.fathers.concat(this));
    this.children = children;
  }

  deriv = (node: Expression): Expression => {
    if (node === this){
      //对自己求导
      return Constant.from(1);
    }
    const cachedResult = this.memo.get(node);
    if (cachedResult){
      return cachedResult;
    }

    if (node instanceof PiecedExpression) {
      const mergedRangeVarbs = this.rangeVarbs.concat((node as PiecedExpression).rangeVarbs);
      const pieces = flatten(this.pieces.map(pieceY => (node as PiecedExpression).pieces.map(pieceX => ({
        range: (...values: number[]) => pieceY.range(...values.slice(0, this.rangeVarbs.length))
          && pieceX.range(...values.slice(this.rangeVarbs.length)),
        expression: pieceY.expression.deriv(pieceX.expression)
      }))));
      const result = new PiecedExpression(pieces, mergedRangeVarbs);
      this.memo.set(node, result);
      return result;
    }

    const result = new PiecedExpression(
      this.pieces.map(({range, expression}) => ({
        range,
        expression: expression.deriv(node)
      })),
      this.rangeVarbs
    );
    this.memo.set(node, result);
    return result;
  }

  calculateValue = () => {
    const values = this.rangeVarbs.map(varb => varb.value);
    const targetPiece = this.pieces.find(piece => piece.range(...values));
    if (!targetPiece) {
      throw new Error('invalid range');
    }
    return targetPiece.expression.value;
  }

  toString = () => {
    return '@';
  }
}