import { NullableOrUndefined } from '@app-core/types';
import * as _ from 'lodash';

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
  (t: NullableOrUndefined<T>) => R;


/**
 * Verifies if the given {@code input} is potentially an instance of {@link FFunction1}.
 * <p>
 *    It is important to know {@code input} could be 'something' different from {@link FFunction1}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the {@code length} function.
 *
 * @param input
 *    Object to verify
 *
 * @return {@code true} if {@code input} is potentially an instance of {@link FFunction1},
 *         {@code false} otherwise
 */
export function isFFunction1<T, R>(input?: any): input is FFunction1<T, R> {
  return !_.isNil(input) &&
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
  static identity = <T>(): Function1<T, NullableOrUndefined<T>> =>
    new Function1((t: NullableOrUndefined<T>) => t);


  /**
   * Verifies if the given {@code input} is an instance of {@link Function1}.
   *
   * @param input
   *    Object to verify
   *
   * @return {@code true} if {@code input} is an instance of {@link Function1},
   *         {@code false} otherwise
   */
  static isFunction = <T, R>(input?: any): input is Function1<T, R> =>
    !_.isNil(input) &&
    undefined !== (input as Function1<T, R>).andThen &&
    undefined !== (input as Function1<T, R>).apply &&
    undefined !== (input as Function1<T, R>).compose;


  /**
   * Returns a {@link Function1} describing the given {@link FFunction1}.
   *
   * @param input
   *    {@link FFunction1} used to evaluates the given instance of T and return an R one
   *
   * @return an {@link Function1} as wrapper of {@code mapper}
   */
  static of<T, R>(input: FFunction1<T, R>): Function1<T, R>;


  /**
   * Returns a {@link Function1} based on provided {@link TFunction1} parameter.
   *
   * @param input
   *    {@link TFunction1} instance to convert to a {@link Function1} one
   *
   * @return {@link Function1} based on provided {@link TFunction1}
   */
  static of<T, R>(input: TFunction1<T, R>): Function1<T, R>;


  static of<T, R>(input: FFunction1<T, R> | TFunction1<T, R>): Function1<T, R> {
    return (input instanceof Function1)
      ? input
      : new Function1(input);
  }


  /**
   *    Returns a composed {@link Function1} that first applies this {@link Function1} to its input, and then
   * applies the {@code after} {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function1} is applied
   *
   * @return composed {@link Function1} that first applies this {@link Function1} and then applies the
   *         {@code after} {@link TFunction1}
   */
  andThen = <V>(after: TFunction1<R, V>): Function1<T, V> =>
    new Function1(
      (t: NullableOrUndefined<T>) =>
        Function1.of(after)
          .apply(
            this.apply(t)
          )
    );


  /**
   * Applies this {@link Function1} to the given argument.
   *
   * @param t
   *    The input argument
   *
   * @return new instance of R
   */
  apply = (t: NullableOrUndefined<T>): R => this.mapper(t);


  /**
   *    Returns a composed {@link Function1} that first applies the {@code before} {@link TFunction1} to its input,
   * and then this {@link Function1} to the result.
   *
   * @param before
   *    {@link TFunction1} to apply before this {@link Function1} is applied
   *
   * @return composed {@link Function1} that first applies the {@code before} {@link TFunction1} and then applies
   *         this {@link Function1}
   */
  compose = <V>(before: TFunction1<V, T>): Function1<V, R> =>
    new Function1(
      (v: NullableOrUndefined<V>) =>
        this.apply(
          Function1.of(before)
            .apply(v)
        )
    );

}
