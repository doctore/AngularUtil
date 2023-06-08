import { Failure, Nullable, NullableOrUndefined, Success, Try } from '@app-core/types';
import {
  FFunction0,
  FFunction1,
  FFunction2,
  FFunction3,
  FFunction4,
  FFunction5,
  Function0,
  Function1,
  Function2,
  Function3,
  Function4,
  Function5
} from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/try.type.spec.ts
 */
describe('Try', () => {


  describe('ofFunction0', () => {

    it('when no func is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction0(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing func no error is thrown then a Success with the result value is returned', () => {
      const returnedValue: string = 'abc';
      const func: FFunction0<string> =
        () => returnedValue;

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
      const func: FFunction1<string, number> =
        (s) => parseInt(s);

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
      const func: FFunction2<string, string, number> =
        (s1, s2) => parseInt(s1 + s2);

      const tryResult = Try.ofFunction2('1', '2', func);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(12);
    });


    it('when applying providing func an error is thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
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
      const func: FFunction3<string, string, string, number> =
        (s1, s2, s3) => parseInt(s1 + s2 + s3);

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
      const func: FFunction4<string, string, string, string, number> =
        (s1, s2, s3, s4) => parseInt(s1 + s2 + s3 + s4);

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
      const func: FFunction5<string, string, string, string, string, number> =
        (s1, s2, s3, s4, s5) => parseInt(s1 + s2 + s3 + s4 + s5);

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



  describe('success', () => {

    it('when null or undefined value is given then empty Success is returned', () => {
      expect(Try.success(null).isSuccess()).toBeTrue();
      expect(Try.success(null).get()).toBeNull();

      expect(Try.success(undefined).isSuccess()).toBeTrue();
      expect(Try.success(undefined).get()).toBeUndefined();
    });


    it('when a valid value is given then non empty Success', () => {
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

      const fromNumToString: FFunction1<number, string> =
        (n: number): string => '' + n;

      const returnErrorMessage: FFunction1<Error, string> =
        (error: Error): string => error.message;

      const result = Try.failure<number>(illegalArgumentError).fold(returnErrorMessage, fromNumToString);

      expect(result).toEqual(illegalArgumentError.message);
    });


    it('when the Try is Success then mapperSuccess result is returned', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number): string => '' + n;

      const returnErrorMessage: FFunction1<Error, string> =
        (error: Error): string => error.message;

      const result = Try.success(19).fold(returnErrorMessage, fromNumToString);

      expect(result).toEqual('19');
    });


    it('when the Try is Success but mapperSuccess throws an error then mapperFailure result is returned', () => {
      const illegalArgumentError = new IllegalArgumentError('IllegalArgumentError: there was an error');

      const fromNumToString: FFunction1<number, string> =
        (n: number): string => { throw illegalArgumentError; }

      const returnErrorMessage: FFunction1<Error, string> =
        (error: Error): string => error.message;

      const result = Try.success(19).fold(returnErrorMessage, fromNumToString);

      expect(result).toEqual(illegalArgumentError.message);
    });

  });



  describe('getOrElse', () => {

    it('when the Try instance is a Success one then the content of Success is returned', () => {
      expect(Success.of<NullableOrUndefined<string>>(undefined).getOrElse('11')).toBeUndefined();
      expect(Success.of<Nullable<number>>(null).getOrElse(20)).toBeNull();
      expect(Success.of(11).getOrElse(20)).toEqual(11);
    });


    it('when the Try instance is a Failure one then the defaultValue is returned', () => {
      const failure = Failure.of(new IllegalArgumentError('IllegalArgumentError: there was an error'));

      expect(failure.getOrElse(undefined)).toBeUndefined();
      expect(failure.getOrElse(null)).toBeNull();
      expect(failure.getOrElse(12)).toEqual(12);
    });

  });



  describe('getOrElseOptional', () => {

    it('when the Try instance is a Success one then an Optional with the content of Success is returned', () => {
      expect(Success.of<NullableOrUndefined<string>>(undefined).getOrElseOptional('11').isPresent()).toBeFalse();
      expect(Success.of<Nullable<number>>(null).getOrElseOptional(20).isPresent()).toBeFalse();

      expect(Success.of(11).getOrElseOptional(20).isPresent()).toBeTrue();
      expect(Success.of(11).getOrElseOptional(20).get()).toEqual(11);
    });


    it('when the Try instance is a Failure one then the defaultValue is returned', () => {
      const failure = Failure.of(new IllegalArgumentError('IllegalArgumentError: there was an error'));

      expect(failure.getOrElseOptional(null).isPresent()).toBeFalse();

      expect(failure.getOrElseOptional(12).isPresent()).toBeTrue();
      expect(failure.getOrElseOptional(12).get()).toEqual(12);
    });

  });



  describe('isEmpty', () => {

    it('when the Try instance is an empty Success one then true is returned', () => {
      expect(Success.of(null).isEmpty()).toBeTrue();
      expect(Success.of(undefined).isEmpty()).toBeTrue();

      expect(Success.of<NullableOrUndefined<string>>(undefined).isEmpty()).toBeTrue();
      expect(Success.of<Nullable<number>>(null).isEmpty()).toBeTrue();
    });


    it('when the Try instance is a non empty Success one then false is returned', () => {
      expect(Success.of(12).isEmpty()).toBeFalse();
      expect(Success.of('abc').isEmpty()).toBeFalse();
    });


    it('when the Try instance is a Failure one then false is returned', () => {
      expect(Failure.of(new IllegalArgumentError('IllegalArgumentError: there was an error')).isEmpty()).toBeTrue();
    });

  });



  describe('toOptional', () => {

    it('when the Try instance is an empty Success one then empty Optional is returned', () => {
      expect(Success.of(null).toOptional().isPresent()).toBeFalse();
      expect(Success.of(undefined).toOptional().isPresent()).toBeFalse();

      expect(Success.of<NullableOrUndefined<string>>(undefined).toOptional().isPresent()).toBeFalse();
      expect(Success.of<Nullable<number>>(null).toOptional().isPresent()).toBeFalse();
    });


    it('when the Try instance is a non empty Success one then non empty Optional is returned', () => {
      const intSuccess = Success.of(12);
      const stringSuccess = Success.of('abc');

      expect(intSuccess.toOptional().isPresent()).toBeTrue();
      expect(intSuccess.toOptional().get()).toEqual(intSuccess.get());

      expect(stringSuccess.toOptional().isPresent()).toBeTrue();
      expect(stringSuccess.toOptional().get()).toEqual(stringSuccess.get());
    });


    it('when the Try instance is a Failure one then empty Optional is returned', () => {
      const failure = Failure.of(new IllegalArgumentError('IllegalArgumentError: there was an error'));

      expect(failure.toOptional().isPresent()).toBeFalse();
    });

  });

});




describe('Success', () => {


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



  describe('isSuccess', () => {

    it('then true is returned', () => {
      expect(Success.of<NullableOrUndefined<string>>(undefined).isSuccess()).toBeTrue();
      expect(Success.of<Nullable<number>>(null).isSuccess()).toBeTrue();
      expect(Success.of(12).isSuccess()).toBeTrue();
    });

  });



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

});




describe('Failure', () => {


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



  describe('isSuccess', () => {

    it('then false is returned', () => {
      expect(Failure.of(new IllegalArgumentError('There was an error')).isSuccess()).toBeFalse();
      expect(Failure.of(new ReferenceError('There was an error')).isSuccess()).toBeFalse();
    });

  });



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

});
