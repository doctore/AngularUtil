import { Either, Left, Right } from '@app-core/type/functional';
import { Nullable, NullableOrUndefined } from '@app-core/type';
import {
  FFunction0,
  FFunction1,
  FFunction2,
  Function0,
  Function1,
  Function2,
  TFunction0
} from '@app-core/type/function';
import { FBinaryOperator, BinaryOperator } from '@app-core/type/function/operator';
import { FPredicate1 } from '@app-core/type/predicate';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/functional/either.type.spec.ts
 */
describe('Either', () => {


  describe('right', () => {

    it('a new Right instance is returned', () => {
      expect(Either.right<number, NullableOrUndefined<string>>(undefined).isRight()).toBe(true);
      expect(Either.right<number, NullableOrUndefined<string>>(undefined).get()).toBe(undefined);

      expect(Either.right<boolean, Nullable<number>>(null).isRight()).toBe(true);
      expect(Either.right<boolean, Nullable<number>>(null).get()).toBeNull();

      expect(Either.right(12).isRight()).toBe(true);
      expect(Either.right(12).get()).toEqual(12);
    });

  });



  describe('left', () => {

    it('a new Left instance is returned', () => {
      expect(Either.left<NullableOrUndefined<string>, number>(undefined).isRight()).toBe(false);
      expect(Either.left<NullableOrUndefined<string>, number>(undefined).getLeft()).toBe(undefined);

      expect(Either.left<Nullable<number>, boolean>(null).isRight()).toBe(false);
      expect(Either.left<Nullable<number>, boolean>(null).getLeft()).toBeNull();

      expect(Either.left('abc').isRight()).toBe(false);
      expect(Either.left('abc').getLeft()).toEqual('abc');
    });

  });



  describe('combine', () => {

    it('when given eithers are null, undefined or empty then a Right with null value is returned', () => {
      const mapperLeft = (s1: string, s2: string) => s1;
      const mapperRight: FFunction2<number, number, number> = (n1: number, n2: number) => n2;

      expect(Either.combine(mapperLeft, mapperRight, null).isRight()).toBe(true);
      expect(Either.combine(mapperLeft, mapperRight, null).get()).toBeNull();

      expect(Either.combine(mapperLeft, mapperRight, undefined).isRight()).toBe(true);
      expect(Either.combine(mapperLeft, mapperRight, undefined).get()).toBeNull();

      expect(Either.combine(mapperLeft, mapperRight, []).isRight()).toBe(true);
      expect(Either.combine(mapperLeft, mapperRight, []).get()).toBeNull();
    });


    it('when given eithers is not empty but mapperLeft is null or undefined then an error is thrown', () => {
      const eithers = [Either.right(12)];
      const mapperRight: Function2<number, number, number> =
        Function2.of((n1: number, n2: number) => n2);

      // @ts-ignore
      expect(() => Either.combine(null, mapperRight, eithers)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => Either.combine(undefined, mapperRight, eithers)).toThrowError(IllegalArgumentError);
    });


    it('when given eithers is not empty but mapperRight is null or undefined then an error is thrown', () => {
      const eithers = [Either.right(12)];
      const mapperLeft: Function2<string, string, string> =
        Function2.of((s1: string, s2: string) => s1);

      // @ts-ignore
      expect(() => Either.combine(mapperLeft, null, eithers)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => Either.combine(mapperLeft, undefined, eithers)).toThrowError(IllegalArgumentError);
    });


    it('when all eithers are Right then a Right applying mapperRight is returned', () => {
      const eithers: Either<string, number>[] = [
        Either.right(12),
        Either.right(11),
        Either.right(10)
      ];
      const mapperLeft: BinaryOperator<string> =
        BinaryOperator.of((s1: string, s2: string) => s1);
      const mapperRight: FBinaryOperator<number> = (n1: number, n2: number) => n2;

      expect(Either.combine(mapperLeft, mapperRight, eithers).isRight()).toBe(true);
      expect(Either.combine(mapperLeft, mapperRight, eithers).get()).toEqual(10);
    });


    it('when eithers contains Left then a Left applying mapperLeft is returned', () => {
      const eithers: Either<string, number>[] = [
        Either.right(12),
        Either.right(11),
        Either.left('A'),
        Either.left('B')
      ];
      const mapperLeft = (s1: string, s2: string) => s1;
      const mapperRight = (n1: number, n2: number) => n2;

      expect(Either.combine(mapperLeft, mapperRight, eithers).isRight()).toBe(false);
      expect(Either.combine(mapperLeft, mapperRight, eithers).getLeft()).toEqual('A');
    });

  });



  describe('combineGetFirstLeft', () => {

    it('when given eithers are null, undefined or empty then a Right with null value is returned', () => {
      const mapperRight: FBinaryOperator<number> = (n1: number, n2: number) => n2;

      expect(Either.combineGetFirstLeft(mapperRight, null).isRight()).toBe(true);
      expect(Either.combineGetFirstLeft(mapperRight, null).get()).toBeNull();

      expect(Either.combineGetFirstLeft(mapperRight, undefined).isRight()).toBe(true);
      expect(Either.combineGetFirstLeft(mapperRight, undefined).get()).toBeNull();

      expect(Either.combineGetFirstLeft(mapperRight, []).isRight()).toBe(true);
      expect(Either.combineGetFirstLeft(mapperRight, []).get()).toBeNull();
    });


    it('when given eithers is not empty but mapperRight is null or undefined then an error is thrown', () => {
      const eithers = [() => Either.right(12)];

      // @ts-ignore
      expect(() => Either.combineGetFirstLeft(null, eithers)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => Either.combineGetFirstLeft(undefined, eithers)).toThrowError(IllegalArgumentError);
    });


    it('when all eithers are Right then a Right applying mapperRight is returned', () => {
      const eithers = [
        () => Either.right(12),
        () => Either.right(11),
        () => Either.right(10)
      ];
      const mapperRight: FBinaryOperator<number> = (n1: number, n2: number) => n2;

      expect(Either.combineGetFirstLeft(mapperRight, eithers).isRight()).toBe(true);
      expect(Either.combineGetFirstLeft(mapperRight, eithers).get()).toEqual(10);
    });


    it('when eithers contains Left then the first one is returned', () => {
      const eithers: TFunction0<Either<string, number>>[] = [
        () => Either.right(12),
        () => Either.right(11),
        () => Either.left('A'),
        () => Either.left('B')
      ];
      const mapperRight = (n1: number, n2: number) => n2;

      expect(Either.combineGetFirstLeft(mapperRight, eithers).isRight()).toBe(false);
      expect(Either.combineGetFirstLeft(mapperRight, eithers).getLeft()).toEqual('A');
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
      expect(rightEither.ap(null, concatStrings, sumNumbers).isRight()).toBe(true);
      // @ts-ignore
      expect(rightEither.ap(null, concatStrings, sumNumbers)).toEqual(rightEither);

      // @ts-ignore
      expect(leftEither.ap(undefined, concatStrings, sumNumbers).isRight()).toBe(false);
      // @ts-ignore
      expect(leftEither.ap(undefined, concatStrings, sumNumbers)).toEqual(leftEither);
    });


    it('when given Either and this one are Left then mapperLeft is invoked and mapperRight is not', () => {
      const sumNumbers: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const concatStrings: FBinaryOperator<string> =
        (s1: string, s2: string) => s1 + s2;

      const sumNumbersSpy = vi.fn(sumNumbers);
      const concatStringsSpy = vi.fn(concatStrings);

      const e1: Either<string, number> = Either.left('abc');
      const e2: Either<string, number> = Either.left('xyz');

      e1.ap(e2, concatStringsSpy, sumNumbersSpy);

      expect(sumNumbersSpy).toBeCalledTimes(0);
      expect(concatStringsSpy).toBeCalledTimes(1);
    });


    it('when given Either and this one are Right then mapperRight is invoked and mapperLeft is not', () => {
      const sumNumbers: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const concatStrings: FBinaryOperator<string> =
        (s1: string, s2: string) => s1 + s2;

      const sumNumbersSpy = vi.fn(sumNumbers);
      const concatStringsSpy = vi.fn(concatStrings);

      const e1: Either<string, number> = Either.right(11);
      const e2: Either<string, number> = Either.right(19);

      e1.ap(e2, concatStringsSpy, sumNumbersSpy);

      expect(sumNumbersSpy).toBeCalledTimes(1);
      expect(concatStringsSpy).toBeCalledTimes(0);
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

      expect(rightApLeftResult.isRight()).toBe(false);
      expect(rightApLeftResult.getLeft()).toEqual(leftValue);

      expect(leftApRightResult.isRight()).toBe(false);
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

      expect(e1Ape2.isRight()).toBe(false);
      expect(e1Ape2.getLeft()).toEqual('abcxyz');

      expect(e2Ape1.isRight()).toBe(false);
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

      expect(e1Ape2.isRight()).toBe(true);
      expect(e1Ape2.get()).toEqual(30);

      expect(e2Ape1.isRight()).toBe(true);
      expect(e2Ape1.get()).toEqual(30);
    });

  });



  describe('contain', () => {

    it('when given Either is a Left one then false is returned', () => {
      expect(Either.left<string, number>('abc').contain(21)).toBe(false);
      expect(Either.left<number, boolean>(11).contain(false)).toBe(false);
    });


    it('when given Either is a Right one but it does not contain provided value then false is returned', () => {
      expect(Either.right<string, number>(11).contain(21)).toBe(false);
      expect(Either.right<number, boolean>(true).contain(false)).toBe(false);
      expect(Either.right<boolean, Nullable<string>>(null).contain('as')).toBe(false);
      expect(Either.right<boolean, NullableOrUndefined<number>>(12).contain(undefined)).toBe(false);
    });


    it('when given Either is a Right one and matches with provided value then true is returned', () => {
      expect(Either.right<string, number>(11).contain(11)).toBe(true);
      expect(Either.right<number, boolean>(true).contain(true)).toBe(true);
      expect(Either.right<boolean, Nullable<string>>(null).contain(null)).toBe(true);
      expect(Either.right<boolean, NullableOrUndefined<number>>(undefined).contain(undefined)).toBe(true);
    });

  });



  describe('filter', () => {

    it('when given Either is a Left one then such instance is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: number) => 1 == n % 2;

      const e1 = Either.left<string, number>('abc');
      const e2 = Either.left<string, number>('xyz');

      const e1Result = e1.filter(isOdd);
      const e2Result = e2.filter(isOdd);

      expect(e1Result).toBeDefined();
      expect(e1Result!.isRight()).toBe(false);
      expect(e1Result!.getLeft()).toEqual(e1.getLeft());

      expect(e2Result).toBeDefined();
      expect(e2Result!.isRight()).toBe(false);
      expect(e2Result!.getLeft()).toEqual(e2.getLeft());
    });


    it('when given Either is a Right one but predicate is null or undefined then such instance is returned', () => {
      const e1 = Either.right(11);
      const e2 = Either.right(19);

      // @ts-ignore
      const e1Result = e1.filter(null);
      // @ts-ignore
      const e2Result = e2.filter(undefined);

      expect(e1Result).toBeDefined();
      expect(e1Result!.isRight()).toBe(true);
      expect(e1Result!.get()).toEqual(e1.get());

      expect(e2Result).toBeDefined();
      expect(e2Result!.isRight()).toBe(true);
      expect(e2Result!.get()).toEqual(e2.get());
    });


    it('when given Either is a Right one but does not match with provided predicate then undefined is returned', () => {
      const isEven = (n: number) => 0 == n % 2;

      const e1 = Either.right(11);
      const e2 = Either.right(19);

      expect(e1.filter(isEven)).toBe(undefined);
      expect(e2.filter(isEven)).toBe(undefined);
    });


    it('when given Either is a Right one and matches with provided predicate then such instance is returned', () => {
      const isOdd = (n: number) => 1 == n % 2;

      const e1 = Either.right(11);
      const e2 = Either.right(19);

      const e1Result = e1.filter(isOdd);
      const e2Result = e2.filter(isOdd);

      expect(e1Result).toBeDefined();
      expect(e1Result!.isRight()).toBe(true);
      expect(e1Result!.get()).toEqual(e1.get());

      expect(e2Result).toBeDefined();
      expect(e2Result!.isRight()).toBe(true);
      expect(e2Result!.get()).toEqual(e2.get());
    });

  });



  describe('filterOptional', () => {

    it('when given Either is a Left one then not empty Optional containing such instance is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: number) => 1 == n % 2;

      const e1 = Either.left<string, number>('abc');
      const e2 = Either.left<string, number>('xyz');

      const e1Result = e1.filterOptional(isOdd);
      const e2Result = e2.filterOptional(isOdd);

      expect(e1Result.isPresent()).toBe(true);
      expect(e1Result.get().isRight()).toBe(false);
      expect(e1Result.get().getLeft()).toEqual(e1.getLeft());

      expect(e2Result.isPresent()).toBe(true);
      expect(e2Result.get().isRight()).toBe(false);
      expect(e2Result.get().getLeft()).toEqual(e2.getLeft());
    });


    it('when given Either is a Right one but predicate is null or undefined then not empty Optional containing such instance is returned', () => {
      const e1 = Either.right(11);
      const e2 = Either.right(19);

      // @ts-ignore
      const e1Result = e1.filterOptional(null);
      // @ts-ignore
      const e2Result = e2.filterOptional(undefined);

      expect(e1Result.isPresent()).toBe(true);
      expect(e1Result.get().isRight()).toBe(true);
      expect(e1Result.get().get()).toEqual(e1.get());

      expect(e2Result.isPresent()).toBe(true);
      expect(e2Result.get().isRight()).toBe(true);
      expect(e2Result.get().get()).toEqual(e2.get());
    });


    it('when given Either is a Right one but does not match with provided predicate then empty Optional is returned', () => {
      const isEven = (n: number) => 0 == n % 2;

      const e1 = Either.right(11);
      const e2 = Either.right(19);

      const e1Result = e1.filterOptional(isEven);
      const e2Result = e2.filterOptional(isEven);

      expect(e1Result.isPresent()).toBe(false);
      expect(e2Result.isPresent()).toBe(false);
    });


    it('when given Either is a Right one and matches with provided predicate then such instance is returned', () => {
      const isOdd = (n: number) => 1 == n % 2;

      const e1 = Either.right(11);
      const e2 = Either.right(19);

      const e1Result = e1.filterOptional(isOdd);
      const e2Result = e2.filterOptional(isOdd);

      expect(e1Result.isPresent()).toBe(true);
      expect(e1Result.get().isRight()).toBe(true);
      expect(e1Result.get().get()).toEqual(e1.get());

      expect(e2Result.isPresent()).toBe(true);
      expect(e2Result.get().isRight()).toBe(true);
      expect(e2Result.get().get()).toEqual(e2.get());
    });

  });



  describe('filterOrElse', () => {

    it('when given Either is a Left one then such instance is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: number) => 1 == n % 2;

      const errorMessage: FFunction0<string> =
        () => 'There was an error';

      const e1 = Either.left<string, number>('abc');
      const e2 = Either.left<string, number>('xyz');

      const e1Result = e1.filterOrElse(isOdd, errorMessage);
      const e2Result = e2.filterOrElse(isOdd, errorMessage);

      expect(e1Result.isRight()).toBe(false);
      expect(e1Result.getLeft()).toEqual(e1.getLeft());

      expect(e2Result.isRight()).toBe(false);
      expect(e2Result.getLeft()).toEqual(e2.getLeft());
    });


    it('when given Either is a Right one but predicate is null or undefined then such instance is returned', () => {
      const errorMessage: Function0<string> =
        Function0.of(() => 'There was an error');

      const e1 = Either.right(11);
      const e2 = Either.right(19);

      // @ts-ignore
      const e1Result = e1.filterOrElse(null, errorMessage);
      // @ts-ignore
      const e2Result = e2.filterOrElse(undefined, errorMessage);

      expect(e1Result.isRight()).toBe(true);
      expect(e1Result.get()).toEqual(e1.get());

      expect(e2Result.isRight()).toBe(true);
      expect(e2Result.get()).toEqual(e2.get());
    });


    it('when given Either is a Right one and matches with provided predicate then such instance is returned', () => {
      const isOdd = (n: number) => 1 == n % 2;
      const errorMessage = () => 'There was an error';

      const e1 = Either.right(11);
      const e2 = Either.right(19);

      const e1Result = e1.filterOrElse(isOdd, errorMessage);
      const e2Result = e2.filterOrElse(isOdd, errorMessage);

      expect(e1Result.isRight()).toBe(true);
      expect(e1Result.get()).toEqual(e1.get());

      expect(e2Result.isRight()).toBe(true);
      expect(e2Result.get()).toEqual(e2.get());
    });


    it('when given Either is a Right one that does not match with provided predicate but zero is null or undefined then an error is thrown', () => {
      const isOdd = (n: number) => 1 == n % 2;

      const e1 = Either.right(12);
      const e2 = Either.right(20);

      // @ts-ignore
      expect(() => e1.filterOrElse(isOdd, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => e2.filterOrElse(isOdd, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Either is a Right one that does not match with provided predicate and zero is valid then new Left instance applying zero is returned', () => {
      const isOdd = (n: number) => 1 == n % 2;
      const errorMessage = 'There was an error';

      const either = Either.right(12);

      const eitherResult = either.filterOrElse(isOdd, () => errorMessage);

      expect(eitherResult.isRight()).toBe(false);
      expect(eitherResult.getLeft()).toEqual(errorMessage);
    });

  });



  describe('flatMap', () => {

    it('when given Either is Right but mapper is null or undefined then an error is thrown', () => {
      const either = Either.right(11);

      // @ts-ignore
      expect(() => either.flatMap(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => either.flatMap(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Either is Left then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number, Either<boolean, string>> =
        (n: number) => Either.right<boolean, string>('' + n);

      const fromNumToStringSpy = vi.fn(fromNumToString);

      const either = Either.left<boolean, number>(false);

      either.flatMap(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(0);
    });


    it('when given Either is Right then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, Either<boolean, string>> =
        (n: number) => Either.right<boolean, string>('' + n);

      const fromNumToStringSpy = vi.fn(fromNumToString);

      const either = Either.right<boolean, number>(19);

      either.flatMap(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(1);
    });


    it('when given Either is Left then same one is returned', () => {
      const fromNumToString = (n: number) => Either.right<boolean, string>('' + n);
      const either = Either.left<boolean, number>(false);

      const result = either.flatMap(fromNumToString);

      expect(result.isRight()).toBe(false);
      expect(result.getLeft()).toEqual(either.getLeft());
    });


    it('when given Either is Right then new Right applying mapper is returned', () => {
      const fromNumToString = (n: number) => Either.right<boolean, string>('' + n);
      const either = Either.right<boolean, number>(11);

      const result = either.flatMap(fromNumToString);

      expect(result.isRight()).toBe(true);
      expect(result.get()).toEqual('11');
    });

  });



  describe('fold', () => {

    it('when given Either is Left but mapperLeft is null or undefined then an error is thrown', () => {
      const sameNumber: FFunction1<number, number> =
        Function1.identity<number>().getMapper();

      const either = Either.left<string, number>('abc');

      // @ts-ignore
      expect(() => either.fold(null, sameNumber)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => either.fold(undefined, sameNumber)).toThrowError(IllegalArgumentError);
    });


    it('when given Either is Right but mapperRight is null or undefined then an error is thrown', () => {
      const stringLength: FFunction1<string, number> =
        (s: string) => s.length;

      const either = Either.right(11);

      // @ts-ignore
      expect(() => either.fold(stringLength, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => either.fold(stringLength, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Either is Left then mapperLeft is invoked and mapperRight is not', () => {
      const stringLength: FFunction1<string, number> =
        (s: string) => s.length;

      const sameNumber: FFunction1<number, number> =
        Function1.identity<number>().getMapper();

      const stringLengthSpy = vi.fn(stringLength);
      const sameNumberSpy = vi.fn(sameNumber);

      Either.left<string, number>('abc').fold(stringLengthSpy, sameNumberSpy);

      expect(stringLengthSpy).toBeCalledTimes(1);
      expect(sameNumberSpy).toBeCalledTimes(0);
    });


    it('when given Either is Right then mapperRight is invoked and mapperLeft is not', () => {
      const stringLength: FFunction1<string, number> =
        (s: string) => s.length;

      const sameNumber: FFunction1<number, number> =
        Function1.identity<number>().getMapper();

      const stringLengthSpy = vi.fn(stringLength);
      const sameNumberSpy = vi.fn(sameNumber);

      Either.right<string, number>(11).fold(stringLengthSpy, sameNumberSpy);

      expect(stringLengthSpy).toBeCalledTimes(0);
      expect(sameNumberSpy).toBeCalledTimes(1);
    });


    it('when given Either is Left then mapperLeft result is returned', () => {
      const stringLength: Function1<string, number> =
        Function1.of((s: string) => s.length);

      const sameNumber: Function1<number, number> =
        Function1.identity<number>();

      const result = Either.left<string, number>('abc').fold(stringLength, sameNumber);

      expect(result).toEqual(3);
    });


    it('when given Either is Right then mapperRight result is returned', () => {
      const stringLength = (s: string) => s.length;
      const sameNumber = (n: number) => n;

      const result = Either.right<string, number>(11).fold(stringLength, sameNumber);

      expect(result).toEqual(11);
    });

  });



  describe('isEmpty', () => {

    it('when given Either is an empty Right one then true is returned', () => {
      expect(Either.right(null).isEmpty()).toBe(true);
      expect(Either.right(undefined).isEmpty()).toBe(true);

      expect(Either.right<number, NullableOrUndefined<string>>(undefined).isEmpty()).toBe(true);
      expect(Either.right<boolean, Nullable<number>>(null).isEmpty()).toBe(true);
    });


    it('when given Either is a non-empty Right one then false is returned', () => {
      expect(Either.right(12).isEmpty()).toBe(false);
      expect(Either.right('abc').isEmpty()).toBe(false);
    });


    it('when given Either is a Left one then true is returned', () => {
      expect(Either.left('abc').isEmpty()).toBe(true);
      expect(Either.left(19).isEmpty()).toBe(true);
    });

  });



  describe('getOrElse', () => {

    it('when given Either is a Right one then the content of Right is returned', () => {
      expect(Either.right<number, NullableOrUndefined<string>>(undefined).getOrElse('11')).toBe(undefined);
      expect(Either.right<number, Nullable<string>>(null).getOrElse('20')).toBeNull();
      expect(Either.right<number, string>('19').getOrElse('20')).toEqual('19');
    });


    it('when given Either is a Left one and provided other is a value then other is returned', () => {
      const either = Either.left<number, NullableOrUndefined<string>>(19);

      expect(either.getOrElse(undefined)).toBe(undefined);
      expect(either.getOrElse(null)).toBeNull();
      expect(either.getOrElse('12')).toEqual('12');
    });


    it('when the Either instance is a Left one and provided other is a TFunction0 then other is returned', () => {
      const either = Either.left(19);

      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const otherIntFunc = () => otherIntValue;
      const otherStringFunc: FFunction0<string> = () => otherStringValue;

      const getOrElseIntResult = either.getOrElse(otherIntFunc);
      const getOrElseStringResult = either.getOrElse(otherStringFunc);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });

  });



  describe('map', () => {

    it('when given Either is Right but mapper is null or undefined then an error is thrown', () => {
      const either = Either.right(11);

      // @ts-ignore
      expect(() => either.map(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => either.map(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Either is Left then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = vi.fn(fromNumToString);

      const either = Either.left<boolean, number>(false);

      either.map(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(0);
    });


    it('when given Either is Right then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = vi.fn(fromNumToString);

      const either = Either.right<boolean, number>(19);

      either.map(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(1);
    });


    it('when given Either is Left then same one is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const either = Either.left<string, number>('abc');

      const result = either.map(fromNumToString);

      expect(result.isRight()).toBe(false);
      expect(result.getLeft()).toEqual(either.getLeft());
    });


    it('when given Either is Right then new Right applying mapper is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const either = Either.right<string, number>(11);

      const result = either.map(fromNumToString);

      expect(result.isRight()).toBe(true);
      expect(result.get()).toEqual('11');
    });

  });



  describe('mapLeft', () => {

    it('when given Either is Left but mapper is null or undefined then an error is thrown', () => {
      const either = Either.left(11);

      // @ts-ignore
      expect(() => either.mapLeft(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => either.mapLeft(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Either is Right then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = vi.fn(fromNumToString);

      const either = Either.right<number, boolean>(false);

      either.mapLeft(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(0);
    });


    it('when given Either is Left then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = vi.fn(fromNumToString);

      const either = Either.left<number, boolean>(11);

      either.mapLeft(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(1);
    });


    it('when given Either is Right then same one is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const either = Either.right<number, boolean>(false);

      const result = either.mapLeft(fromNumToString);

      expect(result.isRight()).toBe(true);
      expect(result.get()).toEqual(either.get());
    });


    it('when given Either is Left then new Left applying mapper is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const either = Either.left<number, boolean>(11);

      const result = either.mapLeft(fromNumToString);

      expect(result.isRight()).toBe(false);
      expect(result.getLeft()).toEqual('11');
    });

  });



  describe('orElse', () => {

    it('when given Either is Left and provided other is an Either instance then other is returned', () => {
      const rightEither = Either.right<number, string>('abc');
      const leftEither = Either.left<number, string>(11);

      const result = leftEither.orElse(rightEither);

      expect(result.isRight()).toBe(true);
      expect(result.get()).toEqual(rightEither.get());
    });


    it('when given Either is Left and provided other is a TFunction0 instance then other is returned', () => {
      const rightEither = Either.right<number, string>('abc');
      const leftEither = Either.left<number, string>(11);

      const otherRaw = () => rightEither;

      const otherFFunction: FFunction0<Either<number, string>> =
        () => rightEither;

      const otherFunction: Function0<Either<number, string>> =
        Function0.of(() => rightEither);

      expect(leftEither.orElse(otherRaw).isRight()).toBe(true);
      expect(leftEither.orElse(otherRaw).get()).toEqual(rightEither.get());

      expect(leftEither.orElse(otherFFunction).isRight()).toBe(true);
      expect(leftEither.orElse(otherFFunction).get()).toEqual(rightEither.get());

      expect(leftEither.orElse(otherFunction).isRight()).toBe(true);
      expect(leftEither.orElse(otherFunction).get()).toEqual(rightEither.get());
    });


    it('when the Either instance is Right then same Either is returned', () => {
      const rightEither = Either.right<number, string>('abc');
      const leftEither = Either.left<number, string>(11);

      const other = () => leftEither;

      expect(rightEither.orElse(leftEither).isRight()).toBe(true);
      expect(rightEither.orElse(leftEither).get()).toEqual(rightEither.get());

      expect(rightEither.orElse(other).isRight()).toBe(true);
      expect(rightEither.orElse(other).get()).toEqual(rightEither.get());
    });

  });



  describe('swap', () => {

    it('when given Either is Left then new Right one is returned', () => {
      const either = Either.left<string, number>('abc');

      const result = either.swap();

      expect(result.isRight()).toBe(true);
      expect(result.get()).toEqual('abc');
    });


    it('when given Either is Right then new Left one is returned', () => {
      const either = Either.right<string, number>(12);

      const result = either.swap();

      expect(result.isRight()).toBe(false);
      expect(result.getLeft()).toEqual(12);
    });

  });



  describe('toOptional', () => {

    it('when given Either is an empty Right one then empty Optional is returned', () => {
      expect(Either.right(null).toOptional().isPresent()).toBe(false);
      expect(Either.right(undefined).toOptional().isPresent()).toBe(false);
    });


    it('when given Either is a non empty Right one then non empty Optional is returned', () => {
      const o1 = Either.right(11).toOptional();
      const o2 = Either.right('abc').toOptional();

      expect(o1.isPresent()).toBe(true);
      expect(o1.get()).toEqual(11);

      expect(o2.isPresent()).toBe(true);
      expect(o2.get()).toEqual('abc');
    });


    it('when given Either is a Left one then empty Optional is returned', () => {
      expect(Either.left(null).toOptional().isPresent()).toBe(false);
      expect(Either.left(undefined).toOptional().isPresent()).toBe(false);

      expect(Either.left(12).toOptional().isPresent()).toBe(false);
      expect(Either.left('abc').toOptional().isPresent()).toBe(false);
    });

  });




  describe('toTry', () => {

    it('when given Either is an empty Right one then empty Success is returned', () => {
      const wrapIntoAnError: FFunction1<string, Error> =
        (s: string) => new Error(s);

      const e1 = Either.right<string, NullableOrUndefined<number>>(null);
      const e2 = Either.right<string, NullableOrUndefined<number>>(undefined);

      const e1Result = e1.toTry(wrapIntoAnError);
      const e2Result = e2.toTry(wrapIntoAnError);

      expect(e1Result.isSuccess()).toBe(true);
      expect(e1Result.isEmpty()).toBe(true);

      expect(e2Result.isSuccess()).toBe(true);
      expect(e2Result.isEmpty()).toBe(true);
    });


    it('when given Either is a non empty Right one then non empty Success is returned', () => {
      const wrapIntoAnError: FFunction1<string, Error> =
        (s: string) => new Error(s);

      const e1 = Either.right<string, number>(11);
      const e2 = Either.right<string, string>('abc');

      const e1Result = e1.toTry(wrapIntoAnError);
      const e2Result = e2.toTry(wrapIntoAnError);

      expect(e1Result.isSuccess()).toBe(true);
      expect(e1Result.isEmpty()).toBe(false);
      expect(e1Result.get()).toEqual(e1.get());

      expect(e2Result.isSuccess()).toBe(true);
      expect(e2Result.isEmpty()).toBe(false);
      expect(e2Result.get()).toEqual(e2.get());
    });


    it('when given Either is a Left one but mapperLeft is null or undefined then an error is thrown', () => {
      const e1 = Either.left(12);
      const e2 = Either.left('abc');

      // @ts-ignore
      expect(() => e1.toTry(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => e2.toTry(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Either is a Left one and mapperLeft is valid then an instance of Failure applying mapperLeft is returned', () => {
      const wrapIntoAnError = (s: string) => new Error(s);

      const e1 = Either.left('abc');
      const e2 = Either.left('xyz');

      const e1Result = e1.toTry(wrapIntoAnError);
      const e2Result = e2.toTry(wrapIntoAnError);

      expect(e1Result.isSuccess()).toBe(false);
      expect(e1Result.getError().message).toEqual(e1.getLeft());

      expect(e2Result.isSuccess()).toBe(false);
      expect(e2Result.getError().message).toEqual(e2.getLeft());
    });

  });



  describe('toValidation', () => {

    it('when given Either is an empty Right one then empty Valid is returned', () => {
      expect(Either.right(null).toValidation().isValid()).toBe(true);
      expect(Either.right(null).toValidation().get()).toBeNull();

      expect(Either.right(undefined).toValidation().isValid()).toBe(true);
      expect(Either.right(undefined).toValidation().get()).toBe(undefined);
    });


    it('when given Either is a non empty Right one then non empty Valid is returned', () => {
      const e1 = Either.right(11);
      const e2 = Either.right('abc');

      expect(e1.toValidation().isValid()).toBe(true);
      expect(e1.toValidation().get()).toEqual(e1.get());

      expect(e2.toValidation().isValid()).toBe(true);
      expect(e2.toValidation().get()).toEqual(e2.get());
    });


    it('when given Either is an empty Left one then empty Invalid is returned', () => {
      expect(Either.left(null).toValidation().isValid()).toBe(false);
      expect(Either.left(null).toValidation().getErrors()).toEqual([]);

      expect(Either.left(undefined).toValidation().isValid()).toBe(false);
      expect(Either.left(undefined).toValidation().getErrors()).toEqual([]);
    });


    it('when given Either is a non empty Left one then non empty Invalid is returned', () => {
      const e1 = Either.left(11);
      const e2 = Either.left('abc');

      expect(e1.toValidation().isValid()).toBe(false);
      expect(e1.toValidation().getErrors()).toEqual([e1.getLeft()]);

      expect(e2.toValidation().isValid()).toBe(false);
      expect(e2.toValidation().getErrors()).toEqual([e2.getLeft()]);
    });

  });

});




describe('Right', () => {


  describe('of', () => {

    it('when a value is given then it will be stored internally', () => {
      const intValue = 11;

      expect(Right.of<boolean, NullableOrUndefined<string>>(undefined).isRight()).toBe(true);
      expect(Right.of<boolean, NullableOrUndefined<string>>(undefined).get()).toBe(undefined);

      expect(Right.of<string, Nullable<number>>(null).isRight()).toBe(true);
      expect(Right.of<string, Nullable<number>>(null).get()).toBeNull();

      expect(Right.of(intValue).isRight()).toBe(true);
      expect(Right.of(intValue).get()).toEqual(intValue);
    });

  });



  describe('get', () => {

    it('then internal value is returned', () => {
      expect(Right.of<boolean, NullableOrUndefined<string>>(undefined).get()).toBe(undefined);
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



  describe('isRight', () => {

    it('then true is returned', () => {
      expect(Right.of('abc').isRight()).toBe(true);
      expect(Right.of(12).isRight()).toBe(true);
    });

  });

});




describe('Left', () => {


  describe('of', () => {

    it('when a value is given then it will be stored internally', () => {
      const intValue = 11;

      expect(Left.of<NullableOrUndefined<string>, boolean>(undefined).isRight()).toBe(false);
      expect(Left.of<NullableOrUndefined<string>, boolean>(undefined).getLeft()).toBe(undefined);

      expect(Left.of<Nullable<number>, string>(null).isRight()).toBe(false);
      expect(Left.of<Nullable<number>, string>(null).getLeft()).toBeNull();

      expect(Left.of(intValue).isRight()).toBe(false);
      expect(Left.of(intValue).getLeft()).toEqual(intValue);
    });

  });



  describe('get', () => {

    it('then ReferenceError is returned', () => {
      expect(() => Left.of(undefined).get()).toThrowError(ReferenceError);
      expect(() => Left.of(null).get()).toThrowError(ReferenceError);
      expect(() => Left.of(12).get()).toThrowError(ReferenceError);
    });

  });



  describe('getLeft', () => {

    it('then internal value is returned', () => {
      expect(Left.of(undefined).getLeft()).toBe(undefined);
      expect(Left.of(null).getLeft()).toBeNull();
      expect(Left.of(12).getLeft()).toEqual(12);
    });

  });



  describe('isRight', () => {

    it('then false is returned', () => {
      expect(Left.of('abc').isRight()).toBe(false);
      expect(Left.of(12).isRight()).toBe(false);
    });

  });

});
