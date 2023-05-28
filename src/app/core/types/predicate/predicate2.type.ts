import { ArrayUtil } from '@app-core/util';
import { Nullable, NullableOrUndefined } from '@app-core/types';
import * as _ from 'lodash';

/**
 * Union type of {@link FPredicate2} and {@link Predicate2}
 */
export type TPredicate2<T1, T2> = FPredicate2<T1, T2> | Predicate2<T1, T2>;


/**
 * Represents the function approach of a predicate (boolean-valued function) of one argument.
 *
 * @typeParam <T1>
 *   Type of first parameter received by this {@link FPredicate2}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link FPredicate2}
 */
export type FPredicate2<T1, T2> =
  (t1: NullableOrUndefined<T1>,
   t2: NullableOrUndefined<T2>) => boolean;


/**
 * Verifies if the given {@code input} is potentially an instance of {@link FPredicate2}.
 * <p>
 *    It is important to know {@code input} could be 'something' different from {@link FPredicate2}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the {@code length} function.
 *
 * @param input
 *    Object to verify
 *
 * @return {@code true} if {@code input} is potentially an instance of {@link FPredicate2},
 *         {@code false} otherwise
 */
export function isFPredicate2<T1, T2>(input?: any): input is FPredicate2<T1, T2> {
  return !_.isNil(input) &&
    'function' === typeof input &&
    2 === input.length;
}



/**
 * Represents a predicate (boolean-valued function) of one argument used as wrapper of {@link FPredicate2}.
 * <p>
 * This is a functional interface whose functional method is {@link Predicate2#apply}.
 *
 * @typeParam <T1>
 *   Type of results returned by this {@link Predicate2}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link FPredicate2}
 */
export class Predicate2<T1, T2> {

  private constructor(private readonly verifier: FPredicate2<T1, T2>) {}


  /**
   * Checks all given {@code predicates} to verify if all of them are satisfied.
   *
   * <pre>
   * Example:
   *   const isNumberEvenAndStringLongerThan2: Predicate2<number, string> = Predicate2.of((n: number, s: string) => 0 == n % 2 && 2 < s.length);
   *   const isNumberLowerThan20AndStringLongerThan5: FPredicate2<number, string> = (n: number, s: string) => 20 > n && 5 < s.length;
   *
   *   Predicate2.allOf([]).apply(5, '');                                                                                    // true
   *   Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(10, 'abcdef');    // true
   *   Predicate2.allOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(30, 'a');         // false
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate1} to verify
   *
   * @return {@link Predicate1} verifying all provided ones
   */
  static allOf = <T1, T2>(predicates?: Nullable<TPredicate2<T1, T2>[]>): Predicate2<T1, T2> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate2.alwaysTrue();
    }
    return Predicate2.of(
      (t1: NullableOrUndefined<T1>,
       t2: NullableOrUndefined<T2>) =>
        ArrayUtil.foldLeft(
          predicates,
          true,
          (previousBoolean, currentRawPred) =>
            previousBoolean &&
              Predicate2.of(currentRawPred!)
                .apply(
                  t1,
                  t2
                )
        )
    );
  }


  /**
   * Returns a {@link Predicate2} with {@code false} as result.
   *
   * @return {@link Predicate2}
   */
  static alwaysFalse = <T1, T2>(): Predicate2<T1, T2> =>
    new Predicate2<T1, T2>(() => false);


  /**
   * Returns a {@link Predicate2} with {@code true} as result.
   *
   * @return {@link Predicate2}
   */
  static alwaysTrue = <T1, T2>(): Predicate2<T1, T2> =>
    new Predicate2<T1, T2>(() => true);


  /**
   * Checks all given {@code predicates} to verify that at least one is satisfied.
   *
   * <pre>
   * Example:
   *   const isNumberEvenAndStringLongerThan2: Predicate2<number, string> = Predicate2.of((n: number, s: string) => 0 == n % 2 && 2 < s.length);
   *   const isNumberLowerThan20AndStringLongerThan5: FPredicate2<number, string> = (n: number, s: string) => 20 > n && 5 < s.length;
   *
   *   Predicate2.anyOf([]).apply(5, '');                                                                                   // false
   *   Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(21, 'a');        // false
   *   Predicate2.anyOf([isNumberEvenAndStringLongerThan2, isNumberLowerThan20AndStringLongerThan5]).apply(11, 'abcdef');   // true
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate1} to verify
   *
   * @return {@link Predicate1} verifying provided ones
   */
  static anyOf = <T1, T2>(predicates?: Nullable<TPredicate2<T1, T2>[]>): Predicate2<T1, T2> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate2.alwaysFalse();
    }
    return Predicate2.of(
      (t1: NullableOrUndefined<T1>,
       t2: NullableOrUndefined<T2>) => {
        for (let i = 0; i < predicates!.length; i++) {
          if (Predicate2.of(predicates![i]).apply(t1, t2)) {
            return true;
          }
        }
        return false;
      }
    );
  }


  /**
   * Verifies if the given {@code input} is an instance of {@link Predicate2}.
   *
   * @param input
   *    Object to verify
   *
   * @return {@code true} if {@code input} is an instance of {@link Predicate2},
   *         {@code false} otherwise
   */
  static isPredicate = <T1, T2>(input?: any): input is Predicate2<T1, T2> =>
    !_.isNil(input) &&
    undefined !== (input as Predicate2<T1, T2>).and &&
    undefined !== (input as Predicate2<T1, T2>).apply &&
    undefined !== (input as Predicate2<T1, T2>).not &&
    undefined !== (input as Predicate2<T1, T2>).or;


  /**
   * Returns a {@link Predicate2} describing the given {@link FPredicate2}.
   *
   * @param input
   *    {@link FPredicate2} used to evaluates the given instances of T
   *
   * @return an {@link Predicate2} as wrapper of {@code verifier}
   */
  static of<T1, T2>(input: FPredicate2<T1, T2>): Predicate2<T1, T2>;


  /**
   * Returns a {@link Predicate2} based on provided {@link TPredicate2} parameter.
   *
   * @param input
   *    {@link TPredicate2} instance to convert to a {@link Predicate2} one
   *
   * @return {@link Predicate2} based on provided {@link TPredicate2}
   */
  static of<T1, T2>(input: TPredicate2<T1, T2>): Predicate2<T1, T2>;


  static of<T1, T2>(input: TPredicate2<T1, T2>): Predicate2<T1, T2> {
    return (input instanceof Predicate2)
      ? input
      : new Predicate2(input);
  }


  /**
   *    Returns a composed {@link Predicate2} that represents a short-circuiting logical AND of this {@link Predicate2}
   * and another. When evaluating the composed {@link Predicate2}, if this {@link Predicate2} is {@code false}, then
   * the other {@link Predicate2} is not evaluated.
   *
   * @param input
   *    {@link TPredicate2} that will be logically-ANDed with this {@link Predicate2}
   *
   * @return a composed {@link Predicate2} that represents the short-circuiting logical AND of this {@link Predicate2}
   *         and {@code input}
   */
  and = (input: TPredicate2<T1, T2>): Predicate2<T1, T2> =>
    new Predicate2(
      (t1: NullableOrUndefined<T1>,
       t2: NullableOrUndefined<T2>) =>
        this.apply(t1, t2) &&
        Predicate2.of(input).apply(t1, t2)
    );


  /**
   * Evaluates this {@link Predicate2} on the given {@code t}.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   *
   * @return {@code true} if the input argument matches the predicate,
   *         {@code false} otherwise
   */
  apply = (t1: NullableOrUndefined<T1>,
           t2: NullableOrUndefined<T2>): boolean => this.verifier(t1, t2);


  /**
   * Returns a {@link Predicate2} that represents the logical negation of this {@link Predicate2}.
   *
   * @return a {@link Predicate2} that represents the logical negation of this {@link Predicate2}
   */
  not = (): Predicate2<T1, T2> =>
    new Predicate2(
      (t1: NullableOrUndefined<T1>,
       t2: NullableOrUndefined<T2>) =>
        !this.apply(t1, t2)
    );


  /**
   *   Returns a composed {@link Predicate2} that represents a short-circuiting logical OR of this {@link Predicate2}
   * and another. When evaluating the composed {@link Predicate2}, if this {@link Predicate2} is {@code true}, then
   * the other {@link Predicate2} is not evaluated.
   *
   * @param input
   *    {@link TPredicate2} that will be logically-ORed with this {@link Predicate2}
   *
   * @return a composed {@link Predicate2} that represents the short-circuiting logical OR of this {@link Predicate2}
   *         and {@code input}
   */
  or = (input: TPredicate2<T1, T2>): Predicate2<T1, T2> =>
    new Predicate2(
      (t1: NullableOrUndefined<T1>,
       t2: NullableOrUndefined<T2>) =>
        this.apply(t1, t2) ||
        Predicate2.of(input).apply(t1, t2)
    );

}
