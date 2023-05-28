import { AssertUtil } from '@app-core/util';
import { Consumer1, Function0, isFFunction0, Nullable, PObject, TFunction0 } from '@app-core/types';
import { IllegalArgumentError } from '@app-core/errors';
import * as _ from 'lodash';

/**
 *    A container object which may or may not contain a non-{@code null} value. If a value is present,
 * {@link Optional#isPresent} returns {@code true}. If no value is present, the object is considered <i>empty</i>
 * and {@link Optional#isPresent} returns {@code false}.
 *
 * <p>
 *    Additional methods that depend on the presence or absence of a contained value are provided, such as
 * {@link Optional#orElse} (returns a default value if no value is present) and {@link Optional#ifPresent} (performs
 * an action if a value is present).
 *
 * @apiNote
 *    {@link Optional} is primarily intended for use as a method return type where there is a clear need to represent
 * "no result," and where using {@code null} is likely to cause errors. A variable whose type is {@link Optional}
 * should never itself be {@code null}; it should always point to an {@link Optional} instance.
 *
 * @param <T>
 *    The type of the internal value
 */
export class Optional<T> {

  private constructor(private readonly value: Nullable<T> = null) {}


  /**
   * Returns an empty {@link Optional} instance. No value is present for this one.
   */
  static empty = <T>(): Optional<T> =>
    new Optional<T>(null);


  /**
   * Returns an {@link Optional} describing the given non-{@code null} value.
   *
   * @param value
   *    The value to describe, which must be non-{@code null}
   *
   * @return an {@link Optional} with the value present
   *
   * @throws {@link IllegalArgumentError} if value is {@code null} or {@code undefined}
   */
  static of = <T>(value: T): Optional<T> => {
    AssertUtil.notNullOrUndefined(value);
    return new Optional<T>(value);
  }


  /**
   *    Returns an {@link Optional} describing the given value, if non-{@code null}
   * and non-{@code undefined}, otherwise returns an empty {@link Optional}.
   *
   * @param value
   *    The possibly-{@code null} or possibly-{@code undefined} value to describe
   *
   * @return an {@link Optional} with a present value if the specified value
   *         is non-{@code null}, otherwise an empty {@link Optional}
   */
  static ofNullableOrUndefined = <T>(value?: Nullable<T>): Optional<T> =>
    _.isNil(value)
      ? Optional.empty()
      : Optional.of(value);


  /**
   * Returns {@code true} if the argument is equal to the current one, {@code false} otherwise.
   *
   * @apiNote
   *    Due to we cannot know the type of generics in runtime, this function will return
   * {@code true} when both internal values will be {@code null} or {@code undefined}
   *
   * @param other
   *    {@link Optional} to compare
   */
  equals = <U>(other?: Nullable<Optional<U>>): boolean => {
    if (_.isNil(other) ||
        (this.isPresent() !== other.isPresent())) {
      return false;
    }
    return !this.isPresent()
      ? true
      : this.internalEqualResult(other);
  }


  /**
   * If the {@link Optional}'s value is not {@code null}, returns the value, {@link IllegalArgumentError} otherwise.
   *
   * @apiNote
   *    The preferred alternative to this method is {@link Optional#getOrElse}.
   *
   * @return the non-{@code null} value described by this {@link Optional}
   *
   * @throws {@link IllegalArgumentError} if {@link Optional}'s value is {@code null}
   */
  get = (): T => {
    AssertUtil.notNullOrUndefined(this.value);
    return this.value!;
  }


  /**
   * If the {@link Optional}'s value is not {@code null}, returns the value, {@code other} otherwise.
   *
   * @param other
   *    The value to be returned if {@link Optional}'s value is {@code null}
   *
   * @return the {@link Optional}'s value if non-{@code null}, otherwise {@code other}
   */
  getOrElse(other: T): T;


  /**
   *    If the {@link Optional}'s value is not {@code null}, returns the value, otherwise returns the result after
   * invoking provided {@link TFunction0}.
   *
   * @param other
   *    {@link TFunction0} that produces a value to be returned
   *
   * @return the {@link Optional}'s value if non-{@code null}, otherwise the result of {@code other}
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
      return Function0.of(other).apply();
    }
    return other;
  }


  /**
   *    If the {@link Optional}'s value is not {@code null}, performs the given {@link Consumer1} using internal value
   * as input parameter, does nothing otherwise.
   *
   * @param action
   *    {@link Consumer1} to be invoked, of the curren {@link Optional} is not empty
   */
  ifPresent = (action: Consumer1<T>): void => {
    if (this.isPresent()) {
      action.apply(this.value);
    }
  }


  /**
   *    Returns {@code true} if a value is present, that is, neither is {@code null} or {@code undefined},
   * {@code false} otherwise.
   */
  isPresent = (): boolean =>
    !_.isNil(this.value);


  /**
   * If the {@link Optional}'s value is not {@code null}, returns the value, {@code other} otherwise.
   *
   * @param other
   *    The value to be returned if {@link Optional}'s value is {@code null}
   *
   * @return the {@link Optional}'s value if non-{@code null}, otherwise {@code other}
   */
  orElse = (other: Optional<T>): Optional<T> =>
    this.isPresent()
      ? this
      : other;


  /**
   *    Checks if the given {@link Optional} with a non-{@code null} internal value is
   * equal to the current one. If both values have {@code equals} function will use it,
   * otherwise will use '==='.
   *
   * @param other
   *    {@link Optional} with the internal value to compare
   *
   * @return {@code true} if both internal values are equals
   */
  private internalEqualResult<U>(other: Optional<U>): boolean {
    if (this.value instanceof PObject) {
      return this.value.equals(other.get());
    }
    if ('object' === typeof this.value) {

      // @ts-ignore
      return 'function' === typeof this.value!['equals']

        // @ts-ignore
        ? this.value!['equals'](other.get())
        : _.isEqual(
            this.value,
            other.get()
          );
    }
    // @ts-ignore
    return this.value === other.get();
  }

}
