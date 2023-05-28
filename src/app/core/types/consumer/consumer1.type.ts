import { NullableOrUndefined } from '@app-core/types';
import * as _ from 'lodash';

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
  (t: NullableOrUndefined<T>) => void;


/**
 * Verifies if the given {@code input} is potentially an instance of {@link FConsumer1}.
 * <p>
 *    It is important to know {@code input} could be 'something' different from {@link FConsumer1}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the {@code length} function.
 *
 * @param input
 *    Object to verify
 *
 * @return {@code true} if {@code input} is potentially an instance of {@link FConsumer1},
 *         {@code false} otherwise
 */
export function isFConsumer1<T>(input?: any): input is FConsumer1<T> {
  return !_.isNil(input) &&
    'function' === typeof input &&
    1 === input.length;
}



/**
 *    Represents an operation that accepts a single input argument and returns no result, used as wrapper of
 * {@link FConsumer1}. Unlike most other functional interfaces, {@link FConsumer1} is expected to operate via
 * side effects.
 * <p>
 * This is a functional interface whose functional method is {@link Consumer1#apply}.
 *
 * @typeParam <T>
 *   Type of the input to the {@link FConsumer1}
 */
export class Consumer1<T> {

  protected constructor(protected readonly action: FConsumer1<T>) {}


  /**
   * Verifies if the given {@code input} is an instance of {@link Consumer1}.
   *
   * @param input
   *    Object to verify
   *
   * @return {@code true} if {@code input} is an instance of {@link Consumer1},
   *         {@code false} otherwise
   */
  static isConsumer = <T>(input?: any): input is Consumer1<T> =>
    !_.isNil(input) &&
    undefined !== (input as Consumer1<T>).andThen &&
    undefined !== (input as Consumer1<T>).apply;


  /**
   * Returns a {@link Consumer1} describing the given {@link FConsumer1}.
   *
   * @param input
   *    {@link FConsumer1} used to perform an operation over the given instance of T
   *
   * @return an {@link Consumer1} as wrapper of {@code mapper}
   */
  static of<T>(input: FConsumer1<T>): Consumer1<T>;


  /**
   * Returns a {@link Consumer1} based on provided {@link TConsumer1} parameter.
   *
   * @param input
   *    {@link TConsumer1} instance to convert to a {@link Consumer1} one
   *
   * @return {@link Consumer1} based on provided {@link TConsumer1}
   */
  static of<T>(input: TConsumer1<T>): Consumer1<T>;


  static of<T>(input: FConsumer1<T> | TConsumer1<T>): Consumer1<T> {
    return (input instanceof Consumer1)
      ? input
      : new Consumer1(input);
  }


  /**
   *    Returns a composed {@link Consumer1} that first applies this {@link Consumer1} to its input, and then
   * applies the {@code after} {@link TConsumer1}.
   *
   * @param after
   *    {@link TConsumer1} to apply after this {@link Consumer1} is applied
   *
   * @return composed {@link Consumer1} that first applies this {@link Consumer1} and then applies the
   *         {@code after} {@link TConsumer1}
   */
  andThen = (after: TConsumer1<T>): Consumer1<T> =>
    new Consumer1(
      (t: NullableOrUndefined<T>) => {
        this.apply(t);
        Consumer1.of(after)
          .apply(t);
      }
    );


  /**
   * Applies this {@link Consumer1} to the given argument.
   *
   * @param t
   *    The input argument
   */
  apply = (t: NullableOrUndefined<T>): void => this.action(t);

}
