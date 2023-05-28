import { FFunction0, Function0, isFFunction0 } from '@app-core/types';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/function0.type.spec.ts
 */
describe('isFFunction0', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction0()).toBeFalse();
    expect(isFFunction0(null)).toBeFalse();
    expect(isFFunction0(12)).toBeFalse();
    expect(isFFunction0({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction0((t1: number) => t1)).toBeFalse();
    expect(isFFunction0((t1: number, t2: number) => t1 + t2)).toBeFalse();
    expect(isFFunction0((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction0(() => {})).toBeTrue();
    expect(isFFunction0(() => 1)).toBeTrue();
  });

});




describe('Function0', () => {


  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function0.isFunction()).toBeFalse();
      expect(Function0.isFunction(null)).toBeFalse();
      expect(Function0.isFunction('')).toBeFalse();
      expect(Function0.isFunction(12)).toBeFalse();
      expect(Function0.isFunction({})).toBeFalse();
    });


    it('when a function is provided then true is returned', () => {
      const funcError: Function0<IllegalArgumentError> =
        Function0.of(() => new IllegalArgumentError('errorMessage'));

      const funcString: Function0<string> =
        Function0.of(() => 'message');

      expect(Function0.isFunction(funcError)).toBeTrue();
      expect(Function0.isFunction(funcString)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when an instance of FFunction0 is provided then a valid Function0 is returned', () => {
      const message = 'message';
      const getMessage: FFunction0<string> = () => 'message';

      const func = Function0.of(getMessage);

      expect(Function0.isFunction(func)).toBeTrue();
      expect(func.apply()).toEqual(message);
    });


    it('when an instance of Function0 is provided then the same one is returned', () => {
      const message = 'message';
      const getMessage: Function0<string> = Function0.of(() => 'message');

      const func = Function0.of(getMessage);

      expect(Function0.isFunction(func)).toBeTrue();
      expect(func.apply()).toEqual(message);
    });

  });



  describe('apply', () => {

    it('when a Function0 is provided then a new instance of internal type is returned', () => {
      const errorMessage = 'There is an error';
      const message = 'message';

      const errorInstance = new IllegalArgumentError(errorMessage);

      const funcError: Function0<IllegalArgumentError> = Function0.of(() => errorInstance);
      const funcString: Function0<string> = Function0.of(() => message);

      expect(funcError.apply()).toEqual(errorInstance);
      expect(funcString.apply()).toEqual(message);
    });

  });

});
