import { ObjectUtil, StringUtil } from '@app-core/util';
import { IllegalArgumentError } from '@app-core/errors';
import { FFunction1, FFunction2, PartialFunction } from '@app-core/types/function';
import { NullableOrUndefined } from '@app-core/types';
import { FPredicate1 } from '@app-core/types/predicate';
import { FUnaryOperator } from '@app-core/types/function/operator';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/string.util.spec.ts
 */
describe('StringUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new StringUtil()).toThrowError(SyntaxError);
    });

  });



  describe('abbreviate', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.abbreviate(null, 0, null)).toEqual('');
      expect(StringUtil.abbreviate(null, 5, '...')).toEqual('');
      expect(StringUtil.abbreviate(undefined, 0)).toEqual('');
      expect(StringUtil.abbreviate(undefined, 0, undefined)).toEqual('');
      expect(StringUtil.abbreviate(undefined, 2, '.')).toEqual('');
      expect(StringUtil.abbreviate('', 1, '-')).toEqual('');
    });


    it('when given abbreviationString is null or undefined then StringUtil.DEFAULT_ABBREVIATION_STRING is used', () => {
      expect(StringUtil.abbreviate('abc', 0)).toEqual('');
      expect(StringUtil.abbreviate('abc', 0, null)).toEqual('');
      expect(StringUtil.abbreviate('abc', 0, undefined)).toEqual('');

      expect(StringUtil.abbreviate('abc', -1)).toEqual('');
      expect(StringUtil.abbreviate('abc', -1, null)).toEqual('');
      expect(StringUtil.abbreviate('abc', -1, undefined)).toEqual('');

      expect(StringUtil.abbreviate('abc', 3)).toEqual('abc');
      expect(StringUtil.abbreviate('abc', 3, null)).toEqual('abc');
      expect(StringUtil.abbreviate('abc', 3, undefined)).toEqual('abc');

      expect(StringUtil.abbreviate('abcde', 4)).toEqual('a...');
      expect(StringUtil.abbreviate('abcde', 4, null)).toEqual('a...');
      expect(StringUtil.abbreviate('abcde', 4, undefined)).toEqual('a...');
    });


    it('when given maxLength is less than or equal to 0 then empty string is returned', () => {
      expect(StringUtil.abbreviate(undefined, -3)).toEqual('');
      expect(StringUtil.abbreviate(undefined, -3, '.')).toEqual('');

      expect(StringUtil.abbreviate(null, -3)).toEqual('');
      expect(StringUtil.abbreviate(null, -3, '...')).toEqual('');

      expect(StringUtil.abbreviate('abc', -1, '.')).toEqual('');
      expect(StringUtil.abbreviate('abc', 0)).toEqual('');
      expect(StringUtil.abbreviate('abc', 0, '-')).toEqual('');
    });


    it('when given maxLength is greater than or equal to length of sourceString then sourceString is returned', () => {
      expect(StringUtil.abbreviate('ab', 3)).toEqual('ab');
      expect(StringUtil.abbreviate('ab', 3, '...')).toEqual('ab');
      expect(StringUtil.abbreviate('abc', 3, '.')).toEqual('abc');

      expect(StringUtil.abbreviate('abcdef', 10)).toEqual('abcdef');
      expect(StringUtil.abbreviate('abcdef', 10, null)).toEqual('abcdef');
      expect(StringUtil.abbreviate('abcdef', 10, undefined)).toEqual('abcdef');
      expect(StringUtil.abbreviate('abcdef', 10, '...')).toEqual('abcdef');
    });


    it('when given maxLength is less than the first character of sourceString and length of abbreviationString then an error is thrown', () => {
      expect(() => StringUtil.abbreviate('abc', 1, '.')).toThrowError(IllegalArgumentError);

      expect(() => StringUtil.abbreviate('abcd', 3)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviate('abcd', 3, null)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviate('abcd', 3, undefined)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviate('abcd', 3, '...')).toThrowError(IllegalArgumentError);

      expect(() => StringUtil.abbreviate('abcdef', 3)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviate('abcdef', 3, null)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviate('abcdef', 3, undefined)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviate('abcdef', 3, '...')).toThrowError(IllegalArgumentError);
    });


    it('when given sourceString can be abbreviated then expected new abbreviated string is returned', () => {
      expect(StringUtil.abbreviate('abcdef', 4, '.')).toEqual('abc.');
      expect(StringUtil.abbreviate('abcdef', 5, '.')).toEqual('abcd.');

      expect(StringUtil.abbreviate('abcdef', 5)).toEqual('ab...');
      expect(StringUtil.abbreviate('abcdef', 5, null)).toEqual('ab...');
      expect(StringUtil.abbreviate('abcdef', 5, undefined)).toEqual('ab...');
      expect(StringUtil.abbreviate('abcdef', 5, '...')).toEqual('ab...');

      expect(StringUtil.abbreviate('abcdefg', 6)).toEqual('abc...');
      expect(StringUtil.abbreviate('abcdefg', 6, null)).toEqual('abc...');
      expect(StringUtil.abbreviate('abcdefg', 6, undefined)).toEqual('abc...');
      expect(StringUtil.abbreviate('abcdefg', 6, '...')).toEqual('abc...');
    });

  });


  describe('abbreviateMiddle', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.abbreviateMiddle(null, 0, null)).toEqual('');
      expect(StringUtil.abbreviateMiddle(null, 5, '...')).toEqual('');
      expect(StringUtil.abbreviateMiddle(undefined, 0)).toEqual('');
      expect(StringUtil.abbreviateMiddle(undefined, 0, undefined)).toEqual('');
      expect(StringUtil.abbreviateMiddle(undefined, 2, '.')).toEqual('');
      expect(StringUtil.abbreviateMiddle('', 1, '-')).toEqual('');
    });


    it('when given abbreviationString is null or undefined then StringUtil.DEFAULT_ABBREVIATION_STRING is used', () => {
      expect(StringUtil.abbreviateMiddle('abc', 0)).toEqual('');
      expect(StringUtil.abbreviateMiddle('abc', 0, null)).toEqual('');
      expect(StringUtil.abbreviateMiddle('abc', 0, undefined)).toEqual('');

      expect(StringUtil.abbreviateMiddle('abc', -1)).toEqual('');
      expect(StringUtil.abbreviateMiddle('abc', -1, null)).toEqual('');
      expect(StringUtil.abbreviateMiddle('abc', -1, undefined)).toEqual('');

      expect(StringUtil.abbreviateMiddle('abcde', 5)).toEqual('abcde');
      expect(StringUtil.abbreviateMiddle('abcde', 5, null)).toEqual('abcde');
      expect(StringUtil.abbreviateMiddle('abcde', 5, undefined)).toEqual('abcde');

      expect(StringUtil.abbreviateMiddle('abcdef', 5)).toEqual('a...f');
      expect(StringUtil.abbreviateMiddle('abcdef', 5, null)).toEqual('a...f');
      expect(StringUtil.abbreviateMiddle('abcdef', 5, undefined)).toEqual('a...f');
    });


    it('when given maxLength is less than or equal to 0 then empty string is returned', () => {
      expect(StringUtil.abbreviateMiddle(undefined, -3)).toEqual('');
      expect(StringUtil.abbreviateMiddle(undefined, -3, '.')).toEqual('');

      expect(StringUtil.abbreviateMiddle(null, -3)).toEqual('');
      expect(StringUtil.abbreviateMiddle(null, -3, '...')).toEqual('');

      expect(StringUtil.abbreviateMiddle('abc', -1, '.')).toEqual('');
      expect(StringUtil.abbreviateMiddle('abc', 0)).toEqual('');
      expect(StringUtil.abbreviateMiddle('abc', 0, '-')).toEqual('');
    });


    it('when given maxLength is greater than or equal to length of sourceString then sourceString is returned', () => {
      expect(StringUtil.abbreviateMiddle('ab', 3)).toEqual('ab');
      expect(StringUtil.abbreviateMiddle('ab', 3, '...')).toEqual('ab');
      expect(StringUtil.abbreviateMiddle('abc', 3, '.')).toEqual('abc');

      expect(StringUtil.abbreviateMiddle('abcdef', 10)).toEqual('abcdef');
      expect(StringUtil.abbreviateMiddle('abcdef', 10, null)).toEqual('abcdef');
      expect(StringUtil.abbreviateMiddle('abcdef', 10, undefined)).toEqual('abcdef');
      expect(StringUtil.abbreviateMiddle('abcdef', 10, '...')).toEqual('abcdef');
    });


    it('when given maxLength is less than the first and last characters of sourceString and length of abbreviationString then an error is thrown', () => {
      expect(() => StringUtil.abbreviateMiddle('abc', 2, '.')).toThrowError(IllegalArgumentError);

      expect(() => StringUtil.abbreviateMiddle('abcd', 3)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviateMiddle('abcd', 3, null)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviateMiddle('abcd', 3, undefined)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviateMiddle('abcd', 3, '...')).toThrowError(IllegalArgumentError);

      expect(() => StringUtil.abbreviateMiddle('abcdef', 4)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviateMiddle('abcdef', 4, null)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviateMiddle('abcdef', 4, undefined)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.abbreviateMiddle('abcdef', 4, '...')).toThrowError(IllegalArgumentError);
    });


    it('when given sourceString can be abbreviated then expected new abbreviated string is returned', () => {
      expect(StringUtil.abbreviateMiddle('abcdef', 4, '.')).toEqual('ab.f');
      expect(StringUtil.abbreviateMiddle('abcdef', 5, '.')).toEqual('ab.ef');

      expect(StringUtil.abbreviateMiddle('abcdef', 5)).toEqual('a...f');
      expect(StringUtil.abbreviateMiddle('abcdef', 5, null)).toEqual('a...f');
      expect(StringUtil.abbreviateMiddle('abcdef', 5, undefined)).toEqual('a...f');
      expect(StringUtil.abbreviateMiddle('abcdef', 5, '...')).toEqual('a...f');

      expect(StringUtil.abbreviateMiddle('abcdefg', 6)).toEqual('ab...g');
      expect(StringUtil.abbreviateMiddle('abcdefg', 6, null)).toEqual('ab...g');
      expect(StringUtil.abbreviateMiddle('abcdefg', 6, undefined)).toEqual('ab...g');
      expect(StringUtil.abbreviateMiddle('abcdefg', 6, '...')).toEqual('ab...g');
    });

  });



  describe('collect', () => {

    it('when given sourceString is null, undefined or empty and partialFunction is provided then empty string is returned', () => {
      const emptyString = '';
      const ifVowelAdd2ElseRemove: PartialFunction<string, string> =
        PartialFunction.of(
          (s: string) => -1 != 'aeiouAEIOU'.indexOf(s),
          (s: string) => s + '2'
        );

      expect(StringUtil.collect(null, ifVowelAdd2ElseRemove)).toEqual(emptyString);
      expect(StringUtil.collect(undefined, ifVowelAdd2ElseRemove)).toEqual(emptyString);
      expect(StringUtil.collect(emptyString, ifVowelAdd2ElseRemove)).toEqual(emptyString);
    });


    it('when given sourceString is null, undefined or empty and mapFunction and filterPredicate are provided then empty string is returned', () => {
      const emptyString = '';

      expect(StringUtil.collect(null, add2FFunction, isVowelFPredicate)).toEqual(emptyString);
      expect(StringUtil.collect(undefined, add2FFunction, isVowelFPredicate)).toEqual(emptyString);
      expect(StringUtil.collect(emptyString, add2FFunction, isVowelFPredicate)).toEqual(emptyString);
    });


    it('when given sourceString is not empty but partialFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => StringUtil.collect('abc', null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => StringUtil.collect('abc', undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceString is not empty but mapFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => StringUtil.collect('abc', null, isVowelFPredicate)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => StringUtil.collect('abc', undefined, isVowelFPredicate)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceString has elements and partialFunction is valid then a new filtered and transformed string is returned', () => {
      const sourceString = 'abcDEfgIoU12';
      const ifVowelAdd2ElseRemove: PartialFunction<string, string> =
        PartialFunction.of(
          (s: string) => -1 != 'aeiouAEIOU'.indexOf(s),
          (s: string) => s + '2'
        );

      const expectedResult = 'a2E2I2o2U2';

      expect(StringUtil.collect(sourceString, ifVowelAdd2ElseRemove)).toEqual(expectedResult);
    });


    it('when given sourceString has elements and mapFunction is valid but filterPredicate is null or undefined then all elements will be transformed', () => {
      const sourceString = 'abcDEfgIoU12';
      const expectedResult = 'a2b2c2D2E2f2g2I2o2U21222';

      // @ts-ignore
      expect(StringUtil.collect(sourceString, add2FFunction, null)).toEqual(expectedResult);
      // @ts-ignore
      expect(StringUtil.collect(sourceString, add2FFunction, undefined)).toEqual(expectedResult);
    });


    it('when given sourceString has elements and mapFunction and filterPredicate are valid then a new filtered and transformed string is returned', () => {
      const sourceString = 'abcDEfgIoU12';
      const expectedResult = 'a2E2I2o2U2';

      expect(StringUtil.collect(sourceString, add2Raw, isVowelRaw)).toEqual(expectedResult);
    });

  });



  describe('containsIgnoreCase', () => {

    it('when given sourceString is null or undefined then false is returned', () => {
      expect(StringUtil.containsIgnoreCase(null, null)).toBeFalse();
      expect(StringUtil.containsIgnoreCase(null, undefined)).toBeFalse();
      expect(StringUtil.containsIgnoreCase(null, '')).toBeFalse();
      expect(StringUtil.containsIgnoreCase(null, 'ab')).toBeFalse();

      expect(StringUtil.containsIgnoreCase(undefined, null)).toBeFalse();
      expect(StringUtil.containsIgnoreCase(undefined, undefined)).toBeFalse();
      expect(StringUtil.containsIgnoreCase(undefined, '')).toBeFalse();
      expect(StringUtil.containsIgnoreCase(undefined, 'ab')).toBeFalse();
    });


    it('when given stringToSearch is null or undefined then false is returned', () => {
      expect(StringUtil.containsIgnoreCase(null, null)).toBeFalse();
      expect(StringUtil.containsIgnoreCase(undefined, null)).toBeFalse();
      expect(StringUtil.containsIgnoreCase('', null)).toBeFalse();
      expect(StringUtil.containsIgnoreCase('ab', null)).toBeFalse();

      expect(StringUtil.containsIgnoreCase(null, undefined)).toBeFalse();
      expect(StringUtil.containsIgnoreCase(undefined, undefined)).toBeFalse();
      expect(StringUtil.containsIgnoreCase('', undefined)).toBeFalse();
      expect(StringUtil.containsIgnoreCase('ab', undefined)).toBeFalse();
    });


    it('when given sourceString contains characters but stringToSearch does not appear then false is returned', () => {
      expect(StringUtil.containsIgnoreCase('', 'abd')).toBeFalse();
      expect(StringUtil.containsIgnoreCase('abcab', 'abd')).toBeFalse();
      expect(StringUtil.containsIgnoreCase('abcab', 'x')).toBeFalse();
      expect(StringUtil.containsIgnoreCase('abcab', 'xx')).toBeFalse();
    });


    it('when given sourceString contains stringToSearch then true is returned', () => {
      expect(StringUtil.containsIgnoreCase('', '')).toBeTrue();
      expect(StringUtil.containsIgnoreCase('ab', '')).toBeTrue();

      expect(StringUtil.containsIgnoreCase('abcd', 'bc')).toBeTrue();
      expect(StringUtil.containsIgnoreCase('abcd', 'D')).toBeTrue();
      expect(StringUtil.containsIgnoreCase('ABcD', 'bC')).toBeTrue();
      expect(StringUtil.containsIgnoreCase('abcd', 'ABCD')).toBeTrue();
    });

  });



  describe('count', () => {

    it('when given sourceString is null, undefined or empty then 0 is returned', () => {
      expect(StringUtil.count(null, null)).toEqual(0);
      expect(StringUtil.count(null, undefined)).toEqual(0);
      expect(StringUtil.count(null, '')).toEqual(0);
      expect(StringUtil.count(null, 'ab')).toEqual(0);

      expect(StringUtil.count(undefined, null)).toEqual(0);
      expect(StringUtil.count(undefined, undefined)).toEqual(0);
      expect(StringUtil.count(undefined, '')).toEqual(0);
      expect(StringUtil.count(undefined, 'ab')).toEqual(0);

      expect(StringUtil.count('', null)).toEqual(0);
      expect(StringUtil.count('', undefined)).toEqual(0);
      expect(StringUtil.count('', '')).toEqual(0);
      expect(StringUtil.count('', 'ab')).toEqual(0);
    });


    it('when given stringToSearch is null, undefined or empty then 0 is returned', () => {
      expect(StringUtil.count(null, null)).toEqual(0);
      expect(StringUtil.count(undefined, null)).toEqual(0);
      expect(StringUtil.count('', null)).toEqual(0);
      expect(StringUtil.count('ab', null)).toEqual(0);

      expect(StringUtil.count(null, undefined)).toEqual(0);
      expect(StringUtil.count(undefined, undefined)).toEqual(0);
      expect(StringUtil.count('', undefined)).toEqual(0);
      expect(StringUtil.count('ab', undefined)).toEqual(0);

      expect(StringUtil.count(null, '')).toEqual(0);
      expect(StringUtil.count(undefined, '')).toEqual(0);
      expect(StringUtil.count('', '')).toEqual(0);
      expect(StringUtil.count('ab', '')).toEqual(0);
    });


    it('when given sourceString contains characters but stringToSearch does not appear then 0 is returned', () => {
      expect(StringUtil.count('abcab', 'abd')).toEqual(0);
      expect(StringUtil.count('abcab', 'x')).toEqual(0);
      expect(StringUtil.count('abcab', 'xx')).toEqual(0);
    });


    it('when given sourceString contains stringToSearch then the number of occurrences is returned', () => {
      expect(StringUtil.count('aa', 'aa')).toEqual(1);
      expect(StringUtil.count('aaa', 'aa')).toEqual(1);

      expect(StringUtil.count('aaaa', 'aa')).toEqual(2);
      expect(StringUtil.count('aaaaa', 'aa')).toEqual(2);
      expect(StringUtil.count('abcab', 'ab')).toEqual(2);

      expect(StringUtil.count('abcabb', 'b')).toEqual(3);
      expect(StringUtil.count('bcabbd', 'b')).toEqual(3);
    });

  });



  describe('dropWhile', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      const emptyString = '';

      expect(StringUtil.dropWhile(null, isVowelFPredicate)).toEqual(emptyString);
      expect(StringUtil.dropWhile(undefined, isVowelFPredicate)).toEqual(emptyString);
      expect(StringUtil.dropWhile(emptyString, isVowelFPredicate)).toEqual(emptyString);
    });


    it('when given sourceString is not empty but filterPredicate is null or undefined then sourceString is returned', () => {
      const sourceString = 'aEibc12';

      expect(StringUtil.dropWhile(sourceString, null)).toEqual(sourceString);
      expect(StringUtil.dropWhile(sourceString, undefined)).toEqual(sourceString);
    });


    it('when given sourceString is not empty and filterPredicate is valid then longest prefix of filtered elements is returned', () => {
        const sourceString = 'aEibc12';
        const expectedResult = 'bc12';

        expect(StringUtil.dropWhile(sourceString, isVowelRaw)).toEqual(expectedResult);
    });

  });



  describe('filter', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.filter(null, null)).toEqual('');
      expect(StringUtil.filter(null, undefined)).toEqual('');
      expect(StringUtil.filter(null, isVowelFPredicate)).toEqual('');

      expect(StringUtil.filter(undefined, null)).toEqual('');
      expect(StringUtil.filter(undefined, undefined)).toEqual('');
      expect(StringUtil.filter(undefined, isVowelFPredicate)).toEqual('');

      expect(StringUtil.filter('', null)).toEqual('');
      expect(StringUtil.filter('', undefined)).toEqual('');
      expect(StringUtil.filter('', isVowelFPredicate)).toEqual('');
    });


    it('when given filterPredicate is null or undefined then sourceString is returned', () => {
      expect(StringUtil.filter('abc', null)).toEqual('abc');
      expect(StringUtil.filter('142', undefined)).toEqual('142');
    });


    it('when given sourceString contains characters and filterPredicate is not null then filtered string is returned', () => {
      expect(StringUtil.filter('abcEioU3', isVowelRaw)).toEqual('aEioU');
      expect(StringUtil.filter('142', isVowelRaw)).toEqual('');
    });

  });



  describe('filterNot', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.filterNot(null, null)).toEqual('');
      expect(StringUtil.filterNot(null, undefined)).toEqual('');
      expect(StringUtil.filterNot(null, isVowelFPredicate)).toEqual('');

      expect(StringUtil.filterNot(undefined, null)).toEqual('');
      expect(StringUtil.filterNot(undefined, undefined)).toEqual('');
      expect(StringUtil.filterNot(undefined, isVowelFPredicate)).toEqual('');

      expect(StringUtil.filterNot('', null)).toEqual('');
      expect(StringUtil.filterNot('', undefined)).toEqual('');
      expect(StringUtil.filterNot('', isVowelFPredicate)).toEqual('');
    });


    it('when given filterPredicate is null or undefined then sourceString is returned', () => {
      expect(StringUtil.filterNot('abc', null)).toEqual('abc');
      expect(StringUtil.filterNot('142', undefined)).toEqual('142');
    });


    it('when given sourceString contains characters and filterPredicate is not null then filtered string is returned', () => {
      expect(StringUtil.filterNot('abcEioU3', isVowelRaw)).toEqual('bc3');
      expect(StringUtil.filterNot('142', isVowelRaw)).toEqual('142');
    });

  });



  describe('foldLeft', () => {

    it('when given sourceString is null, undefined or empty then initialValue is returned', () => {
      const initialValue = 1;

      expect(StringUtil.foldLeft(null, initialValue, sumASCIIValuesFFunction)).toEqual(initialValue);
      expect(StringUtil.foldLeft(undefined, initialValue, sumASCIIValuesFFunction)).toEqual(initialValue);
      expect(StringUtil.foldLeft('', initialValue, sumASCIIValuesFFunction)).toEqual(initialValue);
    });


    it('when given accumulator is null or undefined then initialValue is returned', () => {
      const sourceString = 'ab12';
      const initialValue = 1;

      expect(StringUtil.foldLeft(sourceString, initialValue, null)).toEqual(initialValue);
      expect(StringUtil.foldLeft(sourceString, initialValue, undefined)).toEqual(initialValue);
    });


    it('when given sourceString is not empty then initialValue applying accumulator is returned', () => {
      const sourceString = 'ab12';
      const initialValue = 1;

      const expectedResult = 295;

      expect(StringUtil.foldLeft(sourceString, initialValue, sumASCIIValuesRaw)).toEqual(expectedResult);
    });

  });



  describe('getDigits', () => {

    it('when given sourceString is null, undefined, empty or whitespace then empty string is returned', () => {
      expect(StringUtil.getDigits(undefined)).toEqual('');
      expect(StringUtil.getDigits(null)).toEqual('');
      expect(StringUtil.getDigits('')).toEqual('');
      expect(StringUtil.getDigits('    ')).toEqual('');
    });


    it('when given sourceString contains not empty characters then only digits are returned', () => {
      expect(StringUtil.getDigits('112')).toEqual('112');
      expect(StringUtil.getDigits('  a  ')).toEqual('');
      expect(StringUtil.getDigits('373-030-9447')).toEqual('3730309447');
      expect(StringUtil.getDigits('aSf35~yt99Th')).toEqual('3599');
    });

  });



  describe('getNotEmptyOrElse', () => {

    it('when given sourceString is null, undefined or empty then defaultValue is returned', () => {
      expect(StringUtil.getNotEmptyOrElse(null, '')).toEqual('');
      expect(StringUtil.getNotEmptyOrElse(null, 'ab')).toEqual('ab');

      expect(StringUtil.getNotEmptyOrElse(undefined, '')).toEqual('');
      expect(StringUtil.getNotEmptyOrElse(undefined, 'ab')).toEqual('ab');

      expect(StringUtil.getNotEmptyOrElse('', '')).toEqual('');
      expect(StringUtil.getNotEmptyOrElse('', 'ab')).toEqual('ab');
    });


    it('when given sourceString contains characters then sourceString returned', () => {
      const sourceString = 'abcab';

      expect(StringUtil.getNotEmptyOrElse(sourceString, 'abd')).toEqual(sourceString);
      expect(StringUtil.getNotEmptyOrElse(sourceString, 'x')).toEqual(sourceString);
      expect(StringUtil.getNotEmptyOrElse(sourceString, 'xx')).toEqual(sourceString);
    });

  });



  describe('groupBy', () => {

    it('when given sourceString is null, undefined or empty and discriminatorKey is provided then empty Map is returned', () => {
      const emptyString = '';
      const expectedResult: Map<string, string> = new Map<string, string>;

      expect(StringUtil.groupBy(null, identityFUnaryOperator)).toEqual(expectedResult);
      expect(StringUtil.groupBy(undefined, identityFUnaryOperator)).toEqual(expectedResult);
      expect(StringUtil.groupBy(emptyString, identityFUnaryOperator)).toEqual(expectedResult);
    });


    it('when given sourceString is null, undefined or empty and discriminatorKey and filterPredicate are provided then empty string is returned', () => {
      const emptyString = '';

      const expectedResult: Map<string, string> = new Map<string, string>;

      expect(StringUtil.groupBy(null, identityFUnaryOperator, isVowelFPredicate)).toEqual(expectedResult);
      expect(StringUtil.groupBy(undefined, identityFUnaryOperator, isVowelFPredicate)).toEqual(expectedResult);
      expect(StringUtil.groupBy(emptyString, identityFUnaryOperator, isVowelFPredicate)).toEqual(expectedResult);
    });


    it('when given sourceString is not empty but discriminatorKey is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => StringUtil.groupBy('abc', null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => StringUtil.groupBy('abc', undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceString has elements and discriminatorKey is valid but filterPredicate is null or undefined then all elements will be grouped', () => {
      const sourceString = 'essae';

      const expectedResult: Map<string, string> = new Map<string, string>;
      expectedResult.set('e', 'ee');
      expectedResult.set('s', 'ss');
      expectedResult.set('a', 'a');

      verifyMaps(
        StringUtil.groupBy(sourceString, identityFUnaryOperator, null),
        expectedResult
      );
      verifyMaps(
        StringUtil.groupBy(sourceString, identityFUnaryOperator, undefined),
        expectedResult
      );
    });


    it('when given sourceString has elements and mapFunction and filterPredicate are valid then a new filtered and transformed string is returned', () => {
      const sourceString = 'essae';

      const countCharacters = (s: string) => StringUtil.count(sourceString, s);

      const expectedResult: Map<number, string> = new Map<number, string>;
      expectedResult.set(1, 'a');
      expectedResult.set(2, 'ee');

      verifyMaps(
        StringUtil.groupBy(sourceString, countCharacters, isVowelRaw),
        expectedResult
      );
    });

  });



  describe('hideMiddle', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.hideMiddle(null, 0, null)).toEqual('');
      expect(StringUtil.hideMiddle(null, 5, '...')).toEqual('');
      expect(StringUtil.hideMiddle(undefined, 0)).toEqual('');
      expect(StringUtil.hideMiddle(undefined, 0, undefined)).toEqual('');
      expect(StringUtil.hideMiddle(undefined, 2, '.')).toEqual('');
      expect(StringUtil.hideMiddle('', 1, '-')).toEqual('');
    });


    it('when given abbreviationString is null or undefined then StringUtil.DEFAULT_ABBREVIATION_STRING is used', () => {
      expect(StringUtil.hideMiddle('abc', 0)).toEqual('');
      expect(StringUtil.hideMiddle('abc', 0, null)).toEqual('');
      expect(StringUtil.hideMiddle('abc', 0, undefined)).toEqual('');

      expect(StringUtil.hideMiddle('abc', -1)).toEqual('');
      expect(StringUtil.hideMiddle('abc', -1, null)).toEqual('');
      expect(StringUtil.hideMiddle('abc', -1, undefined)).toEqual('');

      expect(StringUtil.hideMiddle('abcde', 5)).toEqual('a...e');
      expect(StringUtil.hideMiddle('abcde', 5, null)).toEqual('a...e');
      expect(StringUtil.hideMiddle('abcde', 5, undefined)).toEqual('a...e');

      expect(StringUtil.hideMiddle('abcdef', 6)).toEqual('ab...f');
      expect(StringUtil.hideMiddle('abcdef', 6, null)).toEqual('ab...f');
      expect(StringUtil.hideMiddle('abcdef', 6, undefined)).toEqual('ab...f');
    });


    it('when given maxLength is less than or equal to 0 then empty string is returned', () => {
      expect(StringUtil.hideMiddle(undefined, -3)).toEqual('');
      expect(StringUtil.hideMiddle(undefined, -3, '.')).toEqual('');

      expect(StringUtil.hideMiddle(null, -3)).toEqual('');
      expect(StringUtil.hideMiddle(null, -3, '...')).toEqual('');

      expect(StringUtil.hideMiddle('abc', -1, '.')).toEqual('');
      expect(StringUtil.hideMiddle('abc', 0)).toEqual('');
      expect(StringUtil.hideMiddle('abc', 0, '-')).toEqual('');
    });


    it('when the length of given sourceString is lower than or equals to 2 then sourceString is returned', () => {
      expect(StringUtil.hideMiddle('a', 3)).toEqual('a');
      expect(StringUtil.hideMiddle('a', 3, '...')).toEqual('a');
      expect(StringUtil.hideMiddle('ab', 3, '.')).toEqual('ab');
    });


    it('when given maxLength is less than the first and last characters of sourceString and length of abbreviationString then an error is thrown', () => {
      expect(() => StringUtil.hideMiddle('abc', 2, '.')).toThrowError(IllegalArgumentError);

      expect(() => StringUtil.hideMiddle('abcd', 3)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.hideMiddle('abcd', 3, null)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.hideMiddle('abcd', 3, undefined)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.hideMiddle('abcd', 3, '...')).toThrowError(IllegalArgumentError);

      expect(() => StringUtil.hideMiddle('abcdef', 4)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.hideMiddle('abcdef', 4, null)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.hideMiddle('abcdef', 4, undefined)).toThrowError(IllegalArgumentError);
      expect(() => StringUtil.hideMiddle('abcdef', 4, '...')).toThrowError(IllegalArgumentError);
    });


    it('when given sourceString can be abbreviated then expected new abbreviated string is returned', () => {
      expect(StringUtil.hideMiddle('abc', 3, '.')).toEqual('a.c');

      expect(StringUtil.hideMiddle('abcdef', 4, '.')).toEqual('ab.f');
      expect(StringUtil.hideMiddle('abcdef', 5, '.')).toEqual('ab.ef');

      expect(StringUtil.hideMiddle('abcdef', 5)).toEqual('a...f');
      expect(StringUtil.hideMiddle('abcdef', 5, null)).toEqual('a...f');
      expect(StringUtil.hideMiddle('abcdef', 5, undefined)).toEqual('a...f');
      expect(StringUtil.hideMiddle('abcdef', 5, '...')).toEqual('a...f');

      expect(StringUtil.hideMiddle('abcdef', 6)).toEqual('ab...f');
      expect(StringUtil.hideMiddle('abcdef', 6, null)).toEqual('ab...f');
      expect(StringUtil.hideMiddle('abcdef', 6, undefined)).toEqual('ab...f');
      expect(StringUtil.hideMiddle('abcdef', 6, '...')).toEqual('ab...f');

      expect(StringUtil.hideMiddle('abcdef', 7)).toEqual('ab...f');
      expect(StringUtil.hideMiddle('abcdef', 7, null)).toEqual('ab...f');
      expect(StringUtil.hideMiddle('abcdef', 7, undefined)).toEqual('ab...f');
      expect(StringUtil.hideMiddle('abcdef', 7, '...')).toEqual('ab...f');

      expect(StringUtil.hideMiddle('abcdef', 10, '..')).toEqual('ab..ef');
      expect(StringUtil.hideMiddle('abcdef', 10)).toEqual('ab...f');
      expect(StringUtil.hideMiddle('abcdef', 10, '...')).toEqual('ab...f');

      expect(StringUtil.hideMiddle('abcdefg', 6, '..')).toEqual('ab..fg');
      expect(StringUtil.hideMiddle('abcdefg', 6)).toEqual('ab...g');
      expect(StringUtil.hideMiddle('abcdefg', 6, null)).toEqual('ab...g');
      expect(StringUtil.hideMiddle('abcdefg', 6, undefined)).toEqual('ab...g');
      expect(StringUtil.hideMiddle('abcdefg', 6, '...')).toEqual('ab...g');

      expect(StringUtil.hideMiddle('abcdefg', 10, '..')).toEqual('abc..fg');
      expect(StringUtil.hideMiddle('abcdefg', 10)).toEqual('ab...fg');
      expect(StringUtil.hideMiddle('abcdefg', 10, null)).toEqual('ab...fg');
      expect(StringUtil.hideMiddle('abcdefg', 10, undefined)).toEqual('ab...fg');
      expect(StringUtil.hideMiddle('abcdefg', 10, '...')).toEqual('ab...fg');
    });

  });



  describe('isBlank', () => {

    it('when given sourceString is null, undefined, empty or whitespace then true is returned', () => {
      expect(StringUtil.isBlank(undefined)).toBeTrue();
      expect(StringUtil.isBlank(null)).toBeTrue();
      expect(StringUtil.isBlank('')).toBeTrue();
      expect(StringUtil.isBlank('    ')).toBeTrue();
    });


    it('when given sourceString is not empty and no whitespace then false is returned', () => {
      expect(StringUtil.isBlank('112')).toBeFalse();
      expect(StringUtil.isBlank('  a  ')).toBeFalse();
    });

  });



  describe('isEmpty', () => {

    it('when given sourceString is null, undefined or empty then true is returned', () => {
      expect(StringUtil.isEmpty(undefined)).toBeTrue();
      expect(StringUtil.isEmpty(null)).toBeTrue();
      expect(StringUtil.isEmpty('')).toBeTrue();
    });


    it('when given sourceString is not empty then false is returned', () => {
      expect(StringUtil.isEmpty('    ')).toBeFalse();
      expect(StringUtil.isEmpty('112')).toBeFalse();
      expect(StringUtil.isEmpty('  a  ')).toBeFalse();
    });

  });



  describe('join', () => {

    it('when given sourceArray is null, undefined or empty then empty string is returned', () => {
      const expectedResult: string = '';

      expect(StringUtil.join(undefined, toStringRaw)).toEqual(expectedResult);
      expect(StringUtil.join(null, toStringRaw)).toEqual(expectedResult);
      expect(StringUtil.join([], toStringRaw)).toEqual(expectedResult);
    });


    it('when given sourceArray has elements but neither separator nor filterPredicate is provided then the string of all elements is returned', () => {
      const sourceArray: NullableOrUndefined<number>[] = [1, 2, 3, null, 6, undefined, 7];

      expect(StringUtil.join(sourceArray, toStringFFunction)).toEqual('12367');
    });


    it('when given sourceArray has elements, a separator and filterPredicate are provided then the string of all elements is returned', () => {
      const sourceArray: NullableOrUndefined<number>[] = [1, 2, null, 66, 5, undefined, 78, 99];

      const isNullOrUndefinedOrOdd = (n: NullableOrUndefined<number>) =>
          ObjectUtil.isNullOrUndefined(n) || 1 == n % 2;

      const separator = ';';

      expect(StringUtil.join(sourceArray, toStringFFunction, isNullOrUndefinedOrOdd, separator)).toEqual('1;;5;;99');
    });

  });



  describe('leftPad', () => {

    it('when given sourceString is null, undefined or empty and size is lower than or equals to 0 then empty string is returned', () => {
      expect(StringUtil.leftPad(null, -1)).toEqual('');
      expect(StringUtil.leftPad(null, 0)).toEqual('');

      expect(StringUtil.leftPad(undefined, -1)).toEqual('');
      expect(StringUtil.leftPad(undefined, 0)).toEqual('');

      expect(StringUtil.leftPad('', -1)).toEqual('');
      expect(StringUtil.leftPad('', 0)).toEqual('');
    });


    it('when given sourceString is null, undefined or empty and size is greater than 0 then padString up to size is returned', () => {
      expect(StringUtil.leftPad(null, 2)).toEqual('  ');
      expect(StringUtil.leftPad(null, 3, 'abcd')).toEqual('abc');

      expect(StringUtil.leftPad(undefined, 1)).toEqual(' ');
      expect(StringUtil.leftPad(undefined, 2, 'z')).toEqual('zz');

      expect(StringUtil.leftPad('', 3)).toEqual('   ');
      expect(StringUtil.leftPad('', 4, '1234')).toEqual('1234');
    });


    it('when given sourceString has a value but size is lower than of equals to the length of sourceString then sourceString is returned', () => {
      const sourceString = 'abc';

      expect(StringUtil.leftPad(sourceString, -1)).toEqual(sourceString);
      expect(StringUtil.leftPad(sourceString, -1, 'abcd')).toEqual(sourceString);

      expect(StringUtil.leftPad(sourceString, sourceString.length - 1)).toEqual(sourceString);
      expect(StringUtil.leftPad(sourceString, sourceString.length - 1, 'z')).toEqual(sourceString);

      expect(StringUtil.leftPad(sourceString, sourceString.length)).toEqual(sourceString);
      expect(StringUtil.leftPad(sourceString, sourceString.length, '1234')).toEqual(sourceString);
    });


    it('when given sourceString has a value and size is greater than length of sourceString then left pad string is returned', () => {
      const sourceString = 'abc';

      expect(StringUtil.leftPad(sourceString, sourceString.length + 1)).toEqual(' ' + sourceString);
      expect(StringUtil.leftPad(sourceString, sourceString.length + 1, '')).toEqual(' ' + sourceString);
      expect(StringUtil.leftPad(sourceString, sourceString.length + 1, '  ')).toEqual(' ' + sourceString);

      expect(StringUtil.leftPad(sourceString, sourceString.length + 2, 'z')).toEqual('zz' + sourceString);
      expect(StringUtil.leftPad(sourceString, sourceString.length + 3, 'zzzz')).toEqual('zzz' + sourceString);
      expect(StringUtil.leftPad(sourceString, sourceString.length + 4, 'zzzz')).toEqual('zzzz' + sourceString);
    });

  });



  describe('map', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      const emptyString = '';

      // @ts-ignore
      expect(StringUtil.map(null, null)).toEqual(emptyString);
      // @ts-ignore
      expect(StringUtil.map(undefined, undefined)).toEqual(emptyString);
      // @ts-ignore
      expect(StringUtil.map(emptyString, null)).toEqual(emptyString);
      // @ts-ignore
      expect(StringUtil.map(emptyString, undefined)).toEqual(emptyString);
    });


    it('when given sourceString is null, undefined or empty and mapFunction is provided then empty array is returned', () => {
      const emptyString = '';

      const ifVowelEmptyElseCurrent: FUnaryOperator<string> =
          (s: string) => -1 != 'aeiouAEIOU'.indexOf(s) ? '' : s;

      expect(StringUtil.map(null, ifVowelEmptyElseCurrent)).toEqual(emptyString);
      expect(StringUtil.map(undefined, ifVowelEmptyElseCurrent)).toEqual(emptyString);
      expect(StringUtil.map(emptyString, ifVowelEmptyElseCurrent)).toEqual(emptyString);
    });


    it('when given sourceString is not empty but mapFunction is null or undefined then sourceString is returned', () => {
      const sourceString = 'aEibc1U2';

      // @ts-ignore
      expect(StringUtil.map(sourceString, null)).toEqual(sourceString);
      // @ts-ignore
      expect(StringUtil.map(sourceString, undefined)).toEqual(sourceString);
    });


    it('when given sourceString has elements and mapFunction is valid then a new transformed string is returned', () => {
      const sourceString = 'aEibc1U2';

      const ifVowelEmptyElseCurrent = (s: string) => -1 != 'aeiouAEIOU'.indexOf(s) ? '' : s;

      const expectedResult = 'bc12';

      expect(StringUtil.map(sourceString, ifVowelEmptyElseCurrent)).toEqual(expectedResult);
    });

  });



  describe('rightPad', () => {

    it('when given sourceString is null, undefined or empty and size is lower than or equals to 0 then empty string is returned', () => {
      expect(StringUtil.rightPad(null, -1)).toEqual('');
      expect(StringUtil.rightPad(null, 0)).toEqual('');

      expect(StringUtil.rightPad(undefined, -1)).toEqual('');
      expect(StringUtil.rightPad(undefined, 0)).toEqual('');

      expect(StringUtil.rightPad('', -1)).toEqual('');
      expect(StringUtil.rightPad('', 0)).toEqual('');
    });


    it('when given sourceString is null, undefined or empty and size is greater than 0 then padString up to size is returned', () => {
      expect(StringUtil.rightPad(null, 2)).toEqual('  ');
      expect(StringUtil.rightPad(null, 3, 'abcd')).toEqual('abc');

      expect(StringUtil.rightPad(undefined, 1)).toEqual(' ');
      expect(StringUtil.rightPad(undefined, 2, 'z')).toEqual('zz');

      expect(StringUtil.rightPad('', 3)).toEqual('   ');
      expect(StringUtil.rightPad('', 4, '1234')).toEqual('1234');
    });


    it('when given sourceString has a value but size is lower than of equals to the length of sourceString then sourceString is returned', () => {
      const sourceString = 'abc';

      expect(StringUtil.rightPad(sourceString, -1)).toEqual(sourceString);
      expect(StringUtil.rightPad(sourceString, -1, 'abcd')).toEqual(sourceString);

      expect(StringUtil.rightPad(sourceString, sourceString.length - 1)).toEqual(sourceString);
      expect(StringUtil.rightPad(sourceString, sourceString.length - 1, 'z')).toEqual(sourceString);

      expect(StringUtil.rightPad(sourceString, sourceString.length)).toEqual(sourceString);
      expect(StringUtil.rightPad(sourceString, sourceString.length, '1234')).toEqual(sourceString);
    });


    it('when given sourceString has a value and size is greater than length of sourceString then right pad string is returned', () => {
      const sourceString = 'abc';

      expect(StringUtil.rightPad(sourceString, sourceString.length + 1)).toEqual(sourceString + ' ');
      expect(StringUtil.rightPad(sourceString, sourceString.length + 1, '')).toEqual(sourceString + ' ');
      expect(StringUtil.rightPad(sourceString, sourceString.length + 1, '  ')).toEqual(sourceString + ' ');

      expect(StringUtil.rightPad(sourceString, sourceString.length + 2, 'z')).toEqual(sourceString + 'zz');
      expect(StringUtil.rightPad(sourceString, sourceString.length + 3, 'zzzz')).toEqual( sourceString + 'zzz');
      expect(StringUtil.rightPad(sourceString, sourceString.length + 4, 'zzzz')).toEqual(sourceString + 'zzzz');
    });

  });



  describe('sliding', () => {

    it('when given sourceString is null, undefined or empty then empty array is returned', () => {
      const expectedResult: string[] = [];

      expect(StringUtil.sliding(null, 1)).toEqual(expectedResult);
      expect(StringUtil.sliding(undefined, 1)).toEqual(expectedResult);
      expect(StringUtil.sliding('', 1)).toEqual(expectedResult);
    });


    it('when given sourceString contains a not empty string but size is null or undefined then an array with one element containing sourceString is returned', () => {
      const sourceString = 'abc';
      const expectedResult: string[] = [sourceString];

      // @ts-ignore
      expect(StringUtil.sliding(sourceString, null)).toEqual(expectedResult);
      // @ts-ignore
      expect(StringUtil.sliding(sourceString, undefined)).toEqual(expectedResult);
    });


    it('when given sourceString contains a not empty string but size is lower than one or equals or greater than sourceString.length then an array with one element containing sourceString is returned', () => {
      const sourceString = 'abc';
      const expectedResult: string[] = [sourceString];

      expect(StringUtil.sliding(sourceString, -1)).toEqual(expectedResult);
      expect(StringUtil.sliding(sourceString, 0)).toEqual(expectedResult);
      expect(StringUtil.sliding(sourceString, sourceString.length)).toEqual(expectedResult);
      expect(StringUtil.sliding(sourceString, sourceString.length + 1)).toEqual(expectedResult);
    });


    it('when given sourceString contains a not empty string and size is lower than sourceString.length then an array with the expected pieces of sourceString is returned', () => {
      const sourceString = '12345';
      const expectedResultSize2: string[] = ['12', '23', '34', '45'];
      const expectedResultSize3: string[] = ['123', '234', '345'];

      expect(StringUtil.sliding(sourceString, 2)).toEqual(expectedResultSize2);
      expect(StringUtil.sliding(sourceString, 3)).toEqual(expectedResultSize3);
    });

  });



  describe('splitMultilevel', () => {

    it('when given sourceString is null, undefined or empty then empty array is returned', () => {
      const expectedResult: string[] = [];

      expect(StringUtil.splitMultilevel(undefined)).toEqual(expectedResult);
      expect(StringUtil.splitMultilevel(null)).toEqual(expectedResult);
      expect(StringUtil.splitMultilevel('')).toEqual(expectedResult);

      expect(StringUtil.splitMultilevel(undefined, ' ')).toEqual(expectedResult);
      expect(StringUtil.splitMultilevel(null, ' ')).toEqual(expectedResult);
      expect(StringUtil.splitMultilevel('', ' ')).toEqual(expectedResult);
    });


    it('when given sourceString contains a not empty string but separators is null or undefined then an array with one element containing sourceString is returned', () => {
      const sourceString = 'abc';
      const expectedResult: string[] = [sourceString];

      expect(StringUtil.splitMultilevel(sourceString)).toEqual(expectedResult);
      expect(StringUtil.splitMultilevel(sourceString, null)).toEqual(expectedResult);
      expect(StringUtil.splitMultilevel(sourceString, undefined)).toEqual(expectedResult);
    });


    it('when given sourceString contains a not empty string but separators contains null or undefined then an array with the expected pieces of sourceString is returned using only valid separators', () => {
      const sourceString = 'ABC,DEF';
      const expectedResult: string[] = ['ABC', 'DEF'];

      expect(StringUtil.splitMultilevel(sourceString, null, ',', undefined)).toEqual(expectedResult);
      expect(StringUtil.splitMultilevel(sourceString, undefined, null, null, ',')).toEqual(expectedResult);
    });


    it('when given sourceString contains a not empty string and separators contains valid values then an array with the expected pieces of sourceString is returned', () => {
      expect(StringUtil.splitMultilevel('ABC,DEF', ',')).toEqual(['ABC', 'DEF']);
      expect(StringUtil.splitMultilevel('1,2.3,6,7.8.9', ',', '.')).toEqual(['1', '2', '3', '6', '7', '8', '9']);
      expect(StringUtil.splitMultilevel('1,13&%7,8,22&3', ',', '&%')).toEqual(['1', '13', '7', '8', '22&3']);
    });

  });



  describe('substringAfter', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.substringAfter(null, null)).toEqual('');
      expect(StringUtil.substringAfter(null, undefined)).toEqual('');
      expect(StringUtil.substringAfter(null, '')).toEqual('');
      expect(StringUtil.substringAfter(null, 'ab')).toEqual('');

      expect(StringUtil.substringAfter(undefined, null)).toEqual('');
      expect(StringUtil.substringAfter(undefined, undefined)).toEqual('');
      expect(StringUtil.substringAfter(undefined, '')).toEqual('');
      expect(StringUtil.substringAfter(undefined, 'ab')).toEqual('');

      expect(StringUtil.substringAfter('', null)).toEqual('');
      expect(StringUtil.substringAfter('', undefined)).toEqual('');
      expect(StringUtil.substringAfter('', '')).toEqual('');
      expect(StringUtil.substringAfter('', 'ab')).toEqual('');
    });


    it('when given separator is null or undefined then empty string is returned', () => {
      expect(StringUtil.substringAfter('ab', null)).toEqual('');
      expect(StringUtil.substringAfter('ab', undefined)).toEqual('');
    });


    it('when given separator is empty then sourceString is returned', () => {
      expect(StringUtil.substringAfter('ab', '')).toEqual('ab');
      expect(StringUtil.substringAfter('aaaaa', '')).toEqual('aaaaa');
    });


    it('when given sourceString contains characters but separator does not appear then empty string is returned', () => {
      expect(StringUtil.substringAfter('a', 'z')).toEqual('');
      expect(StringUtil.substringAfter('aba', 'bc')).toEqual('');
      expect(StringUtil.substringAfter('abcab', 'abd')).toEqual('');
    });


    it('when given sourceString contains separator then the substring after the first occurrence is returned', () => {
      expect(StringUtil.substringAfter('a', 'a')).toEqual('');
      expect(StringUtil.substringAfter('abc', 'c')).toEqual('');
      expect(StringUtil.substringAfter('abcb', 'b')).toEqual('cb');
      expect(StringUtil.substringAfter('aaaa', 'aa')).toEqual('aa');
    });

  });



  describe('substringAfterLast', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.substringAfterLast(null, null)).toEqual('');
      expect(StringUtil.substringAfterLast(null, undefined)).toEqual('');
      expect(StringUtil.substringAfterLast(null, '')).toEqual('');
      expect(StringUtil.substringAfterLast(null, 'ab')).toEqual('');

      expect(StringUtil.substringAfterLast(undefined, null)).toEqual('');
      expect(StringUtil.substringAfterLast(undefined, undefined)).toEqual('');
      expect(StringUtil.substringAfterLast(undefined, '')).toEqual('');
      expect(StringUtil.substringAfterLast(undefined, 'ab')).toEqual('');

      expect(StringUtil.substringAfterLast('', null)).toEqual('');
      expect(StringUtil.substringAfterLast('', undefined)).toEqual('');
      expect(StringUtil.substringAfterLast('', '')).toEqual('');
      expect(StringUtil.substringAfterLast('', 'ab')).toEqual('');
    });


    it('when given separator is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.substringAfterLast('ab', null)).toEqual('');
      expect(StringUtil.substringAfterLast('ab', undefined)).toEqual('');
      expect(StringUtil.substringAfterLast('ab', '')).toEqual('');
    });


    it('when given sourceString contains characters but separator does not appear then empty string is returned', () => {
      expect(StringUtil.substringAfterLast('a', 'z')).toEqual('');
      expect(StringUtil.substringAfterLast('aba', 'bc')).toEqual('');
      expect(StringUtil.substringAfterLast('abcab', 'abd')).toEqual('');
    });


    it('when given sourceString contains separator then the substring after the last occurrence is returned', () => {
      expect(StringUtil.substringAfterLast('a', 'a')).toEqual('');
      expect(StringUtil.substringAfterLast('abc', 'c')).toEqual('');
      expect(StringUtil.substringAfterLast('abcba', 'b')).toEqual('a');
      expect(StringUtil.substringAfterLast('aaaa', 'aa')).toEqual('');
    });

  });



  describe('substringBefore', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.substringBefore(null, null)).toEqual('');
      expect(StringUtil.substringBefore(null, undefined)).toEqual('');
      expect(StringUtil.substringBefore(null, '')).toEqual('');
      expect(StringUtil.substringBefore(null, 'ab')).toEqual('');

      expect(StringUtil.substringBefore(undefined, null)).toEqual('');
      expect(StringUtil.substringBefore(undefined, undefined)).toEqual('');
      expect(StringUtil.substringBefore(undefined, '')).toEqual('');
      expect(StringUtil.substringBefore(undefined, 'ab')).toEqual('');

      expect(StringUtil.substringBefore('', null)).toEqual('');
      expect(StringUtil.substringBefore('', undefined)).toEqual('');
      expect(StringUtil.substringBefore('', '')).toEqual('');
      expect(StringUtil.substringBefore('', 'ab')).toEqual('');
    });


    it('when given separator is null, undefined or empty then sourceString is returned', () => {
      expect(StringUtil.substringBefore('ab', null)).toEqual('ab');
      expect(StringUtil.substringBefore('ab', undefined)).toEqual('ab');
      expect(StringUtil.substringBefore('ab', '')).toEqual('ab');
    });


    it('when given sourceString contains characters but separator does not appear then sourceString is returned', () => {
      expect(StringUtil.substringBefore('a', 'z')).toEqual('a');
      expect(StringUtil.substringBefore('aba', 'bc')).toEqual('aba');
      expect(StringUtil.substringBefore('abcab', 'abd')).toEqual('abcab');
    });


    it('when given sourceString contains separator then the substring before the first occurrence is returned', () => {
      expect(StringUtil.substringBefore('a', 'a')).toEqual('');
      expect(StringUtil.substringBefore('abc', 'c')).toEqual('ab');
      expect(StringUtil.substringBefore('abcb', 'b')).toEqual('a');
      expect(StringUtil.substringBefore('aaaa', 'aa')).toEqual('');
    });

  });



  describe('substringBeforeLast', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.substringBeforeLast(null, null)).toEqual('');
      expect(StringUtil.substringBeforeLast(null, undefined)).toEqual('');
      expect(StringUtil.substringBeforeLast(null, '')).toEqual('');
      expect(StringUtil.substringBeforeLast(null, 'ab')).toEqual('');

      expect(StringUtil.substringBeforeLast(undefined, null)).toEqual('');
      expect(StringUtil.substringBeforeLast(undefined, undefined)).toEqual('');
      expect(StringUtil.substringBeforeLast(undefined, '')).toEqual('');
      expect(StringUtil.substringBeforeLast(undefined, 'ab')).toEqual('');

      expect(StringUtil.substringBeforeLast('', null)).toEqual('');
      expect(StringUtil.substringBeforeLast('', undefined)).toEqual('');
      expect(StringUtil.substringBeforeLast('', '')).toEqual('');
      expect(StringUtil.substringBeforeLast('', 'ab')).toEqual('');
    });


    it('when given separator is null, undefined or empty then sourceString is returned', () => {
      expect(StringUtil.substringBeforeLast('ab', null)).toEqual('ab');
      expect(StringUtil.substringBeforeLast('ab', undefined)).toEqual('ab');
      expect(StringUtil.substringBeforeLast('ab', '')).toEqual('ab');
    });


    it('when given sourceString contains characters but separator does not appear then sourceString is returned', () => {
      expect(StringUtil.substringBeforeLast('a', 'z')).toEqual('a');
      expect(StringUtil.substringBeforeLast('aba', 'bc')).toEqual('aba');
      expect(StringUtil.substringBeforeLast('abcab', 'abd')).toEqual('abcab');
    });


    it('when given sourceString contains separator then the substring before the last occurrence is returned', () => {
      expect(StringUtil.substringBeforeLast('a', 'a')).toEqual('');
      expect(StringUtil.substringBeforeLast('abc', 'c')).toEqual('ab');
      expect(StringUtil.substringBeforeLast('abcb', 'b')).toEqual('abc');
      expect(StringUtil.substringBeforeLast('aaaa', 'aa')).toEqual('aa');
    });

  });



  describe('takeWhile', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      const emptyString = '';

      expect(StringUtil.takeWhile(null, isVowelFPredicate)).toEqual(emptyString);
      expect(StringUtil.takeWhile(undefined, isVowelFPredicate)).toEqual(emptyString);
      expect(StringUtil.takeWhile(emptyString, isVowelFPredicate)).toEqual(emptyString);
    });


    it('when given sourceString is not empty but filterPredicate is null or undefined then sourceString is returned', () => {
      const sourceString = 'aEibc12';

      expect(StringUtil.takeWhile(sourceString, null)).toEqual(sourceString);
      expect(StringUtil.takeWhile(sourceString, undefined)).toEqual(sourceString);
    });


    it('when given sourceString is not empty and filterPredicate is valid then longest prefix of filtered elements is returned', () => {
      const sourceString = 'aEibc12';
      const expectedResult = 'aEi';

      expect(StringUtil.takeWhile(sourceString, isVowelRaw)).toEqual(expectedResult);
    });

  });

});



function verifyMaps(actualMap: Map<any, any>,
                    expectedMap: Map<any, any>) {
  expect(actualMap.size).toEqual(expectedMap.size);
  if (0 < expectedMap.size) {
    for (let [key, value] of actualMap!) {
      expect(expectedMap.has(key)).toBeTrue();
      expect(expectedMap.get(key)).toEqual(value);
    }
  }
}


const isVowelRaw =
  (s: string) =>
    -1 != 'aeiouAEIOU'.indexOf(s);


const isVowelFPredicate: FPredicate1<string> =
  (s: string) =>
    -1 != 'aeiouAEIOU'.indexOf(s);


const add2Raw =
  (s: string) =>
    s + '2';


const add2FFunction: FFunction1<string, string> =
  (s: string) =>
    s + '2';


const identityFUnaryOperator: FUnaryOperator<string> =
  (s: string) =>
    s;


const sumASCIIValuesRaw =
  (n: number, s: string) =>
    n + s.charCodeAt(0);


const sumASCIIValuesFFunction: FFunction2<number, string, number> =
  (n: NullableOrUndefined<number>,
   s: NullableOrUndefined<string>) =>
    n! + s!.charCodeAt(0);


const toStringRaw =
  (n: number) =>
    '' + n;


const toStringFFunction: FFunction1<NullableOrUndefined<number>, string> =
    (n: NullableOrUndefined<number>) =>
      ObjectUtil.isNullOrUndefined(n)
        ? ''
        : '' + n!;
