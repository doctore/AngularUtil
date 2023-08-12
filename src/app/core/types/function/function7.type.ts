import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Function1, TFunction1 } from '@app-core/types/function';

/**
 * Union type of {@link FFunction7} and {@link Function7}
 */
export type TFunction7<T1, T2, T3, T4, T5, T6, T7, R> = FFunction7<T1, T2, T3, T4, T5, T6, T7, R> | Function7<T1, T2, T3, T4, T5, T6, T7, R>;


/**
 * Represents the function approach of a function that accepts seven arguments and produces a result.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FFunction7}
 * @typeParam <T2>
 *   Type of the second input to the {@link FFunction7}
 * @typeParam <T3>
 *   Type of the third input to the {@link FFunction7}
 * @typeParam <T4>
 *   Type of the fourth input to the {@link FFunction7}
 * @typeParam <T5>
 *   Type of the fifth input to the {@link FFunction7}
 * @typeParam <T6>
 *   Type of the sixth input to the {@link FFunction7}
 * @typeParam <T7>
 *   Type of the seventh input to the {@link FFunction7}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction7}
 */
export type FFunction7<T1, T2, T3, T4, T5, T6, T7, R> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4,
   t5: T5,
   t6: T6,
   t7: T7) => R;


/**
 * Verifies if the given `input` is potentially an instance of {@link FFunction7}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FFunction7}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FFunction7},
 *         `false` otherwise
 */
export function isFFunction7<T1, T2, T3, T4, T5, T6, T7, R>(input?: any): input is FFunction7<T1, T2, T3, T4, T5, T6, T7, R> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    7 === input.length;
}



/**
 * Represents a function that accepts seven arguments and produces a result, used as wrapper of {@link FFunction7}.
 * <p>
 * This is a functional interface whose functional method is {@link Function7#apply}.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link Function7}
 * @typeParam<T2>
 *   Type of the second input to the {@link Function7}
 * @typeParam<T3>
 *   Type of the third input to the {@link Function7}
 * @typeParam<T4>
 *   Type of the fourth input to the {@link Function7}
 * @typeParam<T5>
 *   Type of the fifth input to the {@link Function7}
 * @typeParam <T6>
 *   Type of the sixth input to the {@link Function7}
 * @typeParam <T7>
 *   Type of the seventh input to the {@link Function7}
 * @typeParam <R>
 *   Type of the result of the {@link Function7}
 */
export class Function7<T1, T2, T3, T4, T5, T6, T7, R> {

  protected constructor(protected readonly mapper: FFunction7<T1, T2, T3, T4, T5, T6, T7, R>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Function7}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Function7},
   *         `false` otherwise
   */
  static isFunction = <T1, T2, T3, T4, T5, T6, T7, R>(input?: any): input is Function7<T1, T2, T3, T4, T5, T6, T7, R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function7<T1, T2, T3, T4, T5, T6, T7, R>).andThen &&
    undefined !== (input as Function7<T1, T2, T3, T4, T5, T6, T7, R>).apply &&
    undefined !== (input as Function7<T1, T2, T3, T4, T5, T6, T7, R>).getMapper &&
    isFFunction7((input as Function7<T1, T2, T3, T4, T5, T6, T7, R>).getMapper());


  static of<T1, T2, T3, T4, T5, T6, T7, R>(func: FFunction7<T1, T2, T3, T4, T5, T6, T7, R>): Function7<T1, T2, T3, T4, T5, T6, T7, R>;
  static of<T1, T2, T3, T4, T5, T6, T7, R>(func: TFunction7<T1, T2, T3, T4, T5, T6, T7, R>): Function7<T1, T2, T3, T4, T5, T6, T7, R>;

  /**
   * Returns a {@link Function7} based on provided {@link TFunction7} parameter.
   *
   * @param func
   *    {@link TFunction7} instance to convert to a {@link Function7} one
   *
   * @return {@link Function7} based on provided {@link TFunction7}
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4, T5, T6, T7, R>(func: TFunction7<T1, T2, T3, T4, T5, T6, T7, R>): Function7<T1, T2, T3, T4, T5, T6, T7, R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return Function7.isFunction<T1, T2, T3, T4, T5, T6, T7, R>(func)
      ? func
      : new Function7(func);
  }


  /**
   * Returns internal `mapper`.
   *
   * @return {@link FFunction7}
   */
  getMapper = (): FFunction7<T1, T2, T3, T4, T5, T6, T7, R> =>
    this.mapper;


  /**
   *    Returns a composed {@link Function7} that first applies this {@link Function7} to its input, and then
   * applies the `after` {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function6} is applied
   *
   * @return composed {@link Function7} that first applies this {@link Function7} and then applies the
   *         `after` {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `after` is `null` or `undefined`
   */
  andThen = <V>(after: TFunction1<R, V>): Function7<T1, T2, T3, T4, T5, T6, T7, V> => {
    AssertUtil.notNullOrUndefined(
      after,
      'after must be not null and not undefined'
    );
    return new Function7(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6,
       t7: T7) =>
        Function1.of(after)
          .apply(
            this.apply(t1, t2, t3, t4, t5, t6, t7)
          )
    );
  }


  /**
   * Applies this {@link Function7} to the given argument.
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
   *
   * @return new instance of R
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6,
           t7: T7): R =>
    this.mapper(t1, t2, t3, t4, t5, t6, t7);

}
