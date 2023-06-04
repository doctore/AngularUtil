import { JsonUtil } from '@app-core/util';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/util/json.util.spec.ts
 */
describe('JsonUtil', () => {


  describe('constructor', () => {

    it('when trying to create a new instance then an error is thrown', () => {
      expect(() => new JsonUtil()).toThrowError(SyntaxError);
    });

  });



  describe('EMPTY', () => {

    it('when invoking then an empty JSON-formatted string is returned', () => {
      expect(JsonUtil.EMPTY).toEqual('{}');
    });

  });



  describe('EMPTY_ARRAY', () => {

    it('when invoking then an empty array of a JSON-formatted string is returned', () => {
      expect(JsonUtil.EMPTY_ARRAY).toEqual('[]');
    });

  });



  describe('fromJSON', () => {

    it('when given json is null or undefined then undefined is returned', () => {
      expect(JsonUtil.fromJSON()).toBeUndefined();
      expect(JsonUtil.fromJSON(null)).toBeUndefined();
    });


    it('when given json is not valid then undefined is returned', () => {
      const invalidJson = '{"id":"normal';

      expect(JsonUtil.fromJSON(invalidJson)).toBeUndefined();
    });


    it('when given json is a valid JSON-formatted string then equivalent object instance will be returned', () => {
      const json = '{ "id": 12, "name": "Hawaiian", "cost": 11.50, "ingredients": [ { "id": 1, "name": "Cheese" }, { "id": 2, "name": "Pineapple" } ] }';

      const expectedResult = {
        id: 12,
        name: 'Hawaiian',
        cost: 11.50,
        ingredients: [
          {
            id: 1,
            name: "Cheese"
          },
          {
            id: 2,
            name: "Pineapple"
          }
        ]
      };

      expect(JsonUtil.fromJSON(json)).toEqual(expectedResult);
    });

  });



  describe('fromJSONOptional', () => {

    it('when given json is null or undefined then empty Optional is returned', () => {
      expect(JsonUtil.fromJSONOptional().isPresent()).toBeFalse();
      expect(JsonUtil.fromJSONOptional(null).isPresent()).toBeFalse();
    });


    it('when given json is not valid then empty Optional is returned', () => {
      const invalidJson = '{"id":"normal';

      expect(JsonUtil.fromJSONOptional(invalidJson).isPresent()).toBeFalse();
    });


    it('when given json is a valid JSON-formatted string then non empty Optional with the object instance is returned', () => {
      const json = '{ "id": 12, "name": "Hawaiian", "cost": 11.50, "ingredients": [ { "id": 1, "name": "Cheese" }, { "id": 2, "name": "Pineapple" } ] }';

      const expectedResult = {
        id: 12,
        name: 'Hawaiian',
        cost: 11.50,
        ingredients: [
          {
            id: 1,
            name: "Cheese"
          },
          {
            id: 2,
            name: "Pineapple"
          }
        ]
      };

      expect(JsonUtil.fromJSONOptional(json).isPresent()).toBeTrue();
      expect(JsonUtil.fromJSONOptional(json).get()).toEqual(expectedResult);
    });

  });


});
