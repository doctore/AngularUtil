import { FFunction1, FFunction5, Function1, Function5, isFFunction5 } from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/function5.type.spec.ts
 */
describe('isFFunction5', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction5()).toBeFalse();
    expect(isFFunction5(null)).toBeFalse();
    expect(isFFunction5(12)).toBeFalse();
    expect(isFFunction5({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction5((t1: string) => t1)).toBeFalse();
    expect(isFFunction5((t1: string, t2: string) => t1 + t2)).toBeFalse();
    expect(isFFunction5((t1: string, t2: string, t3: string) => t1 + t2 + t3)).toBeFalse();
    expect(isFFunction5((t1: string, t2: string, t3: string, t4: string) => t1 + t2 + t3 + t4)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction5((t1: string, t2: string, t3: string, t4: string, t5: string) => {})).toBeTrue();
    expect(isFFunction5((t1: string, t2: string, t3: string, t4: string, t5: string) => t1 + t2 + t3 + t4 + t5)).toBeTrue();
  });

});




describe('Function5', () => {


  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function5.isFunction()).toBeFalse();
      expect(Function5.isFunction(null)).toBeFalse();
      expect(Function5.isFunction('')).toBeFalse();
      expect(Function5.isFunction(12)).toBeFalse();
      expect(Function5.isFunction({})).toBeFalse();
      expect(Function5.isFunction({ apply: (s: string, n1: number, n2: number) => s.length + n1 + n2 })).toBeFalse();
    });


    it('when a function is provided then true is returned', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: string, n1: number, n2: number, n3: number, n4: number) =>
          s.length + n1 + n2 + n3 + n4);

      expect(Function5.isFunction(stringLengthPlusNumbers)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Function5.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Function5.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction5 is provided then a valid Function5 is returned', () => {
      const stringLengthPlusNumbers = (s: string, n1: number, n2: number, n3: number, n4: number) => s.length + n1 + n2 + n3 + n4;

      const func = Function5.of(stringLengthPlusNumbers);

      expect(Function5.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0)).toEqual(20);
    });


    it('when an instance of FFunction5 is provided then a valid Function5 is returned', () => {
      const stringLengthPlusNumbers: FFunction5<string, number, number, number, number, number> =
        (s: string, n1: number, n2: number, n3: number, n4: number) =>
          s.length + n1 + n2 + n3 + n4;

      const func = Function5.of(stringLengthPlusNumbers);

      expect(Function5.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0)).toEqual(20);
    });


    it('when an instance of Function5 is provided then the same one is returned', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: string, n1: number, n2: number, n3: number, n4: number) =>
          s.length + n1 + n2 + n3 + n4);

      const func = Function5.of(stringLengthPlusNumbers);

      expect(Function5.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0)).toEqual(20);
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: string, n1: number, n2: number, n3: number, n4: number) =>
          s.length + n1 + n2 + n3 + n4);

      // @ts-ignore
      expect(() => stringLengthPlusNumbers.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthPlusNumbers.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: string, n1: number, n2: number, n3: number, n4: number) =>
          s.length + n1 + n2 + n3 + n4);

      const multiply2 = (n: number) => 2 * n;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbers.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0)).toEqual(14);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0)).toEqual(16);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: string, n1: number, n2: number, n3: number, n4: number) =>
          s.length + n1 + n2 + n3 + n4);

      const multiply2: FFunction1<number, number> =
        (n: number) => 2 * n;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbers.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0)).toEqual(14);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0)).toEqual(16);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: string, n1: number, n2: number, n3: number, n4: number) =>
          s.length + n1 + n2 + n3 + n4);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbers.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0)).toEqual(14);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0)).toEqual(16);
    });

  });


  describe('apply', () => {

    it('when a Function5 is provided then the received input will be transformed', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: string, n1: number, n2: number, n3: number, n4: number) =>
          s.length + n1 + n2 + n3 + n4);

      expect(stringLengthPlusNumbers.apply('', 2, 7, -1, 0)).toEqual(8);
      expect(stringLengthPlusNumbers.apply('abc', 5, 11, -1, 0)).toEqual(18);
    });

  });

});
