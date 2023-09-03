import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';

/**
 * Union type of {@link FPredicate2} and {@link Predicate2}
 */
export type TPredicate2<T1, T2> = FPredicate2<T1, T2> | Predicate2<T1, T2>;


/**
 * Represents the function approach of a predicate (boolean-valued function) of two arguments.
 *
 * @typeParam <T1>
 *   Type of first parameter received by this {@link FPredicate2}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link FPredicate2}
 */
export type FPredicate2<T1, T2> =
  (t1: T1,
   t2: T2) => boolean;


/**
 * Verifies if the given `input` is potentially an instance of {@link FPredicate2}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FPredicate2}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FPredicate2},
 *         `false` otherwise
 */
export function isFPredicate2<T1, T2>(input?: any): input is FPredicate2<T1, T2> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    2 === input.length;
}



/**
 * Represents a predicate (boolean-valued function) of two arguments used as wrapper of {@link FPredicate2}.
 * <p>
 * This is a functional interface whose functional method is {@link Predicate2#apply}.
 *
 * @typeParam <T1>
 *   Type of results returned by this {@link Predicate2}
 * @typeParam <T2>
 *   Type of second parameter received by this {@link Predicate2}
 */
export class Predicate2<T1, T2> {

  private constructor(private readonly verifier: FPredicate2<T1, T2>) {}


  /**
   * Checks all given `predicates` to verify if all of them are satisfied.
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
   *    Array of {@link Predicate2} to verify
   *
   * @return {@link Predicate2} verifying all provided ones
   */
  static allOf = <T1, T2>(predicates?: Nullable<TPredicate2<T1, T2>[]>): Predicate2<T1, T2> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate2.alwaysTrue();
    }
    return Predicate2.of(
      (t1: T1,
       t2: T2) =>
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
   * Returns a {@link Predicate2} with `false` as result.
   *
   * @return {@link Predicate2}
   */
  static alwaysFalse = <T1, T2>(): Predicate2<T1, T2> =>
    new Predicate2<T1, T2>((t1: T1, t2: T2) => false);


  /**
   * Returns a {@link Predicate2} with `true` as result.
   *
   * @return {@link Predicate2}
   */
  static alwaysTrue = <T1, T2>(): Predicate2<T1, T2> =>
    new Predicate2<T1, T2>((t1: T1, t2: T2) => true);


  /**
   * Checks all given `predicates` to verify that at least one is satisfied.
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
   *    Array of {@link Predicate2} to verify
   *
   * @return {@link Predicate2} verifying provided ones
   */
  static anyOf = <T1, T2>(predicates?: Nullable<TPredicate2<T1, T2>[]>): Predicate2<T1, T2> => {
    if (ArrayUtil.isEmpty(predicates)) {
      return Predicate2.alwaysFalse();
    }
    return Predicate2.of(
      (t1: T1,
       t2: T2) => {
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
   * Returns a {@link Predicate2} that verifies if provided parameters are `null` or `undefined`.
   *
   * @return {@link Predicate2} returning `true` if given parameters are `null` or `undefined`, `false` otherwise
   */
  static isNullOrUndefined = <T1, T2>(): Predicate2<T1, T2> =>
    new Predicate2<T1, T2>(
      (t1: T1,
       t2: T2) =>
        ObjectUtil.isNullOrUndefined(t1) &&
        ObjectUtil.isNullOrUndefined(t2)
    );


  /**
   * Returns a {@link Predicate2} that verifies if provided parameters are not `null` or `undefined`.
   *
   * @return {@link Predicate2} returning `true` if given parameters are not `null` or `undefined`, `false` otherwise
   */
  static nonNullOrUndefined = <T1, T2>(): Predicate2<T1, T2> =>
    new Predicate2<T1, T2>(
      (t1: T1,
       t2: T2) =>
        ObjectUtil.nonNullOrUndefined(t1) &&
        ObjectUtil.nonNullOrUndefined(t2)
    );


  /**
   * Verifies if the given `input` is an instance of {@link Predicate2}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Predicate2},
   *         `false` otherwise
   */
  static isPredicate = <T1, T2>(input?: any): input is Predicate2<T1, T2> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Predicate2<T1, T2>).and &&
    undefined !== (input as Predicate2<T1, T2>).apply &&
    undefined !== (input as Predicate2<T1, T2>).getVerifier &&
    undefined !== (input as Predicate2<T1, T2>).not &&
    undefined !== (input as Predicate2<T1, T2>).or &&
    isFPredicate2((input as Predicate2<T1, T2>).getVerifier());


  static of<T1, T2>(predicate: FPredicate2<T1, T2>): Predicate2<T1, T2>;
  static of<T1, T2>(predicate: TPredicate2<T1, T2>): Predicate2<T1, T2>;

  /**
   * Returns a {@link Predicate2} based on provided {@link TPredicate2} parameter.
   *
   * @param predicate
   *    {@link TPredicate2} instance to convert to a {@link Predicate2} one
   *
   * @return {@link Predicate2} based on provided {@link TPredicate2}
   *
   * @throws {@link IllegalArgumentError} if `predicate` is `null` or `undefined`
   */
  static of<T1, T2>(predicate: TPredicate2<T1, T2>): Predicate2<T1, T2> {
    AssertUtil.notNullOrUndefined(
      predicate,
      'predicate must be not null and not undefined'
    );
    return Predicate2.isPredicate<T1, T2>(predicate)
      ? predicate
      : new Predicate2(predicate);
  }


  /**
   * Returns internal `verifier`.
   *
   * @return {@link FPredicate2}
   */
  getVerifier = (): FPredicate2<T1, T2> =>
    this.verifier;


  /**
   *    Returns a composed {@link Predicate2} that represents a short-circuiting logical AND of this {@link Predicate2}
   * and another. When evaluating the composed {@link Predicate2}, if this {@link Predicate2} is `false`, then
   * the other {@link Predicate2} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate2} will be applied.
   *
   * @param predicate
   *    {@link TPredicate2} that will be logically-ANDed with this {@link Predicate2}
   *
   * @return a composed {@link Predicate2} that represents the short-circuiting logical AND of this {@link Predicate2}
   *         and `predicate`
   */
  and = (predicate: TPredicate2<T1, T2>): Predicate2<T1, T2> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate2(
          (t1: T1,
           t2: T2) =>
            this.apply(t1, t2)
        )
      : new Predicate2(
          (t1: T1,
           t2: T2) =>
            this.apply(t1, t2) &&
              Predicate2.of(predicate).apply(t1, t2)
        );


  /**
   * Evaluates this {@link Predicate2} for the given @type {T1} and @type {T2} instances.
   *
   * @param t1
   *    The first input argument
   * @param t2
   *    The second input argument
   *
   * @return `true` if the input argument matches the predicate,
   *         `false` otherwise
   */
  apply = (t1: T1,
           t2: T2): boolean =>
    this.verifier(t1, t2);


  /**
   * Returns a {@link Predicate2} that represents the logical negation of this {@link Predicate2}.
   *
   * @return a {@link Predicate2} that represents the logical negation of this {@link Predicate2}
   */
  not = (): Predicate2<T1, T2> =>
    new Predicate2(
      (t1: T1,
       t2: T2) =>
        !this.apply(t1, t2)
    );


  /**
   *   Returns a composed {@link Predicate2} that represents a short-circuiting logical OR of this {@link Predicate2}
   * and another. When evaluating the composed {@link Predicate2}, if this {@link Predicate2} is `true`, then
   * the other {@link Predicate2} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate2} will be applied.
   *
   * @param predicate
   *    {@link TPredicate2} that will be logically-ORed with this {@link Predicate2}
   *
   * @return a composed {@link Predicate2} that represents the short-circuiting logical OR of this {@link Predicate2}
   *         and `predicate`
   */
  or = (predicate: TPredicate2<T1, T2>): Predicate2<T1, T2> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate2(
          (t1: T1,
           t2: T2) =>
            this.apply(t1, t2)
        )
      : new Predicate2(
          (t1: T1,
           t2: T2) =>
            this.apply(t1, t2) ||
              Predicate2.of(predicate).apply(t1, t2)
        );

}
