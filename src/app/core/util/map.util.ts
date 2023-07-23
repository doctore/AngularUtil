import {
  Function2,
  Function3,
  PartialFunction,
  TFunction0,
  TFunction2,
  TFunction3
} from '@app-core/types/function';
import { Predicate2, TPredicate2 } from '@app-core/types/predicate';
import { Nullable, NullableOrUndefined, Optional, OrUndefined } from '@app-core/types';
import { AssertUtil, ObjectUtil } from '@app-core/util';

/**
 * Helper functions to manage Maps.
 */
export class MapUtil {

  constructor() {
    throw new SyntaxError('MapUtil is an utility class');
  }


  /**
   *    Returns a new {@link Map} using the given `sourceMap`, applying {@link PartialFunction#apply} if the current element
   * verifies {@link PartialFunction#isDefinedAt}, `orElseMapper` otherwise.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                        Result:
   *    [('A', 1), ('B', 2)]                               [('A', 2), ('B', 4)]
   *    PartialFunction.of(
   *      ([k, v]: [string, number]) => 1 == v % 2,
   *      ([k, v]: [string, number]) => [k, 1 + v]
   *    )
   *    (k: string, v: number)=> [k, 2 * v]
   * </pre>
   *
   * @param sourceMap
   *    Source {@link Map} with the elements to filter and transform
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceMap`
   * @param orElseMapper
   *    {@link TFunction2} to transform elements of `sourceMap` do not verify {@link PartialFunction#isDefinedAt}
   *
   * @return new {@link Map} from applying the given {@link PartialFunction} to each element of `sourceMap`
   *         on which it is defined and collecting the results or `orElseMapper` otherwise
   *
   * @throws {@link IllegalArgumentError} if `partialFunction` or `orElseMapper` is `null` or `undefined` with a not empty `sourceMap`
   */
  static applyOrElse<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                     partialFunction: PartialFunction<[K1, V1], [K2, V2]>,
                                     orElseMapper: TFunction2<K1, V1, [K2, V2]>): Map<K2, V2>;


  /**
   *    Returns a new {@link Map} using the given `sourceMap`, applying `defaultMapper` if the current element verifies
   * `filterPredicate`, `orElseMapper` otherwise.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate2#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                        Result:
   *    [('A', 1), ('B', 2)]                               [('A', 2), ('B', 4)]
   *    (k: string, v: number) => [k, 1 + v]
   *    (k: string, v: number) => [k, 2 * v]
   *    (k: string, v: number) => 1 == v % 2
   * </pre>
   *
   * @param sourceMap
   *    Source {@link Map} with the elements to filter and transform
   * @param defaultMapper
   *    {@link TFunction2} to transform elements of `sourceMap` that verify `filterPredicate`
   * @param orElseMapper
   *    {@link TFunction2} to transform elements of `sourceMap` do not verify `filterPredicate`
   * @param filterPredicate
   *    {@link TPredicate2} to filter elements of `sourceMap`
   *
   * @return new {@link Map} from applying the given `defaultMapper` to each element of `sourceMap` that verifies `filterPredicate`
   *         and collecting the results or `orElseMapper` otherwise
   *
   * @throws {@link IllegalArgumentError} if `defaultMapper` or `orElseMapper` is `null` or `undefined` with a not empty `sourceMap`
   */
  static applyOrElse<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                     defaultMapper: TFunction2<K1, V1, [K2, V2]>,
                                     orElseMapper: TFunction2<K1, V1, [K2, V2]>,
                                     filterPredicate: TPredicate2<K1, V1>): Map<K2, V2>;


  static applyOrElse<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                     partialFunctionOrDefaultMapper: PartialFunction<[K1, V1], [K2, V2]> | TFunction2<K1, V1, [K2, V2]>,
                                     orElseMapper: TFunction2<K1, V1, [K2, V2]>,
                                     filterPredicate?: TPredicate2<K1, V1>): Map<K2, V2> {
    let result = new Map<K2, V2>();
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrDefaultMapper,
        'partialFunctionOrDefaultMapper must be not null and not undefined'
      );
      AssertUtil.notNullOrUndefined(
        orElseMapper,
        'orElseMapper must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrDefaultMapper)
        ? <PartialFunction<[K1, V1], [K2, V2]>>partialFunctionOrDefaultMapper
        : PartialFunction.of2(
            filterPredicate,
            <TFunction2<K1, V1, [K2, V2]>>partialFunctionOrDefaultMapper
        );
      const finalOrElseMapper = Function2.of(orElseMapper);

      for (let [key, value] of sourceMap!) {
        const elementResult = finalPartialFunction.isDefinedAt([key, value])
          ? finalPartialFunction.apply([key, value])
          : finalOrElseMapper.apply(key, value);

        result.set(
          elementResult[0],
          elementResult[1]
        );
      }
    }
    return result;
  }


  /**
   * Returns a {@link Map} after:
   * <p>
   *  - Filter its elements using {@link PartialFunction#isDefinedAt} of `partialFunction`
   *  - Transform its filtered elements using {@link PartialFunction#apply} of `partialFunction`
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                        Result:
   *    [(1, 'Hi'), (2, 'Hello')]                          [(1, 2)]
   *    PartialFunction.of(
   *      ([k, v]: [number, string]) => 1 == k % 2,
   *      ([k, v]: [number, string]) => [k, v.length]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    Source {@link Map} with the elements to filter and transform
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements from `sourceMap`
   *
   * @return new {@link Map} from applying the given {@link PartialFunction} to each element of `sourceMap`
   *         on which it is defined and collecting the results
   *
   * @throws {@link IllegalArgumentError} if `partialFunction` is `null` or `undefined` with a not empty `sourceMap`
   */
  static collect<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                 partialFunction: PartialFunction<[K1, V1], [K2, V2]>): Map<K2, V2>;

  /**
   * Returns a {@link Map} after:
   * <p>
   * - Filter its elements using the {@link TPredicate2} `filterPredicate`
   *  - Transform its filtered elements using the {@link TFunction2} `mapFunction`
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate2#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                       Result:
   *    [(1, 'Hi'), (2, 'Hello')]                         [(1, 2)]
   *    (k: number, v: string) => [k, v.length]
   *    (k: number, v: string) => 1 == k % 2
   * </pre>
   *
   * @param sourceMap
   *    Source {@link Map} with the elements to filter and transform
   * @param mapFunction
   *    {@link TFunction2} to transform filtered elements of the source `sourceMap`
   * @param filterPredicate
   *    {@link TPredicate2} to filter elements from `sourceMap`
   *
   * @return new {@link Map} from applying the given {@link TFunction2} to each element of `sourceMap`
   *         on which {@link TPredicate2} returns `true` and collecting the results
   *
   * @throws {@link IllegalArgumentError} if `mapFunction` is `null` or `undefined` with a not empty `sourceMap`
   */
  static collect<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                 mapFunction: TFunction2<K1, V1, [K2, V2]>,
                                 filterPredicate: TPredicate2<K1, V1>): Map<K2, V2>;


  static collect<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                 partialFunctionOrMapFunction: PartialFunction<[K1, V1], [K2, V2]> | TFunction2<K1, V1, [K2, V2]>,
                                 filterPredicate?: TPredicate2<K1, V1>): Map<K2, V2> {
    let result = new Map<K2, V2>();
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrMapFunction,
        'partialFunctionOrMapFunction must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrMapFunction)
        ? <PartialFunction<[K1, V1], [K2, V2]>>partialFunctionOrMapFunction
        : PartialFunction.of2(
            filterPredicate,
            <TFunction2<K1, V1, [K2, V2]>>partialFunctionOrMapFunction
          );
      for (let [key, value] of sourceMap!) {
        if (finalPartialFunction.isDefinedAt([key, value])) {
          const elementResult = finalPartialFunction.apply([key, value]);
          result.set(
            elementResult[0],
            elementResult[1]
          );
        }
      }
    }
    return result;
  }


  /**
   *    Returns a new {@link Map} using `sourceMap` as source, removing from the result the elements that verify the
   * given {@link TPredicate2} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate2#alwaysFalse} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                  Result:
   *    [(1, 'Hi'), (2, 'Hello'), (3, 'World')]                      [(1, 'Hi'), (2, 'Hello')]
   *    (k: number, v: string) => 1 == k % 2 && 2 > v.length()
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to filter
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return empty {@link Map} if `sourceMap` has no elements,
   *         otherwise a new {@link Map} with the elements of `sourceMap` which do not verify `filterPredicate`
   */
  static dropWhile = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                            filterPredicate: TPredicate2<K, V>): Map<K, V> => {

    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
      ? Predicate2.alwaysFalse<K, V>()
      : Predicate2.of(filterPredicate);

    return this.takeWhile(
      sourceMap,
      finalFilterPredicate.not()
    );
  }


  /**
   * Returns from the given `sourceMap` the first element that verifies the provided `filterPredicate`.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                  Result:
   *    [(1, 'Hi'), (2, 'Hello'), (3, 'World')]                      (3, 'World')
   *    (k: number, v: string) => 1 == k % 2 && 2 > v.length()
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to search
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return `undefined` if `sourceMap` has no elements, `filterPredicate` is `null` or `undefined`
   *         or no one verifies provided `filterPredicate`.
   *         Otherwise, a tuple with the first element that verifies `filterPredicate`.
   */
  static find = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                       filterPredicate: TPredicate2<K, V>): OrUndefined<[K, V]> => {
    if (!this.isEmpty(sourceMap) &&
        ObjectUtil.nonNullOrUndefined(filterPredicate)) {

      const finalFilterPredicate = Predicate2.of(filterPredicate);
      for (let [key, value] of sourceMap!) {
        if (finalFilterPredicate.apply(key, value)) {
          return [key, value];
        }
      }
    }
    return undefined;
  }


  /**
   *   Returns an {@link Optional} containing the first element of the given `sourceMap` hat verifies the provided
   * `filterPredicate`, {@link Optional#empty} otherwise.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                  Result:
   *    [(1, 'Hi'), (2, 'Hello'), (3, 'World')]                      Optional(3, 'World')
   *    (k: number, v: string) => 1 == k % 2 && 2 > v.length()
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to search
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return {@link Optional} containing the first element that satisfies `filterPredicate`,
   *         {@link Optional#empty} otherwise.
   */
  static findOptional = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                               filterPredicate: TPredicate2<K, V>): Optional<[K, V]> =>
    Optional.ofNullable(
      this.find(
        sourceMap,
        filterPredicate
      )
    );


  /**
   *    Using the given value `initialValue` as initial one, applies the provided {@link TFunction3} to all
   * elements of `sourceMap`, going left to right.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                         Result:
   *    [(1, 'Hi'), (2, 'Hello')]                                           10
   *    0
   *    (prev: number, k: number, v: string) => prev + k + v.length()
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with elements to combine
   * @param initialValue
   *    The initial value to start with
   * @param accumulator
   *    A {@link TFunction3} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive elements `sourceMap`, going
   *         left to right with the start value `initialValue` on the left.
   *
   * @throws {@link IllegalArgumentError} if `accumulator` is `null` or `undefined` and `sourceMap` is not empty
   */
  static foldLeft<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                           initialValue: R,
                           accumulator: TFunction3<R, K, V, R>): R;


  /**
   *    Using the given value `initialValue` as initial one, applies the provided {@link TFunction3} to all
   * elements of `sourceMap`, going left to right.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                         Result:
   *    [(1, 'Hi'), (2, 'Hello'), (3, 'World')]                             3
   *    0
   *    (prev: number, k: number, v: string) => prev + k + v.length()
   *    (k: number, v: string) => 1 == k % 2 && 2 < v.length()
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with elements to combine
   * @param initialValue
   *    The initial value to start with
   * @param accumulator
   *    A {@link TFunction3} which combines elements
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return result of inserting `accumulator` between consecutive elements `sourceMap`, going
   *         left to right with the start value `initialValue` on the left.
   *
   * @throws {@link IllegalArgumentError} if `accumulator` is `null` or `undefined` and `sourceMap` is not empty
   */
  static foldLeft<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                           initialValue: R,
                           accumulator: TFunction3<R, K, V, R>,
                           filterPredicate: TPredicate2<K, V>): R;


  static foldLeft<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                           initialValue: R,
                           accumulator: TFunction3<R, K, V, R>,
                           filterPredicate?: TPredicate2<K, V>): R {
    if (this.isEmpty(sourceMap)) {
      return initialValue
    }
    const finalAccumulator = Function3.of(accumulator);
    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
      ? Predicate2.alwaysTrue<K, V>()
      : Predicate2.of(filterPredicate);

    let result: R = initialValue;
    for (let [key, value] of sourceMap!) {

      if (finalFilterPredicate.apply(key, value)) {
        result = finalAccumulator.apply(
          result,
          key,
          value
        );
      }
    }
    return result;
  }


  /**
   * Verifies if the given `mapToVerify` contains at least one element.
   *
   * @param mapToVerify
   *    {@link Map} to verify
   *
   * @return `true` if `mapToVerify` is `undefined`, `null` or empty.
   *         `false` otherwise.
   */
  static isEmpty = (mapToVerify?: Nullable<Map<any, any>>): boolean =>
    ObjectUtil.isNullOrUndefined(mapToVerify) ||
      0 == mapToVerify!.size;


  /**
   * Returns the value associated with the given `key` if `sourceMap` contains it, `defaultValue` otherwise.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                      Result:
   *    [(1, 'Hi'), (2, 'Hello')]        'Hi'
   *    1
   *    'World'
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to search `key`
   * @param key
   *    Key to search in `sourceMap`
   * @param defaultValue
   *    Default value to return in case no binding for `key` is found in `sourceMap`
   *
   * @return value associated with the given `key` if `sourceMap` contains it,
   *         `defaultValue` otherwise.
   */
  static getOrElse<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         key: K,
                         defaultValue: V): V;


  /**
   *    Returns the value associated with the given `key` if `sourceMap` contains it, the result after invoking
   * `defaultValue` otherwise.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                      Result:
   *    [(1, 'Hi'), (2, 'Hello')]        'World'
   *    5
   *    () -> 'World'
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to search `key`
   * @param key
   *    Key to search in {@code sourceMap}
   * @param defaultValue
   *    {@link TFunction0} that yields a default value in case no binding for `key` is found in `sourceMap`
   *
   * @return value associated with the given `key` if {@code sourceMap} contains it,
   *         `defaultValue` results otherwise.
   */
  static getOrElse<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         key: K,
                         defaultValue: TFunction0<V>): V;


  static getOrElse<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         key: K,
                         defaultValue: TFunction0<V> | V): V {
    const finalSourceMap = ObjectUtil.getOrElse(
      sourceMap,
      new Map<K, V>()
    );
    // @ts-ignore
    return Optional.ofNullable(key)
      .map(k => finalSourceMap.get(k))
      .getOrElse(defaultValue);
  }


  /**
   *   Partitions given `sourceMap` into a {@link Map}, applying {@link PartialFunction#apply} and adding values with
   * the same `key` in an array of values.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                   Result:
   *    [(1, 'Hi'), (2, 'Hello'), (7, 'World'), (8, 'Ok')]            [(1, [2, 5])
   *    PartialFunction.of(                                            (2, [2]]
   *      ([k, v]: [number, string]) => 1 == k % 2 || 6 < k,
   *      ([k, v]: [number, string]) => [k % 3, v.length]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to filter and transform
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceMap`
   *
   * @return new {@link Map} from applying the given {@link PartialFunction} to each element of `sourceMap`
   *         on which it is defined and collecting the results
   *
   * @throws {@link IllegalArgumentError} if `partialFunction` is `null` or `undefined` with a not empty `sourceMap`
   */
  static groupMap<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                  partialFunction: PartialFunction<[K1, V1], [K2, V2]>): Map<K2, V2[]>;


  /**
   *   Partitions given `sourceMap` into a {@link Map}, applying `discriminatorKey` and `valueMapper` if the current
   * element verifies `filterPredicate`. All values with the same `key` will be added in an array.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate2#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                   Result:
   *    [(1, 'Hi'), (2, 'Hello'), (7, 'World'), (8, 'Ok')]            [(1, [2, 5])
   *    (k: number, v: string) => k % 3                                (2, [2]]
   *    (k: number, v: string) => v.length
   *    (k: number, v: string) => 1 == k % 2 || 6 < k
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to filter and transform
   * @param discriminatorKey
   *    The discriminator {@link TFunction2} to get the key values of returned {@link Map}
   * @param valueMapper
   *    {@link TFunction2} to transform elements of `sourceMap`
   * @param filterPredicate
   *    {@link TPredicate2} to filter elements of `sourceMap`
   *
   * @return new {@link Map} from applying the given `discriminatorKey` and `valueMapper` to each element of `sourceMap`
   *         that verifies `filterPredicate`
   *
   * @throws {@link IllegalArgumentError} if `discriminatorKey` or `valueMapper` is `null` or `undefined` with a not empty `sourceMap`
   */
  static groupMap<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                  discriminatorKey: TFunction2<K1, V1, K2>,
                                  valueMapper: TFunction2<K1, V1, V2>,
                                  filterPredicate?: TPredicate2<K1, V1>): Map<K2, V2[]>;


  static groupMap<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                  partialFunctionOrDiscriminatorKey: PartialFunction<[K1, V1], [K2, V2]> | TFunction2<K1, V1, K2>,
                                  valueMapper?: TFunction2<K1, V1, V2>,
                                  filterPredicate?: TPredicate2<K1, V1>): Map<K2, V2[]> {
    let result: Map<K2, V2[]> = new Map<K2, V2[]>();
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrDiscriminatorKey,
        'partialFunctionOrDiscriminatorKey must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrDiscriminatorKey)
        ? <PartialFunction<[K1, V1], [K2, V2]>>partialFunctionOrDiscriminatorKey
        : PartialFunction.of2(
            filterPredicate,
            Function2.of<K1, V1, [K2, V2]>(
              (k: K1, v: V1) => [
                Function2.of(<TFunction2<K1, V1, K2>>partialFunctionOrDiscriminatorKey).apply(k, v),
                Function2.of(<TFunction2<K1, V1, V2>>valueMapper).apply(k, v)
              ]
            )
          );
      for (let [key, value] of sourceMap!) {
        if (finalPartialFunction.isDefinedAt([key, value])) {
          const pairKeyValue: [K2, V2] = <[K2, V2]>finalPartialFunction.apply([key, value]);
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
   *   If the specified `key` is not already associated with a value in provided {@link Map}, then associates it with the
   * given `value` and returns `undefined`, else returns the previous stored `value`.
   *
   * @param sourceMap
   *    {@link Map} to update if required
   * @param key
   *    Key with which the specified `value` is to be associated
   * @param value
   *    Value to be associated with the specified `key`
   *
   * @return the current `value` associated with the specified `key`, or `undefined` if there was no mapping for the `key`.
   *
   * @throws {@link IllegalArgumentError} if `sourceMap` is `null` or `undefined`
   */
  static putIfAbsent = <K, V>(sourceMap: Map<K, V>,
                              key: K,
                              value: V): OrUndefined<V> => {
    AssertUtil.notNullOrUndefined(
      sourceMap,
      'sourceMap must be not null and not undefined'
    );
    if (!sourceMap.has(key)) {
      sourceMap.set(
        key,
        value
      );
      return undefined;
    }
    return sourceMap.get(key);
  }


  /**
   * Sorts the given `sourceMap` using `comparator` if provided or default ordination otherwise.
   *
   * @apiNote
   *    The default sort order is ascending, built upon converting the elements into strings, then comparing their
   * sequences of UTF-16 code units values.
   *
   * <pre>
   * Example 1:
   *
   *   Parameters:                                                      Result:
   *    [(1, 'a'), (4, 'd'), (11, 'k'), (3, 'c')]                        [(1, 'a'), (11, 'k'), (3, 'c'), (4, 'd')]
   *
   *
   * Example 2:
   *
   *  Parameters:                                                       Result:
   *    [(1, 'a'), (4, 'd'), (11, 'k'), (3, 'c')]                        [(1, 'a'), (3, 'c'), (4, 'd'), (11, 'k')]
   *    (a: [number, string], b: [number, string]) => a[0] - b[0]
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to sort
   * @param comparator
   *    {@link TFunction2} used to determine the order of the elements. The returned value should verify the formula:
   *      <p>
   *        > 0    sort `a` after `b`, e.g. [b, a]
   *      <p>
   *        < 0    sort `a` before `b`, e.g. [a, b]
   *      <p>
   *        === 0  keep original order of `a` and `b`
   *
   * @return new sorted {@link Map}
   */
  static sort = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                       comparator?: Nullable<TFunction2<[K, V], [K, V], number>>): Map<K, V> => {
    if (this.isEmpty(sourceMap)) {
      return new Map<K, V>();
    }
    const clonedSourceMapAsArray = [...sourceMap!.entries()];
    return comparator
      ? new Map(
          clonedSourceMapAsArray!
            .sort(
              Function2.of<[K, V], [K, V], number>(comparator!).getMapper()
            )
        )
      : new Map(
          clonedSourceMapAsArray!.sort()
        );
  }


  /**
   *    Returns a new {@link Map} using `sourceMap` as source, adding from the result the elements that verify the
   * given {@link TPredicate2} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate2#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                  Result:
   *    [(1, 'Hi'), (2, 'Hello'), (3, 'World')]                      [(3, 'World')]
   *    (k: number, v: string) => 1 == k % 2 && 2 < v.length()
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to filter
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return empty {@link Map} if `sourceMap` has no elements or no one verifies provided `filterPredicate`,
   *         otherwise a new {@link Map} with the elements of `sourceMap` which verify `filterPredicate`
   */
  static takeWhile = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                            filterPredicate: TPredicate2<K, V>): Map<K, V> => {
    let result = new Map<K, V>();
    if (!this.isEmpty(sourceMap)) {
      const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
        ? Predicate2.alwaysTrue<K, V>()
        : Predicate2.of(filterPredicate);

      for (let [key, value] of sourceMap!) {
        if (finalFilterPredicate.apply(key, value)) {
          result.set(key, value);
        }
      }
    }
    return result;
  }

}
