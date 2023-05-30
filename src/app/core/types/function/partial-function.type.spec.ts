import { FFunction1, FPredicate1, Function1, NullableOrUndefined, Optional, PartialFunction, Predicate1 } from '@app-core/types';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/function/partial-function.type.spec.ts
 */
describe('PartialFunction', () => {


  describe('identity', () => {

    it('when an input parameter is used then such parameter is returned', () => {
      const identityPartialFunction: PartialFunction<string, NullableOrUndefined<string>> =
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
          (n: NullableOrUndefined<number>) => 0 == n! % 2,
          (n: NullableOrUndefined<number>) => 2 * n!
        );

      expect(PartialFunction.isPartialFunction(multiply2ForEven)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when instances of FFunction1 anf FPredicate1 are provided then a valid PartialFunction is returned', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.apply(2)).toEqual(4);
      expect(partialFunction.apply(3)).toEqual(6);
    });


    it('when instances of FFunction1 anf Predicate1 are provided then a valid PartialFunction is returned', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(PartialFunction.isPartialFunction(partialFunction)).toBeTrue();
      expect(partialFunction.apply(2)).toEqual(4);
      expect(partialFunction.apply(3)).toEqual(6);
    });

  });


  describe('andThen', () => {

    it('when a FFunction1 is provided then it will be applied after current PartialFunction', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: NullableOrUndefined<string>) => 3 < s!.length);

      const stringLength: Function1<string, number> =
        Function1.of((s: NullableOrUndefined<string>) => s!.length);

      const multiply2: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 2 * n!;

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);
      const stringLengthIfLongerThan3AndThenMultiply2 = stringLengthIfLongerThan3.andThen(multiply2);

      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('0')).toBeFalse();
      expect(stringLengthIfLongerThan3AndThenMultiply2.isDefinedAt('abcd')).toBeTrue();

      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('0')).toEqual(2);
      expect(stringLengthIfLongerThan3AndThenMultiply2.apply('abcd')).toEqual(8);
    });


    it('when a Function1 is provided then it will be applied after current PartialFunction', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: NullableOrUndefined<string>) => 3 < s!.length);

      const stringLength: Function1<string, number> =
        Function1.of((s: NullableOrUndefined<string>) => s!.length);

      const multiply2: Function1<number, number> =
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
        Predicate1.of((s: NullableOrUndefined<string>) => 3 < s!.length);

      const lowerThan10: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 10 > n!);

      const stringLength: Function1<string, number> =
        Function1.of((s: NullableOrUndefined<string>) => s!.length);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

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
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.apply(5)).toEqual(10);
      expect(partialFunction.apply(8)).toEqual(16);
    });

  });


  describe('applyOrElse', () => {

    it('when input belongs to domain of PartialFunction then the received it will be transformed', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const plus10: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 10 + n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.applyOrElse(2, plus10)).toEqual(4);
      expect(partialFunction.applyOrElse(8, plus10)).toEqual(16);
    });


    it('when input does not belong to domain of PartialFunction and defaultFunction is a FFunction1 then defaultFunction will be applied', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const plus10: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 10 + n!;

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.applyOrElse(1, plus10)).toEqual(11);
      expect(partialFunction.applyOrElse(9, plus10)).toEqual(19);
    });


    it('when input does not belong to domain of PartialFunction and defaultFunction is a Function1 then defaultFunction will be applied', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const plus10: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 10 + n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.applyOrElse(3, plus10)).toEqual(13);
      expect(partialFunction.applyOrElse(7, plus10)).toEqual(17);
    });

  });



  describe('compose', () => {

    it('when a FFunction1 is provided then it will be applied before current PartialFunction', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: NullableOrUndefined<string>) => 3 < s!.length);

      const stringLength: Function1<string, number> =
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
        Predicate1.of((s: NullableOrUndefined<string>) => 3 < s!.length);

      const stringLength: Function1<string, number> =
        Function1.of((s: NullableOrUndefined<string>) => s!.length);

      const addV2AsSuffix: Function1<string, string> =
        Function1.of((s: NullableOrUndefined<string>) => 'v2' + s);

      const stringLengthIfLongerThan3 = PartialFunction.of(longerThan3, stringLength);
      const addV2AsSuffixComposeStringLengthIfLongerThan3 = stringLengthIfLongerThan3.compose(addV2AsSuffix);

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('0')).toBeFalse();
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.isDefinedAt('abcd')).toBeTrue();

      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('0')).toEqual(3);
      expect(addV2AsSuffixComposeStringLengthIfLongerThan3.apply('abcd')).toEqual(6);
    });


    it('when a PartialFunction is provided then it will be applied before current one', () => {
      const longerThan3: Predicate1<string> =
        Predicate1.of((s: NullableOrUndefined<string>) => 3 < s!.length);

      const isEven: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const stringLength: Function1<string, number> =
        Function1.of((s: NullableOrUndefined<string>) => s!.length);

      const toString: Function1<number, string> =
        Function1.of((n: NullableOrUndefined<number>) => '' + n!);

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
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.isDefinedAt(1)).toBeFalse();
      expect(partialFunction.isDefinedAt(5)).toBeFalse();
    });


    it('when input belongs to domain of PartialFunction then true is returned', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);

      expect(partialFunction.isDefinedAt(10)).toBeTrue();
      expect(partialFunction.isDefinedAt(12)).toBeTrue();
    });

  });



  describe('lift', () => {

    it('when input does not belong to domain of PartialFunction then Function1 returns an empty Optional', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);
      const function1: Function1<number, Optional<number>> = partialFunction.lift();

      expect(function1.apply(1).isPresent()).toBeFalse();
      expect(function1.apply(5).isPresent()).toBeFalse();
    });


    it('when input belongs to domain of PartialFunction then Function1 returns a not empty Optional', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const multiply2: Function1<number, number> =
        Function1.of((n: NullableOrUndefined<number>) => 2 * n!);

      const partialFunction = PartialFunction.of(isEven, multiply2);
      const function1: Function1<number, Optional<number>> = partialFunction.lift();

      expect(function1.apply(10).isPresent()).toBeTrue();
      expect(function1.apply(12).isPresent()).toBeTrue();
    });

  });



  describe('orElse', () => {

    it('when input belongs to domain of current PartialFunction then current will applied', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const isLowerThan20: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 20 > n!);

      const toString: Function1<number, string> =
        Function1.of((n: NullableOrUndefined<number>) => '' + n!);

      const addV2AndToString: Function1<number, string> =
        Function1.of((n: NullableOrUndefined<number>) => 'v2' + n!);

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
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const isLowerThan20: Predicate1<number> =
        Predicate1.of((n: NullableOrUndefined<number>) => 20 > n!);

      const toString: Function1<number, string> =
        Function1.of((n: NullableOrUndefined<number>) => '' + n!);

      const addV2AndToString: Function1<number, string> =
        Function1.of((n: NullableOrUndefined<number>) => 'v2' + n!);

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
