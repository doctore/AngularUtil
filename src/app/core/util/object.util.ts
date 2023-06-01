import { Nullable } from '@app-core/types';
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
   *    Due to Typescript is not a real strongly typed language, and we cannot know the type of generics in runtime,
   * this function could return {@code true} based on {@code equals} methods defined in different classes:
   *
   * <pre>
   * Example:
   *
   *   class User {
   *     public id: number;
   *     public description: string;
   *
   *     constructor(id: number, description: string) {
   *       this.id = id;
   *       this.description = description;
   *     }
   *
   *     equals = (other?: User | null): boolean =>
   *       _.isNil(other)
   *         ? false
   *         : this.id === other.id;
   *   }
   *
   *
   *  class Address {
   *     public id: number;
   *     public description: string;
   *
   *     constructor(id: number, description: string) {
   *       this.id = id;
   *       this.description = description;
   *     }
   *
   *     equals = (other?: Address | null): boolean =>
   *       _.isNil(other)
   *         ? false
   *         : this.id === other.id;
   *   }
   *
   *
   *   ObjectUtil.equals(
   *      new User(10, 'user1'),
   *      new Address(10, 'address1')
   *   );                                // Will return true
   * </pre>
   *
   * <p>
   * Due to the same reason, this function will return {@code true} if both values are {@code null} or {@code undefined}
   *
   * @param a
   *    First value to compare
   * @param b
   *    First value to compare
   *
   * @return {@code true} if {@code a} is equals to {@code b},
   *         {@code false} otherwise.
   */
  static equals = (a?: Nullable<any>,
                   b?: Nullable<any>): boolean => {
    if ((_.isNil(a) && !_.isNil(b)) ||
        (!_.isNil(a) && _.isNil(b))) {
      return false;
    }
    if ('object' === typeof a) {
      if (!_.isNil(a) && 'function' === typeof a['equals']) {
        return a['equals'](b);
      }
      if (!_.isNil(b) && 'function' === typeof b['equals']) {
        return b['equals'](a);
      }
      return _.isEqual(a, b);
    }
    return a === b;
  }


  /**
   * Returns {@code true} if {@code a} is equals to {@code b}, {@link false} otherwise.
   *
   * @apiNote
   *    Due to Typescript is not a real strongly typed language, the behavior of this method could be the same
   * that {@link ObjectUtil#equals}.
   *
   * @param a
   *    First value to compare
   * @param b
   *    First value to compare
   *
   * @return {@code true} if {@code a} is equals to {@code b},
   *         {@code false} otherwise.
   */
  static typedEquals = <T>(a?: Nullable<T>,
                           b?: Nullable<T>): boolean => {
    if ((_.isNil(a) && !_.isNil(b)) ||
      (!_.isNil(a) && _.isNil(b))) {
      return false;
    }
    if ('object' === typeof a) {

      // @ts-ignore
      return !_.isNil(a) && 'function' === typeof a['equals']
          // @ts-ignore
        ? a['equals'](b)
        : _.isEqual(a, b);
    }
    return a === b;
  }

}
