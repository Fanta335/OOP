class MutableString {
  private _originalString: string;
  constructor(str: string) {
    this._originalString = str;
  }

  public append(c: string): void {
    this._originalString + c;
  }

  public substring(start: number): MutableString;
  public substring(start: number, end: number): MutableString;
  public substring(start: number, end?: number): MutableString {
    if (typeof end === "number") {
      let sub = this._originalString.substring(start, end);
      return new MutableString(sub);
    } else {
      let sub = this._originalString.substring(start);
      return new MutableString(sub);
    }
  }

  public length(): number {
    return this._originalString.length;
  }
}
