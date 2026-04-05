import { AbstractSet, ImmutableSet } from '@app-core/type/collection/set';
import { ArrayUtil, ObjectUtil, SetUtil } from '@app-core/util';
import { EqualityFunction, HashFunction } from '@app-core/type/collection';
import { NullableOrUndefined } from '@app-core/type';

/**
 *    Immutable {@link Set} based on hash function to locate internal elements. This {@link Set} never change, that is,
 * there are operations that simulate additions, removals, or updates, but those operations will in each case return
 * a new {@link Set} and leave the old one unchanged.
 *
 *    Unlike {@link ImmutableHashSet}, this implementation does guarantee the iteration order of the set; in particular,
 * it does guarantee that the order will remain constant over time. This class permits the `null` element.
 */
export class ImmutableLinkedHashSet<T> implements ImmutableSet<T> {

  private readonly hashTable: Map<number, T[]> = new Map<number, T[]>();
  private order: T[] = [];


  private constructor(private readonly hash: HashFunction<T> = ObjectUtil.hash,
                      private readonly equals: EqualityFunction<T> = ObjectUtil.equals,
                      valuesOrHashTable?: Map<number, T[]> | Iterable<T>) {
    if (valuesOrHashTable instanceof Map) {
      this.hashTable = valuesOrHashTable;
    } else if (valuesOrHashTable) {
      for (const v of valuesOrHashTable) {
        this.addInternal(
          v
        );
      }
    }
  }


  /**
   * Returns an empty {@link ImmutableLinkedHashSet} instance.
   *
   * @param hash
   *    {@link HashFunction} to locate internal elements
   * @param equals
   *    {@link EqualityFunction} to determine whether two values are considered equal
   *
   * @return an empty {@link ImmutableLinkedHashSet}
   */
  static empty = <T>(hash?: HashFunction<T>,
                     equals?: EqualityFunction<T>): ImmutableLinkedHashSet<T> =>
    new ImmutableLinkedHashSet<T>(
      hash,
      equals
    );


  /**
   * Returns an {@link ImmutableLinkedHashSet} containing provided `values`.
   *
   * @param hash
   *    {@link HashFunction} to locate internal elements
   * @param equals
   *    {@link EqualityFunction} to determine whether two values are considered equal
   * @param values
   *    {@link Iterable} with the elements to add in the returned {@link ImmutableLinkedHashSet}
   *
   * @return a {@link ImmutableLinkedHashSet} with the provided `values`
   */
  static of = <T>(hash?: HashFunction<T>,
                  equals?: EqualityFunction<T>,
                  values?: Iterable<T>): ImmutableLinkedHashSet<T> =>
    new ImmutableLinkedHashSet<T>(
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
    const newHashTable = this.cloneHashTable();
    let newValuesWithSameHash = newHashTable.get(
      hashValue
    );
    if (!newValuesWithSameHash) {
      newValuesWithSameHash = [];
    }
    newValuesWithSameHash.push(
      value
    );
    const newOrder = this.cloneOrder();
    newOrder.push(
      value
    );
    // @ts-ignore
    return this.cloneImmutableLinkedHashSet(
      this.hash,
      this.equals,
      newHashTable.set(
        hashValue,
        newValuesWithSameHash
      ),
      newOrder
    );
  }


  addAll(values: NullableOrUndefined<Iterable<T>>): this {
    if (ObjectUtil.isNullOrUndefined(values)) {
      return this;
    }
    const result = this.cloneImmutableLinkedHashSet(
      this.hash,
      this.equals,
      this.cloneHashTable(),
      this.cloneOrder()
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
    return ImmutableLinkedHashSet.empty(
      this.hash,
      this.equals,
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
    const newHashTable = this.cloneHashTable();
    if (valuesWithSameHash.length === 1) {
      newHashTable.delete(
        hashValue
      );
    } else {
      const newBucket = [
        ...valuesWithSameHash.slice(0, posOfValue),
        ...valuesWithSameHash.slice(posOfValue + 1)
      ];
      newHashTable.set(
        hashValue,
        newBucket
      );
    }
    // Remove from order list
    const newOrder = ArrayUtil.delete(
      this.order,
      value,
      this.equals
    );
    // @ts-ignore
    return this.cloneImmutableLinkedHashSet(
      this.hash,
      this.equals,
      newHashTable,
      newOrder
    );
  }


  deleteAll(values: NullableOrUndefined<Iterable<T>>): this {
    if (ObjectUtil.isNullOrUndefined(values)) {
      return this;
    }
    const result = this.cloneImmutableLinkedHashSet(
      this.hash,
      this.equals,
      this.cloneHashTable(),
      this.cloneOrder()
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
    let result = ImmutableLinkedHashSet.empty<T>(
      this.hash,
      this.equals
    );
    let otherSet = SetUtil.isReadonlySetLike(other)
      ? other
      : ImmutableLinkedHashSet.of<T>(
          this.hash,
          this.equals,
          ObjectUtil.nonNullOrUndefined(other)
            ? other
            : []
        );
    if (0 !== otherSet.size) {
      for (const v of this) {
        if (!otherSet.has(v)) {
          result.addInternal(
            v
          );
        }
      }
    }
    else {
      result = result.addAll(
        this
      );
    }
    // @ts-ignore
    return result;
  }


  entries(): IterableIterator<[T, T]> {
    return this.order.map(
      v =>
        [v, v] as [T, T]
    )[Symbol.iterator]();
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
   * Returns the hash function to locate internal elements stored in the current {@link ImmutableLinkedHashSet}.
   *
   * @return {@link HashFunction}
   */
  getHash(): HashFunction<T> {
    return this.hash;
  }


  /**
   * Returns the number of elements stored in this {@link ImmutableLinkedHashSet}.
   *
   * @return number of elements inside {@link ImmutableLinkedHashSet}
   */
  get size(): number {
    return this.order.length;
  }


  get [Symbol.toStringTag](): string {
    return "ImmutableLinkedHashSet"
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
    const result = ImmutableLinkedHashSet.empty<T>(
      this.hash,
      this.equals
    );
    if (ObjectUtil.nonNullOrUndefined(other)) {
      const otherSet = SetUtil.isReadonlySetLike(other)
        ? other
        : ImmutableLinkedHashSet.of<T>(
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
      otherSet = ImmutableLinkedHashSet.of<T>(
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
    const result = ImmutableLinkedHashSet.of<T>(
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
    const result = ImmutableLinkedHashSet.of<T>(
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
    return this.order[Symbol.iterator]();
  }


  /**
   * Appends the given `value` in this {@link ImmutableLinkedHashSet} if it does not exist.
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
    }
    else {
      // Check if value exists inside valuesWithSameHash
      for (const existing of valuesWithSameHash) {
        if (this.equals(existing, value)) {
          return false;
        }
      }
      valuesWithSameHash.push(
        value
      );
    }
    this.order.push(
      value
    );
    return true;
  }


  /**
   * Creates a copy of the internal property {@link ImmutableLinkedHashSet#hashTable}.
   *
   * @return new {@link Map} containing all elements included in `this.hashTable`
   */
  private cloneHashTable(): Map<number, T[]> {
    const result = new Map<number, T[]>();
    for (const [h, b] of this.hashTable) {
      result.set(
        h,
        b.slice()
      );
    }
    return result;
  }


  /**
   * Creates a copy of this {@link ImmutableLinkedHashSet}.
   *
   * @param hash
   *    {@link HashFunction} used to know how to locate stored elements
   * @param equals
   *    {@link EqualityFunction} to identify if two elements are equals or not
   * @param hashTable
   *    {@link Map} source of internal property {@link ImmutableLinkedHashSet#hashTable}
   * @param order
   *    Source of internal property {@link ImmutableLinkedHashSet#order}
   *
   * @return {@link ImmutableLinkedHashSet}
   */
  private cloneImmutableLinkedHashSet(hash: HashFunction<T>,
                                      equals: EqualityFunction<T>,
                                      hashTable: Map<number, T[]>,
                                      order: T[]): ImmutableLinkedHashSet<T> {
    const clonedSet = new ImmutableLinkedHashSet<T>(
      hash,
      equals,
      hashTable
    );
    clonedSet.order = order;
    return clonedSet;
  }


  /**
   * Creates a copy of the internal property {@link ImmutableLinkedHashSet#order}.
   *
   * @return new array containing all elements included in `this.order`
   */
  private cloneOrder(): T[] {
    return this.order.slice(
      0
    );
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
    if (0 === valuesWithSameHash.length) {
      this.hashTable.delete(
        hashValue
      );
    }
    // Remove from order list
    for (let i = 0; i < this.order.length; i++) {
      if (this.equals(this.order[i], value)) {
        this.order.splice(
          i,
          1
        );
        break;
      }
    }
    return true;
  }

}
