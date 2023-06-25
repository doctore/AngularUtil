import { NullableOrUndefined } from '@app-core/types';
import { Predicate3, FPredicate3, isFPredicate3 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/predicate/predicate3.type.spec.ts
 */
describe('isFPredicate3', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate3()).toBeFalse();
    expect(isFPredicate3(null)).toBeFalse();
    expect(isFPredicate3(12)).toBeFalse();
    expect(isFPredicate3({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate3((t1: string) => null !== t1)).toBeFalse();
    expect(isFPredicate3((t1: string, t2: string) => null !== t1 && null !== t2)).toBeFalse();
    expect(isFPredicate3((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null != t3 && null != t4)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate3((t1: string, t2: string, t3: string) => true)).toBeTrue();
    expect(isFPredicate3((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null != t3)).toBeTrue();
  });

});




describe('Predicate3', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate3.allOf<number, string, boolean>().apply(5, '', true)).toBeTrue();
      expect(Predicate3.allOf<number, string, boolean>(null).apply(5, '', false)).toBeTrue();
      expect(Predicate3.allOf<number, string, boolean>([]).apply(5, '', true)).toBeTrue();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const isNumberEvenAndStringLongerThan2AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) => 0 == n % 2 && 2 < s.length && !b);

      const isNumberLowerThan20AndStringLongerThan5AndBooleanFalse =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean) => 20 > n! && 5 < s!.length && !b;

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalse, isNumberLowerThan20AndStringLongerThan5AndBooleanFalse])
        .apply(11, 'abcdef', false)).toBeFalse();

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalse, isNumberLowerThan20AndStringLongerThan5AndBooleanFalse])
        .apply(12, 'abcd', false)).toBeFalse();

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalse, isNumberLowerThan20AndStringLongerThan5AndBooleanFalse])
        .apply(30, 'a', false)).toBeFalse();

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalse, isNumberLowerThan20AndStringLongerThan5AndBooleanFalse])
        .apply(10, 'abcdef', false)).toBeTrue();
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate3.alwaysFalse();

      expect(predicate.apply(1, false, 'g')).toBeFalse();
      expect(predicate.apply('a', 21, true)).toBeFalse();
      expect(predicate.apply('123', true, 43)).toBeFalse();
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate3.alwaysTrue();

      expect(predicate.apply(1, false, 't')).toBeTrue();
      expect(predicate.apply('a', 21, true)).toBeTrue();
      expect(predicate.apply('123', true, 99)).toBeTrue();
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate3.anyOf<number, string, boolean>().apply(5, '', true)).toBeFalse();
      expect(Predicate3.anyOf<number, string, boolean>(null).apply(5, '', false)).toBeFalse();
      expect(Predicate3.anyOf<number, string, boolean>([]).apply(5, '', true)).toBeFalse();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const isNumberEvenAndStringLongerThan2AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) => 0 == n % 2 && 2 < s.length && !b);

      const isNumberLowerThan20AndStringLongerThan5AndBooleanFalse =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean) => 20 > n! && 5 < s!.length && !b;

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalse, isNumberLowerThan20AndStringLongerThan5AndBooleanFalse])
        .apply(10, 'abcdef', false)).toBeTrue();

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalse, isNumberLowerThan20AndStringLongerThan5AndBooleanFalse])
        .apply(11, 'abcdef', false)).toBeTrue();

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalse, isNumberLowerThan20AndStringLongerThan5AndBooleanFalse])
        .apply(22, 'abc', false)).toBeTrue();

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalse, isNumberLowerThan20AndStringLongerThan5AndBooleanFalse])
        .apply(30, 'a', false)).toBeFalse();
    });
  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate3.isPredicate()).toBeFalse();
      expect(Predicate3.isPredicate(null)).toBeFalse();
      expect(Predicate3.isPredicate('')).toBeFalse();
      expect(Predicate3.isPredicate(12)).toBeFalse();
      expect(Predicate3.isPredicate({})).toBeFalse();
      expect(Predicate3.isPredicate({ apply: (n: number) => n*2 })).toBeFalse();
    });


    it('when a predicate is provided then true is returned', () => {
      const isNumberEvenAndStringBooleanNotNull: Predicate3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>> =
        Predicate3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b
        );

      expect(Predicate3.isPredicate(isNumberEvenAndStringBooleanNotNull)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined predicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Predicate3.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Predicate3.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FPredicate3 is provided then a valid Predicate3 is returned', () => {
      const isNumberEvenAndStringAndBooleanNotNull =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b;

      const predicate = Predicate3.of(isNumberEvenAndStringAndBooleanNotNull);

      expect(Predicate3.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, false)).toBeFalse();
      expect(predicate.apply(1, 'abc', null)).toBeFalse();
      expect(predicate.apply(2, 'abc', true)).toBeTrue();
    });


    it('when an instance of FPredicate3 is provided then a valid Predicate3 is returned', () => {
      const isNumberEvenAndStringNotNull: FPredicate3<number, string, boolean> =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b;

      const predicate = Predicate3.of(isNumberEvenAndStringNotNull);

      expect(Predicate3.isPredicate(predicate)).toBeTrue();
      // @ts-ignore
      expect(predicate.apply(1, null, false)).toBeFalse();
      // @ts-ignore
      expect(predicate.apply(1, 'abc', null)).toBeFalse();
      expect(predicate.apply(2, 'abc', true)).toBeTrue();
    });


    it('when an instance of Predicate3 is provided then the same one is returned', () => {
      const isNumberEvenAndStringBooleanNotNull: Predicate3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>> =
        Predicate3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b
        );

      const predicate = Predicate3.of(isNumberEvenAndStringBooleanNotNull);

      expect(Predicate3.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, false)).toBeFalse();
      expect(predicate.apply(1, 'abc', null)).toBeFalse();
      expect(predicate.apply(2, 'abc', true)).toBeTrue();
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      const isNumberEvenAndStringLongerThan3AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          0 == n % 2 &&
          3 < s.length &&
          !b);

      // @ts-ignore
      const andPredicates = isNumberEvenAndStringLongerThan3AndBooleanFalse.and(null);

      expect(andPredicates.apply(11, 'abcd', true)).toBeFalse();
      expect(andPredicates.apply(10, 'ab', false)).toBeFalse();
      expect(andPredicates.apply(22, 'abcd', false)).toBeTrue();
      expect(andPredicates.apply(18, 'abcde', false)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const isNumberEvenAndStringLongerThan3AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          0 == n % 2 &&
          3 < s.length &&
          !b);

      const isNumberLowerThan20AndStringSmallerThan5AndBooleanTrue: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          20 > n &&
          5 > s.length &&
          b);

      const andPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalse.and(isNumberLowerThan20AndStringSmallerThan5AndBooleanTrue);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanTrue.and(isNumberEvenAndStringLongerThan3AndBooleanFalse);

      expect(andPredicates1.apply(11, 'abcd', false)).toBeFalse();
      expect(andPredicates1.apply(10, 'ab', true)).toBeFalse();
      expect(andPredicates1.apply(22, 'abcd', false)).toBeFalse();
      expect(andPredicates1.apply(18, 'abcde', true)).toBeFalse();

      expect(andPredicates2.apply(11, 'abcd', false)).toBeFalse();
      expect(andPredicates2.apply(10, 'ab', true)).toBeFalse();
      expect(andPredicates2.apply(22, 'abcd', false)).toBeFalse();
      expect(andPredicates2.apply(18, 'abcde', true)).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const isNumberEvenAndStringLongerThan3AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          0 == n % 2 &&
          3 < s.length &&
          !b);

      const isNumberLowerThan20AndStringSmallerThan5AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          20 > n &&
          5 > s.length &&
          !b);

      const andPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalse.and(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalse);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalse.and(isNumberEvenAndStringLongerThan3AndBooleanFalse);

      expect(andPredicates1.apply(12, 'abcd', false)).toBeTrue();
      expect(andPredicates1.apply(18, '1234', false)).toBeTrue();
      expect(andPredicates2.apply(12, 'abcd', false)).toBeTrue();
      expect(andPredicates2.apply(18, '1234', false)).toBeTrue();
    });

  });



  describe('apply', () => {

    it('when a Predicate3 is provided then the received input will be evaluated', () => {
      const isNumberEvenAndStringLongerThan3AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          0 == n % 2 &&
          3 < s.length &&
          !b);

      expect(isNumberEvenAndStringLongerThan3AndBooleanFalse.apply(11, 'abcd', false)).toBeFalse();
      expect(isNumberEvenAndStringLongerThan3AndBooleanFalse.apply(2, 'ab', true)).toBeFalse();
      expect(isNumberEvenAndStringLongerThan3AndBooleanFalse.apply(12, 'abcd', false)).toBeTrue();
    });

  });



  describe('not', () => {

    it('when a Predicate3 is provided then logical negation will be returned', () => {
      const isNumberEvenAndStringLongerThan3AndBooleanFalse: Predicate3<NullableOrUndefined<number>, NullableOrUndefined<string>, boolean> =
        Predicate3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean) =>
          0 == n! % 2 &&
          3 < s!.length &&
          !b);

      const notIsNumberEvenAndStringLongerThan3AndBooleanFalse = isNumberEvenAndStringLongerThan3AndBooleanFalse.not();

      expect(notIsNumberEvenAndStringLongerThan3AndBooleanFalse.apply(11, 'abcd', true)).toBeTrue();
      expect(notIsNumberEvenAndStringLongerThan3AndBooleanFalse.apply(2, 'ab', true)).toBeTrue();
      expect(notIsNumberEvenAndStringLongerThan3AndBooleanFalse.apply(12, 'abcd', false)).toBeFalse();
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      const isNumberEvenAndStringLongerThan3AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          0 == n! % 2 &&
          3 < s!.length &&
          !b);

      // @ts-ignore
      const orPredicates = isNumberEvenAndStringLongerThan3AndBooleanFalse.or(undefined);

      expect(orPredicates.apply(11, 'abcd', true)).toBeFalse();
      expect(orPredicates.apply(10, 'ab', false)).toBeFalse();
      expect(orPredicates.apply(22, 'abcd', false)).toBeTrue();
      expect(orPredicates.apply(18, 'abcde', false)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const isNumberEvenAndStringLongerThan3AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          0 == n % 2 &&
          3 < s.length &&
          !b);

      const isNumberLowerThan20AndStringSmallerThan5AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          20 > n &&
          5 > s.length &&
          !b);

      const orPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalse.or(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalse);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalse.or(isNumberEvenAndStringLongerThan3AndBooleanFalse);

      expect(orPredicates1.apply(22, 'abcd', false)).toBeTrue();
      expect(orPredicates1.apply(11, 'abcd', false)).toBeTrue();

      expect(orPredicates2.apply(22, 'abcd', false)).toBeTrue();
      expect(orPredicates2.apply(11, 'abcd', false)).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const isNumberEvenAndStringLongerThan3AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          0 == n % 2 &&
          3 < s.length &&
          !b);

      const isNumberLowerThan20AndStringSmallerThan5AndBooleanFalse: Predicate3<number, string, boolean> =
        Predicate3.of((n: number, s: string, b: boolean) =>
          20 > n &&
          5 > s.length &&
          !b);

      const orPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalse.or(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalse);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalse.or(isNumberEvenAndStringLongerThan3AndBooleanFalse);

      expect(orPredicates1.apply(21, 'ab', true)).toBeFalse();
      expect(orPredicates1.apply(22, 'abc', false)).toBeFalse();
      expect(orPredicates1.apply(24, 'ab', true)).toBeFalse();

      expect(orPredicates2.apply(21, 'ab', true)).toBeFalse();
      expect(orPredicates2.apply(22, 'abc', false)).toBeFalse();
      expect(orPredicates2.apply(24, 'ab', true)).toBeFalse();
    });

  });

});
