import { Hashable, isHashable } from '@app-core/type/collection';
import { Nullable } from '@app-core/type';
import { ObjectUtil } from '@app-core/util';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/collection/collection.type.spec.ts
 */
describe('isHashable', () => {

  it('when no object is provided then false is returned', () => {
    expect(isHashable()).toBe(false);
    expect(isHashable(null)).toBe(false);
    expect(isHashable(12)).toBe(false);
    expect(isHashable(false)).toBe(false);
  });


  it('when an object that does not match is provided then false is returned', () => {
    const role = { id: 1, name: 'role1' } as Role;

    expect(isHashable({})).toBe(false);
    expect(isHashable(role)).toBe(false);
  });


  it('when an object that matches is provided then true is returned', () => {
    const user = new User(1, 'user1');

    expect(isHashable(user)).toBe(true);
  });

});



// Used only for testing purpose
class User implements Hashable {
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

  equals = (other?: Nullable<User>): boolean =>
    ObjectUtil.isNullOrUndefined(other)
      ? false
      : this._id === other.id;

  hash(): number {
    return this._id % 50;
  }

}


interface Role {
  id: number;
  name: string;
}
