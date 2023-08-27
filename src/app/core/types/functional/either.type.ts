import { Optional, Try } from '@app-core/types/functional';
import { AssertUtil, ObjectUtil } from '@app-core/util';
import { BinaryOperator, TBinaryOperator } from '@app-core/types/function/operator';
import { Predicate1, TPredicate1 } from '@app-core/types/predicate';
import { Function0, Function1, isFFunction0, TFunction0, TFunction1 } from '@app-core/types/function';

/**
 *    Represents a value of one of two possible types (a disjoint union). An instance of Either is an instance of
 * {@link Left} or {@link Right}.
 * <p>
 *    A common use of Either is as an alternative to {@link Optional} for dealing with possibly missing values. In this
 * usage, {@link Optional#empty} is replaced with a {@link Left} which can contain useful information. {@link Right}
 * takes the place of {@link Optional#get}. Convention dictates that {@link Left} is used for failure and {@link Right}
 * is used for success.
 * <p>
 *    For example, you could use {@link Either}<string, number> to indicate whether a received input is a string or
 * a number.
 *
 * @typeParam <L>
 *    Type of the {@link Left} value of an {@link Either}
 * @typeParam <R>
 *    Type of the {@link Right} value of an {@link Either}
 */
export abstract class Either<L, R> {

  /**
   * Returns `true` is this is a {@link Right}, `false` otherwise.
   */
  abstract isRight(): boolean;


  /**
   * Gets the value of this {@link Either} if is a {@link Right} or throws {@link ReferenceError} if this is a {@link Left}.
   *
   * @return the {@link Right} value
   *
   * @throws {@link ReferenceError} if this is an {@link Left}
   */
  abstract get(): R;


  /**
   * Gets the value of this {@link Either} if is a {@link Left} or throws {@link ReferenceError} if this is a {@link Right}.
   *
   * @return the {@link Left} value
   *
   * @throws {@link ReferenceError} if this is a {@link Right}
   */
  abstract getLeft(): L;


  /**
   * Creates a {@link Right} that contains the given `value`.
   *
   * @param value
   *    The value to store in the returned {@link Right}
   *
   * @return {@link Right} with the provided `value`
   */
  static right = <L, R>(value: R): Either<L, R> =>
    Right.of<L, R>(value);


  /**
   * Creates a {@link Left} that contains the given `value`.
   *
   * @param value
   *    The value to store in the returned {@link Left}
   *
   * @return {@link Left} with the provided `value`
   */
  static left = <L, R>(value: L): Either<L, R> =>
    Left.of<L, R>(value);


  /**
   * Merge given `either` with this {@link Either}, managing the following use cases:
   * <p>
   *   1. `this` = {@link Right}, `either` = {@link Right}  =>  return a {@link Right} instance applying `mapperRight`
   *   2. `this` = {@link Right}, `either` = {@link Left}   =>  return the {@link Left}
   *   3. `this` = {@link Left},  `either` = {@link Right}  =>  return the {@link Left}
   *   4. `this` = {@link Left},  `either` = {@link Left}   =>  return a {@link Left} instance applying `mapperLeft`
   *
   * @apiNote
   *    If provided `either` is `null` or `undefined`, the current instance will be returned.
   *
   * @param either
   *    New {@link Either} to merge with the current one
   * @param mapperLeft
   *    {@link TBinaryOperator} used to map this {@link Either} and given `either`, both {@link Left}
   * @param mapperRight
   *    {@link TBinaryOperator} used to map this {@link Either} and given `either`, both {@link Right}
   *
   * @return {@link Either} merging `either` with this {@link Either}
   *
   * @throws {@link IllegalArgumentError} if `mapperLeft` is `null` or `undefined` and the current instance and `either` are {@link Left}
   *                                      or `mapperRight` is `null` or `undefined` and the current instance and `either` are {@link Right}
   */
  ap = (either: Either<L, R>,
        mapperLeft: TBinaryOperator<L>,
        mapperRight: TBinaryOperator<R>): Either<L, R> => {

    if (ObjectUtil.isNullOrUndefined(either)) {
      return this;
    }
    // This is a Right instance
    if (this.isRight()) {

      // Current and given either are Right, a new merged Right instance will be returned
      if (either.isRight()) {
        return Either.right<L, R>(
          BinaryOperator.of<R>(mapperRight)
            .apply(
              this.get(),
              either.get()
            )
        );
      }
      // This is Right but either is Left
      return Either.left<L, R>(
        either.getLeft()
      );

    // This is a Left instance
    } else {

      // Due to only this is Left, returns this
      if (either.isRight()) {
        return Either.left<L, R>(
          this.getLeft()
        );
      }
      // Current and given either are Left, a new merged Left instance will be returned
      return Either.left<L, R>(
        BinaryOperator.of<L>(mapperLeft)
          .apply(
            this.getLeft(),
            either.getLeft()
          )
      );
    }
  }


  /**
   * Filters the current {@link Either} returning:
   * <p>
   *   1. {@link Right} if `this` is a {@link Right} and its value matches given {@link TPredicate1} (or `predicate` is `null` or `undefined`)
   *   2. {@link Left} applying `zero` if this is {@link Right} but its value does not match given {@link TPredicate1}
   *   3. {@link Left} with the existing value if this is a {@link Left}
   *
   * <pre>
   * Examples:
   *
   *   Either.right(11).filterOrElse(i => i > 10, () => 'error');           // Right(11)
   *   Either.right(7).filterOrElse(i => i > 10, () => 'error');            // Left("error")
   *   Either.left('warning').filterOrElse(i => i > 10, () => 'error');     // Left("warning")
   * </pre>
   *
   * @param predicate
   *    {@link TPredicate1} to apply the stored value if the current instance is a {@link Right} one
   * @param zero
   *    {@link TFunction0} that turns a {@link Right} value into a {@link Left} one if this is {@link Right} but its
   *    value does not match given {@link TPredicate1}
   *
   * @throws {@link IllegalArgumentError} if `zero` is `null` or `undefined`, this is a {@link Right} but does not match
   *                                      with the given {@link TPredicate1}
   *
   * @return {@link Right} if `this` is {@link Right} and `predicate` matches,
   *         {@link Left} with `zero` otherwise.
   */
  filterOrElse = (predicate: TPredicate1<R>,
                  zero: TFunction0<L>): Either<L, R> => {
    if (!this.isRight() ||
      ObjectUtil.isNullOrUndefined(predicate)) {
      return this;
    }
    const finalPredicate = Predicate1.of(predicate);
    if (finalPredicate.apply(this.get())) {
      return this;
    }
    return Either.left<L, R>(
      Function0.of<L>(zero)
        .apply()
    );
  }


  /**
   *    If the current {@link Either} is a {@link Right} instance, returns the result of applying the given
   * {@link Either}-bearing mapping function to the value. Otherwise, does nothing if this is a {@link Left}.
   *
   * @param mapper
   *    The mapping {@link TFunction1} to apply the value of a {@link Right} instance
   *
   * @return {@link Right} applying `mapper` if `this` is {@link Right}, {@link Left} otherwise
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined` and the current instance is a {@link Right} one
   */
  flatMap = <U>(mapper: TFunction1<R, Either<L, U>>): Either<L, U> => {
    if (this.isRight()) {
      AssertUtil.notNullOrUndefined(
        mapper,
        'mapper must be not null and not undefined'
      );
      return Function1.of(mapper)
        .apply(
          this.get()
        );
    }
    return Either.left<L, U>(
      this.getLeft()
    );
  }


  /**
   *    Applies mapperRight` if current {@link Either} is a {@link Right} instance, `mapperLeft` if it is a {@link Left},
   * transforming internal values into another one.
   *
   * <pre>
   * Example:
   *
   *   // Return 11
   *   Either.right<string, number>(11)
   *         .fold(
   *              s -> s.length,
   *              Function1.identity()
   *           );
   *
   *   // Return 3
   *   Either.left<string, number>('abc')
   *         .fold(
   *              s -> s.length,
   *              Function1.identity()
   *           );
   * </pre>
   *
   * @param mapperLeft
   *    The mapping {@link TFunction1} to apply the value of a {@link Left} instance
   * @param mapperRight
   *    The mapping {@link TFunction1} to apply the value of a {@link Right} instance
   *
   * @return the result of applying the suitable {@link TFunction1}
   *
   * @throws {@link IllegalArgumentError} if `mapperRight` is `null` or `undefined` and the current instance is a {@link Right} one
   *                                      or `mapperLeft` is `null` or `undefined` and the current instance is a {@link Left} one
   */
  fold = <U>(mapperLeft: TFunction1<L, U>,
             mapperRight: TFunction1<R, U>): U => {
    if (this.isRight()) {
      AssertUtil.notNullOrUndefined(
        mapperRight,
        'mapperRight must be not null and not undefined'
      );
      return Function1.of(mapperRight)
        .apply(
          this.get()
        );
    }
    AssertUtil.notNullOrUndefined(
      mapperLeft,
      'mapperLeft must be not null and not undefined'
    );
    return Function1.of(mapperLeft)
      .apply(
        this.getLeft()
      );
  }


  /**
   * Returns the stored value if the underline instance is {@link Right}, otherwise returns `defaultValue`.
   *
   * @param defaultValue
   *    Returned value if current instance is an {@link Left} one
   *
   * @return @type {T} with value stored in {@link Right} instance,
   *         `defaultValue` otherwise
   */
  getOrElse = (defaultValue: R): R =>
    this.isRight()
      ? this.get()
      : defaultValue;


  /**
   * Returns the stored value if the underline instance is {@link Right}, otherwise returns `defaultValue`.
   *
   * @param defaultValue
   *    Returned value if current instance is an {@link Left} one
   *
   * @return {@link Optional#empty} if this {@link Either} is an empty {@link Right} instance or provided `defaultValue` is `null` or `undefined`,
   *         {@link Optional} with the internal value if this {@link Either} is non empty {@link Right} instance,
   *         {@link Optional} with provided `defaultValue` otherwise
   */
  getOrElseOptional = (defaultValue: R): Optional<R> =>
    Optional.ofNullable(
      this.getOrElse(
        defaultValue
      )
    );


  /**
   * Verifies if the current instance has no value, that is:
   * <p>
   *    1. Is a {@link Failure} one.
   *    2. Is a {@link Success} instance but its internal value is `null` or `undefined`.
   *
   * @return `true` is the current instance is empty, `false` otherwise
   */
  isEmpty = (): boolean =>
    !this.isRight() ||
    ObjectUtil.isNullOrUndefined(
      this.get()
    );


  /**
   *    Applies a {@link TFunction1} `mapper` to the stored value of this {@link Either} if this is a {@link Right}.
   * Otherwise, does nothing if this is a {@link Left}.
   *
   * @param mapper
   *    The mapping {@link TFunction1} to apply to a value of a {@link Right} instance.
   *
   * @return {@link Right} applying `mapper` if `this` is {@link Right}, {@link Left} otherwise.
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined` and the current instance is a {@link Right} one
   */
  map = <U>(mapper: TFunction1<R, U>): Either<L, U> => {
    if (this.isRight()) {
      AssertUtil.notNullOrUndefined(
        mapper,
        'mapper must be not null and not undefined'
      );
      return Either.right<L, U>(
        Function1.of(mapper)
          .apply(
            this.get()
          )
      );
    }
    return Either.left<L, U>(
      this.getLeft()
    );
  }


  /**
   *    Applies a {@link TFunction1} `mapper` to the stored value of this {@link Either} if this is a {@link Left}.
   * Otherwise, does nothing if this is a {@link Right}.
   *
   * @param mapper
   *    The mapping {@link TFunction1} to apply to a value of a {@link Left} instance.
   *
   * @return {@link Left} applying `mapper` if `this` is {@link Left}, {@link Right} otherwise.
   *
   * @throws {@link IllegalArgumentError} if `mapper` is `null` or `undefined` and the current instance is a {@link Left} one
   */
  mapLeft = <U>(mapper: TFunction1<L, U>): Either<U, R> => {
    if (!this.isRight()) {
      AssertUtil.notNullOrUndefined(
        mapper,
        'mapper must be not null and not undefined'
      );
      return Either.left<U, R>(
        Function1.of(mapper)
          .apply(
            this.getLeft()
          )
      );
    }
    return Either.right<U, R>(
      this.get()
    );
  }


  /**
   * Returns this {@link Either} if it is {@link Right}, otherwise returns `other`.
   *
   * @param other
   *    An alternative {@link Either}
   *
   * @return current {@link Either} if {@link Right}, `other` otherwise.
   */
  orElse(other: Either<L, R>): Either<L, R>;


  /**
   * Returns this {@link Either} if it is {@link Right}, otherwise returns the result of evaluating `other`.
   *
   * @param other
   *    {@link TFunction0} returning an alternative {@link Either}
   *
   * @return current {@link Either} if {@link Right}, `supplier` result otherwise.
   */
  orElse(other: TFunction0<Either<L, R>>): Either<L, R>;


  orElse(other: TFunction0<Either<L, R>> | Either<L, R>): Either<L, R> {
    if (this.isRight()) {
      return this;
    }
    if (Function0.isFunction(other) || isFFunction0(other)) {
      return Function0.of(other)
        .apply();
    }
    return other;
  }


  /**
   * If this is a {@link Left}, then return the left value in a new {@link Right} instance or vice versa.
   *
   * @return new {@link Either}
   */
  swap = (): Either<R, L> =>
    this.isRight()
      ? Either.left<R, L>(
          this.get()
        )
      : Either.right<R, L>(
          this.getLeft()
        );


  /**
   *    Transforms this {@link Either} into a {@link Optional} instance. If the current {@link Either} is an instance
   * of {@link Right} wraps the stored value into an {@link Optional} object, {@link Optional#empty} otherwise.
   *
   * @return {@link Optional} if is this {@link Either} is a {@link Right} and its value is non-`null` and non-`undefined`,
   *         {@link Optional#empty} if is this {@link Either} is a {@link Right} and its value is `null` or `undefined`,
   *         {@link Optional#empty} if this is an {@link Left}
   */
  toOptional = (): Optional<R> =>
    this.isEmpty()
      ? Optional.empty<R>()
      : Optional.of(
          this.get()
        );


  /**
   *    Transforms this {@link Either} into a {@link Try} instance. If the current {@link Either} is an instance of
   * {@link Right} wraps the stored value into a {@link Success} one, {@link Failure} otherwise.
   *
   * @param mapperLeft
   *   {@link TFunction1} that maps the {@link Left} value to a {@link Error} instance
   *
   * @return {@link Success} if `this` is {@link Right},
   *         {@link Failure} otherwise.
   *
   * @throws {@link IllegalArgumentError} if `mapperLeft` is `null` or `undefined` and the current instance is a {@link Left} one
   */
  toTry = (mapperLeft: TFunction1<L, Error>): Try<R> =>
    this.mapLeft(mapperLeft)
      .fold<Try<R>>(
        Try.failure,
        Try.success
      );

}




/**
 * The right side of the disjoint union, as opposed to the {@link Left} side.
 *
 * @typeParam <L>
 *    Type of the {@link Left} value of an {@link Either}
 * @typeParam <R>
 *    Type of the {@link Right} value of an {@link Either}
 */
export class Right<L, R> extends Either<L, R> {

  private constructor(private readonly value: R) {
    super();
  }


  /**
   * Returns an {@link Right} adding the given `value`.
   *
   * @param value
   *    The value to store
   *
   * @return an {@link Right} with the value present
   */
  static of = <L, R>(value: R): Right<L, R> =>
    new Right<L, R>(value);


  override isRight = (): boolean =>
    true;


  override get = (): R =>
    this.value;


  override getLeft = (): L => {
    throw new ReferenceError("Is not possible to get left value of a 'Right' Either");
  }

}




/**
 * The left side of the disjoint union, as opposed to the {@link Right} side.
 *
 * @typeParam <L>
 *    Type of the {@link Left} value of an {@link Either}
 * @typeParam <R>
 *    Type of the {@link Right} value of an {@link Either}
 */
export class Left<L, R> extends Either<L, R> {

  private constructor(private readonly value: L) {
    super();
  }


  /**
   * Returns an {@link Right} adding the given `value`.
   *
   * @param value
   *    The value to store
   *
   * @return an {@link Right} with the value present
   */
  static of = <L, R>(value: L): Left<L, R> =>
    new Left<L, R>(value);


  override isRight = (): boolean =>
    false;


  override get = (): R => {
    throw new ReferenceError("Is not possible to get right value of a 'Left' Either");
  }


  override getLeft = (): L =>
    this.value;

}
