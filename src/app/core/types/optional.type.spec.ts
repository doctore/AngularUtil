import {
  BaseObject,
  FConsumer1,
  FFunction0,
  FFunction1,
  FPredicate1,
  Function0,
  NullableOrUndefined,
  Optional,
  PartialFunction
} from '@app-core/types';
import { IllegalArgumentError } from '@app-core/errors';
import * as _ from 'lodash';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/optional.type.spec.ts
 */
describe('Optional', () => {


  describe('collect', () => {

    it('when the Optional is empty then an empty Optional is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 1 == n! % 2;

      const multiply5: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 5 * n!;

      const partialFunction = PartialFunction.of(isOdd, multiply5);

      const optional = Optional.empty<number>().collect(partialFunction);

      expect(optional.isPresent()).toBeFalse();
    });


    it('when the Optional is not empty but does not belong to the domain of PartialFunction then an empty Optional is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 1 == n! % 2;

      const multiply5: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 5 * n!;

      const partialFunction = PartialFunction.of(isOdd, multiply5);

      expect(Optional.of(2).collect(partialFunction).isPresent()).toBeFalse();
      expect(Optional.of(16).collect(partialFunction).isPresent()).toBeFalse();
      expect(Optional.of(24).collect(partialFunction).isPresent()).toBeFalse();
    });


    it('when the Optional is not empty and belongs to the domain of PartialFunction then an empty Optional is returned', () => {
      const isOdd: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 1 == n! % 2;

      const multiply5: FFunction1<number, number> =
        (n: NullableOrUndefined<number>) => 5 * n!;

      const partialFunction = PartialFunction.of(isOdd, multiply5);

      const optional1 = Optional.of(5).collect(partialFunction);
      const optional2 = Optional.of(9).collect(partialFunction);

      expect(optional1.isPresent()).toBeTrue();
      expect(optional1.get()).toEqual(25);

      expect(optional2.isPresent()).toBeTrue();
      expect(optional2.get()).toEqual(45);
    });

  });



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



  describe('filter', () => {

    it('when the Optional is empty then predicate is not invoked and an empty Optional is returned', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      const isEvenSpy = jasmine.createSpy('isEven', isEven);

      // @ts-ignore
      expect(Optional.empty().filter(isEvenSpy).isPresent()).toBeFalse();

      expect(isEvenSpy.calls.count()).toBe(0);
    });


    it('when the Optional is not empty then predicate is invoked', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      const isEvenSpy = jasmine.createSpy('isEven', isEven);

      // @ts-ignore
      expect(Optional.of(1).filter(isEvenSpy).isPresent()).toBeFalse();

      expect(isEvenSpy.calls.count()).toBe(1);
    });


    it('when the Optional is not empty and predicate does not match then an empty Optional is returned', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      expect(Optional.of(1).filter(isEven).isPresent()).toBeFalse();
      expect(Optional.of(9).filter(isEven).isPresent()).toBeFalse();
    });


    it('when the Optional is not empty and predicate matches then same Optional is returned', () => {
      const isEven: FPredicate1<number> =
        (n: NullableOrUndefined<number>) => 0 == n! % 2;

      const optional1 = Optional.of(2).filter(isEven);
      const optional2 = Optional.of(18).filter(isEven);

      expect(optional1.isPresent()).toBeTrue();
      expect(optional1.get()).toEqual(2);

      expect(optional2.isPresent()).toBeTrue();
      expect(optional2.get()).toEqual(18);
    });

  });



  describe('flatMap', () => {

    it('when the Optional is empty then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number, Optional<string>> =
        (n: NullableOrUndefined<number>): Optional<string> => Optional.ofNullable('' + n);

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      Optional.empty<number>().flatMap(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
    });


    it('when the Optional is not empty then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, Optional<string>> =
        (n: NullableOrUndefined<number>): Optional<string> => Optional.ofNullable('' + n);

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      Optional.of(1).flatMap(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
    });


    it('when the Optional is empty then empty Optional is returned', () => {
      const fromNumToString: FFunction1<number, Optional<string>> =
        (n: NullableOrUndefined<number>): Optional<string> => Optional.ofNullable('' + n);

      const optional = Optional.empty<number>().flatMap(fromNumToString);

      expect(optional.isPresent()).toBeFalse();
    });


    it('when the Optional is not empty then new mapped Optional is returned', () => {
      const fromNumToString: FFunction1<number, Optional<string>> =
        (n: NullableOrUndefined<number>): Optional<string> => Optional.ofNullable('' + n);

      const optional = Optional.of(9).flatMap(fromNumToString);

      expect(optional.isPresent()).toBeTrue();
      expect(optional.get()).toEqual('9');
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
      expect(Optional.ofNullable(stringValue).get()).toEqual(stringValue);
    });

  });



  describe('getOrElse', () => {

    it('when the Optional is not empty then the internal value is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      const stringSupplier: Function0<string> = Function0.of(() => 'yxz');

      const getOrElseIntResult = Optional.of(intValue).getOrElse(14);
      const getOrElseStringResult = Optional.ofNullable(stringValue).getOrElse(stringSupplier);

      expect(getOrElseIntResult).toEqual(intValue);
      expect(getOrElseStringResult).toEqual(stringValue);
    });


    it('when the Optional is empty and provided other is a value then other will be returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const getOrElseIntResult = Optional.empty().getOrElse(otherIntValue);
      const getOrElseStringResult = Optional.ofNullable<string>(null).getOrElse(otherStringValue);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });


    it('when the Optional is empty and provided other is a value then other will be returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const otherIntFunc: FFunction0<number> = () => otherIntValue;
      const otherStringFunc: Function0<string> = Function0.of(() => otherStringValue);

      const getOrElseIntResult = Optional.empty().getOrElse(otherIntFunc);
      const getOrElseStringResult = Optional.ofNullable<string>(null).getOrElse(otherStringFunc);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });

  });



  describe('ifPresent', () => {

    it('when the Optional is empty then action is not invoked', () => {
      const plus2: FConsumer1<number> =
        (n: NullableOrUndefined<number>) => { n! += 2; };

      const plus2Spy = jasmine.createSpy('action', plus2);

      // @ts-ignore
      Optional.empty().ifPresent(plus2Spy);

      expect(plus2Spy.calls.count()).toBe(0);
    });


    it('when the Optional is not empty then action is invoked', () => {
      const plus2: FConsumer1<number> =
        (n: NullableOrUndefined<number>) => { n! += 2; };

      const plus2Spy = jasmine.createSpy('action', plus2);

      // @ts-ignore
      Optional.of(1).ifPresent(plus2Spy);

      expect(plus2Spy.calls.count()).toBe(1);
    });


    it('when the Optional is not empty then action is invoked and the values of the Optional updated', () => {
      const objectForTesting = { name: 'ForTestPurpose' };
      const objNameV2 = objectForTesting.name + 'V2';

      const actionFunction = (obj: NullableOrUndefined<{ name: string }>) =>
        obj!.name = objNameV2;

      const optional = Optional.of(objectForTesting);
      optional.ifPresent(actionFunction);

      expect(optional.get().name).toEqual(objNameV2);
    });

  });



  describe('isPresent', () => {

    it('when no value is provided then false is returned', () => {
      expect(Optional.empty().isPresent()).toBeFalse();
      expect(Optional.ofNullable().isPresent()).toBeFalse();
      expect(Optional.ofNullable(null).isPresent()).toBeFalse();
    });


    it('when a value is provided then true is returned', () => {
      expect(Optional.ofNullable(12).isPresent()).toBeTrue();
      expect(Optional.of('abc').isPresent()).toBeTrue();
    });

  });



  describe('map', () => {

    it('when the Optional is empty then mapper is not invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: NullableOrUndefined<number>): string => '' + n!;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      Optional.empty<number>().map(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(0);
    });


    it('when the Optional is not empty then mapper is invoked', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: NullableOrUndefined<number>): string => '' + n!;

      const fromNumToStringSpy = jasmine.createSpy('fromNumToString', fromNumToString);

      Optional.of(1).map(fromNumToStringSpy);

      expect(fromNumToStringSpy.calls.count()).toBe(1);
    });


    it('when the Optional is empty then empty Optional is returned', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: NullableOrUndefined<number>): string => '' + n!;

      const optional = Optional.empty<number>().map(fromNumToString);

      expect(optional.isPresent()).toBeFalse();
    });


    it('when the Optional is not empty then new mapped Optional is returned', () => {
      const fromNumToString: FFunction1<number, string> =
        (n: NullableOrUndefined<number>): string => '' + n!;

      const optional = Optional.of(12).map(fromNumToString);

      expect(optional.isPresent()).toBeTrue();
      expect(optional.get()).toEqual('12');
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



  describe('ofNullable', () => {

    it('when null or undefined is given then empty Optional is returned', () => {
      expect(Optional.ofNullable().isPresent()).toBeFalse();
      expect(Optional.ofNullable(null).isPresent()).toBeFalse();
      expect(Optional.ofNullable(undefined).isPresent()).toBeFalse();
    });


    it('when a valid value is given then it will be stored internally', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(Optional.ofNullable(intValue).isPresent()).toBeTrue();
      expect(Optional.ofNullable(intValue).get()).toEqual(intValue);

      expect(Optional.ofNullable(stringValue).isPresent()).toBeTrue();
      expect(Optional.ofNullable(stringValue).get()).toEqual(stringValue);
    });

  });



  describe('orElse', () => {

    it('when the Optional is not empty then it will be returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      const otherIntOptional = Optional.of(21);
      const otherStringOptional = Optional.of('yxz');

      const orElseIntResult = Optional.of(intValue).orElse(otherIntOptional);
      const orElseStringResult = Optional.ofNullable(stringValue).orElse(otherStringOptional);

      expect(orElseIntResult.get()).toEqual(intValue);
      expect(orElseStringResult.get()).toEqual(stringValue);
    });


    it('when the Optional is empty then other will be returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const otherIntOptional = Optional.of(otherIntValue);
      const otherStringOptional = Optional.of(otherStringValue);

      const orElseIntResult = Optional.empty<number>().orElse(otherIntOptional);
      const orElseStringResult = Optional.ofNullable<string>(null).orElse(otherStringOptional);

      expect(orElseIntResult.get()).toEqual(otherIntValue);
      expect(orElseStringResult.get()).toEqual(otherStringValue);
    });

  });




  // Used only for testing purpose
  class User extends BaseObject {
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
