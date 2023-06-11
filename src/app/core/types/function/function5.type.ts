import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Function1, TFunction1 } from '@app-core/types/function';

/**
 * Union type of {@link FFunction5} and {@link Function5}
 */
export type TFunction5<T1, T2, T3, T4, T5, R> = FFunction5<T1, T2, T3, T4, T5, R> | Function5<T1, T2, T3, T4, T5, R>;


/**
 * Represents the function approach of a function that accepts three arguments and produces a result.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FFunction5}
 * @typeParam <T2>
 *   Type of the second input to the {@link FFunction5}
 * @typeParam <T3>
 *   Type of the third input to the {@link FFunction5}
 * @typeParam <T4>
 *   Type of the fourth input to the {@link FFunction5}
 * @typeParam <T5>
 *   Type of the fifth input to the {@link FFunction5}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction5}
 */
export type FFunction5<T1, T2, T3, T4, T5, R> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4,
   t5: T5) => R;


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
  return ObjectUtil.nonNullOrUndefined(input) &&
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
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function5<T1, T2, T3, T4, T5, R>).andThen &&
    undefined !== (input as Function5<T1, T2, T3, T4, T5, R>).apply;


  /**
   * Returns a {@link Function5} describing the given {@link FFunction5}.
   *
   * @param func
   *    {@link FFunction5} used to evaluates the given instances of T and return an R one
   *
   * @return an {@link Function5} as wrapper of {@code mapper}
   *
   * @throws {@link IllegalArgumentError} if {@code func} is {@code null} or {@code undefined}
   */
  static of<T1, T2, T3, T4, T5, R>(func: FFunction5<T1, T2, T3, T4, T5, R>): Function5<T1, T2, T3, T4, T5, R>;


  /**
   * Returns a {@link Function5} based on provided {@link TFunction5} parameter.
   *
   * @param func
   *    {@link TFunction5} instance to convert to a {@link Function5} one
   *
   * @return {@link Function5} based on provided {@link TFunction5}
   *
   * @throws {@link IllegalArgumentError} if {@code func} is {@code null} or {@code undefined}
   */
  static of<T1, T2, T3, T4, T5, R>(func: TFunction5<T1, T2, T3, T4, T5, R>): Function5<T1, T2, T3, T4, T5, R>;


  static of<T1, T2, T3, T4, T5, R>(func: FFunction5<T1, T2, T3, T4, T5, R> | TFunction5<T1, T2, T3, T4, T5, R>): Function5<T1, T2, T3, T4, T5, R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return (func instanceof Function5)
      ? func
      : new Function5(func);
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
   *
   * @throws {@link IllegalArgumentError} if {@code after} is {@code null} or {@code undefined}
   */
  andThen = <V>(after: TFunction1<R, V>): Function5<T1, T2, T3, T4, T5, V> => {
    AssertUtil.notNullOrUndefined(
      after,
      'after must be not null and not undefined'
    );
    return new Function5(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5) =>
        Function1.of(after)
          .apply(
            this.apply(t1, t2, t3, t4, t5)
          )
    );
  }


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
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5): R =>
    this.mapper(t1, t2, t3, t4, t5);

}
