import { ImmutableHashSet } from '@app-core/type/collection/set';
import { EqualityFunction, Hashable, HashFunction } from '@app-core/type/collection';
import { Nullable } from '@app-core/type';
import { ObjectUtil } from '@app-core/util';
import { UnsupportedOperationError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/collection/set/immutable-hash-set.type.spec.ts
 */
describe('ImmutableHashSet', () => {


  describe('add', () => {

    it('using provided hash and equals functions, when a new, non-existent value is added then the Set stores it', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>(
        hashUser,
        areUsersEquals
      );

      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const newSetOfNumber = setOfNumber.add(n1).add(n2);
      const newsetOfNotHashableObject = setOfNotHashableObject.add(r1).add(r2);
      const newSetOfHashableObject = setOfHashableObject.add(u1).add(u2);

      expect(setOfNumber.size).toBe(0);
      expect(newSetOfNumber.size).toBe(2);
      expect(newSetOfNumber.has(n1)).toBe(true);
      expect(newSetOfNumber.has(n2)).toBe(true);

      expect(setOfNotHashableObject.size).toBe(0);
      expect(newsetOfNotHashableObject.size).toBe(2);
      expect(newsetOfNotHashableObject.has(r1)).toBe(true);
      expect(newsetOfNotHashableObject.has(r2)).toBe(true);

      expect(setOfHashableObject.size).toBe(0);
      expect(newSetOfHashableObject.size).toBe(2);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(true);
    });


    it('using provided hash and equals functions, when a new but existent value is added then the Set does not append it', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>(
        hashUser,
        areUsersEquals
      );

      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const newSetOfNumber = setOfNumber.add(n1).add(n2).add(n1);
      const newsetOfNotHashableObject = setOfNotHashableObject.add(r1).add(r2).add(r1);
      const newSetOfHashableObject = setOfHashableObject.add(u1).add(u2).add(u1);

      expect(setOfNumber.size).toBe(0);
      expect(newSetOfNumber.size).toBe(2);
      expect(newSetOfNumber.has(n1)).toBe(true);
      expect(newSetOfNumber.has(n2)).toBe(true);

      expect(setOfNotHashableObject.size).toBe(0);
      expect(newsetOfNotHashableObject.size).toBe(2);
      expect(newsetOfNotHashableObject.has(r1)).toBe(true);
      expect(newsetOfNotHashableObject.has(r2)).toBe(true);

      expect(setOfHashableObject.size).toBe(0);
      expect(newSetOfHashableObject.size).toBe(2);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(true);
    });


    it('using default hash and equals functions, when a new, non-existent value is added then the Set stores it', () => {
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const newSetOfHashableObject = setOfHashableObject.add(u1).add(u2);

      expect(setOfHashableObject.size).toBe(0);
      expect(newSetOfHashableObject.size).toBe(2);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(true);
    });


    it('using default hash and equals functions, when a new but existent value is added then the Set does not append it', () => {
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const newSetOfHashableObject = setOfHashableObject.add(u1).add(u2).add(u1);

      expect(setOfHashableObject.size).toBe(0);

      expect(newSetOfHashableObject.size).toBe(2);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(true);
    });

  });



  describe('addAll', () => {

    it('using provided hash and equals functions, when source Set and values are empty then empty Set is returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>(
        hashUser,
        areUsersEquals
      );

      const setOfNumberResult = setOfNumber.addAll(setOfNumber);
      const setOfNotHashableObjectResult = setOfNotHashableObject.addAll([]);
      const setOfHashableObjectResult = setOfHashableObject.addAll([]);

      expect(setOfNumberResult.size).toBe(0);
      expect(setOfNumberResult.isEmpty()).toBe(true);

      expect(setOfNotHashableObjectResult.size).toBe(0);
      expect(setOfNotHashableObjectResult.isEmpty()).toBe(true);

      expect(setOfHashableObjectResult.size).toBe(0);
      expect(setOfHashableObjectResult.isEmpty()).toBe(true);
    });


    it('using provided hash and equals functions, when provided values are stored in source Set then source Set is returned', () => {
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

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2, n3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r3 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );
      const setOfHashableObjectToAdd = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u2, u3, u4 ]
      );

      const setOfNumberResult = setOfNumber.addAll([ n1, n2, n3 ]);
      const setOfNotHashableObjectResult = setOfNotHashableObject.addAll([ r1, r3, r4 ]);
      const setOfHashableObjectResult = setOfHashableObject.addAll(setOfHashableObjectToAdd);

      expect(setOfNumber.size).toBe(3);
      expect(setOfNumberResult.size).toBe(3);
      expect(setOfNumberResult.has(n1)).toBe(true);
      expect(setOfNumberResult.has(n2)).toBe(true);
      expect(setOfNumberResult.has(n3)).toBe(true);

      expect(setOfNotHashableObject.size).toBe(3);
      expect(setOfNotHashableObjectResult.size).toBe(3);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r3)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r4)).toBe(true);

      expect(setOfHashableObject.size).toBe(3);
      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
      expect(setOfHashableObjectResult.has(u4)).toBe(true);
    });


    it('using provided hash and equals functions, when some provided values are not stored in source Set then new Set containing all is returned', () => {
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

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r4 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u3 ]
      );
      const setOfNumberToAdd = new Set<number>(
        [ n2, n3 ]
      );
      const setOfNotHashableObjectToAdd = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r2, r3, r4 ]
      );

      const setOfNumberResult = setOfNumber.addAll(setOfNumberToAdd);
      const setOfNotHashableObjectResult = setOfNotHashableObject.addAll(setOfNotHashableObjectToAdd);
      const setOfHashableObjectResult = setOfHashableObject.addAll([ u2, u3, u4 ]);

      expect(setOfNumber.size).toBe(1);
      expect(setOfNumberResult.size).toBe(3);
      expect(setOfNumberResult.has(n1)).toBe(true);
      expect(setOfNumberResult.has(n2)).toBe(true);
      expect(setOfNumberResult.has(n3)).toBe(true);

      expect(setOfNotHashableObject.size).toBe(1);
      expect(setOfNotHashableObjectResult.size).toBe(3);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r3)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r4)).toBe(true);

      expect(setOfHashableObject.size).toBe(2);
      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
      expect(setOfHashableObjectResult.has(u4)).toBe(true);
    });


    it('using default hash and equals functions, when source Set and values are empty then empty Set is returned', () => {
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      const setOfHashableObjectResult = setOfHashableObject.addAll([]);

      expect(setOfHashableObjectResult.size).toBe(0);
      expect(setOfHashableObjectResult.isEmpty()).toBe(true);
    });


    it('using default hash and equals functions, when provided values are stored in source Set then source Set is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const setOfHashableObjectResult = setOfHashableObject.addAll([ u2, u3, u4 ]);

      expect(setOfHashableObject.size).toBe(3);
      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
      expect(setOfHashableObjectResult.has(u4)).toBe(true);
    });


    it('using default hash and equals functions, when some provided values are not stored in source Set then new Set containing all is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u3 ]
      );
      const setOfHashableObjectToAdd = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u2, u3, u4 ]
      );

      const setOfHashableObjectResult = setOfHashableObject.addAll(setOfHashableObjectToAdd);

      expect(setOfHashableObject.size).toBe(2);
      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
      expect(setOfHashableObjectResult.has(u4)).toBe(true);
    });

  });



  describe('clear', () => {

    it('then the new returned Set is empty', () => {
      const n = 19;
      const role = { id: 1, name: 'role1' } as Role;
      const user = new User(1, 'user 1');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        undefined,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ role ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ user ]
      );

      const newSetOfNumber = setOfNumber.clear();
      const newsetOfNotHashableObject = setOfNotHashableObject.clear();
      const newSetOfHashableObject = setOfHashableObject.clear();

      expect(setOfNumber.size).toBe(1);
      expect(newSetOfNumber.size).toBe(0);

      expect(setOfNotHashableObject.size).toBe(1);
      expect(newsetOfNotHashableObject.size).toBe(0);

      expect(setOfHashableObject.size).toBe(1);
      expect(newSetOfHashableObject.size).toBe(0);
    });

  });



  describe('delete', () => {

    it('then an error is thrown', () => {
      const set = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );

      // @ts-ignore
      expect(() => set.delete(null)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.delete(undefined)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.delete(1)).toThrowError(UnsupportedOperationError);
    });

  });



  describe('deleteAll', () => {

    it('using provided hash and equals functions, when source Set and values are empty then empty Set is returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>(
        hashUser,
        areUsersEquals
      );

      const setOfNumberResult = setOfNumber.deleteAll(setOfNumber);
      const setOfNotHashableObjectResult = setOfNotHashableObject.deleteAll([]);
      const setOfHashableObjectResult = setOfHashableObject.deleteAll([]);

      expect(setOfNumberResult.size).toBe(0);
      expect(setOfNumberResult.isEmpty()).toBe(true);

      expect(setOfNotHashableObjectResult.size).toBe(0);
      expect(setOfNotHashableObjectResult.isEmpty()).toBe(true);

      expect(setOfHashableObjectResult.size).toBe(0);
      expect(setOfHashableObjectResult.isEmpty()).toBe(true);
    });


    it('using provided hash and equals functions, when provided values are not stored in source Set then source Set is returned', () => {
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

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r4 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u3 ]
      );
      const setOfHashableObjectToDelete = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u2, u4 ]
      );

      const setOfNumberResult = setOfNumber.deleteAll([ n2, n3 ]);
      const setOfNotHashableObjectResult = setOfNotHashableObject.deleteAll([ r2, r3 ]);
      const setOfHashableObjectResult = setOfHashableObject.deleteAll(setOfHashableObjectToDelete);

      expect(setOfNumber.size).toBe(1);
      expect(setOfNumberResult.size).toBe(1);
      expect(setOfNumberResult.has(n1)).toBe(true);
      expect(setOfNumberResult.has(n2)).toBe(false);
      expect(setOfNumberResult.has(n3)).toBe(false);

      expect(setOfNotHashableObject.size).toBe(1);
      expect(setOfNotHashableObjectResult.size).toBe(1);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(false);
      expect(setOfNotHashableObjectResult.has(r3)).toBe(false);
      expect(setOfNotHashableObjectResult.has(r4)).toBe(true);

      expect(setOfHashableObject.size).toBe(2);
      expect(setOfHashableObjectResult.size).toBe(2);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(false);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
      expect(setOfHashableObjectResult.has(u4)).toBe(false);
    });


    it('using provided hash and equals functions, when some provided values are stored in source Set then a new Set with the elements of the source Set not included in values is returned', () => {
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

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2, n3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r3 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );
      const setOfNumberToDelete = new Set<number>(
        [ n1, n2, n3 ]
      );
      const setOfNotHashableObjectToDelete = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r3, r4 ]
      );

      const setOfNumberResult = setOfNumber.deleteAll(setOfNumberToDelete);
      const setOfNotHashableObjectResult = setOfNotHashableObject.deleteAll(setOfNotHashableObjectToDelete);
      const setOfHashableObjectResult = setOfHashableObject.deleteAll([ u2, u3, u4 ]);

      expect(setOfNumber.size).toBe(3);
      expect(setOfNumberResult.size).toBe(0);
      expect(setOfNumberResult.has(n1)).toBe(false);
      expect(setOfNumberResult.has(n2)).toBe(false);
      expect(setOfNumberResult.has(n3)).toBe(false);

      expect(setOfNotHashableObject.size).toBe(3);
      expect(setOfNotHashableObjectResult.size).toBe(1);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(false);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r3)).toBe(false);
      expect(setOfNotHashableObjectResult.has(r4)).toBe(false);

      expect(setOfHashableObject.size).toBe(3);
      expect(setOfHashableObjectResult.size).toBe(1);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(false);
      expect(setOfHashableObjectResult.has(u3)).toBe(false);
      expect(setOfHashableObjectResult.has(u4)).toBe(false);
    });


    it('using default hash and equals functions, when source Set and values are empty then empty Set is returned', () => {
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      const setOfHashableObjectResult = setOfHashableObject.deleteAll([]);

      expect(setOfHashableObjectResult.size).toBe(0);
      expect(setOfHashableObjectResult.isEmpty()).toBe(true);
    });


    it('using default hash and equals functions, when provided values are not stored in source Set then source Set is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u3 ]
      );

      const setOfHashableObjectResult = setOfHashableObject.deleteAll([ u2, u4 ]);

      expect(setOfHashableObject.size).toBe(2);
      expect(setOfHashableObjectResult.size).toBe(2);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(false);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
      expect(setOfHashableObjectResult.has(u4)).toBe(false);
    });


    it('using default hash and equals functions, when some provided values are stored in source Set then a new Set with the elements of the source Set not included in values is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );
      const setOfHashableObjectToDelete = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u2, u3, u4 ]
      );

      const setOfHashableObjectResult = setOfHashableObject.deleteAll(setOfHashableObjectToDelete);

      expect(setOfHashableObject.size).toBe(3);
      expect(setOfHashableObjectResult.size).toBe(1);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(false);
      expect(setOfHashableObjectResult.has(u3)).toBe(false);
      expect(setOfHashableObjectResult.has(u4)).toBe(false);
    });

  });



  describe('difference', () => {

    it('then an error is thrown', () => {
      const set = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );

      // @ts-ignore
      expect(() => set.difference(null)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.difference(undefined)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.difference([ 1 ])).toThrowError(UnsupportedOperationError);
    });

  });



  describe('differenceCustom', () => {

    it('when provided Sets are empty then an empty Set is returned', () => {
      const setOfNumberSource = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObjectSource = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObjectSource = ImmutableHashSet.empty<User>();
      const setOfHashableObjectOther = ImmutableHashSet.empty<User>();

      const setOfNumberResult = setOfNumberSource.differenceCustom(
        null
      );
      const setOfNotHashableObjectResult = setOfNotHashableObjectSource.differenceCustom(
        undefined
      );
      const setOfHashableObjectResult = setOfHashableObjectSource.differenceCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(0);
      expect(setOfNotHashableObjectResult.size).toBe(0);
      expect(setOfHashableObjectResult.size).toBe(0);
    });


    it('when provided Iterable is null, undefined or empty then the source Set is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals
      );

      const setOfNumberResult = setOfNumber.differenceCustom(
        null
      );
      const setOfNotHashableObjectResult = setOfNotHashableObject.differenceCustom(
        undefined
      );
      const setOfHashableObjectResult = setOfHashableObject.differenceCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(1);
      expect(setOfNumberResult.has(n)).toBe(true);

      expect(setOfNotHashableObjectResult.size).toBe(2);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);

      expect(setOfHashableObjectResult.size).toBe(2);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
    });


    it('using provided hash and equals functions, when there is no common value in the Set to compare then equivalent to original one is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfNumberOther = new Set<number>(
        [ n ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3 ]
      );

      const newSetOfNumber = setOfNumber.differenceCustom(
        setOfNumberOther
      );
      const newsetOfNotHashableObject = setOfNotHashableObject.differenceCustom(
        [ r3 ]
      );
      const newSetOfHashableObject = setOfHashableObject.differenceCustom(
        setOfHashableObjectOther
      );

      expect(newSetOfNumber.size).toBe(0);
      expect(newSetOfNumber.has(n)).toBe(false);

      expect(newsetOfNotHashableObject.size).toBe(2);
      expect(newsetOfNotHashableObject.has(r1)).toBe(true);
      expect(newsetOfNotHashableObject.has(r2)).toBe(true);
      expect(newsetOfNotHashableObject.has(r3)).toBe(false);

      expect(newSetOfHashableObject.size).toBe(2);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(true);
      expect(newSetOfHashableObject.has(u3)).toBe(false);
    });


    it('using provided hash and equals functions, when there are common values in the Set to be compared then a new Set containing only the elements of the original not included in the provided one is returned', () => {
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

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2, n3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r3 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );
      const setOfNumberOther = new Set<number>(
        [ n3 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3, u4 ]
      );

      const newSetOfNumber = setOfNumber.differenceCustom(
        setOfNumberOther
      );
      const newsetOfNotHashableObject = setOfNotHashableObject.differenceCustom(
        [ r3, r4 ]
      );
      const newSetOfHashableObject = setOfHashableObject.differenceCustom(
        setOfHashableObjectOther
      );

      expect(newSetOfNumber.size).toBe(2);
      expect(newSetOfNumber.has(n1)).toBe(true);
      expect(newSetOfNumber.has(n2)).toBe(true);
      expect(newSetOfNumber.has(n3)).toBe(false);

      expect(newsetOfNotHashableObject.size).toBe(1);
      expect(newsetOfNotHashableObject.has(r1)).toBe(false);
      expect(newsetOfNotHashableObject.has(r2)).toBe(true);
      expect(newsetOfNotHashableObject.has(r3)).toBe(false);
      expect(newsetOfNotHashableObject.has(r4)).toBe(false);

      expect(newSetOfHashableObject.size).toBe(1);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(false);
      expect(newSetOfHashableObject.has(u3)).toBe(false);
      expect(newSetOfHashableObject.has(u4)).toBe(false);
    });


    it('using default hash and equals functions, when there is no common value in the Set to compare then equivalent to original one is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3 ]
      );

      const newSetOfHashableObject = setOfHashableObject.differenceCustom(
        setOfHashableObjectOther
      );

      expect(newSetOfHashableObject.size).toBe(2);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(true);
      expect(newSetOfHashableObject.has(u3)).toBe(false);
    });


    it('using default hash and equals functions, when there are common values in the Set to be compared then a new Set containing only the elements of the original not included in the provided one is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3, u4 ]
      );

      const newSetOfHashableObject = setOfHashableObject.differenceCustom(
        setOfHashableObjectOther
      );

      expect(newSetOfHashableObject.size).toBe(1);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(false);
      expect(newSetOfHashableObject.has(u3)).toBe(false);
      expect(newSetOfHashableObject.has(u4)).toBe(false);
    });

  });



  describe('empty', () => {

    it('when no hash and equals functions are provided then empty Set is returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>();
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>();
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      expect(setOfNumber).not.toBeNull();
      expect(setOfNumber).not.toBeUndefined();
      expect(setOfNumber.size).toBe(0);

      expect(setOfNotHashableObject).not.toBeNull();
      expect(setOfNotHashableObject).not.toBeUndefined();
      expect(setOfNotHashableObject.size).toBe(0);

      expect(setOfHashableObject).not.toBeNull();
      expect(setOfHashableObject).not.toBeUndefined();
      expect(setOfHashableObject.size).toBe(0);
    });


    it('when hash and equals functions are provided then empty Set is returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>(
        hashUser,
        areUsersEquals
      );

      expect(setOfNumber).not.toBeNull();
      expect(setOfNumber).not.toBeUndefined();
      expect(setOfNumber.size).toBe(0);

      expect(setOfNotHashableObject).not.toBeNull();
      expect(setOfNotHashableObject).not.toBeUndefined();
      expect(setOfNotHashableObject.size).toBe(0);

      expect(setOfHashableObject).not.toBeNull();
      expect(setOfHashableObject).not.toBeUndefined();
      expect(setOfHashableObject.size).toBe(0);
    });

  });



  describe('entries', () => {

    it('when provided Set is empty then no entries are returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      const setOfNumberResult = Array.from(
        setOfNumber.entries()
      );
      const setOfNotHashableObjectResult = Array.from(
        setOfNotHashableObject.entries()
      );
      const setOfHashableObjectResult = Array.from(
        setOfHashableObject.entries()
      );

      expect(setOfNumberResult).toHaveLength(0);
      expect(setOfNotHashableObjectResult).toHaveLength(0);
      expect(setOfHashableObjectResult).toHaveLength(0);
    });


    it('when provided Set is not empty then returns correct entries', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const setOfNumberResult = Array.from(
        setOfNumber.entries()
      );
      const setOfNotHashableObjectResult = Array.from(
        setOfNotHashableObject.entries()
      );
      const setOfHashableObjectResult = Array.from(
        setOfHashableObject.entries()
      );

      expect(setOfNumberResult).toHaveLength(1);
      expect(setOfNumberResult).toContainEqual([ n, n ]);

      expect(setOfNotHashableObjectResult).toHaveLength(2);
      expect(setOfNotHashableObjectResult).toContainEqual([ r1, r1 ]);
      expect(setOfNotHashableObjectResult).toContainEqual([ r2, r2 ]);

      expect(setOfHashableObjectResult).toHaveLength(3);
      expect(setOfHashableObjectResult).toContainEqual([ u1, u1 ]);
      expect(setOfHashableObjectResult).toContainEqual([ u2, u2 ]);
      expect(setOfHashableObjectResult).toContainEqual([ u3, u3 ]);
    });

  });



  describe('forEach', () => {

    it('when provided Set is empty then the function is not invoked', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>();
      const callback = vi.fn();

      setOfNumber.forEach(
        callback
      );
      setOfNotHashableObject.forEach(
        callback
      );
      setOfHashableObject.forEach(
        callback
      );

      expect(callback).not.toHaveBeenCalled();
    });


    it('when provided Set is not empty then the function is applied to every element', () => {
      const n1 = 19;
      const n2 = 20;
      const n3 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2, n3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r3 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const collectedNumbers: number[] = [];
      const collectedRoleNames: string[] = [];
      const collectedUserNames: string[] = [];

      setOfNumber.forEach(
        n =>
          collectedNumbers.push(
            plus2(n)
          )
      );
      setOfNotHashableObject.forEach(
        r =>
          collectedRoleNames.push(
            getName(r)
          )
      );
      setOfHashableObject.forEach(
        u =>
          collectedUserNames.push(
            getName(u)
          )
      );

      expect(collectedNumbers).toHaveLength(3);
      expect(collectedNumbers).toContainEqual(n1 * 2);
      expect(collectedNumbers).toContainEqual(n2 * 2);
      expect(collectedNumbers).toContainEqual(n2 * 2);

      expect(collectedRoleNames).toHaveLength(3);
      expect(collectedRoleNames).toContainEqual(r1.name);
      expect(collectedRoleNames).toContainEqual(r2.name);
      expect(collectedRoleNames).toContainEqual(r3.name);

      expect(collectedUserNames).toHaveLength(3);
      expect(collectedUserNames).toContainEqual(u1.name);
      expect(collectedUserNames).toContainEqual(u2.name);
      expect(collectedUserNames).toContainEqual(u3.name);
    });

  });



  describe('has', () => {

    it('when provided Set is empty then no entry is found', () => {
      const n = 19;
      const role = { id: 1, name: 'role1' } as Role;
      const user = new User(1, 'user 1');

      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      expect(setOfNumber.has(n)).toBe(false);
      expect(setOfNotHashableObject.has(role)).toBe(false);
      expect(setOfHashableObject.has(user)).toBe(false);
    });


    it('using provided hash and equals functions, when the value to search does not exist then false is returned', () => {
      const n1 = 19;
      const n2 = 20;
      const n3 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1 ]
      );

      expect(setOfNumber.has(n2)).toBe(false);
      expect(setOfNumber.has(n3)).toBe(false);

      expect(setOfNotHashableObject.has(r2)).toBe(false);
      expect(setOfNotHashableObject.has(r3)).toBe(false);

      expect(setOfHashableObject.has(u2)).toBe(false);
      expect(setOfHashableObject.has(u3)).toBe(false);
    });


    it('using provided hash and equals functions, when the value to search is found then true is returned', () => {
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

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2, n3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r3 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );

      expect(setOfNumber.size).toBe(3);
      expect(setOfNumber.has(n1)).toBe(true);
      expect(setOfNumber.has(n2)).toBe(true);
      expect(setOfNumber.has(n3)).toBe(true);

      expect(setOfNotHashableObject.size).toBe(3);
      expect(setOfNotHashableObject.has(r1)).toBe(true);
      expect(setOfNotHashableObject.has(r2)).toBe(true);
      expect(setOfNotHashableObject.has(r3)).toBe(true);
      expect(setOfNotHashableObject.has(r4)).toBe(true);

      expect(setOfHashableObject.size).toBe(3);
      expect(setOfHashableObject.has(u1)).toBe(true);
      expect(setOfHashableObject.has(u2)).toBe(true);
      expect(setOfHashableObject.has(u3)).toBe(true);
      expect(setOfHashableObject.has(u4)).toBe(true);
    });


    it('using default hash and equals functions, when the value to search does not exist then false is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1 ]
      );

      expect(setOfHashableObject.has(u2)).toBe(false);
      expect(setOfHashableObject.has(u3)).toBe(false);
    });


    it('using default hash and equals functions, when the value to search is found then true is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );

      expect(setOfHashableObject.size).toBe(3);
      expect(setOfHashableObject.has(u1)).toBe(true);
      expect(setOfHashableObject.has(u2)).toBe(true);
      expect(setOfHashableObject.has(u3)).toBe(true);
      expect(setOfHashableObject.has(u4)).toBe(true);
    });

  });



  describe('intersection', () => {

    it('then an error is thrown', () => {
      const set = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );

      // @ts-ignore
      expect(() => set.intersection(null)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.intersection(undefined)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.intersection([ 1 ])).toThrowError(UnsupportedOperationError);
    });

  });



  describe('intersectionCustom', () => {

    it('when provided Sets are empty then an empty Set is returned', () => {
      const setOfNumberSource = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObjectSource = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObjectSource = ImmutableHashSet.empty<User>();
      const setOfHashableObjectOther = ImmutableHashSet.empty<User>();

      const setOfNumberResult = setOfNumberSource.intersectionCustom(
        null
      );
      const setOfNotHashableObjectResult = setOfNotHashableObjectSource.intersectionCustom(
        undefined
      );
      const setOfHashableObjectResult = setOfHashableObjectSource.intersectionCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(0);
      expect(setOfNotHashableObjectResult.size).toBe(0);
      expect(setOfHashableObjectResult.size).toBe(0);
    });


    it('when provided Iterable is null, undefined or empty then an empty Set is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals
      );

      const setOfNumberResult = setOfNumber.intersectionCustom(
        null
      );
      const setOfNotHashableObjectResult = setOfNotHashableObject.intersectionCustom(
        undefined
      );
      const setOfHashableObjectResult = setOfHashableObject.intersectionCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(0);
      expect(setOfNotHashableObjectResult.size).toBe(0);
      expect(setOfHashableObjectResult.size).toBe(0);
    });


    it('using provided hash and equals functions, when there is no common value in the Iterable to compare then an empty Set is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfNumberOther = new Set<number>(
        [ n ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3 ]
      );

      const newSetOfNumber = setOfNumber.intersectionCustom(
        setOfNumberOther
      );
      const newsetOfNotHashableObject = setOfNotHashableObject.intersectionCustom(
        [ r3 ]
      );
      const newSetOfHashableObject = setOfHashableObject.intersectionCustom(
        setOfHashableObjectOther
      );

      expect(newSetOfNumber.size).toBe(0);
      expect(newsetOfNotHashableObject.size).toBe(0);
      expect(newSetOfHashableObject.size).toBe(0);
    });


    it('using provided hash and equals functions, when there are a common values in the Iterable to be compared then a new Set with the shared elements are returned', () => {
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

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2, n3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r3 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );
      const setOfNumberOther = new Set<number>(
        [ n3 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3, u4 ]
      );

      const newSetOfNumber = setOfNumber.intersectionCustom(
        setOfNumberOther
      );
      const newsetOfNotHashableObject = setOfNotHashableObject.intersectionCustom(
        [ r3, r4 ]
      );
      const newSetOfHashableObject = setOfHashableObject.intersectionCustom(
        setOfHashableObjectOther
      );

      expect(newSetOfNumber.size).toBe(1);
      expect(newSetOfNumber.has(n1)).toBe(false);
      expect(newSetOfNumber.has(n2)).toBe(false);
      expect(newSetOfNumber.has(n3)).toBe(true);

      expect(newsetOfNotHashableObject.size).toBe(2);
      expect(newsetOfNotHashableObject.has(r1)).toBe(true);
      expect(newsetOfNotHashableObject.has(r2)).toBe(false);
      expect(newsetOfNotHashableObject.has(r3)).toBe(true);
      expect(newsetOfNotHashableObject.has(r4)).toBe(true);

      expect(newSetOfHashableObject.size).toBe(2);
      expect(newSetOfHashableObject.has(u1)).toBe(false);
      expect(newSetOfHashableObject.has(u2)).toBe(true);
      expect(newSetOfHashableObject.has(u3)).toBe(true);
      expect(newSetOfHashableObject.has(u4)).toBe(true);
    });


    it('using default hash and equals functions, when there is no common value in the Iterable to compare then an empty Set is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3 ]
      );

      const newSetOfHashableObject = setOfHashableObject.intersectionCustom(
        setOfHashableObjectOther
      );

      expect(newSetOfHashableObject.size).toBe(0);
    });


    it('using default hash and equals functions, when there is a common value in the Iterable to be compared then a new Set with the shared elements are returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3, u4 ]
      );

      const newSetOfHashableObject = setOfHashableObject.intersectionCustom(
        setOfHashableObjectOther
      );

      expect(newSetOfHashableObject.size).toBe(2);
      expect(newSetOfHashableObject.has(u1)).toBe(false);
      expect(newSetOfHashableObject.has(u2)).toBe(true);
      expect(newSetOfHashableObject.has(u3)).toBe(true);
      expect(newSetOfHashableObject.has(u4)).toBe(true);
    });

  });



  describe('isDisjointFrom', () => {

    it('when provided Sets are empty then true is returned', () => {
      const setOfNumberSource = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObjectSource = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObjectSource = ImmutableHashSet.empty<User>();
      const setOfHashableObjectOther = ImmutableHashSet.empty<User>();

      expect(setOfNumberSource.isDisjointFrom(null)).toBe(true);
      expect(setOfNotHashableObjectSource.isDisjointFrom(undefined)).toBe(true);
      expect(setOfHashableObjectSource.isDisjointFrom(setOfHashableObjectOther)).toBe(true);
    });


    it('when provided Iterable is null, undefined or empty then true is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      expect(setOfNumber.isDisjointFrom(null)).toBe(true);
      expect(setOfNotHashableObject.isDisjointFrom(undefined)).toBe(true);
      expect(setOfHashableObject.isDisjointFrom([])).toBe(true);
    });


    it('using provided hash and equals functions, when there is no common value in the provided Iterable then true is returned', () => {
      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1 ]
      );
      const setOfNumberOther = new Set<number>(
        [ n2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u2 ]
      );

      expect(setOfNumber.isDisjointFrom(setOfNumberOther)).toBe(true);
      expect(setOfNotHashableObject.isDisjointFrom([ r2 ])).toBe(true);
      expect(setOfHashableObject.isDisjointFrom(setOfHashableObjectOther)).toBe(true);
    });


    it('using provided hash and equals functions, when there are common values in the provided Iterable then false is returned', () => {
      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');
      const u3 = new User(u2.id, u2.name);

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfNumberOther = new Set<number>(
        [ n2 ]
      );

      expect(setOfNumber.isDisjointFrom(setOfNumberOther)).toBe(false);
      expect(setOfNotHashableObject.isDisjointFrom([ r1 ])).toBe(false);
      expect(setOfHashableObject.isDisjointFrom([ u3 ])).toBe(false);
    });


    it('using default hash and equals functions, when there is no common value in the provided Iterable then true is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1 ]
      );

      expect(setOfHashableObject.isDisjointFrom([ u2 ])).toBe(true);
    });


    it('using default hash and equals functions, when there are common values in the provided Iterable then false is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');
      const u3 = new User(u1.id, 'user3');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u3 ]
      );

      expect(setOfHashableObject.isDisjointFrom(setOfHashableObjectOther)).toBe(false);
    });

  });



  describe('isEmpty', () => {

    it('when provided Set is empty then true is returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      expect(setOfNumber.isEmpty()).toBe(true);
      expect(setOfNotHashableObject.isEmpty()).toBe(true);
      expect(setOfHashableObject.isEmpty()).toBe(true);
    });


    it('when provided Set is not empty then false is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      expect(setOfNumber.isEmpty()).toBe(false);
      expect(setOfNotHashableObject.isEmpty()).toBe(false);
      expect(setOfHashableObject.isEmpty()).toBe(false);
    });

  });



  describe('isSubsetOf', () => {

    it('when provided Sets are empty then false is returned when other is not empty, true otherwise', () => {
      const setOfNumberSource = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObjectSource = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObjectSource = ImmutableHashSet.empty<User>();
      const setOfHashableObjectOther = ImmutableHashSet.empty<User>();

      expect(setOfNumberSource.isSubsetOf(null)).toBe(false);
      expect(setOfNotHashableObjectSource.isSubsetOf(undefined)).toBe(false);
      expect(setOfHashableObjectSource.isSubsetOf(setOfHashableObjectOther)).toBe(true);
    });


    it('when provided Iterable is null, undefined or empty then false is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      expect(setOfNumber.isSubsetOf(null)).toBe(false);
      expect(setOfNotHashableObject.isSubsetOf(undefined)).toBe(false);
      expect(setOfHashableObject.isSubsetOf([])).toBe(false);
    });


    it('using provided hash and equals functions, when there is no common value in the provided Iterable then false is returned', () => {
      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1 ]
      );
      const setOfNumberOther = new Set<number>(
        [ n2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u2 ]
      );

      expect(setOfNumber.isSubsetOf(setOfNumberOther)).toBe(false);
      expect(setOfNotHashableObject.isSubsetOf([ r2 ])).toBe(false);
      expect(setOfHashableObject.isSubsetOf(setOfHashableObjectOther)).toBe(false);
    });


    it('using provided hash and equals functions, when there are common values in the provided Iterable then true is returned', () => {
      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');
      const u3 = new User(u2.id, u2.name);

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u3 ]
      );
      const setOfNumberOther = new Set<number>(
        [ n1, n2 ]
      );

      expect(setOfNumber.isSubsetOf(setOfNumberOther)).toBe(true);
      expect(setOfNotHashableObject.isSubsetOf([ r1, r2 ])).toBe(true);
      expect(setOfHashableObject.isSubsetOf([ u1, u2, u3 ])).toBe(true);
    });


    it('using default hash and equals functions, when there is no common value in the provided Iterable then false is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1 ]
      );

      expect(setOfHashableObject.isSubsetOf([ u2 ])).toBe(false);
    });


    it('using default hash and equals functions, when there are common values in the provided Iterable then true is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');
      const u3 = new User(u1.id, 'user3');
      const u4 = new User(4, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u4 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3, u4 ]
      );

      expect(setOfHashableObject.isSubsetOf(setOfHashableObjectOther)).toBe(true);
    });

  });



  describe('isSupersetOf', () => {

    it('when provided Sets are empty then false is returned when other is not empty, true otherwise', () => {
      const setOfNumberSource = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObjectSource = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObjectSource = ImmutableHashSet.empty<User>();
      const setOfHashableObjectOther = ImmutableHashSet.empty<User>();

      expect(setOfNumberSource.isSupersetOf(null)).toBe(false);
      expect(setOfNotHashableObjectSource.isSupersetOf(undefined)).toBe(false);
      expect(setOfHashableObjectSource.isSupersetOf(setOfHashableObjectOther)).toBe(true);
    });


    it('when provided Iterable is null, undefined or empty then false is returned when other is not empty, true otherwise', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      expect(setOfNumber.isSupersetOf(null)).toBe(false);
      expect(setOfNotHashableObject.isSupersetOf(undefined)).toBe(false);
      expect(setOfHashableObject.isSupersetOf([])).toBe(true);
    });


    it('using provided hash and equals functions, when there is no common value in the provided Iterable then false is returned', () => {
      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1 ]
      );
      const setOfNumberOther = new Set<number>(
        [ n2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u2 ]
      );

      expect(setOfNumber.isSupersetOf(setOfNumberOther)).toBe(false);
      expect(setOfNotHashableObject.isSupersetOf([ r2 ])).toBe(false);
      expect(setOfHashableObject.isSupersetOf(setOfHashableObjectOther)).toBe(false);
    });


    it('using provided hash and equals functions, when there are common values in the provided Iterable then true is returned', () => {
      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');
      const u3 = new User(u2.id, u2.name);

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );

      expect(setOfNumber.isSupersetOf([ n1, n2 ])).toBe(true);
      expect(setOfNotHashableObject.isSupersetOf([ r2 ])).toBe(true);
      expect(setOfHashableObject.isSupersetOf([ u1, u3 ])).toBe(true);
    });


    it('using default hash and equals functions, when there is no common value in the provided Iterable then false is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1 ]
      );

      expect(setOfHashableObject.isSupersetOf([ u2 ])).toBe(false);
    });


    it('using default hash and equals functions, when there are common values in the provided Iterable then true is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(51, 'user51');
      const u3 = new User(u1.id, 'user3');
      const u4 = new User(4, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u4 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3, u4 ]
      );

      expect(setOfHashableObject.isSupersetOf(setOfHashableObjectOther)).toBe(true);
    });

  });



  describe('keys', () => {

    it('when provided Set is empty then no entries are returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      const setOfNumberResult = Array.from(
        setOfNumber.keys()
      );
      const setOfNotHashableObjectResult = Array.from(
        setOfNotHashableObject.keys()
      );
      const setOfHashableObjectResult = Array.from(
        setOfHashableObject.keys()
      );

      expect(setOfNumberResult).toHaveLength(0);
      expect(setOfNumberResult).toEqual([]);

      expect(setOfNotHashableObjectResult).toHaveLength(0);
      expect(setOfNotHashableObjectResult).toEqual([]);

      expect(setOfHashableObjectResult).toHaveLength(0);
      expect(setOfHashableObjectResult).toEqual([]);
    });


    it('when provided Set is not empty then returns correct keys', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const setOfNumberResult = Array.from(
        setOfNumber.keys()
      );
      const setOfNotHashableObjectResult = Array.from(
        setOfNotHashableObject.keys()
      );
      const setOfHashableObjectResult = Array.from(
        setOfHashableObject.keys()
      );

      expect(setOfNumberResult).toHaveLength(1);
      expect(setOfNumberResult).toContain(n);

      expect(setOfNotHashableObjectResult).toHaveLength(2);
      expect(setOfNotHashableObjectResult).toContain(r1);
      expect(setOfNotHashableObjectResult).toContain(r2);

      expect(setOfHashableObjectResult).toHaveLength(3);
      expect(setOfHashableObjectResult).toContain(u1);
      expect(setOfHashableObjectResult).toContain(u2);
      expect(setOfHashableObjectResult).toContain(u3);
    });

  });



  describe('of', () => {

    it('when no values are provided then empty Set is returned', () => {
      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals
      );

      expect(setOfNumber).not.toBeNull();
      expect(setOfNumber).not.toBeUndefined();
      expect(setOfNumber.size).toBe(0);

      expect(setOfNotHashableObject).not.toBeNull();
      expect(setOfNotHashableObject).not.toBeUndefined();
      expect(setOfNotHashableObject.size).toBe(0);

      expect(setOfHashableObject).not.toBeNull();
      expect(setOfHashableObject).not.toBeUndefined();
      expect(setOfHashableObject.size).toBe(0);
    });


    it('using provided hash and equals functions, when several values are provided then a non-empty Set containing non-repeating ones is returned', () => {
      const n1 = 19;
      const n2 = 20;
      const n3 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2, n3, n1, n3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r3, r2, r1 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3, u1, u2 ]
      );

      expect(setOfNumber).not.toBeNull();
      expect(setOfNumber).not.toBeUndefined();
      expect(setOfNumber.size).toBe(3);
      expect(setOfNumber.has(n1)).toBe(true);
      expect(setOfNumber.has(n2)).toBe(true);
      expect(setOfNumber.has(n3)).toBe(true);

      expect(setOfNotHashableObject).not.toBeNull();
      expect(setOfNotHashableObject).not.toBeUndefined();
      expect(setOfNotHashableObject.size).toBe(3);
      expect(setOfNotHashableObject.has(r1)).toBe(true);
      expect(setOfNotHashableObject.has(r2)).toBe(true);
      expect(setOfNotHashableObject.has(r3)).toBe(true);

      expect(setOfHashableObject).not.toBeNull();
      expect(setOfHashableObject).not.toBeUndefined();
      expect(setOfHashableObject.size).toBe(3);
      expect(setOfHashableObject.has(u1)).toBe(true);
      expect(setOfHashableObject.has(u2)).toBe(true);
      expect(setOfHashableObject.has(u3)).toBe(true);
    });


    it('using default hash and equals functions, when there is a common value in the set to be compared then a Set with all non-repeating values is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3, u2, u3 ]
      );

      expect(setOfHashableObject).not.toBeNull();
      expect(setOfHashableObject).not.toBeUndefined();
      expect(setOfHashableObject.size).toBe(3);
      expect(setOfHashableObject.has(u1)).toBe(true);
      expect(setOfHashableObject.has(u2)).toBe(true);
      expect(setOfHashableObject.has(u3)).toBe(true);
    });

  });



  describe('remove', () => {

    it('using provided hash and equals functions, when the value to remove does not exist then the new Set has not changed', () => {
      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user 1');
      const u2 = new User(2, 'user 2');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1 ]
      );

      const newSetOfNumber = setOfNumber.remove(n2);
      const newsetOfNotHashableObject = setOfNotHashableObject.remove(r2);
      const newSetOfHashableObject = setOfHashableObject.remove(u2);

      expect(setOfNumber.size).toBe(1);
      expect(setOfNumber.has(n1)).toBe(true);
      expect(setOfNumber.has(n2)).toBe(false);
      expect(newSetOfNumber.size).toBe(1);
      expect(newSetOfNumber.has(n1)).toBe(true);
      expect(newSetOfNumber.has(n2)).toBe(false);

      expect(setOfNotHashableObject.size).toBe(1);
      expect(setOfNotHashableObject.has(r1)).toBe(true);
      expect(setOfNotHashableObject.has(r2)).toBe(false);
      expect(newsetOfNotHashableObject.size).toBe(1);
      expect(newsetOfNotHashableObject.has(r1)).toBe(true);
      expect(newsetOfNotHashableObject.has(r2)).toBe(false);

      expect(setOfHashableObject.size).toBe(1);
      expect(setOfHashableObject.has(u1)).toBe(true);
      expect(setOfHashableObject.has(u2)).toBe(false);
      expect(newSetOfHashableObject.size).toBe(1);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(false);
    });


    it('using provided hash and equals functions, when the value to remove exists then the new Set does not contain removed value', () => {
      const n1 = 19;
      const n2 = 69;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user 1');
      const u2 = new User(2, 'user 2');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );

      const newSetOfNumber = setOfNumber.remove(n2);
      const newsetOfNotHashableObject = setOfNotHashableObject.remove(r2);
      const newSetOfHashableObject = setOfHashableObject.remove(u2);

      expect(setOfNumber.size).toBe(2);
      expect(setOfNumber.has(n1)).toBe(true);
      expect(setOfNumber.has(n2)).toBe(true);
      expect(newSetOfNumber.size).toBe(1);
      expect(newSetOfNumber.has(n1)).toBe(true);
      expect(newSetOfNumber.has(n2)).toBe(false);

      expect(setOfNotHashableObject.size).toBe(2);
      expect(setOfNotHashableObject.has(r1)).toBe(true);
      expect(setOfNotHashableObject.has(r2)).toBe(true);
      expect(newsetOfNotHashableObject.size).toBe(1);
      expect(newsetOfNotHashableObject.has(r1)).toBe(true);
      expect(newsetOfNotHashableObject.has(r2)).toBe(false);

      expect(setOfHashableObject.size).toBe(2);
      expect(setOfHashableObject.has(u1)).toBe(true);
      expect(setOfHashableObject.has(u2)).toBe(true);
      expect(newSetOfHashableObject.size).toBe(1);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(false);
    });


    it('using default hash and equals functions, when the value to remove does not exist then the new Set has not changed', () => {
      const u1 = new User(1, 'user 1');
      const u2 = new User(2, 'user 2');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1 ]
      );

      const newSetOfHashableObject = setOfHashableObject.remove(u2);

      expect(setOfHashableObject.size).toBe(1);
      expect(setOfHashableObject.has(u1)).toBe(true);
      expect(setOfHashableObject.has(u2)).toBe(false);
      expect(newSetOfHashableObject.size).toBe(1);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(false);
    });


    it('using default hash and equals functions, when the value to remove exists then the new Set does not contain removed value', () => {
      const u1 = new User(1, 'user 1');
      const u2 = new User(2, 'user 2');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2 ]
      );

      const newSetOfHashableObject = setOfHashableObject.remove(u2);

      expect(setOfHashableObject.size).toBe(2);
      expect(setOfHashableObject.has(u1)).toBe(true);
      expect(setOfHashableObject.has(u2)).toBe(true);
      expect(newSetOfHashableObject.size).toBe(1);
      expect(newSetOfHashableObject.has(u1)).toBe(true);
      expect(newSetOfHashableObject.has(u2)).toBe(false);
    });

  });



  describe('size', () => {

    it('when provided Set is empty then 0 is returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      expect(setOfNumber.size).toBe(0);
      expect(setOfNotHashableObject.size).toBe(0);
      expect(setOfHashableObject.size).toBe(0);
    });


    it('when provided Set is not empty then the number or its stored elements is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r1 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const collectedNumbers: number[] = [];
      const collectedRoleNames: string[] = [];
      const collectedUserNames: string[] = [];

      setOfNumber.forEach(
        n =>
          collectedNumbers.push(
            plus2(n)
          )
      );
      setOfNotHashableObject.forEach(
        r =>
          collectedRoleNames.push(
            getName(r)
          )
      );
      setOfHashableObject.forEach(
        u =>
          collectedUserNames.push(
            getName(u)
          )
      );

      expect(collectedNumbers).toHaveLength(1);
      expect(collectedRoleNames).toHaveLength(2);
      expect(collectedUserNames).toHaveLength(3);
    });

  });



  describe('Symbol.dispose', () => {

    it("then it works with 'using' statement", () => {
      {
        using setOfNumber = ImmutableHashSet.of<number>(
          hashNumber,
          areNumberEquals,
          [ 1 ]
        );
        setOfNumber.add(2);
      }
      /**
       * At this point, dispose should have been called automatically.
       * No direct access to set here, but no errors should occur
       */
    });

  });



  describe('Symbol.iterator', () => {

    it('when provided Set is empty then an empty Iterator is returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      const setOfNumberResult = [...setOfNumber];
      const setOfNotHashableObjectResult = [...setOfNotHashableObject];
      const setOfHashableObjectResult = [...setOfHashableObject];

      expect(setOfNumberResult).toHaveLength(0);
      expect(setOfNumberResult).toEqual([]);

      expect(setOfNotHashableObjectResult).toHaveLength(0);
      expect(setOfNotHashableObjectResult).toEqual([]);

      expect(setOfHashableObjectResult).toHaveLength(0);
      expect(setOfHashableObjectResult).toEqual([]);
    });


    it('when provided Set is not empty then it should iterate over all elements using for...of', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const setOfNumberResult: number[] = [];
      const setOfNotHashableObjectResult: Role[] = [];
      const setOfHashableObjectResult: User[] = [];

      for (const value of setOfNumber) {
        setOfNumberResult.push(
          value
        );
      }
      for (const value of setOfNotHashableObject) {
        setOfNotHashableObjectResult.push(
          value
        );
      }
      for (const value of setOfHashableObject) {
        setOfHashableObjectResult.push(
          value
        );
      }

      expect(setOfNumberResult).toHaveLength(1);
      expect(setOfNumberResult).toContain(n);

      expect(setOfNotHashableObjectResult).toHaveLength(2);
      expect(setOfNotHashableObjectResult).toContain(r1);
      expect(setOfNotHashableObjectResult).toContain(r2);

      expect(setOfHashableObjectResult).toHaveLength(3);
      expect(setOfHashableObjectResult).toContain(u1);
      expect(setOfHashableObjectResult).toContain(u2);
      expect(setOfHashableObjectResult).toContain(u3);
    });


    it('when provided Set is not empty then it should spread into an array correctly', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const setOfNumberResult = [...setOfNumber];
      const setOfNotHashableObjectResult = [...setOfNotHashableObject];
      const setOfHashableObjectResult = [...setOfHashableObject];

      expect(setOfNumberResult).toHaveLength(1);
      expect(setOfNumberResult).toContain(n);

      expect(setOfNotHashableObjectResult).toHaveLength(2);
      expect(setOfNotHashableObjectResult).toContain(r1);
      expect(setOfNotHashableObjectResult).toContain(r2);

      expect(setOfHashableObjectResult).toHaveLength(3);
      expect(setOfHashableObjectResult).toContain(u1);
      expect(setOfHashableObjectResult).toContain(u2);
      expect(setOfHashableObjectResult).toContain(u3);
    });


    it('when provided Set is not empty then it should work with Array.from()', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const setOfNumberResult = Array.from(setOfNumber);
      const setOfNotHashableObjectResult = Array.from(setOfNotHashableObject);
      const setOfHashableObjectResult = Array.from(setOfHashableObject);

      expect(setOfNumberResult).toHaveLength(1);
      expect(setOfNumberResult).toContain(n);

      expect(setOfNotHashableObjectResult).toHaveLength(2);
      expect(setOfNotHashableObjectResult).toContain(r1);
      expect(setOfNotHashableObjectResult).toContain(r2);

      expect(setOfHashableObjectResult).toHaveLength(3);
      expect(setOfHashableObjectResult).toContain(u1);
      expect(setOfHashableObjectResult).toContain(u2);
      expect(setOfHashableObjectResult).toContain(u3);
    });

  });



  describe('Symbol.toStringTag', () => {

    it('then return the custom toStringTag value', () => {
      const set = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );

      const tag = Object.prototype.toString.call(set);

      expect(tag).toBe("[object ImmutableHashSet]");
    });

  });



  describe('symmetricDifference', () => {

    it('then an error is thrown', () => {
      const set = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );

      // @ts-ignore
      expect(() => set.symmetricDifference(null)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.symmetricDifference(undefined)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.symmetricDifference([ 1 ])).toThrowError(UnsupportedOperationError);
    });

  });



  describe('symmetricDifferenceCustom', () => {

    it('when provided Sets are empty then a new Set containing the values added in other is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const setOfNumberSource = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObjectSource = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObjectSource = ImmutableHashSet.empty<User>();
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2 ]
      );

      const setOfNumberResult = setOfNumberSource.symmetricDifferenceCustom(
        [ n ]
      );
      const setOfNotHashableObjectResult = setOfNotHashableObjectSource.symmetricDifferenceCustom(
        [ r1, r2 ]
      );
      const setOfHashableObjectResult = setOfHashableObjectSource.symmetricDifferenceCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(1);
      expect(setOfNumberResult.has(n)).toBe(true);

      expect(setOfNotHashableObjectResult.size).toBe(2);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);

      expect(setOfHashableObjectResult.size).toBe(2);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
    });


    it('when provided Iterable is null, undefined or empty then the source Set is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals
      );

      const setOfNumberResult = setOfNumber.symmetricDifferenceCustom(
        null
      );
      const setOfNotHashableObjectResult = setOfNotHashableObject.symmetricDifferenceCustom(
        undefined
      );
      const setOfHashableObjectResult = setOfHashableObject.symmetricDifferenceCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(1);
      expect(setOfNumberResult.has(n)).toBe(true);

      expect(setOfNotHashableObjectResult.size).toBe(2);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);

      expect(setOfHashableObjectResult.size).toBe(2);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
    });


    it('using provided hash and equals functions, when there is no common value in the Set to compare then a new Set with all the values is returned', () => {
      const n1 = 19;
      const n2 = 20;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3 ]
      );

      const setOfNumberResult = setOfNumber.symmetricDifferenceCustom(
        [ n2 ]
      );
      const setOfNotHashableObjectResult = setOfNotHashableObject.symmetricDifferenceCustom(
        [ r3 ]
      );
      const setOfHashableObjectResult = setOfHashableObject.symmetricDifferenceCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(2);
      expect(setOfNumberResult.has(n1)).toBe(true);
      expect(setOfNumberResult.has(n2)).toBe(true);

      expect(setOfNotHashableObjectResult.size).toBe(3);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r3)).toBe(true);

      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
    });


    it('using provided hash and equals functions, when there are common values in the Set to be compared then a new Set without the values in both is returned', () => {
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
      const u5 = new User(5, 'user5');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2, n3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r3 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3, u4, u5 ]
      );

      const setOfNumberResult = setOfNumber.symmetricDifferenceCustom(
        [ n3 ]
      );
      const setOfNotHashableObjectResult = setOfNotHashableObject.symmetricDifferenceCustom(
        [ r3, r4 ]
      );
      const setOfHashableObjectResult = setOfHashableObject.symmetricDifferenceCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(2);
      expect(setOfNumberResult.has(n1)).toBe(true);
      expect(setOfNumberResult.has(n2)).toBe(true);
      expect(setOfNumberResult.has(n3)).toBe(false);

      expect(setOfNotHashableObjectResult.size).toBe(1);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(false);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r3)).toBe(false);
      expect(setOfNotHashableObjectResult.has(r4)).toBe(false);

      expect(setOfHashableObjectResult.size).toBe(2);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(false);
      expect(setOfHashableObjectResult.has(u3)).toBe(false);
      expect(setOfHashableObjectResult.has(u4)).toBe(false);
      expect(setOfHashableObjectResult.has(u5)).toBe(true);
    });


    it('using default hash and equals functions, when there is no common value in the Set to compare then a new Set with all the values is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u3 ]
      );

      const setOfHashableObjectResult = setOfHashableObject.symmetricDifferenceCustom(
        setOfHashableObjectOther
      );

      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
    });


    it('using default hash and equals functions, when there are common values in the Set to be compared then a new Set containing only the elements of the original not included in the provided one is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');
      const u5 = new User(5, 'user5');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u3, u4, u5 ]
      );

      const setOfHashableObjectResult = setOfHashableObject.symmetricDifferenceCustom(
        setOfHashableObjectOther
      );

      expect(setOfHashableObjectResult.size).toBe(2);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(false);
      expect(setOfHashableObjectResult.has(u3)).toBe(false);
      expect(setOfHashableObjectResult.has(u4)).toBe(false);
      expect(setOfHashableObjectResult.has(u5)).toBe(true);
    });

  });



  describe('toArray', () => {

    it('when provided Set is empty then an empty array is returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      const setOfNumberResult = setOfNumber.toArray();
      const setOfNotHashableObjectResult = setOfNotHashableObject.toArray();
      const setOfHashableObjectResult = setOfHashableObject.toArray();

      expect(setOfNumberResult).toHaveLength(0);
      expect(setOfNumberResult).toEqual([]);

      expect(setOfNotHashableObjectResult).toHaveLength(0);
      expect(setOfNotHashableObjectResult).toEqual([]);

      expect(setOfHashableObjectResult).toHaveLength(0);
      expect(setOfHashableObjectResult).toEqual([]);
    });


    it('when provided Set is not empty then an array containing its stored values is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const setOfNumberResult = setOfNumber.toArray();
      const setOfNotHashableObjectResult = setOfNotHashableObject.toArray();
      const setOfHashableObjectResult = setOfHashableObject.toArray();

      expect(setOfNumberResult).toHaveLength(1);
      expect(setOfNumberResult).toContain(n);

      expect(setOfNotHashableObjectResult).toHaveLength(2);
      expect(setOfNotHashableObjectResult).toContain(r1);
      expect(setOfNotHashableObjectResult).toContain(r2);

      expect(setOfHashableObjectResult).toHaveLength(3);
      expect(setOfHashableObjectResult).toContain(u1);
      expect(setOfHashableObjectResult).toContain(u2);
      expect(setOfHashableObjectResult).toContain(u3);
    });

  });



  describe('union', () => {

    it('then an error is thrown', () => {
      const set = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );

      // @ts-ignore
      expect(() => set.union(null)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.union(undefined)).toThrowError(UnsupportedOperationError);
      // @ts-ignore
      expect(() => set.union([ 1 ])).toThrowError(UnsupportedOperationError);
    });

  });



  describe('unionCustom', () => {

    it('when provided Sets are empty then an empty Set is returned', () => {
      const setOfNumberSource = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObjectSource = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObjectSource = ImmutableHashSet.empty<User>();
      const setOfHashableObjectOther = ImmutableHashSet.empty<User>();

      const setOfNumberResult = setOfNumberSource.unionCustom(
        null
      );
      const setOfNotHashableObjectResult = setOfNotHashableObjectSource.unionCustom(
        undefined
      );
      const setOfHashableObjectResult = setOfHashableObjectSource.unionCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(0);
      expect(setOfNotHashableObjectResult.size).toBe(0);
      expect(setOfHashableObjectResult.size).toBe(0);
    });


    it('when provided Iterable is null, undefined or empty then the source Set is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals
      );

      const setOfNumberResult = setOfNumber.unionCustom(
        null
      );
      const setOfNotHashableObjectResult = setOfNotHashableObject.unionCustom(
        undefined
      );
      const setOfHashableObjectResult = setOfHashableObject.unionCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(1);
      expect(setOfNumberResult.has(n)).toBe(true);

      expect(setOfNotHashableObjectResult.size).toBe(2);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);

      expect(setOfHashableObjectResult.size).toBe(2);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
    });


    it('using provided hash and equals functions, when there is no common value in the Iterable to compare then a Set with all non-repeating values is returned', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 51, name: 'role51' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3 ]
      );

      const setOfNumberResult = setOfNumber.unionCustom(
        [ n ]
      );
      const setOfNotHashableObjectResult = setOfNotHashableObject.unionCustom(
        [ r3 ]
      );
      const setOfHashableObjectResult = setOfHashableObject.unionCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(1);
      expect(setOfNumberResult.has(n)).toBe(true);

      expect(setOfNotHashableObjectResult.size).toBe(3);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r3)).toBe(true);

      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
    });


    it('using provided hash and equals functions, when there are common values in the Iterable to be compared then a Set with all non-repeating values is returned', () => {
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

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n1, n2, n3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2, r3 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u1, u2, u3 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        hashUser,
        areUsersEquals,
        [ u3, u4 ]
      );

      const setOfNumberResult = setOfNumber.unionCustom(
        [ n3 ]
      );
      const setOfNotHashableObjectResult = setOfNotHashableObject.unionCustom(
        [ r3, r4 ]
      );
      const setOfHashableObjectResult = setOfHashableObject.unionCustom(
        setOfHashableObjectOther
      );

      expect(setOfNumberResult.size).toBe(3);
      expect(setOfNumberResult.has(n1)).toBe(true);
      expect(setOfNumberResult.has(n2)).toBe(true);
      expect(setOfNumberResult.has(n3)).toBe(true);

      expect(setOfNotHashableObjectResult.size).toBe(3);
      expect(setOfNotHashableObjectResult.has(r1)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r2)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r3)).toBe(true);
      expect(setOfNotHashableObjectResult.has(r4)).toBe(true);

      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
      expect(setOfHashableObjectResult.has(u4)).toBe(true);
    });


    it('using default hash and equals functions, when there is no common value in the Iterable to compare then a Set with all non-repeating values is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u3 ]
      );

      const setOfHashableObjectResult = setOfHashableObject.unionCustom(
        setOfHashableObjectOther
      );

      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
    });


    it('using default hash and equals functions, when there is a common value in the Iterable to be compared then a Set with all non-repeating values is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');
      const u4 = new User(u2.id, 'user4');

      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );
      const setOfHashableObjectOther = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u3, u4 ]
      );

      const setOfHashableObjectResult = setOfHashableObject.unionCustom(
        setOfHashableObjectOther
      );

      expect(setOfHashableObjectResult.size).toBe(3);
      expect(setOfHashableObjectResult.has(u1)).toBe(true);
      expect(setOfHashableObjectResult.has(u2)).toBe(true);
      expect(setOfHashableObjectResult.has(u3)).toBe(true);
      expect(setOfHashableObjectResult.has(u4)).toBe(true);
    });

  });



  describe('values', () => {

    it('when provided Set is empty then no entries are returned', () => {
      const setOfNumber = ImmutableHashSet.empty<number>(
        hashNumber,
        areNumberEquals
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        hashRole,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.empty<User>();

      const setOfNumberResult = Array.from(
        setOfNumber.values()
      );
      const setOfNotHashableObjectResult = Array.from(
        setOfNotHashableObject.values()
      );
      const setOfHashableObjectResult = Array.from(
        setOfHashableObject.values()
      );

      expect(setOfNumberResult).toHaveLength(0);
      expect(setOfNumberResult).toEqual([]);

      expect(setOfNotHashableObjectResult).toHaveLength(0);
      expect(setOfNotHashableObjectResult).toEqual([]);

      expect(setOfHashableObjectResult).toHaveLength(0);
      expect(setOfHashableObjectResult).toEqual([]);
    });


    it('when provided Set is not empty then returns correct keys', () => {
      const n = 19;
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(51, 'user51');

      const setOfNumber = ImmutableHashSet.of<number>(
        hashNumber,
        areNumberEquals,
        [ n ]
      );
      const setOfNotHashableObject = ImmutableHashSet.of<Role>(
        hashRole,
        areRolesEquals,
        [ r1, r2 ]
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );

      const setOfNumberResult = Array.from(
        setOfNumber.values()
      );
      const setOfNotHashableObjectResult = Array.from(
        setOfNotHashableObject.values()
      );
      const setOfHashableObjectResult = Array.from(
        setOfHashableObject.values()
      );

      expect(setOfNumberResult).toHaveLength(1);
      expect(setOfNumberResult).toContain(n);

      expect(setOfNotHashableObjectResult).toHaveLength(2);
      expect(setOfNotHashableObjectResult).toContain(r1);
      expect(setOfNotHashableObjectResult).toContain(r2);

      expect(setOfHashableObjectResult).toHaveLength(3);
      expect(setOfHashableObjectResult).toContain(u1);
      expect(setOfHashableObjectResult).toContain(u2);
      expect(setOfHashableObjectResult).toContain(u3);
    });

  });

});



// Used only for testing purpose
class User implements Hashable {
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

  equals = (other?: Nullable<User>): boolean =>
    ObjectUtil.isNullOrUndefined(other)
      ? false
      : this._id === other.id;

  hash(): number {
    return this._id % 50;
  }

}


interface Role {
  id: number;
  name: string;
}


const areNumberEquals: EqualityFunction<number> =
  (n1: number, n2: number) => n1 == n2;


const areRolesEquals: EqualityFunction<Role> =
  (r1: Role, r2: Role) => r1.id == r2.id;


const areUsersEquals: EqualityFunction<User> =
  (u1: User, u2: User) => u1.id == u2.id && u2.name == u2.name;


const getName =
  <T extends { name: string }>(obj: T): string => obj.name;


const hashNumber: HashFunction<number> =
  (n) => n % 50;


const hashRole: HashFunction<Role> =
  (r: Role) => r.id % 50;


const hashUser: HashFunction<User> =
  (u: User) => u.id % 50;


const plus2 =
  (n: number) => n * 2;
