import { AssertUtil, ObjectUtil } from '@app-core/util';

/**
 * Union type of {@link FConsumer1} and {@link FConsumer1}
 */
export type TConsumer1<T> = FConsumer1<T> | Consumer1<T>;


/**
 *    Represents an operation that accepts a single input argument and returns no result. Unlike most other
 * functional interfaces, {@link FConsumer1} is expected to operate via side effects.
 *
 * @typeParam <T>
 *   Type of the input to the {@link FConsumer1}
 */
export type FConsumer1<T> =
  (t: T) => void;


/**
 * Verifies if the given `input` is potentially an instance of {@link FConsumer1}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FConsumer1}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FConsumer1},
 *         `false` otherwise
 */
export function isFConsumer1<T>(input?: any): input is FConsumer1<T> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    1 === input.length;
}



/**
 *    Represents an operation that accepts a single input argument and returns no result, used as wrapper of
 * {@link FConsumer1}. Unlike most other functional interfaces, {@link Consumer1} is expected to operate via
 * side effects.
 * <p>
 * This is a functional interface whose functional method is {@link Consumer1#apply}.
 *
 * @typeParam <T>
 *   Type of the input to the {@link Consumer1}
 */
export class Consumer1<T> {

  protected constructor(protected readonly action: FConsumer1<T>) {}


  /**
   * Verifies if the given `input` is an instance of {@link Consumer1}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Consumer1},
   *         `false` otherwise
   */
  static isConsumer = <T>(input?: any): input is Consumer1<T> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Consumer1<T>).andThen &&
    undefined !== (input as Consumer1<T>).apply;


  static of<T>(consumer: FConsumer1<T>): Consumer1<T>;
  static of<T>(consumer: TConsumer1<T>): Consumer1<T>;

  /**
   * Returns a {@link Consumer1} based on provided {@link TConsumer1} parameter.
   *
   * @param consumer
   *    {@link TConsumer1} instance to convert to a {@link Consumer1} one
   *
   * @return {@link Consumer1} based on provided {@link TConsumer1}
   *
   * @throws {@link IllegalArgumentError} if `consumer` is `null` or `undefined`
   */
  static of<T>(consumer: TConsumer1<T>): Consumer1<T> {
    AssertUtil.notNullOrUndefined(
      consumer,
      'consumer must be not null and not undefined'
    );
    return Consumer1.isConsumer<T>(consumer)
      ? consumer
      : new Consumer1(consumer);
  }


  /**
   *    Returns a composed {@link Consumer1} that first applies this {@link Consumer1} to its input, and then
   * applies the `after` {@link TConsumer1}.
   *
   * @apiNote
   *    If `after` is `null` or `undefined` then only this {@link TConsumer1} will be applied.
   *
   * @param after
   *    {@link TConsumer1} to apply after this {@link Consumer1} is applied
   *
   * @return composed {@link Consumer1} that first applies this {@link Consumer1} and then applies the
   *         `after` {@link TConsumer1}
   */
  andThen = (after: TConsumer1<T>): Consumer1<T> =>
    ObjectUtil.isNullOrUndefined(after)
      ? new Consumer1(
          (t: T) =>
            this.apply(t)
        )
      : new Consumer1(
          (t: T) => {
            this.apply(t);
            Consumer1.of(after).apply(t);
          }
        );


  /**
   * Applies this {@link Consumer1} to the given argument.
   *
   * @param t
   *    The input argument
   */
  apply = (t: T): void =>
    this.action(t);

}
