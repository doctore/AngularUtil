import { Nullable } from '@app-core/type';
import { ObjectUtil } from '@app-core/util';
import { Comparable, Comparator, FComparator } from '@app-core/type/comparator';
import { ImmutablePriorityQueue, MutablePriorityQueue } from '@app-core/type/collection/queue';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/collection/queue/immutable-priority-queue.type.spec.ts
 */
describe('ImmutablePriorityQueue', () => {


  describe('clear', () => {

    it('then the new returned Queue is empty', () => {
      const role = { id: 1, name: 'role1' } as Role;
      const user = new User(1, 'user 1');

      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ role ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ user ]
      );

      const newQueueOfNumber = queueOfNumber.clear();
      const newQueueOfNotComparableObject = queueOfNotComparableObject.clear();
      const newQueueOfComparableObject = queueOfComparableObject.clear();

      expect(queueOfNumber.size).toBe(0);
      expect(newQueueOfNumber.size).toBe(0);

      expect(queueOfNotComparableObject.size).toBe(1);
      expect(newQueueOfNotComparableObject.size).toBe(0);

      expect(queueOfComparableObject.size).toBe(1);
      expect(newQueueOfComparableObject.size).toBe(0);
    });

  });



  describe('dequeue', () => {

    it('when the Queue is empty then undefined is returned as first element of the Pair and the same Queue as second one', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        reverseNumberFComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      const queueOfNumberResult = queueOfNumber.dequeue();
      const queueOfNotComparableObjectResult = queueOfNotComparableObject.dequeue();
      const queueOfComparableObjectResult = queueOfComparableObject.dequeue();

      expect(queueOfNumber.size).toBe(0);
      expect(queueOfNumberResult[0]).toBeUndefined();
      expect(queueOfNumberResult[1].size).toBe(0);

      expect(queueOfNotComparableObject.size).toBe(0);
      expect(queueOfNotComparableObjectResult[0]).toBeUndefined();
      expect(queueOfNotComparableObjectResult[1].size).toBe(0);

      expect(queueOfComparableObject.size).toBe(0);
      expect(queueOfComparableObjectResult[0]).toBeUndefined();
      expect(queueOfComparableObjectResult[1].size).toBe(0);
    });


    it('using provided comparator function, when the Queue is not empty then the highest priority element is returned as first element of the Pair and the new Queue as second one', () => {
      const n1 = 19;
      const n2 = 69;
      const n3 = 20;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        reverseNumberFComparator,
        [ n3, n1, n2 ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r2, r1 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        reverseUserIdFComparator,
        [ u1, u2 ]
      );

      const queueOfNumberResult = queueOfNumber.dequeue();
      const queueOfNotComparableObjectResult = queueOfNotComparableObject.dequeue();
      const queueOfComparableObjectResult = queueOfComparableObject.dequeue();

      expect(queueOfNumber.size).toBe(3);
      expect(queueOfNumber.has(n2)).toBe(true);
      expect(queueOfNumberResult[0]).toBe(n2);
      expect(queueOfNumberResult[1].size).toBe(2);
      expect(queueOfNumberResult[1].has(n2)).toBe(false);

      expect(queueOfNotComparableObject.size).toBe(2);
      expect(queueOfNotComparableObject.has(r1)).toBe(true);
      expect(queueOfNotComparableObjectResult[0]).toBe(r1);
      expect(queueOfNotComparableObjectResult[1].size).toBe(1);
      expect(queueOfNotComparableObjectResult[1].has(r1)).toBe(false);

      expect(queueOfComparableObject.size).toBe(2);
      expect(queueOfComparableObject.has(u2)).toBe(true);
      expect(queueOfComparableObjectResult[0]).toBe(u2);
      expect(queueOfComparableObjectResult[1].size).toBe(1);
      expect(queueOfComparableObjectResult[1].has(u2)).toBe(false);
    });


    it('using default comparator function, when the Queue is not empty then the highest priority element is returned as first element of the Pair and the new Queue as second one', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u3, u1, u2 ]
      );

      const queueOfComparableObjectResult = queueOfComparableObject.dequeue();

      expect(queueOfComparableObject.size).toBe(3);
      expect(queueOfComparableObject.has(u1)).toBe(true);
      expect(queueOfComparableObjectResult[0]).toBe(u1);
      expect(queueOfComparableObjectResult[1].size).toBe(2);
      expect(queueOfComparableObjectResult[1].has(u1)).toBe(false);
    });

  });



  describe('dequeueAll', () => {

    it('when the Queue is empty then empty array is returned as first element of the Pair and the same Queue as second one', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        reverseNumberFComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      const queueOfNumberResult = queueOfNumber.dequeueAll();
      const queueOfNotComparableObjectResult = queueOfNotComparableObject.dequeueAll();
      const queueOfComparableObjectResult = queueOfComparableObject.dequeueAll();

      expect(queueOfNumber.size).toBe(0);
      expect(queueOfNumberResult[0].length).toBe(0);
      expect(queueOfNumberResult[1].size).toBe(0);

      expect(queueOfNotComparableObject.size).toBe(0);
      expect(queueOfNotComparableObjectResult[0].length).toBe(0);
      expect(queueOfNotComparableObjectResult[1].size).toBe(0);

      expect(queueOfComparableObject.size).toBe(0);
      expect(queueOfComparableObjectResult[0].length).toBe(0);
      expect(queueOfComparableObjectResult[1].size).toBe(0);
    });


    it('using provided comparator function, when the Queue is not empty then a sorted array is returned as first element of the Pair and an empty Queue as second one', () => {
      const n1 = 19;
      const n2 = 69;
      const n3 = 20;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        reverseNumberFComparator,
        [ n3, n1, n2 ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r2, r1 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        reverseUserIdFComparator,
        [ u1, u2 ]
      );

      const queueOfNumberResult = queueOfNumber.dequeueAll();
      const queueOfNotComparableObjectResult = queueOfNotComparableObject.dequeueAll();
      const queueOfComparableObjectResult = queueOfComparableObject.dequeueAll();

      expect(queueOfNumber.size).toBe(3);
      expect(queueOfNumber.has(n1)).toBe(true);
      expect(queueOfNumber.has(n2)).toBe(true);
      expect(queueOfNumber.has(n3)).toBe(true);

      expect(queueOfNumberResult[0].length).toBe(3);
      verifyArrays(
        queueOfNumberResult[0],
        [ n2, n3, n1 ]
      );
      expect(queueOfNumberResult[1].size).toBe(0);

      expect(queueOfNotComparableObject.size).toBe(2);
      expect(queueOfNotComparableObject.has(r1)).toBe(true);
      expect(queueOfNotComparableObject.has(r2)).toBe(true);

      expect(queueOfNotComparableObjectResult[0].length).toBe(2);
      verifyArrays(
        queueOfNotComparableObjectResult[0],
        [ r1, r2 ]
      );
      expect(queueOfNotComparableObjectResult[1].size).toBe(0);

      expect(queueOfComparableObject.size).toBe(2);
      expect(queueOfComparableObject.has(u1)).toBe(true);
      expect(queueOfComparableObject.has(u2)).toBe(true);

      expect(queueOfComparableObjectResult[0].length).toBe(2);
      verifyArrays(
        queueOfComparableObjectResult[0],
        [ u2, u1 ]
      );
      expect(queueOfComparableObjectResult[1].size).toBe(0);
    });


    it('using default comparator function, when the Queue is not empty then a sorted array is returned as first element of the Pair and an empty Queue as second one', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u3, u1, u2 ]
      );

      const queueOfComparableObjectResult = queueOfComparableObject.dequeueAll();

      expect(queueOfComparableObjectResult[0].length).toBe(3);
      verifyArrays(
        queueOfComparableObjectResult[0],
        [ u1, u2, u3 ]
      );
      expect(queueOfComparableObjectResult[1].size).toBe(0);
    });

  });



  describe('empty', () => {

    it('when no comparator function is provided then empty Queue is returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>();
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>();
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      expect(queueOfNumber).not.toBeNull();
      expect(queueOfNumber).not.toBeUndefined();
      expect(queueOfNumber.size).toBe(0);

      expect(queueOfNotComparableObject).not.toBeNull();
      expect(queueOfNotComparableObject).not.toBeUndefined();
      expect(queueOfNotComparableObject.size).toBe(0);

      expect(queueOfComparableObject).not.toBeNull();
      expect(queueOfComparableObject).not.toBeUndefined();
      expect(queueOfComparableObject.size).toBe(0);
    });


    it('when comparator function is provided then empty Queue is returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        reverseNumberFComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>(
        reverseUserIdFComparator
      );

      expect(queueOfNumber).not.toBeNull();
      expect(queueOfNumber).not.toBeUndefined();
      expect(queueOfNumber.size).toBe(0);

      expect(queueOfNotComparableObject).not.toBeNull();
      expect(queueOfNotComparableObject).not.toBeUndefined();
      expect(queueOfNotComparableObject.size).toBe(0);

      expect(queueOfComparableObject).not.toBeNull();
      expect(queueOfComparableObject).not.toBeUndefined();
      expect(queueOfComparableObject.size).toBe(0);
    });

  });



  describe('enqueue', () => {

    it('using provided comparator function, when a value is added then the Queue stores it', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        reverseNumberFComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>(
        reverseUserIdFComparator
      );

      const n1 = 19;
      const n2 = 69;
      const n3 = 20;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const newQueueOfNumber = queueOfNumber.enqueue(n1).enqueue(n3).enqueue(n2);
      const newQueueOfNotComparableObject = queueOfNotComparableObject.enqueue(r1).enqueue(r2);
      const newQueueOfComparableObject = queueOfComparableObject.enqueue(u1).enqueue(u2);

      expect(queueOfNumber.size).toBe(0);
      expect(newQueueOfNumber.size).toBe(3);
      expect(newQueueOfNumber.has(n1)).toBe(true);
      expect(newQueueOfNumber.has(n2)).toBe(true);
      expect(newQueueOfNumber.has(n3)).toBe(true);

      expect(queueOfNotComparableObject.size).toBe(0);
      expect(newQueueOfNotComparableObject.size).toBe(2);
      expect(newQueueOfNotComparableObject.has(r1)).toBe(true);
      expect(newQueueOfNotComparableObject.has(r2)).toBe(true);

      expect(queueOfComparableObject.size).toBe(0);
      expect(newQueueOfComparableObject.size).toBe(2);
      expect(newQueueOfComparableObject.has(u1)).toBe(true);
      expect(newQueueOfComparableObject.has(u2)).toBe(true);

      verifyArrays(
        newQueueOfNumber.toArray(),
        [ n2, n3, n1 ]
      );
      verifyArrays(
        newQueueOfNotComparableObject.toArray(),
        [ r1, r2 ]
      );
      verifyArrays(
        newQueueOfComparableObject.toArray(),
        [ u2, u1 ]
      );
    });


    it('using default comparator function, when a value is added then the Queue stores it', () => {
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');
      const u3 = new User(10, 'user10');

      const newQueueOfComparableObject = queueOfComparableObject.enqueue(u2).enqueue(u3).enqueue(u1);

      expect(queueOfComparableObject.size).toBe(0);
      expect(newQueueOfComparableObject.size).toBe(3);
      expect(newQueueOfComparableObject.has(u1)).toBe(true);
      expect(newQueueOfComparableObject.has(u2)).toBe(true);
      expect(newQueueOfComparableObject.has(u3)).toBe(true);

      verifyArrays(
        newQueueOfComparableObject.toArray(),
        [ u1, u3, u2 ]
      );
    });

  });



  describe('enqueueAll', () => {

    it('using provided comparator function, when source Queue is empty but values are not defined or empty then false is returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        reverseNumberFComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>(
        reverseUserIdFComparator
      );

      const queueOfNumberResult = queueOfNumber.enqueueAll(queueOfNumber);
      const queueOfNotComparableObjectResult = queueOfNotComparableObject.enqueueAll(null);
      const queueOfComparableObjectResult = queueOfComparableObject.enqueueAll([]);

      expect(queueOfNumberResult.size).toBe(0);
      expect(queueOfNumberResult.isEmpty()).toBe(true);

      expect(queueOfNotComparableObjectResult.size).toBe(0);
      expect(queueOfNotComparableObjectResult.isEmpty()).toBe(true);

      expect(queueOfComparableObjectResult.size).toBe(0);
      expect(queueOfComparableObjectResult.isEmpty()).toBe(true);
    });


    it('using provided comparator function, when values contains elements then true is returned', () => {
      const n1 = 19;
      const n2 = 20;
      const n3 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const r4 = { id: r1.id, name: 'role4' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, u2.name);

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        reverseNumberFComparator,
        [ n1 ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r3 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        reverseUserIdFComparator,
        [ u1 ]
      );
      const setOfNumberToAdd = new Set<number>(
        [ n2, n3 ]
      );
      const queueOfNotComparableToAdd = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r2, r3, r4 ]
      );

      const queueOfNumberResult = queueOfNumber.enqueueAll(setOfNumberToAdd);
      const queueOfNotComparableObjectResult = queueOfNotComparableObject.enqueueAll(queueOfNotComparableToAdd);
      const queueOfComparableObjectResult = queueOfComparableObject.enqueueAll([ u2, u3, u4 ]);

      expect(queueOfNumber.size).toBe(1);
      expect(queueOfNumberResult.size).toBe(3);
      expect(queueOfNumberResult.has(n1)).toBe(true);
      expect(queueOfNumberResult.has(n2)).toBe(true);
      expect(queueOfNumberResult.has(n3)).toBe(true);

      expect(queueOfNotComparableObject.size).toBe(2);
      expect(queueOfNotComparableObjectResult.size).toBe(5);
      expect(queueOfNotComparableObjectResult.has(r1)).toBe(true);
      expect(queueOfNotComparableObjectResult.has(r2)).toBe(true);
      expect(queueOfNotComparableObjectResult.has(r3)).toBe(true);
      expect(queueOfNotComparableObjectResult.has(r4)).toBe(true);

      expect(queueOfComparableObject.size).toBe(1);
      expect(queueOfComparableObjectResult.size).toBe(4);
      expect(queueOfComparableObjectResult.has(u1)).toBe(true);
      expect(queueOfComparableObjectResult.has(u2)).toBe(true);
      expect(queueOfComparableObjectResult.has(u3)).toBe(true);
      expect(queueOfComparableObjectResult.has(u4)).toBe(true);

      verifyArrays(
        queueOfNumberResult.toArray(),
        [ n3, n2, n1 ]
      );
      verifyArrays(
        queueOfNotComparableObjectResult.toArray(),
        [ r4, r1, r2, r3, r3 ]
      );
      verifyArrays(
        queueOfComparableObjectResult.toArray(),
        [ u3, u2, u4, u1 ]
      );
    });


    it('using default comparator function, when source Queue is empty but values are not defined or empty then false is returned', () => {
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      const queueOfComparableObjectResult = queueOfComparableObject.enqueueAll([]);

      expect(queueOfComparableObjectResult.size).toBe(0);
      expect(queueOfComparableObjectResult.isEmpty()).toBe(true);
    });


    it('using default comparator function, when values contains elements then true is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u3, u1 ]
      );
      const queueOfComparableObjectToAdd = MutablePriorityQueue.of<User>(
        reverseUserIdFComparator,
        [ u2, u3, u4 ]
      );

      const setOfHashableObjectResult = queueOfComparableObject.enqueueAll(queueOfComparableObjectToAdd);

      expect(queueOfComparableObject.size).toBe(2);
      expect(setOfHashableObjectResult.size).toBe(5);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
      expect(setOfHashableObjectResult.has(u4)).toBe(true);

      verifyArrays(
        setOfHashableObjectResult.toArray(),
        [ u1, u2, u4, u3, u3 ]
      );
    });

  });



  describe('entries', () => {

    it('when provided Queue is empty then no entries are returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      const queueOfNumberResult = Array.from(
        queueOfNumber.entries()
      );
      const queueOfNotComparableObjectResult = Array.from(
        queueOfNotComparableObject.entries()
      );
      const queueOfComparableObjectResult = Array.from(
        queueOfComparableObject.entries()
      );

      expect(queueOfNumberResult).toHaveLength(0);
      expect(queueOfNotComparableObjectResult).toHaveLength(0);
      expect(queueOfComparableObjectResult).toHaveLength(0);
    });


    it('when provided Queue is not empty then returns correct entries', () => {
      const n1 = 19;
      const n2 = 19;
      const n3 = 31;
      const n4 = 4;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        reverseNumberFComparator,
        [ n2, n3, n4, n1 ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u1, u3, u2 ]
      );

      const queueOfNumberResult = Array.from(
        queueOfNumber.entries()
      );
      const queueOfNotComparableObjectResult = Array.from(
        queueOfNotComparableObject.entries()
      );
      const queueOfComparableObjectResult = Array.from(
        queueOfComparableObject.entries()
      );

      expect(queueOfNumberResult).toHaveLength(4);
      expect(queueOfNumberResult).toContainEqual([ 0, n3 ]);
      expect(queueOfNumberResult).toContainEqual([ 1, n1 ]);
      expect(queueOfNumberResult).toContainEqual([ 2, n2 ]);
      expect(queueOfNumberResult).toContainEqual([ 3, n4 ]);

      expect(queueOfNotComparableObjectResult).toHaveLength(2);
      expect(queueOfNotComparableObjectResult).toContainEqual([ 0, r1 ]);
      expect(queueOfNotComparableObjectResult).toContainEqual([ 1, r2 ]);

      expect(queueOfComparableObjectResult).toHaveLength(3);
      expect(queueOfComparableObjectResult).toContainEqual([ 0, u1 ]);
      expect(queueOfComparableObjectResult).toContainEqual([ 1, u2 ]);
      expect(queueOfComparableObjectResult).toContainEqual([ 2, u3 ]);
    });

  });



  describe('forEach', () => {

    it('when provided Queue is empty then the function is not invoked', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();
      const callback = vi.fn();

      queueOfNumber.forEach(
        callback
      );
      queueOfNotComparableObject.forEach(
        callback
      );
      queueOfComparableObject.forEach(
        callback
      );

      expect(callback).not.toHaveBeenCalled();
    });


    it('when provided Queue is not empty then the function is applied to every element', () => {
      const n1 = 19;
      const n2 = 20;
      const n3 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        reverseNumberFComparator,
        [ n3, n1, n2 ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r3, r2 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u3, u2, u1 ]
      );

      const collectedNumbers: number[] = [];
      const collectedRoleNames: string[] = [];
      const collectedUserNames: string[] = [];

      queueOfNumber.forEach(
        n =>
          collectedNumbers.push(
            plus2(n)
          )
      );
      queueOfNotComparableObject.forEach(
        r =>
          collectedRoleNames.push(
            getName(r)
          )
      );
      queueOfComparableObject.forEach(
        u =>
          collectedUserNames.push(
            getName(u)
          )
      );

      expect(collectedNumbers).toHaveLength(3);
      expect(collectedNumbers[0]).toBe(n3 * 2);
      expect(collectedNumbers[1]).toBe(n2 * 2);
      expect(collectedNumbers[2]).toBe(n1 * 2);

      expect(collectedRoleNames).toHaveLength(3);
      expect(collectedRoleNames[0]).toBe(r1.name);
      expect(collectedRoleNames[1]).toBe(r2.name);
      expect(collectedRoleNames[2]).toBe(r3.name);

      expect(collectedUserNames).toHaveLength(3);
      expect(collectedUserNames[0]).toBe(u1.name);
      expect(collectedUserNames[1]).toBe(u2.name);
      expect(collectedUserNames[2]).toBe(u3.name);
    });

  });



  describe('getComparator', () => {

    it('then a FComparator is returned', () => {
      const role = { id: 1, name: 'role1' } as Role;

      const queueWithoutProvidedComparator = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueWithProvidedComparator = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ role ]
      );

      expect(queueWithoutProvidedComparator.getComparator()).not.toBeUndefined();
      expectTypeOf(queueWithoutProvidedComparator.getComparator()).toEqualTypeOf<Comparator<number>>();

      expect(queueWithProvidedComparator.getComparator()).not.toBeUndefined();
      expectTypeOf(queueWithProvidedComparator.getComparator()).toEqualTypeOf<Comparator<Role>>();
    });

  });



  describe('has', () => {

    it('when provided Queue is empty then no entry is found', () => {
      const n = 19;
      const role = { id: 1, name: 'role1' } as Role;
      const user = new User(1, 'user 1');

      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      expect(queueOfNumber.has(n)).toBe(false);
      expect(queueOfNotComparableObject.has(role)).toBe(false);
      expect(queueOfComparableObject.has(user)).toBe(false);
    });


    it('using provided comparator function, when the value to search does not exist then false is returned', () => {
      const n1 = 19;
      const n2 = 20;
      const n3 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        numberComparator,
        [ n1 ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        reverseUserIdFComparator,
        [ u1 ]
      );

      expect(queueOfNumber.has(n2)).toBe(false);
      expect(queueOfNumber.has(n3)).toBe(false);

      expect(queueOfNotComparableObject.has(r2)).toBe(false);
      expect(queueOfNotComparableObject.has(r3)).toBe(false);

      expect(queueOfComparableObject.has(u2)).toBe(false);
      expect(queueOfComparableObject.has(u3)).toBe(false);
    });


    it('using provided comparator function, when the value to search is found then true is returned', () => {
      const n1 = 19;
      const n2 = 20;
      const n3 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const r4 = { id: r1.id, name: 'role4' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, u2.name);

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        numberComparator,
        [ n1, n2, n3 ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2, r3 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        reverseUserIdFComparator,
        [ u1, u2, u3 ]
      );

      expect(queueOfNumber.size).toBe(3);
      expect(queueOfNumber.has(n1)).toBe(true);
      expect(queueOfNumber.has(n2)).toBe(true);
      expect(queueOfNumber.has(n3)).toBe(true);

      expect(queueOfNotComparableObject.size).toBe(3);
      expect(queueOfNotComparableObject.has(r1)).toBe(true);
      expect(queueOfNotComparableObject.has(r2)).toBe(true);
      expect(queueOfNotComparableObject.has(r3)).toBe(true);
      expect(queueOfNotComparableObject.has(r4)).toBe(true);

      expect(queueOfComparableObject.size).toBe(3);
      expect(queueOfComparableObject.has(u1)).toBe(true);
      expect(queueOfComparableObject.has(u2)).toBe(true);
      expect(queueOfComparableObject.has(u3)).toBe(true);
      expect(queueOfComparableObject.has(u4)).toBe(true);
    });


    it('using default comparator function, when the value to search does not exist then false is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u1 ]
      );

      expect(queueOfComparableObject.has(u2)).toBe(false);
      expect(queueOfComparableObject.has(u3)).toBe(false);
    });


    it('using default comparator function, when the value to search is found then true is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u1, u2, u3 ]
      );

      expect(queueOfComparableObject.size).toBe(3);
      expect(queueOfComparableObject.has(u1)).toBe(true);
      expect(queueOfComparableObject.has(u2)).toBe(true);
      expect(queueOfComparableObject.has(u3)).toBe(true);
      expect(queueOfComparableObject.has(u4)).toBe(true);
    });

  });



  describe('isEmpty', () => {

    it('when provided Queue is empty then true is returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      expect(queueOfNumber.isEmpty()).toBe(true);
      expect(queueOfNotComparableObject.isEmpty()).toBe(true);
      expect(queueOfComparableObject.isEmpty()).toBe(true);
    });


    it('when provided Queue is not empty then false is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        numberComparator,
        [ n ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        reverseUserIdFComparator,
        [ u1, u2, u3 ]
      );

      expect(queueOfNumber.isEmpty()).toBe(false);
      expect(queueOfNotComparableObject.isEmpty()).toBe(false);
      expect(queueOfComparableObject.isEmpty()).toBe(false);
    });

  });



  describe('of', () => {

    it('when no values are provided then empty Queue is returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        reverseUserIdFComparator
      );

      expect(queueOfNumber).not.toBeNull();
      expect(queueOfNumber).not.toBeUndefined();
      expect(queueOfNumber.size).toBe(0);

      expect(queueOfNotComparableObject).not.toBeNull();
      expect(queueOfNotComparableObject).not.toBeUndefined();
      expect(queueOfNotComparableObject.size).toBe(0);

      expect(queueOfComparableObject).not.toBeNull();
      expect(queueOfComparableObject).not.toBeUndefined();
      expect(queueOfComparableObject.size).toBe(0);
    });


    it('using provided comparator function, when several values are provided then a non-empty Queue is returned', () => {
      const n1 = 19;
      const n2 = 20;
      const n3 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        numberComparator,
        [ n1, n2, n3, n1 ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2, r3, r2, r1 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        reverseUserIdFComparator,
        [ u3, u1, u2 ]
      );

      expect(queueOfNumber).not.toBeNull();
      expect(queueOfNumber).not.toBeUndefined();
      expect(queueOfNumber.size).toBe(4);
      expect(queueOfNumber.has(n1)).toBe(true);
      expect(queueOfNumber.has(n2)).toBe(true);
      expect(queueOfNumber.has(n3)).toBe(true);

      expect(queueOfNotComparableObject).not.toBeNull();
      expect(queueOfNotComparableObject).not.toBeUndefined();
      expect(queueOfNotComparableObject.size).toBe(5);
      expect(queueOfNotComparableObject.has(r1)).toBe(true);
      expect(queueOfNotComparableObject.has(r2)).toBe(true);
      expect(queueOfNotComparableObject.has(r3)).toBe(true);

      expect(queueOfComparableObject).not.toBeNull();
      expect(queueOfComparableObject).not.toBeUndefined();
      expect(queueOfComparableObject.size).toBe(3);
      expect(queueOfComparableObject.has(u1)).toBe(true);
      expect(queueOfComparableObject.has(u2)).toBe(true);
      expect(queueOfComparableObject.has(u3)).toBe(true);
    });


    it('using default comparator function, when several values are provided then a non-empty Queue is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u1, u2, u3, u2, u3 ]
      );

      expect(queueOfComparableObject).not.toBeNull();
      expect(queueOfComparableObject).not.toBeUndefined();
      expect(queueOfComparableObject.size).toBe(5);
      expect(queueOfComparableObject.has(u1)).toBe(true);
      expect(queueOfComparableObject.has(u2)).toBe(true);
      expect(queueOfComparableObject.has(u3)).toBe(true);
    });

  });



  describe('peek', () => {

    it('when provided Queue is empty then undefined is returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      expect(queueOfNumber.peek()).toBeUndefined();
      expect(queueOfNotComparableObject.peek()).toBeUndefined();
      expect(queueOfComparableObject.peek()).toBeUndefined();
    });


    it('when provided Queue is not empty then the element with the highest priority is returned and not removed from the Queue', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        reverseNumberFComparator,
        [ n ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2, r1 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u3, u1, u2 ]
      );

      expect(queueOfNumber.size).toBe(1);
      expect(queueOfNotComparableObject.size).toBe(3);
      expect(queueOfComparableObject.size).toBe(3);

      expect(queueOfNumber.peek()).toBe(n);
      expect(queueOfNotComparableObject.peek()).toBe(r1);
      expect(queueOfComparableObject.peek()).toBe(u1);

      expect(queueOfNumber.size).toBe(1);
      expect(queueOfNotComparableObject.size).toBe(3);
      expect(queueOfComparableObject.size).toBe(3);
    });

  });



  describe('size', () => {

    it('when provided Queue is empty then 0 is returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      expect(queueOfNumber.size).toBe(0);
      expect(queueOfNotComparableObject.size).toBe(0);
      expect(queueOfComparableObject.size).toBe(0);
    });


    it('when provided Queue is not empty then the number or its stored elements is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        reverseNumberFComparator,
        [ n ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2, r1 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u1, u2, u3 ]
      );

      expect(queueOfNumber.size).toBe(1);
      expect(queueOfNotComparableObject.size).toBe(3);
      expect(queueOfComparableObject.size).toBe(3);
    });

  });



  describe('Symbol.dispose', () => {

    it("then it works with 'using' statement", () => {
      {
        using queueOfNumber = ImmutablePriorityQueue.of<number>(
          numberComparator,
          [ 1 ]
        );
        queueOfNumber.enqueue(2);
      }
      /**
       * At this point, dispose should have been called automatically.
       * No direct access to set here, but no errors should occur
       */
    });

  });



  describe('Symbol.iterator', () => {

    it('when provided Queue is empty then an empty Iterator is returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      const queueOfNumberResult = [...queueOfNumber];
      const queueOfNotComparableObjectResult = [...queueOfNotComparableObject];
      const queueOfComparableObjectResult = [...queueOfComparableObject];

      expect(queueOfNumberResult).toHaveLength(0);
      expect(queueOfNumberResult).toEqual([]);

      expect(queueOfNotComparableObjectResult).toHaveLength(0);
      expect(queueOfNotComparableObjectResult).toEqual([]);

      expect(queueOfComparableObjectResult).toHaveLength(0);
      expect(queueOfComparableObjectResult).toEqual([]);
    });


    it('when provided Queue is not empty then it should iterate over all elements using for...of', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        numberComparator,
        [ n ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u3, u1, u2 ]
      );

      const queueOfNumberResult: number[] = [];
      const queueOfNotComparableObjectResult: Role[] = [];
      const queueOfComparableObjectResult: User[] = [];

      for (const value of queueOfNumber) {
        queueOfNumberResult.push(
          value
        );
      }
      for (const value of queueOfNotComparableObject) {
        queueOfNotComparableObjectResult.push(
          value
        );
      }
      for (const value of queueOfComparableObject) {
        queueOfComparableObjectResult.push(
          value
        );
      }

      expect(queueOfNumberResult).toHaveLength(1);
      expect(queueOfNumberResult[0]).toBe(n);

      expect(queueOfNotComparableObjectResult).toHaveLength(2);
      expect(queueOfNotComparableObjectResult[0]).toBe(r1);
      expect(queueOfNotComparableObjectResult[1]).toBe(r2);


      expect(queueOfComparableObjectResult).toHaveLength(3);
      expect(queueOfComparableObjectResult[0]).toBe(u1);
      expect(queueOfComparableObjectResult[1]).toBe(u2);
      expect(queueOfComparableObjectResult[2]).toBe(u3);
    });


    it('when provided Queue is not empty then it should spread into an array correctly', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        numberComparator,
        [ n ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r2, r1 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u1, u3, u2 ]
      );

      const queueOfNumberResult = [...queueOfNumber];
      const queueOfNotComparableObjectResult = [...queueOfNotComparableObject];
      const queueOfComparableObjectResult = [...queueOfComparableObject];

      expect(queueOfNumberResult).toHaveLength(1);
      expect(queueOfNumberResult[0]).toBe(n);

      expect(queueOfNotComparableObjectResult).toHaveLength(2);
      expect(queueOfNotComparableObjectResult[0]).toBe(r1);
      expect(queueOfNotComparableObjectResult[1]).toBe(r2);


      expect(queueOfComparableObjectResult).toHaveLength(3);
      expect(queueOfComparableObjectResult[0]).toBe(u1);
      expect(queueOfComparableObjectResult[1]).toBe(u2);
      expect(queueOfComparableObjectResult[2]).toBe(u3);
    });


    it('when provided Queue is not empty then it should work with Array.from()', () => {
      const n1 = 19;
      const n2 = 19;
      const n3 = 31;
      const n4 = 4;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        reverseNumberFComparator,
        [ n2, n3, n4, n1 ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u1, u2, u3 ]
      );

      const queueOfNumberResult = Array.from(queueOfNumber);
      const queueOfNotComparableObjectResult = Array.from(queueOfNotComparableObject);
      const queueOfComparableObjectResult = Array.from(queueOfComparableObject);


      expect(queueOfNumberResult).toHaveLength(4);
      expect(queueOfNumberResult[0]).toBe(n3);
      expect(queueOfNumberResult[1]).toBe(n1);
      expect(queueOfNumberResult[2]).toBe(n2);
      expect(queueOfNumberResult[3]).toBe(n4);

      expect(queueOfNotComparableObjectResult).toHaveLength(2);
      expect(queueOfNotComparableObjectResult[0]).toBe(r1);
      expect(queueOfNotComparableObjectResult[1]).toBe(r2);


      expect(queueOfComparableObjectResult).toHaveLength(3);
      expect(queueOfComparableObjectResult[0]).toBe(u1);
      expect(queueOfComparableObjectResult[1]).toBe(u2);
      expect(queueOfComparableObjectResult[2]).toBe(u3);
    });

  });



  describe('Symbol.toStringTag', () => {

    it('then return the custom toStringTag value', () => {
      const set = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );

      const tag = Object.prototype.toString.call(set);

      expect(tag).toBe("[object ImmutablePriorityQueue]");
    });

  });



  describe('toArray', () => {

    it('when provided Queue is empty then an empty array is returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      const queueOfNumberResult = queueOfNumber.toArray();
      const queueOfNotComparableObjectResult = queueOfNotComparableObject.toArray();
      const queueOfComparableObjectResult = queueOfComparableObject.toArray();

      expect(queueOfNumberResult).toHaveLength(0);
      expect(queueOfNumberResult).toEqual([]);

      expect(queueOfNotComparableObjectResult).toHaveLength(0);
      expect(queueOfNotComparableObjectResult).toEqual([]);

      expect(queueOfComparableObjectResult).toHaveLength(0);
      expect(queueOfComparableObjectResult).toEqual([]);
    });


    it('when provided Queue is not empty then an array containing its stored values is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        numberComparator,
        [ n ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u3, u1, u2 ]
      );

      const queueOfNumberResult = queueOfNumber.toArray();
      const queueOfNotComparableObjectResult = queueOfNotComparableObject.toArray();
      const queueOfComparableObjectResult = queueOfComparableObject.toArray();

      expect(queueOfNumberResult).toHaveLength(1);
      expect(queueOfNumberResult[0]).toBe(n);

      expect(queueOfNotComparableObjectResult).toHaveLength(2);
      expect(queueOfNotComparableObjectResult[0]).toBe(r1);
      expect(queueOfNotComparableObjectResult[1]).toBe(r2);

      expect(queueOfComparableObjectResult).toHaveLength(3);
      expect(queueOfComparableObjectResult[0]).toBe(u1);
      expect(queueOfComparableObjectResult[1]).toBe(u2);
      expect(queueOfComparableObjectResult[2]).toBe(u3);
    });

  });



  describe('values', () => {

    it('when provided Queue is empty then no entries are returned', () => {
      const queueOfNumber = ImmutablePriorityQueue.empty<number>(
        numberComparator
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.empty<Role>(
        roleIdComparator
      );
      const queueOfComparableObject = ImmutablePriorityQueue.empty<User>();

      const queueOfNumberResult = Array.from(
        queueOfNumber.values()
      );
      const queueOfNotComparableObjectResult = Array.from(
        queueOfNotComparableObject.values()
      );
      const queueOfComparableObjectResult = Array.from(
        queueOfComparableObject.values()
      );

      expect(queueOfNumberResult).toHaveLength(0);
      expect(queueOfNumberResult).toEqual([]);

      expect(queueOfNotComparableObjectResult).toHaveLength(0);
      expect(queueOfNotComparableObjectResult).toEqual([]);

      expect(queueOfComparableObjectResult).toHaveLength(0);
      expect(queueOfComparableObjectResult).toEqual([]);
    });


    it('when provided Queue is not empty then returns correct values', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const queueOfNumber = ImmutablePriorityQueue.of<number>(
        numberComparator,
        [ n ]
      );
      const queueOfNotComparableObject = ImmutablePriorityQueue.of<Role>(
        roleIdComparator,
        [ r1, r2 ]
      );
      const queueOfComparableObject = ImmutablePriorityQueue.of<User>(
        undefined,
        [ u1, u2, u3 ]
      );

      const queueOfNumberResult = Array.from(
        queueOfNumber.values()
      );
      const queueOfNotComparableObjectResult = Array.from(
        queueOfNotComparableObject.values()
      );
      const queueOfComparableObjectResult = Array.from(
        queueOfComparableObject.values()
      );

      expect(queueOfNumberResult).toHaveLength(1);
      expect(queueOfNumberResult[0]).toBe(n);

      expect(queueOfNotComparableObjectResult).toHaveLength(2);
      expect(queueOfNotComparableObjectResult[0]).toBe(r1);
      expect(queueOfNotComparableObjectResult[1]).toBe(r2);

      expect(queueOfComparableObjectResult).toHaveLength(3);
      expect(queueOfComparableObjectResult[0]).toBe(u1);
      expect(queueOfComparableObjectResult[1]).toBe(u2);
      expect(queueOfComparableObjectResult[2]).toBe(u3);
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


const getName =
  <T extends { name: string }>(obj: T): string => obj.name;

const numberComparator: Comparator<number> =
  Comparator.of(
    (n1: number, n2: number) =>
      n1 - n2
  );

const plus2 =
  (n: number) => n * 2;

const reverseNumberFComparator: FComparator<number> =
  (n1: number, n2: number) => n2 - n1;

const reverseUserIdFComparator: FComparator<User> =
  (u1: User, u2: User) => u2.id - u1.id;

const roleIdComparator: Comparator<Role> =
  Comparator.of(
    (r1: Role, r2: Role) =>
      r1.id - r2.id
  );
