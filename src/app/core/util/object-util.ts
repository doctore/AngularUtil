import { ArrayUtil } from '@app-core/util';
import { Function0, isFFunction0, TFunction0 } from '@app-core/type/function';
import { Optional } from '@app-core/type/functional';
import { CopyPropertiesResult, NullableOrUndefined, OrUndefined } from '@app-core/type';
import { DynamicObjectPredicate, FObjectPredicate, ObjectPredicate, Predicate1 } from '@app-core/type/predicate';
import _ from 'lodash';

/**
 * Helper functions to manage common operations related with class instances.
 */
export class ObjectUtil {

  static PATH_SEPARATOR: string = '.';


  constructor() {
    throw new SyntaxError('ObjectUtil is an utility class');
  }


  /**
   * Returns the first not `null` and not `undefined` value of the provided ones.
   *
   * <pre>
   *    coalesce(                      Result:
   *      null,                         12
   *      undefined,
   *      12,
   *      15
   *    )
   * </pre>
   *
   * @param valuesToVerify
   *   Values to check the first one neither `undefined` nor `null`
   *
   * @return first not `null` and not `undefined` value if exists, `undefined` otherwise
   */
  static coalesce = <T>(...valuesToVerify: NullableOrUndefined<T>[]): OrUndefined<T> => {
    let result;
    if (!ArrayUtil.isEmpty(valuesToVerify)) {
      result = ArrayUtil.filterFirst(
        valuesToVerify,
        Predicate1.of(
          (t: NullableOrUndefined<T>) =>
            this.nonNullOrUndefined(
              t
            )
        )
      );
    }
    return this.isNullOrUndefined(result)
      ? undefined
      : result;
  }


  /**
   *    Returns an {@link Optional} containing not `null` and not `undefined` value of the provided ones,
   * {@link Optional#empty} otherwise.
   *
   * <pre>
   *    coalesce(                      Result:
   *      null,                         Optional(12)
   *      undefined,
   *      12,
   *      15
   *    )
   * </pre>
   *
   * @param valuesToVerify
   *   Values to check the first one neither `undefined` nor `null`
   *
   * @return {@link Optional} containing the first `null` and not `undefined` value if exists,
   *         {@link Optional#empty} otherwise.
   */
  static coalesceOptional = <T>(...valuesToVerify: NullableOrUndefined<T>[]): Optional<T> => {
    let result;
    if (!ArrayUtil.isEmpty(valuesToVerify)) {
      result = ArrayUtil.filterFirst(
        valuesToVerify,
        Predicate1.of(
          (t: NullableOrUndefined<T>) =>
            this.nonNullOrUndefined(
              t
            )
        )
      );
    }
    return Optional.ofNullable<T>(result);
  }


  /**
   *    Compares its two arguments for order. Returns a negative integer, zero, or a positive integer as `a` is less than,
   * equal to, or greater than `b`. That is:
   * <p>
   *    Returned `number` specifies the order of provided parameters `(a, b)` and should verify the formula:
   * <p>
   *      > 0    sort `a` after `b`, e.g. [b, a]      (`b` is less than `a`)
   * <p>
   *      < 0    sort `a` before `b`, e.g. [a, b]     (`b` is greater than `a`)
   * <p>
   *        0    keep original order of `a` and `b`   (`b` is equals to `a`)
   *
   * @apiNote
   *    Comparing {@link Object} objects tries to find if the instance has defined the `compareTo` method, using it
   * if exists. Otherwise, are compared by their String representation.
   *
   * <pre>
   *   class User {
   *     public id: number;
   *     public name: string;
   *
   *     constructor(id: number, name: string) {
   *       this.id = id;
   *       this.name = name;
   *     }
   *
   *     compareTo = (other?: User | null): number =>
   *       ObjectUtil.isNullOrUndefined(other)
   *         ? 1
   *         : this.id - other.id;
   *   }
   *
   *   // Will return 0
   *   ObjectUtil.compare(
   *      new User(10, 'user1'),
   *      new User(10, 'user2')
   *   );
   *
   *  // Will return -1
   *  ObjectUtil.compare(
   *      new User(10, 'user1'),
   *      new User(11, 'user1')
   *   );
   * </pre>
   *
   * @param a
   *    First value to be compared
   * @param b
   *    First value to be compared
   *
   * @return a negative integer, zero, or a positive integer as `a` is less than, equal to, or greater than `b`
   *
   * @throws {TypeError} if `a` does not define a `compareTo` function and there was an error getting the JSON representation
   *         of `a` and/or `b`
   */
  static compare = <T>(a: NullableOrUndefined<T>,
                       b: NullableOrUndefined<T>): number => {
    if (a === b ||
       (this.isNullOrUndefined(a) && (this.isNullOrUndefined(b)))) {
      return 0;
    }
    if (this.isNullOrUndefined(a)) {
      return -1;
    }
    if (this.isNullOrUndefined(b)) {
      return 1;
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    if (typeof a === 'boolean' && typeof b === 'boolean') {
      return Number(a) - Number(b);
    }
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }
    if (ObjectUtil.containsFunction(a, 'compareTo', 1)) {
      // @ts-ignore
      return a.compareTo(
        b
      );
    }
    const jsonOfA = JSON.stringify(
      a
    );
    const jsonOfB = JSON.stringify(
      b
    );
    return jsonOfA.localeCompare(
      jsonOfB
    );
  }


  /**
   *    Verifies if the given `inputToVerify` is an object that contains the function `functionToSearch` with
   * `numberOfParameters` of parameters.
   *
   * @apiNote
   *    Checking the number of parameters, it is important to know that the default ones are not considered by the
   * `length` function (the internal check used by this method).
   *
   * @param inputToVerify
   *    Input to verify if it is an object containing the function `functionToSearch`
   * @param functionToSearch
   *    Function to search in the provided `inputToVerify`
   * @param numberOfParameters
   *    Number of parameters that has to manage the function `functionToSearch`. If `null` or `undefined` then it will
   *    not be verified
   *
   * @return `true` `inputToVerify` is an object that contains the function `functionToSearch` with `numberOfParameters`,
   *         `false` otherwise
   */
  static containsFunction(inputToVerify: unknown,
                          functionToSearch: string,
                          numberOfParameters?: number): boolean {
    return ObjectUtil.nonNullOrUndefined(inputToVerify) &&
      'object' === typeof inputToVerify &&
      // @ts-ignore
      'function' === typeof inputToVerify[functionToSearch] &&
      (ObjectUtil.nonNullOrUndefined(numberOfParameters)
        // @ts-ignore
        ? numberOfParameters === inputToVerify[functionToSearch].length
        : true);
  }


  /**
   * Clones the given `sourceObject` including internal properties if it exists.
   *
   * @apiNote
   *    This method supports cloning arrays, array buffers, booleans, date objects, maps, numbers, Object objects, regexes,
   * sets, strings, symbols, and typed arrays. The own enumerable properties of arguments objects are cloned as plain objects.
   *
   * <pre>
   *    copy(                                          Result:
   *      null                                          null
   *    )
   *    copy(
   *       { user: 'Juan', age: 36, active: true }      { user: 'Juan', age: 36, active: true }
   *    )
   * </pre>
   *
   * @param sourceObject
   *    Instance to copy
   *
   * @return new object cloning the properties and/or values included in `sourceObject`,
   *         `undefined` if `sourceObject` is `null` or `undefined`
   */
  static copy = <T> (sourceObject: NullableOrUndefined<T>): OrUndefined<T> =>
    this.isNullOrUndefined(sourceObject)
      ? undefined
      : _.cloneDeep(
          sourceObject
        );


  /**
   *    Using provided `sourceObject` returns a new object containing the property-value pairs that match with given
   * array of properties `propertiesToCopy`.
   *
   * @apiNote
   *    If the requested property contains methods, they will be returned. However, when the request corresponds directly
   * to a method's path, that method will not be included in the result. This is not a deep clone of the `sourceObject`.
   *
   * <pre>
   *  class User {
   *     public id: number;
   *     private _name: string;
   *
   *     constructor(id: number, name: string) {
   *       this.id = id;
   *       this._name = name;
   *     }
   *
   *     get name(): string {
   *       return this._name;
   *     }
   *     set name(name: string) {
   *       this._name = name;
   *     }
   *
   *     compareTo = (other?: User | null): number =>
   *       ObjectUtil.isNullOrUndefined(other)
   *         ? 1
   *         : this.id - other.id;
   *   }
   *
   *   const userRaw = {
   *     profile: {
   *         name: 'John'
   *     }
   *   };
   *   const user = new User(10, 'user1');
   *
   *   copyProperties(userRaw, 'profile.name');   // { profile: { name: 'John' } }
   *   copyProperties(userRaw, 'profile.id');     // undefined
   *   copyProperties(userRaw, 'toString');       // undefined
   *
   *   copyProperties(user, 'profile.name');      // undefined
   *   copyProperties(user, 'id');                // { id: 10 }
   *   copyProperties(user, 'name');              // {}
   *   copyProperties(user, '_name');             // { _name: 'user1' }
   *   copyProperties(user, 'compareTo');         // undefined
   * </pre>
   *
   * @param sourceObject
   *    Instance with the property values to copy
   * @param propertiesToCopy
   *    Array of the properties to copy of the returned object
   *
   * @return new object containing the property-value pairs that match with `propertiesToCopy`, included in `sourceObject`,
   *         `undefined` if `sourceObject` is `null` or `undefined` and/or `propertiesToCopy` has no elements
   */
  static copyProperties = <T extends object, const P extends readonly string[]>(sourceObject: NullableOrUndefined<T>,
                                                                                propertiesToCopy: NullableOrUndefined<P>): OrUndefined<CopyPropertiesResult<P>> => {
    if (this.isNullOrUndefined(sourceObject) ||
       (this.isNullOrUndefined(propertiesToCopy) || 0 == propertiesToCopy.length)) {
      return undefined;
    }
    const result: Record<string, unknown> = {};
    type Found = {
      key: PropertyKey;
      value: unknown;
    };

    /**
     * Searches for a data property on the in `object` and in its prototype string. Priority:
     *
     * <ol>
     *   <li>Object/child before prototype/parent</li>
     *   <li>Property string before Symbol(description)</li>
     * </ol>
     *
     * Getters/setters and functions are not valid values for a directly requested path.
     *
     * @param object
     *    Source object
     * @param name
     *    Name of the property to search inside `object`
     *
     * @return {@link Found} if `name` is a data property inside `object`,
     *         `undefined` otherwise.
     */
    function findProperty(object: object,
                          name: string): Found | undefined {
      for (let current: object | null = object; current !== null; current = Object.getPrototypeOf(current)) {
        // A string property takes precedence over a Symbol with the same description
        const descriptor = Object.getOwnPropertyDescriptor(
          current,
          name
        );
        if (descriptor) {
          // Getter/setter: they are neither invoked nor looked up in the parent class
          if (!("value" in descriptor)) {
            return undefined;
          }
          return {
            key: name,
            value: descriptor.value
          };
        }
        // Searches Symbols when there is no string property
        for (const symbol of Object.getOwnPropertySymbols(current)) {
          if (symbol.description !== name) {
            continue;
          }
          const symbolDescriptor = Object.getOwnPropertyDescriptor(
            current,
            symbol
          );
          if (!symbolDescriptor) {
            continue;
          }
          // Getter/setter.
          if (!("value" in symbolDescriptor)) {
            return undefined;
          }
          return {
            key: symbol,
            value: symbolDescriptor.value
          };
        }
      }
      return undefined;
    }

    /**
     * Resolve all the path values before updating `resolved`. This ensures that an incomplete route such as:
     *
     * <pre>
     *  "address.notFound"
     * </pre>
     *
     * does not create:
     *
     * <pre>
     *  { address: {} }
     * </pre>
     */
    const resolved: {
      parts: string[];
      keys: PropertyKey[];
      value: unknown;
    }[] = [];

    for (const path of propertiesToCopy) {
      if (!path) {
        continue;
      }
      const parts = path.split(ObjectUtil.PATH_SEPARATOR);

      // Avoid undesired paths
      if (
        parts.some(
          part =>
            !part ||
            part === "__proto__" ||
            part === "prototype" ||
            part === "constructor"
        )
      ) {
        continue;
      }
      let value: unknown = sourceObject;
      const keys: PropertyKey[] = [];
      let valid = true;

      for (const part of parts) {
        if (value === null ||
            (typeof value !== "object" && typeof value !== "function")) {
          valid = false;
          break;
        }
        const found = findProperty(
          value,
          part
        );
        if (!found) {
          valid = false;
          break;
        }
        keys.push(found.key);
        value = found.value;
      }
      /**
       *    If the requested property contains methods, they will be returned. However, when the request corresponds directly
       * to a method's path, that method will not be included in the result.
       */
      if (valid && typeof value !== "function") {
        resolved.push({
          parts,
          keys,
          value
        });
      }
    }
    /**
     * The most specific paths win. For example:
     *
     * <pre>
     *   ["address", "address.city"]
     * </pre>
     *
     * will create:
     *
     * <pre>
     *   { address: { city: ... } }
     * </pre>
     */
    const selected = resolved.filter(
      (candidate, index, all) =>
        !all.some(
          (other, otherIndex) =>
            index !== otherIndex &&
            other.parts.length > candidate.parts.length &&
            candidate.parts.every(
              (part, i) => part === other.parts[i]
            )
        )
    );
    // The found objects will be copied by reference. Deep cloning is not performed.
    for (const { keys, value } of selected) {
      let target: Record<PropertyKey, unknown> = result;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const existing = target[key];

        if (typeof existing === "object" && existing !== null) {
          target = existing as Record<PropertyKey, unknown>;
        } else {
          const nested: Record<PropertyKey, unknown> = {};
          target[key] = nested;
          target = nested;
        }
      }
      Object.defineProperty(target, keys[keys.length - 1], {
        value,
        enumerable: true,
        writable: true,
        configurable: true
      });
    }
    return result as CopyPropertiesResult<P>;
  }


  /**
   * Returns `true` if `a` is equals to `b`, `false` otherwise.
   *
   * @apiNote
   *    This method supports comparing arrays, array buffers, booleans, date objects, error objects, maps, numbers,
   * {@link Object} objects, regexes, sets, strings, symbols, and typed arrays.
   * <p>
   *    Comparing {@link Object} objects tries to find if the instance has defined the `equals` method, using it
   * if exists. Otherwise, are compared by their own, not inherited, enumerable properties.
   * <p>
   *    Functions and DOM nodes are compared by strict equality, i.e. ===.
   *
   * <pre>
   *   class User {
   *     public id: number;
   *     public name: string;
   *
   *     constructor(id: number, name: string) {
   *       this.id = id;
   *       this.name = name;
   *     }
   *
   *     equals = (other?: User | null): boolean =>
   *       ObjectUtil.isNullOrUndefined(other)
   *         ? false
   *         : this.id === other.id;
   *   }
   *
   *   // Will return true
   *   ObjectUtil.equals(
   *      new User(10, 'user1'),
   *      new User(10, 'user2')
   *   );
   *
   *  // Will return false
   *  ObjectUtil.equals(
   *      new User(10, 'user1'),
   *      new User(11, 'user1')
   *   );
   * </pre>
   *
   * @param a
   *    First value to compare
   * @param b
   *    First value to compare
   *
   * @return `true` if `a` is equals to `b`,
   *         `false` otherwise
   */
  static equals = <T>(a: NullableOrUndefined<T>,
                      b: NullableOrUndefined<T>): boolean => {
    if ((this.isNullOrUndefined(a) && this.nonNullOrUndefined(b)) ||
        (this.nonNullOrUndefined(a) && this.isNullOrUndefined(b))) {
      return false;
    }
    if (ObjectUtil.containsFunction(a, 'equals', 1)) {
      // @ts-ignore
      return a.equals(
        b
      );
    }
    return _.isEqual(
      a,
      b
    );
  }


  static filterObject<T extends object>(sourceObject: NullableOrUndefined<T>,
                                        filterPredicate: NullableOrUndefined<ObjectPredicate<T>>): Partial<T>;

  static filterObject<T extends object>(sourceObject: NullableOrUndefined<T>,
                                        filterPredicate: NullableOrUndefined<DynamicObjectPredicate<T>>): Partial<T>;

  static filterObject<T extends object>(sourceObject: NullableOrUndefined<T>,
                                        filterPredicate: NullableOrUndefined<FObjectPredicate<T>>): Partial<T>;

  /**
   *    Creates a new `object` containing only the properties for which the `filterPredicate` returns `true`. By default,
   * only own enumerable properties are considered.
   *
   * @apiNote
   *    `String` and `symbol` keys are supported. The original object is never modified. The returned object preserves
   * object references in values.
   *
   * <pre>
   *   class User {
   *     public id: number;
   *     private _name: string;
   *
   *     constructor(id: number, name: string) {
   *       this.id = id;
   *       this._name = name;
   *     }
   *
   *     get name(): string {
   *       return this._name;
   *     }
   *     set name(name: string) {
   *       this._name = name;
   *     }
   *
   *     compareTo = (other?: User | null): number =>
   *       ObjectUtil.isNullOrUndefined(other)
   *         ? 1
   *         : this.id - other.id;
   *   }
   *
   *   interface Role {
   *     id: number;
   *     name: string;
   *   }
   *
   *   const userRaw = {
   *     name: 'CJ',
   *     age: 30,
   *     minimumScore: 10,
   *     city: 'Las Palmas',
   *     address: {
   *        street: 'León y Castillo 23'
   *     }
   *   };
   *   const user = new User(1, 'user 1');
   *   const role = { id: 10, name: 'role 10' } as Role;
   *
   *                                                                         Result:
   *   ObjectUtil.filterObject(                                               { name: 'CJ'}
   *     userRaw,
   *     (key, _) => key === "address.notFound" || key === "name"
   *   );
   *   ObjectUtil.filterObject(                                               { age: 30, address { street: 'León y Castillo 23' } }
   *     userRaw,
   *     (key, value) =>
   *       key === "address.street" ||
   *       (typeof value === "number" &&
   *        value > object.minimumScore)
   *   );
   *   ObjectUtil.filterObject(                                               { id: 10 }
   *     role,
   *     (key, value, object) =>
   *       key === "id" ||
   *       typeof value === "number"
   *   );
   *   ObjectUtil.filterObject(                                               { _id: 1 }
   *     user,
   *     (key, value) =>
   *       key === "id" ||
   *       key === "_id"
   *   );
   * </pre>
   *
   * @param sourceObject
   *    Instance with the properties and values to filter. If it is `null` or `undefined` an empty object is returned
   * @param filterPredicate
   *    {@link ObjectPredicate}, {@link DynamicObjectPredicate} or {@link FObjectPredicate} with the conditions to apply
   *    to the content of provided `sourceObject`. If it is `null` or `undefined` a cloned object is returned
   *
   * @return filtered `object` based on provided `sourceObject` and `filterPredicate`
   */
  static filterObject<T extends object>(sourceObject: NullableOrUndefined<T>,
                                        filterPredicate: NullableOrUndefined<ObjectPredicate<T> | DynamicObjectPredicate<T> | FObjectPredicate<T>>): Partial<T> {
    /**
     *    Contains the data properties that match the predicate (they can come from `sourceObject` or
     * from its prototype chain)
     */
    const result: Partial<T> = {};
    if (this.nonNullOrUndefined(sourceObject)) {
      if (this.isNullOrUndefined(filterPredicate)) {
        // @ts-ignore
        return this.copy(
          sourceObject
        );
      }
      /**
       *    Prevents the same property key from being processed more than once. This preserves normal JavaScript
       * shadowing semantics:
       *
       *    If `name` exists on sourceObject, a `name` property found later on its prototype is ignored
       */
      const processedKeys = new Set<PropertyKey>();

      // Start with the object itself and then walk through its prototypes.
      let current = sourceObject;

      while (null != current) {

        // Reflect.ownKeys() returns both string and symbol keys, including enumerable and non-enumerable properties
        for (const key of Reflect.ownKeys(current)) {
          /**
           * If the key has already been found on a more-derived object,
           * the current prototype property is shadowed.
           */
          if (processedKeys.has(key)) {
            continue;
          }
          processedKeys.add(
            key
          );
          // Get the descriptor from the object currently being inspected.
          const descriptor = Object.getOwnPropertyDescriptor(
            current,
            key
          );
          if (!descriptor) {
            continue;
          }
          /**
           * An accessor is a property defined through a getter and/or setter.
           *
           * Example:
           *
           *   get name() {
           *     return this._name;
           *   }
           *
           * Accessors participate in filtering but are NEVER copied to result.
           */
          const isAccessor =
            descriptor.get !== undefined ||
            descriptor.set !== undefined;

          /**
           *    A data property has a `value` field in its descriptor. Do not use `descriptor.value !== undefined`,
           * because `undefined` is a perfectly valid value for a data property.
           */
          const isDataProperty = "value" in descriptor;

          /**
           *    Ignore non-enumerable data properties. Accessors are intentionally allowed to continue through the filter
           * even when they are non-enumerable.
           */
          if (!isAccessor && !descriptor.enumerable) {
            continue;
          }
          /**
           *    Get the value from sourceObject. This intentionally evaluates getters. The value is needed so that the
           * predicate can decide whether the property matches.
           *
           *    Even if this is an accessor, the value obtained here will NOT be copied to result because of the
           * `isDataProperty` check below.
           */
          const value = Reflect.get(
            sourceObject,
            key
          );
          let matches: boolean;

          if (ObjectPredicate.isObjectPredicate<T>(filterPredicate)) {
            matches = filterPredicate.apply(
              key as keyof T,
              value as T[keyof T],
              sourceObject
            );
          } else {
            matches = (filterPredicate as DynamicObjectPredicate<T>)(
              key,
              value as T[keyof T],
              sourceObject
            );
          }
          // The predicate determines whether the property matches.
          if (!matches) {
            continue;
          }
          /**
           *    Only data properties are copied. This is deliberately independent of `current === sourceObject`, so
           * inherited data properties are copied as well.
           *
           *    Accessors are evaluated above and therefore participate in the filtering process, but they stop here
           * and are never copied.
           */
          if (isDataProperty) {
            (result as Record<PropertyKey, T[keyof T]>)[key] = value;
          }
        }
        // Continue with the next prototype in the inheritance chain.
        current = Object.getPrototypeOf(
          current
        );
      }
    }
    return result;
  }


  /**
   *    Returns the given `valueToVerify` if it is neither `undefined` nor `null`,
   * `defaultValue` otherwise.
   *
   * @param valueToVerify
   *    Value to return if it is neither `undefined` nor `null`
   * @param defaultValue
   *    Returned value if `valueToVerify` is `undefined` or `null`
   *
   * @return `valueToVerify` if it is neither `undefined` nor `null`,
   *         `defaultValue` otherwise
   */
  static getOrElse<T>(valueToVerify: NullableOrUndefined<T>,
                      defaultValue: T): T;


  /**
   *    Returns the given `valueToVerify` if it is neither `undefined` nor `null`,
   * the result after invoking `defaultValue` otherwise.
   *
   * <pre>
   *    getOrElse(                               Result:
   *      null,                                   'DEFAULT VALUE'
   *      () => 'DEFAULT VALUE'
   *    )
   * </pre>
   *
   * @param valueToVerify
   *    Value to return if it is neither `undefined` nor `null`
   * @param defaultValue
   *    {@link TFunction0} to invoke if `valueToVerify` is `undefined` or `null`
   *
   * @return `valueToVerify` if it is neither `undefined` nor `null`,
   *         the result after invoking `defaultValue` otherwise
   */
  static getOrElse<T>(valueToVerify: NullableOrUndefined<T>,
                      defaultValue: TFunction0<T>): T;


  static getOrElse<T>(valueToVerify: NullableOrUndefined<T>,
                      defaultValue: TFunction0<T> | T): T {
    if (this.nonNullOrUndefined(valueToVerify)) {
      return valueToVerify;
    }
    if (Function0.isFunction(defaultValue) || isFFunction0(defaultValue)) {
      return Function0.of(defaultValue)
        .apply();
    }
    return defaultValue;
  }


  /**
   * Gets a value from an object `sourceObject` using a dot-separated property `path`.
   *
   * @apiNote
   *    Own and inherited properties are supported. Function values are not returned and are never invoked. Accessors
   *    will be taken into account.
   *
   * <pre>
   *  class User {
   *     public id: number;
   *     private _name: string;
   *
   *     constructor(id: number, name: string) {
   *       this.id = id;
   *       this._name = name;
   *     }
   *
   *     get name(): string {
   *       return this._name;
   *     }
   *     set name(name: string) {
   *       this._name = name;
   *     }
   *
   *     compareTo = (other?: User | null): number =>
   *       ObjectUtil.isNullOrUndefined(other)
   *         ? 1
   *         : this.id - other.id;
   *   }
   *
   *   const userRaw = {
   *     profile: {
   *         name: 'John'
   *     }
   *   };
   *   const user = new User(10, 'user1');
   *
   *   getPropertyValue(userRaw, 'profile.name');   // 'John'
   *   getPropertyValue(userRaw, 'profile.id');     // undefined
   *   getPropertyValue(userRaw, 'toString');       // undefined
   *
   *   getPropertyValue(user, 'profile.name');   // undefined
   *   getPropertyValue(user, 'id');             // 10
   *   getPropertyValue(user, 'name');           // 'user1'
   *   getPropertyValue(user, '_name');          // 'user1'
   *   getPropertyValue(user, 'compareTo');      // undefined
   *   getPropertyValue(user, 'toString');       // undefined
   * </pre>
   *
   * @param sourceObject
   *    The object to traverse
   * @param path
   *    A dot-separated property path, such as `"user.profile.name"`
   *
   * @return the value at the specified `path` in `sourceObject`.
   *         `undefined` if `sourceObject` or `path` are `null` or `undefined`, or the `path` cannot be traversed or
   *         resolves to a function.
   */
  static getPropertyValue(sourceObject: NullableOrUndefined<unknown>,
                          path: NullableOrUndefined<string>): OrUndefined<unknown> {
    if (this.isNullOrUndefined(sourceObject) || this.isNullOrUndefined(path)) {
      return undefined;
    }
    return path.split(ObjectUtil.PATH_SEPARATOR)
      .reduce<unknown>((current, key) => {
        // Stop if there is nothing left to traverse.
        // Functions are allowed here because they can have properties too.
        if (null == current || (typeof current !== 'object' && typeof current !== 'function')) {
          return undefined;
        }
        // Normal property access includes both own and inherited properties.
        const value = (current as Record<string, unknown>)[key];

        // Do not return function values (e.g. methods, toString, constructor). The function is never invoked.
        return typeof value === 'function'
          ? undefined
          : value;

      }, sourceObject);
  }


  /**
   * Returns the key used for hashing related with provided `input`.
   *
   * @apiNote
   *    To return the hashing of `input`, the order of the options to use is:
   *    <ol>
   *      <li>Internal `hash` function of the object if it defines one</li>
   *      <li>A custom hash value based on its JSON representation</li>
   *    </ol>
   *
   * <pre>
   *   class User {
   *     public id: number;
   *     public name: string;
   *
   *     constructor(id: number, name: string) {
   *       this.id = id;
   *       this.name = name;
   *     }
   *
   *     hash = (): number =>
   *       this.id;
   *   }
   *
   *   // Will return 11
   *   ObjectUtil.hash(
   *     new User(11, 'user1')
   *   );
   *
   *   // Will return 34386722
   *   ObjectUtil.hash(
   *     'abc'
   *   );
   * </pre>
   *
   * @param input
   *    Input to get its hash value
   *
   * @return hash value of `input`
   *
   * @throws {TypeError} if `input` does not define a `hash` function and there was an error getting its JSON representation
   */
  static hash = <T>(input: NullableOrUndefined<T>): number => {
    if (ObjectUtil.isNullOrUndefined(input)) {
      return 0;
    }
    if (ObjectUtil.containsFunction(input, 'hash', 0)) {
      // @ts-ignore
      return input.hash();
    }
    // Use the JSON representation of the value
    const jsonOfInput = JSON.stringify(
      input
    );
    let h = 0
    for (let i = 0; i < jsonOfInput.length; i++) {
      h = ((h << 5) - h + jsonOfInput.charCodeAt(i)) | 0;
    }
    return h;
  }


  /**
   * Checks whether a property `path` exists on an `sourceObject`.
   *
   * @apiNote
   *    Both own and inherited properties are considered. No filtering is applied to the values found: functions and
   * properties such as `constructor` and `toString` are considered valid paths. Functions are never invoked. Accessors
   * will be taken into account.
   *
   * <pre>
   *   class User {
   *     public id: number;
   *     private _name: string;
   *
   *     constructor(id: number, name: string) {
   *       this.id = id;
   *       this._name = name;
   *     }
   *
   *     get name(): string {
   *       return this._name;
   *     }
   *     set name(name: string) {
   *       this._name = name;
   *     }
   *
   *     compareTo = (other?: User | null): number =>
   *       ObjectUtil.isNullOrUndefined(other)
   *         ? 1
   *         : this.id - other.id;
   *   }
   *
   *   const userRaw = {
   *     profile: {
   *         name: 'John'
   *     }
   *   };
   *   const user = new User(10, 'user1');
   *
   *   hasPath(userRaw, 'profile.name');   // true
   *   hasPath(userRaw, 'profile.id');     // false
   *   hasPath(userRaw, 'toString');       // true (inherited)
   *
   *   hasPath(user, 'profile.name');   // false
   *   hasPath(user, 'id');             // true
   *   hasPath(user, 'name');           // true
   *   hasPath(user, '_name');          // true
   *   hasPath(user, 'compareTo');      // true
   *   hasPath(user, 'toString');       // true (inherited)
   * </pre>
   *
   * @param sourceObject
   *    The object to traverse
   * @param path
   *    A dot-separated property path, such as `"user.profile.name"`
   *
   * @return `true` if every segment of the `path` exists in `sourceObject`,
   *         otherwise `false` (including if `sourceObject` or `path` are `null` or `undefined`)
   */
  static hasPath(sourceObject: NullableOrUndefined<unknown>,
                 path: NullableOrUndefined<string>): boolean {
    if (this.isNullOrUndefined(sourceObject) || this.isNullOrUndefined(path)) {
      return false;
    }
    let current: unknown = sourceObject;

    for (const key of path.split(ObjectUtil.PATH_SEPARATOR)) {
      // Stop if there is nothing left to traverse.
      if (null == current || (typeof current !== 'object' && typeof current !== 'function')) {
        return false;
      }
      // `in` checks both own and inherited properties.
      // No filtering is applied: functions count as existing properties.
      if (!(key in (current as object))) {
        return false;
      }
      // Move to the next value without invoking functions.
      current = (current as Record<string, unknown>)[key];
    }
    return true;
  }


  /**
   * Verifies if the provided `valueToVerify` is `null` or `undefined`.
   *
   * @param valueToVerify
   *    Value to return if it is `undefined` or `null`
   *
   * @return `true` if the provided `valueToVerify` is `null` or `undefined`,
   *         `false` otherwise.
   */
  static isNullOrUndefined = (valueToVerify: unknown): valueToVerify is null | undefined =>
    null == valueToVerify;


  /**
   * Verifies if the provided `valueToVerify` is `null` or `undefined`.
   *
   * @param valueToVerify
   *    Value to return if it is `undefined` or `null`
   *
   * @return `true` if the provided `valueToVerify` is not `null` and not `undefined`,
   *         `false` otherwise.
   */
  static nonNullOrUndefined = <T>(valueToVerify: NullableOrUndefined<T>): valueToVerify is Exclude<typeof valueToVerify, null | undefined> =>
    !this.isNullOrUndefined(valueToVerify);


  /**
   * Returns a copy of provided `sourceObject` sorting its properties.
   *
   * @apiNote
   *    If `sourceObject` is not an {@link Object} then it will be returned.
   *
   * <pre>
   *    sortProperties(                                 Result:
   *       12                                            12
   *    )
   *    sortProperties(                                 Result:
   *       { b: 1, a: '2', h: { z: 11, a: 'ea' }}        { a: '2', b: 1, h: { a: 'ea', z: 11 }}
   *    )
   * </pre>
   *
   * @param sourceObject
   *    Instance with the properties to sort
   *
   * @return new object containing the same properties but sorted,
   *         `undefined` if `sourceObject` is `null` or `undefined`.
   */
  static sortProperties<T>(sourceObject: NullableOrUndefined<T>): OrUndefined<T> {
    if (this.isNullOrUndefined(sourceObject)) {
      return undefined;
    }
    if ('object' !== typeof sourceObject) {
      return sourceObject;
    }
    return Object.keys(sourceObject!)
      .sort()
      .reduce(
        (accumulator, currentKey) => {
          // @ts-ignore
          accumulator[currentKey] = ObjectUtil.sortProperties(sourceObject![currentKey]);
          return accumulator;
        },
        {} as T
      );
  }

}
