import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';

/**
 * Union type of {@link FPredicate5} and {@link Predicate5}
 */
export type TPredicate5<T1, T2, T3, T4, T5> = FPredicate5<T1, T2, T3, T4, T5> | Predicate5<T1, T2, T3, T4, T5>;

/**
 * Represents the function approach of a predicate (boolean-valued function) of five arguments.
 *
 * @typeParam <T1>
 *   Type of first parameter received by this {@link FPredicate5}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link FPredicate5}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link FPredicate5}
 * @typeParam <T4>
 *   Type of fourth parameter received by this {@link FPredicate5}
 * @typeParam <T5>
 *   Type of fifth parameter received by this {@link FPredicate5}
 */
export type FPredicate5<T1, T2, T3, T4, T5> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4,
   t5: T5) => boolean;


/**
 * Verifies if the given `input` is potentially an instance of {@link FPredicate5}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FPredicate5}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FPredicate5},
 *         `false` otherwise
 */
export function isFPredicate5<T1, T2, T3, T4, T5>(input?: any): input is FPredicate5<T1, T2, T3, T4, T5> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    5 === input.length;
}



/**
 * Represents a predicate (boolean-valued function) of five arguments used as wrapper of {@link FPredicate5}.
 * <p>
 * This is a functional interface whose functional method is {@link Predicate5#apply}.
 *
 * @typeParam <T1>
 *   Type of results returned by this {@link Predicate5}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link Predicate5}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link Predicate5}
 * @typeParam <T4>
 *   Type of fourth parameter received by this {@link Predicate5}
 * @typeParam <T5>
 *   Type of fifth parameter received by this {@link Predicate5}
 */
export class Predicate5<T1, T2, T3, T4, T5> {

  private constructor(private readonly verifier: FPredicate5<T1, T2, T3, T4, T5>) {}


  /**
   * Checks all given `predicates` to verify if all of them are satisfied.
   *
   * <pre>
   * Example:
   *   const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
   *      Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
   *        0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);
   *
   *   const areNumbersLowerThan20AndStringsLongerThan5: FPredicate5<number, string, string, number, number> =
   *      (n1: number, s1: string, s2: string, n2: number, n3: number) =>
   *        20 > n1 && 5 < s1.length && 5 < s2.length && 20 > n2 && 20 > n3;
   *
   *   Predicate5.allOf([]).apply(5, '', 'abc', 10, 6)                                               // true
   *
   *   Predicate5.allOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(10, 'abcdef', 'HelloWorld', 12, 6);     // true
   *
   *   Predicate5.allOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(30, 'a', 'HelloWorld', 9, 8);           // false
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate5} to verify
   *
   * @return {@link Predicate5} verifying all provided ones
   */
  static allOf = <T1, T2, T3, T4, T5>(predicates?: Nullable<TPredicate5<T1, T2, T3, T4, T5>[]>): Predicate5<T1, T2, T3, T4, T5> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate5.alwaysTrue();
    }
    return Predicate5.of(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5) =>
        ArrayUtil.foldLeft(
          predicates,
          true,
          (previousBoolean, currentRawPred) =>
            previousBoolean &&
              Predicate5.of(currentRawPred!)
                .apply(
                  t1,
                  t2,
                  t3,
                  t4,
                  t5
                )
        )
    );
  }


  /**
   * Returns a {@link Predicate5} with `false` as result.
   *
   * @return {@link Predicate5}
   */
  static alwaysFalse = <T1, T2, T3, T4, T5>(): Predicate5<T1, T2, T3, T4, T5> =>
    new Predicate5<T1, T2, T3, T4, T5>((t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => false);


  /**
   * Returns a {@link Predicate5} with `true` as result.
   *
   * @return {@link Predicate5}
   */
  static alwaysTrue = <T1, T2, T3, T4, T5>(): Predicate5<T1, T2, T3, T4, T5> =>
    new Predicate5<T1, T2, T3, T4, T5>((t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => true);


  /**
   * Checks all given `predicates` to verify that at least one is satisfied.
   *
   * <pre>
   * Example:
   *  const areNumbersEvenAndStringsLongerThan2: Predicate5<number, string, string, number, number> =
   *      Predicate5.of((n1: number, s1: string, s2: string, n2: number, n3: number) =>
   *        0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2);
   *
   *   const areNumbersLowerThan20AndStringsLongerThan5: FPredicate5<number, string, string, number, number> =
   *      (n1: number, s1: string, s2: string, n2: number, n3: number) =>
   *        20 > n1 && 5 < s1.length && 5 < s2.length && 20 > n2 && 20 > n3;
   *
   *   Predicate5.anyOf([]).apply(5, '', false, 10, 6);                                              // false
   *
   *   Predicate5.anyOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(30, 'a', 'HelloWorld', 9, 10);          // false
   *
   *   Predicate5.anyOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(10, 'abcdef', 'HelloWorld', 11, 14);    // true
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate5} to verify
   *
   * @return {@link Predicate5} verifying provided ones
   */
  static anyOf = <T1, T2, T3, T4, T5>(predicates?: Nullable<TPredicate5<T1, T2, T3, T4, T5>[]>): Predicate5<T1, T2, T3, T4, T5> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate5.alwaysFalse();
    }
    return Predicate5.of(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5) => {
        for (let i = 0; i < predicates!.length; i++) {
          if (Predicate5.of(predicates![i]).apply(t1, t2, t3, t4, t5)) {
            return true;
          }
        }
        return false;
      }
    );
  }


  /**
   * Returns a {@link Predicate5} that verifies if provided parameters are `null` or `undefined`.
   *
   * @return {@link Predicate5} returning `true` if given parameters are `null` or `undefined`, `false` otherwise
   */
  static isNullOrUndefined = <T1, T2, T3, T4, T5>(): Predicate5<T1, T2, T3, T4, T5> =>
    new Predicate5<T1, T2, T3, T4, T5>(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5) =>
        ObjectUtil.isNullOrUndefined(t1) &&
        ObjectUtil.isNullOrUndefined(t2) &&
        ObjectUtil.isNullOrUndefined(t3) &&
        ObjectUtil.isNullOrUndefined(t4) &&
        ObjectUtil.isNullOrUndefined(t5)
    );


  /**
   * Returns a {@link Predicate5} that verifies if provided parameters are not `null` or `undefined`.
   *
   * @return {@link Predicate5} returning `true` if given parameters are not `null` or `undefined`, `false` otherwise
   */
  static nonNullOrUndefined = <T1, T2, T3, T4, T5>(): Predicate5<T1, T2, T3, T4, T5> =>
    new Predicate5<T1, T2, T3, T4, T5>(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5) =>
        ObjectUtil.nonNullOrUndefined(t1) &&
        ObjectUtil.nonNullOrUndefined(t2) &&
        ObjectUtil.nonNullOrUndefined(t3) &&
        ObjectUtil.nonNullOrUndefined(t4) &&
        ObjectUtil.nonNullOrUndefined(t5)
    );


  /**
   * Verifies if the given `input` is an instance of {@link Predicate5}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Predicate5},
   *         `false` otherwise
   */
  static isPredicate = <T1, T2, T3, T4, T5>(input?: any): input is Predicate5<T1, T2, T3, T4, T5> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Predicate5<T1, T2, T3, T4, T5>).and &&
    undefined !== (input as Predicate5<T1, T2, T3, T4, T5>).apply &&
    undefined !== (input as Predicate5<T1, T2, T3, T4, T5>).getVerifier &&
    undefined !== (input as Predicate5<T1, T2, T3, T4, T5>).not &&
    undefined !== (input as Predicate5<T1, T2, T3, T4, T5>).or &&
    isFPredicate5((input as Predicate5<T1, T2, T3, T4, T5>).getVerifier());


  static of<T1, T2, T3, T4, T5>(predicate: FPredicate5<T1, T2, T3, T4, T5>): Predicate5<T1, T2, T3, T4, T5>;
  static of<T1, T2, T3, T4, T5>(predicate: TPredicate5<T1, T2, T3, T4, T5>): Predicate5<T1, T2, T3, T4, T5>;

  /**
   * Returns a {@link Predicate5} based on provided {@link TPredicate5} parameter.
   *
   * @param predicate
   *    {@link TPredicate5} instance to convert to a {@link Predicate5} one
   *
   * @return {@link Predicate5} based on provided {@link TPredicate5}
   *
   * @throws {@link IllegalArgumentError} if `predicate` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4, T5>(predicate: TPredicate5<T1, T2, T3, T4, T5>): Predicate5<T1, T2, T3, T4, T5> {
    AssertUtil.notNullOrUndefined(
      predicate,
      'predicate must be not null and not undefined'
    );
    return Predicate5.isPredicate<T1, T2, T3, T4, T5>(predicate)
      ? predicate
      : new Predicate5(predicate);
  }


  /**
   * Returns internal `verifier`.
   *
   * @return {@link FPredicate5}
   */
  getVerifier = (): FPredicate5<T1, T2, T3, T4, T5> =>
    this.verifier;


  /**
   *    Returns a composed {@link Predicate5} that represents a short-circuiting logical AND of this {@link Predicate5}
   * and another. When evaluating the composed {@link Predicate5}, if this {@link Predicate5} is `false`, then
   * the other {@link Predicate5} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate5} will be applied.
   *
   * @param predicate
   *    {@link TPredicate5} that will be logically-ANDed with this {@link Predicate5}
   *
   * @return a composed {@link Predicate5} that represents the short-circuiting logical AND of this {@link Predicate5}
   *         and `predicate`
   */
  and = (predicate: TPredicate5<T1, T2, T3, T4, T5>): Predicate5<T1, T2, T3, T4, T5> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate5(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5) =>
            this.apply(t1, t2, t3, t4, t5)
        )
      : new Predicate5(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5) =>
            this.apply(t1, t2, t3, t4, t5) &&
              Predicate5.of(predicate).apply(t1, t2, t3, t4, t5)
        );


  /**
   * Evaluates this {@link Predicate5} for the given @type {T1}, @type {T2}, @type {T3} and @type {T4} instances.
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
   *
   * @return `true` if the input argument matches the predicate,
   *         `false` otherwise
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5): boolean =>
    this.verifier(t1, t2, t3, t4, t5);


  /**
   * Returns a {@link Predicate5} that represents the logical negation of this {@link Predicate5}.
   *
   * @return a {@link Predicate5} that represents the logical negation of this {@link Predicate5}
   */
  not = (): Predicate5<T1, T2, T3, T4, T5> =>
    new Predicate5(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5) =>
        !this.apply(t1, t2, t3, t4, t5)
    );


  /**
   *   Returns a composed {@link Predicate5} that represents a short-circuiting logical OR of this {@link Predicate5}
   * and another. When evaluating the composed {@link Predicate5}, if this {@link Predicate5} is `true`, then
   * the other {@link Predicate5} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate5} will be applied.
   *
   * @param predicate
   *    {@link TPredicate5} that will be logically-ORed with this {@link Predicate5}
   *
   * @return a composed {@link Predicate5} that represents the short-circuiting logical OR of this {@link Predicate5}
   *         and `predicate`
   */
  or = (predicate: TPredicate5<T1, T2, T3, T4, T5>): Predicate5<T1, T2, T3, T4, T5> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate5(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5) =>
            this.apply(t1, t2, t3, t4, t5)
        )
      : new Predicate5(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5) =>
            this.apply(t1, t2, t3, t4, t5) ||
              Predicate5.of(predicate).apply(t1, t2, t3, t4, t5)
        );

}
