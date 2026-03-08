import { NullableOrUndefined } from '@app-core/type';
import { Predicate5, FPredicate5, isFPredicate5, Predicate4 } from '@app-core/type/predicate';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/predicate/predicate5.type.spec.ts
 */
describe('isFPredicate5', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate5()).toBe(false);
    expect(isFPredicate5(null)).toBe(false);
    expect(isFPredicate5(12)).toBe(false);
    expect(isFPredicate5({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate5(() => true)).toBe(false);
    expect(isFPredicate5((t1: string) => null !== t1)).toBe(false);
    expect(isFPredicate5((t1: string, t2: string) => null !== t1 && null !== t2)).toBe(false);
    expect(isFPredicate5((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null !== t3)).toBe(false);
    expect(isFPredicate5((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null !== t3 && null !== t4)).toBe(false);
    expect(isFPredicate5((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => null !== t1 && null !== t2 && null != t3 && null != t4 && null != t5 && null !== t6)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate5((t1: string, t2: string, t3: string, t4: string, t5: string) => true)).toBe(true);
    expect(isFPredicate5((t1: string, t2: string, t3: string, t4: string, t5: string) => null !== t1 && null !== t2 && null != t3 && null !== t4 && null != t5)).toBe(true);
  });

});




describe('Predicate5', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate5.allOf<number, string, boolean, number, number>().apply(5, '', true, 10, 9)).toBe(true);
      expect(Predicate5.allOf<number, string, boolean, number, number>(null).apply(5, '', false, 10, 9)).toBe(true);
      expect(Predicate5.allOf<number, string, boolean, number, number>([]).apply(5, '', true, 10, 9)).toBe(true);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate5.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(11, 'abcdef', 'HelloWorld', 10, 14)).toBe(false);

      expect(Predicate5.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(12, 'abcd', 'HelloWorld', 13, 15)).toBe(false);

      expect(Predicate5.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'abcdef', 'Hello', 8, 22)).toBe(false);

      expect(Predicate5.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 12, 16)).toBe(true);
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate5.alwaysFalse();

      expect(predicate.apply(1, false, 'g', 12, 9)).toBe(false);
      expect(predicate.apply('a', 21, true, false, '')).toBe(false);
      expect(predicate.apply('123', true, 43, 'abc', false)).toBe(false);
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate5.alwaysTrue();

      expect(predicate.apply(1, false, 't', true, 99)).toBe(true);
      expect(predicate.apply('a', 21, true, 'rre', false)).toBe(true);
      expect(predicate.apply('123', true, 99, -10, '')).toBe(true);
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate5.anyOf<number, string, boolean, number, number>().apply(5, '', true, 10, 8)).toBe(false);
      expect(Predicate5.anyOf<number, string, boolean, number, number>(null).apply(5, '', false, -4, 11)).toBe(false);
      expect(Predicate5.anyOf<number, string, boolean, number, number>([]).apply(5, '', true, 0, 20)).toBe(false);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate5.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 11, 9)).toBe(true);

      expect(Predicate5.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(8, 'abc', 'Hello', 32, 12)).toBe(true);

      expect(Predicate5.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(17, 'abcdef', 'HelloWorld', 15, 7)).toBe(true);

      expect(Predicate5.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'a', 'HelloWorld', 9, 11)).toBe(false);
    });
  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = Predicate5.isNullOrUndefined();

      expect(predicate.apply(null, null, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined)).toBe(true);
      expect(predicate.apply(undefined, null, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined)).toBe(true);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate5.isNullOrUndefined();

      expect(predicate.apply(null, 12, '', false, 3)).toBe(false);
      expect(predicate.apply(undefined, 12, '', true, 6)).toBe(false);
      expect(predicate.apply(12, null, '', false, 'abc')).toBe(false);
      expect(predicate.apply(12, undefined, '', true, 'abc')).toBe(false);
      expect(predicate.apply(12, '', null, false, true)).toBe(false);
      expect(predicate.apply(12, '', undefined, true, false)).toBe(false);
      expect(predicate.apply(12, '', false, null, 45)).toBe(false);
      expect(predicate.apply(12, '', true, undefined, 66)).toBe(false);
      expect(predicate.apply('abc', 19, false, '', null)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const predicate = Predicate5.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable, false)).toBe(false);
      expect(predicate.apply('', nonNullVariable, 12, false, nonNullVariable)).toBe(false);
      expect(predicate.apply('', true, nonNullVariable, 44, 'xrc')).toBe(false);
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = Predicate5.nonNullOrUndefined();

      expect(predicate.apply(null, null, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined)).toBe(false);
      expect(predicate.apply(undefined, null, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined)).toBe(false);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate5.nonNullOrUndefined();

      expect(predicate.apply(null, 12, '', false, 3)).toBe(false);
      expect(predicate.apply(undefined, 12, '', true, 6)).toBe(false);
      expect(predicate.apply(12, null, '', false, 'abc')).toBe(false);
      expect(predicate.apply(12, undefined, '', true, 'abc')).toBe(false);
      expect(predicate.apply(12, '', null, false, true)).toBe(false);
      expect(predicate.apply(12, '', undefined, true, false)).toBe(false);
      expect(predicate.apply(12, '', false, null, 45)).toBe(false);
      expect(predicate.apply(12, '', true, undefined, 66)).toBe(false);
      expect(predicate.apply('abc', 19, false, '', null)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const predicate = Predicate5.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable, false)).toBe(true);
      expect(predicate.apply('', nonNullVariable, 12, false, nonNullVariable)).toBe(true);
      expect(predicate.apply('', true, nonNullVariable, 44, 'xrc')).toBe(true);
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate5.isPredicate()).toBe(false);
      expect(Predicate5.isPredicate(null)).toBe(false);
      expect(Predicate5.isPredicate('')).toBe(false);
      expect(Predicate5.isPredicate(12)).toBe(false);
      expect(Predicate5.isPredicate({})).toBe(false);
      expect(Predicate5.isPredicate({ apply: (n: number) => n*2 })).toBe(false);
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

      expect(Predicate5.isPredicate(areNumbersEvenAndStringNotNull)).toBe(false);

      expect(Predicate5.isPredicate(Predicate5.alwaysTrue())).toBe(true);
      expect(Predicate5.isPredicate(Predicate5.alwaysFalse())).toBe(true);
    });


    it('when a Predicate5 is provided then true is returned', () => {
      expect(Predicate5.isPredicate(areNumbersEvenAndStringsLongerThan2Predicate)).toBe(true);
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
      const predicate = Predicate5.of(areNumbersEvenAndStringNotNullRaw);

      expect(Predicate5.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, 2, 'abc', 4)).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '', 8)).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '', 12)).toBe(true);
    });


    it('when an instance of FPredicate5 is provided then a valid Predicate5 is returned', () => {
      const predicate = Predicate5.of(areNumbersEvenAndStringNotNullFPredicate);

      expect(Predicate5.isPredicate(predicate)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(1, null, 2, 'abc', 6)).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '', 7)).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '', 10)).toBe(true);
    });


    it('when an instance of Predicate5 is provided then the same one is returned', () => {
      const predicate = Predicate5.of(areNumbersEvenAndStringNotNullPredicate);

      expect(Predicate5.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, 2, 'abc', 6)).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '', 7)).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '', 10)).toBe(true);
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const verifier: FPredicate5<number, string, number, string, number> = areNumbersEvenAndStringNotNullPredicate.getVerifier();

      // @ts-ignore
      expect(verifier(11, 'abcd', null, 10, 6)).toBe(false);
      expect(verifier(2, 'ab', 5, 'a', 8)).toBe(false);
      expect(verifier(8, 'abcd', 12, '', 20)).toBe(true);
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const andPredicates = areNumbersEvenAndStringNotNullPredicate.and(null);

      // @ts-ignore
      expect(andPredicates.apply(11, 'abcd', null, 10, 20)).toBe(false);
      expect(andPredicates.apply(2, 'ab', 5, 'a', 8)).toBe(false);
      expect(andPredicates.apply(4, 'a', 2, 'abc', 14)).toBe(true);
      expect(andPredicates.apply(8, 'abcd', 12, '', 30)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(11, 'abcd', 'ab', 12, 10)).toBe(false);
      expect(andPredicates1.apply(8, 'abcd', 'a', 6, 4)).toBe(false);
      expect(andPredicates1.apply(22, 'abcd', 'abc', 14, 15)).toBe(false);
      expect(andPredicates1.apply(30, 'abcdef', 'HelloWorld', 12, 19)).toBe(false);

      expect(andPredicates2.apply(11, 'abcd', 'ab', 12, 10)).toBe(false);
      expect(andPredicates2.apply(8, 'abcd', 'a', 6, 4)).toBe(false);
      expect(andPredicates2.apply(22, 'abcd', 'abc', 14, 15)).toBe(false);
      expect(andPredicates2.apply(30, 'abcdef', 'HelloWorld', 12, 19)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(18, 'abcddf', 'HelloWorld', 12, 6)).toBe(true);
      expect(andPredicates1.apply(4, 'HolaMundo', 'abcddf', 16, 10)).toBe(true);

      expect(andPredicates2.apply(18, 'abcddf', 'HelloWorld', 12, 6)).toBe(true);
      expect(andPredicates2.apply(4, 'HolaMundo', 'abcddf', 16, 10)).toBe(true);
    });

  });



  describe('apply', () => {

    it('when a Predicate5 is provided then the received input will be evaluated', () => {
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'ab', 10, 9)).toBe(false);
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(8, 'abc', 'Hello', 9, 7)).toBe(false);
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'Hello', 14, 20)).toBe(true);
    });

  });



  describe('not', () => {

    it('when a Predicate5 is provided then logical negation will be returned', () => {
      const notAreNumbersEvenAndStringsLongerThan2 = areNumbersEvenAndStringsLongerThan2Predicate.not();

      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'ab', 10, 9)).toBe(true);
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(8, 'abc', 'Hello', 9, 7)).toBe(true);
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'Hello', 14, 20)).toBe(false);
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const orPredicates = areNumbersEvenAndStringsLongerThan2Predicate.or(undefined);

      expect(orPredicates.apply(12, 'abcd', 'ab', 10, 16)).toBe(false);
      expect(orPredicates.apply(8, 'abc', 'Hello', 9, 17)).toBe(false);
      expect(orPredicates.apply(12, 'abcd', 'Hello', 14, 6)).toBe(true);
      expect(orPredicates.apply(4, 'abc', 'Hola', 6, 18)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(22, 'abcd', 'Hello', 12, 6)).toBe(true);
      expect(orPredicates1.apply(2, 'Hola', 'abc', 30, 8)).toBe(true);

      expect(orPredicates2.apply(19, 'abcdef', 'HelloWorld', 13, 12)).toBe(true);
      expect(orPredicates2.apply(11, 'abcdef', 'HolaMundo', 15, 10)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(21, 'ab', '', 10, 6)).toBe(false);
      expect(orPredicates1.apply(22, 'abc', 'a', 30, 15)).toBe(false);
      expect(orPredicates1.apply(10, 'ab', 'Hello', 19, 14)).toBe(false);

      expect(orPredicates2.apply(21, 'ab', '', 10, 6)).toBe(false);
      expect(orPredicates2.apply(22, 'abc', 'a', 30, 15)).toBe(false);
      expect(orPredicates2.apply(10, 'ab', 'Hello', 19, 14)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(12, 'abcb', 'abc', 10, 6)).toBe(true);
      expect(orPredicates1.apply(16, '1234', '123', 8, 14)).toBe(true);

      expect(orPredicates2.apply(12, 'abcb', 'abc', 10, 6)).toBe(true);
      expect(orPredicates2.apply(16, '1234', '123', 8, 14)).toBe(true);
    });

  });



  describe('xor', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const xorPredicates = areNumbersEvenAndStringsLongerThan2Predicate.xor(undefined);

      expect(xorPredicates.apply(12, 'abcd', 'ab', 10, 16)).toBe(false);
      expect(xorPredicates.apply(8, 'abc', 'Hello', 9, 17)).toBe(false);
      expect(xorPredicates.apply(12, 'abcd', 'Hello', 14, 6)).toBe(true);
      expect(xorPredicates.apply(4, 'abc', 'Hola', 6, 18)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(22, 'abcd', 'Hello', 12, 6)).toBe(true);
      expect(xorPredicates1.apply(2, 'Hola', 'abc', 30, 8)).toBe(true);

      expect(xorPredicates2.apply(19, 'abcdef', 'HelloWorld', 13, 12)).toBe(true);
      expect(xorPredicates2.apply(11, 'abcdef', 'HolaMundo', 15, 10)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(21, 'ab', '', 10, 6)).toBe(false);
      expect(xorPredicates1.apply(22, 'abc', 'a', 30, 15)).toBe(false);
      expect(xorPredicates1.apply(10, 'ab', 'Hello', 19, 14)).toBe(false);

      expect(xorPredicates2.apply(21, 'ab', '', 10, 6)).toBe(false);
      expect(xorPredicates2.apply(22, 'abc', 'a', 30, 15)).toBe(false);
      expect(xorPredicates2.apply(10, 'ab', 'Hello', 19, 14)).toBe(false);
    });


    it('when both Predicates return true then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(12, 'abcdef', 'abcdefg', 10, 6)).toBe(false);
      expect(xorPredicates1.apply(16, '123456', '123567', 8, 14)).toBe(false);

      expect(xorPredicates2.apply(12, 'abcdef', 'abcdefg', 10, 6)).toBe(false);
      expect(xorPredicates2.apply(16, '123456', '123567', 8, 14)).toBe(false);
    });

  });

});



const areNumbersEvenAndStringsLongerThan2Predicate: Predicate5<number, string, string, number, number> =
  Predicate5.of(
    (n1: number,
     s1: string,
     s2: string,
     n2: number,
     n3: number) =>
      0 == n1 % 2 &&
      2 < s1.length &&
      2 < s2.length &&
      0 == n2 % 2 &&
      0 == n3 % 2
  );


const areNumbersLowerThan20AndStringsLongerThan5Raw =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   s2: string,
   n2: number,
   n3: number) =>
    20 > n1! &&
    5 < s1!.length &&
    5 < s2.length &&
    20 > n2 &&
    20 > n3;


const areNumbersLowerThan20AndStringsLongerThan5Predicate: Predicate5<number, string, string, number, number> =
  Predicate5.of(
    (n1: number,
     s1: string,
     s2: string,
     n2: number,
     n3: number) =>
      20 > n1! &&
      5 < s1!.length &&
      5 < s2.length &&
      20 > n2 &&
      20 > n3
  );


const areNumbersEvenAndStringNotNullRaw =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   n2: number,
   s2: string,
   n3: number) =>
    0 == n1! % 2 &&
    undefined !== s1 &&
    null !== s1 &&
    0 == n2 % 2 &&
    undefined !== s2 &&
    null !== s2 &&
    0 == n3 % 2;


const areNumbersEvenAndStringNotNullFPredicate: FPredicate5<number, string, number, string, number> =
    (n1: NullableOrUndefined<number>,
     s1: NullableOrUndefined<string>,
     n2: number,
     s2: string,
     n3: number) =>
      0 == n1! % 2 &&
      undefined !== s1 &&
      null !== s1 &&
      0 == n2 % 2 &&
      undefined !== s2 &&
      null !== s2 &&
      0 == n3 % 2;


const areNumbersEvenAndStringNotNullPredicate: Predicate5<NullableOrUndefined<number>, NullableOrUndefined<string>, number, string, number> =
    Predicate5.of(
      (n1: NullableOrUndefined<number>,
       s1: NullableOrUndefined<string>,
       n2: number,
       s2: string,
       n3: number) =>
        0 == n1! % 2 &&
        undefined !== s1 &&
        null !== s1 &&
        0 == n2 % 2 &&
        undefined !== s2 &&
        null !== s2 &&
        0 == n3 % 2
    );
