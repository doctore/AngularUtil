import { ObjectUtil } from '@app-core/util';
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
      expect(ObjectUtil.equals()).toBeTrue();
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


    it('when comparing objects with equals method then expected result is returned', () => {
      const user1 = new User(10, 'user1');
      const user2 = new User(11, 'user2');
      const user3 = new User(10, 'user3');

      expect(ObjectUtil.equals(user1, user2)).toBeFalse();
      expect(ObjectUtil.equals(user2, user1)).toBeFalse();

      expect(ObjectUtil.equals(user1, user3)).toBeTrue();
      expect(ObjectUtil.equals(user3, user1)).toBeTrue();
    });


    it('when comparing objects without equals method then expected result is returned', () => {
      const role1 = { id: 10, description: 'role1' } as Role;
      const role2 = { id: 10, description: 'role2' } as Role;
      const role3 = { id: 11, description: 'role1' } as Role;
      const role4 = { id: 10, description: 'role1' } as Role;

      expect(ObjectUtil.equals(role1, role2)).toBeFalse();
      expect(ObjectUtil.equals(role2, role1)).toBeFalse();

      expect(ObjectUtil.equals(role1, role3)).toBeFalse();
      expect(ObjectUtil.equals(role3, role1)).toBeFalse();

      expect(ObjectUtil.equals(role1, role4)).toBeTrue();
      expect(ObjectUtil.equals(role4, role1)).toBeTrue();
    });

  });



  describe('typedEquals', () => {

    it('when both values are null or undefined then true is be returned', () => {
      expect(ObjectUtil.typedEquals()).toBeTrue();
      expect(ObjectUtil.typedEquals(null, null)).toBeTrue();
    });


    it('when one of the provided values is null or undefined then false will be returned', () => {
      let a, b;

      expect(ObjectUtil.typedEquals(a, null)).toBeFalse();
      expect(ObjectUtil.typedEquals(null, b)).toBeFalse();

      expect(ObjectUtil.typedEquals(12, null)).toBeFalse();
      expect(ObjectUtil.typedEquals(null, 'test')).toBeFalse();
    });


    it('when comparing native values then expected result is returned', () => {
      expect(ObjectUtil.typedEquals(1, 2)).toBeFalse();
      expect(ObjectUtil.typedEquals(2, 1)).toBeFalse();
      expect(ObjectUtil.typedEquals(1, 1)).toBeTrue();

      expect(ObjectUtil.typedEquals('1', '2')).toBeFalse();
      expect(ObjectUtil.typedEquals('2', '1')).toBeFalse();
      expect(ObjectUtil.typedEquals('1', '1')).toBeTrue();

      expect(ObjectUtil.typedEquals(true, false)).toBeFalse();
      expect(ObjectUtil.typedEquals(false, true)).toBeFalse();
      expect(ObjectUtil.typedEquals(true, true)).toBeTrue();
    });


    it('when comparing objects with equals method then expected result is returned', () => {
      const user1 = new User(10, 'user1');
      const user2 = new User(11, 'user2');
      const user3 = new User(10, 'user3');

      expect(ObjectUtil.typedEquals(user1, user2)).toBeFalse();
      expect(ObjectUtil.typedEquals(user2, user1)).toBeFalse();

      expect(ObjectUtil.typedEquals(user1, user3)).toBeTrue();
      expect(ObjectUtil.typedEquals(user3, user1)).toBeTrue();
    });


    it('when comparing objects without equals method then expected result is returned', () => {
      const role1 = { id: 10, description: 'role1' } as Role;
      const role2 = { id: 10, description: 'role2' } as Role;
      const role3 = { id: 11, description: 'role1' } as Role;
      const role4 = { id: 10, description: 'role1' } as Role;

      expect(ObjectUtil.typedEquals(role1, role2)).toBeFalse();
      expect(ObjectUtil.typedEquals(role2, role1)).toBeFalse();

      expect(ObjectUtil.typedEquals(role1, role3)).toBeFalse();
      expect(ObjectUtil.typedEquals(role3, role1)).toBeFalse();

      expect(ObjectUtil.typedEquals(role1, role4)).toBeTrue();
      expect(ObjectUtil.typedEquals(role4, role1)).toBeTrue();
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
