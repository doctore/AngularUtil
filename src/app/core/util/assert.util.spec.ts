import { AssertUtil } from '@app-core/util';
import { FFunction0, Function0 } from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/assert.util.spec.ts
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

      expect(() => AssertUtil.isTrue(undefined)).toThrowError(IllegalArgumentError, nullOrUndefinedErrorMessage);
      expect(() => AssertUtil.isTrue(null)).toThrowError(IllegalArgumentError, nullOrUndefinedErrorMessage);

      expect(() => AssertUtil.isTrue(undefined, errorSupplierFF)).toThrowError(IllegalArgumentError, nullOrUndefinedErrorMessage);
      expect(() => AssertUtil.isTrue(null, errorSupplierFF)).toThrowError(IllegalArgumentError, nullOrUndefinedErrorMessage);

      expect(() => AssertUtil.isTrue(undefined, errorSupplierF)).toThrowError(IllegalArgumentError, nullOrUndefinedErrorMessage);
      expect(() => AssertUtil.isTrue(null, errorSupplierF)).toThrowError(IllegalArgumentError, nullOrUndefinedErrorMessage);
    });


    it('when given value is false and the second parameter should be managed as error message then an IllegalArgumentError is thrown', () => {
      const defaultErrorMessage = 'value is false';
      const errorMessage = 'There is an error';

      expect(() => AssertUtil.isTrue(false)).toThrowError(IllegalArgumentError, defaultErrorMessage);
      expect(() => AssertUtil.isTrue(false, errorMessage)).toThrowError(IllegalArgumentError, errorMessage);
    });


    it('when given value is false and the second parameter is a FFunction0 then an specific Error is thrown', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: FFunction0<TypeError> = () => new TypeError(errorMessage);

      expect(() => AssertUtil.isTrue(false, errorSupplier)).toThrowError(TypeError, errorMessage);
      expect(() => AssertUtil.isTrue(false, () => new TypeError(errorMessage))).toThrowError(TypeError, errorMessage);
    });


    it('when given value is false and the second parameter is a Function0 then an specific Error is thrown', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: Function0<TypeError> = Function0.of(() => new TypeError(errorMessage));

      expect(() => AssertUtil.isTrue(false, errorSupplier)).toThrowError(TypeError, errorMessage);
      expect(() => AssertUtil.isTrue(false, errorSupplier)).toThrowError(TypeError, errorMessage);
    });


    it('when given value is true then this one is returned', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: Function0<TypeError> = Function0.of(() => new TypeError(errorMessage));
      const errorFSupplier: FFunction0<TypeError> = () => new TypeError(errorMessage);

      expect(AssertUtil.isTrue(true)).toBeTrue();
      expect(AssertUtil.isTrue(true, errorMessage)).toBeTrue();
      expect(AssertUtil.isTrue(true, errorSupplier)).toBeTrue();
      expect(AssertUtil.isTrue(true, errorFSupplier)).toBeTrue();
    });

  });



  describe('notNullOrUndefined', () => {

    it('when given value is null or undefined and the second parameter should be managed as error message then an IllegalArgumentError is thrown', () => {
      const defaultErrorMessage = 'value is null or undefined';
      const errorMessage = 'There is an error';

      expect(() => AssertUtil.notNullOrUndefined(undefined)).toThrowError(IllegalArgumentError, defaultErrorMessage);
      expect(() => AssertUtil.notNullOrUndefined(undefined, errorMessage)).toThrowError(IllegalArgumentError, errorMessage);

      expect(() => AssertUtil.notNullOrUndefined(null)).toThrowError(IllegalArgumentError, defaultErrorMessage);
      expect(() => AssertUtil.notNullOrUndefined(null, errorMessage)).toThrowError(IllegalArgumentError, errorMessage);
    });


    it('when given value is null or undefined and the second parameter is a FFunction0 then an specific Error is thrown', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: FFunction0<TypeError> = () => new TypeError(errorMessage);

      expect(() => AssertUtil.notNullOrUndefined(undefined, errorSupplier)).toThrowError(TypeError, errorMessage);
      expect(() => AssertUtil.notNullOrUndefined(undefined, () => new TypeError(errorMessage))).toThrowError(TypeError, errorMessage);

      expect(() => AssertUtil.notNullOrUndefined(null, errorSupplier)).toThrowError(TypeError, errorMessage);
      expect(() => AssertUtil.notNullOrUndefined(null, () => new TypeError(errorMessage))).toThrowError(TypeError, errorMessage);
    });


    it('when given value is null or undefined and the second parameter is a Function0 then an specific Error is thrown', () => {
      const errorMessage = 'There is an error';
      const errorSupplier: Function0<TypeError> = Function0.of(() => new TypeError(errorMessage));

      expect(() => AssertUtil.notNullOrUndefined(undefined, errorSupplier)).toThrowError(TypeError, errorMessage);
      expect(() => AssertUtil.notNullOrUndefined(null, errorSupplier)).toThrowError(TypeError, errorMessage);
    });


    it('when given value is neither null nor undefined then this one is returned', () => {
      const numberForTesting = 10;
      const stringForTesting = 'ForTestPurpose';
      const objectForTesting = { name: 'ForTestPurpose' };

      const errorMessage = 'There is an error';
      const errorSupplier: Function0<TypeError> = Function0.of(() => new TypeError(errorMessage));
      const errorFSupplier: FFunction0<TypeError> = () => new TypeError(errorMessage);

      expect(AssertUtil.notNullOrUndefined(numberForTesting)).toBeTrue();
      expect(AssertUtil.notNullOrUndefined(stringForTesting)).toBeTrue();
      expect(AssertUtil.notNullOrUndefined(objectForTesting)).toBeTrue();
      expect(AssertUtil.notNullOrUndefined(numberForTesting, errorMessage)).toBeTrue();
      expect(AssertUtil.notNullOrUndefined(stringForTesting, errorSupplier)).toBeTrue();
      expect(AssertUtil.notNullOrUndefined(objectForTesting, errorFSupplier)).toBeTrue();
    });

  });

});
