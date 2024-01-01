import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { NullableOrUndefined } from '@app-core/types';
import { FFunction1, Function1, TFunction1 } from '@app-core/types/function';
import { Predicate1, TPredicate1 } from '@app-core/types/predicate';

/**
 * Helper functions to manage strings.
 */
export class StringUtil {

  constructor() {
    throw new SyntaxError('StringUtil is an utility class');
  }

  static BLANK_SPACE: string = ' ';

  static DEFAULT_ABBREVIATION_STRING: string = '...';

  static EMPTY_STRING: string = '';


  /**
   * Abbreviates the given `sourceString` using provided `abbreviationString` as replacement marker.
   * <p>
   *    The following use cases will not return the expected replaced {@link String}:</p>
   *    <ul>
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} will be returned</li>
   *      <li>If `maxLength` is less than or equal to 0 then empty {@link String} will be returned</li>
   *      <li>If `maxLength` is greater than or equal to `sourceString`'s length then `sourceString` will be returned</li>
   *    </ul>
   * <p>
   *    If `sourceString` is less than the first character of `sourceString` and `abbreviationString`'s length,
   * then an {@link IllegalArgumentError} will be thrown.
   *
   * @apiNote
   *    If `abbreviationString` is `null` or `undefined` then {@link StringUtil#DEFAULT_ABBREVIATION_STRING} will be used.
   * If `maxLength` is less than 0 then 0 will be used.
   * <p>
   * Examples:
   * <pre>
   *    abbreviate(null, *, *)           = ''
   *    abbreviate('abc', -1, '.')       = ''
   *    abbreviate('abc', 1, '.')        = IllegalArgumentError (minimum `maxLength` must be 2)
   *    abbreviate('abc', 3, '.')        = 'abc'
   *    abbreviate('abcdef', 4, '.')     = 'abc.'
   *    abbreviate('abcdef', 5)          = 'ab...'
   *    abbreviate('abcdef', 5, '...')   = 'ab...'
   *    abbreviate('abcdef', 10, '...')  = 'abcdef'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to abbreviate
   * @param maxLength
   *    Max size of the returned {@link String}. If it is less than 0 then 0 will be used
   * @param abbreviationString
   *    {@link String} to replace the middle characters. Default value will be {@link StringUtil#DEFAULT_ABBREVIATION_STRING}
   *
   * @return the abbreviated {@link String} if `maxLength` is greater than `sourceString`'s length,
   *         `sourceString` otherwise
   *
   * @throws IllegalArgumentError if `maxLength` is less than the first character of `sourceString`
   *                              and `abbreviationString`'s length
   */
  static abbreviate = (sourceString: NullableOrUndefined<string>,
                       maxLength: number,
                       abbreviationString: NullableOrUndefined<string> = StringUtil.DEFAULT_ABBREVIATION_STRING): string => {
    if (this.isEmpty(sourceString) ||
        0 >= maxLength) {
      return StringUtil.EMPTY_STRING;
    }
    if (sourceString!.length <= maxLength) {
      return sourceString!;
    }
    const finalAbbreviationString = ObjectUtil.getOrElse(
      abbreviationString,
      StringUtil.DEFAULT_ABBREVIATION_STRING
    );
    AssertUtil.isTrue(
      maxLength >= (finalAbbreviationString.length + 1),
      'Provided maxLength: ' + maxLength + ' is not enough to abbreviate at least first character of ' +
      'given sourceString: ' + sourceString + ' using abbreviationString: ' + finalAbbreviationString
    );
    const startOffset = maxLength - finalAbbreviationString.length;

    return sourceString!.substring(0, startOffset)
      + finalAbbreviationString;
  }


  /**
   *    Abbreviates the given `sourceString` to the length passed, replacing the middle characters with the supplied
   * `abbreviationString`.
   * <p>
   * The following use cases will not return the expected replaced {@link String}:
   *    <ul>
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} will be returned</li>
   *      <li>If `maxLength` is less than or equal to 0 then empty {@link String} will be returned</li>
   *      <li>If `maxLength` is greater than or equal to `sourceString`'s length then `sourceString` will be returned</li>
   *    </ul>
   * <p>
   *    If `maxLength` is less than the first and last characters of `sourceString` and `abbreviationString`'s length,
   * then an {@link IllegalArgumentError} will be thrown.
   *
   * @apiNote
   *    If `abbreviationString` is `null` or `undefined` then {@link StringUtil#DEFAULT_ABBREVIATION_STRING} will be used.
   * If `maxLength` is less than 0 then 0 will be used.
   * <p>
   * Examples:
   * <pre>
   *    abbreviateMiddle(null, *, *)           = ''
   *    abbreviateMiddle('abc', -1, '.')       = ''
   *    abbreviateMiddle('abc', 2, '.')        = IllegalArgumentError (minimum `maxLength` must be 3)
   *    abbreviateMiddle('abc', 3, '.')        = 'abc'
   *    abbreviateMiddle('abcdef', 4, '.')     = 'ab.f'
   *    abbreviateMiddle('abcdef', 5)          = 'a...f'
   *    abbreviateMiddle('abcdef', 5, '...')   = 'a...f'
   *    abbreviateMiddle('abcdef', 10, '...')  = 'abcdef'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to abbreviate
   * @param maxLength
   *    Max size of the returned {@link String}. If it is less than 0 then 0 will be used
   * @param abbreviationString
   *    {@link String} to replace the middle characters. Default value will be {@link StringUtil#DEFAULT_ABBREVIATION_STRING}
   *
   * @return the abbreviated {@link String} if `maxLength` is greater than `sourceString`'s length,
   *         `sourceString` otherwise
   *
   * @throws IllegalArgumentError if `maxLength` is less than the first and last characters of `sourceString` and
   *                              `abbreviationString`'s length
   */
  static abbreviateMiddle = (sourceString: NullableOrUndefined<string>,
                             maxLength: number,
                             abbreviationString: NullableOrUndefined<string> = StringUtil.DEFAULT_ABBREVIATION_STRING): string => {
    if (this.isEmpty(sourceString) ||
        0 >= maxLength) {
      return StringUtil.EMPTY_STRING;
    }
    if (sourceString!.length <= maxLength) {
      return sourceString!;
    }
    const finalAbbreviationString = ObjectUtil.getOrElse(
      abbreviationString,
      StringUtil.DEFAULT_ABBREVIATION_STRING
    );
    AssertUtil.isTrue(
      maxLength >= (finalAbbreviationString.length + 2),
      'Provided maxLength: ' + maxLength + ' is not enough to abbreviate at least first and last character of ' +
      'given sourceString: ' + sourceString + ' using abbreviationString: ' + finalAbbreviationString
    );
    const sizeOfDisplayedSourceString = maxLength - finalAbbreviationString.length;
    const startOffset = Math.floor((sizeOfDisplayedSourceString / 2) + (sizeOfDisplayedSourceString % 2));
    const endOffset = Math.ceil(sourceString!.length - (sizeOfDisplayedSourceString / 2));

    return sourceString!.substring(0, startOffset)
      + finalAbbreviationString
      + sourceString!.substring(endOffset);
  }


  /**
   * Returns a new {@link String} removing from the given `sourceString` all non-numeric characters.
   *
   * @param sourceString
   *    {@link String} to get all non-numeric characters.
   *
   * @return new {@link String} without non-numeric characters.
   */
  static getDigits = (sourceString: NullableOrUndefined<string>): string => {
    if (this.isEmpty(sourceString)) {
      return StringUtil.EMPTY_STRING;
    }
    return sourceString!.replaceAll(/\D/g, '');
  }


  /**
   *    Abbreviates the given `sourceString` to the length passed, replacing the middle characters with the supplied
   * `abbreviationString`.
   * <p>
   * The following use cases will not return the expected replaced {@link String}:
   *    <ul>
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} will be returned</li>
   *      <li>If `maxLength` is less than or equal to 0 then empty {@link String} will be returned</li>
   *    </ul>
   * <p>
   *    If `maxLength` is less than the first and last characters of `sourceString` and `abbreviationString`'s length,
   * then an {@link IllegalArgumentError} will be thrown.
   * <p>
   *    {@link StringUtil#abbreviateMiddle} returns `sourceString` when `maxLength` is greater than or equals to
   * `sourceString`'s length however, the current function always tries to hide middle characters if it is possible:
   * <p>
   * Examples:
   * <pre>
   *    abbreviateMiddle('abc', 3, '.') = 'abc'
   *    hideMiddle('abc', 3, '.')       = 'a.c'
   *
   *    abbreviateMiddle('abcdef', 10, '...') = 'abcdef'
   *    hideMiddle('abcdef', 10, '...')       = 'ab...f'
   * </pre>

   *
   * @apiNote
   *    If `abbreviationString` is `null` or `undefined` then {@link StringUtil#DEFAULT_ABBREVIATION_STRING} will be used.
   * If `maxLength` is less than 0 then 0 will be used.
   * <p>
   * Examples:
   * <pre>
   *    hideMiddle(null, *, *)           = ''
   *    hideMiddle('abc', -1, '.')       = ''
   *    hideMiddle('abc', 2, '.')        = IllegalArgumentError (minimum `maxLength` must be 3)
   *    hideMiddle('abc', 3, '.')        = 'a.c'
   *    hideMiddle('abcdef', 4, '.')     = 'ab.f'
   *    hideMiddle('abcdef', 5)          = 'a...f'
   *    hideMiddle('abcdef', 5, '...')   = 'a...f'
   *    hideMiddle('abcdef', 10, '...')  = 'ab...f'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to abbreviate
   * @param maxLength
   *    Max size of the returned {@link String}. If it is less than 0 then 0 will be used
   * @param abbreviationString
   *    {@link String} to replace the middle characters. Default value will be {@link StringUtil#DEFAULT_ABBREVIATION_STRING}
   *
   * @return the abbreviated {@link String} if `maxLength` is greater than 2,
   *         `sourceString` otherwise
   *
   * @throws IllegalArgumentError if `maxLength` is less than the first and last characters of `sourceString` and
   *                              `abbreviationString`'s length
   */
  static hideMiddle = (sourceString: NullableOrUndefined<string>,
                       maxLength: number,
                       abbreviationString: NullableOrUndefined<string> = StringUtil.DEFAULT_ABBREVIATION_STRING): string => {
    if (this.isEmpty(sourceString) ||
        0 >= maxLength) {
      return StringUtil.EMPTY_STRING;
    }
    if (2 >= sourceString!.length) {
      return sourceString!;
    }
    const finalAbbreviationString = ObjectUtil.getOrElse(
      abbreviationString,
      StringUtil.DEFAULT_ABBREVIATION_STRING
    );
    AssertUtil.isTrue(
      maxLength >= (finalAbbreviationString.length + 2),
      'Provided maxLength: ' + maxLength + ' is not enough to abbreviate at least first and last character of ' +
      'given sourceString: ' + sourceString + ' using abbreviationString: ' + finalAbbreviationString
    );
    const sizeOfDisplayedSourceString = maxLength < sourceString!.length
      ? maxLength - finalAbbreviationString.length
      : sourceString!.length - finalAbbreviationString.length;

    const startOffset = Math.floor((sizeOfDisplayedSourceString / 2) + (sizeOfDisplayedSourceString % 2));
    const endOffset = Math.ceil(sourceString!.length - (sizeOfDisplayedSourceString / 2));

    return sourceString!.substring(0, startOffset)
      + finalAbbreviationString
      + sourceString!.substring(endOffset);
  }


  /**
   * Checks if the given `sourceString` is `null`, `undefined`, an empty {@link String} ('') or whitespace.
   *
   * <pre>
   *    isBlank(null)       = true
   *    isBlank(undefined)  = true
   *    isBlank('')         = true
   *    isBlank('   ')      = true
   *    isBlank('  a ')     = false
   * </pre>
   *
   * @param sourceString
   *    {@link String} to verify
   *
   * @return `true` if `sourceString` is `undefined`, `null` or has no characters
   */
  static isBlank = (sourceString: NullableOrUndefined<string>): boolean =>
    ObjectUtil.isNullOrUndefined(sourceString) ||
      0 == sourceString!.trim().length;


  /**
   * Checks if the given `sourceString` is `null`, `undefined` or an empty {@link String} ('').
   *
   * <pre>
   *    isEmpty(null)       = true
   *    isEmpty(undefined)  = true
   *    isEmpty('')         = true
   *    isEmpty('   ')      = false
   *    isEmpty('  a ')     = false
   * </pre>
   *
   * @param sourceString
   *    {@link String} to verify
   *
   * @return `true` if `sourceString` is `undefined`, `null` or has no characters
   */
  static isEmpty = (sourceString: NullableOrUndefined<string>): boolean =>
    ObjectUtil.isNullOrUndefined(sourceString) ||
      0 == sourceString.length;


  /**
   *    Joins the elements of the provided `sourceArray` into a single {@link String} containing the provided elements
   * if the current one verifies `filterPredicate`. Uses the given {@link TFunction1} `toString` to know how to convert
   * every element into an {@link String}.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements will be converted to their equivalent {@link String}
   * representation and `null`/`undefined` elements will be managed as empty {@link String}. If {@code separator} is
   * `null` or `undefined` then empty {@link String} will be used.
   *
   * <pre>
   *    join(                                   Result:
   *       [1, 4, 77],                            '14477'
   *       (n: number) => '' + n
   *     )
   *     join(                                   Result:
   *       [1, 12, 33],                           '1;33'
   *       (n: number) => '' + n,
   *       (n: number) => 1 == n % 2,
   *       ';'
   *     )
   * </pre>
   *
   * @param sourceArray
   *    Array with elements to include in the returned {@link String}
   * @param toString
   *    {@link TFunction1} to convert every element into its {@link String} representation
   * @param filterPredicate
   *    {@link TPredicate1} to filter `sourceArray`
   * @param separator
   *    The separator character to use, `null` or `undefined` treated as empty {@link String}
   *
   * @return the joined {@link String}, empty one if `sourceArray` is `null`, `undefined` or has no elements
   *
   * @throws {@link IllegalArgumentError} if `toString` is `null` or `undefined` and `sourceArray` is not empty
   */
  static join<T>(sourceArray: NullableOrUndefined<T[]>,
                 toString: TFunction1<T, string>,
                 filterPredicate?: TPredicate1<T>,
                 separator?: string): string;


  static join<T>(sourceArray: NullableOrUndefined<T[]>,
                 toString: FFunction1<T, string>,
                 filterPredicate?: TPredicate1<T>,
                 separator?: string): string;


  static join<T>(sourceArray: NullableOrUndefined<T[]>,
                 toString: FFunction1<T, string>,
                 filterPredicate?: TPredicate1<T>,
                 separator?: string): string {
    if (ArrayUtil.isEmpty(sourceArray)) {
      return StringUtil.EMPTY_STRING;
    }
    const finalToString = Function1.of(toString);
    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
        ? Predicate1.alwaysTrue<T>()
        : Predicate1.of(filterPredicate);

    const finalSeparator = ObjectUtil.isNullOrUndefined(separator)
      ? StringUtil.EMPTY_STRING
      : separator;

    let result = '';
    for (let item of sourceArray!) {
      if (finalFilterPredicate.apply(item)) {
        result += (finalToString.apply(item) + finalSeparator);
      }
    }
    if (!this.isEmpty(result)) {
      return result.substring(0, result.length - finalSeparator.length);
    }
    return result;
  }


  /**
   * Left pad the {@link String} `sourceString` with `padString` up to the provided `size`.
   *
   * @apiNote
   *    If `size` is less than 0 then 0 will be used. If `padString` is `null`, `undefined` or empty then
   * {@link StringUtil#BLANK_SPACE} will be used.
   *
   * <pre>
   *    leftPad(null, -1, *)     = ''
   *    leftPad(null, 0, *)      = ''
   *    leftPad(null, 2, 'z')    = 'zz'
   *    leftPad('', 3, 'z')      = 'zzz'
   *    leftPad('bat', -1, 'z')  = 'bat'
   *    leftPad('bat', 1, 'z')   = 'bat'
   *    leftPad('bat', 3, 'z')   = 'bat'
   *    leftPad('bat', 5)        = '  bat'
   *    leftPad('bat', 5, '')    = '  bat'
   *    leftPad('bat', 5, 'z')   = 'zzbat'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to pad out
   * @param size
   *    The size to pad to
   * @param padString
   *    {@link String} to pad with, `null`, `undefined` or empty treated as {@link StringUtil#BLANK_SPACE}
   *
   * @return left padded {@link String} or `sourceString` if no padding is necessary
   */
  static leftPad = (sourceString: NullableOrUndefined<string>,
                    size: number,
                    padString: NullableOrUndefined<string> = StringUtil.BLANK_SPACE): string => {
    const finalSourceString = ObjectUtil.isNullOrUndefined(sourceString)
      ? StringUtil.EMPTY_STRING
      : sourceString;

    const finalSize = 0 > size
      ? 0
      : size;

    const finalPadString = this.isEmpty(padString)
      ? StringUtil.BLANK_SPACE
      : padString;

    return finalSourceString.padStart(
      finalSize,
      finalPadString!
    );
  }


  /**
   * Right pad the {@link String} `sourceString` with `padString` up to the provided `size`.
   *
   * @apiNote
   *    If `size` is less than 0 then 0 will be used. If `padString` is `null`, `undefined` or empty then
   * {@link StringUtil#BLANK_SPACE} will be used.
   *
   * <pre>
   *    rightPad(null, -1, *)     = ''
   *    rightPad(null, 0, *)      = ''
   *    rightPad(null, 2, 'z')    = 'zz'
   *    rightPad('', 3, 'z')      = 'zzz'
   *    rightPad('bat', -1, 'z')  = 'bat'
   *    rightPad('bat', 1, 'z')   = 'bat'
   *    rightPad('bat', 3, 'z')   = 'bat'
   *    rightPad('bat', 5)        = 'bat  '
   *    rightPad('bat', 5, '')    = 'bat  '
   *    rightPad('bat', 5, 'z')   = 'batzz'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to pad out
   * @param size
   *    The size to pad to
   * @param padString
   *    {@link String} to pad with, `null`, `undefined` or empty treated as {@link StringUtil#BLANK_SPACE}
   *
   * @return right padded {@link String} or `sourceString` if no padding is necessary
   */
  static rightPad = (sourceString: NullableOrUndefined<string>,
                     size: number,
                     padString: NullableOrUndefined<string> = StringUtil.BLANK_SPACE): string => {
    const finalSourceString = ObjectUtil.isNullOrUndefined(sourceString)
      ? StringUtil.EMPTY_STRING
      : sourceString;

    const finalSize = 0 > size
      ? 0
      : size;

    const finalPadString = this.isEmpty(padString)
      ? StringUtil.BLANK_SPACE
      : padString;

    return finalSourceString.padEnd(
      finalSize,
      finalPadString!
    );
  }


  /**
   *    Loops through the provided {@link String} one position every time, returning an array with {@link String} with
   * length equals to `size`.
   *
   * @apiNote
   *    If `size` is `null`, `undefined` or lower than one then an array with one element containing `sourceString` is returned.
   *
   * <pre>
   *    sliding(                       Result:
   *      '12',                         ['12']
   *      5
   *    )
   *    sliding(                       Result:
   *      '789',                        ['78', '89']
   *      2
   *    )
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


  /**
   *    Returns an array splitting the given `sourceString` in different parts, using provided `separators` to know how
   * to do it, iterating over each one every time.
   *
   * <pre>
   *    splitMultilevel(               Result:
   *      'AB,C',                       ['AB', 'C']
   *      ','
   *    )
   *    splitMultilevel(               Result:
   *      'A,B#D,E,B',                  ['A', 'B', 'D', 'E', 'B']
   *      '#',
   *      ','
   *    )
   * </pre>
   *
   * @param sourceString
   *    Source {@link String} with the values to extract
   * @param separators
   *    Array used to know how the values are divided inside `sourceString`
   *
   * @return array of {@link String}
   */
  static splitMultilevel = (sourceString: NullableOrUndefined<string>,
                            ...separators: NullableOrUndefined<string>[]): string[] => {
    if (this.isEmpty(sourceString)) {
      return [];
    }
    const finalSeparators = ArrayUtil.filter(
      separators,
      s => ObjectUtil.nonNullOrUndefined(s)
    );
    if (ArrayUtil.isEmpty(finalSeparators)) {
      return [sourceString!]
    }
    let currentSplitValues = [sourceString!];
    for (let i = 0; i < separators!.length; i++) {
      currentSplitValues = currentSplitValues.flatMap(
        elto => elto.split(separators[i]!)
      );
    }
    return currentSplitValues;
  }

}
