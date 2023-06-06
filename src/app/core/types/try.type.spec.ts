import { Failure, FFunction0, Function0, Nullable, NullableOrUndefined, Success, Try } from '@app-core/types';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/try.type.spec.ts
 */
describe('Try', () => {


  describe('ofFunction0', () => {

    it('when no supplier is provided then a Failure with the error is returned', () => {
      // @ts-ignore
      const tryResult = Try.ofFunction0(null);

      expect(tryResult.isSuccess()).toBeFalse();
      expect(tryResult.getError() instanceof IllegalArgumentError).toBeTrue();
    });


    it('when applying providing supplier no error if thrown then a Success with the result value is returned', () => {
      const returnedValue: string = 'abc';
      const supplier: FFunction0<string> =
        () => returnedValue;

      const tryResult = Try.ofFunction0(supplier);

      expect(tryResult.isSuccess()).toBeTrue();
      expect(tryResult.get()).toEqual(returnedValue);
    });


    it('when applying providing supplier an error if thrown then a Failure with the error is returned', () => {
      const returnedError: Error = new SyntaxError('There was an error');
      const supplier: Function0<number> =
        Function0.of(
          () => { throw returnedError; }
        );

      const tryResult = Try.ofFunction0(supplier);

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



  describe('getOptional', () => {

    it('when internal value is null then empty Optional is returned', () => {
      expect(Success.of<NullableOrUndefined<string>>(undefined).getOrElseOptional('11').isPresent()).toBeFalse();
      expect(Success.of<Nullable<number>>(null).getOrElseOptional(20).isPresent()).toBeFalse();
    });


    it('when internal value is not null then an Optional storing such value is returned', () => {
      expect(Success.of(12).getOptional().isPresent()).toBeTrue();
      expect(Success.of(12).getOptional().get()).toEqual(12);

      expect(Success.of('abc').getOptional().isPresent()).toBeTrue();
      expect(Success.of('abc').getOptional().get()).toEqual('abc');
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



  describe('getOptional', () => {

    it('then internal error is thrown', () => {
      expect(() => Failure.of(new IllegalArgumentError('There was an error')).get()).toThrowError(IllegalArgumentError);
      expect(() => Failure.of(new ReferenceError('There was an error')).get()).toThrowError(ReferenceError);
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
