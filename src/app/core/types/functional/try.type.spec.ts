import { Nullable, NullableOrUndefined } from '@app-core/types';
import { Failure, Success, Try } from '@app-core/types/functional';
import {
  FFunction0,
  FFunction1,
  FFunction2,
  Function0,
  Function1,
  Function2,
  Function3,
  Function4,
  Function5,
  Function6,
  Function7,
  Function8,
  Function9
} from '@app-core/types/function';
import { BinaryOperator, FBinaryOperator } from '@app-core/types/function/operator';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/functional/try.type.spec.ts
 */
describe('Try', () => {


  describe('combine', () => {

    it('when given tries are null, undefined or empty then a Success with null value is returned', () => {
      const mapperFailure = (e1: Error, e2: Error) => e2;
      const mapperSuccess: FFunction2<number, number, number> = (n1: number, n2: number) => n2;

      expect(Try.combine(mapperFailure, mapperSuccess, null).isSuccess()).toBeTrue();
      expect(Try.combine(mapperFailure, mapperSuccess, null).get()).toBeNull();

      expect(Try.combine(mapperFailure, mapperSuccess, undefined).isSuccess()).toBeTrue();
      expect(Try.combine(mapperFailure, mapperSuccess, undefined).get()).toBeNull();

      expect(Try.combine(mapperFailure, mapperSuccess, []).isSuccess()).toBeTrue();
      expect(Try.combine(mapperFailure, mapperSuccess, []).get()).toBeNull();
    });


    it('when given tries is not empty but mapperFailure is null or undefined then an error is thrown', () => {
      const tries = [Try.success(12)];
      const mapperSuccess: Function2<number, number, number> =
        Function2.of((n1: number, n2: number) => n2);

      // @ts-ignore
      expect(() => Try.combine(null, mapperSuccess, tries)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => Try.combine(undefined, mapperSuccess, tries)).toThrowError(IllegalArgumentError);
    });


    it('when given tries is not empty but mapperSuccess is null or undefined then an error is thrown', () => {
      const tries = [Try.success(12)];
      const mapperFailure: Function2<Error, Error, Error> =
        Function2.of((e1: Error, e2: Error) => e2);

      // @ts-ignore
      expect(() => Try.combine(mapperFailure, null, tries)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => Try.combine(mapperFailure, undefined, tries)).toThrowError(IllegalArgumentError);
    });


    it('when all tries are Success then a Success applying mapperSuccess is returned', () => {
      const tries = [
        Try.success(12),
        Try.success(11),
        Try.success(10)
      ];
      const mapperFailure: BinaryOperator<Error> =
        BinaryOperator.of((e1: Error, e2: Error) => e2);
      const mapperSuccess: FBinaryOperator<number> = (n1: number, n2: number) => n2;

      expect(Try.combine(mapperFailure, mapperSuccess, tries).isSuccess()).toBeTrue();
      expect(Try.combine(mapperFailure, mapperSuccess, tries).get()).toEqual(10);
    });


    it('when tries contains Failure then a Failure applying mapperFailure is returned', () => {
      const lastError = new SyntaxError();

      const tries: Try<number>[] = [
        Try.success(12),
        Try.success(11),
        Try.failure(new TypeError()),
        Try.failure(lastError)
      ];
      const mapperFailure = (e1: Error, e2: Error) => e2;
      const mapperSuccess = (n1: number, n2: number) => n2;

      expect(Try.combine(mapperFailure, mapperSuccess, tries).isSuccess()).toBeFalse();
      expect(Try.combine(mapperFailure, mapperSuccess, tries).getError()).toEqual(lastError);
    });

  });



  describe('combineGetFirstFailure', () => {

    it('when given tries are null, undefined or empty then a Success with null value is returned', () => {
      const mapperSuccess: FBinaryOperator<number> = (n1: number, n2: number) => n2;

      expect(Try.combineGetFirstFailure(mapperSuccess, null).isSuccess()).toBeTrue();
      expect(Try.combineGetFirstFailure(mapperSuccess, null).get()).toBeNull();

      expect(Try.combineGetFirstFailure(mapperSuccess, undefined).isSuccess()).toBeTrue();
      expect(Try.combineGetFirstFailure(mapperSuccess, undefined).get()).toBeNull();

      expect(Try.combineGetFirstFailure(mapperSuccess, []).isSuccess()).toBeTrue();
      expect(Try.combineGetFirstFailure(mapperSuccess, []).get()).toBeNull();
    });


    it('when given tries is not empty but mapperSuccess is null or undefined then an error is thrown', () => {
      const tries = [() => Try.success(12)];

      // @ts-ignore
      expect(() => Try.combineGetFirstFailure(null, tries)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => Try.combineGetFirstFailure(undefined, tries)).toThrowError(IllegalArgumentError);
    });


    it('when all tries are Success then a Success applying mapperSuccess is returned', () => {
      const tries = [
        () => Try.success(12),
        () => Try.success(11),
        () => Try.success(10)
      ];
      const mapperSuccess: FBinaryOperator<number> = (n1: number, n2: number) => n2;

      expect(Try.combineGetFirstFailure(mapperSuccess, tries).isSuccess()).toBeTrue();
      expect(Try.combineGetFirstFailure(mapperSuccess, tries).get()).toEqual(10);
    });


    it('when tries contains Failure then the first one is returned', () => {
      const firstError = new TypeError();

      const tries: FFunction0<Try<number>>[] = [
        () => Try.success(12),
        () => Try.success(11),
        () => Try.failure(firstError),
        () => Try.failure(new SyntaxError())
      ];
      const mapperSuccess = (n1: number, n2: number) => n2;

      expect(Try.combineGetFirstFailure(mapperSuccess, tries).isSuccess()).toBeFalse();
      expect(Try.combineGetFirstFailure(mapperSuccess, tries).getError()).toEqual(firstError);
    });

  });



  describe('ofFunction0', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction0(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const returnedValue: string = 'abc';
      const func = () => returnedValue;

      const tryResult = Try.ofFunction0(func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(returnedValue);
    });


    it('when applying func supplier an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const func: Function0<number> =
        Function0.of(
          () => { throw returnedError; }
        );

      const tryResult = Try.ofFunction0(func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('ofFunction1', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction1(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const func = (s: string) => parseInt(s);

      const tryResult = Try.ofFunction1('1', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(1);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const func: Function1<string, number> =
        Function1.of(
          (s) => { throw returnedError; }
        );

      const tryResult = Try.ofFunction1('1', func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('ofFunction2', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction2(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const func = (s1: string, s2: string) => parseInt(s1 + s2);

      const tryResult = Try.ofFunction2('1', '2', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(12);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError = new SyntaxError('There was an error');
      const func: Function2<string, string, number> =
        Function2.of(
          (s1, s2) => { throw returnedError; }
        );

      const tryResult = Try.ofFunction2('1', '2', func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('ofFunction3', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction3(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const func = (s1: string, s2: string, s3: string) =>
        parseInt(s1 + s2 + s3);

      const tryResult = Try.ofFunction3('1', '2', '3', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(123);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const func: Function3<string, string, string, number> =
        Function3.of(
          (s1, s2, s3) => { throw returnedError; }
        );

      const tryResult = Try.ofFunction3('1', '2', '3', func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('ofFunction4', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction4(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const func = (s1: string, s2: string, s3: string, s4: string) =>
        parseInt(s1 + s2 + s3 + s4);

      const tryResult = Try.ofFunction4('1', '2', '3', '4', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(1234);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const func: Function4<string, string, string, string, number> =
        Function4.of(
          (s1, s2, s3, s4) => { throw returnedError; }
        );

      const tryResult = Try.ofFunction4('1', '2', '3', '4', func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('ofFunction5', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction5(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const func = (s1: string, s2: string, s3: string, s4: string, s5: string) =>
        parseInt(s1 + s2 + s3 + s4 + s5);

      const tryResult = Try.ofFunction5('1', '2', '3', '4', '5', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(12345);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const func: Function5<string, string, string, string, string, number> =
        Function5.of(
          (s1, s2, s3, s4, s5) => { throw returnedError; }
        );

      const tryResult = Try.ofFunction5('1', '2', '3', '4', '5', func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('ofFunction6', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction6(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const func = (s1: string, s2: string, s3: string, s4: string, s5: string, s6: string) =>
        parseInt(s1 + s2 + s3 + s4 + s5 + s6);

      const tryResult = Try.ofFunction6('1', '2', '3', '4', '5', '6', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(123456);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const func: Function6<string, string, string, string, string, string, number> =
        Function6.of(
          (s1, s2, s3, s4, s5, s6) => { throw returnedError; }
        );

      const tryResult = Try.ofFunction6('1', '2', '3', '4', '5', '6', func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('ofFunction7', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction7(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const func = (s1: string, s2: string, s3: string, s4: string, s5: string, s6: string, s7: string) =>
        parseInt(s1 + s2 + s3 + s4 + s5 + s6 + s7);

      const tryResult = Try.ofFunction7('1', '2', '3', '4', '5', '6', '7', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(1234567);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const func: Function7<string, string, string, string, string, string, string, number> =
        Function7.of(
          (s1, s2, s3, s4, s5, s6, s7) => { throw returnedError; }
        );

      const tryResult = Try.ofFunction7('1', '2', '3', '4', '5', '6', '7', func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('ofFunction8', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction8(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const func = (s1: string, s2: string, s3: string, s4: string, s5: string, s6: string, s7: string, s8: string) =>
        parseInt(s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8);

      const tryResult = Try.ofFunction8('1', '2', '3', '4', '5', '6', '7', '8', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(12345678);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const func: Function8<string, string, string, string, string, string, string, string, number> =
        Function8.of(
          (s1, s2, s3, s4, s5, s6, s7, s8) => { throw returnedError; }
        );

      const tryResult = Try.ofFunction8('1', '2', '3', '4', '5', '6', '7', '8', func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('ofFunction9', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction9(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const func = (s1: string, s2: string, s3: string, s4: string, s5: string, s6: string, s7: string, s8: string, s9: string) =>
        parseInt(s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9);

      const tryResult = Try.ofFunction9('1', '2', '3', '4', '5', '6', '7', '8', '9', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(123456789);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const func: Function9<string, string, string, string, string, string, string, string, string, number> =
        Function9.of(
          (s1, s2, s3, s4, s5, s6, s7, s8, s9) => { throw returnedError; }
        );

      const tryResult = Try.ofFunction9('1', '2', '3', '4', '5', '6', '7', '8', '9', func);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError()).toEqual(returnedError);
    });

  });



  describe('success', () => {

    it('when null or undefined value is given then empty Success is returned', () => {
      expect(Try.success(null).isSuccess()).toBeTrue();
      expect(Try.success(null).get()).toBeNull();

      expect(Try.success(undefined).isSuccess()).toBeTrue();
      expect(Try.success(undefined).get()).toBeUndefined();
    });


    it('when a valid value is given then non empty Success is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(Try.success(intValue).isSuccess()).toBeTrue();
      expect(Try.success(intValue).get()).toEqual(intValue);

      expect(Try.success(stringValue).isSuccess()).toBeTrue();
      expect(Try.success(stringValue).get()).toEqual(stringValue);
    });

  });



  describe('failure', () => {

    it('when null or undefined error is given then an error is thrown', () => {

      // @ts-ignore
      expect(() => Try.failure(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => Try.failure(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a valid value is given then no error is thrown and it will be stored internally', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');
      const referenceError = new ReferenceError('ReferenceError: there was an error');

      expect(Try.failure(illegalArgumentError).isSuccess()).toBeFalse();
      expect(Try.failure(illegalArgumentError).getError()).toEqual(illegalArgumentError);

      expect(Try.failure(referenceError).isSuccess()).toBeFalse();
      expect(Try.failure(referenceError).getError()).toEqual(referenceError);
    });

  });



  describe('ap', () => {

    it('when given Try is null or undefined then this Try is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const sumValues: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const mergeErrors: FBinaryOperator<Error> =
        (e1: Error, e2: Error) => new Error(e1.message + e2.message);

      const successTry = Try.success(11);
      const failureTry = Try.failure(illegalArgumentError);

      // @ts-ignore
      expect(successTry.ap(null, mergeErrors, sumValues)).toEqual(successTry);
      // @ts-ignore
      expect(successTry.ap(undefined, mergeErrors, sumValues)).toEqual(successTry);

      // @ts-ignore
      expect(failureTry.ap(null, mergeErrors, sumValues)).toEqual(failureTry);
      // @ts-ignore
      expect(failureTry.ap(undefined, mergeErrors, sumValues)).toEqual(failureTry);
    });


    it('when given Try and this one are Failure then mapperFailure is invoked and mapperSuccess is not', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const sumValues: FBinaryOperator<number> =
        (n1: number, n2: number): number => n1 + n2;

      const mergeErrors: FBinaryOperator<Error> =
        (e1: Error, e2: Error): Error => new Error(e1.message + e2.message);

      const sumValuesSpy = jasmine.createSpy('sumValues', sumValues);
      const mergeErrorsSpy = jasmine.createSpy('mergeErrors', mergeErrors);

      const t1: Try<number> = Try.failure(illegalArgumentError);
      const t2: Try<number> = Try.failure(illegalArgumentError);

      t1.ap(t2, mergeErrorsSpy, sumValuesSpy);

      expect(sumValuesSpy.calls.count()).toBe(0);
      expect(mergeErrorsSpy.calls.count()).toBe(1);
    });


    it('when given Try and this one are Success then mapperSuccess is invoked and mapperFailure is not', () => {
      const sumValues: FBinaryOperator<number> =
        (n1: number, n2: number): number => n1 + n2;

      const mergeErrors: FBinaryOperator<Error> =
        (e1: Error, e2: Error): Error => new Error(e1.message + e2.message);

      const sumValuesSpy = jasmine.createSpy('sumValues', sumValues);
      const mergeErrorsSpy = jasmine.createSpy('mergeErrors', mergeErrors);

      const t1 = Try.success(11);
      const t2 = Try.success(19);

      t1.ap(t2, mergeErrorsSpy, sumValuesSpy);

      expect(sumValuesSpy.calls.count()).toBe(1);
      expect(mergeErrorsSpy.calls.count()).toBe(0);
    });


    it('when one of the Try is Failure then Failure is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const sumValues: BinaryOperator<number> =
        BinaryOperator.of((n1: number, n2: number) => n1 + n2);

      const mergeErrors: BinaryOperator<Error> =
        BinaryOperator.of((e1: Error, e2: Error) => new Error(e1.message + e2.message));

      const successTry = Try.success(11);
      const failureTry = Try.failure<number>(illegalArgumentError);

      const successApFailureResult = successTry.ap(failureTry, mergeErrors, sumValues);
      const failureApFailureResult = failureTry.ap(successTry, mergeErrors, sumValues);

      expect(successApFailureResult.isSuccess()).toBeFalse();
      expect(successApFailureResult.getError()).toEqual(illegalArgumentError);

      expect(failureApFailureResult.isSuccess()).toBeFalse();
      expect(failureApFailureResult.getError()).toEqual(illegalArgumentError);
    });



    it('when given Try and this one are Failure but mapperFailure is null or undefined then Failure is returned because missing mapperFailure', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');
      const syntaxError = new SyntaxError('SyntaxError: there was an error');

      const errorMissingMapperFailure = new IllegalArgumentError('func must be not null and not undefined');

      const sumValues: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const t1 = Try.failure<number>(illegalArgumentError);
      const t2 = Try.failure<number>(syntaxError);

      // @ts-ignore
      const t1Apt2 = t1.ap(t2, null, sumValues);
      // @ts-ignore
      const t2Apt1 = t2.ap(t1, undefined, sumValues);

      expect(t1Apt2.isSuccess()).toBeFalse();
      expect(t1Apt2.getError() instanceof Error).toBeTrue();
      expect(t1Apt2.getError().message).toEqual(errorMissingMapperFailure.message);

      expect(t2Apt1.isSuccess()).toBeFalse();
      expect(t2Apt1.getError() instanceof Error).toBeTrue();
      expect(t2Apt1.getError().message).toEqual(errorMissingMapperFailure.message);
    });



    it('when given Try and this one are Failure then mapperFailure result is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');
      const syntaxError = new SyntaxError('SyntaxError: there was an error');

      const sumValues = (n1: number, n2: number) => n1 + n2;
      const mergeErrors = (e1: Error, e2: Error) => new Error(e1.message + e2.message);

      const t1 = Try.failure<number>(illegalArgumentError);
      const t2 = Try.failure<number>(syntaxError);

      const t1Apt2 = t1.ap(t2, mergeErrors, sumValues);
      const t2Apt1 = t2.ap(t1, mergeErrors, sumValues);

      expect(t1Apt2.isSuccess()).toBeFalse();
      expect(t1Apt2.getError() instanceof Error).toBeTrue();
      expect(t1Apt2.getError().message).toEqual(illegalArgumentError.message + syntaxError.message);

      expect(t2Apt1.isSuccess()).toBeFalse();
      expect(t2Apt1.getError() instanceof Error).toBeTrue();
      expect(t2Apt1.getError().message).toEqual(syntaxError.message + illegalArgumentError.message);
    });



    it('when given Try and this one are Success but mapperSuccess is null or undefined then Failure is returned because missing mapperSuccess', () => {
      const mergeErrors = (e1: Error, e2: Error): Error => new Error(e1.message + e2.message);

      const errorMissingMapperFailure = new IllegalArgumentError('func must be not null and not undefined');

      const t1 = Try.success(11);
      const t2 = Try.success(19);

      // @ts-ignore
      const t1Apt2 = t1.ap(t2, mergeErrors, null);
      // @ts-ignore
      const t2Apt1 = t2.ap(t1, mergeErrors, undefined);

      expect(t1Apt2.isSuccess()).toBeFalse();
      expect(t1Apt2.getError() instanceof Error).toBeTrue();
      expect(t1Apt2.getError().message).toEqual(errorMissingMapperFailure.message);

      expect(t2Apt1.isSuccess()).toBeFalse();
      expect(t2Apt1.getError() instanceof Error).toBeTrue();
      expect(t2Apt1.getError().message).toEqual(errorMissingMapperFailure.message);
    });



    it('when given Try and this one are Success then mapperSuccess result is returned', () => {
      const sumValues = (n1: number, n2: number): number => n1 + n2;
      const mergeErrors = (e1: Error, e2: Error): Error => new Error(e1.message + e2.message);

      const t1 = Try.success(11);
      const t2 = Try.success(19);

      const t1Apt2 = t1.ap(t2, mergeErrors, sumValues);
      const t2Apt1 = t2.ap(t1, mergeErrors, sumValues);

      expect(t1Apt2.isSuccess()).toBeTrue();
      expect(t1Apt2.get()).toEqual(30);

      expect(t2Apt1.isSuccess()).toBeTrue();
      expect(t2Apt1.get()).toEqual(30);
    });

  });



  describe('fold', () => {

    it('when the Try is Failure then mapperFailure is invoked and mapperSuccess is not', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const fromNumToString: FFunction1<number, string> =
        (n: number): string => '' + n;

      const returnErrorMessage: FFunction1<Error, string> =
        (error: Error): string => error.message;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);
      const returnErrorMessageSpy = jasmine.createSpy('returnErrorMessage', returnErrorMessage);

      Try.failure<number>(illegalArgumentError).fold(returnErrorMessageSpy, fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
      expect(returnErrorMessageSpy.calls.count()).toBe(1);
    });


    it('when the Try is Success then mapperSuccess is invoked and mapperFailure is not', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number): string => '' + n;

      const returnErrorMessage: FFunction1<Error, string> =
        (error: Error): string => error.message;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);
      const returnErrorMessageSpy = jasmine.createSpy('returnErrorMessage', returnErrorMessage);

      Try.success(12).fold(returnErrorMessageSpy, fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
      expect(returnErrorMessageSpy.calls.count()).toBe(0);
    });


    it('when the Try is Failure then mapperFailure result is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const fromNumToString: Function1<number, string> =
        Function1.of((n: number) => '' + n);

      const returnErrorMessage: Function1<Error, string> =
        Function1.of((error: Error) => error.message);

      const result = Try.failure<number>(illegalArgumentError).fold(returnErrorMessage, fromNumToString);

      expect(result).toEqual(illegalArgumentError.message);
    });


    it('when the Try is Success then mapperSuccess result is returned', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const returnErrorMessage: FFunction1<Error, string> =
        (error: Error) => error.message;

      const result = Try.success(19).fold(returnErrorMessage, fromNumToString);

      expect(result).toEqual('19');
    });


    it('when the Try is Success but mapperSuccess throws an error then mapperFailure result is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const fromNumToString = (n: number) => { throw illegalArgumentError; }
      const returnErrorMessage = (error: Error) => error.message;

      const result = Try.success(19).fold(returnErrorMessage, fromNumToString);

      expect(result).toEqual(illegalArgumentError.message);
    });

  });



  describe('getOrElse', () => {

    it('when the Try instance is a Success one then the content of Success is returned', () => {
      expect(Try.success<NullableOrUndefined<string>>(undefined).getOrElse('11')).toBeUndefined();
      expect(Try.success<Nullable<number>>(null).getOrElse(20)).toBeNull();
      expect(Try.success(11).getOrElse(20)).toEqual(11);
    });


    it('when the Try instance is a Failure one and provided other is a value then other is returned', () => {
      const failure = Try.failure(new IllegalArgumentError('IllegalArgumentError: there was an error'));

      expect(failure.getOrElse(undefined)).toBeUndefined();
      expect(failure.getOrElse(null)).toBeNull();
      expect(failure.getOrElse(12)).toEqual(12);
    });


    it('when the Try instance is a Failure one and provided other is a TFunction0 then other is returned', () => {
      const failure = Try.failure(new IllegalArgumentError('IllegalArgumentError: there was an error'));

      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const otherIntFunc = () => otherIntValue;
      const otherStringFunc: FFunction0<string> = () => otherStringValue;

      const getOrElseIntResult = failure.getOrElse(otherIntFunc);
      const getOrElseStringResult = failure.getOrElse(otherStringFunc);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });

  });



  describe('isEmpty', () => {

    it('when the Try instance is an empty Success one then true is returned', () => {
      expect(Try.success(null).isEmpty()).toBeTrue();
      expect(Try.success(undefined).isEmpty()).toBeTrue();

      expect(Try.success<NullableOrUndefined<string>>(undefined).isEmpty()).toBeTrue();
      expect(Try.success<Nullable<number>>(null).isEmpty()).toBeTrue();
    });


    it('when the Try instance is a non-empty Success one then false is returned', () => {
      expect(Try.success(12).isEmpty()).toBeFalse();
      expect(Try.success('abc').isEmpty()).toBeFalse();
    });


    it('when the Try instance is a Failure one then true is returned', () => {
      expect(Try.failure(new IllegalArgumentError('IllegalArgumentError: there was an error')).isEmpty()).toBeTrue();
    });

  });



  describe('map', () => {

    it('when the Try instance is Success but mapper is null or undefined then an error is thrown', () => {
      const successTry = Try.success(11);

      // @ts-ignore
      expect(() => successTry.map(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => successTry.map(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Try instance is Failure then mapper is not invoked', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const failureTry: Try<number> = Try.failure(illegalArgumentError);

      failureTry.map(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
    });


    it('when the Try instance is Success then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const successTry: Try<number> = Try.success(11);

      successTry.map(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
    });


    it('when the Try instance is Failure then same one is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const fromNumToString = (n: number) => '' + n;
      const failureTry: Try<number> = Try.failure(illegalArgumentError);

      const result = failureTry.map(fromNumToString);

      expect(result.isSuccess()).toBeFalse();
      expect(result.getError() instanceof IllegalArgumentError).toBeTrue();
      expect(result.getError().message).toEqual(illegalArgumentError.message);
    });


    it('when the Try instance is Success then new Try applying mapper is returned', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const successTry: Try<number> = Try.success(11);

      const result = successTry.map(fromNumToString);

      expect(result.isSuccess()).toBeTrue();
      expect(result.get()).toEqual('11');
    });

  });



  describe('mapFailure', () => {

    it('when the Try instance is Failure but mapper is null or undefined then an error is thrown', () => {
      const failureTry = Try.failure<number>(new SyntaxError('There was an error'));

      // @ts-ignore
      expect(() => failureTry.mapFailure(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => failureTry.mapFailure(null)).toThrowError(IllegalArgumentError);
    });


    it('when the Try instance is Failure then mapper is invoked', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const throwSyntaxError: FFunction1<Error, Error> =
        (e: Error): Error => new SyntaxError(e.message);

      const throwSyntaxErrorSpy = jasmine.createSpy('throwSyntaxError', throwSyntaxError);

      const failureTry: Try<number> = Try.failure(illegalArgumentError);

      failureTry.mapFailure(throwSyntaxErrorSpy);

      expect(throwSyntaxErrorSpy.calls.count()).toBe(1);
    });


    it('when the Try instance is Success then mapper is not invoked', () => {
      const throwSyntaxError: FFunction1<Error, Error> =
        (e: Error): Error => new SyntaxError(e.message);

      const throwSyntaxErrorSpy = jasmine.createSpy('throwSyntaxError', throwSyntaxError);

      const successTry: Try<number> = Try.success(11);

      successTry.mapFailure(throwSyntaxErrorSpy);

      expect(throwSyntaxErrorSpy.calls.count()).toBe(0);
    });


    it('when the Try instance is Failure then new Try applying mapper is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const throwSyntaxError: FFunction1<Error, Error> =
        (e: Error): Error => new SyntaxError(e.message + 'v2');

      const failureTry: Try<number> = Try.failure(illegalArgumentError);

      const result = failureTry.mapFailure(throwSyntaxError);

      expect(result.isSuccess()).toBeFalse();
      expect(result.getError() instanceof SyntaxError).toBeTrue();
      expect(result.getError().message).toEqual(illegalArgumentError.message + 'v2');
    });


    it('when the Try instance is Success then same Try is returned', () => {
      const throwSyntaxError = (e: Error): Error => new SyntaxError(e.message + 'v2');
      const successTry: Try<number> = Try.success(11);

      const result = successTry.mapFailure(throwSyntaxError);

      expect(result.isSuccess()).toBeTrue();
      expect(result.get()).toEqual(11);
    });

  });



  describe('orElse', () => {

    it('when the Try instance is Failure and provided other is a Try instance then other is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const successTry = Try.success(19);
      const failureTry = Try.failure<number>(illegalArgumentError);

      const result = failureTry.orElse(successTry);

      expect(result.isSuccess()).toBeTrue();
      expect(result.get()).toEqual(successTry.get());
    });


    it('when the Try instance is Failure and provided other is a TFunction0 instance then other is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const successTry = Try.success(19);
      const failureTry = Try.failure<number>(illegalArgumentError);

      const otherRaw = () => successTry;

      const otherFFunction: FFunction0<Try<number>> =
        () => successTry;

      const otherFunction: Function0<Try<number>> =
        Function0.of(() => successTry);

      expect(failureTry.orElse(otherRaw).isSuccess()).toBeTrue();
      expect(failureTry.orElse(otherRaw).get()).toEqual(successTry.get());

      expect(failureTry.orElse(otherFFunction).isSuccess()).toBeTrue();
      expect(failureTry.orElse(otherFFunction).get()).toEqual(successTry.get());

      expect(failureTry.orElse(otherFunction).isSuccess()).toBeTrue();
      expect(failureTry.orElse(otherFunction).get()).toEqual(successTry.get());
    });


    it('when the Try instance is Right then same Try is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const successTry = Try.success(19);
      const failureTry = Try.failure<number>(illegalArgumentError);

      const other = () => failureTry;

      expect(successTry.orElse(failureTry).isSuccess()).toBeTrue();
      expect(successTry.orElse(failureTry).get()).toEqual(successTry.get());

      expect(successTry.orElse(other).isSuccess()).toBeTrue();
      expect(successTry.orElse(other).get()).toEqual(successTry.get());
    });

  });



  describe('recover', () => {

    it('when the Try instance is Failure but mapper is null or undefined then an error is thrown', () => {
      const failureTry = Try.failure<number>(new SyntaxError('There was an error'));

      // @ts-ignore
      expect(() => failureTry.recover(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => failureTry.recover(null)).toThrowError(IllegalArgumentError);
    });


    it('when the Try instance is Failure then mapper is invoked', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const getErrorMessage: FFunction1<Error, string> =
        (e: Error) => e.message;

      const getErrorMessageSpy = jasmine.createSpy('getErrorMessage', getErrorMessage);

      const failureTry: Try<string> = Try.failure(illegalArgumentError);

      failureTry.recover(getErrorMessageSpy);

      expect(getErrorMessageSpy.calls.count()).toBe(1);
    });


    it('when the Try instance is Success then mapper is not invoked', () => {
      const getErrorMessage: FFunction1<Error, string> =
        (e: Error) => e.message;

      const getErrorMessageSpy = jasmine.createSpy('getErrorMessage', getErrorMessage);
      const successTry: Try<string> = Try.success('9');

      successTry.recover(getErrorMessageSpy);

      expect(getErrorMessageSpy.calls.count()).toBe(0);
    });


    it('when the Try instance is Failure then a Success applying mapper is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const failureBuilder: Function0<number> =
        Function0.of(
          () => { throw illegalArgumentError; }
        );
      const getLengthErrorMessage = (e: Error) => e.message.length;
      const failureTry = Try.ofFunction0(failureBuilder);

      const result = failureTry.recover(getLengthErrorMessage);

      expect(result.isSuccess()).toBeTrue();
      expect(result.get()).toEqual(illegalArgumentError.message.length);
    });


    it('when the Try instance is Success then same Try is returned', () => {
      const getLengthErrorMessage: Function1<Error, number> =
        Function1.of((e: Error) => e.message.length);

      const successTry: Try<number> = Try.success(11);

      const result = successTry.recover(getLengthErrorMessage);

      expect(result.isSuccess()).toBeTrue();
      expect(result.get()).toEqual(11);
    });

  });



  describe('recoverWith', () => {

    it('when the Try instance is Failure but mapper is null or undefined then an error is thrown', () => {
      const failureTry = Try.failure<number>(new SyntaxError('There was an error'));

      // @ts-ignore
      expect(() => failureTry.recoverWith(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => failureTry.recoverWith(null)).toThrowError(IllegalArgumentError);
    });


    it('when the Try instance is Failure then mapper is invoked', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const getErrorMessage: FFunction1<Error, Try<string>> =
        (e: Error) => Try.success(e.message);

      const getErrorMessageSpy = jasmine.createSpy('getErrorMessage', getErrorMessage);

      const failureTry: Try<string> = Try.failure(illegalArgumentError);

      failureTry.recoverWith(getErrorMessageSpy);

      expect(getErrorMessageSpy.calls.count()).toBe(1);
    });


    it('when the Try instance is Success then mapper is not invoked', () => {
      const getErrorMessage: FFunction1<Error, Try<string>> =
        (e: Error) => Try.success(e.message);

      const getErrorMessageSpy = jasmine.createSpy('getErrorMessage', getErrorMessage);
      const successTry: Try<string> = Try.success('9');

      successTry.recoverWith(getErrorMessageSpy);

      expect(getErrorMessageSpy.calls.count()).toBe(0);
    });


    it('when the Try instance is Failure then a Success applying mapper is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const failureBuilder: Function0<number> =
        Function0.of(
          () => { throw illegalArgumentError; }
        );
      const getLengthErrorMessage = (e: Error) => Try.success(e.message.length);
      const failureTry = Try.ofFunction0(failureBuilder);

      const result = failureTry.recoverWith(getLengthErrorMessage);

      expect(result.isSuccess()).toBeTrue();
      expect(result.get()).toEqual(illegalArgumentError.message.length);
    });


    it('when the Try instance is Success then same Try is returned', () => {
      const getLengthErrorMessage: Function1<Error, Try<number>> =
        Function1.of((e: Error) => Try.success(e.message.length));

      const successTry: Try<number> = Try.success(11);

      const result = successTry.recoverWith(getLengthErrorMessage);

      expect(result.isSuccess()).toBeTrue();
      expect(result.get()).toEqual(11);
    });

  });



  describe('toEither', () => {

    it('when the Try instance is an empty Success one then empty Right is returned', () => {
      expect(Try.success(null).toEither().isRight()).toBeTrue();
      expect(Try.success(null).toEither().get()).toBeNull();

      expect(Try.success(undefined).toEither().isRight()).toBeTrue();
      expect(Try.success(undefined).toEither().get()).toBeUndefined();
    });


    it('when the Try instance is a non empty Success one then non empty Right is returned', () => {
      const intSuccess = Try.success(12);
      const stringSuccess = Try.success('abc');

      expect(intSuccess.toEither().isRight()).toBeTrue();
      expect(intSuccess.toEither().get()).toEqual(intSuccess.get());

      expect(stringSuccess.toEither().isRight()).toBeTrue();
      expect(stringSuccess.toEither().get()).toEqual(stringSuccess.get());
    });


    it('when the Try instance is a Failure one then a Left instance is returned', () => {
      const error = new IllegalArgumentError('IllegalArgumentError: there was an error');
      const failure = Try.failure(error);

      expect(failure.toEither().isRight()).toBeFalse();
      expect(failure.toEither().getLeft()).toEqual(error);
    });

  });



  describe('toOptional', () => {

    it('when the Try instance is an empty Success one then empty Optional is returned', () => {
      expect(Try.success(null).toOptional().isPresent()).toBeFalse();
      expect(Try.success(undefined).toOptional().isPresent()).toBeFalse();

      expect(Try.success<NullableOrUndefined<string>>(undefined).toOptional().isPresent()).toBeFalse();
      expect(Try.success<Nullable<number>>(null).toOptional().isPresent()).toBeFalse();
    });


    it('when the Try instance is a non empty Success one then non empty Optional is returned', () => {
      const intSuccess = Try.success(12);
      const stringSuccess = Try.success('abc');

      expect(intSuccess.toOptional().isPresent()).toBeTrue();
      expect(intSuccess.toOptional().get()).toEqual(intSuccess.get());

      expect(stringSuccess.toOptional().isPresent()).toBeTrue();
      expect(stringSuccess.toOptional().get()).toEqual(stringSuccess.get());
    });


    it('when the Try instance is a Failure one then empty Optional is returned', () => {
      const failure = Try.failure(new IllegalArgumentError('IllegalArgumentError: there was an error'));

      expect(failure.toOptional().isPresent()).toBeFalse();
    });

  });



  describe('toValidation', () => {

    it('when the Try instance is an empty Success one then empty Valid is returned', () => {
      expect(Try.success(null).toValidation().isValid()).toBeTrue();
      expect(Try.success(null).toValidation().get()).toBeNull();

      expect(Try.success(undefined).toValidation().isValid()).toBeTrue();
      expect(Try.success(undefined).toValidation().get()).toBeUndefined();
    });


    it('when the Try instance is a non empty Success one then non empty Valid is returned', () => {
      const intSuccess = Try.success(12);
      const stringSuccess = Try.success('abc');

      expect(intSuccess.toValidation().isValid()).toBeTrue();
      expect(intSuccess.toValidation().get()).toEqual(intSuccess.get());

      expect(stringSuccess.toValidation().isValid()).toBeTrue();
      expect(stringSuccess.toValidation().get()).toEqual(stringSuccess.get());
    });


    it('when the Try instance is a Failure one then an Invalid instance is returned', () => {
      const error = new IllegalArgumentError('IllegalArgumentError: there was an error');
      const failure = Try.failure(error);

      expect(failure.toValidation().isValid()).toBeFalse();
      expect(failure.toValidation().getErrors()).toEqual([error]);
    });

  });



  describe('transform', () => {

    it('when the Try instance is Failure but mapperFailure is null or undefined then an error is thrown', () => {
      const failureTry = Try.failure<number>(new SyntaxError('There was an error'));

      const fromNumToString = (n: number): string => '' + n;

      // @ts-ignore
      expect(() => failureTry.transform(null, fromNumToString)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => failureTry.transform(null, fromNumToString)).toThrowError(IllegalArgumentError);
    });


    it('when the Try instance is Success but mapperSuccess is null or undefined then an error is thrown', () => {
      const successTry = Try.success(11);

      const getErrorMessage: FFunction1<Error, string> =
        (e: Error) => e.message;

      // @ts-ignore
      expect(() => successTry.transform(getErrorMessage, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => successTry.transform(getErrorMessage, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Try instance is Failure then mapperFailure is invoked and mapperSuccess is not', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const getErrorMessage: FFunction1<Error, string> =
        (e: Error) => e.message;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);
      const getErrorMessageSpy = jasmine.createSpy('getErrorMessage', getErrorMessage);

      const failureTry: Try<number> = Try.failure(illegalArgumentError);

      failureTry.transform(getErrorMessageSpy, fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
      expect(getErrorMessageSpy.calls.count()).toBe(1);
    });


    it('when the Try instance is Success then mapperSuccess is invoked and mapperFailure is not', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const getErrorMessage: FFunction1<Error, string> =
        (e: Error) => e.message;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);
      const getErrorMessageSpy = jasmine.createSpy('getErrorMessage', getErrorMessage);

      const successTry: Try<number> = Try.success(11);

      successTry.transform(getErrorMessageSpy, fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
      expect(getErrorMessageSpy.calls.count()).toBe(0);
    });


    it('when the Try instance is Failure then new Try applying mapperFailure is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const fromNumToString = (n: number) => '' + n;
      const getErrorMessage = (e: Error) => e.message;

      const failureTry: Try<number> = Try.failure(illegalArgumentError);

      const result = failureTry.transform(getErrorMessage, fromNumToString);

      expect(result.isSuccess()).toBeTrue();
      expect(result.get()).toEqual(illegalArgumentError.message);
    });


    it('when the Try instance is Success then new Try applying mapperSuccess is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const getErrorMessage = (e: Error) => e.message;

      const successTry: Try<number> = Try.success(11);

      const result = successTry.transform(getErrorMessage, fromNumToString);

      expect(result.isSuccess()).toBeTrue();
      expect(result.get()).toEqual('11');
    });

  });

});




describe('Success', () => {


  describe('of', () => {

    it('when a value is given then it will be stored internally', () => {
      const intValue = 11;

      expect(Success.of<NullableOrUndefined<string>>(undefined).isSuccess()).toBeTrue();
      expect(Success.of<NullableOrUndefined<string>>(undefined).get()).toBeUndefined();

      expect(Success.of<Nullable<number>>(null).isSuccess()).toBeTrue();
      expect(Success.of<Nullable<number>>(null).get()).toBeNull();

      expect(Success.of(intValue).isSuccess()).toBeTrue();
      expect(Success.of(intValue).get()).toEqual(intValue);
    });

  });



  describe('isSuccess', () => {

    it('then true is returned', () => {
      expect(Success.of<NullableOrUndefined<string>>(undefined).isSuccess()).toBeTrue();
      expect(Success.of<Nullable<number>>(null).isSuccess()).toBeTrue();
      expect(Success.of(12).isSuccess()).toBeTrue();
    });

  });



  describe('get', () => {

    it('then internal value is returned', () => {
      expect(Success.of<NullableOrUndefined<string>>(undefined).get()).toBeUndefined();
      expect(Success.of<Nullable<number>>(null).get()).toBeNull();
      expect(Success.of(12).get()).toEqual(12);
    });

  });



  describe('getError', () => {

    it('then ReferenceError is returned', () => {
      expect(() => Success.of<NullableOrUndefined<string>>(undefined).getError()).toThrowError(ReferenceError);
      expect(() => Success.of<Nullable<number>>(null).getError()).toThrowError(ReferenceError);
      expect(() => Success.of(12).getError()).toThrowError(ReferenceError);
    });

  });

});




describe('Failure', () => {


  describe('of', () => {

    it('when null or undefined is given then an error is thrown', () => {

      // @ts-ignore
      expect(() => Failure.of(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => Failure.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a valid value is given then no error is thrown and it will be stored internally', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');
      const referenceError = new ReferenceError('ReferenceError: there was an error');

      expect(Failure.of(illegalArgumentError).isSuccess()).toBeFalse();
      expect(Failure.of(illegalArgumentError).getError()).toEqual(illegalArgumentError);

      expect(Failure.of(referenceError).isSuccess()).toBeFalse();
      expect(Failure.of(referenceError).getError()).toEqual(referenceError);
    });

  });



  describe('isSuccess', () => {

    it('then false is returned', () => {
      expect(Failure.of(new IllegalArgumentError('There was an error')).isSuccess()).toBeFalse();
      expect(Failure.of(new ReferenceError('There was an error')).isSuccess()).toBeFalse();
    });

  });



  describe('get', () => {

    it('then internal error is thrown', () => {
      expect(() => Failure.of(new IllegalArgumentError('There was an error')).get()).toThrowError(IllegalArgumentError);
      expect(() => Failure.of(new ReferenceError('There was an error')).get()).toThrowError(ReferenceError);
    });

  });



  describe('getError', () => {

    it('then internal error is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');
      const referenceError = new ReferenceError('ReferenceError: there was an error');

      expect(Failure.of(illegalArgumentError).getError()).toEqual(illegalArgumentError);
      expect(Failure.of(referenceError).getError()).toEqual(referenceError);
    });

  });

});
