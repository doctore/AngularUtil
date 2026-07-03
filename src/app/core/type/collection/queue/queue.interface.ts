import { FComparator } from '@app-core/type/comparator';
import { NullableOrUndefined, OrUndefined } from '@app-core/type';

/**
 *    Main interface containing the common functions included in the different implementations of a Queue, a collection
 * designed for holding elements prior to processing.
 *
 * @see ImmutableQueue
 * @see MutableQueue
 */
export interface AbstractQueue<T> extends Iterable<T>, Disposable {

  /**
   * Appends the given `value` in this {@link AbstractQueue}.
   *
   * @param value
   *    Element to add
   *
   * @return a new {@link AbstractQueue} with the element of this {@link AbstractQueue} and the given `value`
   */
  enqueue(value: T): this;


  /**
   * Returns an {@link IterableIterator} of [number, T] pairs for every value in this {@link AbstractQueue}.
   */
  entries(): IterableIterator<[number, T]>;


  /**
   * Executes a provided function `callbackFn` once per each value in this {@link AbstractQueue}, in insertion order.
   *
   * @param callbackFn
   *    The function to execute for each entry in this {@link AbstractQueue}
   * @param thisArg
   *    This {@link AbstractQueue}
   */
  forEach(
    callbackFn: (value: T, index: number, queue: this) => void,
    thisArg?: unknown
  ): void;


  /**
   * Returns the function which imposes a total ordering on this {@link AbstractQueue}.
   *
   * @return {@link FComparator}
   */
  getComparator(): FComparator<T>;


  /**
   * Verifies if the provided `value` exists in this {@link AbstractQueue} or not.
   *
   * @param value
   *    The element to search
   *
   * @return a boolean indicating whether an element with the specified `value` exists in this {@link AbstractQueue} or not
   */
  has(value: T): boolean;


  /**
   * Tests whether this {@link AbstractQueue} is empty.
   *
   * @return `true` if this {@link AbstractQueue} is empty,
   *         `false` otherwise
   */
  isEmpty(): boolean;


  /**
   *    Retrieves, but does not remove, the head of this {@link AbstractQueue}, or returns `undefined` if this
   * {@link AbstractQueue} is empty.
   *
   * @return the head of this {@link AbstractQueue},
   *         `undefined` if this {@link AbstractQueue}
   */
  peek(): OrUndefined<T>;


  /**
   * Iterates over values in this {@link AbstractQueue}.
   */
  [Symbol.iterator](): IterableIterator<T>;


  /**
   * @return the number of elements in this {@link AbstractQueue}
   */
  readonly size: number;


  /**
   * Returns the value for the property containing a string that represents the type of this object.
   */
  readonly [Symbol.toStringTag]: string;


  /**
   * Returns all the elements within this {@link AbstractQueue} into an array.
   *
   * @return array of `T`
   */
  toArray(): T[];


  /**
   * Returns an {@link IterableIterator} of values in this {@link AbstractQueue}.
   */
  values(): IterableIterator<T>;

}



/**
 *    Interface related with non-mutable Queue, that is, there are operations that simulate additions, removals,
 * or updates, but those operations will in each case return a new Queue and leave the old one unchanged.
 */
export interface ImmutableQueue<T> extends AbstractQueue<T> {

  /**
   * Removes all values stored in this {@link ImmutableQueue}.
   *
   * @return new empty {@link ImmutableQueue}.
   */
  clear(): this;


  /**
   *    Returns a tuple with the element with the highest priority in this {@link ImmutableQueue} in the first position,
   * and the new {@link ImmutableQueue} in the second one. If the {@link ImmutableQueue} is empty the result will be
   * [ undefined, current ImmutableQueue ].
   *
   * @return tuple with the element with the highest priority in this {@link ImmutableQueue} in the first position,
   *         the new {@link ImmutableQueue} in the second one
   */
  dequeue(): [ OrUndefined<T>, this ];


  /**
   *    Returns a tuple with the elements contained in this {@link ImmutableQueue} while maintaining their priority
   * in the first position, and the new {@link ImmutableQueue} in the second one. If the {@link ImmutableQueue} is
   * empty the result will be [ [], current ImmutableQueue ].
   *
   * @return tuple with the elements contained in this {@link ImmutableQueue} while maintaining their priority
   *         in the first position, the new {@link ImmutableQueue} in the second one
   */
  dequeueAll(): [ T[], this ];


  /**
   * Adds all the `values` in this {@link ImmutableQueue}.
   *
   * @param values
   *    {@link Iterable} with the elements to add
   *
   * @return a new {@link ImmutableQueue} with the elements of this {@link ImmutableQueue} and the given `values`
   */
  enqueueAll(values: NullableOrUndefined<Iterable<T>>): this;

}



/**
 *    Interface related with mutable Queue, that is, it can be updated, reduced or extended in place. This means
 * you can change, add, or remove elements of a Queue as a side effect.
 */
export interface MutableQueue<T> extends AbstractQueue<T> {

  /**
   * Removes all values stored in this {@link MutableQueue}.
   */
  clear(): void;


  /**
   *    Returns the element with the highest priority in this {@link MutableQueue}, and removes this element from
   * this {@link MutableQueue}.
   *
   * @return the element with the highest priority in this {@link MutableQueue},
   *         `undefined` if this {@link MutableQueue} is empty
   */
  dequeue(): OrUndefined<T>;


  /**
   *    Returns the elements contained in this {@link MutableQueue} while maintaining their priority, and removes them
   * from this {@link MutableQueue}.
   *
   * @return the elements contained in this {@link MutableQueue} while maintaining their priority
   */
  dequeueAll(): T[];


  /**
   * Adds all the `values` in this {@link MutableQueue}.
   *
   * @param values
   *    {@link Iterable} with the elements to add
   *
   * @return `true` if this {@link MutableQueue} changed as a result of the call,
   *         `false` otherwise
   */
  enqueueAll(values: NullableOrUndefined<Iterable<T>>): boolean;

}
