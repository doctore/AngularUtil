import { NullableOrUndefined } from '@app-core/types';
import { Function0, isFFunction0, TFunction0 } from '@app-core/types/function';
import * as _ from 'lodash';

/**
 * Helper functions to manage common operations related with class instances.
 */
export class ObjectUtil {

  constructor() {
    throw new SyntaxError('ObjectUtil is an utility class');
  }


  /**
   * Returns {@code true} if {@code a} is equals to {@code b}, {@link false} otherwise.
   *
   * @apiNote
   *    Due to Typescript is not a real strongly typed language, the behavior of this method could be the same
   * that {@link ObjectUtil#rawEquals}.
   * <p>
   *    If we are comparing Object objects, it will use its {@code equals} method if it exists, otherwise verifies
   * if they are equivalent based on their own.
   * <p>
   *    However, in definition of classes with private and/or protected properties, it is strongly recommended
   * to include the {@code equals} method to avoid false negatives, since the internal method will not be able
   * to access to their content.
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
   *   ObjectUtil.equals(
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
   * @return {@code true} if {@code a} is equals to {@code b},
   *         {@code false} otherwise.
   */
  static equals = <T>(a: NullableOrUndefined<T>,
                      b: NullableOrUndefined<T>): boolean => {
    if ((this.isNullOrUndefined(a) && this.nonNullOrUndefined(b)) ||
        (this.nonNullOrUndefined(a) && this.isNullOrUndefined(b))) {
      return false;
    }
    if ('object' === typeof a) {

      // @ts-ignore
      return this.nonNullOrUndefined(a) && 'function' === typeof a['equals']

        // @ts-ignore
        ? a['equals'](b)
        : _.isEqual(a, b);
    }
    return a === b;
  }


  /**
   *    Returns the given {@code valueToVerify} if it is neither {@code undefined} nor {@code null},
   * {@code defaultValue} otherwise.
   *
   * @param valueToVerify
   *    Value to return if it is neither {@code undefined} nor {@code null}
   * @param defaultValue
   *    Returned value if {@code valueToVerify} is {@code undefined} or {@code null}
   *
   * @return {@code valueToVerify} if it is neither {@code undefined} nor {@code null},
   *         {@code defaultValue} otherwise
   */
  static getOrElse<T>(valueToVerify: NullableOrUndefined<T>,
                      defaultValue: T): T;


  /**
   *    Returns the given {@code valueToVerify} if it is neither {@code undefined} nor {@code null},
   * the result after invoking {@code defaultValue} otherwise.
   *
   * <pre>
   * Example:
   *
   *   // Will return 'DEFAULT VALUE'
   *   getOrElse(
   *      null,
   *      () => 'DEFAULT VALUE'
   *   );
   * </pre>
   *
   * @param valueToVerify
   *    Value to return if it is neither {@code undefined} nor {@code null}
   * @param defaultValue
   *    {@link TFunction0} to invoke if {@code valueToVerify} is {@code undefined} or {@code null}
   *
   * @return {@code valueToVerify} if it is neither {@code undefined} nor {@code null},
   *         the result after invoking {@code defaultValue} otherwise
   */
  static getOrElse<T>(valueToVerify: NullableOrUndefined<T>,
                      defaultValue: TFunction0<T>): T;


  static getOrElse<T>(valueToVerify: NullableOrUndefined<T>,
                      defaultValue: TFunction0<T> | T): T {
    if (this.nonNullOrUndefined(valueToVerify)) {
      return valueToVerify;
    }
    if (Function0.isFunction(defaultValue)) {
      return defaultValue.apply();
    }
    if (isFFunction0(defaultValue)) {
      return Function0.of(defaultValue)
        .apply();
    }
    return defaultValue;
  }


  /**
   * Verifies if the provided {@code valueToVerify} is {@code null} or {@code undefined}.
   *
   * @param valueToVerify
   *    Value to return if it is {@code undefined} or {@code null}
   *
   * @return {@code true} if the provided {@code valueToVerify} is {@code null} or {@code undefined},
   *         {@code false} otherwise.
   */
  static isNullOrUndefined = (valueToVerify: any): valueToVerify is null | undefined =>
    _.isNil(valueToVerify);


  /**
   * Verifies if the provided {@code valueToVerify} is {@code null} or {@code undefined}.
   *
   * @param valueToVerify
   *    Value to return if it is {@code undefined} or {@code null}
   *
   * @return {@code true} if the provided {@code valueToVerify} is not {@code null} and not {@code undefined},
   *         {@code false} otherwise.
   */
  static nonNullOrUndefined = <T>(valueToVerify: NullableOrUndefined<T>): valueToVerify is Exclude<typeof valueToVerify, null | undefined> =>
    !this.isNullOrUndefined(valueToVerify);


  /**
   * Performs a deep comparison between two values to determine if they are equivalent.
   *
   * @apiNote
   *    This method supports comparing arrays, array buffers, booleans, date objects, error objects, maps, numbers,
   * Object objects, regexes, sets, strings, symbols, and typed arrays. Object objects are compared by their own,
   * not inherited, enumerable properties. Functions and DOM nodes are compared by strict equality, i.e. ===.
   * <p>
   *    Due to Typescript is not a real strongly typed language, this function will return {@code true} if both
   * values are {@code null} or {@code undefined}.
   * <p>
   *    Comparing Object objects with private and/or protected properties will return {@code false}, regardless
   * of whether they all have the same values, because the method will not be able to access them. Define an
   * {@code equals} method in their class definition and use {@link ObjectUtil#equals} as alternative.
   *
   * <pre>
   * Example:
   *
   *   interface User {
   *     id: number;
   *     name: string;
   *   }
   *
   *   interface Role {
   *     id: number;
   *     name: string;
   *   }
   *
   *   // Will return true
   *   ObjectUtil.rawEquals(
   *      { id: 10, name: 'name value' } as User,
   *      { id: 10, name: 'name value' } as Role
   *   );
   * </pre>
   *
   * @param a
   *    First value to compare
   * @param b
   *    First value to compare
   *
   * @return {@code true} if {@code a} is equals to {@code b},
   *         {@code false} otherwise.
   */
  static rawEquals = (a: NullableOrUndefined<any>,
                      b: NullableOrUndefined<any>): boolean =>
    _.isEqual(a, b);

}
