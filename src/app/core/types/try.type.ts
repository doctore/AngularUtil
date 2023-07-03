import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { NullableOrUndefined, Optional } from '@app-core/types';
import {
  FFunction0,
  FFunction1,
  FFunction2,
  FFunction3,
  FFunction4,
  FFunction5,
  FFunction6,
  Function0,
  Function1,
  Function2,
  Function3,
  Function4,
  Function5,
  Function6,
  TFunction0,
  TFunction1,
  TFunction2,
  TFunction3,
  TFunction4,
  TFunction5,
  TFunction6
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
export abstract class Try<T extends any> {

  private static readonly DEFAULT_ERROR_MESSAGE = 'An unknown error was thrown, error = ';


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


  static combine<T>(mapperFailure: TFunction2<Error, Error, Error>,
                    mapperSuccess: FFunction2<T, T, T>,
                    tries: NullableOrUndefined<Try<T>[]>): Try<T>;

  static combine<T>(mapperFailure: TFunction2<Error, Error, Error>,
                    mapperSuccess: TFunction2<T, T, T>,
                    tries: NullableOrUndefined<Try<T>[]>): Try<T>;

  /**
   * Merges the given `tries` in a one result that will be:
   * <p>
   *   1. {@link Success} instance if all given `tries` are {@link Success} ones or such parameters is `null`
   *      or empty. Using provided {@link TFunction2} `mapperSuccess` to get the final value added into the
   *      returned {@link Success}.
   * <p>
   *   2. {@link Failure} instance if there is at least one {@link Failure} in the given `tries`. Using provided
   *      {@link TFunction2} `mapperFailure` to get the final value added into the returned {@link Success}.
   *
   * <pre>
   * Examples:
   *
   *   mapperFailure = (f1: Error, f2: Error) => f2;
   *   mapperSuccess = (s1: number, s2: number) => s2;
   *
   *   combine(mapperFailure, mapperSuccess, [Try.success(11), Try.success(7)]);                                                 // Success(7)
   *   combine(mapperFailure, mapperSuccess, [Try.success(13), Try.failure(new TypeError())]);                                   // Failure(new TypeError())
   *   combine(mapperFailure, mapperSuccess, [Try.success(10), Try.failure(new TypeError()), Try.failure(new SyntaxError())]);   // Failure(new SyntaxError())
   * </pre>
   *
   * @param mapperFailure
   *    {@link TFunction2} used to calculate the new {@link Failure} based on two provided ones
   * @param mapperSuccess
   *    {@link FFunction2} | {@link TFunction2}  used to calculate the new {@link Success} based on two provided ones
   * @param tries
   *    {@link Try} instances to combine
   *
   * @return {@link Try}
   *
   * @throws {@link IllegalArgumentError} if `mapperFailure` or `mapperSuccess` is `null` or `undefined` but `tries` is not empty
   */
  static combine<T>(mapperFailure: TFunction2<Error, Error, Error>,
                    mapperSuccess: TFunction2<T, T, T>,
                    tries: NullableOrUndefined<Try<T>[]>): Try<T> {
    if (ArrayUtil.isEmpty(tries)) {
      // @ts-ignore
      return Try.success<T>(null);
    }
    AssertUtil.notNullOrUndefined(
      mapperFailure,
      'mapperFailure must be not null and not undefined'
    );
    AssertUtil.notNullOrUndefined(
      mapperSuccess,
      'mapperSuccess must be not null and not undefined'
    );
    const finalMapperSuccess = Function2.of(mapperSuccess);
    let result = tries![0];
    for (let i = 1; i < tries!.length; i++) {
      result = result.ap(
        tries![i],
        mapperFailure,
        finalMapperSuccess
      );
    }
    return result;
  }


  static combineGetFirstFailure<T>(mapperSuccess: FFunction2<T, T, T>,
                                   tries: NullableOrUndefined<TFunction0<Try<T>>[]>): Try<T>;

  static combineGetFirstFailure<T>(mapperSuccess: TFunction2<T, T, T>,
                                   tries: NullableOrUndefined<TFunction0<Try<T>>[]>): Try<T>;

  /**
   * Merges the given `tries` in a one result that will be:
   * <p>
   *   1. {@link Success} instance if all given `tries` are {@link Success} ones or such parameters is `null`
   *      or empty. Using provided {@link TFunction2} `mapperSuccess` to get the final value added into the
   *      returned {@link Success}.
   * <p>
   *   2. {@link Failure} instance with the first {@link Failure} found in the given `tries`.
   *
   * <pre>
   * Examples:
   *
   *   mapperSuccess = (s1: number, s2: number) => s2;
   *
   *   combineGetFirstFailure(mapperSuccess, [() => Try.success(11), () => Try.success(7)]);                                                       // Success(7)
   *   combineGetFirstFailure(mapperSuccess, [() => Try.success(13), () => Try.failure(new TypeError())]);                                         // Failure(new TypeError())
   *   combineGetFirstFailure(mapperSuccess, [() => Try.success(10), () => Try.failure(new TypeError()), () => Try.failure(new SyntaxError())]);   // Failure(new TypeError())
   * </pre>
   *
   * @param mapperSuccess
   *    {@link TFunction2} used to calculate the new {@link Success} based on two provided ones
   * @param tries
   *    {@link TFunction0} of {@link Try} instances to verify
   *
   * @return {@link Try}
   *
   * @throws {@link IllegalArgumentError} if `mapperSuccess` is `null` or `undefined` but `tries` is not empty
   */
  static combineGetFirstFailure<T>(mapperSuccess: TFunction2<T, T, T>,
                                   tries: NullableOrUndefined<TFunction0<Try<T>>[]>): Try<T> {
    if (ArrayUtil.isEmpty(tries)) {
      // @ts-ignore
      return Try.success<T>(null);
    }
    AssertUtil.notNullOrUndefined(
      mapperSuccess,
      'mapperSuccess must be not null and not undefined'
    );
    let result = Function0.of(tries![0]).apply();
    for (let i = 1; i < tries!.length; i++) {
      result = result.ap(
        Function0.of(tries![i]).apply(),
        (e1, e2) => e1,
        mapperSuccess
      );
      if (!result.isSuccess()) {
        return result;
      }
    }
    return result;
  }


  static ofFunction0<T>(func: FFunction0<T>): Try<T>;
  static ofFunction0<T>(func: TFunction0<T>): Try<T>;

  /**
   * Creates a {@link Success} invoking the provided {@link TFunction0}.
   *
   * @param func
   *    {@link TFunction0} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error invoking {@link TFunction0},
   *         {@link Failure} otherwise
   */
  static ofFunction0<T>(func: TFunction0<T>): Try<T> {
    try {
      return this.success(
        Function0.of(func)
          .apply()
      );

    } catch (error) {
      return Try.failureResultHandler(error);
    }
  }


  static ofFunction1<T1, R>(t1: T1,
                            func: FFunction1<T1, R>): Try<R>;

  static ofFunction1<T1, R>(t1: T1,
                            func: TFunction1<T1, R>): Try<R>;

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
  static ofFunction1<T1, R>(t1: T1,
                            func: TFunction1<T1, R>): Try<R> {
    try {
      return this.success(
        Function1.of(func)
          .apply(t1)
      );

    } catch (error) {
      return Try.failureResultHandler(error);
    }
  }


  static ofFunction2<T1, T2, R>(t1: T1,
                                t2: T2,
                                func: FFunction2<T1, T2, R>): Try<R>;

  static ofFunction2<T1, T2, R>(t1: T1,
                                t2: T2,
                                func: TFunction2<T1, T2, R>): Try<R>;

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
  static ofFunction2<T1, T2, R>(t1: T1,
                                t2: T2,
                                func: TFunction2<T1, T2, R>): Try<R> {
    try {
      return this.success(
        Function2.of(func)
          .apply(t1, t2)
      );

    } catch (error) {
      return Try.failureResultHandler(error);
    }
  }


  static ofFunction3<T1, T2, T3, R>(t1: T1,
                                    t2: T2,
                                    t3: T3,
                                    func: FFunction3<T1, T2, T3, R>): Try<R>;

  static ofFunction3<T1, T2, T3, R>(t1: T1,
                                    t2: T2,
                                    t3: T3,
                                    func: TFunction3<T1, T2, T3, R>): Try<R>;

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
  static ofFunction3<T1, T2, T3, R>(t1: T1,
                                    t2: T2,
                                    t3: T3,
                                    func: TFunction3<T1, T2, T3, R>): Try<R> {
    try {
      return this.success(
        Function3.of(func)
          .apply(t1, t2, t3)
      );

    } catch (error) {
      return Try.failureResultHandler(error);
    }
  }


  static ofFunction4<T1, T2, T3, T4, R>(t1: T1,
                                        t2: T2,
                                        t3: T3,
                                        t4: T4,
                                        func: FFunction4<T1, T2, T3, T4, R>): Try<R>;

  static ofFunction4<T1, T2, T3, T4, R>(t1: T1,
                                        t2: T2,
                                        t3: T3,
                                        t4: T4,
                                        func: TFunction4<T1, T2, T3, T4, R>): Try<R>;

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
  static ofFunction4<T1, T2, T3, T4, R>(t1: T1,
                                        t2: T2,
                                        t3: T3,
                                        t4: T4,
                                        func: TFunction4<T1, T2, T3, T4, R>): Try<R> {
    try {
      return this.success(
        Function4.of(func)
          .apply(t1, t2, t3, t4)
      );

    } catch (error) {
      return Try.failureResultHandler(error);
    }
  }


  static ofFunction5<T1, T2, T3, T4, T5, R>(t1: T1,
                                            t2: T2,
                                            t3: T3,
                                            t4: T4,
                                            t5: T5,
                                            func: FFunction5<T1, T2, T3, T4, T5, R>): Try<R>;

  static ofFunction5<T1, T2, T3, T4, T5, R>(t1: T1,
                                            t2: T2,
                                            t3: T3,
                                            t4: T4,
                                            t5: T5,
                                            func: TFunction5<T1, T2, T3, T4, T5, R>): Try<R>;

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
   *    {@link TFunction5} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error invoking {@link TFunction5},
   *         {@link Failure} otherwise
   */
  static ofFunction5<T1, T2, T3, T4, T5, R>(t1: T1,
                                            t2: T2,
                                            t3: T3,
                                            t4: T4,
                                            t5: T5,
                                            func: TFunction5<T1, T2, T3, T4, T5, R>): Try<R> {
    try {
      return this.success(
        Function5.of(func)
          .apply(t1, t2, t3, t4, t5)
      );

    } catch (error) {
      return Try.failureResultHandler(error);
    }
  }


  static ofFunction6<T1, T2, T3, T4, T5, T6, R>(t1: T1,
                                                t2: T2,
                                                t3: T3,
                                                t4: T4,
                                                t5: T5,
                                                t6: T6,
                                                func: FFunction6<T1, T2, T3, T4, T5, T6, R>): Try<R>;

  static ofFunction6<T1, T2, T3, T4, T5, T6, R>(t1: T1,
                                                t2: T2,
                                                t3: T3,
                                                t4: T4,
                                                t5: T5,
                                                t6: T6,
                                                func: TFunction6<T1, T2, T3, T4, T5, T6, R>): Try<R>;

  /**
   * Creates a {@link Success} invoking the provided {@link TFunction6} with given input parameters.
   *
   * @param t1
   *    First input parameter used by given {@link TFunction6}
   * @param t2
   *    Second input parameter used by given {@link TFunction6}
   * @param t3
   *    Third input parameter used by given {@link TFunction6}
   * @param t4
   *    Fourth input parameter used by given {@link TFunction6}
   * @param t5
   *    Fifth input parameter used by given {@link TFunction6}
   * @param t6
   *    Sixth input parameter used by given {@link TFunction6}
   * @param func
   *    {@link TFunction6} used to get the value to store in the returned {@link Success}
   *
   * @return {@link Success} if there was no error invoking {@link TFunction6},
   *         {@link Failure} otherwise
   */
  static ofFunction6<T1, T2, T3, T4, T5, T6, R>(t1: T1,
                                                t2: T2,
                                                t3: T3,
                                                t4: T4,
                                                t5: T5,
                                                t6: T6,
                                                func: TFunction6<T1, T2, T3, T4, T5, T6, R>): Try<R> {
    try {
      return this.success(
        Function6.of(func)
          .apply(t1, t2, t3, t4, t5, t6)
      );

    } catch (error) {
      return Try.failureResultHandler(error);
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
   *    Applies a {@link TFunction1} `mapper` to the stored value of this {@link Try} if this is a {@link Success}.
   * Otherwise, does nothing if this is a {@link Failure}.
   * <p>
   * If given `mapper` invocation returns an {@link Error}, then returned {@link Try} will be {@link Failure}.
   *
   * @param mapper
   *    The {@link TFunction1} mapping function to apply to a value of a {@link Success} instance.
   *
   * @return new {@link Try}
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined` and the current instance is a {@link Success} one
   */
  map = <U>(mapper: TFunction1<T, U>): Try<U> => {
    if (this.isSuccess()) {
      AssertUtil.notNullOrUndefined(
        mapper,
        'mapper must be not null and not undefined'
      );
      return this.internalMapTry(mapper);
    }
    return Try.failure(this.getError());
  }


  /**
   *    Applies a {@link TFunction1} `mapper` to the stored value of this {@link Try} if this is a {@link Failure}.
   * Otherwise, does nothing if this is a {@link Success}.
   * <p>
   * If given `mapper` invocation returns an {@link Error}, then returned {@link Try} will {@link Failure}.
   *
   * @param mapper
   *    The {@link TFunction1} mapping function to apply to a value of a {@link Failure} instance.
   *
   * @return new {@link Try}
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined` and the current instance is a {@link Failure} one
   */
  mapFailure = (mapper: TFunction1<Error, Error>): Try<T> => {
    if (!this.isSuccess()) {
      AssertUtil.notNullOrUndefined(
        mapper,
        'mapper must be not null and not undefined'
      );
      return this.internalMapFailureTry(mapper);
    }
    return Try.success(this.get());
  }


  /**
   *    Returns this {@link Try} if it is {@link Success}, otherwise tries to recover the {@link Error} of the
   * {@link Failure} applying `mapper`.
   *
   * <pre>
   * Example:
   *
   *   // @ts-ignore
   *   Try.ofFunction0(() => doesNotExits)
   *      .recover((e1: Error) => 9999);
   * </pre>
   *
   * @param mapper
   *    Recovery {@link TFunction1} taking a {@link Error}
   *
   * @return {@link Try}
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined` and the current instance is a {@link Failure} one
   */
  recover = (mapper: TFunction1<Error, T>): Try<T> => {
    if (!this.isSuccess()) {
      AssertUtil.notNullOrUndefined(
        mapper,
        'mapper must be not null and not undefined'
      );
      return this.recoverTry(mapper);
    }
    return Try.success(this.get());
  }


  /**
   *    Returns this {@link Try} if it is {@link Success}, otherwise tries to recover the {@link Error} of the
   * {@link Failure} applying `mapper`.
   *
   * <pre>
   * Example:
   *
   *   // @ts-ignore
   *   Try.ofFunction0(() => doesNotExits)
   *      .recoverWith((e1: Error) => Try.success(9999));
   * </pre>
   *
   * @param mapper
   *    Recovery {@link TFunction1} taking a {@link Error}
   *
   * @return {@link Try}
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined` and the current instance is a {@link Failure} one
   */
  recoverWith = (mapper: TFunction1<Error, Try<T>>): Try<T> => {
    if (!this.isSuccess()) {
      AssertUtil.notNullOrUndefined(
        mapper,
        'mapper must be not null and not undefined'
      );
      return this.recoverWithTry(mapper);
    }
    return Try.success(this.get());
  }


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
   *    Whereas {@link Try#map} with `mapper` argument only performs a mapping on a {@link Success} {@link Try},
   * and {@link Try#mapFailure} performs a mapping on an {@link Failure} {@link Try}, this method with two {@link TFunction1}
   * mappers as arguments, allows you to provide mapping actions for both, and will give you the result based on what
   * type of {@link Try} this is.
   * <p>
   *    If invoking given `mapperFailure` or `mapperSuccess` an {@link Error} is thrown then returned {@link Try}
   * will be {@link Failure}.
   *
   * @param mapperFailure
   *    {@link TFunction1} with the failure mapping operation
   * @param mapperSuccess
   *    {@link TFunction1} with the success mapping operation
   *
   * @return {@link Try}
   *
   * @throws {@link IllegalArgumentError} if `mapperFailure` is `null` or `undefined` and the current instance is a {@link Success} one
   *                                      or `mapperSuccess` is `null` or `undefined` and the current instance is a {@link Failure} one
   */
  transform = <U>(mapperFailure: TFunction1<Error, U>,
                  mapperSuccess: TFunction1<T, U>): Try<U> => {
    if (this.isSuccess()) {
      AssertUtil.notNullOrUndefined(
        mapperSuccess,
        'mapperSuccess must be not null and not undefined'
      );
      return this.internalMapTry(mapperSuccess);
    } else {
      AssertUtil.notNullOrUndefined(
        mapperFailure,
        'mapperFailure must be not null and not undefined'
      );
      return this.recoverTry(mapperFailure);
    }
  }


  /**
   * Manages the `catch` clause of a `try` one, returning a standard {@link Failure} instance.
   *
   * @param error
   *    Error received in the `catch` clause of a `try` one
   *
   * @return {@link Failure} instance adding the provided `error` information
   */
  private static failureResultHandler = <T>(error: any): Try<T> => {
    const finalError = error instanceof Error
      ? error
      : new Error(Try.DEFAULT_ERROR_MESSAGE + error);

    return Try.failure(finalError);
  }


  /**
   * When current {@link Try} is a {@link Failure} instance, manages in a safe way the {@link TFunction1} invocation.
   *
   * @param mapper
   *    {@link TFunction1} to apply the stored value if the current instance is a {@link Failure} one
   *
   * @return {@link Try} of type {@link Failure}
   */
  private internalMapFailureTry = (mapper: TFunction1<Error, Error>): Try<T> => {
    try {
      return Try.failure(
        Function1.of(mapper)
          .apply(
            this.getError()
          )
      );
    } catch (error) {
      return Try.failureResultHandler(error);
    }
  }


  /**
   * When current {@link Try} is a {@link Success} instance, manages in a safe way the {@link TFunction1} invocation.
   *
   * @param mapper
   *    {@link TFunction1} to apply the stored value if the current instance is a {@link Success} one
   *
   * @return {@link Try}
   */
  private internalMapTry = <U>(mapper: TFunction1<T, U>): Try<U> => {
    try {
      return Try.success(
        Function1.of(mapper)
          .apply(
            this.get()
          )
      );
    } catch (error) {
      return Try.failureResultHandler(error);
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
   * @return {@link Try} of type {@link Failure}
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
      return Try.failureResultHandler(error);
    }
  }


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
      return Try.failureResultHandler(error);
    }
  }


  /**
   * When current {@link Try} is a {@link Failure} instance, manages in a safe way the {@link TFunction1} invocation.
   *
   * @param mapper
   *    {@link TFunction1} to apply the stored value if the current instance is a {@link Failure} one
   *
   * @return {@link Try}
   */
  private recoverTry = <U>(mapper: TFunction1<Error, U>): Try<U> => {
    try {
      return Try.success(
        Function1.of(mapper)
          .apply(
            this.getError()
          )
      );
    } catch (error) {
      return Try.failureResultHandler(error);
    }
  }


  /**
   * When current {@link Try} is a {@link Failure} instance, manages in a safe way the {@link TFunction1} invocation.
   *
   * @param mapper
   *    {@link TFunction1} to apply the stored value if the current instance is a {@link Failure} one
   *
   * @return {@link Try}
   */
  private recoverWithTry = <U>(mapper: TFunction1<Error, Try<U>>): Try<U> => {
    try {
      return Function1.of(mapper)
        .apply(
          this.getError()
        );
    } catch (error) {
      return Try.failureResultHandler(error);
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
