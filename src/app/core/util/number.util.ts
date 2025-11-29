import { AssertUtil, ObjectUtil, StringUtil } from '@app-core/util';
import { NullableOrUndefinedStringNumber, OrUndefined } from '@app-core/types';

/**
 * Helper functions to manage common operations related with numbers: integer, float, etc.
 */
export class NumberUtil {

  constructor() {
    throw new SyntaxError('NumberUtil is an utility class');
  }


  /**
   * Compares provided {@link Number}s taking into account the given `epsilon`.
   *
   * @apiNote
   *    Javascript is not the best programming language managing float values so, take care about the `epsilon` provided
   * value. For example:
   *
   * <pre>
   *    compare(11.144, 11.143, 0.001);
   *
   *    Will return 0 (both are equals), because:
   *      Math.abs(11.144 - 11.143) = 0.000999999568 => lower than 0.001, so they are considered equal values
   * </pre>
   * <p><p>
   * <pre>
   *    compare(                       Result:
   *      100.125,                      0
   *      '100.126',
   *      0.01
   *    )
   *   compare(                        Result:
   *      '100.125'                     -1
   *      100.126,
   *      0.0009
   *    )
   * </pre>
   *
   * @param one
   *    First input to compare
   * @param two
   *    Second input to compare
   * @param epsilon
   *    {@link Number} used to know the precision comparing `one` and `two`. If it is `null`, `undefined` or less than zero,
   *    {@link Number#EPSILON} will be applied
   *
   * @return  0: if (`one` == `two`) || (`one` and `two` are `null` or `undefined`)
   *         -1: if (`one` < `two`) || (`one` is `null` or `undefined`  &&  `two` does not)
   *          1: if (`one` > `two`) || (`one` is not `null` or `undefined`  &&  `two` does)
   *
   * @throws {IllegalArgumentError} if `one` and `two` has a value but not a valid float one
   */
  static compare = (one: NullableOrUndefinedStringNumber,
                    two: NullableOrUndefinedStringNumber,
                    epsilon?: number | null): number => {
    if (ObjectUtil.isNullOrUndefined(one)) {
      return ObjectUtil.isNullOrUndefined(two)
        ? 0
        : -1;
    }
    if (ObjectUtil.isNullOrUndefined(two)) {
      return 1;
    }
    AssertUtil.isTrue(
      NumberUtil.isValidFloat(one),
      'one: ' + one + ' is not a valid float value'
    );
    AssertUtil.isTrue(
      NumberUtil.isValidFloat(two),
      'two: ' + two + ' is not a valid float value'
    );
    const finalEpsilon = ObjectUtil.isNullOrUndefined(epsilon) || 0 > epsilon
      ? Number.EPSILON
      : epsilon;

    const finalOne = parseFloat('' + one);
    const finalTwo = parseFloat('' + two);
    if (Math.abs(finalOne - finalTwo) < finalEpsilon) {
      return 0;
    }
    if (finalOne - finalTwo < finalEpsilon) {
      return -1;
    }
    return 1;
  }


  /**
   * Verifies if the given `inputToCheck` is a valid float value.
   *
   * @param inputToCheck
   *    Input to verify
   *
   * @return `true` if provided `inputToCheck` is a valid float value,
   *         `false` otherwise
   */
  static isValidFloat = (inputToCheck: NullableOrUndefinedStringNumber): boolean => {
    if (ObjectUtil.nonNullOrUndefined(inputToCheck)) {
      const finalInputToCheck = 'number' === inputToCheck
        ? '' + inputToCheck
        : ('' + inputToCheck).replace(/,/g, '').trim();

      if (!StringUtil.isBlank(finalInputToCheck)) {
        return !Number.isNaN(
          Number(finalInputToCheck)
        );
      }
    }
    return false;
  }


  /**
   * Verifies if the given `inputToCheck` is a valid integer value.
   *
   * @param inputToCheck
   *    Input to verify
   *
   * @return `true` if provided `inputToCheck` is a valid integer value,
   *         `false` otherwise
   */
  static isValidInt = (inputToCheck: NullableOrUndefinedStringNumber): boolean => {
    if (ObjectUtil.nonNullOrUndefined(inputToCheck)) {
      const finalInputToCheck = 'number' === inputToCheck
        ? '' + inputToCheck
        : ('' + inputToCheck).replace(/,/g, '').trim();

      if (!StringUtil.isBlank(finalInputToCheck)) {
        const numberConversion = Number(finalInputToCheck);
        return !Number.isNaN(numberConversion) &&
          -1 === ('' + numberConversion).indexOf('.');
      }
    }
    return false;
  }


  /**
   * Formats the given `inputToFix` in a float value with provided `fixedPoints` notation.
   *
   * @param inputToFix
   *    Input to convert into a fixed-point float. If no value is provided, empty string will be the default.
   * @param fixedPoints
   *    Value of the expected fixed-point notation. If no value is provided or negative, 2 will be the default.
   *
   * @return a string representing the given number using fixed-point notation if there was no problem in the conversion,
   *         `undefined` otherwise.
   */
  static toFloatWithFixedPointNotation = (inputToFix: NullableOrUndefinedStringNumber,
                                          fixedPoints?: string | number | null): OrUndefined<string> => {
    const finalInputToFix = ObjectUtil.nonNullOrUndefined(inputToFix)
      ? '' + inputToFix
      : '';

    const finalFixedPoints = ObjectUtil.nonNullOrUndefined(fixedPoints)
      ? '' + fixedPoints
      : '2';

    if (this.isValidFloat(finalInputToFix) &&
        this.isValidInt(finalFixedPoints)) {
      let positiveFixedPoints = 0 < parseInt(finalFixedPoints)
        ? parseInt(finalFixedPoints)
        : 2;

      return parseFloat(finalInputToFix)
        .toFixed(
          parseInt('' + positiveFixedPoints)
        );
    }
    return undefined;
  }

}
