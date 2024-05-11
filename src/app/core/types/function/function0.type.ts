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
 * Verifies if the given `input` is potentially an instance of {@link FFunction0}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FFunction0}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FFunction0},
 *         `false` otherwise
 */
export function isFFunction0<R>(input?: any): input is FFunction0<R> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    0 === input.length;
}



/**
 * Represents a function that does not accept arguments and produces a result, used as wrapper of {@link FFunction0}.
 * <p>
 * This is a functional interface whose functional method is {@link Function0#apply}.
 *
 * @typeParam <R>
 *   Type of the result of the {@link Function0}
 */
export class Function0<R> {

  protected constructor(protected readonly mapper: FFunction0<R>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Function0}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Function0},
   *         `false` otherwise
   */
  static isFunction = <R>(input?: any): input is Function0<R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Function0<R>).apply &&
    undefined !== (input as Function0<R>).getMapper &&
    isFFunction0((input as Function0<R>).getMapper());


  static of<R>(func: FFunction0<R>): Function0<R>;
  static of<R>(func: TFunction0<R>): Function0<R>;

  /**
   * Returns a {@link Function0} based on provided {@link TFunction0} parameter.
   *
   * @param func
   *    {@link TFunction0} instance to convert to a {@link Function0} one
   *
   * @return {@link Function0} based on provided {@link TFunction0}
   *
   * @throws {IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<R>(func: TFunction0<R>): Function0<R> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return Function0.isFunction<R>(func)
      ? func
      : new Function0(func);
  }


  /**
   * Returns internal `mapper`.
   *
   * @return {@link FFunction0}
   */
  getMapper = (): FFunction0<R> =>
    this.mapper;


  /**
   * Applies this {@link Function0} returning an instance of type `R`.
   *
   * @return new instance of R
   */
  apply = (): R =>
    this.mapper();

}
