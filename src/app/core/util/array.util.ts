import {
  Function2,
  Nullable,
  NullableOrUndefined,
  Optional,
  OrUndefined,
  Predicate1,
  TFunction2,
  TPredicate1
} from '@app-core/types';
import * as _ from 'lodash';

/**
 * Helper functions to manage arrays.
 */
export class ArrayUtil {

  constructor() {
    throw new SyntaxError('ArrayUtil is an utility class');
  }


  /**
   *    Returns a new array using {@code objectArray} as source, removing from the result the elements that verify the
   * given {@link TPredicate1} {@code filterPredicate}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, description: 'user1' } as User;
   *   const u2 = { id: 2, description: 'user2' } as User;
   *   const u3 = { id: 3, description: 'user3' } as User;
   *
   *   // Will return [u2]
   *   ArrayUtil.takeWhile(
   *      [u1, u2, u3],
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *   );
   * </pre>
   *
   * @param objectArray
   *    Array to filter provided property values
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return empty array if {@code objectArray} has no elements,
   *         a new array with the elements of {@code objectArray} which do not verify {@code filterPredicate} otherwise
   */
  static dropWhile = <T>(objectArray: NullableOrUndefined<T[]>,
                         filterPredicate: TPredicate1<T>): T[] =>
    this.takeWhile(
      objectArray,
      Predicate1.of(filterPredicate).not()
    );


  /**
   *    Returns a new array using {@code objectArray} as source, removing from the result the elements which property
   * {@code key} contains any of values included in {@code keyValuesToRemoveIfFound}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, description: 'user1' } as User;
   *   const u2 = { id: 2, description: 'user2' } as User;
   *   const u3 = { id: 3, description: 'user3' } as User;
   *
   *   // Will return [u1]
   *   ArrayUtil.dropWhileByKey(
   *      [u1, u2],
   *      'id',
   *      [2, 3]
   *   );
   * </pre>
   *
   * @param objectArray
   *    Array to filter provided property values
   * @param key
   *    Property used to find given values to filter
   * @param keyValuesToRemoveIfFound
   *    Key values used to know which object instances will be removed in the result
   *
   * @return empty array if {@code objectArray} has no elements,
   *         {@code objectArray} if {@code keyValuesToRemoveIfFound} has no elements,
   *         a new array with the elements of {@code objectArray} which property {@code key} contains any of values
   *         included in {@code valuesOfKeyToKeepIfFound} otherwise
   */
  static dropWhileByKey = <T, K extends keyof T>(objectArray: NullableOrUndefined<T[]>,
                                                 key: K,
                                                 keyValuesToRemoveIfFound: NullableOrUndefined<T[K][]>): T[] => {
    if (this.isEmpty(objectArray)) {
      return [];
    }
    if (this.isEmpty(keyValuesToRemoveIfFound)) {
      return objectArray!;
    }
    return objectArray!.filter(
      (obj: T) => -1 === keyValuesToRemoveIfFound!.indexOf(obj[key])
    );
  }


  /**
   * Returns from the given {@code objectArray} the first element that verifies the provided {@code filterPredicate}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, description: 'user1' } as User;
   *   const u2 = { id: 2, description: 'user2' } as User;
   *   const u3 = { id: 3, description: 'user3' } as User;
   *
   *   // Will return u1
   *   ArrayUtil.findFirst(
   *      [u1, u2, u3],
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *   );
   * </pre>
   *
   * @param objectArray
   *    Array to search provided property value
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return {@code undefined} if {@code objectArray} has no elements or no one verifies provided {@code filterPredicate},
   *         first element that verifies {@code filterPredicate} otherwise.
   */
  static find = <T>(objectArray: NullableOrUndefined<T[]>,
                    filterPredicate: TPredicate1<T>): OrUndefined<T> => {
    if (this.isEmpty(objectArray)) {
      return undefined;
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate);
    return objectArray!.find(
      (obj: T) => finalFilterPredicate.apply(obj)
    );
  }


  /**
   * Returns from the given {@code objectArray} the first element that verifies the provided {@code filterPredicate}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, description: 'user1' } as User;
   *   const u2 = { id: 3, description: 'user2' } as User;
   *
   *   // Will return Optional(u1)
   *   ArrayUtil.findFirst(
   *      [u1, u2],
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *   );
   * </pre>
   *
   * @param objectArray
   *    Array to search provided property value
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return {@link Optional} containing the first element that satisfies {@code filterPredicate},
   *         {@link Optional#empty} otherwise.
   */
  static findOptional = <T>(objectArray: NullableOrUndefined<T[]>,
                            filterPredicate: TPredicate1<T>): Optional<T> =>
    Optional.ofNullable(
      this.find(
        objectArray,
        filterPredicate
      )
    );


  /**
   *    Returns from the given {@code objectArray} the first element which {@code key} value matches with the provided
   * {@code keyValueToFind}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, description: 'John' } as User;
   *   const u2 = { id: 2, description: 'John' } as User;
   *
   *   // Will return u1
   *   ArrayUtil.findFirstByKey(
   *      [u1, u2],
   *      'description',
   *      ['John']
   *   );
   * </pre>
   *
   * @param objectArray
   *    Array to search provided property value
   * @param key
   *    Property used to find given value
   * @param keyValuesToFind
   *    Array of key values to search inside {@code objectArray}
   *
   * @return {@code undefined} if {@code objectArray} has no elements or does not contain provided {@code keyValueToFind},
   *         first element which {@code key} has the same value as {@code keyValueToFind} otherwise
   */
  static findByKey = <T, K extends keyof T>(objectArray: NullableOrUndefined<T[]>,
                                            key: K,
                                            keyValuesToFind: NullableOrUndefined<T[K][]>): OrUndefined<T> => {
    if (this.isEmpty(objectArray) ||
        this.isEmpty(keyValuesToFind)) {
      return undefined;
    }
    return objectArray!.find(
      (obj: T) => -1 !== keyValuesToFind!.indexOf(obj[key])
    );
  }


  /**
   *    Returns from the given {@code objectArray} the first element which {@code key} value matches with the provided
   * {@code keyValueToFind}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, description: 'John' } as User;
   *   const u2 = { id: 2, description: 'John' } as User;
   *
   *   // Will return Optional(u1)
   *   ArrayUtil.findFirstByKey(
   *      [u1, u2],
   *      'description',
   *      ['John']
   *   );
   * </pre>
   *
   * @param objectArray
   *    Array to search provided property value
   * @param key
   *    Property used to find given value
   * @param keyValuesToFind
   *    Array of key values to search inside {@code objectArray}
   *
   * @return {@link Optional#empty} if {@code objectArray} has no elements or does not contain provided {@code keyValueToFind},
   *         {@link Optional} containing the first element which {@code key} has the same value as {@code keyValueToFind} otherwise
   */
  static findByKeyOptional = <T, K extends keyof T>(objectArray: NullableOrUndefined<T[]>,
                                                    key: K,
                                                    keyValuesToFind: NullableOrUndefined<T[K][]>): Optional<T> =>
    Optional.ofNullable(
      this.findByKey(
        objectArray,
        key,
        keyValuesToFind
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
   *    Returns a new array using {@code objectArray} as source, adding from the result the elements that verify the
   * given {@link TPredicate1} {@code filterPredicate}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, description: 'user1' } as User;
   *   const u2 = { id: 2, description: 'user2' } as User;
   *   const u3 = { id: 3, description: 'user3' } as User;
   *
   *   // Will return [u1, u3]
   *   ArrayUtil.takeWhile(
   *      [u1, u2, u3],
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *   );
   * </pre>
   *
   * @param objectArray
   *    Array to filter provided property values
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter
   *
   * @return empty array if {@code objectArray} has no elements or no one verifies provided {@code filterPredicate},
   *         a new array with the elements of {@code objectArray} which verify {@code filterPredicate} otherwise
   */
  static takeWhile = <T>(objectArray: NullableOrUndefined<T[]>,
                         filterPredicate: TPredicate1<T>): T[] => {
    if (this.isEmpty(objectArray)) {
      return [];
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate);

    return objectArray!.filter(
      (obj: T) => finalFilterPredicate.apply(obj)
    );
  }


  /**
   *    Returns a new array using {@code objectArray} as source, adding from the result the elements which property
   * {@code key} contains any of values included in {@code keyValuesToKeepIfFound}.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *      id: number;
   *      name: string;
   *   }
   *   const u1 = { id: 1, description: 'user1' } as User;
   *   const u2 = { id: 2, description: 'user2' } as User;
   *   const u3 = { id: 3, description: 'user3' } as User;
   *
   *   // Will return [u2, u3]
   *   ArrayUtil.takeWhileByKey(
   *      [u1, u2],
   *      'id',
   *      [2, 3]
   *   );
   * </pre>
   *
   * @param objectArray
   *    Array to filter provided property values
   * @param key
   *    Property used to find given values to filter
   * @param keyValuesToKeepIfFound
   *    Key values used to know which object instances will be added in the result
   *
   * @return empty array if {@code objectArray} or {@code keyValuesToKeepIfFound} has no elements or no one is found in
   *         {@code keyValuesToKeepIfFound},
   *         a new array with the elements of {@code objectArray} which property {@code key} contains any of values
   *         included in {@code valuesOfKeyToKeepIfFound} otherwise
   */
  static takeWhileByKey = <T, K extends keyof T>(objectArray: NullableOrUndefined<T[]>,
                                                 key: K,
                                                 keyValuesToKeepIfFound: NullableOrUndefined<T[K][]>): T[] => {
    if (this.isEmpty(objectArray) ||
        this.isEmpty(keyValuesToKeepIfFound)) {
      return [];
    }
    return objectArray!.filter(
      (obj: T) => -1 !== keyValuesToKeepIfFound!.indexOf(obj[key])
    );
  }

}
