import { NullableOrUndefined } from '@app-core/types';
import { FFunction1, FFunction2, Function1, Function2, isFFunction2 } from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/function2.type.spec.ts
 */
describe('isFFunction2', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction2()).toBeFalse();
    expect(isFFunction2(null)).toBeFalse();
    expect(isFFunction2(12)).toBeFalse();
    expect(isFFunction2({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction2((t1: number) => t1 + 1)).toBeFalse();
    expect(isFFunction2((t1: string, t2: string, t3: string) => t1 + t2 + t3)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction2((t1: string, t2: string) => t1 + t2)).toBeTrue();
    expect(isFFunction2((t1: string, t2: string) => {})).toBeTrue();
  });

});




describe('Function2', () => {


  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function2.isFunction()).toBeFalse();
      expect(Function2.isFunction(null)).toBeFalse();
      expect(Function2.isFunction('')).toBeFalse();
      expect(Function2.isFunction(12)).toBeFalse();
      expect(Function2.isFunction({})).toBeFalse();
      expect(Function2.isFunction({ apply: (s: string, n: number) => s.length + n })).toBeFalse();
    });


    it('when a function is provided then true is returned', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      expect(Function2.isFunction(stringLengthPlusNumber)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Function2.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Function2.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction2 is provided then a valid Function2 is returned', () => {
      const stringLengthPlusNumber = (s: NullableOrUndefined<string>, n: NullableOrUndefined<number>) => s!.length + n!;

      const func = Function2.of(stringLengthPlusNumber);

      expect(Function2.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10)).toEqual(13);
    });


    it('when an instance of FFunction2 is provided then a valid Function2 is returned', () => {
      const stringLengthPlusNumber: FFunction2<string, number, number> =
        (s: NullableOrUndefined<string>, n: NullableOrUndefined<number>) => s!.length + n!;

      const func = Function2.of(stringLengthPlusNumber);

      expect(Function2.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10)).toEqual(13);
    });


    it('when an instance of Function2 is provided then the same one is returned', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      const func = Function2.of(stringLengthPlusNumber);

      expect(Function2.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10)).toEqual(13);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      const mapper: FFunction2<string, number, number> = stringLengthPlusNumber.getMapper();

      expect(mapper('', 2)).toEqual(2);
      expect(mapper('abc', 5)).toEqual(8);
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      // @ts-ignore
      expect(() => stringLengthPlusNumber.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthPlusNumber.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      const multiply2 = (n: number) => 2 * n;

      const stringLengthPlusNumberAndThenMultiply2 = stringLengthPlusNumber.andThen(multiply2);

      expect(stringLengthPlusNumberAndThenMultiply2.apply('0', 2)).toEqual(6);
      expect(stringLengthPlusNumberAndThenMultiply2.apply('abc', 4)).toEqual(14);
    });


    it('when a FFunction1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      const multiply2: FFunction1<number, number> =
        (n: number) => 2 * n;

      const stringLengthPlusNumberAndThenMultiply2 = stringLengthPlusNumber.andThen(multiply2);

      expect(stringLengthPlusNumberAndThenMultiply2.apply('0', 2)).toEqual(6);
      expect(stringLengthPlusNumberAndThenMultiply2.apply('abc', 4)).toEqual(14);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: NullableOrUndefined<string>, n: NullableOrUndefined<number>) => s!.length + n!);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const stringLengthPlusNumberAndThenMultiply2 = stringLengthPlusNumber.andThen(multiply2);

      expect(stringLengthPlusNumberAndThenMultiply2.apply('0', 2)).toEqual(6);
      expect(stringLengthPlusNumberAndThenMultiply2.apply('abc', 4)).toEqual(14);
    });

  });



  describe('apply', () => {

    it('when a Function2 is provided then the received input will be transformed', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      expect(stringLengthPlusNumber.apply('', 2)).toEqual(2);
      expect(stringLengthPlusNumber.apply('abc', 5)).toEqual(8);
    });

  });

});
