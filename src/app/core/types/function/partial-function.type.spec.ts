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
      // @ts-ignore
      expect(() => PartialFunction.of(isEvenFPredicate, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of(isEvenFPredicate, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate1 will be used', () => {
      const undefinedVerifierPF = PartialFunction.of(undefined, multiply2FFunction);
      const nullVerifierPF = PartialFunction.of(null, multiply2FFunction);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt(3)).toBeTrue();
      expect(undefinedVerifierPF.apply(3)).toEqual(6);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt(2)).toBeTrue();
      expect(nullVerifierPF.apply(2)).toEqual(4);
    });


    it('when verifier and mapper lambdas are provided then a valid PartialFunction is returned', () => {
      const partialFunction = PartialFunction.of(isEvenRaw, multiply2Raw);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual(4);
      expect(partialFunction.apply(3)).toEqual(6);
    });


    it('when instances of FFunction1 and FPredicate1 are provided then a valid PartialFunction is returned', () => {
      const partialFunction = PartialFunction.of(isEvenFPredicate, multiply2FFunction);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual(4);
      expect(partialFunction.apply(3)).toEqual(6);
    });


    it('when instances of Function1 and Predicate1 are provided then a valid PartialFunction is returned', () => {
      const partialFunction = PartialFunction.of(isEvenPredicateNullable, multiply2FunctionNullable);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual(4);
      expect(partialFunction.apply(3)).toEqual(6);
    });

  });



  describe('ofKeyValueMapper', () => {

    it('when null or undefined keyMapper or valueMapper are given then an error is thrown', () => {
      // @ts-ignore
      expect(() => PartialFunction.ofKeyValueMapper(isEvenFPredicate, null, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofKeyValueMapper(isEvenFPredicate, undefined, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofKeyValueMapper(isEvenFPredicate, multiply2FFunction, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofKeyValueMapper(isEvenFPredicate, multiply2FFunction, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofKeyValueMapper(isEvenFPredicate, null, multiply2FFunction)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.ofKeyValueMapper(isEvenFPredicate, undefined, multiply2FFunction)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate2 will be used', () => {
      const undefinedVerifierPF = PartialFunction.ofKeyValueMapper(undefined, multiply2FFunction, toStringFunction);
      const nullVerifierPF = PartialFunction.ofKeyValueMapper(null, multiply2FFunction, toStringFunction);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt(3)).toBeTrue();
      expect(undefinedVerifierPF.apply(3)).toEqual([6, '3']);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt(2)).toBeTrue();
      expect(nullVerifierPF.apply(2)).toEqual([4, '2']);
    });


    it('when verifier and mapper lambdas are provided then a valid PartialFunction is returned', () => {
      const partialFunction = PartialFunction.ofKeyValueMapper(isEvenRaw, multiply2Raw, toStringRaw);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual([4, '2']);
      expect(partialFunction.apply(3)).toEqual([6, '3']);
    });


    it('when instances of FFunction1 and FPredicate1 are provided then a valid PartialFunction is returned', () => {
      const partialFunction = PartialFunction.ofKeyValueMapper(isEvenFPredicate, multiply2FFunction, toStringFFunction);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual([4, '2']);
      expect(partialFunction.apply(3)).toEqual([6, '3']);
    });


    it('when instances of Function1 and Predicate1 are provided then a valid PartialFunction is returned', () => {
      const partialFunction = PartialFunction.ofKeyValueMapper(isEvenPredicate, multiply2Function, toStringFunction);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt(2)).toBeTrue();
      expect(partialFunction.isDefinedAt(3)).toBeFalse();
      expect(partialFunction.apply(2)).toEqual([4, '2']);
      expect(partialFunction.apply(3)).toEqual([6, '3']);
    });

  });



  describe('of2', () => {

    it('when null or undefined mapper is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => PartialFunction.of2(isAllEvenFPredicate, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2(isAllEvenFPredicate, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate2 will be used', () => {
      const undefinedVerifierPF = PartialFunction.of2(undefined, multiplyFFunction);
      const nullVerifierPF = PartialFunction.of2(null, multiplyFFunction);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt([2, 3])).toBeTrue();
      expect(undefinedVerifierPF.apply([2, 3])).toEqual(6);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt([5, 7])).toBeTrue();
      expect(nullVerifierPF.apply([5, 7])).toEqual(35);
    });


    it('when verifier and mapper lambdas are provided then a valid PartialFunction is returned', () => {
      const partialFunction = PartialFunction.of2(isAllEvenRaw, multiplyRaw);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual(8);
      expect(partialFunction.apply([5, 7])).toEqual(35);
    });


    it('when instances of FFunction2 and FPredicate2 are provided then a valid PartialFunction is returned', () => {
      const partialFunction = PartialFunction.of2(isAllEvenFPredicate, multiplyFFunction);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual(8);
      expect(partialFunction.apply([5, 7])).toEqual(35);
    });


    it('when instances of Function2 and Predicate2 are provided then a valid PartialFunction is returned', () => {
      const partialFunction = PartialFunction.of2(isAllEvenPredicate, multiplyFunction);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual(8);
      expect(partialFunction.apply([5, 7])).toEqual(35);
    });

  });



  describe('of2ToTuple', () => {

    it('when null or undefined mapper is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => PartialFunction.of2ToTuple(isAllEvenRaw, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2ToTuple(isAllEvenRaw, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate2 will be used', () => {
      const multiply2: FFunction2<number, number, [number, number]> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => [2 * n1!, 2 * n2!];

      const undefinedVerifierPF = PartialFunction.of2ToTuple(undefined, multiply2);
      const nullVerifierPF = PartialFunction.of2ToTuple(null, multiply2);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt([2, 3])).toBeTrue();
      expect(undefinedVerifierPF.apply([2, 3])).toEqual([4, 6]);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt([5, 7])).toBeTrue();
      expect(nullVerifierPF.apply([5, 7])).toEqual([10, 14]);
    });


    it('when verifier and mapper lambdas are provided then a valid PartialFunction is returned', () => {
      const multiply2 = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>): [number, number] => [2 * n1!, 2 * n2!];

      const partialFunction = PartialFunction.of2ToTuple(isAllEvenRaw, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([4, 8]);
      expect(partialFunction.apply([5, 7])).toEqual([10, 14]);
    });


    it('when instances of FFunction2 and FPredicate2 are provided then a valid PartialFunction is returned', () => {
      const multiply2: FFunction2<number, number, [number, number]> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => [2 * n1!, 2 * n2!];

      const partialFunction = PartialFunction.of2ToTuple(isAllEvenFPredicate, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([4, 8]);
      expect(partialFunction.apply([5, 7])).toEqual([10, 14]);
    });


    it('when instances of Function2 and Predicate2 are provided then a valid PartialFunction is returned', () => {
      const multiply2: Function2<NullableOrUndefined<number>, NullableOrUndefined<number>, [number, number]> =
        Function2.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => [2 * n1!, 2 * n2!]);

      const partialFunction = PartialFunction.of2ToTuple(isAllEvenPredicateNullable, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([4, 8]);
      expect(partialFunction.apply([5, 7])).toEqual([10, 14]);
    });

  });



  describe('of2KeyValueMapper', () => {

    it('when null or undefined keyMapper or valueMapper are given then an error is thrown', () => {
      // @ts-ignore
      expect(() => PartialFunction.of2KeyValueMapper(isAllEvenFPredicate, null, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2KeyValueMapper(isAllEvenFPredicate, undefined, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2KeyValueMapper(isAllEvenFPredicate, multiplyFFunction, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2KeyValueMapper(isAllEvenFPredicate, multiplyFFunction, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2KeyValueMapper(isAllEvenFPredicate, null, multiplyFFunction)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => PartialFunction.of2KeyValueMapper(isAllEvenFPredicate, undefined, multiplyFFunction)).toThrowError(IllegalArgumentError);
    });


    it('when null or undefined verifier is given then alwaysTrue Predicate2 will be used', () => {
      const toString: Function2<number, number, string> =
        Function2.of((n1: number, n2: number) => '' + n1 + n2);

      const undefinedVerifierPF = PartialFunction.of2KeyValueMapper(undefined, multiplyFFunction, toString);
      const nullVerifierPF = PartialFunction.of2KeyValueMapper(null, multiplyFFunction, toString);

      expect(PartialFunction.isPartialFunction(undefinedVerifierPF)).toBeTrue();
      expect(undefinedVerifierPF.isDefinedAt([2, 3])).toBeTrue();
      expect(undefinedVerifierPF.apply([2, 3])).toEqual([6, '23']);

      expect(PartialFunction.isPartialFunction(nullVerifierPF)).toBeTrue();
      expect(nullVerifierPF.isDefinedAt([5, 7])).toBeTrue();
      expect(nullVerifierPF.apply([5, 7])).toEqual([35, '57']);
    });


    it('when verifier, keyMapper and valueMapper are lambdas then a valid PartialFunction is returned', () => {
      const toString = (n1: number, n2: number) => '' + n1 + n2;

      const partialFunction = PartialFunction.of2KeyValueMapper(isAllEvenRaw, multiplyRaw, toString);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([8, '24']);
      expect(partialFunction.apply([5, 7])).toEqual([35, '57']);
    });


    it('when instances of FFunction2 and FPredicate2 are provided then a valid PartialFunction is returned', () => {
      const toString: FFunction2<number, number, string> =
        (n1: number, n2: number) => '' + n1 + n2;

      const partialFunction = PartialFunction.of2KeyValueMapper(isAllEvenFPredicate, multiplyFFunction, toString);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([8, '24']);
      expect(partialFunction.apply([5, 7])).toEqual([35, '57']);
    });


    it('when instances of Function2 and Predicate2 are provided then a valid PartialFunction is returned', () => {
      const toString: Function2<number, number, string> =
        Function2.of((n1: number, n2: number) => '' + n1 + n2);

      const partialFunction = PartialFunction.of2KeyValueMapper(isAllEvenPredicate, multiplyFunction, toString);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.isDefinedAt([2, 4])).toBeTrue();
      expect(partialFunction.isDefinedAt([5, 7])).toBeFalse();
      expect(partialFunction.apply([2, 4])).toEqual([8, '24']);
      expect(partialFunction.apply([5, 7])).toEqual([35, '57']);
    });

  });



  describe('getMapper', () => {

    it('then return internal mapper', () => {
      const partialFunction = PartialFunction.of(isEvenPredicate, multiply2Function);

      const mapper: Function1<number, number> = partialFunction.getMapper();

      expect(mapper.apply(5)).toEqual(10);
      expect(mapper.apply(8)).toEqual(16);
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const partialFunction = PartialFunction.of(isEvenPredicate, multiply2Function);

      const verifier: Predicate1<number> = partialFunction.getVerifier();

      expect(verifier.apply(5)).toEqual(false);
      expect(verifier.apply(8)).toEqual(true);
    });

  });



  describe('andThen', () => {

    it('when null or undefined after is given then an error is thrown', () => {
      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3Predicate, stringLengthFunction);

      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.andThen(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.andThen(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a FFunction1 is provided then it will be applied after current PartialFunction', () => {
      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3Predicate, stringLengthFunction);
      const stringLengthIfLongerThan3AndThenMultiply2 = stringLengthIfLongerThan3.andThen(multiply2FFunction);

      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('0')).toBeFalse();
      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('abcd')).toBeTrue();

      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('0')).toEqual(2);
      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('abcd')).toEqual(8);
    });


    it('when a Function1 is provided then it will be applied after current PartialFunction', () => {
      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3PredicateNullable, stringLengthFunctionNullable);
      const stringLengthIfLongerThan3AndThenMultiply2 = stringLengthIfLongerThan3.andThen(multiply2FunctionNullable);

      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('0')).toBeFalse();
      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('abcd')).toBeTrue();

      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('0')).toEqual(2);
      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('abcd')).toEqual(8);
    });


    it('when a PartialFunction is provided then it will be applied after current one', () => {
      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3Predicate, stringLengthFunction);
      const multiply2IfLowerThan10 = PartialFunction.of(lowerThan10Predicate, multiply2Function);

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
      const partialFunction = PartialFunction.of(isEvenPredicate, multiply2Function);

      expect(partialFunction.apply(5)).toEqual(10);
      expect(partialFunction.apply(8)).toEqual(16);
    });

  });



  describe('applyOrElse', () => {

    it('when input does not belong to domain of PartialFunction and defaultFunction null or undefined then an error is thrown', () => {
      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3Predicate, stringLengthFunction);

      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.applyOrElse('a', null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.applyOrElse('ab', undefined)).toThrowError(IllegalArgumentError);
    });


    it('when input belongs to domain of PartialFunction then the received it will be transformed', () => {
      const partialFunction = PartialFunction.of(isEvenPredicateNullable, multiply2FunctionNullable);

      expect(partialFunction.applyOrElse(2, plus10FunctionNullable)).toEqual(4);
      expect(partialFunction.applyOrElse(8, plus10FunctionNullable)).toEqual(16);
    });


    it('when input does not belong to domain of PartialFunction and defaultFunction is a FFunction1 then defaultFunction will be applied', () => {
      const partialFunction = PartialFunction.of(isEvenPredicate, multiply2Function);

      expect(partialFunction.applyOrElse(1, plus10FFunction)).toEqual(11);
      expect(partialFunction.applyOrElse(9, plus10FFunction)).toEqual(19);
    });


    it('when input does not belong to domain of PartialFunction and defaultFunction is a Function1 then defaultFunction will be applied', () => {
      const partialFunction = PartialFunction.of(isEvenPredicate, multiply2Function);

      expect(partialFunction.applyOrElse(3, plus10Function)).toEqual(13);
      expect(partialFunction.applyOrElse(7, plus10Function)).toEqual(17);
    });

  });



  describe('compose', () => {

    it('when null or undefined before is given then an error is thrown', () => {
      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3Predicate, stringLengthFunction);

      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.compose(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => stringLengthIfLongerThan3.compose(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a FFunction1 is provided then it will be applied before current PartialFunction', () => {
      const addV2AsSuffix: FFunction1<string, string> =
        (s: NullableOrUndefined<string>) => 'v2' + s!;

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3PredicateNullable, stringLengthFunctionNullable);
      const addV2AsSuffixComposeStringLengthIfLongerThan3 = stringLengthIfLongerThan3.compose(addV2AsSuffix);

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('0')).toBeFalse();
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('abcd')).toBeTrue();

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('0')).toEqual(3);
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('abcd')).toEqual(6);
    });


    it('when a Function1 is provided then it will be applied before current PartialFunction', () => {
      const addV2AsSuffix: Function1<string, string> =
        Function1.of((s: string) => 'v2' + s);

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3Predicate, stringLengthFunction);
      const addV2AsSuffixComposeStringLengthIfLongerThan3 = stringLengthIfLongerThan3.compose(addV2AsSuffix);

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('0')).toBeFalse();
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('abcd')).toBeTrue();

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('0')).toEqual(3);
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('abcd')).toEqual(6);
    });


    it('when a PartialFunction is provided then it will be applied before current one', () => {
      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3Raw, stringLengthRaw);
      const toStringIfIsEven = PartialFunction.of(isEvenPredicate, toStringFunction);

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
      const partialFunction = PartialFunction.of(isEvenPredicate, multiply2Function);

      expect(partialFunction.isDefinedAt(1)).toBeFalse();
      expect(partialFunction.isDefinedAt(5)).toBeFalse();
    });


    it('when input belongs to domain of PartialFunction then true is returned', () => {
      const partialFunction = PartialFunction.of(isEvenPredicate, multiply2Function);

      expect(partialFunction.isDefinedAt(10)).toBeTrue();
      expect(partialFunction.isDefinedAt(12)).toBeTrue();
    });

  });



  describe('lift', () => {

    it('when input does not belong to domain of PartialFunction then Function1 returns an empty Optional', () => {
      const partialFunction = PartialFunction.of(isEvenPredicate, multiply2Function);
      const function1: Function1<number, Optional<number>> = partialFunction.lift();

      expect(function1.apply(1).isPresent()).toBeFalse();
      expect(function1.apply(5).isPresent()).toBeFalse();
    });


    it('when input belongs to domain of PartialFunction then Function1 returns a not empty Optional', () => {
      const partialFunction = PartialFunction.of(isEvenPredicate, multiply2Function);
      const function1: Function1<number, Optional<number>> = partialFunction.lift();

      expect(function1.apply(10).isPresent()).toBeTrue();
      expect(function1.apply(12).isPresent()).toBeTrue();
    });

  });



  describe('orElse', () => {

    it('when input belongs to domain of current PartialFunction then current will applied', () => {
      const partialFunction = PartialFunction.of(isEvenPredicate, toStringFunction);
      const defaultPartialFunction = PartialFunction.of(isLowerThan20Predicate, addV2AndToStringFunction);

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
      const partialFunction = PartialFunction.of(isEvenPredicate, toStringFunction);
      const defaultPartialFunction = PartialFunction.of(isLowerThan20Predicate, addV2AndToStringFunction);

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



const isEvenRaw =
  (n: NullableOrUndefined<number>) =>
    0 == n! % 2;


const isEvenFPredicate: FPredicate1<number> =
  (n: NullableOrUndefined<number>) =>
    0 == n! % 2;


const isEvenPredicate: Predicate1<number> =
  Predicate1.of(
    (n: number) =>
      0 == n % 2
  );


const isEvenPredicateNullable: Predicate1<NullableOrUndefined<number>> =
  Predicate1.of(
    (n: NullableOrUndefined<number>) =>
      0 == n! % 2
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


const multiply2FunctionNullable: Function1<NullableOrUndefined<number>, NullableOrUndefined<number>> =
  Function1.of(
    (n: NullableOrUndefined<number>) =>
      2 * n!
  );


const isAllEvenRaw =
  (n1: NullableOrUndefined<number>,
   n2: NullableOrUndefined<number>) =>
    0 == n1! % 2 &&
    0 == n2! % 2;


const isAllEvenFPredicate: FPredicate2<number, number> =
  (n1: NullableOrUndefined<number>,
   n2: NullableOrUndefined<number>) =>
    0 == n1! % 2 && 0 == n2! % 2;


const isAllEvenPredicate: Predicate2<number, number> =
  Predicate2.of(
    (n1: number,
     n2: number) =>
      0 == n1 % 2 &&
      0 == n2 % 2
  );


const isAllEvenPredicateNullable: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<number>> =
  Predicate2.of(
    (n1: NullableOrUndefined<number>,
     n2: NullableOrUndefined<number>) =>
      0 == n1! % 2 &&
      0 == n2! % 2
  );


const multiplyRaw =
  (n1: NullableOrUndefined<number>,
   n2: NullableOrUndefined<number>) =>
    n1! * n2!;


const multiplyFFunction: FFunction2<number, number, number> =
  (n1: NullableOrUndefined<number>,
   n2: NullableOrUndefined<number>) =>
    n1! * n2!;


const multiplyFunction: Function2<number, number, number> =
  Function2.of(
    (n1: number,
     n2: number) =>
      n1 * n2
  );


const toStringRaw =
  (n: number) =>
    '' + n;


const toStringFFunction: FFunction1<number, string> =
  (n: number) =>
    '' + n;


const toStringFunction: Function1<number, string> =
  Function1.of(
    (n: number) =>
      '' + n
  );


const longerThan3Raw =
  (s: string) =>
    3 < s.length;


const longerThan3Predicate: Predicate1<string> =
  Predicate1.of(
    (s: string) =>
      3 < s.length
  );


const longerThan3PredicateNullable: Predicate1<NullableOrUndefined<string>> =
  Predicate1.of(
    (s: NullableOrUndefined<string>) =>
      3 < s!.length
  );


const lowerThan10Predicate: Predicate1<number> =
  Predicate1.of(
    (n: number) =>
      10 > n
  );


const stringLengthRaw =
  (s: string) =>
    s.length;


const stringLengthFunction: Function1<string, number> =
  Function1.of(
    (s: string) =>
      s.length
  );


const stringLengthFunctionNullable: Function1<NullableOrUndefined<string>, NullableOrUndefined<number>> =
  Function1.of(
    (s: NullableOrUndefined<string>) =>
      s!.length
  );


const plus10FFunction: FFunction1<number, number> =
  (n: NullableOrUndefined<number>) =>
    10 + n!;


const plus10Function: Function1<number, number> =
  Function1.of(
    (n: number) => 10 + n
  );


const plus10FunctionNullable: Function1<NullableOrUndefined<number>, NullableOrUndefined<number>> =
  Function1.of(
    (n: NullableOrUndefined<number>) =>
      10 + n!
  );


const isLowerThan20Predicate: Predicate1<number> =
  Predicate1.of(
    (n: number) =>
      20 > n
  );


const addV2AndToStringFunction: Function1<number, string> =
  Function1.of(
    (n: number) =>
      'v2' + n
  );
