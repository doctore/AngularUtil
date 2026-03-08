import { NullableOrUndefined } from '@app-core/type';
import { Predicate3, FPredicate3, isFPredicate3, Predicate2 } from '@app-core/type/predicate';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/predicate/predicate3.type.spec.ts
 */
describe('isFPredicate3', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFPredicate3()).toBe(false);
    expect(isFPredicate3(null)).toBe(false);
    expect(isFPredicate3(12)).toBe(false);
    expect(isFPredicate3({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFPredicate3((t1: string) => null !== t1)).toBe(false);
    expect(isFPredicate3((t1: string, t2: string) => null !== t1 && null !== t2)).toBe(false);
    expect(isFPredicate3((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null != t3 && null != t4)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFPredicate3((t1: string, t2: string, t3: string) => true)).toBe(true);
    expect(isFPredicate3((t1: string, t2: string, t3: string) => null !== t1 && null !== t2 && null != t3)).toBe(true);
  });

});




describe('Predicate3', () => {


  describe('allOf', () => {

    it('when given predicates are null or empty then true is always returned', () => {
      expect(Predicate3.allOf<number, string, boolean>().apply(5, '', true)).toBe(true);
      expect(Predicate3.allOf<number, string, boolean>(null).apply(5, '', false)).toBe(true);
      expect(Predicate3.allOf<number, string, boolean>([]).apply(5, '', true)).toBe(true);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(11, 'abcdef', false)).toBe(false);

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(12, 'abcd', false)).toBe(false);

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(30, 'a', false)).toBe(false);

      expect(Predicate3.allOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(10, 'abcdef', false)).toBe(true);
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const predicate = Predicate3.alwaysFalse();

      expect(predicate.apply(1, false, 'g')).toBe(false);
      expect(predicate.apply('a', 21, true)).toBe(false);
      expect(predicate.apply('123', true, 43)).toBe(false);
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const predicate = Predicate3.alwaysTrue();

      expect(predicate.apply(1, false, 't')).toBe(true);
      expect(predicate.apply('a', 21, true)).toBe(true);
      expect(predicate.apply('123', true, 99)).toBe(true);
    });

  });



  describe('anyOf', () => {

    it('when given predicates are null or empty then false is always returned', () => {
      expect(Predicate3.anyOf<number, string, boolean>().apply(5, '', true)).toBe(false);
      expect(Predicate3.anyOf<number, string, boolean>(null).apply(5, '', false)).toBe(false);
      expect(Predicate3.anyOf<number, string, boolean>([]).apply(5, '', true)).toBe(false);
    });


    it('when given predicates are not null or empty then result after applying all is always returned', () => {
      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(10, 'abcdef', false)).toBe(true);

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(11, 'abcdef', false)).toBe(true);

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(22, 'abc', false)).toBe(true);

      expect(Predicate3.anyOf([isNumberEvenAndStringLongerThan2AndBooleanFalsePredicate, isNumberLowerThan20AndStringLongerThan5AndBooleanFalseRaw])
        .apply(30, 'a', false)).toBe(false);
    });
  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = Predicate3.isNullOrUndefined();

      expect(predicate.apply(null, null, null)).toBe(true);
      expect(predicate.apply(null, undefined, null)).toBe(true);
      expect(predicate.apply(null, undefined, undefined)).toBe(true);
      expect(predicate.apply(undefined, null, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, null)).toBe(true);
      expect(predicate.apply(undefined, undefined, undefined)).toBe(true);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate3.isNullOrUndefined();

      expect(predicate.apply(null, 12, '')).toBe(false);
      expect(predicate.apply(undefined, 12, '')).toBe(false);
      expect(predicate.apply(12, null, '')).toBe(false);
      expect(predicate.apply(12, undefined, '')).toBe(false);
      expect(predicate.apply(12, '', null)).toBe(false);
      expect(predicate.apply(12, '', undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const predicate = Predicate3.isNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(nonNullVariable, 12, '')).toBe(false);
      expect(predicate.apply('', nonNullVariable, 12)).toBe(false);
      expect(predicate.apply('', true, nonNullVariable)).toBe(false);
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = Predicate3.nonNullOrUndefined();

      expect(predicate.apply(null, null, null)).toBe(false);
      expect(predicate.apply(null, undefined, null)).toBe(false);
      expect(predicate.apply(null, undefined, undefined)).toBe(false);
      expect(predicate.apply(undefined, null, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, null)).toBe(false);
      expect(predicate.apply(undefined, undefined, undefined)).toBe(false);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      const predicate = Predicate3.nonNullOrUndefined();

      expect(predicate.apply(null, 12, '')).toBe(false);
      expect(predicate.apply(undefined, 12, '')).toBe(false);
      expect(predicate.apply(12, null, '')).toBe(false);
      expect(predicate.apply(12, undefined, '')).toBe(false);
      expect(predicate.apply(12, '', null)).toBe(false);
      expect(predicate.apply(12, '', undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const predicate = Predicate3.nonNullOrUndefined();

      const nonNullVariable = true;

      expect(predicate.apply(12, '', nonNullVariable)).toBe(true);
      expect(predicate.apply('', nonNullVariable, 12)).toBe(true);
      expect(predicate.apply('', true, nonNullVariable)).toBe(true);
    });

  });



  describe('isPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(Predicate3.isPredicate()).toBe(false);
      expect(Predicate3.isPredicate(null)).toBe(false);
      expect(Predicate3.isPredicate('')).toBe(false);
      expect(Predicate3.isPredicate(12)).toBe(false);
      expect(Predicate3.isPredicate({})).toBe(false);
      expect(Predicate3.isPredicate({ apply: (n: number) => n*2 })).toBe(false);
    });


    it('when provided predicate is different than Predicate3 then false is returned', () => {
      const isNumberEvenAndStringNotNull: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
        Predicate2.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s
        );

      expect(Predicate3.isPredicate(isNumberEvenAndStringNotNull)).toBe(false);

      expect(Predicate3.isPredicate(Predicate3.alwaysTrue())).toBe(true);
      expect(Predicate3.isPredicate(Predicate3.alwaysFalse())).toBe(true);
    });


    it('when a Predicate3 is provided then true is returned', () => {
      const isNumberEvenAndStringBooleanNotNull: Predicate3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>> =
        Predicate3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b
        );

      expect(Predicate3.isPredicate(isNumberEvenAndStringBooleanNotNull)).toBe(true);
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

      expect(Predicate3.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, false)).toBe(false);
      expect(predicate.apply(1, 'abc', null)).toBe(false);
      expect(predicate.apply(2, 'abc', true)).toBe(true);
    });


    it('when an instance of FPredicate3 is provided then a valid Predicate3 is returned', () => {
      const isNumberEvenAndStringNotNull: FPredicate3<number, string, boolean> =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s &&
          null !== b;

      const predicate = Predicate3.of(isNumberEvenAndStringNotNull);

      expect(Predicate3.isPredicate(predicate)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(1, null, false)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(1, 'abc', null)).toBe(false);
      expect(predicate.apply(2, 'abc', true)).toBe(true);
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

      expect(Predicate3.isPredicate(predicate)).toBe(true);
      expect(predicate.apply(1, null, false)).toBe(false);
      expect(predicate.apply(1, 'abc', null)).toBe(false);
      expect(predicate.apply(2, 'abc', true)).toBe(true);
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const verifier: FPredicate3<number, string, boolean> = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.getVerifier();

      expect(verifier(11, 'abcd', false)).toBe(false);
      expect(verifier(2, 'ab', true)).toBe(false);
      expect(verifier(12, 'abcd', false)).toBe(true);
    });

  });



  describe('and', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const andPredicates = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.and(null);

      expect(andPredicates.apply(11, 'abcd', true)).toBe(false);
      expect(andPredicates.apply(10, 'ab', false)).toBe(false);
      expect(andPredicates.apply(22, 'abcd', false)).toBe(true);
      expect(andPredicates.apply(18, 'abcde', false)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns false then false is returned', () => {
      const andPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.and(isNumberLowerThan20AndStringSmallerThan5AndBooleanTruePredicate);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanTruePredicate.and(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(andPredicates1.apply(11, 'abcd', false)).toBe(false);
      expect(andPredicates1.apply(10, 'ab', true)).toBe(false);
      expect(andPredicates1.apply(22, 'abcd', false)).toBe(false);
      expect(andPredicates1.apply(18, 'abcde', true)).toBe(false);

      expect(andPredicates2.apply(11, 'abcd', false)).toBe(false);
      expect(andPredicates2.apply(10, 'ab', true)).toBe(false);
      expect(andPredicates2.apply(22, 'abcd', false)).toBe(false);
      expect(andPredicates2.apply(18, 'abcde', true)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const andPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.and(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const andPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.and(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(andPredicates1.apply(12, 'abcd', false)).toBe(true);
      expect(andPredicates1.apply(18, '1234', false)).toBe(true);

      expect(andPredicates2.apply(12, 'abcd', false)).toBe(true);
      expect(andPredicates2.apply(18, '1234', false)).toBe(true);
    });

  });



  describe('apply', () => {

    it('when a Predicate3 is provided then the received input will be evaluated', () => {
      expect(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.apply(11, 'abcd', false)).toBe(false);
      expect(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.apply(2, 'ab', true)).toBe(false);
      expect(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.apply(12, 'abcd', false)).toBe(true);
    });

  });



  describe('not', () => {

    it('when a Predicate3 is provided then logical negation will be returned', () => {
      const notIsNumberEvenAndStringLongerThan3AndBooleanFalse = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicateNullable.not();

      expect(notIsNumberEvenAndStringLongerThan3AndBooleanFalse.apply(11, 'abcd', true)).toBe(true);
      expect(notIsNumberEvenAndStringLongerThan3AndBooleanFalse.apply(2, 'ab', true)).toBe(true);
      expect(notIsNumberEvenAndStringLongerThan3AndBooleanFalse.apply(12, 'abcd', false)).toBe(false);
    });

  });



  describe('or', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const orPredicates = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.or(undefined);

      expect(orPredicates.apply(11, 'abcd', true)).toBe(false);
      expect(orPredicates.apply(10, 'ab', false)).toBe(false);
      expect(orPredicates.apply(22, 'abcd', false)).toBe(true);
      expect(orPredicates.apply(18, 'abcde', false)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const orPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.or(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.or(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(orPredicates1.apply(22, 'abcd', false)).toBe(true);
      expect(orPredicates1.apply(11, 'abcd', false)).toBe(true);

      expect(orPredicates2.apply(22, 'abcd', false)).toBe(true);
      expect(orPredicates2.apply(11, 'abcd', false)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const orPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.or(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.or(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(orPredicates1.apply(21, 'ab', true)).toBe(false);
      expect(orPredicates1.apply(22, 'abc', false)).toBe(false);
      expect(orPredicates1.apply(24, 'ab', true)).toBe(false);

      expect(orPredicates2.apply(21, 'ab', true)).toBe(false);
      expect(orPredicates2.apply(22, 'abc', false)).toBe(false);
      expect(orPredicates2.apply(24, 'ab', true)).toBe(false);
    });


    it('when both Predicates return true then true is returned', () => {
      const orPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.or(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const orPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.or(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(orPredicates1.apply(12, 'abcd', false)).toBe(true);
      expect(orPredicates1.apply(16, '1234', false)).toBe(true);

      expect(orPredicates2.apply(12, 'abcd', false)).toBe(true);
      expect(orPredicates2.apply(16, '1234', false)).toBe(true);
    });

  });



  describe('xor', () => {

    it('when given Predicate is null or undefined then only this will be evaluated', () => {
      // @ts-ignore
      const xorPredicates = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.xor(undefined);

      expect(xorPredicates.apply(11, 'abcd', true)).toBe(false);
      expect(xorPredicates.apply(10, 'ab', false)).toBe(false);
      expect(xorPredicates.apply(22, 'abcd', false)).toBe(true);
      expect(xorPredicates.apply(18, 'abcde', false)).toBe(true);
    });


    it('when one of the Predicates to evaluate returns true then true is returned', () => {
      const xorPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.xor(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const xorPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.xor(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(xorPredicates1.apply(22, 'abcd', false)).toBe(true);
      expect(xorPredicates1.apply(11, 'abcd', false)).toBe(true);

      expect(xorPredicates2.apply(22, 'abcd', false)).toBe(true);
      expect(xorPredicates2.apply(11, 'abcd', false)).toBe(true);
    });


    it('when both Predicates return false then false is returned', () => {
      const xorPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.xor(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const xorPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.xor(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(xorPredicates1.apply(21, 'ab', true)).toBe(false);
      expect(xorPredicates1.apply(22, 'abc', false)).toBe(false);
      expect(xorPredicates1.apply(24, 'ab', true)).toBe(false);

      expect(xorPredicates2.apply(21, 'ab', true)).toBe(false);
      expect(xorPredicates2.apply(22, 'abc', false)).toBe(false);
      expect(xorPredicates2.apply(24, 'ab', true)).toBe(false);
    });


    it('when both Predicates return true then false is returned', () => {
      const xorPredicates1 = isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate.xor(isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate);
      const xorPredicates2 = isNumberLowerThan20AndStringSmallerThan5AndBooleanFalsePredicate.xor(isNumberEvenAndStringLongerThan3AndBooleanFalsePredicate);

      expect(xorPredicates1.apply(12, 'abcd', false)).toBe(false);
      expect(xorPredicates1.apply(16, '1234', false)).toBe(false);

      expect(xorPredicates2.apply(12, 'abcd', false)).toBe(false);
      expect(xorPredicates2.apply(16, '1234', false)).toBe(false);
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
