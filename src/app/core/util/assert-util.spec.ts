import { AssertUtil } from '@app-core/util';
import { FFunction0, Function0 } from '@app-core/type/function';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/assert-util.spec.ts
 */
describe('AssertUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new AssertUtil()).toThrowError(SyntaxError);
    });

  });



  describe('isTrue', () => {

    it('when given value is null or undefined then an IllegalArgumentError with default message is thrown', () => {
      const nullOrUndefinedErrorMessage = 'value is null or undefined';
      const errorSupplierFF: FFunction0<TypeError> = () => new TypeError('never thrown');
      const errorSupplierF: Function0<TypeError> = Function0.of(() => new TypeError('never thrown'));

      expect(() => AssertUtil.isTrue(undefined)).toThrowError(new IllegalArgumentError(nullOrUndefinedErrorMessage));
      expect(() => AssertUtil.isTrue(null)).toThrowError(new IllegalArgumentError(nullOrUndefinedErrorMessage));

      expect(() => AssertUtil.isTrue(undefined, errorSupplierFF)).toThrowError(new IllegalArgumentError(nullOrUndefinedErrorMessage));
      expect(() => AssertUtil.isTrue(null, errorSupplierFF)).toThrowError(new IllegalArgumentError(nullOrUndefinedErrorMessage));

      expect(() => AssertUtil.isTrue(undefined, errorSupplierF)).toThrowError(new IllegalArgumentError(nullOrUndefinedErrorMessage));
      expect(() => AssertUtil.isTrue(null, errorSupplierF)).toThrowError(new IllegalArgumentError(nullOrUndefinedErrorMessage));
    });


    it('when given value is false and the second parameter should be managed as error message then an IllegalArgumentError is thrown', () => {
      const defaultErrorMessage = 'value is false';
      const errorMessage = 'There is an error';

      expect(() => AssertUtil.isTrue(false)).toThrowError(new IllegalArgumentError(defaultErrorMessage));
      expect(() => AssertUtil.isTrue(false, errorMessage)).toThrowError(new IllegalArgumentError(errorMessage));
    });


    it('when given value is false and the second parameter is a FFunction0 then an specific Error is thrown', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: FFunction0<TypeError> = () => new TypeError(errorMessage);

      expect(() => AssertUtil.isTrue(false, errorSupplier)).toThrowError(new TypeError(errorMessage));
      expect(() => AssertUtil.isTrue(false, () => new TypeError(errorMessage))).toThrowError(new TypeError(errorMessage));
    });


    it('when given value is false and the second parameter is a Function0 then an specific Error is thrown', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: Function0<TypeError> = Function0.of(() => new TypeError(errorMessage));

      expect(() => AssertUtil.isTrue(false, errorSupplier)).toThrowError(new TypeError(errorMessage));
      expect(() => AssertUtil.isTrue(false, errorSupplier)).toThrowError(new TypeError(errorMessage));
    });


    it('when given value is true then this one is returned', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: Function0<TypeError> = Function0.of(() => new TypeError(errorMessage));
      const errorFSupplier: FFunction0<TypeError> = () => new TypeError(errorMessage);

      expect(AssertUtil.isTrue(true)).toBe(true);
      expect(AssertUtil.isTrue(true, errorMessage)).toBe(true);
      expect(AssertUtil.isTrue(true, errorSupplier)).toBe(true);
      expect(AssertUtil.isTrue(true, errorFSupplier)).toBe(true);
    });

  });



  describe('notNullOrUndefined', () => {

    it('when given value is null or undefined and the second parameter should be managed as error message then an IllegalArgumentError is thrown', () => {
      const defaultErrorMessage = 'value is null or undefined';
      const errorMessage = 'There is an error';

      expect(() => AssertUtil.notNullOrUndefined(undefined)).toThrowError(new IllegalArgumentError(defaultErrorMessage));
      expect(() => AssertUtil.notNullOrUndefined(undefined, errorMessage)).toThrowError(new IllegalArgumentError(errorMessage));

      expect(() => AssertUtil.notNullOrUndefined(null)).toThrowError(new IllegalArgumentError(defaultErrorMessage));
      expect(() => AssertUtil.notNullOrUndefined(null, errorMessage)).toThrowError(new IllegalArgumentError(errorMessage));
    });


    it('when given value is null or undefined and the second parameter is a FFunction0 then an specific Error is thrown', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: FFunction0<TypeError> = () => new TypeError(errorMessage);

      expect(() => AssertUtil.notNullOrUndefined(undefined, errorSupplier)).toThrowError(new TypeError(errorMessage));
      expect(() => AssertUtil.notNullOrUndefined(undefined, () => new TypeError(errorMessage))).toThrowError(new TypeError(errorMessage));

      expect(() => AssertUtil.notNullOrUndefined(null, errorSupplier)).toThrowError(new TypeError(errorMessage));
      expect(() => AssertUtil.notNullOrUndefined(null, () => new TypeError(errorMessage))).toThrowError(new TypeError(errorMessage));
    });


    it('when given value is null or undefined and the second parameter is a Function0 then an specific Error is thrown', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: Function0<TypeError> = Function0.of(() => new TypeError(errorMessage));

      expect(() => AssertUtil.notNullOrUndefined(undefined, errorSupplier)).toThrowError(new TypeError(errorMessage));
      expect(() => AssertUtil.notNullOrUndefined(null, errorSupplier)).toThrowError(new TypeError(errorMessage));
    });


    it('when given value is neither null nor undefined then this one is returned', () => {
      const numberForTesting = 10;
      const stringForTesting = 'ForTestPurpose';
      const objectForTesting = { name: 'ForTestPurpose' };

      const errorMessage = 'There is an error';
      const errorSupplier: Function0<TypeError> = Function0.of(() => new TypeError(errorMessage));
      const errorFSupplier: FFunction0<TypeError> = () => new TypeError(errorMessage);

      expect(AssertUtil.notNullOrUndefined(numberForTesting)).toBe(true);
      expect(AssertUtil.notNullOrUndefined(stringForTesting)).toBe(true);
      expect(AssertUtil.notNullOrUndefined(objectForTesting)).toBe(true);
      expect(AssertUtil.notNullOrUndefined(numberForTesting, errorMessage)).toBe(true);
      expect(AssertUtil.notNullOrUndefined(stringForTesting, errorSupplier)).toBe(true);
      expect(AssertUtil.notNullOrUndefined(objectForTesting, errorFSupplier)).toBe(true);
    });

  });

});
