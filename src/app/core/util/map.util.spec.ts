import { MapUtil, ObjectUtil } from '@app-core/util';
import { FFunction2, FFunction3, Function2, PartialFunction } from '@app-core/types/function';
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
      let sourceMap = new Map<string, number>();
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
      let sourceMap = new Map<string, number>();
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
      let sourceMap = new Map<string, number>();
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
      let sourceMap = new Map<string, number>();
      sourceMap.set('A', 1);
      sourceMap.set('B', 2);
      sourceMap.set('D', 4);

      const keyValuePlus1: Function2<string, number, [string, number]> =
        Function2.of((k: string, v: number): [string, number] => [k, 1 + v]);

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
      let sourceMap = new Map<string, number>();
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



  describe('sort', () => {

    it('when given sourceMap has no elements then empty Map is returned', () => {
      const emptyMap = new Map<number, number>();
      const compareKeys: FFunction2<[number, number], [number, number], number> =
        (a: [number, number], b: [number, number]) => a[0] - b[0];

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

      const compareKeys: FFunction2<[number, string], [number, string], number> =
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

      let sourceMap = new Map<number, Role>();
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

      let sourceMap = new Map<number, User>();
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
