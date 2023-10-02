import { Either, Invalid, Try, Valid, Validation, ValidationError } from '@app-core/types/functional';
import { Nullable, NullableOrUndefined } from '@app-core/types';
import { FFunction1, Function1, TFunction0 } from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';
import { FPredicate1 } from '@app-core/types/predicate';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/functional/validation.type.spec.ts
 */
describe('Validation', () => {


  describe('valid', () => {

    it('a new Valid instance is returned', () => {
      expect(Validation.valid<number, NullableOrUndefined<string>>(undefined).isValid()).toBeTrue();
      expect(Validation.valid<number, NullableOrUndefined<string>>(undefined).get()).toBeUndefined();

      expect(Validation.valid<boolean, Nullable<number>>(null).isValid()).toBeTrue();
      expect(Validation.valid<boolean, Nullable<number>>(null).get()).toBeNull();

      expect(Validation.valid(12).isValid()).toBeTrue();
      expect(Validation.valid(12).get()).toEqual(12);
    });

  });



  describe('invalid', () => {

    it('a new Invalid instance is returned', () => {
      const errors = ['error1', 'error2'];

      // @ts-ignore
      expect(Validation.invalid<string, number>(undefined).isValid()).toBeFalse();
      // @ts-ignore
      expect(Validation.invalid<string, number>(undefined).getErrors()).toEqual([]);

      // @ts-ignore
      expect(Validation.invalid<string, number>(null).isValid()).toBeFalse();
      // @ts-ignore
      expect(Validation.invalid<string, number>(null).getErrors()).toEqual([]);

      expect(Validation.invalid<string, number>(errors).isValid()).toBeFalse();
      expect(Validation.invalid<string, number>(errors).getErrors()).toEqual(errors);
    });

  });



  describe('combine', () => {

    it('when given validations are null, undefined or empty then a Valid with null value is returned', () => {
      expect(Validation.combine(null).isValid()).toBeTrue();
      expect(Validation.combine(null).isValid()).toBeTrue();

      expect(Validation.combine(undefined).isValid()).toBeTrue();
      expect(Validation.combine(undefined).isValid()).toBeTrue();

      expect(Validation.combine([]).isValid()).toBeTrue();
      expect(Validation.combine([]).isValid()).toBeTrue();
    });


    it('when all validations are Valid then last Valid instance is returned', () => {
      const validations = [
        Validation.valid(12),
        Validation.valid(11),
        Validation.valid(10)
      ];

      expect(Validation.combine(validations).isValid()).toBeTrue();
      expect(Validation.combine(validations).get()).toEqual(10);
    });


    it('when all validations contain Invalid then Invalid instance merging all is returned', () => {
      const validations: Validation<string, number>[] = [
        Validation.valid(2),
        Validation.invalid(['A']),
        Validation.invalid(['B'])
      ];

      expect(Validation.combine(validations).isValid()).toBeFalse();

      verifyArrays(
        Validation.combine(validations).getErrors(),
        ['A', 'B']
      );
    });

  });



  describe('combineGetFirstInvalid', () => {

    it('when given validations are null, undefined or empty then a Valid with null value is returned', () => {
      expect(Validation.combineGetFirstInvalid(null).isValid()).toBeTrue();
      expect(Validation.combineGetFirstInvalid(null).isValid()).toBeTrue();

      expect(Validation.combineGetFirstInvalid(undefined).isValid()).toBeTrue();
      expect(Validation.combineGetFirstInvalid(undefined).isValid()).toBeTrue();

      expect(Validation.combineGetFirstInvalid([]).isValid()).toBeTrue();
      expect(Validation.combineGetFirstInvalid([]).isValid()).toBeTrue();
    });


    it('when given validations contains null or undefined elements then an error is thrown', () => {
      // @ts-ignore
      expect(() => Validation.combineGetFirstInvalid([() => Validation.valid(1), null])).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => Validation.combineGetFirstInvalid([undefined, () => Validation.valid(1)])).toThrowError(IllegalArgumentError);
    });


    it('when all validations are Valid then last Valid instance is returned', () => {
      const validations = [
        () => Validation.valid(12),
        () => Validation.valid(11),
        () => Validation.valid(10)
      ];

      expect(Validation.combineGetFirstInvalid(validations).isValid()).toBeTrue();
      expect(Validation.combineGetFirstInvalid(validations).get()).toEqual(10);
    });


    it('when all validations contain Invalid then first Invalid instance is returned', () => {
      const validations: TFunction0<Validation<string, number>>[] = [
        () => Validation.valid(2),
        () => Validation.invalid(['A']),
        () => Validation.invalid(['B'])
      ];

      expect(Validation.combineGetFirstInvalid(validations).isValid()).toBeFalse();

      verifyArrays(
        Validation.combineGetFirstInvalid(validations).getErrors(),
        ['A']
      );
    });

  });



  describe('fromEither', () => {

    it('when the Either instance is an empty Right one then empty Valid is returned', () => {
      expect(Validation.fromEither(Either.right(null)).isValid()).toBeTrue();
      expect(Validation.fromEither(Either.right(null)).get()).toBeNull();

      expect(Validation.fromEither(Either.right(undefined)).isValid()).toBeTrue();
      expect(Validation.fromEither(Either.right(undefined)).get()).toBeUndefined();
    });


    it('when the Either instance is a non empty Right one then non empty Valid is returned', () => {
      const intRight = Either.right(12);
      const stringRight = Either.right('abc');

      expect(Validation.fromEither(intRight).isValid()).toBeTrue();
      expect(Validation.fromEither(intRight).get()).toEqual(intRight.get());

      expect(Validation.fromEither(stringRight).isValid()).toBeTrue();
      expect(Validation.fromEither(stringRight).get()).toEqual(stringRight.get());
    });


    it('when the Either instance is a Left one then an Invalid instance is returned', () => {
      const left = Either.left(true);

      expect(Validation.fromEither(left).isValid()).toBeFalse();
      expect(Validation.fromEither(left).getErrors()).toEqual([left.getLeft()]);
    });

  });



  describe('fromTry', () => {

    it('when the Try instance is an empty Success one then empty Valid is returned', () => {
      expect(Validation.fromTry(Try.success(null)).isValid()).toBeTrue();
      expect(Validation.fromTry(Try.success(null)).get()).toBeNull();

      expect(Validation.fromTry(Try.success(undefined)).isValid()).toBeTrue();
      expect(Validation.fromTry(Try.success(undefined)).get()).toBeUndefined();
    });


    it('when the Try instance is a non empty Success one then non empty Valid is returned', () => {
      const intSuccess = Try.success(12);
      const stringSuccess = Try.success('abc');

      expect(Validation.fromTry(intSuccess).isValid()).toBeTrue();
      expect(Validation.fromTry(intSuccess).get()).toEqual(intSuccess.get());

      expect(Validation.fromTry(stringSuccess).isValid()).toBeTrue();
      expect(Validation.fromTry(stringSuccess).get()).toEqual(stringSuccess.get());
    });


    it('when the Try instance is a Failure one then an Invalid instance is returned', () => {
      const error = new IllegalArgumentError('IllegalArgumentError: there was an error');
      const failure = Try.failure(error);

      expect(Validation.fromTry(failure).isValid()).toBeFalse();
      expect(Validation.fromTry(failure).getErrors()).toEqual([failure.getError()]);
    });

  });



  describe('ap', () => {

    it('when given validation is null or undefined then this Validation is returned', () => {
      const valid = Validation.valid(19);
      const invalid = Validation.invalid(['Error1']);

      // @ts-ignore
      expect(valid.ap(null).isValid()).toBeTrue();
      // @ts-ignore
      expect(valid.ap(null)).toEqual(valid);

      // @ts-ignore
      expect(invalid.ap(undefined).isValid()).toBeFalse();
      // @ts-ignore
      expect(invalid.ap(undefined)).toEqual(invalid);
    });


    it('when given validation and this are Valid then new Valid is returned', () => {
      const v1 = Validation.valid(11);
      const v2 = Validation.valid(19);

      expect(v1.ap(v2).isValid()).toBeTrue();
      expect(v1.ap(v2).get()).toEqual(v2.get());

      expect(v2.ap(v1).isValid()).toBeTrue();
      expect(v2.ap(v1).get()).toEqual(v1.get());
    });


    it('when given validation is Invalid and this is Valid then new Invalid is returned', () => {
      const valid = Validation.valid<string, number>(19);
      const invalid = Validation.invalid<string, number>(['Error1']);

      expect(valid.ap(invalid).isValid()).toBeFalse();
      expect(valid.ap(invalid).getErrors()).toEqual(invalid.getErrors());
    });


    it('when given validation is Valid and this is Invalid then new Invalid is returned', () => {
      const valid = Validation.valid<string, number>(19);
      const invalid = Validation.invalid<string, number>(['Error1']);

      expect(invalid.ap(valid).isValid()).toBeFalse();
      expect(invalid.ap(valid).getErrors()).toEqual(invalid.getErrors());
    });


    it('when given validation and this are Invalid then new Invalid concatenating both errors is returned', () => {
      // @ts-ignore
      const i1 = Validation.invalid<string, number>(null);
      const i2 = Validation.invalid<string, number>(['Error1']);
      const i3 = Validation.invalid<string, number>(['Error2', 'Error3']);

      expect(i1.ap(i2).isValid()).toBeFalse();
      expect(i1.ap(i2).getErrors()).toEqual(i2.getErrors());

      expect(i1.ap(i3).isValid()).toBeFalse();
      expect(i1.ap(i3).getErrors()).toEqual(i3.getErrors());

      expect(i2.ap(i1).isValid()).toBeFalse();
      expect(i2.ap(i1).getErrors()).toEqual(i2.getErrors());

      expect(i2.ap(i3).isValid()).toBeFalse();
      expect(i2.ap(i3).getErrors()).toEqual(i2.getErrors().concat(i3.getErrors()));

      expect(i3.ap(i1).isValid()).toBeFalse();
      expect(i3.ap(i1).getErrors()).toEqual(i3.getErrors());

      expect(i3.ap(i2).isValid()).toBeFalse();
      expect(i3.ap(i2).getErrors()).toEqual(i3.getErrors().concat(i2.getErrors()));
    });

  });



  describe('filter', () => {

    it('when given Validation is an Invalid one then such instance is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: number) => 1 == n % 2;

      const v1 = Validation.invalid<string, number>(['Error1']);
      const v2 = Validation.invalid<string, number>(['Error2', 'Error3']);

      const v1Result = v1.filter(isOdd);
      const v2Result = v2.filter(isOdd);

      expect(v1Result).toBeDefined();
      expect(v1Result!.isValid()).toBeFalse();
      expect(v1Result!.getErrors()).toEqual(v1.getErrors());

      expect(v2Result).toBeDefined();
      expect(v2Result!.isValid()).toBeFalse();
      expect(v2Result!.getErrors()).toEqual(v2.getErrors());
    });


    it('when given Validation is a Valid one but predicate is null or undefined then such instance is returned', () => {
      const v1 = Validation.valid<string, number>(11);
      const v2 = Validation.valid<string, number>(19);

      // @ts-ignore
      const v1Result = v1.filter(null);
      // @ts-ignore
      const v2Result = v2.filter(undefined);

      expect(v1Result).toBeDefined();
      expect(v1Result!.isValid()).toBeTrue();
      expect(v1Result!.get()).toEqual(v1.get());

      expect(v2Result).toBeDefined();
      expect(v2Result!.isValid()).toBeTrue();
      expect(v2Result!.get()).toEqual(v2.get());
    });


    it('when given Validation is a Valid one but does not match with provided predicate then undefined is returned', () => {
      const isEven = (n: number) => 0 == n % 2;

      const v1 = Validation.valid(11);
      const v2 = Validation.valid(19);

      expect(v1.filter(isEven)).toBeUndefined();
      expect(v2.filter(isEven)).toBeUndefined();
    });


    it('when given Validation is a Valid one and matches with provided predicate then such instance is returned', () => {
      const isOdd = (n: number) => 1 == n % 2;

      const v1 = Validation.valid(11);
      const v2 = Validation.valid(19);

      const v1Result = v1.filter(isOdd);
      const v2Result = v2.filter(isOdd);

      expect(v1Result).toBeDefined();
      expect(v1Result!.isValid()).toBeTrue();
      expect(v1Result!.get()).toEqual(v1.get());

      expect(v2Result).toBeDefined();
      expect(v2Result!.isValid()).toBeTrue();
      expect(v2Result!.get()).toEqual(v2.get());
    });

  });



  describe('filterOptional', () => {

    it('when given Validation is an Invalid one then not empty Optional containing such instance is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: number) => 1 == n % 2;

      const v1 = Validation.invalid<string, number>(['Error1']);
      const v2 = Validation.invalid<string, number>(['Error2', 'Error3']);

      const v1Result = v1.filterOptional(isOdd);
      const v2Result = v2.filterOptional(isOdd);

      expect(v1Result.isPresent()).toBeTrue();
      expect(v1Result.get().isValid()).toBeFalse();
      expect(v1Result.get().getErrors()).toEqual(v1.getErrors());

      expect(v2Result.isPresent()).toBeTrue();
      expect(v2Result.get().isValid()).toBeFalse();
      expect(v2Result.get().getErrors()).toEqual(v2.getErrors());
    });


    it('when given Validation is a Valid one but predicate is null or undefined then not empty Optional containing such instance is returned', () => {
      const v1 = Validation.valid<string, number>(11);
      const v2 = Validation.valid<string, number>(19);

      // @ts-ignore
      const v1Result = v1.filterOptional(null);
      // @ts-ignore
      const v2Result = v2.filterOptional(undefined);

      expect(v1Result.isPresent()).toBeTrue();
      expect(v1Result.get().isValid()).toBeTrue();
      expect(v1Result.get().get()).toEqual(v1.get());

      expect(v2Result.isPresent()).toBeTrue();
      expect(v2Result.get().isValid()).toBeTrue();
      expect(v2Result.get().get()).toEqual(v2.get());
    });


    it('when given Validation is a Valid one but does not match with provided predicate then empty Optional is returned', () => {
      const isEven = (n: number) => 0 == n % 2;

      const v1 = Validation.valid(11);
      const v2 = Validation.valid(19);

      const v1Result = v1.filterOptional(isEven);
      const v2Result = v2.filterOptional(isEven);

      expect(v1Result.isPresent()).toBeFalse();
      expect(v2Result.isPresent()).toBeFalse();
    });


    it('when given Validation is a Valid one and matches with provided predicate then such instance is returned', () => {
      const isOdd = (n: number) => 1 == n % 2;

      const v1 = Validation.valid(11);
      const v2 = Validation.valid(19);

      const v1Result = v1.filterOptional(isOdd);
      const v2Result = v2.filterOptional(isOdd);

      expect(v1Result.isPresent()).toBeTrue();
      expect(v1Result.get().isValid()).toBeTrue();
      expect(v1Result.get().get()).toEqual(v1.get());

      expect(v2Result.isPresent()).toBeTrue();
      expect(v2Result.get().isValid()).toBeTrue();
      expect(v2Result.get().get()).toEqual(v2.get());
    });

  });



  describe('filterOrElse', () => {

    it('when given Validation is an Invalid one then such instance is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: number) => 1 == n % 2;

      const errorMessage: FFunction1<number, string> =
        (n: number) => 'There was an error with ' + n;

      const v1 = Validation.invalid<string, number>(['Error1']);
      const v2 = Validation.invalid<string, number>(['Error2', 'Error3']);

      const v1Result = v1.filterOrElse(isOdd, errorMessage);
      const v2Result = v2.filterOrElse(isOdd, errorMessage);

      expect(v1Result.isValid()).toBeFalse();
      expect(v1Result.getErrors()).toEqual(v1.getErrors());

      expect(v2Result.isValid()).toBeFalse();
      expect(v2Result.getErrors()).toEqual(v2.getErrors());
    });


    it('when given Validation is a Valid one but predicate is null or undefined then such instance is returned', () => {
      const errorMessage: Function1<number, string> =
        Function1.of((n: number) => 'There was an error with ' + n);

      const v1 = Validation.valid(11);
      const v2 = Validation.valid(19);

      // @ts-ignore
      const v1Result = v1.filterOrElse(null, errorMessage);
      // @ts-ignore
      const v2Result = v2.filterOrElse(undefined, errorMessage);

      expect(v1Result.isValid()).toBeTrue();
      expect(v1Result.get()).toEqual(v1.get());

      expect(v2Result.isValid()).toBeTrue();
      expect(v2Result.get()).toEqual(v2.get());
    });


    it('when given Validation is a Valid one and matches with provided predicate then such instance is returned', () => {
      const isOdd = (n: number) => 1 == n % 2;
      const errorMessage = (n: number) => 'There was an error with ' + n;

      const v1 = Validation.valid(11);
      const v2 = Validation.valid(19);

      const v1Result = v1.filterOrElse(isOdd, errorMessage);
      const v2Result = v2.filterOrElse(isOdd, errorMessage);

      expect(v1Result.isValid()).toBeTrue();
      expect(v1Result.get()).toEqual(v1.get());

      expect(v2Result.isValid()).toBeTrue();
      expect(v2Result.get()).toEqual(v2.get());
    });


    it('when given Validation is a Valid one that does not match with provided predicate but mapper is null or undefined then an error is thrown', () => {
      const isOdd = (n: number) => 1 == n % 2;

      const v1 = Validation.valid(12);
      const v2 = Validation.valid(20);

      // @ts-ignore
      expect(() => v1.filterOrElse(isOdd, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => v2.filterOrElse(isOdd, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Validation is a Valid one that does not match with provided predicate and mapper is valid then new Invalid instance applying mapper is returned', () => {
      const isOdd = (n: number) => 1 == n % 2;
      const errorMessage = 'There was an error with 12';

      const validation = Validation.valid(12);

      const validationResult = validation.filterOrElse(isOdd, (n: number) => errorMessage);

      expect(validationResult.isValid()).toBeFalse();
      expect(validationResult.getErrors()).toEqual([errorMessage]);
    });

  });



  describe('isEmpty', () => {

    it('when the Validation instance is an empty Valid one then true is returned', () => {
      expect(Validation.valid(null).isEmpty()).toBeTrue();
      expect(Validation.valid(undefined).isEmpty()).toBeTrue();

      expect(Validation.valid<number, NullableOrUndefined<string>>(null).isEmpty()).toBeTrue();
      expect(Validation.valid<number, NullableOrUndefined<string>>(undefined).isEmpty()).toBeTrue();
    });


    it('when the Validation instance is a non-empty Valid one then false is returned', () => {
      expect(Validation.valid(12).isEmpty()).toBeFalse();
      expect(Validation.valid('abc').isEmpty()).toBeFalse();
    });


    it('when the Validation instance is an Invalid one then true is returned', () => {
      // @ts-ignore
      expect(Validation.invalid(null).isEmpty()).toBeTrue();
      // @ts-ignore
      expect(Validation.invalid(undefined).isEmpty()).toBeTrue();
      expect(Validation.invalid([12]).isEmpty()).toBeTrue();
      expect(Validation.invalid(['abc']).isEmpty()).toBeTrue();
    });

  });



  describe('map', () => {

    it('when given Validation is Valid but mapper is null or undefined then an error is thrown', () => {
      const validation = Validation.valid(11);

      // @ts-ignore
      expect(() => validation.map(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => validation.map(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Validation is Invalid then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const validation = Validation.invalid<string, number>(['Error1']);

      validation.map(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
    });


    it('when given Validation is Valid then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: number) => '' + n;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const validation = Validation.valid<string, number>(19);

      validation.map(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
    });


    it('when given Validation is Invalid then same one is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const validation = Validation.invalid<string, number>(['Error1', 'Error2']);

      const result = validation.map(fromNumToString);

      expect(result.isValid()).toBeFalse();
      expect(result.getErrors()).toEqual(validation.getErrors());
    });


    it('when given Validation is Valid then new Valid applying mapper is returned', () => {
      const fromNumToString = (n: number) => '' + n;
      const validation = Validation.valid<string, number>(11);

      const result = validation.map(fromNumToString);

      expect(result.isValid()).toBeTrue();
      expect(result.get()).toEqual('11');
    });

  });



  describe('mapInvalid', () => {

    it('when given Validation is Invalid but mapper is null or undefined then an error is thrown', () => {
      const validation = Validation.invalid<string, number>(['Error1', 'Error2']);

      // @ts-ignore
      expect(() => validation.mapInvalid(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => validation.mapInvalid(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given Validation is Valid then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number[], string[]> =
        (numArray: number[]) => numArray.map(n => '' + n);

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const validation = Validation.valid<number, boolean>(false);

      validation.mapInvalid(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
    });


    it('when given Validation is Invalid then mapper is invoked', () => {
      const fromNumToString: FFunction1<number[], string[]> =
        (numArray: number[]) => numArray.map(n => '' + n);

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      const validation = Validation.invalid<number, boolean>([1, 2]);

      validation.mapInvalid(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
    });


    it('when given Validation is Valid then same one is returned', () => {
      const fromNumToString = (numArray: number[]) => numArray.map(n => '' + n);
      const validation = Validation.valid<number, boolean>(false);

      const result = validation.mapInvalid(fromNumToString);

      expect(result.isValid()).toBeTrue();
      expect(result.get()).toEqual(validation.get());
    });


    it('when given Validation is Invalid then new Invalid applying mapper is returned', () => {
      const fromNumToString = (numArray: number[]) => numArray.map(n => '' + n);
      const validation = Validation.invalid<number, boolean>([1, 2]);

      const result = validation.mapInvalid(fromNumToString);

      expect(result.isValid()).toBeFalse();
      expect(result.getErrors()).toEqual(['1', '2']);
    });

  });



  describe('toEither', () => {

    it('when the Validation instance is an empty Valid one then empty Right is returned', () => {
      expect(Validation.valid(null).toEither().isRight()).toBeTrue();
      expect(Validation.valid(null).toEither().get()).toBeNull();

      expect(Validation.valid(undefined).toEither().isRight()).toBeTrue();
      expect(Validation.valid(undefined).toEither().get()).toBeUndefined();
    });


    it('when the Validation instance is a non empty Valid one then non empty Right is returned', () => {
      const intValid = Validation.valid(12);
      const stringValid = Validation.valid('abc');

      expect(intValid.toEither().isRight()).toBeTrue();
      expect(intValid.toEither().get()).toEqual(intValid.get());

      expect(stringValid.toEither().isRight()).toBeTrue();
      expect(stringValid.toEither().get()).toEqual(stringValid.get());
    });


    it('when the Validation instance is an Invalid one then a Left instance is returned', () => {
      const invalid = Validation.invalid([31]);

      expect(invalid.toEither().isRight()).toBeFalse();
      expect(invalid.toEither().getLeft()).toEqual(invalid.getErrors());
    });

  });



  describe('toOptional', () => {

    it('when the Validation instance is an empty Valid one then empty Optional is returned', () => {
      expect(Validation.valid(null).toOptional().isPresent()).toBeFalse();
      expect(Validation.valid(undefined).toOptional().isPresent()).toBeFalse();
    });


    it('when the Validation instance is a non empty Valid one then non empty Optional is returned', () => {
      const o1 = Validation.valid(11).toOptional();
      const o2 = Validation.valid('abc').toOptional();

      expect(o1.isPresent()).toBeTrue();
      expect(o1.get()).toEqual(11);

      expect(o2.isPresent()).toBeTrue();
      expect(o2.get()).toEqual('abc');
    });


    it('when the Validation instance is an Invalid one then empty Optional is returned', () => {
      // @ts-ignore
      expect(Validation.invalid(null).toOptional().isPresent()).toBeFalse();
      // @ts-ignore
      expect(Validation.invalid(undefined).toOptional().isPresent()).toBeFalse();

      expect(Validation.invalid([12]).toOptional().isPresent()).toBeFalse();
      expect(Validation.invalid(['abc']).toOptional().isPresent()).toBeFalse();
    });

  });



  function verifyArrays(actualArray: any[],
                        expectedArray: any[]) {
    expect(expectedArray.length).toEqual(actualArray.length);
    if (0 < expectedArray.length) {
      for (let i = 0; i < expectedArray.length; i++) {
        expect(expectedArray[i]).toEqual(actualArray[i]);
      }
    }
  }

});




describe('Valid', () => {


  describe('of', () => {

    it('when a value is given then new Valid instance is returned', () => {
      const intValue = 11;

      expect(Valid.of<boolean, NullableOrUndefined<string>>(undefined).isValid()).toBeTrue();
      expect(Valid.of<boolean, NullableOrUndefined<string>>(undefined).get()).toBeUndefined();

      expect(Valid.of<boolean, NullableOrUndefined<string>>(null).isValid()).toBeTrue();
      expect(Valid.of<boolean, NullableOrUndefined<string>>(null).get()).toBeNull();

      expect(Valid.of(intValue).isValid()).toBeTrue();
      expect(Valid.of(intValue).get()).toEqual(intValue);
    });

  });



  describe('get', () => {

    it('then internal value is returned', () => {
      expect(Valid.of<boolean, NullableOrUndefined<string>>(undefined).get()).toBeUndefined();
      expect(Valid.of<string, Nullable<number>>(null).get()).toBeNull();
      expect(Valid.of(12).get()).toEqual(12);
    });

  });



  describe('getErrors', () => {

    it('then ReferenceError is returned', () => {
      expect(() => Valid.of<boolean, NullableOrUndefined<string>>(undefined).getErrors()).toThrowError(ReferenceError);
      expect(() => Valid.of<string, Nullable<number>>(null).getErrors()).toThrowError(ReferenceError);
      expect(() => Valid.of(12).getErrors()).toThrowError(ReferenceError);
    });

  });



  describe('isValid', () => {

    it('then true is returned', () => {
      // @ts-ignore
      expect(Valid.of(null).isValid()).toBeTrue();
      // @ts-ignore
      expect(Valid.of(undefined).isValid()).toBeTrue();
      expect(Valid.of(19).isValid()).toBeTrue();
    });

  });

});




describe('Invalid', () => {


  describe('of', () => {

    it('when no errors are provided then new Invalid instance with empty errors is returned', () => {
      // @ts-ignore
      expect(Invalid.of<string, number>(undefined).isValid()).toBeFalse();
      // @ts-ignore
      expect(Invalid.of<string, number>(undefined).getErrors()).toEqual([]);

      // @ts-ignore
      expect(Invalid.of<string, number>(null).isValid()).toBeFalse();
      // @ts-ignore
      expect(Invalid.of<string, number>(null).getErrors()).toEqual([]);
    });


    it('when errors are provided then new Invalid instance with given errors is returned', () => {
      const errors = ['error1', 'error2'];

      expect(Invalid.of<string, number>(errors).isValid()).toBeFalse();
      expect(Invalid.of<string, number>(errors).getErrors()).toEqual(errors);
    });

  });



  describe('get', () => {

    it('then ReferenceError is returned', () => {
      // @ts-ignore
      expect(() => Invalid.of(undefined).get()).toThrowError(ReferenceError);
      // @ts-ignore
      expect(() => Invalid.of(null).get()).toThrowError(ReferenceError);
      expect(() => Invalid.of([12]).get()).toThrowError(ReferenceError);
    });

  });



  describe('getErrors', () => {

    it('then internal value is returned', () => {
      // @ts-ignore
      expect(Invalid.of(undefined).getErrors()).toEqual([]);
      // @ts-ignore
      expect(Invalid.of(null).getErrors()).toEqual([]);
      expect(Invalid.of([12]).getErrors()).toEqual([12]);
    });

  });



  describe('isValid', () => {

    it('then false is returned', () => {
      // @ts-ignore
      expect(Invalid.of(null).isValid()).toBeFalse();
      // @ts-ignore
      expect(Invalid.of(undefined).isValid()).toBeFalse();
      expect(Invalid.of([]).isValid()).toBeFalse();
    });

  });

});




describe('ValidationError', () => {


  describe('of', () => {

    it('when priority and errorMessage are given then new ValidationError instance is returned', () => {
      const priority = 11;
      const errorMessage = 'There was a problem';

      const result = ValidationError.of(priority, errorMessage);

      expect(result.getPriority()).toEqual(priority);
      expect(result.getErrorMessage()).toEqual(errorMessage);
    });

  });



  describe('compareTo', () => {

    it('when given other is null or undefined then 1 is returned', () => {
      expect(ValidationError.of(10, 'Error1').compareTo(null)).toEqual(1);
      expect(ValidationError.of(10, 'Error1').compareTo(undefined)).toEqual(1);
    });


    it('when given other is neither null nor undefined then expected comparison result is returned', () => {
      const validationError1 = ValidationError.of(10, 'Error1');
      const validationError2 = ValidationError.of(20, 'Error2');

      expect(validationError1.compareTo(validationError1)).toEqual(0);
      expect(0 > validationError1.compareTo(validationError2)).toBeTrue();

      expect(validationError2.compareTo(validationError2)).toEqual(0);
      expect(0 < validationError2.compareTo(validationError1)).toBeTrue();
    });

  });



  describe('getErrorMessage', () => {

    it('then internal errorMessage is returned', () => {
      expect(ValidationError.of(1, 'Error1').getErrorMessage()).toEqual('Error1');
      expect(ValidationError.of(2, 'Error2').getErrorMessage()).toEqual('Error2');
    });

  });



  describe('getPriority', () => {

    it('then internal priority is returned', () => {
      expect(ValidationError.of(1, 'Error1').getPriority()).toEqual(1);
      expect(ValidationError.of(2, 'Error2').getPriority()).toEqual(2);
    });

  });

});
