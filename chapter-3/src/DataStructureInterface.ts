interface Stack<E> {
  peekLast(): E | undefined;
  pop(): E | undefined;
  push(data: E): void;
}

interface Queue<E> {
  peekFirst(): E | undefined;
  poll(): E | undefined;
  push(data: E): void;
}

interface Deque<E> extends Stack<E>, Queue<E> {
  poll(): E | undefined;
  addFirst(data: E): void;
}

class Node<E> {
  public data: E | undefined;
  public prev: Node<E> | undefined;
  public next: Node<E> | undefined;

  constructor(data: E) {
    this.data = data;
  }
}

class MyStack<E> implements Stack<E> {
  private _head: Node<E> | undefined;

  constructor() {
    this._head = undefined;
  }

  push(data: E): void {
    let node = new Node(data);
    node.next = this._head;
    this._head = node;
  }

  pop(): E | undefined {
    if (this._head === undefined) return undefined;

    let temp = this._head;
    this._head = this._head.next;
    return temp.data;
  }

  peekLast(): E | undefined {
    if (this._head === undefined) return undefined;
    return this._head.data;
  }
}

class MyQueue<E> implements Queue<E> {
  private _head: Node<E> | undefined;
  private _tail: Node<E> | undefined;

  constructor() {
    this._head = undefined;
    this._tail = undefined;
  }

  // 末尾に要素を追加する
  push(data: E): void {
    if (this._head === undefined) {
      this._head = new Node(data);
    } else if (this._tail === undefined) {
      this._tail = new Node(data);
      this._head.next = this._tail;
    } else {
      this._tail.next = new Node(data);
      this._tail = this._tail.next;
    }
  }

  // 先頭から要素を削除し、削除した要素を返す
  poll(): E | undefined {
    if (this._head === undefined) return undefined;
    let temp = this._head;

    if (this._head.next === undefined) {
      this._head === undefined;
      this._tail === undefined;
    } else this._head = this._head.next;

    return temp.data;
  }

  peekFirst(): E | undefined {
    if (this._head === undefined) return undefined;
    return this._head.data;
  }
}

class MyDeque<E> implements Deque<E> {
  private _head: Node<E> | undefined;
  private _tail: Node<E> | undefined;

  constructor() {
    this._head = undefined;
    this._tail = undefined;
  }

  peekLast(): E | undefined {
    if (this._tail === undefined) return undefined;
    return this._tail.data;
  }

  peekFirst(): E | undefined {
    if (this._head === undefined) return undefined;
    return this._head.data;
  }

  // リストの先頭に要素を追加する
  addFirst(data: E) {
    if (this._head === undefined) {
      this._head = new Node(data);
      this._tail = this._head;
    }

    let node = new Node(data);
    this._head.prev = node;
    node.next = this._head;
    this._head = node;
  }

  // リストの末尾に要素を追加する
  push(data: E): void {
    if (this._head === undefined) {
      this._head = new Node(data);
      this._tail = this._head;
    } else {
      let node = new Node(data);
      // this._tailにはthis._headが割り当てられているのでundefinedではない
      this._tail!.next = node;
      node.prev = this._tail;
      this._tail = node;
    }
  }

  // リストの末尾の要素を削除し、削除した要素を返します。
  pop(): E | undefined {
    if (this._tail === undefined) return undefined;

    let temp = this._tail;
    this._tail = this._tail.prev;

    if (this._tail !== undefined) this._tail.next = undefined;
    else this._head = undefined;
    return temp.data;
  }

  // リストの先頭の要素を削除し、削除した要素を返します。
  poll(): E | undefined {
    if (this._head === undefined) return undefined;

    let temp = this._head;
    this._head = this._head.next;
    if (this._head !== undefined) this._head.prev = undefined;
    else this._tail = undefined;
    return temp.data;
  }
}

abstract class AbstractList<E> {
  protected _initialList: E[];

  constructor();
  constructor(arr: E[]);
  constructor(arr?: E[]) {
    if (arr === undefined) this._initialList = [];
    else this._initialList = arr;
  }

  public get originalList() {
    return this._initialList;
  }

  public set originalList(elements: E[]) {
    this._initialList = elements;
  }

  // AbstractListが実装しなければならないメソッド。
  public abstract get(position: number): E;
  public abstract add(element: E): void; // リストの最後に追加します。
  public abstract add(elements: E[]): void; // リストの最後の要素に追加します。
  public abstract pop(): E | undefined; // リストの最後から削除します。削除した要素を返します。
  public abstract addAt(position: number, element: E): void; // 指定された位置に要素を追加します。
  public abstract addAt(position: number, elements: E[]): void; // 指定された位置に複数の要素を追加します。
  public abstract removeAt(position: number): E | number; // 指定した位置にある要素を削除します。削除した要素を返します。
  public abstract removeAllAt(start: number): void; // 指定された位置から始まるすべての要素を削除します。
  public abstract removeAllAt(start: number, end: number): void; // startからendまでの全ての要素を削除します。
  public abstract subList(start: number): AbstractList<E>; // AbstractListの部分リストを、指定された位置から最後まで返します。
  public abstract subList(start: number, end: number): AbstractList<E>; // startからendまでのAbstractListの部分リストを返します。
}

class ArrayList<E> extends AbstractList<E> {
  constructor();
  constructor(arr: E[]);
  constructor(arr?: E[]) {
    if (arr === undefined) super();
    else super(arr);
  }

  public get originalList() {
    return super.originalList;
  }

  public set originalList(elements: E[]) {
    super.originalList = elements;
  }

  public get(position: number) {
    return this.originalList[position];
  }

  public add(element: E): void;
  public add(elements: E[]): void;
  public add(elementOrElements: E | E[]): void {
    if (elementOrElements instanceof Array) {
      this.originalList.concat(elementOrElements);
    } else {
      let arr = this.originalList;
      arr.push(elementOrElements);
      this.originalList = arr;
    }
  }

  public pop(): E | undefined {
    let ele = this.originalList.pop();
    if (ele !== undefined) return ele;
    return undefined;
  }

  public addAt(position: number, element: E): void;
  public addAt(position: number, elements: E[]): void;
  public addAt(position: number, elementOrElements: E | E[]): void {
    let left = this.originalList.slice(0, position);
    let right = this.originalList.slice(position);
    if (elementOrElements instanceof Array) {
      this.originalList = left.concat(elementOrElements, right);
    } else {
      left.push(elementOrElements);
      this.originalList = left.concat(right);
    }
  }

  public removeAt(position: number): E | number {
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

  public subList(start: number): ArrayList<E>; // AbstractListの部分リストを、指定された位置から最後まで返します。
  public subList(start: number, end: number): ArrayList<E>; // startからendまでのAbstractListの部分リストを返します。
  public subList(start: number, end?: number): ArrayList<E> {
    let array = [];
    if (typeof end === "number") {
      array = this.originalList.slice(start, end);
    } else {
      array = this.originalList.slice(start);
    }
    return new ArrayList(array);
  }
}

// 双方向リスト
// class IntegerLinkedList extends AbstractList {
//   private _head: Node | undefined;
//   private _tail: Node | undefined;

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
//     this._head = new Node(arr[0]);
//     let currentNode = this._head;
//     for (let i = 1; i < arr.length; i++) {
//       currentNode.next = new Node(arr[i]);
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

//       if(this._head === undefined) this._head = new Node(elementOrElements);

//     } else this.originalList.concat(elementOrElements);
//   }
// }

function createDeque<E>(arr: E[]): MyDeque<E> {
  let deque = new MyDeque<E>();
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
