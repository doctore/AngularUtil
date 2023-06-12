import { Function3, TFunction3 } from '@app-core/types/function';
import { Predicate2, TPredicate2} from '@app-core/types/predicate';
import { Nullable, NullableOrUndefined, OrUndefined, Tuple2 } from '@app-core/types';
import { ObjectUtil } from '@app-core/util';

/**
 * Helper functions to manage Maps.
 */
export class MapUtil {

  constructor() {
    throw new SyntaxError('MapUtil is an utility class');
  }


  /**
   *    Returns a new {@link Map} using {@code sourceMap} as source, removing from the result the elements that verify the
   * given {@link TPredicate2} {@code filterPredicate}.
   *
   * @apiNote
   *    If {@code filterPredicate} is {@code null} or {@code undefined} then {@link Predicate2#alwaysFalse} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                  Result:
   *    [(1, "Hi"), (2, "Hello"), (3, "World")]                      [(1, "Hi"), (2, "Hello")]
   *    (k: number, v: string) => 1 == k.id && 2 > v.length()
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to filter
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return empty {@link Map} if {@code sourceMap} has no elements,
   *         otherwise a new {@link Map} with the elements of {@code sourceMap} which do not verify {@code filterPredicate}
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
   * Returns from the given {@code sourceMap} the first element that verifies the provided {@code filterPredicate}.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                  Result:
   *    [(1, "Hi"), (2, "Hello"), (3, "World")]                      (3, "World")
   *    (k: number, v: string) => 1 == k.id && 2 > v.length()
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to search
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return {@code undefined} if {@code sourceMap} has no elements, {@code filterPredicate} is {@code null} or {@code undefined}
   *         or no one verifies provided {@code filterPredicate}.
   *         Otherwise, {@link Tuple2} with the first element that verifies {@code filterPredicate}.
   */
  static find = <K, V>(sourceMap: NullableOrUndefined<Map<K, V>>,
                       filterPredicate: TPredicate2<K, V>): OrUndefined<Tuple2<K, V>> => {
    if (!this.isEmpty(sourceMap) &&
        ObjectUtil.nonNullOrUndefined(filterPredicate)) {
      const finalFilterPredicate = Predicate2.of(filterPredicate);
      for (let [key, value] of sourceMap!) {
        if (finalFilterPredicate.apply(key, value)) {
          return Tuple2.of(key, value);
        }
      }
    }
    return undefined;
  }


  /**
   *    Using the given value {@code initialValue} as initial one, applies the provided {@link TFunction3} to all
   * elements of {@code sourceMap}, going left to right.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                        Result:
   *    [(1, "Hi"), (2, "Hello")]                                          10
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
   * @return result of inserting {@code accumulator} between consecutive elements {@code sourceMap}, going
   *         left to right with the start value {@code initialValue} on the left.
   *
   * @throws {@link IllegalArgumentError} if {@code accumulator} is {@code null} or {@code undefined} and {@code sourceMap} is not empty
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
   * Verifies if the given {@code mapToVerify} contains at least one element.
   *
   * @param mapToVerify
   *    {@link Map} to verify
   *
   * @return {@code true} if {@code mapToVerify} is {@code undefined}, {@code null} or empty.
   *         {@code false} otherwise.
   */
  static isEmpty = (mapToVerify?: Nullable<Map<any, any>>): boolean =>
    ObjectUtil.isNullOrUndefined(mapToVerify) ||
      0 == mapToVerify!.size;


  /**
   *    Returns a new {@link Map} using {@code sourceMap} as source, adding from the result the elements that verify the
   * given {@link TPredicate2} {@code filterPredicate}.
   *
   * @apiNote
   *    If {@code filterPredicate} is {@code null} or {@code undefined} then {@link Predicate2#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   Parameters:                                                  Result:
   *    [(1, "Hi"), (2, "Hello"), (3, "World")]                      [(3, "World")]
   *    (k: number, v: string) => 1 == k.id && 2 > v.length()
   * </pre>
   *
   * @param sourceMap
   *    {@link Map} to filter
   * @param filterPredicate
   *    {@link TPredicate2} used to find given elements to filter
   *
   * @return empty {@link Map} if {@code sourceMap} has no elements or no one verifies provided {@code filterPredicate},
   *         otherwise a new {@link Map} with the elements of {@code sourceMap} which verify {@code filterPredicate}
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
