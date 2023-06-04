import { Nullable, Optional, Try } from '@app-core/types';
import * as _ from 'lodash';

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
   * Transforms the given JSON-formatted {@code json} into an instance of type {@code T}.
   *
   * @param json
   *    JSON-formatted string to transform
   *
   * @return an instance of type {@code T} if the {@code json} could be converted,
   *         {@code undefined} otherwise
   */
  static fromJSON = <T>(json?: Nullable<string>): T | undefined => {
    if (!_.isNil(json)) {
      const tryFromJson = Try.ofFunction0<T>(
        () => JSON.parse(json)
      );
      return tryFromJson.isSuccess() && !_.isNil(tryFromJson.get())
        ? tryFromJson.get()!
        : undefined;
    }
    return undefined;
  }


  /**
   * Transforms the given JSON-formatted {@code json} into an instance of type {@code T}.
   *
   * @param json
   *    JSON-formatted string to transform
   *
   * @return an instance of type {@code T} if the {@code json} could be converted,
   *         {@code undefined} otherwise
   *
   * @return {@link Optional#empty} if given {@code json} could be converted,
   *         {@link Optional#empty} otherwise
   */
  static fromJSONOptional = <T>(json?: Nullable<string>): Optional<T> =>
    Optional.ofNullable(
      this.fromJSON(
        json
      )
    );

}
