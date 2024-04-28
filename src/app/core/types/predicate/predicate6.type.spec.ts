import { NullableOrUndefined } from '@app-core/types';
import { Predicate6, FPredicate6, isFPredicate6, Predicate5 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/predicate/predicate6.type.spec.ts
 */
describe('isFPredicate6', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate6()).toBeFalse();
    expect(isFPredicate6(null)).toBeFalse();
    expect(isFPredicate6(12)).toBeFalse();
    expect(isFPredicate6({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate6(() => true)).toBeFalse();
    expect(isFPredicate6((t1: string) => null !== t1)).toBeFalse();
    expect(isFPredicate6((t1: string, t2: string) => null !== t1 && null !== t2)).toBeFalse();
    expect(isFPredicate6((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null !== t3)).toBeFalse();
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null !== t3 && null !== t4)).toBeFalse();
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string, t5: string) => null !== t1 && null !== t2 && null !== t3 && null !== t4 && null !== t5)).toBeFalse();
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string) => null !== t1 && null !== t2 && null != t3 && null != t4 && null != t5 && null !== t6 && null !== t7)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => true)).toBeTrue();
    expect(isFPredicate6((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => null !== t1 && null !== t2 && null != t3 && null !== t4 && null != t5 && null != t6)).toBeTrue();
  });

});




describe('Predicate6', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate6.allOf<number, string, boolean, number, number, number>().apply(5, '', true, 10, 9, -3)).toBeTrue();
      expect(Predicate6.allOf<number, string, boolean, number, number, number>(null).apply(5, '', false, 10, 9, -3)).toBeTrue();
      expect(Predicate6.allOf<number, string, boolean, number, number, number>([]).apply(5, '', true, 10, 9, -3)).toBeTrue();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate6.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(11, 'abcdef', 'HelloWorld', 10, 14, 9)).toBeFalse();

      expect(Predicate6.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(12, 'abcd', 'HelloWorld', 13, 15, 22)).toBeFalse();

      expect(Predicate6.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'abcdef', 'Hello', 8, 22, 7)).toBeFalse();

      expect(Predicate6.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 12, 16, 8)).toBeTrue();
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate6.alwaysFalse();

      expect(predicate.apply(1, false, 'g', 12, 9, -1)).toBeFalse();
      expect(predicate.apply('a', 21, true, false, '', '45r')).toBeFalse();
      expect(predicate.apply('123', true, 43, 'abc', false, true)).toBeFalse();
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate6.alwaysTrue();

      expect(predicate.apply(1, false, 't', true, 99, true)).toBeTrue();
      expect(predicate.apply('a', 21, true, 'rre', false, 'r3T')).toBeTrue();
      expect(predicate.apply('123', true, 99, -10, '', 6)).toBeTrue();
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate6.anyOf<number, string, boolean, number, number, number>().apply(5, '', true, 10, 8, -10)).toBeFalse();
      expect(Predicate6.anyOf<number, string, boolean, number, number, number>(null).apply(5, '', false, -4, 11, -1)).toBeFalse();
      expect(Predicate6.anyOf<number, string, boolean, number, number, number>([]).apply(5, '', true, 0, 20, 32)).toBeFalse();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate6.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 11, 9, 15)).toBeTrue();

      expect(Predicate6.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(8, 'abc', 'Hello', 32, 12, 14)).toBeTrue();

      expect(Predicate6.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(17, 'abcdef', 'HelloWorld', 15, 7, 5)).toBeTrue();

      expect(Predicate6.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'a', 'HelloWorld', 9, 11, 22)).toBeFalse();
    });
  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = Predicate6.isNullOrUndefined();

      expect(predicate.apply(null, null, null, null, null, null)).toBeTrue();
      expect(predicate.apply(null, undefined, null, null, null, null)).toBeTrue();
      expect(predicate.apply(null, undefined, undefined, null, null, null)).toBeTrue();
      expect(predicate.apply(null, undefined, undefined, undefined, null, null)).toBeTrue();
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, null)).toBeTrue();
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, undefined)).toBeTrue();
      expect(predicate.apply(undefined, null, null, null, null, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, null, null, null, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, undefined, null, null, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, undefined, undefined, null, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, undefined)).toBeTrue();
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate6.isNullOrUndefined();

      expect(predicate.apply(null, 12, '', false, 3, 'er')).toBeFalse();
      expect(predicate.apply(undefined, 12, '', true, 6, 'req')).toBeFalse();
      expect(predicate.apply(12, null, '', false, 'abc', true)).toBeFalse();
      expect(predicate.apply(12, undefined, '', true, 'abc', -15)).toBeFalse();
      expect(predicate.apply(12, '', null, false, true, 89)).toBeFalse();
      expect(predicate.apply(12, '', undefined, true, false, 'rres')).toBeFalse();
      expect(predicate.apply(12, '', false, null, 45, true)).toBeFalse();
      expect(predicate.apply(12, '', true, undefined, 66, 'ertas')).toBeFalse();
      expect(predicate.apply('abc', 19, false, '', null, 45)).toBeFalse();
      expect(predicate.apply('abc', 21, true, 'x', undefined, false)).toBeFalse();
      expect(predicate.apply('abc', 19, false, '', '3333', null)).toBeFalse();
      expect(predicate.apply('abc', 21, true, 'x', false, undefined)).toBeFalse();
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const predicate = Predicate6.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable, false, -12)).toBeFalse();
      expect(predicate.apply('', nonNullVariable, 12, false, nonNullVariable, 664)).toBeFalse();
      expect(predicate.apply('', true, nonNullVariable, 44, 'xrc', false)).toBeFalse();
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = Predicate6.nonNullOrUndefined();

      expect(predicate.apply(null, null, null, null, null, null)).toBeFalse();
      expect(predicate.apply(null, undefined, null, null, null, null)).toBeFalse();
      expect(predicate.apply(null, undefined, undefined, null, null, null)).toBeFalse();
      expect(predicate.apply(null, undefined, undefined, undefined, null, null)).toBeFalse();
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, null)).toBeFalse();
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, undefined)).toBeFalse();
      expect(predicate.apply(undefined, null, null, null, null, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, null, null, null, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, undefined, null, null, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, undefined, undefined, null, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, undefined)).toBeFalse();
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate6.nonNullOrUndefined();

      expect(predicate.apply(null, 12, '', false, 3, true)).toBeFalse();
      expect(predicate.apply(undefined, 12, '', true, 6, 'ass')).toBeFalse();
      expect(predicate.apply(12, null, '', false, 'abc', -34)).toBeFalse();
      expect(predicate.apply(12, undefined, '', true, 'abc', 31)).toBeFalse();
      expect(predicate.apply(12, '', null, false, true, 'sda')).toBeFalse();
      expect(predicate.apply(12, '', undefined, true, false, '234s')).toBeFalse();
      expect(predicate.apply(12, '', false, null, 45, true)).toBeFalse();
      expect(predicate.apply(12, '', true, undefined, 66, '5rfe')).toBeFalse();
      expect(predicate.apply('abc', 19, false, '', null, -45)).toBeFalse();
      expect(predicate.apply('abc', 21, true, 'x', undefined, 'erer')).toBeFalse();
      expect(predicate.apply('abc', 19, false, '', true, null)).toBeFalse();
      expect(predicate.apply('abc', 21, true, 'x', 87, undefined)).toBeFalse();
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const predicate = Predicate6.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable, false, 67)).toBeTrue();
      expect(predicate.apply('', nonNullVariable, 12, false, nonNullVariable, '45')).toBeTrue();
      expect(predicate.apply('', true, nonNullVariable, 44, 'xrc', -31)).toBeTrue();
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate6.isPredicate()).toBeFalse();
      expect(Predicate6.isPredicate(null)).toBeFalse();
      expect(Predicate6.isPredicate('')).toBeFalse();
      expect(Predicate6.isPredicate(12)).toBeFalse();
      expect(Predicate6.isPredicate({})).toBeFalse();
      expect(Predicate6.isPredicate({ apply: (n: number) => n*2 })).toBeFalse();
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

      expect(Predicate6.isPredicate(areNumbersEvenAndStringNotNull)).toBeFalse();

      expect(Predicate6.isPredicate(Predicate6.alwaysTrue())).toBeTrue();
      expect(Predicate6.isPredicate(Predicate6.alwaysFalse())).toBeTrue();
    });


    it('when a Predicate6 is provided then true is returned', () => {
      expect(Predicate6.isPredicate(areNumbersEvenAndStringsLongerThan2Predicate)).toBeTrue();
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

      expect(Predicate6.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, 2, 'abc', 4, 5)).toBeFalse();
      expect(predicate.apply(1, 'abc', 4, '', 8, 11)).toBeFalse();
      expect(predicate.apply(2, 'abc', 6, '', 12, 4)).toBeTrue();
    });


    it('when an instance of FPredicate6 is provided then a valid Predicate6 is returned', () => {
      const predicate = Predicate6.of(areNumbersEvenAndStringNotNullFPredicate);

      expect(Predicate6.isPredicate(predicate)).toBeTrue();
      // @ts-ignore
      expect(predicate.apply(1, null, 2, 'abc', 6, 13)).toBeFalse();
      expect(predicate.apply(1, 'abc', 4, '', 7, 19)).toBeFalse();
      expect(predicate.apply(2, 'abc', 6, '', 10, 12)).toBeTrue();
    });


    it('when an instance of Predicate6 is provided then the same one is returned', () => {
      const predicate = Predicate6.of(areNumbersEvenAndStringNotNullPredicate);

      expect(Predicate6.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, 2, 'abc', 6, 13)).toBeFalse();
      expect(predicate.apply(1, 'abc', 4, '', 7, 19)).toBeFalse();
      expect(predicate.apply(2, 'abc', 6, '', 10, 12)).toBeTrue();
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const verifier: FPredicate6<number, string, number, string, number, number> = areNumbersEvenAndStringNotNullPredicate.getVerifier();

      // @ts-ignore
      expect(verifier(11, 'abcd', null, 10, 6, 9)).toBeFalse();
      expect(verifier(2, 'ab', 5, 'a', 8, 15)).toBeFalse();
      expect(verifier(8, 'abcd', 12, '', 20, 16)).toBeTrue();
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const andPredicates = areNumbersEvenAndStringNotNullPredicate.and(null);

      // @ts-ignore
      expect(andPredicates.apply(11, 'abcd', null, 10, 20, 9)).toBeFalse();
      expect(andPredicates.apply(2, 'ab', 5, 'a', 8, 16)).toBeFalse();
      expect(andPredicates.apply(4, 'a', 2, 'abc', 14, 18)).toBeTrue();
      expect(andPredicates.apply(8, 'abcd', 12, '', 30, 44)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(11, 'abcd', 'ab', 12, 10, 15)).toBeFalse();
      expect(andPredicates1.apply(8, 'abcd', 'a', 6, 4, 7)).toBeFalse();
      expect(andPredicates1.apply(22, 'abcd', 'abc', 14, 15, 22)).toBeFalse();
      expect(andPredicates1.apply(30, 'abcdef', 'HelloWorld', 12, 19, 32)).toBeFalse();

      expect(andPredicates2.apply(11, 'abcd', 'ab', 12, 10, 15)).toBeFalse();
      expect(andPredicates2.apply(8, 'abcd', 'a', 6, 4, 7)).toBeFalse();
      expect(andPredicates2.apply(22, 'abcd', 'abc', 14, 15, 22)).toBeFalse();
      expect(andPredicates2.apply(30, 'abcdef', 'HelloWorld', 12, 19, 32)).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(18, 'abcddf', 'HelloWorld', 12, 6, 8)).toBeTrue();
      expect(andPredicates1.apply(4, 'HolaMundo', 'abcddf', 16, 10, 6)).toBeTrue();

      expect(andPredicates2.apply(18, 'abcddf', 'HelloWorld', 12, 6, 8)).toBeTrue();
      expect(andPredicates2.apply(4, 'HolaMundo', 'abcddf', 16, 10, 6)).toBeTrue();
    });

  });



  describe('apply', () => {

    it('when a Predicate6 is provided then the received input will be evaluated', () => {
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'ab', 10, 9, 24)).toBeFalse();
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(8, 'abc', 'Hello', 9, 7, 15)).toBeFalse();
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'Hello', 14, 20, 32)).toBeTrue();
    });

  });



  describe('not', () => {

    it('when a Predicate6 is provided then logical negation will be returned', () => {
      const notAreNumbersEvenAndStringsLongerThan2 = areNumbersEvenAndStringsLongerThan2Predicate.not();

      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'ab', 10, 9, 24)).toBeTrue();
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(8, 'abc', 'Hello', 9, 7, 15)).toBeTrue();
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'Hello', 14, 20, 32)).toBeFalse();
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const orPredicates = areNumbersEvenAndStringsLongerThan2Predicate.or(undefined);

      expect(orPredicates.apply(12, 'abcd', 'ab', 10, 16, 15)).toBeFalse();
      expect(orPredicates.apply(8, 'abc', 'Hello', 9, 17, 65)).toBeFalse();
      expect(orPredicates.apply(12, 'abcd', 'Hello', 14, 6, 56)).toBeTrue();
      expect(orPredicates.apply(4, 'abc', 'Hola', 6, 18, 14)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(22, 'abcd', 'Hello', 12, 6, 10)).toBeTrue();
      expect(orPredicates1.apply(2, 'Hola', 'abc', 30, 8, 12)).toBeTrue();

      expect(orPredicates2.apply(19, 'abcdef', 'HelloWorld', 13, 12, 15)).toBeTrue();
      expect(orPredicates2.apply(11, 'abcdef', 'HolaMundo', 15, 10, 5)).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(21, 'ab', '', 10, 6, 35)).toBeFalse();
      expect(orPredicates1.apply(22, 'abc', 'a', 30, 15, 13)).toBeFalse();
      expect(orPredicates1.apply(10, 'ab', 'Hello', 19, 14, 22)).toBeFalse();

      expect(orPredicates2.apply(21, 'ab', '', 10, 6, 35)).toBeFalse();
      expect(orPredicates2.apply(22, 'abc', 'a', 30, 15, 13)).toBeFalse();
      expect(orPredicates2.apply(10, 'ab', 'Hello', 19, 14, 22)).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(12, 'abcdef', 'abcdefg', 10, 6, 2)).toBeTrue();
      expect(orPredicates1.apply(16, '123456', '123567', 8, 14, 4)).toBeTrue();

      expect(orPredicates2.apply(12, 'abcdef', 'abcdefg', 10, 6, 2)).toBeTrue();
      expect(orPredicates2.apply(16, '123456', '123567', 8, 14, 4)).toBeTrue();
    });

  });



  describe('xor', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const xorPredicates = areNumbersEvenAndStringsLongerThan2Predicate.xor(undefined);

      expect(xorPredicates.apply(12, 'abcd', 'ab', 10, 16, 15)).toBeFalse();
      expect(xorPredicates.apply(8, 'abc', 'Hello', 9, 17, 65)).toBeFalse();
      expect(xorPredicates.apply(12, 'abcd', 'Hello', 14, 6, 56)).toBeTrue();
      expect(xorPredicates.apply(4, 'abc', 'Hola', 6, 18, 14)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(22, 'abcd', 'Hello', 12, 6, 10)).toBeTrue();
      expect(xorPredicates1.apply(2, 'Hola', 'abc', 30, 8, 12)).toBeTrue();

      expect(xorPredicates2.apply(19, 'abcdef', 'HelloWorld', 13, 12, 15)).toBeTrue();
      expect(xorPredicates2.apply(11, 'abcdef', 'HolaMundo', 15, 10, 5)).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(21, 'ab', '', 10, 6, 35)).toBeFalse();
      expect(xorPredicates1.apply(22, 'abc', 'a', 30, 15, 13)).toBeFalse();
      expect(xorPredicates1.apply(10, 'ab', 'Hello', 19, 14, 22)).toBeFalse();

      expect(xorPredicates2.apply(21, 'ab', '', 10, 6, 35)).toBeFalse();
      expect(xorPredicates2.apply(22, 'abc', 'a', 30, 15, 13)).toBeFalse();
      expect(xorPredicates2.apply(10, 'ab', 'Hello', 19, 14, 22)).toBeFalse();
    });


    it('when both Predicates return true then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(12, 'abcdef', 'abcdefg', 10, 6, 2)).toBeFalse();
      expect(xorPredicates1.apply(16, '123456', '123567', 8, 14, 4)).toBeFalse();

      expect(xorPredicates2.apply(12, 'abcdef', 'abcdefg', 10, 6, 2)).toBeFalse();
      expect(xorPredicates2.apply(16, '123456', '123567', 8, 14, 4)).toBeFalse();
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
