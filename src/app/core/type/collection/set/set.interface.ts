import { NullableOrUndefined } from '@app-core/type';
import { EqualityFunction } from '@app-core/type/collection';

/**
 * Union type of {@link AbstractSet} and {@link Set}
 */
export type TSet<T> = AbstractSet<T> | Set<T>;



/**
 *    Main interface containing the common functions included in the different implementations of {@link Set}. Those
 * collections are {@link Iterable}s that contain no duplicate elements.
 *
 * @see ImmutableSet
 * @see MutableSet
 */
export interface AbstractSet<T> extends ReadonlySetLike<T>, Disposable {

  /**
   * Appends the given `value` in this {@link AbstractSet} if it does not exist.
   *
   * @param value
   *    New element to add
   *
   * @return this {@link AbstractSet} if it is a mutable one,
   *         new {@link AbstractSet} if it is an immutable instance
   */
  add(value: T): this;


  /**
   *    Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a new {@link AbstractSet} containing
   * elements in this {@link AbstractSet} but not in the given `other`.
   *
   * @apiNote
   *    Existing {@link Set#difference} will throw {@link UnsupportedOperationError} due to its definition contains
   *    another generic type, however the {@link AbstractSet} core allows including a custom definition of functions
   *    such as equals or hash only related with the current `T` type.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} with the elements to discard
   *
   * @return a new {@link AbstractSet} containing all the elements in this {@link AbstractSet} which are not also in `other`
   */
  difference(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this;


  /**
   * Returns the function used to know if two values stored in this {@link AbstractSet} are equals or not.
   *
   * @return {@link EqualityFunction}
   */
  getEquals(): EqualityFunction<T>;


  /**
   * Returns an {@link SetIterator} of [T, T] pairs for every value in this {@link AbstractSet}.
   */
  entries(): SetIterator<[T, T]>;


  /**
   * Executes a provided function `callbackFn` once per each value in this {@link AbstractSet}, in insertion order.
   *
   * @param callbackFn
   *    The function to execute for each entry in this {@link AbstractSet}
   * @param thisArg
   *    This {@link AbstractSet}
   */
  forEach(callbackFn: (value: T, value2: T, set: AbstractSet<T>) => void,
          thisArg?: any): void


  /**
   *    Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a new {@link AbstractSet} containing elements
   * in both this {@link AbstractSet} and the given `other`.
   *
   * @apiNote
   *    Existing {@link Set#intersection} will throw {@link UnsupportedOperationError} due to its definition contains
   *    another generic type, however the {@link AbstractSet} core allows including a custom definition of functions
   *    such as equals or hash only related with the current `T` type.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} with the elements to join
   *
   * @return a new {@link AbstractSet} containing elements in both this {@link AbstractSet} and provided `other`
   */
  intersection(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this;


  /**
   *    Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a boolean indicating if this {@link AbstractSet}
   * has no elements in common with the given `other`.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} with the elements to search
   *
   * @return `true` if this {@link AbstractSet} has no elements in common with `other` set,
   *         `false` otherwise.
   */
  isDisjointFrom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): boolean;


  /**
   * Tests whether this {@link AbstractSet} is empty.
   *
   * @return `true` if this {@link AbstractSet} is empty,
   *         `false` otherwise
   */
  isEmpty(): boolean;


  /**
   *    Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a boolean indicating if all elements of
   * this {@link AbstractSet} are in the given `other`.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} to verify
   *
   * @return `true` if all elements in this {@link AbstractSet} are also in `other`,
   *         `false` otherwise
   */
  isSubsetOf(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): boolean;


  /**
   *     Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a boolean indicating if all elements of
   * the given `other` are in this {@link AbstractSet}.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} to verify
   *
   * @return `true` if all elements in `other` are also in this {@link AbstractSet},
   *         `false` otherwise.
   */
  isSupersetOf(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): boolean;


  /**
   *    Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a new {@link AbstractSet} containing elements
   * which are in either this {@link AbstractSet} or in the given `other`, but not in both.
   *
   * @apiNote
   *    Existing {@link Set#symmetricDifference} will throw {@link UnsupportedOperationError} due to its definition
   *    contains another generic type, however the {@link AbstractSet} core allows including a custom definition
   *    of functions such as equals or hash only related with the current `T` type.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} to verify
   *
   * @return a new {@link AbstractSet} containing elements which are in either this {@link AbstractSet} or
   *         in the given `other`, but not in both
   */
  symmetricDifference(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this;


  /**
   * Returns all the elements within this {@link AbstractSet} into an array.
   *
   * @return array of `T`
   */
  toArray(): T[];


  /**
   *    Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a new {@link AbstractSet} which are in either
   * or both of this {@link AbstractSet} and the given `other`.
   *
   * @apiNote
   *    Existing {@link Set#union} will throw {@link UnsupportedOperationError} due to its definition contains
   *    another generic type, however the {@link AbstractSet} core allows including a custom definition of functions
   *    such as equals or hash only related with the current `T` type.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} with the elements to add
   *
   * @return a new {@link AbstractSet} containing elements which are in either or both of this {@link AbstractSet}
   *         and provided `other`
   */
  union(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this;


  /**
   * Iterates over values in this {@link AbstractSet}.
   */
  [Symbol.iterator](): SetIterator<T>;


  /**
   * Returns an {@link SetIterator} of values in this {@link AbstractSet}.
   */
  values(): SetIterator<T>;


  /**
   * Returns the value for the property containing a string that represents the type of this object.
   */
  readonly [Symbol.toStringTag]: string;

}



/**
 *    Interface related with non-mutable {@link Set}, that is, there are operations that simulate additions, removals,
 * or updates, but those operations will in each case return a new {@link Set} and leave the old one unchanged.
 */
export interface ImmutableSet<T> extends AbstractSet<T> {

  /**
   * Adds all the `values` in this {@link ImmutableSet} if they are not already present.
   *
   * @param values
   *    {@link Iterable} with the elements to add
   *
   * @return a new {@link ImmutableSet} with the elements of this {@link ImmutableSet} and the new ones of the given `values`
   */
  addAll(values: NullableOrUndefined<Iterable<T>>): this;


  /**
   * Removes all values stored in this {@link ImmutableSet}.
   *
   * @return new empty {@link ImmutableSet}.
   */
  clear(): this;


  /**
   * Removes the given `value` from this {@link ImmutableSet}.
   *
   * @param value
   *    Element to remove
   *
   * @return new {@link ImmutableSet} if `value` exists,
   *         this {@link ImmutableSet} otherwise
   */
  delete(value: T): this;


  /**
   * Removes from this {@link ImmutableSet} all of its elements that are contained in the provided `values`.
   *
   * @param values
   *    {@link Iterable} with the elements to remove
   *
   * @return a new {@link ImmutableSet} with the elements of this {@link Set} not included in the given `values`
   */
  deleteAll(values: NullableOrUndefined<Iterable<T>>): this;

}



/**
 *    Interface related with mutable {@link Set}, that is, it can be updated, reduced or extended in place. This means
 * you can change, add, or remove elements of a {@link Set} as a side effect.
 */
export interface MutableSet<T> extends AbstractSet<T> {

  /**
   * Adds all the `values` in this {@link MutableSet} if they are not already present.
   *
   * @param values
   *    {@link Iterable} with the elements to add
   *
   * @return `true` if this {@link MutableSet} changed as a result of the call,
   *         `false` otherwise
   */
  addAll(values: NullableOrUndefined<Iterable<T>>): boolean;


  /**
   * Removes all values stored in this {@link MutableSet}.
   */
  clear(): void;


  /**
   * Removes the given `value` from this {@link MutableSet}.
   *
   * @param value
   *    Element to remove
   *
   * @return `true` if an element in the Set existed and has been removed,
   *         `false` if the element does not exist
   */
  delete(value: T): boolean;


  /**
   * Removes from this {@link MutableSet} all of its elements that are contained in the provided `values`.
   *
   * @param values
   *    {@link Iterable} with the elements to remove
   *
   * @return `true` if this {@link MutableSet} changed as a result of the call,
   *         `false` otherwise
   */
  deleteAll(values: NullableOrUndefined<Iterable<T>>): boolean;

}
