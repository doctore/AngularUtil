import { EqualityFunction, HashFunction } from '@app-core/type/collection';
import { AbstractSet, ImmutableSet } from '@app-core/type/collection/set';
import { NullableOrUndefined } from '@app-core/type';
import { ObjectUtil, SetUtil } from '@app-core/util';

/**
 *    Immutable {@link Set} based on hash function to locate internal elements. This {@link Set} never change, that is,
 * there are operations that simulate additions, removals, or updates, but those operations will in each case return
 * a new {@link Set} and leave the old one unchanged.
 *
 *    It makes no guarantees as to the iteration order of the set; in particular, it does not guarantee that the order
 * will remain constant over time. This class permits the `null` element.
 */
export class ImmutableHashSet<T> implements ImmutableSet<T> {

  private hashTable: Map<number, T[]> = new Map<number, T[]>();
  private _size: number = 0;


  private constructor(private readonly hash: HashFunction<T> = ObjectUtil.hash,
                      private readonly equals: EqualityFunction<T> = ObjectUtil.equals,
                      values?: Iterable<T>) {
    if (values) {
      for (const v of values) {
        this.addInternal(
          v
        );
      }
    }
  }


  /**
   * Returns an empty {@link ImmutableHashSet} instance.
   *
   * @param hash
   *    {@link HashFunction} to locate internal elements
   * @param equals
   *    {@link EqualityFunction} to determine whether two values are considered equal
   *
   * @return an empty {@link ImmutableHashSet}
   */
  static empty = <T>(hash?: HashFunction<T>,
                     equals?: EqualityFunction<T>): ImmutableHashSet<T> =>
    new ImmutableHashSet<T>(
      hash,
      equals
    );


  /**
   * Returns an {@link ImmutableHashSet} containing provided `values`.
   *
   * @param hash
   *    {@link HashFunction} to locate internal elements
   * @param equals
   *    {@link EqualityFunction} to determine whether two values are considered equal
   * @param values
   *    {@link Iterable} with the elements to add in the returned {@link ImmutableHashSet}
   *
   * @return a {@link ImmutableHashSet} with the provided `values`
   */
  static of = <T>(hash?: HashFunction<T>,
                  equals?: EqualityFunction<T>,
                  values?: Iterable<T>): ImmutableHashSet<T> =>
    new ImmutableHashSet<T>(
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
    // Check if value exists inside valuesWithSameHash
    if (valuesWithSameHash) {
      for (const existing of valuesWithSameHash) {
        if (this.equals(existing, value)) {
          return this;
        }
      }
    }
    // value does not exist
    const newHashTable = new Map(
      this.hashTable
    );
    let newValuesWithSameHash = newHashTable.get(
      hashValue
    );
    if (!newValuesWithSameHash) {
      newValuesWithSameHash = [];
    }
    newValuesWithSameHash.push(
      value
    );
    // @ts-ignore
    return this.cloneImmutableHashSet(
      this.hash,
      this.equals,
      newHashTable.set(
        hashValue,
        newValuesWithSameHash
      ),
      this.size + 1
    );
  }


  addAll(values: NullableOrUndefined<Iterable<T>>): this {
    if (ObjectUtil.isNullOrUndefined(values)) {
      return this;
    }
    const result = this.cloneImmutableHashSet(
      this.hash,
      this.equals,
      this.cloneHashTable(),
      this.size
    );
    for (const v of values) {
      result.addInternal(
        v
      );
    }
    // @ts-ignore
    return result;
  }


  clear(): this {
    // @ts-ignore
    return this.cloneImmutableHashSet(
      this.hash,
      this.equals,
      new Map<number, T[]>(),
      0
    );
  }


  delete(value: T): this {
    const hashValue = this.hash(
      value
    );
    const valuesWithSameHash = this.hashTable.get(
      hashValue
    );
    if (!valuesWithSameHash) {
      return this;
    }
    const posOfValue = valuesWithSameHash.findIndex(
      (current: T) =>
        this.equals(
          current,
          value
        )
    );
    if (-1 === posOfValue) {
      return this;
    }
    const newHashTable = new Map(
      this.hashTable
    );
    if (valuesWithSameHash.length === 1) {
      newHashTable.delete(
        hashValue
      );
    }
    else {
      const newBucket = [
        ...valuesWithSameHash.slice(0, posOfValue),
        ...valuesWithSameHash.slice(posOfValue + 1)
      ];
      newHashTable.set(
        hashValue,
        newBucket
      );
    }
    // @ts-ignore
    return this.cloneImmutableHashSet(
      this.hash,
      this.equals,
      newHashTable,
      this.size - 1
    );
  }


  deleteAll(values: NullableOrUndefined<Iterable<T>>): this {
    if (ObjectUtil.isNullOrUndefined(values)) {
      return this;
    }
    const result = this.cloneImmutableHashSet(
      this.hash,
      this.equals,
      this.cloneHashTable(),
      this.size
    );
    for (const v of values) {
      result.deleteInternal(
        v
      );
    }
    // @ts-ignore
    return result;
  }


  difference(other: NullableOrUndefined<Iterable<T>> | NullableOrUndefined<ReadonlySetLike<T>>): this {
    let result = new ImmutableHashSet<T>(
      this.hash,
      this.equals,
      this
    );
    if (ObjectUtil.nonNullOrUndefined(other)) {
      let otherSet = SetUtil.isReadonlySetLike(other)
        ? other
        : new ImmutableHashSet<T>(
            this.hash,
            this.equals,
            other
          );
      if (0 !== otherSet.size) {
        for (const v of this) {
          if (otherSet.has(v)) {
            result.deleteInternal(
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
   * Returns the hash function to locate internal elements stored in the current {@link ImmutableHashSet}.
   *
   * @return {@link HashFunction}
   */
  getHash(): HashFunction<T> {
    return this.hash;
  }


  /**
   * Returns the number of elements stored in this {@link ImmutableHashSet}.
   *
   * @return number of elements inside {@link ImmutableHashSet}
   */
  get size(): number {
    return this._size;
  }


  get [Symbol.toStringTag](): string {
    return "ImmutableHashSet"
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
    let result = new ImmutableHashSet<T>(
      this.hash,
      this.equals
    );
    if (ObjectUtil.nonNullOrUndefined(other)) {
      let otherSet = SetUtil.isReadonlySetLike(other)
        ? other
        : new ImmutableHashSet<T>(
            this.hash,
            this.equals,
            other
          );
      if (0 !== otherSet.size) {
        for (const v of this) {
          if (otherSet.has(v)) {
            result.addInternal(
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
      otherSet = new ImmutableHashSet<T>(
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
    const result = new ImmutableHashSet<T>(
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
        result.deleteInternal(
          v
        );
      }
      else {
        result.addInternal(
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
    let result = new ImmutableHashSet<T>(
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
        result.addInternal(
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



  /**
   * Appends the given `value` in this {@link ImmutableHashSet} if it does not exist.
   *
   * @param value
   *    New element to add
   *
   * @return `true` if `value` does not exist and was added,
   *         `false` otherwise
   */
  private addInternal(value: T): boolean {
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
      return true;
    }
    // Check if value exists inside valuesWithSameHash
    for (const existing of valuesWithSameHash) {
      if (this.equals(existing, value)) {
        return false;
      }
    }
    valuesWithSameHash.push(
      value
    );
    this._size++;
    return true;
  }


  /**
   * Creates a copy of the internal property {@link ImmutableHashSet#hashTable}.
   *
   * @return {@link Map}
   */
  private cloneHashTable(): Map<number, T[]> {
    return new Map([...this.hashTable]
      .map(([h, b]) =>
        [h, b.slice()])
    );
  }


  /**
   * Creates a copy of this {@link ImmutableHashSet}.
   *
   * @param hash
   *    {@link HashFunction} used to know how to locate stored elements
   * @param equals
   *    {@link EqualityFunction} to identify if two elements are equals or not
   * @param hashTable
   *    {@link Map} source of internal property {@link ImmutableHashSet#hashTable}
   * @param size
   *    source of internal property {@link ImmutableHashSet#_size}
   *
   * @return {@link ImmutableHashSet}
   */
  private cloneImmutableHashSet(hash: HashFunction<T>,
                                equals: EqualityFunction<T>,
                                hashTable: Map<number, T[]>,
                                size: number): ImmutableHashSet<T> {
    const clonedSet = new ImmutableHashSet(
      hash,
      equals
    );
    clonedSet.hashTable = hashTable;
    clonedSet._size = size;
    return clonedSet;
  }


  /**
   * Removes the given `value` in this {@link ImmutableHashSet} if it does not exist.
   *
   * @param value
   *    New element to remove
   *
   * @return `true` if `value` exists and was removed,
   *         `false` otherwise
   */
  private deleteInternal(value: T): boolean {
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

}
