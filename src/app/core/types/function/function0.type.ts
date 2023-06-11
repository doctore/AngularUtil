import { AssertUtil, ObjectUtil } from '@app-core/util';

/**
 * Union type of {@link FFunction0} and {@link Function0}
 */
export type TFunction0<R> = FFunction0<R> | Function0<R>;


/**
 * Represents the function approach of a function that does not accept arguments and produces a result.
 *
 * @typeParam <R>
 *   Type of the result of the {@link FFunction0}
 */
export type FFunction0<R> =
  () => R;


/**
 * Verifies if the given {@code input} is potentially an instance of {@link FFunction0}.
 * <p>
 *    It is important to know {@code input} could be 'something' different from {@link FFunction0}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the {@code length} function.
 *
 * @param input
 *    Object to verify
 *
 * @return {@code true} if {@code input} is potentially an instance of {@link FFunction0},
 *         {@code false} otherwise
 */
export function isFFunction0<R>(input?: any): input is FFunction0<R> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    0 === input.length;
}



/**
 * Represents a function that accepts one argument and produces a result, used as wrapper of {@link FFunction0}.
 * <p>
 * This is a functional interface whose functional method is {@link Function0#apply}.
 *
 * @typeParam <R>
 *   Type of the result of the {@link Function0}
 */
export class Function0<R> {

  protected constructor(protected readonly mapper: FFunction0<R>) {}


  /**
   * Verifies if the given {@code input} is an instance of {@link Function0}.
   *
   * @param input
   *    Object to verify
   *
   * @return {@code true} if {@code input} is an instance of {@link Function0},
   *         {@code false} otherwise
   */
  static isFunction = <R>(input?: any): input is Function0<R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function0<R>).apply;


  /**
   * Returns a {@link Function0} describing the given {@link FFunction0}.
   *
   * @param func
   *    {@link FFunction0} used to return instances of R
   *
   * @return an {@link Function0} as wrapper of {@code mapper}
   *
   * @throws {@link IllegalArgumentError} if {@code func} is {@code null} or {@code undefined}
   */
  static of<R>(func: FFunction0<R>): Function0<R>;


  /**
   * Returns a {@link Function0} based on provided {@link TFunction0} parameter.
   *
   * @param func
   *    {@link TFunction0} instance to convert to a {@link Function0} one
   *
   * @return {@link Function0} based on provided {@link TFunction0}
   *
   * @throws {@link IllegalArgumentError} if {@code func} is {@code null} or {@code undefined}
   */
  static of<R>(func: TFunction0<R>): Function0<R>;


  static of<R>(func: FFunction0<R> | TFunction0<R>): Function0<R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return (func instanceof Function0)
      ? func
      : new Function0(func);
  }


  /**
   * Applies this {@link Function0} to the given argument.
   *
   * @return new instance of R
   */
  apply = (): R =>
    this.mapper();

}
