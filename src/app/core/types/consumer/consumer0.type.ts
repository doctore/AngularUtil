import { AssertUtil, ObjectUtil } from '@app-core/util';

/**
 * Union type of {@link FConsumer0} and {@link Consumer0}
 */
export type TConsumer0 = FConsumer0 | Consumer0;


/**
 *    Represents an operation that does not accept an input argument and returns no result. Unlike most other
 * functional interfaces, {@link FConsumer0} is expected to operate via side effects.
 */
export type FConsumer0 =
  () => void;


/**
 * Verifies if the given `input` is potentially an instance of {@link FConsumer0}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FConsumer0}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FConsumer0},
 *         `false` otherwise
 */
export function isFConsumer0(input?: any): input is FConsumer0 {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    0 === input.length;
}



/**
 *    Represents an operation that does not accept an input argument and returns no result, used as wrapper of
 * {@link FConsumer0}. Unlike most other functional interfaces, {@link Consumer0} is expected to operate via
 * side effects.
 * <p>
 * This is a functional interface whose functional method is {@link Consumer0#apply}.
 */
export class Consumer0 {

  protected constructor(protected readonly action: FConsumer0) {}


  /**
   * Verifies if the given `input` is an instance of {@link Consumer0}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Consumer0},
   *         `false` otherwise
   */
  static isConsumer = (input?: any): input is Consumer0 =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Consumer0).andThen &&
    undefined !== (input as Consumer0).apply;


  /**
   * Returns a {@link Consumer0} describing the given {@link FConsumer0}.
   *
   * @param consumer
   *    {@link FConsumer0}
   *
   * @return an {@link Consumer0} as wrapper of `mapper`
   *
   * @throws {@link IllegalArgumentError} if `consumer` is `null` or `undefined`
   */
  static of(consumer: FConsumer0): Consumer0;


  /**
   * Returns a {@link Consumer0} based on provided {@link TConsumer0} parameter.
   *
   * @param consumer
   *    {@link TConsumer0} instance to convert to a {@link Consumer0} one
   *
   * @return {@link Consumer0} based on provided {@link TConsumer0}
   *
   * @throws {@link IllegalArgumentError} if `consumer` is `null` or `undefined`
   */
  static of(consumer: TConsumer0): Consumer0;


  static of(consumer: TConsumer0): Consumer0 {
    AssertUtil.notNullOrUndefined(
      consumer,
      'consumer must be not null and not undefined'
    );
    return Consumer0.isConsumer(consumer)
      ? consumer
      : new Consumer0(consumer);
  }


  /**
   *    Returns a composed {@link Consumer0} that first applies this {@link Consumer0} to its input, and then
   * applies the `after` {@link TConsumer0}.
   *
   * @apiNote
   *    If `after` is `null` or `undefined` then only this {@link Consumer0} will be applied.
   *
   * @param after
   *    {@link TConsumer0} to apply after this {@link Consumer0} is applied
   *
   * @return composed {@link Consumer0} that first applies this {@link Consumer0} and then applies the
   *         `after` {@link TConsumer0}
   */
  andThen = (after: TConsumer0): Consumer0 =>
    ObjectUtil.isNullOrUndefined(after)
      ? new Consumer0(
          () =>
            this.apply()
        )
      : new Consumer0(
          () => {
            this.apply();
            Consumer0.of(after).apply();
          }
        );


  /**
   * Applies this {@link Consumer0}.
   */
  apply = (): void =>
    this.action();

}
