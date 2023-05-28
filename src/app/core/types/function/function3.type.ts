import { Function1, NullableOrUndefined, TFunction1 } from '@app-core/types';
import * as _ from 'lodash';

/**
 * Union type of {@link FFunction3} and {@link Function3}
 */
export type TFunction3<T1, T2, T3, R> = FFunction3<T1, T2, T3, R> | Function3<T1, T2, T3, R>;


/**
 * Represents the function approach of a function that accepts three arguments and produces a result.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link FFunction3}
 * @typeParam<T2>
 *   Type of the second input to the {@link FFunction3}
 * @typeParam<T3>
 *   Type of the third input to the {@link FFunction3}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction3}
 */
export type FFunction3<T1, T2, T3, R> =
  (t1: NullableOrUndefined<T1>,
   t2: NullableOrUndefined<T2>,
   t3: NullableOrUndefined<T3>) => R;


/**
 * Verifies if the given {@code input} is potentially an instance of {@link FFunction3}.
 * <p>
 *    It is important to know {@code input} could be 'something' different from {@link FFunction3}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the {@code length} function.
 *
 * @param input
 *    Object to verify
 *
 * @return {@code true} if {@code input} is potentially an instance of {@link FFunction3},
 *         {@code false} otherwise
 */
export function isFFunction3<T1, T2, T3, R>(input?: any): input is FFunction3<T1, T2, T3, R> {
  return !_.isNil(input) &&
    'function' === typeof input &&
    3 === input.length;
}



/**
 * Represents a function that accepts three arguments and produces a result, used as wrapper of {@link FFunction3}.
 * <p>
 * This is a functional interface whose functional method is {@link Function3#apply}.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link FFunction3}
 * @typeParam<T2>
 *   Type of the second input to the {@link FFunction3}
 * @typeParam<T3>
 *   Type of the third input to the {@link FFunction3}
 * @typeParam <R>
 *   Type of the result of the {@link Function3}
 */
export class Function3<T1, T2, T3, R> {

  protected constructor(protected readonly mapper: FFunction3<T1, T2, T3, R>) {}


  /**
   * Verifies if the given {@code input} is an instance of {@link Function3}.
   *
   * @param input
   *    Object to verify
   *
   * @return {@code true} if {@code input} is an instance of {@link Function3},
   *         {@code false} otherwise
   */
  static isFunction = <T1, T2, T3, R>(input?: any): input is Function3<T1, T2, T3, R> =>
    !_.isNil(input) &&
    undefined !== (input as Function3<T1, T2, T3, R>).andThen &&
    undefined !== (input as Function3<T1, T2, T3, R>).apply;


  /**
   * Returns a {@link Function3} describing the given {@link FFunction3}.
   *
   * @param input
   *    {@link FFunction3} used to evaluates the given instances of T and return an R one
   *
   * @return an {@link Function3} as wrapper of {@code mapper}
   */
  static of<T1, T2, T3, R>(input: FFunction3<T1, T2, T3, R>): Function3<T1, T2, T3, R>;


  /**
   * Returns a {@link Function3} based on provided {@link TFunction3} parameter.
   *
   * @param input
   *    {@link TFunction3} instance to convert to a {@link Function3} one
   *
   * @return {@link Function3} based on provided {@link TFunction3}
   */
  static of<T1, T2, T3, R>(input: TFunction3<T1, T2, T3, R>): Function3<T1, T2, T3, R>;


  static of<T1, T2, T3, R>(input: FFunction3<T1, T2, T3, R> | TFunction3<T1, T2, T3, R>): Function3<T1, T2, T3, R> {
    return (input instanceof Function3)
      ? input
      : new Function3(input);
  }


  /**
   *    Returns a composed {@link Function3} that first applies this {@link Function3} to its input, and then
   * applies the {@code after} {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function3} is applied
   *
   * @return composed {@link Function3} that first applies this {@link Function3} and then applies the
   *         {@code after} {@link TFunction1}
   */
  andThen = <V>(after: TFunction1<R, V>): Function3<T1, T2, T3, V> =>
    new Function3(
      (t1: NullableOrUndefined<T1>,
       t2: NullableOrUndefined<T2>,
       t3: NullableOrUndefined<T3>) =>
        Function1.of(after)
          .apply(
            this.apply(t1, t2, t3)
          )
    );


  /**
   * Applies this {@link Function3} to the given argument.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   * @param t3
   *    The third input argument
   *
   * @return new instance of R
   */
  apply = (t1: NullableOrUndefined<T1>,
           t2: NullableOrUndefined<T2>,
           t3: NullableOrUndefined<T3>): R => this.mapper(t1, t2, t3);

}
