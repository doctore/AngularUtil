import { ObjectUtil } from '@app-core/util';
import { Nullable } from '@app-core/types';

/**
 * Helper functions to manage strings.
 */
export class StringUtil {

  constructor() {
    throw new SyntaxError('StringUtil is an utility class');
  }


  /**
   * Verifies if the given {@code input} is an empty string.
   *
   * @param inputToCheck
   *    String to verify
   *
   * @return {@code true} if {@code input} is {@code undefined}, {@code null} or has only blank characters
   */
  static isEmpty = (inputToCheck?: Nullable<string>): boolean =>
    ObjectUtil.isNullOrUndefined(inputToCheck)
      ? true
      : 0 == inputToCheck.trim().length;

}
