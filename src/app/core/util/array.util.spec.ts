import { ArrayUtil, ObjectUtil } from '@app-core/util';
import { NullableOrUndefined } from '@app-core/types';
import { FFunction2, Function2 } from '@app-core/types/function';
import { Predicate1 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/array.util.spec.ts
 */
describe('ArrayUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new ArrayUtil()).toThrowError(SyntaxError);
    });

  });



  describe('dropWhile', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      let emptyArray: Role[] = [];
      const isIdEven: Predicate1<Role> = Predicate1.of((role: Role) => 0 == role.id % 2);

      const expectedResult: Role[] = [];

      expect(ArrayUtil.dropWhile(null, isIdEven)).toEqual(expectedResult);
      expect(ArrayUtil.dropWhile(undefined, isIdEven)).toEqual(expectedResult);
      expect(ArrayUtil.dropWhile(emptyArray, isIdEven)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then sourceArray is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      verifyArrays(
        // @ts-ignore
        ArrayUtil.dropWhile([r1, r2, r3], undefined),
        [r1, r2, r3]
      );

      verifyArrays(
        // @ts-ignore
        ArrayUtil.dropWhile([3, 5, 2], null),
        [3, 5, 2]
      );
    });


    it('using interfaces, when given sourceArray has elements then filtered array is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;
      const sourceArray = [r1, r2, r3];

      const isIdOdd: Predicate1<NullableOrUndefined<Role>> = Predicate1.of((role: NullableOrUndefined<Role>) => 1 == role!.id % 2);

      verifyArrays(
        ArrayUtil.dropWhile(sourceArray, isIdOdd),
        [r2]
      );
    });


    it('using classes, when given sourceArray has elements then filtered array is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const sourceArray = [u1, u2, u3];

      const isIdOdd: Predicate1<User> = Predicate1.of((user: User) => 1 == user.id % 2);

      verifyArrays(
        ArrayUtil.dropWhile(sourceArray, isIdOdd),
        [u2]
      );
    });

  });



  describe('find', () => {

    it('when given sourceArray is undefined, null or is an empty array then undefined is returned', () => {
      let undefinedArray: Role[];
      // @ts-ignore
      let nullArray: Role[] = null;
      let emptyArray: Role[] = [];

      const isIdOdd: Predicate1<Role> = Predicate1.of((role: Role) => 1 == role.id % 2);

      // @ts-ignore
      expect(ArrayUtil.find(undefinedArray, isIdOdd)).toBeUndefined();
      expect(ArrayUtil.find(nullArray, isIdOdd)).toBeUndefined();
      expect(ArrayUtil.find(emptyArray, isIdOdd)).toBeUndefined();
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then undefined is returned', () => {
      // @ts-ignore
      expect(ArrayUtil.find([1], undefined)).toBeUndefined();

      // @ts-ignore
      expect(ArrayUtil.find([1], null)).toBeUndefined();
    });


    it('using interfaces, when there is no element that matches provided filter then undefined is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 2, name: 'role3' } as Role;
      const r4 = { id: 4, name: 'role2' } as Role;
      const sourceArray = [r1, r2, r3, r4];

      const isIdGreaterThan10: Predicate1<Role> = Predicate1.of((role: Role) => 10 < role.id);

      expect(ArrayUtil.find(sourceArray, isIdGreaterThan10)).toBeUndefined();
    });


    it('using classes, when there is no element that matches provided filter then undefined is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const sourceArray = [u1, u2, u3, u4];

      const isIdGreaterThan10: Predicate1<NullableOrUndefined<User>> = Predicate1.of((user: NullableOrUndefined<User>) => 10 < user!.id);

      expect(ArrayUtil.find(sourceArray, isIdGreaterThan10)).toBeUndefined();
    });


    it('using interfaces, when there is an element that matches provided filter then expected element is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 2, name: 'role3' } as Role;
      const r4 = { id: 4, name: 'role2' } as Role;
      const sourceArray = [r1, r2, r3, r4];

      const isIdEven: Predicate1<Role> = Predicate1.of((role: Role) => 0 == role!.id % 2);

      const expectedResult = r2;

      expect(ArrayUtil.find(sourceArray, isIdEven)).toEqual(expectedResult);
    });


    it('using classes, when there is an element that matches provided filter then expected element is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const sourceArray = [u1, u2, u3, u4];

      const isIdOdd: Predicate1<User> = Predicate1.of((user: User) => 1 == user.id % 2);

      const expectedResult = u1;

      expect(ArrayUtil.find(sourceArray, isIdOdd)).toEqual(expectedResult);
    });

  });



  describe('findOptional', () => {

    it('when given sourceArray is undefined, null or is an empty array then empty Optional is returned', () => {
      let undefinedArray: Role[];
      // @ts-ignore
      let nullArray: Role[] = null;
      let emptyArray: Role[] = [];

      const isIdOdd: Predicate1<Role> = Predicate1.of((role: Role) => 1 == role.id % 2);

      // @ts-ignore
      expect(ArrayUtil.findOptional(undefinedArray, isIdOdd).isPresent()).toBeFalse();
      expect(ArrayUtil.findOptional(nullArray, isIdOdd).isPresent()).toBeFalse();
      expect(ArrayUtil.findOptional(emptyArray, isIdOdd).isPresent()).toBeFalse();
    });


    it('using interfaces, when there is no element that matches provided filter then empty Optional is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 2, name: 'role3' } as Role;
      const r4 = { id: 4, name: 'role2' } as Role;
      const sourceArray = [r1, r2, r3, r4];

      const isIdGreaterThan10: Predicate1<Role> = Predicate1.of((role: Role) => 10 < role.id);

      expect(ArrayUtil.findOptional(sourceArray, isIdGreaterThan10).isPresent()).toBeFalse();
    });


    it('using classes, when there is no element that matches provided filter then empty Optional is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const sourceArray = [u1, u2, u3, u4];

      const isIdGreaterThan10: Predicate1<User> = Predicate1.of((user: User) => 10 < user.id);

      expect(ArrayUtil.findOptional(sourceArray, isIdGreaterThan10).isPresent()).toBeFalse();
    });


    it('using interfaces, when there is an element that matches provided filter then expected element is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 2, name: 'role3' } as Role;
      const r4 = { id: 4, name: 'role2' } as Role;
      const sourceArray = [r1, r2, r3, r4];

      const isIdEven: Predicate1<Role> = Predicate1.of((role: Role) => 0 == role.id % 2);

      const expectedResult = r2;

      const optional = ArrayUtil.findOptional(sourceArray, isIdEven);

      expect(optional.isPresent()).toBeTrue();
      expect(optional.get()).toEqual(expectedResult);
    });


    it('using classes, when there is an element that matches provided filter then expected element is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const sourceArray = [u1, u2, u3, u4];

      const isIdOdd: Predicate1<User> = Predicate1.of((user: User) => 1 == user.id % 2);

      const expectedResult = u1;

      const optional = ArrayUtil.findOptional(sourceArray, isIdOdd);

      expect(optional.isPresent()).toBeTrue();
      expect(optional.get()).toEqual(expectedResult);
    });

  });



  describe('foldLeft', () => {

    it('when given arrayToVerify is null, undefined or empty then initialValue is returned', () => {
      const intValue = 19;
      const stringValue = 'afr';

      const intAccumulator: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const stringAccumulator: Function2<string, string, string> =
        Function2.of((s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1! + s2!);

      const intNullResult = ArrayUtil.foldLeft(null, intValue, intAccumulator);
      const intUndefinedResult = ArrayUtil.foldLeft(undefined, intValue, intAccumulator);
      const stringResult = ArrayUtil.foldLeft([], stringValue, stringAccumulator);

      expect(intNullResult).toEqual(intValue);
      expect(intUndefinedResult).toEqual(intValue);
      expect(stringResult).toEqual(stringValue);
    });


    it('when given arrayToVerify is not empty but accumulator is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.foldLeft([2], 11, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.foldLeft([2], 11, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given arrayToVerify is not null then initialValue applying accumulator is returned', () => {
      const intValue = 10;
      const stringValue = 'a';

      const intArray: number[] = [ 2, 3, 4 ];
      const stringArray: string[] = [ 'b', 'c', 'd' ];

      const intAccumulator: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const stringAccumulator: Function2<string, string, string> =
        Function2.of((s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1! + s2!);

      const intResult = ArrayUtil.foldLeft(intArray, intValue, intAccumulator);
      const stringResult = ArrayUtil.foldLeft(stringArray, stringValue, stringAccumulator);

      expect(intResult).toEqual(240);
      expect(stringResult).toEqual('abcd');
    });

  });



  describe('isEmpty', () => {

    it('when given arrayToVerify is null, undefined or is an empty array then true is returned', () => {
      const expectedResult = true;

      expect(ArrayUtil.isEmpty()).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty(undefined)).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty(null)).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty([])).toEqual(expectedResult);
    });


    it('when given arrayToVerify contains elements then false is returned', () => {
      const role = { id: 1, name: 'role1' };

      const expectedResult = false;

      expect(ArrayUtil.isEmpty([1, 2])).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty(['a', 'b', 'c'])).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty([role])).toEqual(expectedResult);
    });

  });



  describe('takeWhile', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      let emptyArray: Role[] = [];
      const isIdEven: Predicate1<Role> = Predicate1.of((role: Role) => 0 == role.id % 2);

      const expectedResult: Role[] = [];

      expect(ArrayUtil.takeWhile(null, isIdEven)).toEqual(expectedResult);
      expect(ArrayUtil.takeWhile(undefined, isIdEven)).toEqual(expectedResult);
      expect(ArrayUtil.takeWhile(emptyArray, isIdEven)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then sourceArray is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      verifyArrays(
        // @ts-ignore
        ArrayUtil.takeWhile([r1, r2, r3], undefined),
        [r1, r2, r3]
      );

      verifyArrays(
        // @ts-ignore
        ArrayUtil.takeWhile([3, 5, 2], null),
        [3, 5, 2]
      );
    });


    it('using interfaces, when given sourceArray has elements then filtered array is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;
      const sourceArray = [r1, r2, r3];

      const isIdOdd: Predicate1<Role> = Predicate1.of((role: Role) => 1 == role.id % 2);

      verifyArrays(
        ArrayUtil.takeWhile(sourceArray, isIdOdd),
        [r1, r3]
      );
    });


    it('using classes, when given sourceArray has elements then filtered array is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const sourceArray = [u1, u2, u3];

      const isIdOdd: Predicate1<User> = Predicate1.of((user: User) => 1 == user.id % 2);

      verifyArrays(
        ArrayUtil.takeWhile(sourceArray, isIdOdd),
        [u1, u3]
      );
    });

  });




  function verifyArrays(actualArray: any[],
                        expectedArray: any[]) {
    expect(expectedArray.length).toEqual(actualArray.length);
    if (0 < expectedArray.length) {
      for (let i = 0; i < expectedArray.length; i++) {
        expect(expectedArray[i]).toEqual(actualArray[i]);
      }
    }
  }



  // Used only for testing purpose
  class User {
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

    equals = (other?: User | null): boolean =>
      ObjectUtil.isNullOrUndefined(other)
        ? false
        : this.id === other.id;
  }


  interface Role {
    id: number;
    name: string;
  }

});
