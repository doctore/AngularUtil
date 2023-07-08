import {
  FFunction1,
  Function1,
  Function2,
} from '@app-core/types/function';
import { FUnaryOperator, isFUnaryOperator, UnaryOperator } from '@app-core/types/function/operator';
import { NullableOrUndefined } from '@app-core/types';
import { IllegalArgumentError } from '@app-core/errors';


/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/operator/unary-operator.type.spec.ts
 */
describe('isFUnaryOperator', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFUnaryOperator()).toBeFalse();
    expect(isFUnaryOperator(null)).toBeFalse();
    expect(isFUnaryOperator(12)).toBeFalse();
    expect(isFUnaryOperator({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFUnaryOperator((t1: number, t2: number) => t1 + t2)).toBeFalse();
    expect(isFUnaryOperator((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFUnaryOperator((t1: number) => {})).toBeTrue();
    expect(isFUnaryOperator((t1: number) => t1 + 1)).toBeTrue();
  });

});




describe('UnaryOperator', () => {


  describe('identity', () => {

    it('when an input parameter is used then such parameter is returned', () => {
      const identityUnaryOperator: UnaryOperator<string> = UnaryOperator.identity();

      expect(identityUnaryOperator.apply('12')).toEqual('12');
      expect(identityUnaryOperator.apply('abc')).toEqual('abc');
    });

  });



  describe('isUnaryOperator', () => {

    it('when no function is provided then false is returned', () => {
      expect(UnaryOperator.isUnaryOperator()).toBeFalse();
      expect(UnaryOperator.isUnaryOperator(null)).toBeFalse();
      expect(UnaryOperator.isUnaryOperator('')).toBeFalse();
      expect(UnaryOperator.isUnaryOperator(12)).toBeFalse();
      expect(UnaryOperator.isUnaryOperator({})).toBeFalse();
      expect(UnaryOperator.isUnaryOperator({ apply: (n: number) => n*2 })).toBeFalse();
    });


    it('when provided function is different than UnaryOperator then false is returned', () => {
      const stringLengthPlusNumber: Function2<string, number, number> =
        Function2.of((s: string, n: number) => s.length + n);

      expect(UnaryOperator.isUnaryOperator(stringLengthPlusNumber)).toBeFalse();
    });


    it('when a UnaryOperator is provided then true is returned', () => {
      const stringV2: UnaryOperator<string> =
        UnaryOperator.of((s: NullableOrUndefined<string>) => s + 'V2');

      expect(UnaryOperator.isUnaryOperator(stringV2)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => UnaryOperator.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => UnaryOperator.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FUnaryOperator is provided then a valid UnaryOperator is returned', () => {
      const stringV2 = (s: NullableOrUndefined<string>) => s! + 'v2';

      const func = UnaryOperator.of(stringV2);

      expect(UnaryOperator.isUnaryOperator(func)).toBeTrue();
      expect(func.apply('abc')).toEqual('abcv2');
    });


    it('when an instance of FUnaryOperator is provided then a valid UnaryOperator is returned', () => {
      const plus5: FUnaryOperator<number> =
        (n: NullableOrUndefined<number>) => 5 + n!;

      const func = UnaryOperator.of(plus5);

      expect(UnaryOperator.isUnaryOperator(func)).toBeTrue();
      expect(func.apply(9)).toEqual(14);
    });


    it('when an instance of UnaryOperator is provided then the same one is returned', () => {
      const multiply2: UnaryOperator<number> =
        UnaryOperator.of((n: number) => 2 * n);

      const func = UnaryOperator.of(multiply2);

      expect(UnaryOperator.isUnaryOperator(func)).toBeTrue();
      expect(func.apply(11)).toEqual(22);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const stringV2: UnaryOperator<string> =
        UnaryOperator.of((s: string) => s + 'v2');

      const mapper: FUnaryOperator<string> = stringV2.getMapper();

      expect(mapper('abc')).toEqual('abcv2');
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      const stringV2: UnaryOperator<string> =
        UnaryOperator.of((s: string) => s + 'v2');

      // @ts-ignore
      expect(() => stringV2.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringV2.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FUnaryOperator is provided then it will be applied after current one', () => {
      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: NullableOrUndefined<number>) => 5 + n!);

      const multiply2 = (n: NullableOrUndefined<number>) => 2 * n!;

      const plus5AndThenMultiply2 = plus5.andThen(multiply2);

      expect(plus5AndThenMultiply2.apply(0)).toEqual(10);
      expect(plus5AndThenMultiply2.apply(3)).toEqual(16);
    });


    it('when a FUnaryOperator is provided then it will be applied after current one', () => {
      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: NullableOrUndefined<number>) => 5 + n!);

      const multiply2: FUnaryOperator<number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const plus5AndThenMultiply2 = plus5.andThen(multiply2);

      expect(plus5AndThenMultiply2.apply(0)).toEqual(10);
      expect(plus5AndThenMultiply2.apply(3)).toEqual(16);
    });


    it('when a FFunction1 is provided then it will be applied after current one', () => {
      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: NullableOrUndefined<number>) => 5 + n!);

      const toString: FFunction1<number, string> =
        (n: NullableOrUndefined<number>) => '' + n!;

      const plus5AndThenToString = plus5.andThen(toString);

      expect(plus5AndThenToString.apply(0)).toEqual('5');
      expect(plus5AndThenToString.apply(3)).toEqual('8');
    });


    it('when a UnaryOperator is provided then it will be applied after current one', () => {
      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: NullableOrUndefined<number>) => 5 + n!);

      const multiply2: UnaryOperator<number> =
        UnaryOperator.of((n: number) => 2 * n);

      const plus5AndThenMultiply2 = plus5.andThen(multiply2);

      expect(plus5AndThenMultiply2.apply(0)).toEqual(10);
      expect(plus5AndThenMultiply2.apply(3)).toEqual(16);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: NullableOrUndefined<number>) => 5 + n!);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const plus5AndThenMultiply2 = plus5.andThen(multiply2);

      expect(plus5AndThenMultiply2.apply(0)).toEqual(10);
      expect(plus5AndThenMultiply2.apply(3)).toEqual(16);
    });

  });



  describe('apply', () => {

    it('when a UnaryOperator is provided then the received input will be transformed', () => {
      const stringV2: UnaryOperator<string> =
        UnaryOperator.of((s: string) => s + 'v2');

      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: NullableOrUndefined<number>) => 5 + n!);

      expect(stringV2.apply('abc')).toEqual('abcv2');
      expect(plus5.apply(11)).toEqual(16);
    });

  });



  describe('compose', () => {

    it('when null or undefined before is given then an error is thrown', () => {
      const stringV2: UnaryOperator<string> =
        UnaryOperator.of((s: string) => s + 'v2');

      // @ts-ignore
      expect(() => stringV2.compose(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringV2.compose(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FUnaryOperator is provided then it will be applied before current one', () => {
      const multiply2 = (n: NullableOrUndefined<number>) => 2 * n!;

      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: NullableOrUndefined<number>) => 5 + n!);

      const plus5ComposeMultiply2 = plus5.compose(multiply2);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(9)).toEqual(23);
    });


    it('when a FUnaryOperator is provided then it will be applied before current one', () => {
      const multiply2: FUnaryOperator<number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: NullableOrUndefined<number>) => 5 + n!);

      const plus5ComposeMultiply2 = plus5.compose(multiply2);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(3)).toEqual(11);
    });


    it('when a FFunction1 is provided then it will be applied before current one', () => {
      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: NullableOrUndefined<number>) => 5 + n!);

      const plus5ComposeMultiply2 = plus5.compose(multiply2);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(3)).toEqual(11);
    });


    it('when a UnaryOperator is provided then it will be applied before current one', () => {
      const multiply2: UnaryOperator<number> =
        UnaryOperator.of((n: number) => 2 * n);

      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: number) => 5 + n);

      const plus5ComposeMultiply2 = plus5.compose(multiply2);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(3)).toEqual(11);
    });


    it('when a Function1 is provided then it will be applied before current one', () => {
      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const plus5: UnaryOperator<number> =
        UnaryOperator.of((n: number) => 5 + n);

      const plus5ComposeMultiply2 = plus5.compose(multiply2);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(3)).toEqual(11);
    });

  });

});
