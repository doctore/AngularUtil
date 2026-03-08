import { NullableOrUndefined } from '@app-core/type';
import { Predicate4, FPredicate4, isFPredicate4, Predicate3 } from '@app-core/type/predicate';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/predicate/predicate4.type.spec.ts
 */
describe('isFPredicate4', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate4()).toBe(false);
    expect(isFPredicate4(null)).toBe(false);
    expect(isFPredicate4(12)).toBe(false);
    expect(isFPredicate4({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate4(() => true)).toBe(false);
    expect(isFPredicate4((t1: string) => null !== t1)).toBe(false);
    expect(isFPredicate4((t1: string, t2: string) => null !== t1 && null !== t2)).toBe(false);
    expect(isFPredicate4((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null !== t3)).toBe(false);
    expect(isFPredicate4((t1: string, t2: string, t3: string, t4: string, t5: string) => null !== t1 && null !== t2 && null != t3 && null != t4 && null != t5)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate4((t1: string, t2: string, t3: string, t4: string) => true)).toBe(true);
    expect(isFPredicate4((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null != t3 && null !== t4)).toBe(true);
  });

});




describe('Predicate4', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate4.allOf<number, string, boolean, number>().apply(5, '', true, 10)).toBe(true);
      expect(Predicate4.allOf<number, string, boolean, number>(null).apply(5, '', false, 10)).toBe(true);
      expect(Predicate4.allOf<number, string, boolean, number>([]).apply(5, '', true, 10)).toBe(true);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate4.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(11, 'abcdef', 'HelloWorld', 10)).toBe(false);

      expect(Predicate4.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(12, 'abcd', 'HelloWorld', 13)).toBe(false);

      expect(Predicate4.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'abcdef', 'Hello', 8)).toBe(false);

      expect(Predicate4.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 12)).toBe(true);
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate4.alwaysFalse();

      expect(predicate.apply(1, false, 'g', 12)).toBe(false);
      expect(predicate.apply('a', 21, true, false)).toBe(false);
      expect(predicate.apply('123', true, 43, 'abc')).toBe(false);
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate4.alwaysTrue();

      expect(predicate.apply(1, false, 't', true)).toBe(true);
      expect(predicate.apply('a', 21, true, 'rre')).toBe(true);
      expect(predicate.apply('123', true, 99, -10)).toBe(true);
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate4.anyOf<number, string, boolean, number>().apply(5, '', true, 10)).toBe(false);
      expect(Predicate4.anyOf<number, string, boolean, number>(null).apply(5, '', false, -4)).toBe(false);
      expect(Predicate4.anyOf<number, string, boolean, number>([]).apply(5, '', true, 0)).toBe(false);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate4.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 11)).toBe(true);

      expect(Predicate4.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(8, 'abc', 'Hello', 32)).toBe(true);

      expect(Predicate4.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(17, 'abcdef', 'HelloWorld', 15)).toBe(true);

      expect(Predicate4.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'a', 'HelloWorld', 9)).toBe(false);
    });
  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = Predicate4.isNullOrUndefined();

      expect(predicate.apply(null, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined)).toBe(true);
      expect(predicate.apply(undefined, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined)).toBe(true);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate4.isNullOrUndefined();

      expect(predicate.apply(null, 12, '', false)).toBe(false);
      expect(predicate.apply(undefined, 12, '', true)).toBe(false);
      expect(predicate.apply(12, null, '', false)).toBe(false);
      expect(predicate.apply(12, undefined, '', true)).toBe(false);
      expect(predicate.apply(12, '', null, false)).toBe(false);
      expect(predicate.apply(12, '', undefined, true)).toBe(false);
      expect(predicate.apply(12, '', false, null)).toBe(false);
      expect(predicate.apply(12, '', true, undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const predicate = Predicate4.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable)).toBe(false);
      expect(predicate.apply('', nonNullVariable, 12, false)).toBe(false);
      expect(predicate.apply('', true, nonNullVariable, 44)).toBe(false);
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = Predicate4.nonNullOrUndefined();

      expect(predicate.apply(null, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined)).toBe(false);
      expect(predicate.apply(undefined, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined)).toBe(false);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate4.nonNullOrUndefined();

      expect(predicate.apply(null, 12, '', false)).toBe(false);
      expect(predicate.apply(undefined, 12, '', true)).toBe(false);
      expect(predicate.apply(12, null, '', false)).toBe(false);
      expect(predicate.apply(12, undefined, '', true)).toBe(false);
      expect(predicate.apply(12, '', null, false)).toBe(false);
      expect(predicate.apply(12, '', undefined, true)).toBe(false);
      expect(predicate.apply(12, '', false, null)).toBe(false);
      expect(predicate.apply(12, '', true, undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const predicate = Predicate4.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable)).toBe(true);
      expect(predicate.apply('', nonNullVariable, 12, false)).toBe(true);
      expect(predicate.apply('', true, nonNullVariable, 44)).toBe(true);
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate4.isPredicate()).toBe(false);
      expect(Predicate4.isPredicate(null)).toBe(false);
      expect(Predicate4.isPredicate('')).toBe(false);
      expect(Predicate4.isPredicate(12)).toBe(false);
      expect(Predicate4.isPredicate({})).toBe(false);
      expect(Predicate4.isPredicate({ apply: (n: number) => n*2 })).toBe(false);
    });


    it('when provided predicate is different than Predicate4 then false is returned', () => {
      const areNumbersEvenAndStringNotNull: Predicate3<NullableOrUndefined<number>, NullableOrUndefined<string>, number> =
        Predicate3.of((n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, n2: number) =>
          0 == n1! % 2 &&
          undefined !== s &&
          null !== s &&
          0 == n2 % 2
        );

      expect(Predicate4.isPredicate(areNumbersEvenAndStringNotNull)).toBe(false);

      expect(Predicate4.isPredicate(Predicate4.alwaysTrue())).toBe(true);
      expect(Predicate4.isPredicate(Predicate4.alwaysFalse())).toBe(true);
    });


    it('when a Predicate4 is provided then true is returned', () => {
      expect(Predicate4.isPredicate(areNumbersEvenAndStringsLongerThan2Predicate)).toBe(true);
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

      expect(Predicate4.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, 2, 'abc')).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '')).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '')).toBe(true);
    });


    it('when an instance of FPredicate4 is provided then a valid Predicate4 is returned', () => {
      const predicate = Predicate4.of(areNumbersEvenAndStringNotNullFPredicate);

      expect(Predicate4.isPredicate(predicate)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(1, null, 2, 'abc')).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '')).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '')).toBe(true);
    });


    it('when an instance of Predicate4 is provided then the same one is returned', () => {
      const predicate = Predicate4.of(areNumbersEvenAndStringNotNullPredicate);

      expect(Predicate4.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, 2, 'abc')).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '')).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '')).toBe(true);
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const verifier: FPredicate4<number, string, number, string> = areNumbersEvenAndStringNotNullPredicate.getVerifier();

      // @ts-ignore
      expect(verifier(11, 'abcd', null, 10)).toBe(false);
      expect(verifier(2, 'ab', 5, 'a')).toBe(false);
      expect(verifier(8, 'abcd', 12, '')).toBe(true);
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const andPredicates = areNumbersEvenAndStringNotNullPredicate.and(null);

      // @ts-ignore
      expect(andPredicates.apply(11, 'abcd', null, 10)).toBe(false);
      expect(andPredicates.apply(2, 'ab', 5, 'a')).toBe(false);
      expect(andPredicates.apply(4, 'a', 2, 'abc')).toBe(true);
      expect(andPredicates.apply(8, 'abcd', 12, '')).toBe(true);
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(11, 'abcd', 'ab', 12)).toBe(false);
      expect(andPredicates1.apply(8, 'abcd', 'a', 6)).toBe(false);
      expect(andPredicates1.apply(22, 'abcd', 'abc', 14)).toBe(false);
      expect(andPredicates1.apply(30, 'abcdef', 'HelloWorld', 12)).toBe(false);

      expect(andPredicates2.apply(11, 'abcd', 'ab', 12)).toBe(false);
      expect(andPredicates2.apply(8, 'abcd', 'a', 6)).toBe(false);
      expect(andPredicates2.apply(22, 'abcd', 'abc', 14)).toBe(false);
      expect(andPredicates2.apply(30, 'abcdef', 'HelloWorld', 12)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(18, 'abcddf', 'HelloWorld', 12)).toBe(true);
      expect(andPredicates1.apply(4, 'HolaMundo', 'abcddf', 16)).toBe(true);

      expect(andPredicates2.apply(18, 'abcddf', 'HelloWorld', 12)).toBe(true);
      expect(andPredicates2.apply(4, 'HolaMundo', 'abcddf', 16)).toBe(true);
    });

  });



  describe('apply', () => {

    it('when a Predicate4 is provided then the received input will be evaluated', () => {
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'ab', 10)).toBe(false);
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(8, 'abc', 'Hello', 9)).toBe(false);
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'Hello', 14)).toBe(true);
    });

  });



  describe('not', () => {

    it('when a Predicate4 is provided then logical negation will be returned', () => {
      const notAreNumbersEvenAndStringsLongerThan2 = areNumbersEvenAndStringsLongerThan2Predicate.not();

      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'ab', 10)).toBe(true);
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(8, 'abc', 'Hello', 9)).toBe(true);
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'Hello', 14)).toBe(false);
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const orPredicates = areNumbersEvenAndStringsLongerThan2Predicate.or(undefined);

      expect(orPredicates.apply(12, 'abcd', 'ab', 10)).toBe(false);
      expect(orPredicates.apply(8, 'abc', 'Hello', 9)).toBe(false);
      expect(orPredicates.apply(12, 'abcd', 'Hello', 14)).toBe(true);
      expect(orPredicates.apply(4, 'abc', 'Hola', 6)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(22, 'abcd', 'Hello', 12)).toBe(true);
      expect(orPredicates1.apply(2, 'Hola', 'abc', 30)).toBe(true);

      expect(orPredicates2.apply(19, 'abcdef', 'HelloWorld', 13)).toBe(true);
      expect(orPredicates2.apply(11, 'abcdef', 'HolaMundo', 15)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(21, 'ab', '', 10)).toBe(false);
      expect(orPredicates1.apply(22, 'abc', 'a', 30)).toBe(false);
      expect(orPredicates1.apply(10, 'ab', 'Hello', 19)).toBe(false);

      expect(orPredicates2.apply(21, 'ab', '', 10)).toBe(false);
      expect(orPredicates2.apply(22, 'abc', 'a', 30)).toBe(false);
      expect(orPredicates2.apply(10, 'ab', 'Hello', 19)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(12, 'abcb', 'abc', 10)).toBe(true);
      expect(orPredicates1.apply(16, '1234', '123', 8)).toBe(true);

      expect(orPredicates2.apply(12, 'abcd', 'abc', 10)).toBe(true);
      expect(orPredicates2.apply(16, '1234', '123', 8)).toBe(true);
    });

  });



  describe('xor', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const xorPredicates = areNumbersEvenAndStringsLongerThan2Predicate.xor(undefined);

      expect(xorPredicates.apply(12, 'abcd', 'ab', 10)).toBe(false);
      expect(xorPredicates.apply(8, 'abc', 'Hello', 9)).toBe(false);
      expect(xorPredicates.apply(12, 'abcd', 'Hello', 14)).toBe(true);
      expect(xorPredicates.apply(4, 'abc', 'Hola', 6)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(22, 'abcd', 'Hello', 12)).toBe(true);
      expect(xorPredicates1.apply(2, 'Hola', 'abc', 30)).toBe(true);

      expect(xorPredicates2.apply(19, 'abcdef', 'HelloWorld', 13)).toBe(true);
      expect(xorPredicates2.apply(11, 'abcdef', 'HolaMundo', 15)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(21, 'ab', '', 10)).toBe(false);
      expect(xorPredicates1.apply(22, 'abc', 'a', 30)).toBe(false);
      expect(xorPredicates1.apply(10, 'ab', 'Hello', 19)).toBe(false);

      expect(xorPredicates2.apply(21, 'ab', '', 10)).toBe(false);
      expect(xorPredicates2.apply(22, 'abc', 'a', 30)).toBe(false);
      expect(xorPredicates2.apply(10, 'ab', 'Hello', 19)).toBe(false);
    });


    it('when both Predicates return true then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(12, 'abcdef', 'abcdefg', 10)).toBe(false);
      expect(xorPredicates1.apply(16, '123456', '123567', 8)).toBe(false);

      expect(xorPredicates2.apply(12, 'abcdef', 'abcdefg', 10)).toBe(false);
      expect(xorPredicates2.apply(16, '123456', '123567', 8)).toBe(false);
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
