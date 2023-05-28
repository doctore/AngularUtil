import { Function1, NullableOrUndefined, TFunction1 } from '@app-core/types';
import * as _ from 'lodash';

/**
 * Union type of {@link FFunction5} and {@link Function5}
 */
export type TFunction5<T1, T2, T3, T4, T5, R> = FFunction5<T1, T2, T3, T4, T5, R> | Function5<T1, T2, T3, T4, T5, R>;


/**
 * Represents the function approach of a function that accepts three arguments and produces a result.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link FFunction5}
 * @typeParam<T2>
 *   Type of the second input to the {@link FFunction5}
 * @typeParam<T3>
 *   Type of the third input to the {@link FFunction5}
 * @typeParam<T4>
 *   Type of the fourth input to the {@link FFunction5}
 * @typeParam<T5>
 *   Type of the fifth input to the {@link FFunction5}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction5}
 */
export type FFunction5<T1, T2, T3, T4, T5, R> =
  (t1: NullableOrUndefined<T1>,
   t2: NullableOrUndefined<T2>,
   t3: NullableOrUndefined<T3>,
   t4: NullableOrUndefined<T4>,
   t5: NullableOrUndefined<T5>) => R;


/**
 * Verifies if the given {@code input} is potentially an instance of {@link FFunction5}.
 * <p>
 *    It is important to know {@code input} could be 'something' different from {@link FFunction5}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the {@code length} function.
 *
 * @param input
 *    Object to verify
 *
 * @return {@code true} if {@code input} is potentially an instance of {@link FFunction5},
 *         {@code false} otherwise
 */
export function isFFunction5<T1, T2, T3, T4, T5, R>(input?: any): input is FFunction5<T1, T2, T3, T4, T5, R> {
  return !_.isNil(input) &&
    'function' === typeof input &&
    5 === input.length;
}



/**
 * Represents a function that accepts three arguments and produces a result, used as wrapper of {@link FFunction5}.
 * <p>
 * This is a functional interface whose functional method is {@link Function5#apply}.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link FFunction5}
 * @typeParam<T2>
 *   Type of the second input to the {@link FFunction5}
 * @typeParam<T3>
 *   Type of the third input to the {@link FFunction5}
 * @typeParam<T4>
 *   Type of the fourth input to the {@link FFunction5}
 * @typeParam<T5>
 *   Type of the fifth input to the {@link FFunction5}
 * @typeParam <R>
 *   Type of the result of the {@link Function5}
 */
export class Function5<T1, T2, T3, T4, T5, R> {

  protected constructor(protected readonly mapper: FFunction5<T1, T2, T3, T4, T5, R>) {}


  /**
   * Verifies if the given {@code input} is an instance of {@link Function5}.
   *
   * @param input
   *    Object to verify
   *
   * @return {@code true} if {@code input} is an instance of {@link Function5},
   *         {@code false} otherwise
   */
  static isFunction = <T1, T2, T3, T4, T5, R>(input?: any): input is Function5<T1, T2, T3, T4, T5, R> =>
    !_.isNil(input) &&
    undefined !== (input as Function5<T1, T2, T3, T4, T5, R>).andThen &&
    undefined !== (input as Function5<T1, T2, T3, T4, T5, R>).apply;


  /**
   * Returns a {@link Function5} describing the given {@link FFunction5}.
   *
   * @param input
   *    {@link FFunction5} used to evaluates the given instances of T and return an R one
   *
   * @return an {@link Function5} as wrapper of {@code mapper}
   */
  static of<T1, T2, T3, T4, T5, R>(input: FFunction5<T1, T2, T3, T4, T5, R>): Function5<T1, T2, T3, T4, T5, R>;


  /**
   * Returns a {@link Function5} based on provided {@link TFunction5} parameter.
   *
   * @param input
   *    {@link TFunction5} instance to convert to a {@link Function5} one
   *
   * @return {@link Function5} based on provided {@link TFunction5}
   */
  static of<T1, T2, T3, T4, T5, R>(input: TFunction5<T1, T2, T3, T4, T5, R>): Function5<T1, T2, T3, T4, T5, R>;


  static of<T1, T2, T3, T4, T5, R>(input: FFunction5<T1, T2, T3, T4, T5, R> | TFunction5<T1, T2, T3, T4, T5, R>): Function5<T1, T2, T3, T4, T5, R> {
    return (input instanceof Function5)
      ? input
      : new Function5(input);
  }


  /**
   *    Returns a composed {@link Function5} that first applies this {@link Function5} to its input, and then
   * applies the {@code after} {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function5} is applied
   *
   * @return composed {@link Function5} that first applies this {@link Function5} and then applies the
   *         {@code after} {@link TFunction1}
   */
  andThen = <V>(after: TFunction1<R, V>): Function5<T1, T2, T3, T4, T5, V> =>
    new Function5(
      (t1: NullableOrUndefined<T1>,
       t2: NullableOrUndefined<T2>,
       t3: NullableOrUndefined<T3>,
       t4: NullableOrUndefined<T4>,
       t5: NullableOrUndefined<T5>) =>
        Function1.of(after)
          .apply(
            this.apply(t1, t2, t3, t4, t5)
          )
    );


  /**
   * Applies this {@link Function5} to the given argument.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   * @param t3
   *    The third input argument
   * @param t4
   *    The fourth input argument
   * @param t5
   *    The fifth input argument
   *
   * @return new instance of R
   */
  apply = (t1: NullableOrUndefined<T1>,
           t2: NullableOrUndefined<T2>,
           t3: NullableOrUndefined<T3>,
           t4: NullableOrUndefined<T4>,
           t5: NullableOrUndefined<T5>): R =>
    this.mapper(t1, t2, t3, t4, t5);

}
