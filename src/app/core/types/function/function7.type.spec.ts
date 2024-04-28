import {
  FFunction1,
  FFunction7,
  Function1,
  Function6,
  Function7,
  isFFunction7
} from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';
import {NullableOrUndefined} from "@app-core/types";

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/function7.type.spec.ts
 */
describe('isFFunction7', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction7()).toBeFalse();
    expect(isFFunction7(null)).toBeFalse();
    expect(isFFunction7(12)).toBeFalse();
    expect(isFFunction7({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction7((t1: string) => t1)).toBeFalse();
    expect(isFFunction7((t1: string, t2: string) => t1 + t2)).toBeFalse();
    expect(isFFunction7((t1: string, t2: string, t3: string) => t1 + t2 + t3)).toBeFalse();
    expect(isFFunction7((t1: string, t2: string, t3: string, t4: string) => t1 + t2 + t3 + t4)).toBeFalse();
    expect(isFFunction7((t1: string, t2: string, t3: string, t4: string, t5: string) => t1 + t2 + t3 + t4 + t5)).toBeFalse();
    expect(isFFunction7((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => t1 + t2 + t3 + t4 + t5 + t6)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction7((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string) => {})).toBeTrue();
    expect(isFFunction7((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string) => t1 + t2 + t3 + t4 + t5 + t6 + t7)).toBeTrue();
  });

});




describe('Function7', () => {


  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function7.isFunction()).toBeFalse();
      expect(Function7.isFunction(null)).toBeFalse();
      expect(Function7.isFunction('')).toBeFalse();
      expect(Function7.isFunction(12)).toBeFalse();
      expect(Function7.isFunction({})).toBeFalse();
      expect(Function7.isFunction({ apply: (s: string, n1: number, n2: number) => s.length + n1 + n2 })).toBeFalse();
    });


    it('when provided function is different than Function7 then false is returned', () => {
      const stringLengthPlusNumbers: Function6<string, number, number, number, number, number, number> =
        Function6.of((s: string, n1: number, n2: number, n3: number, n4: number, n5: number) =>
          s.length + n1 + n2 + n3 + n4 + n5);

      expect(Function7.isFunction(stringLengthPlusNumbers)).toBeFalse();
    });


    it('when a Function7 is provided then true is returned', () => {
      expect(Function7.isFunction(stringLengthPlusNumbersFunction)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Function7.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Function7.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction7 is provided then a valid Function7 is returned', () => {
      const func = Function7.of(stringLengthPlusNumbersRaw);

      expect(Function7.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0, 3, 9)).toEqual(32);
    });


    it('when an instance of FFunction7 is provided then a valid Function7 is returned', () => {
      const func = Function7.of(stringLengthPlusNumbersFFunction);

      expect(Function7.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0, 3, 9)).toEqual(32);
    });


    it('when an instance of Function7 is provided then the same one is returned', () => {
      const func = Function7.of(stringLengthPlusNumbersFunction);

      expect(Function7.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0, 3, 9)).toEqual(32);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const mapper: FFunction7<string, number, number, number, number, number, number, number> = stringLengthPlusNumbersFunction.getMapper();

      expect(mapper('', 2, 7, -1, 0, 3, 7)).toEqual(18);
      expect(mapper('abc', 5, 11, -1, 0, 3, 5)).toEqual(26);
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
      const multiply2 = (n: number) => 2 * n;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbersFunction.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0, 3, 4)).toEqual(28);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0, 3, 9)).toEqual(40);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbersFunction.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0, 3, 4)).toEqual(28);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0, 3, 9)).toEqual(40);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const multiply2: Function1<NullableOrUndefined<number>, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbersFunction.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0, 3, 4)).toEqual(28);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0, 3, 9)).toEqual(40);
    });

  });



  describe('apply', () => {

    it('when a Function7 is provided then the received input will be transformed', () => {
      expect(stringLengthPlusNumbersFunction.apply('', 2, 7, -1, 0, 3, 4)).toEqual(15);
      expect(stringLengthPlusNumbersFunction.apply('abc', 5, 11, -1, 0, 3, 9)).toEqual(30);
    });

  });

});



const stringLengthPlusNumbersRaw =
  (s: string,
   n1: number,
   n2: number,
   n3: number,
   n4: number,
   n5: number,
   n6: number) =>
    s.length + n1 + n2 + n3 + n4 + n5 + n6;


const stringLengthPlusNumbersFFunction: FFunction7<string, number, number, number, number, number, number, number> =
  (s: string,
   n1: number,
   n2: number,
   n3: number,
   n4: number,
   n5: number,
   n6: number) =>
    s.length + n1 + n2 + n3 + n4 + n5 + n6;


const stringLengthPlusNumbersFunction: Function7<string, number, number, number, number, number, number, number> =
  Function7.of(
    (s: string,
     n1: number,
     n2: number,
     n3: number,
     n4: number,
     n5: number,
     n6: number) =>
      s.length + n1 + n2 + n3 + n4 + n5 + n6
  );
