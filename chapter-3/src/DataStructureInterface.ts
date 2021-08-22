interface StackInt {
  peekLast(): number | undefined;
  pop(): number | undefined;
  push(data: number): void;
}

interface QueueInt {
  peekFirst(): number | undefined;
  poll(): number | undefined;
  push(data: number): void;
}

interface DequeInt extends StackInt, QueueInt {
  poll(): number | undefined;
  addFirst(data: number): void;
}

class NodeInt {
  public data: number | undefined;
  public prev: NodeInt | undefined;
  public next: NodeInt | undefined;

  constructor(data: number) {
    this.data = data;
  }
}

class MyStack implements StackInt {
  private _head: NodeInt | undefined;

  constructor() {
    this._head = undefined;
  }

  push(data: number): void {
    let node = new NodeInt(data);
    node.next = this._head;
    this._head = node;
  }

  pop(): number | undefined {
    if (this._head === undefined) return undefined;

    let temp = this._head;
    this._head = this._head.next;
    return temp.data;
  }

  peekLast(): number | undefined {
    if (this._head === undefined) return undefined;
    return this._head.data;
  }
}

class MyQueue implements QueueInt {
  private _head: NodeInt | undefined;
  private _tail: NodeInt | undefined;

  constructor() {
    this._head = undefined;
    this._tail = undefined;
  }

  // 末尾に要素を追加する
  push(data: number): void {
    if (this._head === undefined) {
      this._head = new NodeInt(data);
    } else if (this._tail === undefined) {
      this._tail = new NodeInt(data);
      this._head.next = this._tail;
    } else {
      this._tail.next = new NodeInt(data);
      this._tail = this._tail.next;
    }
  }

  // 先頭から要素を削除し、削除した要素を返す
  poll(): number | undefined {
    if (this._head === undefined) return undefined;
    let temp = this._head;

    if (this._head.next === undefined) {
      this._head === undefined;
      this._tail === undefined;
    } else this._head = this._head.next;

    return temp.data;
  }

  peekFirst(): number | undefined {
    if (this._head === undefined) return undefined;
    return this._head.data;
  }
}

class MyDequeInt implements DequeInt {
  private _head: NodeInt | undefined;
  private _tail: NodeInt | undefined;

  constructor() {
    this._head = undefined;
    this._tail = undefined;
  }

  peekLast(): number | undefined {
    if (this._tail === undefined) return undefined;
    return this._tail.data;
  }

  peekFirst(): number | undefined {
    if (this._head === undefined) return undefined;
    return this._head.data;
  }

  // リストの先頭に要素を追加する
  addFirst(data: number) {
    if (this._head === undefined) {
      this._head = new NodeInt(data);
      this._tail = this._head;
    }

    let node = new NodeInt(data);
    this._head.prev = node;
    node.next = this._head;
    this._head = node;
  }

  // リストの末尾に要素を追加する
  push(data: number): void {
    if (this._head === undefined) {
      this._head = new NodeInt(data);
      this._tail = this._head;
    } else {
      let node = new NodeInt(data);
      // this._tailにはthis._headが割り当てられているのでundefinedではない
      this._tail!.next = node;
      node.prev = this._tail;
      this._tail = node;
    }
  }

  // リストの末尾の要素を削除し、削除した要素を返します。
  pop(): number | undefined {
    if (this._tail === undefined) return undefined;

    let temp = this._tail;
    this._tail = this._tail.prev;

    if (this._tail !== undefined) this._tail.next = undefined;
    else this._head = undefined;
    return temp.data;
  }

  // リストの先頭の要素を削除し、削除した要素を返します。
  poll(): number | undefined {
    if (this._head === undefined) return undefined;

    let temp = this._head;
    this._head = this._head.next;
    if (this._head !== undefined) this._head.prev = undefined;
    else this._tail = undefined;
    return temp.data;
  }
}

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

// 双方向リスト
// class IntegerLinkedList extends AbstractListInteger {
//   private _head: NodeInt | undefined;
//   private _tail: NodeInt | undefined;

//   constructor();
//   constructor(arr: number[]);
//   constructor(arr?: number[]) {
//     if (arr === undefined) {
//       super();
//       this._head = undefined;
//       this._tail = undefined;
//       return;
//     }

//     super(arr);
//     this._head = new NodeInt(arr[0]);
//     let currentNode = this._head;
//     for (let i = 1; i < arr.length; i++) {
//       currentNode.next = new NodeInt(arr[i]);
//       currentNode.next.prev = currentNode;
//       currentNode = currentNode.next;
//     }
//     this._tail = currentNode;
//   }

//   public get originalList(): number[] {
//     return super.originalList;
//   }

//   public set originalList(elements: number[]) {
//     super.originalList = elements;
//   }

//   // tailに追加する
//   public add(element: number): void;
//   public add(elements: number[]): void;
//   public add(elementOrElements: number | number[]): void {
//     if (typeof elementOrElements === "number") {
//       let arr = this.originalList;
//       arr.push(elementOrElements);
//       this.originalList = arr;

//       if(this._head === undefined) this._head = new NodeInt(elementOrElements);

//     } else this.originalList.concat(elementOrElements);
//   }
// }

function createDeque(arr: number[]): MyDequeInt {
  let deque = new MyDequeInt();
  deque.push(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    deque.push(arr[i]);
  }

  return deque;
}



// let deque = createDeque([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// console.log(deque.peekFirst());
// console.log(deque.peekLast());
// console.log(deque.pop());
// console.log(deque.peekLast());

// let ll = new IntegerLinkedList([1,2,3,4]);
// console.log(ll);
