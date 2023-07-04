import { NullableOrUndefined } from '@app-core/types';
import { FFunction1, FFunction4, Function1, Function3, Function4, isFFunction4 } from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/function4.type.spec.ts
 */
describe('isFFunction4', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction4()).toBeFalse();
    expect(isFFunction4(null)).toBeFalse();
    expect(isFFunction4(12)).toBeFalse();
    expect(isFFunction4({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction4((t1: string) => t1)).toBeFalse();
    expect(isFFunction4((t1: string, t2: string) => t1 + t2)).toBeFalse();
    expect(isFFunction4((t1: string, t2: string, t3: string) => t1 + t2 + t3)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction4((t1: string, t2: string, t3: string, t4: string) => {})).toBeTrue();
    expect(isFFunction4((t1: string, t2: string, t3: string, t4: string) => t1 + t2 + t3 + t4)).toBeTrue();
  });

});




describe('Function4', () => {


  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function4.isFunction()).toBeFalse();
      expect(Function4.isFunction(null)).toBeFalse();
      expect(Function4.isFunction('')).toBeFalse();
      expect(Function4.isFunction(12)).toBeFalse();
      expect(Function4.isFunction({})).toBeFalse();
      expect(Function4.isFunction({ apply: (s: string, n1: number, n2: number) => s.length + n1 + n2 })).toBeFalse();
    });


    it('when provided function is different than Function4 then false is returned', () => {
      const stringLengthPlusNumbers: Function3<string, number, number, number> =
        Function3.of((s: string, n1: number, n2: number) => s.length + n1 + n2);

      expect(Function4.isFunction(stringLengthPlusNumbers)).toBeFalse();
    });


    it('when a Function4 is provided then true is returned', () => {
      const stringLengthPlusNumbers: Function4<string, number, number, number, number> =
        Function4.of((s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3);

      expect(Function4.isFunction(stringLengthPlusNumbers)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Function4.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Function4.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction4 is provided then a valid Function4 is returned', () => {
      const stringLengthPlusNumbers = (s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3;

      const func = Function4.of(stringLengthPlusNumbers);

      expect(Function4.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1)).toEqual(20);
    });


    it('when an instance of FFunction4 is provided then a valid Function4 is returned', () => {
      const stringLengthPlusNumbers: FFunction4<string, number, number, number, number> =
        (s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3;

      const func = Function4.of(stringLengthPlusNumbers);

      expect(Function4.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1)).toEqual(20);
    });


    it('when an instance of Function4 is provided then the same one is returned', () => {
      const stringLengthPlusNumbers: Function4<string, number, number, number, number> =
        Function4.of((s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3);

      const func = Function4.of(stringLengthPlusNumbers);

      expect(Function4.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1)).toEqual(20);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const stringLengthPlusNumbers: Function4<string, number, number, number, number> =
        Function4.of((s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3);

      const mapper: FFunction4<string, number, number, number, number> = stringLengthPlusNumbers.getMapper();

      expect(mapper('', 2, 7, -1)).toEqual(8);
      expect(mapper('abc', 5, 11, -1)).toEqual(18);
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      const stringLengthPlusNumbers: Function4<string, number, number, number, number> =
        Function4.of((s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3);

      // @ts-ignore
      expect(() => stringLengthPlusNumbers.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthPlusNumbers.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function4<string, number, number, number, number> =
        Function4.of((s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3);

      const multiply2 = (n: number) => 2 * n;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbers.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1)).toEqual(14);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1)).toEqual(16);
    });


    it('when a FFunction1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function4<string, number, number, number, number> =
        Function4.of((s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3);

      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbers.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1)).toEqual(14);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1)).toEqual(16);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function4<string, number, number, number, number> =
        Function4.of((s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3);

      const multiply2: Function1<NullableOrUndefined<number>, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbers.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1)).toEqual(14);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1)).toEqual(16);
    });

  });



  describe('apply', () => {

    it('when a Function4 is provided then the received input will be transformed', () => {
      const stringLengthPlusNumbers: Function4<string, number, number, number, number> =
        Function4.of((s: string, n1: number, n2: number, n3: number) => s.length + n1 + n2 + n3);

      expect(stringLengthPlusNumbers.apply('', 2, 7, -1)).toEqual(8);
      expect(stringLengthPlusNumbers.apply('abc', 5, 11, -1)).toEqual(18);
    });

  });

});
