import { Nullable, NullableOrUndefined } from '@app-core/type';
import { ObjectUtil } from '@app-core/util';
import { ImmutableHashSet, ImmutableSet, MutableHashSet } from '@app-core/type/collection/set';
import { Predicate1, TPredicate1 } from '@app-core/type/predicate';

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
   *    Returns a new {@link Set} using `sourceSet` as source, adding from the result the elements that verify the
   * given {@link TPredicate1} `filterPredicate`.
   *
   * <pre>
   *    filter(                                                                            Result:
   *      [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}, {id: 3, name: 'user3'}],         [{id: 1, name: 'user1'}, {id: 3, name: 'user3'}]
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *    )
   * </pre>
   *
   * @param sourceSet
   *    {@link Set} to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter. If it is `null` or `undefined` then all elements
   *    of `sourceSet` will be returned
   *
   * @return empty {@link Set} if `sourceSet` has no elements or no one verifies provided `filterPredicate`,
   *         otherwise a new {@link Set} with the elements of `sourceSet` which verify `filterPredicate`
   */
  static filter = <T>(sourceSet: NullableOrUndefined<Set<T>>,
                      filterPredicate: NullableOrUndefined<TPredicate1<T>>): Set<T> => {
    if (!sourceSet || !filterPredicate) {
      return this.copy(
        sourceSet
      );
    }
    const finalFilterPredicate = Predicate1.of(
      filterPredicate
    );
    const result = this.createEmptySet(
      sourceSet
    );
    if (this.isImmutableSet(result)) {
      const elementsToAdd: T[] = [];
      for (const v of sourceSet) {
        if (finalFilterPredicate.apply(v)) {
          elementsToAdd.push(
            v
          );
        }
      }
      return result.addAll(
        elementsToAdd
      );
    }
    else {
      for (const v of sourceSet) {
        if (finalFilterPredicate.apply(v)) {
          result.add(
            v
          );
        }
      }
    }
    return result;
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
   *    Source {@link ReadonlySetLike} used to know the type of the returned instance
   *
   * @return {@link Set} whose type is based on the provided `input`
   */
  private static createEmptySet<T>(input?: ReadonlySetLike<T>): Set<T> {
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
    return new Set<T>();
  }


  /**
   * Returns a new {@link Set} based on the type of provided `input`, adding its stored values.
   *
   * @param input
   *    Source {@link Set} used to know the type of the returned instance
   *
   * @return {@link Set} whose type is based on the provided `input`, including its stored values
   */
  private static cloneSet<T>(input?: Set<T>): Set<T> {
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
    return new Set<T>(
      input
    );
  }

}
