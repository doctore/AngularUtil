import {
  FFunction1,
  Function1,
  Function3
} from '@app-core/types/function';
import {
  FBinaryOperator,
  isFBinaryOperator,
  BinaryOperator,
  FUnaryOperator,
  UnaryOperator
} from '@app-core/types/function/operator';
import { NullableOrUndefined } from '@app-core/types';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/operator/binary-operator.type.spec.ts
 */
describe('isFBinaryOperator', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFBinaryOperator()).toBeFalse();
    expect(isFBinaryOperator(null)).toBeFalse();
    expect(isFBinaryOperator(12)).toBeFalse();
    expect(isFBinaryOperator({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFBinaryOperator((t1: number) => t1)).toBeFalse();
    expect(isFBinaryOperator((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFBinaryOperator((t1: number, t2: number) => {})).toBeTrue();
    expect(isFBinaryOperator((t1: number, t2: number) => t1 + t2)).toBeTrue();
  });

});




describe('BinaryOperator', () => {


  describe('isBinaryOperator', () => {

    it('when no function is provided then false is returned', () => {
      expect(BinaryOperator.isBinaryOperator()).toBeFalse();
      expect(BinaryOperator.isBinaryOperator(null)).toBeFalse();
      expect(BinaryOperator.isBinaryOperator('')).toBeFalse();
      expect(BinaryOperator.isBinaryOperator(12)).toBeFalse();
      expect(BinaryOperator.isBinaryOperator({})).toBeFalse();
      expect(BinaryOperator.isBinaryOperator({ apply: (n: number) => n*2 })).toBeFalse();
    });


    it('when provided function is different than BinaryOperator then false is returned', () => {
      const stringLengthPlusNumbers: Function3<string, number, number, number> =
        Function3.of((s: NullableOrUndefined<string>, n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => s!.length + n1! + n2!);

      expect(BinaryOperator.isBinaryOperator(stringLengthPlusNumbers)).toBeFalse();
    });


    it('when a BinaryOperator is provided then true is returned', () => {
      const joinStrings: BinaryOperator<string> =
        BinaryOperator.of((s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1! + s2!);

      expect(BinaryOperator.isBinaryOperator(joinStrings)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => BinaryOperator.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => BinaryOperator.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FBinaryOperator is provided then a valid BinaryOperator is returned', () => {
      const joinStrings = (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1! + s2!;

      const func = BinaryOperator.of(joinStrings);

      expect(BinaryOperator.isBinaryOperator(func)).toBeTrue();
      expect(func.apply('abc', 'zf')).toEqual('abczf');
    });


    it('when an instance of FBinaryOperator is provided then a valid BinaryOperator is returned', () => {
      const plusNumbers: FBinaryOperator<number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! + n2!;

      const func = BinaryOperator.of(plusNumbers);

      expect(BinaryOperator.isBinaryOperator(func)).toBeTrue();
      expect(func.apply(9, 1)).toEqual(10);
    });


    it('when an instance of BinaryOperator is provided then the same one is returned', () => {
      const multiplyNumbers: BinaryOperator<number> =
        BinaryOperator.of((n1: number, n2: number) => n1 * n2);

      const func = BinaryOperator.of(multiplyNumbers);

      expect(BinaryOperator.isBinaryOperator(func)).toBeTrue();
      expect(func.apply(11, 2)).toEqual(22);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const joinStrings: BinaryOperator<string> =
        BinaryOperator.of((s1: string, s2: string) => s1 + s2);

      const mapper: FBinaryOperator<string> = joinStrings.getMapper();

      expect(mapper('abc', 'v2')).toEqual('abcv2');
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      const joinStrings: BinaryOperator<string> =
        BinaryOperator.of((s1: string, s2: string) => s1 + s2);

      // @ts-ignore
      expect(() => joinStrings.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => joinStrings.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FBinaryOperator is provided then it will be applied after current one', () => {
      const plusNumbers: BinaryOperator<number> =
        BinaryOperator.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! + n2!);

      const multiply2 = (n: NullableOrUndefined<number>) => 2 * n!;

      const plusNumbersAndThenMultiply2 = plusNumbers.andThen(multiply2);

      expect(plusNumbersAndThenMultiply2.apply(0, 1)).toEqual(2);
      expect(plusNumbersAndThenMultiply2.apply(3, 7)).toEqual(20);
    });


    it('when a FUnaryOperator is provided then it will be applied after current one', () => {
      const plusNumbers: BinaryOperator<number> =
        BinaryOperator.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! + n2!);

      const multiply2: FUnaryOperator<number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const plusNumbersAndThenMultiply2 = plusNumbers.andThen(multiply2);

      expect(plusNumbersAndThenMultiply2.apply(0, 2)).toEqual(4);
      expect(plusNumbersAndThenMultiply2.apply(3, 4)).toEqual(14);
    });


    it('when a FFunction1 is provided then it will be applied after current one', () => {
      const plusNumbers: BinaryOperator<number> =
        BinaryOperator.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! + n2!);

      const toString: FFunction1<number, string> =
        (n: NullableOrUndefined<number>) => '' + n!;

      const plusNumbersAndThenToString = plusNumbers.andThen(toString);

      expect(plusNumbersAndThenToString.apply(0, 5)).toEqual('5');
      expect(plusNumbersAndThenToString.apply(3, 9)).toEqual('12');
    });


    it('when a UnaryOperator is provided then it will be applied after current one', () => {
      const plusNumbers: BinaryOperator<number> =
        BinaryOperator.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! + n2!);

      const multiply2: UnaryOperator<number> =
        UnaryOperator.of((n: number) => 2 * n);

      const plusNumbersAndThenMultiply2 = plusNumbers.andThen(multiply2);

      expect(plusNumbersAndThenMultiply2.apply(1, 2)).toEqual(6);
      expect(plusNumbersAndThenMultiply2.apply(2, 3)).toEqual(10);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const plusNumbers: BinaryOperator<number> =
        BinaryOperator.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! + n2!);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const plusNumbersAndThenMultiply2 = plusNumbers.andThen(multiply2);

      expect(plusNumbersAndThenMultiply2.apply(2, 4)).toEqual(12);
      expect(plusNumbersAndThenMultiply2.apply(6, 8)).toEqual(28);
    });

  });



  describe('apply', () => {

    it('when a BinaryOperator is provided then the received input will be transformed', () => {
      const joinStrings: BinaryOperator<string> =
        BinaryOperator.of((s1: string, s2: string) => s1 + s2);

      const multiplyNumbers: BinaryOperator<number> =
        BinaryOperator.of((n1: number, n2: number) => n1 * n2);

      expect(joinStrings.apply('abc', 'hg')).toEqual('abchg');
      expect(multiplyNumbers.apply(11, 3)).toEqual(33);
    });

  });

});
