import { NullableOrUndefined } from '@app-core/types';
import { Predicate4, FPredicate4, isFPredicate4, Predicate3 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/predicate/predicate4.type.spec.ts
 */
describe('isFPredicate4', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate4()).toBeFalse();
    expect(isFPredicate4(null)).toBeFalse();
    expect(isFPredicate4(12)).toBeFalse();
    expect(isFPredicate4({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate4(() => true)).toBeFalse();
    expect(isFPredicate4((t1: string) => null !== t1)).toBeFalse();
    expect(isFPredicate4((t1: string, t2: string) => null !== t1 && null !== t2)).toBeFalse();
    expect(isFPredicate4((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null !== t3)).toBeFalse();
    expect(isFPredicate4((t1: string, t2: string, t3: string, t4: string, t5: string) => null !== t1 && null !== t2 && null != t3 && null != t4 && null != t5)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate4((t1: string, t2: string, t3: string, t4: string) => true)).toBeTrue();
    expect(isFPredicate4((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null != t3 && null !== t4)).toBeTrue();
  });

});




describe('Predicate4', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate4.allOf<number, string, boolean, number>().apply(5, '', true, 10)).toBeTrue();
      expect(Predicate4.allOf<number, string, boolean, number>(null).apply(5, '', false, 10)).toBeTrue();
      expect(Predicate4.allOf<number, string, boolean, number>([]).apply(5, '', true, 10)).toBeTrue();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate4.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(11, 'abcdef', 'HelloWorld', 10)).toBeFalse();

      expect(Predicate4.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(12, 'abcd', 'HelloWorld', 13)).toBeFalse();

      expect(Predicate4.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'abcdef', 'Hello', 8)).toBeFalse();

      expect(Predicate4.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 12)).toBeTrue();
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate4.alwaysFalse();

      expect(predicate.apply(1, false, 'g', 12)).toBeFalse();
      expect(predicate.apply('a', 21, true, false)).toBeFalse();
      expect(predicate.apply('123', true, 43, 'abc')).toBeFalse();
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate4.alwaysTrue();

      expect(predicate.apply(1, false, 't', true)).toBeTrue();
      expect(predicate.apply('a', 21, true, 'rre')).toBeTrue();
      expect(predicate.apply('123', true, 99, -10)).toBeTrue();
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate4.anyOf<number, string, boolean, number>().apply(5, '', true, 10)).toBeFalse();
      expect(Predicate4.anyOf<number, string, boolean, number>(null).apply(5, '', false, -4)).toBeFalse();
      expect(Predicate4.anyOf<number, string, boolean, number>([]).apply(5, '', true, 0)).toBeFalse();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate4.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 11)).toBeTrue();

      expect(Predicate4.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(8, 'abc', 'Hello', 32)).toBeTrue();

      expect(Predicate4.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(17, 'abcdef', 'HelloWorld', 15)).toBeTrue();

      expect(Predicate4.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'a', 'HelloWorld', 9)).toBeFalse();
    });
  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = Predicate4.isNullOrUndefined();

      expect(predicate.apply(null, null, null, null)).toBeTrue();
      expect(predicate.apply(null, undefined, null, null)).toBeTrue();
      expect(predicate.apply(null, undefined, undefined, null)).toBeTrue();
      expect(predicate.apply(null, undefined, undefined, undefined)).toBeTrue();
      expect(predicate.apply(undefined, null, null, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, null, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, undefined, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, undefined, undefined)).toBeTrue();
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate4.isNullOrUndefined();

      expect(predicate.apply(null, 12, '', false)).toBeFalse();
      expect(predicate.apply(undefined, 12, '', true)).toBeFalse();
      expect(predicate.apply(12, null, '', false)).toBeFalse();
      expect(predicate.apply(12, undefined, '', true)).toBeFalse();
      expect(predicate.apply(12, '', null, false)).toBeFalse();
      expect(predicate.apply(12, '', undefined, true)).toBeFalse();
      expect(predicate.apply(12, '', false, null)).toBeFalse();
      expect(predicate.apply(12, '', true, undefined)).toBeFalse();
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const predicate = Predicate4.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable)).toBeFalse();
      expect(predicate.apply('', nonNullVariable, 12, false)).toBeFalse();
      expect(predicate.apply('', true, nonNullVariable, 44)).toBeFalse();
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = Predicate4.nonNullOrUndefined();

      expect(predicate.apply(null, null, null, null)).toBeFalse();
      expect(predicate.apply(null, undefined, null, null)).toBeFalse();
      expect(predicate.apply(null, undefined, undefined, null)).toBeFalse();
      expect(predicate.apply(null, undefined, undefined, undefined)).toBeFalse();
      expect(predicate.apply(undefined, null, null, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, null, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, undefined, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, undefined, undefined)).toBeFalse();
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate4.nonNullOrUndefined();

      expect(predicate.apply(null, 12, '', false)).toBeFalse();
      expect(predicate.apply(undefined, 12, '', true)).toBeFalse();
      expect(predicate.apply(12, null, '', false)).toBeFalse();
      expect(predicate.apply(12, undefined, '', true)).toBeFalse();
      expect(predicate.apply(12, '', null, false)).toBeFalse();
      expect(predicate.apply(12, '', undefined, true)).toBeFalse();
      expect(predicate.apply(12, '', false, null)).toBeFalse();
      expect(predicate.apply(12, '', true, undefined)).toBeFalse();
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const predicate = Predicate4.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable)).toBeTrue();
      expect(predicate.apply('', nonNullVariable, 12, false)).toBeTrue();
      expect(predicate.apply('', true, nonNullVariable, 44)).toBeTrue();
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate4.isPredicate()).toBeFalse();
      expect(Predicate4.isPredicate(null)).toBeFalse();
      expect(Predicate4.isPredicate('')).toBeFalse();
      expect(Predicate4.isPredicate(12)).toBeFalse();
      expect(Predicate4.isPredicate({})).toBeFalse();
      expect(Predicate4.isPredicate({ apply: (n: number) => n*2 })).toBeFalse();
    });


    it('when provided predicate is different than Predicate4 then false is returned', () => {
      const areNumbersEvenAndStringNotNull: Predicate3<NullableOrUndefined<number>, NullableOrUndefined<string>, number> =
        Predicate3.of((n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, n2: number) =>
          0 == n1! % 2 &&
          undefined !== s &&
          null !== s &&
          0 == n2 % 2
        );

      expect(Predicate4.isPredicate(areNumbersEvenAndStringNotNull)).toBeFalse();

      expect(Predicate4.isPredicate(Predicate4.alwaysTrue())).toBeTrue();
      expect(Predicate4.isPredicate(Predicate4.alwaysFalse())).toBeTrue();
    });


    it('when a Predicate4 is provided then true is returned', () => {
      expect(Predicate4.isPredicate(areNumbersEvenAndStringsLongerThan2Predicate)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined predicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Predicate4.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Predicate4.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FPredicate4 is provided then a valid Predicate4 is returned', () => {
      const predicate = Predicate4.of(areNumbersEvenAndStringNotNullRaw);

      expect(Predicate4.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, 2, 'abc')).toBeFalse();
      expect(predicate.apply(1, 'abc', 4, '')).toBeFalse();
      expect(predicate.apply(2, 'abc', 6, '')).toBeTrue();
    });


    it('when an instance of FPredicate4 is provided then a valid Predicate4 is returned', () => {
      const predicate = Predicate4.of(areNumbersEvenAndStringNotNullFPredicate);

      expect(Predicate4.isPredicate(predicate)).toBeTrue();
      // @ts-ignore
      expect(predicate.apply(1, null, 2, 'abc')).toBeFalse();
      expect(predicate.apply(1, 'abc', 4, '')).toBeFalse();
      expect(predicate.apply(2, 'abc', 6, '')).toBeTrue();
    });


    it('when an instance of Predicate4 is provided then the same one is returned', () => {
      const predicate = Predicate4.of(areNumbersEvenAndStringNotNullPredicate);

      expect(Predicate4.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, 2, 'abc')).toBeFalse();
      expect(predicate.apply(1, 'abc', 4, '')).toBeFalse();
      expect(predicate.apply(2, 'abc', 6, '')).toBeTrue();
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const verifier: FPredicate4<number, string, number, string> = areNumbersEvenAndStringNotNullPredicate.getVerifier();

      // @ts-ignore
      expect(verifier(11, 'abcd', null, 10)).toBeFalse();
      expect(verifier(2, 'ab', 5, 'a')).toBeFalse();
      expect(verifier(8, 'abcd', 12, '')).toBeTrue();
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const andPredicates = areNumbersEvenAndStringNotNullPredicate.and(null);

      // @ts-ignore
      expect(andPredicates.apply(11, 'abcd', null, 10)).toBeFalse();
      expect(andPredicates.apply(2, 'ab', 5, 'a')).toBeFalse();
      expect(andPredicates.apply(4, 'a', 2, 'abc')).toBeTrue();
      expect(andPredicates.apply(8, 'abcd', 12, '')).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(11, 'abcd', 'ab', 12)).toBeFalse();
      expect(andPredicates1.apply(8, 'abcd', 'a', 6)).toBeFalse();
      expect(andPredicates1.apply(22, 'abcd', 'abc', 14)).toBeFalse();
      expect(andPredicates1.apply(30, 'abcdef', 'HelloWorld', 12)).toBeFalse();

      expect(andPredicates2.apply(11, 'abcd', 'ab', 12)).toBeFalse();
      expect(andPredicates2.apply(8, 'abcd', 'a', 6)).toBeFalse();
      expect(andPredicates2.apply(22, 'abcd', 'abc', 14)).toBeFalse();
      expect(andPredicates2.apply(30, 'abcdef', 'HelloWorld', 12)).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(18, 'abcddf', 'HelloWorld', 12)).toBeTrue();
      expect(andPredicates1.apply(4, 'HolaMundo', 'abcddf', 16)).toBeTrue();

      expect(andPredicates2.apply(18, 'abcddf', 'HelloWorld', 12)).toBeTrue();
      expect(andPredicates2.apply(4, 'HolaMundo', 'abcddf', 16)).toBeTrue();
    });

  });



  describe('apply', () => {

    it('when a Predicate4 is provided then the received input will be evaluated', () => {
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'ab', 10)).toBeFalse();
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(8, 'abc', 'Hello', 9)).toBeFalse();
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'Hello', 14)).toBeTrue();
    });

  });



  describe('not', () => {

    it('when a Predicate4 is provided then logical negation will be returned', () => {
      const notAreNumbersEvenAndStringsLongerThan2 = areNumbersEvenAndStringsLongerThan2Predicate.not();

      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'ab', 10)).toBeTrue();
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(8, 'abc', 'Hello', 9)).toBeTrue();
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'Hello', 14)).toBeFalse();
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const orPredicates = areNumbersEvenAndStringsLongerThan2Predicate.or(undefined);

      expect(orPredicates.apply(12, 'abcd', 'ab', 10)).toBeFalse();
      expect(orPredicates.apply(8, 'abc', 'Hello', 9)).toBeFalse();
      expect(orPredicates.apply(12, 'abcd', 'Hello', 14)).toBeTrue();
      expect(orPredicates.apply(4, 'abc', 'Hola', 6)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(22, 'abcd', 'Hello', 12)).toBeTrue();
      expect(orPredicates1.apply(2, 'Hola', 'abc', 30)).toBeTrue();

      expect(orPredicates2.apply(19, 'abcdef', 'HelloWorld', 13)).toBeTrue();
      expect(orPredicates2.apply(11, 'abcdef', 'HolaMundo', 15)).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(21, 'ab', '', 10)).toBeFalse();
      expect(orPredicates1.apply(22, 'abc', 'a', 30)).toBeFalse();
      expect(orPredicates1.apply(10, 'ab', 'Hello', 19)).toBeFalse();

      expect(orPredicates2.apply(21, 'ab', '', 10)).toBeFalse();
      expect(orPredicates2.apply(22, 'abc', 'a', 30)).toBeFalse();
      expect(orPredicates2.apply(10, 'ab', 'Hello', 19)).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(12, 'abcb', 'abc', 10)).toBeTrue();
      expect(orPredicates1.apply(16, '1234', '123', 8)).toBeTrue();

      expect(orPredicates2.apply(12, 'abcd', 'abc', 10)).toBeTrue();
      expect(orPredicates2.apply(16, '1234', '123', 8)).toBeTrue();
    });

  });



  describe('xor', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const xorPredicates = areNumbersEvenAndStringsLongerThan2Predicate.xor(undefined);

      expect(xorPredicates.apply(12, 'abcd', 'ab', 10)).toBeFalse();
      expect(xorPredicates.apply(8, 'abc', 'Hello', 9)).toBeFalse();
      expect(xorPredicates.apply(12, 'abcd', 'Hello', 14)).toBeTrue();
      expect(xorPredicates.apply(4, 'abc', 'Hola', 6)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(22, 'abcd', 'Hello', 12)).toBeTrue();
      expect(xorPredicates1.apply(2, 'Hola', 'abc', 30)).toBeTrue();

      expect(xorPredicates2.apply(19, 'abcdef', 'HelloWorld', 13)).toBeTrue();
      expect(xorPredicates2.apply(11, 'abcdef', 'HolaMundo', 15)).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(21, 'ab', '', 10)).toBeFalse();
      expect(xorPredicates1.apply(22, 'abc', 'a', 30)).toBeFalse();
      expect(xorPredicates1.apply(10, 'ab', 'Hello', 19)).toBeFalse();

      expect(xorPredicates2.apply(21, 'ab', '', 10)).toBeFalse();
      expect(xorPredicates2.apply(22, 'abc', 'a', 30)).toBeFalse();
      expect(xorPredicates2.apply(10, 'ab', 'Hello', 19)).toBeFalse();
    });


    it('when both Predicates return true then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(12, 'abcdef', 'abcdefg', 10)).toBeFalse();
      expect(xorPredicates1.apply(16, '123456', '123567', 8)).toBeFalse();

      expect(xorPredicates2.apply(12, 'abcdef', 'abcdefg', 10)).toBeFalse();
      expect(xorPredicates2.apply(16, '123456', '123567', 8)).toBeFalse();
    });

  });

});



const areNumbersEvenAndStringsLongerThan2Predicate: Predicate4<number, string, string, number> =
  Predicate4.of(
    (n1: number,
     s1: string,
     s2: string,
     n2: number) =>
      0 == n1 % 2 &&
      2 < s1.length &&
      2 < s2.length &&
      0 == n2 % 2
  );


const areNumbersLowerThan20AndStringsLongerThan5Raw =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   s2: string,
   n2: number) =>
    20 > n1! &&
    5 < s1!.length &&
    5 < s2.length &&
    20 > n2;


const areNumbersLowerThan20AndStringsLongerThan5Predicate: Predicate4<number, string, string, number> =
  Predicate4.of(
    (n1: number,
     s1: string,
     s2: string,
     n2: number) =>
      20 > n1! &&
      5 < s1!.length &&
      5 < s2.length &&
      20 > n2
  );


const areNumbersEvenAndStringNotNullRaw =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   n2: number,
   s2: string) =>
    0 == n1! % 2 &&
    undefined !== s1 &&
    null !== s1 &&
    0 == n2 % 2 &&
    undefined !== s2 &&
    null !== s2;


const areNumbersEvenAndStringNotNullFPredicate: FPredicate4<number, string, number, string> =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   n2: number,
   s2: string) =>
    0 == n1! % 2 &&
    undefined !== s1 &&
    null !== s1 &&
    0 == n2 % 2 &&
    undefined !== s2 &&
    null !== s2;


const areNumbersEvenAndStringNotNullPredicate: Predicate4<NullableOrUndefined<number>, NullableOrUndefined<string>, number, string> =
  Predicate4.of(
    (n1: NullableOrUndefined<number>,
     s1: NullableOrUndefined<string>,
     n2: number,
     s2: string) =>
      0 == n1! % 2 &&
      undefined !== s1 &&
      null !== s1 &&
      0 == n2 % 2 &&
      undefined !== s2 &&
      null !== s2
  );
