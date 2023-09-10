import { ArrayUtil, ObjectUtil } from '@app-core/util';
import { Comparable } from '@app-core/types/comparator';
import { NullableOrUndefined } from '@app-core/types';
import { Optional } from '@app-core/types/functional';

/**
 * Class used to validate the given instance, defining 2 different status to manage the result:
 * <p>
 *    {@link Valid} the instance has verified all provided validations
 *    {@link Invalid} with the array of validations the given instance does not verify
 *
 * @typeParam  <T>
 *    Type of the {@link Valid} value of an {@link Validation}
 * @typeParam  <E>
 *    Type of the {@link Invalid} value of an {@link Validation}
 */
export abstract class Validation<E, T> {

  /**
   * Gets the value of this {@link Validation} if is a {@link Valid} or throws {@link ReferenceError} if this is a {@link Invalid}.
   *
   * @return the {@link Valid} value
   *
   * @throws {@link ReferenceError} if this is an {@link Left}
   */
  abstract get(): T;


  /**
   * Gets the value of this {@link Validation} if is a {@link Invalid} or throws {@link ReferenceError} if this is a {@link Valid}.
   *
   * @return the {@link Invalid} value
   *
   * @throws {@link ReferenceError} if this is a {@link Valid}
   */
  abstract getErrors(): E[];


  /**
   * Returns `true` is this is a {@link Valid}, `false` otherwise.
   */
  abstract isValid(): boolean;


  /**
   * Creates a {@link Valid} that contains the given `value`.
   *
   * @param value
   *    The value to store in the returned {@link Valid}
   *
   * @return {@link Valid} with the provided `value`
   */
  static valid = <E, T>(value: T): Validation<E, T> =>
    Valid.of<E, T>(value);


  /**
   * Creates an {@link Invalid} that contains the given `errors`.
   *
   * @param errors
   *    Array of errors to include in the returned {@link Invalid}
   *
   * @return {@link Invalid} with provided `errors`
   */
  static invalid = <E, T>(errors: E[]): Validation<E, T> =>
    Invalid.of<E, T>(errors);


  /**
   * Merge given `validation` with this {@link Validation}, managing the following use cases:
   * <p>
   *   1. `this` = {@link Valid},   `validation` = {@link Valid}    =>  return a {@link Valid} instance with the value of `validation`
   *   2. `this` = {@link Valid},   `validation` = {@link Invalid}  =>  return an {@link Invalid} instance with the errors of `validation`
   *   3. `this` = {@link Invalid}, `validation` = {@link Valid}    =>  return an {@link Invalid} instance with the errors of `this`
   *   4. `this` = {@link Invalid}, `validation` = {@link Invalid}  =>  return an {@link Invalid} instance with the errors of `this` and `validation`
   *
   * @apiNote
   *    If provided `validation` is `null` or `undefined`, the current instance will be returned.
   *
   * @param validation
   *    New {@link Validation} to merge with the current one
   *
   * @return {@link Validation} merging `validation` with this {@link Validation}
   */
  ap = (validation: Validation<E, T>): Validation<E, T> => {
    if (ObjectUtil.isNullOrUndefined(validation)) {
      return this;
    }
    // This is a Valid instance
    if (this.isValid()) {

      // Current and given validation are Valid, a Valid instance will be returned
      if (validation.isValid()) {
        return Validation.valid<E, T>(
          validation.get()
        );
      }
      // This is Valid but validation is Invalid
      return Validation.invalid<E, T>(
        validation.getErrors()
      );

    // This is an Invalid instance
    } else {

      // Due to only this is Invalid, return only its errors
      if (validation.isValid()) {
        return Validation.invalid<E, T>(
          this.getErrors()
        );
      }
      // Current and given validation are Invalid, a new Invalid instance adding both errors will be returned
      return Validation.invalid<E, T>(
        this.getErrors()
          .concat(
            validation.getErrors()
          )
      );
    }
  }


  /**
   * Verifies in the current instance has no value, that is:
   * <p>
   *    1. Is a {@link Invalid} one.
   *    2. Is an empty {@link Valid} instance.
   *
   * @return `true` is the current instance is empty, `false` otherwise
   */
  isEmpty = (): boolean =>
    !this.isValid() ||
      ObjectUtil.isNullOrUndefined(
        this.get()
      );

}




/**
 * An valid {@link Validation}.
 *
 * @typeParam <T>
 *    Type of the {@link Valid} value of an {@link Validation}
 * @typeParam <E>
 *    Type of the {@link Invalid} value of an {@link Validation}
 */
export class Valid<E, T> extends Validation<E, T> {

  private constructor(private readonly value: T) {
    super();
  }


  /**
   * Returns an {@link Valid} adding the given `value`.
   *
   * @param value
   *    The value to store
   *
   * @return an {@link Valid} with the value present
   */
  static of = <E, T>(value: T): Valid<E, T> =>
    new Valid<E, T>(value);


  override get = (): T =>
    this.value;


  override getErrors = (): E[] => {
    throw new ReferenceError("Is not possible to get errors of a 'Valid' Validation");
  }


  override isValid = (): boolean =>
    true;

}




/**
 * An invalid {@link Validation}.
 *
 * @typeParam <T>
 *    Type of the {@link Valid} value of an {@link Validation}
 * @typeParam <E>
 *    Type of the {@link Invalid} value of an {@link Validation}
 */
export class Invalid<E, T> extends Validation<E, T> {

  private constructor(private readonly errors: E[]) {
    super();
  }


  /**
   * Returns an {@link Invalid} describing the given array of errors.
   *
   * @param errors
   *    Array of errors to include in the returned {@link Invalid}
   *
   * @return {@link Invalid}
   */
  static of = <E, T>(errors: E[]) =>
    new Invalid<E, T>(
      ArrayUtil.isEmpty(errors)
        ? []
        : errors
    );


  override get = (): T => {
    throw new ReferenceError("Is not possible to get a value of an 'Invalid' Validation");
  }


  override getErrors = (): E[] =>
    this.errors;


  override isValid = (): boolean =>
    false;

}




/**
 * Helper class used to manage error messages validating provided class instances. Includes 2 properties:
 * <p>
 *   - `priority`: defines the importance of the error (higher means higher priority)
 *   - `errorMessage`: string providing more information about the error
 */
export class ValidationError implements Comparable<ValidationError> {

  private constructor(private readonly priority: number = 0,
                      private readonly errorMessage: string) {}


  /**
   * Returns an {@link ValidationError} adding the given `priority` and `errorMessage`.
   *
   * @param priority
   *    The importance of the new returned {@link ValidationError}
   * @param errorMessage
   *    String providing more information about the error
   *
   * @return an {@link ValidationError}
   */
  static of = (priority: number,
               errorMessage: string): ValidationError =>
    new ValidationError(
      priority,
      errorMessage
    );


  /**
   * Compares `this` object with the given `other` for order.
   *
   * @param other
   *    {@link ValidationError} to compare
   *
   * @return negative number, zero, or a positive number as `this` object is less than, equal to, or greater than `other`
   */
  compareTo = (other: NullableOrUndefined<ValidationError>): number =>
    Optional.ofNullable(other)
      .map<number>(o => this.getPriority() - o.getPriority())
      .getOrElse(1);


  getErrorMessage = (): string =>
    this.errorMessage;


  getPriority = (): number =>
    this.priority;

}
