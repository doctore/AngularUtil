import { ObjectUtil } from '@app-core/util';
import { Nullable, NullableOrUndefined } from '@app-core/types';
import { Function0, isFFunction0, TFunction0 } from '@app-core/types/function';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * Helper functions to validate given information.
 */
export class AssertUtil {

  constructor() {
    throw new SyntaxError('AssertUtil is an utility class');
  }


  /**
   * Checks if the given {@code value} is {@code undefined} or {@code null}.
   *
   * @param value
   *    Value to check
   * @param message
   *    Custom message to include more information about the error
   *
   * @return {@code true} if it is neither {@code undefined} nor {@code null},
   *         {@link IllegalArgumentError} otherwise
   *
   * @throws {@link IllegalArgumentError} if {@code value} is {@code undefined} or {@code null}
   */
  static notNullOrUndefined(value: NullableOrUndefined<any>,
                            message?: Nullable<string>): boolean;


  /**
   * Checks if the given {@code value} is {@code undefined} or {@code null}.
   *
   * @param value
   *    Value to check
   * @param errorSupplier
   *    {@link TFunction0} used to provide the returned {@link Error}
   *
   * @return {@code true} if it is neither {@code undefined} nor {@code null},
   *         if {@code value} is {@code undefined} or {@code null}:
   *            Custom {@link Error} if {@code errorSupplier} is defined,
   *            {@link IllegalArgumentError} otherwise
   *
   * @throws if {@code value} is {@code undefined} or {@code null}: custom {@link Error} if {@code errorSupplier} is defined,
   *         {@link IllegalArgumentError} otherwise
   */
  static notNullOrUndefined(value: NullableOrUndefined<any>,
                            errorSupplier?: Nullable<TFunction0<Error>>): boolean;


  static notNullOrUndefined(value: NullableOrUndefined<any>,
                            errorSupplierOrMessage?: Nullable<TFunction0<Error> | string>): boolean {
    if (ObjectUtil.nonNullOrUndefined(value)) {
      return true;
    }
    if (Function0.isFunction(errorSupplierOrMessage)) {
      throw errorSupplierOrMessage.apply();
    }
    if (isFFunction0(errorSupplierOrMessage)) {
      throw Function0.of(errorSupplierOrMessage).apply();
    }
    throw new IllegalArgumentError(
      errorSupplierOrMessage
        ? errorSupplierOrMessage
        : 'value is null or undefined'
    );
  }

}
