import { ArrayUtil, ObjectUtil } from '@app-core/util';
import { NullableOrUndefined } from '@app-core/types';
import { FFunction1, FFunction2, Function1, Function2, PartialFunction } from '@app-core/types/function';
import { FPredicate1, Predicate1 } from '@app-core/types/predicate';
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



  describe('applyOrElse', () => {

    it('when given sourceArray has no elements and partialFunction is provided then empty array is returned', () => {
      const emptyArray: number[] = [];
      const plus1ForOdd: PartialFunction<number, number> =
        PartialFunction.of(
          (n: number) => 1 == n % 2,
          (n: number) => 1 + n
        );
      const multiply2 = (n: number) => 2 * n;

      const expectedResult: number[] = [];

      expect(ArrayUtil.applyOrElse(null, plus1ForOdd, multiply2)).toEqual(expectedResult);
      expect(ArrayUtil.applyOrElse(undefined, plus1ForOdd, multiply2)).toEqual(expectedResult);
      expect(ArrayUtil.applyOrElse(emptyArray, plus1ForOdd, multiply2)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and defaultMapper, orElseMapper and filterPredicate are provided then empty array is returned', () => {
      const emptyArray: number[] = [];
      const isOdd = (n: number) => 1 == n % 2;
      const plus1 = (n: number) => 1 + n;
      const multiply2 = (n: number) => 2 * n;

      const expectedResult: number[] = [];

      expect(ArrayUtil.applyOrElse(null, plus1, multiply2, isOdd)).toEqual(expectedResult);
      expect(ArrayUtil.applyOrElse(undefined, plus1, multiply2, isOdd)).toEqual(expectedResult);
      expect(ArrayUtil.applyOrElse(emptyArray, plus1, multiply2, isOdd)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but partialFunction or orElseMapper are null or undefined then an error is thrown', () => {
      const plus1ForOdd: PartialFunction<number, number> =
        PartialFunction.of(
          (n: number) => 1 == n % 2,
          (n: number) => 1 + n
        );
      const multiply2 = (n: number) => 2 * n;

      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], null, multiply2)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], undefined, multiply2)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], plus1ForOdd, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], plus1ForOdd, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray is not empty but defaultMapper or orElseMapper are null or undefined then an error is thrown', () => {
      const isOdd = (n: number) => 1 == n % 2;
      const plus1 = (n: number) => 1 + n;

      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], null, plus1,  isOdd)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], undefined, plus1, isOdd)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], plus1, null, isOdd)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], plus1, undefined, isOdd)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and partialFunction and orElseMapper are valid then a new filtered and transformed array is returned', () => {
      let sourceArray: number[] = [1, 2, 3, 6];

      const plus1ForOdd: PartialFunction<number, number> =
        PartialFunction.of(
          (n: number) => 1 == n % 2,
          (n: number) => 1 + n
        );
      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const expectedResult: number[] = [2, 4, 4, 12];

      verifyArrays(
        ArrayUtil.applyOrElse(sourceArray, plus1ForOdd, multiply2),
        expectedResult
      );
    });


    it('when given sourceArray has elements and defaultMapper and orElseMapper are valid but filterPredicate is null or undefined then all elements will be transformed using defaultMapper', () => {
      let sourceArray: number[] = [1, 2, 3, 6];

      const plus1: FFunction1<number, number> = (n: number) => 1 + n;
      const multiply2: Function1<number, number> =
        Function1.of((n: number) => 2 * n);

      const expectedResult: number[] = [2, 3, 4, 7];

      verifyArrays(
        // @ts-ignore
        ArrayUtil.applyOrElse(sourceArray, plus1, multiply2, null),
        expectedResult
      );

      verifyArrays(
        // @ts-ignore
        ArrayUtil.applyOrElse(sourceArray, plus1, multiply2, undefined),
        expectedResult
      );
    });


    it('when given sourceArray has elements and defaultMapper, orElseMapper and filterPredicate are valid then a new filtered and transformed array is returned', () => {
      let sourceArray: number[] = [1, 2, 3, 6];

      const isOdd = (n: number) => 1 == n % 2;
      const plus1 = (n: number) => 1 + n;
      const multiply2 = (n: number) => 2 * n;

      const expectedResult: number[] = [2, 4, 4, 12];

      verifyArrays(
        ArrayUtil.applyOrElse(sourceArray, plus1, multiply2, isOdd),
        expectedResult
      );
    });

  });



  describe('collect', () => {

    it('when given sourceArray has no elements and partialFunction is provided then empty array is returned', () => {
      const emptyArray: number[] = [];
      const multiply2AndStringForEven: PartialFunction<number, string> =
        PartialFunction.of(
          (n: number) => 0 == n % 2,
          (n: number) => '' + (2 * n)
        );

      const expectedResult: string[] = [];

      expect(ArrayUtil.collect(null, multiply2AndStringForEven)).toEqual(expectedResult);
      expect(ArrayUtil.collect(undefined, multiply2AndStringForEven)).toEqual(expectedResult);
      expect(ArrayUtil.collect(emptyArray, multiply2AndStringForEven)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and mapFunction and filterPredicate are provided then empty array is returned', () => {
      let emptyArray: number[] = [];
      const isEven: FPredicate1<number> = (n: number) => 0 == n % 2;
      const multiply2AndString: FFunction1<number, string> = (n: number) => '' + (2 * n);

      const expectedResult: string[] = [];

      expect(ArrayUtil.collect(null, multiply2AndString, isEven)).toEqual(expectedResult);
      expect(ArrayUtil.collect(undefined, multiply2AndString, isEven)).toEqual(expectedResult);
      expect(ArrayUtil.collect(emptyArray, multiply2AndString, isEven)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but partialFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.collect([1], null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.collect([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray is not empty but mapFunction is null or undefined then an error is thrown', () => {
      const isEven: FPredicate1<number> =
        (n: number) => 0 == n % 2;

      // @ts-ignore
      expect(() => ArrayUtil.collect([1], null, isEven)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.collect([1], undefined, isEven)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and partialFunction is valid then a new filtered and transformed array is returned', () => {
      let sourceArray: number[] = [1, 2, 3, 6];
      const multiply2AndStringForEven: PartialFunction<number, string> =
        PartialFunction.of(
          (n: number) => 0 == n % 2,
          (n: number) => '' + (2 * n)
        );

      const expectedResult: string[] = ['4', '12'];

      verifyArrays(
        ArrayUtil.collect(sourceArray, multiply2AndStringForEven),
        expectedResult
      );
    });


    it('when given sourceArray has elements and mapFunction is valid but filterPredicate is null or undefined then all elements will be transformed', () => {
      let sourceArray: number[] = [1, 2, 3, 6];
      const multiply2AndString: FFunction1<number, string> =
        (n: number) => '' + (2 * n);

      const expectedResult: string[] = ['2', '4', '6', '12'];

      verifyArrays(
        // @ts-ignore
        ArrayUtil.collect(sourceArray, multiply2AndString, null),
        expectedResult
      );

      verifyArrays(
        // @ts-ignore
        ArrayUtil.collect(sourceArray, multiply2AndString, undefined),
        expectedResult
      );
    });


    it('when given sourceArray has elements and mapFunction and filterPredicate are valid then a new filtered and transformed array is returned', () => {
      let sourceArray: number[] = [1, 2, 3, 6];
      const isEven = (n: number) => 0 == n % 2;
      const multiply2AndString = (n: number) => '' + (2 * n);

      const expectedResult: string[] = ['4', '12'];

      verifyArrays(
        ArrayUtil.collect(sourceArray, multiply2AndString, isEven),
        expectedResult
      );
    });

  });



  describe('dropWhile', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: Role[] = [];
      const isEven: Predicate1<Role> =
        Predicate1.of((role: Role) => 0 == role.id % 2);

      expect(ArrayUtil.dropWhile(null, isEven)).toEqual(emptyArray);
      expect(ArrayUtil.dropWhile(undefined, isEven)).toEqual(emptyArray);
      expect(ArrayUtil.dropWhile(emptyArray, isEven)).toEqual(emptyArray);
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

      const isIdOdd: FPredicate1<NullableOrUndefined<Role>> =
        (role: NullableOrUndefined<Role>) => 1 == role!.id % 2;

      verifyArrays(
        ArrayUtil.dropWhile([r1, r2, r3], isIdOdd),
        [r2]
      );
    });


    it('using classes, when given sourceArray has elements then filtered array is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const isIdOdd: Predicate1<User> = Predicate1.of((user: User) => 1 == user.id % 2);

      verifyArrays(
        ArrayUtil.dropWhile([u1, u2, u3], isIdOdd),
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

      const isIdOdd: Predicate1<Role> =
        Predicate1.of((role: Role) => 1 == role.id % 2);

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

      const isIdGreaterThan10: Predicate1<Role> =
        Predicate1.of((role: Role) => 10 < role.id);

      expect(ArrayUtil.find([r1, r2, r3, r4], isIdGreaterThan10)).toBeUndefined();
    });


    it('using classes, when there is no element that matches provided filter then undefined is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const sourceArray = [u1, u2, u3, u4];

      const isIdGreaterThan10: FPredicate1<NullableOrUndefined<User>> =
        (user: NullableOrUndefined<User>) => 10 < user!.id;

      expect(ArrayUtil.find(sourceArray, isIdGreaterThan10)).toBeUndefined();
    });


    it('using interfaces, when there is an element that matches provided filter then expected element is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 2, name: 'role3' } as Role;
      const r4 = { id: 4, name: 'role2' } as Role;

      const isEven = (role: Role) => 0 == role!.id % 2;

      expect(ArrayUtil.find([r1, r2, r3, r4], isEven)).toEqual(r2);
    });


    it('using classes, when there is an element that matches provided filter then expected element is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');

      const isIdOdd: Predicate1<User> =
        Predicate1.of((user: User) => 1 == user.id % 2);

      expect(ArrayUtil.find([u1, u2, u3, u4], isIdOdd)).toEqual(u1);
    });

  });



  describe('findOptional', () => {

    it('when given sourceArray is undefined, null or is an empty array then empty Optional is returned', () => {
      let undefinedArray: Role[];
      // @ts-ignore
      let nullArray: Role[] = null;
      let emptyArray: Role[] = [];

      const isIdOdd: Predicate1<Role> =
        Predicate1.of((role: Role) => 1 == role.id % 2);

      // @ts-ignore
      expect(ArrayUtil.findOptional(undefinedArray, isIdOdd).isPresent()).toBeFalse();
      expect(ArrayUtil.findOptional(nullArray, isIdOdd).isPresent()).toBeFalse();
      expect(ArrayUtil.findOptional(emptyArray, isIdOdd).isPresent()).toBeFalse();
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then empty Optional is returned', () => {
      // @ts-ignore
      expect(ArrayUtil.findOptional([1], undefined).isPresent()).toBeFalse();

      // @ts-ignore
      expect(ArrayUtil.findOptional([1], null).isPresent()).toBeFalse();
    });


    it('using interfaces, when there is no element that matches provided filter then empty Optional is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 2, name: 'role3' } as Role;
      const r4 = { id: 4, name: 'role2' } as Role;

      const isIdGreaterThan10 = (role: Role) => 10 < role.id;

      expect(ArrayUtil.findOptional([r1, r2, r3, r4], isIdGreaterThan10).isPresent()).toBeFalse();
    });


    it('using classes, when there is no element that matches provided filter then empty Optional is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const sourceArray = [u1, u2, u3, u4];

      const isIdGreaterThan10: FPredicate1<User> =
        (user: User) => 10 < user.id;

      expect(ArrayUtil.findOptional(sourceArray, isIdGreaterThan10).isPresent()).toBeFalse();
    });


    it('using interfaces, when there is an element that matches provided filter then Optional containing the element is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 2, name: 'role3' } as Role;
      const r4 = { id: 4, name: 'role2' } as Role;

      const isIdEven: Predicate1<Role> = Predicate1.of((role: Role) => 0 == role.id % 2);

      const expectedResult = r2;

      const optional = ArrayUtil.findOptional([r1, r2, r3, r4], isIdEven);

      expect(optional.isPresent()).toBeTrue();
      expect(optional.get()).toEqual(expectedResult);
    });


    it('using classes, when there is an element that matches provided filter then Optional containing the element is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');

      const isIdOdd: Predicate1<User> =
        Predicate1.of((user: User) => 1 == user.id % 2);

      const expectedResult = u1;

      const optional = ArrayUtil.findOptional([u1, u2, u3, u4], isIdOdd);

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


    it('when given arrayToVerify is not null and there is a filter then initialValue applying accumulator only to the elements match filter is returned', () => {
      const intValue = 10;
      const stringValue = 'a';

      const intArray: number[] = [ 2, 3, 4 ];
      const stringArray: string[] = [ 'b', 'c', 'd', 'e' ];

      const intAccumulator: FFunction2<number, number, number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const stringAccumulator: Function2<string, string, string> =
        Function2.of((s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1! + s2!);

      const isEven = (n: number) => 0 == n % 2;
      const isNotVowel: FPredicate1<string> =
        (s: string) => -1 == 'aeiouAEIUO'.indexOf(s);

      const intResult = ArrayUtil.foldLeft(intArray, intValue, intAccumulator, isEven);
      const stringResult = ArrayUtil.foldLeft(stringArray, stringValue, stringAccumulator, isNotVowel);

      expect(intResult).toEqual(80);
      expect(stringResult).toEqual('abcd');
    });

  });



  describe('groupMap', () => {

    it('when given sourceArray has no elements and partialFunction is provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const numberAsKeyAndPlus1AsValueForOdd: PartialFunction<number, [number, number]> =
        PartialFunction.of(
          (n: number) => 1 == n % 2,
          (n: number) => [n, 1 + n]
        );

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(ArrayUtil.groupMap(null, numberAsKeyAndPlus1AsValueForOdd)).toEqual(expectedResult);
      expect(ArrayUtil.groupMap(undefined, numberAsKeyAndPlus1AsValueForOdd)).toEqual(expectedResult);
      expect(ArrayUtil.groupMap(emptyArray, numberAsKeyAndPlus1AsValueForOdd)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and discriminatorKey, valueMapper and filterPredicate are provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const isOdd = (n: number) => 1 == n % 2;
      const sameValue = (n: number) => n;
      const plus1 = (n: number) => 1 + n;

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(ArrayUtil.groupMap(null, sameValue, plus1, isOdd)).toEqual(expectedResult);
      expect(ArrayUtil.groupMap(undefined, sameValue, plus1, isOdd)).toEqual(expectedResult);
      expect(ArrayUtil.groupMap(emptyArray, sameValue, plus1, isOdd)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but partialFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray is not empty but discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      const isOdd = (n: number) => 1 == n % 2;
      const sameValue = (n: number) => n;
      const plus1 = (n: number) => 1 + n;

      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], null, plus1,  isOdd)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], undefined, plus1, isOdd)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], sameValue, null, isOdd)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], sameValue, undefined, isOdd)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and partialFunction is valid then a new filtered and transformed Map is returned', () => {
      let sourceArray: number[] = [1, 2, 3, 6, 3];

      const numberAsKeyAndPlus1AsValueForOdd: PartialFunction<number, [number, number]> =
        PartialFunction.of(
          (n: number) => 1 == n % 2,
          (n: number) => [n, 1 + n]
        );

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(1, [2]);
      expectedResult.set(3, [4, 4]);

      verifyMaps(
        ArrayUtil.groupMap(sourceArray, numberAsKeyAndPlus1AsValueForOdd),
        expectedResult
      );
    });


    it('when given sourceArray has elements and discriminatorKey and valueMapper are valid but filterPredicate is null or undefined then all elements will be transformed using discriminatorKey and valueMapper', () => {
      let sourceArray: number[] = [1, 2, 3, 6, 3];

      const sameValue = (n: number) => n;
      const plus1 = (n: number) => 1 + n;

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(1, [2]);
      expectedResult.set(2, [3]);
      expectedResult.set(3, [4, 4]);
      expectedResult.set(6, [7]);

      verifyMaps(
        // @ts-ignore
        ArrayUtil.groupMap(sourceArray, sameValue, plus1, null),
        expectedResult
      );

      verifyMaps(
        ArrayUtil.groupMap(sourceArray, sameValue, plus1, undefined),
        expectedResult
      );
    });


    it('when given sourceArray has elements and discriminatorKey, valueMapper and filterPredicate are valid then a new filtered and transformed Map is returned', () => {
      let sourceArray: number[] = [1, 2, 3, 6, 3];

      const isOdd = (n: number) => 1 == n % 2;
      const sameValue = (n: number) => n;
      const plus1 = (n: number) => 1 + n;

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(1, [2]);
      expectedResult.set(3, [4, 4]);

      verifyMaps(
        ArrayUtil.groupMap(sourceArray, sameValue, plus1, isOdd),
        expectedResult
      );
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



  describe('sort', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: number[] = [];
      const comparator: FFunction2<number, number, number> = (a, b) => a - b;

      expect(ArrayUtil.sort(null)).toEqual(emptyArray);
      expect(ArrayUtil.sort(undefined)).toEqual(emptyArray);
      expect(ArrayUtil.sort(emptyArray)).toEqual(emptyArray);

      expect(ArrayUtil.sort(null, comparator)).toEqual(emptyArray);
      expect(ArrayUtil.sort(undefined, comparator)).toEqual(emptyArray);
      expect(ArrayUtil.sort(emptyArray, comparator)).toEqual(emptyArray);
    });


    it('when given sourceArray is not empty but comparator is null or undefined then default sort is applied', () => {
      const sourceArray: number[] = [1, 10, 21, 2];

      const expectedResult: number[] = [1, 10, 2, 21];

      verifyArrays(
        ArrayUtil.sort(sourceArray),
        expectedResult
      );

      verifyArrays(
        ArrayUtil.sort(sourceArray, undefined),
        expectedResult
      );

      verifyArrays(
        ArrayUtil.sort(sourceArray, null),
        expectedResult
      );
    });


    it('using basic types, when given sourceArray is not empty and comparator is valid then the sorted array using comparator is returned', () => {
      const sourceArray: number[] = [1, 10, 21, 2];
      const comparator = (a: number, b: number) => a - b;

      const expectedResult: number[] = [1, 2, 10, 21];

      verifyArrays(
        ArrayUtil.sort(sourceArray, comparator),
        expectedResult
      );
    });


    it('using interfaces, when given sourceArray is not empty and comparator is valid then the sorted array using comparator is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const comparator = (r1: Role, r2: Role) => r1.id - r2.id;

      verifyArrays(
        ArrayUtil.sort([r1, r3, r2], comparator),
        [r1, r2, r3]
      );
    });


    it('using classes, when given sourceArray is not empty and comparator is valid then the sorted array using comparator is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const comparator: FFunction2<User, User, number> = (u1: User, u2: User) => u2.id - u1.id;

      verifyArrays(
        ArrayUtil.sort([u3, u1, u2], comparator),
        [u3, u2, u1]
      );
    });

  });



  describe('takeWhile', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: Role[] = [];
      const isIdEven = (role: Role) => 0 == role.id % 2;

      expect(ArrayUtil.takeWhile(null, isIdEven)).toEqual(emptyArray);
      expect(ArrayUtil.takeWhile(undefined, isIdEven)).toEqual(emptyArray);
      expect(ArrayUtil.takeWhile(emptyArray, isIdEven)).toEqual(emptyArray);
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

      const isIdOdd = (role: Role) => 1 == role.id % 2;

      verifyArrays(
        ArrayUtil.takeWhile([r1, r2, r3], isIdOdd),
        [r1, r3]
      );
    });


    it('using classes, when given sourceArray has elements then filtered array is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const isIdOdd: Predicate1<User> =
        Predicate1.of((user: User) => 1 == user.id % 2);

      verifyArrays(
        ArrayUtil.takeWhile([u1, u2, u3], isIdOdd),
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
