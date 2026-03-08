import { EqualityFunction, HashFunction } from '@app-core/type/collection';
import { MutableSet } from '@app-core/type/collection/set';
import { NullableOrUndefined } from '@app-core/type';
import { ObjectUtil, SetUtil } from '@app-core/util';
import { UnsupportedOperationError } from '@app-core/error';
import _ from 'lodash';

/**
 *    Mutable {@link Set} based on hash function to locate internal elements. This {@link Set} can be updated, reduced
 * or extended in place. This means you can change, add, or remove elements of a {@link Set} as a side effect.
 *
 *    It makes no guarantees as to the iteration order of the set; in particular, it does not guarantee that the order
 * will remain constant over time. This class permits the null element.
 */
export class MutableHashSet<T> implements MutableSet<T> {

  private readonly hashTable: Map<number, T[]> = new Map<number, T[]>();
  private _size = 0;


  private constructor(private readonly hash: HashFunction<T> = this.defaultHash,
                      private readonly equals: EqualityFunction<T> = this.defaultEquals,
                      values?: Iterable<T>) {
    if (values) {
      for (const v of values) {
        this.add(
          v
        );
      }
    }
  }


  /**
   * Returns an empty {@link MutableHashSet} instance.
   *
   * @param hash
   *    {@link HashFunction} to locate internal elements
   * @param equals
   *    {@link EqualityFunction} to determine whether two values are considered equal
   *
   * @return an empty {@link MutableHashSet}
   */
  static empty = <T>(hash?: HashFunction<T>,
                     equals?: EqualityFunction<T>): MutableHashSet<T> =>
    new MutableHashSet<T>(
      hash,
      equals
    );


  /**
   * Returns an {@link MutableHashSet} containing provided `values`.
   *
   * @param hash
   *    {@link HashFunction} to locate internal elements
   * @param equals
   *    {@link EqualityFunction} to determine whether two values are considered equal
   * @param values
   *    {@link Iterable} with the elements to add in the returned {@link MutableHashSet}
   *
   * @return a {@link MutableHashSet} with the provided `values`
   */
  static of = <T>(hash?: HashFunction<T>,
                  equals?: EqualityFunction<T>,
                  values?: Iterable<T>): MutableHashSet<T> =>
    new MutableHashSet<T>(
      hash,
      equals,
      values
    );


  /**
   * Appends the given `value` in this {@link MutableHashSet} if it does not exist.
   *
   * @param value
   *    New element to add
   *
   * @return this {@link MutableHashSet}
   */
  add(value: T): this {
    const hashValue = this.hash(
      value
    );
    const valuesWithSameHash = this.hashTable.get(
      hashValue
    );
    if (!valuesWithSameHash) {
      this.hashTable.set(
        hashValue,
        [value]
      );
      this._size++;
      return this;
    }
    // Check if value exists inside valuesWithSameHash
    for (const existing of valuesWithSameHash) {
      if (this.equals(existing, value)) {
        return this;
      }
    }
    valuesWithSameHash.push(
      value
    );
    this._size++;
    return this;
  }


  addAll(values: NullableOrUndefined<Iterable<T>>): boolean {
    if (ObjectUtil.isNullOrUndefined(values)) {
      return false;
    }
    const sizeBefore = this.size;
    for (const v of values) {
      this.add(
        v
      );
    }
    return sizeBefore != this.size;
  }


  /**
   * Removes all values stored in this {@link MutableHashSet}.
   */
  clear(): void {
    this.hashTable.clear();
    this._size = 0;
  }


  /**
   * Removes the given `value` from this {@link MutableHashSet}.
   *
   * @param value
   *    Element to remove
   *
   * @return `true` if `value` in this {@link MutableHashSet} existed and has been removed,
   *         `false` otherwise
   */
  delete(value: T): boolean {
    const hashValue = this.hash(
      value
    );
    const valuesWithSameHash = this.hashTable.get(
      hashValue
    );
    if (!valuesWithSameHash) {
      return false;
    }
    const posOfValue = valuesWithSameHash.findIndex(
      (current: T) =>
        this.equals(
          current,
          value
        )
    );
    if (-1 === posOfValue) {
      return false;
    }
    // value exists in this Set
    valuesWithSameHash.splice(
      posOfValue,
      1
    );
    this._size--;
    if (0 === valuesWithSameHash.length) {
      this.hashTable.delete(
        hashValue
      );
    }
    return true;
  }


  deleteAll(values: NullableOrUndefined<Iterable<T>>): boolean {
    if (ObjectUtil.isNullOrUndefined(values)) {
      return false;
    }
    const sizeBefore = this.size;
    for (const v of values) {
      this.delete(
        v
      );
    }
    return sizeBefore != this.size;
  }


  difference<U>(other: ReadonlySetLike<U>): Set<T> {
    throw new UnsupportedOperationError(
      'Use the alternative method differenceCustom'
    );
  }


  differenceCustom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this {
    let result = new MutableHashSet<T>(
      this.hash,
      this.equals,
      this
    );
    if (ObjectUtil.nonNullOrUndefined(other)) {
      let otherSet = SetUtil.isReadonlySetLike(other)
        ? other
        : new MutableHashSet<T>(
            this.hash,
            this.equals,
            other
          );
      if (0 !== otherSet.size) {
        for (const v of this) {
          if (otherSet.has(v)) {
            result.delete(
              v
            );
          }
        }
      }
    }
    // @ts-ignore
    return result;
  }


  /**
   * Returns an {@link SetIterator} of [T, T] pairs for every value in this {@link MutableHashSet}.
   */
  *entries(): SetIterator<[T, T]> {
    for (const valuesWithSameHash of this.hashTable.values()) {
      for (let i = 0; i < valuesWithSameHash.length; i++) {
        yield [
          valuesWithSameHash[i],
          valuesWithSameHash[i]
        ];
      }
    }
  }


  /**
   * Executes a provided function `callbackFn` once per each value in this {@link MutableHashSet}, in insertion order.
   *
   * @param callbackFn
   *    The function to execute for each entry in this {@link MutableHashSet}
   * @param thisArg
   *    This {@link MutableHashSet}
   */
  forEach(callbackFn: (value: T, value2: T, set: Set<T>) => void,
          thisArg?: any): void {
    for (const v of this.values()) {
      callbackFn.call(
        thisArg,
        v,
        v,
        // @ts-ignore
        this
      );
    }
  }


  getEquals(): EqualityFunction<T> {
    return this.equals;
  }


  /**
   * Returns the hash function to locate internal elements stored in the current {@link MutableHashSet}.
   *
   * @return {@link HashFunction}
   */
  getHash(): HashFunction<T> {
    return this.hash;
  }


  /**
   * Returns the number of elements stored in this {@link MutableHashSet}.
   *
   * @return number of elements inside {@link MutableHashSet}
   */
  get size(): number {
    return this._size;
  }


  get [Symbol.toStringTag](): string {
    return "MutableHashSet"
  }


  /**
   * Returns a boolean indicating whether the specified `value` exists in this {@link MutableHashSet} or not.
   *
   * @returns `true` if `value` exists in this {@link MutableHashSet},
   *          `false` otherwise
   */
  has(value: T): boolean {
    return ObjectUtil.nonNullOrUndefined(value)
      ? this.findInHashTable(
          value
        )
      : false;
  }


  intersection<U>(other: ReadonlySetLike<U>): Set<T & U> {
    throw new UnsupportedOperationError(
      'Use the alternative method intersectionCustom'
    );
  }


  intersectionCustom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this {
    let result = new MutableHashSet<T>(
      this.hash,
      this.equals
    );
    if (ObjectUtil.nonNullOrUndefined(other)) {
      let otherSet = SetUtil.isReadonlySetLike(other)
        ? other
        : new MutableHashSet<T>(
            this.hash,
            this.equals,
            other
          );
      if (0 !== otherSet.size) {
        for (const v of this) {
          if (otherSet.has(v)) {
            result = result.add(
              v
            );
          }
        }
      }
    }
    // @ts-ignore
    return result;
  }


  /**
   *    Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a boolean indicating if this {@link MutableHashSet}
   * has no elements in common with the given `other`.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} with the elements to search
   *
   * @return `true` if this {@link MutableHashSet} has no elements in common with `other` set,
   *         `false` otherwise.
   */
  isDisjointFrom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<unknown>>): boolean {
    if (ObjectUtil.isNullOrUndefined(other)) {
      return true;
    }
    if (SetUtil.isReadonlySetLike(other)) {
      for (const v of this) {
        if (other.has(v)) {
          return false;
        }
      }
    }
    else {
      for (const v of other) {
        if (this.has(v)) {
          return false;
        }
      }
    }
    return true;
  }


  isEmpty(): boolean {
    return 0 === this.size;
  }


  /**
   *    Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a boolean indicating if all elements of
   * this {@link MutableHashSet} are in the given `other`.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} to verify
   *
   * @return `true` if all elements in this {@link MutableHashSet} are also in `other`,
   *         `false` otherwise
   */
  isSubsetOf(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<unknown>>): boolean {
    if (ObjectUtil.isNullOrUndefined(other)) {
      return false;
    }
    let otherSet;
    if (SetUtil.isReadonlySetLike(other)) {
      if (this.size > other.size) {
        return false;
      }
      otherSet = other;
    }
    else {
      otherSet = new MutableHashSet<T>(
        this.hash,
        this.equals,
        other
      );
    }
    for (const v of this) {
      if (!otherSet.has(v)) {
        return false;
      }
    }
    return true;
  }


  /**
   *     Takes an {@link Iterable} or {@link ReadonlySetLike} and returns a boolean indicating if all elements of
   * the given `other` are in this {@link MutableHashSet}.
   *
   * @param other
   *    {@link Iterable} or {@link ReadonlySetLike} to verify
   *
   * @return `true` if all elements in `other` are also in this {@link MutableHashSet},
   *         `false` otherwise.
   */
  isSupersetOf(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<unknown>>): boolean {
    if (ObjectUtil.isNullOrUndefined(other)) {
      return false;
    }
    // @ts-ignore
    const iterableOther: Iterable<T> = SetUtil.isReadonlySetLike(other)
      ? other.keys()
      : other;
    for (const v of iterableOther) {
      if (!this.has(v)) {
        return false;
      }
    }
    return true;
  }


  /**
   * Despite its name, returns a {@link SetIterator} of values in the {@link MutableHashSet}.
   */
  keys(): SetIterator<T> {
    return this.values();
  }


  [Symbol.dispose](): void {
    this.clear()
  }


  [Symbol.iterator](): SetIterator<T> {
    return this.values();
  }


  symmetricDifference<U>(other: ReadonlySetLike<U>): Set<T | U> {
    throw new UnsupportedOperationError(
      'Use the alternative method symmetricDifferenceCustom'
    );
  }


  symmetricDifferenceCustom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this {
    if (ObjectUtil.isNullOrUndefined(other)) {
      return this;
    }
    const result = new MutableHashSet<T>(
      this.hash,
      this.equals,
      this
    );
    // @ts-ignore
    const iterableOther: Iterable<T> = SetUtil.isReadonlySetLike(other)
      ? other.keys()
      : other;
    for (const v of iterableOther) {
      if (result.has(v)) {
        result.delete(
          v
        );
      }
      else {
        result.add(
          v
        );
      }
    }
    // @ts-ignore
    return result;
  }


  toArray(): T[] {
    return [...this.values()];
  }


  union<U>(other: ReadonlySetLike<U>): Set<T | U> {
    throw new UnsupportedOperationError(
      'Use the alternative method unionCustom'
    );
  }


  unionCustom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this {
    let result = new MutableHashSet<T>(
      this.hash,
      this.equals,
      this
    );
    if (ObjectUtil.nonNullOrUndefined(other)) {
      // @ts-ignore
      const iterableOther: Iterable<T> = SetUtil.isReadonlySetLike(other)
        ? other.keys()
        : other;
      for (const v of iterableOther) {
        result = result.add(
          v
        );
      }
    }
    // @ts-ignore
    return result;
  }


  /**
   * Returns an {@link SetIterator} of values in this {@link MutableHashSet}.
   */
  *values(): SetIterator<T> {
    for (const valuesWithSameHash of this.hashTable.values()) {
      for (let i = 0; i < valuesWithSameHash.length; i++) {
        yield valuesWithSameHash[i];
      }
    }
  }


  /**
   *    Returns `true` if `a` is equals to `b`, `false` otherwise. It is used by default when no one was provided as
   * {@link equals} property in the constructor.
   *
   * @apiNote
   *    To compare 2 different values, the order of the options to use is:
   *    <ol>
   *      <li>Internal `equals` function of the object if it defines one</li>
   *      <li>`_.isEqual` function included in Lodash library</li>
   *    </ol>
   *
   * @param a
   *    First value to compare
   * @param b
   *    First value to compare
   *
   * @return `true` if `a` is equals to `b`,
   *         `false` otherwise.
   */
  private defaultEquals(a: T,
                        b: T): boolean {
    if (ObjectUtil.containsFunction(a, 'equals', 1)) {
      // @ts-ignore
      return a.equals(
        b
      );
    }
    return _.isEqual(
      a,
      b
    );
  }


  /**
   *    Returns the key used for hashing related with provided `value`. It is used by default when no one was provided
   * as {@link hash} property in the constructor.
   *
   * @apiNote
   *    To return the hashing of `value`, the order of the options to use is:
   *    <ol>
   *      <li>Internal `hash` function of the object if it defines one</li>
   *      <li>A custom hash value based on its JSON representation</li>
   *    </ol>
   *
   * @return hash value of this object
   *
   * @throws {TypeError} if object `value` does not define a `hash` function and there was an error getting its JSON representation
   */
  private defaultHash(value: T): number {
    if (ObjectUtil.containsFunction(value, 'hash', 0)) {
      // @ts-ignore
      return value.hash();
    }
    // Use the JSON representation of the value
    const jsonOfValue = JSON.stringify(value);
    let h = 0
    for (let i = 0; i < jsonOfValue.length; i++) {
      h = ((h << 5) - h + jsonOfValue.charCodeAt(i)) | 0;
    }
    return h;
  }


  /**
   *    Searches the given `value` inside the values of this {@link MutableHashSet#hashTable}, returning `true` if
   * `value` exists, `false` otherwise.
   *
   * @param value
   *    Element to find inside provided `hashTable`
   *
   * @return `true` if the values of this {@link MutableHashSet#hashTable} contains the given `value`,
   *         `false` otherwise.
   */
  private findInHashTable(value: T): boolean {
    const hashOfValue = this.hash(
      value
    );
    const valuesWithSameHash = this.hashTable.get(
      hashOfValue
    );
    if (valuesWithSameHash) {
      for (const current of valuesWithSameHash) {
        if (this.equals(current, value)) {
          return true;
        }
      }
    }
    return false;
  }

}
