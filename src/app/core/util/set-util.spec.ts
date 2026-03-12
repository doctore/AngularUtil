import { ObjectUtil, SetUtil } from '@app-core/util';
import { Nullable } from '@app-core/type';
import { EqualityFunction, Hashable, HashFunction } from '@app-core/type/collection';
import { ImmutableHashSet, MutableHashSet } from '@app-core/type/collection/set';
import { FPredicate1, Predicate1 } from '@app-core/type/predicate';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/set-util.spec.ts
 */
describe('SetUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new SetUtil()).toThrowError(SyntaxError);
    });

  });



  describe('copy', () => {

    it('when given sourceSet is a native one and has no elements then empty Set is returned', () => {
      const nativeSet = new Set<number>();

      expect(SetUtil.copy(null)).toEqual(nativeSet);
      expect(SetUtil.copy(undefined)).toEqual(nativeSet);
      expect(SetUtil.copy(nativeSet)).toEqual(nativeSet);
    });


    it('when given sourceSet is a mutable one and has no elements then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();

      expect(SetUtil.copy(null)).toEqual(nativeSet);
      expect(SetUtil.copy(undefined)).toEqual(nativeSet);
      expect(SetUtil.copy(mutableHashSet)).toEqual(mutableHashSet);
    });


    it('when given sourceSet is an immutable one and has no elements then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      expect(SetUtil.copy(null)).toEqual(nativeSet);
      expect(SetUtil.copy(undefined)).toEqual(nativeSet);
      expect(SetUtil.copy(immutableHashSet)).toEqual(immutableHashSet);
    });


    it('when given sourceSet is a native one and has elements then a copy is returned', () => {
      const sourceSet = new Set<number>(
        [ 1, 2, 3, 6 ]
      );

      const result = SetUtil.copy(sourceSet);

      verifySets(
        result,
        sourceSet
      );
      sourceSet.clear();
      expect(sourceSet.size).toEqual(0);
      expect(result).toBeInstanceOf(Set);
      expect(result.size).toEqual(4);
    });


    it('when given sourceSet is a mutable one and has elements then a copy is returned', () => {
      const sourceSet = MutableHashSet.of(
        numberHash,
        areNumberEquals,
        [ 1, 2, 3, 6 ]
      );

      const result = SetUtil.copy(sourceSet);

      verifySets(
        result,
        sourceSet
      );
      sourceSet.clear();
      expect(sourceSet.size).toEqual(0);
      expect(result).toBeInstanceOf(MutableHashSet);
      expect(result.size).toEqual(4);
    });


    it('when given sourceSet is an immutable one and has elements then a copy is returned', () => {
      let sourceSet = ImmutableHashSet.of(
        numberHash,
        areNumberEquals,
        [ 1, 2, 3, 6 ]
      );

      const result = SetUtil.copy(sourceSet);

      verifySets(
        result,
        sourceSet
      );
      sourceSet = sourceSet.clear();
      expect(sourceSet.size).toEqual(0);
      expect(result).toBeInstanceOf(ImmutableHashSet);
      expect(result.size).toEqual(4);
    });

  });



  describe('filter', () => {

    it('when given sourceSet is a native one and has no elements then empty Set is returned', () => {
      const nativeSet = new Set<number>();

      expect(SetUtil.filter(null, isEvenFPredicate)).toEqual(nativeSet);
      expect(SetUtil.filter(undefined, isEvenPredicate)).toEqual(nativeSet);
      expect(SetUtil.filter(nativeSet, isEvenRaw)).toEqual(nativeSet);
    });


    it('when given sourceSet is a mutable one and has no elements then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();

      expect(SetUtil.filter(null, isEvenFPredicate)).toEqual(nativeSet);
      expect(SetUtil.filter(undefined, isEvenPredicate)).toEqual(nativeSet);
      expect(SetUtil.filter(mutableHashSet, isEvenRaw)).toEqual(mutableHashSet);
    });


    it('when given sourceSet is an immutable one and has no elements then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      expect(SetUtil.filter(null, isEvenFPredicate)).toEqual(nativeSet);
      expect(SetUtil.filter(undefined, isEvenPredicate)).toEqual(nativeSet);
      expect(SetUtil.filter(immutableHashSet, isEvenRaw)).toEqual(immutableHashSet);
    });


    it('when given sourceSet is a native one and has elements but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceSet = new Set<Role>(
        [ r1, r2, r3 ]
      );

      verifySets(
        SetUtil.filter(sourceSet, null),
        sourceSet
      );
      verifySets(
        SetUtil.filter(sourceSet, undefined),
        sourceSet
      );
    });


    it('when given sourceSet is a mutable one and has elements but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceSet = MutableHashSet.of<Role>(
        roleHash,
        areRolesEquals,
        [ r1, r2, r3 ]
      );

      verifySets(
        SetUtil.filter(sourceSet, null),
        sourceSet
      );
      verifySets(
        SetUtil.filter(sourceSet, undefined),
        sourceSet
      );
    });


    it('when given sourceSet is a immutable one and has elements but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceSet = ImmutableHashSet.of<Role>(
        roleHash,
        areRolesEquals,
        [ r1, r2, r3 ]
      );

      verifySets(
        SetUtil.filter(sourceSet, null),
        sourceSet
      );
      verifySets(
        SetUtil.filter(sourceSet, undefined),
        sourceSet
      );
    });


    it('when given sourceSet is a native one and has elements and filterPredicate is provided then filtered Set is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceSet = new Set<User>(
        [ u1, u2, u3 ]
      );
      const expectedResult = new Set<User>(
        [ u1, u3 ]
      );

      const result = SetUtil.filter(sourceSet, isUserIdOddRaw);

      verifySets(
        result,
        expectedResult
      );
      expect(result).toBeInstanceOf(Set);
    });


    it('when given sourceSet is a mutable one and has elements and filterPredicate is provided then filtered Set is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceSet = MutableHashSet.of(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );
      const expectedResult = MutableHashSet.of(
        undefined,
        undefined,
        [ u1, u3 ]
      );

      const result = SetUtil.filter(sourceSet, isUserIdOddFPredicate);

      verifySets(
        result,
        expectedResult
      );
      expect(result).toBeInstanceOf(MutableHashSet);
    });


    it('when given sourceSet is an immutable one and has elements and filterPredicate is provided then filtered Set is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceSet = ImmutableHashSet.of(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );
      const expectedResult = ImmutableHashSet.of(
        undefined,
        undefined,
        [ u1, u3 ]
      );

      const result = SetUtil.filter(sourceSet, isUserIdOddPredicate);

      verifySets(
        result,
        expectedResult
      );
      expect(result).toBeInstanceOf(ImmutableHashSet);
    });

  });



  describe('filterNot', () => {

    it('when given sourceSet is a native one and has no elements then empty Set is returned', () => {
      const nativeSet = new Set<number>();

      expect(SetUtil.filterNot(null, isEvenFPredicate)).toEqual(nativeSet);
      expect(SetUtil.filterNot(undefined, isEvenPredicate)).toEqual(nativeSet);
      expect(SetUtil.filterNot(nativeSet, isEvenRaw)).toEqual(nativeSet);
    });


    it('when given sourceSet is a mutable one and has no elements then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();

      expect(SetUtil.filterNot(null, isEvenFPredicate)).toEqual(nativeSet);
      expect(SetUtil.filterNot(undefined, isEvenPredicate)).toEqual(nativeSet);
      expect(SetUtil.filterNot(mutableHashSet, isEvenRaw)).toEqual(mutableHashSet);
    });


    it('when given sourceSet is an immutable one and has no elements then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      expect(SetUtil.filterNot(null, isEvenFPredicate)).toEqual(nativeSet);
      expect(SetUtil.filterNot(undefined, isEvenPredicate)).toEqual(nativeSet);
      expect(SetUtil.filterNot(immutableHashSet, isEvenRaw)).toEqual(immutableHashSet);
    });


    it('when given sourceSet is a native one and has elements but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceSet = new Set<Role>(
        [ r1, r2, r3 ]
      );

      verifySets(
        SetUtil.filterNot(sourceSet, null),
        sourceSet
      );
      verifySets(
        SetUtil.filterNot(sourceSet, undefined),
        sourceSet
      );
    });


    it('when given sourceSet is a mutable one and has elements but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceSet = MutableHashSet.of<Role>(
        roleHash,
        areRolesEquals,
        [ r1, r2, r3 ]
      );

      verifySets(
        SetUtil.filterNot(sourceSet, null),
        sourceSet
      );
      verifySets(
        SetUtil.filterNot(sourceSet, undefined),
        sourceSet
      );
    });


    it('when given sourceSet is a immutable one and has elements but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceSet = ImmutableHashSet.of<Role>(
        roleHash,
        areRolesEquals,
        [ r1, r2, r3 ]
      );

      verifySets(
        SetUtil.filterNot(sourceSet, null),
        sourceSet
      );
      verifySets(
        SetUtil.filterNot(sourceSet, undefined),
        sourceSet
      );
    });


    it('when given sourceSet is a native one and has elements and filterPredicate is provided then filtered Set is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceSet = new Set<User>(
        [ u1, u2, u3 ]
      );
      const expectedResult = new Set<User>(
        [ u2 ]
      );

      const result = SetUtil.filterNot(sourceSet, isUserIdOddRaw);

      verifySets(
        result,
        expectedResult
      );
      expect(result).toBeInstanceOf(Set);
    });


    it('when given sourceSet is a mutable one and has elements and filterPredicate is provided then filtered Set is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceSet = MutableHashSet.of(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );
      const expectedResult = MutableHashSet.of(
        undefined,
        undefined,
        [ u2 ]
      );

      const result = SetUtil.filterNot(sourceSet, isUserIdOddFPredicate);

      verifySets(
        result,
        expectedResult
      );
      expect(result).toBeInstanceOf(MutableHashSet);
    });


    it('when given sourceSet is an immutable one and has elements and filterPredicate is provided then filtered Set is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceSet = ImmutableHashSet.of(
        undefined,
        undefined,
        [ u1, u2, u3 ]
      );
      const expectedResult = ImmutableHashSet.of(
        undefined,
        undefined,
        [ u2 ]
      );

      const result = SetUtil.filterNot(sourceSet, isUserIdOddPredicate);

      verifySets(
        result,
        expectedResult
      );
      expect(result).toBeInstanceOf(ImmutableHashSet);
    });

  });



  describe('isAbstractSet', () => {

    it('when given input is null or undefined then false will be returned', () => {
      const expectedResult = false;

      expect(SetUtil.isAbstractSet()).toEqual(expectedResult);
      expect(SetUtil.isAbstractSet(undefined)).toEqual(expectedResult);
      expect(SetUtil.isAbstractSet(null)).toEqual(expectedResult);
    });


    it('when given input is not an AbstractSet then false will be returned', () => {
      const user = new User(1, 'user1');
      const nativeSet = new Set<number>(
        [ 1 ]
      );
      const expectedResult = false;

      expect(SetUtil.isAbstractSet(12)).toEqual(expectedResult);
      expect(SetUtil.isAbstractSet("abc")).toEqual(expectedResult);
      expect(SetUtil.isAbstractSet({})).toEqual(expectedResult);
      expect(SetUtil.isAbstractSet(user)).toEqual(expectedResult);
      expect(SetUtil.isAbstractSet(nativeSet)).toEqual(expectedResult);
    });


    it('when given input is an AbstractSet then true will be returned', () => {
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 3 ]
      );
      const immutableHashSet = ImmutableHashSet.empty<Role>(
        roleHash,
        areRolesEquals
      );

      const expectedResult = true;

      expect(SetUtil.isAbstractSet(mutableHashSet)).toEqual(expectedResult);
      expect(SetUtil.isAbstractSet(immutableHashSet)).toEqual(expectedResult);
    });

  });



  describe('isEmpty', () => {

    it('when given setToVerify is null, undefined or is an empty Set then true is returned', () => {
      const expectedResult = true;

      expect(SetUtil.isEmpty()).toEqual(expectedResult);
      expect(SetUtil.isEmpty(undefined)).toEqual(expectedResult);
      expect(SetUtil.isEmpty(null)).toEqual(expectedResult);
      expect(SetUtil.isEmpty(new Set<number>())).toEqual(expectedResult);
    });


    it('when given setToVerify contains elements then false is returned', () => {
      const role = { id: 1, name: 'role1' } as Role;
      const nativeSet = new Set<number>(
        [ 1, 2 ]
      );
      const mutableHashSet = MutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'b', 'c' ]
      );
      const immutableHashSet = ImmutableHashSet.of<Role>(
        roleHash,
        areRolesEquals,
        [ role ]
      );

      const expectedResult = false;

      expect(SetUtil.isEmpty(nativeSet)).toEqual(expectedResult);
      expect(SetUtil.isEmpty(mutableHashSet)).toEqual(expectedResult);
      expect(SetUtil.isEmpty(immutableHashSet)).toEqual(expectedResult);
    });

  });


  describe('isImmutableSet', () => {

    it('when given input is null or undefined then false will be returned', () => {
      const expectedResult = false;

      expect(SetUtil.isImmutableSet()).toEqual(expectedResult);
      expect(SetUtil.isImmutableSet(undefined)).toEqual(expectedResult);
      expect(SetUtil.isImmutableSet(null)).toEqual(expectedResult);
    });


    it('when given input is not an ImmutableSet then false will be returned', () => {
      const user = new User(1, 'user1');
      const nativeSet = new Set<number>(
        [ 1 ]
      );
      const mutableHashSet = MutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'b', 'c' ]
      );

      const expectedResult = false;

      expect(SetUtil.isImmutableSet(12)).toEqual(expectedResult);
      expect(SetUtil.isImmutableSet("abc")).toEqual(expectedResult);
      expect(SetUtil.isImmutableSet({})).toEqual(expectedResult);
      expect(SetUtil.isImmutableSet(user)).toEqual(expectedResult);
      expect(SetUtil.isImmutableSet(nativeSet)).toEqual(expectedResult);
      expect(SetUtil.isImmutableSet(mutableHashSet)).toEqual(expectedResult);
    });


    it('when given input is an ImmutableSet then true will be returned', () => {
      const setOfNumber = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 3 ]
      );
      const setOfNotHashableObject = ImmutableHashSet.empty<Role>(
        roleHash,
        areRolesEquals
      );
      const setOfHashableObject = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ new User(1, 'user1') ]
      );

      const expectedResult = true;

      expect(SetUtil.isImmutableSet(setOfNumber)).toEqual(expectedResult);
      expect(SetUtil.isImmutableSet(setOfNotHashableObject)).toEqual(expectedResult);
      expect(SetUtil.isImmutableSet(setOfHashableObject)).toEqual(expectedResult);
    });

  });



  describe('isReadonlySetLike', () => {

    it('when given input is null or undefined then false will be returned', () => {
      const expectedResult = false;

      expect(SetUtil.isReadonlySetLike()).toEqual(expectedResult);
      expect(SetUtil.isReadonlySetLike(undefined)).toEqual(expectedResult);
      expect(SetUtil.isReadonlySetLike(null)).toEqual(expectedResult);
    });


    it('when given input is not a ReadonlySetLike then false will be returned', () => {
      const user = new User(1, 'user1');

      const expectedResult = false;

      expect(SetUtil.isReadonlySetLike(12)).toEqual(expectedResult);
      expect(SetUtil.isReadonlySetLike("abc")).toEqual(expectedResult);
      expect(SetUtil.isReadonlySetLike({})).toEqual(expectedResult);
      expect(SetUtil.isReadonlySetLike(user)).toEqual(expectedResult);
    });


    it('when given input is a ReadonlySetLike then true will be returned', () => {
      const nativeSet = new Set<number>(
        [ 1 ]
      );
      const mutableHashSet = MutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'b', 'c' ]
      );
      const immutableHashSet = ImmutableHashSet.empty<Role>(
        roleHash,
        areRolesEquals
      );

      const expectedResult = true;

      expect(SetUtil.isReadonlySetLike(new Set<string>)).toEqual(expectedResult);
      expect(SetUtil.isReadonlySetLike(nativeSet)).toEqual(expectedResult);
      expect(SetUtil.isReadonlySetLike(mutableHashSet)).toEqual(expectedResult);
      expect(SetUtil.isReadonlySetLike(immutableHashSet)).toEqual(expectedResult);
    });

  });



  describe('isSet', () => {

    it('when given input is null or undefined then false will be returned', () => {
      const expectedResult = false;

      expect(SetUtil.isSet()).toEqual(expectedResult);
      expect(SetUtil.isSet(undefined)).toEqual(expectedResult);
      expect(SetUtil.isSet(null)).toEqual(expectedResult);
    });


    it('when given input is not a Set then false will be returned', () => {
      const user = new User(1, 'user1');

      const expectedResult = false;

      expect(SetUtil.isSet(12)).toEqual(expectedResult);
      expect(SetUtil.isSet("abc")).toEqual(expectedResult);
      expect(SetUtil.isSet({})).toEqual(expectedResult);
      expect(SetUtil.isSet(user)).toEqual(expectedResult);
    });


    it('when given input is a Set then true will be returned', () => {
      const nativeSet = new Set<number>(
        [ 1 ]
      );
      const mutableHashSet = MutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'b', 'c' ]
      );
      const immutableHashSet = ImmutableHashSet.empty<Role>(
        roleHash,
        areRolesEquals
      );

      const expectedResult = true;

      expect(SetUtil.isSet(new Set<string>)).toEqual(expectedResult);
      expect(SetUtil.isSet(nativeSet)).toEqual(expectedResult);
      expect(SetUtil.isSet(mutableHashSet)).toEqual(expectedResult);
      expect(SetUtil.isSet(immutableHashSet)).toEqual(expectedResult);
    });

  });



  describe('toArray', () => {

    it('when given sourceSet is empty then an empty array is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<string>(
        stringHash,
        areStringEquals
      );
      const immutableHashSet = ImmutableHashSet.empty<Role>(
        roleHash,
        areRolesEquals
      );

      expect(SetUtil.toArray(nativeSet)).toEqual([]);
      expect(SetUtil.toArray(mutableHashSet)).toEqual([]);
      expect(SetUtil.toArray(immutableHashSet)).toEqual([]);
    });


    it('when given sourceSet is an AbstractSet with elements then an array containing them is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const mutableHashSet = MutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'b', 'c' ]
      );
      const immutableHashSet = ImmutableHashSet.of<Role>(
        roleHash,
        areRolesEquals,
        [ r1, r2, r3 ]
      );

      verifyArraysRegardlessOfOrder(
        SetUtil.toArray(mutableHashSet),
        [ 'a', 'b', 'c' ]
      );
      verifyArraysRegardlessOfOrder(
        SetUtil.toArray(immutableHashSet),
        [ r1, r2, r3 ]
      );
    });


    it('when given sourceSet is not an AbstractSet with elements then an array containing them is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const nativeNumberSet = new Set<number>(
        [ 1, 3, 6 ]
      );
      const nativeUserSet = new Set<User>(
        [ u1, u2, u3 ]
      );

      verifyArraysRegardlessOfOrder(
        SetUtil.toArray(nativeNumberSet),
        [ 1, 3, 6 ]
      );
      verifyArraysRegardlessOfOrder(
        SetUtil.toArray(nativeUserSet),
        [ u1, u2, u3 ]
      );
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



function verifyArraysRegardlessOfOrder(actualArray: unknown[],
                                       expectedArray: unknown[]) {
  expect(expectedArray.length).toEqual(actualArray.length);
  if (0 < expectedArray.length) {
    expect(expectedArray).toEqual(expect.arrayContaining(actualArray));
  }
}


function verifySets(actualSet: Set<unknown>,
                    expectedSet: Set<unknown>) {
  expect(expectedSet.size).toEqual(actualSet.size);
  if (0 < expectedSet.size) {
    for (const v of expectedSet) {
      expect(actualSet.has(v)).toEqual(true);
    }
  }
}


const areNumberEquals: EqualityFunction<number> =
  (n1: number, n2: number) => n1 == n2;


const areRolesEquals: EqualityFunction<Role> =
  (r1: Role, r2: Role) => r1.id == r2.id;


const areStringEquals: EqualityFunction<string> =
  (s1: string, s2: string) => s1 == s2;


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


const isRoleIdOddRaw =
  (role: Role) => 1 == role.id % 2;


const isUserIdOddFPredicate: FPredicate1<User> =
  (user: User) => 1 == user.id % 2;


const isUserIdOddPredicate: Predicate1<User> =
  Predicate1.of((user: User) => 1 == user.id % 2);


const isUserIdOddRaw =
  (user: User) => 1 == user.id % 2;


const numberHash: HashFunction<number> =
  (n: number) => n % 50;


const roleHash: HashFunction<Role> =
  (r: Role) => r.id % 50;


const stringHash: HashFunction<string> =
  (s: string) => (s.length + s.charCodeAt(0)) % 50;
