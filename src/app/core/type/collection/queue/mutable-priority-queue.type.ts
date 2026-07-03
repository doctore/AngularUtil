import { MutableQueue } from '@app-core/type/collection/queue';
import { ArrayUtil, ObjectUtil } from '@app-core/util';
import { FComparator } from '@app-core/type/comparator';
import { NullableOrUndefined, OrUndefined } from '@app-core/type';

/**
 *    Mutable priority queue based on comparison function to order internal elements. This queue can be updated, reduced
 * or extended in place. This means you can change, add, or remove elements of a queue as a side effect.
 */
export class MutablePriorityQueue<T> implements MutableQueue<T> {

  private readonly data: T[] = [];


  private constructor(private readonly comparator: FComparator<T> = ObjectUtil.compare,
                      values?: Iterable<T>) {
    this.data = values
      ? Array.from(
          values
        )
      : [];
    this.data.sort(
      this.comparator
    );
  }


  /**
   * Returns an empty {@link MutablePriorityQueue} instance.
   *
   * @param comparator
   *    {@link FComparator} to compare internal elements
   *
   * @return an empty {@link MutablePriorityQueue}
   */
  static empty = <T>(comparator?: FComparator<T>): MutablePriorityQueue<T> =>
    new MutablePriorityQueue<T>(
      comparator
    );


  /**
   * Returns an {@link MutablePriorityQueue} containing provided `values`.
   *
   * @param comparator
   *    {@link FComparator} to compare internal elements
   * @param values
   *    {@link Iterable} with the elements to add in the returned {@link MutablePriorityQueue}
   *
   * @return a {@link MutablePriorityQueue} with the provided `values`
   */
  static of = <T>(comparator?: FComparator<T>,
                  values?: Iterable<T>): MutablePriorityQueue<T> =>
    new MutablePriorityQueue<T>(
      comparator,
      values
    );


  clear(): void {
    this.data.length = 0;
  }


  dequeue(): OrUndefined<T> {
    return this.data.shift();
  }


  dequeueAll(): T[] {
    const copyOfData = [...this.data];
    this.clear();
    return copyOfData;
  }


  enqueue(value: T): this {
    const index = ArrayUtil.binarySearch(
      this.data,
      value,
      this.comparator
    )[1];

    this.data.splice(
      index,
      0,
      value
    );
    return this;
  }


  enqueueAll(values: NullableOrUndefined<Iterable<T>>): boolean {
    if (!values) {
      return false;
    }
    const valuesToEnqueue = Array.from(
      values
    );
    if (0 === valuesToEnqueue.length) {
      return false;
    }
    this.data.push(
      ...valuesToEnqueue
    );
    this.data.sort(
      this.comparator
    );
    return true;
  }


  *entries(): IterableIterator<[number, T]> {
    for (let i = 0; i < this.data.length; i++) {
      yield [i, this.data[i]];
    }
  }


  forEach(callbackFn: (value: T, index: number, queue: this) => void,
          thisArg?: unknown): void{
    for (let i = 0; i < this.data.length; i++) {
      callbackFn.call(
        thisArg,
        this.data[i],
        i,
        this
      );
    }
  }


  getComparator(): FComparator<T> {
    return this.comparator;
  }


  has(value: T): boolean {
    return ArrayUtil.binarySearch(
      this.data,
      value,
      this.comparator
    )[0];
  }


  isEmpty(): boolean {
    return 0 === this.size;
  }


  peek(): OrUndefined<T> {
    return this.data[0];
  }


  /**
   * Returns the number of elements stored in this {@link MutablePriorityQueue}.
   *
   * @return number of elements inside {@link MutablePriorityQueue}
   */
  get size(): number {
    return this.data.length;
  }


  get [Symbol.toStringTag](): string {
    return "MutablePriorityQueue"
  }


  [Symbol.dispose](): void {
    this.clear()
  }


  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }


  toArray(): T[] {
    return [...this.data];
  }


  values(): IterableIterator<T> {
    return this.data.values();
  }

}
