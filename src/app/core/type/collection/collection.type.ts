import { ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/type';

/**
 * Given a value T, returns the key used for hashing.
 */
export type HashFunction<T> = (value: T) => number;



/**
 * Determines whether two values are considered equal.
 */
export type EqualityFunction<T> = (a: T, b: T) => boolean;



/**
 *    Interface that a type can implement to provide its own hash and equality logic. If a hash collection is created
 * without external hash/equals functions, values implementing this interface will use these methods instead.
 *
 * @see MutableHashSet
 * @see ImmutableHashSet
 */
export interface Hashable {

  /**
   * Determines whether this object and provided `other` are considered equal.
   *
   * @param other
   *    Object to compare
   *
   * @return `true` if this object and `other` are equals,
   *         `false otherwise.`
   */
  equals(other: unknown): boolean;


  /**
   * Returns the key used for hashing related with this object.
   *
   * @return hash value of this object
   */
  hash(): number;

}



/**
 * Verifies if the given `input` is potentially an instance of {@link Hashable}.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link Hashable},
 *         `false` otherwise
 */
export function isHashable(input?: Nullable<unknown>): input is Hashable {
  if (ObjectUtil.isNullOrUndefined(input) || 'object' !== typeof input) {
    return false;
  }
  const obj = input as Partial<Hashable>;
  return 'function' === typeof obj.equals &&
    'function' === typeof obj.hash;
}
