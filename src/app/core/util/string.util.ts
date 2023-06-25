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
   * Checks if the given `input` is `null`, `undefined`, an empty {@link String} ('') or whitespace.
   *
   * <pre>
   * Example:
   *
   *   Parameters:          Result:
   *    null                 true
   *    undefined            true
   *    ''                   true
   *    '   '                true
   *    '  a '               false
   * </pre>
   *
   * @param inputToCheck
   *    {@link String} to verify
   *
   * @return `true` if `input` is `undefined`, `null` or has no characters
   */
  static isBlank = (sourceString: NullableOrUndefined<string>): boolean =>
    ObjectUtil.isNullOrUndefined(sourceString) ||
      0 == sourceString!.trim().length;


  /**
   * Checks if the given `input` is `null`, `undefined` or an empty {@link String} ('').
   *
   * <pre>
   * Example:
   *
   *   Parameters:          Result:
   *    null                 true
   *    undefined            true
   *    ''                   true
   *    '   '                false
   *    '  a '               false
   * </pre>
   *
   * @param sourceString
   *    {@link String} to verify
   *
   * @return `true` if `input` is `undefined`, `null` or has no characters
   */
  static isEmpty = (sourceString: NullableOrUndefined<string>): boolean =>
    ObjectUtil.isNullOrUndefined(sourceString) ||
      0 == sourceString.length;


  /**
   *    Loops through the provided {@link String} one position every time, returning an array with {@link String} with
   * length equals to `size`.
   *
   * @apiNote
   *    If `size` is `null`, `undefined` or lower than zero then 1 will be applied.
   *
   * <pre>
   * Example 1:
   *
   *   Parameters:              Result:
   *    '12'                     ['12']
   *    5
   * </pre>
   *
   * <pre>
   * Example 2:
   *
   *   Parameters:              Result:
   *    '789'                    ['78', '89']
   *    2
   * </pre>
   *
   * @param sourceString
   *    {@link String} to slide
   * @param size
   *    Size of every part inside the returned array
   *
   * @return array of {@link String}
   */
  static sliding = (sourceString: NullableOrUndefined<string>,
                    size: number): string[] => {
    if (this.isEmpty(sourceString)) {
      return [];
    }
    if (ObjectUtil.isNullOrUndefined(size) ||
        1 > size ||
        size >= sourceString!.length) {
      return [sourceString!];
    }
    const result: string[] = [];
    for (let i = 0; i < sourceString!.length - size + 1; i++) {
      result.push(
        sourceString!.substring(
          i,
          i + size
        )
      );
    }
    return result;
  }

}
