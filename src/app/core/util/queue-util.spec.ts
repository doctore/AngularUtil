import { ObjectUtil, QueueUtil } from '@app-core/util';
import { Comparable, Comparator, FComparator } from '@app-core/type/comparator';
import { Nullable, NullableOrUndefined } from '@app-core/type';
import { AbstractQueue, ImmutablePriorityQueue, MutablePriorityQueue } from '@app-core/type/collection/queue';
import { FPredicate1, Predicate1 } from '@app-core/type/predicate';
import { ImmutableHashSet, MutableHashSet } from '@app-core/type/collection/set';
import { FFunction1, FFunction2, Function1, Function2 } from '@app-core/type/function';
import { IllegalArgumentError } from '@app-core/error';
import { BinaryOperator, FBinaryOperator } from '@app-core/type/function/operator';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/queue-util.spec.ts
 */
describe('QueueUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new QueueUtil()).toThrowError(SyntaxError);
    });

  });



  describe('copy', () => {

    it('when given sourceQueue is null, undefined or empty then empty Queue is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.empty<number>();
      const immutablePriorityQueue = ImmutablePriorityQueue.empty<number>();

      const nullResult = QueueUtil.copy(null);
      const undefinedResult = QueueUtil.copy(undefined);
      const mutablePriorityQueueResult = QueueUtil.copy(mutablePriorityQueue);
      const immutablePriorityQueueResult = QueueUtil.copy(immutablePriorityQueue);

      expect(nullResult).toBeInstanceOf(MutablePriorityQueue);
      expect(nullResult.size).toEqual(0);
      expect(undefinedResult).toBeInstanceOf(MutablePriorityQueue);
      expect(undefinedResult.size).toEqual(0);

      expect(mutablePriorityQueueResult).toEqual(mutablePriorityQueue);
      expect(immutablePriorityQueueResult).toEqual(immutablePriorityQueue);
    });


    it('when given sourceQueue is a non-empty mutable one then a copy is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 1, 6, 2, 3 ]
      );

      const resultPriorityQueue = QueueUtil.copy(mutablePriorityQueue);

      verifyQueues(
        resultPriorityQueue,
        mutablePriorityQueue
      );

      mutablePriorityQueue.clear();

      expect(mutablePriorityQueue.size).toEqual(0);
      expect(resultPriorityQueue).toBeInstanceOf(MutablePriorityQueue);
      expect(resultPriorityQueue.size).toEqual(4);
    });


    it('when given sourceQueue is an non-empty immutable one then a copy is returned', () => {
      let immutablePriorityQueue = ImmutablePriorityQueue.of(
        reverseNumberComparator,
        [ 1, 2, 3, 6 ]
      );

      const resultPriorityQueue = QueueUtil.copy(immutablePriorityQueue);

      verifyQueues(
        resultPriorityQueue,
        immutablePriorityQueue
      );

      immutablePriorityQueue = immutablePriorityQueue.clear();

      expect(immutablePriorityQueue.size).toEqual(0);
      expect(resultPriorityQueue).toBeInstanceOf(ImmutablePriorityQueue);
      expect(resultPriorityQueue.size).toEqual(4);
    });

  });



  describe('count', () => {

    it('when given sourceQueue is null, undefined or empty then 0 is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.empty<number>();
      const immutablePriorityQueue = ImmutablePriorityQueue.empty<number>();

      expect(QueueUtil.count(null, isEvenFPredicate)).toEqual(0);
      expect(QueueUtil.count(undefined, isEvenPredicate)).toEqual(0);

      expect(QueueUtil.count(mutablePriorityQueue, isEvenRaw)).toEqual(0);
      expect(QueueUtil.count(immutablePriorityQueue, isEvenRaw)).toEqual(0);
    });


    it('when given sourceQueue is a non-empty mutable one but filterPredicate is null or undefined then size of sourceQueue is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const mutablePriorityQueue = MutablePriorityQueue.of<User>(
        reverseUserIdFComparator,
        [ u1, u2, u3 ]
      );

      expect(QueueUtil.count(mutablePriorityQueue, null)).toEqual(mutablePriorityQueue.size);
      expect(QueueUtil.count(mutablePriorityQueue, undefined)).toEqual(mutablePriorityQueue.size);
    });


    it('when given sourceQueue is a non-empty immutable one but filterPredicate is null or undefined then size of sourceQueue is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const immutablePriorityQueue = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u1, u2, u3 ]
      );

      expect(QueueUtil.count(immutablePriorityQueue, null)).toEqual(immutablePriorityQueue.size);
      expect(QueueUtil.count(immutablePriorityQueue, undefined)).toEqual(immutablePriorityQueue.size);
    });


    it('when given sourceQueue is a non-empty mutable one and filterPredicate is provided then the number of elements matching filterPredicate is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const mutablePriorityQueue = MutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2, r3 ]
      );

      expect(QueueUtil.count(mutablePriorityQueue, isRoleIdOddFPredicate)).toEqual(2);
    });


    it('when given sourceQueue is an non-empty immutable one and filterPredicate is provided then the number of elements matching filterPredicate is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const immutablePriorityQueue = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2, r3 ]
      );

      expect(QueueUtil.count(immutablePriorityQueue, isRoleIdOddPredicate)).toEqual(2);
    });

  });



  describe('filter', () => {

    it('when given sourceQueue is null, undefined or empty then empty Queue is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.empty<number>();
      const immutablePriorityQueue = ImmutablePriorityQueue.empty<number>();

      const nullResult = QueueUtil.filter(null, isEvenFPredicate);
      const undefinedResult = QueueUtil.filter(undefined, isEvenPredicate);
      const mutablePriorityQueueResult = QueueUtil.filter(mutablePriorityQueue, isEvenRaw);
      const immutablePriorityQueueResult = QueueUtil.filter(immutablePriorityQueue, isEvenRaw);

      expect(nullResult).toBeInstanceOf(MutablePriorityQueue);
      expect(nullResult.size).toEqual(0);
      expect(undefinedResult).toBeInstanceOf(MutablePriorityQueue);
      expect(undefinedResult.size).toEqual(0);

      expect(mutablePriorityQueueResult).toEqual(mutablePriorityQueue);
      expect(immutablePriorityQueueResult).toEqual(immutablePriorityQueue);
    });


    it('when given sourceQueue is a non-empty mutable one but filterPredicate is null or undefined then a copy of sourceQueue is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const mutablePriorityQueue = MutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r3, r2, r1 ]
      );

      verifyQueues(
        QueueUtil.filter(mutablePriorityQueue, null),
        mutablePriorityQueue
      );
    });


    it('when given sourceQueue is a non-empty immutable one but filterPredicate is null or undefined then a copy of sourceQueue is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const immutablePriorityQueue = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2, r3 ]
      );

      verifyQueues(
        QueueUtil.filter(immutablePriorityQueue, null),
        immutablePriorityQueue
      );
    });


    it('when given sourceQueue is a non-empty mutable one and filterPredicate is provided then filtered Queue is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const mutablePriorityQueue = MutablePriorityQueue.of(
        undefined,
        [ u2, u1, u3 ]
      );

      const expectedResultPriorityQueue = MutablePriorityQueue.of(
        undefined,
        [ u1, u3 ]
      );

      const resultPriorityQueue = QueueUtil.filter(mutablePriorityQueue, isUserIdOddFPredicate);

      verifyQueues(
        resultPriorityQueue,
        expectedResultPriorityQueue
      );
      expect(resultPriorityQueue).toBeInstanceOf(MutablePriorityQueue);
    });


    it('when given sourceQueue is an non-empty immutable one and filterPredicate is provided then filtered Queue is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        undefined,
        [ u3, u1, u2 ]
      );

      const expectedResultPriorityQueue = ImmutablePriorityQueue.of(
        undefined,
        [ u1, u3 ]
      );

      const resultPriorityQueue = QueueUtil.filter(immutablePriorityQueue, isUserIdOddPredicate);

      verifyQueues(
        resultPriorityQueue,
        expectedResultPriorityQueue
      );
      expect(resultPriorityQueue).toBeInstanceOf(ImmutablePriorityQueue);
    });

  });



  describe('filterNot', () => {

    it('when given sourceQueue is null, undefined or empty then empty Queue is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.empty<number>();
      const immutablePriorityQueue = ImmutablePriorityQueue.empty<number>();

      const nullResult = QueueUtil.filterNot(null, isEvenFPredicate);
      const undefinedResult = QueueUtil.filterNot(undefined, isEvenPredicate);
      const mutablePriorityQueueResult = QueueUtil.filterNot(mutablePriorityQueue, isEvenRaw);
      const immutablePriorityQueueResult = QueueUtil.filterNot(immutablePriorityQueue, isEvenRaw);

      expect(nullResult).toBeInstanceOf(MutablePriorityQueue);
      expect(nullResult.size).toEqual(0);
      expect(undefinedResult).toBeInstanceOf(MutablePriorityQueue);
      expect(undefinedResult.size).toEqual(0);

      expect(mutablePriorityQueueResult).toEqual(mutablePriorityQueue);
      expect(immutablePriorityQueueResult).toEqual(immutablePriorityQueue);
    });


    it('when given sourceQueue is a non-empty mutable one but filterPredicate is null or undefined then a copy of sourceQueue is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const mutablePriorityQueue = MutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r3, r2, r1 ]
      );

      verifyQueues(
        QueueUtil.filterNot(mutablePriorityQueue, null),
        mutablePriorityQueue
      );
    });


    it('when given sourceQueue is a non-empty immutable one but filterPredicate is null or undefined then a copy of sourceQueue is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const immutablePriorityQueue = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2, r3 ]
      );

      verifyQueues(
        QueueUtil.filterNot(immutablePriorityQueue, null),
        immutablePriorityQueue
      );
    });


    it('when given sourceQueue is a non-empty mutable one and filterPredicate is provided then filtered Queue is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const mutablePriorityQueue = MutablePriorityQueue.of(
        undefined,
        [ u2, u1, u3 ]
      );

      const expectedResultPriorityQueue = MutablePriorityQueue.of(
        undefined,
        [ u2 ]
      );

      const resultPriorityQueue = QueueUtil.filterNot(mutablePriorityQueue, isUserIdOddFPredicate);

      verifyQueues(
        resultPriorityQueue,
        expectedResultPriorityQueue
      );
      expect(resultPriorityQueue).toBeInstanceOf(MutablePriorityQueue);
    });


    it('when given sourceQueue is an non-empty immutable one and filterPredicate is provided then filtered Queue is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        undefined,
        [ u3, u1, u2 ]
      );

      const expectedResultPriorityQueue = ImmutablePriorityQueue.of(
        undefined,
        [ u2 ]
      );

      const resultPriorityQueue = QueueUtil.filterNot(immutablePriorityQueue, isUserIdOddPredicate);

      verifyQueues(
        resultPriorityQueue,
        expectedResultPriorityQueue
      );
      expect(resultPriorityQueue).toBeInstanceOf(ImmutablePriorityQueue);
    });

  });



  describe('foldLeft', () => {

    it('when given sourceQueue is null, undefined or empty then initialValue is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.empty<number>();
      const immutablePriorityQueue = ImmutablePriorityQueue.empty<number>();
      const initialValue = 19;

      const accumulator =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(QueueUtil.foldLeft(null, initialValue, accumulator)).toEqual(initialValue);
      expect(QueueUtil.foldLeft(undefined, initialValue, accumulator)).toEqual(initialValue);

      expect(QueueUtil.foldLeft(mutablePriorityQueue, initialValue, accumulator)).toEqual(initialValue);
      expect(QueueUtil.foldLeft(immutablePriorityQueue, initialValue, accumulator)).toEqual(initialValue);
    });


    it('when given sourceQueue is a non-empty mutable one but when accumulator is null or undefined then initialValue is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 1 ]
      );
      const initialValue = 19;

      expect(QueueUtil.foldLeft(mutablePriorityQueue, initialValue, null)).toEqual(initialValue);
      expect(QueueUtil.foldLeft(mutablePriorityQueue, initialValue, undefined)).toEqual(initialValue);
    });


    it('when given sourceQueue is a non-empty immutable one but when accumulator is null or undefined then initialValue is returned', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 1 ]
      );
      const initialValue = 19;

      expect(QueueUtil.foldLeft(immutablePriorityQueue, initialValue, null)).toEqual(initialValue);
      expect(QueueUtil.foldLeft(immutablePriorityQueue, initialValue, undefined)).toEqual(initialValue);
    });


    it('when given sourceQueue is a non-empty mutable one and accumulator is provided then initialValue applying accumulator is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 2, 4, 3 ]
      );
      const initialValue = 10;

      const accumulator: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(QueueUtil.foldLeft(mutablePriorityQueue, initialValue, accumulator)).toEqual(240);
    });


    it('when given sourceQueue is a non-empty immutable one and accumulator is provided then initialValue applying accumulator is returned', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 2, 4, 3 ]
      );
      const initialValue = 10;

      const accumulator: Function2<number, number, number> =
        Function2.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!);

      expect(QueueUtil.foldLeft(immutablePriorityQueue, initialValue, accumulator)).toEqual(240);
    });

  });



  describe('groupBy', () => {

    it('when given sourceQueue is null, undefined or empty and discriminatorKey and filterPredicate are provided then empty Map is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.empty<number>();
      const immutablePriorityQueue = ImmutablePriorityQueue.empty<number>();

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(QueueUtil.groupBy(null, plus1Raw, isEvenRaw)).toEqual(expectedResult);
      expect(QueueUtil.groupBy(undefined, plus1FFunction, isEvenFPredicate)).toEqual(expectedResult);

      expect(QueueUtil.groupBy(mutablePriorityQueue, plus1FFunction, isEvenFPredicate)).toEqual(expectedResult);
      expect(QueueUtil.groupBy(immutablePriorityQueue, plus1Function, isEvenPredicate)).toEqual(expectedResult);
    });


    it('when given sourceQueue is not empty mutable one but discriminatorKey is null or undefined then an error is thrown', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 2, 4, 3 ]
      );

      // @ts-ignore
      expect(() => QueueUtil.groupBy(mutablePriorityQueue, null, isEvenFPredicate)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => QueueUtil.groupBy(mutablePriorityQueue, undefined, isEvenFPredicate)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceQueue is not empty immutable one but discriminatorKey is null or undefined then an error is thrown', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 2, 4, 3 ]
      );

      // @ts-ignore
      expect(() => QueueUtil.groupBy(immutablePriorityQueue, null, isEvenPredicate)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => QueueUtil.groupBy(immutablePriorityQueue, undefined, isEvenPredicate)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceQueue is a non-empty mutable one and discriminatorKey is provided but filterPredicate is null or undefined then all elements will be grouped using discriminatorKey', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 1, 2, 3, 6, 4 ]
      );

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(2, [ 1 ]);
      expectedResult.set(3, [ 2 ]);
      expectedResult.set(4, [ 3 ]);
      expectedResult.set(7, [ 6 ]);
      expectedResult.set(5, [ 4 ]);

      verifyMaps(
        // @ts-ignore
        QueueUtil.groupBy(mutablePriorityQueue, plus1Raw, null),
        expectedResult
      );
      verifyMaps(
        QueueUtil.groupBy(mutablePriorityQueue, plus1FFunction, undefined),
        expectedResult
      );
    });


    it('when given sourceQueue is a non-empty immutable one and discriminatorKey is provided but filterPredicate is null or undefined then all elements will be grouped using discriminatorKey', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 1, 2, 3, 6, 4 ]
      );

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(2, [ 1 ]);
      expectedResult.set(3, [ 2 ]);
      expectedResult.set(4, [ 3 ]);
      expectedResult.set(7, [ 6 ]);
      expectedResult.set(5, [ 4 ]);

      verifyMaps(
        // @ts-ignore
        QueueUtil.groupBy(immutablePriorityQueue, plus1Raw, null),
        expectedResult
      );
      verifyMaps(
        QueueUtil.groupBy(immutablePriorityQueue, plus1FFunction, undefined),
        expectedResult
      );
    });


    it('when given sourceQueue is a non-empty mutable one and discriminatorKey and filterPredicate are provided then a new filtered and grouped Map is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 1, 2, 3, 6, 4 ]
      );

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(3, [ 2 ]);
      expectedResult.set(7, [ 6 ]);
      expectedResult.set(5, [ 4 ]);

      verifyMaps(
        QueueUtil.groupBy(mutablePriorityQueue, plus1FFunction, isEvenFPredicate),
        expectedResult
      );
    });


    it('when given sourceQueue is a non-empty immutable one and discriminatorKey and filterPredicate are provided then a new filtered and grouped Map is returned', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 1, 2, 3, 6, 4 ]
      );

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(3, [ 2 ]);
      expectedResult.set(7, [ 6 ]);
      expectedResult.set(5, [ 4 ]);

      verifyMaps(
        QueueUtil.groupBy(immutablePriorityQueue, plus1Function, isEvenPredicate),
        expectedResult
      );
    });

  });



  describe('groupByMultiKey', () => {

    it('when given sourceQueue is null, undefined or empty and discriminatorKey and filterPredicate are provided then empty Map is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.empty<number>();
      const immutablePriorityQueue = ImmutablePriorityQueue.empty<number>();

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(QueueUtil.groupByMultiKey(null, oddEvenAndCompareWith5Raw, isEvenRaw)).toEqual(expectedResult);
      expect(QueueUtil.groupByMultiKey(undefined, oddEvenAndCompareWith5FFunction, isEvenFPredicate)).toEqual(expectedResult);

      expect(QueueUtil.groupByMultiKey(mutablePriorityQueue, oddEvenAndCompareWith5FFunction, isEvenFPredicate)).toEqual(expectedResult);
      expect(QueueUtil.groupByMultiKey(immutablePriorityQueue, oddEvenAndCompareWith5Raw, isEvenRaw)).toEqual(expectedResult);
    });


    it('when given sourceQueue is not empty mutable one but discriminatorKey is null or undefined then an error is thrown', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 2, 4, 3 ]
      );

      // @ts-ignore
      expect(() => QueueUtil.groupByMultiKey(mutablePriorityQueue, null, isEvenFPredicate)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => QueueUtil.groupByMultiKey(mutablePriorityQueue, undefined, isEvenFPredicate)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceQueue is not empty immutable one but discriminatorKey is null or undefined then an error is thrown', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 2, 4, 3 ]
      );

      // @ts-ignore
      expect(() => QueueUtil.groupByMultiKey(immutablePriorityQueue, null, isEvenPredicate)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => QueueUtil.groupByMultiKey(immutablePriorityQueue, undefined, isEvenPredicate)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceQueue is a non-empty mutable one and discriminatorKey is provided but filterPredicate is null or undefined then all elements will be grouped using discriminatorKey', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 1, 2, 6, 3, 12, 11 ]
      );

      const expectedResult: Map<string, number[]> = new Map<string, number[]>;
      expectedResult.set("even", [ 2, 6, 12 ]);
      expectedResult.set("odd", [ 1, 3, 11 ]);
      expectedResult.set("smaller5", [ 1, 2, 3 ]);
      expectedResult.set("greaterEqual5", [ 6, 11, 12 ]);

      verifyMaps(
        // @ts-ignore
        QueueUtil.groupByMultiKey(mutablePriorityQueue, oddEvenAndCompareWith5Raw, null),
        expectedResult
      );
      verifyMaps(
        QueueUtil.groupByMultiKey(mutablePriorityQueue, oddEvenAndCompareWith5FFunction, undefined),
        expectedResult
      );
    });


    it('when given sourceQueue is a non-empty immutable one and discriminatorKey is provided but filterPredicate is null or undefined then all elements will be grouped using discriminatorKey', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 1, 2, 6, 3, 12, 11 ]
      );

      const expectedResult: Map<string, number[]> = new Map<string, number[]>;
      expectedResult.set("even", [ 2, 6, 12 ]);
      expectedResult.set("odd", [ 1, 3, 11 ]);
      expectedResult.set("smaller5", [ 1, 2, 3 ]);
      expectedResult.set("greaterEqual5", [ 6, 11, 12 ]);

      verifyMaps(
        // @ts-ignore
        QueueUtil.groupByMultiKey(immutablePriorityQueue, oddEvenAndCompareWith5Raw, null),
        expectedResult
      );
      verifyMaps(
        QueueUtil.groupByMultiKey(immutablePriorityQueue, oddEvenAndCompareWith5FFunction, undefined),
        expectedResult
      );
    });


    it('when given sourceQueue is a non-empty mutable one and discriminatorKey and filterPredicate are provided then a new filtered and grouped Map is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 2, 1, 3, 11, 6, 12 ]
      );

      const expectedResult: Map<string, number[]> = new Map<string, number[]>;
      expectedResult.set("even", [ 2, 6, 12 ]);
      expectedResult.set("smaller5", [ 2 ]);
      expectedResult.set("greaterEqual5", [ 6, 12 ]);

      verifyMaps(
        QueueUtil.groupByMultiKey(mutablePriorityQueue, oddEvenAndCompareWith5FFunction, isEvenFPredicate),
        expectedResult
      );
    });


    it('when given sourceQueue is a non-empty immutable one and discriminatorKey and filterPredicate are provided then a new filtered and grouped Map is returned', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 2, 1, 3, 11, 6, 12 ]
      );

      const expectedResult: Map<string, number[]> = new Map<string, number[]>;
      expectedResult.set("even", [ 2, 6, 12 ]);
      expectedResult.set("smaller5", [ 2 ]);
      expectedResult.set("greaterEqual5", [ 6, 12 ]);

      verifyMaps(
        QueueUtil.groupByMultiKey(immutablePriorityQueue, oddEvenAndCompareWith5Raw, isEvenPredicate),
        expectedResult
      );
    });

  });



  describe('isAbstractQueue', () => {

    it('when given input is null or undefined then false will be returned', () => {
      const expectedResult = false;

      expect(QueueUtil.isAbstractQueue()).toEqual(expectedResult);
      expect(QueueUtil.isAbstractQueue(undefined)).toEqual(expectedResult);
      expect(QueueUtil.isAbstractQueue(null)).toEqual(expectedResult);
    });


    it('when given input is not an AbstractQueue then false will be returned', () => {
      const user = new User(1, 'user1');
      const nativeSet = new Set<number>(
        [ 1 ]
      );
      const mutableHashSet = MutableHashSet.of<string>(
        undefined,
        undefined,
        [ 'a', 'b', 'c' ]
      );
      const immutableHashSet = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ new User(1, 'user1') ]
      );

      const expectedResult = false;

      expect(QueueUtil.isAbstractQueue(12)).toEqual(expectedResult);
      expect(QueueUtil.isAbstractQueue("abc")).toEqual(expectedResult);
      expect(QueueUtil.isAbstractQueue({})).toEqual(expectedResult);
      expect(QueueUtil.isAbstractQueue(user)).toEqual(expectedResult);

      expect(QueueUtil.isAbstractQueue(nativeSet)).toEqual(expectedResult);
      expect(QueueUtil.isAbstractQueue(mutableHashSet)).toEqual(expectedResult);
      expect(QueueUtil.isAbstractQueue(immutableHashSet)).toEqual(expectedResult);
    });


    it('when given input is an MutableQueue then true will be returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of<number>(
        reverseNumberComparator,
        [ 1, 3 ]
      );

      const expectedResult = true;

      expect(QueueUtil.isAbstractQueue(mutablePriorityQueue)).toEqual(expectedResult);
    });


    it('when given input is an ImmutableQueue then true will be returned', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of<Role>(
        roleIdComparator
      );

      const expectedResult = true;

      expect(QueueUtil.isAbstractQueue(immutablePriorityQueue)).toEqual(expectedResult);
    });

  });



  describe('isEmpty', () => {

    it('when given queueToVerify is null, undefined or empty then true is returned', () => {
      const expectedResult = true;

      expect(QueueUtil.isEmpty()).toEqual(expectedResult);
      expect(QueueUtil.isEmpty(undefined)).toEqual(expectedResult);
      expect(QueueUtil.isEmpty(null)).toEqual(expectedResult);

      expect(QueueUtil.isEmpty(MutablePriorityQueue.empty<number>())).toEqual(expectedResult);
      expect(QueueUtil.isEmpty(ImmutablePriorityQueue.empty<number>())).toEqual(expectedResult);
    });


    it('when given queueToVerify contains elements then false is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of<string>(
        stringFComparator,
        [ 'a', 'b', 'c' ]
      );
      const immutablePriorityQueue = ImmutablePriorityQueue.of<string>(
        stringFComparator,
        [ 'a', 'b', 'c' ]
      );

      const expectedResult = false;

      expect(QueueUtil.isEmpty(mutablePriorityQueue)).toEqual(expectedResult);
      expect(QueueUtil.isEmpty(immutablePriorityQueue)).toEqual(expectedResult);
    });

  });



  describe('isImmutableQueue', () => {

    it('when given input is null or undefined then false will be returned', () => {
      const expectedResult = false;

      expect(QueueUtil.isImmutableQueue()).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue(undefined)).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue(null)).toEqual(expectedResult);
    });


    it('when given input is not an ImmutableQueue then false will be returned', () => {
      const user = new User(1, 'user1');
      const nativeSet = new Set<number>(
        [ 1 ]
      );
      const mutablePriorityQueue = MutablePriorityQueue.of<string>(
        stringFComparator,
        [ 'a', 'b', 'c' ]
      );
      const mutableHashSet = MutableHashSet.of<string>(
        undefined,
        undefined,
        [ 'a', 'b', 'c' ]
      );
      const immutableHashSet = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ new User(1, 'user1') ]
      );

      const expectedResult = false;

      expect(QueueUtil.isImmutableQueue(12)).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue("abc")).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue({})).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue(user)).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue(nativeSet)).toEqual(expectedResult);

      expect(QueueUtil.isImmutableQueue(mutablePriorityQueue)).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue(mutableHashSet)).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue(immutableHashSet)).toEqual(expectedResult);
    });


    it('when given input is an ImmutableQueue then true will be returned', () => {
      const immutablePriorityQueueOfNumber = ImmutablePriorityQueue.of<number>(
        reverseNumberComparator,
        [ 1, 3 ]
      );
      const immutablePriorityQueueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const immutablePriorityQueueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ new User(1, 'user1') ]
      );

      const expectedResult = true;

      expect(QueueUtil.isImmutableQueue(immutablePriorityQueueOfNumber)).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue(immutablePriorityQueueOfNotComparableObject)).toEqual(expectedResult);
      expect(QueueUtil.isImmutableQueue(immutablePriorityQueueOfComparableObject)).toEqual(expectedResult);
    });

  });



  describe('reduce', () => {

    it('when given sourceQueue is null, undefined or empty then initialValue is returned', () => {
      const mutablePriorityQueue = MutablePriorityQueue.empty<number>();
      const immutablePriorityQueue = ImmutablePriorityQueue.empty<number>();

      const accumulator =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(QueueUtil.reduce(null, accumulator)).toBe(undefined);
      expect(QueueUtil.reduce(undefined, accumulator)).toBe(undefined);

      expect(QueueUtil.reduce(mutablePriorityQueue, accumulator)).toBe(undefined);
      expect(QueueUtil.reduce(immutablePriorityQueue, accumulator)).toBe(undefined);
    });


    it('when given sourceQueue is a non-empty mutable one but accumulator is null or undefined then an error is thrown', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 2, 4, 3 ]
      );

      // @ts-ignore
      expect(() => QueueUtil.reduce(mutablePriorityQueue, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => QueueUtil.reduce(mutablePriorityQueue, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceQueue is a non-empty immutable one but accumulator is null or undefined then an error is thrown', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 2, 4, 3 ]
      );

      // @ts-ignore
      expect(() => QueueUtil.reduce(immutablePriorityQueue, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => QueueUtil.reduce(immutablePriorityQueue, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty mutable one and accumulator is provided then accumulator is applied to contained elements', () => {
      const mutablePriorityQueue = MutablePriorityQueue.of(
        numberFComparator,
        [ 2, 3, 4 ]
      );

      const accumulator: FBinaryOperator<number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(QueueUtil.reduce(mutablePriorityQueue, accumulator)).toEqual(24);
    });


    it('when given sourceSet is a non-empty immutable one and accumulator is provided then accumulator is applied to contained elements', () => {
      const immutablePriorityQueue = ImmutablePriorityQueue.of(
        numberFComparator,
        [ 2, 3, 4 ]
      );

      const accumulator: BinaryOperator<number> =
        BinaryOperator.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!);

      expect(QueueUtil.reduce(immutablePriorityQueue, accumulator)).toEqual(24);
    });

  });


});




// Used only for testing purpose
class User implements Comparable<User> {
  private _id: number;
  private _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  compareTo = (other?: Nullable<User>): number =>
    ObjectUtil.isNullOrUndefined(other)
      ? 1
      : this.id - other.id;

}


interface Role {
  id: number;
  name: string;
}


function verifyArrays(actualArray: unknown[],
                      expectedArray: unknown[]) {
  expect(expectedArray.length).toEqual(actualArray.length);
  if (0 < expectedArray.length) {
    for (let i = 0; i < expectedArray.length; i++) {
      expect(expectedArray[i]).toEqual(actualArray[i]);
    }
  }
}


function verifyMaps(actualMap: Map<unknown, unknown>,
                    expectedMap: Map<unknown, unknown>) {
  expect(actualMap.size).toEqual(expectedMap.size);
  if (0 < expectedMap.size) {
    for (let [key, value] of actualMap!) {
      expect(expectedMap.has(key)).toBe(true);
      expect(expectedMap.get(key)).toEqual(value);
    }
  }
}


function verifyQueues(actualQueue: AbstractQueue<any>,
                      expectedQueue: AbstractQueue<any>) {
  expect(expectedQueue.size).toEqual(actualQueue.size);
  if (0 < expectedQueue.size) {
    const actualQueueToArray = actualQueue.toArray();
    const expectedQueueToArray = expectedQueue.toArray();
    for (let i = 0; i < expectedQueueToArray.length; i++) {
      expect(expectedQueueToArray[i]).toEqual(actualQueueToArray[i]);
    }
  }
}


const isEvenFPredicate: FPredicate1<number> =
  (n: number) =>
    0 == n % 2;

const isEvenPredicate: Predicate1<number> =
  Predicate1.of(
    (n: number) =>
      0 == n % 2
  );

const isEvenRaw =
  (n: number) =>
    0 == n % 2;

const isRoleIdOddFPredicate: FPredicate1<Role> =
  (role: Role) => 1 == role.id % 2;

const isRoleIdOddPredicate: Predicate1<Role> =
  Predicate1.of((role: Role) => 1 == role.id % 2);

const isUserIdOddFPredicate: FPredicate1<User> =
  (user: User) => 1 == user.id % 2;

const isUserIdOddPredicate: Predicate1<User> =
  Predicate1.of((user: User) => 1 == user.id % 2);

const numberFComparator: FComparator<number> =
  (n1: number, n2: number) => n1 - n2;

const oddEvenAndCompareWith5FFunction: FFunction1<number, string[]> =
  (n: number) => {
    const keys: string[] = [];
    if (0 == n % 2) {
      keys.push("even");
    }
    else {
      keys.push("odd");
    }
    if (5 > n) {
      keys.push("smaller5");
    }
    else {
      keys.push("greaterEqual5");
    }
    return keys;
  };

const oddEvenAndCompareWith5Raw = (n: number) => {
  const keys: string[] = [];
  if (0 == n % 2) {
    keys.push("even");
  }
  else {
    keys.push("odd");
  }
  if (5 > n) {
    keys.push("smaller5");
  }
  else {
    keys.push("greaterEqual5");
  }
  return keys;
};

const plus1Raw =
  (n: number) =>
    1 + n;

const plus1FFunction: FFunction1<number, number> =
  (n: number) =>
    1 + n;

const plus1Function: Function1<number, number> =
  Function1.of(
    (n: number) =>
      1 + n
  );

const reverseNumberComparator: Comparator<number> =
  Comparator.of(
    (n1: number, n2: number) =>
      n2 - n1
  );

const reverseUserIdFComparator: FComparator<User> =
  (u1: User, u2: User) => u2.id - u1.id;

const roleIdComparator: Comparator<Role> =
  Comparator.of(
    (r1: Role, r2: Role) =>
      r1.id - r2.id
  );

const stringFComparator: FComparator<string> =
  (s1: string, s2: string) => s1.localeCompare(s2);
