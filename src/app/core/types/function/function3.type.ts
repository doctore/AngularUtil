import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Function1, TFunction1 } from '@app-core/types/function';

/**
 * Union type of {@link FFunction3} and {@link Function3}
 */
export type TFunction3<T1, T2, T3, R> = FFunction3<T1, T2, T3, R> | Function3<T1, T2, T3, R>;


/**
 * Represents the function approach of a function that accepts three arguments and produces a result.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FFunction3}
 * @typeParam <T2>
 *   Type of the second input to the {@link FFunction3}
 * @typeParam <T3>
 *   Type of the third input to the {@link FFunction3}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction3}
 */
export type FFunction3<T1, T2, T3, R> =
  (t1: T1,
   t2: T2,
   t3: T3) => R;


/**
 * Verifies if the given `input` is potentially an instance of {@link FFunction3}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FFunction3}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FFunction3},
 *         `false` otherwise
 */
export function isFFunction3<T1, T2, T3, R>(input?: any): input is FFunction3<T1, T2, T3, R> {
  return ObjectUtil.nonNullOrUndefined(input) &&
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
   * Verifies if the given `input` is an instance of {@link Function3}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Function3},
   *         `false` otherwise
   */
  static isFunction = <T1, T2, T3, R>(input?: any): input is Function3<T1, T2, T3, R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function3<T1, T2, T3, R>).andThen &&
    undefined !== (input as Function3<T1, T2, T3, R>).apply;


  /**
   * Returns a {@link Function3} describing the given {@link FFunction3}.
   *
   * @param func
   *    {@link FFunction3} used to evaluates the given instances of T and return an R one
   *
   * @return an {@link Function3} as wrapper of `mapper`
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<T1, T2, T3, R>(func: FFunction3<T1, T2, T3, R>): Function3<T1, T2, T3, R>;


  /**
   * Returns a {@link Function3} based on provided {@link TFunction3} parameter.
   *
   * @param func
   *    {@link TFunction3} instance to convert to a {@link Function3} one
   *
   * @return {@link Function3} based on provided {@link TFunction3}
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<T1, T2, T3, R>(func: TFunction3<T1, T2, T3, R>): Function3<T1, T2, T3, R>;


  static of<T1, T2, T3, R>(func: TFunction3<T1, T2, T3, R>): Function3<T1, T2, T3, R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return Function3.isFunction<T1, T2, T3, R>(func)
      ? func
      : new Function3(func);
  }


  /**
   *    Returns a composed {@link Function3} that first applies this {@link Function3} to its input, and then
   * applies the `after` {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function3} is applied
   *
   * @return composed {@link Function3} that first applies this {@link Function3} and then applies the
   *         `after` {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `after` is `null` or `undefined`
   */
  andThen = <V>(after: TFunction1<R, V>): Function3<T1, T2, T3, V> => {
    AssertUtil.notNullOrUndefined(
      after,
      'after must be not null and not undefined'
    );
    return new Function3(
      (t1: T1,
       t2: T2,
       t3: T3) =>
        Function1.of(after)
          .apply(
            this.apply(t1, t2, t3)
          )
    );
  }


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
  apply = (t1: T1,
           t2: T2,
           t3: T3): R =>
    this.mapper(t1, t2, t3);

}
