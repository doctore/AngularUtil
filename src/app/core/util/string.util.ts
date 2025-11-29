import { ArrayUtil, AssertUtil, MapUtil, ObjectUtil } from '@app-core/util';
import { NullableOrUndefined } from '@app-core/types';
import {
  FFunction1,
  FFunction2,
  Function1,
  Function2,
  PartialFunction,
  TFunction1,
  TFunction2
} from '@app-core/types/function';
import { Optional } from '@app-core/types/functional';
import { Predicate1, TPredicate1 } from '@app-core/types/predicate';
import { TUnaryOperator } from '@app-core/types/function/operator';

/**
 * Helper functions to manage strings.
 */
export class StringUtil {

  static BLANK_SPACE: string = ' ';

  static DEFAULT_ABBREVIATION_STRING: string = '...';

  static EMPTY_STRING: string = '';

  static INDEX_NOT_FOUND: number = -1;


  constructor() {
    throw new SyntaxError('StringUtil is an utility class');
  }


  /**
   * Abbreviates the given `sourceString` using provided `abbreviationString` as replacement marker.
   * <p>
   *    The following use cases will not return the expected replaced {@link String}:</p>
   *    <ul>
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} is returned</li>
   *      <li>If `maxLength` is less than or equal to 0 then empty {@link String} is returned</li>
   *      <li>If `maxLength` is greater than or equal to `sourceString`'s length then `sourceString` is returned</li>
   *    </ul>
   * <p>
   *    If `sourceString` is less than the first character of `sourceString` and `abbreviationString`'s length,
   * then an {IllegalArgumentError} will be thrown.
   *
   * @apiNote
   *    If `abbreviationString` is `null` or `undefined` then {@link StringUtil#DEFAULT_ABBREVIATION_STRING} will be used.
   * If `maxLength` is less than 0 then 0 will be used.
   * <p>
   * Examples:
   * <pre>
   *    abbreviate(null, *, *)           = ''
   *    abbreviate(undefined, *, *)      = ''
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
   * @throws {IllegalArgumentError} if `maxLength` is less than the first character of `sourceString`
   *                                      and `abbreviationString`'s length
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
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} is returned</li>
   *      <li>If `maxLength` is less than or equal to 0 then empty {@link String} is returned</li>
   *      <li>If `maxLength` is greater than or equal to `sourceString`'s length then `sourceString` is returned</li>
   *    </ul>
   * <p>
   *    If `maxLength` is less than the first and last characters of `sourceString` and `abbreviationString`'s length,
   * then an {IllegalArgumentError} will be thrown.
   *
   * @apiNote
   *    If `abbreviationString` is `null` or `undefined` then {@link StringUtil#DEFAULT_ABBREVIATION_STRING} will be used.
   * If `maxLength` is less than 0 then 0 will be used.
   * <p>
   * Examples:
   * <pre>
   *    abbreviateMiddle(null, *, *)           = ''
   *    abbreviateMiddle(undefined, *, *)      = ''
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
   * @throws {IllegalArgumentError} if `maxLength` is less than the first and last characters of `sourceString` and
   *                                      `abbreviationString`'s length
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
    const startOffset = Math.floor(
      (sizeOfDisplayedSourceString / 2) + (sizeOfDisplayedSourceString % 2)
    );
    const endOffset = Math.ceil(
      sourceString!.length - (sizeOfDisplayedSourceString / 2)
    );
    return sourceString!.substring(0, startOffset)
      + finalAbbreviationString
      + sourceString!.substring(endOffset);
  }


  /**
   * Returns a {@link String} after applying to `sourceString`:
   * <p>
   *  - Filter its characters using {@link PartialFunction#isDefinedAt} of `partialFunction`
   *  - Transform its filtered characters using {@link PartialFunction#apply} of `partialFunction`
   *
   * @apiNote
   *    If `sourceString` is `null`, `undefined` or empty then {@link StringUtil#EMPTY_STRING} is returned.
   *
   * <pre>
   *    collect(                                                     Result:
   *      'abcDEfgIoU12',                                             'a2E2I2o2U2'
   *      PartialFunction.of(
   *        (s: string) => -1 != 'aeiouAEIOU'.indexOf(s),
   *        (s: string) => s + '2'
   *      )
   *    )
   * </pre>
   *
   * @param sourceString
   *    {@link String} with the characters to filter and transform
   * @param partialFunction
   *    {@link PartialFunction} to filter and transform characters of `sourceString`
   *
   * @return new {@link String} from applying the given {@link PartialFunction} to each character of `sourceString`
   *         on which it is defined and collecting the results
   *
   * @throws IllegalArgumentException if `partialFunction` is `null` or `undefined` with a not empty `sourceString`
   */
  static collect(sourceString: NullableOrUndefined<string>,
                 partialFunction: PartialFunction<string, string>): string;


  /**
   * Returns a {@link String} after applying to `sourceString`:
   * <p>
   *  - Filter its characters using the {@link TPredicate1} `filterPredicate`
   *  - Transform its filtered characters using the {@link TFunction1} `mapFunction`
   *
   * @apiNote
   *    If `sourceString` is `null`, `undefined` or empty then {@link StringUtil#EMPTY_STRING} is returned. If `filterPredicate`
   * is `null` or `undefined` then all characters will be transformed.
   *
   * <pre>
   *    collect(                                                     Result:
   *      'abcDEfgIoU12',                                             'a2E2I2o2U2'
   *      (s: string) => -1 != 'aeiouAEIOU'.indexOf(s),
   *      (s: string) => s + '2'
   *    )
   * </pre>
   *
   * @param sourceString
   *    {@link String} with the characters to filter and transform
   * @param mapFunction
   *    {@link TUnaryOperator} to transform filtered characters of the source `sourceString`
   * @param filterPredicate
   *    {@link TPredicate1} to filter characters from `sourceString`
   *
   * @return new {@link String} from applying the given {@link TUnaryOperator} to each character of `sourceString`
   *         on which {@link TPredicate1} returns `true` and collecting the results
   *
   * @throws {IllegalArgumentError} if `mapFunction` is `null` or `undefined` with a not empty `sourceString`
   */
  static collect(sourceString: NullableOrUndefined<string>,
                 mapFunction: TUnaryOperator<string>,
                 filterPredicate: TPredicate1<string>): string;


  static collect(sourceString: NullableOrUndefined<string>,
                 partialFunctionOrMapFunction: PartialFunction<string, string> | TUnaryOperator<string>,
                 filterPredicate?: TPredicate1<string>): string {
    let result: string = '';
    if (!this.isEmpty(sourceString)) {
      AssertUtil.notNullOrUndefined(
          partialFunctionOrMapFunction,
          'partialFunctionOrMapFunction must be not null and not undefined'
      );
      const finalPartialFunction = PartialFunction.isPartialFunction(partialFunctionOrMapFunction)
          ? <PartialFunction<string, string>>partialFunctionOrMapFunction
          : PartialFunction.of(
              filterPredicate,
              <TFunction1<string, string>>partialFunctionOrMapFunction
            );
      for (let i = 0; i < sourceString!.length; i++) {
        const currentChar = sourceString![i];
        if (finalPartialFunction.isDefinedAt(currentChar)) {
          result += finalPartialFunction.apply(currentChar);
        }
      }
    }
    return result;
  }


  /**
   * Verifies if the given `sourceString` contains `stringToSearch` ignoring case.
   *
   * @apiNote
   *    If `sourceString` or `stringToSearch` are `null` or `undefined` then `false` is returned.
   * <p>
   * Examples:
   * <pre>
   *    containsIgnoreCase(null, *)       = false   // Same result with undefined
   *    containsIgnoreCase(*, null)       = false   // Same result with undefined
   *    containsIgnoreCase('', 'a')       = false
   *    containsIgnoreCase('abc', 'ac')   = false
   *    containsIgnoreCase('', '')        = true
   *    containsIgnoreCase('a', '')       = true
   *    containsIgnoreCase('ABcD', 'bC')  = true
   * </pre>
   *
   * @param sourceString
   *    {@link String} to check if contains `stringToSearch`
   * @param stringToSearch
   *    {@link String} to search
   *
   * @return `true` if `sourceString` contains `stringToSearch`, `false` otherwise.
   */
  static containsIgnoreCase = (sourceString: NullableOrUndefined<string>,
                               stringToSearch: NullableOrUndefined<string>): boolean => {
    if (ObjectUtil.isNullOrUndefined(sourceString) ||
        ObjectUtil.isNullOrUndefined(stringToSearch)) {
      return false;
    }
    return StringUtil.INDEX_NOT_FOUND !=
             sourceString.toLowerCase().indexOf(
               stringToSearch.toLowerCase()
             );
  }


  /**
   * Counts how many times `stringToSearch` appears in the given `sourceString`.
   *
   * @apiNote
   *    If `sourceString` or `stringToSearch` are `null`, `undefined` or empty then 0 is returned. Only counts
   * non-overlapping matches.
   * <p>
   * Examples:
   * <pre>
   *    count(null, *)        = 0   // Same result with undefined
   *    count(*, null)        = 0   // Same result with undefined
   *    count('', *)          = 0
   *    count('abcab', 'ab')  = 2
   *    count('abcab', 'xx')  = 0
   *    count('aaaaa', 'aa')  = 2
   * </pre>
   *
   * @param sourceString
   *    {@link String} to check
   * @param stringToSearch
   *    {@link String} to count
   *
   * @return the number of occurrences, 0 if `stringToSearch` or `sourceString` are `null`, `undefined` or empty
   */
  static count = (sourceString: NullableOrUndefined<string>,
                  stringToSearch: NullableOrUndefined<string>): number => {
    if (this.isEmpty(sourceString) ||
        this.isEmpty(stringToSearch)) {
      return 0;
    }
    let count = 0;
    let idx = 0;
    while ((idx = sourceString!.indexOf(stringToSearch!, idx)) != StringUtil.INDEX_NOT_FOUND) {
      count++;
      idx += stringToSearch!.length;
    }
    return count;
  }


  /**
   *    Returns a {@link String} removing the longest prefix of characters included in `sourceString` that satisfy the
   * {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `sourceString` is `null`, `undefined` or empty then {@link StringUtil#EMPTY_STRING} is returned. If `filterPredicate`
   * is `null` or `undefined` then `sourceString` is returned.
   *
   * <pre>
   *    dropWhile(                                                   Result:
   *      'aEibc12',                                                  'bc12'
   *      (s: string) => -1 != 'aeiouAEIOU'.indexOf(s)
   *    )
   * </pre>
   *
   * @param sourceString
   *    {@link String} with the characters to filter
   * @param filterPredicate
   *    {@link TPredicate1} to filter characters from `sourceString`
   *
   * @return the longest suffix of provided `sourceString` whose first character does not satisfy `filterPredicate`
   */
  static dropWhile = (sourceString: NullableOrUndefined<string>,
                      filterPredicate: NullableOrUndefined<TPredicate1<string>>): string => {
    if (this.isEmpty(sourceString)) {
      return StringUtil.EMPTY_STRING;
    }
    if (ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return sourceString!;
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate!);
    let wasFoundFirstElementDoesMatchPredicate = false;
    for (let i = 0; i < sourceString!.length; i++) {
      const currentChar = sourceString![i];
      if (!finalFilterPredicate.apply(currentChar) &&
          !wasFoundFirstElementDoesMatchPredicate) {
        wasFoundFirstElementDoesMatchPredicate = true;
      }
      if (wasFoundFirstElementDoesMatchPredicate) {
        return sourceString!.slice(i);
      }
    }
    return '';
  }


  /**
   * Selects all characters of `sourceString` which satisfy the {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then `sourceString` will be returned.
   *
   * <pre>
   *    filter(                                                      Result:
   *      'abcDEfgIoU12',                                             'aEIoU'
   *      (s: string) => -1 != 'aeiouAEIOU'.indexOf(s)
   *    )
   * </pre>
   *
   * @param sourceString
   *    {@link String} to filter
   * @param filterPredicate
   *    {@link TPredicate1} to filter characters from `sourceString`
   *
   * @return characters of `sourceString` which satisfy `filterPredicate`
   */
  static filter = (sourceString: NullableOrUndefined<string>,
                   filterPredicate: NullableOrUndefined<TPredicate1<string>>): string => {
    if (this.isEmpty(sourceString)) {
      return StringUtil.EMPTY_STRING;
    }
    if (ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return sourceString!;
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate);
    let result = '';
    for (let i = 0; i < sourceString!.length; i++) {
      const currentChar = sourceString![i];
      if (finalFilterPredicate.apply(currentChar)) {
        result += currentChar;
      }
    }
    return result;
  }


  /**
   * Selects all characters of `sourceString` which do not satisfy the {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then `sourceString` will be returned.
   *
   * <pre>
   *    filterNot(                                         Result:
   *      'abcDEfgIoU12',                                   'bcDfg12'
   *      (s: string) => -1 != 'aeiouAEIOU'.indexOf(s)
   *    )
   * </pre>
   *
   * @param sourceString
   *    {@link String} to filter
   * @param filterPredicate
   *    {@link TPredicate1} to filter characters from `sourceString`
   *
   * @return characters of `sourceString` which do not satisfy `filterPredicate`
   */
  static filterNot = (sourceString: NullableOrUndefined<string>,
                      filterPredicate: NullableOrUndefined<TPredicate1<string>>): string => {
    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
      ? null
      : Predicate1.of(filterPredicate).not();

    return this.filter(
      sourceString,
      finalFilterPredicate
    );
  }


  /**
   *    Using the given value `initialValue` as initial one, applies the provided {@link TFunction2} to all
   * characters of `sourceString`, going left to right.
   *
   * @apiNote
   *    If `sourceString` or `accumulator` are `null` or `undefined` then `initialValue` is returned.
   *
   * <pre>
   *    foldLeft(                                                    Result:
   *      'ab12',                                                     295
   *      1,
   *      (r: number, s: string) => r + s.charCodeAt(0)
   *    )
   * </pre>
   *
   * @param sourceString
   *    {@link String} with characters to combine
   * @param initialValue
   *    The initial value to start with
   * @param accumulator
   *    A {@link TFunction2} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive characters of `sourceString`, going
   *         left to right with the start value `initialValue` on the left.
   */
  static foldLeft<R>(sourceString: NullableOrUndefined<string>,
                     initialValue: R,
                     accumulator: NullableOrUndefined<TFunction2<R, string, R>>): R;


  static foldLeft<R>(sourceString: NullableOrUndefined<string>,
                     initialValue: R,
                     accumulator: NullableOrUndefined<FFunction2<R, string, R>>): R;


  static foldLeft<R>(sourceString: NullableOrUndefined<string>,
                     initialValue: R,
                     accumulator: NullableOrUndefined<TFunction2<R, string, R>>): R {
    if (this.isEmpty(sourceString) ||
        ObjectUtil.isNullOrUndefined(accumulator)) {
      return initialValue
    }
    const finalAccumulator = Function2.of(accumulator);
    let result: R = initialValue;
    for (let i = 0; i < sourceString!.length; i++) {
      result = finalAccumulator.apply(
          result,
          sourceString![i]
      );
    }
    return result;
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
   * Return the given `sourceString` if is not `null`, `undefined` or empty. Otherwise, returns `defaultValue`.
   *
   * <pre>
   *    getNotEmptyOrElse(null, 'other')       = 'other'
   *    getNotEmptyOrElse(undefined, 'other')  = 'other'
   *    getNotEmptyOrElse('', 'other')         = 'other'
   *    getNotEmptyOrElse('', '')              = ''
   *    getNotEmptyOrElse('  ', 'other')       = '  '
   *    getNotEmptyOrElse('abc', 'other')      = 'abc'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to check
   * @param defaultValue
   *    Alternative value to return
   *
   * @return `sourceString` if contains characters, `defaultValue` otherwise
   */
  static getNotEmptyOrElse = (sourceString: NullableOrUndefined<string>,
                              defaultValue: string): string =>
      Optional.ofNullable<string>(sourceString)
        .filter(s => !this.isEmpty(s))
        .getOrElse(defaultValue);


  /**
   * Partitions given `sourceString` into a {@link Map} of {@link String} according to `discriminatorKey`.
   *
   * @apiNote
   *    If `filterPredicate` is `null` or `undefined` then all elements will be used.
   *
   * <pre>
   *    groupBy(                                                  Result:
   *      'essae',                                                 [('e', 'ee')
   *      Function1.identity()                                      ('s', 'ss')
   *    )                                                           ('a', 'a')]
   *
   *    groupBy(                                                  Result:
   *      'essae',                                                 [('e', 'ee')
   *      Function1.identity(),                                     ('a', 'a')]
   *      (s: string) => -1 != 'aeiouAEIOU'.indexOf(s)
   *    )
   *    groupBy(                                                  Result:
   *      'essae',                                                 [(1, 'a')
   *      (s: string) => StringUtil.count('essae', s),              (2, 'ee')]
   *      (s: string) => -1 != 'aeiouAEIOU'.indexOf(s)
   *    )
   * </pre>
   *
   * @param sourceString
   *    {@link String} with the elements to filter and group
   * @param discriminatorKey
   *    The discriminator {@link TFunction1} to get the key values of returned {@link Map}
   * @param filterPredicate
   *    {@link TPredicate1} to filter characters of `sourceString`
   *
   * @return new {@link Map} from applying the given `discriminatorKey` to each character of `sourceString`
   *
   * @throws {IllegalArgumentError} if `discriminatorKey` is `null` or `undefined` with a not empty `sourceString`
   */
  static groupBy = <K>(sourceString: NullableOrUndefined<string>,
                       discriminatorKey: TFunction1<string, K>,
                       filterPredicate: NullableOrUndefined<TPredicate1<string>> = Predicate1.alwaysTrue<string>()): Map<K, string> => {
    const result = new Map<K, string>;
    if (!this.isEmpty(sourceString)) {
      AssertUtil.notNullOrUndefined(
        discriminatorKey,
        'discriminatorKey must be not null and not undefined'
      );
      const finalDiscriminatorKey = Function1.of(discriminatorKey);
      const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
        ? Predicate1.alwaysTrue<string>()
        : Predicate1.of(filterPredicate);

      for (let i = 0; i < sourceString!.length; i++) {
        const currentChar = sourceString![i];
        const discriminatorKeyResult = finalDiscriminatorKey.apply(currentChar);
        if (finalFilterPredicate.apply(currentChar)) {
          MapUtil.setIfAbsent(
            result,
            discriminatorKeyResult,
            ''
          );
          const currentValue = result.get(discriminatorKeyResult);
          result.set(
              discriminatorKeyResult,
              currentValue + currentChar
          );
        }
      }
    }
    return result;
  }


  /**
   *    Abbreviates the given `sourceString` to the length passed, replacing the middle characters with the supplied
   * `abbreviationString`.
   * <p>
   * The following use cases will not return the expected replaced {@link String}:
   *    <ul>
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} is returned</li>
   *      <li>If `maxLength` is less than or equal to 0 then empty {@link String} is returned</li>
   *    </ul>
   * <p>
   *    If `maxLength` is less than the first and last characters of `sourceString` and `abbreviationString`'s length,
   * then an {IllegalArgumentError} will be thrown.
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
   *    hideMiddle(undefined, *, *)      = ''
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
   * @throws {IllegalArgumentError} if `maxLength` is less than the first and last characters of `sourceString` and
   *                                      `abbreviationString`'s length
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

    const startOffset = Math.floor(
      (sizeOfDisplayedSourceString / 2) + (sizeOfDisplayedSourceString % 2)
    );
    const endOffset = Math.ceil(
      sourceString!.length - (sizeOfDisplayedSourceString / 2)
    );
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
   * <pre>
   *    join(                                   Result:
   *      [1, 4, 77],                            '14477'
   *      (n: number) => '' + n
   *    )
   *    join(                                   Result:
   *      [1, 12, 33],                           '1;33'
   *      (n: number) => '' + n,
   *      (n: number) => 1 == n % 2,
   *      ';'
   *    )
   * </pre>
   *
   * @param sourceArray
   *    Array with elements to include in the returned {@link String}
   * @param toString
   *    {@link TFunction1} to convert every element into its {@link String} representation
   * @param filterPredicate
   *    {@link TPredicate1} to filter `sourceArray`. If it is `null` or `undefined` then all elements will be converted
   * @param separator
   *    The separator character to use. If it is `null` or `undefined` then empty {@link String} will be used
   *
   * @return the joined {@link String}, empty one if `sourceArray` is `null`, `undefined` or has no elements
   *
   * @throws {IllegalArgumentError} if `toString` is `null` or `undefined` and `sourceArray` is not empty
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
                 toString: TFunction1<T, string>,
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
      return result.substring(
        0,
        result.length - finalSeparator.length
      );
    }
    return result;
  }


  /**
   *    Joins the {@link String}s of the provided `sourceArray` into a single {@link String} containing the provided
   * elements if the current one verifies `filterPredicate`.
   *
   * <pre>
   *    joinString(                             Result:
   *      ['1', '4', '77']                       '14477'
   *    )
   *    joinString(                             Result:
   *      ['1', '12', '33'],                     '1;12'
   *      (s: string) => s.startsWith('1')
   *      ';'
   *    )
   * </pre>
   *
   * @param sourceArray
   *    Array with {@link String}s to include in the returned one
   * @param filterPredicate
   *    {@link TPredicate1} to filter `sourceArray`. If it is `null` or `undefined` then all elements will be converted
   * @param separator
   *    The separator character to use. If it is `null` or `undefined` then empty {@link String} will be used.
   *
   * @return the joined {@link String}, empty one if `sourceArray` is `null`, `undefined` or has no elements
   */
  static joinString = (sourceArray: NullableOrUndefined<NullableOrUndefined<string>[]>,
                       filterPredicate?: TPredicate1<NullableOrUndefined<string>>,
                       separator?: string): string => {
    if (ArrayUtil.isEmpty(sourceArray)) {
      return StringUtil.EMPTY_STRING;
    }
    const finalFilterPredicate = ObjectUtil.isNullOrUndefined(filterPredicate)
      ? Predicate1.alwaysTrue<NullableOrUndefined<string>>()
      : Predicate1.of(filterPredicate);

    const finalSeparator = ObjectUtil.isNullOrUndefined(separator)
      ? StringUtil.EMPTY_STRING
      : separator;

    let result = '';
    for (let item of sourceArray!) {
      if (finalFilterPredicate.apply(item)) {
        result += (item + finalSeparator);
      }
    }
    if (!this.isEmpty(result)) {
      return result.substring(
        0,
        result.length - finalSeparator.length
      );
    }
    return result;
  }


  /**
   * Left pad the {@link String} `sourceString` with `padString` up to the provided `size`.
   *
   * @apiNote
   *    If `size` is less than 0 then 0 will be used. If `padString` is `null`, `undefined` or empty then
   * {@link StringUtil#BLANK_SPACE} will be used.
   * <p>
   * Examples:
   * <pre>
   *    leftPad(null, -1, *)     = ''       // Same result with undefined
   *    leftPad(null, 0, *)      = ''       // Same result with undefined
   *    leftPad(null, 2, 'z')    = 'zz'     // Same result with undefined
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
   * Builds a new {@link String} by applying a {@link UnaryOperator} to all characters of provided `sourceString`.
   *
   * @apiNote
   *    If `sourceString` is `null`, `undefined` or empty then {@link StringUtil#EMPTY_STRING} is returned. If `mapFunction`
   * is `null` or `undefined` then `sourceString` is returned.
   *
   * <pre>
   *    map(                                                                   Result:
   *      'aEibc1U2'                                                            'bc12'
   *      (s: string) => -1 != 'aeiouAEIOU'.indexOf(s) ? '' : s
   *    )
   * </pre>
   *
   * @param sourceString
   *    {@link String} to used as source of the returned {@link String}
   * @param mapFunction
   *    {@link UnaryOperator} to apply to each character
   *
   * @return new {@link String} from applying the given {@link UnaryOperator} to each character of `sourceString`
   */
  static map = (sourceString: NullableOrUndefined<string>,
                mapFunction: TUnaryOperator<string>): string => {
    if (this.isEmpty(sourceString)) {
      return StringUtil.EMPTY_STRING;
    }
    if (ObjectUtil.isNullOrUndefined(mapFunction)) {
      return sourceString!;
    }
    const finalMapFunction = Function1.of(mapFunction);
    let result = '';
    for (let i = 0; i < sourceString!.length; i++) {
      result += finalMapFunction.apply(
          sourceString![i]
      );
    }
    return result;
  }


  /**
   * Right pad the {@link String} `sourceString` with `padString` up to the provided `size`.
   *
   * @apiNote
   *    If `size` is less than 0 then 0 will be used. If `padString` is `null`, `undefined` or empty then
   * {@link StringUtil#BLANK_SPACE} will be used.
   * <p>
   * Examples:
   * <pre>
   *    rightPad(null, -1, *)     = ''      // Same result with undefined
   *    rightPad(null, 0, *)      = ''      // Same result with undefined
   *    rightPad(null, 2, 'z')    = 'zz'    // Same result with undefined
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


  /**
   * Returns the substring of `sourceString` after first occurrence of a `separator`. `separator` is not returned.
   * <p>
   *    The following are special use cases:</p>
   *    <ul>
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} is returned</li>
   *      <li>If `separator` is `null` or `undefined` then empty {@link String} is returned</li>
   *      <li>If `separator` is empty then `sourceString` is returned</li>
   *      <li>If nothing is found, empty {@link String} is returned</li>
   *    </ul>
   * <p>
   * Examples:
   * <pre>
   *    substringAfter(null, *)       = ''
   *    substringAfter(undefined, *)  = ''
   *    substringAfter('', *)         = ''
   *    substringAfter(*, null)       = ''
   *    substringAfter(*, undefined)  = ''
   *    substringAfter('abc', '')     = 'abc'
   *    substringAfter('abc', 'z')    = ''
   *    substringAfter('abc', 'a')    = 'bd'
   *    substringAfter('abc', 'c')    = ''
   *    substringAfter('abcb', 'b')   = 'cb'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to get a substring from
   * @param separator
   *     {@link String} to search for
   *
   * @return the substring after the first occurrence of the `separator`,
   *         empty {@link String} if `sourceString` is `null`, `undefined` or empty
   */
  static substringAfter = (sourceString: NullableOrUndefined<string>,
                           separator: NullableOrUndefined<string>): string => {
    if (this.isEmpty(sourceString) ||
        ObjectUtil.isNullOrUndefined(separator)) {
      return StringUtil.EMPTY_STRING;
    }
    const pos = sourceString!.indexOf(separator);
    return StringUtil.INDEX_NOT_FOUND == pos
      ? StringUtil.EMPTY_STRING
      : sourceString!.substring(pos + separator!.length);
  }


  /**
   * Returns the substring of `sourceString` after the last occurrence of a `separator`. `separator` is not returned.
   * <p>
   *    The following are special use cases:</p>
   *    <ul>
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} is returned</li>
   *      <li>If `separator` is `null`, `undefined` or empty then empty {@link String} is returned</li>
   *      <li>If nothing is found, empty {@link String} is returned</li>
   *    </ul>
   * <p>
   * Examples:
   * <pre>
   *    substringAfterLast(null, *)        = ''
   *    substringAfterLast(undefined, *)   = ''
   *    substringAfterLast('', *)          = ''
   *    substringAfterLast(*, null)        = ''
   *    substringAfterLast(*, undefined)   = ''
   *    substringAfterLast(*, '')          = ''
   *    substringAfterLast('abc', 'z')     = ''
   *    substringAfterLast('abc', 'a')     = 'bd'
   *    substringAfterLast('abc', 'c')     = ''
   *    substringAfterLast('abcba', 'b')   = 'a'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to get a substring from
   * @param separator
   *     {@link String} to search for
   *
   * @return the substring after the last occurrence of the `separator`,
   *         empty {@link String} if `sourceString` is `null`, `undefined` or empty
   */
  static substringAfterLast = (sourceString: NullableOrUndefined<string>,
                               separator: NullableOrUndefined<string>): string => {
    if (this.isEmpty(sourceString) ||
        this.isEmpty(separator)) {
      return StringUtil.EMPTY_STRING;
    }
    const pos = sourceString!.lastIndexOf(separator!);
    if (pos == StringUtil.INDEX_NOT_FOUND ||
        pos == sourceString!.length - separator!.length) {
      return StringUtil.EMPTY_STRING;
    }
    return sourceString!.substring(pos + separator!.length);
  }


  /**
   * Returns the substring of `sourceString` before the first occurrence of a `separator`. `separator` is not returned.
   * <p>
   *    The following are special use cases:</p>
   *    <ul>
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} is returned</li>
   *      <li>If `separator` is `null`, `undefined` or empty then `sourceString` is returned</li>
   *      <li>If nothing is found, `sourceString` is returned</li>
   *    </ul>
   * <p>
   * Examples:
   * <pre>
   *    substringBefore(null, *)           = ''
   *    substringBefore(undefined, *)      = ''
   *    substringBefore('', *)             = ''
   *    substringBefore('abc', null)       = 'abc'
   *    substringBefore('abc', undefined)  = 'abc'
   *    substringBefore('abc', '')         = 'abc'
   *    substringBefore('a', 'a')          = ''
   *    substringBefore('a', 'z')          = 'a'
   *    substringBefore('abc', 'c')        = 'ab'
   *    substringBefore('abcb', 'b')       = 'a'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to get a substring from
   * @param separator
   *     {@link String} to search for
   *
   * @return the substring before the first occurrence of the `separator`,
   *         empty {@link String} if `sourceString` is `null`, `undefined` or empty
   */
  static substringBefore = (sourceString: NullableOrUndefined<string>,
                            separator: NullableOrUndefined<string>): string =>
    Optional.ofNullable<string>(sourceString)
      .map<string>(source => {
        if (this.isEmpty(separator)) {
          return source;
        }
        const pos = source.indexOf(separator!);
        return StringUtil.INDEX_NOT_FOUND == pos
          ? source
          : source.substring(0, pos);
      })
      .getOrElse(StringUtil.EMPTY_STRING);


  /**
   * Returns the substring of `sourceString` before the last occurrence of a `separator`. `separator` is not returned.
   * <p>
   *    The following are special use cases:</p>
   *    <ul>
   *      <li>If `sourceString` is `null`, `undefined` or empty then empty {@link String} is returned</li>
   *      <li>If `separator` is `null`, `undefined` or empty then `sourceString` is returned</li>
   *      <li>If nothing is found, `sourceString` is returned.</li>
   *    </ul>
   * <p>
   * Examples:
   * <pre>
   *    substringBeforeLast(null, *)           = ''
   *    substringBeforeLast(undefined, *)      = ''
   *    substringBeforeLast('', *)             = ''
   *    substringBeforeLast('abc', null)       = 'abc'
   *    substringBeforeLast('abc', undefined)  = 'abc'
   *    substringBeforeLast('abc', '')         = 'abc'
   *    substringBeforeLast('a', 'a')          = ''
   *    substringBeforeLast('a', 'z')          = 'a'
   *    substringBeforeLast('abc', 'c')        = 'ab'
   *    substringBeforeLast('abcb', 'b')       = 'abc'
   * </pre>
   *
   * @param sourceString
   *    {@link String} to get a substring from
   * @param separator
   *     {@link String} to search for
   *
   * @return the substring before the last occurrence of the `separator`,
   *         empty {@link String} if `sourceString` is `null`, `undefined` or empty
   */
  static substringBeforeLast = (sourceString: NullableOrUndefined<string>,
                                separator: NullableOrUndefined<string>): string =>
    Optional.ofNullable<string>(sourceString)
      .map<string>(source => {
        if (this.isEmpty(separator)) {
          return source;
        }
        const pos = source.lastIndexOf(separator!);
        return StringUtil.INDEX_NOT_FOUND == pos
          ? source
          : source.substring(0, pos);
      })
      .getOrElse(StringUtil.EMPTY_STRING);


  /**
   *    Returns a {@link String} with the longest prefix of characters included in `sourceString` that  satisfy the
   * {@link TPredicate1} `filterPredicate`.
   *
   * @apiNote
   *    If `sourceString` is `null`, `undefined` or empty then {@link StringUtil#EMPTY_STRING} is returned. If `filterPredicate`
   * is `null` or `undefined` then `sourceString` is returned.
   *
   * <pre>
   *    takeWhile(                                                   Result:
   *      'aEibc12',                                                  'aEi'
   *      (s: string) => -1 != 'aeiouAEIOU'.indexOf(s)
   *    )
   * </pre>
   *
   * @param sourceString
   *    {@link String} with the characters to filter
   * @param filterPredicate
   *    {@link TPredicate1} to filter characters from `sourceString`
   *
   * @return the longest prefix of provided `sourceString` whose characters all satisfy `filterPredicate`
   */
  static takeWhile = (sourceString: NullableOrUndefined<string>,
                      filterPredicate: NullableOrUndefined<TPredicate1<string>>): string => {
    if (this.isEmpty(sourceString)) {
      return StringUtil.EMPTY_STRING;
    }
    if (ObjectUtil.isNullOrUndefined(filterPredicate)) {
      return sourceString!;
    }
    const finalFilterPredicate = Predicate1.of(filterPredicate!);
    let result: string = '';
    for (let i = 0; i < sourceString!.length; i++) {
      const currentChar = sourceString![i];
      if (finalFilterPredicate.apply(currentChar)) {
        result += currentChar;
      } else {
        return result;
      }
    }
    return result;
  }

}
