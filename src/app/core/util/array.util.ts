import { Nullable, NullableOrUndefined, Optional, OrUndefined } from '@app-core/types';
import { Function2, TFunction2 } from '@app-core/types/function';
import { Predicate1, TPredicate1 } from '@app-core/types/predicate';
import * as _ from 'lodash';
import {ObjectUtil} from "./object.util";

/**
 * Helper functions to manage arrays.
 */
export class ArrayUtil {

  constructor() {
    throw new SyntaxError('ArrayUtil is an utility class');
  }


  /**
   *    Returns a new array using {@code sourceArray} as source, removing from the result the elements that verify the
   * given {@link TPredicate1} {@code filterPredicate}.
   *
   * @apiNote
   *    If {@code filterPredicate} is {@code null} or {@code undefined} then {@link Predicate1#alwaysFalse} will be applied.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, name: 'user1' } as User;
   *   const u2 = { id: 2, name: 'user2' } as User;
   *   const u3 = { id: 3, name: 'user3' } as User;
   *
   *   // Will return [u2]
   *   ArrayUtil.takeWhile(
   *      [u1, u2, u3],
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *   );
   * </pre>
   *
   * @param sourceArray
   *    Array to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return empty array if {@code sourceArray} has no elements,
   *         otherwise a new array with the elements of {@code sourceArray} which do not verify {@code filterPredicate}
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
   * Returns from the given {@code sourceArray} the first element that verifies the provided {@code filterPredicate}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, name: 'user1' } as User;
   *   const u2 = { id: 2, name: 'user2' } as User;
   *   const u3 = { id: 3, name: 'user3' } as User;
   *
   *   // Will return u1
   *   ArrayUtil.find(
   *      [u1, u2, u3],
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *   );
   * </pre>
   *
   * @param sourceArray
   *    Array to search
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return {@code undefined} if {@code sourceArray} has no elements, {@code filterPredicate} is {@code null} or {@code undefined}
   *         or no one verifies provided {@code filterPredicate}.
   *         Otherwise, the first element that verifies {@code filterPredicate}.
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
   * Returns from the given {@code sourceArray} the first element that verifies the provided {@code filterPredicate}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, name: 'user1' } as User;
   *   const u2 = { id: 3, name: 'user2' } as User;
   *
   *   // Will return Optional(u1)
   *   ArrayUtil.findOptional(
   *      [u1, u2],
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *   );
   * </pre>
   *
   * @param sourceArray
   *    Array to search
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return {@link Optional} containing the first element that satisfies {@code filterPredicate},
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
   *    Using the given value {@code initialValue} as initial one, applies the provided {@link TFunction2} to all
   * elements of {@code sourceArray}, going left to right.
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
   * @return result of inserting {@code accumulator} between consecutive elements {@code sourceArray}, going
   *         left to right with the start value {@code initialValue} on the left.
   *
   * @throws {@link IllegalArgumentError} if {@code accumulator} is {@code null} or {@code undefined} and {@code sourceArray} is not empty
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
   * Verifies if the given {@code arrayToVerify} contains at least one element.
   *
   * @param arrayToVerify
   *    Array to verify
   *
   * @return {@code true} if {@code arrayToVerify} is {@code undefined}, {@code null} or empty.
   *         {@code false} otherwise.
   */
  static isEmpty = (arrayToVerify?: Nullable<any[]>): boolean =>
    _.isEmpty(arrayToVerify);


  /**
   *    Returns a new array using {@code sourceArray} as source, adding from the result the elements that verify the
   * given {@link TPredicate1} {@code filterPredicate}.
   *
   * @apiNote
   *    If {@code filterPredicate} is {@code null} or {@code undefined} then {@link Predicate1#alwaysTrue} will be applied.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, name: 'user1' } as User;
   *   const u2 = { id: 2, name: 'user2' } as User;
   *   const u3 = { id: 3, name: 'user3' } as User;
   *
   *   // Will return [u1, u3]
   *   ArrayUtil.takeWhile(
   *      [u1, u2, u3],
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *   );
   * </pre>
   *
   * @param sourceArray
   *    Array to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return empty array if {@code sourceArray} has no elements or no one verifies provided {@code filterPredicate},
   *         otherwise a new array with the elements of {@code sourceArray} which verify {@code filterPredicate}
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
