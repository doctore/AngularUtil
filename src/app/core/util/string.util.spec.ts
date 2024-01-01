import {ObjectUtil, StringUtil} from '@app-core/util';
import { IllegalArgumentError } from '@app-core/errors';
import {FFunction1} from "@app-core/types/function";
import {NullableOrUndefined} from "@app-core/types";

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
      expect(StringUtil.abbreviate(undefined, 0)).toEqual('');
      expect(StringUtil.abbreviate(undefined, 0, undefined)).toEqual('');
      expect(StringUtil.abbreviate(undefined, 2, '.')).toEqual('');
      expect(StringUtil.abbreviate(null, 0, null)).toEqual('');
      expect(StringUtil.abbreviate(null, 5, '...')).toEqual('');
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
      expect(StringUtil.abbreviateMiddle(undefined, 0)).toEqual('');
      expect(StringUtil.abbreviateMiddle(undefined, 0, undefined)).toEqual('');
      expect(StringUtil.abbreviateMiddle(undefined, 2, '.')).toEqual('');
      expect(StringUtil.abbreviateMiddle(null, 0, null)).toEqual('');
      expect(StringUtil.abbreviateMiddle(null, 5, '...')).toEqual('');
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



  describe('hideMiddle', () => {

    it('when given sourceString is null, undefined or empty then empty string is returned', () => {
      expect(StringUtil.hideMiddle(undefined, 0)).toEqual('');
      expect(StringUtil.hideMiddle(undefined, 0, undefined)).toEqual('');
      expect(StringUtil.hideMiddle(undefined, 2, '.')).toEqual('');
      expect(StringUtil.hideMiddle(null, 0, null)).toEqual('');
      expect(StringUtil.hideMiddle(null, 5, '...')).toEqual('');
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
      const toString = (n: number) => '' + n;

      expect(StringUtil.join(undefined, toString)).toEqual(expectedResult);
      expect(StringUtil.join(null, toString)).toEqual(expectedResult);
      expect(StringUtil.join([], toString)).toEqual(expectedResult);
    });


    it('when given sourceArray has elements but neither separator nor filterPredicate is provided then the string of all elements is returned', () => {
      const sourceArray: NullableOrUndefined<number>[] = [1, 2, 3, null, 6, undefined, 7];
      const toString: FFunction1<NullableOrUndefined<number>, string> =
        (n: NullableOrUndefined<number>) =>
          ObjectUtil.isNullOrUndefined(n)
            ? ''
            : '' + n!;

      expect(StringUtil.join(sourceArray, toString)).toEqual('12367');
    });


    it('when given sourceArray has elements, a separator and filterPredicate are provided then the string of all elements is returned', () => {
      const sourceArray: NullableOrUndefined<number>[] = [1, 2, null, 66, 5, undefined, 78, 99];
      const toString: FFunction1<NullableOrUndefined<number>, string> =
          (n: NullableOrUndefined<number>) =>
              ObjectUtil.isNullOrUndefined(n)
                  ? ''
                  : '' + n!;

      const isNullOrUndefinedOrOdd = (n: NullableOrUndefined<number>) =>
          ObjectUtil.isNullOrUndefined(n) || 1 == n % 2;

      const separator = ';';

      expect(StringUtil.join(sourceArray, toString, isNullOrUndefinedOrOdd, separator)).toEqual('1;;5;;99');
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

});
