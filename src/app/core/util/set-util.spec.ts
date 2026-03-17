import { ObjectUtil, SetUtil } from '@app-core/util';
import { Nullable, NullableOrUndefined } from '@app-core/type';
import { EqualityFunction, Hashable, HashFunction } from '@app-core/type/collection';
import { ImmutableHashSet, MutableHashSet } from '@app-core/type/collection/set';
import { FPredicate1, Predicate1 } from '@app-core/type/predicate';
import { Comparator, FComparator } from '@app-core/type/comparator';
import { FFunction1, FFunction2, Function1, Function2 } from '@app-core/type/function';
import { IllegalArgumentError } from '@app-core/error';
import { BinaryOperator, FBinaryOperator } from '@app-core/type/function/operator';

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

    it('when given sourceSet is null, undefined or an empty native one then empty Set is returned', () => {
      const nativeSet = new Set<number>();

      expect(SetUtil.copy(null)).toEqual(nativeSet);
      expect(SetUtil.copy(undefined)).toEqual(nativeSet);
      expect(SetUtil.copy(nativeSet)).toEqual(nativeSet);
    });


    it('when given sourceSet is null, undefined or an empty mutable one then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();

      expect(SetUtil.copy(null)).toEqual(nativeSet);
      expect(SetUtil.copy(undefined)).toEqual(nativeSet);
      expect(SetUtil.copy(mutableHashSet)).toEqual(mutableHashSet);
    });


    it('when given sourceSet is null, undefined or an empty immutable one then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      expect(SetUtil.copy(null)).toEqual(nativeSet);
      expect(SetUtil.copy(undefined)).toEqual(nativeSet);
      expect(SetUtil.copy(immutableHashSet)).toEqual(immutableHashSet);
    });


    it('when given sourceSet is a non-empty native one then a copy is returned', () => {
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


    it('when given sourceSet is a non-empty mutable one then a copy is returned', () => {
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


    it('when given sourceSet is an non-empty immutable one then a copy is returned', () => {
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



  describe('count', () => {

    it('when given sourceSet is null, undefined or an empty Set then 0 is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      expect(SetUtil.count(null, isEvenFPredicate)).toEqual(0);
      expect(SetUtil.count(undefined, isEvenPredicate)).toEqual(0);
      expect(SetUtil.count(nativeSet, isEvenRaw)).toEqual(0);
      expect(SetUtil.count(mutableHashSet, isEvenRaw)).toEqual(0);
      expect(SetUtil.count(immutableHashSet, isEvenRaw)).toEqual(0);
    });


    it('when given sourceSet is a non-empty native one but filterPredicate is null or undefined then size of sourceSet is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceSet = new Set<User>(
        [ u1, u2, u3 ]
      );

      expect(SetUtil.count(sourceSet, null)).toEqual(sourceSet.size);
      expect(SetUtil.count(sourceSet, undefined)).toEqual(sourceSet.size);
    });


    it('when given sourceSet is a non-empty mutable one but filterPredicate is null or undefined then size of sourceSet is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceSet = MutableHashSet.of<User>(
        roleHash,
        areRolesEquals,
        [ u1, u2, u3 ]
      );

      expect(SetUtil.count(sourceSet, null)).toEqual(sourceSet.size);
      expect(SetUtil.count(sourceSet, undefined)).toEqual(sourceSet.size);
    });


    it('when given sourceSet is a non-empty immutable one but filterPredicate is null or undefined then size of sourceSet is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceSet = ImmutableHashSet.of<User>(
        roleHash,
        areRolesEquals,
        [ u1, u2, u3 ]
      );

      expect(SetUtil.count(sourceSet, null)).toEqual(sourceSet.size);
      expect(SetUtil.count(sourceSet, undefined)).toEqual(sourceSet.size);
    });


    it('when given sourceSet is a non-empty native one and filterPredicate is provided then the number of elements matching filterPredicate is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceSet = new Set<Role>(
        [ r1, r2, r3 ]
      );

      expect(SetUtil.count(sourceSet, isRoleIdOddRaw)).toEqual(2);
    });


    it('when given sourceSet is a non-empty mutable one and filterPredicate is provided then the number of elements matching filterPredicate is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceSet = new Set<Role>(
        [ r1, r2, r3 ]
      );

      expect(SetUtil.count(sourceSet, isRoleIdOddFPredicate)).toEqual(2);
    });


    it('when given sourceSet is an non-empty immutable one and filterPredicate is provided then the number of elements matching filterPredicate is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceSet = new Set<Role>(
        [ r1, r2, r3 ]
      );

      expect(SetUtil.count(sourceSet, isRoleIdOddPredicate)).toEqual(2);
    });

  });



  describe('filter', () => {

    it('when given sourceSet is null, undefined or an empty Set then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      expect(SetUtil.filter(null, isEvenFPredicate)).toEqual(nativeSet);
      expect(SetUtil.filter(undefined, isEvenPredicate)).toEqual(nativeSet);
      expect(SetUtil.filter(nativeSet, isEvenRaw)).toEqual(nativeSet);
      expect(SetUtil.filter(mutableHashSet, isEvenRaw)).toEqual(mutableHashSet);
      expect(SetUtil.filter(immutableHashSet, isEvenRaw)).toEqual(immutableHashSet);
    });


    it('when given sourceSet is a non-empty native one but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
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


    it('when given sourceSet is a non-empty mutable one but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
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


    it('when given sourceSet is a non-empty immutable one but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
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


    it('when given sourceSet is a non-empty native one and filterPredicate is provided then filtered Set is returned', () => {
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


    it('when given sourceSet is a non-empty mutable one and filterPredicate is provided then filtered Set is returned', () => {
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


    it('when given sourceSet is an non-empty immutable one and filterPredicate is provided then filtered Set is returned', () => {
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

    it('when given sourceSet is null, undefined or an empty Set then empty Set is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      expect(SetUtil.filterNot(null, isEvenFPredicate)).toEqual(nativeSet);
      expect(SetUtil.filterNot(undefined, isEvenPredicate)).toEqual(nativeSet);
      expect(SetUtil.filterNot(nativeSet, isEvenRaw)).toEqual(nativeSet);
      expect(SetUtil.filterNot(mutableHashSet, isEvenRaw)).toEqual(mutableHashSet);
      expect(SetUtil.filterNot(immutableHashSet, isEvenRaw)).toEqual(immutableHashSet);
    });


    it('when given sourceSet is a non-empty native one but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
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


    it('when given sourceSet is a non-empty mutable one but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
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


    it('when given sourceSet is a non-empty immutable one but filterPredicate is null or undefined then a copy of sourceSet is returned', () => {
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


    it('when given sourceSet is a non-empty native one and filterPredicate is provided then filtered Set is returned', () => {
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


    it('when given sourceSet is a non-empty mutable one and filterPredicate is provided then filtered Set is returned', () => {
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


    it('when given sourceSet is an non-empty immutable one and filterPredicate is provided then filtered Set is returned', () => {
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



  describe('foldLeft', () => {

    it('when given sourceSet is null, undefined or an empty Set then initialValue is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();
      const initialValue = 19;

      const accumulator =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(SetUtil.foldLeft(null, initialValue, accumulator)).toEqual(initialValue);
      expect(SetUtil.foldLeft(undefined, initialValue, accumulator)).toEqual(initialValue);
      expect(SetUtil.foldLeft(nativeSet, initialValue, accumulator)).toEqual(initialValue);
      expect(SetUtil.foldLeft(mutableHashSet, initialValue, accumulator)).toEqual(initialValue);
      expect(SetUtil.foldLeft(immutableHashSet, initialValue, accumulator)).toEqual(initialValue);
    });


    it('when given sourceSet is a non-empty native one but when accumulator is null or undefined then initialValue is returned', () => {
      const nativeSet = new Set<number>(
        [ 1 ]
      );
      const initialValue = 19;

      expect(SetUtil.foldLeft(nativeSet, initialValue, null)).toEqual(initialValue);
      expect(SetUtil.foldLeft(nativeSet, initialValue, undefined)).toEqual(initialValue);
    });


    it('when given sourceSet is a non-empty mutable one but when accumulator is null or undefined then initialValue is returned', () => {
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1 ]
      );
      const initialValue = 19;

      expect(SetUtil.foldLeft(mutableHashSet, initialValue, null)).toEqual(initialValue);
      expect(SetUtil.foldLeft(mutableHashSet, initialValue, undefined)).toEqual(initialValue);
    });


    it('when given sourceSet is an non-empty immutable one but when accumulator is null or undefined then initialValue is returned', () => {
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1 ]
      );
      const initialValue = 19;

      expect(SetUtil.foldLeft(immutableHashSet, initialValue, null)).toEqual(initialValue);
      expect(SetUtil.foldLeft(immutableHashSet, initialValue, undefined)).toEqual(initialValue);
    });


    it('when given sourceSet is a non-empty native one and accumulator is provided then initialValue applying accumulator is returned', () => {
      const nativeSet = new Set<number>(
        [ 2, 3, 4 ]
      );
      const initialValue = 10;

      const accumulator =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(SetUtil.foldLeft(nativeSet, initialValue, accumulator)).toEqual(240);
    });


    it('when given sourceSet is a non-empty mutable one and accumulator is provided then initialValue applying accumulator is returned', () => {
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 2, 3, 4 ]
      );
      const initialValue = 10;

      const accumulator: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(SetUtil.foldLeft(mutableHashSet, initialValue, accumulator)).toEqual(240);
    });


    it('when given sourceSet is a non-empty immutable one and accumulator is provided then initialValue applying accumulator is returned', () => {
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 2, 3, 4 ]
      );
      const initialValue = 10;

      const accumulator: Function2<number, number, number> =
        Function2.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!);

      expect(SetUtil.foldLeft(immutableHashSet, initialValue, accumulator)).toEqual(240);
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

    it('when given setToVerify is null, undefined or an empty Set then true is returned', () => {
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



  describe('max', () => {

    it('when given sourceSet is null, undefined or an empty Set and comparator is not provided then undefined is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      // @ts-ignore
      expect(SetUtil.max(null, null)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.max(undefined, undefined)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.max(nativeSet, null)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.max(nativeSet, undefined)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.max(mutableHashSet, null)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.max(mutableHashSet, undefined)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.max(immutableHashSet, null)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.max(immutableHashSet, undefined)).toBe(undefined);
    });


    it('when given sourceSet is null, undefined or an empty Set and comparator is provided then undefined is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      const comparator: FComparator<number> =
        (a: number, b: number) => a - b;

      expect(SetUtil.max(null, comparator)).toBe(undefined);
      expect(SetUtil.max(undefined, comparator)).toBe(undefined);
      expect(SetUtil.max(nativeSet, comparator)).toBe(undefined);
      expect(SetUtil.max(mutableHashSet, comparator)).toBe(undefined);
      expect(SetUtil.max(immutableHashSet, comparator)).toBe(undefined);
    });


    it('when given sourceSet is not empty but comparator is null or undefined then an error is thrown', () => {
      const nativeSet = new Set<number>(
        [ 1, 2 ]
      );
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2 ]
      );
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2 ]
      );

      // @ts-ignore
      expect(() => SetUtil.max(nativeSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.max(nativeSet, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.max(mutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.max(mutableHashSet, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.max(immutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.max(immutableHashSet, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty native one and comparator is provided then its largest value is returned', () => {
      const nativeSet = new Set<NullableOrUndefined<string>>(
        [ 'a', 'ab', null, undefined, 'abc', 'zz' ]
      );
      const stringComparator =
        (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
          {
            const s1Length = !s1 ? 0 : s1.length;
            const s2Length = !s2 ? 0 : s2.length;
            return s1Length - s2Length;
          };

      expect(SetUtil.max(nativeSet, stringComparator)).toEqual('abc');
    });


    it('when given sourceSet is a non-empty mutable one and comparator is provided then its largest value is returned', () => {
      const mutableSet = MutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'ab', 'abc', 'zz' ]
      );
      const stringComparator: FComparator<NullableOrUndefined<string>> =
        (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
        {
          const s1Length = !s1 ? 0 : s1.length;
          const s2Length = !s2 ? 0 : s2.length;
          return s1Length - s2Length;
        };

      expect(SetUtil.max(mutableSet, stringComparator)).toEqual('abc');
    });


    it('when given sourceSet is a non-empty immutable one and comparator is provided then its largest value is returned', () => {
      const immutableSet = ImmutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'ab', 'abc', 'zz' ]
      );
      const stringComparator: Comparator<NullableOrUndefined<string>> =
        Comparator.of(
          (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
          {
            const s1Length = !s1 ? 0 : s1.length;
            const s2Length = !s2 ? 0 : s2.length;
            return s1Length - s2Length;
          }
        );

      expect(SetUtil.max(immutableSet, stringComparator)).toEqual('abc');
    });

  });



  describe('maxOptional', () => {

    it('when given sourceSet is null, undefined or an empty Set and comparator is not provided then empty Optional is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      // @ts-ignore
      expect(SetUtil.maxOptional(null, null).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.maxOptional(undefined, undefined).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.maxOptional(nativeSet, null).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.maxOptional(nativeSet, undefined).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.maxOptional(mutableHashSet, null).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.maxOptional(mutableHashSet, undefined).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.maxOptional(immutableHashSet, null).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.maxOptional(immutableHashSet, undefined).isPresent()).toBe(false);
    });


    it('when given sourceSet is null, undefined or an empty Set and comparator is provided then empty Optional is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      const comparator: FComparator<number> =
        (a: number, b: number) => a - b;

      expect(SetUtil.maxOptional(null, comparator).isPresent()).toBe(false);
      expect(SetUtil.maxOptional(undefined, comparator).isPresent()).toBe(false);
      expect(SetUtil.maxOptional(nativeSet, comparator).isPresent()).toBe(false);
      expect(SetUtil.maxOptional(mutableHashSet, comparator).isPresent()).toBe(false);
      expect(SetUtil.maxOptional(immutableHashSet, comparator).isPresent()).toBe(false);
    });


    it('when given sourceSet is not empty but comparator is null or undefined then an error is thrown', () => {
      const nativeSet = new Set<number>(
        [ 1, 2 ]
      );
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2 ]
      );
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2 ]
      );

      // @ts-ignore
      expect(() => SetUtil.maxOptional(nativeSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.maxOptional(nativeSet, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.maxOptional(mutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.maxOptional(mutableHashSet, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.maxOptional(immutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.maxOptional(immutableHashSet, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty native one and comparator is provided then an Optional with its largest value is returned', () => {
      const nativeSet = new Set<NullableOrUndefined<string>>(
        [ 'a', 'ab', null, undefined, 'abc', 'zz' ]
      );
      const stringComparator =
        (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
        {
          const s1Length = !s1 ? 0 : s1.length;
          const s2Length = !s2 ? 0 : s2.length;
          return s1Length - s2Length;
        };

      const result = SetUtil.maxOptional(nativeSet, stringComparator);

      expect(result.isPresent()).toBe(true);
      expect(result.get()).toEqual('abc');
    });


    it('when given sourceSet is a non-empty mutable one and comparator is provided then an Optional with its largest value is returned', () => {
      const mutableSet = MutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'ab', 'abc', 'zz' ]
      );
      const stringComparator: FComparator<NullableOrUndefined<string>> =
        (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
        {
          const s1Length = !s1 ? 0 : s1.length;
          const s2Length = !s2 ? 0 : s2.length;
          return s1Length - s2Length;
        };

      const result = SetUtil.maxOptional(mutableSet, stringComparator);

      expect(result.isPresent()).toBe(true);
      expect(result.get()).toEqual('abc');
    });


    it('when given sourceSet is a non-empty immutable one and comparator is provided then an Optional with its largest value is returned', () => {
      const immutableSet = ImmutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'ab', 'abc', 'zz' ]
      );
      const stringComparator: Comparator<NullableOrUndefined<string>> =
        Comparator.of(
          (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
          {
            const s1Length = !s1 ? 0 : s1.length;
            const s2Length = !s2 ? 0 : s2.length;
            return s1Length - s2Length;
          }
        );

      const result = SetUtil.maxOptional(immutableSet, stringComparator);

      expect(result.isPresent()).toBe(true);
      expect(result.get()).toEqual('abc');
    });

  });



  describe('min', () => {

    it('when given sourceSet is null, undefined or an empty Set and comparator is not provided then undefined is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      // @ts-ignore
      expect(SetUtil.min(null, null)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.min(undefined, undefined)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.min(nativeSet, null)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.min(nativeSet, undefined)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.min(mutableHashSet, null)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.min(mutableHashSet, undefined)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.min(immutableHashSet, null)).toBe(undefined);
      // @ts-ignore
      expect(SetUtil.min(immutableHashSet, undefined)).toBe(undefined);
    });


    it('when given sourceSet is null, undefined or an empty Set and comparator is provided then undefined is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      const comparator: FComparator<number> =
        (a: number, b: number) => a - b;

      expect(SetUtil.min(null, comparator)).toBe(undefined);
      expect(SetUtil.min(undefined, comparator)).toBe(undefined);
      expect(SetUtil.min(nativeSet, comparator)).toBe(undefined);
      expect(SetUtil.min(mutableHashSet, comparator)).toBe(undefined);
      expect(SetUtil.min(immutableHashSet, comparator)).toBe(undefined);
    });


    it('when given sourceSet is not empty but comparator is null or undefined then an error is thrown', () => {
      const nativeSet = new Set<number>(
        [ 1, 2 ]
      );
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2 ]
      );
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2 ]
      );

      // @ts-ignore
      expect(() => SetUtil.min(nativeSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.min(nativeSet, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.min(mutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.min(mutableHashSet, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.min(immutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.min(immutableHashSet, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty native one and comparator is provided then its smallest value is returned', () => {
      const nativeSet = new Set<NullableOrUndefined<string>>(
        [ 'a', 'ab', null, undefined, 'abc', 'zz' ]
      );
      const stringComparator =
        (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
        {
          const s1Length = !s1 ? 0 : s1.length;
          const s2Length = !s2 ? 0 : s2.length;
          return s1Length - s2Length;
        };

      expect(SetUtil.min(nativeSet, stringComparator)).toBeNull();
    });


    it('when given sourceSet is a non-empty mutable one and comparator is provided then its smallest value is returned', () => {
      const mutableSet = MutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'ab', 'abc', 'zz' ]
      );
      const stringComparator: FComparator<NullableOrUndefined<string>> =
        (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
        {
          const s1Length = !s1 ? 0 : s1.length;
          const s2Length = !s2 ? 0 : s2.length;
          return s1Length - s2Length;
        };

      expect(SetUtil.min(mutableSet, stringComparator)).toEqual('a');
    });


    it('when given sourceSet is a non-empty immutable one and comparator is provided then its smallest value is returned', () => {
      const immutableSet = ImmutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'ab', 'abc', 'zz' ]
      );
      const stringComparator: Comparator<NullableOrUndefined<string>> =
        Comparator.of(
          (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
          {
            const s1Length = !s1 ? 0 : s1.length;
            const s2Length = !s2 ? 0 : s2.length;
            return s1Length - s2Length;
          }
        );

      expect(SetUtil.min(immutableSet, stringComparator)).toEqual('a');
    });

  });



  describe('minOptional', () => {

    it('when given sourceSet is null, undefined or an empty Set and comparator is not provided then empty Optional is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      // @ts-ignore
      expect(SetUtil.minOptional(null, null).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.minOptional(undefined, undefined).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.minOptional(nativeSet, null).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.minOptional(nativeSet, undefined).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.minOptional(mutableHashSet, null).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.minOptional(mutableHashSet, undefined).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.minOptional(immutableHashSet, null).isPresent()).toBe(false);
      // @ts-ignore
      expect(SetUtil.minOptional(immutableHashSet, undefined).isPresent()).toBe(false);
    });


    it('when given sourceSet is null, undefined or an empty Set and comparator is provided then empty Optional is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      const comparator: FComparator<number> =
        (a: number, b: number) => a - b;

      expect(SetUtil.minOptional(null, comparator).isPresent()).toBe(false);
      expect(SetUtil.minOptional(undefined, comparator).isPresent()).toBe(false);
      expect(SetUtil.minOptional(nativeSet, comparator).isPresent()).toBe(false);
      expect(SetUtil.minOptional(mutableHashSet, comparator).isPresent()).toBe(false);
      expect(SetUtil.minOptional(immutableHashSet, comparator).isPresent()).toBe(false);
    });


    it('when given sourceSet is not empty but comparator is null or undefined then an error is thrown', () => {
      const nativeSet = new Set<number>(
        [ 1, 2 ]
      );
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2 ]
      );
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2 ]
      );

      // @ts-ignore
      expect(() => SetUtil.minOptional(nativeSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.minOptional(nativeSet, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.minOptional(mutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.minOptional(mutableHashSet, undefined)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.minOptional(immutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.minOptional(immutableHashSet, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty native one and comparator is provided then an Optional with its smallest value is returned', () => {
      const nativeSet = new Set<NullableOrUndefined<string>>(
        [ 'a', 'ab', null, undefined, 'abc', 'zz' ]
      );
      const stringComparator =
        (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
        {
          const s1Length = !s1 ? 0 : s1.length;
          const s2Length = !s2 ? 0 : s2.length;
          return s1Length - s2Length;
        };

      const result = SetUtil.minOptional(nativeSet, stringComparator);

      expect(result.isPresent()).toBe(false);
    });


    it('when given sourceSet is a non-empty mutable one and comparator is provided then an Optional with its smallest value is returned', () => {
      const mutableSet = MutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'ab', 'abc', 'zz' ]
      );
      const stringComparator: FComparator<NullableOrUndefined<string>> =
        (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
        {
          const s1Length = !s1 ? 0 : s1.length;
          const s2Length = !s2 ? 0 : s2.length;
          return s1Length - s2Length;
        };

      const result = SetUtil.minOptional(mutableSet, stringComparator);

      expect(result.isPresent()).toBe(true);
      expect(result.get()).toEqual('a');
    });


    it('when given sourceSet is a non-empty immutable one and comparator is provided then an Optional with its smallest value is returned', () => {
      const immutableSet = ImmutableHashSet.of<string>(
        stringHash,
        areStringEquals,
        [ 'a', 'ab', 'abc', 'zz' ]
      );
      const stringComparator: Comparator<NullableOrUndefined<string>> =
        Comparator.of(
          (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
          {
            const s1Length = !s1 ? 0 : s1.length;
            const s2Length = !s2 ? 0 : s2.length;
            return s1Length - s2Length;
          }
        );

      const result = SetUtil.minOptional(immutableSet, stringComparator);

      expect(result.isPresent()).toBe(true);
      expect(result.get()).toEqual('a');
    });

  });



  describe('reduce', () => {

    it('when given sourceSet is null, undefined or an empty Set then undefined is returned', () => {
      const nativeSet = new Set<number>();
      const mutableHashSet = MutableHashSet.empty<number>();
      const immutableHashSet = ImmutableHashSet.empty<number>();

      const accumulator =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(SetUtil.reduce(null, accumulator)).toBe(undefined);
      expect(SetUtil.reduce(undefined, accumulator)).toBe(undefined);
      expect(SetUtil.reduce(nativeSet, accumulator)).toBe(undefined);
      expect(SetUtil.reduce(mutableHashSet, accumulator)).toBe(undefined);
      expect(SetUtil.reduce(immutableHashSet, accumulator)).toBe(undefined);
    });


    it('when given sourceSet is a non-empty native one but accumulator is null or undefined then an error is thrown', () => {
      const nativeSet = new Set<number>(
        [ 2 ]
      );

      // @ts-ignore
      expect(() => SetUtil.reduce(nativeSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.reduce(nativeSet, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty mutable one but accumulator is null or undefined then an error is thrown', () => {
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 2 ]
      );

      // @ts-ignore
      expect(() => SetUtil.reduce(mutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.reduce(mutableHashSet, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty immutable one but accumulator is null or undefined then an error is thrown', () => {
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 2 ]
      );

      // @ts-ignore
      expect(() => SetUtil.reduce(immutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.reduce(immutableHashSet, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty native one and accumulator is provided then accumulator is applied to contained elements', () => {
      const nativeSet = new Set<number>(
        [ 2, 3, 4 ]
      );

      const accumulator =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(SetUtil.reduce(nativeSet, accumulator)).toEqual(24);
    });


    it('when given sourceSet is a non-empty mutable one and accumulator is provided then accumulator is applied to contained elements', () => {
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 2, 3, 4 ]
      );

      const accumulator: FBinaryOperator<number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(SetUtil.reduce(mutableHashSet, accumulator)).toEqual(24);
    });


    it('when given sourceSet is a non-empty immutable one and accumulator is provided then accumulator is applied to contained elements', () => {
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 2, 3, 4 ]
      );

      const accumulator: BinaryOperator<number> =
        BinaryOperator.of((n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!);

      expect(SetUtil.reduce(immutableHashSet, accumulator)).toEqual(24);
    });

  });



  describe('sort', () => {

    it('when given sourceSet is null, undefined or an empty native one then empty array is returned', () => {
      const nativeSet = new Set<number>();
      const comparator =
        (a: number, b: number) => a - b;

      const expectedResult: number[] = [];

      expect(SetUtil.sort(null)).toEqual(expectedResult);
      expect(SetUtil.sort(undefined)).toEqual(expectedResult);
      expect(SetUtil.sort(nativeSet)).toEqual(expectedResult);

      expect(SetUtil.sort(null, comparator)).toEqual(expectedResult);
      expect(SetUtil.sort(undefined, comparator)).toEqual(expectedResult);
      expect(SetUtil.sort(nativeSet, comparator)).toEqual(expectedResult);
    });


    it('when given sourceSet is null, undefined or an empty mutable one then empty array is returned', () => {
      const mutableHashSet = MutableHashSet.empty<number>();
      const comparator: FComparator<number> =
        (a, b) => a - b;

      const expectedResult: number[] = [];

      expect(SetUtil.sort(null)).toEqual(expectedResult);
      expect(SetUtil.sort(undefined)).toEqual(expectedResult);
      expect(SetUtil.sort(mutableHashSet)).toEqual(expectedResult);

      expect(SetUtil.sort(null, comparator)).toEqual(expectedResult);
      expect(SetUtil.sort(undefined, comparator)).toEqual(expectedResult);
      expect(SetUtil.sort(mutableHashSet, comparator)).toEqual(expectedResult);
    });


    it('when given sourceSet is null, undefined or an empty immutable one then empty array is returned', () => {
      const immutableHashSet = ImmutableHashSet.empty<number>();
      const comparator: Comparator<number> =
        Comparator.of((a, b) => a - b);

      const expectedResult: number[] = [];

      expect(SetUtil.sort(null)).toEqual(expectedResult);
      expect(SetUtil.sort(undefined)).toEqual(expectedResult);
      expect(SetUtil.sort(immutableHashSet)).toEqual(expectedResult);

      expect(SetUtil.sort(null, comparator)).toEqual(expectedResult);
      expect(SetUtil.sort(undefined, comparator)).toEqual(expectedResult);
      expect(SetUtil.sort(immutableHashSet, comparator)).toEqual(expectedResult);
    });


    it('when given sourceSet is a non-empty native one but comparator is null or undefined then default sort is applied', () => {
      const nativeSet = new Set<number>(
        [ 1, 10, 21, 2 ]
      );

      const expectedResult = [ 1, 10, 2, 21 ];

      verifyArrays(
        SetUtil.sort(nativeSet),
        expectedResult
      );
      verifyArrays(
        SetUtil.sort(nativeSet, undefined),
        expectedResult
      );
      verifyArrays(
        SetUtil.sort(nativeSet, null),
        expectedResult
      );
    });


    it('when given sourceSet is a non-empty mutable one but comparator is null or undefined then default sort is applied', () => {
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 10, 21, 2 ]
      );

      const expectedResult = [ 1, 10, 2, 21 ];

      verifyArrays(
        SetUtil.sort(mutableHashSet),
        expectedResult
      );
      verifyArrays(
        SetUtil.sort(mutableHashSet, undefined),
        expectedResult
      );
      verifyArrays(
        SetUtil.sort(mutableHashSet, null),
        expectedResult
      );
    });


    it('when given sourceSet is an non-empty immutable one but comparator is null or undefined then default sort is applied', () => {
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 10, 21, 2 ]
      );

      const expectedResult = [ 1, 10, 2, 21 ];

      verifyArrays(
        SetUtil.sort(immutableHashSet),
        expectedResult
      );
      verifyArrays(
        SetUtil.sort(immutableHashSet, undefined),
        expectedResult
      );
      verifyArrays(
        SetUtil.sort(immutableHashSet, null),
        expectedResult
      );
    });


    it('when given sourceSet is a not empty native one and comparator is provided then the sorted array using comparator is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const nativeSet = new Set<Role>(
        [ r2, r3, r1 ]
      );
      const comparator =
        (a: Role, b: Role) => a.id - b.id;

      verifyArrays(
        SetUtil.sort(nativeSet, comparator),
        [ r1, r2, r3 ]
      );
    });


    it('when given sourceSet is a not empty mutable one and comparator is provided then the sorted array using comparator is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const mutableHashSet = MutableHashSet.of<Role>(
        roleHash,
        areRolesEquals,
        [ r2, r3, r1 ]
      );
      const comparator: FComparator<Role> =
        (a, b) => b.id - a.id;

      verifyArrays(
        SetUtil.sort(mutableHashSet, comparator),
        [ r3, r2, r1 ]
      );
    });


    it('when given sourceSet is a not empty immutable one and comparator is provided then the sorted array using comparator is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const immutableHashSet = ImmutableHashSet.of<User>(
        undefined,
        undefined,
        [ u3, u1, u2 ]
      );
      const comparator: Comparator<User> =
        Comparator.of((a, b) => a.id - b.id);

      verifyArrays(
        SetUtil.sort(immutableHashSet, comparator),
        [ u1, u2, u3 ]
      );
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



  describe('toMap', () => {

    it('when given sourceSet is null, undefined or an empty native one then empty Map is returned', () => {
      const nativeSet = new Set<number>();
      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(SetUtil.toMap(null, sameNumberRaw)).toEqual(expectedResult);
      expect(SetUtil.toMap(undefined, sameNumberRaw)).toEqual(expectedResult);

      expect(SetUtil.toMap(nativeSet, sameNumberRaw)).toEqual(expectedResult);
      expect(SetUtil.toMap(nativeSet, sameNumberFFunction)).toEqual(expectedResult);

      expect(SetUtil.toMap(nativeSet, sameNumberRaw, plus1Raw)).toEqual(expectedResult);
      expect(SetUtil.toMap(nativeSet, sameNumberFFunction, plus1FFunction)).toEqual(expectedResult);
    });


    it('when given sourceSet is null, undefined or an empty mutable one then empty Map is returned', () => {
      const mutableHashSet = MutableHashSet.empty<number>(
        numberHash,
        areNumberEquals
      );
      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(SetUtil.toMap(null, sameNumberRaw)).toEqual(expectedResult);
      expect(SetUtil.toMap(undefined, sameNumberRaw)).toEqual(expectedResult);

      expect(SetUtil.toMap(mutableHashSet, sameNumberRaw)).toEqual(expectedResult);
      expect(SetUtil.toMap(mutableHashSet, sameNumberFFunction)).toEqual(expectedResult);

      expect(SetUtil.toMap(mutableHashSet, sameNumberRaw, plus1Raw)).toEqual(expectedResult);
      expect(SetUtil.toMap(mutableHashSet, sameNumberFFunction, plus1FFunction)).toEqual(expectedResult);
    });


    it('when given sourceSet is null, undefined or an empty immutable one then empty Map is returned', () => {
      const immutableHashSet = ImmutableHashSet.empty<number>(
        numberHash,
        areNumberEquals
      );
      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(SetUtil.toMap(null, sameNumberRaw)).toEqual(expectedResult);
      expect(SetUtil.toMap(undefined, sameNumberRaw)).toEqual(expectedResult);

      expect(SetUtil.toMap(immutableHashSet, sameNumberRaw)).toEqual(expectedResult);
      expect(SetUtil.toMap(immutableHashSet, sameNumberFFunction)).toEqual(expectedResult);

      expect(SetUtil.toMap(immutableHashSet, sameNumberRaw, plus1Raw)).toEqual(expectedResult);
      expect(SetUtil.toMap(immutableHashSet, sameNumberFFunction, plus1FFunction)).toEqual(expectedResult);
    });


    it('when given sourceSet is a non-empty native one but discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      const nativeSet = new Set<number>(
        [ 1 ]
      );

      // @ts-ignore
      expect(() => SetUtil.toMap(nativeSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.toMap(nativeSet, undefined)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => SetUtil.toMap(nativeSet, null, plus1Raw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.toMap(nativeSet, undefined, plus1FFunction)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty mutable one but discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1 ]
      );

      // @ts-ignore
      expect(() => SetUtil.toMap(mutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.toMap(mutableHashSet, undefined)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => SetUtil.toMap(mutableHashSet, null, plus1Raw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.toMap(mutableHashSet, undefined, plus1FFunction)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is an non-empty immutable one and but discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1 ]
      );

      // @ts-ignore
      expect(() => SetUtil.toMap(immutableHashSet, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.toMap(immutableHashSet, undefined)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => SetUtil.toMap(immutableHashSet, null, plus1Raw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => SetUtil.toMap(immutableHashSet, undefined, plus1FFunction)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceSet is a non-empty native one and only discriminatorKey is provided then all elements will be split using discriminatorKey', () => {
      const nativeSet = new Set<number>(
        [ 1, 2, 3, 6 ]
      );
      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 1);
      expectedResult.set(2, 2);
      expectedResult.set(3, 3);
      expectedResult.set(6, 6);

      verifyMaps(
        SetUtil.toMap(nativeSet, sameNumberRaw),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(nativeSet, sameNumberFFunction),
        expectedResult
      );
    });


    it('when given sourceSet is a non-empty mutable one and only discriminatorKey is provided then all elements will be split using discriminatorKey', () => {
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2, 3, 6 ]
      );
      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 1);
      expectedResult.set(2, 2);
      expectedResult.set(3, 3);
      expectedResult.set(6, 6);

      verifyMaps(
        SetUtil.toMap(mutableHashSet, sameNumberRaw),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(mutableHashSet, sameNumberFFunction),
        expectedResult
      );
    });


    it('when given sourceSet is a non-empty immutable one and only discriminatorKey is provided then all elements will be split using discriminatorKey', () => {
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2, 3, 6 ]
      );
      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 1);
      expectedResult.set(2, 2);
      expectedResult.set(3, 3);
      expectedResult.set(6, 6);

      verifyMaps(
        SetUtil.toMap(immutableHashSet, sameNumberRaw),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(immutableHashSet, sameNumberFFunction),
        expectedResult
      );
    });


    it('when given sourceSet is a non-empty native one and discriminatorKey and valueMapper are provided then all elements will be transformed using discriminatorKey and valueMapper', () => {
      const nativeSet = new Set<number>(
        [ 1, 2, 3, 6 ]
      );
      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 2);
      expectedResult.set(2, 3);
      expectedResult.set(3, 4);
      expectedResult.set(6, 7);

      verifyMaps(
        SetUtil.toMap(nativeSet, sameNumberRaw, plus1Raw),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(nativeSet, sameNumberRaw, plus1FFunction),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(nativeSet, sameNumberFFunction, plus1FFunction),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(nativeSet, sameNumberFFunction, plus1Function),
        expectedResult
      );
    });


    it('when given sourceSet is a non-empty mutable one and discriminatorKey and valueMapper are provided then all elements will be transformed using discriminatorKey and valueMapper', () => {
      const mutableHashSet = MutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2, 3, 6 ]
      );
      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 2);
      expectedResult.set(2, 3);
      expectedResult.set(3, 4);
      expectedResult.set(6, 7);

      verifyMaps(
        SetUtil.toMap(mutableHashSet, sameNumberRaw, plus1Raw),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(mutableHashSet, sameNumberRaw, plus1FFunction),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(mutableHashSet, sameNumberFFunction, plus1FFunction),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(mutableHashSet, sameNumberFFunction, plus1Function),
        expectedResult
      );
    });


    it('when given sourceSet is an non-empty immutable one and discriminatorKey and valueMapper are provided then all elements will be transformed using discriminatorKey and valueMapper', () => {
      const immutableHashSet = ImmutableHashSet.of<number>(
        numberHash,
        areNumberEquals,
        [ 1, 2, 3, 6 ]
      );
      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 2);
      expectedResult.set(2, 3);
      expectedResult.set(3, 4);
      expectedResult.set(6, 7);

      verifyMaps(
        SetUtil.toMap(immutableHashSet, sameNumberRaw, plus1Raw),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(immutableHashSet, sameNumberRaw, plus1FFunction),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(immutableHashSet, sameNumberFFunction, plus1FFunction),
        expectedResult
      );
      verifyMaps(
        SetUtil.toMap(immutableHashSet, sameNumberFFunction, plus1Function),
        expectedResult
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


function verifyArrays(actualArray: unknown[],
                      expectedArray: unknown[]) {
  expect(expectedArray.length).toEqual(actualArray.length);
  if (0 < expectedArray.length) {
    for (let i = 0; i < expectedArray.length; i++) {
      expect(expectedArray[i]).toEqual(actualArray[i]);
    }
  }
}


function verifyArraysRegardlessOfOrder(actualArray: unknown[],
                                       expectedArray: unknown[]) {
  expect(expectedArray.length).toEqual(actualArray.length);
  if (0 < expectedArray.length) {
    expect(expectedArray).toEqual(expect.arrayContaining(actualArray));
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


const roleHash: HashFunction<Role> =
  (r: Role) => r.id % 50;


const sameNumberRaw =
  (n: number) =>
    n;


const sameNumberFFunction: FFunction1<number, number> =
  (n: number) =>
    n;


const stringHash: HashFunction<string> =
  (s: string) => (s.length + s.charCodeAt(0)) % 50;
