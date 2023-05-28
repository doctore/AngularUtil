import { Function1, NullableOrUndefined, TFunction1 } from '@app-core/types';
import * as _ from 'lodash';

/**
 * Union type of {@link FFunction4} and {@link Function4}
 */
export type TFunction4<T1, T2, T3, T4, R> = FFunction4<T1, T2, T3, T4, R> | Function4<T1, T2, T3, T4, R>;


/**
 * Represents the function approach of a function that accepts three arguments and produces a result.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link FFunction4}
 * @typeParam<T2>
 *   Type of the second input to the {@link FFunction4}
 * @typeParam<T3>
 *   Type of the third input to the {@link FFunction4}
 * @typeParam<T4>
 *   Type of the fourth input to the {@link FFunction4}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction4}
 */
export type FFunction4<T1, T2, T3, T4, R> =
  (t1: NullableOrUndefined<T1>,
   t2: NullableOrUndefined<T2>,
   t3: NullableOrUndefined<T3>,
   t4: NullableOrUndefined<T4>) => R;


/**
 * Verifies if the given {@code input} is potentially an instance of {@link FFunction4}.
 * <p>
 *    It is important to know {@code input} could be 'something' different from {@link FFunction4}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the {@code length} function.
 *
 * @param input
 *    Object to verify
 *
 * @return {@code true} if {@code input} is potentially an instance of {@link FFunction4},
 *         {@code false} otherwise
 */
export function isFFunction4<T1, T2, T3, T4, R>(input?: any): input is FFunction4<T1, T2, T3, T4, R> {
  return !_.isNil(input) &&
    'function' === typeof input &&
    4 === input.length;
}



/**
 * Represents a function that accepts three arguments and produces a result, used as wrapper of {@link FFunction4}.
 * <p>
 * This is a functional interface whose functional method is {@link Function4#apply}.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link FFunction4}
 * @typeParam<T2>
 *   Type of the second input to the {@link FFunction4}
 * @typeParam<T3>
 *   Type of the third input to the {@link FFunction4}
 * @typeParam<T4>
 *   Type of the fourth input to the {@link FFunction4}
 * @typeParam <R>
 *   Type of the result of the {@link Function4}
 */
export class Function4<T1, T2, T3, T4, R> {

  protected constructor(protected readonly mapper: FFunction4<T1, T2, T3, T4, R>) {}


  /**
   * Verifies if the given {@code input} is an instance of {@link Function4}.
   *
   * @param input
   *    Object to verify
   *
   * @return {@code true} if {@code input} is an instance of {@link Function4},
   *         {@code false} otherwise
   */
  static isFunction = <T1, T2, T3, T4, R>(input?: any): input is Function4<T1, T2, T3, T4, R> =>
    !_.isNil(input) &&
    undefined !== (input as Function4<T1, T2, T3, T4, R>).andThen &&
    undefined !== (input as Function4<T1, T2, T3, T4, R>).apply;


  /**
   * Returns a {@link Function4} describing the given {@link FFunction4}.
   *
   * @param input
   *    {@link FFunction4} used to evaluates the given instances of T and return an R one
   *
   * @return an {@link Function4} as wrapper of {@code mapper}
   */
  static of<T1, T2, T3, T4, R>(input: FFunction4<T1, T2, T3, T4, R>): Function4<T1, T2, T3, T4, R>;


  /**
   * Returns a {@link Function4} based on provided {@link TFunction4} parameter.
   *
   * @param input
   *    {@link TFunction4} instance to convert to a {@link Function4} one
   *
   * @return {@link Function4} based on provided {@link TFunction4}
   */
  static of<T1, T2, T3, T4, R>(input: TFunction4<T1, T2, T3, T4, R>): Function4<T1, T2, T3, T4, R>;


  static of<T1, T2, T3, T4, R>(input: FFunction4<T1, T2, T3, T4, R> | TFunction4<T1, T2, T3, T4, R>): Function4<T1, T2, T3, T4, R> {
    return (input instanceof Function4)
      ? input
      : new Function4(input);
  }


  /**
   *    Returns a composed {@link Function4} that first applies this {@link Function4} to its input, and then
   * applies the {@code after} {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function4} is applied
   *
   * @return composed {@link Function4} that first applies this {@link Function4} and then applies the
   *         {@code after} {@link TFunction1}
   */
  andThen = <V>(after: TFunction1<R, V>): Function4<T1, T2, T3, T4, V> =>
    new Function4(
      (t1: NullableOrUndefined<T1>,
       t2: NullableOrUndefined<T2>,
       t3: NullableOrUndefined<T3>,
       t4: NullableOrUndefined<T4>) =>
        Function1.of(after)
          .apply(
            this.apply(t1, t2, t3, t4)
          )
    );


  /**
   * Applies this {@link Function4} to the given argument.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   * @param t3
   *    The third input argument
   * @param t4
   *    The fourth input argument
   *
   * @return new instance of R
   */
  apply = (t1: NullableOrUndefined<T1>,
           t2: NullableOrUndefined<T2>,
           t3: NullableOrUndefined<T3>,
           t4: NullableOrUndefined<T4>): R => this.mapper(t1, t2, t3, t4);

}
