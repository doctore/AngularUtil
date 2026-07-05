import {
  AbstractQueue,
  ImmutablePriorityQueue,
  ImmutableQueue,
  MutablePriorityQueue
} from '@app-core/type/collection/queue';
import { AssertUtil, ObjectUtil } from '@app-core/util';
import { Nullable, NullableOrUndefined } from '@app-core/type';
import { Predicate1, TPredicate1 } from '@app-core/type/predicate';

/**
 * Helper functions to manage {@link AbstractQueue}.
 */
export class QueueUtil {

  constructor() {
    throw new SyntaxError('QueueUtil is an utility class');
  }


  /**
   * Returns a new {@link AbstractQueue} containing the elements of provided `sourceQueue`.
   *
   * @param sourceQueue
   *    {@link AbstractQueue} with the elements to copy. If it is `null` or `undefined` then an empty {@link MutablePriorityQueue} will be returned
   *
   * @return new {@link AbstractQueue} containing all elements included in `sourceQueue`
   */
  static copy = <T>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>): AbstractQueue<T> => {
    if (!sourceQueue) {
      return MutablePriorityQueue.empty<T>();
    }
    return this.cloneQueue(
      sourceQueue
    );
  }


  /**
   * Counts the number of elements in `sourceQueue` which satisfy the `filterPredicate`.
   *
   * <pre>
   *    count(                                   Result:
   *      [1, 2, 3, 6],                           2
   *      (n: number) => 0 == n % 2
   *    )
   * </pre>
   *
   * @param sourceQueue
   *    {@link AbstractQueue} to filter
   * @param filterPredicate
   *   {@link TPredicate1} to filter elements from `sourceQueue`. If it is `null` or `undefined` then the length
   *   of `sourceQueue` will be returned
   *
   * @return the number of elements satisfying the {@link TPredicate1} `filterPredicate`
   */
  static count = <T>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                     filterPredicate: NullableOrUndefined<TPredicate1<T>>): number => {
    if (this.isEmpty(sourceQueue)) {
      return 0;
    }
    if (!filterPredicate) {
      return sourceQueue!.size;
    }
    const finalFilterPredicate = Predicate1.of(
      filterPredicate
    );
    let result = 0;
    for (const current of sourceQueue!) {
      if (finalFilterPredicate.apply(current)) {
        result++;
      }
    }
    return result;
  }






  /**
   * Verifies if the given `input` is classified as {@link AbstractQueue} object, which includes implementations like:
   * <ul>
   *   <li>{@link MutablePriorityQueue}</li>
   *   <li>{@link ImmutablePriorityQueue}</li>
   * </ul>
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link AbstractQueue},
   *         `false` otherwise
   */
  static isAbstractQueue = (input?: any): input is AbstractQueue<any> =>
    input instanceof MutablePriorityQueue ||
    input instanceof ImmutablePriorityQueue;


  /**
   * Verifies if the given `queueToVerify` contains at least one element.
   *
   * @param queueToVerify
   *    {@link AbstractQueue} to verify
   *
   * @return `true` if `queueToVerify` is `undefined`, `null` or empty.
   *         `false` otherwise.
   */
  static isEmpty = <T>(queueToVerify?: Nullable<AbstractQueue<T>>): boolean =>
    !queueToVerify || 0 == queueToVerify.size


  /**
   * Verifies if the given `input` is classified as {@link ImmutableQueue} object, which includes implementations like:
   * <ul>
   *   <li>{@link ImmutablePriorityQueue}</li>
   * </ul>
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link ImmutableQueue},
   *         `false` otherwise
   */
  static isImmutableQueue = (input?: any): input is ImmutableQueue<any> =>
    input instanceof ImmutablePriorityQueue;







  /**
   * Returns a new {@link AbstractQueue} based on the type of provided `input`, adding its stored values.
   *
   * @param input
   *    Source {@link AbstractQueue} used to know the type of the returned instance
   *
   * @return {@link AbstractQueue} whose type is based on the provided `input`, including its stored values
   */
  private static cloneQueue<T>(input?: AbstractQueue<T>): AbstractQueue<T> {
    if (input instanceof ImmutablePriorityQueue) {
      return ImmutablePriorityQueue.of<T>(
        input.getComparator(),
        input
      );
    }
    if (input instanceof MutablePriorityQueue) {
      return MutablePriorityQueue.of<T>(
        input.getComparator(),
        input
      );
    }
    return MutablePriorityQueue.of<T>(
      ObjectUtil.compare,
      input
    );
  }

}
