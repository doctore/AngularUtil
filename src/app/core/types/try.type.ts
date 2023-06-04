import { AssertUtil } from '@app-core/util';
import { Function0, Nullable, Optional, TFunction0 } from '@app-core/types';
import * as _ from 'lodash';

/**
 *    Represents a computation that may either result in an error, or return a successfully computed value. It's
 * similar to, but semantically different from the {@link Either} type.
 * <p>
 *  Instances of {@link Try}, are either an instance of {@link Success} or {@link Failure}.
 * <p>
 *    For example, {@link Try} can be used to perform division on a user-defined input, without the need to do
 * explicit error-handling in all the places that an error might occur.
 *
 * @typeParam<T>
 *    Value type in the case of {@link Success}
 */
export abstract class Try<T> {

  /**
   * Gets the value of this {@link Try} if is a {@link Success} or throws if this is an {@link Failure}.
   *
   * @return the {@link Success} value
   *
   * @throws {@code Failure#error} if this is an {@link Failure}
   */
  abstract get(): Nullable<T>;


  /**
   * Returns {@code true} is this is a {@link Success}, {@code false} otherwise.
   */
  abstract isSuccess(): boolean;


  /**
   * Gets the value of this {@link Try} if is a {@link Success} or throws if this is an {@link Failure}.
   *
   * @return {@link Optional} if is this {@link Try} is a {@link Success} and its value is non-{@code null},
   *         {@link Optional#empty} if is this {@link Try} is a {@link Success} and its value is {@code null},
   *         {@code Failure#error} if this is an {@link Failure}
   *
   * @throws {@code Failure#error} if this is an {@link Failure}
   */
  abstract getOptional(): Optional<T>;


  /**
   *    Gets the {@link Error} of this {@link Try} if is a {@link Failure} or throws {@link ReferenceError}
   * if this is an {@link Success}.
   *
   * @return the {@link Failure} error
   *
   * @throws {@link ReferenceError} if this is an {@link Success}
   */
  abstract getError(): Error;


  /**
   * Creates a {@link Success} that contains the given {@code supplier}.
   *
   * @param supplier
   *    {@link TFunction0} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error applying {@link TFunction0},
   *         {@link Failure} otherwise
   */
  static ofFunction0 = <T>(supplier: TFunction0<T>): Try<T> => {
    try {
      return this.success(
        Function0.of(supplier)
          .apply()
      );

    } catch (error) {
      const finalError = error instanceof Error
        ? error
        : new Error('An unknown error was thrown, error = ' + error);

      return this.failure(finalError);
    }
  }


  /**
   * Creates a {@link Success} that contains the given {@code value}.
   *
   * @param value
   *    The value to store in the returned {@link Success}
   *
   * @return {@link Success} with the provided {@code value}
   */
  static success = <T>(value?: Nullable<T>): Try<T> =>
    Success.ofNullable(value);


  /**
   * Creates a {@link Failure} describing the given non-{@code null} and non-{@code undefined} error.
   *
   * @param error
   *    {@link Error} to store, which must be non-{@code null} and non-{@code undefined}
   *
   * @return {@link Failure} with the provided {@code error}
   *
   * @throws {@link IllegalArgumentError} if {@code error} is {@code null} or {@code undefined}
   */
  static failure = <T>(error: Error): Try<T> =>
    Failure.of(error);


  /**
   * Returns the stored value if the underline instance is {@link Success}, otherwise returns {@code defaultValue}.
   *
   * @param defaultValue
   *    Returned value if current instance is an {@link Failure} one
   *
   * @return {@code T} (or {@code null}) value stored in {@link Success} instance,
   *         {@code defaultValue} otherwise
   */
  getOrElse = (defaultValue: Nullable<T>): Nullable<T> =>
    this.isSuccess()
      ? this.get()
      : defaultValue;


  /**
   * Returns the stored value if the underline instance is {@link Success}, otherwise returns {@code defaultValue}.
   *
   * @param defaultValue
   *    Returned value if current instance is an {@link Failure} one
   *
   * @return {@link Optional#empty} if this {@link Try} is an empty {@link Success} instance or provided {@code defaultValue} is {@code null},
   *         {@link Optional} with the internal value if this {@link Try} is non empty {@link Success} instance,
   *         {@link Optional} with provided {@code defaultValue} otherwise
   */
  getOrElseOptional = (defaultValue: Nullable<T>): Optional<T> =>
    Optional.ofNullable(
      this.getOrElse(
        defaultValue
      )
    );

}




/**
 * The successful result of a {@link Try} operation.
 *
 * @typeParam<T>
 *    Value type in the case of {@link Success}
 */
export class Success<T> extends Try<T> {

  private constructor(private readonly value: Nullable<T> = null) {
    super();
  }


  /**
   * Returns an empty {@link Success} instance. No value is present for this one.
   *
   * @return an empty {@link Success}
   */
  static empty = <T>(): Success<T> =>
    new Success<T>(null);


  /**
   * Returns an {@link Success} adding the given non-{@code null} and non-{@code undefined} value.
   *
   * @param value
   *    The value to store, which must be non-{@code null} and non-{@code undefined}
   *
   * @return an {@link Success} with the value present
   *
   * @throws {@link IllegalArgumentError} if {@code value} is {@code null} or {@code undefined}
   */
  static of = <T>(value: T): Success<T> => {
    AssertUtil.notNullOrUndefined(value);
    return new Success<T>(value);
  }


  /**
   *    Returns an {@link Success} adding the given value, if non-{@code null} and non-{@code undefined},
   * otherwise returns an empty {@link Success}.
   *
   * @param value
   *    The possibly-{@code null} or possibly-{@code undefined} value to store
   *
   * @return an {@link Success} with a present value if the specified value is non-{@code null} and non-{@code undefined},
   *         an empty {@link Success} otherwise
   */
  static ofNullable = <T>(value?: Nullable<T>): Success<T> =>
    _.isNil(value)
      ? Success.empty<T>()
      : Success.of(value);


  override get = (): Nullable<T> =>
    this.value;


  override getError = (): Error => {
    throw new ReferenceError("Is not possible to get exception value of a 'Success' Try");
  }


  override getOptional = (): Optional<T> =>
    Optional.ofNullable(this.value);


  override isSuccess = (): boolean =>
    true;

}



/**
 * The unsuccessful computation of a {@link Try} operation.
 *
 * @typeParam<T>
 *    Value type in the case of {@link Success}
 */
export class Failure<T> extends Try<T> {

  private constructor(private readonly error: Error) {
    super();
  }


  /**
   * Returns a {@link Failure} describing the given non-{@code null} and non-{@code undefined} error.
   *
   * @param error
   *    {@link Error} to store, which must be non-{@code null} and non-{@code undefined}
   *
   * @return {@link Failure}
   *
   * @throws {@link IllegalArgumentError} if {@code error} is {@code null} or {@code undefined}
   */
  static of = <T>(error: Error): Failure<T> => {
    AssertUtil.notNullOrUndefined(error);
    return new Failure<T>(error);
  }


  override get = (): Nullable<T> => {
    throw this.error;
  }


  override getError = (): Error =>
    this.error;


  override getOptional = (): Optional<T> => {
    throw this.error;
  }


  override isSuccess = (): boolean =>
    false;

}
