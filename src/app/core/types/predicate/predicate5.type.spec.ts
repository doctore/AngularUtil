import { NullableOrUndefined } from '@app-core/types';
import { Predicate5, FPredicate5, isFPredicate5, Predicate4 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/predicate/predicate5.type.spec.ts
 */
describe('isFPredicate5', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate5()).toBeFalse();
    expect(isFPredicate5(null)).toBeFalse();
    expect(isFPredicate5(12)).toBeFalse();
    expect(isFPredicate5({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate5(() => true)).toBeFalse();
    expect(isFPredicate5((t1: string) => null !== t1)).toBeFalse();
    expect(isFPredicate5((t1: string, t2: string) => null !== t1 && null !== t2)).toBeFalse();
    expect(isFPredicate5((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null !== t3)).toBeFalse();
    expect(isFPredicate5((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => null !== t1 && null !== t2 && null != t3 && null != t4 && null != t5 && null !== t6)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate5((t1: string, t2: string, t3: string, t4: string, t5: string) => true)).toBeTrue();
    expect(isFPredicate5((t1: string, t2: string, t3: string, t4: string, t5: string) => null !== t1 && null !== t2 && null != t3 && null !== t4 && null != t5)).toBeTrue();
  });

});




describe('Predicate5', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate5.allOf<number, string, boolean, number, number>().apply(5, '', true, 10, 9)).toBeTrue();
      expect(Predicate5.allOf<number, string, boolean, number, number>(null).apply(5, '', false, 10, 9)).toBeTrue();
      expect(Predicate5.allOf<number, string, boolean, number, number>([]).apply(5, '', true, 10, 9)).toBeTrue();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      const areNumbersLowerThan20AndStringsLongerThan5 =
        (n1: NullableOrUndefined<number>, s1: NullableOrUndefined<string>, s2: string, n2: number, n3: number) =>
          20 > n1! && 5 < s1!.length && 5 < s2.length && 20 > n2 && 20 > n3;

      expect(Predicate5.allOf([areNumbersEvenAndStringsLongerThan2, areNumbersLowerThan20AndStringsLongerThan5])
        .apply(11, 'abcdef', 'HelloWorld', 10, 14)).toBeFalse();

      expect(Predicate5.allOf([areNumbersEvenAndStringsLongerThan2, areNumbersLowerThan20AndStringsLongerThan5])
        .apply(12, 'abcd', 'HelloWorld', 13, 15)).toBeFalse();

      expect(Predicate5.allOf([areNumbersEvenAndStringsLongerThan2, areNumbersLowerThan20AndStringsLongerThan5])
        .apply(30, 'abcdef', 'Hello', 8, 22)).toBeFalse();

      expect(Predicate5.allOf([areNumbersEvenAndStringsLongerThan2, areNumbersLowerThan20AndStringsLongerThan5])
        .apply(10, 'abcdef', 'HelloWorld', 12, 16)).toBeTrue();
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate5.alwaysFalse();

      expect(predicate.apply(1, false, 'g', 12, 9)).toBeFalse();
      expect(predicate.apply('a', 21, true, false, '')).toBeFalse();
      expect(predicate.apply('123', true, 43, 'abc', false)).toBeFalse();
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate5.alwaysTrue();

      expect(predicate.apply(1, false, 't', true, 99)).toBeTrue();
      expect(predicate.apply('a', 21, true, 'rre', false)).toBeTrue();
      expect(predicate.apply('123', true, 99, -10, '')).toBeTrue();
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate5.anyOf<number, string, boolean, number, number>().apply(5, '', true, 10, 8)).toBeFalse();
      expect(Predicate5.anyOf<number, string, boolean, number, number>(null).apply(5, '', false, -4, 11)).toBeFalse();
      expect(Predicate5.anyOf<number, string, boolean, number, number>([]).apply(5, '', true, 0, 20)).toBeFalse();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      const areNumbersLowerThan20AndStringsLongerThan5 =
        (n1: NullableOrUndefined<number>, s1: NullableOrUndefined<string>, s2: string, n2: number, n3: number) =>
          20 > n1! && 5 < s1!.length && 5 < s2.length && 20 > n2 && 20 > n3;

      expect(Predicate5.anyOf([areNumbersEvenAndStringsLongerThan2, areNumbersLowerThan20AndStringsLongerThan5])
        .apply(10, 'abcdef', 'HelloWorld', 11, 9)).toBeTrue();

      expect(Predicate5.anyOf([areNumbersEvenAndStringsLongerThan2, areNumbersLowerThan20AndStringsLongerThan5])
        .apply(8, 'abc', 'Hello', 32, 12)).toBeTrue();

      expect(Predicate5.anyOf([areNumbersEvenAndStringsLongerThan2, areNumbersLowerThan20AndStringsLongerThan5])
        .apply(17, 'abcdef', 'HelloWorld', 15, 7)).toBeTrue();

      expect(Predicate5.anyOf([areNumbersEvenAndStringsLongerThan2, areNumbersLowerThan20AndStringsLongerThan5])
        .apply(30, 'a', 'HelloWorld', 9, 11)).toBeFalse();
    });
  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate5.isPredicate()).toBeFalse();
      expect(Predicate5.isPredicate(null)).toBeFalse();
      expect(Predicate5.isPredicate('')).toBeFalse();
      expect(Predicate5.isPredicate(12)).toBeFalse();
      expect(Predicate5.isPredicate({})).toBeFalse();
      expect(Predicate5.isPredicate({ apply: (n: number) => n*2 })).toBeFalse();
    });


    it('when provided predicate is different than Predicate5 then false is returned', () => {
      const areNumbersEvenAndStringNotNull: Predicate4<NullableOrUndefined<number>, NullableOrUndefined<string>, number, number> =
        Predicate4.of((n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, n2: number, n3: number) =>
          0 == n1! % 2 &&
          undefined !== s &&
          null !== s &&
          0 == n2 % 2 &&
          0 == n3 % 2
        );

      expect(Predicate5.isPredicate(areNumbersEvenAndStringNotNull)).toBeFalse();

      expect(Predicate5.isPredicate(Predicate5.alwaysTrue())).toBeTrue();
      expect(Predicate5.isPredicate(Predicate5.alwaysFalse())).toBeTrue();
    });


    it('when a Predicate5 is provided then true is returned', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      expect(Predicate5.isPredicate(areNumbersEvenAndStringsLongerThan2)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined predicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Predicate5.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Predicate5.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FPredicate5 is provided then a valid Predicate5 is returned', () => {
      const areNumbersEvenAndStringNotNull =
        (n1: NullableOrUndefined<number>, s1: NullableOrUndefined<string>, n2: number, s2: string, n3: number) =>
          0 == n1! % 2 &&
          undefined !== s1 &&
          null !== s1 &&
          0 == n2 % 2 &&
          undefined !== s2 &&
          null !== s2 &&
          0 == n3 % 2;

      const predicate = Predicate5.of(areNumbersEvenAndStringNotNull);

      expect(Predicate5.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, 2, 'abc', 4)).toBeFalse();
      expect(predicate.apply(1, 'abc', 4, '', 8)).toBeFalse();
      expect(predicate.apply(2, 'abc', 6, '', 12)).toBeTrue();
    });


    it('when an instance of FPredicate5 is provided then a valid Predicate5 is returned', () => {
      const areNumbersEvenAndStringNotNull: FPredicate5<number, string, number, string, number> =
        (n1: NullableOrUndefined<number>, s1: NullableOrUndefined<string>, n2: number, s2: string, n3: number) =>
          0 == n1! % 2 &&
          undefined !== s1 &&
          null !== s1 &&
          0 == n2 % 2 &&
          undefined !== s2 &&
          null !== s2 &&
          0 == n3 % 2;

      const predicate = Predicate5.of(areNumbersEvenAndStringNotNull);

      expect(Predicate5.isPredicate(predicate)).toBeTrue();
      // @ts-ignore
      expect(predicate.apply(1, null, 2, 'abc', 6)).toBeFalse();
      expect(predicate.apply(1, 'abc', 4, '', 7)).toBeFalse();
      expect(predicate.apply(2, 'abc', 6, '', 10)).toBeTrue();
    });


    it('when an instance of Predicate5 is provided then the same one is returned', () => {
      const areNumbersEvenAndStringNotNull: Predicate5<NullableOrUndefined<number>, NullableOrUndefined<string>, number, string, number> =
        Predicate5.of((n1: NullableOrUndefined<number>, s1: NullableOrUndefined<string>, n2: number, s2: string, n3: number) =>
          0 == n1! % 2 &&
          undefined !== s1 &&
          null !== s1 &&
          0 == n2 % 2 &&
          undefined !== s2 &&
          null !== s2 &&
          0 == n3 % 2
        );

      const predicate = Predicate5.of(areNumbersEvenAndStringNotNull);

      expect(Predicate5.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, 2, 'abc', 6)).toBeFalse();
      expect(predicate.apply(1, 'abc', 4, '', 7)).toBeFalse();
      expect(predicate.apply(2, 'abc', 6, '', 10)).toBeTrue();
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const areNumbersEvenAndStringNotNull: Predicate5<number, string, number, string, number> =
        Predicate5.of((n1: number, s1: string, n2: number, s2: string, n3: number) =>
          0 == n1 % 2 &&
          undefined !== s1 &&
          null !== s1 &&
          0 == n2 % 2 &&
          undefined !== s2 &&
          null !== s2 &&
          0 == n3 % 2
        );

      const verifier: FPredicate5<number, string, number, string, number> = areNumbersEvenAndStringNotNull.getVerifier();

      // @ts-ignore
      expect(verifier(11, 'abcd', null, 10, 6)).toBeFalse();
      expect(verifier(2, 'ab', 5, 'a', 8)).toBeFalse();
      expect(verifier(8, 'abcd', 12, '', 20)).toBeTrue();
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      const areNumbersEvenAndStringNotNull: Predicate5<number, string, number, string, number> =
        Predicate5.of((n1: number, s1: string, n2: number, s2: string, n3: number) =>
          0 == n1 % 2 &&
          undefined !== s1 &&
          null !== s1 &&
          0 == n2 % 2 &&
          undefined !== s2 &&
          null !== s2 &&
          0 == n3 % 2
        );

      // @ts-ignore
      const andPredicates = areNumbersEvenAndStringNotNull.and(null);

      // @ts-ignore
      expect(andPredicates.apply(11, 'abcd', null, 10, 20)).toBeFalse();
      expect(andPredicates.apply(2, 'ab', 5, 'a', 8)).toBeFalse();
      expect(andPredicates.apply(4, 'a', 2, 'abc', 14)).toBeTrue();
      expect(andPredicates.apply(8, 'abcd', 12, '', 30)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      const areNumbersLowerThan20AndStringsLongerThan5: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          20 > n1! && 5 < s1!.length && 5 < s2.length && 20 > n2 && 20 > n3);

      const andPredicates1 = areNumbersEvenAndStringsLongerThan2.and(areNumbersLowerThan20AndStringsLongerThan5);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5.and(areNumbersEvenAndStringsLongerThan2);

      expect(andPredicates1.apply(11, 'abcd', 'ab', 12, 10)).toBeFalse();
      expect(andPredicates1.apply(8, 'abcd', 'a', 6, 4)).toBeFalse();
      expect(andPredicates1.apply(22, 'abcd', 'abc', 14, 15)).toBeFalse();
      expect(andPredicates1.apply(30, 'abcdef', 'HelloWorld', 12, 19)).toBeFalse();

      expect(andPredicates2.apply(11, 'abcd', 'ab', 12, 10)).toBeFalse();
      expect(andPredicates2.apply(8, 'abcd', 'a', 6, 4)).toBeFalse();
      expect(andPredicates2.apply(22, 'abcd', 'abc', 14, 15)).toBeFalse();
      expect(andPredicates2.apply(30, 'abcdef', 'HelloWorld', 12, 19)).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      const areNumbersLowerThan20AndStringsLongerThan5: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          20 > n1! && 5 < s1!.length && 5 < s2.length && 20 > n2 && 20 > n3);

      const andPredicates1 = areNumbersEvenAndStringsLongerThan2.and(areNumbersLowerThan20AndStringsLongerThan5);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5.and(areNumbersEvenAndStringsLongerThan2);

      expect(andPredicates1.apply(18, 'abcddf', 'HelloWorld', 12, 6)).toBeTrue();
      expect(andPredicates1.apply(4, 'HolaMundo', 'abcddf', 16, 10)).toBeTrue();

      expect(andPredicates2.apply(18, 'abcddf', 'HelloWorld', 12, 6)).toBeTrue();
      expect(andPredicates2.apply(4, 'HolaMundo', 'abcddf', 16, 10)).toBeTrue();
    });

  });



  describe('apply', () => {

    it('when a Predicate5 is provided then the received input will be evaluated', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      expect(areNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'ab', 10, 9)).toBeFalse();
      expect(areNumbersEvenAndStringsLongerThan2.apply(8, 'abc', 'Hello', 9, 7)).toBeFalse();
      expect(areNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'Hello', 14, 20)).toBeTrue();
    });

  });



  describe('not', () => {

    it('when a Predicate5 is provided then logical negation will be returned', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      const notAreNumbersEvenAndStringsLongerThan2 = areNumbersEvenAndStringsLongerThan2.not();

      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'ab', 10, 9)).toBeTrue();
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(8, 'abc', 'Hello', 9, 7)).toBeTrue();
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'Hello', 14, 20)).toBeFalse();
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      // @ts-ignore
      const orPredicates = areNumbersEvenAndStringsLongerThan2.or(undefined);

      expect(orPredicates.apply(12, 'abcd', 'ab', 10, 16)).toBeFalse();
      expect(orPredicates.apply(8, 'abc', 'Hello', 9, 17)).toBeFalse();
      expect(orPredicates.apply(12, 'abcd', 'Hello', 14, 6)).toBeTrue();
      expect(orPredicates.apply(4, 'abc', 'Hola', 6, 18)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      const areNumbersLowerThan20AndStringsLongerThan5: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          20 > n1! && 5 < s1!.length && 5 < s2.length && 20 > n2 && 20 > n3);

      const orPredicates1 = areNumbersEvenAndStringsLongerThan2.or(areNumbersLowerThan20AndStringsLongerThan5);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5.or(areNumbersEvenAndStringsLongerThan2);

      expect(orPredicates1.apply(22, 'abcd', 'Hello', 12, 6)).toBeTrue();
      expect(orPredicates1.apply(2, 'Hola', 'abc', 30, 8)).toBeTrue();

      expect(orPredicates2.apply(19, 'abcdef', 'HelloWorld', 13, 12)).toBeTrue();
      expect(orPredicates2.apply(11, 'abcdef', 'HolaMundo', 15, 10)).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);

      const areNumbersLowerThan20AndStringsLongerThan5: Predicate5<number, string, string, number, number> =
        Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
          20 > n1! && 5 < s1!.length && 5 < s2.length && 20 > n2 && 20 > n3);

      const orPredicates1 = areNumbersEvenAndStringsLongerThan2.or(areNumbersLowerThan20AndStringsLongerThan5);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5.or(areNumbersEvenAndStringsLongerThan2);

      expect(orPredicates1.apply(21, 'ab', '', 10, 6)).toBeFalse();
      expect(orPredicates1.apply(22, 'abc', 'a', 30, 15)).toBeFalse();
      expect(orPredicates1.apply(10, 'ab', 'Hello', 19, 14)).toBeFalse();

      expect(orPredicates2.apply(21, 'ab', '', 10, 6)).toBeFalse();
      expect(orPredicates2.apply(22, 'abc', 'a', 30, 15)).toBeFalse();
      expect(orPredicates2.apply(10, 'ab', 'Hello', 19, 14)).toBeFalse();
    });

  });

});
