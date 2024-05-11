import { AssertUtil, ObjectUtil } from '@app-core/util';

/**
 * Union type of {@link FConsumer3} and {@link FConsumer3}
 */
export type TConsumer3<T1, T2, T3> = FConsumer3<T1, T2, T3> | Consumer3<T1, T2, T3>;


/**
 *    Represents an operation that accepts three input arguments and returns no result. Unlike most other
 * functional interfaces, {@link FConsumer3} is expected to operate via side effects.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FConsumer3}
 * @typeParam <T2>
 *   Type of the second input to the {@link FConsumer3}
 * @typeParam <T3>
 *   Type of the third input to the {@link FConsumer3}
 */
export type FConsumer3<T1, T2, T3> =
  (t1: T1,
   t2: T2,
   t3: T3) => void;


/**
 * Verifies if the given `input` is potentially an instance of {@link FConsumer3}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FConsumer3}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FConsumer3},
 *         `false` otherwise
 */
export function isFConsumer3<T1, T2, T3>(input?: any): input is FConsumer3<T1, T2, T3> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    3 === input.length;
}



/**
 *    Represents an operation that accepts three input arguments and returns no result, used as wrapper of
 * {@link FConsumer3}. Unlike most other functional interfaces, {@link Consumer3} is expected to operate via
 * side effects.
 * <p>
 * This is a functional interface whose functional method is {@link Consumer3#apply}.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link Consumer3}
 * @typeParam <T2>
 *   Type of the second input to the {@link Consumer3}
 * @typeParam <T3>
 *   Type of the third input to the {@link Consumer3}
 */
export class Consumer3<T1, T2, T3> {

  protected constructor(protected readonly action: FConsumer3<T1, T2, T3>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Consumer3}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Consumer3},
   *         `false` otherwise
   */
  static isConsumer = <T1, T2, T3>(input?: any): input is Consumer3<T1, T2, T3> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Consumer3<T1, T2, T3>).andThen &&
    undefined !== (input as Consumer3<T1, T2, T3>).apply &&
    undefined !== (input as Consumer3<T1, T2, T3>).getAction &&
    isFConsumer3((input as Consumer3<T1, T2, T3>).getAction());


  static of<T1, T2, T3>(consumer: FConsumer3<T1, T2, T3>): Consumer3<T1, T2, T3>;
  static of<T1, T2, T3>(consumer: TConsumer3<T1, T2, T3>): Consumer3<T1, T2, T3>;

  /**
   * Returns a {@link Consumer3} based on provided {@link TConsumer3} parameter.
   *
   * @param consumer
   *    {@link TConsumer3} instance to convert to a {@link Consumer3} one
   *
   * @return {@link Consumer3} based on provided {@link TConsumer3}
   *
   * @throws {IllegalArgumentError} if `consumer` is `null` or `undefined`
   */
  static of<T1, T2, T3>(consumer: TConsumer3<T1, T2, T3>): Consumer3<T1, T2, T3> {
    AssertUtil.notNullOrUndefined(
      consumer,
      'consumer must be not null and not undefined'
    );
    return Consumer3.isConsumer<T1, T2, T3>(consumer)
      ? consumer
      : new Consumer3(consumer);
  }


  /**
   * Returns internal `action`.
   *
   * @return {@link FConsumer3}
   */
  getAction = (): FConsumer3<T1, T2, T3> =>
    this.action;


  /**
   *    Returns a composed {@link Consumer3} that first applies this {@link Consumer3} to its input, and then
   * applies the `after` {@link TConsumer3}.
   *
   * @apiNote
   *    If `after` is `null` or `undefined` then only this {@link TConsumer3} will be applied.
   *
   * @param after
   *    {@link TConsumer3} to apply after this {@link Consumer3} is applied
   *
   * @return composed {@link Consumer3} that first applies this {@link Consumer3} and then applies the
   *         `after` {@link TConsumer3}
   */
  andThen = (after: TConsumer3<T1, T2, T3>): Consumer3<T1, T2, T3> =>
    ObjectUtil.isNullOrUndefined(after)
      ? new Consumer3(
          (t1: T1,
           t2: T2,
           t3: T3) =>
            this.apply(t1, t2, t3)
        )
      : new Consumer3(
          (t1: T1,
           t2: T2,
           t3: T3) => {
            this.apply(t1, t2, t3);
            Consumer3.of(after)
              .apply(t1, t2, t3);
          }
        );


  /**
   * Applies this {@link Consumer3} to the given argument.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   * @param t3
   *    The third input argument
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3): void =>
    this.action(t1, t2, t3);

}
