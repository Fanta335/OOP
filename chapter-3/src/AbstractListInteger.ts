abstract class AbstractListInteger {
  protected _initialList: number[];

  constructor();
  constructor(arr: number[]);
  constructor(arr?: number[]) {
    if (arr === undefined) this._initialList = [];
    else this._initialList = arr;
  }

  public get originalList() {
    return this._initialList;
  }

  public set originalList(elements: number[]) {
    this._initialList = elements;
  }

  // AbstractListIntegerが実装しなければならないメソッド。
  public abstract get(position: number): number;
  public abstract add(element: number): void; // リストの最後に追加します。
  public abstract add(elements: number[]): void; // リストの最後の要素に追加します。
  public abstract pop(): number | undefined; // リストの最後から削除します。削除した要素を返します。
  public abstract addAt(position: number, element: number): void; // 指定された位置に要素を追加します。
  public abstract addAt(position: number, elements: number[]): void; // 指定された位置に複数の要素を追加します。
  public abstract removeAt(position: number): number; // 指定した位置にある要素を削除します。削除した要素を返します。
  public abstract removeAllAt(start: number): void; // 指定された位置から始まるすべての要素を削除します。
  public abstract removeAllAt(start: number, end: number): void; // startからendまでの全ての要素を削除します。
  public abstract subList(start: number): AbstractListInteger; // AbstractListIntegerの部分リストを、指定された位置から最後まで返します。
  public abstract subList(start: number, end: number): AbstractListInteger; // startからendまでのAbstractListIntegerの部分リストを返します。
}

class IntegerArrayList extends AbstractListInteger {
  constructor();
  constructor(arr: number[]);
  constructor(arr?: number[]) {
    if (arr === undefined) super();
    else super(arr);
  }

  public get originalList() {
    return super.originalList;
  }

  public set originalList(elements: number[]) {
    super.originalList = elements;
  }

  public get(position: number) {
    return this.originalList[position];
  }

  public add(element: number): void;
  public add(elements: number[]): void;
  public add(elementOrElements: number | number[]): void {
    if (typeof elementOrElements === "number") {
      let arr = this.originalList;
      arr.push(elementOrElements);
      this.originalList = arr;
    } else this.originalList.concat(elementOrElements);
  }

  public pop(): number | undefined {
    let ele = this.originalList.pop();
    if (ele !== undefined) return ele;
    return undefined;
  }

  public addAt(position: number, element: number): void;
  public addAt(position: number, elements: number[]): void;
  public addAt(position: number, elementOrElements: number | number[]): void {
    let left = this.originalList.slice(0, position);
    let right = this.originalList.slice(position);
    if (typeof elementOrElements === "number") {
      left.push(elementOrElements);
      this.originalList = left.concat(right);
    } else {
      this.originalList = left.concat(elementOrElements, right);
    }
  }

  public removeAt(position: number): number {
    // 指定した位置にある要素を削除します。削除した要素を返します。
    if (position >= this.originalList.length) {
      console.log("Invalid position. Position is bigger than ths list length.");
      return -1;
    }
    let left = this.originalList.slice(0, position);
    let right = this.originalList.slice(position + 1);
    let res = this.originalList[position];
    this.originalList = left.concat(right);
    return res;
  }

  public removeAllAt(start: number): void; // 指定された位置から始まるすべての要素を削除します。
  public removeAllAt(start: number, end: number): void; // startからendまでの全ての要素を削除します。
  public removeAllAt(start: number, end?: number): void {
    if (start >= this.originalList.length || start < 0) {
      console.log("Invalid start index.");
      return;
    } else if (end !== undefined && end >= this.originalList.length) {
      console.log("Invalid end index.");
      return;
    }

    let left = this.originalList.slice(0, start);
    if (typeof end === "number") {
      let right = this.originalList.slice(end);
      this.originalList = left.concat(right);
    } else {
      this.originalList = left;
    }
  }

  public subList(start: number): IntegerArrayList; // AbstractListIntegerの部分リストを、指定された位置から最後まで返します。
  public subList(start: number, end: number): IntegerArrayList; // startからendまでのAbstractListIntegerの部分リストを返します。
  public subList(start: number, end?: number): IntegerArrayList {
    let array = [];
    if (typeof end === "number") {
      array = this.originalList.slice(start, end);
    } else {
      array = this.originalList.slice(start);
    }
    return new IntegerArrayList(array);
  }
}

// class IntegerLinkedList extends AbstractListInteger{}

let arrayList1 = new IntegerArrayList([1, 2, 3, 4, 5, 6]);
console.log(arrayList1.originalList);
// console.log(arrayList1.pop());
// arrayList1.add(11);
// arrayList1.addAt(3, [8, 8, 8, 8, 8]);
// arrayList1.removeAt(7);
// arrayList1.removeAllAt(3, -3);
// console.log(arrayList1.subList(-1));
console.log(arrayList1.originalList);
