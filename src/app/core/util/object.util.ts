import { ArrayUtil } from '@app-core/util';
import { Function0, isFFunction0, TFunction0 } from '@app-core/types/function';
import { Optional } from '@app-core/types/functional';
import { NullableOrUndefined, OrUndefined } from '@app-core/types';
import { Predicate1 } from '@app-core/types/predicate';
import * as _ from 'lodash';

/**
 * Helper functions to manage common operations related with class instances.
 */
export class ObjectUtil {

  constructor() {
    throw new SyntaxError('ObjectUtil is an utility class');
  }


  /**
   * Returns the first not `null` and not `undefined` value of the provided ones.
   *
   * <pre>
   *    coalesce(                      Result:
   *      null,                         12
   *      undefined,
   *      12,
   *      15
   *    )
   * </pre>
   *
   * @param valuesToVerify
   *   Values to check the first one neither `undefined` nor `null`
   *
   * @return first not `null` and not `undefined` value if exists, `undefined` otherwise
   */
  static coalesce = <T>(...valuesToVerify: NullableOrUndefined<T>[]): OrUndefined<T> => {
    let result;
    if (!ArrayUtil.isEmpty(valuesToVerify)) {
      result = ArrayUtil.find(
        valuesToVerify,
        Predicate1.of(
          (t: NullableOrUndefined<T>) => this.nonNullOrUndefined(t)
        )
      );
    }
    return this.isNullOrUndefined(result)
      ? undefined
      : result;
  }


  /**
   *    Returns an {@link Optional} containing not `null` and not `undefined` value of the provided ones,
   * {@link Optional#empty} otherwise.
   *
   * <pre>
   *    coalesce(                      Result:
   *      null,                         Optional(12)
   *      undefined,
   *      12,
   *      15
   *    )
   * </pre>
   *
   * @param valuesToVerify
   *   Values to check the first one neither `undefined` nor `null`
   *
   * @return {@link Optional} containing the first `null` and not `undefined` value if exists,
   *         {@link Optional#empty} otherwise.
   */
  static coalesceOptional = <T>(...valuesToVerify: NullableOrUndefined<T>[]): Optional<T> => {
    let result;
    if (!ArrayUtil.isEmpty(valuesToVerify)) {
      result = ArrayUtil.find(
        valuesToVerify,
        Predicate1.of(
          (t: NullableOrUndefined<T>) => this.nonNullOrUndefined(t)
        )
      );
    }
    return Optional.ofNullable<T>(result);
  }


  /**
   *    Using provided `sourceObject` returns a new object containing the property-value pairs that match with given
   * array of properties `propertiesToCopy`.
   *
   * <pre>
   * Example:
   *
   *   class User {
   *     public id: number;
   *     public name: string;
   *     public age: number;
   *
   *     constructor(id: number, name: string, age: number) {
   *       this.id = id;
   *       this.name = name;
   *       this.age = age;
   *     }
   *   }
   *
   *   // Will return { id: 10, name: 'user1' }
   *   ObjectUtil.copyProperties(
   *      new User(10, 'user1', 31),
   *      ['id', 'name']
   *   );
   * </pre>
   *
   * @param sourceObject
   *    Instance with the property values to copy
   * @param propertiesToCopy
   *    Array of the property to copy in the returned object
   *
   * @return new object containing the property-value pairs that match with `propertiesToCopy`, included in `sourceObject`,
   *         `undefined` if `sourceObject` is `null` or `undefined` and/or `propertiesToCopy` has no elements.
   */
  static copyProperties = <T, K extends keyof T>(sourceObject: NullableOrUndefined<T>,
                                                 propertiesToCopy: NullableOrUndefined<K[]>): OrUndefined<Pick<T, K>> => {
    if (this.isNullOrUndefined(sourceObject) ||
        ArrayUtil.isEmpty(propertiesToCopy)) {
      return undefined;
    }
    const result = {} as Pick<T, K>;
    for (let property of propertiesToCopy!) {
      if (this.nonNullOrUndefined(property)) {
        result[property] = _.cloneDeep(sourceObject![property]);
      }
    }
    return result;
  }


  /**
   *    Using provided `sourceObject` returns an {@link Optional} containing a new object with the property-value pairs
   * that match with given array of properties `propertiesToCopy`.
   *
   * <pre>
   * Example:
   *
   *   class User {
   *     public id: number;
   *     public name: string;
   *     public age: number;
   *
   *     constructor(id: number, name: string, age: number) {
   *       this.id = id;
   *       this.name = name;
   *       this.age = age;
   *     }
   *   }
   *
   *   // Will return Optional({ id: 10, name: 'user1' })
   *   ObjectUtil.copyPropertiesOptional(
   *      new User(10, 'user1', 31),
   *      ['id', 'name']
   *   );
   * </pre>
   *
   * @param sourceObject
   *    Instance with the property values to copy
   * @param propertiesToCopy
   *    Array of the property to copy in the returned object
   *
   * @return {@link Optional} new object containing the property-value pairs that match with `propertiesToCopy`, included in `sourceObject`,
   *         {@link Optional#empty} if `sourceObject` is `null` or `undefined` and/or `propertiesToCopy` has no elements.
   */
  static copyPropertiesOptional = <T, K extends keyof T>(sourceObject: NullableOrUndefined<T>,
                                                         propertiesToCopy: NullableOrUndefined<K[]>): Optional<Pick<T, K>> => {
    if (this.isNullOrUndefined(sourceObject) ||
        ArrayUtil.isEmpty(propertiesToCopy)) {
      return Optional.empty<Pick<T, K>>();
    }
    const result = {} as Pick<T, K>;
    for (let property of propertiesToCopy!) {
      if (this.nonNullOrUndefined(property)) {
        result[property] = _.cloneDeep(sourceObject![property]);
      }
    }
    return Optional.of<Pick<T, K>>(result);
  }


  /**
   * Returns `true` if `a` is equals to `b`, `false` otherwise.
   *
   * @apiNote
   *    This method supports comparing arrays, array buffers, booleans, date objects, error objects, maps, numbers,
   * {@link Object} objects, regexes, sets, strings, symbols, and typed arrays.
   * <p>
   *    Comparing {@link Object} objects tries to find if the instance has defined the `equals` method, using it
   * if exists. Otherwise, are compared by their own, not inherited, enumerable properties.
   * <p>
   *    Functions and DOM nodes are compared by strict equality, i.e. ===.
   *
   * <pre>
   * Example:
   *
   *   class User {
   *     public id: number;
   *     public name: string;
   *
   *     constructor(id: number, name: string) {
   *       this.id = id;
   *       this.name = name;
   *     }
   *
   *     equals = (other?: User | null): boolean =>
   *       ObjectUtil.isNullOrUndefined(other)
   *         ? false
   *         : this.id === other.id;
   *   }
   *
   *   // Will return true
   *   ObjectUtil.equals(
   *      new User(10, 'user1'),
   *      new User(10, 'user2')
   *   );
   *
   *  // Will return false
   *  ObjectUtil.equals(
   *      new User(10, 'user1'),
   *      new User(11, 'user1')
   *   );
   * </pre>
   *
   * @param a
   *    First value to compare
   * @param b
   *    First value to compare
   *
   * @return `true` if `a` is equals to `b`,
   *         `false` otherwise.
   */
  static equals = <T>(a: NullableOrUndefined<T>,
                      b: NullableOrUndefined<T>): boolean => {
    if ((this.isNullOrUndefined(a) && this.nonNullOrUndefined(b)) ||
        (this.nonNullOrUndefined(a) && this.isNullOrUndefined(b))) {
      return false;
    }
    if (this.nonNullOrUndefined(a) &&
        'object' === typeof a &&
        // @ts-ignore
        'function' === typeof a['equals']) {

      // @ts-ignore
      return a['equals'](b);
    }
    return _.isEqual(a, b);
  }


  /**
   *    Returns the given `valueToVerify` if it is neither `undefined` nor `null`,
   * `defaultValue` otherwise.
   *
   * @param valueToVerify
   *    Value to return if it is neither `undefined` nor `null`
   * @param defaultValue
   *    Returned value if `valueToVerify` is `undefined` or `null`
   *
   * @return `valueToVerify` if it is neither `undefined` nor `null`,
   *         `defaultValue` otherwise
   */
  static getOrElse<T>(valueToVerify: NullableOrUndefined<T>,
                      defaultValue: T): T;


  /**
   *    Returns the given `valueToVerify` if it is neither `undefined` nor `null`,
   * the result after invoking `defaultValue` otherwise.
   *
   * <pre>
   *    getOrElse(                               Result:
   *      null,                                   'DEFAULT VALUE'
   *      () => 'DEFAULT VALUE'
   *    )
   * </pre>
   *
   * @param valueToVerify
   *    Value to return if it is neither `undefined` nor `null`
   * @param defaultValue
   *    {@link TFunction0} to invoke if `valueToVerify` is `undefined` or `null`
   *
   * @return `valueToVerify` if it is neither `undefined` nor `null`,
   *         the result after invoking `defaultValue` otherwise
   */
  static getOrElse<T>(valueToVerify: NullableOrUndefined<T>,
                      defaultValue: TFunction0<T>): T;


  static getOrElse<T>(valueToVerify: NullableOrUndefined<T>,
                      defaultValue: TFunction0<T> | T): T {
    if (this.nonNullOrUndefined(valueToVerify)) {
      return valueToVerify;
    }
    if (Function0.isFunction(defaultValue) || isFFunction0(defaultValue)) {
      return Function0.of(defaultValue)
        .apply();
    }
    return defaultValue;
  }


  /**
   * Verifies if the provided `valueToVerify` is `null` or `undefined`.
   *
   * @param valueToVerify
   *    Value to return if it is `undefined` or `null`
   *
   * @return `true` if the provided `valueToVerify` is `null` or `undefined`,
   *         `false` otherwise.
   */
  static isNullOrUndefined = (valueToVerify: any): valueToVerify is null | undefined =>
    _.isNil(valueToVerify);


  /**
   * Verifies if the provided `valueToVerify` is `null` or `undefined`.
   *
   * @param valueToVerify
   *    Value to return if it is `undefined` or `null`
   *
   * @return `true` if the provided `valueToVerify` is not `null` and not `undefined`,
   *         `false` otherwise.
   */
  static nonNullOrUndefined = <T>(valueToVerify: NullableOrUndefined<T>): valueToVerify is Exclude<typeof valueToVerify, null | undefined> =>
    !this.isNullOrUndefined(valueToVerify);


  /**
   * Returns a copy of provided `sourceObject` sorting its properties.
   *
   * @apiNote
   *    If `sourceObject` is not an {@link Object} then it will be returned.
   *
   * <pre>
   *    sortObjectProperties(                                 Result:
   *       12                                                  12
   *    )
   *    sortObjectProperties(                                 Result:
   *       { b: 1, a: '2', h: { z: 11, a: 'ea' }}              { a: '2', b: 1, h: { a: 'ea', z: 11 }}
   *    )
   * </pre>
   *
   * @param sourceObject
   *    Instance with the properties to sort
   *
   * @return new object containing the same properties but sorted,
   *         `undefined` if `sourceObject` is `null` or `undefined`.
   */
  static sortObjectProperties<T>(sourceObject: NullableOrUndefined<T>): OrUndefined<T> {
    if (this.isNullOrUndefined(sourceObject)) {
      return undefined;
    }
    if ('object' !== typeof sourceObject) {
      return sourceObject;
    }
    return Object.keys(sourceObject!)
      .sort()
      .reduce(
        (accumulator, currentKey) => {
          // @ts-ignore
          accumulator[currentKey] = ObjectUtil.sortObjectProperties(sourceObject![currentKey]);
          return accumulator;
        },
        {} as T
      );
  }

}
