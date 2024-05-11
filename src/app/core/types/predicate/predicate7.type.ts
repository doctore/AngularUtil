import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';

/**
 * Union type of {@link FPredicate7} and {@link Predicate7}
 */
export type TPredicate7<T1, T2, T3, T4, T5, T6, T7> = FPredicate7<T1, T2, T3, T4, T5, T6, T7> | Predicate7<T1, T2, T3, T4, T5, T6, T7>;

/**
 * Represents the function approach of a predicate (boolean-valued function) of seven arguments.
 *
 * @typeParam <T1>
 *   Type of first parameter received by this {@link FPredicate7}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link FPredicate7}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link FPredicate7}
 * @typeParam <T4>
 *   Type of fourth parameter received by this {@link FPredicate7}
 * @typeParam <T5>
 *   Type of fifth parameter received by this {@link FPredicate7}
 * @typeParam <T6>
 *   Type of sixth parameter received by this {@link FPredicate7}
 * @typeParam <T7>
 *   Type of seventh parameter received by this {@link FPredicate7}
 */
export type FPredicate7<T1, T2, T3, T4, T5, T6, T7> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4,
   t5: T5,
   t6: T6,
   t7: T7) => boolean;


/**
 * Verifies if the given `input` is potentially an instance of {@link FPredicate7}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FPredicate7}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FPredicate7},
 *         `false` otherwise
 */
export function isFPredicate7<T1, T2, T3, T4, T5, T6, T7>(input?: any): input is FPredicate7<T1, T2, T3, T4, T5, T6, T7> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    7 === input.length;
}



/**
 * Represents a predicate (boolean-valued function) of seven arguments used as wrapper of {@link FPredicate7}.
 * <p>
 * This is a functional interface whose functional method is {@link Predicate7#apply}.
 *
 * @typeParam <T1>
 *   Type of results returned by this {@link Predicate7}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link Predicate7}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link Predicate7}
 * @typeParam <T4>
 *   Type of fourth parameter received by this {@link Predicate7}
 * @typeParam <T5>
 *   Type of fifth parameter received by this {@link Predicate7}
 * @typeParam <T6>
 *   Type of sixth parameter received by this {@link Predicate7}
 * @typeParam <T7>
 *   Type of seventh parameter received by this {@link Predicate7}
 */
export class Predicate7<T1, T2, T3, T4, T5, T6, T7> {

  private constructor(private readonly verifier: FPredicate7<T1, T2, T3, T4, T5, T6, T7>) {}


  /**
   * Checks all given `predicates` to verify if all of them are satisfied.
   *
   * <pre>
   * Example:
   *   const areNumbersEvenAndStringsLongerThan2: Predicate7<number, string, string, number, number, number, number> =
   *      Predicate7.of((n1: number, s1: string, s2: string, n2: number, n3: number, n4: number, n5: number) =>
   *        0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2 && 0 == n4 % 2 && 0 == n5 % 2);
   *
   *   const areNumbersLowerThan20AndStringsLongerThan5: FPredicate7<number, string, string, number, number, number, number> =
   *      (n1: number, s1: string, s2: string, n2: number, n3: number, n4: number, n5: number) =>
   *        20 > n1 && 5 < s1.length && 5 < s2.length && 20 > n2 && 20 > n3 && 20 > n4 && 20 > n5;
   *
   *   Predicate7.allOf([]).apply(5, '', 'abc', 10, 6, -3, 11)                                           // true
   *
   *   Predicate7.allOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(10, 'abcdef', 'HelloWorld', 12, 6, 8, 2);   // true
   *
   *   Predicate7.allOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(30, 'a', 'HelloWorld', 9, 8, 22, 15);       // false
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate7} to verify
   *
   * @return {@link Predicate7} verifying all provided ones
   */
  static allOf = <T1, T2, T3, T4, T5, T6, T7>(predicates?: Nullable<TPredicate7<T1, T2, T3, T4, T5, T6, T7>[]>): Predicate7<T1, T2, T3, T4, T5, T6, T7> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate7.alwaysTrue();
    }
    return Predicate7.of(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6,
       t7: T7) =>
        ArrayUtil.foldLeft(
          predicates,
          true,
          (previousBoolean, currentRawPred) =>
            previousBoolean &&
              Predicate7.of(currentRawPred!)
                .apply(t1, t2, t3, t4, t5, t6, t7)
        )
    );
  }


  /**
   * Returns a {@link Predicate7} with `false` as result.
   *
   * @return {@link Predicate7}
   */
  static alwaysFalse = <T1, T2, T3, T4, T5, T6, T7>(): Predicate7<T1, T2, T3, T4, T5, T6, T7> =>
    new Predicate7<T1, T2, T3, T4, T5, T6, T7>(
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7) => false
    );


  /**
   * Returns a {@link Predicate7} with `true` as result.
   *
   * @return {@link Predicate7}
   */
  static alwaysTrue = <T1, T2, T3, T4, T5, T6, T7>(): Predicate7<T1, T2, T3, T4, T5, T6, T7> =>
    new Predicate7<T1, T2, T3, T4, T5, T6, T7>(
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7) => true
    );


  /**
   * Checks all given `predicates` to verify that at least one is satisfied.
   *
   * <pre>
   * Example:
   *  const areNumbersEvenAndStringsLongerThan2: Predicate7<number, string, string, number, number, number, number> =
   *      Predicate7.of((n1: number, s1: string, s2: string, n2: number, n3: number, n4: number, n5: number) =>
   *        0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2 && 0 == n3 % 2 && 0 == n4 % 2 && 0 == n5 % 2);
   *
   *   const areNumbersLowerThan20AndStringsLongerThan5: FPredicate7<number, string, string, number, number, number, number> =
   *      (n1: number, s1: string, s2: string, n2: number, n3: number, n4: number, n5: number) =>
   *        20 > n1 && 5 < s1.length && 5 < s2.length && 20 > n2 && 20 > n3 && 20 > n4 && 20 > n5;
   *
   *   Predicate7.anyOf([]).apply(5, '', false, 10, 6, -3, 11);                                            // false
   *
   *   Predicate7.anyOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(30, 'a', 'HelloWorld', 9, 10, 22, 6)          // false
   *
   *   Predicate7.anyOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(10, 'abcdef', 'HelloWorld', 11, 14, 8, 15);   // true
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate7} to verify
   *
   * @return {@link Predicate7} verifying provided ones
   */
  static anyOf = <T1, T2, T3, T4, T5, T6, T7>(predicates?: Nullable<TPredicate7<T1, T2, T3, T4, T5, T6, T7>[]>): Predicate7<T1, T2, T3, T4, T5, T6, T7> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate7.alwaysFalse();
    }
    return Predicate7.of(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6,
       t7: T7) => {
        for (let i = 0; i < predicates!.length; i++) {
          if (Predicate7.of(predicates![i]).apply(t1, t2, t3, t4, t5, t6, t7)) {
            return true;
          }
        }
        return false;
      }
    );
  }


  /**
   * Returns a {@link Predicate7} that verifies if provided parameters are `null` or `undefined`.
   *
   * @return {@link Predicate7} returning `true` if given parameters are `null` or `undefined`, `false` otherwise
   */
  static isNullOrUndefined = <T1, T2, T3, T4, T5, T6, T7>(): Predicate7<T1, T2, T3, T4, T5, T6, T7> =>
    new Predicate7<T1, T2, T3, T4, T5, T6, T7>(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6,
       t7: T7) =>
        ObjectUtil.isNullOrUndefined(t1) &&
        ObjectUtil.isNullOrUndefined(t2) &&
        ObjectUtil.isNullOrUndefined(t3) &&
        ObjectUtil.isNullOrUndefined(t4) &&
        ObjectUtil.isNullOrUndefined(t5) &&
        ObjectUtil.isNullOrUndefined(t6) &&
        ObjectUtil.isNullOrUndefined(t7)
    );


  /**
   * Returns a {@link Predicate7} that verifies if provided parameters are not `null` or `undefined`.
   *
   * @return {@link Predicate7} returning `true` if given parameters are not `null` or `undefined`, `false` otherwise
   */
  static nonNullOrUndefined = <T1, T2, T3, T4, T5, T6, T7>(): Predicate7<T1, T2, T3, T4, T5, T6, T7> =>
    new Predicate7<T1, T2, T3, T4, T5, T6, T7>(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6,
       t7: T7) =>
        ObjectUtil.nonNullOrUndefined(t1) &&
        ObjectUtil.nonNullOrUndefined(t2) &&
        ObjectUtil.nonNullOrUndefined(t3) &&
        ObjectUtil.nonNullOrUndefined(t4) &&
        ObjectUtil.nonNullOrUndefined(t5) &&
        ObjectUtil.nonNullOrUndefined(t6) &&
        ObjectUtil.nonNullOrUndefined(t7)
    );


  /**
   * Verifies if the given `input` is an instance of {@link Predicate7}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Predicate7},
   *         `false` otherwise
   */
  static isPredicate = <T1, T2, T3, T4, T5, T6, T7>(input?: any): input is Predicate7<T1, T2, T3, T4, T5, T6, T7> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Predicate7<T1, T2, T3, T4, T5, T6, T7>).and &&
    undefined !== (input as Predicate7<T1, T2, T3, T4, T5, T6, T7>).apply &&
    undefined !== (input as Predicate7<T1, T2, T3, T4, T5, T6, T7>).getVerifier &&
    undefined !== (input as Predicate7<T1, T2, T3, T4, T5, T6, T7>).not &&
    undefined !== (input as Predicate7<T1, T2, T3, T4, T5, T6, T7>).or &&
    isFPredicate7((input as Predicate7<T1, T2, T3, T4, T5, T6, T7>).getVerifier());


  static of<T1, T2, T3, T4, T5, T6, T7>(predicate: FPredicate7<T1, T2, T3, T4, T5, T6, T7>): Predicate7<T1, T2, T3, T4, T5, T6, T7>;
  static of<T1, T2, T3, T4, T5, T6, T7>(predicate: TPredicate7<T1, T2, T3, T4, T5, T6, T7>): Predicate7<T1, T2, T3, T4, T5, T6, T7>;

  /**
   * Returns a {@link Predicate7} based on provided {@link TPredicate7} parameter.
   *
   * @param predicate
   *    {@link TPredicate7} instance to convert to a {@link Predicate7} one
   *
   * @return {@link Predicate7} based on provided {@link TPredicate7}
   *
   * @throws {IllegalArgumentError} if `predicate` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4, T5, T6, T7>(predicate: TPredicate7<T1, T2, T3, T4, T5, T6, T7>): Predicate7<T1, T2, T3, T4, T5, T6, T7> {
    AssertUtil.notNullOrUndefined(
      predicate,
      'predicate must be not null and not undefined'
    );
    return Predicate7.isPredicate<T1, T2, T3, T4, T5, T6, T7>(predicate)
      ? predicate
      : new Predicate7(predicate);
  }


  /**
   * Returns internal `verifier`.
   *
   * @return {@link FPredicate7}
   */
  getVerifier = (): FPredicate7<T1, T2, T3, T4, T5, T6, T7> =>
    this.verifier;


  /**
   *    Returns a composed {@link Predicate7} that represents a short-circuiting logical AND of this {@link Predicate7}
   * and another. When evaluating the composed {@link Predicate7}, if this {@link Predicate7} is `false`, then
   * the other {@link Predicate7} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate7} will be applied.
   *
   * @param predicate
   *    {@link TPredicate7} that will be logically-ANDed with this {@link Predicate7}
   *
   * @return a composed {@link Predicate7} that represents the short-circuiting logical AND of this {@link Predicate7}
   *         and `predicate`
   */
  and = (predicate: TPredicate7<T1, T2, T3, T4, T5, T6, T7>): Predicate7<T1, T2, T3, T4, T5, T6, T7> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate7(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6,
           t7: T7) =>
            this.apply(t1, t2, t3, t4, t5, t6, t7)
        )
      : new Predicate7(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6,
           t7: T7) =>
            this.apply(t1, t2, t3, t4, t5, t6, t7) &&
              Predicate7.of(predicate)
                .apply(t1, t2, t3, t4, t5, t6, t7)
        );


  /**
   * Evaluates this {@link Predicate7} for the given types `T1`, `T2`, `T3`, `T4`, `T5` and `T6` instances.
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
   * @param t7
   *    The seventh input argument
   *
   * @return `true` if the input argument matches the predicate,
   *         `false` otherwise
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6,
           t7: T7): boolean =>
    this.verifier(t1, t2, t3, t4, t5, t6, t7);


  /**
   * Returns a {@link Predicate7} that represents the logical negation of this {@link Predicate7}.
   *
   * @return a {@link Predicate7} that represents the logical negation of this {@link Predicate7}
   */
  not = (): Predicate7<T1, T2, T3, T4, T5, T6, T7> =>
    new Predicate7(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6,
       t7: T7) =>
        !this.apply(t1, t2, t3, t4, t5, t6, t7)
    );


  /**
   *   Returns a composed {@link Predicate7} that represents a short-circuiting logical OR of this {@link Predicate7}
   * and another. When evaluating the composed {@link Predicate7}, if this {@link Predicate7} is `true`, then
   * the other {@link Predicate7} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate7} will be applied.
   *
   * @param predicate
   *    {@link TPredicate7} that will be logically-ORed with this {@link Predicate7}
   *
   * @return a composed {@link Predicate7} that represents the short-circuiting logical OR of this {@link Predicate7}
   *         and `predicate`
   */
  or = (predicate: TPredicate7<T1, T2, T3, T4, T5, T6, T7>): Predicate7<T1, T2, T3, T4, T5, T6, T7> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate7(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6,
           t7: T7) =>
            this.apply(t1, t2, t3, t4, t5, t6, t7)
        )
      : new Predicate7(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4,
           t5: T5,
           t6: T6,
           t7: T7) =>
            this.apply(t1, t2, t3, t4, t5, t6, t7) ||
              Predicate7.of(predicate)
                .apply(t1, t2, t3, t4, t5, t6, t7)
        );


  /**
   *   Returns a composed {@link Predicate7} that represents a short-circuiting logical XOR of this {@link Predicate7}
   * and another. When evaluating the composed {@link Predicate7}, if this {@link Predicate7} is `true`, then
   * the other {@link Predicate7} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate7} will be applied.
   *
   * @param predicate
   *    {@link TPredicate7} that will be logically-XORed with this {@link Predicate7}
   *
   * @return a composed {@link Predicate7} that represents the short-circuiting logical XOR of this {@link Predicate7}
   *         and `predicate`
   */
  xor = (predicate: TPredicate7<T1, T2, T3, T4, T5, T6, T7>): Predicate7<T1, T2, T3, T4, T5, T6, T7> => {
    if (ObjectUtil.isNullOrUndefined(predicate)) {
      return new Predicate7(
        (t1: T1,
         t2: T2,
         t3: T3,
         t4: T4,
         t5: T5,
         t6: T6,
         t7: T7) =>
          this.apply(t1, t2, t3, t4, t5, t6, t7)
      );
    }
    const givenPredicate = Predicate7.of(predicate);
    return new Predicate7(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4,
       t5: T5,
       t6: T6,
       t7: T7) => {
        const currentApply = this.apply(t1, t2, t3, t4, t5, t6, t7);
        const givenApply = givenPredicate.apply(t1, t2, t3, t4, t5, t6, t7);
        return (currentApply || givenApply) &&
          !(currentApply && givenApply);
      });
  };

}
