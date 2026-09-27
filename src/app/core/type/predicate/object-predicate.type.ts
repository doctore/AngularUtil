import { ArrayUtil, AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/type';

/**
 *    Represents a runtime dynamic predicate used to evaluate an object's properties. The predicate is called once
 * for each property being inspected and determines whether that property satisfies the filtering condition.
 *
 * @param key
 *    The property key being evaluated. It can be a string, number, or symbol.
 * @param value
 *    The current value of the property being evaluated.
 * @param object
 *    The original object whose property is being evaluated.
 *
 * @returns `true` when the property satisfies the predicate,
 *          `false` otherwise.
 */
export type DynamicObjectPredicate<T extends object> = (
  key: PropertyKey,
  value: T[keyof T],
  object: T
) => boolean;


/**
 * Union type of {@link FObjectPredicate} and {@link ObjectPredicate}
 */
export type TObjectPredicate<T extends object> = FObjectPredicate<T> | ObjectPredicate<T>;


/**
 * Defines a predicate function for iterating over the properties of an object.
 *
 * @param key
 *    The property key being evaluated. It can be a string, number, or symbol.
 * @param value
 *    The value of the current property.
 * @param object
 *    The original object whose property is being evaluated.
 *
 * @returns `true` when the property satisfies the predicate,
 *          `false` otherwise.
 */
export type FObjectPredicate<T extends object> = <K extends keyof T>(
  key: K,
  value: T[K],
  object: T
) => boolean;


/**
 * Verifies if the given `input` is potentially an instance of {@link FObjectPredicate}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FObjectPredicate}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FObjectPredicate},
 *         `false` otherwise
 */
export function isFObjectPredicate<T extends object>(input?: unknown): input is FObjectPredicate<T> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    3 === input.length;
}



/**
 * Represents a predicate (boolean-valued function) of three arguments used as wrapper of {@link FObjectPredicate}.
 * <p>
 * This is a functional interface whose functional method is {@link ObjectPredicate#apply}.
 *
 * @typeParam <T>
 *   Type of results returned by this {@link ObjectPredicate}
 */
export class ObjectPredicate<T extends object> {

  private constructor(private readonly verifier: FObjectPredicate<T>) {
  }


  /**
   * Checks all given `objectPredicates` to verify if all of them are satisfied.
   *
   * <pre>
   *   const user = {
   *     name: "Juan",
   *     age: 30
   *   };
   *
   *   const isNumericPropertyGreaterThanProvidedValue: ObjectPredicate<typeof user> =
   *     ObjectPredicate.of<typeof user>((key, value, obj) =>
   *       obj[key] &&
   *       typeof obj[key] === "number" &&
   *       obj[key] > value
   *     );
   *
   *   const isNumericPropertyDividendOfProvidedValue: FObjectPredicate<typeof user> =
   *     (key: any, value: any, obj: any) =>
   *       obj[key] &&
   *       typeof obj[key] === "number" &&
   *       0 == obj[key] % value;
   *
   *  ObjectPredicate.allOf([]).apply('age', 20, user);                             // true
   *
   *  ObjectPredicate.allOf(
   *    [isNumericPropertyGreaterThanProvidedValue,
   *     isNumericPropertyDividendOfProvidedValue]).apply('age', 31, user);         // false
   *
   *  ObjectPredicate.allOf(
   *    [isNumericPropertyGreaterThanProvidedValue,
   *     isNumericPropertyDividendOfProvidedValue]).apply('age', 5, user);          // true
   * </pre>
   *
   * @param objectPredicates
   *    Array of {@link TObjectPredicate} to verify
   *
   * @return {@link ObjectPredicate} verifying all provided ones
   */
  static allOf = <T extends object>(objectPredicates?: Nullable<TObjectPredicate<T>[]>): ObjectPredicate<T> => {
    if (ArrayUtil.isEmpty(objectPredicates)) {
      return ObjectPredicate.alwaysTrue();
    }
    return ObjectPredicate.of<T>(
      <K extends keyof T>(key: K,
                          value: T[K],
                          object: T) =>
        ArrayUtil.foldLeft(
          objectPredicates,
          true,
          (previousBoolean, currentRawPred) =>
            previousBoolean &&
            ObjectPredicate.of(currentRawPred!)
              .apply(key, value, object)
        )
    );
  }


  /**
   * Returns a {@link ObjectPredicate} with `false` as result.
   *
   * @return {@link ObjectPredicate}
   */
  static alwaysFalse = <T extends object>(): ObjectPredicate<T> =>
    new ObjectPredicate<T>(
      <K extends keyof T>(key: K,
                          value: T[K],
                          object: T) => false
    );


  /**
   * Returns a {@link ObjectPredicate} with `true` as result.
   *
   * @return {@link ObjectPredicate}
   */
  static alwaysTrue = <T extends object>(): ObjectPredicate<T> =>
    new ObjectPredicate<T>(
      <K extends keyof T>(key: K,
                          value: T[K],
                          object: T) => true
    );



  /**
   * Checks all given `objectPredicates` to verify that at least one is satisfied.
   *
   * <pre>
   *   const user = {
   *     name: "Juan",
   *     age: 30
   *   };
   *
   *   const isNumericPropertyGreaterThanProvidedValue: ObjectPredicate<typeof user> =
   *     ObjectPredicate.of<typeof user>((key, value, obj) =>
   *       obj[key] &&
   *       typeof obj[key] === "number" &&
   *       obj[key] > value
   *     );
   *
   *   const isNumericPropertyDividendOfProvidedValue: FObjectPredicate<typeof user> =
   *     (key: any, value: any, obj: any) =>
   *       obj[key] &&
   *       typeof obj[key] === "number" &&
   *       0 == obj[key] % value;
   *
   *  ObjectPredicate.anyOf([]).apply('age', 20, user);                             // false
   *
   *  ObjectPredicate.anyOf(
   *    [isNumericPropertyGreaterThanProvidedValue,
   *     isNumericPropertyDividendOfProvidedValue]).apply('age', 31, user);         // false
   *
   *  ObjectPredicate.anyOf(
   *    [isNumericPropertyGreaterThanProvidedValue,
   *     isNumericPropertyDividendOfProvidedValue]).apply('age', 10, user);         // true
   * </pre>
   *
   *
   * @param objectPredicates
   *    Array of {@link TObjectPredicate} to verify
   *
   * @return {@link ObjectPredicate} verifying provided ones
   */
  static anyOf = <T extends object>(objectPredicates?: Nullable<TObjectPredicate<T>[]>): ObjectPredicate<T> => {
    if (ArrayUtil.isEmpty(objectPredicates)) {
      return ObjectPredicate.alwaysFalse();
    }
    return ObjectPredicate.of<T>(
      <K extends keyof T>(key: K,
                          value: T[K],
                          object: T) => {
        for (let i = 0; i < objectPredicates!.length; i++) {
          if (ObjectPredicate.of(objectPredicates![i]).apply(key, value, object)) {
            return true;
          }
        }
        return false;
      }
    );
  }


  /**
   * Returns a {@link ObjectPredicate} that verifies if provided parameters are `null` or `undefined`.
   *
   * @return {@link ObjectPredicate} returning `true` if given parameters are `null` or `undefined`, `false` otherwise
   */
  static isNullOrUndefined = <T extends object>(): ObjectPredicate<T> =>
    new ObjectPredicate<T>(
      <K extends keyof T>(key: K,
                          value: T[K],
                          object: T) =>
        ObjectUtil.isNullOrUndefined(key) &&
        ObjectUtil.isNullOrUndefined(value) &&
        ObjectUtil.isNullOrUndefined(object)
    );


  /**
   * Returns a {@link ObjectPredicate} that verifies if provided parameters are not `null` or `undefined`.
   *
   * @return {@link ObjectPredicate} returning `true` if given parameters are not `null` or `undefined`, `false` otherwise
   */
  static nonNullOrUndefined = <T extends object>(): ObjectPredicate<T> =>
    new ObjectPredicate<T>(
      <K extends keyof T>(key: K,
                          value: T[K],
                          object: T) =>
        ObjectUtil.nonNullOrUndefined(key) &&
        ObjectUtil.nonNullOrUndefined(value) &&
        ObjectUtil.nonNullOrUndefined(object)
    );


  /**
   * Verifies if the given `input` is an instance of {@link ObjectPredicate}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link ObjectPredicate},
   *         `false` otherwise
   */
  static isObjectPredicate = <T extends object>(input?: unknown): input is ObjectPredicate<T> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as ObjectPredicate<T>).and &&
    undefined !== (input as ObjectPredicate<T>).apply &&
    undefined !== (input as ObjectPredicate<T>).getVerifier &&
    undefined !== (input as ObjectPredicate<T>).not &&
    undefined !== (input as ObjectPredicate<T>).or &&
    undefined !== (input as ObjectPredicate<T>).xor &&
    isFObjectPredicate((input as ObjectPredicate<T>).getVerifier());


  static of<T extends object>(objectPredicate: FObjectPredicate<T>): ObjectPredicate<T>;
  static of<T extends object>(objectPredicate: TObjectPredicate<T>): ObjectPredicate<T>;

  /**
   * Returns a {@link ObjectPredicate} based on provided {@link TObjectPredicate} parameter.
   *
   * @param objectPredicate
   *    {@link TObjectPredicate} instance to convert to a {@link ObjectPredicate} one
   *
   * @return {@link ObjectPredicate} based on provided {@link TObjectPredicate}
   *
   * @throws {IllegalArgumentError} if `objectPredicate` is `null` or `undefined`
   */
  static of<T extends object>(objectPredicate: TObjectPredicate<T>): ObjectPredicate<T> {
    AssertUtil.notNullOrUndefined(
      objectPredicate,
      'objectPredicate must be not null and not undefined'
    );
    return ObjectPredicate.isObjectPredicate<T>(objectPredicate)
      ? objectPredicate
      : new ObjectPredicate<T>(objectPredicate);
  }


  /**
   * Returns internal `verifier`.
   *
   * @return {@link FObjectPredicate}
   */
  getVerifier = (): FObjectPredicate<T> =>
    this.verifier;


  /**
   *    Returns a composed {@link ObjectPredicate} that represents a short-circuiting logical AND of this {@link ObjectPredicate}
   * and another. When evaluating the composed {@link ObjectPredicate}, if this {@link ObjectPredicate} is `false`, then
   * the other {@link ObjectPredicate} is not evaluated.
   *
   * @apiNote
   *    If `objectPredicate` is `null` or `undefined` then only this {@link ObjectPredicate} will be applied.
   *
   * @param objectPredicate
   *    {@link TObjectPredicate} that will be logically-ANDed with this {@link ObjectPredicate}
   *
   * @return a composed {@link ObjectPredicate} that represents the short-circuiting logical AND of this {@link ObjectPredicate}
   *         and `predicate`
   */
  and = (objectPredicate: TObjectPredicate<T>): ObjectPredicate<T> =>
    ObjectUtil.isNullOrUndefined(objectPredicate)
      ? new ObjectPredicate<T>(
          <K extends keyof T>(key: K,
                              value: T[K],
                              object: T) =>
            this.apply(key, value, object)
        )
      : new ObjectPredicate<T>(
          <K extends keyof T>(key: K,
                              value: T[K],
                              object: T) =>
            this.apply(key, value, object) &&
              ObjectPredicate.of(objectPredicate)
                .apply(key, value, object)
      );


  /**
   * Evaluates this {@link ObjectPredicate} for the given type `T` instances.
   *
   * @param key
   *    The first input argument
   * @param value
   *    The second input argument
   * @param object
   *    The third input argument
   *
   * @return `true` if the input argument matches the predicate,
   *         `false` otherwise
   */
  apply = <K extends keyof T>(key: K,
                              value: T[K],
                              object: T): boolean =>
    this.verifier(key, value, object);


  /**
   * Returns a {@link ObjectPredicate} that represents the logical negation of this {@link ObjectPredicate}.
   *
   * @return a {@link ObjectPredicate} that represents the logical negation of this {@link ObjectPredicate}
   */
  not = (): ObjectPredicate<T> =>
    new ObjectPredicate<T>(
      <K extends keyof T>(key: K,
                          value: T[K],
                          object: T) =>
        !this.apply(key, value, object)
    );


  /**
   *   Returns a composed {@link ObjectPredicate} that represents a short-circuiting logical OR of this {@link ObjectPredicate}
   * and another. When evaluating the composed {@link ObjectPredicate}, if this {@link ObjectPredicate} is `true`, then
   * the other {@link ObjectPredicate} is not evaluated.
   *
   * @apiNote
   *    If `predicate` is `null` or `undefined` then only this {@link Predicate3} will be applied.
   *
   * @param objectPredicate
   *    {@link TObjectPredicate} that will be logically-ORed with this {@link ObjectPredicate}
   *
   * @return a composed {@link ObjectPredicate} that represents the short-circuiting logical OR of this {@link ObjectPredicate}
   *         and `predicate`
   */
  or = (objectPredicate: TObjectPredicate<T>): ObjectPredicate<T> =>
    ObjectUtil.isNullOrUndefined(objectPredicate)
      ? new ObjectPredicate<T>(
          <K extends keyof T>(key: K,
                              value: T[K],
                              object: T) =>
            this.apply(key, value, object)
      )
      : new ObjectPredicate<T>(
          <K extends keyof T>(key: K,
                              value: T[K],
                              object: T) =>
            this.apply(key, value, object) ||
              ObjectPredicate.of(objectPredicate)
                .apply(key, value, object)
      );


  /**
   *   Returns a composed {@link ObjectPredicate} that represents a short-circuiting logical XOR of this {@link ObjectPredicate}
   * and another. When evaluating the composed {@link ObjectPredicate}, if this {@link ObjectPredicate} is `true`, then
   * the other {@link ObjectPredicate} is not evaluated.
   *
   * @apiNote
   *    If `objectPredicate` is `null` or `undefined` then only this {@link ObjectPredicate} will be applied.
   *
   * @param objectPredicate
   *    {@link TObjectPredicate} that will be logically-XORed with this {@link ObjectPredicate}
   *
   * @return a composed {@link ObjectPredicate} that represents the short-circuiting logical XOR of this {@link ObjectPredicate}
   *         and `predicate`
   */
  xor = (objectPredicate: TObjectPredicate<T>): ObjectPredicate<T> => {
    if (ObjectUtil.isNullOrUndefined(objectPredicate)) {
      return new ObjectPredicate<T>(
        <K extends keyof T>(key: K,
                            value: T[K],
                            object: T) =>
          this.apply(key, value, object)
      );
    }
    const givenPredicate = ObjectPredicate.of(objectPredicate);
    return new ObjectPredicate<T>(
      <K extends keyof T>(key: K,
                          value: T[K],
                          object: T) => {
        const currentApply = this.apply(key, value, object);
        const givenApply = givenPredicate.apply(key, value, object);
        return (currentApply || givenApply) &&
          !(currentApply && givenApply);
      });
  };

}
