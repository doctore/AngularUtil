import { Either, Left, Right } from '@app-core/types/functional';
import { Nullable, NullableOrUndefined } from '@app-core/types';
import { FFunction0, FFunction1, Function0 } from '@app-core/types/function';
import { FBinaryOperator, BinaryOperator } from '@app-core/types/function/operator';
import { FPredicate1 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/functional/either.type.spec.ts
 */
describe('Either', () => {


  describe('right', () => {

    it('a new Right instance is returned', () => {
      expect(Either.right<number, NullableOrUndefined<string>>(undefined).isRight()).toBeTrue();
      expect(Either.right<number, NullableOrUndefined<string>>(undefined).get()).toBeUndefined();

      expect(Either.right<boolean, Nullable<number>>(null).isRight()).toBeTrue();
      expect(Either.right<boolean, Nullable<number>>(null).get()).toBeNull();

      expect(Either.right(12).isRight()).toBeTrue();
      expect(Either.right(12).get()).toEqual(12);
    });

  });



  describe('left', () => {

    it('a new Left instance is returned', () => {
      expect(Either.left<NullableOrUndefined<string>, number>(undefined).isRight()).toBeFalse();
      expect(Either.left<NullableOrUndefined<string>, number>(undefined).getLeft()).toBeUndefined();

      expect(Either.left<Nullable<number>, boolean>(null).isRight()).toBeFalse();
      expect(Either.left<Nullable<number>, boolean>(null).getLeft()).toBeNull();

      expect(Either.left('abc').isRight()).toBeFalse();
      expect(Either.left('abc').getLeft()).toEqual('abc');
    });

  });



  describe('ap', () => {

    it('when given Either is null or undefined then this Either is returned', () => {
      const sumNumbers: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const concatStrings: FBinaryOperator<string> =
        (s1: string, s2: string) => s1 + s2;

      const rightEither = Either.right(11);
      const leftEither = Either.left('abc');

      // @ts-ignore
      expect(rightEither.ap(null, concatStrings, sumNumbers)).toEqual(rightEither);
      // @ts-ignore
      expect(rightEither.ap(undefined, concatStrings, sumNumbers)).toEqual(rightEither);

      // @ts-ignore
      expect(leftEither.ap(null, concatStrings, sumNumbers)).toEqual(leftEither);
      // @ts-ignore
      expect(leftEither.ap(undefined, concatStrings, sumNumbers)).toEqual(leftEither);
    });


    it('when given Either and this one are Left then mapperLeft is invoked and mapperRight is not', () => {
      const sumNumbers: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const concatStrings: FBinaryOperator<string> =
        (s1: string, s2: string) => s1 + s2;

      const sumNumbersSpy = jasmine.createSpy('sumNumbers', sumNumbers);
      const concatStringsSpy = jasmine.createSpy('concatStrings', concatStrings);

      const e1: Either<string, number> = Either.left('abc');
      const e2: Either<string, number> = Either.left('xyz');

      e1.ap(e2, concatStringsSpy, sumNumbersSpy);

      expect(sumNumbersSpy.calls.count()).toBe(0);
      expect(concatStringsSpy.calls.count()).toBe(1);
    });


    it('when given Either and this one are Right then mapperRight is invoked and mapperLeft is not', () => {
      const sumNumbers: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const concatStrings: FBinaryOperator<string> =
        (s1: string, s2: string) => s1 + s2;

      const sumNumbersSpy = jasmine.createSpy('sumNumbers', sumNumbers);
      const concatStringsSpy = jasmine.createSpy('concatStrings', concatStrings);

      const e1: Either<string, number> = Either.right(11);
      const e2: Either<string, number> = Either.right(19);

      e1.ap(e2, concatStringsSpy, sumNumbersSpy);

      expect(sumNumbersSpy.calls.count()).toBe(1);
      expect(concatStringsSpy.calls.count()).toBe(0);
    });


    it('when one of the Either is Left then Left is returned', () => {
      const leftValue = 'abc';

      const sumNumbers: BinaryOperator<number> =
        BinaryOperator.of((n1: number, n2: number) => n1 + n2);

      const concatStrings: BinaryOperator<string> =
        BinaryOperator.of((s1: string, s2: string) => s1 + s2);

      const rightEither = Either.right<string, number>(11);
      const leftEither = Either.left<string, number>(leftValue);

      const rightApLeftResult = rightEither.ap(leftEither, concatStrings, sumNumbers);
      const leftApRightResult = leftEither.ap(rightEither, concatStrings, sumNumbers);

      expect(rightApLeftResult.isRight()).toBeFalse();
      expect(rightApLeftResult.getLeft()).toEqual(leftValue);

      expect(leftApRightResult.isRight()).toBeFalse();
      expect(leftApRightResult.getLeft()).toEqual(leftValue);
    });


    it('when given Either and this one are Left but mapperLeft is null or undefined then IllegalArgumentError is thrown', () => {
      const sumNumbers: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const e1: Either<string, number> = Either.left('abc');
      const e2: Either<string, number> = Either.left('xyz');

      // @ts-ignore
      expect(() => e1.ap(e2, null, sumNumbers)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => e2.ap(e1, undefined, sumNumbers)).toThrowError(IllegalArgumentError);
    });


    it('when given Either and this one are Left then mapperLeft result is returned', () => {
      const sumNumbers = (n1: number, n2: number) => n1 + n2;
      const concatStrings = (s1: string, s2: string) => s1 + s2;

      const e1: Either<string, number> = Either.left('abc');
      const e2: Either<string, number> = Either.left('xyz');

      const e1Ape2 = e1.ap(e2, concatStrings, sumNumbers);
      const e2Ape1 = e2.ap(e1, concatStrings, sumNumbers);

      expect(e1Ape2.isRight()).toBeFalse();
      expect(e1Ape2.getLeft()).toEqual('abcxyz');

      expect(e2Ape1.isRight()).toBeFalse();
      expect(e2Ape1.getLeft()).toEqual('xyzabc');
    });


    it('when given Either and this one are Right but mapperRight is null or undefined then IllegalArgumentError is thrown', () => {
      const concatStrings: FBinaryOperator<string> =
        (s1: string, s2: string) => s1 + s2;

      const e1: Either<string, number> = Either.right(11);
      const e2: Either<string, number> = Either.right(19);

      // @ts-ignore
      expect(() => e1.ap(e2, concatStrings, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => e2.ap(e1, concatStrings, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Either and this one are Right then mapperRight result is returned', () => {
      const sumNumbers = (n1: number, n2: number) => n1 + n2;
      const concatStrings = (s1: string, s2: string) => s1 + s2;

      const e1: Either<string, number> = Either.right(11);
      const e2: Either<string, number> = Either.right(19);

      const e1Ape2 = e1.ap(e2, concatStrings, sumNumbers);
      const e2Ape1 = e2.ap(e1, concatStrings, sumNumbers);

      expect(e1Ape2.isRight()).toBeTrue();
      expect(e1Ape2.get()).toEqual(30);

      expect(e2Ape1.isRight()).toBeTrue();
      expect(e2Ape1.get()).toEqual(30);
    });

  });



  describe('filterOrElse', () => {

    it('when the Either instance is a Left one then such instance is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: number) => 1 == n % 2;

      const errorMessage: FFunction0<string> =
        () => 'There was an error';

      const e1 = Either.left<string, number>('abc');
      const e2 = Either.left<string, number>('xyz');

      const e1Result = e1.filterOrElse(isOdd, errorMessage);
      const e2Result = e2.filterOrElse(isOdd, errorMessage);

      expect(e1Result.isRight()).toBeFalse();
      expect(e1Result.getLeft()).toEqual(e1.getLeft());

      expect(e2Result.isRight()).toBeFalse();
      expect(e2Result.getLeft()).toEqual(e2.getLeft());
    });


    it('when the Either instance is a Right one but predicate is null or undefined then such instance is returned', () => {
      const errorMessage: Function0<string> =
        Function0.of(() => 'There was an error');

      const e1 = Either.right(11);
      const e2 = Either.right(19);

      // @ts-ignore
      const e1Result = e1.filterOrElse(null, errorMessage);
      // @ts-ignore
      const e2Result = e2.filterOrElse(undefined, errorMessage);

      expect(e1Result.isRight()).toBeTrue();
      expect(e1Result.get()).toEqual(e1.get());

      expect(e2Result.isRight()).toBeTrue();
      expect(e2Result.get()).toEqual(e2.get());
    });


    it('when the Either instance is a Right one and matches provided predicate then such instance is returned', () => {
      const isOdd = (n: number) => 1 == n % 2;
      const errorMessage = () => 'There was an error';

      const e1 = Either.right(11);
      const e2 = Either.right(19);

      const e1Result = e1.filterOrElse(isOdd, errorMessage);
      const e2Result = e2.filterOrElse(isOdd, errorMessage);

      expect(e1Result.isRight()).toBeTrue();
      expect(e1Result.get()).toEqual(e1.get());

      expect(e2Result.isRight()).toBeTrue();
      expect(e2Result.get()).toEqual(e2.get());
    });


    it('when the Either instance is a Right one that does not match provided predicate but zero is null or undefined then an error is thrown', () => {
      const isOdd = (n: number) => 1 == n % 2;

      const e1 = Either.right(12);
      const e2 = Either.right(20);

      // @ts-ignore
      expect(() => e1.filterOrElse(isOdd, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => e2.filterOrElse(isOdd, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Either instance is a Right one that does not match provided predicate and zero is valid then new Left instance applying zero is returned', () => {
      const errorMessage = 'There was an error';
      const isOdd = (n: number) => 1 == n % 2;

      const either = Either.right(12);

      const eitherResult = either.filterOrElse(isOdd, () => errorMessage);

      expect(eitherResult.isRight()).toBeFalse();
      expect(eitherResult.getLeft()).toEqual(errorMessage);
    });

  });



  describe('flatMap', () => {

    it('when the Either instance is Right but mapper is null or undefined then an error is thrown', () => {
      const either = Either.right(11);

      // @ts-ignore
      expect(() => either.flatMap(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => either.flatMap(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Either instance is Left then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number, Either<boolean, string>> =
        (n: number) => Either.right<boolean, string>('' + n);

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const either = Either.left<boolean, number>(false);

      either.flatMap(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
    });


    it('when the Either instance is Right then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, Either<boolean, string>> =
        (n: number) => Either.right<boolean, string>('' + n);

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const either = Either.right<boolean, number>(19);

      either.flatMap(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
    });


    it('when the Either instance is Left then same one is returned', () => {
      const fromNumToString = (n: number) => Either.right<boolean, string>('' + n);
      const either = Either.left<boolean, number>(false);

      const result = either.flatMap(fromNumToString);

      expect(result.isRight()).toBeFalse();
      expect(result.getLeft()).toEqual(either.getLeft());
    });


    it('when the Either instance is Right then new Right applying mapper is returned', () => {
      const fromNumToString = (n: number) => Either.right<boolean, string>('' + n);
      const either = Either.right<boolean, number>(11);

      const result: Either<boolean, string> = either.flatMap(fromNumToString);

      expect(result.isRight()).toBeTrue();
      expect(result.get()).toEqual('11');
    });

  });



  describe('isEmpty', () => {

    it('when the Either instance is an empty Right one then true is returned', () => {
      expect(Right.of(null).isEmpty()).toBeTrue();
      expect(Right.of(undefined).isEmpty()).toBeTrue();

      expect(Right.of<number, NullableOrUndefined<string>>(undefined).isEmpty()).toBeTrue();
      expect(Right.of<boolean, Nullable<number>>(null).isEmpty()).toBeTrue();
    });


    it('when the Either instance is a non empty Right one then false is returned', () => {
      expect(Right.of(12).isEmpty()).toBeFalse();
      expect(Right.of('abc').isEmpty()).toBeFalse();
    });


    it('when the Either instance is a Left one then false is returned', () => {
      expect(Left.of('abc').isEmpty()).toBeTrue();
      expect(Left.of(19).isEmpty()).toBeTrue();
    });

  });



  describe('map', () => {

    it('when the Either instance is Right but mapper is null or undefined then an error is thrown', () => {
      const either = Either.right(11);

      // @ts-ignore
      expect(() => either.map(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => either.map(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Either instance is Left then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const either = Either.left<boolean, number>(false);

      either.map(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
    });


    it('when the Either instance is Right then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const either = Either.right<boolean, number>(19);

      either.map(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
    });


    it('when the Either instance is Left then same one is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const either = Either.left<string, number>('abc');

      const result = either.map(fromNumToString);

      expect(result.isRight()).toBeFalse();
      expect(result.getLeft()).toEqual(either.getLeft());
    });


    it('when the Either instance is Right then new Right applying mapper is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const either = Either.right<string, number>(11);

      const result = either.map(fromNumToString);

      expect(result.isRight()).toBeTrue();
      expect(result.get()).toEqual('11');
    });

  });



  describe('mapLeft', () => {

    it('when the Either instance is Left but mapper is null or undefined then an error is thrown', () => {
      const either = Either.left(11);

      // @ts-ignore
      expect(() => either.mapLeft(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => either.mapLeft(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Either instance is Right then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const either = Either.right<number, boolean>(false);

      either.mapLeft(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
    });


    it('when the Either instance is Left then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const either = Either.left<number, boolean>(11);

      either.mapLeft(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
    });


    it('when the Either instance is Right then same one is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const either = Either.right<number, boolean>(false);

      const result = either.mapLeft(fromNumToString);

      expect(result.isRight()).toBeTrue();
      expect(result.get()).toEqual(either.get());
    });


    it('when the Either instance is Left then new Left applying mapper is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const either = Either.left<number, boolean>(11);

      const result = either.mapLeft(fromNumToString);

      expect(result.isRight()).toBeFalse();
      expect(result.getLeft()).toEqual('11');
    });

  });



  describe('toOptional', () => {

    it('when the Either instance is an empty Right one then empty Optional is returned', () => {
      expect(Either.right(null).toOptional().isPresent()).toBeFalse();
      expect(Either.right(undefined).toOptional().isPresent()).toBeFalse();
    });


    it('when the Either instance is a non empty Right one then non empty Optional is returned', () => {
      const o1 = Either.right(11).toOptional();
      const o2 = Either.right('abc').toOptional();

      expect(o1.isPresent()).toBeTrue();
      expect(o1.get()).toEqual(11);

      expect(o2.isPresent()).toBeTrue();
      expect(o2.get()).toEqual('abc');
    });


    it('when the Either instance is a Left one then empty Optional is returned', () => {
      expect(Either.left(null).toOptional().isPresent()).toBeFalse();
      expect(Either.left(undefined).toOptional().isPresent()).toBeFalse();

      expect(Either.left(12).toOptional().isPresent()).toBeFalse();
      expect(Either.left('abc').toOptional().isPresent()).toBeFalse();
    });

  });

});




describe('Right', () => {


  describe('of', () => {

    it('when a value is given then it will be stored internally', () => {
      const intValue = 11;

      expect(Right.of<boolean, NullableOrUndefined<string>>(undefined).isRight()).toBeTrue();
      expect(Right.of<boolean, NullableOrUndefined<string>>(undefined).get()).toBeUndefined();

      expect(Right.of<string, Nullable<number>>(null).isRight()).toBeTrue();
      expect(Right.of<string, Nullable<number>>(null).get()).toBeNull();

      expect(Right.of(intValue).isRight()).toBeTrue();
      expect(Right.of(intValue).get()).toEqual(intValue);
    });

  });



  describe('isRight', () => {

    it('then true is returned', () => {
      expect(Right.of('abc').isRight()).toBeTrue();
      expect(Right.of(12).isRight()).toBeTrue();
    });

  });



  describe('get', () => {

    it('then internal value is returned', () => {
      expect(Right.of<boolean, NullableOrUndefined<string>>(undefined).get()).toBeUndefined();
      expect(Right.of<string, Nullable<number>>(null).get()).toBeNull();
      expect(Right.of(12).get()).toEqual(12);
    });

  });



  describe('getLeft', () => {

    it('then ReferenceError is returned', () => {
      expect(() => Right.of<boolean, NullableOrUndefined<string>>(undefined).getLeft()).toThrowError(ReferenceError);
      expect(() => Right.of<string, Nullable<number>>(null).getLeft()).toThrowError(ReferenceError);
      expect(() => Right.of(12).getLeft()).toThrowError(ReferenceError);
    });

  });


});




describe('Left', () => {


  describe('of', () => {

    it('when a value is given then it will be stored internally', () => {
      const intValue = 11;

      expect(Left.of<NullableOrUndefined<string>, boolean>(undefined).isRight()).toBeFalse();
      expect(Left.of<NullableOrUndefined<string>, boolean>(undefined).getLeft()).toBeUndefined();

      expect(Left.of<Nullable<number>, string>(null).isRight()).toBeFalse();
      expect(Left.of<Nullable<number>, string>(null).getLeft()).toBeNull();

      expect(Left.of(intValue).isRight()).toBeFalse();
      expect(Left.of(intValue).getLeft()).toEqual(intValue);
    });

  });



  describe('isRight', () => {

    it('then false is returned', () => {
      expect(Left.of('abc').isRight()).toBeFalse();
      expect(Left.of(12).isRight()).toBeFalse();
    });

  });



  describe('get', () => {

    it('then internal value is returned', () => {
      expect(() => Left.of<NullableOrUndefined<string>, boolean>(undefined).get()).toThrowError(ReferenceError);
      expect(() => Left.of<Nullable<number>, string>(null).get()).toThrowError(ReferenceError);
      expect(() => Left.of(12).get()).toThrowError(ReferenceError);
    });

  });



  describe('getLeft', () => {

    it('then ReferenceError is returned', () => {
      expect(Left.of<NullableOrUndefined<string>, boolean>(undefined).getLeft()).toBeUndefined();
      expect(Left.of<Nullable<number>, string>(null).getLeft()).toBeNull();
      expect(Left.of(12).getLeft()).toEqual(12);
    });

  });

});
