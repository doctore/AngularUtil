import { AssertUtil, ObjectUtil } from '@app-core/util';

/**
 * Union type of {@link FConsumer4} and {@link FConsumer4}
 */
export type TConsumer4<T1, T2, T3, T4> = FConsumer4<T1, T2, T3, T4> | Consumer4<T1, T2, T3, T4>;


/**
 *    Represents an operation that accepts four input arguments and returns no result. Unlike most other
 * functional interfaces, {@link FConsumer4} is expected to operate via side effects.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FConsumer4}
 * @typeParam <T2>
 *   Type of the second input to the {@link FConsumer4}
 * @typeParam <T3>
 *   Type of the third input to the {@link FConsumer4}
 * @typeParam <T4>
 *   Type of the fourth input to the {@link FConsumer4}
 */
export type FConsumer4<T1, T2, T3, T4> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4) => void;


/**
 * Verifies if the given `input` is potentially an instance of {@link FConsumer4}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FConsumer4}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FConsumer4},
 *         `false` otherwise
 */
export function isFConsumer4<T1, T2, T3, T4>(input?: any): input is FConsumer4<T1, T2, T3, T4> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    4 === input.length;
}



/**
 *    Represents an operation that accepts four input arguments and returns no result, used as wrapper of
 * {@link FConsumer4}. Unlike most other functional interfaces, {@link Consumer4} is expected to operate via
 * side effects.
 * <p>
 * This is a functional interface whose functional method is {@link Consumer4#apply}.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link Consumer4}
 * @typeParam <T2>
 *   Type of the second input to the {@link Consumer4}
 * @typeParam <T3>
 *   Type of the third input to the {@link Consumer4}
 * @typeParam <T4>
 *   Type of the fourth input to the {@link Consumer4}
 */
export class Consumer4<T1, T2, T3, T4> {

  protected constructor(protected readonly action: FConsumer4<T1, T2, T3, T4>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Consumer4}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Consumer4},
   *         `false` otherwise
   */
  static isConsumer = <T1, T2, T3, T4>(input?: any): input is Consumer4<T1, T2, T3, T4> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Consumer4<T1, T2, T3, T4>).andThen &&
    undefined !== (input as Consumer4<T1, T2, T3, T4>).apply &&
    undefined !== (input as Consumer4<T1, T2, T3, T4>).getAction &&
    isFConsumer4((input as Consumer4<T1, T2, T3, T4>).getAction());


  static of<T1, T2, T3, T4>(consumer: FConsumer4<T1, T2, T3, T4>): Consumer4<T1, T2, T3, T4>;
  static of<T1, T2, T3, T4>(consumer: TConsumer4<T1, T2, T3, T4>): Consumer4<T1, T2, T3, T4>;

  /**
   * Returns a {@link Consumer4} based on provided {@link TConsumer4} parameter.
   *
   * @param consumer
   *    {@link TConsumer4} instance to convert to a {@link Consumer4} one
   *
   * @return {@link Consumer4} based on provided {@link TConsumer4}
   *
   * @throws {@link IllegalArgumentError} if `consumer` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4>(consumer: TConsumer4<T1, T2, T3, T4>): Consumer4<T1, T2, T3, T4> {
    AssertUtil.notNullOrUndefined(
      consumer,
      'consumer must be not null and not undefined'
    );
    return Consumer4.isConsumer<T1, T2, T3, T4>(consumer)
      ? consumer
      : new Consumer4(consumer);
  }


  /**
   * Returns internal `action`.
   *
   * @return {@link FConsumer3}
   */
  getAction = (): FConsumer4<T1, T2, T3, T4> =>
    this.action;


  /**
   *    Returns a composed {@link Consumer4} that first applies this {@link Consumer4} to its input, and then
   * applies the `after` {@link TConsumer4}.
   *
   * @apiNote
   *    If `after` is `null` or `undefined` then only this {@link TConsumer4} will be applied.
   *
   * @param after
   *    {@link TConsumer4} to apply after this {@link Consumer4} is applied
   *
   * @return composed {@link Consumer4} that first applies this {@link Consumer4} and then applies the
   *         `after` {@link TConsumer4}
   */
  andThen = (after: TConsumer4<T1, T2, T3, T4>): Consumer4<T1, T2, T3, T4> =>
    ObjectUtil.isNullOrUndefined(after)
      ? new Consumer4(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4) =>
            this.apply(t1, t2, t3, t4)
        )
      : new Consumer4(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4) => {
            this.apply(t1, t2, t3, t4);
            Consumer4.of(after)
              .apply(t1, t2, t3, t4);
          }
        );


  /**
   * Applies this {@link Consumer4} to the given argument.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   * @param t3
   *    The third input argument
   * @param t4
   *    The fourth input argument
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4): void =>
    this.action(t1, t2, t3, t4);

}
