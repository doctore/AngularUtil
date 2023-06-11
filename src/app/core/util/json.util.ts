import { Nullable } from '@app-core/types';

/**
 * Helper functions to manage common operations related with JSON.
 */
export class JsonUtil {

  constructor() {
    throw new SyntaxError('JsonUtil is an utility class');
  }


  /**
   * Returns an empty JSON-formatted string.
   */
  static EMPTY: string = '{}';


  /**
   * Returns an empty array of a JSON-formatted string.
   */
  static EMPTY_ARRAY: string = '[]';


  /**
   * Transforms the given JSON-formatted {@code jsonArray} into an array of instances of type {@code T} .
   *
   * @param jsonArray
   *    JSON-formatted string to transform
   *
   * @return an array of instances of type {@code T}  if the {@code jsonArray} could be converted,
   *         an empty array if {@code jsonArray} is {@code undefined}
   */
  static arrayFromJSON = <T>(jsonArray?: Nullable<string>): T[] => {
    const finalJsonArray = jsonArray || JsonUtil.EMPTY_ARRAY;
    return JSON.parse(finalJsonArray) as T[];
  }


  /**
   * Converts the incoming {@code array} into a JSON-formatted string.
   *
   * @param array
   *    Array to convert to a JSON-formatted string
   *
   * @return string with JSON-formatted if the {@code array} could be converted,
   *         an empty array JSON representation if {@code array} is {@code undefined}
   */
  static arrayToJSON = <T>(array?: Nullable<T[]>): string => {
    const finalArray = array || [];
    return JSON.stringify(finalArray);
  }


  /**
   *    Converts the incoming {@code object} into a JSON-formatted string. This method is the right option instead of
   * {@link JsonUtil#toJSON} if:
   *
   *  1. {@code object} belongs to a class instance whose properties were defined using "_" as a prefix.
   *  2. Typescript getter/setter accessors were added into the class' definition.
   *
   * <pre>
   * Example:
   *
   *   class User {
   *      private _id: number;
   *      private _name: string;
   *
   *      constructor(id: string, name: string) {
   *         this._id = id;
   *         this._name = name;
   *      }
   *
   *      get id(): number {
   *         return this._id;
   *      }
   *      set id(id: number) {
   *         this._id = id;
   *      }
   *
   *      get name(): string {
   *         return this._name;
   *      }
   *      set name(name: string) {
   *         this._name = name;
   *      }
   *   }
   *
   *   let user = new User(1, 'test name');
   *   JsonUtil.fromClassInstanceToJSON(user);   // {"id": 1, "name": "test name"}
   * </pre>
   *
   * @param object
   *    Object to convert to a JSON-formatted string
   *
   * @return string with JSON-formatted if the object could be converted,
   *         an empty JSON if {@code object} is {@code null} or {@code undefined}
   */
  static fromClassInstanceToJSON<T>(object?: Nullable<T>): string {
    if (object) {
      return JSON.stringify(
        object,
        (_, value) => {
          return value &&
                 typeof value === 'object' &&
                 !Array.isArray(value)
            ? Object.fromEntries(
                Object.entries(value)
                  .map(([key, value]) => {
                    if (key.startsWith('_')) {
                      return [key.slice(1), value]
                    }
                    return [key, value];
                  })
              )
            : value;
        }
      );
    }
    return JsonUtil.EMPTY;
  }


  /**
   * Transforms the given JSON-formatted {@code json} into an instance of type {@code T}.
   *
   * @param json
   *    JSON-formatted string to transform
   *
   * @return an instance of type {@code T} if the {@code json} could be converted.
   *
   * @throws {@link SyntaxError} if provided {@code json} is not a valid JSON-formatted string
   */
  static fromJSON = <T>(json?: Nullable<string>): T => {
    const finalJson = json || JsonUtil.EMPTY;
    return JSON.parse(finalJson) as T;
  }


  /**
   * Converts the incoming {@code object} into a JSON-formatted string.
   *
   * @param object
   *    Object to convert to a JSON-formatted string
   *
   * @return string with JSON-formatted if the {@code object} could be converted,
   *         an empty JSON if {@code object} is {@code null} or {@code undefined}
   */
  static toJSON = <T>(object?: Nullable<T>): string => {
    return object
      ? JSON.stringify(object)
      : JsonUtil.EMPTY;
  }

}
