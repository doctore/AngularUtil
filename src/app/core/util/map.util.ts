import { Function3, PartialFunction, TFunction2, TFunction3 } from '@app-core/types/function';
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
   *      ([k, v]: [number, string]) => 1 == k % 2
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
   *   Parameters:                                        Result:
   *    [(1, 'Hi'), (2, 'Hello')]                          [(1, 2)]
   *    ([k, v]: [number, string]) => [k, v.length]
   *    ([k, v]: [number, string]) => 1 == k % 2
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
            filterPredicate!,
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
   *    [(1, 'Hi'), (2, 'Hello'), (3, 'World')]                      [(1, "Hi"), (2, 'Hello')]
   *    (k: number, v: string) => 1 == k.id && 2 > v.length()
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
   *    (k: number, v: string) => 1 == k.id && 2 > v.length()
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
   *    (k: number, v: string) => 1 == k.id && 2 > v.length()
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
   *   Parameters:                                                        Result:
   *    [(1, 'Hi'), (2, 'Hello')]                                          10
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
  static foldLeft = <K, V, R>(sourceMap: NullableOrUndefined<Map<K, V>>,
                              initialValue: R,
                              accumulator: TFunction3<R, K, V, R>): R => {
    if (this.isEmpty(sourceMap)) {
      return initialValue
    }
    const finalAccumulator = Function3.of(accumulator);
    let result: R = initialValue;
    for (let [key, value] of sourceMap!) {
      result = finalAccumulator.apply(
        result,
        key,
        value
      );
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
   *    (k: number, v: string) => 1 == k.id && 2 > v.length()
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
