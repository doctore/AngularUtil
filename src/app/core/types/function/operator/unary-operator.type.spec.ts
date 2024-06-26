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
      expect(UnaryOperator.isUnaryOperator(stringV2UnaryOperator)).toBeTrue();
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
      const func = UnaryOperator.of(stringV2Raw);

      expect(UnaryOperator.isUnaryOperator(func)).toBeTrue();
      expect(func.apply('abc')).toEqual('abcv2');
    });


    it('when an instance of FUnaryOperator is provided then a valid UnaryOperator is returned', () => {
      const func = UnaryOperator.of(plus5FUnaryOperator);

      expect(UnaryOperator.isUnaryOperator(func)).toBeTrue();
      expect(func.apply(9)).toEqual(14);
    });


    it('when an instance of UnaryOperator is provided then the same one is returned', () => {
      const func = UnaryOperator.of(multiply2UnaryOperator);

      expect(UnaryOperator.isUnaryOperator(func)).toBeTrue();
      expect(func.apply(11)).toEqual(22);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const mapper: FUnaryOperator<string> = stringV2UnaryOperator.getMapper();

      expect(mapper('abc')).toEqual('abcv2');
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => stringV2UnaryOperator.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringV2UnaryOperator.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FUnaryOperator is provided then it will be applied after current one', () => {
      const plus5AndThenMultiply2 = plus5UnaryOperator.andThen(multiply2Raw);

      expect(plus5AndThenMultiply2.apply(0)).toEqual(10);
      expect(plus5AndThenMultiply2.apply(3)).toEqual(16);
    });


    it('when a FUnaryOperator is provided then it will be applied after current one', () => {
      const plus5AndThenMultiply2 = plus5UnaryOperator.andThen(multiply2FUnaryOperator);

      expect(plus5AndThenMultiply2.apply(0)).toEqual(10);
      expect(plus5AndThenMultiply2.apply(3)).toEqual(16);
    });


    it('when a FFunction1 is provided then it will be applied after current one', () => {
      const toString: FFunction1<number, string> =
        (n: NullableOrUndefined<number>) => '' + n!;

      const plus5AndThenToString = plus5UnaryOperator.andThen(toString);

      expect(plus5AndThenToString.apply(0)).toEqual('5');
      expect(plus5AndThenToString.apply(3)).toEqual('8');
    });


    it('when a UnaryOperator is provided then it will be applied after current one', () => {
      const plus5AndThenMultiply2 = plus5UnaryOperator.andThen(multiply2UnaryOperator);

      expect(plus5AndThenMultiply2.apply(0)).toEqual(10);
      expect(plus5AndThenMultiply2.apply(3)).toEqual(16);
    });


    it('when a Function1 is provided then it will be applied after current one', () => {
      const plus5AndThenMultiply2 = plus5UnaryOperator.andThen(multiply2Function);

      expect(plus5AndThenMultiply2.apply(0)).toEqual(10);
      expect(plus5AndThenMultiply2.apply(3)).toEqual(16);
    });

  });



  describe('apply', () => {

    it('when a UnaryOperator is provided then the received input will be transformed', () => {
      expect(stringV2UnaryOperator.apply('abc')).toEqual('abcv2');
      expect(plus5UnaryOperator.apply(11)).toEqual(16);
    });

  });



  describe('compose', () => {

    it('when null or undefined before is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => stringV2UnaryOperator.compose(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringV2UnaryOperator.compose(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FUnaryOperator is provided then it will be applied before current one', () => {
      const plus5ComposeMultiply2 = plus5UnaryOperator.compose(multiply2Raw);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(9)).toEqual(23);
    });


    it('when a FUnaryOperator is provided then it will be applied before current one', () => {
      const plus5ComposeMultiply2 = plus5UnaryOperator.compose(multiply2FUnaryOperator);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(3)).toEqual(11);
    });


    it('when a FFunction1 is provided then it will be applied before current one', () => {
      const plus5ComposeMultiply2 = plus5UnaryOperator.compose(multiply2FFunction);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(3)).toEqual(11);
    });


    it('when a UnaryOperator is provided then it will be applied before current one', () => {
      const plus5ComposeMultiply2 = plus5UnaryOperator.compose(multiply2UnaryOperator);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(3)).toEqual(11);
    });


    it('when a Function1 is provided then it will be applied before current one', () => {
      const plus5ComposeMultiply2 = plus5UnaryOperator.compose(multiply2Function);

      expect(plus5ComposeMultiply2.apply(0)).toEqual(5);
      expect(plus5ComposeMultiply2.apply(3)).toEqual(11);
    });

  });

});



const plus5FUnaryOperator: FUnaryOperator<number> =
  (n: NullableOrUndefined<number>) =>
    5 + n!;


const plus5UnaryOperator: UnaryOperator<number> =
  UnaryOperator.of(
    (n: NullableOrUndefined<number>) =>
      5 + n!
  );


const multiply2Raw =
  (n: NullableOrUndefined<number>) =>
    2 * n!;


const multiply2FFunction: FFunction1<number, number> =
  (n: NullableOrUndefined<number>) =>
    2 * n!;


const multiply2Function: Function1<number, number> =
  Function1.of(
    (n: number) =>
      2 * n
  );


const multiply2FUnaryOperator: FUnaryOperator<number> =
  (n: NullableOrUndefined<number>) =>
    2 * n!;


const multiply2UnaryOperator: UnaryOperator<number> =
  UnaryOperator.of(
    (n: number) =>
      2 * n
  );


const stringV2Raw =
  (s: NullableOrUndefined<string>) =>
    s! + 'v2';


const stringV2UnaryOperator: UnaryOperator<string> =
  UnaryOperator.of(
    (s: string) =>
      s + 'v2'
  );
