import { ObjectUtil } from '@app-core/util';
import { OrUndefined } from '@app-core/types';

/**
 * Helper functions to manage common operations related with numbers: integer, float, etc.
 */
export class NumberUtil {

  constructor() {
    throw new SyntaxError('NumberUtil is an utility class');
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
  static isValidFloat = (inputToCheck?: string | number | null): boolean => {
    if (ObjectUtil.nonNullOrUndefined(inputToCheck)) {
      const finalInputToCheck = 'number' === inputToCheck
        ? inputToCheck
        : ('' + inputToCheck).replace(/,/g, '').trim();

      return finalInputToCheck == '' + parseFloat('' + finalInputToCheck);
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
  static isValidInt = (inputToCheck?: string | number | null): boolean =>
    ObjectUtil.nonNullOrUndefined(inputToCheck) &&
    inputToCheck == parseInt('' + inputToCheck);


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
  static toFloatWithFixedPointNotation = (inputToFix?: string | number | null,
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
