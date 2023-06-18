import { MapUtil, ObjectUtil } from '@app-core/util';
import { FFunction3, Function2, PartialFunction } from '@app-core/types/function';
import { FPredicate2, Predicate2 } from '@app-core/types/predicate';
import { NullableOrUndefined, Optional } from '@app-core/types';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/map.util.spec.ts
 */
describe('MapUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new MapUtil()).toThrowError(SyntaxError);
    });

  });



  describe('collect', () => {

    it('when given sourceMap has no elements and partialFunction is provided then empty Map is returned', () => {
      let emptyMap = new Map<number, string>();
      const keyAndValueLengthForOdd: PartialFunction<[number, string], [number, number]> =
        PartialFunction.of(
          ([k, v]: [number, string]) => 1 == k % 2,
          ([k, v]: [number, string]) => [k, v.length]
        );

      expect(MapUtil.collect(null, keyAndValueLengthForOdd)).toEqual(emptyMap);
      expect(MapUtil.collect(undefined, keyAndValueLengthForOdd)).toEqual(emptyMap);
      expect(MapUtil.collect(emptyMap, keyAndValueLengthForOdd)).toEqual(emptyMap);
    });


    it('when given sourceMap has no elements and mapFunction and filterPredicate are provided then Map array is returned', () => {
      let emptyMap = new Map<number, string>();
      const isKeyEven = (k: number, v: string) => 1 == k % 2;
      const keyAndValueLength = (k: number, v: string): [number, number] => [k, v.length];

      expect(MapUtil.collect(null, keyAndValueLength, isKeyEven)).toEqual(emptyMap);
      expect(MapUtil.collect(undefined, keyAndValueLength, isKeyEven)).toEqual(emptyMap);
      expect(MapUtil.collect(emptyMap, keyAndValueLength, isKeyEven)).toEqual(emptyMap);
    });


    it('when given sourceMap is not empty but partialFunction is null or undefined then an error is thrown', () => {
      let sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.collect(sourceMap, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.collect(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty but mapFunction is null or undefined then an error is thrown', () => {
      let sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      const isKeyEven = (k: number, v: string) => 1 == k % 2;

      // @ts-ignore
      expect(() => MapUtil.collect(sourceMap, null, isKeyEven)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.collect(sourceMap, undefined, isKeyEven)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap has elements and partialFunction is valid then a new filtered and transformed Map is returned', () => {
      let sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'Hola');

      const keyAndValueLengthForOdd: PartialFunction<[number, string], [number, number]> =
        PartialFunction.of(
          ([k, v]: [number, string]) => 1 == k % 2,
          ([k, v]: [number, string]) => [k, v.length]
        );

      const expectedResult = new Map<number, number>();
      expectedResult.set(1, 2);
      expectedResult.set(3, 4);

      verifyMaps(
        MapUtil.collect(sourceMap, keyAndValueLengthForOdd),
        expectedResult
      );
    });


    it('when given sourceMap has elements and mapFunction is valid but filterPredicate is null or undefined then all elements will be transformed', () => {
      let sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'Hola');

      const keyAndValueLength = (k: number, v: string): [number, number] => [k, v.length];

      const expectedResult = new Map<number, number>();
      expectedResult.set(1, 2);
      expectedResult.set(2, 5);
      expectedResult.set(3, 4);

      verifyMaps(
        // @ts-ignore
        MapUtil.collect(sourceMap, keyAndValueLength, null),
        expectedResult
      );

      verifyMaps(
        // @ts-ignore
        MapUtil.collect(sourceMap, keyAndValueLength, undefined),
        expectedResult
      );
    });


    it('when given sourceMap has elements and mapFunction and filterPredicate are valid then a new filtered and transformed Map is returned', () => {
      let sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'Hola');

      const isKeyEven: Predicate2<number, string> =
        Predicate2.of((k: number, v: string) => 1 == k % 2);

      const keyAndValueLength: Function2<number, string, [number, number]> =
        Function2.of((k: number, v: string) => [k, v.length]);

      const expectedResult = new Map<number, number>();
      expectedResult.set(1, 2);
      expectedResult.set(3, 4);

      verifyMaps(
        MapUtil.collect(sourceMap, keyAndValueLength, isKeyEven),
        expectedResult
      );
    });

  });



  describe('dropWhile', () => {

    it('when given sourceMap has no elements then empty Map is returned', () => {
      let emptyMap = new Map<number, number>();
      const areKeyValueEven: Predicate2<number, number> =
        Predicate2.of((k: number, v: number) => 0 == k % 2 && 0 == v % 2);

      expect(MapUtil.dropWhile(null, areKeyValueEven)).toEqual(emptyMap);
      expect(MapUtil.dropWhile(undefined, areKeyValueEven)).toEqual(emptyMap);
      expect(MapUtil.dropWhile(emptyMap, areKeyValueEven)).toEqual(emptyMap);
    });


    it('when given sourceMap is not empty but filterPredicate is null or undefined then sourceMap is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      let roleMap = new Map<number, Role>();
      roleMap.set(r1.id, r1);
      roleMap.set(r2.id, r2);
      roleMap.set(r3.id, r3);

      let stringsMap = new Map<string, string>();
      stringsMap.set('', '');
      stringsMap.set('3', '30');
      stringsMap.set('4', '40');

      verifyMaps(
        // @ts-ignore
        MapUtil.dropWhile(roleMap, undefined),
        roleMap
      );

      verifyMaps(
        // @ts-ignore
        MapUtil.dropWhile(stringsMap, null),
        stringsMap
      );
    });


    it('using interfaces, when given sourceMap has elements then filtered Map is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      let sourceMap = new Map<number, Role>();
      sourceMap.set(r1.id, r1);
      sourceMap.set(r2.id, r2);
      sourceMap.set(r3.id, r3);

      const expectedResult = new Map<number, Role>();
      expectedResult.set(r2.id, r2);

      const isKeyAndRoleIdOdd: Predicate2<number, Role> = Predicate2.of((k: number, role: Role) => 1 == k % 2 && 1 == role.id % 2);

      verifyMaps(
        MapUtil.dropWhile(sourceMap, isKeyAndRoleIdOdd),
        expectedResult
      );
    });


    it('using classes, when given sourceMap and keyValuesToKeepIfFound has elements then filtered Map is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      let sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u2.id, u2);
      sourceMap.set(u3.id, u3);

      const expectedResult = new Map<number, User>();
      expectedResult.set(u1.id, u1);
      expectedResult.set(u3.id, u3);

      const isKeyAndUserIdEven: Predicate2<number, User> = Predicate2.of((k: number, user: User) => 0 == k % 2 && 0 == user.id % 2);

      verifyMaps(
        MapUtil.dropWhile(sourceMap, isKeyAndUserIdEven),
        expectedResult
      );
    });

  });



  describe('find', () => {

    it('when given sourceMap is undefined, null or is an empty Map then undefined is returned', () => {
      let emptyMap = new Map<number, number>();
      const areKeyValueEven: Predicate2<number, number> =
        Predicate2.of((k: number, v: number) => 0 == k % 2 && 0 == v % 2);

      expect(MapUtil.find(null, areKeyValueEven)).toBeUndefined();
      expect(MapUtil.find(undefined, areKeyValueEven)).toBeUndefined();
      expect(MapUtil.find(emptyMap, areKeyValueEven)).toBeUndefined();
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then undefined is returned', () => {
      const sourceMap = new Map<number, number>();
      sourceMap.set(11, 19);

      // @ts-ignore
      expect(MapUtil.find(sourceMap, undefined)).toBeUndefined();

      // @ts-ignore
      expect(MapUtil.find(sourceMap, null)).toBeUndefined();
    });


    it('using interfaces, when there is no element that matches provided filter then undefined is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      let sourceMap = new Map<number, Role>();
      sourceMap.set(r1.id, r1);
      sourceMap.set(r2.id, r2);
      sourceMap.set(r3.id, r3);

      const isKeyAndIdGreaterThan10: Predicate2<number, Role> = Predicate2.of((k: number, role: Role) => 10 < k && 10 < role.id);

      expect(MapUtil.find(sourceMap, isKeyAndIdGreaterThan10)).toBeUndefined();
    });


    it('using classes, when there is no element that matches provided filter then undefined is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      let sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u2.id, u2);
      sourceMap.set(u3.id, u3);

      const isKeyAndIdGreaterThan10: Predicate2<number, User> = Predicate2.of((k: number, user: User) => 10 < k && 10 < user.id);

      expect(MapUtil.find(sourceMap, isKeyAndIdGreaterThan10)).toBeUndefined();
    });


    it('using interfaces, when there is an element that matches provided filter then expected element is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      let sourceMap = new Map<number, Role>();
      sourceMap.set(r1.id, r1);
      sourceMap.set(r2.id, r2);
      sourceMap.set(r3.id, r3);

      const isKeyAndRoleIdOdd: Predicate2<number, Role> =
        Predicate2.of((k: number, role: Role) => 1 == k % 2 && 1 == role.id % 2);

      const expectedResult: [number, Role] = [r1.id, r1];

      const result = MapUtil.find(sourceMap, isKeyAndRoleIdOdd);

      expect(result).toBeDefined();
      expect(result![0]).toEqual(expectedResult[0]);
      expect(result![1]).toEqual(expectedResult[1]);
    });


    it('using classes, when there is an element that matches provided filter then expected element is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const u4 = new User(4, 'user4');

      let sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u2.id, u2);
      sourceMap.set(u3.id, u3);
      sourceMap.set(u4.id, u4);

      const isKeyAndUserIdEven: FPredicate2<number, User> =
        (k: number, user: User) => 0 == k % 2 && 0 == user.id % 2;

      const expectedResult: [number, User] = [u2.id, u2];

      const result = MapUtil.find(sourceMap, isKeyAndUserIdEven);

      expect(result).toBeDefined();
      expect(result![0]).toEqual(expectedResult[0]);
      expect(result![1]).toEqual(expectedResult[1]);
    });

  });



  describe('findOptional', () => {

    it('when given sourceMap is undefined, null or is an empty Map then empty Optional is returned', () => {
      let emptyMap = new Map<number, number>();
      const areKeyValueEven: Predicate2<number, number> =
        Predicate2.of((k: number, v: number) => 0 == k % 2 && 0 == v % 2);

      expect(MapUtil.findOptional(null, areKeyValueEven).isPresent()).toBeFalse();
      expect(MapUtil.findOptional(undefined, areKeyValueEven).isPresent()).toBeFalse();
      expect(MapUtil.findOptional(emptyMap, areKeyValueEven).isPresent()).toBeFalse();
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then empty Optional is returned', () => {
      const sourceMap = new Map<number, number>();
      sourceMap.set(11, 19);

      // @ts-ignore
      expect(MapUtil.findOptional(sourceMap, undefined).isPresent()).toBeFalse();

      // @ts-ignore
      expect(MapUtil.findOptional(sourceMap, null).isPresent()).toBeFalse();
    });


    it('using interfaces, when there is no element that matches provided filter then undefined is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      let sourceMap = new Map<number, Role>();
      sourceMap.set(r1.id, r1);
      sourceMap.set(r2.id, r2);
      sourceMap.set(r3.id, r3);

      const isKeyAndIdGreaterThan10: Predicate2<number, Role> =
        Predicate2.of((k: number, role: Role) => 10 < k && 10 < role.id);

      expect(MapUtil.findOptional(sourceMap, isKeyAndIdGreaterThan10).isPresent()).toBeFalse();
    });


    it('using classes, when there is no element that matches provided filter then undefined is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      let sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u2.id, u2);
      sourceMap.set(u3.id, u3);

      const isKeyAndIdGreaterThan10: FPredicate2<number, User> =
        (k: number, user: User) => 10 < k && 10 < user.id;

      expect(MapUtil.findOptional(sourceMap, isKeyAndIdGreaterThan10).isPresent()).toBeFalse();
    });


    it('using interfaces, when there is an element that matches provided filter then expected element is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      let sourceMap = new Map<number, Role>();
      sourceMap.set(r1.id, r1);
      sourceMap.set(r2.id, r2);
      sourceMap.set(r3.id, r3);

      const isKeyAndRoleIdOdd: Predicate2<number, Role> =
        Predicate2.of((k: number, role: Role) => 1 == k % 2 && 1 == role.id % 2);

      const expectedResult: Optional<[number, Role]> = Optional.of([r1.id, r1]);

      const result = MapUtil.findOptional(sourceMap, isKeyAndRoleIdOdd);

      expect(result.isPresent()).toBeTrue();
      expect(result!.get()[0]).toEqual(expectedResult.get()[0]);
      expect(result!.get()[1]).toEqual(expectedResult.get()[1]);
    });


    it('using classes, when there is an element that matches provided filter then expected element is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');
      const u4 = new User(4, 'user4');

      let sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u2.id, u2);
      sourceMap.set(u3.id, u3);
      sourceMap.set(u4.id, u4);

      const isKeyAndUserIdEven: FPredicate2<number, User> =
        (k: number, user: User) => 0 == k % 2 && 0 == user.id % 2;

      const expectedResult: Optional<[number, User]> = Optional.of([u2.id, u2]);

      const result = MapUtil.findOptional(sourceMap, isKeyAndUserIdEven);

      expect(result.isPresent()).toBeTrue();
      expect(result!.get()[0]).toEqual(expectedResult.get()[0]);
      expect(result!.get()[1]).toEqual(expectedResult.get()[1]);
    });

  });



  describe('foldLeft', () => {

    it('when given sourceMap is null, undefined or empty then initialValue is returned', () => {
      const sourceMap = new Map<number, number>();
      const intValue = 19;

      const intAccumulator: FFunction3<number, number, number, number> =
        (prev: NullableOrUndefined<number>, k: NullableOrUndefined<number>, v: NullableOrUndefined<number>) => prev! * k! * v!;

      const intNullResult = MapUtil.foldLeft(null, intValue, intAccumulator);
      const intUndefinedResult = MapUtil.foldLeft(undefined, intValue, intAccumulator);
      const intEmptyResult = MapUtil.foldLeft(sourceMap, intValue, intAccumulator);

      expect(intNullResult).toEqual(intValue);
      expect(intUndefinedResult).toEqual(intValue);
      expect(intEmptyResult).toEqual(intValue);
    });


    it('when given sourceMap is not empty but accumulator is null or undefined then an error is thrown', () => {
      let sourceMap = new Map<number, number>();
      sourceMap.set(1, 2);

      // @ts-ignore
      expect(() => MapUtil.foldLeft(sourceMap, 11, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.foldLeft(sourceMap, 11, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not null then initialValue applying accumulator is returned', () => {
      let sourceMap = new Map<number, number>();
      sourceMap.set(1, 2);
      sourceMap.set(5, 6);

      const intValue = 10;

      const intAccumulator: FFunction3<number, number, number, number> =
        (prev: number, k: number, v: number) => prev * k * v;

      const intResult = MapUtil.foldLeft(sourceMap, intValue, intAccumulator);

      expect(intResult).toEqual(600);
    });

  });



  describe('isEmpty', () => {

    it('when given mapToVerify is null, undefined or is an empty Map then true will be returned', () => {
      const expectedResult = true;

      expect(MapUtil.isEmpty()).toEqual(expectedResult);
      expect(MapUtil.isEmpty(undefined)).toEqual(expectedResult);
      expect(MapUtil.isEmpty(null)).toEqual(expectedResult);
      expect(MapUtil.isEmpty(new Map<string, number>())).toEqual(expectedResult);
    });


    it('when given mapToVerify contains elements then false will be returned', () => {
      let numberStringEquivalence = new Map<number, string>();
      numberStringEquivalence.set(11, '11');

      const expectedResult = false;

      expect(MapUtil.isEmpty(numberStringEquivalence)).toEqual(expectedResult);
    });

  });



  describe('takeWhile', () => {

    it('when given sourceMap has no elements then empty Map is returned', () => {
      let emptyMap = new Map<number, number>();
      const areKeyValueEven: Predicate2<number, number> =
        Predicate2.of((k: number, v: number) => 0 == k % 2 && 0 == v % 2);

      expect(MapUtil.takeWhile(null, areKeyValueEven)).toEqual(emptyMap);
      expect(MapUtil.takeWhile(undefined, areKeyValueEven)).toEqual(emptyMap);
      expect(MapUtil.takeWhile(emptyMap, areKeyValueEven)).toEqual(emptyMap);
    });


    it('when given sourceMap is not empty but filterPredicate is null or undefined then sourceMap is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      let roleMap = new Map<number, Role>();
      roleMap.set(r1.id, r1);
      roleMap.set(r2.id, r2);
      roleMap.set(r3.id, r3);

      let stringsMap = new Map<string, string>();
      stringsMap.set('', '');
      stringsMap.set('3', '30');
      stringsMap.set('4', '40');

      verifyMaps(
        // @ts-ignore
        MapUtil.takeWhile(roleMap, undefined),
        roleMap
      );

      verifyMaps(
        // @ts-ignore
        MapUtil.takeWhile(stringsMap, null),
        stringsMap
      );
    });


    it('using interfaces, when given sourceMap has elements then filtered Map is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      let sourceMap = new Map<number, Role>();
      sourceMap.set(r1.id, r1);
      sourceMap.set(r2.id, r2);
      sourceMap.set(r3.id, r3);

      const expectedResult = new Map<number, Role>();
      expectedResult.set(r1.id, r1);
      expectedResult.set(r3.id, r3);

      const isKeyAndRoleIdOdd: FPredicate2<number, Role> =
        (k: number, role: Role) => 1 == k % 2 && 1 == role.id % 2;

      verifyMaps(
        MapUtil.takeWhile(sourceMap, isKeyAndRoleIdOdd),
        expectedResult
      );
    });


    it('using classes, when given sourceMap and keyValuesToKeepIfFound has elements then filtered Map is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      let sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u2.id, u2);
      sourceMap.set(u3.id, u3);

      const expectedResult = new Map<number, User>();
      expectedResult.set(u2.id, u2);

      const isKeyAndUserIdEven: Predicate2<number, User> = Predicate2.of((k: number, user: User) => 0 == k % 2 && 0 == user.id % 2);

      verifyMaps(
        MapUtil.takeWhile(sourceMap, isKeyAndUserIdEven),
        expectedResult
      );
    });

  });




  function verifyMaps(actualMap: Map<any, any>,
                      expectedMap: Map<any, any>) {
    expect(actualMap.size).toEqual(expectedMap.size);
    if (0 < expectedMap.size) {
      for (let [key, value] of actualMap!) {
        expect(expectedMap.has(key)).toBeTrue();
        expect(expectedMap.get(key)).toEqual(value);
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