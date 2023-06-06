import { ArrayUtil } from '@app-core/util';
import { FFunction2, Function2, NullableOrUndefined, Predicate1 } from '@app-core/types';
import * as _ from 'lodash';

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

    it('when given objectArray has no elements then empty array will be returned', () => {
      let emptyArray: Role[] = [];
      const isIdEven: Predicate1<Role> = Predicate1.of((role: Role) => 0 == role.id % 2);

      const expectedResult: Role[] = [];

      expect(ArrayUtil.dropWhile(emptyArray, isIdEven)).toEqual(expectedResult);
      expect(ArrayUtil.dropWhile(emptyArray, isIdEven)).toEqual(expectedResult);
      expect(ArrayUtil.dropWhile(emptyArray, isIdEven)).toEqual(expectedResult);
    });


    it('using interfaces, when given objectArray has elements then filtered array will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 3, description: 'role3' } as Role;
      const objectArray = [r1, r2, r3];

      const isIdOdd: Predicate1<NullableOrUndefined<Role>> = Predicate1.of((role: NullableOrUndefined<Role>) => 1 == role!.id % 2);

      verifyArrays(
        ArrayUtil.dropWhile(objectArray, isIdOdd),
        [r2]
      );
    });


    it('using classes, when given objectArray and keyValuesToKeepIfFound has elements then filtered array will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const objectArray = [u1, u2, u3];

      const isIdOdd: Predicate1<User> = Predicate1.of((user: User) => 1 == user.id % 2);

      verifyArrays(
        ArrayUtil.dropWhile(objectArray, isIdOdd),
        [u2]
      );
    });

  });



  describe('dropWhileByKey', () => {

    it('when given objectArray has no elements then empty array will be returned', () => {
      let emptyArray: Role[] = [];

      const expectedResult: Role[] = [];

      expect(ArrayUtil.dropWhileByKey(emptyArray, 'description', [])).toEqual(expectedResult);
      expect(ArrayUtil.dropWhileByKey(emptyArray, 'description', [])).toEqual(expectedResult);
      expect(ArrayUtil.dropWhileByKey(emptyArray, 'description', ['a'])).toEqual(expectedResult);
    });


    it('using interfaces, when given keyValuesToRemoveIfFound has no elements then objectArray will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 3, description: 'role3' } as Role;
      const objectArray = [r1, r2, r3];

      const expectedResult = [r1, r2, r3];

      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'id', []),
        expectedResult
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'description', []),
        expectedResult
      );
    });


    it('using classes, when given keyValuesToRemoveIfFound has no elements then objectArray will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const objectArray = [u1, u2, u3];

      const expectedResult = [u1, u2, u3];

      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'id', []),
        expectedResult
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'description', []),
        expectedResult
      );
    });


    it('using interfaces, when given objectArray and keyValuesToRemoveIfFound has elements then filtered array will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 3, description: 'role3' } as Role;
      const objectArray = [r1, r2, r3];

      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'id', [1]),
        [r2, r3]
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'id', [1, 2, 3]),
        []
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'id', [4]),
        [r1, r2, r3]
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'description', ['role2']),
        [r1, r3]
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'description', ['role2', 'role1', 'role3']),
        []
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'description', ['role4']),
        [r1, r2, r3]
      );
    });


    it('using classes, when given objectArray and keyValuesToRemoveIfFound has elements then filtered array will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const objectArray = [u1, u2, u3];

      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'id', [1]),
        [u2, u3]
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'id', [1, 2, 3]),
        []
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'id', [4]),
        [u1, u2, u3]
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'description', ['user2']),
        [u1, u3]
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'description', ['user2', 'user1', 'user3']),
        []
      );
      verifyArrays(
        ArrayUtil.dropWhileByKey(objectArray, 'description', ['user4']),
        [u1, u2, u3]
      );
    });

  });



  describe('find', () => {

    it('when given objectArray is undefined, null or is an empty array then undefined will be returned', () => {
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


    it('using interfaces, when given key value is not found then undefined will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 2, description: 'role3' } as Role;
      const r4 = { id: 4, description: 'role2' } as Role;
      const objectArray = [r1, r2, r3, r4];

      const isIdGreaterThan10: Predicate1<Role> = Predicate1.of((role: Role) => 10 < role.id);

      expect(ArrayUtil.find(objectArray, isIdGreaterThan10)).toBeUndefined();
    });


    it('using classes, when given key value is not found then undefined will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const objectArray = [u1, u2, u3, u4];

      const isIdGreaterThan10: Predicate1<NullableOrUndefined<User>> = Predicate1.of((user: NullableOrUndefined<User>) => 10 < user!.id);

      expect(ArrayUtil.find(objectArray, isIdGreaterThan10)).toBeUndefined();
    });


    it('using interfaces, when given key value is found then expected element will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 2, description: 'role3' } as Role;
      const r4 = { id: 4, description: 'role2' } as Role;
      const objectArray = [r1, r2, r3, r4];

      const isIdEven: Predicate1<Role> = Predicate1.of((role: Role) => 0 == role!.id % 2);

      const expectedResult = r2;

      expect(ArrayUtil.find(objectArray, isIdEven)).toEqual(expectedResult);
    });


    it('using classes, when given key value is found then expected element will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const objectArray = [u1, u2, u3, u4];

      const isIdOdd: Predicate1<User> = Predicate1.of((user: User) => 1 == user.id % 2);

      const expectedResult = u1;

      expect(ArrayUtil.find(objectArray, isIdOdd)).toEqual(expectedResult);
    });

  });



  describe('findOptional', () => {

    it('when given objectArray is undefined, null or is an empty array then empty Optional is returned', () => {
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


    it('using interfaces, when given key value is not found then empty Optional is returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 2, description: 'role3' } as Role;
      const r4 = { id: 4, description: 'role2' } as Role;
      const objectArray = [r1, r2, r3, r4];

      const isIdGreaterThan10: Predicate1<Role> = Predicate1.of((role: Role) => 10 < role.id);

      expect(ArrayUtil.findOptional(objectArray, isIdGreaterThan10).isPresent()).toBeFalse();
    });


    it('using classes, when given key value is not found then empty Optional is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const objectArray = [u1, u2, u3, u4];

      const isIdGreaterThan10: Predicate1<User> = Predicate1.of((user: User) => 10 < user.id);

      expect(ArrayUtil.findOptional(objectArray, isIdGreaterThan10).isPresent()).toBeFalse();
    });


    it('using interfaces, when given key value is found then expected element will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 2, description: 'role3' } as Role;
      const r4 = { id: 4, description: 'role2' } as Role;
      const objectArray = [r1, r2, r3, r4];

      const isIdEven: Predicate1<Role> = Predicate1.of((role: Role) => 0 == role.id % 2);

      const expectedResult = r2;

      const optional = ArrayUtil.findOptional(objectArray, isIdEven);

      expect(optional.isPresent()).toBeTrue();
      expect(optional.get()).toEqual(expectedResult);
    });


    it('using classes, when given key value is found then expected element will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const objectArray = [u1, u2, u3, u4];

      const isIdOdd: Predicate1<User> = Predicate1.of((user: User) => 1 == user.id % 2);

      const expectedResult = u1;

      const optional = ArrayUtil.findOptional(objectArray, isIdOdd);

      expect(optional.isPresent()).toBeTrue();
      expect(optional.get()).toEqual(expectedResult);
    });

  });



  describe('findByKey', () => {

    it('when given objectArray is undefined, null or is an empty array then undefined will be returned', () => {
      let undefinedArray: Role[];
      // @ts-ignore
      let nullArray: Role[] = null;
      let emptyArray: Role[] = [];

      // @ts-ignore
      expect(ArrayUtil.findByKey(undefinedArray, 'id', [0])).toBeUndefined();
      expect(ArrayUtil.findByKey(nullArray, 'id', [0])).toBeUndefined();
      expect(ArrayUtil.findByKey(emptyArray, 'id', [0])).toBeUndefined();
    });


    it('using interfaces, when given key value is not found then undefined will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 2, description: 'role3' } as Role;
      const r4 = { id: 4, description: 'role2' } as Role;
      const objectArray = [r1, r2, r3, r4];

      expect(ArrayUtil.findByKey(objectArray, 'id', [0])).toBeUndefined();
      expect(ArrayUtil.findByKey(objectArray, 'description', [''])).toBeUndefined();
    });


    it('using classes, when given key value is not found then undefined will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const objectArray = [u1, u2, u3, u4];

      expect(ArrayUtil.findByKey(objectArray, 'id', [0])).toBeUndefined();
      expect(ArrayUtil.findByKey(objectArray, 'description', [''])).toBeUndefined();
    });


    it('using interfaces, when given key value is found then expected element will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 2, description: 'role3' } as Role;
      const r4 = { id: 4, description: 'role2' } as Role;
      const objectArray = [r1, r2, r3, r4];

      const expectedResult = r2;

      expect(ArrayUtil.findByKey(objectArray, 'id', [2])).toEqual(expectedResult);
      expect(ArrayUtil.findByKey(objectArray, 'description', ['role2'])).toEqual(expectedResult);
    });


    it('using classes, when given key value is found then expected element will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const objectArray = [u1, u2, u3, u4];

      const expectedResult = u1;

      expect(ArrayUtil.findByKey(objectArray, 'id', [1])).toEqual(expectedResult);
      expect(ArrayUtil.findByKey(objectArray, 'description', ['user1'])).toEqual(expectedResult);
    });

  });



  describe('findByKeyOptional', () => {

    it('when given objectArray is undefined, null or is an empty array then empty Optional is returned', () => {
      let undefinedArray: Role[];
      // @ts-ignore
      let nullArray: Role[] = null;
      let emptyArray: Role[] = [];

      // @ts-ignore
      expect(ArrayUtil.findByKeyOptional(undefinedArray, 'id', [0]).isPresent()).toBeFalse();
      expect(ArrayUtil.findByKeyOptional(nullArray, 'id', [0]).isPresent()).toBeFalse();
      expect(ArrayUtil.findByKeyOptional(emptyArray, 'id', [0]).isPresent()).toBeFalse();
    });


    it('using interfaces, when given key value is not found then empty Optional is returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 2, description: 'role3' } as Role;
      const r4 = { id: 4, description: 'role2' } as Role;
      const objectArray = [r1, r2, r3, r4];

      expect(ArrayUtil.findByKeyOptional(objectArray, 'id', [0]).isPresent()).toBeFalse();
      expect(ArrayUtil.findByKeyOptional(objectArray, 'description', ['']).isPresent()).toBeFalse();
    });


    it('using classes, when given key value is not found then empty Optional is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const objectArray = [u1, u2, u3, u4];

      expect(ArrayUtil.findByKeyOptional(objectArray, 'id', [0]).isPresent()).toBeFalse();
      expect(ArrayUtil.findByKeyOptional(objectArray, 'description', ['']).isPresent()).toBeFalse();
    });


    it('using interfaces, when given key value is found then expected element will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 2, description: 'role3' } as Role;
      const r4 = { id: 4, description: 'role2' } as Role;
      const objectArray = [r1, r2, r3, r4];

      const expectedResult = r2;

      const optionalById = ArrayUtil.findByKeyOptional(objectArray, 'id', [2]);
      const optionalByDescription = ArrayUtil.findByKeyOptional(objectArray, 'description', ['role2']);

      expect(optionalById.isPresent()).toBeTrue();
      expect(optionalById.get()).toEqual(expectedResult);

      expect(optionalByDescription.isPresent()).toBeTrue();
      expect(optionalByDescription.get()).toEqual(expectedResult);
    });


    it('using classes, when given key value is found then expected element will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const objectArray = [u1, u2, u3, u4];

      const expectedResult = u1;

      const optionalById = ArrayUtil.findByKeyOptional(objectArray, 'id', [1]);
      const optionalByDescription = ArrayUtil.findByKeyOptional(objectArray, 'description', ['user1']);

      expect(optionalById.isPresent()).toBeTrue();
      expect(optionalById.get()).toEqual(expectedResult);

      expect(optionalByDescription.isPresent()).toBeTrue();
      expect(optionalByDescription.get()).toEqual(expectedResult);
    });

  });



  describe('foldLeft', () => {

    it('when given arrayToVerify is null or empty then initialValue will be returned', () => {
      const intValue = 19;
      const stringValue = 'afr';

      const intAccumulator: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const stringAccumulator: Function2<string, string, string> =
        Function2.of((s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1! + s2!);

      const intResult = ArrayUtil.foldLeft(null, intValue, intAccumulator);
      const stringResult = ArrayUtil.foldLeft([], stringValue, stringAccumulator);

      expect(intResult).toEqual(intValue);
      expect(stringResult).toEqual(stringValue);
    });


    it('when given arrayToVerify is not null then initialValue applying accumulator will be returned', () => {
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

    it('when given arrayToVerify is null, undefined or is an empty array then true will be returned', () => {
      const expectedResult = true;

      expect(ArrayUtil.isEmpty()).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty(undefined)).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty(null)).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty([])).toEqual(expectedResult);
    });


    it('when given arrayToVerify contains elements then false will be returned', () => {
      const role = { id: 1, description: 'role1' };

      const expectedResult = false;

      expect(ArrayUtil.isEmpty([1, 2])).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty(['a', 'b', 'c'])).toEqual(expectedResult);
      expect(ArrayUtil.isEmpty([role])).toEqual(expectedResult);
    });

  });



  describe('takeWhile', () => {

    it('when given objectArray has no elements then empty array will be returned', () => {
      let emptyArray: Role[] = [];
      const isIdEven: Predicate1<Role> = Predicate1.of((role: Role) => 0 == role.id % 2);

      const expectedResult: Role[] = [];

      expect(ArrayUtil.takeWhile(emptyArray, isIdEven)).toEqual(expectedResult);
      expect(ArrayUtil.takeWhile(emptyArray, isIdEven)).toEqual(expectedResult);
      expect(ArrayUtil.takeWhile(emptyArray, isIdEven)).toEqual(expectedResult);
    });


    it('using interfaces, when given objectArray has elements then filtered array will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 3, description: 'role3' } as Role;
      const objectArray = [r1, r2, r3];

      const isIdOdd: Predicate1<Role> = Predicate1.of((role: Role) => 1 == role.id % 2);

      verifyArrays(
        ArrayUtil.takeWhile(objectArray, isIdOdd),
        [r1, r3]
      );
    });


    it('using classes, when given objectArray and keyValuesToKeepIfFound has elements then filtered array will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const objectArray = [u1, u2, u3];

      const isIdOdd: Predicate1<User> = Predicate1.of((user: User) => 1 == user.id % 2);

      verifyArrays(
        ArrayUtil.takeWhile(objectArray, isIdOdd),
        [u1, u3]
      );
    });

  });



  describe('takeWhileByKey', () => {

    it('when given objectArray has no elements then empty array will be returned', () => {
      let emptyArray: Role[] = [];

      const expectedResult: Role[] = [];

      expect(ArrayUtil.takeWhileByKey(emptyArray, 'description', [])).toEqual(expectedResult);
      expect(ArrayUtil.takeWhileByKey(emptyArray, 'description', [])).toEqual(expectedResult);
      expect(ArrayUtil.takeWhileByKey(emptyArray, 'description', ['a'])).toEqual(expectedResult);
    });


    it('using interfaces, when given keyValuesToKeepIfFound has no elements then empty array will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 3, description: 'role3' } as Role;
      const objectArray = [r1, r2, r3];

      const expectedResult: Role[] = [];

      expect(ArrayUtil.takeWhileByKey(objectArray, 'id', [])).toEqual(expectedResult);
      expect(ArrayUtil.takeWhileByKey(objectArray, 'description', [])).toEqual(expectedResult);
    });


    it('using classes, when given keyValuesToKeepIfFound has no elements then empty array will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const objectArray = [u1, u2, u3];

      const expectedResult: User[] = [];

      expect(ArrayUtil.takeWhileByKey(objectArray, 'id', [])).toEqual(expectedResult);
      expect(ArrayUtil.takeWhileByKey(objectArray, 'description', [])).toEqual(expectedResult);
    });


    it('using interfaces, when given objectArray and keyValuesToKeepIfFound has elements then filtered array will be returned', () => {
      const r1 = { id: 1, description: 'role1' } as Role;
      const r2 = { id: 2, description: 'role2' } as Role;
      const r3 = { id: 3, description: 'role3' } as Role;
      const objectArray = [r1, r2, r3];

      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'id', [1]),
        [r1]
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'id', [1, 2]),
        [r1, r2]
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'id', [4]),
        []
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'description', ['role2']),
        [r2]
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'description', ['role2', 'role1']),
        [r1, r2]
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'description', ['role4']),
        []
      );
    });


    it('using classes, when given objectArray and keyValuesToKeepIfFound has elements then filtered array will be returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const objectArray = [u1, u2, u3];

      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'id', [1]),
        [u1]
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'id', [1, 2]),
        [u1, u2]
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'id', [4]),
        []
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'description', ['user2']),
        [u2]
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'description', ['user2', 'user1']),
        [u1, u2]
      );
      verifyArrays(
        ArrayUtil.takeWhileByKey(objectArray, 'description', ['user4']),
        []
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
    private _description: string;

    constructor(id: number, description: string) {
      this._id = id;
      this._description = description;
    }

    get id(): number {
      return this._id;
    }
    set id(id: number) {
      this._id = id;
    }

    get description(): string {
      return this._description;
    }
    set description(description: string) {
      this._description = description;
    }

    equals = (other?: User | null): boolean =>
      _.isNil(other)
        ? false
        : this.id === other.id;
  }


  interface Role {
    id: number;
    description: string;
  }

});
