import { ObjectUtil } from '@app-core/util';
import { NullableOrUndefined } from '@app-core/types';

/**
 * Helper functions to manage strings.
 */
export class StringUtil {

  constructor() {
    throw new SyntaxError('StringUtil is an utility class');
  }


  /**
   * Checks if the given {@code input} is {@code null}, {@code undefined}, an empty string ('') or whitespace.
   *
   * <pre>
   * Example:
   *
   *   Parameters:              Result:
   *    null                     true
   *    undefined                true
   *    ''                       true
   *    '   '                    true
   * </pre>
   *
   * @param inputToCheck
   *    String to verify
   *
   * @return {@code true} if {@code input} is {@code undefined}, {@code null} or has no characters
   */
  static isBlank = (inputToCheck: NullableOrUndefined<string>): boolean =>
    ObjectUtil.isNullOrUndefined(inputToCheck) ||
      0 == inputToCheck!.trim().length;


  /**
   * Checks if the given {@code input} is {@code null}, {@code undefined} or an empty string ('').
   *
   * <pre>
   * Example:
   *
   *   Parameters:              Result:
   *    null                     true
   *    undefined                true
   *    ''                       true
   *    '   '                    false
   * </pre>
   *
   * @param inputToCheck
   *    String to verify
   *
   * @return {@code true} if {@code input} is {@code undefined}, {@code null} or has no characters
   */
  static isEmpty = (inputToCheck: NullableOrUndefined<string>): boolean =>
    ObjectUtil.isNullOrUndefined(inputToCheck) ||
      0 == inputToCheck.length;

}
