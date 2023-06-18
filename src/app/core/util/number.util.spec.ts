import { NumberUtil } from '@app-core/util';
import { IllegalArgumentError } from '@app-core/errors';

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



  describe('compare', () => {

    it('when one and two are null or undefined then 0 is returned', () => {
      const expectedResult = 0;

      expect(NumberUtil.compare(undefined, undefined)).toEqual(expectedResult);
      expect(NumberUtil.compare(undefined, null)).toEqual(expectedResult);
      expect(NumberUtil.compare(null, undefined )).toEqual(expectedResult);
      expect(NumberUtil.compare(null, null)).toEqual(expectedResult);

      expect(NumberUtil.compare(undefined, undefined, 0.2)).toEqual(expectedResult);
      expect(NumberUtil.compare(undefined, null, 0.1)).toEqual(expectedResult);
      expect(NumberUtil.compare(null, undefined, 0.3)).toEqual(expectedResult);
      expect(NumberUtil.compare(null, null, 0.4)).toEqual(expectedResult);
    });


    it('when one is null or undefined but two does not then -1 is returned', () => {
      const expectedResult = -1;

      expect(NumberUtil.compare(undefined, 12)).toEqual(expectedResult);
      expect(NumberUtil.compare(null, '11')).toEqual(expectedResult);

      expect(NumberUtil.compare(undefined, 12, 0.1)).toEqual(expectedResult);
      expect(NumberUtil.compare(null, '11', 0.2)).toEqual(expectedResult);
    });


    it('when one has a value but two is null or undefined then 1 is returned', () => {
      const expectedResult = 1;

      expect(NumberUtil.compare(9, undefined)).toEqual(expectedResult);
      expect(NumberUtil.compare('8', null)).toEqual(expectedResult);

      expect(NumberUtil.compare(9, undefined, 0.1)).toEqual(expectedResult);
      expect(NumberUtil.compare('8', null, 0.1)).toEqual(expectedResult);
    });


    it('when one and two has a value but not a valid float then an error is thrown', () => {
      expect(() => NumberUtil.compare('a', 'b')).toThrowError(IllegalArgumentError);
      expect(() => NumberUtil.compare(12, '1...1')).toThrowError(IllegalArgumentError);
      expect(() => NumberUtil.compare('h21', '1.1')).toThrowError(IllegalArgumentError);

      expect(() => NumberUtil.compare('u', '1b', 0.1)).toThrowError(IllegalArgumentError);
      expect(() => NumberUtil.compare(11, '3Ee', 0.2)).toThrowError(IllegalArgumentError);
      expect(() => NumberUtil.compare('2..1', '-2.3', 0.3)).toThrowError(IllegalArgumentError);
    });


    it('when one and two has a valid value and are equals taking into account provided epsilon then 0 is returned', () => {
      const expectedResult = 0;

      expect(NumberUtil.compare(9, 9)).toEqual(expectedResult);
      expect(NumberUtil.compare('-8.12', '-8.12')).toEqual(expectedResult);

      expect(NumberUtil.compare(-11.143, -11.144, 0.01)).toEqual(expectedResult);
      expect(NumberUtil.compare('19.5433', '19.5439', 0.001)).toEqual(expectedResult);
    });


    it('when one and two has a valid value but one is lower than two taking into account provided epsilon then -1 is returned', () => {
      const expectedResult = -1;

      expect(NumberUtil.compare(9, 10)).toEqual(expectedResult);
      expect(NumberUtil.compare('-8.13', '-8.12')).toEqual(expectedResult);

      expect(NumberUtil.compare(-11.144, -11.143, 0.0009)).toEqual(expectedResult);
      expect(NumberUtil.compare('19.5433', '19.5439', 0.00009)).toEqual(expectedResult);
    });


    it('when one and two has a valid value but one is greater than two taking into account provided epsilon then 1 is returned', () => {
      const expectedResult = 1;

      expect(NumberUtil.compare(11, 10)).toEqual(expectedResult);
      expect(NumberUtil.compare('-7.50', '-7.55')).toEqual(expectedResult);

      expect(NumberUtil.compare(-11.143, -11.144, 0.0009)).toEqual(expectedResult);
      expect(NumberUtil.compare('19.5439', '19.5433', 0.00009)).toEqual(expectedResult);
    });

  });



  describe('isValidFloat', () => {

    it('when given inputToCheck is undefined or null then false is returned', () => {
      const expectedResult = false;

      expect(NumberUtil.isValidFloat(undefined)).toEqual(expectedResult);
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
      expect(NumberUtil.isValidFloat('-7.50')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('00127.654')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('1,000,000')).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat('2E3')).toEqual(expectedResult);

      expect(NumberUtil.isValidFloat(0)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(1)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(-11)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(12.321)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(-7.50)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(-0.431)).toEqual(expectedResult);
      expect(NumberUtil.isValidFloat(2E3)).toEqual(expectedResult);
    });

  });



  describe('isValidInt', () => {

    it('when given inputToCheck is undefined or null then false is returned', () => {
      const expectedResult = false;

      expect(NumberUtil.isValidInt(undefined)).toEqual(expectedResult);
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
      expect(NumberUtil.isValidInt('00123')).toEqual(expectedResult);
      expect(NumberUtil.isValidInt('1,000,000')).toEqual(expectedResult);

      expect(NumberUtil.isValidInt(0)).toEqual(expectedResult);
      expect(NumberUtil.isValidInt(1)).toEqual(expectedResult);
      expect(NumberUtil.isValidInt(-12)).toEqual(expectedResult);
    });

  });



  describe('toFloatWithFixedPointNotation', () => {

    it('when given inputToFix is undefined or null then undefined is returned', () => {
      expect(NumberUtil.toFloatWithFixedPointNotation(undefined, undefined)).toBeUndefined();
      expect(NumberUtil.toFloatWithFixedPointNotation(null, null )).toBeUndefined();

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
