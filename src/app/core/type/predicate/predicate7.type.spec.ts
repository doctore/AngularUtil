import { NullableOrUndefined } from '@app-core/type';
import { Predicate7, FPredicate7, isFPredicate7, Predicate6 } from '@app-core/type/predicate';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/predicate/predicate7.type.spec.ts
 */
describe('isFPredicate7', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate7()).toBe(false);
    expect(isFPredicate7(null)).toBe(false);
    expect(isFPredicate7(12)).toBe(false);
    expect(isFPredicate7({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate7(() => true)).toBe(false);
    expect(isFPredicate7((t1: string) => null !== t1)).toBe(false);
    expect(isFPredicate7((t1: string, t2: string) => null !== t1 && null !== t2)).toBe(false);
    expect(isFPredicate7((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null !== t3)).toBe(false);
    expect(isFPredicate7((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null !== t3 && null !== t4)).toBe(false);
    expect(isFPredicate7((t1: string, t2: string, t3: string, t4: string, t5: string) => null !== t1 && null !== t2 && null !== t3 && null !== t4 && null !== t5)).toBe(false);
    expect(isFPredicate7((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string) => null !== t1 && null !== t2 && null !== t3 && null !== t4 && null !== t5 && null !== t6)).toBe(false);
    expect(isFPredicate7((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string) => null !== t1 && null !== t2 && null != t3 && null != t4 && null != t5 && null !== t6 && null !== t7 && null !== t8)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate7((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string) => true)).toBe(true);
    expect(isFPredicate7((t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string) => null !== t1 && null !== t2 && null != t3 && null !== t4 && null != t5 && null != t6 && null != t7)).toBe(true);
  });

});




describe('Predicate7', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate7.allOf<number, string, boolean, number, number, number, number>().apply(5, '', true, 10, 9, -3, 12)).toBe(true);
      expect(Predicate7.allOf<number, string, boolean, number, number, number, number>(null).apply(5, '', false, 10, 9, -3, 12)).toBe(true);
      expect(Predicate7.allOf<number, string, boolean, number, number, number, number>([]).apply(5, '', true, 10, 9, -3, 12)).toBe(true);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate7.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(11, 'abcdef', 'HelloWorld', 10, 14, 9, 22)).toBe(false);

      expect(Predicate7.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(12, 'abcd', 'HelloWorld', 13, 15, 22, -7)).toBe(false);

      expect(Predicate7.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'abcdef', 'Hello', 8, 22, 7, 0)).toBe(false);

      expect(Predicate7.allOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 12, 16, 8, 0)).toBe(true);
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate7.alwaysFalse();

      expect(predicate.apply(1, false, 'g', 12, 9, -1, 'YUT8')).toBe(false);
      expect(predicate.apply('a', 21, true, false, '', '45r', 98)).toBe(false);
      expect(predicate.apply('123', true, 43, 'abc', false, true, -12)).toBe(false);
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate7.alwaysTrue();

      expect(predicate.apply(1, false, 't', true, 99, true, 'YOPf')).toBe(true);
      expect(predicate.apply('a', 21, true, 'rre', false, 'r3T', -23)).toBe(true);
      expect(predicate.apply('123', true, 99, -10, '', 6, false)).toBe(true);
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate7.anyOf<number, string, boolean, number, number, number, number>().apply(5, '', true, 10, 8, -10, 0)).toBe(false);
      expect(Predicate7.anyOf<number, string, boolean, number, number, number, number>(null).apply(5, '', false, -4, 11, -1, 97)).toBe(false);
      expect(Predicate7.anyOf<number, string, boolean, number, number, number, number>([]).apply(5, '', true, 0, 20, 32, 1)).toBe(false);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate7.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(10, 'abcdef', 'HelloWorld', 11, 9, 15, 4)).toBe(true);

      expect(Predicate7.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(8, 'abc', 'Hello', 32, 12, 14, 6)).toBe(true);

      expect(Predicate7.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(17, 'abcdef', 'HelloWorld', 15, 7, 5, 19)).toBe(true);

      expect(Predicate7.anyOf([areNumbersEvenAndStringsLongerThan2Predicate, areNumbersLowerThan20AndStringsLongerThan5Raw])
        .apply(30, 'a', 'HelloWorld', 9, 11, 22, 4)).toBe(false);
    });
  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = Predicate7.isNullOrUndefined();

      expect(predicate.apply(null, null, null, null, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, null, null, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, null, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined, null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, undefined, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, undefined, undefined)).toBe(true);
      expect(predicate.apply(undefined, null, null, null, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, null, null, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, null, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined, null, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, undefined, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, undefined, undefined)).toBe(true);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate7.isNullOrUndefined();

      expect(predicate.apply(null, 12, '', false, 3, 'er', true)).toBe(false);
      expect(predicate.apply(undefined, 12, '', true, 6, 'req', 1)).toBe(false);
      expect(predicate.apply(12, null, '', false, 'abc', true, -56)).toBe(false);
      expect(predicate.apply(12, undefined, '', true, 'abc', -15, 'as2q')).toBe(false);
      expect(predicate.apply(12, '', null, false, true, 89, 'TYUD')).toBe(false);
      expect(predicate.apply(12, '', undefined, true, false, 'rres', -2)).toBe(false);
      expect(predicate.apply(12, '', false, null, 45, true, -3)).toBe(false);
      expect(predicate.apply(12, '', true, undefined, 66, 'ertas', false)).toBe(false);
      expect(predicate.apply('abc', 19, false, '', null, 45, true)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', undefined, false, 'ER')).toBe(false);
      expect(predicate.apply('abc', 19, false, '', '3333', null, 77)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', false, undefined, -87)).toBe(false);
      expect(predicate.apply('abc', 19, false, '', '3333', -5, null)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', false, 'poA', undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const predicate = Predicate7.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable, false, -12, 0)).toBe(false);
      expect(predicate.apply('', nonNullVariable, 12, false, nonNullVariable, 664, 'qq1!')).toBe(false);
      expect(predicate.apply('', true, nonNullVariable, 44, 'xrc', false, 'Wa2')).toBe(false);
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = Predicate7.nonNullOrUndefined();

      expect(predicate.apply(null, null, null, null, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, null, null, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, null, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined, null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, undefined, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined, undefined, undefined, undefined, undefined)).toBe(false);
      expect(predicate.apply(undefined, null, null, null, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, null, null, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, null, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined, null, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, undefined, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined, undefined, undefined, undefined, undefined)).toBe(false);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate7.nonNullOrUndefined();

      expect(predicate.apply(null, 12, '', false, 3, true, 'sd2')).toBe(false);
      expect(predicate.apply(undefined, 12, '', true, 6, 'ass', false)).toBe(false);
      expect(predicate.apply(12, null, '', false, 'abc', -34, 55)).toBe(false);
      expect(predicate.apply(12, undefined, '', true, 'abc', 31, '5Tr')).toBe(false);
      expect(predicate.apply(12, '', null, false, true, 'sda', 0)).toBe(false);
      expect(predicate.apply(12, '', undefined, true, false, '234s', -11)).toBe(false);
      expect(predicate.apply(12, '', false, null, 45, true, 'AS')).toBe(false);
      expect(predicate.apply(12, '', true, undefined, 66, '5rfe', false)).toBe(false);
      expect(predicate.apply('abc', 19, false, '', null, -45, true)).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', undefined, 'erer', -10)).toBe(false);
      expect(predicate.apply('abc', 19, false, '', true, null, 'TYr')).toBe(false);
      expect(predicate.apply('abc', 21, true, 'x', 87, undefined, false)).toBe(false);
      expect(predicate.apply('abc', 19, 4, '', true, false, null)).toBe(false);
      expect(predicate.apply('abc', 21, 56, 'x', 87, true, undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const predicate = Predicate7.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', true, nonNullVariable, false, 67, 'ERE')).toBe(true);
      expect(predicate.apply('', nonNullVariable, 12, false, nonNullVariable, '45', 0)).toBe(true);
      expect(predicate.apply('', true, nonNullVariable, 44, 'xrc', -31, 99)).toBe(true);
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate7.isPredicate()).toBe(false);
      expect(Predicate7.isPredicate(null)).toBe(false);
      expect(Predicate7.isPredicate('')).toBe(false);
      expect(Predicate7.isPredicate(12)).toBe(false);
      expect(Predicate7.isPredicate({})).toBe(false);
      expect(Predicate7.isPredicate({ apply: (n: number) => n*2 })).toBe(false);
    });


    it('when provided predicate is different than Predicate7 then false is returned', () => {
      const areNumbersEvenAndStringNotNull: Predicate6<NullableOrUndefined<number>, NullableOrUndefined<string>, number, number, number, number> =
        Predicate6.of((n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, n2: number, n3: number, n4: number, n5: number) =>
            0 == n1! % 2 &&
            undefined !== s &&
            null !== s &&
            0 == n2 % 2 &&
            0 == n3 % 2 &&
            0 == n4 % 2 &&
            0 == n5 % 2
        );

      expect(Predicate7.isPredicate(areNumbersEvenAndStringNotNull)).toBe(false);

      expect(Predicate7.isPredicate(Predicate7.alwaysTrue())).toBe(true);
      expect(Predicate7.isPredicate(Predicate7.alwaysFalse())).toBe(true);
    });


    it('when a Predicate7 is provided then true is returned', () => {
      expect(Predicate7.isPredicate(areNumbersEvenAndStringsLongerThan2Predicate)).toBe(true);
    });

  });



  describe('of', () => {

    it('when null or undefined predicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Predicate7.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Predicate7.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FPredicate7 is provided then a valid Predicate7 is returned', () => {
      const predicate = Predicate7.of(areNumbersEvenAndStringNotNullRaw);

      expect(Predicate7.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, 2, 'abc', 4, 5, 6)).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '', 8, 11, 12)).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '', 12, 4, 8)).toBe(true);
    });


    it('when an instance of FPredicate7 is provided then a valid Predicate7 is returned', () => {
      const predicate = Predicate7.of(areNumbersEvenAndStringNotNullFPredicate);

      expect(Predicate7.isPredicate(predicate)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(1, null, 2, 'abc', 6, 13, 12)).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '', 7, 19, 10)).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '', 10, 12, 4)).toBe(true);
    });


    it('when an instance of Predicate7 is provided then the same one is returned', () => {
      const predicate = Predicate7.of(areNumbersEvenAndStringNotNullPredicate);

      expect(Predicate7.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, 2, 'abc', 6, 13, 12)).toBe(false);
      expect(predicate.apply(1, 'abc', 4, '', 7, 19, 10)).toBe(false);
      expect(predicate.apply(2, 'abc', 6, '', 10, 12, 4)).toBe(true);
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const verifier: FPredicate7<number, string, number, string, number, number, number> = areNumbersEvenAndStringNotNullPredicate.getVerifier();

      // @ts-ignore
      expect(verifier(11, 'abcd', null, 10, 6, 9, 8)).toBe(false);
      expect(verifier(2, 'ab', 5, 'a', 8, 15, 6)).toBe(false);
      expect(verifier(8, 'abcd', 12, '', 20, 16, 0)).toBe(true);
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const andPredicates = areNumbersEvenAndStringNotNullPredicate.and(null);

      // @ts-ignore
      expect(andPredicates.apply(11, 'abcd', null, 10, 20, 9, -2)).toBe(false);
      expect(andPredicates.apply(2, 'ab', 5, 'a', 8, 16, -1)).toBe(false);
      expect(andPredicates.apply(4, 'a', 2, 'abc', 14, 18, 0)).toBe(true);
      expect(andPredicates.apply(8, 'abcd', 12, '', 30, 44, 4)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(11, 'abcd', 'ab', 12, 10, 15, 22)).toBe(false);
      expect(andPredicates1.apply(8, 'abcd', 'a', 6, 4, 7, 11)).toBe(false);
      expect(andPredicates1.apply(22, 'abcd', 'abc', 14, 15, 22, 4)).toBe(false);
      expect(andPredicates1.apply(30, 'abcdef', 'HelloWorld', 12, 19, 32, 11)).toBe(false);

      expect(andPredicates2.apply(11, 'abcd', 'ab', 12, 10, 15, 22)).toBe(false);
      expect(andPredicates2.apply(8, 'abcd', 'a', 6, 4, 7, 11)).toBe(false);
      expect(andPredicates2.apply(22, 'abcd', 'abc', 14, 15, 22, 4)).toBe(false);
      expect(andPredicates2.apply(30, 'abcdef', 'HelloWorld', 12, 19, 32, 11)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const andPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.and(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const andPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.and(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(andPredicates1.apply(18, 'abcddf', 'HelloWorld', 12, 6, 8, 16)).toBe(true);
      expect(andPredicates1.apply(4, 'HolaMundo', 'abcddf', 16, 10, 6, 0)).toBe(true);

      expect(andPredicates2.apply(18, 'abcddf', 'HelloWorld', 12, 6, 8, 16)).toBe(true);
      expect(andPredicates2.apply(4, 'HolaMundo', 'abcddf', 16, 10, 6, 0)).toBe(true);
    });

  });



  describe('apply', () => {

    it('when a Predicate7 is provided then the received input will be evaluated', () => {
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'ab', 10, 9, 24, 0)).toBe(false);
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(8, 'abc', 'Hello', 9, 7, 15, 1)).toBe(false);
      expect(areNumbersEvenAndStringsLongerThan2Predicate.apply(12, 'abcd', 'Hello', 14, 20, 32, 6)).toBe(true);
    });

  });



  describe('not', () => {

    it('when a Predicate7 is provided then logical negation will be returned', () => {
      const notAreNumbersEvenAndStringsLongerThan2 = areNumbersEvenAndStringsLongerThan2Predicate.not();

      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'ab', 10, 9, 24, 11)).toBe(true);
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(8, 'abc', 'Hello', 9, 7, 15, 4)).toBe(true);
      expect(notAreNumbersEvenAndStringsLongerThan2.apply(12, 'abcd', 'Hello', 14, 20, 32, 4)).toBe(false);
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const orPredicates = areNumbersEvenAndStringsLongerThan2Predicate.or(undefined);

      expect(orPredicates.apply(12, 'abcd', 'ab', 10, 16, 15, 11)).toBe(false);
      expect(orPredicates.apply(8, 'abc', 'Hello', 9, 17, 65, 21)).toBe(false);
      expect(orPredicates.apply(12, 'abcd', 'Hello', 14, 6, 56, 34)).toBe(true);
      expect(orPredicates.apply(4, 'abc', 'Hola', 6, 18, 14, 2)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(22, 'abcd', 'Hello', 12, 6, 10, 34)).toBe(true);
      expect(orPredicates1.apply(2, 'Hola', 'abc', 30, 8, 12, 44)).toBe(true);

      expect(orPredicates2.apply(19, 'abcdef', 'HelloWorld', 13, 12, 15, 8)).toBe(true);
      expect(orPredicates2.apply(11, 'abcdef', 'HolaMundo', 15, 10, 5, 16)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(21, 'ab', '', 10, 6, 35, 41)).toBe(false);
      expect(orPredicates1.apply(22, 'abc', 'a', 30, 15, 13, 18)).toBe(false);
      expect(orPredicates1.apply(10, 'ab', 'Hello', 19, 14, 22, 2)).toBe(false);

      expect(orPredicates2.apply(21, 'ab', '', 10, 6, 35, 41)).toBe(false);
      expect(orPredicates2.apply(22, 'abc', 'a', 30, 15, 13, 18)).toBe(false);
      expect(orPredicates2.apply(10, 'ab', 'Hello', 19, 14, 22, 2)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const orPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.or(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const orPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.or(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(orPredicates1.apply(12, 'abcdef', 'abcdefg', 10, 6, 2, 4)).toBe(true);
      expect(orPredicates1.apply(16, '123456', '123567', 8, 14, 4, 18)).toBe(true);

      expect(orPredicates2.apply(12, 'abcdef', 'abcdefg', 10, 6, 2, 4)).toBe(true);
      expect(orPredicates2.apply(16, '123456', '123567', 8, 14, 4, 18)).toBe(true);
    });

  });



  describe('xor', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const xorPredicates = areNumbersEvenAndStringsLongerThan2Predicate.xor(undefined);

      expect(xorPredicates.apply(12, 'abcd', 'ab', 10, 16, 15, 11)).toBe(false);
      expect(xorPredicates.apply(8, 'abc', 'Hello', 9, 17, 65, 21)).toBe(false);
      expect(xorPredicates.apply(12, 'abcd', 'Hello', 14, 6, 56, 34)).toBe(true);
      expect(xorPredicates.apply(4, 'abc', 'Hola', 6, 18, 14, 2)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(22, 'abcd', 'Hello', 12, 6, 10, 34)).toBe(true);
      expect(xorPredicates1.apply(2, 'Hola', 'abc', 30, 8, 12, 44)).toBe(true);

      expect(xorPredicates2.apply(19, 'abcdef', 'HelloWorld', 13, 12, 15, 8)).toBe(true);
      expect(xorPredicates2.apply(11, 'abcdef', 'HolaMundo', 15, 10, 5, 16)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(21, 'ab', '', 10, 6, 35, 41)).toBe(false);
      expect(xorPredicates1.apply(22, 'abc', 'a', 30, 15, 13, 18)).toBe(false);
      expect(xorPredicates1.apply(10, 'ab', 'Hello', 19, 14, 22, 2)).toBe(false);

      expect(xorPredicates2.apply(21, 'ab', '', 10, 6, 35, 41)).toBe(false);
      expect(xorPredicates2.apply(22, 'abc', 'a', 30, 15, 13, 18)).toBe(false);
      expect(xorPredicates2.apply(10, 'ab', 'Hello', 19, 14, 22, 2)).toBe(false);
    });


    it('when both Predicates return true then false is returned', () => {
      const xorPredicates1 = areNumbersEvenAndStringsLongerThan2Predicate.xor(areNumbersLowerThan20AndStringsLongerThan5Predicate);
      const xorPredicates2 = areNumbersLowerThan20AndStringsLongerThan5Predicate.xor(areNumbersEvenAndStringsLongerThan2Predicate);

      expect(xorPredicates1.apply(12, 'abcdef', 'abcdefg', 10, 6, 2, 4)).toBe(false);
      expect(xorPredicates1.apply(16, '123456', '123567', 8, 14, 4, 18)).toBe(false);

      expect(xorPredicates2.apply(12, 'abcdef', 'abcdefg', 10, 6, 2, 4)).toBe(false);
      expect(xorPredicates2.apply(16, '123456', '123567', 8, 14, 4, 18)).toBe(false);
    });

  });

});



const areNumbersEvenAndStringsLongerThan2Predicate: Predicate7<number, string, string, number, number, number, number> =
  Predicate7.of(
    (n1: number,
     s1: string,
     s2: string,
     n2: number,
     n3: number,
     n4: number,
     n5: number) =>
      0 == n1 % 2 &&
      2 < s1.length &&
      2 < s2.length &&
      0 == n2 % 2 &&
      0 == n3 % 2 &&
      0 == n4 % 2 &&
      0 == n5 % 2
  );


const areNumbersLowerThan20AndStringsLongerThan5Raw =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   s2: string,
   n2: number,
   n3: number,
   n4: number,
   n5: number) =>
    20 > n1! &&
    5 < s1!.length &&
    5 < s2.length &&
    20 > n2 &&
    20 > n3 &&
    20 > n4 &&
    20 > n5;


const areNumbersLowerThan20AndStringsLongerThan5Predicate: Predicate7<number, string, string, number, number, number, number> =
  Predicate7.of(
    (n1: number,
     s1: string,
     s2: string,
     n2: number,
     n3: number,
     n4: number,
     n5: number) =>
      20 > n1! &&
      5 < s1!.length &&
      5 < s2.length &&
      20 > n2 &&
      20 > n3 &&
      20 > n4 &&
      20 > n5
  );


const areNumbersEvenAndStringNotNullRaw =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   n2: number,
   s2: string,
   n3: number,
   n4: number,
   n5: number) =>
    0 == n1! % 2 &&
    undefined !== s1 &&
    null !== s1 &&
    0 == n2 % 2 &&
    undefined !== s2 &&
    null !== s2 &&
    0 == n3 % 2 &&
    0 == n4 % 2 &&
    0 == n5 % 2;


const areNumbersEvenAndStringNotNullFPredicate: FPredicate7<number, string, number, string, number, number, number> =
  (n1: NullableOrUndefined<number>,
   s1: NullableOrUndefined<string>,
   n2: number,
   s2: string,
   n3: number,
   n4: number,
   n5: number) =>
    0 == n1! % 2 &&
    undefined !== s1 &&
    null !== s1 &&
    0 == n2 % 2 &&
    undefined !== s2 &&
    null !== s2 &&
    0 == n3 % 2 &&
    0 == n4 % 2 &&
    0 == n5 % 2;


const areNumbersEvenAndStringNotNullPredicate: Predicate7<NullableOrUndefined<number>, NullableOrUndefined<string>, number, string, number, number, number> =
  Predicate7.of(
    (n1: NullableOrUndefined<number>,
     s1: NullableOrUndefined<string>,
     n2: number,
     s2: string,
     n3: number,
     n4: number,
     n5: number) =>
      0 == n1! % 2 &&
      undefined !== s1 &&
      null !== s1 &&
      0 == n2 % 2 &&
      undefined !== s2 &&
      null !== s2 &&
      0 == n3 % 2 &&
      0 == n4 % 2 &&
      0 == n5 % 2
  );
