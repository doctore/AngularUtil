import { StringUtil } from '@app-core/util';

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



  describe('sliding', () => {

    it('when given sourceString is null, undefined or empty then empty array is returned', () => {
      const expectedResult: string[] = [];

      expect(StringUtil.sliding(undefined, 1)).toEqual(expectedResult);
      expect(StringUtil.sliding(null, 1)).toEqual(expectedResult);
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
