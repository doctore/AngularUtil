import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';

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
 * Verifies if the given `input` is potentially an instance of {@link FPredicate1}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FPredicate1}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FPredicate1},
 *         `false` otherwise
 */
export function isFPredicate1<T>(input?: any): input is FPredicate1<T> {
  return ObjectUtil.nonNullOrUndefined(input) &&
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
   * Checks all given `predicates` to verify if all of them are satisfied.
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
   * Returns a {@link Predicate1} with `false` as result.
   *
   * @return {@link Predicate1}
   */
  static alwaysFalse = <T>(): Predicate1<T> =>
    new Predicate1<T>(
      (t: T) => false
    );


  /**
   * Returns a {@link Predicate1} with `true` as result.
   *
   * @return {@link Predicate1}
   */
  static alwaysTrue = <T>(): Predicate1<T> =>
    new Predicate1<T>(
      (t: T) => true
    );


  /**
   * Checks all given `predicates` to verify that at least one is satisfied.
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
   * Returns a {@link Predicate1} that verifies if provided parameter is `null` or `undefined`.
   *
   * @return {@link Predicate1} returning `true` if given parameter is `null` or `undefined`, `false` otherwise
   */
  static isNullOrUndefined = <T>(): Predicate1<T> =>
    new Predicate1<T>((t: T) => ObjectUtil.isNullOrUndefined(t));


  /**
   * Returns a {@link Predicate1} that verifies if provided parameter is not `null` or `undefined`.
   *
   * @return {@link Predicate1} returning `true` if given parameter is not `null` or `undefined`, `false` otherwise
   */
  static nonNullOrUndefined = <T>(): Predicate1<T> =>
    new Predicate1<T>((t: T) => ObjectUtil.nonNullOrUndefined(t));


  /**
   * Verifies if the given `input` is an instance of {@link Predicate1}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Predicate1},
   *         `false` otherwise
   */
  static isPredicate = <T>(input?: any): input is Predicate1<T> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Predicate1<T>).and &&
    undefined !== (input as Predicate1<T>).apply &&
    undefined !== (input as Predicate1<T>).getVerifier &&
    undefined !== (input as Predicate1<T>).not &&
    undefined !== (input as Predicate1<T>).or &&
    isFPredicate1((input as Predicate1<T>).getVerifier());


  static of<T>(predicate: FPredicate1<T>): Predicate1<T>;
  static of<T>(predicate: TPredicate1<T>): Predicate1<T>;

  /**
   * Returns a {@link Predicate1} based on provided {@link TPredicate1} parameter.
   *
   * @param predicate
   *    {@link TPredicate1} instance to convert to a {@link Predicate1} one
   *
   * @return {@link Predicate1} based on provided {@link TPredicate1}
   *
   * @throws {IllegalArgumentError} if `predicate` is `null` or `undefined`
   */
  static of<T>(predicate: TPredicate1<T>): Predicate1<T> {
    AssertUtil.notNullOrUndefined(
      predicate,
      'predicate must be not null and not undefined'
    );
    return Predicate1.isPredicate<T>(predicate)
      ? predicate
      : new Predicate1(predicate);
  }


  /**
   * Returns internal `verifier`.
   *
   * @return {@link FPredicate1}
   */
  getVerifier = (): FPredicate1<T> =>
    this.verifier;


  /**
   *    Returns a composed {@link Predicate1} that represents a short-circuiting logical AND of this {@link Predicate1}
   * and another. When evaluating the composed {@link Predicate1}, if this {@link Predicate1} is `false`, then
   * the other {@link Predicate1} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate1} will be applied.
   *
   * @param predicate
   *    {@link TPredicate1} that will be logically-ANDed with this {@link Predicate1}
   *
   * @return a composed {@link Predicate1} that represents the short-circuiting logical AND of this {@link Predicate1}
   *         and `predicate`
   */
  and = (predicate: TPredicate1<T>): Predicate1<T> =>
    ObjectUtil.isNullOrUndefined(predicate)
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
   * Evaluates this {@link Predicate1} for the given type `T` instance.
   *
   * @param t
   *    The input argument
   *
   * @return `true` if the input argument matches the predicate,
   *         `false` otherwise
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
   * and another. When evaluating the composed {@link Predicate1}, if this {@link Predicate1} is `true`, then
   * the other {@link Predicate1} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate1} will be applied.
   *
   * @param predicate
   *    {@link TPredicate1} that will be logically-ORed with this {@link Predicate1}
   *
   * @return a composed {@link Predicate1} that represents the short-circuiting logical OR of this {@link Predicate1}
   *         and `predicate`
   */
  or = (predicate: TPredicate1<T>): Predicate1<T> =>
    ObjectUtil.isNullOrUndefined(predicate)
      ? new Predicate1(
          (t: T) =>
            this.apply(t)
        )
      : new Predicate1(
          (t: T) =>
            this.apply(t) ||
              Predicate1.of(predicate).apply(t)
        );


  /**
   *   Returns a composed {@link Predicate1} that represents a short-circuiting logical XOR of this {@link Predicate1}
   * and another. When evaluating the composed {@link Predicate1}, if this {@link Predicate1} is `true`, then
   * the other {@link Predicate1} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate1} will be applied.
   *
   * @param predicate
   *    {@link TPredicate1} that will be logically-XORed with this {@link Predicate1}
   *
   * @return a composed {@link Predicate1} that represents the short-circuiting logical XOR of this {@link Predicate1}
   *         and `predicate`
   */
  xor = (predicate: TPredicate1<T>): Predicate1<T> => {
    if (ObjectUtil.isNullOrUndefined(predicate)) {
      return new Predicate1(
        (t: T) =>
          this.apply(t)
      );
    }
    const givenPredicate = Predicate1.of(predicate);
    return new Predicate1(
      (t: T) => {
        const currentApply = this.apply(t);
        const givenApply = givenPredicate.apply(t);
        return (currentApply || givenApply) &&
          !(currentApply && givenApply);
      });
  };

}
