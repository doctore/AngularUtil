import { FFunction0, Function0, Function1, isFFunction0 } from '@app-core/type/function';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/function/function0.type.spec.ts
 */
describe('isFFunction0', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction0()).toBe(false);
    expect(isFFunction0(null)).toBe(false);
    expect(isFFunction0(12)).toBe(false);
    expect(isFFunction0({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction0((t1: number) => t1)).toBe(false);
    expect(isFFunction0((t1: number, t2: number) => t1 + t2)).toBe(false);
    expect(isFFunction0((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction0(() => {})).toBe(true);
    expect(isFFunction0(() => 1)).toBe(true);
  });

});




describe('Function0', () => {


  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function0.isFunction()).toBe(false);
      expect(Function0.isFunction(null)).toBe(false);
      expect(Function0.isFunction('')).toBe(false);
      expect(Function0.isFunction(12)).toBe(false);
      expect(Function0.isFunction({})).toBe(false);
    });


    it('when provided function is different than Function0 then false is returned', () => {
      const stringLength: Function1<string, number> =
        Function1.of((s: string) => s.length);

      expect(Function0.isFunction(stringLength)).toBe(false);
    });


    it('when a Function0 is provided then true is returned', () => {
      const funcError: Function0<IllegalArgumentError> =
        Function0.of(() => new IllegalArgumentError('errorMessage'));

      const funcString: Function0<string> =
        Function0.of(() => 'message');

      expect(Function0.isFunction(funcError)).toBe(true);
      expect(Function0.isFunction(funcString)).toBe(true);
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Function0.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Function0.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction0 is provided then a valid Function0 is returned', () => {
      const message = 'message';
      const getMessage = () => 'message';

      const func = Function0.of(getMessage);

      expect(Function0.isFunction(func)).toBe(true);
      expect(func.apply()).toEqual(message);
    });


    it('when an instance of FFunction0 is provided then a valid Function0 is returned', () => {
      const message = 'message';
      const getMessage: FFunction0<string> = () => 'message';

      const func = Function0.of(getMessage);

      expect(Function0.isFunction(func)).toBe(true);
      expect(func.apply()).toEqual(message);
    });


    it('when an instance of Function0 is provided then the same one is returned', () => {
      const message = 'message';
      const getMessage: Function0<string> = Function0.of(() => 'message');

      const func = Function0.of(getMessage);

      expect(Function0.isFunction(func)).toBe(true);
      expect(func.apply()).toEqual(message);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const message = 'message';
      const funcString: Function0<string> = Function0.of(() => message);

      const mapper = funcString.getMapper();

      expect(mapper()).toEqual(message);
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
