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


    it('when given sourceString contains a not empty string but size is null, undefined then an array with one element containing sourceString is returned', () => {
      const sourceString = 'abc';
      const expectedResult: string[] = [sourceString];

      // @ts-ignore
      expect(StringUtil.sliding(sourceString, null)).toEqual(expectedResult);
      // @ts-ignore
      expect(StringUtil.sliding(sourceString, undefined)).toEqual(expectedResult);
    });


    it('when given sourceString contains a not empty string but size is lower than zero or greater than sourceString.length then an array with one element containing sourceString is returned', () => {
      const sourceString = 'abc';
      const expectedResult: string[] = [sourceString];

      expect(StringUtil.sliding(sourceString, -1)).toEqual(expectedResult);
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

});
