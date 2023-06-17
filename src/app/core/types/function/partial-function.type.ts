import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Optional } from '@app-core/types';
import { FFunction1, FFunction2, Function1, Function2, TFunction1, TFunction2 } from '@app-core/types/function';
import { FPredicate1, FPredicate2, Predicate1, Predicate2, TPredicate1, TPredicate2 } from '@app-core/types/predicate';

/**
 *    Unary function where the domain does not necessarily include all values of type T. The method {@link PartialFunction#isDefinedAt}
 * allows to test dynamically if a value is in the domain of the function, it is the responsibility of the caller to call it
 * before {@link PartialFunction#apply}, because if {@link PartialFunction#isDefinedAt} is `false`, it is not guaranteed
 * {@link PartialFunction#apply} will throw an error to indicate a wrong condition. If an error is not thrown, evaluation
 * may result in an arbitrary value.
 * <p>
 *    The usual way to respect this contract is to call {@link PartialFunction#applyOrElse}, which is expected to be more
 * efficient than calling both {@link PartialFunction#isDefinedAt} and {@link PartialFunction#apply}.
 *
 * <pre>
 * Example:
 *    const multiply2ForEven: PartialFunction<number, number> = PartialFunction.of(
 *      (n: number) => 0 == n % 2
 *      (n: number) => 2 * n
 *    );
 *
 *    multiply2ForEvenResult1 = multiply2ForEven.applyOrElse(
 *      3,
 *      (n: number) => 1 + n,
 *    );   // Will return 4
 *
 *    multiply2ForEvenResult2 = multiply2ForEven.applyOrElse(
 *      8,
 *      (n: number) => 1 + n,
 *    );   // Will return 16
 * </pre>
 *
 * @param <T>
 *    The type of the function input
 * @param <R>
 *    Type of the result of the function
 */
export class PartialFunction<T, R> {

  private constructor(private readonly verifier: Predicate1<T>,
                      private readonly mapper: Function1<T, R>) { }


  /**
   * Returns a {@link PartialFunction} with:
   * <p>
   *  - {@link PartialFunction#isDefinedAt} always returns `true`
   *  - {@link Function#apply} always returns its input argument
   *
   * @return {@link PartialFunction} that always returns its input argument
   */
  static identity = <T>(): PartialFunction<T, T> =>
    new PartialFunction(
      Predicate1.alwaysTrue(),
      Function1.identity(),
    );


  /**
   * Verifies if the given `input` is an instance of {@link PartialFunction}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link PartialFunction},
   *         `false` otherwise
   */
  static isPartialFunction = <T, R>(input?: any): input is PartialFunction<T, R> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as PartialFunction<T, R>).andThen &&
    undefined !== (input as PartialFunction<T, R>).apply &&
    undefined !== (input as PartialFunction<T, R>).applyOrElse &&
    undefined !== (input as PartialFunction<T, R>).compose &&
    undefined !== (input as PartialFunction<T, R>).isDefinedAt;


  /**
   *    Returns a new {@link PartialFunction} based on provided {@link FPredicate1} `verifier` and
   * {@link FFunction1} `mapper`.
   *
   * @apiNote
   *    If `verifier` is `null` or `undefined` then {@link Predicate1#alwaysTrue} will be applied.
   *
   * @param verifier
   *    {@link FPredicate1} used to know new {@link PartialFunction}'s domain
   * @param mapper
   *    {@link FFunction1} required for {@link PartialFunction#apply}
   *
   * @return {@link PartialFunction} to convert values of @type {T} to @type {R}
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined`
   */
  static of<T, R>(verifier: FPredicate1<T>,
                  mapper: FFunction1<T, R>): PartialFunction<T, R>;


  /**
   *    Returns a new {@link PartialFunction} based on provided {@link TPredicate1} `verifier` and
   * {@link TFunction1} `mapper`.
   *
   * @apiNote
   *    If `verifier` is `null` or `undefined` then {@link Predicate1#alwaysTrue} will be applied.
   *
   * @param verifier
   *    {@link TPredicate1} used to know new {@link PartialFunction}'s domain
   * @param mapper
   *    {@link TFunction1} required for {@link PartialFunction#apply}
   *
   * @return {@link PartialFunction} to convert values of @type {T} to @type {R}
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined`
   */
  static of<T, R>(verifier: TPredicate1<T>,
                  mapper: TFunction1<T, R>): PartialFunction<T, R>;


  static of<T, R>(verifier: TPredicate1<T>,
                  mapper: TFunction1<T, R>): PartialFunction<T, R> {
    AssertUtil.notNullOrUndefined(
      mapper,
      'mapper must be not null and not undefined'
    );
    const finalVerifier = ObjectUtil.isNullOrUndefined(verifier)
        ? Predicate1.alwaysTrue<T>()
        : Predicate1.of(verifier);

    return new PartialFunction<T,R>(
      finalVerifier,
      Function1.of(mapper)
    );
  }


  /**
   *    Returns a new {@link PartialFunction} based on provided {@link FPredicate2} `verifier` and
   * {@link FFunction2} `mapper`.
   *
   * @apiNote
   *    If `verifier` is `null` or `undefined` then {@link Predicate2#alwaysTrue} will be applied.
   *
   * @param verifier
   *    {@link FPredicate2} used to know new {@link PartialFunction}'s domain
   * @param mapper
   *    {@link FFunction2} required for {@link PartialFunction#apply}
   *
   * @return {@link PartialFunction} to convert tuples of [@type {T1}, @type {R1}] to [@type {T2}, @type {R2}]
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined`
   */
  static of2<T1, T2, R1, R2>(verifier: FPredicate2<T1, R1>,
                             mapper: FFunction2<T1, R1, [T2, R2]>): PartialFunction<[T1, R1], [T2, R2]>;


  /**
   *    Returns a new {@link PartialFunction} based on provided {@link TPredicate2} `verifier` and
   * {@link TFunction2} `mapper`.
   *
   * @apiNote
   *    If `verifier` is `null` or `undefined` then {@link Predicate2#alwaysTrue} will be applied.
   *
   * @param verifier
   *    {@link TPredicate2} used to know new {@link PartialFunction}'s domain
   * @param mapper
   *    {@link TFunction2} required for {@link PartialFunction#apply}
   *
   * @return {@link PartialFunction} to convert tuples of [@type {T1}, @type {R1}] to [@type {T2}, @type {R2}]
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined`
   */
  static of2<T1, T2, R1, R2>(verifier: TPredicate2<T1, R1>,
                             mapper: TFunction2<T1, R1, [T2, R2]>): PartialFunction<[T1, R1], [T2, R2]>;


  static of2<T1, T2, R1, R2>(verifier: TPredicate2<T1, R1>,
                             mapper: TFunction2<T1, R1, [T2, R2]>): PartialFunction<[T1, R1], [T2, R2]> {
    AssertUtil.notNullOrUndefined(
      mapper,
      'mapper must be not null and not undefined'
    );
    const finalVerifier = ObjectUtil.isNullOrUndefined(verifier)
      ? Predicate2.alwaysTrue<T1, R1>()
      : Predicate2.of(verifier);

    return new PartialFunction(
      Predicate1.of(
        ([t1, r1]) => finalVerifier.apply(t1, r1)
      ),
      Function1.of(
        ([t1, r1]) => Function2.of(mapper).apply(t1, r1)
      )
    );
  }


  /**
   *    Returns a composed {@link PartialFunction} that first applies this {@link PartialFunction} to its input, and
   * then applies the `after` {@link TFunction1} to the result.
   *
   * @param after
   *    {@link TFunction1} to apply after this {@link PartialFunction} is applied
   *
   * @return composed {@link PartialFunction} that first applies this {@link PartialFunction} and then applies the
   *         `after` {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `after` is `null` or `undefined`
   */
  andThen<V>(after: TFunction1<R, V>): PartialFunction<T, V>;


  /**
   *    Returns a composed {@link PartialFunction} that first applies this {@link PartialFunction} to its input, and
   * then applies the `after` {@link PartialFunction} to the result.
   *
   * @param after
   *    {@link PartialFunction} to apply after this {@link PartialFunction} is applied
   *
   * @return composed {@link PartialFunction} that first applies this {@link PartialFunction} and then applies the
   *         `after` {@link PartialFunction}
   *
   * @throws {@link IllegalArgumentError} if `after` is `null` or `undefined`
   */
  andThen<V>(after: PartialFunction<R, V>): PartialFunction<T, V>;


  andThen<V>(after: TFunction1<R, V> | PartialFunction<R, V>): PartialFunction<T, V> {
    AssertUtil.notNullOrUndefined(
      after,
      'after must be not null and not undefined'
    );
    if (PartialFunction.isPartialFunction(after)) {
      return new PartialFunction(
        Predicate1.of(
          (t: T) =>
            this.verifier.apply(t) &&
            (<PartialFunction<R, V>>after).verifier.apply(
              this.mapper.apply(t)
            )
        ),
        this.mapper.andThen((<PartialFunction<R, V>>after).mapper)
      );
    }
    return new PartialFunction(
      this.verifier,
      this.mapper.andThen(<TFunction1<R, V>>after)
    );
  }


  /**
   * Applies this {@link PartialFunction} to the given argument.
   *
   * @param t
   *    The input argument
   *
   * @return new instance of R
   */
  apply = (t: T): R =>
    this.mapper.apply(t);


  /**
   *    Applies this {@link PartialFunction} to the given `t` when it is contained in the {@link PartialFunction}'s
   * domain. Otherwise, applies `defaultFunction`
   *
   * @param t
   *    The function argument
   * @param defaultFunction
   *    {@link TFunction1} to apply if provided `t` is not contained in the {@link PartialFunction}'s domain
   *
   * @return the result of this {@link PartialFunction} if `t` belongs to the {@link PartialFunction}'s domain,
   *         `defaultFunction` application otherwise.
   *
   * @throws {@link IllegalArgumentError} if `defaultFunction` is `null` or `undefined` and `t` is not
   *         contained in the {@link PartialFunction}'s domain
   */
  applyOrElse = (t: T,
                 defaultFunction: TFunction1<T, R>): R => {
    if (this.isDefinedAt(t)) {
      return this.apply(t);
    }
    AssertUtil.notNullOrUndefined(
      defaultFunction,
      'defaultFunction must be not null and not undefined'
    );
    return Function1.of(defaultFunction).apply(t);
  }


  /**
   *    Returns a composed {@link PartialFunction} that first applies the `before` {@link TFunction1} to its input,
   * and then this {@link PartialFunction} to the result.
   *
   * @param before
   *    {@link TFunction1} to apply before this {@link PartialFunction} is applied
   *
   * @return composed {@link PartialFunction} that first applies the `before` {@link TFunction1} and then applies
   *         this {@link PartialFunction}
   *
   * @throws {@link IllegalArgumentError} if `before` is `null` or `undefined`
   */
  compose<V>(before: TFunction1<V, T>): PartialFunction<V, R>;


  /**
   *    Returns a composed {@link PartialFunction} that first applies the `before` {@link PartialFunction} to its input,
   * and then this {@link PartialFunction} to the result.
   *
   * @param before
   *    {@link PartialFunction} to apply before this {@link PartialFunction} is applied
   *
   * @return composed {@link PartialFunction} that first applies the `before` {@link PartialFunction} and then applies
   *         this {@link PartialFunction}
   *
   * @throws {@link IllegalArgumentError} if `before` is `null` or `undefined`
   */
  compose<V>(before: PartialFunction<V, T>): PartialFunction<V, R>;


  compose<V>(before: TFunction1<V, T> | PartialFunction<V, T>): PartialFunction<V, R> {
    AssertUtil.notNullOrUndefined(
      before,
      'before must be not null and not undefined'
    );
    if (PartialFunction.isPartialFunction(before)) {
      return new PartialFunction(
        Predicate1.of(
          (v: V) =>
            before.isDefinedAt(v) &&
            this.verifier.apply(
              (<PartialFunction<V, T>>before).apply(v)
            )
        ),
        this.mapper.compose((<PartialFunction<V, T>>before).mapper)
      );
    }
    return new PartialFunction(
      Predicate1.of(
        (v: V) =>
          this.verifier.apply(
            Function1.of(<TFunction1<V, T>>before).apply(v)
          )
      ),
      this.mapper.compose(<TFunction1<V, T>>before)
    );
  }


  /**
   * Tests if the provided `t` is contained in the {@link PartialFunction}'s domain.
   *
   * @param t
   *    A potential function argument
   *
   * @return `true` if the given value is contained in the {@link PartialFunction}'s domain,
   *         `false` otherwise
   */
  isDefinedAt = (t: T): boolean =>
    this.verifier.apply(t);


  /**
   * Turns this {@link PartialFunction} into a {@link Function1} returning an {@link Optional} result.
   *
   * @return {@link Function1} that takes an argument `t` to {@link Optional} of {@link PartialFunction#apply}
   *         if `t` belongs to the {@link PartialFunction}'s domain, {@link Optional#empty} otherwise.
   */
  lift = (): Function1<T, Optional<R>> =>
    Function1.of(
      (t: T) =>
        this.isDefinedAt(t)
          ? Optional.ofNullable(
              this.apply(t)
            )
          : Optional.empty()
    );


  /**
   *    Composes this {@link PartialFunction} with another one, which gets applied where this {@link PartialFunction}
   * is not defined.
   *
   * @apiNote
   *    If `defaultPartialFunction` is `null` or `undefined` then only this {@link PartialFunction} will be applied.
   *
   * @param defaultPartialFunction
   *    {@link PartialFunction} to apply when current value is not contained in this {@link PartialFunction}'s domain
   *
   * @return {@link PartialFunction} which has as domain the union of the domains of this {@link PartialFunction} and
   *         `defaultPartialFunction`. The resulting {@link PartialFunction} takes `x` to `this(x)`
   *         where this is defined, and to `defaultPartialFunction(x)` where it is not.
   */
  orElse = (defaultPartialFunction: PartialFunction<T, R>): PartialFunction<T, R> => {
    const finalVerifier = ObjectUtil.isNullOrUndefined(defaultPartialFunction)
      ? this.verifier
      : this.verifier.or(defaultPartialFunction.verifier);

    const finalMapper = ObjectUtil.isNullOrUndefined(defaultPartialFunction)
      ? Function1.of(
        (t: T) =>
          this.apply(t)
        )
      : Function1.of(
        (t: T) =>
          this.applyOrElse(
            t,
            defaultPartialFunction.mapper
          )
        );
    return new PartialFunction(
      finalVerifier,
      finalMapper
    );
  }

}
