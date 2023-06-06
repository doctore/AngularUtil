import { ArrayUtil, AssertUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';
import * as _ from 'lodash';

/**
 * Union type of {@link FPredicate1} and {@link Predicate1}
 */
export type TPredicate1<T> = FPredicate1<T> | Predicate1<T>;


/**
 * Represents the function approach of a predicate (boolean-valued function) of one argument.
 *
 * @typeParam <T>
 *   Type of parameter received by this {@link FPredicate1}
 */
export type FPredicate1<T> =
  (t: T) => boolean;


/**
 * Verifies if the given {@code input} is potentially an instance of {@link FPredicate1}.
 * <p>
 *    It is important to know {@code input} could be 'something' different from {@link FPredicate1}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the {@code length} function.
 *
 * @param input
 *    Object to verify
 *
 * @return {@code true} if {@code input} is potentially an instance of {@link FPredicate1},
 *         {@code false} otherwise
 */
export function isFPredicate1<T>(input?: any): input is FPredicate1<T> {
  return !_.isNil(input) &&
    'function' === typeof input &&
    1 === input.length;
}



/**
 * Represents a predicate (boolean-valued function) of one argument used as wrapper of {@link FPredicate1}.
 * <p>
 * This is a functional interface whose functional method is {@link Predicate1#apply}.
 *
 * @typeParam <T>
 *   Type of results returned by this {@link Predicate1}
 */
export class Predicate1<T> {

  private constructor(private readonly verifier: FPredicate1<T>) {}


  /**
   * Checks all given {@code predicates} to verify if all of them are satisfied.
   *
   * <pre>
   * Example:
   *   const isEven: Predicate1<number> = Predicate1.of((n: number) => 0 == n % 2)
   *   const isLowerThan20: FPredicate1<number> = (n: number) => 20 > n;
   *
   *   Predicate1.allOf([]).apply(5);                          // true
   *   Predicate1.allOf([isEven, isLowerThan20]).apply(10);    // true
   *   Predicate1.allOf([isEven, isLowerThan20]).apply(30);    // false
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate1} to verify
   *
   * @return {@link Predicate1} verifying all provided ones
   */
  static allOf = <T>(predicates?: Nullable<TPredicate1<T>[]>): Predicate1<T> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate1.alwaysTrue();
    }
    return Predicate1.of(
      (t: T) =>
        ArrayUtil.foldLeft(
          predicates,
          true,
          (previousBoolean, currentRawPred) =>
            previousBoolean &&
              Predicate1.of(currentRawPred!)
                .apply(t)
        )
    );
  }


  /**
   * Returns a {@link Predicate1} with {@code false} as result.
   *
   * @return {@link Predicate1}
   */
  static alwaysFalse = <T>(): Predicate1<T> =>
    new Predicate1<T>(() => false);


  /**
   * Returns a {@link Predicate1} with {@code true} as result.
   *
   * @return {@link Predicate1}
   */
  static alwaysTrue = <T>(): Predicate1<T> =>
    new Predicate1<T>(() => true);


  /**
   * Checks all given {@code predicates} to verify that at least one is satisfied.
   *
   * <pre>
   * Example:
   *   const isEven: Predicate1<number> = Predicate1.of((n: number) => 0 == n % 2)
   *   const isLowerThan20: FPredicate1<number> = (n: number) => 20 > n;
   *
   *   Predicate1.anyOf([]).apply(5);                          // false
   *   Predicate1.anyOf([isEven, isLowerThan20]).apply(21);    // false
   *   Predicate1.anyOf([isEven, isLowerThan20]).apply(11);    // true
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate1} to verify
   *
   * @return {@link Predicate1} verifying provided ones
   */
  static anyOf = <T>(predicates?: Nullable<TPredicate1<T>[]>): Predicate1<T> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate1.alwaysFalse();
    }
    return Predicate1.of(
      (t: T) => {
        for (let i = 0; i < predicates!.length; i++) {
          if (Predicate1.of(predicates![i]).apply(t)) {
            return true;
          }
        }
        return false;
      }
    );
  }


  /**
   * Verifies if the given {@code input} is an instance of {@link Predicate1}.
   *
   * @param input
   *    Object to verify
   *
   * @return {@code true} if {@code input} is an instance of {@link Predicate1},
   *         {@code false} otherwise
   */
  static isPredicate = <T>(input?: any): input is Predicate1<T> =>
    !_.isNil(input) &&
    undefined !== (input as Predicate1<T>).and &&
    undefined !== (input as Predicate1<T>).apply &&
    undefined !== (input as Predicate1<T>).not &&
    undefined !== (input as Predicate1<T>).or;


  /**
   * Returns a {@link Predicate1} describing the given {@link FPredicate1}.
   *
   * @param predicate
   *    {@link FPredicate1} used to evaluates the given instances of T
   *
   * @return an {@link Predicate1} as wrapper of {@code verifier}
   *
   * @throws {@link IllegalArgumentError} if {@code predicate} is {@code null} or {@code undefined}
   */
  static of<T>(predicate: FPredicate1<T>): Predicate1<T>;


  /**
   * Returns a {@link Predicate1} based on provided {@link TPredicate1} parameter.
   *
   * @param predicate
   *    {@link TPredicate1} instance to convert to a {@link Predicate1} one
   *
   * @return {@link Predicate1} based on provided {@link TPredicate1}
   *
   * @throws {@link IllegalArgumentError} if {@code predicate} is {@code null} or {@code undefined}
   */
  static of<T>(predicate: TPredicate1<T>): Predicate1<T>;


  static of<T>(predicate: TPredicate1<T>): Predicate1<T> {
    AssertUtil.notNullOrUndefined(
      predicate,
      'predicate must be not null and not undefined'
    );
    return (predicate instanceof Predicate1)
      ? predicate
      : new Predicate1(predicate);
  }


  /**
   *    Returns a composed {@link Predicate1} that represents a short-circuiting logical AND of this {@link Predicate1}
   * and another. When evaluating the composed {@link Predicate1}, if this {@link Predicate1} is {@code false}, then
   * the other {@link Predicate1} is not evaluated.
   *
   * @apiNote
   *    If {@code predicate} is {@code null} or {@code undefined} then only this {@link Predicate1} will be applied.
   *
   * @param predicate
   *    {@link TPredicate1} that will be logically-ANDed with this {@link Predicate1}
   *
   * @return a composed {@link Predicate1} that represents the short-circuiting logical AND of this {@link Predicate1}
   *         and {@code predicate}
   */
  and = (predicate: TPredicate1<T>): Predicate1<T> =>
    _.isNil(predicate)
      ? new Predicate1(
          (t: T) =>
            this.apply(t)
        )
      : new Predicate1(
          (t: T) =>
            this.apply(t) &&
              Predicate1.of(predicate).apply(t)
        );


  /**
   * Evaluates this {@link Predicate1} on the given {@code t}.
   *
   * @param t
   *    The input argument
   *
   * @return {@code true} if the input argument matches the predicate,
   *         {@code false} otherwise
   */
  apply = (t: T): boolean =>
    this.verifier(t);


  /**
   * Returns a {@link Predicate1} that represents the logical negation of this {@link Predicate1}.
   *
   * @return a {@link Predicate1} that represents the logical negation of this {@link Predicate1}
   */
  not = (): Predicate1<T> =>
    new Predicate1(
      (t: T) =>
        !this.apply(t)
    );


  /**
   *   Returns a composed {@link Predicate1} that represents a short-circuiting logical OR of this {@link Predicate1}
   * and another. When evaluating the composed {@link Predicate1}, if this {@link Predicate1} is {@code true}, then
   * the other {@link Predicate1} is not evaluated.
   *
   * @apiNote
   *    If {@code predicate} is {@code null} or {@code undefined} then only this {@link Predicate1} will be applied.
   *
   * @param predicate
   *    {@link TPredicate1} that will be logically-ORed with this {@link Predicate1}
   *
   * @return a composed {@link Predicate1} that represents the short-circuiting logical OR of this {@link Predicate1}
   *         and {@code predicate}
   */
  or = (predicate: TPredicate1<T>): Predicate1<T> =>
    _.isNil(predicate)
      ? new Predicate1(
          (t: T) =>
            this.apply(t)
        )
      : new Predicate1(
          (t: T) =>
            this.apply(t) ||
              Predicate1.of(predicate).apply(t)
        );

}
