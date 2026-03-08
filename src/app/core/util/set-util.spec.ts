import { ObjectUtil, SetUtil } from '@app-core/util';
import { Nullable } from '@app-core/type';
import { EqualityFunction, Hashable, HashFunction } from '@app-core/type/collection';
import { ImmutableHashSet, MutableHashSet } from '@app-core/type/collection/set';

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


    it('when given input is not a isImmutableSet then false will be returned', () => {
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


    it('when given input is a isImmutableSet then true will be returned', () => {
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


const areStringEquals: EqualityFunction<string> =
  (s1: string, s2: string) => s1 == s2;


const numberHash: HashFunction<number> =
  (n: number) => n % 50;


const roleHash: HashFunction<Role> =
  (r: Role) => r.id % 50;


const stringHash: HashFunction<string> =
  (s: string) => (s.length + s.charCodeAt(0)) % 50;
