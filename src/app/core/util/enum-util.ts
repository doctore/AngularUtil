import { EnumLike, EnumValues, NullableOrUndefined, OrUndefined } from '@app-core/type';
import { Optional } from '@app-core/type/functional';
import { AssertUtil } from '@app-core/util';
import { IllegalArgumentError } from '@app-core/error';

/**
 * Helper functions to manage enums.
 */
export class EnumUtil {

  constructor() {
    throw new SyntaxError('EnumUtil is an utility class');
  }


  /**
   *    Gets the value included in the provided enum equivalent type `enumObj` whose key matches with `enumKey`. This
   * method compares the keys of `enumObj` without regard to case.
   *
   * @param enumObj
   *    Instance of {@link EnumLike} to query
   * @param enumKey
   *    Key of `enumObj` to search
   *
   * @return {@link EnumValues} containing the first value with a key that matches with `enumKey`,
   *         `undefined` otherwise
   */
  static getValueByKeyIgnoreCase<E extends EnumLike>(enumObj: NullableOrUndefined<E>,
                                                     enumKey: NullableOrUndefined<string>): OrUndefined<EnumValues<E>> {
    if (enumObj == null || enumKey == null) {
      return undefined;
    }
    const keyFound = Object.keys(enumObj)
      .find(key =>
        Number.isNaN(
          Number(key)
        ) &&
        key.toLowerCase() === enumKey.toLowerCase()
      );
    return keyFound
      ? enumObj[keyFound as keyof E]
      : undefined;
  }


  /**
   *    Returns an {@link Optional} with the value included in the provided enum equivalent type `enumObj` whose key matches
   * with `enumKey`. This method compares the keys of `enumObj` without regard to case.
   *
   * @param enumObj
   *    Instance of {@link EnumLike} to query
   * @param enumKey
   *    Key of `enumObj` to search
   *
   * @return {@link Optional} with the {@link EnumValues} containing the first value with a key that matches with `enumKey`,
   *         {@link Optional#empty} otherwise
   */
  static getValueByKeyIgnoreCaseOptional<E extends EnumLike>(enumObj: NullableOrUndefined<E>,
                                                             enumKey: NullableOrUndefined<string>): Optional<EnumValues<E>> {
    return Optional.ofNullable(
      this.getValueByKeyIgnoreCase(
        enumObj,
        enumKey
      )
    );
  }


  /**
   *   Gets the value included in the provided enum equivalent type `enumObj` whose key matches with `enumKey`. This
   * method compares the keys of `enumObj` without regard to case.
   *
   * @param enumObj
   *    Instance of {@link EnumLike} to query
   * @param enumKey
   *    Key of `enumObj` to search
   *
   * @return {@link EnumValues} containing the first value with a key that matches with `enumKey`,
   *
   * @throws {IllegalArgumentError} if `enumObj` or `enumKey` are `null` or `undefined`, or there is no a key in `enumObj`
   *                                that matches with `enumKey`
   */
  static getValueByKeyIgnoreCaseOrThrow<E extends EnumLike>(enumObj: NullableOrUndefined<E>,
                                                            enumKey: NullableOrUndefined<string>): EnumValues<E> {
    AssertUtil.notNullOrUndefined(
      enumObj,
      'enumObj must be not null and not undefined'
    );
    AssertUtil.notNullOrUndefined(
      enumKey,
      'enumKey must be not null and not undefined'
    );
    const result = this.getValueByKeyIgnoreCase(
      enumObj,
      enumKey
    );
    if (!result) {
      throw new IllegalArgumentError(
        `No enum key matches case-insensitively with ${enumKey}`
      );
    }
    return result;
  }


  /**
   * Returns an array with the values included in the provided enum equivalent type `enumObj`.
   *
   * @param enumObj
   *    {@link EnumLike} with the values to extract
   *
   * @return an array with the values included in `enumObj` or empty one if `enumObj` is `null` or `undefined`
   */
  static getValues<E extends EnumLike>(enumObj: NullableOrUndefined<E>): EnumValues<E>[] {
    return enumObj
      ? Object.keys(enumObj)
          .filter(key =>
            Number.isNaN(
              Number(key)
            )
          )
          .map(key =>
            enumObj[key as keyof E]
          )
      : [];
  }

}
