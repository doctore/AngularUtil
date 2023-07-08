import { Function2 } from '@app-core/types/function';
import { AssertUtil, ObjectUtil } from '@app-core/util';


/**
 * Union type of {@link FBinaryOperator} and {@link BinaryOperator}
 */
export type TBinaryOperator<T> = FBinaryOperator<T> | BinaryOperator<T>;


/**
 * Represents the function approach of a function that accepts two arguments and produces a result of the same type.
 *
 * @typeParam<T>
 *   Type of the inputs and result of {@link FBinaryOperator}
 */
export type FBinaryOperator<T> =
  (t1: T,
   t2: T) => T;


/**
 * Verifies if the given `input` is potentially an instance of {@link FBinaryOperator}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FBinaryOperator}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FBinaryOperator},
 *         `false` otherwise
 */
export function isFBinaryOperator<T>(input?: any): input is FBinaryOperator<T> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    2 === input.length;
}




/**
 *    Represents an operation upon two operands of the same type, producing a result of the same type as the operands. This is a
 * specialization of {@link Function2} for the case where the operands and result are of the same type.
 *
 * @typeParam <T>
 *   Type of the input and result of {@link BinaryOperator}
 */
export class BinaryOperator<T> extends Function2<T, T, T> {

  protected constructor(protected override readonly mapper: FBinaryOperator<T>) {
    super(mapper);
  }


  /**
   * Verifies if the given `input` is an instance of {@link BinaryOperator}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link BinaryOperator},
   *         `false` otherwise
   */
  static isBinaryOperator = <T>(input?: any): input is BinaryOperator<T> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as BinaryOperator<T>).andThen &&
    undefined !== (input as BinaryOperator<T>).apply &&
    undefined !== (input as BinaryOperator<T>).getMapper &&
    isFBinaryOperator((input as BinaryOperator<T>).getMapper());


  static override of<T>(func: FBinaryOperator<T>): BinaryOperator<T>;
  static override of<T>(func: TBinaryOperator<T>): BinaryOperator<T>;

  /**
   * Returns a {@link BinaryOperator} based on provided {@link TBinaryOperator} parameter.
   *
   * @param func
   *    {@link TBinaryOperator} instance to convert to a {@link BinaryOperator} one
   *
   * @return {@link BinaryOperator} based on provided {@link TBinaryOperator}
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static override of<T>(func: TBinaryOperator<T>): BinaryOperator<T> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return BinaryOperator.isBinaryOperator<T>(func)
      ? func
      : new BinaryOperator(func);
  }

}
