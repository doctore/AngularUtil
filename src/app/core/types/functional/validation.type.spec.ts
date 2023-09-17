import { Invalid, Valid, Validation, ValidationError } from '@app-core/types/functional';
import { Nullable, NullableOrUndefined } from '@app-core/types';
import { TFunction0 } from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

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
