import {
  FFunction1,
  FFunction9,
  Function1,
  Function8,
  Function9,
  isFFunction9
} from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/function9.type.spec.ts
 */
describe('isFFunction9', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction9()).toBeFalse();
    expect(isFFunction9(null)).toBeFalse();
    expect(isFFunction9(12)).toBeFalse();
    expect(isFFunction9({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction9((t1: string) => t1)).toBeFalse();
    expect(isFFunction9((t1: string, t2: string) => t1 + t2)).toBeFalse();
    expect(isFFunction9((t1: string, t2: string, t3: string) => t1 + t2 + t3)).toBeFalse();
    expect(isFFunction9((t1: string, t2: string, t3: string, t4: string) => t1 + t2 + t3 + t4)).toBeFalse();
    expect(isFFunction9((t1: string, t2: string, t3: string, t4: string, t5: string) => t1 + t2 + t3 + t4 + t5)).toBeFalse();
    expect(isFFunction9((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => t1 + t2 + t3 + t4 + t5 + t6)).toBeFalse();
    expect(isFFunction9((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string) => t1 + t2 + t3 + t4 + t5 + t6 + t7)).toBeFalse();
    expect(isFFunction9((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string) => t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction9((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string, t9: string) => {})).toBeTrue();
    expect(isFFunction9((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string, t9: string) => t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9)).toBeTrue();
  });

});




describe('Function9', () => {


  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function9.isFunction()).toBeFalse();
      expect(Function9.isFunction(null)).toBeFalse();
      expect(Function9.isFunction('')).toBeFalse();
      expect(Function9.isFunction(12)).toBeFalse();
      expect(Function9.isFunction({})).toBeFalse();
      expect(Function9.isFunction({ apply: (s: string, n1: number, n2: number) => s.length + n1 + n2 })).toBeFalse();
    });


    it('when provided function is different than Function9 then false is returned', () => {
      const stringLengthPlusNumbers: Function8<string, number, number, number, number, number, number, number, number> =
        Function8.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7);

      expect(Function9.isFunction(stringLengthPlusNumbers)).toBeFalse();
    });


    it('when a Function9 is provided then true is returned', () => {
      const stringLengthPlusNumbers: Function9<string, number, number, number, number, number, number, number, number, number> =
        Function9.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8);

      expect(Function9.isFunction(stringLengthPlusNumbers)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Function9.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Function9.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction9 is provided then a valid Function9 is returned', () => {
      const stringLengthPlusNumbers = (s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
        s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8;

      const func = Function9.of(stringLengthPlusNumbers);

      expect(Function9.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0, 3, 9, 2, 7)).toEqual(41);
    });


    it('when an instance of FFunction9 is provided then a valid Function9 is returned', () => {
      const stringLengthPlusNumbers: FFunction9<string, number, number, number, number, number, number, number, number, number> =
        (s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8;

      const func = Function9.of(stringLengthPlusNumbers);

      expect(Function9.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0, 3, 9, 2, 7)).toEqual(41);
    });


    it('when an instance of Function9 is provided then the same one is returned', () => {
      const stringLengthPlusNumbers: Function9<string, number, number, number, number, number, number, number, number, number> =
        Function9.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8);

      const func = Function9.of(stringLengthPlusNumbers);

      expect(Function9.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0, 3, 9, 2, 7)).toEqual(41);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const stringLengthPlusNumbers: Function9<string, number, number, number, number, number, number, number, number, number> =
        Function9.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8);

      const mapper: FFunction9<string, number, number, number, number, number, number, number, number, number> = stringLengthPlusNumbers.getMapper();

      expect(mapper('', 2, 7, -1, 0, 3, 7, 4, 9)).toEqual(31);
      expect(mapper('abc', 5, 11, -1, 0, 3, 5, 2, 6)).toEqual(34);
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      const stringLengthPlusNumbers: Function9<string, number, number, number, number, number, number, number, number, number> =
        Function9.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8);

      // @ts-ignore
      expect(() => stringLengthPlusNumbers.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthPlusNumbers.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function9<string, number, number, number, number, number, number, number, number, number> =
        Function9.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8);

      const multiply2 = (n: number) => 2 * n;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbers.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0, 3, 4, 1, 6)).toEqual(42);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0, 3, 9, 5, 7)).toEqual(64);
    });


    it('when a FFunction1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function9<string, number, number, number, number, number, number, number, number, number> =
        Function9.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8);

      const multiply2: FFunction1<number, number> =
        (n: number) => 2 * n;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbers.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0, 3, 4, 1, 6)).toEqual(42);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0, 3, 9, 5, 7)).toEqual(64);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function9<string, number, number, number, number, number, number, number, number, number> =
        Function9.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbers.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0, 3, 4, 1, 6)).toEqual(42);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0, 3, 9, 5, 7)).toEqual(64);
    });

  });



  describe('apply', () => {

    it('when a Function9 is provided then the received input will be transformed', () => {
      const stringLengthPlusNumbers: Function9<string, number, number, number, number, number, number, number, number, number> =
        Function9.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) =>
          s.length + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8);

      expect(stringLengthPlusNumbers.apply('', 2, 7, -1, 0, 3, 4, 5, 6)).toEqual(26);
      expect(stringLengthPlusNumbers.apply('abc', 5, 11, -1, 0, 3, 9, 2, 8)).toEqual(40);
    });

  });

});
