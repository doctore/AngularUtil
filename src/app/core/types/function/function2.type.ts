import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Function1, TFunction1 } from '@app-core/types/function';

/**
 * Union type of {@link FFunction2} and {@link Function2}
 */
export type TFunction2<T1, T2, R> = FFunction2<T1, T2, R> | Function2<T1, T2, R>;


/**
 * Represents the function approach of a function that accepts two arguments and produces a result.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FFunction2}
 * @typeParam <T2>
 *   Type of the second input to the {@link FFunction2}
 * @typeParam <R>
 *   Type of the result of the {@link FFunction2}
 */
export type FFunction2<T1, T2, R> =
  (t1: T1,
   t2: T2) => R;


/**
 * Verifies if the given `input` is potentially an instance of {@link FFunction2}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FFunction2}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FFunction2},
 *         `false` otherwise
 */
export function isFFunction2<T1, T2, R>(input?: any): input is FFunction2<T1, T2, R> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    2 === input.length;
}



/**
 * Represents a function that accepts two arguments and produces a result, used as wrapper of {@link FFunction2}.
 * <p>
 * This is a functional interface whose functional method is {@link Function2#apply}.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link Function2}
 * @typeParam<T2>
 *   Type of the second input to the {@link Function2}
 * @typeParam <R>
 *   Type of the result of the {@link Function2}
 */
export class Function2<T1, T2, R> {

  protected constructor(protected readonly mapper: FFunction2<T1, T2, R>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Function2}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Function2},
   *         `false` otherwise
   */
  static isFunction = <T1, T2, R>(input?: any): input is Function2<T1, T2, R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function2<T1, T2, R>).andThen &&
    undefined !== (input as Function2<T1, T2, R>).apply &&
    undefined !== (input as Function2<T1, T2, R>).getMapper &&
    isFFunction2((input as Function2<T1, T2, R>).getMapper());


  static of<T1, T2, R>(func: FFunction2<T1, T2, R>): Function2<T1, T2, R>;
  static of<T1, T2, R>(func: TFunction2<T1, T2, R>): Function2<T1, T2, R>;

  /**
   * Returns a {@link Function2} describing the given {@link FFunction2}.
   *
   * @param func
   *    {@link FFunction2} used to evaluates the given instances of T and return an R one
   *
   * @return an {@link Function2} as wrapper of `mapper`
   *
   * @throws {IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<T1, T2, R>(func: TFunction2<T1, T2, R>): Function2<T1, T2, R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return Function2.isFunction<T1, T2, R>(func)
      ? func
      : new Function2(func);
  }


  /**
   * Returns internal `mapper`.
   *
   * @return {@link FFunction2}
   */
  getMapper = (): FFunction2<T1, T2, R> =>
    this.mapper;


  /**
   *    Returns a composed {@link Function2} that first applies this {@link Function2} to its input, and then
   * applies the `after` {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link Function2} is applied
   *
   * @return composed {@link Function2} that first applies this {@link Function2} and then applies the
   *         `after` {@link TFunction1}
   *
   * @throws {IllegalArgumentError} if `after` is `null` or `undefined`
   */
  andThen = <V>(after: TFunction1<R, V>): Function2<T1, T2, V> => {
    AssertUtil.notNullOrUndefined(
      after,
      'after must be not null and not undefined'
    );
    return new Function2(
      (t1: T1,
       t2: T2) =>
        Function1.of(after).apply(
          this.apply(t1, t2)
        )
    );
  }


  /**
   * Applies this {@link Function2} to the given arguments.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   *
   * @return new instance of R
   */
  apply = (t1: T1,
           t2: T2): R =>
    this.mapper(t1, t2);

}
