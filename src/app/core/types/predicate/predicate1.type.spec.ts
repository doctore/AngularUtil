import { NullableOrUndefined } from '@app-core/types';
import { Predicate1, FPredicate1, isFPredicate1, Predicate2 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/predicate/predicate1.type.spec.ts
 */
describe('isFPredicate1', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate1()).toBeFalse();
    expect(isFPredicate1(null)).toBeFalse();
    expect(isFPredicate1(12)).toBeFalse();
    expect(isFPredicate1({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate1(() => true)).toBeFalse();
    expect(isFPredicate1((t1: string, t2: string) => null !== t1 && null !== t2)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate1((t1: string) => true)).toBeTrue();
    expect(isFPredicate1((t1: string) => null !== t1)).toBeTrue();
  });

});




describe('Predicate1', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate1.allOf<number>().apply(5)).toBeTrue();
      expect(Predicate1.allOf<number>(null).apply(5)).toBeTrue();
      expect(Predicate1.allOf<number>([]).apply(5)).toBeTrue();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const isEven: Predicate1<number> = Predicate1.of((n: number) => 0 == n % 2)
      const isLowerThan20 = (n: NullableOrUndefined<number>) => 20 > n!;

      expect(Predicate1.allOf([isEven, isLowerThan20]).apply(11)).toBeFalse();
      expect(Predicate1.allOf([isEven, isLowerThan20]).apply(30)).toBeFalse();
      expect(Predicate1.allOf([isEven, isLowerThan20]).apply(10)).toBeTrue();
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate1.alwaysFalse();

      expect(predicate.apply(1)).toBeFalse();
      expect(predicate.apply('a')).toBeFalse();
      expect(predicate.apply(true)).toBeFalse();
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate1.alwaysTrue();

      expect(predicate.apply(1)).toBeTrue();
      expect(predicate.apply('a')).toBeTrue();
      expect(predicate.apply(true)).toBeTrue();
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate1.anyOf<number>().apply(5)).toBeFalse();
      expect(Predicate1.anyOf<number>(null).apply(5)).toBeFalse();
      expect(Predicate1.anyOf<number>([]).apply(5)).toBeFalse();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const isEven = (n: number) => 0 == n % 2;
      const isLowerThan20: FPredicate1<number> = (n: NullableOrUndefined<number>) => 20 > n!;

      expect(Predicate1.anyOf([isEven, isLowerThan20]).apply(11)).toBeTrue();
      expect(Predicate1.anyOf([isEven, isLowerThan20]).apply(30)).toBeTrue();
      expect(Predicate1.anyOf([isEven, isLowerThan20]).apply(41)).toBeFalse();
    });

  });



  describe('isNullOrUndefined', () => {

    it('when given parameter is null or undefined then true is returned', () => {
      const predicate = Predicate1.isNullOrUndefined();

      const nullVariable = null;

      expect(predicate.apply(null)).toBeTrue();
      expect(predicate.apply(undefined)).toBeTrue();
      expect(predicate.apply(nullVariable)).toBeTrue();
    });


    it('when given parameter is neither null nor undefined then false is returned', () => {
      const predicate = Predicate1.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12)).toBeFalse();
      expect(predicate.apply('')).toBeFalse();
      expect(predicate.apply(nonNullVariable)).toBeFalse();
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameter is null or undefined then false is returned', () => {
      const predicate = Predicate1.nonNullOrUndefined();

      const nullVariable = null;

      expect(predicate.apply(null)).toBeFalse();
      expect(predicate.apply(undefined)).toBeFalse();
      expect(predicate.apply(nullVariable)).toBeFalse();
    });


    it('when given parameter is neither null nor undefined then true is returned', () => {
      const predicate = Predicate1.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12)).toBeTrue();
      expect(predicate.apply('')).toBeTrue();
      expect(predicate.apply(nonNullVariable)).toBeTrue();
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate1.isPredicate()).toBeFalse();
      expect(Predicate1.isPredicate(null)).toBeFalse();
      expect(Predicate1.isPredicate('')).toBeFalse();
      expect(Predicate1.isPredicate(12)).toBeFalse();
      expect(Predicate1.isPredicate({})).toBeFalse();
      expect(Predicate1.isPredicate({ apply: (n: number) => n*2 })).toBeFalse();
    });



    it('when provided predicate is different than Predicate1 then false is returned', () => {
      const isNumberEvenAndStringNotNull: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
        Predicate2.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s
        );

      expect(Predicate1.isPredicate(isNumberEvenAndStringNotNull)).toBeFalse();
    });


    it('when a Predicate1 is provided then true is returned', () => {
      const isEven: Predicate1<NullableOrUndefined<number>> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const isNotNullOrUndefined: Predicate1<NullableOrUndefined<string>> =
        Predicate1.of((s: NullableOrUndefined<string>) => undefined !== s && null !== s);

      expect(Predicate1.isPredicate(isEven)).toBeTrue();
      expect(Predicate1.isPredicate(isNotNullOrUndefined)).toBeTrue();

      expect(Predicate1.isPredicate(Predicate1.alwaysTrue())).toBeTrue();
      expect(Predicate1.isPredicate(Predicate1.alwaysFalse())).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined predicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Predicate1.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Predicate1.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FPredicate1 is provided then a valid Predicate1 is returned', () => {
      const isEven = (n: NullableOrUndefined<number>) => 0 == n! % 2;

      const predicate = Predicate1.of(isEven);

      expect(Predicate1.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1)).toBeFalse();
      expect(predicate.apply(2)).toBeTrue();
    });


    it('when an instance of FPredicate1 is provided then a valid Predicate1 is returned', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      const predicate = Predicate1.of(isEven);

      expect(Predicate1.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1)).toBeFalse();
      expect(predicate.apply(2)).toBeTrue();
    });


    it('when an instance of Predicate1 is provided then the same one is returned', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const predicate = Predicate1.of(isEven);

      expect(Predicate1.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1)).toBeFalse();
      expect(predicate.apply(2)).toBeTrue();
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const verifier: FPredicate1<number> = isEven.getVerifier();

      expect(verifier(1)).toBeFalse();
      expect(verifier(2)).toBeTrue();
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n! % 2);

      // @ts-ignore
      const andPredicates = isEven.and(null);

      expect(andPredicates.apply(22)).toBeTrue();
      expect(andPredicates.apply(11)).toBeFalse();
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const isEven: Predicate1<NullableOrUndefined<number>> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const isLowerThan20: Predicate1<NullableOrUndefined<number>> =
        Predicate1.of((n: NullableOrUndefined<number>) => 20 > n!);

      const andPredicates1 = isEven.and(isLowerThan20);
      const andPredicates2 = isLowerThan20.and(isEven);

      expect(andPredicates1.apply(22)).toBeFalse();
      expect(andPredicates1.apply(11)).toBeFalse();

      expect(andPredicates2.apply(22)).toBeFalse();
      expect(andPredicates2.apply(11)).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const isLowerThan20: Predicate1<number> =
        Predicate1.of((n: number) => 20 > n);

      const andPredicates1 = isEven.and(isLowerThan20);
      const andPredicates2 = isLowerThan20.and(isEven);

      expect(andPredicates1.apply(12)).toBeTrue();
      expect(andPredicates1.apply(18)).toBeTrue();

      expect(andPredicates2.apply(12)).toBeTrue();
      expect(andPredicates2.apply(18)).toBeTrue();
    });

  });



  describe('apply', () => {

    it('when a Predicate1 is provided then the received input will be evaluated', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const isNotEmpty: Predicate1<string> =
        Predicate1.of((s: string) => undefined !== s && null !== s && '' !== s.trim());

      expect(isEven.apply(1)).toBeFalse();
      expect(isEven.apply(2)).toBeTrue();
      expect(isNotEmpty.apply('')).toBeFalse();
      expect(isNotEmpty.apply('message')).toBeTrue();
    });

  });



  describe('not', () => {

    it('when a Predicate1 is provided then logical negation will be returned', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const isEmpty: Predicate1<string> =
        Predicate1.of((s: string) => undefined === s || null === s || '' === s.trim());

      const notIsEven = isEven.not();
      const notIsEmpty = isEmpty.not();

      expect(notIsEven.apply(2)).toBeFalse();
      expect(notIsEven.apply(1)).toBeTrue();
      expect(notIsEmpty.apply('')).toBeFalse();
      expect(notIsEmpty.apply('message')).toBeTrue();
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n! % 2);

      // @ts-ignore
      const orPredicates = isEven.or(undefined);

      expect(orPredicates.apply(22)).toBeTrue();
      expect(orPredicates.apply(11)).toBeFalse();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const isEven: Predicate1<number> =
        Predicate1.of((n: number) => 0 == n % 2);

      const isLowerThan20: Predicate1<number> =
        Predicate1.of((n: number) => 20 > n);

      const orPredicates1 = isEven.or(isLowerThan20);
      const orPredicates2 = isLowerThan20.or(isEven);

      expect(orPredicates1.apply(22)).toBeTrue();
      expect(orPredicates1.apply(11)).toBeTrue();

      expect(orPredicates2.apply(22)).toBeTrue();
      expect(orPredicates2.apply(11)).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const isEven: Predicate1<NullableOrUndefined<number>> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      const isLowerThan20: Predicate1<NullableOrUndefined<number>> =
        Predicate1.of((n: NullableOrUndefined<number>) => 20 > n!);

      const orPredicates1 = isEven.or(isLowerThan20);
      const orPredicates2 = isLowerThan20.or(isEven);

      expect(orPredicates1.apply(21)).toBeFalse();
      expect(orPredicates1.apply(23)).toBeFalse();

      expect(orPredicates2.apply(21)).toBeFalse();
      expect(orPredicates2.apply(23)).toBeFalse();
    });

  });

});
