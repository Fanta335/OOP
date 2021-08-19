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

function createDeque(arr: number[]): MyDequeInt {
  let deque = new MyDequeInt();
  deque.push(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    deque.push(arr[i]);
  }

  return deque;
}

let deque = createDeque([1,2,3,4,5,6,7,8,9,10]);
console.log(deque.peekFirst());
console.log(deque.peekLast());
console.log(deque.pop());
console.log(deque.peekLast());

