import { Comparator, TComparator } from '@app-core/types/comparator';
import {
  FFunction1,
  FFunction2,
  Function1,
  Function2,
  PartialFunction,
  TFunction1,
  TFunction2
} from '@app-core/types/function';
import { BinaryOperator, FBinaryOperator, TBinaryOperator } from '@app-core/types/function/operator';
import { Optional } from '@app-core/types/functional';
import { Predicate1, Predicate2, TPredicate1, TPredicate2 } from '@app-core/types/predicate';
import { Nullable, NullableOrUndefined, OrUndefined } from '@app-core/types';
import { AssertUtil, MapUtil, ObjectUtil } from '@app-core/util';
import * as _ from 'lodash';

/**
 * Helper functions to manage arrays.
 */
export class ArrayUtil {

  constructor() {
    throw new SyntaxError('ArrayUtil is an utility class');
  }


  /**
   *    Returns a new array using the given `sourceArray`, applying {@link PartialFunction#apply} if the current element
   * verifies {@link PartialFunction#isDefinedAt}, `orElseMapper` otherwise.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3, 6]                         [2, 4, 4, 12]
   *    PartialFunction.of(
   *      (n: number) => 1 == n % 2,
   *      (n: number) => 1 + n
   *    )
   *    (n: number) => 2 * n
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter and transform
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceArray`
   * @param orElseMapper
   *    {@link TFunction1} to transform elements of `sourceArray` do not verify {@link PartialFunction#isDefinedAt}
   *
   * @return new array from applying the given {@link PartialFunction} to each element of `sourceArray`
   *         on which it is defined and collecting the results or `orElseMapper` otherwise
   *
   * @throws {@link IllegalArgumentError} if `partialFunction` or `orElseMapper` is `null` or `undefined` with a not empty `sourceArray`
   */
  static applyOrElse<T, U>(sourceArray: NullableOrUndefined<T[]>,
                           partialFunction: PartialFunction<T, U>,
                           orElseMapper: TFunction1<T, U>): U[];


  static applyOrElse<T, U>(sourceArray: NullableOrUndefined<T[]>,
                           partialFunction: PartialFunction<T, U>,
                           orElseMapper: FFunction1<T, U>): U[];

  /**
   *    Returns a new array using the given `sourceArray`, applying `defaultMapper` if the current element verifies
   * `filterPredicate`, `orElseMapper` otherwise.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate1#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3, 6]                         [2, 4, 4, 12]
   *    (n: number) => 1 + n
   *    (n: number) => 2 * n
   *    (n: number) => 1 == n % 2
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter and transform
   * @param defaultMapper
   *    {@link TFunction1} to transform elements of `sourceArray` that verify `filterPredicate`
   * @param orElseMapper
   *    {@link TFunction1} to transform elements of `sourceArray` do not verify `filterPredicate`
   * @param filterPredicate
   *    {@link TPredicate1} to filter elements of `sourceArray`
   *
   * @return new array from applying the given `defaultMapper` to each element of `sourceArray` that verifies `filterPredicate`
   *         and collecting the results or `orElseMapper` otherwise
   *
   * @throws {@link IllegalArgumentError} if `defaultMapper` or `orElseMapper` is `null` or `undefined` with a not empty `sourceArray`
   */
  static applyOrElse<T, U>(sourceArray: NullableOrUndefined<T[]>,
                           defaultMapper: TFunction1<T, U>,
                           orElseMapper: TFunction1<T, U>,
                           filterPredicate: TPredicate1<T>): U[];


  static applyOrElse<T, U>(sourceArray: NullableOrUndefined<T[]>,
                           partialFunctionOrDefaultMapper: PartialFunction<T, U> | TFunction1<T, U>,
                           orElseMapper: TFunction1<T, U>,
                           filterPredicate?: TPredicate1<T>): U[] {
    const result: U[] = [];
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrDefaultMapper,
        'partialFunctionOrDefaultMapper must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrDefaultMapper)
        ? <PartialFunction<T, U>>partialFunctionOrDefaultMapper
        : PartialFunction.of(
            filterPredicate,
            <TFunction1<T, U>>partialFunctionOrDefaultMapper
        );
      const finalOrElseMapper = Function1.of(orElseMapper);

      for (let item of sourceArray!) {
        result.push(
          finalPartialFunction.isDefinedAt(item)
            ? finalPartialFunction.apply(item)
            : finalOrElseMapper.apply(item)
        );
      }
    }
    return result;
  }


  /**
   * Returns a new array after:
   * <p>
   *  - Filter its elements using {@link PartialFunction#isDefinedAt} of `partialFunction`
   *  - Transform its filtered elements using {@link PartialFunction#apply} of `partialFunction`
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3, 6]                         ['4', '12']
   *    PartialFunction.of(
   *      (n: number) => 0 == n % 2,
   *      (n: number) => '' + (2 * n)
   *    )
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter and transform
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceArray`
   *
   * @return new array from applying the given {@link PartialFunction} to each element of `sourceArray`
   *         on which it is defined and collecting the results
   *
   * @throws {@link IllegalArgumentError} if `partialFunction` is `null` or `undefined` with a not empty `sourceArray`
   */
  static collect<T, U>(sourceArray: NullableOrUndefined<T[]>,
                       partialFunction: PartialFunction<T, U>): U[];


  /**
   * Returns a new array after:
   * <p>
   *  - Filter its elements using the {@link TPredicate1} `filterPredicate`
   *  - Transform its filtered elements using the {@link TFunction1} `mapFunction`
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate1#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3, 6]                         ['4', '12']
   *    (n: number) => '' + (2 * n)
   *    (n: number) => 0 == n % 2
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter and transform
   * @param mapFunction
   *    {@link TFunction1} to transform filtered elements of the source `sourceArray`
   * @param filterPredicate
   *    {@link TPredicate1} to filter elements from `sourceArray`
   *
   * @return new array from applying the given {@link TFunction1} to each element of `sourceArray`
   *         on which {@link TPredicate1} returns `true` and collecting the results
   *
   * @throws {@link IllegalArgumentError} if `mapFunction` is `null` or `undefined` with a not empty `sourceArray`
   */
  static collect<T, U>(sourceArray: NullableOrUndefined<T[]>,
                       mapFunction: TFunction1<T, U>,
                       filterPredicate: TPredicate1<T>): U[];


  static collect<T, U>(sourceArray: NullableOrUndefined<T[]>,
                       partialFunctionOrMapFunction: PartialFunction<T, U> | TFunction1<T, U>,
                       filterPredicate?: TPredicate1<T>): U[] {
    const result: U[] = [];
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrMapFunction,
        'partialFunctionOrMapFunction must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrMapFunction)
        ? <PartialFunction<T, U>>partialFunctionOrMapFunction
        : PartialFunction.of(
            filterPredicate,
            <TFunction1<T, U>>partialFunctionOrMapFunction
          );
      for (let item of sourceArray!) {
        if (finalPartialFunction.isDefinedAt(item)) {
          result.push(
            finalPartialFunction.apply(
              item
            )
          );
        }
      }
    }
    return result;
  }


  /**
   * Returns a new array containing the elements of provided `sourceArray`.
   *
   * <pre>
   * Example:
   *
   *   Parameters:             Result:
   *    [1, 2, 3, 6]            [1, 2, 3, 6]
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to copy
   *
   * @return new array containing all elements included in `sourceArray`
   */
  static copy = <T>(sourceArray: NullableOrUndefined<T[]>): T[] => {
    if (this.isEmpty(sourceArray)) {
      return [];
    }
    return sourceArray!.slice(0);
  }


  /**
   * Counts the number of elements in `sourceArray` which satisfy the `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then the length of `sourceArray` will be returned.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3, 6]                         2
   *    (n: number) => 0 == n % 2
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter
   * @param filterPredicate
   *   {@link TPredicate1} to filter elements from `sourceArray`
   *
   * @return the number of elements satisfying the {@link TPredicate2} `filterPredicate`
   */
  static count = <T>(sourceArray: NullableOrUndefined<T[]>,
                     filterPredicate: NullableOrUndefined<TPredicate1<T>>): number => {
    if (this.isEmpty(sourceArray)) {
      return 0;
    }
    if (ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return sourceArray!.length;
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate);
    let result = 0;
    for (let item of sourceArray!) {
      if (finalFilterPredicate.apply(item)) {
        result++;
      }
    }
    return result;
  }


  /**
   *    Returns an array removing the longest prefix of elements included in `sourceArray` that satisfy the
   * {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements of `sourceArray` will be returned.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 3, 4, 5, 6]                      [4, 5, 6]
   *    (n: number) => 1 == n % 2
   * </pre>
   *
   * @param sourceArray
   *    Array to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return the longest suffix of provided `sourceArray` whose elements all satisfy `filterPredicate`
   */
  static dropWhile = <T>(sourceArray: NullableOrUndefined<T[]>,
                         filterPredicate: NullableOrUndefined<TPredicate1<T>>): T[] => {
    if (this.isEmpty(sourceArray) ||
      ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return this.copy(sourceArray);
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate!);
    const result: T[] = [];
    let wasFoundFirstElementDoesMatchPredicate = false;
    for (let item of sourceArray!) {
      if (!finalFilterPredicate.apply(item) &&
          !wasFoundFirstElementDoesMatchPredicate) {
        wasFoundFirstElementDoesMatchPredicate = true;
      }
      if (wasFoundFirstElementDoesMatchPredicate) {
        result.push(item);
      }
    }
    return result;
  }


  /**
   *    Returns a new array using `sourceArray` as source, adding from the result the elements that verify the
   * given {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements of `sourceArray` will be returned.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                                      Result:
   *    [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}, {id: 3, name: 'user3'}]         [{id: 1, name: 'user1'}, {id: 3, name: 'user3'}]
   *    (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   * </pre>
   *
   * @param sourceArray
   *    Array to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return empty array if `sourceArray` has no elements or no one verifies provided `filterPredicate`,
   *         otherwise a new array with the elements of `sourceArray` which verify `filterPredicate`
   */
  static filter = <T>(sourceArray: NullableOrUndefined<T[]>,
                      filterPredicate: NullableOrUndefined<TPredicate1<T>>): T[] => {
    if (this.isEmpty(sourceArray) ||
        ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return this.copy(sourceArray);
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate!);
    return sourceArray!.filter(
      (obj: T) =>
        finalFilterPredicate.apply(obj)
    );
  }


  /**
   *    Returns a new array using `sourceArray` as source, removing from the result the elements that verify the
   * given {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements of `sourceArray` will be returned.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                                      Result:
   *    [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}, {id: 3, name: 'user3'}]         [{id: 2, name: 'user2'}]
   *    (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   * </pre>
   *
   * @param sourceArray
   *    Array to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return empty array if `sourceArray` has no elements,
   *         otherwise a new array with the elements of `sourceArray` which do not verify `filterPredicate`
   */
  static filterNot = <T>(sourceArray: NullableOrUndefined<T[]>,
                         filterPredicate: NullableOrUndefined<TPredicate1<T>>): T[] => {
    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
      ? Predicate1.alwaysTrue<T>()
      : Predicate1.of(filterPredicate).not();

    return this.filter(
      sourceArray,
      finalFilterPredicate
    );
  }


  /**
   * Returns from the given `sourceArray` the first element that verifies the provided `filterPredicate`.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                                      Result:
   *    [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}, {id: 3, name: 'user3'}]         [{id: 1, name: 'user1'}]
   *    (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   * </pre>
   *
   * @param sourceArray
   *    Array to search
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return `undefined` if `sourceArray` has no elements, `filterPredicate` is `null` or `undefined`
   *         or no one verifies provided `filterPredicate`.
   *         Otherwise, the first element that verifies `filterPredicate`.
   */
  static find = <T>(sourceArray: NullableOrUndefined<T[]>,
                    filterPredicate: TPredicate1<T>): OrUndefined<T> => {
    if (this.isEmpty(sourceArray) ||
        ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return undefined;
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate);
    return sourceArray!.find(
      (obj: T) => finalFilterPredicate.apply(obj)
    );
  }


  /**
   *    Returns an {@link Optional} containing the first element of the given `sourceArray` that verifies the provided
   * `filterPredicate`, {@link Optional#empty} otherwise.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                         Result:
   *    [{id: 1, name: 'user1'}, {id: 3, name: 'user3'}]                    Optional({id: 2, name: 'user2'})
   *    (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   * </pre>
   *
   * @param sourceArray
   *    Array to search
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return {@link Optional} containing the first element that satisfies `filterPredicate`,
   *         {@link Optional#empty} otherwise.
   */
  static findOptional = <T>(sourceArray: NullableOrUndefined<T[]>,
                            filterPredicate: TPredicate1<T>): Optional<T> =>
    Optional.ofNullable(
      this.find(
        sourceArray,
        filterPredicate
      )
    );


  /**
   *    Using the given value `initialValue` as initial one, applies the provided {@link TFunction2} to all
   * elements of `sourceArray`, going left to right.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                              Result:
   *    [5, 7, 9]                                315
   *    1
   *    (n1: number, n2: number) => n1 * n2
   * </pre>
   *
   * @param sourceArray
   *    Array with elements to combine
   * @param initialValue
   *    The initial value to start with
   * @param accumulator
   *    A {@link TFunction2} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive elements `sourceArray`, going
   *         left to right with the start value `initialValue` on the left.
   *
   * @throws {@link IllegalArgumentError} if `accumulator` is `null` or `undefined` and `sourceArray` is not empty
   */
  static foldLeft<T, R>(sourceArray: NullableOrUndefined<T[]>,
                        initialValue: R,
                        accumulator: TFunction2<R, T, R>): R;


  static foldLeft<T, R>(sourceArray: NullableOrUndefined<T[]>,
                        initialValue: R,
                        accumulator: FFunction2<R, T, R>): R;


  /**
   *    Using the given value `initialValue` as initial one, applies the provided {@link TFunction2} to elements
   * of `sourceArray` that verify `filterPredicate`, going left to right.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                              Result:
   *    [5, 7, 8, 9]                             315
   *    1
   *    (n1: number, n2: number) => n1 * n2
   *    (n: number) => 1 == n % 2
   * </pre>
   *
   * @param sourceArray
   *    Array with elements to combine
   * @param initialValue
   *    The initial value to start with
   * @param accumulator
   *    A {@link TFunction2} which combines elements
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return result of inserting `accumulator` between consecutive elements `sourceArray`, going
   *         left to right with the start value `initialValue` on the left.
   *
   * @throws {@link IllegalArgumentError} if `accumulator` is `null` or `undefined` and `sourceArray` is not empty
   */
  static foldLeft<T, R>(sourceArray: NullableOrUndefined<T[]>,
                        initialValue: R,
                        accumulator: TFunction2<R, T, R>,
                        filterPredicate: TPredicate1<T>): R;


  static foldLeft<T, R>(sourceArray: NullableOrUndefined<T[]>,
                        initialValue: R,
                        accumulator: FFunction2<R, T, R>,
                        filterPredicate: TPredicate1<T>): R;


  static foldLeft<T, R>(sourceArray: NullableOrUndefined<T[]>,
                        initialValue: R,
                        accumulator: TFunction2<R, T, R>,
                        filterPredicate?: TPredicate1<T>): R {
    if (this.isEmpty(sourceArray)) {
      return initialValue
    }
    const finalAccumulator = Function2.of(accumulator);
    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
      ? Predicate1.alwaysTrue<T>()
      : Predicate1.of(filterPredicate);

    let result: R = initialValue;
    for (let i = 0; i < sourceArray!.length; i++) {
      const currentElement = sourceArray![i];
      if (finalFilterPredicate.apply(currentElement)) {
        result = finalAccumulator.apply(
          result,
          currentElement
        );
      }
    }
    return result;
  }


  /**
   *    Partitions given `sourceArray` into a {@link Map}, applying {@link PartialFunction#apply} and adding values with
   * the same `key` in an array of values.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3, 6]                         [(1, [2])
   *    PartialFunction.of(                   (3, [4])]
   *      (n: number) => 1 == n % 2,
   *      (n: number) => [n, 1 + n]
   *    )
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter and transform
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceArray`
   *
   * @return new {@link Map} from applying the given {@link PartialFunction} to each element of `sourceArray`
   *         on which it is defined and collecting the results
   *
   * @throws {@link IllegalArgumentError} if `partialFunction` is `null` or `undefined` with a not empty `sourceArray`
   */
  static groupMap<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                           partialFunction: PartialFunction<T, [K, V]>): Map<K, V[]>;


  /**
   *    Partitions given `sourceArray` into a {@link Map}, applying `discriminatorKey` and `valueMapper` if the current
   * element verifies `filterPredicate`. All values with the same `key` will be added in an array.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate1#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3, 6]                         [(2, [2])
   *    (n: number) => 1 + n                  (4, [6])
   *    (n: number) => 2 * n
   *    (n: number) => 1 == n % 2
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter and transform
   * @param discriminatorKey
   *    The discriminator {@link TFunction1} to get the key values of returned {@link Map}
   * @param valueMapper
   *    {@link TFunction1} to transform elements of `sourceArray`
   * @param filterPredicate
   *    {@link TPredicate1} to filter elements of `sourceArray`
   *
   * @return new {@link Map} from applying the given `discriminatorKey` and `valueMapper` to each element of `sourceArray`
   *         that verifies `filterPredicate`
   *
   * @throws {@link IllegalArgumentError} if `discriminatorKey` or `valueMapper` are `null` or `undefined` with a not empty `sourceArray`
   */
  static groupMap<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                           discriminatorKey: TFunction1<T, K>,
                           valueMapper: TFunction1<T, V>,
                           filterPredicate?: TPredicate1<T>): Map<K, V[]>;


  static groupMap<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                           partialFunctionOrDiscriminatorKey: PartialFunction<T, [K, V]> | TFunction1<T, K>,
                           valueMapper?: TFunction1<T, V>,
                           filterPredicate?: TPredicate1<T>): Map<K, V[]> {
    const result: Map<K, V[]> = new Map<K, V[]>();
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrDiscriminatorKey,
        'partialFunctionOrDiscriminatorKey must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrDiscriminatorKey)
        ? <PartialFunction<T, [K, V]>>partialFunctionOrDiscriminatorKey
        : PartialFunction.ofKeyValueMapper(
            filterPredicate,
            <TFunction1<T, K>>partialFunctionOrDiscriminatorKey,
            <TFunction1<T, V>>valueMapper
          );

      for (let item of sourceArray!) {
        if (finalPartialFunction.isDefinedAt(item)) {
          const pairKeyValue: [K, V] = <[K, V]>finalPartialFunction.apply(item);
          MapUtil.putIfAbsent(
            result,
            pairKeyValue[0],
            []
          );
          result.get(pairKeyValue[0])!
            .push(pairKeyValue[1]);
        }
      }
    }
    return result;
  }


  /**
   *    Partitions given `sourceArray` into a {@link Map}, applying `discriminatorKey` and `valueMapper` if the current
   * element verifies `filterPredicate`. All values with the same `key` will be added in an array.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate1#alwaysTrue} will be applied. This method is
   * similar to {@link ArrayUtil#groupMap} but `discriminatorKey` returns an array of related key values.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                 Result:
   *    [1, 2, 3, 6, 11, 12]                        [("even",  [2, 6])
   *    (n: number) => {                             ("odd",   [1, 3])
   *      const keys: string[] = [];                 ("smaller5", [1, 2, 3])
   *      if (0 == n % 2) {                          ("greaterEqual5", [6])]
   *        keys.push("even");
   *      } else {
   *        keys.push("odd");
   *      }
   *      if (5 > n) {
   *        keys.push("smaller5");
   *      } else {
   *        keys.push("greaterEqual5");
   *      }
   *      return keys;
   *    }
   *    (n: number) => n
   *    (n: number) => 10 > n
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter and transform
   * @param discriminatorKey
   *    The discriminator {@link TFunction1} to get the key values of returned {@link Map}
   * @param valueMapper
   *    {@link TFunction1} to transform elements of `sourceArray`
   * @param filterPredicate
   *    {@link TPredicate1} to filter elements of `sourceArray`
   *
   * @return new {@link Map} from applying the given `discriminatorKey` and `valueMapper` to each element of `sourceArray`
   *         that verifies `filterPredicate`
   *
   * @throws {@link IllegalArgumentError} if `discriminatorKey` or `valueMapper` are `null` or `undefined` with a not empty `sourceArray`
   */
  static groupMapMultiKey = <T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                                      discriminatorKey: TFunction1<T, K[]>,
                                      valueMapper: TFunction1<T, V>,
                                      filterPredicate?: TPredicate1<T>): Map<K, V[]> => {
    const result: Map<K, V[]> = new Map<K, V[]>();
    if (!this.isEmpty(sourceArray)) {
      const finalValueMapper = Function1.of(valueMapper);
      const finalDiscriminatorKey = Function1.of(discriminatorKey);
      const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
        ? Predicate1.alwaysTrue<T>()
        : Predicate1.of(filterPredicate);

      for (let item of sourceArray!) {
        if (finalFilterPredicate.apply(item)) {
           const valueMapperResult = finalValueMapper.apply(item);
           const discriminatorKeyResult = ObjectUtil.getOrElse(
             finalDiscriminatorKey.apply(item),
             []
           );
          for (let key of discriminatorKeyResult!) {
            MapUtil.putIfAbsent(
              result,
              key,
              []
            );
            result.get(key)!
              .push(valueMapperResult);
          }
        }
      }
    }
    return result;
  }


  /**
   *    Partitions given `sourceArray` into a {@link Map} of arrays as values, according to `partialFunction`.
   * If the current element verifies {@link PartialFunction#isDefinedAt}, all the values that have the same `key`
   * after applying {@link PartialFunction#apply} are then reduced into a single value with `reduceValues`.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                  Intermediate Map:          Result:
   *    [1, 2, 3, 6, 7, 11, 12]                      [(0,  [4, 7])              [(0, 11),
   *    (n1: number, n2: number) => n1 + n2           (1,  [2, 8])               (1, 10)
   *    PartialFunction.of(                           (2,  [3])]                 (2, 3)]
   *      (n: number) => 10 > n,
   *      (n: number) => [n % 3, n + 1]
   *    )
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter, transform and reduce
   * @param reduceValues
   *    {@link TBinaryOperator} used to reduce the values related with same key
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceArray`
   *
   * @return new {@link Map} from applying the given {@link PartialFunction} to each element of `sourceArray`
   *         on which it is defined, collecting the results and reduce them
   *
   * @throws {@link IllegalArgumentError} if `reduceValues` or `partialFunction` are `null` or `undefined` with a not
   *                                      empty `sourceArray`
   */
  static groupMapReduce<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                                 reduceValues: TBinaryOperator<V>,
                                 partialFunction: PartialFunction<T, [K, V]>): Map<K, V>;


  static groupMapReduce<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                                 reduceValues: FBinaryOperator<V>,
                                 partialFunction: PartialFunction<T, [K, V]>): Map<K, V>;


  /**
   *    Partitions given `sourceArray` into a {@link Map} of arrays as values, according to `discriminatorKey`. All
   * the values that have the same discriminator are then transformed by the `valueMapper` {@link TFunction1} and
   * then reduced into a single value with `reduceValues`.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                  Intermediate Map:          Result:
   *    [1, 2, 3, 6, 7]                              [(0,  [4, 7])              [(0, 11),
   *    (n1: number, n2: number) => n1 + n2           (1,  [2, 8])               (1, 10)
   *    (n: number) => n % 3                          (2,  [3])]                 (2, 3)]
   *    (n: number) => n + 1
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter, transform and reduce
   * @param reduceValues
   *    {@link TBinaryOperator} used to reduce the values related with same key
   * @param discriminatorKey
   *    {@link TFunction1} to get the key values of returned {@link Map}
   * @param valueMapper
   *    {@link TFunction1} to transform elements of `sourceArray`
   *
   * @return new {@link Map} from applying the given `discriminatorKey` and `valueMapper` to each element of `sourceArray`,
   *         collecting the results and reduce them
   *
   * @throws {@link IllegalArgumentError} if `reduceValues`, `discriminatorKey` or `valueMapper` are `null` or `undefined`
   *                                      with a not empty `sourceArray`
   */
  static groupMapReduce<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                                 reduceValues: TBinaryOperator<V>,
                                 discriminatorKey: TFunction1<T, K>,
                                 valueMapper: TFunction1<T, V>): Map<K, V>;


  static groupMapReduce<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                                 reduceValues: FBinaryOperator<V>,
                                 discriminatorKey: FFunction1<T, K>,
                                 valueMapper: FFunction1<T, V>): Map<K, V>;


  static groupMapReduce<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                                 reduceValues: TBinaryOperator<V>,
                                 partialFunctionOrDiscriminatorKey: PartialFunction<T, [K, V]> | TFunction1<T, K>,
                                 valueMapper?: TFunction1<T, V>): Map<K, V> {
    const result = new Map<K, V>();
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        reduceValues,
        'reduceValues must be not null and not undefined'
      );
      AssertUtil.notNullOrUndefined(
        partialFunctionOrDiscriminatorKey,
        'partialFunctionOrDiscriminatorKey must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrDiscriminatorKey)
        ? <PartialFunction<T, [K, V]>>partialFunctionOrDiscriminatorKey
        : PartialFunction.ofKeyValueMapper(
            Predicate1.alwaysTrue<T>(),
            <TFunction1<T, K>>partialFunctionOrDiscriminatorKey,
            <TFunction1<T, V>>valueMapper
          );
      this.groupMap(
        sourceArray,
        finalPartialFunction
      )
      .forEach((value, key) => {
        result.set(
          key,
          // @ts-ignore
          this.reduce(
            value,
            reduceValues
          )
        );
      })
    }
    return result;
  }


  /**
   * Verifies if the given `arrayToVerify` contains at least one element.
   *
   * @param arrayToVerify
   *    Array to verify
   *
   * @return `true` if `arrayToVerify` is `undefined`, `null` or empty.
   *         `false` otherwise.
   */
  static isEmpty = (arrayToVerify?: Nullable<any[]>): boolean =>
    _.isEmpty(arrayToVerify);


  /**
   * Returns an array by applying the {@link TFunction1} `mapFunction` a function to all elements of `sourceArray`.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3, 6]                         ['2', '4', '6', '12']
   *    (n: number) => '' + (2 * n)
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to transform
   * @param mapFunction
   *   {@link TFunction1} used to transform given `sourceArray` elements
   *
   * @return new array from applying the given {@link TFunction1} to each element of `sourceArray`
   *
   * @throws {@link IllegalArgumentError} if `mapFunction` is `null` or `undefined` with a not empty `sourceArray`
   */
  static map = <T, R>(sourceArray: NullableOrUndefined<T[]>,
                      mapFunction: TFunction1<T, R>): R[] => {
    const result: R[] = [];
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        mapFunction,
        'mapFunction must be not null and not undefined'
      );
      const finalMapFunction = Function1.of(mapFunction);
      for (let item of sourceArray!) {
        result.push(
          finalMapFunction.apply(
            item
          )
        );
      }
    }
    return result;
  }


  /**
   * Finds the first element of the given `sourceArray` which yields the largest value measured by `comparator`.
   *
   * <pre>
   * Example:
   *
   *  Parameters:                             Result:
   *    [1, 10, 21, 2]                         21
   *    (a: number, b: number) => a - b
   * </pre>
   *
   * @param sourceArray
   *    Array to get its largest element
   * @param comparator
   *    {@link TComparator} used to determine the order of the elements
   *
   * @return largest value (including `null` or `undefined`) using given {@link TComparator},
   *         `undefined` if `sourceArray` has no elements
   *
   * @throws {@link IllegalArgumentError} if `comparator` is `null` or `undefined` with a not empty `sourceArray`
   */
  static max = <T>(sourceArray: NullableOrUndefined<T[]>,
                   comparator: TComparator<T>): NullableOrUndefined<T> => {
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        comparator,
        'comparator must be not null and not undefined'
      );
      const finalComparator = Comparator.of<T>(comparator);
      return this.reduce<T>(
        sourceArray,
        BinaryOperator.of<T>(
          (t1: T,
           t2: T) => {
            const comparatorResult = finalComparator.compare(
              t1, t2
            );
            return 0 == comparatorResult
              ? t1
              : 0 < comparatorResult
                ? t1
                : t2;
          }
        )
      );
    }
    return undefined;
  }


  /**
   * Finds the first element of the given `sourceArray` which yields the largest value measured by `comparator`.
   *
   * <pre>
   * Example:
   *
   *  Parameters:                             Result:
   *    [1, 10, 21, 2]                         Optional(21)
   *    (a: number, b: number) => a - b
   * </pre>
   *
   * @param sourceArray
   *    Array to get its largest element
   * @param comparator
   *    {@link TComparator} used to determine the order of the elements
   *
   * @return {@link Optional} with largest value using given {@link TComparator},
   *         {@link Optional#empty} if `sourceArray` has no elements or its largest value is `null` or `undefined`
   *
   * @throws {@link IllegalArgumentError} if `comparator` is `null` or `undefined` with a not empty `sourceArray`
   */
  static maxOptional = <T>(sourceArray: NullableOrUndefined<T[]>,
                           comparator: TComparator<T>): Optional<T> =>
    Optional.ofNullable(
      this.max(
        sourceArray,
        comparator
      )
    );


  /**
   * Finds the first element of the given `sourceArray` which yields the smallest value measured by `comparator`.
   *
   * <pre>
   * Example:
   *
   *  Parameters:                             Result:
   *    [1, 10, 21, 2]                         1
   *    (a: number, b: number) => a - b
   * </pre>
   *
   * @param sourceArray
   *    Array to get its smallest element
   * @param comparator
   *    {@link TComparator} used to determine the order of the elements
   *
   * @return smallest value (including `null` or `undefined`) using given {@link TComparator},
   *         `undefined` if `sourceArray` has no elements
   *
   * @throws {@link IllegalArgumentError} if `comparator` is `null` or `undefined` with a not empty `sourceArray`
   */
  static min = <T>(sourceArray: NullableOrUndefined<T[]>,
                   comparator: TComparator<T>): NullableOrUndefined<T> => {
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        comparator,
        'comparator must be not null and not undefined'
      );
      const finalComparator = Comparator.of<T>(comparator);
      return this.reduce<T>(
        sourceArray,
        BinaryOperator.of<T>(
          (t1: T,
           t2: T) => {
            const comparatorResult = finalComparator.compare(
              t1, t2
            );
            return 0 == comparatorResult
              ? t1
              : 0 < comparatorResult
                ? t2
                : t1;
          }
        )
      );
    }
    return undefined;
  }


  /**
   * Finds the first element of the given `sourceArray` which yields the smallest value measured by `comparator`.
   *
   * <pre>
   * Example:
   *
   *  Parameters:                             Result:
   *    [1, 10, 21, 2]                         Optional(1)
   *    (a: number, b: number) => a - b
   * </pre>
   *
   * @param sourceArray
   *    Array to get its smallest element
   * @param comparator
   *    {@link TComparator} used to determine the order of the elements
   *
   * @return {@link Optional} with smallest value using given {@link TComparator},
   *         {@link Optional#empty} if `sourceArray` has no elements or its smallest value is `null` or `undefined`
   *
   * @throws {@link IllegalArgumentError} if `comparator` is `null` or `undefined` with a not empty `sourceArray`
   */
  static minOptional = <T>(sourceArray: NullableOrUndefined<T[]>,
                           comparator: TComparator<T>): Optional<T> =>
    Optional.ofNullable(
      this.min(
        sourceArray,
        comparator
      )
    );


  /**
   *    Performs a reduction on the elements of `sourceArray`, using an associative accumulation {@link TBinaryOperator},
   * and returns a value describing the reduced elements, if any. Returns `undefined` otherwise.
   *
   * @apiNote
   *    This method is similar to {@link ArrayUtil#foldLeft} but `accumulator` works with the same type that `sourceArray`
   * and only uses contained elements of provided array.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                               Result:
   *    [5, 7, 9]                                 315
   *    (n1: number, n2: number) => n1 * n2
   * </pre>
   *
   * @param sourceArray
   *    Array with elements to combine
   * @param accumulator
   *    A {@link TBinaryOperator} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive elements `sourceArray`, going left to right
   *
   * @throws {@link IllegalArgumentError} if `accumulator` is `null` or `undefined` and `sourceArray` is not empty
   */
  static reduce<T>(sourceArray: NullableOrUndefined<T[]>,
                   accumulator: TBinaryOperator<T>): OrUndefined<T>;


  static reduce<T>(sourceArray: NullableOrUndefined<T[]>,
                   accumulator: FBinaryOperator<T>): OrUndefined<T>;


  static reduce<T>(sourceArray: NullableOrUndefined<T[]>,
                   accumulator: TBinaryOperator<T>): OrUndefined<T> {
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        accumulator,
        'accumulator must be not null and not undefined'
      );
      return this.foldLeft<T, T>(
        sourceArray!.slice(1),
        sourceArray![0],
        accumulator
      );
    }
    return undefined;
  }


  /**
   * Removes from `sourceArray` all of its elements that are contained in the given array `toRemoveArray`.
   *
   * @apiNote
   *    {@link ObjectUtil#equals} comparing items will be used to know if the current element should be removed or not.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3]                            [2]
   *    [1, 3, 4]
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to retain and/or remove
   * @param toRemoveArray
   *    Array with elements to delete
   *
   * @return array with the elements of `sourceArray` not contained in `toRemoveArray`
   */
  static removeAll<T>(sourceArray: NullableOrUndefined<T[]>,
                      toRemoveArray: NullableOrUndefined<T[]>): T[];


  /**
   *    Removes from `sourceArray` all of its elements that are contained in the given array `toRemoveArray`, based on
   * provided {@link TPredicate2} `areEqualsComparison` to know when two elements are equals.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                       Result:
   *    [{'x':2, 'y': 1}, {'x': 1, 'y': 0}, {'x': 1, 'y': 3}]             [{'x':2, 'y': 1}]
   *    [{'x': 1, 'y': 23}]
   *    (a: object, b: object) => a.x == b.x
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to retain and/or remove
   * @param toRemoveArray
   *    Array with elements to delete
   * @param areEqualsComparison
   *    {@link TPredicate2} used to know if two elements are equals or not
   *
   * @return array with the elements of `sourceArray` not contained in `toRemoveArray`
   */
  static removeAll<T>(sourceArray: NullableOrUndefined<T[]>,
                      toRemoveArray: NullableOrUndefined<T[]>,
                      areEqualsComparison: TPredicate2<T, T>): T[];


  static removeAll<T>(sourceArray: NullableOrUndefined<T[]>,
                      toRemoveArray: NullableOrUndefined<T[]>,
                      areEqualsComparison?: TPredicate2<T, T>): T[] {
    if (this.isEmpty(sourceArray)) {
      return [];
    }
    if (this.isEmpty(toRemoveArray)) {
      return sourceArray!;
    }
    const finalAreEqualsComparison = this.getFinalAreEqualsComparison(areEqualsComparison);
    const result: T[] = [];
    for (let sourceItem of sourceArray!) {
      const wasFound = toRemoveArray!.find(
        (toRemoveItem: T) =>
          finalAreEqualsComparison.apply(
            sourceItem,
            toRemoveItem
          )
      );
      if (!wasFound) {
        result.push(sourceItem);
      }
    }
    return result;
  }


  /**
   *    Retains only the elements of `sourceArray` that are contained in the given array `toKeepArray`. In other words,
   * removes from `sourceArray` all of its elements that are not contained in `toKeepArray`.
   *
   * @apiNote
   *    {@link ObjectUtil#equals} comparing items will be used to know if the current element should be retained or not.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3]                            [1, 3]
   *    [1, 3, 4]
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to retain and/or remove
   * @param toKeepArray
   *    Array with elements to keep
   *
   * @return array with the elements of `sourceArray` contained in `toKeepArray`
   */
  static retainAll<T>(sourceArray: NullableOrUndefined<T[]>,
                      toKeepArray: NullableOrUndefined<T[]>): T[];


  /**
   *    Retains only the elements of `sourceArray` that are contained in the given array `toKeepArray`, based on
   * provided {@link TPredicate2} `areEqualsComparison` to know when two elements are equals.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                       Result:
   *    [{'x':2, 'y': 1}, {'x': 1, 'y': 0}, {'x': 1, 'y': 3}]             [{'x': 1, 'y': 0}, {'x': 1, 'y': 3}]
   *    [{'x': 1, 'y': 23}]
   *    (a: object, b: object) => a.x == b.x
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to retain and/or remove
   * @param toKeepArray
   *    Array with elements to keep
   * @param areEqualsComparison
   *    {@link TPredicate2} used to know if two elements are equals or not
   *
   * @return array with the elements of `sourceArray` contained in `toKeepArray`
   */
  static retainAll<T>(sourceArray: NullableOrUndefined<T[]>,
                      toKeepArray: NullableOrUndefined<T[]>,
                      areEqualsComparison: TPredicate2<T, T>): T[];


  static retainAll<T>(sourceArray: NullableOrUndefined<T[]>,
                      toKeepArray: NullableOrUndefined<T[]>,
                      areEqualsComparison?: TPredicate2<T, T>): T[] {
    if (this.isEmpty(sourceArray) ||
        this.isEmpty(toKeepArray)) {
      return [];
    }
    const finalAreEqualsComparison = this.getFinalAreEqualsComparison(areEqualsComparison);
    const result: T[] = [];
    for (let sourceItem of sourceArray!) {
      const wasFound = toKeepArray!.find(
        (toKeepItem: T) =>
          finalAreEqualsComparison.apply(
            sourceItem,
            toKeepItem
          )
      );
      if (wasFound) {
        result.push(sourceItem);
      }
    }
    return result;
  }


  /**
   * Sorts the given `sourceArray` using `comparator` if provided or default ordination otherwise.
   *
   * @apiNote
   *    The default sort order is ascending, built upon converting the elements into strings, then comparing their
   * sequences of UTF-16 code units values.
   *
   * <pre>
   * Example 1:
   *
   *   Parameters:                            Result:
   *    [1, 10, 21, 2]                         [1, 10, 2, 21]
   *
   *
   * Example 2:
   *
   *   Parameters:                            Result:
   *    [1, 10, 21, 2]                         [1, 2, 10, 21]
   *    (a: number, b: number) => a - b
   * </pre>
   *
   * @param sourceArray
   *    Array with elements to sort
   * @param comparator
   *    {@link TComparator} used to determine the order of the elements
   *
   * @return new sorted array
   */
  static sort = <T>(sourceArray: NullableOrUndefined<T[]>,
                    comparator?: Nullable<TComparator<T>>): T[] => {
    if (this.isEmpty(sourceArray)) {
      return [];
    }
    const clonedSourceArray = _.cloneDeep(sourceArray);
    return comparator
      ? clonedSourceArray!.sort(
          Comparator.of(comparator)
            .getComparator()
        )
      : clonedSourceArray!.sort();
  }


  /**
   *    Returns an array with the longest prefix of elements included in `sourceArray` that satisfy the
   * {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements of `sourceArray` will be returned.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 3, 4, 5, 6]                      [1, 3]
   *    (n: number) => 1 == n % 2
   * </pre>
   *
   * @param sourceArray
   *    Array to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return the longest prefix of provided `sourceArray` whose elements all satisfy `filterPredicate`
   */
  static takeWhile = <T>(sourceArray: NullableOrUndefined<T[]>,
                         filterPredicate: NullableOrUndefined<TPredicate1<T>>): T[] => {
    if (this.isEmpty(sourceArray) ||
        ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return this.copy(sourceArray);
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate!);
    const result: T[] = [];
    for (let item of sourceArray!) {
      if (finalFilterPredicate.apply(item)) {
        result.push(item);
      } else {
        return result;
      }
    }
    return result;
  }


  /**
   * Converts the given `sourceArray` to a {@link Map} using provided `partialFunction`.
   *
   * @apiNote
   *    If several elements return the same key, the last one will be the final value.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                          Result:
   *    [1, 2, 3, 1]                         [(1, 2)
   *    PartialFunction.of(                   (3, 4)]
   *      (n: number) => 1 == n % 2,
   *      (n: number) => [n, 1 + n]
   *    )
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to filter and transform
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceArray`
   *
   * @return new {@link Map} from applying the given {@link PartialFunction} to each element of `sourceArray`
   *         on which it is defined and collecting the results
   *
   * @throws {@link IllegalArgumentError} if `partialFunction` is `null` or `undefined` with a not empty `sourceArray`
   */
  static toMap<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                        partialFunction: PartialFunction<T, [K, V]>): Map<K, V>;


  /**
   *    Converts the given `sourceArray` into a {@link Map} using provided `discriminatorKey` and {@link Function1#identity}
   * as values of returned {@link Map}.
   *
   * @apiNote
   *    If several elements return the same key, the last one will be the final value.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                   Result:
   *    [1, 2, 3, 1]                  [('1', 1),
   *    (n: number) => '' + n          ('2', 2),
   *                                   ('3', 3)]
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to transform and include in the returned {@link Map}
   * @param discriminatorKey
   *    The discriminator {@link TFunction1} to get the key values of returned {@link Map}
   *
   * @return {@link Map} applying `discriminatorKey` to each element of `sourceArray` to get {@link Map}'s key,
   *         and current element as {@link Map}'s value
   *
   * @throws {@link IllegalArgumentError} if `discriminatorKey` is `null` or `undefined` with a not empty `sourceArray`
   */
  static toMap<T, K>(sourceArray: NullableOrUndefined<T[]>,
                     discriminatorKey: TFunction1<T, K>): Map<K, T>;


  /**
   *    Converts the given `sourceArray` into a {@link Map} using provided `discriminatorKey` and `valueMapper` if the
   * current element verifies `filterPredicate` (if provided).
   *
   * @apiNote
   *    If several elements return the same key, the last one will be the final value.
   *    If `valueMapper` is `null` or `undefined` then {@link Function1#identity} will be applied.
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate1#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                   Result:
   *    [1, 2, 3, 1]                  [('1', 2),
   *    (n: number) => '' + n          ('3', 4)]
   *    (n: number) => 1 + n
   *    (n: number) => 1 == n % 2
   * </pre>
   *
   * @param sourceArray
   *    Array with the elements to transform and include in the returned {@link Map}
   * @param discriminatorKey
   *    The discriminator {@link TFunction1} to get the key values of returned {@link Map}
   * @param valueMapper
   *    {@link TFunction1} to transform elements of `sourceArray` into values of the returned {@link Map}
   * @param filterPredicate
   *    {@link TPredicate1} to filter elements of `sourceArray`
   *
   * @return new {@link Map} from applying the given `discriminatorKey` and `valueMapper` to each element of `sourceArray`
   *         that verifies `filterPredicate`
   *
   * @throws {@link IllegalArgumentError} if `discriminatorKey` is `null` or `undefined` with a not empty `sourceArray`
   */
  static toMap<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                        discriminatorKey: TFunction1<T, K>,
                        valueMapper: TFunction1<T, V>,
                        filterPredicate?: TPredicate1<T>): Map<K, V>;


  static toMap<T, K, V>(sourceArray: NullableOrUndefined<T[]>,
                        partialFunctionOrDiscriminatorKey: PartialFunction<T, [K, V]> | TFunction1<T, K>,
                        valueMapper?: TFunction1<T, V>,
                        filterPredicate?: TPredicate1<T>): Map<K, V> {
    const result: Map<K, V> = new Map<K, V>();
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrDiscriminatorKey,
        'partialFunctionOrDiscriminatorKey must be not null and not undefined'
      );
      const finalValueMapper = valueMapper
        ? valueMapper
        : Function1.identity()

      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrDiscriminatorKey)
        ? <PartialFunction<T, [K, V]>>partialFunctionOrDiscriminatorKey
        : PartialFunction.ofKeyValueMapper(
            filterPredicate,
            <TFunction1<T, K>>partialFunctionOrDiscriminatorKey,
            <TFunction1<T, V>>finalValueMapper
          );

      for (let item of sourceArray!) {
        if (finalPartialFunction.isDefinedAt(item)) {
          const pairKeyValue: [K, V] = <[K, V]>finalPartialFunction.apply(item);
          result.set(
            pairKeyValue[0],
            pairKeyValue[1]
          );
        }
      }
    }
    return result;
  }


  /**
   * Returns the final version of provided {@link TPredicate2} to know if two elements of type `T` are equals.
   *
   * @param areEqualsComparison
   *   {@link TPredicate2} used to know if two elements are equals or not
   *
   * @return provided `areEqualsComparison` if not `null` or `undefined`,
   *         new {@link Predicate2} using {@link ObjectUtil#equals} to compare both elements
   */
  private static getFinalAreEqualsComparison = <T>(areEqualsComparison?: TPredicate2<T, T>): Predicate2<T, T> =>
    ObjectUtil.isNullOrUndefined(areEqualsComparison)
      ? Predicate2.of<T, T>(
        (t1: T, t2: T) =>
          ObjectUtil.equals(t1, t2)
        )
      : Predicate2.of(areEqualsComparison);

}
