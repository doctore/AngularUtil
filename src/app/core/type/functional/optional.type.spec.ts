import { Optional } from '@app-core/type/functional';
import { ObjectUtil } from '@app-core/util';
import { NullableOrUndefined } from '@app-core/type';
import { FConsumer1 } from '@app-core/type/consumer';
import { FFunction0, FFunction1, Function0, Function1, PartialFunction } from '@app-core/type/function';
import { FPredicate1, Predicate1 } from '@app-core/type/predicate';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/functional/optional.type.spec.ts
 */
describe('Optional', () => {


  describe('collect', () => {

    it('when the Optional is empty then an empty Optional is returned', () => {
      const partialFunction = PartialFunction.of(isOddFPredicate, multiply5FFunction);

      const optional = Optional.empty<number>().collect(partialFunction);

      expect(optional.isPresent()).toBe(false);
    });


    it('when the Optional is not empty but does not belong to the domain of PartialFunction then an empty Optional is returned', () => {
      const partialFunction = PartialFunction.of(isOddFPredicate, multiply5FFunction);

      expect(Optional.of(2).collect(partialFunction).isPresent()).toBe(false);
      expect(Optional.of(16).collect(partialFunction).isPresent()).toBe(false);
      expect(Optional.of(24).collect(partialFunction).isPresent()).toBe(false);
    });


    it('when the Optional is not empty and belongs to the domain of PartialFunction then new non empty Optional is returned', () => {
      const partialFunction = PartialFunction.of(isOddFPredicate, multiply5FFunction);

      const optional1 = Optional.of(5).collect(partialFunction);
      const optional2 = Optional.of(9).collect(partialFunction);

      expect(optional1.isPresent()).toBe(true);
      expect(optional1.get()).toEqual(25);

      expect(optional2.isPresent()).toBe(true);
      expect(optional2.get()).toEqual(45);
    });

  });



  describe('empty', () => {

    it('then an Optional with no value is given', () => {
      expect(Optional.empty().isPresent()).toBe(false);
    });

  });



  describe('equals', () => {

    it('when comparing empty Optionals then false is returned', () => {
      expect(Optional.empty().equals(Optional.empty())).toBe(true);
    });


    it('when comparing empty and not empty Optionals then false is returned', () => {
      const intValue = 10;
      const stringValue = 'ForTestPurpose';
      const user = new User(10, 'user1');
      const role = { id: 30, name: 'role1' } as Role;

      expect(Optional.empty<number>().equals(Optional.of(intValue))).toBe(false);
      expect(Optional.of(intValue).equals(Optional.empty())).toBe(false);

      expect(Optional.empty<string>().equals(Optional.of(stringValue))).toBe(false);
      expect(Optional.of(stringValue).equals(Optional.empty())).toBe(false);

      expect(Optional.empty<User>().equals(Optional.of(user))).toBe(false);
      expect(Optional.of(user).equals(Optional.empty())).toBe(false);

      expect(Optional.empty<Role>().equals(Optional.of(role))).toBe(false);
      expect(Optional.of(role).equals(Optional.empty())).toBe(false);
    });


    it('when null/undefined is compared with an Optional then false is returned', () => {
      const intValue = 10;
      const stringValue = 'ForTestPurpose';
      const user = new User(10, 'user1');
      const role = { id: 30, name: 'role1' } as Role;

      // @ts-ignore
      expect(Optional.empty().equals(undefined)).toBe(false);
      // @ts-ignore
      expect(Optional.empty().equals(null)).toBe(false);

      // @ts-ignore
      expect(Optional.of(intValue).equals(undefined)).toBe(false);
      // @ts-ignore
      expect(Optional.of(intValue).equals(null)).toBe(false);

      // @ts-ignore
      expect(Optional.of(stringValue).equals(undefined)).toBe(false);
      // @ts-ignore
      expect(Optional.of(stringValue).equals(null)).toBe(false);

      // @ts-ignore
      expect(Optional.of(user).equals(undefined)).toBe(false);
      // @ts-ignore
      expect(Optional.of(user).equals(null)).toBe(false);

      // @ts-ignore
      expect(Optional.of(role).equals(undefined)).toBe(false);
      // @ts-ignore
      expect(Optional.of(role).equals(null)).toBe(false);
    });


    it('when comparing Optionals with different internal values then false is returned', () => {
      const intValue1 = 10;
      const intValue2 = 11;

      const stringValue1 = 'ForTestPurpose';
      const stringValue2 = 'ForTestPurpose_2';

      const user1 = new User(10, 'user1');
      const user2 = new User(11, 'user1');

      const role1 = { id: 30, name: 'role1' } as Role;
      const role2 = { id: 31, name: 'role2' } as Role;

      expect(Optional.of(intValue1).equals(Optional.of(intValue2))).toBe(false);
      expect(Optional.of(intValue2).equals(Optional.of(intValue1))).toBe(false);

      expect(Optional.of(stringValue1).equals(Optional.of(stringValue2))).toBe(false);
      expect(Optional.of(stringValue2).equals(Optional.of(stringValue1))).toBe(false);

      expect(Optional.of(user1).equals(Optional.of(user2))).toBe(false);
      expect(Optional.of(user2).equals(Optional.of(user1))).toBe(false);

      expect(Optional.of(role1).equals(Optional.of(role2))).toBe(false);
      expect(Optional.of(role2).equals(Optional.of(role1))).toBe(false);
    });


    it('when comparing Optionals with equal native internal values then true is returned', () => {
      const intValue1 = 10;
      const intValue2 = 10;

      const stringValue1 = 'ForTestPurpose';
      const stringValue2 = 'ForTestPurpose';

      expect(Optional.of(intValue1).equals(Optional.of(intValue2))).toBe(true);
      expect(Optional.of(intValue2).equals(Optional.of(intValue1))).toBe(true);

      expect(Optional.of(stringValue1).equals(Optional.of(stringValue2))).toBe(true);
      expect(Optional.of(stringValue2).equals(Optional.of(stringValue1))).toBe(true);
    });


    it('when comparing Optionals with equal internal values then true is returned', () => {
      const user1 = new User(10, 'user1');
      const user2 = new User(10, 'user2');

      const role1 = { id: 30, name: 'role1' } as Role;
      const role2 = { id: 30, name: 'role1' } as Role;

      expect(Optional.of(user1).equals(Optional.of(user2))).toBe(true);
      expect(Optional.of(user2).equals(Optional.of(user1))).toBe(true);

      expect(Optional.of(role1).equals(Optional.of(role2))).toBe(true);
      expect(Optional.of(role2).equals(Optional.of(role1))).toBe(true);
    });

  });



  describe('filter', () => {

    it('when the Optional is not empty but predicate is null or undefined then an error is thrown', () => {
      const optional = Optional.of(9);

      // @ts-ignore
      expect(() => optional.filter(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => optional.filter(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Optional is empty then predicate is not invoked and an empty Optional is returned', () => {
      const isEvenSpy = vi.fn(isEvenFPredicate);

      // @ts-ignore
      expect(Optional.empty().filter(isEvenSpy).isPresent()).toBe(false);

      expect(isEvenSpy).toBeCalledTimes(0);
    });


    it('when the Optional is not empty then predicate is invoked', () => {
      const isEvenSpy = vi.fn(isEvenFPredicate);

      // @ts-ignore
      expect(Optional.of(1).filter(isEvenSpy).isPresent()).toBe(false);

      expect(isEvenSpy).toBeCalledTimes(1);
    });


    it('when the Optional is not empty and predicate does not match then an empty Optional is returned', () => {
      expect(Optional.of(1).filter(isEvenPredicate).isPresent()).toBe(false);
      expect(Optional.of(9).filter(isEvenPredicate).isPresent()).toBe(false);
    });


    it('when the Optional is not empty and predicate matches then same Optional is returned', () => {
      const optional1 = Optional.of(2).filter(isEvenRaw);
      const optional2 = Optional.of(18).filter(isEvenRaw);

      expect(optional1.isPresent()).toBe(true);
      expect(optional1.get()).toEqual(2);

      expect(optional2.isPresent()).toBe(true);
      expect(optional2.get()).toEqual(18);
    });

  });



  describe('flatMap', () => {

    it('when the Optional is not empty but mapper is null or undefined then an error is thrown', () => {
      const optional = Optional.of(9);

      // @ts-ignore
      expect(() => optional.flatMap(null)).toThrowError(IllegalArgumentError);

      // @ts-ignore
      expect(() => optional.flatMap(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Optional is empty then mapper is not invoked', () => {
      const fromNumToStringSpy = vi.fn(fromNumToOptionalStringFFunction);

      Optional.empty<number>().flatMap(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(0);
    });


    it('when the Optional is not empty then mapper is invoked', () => {
      const fromNumToStringSpy = vi.fn(fromNumToOptionalStringFFunction);

      Optional.of(1).flatMap(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(1);
    });


    it('when the Optional is empty then empty Optional is returned', () => {
      const optional = Optional.empty<number>().flatMap(fromNumToOptionalStringFFunction);

      expect(optional.isPresent()).toBe(false);
    });


    it('when the Optional is not empty then new mapped Optional is returned', () => {
      const fromNumToString: FFunction1<number, Optional<string>> =
        (n: NullableOrUndefined<number>) => Optional.ofNullable('' + n);

      const optional = Optional.of(9).flatMap(fromNumToString);

      expect(optional.isPresent()).toBe(true);
      expect(optional.get()).toEqual('9');
    });

  });



  describe('fold', () => {

    it('when the Optional is empty then ifEmpty is invoked and ifNonEmpty is not', () => {
      const fromNumToStringSpy = vi.fn(fromNumToStringFFunction);
      const returnEmptyStringSpy = vi.fn(returnEmptyStringFFunction);

      Optional.empty<number>().fold(returnEmptyStringSpy, fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(0);
      expect(returnEmptyStringSpy).toBeCalledTimes(1);
    });


    it('when the Optional is not empty then ifNonEmpty is invoked and ifEmpty is not', () => {
      const fromNumToStringSpy = vi.fn(fromNumToStringFFunction);
      const returnEmptyStringSpy = vi.fn(returnEmptyStringFFunction);

      Optional.of(12).fold(returnEmptyStringSpy, fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(1);
      expect(returnEmptyStringSpy).toBeCalledTimes(0);
    });


    it('when the Optional is empty then ifEmpty result is returned', () => {
      expect(Optional.empty<number>().fold(returnEmptyStringFFunction, fromNumToStringFunction)).toEqual('');
    });


    it('when the Optional is not empty then ifNonEmpty result is returned', () => {
      expect(Optional.of(11).fold(returnEmptyStringRaw, fromNumToStringRaw)).toEqual('11');
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


    it('when the Optional is empty and provided other is a value then other is returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const getOrElseIntResult = Optional.empty<number>().getOrElse(otherIntValue);
      const getOrElseStringResult = Optional.ofNullable<string>(null).getOrElse(otherStringValue);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });


    it('when the Optional is empty and provided other is a TFunction0 then other is returned', () => {
      const otherIntValue = 11;
      const otherStringValue = 'abd';

      const otherIntFunc = () => otherIntValue;
      const otherStringFunc: FFunction0<string> = () => otherStringValue;

      const getOrElseIntResult = Optional.empty<number>().getOrElse(otherIntFunc);
      const getOrElseStringResult = Optional.ofNullable<string>(null).getOrElse(otherStringFunc);

      expect(getOrElseIntResult).toEqual(otherIntValue);
      expect(getOrElseStringResult).toEqual(otherStringValue);
    });

  });



  describe('ifPresent', () => {

    it('when the Optional is empty then action is not invoked', () => {
      const plus2: FConsumer1<number> =
        (n: NullableOrUndefined<number>) => { n! += 2; };

      const plus2Spy = vi.fn(plus2);

      // @ts-ignore
      Optional.empty().ifPresent(plus2Spy);

      expect(plus2Spy).toBeCalledTimes(0);
    });


    it('when the Optional is not empty then action is invoked', () => {
      const plus2: FConsumer1<number> =
        (n: NullableOrUndefined<number>) => { n! += 2; };

      const plus2Spy = vi.fn(plus2);

      // @ts-ignore
      Optional.of(1).ifPresent(plus2Spy);

      expect(plus2Spy).toBeCalledTimes(1);
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
      expect(Optional.empty().isPresent()).toBe(false);
      expect(Optional.ofNullable(undefined).isPresent()).toBe(false);
      expect(Optional.ofNullable(null).isPresent()).toBe(false);
    });


    it('when a value is provided then true is returned', () => {
      expect(Optional.ofNullable(12).isPresent()).toBe(true);
      expect(Optional.of('abc').isPresent()).toBe(true);
    });

  });



  describe('map', () => {

    it('when the Optional is empty then mapper is not invoked', () => {
      const fromNumToStringSpy = vi.fn(fromNumToStringFFunction);

      Optional.empty<number>().map(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(0);
    });


    it('when the Optional is not empty then mapper is invoked', () => {
      const fromNumToStringSpy = vi.fn(fromNumToStringFFunction);

      Optional.of(1).map(fromNumToStringSpy);

      expect(fromNumToStringSpy).toBeCalledTimes(1);
    });


    it('when the Optional is empty then empty Optional is returned', () => {
      const optional = Optional.empty<number>().map(fromNumToStringFunction);

      expect(optional.isPresent()).toBe(false);
    });


    it('when the Optional is not empty then new mapped Optional is returned', () => {
      const optional = Optional.of(12).map(fromNumToStringRaw);

      expect(optional.isPresent()).toBe(true);
      expect(optional.get()).toEqual('12');
    });

  });



  describe('of', () => {

    it('when null or undefined is given then an error is thrown', () => {
      expect(() => Optional.of(null)).toThrowError(IllegalArgumentError);
      expect(() => Optional.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a valid value is given then no error is thrown and it will be stored internally', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(Optional.of(intValue).isPresent()).toBe(true);
      expect(Optional.of(intValue).get()).toEqual(intValue);

      expect(Optional.of(stringValue).isPresent()).toBe(true);
      expect(Optional.of(stringValue).get()).toEqual(stringValue);
    });

  });



  describe('ofNullable', () => {

    it('when null or undefined is given then empty Optional is returned', () => {
      expect(Optional.ofNullable().isPresent()).toBe(false);
      expect(Optional.ofNullable(null).isPresent()).toBe(false);
      expect(Optional.ofNullable(undefined).isPresent()).toBe(false);
    });


    it('when a valid value is given then it will be stored internally', () => {
      const intValue = 11;
      const stringValue = 'abd';

      expect(Optional.ofNullable(intValue).isPresent()).toBe(true);
      expect(Optional.ofNullable(intValue).get()).toEqual(intValue);

      expect(Optional.ofNullable(stringValue).isPresent()).toBe(true);
      expect(Optional.ofNullable(stringValue).get()).toEqual(stringValue);
    });

  });



  describe('orElse', () => {

    it('when the Optional is not empty then it is returned', () => {
      const intValue = 11;
      const stringValue = 'abd';

      const otherIntOptional = Optional.of(21);
      const otherStringOptional = Optional.of('yxz');

      const orElseIntResult = Optional.of(intValue).orElse(otherIntOptional);
      const orElseStringResult = Optional.ofNullable(stringValue).orElse(otherStringOptional);

      expect(orElseIntResult.get()).toEqual(intValue);
      expect(orElseStringResult.get()).toEqual(stringValue);
    });


    it('when the Optional is empty then other is returned', () => {
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



  describe('orElseThrow', () => {

    it('when the Optional is not empty then errorSupplier is not invoked', () => {
      const notValidArgument: FFunction0<IllegalArgumentError> =
        () => new IllegalArgumentError('Not valid argument');

      const notValidArgumentSpy = vi.fn(notValidArgument);

      expect(Optional.of(11).orElseThrow(notValidArgumentSpy)).toEqual(11);

      expect(notValidArgumentSpy).toBeCalledTimes(0);
    });


    it('when the Optional is not empty then errorSupplier is not invoked and the internal value is returned', () => {
      const notValidArgument: Function0<IllegalArgumentError> =
        Function0.of(() => new IllegalArgumentError('Not valid argument'));

      expect(Optional.of(9).orElseThrow(notValidArgument)).toEqual(9);
      expect(Optional.of(11).orElseThrow(notValidArgument)).toEqual(11);
    });


    it('when the Optional is empty and errorSupplier is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => Optional.of(null).orElseThrow(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Optional.of(undefined).orElseThrow(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Optional is empty then errorSupplier is invoked and an error is returned', () => {
      const notValidArgument: FFunction0<IllegalArgumentError> =
        () => new IllegalArgumentError('Not valid argument');

      expect(() => Optional.empty().orElseThrow(notValidArgument)).toThrowError(IllegalArgumentError);
    });

  });



  describe('toLeft', () => {

    it('when the Optional is not empty then right function is not invoked', () => {
      const helloGeneratorSpy = vi.fn(helloGeneratorFFunction);

      expect(Optional.of(11).toLeft(helloGeneratorSpy).isRight()).toBe(false);

      expect(helloGeneratorSpy).toBeCalledTimes(0);
    });


    it('when the Optional is not empty then a Left instance is returned', () => {
      const o1 = Optional.of(11);
      const o2 = Optional.of('abd');

      // @ts-ignore
      expect(o1.toLeft(null).isRight()).toBe(false);
      // @ts-ignore
      expect(o1.toLeft(null).getLeft()).toEqual(o1.get());


      // @ts-ignore
      expect(o2.toLeft(undefined).isRight()).toBe(false);
      // @ts-ignore
      expect(o2.toLeft(undefined).getLeft()).toEqual(o2.get());

      expect(o2.toLeft(helloGeneratorFFunction).isRight()).toBe(false);
      expect(o2.toLeft(helloGeneratorFFunction).getLeft()).toEqual(o2.get());
    });


    it('when the Optional is empty and right is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => Optional.of(null).toLeft(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Optional.of(undefined).toLeft(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Optional is empty then right function is invoked', () => {
      const helloGeneratorSpy = vi.fn(helloGeneratorFFunction);

      expect(Optional.ofNullable(null).toLeft(helloGeneratorSpy).isRight()).toBe(true);

      expect(helloGeneratorSpy).toBeCalledTimes(1);
    });


    it('when the Optional is empty then right function result is used to return a Right instance', () => {
      expect(Optional.ofNullable(null).toLeft(helloGeneratorRaw).isRight()).toBe(true);
      expect(Optional.ofNullable(null).toLeft(helloGeneratorRaw).get()).toEqual('Hello');

      expect(Optional.ofNullable(undefined).toLeft(helloGeneratorRaw).isRight()).toBe(true);
      expect(Optional.ofNullable(undefined).toLeft(helloGeneratorRaw).get()).toEqual('Hello');
    });

  });



  describe('toRight', () => {

    it('when the Optional is not empty then left function is not invoked', () => {
      const helloGeneratorSpy = vi.fn(helloGeneratorFFunction);

      expect(Optional.of(11).toRight(helloGeneratorSpy).isRight()).toBe(true);

      expect(helloGeneratorSpy).toBeCalledTimes(0);
    });


    it('when the Optional is not empty then a Right instance is returned', () => {
      const o1 = Optional.of(11);
      const o2 = Optional.of('abd');

      // @ts-ignore
      expect(o1.toRight(null).isRight()).toBe(true);
      // @ts-ignore
      expect(o1.toRight(null).get()).toEqual(o1.get());


      // @ts-ignore
      expect(o2.toRight(undefined).isRight()).toBe(true);
      // @ts-ignore
      expect(o2.toRight(undefined).get()).toEqual(o2.get());

      expect(o2.toRight(helloGeneratorFFunction).isRight()).toBe(true);
      expect(o2.toRight(helloGeneratorFFunction).get()).toEqual(o2.get());
    });


    it('when the Optional is empty and left is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => Optional.of(null).toRight(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Optional.of(undefined).toRight(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when the Optional is empty then left function is invoked', () => {
      const helloGeneratorSpy = vi.fn(helloGeneratorFFunction);

      expect(Optional.ofNullable(null).toRight(helloGeneratorSpy).isRight()).toBe(false);

      expect(helloGeneratorSpy).toBeCalledTimes(1);
    });


    it('when the Optional is empty then left function result is used to return a Left instance', () => {
      expect(Optional.ofNullable(null).toRight(helloGeneratorRaw).isRight()).toBe(false);
      expect(Optional.ofNullable(null).toRight(helloGeneratorRaw).getLeft()).toEqual('Hello');

      expect(Optional.ofNullable(undefined).toRight(helloGeneratorRaw).isRight()).toBe(false);
      expect(Optional.ofNullable(undefined).toRight(helloGeneratorRaw).getLeft()).toEqual('Hello');
    });

  });

});



// Used only for testing purpose
class User {
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

  equals = (other?: User | null): boolean =>
    ObjectUtil.isNullOrUndefined(other)
      ? false
      : this.id === other.id;
}


interface Role {
  id: number;
  name: string;
}


const isOddFPredicate: FPredicate1<number> =
  (n: NullableOrUndefined<number>) =>
    1 == n! % 2;

const multiply5FFunction: FFunction1<number, number> =
  (n: NullableOrUndefined<number>) =>
    5 * n!;


const isEvenRaw =
  (n: NullableOrUndefined<number>) =>
    0 == n! % 2;


const isEvenPredicate: Predicate1<number> =
  Predicate1.of(
    (n: number) =>
      0 == n! % 2
  );


const isEvenFPredicate: FPredicate1<number> =
  (n: NullableOrUndefined<number>) =>
    0 == n! % 2;


const fromNumToStringRaw =
  (n: NullableOrUndefined<number>) =>
    '' + n!;


const fromNumToStringFFunction: FFunction1<number, string> =
  (n: NullableOrUndefined<number>) =>
    '' + n!;


const fromNumToStringFunction: Function1<number, string> =
    Function1.of(
      (n: NullableOrUndefined<number>) =>
        '' + n!
    );


const fromNumToOptionalStringFFunction: FFunction1<number, Optional<string>> =
  (n: NullableOrUndefined<number>) =>
    Optional.ofNullable('' + n);


const returnEmptyStringRaw =
  () =>
    '';


const returnEmptyStringFFunction: FFunction0<string> =
  () =>
    '';


const helloGeneratorRaw =
  () =>
    'Hello';


const helloGeneratorFFunction: FFunction0<string> =
  () =>
    'Hello';
