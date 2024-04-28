import { NullableOrUndefined } from '@app-core/types';
import { FFunction1, Function1, Function2, isFFunction1 } from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/function1.type.spec.ts
 */
describe('isFFunction1', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction1()).toBeFalse();
    expect(isFFunction1(null)).toBeFalse();
    expect(isFFunction1(12)).toBeFalse();
    expect(isFFunction1({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction1((t1: number, t2: number) => t1 + t2)).toBeFalse();
    expect(isFFunction1((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction1((t1: number) => {})).toBeTrue();
    expect(isFFunction1((t1: number) => t1 + 1)).toBeTrue();
  });

});




describe('Function1', () => {


  describe('identity', () => {

    it('when an input parameter is used then such parameter is returned', () => {
      const identityFunction: Function1<string, NullableOrUndefined<string>> = Function1.identity();

      expect(identityFunction.apply('12')).toEqual('12');
      expect(identityFunction.apply('abc')).toEqual('abc');
    });

  });



  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function1.isFunction()).toBeFalse();
      expect(Function1.isFunction(null)).toBeFalse();
      expect(Function1.isFunction('')).toBeFalse();
      expect(Function1.isFunction(12)).toBeFalse();
      expect(Function1.isFunction({})).toBeFalse();
      expect(Function1.isFunction({ apply: (n: number) => n*2 })).toBeFalse();
    });


    it('when provided function is different than Function1 then false is returned', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      expect(Function1.isFunction(stringLengthPlusNumber)).toBeFalse();
    });


    it('when a Function1 is provided then true is returned', () => {
      expect(Function1.isFunction(stringLengthFunction)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Function1.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Function1.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction1 is provided then a valid Function1 is returned', () => {
      const func = Function1.of(stringLengthRaw);

      expect(Function1.isFunction(func)).toBeTrue();
      expect(func.apply('abc')).toEqual(3);
    });


    it('when an instance of FFunction1 is provided then a valid Function1 is returned', () => {
      const func = Function1.of(stringLengthFFunction);

      expect(Function1.isFunction(func)).toBeTrue();
      expect(func.apply('abc')).toEqual(3);
    });


    it('when an instance of Function1 is provided then the same one is returned', () => {
      const func = Function1.of(stringLengthFunction);

      expect(Function1.isFunction(func)).toBeTrue();
      expect(func.apply('abc')).toEqual(3);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const mapper: FFunction1<string, number> = stringLengthFunction.getMapper();

      expect(mapper('abc')).toEqual(3);
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => stringLengthFunction.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthFunction.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction1 is provided then it will be applied after current one', () => {
      const stringLengthAndThenMultiply2 = stringLengthFunction.andThen(multiply2Raw);

      expect(stringLengthAndThenMultiply2.apply('0')).toEqual(2);
      expect(stringLengthAndThenMultiply2.apply('abc')).toEqual(6);
    });


    it('when a FFunction1 is provided then it will be applied after current one', () => {
      const stringLengthAndThenMultiply2 = stringLengthFunction.andThen(multiply2FFunction);

      expect(stringLengthAndThenMultiply2.apply('0')).toEqual(2);
      expect(stringLengthAndThenMultiply2.apply('abc')).toEqual(6);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const stringLengthAndThenMultiply2 = stringLengthFunction.andThen(multiply2Function);

      expect(stringLengthAndThenMultiply2.apply('0')).toEqual(2);
      expect(stringLengthAndThenMultiply2.apply('abc')).toEqual(6);
    });

  });



  describe('apply', () => {

    it('when a Function1 is provided then the received input will be transformed', () => {
      expect(stringLengthFunction.apply('abc')).toEqual(3);
      expect(multiply2Function.apply(11)).toEqual(22);
    });

  });


  describe('compose', () => {

    it('when null or undefined before is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => stringLengthFunction.compose(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthFunction.compose(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction1 is provided then it will be applied before current one', () => {
      const multiply2ComposeStringLength = multiply2Function.compose(stringLengthRaw);

      expect(multiply2ComposeStringLength.apply('ab')).toEqual(4);
      expect(multiply2ComposeStringLength.apply('12345')).toEqual(10);
    });


    it('when a FFunction1 is provided then it will be applied before current one', () => {
      const multiply2ComposeStringLength = multiply2Function.compose(stringLengthFFunction);

      expect(multiply2ComposeStringLength.apply('ab')).toEqual(4);
      expect(multiply2ComposeStringLength.apply('12345')).toEqual(10);
    });


    it('when a Function1 is provided then it will be applied before current one', () => {
      const multiply2ComposeStringLength = multiply2Function.compose(stringLengthFunction);

      expect(multiply2ComposeStringLength.apply('ab')).toEqual(4);
      expect(multiply2ComposeStringLength.apply('12345')).toEqual(10);
    });

  });

});



const stringLengthRaw =
  (s: NullableOrUndefined<string>) =>
    s!.length;


const stringLengthFFunction: FFunction1<string, number> =
  (s: NullableOrUndefined<string>) =>
    s!.length;


const stringLengthFunction: Function1<string, number> =
  Function1.of(
    (s: NullableOrUndefined<string>) =>
      s!.length
  );


const multiply2Raw =
  (n: number) =>
    2 * n;


const multiply2FFunction: FFunction1<number, number> =
  (n: number) =>
    2 * n;


const multiply2Function: Function1<number, number> =
  Function1.of(
    (n: number) =>
      2 * n
  );
