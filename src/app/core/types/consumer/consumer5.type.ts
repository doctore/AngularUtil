import { AssertUtil, ObjectUtil } from '@app-core/util';

/**
 * Union type of {@link FConsumer5} and {@link FConsumer5}
 */
export type TConsumer5<T1, T2, T3, T4, T5> = FConsumer5<T1, T2, T3, T4, T5> | Consumer5<T1, T2, T3, T4, T5>;


/**
 *    Represents an operation that accepts five input arguments and returns no result. Unlike most other
 * functional interfaces, {@link FConsumer5} is expected to operate via side effects.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link FConsumer5}
 * @typeParam <T2>
 *   Type of the second input to the {@link FConsumer5}
 * @typeParam <T3>
 *   Type of the third input to the {@link FConsumer5}
 * @typeParam <T4>
 *   Type of the fourth input to the {@link FConsumer5}
 * @typeParam <T5>
 *   Type of the fifth input to the {@link FConsumer5}
 */
export type FConsumer5<T1, T2, T3, T4, T5> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4,
   t5: T5) => void;


/**
 * Verifies if the given `input` is potentially an instance of {@link FConsumer5}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FConsumer5}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FConsumer5},
 *         `false` otherwise
 */
export function isFConsumer5<T1, T2, T3, T4, T5>(input?: any): input is FConsumer5<T1, T2, T3, T4, T5> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    5 === input.length;
}



/**
 *    Represents an operation that accepts four input arguments and returns no result, used as wrapper of
 * {@link FConsumer5}. Unlike most other functional interfaces, {@link Consumer5} is expected to operate via
 * side effects.
 * <p>
 * This is a functional interface whose functional method is {@link Consumer5#apply}.
 *
 * @typeParam <T1>
 *   Type of the first input to the {@link Consumer5}
 * @typeParam <T2>
 *   Type of the second input to the {@link Consumer5}
 * @typeParam <T3>
 *   Type of the third input to the {@link Consumer5}
 * @typeParam <T4>
 *   Type of the fourth input to the {@link Consumer5}
 * @typeParam <T5>
 *   Type of the fifth input to the {@link Consumer5}
 */
export class Consumer5<T1, T2, T3, T4, T5> {

  protected constructor(protected readonly action: FConsumer5<T1, T2, T3, T4, T5>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Consumer5}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Consumer5},
   *         `false` otherwise
   */
  static isConsumer = <T1, T2, T3, T4, T5>(input?: any): input is Consumer5<T1, T2, T3, T4, T5> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Consumer5<T1, T2, T3, T4, T5>).andThen &&
    undefined !== (input as Consumer5<T1, T2, T3, T4, T5>).apply &&
    undefined !== (input as Consumer5<T1, T2, T3, T4, T5>).getAction &&
    isFConsumer5((input as Consumer5<T1, T2, T3, T4, T5>).getAction());


  static of<T1, T2, T3, T4, T5>(consumer: FConsumer5<T1, T2, T3, T4, T5>): Consumer5<T1, T2, T3, T4, T5>;
  static of<T1, T2, T3, T4, T5>(consumer: TConsumer5<T1, T2, T3, T4, T5>): Consumer5<T1, T2, T3, T4, T5>;

  /**
   * Returns a {@link Consumer5} based on provided {@link TConsumer5} parameter.
   *
   * @param consumer
   *    {@link TConsumer5} instance to convert to a {@link Consumer5} one
   *
   * @return {@link Consumer5} based on provided {@link TConsumer5}
   *
   * @throws {@link IllegalArgumentError} if `consumer` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4, T5>(consumer: TConsumer5<T1, T2, T3, T4, T5>): Consumer5<T1, T2, T3, T4, T5> {
    AssertUtil.notNullOrUndefined(
      consumer,
      'consumer must be not null and not undefined'
    );
    return Consumer5.isConsumer<T1, T2, T3, T4, T5>(consumer)
      ? consumer
      : new Consumer5(consumer);
  }


  /**
   * Returns internal `action`.
   *
   * @return {@link FConsumer3}
   */
  getAction = (): FConsumer5<T1, T2, T3, T4, T5> =>
    this.action;


  /**
   *    Returns a composed {@link Consumer5} that first applies this {@link Consumer5} to its input, and then
   * applies the `after` {@link TConsumer5}.
   *
   * @apiNote
   *    If `after` is `null` or `undefined` then only this {@link TConsumer5} will be applied.
   *
   * @param after
   *    {@link TConsumer5} to apply after this {@link Consumer5} is applied
   *
   * @return composed {@link Consumer5} that first applies this {@link Consumer5} and then applies the
   *         `after` {@link TConsumer5}
   */
  andThen = (after: TConsumer5<T1, T2, T3, T4, T5>): Consumer5<T1, T2, T3, T4, T5> =>
    ObjectUtil.isNullOrUndefined(after)
      ? new Consumer5(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5) =>
            this.apply(t1, t2, t3, t4, t5)
        )
      : new Consumer5(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5) => {
            this.apply(t1, t2, t3, t4, t5);
            Consumer5.of(after)
              .apply(t1, t2, t3, t4, t5);
          }
        );


  /**
   * Applies this {@link Consumer5} to the given argument.
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
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5): void =>
    this.action(t1, t2, t3, t4, t5);

}
