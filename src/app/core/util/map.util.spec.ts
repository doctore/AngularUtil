import { MapUtil, ObjectUtil } from '@app-core/util';
import { Comparator, FComparator } from '@app-core/types/comparator';
import {
  FFunction0,
  FFunction2,
  FFunction3,
  Function0,
  Function2,
  PartialFunction
} from '@app-core/types/function';
import { Optional } from '@app-core/types/functional';
import { FBinaryOperator } from '@app-core/types/function/operator';
import { FPredicate2, Predicate2 } from '@app-core/types/predicate';
import { NullableOrUndefined } from '@app-core/types';
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



  describe('applyOrElse', () => {

    it('when given sourceMap has no elements and partialFunction is provided then empty Map is returned', () => {
      const emptyMap = new Map<string, number>();
      const keyAndValuePlus1ForOdd: PartialFunction<[string, number], [string, number]> =
        PartialFunction.of(
          ([k, v]: [string, number]) => 1 == v % 2,
          ([k, v]: [string, number]) => [k, 1 + v]
        );
      const keyValueMultiply2 = (k: string, v: number): [string, number] => [k, 2 * v];

      expect(MapUtil.applyOrElse(null, keyAndValuePlus1ForOdd, keyValueMultiply2)).toEqual(emptyMap);
      expect(MapUtil.applyOrElse(undefined, keyAndValuePlus1ForOdd, keyValueMultiply2)).toEqual(emptyMap);
      expect(MapUtil.applyOrElse(emptyMap, keyAndValuePlus1ForOdd, keyValueMultiply2)).toEqual(emptyMap);
    });


    it('when given sourceMap has no elements and defaultMapper, orElseMapper and filterPredicate are provided then empty Map is returned', () => {
      let emptyMap = new Map<string, number>();
      const isValueEven = (k: string, v: number) => 1 == v % 2;
      const keyValuePlus1 = (k: string, v: number): [string, number] => [k, 1 + v];
      const keyValueMultiply2 = (k: string, v: number): [string, number] => [k, 2 * v];

      expect(MapUtil.applyOrElse(null, keyValuePlus1, keyValueMultiply2, isValueEven)).toEqual(emptyMap);
      expect(MapUtil.applyOrElse(undefined, keyValuePlus1, keyValueMultiply2, isValueEven)).toEqual(emptyMap);
      expect(MapUtil.applyOrElse(emptyMap, keyValuePlus1, keyValueMultiply2, isValueEven)).toEqual(emptyMap);
    });


    it('when given sourceMap is not empty but partialFunction or orElseMapper are null or undefined then an error is thrown', () => {
      const sourceMap = new Map<string, number>();
      sourceMap.set('a', 1);

      const keyAndValuePlus1ForOdd: PartialFunction<[string, number], [string, number]> =
        PartialFunction.of(
          ([k, v]: [string, number]) => 1 == v % 2,
          ([k, v]: [string, number]) => [k, 1 + v]
        );
      const keyValueMultiply2 = (k: string, v: number): [string, number] => [k, 2 * v];

      // @ts-ignore
      expect(() => MapUtil.applyOrElse(sourceMap, null, keyValueMultiply2)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.applyOrElse(sourceMap, undefined, keyValueMultiply2)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.applyOrElse(sourceMap, keyAndValuePlus1ForOdd, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.applyOrElse(sourceMap, keyAndValuePlus1ForOdd, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty but defaultMapper or orElseMapper are null or undefined then an error is thrown', () => {
      const sourceMap = new Map<string, number>();
      sourceMap.set('a', 1);

      const isKeyEven = (k: number, v: string) => 1 == k % 2;
      const keyValuePlus1 = (k: string, v: number): [string, number] => [k, 1 + v];

      // @ts-ignore
      expect(() => MapUtil.applyOrElse(sourceMap, null, keyValuePlus1,  isKeyEven)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.applyOrElse(sourceMap, undefined, keyValuePlus1, isKeyEven)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.applyOrElse(sourceMap, keyValuePlus1, null, isKeyEven)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.applyOrElse(sourceMap, keyValuePlus1, undefined, isKeyEven)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap has elements and partialFunction and orElseMapper are valid then a new filtered and transformed Map is returned', () => {
      const sourceMap = new Map<string, number>();
      sourceMap.set('A', 1);
      sourceMap.set('B', 2);
      sourceMap.set('D', 4);

      const keyAndValuePlus1ForOdd: PartialFunction<[string, number], [string, number]> =
        PartialFunction.of(
          ([k, v]: [string, number]) => 1 == v % 2,
          ([k, v]: [string, number]) => [k, 1 + v]
        );
      const keyValueMultiply2: Function2<string, number, [string, number]> =
        Function2.of((k: string, v: number) => [k, 2 * v]);

      const expectedResult = new Map<string, number>();
      expectedResult.set('A', 2);
      expectedResult.set('B', 4);
      expectedResult.set('D', 8);

      verifyMaps(
        MapUtil.applyOrElse(sourceMap, keyAndValuePlus1ForOdd, keyValueMultiply2),
        expectedResult
      );
    });


    it('when given sourceMap has elements and and defaultMapper and orElseMapper are valid but filterPredicate is null or undefined then all elements will be transformed using defaultMapper', () => {
      const sourceMap = new Map<string, number>();
      sourceMap.set('A', 1);
      sourceMap.set('B', 2);
      sourceMap.set('D', 4);

      const keyValuePlus1 = (k: string, v: number): [string, number] => [k, 1 + v];

      const keyValueMultiply2: FFunction2<string, number, [string, number]> =
        (k: string, v: number): [string, number] => [k, 2 * v];

      const expectedResult = new Map<string, number>();
      expectedResult.set('A', 2);
      expectedResult.set('B', 3);
      expectedResult.set('D', 5);

      verifyMaps(
        // @ts-ignore
        MapUtil.applyOrElse(sourceMap, keyValuePlus1, keyValueMultiply2, null),
        expectedResult
      );
      verifyMaps(
        // @ts-ignore
        MapUtil.applyOrElse(sourceMap, keyValuePlus1, keyValueMultiply2, undefined),
        expectedResult
      );
    });


    it('when given sourceMap has elements and defaultMapper, orElseMapper and filterPredicate are valid then a new filtered and transformed Map is returned', () => {
      const sourceMap = new Map<string, number>();
      sourceMap.set('A', 1);
      sourceMap.set('B', 2);
      sourceMap.set('D', 4);

      const isValueEven = (k: string, v: number) => 1 == v % 2;
      const keyValuePlus1 = (k: string, v: number): [string, number] => [k, 1 + v];
      const keyValueMultiply2 = (k: string, v: number): [string, number] => [k, 2 * v];

      const expectedResult = new Map<string, number>();
      expectedResult.set('A', 2);
      expectedResult.set('B', 4);
      expectedResult.set('D', 8);

      verifyMaps(
        MapUtil.applyOrElse(sourceMap, keyValuePlus1, keyValueMultiply2, isValueEven),
        expectedResult
      );
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


    it('when given sourceMap has no elements and mapFunction and filterPredicate are provided then empty Map is returned', () => {
      let emptyMap = new Map<number, string>();
      const isKeyEven = (k: number, v: string) => 1 == k % 2;
      const keyAndValueLength = (k: number, v: string): [number, number] => [k, v.length];

      expect(MapUtil.collect(null, keyAndValueLength, isKeyEven)).toEqual(emptyMap);
      expect(MapUtil.collect(undefined, keyAndValueLength, isKeyEven)).toEqual(emptyMap);
      expect(MapUtil.collect(emptyMap, keyAndValueLength, isKeyEven)).toEqual(emptyMap);
    });


    it('when given sourceMap is not empty but partialFunction is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.collect(sourceMap, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.collect(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty but mapFunction is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      const isKeyEven = (k: number, v: string) => 1 == k % 2;

      // @ts-ignore
      expect(() => MapUtil.collect(sourceMap, null, isKeyEven)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.collect(sourceMap, undefined, isKeyEven)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap has elements and partialFunction is valid then a new filtered and transformed Map is returned', () => {
      const sourceMap = new Map<number, string>();
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
      const sourceMap = new Map<number, string>();
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
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'Hola');

      const isKeyEven = (k: number, v: string) => 1 == k % 2;
      const keyAndValueLength = (k: number, v: string): [number, number] => [k, v.length];

      const expectedResult = new Map<number, number>();
      expectedResult.set(1, 2);
      expectedResult.set(3, 4);

      verifyMaps(
        MapUtil.collect(sourceMap, keyAndValueLength, isKeyEven),
        expectedResult
      );
    });

  });



  describe('concat', () => {

    it('when given sourceMaps has no elements then empty Map is returned', () => {
      const emptyMap = new Map<number, number>();
      const plusNumbers: FBinaryOperator<number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! + n2!;

      // @ts-ignore
      expect(MapUtil.concat(null)).toEqual(emptyMap);
      // @ts-ignore
      expect(MapUtil.concat(undefined)).toEqual(emptyMap);
      expect(MapUtil.concat([])).toEqual(emptyMap);

      // @ts-ignore
      expect(MapUtil.concat(null, plusNumbers)).toEqual(emptyMap);
      // @ts-ignore
      expect(MapUtil.concat(undefined, plusNumbers)).toEqual(emptyMap);
      expect(MapUtil.concat([], plusNumbers)).toEqual(emptyMap);
    });


    it('when given sourceMaps has elements but no mergeValueFunction is provided then new Map will be returned on which last value will overwrite previous with same key', () => {
      const sourceMap1 = new Map<string, number>();
      sourceMap1.set('a', 1);
      sourceMap1.set('b', 2);

      const sourceMap2 = new Map<string, number>();
      sourceMap2.set('d', 4);
      sourceMap2.set('b', 10);

      const expectedResult = new Map<string, number>();
      expectedResult.set('a', 1);
      expectedResult.set('b', 10);
      expectedResult.set('d', 4);

      verifyMaps(
        MapUtil.concat([sourceMap1, sourceMap2]),
        expectedResult
      );
    });


    it('when given sourceMaps has elements and mergeValueFunction is provided then new Map will be returned on which last value will be the result of applying mergeValueFunction', () => {
      const sourceMap1 = new Map<string, number>();
      sourceMap1.set('a', 1);
      sourceMap1.set('b', 2);
      sourceMap1.set('c', 3);

      const sourceMap2 = new Map<string, number>();
      sourceMap2.set('d', 4);
      sourceMap2.set('b', 10);

      const sourceMap3 = new Map<string, number>();
      sourceMap3.set('c', 5);

      const plusNumbers = (n1: number, n2: number) => n1 + n2;

      const expectedResult = new Map<string, number>();
      expectedResult.set('a', 1);
      expectedResult.set('b', 12);
      expectedResult.set('c', 8);
      expectedResult.set('d', 4);

      verifyMaps(
        MapUtil.concat([sourceMap1, sourceMap2, sourceMap3], plusNumbers),
        expectedResult
      );
      verifyMaps(
        MapUtil.concat([sourceMap3, sourceMap2, sourceMap1], plusNumbers),
        expectedResult
      );
    });

  });



  describe('dropWhile', () => {

    it('when given sourceMap has no elements then empty Map is returned', () => {
      const emptyMap = new Map<number, number>();
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

      const sourceMap = new Map<number, Role>();
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

      const sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u2.id, u2);
      sourceMap.set(u3.id, u3);

      const expectedResult = new Map<number, User>();
      expectedResult.set(u1.id, u1);
      expectedResult.set(u3.id, u3);

      const isKeyAndUserIdEven = (k: number, user: User) => 0 == k % 2 && 0 == user.id % 2;

      verifyMaps(
        MapUtil.dropWhile(sourceMap, isKeyAndUserIdEven),
        expectedResult
      );
    });

  });



  describe('find', () => {

    it('when given sourceMap is undefined, null or is an empty Map then undefined is returned', () => {
      const emptyMap = new Map<number, number>();
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

      const sourceMap = new Map<number, Role>();
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

      const sourceMap = new Map<number, User>();
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

      const sourceMap = new Map<number, Role>();
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

      const sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u2.id, u2);
      sourceMap.set(u3.id, u3);
      sourceMap.set(u4.id, u4);

      const isKeyAndUserIdEven = (k: number, user: User) => 0 == k % 2 && 0 == user.id % 2;

      const expectedResult: [number, User] = [u2.id, u2];

      const result = MapUtil.find(sourceMap, isKeyAndUserIdEven);

      expect(result).toBeDefined();
      expect(result![0]).toEqual(expectedResult[0]);
      expect(result![1]).toEqual(expectedResult[1]);
    });

  });



  describe('findOptional', () => {

    it('when given sourceMap is undefined, null or is an empty Map then empty Optional is returned', () => {
      const emptyMap = new Map<number, number>();
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

      const sourceMap = new Map<number, Role>();
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

      const sourceMap = new Map<number, User>();
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

      const sourceMap = new Map<number, Role>();
      sourceMap.set(r1.id, r1);
      sourceMap.set(r2.id, r2);
      sourceMap.set(r3.id, r3);

      const isKeyAndRoleIdOdd = (k: number, role: Role) => 1 == k % 2 && 1 == role.id % 2;

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

      const sourceMap = new Map<number, User>();
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
      const sourceMap = new Map<number, number>();
      sourceMap.set(1, 2);

      // @ts-ignore
      expect(() => MapUtil.foldLeft(sourceMap, 11, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.foldLeft(sourceMap, 11, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not null then initialValue applying accumulator is returned', () => {
      const sourceMap = new Map<number, number>();
      sourceMap.set(1, 2);
      sourceMap.set(5, 6);

      const intValue = 10;

      const intAccumulator = (prev: number, k: number, v: number) => prev * k * v;

      const intResult = MapUtil.foldLeft(sourceMap, intValue, intAccumulator);

      expect(intResult).toEqual(600);
    });


    it('when given sourceMap is not null and there is a filter then initialValue applying accumulator only to the elements match filter is returned', () => {
      const sourceMap = new Map<number, number>();
      sourceMap.set(1, 2);
      sourceMap.set(4, 3);
      sourceMap.set(5, 6);

      const intValue = 10;

      const intAccumulator = (prev: number, k: number, v: number) => prev * k * v;
      const isKeyEven = (k: number, v: number) => 1 == k % 2;

      const intResult = MapUtil.foldLeft(sourceMap, intValue, intAccumulator, isKeyEven);

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



  describe('getOrElse', () => {

    it('when sourceMap is null, undefined or empty and defaultValue is a value then defaultValue is returned', () => {
      const emptyMap: Map<string, number> = new Map<string, number>();
      const defaultValue = 12;

      const expectedResult = defaultValue;

      expect(MapUtil.getOrElse(null, 'a', defaultValue)).toEqual(expectedResult);
      expect(MapUtil.getOrElse(undefined, 'a', defaultValue)).toEqual(expectedResult);
      expect(MapUtil.getOrElse(emptyMap, 'a', defaultValue)).toEqual(expectedResult);
    });


    it('when sourceMap is null, undefined or empty and defaultValue is a TFunction0 then defaultValue result is returned', () => {
      const emptyMap: Map<string, number> = new Map<string, number>();

      const defaultValueRaw = () => 12;
      const defaultValueFF: FFunction0<number> = () => 12;
      const defaultValueF: Function0<number> = Function0.of(() => 12);

      const expectedResult = 12;

      expect(MapUtil.getOrElse(null, 'a', defaultValueRaw)).toEqual(expectedResult);
      expect(MapUtil.getOrElse(undefined, 'a', defaultValueFF)).toEqual(expectedResult);
      expect(MapUtil.getOrElse(emptyMap, 'a', defaultValueF)).toEqual(expectedResult);
    });


    it('when sourceMap has elements, provided key is not found and defaultValue is a value then defaultValue is returned', () => {
      const sourceMap: Map<string, number> = new Map<string, number>();
      sourceMap.set('a', 11);
      sourceMap.set('b', 12);

      const defaultValue = 15;

      const expectedResult = defaultValue;

      expect(MapUtil.getOrElse(sourceMap, 'e', defaultValue)).toEqual(expectedResult);
      expect(MapUtil.getOrElse(sourceMap, 'f', defaultValue)).toEqual(expectedResult);
    });



    it('when sourceMap has elements, provided key is not found and defaultValue is a TFunction0 then defaultValue result is returned', () => {
      const sourceMap: Map<string, number> = new Map<string, number>();
      sourceMap.set('a', 11);
      sourceMap.set('b', 12);

      const defaultValueRaw = () => 15;
      const defaultValueFF: FFunction0<number> = () => 15;
      const defaultValueF: Function0<number> = Function0.of(() => 15);

      const expectedResult = 15;

      expect(MapUtil.getOrElse(sourceMap, 'e', defaultValueRaw)).toEqual(expectedResult);
      expect(MapUtil.getOrElse(sourceMap, 'f', defaultValueFF)).toEqual(expectedResult);
      expect(MapUtil.getOrElse(sourceMap, 'g', defaultValueF)).toEqual(expectedResult);
    });


    it('when sourceMap has elements, provided key is found and defaultValue is a value then the value related with the key is returned', () => {
      const sourceMap: Map<string, number> = new Map<string, number>();
      sourceMap.set('a', 11);
      sourceMap.set('b', 12);

      const defaultValue = 15;

      expect(MapUtil.getOrElse(sourceMap, 'a', defaultValue)).toEqual(11);
      expect(MapUtil.getOrElse(sourceMap, 'b', defaultValue)).toEqual(12);
    });


    it('when sourceMap has elements, provided key is found and defaultValue is a TFunction0 then the value related with the key is returned', () => {
      const sourceMap: Map<string, number> = new Map<string, number>();
      sourceMap.set('a', 11);
      sourceMap.set('b', 12);
      sourceMap.set('c', 13);

      const defaultValueRaw = () => 15;
      const defaultValueFF: FFunction0<number> = () => 15;
      const defaultValueF: Function0<number> = Function0.of(() => 15);

      expect(MapUtil.getOrElse(sourceMap, 'a', defaultValueRaw)).toEqual(11);
      expect(MapUtil.getOrElse(sourceMap, 'b', defaultValueFF)).toEqual(12);
      expect(MapUtil.getOrElse(sourceMap, 'c', defaultValueF)).toEqual(13);
    });

  });



  describe('groupBy', () => {

    it('when given sourceMap has no elements then empty Map is returned', () => {
      const emptyMap: Map<number, string> = new Map<number, string>();

      const keyMod2: FFunction2<number, string, number> =
        (k: number, v: string) => k % 2;

      const expectedResult: Map<number, Map<number, string>> = new Map<number, Map<number, string>>();

      // @ts-ignore
      expect(MapUtil.groupBy(null)).toEqual(expectedResult);
      // @ts-ignore
      expect(MapUtil.groupBy(undefined)).toEqual(expectedResult);
      // @ts-ignore
      expect(MapUtil.groupBy(emptyMap)).toEqual(expectedResult);

      expect(MapUtil.groupBy(null, keyMod2)).toEqual(expectedResult);
      expect(MapUtil.groupBy(undefined, keyMod2)).toEqual(expectedResult);
      expect(MapUtil.groupBy(emptyMap, keyMod2)).toEqual(expectedResult);
    });


    it('when given sourceMap is not empty but discriminator is null or undefined then an error is thrown', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.groupBy(sourceMap, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupBy(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap has elements and discriminator is provided but filterPredicate is null or undefined then all elements will be transformed using discriminator', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(7, 'World');
      sourceMap.set(11, 'Ok');

      const keyMod2: Function2<number, string, number> =
        Function2.of((k: number, v: string) => k % 2);

      const expectedResult: Map<number, Map<number, string>> = new Map<number, Map<number, string>>();
      expectedResult.set(0, MapUtil.of([[2, 'Hello']]));
      expectedResult.set(1, MapUtil.of([[1, 'Hi'], [7, 'World'], [11, 'Ok']]));

      verifyMaps(
        MapUtil.groupBy(sourceMap, keyMod2),
        expectedResult
      );
      verifyMaps(
        // @ts-ignore
        MapUtil.groupBy(sourceMap, keyMod2, null),
        expectedResult
      );
      verifyMaps(
        MapUtil.groupBy(sourceMap, keyMod2, undefined),
        expectedResult
      );
    });


    it('when given sourceMap has elements and discriminator and filterPredicate are provided then a new filtered and transformed Map is returned', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(7, 'World');
      sourceMap.set(11, 'Ok');

      const keyMod2 = (k: number, v: string) => k % 2;
      const keyLowerThan10 = (k: number, v: string) => 10 > k;

      const expectedResult: Map<number, Map<number, string>> = new Map<number, Map<number, string>>();
      expectedResult.set(0, MapUtil.of([[2, 'Hello']]));
      expectedResult.set(1, MapUtil.of([[1, 'Hi'], [7, 'World']]));

      verifyMaps(
        MapUtil.groupBy(sourceMap, keyMod2, keyLowerThan10),
        expectedResult
      );
    });

  });



  describe('groupByMultiKey', () => {

    it('when given sourceMap has no elements then empty Map is returned', () => {
      const emptyMap: Map<number, string> = new Map<number, string>();

      const oddEvenSmallerOrGreaterEqualThan5Key: FFunction2<number, string, string[]> =
        (k: number, v: string) => {
          const keys: string[] = [];
          if (0 == k % 2) {
            keys.push("evenKey");
          }
          else {
            keys.push("oddKey");
          }
          if (5 > k) {
            keys.push("smaller5Key");
          } else {
            keys.push("greaterEqual5Key");
          }
          return keys;
        };

      const expectedResult: Map<number, Map<number, string>> = new Map<number, Map<number, string>>();

      // @ts-ignore
      expect(MapUtil.groupByMultiKey(null)).toEqual(expectedResult);
      // @ts-ignore
      expect(MapUtil.groupByMultiKey(undefined)).toEqual(expectedResult);
      // @ts-ignore
      expect(MapUtil.groupByMultiKey(emptyMap)).toEqual(expectedResult);

      expect(MapUtil.groupByMultiKey(null, oddEvenSmallerOrGreaterEqualThan5Key)).toEqual(expectedResult);
      expect(MapUtil.groupByMultiKey(undefined, oddEvenSmallerOrGreaterEqualThan5Key)).toEqual(expectedResult);
      expect(MapUtil.groupByMultiKey(emptyMap, oddEvenSmallerOrGreaterEqualThan5Key)).toEqual(expectedResult);
    });


    it('when given sourceMap is not empty but discriminator is null or undefined then an error is thrown', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.groupByMultiKey(sourceMap, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupByMultiKey(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap has elements and discriminator is provided but filterPredicate is null or undefined then all elements will be transformed using discriminator', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(7, 'World');
      sourceMap.set(11, 'Ok');

      const oddEvenSmallerOrGreaterEqualThan5Key: Function2<number, string, string[]> =
        Function2.of((k: number, v: string) => {
          const keys: string[] = [];
          if (0 == k % 2) {
            keys.push("evenKey");
          }
          else {
            keys.push("oddKey");
          }
          if (5 > k) {
            keys.push("smaller5Key");
          } else {
            keys.push("greaterEqual5Key");
          }
          return keys;
        });

      const expectedResult: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
      expectedResult.set('evenKey', MapUtil.of([[2, 'Hello']]));
      expectedResult.set('oddKey', MapUtil.of([[1, 'Hi'], [7, 'World'], [11, 'Ok']]));
      expectedResult.set('smaller5Key', MapUtil.of([[1, 'Hi'], [2, 'Hello']]));
      expectedResult.set('greaterEqual5Key', MapUtil.of([[7, 'World'], [11, 'Ok']]));

      verifyMaps(
        MapUtil.groupByMultiKey(sourceMap, oddEvenSmallerOrGreaterEqualThan5Key),
        expectedResult
      );
      verifyMaps(
        // @ts-ignore
        MapUtil.groupByMultiKey(sourceMap, oddEvenSmallerOrGreaterEqualThan5Key, null),
        expectedResult
      );
      verifyMaps(
        MapUtil.groupByMultiKey(sourceMap, oddEvenSmallerOrGreaterEqualThan5Key, undefined),
        expectedResult
      );
    });


    it('when given sourceMap has elements and discriminator and filterPredicate are provided then a new filtered and transformed Map is returned', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(7, 'World');
      sourceMap.set(11, 'Ok');

      const oddEvenSmallerOrGreaterEqualThan5Key =
        (k: number, v: string) => {
          const keys: string[] = [];
          if (0 == k % 2) {
            keys.push("evenKey");
          }
          else {
            keys.push("oddKey");
          }
          if (5 > k) {
            keys.push("smaller5Key");
          } else {
            keys.push("greaterEqual5Key");
          }
          return keys;
      };
      const keyLowerThan10 = (k: number, v: string) => 10 > k;

      const expectedResult: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
      expectedResult.set('evenKey', MapUtil.of([[2, 'Hello']]));
      expectedResult.set('oddKey', MapUtil.of([[1, 'Hi'], [7, 'World']]));
      expectedResult.set('smaller5Key', MapUtil.of([[1, 'Hi'], [2, 'Hello']]));
      expectedResult.set('greaterEqual5Key', MapUtil.of([[7, 'World']]));

      verifyMaps(
        MapUtil.groupByMultiKey(sourceMap, oddEvenSmallerOrGreaterEqualThan5Key, keyLowerThan10),
        expectedResult
      );
    });

  });



  describe('groupMap', () => {

    it('when given sourceMap has no elements and partialFunction is provided then empty Map is returned', () => {
      const emptyMap: Map<number, string> = new Map<number, string>();

      const keyMod3AndValueLengthForOddKeyOrGreaterThan6: PartialFunction<[number, string], [number, number]> =
        PartialFunction.of(
          ([k, v]: [number, string]) => 1 == k % 2,
          ([k, v]: [number, string]) => [k % 3, v.length]
        );

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(MapUtil.groupMap(null, keyMod3AndValueLengthForOddKeyOrGreaterThan6)).toEqual(expectedResult);
      expect(MapUtil.groupMap(undefined, keyMod3AndValueLengthForOddKeyOrGreaterThan6)).toEqual(expectedResult);
      expect(MapUtil.groupMap(emptyMap, keyMod3AndValueLengthForOddKeyOrGreaterThan6)).toEqual(expectedResult);
    });


    it('when given sourceMap has no elements and discriminatorKey, valueMapper and filterPredicate are provided then empty Map is returned', () => {
      const emptyMap: Map<number, string> = new Map<number, string>();

      const isKeyOdd = (k: number, v: string) => 1 == k % 2;
      const sameKey = (k: number, v: string) => k;
      const valueLength = (k: number, v: string) => v.length;

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(MapUtil.groupMap(null, sameKey, valueLength, isKeyOdd)).toEqual(expectedResult);
      expect(MapUtil.groupMap(undefined, sameKey, valueLength, isKeyOdd)).toEqual(expectedResult);
      expect(MapUtil.groupMap(emptyMap, sameKey, valueLength, isKeyOdd)).toEqual(expectedResult);
    });


    it('when given sourceMap is not empty but partialFunction is null or undefined then an error is thrown', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.groupMap(sourceMap, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupMap(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty but discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'a');

      const isKeyOdd = (k: number, v: string) => 1 == k % 2;
      const sameKey = (k: number, v: string) => k;
      const valueLength = (k: number, v: string) => v.length;

      // @ts-ignore
      expect(() => MapUtil.groupMap(sourceMap, null, valueLength,  isKeyOdd)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupMap(sourceMap, undefined, valueLength, isKeyOdd)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.groupMap(sourceMap, sameKey, null, isKeyOdd)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupMap(sourceMap, sameKey, undefined, isKeyOdd)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap has elements and partialFunction is valid then a new filtered and transformed Map is returned', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(7, 'World');
      sourceMap.set(8, 'Ok');

      const keyMod3AndValueLengthForOddKeyOrGreaterThan6: PartialFunction<[number, string], [number, number]> =
        PartialFunction.of(
          ([k, v]: [number, string]) => 1 == k % 2 || 6 < k,
          ([k, v]: [number, string]) => [k % 3, v.length]
        );

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(1, [2, 5]);
      expectedResult.set(2, [2]);

      verifyMaps(
        MapUtil.groupMap(sourceMap, keyMod3AndValueLengthForOddKeyOrGreaterThan6),
        expectedResult
      );
    });


    it('when given sourceMap has elements and discriminatorKey and valueMapper are valid but filterPredicate is null or undefined then all elements will be transformed using discriminatorKey and valueMapper', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(7, 'World');
      sourceMap.set(8, 'Ok');

      const keyMod3 = (k: number, v: string) => k % 3;
      const valueLength = (k: number, v: string) => v.length;

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(1, [2, 5]);
      expectedResult.set(2, [5, 2]);

      verifyMaps(
        // @ts-ignore
        MapUtil.groupMap(sourceMap, keyMod3, valueLength, null),
        expectedResult
      );

      verifyMaps(
        MapUtil.groupMap(sourceMap, keyMod3, valueLength, undefined),
        expectedResult
      );
    });


    it('when given sourceMap has elements and discriminatorKey, valueMapper and filterPredicate are valid then a new filtered and transformed Map is returned', () => {
      const sourceMap: Map<number, string> = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(7, 'World');
      sourceMap.set(8, 'Ok');

      const isKeyOddOrGreaterThan6 = (k: number, v: string) => 1 == k % 2 || 6 < k;
      const keyMod3 = (k: number, v: string) => k % 3;
      const valueLength = (k: number, v: string) => v.length;

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(1, [2, 5]);
      expectedResult.set(2, [2]);

      verifyMaps(
        MapUtil.groupMap(sourceMap, keyMod3, valueLength, isKeyOddOrGreaterThan6),
        expectedResult
      );
    });

  });



  describe('groupMapReduce', () => {

    it('when given sourceMap has no elements and reduceValues, partialFunction are provided then empty Map is returned', () => {
      let emptyMap = new Map<number, string>();

      const sumValues = (n1: number, n2: number) => n1 + n2;
      const mod3AsKeyAndPlus1AsValueForLowerThan10: PartialFunction<[number, string], [number, number]> =
        PartialFunction.of(
          ([k, v]: [number, string]) => 10 > k,
          ([k, v]: [number, string]) => [k % 3, v.length + 1]
        );

      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(MapUtil.groupMapReduce(null, sumValues, mod3AsKeyAndPlus1AsValueForLowerThan10)).toEqual(expectedResult);
      expect(MapUtil.groupMapReduce(undefined, sumValues, mod3AsKeyAndPlus1AsValueForLowerThan10)).toEqual(expectedResult);
      expect(MapUtil.groupMapReduce(emptyMap, sumValues, mod3AsKeyAndPlus1AsValueForLowerThan10)).toEqual(expectedResult);
    });


    it('when given sourceMap has no elements and reduceValues, discriminatorKey and valueMapper are provided then empty Map is returned', () => {
      let emptyMap = new Map<number, string>();

      const sumValues: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const keyMod3: FFunction2<number, string, number> =
        (k: number, v: string) => k % 3;

      const valueLengthPlus1: FFunction2<number, string, number> =
        (k: number, v: string) => v.length + 1;

      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(MapUtil.groupMapReduce(null, sumValues, keyMod3, valueLengthPlus1)).toEqual(expectedResult);
      expect(MapUtil.groupMapReduce(undefined, sumValues, keyMod3, valueLengthPlus1)).toEqual(expectedResult);
      expect(MapUtil.groupMapReduce(emptyMap, sumValues, keyMod3, valueLengthPlus1)).toEqual(expectedResult);
    });


    it('when given sourceMap is not empty but reduceValues or partialFunction is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      const sumValues = (n1: number, n2: number) => n1 + n2;
      const mod3AsKeyAndPlus1AsValueForLowerThan10: PartialFunction<[number, string], [number, number]> =
        PartialFunction.of(
          ([k, v]: [number, string]) => 10 > k,
          ([k, v]: [number, string]) => [k % 3, v.length + 1]
        );

      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, null, mod3AsKeyAndPlus1AsValueForLowerThan10)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, undefined, mod3AsKeyAndPlus1AsValueForLowerThan10)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, sumValues, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, sumValues, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty but reduceValues, discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      const sumValues: FBinaryOperator<number> =
        (n1: number, n2: number) => n1 + n2;

      const keyMod3: FFunction2<number, string, number> =
        (k: number, v: string) => k % 3;

      const valueLengthPlus1: FFunction2<number, string, number> =
        (k: number, v: string) => v.length + 1;

      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, null, keyMod3,  valueLengthPlus1)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, undefined, keyMod3, valueLengthPlus1)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, sumValues, null,  valueLengthPlus1)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, sumValues, undefined, valueLengthPlus1)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, sumValues, keyMod3,  null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.groupMapReduce(sourceMap, sumValues, keyMod3, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap has elements and reduceValues and partialFunction are valid then a new filtered and transformed Map is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hola');
      sourceMap.set(4, '');
      sourceMap.set(5, 'World');
      sourceMap.set(6, '!');
      sourceMap.set(11, 'ABC');

      const sumValues = (n1: number, n2: number) => n1 + n2;
      const mod3AsKeyAndPlus1AsValueForLowerThan10: PartialFunction<[number, string], [number, number]> =
        PartialFunction.of(
          ([k, v]: [number, string]) => 10 > k,
          ([k, v]: [number, string]) => [k % 3, v.length + 1]
        );

      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(0, 2);
      expectedResult.set(1, 4);
      expectedResult.set(2, 11);

      verifyMaps(
        MapUtil.groupMapReduce(sourceMap, sumValues, mod3AsKeyAndPlus1AsValueForLowerThan10),
        expectedResult
      );
    });


    it('when given sourceMap has elements and reduceValues, discriminatorKey and valueMapper are valid then a transformed Map is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hola');
      sourceMap.set(4, '');
      sourceMap.set(5, 'World');
      sourceMap.set(6, '!');
      sourceMap.set(11, 'ABC');

      const sumValues = (n1: number, n2: number) => n1 + n2;
      const keyMod3 = (k: number, v: string) => k % 3;
      const valueLengthPlus1 = (k: number, v: string) => v.length + 1;

      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(0, 2);
      expectedResult.set(1, 4);
      expectedResult.set(2, 15);

      verifyMaps(
        MapUtil.groupMapReduce(sourceMap, sumValues, keyMod3, valueLengthPlus1),
        expectedResult
      );
    });

  });



  describe('map', () => {

    it('when given sourceMap has no elements and mapFunction is not provided then empty Map is returned', () => {
      let emptyMap = new Map<number, string>();

      // @ts-ignore
      expect(MapUtil.map(null, null)).toEqual(emptyMap);
      // @ts-ignore
      expect(MapUtil.map(undefined, undefined)).toEqual(emptyMap);
      // @ts-ignore
      expect(MapUtil.map(emptyMap, null)).toEqual(emptyMap);
      // @ts-ignore
      expect(MapUtil.map(emptyMap, undefined)).toEqual(emptyMap);
    });


    it('when given sourceMap has no elements and mapFunction is provided then empty Map is returned', () => {
      let emptyMap = new Map<number, string>();
      const keyAndValueLength: FFunction2<number, string, [number, number]> =
        (k: number, v: string) => [k, v.length];

      expect(MapUtil.map(null, keyAndValueLength)).toEqual(emptyMap);
      expect(MapUtil.map(undefined, keyAndValueLength)).toEqual(emptyMap);
      expect(MapUtil.map(emptyMap, keyAndValueLength)).toEqual(emptyMap);
    });


    it('when given sourceMap is not empty but mapFunction is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.map(sourceMap, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.map(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap has elements and mapFunction is valid then a new transformed Map is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'Hola');

      const keyAndValueLength = (k: number, v: string): [number, number] => [k, v.length];
      const keyPlus1AndValueV2 = (k: number, v: string): [number, string] => [k+1, v + 'v2'];

      const expectedKeyAndValueLengthResult = new Map<number, number>();
      expectedKeyAndValueLengthResult.set(1, 2);
      expectedKeyAndValueLengthResult.set(2, 5);
      expectedKeyAndValueLengthResult.set(3, 4);

      const expectedLeyPlus1AndValueV2Result = new Map<number, string>();
      expectedLeyPlus1AndValueV2Result.set(2, 'Hiv2');
      expectedLeyPlus1AndValueV2Result.set(3, 'Hellov2');
      expectedLeyPlus1AndValueV2Result.set(4, 'Holav2');

      verifyMaps(
        MapUtil.map(sourceMap, keyAndValueLength),
        expectedKeyAndValueLengthResult
      );
      verifyMaps(
        MapUtil.map(sourceMap, keyPlus1AndValueV2),
        expectedLeyPlus1AndValueV2Result
      );
    });

  });



  describe('max', () => {

    it('when given sourceMap has no elements and comparator is not provided then undefined is returned', () => {
      let emptyMap = new Map<number, string>();

      // @ts-ignore
      expect(MapUtil.max(null, null)).toBeUndefined();
      // @ts-ignore
      expect(MapUtil.max(undefined, undefined)).toBeUndefined();
      // @ts-ignore
      expect(MapUtil.max(emptyMap, null)).toBeUndefined();
      // @ts-ignore
      expect(MapUtil.max(emptyMap, undefined)).toBeUndefined();
    });


    it('when given sourceMap has no elements and comparator is provided then undefined is returned', () => {
      let emptyMap = new Map<number, string>();

      const compareKeys: FComparator<[number, string]> =
        (a: [number, string], b: [number, string]) => a[0] - b[0];

      expect(MapUtil.max(null, compareKeys)).toBeUndefined();
      expect(MapUtil.max(undefined, compareKeys)).toBeUndefined();
      expect(MapUtil.max(emptyMap, compareKeys)).toBeUndefined();
    });


    it('when given sourceMap is not empty but comparator is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.max(sourceMap, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.max(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty and comparator is valid then its largest element is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'abcde');
      sourceMap.set(4, 'dfeghijklm');
      sourceMap.set(11, 'k');
      sourceMap.set(3, 'cd');

      const compareKeys = (a: [number, string], b: [number, string]) => a[0] - b[0];
      const compareElements: Comparator<[number, string]> =
        Comparator.of(
          (a: [number, string], b: [number, string]) => {
            const finalA = a[0] + a[1].length;
            const finalB = b[0] + b[1].length;
            return finalA - finalB;
          }
        );

      expect(MapUtil.max(sourceMap, compareKeys)).toEqual([11, 'k']);
      expect(MapUtil.max(sourceMap, compareElements)).toEqual([4, 'dfeghijklm']);
    });

  });



  describe('maxOptional', () => {

    it('when given sourceMap has no elements and comparator is not provided then empty Optional is returned', () => {
      let emptyMap = new Map<number, string>();

      // @ts-ignore
      expect(MapUtil.maxOptional(null, null).isPresent()).toBeFalse();
      // @ts-ignore
      expect(MapUtil.maxOptional(undefined, undefined).isPresent()).toBeFalse();
      // @ts-ignore
      expect(MapUtil.maxOptional(emptyMap, null).isPresent()).toBeFalse();
      // @ts-ignore
      expect(MapUtil.maxOptional(emptyMap, undefined).isPresent()).toBeFalse();
    });


    it('when given sourceMap has no elements and comparator is provided then empty Optional is returned', () => {
      let emptyMap = new Map<number, string>();

      const compareKeys: FComparator<[number, string]> =
        (a: [number, string], b: [number, string]) => a[0] - b[0];

      expect(MapUtil.maxOptional(null, compareKeys).isPresent()).toBeFalse();
      expect(MapUtil.maxOptional(undefined, compareKeys).isPresent()).toBeFalse();
      expect(MapUtil.maxOptional(emptyMap, compareKeys).isPresent()).toBeFalse();
    });


    it('when given sourceMap is not empty but comparator is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.maxOptional(sourceMap, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.maxOptional(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty and comparator is valid then its largest element is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'abcde');
      sourceMap.set(4, 'dfeghijklm');
      sourceMap.set(11, 'k');
      sourceMap.set(3, 'cd');

      const compareKeys = (a: [number, string], b: [number, string]) => a[0] - b[0];
      const compareElements: Comparator<[number, string]> =
        Comparator.of(
          (a: [number, string], b: [number, string]) => {
            const finalA = a[0] + a[1].length;
            const finalB = b[0] + b[1].length;
            return finalA - finalB;
          }
        );

      const resultKeys = MapUtil.maxOptional(sourceMap, compareKeys);
      const resultElements = MapUtil.maxOptional(sourceMap, compareElements);

      expect(resultKeys.isPresent()).toBeTrue();
      expect(resultKeys.get()).toEqual([11, 'k']);

      expect(resultElements.isPresent()).toBeTrue();
      expect(resultElements.get()).toEqual([4, 'dfeghijklm']);
    });

  });



  describe('min', () => {

    it('when given sourceMap has no elements and comparator is not provided then undefined is returned', () => {
      let emptyMap = new Map<number, string>();

      // @ts-ignore
      expect(MapUtil.min(null, null)).toBeUndefined();
      // @ts-ignore
      expect(MapUtil.min(undefined, undefined)).toBeUndefined();
      // @ts-ignore
      expect(MapUtil.min(emptyMap, null)).toBeUndefined();
      // @ts-ignore
      expect(MapUtil.min(emptyMap, undefined)).toBeUndefined();
    });


    it('when given sourceMap has no elements and comparator is provided then undefined is returned', () => {
      let emptyMap = new Map<number, string>();

      const compareKeys: FComparator<[number, string]> =
        (a: [number, string], b: [number, string]) => a[0] - b[0];

      expect(MapUtil.min(null, compareKeys)).toBeUndefined();
      expect(MapUtil.min(undefined, compareKeys)).toBeUndefined();
      expect(MapUtil.min(emptyMap, compareKeys)).toBeUndefined();
    });


    it('when given sourceMap is not empty but comparator is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.min(sourceMap, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.min(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty and comparator is valid then its largest element is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'abcde');
      sourceMap.set(4, 'dfeghijklm');
      sourceMap.set(11, 'k');
      sourceMap.set(3, 'cd');

      const compareKeys = (a: [number, string], b: [number, string]) => a[0] - b[0];
      const compareElements: Comparator<[number, string]> =
        Comparator.of(
          (a: [number, string], b: [number, string]) => {
            const finalA = a[0] + a[1].length;
            const finalB = b[0] + b[1].length;
            return finalA - finalB;
          }
        );

      expect(MapUtil.min(sourceMap, compareKeys)).toEqual([1, 'abcde']);
      expect(MapUtil.min(sourceMap, compareElements)).toEqual([3, 'cd']);
    });

  });



  describe('minOptional', () => {

    it('when given sourceMap has no elements and comparator is not provided then empty Optional is returned', () => {
      let emptyMap = new Map<number, string>();

      // @ts-ignore
      expect(MapUtil.minOptional(null, null).isPresent()).toBeFalse();
      // @ts-ignore
      expect(MapUtil.minOptional(undefined, undefined).isPresent()).toBeFalse();
      // @ts-ignore
      expect(MapUtil.minOptional(emptyMap, null).isPresent()).toBeFalse();
      // @ts-ignore
      expect(MapUtil.minOptional(emptyMap, undefined).isPresent()).toBeFalse();
    });


    it('when given sourceMap has no elements and comparator is provided then empty Optional is returned', () => {
      let emptyMap = new Map<number, string>();

      const compareKeys: FComparator<[number, string]> =
        (a: [number, string], b: [number, string]) => a[0] - b[0];

      expect(MapUtil.minOptional(null, compareKeys).isPresent()).toBeFalse();
      expect(MapUtil.minOptional(undefined, compareKeys).isPresent()).toBeFalse();
      expect(MapUtil.minOptional(emptyMap, compareKeys).isPresent()).toBeFalse();
    });


    it('when given sourceMap is not empty but comparator is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.minOptional(sourceMap, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.minOptional(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty and comparator is valid then its largest element is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'abcde');
      sourceMap.set(4, 'dfeghijklm');
      sourceMap.set(11, 'k');
      sourceMap.set(3, 'cd');

      const compareKeys = (a: [number, string], b: [number, string]) => a[0] - b[0];
      const compareElements: Comparator<[number, string]> =
        Comparator.of(
          (a: [number, string], b: [number, string]) => {
            const finalA = a[0] + a[1].length;
            const finalB = b[0] + b[1].length;
            return finalA - finalB;
          }
        );

      const resultKeys = MapUtil.minOptional(sourceMap, compareKeys);
      const resultElements = MapUtil.minOptional(sourceMap, compareElements);

      expect(resultKeys.isPresent()).toBeTrue();
      expect(resultKeys.get()).toEqual([1, 'abcde']);

      expect(resultElements.isPresent()).toBeTrue();
      expect(resultElements.get()).toEqual([3, 'cd']);
    });

  });



  describe('of', () => {

    it('when given tuples are null or undefined then an empty Map is returned', () => {
      let emptyMap = new Map<number, string>();

      expect(MapUtil.of()).toEqual(emptyMap);
      expect(MapUtil.of(null)).toEqual(emptyMap);
      expect(MapUtil.of(undefined)).toEqual(emptyMap);
    });


    it('when given tuples have elements then a new Map containing them is returned', () => {
      let expectedResult = new Map<number, string>();
      expectedResult.set(1, 'a');
      expectedResult.set(3, 'c');
      expectedResult.set(4, 'd');

      expect(MapUtil.of([[1, 'a'], [3, 'c'], [4, 'd']])).toEqual(expectedResult);
    });

  });



  describe('putIfAbsent', () => {

    it('when given sourceMap is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => MapUtil.putIfAbsent(undefined, 'A', 11)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.putIfAbsent(null, 'A', 11)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is empty then key and value is always added', () => {
      const key = 'A';
      const value = 11;

      const emptyMap: Map<string, number> = new Map<string, number>();

      expect(MapUtil.putIfAbsent(emptyMap, key, value)).toBeUndefined();
      expect(emptyMap.size).toEqual(1);
      expect(emptyMap.has(key)).toBeTrue();
    });


    it('when given sourceMap contains the key then no new value is added and existing one keeps and is returned', () => {
      const key = 'A';
      const value = 11;

      const mapWithNullValue: Map<string, number> = new Map<string, number>();
      // @ts-ignore
      mapWithNullValue.set(key, null);

      const mapWithOtherValue: Map<string, number> = new Map<string, number>();
      mapWithOtherValue.set(key, value + 1);

      expect(MapUtil.putIfAbsent(mapWithNullValue, key, value)).toBeNull();
      expect(mapWithNullValue.has(key)).toBeTrue();
      expect(mapWithNullValue.get(key)).toBeNull();

      expect(MapUtil.putIfAbsent(mapWithOtherValue, key, value)).toEqual(value + 1);
      expect(mapWithOtherValue.has(key)).toBeTrue();
      expect(mapWithOtherValue.get(key)).toEqual(value + 1);
    });


    it('when given sourceMap does not contain the key then new value is added and undefined is returned', () => {
      const key = 'A';
      const value = 11;

      const map: Map<string, number> = new Map<string, number>();
      map.set('B', 12);

      expect(MapUtil.putIfAbsent(map, key, value)).toBeUndefined();
      expect(map.has(key)).toBeTrue();
      expect(map.get(key)).toEqual(value);
    });

  });



  describe('reduce', () => {

    it('when given sourceMap is null, undefined or empty then undefined is returned', () => {
      const emptyMap = new Map<number, string>();

      const accumulator: FBinaryOperator<[number, string]> =
        (prev: [number, string], current: [number, string]) => [prev[0] + current[0], prev[1] + ' ' + current[1]];

      expect(MapUtil.reduce(null, accumulator)).toBeUndefined();
      expect(MapUtil.reduce(undefined, accumulator)).toBeUndefined();
      expect(MapUtil.reduce(emptyMap, accumulator)).toBeUndefined();
    });


    it('when given sourceMap is not empty but accumulator is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');

      // @ts-ignore
      expect(() => MapUtil.reduce(sourceMap, null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => MapUtil.reduce(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty and accumulator is valid then accumulator is applied to contained elements', () => {
      const sourceMap1 = new Map<number, string>();
      sourceMap1.set(1, 'Hi');

      const sourceMap2 = new Map<number, string>();
      sourceMap2.set(1, 'Hi');
      sourceMap2.set(2, 'Hello');
      sourceMap2.set(3, 'World');

      const accumulator =
        (prev: [number, string], current: [number, string]): [number, string] => [prev[0] + current[0], prev[1] + ' ' + current[1]];

      expect(MapUtil.reduce(sourceMap1, accumulator)).toEqual([1, 'Hi']);
      expect(MapUtil.reduce(sourceMap2, accumulator)).toEqual([6, 'Hi Hello World']);
    });

  });



  describe('removeAll', () => {

    it('when given sourceMap is null, undefined or empty then empty map is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'World');

      const emptyMap = new Map<number, string>();

      const mapElementsComparison = (e1: [number, string], e2: [number, string]) => e1[0] == e2[0] && e1[1] == e2[1];

      expect(MapUtil.removeAll(null, sourceMap)).toEqual(emptyMap);
      expect(MapUtil.removeAll(undefined, sourceMap)).toEqual(emptyMap);
      expect(MapUtil.removeAll(emptyMap, sourceMap)).toEqual(emptyMap);

      expect(MapUtil.removeAll(null, sourceMap, mapElementsComparison)).toEqual(emptyMap);
      expect(MapUtil.removeAll(undefined, sourceMap, mapElementsComparison)).toEqual(emptyMap);
      expect(MapUtil.removeAll(emptyMap, sourceMap, mapElementsComparison)).toEqual(emptyMap);
    });


    it('when given toRemoveMap is null, undefined or empty then given sourceMap is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'World');

      const emptyMap = new Map<number, string>();

      const mapElementsComparison = (e1: [number, string], e2: [number, string]) => e1[0] == e2[0] && e1[1] == e2[1];

      verifyMaps(
        MapUtil.removeAll(sourceMap, null),
        sourceMap
      );
      verifyMaps(
        MapUtil.removeAll(sourceMap, undefined),
        sourceMap
      );
      verifyMaps(
        MapUtil.removeAll(sourceMap, emptyMap),
        sourceMap
      );

      verifyMaps(
        MapUtil.removeAll(sourceMap, null, mapElementsComparison),
        sourceMap
      );
      verifyMaps(
        MapUtil.removeAll(sourceMap, undefined, mapElementsComparison),
        sourceMap
      );
      verifyMaps(
        MapUtil.removeAll(sourceMap, emptyMap, mapElementsComparison),
        sourceMap
      );
    });


    it('when no areEqualsComparison is provided then default equals comparison is used', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 1, name: 'role3' } as Role;

      const sourceMap1 = new Map<number, string>();
      sourceMap1.set(1, 'Hi');
      sourceMap1.set(2, 'Hello');
      sourceMap1.set(3, 'World');

      const sourceMap2 = new Map<number, Role>();
      sourceMap2.set(1, r1);
      sourceMap2.set(2, r2);
      sourceMap2.set(3, r3);

      verifyMaps(
        MapUtil.removeAll(sourceMap1, MapUtil.of([[1, 'Hi'], [3, 'World'], [4, 'Hola']])),
        MapUtil.of([[2, 'Hello']])
      );
      verifyMaps(
        MapUtil.removeAll(sourceMap2, MapUtil.of([[1, r1]])),
        MapUtil.of([[2, r2], [3, r3]])
      );
    });


    it('when areEqualsComparison is provided then default it is used to compare elements', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user3');

      const sourceMap = new Map<number, User>();
      sourceMap.set(1, u1);
      sourceMap.set(2, u2);
      sourceMap.set(3, u3);

      const mapElementsComparison = (e1: [number, User], e2: [number, User]) => e1[1].equals(e2[1]);

      verifyMaps(
        MapUtil.removeAll(sourceMap, MapUtil.of([[1, u1]]), mapElementsComparison),
        MapUtil.of([[2, u2]])
      );
    });

  });



  describe('retainAll', () => {

    it('when given sourceMap is null, undefined or empty then empty map is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'World');

      const emptyMap = new Map<number, string>();

      const mapElementsComparison = (e1: [number, string], e2: [number, string]) => e1[0] == e2[0] && e1[1] == e2[1];

      expect(MapUtil.retainAll(null, sourceMap)).toEqual(emptyMap);
      expect(MapUtil.retainAll(undefined, sourceMap)).toEqual(emptyMap);
      expect(MapUtil.retainAll(emptyMap, sourceMap)).toEqual(emptyMap);

      expect(MapUtil.retainAll(null, sourceMap, mapElementsComparison)).toEqual(emptyMap);
      expect(MapUtil.retainAll(undefined, sourceMap, mapElementsComparison)).toEqual(emptyMap);
      expect(MapUtil.retainAll(emptyMap, sourceMap, mapElementsComparison)).toEqual(emptyMap);
    });


    it('when given toKeepMap is null, undefined or empty then empty map is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'World');

      const emptyMap = new Map<number, string>();

      const mapElementsComparison = (e1: [number, string], e2: [number, string]) => e1[0] == e2[0] && e1[1] == e2[1];

      verifyMaps(
        MapUtil.retainAll(sourceMap, null),
        emptyMap
      );
      verifyMaps(
        MapUtil.retainAll(sourceMap, undefined),
        emptyMap
      );
      verifyMaps(
        MapUtil.retainAll(sourceMap, emptyMap),
        emptyMap
      );

      verifyMaps(
        MapUtil.retainAll(sourceMap, null, mapElementsComparison),
        emptyMap
      );
      verifyMaps(
        MapUtil.retainAll(sourceMap, undefined, mapElementsComparison),
        emptyMap
      );
      verifyMaps(
        MapUtil.retainAll(sourceMap, emptyMap, mapElementsComparison),
        emptyMap
      );
    });


    it('when no areEqualsComparison is provided then default equals comparison is used', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 1, name: 'role3' } as Role;

      const sourceMap1 = new Map<number, string>();
      sourceMap1.set(1, 'Hi');
      sourceMap1.set(2, 'Hello');
      sourceMap1.set(3, 'World');

      const sourceMap2 = new Map<number, Role>();
      sourceMap2.set(1, r1);
      sourceMap2.set(2, r2);
      sourceMap2.set(3, r3);

      verifyMaps(
        MapUtil.retainAll(sourceMap1, MapUtil.of([[1, 'Hi'], [3, 'World'], [4, 'Hola']])),
        MapUtil.of([[1, 'Hi'], [3, 'World']])
      );
      verifyMaps(
        MapUtil.retainAll(sourceMap2, MapUtil.of([[1, r1]])),
        MapUtil.of([[1, r1]])
      );
    });


    it('when areEqualsComparison is provided then default it is used to compare elements', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user3');

      const sourceMap = new Map<number, User>();
      sourceMap.set(1, u1);
      sourceMap.set(2, u2);
      sourceMap.set(3, u3);

      const mapElementsComparison = (e1: [number, User], e2: [number, User]) => e1[1].equals(e2[1]);

      verifyMaps(
        MapUtil.retainAll(sourceMap, MapUtil.of([[1, u1]]), mapElementsComparison),
        MapUtil.of([[1, u1], [3, u3]])
      );
    });

  });



  describe('sort', () => {

    it('when given sourceMap has no elements then empty Map is returned', () => {
      const emptyMap = new Map<number, number>();
      const compareKeys: Comparator<[number, number]> =
        Comparator.of((a: [number, number], b: [number, number]) => a[0] - b[0]);

      expect(MapUtil.sort(null)).toEqual(emptyMap);
      expect(MapUtil.sort(undefined)).toEqual(emptyMap);
      expect(MapUtil.sort(emptyMap)).toEqual(emptyMap);

      expect(MapUtil.sort(null, compareKeys)).toEqual(emptyMap);
      expect(MapUtil.sort(undefined, compareKeys)).toEqual(emptyMap);
      expect(MapUtil.sort(emptyMap, compareKeys)).toEqual(emptyMap);
    });


    it('when given sourceMap is not empty but comparator is null or undefined then default sort is applied', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');
      sourceMap.set(4, 'd');
      sourceMap.set(11, 'k');
      sourceMap.set(3, 'c');

      const expectedResult = new Map<number, string>();
      expectedResult.set(1, 'a');
      expectedResult.set(11, 'k');
      expectedResult.set(3, 'c');
      expectedResult.set(4, 'd');

      verifyMaps(
        MapUtil.sort(sourceMap),
        expectedResult
      );

      verifyMaps(
        MapUtil.sort(sourceMap, undefined),
        expectedResult
      );

      verifyMaps(
        MapUtil.sort(sourceMap, null),
        expectedResult
      );
    });


    it('using basic types, when given sourceMap is not empty and comparator is valid then the sorted map using comparator is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'a');
      sourceMap.set(4, 'd');
      sourceMap.set(11, 'k');
      sourceMap.set(3, 'c');

      const compareKeys: FComparator<[number, string]> =
        (a: [number, string], b: [number, string]) => a[0] - b[0];

      const expectedResult = new Map<number, string>();
      expectedResult.set(1, 'a');
      expectedResult.set(3, 'c');
      expectedResult.set(4, 'd');
      expectedResult.set(11, 'k');

      verifyMaps(
        MapUtil.sort(sourceMap, compareKeys),
        expectedResult
      );
    });


    it('using interfaces, when given sourceArray is not empty and comparator is valid then the sorted map using comparator is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const sourceMap = new Map<number, Role>();
      sourceMap.set(r1.id, r1);
      sourceMap.set(r3.id, r3);
      sourceMap.set(r2.id, r2);

      const compareKeys = (a: [number, Role], b: [number, Role]) => a[0] - b[0];

      const expectedResult = new Map<number, Role>();
      expectedResult.set(r1.id, r1);
      expectedResult.set(r2.id, r2);
      expectedResult.set(r3.id, r3);

      verifyMaps(
        MapUtil.sort(sourceMap, compareKeys),
        expectedResult
      );
    });


    it('using classes, when given sourceArray is not empty and comparator is valid then the sorted map using comparator is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u3.id, u3);
      sourceMap.set(u2.id, u2);

      const compareKeys = (a: [number, User], b: [number, User]) => b[0] - a[0];

      let expectedResult = new Map<number, User>();
      expectedResult.set(u3.id, u3);
      expectedResult.set(u2.id, u2);
      expectedResult.set(u1.id, u1);

      verifyMaps(
        MapUtil.sort(sourceMap, compareKeys),
        expectedResult
      );
    });

  });



  describe('takeWhile', () => {

    it('when given sourceMap has no elements then empty Map is returned', () => {
      const emptyMap = new Map<number, number>();
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

      const sourceMap = new Map<number, Role>();
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

      const sourceMap = new Map<number, User>();
      sourceMap.set(u1.id, u1);
      sourceMap.set(u2.id, u2);
      sourceMap.set(u3.id, u3);

      const expectedResult = new Map<number, User>();
      expectedResult.set(u2.id, u2);

      const isKeyAndUserIdEven = (k: number, user: User) => 0 == k % 2 && 0 == user.id % 2;

      verifyMaps(
        MapUtil.takeWhile(sourceMap, isKeyAndUserIdEven),
        expectedResult
      );
    });

  });



  describe('toArray', () => {

    it('when given sourceMap has no elements and partialFunction is provided then empty array is returned', () => {
      const emptyMap = new Map<number, string>();

      const keyAndValueAsStringForOddKeys: PartialFunction<[number, string], string> =
        PartialFunction.of(
          ([k, v]: [number, string]) => 1 == k % 2,
          ([k, v]: [number, string]) => k + '-' + v
        );

      const expectedResult: string[] = [];

      expect(MapUtil.toArray(null, keyAndValueAsStringForOddKeys)).toEqual(expectedResult);
      expect(MapUtil.toArray(undefined, keyAndValueAsStringForOddKeys)).toEqual(expectedResult);
      expect(MapUtil.toArray(emptyMap, keyAndValueAsStringForOddKeys)).toEqual(expectedResult);
    });


    it('when given sourceMap has no elements and keyValueMapper is provided then empty array is returned', () => {
      const emptyMap = new Map<number, string>();

      const keyAndValueAsString = (k: number, v: string) => k + '-' + v;

      const expectedResult: string[] = [];

      expect(MapUtil.toArray(null, keyAndValueAsString)).toEqual(expectedResult);
      expect(MapUtil.toArray(undefined, keyAndValueAsString)).toEqual(expectedResult);
      expect(MapUtil.toArray(emptyMap, keyAndValueAsString)).toEqual(expectedResult);
    });


    it('when given sourceMap has no elements and keyValueMapper and filterPredicate are provided then empty array is returned', () => {
      const emptyMap = new Map<number, string>();

      const keyAndValueAsString = (k: number, v: string) => k + '-' + v;
      const isKeyOdd = (k: number, v: string) => 1 == k % 2;

      const expectedResult: string[] = [];

      expect(MapUtil.toArray(null, keyAndValueAsString, isKeyOdd)).toEqual(expectedResult);
      expect(MapUtil.toArray(undefined, keyAndValueAsString, isKeyOdd)).toEqual(expectedResult);
      expect(MapUtil.toArray(emptyMap, keyAndValueAsString, isKeyOdd)).toEqual(expectedResult);
    });


    it('when given sourceMap is not empty but partialFunction is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');

      // @ts-ignore
      expect(() => MapUtil.toArray(sourceMap, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.toArray(sourceMap, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap is not empty but keyValueMapper is null or undefined then an error is thrown', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');

      const isKeyOdd = (k: number, v: string) => 1 == k % 2;

      // @ts-ignore
      expect(() => MapUtil.toArray(sourceMap, null, isKeyOdd)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => MapUtil.toArray(sourceMap, undefined, isKeyOdd)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceMap has elements and partialFunction is valid then a new filtered and transformed Map is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'World');

      const keyAndValueAsStringForOddKeys: PartialFunction<[number, string], string> =
        PartialFunction.of(
          ([k, v]: [number, string]) => 1 == k % 2,
          ([k, v]: [number, string]) => k + '-' + v
        );

      const expectedResult: string[] = ['1-Hi', '3-World'];

      verifyArrays(
        MapUtil.toArray(sourceMap, keyAndValueAsStringForOddKeys),
        expectedResult
      );
    });


    it('when given sourceMap has elements and only a valid keyValueMapper is provided then all elements will be transformed using keyValueMapper', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'World');

      const keyAndValueAsString: Function2<number, string, string> =
        Function2.of((k: number, v: string) => k + '-' + v);

      const expectedResult: string[] = ['1-Hi', '2-Hello', '3-World'];

      verifyArrays(
        MapUtil.toArray(sourceMap, keyAndValueAsString),
        expectedResult
      );
    });


    it('when given sourceMap has elements and keyValueMapper is valid but filterPredicate is null or undefined then all elements will be transformed using keyValueMapper', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'World');

      const keyAndValueAsString: FFunction2<number, string, string> =
        (k: number, v: string) => k + '-' + v;

      const expectedResult: string[] = ['1-Hi', '2-Hello', '3-World'];

      verifyArrays(
        // @ts-ignore
        MapUtil.toArray(sourceMap, keyAndValueAsString, null),
        expectedResult
      );

      verifyArrays(
        MapUtil.toArray(sourceMap, keyAndValueAsString, undefined),
        expectedResult
      );
    });


    it('when given sourceMap has elements and keyValueMapper and filterPredicate are valid then a new filtered and transformed array is returned', () => {
      const sourceMap = new Map<number, string>();
      sourceMap.set(1, 'Hi');
      sourceMap.set(2, 'Hello');
      sourceMap.set(3, 'World');

      const isKeyOdd = (k: number, v: string) => 1 == k % 2;
      const keyAndValueAsString = (k: number, v: string) => k + '-' + v;

      const expectedResult: string[] = ['1-Hi', '3-World'];

      verifyArrays(
        MapUtil.toArray(sourceMap, keyAndValueAsString, isKeyOdd),
        expectedResult
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
