import { ObjectUtil } from '@app-core/util';
import { FFunction0, Function0 } from '@app-core/type/function';
import { Optional } from '@app-core/type/functional';
import { FObjectPredicate, ObjectPredicate } from '@app-core/type/predicate';
import { expect } from 'vitest';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/object-util.spec.ts
 */
describe('ObjectUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new ObjectUtil()).toThrowError(SyntaxError);
    });

  });



  describe('coalesce', () => {

    it('when given valuesToVerify are null or undefined then undefined is returned', () => {
      expect(ObjectUtil.coalesce(null)).toBe(undefined);
      expect(ObjectUtil.coalesce(undefined)).toBe(undefined);
    });


    it('when given valuesToVerify only contains null or undefined values then undefined is returned', () => {
      let undefinedVariable;
      const nullVariable = null;

      expect(ObjectUtil.coalesce(null, undefined, null, undefined)).toBe(undefined);
      expect(ObjectUtil.coalesce(undefined, nullVariable, undefinedVariable, null)).toBe(undefined);
    });


    it('when given valuesToVerify contains a not null and not undefined values then first one is returned', () => {
      expect(ObjectUtil.coalesce(null, undefined, 12, undefined, 15)).toEqual(12);
      expect(ObjectUtil.coalesce(undefined, 15, null, 12)).toEqual(15);
    });

  });



  describe('coalesceOptional', () => {

    it('when given valuesToVerify are null or undefined then empty Optional is returned', () => {
      expect(ObjectUtil.coalesceOptional(null).isPresent()).toBe(false);
      expect(ObjectUtil.coalesceOptional(undefined).isPresent()).toBe(false);
    });


    it('when given valuesToVerify only contains null or undefined values then empty Optional is returned', () => {
      let undefinedVariable;
      const nullVariable = null;

      expect(ObjectUtil.coalesceOptional(null, undefined, null, undefined).isPresent()).toBe(false);
      expect(ObjectUtil.coalesceOptional(undefined, nullVariable, undefinedVariable, null).isPresent()).toBe(false);
    });


    it('when given valuesToVerify contains a not null and not undefined values then Optional with the first one is returned', () => {
      const optional1: Optional<number> = ObjectUtil.coalesceOptional(null, undefined, 12, undefined, 15);
      const optional2: Optional<number> = ObjectUtil.coalesceOptional(undefined, 15, null, 12);

      expect(optional1.isPresent()).toBe(true);
      expect(optional1.get()).toEqual(12);

      expect(optional2.isPresent()).toBe(true);
      expect(optional2.get()).toEqual(15);
    });

  });



  describe('compare', () => {

    it('when both values are null or undefined then 0 is returned', () => {
      expect(ObjectUtil.compare(undefined, undefined)).toBe(0);
      expect(ObjectUtil.compare(null, null)).toBe(0);
    });


    it('when one value is null and the other is undefined then 0 is returned', () => {
      expect(ObjectUtil.compare(null, undefined)).toBe(0);
      expect(ObjectUtil.compare(undefined, null)).toBe(0);
    });


    it('when comparing native values then expected result is returned', () => {
      expect(ObjectUtil.compare(1, 2)).toBe(-1);
      expect(ObjectUtil.compare(2, 1)).toBe(1);
      expect(ObjectUtil.compare(1, 1)).toBe(0);

      expect(ObjectUtil.compare('1', '2')).toBe(-1);
      expect(ObjectUtil.compare('2', '1')).toBe(1);
      expect(ObjectUtil.compare('1', '1')).toBe(0);

      expect(ObjectUtil.compare(true, false)).toBe(1);
      expect(ObjectUtil.compare(false, true)).toBe(-1);
      expect(ObjectUtil.compare(true, true)).toBe(0);
      expect(ObjectUtil.compare(false, false)).toBe(0);

      expect(ObjectUtil.compare(new Date("2026-06-22T14:30:00Z"), new Date("2026-06-20T10:30:00Z"))).toBe(187200000);
      expect(ObjectUtil.compare(new Date("2026-06-20T10:30:00Z"), new Date("2026-06-22T14:30:00Z"))).toBe(-187200000);
      expect(ObjectUtil.compare(new Date("2026-06-22T14:30:00Z"), new Date("2026-06-22T14:30:00Z"))).toBe(0);
    });


    it('when comparing arrays then expected result is returned', () => {
      expect(ObjectUtil.compare([1, 2], [2, 1])).toBe(-1);
      expect(ObjectUtil.compare([2, 1], [1, 2])).toBe(1);
      expect(ObjectUtil.compare([1, 5, 7, 9], [1, 5, 7, 9])).toBe(0);

      expect(ObjectUtil.compare(['1', '2'], ['2', '1'])).toBe(-1);
      expect(ObjectUtil.compare(['2', '1'], ['1', '2'])).toBe(1);
      expect(ObjectUtil.compare(['1', '5', '7', '9'], ['1', '5', '7', '9'])).toBe(0);
    });


    it('when comparing objects with compareTo method then the result of such method is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;

      const user1 = new User(10, 'user1', [role]);
      const user2 = new User(11, 'user2', [role]);
      const user3 = new User(10, 'user3', [role]);

      expect(ObjectUtil.compare(user1, user2)).toBe(-1);
      expect(ObjectUtil.compare(user2, user1)).toBe(1);

      expect(ObjectUtil.compare(user1, user3)).toBe(0);
      expect(ObjectUtil.compare(user3, user1)).toBe(0);
    });


    it('when comparing objects without compareTo method then verifies their equivalence based on their own', () => {
      const role1 = { id: 10, name: 'name1' } as Role;
      const role2 = { id: 11, name: 'name2' } as Role;
      const role3 = { id: 10, name: 'name1' } as Role;

      expect(ObjectUtil.compare(role1, role2)).toBe(-1);
      expect(ObjectUtil.compare(role2, role1)).toBe(1);

      expect(ObjectUtil.compare(role1, role3)).toBe(0);
      expect(ObjectUtil.compare(role3, role1)).toBe(0);
    });

  });



  describe('containsFunction', () => {

    it('when given inputToVerify are null or undefined then false is returned', () => {
      expect(ObjectUtil.containsFunction(null, 'equals')).toBe(false);
      expect(ObjectUtil.containsFunction(undefined, 'equals')).toBe(false);
    });


    it('when given inputToVerify is not an object then false is returned', () => {
      expect(ObjectUtil.containsFunction(1, 'equals')).toBe(false);
      expect(ObjectUtil.containsFunction("test string", 'equals')).toBe(false);
      expect(ObjectUtil.containsFunction(true, 'equals')).toBe(false);
    });


    it('when given inputToVerify is an object but does not contain provided functionToSearch then false is returned', () => {
      const role = { id: 10, name: 'role1 name' } as Role;
      const user = new User(10, 'user name', [role]);

      expect(ObjectUtil.containsFunction({}, 'equals')).toBe(false);
      expect(ObjectUtil.containsFunction(role, 'equals')).toBe(false);
      expect(ObjectUtil.containsFunction(user, 'notFoundFunction')).toBe(false);
    });


    it('when given inputToVerify is an object that contains functionToSearch but numberOfParameters does not match then false is returned', () => {
      const role = { id: 10, name: 'role1 name' } as Role;
      const user = new User(10, 'user name', [role]);

      expect(ObjectUtil.containsFunction(user, 'equals', 0)).toBe(false);
      expect(ObjectUtil.containsFunction(user, 'equals', 2)).toBe(false);
      expect(ObjectUtil.containsFunction(user, 'equals', 3)).toBe(false);
    });


    it('when given inputToVerify is an object that contains functionToSearch and numberOfParameters is not provided or matches with expected one then true is returned', () => {
      const role = { id: 10, name: 'role1 name' } as Role;
      const user = new User(10, 'user name', [role]);

      expect(ObjectUtil.containsFunction(user, 'equals')).toBe(true);
      expect(ObjectUtil.containsFunction(user, 'equals', 1)).toBe(true);
    });

  });



  describe('copy', () => {

    it('when given sourceObject is null or undefined then undefined is returned', () => {
      // @ts-ignore
      expect(ObjectUtil.copy(null)).toBe(undefined);
      // @ts-ignore
      expect(ObjectUtil.copy(undefined)).toBe(undefined);
    });


    it('when given sourceObject belonging to a native type is provided then a copy of it is returned.', () => {
      const numberValue = 12;
      const booleanValue = true;
      const stringValue = 'test';
      const tupleValue = [ numberValue, booleanValue, stringValue ];

      enum Color { Red, Green, Blue }
      const enumValue: Color = Color.Green;

      expect(ObjectUtil.copy(numberValue)).toBe(numberValue);
      expect(ObjectUtil.copy(booleanValue)).toBe(booleanValue);
      expect(ObjectUtil.copy(stringValue)).toBe(stringValue);
      expect(ObjectUtil.copy(enumValue)).toBe(enumValue);

      expect(ObjectUtil.copy(tupleValue)).not.toBe(tupleValue);
      expect(ObjectUtil.copy(tupleValue)).toStrictEqual(tupleValue);
    });


    it('when given sourceObject is an object then a copy of it is returned.', () => {
      const plainObject = {
        user: 'Juan',
        age: 36,
        active: true
      };
      const user = new User(10, 'user1', [ { id: 10, name: 'role name' } as Role ]);

      expect(ObjectUtil.copy(plainObject)).not.toBe(plainObject);
      expect(ObjectUtil.copy(plainObject)).toStrictEqual(plainObject);

      expect(ObjectUtil.copy(plainObject)).not.toBe(plainObject);
      expect(ObjectUtil.copy(user)).toStrictEqual(user);
    });


    it('when given sourceObject is an array then a copy of it is returned.', () => {
      const plainObject = {
        user: 'Juan',
        age: 36,
        active: true
      };
      const user = new User(10, 'user1', [ { id: 10, name: 'role name' } as Role ]);

      const nativeArray = [ 3, 5, 21, 7 ];
      const objectArray = [ plainObject, user ];

      expect(ObjectUtil.copy(nativeArray)).not.toBe(nativeArray);
      expect(ObjectUtil.copy(nativeArray)).toStrictEqual(nativeArray);

      expect(ObjectUtil.copy(objectArray)).not.toBe(objectArray);
      expect(ObjectUtil.copy(objectArray)).toStrictEqual(objectArray);
    });

  });



  describe('copyProperties', () => {

    it('when given sourceObject is null or undefined then undefined is returned', () => {
      // @ts-ignore
      expect(ObjectUtil.copyProperties(null, ['id'])).toBe(undefined);
      // @ts-ignore
      expect(ObjectUtil.copyProperties(undefined, ['id'])).toBe(undefined);
    });


    it('when given propertiesToCopy has no elements then undefined is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user name', [role]);

      expect(ObjectUtil.copyProperties(user, null)).toBe(undefined);
      expect(ObjectUtil.copyProperties(user, undefined)).toBe(undefined);
      expect(ObjectUtil.copyProperties(user, [])).toBe(undefined);
    });


    it('when given sourceObject does not contain provided propertiesToCopy then empty object is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user name', [role]);
      const userRaw = {
        name: 'CJ',
        age: 30,
        minimumScore: 10,
        city: 'Las Palmas',
        address: {
          street: 'León y Castillo 23'
        }
      };

      expect(ObjectUtil.copyProperties(role, ['notFound'])).toEqual({});
      expect(ObjectUtil.copyProperties(role, ['_id', '_name'])).toEqual({});

      expect(ObjectUtil.copyProperties(user, ['notFound'])).toEqual({});
      expect(ObjectUtil.copyProperties(user, ['id', 'name'])).toEqual({});

      expect(ObjectUtil.copyProperties(userRaw, ['notFound'])).toEqual({});
      expect(ObjectUtil.copyProperties(userRaw, ['ciudad', 'address.notFound'])).toEqual({});
    });


    it('when given sourceObject has Symbol properties and their description is part of provided propertiesToCopy then they are copied in the returned object', () => {
      const id = Symbol("id");
      const name = Symbol("name");
      const userRaw = {
        [id]: 123,
        [name]: 'CJ',
        age: 30
      };

      const result = ObjectUtil.copyProperties(userRaw, ["id", 'name']);

      expect(result).not.toBe(undefined);
      expect(result![id]).toBe(123);
      expect(result![name]).toBe('CJ');
      expect(Object.getOwnPropertySymbols(result)).toEqual([id, name]);
    });


    it('when given sourceObject has Symbol and string properties with the same name and their description is part of provided propertiesToCopy then string properties take precedence over Symbol ones in the returned object', () => {
      const id = Symbol("id");
      const userRaw = {
        id: 100,
        [id]: 200
      };

      const result = ObjectUtil.copyProperties(userRaw, ["id"]);

      expect(result).not.toBe(undefined);
      expect(result!.id).toBe(100);
      expect(result![id]).toBeUndefined();
    });


    it('when given sourceObject inherits from another class and propertiesToCopy includes property names from both the parent and child classes then the child class properties take precedence over the parent ones in the returned object', () => {
      class Parent {
        name = 'parent value';
        value = 100;
      }
      class Child extends Parent {
        id = 10;
        override value = 200;
      }

      const result = ObjectUtil.copyProperties(new Child(), ["id", "name", "value"]);

      expect(result).not.toBe(undefined);
      expect(result!.id).toBe(10);
      expect(result!.name).toBe('parent value');
      expect(result!.value).toBe(200);
    });


    it('when given sourceObject contains private properties and methods and propertiesToCopy includes both then only the properties are included in the returned object', () => {
      const role1 = { id: 10, name: 'role1 name' } as Role;
      const role2 = { id: 11, name: 'role2 name' } as Role;
      const user = new User(10, 'user name', [role1, role2]);

      const expectedResultWithIdAndName = {
        _id: user.id,
        _name: user.name
      };
      const expectedResultWithIdAndRoles = {
        _id: user.id,
        _roles: user.roles
      };

      expect(ObjectUtil.copyProperties(user, ['_id', '_name', 'equals'])).toEqual(expectedResultWithIdAndName);
      expect(ObjectUtil.copyProperties(user, ['_id', '_roles', 'hash'])).toEqual(expectedResultWithIdAndRoles);
    });


    it('when given sourceObject contains properties and methods and propertiesToCopy includes objects with methods then internal methods are included in the returned object', () => {
      const userRaw = {
        address: {
          city: "Las Palmas",
          country: "Spain",
          format() {
            return `${this.city}, ${this.country}`;
          }
        }
      };

      const result = ObjectUtil.copyProperties(
        userRaw,
        ["address"]
      );

      expect(result!.address).toBe(userRaw.address);
      expect((result!.address as typeof userRaw.address).format()).toBe("Las Palmas, Spain");
    });


    it('when given sourceObject contains data and propertiesToCopy includes nested properties then they are included in the returned object', () => {
      const userRaw = {
        address: {
          city: "Las Palmas",
          country: {
            name: "Spain",
            state: "Canarias"
          }
        }
      };

      const result = ObjectUtil.copyProperties(
        userRaw,
        ["address.country.name", 'address.country.state']
      );

      expect(result).toEqual({
        address: {
          country: {
            name: "Spain",
            state: "Canarias"
          }
        }
      });
    });


    it('when given sourceObject contains data and methods and propertiesToCopy includes nested properties then more specific paths take precedence in the returned object', () => {
      const userRaw = {
        address: {
          city: "Las Palmas",
          country: {
            name: "Spain",
            state: "Canarias"
          }
        }
      };

      const result = ObjectUtil.copyProperties(
        userRaw,
        ["address", "address.country", 'address.country.name']
      );

      expect(result).toEqual({
        address: {
          country: {
            name: "Spain"
          }
        }
      });
    });


    it('when given sourceObject contains data and several versions of propertiesToCopy are provided then the resulted object contains the same information', () => {
      const userRaw = {
        age: 30,
        address: {
          city: "Las Palmas",
          country: "Spain"
        }
      };

      const first = ObjectUtil.copyProperties(userRaw, ["address", "address.city"]);
      const second = ObjectUtil.copyProperties(userRaw, ["address.city", "address"]);

      expect(first).toEqual(second);
    });

  });



  describe('equals', () => {

    it('when both values are null or undefined then true is returned', () => {
      expect(ObjectUtil.equals(undefined, undefined)).toBe(true);
      expect(ObjectUtil.equals(null, null)).toBe(true);
    });


    it('when one value is null and the other is undefined then false is returned', () => {
      expect(ObjectUtil.equals(null, undefined)).toBe(false);
      expect(ObjectUtil.equals(undefined, null)).toBe(false);
    });


    it('when one of the provided values is null or undefined then false is returned', () => {
      let a, b;

      expect(ObjectUtil.equals(a, null)).toBe(false);
      expect(ObjectUtil.equals(null, b)).toBe(false);

      expect(ObjectUtil.equals(12, null)).toBe(false);
      expect(ObjectUtil.equals(null, 'test')).toBe(false);
    });


    it('when comparing native values then expected result is returned', () => {
      expect(ObjectUtil.equals(1, 2)).toBe(false);
      expect(ObjectUtil.equals(2, 1)).toBe(false);
      expect(ObjectUtil.equals(1, 1)).toBe(true);

      expect(ObjectUtil.equals('1', '2')).toBe(false);
      expect(ObjectUtil.equals('2', '1')).toBe(false);
      expect(ObjectUtil.equals('1', '1')).toBe(true);

      expect(ObjectUtil.equals(true, false)).toBe(false);
      expect(ObjectUtil.equals(false, true)).toBe(false);
      expect(ObjectUtil.equals(true, true)).toBe(true);
      expect(ObjectUtil.equals(false, false)).toBe(true);
    });


    it('when comparing arrays then expected result is returned', () => {
      expect(ObjectUtil.equals([1, 2], [2, 1])).toBe(false);
      expect(ObjectUtil.equals([2, 1, 3], [2, 3, 1])).toBe(false);
      expect(ObjectUtil.equals([1, 5, 7, 9], [1, 5, 7, 9])).toBe(true);

      expect(ObjectUtil.equals(['1', '2'], ['2', '1'])).toBe(false);
      expect(ObjectUtil.equals(['2', '1', '3'], ['2', '3', '1'])).toBe(false);
      expect(ObjectUtil.equals(['1', '5', '7', '9'], ['1', '5', '7', '9'])).toBe(true);
    });


    it('when comparing objects with equals method then the result of such method is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;

      const user1 = new User(10, 'user1', [role]);
      const user2 = new User(11, 'user2', [role]);
      const user3 = new User(10, 'user3', [role]);

      expect(ObjectUtil.equals(user1, user2)).toBe(false);
      expect(ObjectUtil.equals(user2, user1)).toBe(false);

      expect(ObjectUtil.equals(user1, user3)).toBe(true);
      expect(ObjectUtil.equals(user3, user1)).toBe(true);
    });


    it('when comparing objects without equals method then verifies their equivalence based on their own', () => {
      const role1 = { id: 10, name: 'name1' } as Role;
      const role2 = { id: 11, name: 'name2' } as Role;
      const role3 = { id: 10, name: 'name1' } as Role;

      expect(ObjectUtil.equals(role1, role2)).toBe(false);
      expect(ObjectUtil.equals(role2, role1)).toBe(false);

      expect(ObjectUtil.equals(role1, role3)).toBe(true);
      expect(ObjectUtil.equals(role3, role1)).toBe(true);
    });

  });



  describe('filterObject', () => {

    it('when sourceObject is null or undefined then an empty object is returned', () => {
      const expectedResult = {};

      expect(ObjectUtil.filterObject(null, ObjectPredicate.alwaysFalse())).toEqual(expectedResult);
      expect(ObjectUtil.filterObject(undefined, ObjectPredicate.alwaysFalse())).toEqual(expectedResult);
    });


    it('when sourceObject is defined but filterPredicate is null or undefined then a copy of sourceObject is returned', () => {
      const userRaw = {
        name: "Juan",
        age: 30,
        active: true,
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user1', [role]);

      expect(ObjectUtil.filterObject(userRaw, null)).toStrictEqual(userRaw);
      expect(ObjectUtil.filterObject(userRaw, undefined)).toStrictEqual(userRaw);

      expect(ObjectUtil.filterObject(role, null)).toStrictEqual(role);
      expect(ObjectUtil.filterObject(role, undefined)).toStrictEqual(role);

      expect(ObjectUtil.filterObject(user, null)).toStrictEqual(user);
      expect(ObjectUtil.filterObject(user, undefined)).toStrictEqual(user);
    });


    it('then returns an empty object when nothing matches', () => {
      const userRaw = {
        name: "Juan",
        age: 30,
        active: true,
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user1', [role]);

      const alwaysFalseFilter = () => false;

      expect(ObjectUtil.filterObject(userRaw, alwaysFalseFilter)).toEqual({ });
      expect(ObjectUtil.filterObject(role, alwaysFalseFilter)).toEqual({ });
      expect(ObjectUtil.filterObject(user, alwaysFalseFilter)).toEqual({ });
    });


    it('then returns all properties when everything matches', () => {
      const userRaw = {
        name: "Juan",
        age: 30,
        active: true,
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user1', [role]);

      const alwaysTrueFilter = () => true;

      expect(ObjectUtil.filterObject(userRaw, alwaysTrueFilter)).toEqual(userRaw);
      expect(ObjectUtil.filterObject(role, alwaysTrueFilter)).toEqual(role);
      expect(ObjectUtil.filterObject(user, alwaysTrueFilter)).toEqual(user);
    });


    it('when sourceObject and filterPredicate are defined and filterPredicate filters only by key then the expected result is returned', () => {
      const userRaw = {
        name: "Juan",
        age: 30,
        active: true,
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user 10', [role]);

      const isNamePropertyRaw =
        (key: any) =>
          key === "name";

      const isNamePropertyFObjectPredicate: FObjectPredicate<User> =
        (key: any) =>
          key === "_name";

      const isNamePropertyObjectPredicate: ObjectPredicate<Role> =
        ObjectPredicate.of(
          (key, value, obj) =>
            key === "name"
        );

      expect(ObjectUtil.filterObject(userRaw, isNamePropertyRaw)).toEqual({ name: "Juan" });
      expect(ObjectUtil.filterObject(role, isNamePropertyObjectPredicate)).toEqual({ name: "role name" });
      expect(ObjectUtil.filterObject(user, isNamePropertyFObjectPredicate)).toEqual({ _name: "user 10" });
    });


    it('when sourceObject and filterPredicate are defined and filterPredicate uses symbol key then the expected result is returned', () => {
      const id = Symbol("id");
      const userRaw = {
        name: "Juan",
        [id]: 123,
      };

      const result = ObjectUtil.filterObject(
        userRaw,
        (key: any) => key === id
      );

      expect(result[id]).toBe(123);
      expect(result).not.toHaveProperty("name");
    });



    it('when sourceObject and filterPredicate are defined and filterPredicate includes inherited properties then the expected result is returned', () => {
      class Parent {
        name = 'parent value';
        value = 100;
      }
      class Child extends Parent {
        id = 10;
        override value = 200;
      }
      const userPrototype = {
        role: "user",
        country: "Spain",
      };

      const child = new Child();
      const rawUser = Object.create(userPrototype);
      rawUser.name = "Juan";

      const resultTraditionalInherit = ObjectUtil.filterObject(
        child,
        (key: any, value: any) =>
          typeof value === "number"
      );
      const resultUserPrototype = ObjectUtil.filterObject(
        rawUser,
        () => true
      );

      expect(resultTraditionalInherit).toEqual({ id: 10, value: 200 });
      expect(resultUserPrototype).toEqual({ name: "Juan", role: "user", country: "Spain" });
    });


    it('when sourceObject and filterPredicate are defined and filterPredicate includes inherited symbol properties then the expected result is returned', () => {
      const metadata = Symbol("metadata");
      const prototype = {
        [metadata]: "admin",
      };

      const object: {
        name: string;
      } & typeof prototype = Object.create(prototype);

      object.name = "Juan";

      const result = ObjectUtil.filterObject(
        object,
        () => true
      );

      expect(result.name).toBe("Juan");
      expect(result[metadata]).toBe("admin");
    });


    it('when sourceObject and filterPredicate are defined then the result does not include non-enumerable inherited properties', () => {
      const prototype = {
        visible: "yes",
      };
      Object.defineProperty(prototype, "hidden", {
        value: "no",
        enumerable: false,
      });

      const object = Object.create(prototype);
      object.own = "yes";

      const result = ObjectUtil.filterObject(
        object,
        () => true
      );

      expect(result).toEqual({
        own: "yes",
        visible: "yes",
      });
    });


    it('when sourceObject and filterPredicate are defined then the result does not include non-enumerable own properties', () => {
      const object = {
        visible: "yes",
      };
      Object.defineProperty(object, "hidden", {
        value: "no",
        enumerable: false,
      });

      const result = ObjectUtil.filterObject(
        object,
        () => true
      );

      expect(result).toEqual({
        visible: "yes",
      });
    });


    it('when sourceObject and filterPredicate are defined and filterPredicate filters only by value then the expected result is returned', () => {
      const userRaw = {
        name: "Juan",
        age: 30,
        active: true,
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(11, 'user 11', [role]);

      const isValueNumericRaw =
        (key: any, value: any) =>
          typeof value === "number";

      const isValueNumericFObjectPredicate: FObjectPredicate<Role> =
        (_, value) =>
          typeof value === "number";

      const isValueNumericObjectPredicate: ObjectPredicate<User> =
        ObjectPredicate.of((_, value, obj) =>
          typeof value === "number"
        );

      expect(ObjectUtil.filterObject(userRaw, isValueNumericRaw)).toEqual({ age: 30 });
      expect(ObjectUtil.filterObject(role, isValueNumericFObjectPredicate)).toEqual({ id: 10 });
      expect(ObjectUtil.filterObject(user, isValueNumericObjectPredicate)).toEqual({ _id: 11 });
    });


    it('when sourceObject and filterPredicate are defined and filterPredicate filter null and undefined values then the expected result is returned', () => {
      const object = {
        a: null,
        b: undefined,
        c: "value",
      };

      const result = ObjectUtil.filterObject(
        object,
        (_, value: any) => value == null
      );
      expect(result).toEqual({ a: null, b: undefined });
    });


    it('when sourceObject and filterPredicate are defined and sourceObject contains object references then the result preserves object references in values', () => {
      const nested = {
        foo: "bar",
      };
      const object = {
        nested,
        value: 42,
      };

      const result = ObjectUtil.filterObject(
        object,
        () => true
      );

      expect(result.nested).toBe(nested);
    });


    it('when sourceObject and filterPredicate are defined and filterPredicate filters by key, value and current object then the expected result is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(11, 'user1', [role]);

      const filterByKeyValueAndObjectRaw =
        (key: any, value: any, object: any) =>
          key === "_id" &&
          typeof value === "number" &&
          value >= object.roles[0].id;

      const filterByKeyValueAndObjectFObjectPredicate: FObjectPredicate<Role> =
        (key, value, object) =>
          key === "id" &&
          typeof value === "number" &&
          value >= 10;

      const filterByKeyValueAndObjectObjectPredicate: ObjectPredicate<User> =
        ObjectPredicate.of(
          (key, value, object) =>
            key === "id" &&
            typeof value === "number" &&
            value >= object.roles[0].id
        );

      expect(ObjectUtil.filterObject(role, filterByKeyValueAndObjectFObjectPredicate)).toEqual({ id: 10 });
      expect(ObjectUtil.filterObject(user, filterByKeyValueAndObjectRaw)).toEqual({ _id: 11 });
      expect(ObjectUtil.filterObject(user, filterByKeyValueAndObjectObjectPredicate)).toEqual({ });
    });

  });



  describe('getOrElse', () => {

    it('when valueToVerify is neither null nor undefined then such one is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      const stringSupplier: Function0<string> = Function0.of(() => 'yxz');

      const getOrElseIntResult = ObjectUtil.getOrElse(intValue, 14);
      const getOrElseStringResult = ObjectUtil.getOrElse(stringValue, stringSupplier);

      expect(getOrElseIntResult).toEqual(intValue);
      expect(getOrElseStringResult).toEqual(stringValue);
    });


    it('when valueToVerify is null or undefined and defaultValue is a value then defaultValue is returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const getOrElseIntResult = ObjectUtil.getOrElse<number>(undefined, otherIntValue);
      const getOrElseStringResult = ObjectUtil.getOrElse<string>(null, otherStringValue);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });


    it('when valueToVerify is null or undefined and defaultValue is a TFunction0 then defaultValue is returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const otherIntFunc: FFunction0<number> = () => otherIntValue;
      const otherStringFunc: Function0<string> = Function0.of(() => otherStringValue);

      const getOrElseIntResult = ObjectUtil.getOrElse<number>(undefined, otherIntFunc);
      const getOrElseStringResult = ObjectUtil.getOrElse<string>(null, otherStringFunc);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });

  });



  describe('getPropertyValue', () => {

    it('when given sourceObject or path are null or undefined then undefined is returned', () => {
      expect(ObjectUtil.getPropertyValue(null, 'DoesNotCare')).toBe(undefined);
      expect(ObjectUtil.getPropertyValue(undefined, "DoesNotCare")).toBe(undefined);

      expect(ObjectUtil.getPropertyValue({}, null)).toBe(undefined);
      expect(ObjectUtil.getPropertyValue({}, undefined)).toBe(undefined);
    });


    it('when given sourceObject is valid but does not contain provided path then undefined is returned', () => {
      const userRaw = {
        profile: {
          name: 'John'
        }
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user1', [role]);

      expect(ObjectUtil.getPropertyValue(userRaw, 'NotFound')).toBe(undefined);
      expect(ObjectUtil.getPropertyValue(userRaw, 'profile.id')).toBe(undefined);

      expect(ObjectUtil.getPropertyValue(role, 'NotFound')).toBe(undefined);
      expect(ObjectUtil.getPropertyValue(role, 'profile.id')).toBe(undefined);

      expect(ObjectUtil.getPropertyValue(user, 'NotFound')).toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, 'profile.id')).toBe(undefined);
    });


    it('when given sourceObject is valid but path is an existing function then undefined is returned', () => {
      const userRaw = {
        profile: {
          name: 'John'
        }
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user1', [role]);

      expect(ObjectUtil.getPropertyValue(userRaw, 'toString')).toBe(undefined);

      expect(ObjectUtil.getPropertyValue(user, 'compareTo')).toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, 'equals')).toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, 'has')).toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, 'toString')).toBe(undefined);
    });


    it('when given sourceObject is valid and path exists and does not belong to a function then stored value is returned', () => {
      const userRaw = {
        profile: {
          name: 'John'
        }
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user1', [role]);

      expect(ObjectUtil.getPropertyValue(userRaw, 'profile.name')).not.toBe(undefined);
      expect(ObjectUtil.getPropertyValue(userRaw, 'profile.name')).toBe(userRaw.profile.name);

      expect(ObjectUtil.getPropertyValue(role, 'id')).not.toBe(undefined);
      expect(ObjectUtil.getPropertyValue(role, 'id')).toBe(role.id);
      expect(ObjectUtil.getPropertyValue(role, 'name')).not.toBe(undefined);
      expect(ObjectUtil.getPropertyValue(role, 'name')).toBe(role.name);

      expect(ObjectUtil.getPropertyValue(user, 'id')).not.toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, 'id')).toBe(user.id);
      expect(ObjectUtil.getPropertyValue(user, '_id')).not.toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, '_id')).toBe(user.id);
      expect(ObjectUtil.getPropertyValue(user, 'name')).not.toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, 'name')).toBe(user.name);
      expect(ObjectUtil.getPropertyValue(user, '_name')).not.toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, '_name')).toBe(user.name);
      expect(ObjectUtil.getPropertyValue(user, 'roles')).not.toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, 'roles')).toBe(user.roles);
      expect(ObjectUtil.getPropertyValue(user, '_roles')).not.toBe(undefined);
      expect(ObjectUtil.getPropertyValue(user, '_roles')).toBe(user.roles);
    });

  });



  describe('hash', () => {

    it('when input is null or undefined then 0 is returned', () => {
      expect(ObjectUtil.hash(null)).toBe(0);
      expect(ObjectUtil.hash(undefined)).toBe(0);
    });


    it('when input is not an object then a custom hash value based on its JSON representation is returned', () => {
      expect(ObjectUtil.hash(123)).toBe(48690);
      expect(ObjectUtil.hash('abc')).toBe(34386722);
      expect(ObjectUtil.hash(true)).toBe(3569038);
    });


    it('when input is an object that defines hash method then the result of such method is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;

      const user1 = new User(10, 'user1', [role]);
      const user2 = new User(11, 'user2', [role]);
      const user3 = new User(12, 'user3', [role]);

      expect(ObjectUtil.hash(user1)).toBe(user1.id);
      expect(ObjectUtil.hash(user2)).toBe(user2.id);
      expect(ObjectUtil.hash(user3)).toBe(user3.id);
    });


    it('when input is an object that does not define hash method then a custom hash value based on its JSON representation is returned', () => {
      const role1 = { id: 10, name: 'name1' } as Role;
      const role2 = { id: 11, name: 'name2' } as Role;
      const role3 = { id: 12, name: 'name3' } as Role;

      expect(ObjectUtil.hash(role1)).toBe(-2053073999);
      expect(ObjectUtil.hash(role2)).toBe(-699763341);
      expect(ObjectUtil.hash(role3)).toBe(653547317);
    });

  });



  describe('hasPath', () => {

    it('when given sourceObject or path are null or undefined then false is returned', () => {
      expect(ObjectUtil.hasPath(null, 'DoesNotCare')).toBe(false);
      expect(ObjectUtil.hasPath(undefined, "DoesNotCare")).toBe(false);

      expect(ObjectUtil.hasPath({}, null)).toBe(false);
      expect(ObjectUtil.hasPath({}, undefined)).toBe(false);
    });


    it('when given sourceObject is valid but does not contain provided path then false is returned', () => {
      const userRaw = {
        profile: {
          name: 'John'
        }
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user1', [role]);

      expect(ObjectUtil.hasPath(userRaw, 'NotFound')).toBe(false);
      expect(ObjectUtil.hasPath(userRaw, 'profile.id')).toBe(false);

      expect(ObjectUtil.hasPath(role, 'NotFound')).toBe(false);
      expect(ObjectUtil.hasPath(role, 'profile.id')).toBe(false);

      expect(ObjectUtil.hasPath(user, 'NotFound')).toBe(false);
      expect(ObjectUtil.hasPath(user, 'profile.id')).toBe(false);
    });


    it('when given sourceObject is valid and path exists then true is returned', () => {
      const userRaw = {
        profile: {
          name: 'John'
        }
      };
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user1', [role]);

      expect(ObjectUtil.hasPath(userRaw, 'profile.name')).toBe(true);
      expect(ObjectUtil.hasPath(userRaw, 'toString')).toBe(true);

      expect(ObjectUtil.hasPath(role, 'id')).toBe(true);
      expect(ObjectUtil.hasPath(role, 'name')).toBe(true);
      expect(ObjectUtil.hasPath(role, 'toString')).toBe(true);

      expect(ObjectUtil.hasPath(user, 'id')).toBe(true);
      expect(ObjectUtil.hasPath(user, '_id')).toBe(true);
      expect(ObjectUtil.hasPath(user, 'name')).toBe(true);
      expect(ObjectUtil.hasPath(user, '_name')).toBe(true);
      expect(ObjectUtil.hasPath(user, 'roles')).toBe(true);
      expect(ObjectUtil.hasPath(user, '_roles')).toBe(true);
      expect(ObjectUtil.hasPath(user, 'toString')).toBe(true);
    });

  });



  describe('isNullOrUndefined', () => {

    it('when valueToVerify is null or undefined then true is returned', () => {
      let undefinedVariable;
      let nullVariable = null;

      expect(ObjectUtil.isNullOrUndefined(undefined)).toBe(true);
      expect(ObjectUtil.isNullOrUndefined(null)).toBe(true);
      expect(ObjectUtil.isNullOrUndefined(undefinedVariable)).toBe(true);
      expect(ObjectUtil.isNullOrUndefined(nullVariable)).toBe(true);
    });


    it('when valueToVerify is neither null nor undefined then false is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(ObjectUtil.isNullOrUndefined(true)).toBe(false);
      expect(ObjectUtil.isNullOrUndefined(intValue)).toBe(false);
      expect(ObjectUtil.isNullOrUndefined(stringValue)).toBe(false);
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when valueToVerify is null or undefined then false is returned', () => {
      let undefinedVariable;
      let nullVariable = null;

      expect(ObjectUtil.nonNullOrUndefined(undefined)).toBe(false);
      expect(ObjectUtil.nonNullOrUndefined(null)).toBe(false);
      expect(ObjectUtil.nonNullOrUndefined(undefinedVariable)).toBe(false);
      expect(ObjectUtil.nonNullOrUndefined(nullVariable)).toBe(false);
    });


    it('when valueToVerify is neither null nor undefined then true is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(ObjectUtil.nonNullOrUndefined(true)).toBe(true);
      expect(ObjectUtil.nonNullOrUndefined(intValue)).toBe(true);
      expect(ObjectUtil.nonNullOrUndefined(stringValue)).toBe(true);
    });

  });


  describe('sortProperties', () => {

    it('when given sourceObject is null or undefined then undefined is returned', () => {
      expect(ObjectUtil.sortProperties(null)).toBe(undefined);
      expect(ObjectUtil.sortProperties(undefined)).toBe(undefined);
    });


    it('when given sourceObject is not an object then it is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(ObjectUtil.sortProperties(intValue)).toEqual(intValue);
      expect(ObjectUtil.sortProperties(stringValue)).toEqual(stringValue);
    });


    it('when given sourceObject is an object then a copy with its properties sorted is returned', () => {
      const rawObject1 = {
        c: 1,
        a: '2',
        b: false
      };
      const rawObject2 = {
        b: 1,
        a: '2',
        h: {
          z: 11,
          a: 'ea',
          c: {
            f: false,
            d: '123'
          }
        }
      };
      const expectedJsonRawObject1 = '{"a":"2","b":false,"c":1}';
      const expectedJsonRawObject2 = '{"a":"2","b":1,"h":{"a":"ea","c":{"d":"123","f":false},"z":11}}';

      const resultTawObject1 = ObjectUtil.sortProperties(rawObject1);
      expect(JSON.stringify(resultTawObject1)).toEqual(expectedJsonRawObject1);

      const resultTawObject2 = ObjectUtil.sortProperties(rawObject2);
      expect(JSON.stringify(resultTawObject2)).toEqual(expectedJsonRawObject2);
    });

  });

});



// Used only for testing purpose
class User {
  private _id: number;
  private _name: string;
  private _roles: Role[];


  constructor(id: number, name: string, roles: Role[]) {
    this._id = id;
    this._name = name;
    this._roles = roles;
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

  get roles(): Role[] {
    return this._roles;
  }
  set roles(roles: Role[]) {
    this._roles = roles;
  }

  equals = (other?: User | null): boolean =>
    ObjectUtil.isNullOrUndefined(other)
      ? false
      : this.id === other.id;

  hash = (): number =>
    this.id;

  compareTo = (other?: User | null): number =>
    ObjectUtil.isNullOrUndefined(other)
      ? 1
      : this.id - other.id;

}


interface Role {
  id: number;
  name: string;
}
