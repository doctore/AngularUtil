import { Comparable, Comparator, FComparator, isFComparator } from '@app-core/type/comparator';
import { NullableOrUndefined } from '@app-core/type';
import { Function3 } from '@app-core/type/function';
import { IllegalArgumentError } from '@app-core/error';
import { ObjectUtil } from '@app-core/util';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/comparator/comparator.type.spec.ts
 */
describe('isFComparator', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFComparator()).toBe(false);
    expect(isFComparator(null)).toBe(false);
    expect(isFComparator(12)).toBe(false);
    expect(isFComparator({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFComparator((t1: number) => t1)).toBe(false);
    expect(isFComparator((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFComparator((t1: number, t2: number) => {})).toBe(true);
    expect(isFComparator((t1: number, t2: number) => t1 + t2)).toBe(true);
  });

});




describe('Comparator', () => {


  describe('nullOrUndefinedFirst', () => {

    it('when both parameters are null or undefined then 0 will be returned', () => {
      const comparator: Comparator<NullableOrUndefined<number>> =
        Comparator.nullOrUndefinedFirst((a, b) => a! - b!);

      expect(comparator.compare(null, null)).toEqual(0);
      expect(comparator.compare(null, undefined)).toEqual(0);
      expect(comparator.compare(undefined, null)).toEqual(0);
      expect(comparator.compare(undefined, undefined)).toEqual(0);
    });


    it('when one of the parameters is null or undefined then it will be less than the other one', () => {
      const comparator: Comparator<NullableOrUndefined<number>> =
        Comparator.nullOrUndefinedFirst(
          Comparator.of((a, b) => a! - b!));

      expect(comparator.compare(null, 11)).toEqual(-1);
      expect(comparator.compare(undefined, -3)).toEqual(-1);

      expect(comparator.compare(11, null)).toEqual(1);
      expect(comparator.compare(-3, undefined)).toEqual(1);
    });


    it('when no one of the parameters is null or undefined then expected comparison result is returned', () => {
      const comparator: Comparator<number> =
        Comparator.nullOrUndefinedFirst((a, b) => a - b);

      expect(comparator.compare(11, 11)).toEqual(0);
      expect(comparator.compare(-4, 19)).toBeLessThan(0);
      expect(comparator.compare(22, -6)).toBeGreaterThan(0);
    });

  });



  describe('nullOrUndefinedFirstOfComparable', () => {

    it('when both parameters are null or undefined then 0 will be returned', () => {
      const comparator: Comparator<NullableOrUndefined<User>> =
        Comparator.nullOrUndefinedFirstOfComparable<User>();

      expect(comparator.compare(null, null)).toEqual(0);
      expect(comparator.compare(null, undefined)).toEqual(0);
      expect(comparator.compare(undefined, null)).toEqual(0);
      expect(comparator.compare(undefined, undefined)).toEqual(0);
    });


    it('when one of the parameters is null or undefined then it will be less than the other one', () => {
      const user = new User(1, 'user1');
      const comparator: Comparator<NullableOrUndefined<User>> =
        Comparator.nullOrUndefinedFirstOfComparable<User>();

      expect(comparator.compare(null, user)).toEqual(-1);
      expect(comparator.compare(undefined, user)).toEqual(-1);

      expect(comparator.compare(user, null)).toEqual(1);
      expect(comparator.compare(user, undefined)).toEqual(1);
    });


    it('when no one of the parameters is null or undefined then expected comparison result is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const comparator: Comparator<NullableOrUndefined<User>> =
        Comparator.nullOrUndefinedFirstOfComparable<User>();

      expect(comparator.compare(u1, u1)).toEqual(0);
      expect(comparator.compare(u1, u2)).toBeLessThan(0);
      expect(comparator.compare(u2, u1)).toBeGreaterThan(0);
    });

  });



  describe('nullOrUndefinedLast', () => {

    it('when both parameters are null or undefined then 0 will be returned', () => {
      const comparator: Comparator<NullableOrUndefined<number>> =
        Comparator.nullOrUndefinedLast((a, b) => a! - b!);

      expect(comparator.compare(null, null)).toEqual(0);
      expect(comparator.compare(null, undefined)).toEqual(0);
      expect(comparator.compare(undefined, null)).toEqual(0);
      expect(comparator.compare(undefined, undefined)).toEqual(0);
    });


    it('when one of the parameters is null or undefined then it will be greater than the other one', () => {
      const comparator: Comparator<NullableOrUndefined<number>> =
        Comparator.nullOrUndefinedLast(
          Comparator.of((a, b) => a! - b!));

      expect(comparator.compare(null, 11)).toEqual(1);
      expect(comparator.compare(undefined, -3)).toEqual(1);

      expect(comparator.compare(11, null)).toEqual(-1);
      expect(comparator.compare(-3, undefined)).toEqual(-1);
    });


    it('when no one of the parameters is null or undefined then expected comparison result is returned', () => {
      const comparator: Comparator<number> =
        Comparator.nullOrUndefinedLast((a, b) => a - b);

      expect(comparator.compare(11, 11)).toEqual(0);
      expect(comparator.compare(-4, 19)).toBeLessThan(0);
      expect(comparator.compare(22, -6)).toBeGreaterThan(0);
    });

  });



  describe('nullOrUndefinedLastOfComparable', () => {

    it('when both parameters are null or undefined then 0 will be returned', () => {
      const comparator: Comparator<NullableOrUndefined<User>> =
        Comparator.nullOrUndefinedLastOfComparable<User>();

      expect(comparator.compare(null, null)).toEqual(0);
      expect(comparator.compare(null, undefined)).toEqual(0);
      expect(comparator.compare(undefined, null)).toEqual(0);
      expect(comparator.compare(undefined, undefined)).toEqual(0);
    });


    it('when one of the parameters is null or undefined then it will be greater than the other one', () => {
      const user = new User(1, 'user1');
      const comparator: Comparator<NullableOrUndefined<User>> =
        Comparator.nullOrUndefinedLastOfComparable<User>();

      expect(comparator.compare(null, user)).toEqual(1);
      expect(comparator.compare(undefined, user)).toEqual(1);

      expect(comparator.compare(user, null)).toEqual(-1);
      expect(comparator.compare(user, undefined)).toEqual(-1);
    });


    it('when no one of the parameters is null or undefined then expected comparison result is returned', () => {
      const u1 = new User(1, 'user1');
      const u2 = new User(2, 'user2');
      const comparator: Comparator<NullableOrUndefined<User>> =
        Comparator.nullOrUndefinedLastOfComparable<User>();

      expect(comparator.compare(u1, u1)).toEqual(0);
      expect(comparator.compare(u1, u2)).toBeLessThan(0);
      expect(comparator.compare(u2, u1)).toBeGreaterThan(0);
    });

  });



  describe('isComparator', () => {

    it('when no function is provided then false is returned', () => {
      expect(Comparator.isComparator()).toBe(false);
      expect(Comparator.isComparator(null)).toBe(false);
      expect(Comparator.isComparator('')).toBe(false);
      expect(Comparator.isComparator(12)).toBe(false);
      expect(Comparator.isComparator({})).toBe(false);
      expect(Comparator.isComparator({ apply: (n: number) => n * 2 })).toBe(false);
    });


    it('when provided function is different than Comparator then false is returned', () => {
      const stringLengthPlusNumbers: Function3<string, number, number, number> =
        Function3.of((s: NullableOrUndefined<string>, n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => s!.length + n1! + n2!);

      expect(Comparator.isComparator(stringLengthPlusNumbers)).toBe(false);
    });


    it('when a Comparator is provided then true is returned', () => {
      const compareStrings: Comparator<string> =
        Comparator.of((s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1!.length - s2!.length);

      expect(Comparator.isComparator(compareStrings)).toBe(true);

      expect(Comparator.isComparator(Comparator.nullOrUndefinedFirst(compareStrings))).toBe(true);
      expect(Comparator.isComparator(Comparator.nullOrUndefinedLast(compareStrings))).toBe(true);
    });

  });



  describe('of', () => {

    it('when null or undefined func is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Comparator.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Comparator.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FComparator is provided then a valid Comparator is returned', () => {
      const compareStrings = (s1: NullableOrUndefined<string>, s2: NullableOrUndefined<string>) => s1!.length - s2!.length;

      const func = Comparator.of(compareStrings);

      expect(Comparator.isComparator(func)).toBe(true);
      expect(func.compare('abc', 'zf')).toEqual(1);
    });


    it('when an instance of FComparator is provided then a valid Comparator is returned', () => {
      const compareNumbers: FComparator<number> =
        (n1: NullableOrUndefined<number>, n2: NullableOrUndefined<number>) => n1! - n2!;

      const func = Comparator.of(compareNumbers);

      expect(Comparator.isComparator(func)).toBe(true);
      expect(func.compare(9, 1)).toEqual(8);
    });


    it('when an instance of Comparator is provided then the same one is returned', () => {
      const compareNumbers: Comparator<number> =
        Comparator.of((n1: number, n2: number) => n1 - n2);

      const func = Comparator.of(compareNumbers);

      expect(Comparator.isComparator(func)).toBe(true);
      expect(func.compare(11, 2)).toEqual(9);
    });

  });



  describe('compare', () => {

    it('when a Comparator is provided then the received input will be transformed', () => {
      const stringComparator: Comparator<string> =
        Comparator.of((s1: string, s2: string) => s1.length - s2.length);

      expect(stringComparator.compare('', 'a')).toEqual(-1);
      expect(stringComparator.compare('abc', '')).toEqual(3);
    });

  });



  describe('getComparator', () => {

    it('then return internal comparator', () => {
      const stringComparator: Comparator<string> =
        Comparator.of((s1: string, s2: string) => s1.length - s2.length);

      const comparator: FComparator<string> = stringComparator.getComparator();

      expect(comparator('', 'a')).toEqual(-1);
      expect(comparator('abc', '')).toEqual(3);
    });

  });



  describe('reversed', () => {

    it('then return reverse ordering of internal comparator', () => {
      const comparator: Comparator<number> =
          Comparator.of((a, b) => a - b);

      expect(comparator.reversed(1, 1)).toEqual(comparator.compare(1, 1));
      expect(comparator.reversed(10, 20)).toEqual(-comparator.compare(10, 20));
      expect(comparator.reversed(20, 10)).toEqual(-comparator.compare(20, 10));
    });

  });

});



// Used only for testing purpose
class User implements Comparable<User> {
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

  compareTo(other: User): number {
    if (ObjectUtil.isNullOrUndefined(other)) {
      return 1;
    }
    if (!this.id && !other.id) {
      return 0;
    }
    if (!this.id) {
      return -1;
    }
    if (!other.id) {
      return 1;
    }
    return this.id - other.id;
  }

  equals = (other?: User | null): boolean =>
    ObjectUtil.isNullOrUndefined(other)
      ? false
      : this.id === other.id;

}
