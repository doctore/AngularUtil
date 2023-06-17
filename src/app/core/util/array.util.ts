import { Function2, PartialFunction, TFunction1, TFunction2 } from '@app-core/types/function';
import { Predicate1, TPredicate1 } from '@app-core/types/predicate';
import { Nullable, NullableOrUndefined, Optional, OrUndefined } from '@app-core/types';
import { AssertUtil, ObjectUtil } from '@app-core/util';
import * as _ from 'lodash';

/**
 * Helper functions to manage arrays.
 */
export class ArrayUtil {

  constructor() {
    throw new SyntaxError('ArrayUtil is an utility class');
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
   *      (n: number) => 0 == n % 2
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
    let result: U[] = [];
    if (!this.isEmpty(sourceArray)) {
      AssertUtil.notNullOrUndefined(
        partialFunctionOrMapFunction,
        'partialFunctionOrMapFunction must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrMapFunction)
        ? <PartialFunction<T, U>>partialFunctionOrMapFunction
        : PartialFunction.of(
            filterPredicate!,
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
   *    Returns a new array using `sourceArray` as source, removing from the result the elements that verify the
   * given {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate1#alwaysFalse} will be applied.
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
  static dropWhile = <T>(sourceArray: NullableOrUndefined<T[]>,
                         filterPredicate: TPredicate1<T>): T[] => {

    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
      ? Predicate1.alwaysFalse<T>()
      : Predicate1.of(filterPredicate);

    return this.takeWhile(
      sourceArray,
      finalFilterPredicate.not()
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
   *    Returns an {@link Optional} containing the first element of the given `sourceArray` hat verifies the provided
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
  static foldLeft = <T, R>(sourceArray: NullableOrUndefined<T[]>,
                           initialValue: R,
                           accumulator: TFunction2<R, T, R>): R => {
    if (this.isEmpty(sourceArray)) {
      return initialValue
    }
    const finalAccumulator = Function2.of(accumulator);
    let result: R = initialValue;
    for (let i = 0; i < sourceArray!.length; i++) {
      result = finalAccumulator.apply(
        result,
        sourceArray![i]
      );
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
   *    Returns a new array using `sourceArray` as source, adding from the result the elements that verify the
   * given {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then {@link Predicate1#alwaysTrue} will be applied.
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
  static takeWhile = <T>(sourceArray: NullableOrUndefined<T[]>,
                         filterPredicate: TPredicate1<T>): T[] => {
    if (this.isEmpty(sourceArray)) {
      return [];
    }
    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
      ? Predicate1.alwaysTrue<T>()
      : Predicate1.of(filterPredicate);

    return sourceArray!.filter(
      (obj: T) => finalFilterPredicate.apply(obj)
    );
  }

}
