import { EqualityFunction, HashFunction } from '@app-core/type/collection';
import { AbstractSet, MutableSet } from '@app-core/type/collection/set';
import { NullableOrUndefined } from '@app-core/type';
import { ObjectUtil, SetUtil } from '@app-core/util';

/**
 *    Mutable {@link Set} based on hash function to locate internal elements. This {@link Set} can be updated, reduced
 * or extended in place. This means you can change, add, or remove elements of a {@link Set} as a side effect.
 *
 *    It makes no guarantees as to the iteration order of the set; in particular, it does not guarantee that the order
 * will remain constant over time. This class permits the `null` element.
 */
export class MutableHashSet<T> implements MutableSet<T> {

  private readonly hashTable: Map<number, T[]> = new Map<number, T[]>();
  private _size = 0;


  private constructor(private readonly hash: HashFunction<T> = ObjectUtil.hash,
                      private readonly equals: EqualityFunction<T> = ObjectUtil.equals,
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


  clear(): void {
    this.hashTable.clear();
    this._size = 0;
  }


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


  difference(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this {
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


  forEach(callbackFn: (value: T, value2: T, set: AbstractSet<T>) => void,
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


  has(value: T): boolean {
    const hashOfValue = this.hash(
      value
    );
    const valuesWithSameHash = this.hashTable.get(
      hashOfValue
    );
    if (!valuesWithSameHash) {
      return false;
    }
    return valuesWithSameHash.some(v =>
      this.equals(
        v,
        value
      )
    );
  }


  intersection(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this {
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


  isDisjointFrom(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): boolean {
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


  isSubsetOf(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): boolean {
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


  isSupersetOf(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): boolean {
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


  keys(): IterableIterator<T> {
    return this.values();
  }


  [Symbol.dispose](): void {
    this.clear()
  }


  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }


  symmetricDifference(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this {
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


  union(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this {
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


  values(): IterableIterator<T> {
    const valuesWithSameHash = this.hashTable.values();
    let currentBucket: T[] | undefined;
    let index = 0;

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<T> {
        while (true) {
          if (currentBucket !== undefined && index < currentBucket.length) {
            return {
              value: currentBucket[index++],
              done: false
            };
          }
          const nextBucket = valuesWithSameHash.next();
          if (nextBucket.done) {
            return {
              value: undefined as any,
              done: true
            };
          }
          currentBucket = nextBucket.value;
          index = 0;
        }
      }
    };
  }

}
