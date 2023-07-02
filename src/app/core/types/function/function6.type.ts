import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Function1, TFunction1 } from '@app-core/types/function';

/**
 * Union type of {@link FFunction6} and {@link Function6}
 */
export type TFunction6<T1, T2, T3, T4, T5, T6, R> = FFunction6<T1, T2, T3, T4, T5, T6, R> | Function6<T1, T2, T3, T4, T5, T6, R>;


/**
 * Represents the function approach of a function that accepts six arguments and produces a result.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FFunction6}
 * @typeParam <T2>
 *   Type of the second input to the {@link FFunction6}
 * @typeParam <T3>
 *   Type of the third input to the {@link FFunction6}
 * @typeParam <T4>
 *   Type of the fourth input to the {@link FFunction6}
 * @typeParam <T5>
 *   Type of the fifth input to the {@link FFunction6}
 * @typeParam <T6>
 *   Type of the sixth input to the {@link FFunction6}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction6}
 */
export type FFunction6<T1, T2, T3, T4, T5, T6, R> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4,
   t5: T5,
   t6: T6) => R;


/**
 * Verifies if the given `input` is potentially an instance of {@link FFunction6}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FFunction6}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FFunction6},
 *         `false` otherwise
 */
export function isFFunction6<T1, T2, T3, T4, T5, T6, R>(input?: any): input is FFunction6<T1, T2, T3, T4, T5, T6, R> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    6 === input.length;
}



/**
 * Represents a function that accepts six arguments and produces a result, used as wrapper of {@link FFunction6}.
 * <p>
 * This is a functional interface whose functional method is {@link Function6#apply}.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link Function6}
 * @typeParam<T2>
 *   Type of the second input to the {@link Function6}
 * @typeParam<T3>
 *   Type of the third input to the {@link Function6}
 * @typeParam<T4>
 *   Type of the fourth input to the {@link Function6}
 * @typeParam<T5>
 *   Type of the fifth input to the {@link Function6}
 * @typeParam <T6>
 *   Type of the sixth input to the {@link Function6}
 * @typeParam <R>
 *   Type of the result of the {@link Function6}
 */
export class Function6<T1, T2, T3, T4, T5, T6, R> {

  protected constructor(protected readonly mapper: FFunction6<T1, T2, T3, T4, T5, T6, R>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Function6}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Function6},
   *         `false` otherwise
   */
  static isFunction = <T1, T2, T3, T4, T5, T6, R>(input?: any): input is Function6<T1, T2, T3, T4, T5, T6, R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function6<T1, T2, T3, T4, T5, T6, R>).andThen &&
    undefined !== (input as Function6<T1, T2, T3, T4, T5, T6, R>).apply &&
    undefined !== (input as Function6<T1, T2, T3, T4, T5, T6, R>).getMapper;


  static of<T1, T2, T3, T4, T5, T6, R>(func: FFunction6<T1, T2, T3, T4, T5, T6, R>): Function6<T1, T2, T3, T4, T5, T6, R>;
  static of<T1, T2, T3, T4, T5, T6, R>(func: TFunction6<T1, T2, T3, T4, T5, T6, R>): Function6<T1, T2, T3, T4, T5, T6, R>;

  /**
   * Returns a {@link Function6} based on provided {@link TFunction6} parameter.
   *
   * @param func
   *    {@link TFunction6} instance to convert to a {@link Function6} one
   *
   * @return {@link Function6} based on provided {@link TFunction6}
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4, T5, T6, R>(func: TFunction6<T1, T2, T3, T4, T5, T6, R>): Function6<T1, T2, T3, T4, T5, T6, R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return Function6.isFunction<T1, T2, T3, T4, T5, T6, R>(func)
      ? func
      : new Function6(func);
  }


  /**
   * Returns internal `mapper`.
   *
   * @return {@link FFunction6}
   */
  getMapper = (): FFunction6<T1, T2, T3, T4, T5, T6, R> =>
    this.mapper;


  /**
   *    Returns a composed {@link Function6} that first applies this {@link Function6} to its input, and then
   * applies the `after` {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function6} is applied
   *
   * @return composed {@link Function6} that first applies this {@link Function6} and then applies the
   *         `after` {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `after` is `null` or `undefined`
   */
  andThen = <V>(after: TFunction1<R, V>): Function6<T1, T2, T3, T4, T5, T6, V> => {
    AssertUtil.notNullOrUndefined(
      after,
      'after must be not null and not undefined'
    );
    return new Function6(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6) =>
        Function1.of(after)
          .apply(
            this.apply(t1, t2, t3, t4, t5, t6)
          )
    );
  }


  /**
   * Applies this {@link Function6} to the given argument.
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
   *
   * @return new instance of R
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6): R =>
    this.mapper(t1, t2, t3, t4, t5, t6);

}
