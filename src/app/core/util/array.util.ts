import {Function2, Nullable, NullableOrUndefined, TFunction2} from '@app-core/types';
import * as _ from 'lodash';

/**
 * Helper functions to manage arrays.
 */
export class ArrayUtil {

  constructor() {
    throw new SyntaxError('ArrayUtil is an utility class');
  }


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

}
