import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';

/**
 * Union type of {@link FPredicate3} and {@link Predicate3}
 */
export type TPredicate3<T1, T2, T3> = FPredicate3<T1, T2, T3> | Predicate3<T1, T2, T3>;


/**
 * Represents the function approach of a predicate (boolean-valued function) of three arguments.
 *
 * @typeParam <T1>
 *   Type of first parameter received by this {@link FPredicate3}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link FPredicate3}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link FPredicate3}
 */
export type FPredicate3<T1, T2, T3> =
  (t1: T1,
   t2: T2,
   t3: T3) => boolean;


/**
 * Verifies if the given `input` is potentially an instance of {@link FPredicate3}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FPredicate3}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FPredicate3},
 *         `false` otherwise
 */
export function isFPredicate3<T1, T2, T3>(input?: any): input is FPredicate3<T1, T2, T3> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    3 === input.length;
}



/**
 * Represents a predicate (boolean-valued function) of three arguments used as wrapper of {@link FPredicate3}.
 * <p>
 * This is a functional interface whose functional method is {@link Predicate3#apply}.
 *
 * @typeParam <T1>
 *   Type of results returned by this {@link Predicate3}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link Predicate3}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link Predicate3}
 */
export class Predicate3<T1, T2, T3> {

  private constructor(private readonly verifier: FPredicate3<T1, T2, T3>) {}


  /**
   * Checks all given `predicates` to verify if all of them are satisfied.
   *
   * <pre>
   * Example:
   *   const isNumberEvenAndStringLongerThan2AndBooleanFalse: Predicate3<number, string, boolean> =
   *      Predicate3.of((n: number, s: string, b: boolean) => 0 == n % 2 && 2 < s.length && !b);
   *
   *   const isNumberLowerThan20AndStringLongerThan5AndBooleanFalse: FPredicate3<number, string, boolean> =
   *      (n: number, s: string, b: boolean) => 20 > n && 5 < s.length && !b;
   *
   *   Predicate3.allOf([]).apply(5, '', false);                                                   // true
   *
   *   Predicate3.allOf(
   *     [isNumberEvenAndStringLongerThan2AndBooleanFalse,
   *      isNumberLowerThan20AndStringLongerThan5AndBooleanFalse]).apply(10, 'abcdef', false);     // true
   *
   *   Predicate3.allOf(
   *     [isNumberEvenAndStringLongerThan2AndBooleanFalse,
   *      isNumberLowerThan20AndStringLongerThan5AndBooleanFalse]).apply(30, 'a', false);          // false
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate3} to verify
   *
   * @return {@link Predicate3} verifying all provided ones
   */
  static allOf = <T1, T2, T3>(predicates?: Nullable<TPredicate3<T1, T2, T3>[]>): Predicate3<T1, T2, T3> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate3.alwaysTrue();
    }
    return Predicate3.of(
      (t1: T1,
       t2: T2,
       t3: T3) =>
        ArrayUtil.foldLeft(
          predicates,
          true,
          (previousBoolean, currentRawPred) =>
            previousBoolean &&
              Predicate3.of(currentRawPred!)
                .apply(
                  t1,
                  t2,
                  t3
                )
        )
    );
  }


  /**
   * Returns a {@link Predicate3} with `false` as result.
   *
   * @return {@link Predicate3}
   */
  static alwaysFalse = <T1, T2, T3>(): Predicate3<T1, T2, T3> =>
    new Predicate3<T1, T2, T3>((t1: T1, t2: T2, t3: T3) => false);


  /**
   * Returns a {@link Predicate3} with `true` as result.
   *
   * @return {@link Predicate3}
   */
  static alwaysTrue = <T1, T2, T3>(): Predicate3<T1, T2, T3> =>
    new Predicate3<T1, T2, T3>((t1: T1, t2: T2, t3: T3) => true);


  /**
   * Checks all given `predicates` to verify that at least one is satisfied.
   *
   * <pre>
   * Example:
   *   const isNumberEvenAndStringLongerThan2AndBooleanFalse: Predicate3<number, string, boolean> =
   *      Predicate3.of((n: number, s: string, b: boolean) => 0 == n % 2 && 2 < s.length && !b);
   *
   *   const isNumberLowerThan20AndStringLongerThan5AndBooleanFalse: FPredicate3<number, string, boolean> =
   *      (n: number, s: string, b: boolean) => 20 > n && 5 < s.length && !b;
   *
   *   Predicate3.anyOf([]).apply(5, '', false);                                                   // false
   *
   *   Predicate3.anyOf(
   *     [isNumberEvenAndStringLongerThan2AndBooleanFalse,
   *      isNumberLowerThan20AndStringLongerThan5AndBooleanFalse]).apply(30, 'a', false);          // false
   *
   *   Predicate3.anyOf(
   *     [isNumberEvenAndStringLongerThan2AndBooleanFalse,
   *      isNumberLowerThan20AndStringLongerThan5AndBooleanFalse]).apply(10, 'abcdef', false);     // true
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate3} to verify
   *
   * @return {@link Predicate3} verifying provided ones
   */
  static anyOf = <T1, T2, T3>(predicates?: Nullable<TPredicate3<T1, T2, T3>[]>): Predicate3<T1, T2, T3> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate3.alwaysFalse();
    }
    return Predicate3.of(
      (t1: T1,
       t2: T2,
       t3: T3) => {
        for (let i = 0; i < predicates!.length; i++) {
          if (Predicate3.of(predicates![i]).apply(t1, t2, t3)) {
            return true;
          }
        }
        return false;
      }
    );
  }


  /**
   * Returns a {@link Predicate3} that verifies if provided parameters are `null` or `undefined`.
   *
   * @return {@link Predicate3} returning `true` if given parameters are `null` or `undefined`, `false` otherwise
   */
  static isNullOrUndefined = <T1, T2, T3>(): Predicate3<T1, T2, T3> =>
    new Predicate3<T1, T2, T3>(
      (t1: T1,
       t2: T2,
       t3: T3) =>
        ObjectUtil.isNullOrUndefined(t1) &&
        ObjectUtil.isNullOrUndefined(t2) &&
        ObjectUtil.isNullOrUndefined(t3)
    );


  /**
   * Returns a {@link Predicate3} that verifies if provided parameters are not `null` or `undefined`.
   *
   * @return {@link Predicate3} returning `true` if given parameters are not `null` or `undefined`, `false` otherwise
   */
  static nonNullOrUndefined = <T1, T2, T3>(): Predicate3<T1, T2, T3> =>
    new Predicate3<T1, T2, T3>(
      (t1: T1,
       t2: T2,
       t3: T3) =>
        ObjectUtil.nonNullOrUndefined(t1) &&
        ObjectUtil.nonNullOrUndefined(t2) &&
        ObjectUtil.nonNullOrUndefined(t3)
    );


  /**
   * Verifies if the given `input` is an instance of {@link Predicate3}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Predicate3},
   *         `false` otherwise
   */
  static isPredicate = <T1, T2, T3>(input?: any): input is Predicate3<T1, T2, T3> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Predicate3<T1, T2, T3>).and &&
    undefined !== (input as Predicate3<T1, T2, T3>).apply &&
    undefined !== (input as Predicate3<T1, T2, T3>).getVerifier &&
    undefined !== (input as Predicate3<T1, T2, T3>).not &&
    undefined !== (input as Predicate3<T1, T2, T3>).or &&
    isFPredicate3((input as Predicate3<T1, T2, T3>).getVerifier());


  static of<T1, T2, T3>(predicate: FPredicate3<T1, T2, T3>): Predicate3<T1, T2, T3>;
  static of<T1, T2, T3>(predicate: TPredicate3<T1, T2, T3>): Predicate3<T1, T2, T3>;

  /**
   * Returns a {@link Predicate3} based on provided {@link TPredicate3} parameter.
   *
   * @param predicate
   *    {@link TPredicate3} instance to convert to a {@link Predicate3} one
   *
   * @return {@link Predicate3} based on provided {@link TPredicate3}
   *
   * @throws {@link IllegalArgumentError} if `predicate` is `null` or `undefined`
   */
  static of<T1, T2, T3>(predicate: TPredicate3<T1, T2, T3>): Predicate3<T1, T2, T3> {
    AssertUtil.notNullOrUndefined(
      predicate,
      'predicate must be not null and not undefined'
    );
    return Predicate3.isPredicate<T1, T2, T3>(predicate)
      ? predicate
      : new Predicate3(predicate);
  }


  /**
   * Returns internal `verifier`.
   *
   * @return {@link FPredicate3}
   */
  getVerifier = (): FPredicate3<T1, T2, T3> =>
    this.verifier;


  /**
   *    Returns a composed {@link Predicate3} that represents a short-circuiting logical AND of this {@link Predicate3}
   * and another. When evaluating the composed {@link Predicate3}, if this {@link Predicate3} is `false`, then
   * the other {@link Predicate3} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate3} will be applied.
   *
   * @param predicate
   *    {@link TPredicate3} that will be logically-ANDed with this {@link Predicate3}
   *
   * @return a composed {@link Predicate3} that represents the short-circuiting logical AND of this {@link Predicate3}
   *         and `predicate`
   */
  and = (predicate: TPredicate3<T1, T2, T3>): Predicate3<T1, T2, T3> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate3(
          (t1: T1,
           t2: T2,
           t3: T3) =>
            this.apply(t1, t2, t3)
        )
      : new Predicate3(
          (t1: T1,
           t2: T2,
           t3: T3) =>
            this.apply(t1, t2, t3) &&
              Predicate3.of(predicate).apply(t1, t2, t3)
        );


  /**
   * Evaluates this {@link Predicate3} for the given @type {T1}, @type {T2} and @type {T3} instances.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   * @param t3
   *    The third input argument
   *
   * @return `true` if the input argument matches the predicate,
   *         `false` otherwise
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3): boolean =>
    this.verifier(t1, t2, t3);


  /**
   * Returns a {@link Predicate3} that represents the logical negation of this {@link Predicate3}.
   *
   * @return a {@link Predicate3} that represents the logical negation of this {@link Predicate3}
   */
  not = (): Predicate3<T1, T2, T3> =>
    new Predicate3(
      (t1: T1,
       t2: T2,
       t3: T3) =>
        !this.apply(t1, t2, t3)
    );


  /**
   *   Returns a composed {@link Predicate3} that represents a short-circuiting logical OR of this {@link Predicate3}
   * and another. When evaluating the composed {@link Predicate3}, if this {@link Predicate3} is `true`, then
   * the other {@link Predicate3} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate3} will be applied.
   *
   * @param predicate
   *    {@link TPredicate3} that will be logically-ORed with this {@link Predicate3}
   *
   * @return a composed {@link Predicate3} that represents the short-circuiting logical OR of this {@link Predicate3}
   *         and `predicate`
   */
  or = (predicate: TPredicate3<T1, T2, T3>): Predicate3<T1, T2, T3> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate3(
          (t1: T1,
           t2: T2,
           t3: T3) =>
            this.apply(t1, t2, t3)
        )
      : new Predicate3(
          (t1: T1,
           t2: T2,
           t3: T3) =>
            this.apply(t1, t2, t3) ||
              Predicate3.of(predicate).apply(t1, t2, t3)
        );

}
