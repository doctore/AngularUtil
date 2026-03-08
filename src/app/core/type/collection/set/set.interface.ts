import { NullableOrUndefined } from '@app-core/type';
import {EqualityFunction} from '@app-core/type/collection';

/**
 *    Main interface containing the common functions included in the different implementations of {@link Set}. Those
 * collections are {@link Iterable}s that contain no duplicate elements.
 *
 * @see ImmutableSet
 * @see MutableSet
 */
export interface AbstractSet<T> extends Set<T>, Disposable {

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
  differenceCustom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this;


  /**
   * Returns the function used to know if two values stored in this {@link AbstractSet} are equals or not.
   *
   * @return {@link EqualityFunction}
   */
  getEquals(): EqualityFunction<T>;


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
  intersectionCustom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this;


  /**
   * Tests whether this {@link AbstractSet} is empty.
   *
   * @return `true` if this {@link AbstractSet} is empty,
   *         `false` otherwise
   */
  isEmpty(): boolean;


  /**
   *    Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a new {@link AbstractSet} containing elements
   * which are in either this {@link CustomMutableHashSet} or in the given `other`, but not in both.
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
  symmetricDifferenceCustom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this;


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
  unionCustom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this;

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
   * Removes from this {@link ImmutableSet} all of its elements that are contained in the provided `values`.
   *
   * @param values
   *    {@link Iterable} with the elements to remove
   *
   * @return a new {@link ImmutableSet} with the elements of this {@link Set} not included in the given `values`
   */
  deleteAll(values: NullableOrUndefined<Iterable<T>>): this;


  /**
   * Removes the given `value` from this {@link ImmutableSet}.
   *
   * @apiNote
   *    This new method is required for {@link ImmutableSet} because the current definition of {@link Set#delete} does not
   *    allow to return an instance of a {@link Set} but a `boolean` result.
   *
   * @param value
   *    Element to remove
   *
   * @return new {@link ImmutableSet} if `value` exists,
   *         this {@link ImmutableSet} otherwise
   */
  remove(value: T): this;

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
