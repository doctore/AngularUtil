import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Function1, TFunction1 } from '@app-core/types/function';

/**
 * Union type of {@link FFunction8} and {@link Function8}
 */
export type TFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R> = FFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R> | Function8<T1, T2, T3, T4, T5, T6, T7, T8, R>;


/**
 * Represents the function approach of a function that accepts eight arguments and produces a result.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FFunction8}
 * @typeParam <T2>
 *   Type of the second input to the {@link FFunction8}
 * @typeParam <T3>
 *   Type of the third input to the {@link FFunction8}
 * @typeParam <T4>
 *   Type of the fourth input to the {@link FFunction8}
 * @typeParam <T5>
 *   Type of the fifth input to the {@link FFunction8}
 * @typeParam <T6>
 *   Type of the sixth input to the {@link FFunction8}
 * @typeParam <T7>
 *   Type of the seventh input to the {@link FFunction8}
 * @typeParam <T8>
 *   Type of the eighth input to the {@link FFunction8}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction8}
 */
export type FFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4,
   t5: T5,
   t6: T6,
   t7: T7,
   t8: T8) => R;


/**
 * Verifies if the given `input` is potentially an instance of {@link FFunction8}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FFunction8}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FFunction8},
 *         `false` otherwise
 */
export function isFFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R>(input?: any): input is FFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    8 === input.length;
}



/**
 * Represents a function that accepts eight arguments and produces a result, used as wrapper of {@link FFunction8}.
 * <p>
 * This is a functional interface whose functional method is {@link Function8#apply}.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link Function8}
 * @typeParam<T2>
 *   Type of the second input to the {@link Function8}
 * @typeParam<T3>
 *   Type of the third input to the {@link Function8}
 * @typeParam<T4>
 *   Type of the fourth input to the {@link Function8}
 * @typeParam<T5>
 *   Type of the fifth input to the {@link Function8}
 * @typeParam <T6>
 *   Type of the sixth input to the {@link Function8}
 * @typeParam <T7>
 *   Type of the seventh input to the {@link Function8}
 * @typeParam <T8>
 *   Type of the eighth input to the {@link Function8}
 * @typeParam <R>
 *   Type of the result of the {@link Function8}
 */
export class Function8<T1, T2, T3, T4, T5, T6, T7, T8, R> {

  protected constructor(protected readonly mapper: FFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Function8}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Function8},
   *         `false` otherwise
   */
  static isFunction = <T1, T2, T3, T4, T5, T6, T7, T8, R>(input?: any): input is Function8<T1, T2, T3, T4, T5, T6, T7, T8, R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function8<T1, T2, T3, T4, T5, T6, T7, T8, R>).andThen &&
    undefined !== (input as Function8<T1, T2, T3, T4, T5, T6, T7, T8, R>).apply &&
    undefined !== (input as Function8<T1, T2, T3, T4, T5, T6, T7, T8, R>).getMapper &&
    isFFunction8((input as Function8<T1, T2, T3, T4, T5, T6, T7, T8, R>).getMapper());


  static of<T1, T2, T3, T4, T5, T6, T7, T8, R>(func: FFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R>): Function8<T1, T2, T3, T4, T5, T6, T7, T8, R>;
  static of<T1, T2, T3, T4, T5, T6, T7, T8, R>(func: TFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R>): Function8<T1, T2, T3, T4, T5, T6, T7, T8, R>;

  /**
   * Returns a {@link Function8} based on provided {@link TFunction8} parameter.
   *
   * @param func
   *    {@link TFunction8} instance to convert to a {@link Function8} one
   *
   * @return {@link Function8} based on provided {@link TFunction8}
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4, T5, T6, T7, T8, R>(func: TFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R>): Function8<T1, T2, T3, T4, T5, T6, T7, T8, R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return Function8.isFunction<T1, T2, T3, T4, T5, T6, T7, T8, R>(func)
      ? func
      : new Function8(func);
  }


  /**
   * Returns internal `mapper`.
   *
   * @return {@link FFunction8}
   */
  getMapper = (): FFunction8<T1, T2, T3, T4, T5, T6, T7, T8, R> =>
    this.mapper;


  /**
   *    Returns a composed {@link Function8} that first applies this {@link Function8} to its input, and then
   * applies the `after` {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function6} is applied
   *
   * @return composed {@link Function8} that first applies this {@link Function8} and then applies the
   *         `after` {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `after` is `null` or `undefined`
   */
  andThen = <V>(after: TFunction1<R, V>): Function8<T1, T2, T3, T4, T5, T6, T7, T8, V> => {
    AssertUtil.notNullOrUndefined(
      after,
      'after must be not null and not undefined'
    );
    return new Function8(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6,
       t7: T7,
       t8: T8) =>
        Function1.of(after)
          .apply(
            this.apply(t1, t2, t3, t4, t5, t6, t7, t8)
          )
    );
  }


  /**
   * Applies this {@link Function8} to the given arguments.
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
   * @param t6
   *    The sixth input argument
   * @param t7
   *    The seventh input argument
   * @param t8
   *    The eighth input argument
   *
   * @return new instance of R
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6,
           t7: T7,
           t8: T8): R =>
    this.mapper(t1, t2, t3, t4, t5, t6, t7, t8);

}
