import { NullableOrUndefined } from '@app-core/types';
import {
  FFunction1,
  FFunction3,
  Function1,
  Function2,
  Function3,
  isFFunction3
} from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/function3.type.spec.ts
 */
describe('isFFunction3', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction3()).toBeFalse();
    expect(isFFunction3(null)).toBeFalse();
    expect(isFFunction3(12)).toBeFalse();
    expect(isFFunction3({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction3((t1: string) => t1)).toBeFalse();
    expect(isFFunction3((t1: string, t2: string) => t1 + t2)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction3((t1: string, t2: string, t3: string) => {})).toBeTrue();
    expect(isFFunction3((t1: string, t2: string, t3: string) => t1 + t2 + t3)).toBeTrue();
  });

});




describe('Function3', () => {


  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function3.isFunction()).toBeFalse();
      expect(Function3.isFunction(null)).toBeFalse();
      expect(Function3.isFunction('')).toBeFalse();
      expect(Function3.isFunction(12)).toBeFalse();
      expect(Function3.isFunction({})).toBeFalse();
      expect(Function3.isFunction({ apply: (s: string, n1: number, n2: number) => s.length + n1 + n2 })).toBeFalse();
    });


    it('when provided function is different than Function3 then false is returned', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      expect(Function3.isFunction(stringLengthPlusNumber)).toBeFalse();
    });


    it('when a Function3 is provided then true is returned', () => {
      expect(Function3.isFunction(stringLengthPlusNumbersFunction)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Function3.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Function3.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction3 is provided then a valid Function3 is returned', () => {
      const func = Function3.of(stringLengthPlusNumbersRaw);

      expect(Function3.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8)).toEqual(21);
    });


    it('when an instance of FFunction3 is provided then a valid Function3 is returned', () => {
      const func = Function3.of(stringLengthPlusNumbersFFunction);

      expect(Function3.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8)).toEqual(21);
    });


    it('when an instance of Function3 is provided then the same one is returned', () => {
      const func = Function3.of(stringLengthPlusNumbersFunction);

      expect(Function3.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8)).toEqual(21);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const mapper: FFunction3<string, number, number, number> = stringLengthPlusNumbersFunction.getMapper();

      expect(mapper('', 2, 7)).toEqual(9);
      expect(mapper('abc', 5, 11)).toEqual(19);
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => stringLengthPlusNumbersFunction.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthPlusNumbersFunction.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction1 is provided then it will be applied after current one', () => {
      const multiply2 = (n: NullableOrUndefined<number>) => 2 * n!;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbersFunction.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5)).toEqual(16);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2)).toEqual(18);
    });


    it('when a FFunction1 is provided then it will be applied after current one', () => {
      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbersFunction.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5)).toEqual(16);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2)).toEqual(18);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbersFunction.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5)).toEqual(16);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2)).toEqual(18);
    });

  });



  describe('apply', () => {

    it('when a Function3 is provided then the received input will be transformed', () => {
      expect(stringLengthPlusNumbersFunction.apply('', 2, 7)).toEqual(9);
      expect(stringLengthPlusNumbersFunction.apply('abc', 5, 11)).toEqual(19);
    });

  });

});



const stringLengthPlusNumbersRaw =
  (s: string,
   n1: number,
   n2: number) =>
    s.length + n1 + n2;


const stringLengthPlusNumbersFFunction: FFunction3<string, number, number, number> =
  (s: string,
   n1: number,
   n2: number) =>
    s.length + n1 + n2;


const stringLengthPlusNumbersFunction: Function3<string, number, number, number> =
  Function3.of(
    (s: string,
     n1: number,
     n2: number) =>
      s.length + n1 + n2
  );
