import { AssertUtil } from '@app-core/util';
import { IllegalArgumentError } from '@app-core/errors';
import { FFunction0, Function0 } from '@app-core/types';

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
