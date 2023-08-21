import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';
import { Consumer1, TConsumer1 } from '@app-core/types/consumer';
import { Function0, Function1, isFFunction0, PartialFunction, TFunction0, TFunction1 } from '@app-core/types/function';
import { Predicate1, TPredicate1 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 *    A container object which may or may not contain a non-`null` value. If a value is present,
 * {@link Optional#isPresent} returns `true`. If no value is present, the object is considered <i>empty</i>
 * and {@link Optional#isPresent} returns `false`. *
 * <p>
 *    Additional methods that depend on the presence or absence of a contained value are provided, such as
 * {@link Optional#orElse} (returns a default value if no value is present) and {@link Optional#ifPresent} (performs
 * an action if a value is present).
 *
 * @apiNote
 *    {@link Optional} is primarily intended for use as a method return type where there is a clear need to represent
 * "no result," and where using `null` is likely to cause errors. A variable whose type is {@link Optional}
 * should never itself be `null`; it should always point to an {@link Optional} instance.
 *
 * @param <T>
 *    The type of the internal value
 */
export class Optional<T> {

  private constructor(private readonly value: Nullable<T> = null) {}


  /**
   * Returns an empty {@link Optional} instance. No value is present for this one.
   *
   * @return an empty {@link Optional}
   */
  static empty = <T>(): Optional<T> =>
    new Optional<T>(null);


  /**
   * Returns an {@link Optional} describing the given non-`null` value.
   *
   * @param value
   *    The value to describe, which must be non-`null`
   *
   * @return an {@link Optional} with the value present
   *
   * @throws {@link IllegalArgumentError} if `value` is `null` or `undefined`
   */
  static of = <T>(value: T): Optional<T> => {
    AssertUtil.notNullOrUndefined(value);
    return new Optional<T>(value);
  }


  /**
   *    Returns an {@link Optional} describing the given value, if non-`null` and
   * non-`undefined`, otherwise returns an empty {@link Optional}.
   *
   * @param value
   *    The possibly-`null` or possibly-`undefined` value to describe
   *
   * @return an {@link Optional} with a present value if the specified value
   *         is non-`null`, otherwise an empty {@link Optional}
   */
  static ofNullable = <T>(value?: Nullable<T>): Optional<T> =>
    ObjectUtil.isNullOrUndefined(value)
      ? Optional.empty<T>()
      : Optional.of(value);


  /**
   *    If the {@link Optional} is not empty, and it is defined for the given {@link PartialFunction}'s domain,
   * returns an {@link Optional} applying {@link PartialFunction#apply} to the {@link Optional}'s value,
   * {@link Optional#empty} otherwise.
   *
   * @param partialFunction
   *    {@link PartialFunction} to apply to {@link Optional}'s value, if present
   *
   * @return an {@link Optional} describing the result of applying a {@link PartialFunction#apply} to the
   *         {@link Optional}'s value if present, and it is defined for the given {@link PartialFunction}'s domain,
   *         otherwise an empty {@link Optional}
   */
  collect = <U>(partialFunction: PartialFunction<T, U>): Optional<U> =>
    this.isPresent() &&
      partialFunction.isDefinedAt(this.value!)
        ? Optional.ofNullable(
            partialFunction.apply(this.value!)
          )
        : Optional.empty<U>();


  /**
   * Returns `true` if `other` is equal to this {@link Optional}, `false` otherwise.
   *
   * @apiNote
   *    Due to we cannot know the type of generics in runtime, this function will return
   * `true` when both internal values will be `null` or `undefined`
   *
   * @param other
   *    {@link Optional} to compare
   *
   * @return `true` if the `other` is equal to this {@link Optional},
   *         `false` otherwise.
   */
  equals = (other: Optional<T>): boolean => {
    if (ObjectUtil.isNullOrUndefined(other) ||
       (this.isPresent() !== other.isPresent())) {
      return false;
    }
    return !this.isPresent()
      ? true
      : ObjectUtil.equals(
          this.value!,
          other!.get()
        )
  }


  /**
   *    If the {@link Optional} is not empty, and it matches the given {@link TPredicate1}, returns an
   * {@link Optional} describing the value, {@link Optional#empty} otherwise.
   *
   * @param predicate
   *    The {@link Predicate1} to apply to {@link Optional}'s value, if present
   *
   * @return an {@link Optional} describing the value of this {@link Optional}, if it is present and matches the
   *         given {@link TPredicate1}, {@link Optional#empty} otherwise
   *
   * @throws {@link IllegalArgumentError} if `this` is not empty but `predicate` is `null` or `undefined`
   */
  filter = (predicate: TPredicate1<T>): Optional<T> =>
    this.isPresent() && Predicate1.of(predicate).apply(this.value!)
      ? Optional.of<T>(this.value!)
      : Optional.empty<T>();


  /**
   *    If the {@link Optional} is not empty, returns the result of applying the given {@link Optional}-bearing
   * mapping {@link TFunction1} to the value, otherwise returns an empty {@link Optional}.
   * <p>
   *    This method is similar to {@link Optional#map}, but the mapping {@link TFunction1} is one whose result
   * is already an {@link Optional}, and if invoked, {@link Optional#flatMap} does not wrap it within an additional
   * {@link Optional}.
   *
   * @param mapper
   *    The {@link TFunction1} to apply to the {@link Optional}'s value, if present
   *
   * @return the result of applying an {@link Optional}-bearing mapping {@link TFunction1} to this {@link Optional}'s
   *         value, if a value is present, otherwise an empty {@link Optional}
   *
   * @throws {@link IllegalArgumentError} if `this` is not empty but `mapper` is `null` or `undefined`
   */
  flatMap = <U>(mapper: TFunction1<T, Optional<U>>): Optional<U> =>
    this.isPresent()
      ? Function1.of(mapper)
          .apply(this.value!)
      : Optional.empty<U>();


  /**
   *    If the {@link Optional} is not empty, returns the result of applying the {@link TFunction1} `ifNonEmpty`.
   * Otherwise, evaluates the {@link TFunction0} `ifEmpty`.
   *
   * @param ifEmpty
   *    {@link TFunction0} to apply if this {@link Optional} is empty
   * @param ifNonEmpty
   *    {@link TFunction1} to apply if this {@link Optional} is not empty
   *
   * @return the result of applying the right function
   *
   * @throws {@link IllegalArgumentError} if `ifEmpty` is `null` or `undefined` and this {@link Optional} is empty
   *                                      or `ifNonEmpty` is `null` or `undefined` and this {@link Optional} is not empty
   */
  fold = <U>(ifEmpty: TFunction0<U>,
             ifNonEmpty: TFunction1<T, U>): U =>
    this.isPresent()
      ? Function1.of(ifNonEmpty)
          .apply(this.value!)
      : Function0.of(ifEmpty)
          .apply();


  /**
   * If the {@link Optional} is not empty, returns the value, {@link IllegalArgumentError} otherwise.
   *
   * @apiNote
   *    The preferred alternative to this method is {@link Optional#getOrElse}.
   *
   * @return the non-`null` value described by this {@link Optional}
   *
   * @throws {@link IllegalArgumentError} if {@link Optional}'s value is `null`
   */
  get = (): T => {
    AssertUtil.notNullOrUndefined(this.value);
    return this.value!;
  }


  /**
   * If the {@link Optional} is not empty, returns the value, `other` otherwise.
   *
   * @param other
   *    The value to be returned if {@link Optional}'s value is `null`
   *
   * @return the {@link Optional}'s value if non-`null`, otherwise `other`
   */
  getOrElse(other: T): T;


  /**
   *    If the {@link Optional} is not empty, returns the value, otherwise returns the result after
   * invoking provided {@link TFunction0}.
   *
   * @param other
   *    {@link TFunction0} that produces a value to be returned
   *
   * @return the {@link Optional}'s value if non-`null`, otherwise the result of `other`
   */
  getOrElse(other: TFunction0<T>): T;


  getOrElse(other: TFunction0<T> | T): T {
    if (this.isPresent()) {
      return this.value!;
    }
    if (Function0.isFunction(other)) {
      return other.apply();
    }
    if (isFFunction0(other)) {
      return Function0.of(other)
        .apply();
    }
    return other;
  }


  /**
   *    If the {@link Optional} is not empty, performs the given {@link TConsumer1} using internal value
   * as input parameter, does nothing otherwise.
   *
   * @param action
   *    {@link TConsumer1} to be invoked, of the curren {@link Optional} is not empty
   */
  ifPresent = (action: TConsumer1<T>): void => {
    if (this.isPresent()) {
      Consumer1.of(action)
        .apply(this.value!);
    }
  }


  /**
   * Returns `true` if the {@link Optional} is not empty, `false` otherwise.
   */
  isPresent = (): boolean =>
    ObjectUtil.nonNullOrUndefined(this.value);


  /**
   *    If the {@link Optional} is not empty, returns an {@link Optional} describing (as if by
   * {@link Optional#ofNullable}) the result of applying the given {@link TFunction1} to the
   * {@link Optional}'s value, otherwise returns an empty {@link Optional}.
   * <p>
   *    If the {@link TFunction1} returns a `null` result then this method returns an empty
   * {@link Optional}.
   *
   * @param mapper
   *    The {@link TFunction1} to apply to the {@link Optional}'s value, if present
   *
   * @return an {@link Optional} describing the result of applying a {@link TFunction1} to the
   *         {@link Optional}'s value if present, otherwise an empty {@link Optional}
   */
  map = <U>(mapper: TFunction1<T, U>): Optional<U> =>
    this.isPresent()
      ? Optional.ofNullable(
          Function1.of(mapper)
            .apply(this.value!)
        )
      : Optional.empty<U>();


  /**
   * If the {@link Optional} is not empty, returns the value, `other` otherwise.
   *
   * @param other
   *    The value to be returned if {@link Optional}'s value is `null`
   *
   * @return the {@link Optional}'s value if non-`null`, otherwise `other`
   */
  orElse = (other: Optional<T>): Optional<T> =>
    this.isPresent()
      ? Optional.of<T>(this.value!)
      : other;


  /**
   * If the {@link Optional} is not empty, returns the value, {@link Error} using provided {@link TFunction0} otherwise.
   *
   * @param errorSupplier
   *    The supplying {@link TFunction0} that produces an error to be thrown
   *
   * @return the {@link Optional}'s value if non-`null`,
   *         otherwise {@link Error} using provided {@link TFunction0}
   */
  orElseThrow = <X extends Error>(errorSupplier: TFunction0<X>): T => {
    if (this.isPresent()) {
      return this.value!;
    }
    throw Function0.of(errorSupplier)
      .apply();
  }

}
