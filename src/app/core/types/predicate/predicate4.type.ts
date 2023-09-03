import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';

/**
 * Union type of {@link FPredicate4} and {@link Predicate4}
 */
export type TPredicate4<T1, T2, T3, T4> = FPredicate4<T1, T2, T3, T4> | Predicate4<T1, T2, T3, T4>;


/**
 * Represents the function approach of a predicate (boolean-valued function) of four arguments.
 *
 * @typeParam <T1>
 *   Type of first parameter received by this {@link FPredicate4}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link FPredicate4}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link FPredicate4}
 * @typeParam <T4>
 *   Type of fourth parameter received by this {@link FPredicate4}
 */
export type FPredicate4<T1, T2, T3, T4> =
  (t1: T1,
   t2: T2,
   t3: T3,
   t4: T4) => boolean;


/**
 * Verifies if the given `input` is potentially an instance of {@link FPredicate4}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FPredicate4}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FPredicate4},
 *         `false` otherwise
 */
export function isFPredicate4<T1, T2, T3, T4>(input?: any): input is FPredicate4<T1, T2, T3, T4> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    4 === input.length;
}



/**
 * Represents a predicate (boolean-valued function) of four arguments used as wrapper of {@link FPredicate4}.
 * <p>
 * This is a functional interface whose functional method is {@link Predicate4#apply}.
 *
 * @typeParam <T1>
 *   Type of results returned by this {@link Predicate4}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link Predicate4}
 * @typeParam <T3>
 *   Type of third parameter received by this {@link Predicate4}
 * @typeParam <T4>
 *   Type of fourth parameter received by this {@link Predicate4}
 */
export class Predicate4<T1, T2, T3, T4> {

  private constructor(private readonly verifier: FPredicate4<T1, T2, T3, T4>) {}


  /**
   * Checks all given `predicates` to verify if all of them are satisfied.
   *
   * <pre>
   * Example:
   *   const areNumbersEvenAndStringsLongerThan2: Predicate4<number, string, string, number> =
   *      Predicate4.of((n1: number, s1: string, s2: string, n2: number) => 0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2);
   *
   *   const areNumbersLowerThan20AndStringsLongerThan5: FPredicate4<number, string, string, number> =
   *      (n1: number, s1: string, s2: string, n2: number) => 20 > n1 && 5 < s1.length && 5 < s2.length && 20 > n2;
   *
   *   Predicate4.allOf([]).apply(5, '', 'abc', 10);                                              // true
   *
   *   Predicate4.allOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(10, 'abcdef', 'HelloWorld', 12);     // true
   *
   *   Predicate4.allOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(30, 'a', 'HelloWorld', 9);           // false
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate4} to verify
   *
   * @return {@link Predicate4} verifying all provided ones
   */
  static allOf = <T1, T2, T3, T4>(predicates?: Nullable<TPredicate4<T1, T2, T3, T4>[]>): Predicate4<T1, T2, T3, T4> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate4.alwaysTrue();
    }
    return Predicate4.of(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4) =>
        ArrayUtil.foldLeft(
          predicates,
          true,
          (previousBoolean, currentRawPred) =>
            previousBoolean &&
              Predicate4.of(currentRawPred!)
                .apply(
                  t1,
                  t2,
                  t3,
                  t4
                )
        )
    );
  }


  /**
   * Returns a {@link Predicate4} with `false` as result.
   *
   * @return {@link Predicate4}
   */
  static alwaysFalse = <T1, T2, T3, T4>(): Predicate4<T1, T2, T3, T4> =>
    new Predicate4<T1, T2, T3, T4>((t1: T1, t2: T2, t3: T3, t4: T4) => false);


  /**
   * Returns a {@link Predicate4} with `true` as result.
   *
   * @return {@link Predicate4}
   */
  static alwaysTrue = <T1, T2, T3, T4>(): Predicate4<T1, T2, T3, T4> =>
    new Predicate4<T1, T2, T3, T4>((t1: T1, t2: T2, t3: T3, t4: T4) => true);


  /**
   * Checks all given `predicates` to verify that at least one is satisfied.
   *
   * <pre>
   * Example:
   *  const areNumbersEvenAndStringsLongerThan2: Predicate4<number, string, string, number> =
   *      Predicate4.of((n1: number, s1: string, s2: string, n2: number) => 0 == n1 % 2 && 2 < s1.length && 2 < s2.length && 0 == n2 % 2);
   *
   *   const areNumbersLowerThan20AndStringsLongerThan5: FPredicate4<number, string, string, number> =
   *      (n1: number, s1: string, s2: string, n2: number) => 20 > n1 && 5 < s1.length && 5 < s2.length && 20 > n2;
   *
   *   Predicate4.anyOf([]).apply(5, '', false, 10);                                              // false
   *
   *   Predicate4.anyOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(30, 'a', 'HelloWorld', 9);           // false
   *
   *   Predicate4.anyOf(
   *     [areNumbersEvenAndStringsLongerThan2,
   *      areNumbersLowerThan20AndStringsLongerThan5]).apply(10, 'abcdef', 'HelloWorld', 11);     // true
   * </pre>
   *
   * @param predicates
   *    Array of {@link Predicate4} to verify
   *
   * @return {@link Predicate4} verifying provided ones
   */
  static anyOf = <T1, T2, T3, T4>(predicates?: Nullable<TPredicate4<T1, T2, T3, T4>[]>): Predicate4<T1, T2, T3, T4> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate4.alwaysFalse();
    }
    return Predicate4.of(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4) => {
        for (let i = 0; i < predicates!.length; i++) {
          if (Predicate4.of(predicates![i]).apply(t1, t2, t3, t4)) {
            return true;
          }
        }
        return false;
      }
    );
  }


  /**
   * Returns a {@link Predicate4} that verifies if provided parameters are `null` or `undefined`.
   *
   * @return {@link Predicate4} returning `true` if given parameters are `null` or `undefined`, `false` otherwise
   */
  static isNullOrUndefined = <T1, T2, T3, T4>(): Predicate4<T1, T2, T3, T4> =>
    new Predicate4<T1, T2, T3, T4>(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4) =>
        ObjectUtil.isNullOrUndefined(t1) &&
        ObjectUtil.isNullOrUndefined(t2) &&
        ObjectUtil.isNullOrUndefined(t3) &&
        ObjectUtil.isNullOrUndefined(t4)
    );


  /**
   * Returns a {@link Predicate4} that verifies if provided parameters are not `null` or `undefined`.
   *
   * @return {@link Predicate4} returning `true` if given parameters are not `null` or `undefined`, `false` otherwise
   */
  static nonNullOrUndefined = <T1, T2, T3, T4>(): Predicate4<T1, T2, T3, T4> =>
    new Predicate4<T1, T2, T3, T4>(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4) =>
        ObjectUtil.nonNullOrUndefined(t1) &&
        ObjectUtil.nonNullOrUndefined(t2) &&
        ObjectUtil.nonNullOrUndefined(t3) &&
        ObjectUtil.nonNullOrUndefined(t4)
    );


  /**
   * Verifies if the given `input` is an instance of {@link Predicate4}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Predicate4},
   *         `false` otherwise
   */
  static isPredicate = <T1, T2, T3, T4>(input?: any): input is Predicate4<T1, T2, T3, T4> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Predicate4<T1, T2, T3, T4>).and &&
    undefined !== (input as Predicate4<T1, T2, T3, T4>).apply &&
    undefined !== (input as Predicate4<T1, T2, T3, T4>).getVerifier &&
    undefined !== (input as Predicate4<T1, T2, T3, T4>).not &&
    undefined !== (input as Predicate4<T1, T2, T3, T4>).or &&
    isFPredicate4((input as Predicate4<T1, T2, T3, T4>).getVerifier());


  static of<T1, T2, T3, T4>(predicate: FPredicate4<T1, T2, T3, T4>): Predicate4<T1, T2, T3, T4>;
  static of<T1, T2, T3, T4>(predicate: TPredicate4<T1, T2, T3, T4>): Predicate4<T1, T2, T3, T4>;

  /**
   * Returns a {@link Predicate4} based on provided {@link TPredicate4} parameter.
   *
   * @param predicate
   *    {@link TPredicate4} instance to convert to a {@link Predicate4} one
   *
   * @return {@link Predicate4} based on provided {@link TPredicate4}
   *
   * @throws {@link IllegalArgumentError} if `predicate` is `null` or `undefined`
   */
  static of<T1, T2, T3, T4>(predicate: TPredicate4<T1, T2, T3, T4>): Predicate4<T1, T2, T3, T4> {
    AssertUtil.notNullOrUndefined(
      predicate,
      'predicate must be not null and not undefined'
    );
    return Predicate4.isPredicate<T1, T2, T3, T4>(predicate)
      ? predicate
      : new Predicate4(predicate);
  }


  /**
   * Returns internal `verifier`.
   *
   * @return {@link FPredicate4}
   */
  getVerifier = (): FPredicate4<T1, T2, T3, T4> =>
    this.verifier;


  /**
   *    Returns a composed {@link Predicate4} that represents a short-circuiting logical AND of this {@link Predicate4}
   * and another. When evaluating the composed {@link Predicate4}, if this {@link Predicate4} is `false`, then
   * the other {@link Predicate4} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate4} will be applied.
   *
   * @param predicate
   *    {@link TPredicate4} that will be logically-ANDed with this {@link Predicate4}
   *
   * @return a composed {@link Predicate4} that represents the short-circuiting logical AND of this {@link Predicate4}
   *         and `predicate`
   */
  and = (predicate: TPredicate4<T1, T2, T3, T4>): Predicate4<T1, T2, T3, T4> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate4(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4) =>
            this.apply(t1, t2, t3, t4)
        )
      : new Predicate4(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4) =>
            this.apply(t1, t2, t3, t4) &&
              Predicate4.of(predicate).apply(t1, t2, t3, t4)
        );


  /**
   * Evaluates this {@link Predicate4} for the given @type {T1}, @type {T2}, @type {T3} and @type {T4} instances.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   * @param t3
   *    The third input argument
   * @param t4
   *    The fourth input argument
   *
   * @return `true` if the input argument matches the predicate,
   *         `false` otherwise
   */
  apply = (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4): boolean =>
    this.verifier(t1, t2, t3, t4);


  /**
   * Returns a {@link Predicate4} that represents the logical negation of this {@link Predicate4}.
   *
   * @return a {@link Predicate4} that represents the logical negation of this {@link Predicate4}
   */
  not = (): Predicate4<T1, T2, T3, T4> =>
    new Predicate4(
      (t1: T1,
       t2: T2,
       t3: T3,
       t4: T4) =>
        !this.apply(t1, t2, t3, t4)
    );


  /**
   *   Returns a composed {@link Predicate4} that represents a short-circuiting logical OR of this {@link Predicate4}
   * and another. When evaluating the composed {@link Predicate4}, if this {@link Predicate4} is `true`, then
   * the other {@link Predicate4} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate4} will be applied.
   *
   * @param predicate
   *    {@link TPredicate4} that will be logically-ORed with this {@link Predicate4}
   *
   * @return a composed {@link Predicate4} that represents the short-circuiting logical OR of this {@link Predicate4}
   *         and `predicate`
   */
  or = (predicate: TPredicate4<T1, T2, T3, T4>): Predicate4<T1, T2, T3, T4> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate4(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4) =>
            this.apply(t1, t2, t3, t4)
        )
      : new Predicate4(
          (t1: T1,
           t2: T2,
           t3: T3,
           t4: T4) =>
            this.apply(t1, t2, t3, t4) ||
              Predicate4.of(predicate).apply(t1, t2, t3, t4)
        );

}
