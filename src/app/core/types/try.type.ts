import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Optional } from '@app-core/types';
import {
  Function0,
  Function1,
  Function2,
  Function3,
  Function4,
  Function5,
  TFunction0,
  TFunction1,
  TFunction2,
  TFunction3,
  TFunction4,
  TFunction5
} from '@app-core/types/function';

/**
 *    Represents a computation that may either result in an error, or return a successfully computed value. It's
 * similar to, but semantically different from the {@link Either} type.
 * <p>
 *  Instances of {@link Try}, are either an instance of {@link Success} or {@link Failure}.
 * <p>
 *    For example, {@link Try} can be used to perform division on a user-defined input, without the need to do
 * explicit error-handling in all the places that an error might occur.
 *
 * @typeParam <T>
 *    Value type in the case of {@link Success}
 */
export abstract class Try<T> {

  /**
   * Gets the value of this {@link Try} if is a {@link Success} or throws if this is an {@link Failure}.
   *
   * @return the {@link Success} value
   *
   * @throws {@link Failure#error} if this is an {@link Failure}
   */
  abstract get(): T;


  /**
   * Returns `true` is this is a {@link Success}, `false` otherwise.
   */
  abstract isSuccess(): boolean;


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
   * Creates a {@link Success} invoking the provided {@link TFunction0}.
   *
   * @param func
   *    {@link TFunction0} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error invoking {@link TFunction0},
   *         {@link Failure} otherwise
   */
  static ofFunction0 = <T>(func: TFunction0<T>): Try<T> => {
    try {
      return this.success(
        Function0.of(func)
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
   * Creates a {@link Success} invoking the provided {@link TFunction1} with given `t1`.
   *
   * @param t1
   *    Input parameter used by given {@link TFunction1}
   * @param func
   *    {@link TFunction1} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error invoking {@link TFunction1},
   *         {@link Failure} otherwise
   */
  static ofFunction1 = <T1, R>(t1: T1,
                               func: TFunction1<T1, R>): Try<R> => {
    try {
      return this.success(
        Function1.of(func)
          .apply(t1)
      );

    } catch (error) {
      const finalError = error instanceof Error
        ? error
        : new Error('An unknown error was thrown, error = ' + error);

      return this.failure(finalError);
    }
  }


  /**
   * Creates a {@link Success} invoking the provided {@link TFunction2} with given input parameters.
   *
   * @param t1
   *    First input parameter used by given {@link TFunction2}
   * @param t2
   *    Second input parameter used by given {@link TFunction2}
   * @param func
   *    {@link TFunction2} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error invoking {@link TFunction2},
   *         {@link Failure} otherwise
   */
  static ofFunction2 = <T1, T2, R>(t1: T1,
                                   t2: T2,
                                   func: TFunction2<T1, T2, R>): Try<R> => {
    try {
      return this.success(
        Function2.of(func)
          .apply(t1, t2)
      );

    } catch (error) {
      const finalError = error instanceof Error
        ? error
        : new Error('An unknown error was thrown, error = ' + error);

      return this.failure(finalError);
    }
  }


  /**
   * Creates a {@link Success} invoking the provided {@link TFunction3} with given input parameters.
   *
   * @param t1
   *    First input parameter used by given {@link TFunction3}
   * @param t2
   *    Second input parameter used by given {@link TFunction3}
   * @param t3
   *    Third input parameter used by given {@link TFunction3}
   * @param func
   *    {@link TFunction3} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error invoking {@link TFunction3},
   *         {@link Failure} otherwise
   */
  static ofFunction3 = <T1, T2, T3, R>(t1: T1,
                                       t2: T2,
                                       t3: T3,
                                       func: TFunction3<T1, T2, T3, R>): Try<R> => {
    try {
      return this.success(
        Function3.of(func)
          .apply(t1, t2, t3)
      );

    } catch (error) {
      const finalError = error instanceof Error
        ? error
        : new Error('An unknown error was thrown, error = ' + error);

      return this.failure(finalError);
    }
  }


  /**
   * Creates a {@link Success} invoking the provided {@link TFunction4} with given input parameters.
   *
   * @param t1
   *    First input parameter used by given {@link TFunction4}
   * @param t2
   *    Second input parameter used by given {@link TFunction4}
   * @param t3
   *    Third input parameter used by given {@link TFunction4}
   * @param t4
   *    Fourth input parameter used by given {@link TFunction4}
   * @param func
   *    {@link TFunction4} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error invoking {@link TFunction4},
   *         {@link Failure} otherwise
   */
  static ofFunction4 = <T1, T2, T3, T4, R>(t1: T1,
                                           t2: T2,
                                           t3: T3,
                                           t4: T4,
                                           func: TFunction4<T1, T2, T3, T4, R>): Try<R> => {
    try {
      return this.success(
        Function4.of(func)
          .apply(t1, t2, t3, t4)
      );

    } catch (error) {
      const finalError = error instanceof Error
        ? error
        : new Error('An unknown error was thrown, error = ' + error);

      return this.failure(finalError);
    }
  }


  /**
   * Creates a {@link Success} invoking the provided {@link TFunction5} with given input parameters.
   *
   * @param t1
   *    First input parameter used by given {@link TFunction5}
   * @param t2
   *    Second input parameter used by given {@link TFunction5}
   * @param t3
   *    Third input parameter used by given {@link TFunction5}
   * @param t4
   *    Fourth input parameter used by given {@link TFunction5}
   * @param t5
   *    Fifth input parameter used by given {@link TFunction5}
   * @param func
   *    {@link TFunction4} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error invoking {@link TFunction5},
   *         {@link Failure} otherwise
   */
  static ofFunction5 = <T1, T2, T3, T4, T5, R>(t1: T1,
                                               t2: T2,
                                               t3: T3,
                                               t4: T4,
                                               t5: T5,
                                               func: TFunction5<T1, T2, T3, T4, T5, R>): Try<R> => {
    try {
      return this.success(
        Function5.of(func)
          .apply(t1, t2, t3, t4, t5)
      );

    } catch (error) {
      const finalError = error instanceof Error
        ? error
        : new Error('An unknown error was thrown, error = ' + error);

      return this.failure(finalError);
    }
  }


  /**
   * Creates a {@link Success} that contains the given `value`.
   *
   * @param value
   *    The value to store in the returned {@link Success}
   *
   * @return {@link Success} with the provided `value`
   */
  static success = <T>(value: T): Try<T> =>
    Success.of(value);


  /**
   * Creates a {@link Failure} describing the given non-`null` and non-`undefined` error.
   *
   * @param error
   *    {@link Error} to store, which must be non-`null` and non-`undefined`
   *
   * @return {@link Failure} with the provided `error`
   *
   * @throws {@link IllegalArgumentError} if `error` is `null` or `undefined`
   */
  static failure = <T>(error: Error): Try<T> =>
    Failure.of(error);


  /**
   * Merge given `t` with this {@link Try}, managing the following use cases:
   * <p>
   *   1. this = {@link Success}, t = {@link Success}  =>  return a {@link Success} instance applying `mapperSuccess`
   *   2. this = {@link Success}, t = {@link Failure}  =>  return the {@link Failure}
   *   3. this = {@link Failure}, t = {@link Success}  =>  return the {@link Failure}
   *   4. this = {@link Failure}, t = {@link Failure}  =>  return a {@link Failure} instance applying `mapperLeft`
   *
   * If provided `t` is `null` or `undefined`, the current instance will be returned.
   *
   * @param t
   *    New {@link Try} to merge with the current one
   * @param mapperFailure
   *    {@link TFunction2} used to map this {@link Try} and given `t`, both {@link Failure}
   * @param mapperSuccess
   *    {@link TFunction2} used to map this {@link Try} and given `t`, both {@link Success}
   *
   * @return {@link Try} merging `t` with this {@link Try}
   */
  ap = (t: Try<T>,
        mapperFailure: TFunction2<Error, Error, Error>,
        mapperSuccess: TFunction2<T, T, T>): Try<T> => {

    if (ObjectUtil.isNullOrUndefined(t)) {
      return this;
    }
    // This is a Success instance
    if (this.isSuccess()) {

      // Current and given t are Success, a new merged Success instance will be returned
      if (t.isSuccess()) {
        return this.mapTry(
          t,
          mapperSuccess
        );

      // This is Success but t is Failure
      } else {
        return Try.failure(
          t.getError()
        );
      }

    // This is a Failure instance
    } else {

      // Due to only this is Failure, returns this
      if (t.isSuccess()) {
        return Try.failure(
          this.getError()
        );

      // Current and given t are Failure, a new merged Failure instance will be returned
      } else {
        return this.mapFailureTry(
          t,
          mapperFailure
        );
      }
    }
  }


  /**
   *    Applies `mapperSuccess` if this {@link Try} is a {@link Success} instance, `mapperFailure` if
   * it is an {@link Failure}, transforming internal values into another one. If `mapperSuccess` is initially
   * applied and throws an {@link Error}, then `mapperFailure` is applied with this {@link Error}.
   *
   * <pre>
   * Example:
   *   const tryResult = Try.ofFunction1(
   *      p1,
   *      (n) => {
   *         if (0 > n) {
   *           throw new SyntaxError('Invalid number');
   *         } else {
   *            return 2 * n;
   *         }
   *      }
   *   );
   *   tryResultToString = tryResult.fold((e) => e.message, (n) => 'Valid number: ' + n);
   * </pre>
   *
   * @param mapperFailure
   *    The mapping {@link TFunction1} to apply the value of a {@link Failure} instance
   * @param mapperSuccess
   *    The mapping {@link TFunction1} to apply the value of a {@link Success} instance
   *
   * @return the result of applying the right {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `mapperSuccess` is `null` or `undefined` and this {@link Try} is {@link Success}
   *                                      or `mapperFailure` is `null` or `undefined` and this {@link Try} is {@link Failure}
   */
  fold = <U>(mapperFailure: TFunction1<Error, U>,
             mapperSuccess: TFunction1<T, U>): U => {
    if (this.isSuccess()) {
      try {
        return Function1.of(mapperSuccess)
          .apply(
            this.get()
          );

      } catch (error) {
        const finalError = error instanceof Error
          ? error
          : new Error('An unknown error was thrown, error = ' + error);

        return Function1.of(mapperFailure)
          .apply(
            finalError
          );
      }
    } else {
      return Function1.of(mapperFailure)
        .apply(
          this.getError()
        );
    }
  }


  /**
   * Returns the stored value if the underline instance is {@link Success}, otherwise returns `defaultValue`.
   *
   * @param defaultValue
   *    Returned value if current instance is an {@link Failure} one
   *
   * @return @type {T} with value stored in {@link Success} instance,
   *         `defaultValue` otherwise
   */
  getOrElse = (defaultValue: T): T =>
    this.isSuccess()
      ? this.get()
      : defaultValue;


  /**
   * Returns the stored value if the underline instance is {@link Success}, otherwise returns `defaultValue`.
   *
   * @param defaultValue
   *    Returned value if current instance is an {@link Failure} one
   *
   * @return {@link Optional#empty} if this {@link Try} is an empty {@link Success} instance or provided `defaultValue` is `null` or `undefined`,
   *         {@link Optional} with the internal value if this {@link Try} is non empty {@link Success} instance,
   *         {@link Optional} with provided `defaultValue` otherwise
   */
  getOrElseOptional = (defaultValue: T): Optional<T> =>
    Optional.ofNullable(
      this.getOrElse(
        defaultValue
      )
    );


  /**
   * Verifies in this {@link Try} has no value, that is:
   * <p>
   *    1. Is a {@link Failure} one.
   *    2. Is a{@link Success} instance but its internal value is `null` or `undefined`.
   *
   * @return `true` is the current instance is empty, `false` otherwise
   */
  isEmpty = (): boolean =>
    !this.isSuccess() || ObjectUtil.isNullOrUndefined(this.get());


  /**
   *    If the current {@link Try} is an instance of {@link Success} wraps the stored value into an {@link Optional} object.
   * Otherwise return {@link Optional#empty}
   *
   * @return @return {@link Optional} if is this {@link Try} is a {@link Success} and its value is non-`null` and non-`undefined`,
   *         {@link Optional#empty} if is this {@link Try} is a {@link Success} and its value is `null` or `undefined`,
   *         {link Optional#empty} if this is an {@link Failure}
   */
  toOptional = (): Optional<T> =>
    this.isEmpty()
       ? Optional.empty<T>()
       : Optional.of(
           this.get()
         );


  /**
   *    When current {@link Try} is a {@link Success} instance and given `t` too, manages in a safe way the
   * {@link TFunction2} invocation to map both values.
   *
   * @param t
   *    New {@link Try} to merge with the current one
   * @param mapper
   *    {@link TFunction2} to apply the stored value and the one related with `t`
   *
   * @return {@link Try}
   */
  private mapTry = <U>(t: Try<T>,
                       mapper: TFunction2<T, T, U>): Try<U> => {
    try {
      return Try.success(
        Function2.of(mapper)
          .apply(
            this.get(),
            t.get()
          )
      );

    } catch (error) {
      const finalError = error instanceof Error
        ? error
        : new Error('An unknown error was thrown, error = ' + error);

      return Try.failure(finalError);
    }
  }


  /**
   *    When current {@link Try} is a {@link Failure} instance and given `t` too, manages in a safe way the
   * {@link TFunction2} invocation to map both values.
   *
   * @param t
   *    New {@link Try} to merge with the current one
   * @param mapper
   *    {@link TFunction2} to apply the stored exception and the one related with `t`
   *
   * @return {@link Try}
   */
  private mapFailureTry = (t: Try<T>,
                           mapper: TFunction2<Error, Error, Error>): Try<T> => {
    try {
      return Try.failure(
        Function2.of(mapper)
          .apply(
            this.getError(),
            t.getError()
          )
      );

    } catch (error) {
      const finalError = error instanceof Error
        ? error
        : new Error('An unknown error was thrown, error = ' + error);

      return Try.failure(finalError);
    }
  }

}




/**
 * The successful result of a {@link Try} operation.
 * <p>
 *    Both `null` and `undefined` could be stored in the internal `value` if defined @type {T}
 * allows them. Methods providing {@link Optional} as result, like {@link Success#toOptional} with take into account,
 * that is, is this {@link Success} instance is empty (`value` is `null` or `undefined`), then
 * {@link Optional#empty} will be returned.
 *
 * @typeParam <T>
 *    Value type in the case of {@link Success}
 */
export class Success<T> extends Try<T> {

  private constructor(private readonly value: T) {
    super();
  }


  /**
   * Returns an {@link Success} adding the given `value`.
   *
   * @param value
   *    The value to store
   *
   * @return an {@link Success} with the value present
   */
  static of = <T>(value: T): Success<T> => {
    return new Success<T>(value);
  }


  override get = (): T =>
    this.value;


  override getError = (): Error => {
    throw new ReferenceError("Is not possible to get exception value of a 'Success' Try");
  }


  override isSuccess = (): boolean =>
    true;

}



/**
 * The unsuccessful computation of a {@link Try} operation.
 *
 * @typeParam <T>
 *    Value type in the case of {@link Success}
 */
export class Failure<T> extends Try<T> {

  private constructor(private readonly error: Error) {
    super();
  }


  /**
   * Returns a {@link Failure} describing the given non-`null` and non-`undefined` error.
   *
   * @param error
   *    {@link Error} to store, which must be non-`null` and non-`undefined`
   *
   * @return {@link Failure}
   *
   * @throws {@link IllegalArgumentError} if `error` is `null` or `undefined`
   */
  static of = <T>(error: Error): Failure<T> => {
    AssertUtil.notNullOrUndefined(error);
    return new Failure<T>(error);
  }


  override get = (): T => {
    throw this.error;
  }


  override getError = (): Error =>
    this.error;


  override isSuccess = (): boolean =>
    false;

}
