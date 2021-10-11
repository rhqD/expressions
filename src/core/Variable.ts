import isNil from "lodash/isNil";
import { Expression } from "./Expression";

export class Variable extends Expression {
  public name: string = '';

  protected isDirty: boolean = false;

  constructor(name: string, value?: number) {
    super();
    this.name = name;
    this._value = value;
  }

  public get value() {
    if (isNil(this._value)) {
      throw new Error(`variable ${this.name} has no value`);
    }
    return this._value;
  }

  public set value(newValue: number) {
    if (this._value !== newValue) {
      this._value = newValue;
      this.spreadDirty();
      this.isDirty = false;
    }
  }

  public toString = () => {
    return this.name;
  }
}