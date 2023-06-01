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



  describe('isEmpty', () => {

    it('when given inputToCheck is null or undefined then true is returned', () => {
      expect(StringUtil.isEmpty()).toBeTrue();
      expect(StringUtil.isEmpty(undefined)).toBeTrue();
      expect(StringUtil.isEmpty(null)).toBeTrue();
    });


    it('when given inputToCheck is empty or has only blank characters then true is returned', () => {
      expect(StringUtil.isEmpty('')).toBeTrue();
      expect(StringUtil.isEmpty('    ')).toBeTrue();
    });


    it('when given inputToCheck is not empty then false is returned', () => {
      expect(StringUtil.isEmpty('112')).toBeFalse();
      expect(StringUtil.isEmpty('  a  ')).toBeFalse();
    });

  });

});
