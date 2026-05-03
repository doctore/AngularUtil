import { EnumUtil } from '@app-core/util';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/enum-util.spec.ts
 */
describe('EnumUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new EnumUtil()).toThrowError(SyntaxError);
    });

  });



  describe('getValueByKeyIgnoreCase', () => {

    it('when given enumObj is null or undefined then undefined is returned', () => {
      // @ts-ignore
      expect(EnumUtil.getValueByKeyIgnoreCase()).toBe(undefined);
      expect(EnumUtil.getValueByKeyIgnoreCase(null, "DoesNotCare")).toBe(undefined);
      expect(EnumUtil.getValueByKeyIgnoreCase(undefined, "DoesNotCare")).toBe(undefined);
    });


    it('when given enumKey is null or undefined then undefined is returned', () => {
      // @ts-ignore
      expect(EnumUtil.getValueByKeyIgnoreCase()).toBe(undefined);
      expect(EnumUtil.getValueByKeyIgnoreCase(Color, null)).toBe(undefined);
      expect(EnumUtil.getValueByKeyIgnoreCase(Status, undefined)).toBe(undefined);
    });


    it('when given enumKey is not found then undefined is returned', () => {
      expect(EnumUtil.getValueByKeyIgnoreCase(Color, "NotFound")).toBe(undefined);
      expect(EnumUtil.getValueByKeyIgnoreCase(Status, "NotFound")).toBe(undefined);
    });


    it('when given enumKey is found then related value is returned', () => {
      expect(EnumUtil.getValueByKeyIgnoreCase(Color, "reD")).toBe("RED");
      expect(EnumUtil.getValueByKeyIgnoreCase(Color, "green")).toBe("GREEN");
      expect(EnumUtil.getValueByKeyIgnoreCase(Color, "BLUE")).toBe("BLUE");

      expect(EnumUtil.getValueByKeyIgnoreCase(Status, "PenDiNg")).toBe(2);
      expect(EnumUtil.getValueByKeyIgnoreCase(Status, "approved")).toBe(4);
      expect(EnumUtil.getValueByKeyIgnoreCase(Status, "REJECTED")).toBe(6);
    });

  });



  describe('getValueByKeyIgnoreCaseOptional', () => {

    it('when given enumObj is null or undefined then empty Optional is returned', () => {
      // @ts-ignore
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional().isPresent()).toBe(false);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(null, "DoesNotCare").isPresent()).toBe(false);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(undefined, "DoesNotCare").isPresent()).toBe(false);
    });


    it('when given enumKey is null or undefined then empty Optional is returned', () => {
      // @ts-ignore
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional().isPresent()).toBe(false);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Color, null).isPresent()).toBe(false);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Status, undefined).isPresent()).toBe(false);
    });


    it('when given enumKey is not found then empty Optional is returned', () => {
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Color, "NotFound").isPresent()).toBe(false);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Status, "NotFound").isPresent()).toBe(false);
    });


    it('when given enumKey is found then Optional with expected value is returned', () => {
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Color, "reD").isPresent()).toBe(true);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Color, "reD").get()).toEqual("RED");

      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Color, "green").isPresent()).toBe(true);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Color, "green").get()).toEqual("GREEN");

      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Color, "BLUE").isPresent()).toBe(true);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Color, "BLUE").get()).toEqual("BLUE");

      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Status, "PenDiNg").isPresent()).toBe(true);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Status, "PenDiNg").get()).toEqual(2);

      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Status, "approved").isPresent()).toBe(true);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Status, "approved").get()).toEqual(4);

      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Status, "REJECTED").isPresent()).toBe(true);
      expect(EnumUtil.getValueByKeyIgnoreCaseOptional(Status, "REJECTED").get()).toEqual(6);
    });

  });



  describe('getValueByKeyIgnoreCaseOrThrow', () => {

    it('when given enumObj is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => EnumUtil.getValueByKeyIgnoreCaseOrThrow(null, "DoesNotCare")).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => EnumUtil.getValueByKeyIgnoreCaseOrThrow(undefined, "DoesNotCare")).toThrowError(IllegalArgumentError);
    });


    it('when given enumKey is null or undefined then an error is thrown', () => {
      // @ts-ignore
      expect(() => EnumUtil.getValueByKeyIgnoreCaseOrThrow(Color, null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => EnumUtil.getValueByKeyIgnoreCaseOrThrow(Status, undefined)).toThrowError(IllegalArgumentError);
    });


    it('when given enumKey is not found then an error is thrown', () => {
      expect(() => EnumUtil.getValueByKeyIgnoreCaseOrThrow(Color, "NotFound")).toThrowError(IllegalArgumentError);
      expect(() => EnumUtil.getValueByKeyIgnoreCaseOrThrow(Status, "NotFound")).toThrowError(IllegalArgumentError);
    });


    it('when given enumKey is found then related value is returned', () => {
      expect(EnumUtil.getValueByKeyIgnoreCaseOrThrow(Color, "reD")).toBe("RED");
      expect(EnumUtil.getValueByKeyIgnoreCaseOrThrow(Color, "green")).toBe("GREEN");
      expect(EnumUtil.getValueByKeyIgnoreCaseOrThrow(Color, "BLUE")).toBe("BLUE");

      expect(EnumUtil.getValueByKeyIgnoreCaseOrThrow(Status, "PenDiNg")).toBe(2);
      expect(EnumUtil.getValueByKeyIgnoreCaseOrThrow(Status, "approved")).toBe(4);
      expect(EnumUtil.getValueByKeyIgnoreCaseOrThrow(Status, "REJECTED")).toBe(6);
    });

  });



  describe('getValues', () => {

    it('when given enumObj is null or undefined then empty array is returned', () => {
      // @ts-ignore
      expect(EnumUtil.getValues()).toEqual([]);
      expect(EnumUtil.getValues(null)).toEqual([]);
      expect(EnumUtil.getValues(undefined)).toEqual([]);
    });


    it('when given enumObj is an enum with string values then an array of string is returned', () => {
      verifyArrays(
        EnumUtil.getValues(Color),
        [ "RED", "GREEN", "BLUE" ]
      );
    });


    it('when given enumObj is an enum with number values then an array of number is returned', () => {
      verifyArrays(
        EnumUtil.getValues(Status),
        [ 2, 4, 6 ]
      );
    });

  });


});



// Used only for testing purpose
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

enum Status {
  Pending = 2,
  Approved = 4,
  Rejected = 6
}


function verifyArrays(actualArray: unknown[],
                      expectedArray: unknown[]) {
  expect(expectedArray.length).toEqual(actualArray.length);
  if (0 < expectedArray.length) {
    for (let i = 0; i < expectedArray.length; i++) {
      expect(expectedArray[i]).toEqual(actualArray[i]);
    }
  }
}
