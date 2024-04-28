import {
  FFunction1,
  FFunction6,
  Function1,
  Function5,
  Function6,
  isFFunction6
} from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';
import {NullableOrUndefined} from "@app-core/types";

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/function6.type.spec.ts
 */
describe('isFFunction6', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFFunction6()).toBeFalse();
    expect(isFFunction6(null)).toBeFalse();
    expect(isFFunction6(12)).toBeFalse();
    expect(isFFunction6({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFFunction6((t1: string) => t1)).toBeFalse();
    expect(isFFunction6((t1: string, t2: string) => t1 + t2)).toBeFalse();
    expect(isFFunction6((t1: string, t2: string, t3: string) => t1 + t2 + t3)).toBeFalse();
    expect(isFFunction6((t1: string, t2: string, t3: string, t4: string) => t1 + t2 + t3 + t4)).toBeFalse();
    expect(isFFunction6((t1: string, t2: string, t3: string, t4: string, t5: string) => t1 + t2 + t3 + t4 + t5)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFFunction6((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => {})).toBeTrue();
    expect(isFFunction6((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => t1 + t2 + t3 + t4 + t5 + t6)).toBeTrue();
  });

});




describe('Function6', () => {


  describe('isFunction', () => {

    it('when no function is provided then false is returned', () => {
      expect(Function6.isFunction()).toBeFalse();
      expect(Function6.isFunction(null)).toBeFalse();
      expect(Function6.isFunction('')).toBeFalse();
      expect(Function6.isFunction(12)).toBeFalse();
      expect(Function6.isFunction({})).toBeFalse();
      expect(Function6.isFunction({ apply: (s: string, n1: number, n2: number) => s.length + n1 + n2 })).toBeFalse();
    });


    it('when provided function is different than Function6 then false is returned', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: string, n1: number, n2: number, n3: number, n4: number) =>
          s.length + n1 + n2 + n3 + n4);

      expect(Function6.isFunction(stringLengthPlusNumbers)).toBeFalse();
    });


    it('when a Function6 is provided then true is returned', () => {
      expect(Function6.isFunction(stringLengthPlusNumbersFunction)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Function6.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Function6.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FFunction6 is provided then a valid Function6 is returned', () => {
      const func = Function6.of(stringLengthPlusNumbersRaw);

      expect(Function6.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0, 3)).toEqual(23);
    });


    it('when an instance of FFunction6 is provided then a valid Function6 is returned', () => {
      const func = Function6.of(stringLengthPlusNumbersFFunction);

      expect(Function6.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0, 3)).toEqual(23);
    });


    it('when an instance of Function6 is provided then the same one is returned', () => {
      const func = Function6.of(stringLengthPlusNumbersFunction);

      expect(Function6.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0, 3)).toEqual(23);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const mapper: FFunction6<string, number, number, number, number, number, number> = stringLengthPlusNumbersFunction.getMapper();

      expect(mapper('', 2, 7, -1, 0, 3)).toEqual(11);
      expect(mapper('abc', 5, 11, -1, 0, 3)).toEqual(21);
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

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0, 3)).toEqual(20);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0, 3)).toEqual(22);
    });


    it('when a FFunction1 is provided then it will be applied after current one', () => {
      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbersFunction.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0, 3)).toEqual(20);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0, 3)).toEqual(22);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const multiply2: Function1<NullableOrUndefined<number>, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const stringLengthPlusNumbersAndThenMultiply2 = stringLengthPlusNumbersFunction.andThen(multiply2);

      expect(stringLengthPlusNumbersAndThenMultiply2.apply('0', 2, 5, -1, 0, 3)).toEqual(20);
      expect(stringLengthPlusNumbersAndThenMultiply2.apply('abc', 4, 2, -1, 0, 3)).toEqual(22);
    });

  });



  describe('apply', () => {

    it('when a Function6 is provided then the received input will be transformed', () => {
      expect(stringLengthPlusNumbersFunction.apply('', 2, 7, -1, 0, 3)).toEqual(11);
      expect(stringLengthPlusNumbersFunction.apply('abc', 5, 11, -1, 0, 3)).toEqual(21);
    });

  });

});



const stringLengthPlusNumbersRaw =
  (s: string,
   n1: number,
   n2: number,
   n3: number,
   n4: number,
   n5: number) =>
    s.length + n1 + n2 + n3 + n4 + n5;


const stringLengthPlusNumbersFFunction: FFunction6<string, number, number, number, number, number, number> =
  (s: string,
   n1: number,
   n2: number,
   n3: number,
   n4: number,
   n5: number) =>
    s.length + n1 + n2 + n3 + n4 + n5;


const stringLengthPlusNumbersFunction: Function6<string, number, number, number, number, number, number> =
  Function6.of(
    (s: string,
     n1: number,
     n2: number,
     n3: number,
     n4: number,
     n5: number) =>
      s.length + n1 + n2 + n3 + n4 + n5
  );
