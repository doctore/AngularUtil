import { ObjectUtil } from '@app-core/util';
import { FFunction0, Function0 } from '@app-core/types/function';
import { Optional } from '@app-core/types/functional';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/object.util.spec.ts
 */
describe('ObjectUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new ObjectUtil()).toThrowError(SyntaxError);
    });

  });



  describe('coalesce', () => {

    it('when given valuesToVerify are null or undefined then undefined is returned', () => {
      expect(ObjectUtil.coalesce(null)).toBeUndefined();
      expect(ObjectUtil.coalesce(undefined)).toBeUndefined();
    });


    it('when given valuesToVerify only contains null or undefined values then undefined is returned', () => {
      let undefinedVariable;
      const nullVariable = null;

      expect(ObjectUtil.coalesce(null, undefined, null, undefined)).toBeUndefined();
      expect(ObjectUtil.coalesce(undefined, nullVariable, undefinedVariable, null)).toBeUndefined();
    });


    it('when given valuesToVerify contains a not null and not undefined values then first one is returned', () => {
      expect(ObjectUtil.coalesce(null, undefined, 12, undefined, 15)).toEqual(12);
      expect(ObjectUtil.coalesce(undefined, 15, null, 12)).toEqual(15);
    });

  });



  describe('coalesceOptional', () => {

    it('when given valuesToVerify are null or undefined then empty Optional is returned', () => {
      expect(ObjectUtil.coalesceOptional(null).isPresent()).toBeFalse();
      expect(ObjectUtil.coalesceOptional(undefined).isPresent()).toBeFalse();
    });


    it('when given valuesToVerify only contains null or undefined values then empty Optional is returned', () => {
      let undefinedVariable;
      const nullVariable = null;

      expect(ObjectUtil.coalesceOptional(null, undefined, null, undefined).isPresent()).toBeFalse();
      expect(ObjectUtil.coalesceOptional(undefined, nullVariable, undefinedVariable, null).isPresent()).toBeFalse();
    });


    it('when given valuesToVerify contains a not null and not undefined values then Optional with the first one is returned', () => {
      const optional1: Optional<number> = ObjectUtil.coalesceOptional(null, undefined, 12, undefined, 15);
      const optional2: Optional<number> = ObjectUtil.coalesceOptional(undefined, 15, null, 12);

      expect(optional1.isPresent()).toBeTrue();
      expect(optional1.get()).toEqual(12);

      expect(optional2.isPresent()).toBeTrue();
      expect(optional2.get()).toEqual(15);
    });

  });



  describe('copyProperties', () => {

    it('when given sourceObject is null or undefined then undefined is returned', () => {
      // @ts-ignore
      expect(ObjectUtil.copyProperties(null, 'id')).toBeUndefined();
      // @ts-ignore
      expect(ObjectUtil.copyProperties(undefined, 'id')).toBeUndefined();
    });


    it('when given propertiesToCopy has no elements then undefined is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user name', [role]);

      expect(ObjectUtil.copyProperties(user, null)).toBeUndefined();
      expect(ObjectUtil.copyProperties(user, undefined)).toBeUndefined();
      expect(ObjectUtil.copyProperties(user)).toBeUndefined();
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

      expect(ObjectUtil.copyProperties(user, 'id', 'name')).toEqual(expectedWithIdAndName);
      expect(ObjectUtil.copyProperties(user, 'id', 'roles')).toEqual(expectedWithIdAndRoles);
    });

  });



  describe('copyPropertiesOptional', () => {

    it('when given sourceObject is null or undefined then empty Optional is returned', () => {
      // @ts-ignore
      expect(ObjectUtil.copyPropertiesOptional(null, 'id').isPresent()).toBeFalse();
      // @ts-ignore
      expect(ObjectUtil.copyPropertiesOptional(undefined, 'id').isPresent()).toBeFalse();
    });


    it('when given propertiesToCopy has no elements then empty Optional is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;
      const user = new User(10, 'user name', [role]);

      expect(ObjectUtil.copyPropertiesOptional(user, null).isPresent()).toBeFalse();
      expect(ObjectUtil.copyPropertiesOptional(user, undefined).isPresent()).toBeFalse();
      expect(ObjectUtil.copyPropertiesOptional(user).isPresent()).toBeFalse();
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

      const resultWithIdAndName = ObjectUtil.copyPropertiesOptional(user, 'id', 'name');
      expect(resultWithIdAndName.isPresent()).toBeTrue();
      expect(resultWithIdAndName.get()).toEqual(expectedWithIdAndName);

      const resultWithIdAndRoles = ObjectUtil.copyPropertiesOptional(user, 'id', 'roles');
      expect(resultWithIdAndRoles.isPresent()).toBeTrue();
      expect(resultWithIdAndRoles.get()).toEqual(expectedWithIdAndRoles);
    });

  });



  describe('equals', () => {

    it('when both values are null or undefined then true is returned', () => {
      expect(ObjectUtil.equals(undefined, undefined)).toBeTrue();
      expect(ObjectUtil.equals(null, null)).toBeTrue();
    });


    it('when one value is null and the other is undefined then false is returned', () => {
      expect(ObjectUtil.equals(null, undefined)).toBeFalse();
      expect(ObjectUtil.equals(undefined, null)).toBeFalse();
    });


    it('when one of the provided values is null or undefined then false is returned', () => {
      let a, b;

      expect(ObjectUtil.equals(a, null)).toBeFalse();
      expect(ObjectUtil.equals(null, b)).toBeFalse();

      expect(ObjectUtil.equals(12, null)).toBeFalse();
      expect(ObjectUtil.equals(null, 'test')).toBeFalse();
    });


    it('when comparing native values then expected result is returned', () => {
      expect(ObjectUtil.equals(1, 2)).toBeFalse();
      expect(ObjectUtil.equals(2, 1)).toBeFalse();
      expect(ObjectUtil.equals(1, 1)).toBeTrue();

      expect(ObjectUtil.equals('1', '2')).toBeFalse();
      expect(ObjectUtil.equals('2', '1')).toBeFalse();
      expect(ObjectUtil.equals('1', '1')).toBeTrue();

      expect(ObjectUtil.equals(true, false)).toBeFalse();
      expect(ObjectUtil.equals(false, true)).toBeFalse();
      expect(ObjectUtil.equals(true, true)).toBeTrue();
    });


    it('when comparing arrays then expected result is returned', () => {
      expect(ObjectUtil.equals([1, 2], [2, 1])).toBeFalse();
      expect(ObjectUtil.equals([2, 1, 3], [2, 3, 1])).toBeFalse();
      expect(ObjectUtil.equals([1, 5, 7, 9], [1, 5, 7, 9])).toBeTrue();

      expect(ObjectUtil.equals(['1', '2'], ['2', '1'])).toBeFalse();
      expect(ObjectUtil.equals(['2', '1', '3'], ['2', '3', '1'])).toBeFalse();
      expect(ObjectUtil.equals(['1', '5', '7', '9'], ['1', '5', '7', '9'])).toBeTrue();
    });


    it('when comparing objects with equals method then the result of such method is returned', () => {
      const role = { id: 10, name: 'role name' } as Role;

      const user1 = new User(10, 'user1', [role]);
      const user2 = new User(11, 'user2', [role]);
      const user3 = new User(10, 'user3', [role]);

      expect(ObjectUtil.equals(user1, user2)).toBeFalse();
      expect(ObjectUtil.equals(user2, user1)).toBeFalse();

      expect(ObjectUtil.equals(user1, user3)).toBeTrue();
      expect(ObjectUtil.equals(user3, user1)).toBeTrue();
    });


    it('when comparing objects without equals method then verifies their equivalence based on their own', () => {
      const role1 = { id: 10, name: 'name1' } as Role;
      const role2 = { id: 11, name: 'name2' } as Role;
      const role3 = { id: 10, name: 'name1' } as Role;

      expect(ObjectUtil.equals(role1, role2)).toBeFalse();
      expect(ObjectUtil.equals(role2, role1)).toBeFalse();

      expect(ObjectUtil.equals(role1, role3)).toBeTrue();
      expect(ObjectUtil.equals(role3, role1)).toBeTrue();
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



  describe('isNullOrUndefined', () => {

    it('when valueToVerify is null or undefined then true is returned', () => {
      let undefinedVariable;
      let nullVariable = null;

      expect(ObjectUtil.isNullOrUndefined(undefined)).toBeTrue();
      expect(ObjectUtil.isNullOrUndefined(null)).toBeTrue();
      expect(ObjectUtil.isNullOrUndefined(undefinedVariable)).toBeTrue();
      expect(ObjectUtil.isNullOrUndefined(nullVariable)).toBeTrue();
    });


    it('when valueToVerify is neither null nor undefined then false is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(ObjectUtil.isNullOrUndefined(true)).toBeFalse();
      expect(ObjectUtil.isNullOrUndefined(intValue)).toBeFalse();
      expect(ObjectUtil.isNullOrUndefined(stringValue)).toBeFalse();
    });

  });



  describe('nonNullOrUndefined', () => {

    it('when valueToVerify is null or undefined then false is returned', () => {
      let undefinedVariable;
      let nullVariable = null;

      expect(ObjectUtil.nonNullOrUndefined(undefined)).toBeFalse();
      expect(ObjectUtil.nonNullOrUndefined(null)).toBeFalse();
      expect(ObjectUtil.nonNullOrUndefined(undefinedVariable)).toBeFalse();
      expect(ObjectUtil.nonNullOrUndefined(nullVariable)).toBeFalse();
    });


    it('when valueToVerify is neither null nor undefined then true is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(ObjectUtil.nonNullOrUndefined(true)).toBeTrue();
      expect(ObjectUtil.nonNullOrUndefined(intValue)).toBeTrue();
      expect(ObjectUtil.nonNullOrUndefined(stringValue)).toBeTrue();
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
}


interface Role {
  id: number;
  name: string;
}
