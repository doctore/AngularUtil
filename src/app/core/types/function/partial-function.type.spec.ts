import { NullableOrUndefined } from '@app-core/types';
import { FFunction1, FFunction2, Function1, Function2, PartialFunction } from '@app-core/types/function';
import { Optional } from '@app-core/types/functional';
import { FPredicate1, FPredicate2, Predicate1, Predicate2 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/partial-function.type.spec.ts
 */
describe('PartialFunction', () => {


  describe('identity', () => {

    it('when an input parameter is used then such parameter is returned', () => {
      const identityPartialFunction: PartialFunction<string, string> =
        PartialFunction.identity();

      expect(identityPartialFunction.isDefinedAt('12')).toBeTrue();
      expect(identityPartialFunction.isDefinedAt('abc')).toBeTrue();

      expect(identityPartialFunction.apply('12')).toEqual('12');
      expect(identityPartialFunction.apply('abc')).toEqual('abc');
    });

  });



  describe('isPartialFunction', () => {

    it('when no partial function is provided then false is returned', () => {
      expect(PartialFunction.isPartialFunction()).toBeFalse();
      expect(PartialFunction.isPartialFunction(null)).toBeFalse();
      expect(PartialFunction.isPartialFunction('')).toBeFalse();
      expect(PartialFunction.isPartialFunction(12)).toBeFalse();
      expect(PartialFunction.isPartialFunction({})).toBeFalse();
      expect(PartialFunction.isPartialFunction({ apply: (n: number) => n*2 })).toBeFalse();
    });


    it('when a partial function is provided then true is returned', () => {
      const multiply2ForEven: PartialFunction<number, number> =
        PartialFunction.of(
          (n: number) => 0 == n % 2,
          (n: number) => 2 * n
        );

      expect(PartialFunction.isPartialFunction(multiply2ForEven)).toBeTrue();

      expect(PartialFunction.isPartialFunction(PartialFunction.identity())).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined mapper is given then an error is thrown', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      // @ts-ignore
      expect(() => PartialFunction.of(isEven, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of(isEven, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate1 will be used', () => {
      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const undefinedVerifierPF = PartialFunction.of(undefined, multiply2);
      const nullVerifierPF = PartialFunction.of(null, multiply2);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt(3)).toBeTrue();
      expect(undefinedVerifierPF.apply(3)).toEqual(6);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt(2)).toBeTrue();
      expect(nullVerifierPF.apply(2)).toEqual(4);
    });


    it('when verifier and mapper lambdas are provided then a valid PartialFunction is returned', () => {
      const isEven = (n: NullableOrUndefined<number>) => 0 == n! % 2;
      const multiply2 = (n: NullableOrUndefined<number>) => 2 * n!;

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual(4);
      expect(partialFunction.apply(3)).toEqual(6);
    });


    it('when instances of FFunction1 and FPredicate1 are provided then a valid PartialFunction is returned', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual(4);
      expect(partialFunction.apply(3)).toEqual(6);
    });


    it('when instances of Function1 and Predicate1 are provided then a valid PartialFunction is returned', () => {
      const isEven: Predicate1<NullableOrUndefined<number>> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<NullableOrUndefined<number>, NullableOrUndefined<number>> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual(4);
      expect(partialFunction.apply(3)).toEqual(6);
    });

  });



  describe('ofToTuple', () => {

    it('when null or undefined keyMapper or valueMapper are given then an error is thrown', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      // @ts-ignore
      expect(() => PartialFunction.ofToTuple(isEven, null, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofToTuple(isEven, undefined, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofToTuple(isEven, multiply2, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofToTuple(isEven, multiply2, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofToTuple(isEven, null, multiply2)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofToTuple(isEven, undefined, multiply2)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate2 will be used', () => {
      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const toString: Function1<number, string> =
        Function1.of((n: number) => '' + n);

      const undefinedVerifierPF = PartialFunction.ofToTuple(undefined, multiply2, toString);
      const nullVerifierPF = PartialFunction.ofToTuple(null, multiply2, toString);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt(3)).toBeTrue();
      expect(undefinedVerifierPF.apply(3)).toEqual([6, '3']);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt(2)).toBeTrue();
      expect(nullVerifierPF.apply(2)).toEqual([4, '2']);
    });


    it('when verifier and mapper lambdas are provided then a valid PartialFunction is returned', () => {
      const isEven = (n: NullableOrUndefined<number>) => 0 == n! % 2;
      const multiply2 = (n: NullableOrUndefined<number>) => 2 * n!;
      const toString = (n: number) => '' + n;

      const partialFunction = PartialFunction.ofToTuple(isEven, multiply2, toString);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual([4, '2']);
      expect(partialFunction.apply(3)).toEqual([6, '3']);
    });


    it('when instances of FFunction1 and FPredicate1 are provided then a valid PartialFunction is returned', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const toString: FFunction1<number, string> =
        (n: number) => '' + n;

      const partialFunction = PartialFunction.ofToTuple(isEven, multiply2, toString);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual([4, '2']);
      expect(partialFunction.apply(3)).toEqual([6, '3']);
    });


    it('when instances of Function1 and Predicate1 are provided then a valid PartialFunction is returned', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const toString: Function1<number, string> =
        Function1.of((n: number) => '' + n);

      const partialFunction = PartialFunction.ofToTuple(isEven, multiply2, toString);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual([4, '2']);
      expect(partialFunction.apply(3)).toEqual([6, '3']);
    });

  });



  describe('of2', () => {

    it('when null or undefined mapper is given then an error is thrown', () => {
      const isAllEven =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2;

      // @ts-ignore
      expect(() => PartialFunction.of2(isAllEven, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2(isAllEven, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate2 will be used', () => {
      const multiply2: FFunction2<number, number, [number, number]> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => [2 * n1!, 2 * n2!];

      const undefinedVerifierPF = PartialFunction.of2(undefined, multiply2);
      const nullVerifierPF = PartialFunction.of2(null, multiply2);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt([2, 3])).toBeTrue();
      expect(undefinedVerifierPF.apply([2, 3])).toEqual([4, 6]);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt([5, 7])).toBeTrue();
      expect(nullVerifierPF.apply([5, 7])).toEqual([10, 14]);
    });


    it('when verifier and mapper lambdas are provided then a valid PartialFunction is returned', () => {
      const isAllEven = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2;
      const multiply2 = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>): [number, number] => [2 * n1!, 2 * n2!];

      const partialFunction = PartialFunction.of2(isAllEven, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([4, 8]);
      expect(partialFunction.apply([5, 7])).toEqual([10, 14]);
    });


    it('when instances of FFunction2 and FPredicate2 are provided then a valid PartialFunction is returned', () => {
      const isAllEven: FPredicate2<number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2;

      const multiply2: FFunction2<number, number, [number, number]> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => [2 * n1!, 2 * n2!];

      const partialFunction = PartialFunction.of2(isAllEven, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([4, 8]);
      expect(partialFunction.apply([5, 7])).toEqual([10, 14]);
    });


    it('when instances of Function2 and Predicate2 are provided then a valid PartialFunction is returned', () => {
      const isAllEven: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<number>> =
        Predicate2.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2);

      const multiply2: Function2<NullableOrUndefined<number>, NullableOrUndefined<number>, [number, number]> =
        Function2.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => [2 * n1!, 2 * n2!]);

      const partialFunction = PartialFunction.of2(isAllEven, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([4, 8]);
      expect(partialFunction.apply([5, 7])).toEqual([10, 14]);
    });

  });



  describe('of2FromTuple', () => {

    it('when null or undefined mapper is given then an error is thrown', () => {
      const isAllEven: FPredicate2<number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2;

      // @ts-ignore
      expect(() => PartialFunction.of2FromTuple(isAllEven, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2FromTuple(isAllEven, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate2 will be used', () => {
      const multiply: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const undefinedVerifierPF = PartialFunction.of2FromTuple(undefined, multiply);
      const nullVerifierPF = PartialFunction.of2FromTuple(null, multiply);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt([2, 3])).toBeTrue();
      expect(undefinedVerifierPF.apply([2, 3])).toEqual(6);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt([5, 7])).toBeTrue();
      expect(nullVerifierPF.apply([5, 7])).toEqual(35);
    });


    it('when verifier and mapper lambdas are provided then a valid PartialFunction is returned', () => {
      const isAllEven = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2;
      const multiply = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const partialFunction = PartialFunction.of2FromTuple(isAllEven, multiply);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual(8);
      expect(partialFunction.apply([5, 7])).toEqual(35);
    });


    it('when instances of FFunction2 and FPredicate2 are provided then a valid PartialFunction is returned', () => {
      const isAllEven: FPredicate2<number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2;

      const multiply: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const partialFunction = PartialFunction.of2FromTuple(isAllEven, multiply);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual(8);
      expect(partialFunction.apply([5, 7])).toEqual(35);
    });


    it('when instances of Function2 and Predicate2 are provided then a valid PartialFunction is returned', () => {
      const isAllEven: Predicate2<number, number> =
        Predicate2.of((n1: number, n2: number) => 0 == n1 % 2 && 0 == n2 % 2);

      const multiply: Function2<number, number, number> =
        Function2.of((n1: number, n2: number) => n1 * n2);

      const partialFunction = PartialFunction.of2FromTuple(isAllEven, multiply);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual(8);
      expect(partialFunction.apply([5, 7])).toEqual(35);
    });

  });



  describe('of2ToTuples', () => {

    it('when null or undefined keyMapper or valueMapper are given then an error is thrown', () => {
      const isAllEven: FPredicate2<number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2;

      const multiply: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      // @ts-ignore
      expect(() => PartialFunction.of2ToTuples(isAllEven, null, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2ToTuples(isAllEven, undefined, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2ToTuples(isAllEven, multiply, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2ToTuples(isAllEven, multiply, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2ToTuples(isAllEven, null, multiply)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2ToTuples(isAllEven, undefined, multiply)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate2 will be used', () => {
      const multiply: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const toString: Function2<number, number, string> =
        Function2.of((n1: number, n2: number) => '' + n1 + n2);

      const undefinedVerifierPF = PartialFunction.of2ToTuples(undefined, multiply, toString);
      const nullVerifierPF = PartialFunction.of2ToTuples(null, multiply, toString);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt([2, 3])).toBeTrue();
      expect(undefinedVerifierPF.apply([2, 3])).toEqual([6, '23']);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt([5, 7])).toBeTrue();
      expect(nullVerifierPF.apply([5, 7])).toEqual([35, '57']);
    });


    it('when verifier, keyMapper and valueMapper are lambdas then a valid PartialFunction is returned', () => {
      const isAllEven = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2;
      const multiply = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;
      const toString = (n1: number, n2: number) => '' + n1 + n2;

      const partialFunction = PartialFunction.of2ToTuples(isAllEven, multiply, toString);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([8, '24']);
      expect(partialFunction.apply([5, 7])).toEqual([35, '57']);
    });


    it('when instances of FFunction2 and FPredicate2 are provided then a valid PartialFunction is returned', () => {
      const isAllEven: FPredicate2<number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => 0 == n1! % 2 && 0 == n2! % 2;

      const multiply: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const toString: FFunction2<number, number, string> =
        (n1: number, n2: number) => '' + n1 + n2;

      const partialFunction = PartialFunction.of2ToTuples(isAllEven, multiply, toString);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([8, '24']);
      expect(partialFunction.apply([5, 7])).toEqual([35, '57']);
    });


    it('when instances of Function2 and Predicate2 are provided then a valid PartialFunction is returned', () => {
      const isAllEven: Predicate2<number, number> =
        Predicate2.of((n1: number, n2: number) => 0 == n1 % 2 && 0 == n2 % 2);

      const multiply: Function2<number, number, number> =
        Function2.of((n1: number, n2: number) => n1 * n2);

      const toString: Function2<number, number, string> =
        Function2.of((n1: number, n2: number) => '' + n1 + n2);

      const partialFunction = PartialFunction.of2ToTuples(isAllEven, multiply, toString);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([8, '24']);
      expect(partialFunction.apply([5, 7])).toEqual([35, '57']);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      const mapper: Function1<number, number> = partialFunction.getMapper();

      expect(mapper.apply(5)).toEqual(10);
      expect(mapper.apply(8)).toEqual(16);
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      const verifier: Predicate1<number> = partialFunction.getVerifier();

      expect(verifier.apply(5)).toEqual(false);
      expect(verifier.apply(8)).toEqual(true);
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: string) => 3 < s.length);

      const stringLength: Function1<string, number> =
        Function1.of((s: string) => s.length);

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);

      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a FFunction1 is provided then it will be applied after current PartialFunction', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: string) => 3 < s.length);

      const stringLength: Function1<string, number> =
        Function1.of((s: string) => s.length);

      const multiply2: FFunction1<number, number> =
        (n: number) => 2 * n;

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);
      const stringLengthIfLongerThan3AndThenMultiply2 = stringLengthIfLongerThan3.andThen(multiply2);

      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('0')).toBeFalse();
      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('abcd')).toBeTrue();

      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('0')).toEqual(2);
      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('abcd')).toEqual(8);
    });


    it('when a Function1 is provided then it will be applied after current PartialFunction', () => {
      const longerThan3: Predicate1<NullableOrUndefined<string>> =
        Predicate1.of((s: NullableOrUndefined<string>) => 3 < s!.length);

      const stringLength: Function1<NullableOrUndefined<string>, NullableOrUndefined<number>> =
        Function1.of((s: NullableOrUndefined<string>) => s!.length);

      const multiply2: Function1<NullableOrUndefined<number>, NullableOrUndefined<number>> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);
      const stringLengthIfLongerThan3AndThenMultiply2 = stringLengthIfLongerThan3.andThen(multiply2);

      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('0')).toBeFalse();
      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('abcd')).toBeTrue();

      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('0')).toEqual(2);
      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('abcd')).toEqual(8);
    });


    it('when a PartialFunction is provided then it will be applied after current one', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: string) => 3 < s.length);

      const lowerThan10: Predicate1<number> =
        Predicate1.of((n: number) => 10 > n);

      const stringLength: Function1<string, number> =
        Function1.of((s: string) => s.length);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);
      const multiply2IfLowerThan10 = PartialFunction.of(lowerThan10, multiply2);

      const stringLengthIfLongerThan3AndThenMultiply2IfLowerThan10 = stringLengthIfLongerThan3.andThen(multiply2IfLowerThan10);

      expect(stringLengthIfLongerThan3AndThenMultiply2IfLowerThan10.isDefinedAt('0')).toBeFalse();
      expect(stringLengthIfLongerThan3AndThenMultiply2IfLowerThan10.isDefinedAt('0123456789')).toBeFalse();
      expect(stringLengthIfLongerThan3AndThenMultiply2IfLowerThan10.isDefinedAt('abcd')).toBeTrue();

      expect(stringLengthIfLongerThan3AndThenMultiply2IfLowerThan10.apply('0')).toEqual(2);
      expect(stringLengthIfLongerThan3AndThenMultiply2IfLowerThan10.apply('0123456789')).toEqual(20);
      expect(stringLengthIfLongerThan3AndThenMultiply2IfLowerThan10.apply('abcd')).toEqual(8);
    });

  });



  describe('apply', () => {

    it('when a PartialFunction is provided then the received input will be transformed', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.apply(5)).toEqual(10);
      expect(partialFunction.apply(8)).toEqual(16);
    });

  });



  describe('applyOrElse', () => {

    it('when input does not belong to domain of PartialFunction and defaultFunction null or undefined then an error is thrown', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: string) => 3 < s.length);

      const stringLength: Function1<string, number> =
        Function1.of((s: string) => s.length);

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);

      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.applyOrElse('a', null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.applyOrElse('ab', undefined)).toThrowError(IllegalArgumentError);
    });


    it('when input belongs to domain of PartialFunction then the received it will be transformed', () => {
      const isEven: Predicate1<NullableOrUndefined<number>> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<NullableOrUndefined<number>, NullableOrUndefined<number>> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const plus10: Function1<NullableOrUndefined<number>, NullableOrUndefined<number>> =
        Function1.of((n: NullableOrUndefined<number>) => 10 + n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.applyOrElse(2, plus10)).toEqual(4);
      expect(partialFunction.applyOrElse(8, plus10)).toEqual(16);
    });


    it('when input does not belong to domain of PartialFunction and defaultFunction is a FFunction1 then defaultFunction will be applied', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const plus10: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 10 + n!;

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.applyOrElse(1, plus10)).toEqual(11);
      expect(partialFunction.applyOrElse(9, plus10)).toEqual(19);
    });


    it('when input does not belong to domain of PartialFunction and defaultFunction is a Function1 then defaultFunction will be applied', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const plus10: Function1<number, number> =
        Function1.of((n: number) => 10 + n);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.applyOrElse(3, plus10)).toEqual(13);
      expect(partialFunction.applyOrElse(7, plus10)).toEqual(17);
    });

  });



  describe('compose', () => {

    it('when null or undefined before is given then an error is thrown', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: string) => 3 < s.length);

      const stringLength: Function1<string, number> =
        Function1.of((s: string) => s.length);

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);

      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.compose(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.compose(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a FFunction1 is provided then it will be applied before current PartialFunction', () => {
      const longerThan3: Predicate1<NullableOrUndefined<string>> =
        Predicate1.of((s: NullableOrUndefined<string>) => 3 < s!.length);

      const stringLength: Function1<NullableOrUndefined<string>, NullableOrUndefined<number>> =
        Function1.of((s: NullableOrUndefined<string>) => s!.length);

      const addV2AsSuffix: FFunction1<string, string> =
        (s: NullableOrUndefined<string>) => 'v2' + s!;

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);
      const addV2AsSuffixComposeStringLengthIfLongerThan3 = stringLengthIfLongerThan3.compose(addV2AsSuffix);

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('0')).toBeFalse();
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('abcd')).toBeTrue();

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('0')).toEqual(3);
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('abcd')).toEqual(6);
    });


    it('when a Function1 is provided then it will be applied before current PartialFunction', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: string) => 3 < s.length);

      const stringLength: Function1<string, number> =
        Function1.of((s: string) => s.length);

      const addV2AsSuffix: Function1<string, string> =
        Function1.of((s: string) => 'v2' + s);

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);
      const addV2AsSuffixComposeStringLengthIfLongerThan3 = stringLengthIfLongerThan3.compose(addV2AsSuffix);

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('0')).toBeFalse();
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('abcd')).toBeTrue();

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('0')).toEqual(3);
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('abcd')).toEqual(6);
    });


    it('when a PartialFunction is provided then it will be applied before current one', () => {
      const longerThan3 = (s: string) => 3 < s.length;

      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const stringLength = (s: string) => s.length;

      const toString: Function1<number, string> =
        Function1.of((n: number) => '' + n);

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);
      const toStringIfIsEven = PartialFunction.of(isEven, toString);

      const toStringIfIsEvenComposeStringLengthIfLongerThan3 = stringLengthIfLongerThan3.compose(toStringIfIsEven);

      expect(toStringIfIsEvenComposeStringLengthIfLongerThan3.isDefinedAt(1)).toBeFalse();
      expect(toStringIfIsEvenComposeStringLengthIfLongerThan3.isDefinedAt(10)).toBeFalse();
      expect(toStringIfIsEvenComposeStringLengthIfLongerThan3.isDefinedAt(1000)).toBeTrue();

      expect(toStringIfIsEvenComposeStringLengthIfLongerThan3.apply(1)).toEqual(1);
      expect(toStringIfIsEvenComposeStringLengthIfLongerThan3.apply(10)).toEqual(2);
      expect(toStringIfIsEvenComposeStringLengthIfLongerThan3.apply(1000)).toEqual(4);
    });

  });



  describe('isDefinedAt', () => {

    it('when input does not belong to domain of PartialFunction then false is returned', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.isDefinedAt(1)).toBeFalse();
      expect(partialFunction.isDefinedAt(5)).toBeFalse();
    });


    it('when input belongs to domain of PartialFunction then true is returned', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.isDefinedAt(10)).toBeTrue();
      expect(partialFunction.isDefinedAt(12)).toBeTrue();
    });

  });



  describe('lift', () => {

    it('when input does not belong to domain of PartialFunction then Function1 returns an empty Optional', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const partialFunction = PartialFunction.of(isEven, multiply2);
      const function1: Function1<number, Optional<number>> = partialFunction.lift();

      expect(function1.apply(1).isPresent()).toBeFalse();
      expect(function1.apply(5).isPresent()).toBeFalse();
    });


    it('when input belongs to domain of PartialFunction then Function1 returns a not empty Optional', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);
      const function1: Function1<number, Optional<number>> = partialFunction.lift();

      expect(function1.apply(10).isPresent()).toBeTrue();
      expect(function1.apply(12).isPresent()).toBeTrue();
    });

  });



  describe('orElse', () => {

    it('when input belongs to domain of current PartialFunction then current will applied', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const isLowerThan20: Predicate1<number> =
        Predicate1.of((n: number) => 20 > n);

      const toString: Function1<number, string> =
        Function1.of((n: number) => '' + n);

      const addV2AndToString: Function1<number, string> =
        Function1.of((n: number) => 'v2' + n);

      const partialFunction = PartialFunction.of(isEven, toString);
      const defaultPartialFunction = PartialFunction.of(isLowerThan20, addV2AndToString);

      const orElsePartialFunction = partialFunction.orElse(defaultPartialFunction);

      expect(partialFunction.isDefinedAt(22)).toBeTrue();
      expect(defaultPartialFunction.isDefinedAt(22)).toBeFalse();
      expect(orElsePartialFunction.isDefinedAt(22)).toBeTrue();

      expect(partialFunction.isDefinedAt(30)).toBeTrue();
      expect(defaultPartialFunction.isDefinedAt(30)).toBeFalse();
      expect(orElsePartialFunction.isDefinedAt(30)).toBeTrue();

      expect(partialFunction.apply(22)).toEqual('22');
      expect(defaultPartialFunction.apply(22)).toEqual('v222');
      expect(orElsePartialFunction.apply(22)).toEqual('22');

      expect(partialFunction.apply(30)).toEqual('30');
      expect(defaultPartialFunction.apply(30)).toEqual('v230');
      expect(orElsePartialFunction.apply(30)).toEqual('30');
    });


    it('when input belongs to domain of defaultPartialFunction then defaultPartialFunction will applied', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const isLowerThan20: Predicate1<number> =
        Predicate1.of((n: number) => 20 > n);

      const toString: Function1<number, string> =
        Function1.of((n: number) => '' + n);

      const addV2AndToString: Function1<number, string> =
        Function1.of((n: number) => 'v2' + n);

      const partialFunction = PartialFunction.of(isEven, toString);
      const defaultPartialFunction = PartialFunction.of(isLowerThan20, addV2AndToString);

      const orElsePartialFunction = partialFunction.orElse(defaultPartialFunction);

      expect(partialFunction.isDefinedAt(11)).toBeFalse();
      expect(defaultPartialFunction.isDefinedAt(11)).toBeTrue();
      expect(orElsePartialFunction.isDefinedAt(11)).toBeTrue();

      expect(partialFunction.isDefinedAt(15)).toBeFalse();
      expect(defaultPartialFunction.isDefinedAt(15)).toBeTrue();
      expect(orElsePartialFunction.isDefinedAt(15)).toBeTrue();

      expect(partialFunction.apply(11)).toEqual('11');
      expect(defaultPartialFunction.apply(11)).toEqual('v211');
      expect(orElsePartialFunction.apply(11)).toEqual('v211');

      expect(partialFunction.apply(15)).toEqual('15');
      expect(defaultPartialFunction.apply(15)).toEqual('v215');
      expect(orElsePartialFunction.apply(15)).toEqual('v215');
    });

  });

});
