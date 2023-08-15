import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Function1, TFunction1 } from '@app-core/types/function';

/**
 * Union type of {@link FFunction9} and {@link Function9}
 */
export type TFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> = FFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> | Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>;


/**
 * Represents the function approach of a function that accepts nine arguments and produces a result.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FFunction9}
 * @typeParam <T2>
 *   Type of the second input to the {@link FFunction9}
 * @typeParam <T3>
 *   Type of the third input to the {@link FFunction9}
 * @typeParam <T4>
 *   Type of the fourth input to the {@link FFunction9}
 * @typeParam <T5>
 *   Type of the fifth input to the {@link FFunction9}
 * @typeParam <T6>
 *   Type of the sixth input to the {@link FFunction9}
 * @typeParam <T7>
 *   Type of the seventh input to the {@link FFunction9}
 * @typeParam <T8>
 *   Type of the eighth input to the {@link FFunction9}
 * @typeParam <T9>
 *   Type of the ninth input to the {@link FFunction9}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction9}
 */
export type FFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4,
   t5: T5,
   t6: T6,
   t7: T7,
   t8: T8,
   t9: T9) => R;


/**
 * Verifies if the given `input` is potentially an instance of {@link FFunction9}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FFunction9}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FFunction9},
 *         `false` otherwise
 */
export function isFFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(input?: any): input is FFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    9 === input.length;
}



/**
 * Represents a function that accepts nine arguments and produces a result, used as wrapper of {@link FFunction9}.
 * <p>
 * This is a functional interface whose functional method is {@link Function9#apply}.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link Function9}
 * @typeParam<T2>
 *   Type of the second input to the {@link Function9}
 * @typeParam<T3>
 *   Type of the third input to the {@link Function9}
 * @typeParam<T4>
 *   Type of the fourth input to the {@link Function9}
 * @typeParam<T5>
 *   Type of the fifth input to the {@link Function9}
 * @typeParam <T6>
 *   Type of the sixth input to the {@link Function9}
 * @typeParam <T7>
 *   Type of the seventh input to the {@link Function9}
 * @typeParam <T8>
 *   Type of the eighth input to the {@link Function9}
 * @typeParam <T9>
 *   Type of the ninth input to the {@link Function9}
 * @typeParam <R>
 *   Type of the result of the {@link Function9}
 */
export class Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> {

  protected constructor(protected readonly mapper: FFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Function9}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Function9},
   *         `false` otherwise
   */
  static isFunction = <T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(input?: any): input is Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>).andThen &&
    undefined !== (input as Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>).apply &&
    undefined !== (input as Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>).getMapper &&
    isFFunction9((input as Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>).getMapper());


  static of<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(func: FFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>): Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>;
  static of<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(func: TFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>): Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>;

  /**
   * Returns a {@link Function9} based on provided {@link TFunction9} parameter.
   *
   * @param func
   *    {@link TFunction9} instance to convert to a {@link Function9} one
   *
   * @return {@link Function9} based on provided {@link TFunction9}
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(func: TFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>): Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return Function9.isFunction<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(func)
      ? func
      : new Function9(func);
  }


  /**
   * Returns internal `mapper`.
   *
   * @return {@link FFunction9}
   */
  getMapper = (): FFunction9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> =>
    this.mapper;


  /**
   *    Returns a composed {@link Function9} that first applies this {@link Function9} to its input, and then
   * applies the `after` {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function6} is applied
   *
   * @return composed {@link Function9} that first applies this {@link Function9} and then applies the
   *         `after` {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `after` is `null` or `undefined`
   */
  andThen = <V>(after: TFunction1<R, V>): Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, V> => {
    AssertUtil.notNullOrUndefined(
      after,
      'after must be not null and not undefined'
    );
    return new Function9(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6,
       t7: T7,
       t8: T8,
       t9: T9) =>
        Function1.of(after)
          .apply(
            this.apply(t1, t2, t3, t4, t5, t6, t7, t8, t9)
          )
    );
  }


  /**
   * Applies this {@link Function9} to the given arguments.
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
   * @param t9
   *    The ninth input argument
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
           t8: T8,
           t9: T9): R =>
    this.mapper(t1, t2, t3, t4, t5, t6, t7, t8, t9);

}
