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



  describe('arrayFromJSON', () => {

    it('when given json is null or undefined then empty array instance is returned', () => {
      const expectedResult: Object[] = [];

      expect(JsonUtil.arrayFromJSON()).toEqual(expectedResult);
      expect(JsonUtil.arrayFromJSON(null)).toEqual(expectedResult);
    });


    it('when given json is not valid then an error is thrown', () => {
      const invalidJson = '{"id":"normal';

      expect(() => JsonUtil.arrayFromJSON(invalidJson)).toThrowError(SyntaxError);
    });


    it('when given json is not null then equivalent array is returned', () => {
      const json = '[{"numProp":12,"stringProp":"test1","objProp":{"booleanProp":false}},'
        + '{"numProp":9,"stringProp":"test2","objProp":{"booleanProp":true}}]';

      const expectedResult =
        [
          {
            numProp: 12,
            stringProp: 'test1',
            objProp: {
              booleanProp: false
            }
          },
          {
            numProp: 9,
            stringProp: 'test2',
            objProp: {
              booleanProp: true
            }
          },
        ];

      expect(JsonUtil.arrayFromJSON(json)).toEqual(expectedResult);
    });

  });



  describe('arrayToJSON', () => {

    it('when given array is null or undefined then JSON empty array representation is returned', () => {
      const expectedResult = JsonUtil.EMPTY_ARRAY;

      expect(JsonUtil.arrayToJSON()).toEqual(expectedResult);
      expect(JsonUtil.arrayToJSON(null)).toEqual(expectedResult);
    });


    it('when given array is not null then equivalent JSON is returned', () => {
      const obj =
        [
          {
            numProp: 12,
            stringProp: 'test1',
            objProp: {
              booleanProp: false
            }
          },
          {
            numProp: 9,
            stringProp: 'test2',
            objProp: {
              booleanProp: true
            }
          },
        ];

      const expectedResult = '[{"numProp":12,"stringProp":"test1","objProp":{"booleanProp":false}},'
        + '{"numProp":9,"stringProp":"test2","objProp":{"booleanProp":true}}]';

      expect(JsonUtil.arrayToJSON(obj)).toEqual(expectedResult);
    });

  });



  describe('fromClassInstanceToJSON', () => {

    it('when given object is null or undefined then empty JSON is returned', () => {
      const expectedResult = JsonUtil.EMPTY;

      expect(JsonUtil.fromClassInstanceToJSON()).toEqual(expectedResult);
      expect(JsonUtil.fromClassInstanceToJSON(null)).toEqual(expectedResult);
    });


    it('when given object is not null then equivalent JSON is returned', () => {
      const obj = {
        numProp: 12,
        stringProp: 'test',
        objProp: {
          booleanProp: false
        }
      };

      const expectedResult = '{"numProp":12,"stringProp":"test","objProp":{"booleanProp":false}}';

      expect(JsonUtil.fromClassInstanceToJSON(obj)).toEqual(expectedResult);
    });


    it('when given object is a instance of normalized class then equivalent JSON without "_" as property\'s prefix is returned', () => {
      const obj = new User(
        1,
        'User1',
        [
          new Car(11, 'Toyota', 'Yaris', 2014)
        ],
        {
          id: 21,
          name: 'Administrator'
        } as Role
      );

      const expectedResult = '{"id":1,"name":"User1",'
        + '"cars":[{"id":11,"make":"Toyota","model":"Yaris","year":2014}],'
        + '"role":{"id":21,"name":"Administrator"}}';

      expect(JsonUtil.fromClassInstanceToJSON(obj)).toEqual(expectedResult);
    });

  });



  describe('fromJSON', () => {

    it('when given json is null or undefined then empty object instance is returned', () => {
      const expectedResult = {};

      expect(JsonUtil.fromJSON()).toEqual(expectedResult);
      expect(JsonUtil.fromJSON(null)).toEqual(expectedResult);
    });


    it('when given json is not valid then an error is thrown', () => {
      const invalidJson = '{"id":"normal';

      expect(() => JsonUtil.fromJSON(invalidJson)).toThrowError(SyntaxError);
    });


    it('when given json is a valid JSON-formatted string then equivalent object instance is returned', () => {
      const json = '{ "id": 12, "name": "Hawaiian", "cost": 11.50,'
        + '"ingredients": [{ "id": 1, "name": "Cheese" }, { "id": 2, "name": "Pineapple" }]}';

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


    it('when given json is a valid JSON-formatted string and the expected instance belongs to a normalized class then equivalent object instance is returned', () => {
      const json = '{"id":1,"name":"User1",'
        + '"cars":[{"id":11,"make":"Toyota","model":"Yaris","year":2014}],'
        + '"role":{"id":21,"name":"Administrator"}}';

      const expectedResult = new User(
        1,
        'User1',
        [
          new Car(11, 'Toyota', 'Yaris', 2014)
        ],
        {
          id: 21,
          name: 'Administrator'
        } as Role
      );

      const result: User = JsonUtil.fromJSON(json);

      expect(result.id).toEqual(expectedResult.id);
      expect(result.name).toEqual(expectedResult.name);
      expect(result.cars[0].id).toEqual(expectedResult.cars[0].id);
      expect(result.cars[0].make).toEqual(expectedResult.cars[0].make);
      expect(result.cars[0].model).toEqual(expectedResult.cars[0].model);
      expect(result.cars[0].year).toEqual(expectedResult.cars[0].year);
      expect(result.role).toEqual(expectedResult.role);
    });

  });



  describe('toJSON', () => {

    it('when given object is null or undefined then empty JSON is returned', () => {
      const expectedResult = JsonUtil.EMPTY;

      expect(JsonUtil.toJSON()).toEqual(expectedResult);
      expect(JsonUtil.toJSON(null)).toEqual(expectedResult);
    });


    it('when given object is not null then equivalent JSON is returned', () => {
      const obj = {
        numProp: 12,
        stringProp: 'test',
        objProp: {
          booleanProp: false
        }
      };

      const expectedResult = '{"numProp":12,"stringProp":"test","objProp":{"booleanProp":false}}';

      expect(JsonUtil.toJSON(obj)).toEqual(expectedResult);
    });


    it('when given object is a instance of normalized class then equivalent JSON with "_" as property\'s prefix is returned', () => {
      const obj = new User(
          1,
          'User1',
          [
            new Car(11, 'Toyota', 'Yaris', 2014)
          ],
          {
            id: 21,
            name: 'Administrator'
          } as Role
      );

      const expectedResult = '{"_id":1,"_name":"User1",'
        + '"_cars":[{"_id":11,"_make":"Toyota","_model":"Yaris","_year":2014}],'
        + '"_role":{"id":21,"name":"Administrator"}}';

      expect(JsonUtil.toJSON(obj)).toEqual(expectedResult);
    });

  });




  // Used only for testing purpose
  class User {
    private _id: number;
    private _name: string;
    private _cars: Car[];
    private _role: Role;

    constructor(id: number, name: string, cars: Car[], role: Role) {
      this._id = id;
      this._name = name;
      this._cars = cars;
      this._role = role;
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

    get cars(): Car[] {
      return this._cars;
    }
    set cars(cars: Car[]) {
      this._cars = cars;
    }

    get role(): Role {
      return this._role;
    }
    set role(role: Role) {
      this._role = role;
    }
  }


  class Car {
    private _id: number;
    private _make: string;
    private _model: string;
    private _year: number;

    constructor(id: number, make: string, model: string, year: number) {
      this._id = id;
      this._make = make;
      this._model = model;
      this._year = year;
    }

    get id(): number {
      return this._id;
    }
    set id(id: number) {
      this._id = id;
    }

    get make(): string {
      return this._make;
    }
    set make(make: string) {
      this._make = make;
    }

    get model(): string {
      return this._model;
    }
    set model(model: string) {
      this._make = model;
    }

    get year(): number {
      return this._year;
    }
    set year(year: number) {
      this._year = year;
    }
  }


  interface Role {
    id: number;
    name: string;
  }

});
