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

    it('when given inputToCheck is null, undefined, empty or whitespace then true is returned', () => {
      expect(StringUtil.isBlank(undefined)).toBeTrue();
      expect(StringUtil.isBlank(null)).toBeTrue();
      expect(StringUtil.isBlank('')).toBeTrue();
      expect(StringUtil.isBlank('    ')).toBeTrue();
    });


    it('when given inputToCheck is not empty and no whitespace then false is returned', () => {
      expect(StringUtil.isBlank('112')).toBeFalse();
      expect(StringUtil.isBlank('  a  ')).toBeFalse();
    });

  });



  describe('isEmpty', () => {

    it('when given inputToCheck is null, undefined or empty then true is returned', () => {
      expect(StringUtil.isEmpty(undefined)).toBeTrue();
      expect(StringUtil.isEmpty(null)).toBeTrue();
      expect(StringUtil.isEmpty('')).toBeTrue();
    });


    it('when given inputToCheck is not empty then false is returned', () => {
      expect(StringUtil.isEmpty('    ')).toBeFalse();
      expect(StringUtil.isEmpty('112')).toBeFalse();
      expect(StringUtil.isEmpty('  a  ')).toBeFalse();
    });

  });

});
