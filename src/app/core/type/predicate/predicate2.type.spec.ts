import { NullableOrUndefined } from '@app-core/type';
import { Predicate2, FPredicate2, isFPredicate2, Predicate1 } from '@app-core/type/predicate';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/predicate/predicate2.type.spec.ts
 */
describe('isFPredicate2', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate2()).toBe(false);
    expect(isFPredicate2(null)).toBe(false);
    expect(isFPredicate2(12)).toBe(false);
    expect(isFPredicate2({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate2(() => true)).toBe(false);
    expect(isFPredicate2((t1: string) => null !== t1)).toBe(false);
    expect(isFPredicate2((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null != t3)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate2((t1: string, t2: string) => true)).toBe(true);
    expect(isFPredicate2((t1: string, t2: string) => null !== t1 && null !== t2)).toBe(true);
  });

});




describe('Predicate2', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate2.allOf<number, string>().apply(5, '')).toBe(true);
      expect(Predicate2.allOf<number, string>(null).apply(5, '')).toBe(true);
      expect(Predicate2.allOf<number, string>([]).apply(5, '')).toBe(true);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const isNumberEvenAndStringLongerThan2: Predicate2<number, string> =
        Predicate2.of((n: number, s: string) => 0 == n % 2 && 2 < s.length);

      const isNumberLowerThan20AndStringLongerThan5 =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) => 20 > n! && 5 < s!.length;

      expect(Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(11, 'abcdef')).toBe(false);
      expect(Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(12, 'abcd')).toBe(false);
      expect(Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(30, 'a')).toBe(false);
      expect(Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(10, 'abcdef')).toBe(true);
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate2.alwaysFalse();

      expect(predicate.apply(1, false)).toBe(false);
      expect(predicate.apply('a', 21)).toBe(false);
      expect(predicate.apply('123', true)).toBe(false);
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate2.alwaysTrue();

      expect(predicate.apply(1, false)).toBe(true);
      expect(predicate.apply('a', 21)).toBe(true);
      expect(predicate.apply('123', true)).toBe(true);
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate2.anyOf<number, string>().apply(5, '')).toBe(false);
      expect(Predicate2.anyOf<number, string>(null).apply(5, '')).toBe(false);
      expect(Predicate2.anyOf<number, string>([]).apply(5, '')).toBe(false);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const isNumberEvenAndStringLongerThan2 =
        (n: number, s: string) => 0 == n % 2 && 2 < s.length;

      const isNumberLowerThan20AndStringLongerThan5: FPredicate2<number, string> =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) => 20 > n! && 5 < s!.length;

      expect(Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(10, 'abcdef')).toBe(true);
      expect(Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(11, 'abcdef')).toBe(true);
      expect(Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(22, 'abc')).toBe(true);
      expect(Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(30, 'a')).toBe(false);
    });
  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = Predicate2.isNullOrUndefined();

      expect(predicate.apply(null, null)).toBe(true);
      expect(predicate.apply(null, undefined)).toBe(true);
      expect(predicate.apply(undefined, null)).toBe(true);
      expect(predicate.apply(undefined, undefined)).toBe(true);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate2.isNullOrUndefined();

      expect(predicate.apply(12, null)).toBe(false);
      expect(predicate.apply(undefined, '')).toBe(false);
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const predicate = Predicate2.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '')).toBe(false);
      expect(predicate.apply('', 12)).toBe(false);
      expect(predicate.apply(true, nonNullVariable)).toBe(false);
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = Predicate2.nonNullOrUndefined();

      expect(predicate.apply(null, null)).toBe(false);
      expect(predicate.apply(null, undefined)).toBe(false);
      expect(predicate.apply(undefined, null)).toBe(false);
      expect(predicate.apply(undefined, undefined)).toBe(false);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate2.nonNullOrUndefined();

      expect(predicate.apply(12, null)).toBe(false);
      expect(predicate.apply(undefined, '')).toBe(false);
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const predicate = Predicate2.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '')).toBe(true);
      expect(predicate.apply('', 12)).toBe(true);
      expect(predicate.apply(true, nonNullVariable)).toBe(true);
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate2.isPredicate()).toBe(false);
      expect(Predicate2.isPredicate(null)).toBe(false);
      expect(Predicate2.isPredicate('')).toBe(false);
      expect(Predicate2.isPredicate(12)).toBe(false);
      expect(Predicate2.isPredicate({})).toBe(false);
      expect(Predicate2.isPredicate({ apply: (n: number) => n*2 })).toBe(false);
    });


    it('when provided predicate is different than Predicate2 then false is returned', () => {
      const isEven: Predicate1<NullableOrUndefined<number>> =
        Predicate1.of((n: NullableOrUndefined<number>) => 0 == n! % 2);

      expect(Predicate2.isPredicate(isEven)).toBe(false);
    });


    it('when a Predicate2 is provided then true is returned', () => {
      expect(Predicate2.isPredicate(isNumberEvenAndStringNotNullPredicateNullable)).toBe(true);

      expect(Predicate2.isPredicate(Predicate2.alwaysTrue())).toBe(true);
      expect(Predicate2.isPredicate(Predicate2.alwaysFalse())).toBe(true);
    });

  });



  describe('of', () => {

    it('when null or undefined predicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Predicate2.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Predicate2.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FPredicate2 is provided then a valid Predicate2 is returned', () => {
      const predicate = Predicate2.of(isNumberEvenAndStringNotNullRaw);

      expect(Predicate2.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null)).toBe(false);
      expect(predicate.apply(1, 'abc')).toBe(false);
      expect(predicate.apply(2, 'abc')).toBe(true);
    });


    it('when an instance of FPredicate2 is provided then a valid Predicate2 is returned', () => {
      const predicate = Predicate2.of(isNumberEvenAndStringNotNullFPredicate);

      expect(Predicate2.isPredicate(predicate)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(1, null)).toBe(false);
      expect(predicate.apply(1, 'abc')).toBe(false);
      expect(predicate.apply(2, 'abc')).toBe(true);
    });


    it('when an instance of Predicate2 is provided then the same one is returned', () => {
      const predicate = Predicate2.of(isNumberEvenAndStringNotNullPredicate);

      expect(Predicate2.isPredicate(predicate)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(1, null)).toBe(false);
      expect(predicate.apply(1, 'abc')).toBe(false);
      expect(predicate.apply(2, 'abc')).toBe(true);
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const verifier: FPredicate2<number, string> = isNumberEvenAndStringLongerThan3Predicate.getVerifier();

      expect(verifier(11, 'abcd')).toBe(false);
      expect(verifier(2, 'ab')).toBe(false);
      expect(verifier(12, 'abcd')).toBe(true);
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const andPredicates = isNumberEvenAndStringLongerThan3Predicate.and(null);

      expect(andPredicates.apply(11, 'abcd')).toBe(false);
      expect(andPredicates.apply(10, 'ab')).toBe(false);
      expect(andPredicates.apply(22, 'abcd')).toBe(true);
      expect(andPredicates.apply(18, 'abcde')).toBe(true);
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const andPredicates1 = isNumberEvenAndStringLongerThan3Predicate.and(isNumberLowerThan20AndStringSmallerThan5Predicate);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5Predicate.and(isNumberEvenAndStringLongerThan3Predicate);

      expect(andPredicates1.apply(11, 'abcd')).toBe(false);
      expect(andPredicates1.apply(10, 'ab')).toBe(false);
      expect(andPredicates1.apply(22, 'abcd')).toBe(false);
      expect(andPredicates1.apply(18, 'abcde')).toBe(false);

      expect(andPredicates2.apply(11, 'abcd')).toBe(false);
      expect(andPredicates2.apply(10, 'ab')).toBe(false);
      expect(andPredicates2.apply(22, 'abcd')).toBe(false);
      expect(andPredicates2.apply(18, 'abcde')).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const andPredicates1 = isNumberEvenAndStringLongerThan3Predicate.and(isNumberLowerThan20AndStringSmallerThan5Predicate);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5Predicate.and(isNumberEvenAndStringLongerThan3Predicate);

      expect(andPredicates1.apply(12, 'abcd')).toBe(true);
      expect(andPredicates1.apply(18, '1234')).toBe(true);

      expect(andPredicates2.apply(12, 'abcd')).toBe(true);
      expect(andPredicates2.apply(18, '1234')).toBe(true);
    });

  });



  describe('apply', () => {

    it('when a Predicate2 is provided then the received input will be evaluated', () => {
      expect(isNumberEvenAndStringLongerThan3Predicate.apply(11, 'abcd')).toBe(false);
      expect(isNumberEvenAndStringLongerThan3Predicate.apply(2, 'ab')).toBe(false);
      expect(isNumberEvenAndStringLongerThan3Predicate.apply(12, 'abcd')).toBe(true);
    });

  });



  describe('not', () => {

    it('when a Predicate2 is provided then logical negation will be returned', () => {
      const notIsNumberEvenAndStringLongerThan3 = isNumberEvenAndStringLongerThan3PredicateNullable.not();

      expect(notIsNumberEvenAndStringLongerThan3.apply(11, 'abcd')).toBe(true);
      expect(notIsNumberEvenAndStringLongerThan3.apply(2, 'ab')).toBe(true);
      expect(notIsNumberEvenAndStringLongerThan3.apply(12, 'abcd')).toBe(false);
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const orPredicates = isNumberEvenAndStringLongerThan3Predicate.or(undefined);

      expect(orPredicates.apply(11, 'abcd')).toBe(false);
      expect(orPredicates.apply(10, 'ab')).toBe(false);
      expect(orPredicates.apply(22, 'abcd')).toBe(true);
      expect(orPredicates.apply(18, 'abcde')).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const orPredicates1 = isNumberEvenAndStringLongerThan3Predicate.or(isNumberLowerThan20AndStringSmallerThan5Predicate);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5Predicate.or(isNumberEvenAndStringLongerThan3Predicate);

      expect(orPredicates1.apply(22, 'abcd')).toBe(true);
      expect(orPredicates1.apply(11, 'abcd')).toBe(true);

      expect(orPredicates2.apply(22, 'abcd')).toBe(true);
      expect(orPredicates2.apply(11, 'abcd')).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const orPredicates1 = isNumberEvenAndStringLongerThan3Predicate.or(isNumberLowerThan20AndStringSmallerThan5Predicate);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5Predicate.or(isNumberEvenAndStringLongerThan3Predicate);

      expect(orPredicates1.apply(21, 'ab')).toBe(false);
      expect(orPredicates1.apply(22, 'abc')).toBe(false);
      expect(orPredicates1.apply(24, 'ab')).toBe(false);

      expect(orPredicates2.apply(21, 'ab')).toBe(false);
      expect(orPredicates2.apply(22, 'abc')).toBe(false);
      expect(orPredicates2.apply(24, 'ab')).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const orPredicates1 = isNumberEvenAndStringLongerThan3Predicate.or(isNumberLowerThan20AndStringSmallerThan5Predicate);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5Predicate.or(isNumberEvenAndStringLongerThan3Predicate);

      expect(orPredicates1.apply(12, 'abcd')).toBe(true);
      expect(orPredicates1.apply(16, '1234')).toBe(true);

      expect(orPredicates2.apply(12, 'abcd')).toBe(true);
      expect(orPredicates2.apply(16, '1234')).toBe(true);
    });

  });



  describe('xor', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const xorPredicates = isNumberEvenAndStringLongerThan3Predicate.xor(undefined);

      expect(xorPredicates.apply(11, 'abcd')).toBe(false);
      expect(xorPredicates.apply(10, 'ab')).toBe(false);
      expect(xorPredicates.apply(22, 'abcd')).toBe(true);
      expect(xorPredicates.apply(18, 'abcde')).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const xorPredicates1 = isNumberEvenAndStringLongerThan3Predicate.xor(isNumberLowerThan20AndStringSmallerThan5Predicate);
      const xorPredicates2 = isNumberLowerThan20AndStringSmallerThan5Predicate.xor(isNumberEvenAndStringLongerThan3Predicate);

      expect(xorPredicates1.apply(22, 'abcd')).toBe(true);
      expect(xorPredicates1.apply(11, 'abcd')).toBe(true);

      expect(xorPredicates2.apply(22, 'abcd')).toBe(true);
      expect(xorPredicates2.apply(11, 'abcd')).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const xorPredicates1 = isNumberEvenAndStringLongerThan3Predicate.xor(isNumberLowerThan20AndStringSmallerThan5Predicate);
      const xorPredicates2 = isNumberLowerThan20AndStringSmallerThan5Predicate.xor(isNumberEvenAndStringLongerThan3Predicate);

      expect(xorPredicates1.apply(21, 'ab')).toBe(false);
      expect(xorPredicates1.apply(22, 'abc')).toBe(false);
      expect(xorPredicates1.apply(24, 'ab')).toBe(false);

      expect(xorPredicates2.apply(21, 'ab')).toBe(false);
      expect(xorPredicates2.apply(22, 'abc')).toBe(false);
      expect(xorPredicates2.apply(24, 'ab')).toBe(false);
    });


    it('when both Predicates return true then false is returned', () => {
      const xorPredicates1 = isNumberEvenAndStringLongerThan3Predicate.xor(isNumberLowerThan20AndStringSmallerThan5Predicate);
      const xorPredicates2 = isNumberLowerThan20AndStringSmallerThan5Predicate.xor(isNumberEvenAndStringLongerThan3Predicate);

      expect(xorPredicates1.apply(12, 'abcd')).toBe(false);
      expect(xorPredicates1.apply(16, '1234')).toBe(false);

      expect(xorPredicates2.apply(12, 'abcd')).toBe(false);
      expect(xorPredicates2.apply(16, '1234')).toBe(false);
    });

  });

});



const isNumberEvenAndStringLongerThan3Predicate: Predicate2<number, string> =
  Predicate2.of(
    (n: number, s: string) =>
      0 == n % 2 &&
      3 < s.length
  );


const isNumberEvenAndStringLongerThan3PredicateNullable: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
  Predicate2.of(
    (n: NullableOrUndefined<number>,
     s: NullableOrUndefined<string>) =>
      0 == n! % 2 &&
      3 < s!.length
  );


const isNumberLowerThan20AndStringSmallerThan5Predicate: Predicate2<number, string> =
  Predicate2.of(
    (n: number, s: string) =>
      20 > n &&
      5 > s.length
  );


const isNumberEvenAndStringNotNullRaw =
  (n: NullableOrUndefined<number>,
   s: NullableOrUndefined<string>) =>
    0 == n! % 2 &&
    undefined !== s &&
    null !== s;


const isNumberEvenAndStringNotNullFPredicate: FPredicate2<number, string> =
    (n: NullableOrUndefined<number>,
     s: NullableOrUndefined<string>) =>
      0 == n! % 2 &&
      undefined !== s &&
      null !== s;


const isNumberEvenAndStringNotNullPredicate: Predicate2<number, string> =
    Predicate2.of(
      (n: number,
       s: string) =>
        0 == n % 2 &&
        undefined !== s &&
        null !== s
    );


const isNumberEvenAndStringNotNullPredicateNullable: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
  Predicate2.of(
    (n: NullableOrUndefined<number>,
     s: NullableOrUndefined<string>) =>
      0 == n! % 2 &&
      undefined !== s &&
      null !== s
  );
