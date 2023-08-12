import { AssertUtil, ObjectUtil } from '@app-core/util';

/**
 * Union type of {@link FFunction1} and {@link Function1}
 */
export type TFunction1<T, R> = FFunction1<T, R> | Function1<T, R>;


/**
 * Represents the function approach of a function that accepts one argument and produces a result.
 *
 * @typeParam<T>
 *   Type of the input to the {@link FFunction1}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction1}
 */
export type FFunction1<T, R> =
  (t: T) => R;


/**
 * Verifies if the given `input` is potentially an instance of {@link FFunction1}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FFunction1}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FFunction1},
 *         `false` otherwise
 */
export function isFFunction1<T, R>(input?: any): input is FFunction1<T, R> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    1 === input.length;
}



/**
 * Represents a function that accepts one argument and produces a result, used as wrapper of {@link FFunction1}.
 * <p>
 * This is a functional interface whose functional method is {@link Function1#apply}.
 *
 * @typeParam <T>
 *   Type of the input to the {@link Function1}
 * @typeParam <R>
 *   Type of the result of the {@link Function1}
 */
export class Function1<T, R> {

  protected constructor(protected readonly mapper: FFunction1<T, R>) {}


  /**
   * Returns a {@link Function1} that always returns its input argument.
   */
  static identity = <T>(): Function1<T, T> =>
    new Function1<T, T>((t: T) => t);


  /**
   * Verifies if the given `input` is an instance of {@link Function1}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Function1},
   *         `false` otherwise
   */
  static isFunction = <T, R>(input?: any): input is Function1<T, R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function1<T, R>).andThen &&
    undefined !== (input as Function1<T, R>).apply &&
    undefined !== (input as Function1<T, R>).compose &&
    undefined !== (input as Function1<T, R>).getMapper &&
    isFFunction1((input as Function1<T, R>).getMapper());


  static of<T, R>(func: FFunction1<T, R>): Function1<T, R>;
  static of<T, R>(func: TFunction1<T, R>): Function1<T, R>;

  /**
   * Returns a {@link Function1} based on provided {@link TFunction1} parameter.
   *
   * @param func
   *    {@link TFunction1} instance to convert to a {@link Function1} one
   *
   * @return {@link Function1} based on provided {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<T, R>(func: TFunction1<T, R>): Function1<T, R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return Function1.isFunction<T, R>(func)
      ? func
      : new Function1(func);
  }


  /**
   * Returns internal `mapper`.
   *
   * @return {@link FFunction1}
   */
  getMapper = (): FFunction1<T, R> =>
    this.mapper;


  /**
   *    Returns a composed {@link Function1} that first applies this {@link Function1} to its input, and then
   * applies the `after` {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function1} is applied
   *
   * @return composed {@link Function1} that first applies this {@link Function1} and then applies the
   *         `after` {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `after` is `null` or `undefined`
   */
  andThen = <V>(after: TFunction1<R, V>): Function1<T, V> => {
    AssertUtil.notNullOrUndefined(
      after,
      'after must be not null and not undefined'
    );
    return new Function1(
      (t: T) =>
        Function1.of(after).apply(
          this.apply(t)
        )
    );
  }


  /**
   * Applies this {@link Function1} to the given argument.
   *
   * @param t
   *    The input argument
   *
   * @return new instance of R
   */
  apply = (t: T): R =>
    this.mapper(t);


  /**
   *    Returns a composed {@link Function1} that first applies the `before` {@link TFunction1} to its input,
   * and then this {@link Function1} to the result.
   *
   * @param before
   *    {@link TFunction1} to apply before this {@link Function1} is applied
   *
   * @return composed {@link Function1} that first applies the `before` {@link TFunction1} and then applies
   *         this {@link Function1}
   *
   * @throws {@link IllegalArgumentError} if `before` is `null` or `undefined`
   */
  compose = <V>(before: TFunction1<V, T>): Function1<V, R> => {
    AssertUtil.notNullOrUndefined(
      before,
      'before must be not null and not undefined'
    );
    return new Function1(
      (v: V) =>
        this.apply(
          Function1.of(before).apply(v)
        )
    );
  }

}
