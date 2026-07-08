import {
  AbstractQueue,
  ImmutablePriorityQueue,
  ImmutableQueue,
  MutablePriorityQueue
} from '@app-core/type/collection/queue';
import { AssertUtil, MapUtil, ObjectUtil } from '@app-core/util';
import { Nullable, NullableOrUndefined, OrUndefined } from '@app-core/type';
import { Predicate1, TPredicate1 } from '@app-core/type/predicate';
import { FFunction2, Function1, Function2, TFunction1, TFunction2 } from '@app-core/type/function';
import { BinaryOperator, FBinaryOperator, TBinaryOperator } from '@app-core/type/function/operator';

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
   *    Returns a new {@link AbstractQueue} using `sourceQueue` as source, adding from the result the elements that verify
   * the given {@link TPredicate1} `filterPredicate`.
   *
   * <pre>
   *    filter(                                                                            Result:
   *      [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}, {id: 3, name: 'user3'}],         [{id: 1, name: 'user1'}, {id: 3, name: 'user3'}]
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *    )
   * </pre>
   *
   * @param sourceQueue
   *    {@link AbstractQueue} to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter. If it is `null` or `undefined` then all elements
   *    of `sourceQueue` will be returned
   *
   * @return empty {@link AbstractQueue} if `sourceQueue` has no elements or no one verifies provided `filterPredicate`,
   *         otherwise a new {@link AbstractQueue} with the elements of `sourceQueue` which verify `filterPredicate`
   */
  static filter = <T>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                      filterPredicate: NullableOrUndefined<TPredicate1<T>>): AbstractQueue<T> => {
    if (!sourceQueue || !filterPredicate) {
      return this.copy(
        sourceQueue
      );
    }
    const finalFilterPredicate = Predicate1.of(
      filterPredicate
    );
    const result = this.createEmptyQueue(
      sourceQueue
    );
    if (this.isImmutableQueue(result)) {
      const elementsToAdd: T[] = [];
      for (const current of sourceQueue) {
        if (finalFilterPredicate.apply(current)) {
          elementsToAdd.push(
            current
          );
        }
      }
      return result.enqueueAll(
        elementsToAdd
      );
    }
    else {
      for (const current of sourceQueue) {
        if (finalFilterPredicate.apply(current)) {
          result.enqueue(
            current
          );
        }
      }
    }
    return result;
  }


  /**
   *    Returns a new {@link AbstractQueue} using `sourceQueue` as source, removing from the result the elements that verify the
   * given {@link TPredicate1} `filterPredicate`.
   *
   * <pre>
   *    filterNot(                                                                         Result:
   *      [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}, {id: 3, name: 'user3'}],         [{id: 2, name: 'user2'}]
   *      (user: NullableOrUndefined<User>) => 1 == user!.id % 2
   *    )
   * </pre>
   *
   * @param sourceQueue
   *    {@link AbstractQueue} to filter
   * @param filterPredicate
   *    {@link TPredicate1} used to find given elements to filter. If it is `null` or `undefined` then all elements
   *    of `sourceQueue` will be returned
   *
   * @return empty {@link AbstractQueue} if `sourceQueue` has no elements,
   *         otherwise a new {@link AbstractQueue} with the elements of `sourceQueue` which do not verify `filterPredicate`
   */
  static filterNot = <T>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                         filterPredicate: NullableOrUndefined<TPredicate1<T>>): AbstractQueue<T> => {
    const finalFilterPredicate = !filterPredicate
      ? null
      : Predicate1.of(filterPredicate).not();

    return this.filter(
      sourceQueue,
      finalFilterPredicate
    );
  }


  /**
   *    Using the given value `initialValue` as initial one, applies the provided {@link TFunction2} to all elements
   * of `sourceQueue`, going left to right.
   *
   * @apiNote
   *    If `sourceQueue` or `accumulator` are `null` or `undefined` then `initialValue` is returned.
   *
   * <pre>
   *    foldLeft(                                          Result:
   *      [5, 7, 9],                                        315
   *      1,
   *      (n1: number, n2: number) => n1 * n2
   *    )
   * </pre>
   *
   * @param sourceQueue
   *    {@link AbstractQueue} with elements to combine
   * @param initialValue
   *    The initial value to start with
   * @param accumulator
   *    A {@link TFunction2} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive elements of `sourceQueue`, going
   *         left to right with the start value `initialValue` on the left.
   */
  static foldLeft<T, R>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                        initialValue: R,
                        accumulator: NullableOrUndefined<TFunction2<R, T, R>>): R;


  static foldLeft<T, R>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                        initialValue: R,
                        accumulator: NullableOrUndefined<FFunction2<R, T, R>>): R;


  static foldLeft<T, R>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                        initialValue: R,
                        accumulator: NullableOrUndefined<TFunction2<R, T, R>>): R {
    if (this.isEmpty(sourceQueue) || !accumulator) {
      return initialValue
    }
    const finalAccumulator = Function2.of(
      accumulator
    );
    let result: R = initialValue;
    for (const current of sourceQueue!) {
      result = finalAccumulator.apply(
        result,
        current
      );
    }
    return result;
  }


  /**
   *    Partitions given `sourceQueue` into a {@link Map}, applying `discriminatorKey` if the current element verifies
   * `filterPredicate`. All values with the same `key` will be added in an array.
   *
   * <pre>
   *    groupBy(                                           Result:
   *      [1, 2, 3, 6],                                     [(2, [1])
   *      (n: number) => 1 + n,                              (4, [3])
   *      (n: number) => 1 == n % 2
   *    )
   * </pre>
   *
   * @param sourceQueue
   *    {@link AbstractQueue} with the elements to filter and group
   * @param discriminatorKey
   *    The discriminator {@link TFunction1} to get the key values of returned {@link Map}
   * @param filterPredicate
   *    {@link TPredicate1} to filter elements of `sourceQueue`. If it is `null` or `undefined` then all elements will be used
   *
   * @return new {@link Map} from applying the given `discriminatorKey` to each element of `sourceQueue` that verifies
   *        `filterPredicate`
   *
   * @throws {IllegalArgumentError} if `discriminatorKey` is `null` or `undefined` with a not empty `sourceQueue`
   */
  static groupBy = <T, K>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                          discriminatorKey: TFunction1<T, K>,
                          filterPredicate?: TPredicate1<T>): Map<K, T[]> => {
    const result: Map<K, T[]> = new Map<K, T[]>();
    if (!this.isEmpty(sourceQueue)) {
      AssertUtil.notNullOrUndefined(
        discriminatorKey,
        'discriminatorKey must be not null and not undefined'
      );
      const finalDiscriminatorKey = Function1.of(
        discriminatorKey
      );
      const finalFilterPredicate = !filterPredicate
        ? Predicate1.alwaysTrue<T>()
        : Predicate1.of(filterPredicate);

      for (const current of sourceQueue!) {
        if (finalFilterPredicate.apply(current)) {
          const discriminatorKeyResult = finalDiscriminatorKey.apply(
            current
          );
          MapUtil.setIfAbsent(
            result,
            discriminatorKeyResult,
            []
          );
          result.get(discriminatorKeyResult)!
            .push(current);
        }
      }
    }
    return result;
  }


  /**
   *    Partitions given `sourceQueue` into a {@link Map}, applying `discriminatorKey` if the current element verifies
   * `filterPredicate`. All values with the same `key` will be added in an array.
   *
   * @apiNote
   *    This method is similar to {@link QueueUtil#groupBy} but `discriminatorKey` returns an array of related key values.
   *
   * <pre>
   *    groupByMultiKey(                                  Result:
   *      [1, 2, 3, 6, 11, 12],                            [('even',  [2, 6])
   *      (n: number) => {                                  ('odd',   [1, 3])
   *        const keys: string[] = [];                      ('smaller5', [1, 2, 3])
   *        if (0 == n % 2) {                               ('greaterEqual5', [6])]
   *          keys.push('even');
   *        } else {
   *          keys.push('odd');
   *        }
   *        if (5 > n) {
   *          keys.push('smaller5');
   *        } else {
   *          keys.push('greaterEqual5');
   *        }
   *        return keys;
   *      },
   *      (n: number) => 10 > n
   *    )
   * </pre>
   *
   * @param sourceQueue
   *    {@link AbstractQueue} with the elements to filter and group
   * @param discriminatorKey
   *    The discriminator {@link TFunction1} to get the key values of returned {@link Map}
   * @param filterPredicate
   *    {@link TPredicate1} to filter elements of `sourceQueue`. If it is `null` or `undefined` then all elements will be used
   *
   * @return new {@link Map} from applying the given `discriminatorKey` to each element of `sourceQueue` that
   *         verifies `filterPredicate`, to generate the keys of the returned one
   *
   * @throws {IllegalArgumentError} if `discriminatorKey` is `null` or `undefined` with a not empty `sourceQueue`
   */
  static groupByMultiKey = <T, K>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                                  discriminatorKey: TFunction1<T, K[]>,
                                  filterPredicate?: TPredicate1<T>): Map<K, T[]> => {
    const result: Map<K, T[]> = new Map<K, T[]>();
    if (!this.isEmpty(sourceQueue)) {
      AssertUtil.notNullOrUndefined(
        discriminatorKey,
        'discriminatorKey must be not null and not undefined'
      );
      const finalDiscriminatorKey = Function1.of(
        discriminatorKey
      );
      const finalFilterPredicate = !filterPredicate
        ? Predicate1.alwaysTrue<T>()
        : Predicate1.of(filterPredicate);

      for (const current of sourceQueue!) {
        if (finalFilterPredicate.apply(current)) {
          const discriminatorKeyResult = ObjectUtil.getOrElse(
            finalDiscriminatorKey.apply(current),
            []
          );
          for (let key of discriminatorKeyResult!) {
            MapUtil.setIfAbsent(
              result,
              key,
              []
            );
            result.get(key)!
              .push(current);
          }
        }
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
   *    Performs a reduction on the elements of `sourceQueue`, using an associative accumulation {@link TBinaryOperator},
   * and returns a value describing the reduced elements, if any. Returns `undefined` otherwise.
   *
   * @apiNote
   *    This method is similar to {@link QueueUtil#foldLeft} but `accumulator` works with the same type that `sourceQueue`
   * and only uses contained elements of provided {@link AbstractQueue}.
   *
   * <pre>
   *    reduce(                                            Result:
   *      [5, 7, 9]                                         315
   *      (n1: number, n2: number) => n1 * n2
   *    )
   * </pre>
   *
   * @param sourceQueue
   *    {@link AbstractQueue} with elements to combine
   * @param accumulator
   *    A {@link TBinaryOperator} which combines elements
   *
   * @return result of inserting `accumulator` between consecutive elements `sourceQueue`, going left (head) to right (tail)
   *
   * @throws {IllegalArgumentError} if `accumulator` is `null` or `undefined` and `sourceQueue` is not empty
   */
  static reduce<T>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                   accumulator: TBinaryOperator<T>): OrUndefined<T>;


  static reduce<T>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                   accumulator: FBinaryOperator<T>): OrUndefined<T>;


  static reduce<T>(sourceQueue: NullableOrUndefined<AbstractQueue<T>>,
                   accumulator: TBinaryOperator<T>): OrUndefined<T> {
    let result: OrUndefined<T>;
    if (!this.isEmpty(sourceQueue)) {
      AssertUtil.notNullOrUndefined(
        accumulator,
        'accumulator must be not null and not undefined'
      );
      const finalAccumulator = BinaryOperator.of(
        accumulator
      );
      let foundFirstElement = false;
      for (const current of sourceQueue!) {
        if (!foundFirstElement) {
          result = current;
        }
        else {
          result = finalAccumulator.apply(
            // @ts-ignore
            result,
            current
          );
        }
        foundFirstElement = true;
      }
    }
    return result;
  }


  /**
   * Returns an empty {@link AbstractQueue} based on the type of provided `input`.
   *
   * @param input
   *    Source {@link AbstractQueue} used to know the type of the returned instance
   *
   * @return {@link AbstractQueue} whose type is based on the provided `input`
   */
  private static createEmptyQueue<T>(input?: AbstractQueue<T>): AbstractQueue<T> {
    if (input instanceof ImmutablePriorityQueue) {
      return ImmutablePriorityQueue.empty<T>(
        input.getComparator()
      );
    }
    if (input instanceof MutablePriorityQueue) {
      return MutablePriorityQueue.empty<T>(
        input.getComparator()
      );
    }
    return MutablePriorityQueue.empty<T>();
  }


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
