import { NullableOrUndefined } from '@app-core/type';
import { Predicate6, FPredicate6, isFPredicate6, Predicate5 } from '@app-core/type/predicate';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/predicate/predicate6.type.spec.ts
 */
describe('isFPredicate6', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate6()).toBe(false);
    expect(isFPredicate6(null)).toBe(false);
    expect(isFPredicate6(12)).toBe(false);
    expect(isFPredicate6({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate6(() => true)).toBe(false);
    expect(isFPredicate6((t1: string) => null !== t1)).toBe(false);
    expect(isFPredicate6((t1: string, t2: string) => null !== t1 && null !== t2)).toBe(false);
    expect(isFPredicate6((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null !== t3)).toBe(false);
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null !== t3 && null !== t4)).toBe(false);
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string, t5: string) => null !== t1 && null !== t2 && null !== t3 && null !== t4 && null !== t5)).toBe(false);
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string) => null !== t1 && null !== t2 && null != t3 && null != t4 && null != t5 && null !== t6 && null !== t7)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => true)).toBe(true);
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => null !== t1 && null !== t2 && null != t3 && null !== t4 && null != t5 && null != t6)).toBe(true);
  });

});




describe('Predicate6', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate6.allOf<number, string, boolean, number, number, number>().apply(5, '', true, 10, 9, -3)).toBe(true);
      expect(Predicate6.allOf<number, string, boolean, number, number, number>(null).apply(5, '', false, 10, 9, -3)).toBe(true);
      expect(Predicate6.allOf<number, string, boolean, number, number, number>([]).apply(5, '', true, 10, 9, -3)).toBe(true);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate6.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(11, 'abcdef', 'HelloWorld', 10, 14, 9)).toBe(false);

      expect(Predicate6.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(12, 'abcd', 'HelloWorld', 13, 15, 22)).toBe(false);

      expect(Predicate6.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'abcdef', 'Hello', 8, 22, 7)).toBe(false);

      expect(Predicate6.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 12, 16, 8)).toBe(true);
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate6.alwaysFalse();

      expect(predicate.apply(1, false, 'g', 12, 9, -1)).toBe(false);
      expect(predicate.apply('a', 21, true, false, '', '45r')).toBe(false);
      expect(predicate.apply('123', true, 43, 'abc', false, true)).toBe(false);
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate6.alwaysTrue();

      expect(predicate.apply(1, false, 't', true, 99, true)).toBe(true);
      expect(predicate.apply('a', 21, true, 'rre', false, 'r3T')).toBe(true);
      expect(predicate.apply('123', true, 99, -10, '', 6)).toBe(true);
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate6.anyOf<number, string, boolean, number, number, number>().apply(5, '', true, 10, 8, -10)).toBe(false);
      expect(Predicate6.anyOf<number, string, boolean, number, number, number>(null).apply(5, '', false, -4, 11, -1)).toBe(false);
      expect(Predicate6.anyOf<number, string, boolean, number, number, number>([]).apply(5, '', true, 0, 20, 32)).toBe(false);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate6.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 11, 9, 15)).toBe(true);

      expect(Predicate6.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(8, 'abc', 'Hello', 32, 12, 14)).toBe(true);

      expect(Predicate6.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(17, 'abcdef', 'HelloWorld', 15, 7, 5)).toBe(true);

      expect(Predicate6.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'a', 'HelloWorld', 9, 11, 22)).toBe(false);
    });
  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = Predicate6.isNullOrUndefined();

      expect(predicate.apply(null, null, null, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, null, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, undefined)).toBe(true);
      expect(predicate.apply(undefined, null, null, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, null, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, undefined)).toBe(true);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate6.isNullOrUndefined();

      expect(predicate.apply(null, 12, '', false, 3, 'er')).toBe(false);
      expect(predicate.apply(undefined, 12, '', true, 6, 'req')).toBe(false);
      expect(predicate.apply(12, null, '', false, 'abc', true)).toBe(false);
      expect(predicate.apply(12, undefined, '', true, 'abc', -15)).toBe(false);
      expect(predicate.apply(12, '', null, false, true, 89)).toBe(false);
      expect(predicate.apply(12, '', undefined, true, false, 'rres')).toBe(false);
      expect(predicate.apply(12, '', false, null, 45, true)).toBe(false);
      expect(predicate.apply(12, '', true, undefined, 66, 'ertas')).toBe(false);
      expect(predicate.apply('abc', 19, false, '', null, 45)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', undefined, false)).toBe(false);
      expect(predicate.apply('abc', 19, false, '', '3333', null)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', false, undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const predicate = Predicate6.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable, false, -12)).toBe(false);
      expect(predicate.apply('', nonNullVariable, 12, false, nonNullVariable, 664)).toBe(false);
      expect(predicate.apply('', true, nonNullVariable, 44, 'xrc', false)).toBe(false);
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = Predicate6.nonNullOrUndefined();

      expect(predicate.apply(null, null, null, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, null, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, undefined)).toBe(false);
      expect(predicate.apply(undefined, null, null, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, null, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, undefined)).toBe(false);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate6.nonNullOrUndefined();

      expect(predicate.apply(null, 12, '', false, 3, true)).toBe(false);
      expect(predicate.apply(undefined, 12, '', true, 6, 'ass')).toBe(false);
      expect(predicate.apply(12, null, '', false, 'abc', -34)).toBe(false);
      expect(predicate.apply(12, undefined, '', true, 'abc', 31)).toBe(false);
      expect(predicate.apply(12, '', null, false, true, 'sda')).toBe(false);
      expect(predicate.apply(12, '', undefined, true, false, '234s')).toBe(false);
      expect(predicate.apply(12, '', false, null, 45, true)).toBe(false);
      expect(predicate.apply(12, '', true, undefined, 66, '5rfe')).toBe(false);
      expect(predicate.apply('abc', 19, false, '', null, -45)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', undefined, 'erer')).toBe(false);
      expect(predicate.apply('abc', 19, false, '', true, null)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', 87, undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const predicate = Predicate6.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable, false, 67)).toBe(true);
      expect(predicate.apply('', nonNullVariable, 12, false, nonNullVariable, '45')).toBe(true);
      expect(predicate.apply('', true, nonNullVariable, 44, 'xrc', -31)).toBe(true);
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate6.isPredicate()).toBe(false);
      expect(Predicate6.isPredicate(null)).toBe(false);
      expect(Predicate6.isPredicate('')).toBe(false);
      expect(Predicate6.isPredicate(12)).toBe(false);
      expect(Predicate6.isPredicate({})).toBe(false);
      expect(Predicate6.isPredicate({ apply: (n: number) => n*2 })).toBe(false);
    });


    it('when provided predicate is different than Predicate6 then false is returned', () => {
      const areNumbersEvenAndStringNotNull: Predicate5<NullableOrUndefined<number>, NullableOrUndefined<string>, number, number, number> =
        Predicate5.of((n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, n2: number, n3: number, n4: number) =>
          0 == n1! % 2 &&
          undefined !== s &&
          null !== s &&
          0 == n2 % 2 &&
          0 == n3 % 2 &&
          0 == n4 % 2
        );

      expect(Predicate6.isPredicate(areNumbersEvenAndStringNotNull)).toBe(false);

      expect(Predicate6.isPredicate(Predicate6.alwaysTrue())).toBe(true);
      expect(Predicate6.isPredicate(Predicate6.alwaysFalse())).toBe(true);
    });


    it('when a Predicate6 is provided then true is returned', () => {
      expect(Predicate6.isPredicate(areNumbersEvenAndStringsLongerThan2Predicate)).toBe(true);
    });

  });



  describe('of', () => {

    it('when null or undefined predicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Predicate6.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Predicate6.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FPredicate6 is provided then a valid Predicate6 is returned', () => {
      const predicate = Predicate6.of(areNumbersEvenAndStringNotNullRaw);

      expect(Predicate6.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, 2, 'abc', 4, 5)).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '', 8, 11)).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '', 12, 4)).toBe(true);
    });


    it('when an instance of FPredicate6 is provided then a valid Predicate6 is returned', () => {
      const predicate = Predicate6.of(areNumbersEvenAndStringNotNullFPredicate);

      expect(Predicate6.isPredicate(predicate)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(1, null, 2, 'abc', 6, 13)).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '', 7, 19)).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '', 10, 12)).toBe(true);
    });


    it('when an instance of Predicate6 is provided then the same one is returned', () => {
      const predicate = Predicate6.of(areNumbersEvenAndStringNotNullPredicate);

      expect(Predicate6.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, 2, 'abc', 6, 13)).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '', 7, 19)).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '', 10, 12)).toBe(true);
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const verifier: FPredicate6<number, string, number, string, number, number> = areNumbersEvenAndStringNotNullPredicate.getVerifier();

      // @ts-ignore
      expect(verifier(11, 'abcd', null, 10, 6, 9)).toBe(false);
      expect(verifier(2, 'ab', 5, 'a', 8, 15)).toBe(false);
      expect(verifier(8, 'abcd', 12, '', 20, 16)).toBe(true);
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const andPredicates = areNumbersEvenAndStringNotNullPredicate.and(null);

      // @ts-ignore
      expect(andPredicates.apply(11, 'abcd', null, 10, 20, 9)).toBe(false);
      expect(andPredicates.apply(2, 'ab', 5, 'a', 8, 16)).toBe(false);
      expect(andPredicates.apply(4, 'a', 2, 'abc', 14, 18)).toBe(true);
      expect(andPredicates.apply(8, 'abcd', 12, '', 30, 44)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(11, 'abcd', 'ab', 12, 10, 15)).toBe(false);
      expect(andPredicates1.apply(8, 'abcd', 'a', 6, 4, 7)).toBe(false);
      expect(andPredicates1.apply(22, 'abcd', 'abc', 14, 15, 22)).toBe(false);
      expect(andPredicates1.apply(30, 'abcdef', 'HelloWorld', 12, 19, 32)).toBe(false);

      expect(andPredicates2.apply(11, 'abcd', 'ab', 12, 10, 15)).toBe(false);
      expect(andPredicates2.apply(8, 'abcd', 'a', 6, 4, 7)).toBe(false);
      expect(andPredicates2.apply(22, 'abcd', 'abc', 14, 15, 22)).toBe(false);
      expect(andPredicates2.apply(30, 'abcdef', 'HelloWorld', 12, 19, 32)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(18, 'abcddf', 'HelloWorld', 12, 6, 8)).toBe(true);
      expect(andPredicates1.apply(4, 'HolaMundo', 'abcddf', 16, 10, 6)).toBe(true);

      expect(andPredicates2.apply(18, 'abcddf', 'HelloWorld', 12, 6, 8)).toBe(true);
      expect(andPredicates2.apply(4, 'HolaMundo', 'abcddf', 16, 10, 6)).toBe(true);
    });

  });



  describe('apply', () => {

    it('when a Predicate6 is provided then the received input will be evaluated', () => {
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'ab', 10, 9, 24)).toBe(false);
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(8, 'abc', 'Hello', 9, 7, 15)).toBe(false);
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'Hello', 14, 20, 32)).toBe(true);
    });

  });



  describe('not', () => {

    it('when a Predicate6 is provided then logical negation will be returned', () => {
      const notAreNumbersEvenAndStringsLongerThan2 = areNumbersEvenAndStringsLongerThan2Predicate.not();

      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'ab', 10, 9, 24)).toBe(true);
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(8, 'abc', 'Hello', 9, 7, 15)).toBe(true);
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'Hello', 14, 20, 32)).toBe(false);
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const orPredicates = areNumbersEvenAndStringsLongerThan2Predicate.or(undefined);

      expect(orPredicates.apply(12, 'abcd', 'ab', 10, 16, 15)).toBe(false);
      expect(orPredicates.apply(8, 'abc', 'Hello', 9, 17, 65)).toBe(false);
      expect(orPredicates.apply(12, 'abcd', 'Hello', 14, 6, 56)).toBe(true);
      expect(orPredicates.apply(4, 'abc', 'Hola', 6, 18, 14)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(22, 'abcd', 'Hello', 12, 6, 10)).toBe(true);
      expect(orPredicates1.apply(2, 'Hola', 'abc', 30, 8, 12)).toBe(true);

      expect(orPredicates2.apply(19, 'abcdef', 'HelloWorld', 13, 12, 15)).toBe(true);
      expect(orPredicates2.apply(11, 'abcdef', 'HolaMundo', 15, 10, 5)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(21, 'ab', '', 10, 6, 35)).toBe(false);
      expect(orPredicates1.apply(22, 'abc', 'a', 30, 15, 13)).toBe(false);
      expect(orPredicates1.apply(10, 'ab', 'Hello', 19, 14, 22)).toBe(false);

      expect(orPredicates2.apply(21, 'ab', '', 10, 6, 35)).toBe(false);
      expect(orPredicates2.apply(22, 'abc', 'a', 30, 15, 13)).toBe(false);
      expect(orPredicates2.apply(10, 'ab', 'Hello', 19, 14, 22)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(12, 'abcdef', 'abcdefg', 10, 6, 2)).toBe(true);
      expect(orPredicates1.apply(16, '123456', '123567', 8, 14, 4)).toBe(true);

      expect(orPredicates2.apply(12, 'abcdef', 'abcdefg', 10, 6, 2)).toBe(true);
      expect(orPredicates2.apply(16, '123456', '123567', 8, 14, 4)).toBe(true);
    });

  });



  describe('xor', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const xorPredicates = areNumbersEvenAndStringsLongerThan2Predicate.xor(undefined);

      expect(xorPredicates.apply(12, 'abcd', 'ab', 10, 16, 15)).toBe(false);
      expect(xorPredicates.apply(8, 'abc', 'Hello', 9, 17, 65)).toBe(false);
      expect(xorPredicates.apply(12, 'abcd', 'Hello', 14, 6, 56)).toBe(true);
      expect(xorPredicates.apply(4, 'abc', 'Hola', 6, 18, 14)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(22, 'abcd', 'Hello', 12, 6, 10)).toBe(true);
      expect(xorPredicates1.apply(2, 'Hola', 'abc', 30, 8, 12)).toBe(true);

      expect(xorPredicates2.apply(19, 'abcdef', 'HelloWorld', 13, 12, 15)).toBe(true);
      expect(xorPredicates2.apply(11, 'abcdef', 'HolaMundo', 15, 10, 5)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(21, 'ab', '', 10, 6, 35)).toBe(false);
      expect(xorPredicates1.apply(22, 'abc', 'a', 30, 15, 13)).toBe(false);
      expect(xorPredicates1.apply(10, 'ab', 'Hello', 19, 14, 22)).toBe(false);

      expect(xorPredicates2.apply(21, 'ab', '', 10, 6, 35)).toBe(false);
      expect(xorPredicates2.apply(22, 'abc', 'a', 30, 15, 13)).toBe(false);
      expect(xorPredicates2.apply(10, 'ab', 'Hello', 19, 14, 22)).toBe(false);
    });


    it('when both Predicates return true then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(12, 'abcdef', 'abcdefg', 10, 6, 2)).toBe(false);
      expect(xorPredicates1.apply(16, '123456', '123567', 8, 14, 4)).toBe(false);

      expect(xorPredicates2.apply(12, 'abcdef', 'abcdefg', 10, 6, 2)).toBe(false);
      expect(xorPredicates2.apply(16, '123456', '123567', 8, 14, 4)).toBe(false);
    });

  });

});



const areNumbersEvenAndStringsLongerThan2Predicate: Predicate6<number, string, string, number, number, number> =
  Predicate6.of(
    (n1: number,
     s1: string,
     s2: string,
     n2: number,
     n3: number,
     n4: number) =>
      0 == n1 % 2 &&
      2 < s1.length &&
      2 < s2.length &&
      0 == n2 % 2 &&
      0 == n3 % 2 &&
      0 == n4 % 2
  );


const areNumbersLowerThan20AndStringsLongerThan5Raw =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   s2: string,
   n2: number,
   n3: number,
   n4: number) =>
    20 > n1! &&
    5 < s1!.length &&
    5 < s2.length &&
    20 > n2 &&
    20 > n3 &&
    20 > n4;


const areNumbersLowerThan20AndStringsLongerThan5Predicate: Predicate6<number, string, string, number, number, number> =
  Predicate6.of(
    (n1: number,
     s1: string,
     s2: string,
     n2: number,
     n3: number,
     n4: number) =>
      20 > n1! &&
      5 < s1!.length &&
      5 < s2.length &&
      20 > n2 &&
      20 > n3 &&
      20 > n4
  );


const areNumbersEvenAndStringNotNullRaw =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   n2: number,
   s2: string,
   n3: number,
   n4: number) =>
    0 == n1! % 2 &&
    undefined !== s1 &&
    null !== s1 &&
    0 == n2 % 2 &&
    undefined !== s2 &&
    null !== s2 &&
    0 == n3 % 2 &&
    0 == n4 % 2;


const areNumbersEvenAndStringNotNullFPredicate: FPredicate6<number, string, number, string, number, number> =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   n2: number,
   s2: string,
   n3: number,
   n4: number) =>
    0 == n1! % 2 &&
    undefined !== s1 &&
    null !== s1 &&
    0 == n2 % 2 &&
    undefined !== s2 &&
    null !== s2 &&
    0 == n3 % 2 &&
    0 == n4 % 2;


const areNumbersEvenAndStringNotNullPredicate: Predicate6<NullableOrUndefined<number>, NullableOrUndefined<string>, number, string, number, number> =
  Predicate6.of(
    (n1: NullableOrUndefined<number>,
     s1: NullableOrUndefined<string>,
     n2: number,
     s2: string,
     n3: number,
     n4: number) =>
      0 == n1! % 2 &&
      undefined !== s1 &&
      null !== s1 &&
      0 == n2 % 2 &&
      undefined !== s2 &&
      null !== s2 &&
      0 == n3 % 2 &&
      0 == n4 % 2
  );
