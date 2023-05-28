import { NullableOrUndefined } from '@app-core/types';
import * as _ from 'lodash';

/**
 * Union type of {@link FConsumer2} and {@link FConsumer2}
 */
export type TConsumer2<T1, T2> = FConsumer2<T1, T2> | Consumer2<T1, T2>;


/**
 *    Represents an operation that accepts two input arguments and returns no result. Unlike most other
 * functional interfaces, {@link FConsumer2} is expected to operate via side effects.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link FConsumer2}
 * @typeParam<T2>
 *   Type of the second input to the {@link FConsumer2}
 */
export type FConsumer2<T1, T2> =
  (t1: NullableOrUndefined<T1>,
   t2: NullableOrUndefined<T2>) => void;


/**
 * Verifies if the given {@code input} is potentially an instance of {@link FConsumer2}.
 * <p>
 *    It is important to know {@code input} could be 'something' different from {@link FConsumer2}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the {@code length} function.
 *
 * @param input
 *    Object to verify
 *
 * @return {@code true} if {@code input} is potentially an instance of {@link FConsumer2},
 *         {@code false} otherwise
 */
export function isFConsumer2<T1, T2>(input?: any): input is FConsumer2<T1, T2> {
  return !_.isNil(input) &&
    'function' === typeof input &&
    2 === input.length;
}



/**
 *    Represents an operation that accepts two input arguments and returns no result, used as wrapper of
 * {@link FConsumer2}. Unlike most other functional interfaces, {@link FConsumer2} is expected to operate via
 * side effects.
 * <p>
 * This is a functional interface whose functional method is {@link Consumer2#apply}.
 *
 * @typeParam<T1>
 *   Type of the first input to the {@link FConsumer2}
 * @typeParam<T2>
 *   Type of the second input to the {@link FConsumer2}
 */
export class Consumer2<T1, T2> {

  protected constructor(protected readonly action: FConsumer2<T1, T2>) {}


  /**
   * Verifies if the given {@code input} is an instance of {@link Consumer2}.
   *
   * @param input
   *    Object to verify
   *
   * @return {@code true} if {@code input} is an instance of {@link Consumer2},
   *         {@code false} otherwise
   */
  static isConsumer = <T1, T2>(input?: any): input is Consumer2<T1, T2> =>
    !_.isNil(input) &&
    undefined !== (input as Consumer2<T1, T2>).andThen &&
    undefined !== (input as Consumer2<T1, T2>).apply;


  /**
   * Returns a {@link Consumer2} describing the given {@link FConsumer2}.
   *
   * @param input
   *    {@link FConsumer2} used to perform an operation over the given instances of T
   *
   * @return an {@link Consumer2} as wrapper of {@code mapper}
   */
  static of<T1, T2>(input: FConsumer2<T1, T2>): Consumer2<T1, T2>;


  /**
   * Returns a {@link Consumer2} based on provided {@link TConsumer2} parameter.
   *
   * @param input
   *    {@link TConsumer2} instance to convert to a {@link Consumer2} one
   *
   * @return {@link Consumer2} based on provided {@link TConsumer2}
   */
  static of<T1, T2>(input: TConsumer2<T1, T2>): Consumer2<T1, T2>;


  static of<T1, T2>(input: FConsumer2<T1, T2> | TConsumer2<T1, T2>): Consumer2<T1, T2> {
    return (input instanceof Consumer2)
      ? input
      : new Consumer2(input);
  }


  /**
   *    Returns a composed {@link Consumer2} that first applies this {@link Consumer2} to its input, and then
   * applies the {@code after} {@link TConsumer2}.
   *
   * @param after
   *    {@link TConsumer2} to apply after this {@link Consumer2 is applied
   *
   * @return composed {@link Consumer2} that first applies this {@link Consumer2} and then applies the
   *         {@code after} {@link TConsumer2}
   */
  andThen = (after: TConsumer2<T1, T2>): Consumer2<T1, T2> =>
    new Consumer2(
      (t1: NullableOrUndefined<T1>,
       t2: NullableOrUndefined<T2>) => {
        this.apply(t1, t2);
        Consumer2.of(after)
          .apply(t1, t2);
      }
    );


  /**
   * Applies this {@link Consumer2} to the given argument.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   */
  apply = (t1: NullableOrUndefined<T1>,
           t2: NullableOrUndefined<T2>): void => this.action(t1, t2);

}
