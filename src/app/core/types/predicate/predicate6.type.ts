import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';

/**
 * Union type of {@link FPredicate6} and {@link Predicate6}
 */
export type TPredicate6<T1, T2, T3, T4, T5, T6> = FPredicate6<T1, T2, T3, T4, T5, T6> | Predicate6<T1, T2, T3, T4, T5, T6>;

/**
 * Represents the function approach of a predicate (boolean-valued function) of six arguments.
 *
 * @typeParam <T1>
 *   Type of first parameter received by this {@link FPredicate6}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link FPredicate6}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link FPredicate6}
 * @typeParam <T4>
 *   Type of fourth parameter received by this {@link FPredicate6}
 * @typeParam <T5>
 *   Type of fifth parameter received by this {@link FPredicate6}
 * @typeParam <T6>
 *   Type of sixth parameter received by this {@link FPredicate6}
 */
export type FPredicate6<T1, T2, T3, T4, T5, T6> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4,
   t5: T5,
   t6: T6) => boolean;


/**
 * Verifies if the given `input` is potentially an instance of {@link FPredicate6}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FPredicate6}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FPredicate6},
 *         `false` otherwise
 */
export function isFPredicate6<T1, T2, T3, T4, T5, T6>(input?: any): input is FPredicate6<T1, T2, T3, T4, T5, T6> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    6 === input.length;
}



/**
 * Represents a predicate (boolean-valued function) of six arguments used as wrapper of {@link FPredicate6}.
 * <p>
 * This is a functional interface whose functional method is {@link Predicate6#apply}.
 *
 * @typeParam <T1>
 *   Type of results returned by this {@link Predicate6}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link Predicate6}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link Predicate6}
 * @typeParam <T4>
 *   Type of fourth parameter received by this {@link Predicate6}
 * @typeParam <T5>
 *   Type of fifth parameter received by this {@link Predicate6}
 * @typeParam <T6>
 *   Type of sixth parameter received by this {@link Predicate6}
 */
export class Predicate6<T1, T2, T3, T4, T5, T6> {

  private constructor(private readonly verifier: FPredicate6<T1, T2, T3, T4, T5, T6>) {}


  /**
   * Checks all given `predicates` to verify if all of them are satisfied.
   *
   * <pre>
   * Example:
   *   const areNumbersEvenAndStringsLongerThan2: Predicate6<number, string, string, number, number, number> =
   *      Predicate6.of((n1: number, s1: string, s2: string, n2: number, n3: number, n4: number) =>
   *        0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2 && 0 == n4 % 2);
   *
   *   const areNumbersLowerThan20AndStringsLongerThan5: FPredicate6<number, string, string, number, number, number> =
   *      (n1: number, s1: string, s2: string, n2: number, n3: number, n4: number) =>
   *        20 > n1 && 5 < s1.length && 5 < s2.length && 20 > n2 && 20 > n3 && 20 > n4;
   *
   *   Predicate6.allOf([]).apply(5, '', 'abc', 10, 6, -3)                                            // true
   *
   *   Predicate6.allOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(10, 'abcdef', 'HelloWorld', 12, 6, 8);   // true
   *
   *   Predicate6.allOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(30, 'a', 'HelloWorld', 9, 8, 22);        // false
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate6} to verify
   *
   * @return {@link Predicate6} verifying all provided ones
   */
  static allOf = <T1, T2, T3, T4, T5, T6>(predicates?: Nullable<TPredicate6<T1, T2, T3, T4, T5, T6>[]>): Predicate6<T1, T2, T3, T4, T5, T6> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate6.alwaysTrue();
    }
    return Predicate6.of(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6) =>
        ArrayUtil.foldLeft(
          predicates,
          true,
          (previousBoolean, currentRawPred) =>
            previousBoolean &&
              Predicate6.of(currentRawPred!)
                .apply(t1, t2, t3, t4, t5, t6)
        )
    );
  }


  /**
   * Returns a {@link Predicate6} with `false` as result.
   *
   * @return {@link Predicate6}
   */
  static alwaysFalse = <T1, T2, T3, T4, T5, T6>(): Predicate6<T1, T2, T3, T4, T5, T6> =>
    new Predicate6<T1, T2, T3, T4, T5, T6>(
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => false
    );


  /**
   * Returns a {@link Predicate6} with `true` as result.
   *
   * @return {@link Predicate6}
   */
  static alwaysTrue = <T1, T2, T3, T4, T5, T6>(): Predicate6<T1, T2, T3, T4, T5, T6> =>
    new Predicate6<T1, T2, T3, T4, T5, T6>(
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => true
    );


  /**
   * Checks all given `predicates` to verify that at least one is satisfied.
   *
   * <pre>
   * Example:
   *  const areNumbersEvenAndStringsLongerThan2: Predicate6<number, string, string, number, number, number> =
   *      Predicate6.of((n1: number, s1: string, s2: string, n2: number, n3: number, n4: number) =>
   *        0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2 && 0 == n4 % 2);
   *
   *   const areNumbersLowerThan20AndStringsLongerThan5: FPredicate6<number, string, string, number, number, number> =
   *      (n1: number, s1: string, s2: string, n2: number, n3: number, n4: number) =>
   *        20 > n1 && 5 < s1.length && 5 < s2.length && 20 > n2 && 20 > n3 && 20 > n4;
   *
   *   Predicate6.anyOf([]).apply(5, '', false, 10, 6, -3);                                            // false
   *
   *   Predicate6.anyOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(30, 'a', 'HelloWorld', 9, 10, 22)         // false
   *
   *   Predicate6.anyOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(10, 'abcdef', 'HelloWorld', 11, 14, 8);   // true
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate6} to verify
   *
   * @return {@link Predicate6} verifying provided ones
   */
  static anyOf = <T1, T2, T3, T4, T5, T6>(predicates?: Nullable<TPredicate6<T1, T2, T3, T4, T5, T6>[]>): Predicate6<T1, T2, T3, T4, T5, T6> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate6.alwaysFalse();
    }
    return Predicate6.of(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6) => {
        for (let i = 0; i < predicates!.length; i++) {
          if (Predicate6.of(predicates![i]).apply(t1, t2, t3, t4, t5, t6)) {
            return true;
          }
        }
        return false;
      }
    );
  }


  /**
   * Returns a {@link Predicate6} that verifies if provided parameters are `null` or `undefined`.
   *
   * @return {@link Predicate6} returning `true` if given parameters are `null` or `undefined`, `false` otherwise
   */
  static isNullOrUndefined = <T1, T2, T3, T4, T5, T6>(): Predicate6<T1, T2, T3, T4, T5, T6> =>
    new Predicate6<T1, T2, T3, T4, T5, T6>(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6) =>
        ObjectUtil.isNullOrUndefined(t1) &&
        ObjectUtil.isNullOrUndefined(t2) &&
        ObjectUtil.isNullOrUndefined(t3) &&
        ObjectUtil.isNullOrUndefined(t4) &&
        ObjectUtil.isNullOrUndefined(t5) &&
        ObjectUtil.isNullOrUndefined(t6)
    );


  /**
   * Returns a {@link Predicate6} that verifies if provided parameters are not `null` or `undefined`.
   *
   * @return {@link Predicate6} returning `true` if given parameters are not `null` or `undefined`, `false` otherwise
   */
  static nonNullOrUndefined = <T1, T2, T3, T4, T5, T6>(): Predicate6<T1, T2, T3, T4, T5, T6> =>
    new Predicate6<T1, T2, T3, T4, T5, T6>(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6) =>
        ObjectUtil.nonNullOrUndefined(t1) &&
        ObjectUtil.nonNullOrUndefined(t2) &&
        ObjectUtil.nonNullOrUndefined(t3) &&
        ObjectUtil.nonNullOrUndefined(t4) &&
        ObjectUtil.nonNullOrUndefined(t5) &&
        ObjectUtil.nonNullOrUndefined(t6)
    );


  /**
   * Verifies if the given `input` is an instance of {@link Predicate6}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Predicate6},
   *         `false` otherwise
   */
  static isPredicate = <T1, T2, T3, T4, T5, T6>(input?: any): input is Predicate6<T1, T2, T3, T4, T5, T6> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Predicate6<T1, T2, T3, T4, T5, T6>).and &&
    undefined !== (input as Predicate6<T1, T2, T3, T4, T5, T6>).apply &&
    undefined !== (input as Predicate6<T1, T2, T3, T4, T5, T6>).getVerifier &&
    undefined !== (input as Predicate6<T1, T2, T3, T4, T5, T6>).not &&
    undefined !== (input as Predicate6<T1, T2, T3, T4, T5, T6>).or &&
    isFPredicate6((input as Predicate6<T1, T2, T3, T4, T5, T6>).getVerifier());


  static of<T1, T2, T3, T4, T5, T6>(predicate: FPredicate6<T1, T2, T3, T4, T5, T6>): Predicate6<T1, T2, T3, T4, T5, T6>;
  static of<T1, T2, T3, T4, T5, T6>(predicate: TPredicate6<T1, T2, T3, T4, T5, T6>): Predicate6<T1, T2, T3, T4, T5, T6>;

  /**
   * Returns a {@link Predicate6} based on provided {@link TPredicate6} parameter.
   *
   * @param predicate
   *    {@link TPredicate6} instance to convert to a {@link Predicate6} one
   *
   * @return {@link Predicate6} based on provided {@link TPredicate6}
   *
   * @throws {IllegalArgumentError} if `predicate` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4, T5, T6>(predicate: TPredicate6<T1, T2, T3, T4, T5, T6>): Predicate6<T1, T2, T3, T4, T5, T6> {
    AssertUtil.notNullOrUndefined(
      predicate,
      'predicate must be not null and not undefined'
    );
    return Predicate6.isPredicate<T1, T2, T3, T4, T5, T6>(predicate)
      ? predicate
      : new Predicate6(predicate);
  }


  /**
   * Returns internal `verifier`.
   *
   * @return {@link FPredicate6}
   */
  getVerifier = (): FPredicate6<T1, T2, T3, T4, T5, T6> =>
    this.verifier;


  /**
   *    Returns a composed {@link Predicate6} that represents a short-circuiting logical AND of this {@link Predicate6}
   * and another. When evaluating the composed {@link Predicate6}, if this {@link Predicate6} is `false`, then
   * the other {@link Predicate6} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate6} will be applied.
   *
   * @param predicate
   *    {@link TPredicate6} that will be logically-ANDed with this {@link Predicate6}
   *
   * @return a composed {@link Predicate6} that represents the short-circuiting logical AND of this {@link Predicate6}
   *         and `predicate`
   */
  and = (predicate: TPredicate6<T1, T2, T3, T4, T5, T6>): Predicate6<T1, T2, T3, T4, T5, T6> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate6(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6) =>
            this.apply(t1, t2, t3, t4, t5, t6)
        )
      : new Predicate6(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6) =>
            this.apply(t1, t2, t3, t4, t5, t6) &&
              Predicate6.of(predicate)
                .apply(t1, t2, t3, t4, t5, t6)
        );


  /**
   * Evaluates this {@link Predicate6} for the given types `T1`, `T2`, `T3`, `T4`, `T5` and `T6` instances.
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
   * @param t6
   *    The sixth input argument
   *
   * @return `true` if the input argument matches the predicate,
   *         `false` otherwise
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6): boolean =>
    this.verifier(t1, t2, t3, t4, t5, t6);


  /**
   * Returns a {@link Predicate6} that represents the logical negation of this {@link Predicate6}.
   *
   * @return a {@link Predicate6} that represents the logical negation of this {@link Predicate6}
   */
  not = (): Predicate6<T1, T2, T3, T4, T5, T6> =>
    new Predicate6(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6) =>
        !this.apply(t1, t2, t3, t4, t5, t6)
    );


  /**
   *   Returns a composed {@link Predicate6} that represents a short-circuiting logical OR of this {@link Predicate6}
   * and another. When evaluating the composed {@link Predicate6}, if this {@link Predicate6} is `true`, then
   * the other {@link Predicate6} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate6} will be applied.
   *
   * @param predicate
   *    {@link TPredicate6} that will be logically-ORed with this {@link Predicate6}
   *
   * @return a composed {@link Predicate6} that represents the short-circuiting logical OR of this {@link Predicate6}
   *         and `predicate`
   */
  or = (predicate: TPredicate6<T1, T2, T3, T4, T5, T6>): Predicate6<T1, T2, T3, T4, T5, T6> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate6(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6) =>
            this.apply(t1, t2, t3, t4, t5, t6)
        )
      : new Predicate6(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6) =>
            this.apply(t1, t2, t3, t4, t5, t6) ||
              Predicate6.of(predicate)
                .apply(t1, t2, t3, t4, t5, t6)
        );


  /**
   *   Returns a composed {@link Predicate6} that represents a short-circuiting logical XOR of this {@link Predicate6}
   * and another. When evaluating the composed {@link Predicate6}, if this {@link Predicate6} is `true`, then
   * the other {@link Predicate6} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate6} will be applied.
   *
   * @param predicate
   *    {@link TPredicate6} that will be logically-XORed with this {@link Predicate6}
   *
   * @return a composed {@link Predicate6} that represents the short-circuiting logical XOR of this {@link Predicate6}
   *         and `predicate`
   */
  xor = (predicate: TPredicate6<T1, T2, T3, T4, T5, T6>): Predicate6<T1, T2, T3, T4, T5, T6> => {
    if (ObjectUtil.isNullOrUndefined(predicate)) {
      return new Predicate6(
        (t1: T1,
         t2: T2,
         t3: T3,
         t4: T4,
         t5: T5,
         t6: T6) =>
          this.apply(t1, t2, t3, t4, t5, t6)
      );
    }
    const givenPredicate = Predicate6.of(predicate);
    return new Predicate6(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6) => {
        const currentApply = this.apply(t1, t2, t3, t4, t5, t6);
        const givenApply = givenPredicate.apply(t1, t2, t3, t4, t5, t6);
        return (currentApply || givenApply) &&
          !(currentApply && givenApply);
      });
  };

}
