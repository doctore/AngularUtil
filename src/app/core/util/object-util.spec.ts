import { ObjectUtil } from '@app-core/util';
import { FFunction0, Function0 } from '@app-core/type/function';
import { Optional } from '@app-core/type/functional';

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


    it('when given sourceObject and propertiesToCopy are valid then a new object containing required properties of sourceObject is returned', () => {
      const role1 = { id: 10, name: 'role1 name' } as Role;
      const role2 = { id: 11, name: 'role2 name' } as Role;
      const user = new User(10, 'user name', [role1, role2]);

      const expectedWithIdAndName = {
        id: user.id,
        name: user.name
      };
      const expectedWithIdAndRoles = {
        id: user.id,
        roles: user.roles
      };

      expect(ObjectUtil.copyProperties(user, ['id', 'name'])).toEqual(expectedWithIdAndName);
      expect(ObjectUtil.copyProperties(user, ['id', 'roles'])).toEqual(expectedWithIdAndRoles);
    });

  });



  describe('copyPropertiesOptional', () => {

    it('when given sourceObject is null or undefined then empty Optional is returned', () => {
      // @ts-ignore
      expect(ObjectUtil.copyPropertiesOptional(null, ['id']).isPresent()).toBe(false);
      // @ts-ignore
      expect(ObjectUtil.copyPropertiesOptional(undefined, ['id']).isPresent()).toBe(false);
    });


    it('when given propertiesToCopy has no elements then empty Optional is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user name', [role]);

      expect(ObjectUtil.copyPropertiesOptional(user, null).isPresent()).toBe(false);
      expect(ObjectUtil.copyPropertiesOptional(user, undefined).isPresent()).toBe(false);
      expect(ObjectUtil.copyPropertiesOptional(user, []).isPresent()).toBe(false);
    });


    it('when given sourceObject and propertiesToCopy are valid then an Optional with a new object containing required properties of sourceObject is returned', () => {
      const role1 = { id: 10, name: 'role1 name' } as Role;
      const role2 = { id: 11, name: 'role2 name' } as Role;
      const user = new User(10, 'user name', [role1, role2]);

      const expectedWithIdAndName = {
        id: user.id,
        name: user.name
      };
      const expectedWithIdAndRoles = {
        id: user.id,
        roles: user.roles
      };

      const resultWithIdAndName = ObjectUtil.copyPropertiesOptional(user, ['id', 'name']);
      expect(resultWithIdAndName.isPresent()).toBe(true);
      expect(resultWithIdAndName.get()).toEqual(expectedWithIdAndName);

      const resultWithIdAndRoles = ObjectUtil.copyPropertiesOptional(user, ['id', 'roles']);
      expect(resultWithIdAndRoles.isPresent()).toBe(true);
      expect(resultWithIdAndRoles.get()).toEqual(expectedWithIdAndRoles);
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


  describe('sortObjectProperties', () => {

    it('when given sourceObject is null or undefined then undefined is returned', () => {
      expect(ObjectUtil.sortObjectProperties(null)).toBe(undefined);
      expect(ObjectUtil.sortObjectProperties(undefined)).toBe(undefined);
    });


    it('when given sourceObject is not an object then it is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(ObjectUtil.sortObjectProperties(intValue)).toEqual(intValue);
      expect(ObjectUtil.sortObjectProperties(stringValue)).toEqual(stringValue);
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

      const resultTawObject1 = ObjectUtil.sortObjectProperties(rawObject1);
      expect(JSON.stringify(resultTawObject1)).toEqual(expectedJsonRawObject1);

      const resultTawObject2 = ObjectUtil.sortObjectProperties(rawObject2);
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

}


interface Role {
  id: number;
  name: string;
}
