import { NumberUtil } from '@app-core/util';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/number.util.spec.ts
 */
describe('NumberUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new NumberUtil()).toThrowError(SyntaxError);
    });

  });



  describe('isValidFloat', () => {

    it('when given inputToCheck is undefined or null then false is returned', () => {
      const expectedResult = false;

      expect(NumberUtil.isValidFloat()).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(null)).toEqual(expectedResult);
    });


    it('when given inputToCheck is an empty string then false is returned', () => {
      const expectedResult = false;

      expect(NumberUtil.isValidFloat('')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('   ')).toEqual(expectedResult);
    });


    it('when given inputToCheck is not a valid float then false is returned', () => {
      const expectedResult = false;

      expect(NumberUtil.isValidFloat('1..1')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('abc')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('2Ee')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('1.13aebc')).toEqual(expectedResult);
    });


    it('when given inputToCheck is a valid float then true is returned', () => {
      const expectedResult = true;

      expect(NumberUtil.isValidFloat('   0   ')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('1')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('-11')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('12.321')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('-0.431')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('1,000,000')).toEqual(expectedResult);

      expect(NumberUtil.isValidFloat(0)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(1)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(-11)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(12.321)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(-0.431)).toEqual(expectedResult);
    });

  });



  describe('isValidInt', () => {

    it('when given inputToCheck is undefined or null then false is returned', () => {
      const expectedResult = false;

      expect(NumberUtil.isValidInt()).toEqual(expectedResult);
      expect(NumberUtil.isValidInt(null)).toEqual(expectedResult);
    });


    it('when given inputToCheck is an empty string then false is returned', () => {
      const expectedResult = false;

      expect(NumberUtil.isValidInt('')).toEqual(expectedResult);
      expect(NumberUtil.isValidInt('   ')).toEqual(expectedResult);
    });


    it('when given inputToCheck is not a valid integer then false is returned', () => {
      const expectedResult = false;

      expect(NumberUtil.isValidInt('1..1')).toEqual(expectedResult);
      expect(NumberUtil.isValidInt('3.4')).toEqual(expectedResult);
      expect(NumberUtil.isValidInt('abc')).toEqual(expectedResult);
      expect(NumberUtil.isValidInt('2Ee')).toEqual(expectedResult);
      expect(NumberUtil.isValidInt('1.13aebc')).toEqual(expectedResult);
      expect(NumberUtil.isValidInt(1.13)).toEqual(expectedResult);
      expect(NumberUtil.isValidInt(-21.01)).toEqual(expectedResult);
    });


    it('when given inputToCheck is a valid integer then true is returned', () => {
      const expectedResult = true;

      expect(NumberUtil.isValidInt('   0   ')).toEqual(expectedResult);
      expect(NumberUtil.isValidInt('1')).toEqual(expectedResult);
      expect(NumberUtil.isValidInt('-12')).toEqual(expectedResult);

      expect(NumberUtil.isValidInt(0)).toEqual(expectedResult);
      expect(NumberUtil.isValidInt(1)).toEqual(expectedResult);
      expect(NumberUtil.isValidInt(-12)).toEqual(expectedResult);
    });

  });



  describe('toFloatWithFixedPointNotation', () => {

    it('when given inputToFix is undefined or null then undefined is returned', () => {
      expect(NumberUtil.toFloatWithFixedPointNotation()).toBeUndefined();
      expect(NumberUtil.toFloatWithFixedPointNotation(null )).toBeUndefined();

      expect(NumberUtil.toFloatWithFixedPointNotation(undefined, 1)).toBeUndefined();
      expect(NumberUtil.toFloatWithFixedPointNotation(null, 2 )).toBeUndefined();
    });


    it('when given inputToFix is not a valid float then undefined string is returned', () => {
      expect(NumberUtil.toFloatWithFixedPointNotation('1..1')).toBeUndefined();
      expect(NumberUtil.toFloatWithFixedPointNotation('abc')).toBeUndefined();
      expect(NumberUtil.toFloatWithFixedPointNotation('2Ee')).toBeUndefined();
      expect(NumberUtil.toFloatWithFixedPointNotation('1.13aebc')).toBeUndefined();

      expect(NumberUtil.toFloatWithFixedPointNotation('1..1', 1)).toBeUndefined();
      expect(NumberUtil.toFloatWithFixedPointNotation('abc', 2)).toBeUndefined();
      expect(NumberUtil.toFloatWithFixedPointNotation('2Ee', 3)).toBeUndefined();
      expect(NumberUtil.toFloatWithFixedPointNotation('1.13aebc', 4)).toBeUndefined();
    });


    it('when given inputToFix is a valid float but fixedPoints is not provided or negative then 2 decimal representation of inputToFix is returned', () => {
      expect(NumberUtil.toFloatWithFixedPointNotation('1.1')).toEqual('1.10');
      expect(NumberUtil.toFloatWithFixedPointNotation('0')).toEqual('0.00');
      expect(NumberUtil.toFloatWithFixedPointNotation('-21.132')).toEqual('-21.13');

      expect(NumberUtil.toFloatWithFixedPointNotation(1.1, -1)).toEqual('1.10');
      expect(NumberUtil.toFloatWithFixedPointNotation(0, -2)).toEqual('0.00');
      expect(NumberUtil.toFloatWithFixedPointNotation(-21.132, -3)).toEqual('-21.13');
    });


    it('when given inputToFix and fixedPoints are valid then right string representation is returned', () => {
      expect(NumberUtil.toFloatWithFixedPointNotation('1.1', 1)).toEqual('1.1');
      expect(NumberUtil.toFloatWithFixedPointNotation('0', 2)).toEqual('0.00');
      expect(NumberUtil.toFloatWithFixedPointNotation('-21.132', 3)).toEqual('-21.132');

      expect(NumberUtil.toFloatWithFixedPointNotation(1.1, 1)).toEqual('1.1');
      expect(NumberUtil.toFloatWithFixedPointNotation(0, 2)).toEqual('0.00');
      expect(NumberUtil.toFloatWithFixedPointNotation(-21.132, 3)).toEqual('-21.132');
    });

  });

});
