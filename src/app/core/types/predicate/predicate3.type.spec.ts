import { NullableOrUndefined } from '@app-core/types';
import { Predicate3, FPredicate3, isFPredicate3, Predicate2 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/predicate/predicate3.type.spec.ts
 */
describe('isFPredicate3', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate3()).toBeFalse();
    expect(isFPredicate3(null)).toBeFalse();
    expect(isFPredicate3(12)).toBeFalse();
    expect(isFPredicate3({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate3((t1: string) => null !== t1)).toBeFalse();
    expect(isFPredicate3((t1: string, t2: string) => null !== t1 && null !== t2)).toBeFalse();
    expect(isFPredicate3((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null != t3 && null != t4)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate3((t1: string, t2: string, t3: string) => true)).toBeTrue();
    expect(isFPredicate3((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null != t3)).toBeTrue();
  });

});




describe('Predicate3', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate3.allOf<number, string, boolean>().apply(5, '', true)).toBeTrue();
      expect(Predicate3.allOf<number, string, boolean>(null).apply(5, '', false)).toBeTrue();
      expect(Predicate3.allOf<number, string, boolean>([]).apply(5, '', true)).toBeTrue();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(11, 'abcdef', false)).toBeFalse();

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(12, 'abcd', false)).toBeFalse();

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(30, 'a', false)).toBeFalse();

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(10, 'abcdef', false)).toBeTrue();
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate3.alwaysFalse();

      expect(predicate.apply(1, false, 'g')).toBeFalse();
      expect(predicate.apply('a', 21, true)).toBeFalse();
      expect(predicate.apply('123', true, 43)).toBeFalse();
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate3.alwaysTrue();

      expect(predicate.apply(1, false, 't')).toBeTrue();
      expect(predicate.apply('a', 21, true)).toBeTrue();
      expect(predicate.apply('123', true, 99)).toBeTrue();
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate3.anyOf<number, string, boolean>().apply(5, '', true)).toBeFalse();
      expect(Predicate3.anyOf<number, string, boolean>(null).apply(5, '', false)).toBeFalse();
      expect(Predicate3.anyOf<number, string, boolean>([]).apply(5, '', true)).toBeFalse();
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(10, 'abcdef', false)).toBeTrue();

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(11, 'abcdef', false)).toBeTrue();

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(22, 'abc', false)).toBeTrue();

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(30, 'a', false)).toBeFalse();
    });
  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = Predicate3.isNullOrUndefined();

      expect(predicate.apply(null, null, null)).toBeTrue();
      expect(predicate.apply(null, undefined, null)).toBeTrue();
      expect(predicate.apply(null, undefined, undefined)).toBeTrue();
      expect(predicate.apply(undefined, null, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, null)).toBeTrue();
      expect(predicate.apply(undefined, undefined, undefined)).toBeTrue();
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate3.isNullOrUndefined();

      expect(predicate.apply(null, 12, '')).toBeFalse();
      expect(predicate.apply(undefined, 12, '')).toBeFalse();
      expect(predicate.apply(12, null, '')).toBeFalse();
      expect(predicate.apply(12, undefined, '')).toBeFalse();
      expect(predicate.apply(12, '', null)).toBeFalse();
      expect(predicate.apply(12, '', undefined)).toBeFalse();
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const predicate = Predicate3.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(nonNullVariable, 12, '')).toBeFalse();
      expect(predicate.apply('', nonNullVariable, 12)).toBeFalse();
      expect(predicate.apply('', true, nonNullVariable)).toBeFalse();
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = Predicate3.nonNullOrUndefined();

      expect(predicate.apply(null, null, null)).toBeFalse();
      expect(predicate.apply(null, undefined, null)).toBeFalse();
      expect(predicate.apply(null, undefined, undefined)).toBeFalse();
      expect(predicate.apply(undefined, null, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, null)).toBeFalse();
      expect(predicate.apply(undefined, undefined, undefined)).toBeFalse();
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate3.nonNullOrUndefined();

      expect(predicate.apply(null, 12, '')).toBeFalse();
      expect(predicate.apply(undefined, 12, '')).toBeFalse();
      expect(predicate.apply(12, null, '')).toBeFalse();
      expect(predicate.apply(12, undefined, '')).toBeFalse();
      expect(predicate.apply(12, '', null)).toBeFalse();
      expect(predicate.apply(12, '', undefined)).toBeFalse();
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const predicate = Predicate3.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', nonNullVariable)).toBeTrue();
      expect(predicate.apply('', nonNullVariable, 12)).toBeTrue();
      expect(predicate.apply('', true, nonNullVariable)).toBeTrue();
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate3.isPredicate()).toBeFalse();
      expect(Predicate3.isPredicate(null)).toBeFalse();
      expect(Predicate3.isPredicate('')).toBeFalse();
      expect(Predicate3.isPredicate(12)).toBeFalse();
      expect(Predicate3.isPredicate({})).toBeFalse();
      expect(Predicate3.isPredicate({ apply: (n: number) => n*2 })).toBeFalse();
    });


    it('when provided predicate is different than Predicate3 then false is returned', () => {
      const isNumberEvenAndStringNotNull: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
        Predicate2.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s
        );

      expect(Predicate3.isPredicate(isNumberEvenAndStringNotNull)).toBeFalse();

      expect(Predicate3.isPredicate(Predicate3.alwaysTrue())).toBeTrue();
      expect(Predicate3.isPredicate(Predicate3.alwaysFalse())).toBeTrue();
    });


    it('when a Predicate3 is provided then true is returned', () => {
      const isNumberEvenAndStringBooleanNotNull: Predicate3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>> =
        Predicate3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b
        );

      expect(Predicate3.isPredicate(isNumberEvenAndStringBooleanNotNull)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined predicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Predicate3.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Predicate3.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FPredicate3 is provided then a valid Predicate3 is returned', () => {
      const isNumberEvenAndStringAndBooleanNotNull =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b;

      const predicate = Predicate3.of(isNumberEvenAndStringAndBooleanNotNull);

      expect(Predicate3.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, false)).toBeFalse();
      expect(predicate.apply(1, 'abc', null)).toBeFalse();
      expect(predicate.apply(2, 'abc', true)).toBeTrue();
    });


    it('when an instance of FPredicate3 is provided then a valid Predicate3 is returned', () => {
      const isNumberEvenAndStringNotNull: FPredicate3<number, string, boolean> =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b;

      const predicate = Predicate3.of(isNumberEvenAndStringNotNull);

      expect(Predicate3.isPredicate(predicate)).toBeTrue();
      // @ts-ignore
      expect(predicate.apply(1, null, false)).toBeFalse();
      // @ts-ignore
      expect(predicate.apply(1, 'abc', null)).toBeFalse();
      expect(predicate.apply(2, 'abc', true)).toBeTrue();
    });


    it('when an instance of Predicate3 is provided then the same one is returned', () => {
      const isNumberEvenAndStringBooleanNotNull: Predicate3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>> =
        Predicate3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b
        );

      const predicate = Predicate3.of(isNumberEvenAndStringBooleanNotNull);

      expect(Predicate3.isPredicate(predicate)).toBeTrue();
      expect(predicate.apply(1, null, false)).toBeFalse();
      expect(predicate.apply(1, 'abc', null)).toBeFalse();
      expect(predicate.apply(2, 'abc', true)).toBeTrue();
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const verifier: FPredicate3<number, string, boolean> = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.getVerifier();

      expect(verifier(11, 'abcd', false)).toBeFalse();
      expect(verifier(2, 'ab', true)).toBeFalse();
      expect(verifier(12, 'abcd', false)).toBeTrue();
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const andPredicates = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.and(null);

      expect(andPredicates.apply(11, 'abcd', true)).toBeFalse();
      expect(andPredicates.apply(10, 'ab', false)).toBeFalse();
      expect(andPredicates.apply(22, 'abcd', false)).toBeTrue();
      expect(andPredicates.apply(18, 'abcde', false)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const andPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.and(isNumberLowerThan20AndStringSmallerThan5AndBooleanTruePredicate);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanTruePredicate.and(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(andPredicates1.apply(11, 'abcd', false)).toBeFalse();
      expect(andPredicates1.apply(10, 'ab', true)).toBeFalse();
      expect(andPredicates1.apply(22, 'abcd', false)).toBeFalse();
      expect(andPredicates1.apply(18, 'abcde', true)).toBeFalse();

      expect(andPredicates2.apply(11, 'abcd', false)).toBeFalse();
      expect(andPredicates2.apply(10, 'ab', true)).toBeFalse();
      expect(andPredicates2.apply(22, 'abcd', false)).toBeFalse();
      expect(andPredicates2.apply(18, 'abcde', true)).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const andPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.and(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.and(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(andPredicates1.apply(12, 'abcd', false)).toBeTrue();
      expect(andPredicates1.apply(18, '1234', false)).toBeTrue();

      expect(andPredicates2.apply(12, 'abcd', false)).toBeTrue();
      expect(andPredicates2.apply(18, '1234', false)).toBeTrue();
    });

  });



  describe('apply', () => {

    it('when a Predicate3 is provided then the received input will be evaluated', () => {
      expect(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.apply(11, 'abcd', false)).toBeFalse();
      expect(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.apply(2, 'ab', true)).toBeFalse();
      expect(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.apply(12, 'abcd', false)).toBeTrue();
    });

  });



  describe('not', () => {

    it('when a Predicate3 is provided then logical negation will be returned', () => {
      const notIsNumberEvenAndStringLongerThan3AndBooleanFalse = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicateNullable.not();

      expect(notIsNumberEvenAndStringLongerThan3AndBooleanFalse.apply(11, 'abcd', true)).toBeTrue();
      expect(notIsNumberEvenAndStringLongerThan3AndBooleanFalse.apply(2, 'ab', true)).toBeTrue();
      expect(notIsNumberEvenAndStringLongerThan3AndBooleanFalse.apply(12, 'abcd', false)).toBeFalse();
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const orPredicates = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.or(undefined);

      expect(orPredicates.apply(11, 'abcd', true)).toBeFalse();
      expect(orPredicates.apply(10, 'ab', false)).toBeFalse();
      expect(orPredicates.apply(22, 'abcd', false)).toBeTrue();
      expect(orPredicates.apply(18, 'abcde', false)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const orPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.or(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.or(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(orPredicates1.apply(22, 'abcd', false)).toBeTrue();
      expect(orPredicates1.apply(11, 'abcd', false)).toBeTrue();

      expect(orPredicates2.apply(22, 'abcd', false)).toBeTrue();
      expect(orPredicates2.apply(11, 'abcd', false)).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const orPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.or(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.or(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(orPredicates1.apply(21, 'ab', true)).toBeFalse();
      expect(orPredicates1.apply(22, 'abc', false)).toBeFalse();
      expect(orPredicates1.apply(24, 'ab', true)).toBeFalse();

      expect(orPredicates2.apply(21, 'ab', true)).toBeFalse();
      expect(orPredicates2.apply(22, 'abc', false)).toBeFalse();
      expect(orPredicates2.apply(24, 'ab', true)).toBeFalse();
    });


    it('when both Predicates return true then true is returned', () => {
      const orPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.or(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.or(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(orPredicates1.apply(12, 'abcd', false)).toBeTrue();
      expect(orPredicates1.apply(16, '1234', false)).toBeTrue();

      expect(orPredicates2.apply(12, 'abcd', false)).toBeTrue();
      expect(orPredicates2.apply(16, '1234', false)).toBeTrue();
    });

  });



  describe('xor', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const xorPredicates = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.xor(undefined);

      expect(xorPredicates.apply(11, 'abcd', true)).toBeFalse();
      expect(xorPredicates.apply(10, 'ab', false)).toBeFalse();
      expect(xorPredicates.apply(22, 'abcd', false)).toBeTrue();
      expect(xorPredicates.apply(18, 'abcde', false)).toBeTrue();
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const xorPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.xor(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const xorPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.xor(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(xorPredicates1.apply(22, 'abcd', false)).toBeTrue();
      expect(xorPredicates1.apply(11, 'abcd', false)).toBeTrue();

      expect(xorPredicates2.apply(22, 'abcd', false)).toBeTrue();
      expect(xorPredicates2.apply(11, 'abcd', false)).toBeTrue();
    });


    it('when both Predicates return false then false is returned', () => {
      const xorPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.xor(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const xorPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.xor(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(xorPredicates1.apply(21, 'ab', true)).toBeFalse();
      expect(xorPredicates1.apply(22, 'abc', false)).toBeFalse();
      expect(xorPredicates1.apply(24, 'ab', true)).toBeFalse();

      expect(xorPredicates2.apply(21, 'ab', true)).toBeFalse();
      expect(xorPredicates2.apply(22, 'abc', false)).toBeFalse();
      expect(xorPredicates2.apply(24, 'ab', true)).toBeFalse();
    });


    it('when both Predicates return true then false is returned', () => {
      const xorPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.xor(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const xorPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.xor(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(xorPredicates1.apply(12, 'abcd', false)).toBeFalse();
      expect(xorPredicates1.apply(16, '1234', false)).toBeFalse();

      expect(xorPredicates2.apply(12, 'abcd', false)).toBeFalse();
      expect(xorPredicates2.apply(16, '1234', false)).toBeFalse();
    });

  });

});



const isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate: Predicate3<number, string, boolean> =
  Predicate3.of(
    (n: number,
     s: string,
     b: boolean) =>
      0 == n % 2 &&
      2 < s.length &&
      !b
  );


const isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw =
  (n: NullableOrUndefined<number>,
   s: NullableOrUndefined<string>,
   b: boolean) =>
    20 > n! &&
    5 < s!.length &&
    !b;


const isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate: Predicate3<number, string, boolean> =
  Predicate3.of(
    (n: number,
     s: string,
     b: boolean) =>
      0 == n % 2 &&
      3 < s.length &&
      !b
  );


const isNumberEvenAndStringLongerThan3AndBooleanFalsePredicateNullable: Predicate3<NullableOrUndefined<number>, NullableOrUndefined<string>, boolean> =
  Predicate3.of(
    (n: NullableOrUndefined<number>,
     s: NullableOrUndefined<string>,
     b: boolean) =>
      0 == n! % 2 &&
      3 < s!.length &&
      !b
  );


const isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate: Predicate3<number, string, boolean> =
  Predicate3.of(
    (n: number,
     s: string,
     b: boolean) =>
      20 > n &&
      5 > s.length &&
      !b
  );


const isNumberLowerThan20AndStringSmallerThan5AndBooleanTruePredicate: Predicate3<number, string, boolean> =
  Predicate3.of(
    (n: number,
     s: string,
     b: boolean) =>
      20 > n &&
      5 > s.length &&
      b
  );
