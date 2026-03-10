import { Nullable, NullableOrUndefined } from '@app-core/type';
import { ObjectUtil } from '@app-core/util';
import { ImmutableHashSet, ImmutableSet, MutableHashSet } from '@app-core/type/collection/set';
import { UnsupportedOperationError } from '@app-core/error';

/**
 * Helper functions to manage {@link Set}.
 */
export class SetUtil {

  constructor() {
    throw new SyntaxError('SetUtil is an utility class');
  }


  /**
   * Returns a new {@link Set} containing the elements of provided `sourceSet`.
   *
   * @param sourceSet
   *    {@link Set} with the elements to copy. If it is `null` or `undefined` then an empty {@link Set} will be returned
   *
   * @return new {@link Set} containing all elements included in `sourceSet`
   */
  static copy = <T>(sourceSet: NullableOrUndefined<Set<T>>): Set<T> => {
    if (!sourceSet) {
      return new Set<T>();
    }
    return this.cloneSet(
      sourceSet
    );
  }


  /**
   * Verifies if the given `setToVerify` contains at least one element.
   *
   * @param setToVerify
   *    {@link ReadonlySetLike} to verify
   *
   * @return `true` if `setToVerify` is `undefined`, `null` or empty.
   *         `false` otherwise.
   */
  static isEmpty = (setToVerify?: Nullable<ReadonlySetLike<unknown>>): boolean =>
    !setToVerify || 0 == setToVerify.size


  /**
   * Verifies if the given `input` is classified as {@link ImmutableSet} object (including new ones like: {@link ImmutableHashSet}).
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link ImmutableSet},
   *         `false` otherwise
   */
  static isImmutableSet = (input?: unknown): input is ImmutableSet<unknown> =>
    input instanceof ImmutableHashSet;


  /**
   * Verifies if the given `input` is classified as {@link isReadonlySetLike} object.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link isReadonlySetLike},
   *         `false` otherwise
   */
  static isReadonlySetLike(input?: unknown): input is ReadonlySetLike<unknown> {
    if (ObjectUtil.isNullOrUndefined(input) || 'object' !== typeof input) {
      return false;
    }
    const obj = input as Partial<ReadonlySetLike<unknown>>;
    return 'number' === typeof obj.size &&
      'function' === typeof obj.has &&
      'function' === typeof obj.keys;
  }


  /**
   *    Verifies if the given `input` is classified as {@link Set} object (including new ones like: {@link MutableHashSet}
   * or {@link ImmutableHashSet}).
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Set},
   *         `false` otherwise
   */
  static isSet = (input?: unknown): input is Set<unknown> =>
    input instanceof Set ||
    input instanceof MutableHashSet ||
    input instanceof ImmutableHashSet;


  /**
   * Returns an empty {@link Set} based on the type of provided `input`.
   *
   * @param input
   *    Source {@link Set} used to know the type of the returned instance
   *
   * @return {@link Set} whose type is based on the provided `input`
   *
   * @throws {UnsupportedOperationError} if the given `input` is not a managed {@link Set}
   */
  private static createEmptySet<T>(input?: unknown): Set<T> {
    if (input instanceof Set) {
      return new Set<T>();
    }
    if (input instanceof ImmutableHashSet) {
      return ImmutableHashSet.empty<T>(
        input.getHash(),
        input.getEquals()
      );
    }
    if (input instanceof MutableHashSet) {
      return MutableHashSet.empty<T>(
        input.getHash(),
        input.getEquals()
      );
    }
    throw new UnsupportedOperationError(
      'Provided input does not belong to a managed Set'
    );
  }


  /**
   * Returns a new {@link Set} based on the type of provided `input`, adding its stored values.
   *
   * @param input
   *    Source {@link Set} used to know the type of the returned instance
   *
   * @return {@link Set} whose type is based on the provided `input`, including its stored values
   *
   * @throws {UnsupportedOperationError} if the given `input` is not a managed {@link Set}
   */
  private static cloneSet<T>(input?: unknown): Set<T> {
    if (input instanceof Set) {
      return new Set<T>(
        input
      );
    }
    if (input instanceof ImmutableHashSet) {
      return ImmutableHashSet.of<T>(
        input.getHash(),
        input.getEquals(),
        input
      );
    }
    if (input instanceof MutableHashSet) {
      return MutableHashSet.of<T>(
        input.getHash(),
        input.getEquals(),
        input
      );
    }
    throw new UnsupportedOperationError(
      'Provided input does not belong to a managed Set'
    );
  }

}
