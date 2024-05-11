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
   * Checks if the given `value` is `true`.
   *
   * @param value
   *    Value to check
   * @param message
   *    Custom message to include more information about the error
   *
   * @return `true` if `value` is `true`,
   *         {IllegalArgumentError} if `value` is `undefined`, `null` or `false`
   *
   * @throws {IllegalArgumentError} if `value` is `undefined`, `null` or `false`
   */
  static isTrue(value: NullableOrUndefined<boolean>,
                message?: Nullable<string>): boolean;


  /**
   * Checks if the given `value` is `true`.
   *
   * @param value
   *    Value to check
   * @param errorSupplier
   *    {@link TFunction0} used to provide the returned {@link Error}
   *
   * @return `true` if `value` is `true`,
   *         {IllegalArgumentError} if `value` is `null` or `undefined`
   *         if `value` is `false`:
   *            Custom {@link Error} if `errorSupplier` is defined,
   *            {IllegalArgumentError} otherwise
   *
   * @throws {IllegalArgumentError} if `value` is `undefined`, `null` or `false`
   */
  static isTrue(value: NullableOrUndefined<boolean>,
                errorSupplier?: Nullable<TFunction0<Error>>): boolean;


  static isTrue(value: NullableOrUndefined<boolean>,
                errorSupplierOrMessage?: Nullable<TFunction0<Error> | string>): boolean {
    if (value) {
      return true;
    }
    AssertUtil.notNullOrUndefined(
      value,
      'value is null or undefined'
    );
    if (Function0.isFunction(errorSupplierOrMessage) || isFFunction0(errorSupplierOrMessage)) {
      throw Function0.of(errorSupplierOrMessage)
        .apply();
    }
    throw new IllegalArgumentError(
      errorSupplierOrMessage
        ? errorSupplierOrMessage
        : 'value is false'
    );
  }


  /**
   * Checks if the given `value` is `undefined` or `null`.
   *
   * @param value
   *    Value to check
   * @param message
   *    Custom message to include more information about the error
   *
   * @return `true` if it is neither `undefined` nor `null`,
   *         {IllegalArgumentError} otherwise
   *
   * @throws {IllegalArgumentError} if `value` is `undefined` or `null`
   */
  static notNullOrUndefined(value: NullableOrUndefined<any>,
                            message?: Nullable<string>): boolean;


  /**
   * Checks if the given `value` is `undefined` or `null`.
   *
   * @param value
   *    Value to check
   * @param errorSupplier
   *    {@link TFunction0} used to provide the returned {@link Error}
   *
   * @return `true` if it is neither `undefined` nor `null`,
   *         if `value` is `undefined` or `null`:
   *            Custom {@link Error} if `errorSupplier` is defined,
   *            {IllegalArgumentError} otherwise
   *
   * @throws if `value` is `undefined` or `null`: custom {@link Error} if `errorSupplier` is defined,
   *         {IllegalArgumentError} otherwise
   */
  static notNullOrUndefined(value: NullableOrUndefined<any>,
                            errorSupplier?: Nullable<TFunction0<Error>>): boolean;


  static notNullOrUndefined(value: NullableOrUndefined<any>,
                            errorSupplierOrMessage?: Nullable<TFunction0<Error> | string>): boolean {
    if (ObjectUtil.nonNullOrUndefined(value)) {
      return true;
    }
    if (Function0.isFunction(errorSupplierOrMessage) || isFFunction0(errorSupplierOrMessage)) {
      throw Function0.of(errorSupplierOrMessage)
        .apply();
    }
    throw new IllegalArgumentError(
      errorSupplierOrMessage
        ? errorSupplierOrMessage
        : 'value is null or undefined'
    );
  }

}
