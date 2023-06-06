import { ObjectUtil } from '@app-core/util';
import { FFunction0, Function0 } from '@app-core/types';
import * as _ from 'lodash';

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



  describe('equals', () => {

    it('when both values are null or undefined then true is be returned', () => {
      expect(ObjectUtil.equals(undefined, undefined)).toBeTrue();
      expect(ObjectUtil.equals(null, null)).toBeTrue();
    });


    it('when one of the provided values is null or undefined then false will be returned', () => {
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


    it('when comparing objects with equals method then the result of such method is returned', () => {
      const user1 = new User(10, 'user1');
      const user2 = new User(11, 'user2');
      const user3 = new User(10, 'user3');

      expect(ObjectUtil.equals(user1, user2)).toBeFalse();
      expect(ObjectUtil.equals(user2, user1)).toBeFalse();

      expect(ObjectUtil.equals(user1, user3)).toBeTrue();
      expect(ObjectUtil.equals(user3, user1)).toBeTrue();
    });


    it('when comparing objects without equals method then verifies their equivalence based on their own', () => {
      const role1 = { id: 10, description: 'description1' } as Role;
      const role2 = { id: 11, description: 'description2' } as Role;
      const role3 = { id: 10, description: 'description1' } as Role;

      expect(ObjectUtil.equals(role1, role2)).toBeFalse();
      expect(ObjectUtil.equals(role2, role1)).toBeFalse();

      expect(ObjectUtil.equals(role1, role3)).toBeTrue();
      expect(ObjectUtil.equals(role3, role1)).toBeTrue();
    });

  });



  describe('getOrElse', () => {

    it('when valueToVerify is neither null not undefined then such one is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      const stringSupplier: Function0<string> = Function0.of(() => 'yxz');

      const getOrElseIntResult = ObjectUtil.getOrElse(intValue, 14);
      const getOrElseStringResult = ObjectUtil.getOrElse(stringValue, stringSupplier);

      expect(getOrElseIntResult).toEqual(intValue);
      expect(getOrElseStringResult).toEqual(stringValue);
    });


    it('when valueToVerify is null or undefined and defaultValue is a value then defaultValue will be returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const getOrElseIntResult = ObjectUtil.getOrElse<number>(undefined, otherIntValue);
      const getOrElseStringResult = ObjectUtil.getOrElse<string>(null, otherStringValue);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });


    it('when valueToVerify is null or undefined and defaultValue is a TFunction0 then defaultValue will be returned', () => {
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



  describe('rawEquals', () => {

    it('when both values are null or undefined then true is be returned', () => {
      expect(ObjectUtil.rawEquals(undefined, undefined)).toBeTrue();
      expect(ObjectUtil.rawEquals(null, null)).toBeTrue();
    });


    it('when one of the provided values is null or undefined then false will be returned', () => {
      let a, b;

      expect(ObjectUtil.rawEquals(a, null)).toBeFalse();
      expect(ObjectUtil.rawEquals(null, b)).toBeFalse();

      expect(ObjectUtil.rawEquals(12, null)).toBeFalse();
      expect(ObjectUtil.rawEquals(null, 'test')).toBeFalse();
    });


    it('when comparing native values then expected result is returned', () => {
      expect(ObjectUtil.rawEquals(1, 2)).toBeFalse();
      expect(ObjectUtil.rawEquals(2, 1)).toBeFalse();
      expect(ObjectUtil.rawEquals(1, 1)).toBeTrue();

      expect(ObjectUtil.rawEquals('1', '2')).toBeFalse();
      expect(ObjectUtil.rawEquals('2', '1')).toBeFalse();
      expect(ObjectUtil.rawEquals('1', '1')).toBeTrue();

      expect(ObjectUtil.rawEquals(true, false)).toBeFalse();
      expect(ObjectUtil.rawEquals(false, true)).toBeFalse();
      expect(ObjectUtil.rawEquals(true, true)).toBeTrue();
    });


    it('when comparing objects then they are compared by their own', () => {
      const user1 = new User(10, 'description1');
      const user2 = new User(11, 'description2');
      const user3 = new User(10, 'description1');

      const role1 = { id: 10, description: 'description1' } as Role;
      const role2 = { id: 11, description: 'description2' } as Role;
      const role3 = { id: 10, description: 'description1' } as Role;

      const rawRole1 = { id: 10, description: 'description1' };

      expect(ObjectUtil.rawEquals(user1, user2)).toBeFalse();
      expect(ObjectUtil.rawEquals(user2, user1)).toBeFalse();

      expect(ObjectUtil.rawEquals(role1, role2)).toBeFalse();
      expect(ObjectUtil.rawEquals(role2, role1)).toBeFalse();

      // IMPORTANT: This is because User's properties are not public
      expect(ObjectUtil.rawEquals(user1, user3)).toBeFalse();
      expect(ObjectUtil.rawEquals(user3, user1)).toBeFalse();

      expect(ObjectUtil.rawEquals(role1, role3)).toBeTrue();
      expect(ObjectUtil.rawEquals(role3, role1)).toBeTrue();

      expect(ObjectUtil.rawEquals(rawRole1, role1)).toBeTrue();
      expect(ObjectUtil.rawEquals(role1, rawRole1)).toBeTrue();
    });

  });




  // Used only for testing purpose
  class User {
    private _id: number;
    private _description: string;

    constructor(id: number, description: string) {
      this._id = id;
      this._description = description;
    }

    get id(): number {
      return this._id;
    }
    set id(id: number) {
      this._id = id;
    }

    get description(): string {
      return this._description;
    }
    set description(description: string) {
      this._description = description;
    }

    equals = (other?: User | null): boolean =>
      _.isNil(other)
        ? false
        : this.id === other.id;
  }


  interface Role {
    id: number;
    description: string;
  }

});
