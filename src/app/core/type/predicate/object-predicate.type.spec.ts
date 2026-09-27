import {
  ObjectPredicate,
  FObjectPredicate,
  isFObjectPredicate,
  Predicate2
} from '@app-core/type/predicate';
import { Comparable } from '@app-core/type/comparator';
import { ObjectUtil } from '@app-core/util';
import { NullableOrUndefined } from '@app-core/type';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/predicate/object-predicate.type.spec.ts
 */
describe('isFObjectPredicate', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFObjectPredicate()).toBe(false);
    expect(isFObjectPredicate(null)).toBe(false);
    expect(isFObjectPredicate(12)).toBe(false);
    expect(isFObjectPredicate({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFObjectPredicate((t1: string) => null !== t1)).toBe(false);
    expect(isFObjectPredicate((t1: string, t2: string) => null !== t1 && null !== t2)).toBe(false);
    expect(isFObjectPredicate((t1: string, t2: string, t3: string, t4: string) => null !== t1 && null !== t2 && null != t3 && null != t4)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFObjectPredicate((t1: string, t2: string, t3: string) => true)).toBe(true);
    expect(isFObjectPredicate((t1: object, t2: object, t3: object) => null !== t1 && null !== t2 && null != t3)).toBe(true);
  });

});




describe('ObjectPredicate', () => {


  describe('allOf', () => {

    it('when given objectPredicates are null or empty then true is always returned', () => {
      const user = {
        name: "Juan",
        age: 30,
        active: true,
        score: 100
      };

      expect(ObjectPredicate.allOf<typeof user>().apply('name', '', user)).toBe(true);
      expect(ObjectPredicate.allOf<typeof user>(null).apply('age', 20, user)).toBe(true);
      expect(ObjectPredicate.allOf<typeof user>([]).apply('active', false, user)).toBe(true);
    });


    it('when given objectPredicates are not null or empty then result after applying all is always returned', () => {
      const rawUser = {
        name: "Juan",
        age: 30
      };
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      expect(ObjectPredicate.allOf([isNumericPropertyGreaterThanProvidedValueRaw, isNumericPropertyDividendOfProvidedValueRaw])
        .apply('age', 31, rawUser)).toBe(false);

      expect(ObjectPredicate.allOf([isNumericPropertyGreaterThanProvidedValueRaw, isNumericPropertyDividendOfProvidedValueRaw])
        .apply('age', 10, rawUser)).toBe(true);

      expect(ObjectPredicate.allOf([isNumericPropertyGreaterThanProvidedValueObjectPredicate, isNumericPropertyDividendOfProvidedValueObjectPredicate])
        .apply('id', 31, user)).toBe(false);

      expect(ObjectPredicate.allOf([isNumericPropertyGreaterThanProvidedValueObjectPredicate, isNumericPropertyDividendOfProvidedValueObjectPredicate])
        .apply('id', 5, user)).toBe(true);

      expect(ObjectPredicate.allOf([isNumericPropertyGreaterThanProvidedValueObjectPredicate, isNumericPropertyDividendOfProvidedValueObjectPredicate])
        .apply('id', 31, user)).toBe(false);

      expect(ObjectPredicate.allOf([isNumericPropertyGreaterThanProvidedValueFObjectPredicate, isNumericPropertyDividendOfProvidedValueFObjectPredicate])
        .apply('id', 5, role)).toBe(true);
    });

  });



  describe('alwaysFalse', () => {

    it('when any input is given then false is always returned', () => {
      const user = {
        name: "Juan",
        age: 30,
        active: true,
        score: 100,
      };
      const predicate = ObjectPredicate.alwaysFalse<typeof user>();

      expect(predicate.apply("name", "Sara", user)).toBe(false);
      expect(predicate.apply('age', 21, user)).toBe(false);
      expect(predicate.apply('active', false, user)).toBe(false);
    });

  });



  describe('alwaysTrue', () => {

    it('when any input is given then true is always returned', () => {
      const user = {
        name: "Juan",
        age: 30,
        active: true,
        score: 100
      };
      const predicate = ObjectPredicate.alwaysTrue<typeof user>();

      expect(predicate.apply("name", "Juan", user)).toBe(true);
      expect(predicate.apply('age', 30, user)).toBe(true);
      expect(predicate.apply('active', true, user)).toBe(true);
    });

  });



  describe('anyOf', () => {

    it('when given objectPredicates are null or empty then false is always returned', () => {
      const user = {
        name: "Juan",
        age: 30,
        active: true,
        score: 100
      };

      expect(ObjectPredicate.anyOf<typeof user>().apply('name', '', user)).toBe(false);
      expect(ObjectPredicate.anyOf<typeof user>(null).apply('age', 20, user)).toBe(false);
      expect(ObjectPredicate.anyOf<typeof user>([]).apply('active', false, user)).toBe(false);
    });


    it('when given objectPredicates are not null or empty then result after applying all is always returned', () => {
      const rawUser = {
        name: "Juan",
        age: 30
      };
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      expect(ObjectPredicate.anyOf([isNumericPropertyGreaterThanProvidedValueRaw, isNumericPropertyDividendOfProvidedValueRaw])
        .apply('age', 31, rawUser)).toBe(false);

      expect(ObjectPredicate.anyOf([isNumericPropertyGreaterThanProvidedValueRaw, isNumericPropertyDividendOfProvidedValueRaw])
        .apply('age', 10, rawUser)).toBe(true);

      expect(ObjectPredicate.anyOf([isNumericPropertyGreaterThanProvidedValueObjectPredicate, isNumericPropertyDividendOfProvidedValueObjectPredicate])
        .apply('id', 31, user)).toBe(false);

      expect(ObjectPredicate.anyOf([isNumericPropertyGreaterThanProvidedValueObjectPredicate, isNumericPropertyDividendOfProvidedValueObjectPredicate])
        .apply('id', 10, user)).toBe(true);

      expect(ObjectPredicate.anyOf([isNumericPropertyGreaterThanProvidedValueObjectPredicate, isNumericPropertyDividendOfProvidedValueObjectPredicate])
        .apply('id', 31, user)).toBe(false);

      expect(ObjectPredicate.anyOf([isNumericPropertyGreaterThanProvidedValueFObjectPredicate, isNumericPropertyDividendOfProvidedValueFObjectPredicate])
        .apply('id', 10, role)).toBe(true);
    });

  });



  describe('isNullOrUndefined', () => {

    it('when given parameters are null or undefined then true is returned', () => {
      const predicate = ObjectPredicate.isNullOrUndefined();

      // @ts-ignore
      expect(predicate.apply(null, null, null)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(null, undefined, null)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(null, undefined, undefined)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(undefined, null, null)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(undefined, undefined, null)).toBe(true);
      // @ts-ignore
      expect(predicate.apply(undefined, undefined, undefined)).toBe(true);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      // @ts-ignore
      const user = new User(null, null);
      const predicate = ObjectPredicate.isNullOrUndefined<User>();

      // @ts-ignore
      expect(predicate.apply(null, 12, '')).toBe(false);
      // @ts-ignore
      expect(predicate.apply(undefined, 12, '')).toBe(false);
      expect(predicate.apply("id", user.id, user)).toBe(false);
      expect(predicate.apply('name', user.name, user)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(12, '', null)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(12, '', undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then false is returned', () => {
      const user = new User(1, 'user1');
      const predicate = ObjectPredicate.isNullOrUndefined<User>();

      expect(predicate.apply("id", 1, user)).toBe(false);
      expect(predicate.apply('name', 'user1', user)).toBe(false);
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when given parameters are null or undefined then false is returned', () => {
      const predicate = ObjectPredicate.nonNullOrUndefined();

      // @ts-ignore
      expect(predicate.apply(null, null, null)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(null, undefined, null)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(null, undefined, undefined)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(undefined, null, null)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(undefined, undefined, null)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(undefined, undefined, undefined)).toBe(false);
    });


    it('when one of the parameters is neither null nor undefined then false is returned', () => {
      // @ts-ignore
      const user = new User(null, null);
      const predicate = ObjectPredicate.isNullOrUndefined<User>();

      // @ts-ignore
      expect(predicate.apply(null, 12, '')).toBe(false);
      // @ts-ignore
      expect(predicate.apply(undefined, 12, '')).toBe(false);
      expect(predicate.apply("id", user.id, user)).toBe(false);
      expect(predicate.apply('name', user.name, user)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(12, '', null)).toBe(false);
      // @ts-ignore
      expect(predicate.apply(12, '', undefined)).toBe(false);
    });


    it('when given parameters are neither null nor undefined then true is returned', () => {
      const user = new User(1, 'user1');
      const predicate = ObjectPredicate.nonNullOrUndefined<User>();

      expect(predicate.apply("id", 1, user)).toBe(true);
      expect(predicate.apply('name', 'user1', user)).toBe(true);
    });

  });



  describe('isObjectPredicate', () => {

    it('when no predicate is provided then false is returned', () => {
      expect(ObjectPredicate.isObjectPredicate()).toBe(false);
      expect(ObjectPredicate.isObjectPredicate(null)).toBe(false);
      expect(ObjectPredicate.isObjectPredicate('')).toBe(false);
      expect(ObjectPredicate.isObjectPredicate(12)).toBe(false);
      expect(ObjectPredicate.isObjectPredicate({})).toBe(false);
      expect(ObjectPredicate.isObjectPredicate({ apply: (n: number) => n*2 })).toBe(false);
    });


    it('when provided predicate is different than ObjectPredicate then false is returned', () => {
      const isNumberEvenAndStringNotNull: Predicate2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
        Predicate2.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) =>
          0 == n! % 2 &&
          undefined !== s &&
          null !== s
        );

      expect(ObjectPredicate.isObjectPredicate(isNumberEvenAndStringNotNull)).toBe(false);
    });


    it('when a Predicate3 is provided then true is returned', () => {
      const user = {
        name: "Juan",
        age: 30
      };
      const isAgeGreaterThan20: ObjectPredicate<typeof user> =
        ObjectPredicate.of<typeof user>((key, value, obj) =>
          key === "age" &&
          typeof value === "number" &&
          value > 20
        );

      expect(ObjectPredicate.isObjectPredicate(isAgeGreaterThan20)).toBe(true);
      expect(ObjectPredicate.isObjectPredicate(ObjectPredicate.alwaysTrue())).toBe(true);
      expect(ObjectPredicate.isObjectPredicate(ObjectPredicate.alwaysFalse())).toBe(true);
    });

  });



  describe('of', () => {

    it('when null or undefined objectPredicate is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => ObjectPredicate.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => ObjectPredicate.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FObjectPredicate is provided then a valid ObjectPredicate is returned', () => {
      const user = {
        name: "Juan",
        age: 30
      };
      const objectPredicate = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueRaw);

      expect(ObjectPredicate.isObjectPredicate(objectPredicate)).toBe(true);
      expect(objectPredicate.apply("name", "Sara", user)).toBe(false);
      expect(objectPredicate.apply('age', 50, user)).toBe(false);
      expect(objectPredicate.apply('age', 20, user)).toBe(true);
    });


    it('when an instance of FObjectPredicate is provided then a valid ObjectPredicate is returned', () => {
      const user = {
        name: "Juan",
        age: 30
      };
      const isNumericPropertyGreaterThanProvidedValue: FObjectPredicate<typeof user> =
        (key, value, obj) =>
          obj[key] &&
          typeof obj[key] === "number" &&
          // @ts-ignore
          obj[key] > value;

      const objectPredicate = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValue);

      expect(ObjectPredicate.isObjectPredicate(objectPredicate)).toBe(true);
      expect(objectPredicate.apply("name", "Sara", user)).toBe(false);
      expect(objectPredicate.apply('age', 50, user)).toBe(false);
      expect(objectPredicate.apply('age', 20, user)).toBe(true);
    });


    it('when an instance of ObjectPredicate is provided then the same one is returned', () => {
      const user = {
        name: "Juan",
        age: 30
      };
      const isNumericPropertyGreaterThanProvidedValue: ObjectPredicate<typeof user> =
        ObjectPredicate.of<typeof user>((key, value, obj) =>
          obj[key] &&
          typeof obj[key] === "number" &&
          // @ts-ignore
          obj[key] > value
        );

      const objectPredicate = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValue);

      expect(ObjectPredicate.isObjectPredicate(objectPredicate)).toBe(true);
      expect(objectPredicate.apply("name", "Sara", user)).toBe(false);
      expect(objectPredicate.apply('age', 50, user)).toBe(false);
      expect(objectPredicate.apply('age', 20, user)).toBe(true);
    });

  });



  describe('getVerifier', () => {

    it('then return internal verifier', () => {
      const user1 = new User(1, 'User 1');
      const user2 = new User(2, 'User 2');
      const verifier: FObjectPredicate<User> = isNumericPropertyGreaterThanProvidedValueObjectPredicate.getVerifier();

      expect(verifier('id', 5, user1)).toBe(false);
      expect(verifier('id', 5, user2)).toBe(false);
      expect(verifier('id', 1, user2)).toBe(true);
    });

  });



  describe('and', () => {

    it('when given ObjectPredicate is null or undefined then only this will be evaluated', () => {
      const user = new User(2, 'User 2');
      // @ts-ignore
      const andPredicates = isNumericPropertyGreaterThanProvidedValueObjectPredicate.and(null);

      expect(andPredicates.apply('id', 5, user)).toBe(false);
      expect(andPredicates.apply('id', 15, user)).toBe(false);
      expect(andPredicates.apply('id', 0, user)).toBe(true);
      expect(andPredicates.apply('id', 1, user)).toBe(true);
    });


    it('when one of the ObjectPredicate to evaluate returns false then false is returned', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const andPredicates1 = isNumericPropertyGreaterThanProvidedValueObjectPredicate.and(
        isNumericPropertyDividendOfProvidedValueObjectPredicate
      );
      const andPredicates2 = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueFObjectPredicate).and(
        ObjectPredicate.of(isNumericPropertyDividendOfProvidedValueFObjectPredicate)
      );

      expect(andPredicates1.apply('id', 3, user)).toBe(false);
      expect(andPredicates1.apply('id', 10, user)).toBe(false);
      expect(andPredicates1.apply('id', 15, user)).toBe(false);

      expect(andPredicates2.apply('id', 3, role)).toBe(false);
      expect(andPredicates2.apply('id', 10, role)).toBe(false);
      expect(andPredicates2.apply('id', 15, role)).toBe(false);
    });


    it('when both ObjectPredicate return true then true is returned', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const andPredicates1 = isNumericPropertyGreaterThanProvidedValueObjectPredicate.and(
        isNumericPropertyDividendOfProvidedValueObjectPredicate
      );
      const andPredicates2 = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueFObjectPredicate).and(
        ObjectPredicate.of(isNumericPropertyDividendOfProvidedValueFObjectPredicate)
      );

      expect(andPredicates1.apply('id', 5, user)).toBe(true);
      expect(andPredicates1.apply('id', 2, user)).toBe(true);

      expect(andPredicates2.apply('id', 5, role)).toBe(true);
      expect(andPredicates2.apply('id', 2, role)).toBe(true);
    });

  });



  describe('apply', () => {

    it('when a ObjectPredicate is provided then the received input will be evaluated', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const roleObjectPredicate = ObjectPredicate.of(isStringPropertyDifferentThanProvidedValueFObjectPredicate);

      expect(isStringPropertyDifferentThanProvidedValueObjectPredicate.apply('name', 'User 10', user)).toBe(false);
      expect(isStringPropertyDifferentThanProvidedValueObjectPredicate.apply('name', 'User 20', user)).toBe(true);

      expect(roleObjectPredicate.apply('name', 'Role 10', role)).toBe(false);
      expect(roleObjectPredicate.apply('name', 'Role 20', role)).toBe(true);
    });

  });



  describe('not', () => {

    it('when a ObjectPredicate is provided then logical negation will be returned', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const notIsNumericPropertyGreaterThanProvidedValueUser = isNumericPropertyGreaterThanProvidedValueObjectPredicate.not();
      const notIsNumericPropertyGreaterThanProvidedValueRole = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueFObjectPredicate).not();

      expect(notIsNumericPropertyGreaterThanProvidedValueUser.apply('id', 5, user)).toBe(false);
      expect(notIsNumericPropertyGreaterThanProvidedValueUser.apply('id', 15, user)).toBe(true);

      expect(notIsNumericPropertyGreaterThanProvidedValueRole.apply('id', 5, role)).toBe(false);
      expect(notIsNumericPropertyGreaterThanProvidedValueRole.apply('id', 15, role)).toBe(true);
    });

  });



  describe('or', () => {

    it('when given ObjectPredicate is null or undefined then only this will be evaluated', () => {
      const user = new User(2, 'User 2');
      // @ts-ignore
      const orPredicates = isNumericPropertyGreaterThanProvidedValueObjectPredicate.or(null);

      expect(orPredicates.apply('id', 5, user)).toBe(false);
      expect(orPredicates.apply('id', 15, user)).toBe(false);
      expect(orPredicates.apply('id', 0, user)).toBe(true);
      expect(orPredicates.apply('id', 1, user)).toBe(true);
    });


    it('when one of the ObjectPredicate to evaluate returns true then true is returned', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const orPredicates1 = isNumericPropertyGreaterThanProvidedValueObjectPredicate.or(
        isNumericPropertyDividendOfProvidedValueObjectPredicate
      );
      const orPredicates2 = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueFObjectPredicate).or(
        ObjectPredicate.of(isNumericPropertyDividendOfProvidedValueFObjectPredicate)
      );

      expect(orPredicates1.apply('id', 3, user)).toBe(true);
      expect(orPredicates1.apply('id', 10, user)).toBe(true);

      expect(orPredicates2.apply('id', 3, role)).toBe(true);
      expect(orPredicates2.apply('id', 10, role)).toBe(true);
    });


    it('when both ObjectPredicate return false then false is returned', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const orPredicates1 = isNumericPropertyGreaterThanProvidedValueObjectPredicate.or(
        isNumericPropertyDividendOfProvidedValueObjectPredicate
      );
      const orPredicates2 = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueFObjectPredicate).or(
        ObjectPredicate.of(isNumericPropertyDividendOfProvidedValueFObjectPredicate)
      );

      expect(orPredicates1.apply('id', 17, user)).toBe(false);
      expect(orPredicates1.apply('id', 19, user)).toBe(false);

      expect(orPredicates2.apply('id', 17, role)).toBe(false);
      expect(orPredicates2.apply('id', 19, role)).toBe(false);
    });


    it('when both ObjectPredicate return true then true is returned', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const orPredicates1 = isNumericPropertyGreaterThanProvidedValueObjectPredicate.or(
        isNumericPropertyDividendOfProvidedValueObjectPredicate
      );
      const orPredicates2 = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueFObjectPredicate).or(
        ObjectPredicate.of(isNumericPropertyDividendOfProvidedValueFObjectPredicate)
      );

      expect(orPredicates1.apply('id', 5, user)).toBe(true);
      expect(orPredicates1.apply('id', 2, user)).toBe(true);

      expect(orPredicates2.apply('id', 5, role)).toBe(true);
      expect(orPredicates2.apply('id', 2, role)).toBe(true);
    });

  });



  describe('xor', () => {

    it('when given ObjectPredicate is null or undefined then only this will be evaluated', () => {
      const user = new User(2, 'User 2');
      // @ts-ignore
      const xorPredicates = isNumericPropertyGreaterThanProvidedValueObjectPredicate.xor(null);

      expect(xorPredicates.apply('id', 5, user)).toBe(false);
      expect(xorPredicates.apply('id', 15, user)).toBe(false);
      expect(xorPredicates.apply('id', 0, user)).toBe(true);
      expect(xorPredicates.apply('id', 1, user)).toBe(true);
    });


    it('when one of the ObjectPredicate to evaluate returns true then true is returned', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const xorPredicates1 = isNumericPropertyGreaterThanProvidedValueObjectPredicate.xor(
        isNumericPropertyDividendOfProvidedValueObjectPredicate
      );
      const xorPredicates2 = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueFObjectPredicate).xor(
        ObjectPredicate.of(isNumericPropertyDividendOfProvidedValueFObjectPredicate)
      );

      expect(xorPredicates1.apply('id', 3, user)).toBe(true);
      expect(xorPredicates1.apply('id', 10, user)).toBe(true);

      expect(xorPredicates2.apply('id', 3, role)).toBe(true);
      expect(xorPredicates2.apply('id', 10, role)).toBe(true);
    });


    it('when both ObjectPredicate return false then false is returned', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const xorPredicates1 = isNumericPropertyGreaterThanProvidedValueObjectPredicate.xor(
        isNumericPropertyDividendOfProvidedValueObjectPredicate
      );
      const xorPredicates2 = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueFObjectPredicate).xor(
        ObjectPredicate.of(isNumericPropertyDividendOfProvidedValueFObjectPredicate)
      );

      expect(xorPredicates1.apply('id', 17, user)).toBe(false);
      expect(xorPredicates1.apply('id', 19, user)).toBe(false);

      expect(xorPredicates2.apply('id', 17, role)).toBe(false);
      expect(xorPredicates2.apply('id', 19, role)).toBe(false);
    });


    it('when both ObjectPredicate return true then false is returned', () => {
      const user = new User(10, 'User 10');
      const role = { id: 10, name: 'Role 10' } as Role;

      const xorPredicates1 = isNumericPropertyGreaterThanProvidedValueObjectPredicate.xor(
        isNumericPropertyDividendOfProvidedValueObjectPredicate
      );
      const xorPredicates2 = ObjectPredicate.of(isNumericPropertyGreaterThanProvidedValueFObjectPredicate).xor(
        ObjectPredicate.of(isNumericPropertyDividendOfProvidedValueFObjectPredicate)
      );

      expect(xorPredicates1.apply('id', 5, user)).toBe(false);
      expect(xorPredicates1.apply('id', 2, user)).toBe(false);

      expect(xorPredicates2.apply('id', 5, role)).toBe(false);
      expect(xorPredicates2.apply('id', 2, role)).toBe(false);
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


interface Role {
  id: number;
  name: string;
}



const isNumericPropertyGreaterThanProvidedValueRaw =
  (key: any, value: any, obj: any) =>
    obj[key] &&
    typeof obj[key] === "number" &&
    obj[key] > value;


const isNumericPropertyGreaterThanProvidedValueFObjectPredicate: FObjectPredicate<Role> =
  (key, value, obj) =>
    obj[key] &&
    typeof obj[key] === "number" &&
    // @ts-ignore
    obj[key] > value;


const isNumericPropertyGreaterThanProvidedValueObjectPredicate: ObjectPredicate<User> =
  ObjectPredicate.of((key, value, obj) =>
    obj[key] &&
    typeof obj[key] === "number" &&
    // @ts-ignore
    obj[key] > value
  );


const isNumericPropertyDividendOfProvidedValueRaw =
  (key: any, value: any, obj: any) =>
    obj[key] &&
    typeof obj[key] === "number" &&
    0 == obj[key] % value;


const isNumericPropertyDividendOfProvidedValueFObjectPredicate: FObjectPredicate<Role> =
  (key, value, obj) =>
    obj[key] &&
    typeof obj[key] === "number" &&
    // @ts-ignore
    0 == obj[key] % value;


const isNumericPropertyDividendOfProvidedValueObjectPredicate: ObjectPredicate<User> =
  ObjectPredicate.of((key, value, obj) =>
    obj[key] &&
    typeof obj[key] === "number" &&
    // @ts-ignore
    0 == obj[key] % value
  );


const isStringPropertyDifferentThanProvidedValueFObjectPredicate: FObjectPredicate<Role> =
  (key, value, obj) =>
    obj[key] &&
    typeof obj[key] === "string" &&
    obj[key] !== value;


const isStringPropertyDifferentThanProvidedValueObjectPredicate: ObjectPredicate<User> =
  ObjectPredicate.of((key, value, obj) =>
    obj[key] &&
    typeof obj[key] === "string" &&
    obj[key] !== value
  );
