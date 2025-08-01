import { ArrayUtil, ObjectUtil } from '@app-core/util';
import { NullableOrUndefined } from '@app-core/types';
import { Comparator, FComparator } from '@app-core/types/comparator';
import { FFunction1, FFunction2, Function1, Function2, PartialFunction } from '@app-core/types/function';
import { BinaryOperator, FBinaryOperator } from '@app-core/types/function/operator';
import { FPredicate1, Predicate1 } from '@app-core/types/predicate';
import { IllegalArgumentError } from '@app-core/errors';
import { Optional } from '@app-core/types/functional';

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

      const expectedResult: number[] = [];

      expect(ArrayUtil.applyOrElse(null, plus1ForOddPP, multiply2Raw)).toEqual(expectedResult);
      expect(ArrayUtil.applyOrElse(undefined, plus1ForOddPP, multiply2Raw)).toEqual(expectedResult);
      expect(ArrayUtil.applyOrElse(emptyArray, plus1ForOddPP, multiply2Raw)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and defaultMapper, orElseMapper and filterPredicate are provided then empty array is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: number[] = [];

      expect(ArrayUtil.applyOrElse(null, plus1Raw, multiply2Raw, isOddRaw)).toEqual(expectedResult);
      expect(ArrayUtil.applyOrElse(undefined, plus1Raw, multiply2Raw, isOddRaw)).toEqual(expectedResult);
      expect(ArrayUtil.applyOrElse(emptyArray, plus1Raw, multiply2Raw, isOddRaw)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but partialFunction or orElseMapper are null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], null, multiply2Raw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], undefined, multiply2Raw)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], plus1ForOddPP, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], plus1ForOddPP, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray is not empty but defaultMapper or orElseMapper are null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], null, plus1Raw,  isOddRaw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], undefined, plus1Raw, isOddRaw)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], plus1Raw, null, isOddRaw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.applyOrElse([1], plus1Raw, undefined, isOddRaw)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and partialFunction and orElseMapper are valid then a new filtered and transformed array is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6];

      const expectedResult: number[] = [2, 4, 4, 12];

      verifyArrays(
        ArrayUtil.applyOrElse(sourceArray, plus1ForOddPP, multiply2Function),
        expectedResult
      );
    });


    it('when given sourceArray has elements and defaultMapper and orElseMapper are valid but filterPredicate is null or undefined then all elements will be transformed using defaultMapper', () => {
      const sourceArray: number[] = [1, 2, 3, 6];

      const expectedResult: number[] = [2, 3, 4, 7];

      verifyArrays(
        // @ts-ignore
        ArrayUtil.applyOrElse(sourceArray, plus1FFunction, multiply2Function, null),
        expectedResult
      );
      verifyArrays(
        // @ts-ignore
        ArrayUtil.applyOrElse(sourceArray, plus1FFunction, multiply2Function, undefined),
        expectedResult
      );
    });


    it('when given sourceArray has elements and defaultMapper, orElseMapper and filterPredicate are valid then a new filtered and transformed array is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6];

      const expectedResult: number[] = [2, 4, 4, 12];

      verifyArrays(
        ArrayUtil.applyOrElse(sourceArray, plus1Raw, multiply2Raw, isOddRaw),
        expectedResult
      );
    });

  });



  describe('collect', () => {

    it('when given sourceArray has no elements and partialFunction is provided then empty array is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: string[] = [];

      expect(ArrayUtil.collect(null, multiply2AndStringForEvenPP)).toEqual(expectedResult);
      expect(ArrayUtil.collect(undefined, multiply2AndStringForEvenPP)).toEqual(expectedResult);
      expect(ArrayUtil.collect(emptyArray, multiply2AndStringForEvenPP)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and mapFunction and filterPredicate are provided then empty array is returned', () => {
      const emptyArray: number[] = [];
      const multiply2AndString: FFunction1<number, string> = (n: number) => '' + (2 * n);

      const expectedResult: string[] = [];

      expect(ArrayUtil.collect(null, multiply2AndString, isEvenFPredicate)).toEqual(expectedResult);
      expect(ArrayUtil.collect(undefined, multiply2AndString, isEvenFPredicate)).toEqual(expectedResult);
      expect(ArrayUtil.collect(emptyArray, multiply2AndString, isEvenFPredicate)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but partialFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.collect([1], null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.collect([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray is not empty but mapFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.collect([1], null, isEvenFPredicate)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.collect([1], undefined, isEvenFPredicate)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and partialFunction is valid then a new filtered and transformed array is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6];

      const expectedResult: string[] = ['4', '12'];

      verifyArrays(
        ArrayUtil.collect(sourceArray, multiply2AndStringForEvenPP),
        expectedResult
      );
    });


    it('when given sourceArray has elements and mapFunction is valid but filterPredicate is null or undefined then all elements will be transformed', () => {
      const sourceArray: number[] = [1, 2, 3, 6];
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
      const sourceArray: number[] = [1, 2, 3, 6];

      const multiply2AndString = (n: number) => '' + (2 * n);

      const expectedResult: string[] = ['4', '12'];

      verifyArrays(
        ArrayUtil.collect(sourceArray, multiply2AndString, isEvenRaw),
        expectedResult
      );
    });

  });



  describe('collectFirst', () => {

    it('when given sourceArray has no elements and partialFunction is provided then empty Optional is returned', () => {
      const emptyArray: number[] = [];

      expect(ArrayUtil.collectFirst(null, multiply2AndStringForEvenPP).isPresent()).toBeFalse();
      expect(ArrayUtil.collectFirst(undefined, multiply2AndStringForEvenPP).isPresent()).toBeFalse();
      expect(ArrayUtil.collectFirst(emptyArray, multiply2AndStringForEvenPP).isPresent()).toBeFalse();
    });


    it('when given sourceArray is not empty but partialFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.collectFirst([1], null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.collectFirst([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and partialFunction is defined but no one element matches with its domain then an empty Optional is returned', () => {
      const sourceArray: number[] = [1, 3, 5, 7];

      expect(ArrayUtil.collectFirst(sourceArray, multiply2AndStringForEvenPP).isPresent()).toBeFalse();
    });


    it('when given sourceArray has elements and partialFunction is defined and there are elements that match with its domain then a non empty Optional is returned', () => {
      const sourceArray: number[] = [1, 3, 4, 8];

      const expectedResult: Optional<string> = Optional.of('8');

      const result = ArrayUtil.collectFirst(
        sourceArray,
        multiply2AndStringForEvenPP
      );

      expect(result.isPresent()).toBeTrue();
      expect(result.get()).toEqual(expectedResult.get());
    });

  });



  describe('copy', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: number[] = [];

      expect(ArrayUtil.copy(null)).toEqual([]);
      expect(ArrayUtil.copy(undefined)).toEqual([]);
      expect(ArrayUtil.copy(emptyArray)).toEqual([]);
    });


    it('when given sourceArray has elements then a copy is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6];

      const result = ArrayUtil.copy(sourceArray);

      verifyArrays(
        result,
        sourceArray
      );
      sourceArray.splice(0);
      expect(sourceArray.length).toEqual(0);
      expect(result.length).toEqual(4);
    });

  });



  describe('count', () => {

    it('when given sourceArray has no elements then 0 is returned', () => {
      const emptyArray: number[] = [];

      expect(ArrayUtil.count(null, isEvenPredicate)).toEqual(0);
      expect(ArrayUtil.count(undefined, isEvenPredicate)).toEqual(0);
      expect(ArrayUtil.count(emptyArray, isEvenPredicate)).toEqual(0);
    });


    it('when given sourceArray has elements but filterPredicate is null or undefined then sourceArray length is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6];

      expect(ArrayUtil.count(sourceArray, null)).toEqual(4);
      expect(ArrayUtil.count(sourceArray, undefined)).toEqual(4);
    });


    it('when given sourceArray has elements and filterPredicate is valid then the number of elements matching filterPredicate is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 7];

      expect(ArrayUtil.count(sourceArray, isEvenRaw)).toEqual(2);
      expect(ArrayUtil.count(sourceArray, isOddFPredicate)).toEqual(3);
    });

  });



  describe('dropWhile', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: number[] = [];

      expect(ArrayUtil.dropWhile(null, isEvenFPredicate)).toEqual(emptyArray);
      expect(ArrayUtil.dropWhile(undefined, isEvenFPredicate)).toEqual(emptyArray);
      expect(ArrayUtil.dropWhile(emptyArray, isEvenFPredicate)).toEqual(emptyArray);
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then sourceArray is returned', () => {
      const sourceArray: number[] = [1, 10, 21, 2];

      verifyArrays(
        ArrayUtil.dropWhile(sourceArray, null),
        sourceArray
      );
      verifyArrays(
        ArrayUtil.dropWhile(sourceArray, undefined),
        sourceArray
      );
    });


    it('when given sourceArray is not empty and filterPredicate is valid then longest prefix of filtered elements is returned', () => {
      const sourceArray: number[] = [1, 3, 10, 21, 5];

      verifyArrays(
        ArrayUtil.dropWhile(sourceArray, isOddRaw),
        [10, 21, 5]
      );
    });

  });



  describe('filter', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: Role[] = [];
      const isIdEven = (role: Role) => 0 == role.id % 2;

      expect(ArrayUtil.filter(null, isIdEven)).toEqual(emptyArray);
      expect(ArrayUtil.filter(undefined, isIdEven)).toEqual(emptyArray);
      expect(ArrayUtil.filter(emptyArray, isIdEven)).toEqual(emptyArray);
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then sourceArray is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      verifyArrays(
        ArrayUtil.filter([r1, r2, r3], undefined),
        [r1, r2, r3]
      );
      verifyArrays(
        ArrayUtil.filter([3, 5, 2], null),
        [3, 5, 2]
      );
    });


    it('using interfaces, when given sourceArray has elements then filtered array is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      const isIdOdd = (role: Role) => 1 == role.id % 2;

      verifyArrays(
        ArrayUtil.filter([r1, r2, r3], isIdOdd),
        [r1, r3]
      );
    });


    it('using classes, when given sourceArray has elements then filtered array is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const isIdOdd = (user: User) => 1 == user.id % 2;

      verifyArrays(
        ArrayUtil.filter([u1, u2, u3], isIdOdd),
        [u1, u3]
      );
    });

  });



  describe('filterNot', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: Role[] = [];
      const isEven: Predicate1<Role> =
        Predicate1.of((role: Role) => 0 == role.id % 2);

      expect(ArrayUtil.filterNot(null, isEven)).toEqual(emptyArray);
      expect(ArrayUtil.filterNot(undefined, isEven)).toEqual(emptyArray);
      expect(ArrayUtil.filterNot(emptyArray, isEven)).toEqual(emptyArray);
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then sourceArray is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 3, name: 'role3' } as Role;

      verifyArrays(
        ArrayUtil.filterNot([r1, r2, r3], undefined),
        [r1, r2, r3]
      );
      verifyArrays(
        ArrayUtil.filterNot([3, 5, 2], null),
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
        ArrayUtil.filterNot([r1, r2, r3], isIdOdd),
        [r2]
      );
    });


    it('using classes, when given sourceArray has elements then filtered array is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user3');

      const isIdOdd = (user: User) => 1 == user.id % 2;

      verifyArrays(
        ArrayUtil.filterNot([u1, u2, u3], isIdOdd),
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

      const isIdOdd = (user: User) => 1 == user.id % 2;

      expect(ArrayUtil.find([u1, u2, u3, u4], isIdOdd)).toEqual(u1);
    });

  });



  describe('findLast', () => {

    it('when given sourceArray is undefined, null or is an empty array then undefined is returned', () => {
      let undefinedArray: Role[];
      // @ts-ignore
      let nullArray: Role[] = null;
      let emptyArray: Role[] = [];

      const isIdOdd: Predicate1<Role> =
        Predicate1.of((role: Role) => 1 == role.id % 2);

      // @ts-ignore
      expect(ArrayUtil.findLast(undefinedArray, isIdOdd)).toBeUndefined();
      expect(ArrayUtil.findLast(nullArray, isIdOdd)).toBeUndefined();
      expect(ArrayUtil.findLast(emptyArray, isIdOdd)).toBeUndefined();
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then undefined is returned', () => {
      // @ts-ignore
      expect(ArrayUtil.findLast([1], undefined)).toBeUndefined();

      // @ts-ignore
      expect(ArrayUtil.findLast([1], null)).toBeUndefined();
    });


    it('using interfaces, when there is no element that matches provided filter then undefined is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 2, name: 'role3' } as Role;
      const r4 = { id: 4, name: 'role2' } as Role;

      const isIdGreaterThan10: Predicate1<Role> =
        Predicate1.of((role: Role) => 10 < role.id);

      expect(ArrayUtil.findLast([r1, r2, r3, r4], isIdGreaterThan10)).toBeUndefined();
    });


    it('using classes, when there is no element that matches provided filter then undefined is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');
      const sourceArray = [u1, u2, u3, u4];

      const isIdGreaterThan10: FPredicate1<NullableOrUndefined<User>> =
        (user: NullableOrUndefined<User>) => 10 < user!.id;

      expect(ArrayUtil.findLast(sourceArray, isIdGreaterThan10)).toBeUndefined();
    });


    it('using interfaces, when there is an element that matches provided filter then expected element is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 2, name: 'role3' } as Role;
      const r4 = { id: 4, name: 'role2' } as Role;

      const isEven = (role: Role) => 0 == role!.id % 2;

      expect(ArrayUtil.findLast([r1, r2, r3, r4], isEven)).toEqual(r4);
    });


    it('using classes, when there is an element that matches provided filter then expected element is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user2');
      const u4 = new User(4, 'user1');

      const isIdOdd = (user: User) => 1 == user.id % 2;

      expect(ArrayUtil.findLast([u1, u2, u3, u4], isIdOdd)).toEqual(u3);
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

      const isIdOdd =(user: User) => 1 == user.id % 2;

      const expectedResult = u1;

      const optional = ArrayUtil.findOptional([u1, u2, u3, u4], isIdOdd);

      expect(optional.isPresent()).toBeTrue();
      expect(optional.get()).toEqual(expectedResult);
    });

  });



  describe('flatten', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: number[] = [];

      expect(ArrayUtil.flatten(null)).toEqual(expectedResult);
      expect(ArrayUtil.flatten(undefined)).toEqual(expectedResult);
      expect(ArrayUtil.flatten(emptyArray)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but only has one dimension then same array is returned', () => {
      const sourceArray1: number[] = [1, 3, 10, 21];
      const sourceArray2: string[] = ['a', 'b', 'c', 'd', 'e'];

      verifyArrays(
        ArrayUtil.flatten(sourceArray1),
        sourceArray1
      );

      verifyArrays(
        ArrayUtil.flatten(sourceArray2),
        sourceArray2
      );
    });


    it('when given sourceArray is not empty and has more than one dimension then flatten array is returned', () => {
      const sourceArray1 = [1, 3, [10, 21], [], 5];
      const sourceArray2 = ['a', ['b', ['c', 'd'], []], 'e', [[]]];

      const expectedResultArray1: number[] =  [1, 3, 10, 21, 5];
      const expectedResultArray2: string[] =  ['a', 'b', 'c', 'd', 'e'];

      verifyArrays(
        ArrayUtil.flatten(sourceArray1),
        expectedResultArray1
      );

      verifyArrays(
        ArrayUtil.flatten(sourceArray2),
        expectedResultArray2
      );
    });

  });



  describe('foldLeft', () => {

    it('when given sourceArray is null, undefined or empty then initialValue is returned', () => {
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


    it('when given accumulator is null or undefined then initialValue is returned', () => {
      const intValue = 10;
      const intArray: number[] = [2, 3, 4];

      const nullAccumulatorResult = ArrayUtil.foldLeft(intArray, intValue, null);
      const undefinedAccumulatorResult = ArrayUtil.foldLeft(intArray, intValue, undefined);

      expect(nullAccumulatorResult).toEqual(intValue);
      expect(undefinedAccumulatorResult).toEqual(intValue);
    });


    it('when given sourceArray is not null then initialValue applying accumulator is returned', () => {
      const intValue = 10;
      const stringValue = 'a';

      const intArray: number[] = [2, 3, 4];
      const stringArray: string[] = ['b', 'c', 'd'];

      const intAccumulator = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const stringAccumulator: Function2<string, string, string> =
        Function2.of((s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1! + s2!);

      const intResult = ArrayUtil.foldLeft(intArray, intValue, intAccumulator);
      const stringResult = ArrayUtil.foldLeft(stringArray, stringValue, stringAccumulator);

      expect(intResult).toEqual(240);
      expect(stringResult).toEqual('abcd');
    });


    it('when given sourceArray is not null and there is a filter then initialValue applying accumulator only to the elements match filter is returned', () => {
      const intValue = 10;
      const stringValue = 'a';

      const intArray: number[] = [2, 3, 4];
      const stringArray: string[] = ['b', 'c', 'd', 'e'];

      const intAccumulator = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      const stringAccumulator: Function2<string, string, string> =
        Function2.of((s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1! + s2!);

      const isNotVowel: FPredicate1<string> =
        (s: string) => -1 == 'aeiouAEIUO'.indexOf(s);

      const intResult = ArrayUtil.foldLeft(intArray, intValue, intAccumulator, isEvenRaw);
      const stringResult = ArrayUtil.foldLeft(stringArray, stringValue, stringAccumulator, isNotVowel);

      expect(intResult).toEqual(80);
      expect(stringResult).toEqual('abcd');
    });

  });



  describe('groupBy', () => {

    it('when given sourceArray has no elements and discriminatorKey and filterPredicate are provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(ArrayUtil.groupBy(null, plus1Raw, isOddRaw)).toEqual(expectedResult);
      expect(ArrayUtil.groupBy(undefined, plus1Raw, isOddRaw)).toEqual(expectedResult);
      expect(ArrayUtil.groupBy(emptyArray, plus1Raw, isOddRaw)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but discriminatorKey is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.groupBy([1], null, isOddRaw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupBy([1], undefined, isOddRaw)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and discriminatorKey is valid but filterPredicate is null or undefined then all elements will be transformed using discriminatorKey and valueMapper', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 3];

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(2, [1]);
      expectedResult.set(3, [2]);
      expectedResult.set(4, [3, 3]);
      expectedResult.set(7, [6]);

      verifyMaps(
        // @ts-ignore
        ArrayUtil.groupBy(sourceArray, plus1FFunction, null),
        expectedResult
      );

      verifyMaps(
        ArrayUtil.groupBy(sourceArray, plus1FFunction, undefined),
        expectedResult
      );
    });


    it('when given sourceArray has elements and discriminatorKey and filterPredicate are valid then a new filtered and transformed Map is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 3];

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(2, [1]);
      expectedResult.set(4, [3, 3]);

      verifyMaps(
        ArrayUtil.groupBy(sourceArray, plus1Raw, isOddRaw),
        expectedResult
      );
    });

  });



  describe('groupByMultiKey', () => {

    it('when given sourceArray has no elements and discriminatorKey and filterPredicate are provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const oddEvenAndCompareWith5 = (n: number) => {
        const keys: string[] = [];
        if (0 == n % 2) {
          keys.push("even");
        } else {
          keys.push("odd");
        }
        if (5 > n) {
          keys.push("smaller5");
        } else {
          keys.push("greaterEqual5");
        }
        return keys;
      };

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(ArrayUtil.groupByMultiKey(null, oddEvenAndCompareWith5, lessThan10Raw)).toEqual(expectedResult);
      expect(ArrayUtil.groupByMultiKey(undefined, oddEvenAndCompareWith5, lessThan10Raw)).toEqual(expectedResult);
      expect(ArrayUtil.groupByMultiKey(emptyArray, oddEvenAndCompareWith5, lessThan10Raw)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but discriminatorKeyis null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.groupByMultiKey([1], null, lessThan10Raw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupByMultiKey([1], undefined, lessThan10Raw)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and discriminatorKey is valid but filterPredicate is null or undefined then all elements will be transformed using discriminatorKey and valueMapper', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 11, 12];

      const oddEvenAndCompareWith5: FFunction1<number, string[]> =
        (n: number) => {
          const keys: string[] = [];
          if (0 == n % 2) {
            keys.push("even");
          } else {
            keys.push("odd");
          }
          if (5 > n) {
            keys.push("smaller5");
          } else {
            keys.push("greaterEqual5");
          }
          return keys;
        };

      const expectedResult: Map<string, number[]> = new Map<string, number[]>;
      expectedResult.set("even", [2, 6, 12]);
      expectedResult.set("odd", [1, 3, 11]);
      expectedResult.set("smaller5", [1, 2, 3]);
      expectedResult.set("greaterEqual5", [6, 11, 12]);

      verifyMaps(
        // @ts-ignore
        ArrayUtil.groupByMultiKey(sourceArray, oddEvenAndCompareWith5, null),
        expectedResult
      );

      verifyMaps(
        ArrayUtil.groupByMultiKey(sourceArray, oddEvenAndCompareWith5, undefined),
        expectedResult
      );
    });


    it('when given sourceArray has elements and discriminatorKey and filterPredicate are valid then a new filtered and transformed Map is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 11, 12];

      const oddEvenAndCompareWith5 = (n: number) => {
        const keys: string[] = [];
        if (0 == n % 2) {
          keys.push("even");
        } else {
          keys.push("odd");
        }
        if (5 > n) {
          keys.push("smaller5");
        } else {
          keys.push("greaterEqual5");
        }
        return keys;
      };

      const expectedResult: Map<string, number[]> = new Map<string, number[]>;
      expectedResult.set("even", [2, 6]);
      expectedResult.set("odd", [1, 3]);
      expectedResult.set("smaller5", [1, 2, 3]);
      expectedResult.set("greaterEqual5", [6]);

      verifyMaps(
        ArrayUtil.groupByMultiKey(sourceArray, oddEvenAndCompareWith5, lessThan10Raw),
        expectedResult
      );
    });

  });



  describe('groupMap', () => {

    it('when given sourceArray has no elements and partialFunction is provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(ArrayUtil.groupMap(null, numberAsKeyAndPlus1AsValueForOddPP)).toEqual(expectedResult);
      expect(ArrayUtil.groupMap(undefined, numberAsKeyAndPlus1AsValueForOddPP)).toEqual(expectedResult);
      expect(ArrayUtil.groupMap(emptyArray, numberAsKeyAndPlus1AsValueForOddPP)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and discriminatorKey, valueMapper and filterPredicate are provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(ArrayUtil.groupMap(null, sameValueRaw, plus1Raw, isOddRaw)).toEqual(expectedResult);
      expect(ArrayUtil.groupMap(undefined, sameValueRaw, plus1Raw, isOddRaw)).toEqual(expectedResult);
      expect(ArrayUtil.groupMap(emptyArray, sameValueRaw, plus1Raw, isOddRaw)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but partialFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray is not empty but discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], null, plus1Raw,  isOddRaw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], undefined, plus1Raw, isOddRaw)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], sameValueRaw, null, isOddRaw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMap([1], sameValueRaw, undefined, isOddRaw)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and partialFunction is valid then a new filtered and transformed Map is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 3];

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(1, [2]);
      expectedResult.set(3, [4, 4]);

      verifyMaps(
        ArrayUtil.groupMap(sourceArray, numberAsKeyAndPlus1AsValueForOddPP),
        expectedResult
      );
    });


    it('when given sourceArray has elements and discriminatorKey and valueMapper are valid but filterPredicate is null or undefined then all elements will be transformed using discriminatorKey and valueMapper', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 3];

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(1, [2]);
      expectedResult.set(2, [3]);
      expectedResult.set(3, [4, 4]);
      expectedResult.set(6, [7]);

      verifyMaps(
        // @ts-ignore
        ArrayUtil.groupMap(sourceArray, sameValueFunction, plus1FFunction, null),
        expectedResult
      );

      verifyMaps(
        ArrayUtil.groupMap(sourceArray, sameValueFunction, plus1FFunction, undefined),
        expectedResult
      );
    });


    it('when given sourceArray has elements and discriminatorKey, valueMapper and filterPredicate are valid then a new filtered and transformed Map is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 3];

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;
      expectedResult.set(1, [2]);
      expectedResult.set(3, [4, 4]);

      verifyMaps(
        ArrayUtil.groupMap(sourceArray, sameValueRaw, plus1Raw, isOddRaw),
        expectedResult
      );
    });

  });



  describe('groupMapMultiKey', () => {

    it('when given sourceArray has no elements and discriminatorKey, valueMapper and filterPredicate are provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const oddEvenAndCompareWith5 = (n: number) => {
        const keys: string[] = [];
        if (0 == n % 2) {
          keys.push("even");
        } else {
          keys.push("odd");
        }
        if (5 > n) {
          keys.push("smaller5");
        } else {
          keys.push("greaterEqual5");
        }
        return keys;
      };

      const expectedResult: Map<number, number[]> = new Map<number, number[]>;

      expect(ArrayUtil.groupMapMultiKey(null, oddEvenAndCompareWith5, sameValueRaw, lessThan10Raw)).toEqual(expectedResult);
      expect(ArrayUtil.groupMapMultiKey(undefined, oddEvenAndCompareWith5, sameValueRaw, lessThan10Raw)).toEqual(expectedResult);
      expect(ArrayUtil.groupMapMultiKey(emptyArray, oddEvenAndCompareWith5, sameValueRaw, lessThan10Raw)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      const oddEvenAndCompareWith5 = (n: number) => {
        const keys: string[] = [];
        if (0 == n % 2) {
          keys.push("even");
        } else {
          keys.push("odd");
        }
        if (5 > n) {
          keys.push("smaller5");
        } else {
          keys.push("greaterEqual5");
        }
        return keys;
      };

      // @ts-ignore
      expect(() => ArrayUtil.groupMapMultiKey([1], null, sameValueRaw, lessThan10Raw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMapMultiKey([1], undefined, sameValueRaw, lessThan10Raw)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.groupMapMultiKey([1], oddEvenAndCompareWith5, null, lessThan10Raw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMapMultiKey([1], oddEvenAndCompareWith5, undefined, lessThan10Raw)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and discriminatorKey and valueMapper are valid but filterPredicate is null or undefined then all elements will be transformed using discriminatorKey and valueMapper', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 11, 12];

      const oddEvenAndCompareWith5: FFunction1<number, string[]> =
        (n: number) => {
          const keys: string[] = [];
          if (0 == n % 2) {
            keys.push("even");
          } else {
            keys.push("odd");
          }
          if (5 > n) {
            keys.push("smaller5");
          } else {
            keys.push("greaterEqual5");
          }
          return keys;
      };

      const expectedResult: Map<string, number[]> = new Map<string, number[]>;
      expectedResult.set("even", [2, 6, 12]);
      expectedResult.set("odd", [1, 3, 11]);
      expectedResult.set("smaller5", [1, 2, 3]);
      expectedResult.set("greaterEqual5", [6, 11, 12]);

      verifyMaps(
        // @ts-ignore
        ArrayUtil.groupMapMultiKey(sourceArray, oddEvenAndCompareWith5, sameValueFunction, null),
        expectedResult
      );

      verifyMaps(
        ArrayUtil.groupMapMultiKey(sourceArray, oddEvenAndCompareWith5, sameValueFunction, undefined),
        expectedResult
      );
    });


    it('when given sourceArray has elements and discriminatorKey, valueMapper and filterPredicate are valid then a new filtered and transformed Map is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 11, 12];

      const oddEvenAndCompareWith5 = (n: number) => {
        const keys: string[] = [];
        if (0 == n % 2) {
          keys.push("even");
        } else {
          keys.push("odd");
        }
        if (5 > n) {
          keys.push("smaller5");
        } else {
          keys.push("greaterEqual5");
        }
        return keys;
      };

      const expectedResult: Map<string, number[]> = new Map<string, number[]>;
      expectedResult.set("even", [2, 6]);
      expectedResult.set("odd", [1, 3]);
      expectedResult.set("smaller5", [1, 2, 3]);
      expectedResult.set("greaterEqual5", [6]);

      verifyMaps(
        ArrayUtil.groupMapMultiKey(sourceArray, oddEvenAndCompareWith5, sameValueRaw, lessThan10Raw),
        expectedResult
      );
    });

  });



  describe('groupMapReduce', () => {

    it('when given sourceArray has no elements and reduceValues, partialFunction are provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(ArrayUtil.groupMapReduce(null, sumValuesRaw, mod3AsKeyAndPlus1AsValueForLowerThan10PP)).toEqual(expectedResult);
      expect(ArrayUtil.groupMapReduce(undefined, sumValuesRaw, mod3AsKeyAndPlus1AsValueForLowerThan10PP)).toEqual(expectedResult);
      expect(ArrayUtil.groupMapReduce(emptyArray, sumValuesRaw, mod3AsKeyAndPlus1AsValueForLowerThan10PP)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and reduceValues, discriminatorKey and valueMapper are provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(ArrayUtil.groupMapReduce(null, sumValuesBinaryOperator, mod3FFunction, plus1Function)).toEqual(expectedResult);
      expect(ArrayUtil.groupMapReduce(undefined, sumValuesBinaryOperator, mod3FFunction, plus1Function)).toEqual(expectedResult);
      expect(ArrayUtil.groupMapReduce(emptyArray, sumValuesBinaryOperator, mod3FFunction, plus1Function)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but reduceValues or partialFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], null, mod3AsKeyAndPlus1AsValueForLowerThan10PP)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], undefined, mod3AsKeyAndPlus1AsValueForLowerThan10PP)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], sumValuesRaw, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], sumValuesRaw, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray is not empty but reduceValues, discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], null, mod3Raw,  plus1Raw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], undefined, mod3Raw, plus1Raw)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], sumValuesRaw, null,  plus1Raw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], sumValuesRaw, undefined, plus1Raw)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], sumValuesRaw, mod3Raw,  null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.groupMapReduce([1], sumValuesRaw, mod3Raw, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and reduceValues and partialFunction are valid then a new filtered and transformed Map is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 7, 11, 12];

      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(0, 11);
      expectedResult.set(1, 10);
      expectedResult.set(2, 3);

      verifyMaps(
        ArrayUtil.groupMapReduce(sourceArray, sumValuesRaw, mod3AsKeyAndPlus1AsValueForLowerThan10PP),
        expectedResult
      );
    });


    it('when given sourceArray has elements and reduceValues, discriminatorKey and valueMapper are valid then a transformed Map is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 7];

      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(0, 11);
      expectedResult.set(1, 10);
      expectedResult.set(2, 3);

      verifyMaps(
        ArrayUtil.groupMapReduce(sourceArray, sumValuesRaw, mod3Raw, plus1Raw),
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



  describe('map', () => {

    it('when given sourceArray has no elements and mapFunction is not provided then empty array is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: string[] = [];

      // @ts-ignore
      expect(ArrayUtil.map(null, null)).toEqual(expectedResult);
      // @ts-ignore
      expect(ArrayUtil.map(undefined, undefined)).toEqual(expectedResult);
      // @ts-ignore
      expect(ArrayUtil.map(emptyArray, null)).toEqual(expectedResult);
      // @ts-ignore
      expect(ArrayUtil.map(emptyArray, undefined)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and mapFunction is provided then empty array is returned', () => {
      const emptyArray: number[] = [];
      const toString: FFunction1<NullableOrUndefined<number>, string> =
        (n: NullableOrUndefined<number>) => '' + n!;

      const expectedResult: string[] = [];

      expect(ArrayUtil.map(null, toString)).toEqual(expectedResult);
      expect(ArrayUtil.map(undefined, toString)).toEqual(expectedResult);
      expect(ArrayUtil.map(emptyArray, toString)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but mapFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.map([1], null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.map([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and mapFunction is valid then a new transformed array is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6];

      const toString = (n: number) => '' + n;
      const plus2: Function1<number, number> =
        Function1.of((n: number) => 2 + n);

      const expectedToStringResult: string[] = ['1', '2', '3', '6'];
      const expectedPlus2Result: number[] = [3, 4, 5, 8];

      verifyArrays(
        ArrayUtil.map(sourceArray, toString),
        expectedToStringResult
      );
      verifyArrays(
        ArrayUtil.map(sourceArray, plus2),
        expectedPlus2Result
      );
    });

  });



  describe('max', () => {

    it('when given sourceArray has no elements and comparator is not provided then undefined is returned', () => {
      const emptyArray: number[] = [];

      // @ts-ignore
      expect(ArrayUtil.max(null, null)).toBeUndefined();
      // @ts-ignore
      expect(ArrayUtil.max(undefined, undefined)).toBeUndefined();
      // @ts-ignore
      expect(ArrayUtil.max(emptyArray, null)).toBeUndefined();
      // @ts-ignore
      expect(ArrayUtil.max(emptyArray, undefined)).toBeUndefined();
    });


    it('when given sourceArray has no elements and comparator is provided then undefined is returned', () => {
      const emptyArray: number[] = [];

      const comparator: FComparator<number> =
        (a: number, b: number) => a - b;

      expect(ArrayUtil.max(null, comparator)).toBeUndefined();
      expect(ArrayUtil.max(undefined, comparator)).toBeUndefined();
      expect(ArrayUtil.max(emptyArray, comparator)).toBeUndefined();
    });


    it('when given sourceArray is not empty but comparator is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.max([1], null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.max([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and comparator is valid then its largest value is returned', () => {
      let numberArray: number[] = [1, 10, 21, 2];
      let stringArray: NullableOrUndefined<string>[] = ['a', 'ab', null, undefined, 'abc'];

      const numberComparator = (a: number, b: number) => a - b;
      const stringComparator: Comparator<NullableOrUndefined<string>> =
        Comparator.of(
          (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
          {
            const s1Length = ObjectUtil.isNullOrUndefined(s1) ? 0 : s1.length;
            const s2Length = ObjectUtil.isNullOrUndefined(s2) ? 0 : s2.length;
            return s1Length - s2Length;
          }
        );

      expect(ArrayUtil.max(numberArray, numberComparator)).toEqual(21);
      expect(ArrayUtil.max(stringArray, stringComparator)).toEqual('abc');
    });

  });



  describe('maxOptional', () => {

    it('when given sourceArray has no elements and comparator is not provided then empty Optional is returned', () => {
      const emptyArray: number[] = [];

      // @ts-ignore
      expect(ArrayUtil.maxOptional(null, null).isPresent()).toBeFalse();
      // @ts-ignore
      expect(ArrayUtil.maxOptional(undefined, undefined).isPresent()).toBeFalse();
      // @ts-ignore
      expect(ArrayUtil.maxOptional(emptyArray, null).isPresent()).toBeFalse();
      // @ts-ignore
      expect(ArrayUtil.maxOptional(emptyArray, undefined).isPresent()).toBeFalse();
    });


    it('when given sourceArray has no elements and comparator is provided then empty Optional is returned', () => {
      const emptyArray: number[] = [];

      const comparator: FComparator<number> =
        (a: number, b: number) => a - b;

      expect(ArrayUtil.maxOptional(null, comparator).isPresent()).toBeFalse();
      expect(ArrayUtil.maxOptional(undefined, comparator).isPresent()).toBeFalse();
      expect(ArrayUtil.maxOptional(emptyArray, comparator).isPresent()).toBeFalse();
    });


    it('when given sourceArray is not empty but comparator is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.maxOptional([1], null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.maxOptional([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and comparator is valid then and Optional with its largest value is returned', () => {
      let numberArray: number[] = [1, 10, 21, 2];
      let stringArray: NullableOrUndefined<string>[] = ['a', 'ab', null, undefined, 'abc'];

      const numberComparator = (a: number, b: number) => a - b;
      const stringComparator: Comparator<NullableOrUndefined<string>> =
        Comparator.of(
          (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
          {
            const s1Length = ObjectUtil.isNullOrUndefined(s1) ? 0 : s1.length;
            const s2Length = ObjectUtil.isNullOrUndefined(s2) ? 0 : s2.length;
            return s1Length - s2Length;
          }
        );

      const resultNumber = ArrayUtil.maxOptional(numberArray, numberComparator);
      const resultString = ArrayUtil.maxOptional(stringArray, stringComparator);

      expect(resultNumber.isPresent()).toBeTrue();
      expect(resultNumber.get()).toEqual(21);

      expect(resultString.isPresent()).toBeTrue();
      expect(resultString.get()).toEqual('abc');
    });

  });



  describe('min', () => {

    it('when given sourceArray has no elements and comparator is not provided then undefined is returned', () => {
      const emptyArray: number[] = [];

      // @ts-ignore
      expect(ArrayUtil.min(null, null)).toBeUndefined();
      // @ts-ignore
      expect(ArrayUtil.min(undefined, undefined)).toBeUndefined();
      // @ts-ignore
      expect(ArrayUtil.min(emptyArray, null)).toBeUndefined();
      // @ts-ignore
      expect(ArrayUtil.min(emptyArray, undefined)).toBeUndefined();
    });


    it('when given sourceArray has no elements and comparator is provided then undefined is returned', () => {
      const emptyArray: number[] = [];

      const comparator: FComparator<number> =
        (a: number, b: number) => a - b;

      expect(ArrayUtil.min(null, comparator)).toBeUndefined();
      expect(ArrayUtil.min(undefined, comparator)).toBeUndefined();
      expect(ArrayUtil.min(emptyArray, comparator)).toBeUndefined();
    });


    it('when given sourceArray is not empty but comparator is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.min([1], null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.min([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and comparator is valid then its smallest value is returned', () => {
      let numberArray: number[] = [1, 10, 21, 2];
      let stringArray: NullableOrUndefined<string>[] = ['a', 'ab', null, undefined, 'abc'];

      const numberComparator = (a: number, b: number) => a - b;
      const stringComparator: Comparator<NullableOrUndefined<string>> =
        Comparator.of(
          (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
          {
            const s1Length = ObjectUtil.isNullOrUndefined(s1) ? 0 : s1.length;
            const s2Length = ObjectUtil.isNullOrUndefined(s2) ? 0 : s2.length;
            return s1Length - s2Length;
          }
        );

      expect(ArrayUtil.min(numberArray, numberComparator)).toEqual(1);
      expect(ArrayUtil.min(stringArray, stringComparator)).toBeNull();
    });

  });



  describe('minOptional', () => {

    it('when given sourceArray has no elements and comparator is not provided then empty Optional is returned', () => {
      const emptyArray: number[] = [];

      // @ts-ignore
      expect(ArrayUtil.minOptional(null, null).isPresent()).toBeFalse();
      // @ts-ignore
      expect(ArrayUtil.minOptional(undefined, undefined).isPresent()).toBeFalse();
      // @ts-ignore
      expect(ArrayUtil.minOptional(emptyArray, null).isPresent()).toBeFalse();
      // @ts-ignore
      expect(ArrayUtil.minOptional(emptyArray, undefined).isPresent()).toBeFalse();
    });


    it('when given sourceArray has no elements and comparator is provided then empty Optional is returned', () => {
      const emptyArray: number[] = [];

      const comparator: FComparator<number> =
        (a: number, b: number) => a - b;

      expect(ArrayUtil.minOptional(null, comparator).isPresent()).toBeFalse();
      expect(ArrayUtil.minOptional(undefined, comparator).isPresent()).toBeFalse();
      expect(ArrayUtil.minOptional(emptyArray, comparator).isPresent()).toBeFalse();
    });


    it('when given sourceArray is not empty but comparator is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.minOptional([1], null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.minOptional([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and comparator is valid then and Optional with its largest value is returned', () => {
      let numberArray: number[] = [1, 10, 21, 2];
      let stringArray: NullableOrUndefined<string>[] = ['a', 'ab', null, undefined, 'abc'];

      const numberComparator = (a: number, b: number) => a - b;
      const stringComparator: Comparator<NullableOrUndefined<string>> =
        Comparator.of(
          (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) =>
          {
            const s1Length = ObjectUtil.isNullOrUndefined(s1) ? 0 : s1.length;
            const s2Length = ObjectUtil.isNullOrUndefined(s2) ? 0 : s2.length;
            return s1Length - s2Length;
          }
        );

      const resultNumber = ArrayUtil.minOptional(numberArray, numberComparator);
      const resultString = ArrayUtil.minOptional(stringArray, stringComparator);

      expect(resultNumber.isPresent()).toBeTrue();
      expect(resultNumber.get()).toEqual(1);

      expect(resultString.isPresent()).toBeFalse();
    });

  });



  describe('reduce', () => {

    it('when given sourceArray is null, undefined or empty then undefined is returned', () => {
      const intAccumulator: FBinaryOperator<number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;

      expect(ArrayUtil.reduce(null, intAccumulator)).toBeUndefined();
      expect(ArrayUtil.reduce(undefined, intAccumulator)).toBeUndefined();
      expect(ArrayUtil.reduce([], intAccumulator)).toBeUndefined();
    });


    it('when given sourceArray is not empty but accumulator is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.reduce([2], null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.reduce([2], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray is not null and accumulator is valid then accumulator is applied to contained elements', () => {
      const intArray: number[] = [2];
      const stringArray: string[] = ['b', 'c', 'd'];

      const intAccumulator = (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! * n2!;
      const stringAccumulator = (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1! + s2!;

      const intResult = ArrayUtil.reduce(intArray, intAccumulator);
      const stringResult = ArrayUtil.reduce(stringArray, stringAccumulator);

      expect(intResult).toEqual(2);
      expect(stringResult).toEqual('bcd');
    });

  });



  describe('removeAll', () => {

    it('when given sourceArray is null, undefined or empty then empty array is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');

      const numberComparison = (n1: number, n2: number) => n1 == n2;
      const stringComparison = (s1: string, s2: string) => s1 == s2;
      const userComparison = (u1: User, u2: User) => u1.equals(u2);

      expect(ArrayUtil.removeAll(null, [1, 2])).toEqual([]);
      expect(ArrayUtil.removeAll(undefined, ['a', 'b'])).toEqual([]);
      expect(ArrayUtil.removeAll([], [u1, u2])).toEqual([]);

      expect(ArrayUtil.removeAll(null, [1, 2], numberComparison)).toEqual([]);
      expect(ArrayUtil.removeAll(undefined, ['a', 'b'], stringComparison)).toEqual([]);
      expect(ArrayUtil.removeAll([], [u1, u2], userComparison)).toEqual([]);
    });


    it('when given toRemoveArray is null, undefined or empty then given sourceArray is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');

      const numberComparison = (n1: number, n2: number) => n1 == n2;
      const stringComparison = (s1: string, s2: string) => s1 == s2;
      const userComparison = (u1: User, u2: User) => u1.equals(u2);

      verifyArrays(
        ArrayUtil.removeAll([1, 2], null),
        [1, 2]
      );
      verifyArrays(
        ArrayUtil.removeAll(['a', 'b'], undefined),
        ['a', 'b']
      );
      verifyArrays(
        ArrayUtil.removeAll([u1, u2], []),
        [u1, u2]
      );

      verifyArrays(
        ArrayUtil.removeAll([1, 2], null, numberComparison),
        [1, 2]
      );
      verifyArrays(
        ArrayUtil.removeAll(['a', 'b'], undefined, stringComparison),
        ['a', 'b']
      );
      verifyArrays(
        ArrayUtil.removeAll([u1, u2], [], userComparison),
        [u1, u2]
      );
    });


    it('when no areEqualsComparison is provided then default equals comparison is used', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 1, name: 'role3' } as Role;

      verifyArrays(
        ArrayUtil.removeAll([1, 2, 3], [1, 3, 4]),
        [2]
      );
      verifyArrays(
        ArrayUtil.removeAll(['a', 'b', 'c', 'f'], ['b', 'c', 'd']),
        ['a', 'f']
      );
      verifyArrays(
        ArrayUtil.removeAll([r1, r2, r3], [r1]),
        [r2, r3]
      );
    });


    it('when areEqualsComparison is provided then default it is used to compare elements', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user3');

      const numberComparison = (n1: number, n2: number) => n1 == n2;
      const stringComparison = (s1: string, s2: string) => s1.length == s2.length;
      const userComparison = (u1: User, u2: User) => u1.equals(u2);

      verifyArrays(
        ArrayUtil.removeAll([1, 2, 3, 4], [1, 3, 5], numberComparison),
        [2, 4]
      );
      verifyArrays(
        ArrayUtil.removeAll(['a', 'bb', 'ccc', 'dddd'], ['a', 'cc'], stringComparison),
        ['ccc', 'dddd']
      );
      verifyArrays(
        ArrayUtil.removeAll([u1, u2, u3], [u1], userComparison),
        [u2]
      );
    });

  });



  describe('retainAll', () => {

    it('when given sourceArray is null, undefined or empty then empty array is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');

      const numberComparison = (n1: number, n2: number) => n1 == n2;
      const stringComparison = (s1: string, s2: string) => s1 == s2;
      const userComparison = (u1: User, u2: User) => u1.equals(u2);

      expect(ArrayUtil.retainAll(null, [1, 2])).toEqual([]);
      expect(ArrayUtil.retainAll(undefined, ['a', 'b'])).toEqual([]);
      expect(ArrayUtil.retainAll([], [u1, u2])).toEqual([]);

      expect(ArrayUtil.retainAll(null, [1, 2], numberComparison)).toEqual([]);
      expect(ArrayUtil.retainAll(undefined, ['a', 'b'], stringComparison)).toEqual([]);
      expect(ArrayUtil.retainAll([], [u1, u2], userComparison)).toEqual([]);
    });


    it('when given toKeepArray is null, undefined or empty then empty array is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');

      const numberComparison = (n1: number, n2: number) => n1 == n2;
      const stringComparison = (s1: string, s2: string) => s1 == s2;
      const userComparison = (u1: User, u2: User) => u1.equals(u2);

      expect(ArrayUtil.retainAll([1, 2], null )).toEqual([]);
      expect(ArrayUtil.retainAll(['a', 'b'], undefined )).toEqual([]);
      expect(ArrayUtil.retainAll([u1, u2], [] )).toEqual([]);

      expect(ArrayUtil.retainAll([1, 2], null, numberComparison)).toEqual([]);
      expect(ArrayUtil.retainAll(['a', 'b'], undefined , stringComparison)).toEqual([]);
      expect(ArrayUtil.retainAll([u1, u2], [], userComparison)).toEqual([]);
    });


    it('when no areEqualsComparison is provided then default equals comparison is used', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 1, name: 'role3' } as Role;

      verifyArrays(
        ArrayUtil.retainAll([1, 2, 3], [1, 3, 4]),
        [1, 3]
      );
      verifyArrays(
        ArrayUtil.retainAll(['a', 'b', 'c', 'f'], ['b', 'c', 'd']),
        ['b', 'c']
      );
      verifyArrays(
        ArrayUtil.retainAll([r1, r2, r3], [r1, r2]),
        [r1, r2]
      );
    });


    it('when areEqualsComparison is provided then default it is used to compare elements', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(1, 'user3');

      const numberComparison = (n1: number, n2: number) => n1 == n2;
      const stringComparison = (s1: string, s2: string) => s1.length == s2.length;
      const userComparison = (u1: User, u2: User) => u1.equals(u2);

      verifyArrays(
        ArrayUtil.retainAll([1, 2, 3, 4], [1, 3, 5], numberComparison),
        [1, 3]
      );
      verifyArrays(
        ArrayUtil.retainAll(['a', 'bb', 'ccc', 'dddd'], ['a', 'cc'], stringComparison),
        ['a', 'bb']
      );
      verifyArrays(
        ArrayUtil.retainAll([u1, u2, u3], [u1], userComparison),
        [u1, u3]
      );
    });

  });



  describe('sort', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: number[] = [];
      const comparator: Comparator<number> =
        Comparator.of((a, b) => a - b);

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

      const comparator: FComparator<User> = (u1: User, u2: User) => u2.id - u1.id;

      verifyArrays(
        ArrayUtil.sort([u3, u1, u2], comparator),
        [u3, u2, u1]
      );
    });

  });



  describe('sliding', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: number[][] = [];

      expect(ArrayUtil.sliding(null, 1)).toEqual(expectedResult);
      expect(ArrayUtil.sliding(undefined, 2)).toEqual(expectedResult);
      expect(ArrayUtil.sliding(emptyArray, 3)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but size is less than 0 then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.sliding([1], -2)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.sliding([1], -1)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements but size is equals to 0 then empty array is returned', () => {
      const expectedResult: number[][] = [];

      expect(ArrayUtil.sliding([1], 0)).toEqual(expectedResult);
      expect(ArrayUtil.sliding([1, 2], 0)).toEqual(expectedResult);
      expect(ArrayUtil.sliding([1, 2, 3], 0)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty and size is greater than 0 then the matrix with containing the right chunks is returned', () => {
      const sourceArray1: number[] = [1, 3, 10, 21];
      const sourceArray2: string[] = ['a', 'b', 'c', 'd', 'e'];

      verifyMatrix(
        ArrayUtil.sliding(sourceArray1, 2),
        [[1, 3], [3, 10], [10, 21]]
      );

      verifyMatrix(
        ArrayUtil.sliding(sourceArray1, 3),
        [[1, 3, 10], [3, 10, 21]]
      );
      verifyMatrix(
        ArrayUtil.sliding(sourceArray1, 5),
        [[1, 3, 10, 21]]
      );

      verifyMatrix(
        ArrayUtil.sliding(sourceArray2, 1),
        [['a'], ['b'], ['c'], ['d'], ['e']]
      );
      verifyMatrix(
        ArrayUtil.sliding(sourceArray2, 3),
        [['a', 'b', 'c'], ['b', 'c', 'd'], ['c', 'd', 'e']]
      );
      verifyMatrix(
        ArrayUtil.sliding(sourceArray2, 7),
        [['a', 'b', 'c', 'd', 'e']]
      );
    });

  });



  describe('split', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: number[][] = [];

      expect(ArrayUtil.split(null, 1)).toEqual(expectedResult);
      expect(ArrayUtil.split(undefined, 2)).toEqual(expectedResult);
      expect(ArrayUtil.split(emptyArray, 3)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but size is less than 0 then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.split([1], -2)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.split([1], -1)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements but size is equals to 0 then empty array is returned', () => {
      const expectedResult: number[][] = [];

      expect(ArrayUtil.split([1], 0)).toEqual(expectedResult);
      expect(ArrayUtil.split([1, 2], 0)).toEqual(expectedResult);
      expect(ArrayUtil.split([1, 2, 3], 0)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty and size is greater than 0 then the matrix with containing the right chunks is returned', () => {
      const sourceArray1: number[] = [1, 3, 10, 21];
      const sourceArray2: string[] = ['a', 'b', 'c', 'd', 'e'];

      verifyMatrix(
        ArrayUtil.split(sourceArray1, 2),
        [[1, 3], [10, 21]]
      );

      verifyMatrix(
        ArrayUtil.split(sourceArray1, 3),
        [[1, 3, 10], [21]]
      );
      verifyMatrix(
        ArrayUtil.split(sourceArray1, 5),
        [[1, 3, 10, 21]]
      );

      verifyMatrix(
        ArrayUtil.split(sourceArray2, 1),
        [['a'], ['b'], ['c'], ['d'], ['e']]
      );
      verifyMatrix(
        ArrayUtil.split(sourceArray2, 3),
        [['a', 'b', 'c'], ['d', 'e']]
      );
      verifyMatrix(
        ArrayUtil.split(sourceArray2, 7),
        [['a', 'b', 'c', 'd', 'e']]
      );
    });

  });



  describe('takeWhile', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: number[] = [];

      expect(ArrayUtil.takeWhile(null, isEvenFPredicate)).toEqual(emptyArray);
      expect(ArrayUtil.takeWhile(undefined, isEvenFPredicate)).toEqual(emptyArray);
      expect(ArrayUtil.takeWhile(emptyArray, isEvenFPredicate)).toEqual(emptyArray);
    });


    it('when given sourceArray is not empty but filterPredicate is null or undefined then sourceArray is returned', () => {
      const sourceArray: number[] = [1, 10, 21, 2];

      verifyArrays(
        ArrayUtil.takeWhile(sourceArray, null),
        sourceArray
      );
      verifyArrays(
        ArrayUtil.takeWhile(sourceArray, undefined),
        sourceArray
      );
    });


    it('when given sourceArray is not empty and filterPredicate is valid then longest prefix of filtered elements is returned', () => {
      const sourceArray: number[] = [1, 3, 10, 21, 5];

      verifyArrays(
        ArrayUtil.takeWhile(sourceArray, isOddRaw),
        [1, 3]
      );
    });

  });



  describe('toArray', () => {

    it('when no elements are provided then empty array is returned', () => {
      expect(ArrayUtil.toArray()).toEqual([]);
    });


    it('when elements are provided then returned array contains all given ones', () => {
      expect(ArrayUtil.toArray(null)).toEqual([null]);
      expect(ArrayUtil.toArray(undefined)).toEqual([undefined]);

      verifyArrays(
        ArrayUtil.toArray(1, null, 3),
        [1, null, 3]
      );
      verifyArrays(
        ArrayUtil.toArray('a', 'bc', undefined, '5rt'),
        ['a', 'bc', undefined, '5rt']
      );
      verifyArrays(
        ArrayUtil.toArray(undefined, 1, null, 3),
        [undefined, 1, null, 3]
      );
    });

  });



  describe('toMap', () => {

    it('when given sourceArray has no elements and partialFunction is provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(ArrayUtil.toMap(null, numberAsKeyAndPlus1AsValueForOddPP)).toEqual(expectedResult);
      expect(ArrayUtil.toMap(undefined, numberAsKeyAndPlus1AsValueForOddPP)).toEqual(expectedResult);
      expect(ArrayUtil.toMap(emptyArray, numberAsKeyAndPlus1AsValueForOddPP)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and discriminatorKey is provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(ArrayUtil.toMap(null, sameValueRaw)).toEqual(expectedResult);
      expect(ArrayUtil.toMap(undefined, sameValueRaw)).toEqual(expectedResult);
      expect(ArrayUtil.toMap(emptyArray, sameValueRaw)).toEqual(expectedResult);
    });


    it('when given sourceArray has no elements and discriminatorKey, valueMapper and filterPredicate are provided then empty Map is returned', () => {
      const emptyArray: number[] = [];

      const expectedResult: Map<number, number> = new Map<number, number>;

      expect(ArrayUtil.toMap(null, sameValueRaw, plus1Raw, isOddRaw)).toEqual(expectedResult);
      expect(ArrayUtil.toMap(undefined, sameValueRaw, plus1Raw, isOddRaw)).toEqual(expectedResult);
      expect(ArrayUtil.toMap(emptyArray, sameValueRaw, plus1Raw, isOddRaw)).toEqual(expectedResult);
    });


    it('when given sourceArray is not empty but partialFunction is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.toMap([1], null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.toMap([1], undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray is not empty but discriminatorKey or valueMapper are null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => ArrayUtil.toMap([1], null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.toMap([1], undefined)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => ArrayUtil.toMap([1], null, plus1Raw,  isOddRaw)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ArrayUtil.toMap([1], undefined, plus1Raw, isOddRaw)).toThrowError(IllegalArgumentError);
    });


    it('when given sourceArray has elements and partialFunction is valid then a new filtered and transformed Map is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 3];

      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 2);
      expectedResult.set(3, 4);

      verifyMaps(
        ArrayUtil.toMap(sourceArray, numberAsKeyAndPlus1AsValueForOddPP),
        expectedResult
      );
    });


    it('when given sourceArray has elements and only a valid discriminatorKey is provided then all elements will be split using discriminatorKey', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 3];

      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 1);
      expectedResult.set(2, 2);
      expectedResult.set(3, 3);
      expectedResult.set(6, 6);

      verifyMaps(
        ArrayUtil.toMap(sourceArray, sameValueFunction),
        expectedResult
      );
    });


    it('when given sourceArray has elements and discriminatorKey and valueMapper are valid but filterPredicate is null or undefined then all elements will be transformed using discriminatorKey and valueMapper', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 3];

      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 2);
      expectedResult.set(2, 3);
      expectedResult.set(3, 4);
      expectedResult.set(6, 7);

      verifyMaps(
        // @ts-ignore
        ArrayUtil.toMap(sourceArray, sameValueFunction, plus1FFunction, null),
        expectedResult
      );

      verifyMaps(
        ArrayUtil.toMap(sourceArray, sameValueFunction, plus1FFunction, undefined),
        expectedResult
      );
    });


    it('when given sourceArray has elements and discriminatorKey, valueMapper and filterPredicate are valid then a new filtered and transformed Map is returned', () => {
      const sourceArray: number[] = [1, 2, 3, 6, 3];

      const expectedResult: Map<number, number> = new Map<number, number>;
      expectedResult.set(1, 2);
      expectedResult.set(3, 4);

      verifyMaps(
        ArrayUtil.toMap(sourceArray, sameValueRaw, plus1Raw, isOddRaw),
        expectedResult
      );
    });

  });



  describe('transpose', () => {

    it('when given sourceMatrix has no elements then empty array is returned', () => {
      const emptyMatrix: number[][] = [];

      const expectedResult: number[][] = [];

      expect(ArrayUtil.transpose(null)).toEqual(expectedResult);
      expect(ArrayUtil.transpose(undefined)).toEqual(expectedResult);
      expect(ArrayUtil.transpose(emptyMatrix)).toEqual(expectedResult);
    });


    it('when given sourceMatrix has elements and all internal arrays have the same size then transposed matrix is returned', () => {
      const sourceMatrix1: number[][] = [[1, 2, 3], [4, 5, 6]];
      const sourceMatrix2: string[][] = [['a1', 'a2'], ['b1', 'b2'], ['c1', 'c2']];

      const expectedResult1: number[][] = [[1, 4], [2, 5], [3, 6]];
      const expectedResult2: string[][] = [['a1', 'b1', 'c1'], ['a2', 'b2', 'c2']];

      verifyMatrix(
        ArrayUtil.transpose(sourceMatrix1),
        expectedResult1
      );
      verifyMatrix(
        ArrayUtil.transpose(sourceMatrix2),
        expectedResult2
      );
    });


    it('when given sourceMatrix has elements but not all internal arrays have the same size then transposed matrix is returned', () => {
      const sourceMatrix1: number[][] = [[1, 2], [0], [7, 8, 9]];
      const sourceMatrix2: string[][] = [['a1'], ['b1', 'b2', 'b3'], ['c1', 'c2']];

      const expectedResult1: number[][] = [[1, 0, 7], [2, 8], [9]];
      const expectedResult2: string[][] = [['a1', 'b1', 'c1'], ['b2', 'c2'], ['b3']];

      verifyMatrix(
        ArrayUtil.transpose(sourceMatrix1),
        expectedResult1
      );
      verifyMatrix(
        ArrayUtil.transpose(sourceMatrix2),
        expectedResult2
      );
    });


    it('when given sourceMatrix has elements and contains null or undefined elements then those ones will be included in the returned transposed matrix', () => {
      // @ts-ignore
      const sourceMatrix1: number[][] = [[1, null], null, [4, null]];
      // @ts-ignore
      const sourceMatrix2: string[][] = [['a1', undefined, 'a3'], ['b1', 'b2', 'b3'], ['c1', 'c2']];

      // @ts-ignore
      const expectedResult1: number[][] = [[1, 4], [null, null]];
      // @ts-ignore
      const expectedResult2: string[][] = [['a1', 'b1', 'c1'], [undefined, 'b2', 'c2'], ['a3', 'b3']];

      verifyMatrix(
        ArrayUtil.transpose(sourceMatrix1),
        expectedResult1
      );
      verifyMatrix(
        ArrayUtil.transpose(sourceMatrix2),
        expectedResult2
      );
    });

  });


  describe('uniqueByProperties', () => {

    it('when given sourceArray has no elements then empty array is returned', () => {
      const emptyArray: number[] = [];

      expect(ArrayUtil.uniqueByProperties(null, [])).toEqual(emptyArray);
      expect(ArrayUtil.uniqueByProperties(undefined, [])).toEqual(emptyArray);
      expect(ArrayUtil.uniqueByProperties(emptyArray, [])).toEqual(emptyArray);

      expect(ArrayUtil.uniqueByProperties(null, [], false)).toEqual(emptyArray);
      expect(ArrayUtil.uniqueByProperties(undefined, [], false)).toEqual(emptyArray);
      expect(ArrayUtil.uniqueByProperties(emptyArray, [], false)).toEqual(emptyArray);

      expect(ArrayUtil.uniqueByProperties(null, [], true)).toEqual(emptyArray);
      expect(ArrayUtil.uniqueByProperties(undefined, [], true)).toEqual(emptyArray);
      expect(ArrayUtil.uniqueByProperties(emptyArray, [], true)).toEqual(emptyArray);
    });


    it('when given propertiesToCompare has no elements then sourceArray is returned', () => {
      const rawArray = [ { a: 1, b: 1 }, { a: 1, b: 2 } ];

      expect(ArrayUtil.uniqueByProperties(rawArray, null)).toEqual(rawArray);
      expect(ArrayUtil.uniqueByProperties(rawArray, undefined)).toEqual(rawArray);
      expect(ArrayUtil.uniqueByProperties(rawArray, [])).toEqual(rawArray);

      expect(ArrayUtil.uniqueByProperties(rawArray, null, false)).toEqual(rawArray);
      expect(ArrayUtil.uniqueByProperties(rawArray, undefined, false)).toEqual(rawArray);
      expect(ArrayUtil.uniqueByProperties(rawArray, [], false)).toEqual(rawArray);

      expect(ArrayUtil.uniqueByProperties(rawArray, null, true)).toEqual(rawArray);
      expect(ArrayUtil.uniqueByProperties(rawArray, undefined, true)).toEqual(rawArray);
      expect(ArrayUtil.uniqueByProperties(rawArray, [], true)).toEqual(rawArray);
    });


    it('using raw objects, when given sourceArray and propertiesToCompare are not empty and keepFirstFound then the unique array of elements is returned', () => {
      const sourceArray = [
        { a: 1, b: '2', c: 1, h: { x: 11, z: 'a', u: 12 } },
        { a: 1, c: 2, b: '2', h: { x: 12, z: 'b', u: 34 } },
        { a: 1, b: '3', c: 3, h: { x: 11, u: 12, z: 'a' } }
      ];
      const expectedJsonUniqueANotKeepFirst = '[{"a":1,"b":"3","c":3,"h":{"x":11,"u":12,"z":"a"}}]';
      const expectedJsonUniqueAKeepFirst = '[{"a":1,"b":"2","c":1,"h":{"x":11,"z":"a","u":12}}]';

      const expectedJsonUniqueAHNotKeepFirst = '[{"a":1,"b":"3","c":3,"h":{"x":11,"u":12,"z":"a"}},{"a":1,"c":2,"b":"2","h":{"x":12,"z":"b","u":34}}]';
      const expectedJsonUniqueAHKeepFirst = '[{"a":1,"b":"2","c":1,"h":{"x":11,"z":"a","u":12}},{"a":1,"c":2,"b":"2","h":{"x":12,"z":"b","u":34}}]';

      const resultUniqueAUndefinedKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a']);
      expect(JSON.stringify(resultUniqueAUndefinedKeepFirst)).toEqual(expectedJsonUniqueANotKeepFirst);

      const resultUniqueANotKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a'], false);
      expect(JSON.stringify(resultUniqueANotKeepFirst)).toEqual(expectedJsonUniqueANotKeepFirst);

      const resultUniqueAKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a'], true);
      expect(JSON.stringify(resultUniqueAKeepFirst)).toEqual(expectedJsonUniqueAKeepFirst);

      const resultUniqueAHUndefinedKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a', 'h']);
      expect(JSON.stringify(resultUniqueAHUndefinedKeepFirst)).toEqual(expectedJsonUniqueAHNotKeepFirst);

      const resultUniqueAHNotKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a', 'h'], false);
      expect(JSON.stringify(resultUniqueAHNotKeepFirst)).toEqual(expectedJsonUniqueAHNotKeepFirst);

      const resultUniqueAHKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a', 'h'], true);
      expect(JSON.stringify(resultUniqueAHKeepFirst)).toEqual(expectedJsonUniqueAHKeepFirst);
    });


    it('using raw objects, when given sourceArray and propertiesToCompare are not empty and mergeValueFunction then the unique array of elements is returned', () => {
      const sourceArray = [
        { a: 1, b: '2', c: 1, h: { x: 11, z: 'a', u: 12 } },
        { a: 1, c: 2, b: '2', h: { x: 12, z: 'b', u: 34 } },
        { a: 1, b: '3', c: 3, h: { x: 11, u: 12, z: 'a' } }
      ];
      const expectedJsonUniqueANotKeepFirst = '[{"a":1,"b":"3","c":3,"h":{"x":11,"u":12,"z":"a"}}]';
      const expectedJsonUniqueAKeepFirst = '[{"a":1,"b":"2","c":1,"h":{"x":11,"z":"a","u":12}}]';

      const expectedJsonUniqueAHNotKeepFirst = '[{"a":1,"b":"3","c":3,"h":{"x":11,"u":12,"z":"a"}},{"a":1,"c":2,"b":"2","h":{"x":12,"z":"b","u":34}}]';
      const expectedJsonUniqueAHKeepFirst = '[{"a":1,"b":"2","c":1,"h":{"x":11,"z":"a","u":12}},{"a":1,"c":2,"b":"2","h":{"x":12,"z":"b","u":34}}]';

      const getFirstElto = (oldElto: any, newElto: any) => oldElto;
      const getLastElto: FBinaryOperator<any> = (oldElto: any, newElto: any) => newElto;

      const resultUniqueAUndefinedKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a']);
      expect(JSON.stringify(resultUniqueAUndefinedKeepFirst)).toEqual(expectedJsonUniqueANotKeepFirst);

      const resultUniqueANotKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a'], getLastElto);
      expect(JSON.stringify(resultUniqueANotKeepFirst)).toEqual(expectedJsonUniqueANotKeepFirst);

      const resultUniqueAKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a'], getFirstElto);
      expect(JSON.stringify(resultUniqueAKeepFirst)).toEqual(expectedJsonUniqueAKeepFirst);

      const resultUniqueAHUndefinedKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a', 'h']);
      expect(JSON.stringify(resultUniqueAHUndefinedKeepFirst)).toEqual(expectedJsonUniqueAHNotKeepFirst);

      const resultUniqueAHNotKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a', 'h'], getLastElto);
      expect(JSON.stringify(resultUniqueAHNotKeepFirst)).toEqual(expectedJsonUniqueAHNotKeepFirst);

      const resultUniqueAHKeepFirst = ArrayUtil.uniqueByProperties(sourceArray, ['a', 'h'], getFirstElto);
      expect(JSON.stringify(resultUniqueAHKeepFirst)).toEqual(expectedJsonUniqueAHKeepFirst);
    });


    it('using interfaces, when given sourceArray and propertiesToCompare are not empty then the unique array of elements is returned', () => {
      const r1 = { id: 1, name: 'role1' } as Role;
      const r2 = { id: 2, name: 'role2' } as Role;
      const r3 = { id: 1, name: 'role3' } as Role;

      const getFirstElto: BinaryOperator<Role> =
        BinaryOperator.of((oldElto: Role, newElto: Role) => oldElto);

      verifyArrays(
        ArrayUtil.uniqueByProperties([r1, r2, r3], ['id']),
        [r3, r2]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([r1, r2, r3], ['id'], false),
        [r3, r2]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([r1, r2, r3], ['id'], true),
        [r1, r2]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([r1, r2, r3], ['id'], getFirstElto),
        [r1, r2]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([r1, r2, r3], ['id', 'name']),
        [r1, r2, r3]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([r1, r2, r3], ['id', 'name'], false),
        [r1, r2, r3]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([r1, r2, r3], ['id', 'name'], true),
        [r1, r2, r3]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([r1, r2, r3], ['id', 'name'], getFirstElto),
        [r1, r2, r3]
      );
    });


    it('using classes, when given sourceArray and propertiesToCompare are not empty then the unique array of elements is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const u3 = new User(3, 'user1');

      const getLastElto: BinaryOperator<User> =
        BinaryOperator.of((oldElto: User, newElto: User) => newElto);

      verifyArrays(
        ArrayUtil.uniqueByProperties([u1, u2, u3], ['name']),
        [u3, u2]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([u1, u2, u3], ['name'], false),
        [u3, u2]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([u1, u2, u3], ['name'], true),
        [u1, u2]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([u1, u2, u3], ['name'], getLastElto),
        [u3, u2]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([u1, u2, u3], ['id', 'name']),
        [u1, u2, u3]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([u1, u2, u3], ['id', 'name'], false),
        [u1, u2, u3]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([u1, u2, u3], ['id', 'name'], true),
        [u1, u2, u3]
      );
      verifyArrays(
        ArrayUtil.uniqueByProperties([u1, u2, u3], ['id', 'name'], getLastElto),
        [u1, u2, u3]
      );
    });

  });

});



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


function verifyArrays(actualArray: any[],
                      expectedArray: any[]) {
  expect(expectedArray.length).toEqual(actualArray.length);
  if (0 < expectedArray.length) {
    for (let i = 0; i < expectedArray.length; i++) {
      expect(expectedArray[i]).toEqual(actualArray[i]);
    }
  }
}


function verifyMatrix(actualMatrix: any[][],
                      expectedMatrix: any[][]) {
  expect(expectedMatrix.length).toEqual(actualMatrix.length);
  if (0 < expectedMatrix.length) {
    for (let i = 0; i < expectedMatrix.length; i++) {
      const currentActualArray = actualMatrix[i],
            currentExpectedArray = expectedMatrix[i];

      expect(currentExpectedArray.length).toEqual(currentActualArray.length);
      if (0 < currentExpectedArray.length) {
        for (let j = 0; j < currentExpectedArray.length; j++) {
          expect(currentExpectedArray[j]).toEqual(currentActualArray[j]);
        }
      }
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


const isEvenRaw =
  (n: number) =>
    0 == n % 2;


const isEvenFPredicate: FPredicate1<number> =
  (n: number) =>
    0 == n % 2;


const isEvenPredicate: Predicate1<number> =
  Predicate1.of(
    (n: number) =>
      0 == n % 2
  );


const isOddRaw =
  (n: number) =>
    1 == n % 2;


const isOddFPredicate: FPredicate1<number> =
  (n: number) =>
    1 == n % 2;


const lessThan10Raw =
  (n: number) =>
    10 > n;


const mod3Raw =
  (n: number) =>
    n % 3;


const mod3FFunction: FFunction1<number, number> =
  (n: number) =>
    n % 3;


const multiply2Raw =
  (n: number) =>
    2 * n;


const multiply2Function: Function1<number, number> =
  Function1.of(
    (n: number) =>
      2 * n
  );


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


const sameValueRaw =
  (n: number) =>
    n;


const sameValueFunction: Function1<number, number> =
  Function1.of(
    (n: number) =>
      n
  );


const sumValuesRaw =
  (n1: number,
   n2: number) =>
    n1 + n2;


const sumValuesBinaryOperator: BinaryOperator<number> =
    BinaryOperator.of(
      (n1: number,
       n2: number) =>
        n1 + n2
    );


const plus1ForOddPP: PartialFunction<number, number> =
  PartialFunction.of(
    (n: number) => 1 == n % 2,
    (n: number) => 1 + n
  );


const multiply2AndStringForEvenPP: PartialFunction<number, string> =
  PartialFunction.of(
    (n: number) => 0 == n % 2,
    (n: number) => '' + (2 * n)
  );


const numberAsKeyAndPlus1AsValueForOddPP: PartialFunction<number, [number, number]> =
  PartialFunction.of(
    (n: number) => 1 == n % 2,
    (n: number) => [n, 1 + n]
  );


const mod3AsKeyAndPlus1AsValueForLowerThan10PP: PartialFunction<number, [number, number]> =
  PartialFunction.of(
    (n: number) => 10 > n,
    (n: number) => [n % 3, n + 1]
  );
