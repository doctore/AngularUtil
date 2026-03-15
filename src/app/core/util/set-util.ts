import { Nullable, NullableOrUndefined, OrUndefined } from '@app-core/type';
import { AbstractSet, ImmutableHashSet, ImmutableSet, MutableHashSet } from '@app-core/type/collection/set';
import { Predicate1, TPredicate1 } from '@app-core/type/predicate';
import { Comparator, TComparator } from '@app-core/type/comparator';
import { FFunction2, Function1, Function2, TFunction1, TFunction2 } from '@app-core/type/function';
import { AssertUtil } from './assert-util';
import { BinaryOperator, FBinaryOperator, TBinaryOperator } from '@app-core/type/function/operator';

/**
 * Helper functions to manage {@link Set}.
 */
export class SetUtil {

  constructor() {
    throw new SyntaxError('SetUtil is an utility class');
  }


  /**
   * Returns a new {@link Set} containing the elements of provided `sourceSet`.
   *
   * @param sourceSet
   *    {@link Set} with the elements to copy. If it is `null` or `undefined` then an empty {@link Set} will be returned
   *
   * @return new {@link Set} containing all elements included in `sourceSet`
   */
  static copy = <T>(sourceSet: NullableOrUndefined<Set<T>>): Set<T> => {
    if (!sourceSet) {
      return new Set<T>();
    }
    return this.cloneSet(
      sourceSet
    );
  }


  /**
   * Counts the number of elements in `sourceSet` which satisfy the `filterPredicate`.
   *
   * <pre>
   *    count(                                   Result:
   *      [1, 2, 3, 6],                           2
   *      (n: number) => 0 == n % 2
   *    )
   * </pre>
   *
   * @param sourceSet
   *    {@link Set} to filter
   * @param filterPredicate
   *   {@link TPredicate1} to filter elements from `sourceSet`. If it is `null` or `undefined` then the length
   *   of `sourceSet` will be returned
   *
   * @return the number of elements satisfying the {@link TPredicate1} `filterPredicate`
   */
  static count = <T>(sourceSet: NullableOrUndefined<Set<T>>,
                     filterPredicate: NullableOrUndefined<TPredicate1<T>>): number => {
    if (this.isEmpty(sourceSet)) {
      return 0;
    }
    if (!filterPredicate) {
      return sourceSet!.size;
    }
    const finalFilterPredicate = Predicate1.of(
      filterPredicate
    );
    let result = 0;
    for (const v of sourceSet!) {
      if (finalFilterPredicate.apply(v)) {
        result++;
      }
    }
    return result;
  }


  /**
   *    Returns a new {@link Set} using `sourceSet` as source, adding from the result the elements that verify the
   * given {@link TPredicate1} `filterPredicate`.
   *
   * <pre>
   *    filter(                                                                            Result:
   *      [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}, {id: 3, name: 'user3'}],         [{id: 1, name: 'user1'}, {id: 3, name: 'user3'}]
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *    )
   * </pre>
   *
   * @param sourceSet
   *    {@link Set} to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter. If it is `null` or `undefined` then all elements
   *    of `sourceSet` will be returned
   *
   * @return empty {@link Set} if `sourceSet` has no elements or no one verifies provided `filterPredicate`,
   *         otherwise a new {@link Set} with the elements of `sourceSet` which verify `filterPredicate`
   */
  static filter = <T>(sourceSet: NullableOrUndefined<Set<T>>,
                      filterPredicate: NullableOrUndefined<TPredicate1<T>>): Set<T> => {
    if (!sourceSet || !filterPredicate) {
      return this.copy(
        sourceSet
      );
    }
    const finalFilterPredicate = Predicate1.of(
      filterPredicate
    );
    const result = this.createEmptySet(
      sourceSet
    );
    if (this.isImmutableSet(result)) {
      const elementsToAdd: T[] = [];
      for (const v of sourceSet) {
        if (finalFilterPredicate.apply(v)) {
          elementsToAdd.push(
            v
          );
        }
      }
      return result.addAll(
        elementsToAdd
      );
    }
    else {
      for (const v of sourceSet) {
        if (finalFilterPredicate.apply(v)) {
          result.add(
            v
          );
        }
      }
    }
    return result;
  }


  /**
   *    Returns a new {@link Set} using `sourceSet` as source, removing from the result the elements that verify the
   * given {@link TPredicate1} `filterPredicate`.
   *
   * <pre>
   *    filterNot(                                                                         Result:
   *      [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}, {id: 3, name: 'user3'}],         [{id: 2, name: 'user2'}]
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *    )
   * </pre>
   *
   * @param sourceSet
   *    {@link Set} to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter. If it is `null` or `undefined` then all elements
   *    of `sourceSet` will be returned
   *
   * @return empty {@link Set} if `sourceSet` has no elements,
   *         otherwise a new {@link Set} with the elements of `sourceSet` which do not verify `filterPredicate`
   */
  static filterNot = <T>(sourceSet: NullableOrUndefined<Set<T>>,
                         filterPredicate: NullableOrUndefined<TPredicate1<T>>): Set<T> => {
    const finalFilterPredicate = !filterPredicate
      ? null
      : Predicate1.of(filterPredicate).not();

    return this.filter(
      sourceSet,
      finalFilterPredicate
    );
  }


  /**
   *    Using the given value `initialValue` as initial one, applies the provided {@link TFunction2} to all
   * elements of `sourceSet`, going left to right.
   *
   * @apiNote
   *    If `sourceSet` or `accumulator` are `null` or `undefined` then `initialValue` is returned. This method might
   * return different results when the provided `sourceSet` does not guarantee the {@link Set} iteration order.
   *
   * <pre>
   *    foldLeft(                                          Result:
   *      [5, 7, 9],                                        315
   *      1,
   *      (n1: number, n2: number) => n1 * n2
   *    )
   * </pre>
   *
   * @param sourceSet
   *    {@link Set} with elements to combine
   * @param initialValue
   *    The initial value to start with
   * @param accumulator
   *    A {@link TFunction2} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive elements of `sourceSet`, going
   *         left to right with the start value `initialValue` on the left.
   */
  static foldLeft<T, R>(sourceSet: NullableOrUndefined<Set<T>>,
                        initialValue: R,
                        accumulator: NullableOrUndefined<TFunction2<R, T, R>>): R;


  static foldLeft<T, R>(sourceSet: NullableOrUndefined<Set<T>>,
                        initialValue: R,
                        accumulator: NullableOrUndefined<FFunction2<R, T, R>>): R;


  static foldLeft<T, R>(sourceSet: NullableOrUndefined<Set<T>>,
                        initialValue: R,
                        accumulator: NullableOrUndefined<TFunction2<R, T, R>>): R {
    if (this.isEmpty(sourceSet) || !accumulator) {
      return initialValue
    }
    const finalAccumulator = Function2.of(
      accumulator
    );
    let result: R = initialValue;
    for (const v of  sourceSet!) {
      result = finalAccumulator.apply(
        result,
        v
      );
    }
    return result;
  }


  /**
   * Verifies if the given `setToVerify` contains at least one element.
   *
   * @param setToVerify
   *    {@link ReadonlySetLike} to verify
   *
   * @return `true` if `setToVerify` is `undefined`, `null` or empty.
   *         `false` otherwise.
   */
  static isEmpty = (setToVerify?: Nullable<ReadonlySetLike<unknown>>): boolean =>
    !setToVerify || 0 == setToVerify.size


  /**
   *    Verifies if the given `input` is classified as {@link AbstractSet} object, which includes implementations like: {@link MutableHashSet}
   * or {@link ImmutableHashSet}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link AbstractSet},
   *         `false` otherwise
   */
  static isAbstractSet = (input?: any): input is AbstractSet<any> =>
    input instanceof MutableHashSet ||
    input instanceof ImmutableHashSet;


  /**
   * Verifies if the given `input` is classified as {@link ImmutableSet} object (including new ones like: {@link ImmutableHashSet}).
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link ImmutableSet},
   *         `false` otherwise
   */
  static isImmutableSet = (input?: any): input is ImmutableSet<any> =>
    input instanceof ImmutableHashSet;


  /**
   * Verifies if the given `input` is classified as {@link isReadonlySetLike} object.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link isReadonlySetLike},
   *         `false` otherwise
   */
  static isReadonlySetLike(input?: any): input is ReadonlySetLike<any> {
    if (!input || 'object' !== typeof input) {
      return false;
    }
    const obj = input as Partial<ReadonlySetLike<unknown>>;
    return 'number' === typeof obj.size &&
      'function' === typeof obj.has &&
      'function' === typeof obj.keys;
  }


  /**
   *    Verifies if the given `input` is classified as {@link Set} object (including new ones like: {@link MutableHashSet}
   * or {@link ImmutableHashSet}).
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Set},
   *         `false` otherwise
   */
  static isSet = (input?: any): input is Set<any> =>
    input instanceof Set ||
    this.isAbstractSet(input);


  /**
   *    Performs a reduction on the elements of `sourceSet`, using an associative accumulation {@link TBinaryOperator},
   * and returns a value describing the reduced elements, if any. Returns `undefined` otherwise.
   *
   * @apiNote
   *    This method is similar to {@link SetUtil#foldLeft} but `accumulator` works with the same type that `sourceSet`
   * and only uses contained elements of provided {@link Set}. This method might return different results when the
   * provided `sourceSet` does not guarantee the {@link Set} iteration order.
   *
   * <pre>
   *    reduce(                                            Result:
   *      [5, 7, 9]                                         315
   *      (n1: number, n2: number) => n1 * n2
   *    )
   * </pre>
   *
   * @param sourceSet
   *    {@link Set} with elements to combine
   * @param accumulator
   *    A {@link TBinaryOperator} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive elements `sourceSet`, going left (head) to right (tail)
   *
   * @throws {IllegalArgumentError} if `accumulator` is `null` or `undefined` and `sourceSet` is not empty
   */
  static reduce<T>(sourceSet: NullableOrUndefined<Set<T>>,
                   accumulator: TBinaryOperator<T>): OrUndefined<T>;


  static reduce<T>(sourceSet: NullableOrUndefined<Set<T>>,
                   accumulator: FBinaryOperator<T>): OrUndefined<T>;


  static reduce<T>(sourceSet: NullableOrUndefined<Set<T>>,
                   accumulator: TBinaryOperator<T>): OrUndefined<T> {
    let result: OrUndefined<T>;
    if (!this.isEmpty(sourceSet)) {
      AssertUtil.notNullOrUndefined(
        accumulator,
        'accumulator must be not null and not undefined'
      );
      const finalAccumulator = BinaryOperator.of(
        accumulator
      );
      let foundFirstElement = false;
      for (const v of sourceSet!) {
        if (!foundFirstElement) {
          result = v;
        } else {
          result = finalAccumulator.apply(
            // @ts-ignore
            result,
            v
          );
        }
        foundFirstElement = true;
      }
    }
    return result;
  }


  /**
   * Sorts the given `sourceSet` using `comparator` if provided or default ordination otherwise.
   *
   * @apiNote
   *    The default sort order is ascending, built upon converting the elements into strings, then comparing their
   * sequences of UTF-16 code units values.
   *
   * <pre>
   *    sort(                                              Result:
   *      [1, 10, 21, 2]                                    [1, 10, 2, 21]
   *    )
   *    sort(                                              Result:
   *      [1, 10, 21, 2],                                   [1, 2, 10, 21]
   *      (a: number, b: number) => a - b
   *    )
   * </pre>
   *
   * @param sourceSet
   *    {@link Set} to sort
   * @param comparator
   *    {@link TComparator} used to determine the order of the elements
   *
   * @return new sorted array
   */
  static sort = <T>(sourceSet: NullableOrUndefined<Set<T>>,
                    comparator?: Nullable<TComparator<T>>): T[] => {
    if (this.isEmpty(sourceSet)) {
      return [];
    }
    const clonedSourceSetAsArray = [...sourceSet!.values()];
    return comparator
      ? clonedSourceSetAsArray!.sort(
          Comparator.of(comparator)
            .getComparator()
        )
      : clonedSourceSetAsArray!.sort();
  }


  /**
   * Returns an array containing the elements of provided `sourceSet`.
   *
   * @param sourceSet
   *    {@link ReadonlySetLike} to convert
   *
   * @return an array which contains all the elements of `sourceSet`
   */
  static toArray = <T>(sourceSet: NullableOrUndefined<ReadonlySetLike<T>>): T[] => {
    if (this.isEmpty(sourceSet)) {
      return [];
    }
    if (this.isAbstractSet(sourceSet)) {
      return sourceSet.toArray();
    }
    // @ts-ignore
    return [...sourceSet.keys()];
  }


  /**
   * Converts the given `sourceSet` into a {@link Map} using provided `discriminatorKey` and `valueMapper`.
   *
   * @apiNote
   *   <ul>
   *     <li>If several elements return the same key, the last one will be the final value.</li>
   *     <li>If `valueMapper` is `null` or `undefined` then {@link Function1#identity} will be applied.</li>
   *   </ul>
   *
   * <pre>
   *    toMap(                                   Result:
   *      [1, 2, 3],                              [('1', 1),
   *      (n: number) => '' + n                    ('2', 2),
   *    )                                          ('3', 3)]
   *
   *    toMap(                                   Result:
   *      [1, 2, 3],                              [('1', 2),
   *      (n: number) => '' + n,                   ('2', 3),
   *      (n: number) => 1 + n                     ('3', 4)]
   *    )
   * </pre>
   *
   * @param sourceSet
   *    {@link Set} with the elements to transform and include in the returned {@link Map}
   * @param discriminatorKey
   *    The discriminator {@link TFunction1} to get the key values of returned {@link Map}
   * @param valueMapper
   *    {@link TFunction1} to transform elements of `sourceArray` into values of the returned {@link Map}
   *
   * @return new {@link Map} from applying the given `discriminatorKey` and `valueMapper` to each element of `sourceSet`
   *
   * @throws {IllegalArgumentError} if `discriminatorKey` is `null` or `undefined` with a not empty `sourceSet`
   */
  static toMap<T, K, V>(sourceSet: NullableOrUndefined<Set<T>>,
                        discriminatorKey: TFunction1<T, K>,
                        valueMapper?: TFunction1<T, V>): Map<K, V> {
    const result: Map<K, V> = new Map<K, V>();
    if (!this.isEmpty(sourceSet)) {
      AssertUtil.notNullOrUndefined(
        discriminatorKey,
        'discriminatorKey must be not null and not undefined'
      );
      const finalValueMapper = valueMapper
        ? valueMapper
        : Function1.identity();

      const finalDiscriminatorKeyAndValueMapper = Function1.of(
        (t: T) => [
          Function1.of(discriminatorKey).apply(t),
          Function1.of(finalValueMapper).apply(t)
        ]
      );
      for (const v of sourceSet!) {
        const pairKeyValue: [K, V] = <[K, V]>finalDiscriminatorKeyAndValueMapper.apply(
          v
        );
        result.set(
          pairKeyValue[0],
          pairKeyValue[1]
        );
      }
    }
    return result;
  }


  /**
   * Returns an empty {@link Set} based on the type of provided `input`.
   *
   * @param input
   *    Source {@link ReadonlySetLike} used to know the type of the returned instance
   *
   * @return {@link Set} whose type is based on the provided `input`
   */
  private static createEmptySet<T>(input?: ReadonlySetLike<T>): Set<T> {
    if (input instanceof ImmutableHashSet) {
      return ImmutableHashSet.empty<T>(
        input.getHash(),
        input.getEquals()
      );
    }
    if (input instanceof MutableHashSet) {
      return MutableHashSet.empty<T>(
        input.getHash(),
        input.getEquals()
      );
    }
    return new Set<T>();
  }


  /**
   * Returns a new {@link Set} based on the type of provided `input`, adding its stored values.
   *
   * @param input
   *    Source {@link Set} used to know the type of the returned instance
   *
   * @return {@link Set} whose type is based on the provided `input`, including its stored values
   */
  private static cloneSet<T>(input?: Set<T>): Set<T> {
    if (input instanceof ImmutableHashSet) {
      return ImmutableHashSet.of<T>(
        input.getHash(),
        input.getEquals(),
        input
      );
    }
    if (input instanceof MutableHashSet) {
      return MutableHashSet.of<T>(
        input.getHash(),
        input.getEquals(),
        input
      );
    }
    return new Set<T>(
      input
    );
  }

}
