import { ImmutableQueue } from '@app-core/type/collection/queue';
import { ArrayUtil, ObjectUtil } from '@app-core/util';
import { FComparator } from '@app-core/type/comparator';
import { NullableOrUndefined, OrUndefined } from '@app-core/type';

/**
 *    Immutable priority queue based on comparison function to order internal elements. This queue never change, that is,
 * there are operations that simulate additions, removals, or updates, but those operations will in each case return
 * a new queue and leave the old one unchanged.
 */
export class ImmutablePriorityQueue<T> implements ImmutableQueue<T> {

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
   * Returns an empty {@link ImmutablePriorityQueue} instance.
   *
   * @param comparator
   *    {@link FComparator} to compare internal elements
   *
   * @return an empty {@link ImmutablePriorityQueue}
   */
  static empty = <T>(comparator?: FComparator<T>): ImmutablePriorityQueue<T> =>
    new ImmutablePriorityQueue<T>(
      comparator
    );


  /**
   * Returns an {@link ImmutablePriorityQueue} containing provided `values`.
   *
   * @param comparator
   *    {@link FComparator} to compare internal elements
   * @param values
   *    {@link Iterable} with the elements to add in the returned {@link ImmutablePriorityQueue}
   *
   * @return a {@link ImmutablePriorityQueue} with the provided `values`
   */
  static of = <T>(comparator?: FComparator<T>,
                  values?: Iterable<T>): ImmutablePriorityQueue<T> =>
    new ImmutablePriorityQueue<T>(
      comparator,
      values
    );


  clear(): this {
    return ImmutablePriorityQueue.empty(
      this.comparator
    ) as this;
  }


  dequeue(): [ OrUndefined<T>, this ] {
    return [
      this.data[0],
      ImmutablePriorityQueue.of(
        this.comparator,
        this.data.slice(1),
      ) as this,
    ];
  }


  dequeueAll(): [ T[], this ] {
    return [
      [...this.data],
      ImmutablePriorityQueue.empty(
        this.comparator
      ) as this
    ];
  }


  enqueue(value: T): this {
    const index = ArrayUtil.binarySearch(
      this.data,
      value,
      this.comparator
    )[1];

    return ImmutablePriorityQueue.of(
      this.comparator,
      [
        ...this.data.slice(0, index),
        value,
        ...this.data.slice(index)
      ]
    ) as this;
  }


  enqueueAll(values: NullableOrUndefined<Iterable<T>>): this {
    if (!values) {
      return this;
    }
    const valuesToEnqueue = Array.from(
      values
    );
    if (0 === valuesToEnqueue.length) {
      return this;
    }
    return ImmutablePriorityQueue.of(
      this.comparator,
      valuesToEnqueue.concat(
        this.data
      )
      .sort(
        this.comparator
      )
    ) as this;
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
   * Returns the number of elements stored in this {@link ImmutablePriorityQueue}.
   *
   * @return number of elements inside {@link ImmutablePriorityQueue}
   */
  get size(): number {
    return this.data.length;
  }


  get [Symbol.toStringTag](): string {
    return "ImmutablePriorityQueue"
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
