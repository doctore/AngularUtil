import { FFunction0, Function0, Optional, PObject } from '@app-core/types';
import { IllegalArgumentError } from '@app-core/errors';
import * as _ from "lodash";

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/optional.type.spec.ts
 */
describe('Optional', () => {


  describe('empty', () => {

    it('then an Optional with no value is given', () => {
      expect(Optional.empty().isPresent()).toBeFalse();
    });

  });



  describe('equals', () => {

    it('when comparing empty Optionals then false is returned', () => {
      expect(Optional.empty().equals(Optional.empty())).toBeTrue();
    });


    it('when comparing empty and not empty Optionals then false is returned', () => {
      const intValue = 10;
      const stringValue = 'ForTestPurpose';
      const user = new User(10, 'user1');
      const address = new Address(20, 'address1');
      const role = { id: 30, description: 'role1' } as Role;

      expect(Optional.empty().equals(Optional.of(intValue))).toBeFalse()
      expect(Optional.of(intValue).equals(Optional.empty())).toBeFalse();

      expect(Optional.empty().equals(Optional.of(stringValue))).toBeFalse();
      expect(Optional.of(stringValue).equals(Optional.empty())).toBeFalse();

      expect(Optional.empty().equals(Optional.of(user))).toBeFalse();
      expect(Optional.of(user).equals(Optional.empty())).toBeFalse();

      expect(Optional.empty().equals(Optional.of(address))).toBeFalse();
      expect(Optional.of(address).equals(Optional.empty())).toBeFalse();

      expect(Optional.empty().equals(Optional.of(role))).toBeFalse();
      expect(Optional.of(role).equals(Optional.empty())).toBeFalse();
    });


    it('when null/undefined is compared with an Optional then false is returned', () => {
      const intValue = 10;
      const stringValue = 'ForTestPurpose';
      const user = new User(10, 'user1');
      const address = new Address(20, 'address1');
      const role = { id: 30, description: 'role1' } as Role;

      expect(Optional.empty().equals()).toBeFalse();
      expect(Optional.empty().equals(null)).toBeFalse();

      expect(Optional.of(intValue).equals()).toBeFalse();
      expect(Optional.of(intValue).equals(null)).toBeFalse();

      expect(Optional.of(stringValue).equals()).toBeFalse();
      expect(Optional.of(stringValue).equals(null)).toBeFalse();

      expect(Optional.of(user).equals()).toBeFalse();
      expect(Optional.of(user).equals(null)).toBeFalse();

      expect(Optional.of(address).equals()).toBeFalse();
      expect(Optional.of(address).equals(null)).toBeFalse();

      expect(Optional.of(role).equals()).toBeFalse();
      expect(Optional.of(role).equals(null)).toBeFalse();
    });


    it('when comparing Optionals with different internal values then false is returned', () => {
      const intValue1 = 10;
      const intValue2 = 11;

      const stringValue1 = 'ForTestPurpose';
      const stringValue2 = 'ForTestPurpose_2';

      const user1 = new User(10, 'user1');
      const user2 = new User(11, 'user1');

      const address1 = new Address(20, 'address1');
      const address2 = new Address(21, 'address1');

      const role1 = { id: 30, description: 'role1' } as Role;
      const role2 = { id: 31, description: 'role2' } as Role;

      expect(Optional.of(intValue1).equals(Optional.of(intValue2))).toBeFalse();
      expect(Optional.of(intValue2).equals(Optional.of(intValue1))).toBeFalse();

      expect(Optional.of(stringValue1).equals(Optional.of(stringValue2))).toBeFalse();
      expect(Optional.of(stringValue2).equals(Optional.of(stringValue1))).toBeFalse();

      expect(Optional.of(user1).equals(Optional.of(user2))).toBeFalse();
      expect(Optional.of(user2).equals(Optional.of(user1))).toBeFalse();

      expect(Optional.of(address1).equals(Optional.of(address2))).toBeFalse();
      expect(Optional.of(address2).equals(Optional.of(address1))).toBeFalse();

      expect(Optional.of(role1).equals(Optional.of(role2))).toBeFalse();
      expect(Optional.of(role2).equals(Optional.of(role1))).toBeFalse();
    });


    it('when comparing Optionals with equal native internal values then true is returned', () => {
      const intValue1 = 10;
      const intValue2 = 10;

      const stringValue1 = 'ForTestPurpose';
      const stringValue2 = 'ForTestPurpose';

      expect(Optional.of(intValue1).equals(Optional.of(intValue2))).toBeTrue();
      expect(Optional.of(intValue2).equals(Optional.of(intValue1))).toBeTrue();

      expect(Optional.of(stringValue1).equals(Optional.of(stringValue2))).toBeTrue();
      expect(Optional.of(stringValue2).equals(Optional.of(stringValue1))).toBeTrue();
    });


    it('when comparing Optionals with equal internal values then true is returned', () => {
      const user1 = new User(10, 'user1');
      const user2 = new User(10, 'user2');

      const address1 = new Address(20, 'address1');
      const address2 = new Address(20, 'address2');

      const role1 = { id: 30, description: 'role1' } as Role;
      const role2 = { id: 30, description: 'role1' } as Role;

      expect(Optional.of(user1).equals(Optional.of(user2))).toBeTrue();
      expect(Optional.of(user2).equals(Optional.of(user1))).toBeTrue();

      expect(Optional.of(address1).equals(Optional.of(address2))).toBeTrue();
      expect(Optional.of(address2).equals(Optional.of(address1))).toBeTrue();

      expect(Optional.of(role1).equals(Optional.of(role2))).toBeTrue();
      expect(Optional.of(role2).equals(Optional.of(role1))).toBeTrue();
    });

  });



  describe('get', () => {

    it('when the Optional is empty then an error is thrown', () => {
      expect(() => Optional.empty().get()).toThrowError(IllegalArgumentError);
    });


    it('when the Optional is not empty then the internal value is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(Optional.of(intValue).get()).toEqual(intValue);
      expect(Optional.ofNullableOrUndefined(stringValue).get()).toEqual(stringValue);
    });

  });



  describe('getOrElse', () => {

    it('when the Optional is not empty then the internal value is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      const stringSupplier: Function0<string> = Function0.of(() => 'yxz');

      const getOrElseIntResult = Optional.of(intValue).getOrElse(14);
      const getOrElseStringResult = Optional.ofNullableOrUndefined(stringValue).getOrElse(stringSupplier);

      expect(getOrElseIntResult).toEqual(intValue);
      expect(getOrElseStringResult).toEqual(stringValue);
    });


    it('when the Optional is empty and provided other is a value then other will be returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const getOrElseIntResult = Optional.empty().getOrElse(otherIntValue);
      const getOrElseStringResult = Optional.ofNullableOrUndefined<string>(null).getOrElse(otherStringValue);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });


    it('when the Optional is empty and provided other is a value then other will be returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const otherIntFunc: FFunction0<number> = () => otherIntValue;
      const otherStringFunc: Function0<string> = Function0.of(() => otherStringValue);

      const getOrElseIntResult = Optional.empty().getOrElse(otherIntFunc);
      const getOrElseStringResult = Optional.ofNullableOrUndefined<string>(null).getOrElse(otherStringFunc);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });

  });



  describe('isPresent', () => {

    it('when no value is provided then false is returned', () => {
      expect(Optional.empty().isPresent()).toBeFalse();
      expect(Optional.ofNullableOrUndefined().isPresent()).toBeFalse();
      expect(Optional.ofNullableOrUndefined(null).isPresent()).toBeFalse();
    });


    it('when a value is provided then true is returned', () => {
      expect(Optional.ofNullableOrUndefined(12).isPresent()).toBeTrue();
      expect(Optional.of('abc').isPresent()).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined is given then an error is thrown', () => {
      expect(() => Optional.of(null)).toThrowError(IllegalArgumentError);
      expect(() => Optional.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a valid value is given then no exception is thrown and it will be stored internally', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(Optional.of(intValue).isPresent()).toBeTrue();
      expect(Optional.of(intValue).get()).toEqual(intValue);

      expect(Optional.of(stringValue).isPresent()).toBeTrue();
      expect(Optional.of(stringValue).get()).toEqual(stringValue);
    });

  });



  describe('ofNullableOrUndefined', () => {

    it('when null or undefined is given then empty Optional is returned', () => {
      expect(Optional.ofNullableOrUndefined().isPresent()).toBeFalse();
      expect(Optional.ofNullableOrUndefined(null).isPresent()).toBeFalse();
      expect(Optional.ofNullableOrUndefined(undefined).isPresent()).toBeFalse();
    });


    it('when a valid value is given then it will be stored internally', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(Optional.ofNullableOrUndefined(intValue).isPresent()).toBeTrue();
      expect(Optional.ofNullableOrUndefined(intValue).get()).toEqual(intValue);

      expect(Optional.ofNullableOrUndefined(stringValue).isPresent()).toBeTrue();
      expect(Optional.ofNullableOrUndefined(stringValue).get()).toEqual(stringValue);
    });

  });



  describe('orElse', () => {

    it('when the Optional is not empty then it will be returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      const otherIntOptional = Optional.of(21);
      const otherStringOptional = Optional.of('yxz');

      const orElseIntResult = Optional.of(intValue).orElse(otherIntOptional);
      const orElseStringResult = Optional.ofNullableOrUndefined(stringValue).orElse(otherStringOptional);

      expect(orElseIntResult.get()).toEqual(intValue);
      expect(orElseStringResult.get()).toEqual(stringValue);
    });


    it('when the Optional is empty then other will be returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const otherIntOptional = Optional.of(otherIntValue);
      const otherStringOptional = Optional.of(otherStringValue);

      const orElseIntResult = Optional.empty<number>().orElse(otherIntOptional);
      const orElseStringResult = Optional.ofNullableOrUndefined<string>(null).orElse(otherStringOptional);

      expect(orElseIntResult.get()).toEqual(otherIntValue);
      expect(orElseStringResult.get()).toEqual(otherStringValue);
    });

  });




  // Used only for testing purpose
  class User extends PObject {
    private _id: number;
    private _description: string;

    constructor(id: number, description: string) {
      super();
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

    override equals = (other?: User | null): boolean =>
      _.isNil(other)
        ? false
        : this.id === other.id;
  }


  class Address {
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

    equals = (other?: Address | null): boolean =>
      _.isNil(other)
        ? false
        : this.id === other.id;
  }


  interface Role {
    id: number;
    description: string;
  }

});
