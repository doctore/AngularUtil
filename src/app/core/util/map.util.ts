import { Comparator, TComparator } from '@app-core/types/comparator';
import {
  FFunction3,
  Function2,
  Function3,
  PartialFunction,
  TFunction0,
  TFunction2,
  TFunction3
} from '@app-core/types/function';
import { BinaryOperator, FBinaryOperator, TBinaryOperator } from '@app-core/types/function/operator';
import { Optional } from '@app-core/types/functional';
import { Predicate2, TPredicate2 } from '@app-core/types/predicate';
import { Nullable, NullableOrUndefined, OrUndefined } from '@app-core/types';
import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';

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
   *    applyOrElse(                                                 Result:
   *      [('A', 1), ('B', 2)],                                       [('A', 2), ('B', 4)]
   *      PartialFunction.of(
   *        ([k, v]: [string, number]) => 1 == v % 2,
   *        ([k, v]: [string, number]) => [k, 1 + v]
   *      ),
   *      (k: string, v: number)=> [k, 2 * v]
   *    )
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
   *         on which it is defined and collecting the results, `orElseMapper` otherwise
   *
   * @throws {IllegalArgumentError} if `partialFunction` or `orElseMapper` is `null` or `undefined` with a not empty `sourceMap`
   */
  static applyOrElse<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                     partialFunction: PartialFunction<[K1, V1], [K2, V2]>,
                                     orElseMapper: TFunction2<K1, V1, [K2, V2]>): Map<K2, V2>;


  /**
   *    Returns a new {@link Map} using the given `sourceMap`, applying `defaultMapper` if the current element verifies
   * `filterPredicate`, `orElseMapper` otherwise.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements of `sourceMap` will be updated using `defaultMapper`.
   *
   * <pre>
   *    applyOrElse(                                       Result:
   *      [('A', 1), ('B', 2)],                             [('A', 2), ('B', 4)]
   *      (k: string, v: number) => [k, 1 + v],
   *      (k: string, v: number) => [k, 2 * v],
   *      (k: string, v: number) => 1 == v % 2
   *    )
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
   *         and collecting the results, `orElseMapper` otherwise
   *
   * @throws {IllegalArgumentError} if `defaultMapper` or `orElseMapper` is `null` or `undefined` with a not empty `sourceMap`
   */
  static applyOrElse<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                     defaultMapper: TFunction2<K1, V1, [K2, V2]>,
                                     orElseMapper: TFunction2<K1, V1, [K2, V2]>,
                                     filterPredicate: TPredicate2<K1, V1>): Map<K2, V2>;


  static applyOrElse<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                     partialFunctionOrDefaultMapper: PartialFunction<[K1, V1], [K2, V2]> | TFunction2<K1, V1, [K2, V2]>,
                                     orElseMapper: TFunction2<K1, V1, [K2, V2]>,
                                     filterPredicate?: TPredicate2<K1, V1>): Map<K2, V2> {
    const result = new Map<K2, V2>();
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
        : PartialFunction.of2ToTuple(
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
   * Returns a new {@link Map} after applying to `sourceMap`:
   * <p>
   *  - Filter its elements using {@link PartialFunction#isDefinedAt} of `partialFunction`
   *  - Transform its filtered elements using {@link PartialFunction#apply} of `partialFunction`
   *
   * <pre>
   *    collect(                                                     Result:
   *      [(1, 'Hi'), (2, 'Hello')],                                  [(1, 2)]
   *      PartialFunction.of(
   *        ([k, v]: [number, string]) => 1 == k % 2,
   *        [k, v]: [number, string]) => [k, v.length]
   *      )
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
   * @throws {IllegalArgumentError} if `partialFunction` is `null` or `undefined` with a not empty `sourceMap`
   */
  static collect<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                 partialFunction: PartialFunction<[K1, V1], [K2, V2]>): Map<K2, V2>;


  /**
   * Returns a new {@link Map} after applying to `sourceMap`:
   * <p>
   * - Filter its elements using the {@link TPredicate2} `filterPredicate`
   *  - Transform its filtered elements using the {@link TFunction2} `mapFunction`
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements will be transformed.
   *
   * <pre>
   *    collect(                                                     Result:
   *      [(1, 'Hi'), (2, 'Hello')],                                  [(1, 2)]
   *      (k: number, v: string) => [k, v.length],
   *      (k: number, v: string) => 1 == k % 2
   *    )
   * </pre>
   *
   * @param sourceMap
   *    Source {@link Map} with the elements to filter and transform
   * @param mapFunction
   *    {@link TFunction2} to transform filtered elements of `sourceMap`
   * @param filterPredicate
   *    {@link TPredicate2} to filter elements from `sourceMap`
   *
   * @return new {@link Map} from applying the given {@link TFunction2} to each element of `sourceMap`
   *         on which {@link TPredicate2} returns `true` and collecting the results
   *
   * @throws {IllegalArgumentError} if `mapFunction` is `null` or `undefined` with a not empty `sourceMap`
   */
  static collect<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                 mapFunction: TFunction2<K1, V1, [K2, V2]>,
                                 filterPredicate: TPredicate2<K1, V1>): Map<K2, V2>;


  static collect<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                 partialFunctionOrMapFunction: PartialFunction<[K1, V1], [K2, V2]> | TFunction2<K1, V1, [K2, V2]>,
                                 filterPredicate?: TPredicate2<K1, V1>): Map<K2, V2> {
    const result = new Map<K2, V2>();
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrMapFunction,
        'partialFunctionOrMapFunction must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrMapFunction)
        ? <PartialFunction<[K1, V1], [K2, V2]>>partialFunctionOrMapFunction
        : PartialFunction.of2ToTuple(
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
   *    Returns a new {@link Map} containing the elements of provided `sourceMaps`. By default, merging `sourceMaps`
   * if the key exists its value will be updated with the latest one.
   *
   * <pre>
   *    concat(                                            Result:
   *      [                                                 [(1, 'Hi'), (2, 'Dear'), (5, 'World')]
   *        [(1, 'Hi'), (2, 'Hello')],
   *        [(2, 'Dear'), (5, 'World')]
   *      ]
   *    )
   * </pre>
   *
   * @param sourceMaps
   *    {@link Map}s to concat
   *
   * @return {@link Map} with the elements of `sourceMaps`
   */
  static concat<K, V>(sourceMaps: NullableOrUndefined<Map<K, V>>[]): Map<K, V>;


  /**
   * Returns a new {@link Map} containing the elements of provided `sourceMaps`.
   *
   * <pre>
   *    concat(                                            Result:
   *      [                                                 [(1, 'Hi'), (2, 'Hello'), (5, 'World')]
   *        [(1, 'Hi'), (2, 'Hello')],
   *        [(2, 'Dear'), (5, 'World')]
   *      ],
   *      (oldV: string, newV: string) => oldV
   *    )
   * </pre>
   *
   * @param mergeValueFunction
   *    {@link BinaryOperator} used to resolve collisions between values associated with the same key. If no one is
   *    provided, by default last value will be used
   * @param sourceMaps
   *    {@link Map}s to concat
   *
   * @return {@link Map} with the elements of `sourceMaps`
   */
  static concat<K, V>(sourceMaps: NullableOrUndefined<Map<K, V>>[],
                      mergeValueFunction: TBinaryOperator<V>): Map<K, V>;


  static concat<K, V>(sourceMaps: NullableOrUndefined<Map<K, V>>[],
                      mergeValueFunction: FBinaryOperator<V>): Map<K, V>;


  static concat<K, V>(sourceMaps: NullableOrUndefined<Map<K, V>>[],
                      mergeValueFunction?: TBinaryOperator<V>): Map<K, V> {
    const result = new Map<K, V>();
    if (!ArrayUtil.isEmpty(sourceMaps)) {
      const finalMergeValueFunction: BinaryOperator<V> = ObjectUtil.isNullOrUndefined(mergeValueFunction)
        ? BinaryOperator.returnSecond()
        : BinaryOperator.of(mergeValueFunction);

      for (let i = 0; i < sourceMaps!.length; i++) {
        const currentMap = sourceMaps[i];
        if (!this.isEmpty(currentMap)) {

          for (let [key, value] of currentMap!) {
            let finalValue: V = value;

            if (result.has(key)) {
              finalValue = finalMergeValueFunction.apply(
                result.get(key)!,
                value
              );
            }
            result.set(
              key,
              finalValue
            );
          }
        }
      }
    }
    return result;
  }


  /**
   * Returns a new {@link Map} containing the elements of provided `sourceMap`.
   *
   * @param sourceMap
   *    {@link Map} with the elements to copy
   *
   * @return new {@link Map} containing all elements included in `sourceMap`
   */
  static copy = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>): Map<K, V> => {
    const result = new Map<K, V>();
    if (!this.isEmpty(sourceMap)) {
      for (let [key, value] of sourceMap!) {
        result.set(key, value);
      }
    }
    return result;
  }


  /**
   * Counts the number of elements in `sourceMap` which satisfy the `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then the size of `sourceMap` will be returned.
   *
   * <pre>
   *    count(                                             Result:
   *      [(1, 'Hi'), (2, 'Hello')],                        1
   *      (k: number, v: string) => 0 == k % 2
   *    )
   * </pre>
   *
   * @param sourceMap
   *    Source {@link Map} with the elements to filter
   * @param filterPredicate
   *   {@link TPredicate2} to filter elements from `sourceMap`
   *
   * @return the number of elements satisfying the {@link TPredicate2} `filterPredicate`
   */
  static count = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                        filterPredicate: NullableOrUndefined<TPredicate2<K, V>>): number => {
    if (this.isEmpty(sourceMap)) {
      return 0;
    }
    if (ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return sourceMap!.size;
    }
    const finalFilterPredicate = Predicate2.of(filterPredicate);
    let result = 0;
    for (let [key, value] of sourceMap!) {
      if (finalFilterPredicate.apply(key, value)) {
        result++;
      }
    }
    return result;
  }


  /**
   *    Returns a {@link Map} removing the longest prefix of elements included in `sourceMap` that satisfy the
   * {@link TPredicate2} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements of `sourceMap` will be returned.
   *
   * <pre>
   *    dropWhile(                                                   Result:
   *      [(2, 'Hi'), (4, 'Hello'), (3, 'World')],                    [(3, 'World')]
   *      (k: number, v: string) => 0 == k % 2
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to filter
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return the longest suffix of provided `sourceMap` whose elements all satisfy `filterPredicate`
   */
  static dropWhile = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                            filterPredicate: NullableOrUndefined<TPredicate2<K, V>>): Map<K, V> => {
    if (this.isEmpty(sourceMap) ||
      ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return this.copy(sourceMap);
    }
    const finalFilterPredicate = Predicate2.of(filterPredicate!);
    const result = new Map<K, V>();
    let wasFoundFirstElementDoesMatchPredicate = false;
    if (!this.isEmpty(sourceMap)) {
      for (let [key, value] of sourceMap!) {
        if (!finalFilterPredicate.apply(key, value) &&
            !wasFoundFirstElementDoesMatchPredicate) {
          wasFoundFirstElementDoesMatchPredicate = true;
        }
        if (wasFoundFirstElementDoesMatchPredicate) {
          result.set(
            key,
            value
          );
        }
      }
    }
    return result;
  }


  /**
   *    Returns a new {@link Map} using `sourceMap` as source, adding from the result the elements that verify the
   * given {@link TPredicate2} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements of `sourceMap` will be returned.
   *
   * <pre>
   *    filter(                                                                Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                              [(3, 'World')]
   *      (k: number, v: string) => 1 == k % 2 && 2 < v.length()
   *    )
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
  static filter = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         filterPredicate: NullableOrUndefined<TPredicate2<K, V>>): Map<K, V> => {
    if (this.isEmpty(sourceMap) ||
        ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return this.copy(sourceMap);
    }
    const finalFilterPredicate = Predicate2.of(filterPredicate);
    const result = new Map<K, V>();
    for (let [key, value] of sourceMap!) {
      if (finalFilterPredicate.apply(key, value)) {
        result.set(key, value);
      }
    }
    return result;
  }


  /**
   *    Returns a new {@link Map} using `sourceMap` as source, removing from the result the elements that verify the
   * given {@link TPredicate2} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements of `sourceMap` will be returned.
   *
   * <pre>
   *    filterNot(                                                             Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                              [(1, 'Hi'), (2, 'Hello')]
   *      (k: number, v: string) => 1 == k % 2 && 2 > v.length()
   *    )
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
  static filterNot = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                            filterPredicate: NullableOrUndefined<TPredicate2<K, V>>): Map<K, V> => {
    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
      ? null
      : Predicate2.of(filterPredicate).not();

    return this.filter(
      sourceMap,
      finalFilterPredicate
    );
  }


  /**
   * Returns from the given `sourceMap` the first element that verifies the provided `filterPredicate`.
   *
   * <pre>
   *    find(                                                                  Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                              (3, 'World')
   *      (k: number, v: string) => 1 == k % 2 && 2 > v.length()
   *    )
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
   *    findOptional(                                                          Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                              Optional(3, 'World')
   *      (k: number, v: string) => 1 == k % 2 && 2 > v.length()
   *    )
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
   * @apiNote
   *    If `sourceMap` or `accumulator` are `null` or `undefined` then `initialValue` is returned.
   *
   * <pre>
   *    foldLeft(                                                              Result:
   *      [(1, 'Hi'), (2, 'Hello')],                                            10
   *      0,
   *      (prev: number, k: number, v: string) => prev + k + v.length()
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with elements to combine
   * @param initialValue
   *    The initial value to start with
   * @param accumulator
   *    A {@link TFunction3} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive elements of `sourceMap`, going
   *         left to right with the start value `initialValue` on the left.
   */
  static foldLeft<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                           initialValue: R,
                           accumulator: NullableOrUndefined<TFunction3<R, K, V, R>>): R;


  static foldLeft<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                           initialValue: R,
                           accumulator: NullableOrUndefined<FFunction3<R, K, V, R>>): R;


  /**
   *    Using the given value `initialValue` as initial one, applies the provided {@link TFunction3} to all
   * elements of `sourceMap`, going left to right.
   *
   * @apiNote
   *    If `sourceMap` or `accumulator` are `null` or `undefined` then `initialValue` is returned. If `filterPredicate`
   *  is `null` or `undefined` then all elements will be used to calculate the final value.
   *
   * <pre>
   *    foldLeft(                                                              Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                              3
   *      0,
   *      (prev: number, k: number, v: string) => prev + k + v.length(),
   *      (k: number, v: string) => 1 == k % 2 && 2 < v.length()
   *    )
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
   */
  static foldLeft<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                           initialValue: R,
                           accumulator: NullableOrUndefined<TFunction3<R, K, V, R>>,
                           filterPredicate: TPredicate2<K, V>): R;


  static foldLeft<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                           initialValue: R,
                           accumulator: NullableOrUndefined<FFunction3<R, K, V, R>>,
                           filterPredicate: TPredicate2<K, V>): R;


  static foldLeft<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                           initialValue: R,
                           accumulator: NullableOrUndefined<TFunction3<R, K, V, R>>,
                           filterPredicate?: TPredicate2<K, V>): R {
    if (this.isEmpty(sourceMap) ||
        ObjectUtil.isNullOrUndefined(accumulator)) {
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
   *    getOrElse(                               Result:
   *      [(1, 'Hi'), (2, 'Hello')],              'Hi'
   *      1,
   *      'World'
   *    )
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
   *    getOrElse(                               Result:
   *      [(1, 'Hi'), (2, 'Hello')]               'World'
   *      5,
   *      () => 'World'
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to search `key`
   * @param key
   *    Key to search in `sourceMap`
   * @param defaultValue
   *    {@link TFunction0} that yields a default value in case no binding for `key` is found in `sourceMap`
   *
   * @return value associated with the given `key` if `sourceMap` contains it,
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
   * Partitions `sourceMap` into a {@link Map} of maps according to given `discriminator` {@link TFunction2}.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements will be used.
   *
   * <pre>
   *    groupBy(                                                               Result:
   *      [(1, 'Hi'), (2, 'Hello'), (7, 'World'), (11, 'Ok')],                  [(0, [(2, 'Hello')])
   *      (k: number, v: string) => k % 2,                                       (1, [(1, 'Hi'), (7, 'World')]]
   *      (k: number, v: string) => 10 > k
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to filter and group
   * @param discriminator
   *    {@link TFunction2} used to split the elements of `sourceMap`
   * @param filterPredicate
   *    {@link TPredicate2} to filter elements of `sourceMap`
   *
   * @return new {@link Map} from applying the given {@link TFunction2} to each element of `sourceMap` to generate
   *         the keys of the returned one
   *
   * @throws {IllegalArgumentError} if `discriminator` is `null` or `undefined` with a not empty `sourceMap`
   */
  static groupBy = <K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                             discriminator: TFunction2<K, V, R>,
                             filterPredicate?: TPredicate2<K, V>): Map<R, Map<K, V>> => {
    const result = new Map<R, Map<K, V>>();
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        discriminator,
        'discriminator must be not null and not undefined'
      );
      const finalDiscriminator = Function2.of(discriminator);
      const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
        ? Predicate2.alwaysTrue<K, V>()
        : Predicate2.of(filterPredicate);

      for (let [key, value] of sourceMap!) {
        if (finalFilterPredicate.apply(key, value)) {
          const discriminatorResult = finalDiscriminator.apply(
            key,
            value
          );
          MapUtil.putIfAbsent(
            result,
            discriminatorResult,
            new Map<K, V>()
          );
          result.get(discriminatorResult)!
            .set(
              key,
              value
            );
        }
      }
    }
    return result;
  }


  /**
   * Partitions `sourceMap` into a {@link Map} of maps according to given `discriminator` {@link TFunction2}.
   *
   * @apiNote
   *    This method is to {@link MapUtil#groupBy} but `discriminator` returns an array of related key values.
   *
   * <pre>
   *    groupByMultiKey(                                                       Result:
   *      [(1, 'Hi'), (2, 'Hello'), (7, 'World'), (11, 'Ok')],                  [('evenKey', [(2, 'Hello')])
   *      (k: number, v: string) => {                                            ('oddKey', [(1, 'Hi'), (7, 'World')]]
   *        const keys: string[] = [];                                           ('smaller5Key', [(1, 'Hi'), (2, 'Hello')])
   *        if (0 == k % 2) {                                                    ('greaterEqual5Key', [(7, 'World')])]
   *          keys.push('evenKey');
   *        else {
   *          keys.push('oddKey');
   *        }
   *        if (5 > k) {
   *          keys.push('smaller5Key');
   *        } else {
   *          keys.push('greaterEqual5Key');
   *        }
   *        return keys;
   *      },
   *      (k: number, v: string) => 10 > k
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to filter and group
   * @param discriminator
   *    {@link TFunction2} used to split the elements of `sourceMap`
   * @param filterPredicate
   *    {@link TPredicate2} to filter elements of `sourceMap`
   *
   * @return new {@link Map} from applying the given {@link TFunction2} to each element of `sourceMap` to generate
   *         the keys of the returned one
   *
   * @throws {IllegalArgumentError} if `discriminator` is `null` or `undefined` with a not empty `sourceMap`
   */
  static groupByMultiKey = <K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                                     discriminator: TFunction2<K, V, R[]>,
                                     filterPredicate?: TPredicate2<K, V>): Map<R, Map<K, V>> => {
    const result = new Map<R, Map<K, V>>();
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        discriminator,
        'discriminator must be not null and not undefined'
      );
      const finalDiscriminator = Function2.of(discriminator);
      const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
        ? Predicate2.alwaysTrue<K, V>()
        : Predicate2.of(filterPredicate);

      for (let [key, value] of sourceMap!) {
        if (finalFilterPredicate.apply(key, value)) {
          const discriminatorResult = ObjectUtil.getOrElse(
            finalDiscriminator.apply(
              key,
              value
            ),
            []
          );
          for (let i = 0; i < discriminatorResult.length; i++) {
            MapUtil.putIfAbsent(
              result,
              discriminatorResult[i],
              new Map<K, V>()
            );
            result.get(discriminatorResult[i])!
              .set(
                key,
                value
              );
          }
        }
      }
    }
    return result;
  }


  /**
   *   Partitions given `sourceMap` into a {@link Map}, applying {@link PartialFunction#apply} and adding values with
   * the same `key` in an array of values.
   *
   * <pre>
   *    groupMap(                                                              Result:
   *      [(1, 'Hi'), (2, 'Hello'), (7, 'World'), (8, 'Ok')],                   [(1, [2, 5])
   *      PartialFunction.of(                                                    (2, [2])]
   *        ([k, v]: [number, string]) => 1 == k % 2 || 6 < k,
   *        ([k, v]: [number, string]) => [k % 3, v.length]
   *      )
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to filter, transform and group
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceMap`
   *
   * @return new {@link Map} from applying the given {@link PartialFunction} to each element of `sourceMap`
   *         on which it is defined and collecting the results
   *
   * @throws {IllegalArgumentError} if `partialFunction` is `null` or `undefined` with a not empty `sourceMap`
   */
  static groupMap<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                  partialFunction: PartialFunction<[K1, V1], [K2, V2]>): Map<K2, V2[]>;


  /**
   *   Partitions given `sourceMap` into a {@link Map}, applying `discriminatorKey` and `valueMapper` if the current
   * element verifies `filterPredicate`. All values with the same `key` will be added in an array.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements will be used.
   *
   * <pre>
   *    groupMap(                                                              Result:
   *      [(1, 'Hi'), (2, 'Hello'), (7, 'World'), (8, 'Ok')],                   [(1, [2, 5])
   *      (k: number, v: string) => k % 3,                                       (2, [2])]
   *      (k: number, v: string) => v.length,
   *      (k: number, v: string) => 1 == k % 2 || 6 < k
   *    )
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
   * @throws {IllegalArgumentError} if `discriminatorKey` or `valueMapper` is `null` or `undefined` with a not empty `sourceMap`
   */
  static groupMap<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                  discriminatorKey: TFunction2<K1, V1, K2>,
                                  valueMapper: TFunction2<K1, V1, V2>,
                                  filterPredicate?: TPredicate2<K1, V1>): Map<K2, V2[]>;


  static groupMap<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                  partialFunctionOrDiscriminatorKey: PartialFunction<[K1, V1], [K2, V2]> | TFunction2<K1, V1, K2>,
                                  valueMapper?: TFunction2<K1, V1, V2>,
                                  filterPredicate?: TPredicate2<K1, V1>): Map<K2, V2[]> {
    const result: Map<K2, V2[]> = new Map<K2, V2[]>();
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrDiscriminatorKey,
        'partialFunctionOrDiscriminatorKey must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrDiscriminatorKey)
        ? <PartialFunction<[K1, V1], [K2, V2]>>partialFunctionOrDiscriminatorKey
        : PartialFunction.of2KeyValueMapper(
            filterPredicate,
            <TFunction2<K1, V1, K2>>partialFunctionOrDiscriminatorKey,
            <TFunction2<K1, V1, V2>>valueMapper
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
   *    Partitions given `sourceMap` into a {@link Map} of arrays as values, according to `partialFunction`.
   * If the current element verifies {@link PartialFunction#isDefinedAt}, all the values that have the same `key`
   * after applying {@link PartialFunction#apply} are then reduced into a single value with `reduceValues`.
   *
   * <pre>
   *    groupMapReduce(                                                                  Intermediate Map:             Result:
   *      [(1, 'Hi'), (2, 'Hola'), (4, ''), (5, 'World'), (6, '!'), (11, 'ABC')],         [(0,  [2])                    [(0, 2),
   *      (n1: number, n2: number) => n1 + n2,                                             (1,  [3, 1])                  (1, 4)
   *      PartialFunction.of(                                                              (2,  [5, 6])]                 (2, 11)]
   *        ([k, v]: [number, string]) => 10 > k,
   *        ([k, v]: [number, string]) => [k % 3, v.length + 1]
   *      )
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to filter, transform, group and reduce
   * @param reduceValues
   *    {@link BinaryOperator} used to reduce the values related with same key
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceMap`
   *
   * @return new {@link Map} from applying the given {@link PartialFunction} to each element of `sourceMap`
   *         on which it is defined, collecting the results and reduce them using provided `reduceValues`
   *
   * @throws {IllegalArgumentError} if `reduceValues` or `partialFunction` are `null` or `undefined` with a not
   *                                      empty `sourceMap`
   */
  static groupMapReduce<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                        reduceValues: TBinaryOperator<V2>,
                                        partialFunction: PartialFunction<[K1, V1], [K2, V2]>): Map<K2, V2>;


  static groupMapReduce<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                        reduceValues: FBinaryOperator<V2>,
                                        partialFunction: PartialFunction<[K1, V1], [K2, V2]>): Map<K2, V2>;


  /**
   *    Partitions given `sourceMap` into a {@link Map} of arrays as values, according to `discriminatorKey`. All
   * the values that have the same discriminator are then transformed by the `valueMapper` {@link TFunction2} and
   * then reduced into a single value with `reduceValues`.
   *
   * <pre>
   *    groupMapReduce(                                                                  Intermediate Map:             Result:
   *      [(1, 'Hi'), (2, 'Hola'), (4, ''), (5, 'World'), (6, '!'), (11, 'ABC')],          [(0,  [2])                 [(0, 2),
   *      (n1: number, n2: number) => n1 + n2,                                              (1,  [3, 1])               (1, 4)
   *      (n: number) => n % 3,                                                             (2,  [5, 6, 4])]           (2, 15)]
   *      (s: string) => s.length + 1
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to filter, transform, group and reduce
   * @param reduceValues
   *    {@link BinaryOperator} used to reduce the values related with same key
   * @param discriminatorKey
   *    {@link TFunction2} to get the key values of returned {@link Map}
   * @param valueMapper
   *    {@link TFunction2} to transform elements of `sourceMap`
   *
   * @return new {@link Map} from applying the given `discriminatorKey` and `valueMapper` to each element of `sourceMap`,
   *         collecting the results and reduce them using provided `reduceValues`
   *
   * @throws {IllegalArgumentError} if `reduceValues`, `discriminatorKey` or `valueMapper` are `null` or `undefined`
   *                                      with a not empty `sourceMap`
   */
  static groupMapReduce<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                        reduceValues: TBinaryOperator<V2>,
                                        discriminatorKey: TFunction2<K1, V1, K2>,
                                        valueMapper: TFunction2<K1, V1, V2>): Map<K2, V2>;


  static groupMapReduce<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                        reduceValues: FBinaryOperator<V2>,
                                        discriminatorKey: TFunction2<K1, V1, K2>,
                                        valueMapper: TFunction2<K1, V1, V2>): Map<K2, V2>;


  static groupMapReduce<K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                        reduceValues: TBinaryOperator<V2>,
                                        partialFunctionOrDiscriminatorKey: PartialFunction<[K1, V1], [K2, V2]> | TFunction2<K1, V1, K2>,
                                        valueMapper?: TFunction2<K1, V1, V2>): Map<K2, V2> {
    const result = new Map<K2, V2>();
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        reduceValues,
        'reduceValues must be not null and not undefined'
      );
      AssertUtil.notNullOrUndefined(
        partialFunctionOrDiscriminatorKey,
        'partialFunctionOrDiscriminatorKey must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrDiscriminatorKey)
        ? <PartialFunction<[K1, V1], [K2, V2]>>partialFunctionOrDiscriminatorKey
        : PartialFunction.of2KeyValueMapper(
            Predicate2.alwaysTrue<K1, V1>(),
            <TFunction2<K1, V1, K2>>partialFunctionOrDiscriminatorKey,
            <TFunction2<K1, V1, V2>>valueMapper
          );
      this.groupMap(
        sourceMap,
        finalPartialFunction
      )
      .forEach((value, key) => {
        result.set(
          key,
          // @ts-ignore
          ArrayUtil.reduce(
            value,
            reduceValues
          )
        );
      })
    }
    return result;
  }


  /**
   * Returns a new {@link Map} by applying the {@link TFunction2} `mapFunction` a function to all elements of `sourceMap`.
   *
   * <pre>
   *    map(                                               Result:
   *      [(1, 'Hi'), (2, 'Hello')],                        [(1, 2), (2, 4)]
   *      (k: number, v: string) => [k, v.length]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    Source {@link Map} with the elements to transform
   * @param mapFunction
   *    {@link TFunction2} to transform given elements of `sourceMap`
   *
   * @return new {@link Map} from applying the given {@link TFunction2} to each element of `sourceMap`
   *
   * @throws {IllegalArgumentError} if `mapFunction` is `null` or `undefined` with a not empty `sourceMap`
   */
  static map = <K1, K2, V1, V2>(sourceMap: NullableOrUndefined<Map<K1, V1>>,
                                mapFunction: TFunction2<K1, V1, [K2, V2]>): Map<K2, V2> => {
    const result = new Map<K2, V2>();
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        mapFunction,
        'mapFunction must be not null and not undefined'
      );
      const finalMapFunction = Function2.of(mapFunction);
      for (let [key, value] of sourceMap!) {
        const elementResult = finalMapFunction.apply(key, value);
        result.set(
          elementResult[0],
          elementResult[1]
        );
      }
    }
    return result;
  }


  /**
   * Finds the first element of provided {@link Map} which yields the largest element measured by given `comparator`.
   *
   * <pre>
   *    max(                                                                   Result:
   *      [(1, 'a'), (4, 'd'), (11, 'k'), (3, 'c')],                            [11, 'k']
   *      (a: [number, string], b: [number, string]) => a[0] - b[0]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} used to find the largest element
   * @param comparator
   *    {@link TComparator} to be used for comparing elements
   *
   * @return largest element using given {@link TComparator}, `undefined` if `sourceMap` has no elements
   *
   * @throws {IllegalArgumentError} if `comparator` is `null` or `undefined` with a not empty `sourceMap`
   */
  static max = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                      comparator: TComparator<[K, V]>): OrUndefined<[K, V]> => {
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        comparator,
        'comparator must be not null and not undefined'
      );
      const finalComparator = Comparator.of<[K, V]>(comparator);
      return this.reduce(
        sourceMap,
        BinaryOperator.of<[K, V]>(
          (prev: [K, V],
           current: [K, V]) => {
            const comparatorResult = finalComparator.compare(
              prev, current
            );
            return 0 == comparatorResult
              ? prev
              : 0 < comparatorResult
                ? prev
                : current;
          }
        )
      );
    }
    return undefined;
  }


  /**
   * Finds the first element of provided {@link Map} which yields the largest element measured by given `comparator`.
   *
   * <pre>
   *    maxOptional(                                                           Result:
   *      [(1, 'a'), (4, 'd'), (11, 'k'), (3, 'c')],                            Optional([11, 'k'])
   *      (a: [number, string], b: [number, string]) => a[0] - b[0]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} used to find the largest element
   * @param comparator
   *    {@link TComparator} to be used for comparing elements
   *
   * @return {@link Optional} with largest element using given {@link TComparator},
   *         {@link Optional#empty} if `sourceMap` has no elements
   *
   * @throws {IllegalArgumentError} if `comparator` is `null` or `undefined` with a not empty `sourceMap`
   */
  static maxOptional = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                              comparator: TComparator<[K, V]>): Optional<[K, V]> =>
    Optional.ofNullable(
      this.max(
        sourceMap,
        comparator
      )
    );


  /**
   * Finds the first element of provided {@link Map} which yields the smallest element measured by given `comparator`.
   *
   * <pre>
   *    min(                                                                   Result:
   *      [(1, 'a'), (4, 'd'), (11, 'k'), (3, 'c')],                            [1, 'a']
   *      (a: [number, string], b: [number, string]) => a[0] - b[0]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} used to find the smallest element
   * @param comparator
   *    {@link TComparator} to be used for comparing elements
   *
   * @return smallest element using given {@link TComparator}, `undefined` if `sourceMap` has no elements
   *
   * @throws {IllegalArgumentError} if `comparator` is `null` or `undefined` with a not empty `sourceMap`
   */
  static min = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                      comparator: TComparator<[K, V]>): OrUndefined<[K, V]> => {
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        comparator,
        'comparator must be not null and not undefined'
      );
      const finalComparator = Comparator.of<[K, V]>(comparator);
      return this.reduce(
        sourceMap,
        BinaryOperator.of<[K, V]>(
          (prev: [K, V],
           current: [K, V]) => {
            const comparatorResult = finalComparator.compare(
              prev, current
            );
            return 0 == comparatorResult
              ? prev
              : 0 < comparatorResult
                ? current
                : prev;
          }
        )
      );
    }
    return undefined;
  }


  /**
   * Finds the first element of provided {@link Map} which yields the smallest element measured by given `comparator`.
   *
   * <pre>
   *    minOptional(                                                           Result:
   *      [(1, 'a'), (4, 'd'), (11, 'k'), (3, 'c')],                            Optional([1, 'a'])
   *      (a: [number, string], b: [number, string]) => a[0] - b[0]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} used to find the smallest element
   * @param comparator
   *    {@link TComparator} to be used for comparing elements
   *
   * @return {@link Optional} with smallest element using given {@link TComparator},
   *         {@link Optional#empty} if `sourceMap` has no elements
   *
   * @throws {IllegalArgumentError} if `comparator` is `null` or `undefined` with a not empty `sourceMap`
   */
  static minOptional = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                              comparator: TComparator<[K, V]>): Optional<[K, V]> =>
    Optional.ofNullable(
      this.min(
        sourceMap,
        comparator
      )
    );


  /**
   * Returns a new {@link Map} based on provided `key`/`value` tuples.
   *
   * @param keyValues
   *    Array of `key`/`value` to include in the returned {@link Map}
   *
   * @return {@link Map} with provided `key`/`value` tuples
   */
  static of = <K, V>(keyValues?: Nullable<[K, V][]>): Map<K, V> => {
    const result = new Map<K, V>();
    if (!ArrayUtil.isEmpty(keyValues)) {
      for (let i = 0; i < keyValues!.length; i++) {
        result.set(
          keyValues![i][0],
          keyValues![i][1]
        )
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
   * @throws {IllegalArgumentError} if `sourceMap` is `null` or `undefined`
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
   *   Performs a reduction on the elements of `sourceMap`, using an associative accumulation {@link TBinaryOperator},
   * and returns a value describing the reduced elements, if any. Returns `undefined` otherwise.
   *
   * @apiNote
   *    This method is similar to {@link MapUtil#foldLeft} but `accumulator` works with the same type that `sourceMap`
   * and only uses contained elements of provided {@link Map}.
   *
   * <pre>
   *    reduce(                                                                Result:
   *      [(1, 'Hi'), (2, 'Hello')],                                            [3, 'Hi Hello']
   *      (prev: [number, string], current: [number, string]) =>
   *        [prev[0] + current[0], prev[1] + ' ' + current[1]]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with elements to combine
   * @param accumulator
   *    A {@link TBinaryOperator} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive elements `sourceMap`, going left to right
   *
   * @throws {IllegalArgumentError} if `accumulator` is `null` or `undefined` and `sourceMap` is not empty
   */
  static reduce<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                      accumulator: TBinaryOperator<[K, V]>): OrUndefined<[K, V]>;


  static reduce<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                      accumulator: FBinaryOperator<[K, V]>): OrUndefined<[K, V]>;


  static reduce<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                      accumulator: TBinaryOperator<[K, V]>): OrUndefined<[K, V]> {
    let result: OrUndefined<[K, V]>;
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        accumulator,
        'accumulator must be not null and not undefined'
      );
      const finalAccumulator = BinaryOperator.of(accumulator);
      let foundFirstElement = false;
      for (let [key, value] of sourceMap!) {
        if (!foundFirstElement) {
          result = [key, value];
        } else {
          result = finalAccumulator.apply(
            // @ts-ignore
            result,
            [key, value]
          );
        }
        foundFirstElement = true;
      }
    }
    return result;
  }


  /**
   * Removes from `sourceMap` all of its elements that are contained in the given {@link Map} `toRemoveMap`.
   *
   * @apiNote
   *    {@link ObjectUtil#equals} comparing both key and value will be used to know if the current element should be
   * removed or not.
   *
   * <pre>
   *    removeAll(                                                   Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                    [(2, 'Hello')]
   *      [(1, 'Hi'), (3, 'World'), (4, 'Hola')]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to retain and/or remove
   * @param toRemoveMap
   *    {@link Map} with elements to delete
   *
   * @return {@link Map} with the elements of `sourceMap` not contained in `toRemoveMap`
   */
  static removeAll<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         toRemoveMap: NullableOrUndefined<Map<K, V>>): Map<K, V>;


  /**
   *    Removes from `sourceMap` all of its elements that are contained in the given {@link Map} `toRemoveMap`, based on
   * provided {@link TPredicate2} `areEqualsComparison` to know when two elements are equals.
   *
   * <pre>
   *    removeAll(                                                             Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                              [(2, 'Hello')]
   *      [(1, 'Hi'), (3, 'World'), (4, 'Hola')],
   *      (a: [number, string], b: [number, string]) => a[0] == b[0]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to retain and/or remove
   * @param toRemoveMap
   *    {@link Map} with elements to delete
   * @param areEqualsComparison
   *    {@link TPredicate2} used to know if two elements are equals or not
   *
   * @return {@link Map} with the elements of `sourceMap` not contained in `toRemoveMap`
   */
  static removeAll<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         toRemoveMap: NullableOrUndefined<Map<K, V>>,
                         areEqualsComparison: TPredicate2<[K, V], [K, V]>): Map<K, V>;


  static removeAll<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         toRemoveMap: NullableOrUndefined<Map<K, V>>,
                         areEqualsComparison?: TPredicate2<[K, V], [K, V]>): Map<K, V> {
    if (this.isEmpty(sourceMap)) {
      return new Map<K, V>();
    }
    if (this.isEmpty(toRemoveMap)) {
      return sourceMap!;
    }
    const finalAreEqualsComparison = this.getFinalAreEqualsComparison(areEqualsComparison);
    const result = new Map<K, V>();
    for (let [keySourceItem, valueSourceItem] of sourceMap!) {

      let wasFound = false;
      for (let [keyToRemoveItem, valueToRemoveItem] of toRemoveMap!) {
        if (finalAreEqualsComparison.apply([keySourceItem, valueSourceItem], [keyToRemoveItem, valueToRemoveItem])) {
          wasFound = true;
          break;
        }
      }
      if (!wasFound) {
        result.set(
          keySourceItem,
          valueSourceItem
        );
      }
    }
    return result;
  }


  /**
   *    Retains only the elements of `sourceMap` that are contained in the given {@link Map} `toKeepMap`. In other words,
   * removes from `sourceMap` all of its elements that are not contained in `toKeepMap`.
   *
   * @apiNote
   *    {@link ObjectUtil#equals} comparing both key and value will be used to know if the current element should be
   * retained or not.
   *
   * <pre>
   *    retainAll(                                                   Result:
   *      [[(1, 'Hi'), (2, 'Hello'), (3, 'World')]                    [(1, 'Hi'), (3, 'World')]
   *      [(1, 'Hi'), (3, 'World'), (4, 'Hola')]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to retain and/or remove
   * @param toKeepMap
   *    {@link Map} with elements to keep
   *
   * @return {@link Map} with the elements of `sourceMap` contained in `toKeepMap`
   */
  static retainAll<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         toKeepMap: NullableOrUndefined<Map<K, V>>): Map<K, V>;


  /**
   *    Retains only the elements of `sourceMap` that are contained in the given {@link Map} `toKeepMap`, based on
   * provided {@link TPredicate2} `areEqualsComparison` to know when two elements are equals.
   *
   * <pre>
   *    retainAll(                                                             Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')]                               [(1, 'Hi'), (3, 'World')]
   *      [(1, 'Hi'), (3, 'World'), (4, 'Hola')],
   *      (a: [number, string], b: [number, string]) => a[0] == b[0]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to retain and/or remove
   * @param toKeepMap
   *    {@link Map} with elements to keep
   * @param areEqualsComparison
   *    {@link TPredicate2} used to know if two elements are equals or not
   *
   * @return {@link Map} with the elements of `sourceMap` contained in `toKeepMap`
   */
  static retainAll<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         toKeepMap: NullableOrUndefined<Map<K, V>>,
                         areEqualsComparison: TPredicate2<[K, V], [K, V]>): Map<K, V>;


  static retainAll<K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                         toKeepMap: NullableOrUndefined<Map<K, V>>,
                         areEqualsComparison?: TPredicate2<[K, V], [K, V]>): Map<K, V> {
    if (this.isEmpty(sourceMap) ||
        this.isEmpty(toKeepMap)) {
      return new Map<K, V>();
    }
    const finalAreEqualsComparison = this.getFinalAreEqualsComparison(areEqualsComparison);
    const result = new Map<K, V>();
    for (let [keySourceItem, valueSourceItem] of sourceMap!) {

      let wasFound = false;
      for (let [keyToKeepItem, valueToKeepItem] of toKeepMap!) {
        if (finalAreEqualsComparison.apply([keySourceItem, valueSourceItem], [keyToKeepItem, valueToKeepItem])) {
          wasFound = true;
          break;
        }
      }
      if (wasFound) {
        result.set(
          keySourceItem,
          valueSourceItem
        );
      }
    }
    return result;
  }


  /**
   * Sorts the given `sourceMap` using `comparator` if provided or default ordination otherwise.
   *
   * @apiNote
   *    The default sort order is ascending, built upon converting the elements into strings, then comparing their
   * sequences of UTF-16 code units values.
   *
   * <pre>
   *    sort(                                                                  Result:
   *      [(1, 'a'), (4, 'd'), (11, 'k'), (3, 'c')]                             [(1, 'a'), (11, 'k'), (3, 'c'), (4, 'd')]
   *    )
   *    sort(                                                                   Result:
   *      [(1, 'a'), (4, 'd'), (11, 'k'), (3, 'c')],                            [(1, 'a'), (3, 'c'), (4, 'd'), (11, 'k')]
   *      (a: [number, string], b: [number, string]) => a[0] - b[0]
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to sort
   * @param comparator
   *    {@link TComparator} used to determine the order of the elements
   *
   * @return new sorted {@link Map}
   */
  static sort = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                       comparator?: Nullable<TComparator<[K, V]>>): Map<K, V> => {
    if (this.isEmpty(sourceMap)) {
      return new Map<K, V>();
    }
    const clonedSourceMapAsArray = [...sourceMap!.entries()];
    return comparator
      ? new Map(
          clonedSourceMapAsArray!
            .sort(
              Comparator.of<[K, V]>(comparator!)
                .getComparator()
            )
        )
      : new Map(
          clonedSourceMapAsArray!.sort()
        );
  }


  /**
   *    Returns a {@link Map} with the longest prefix of elements included in `sourceMap` that satisfy the
   * {@link TPredicate2} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements of `sourceMap` will be returned.
   *
   * <pre>
   *    takeWhile(                                                   Result:
   *      [(2, 'Hi'), (4, 'Hello'), (3, 'World')],                    [(2, 'Hi'), (4, 'Hello')]
   *      (k: number, v: string) => 0 == k % 2
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to filter
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return the longest prefix of provided `sourceMap` whose elements all satisfy `filterPredicate`
   */
  static takeWhile = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                            filterPredicate: NullableOrUndefined<TPredicate2<K, V>>): Map<K, V> => {
    if (this.isEmpty(sourceMap) ||
        ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return this.copy(sourceMap);
    }
    const finalFilterPredicate = Predicate2.of(filterPredicate!);
    const result = new Map<K, V>();
    if (!this.isEmpty(sourceMap)) {
      for (let [key, value] of sourceMap!) {
        if (finalFilterPredicate.apply(key, value)) {
          result.set(
            key,
            value
          );
        } else {
          return result;
        }
      }
    }
    return result;
  }


  /**
   * Converts the given {@link Map} `sourceMap` in to an array using provided `keyValueMapper`.
   *
   * <pre>
   *    toArray(                                                     Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                    ['1-Hi', '2-Hello', '3-World']
   *      (k: number, v: string) => k + '-' + v
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to transform and include in the returned array
   * @param keyValueMapper
   *    {@link TFunction2} to transform elements of `sourceMap` into elements of the returned array
   *
   * @return array applying `keyValueMapper` to each element of `sourceMap`
   *
   * @throws {IllegalArgumentError} if `keyValueMapper` is `null` or `undefined` with a not empty `sourceMap`
   */
  static toArray<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                          keyValueMapper: TFunction2<K, V, R>): R[];


  /**
   *    Converts the given {@link Map} `sourceMap` in to an array using provided `keyValueMapper`, only with
   * the elements that satisfy the {@link TPredicate2} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then no one element will be filtered to insert in the returned array.
   *
   * <pre>
   *    toArray(                                                               Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                              ['3-World']
   *      (k: number, v: string) => k + '-' + v,
   *      (k: number, v: string) => 1 == k % 2 && 2 < v.length()
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to transform and include in the returned array
   * @param keyValueMapper
   *    {@link TFunction2} to transform elements of `sourceMap` into elements of the returned array
   * @param filterPredicate
   *    {@link TPredicate2} used to filter values from `sourceMap` that will be added in the returned array
   *
   * @return array applying the given `keyValueMapper` to each element of `sourceMap` that verifies `filterPredicate`
   *
   * @throws {IllegalArgumentError} if `keyValueMapper` is `null` or `undefined` with a not empty `sourceMap`
   */
  static toArray<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                          keyValueMapper: TFunction2<K, V, R>,
                          filterPredicate?: TPredicate2<K, V>): R[];


  /**
   * Converts the given {@link Map} `sourceMap` in to an array using provided {@link PartialFunction} `partialFunction`.
   *
   * <pre>
   *    toArray(                                                               Result:
   *      [(1, 'Hi'), (2, 'Hello'), (3, 'World')],                              ['3-World']
   *      PartialFunction.of(
   *        (k: number, v: string) => 1 == k % 2 && 2 < v.length(),
   *        (k: number, v: string) => k + '-' + v
   *      )
   *    )
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} with the elements to transform and include in the returned array
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform elements of `sourceMap`
   *
   * @return array applying `partialFunction` to each element of `sourceMap`
   *
   * @throws {IllegalArgumentError} if `partialFunction` is `null` or `undefined` with a not empty `sourceMap`
   */
  static toArray<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                          partialFunction: PartialFunction<[K, V], R>): R[];


  static toArray<K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                          partialFunctionOrKeyValueMapper: PartialFunction<[K, V], R> | TFunction2<K, V, R>,
                          filterPredicate?: TPredicate2<K, V>): R[] {
    const result: R[] = [];
    if (!this.isEmpty(sourceMap)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrKeyValueMapper,
        'partialFunctionOrKeyValueMapper must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrKeyValueMapper)
        ? <PartialFunction<[K, V], R>>partialFunctionOrKeyValueMapper
        : PartialFunction.of2(
            filterPredicate,
            <TFunction2<K, V, R>>partialFunctionOrKeyValueMapper
          );
      for (let [key, value] of sourceMap!) {
        if (finalPartialFunction.isDefinedAt([key, value])) {
          result.push(
            finalPartialFunction.apply(
              [key, value]
            )
          );
        }
      }
    }
    return result;
  }


  /**
   * Returns the final version of provided {@link TPredicate2} to know if two tuples of types `[K, V]` are equals.
   *
   * @param areEqualsComparison
   *   {@link TPredicate2} used to know if two elements are equals or not
   *
   * @return provided `areEqualsComparison` if not `null` or `undefined`,
   *         new {@link Predicate2} using {@link ObjectUtil#equals} to compare both elements contained in the tuple
   */
  private static getFinalAreEqualsComparison = <K, V>(areEqualsComparison?: TPredicate2<[K, V], [K, V]>): Predicate2<[K, V], [K, V]> =>
    ObjectUtil.isNullOrUndefined(areEqualsComparison)
      ? Predicate2.of<[K, V], [K, V]>(
          (e1: [K, V], e2: [K, V]) =>
            ObjectUtil.equals(e1[0], e2[0]) &&
              ObjectUtil.equals(e1[1], e2[1])
        )
      : Predicate2.of<[K, V], [K, V]>(areEqualsComparison);

}
