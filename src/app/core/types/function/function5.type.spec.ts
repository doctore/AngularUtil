import { FFunction1, FFunction5, Function1, Function5, isFFunction5, NullableOrUndefined } from '@app-core/types';

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
        Function5.of((s: NullableOrUndefined<string>, n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>, n3: NullableOrUndefined<number>, n4: NullableOrUndefined<number>) =>
          s!.length + n1! + n2! + n3! + n4!);

      expect(Function5.isFunction(stringLengthPlusNumbers)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when an instance of FFunction5 is provided then a valid Function5 is returned', () => {
      const stringLengthPlusNumbers: FFunction5<string, number, number, number, number, number> =
        (s: NullableOrUndefined<string>, n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>, n3: NullableOrUndefined<number>, n4: NullableOrUndefined<number>) =>
          s!.length + n1! + n2! + n3! + n4!;

      const func = Function5.of(stringLengthPlusNumbers);

      expect(Function5.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0)).toEqual(20);
    });


    it('when an instance of Function5 is provided then the same one is returned', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: NullableOrUndefined<string>, n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>, n3: NullableOrUndefined<number>, n4: NullableOrUndefined<number>) =>
          s!.length + n1! + n2! + n3! + n4!);

      const func = Function5.of(stringLengthPlusNumbers);

      expect(Function5.isFunction(func)).toBeTrue();
      expect(func.apply('abc', 10, 8, -1, 0)).toEqual(20);
    });

  });



  describe('andThen', () => {

    it('when a Function1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: NullableOrUndefined<string>, n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>, n3: NullableOrUndefined<number>, n4: NullableOrUndefined<number>) =>
          s!.length + n1! + n2! + n3! + n4!);

      const plus2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const stringLengthPlusNumbersAndThenPlus2 = stringLengthPlusNumbers.andThen(plus2);

      expect(stringLengthPlusNumbersAndThenPlus2.apply('0', 2, 5, -1, 0)).toEqual(14);
      expect(stringLengthPlusNumbersAndThenPlus2.apply('abc', 4, 2, -1, 0)).toEqual(16);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: NullableOrUndefined<string>, n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>, n3: NullableOrUndefined<number>, n4: NullableOrUndefined<number>) =>
          s!.length + n1! + n2! + n3! + n4!);

      const plus2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const stringLengthPlusNumbersAndThenPlus2 = stringLengthPlusNumbers.andThen(plus2);

      expect(stringLengthPlusNumbersAndThenPlus2.apply('0', 2, 5, -1, 0)).toEqual(14);
      expect(stringLengthPlusNumbersAndThenPlus2.apply('abc', 4, 2, -1, 0)).toEqual(16);
    });

  });


  describe('apply', () => {

    it('when a Function2 is provided then the received input will be transformed', () => {
      const stringLengthPlusNumbers: Function5<string, number, number, number, number, number> =
        Function5.of((s: NullableOrUndefined<string>, n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>, n3: NullableOrUndefined<number>, n4: NullableOrUndefined<number>) =>
          s!.length + n1! + n2! + n3! + n4!);

      expect(stringLengthPlusNumbers.apply('', 2, 7, -1, 0)).toEqual(8);
      expect(stringLengthPlusNumbers.apply('abc', 5, 11, -1, 0)).toEqual(18);
    });

  });

});
