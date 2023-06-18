import { NullableOrUndefined } from '@app-core/types';
import { Predicate2, FPredicate2, isFPredicate2} from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/predicate/predicate2.type.spec.ts
 */
describe('isFPredicate2', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate2()).toBeFalse();
    expect(isFPredicate2(null)).toBeFalse();
    expect(isFPredicate2(12)).toBeFalse();
    expect(isFPredicate2({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate2((t1: string) => null !== t1)).toBeFalse();
    expect(isFPredicate2((t1: string, t2: string, t3: string) => t1 + t2 + t3)).toBeFalse();
    expect(isFPredicate2((t1: string, t2: string, t3: string, t4: string) => t1 + t2 + t3 + t4)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate2((t1: string, t2: string) => true)).toBeTrue();
    expect(isFPredicate2((t1: string, t2: string) => null !== t1 && null !== t2)).toBeTrue();
  });

});




describe('Predicate2', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate2.allOf<number, string>().apply(5, '')).toBeTrue();
      expect(Predicate2.allOf<number, string>(null).apply(5, '')).toBeTrue();
      expect(Predicate2.allOf<number, string>([]).apply(5, '')).toBeTrue();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const isNumberEvenAndStringLongerThan2: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) => 0 == n % 2 && 2 < s.length);

      const isNumberLowerThan20AndStringLongerThan5 =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) => 20 > n! && 5 < s!.length;

      expect(Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(11, 'abcdef')).toBeFalse();
      expect(Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(12, 'abcd')).toBeFalse();
      expect(Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(30, 'a')).toBeFalse();
      expect(Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(10, 'abcdef')).toBeTrue();
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate2.alwaysFalse();

      expect(predicate.apply(1, false)).toBeFalse();
      expect(predicate.apply('a', 21)).toBeFalse();
      expect(predicate.apply('123', true)).toBeFalse();
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate2.alwaysTrue();

      expect(predicate.apply(1, false)).toBeTrue();
      expect(predicate.apply('a', 21)).toBeTrue();
      expect(predicate.apply('123', true)).toBeTrue();
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate2.anyOf<number, string>().apply(5, '')).toBeFalse();
      expect(Predicate2.anyOf<number, string>(null).apply(5, '')).toBeFalse();
      expect(Predicate2.anyOf<number, string>([]).apply(5, '')).toBeFalse();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const isNumberEvenAndStringLongerThan2 =
        (n: number, s: string) => 0 == n % 2 && 2 < s.length;

      const isNumberLowerThan20AndStringLongerThan5: FPredicate2<number, string> =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) => 20 > n! && 5 < s!.length;

      expect(Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(10, 'abcdef')).toBeTrue();
      expect(Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(11, 'abcdef')).toBeTrue();
      expect(Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(22, 'abc')).toBeTrue();
      expect(Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(30, 'a')).toBeFalse();
    });
  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate2.isPredicate()).toBeFalse();
      expect(Predicate2.isPredicate(null)).toBeFalse();
      expect(Predicate2.isPredicate('')).toBeFalse();
      expect(Predicate2.isPredicate(12)).toBeFalse();
      expect(Predicate2.isPredicate({})).toBeFalse();
      expect(Predicate2.isPredicate({ apply: (n: number) => n*2 })).toBeFalse();
    });


    it('when a predicate is provided then true is returned', () => {
      const isNumberEvenAndStringNotNull: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
        Predicate2.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s
        );

      expect(Predicate2.isPredicate(isNumberEvenAndStringNotNull)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined predicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Predicate2.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Predicate2.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when an instance of FPredicate2 is provided then a valid Predicate2 is returned', () => {
      const isNumberEvenAndStringNotNull: FPredicate2<number, string> =
        (n: NullableOrUndefined<number>, s?: NullableOrUndefined<string>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s;

      const predicate = Predicate2.of(isNumberEvenAndStringNotNull);

      expect(Predicate2.isPredicate(predicate)).toBeTrue();
      // @ts-ignore
      expect(predicate.apply(1, null)).toBeFalse();
      expect(predicate.apply(1, 'abc')).toBeFalse();
      expect(predicate.apply(2, 'abc')).toBeTrue();
    });


    it('when an instance of Predicate2 is provided then the same one is returned', () => {
      const isNumberEvenAndStringNotNull: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          0 == n % 2 &&
          undefined !== s &&
          null !== s);

      const predicate = Predicate2.of(isNumberEvenAndStringNotNull);

      expect(Predicate2.isPredicate(predicate)).toBeTrue();
      // @ts-ignore
      expect(predicate.apply(1, null)).toBeFalse();
      expect(predicate.apply(1, 'abc')).toBeFalse();
      expect(predicate.apply(2, 'abc')).toBeTrue();
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      const isNumberEvenAndStringLongerThan3: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          0 == n % 2 &&
          3 < s.length);

      // @ts-ignore
      const andPredicates = isNumberEvenAndStringLongerThan3.and(null);

      expect(andPredicates.apply(11, 'abcd')).toBeFalse();
      expect(andPredicates.apply(10, 'ab')).toBeFalse();
      expect(andPredicates.apply(22, 'abcd')).toBeTrue();
      expect(andPredicates.apply(18, 'abcde')).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const isNumberEvenAndStringLongerThan3: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          0 == n % 2 &&
          3 < s.length);

      const isNumberLowerThan20AndStringSmallerThan5: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          20 > n &&
          5 > s.length);

      const andPredicates1 = isNumberEvenAndStringLongerThan3.and(isNumberLowerThan20AndStringSmallerThan5);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5.and(isNumberEvenAndStringLongerThan3);

      expect(andPredicates1.apply(11, 'abcd')).toBeFalse();
      expect(andPredicates1.apply(10, 'ab')).toBeFalse();
      expect(andPredicates1.apply(22, 'abcd')).toBeFalse();
      expect(andPredicates1.apply(18, 'abcde')).toBeFalse();

      expect(andPredicates2.apply(11, 'abcd')).toBeFalse();
      expect(andPredicates2.apply(10, 'ab')).toBeFalse();
      expect(andPredicates2.apply(22, 'abcd')).toBeFalse();
      expect(andPredicates2.apply(18, 'abcde')).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const isNumberEvenAndStringLongerThan3: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          0 == n % 2 &&
          3 < s.length);

      const isNumberLowerThan20AndStringSmallerThan5: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          20 > n &&
          5 > s.length);

      const andPredicates1 = isNumberEvenAndStringLongerThan3.and(isNumberLowerThan20AndStringSmallerThan5);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5.and(isNumberEvenAndStringLongerThan3);

      expect(andPredicates1.apply(12, 'abcd')).toBeTrue();
      expect(andPredicates1.apply(18, '1234')).toBeTrue();
      expect(andPredicates2.apply(12, 'abcd')).toBeTrue();
      expect(andPredicates2.apply(18, '1234')).toBeTrue();
    });

  });



  describe('apply', () => {

    it('when a Predicate2 is provided then the received input will be evaluated', () => {
      const isNumberEvenAndStringLongerThan3: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          0 == n % 2 &&
          3 < s.length);

      expect(isNumberEvenAndStringLongerThan3.apply(11, 'abcd')).toBeFalse();
      expect(isNumberEvenAndStringLongerThan3.apply(2, 'ab')).toBeFalse();
      expect(isNumberEvenAndStringLongerThan3.apply(12, 'abcd')).toBeTrue();
    });

  });



  describe('not', () => {

    it('when a Predicate2 is provided then logical negation will be returned', () => {
      const isNumberEvenAndStringLongerThan3: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
        Predicate2.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) =>
          0 == n! % 2 &&
          3 < s!.length);

      const notIsNumberEvenAndStringLongerThan3 = isNumberEvenAndStringLongerThan3.not();

      expect(notIsNumberEvenAndStringLongerThan3.apply(11, 'abcd')).toBeTrue();
      expect(notIsNumberEvenAndStringLongerThan3.apply(2, 'ab')).toBeTrue();
      expect(notIsNumberEvenAndStringLongerThan3.apply(12, 'abcd')).toBeFalse();
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      const isNumberEvenAndStringLongerThan3: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          0 == n % 2 &&
          3 < s.length);

      // @ts-ignore
      const orPredicates = isNumberEvenAndStringLongerThan3.or(undefined);

      expect(orPredicates.apply(11, 'abcd')).toBeFalse();
      expect(orPredicates.apply(10, 'ab')).toBeFalse();
      expect(orPredicates.apply(22, 'abcd')).toBeTrue();
      expect(orPredicates.apply(18, 'abcde')).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const isNumberEvenAndStringLongerThan3: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          0 == n % 2 &&
          3 < s.length);

      const isNumberLowerThan20AndStringSmallerThan5: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          20 > n &&
          5 > s.length);

      const orPredicates1 = isNumberEvenAndStringLongerThan3.or(isNumberLowerThan20AndStringSmallerThan5);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5.or(isNumberEvenAndStringLongerThan3);

      expect(orPredicates1.apply(22, 'abcd')).toBeTrue();
      expect(orPredicates1.apply(11, 'abcd')).toBeTrue();

      expect(orPredicates2.apply(22, 'abcd')).toBeTrue();
      expect(orPredicates2.apply(11, 'abcd')).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const isNumberEvenAndStringLongerThan3: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          0 == n % 2 &&
          3 < s.length);

      const isNumberLowerThan20AndStringSmallerThan5: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) =>
          20 > n &&
          5 > s.length);

      const orPredicates1 = isNumberEvenAndStringLongerThan3.or(isNumberLowerThan20AndStringSmallerThan5);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5.or(isNumberEvenAndStringLongerThan3);

      expect(orPredicates1.apply(21, 'ab')).toBeFalse();
      expect(orPredicates1.apply(22, 'abc')).toBeFalse();
      expect(orPredicates1.apply(24, 'ab')).toBeFalse();

      expect(orPredicates2.apply(21, 'ab')).toBeFalse();
      expect(orPredicates2.apply(22, 'abc')).toBeFalse();
      expect(orPredicates2.apply(24, 'ab')).toBeFalse();
    });

  });

});
