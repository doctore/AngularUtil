import { Function1 } from '../function1.type';
import { AssertUtil, ObjectUtil } from '@app-core/util';


/**
 * Union type of {@link FUnaryOperator} and {@link UnaryOperator}
 */
export type TUnaryOperator<T> = FUnaryOperator<T> | UnaryOperator<T>;


/**
 * Represents the function approach of a function that accepts one argument and produces a result of the same type.
 *
 * @typeParam<T>
 *   Type of the input and result of {@link FUnaryOperator}
 */
export type FUnaryOperator<T> =
  (t: T) => T;


/**
 * Verifies if the given `input` is potentially an instance of {@link FUnaryOperator}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FUnaryOperator}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FUnaryOperator},
 *         `false` otherwise
 */
export function isFUnaryOperator<T>(input?: any): input is FUnaryOperator<T> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    1 === input.length;
}




/**
 *    Represents an operation on a single operand that produces a result of the same type as its operand. This is a
 * specialization of {@link Function1} for the case where the operand and result are of the same type.
 *
 * @typeParam <T>
 *   Type of the input and result of {@link UnaryOperator}
 */
export class UnaryOperator<T> extends Function1<T, T> {

  protected constructor(protected override readonly mapper: FUnaryOperator<T>) {
    super(mapper);
  }


  /**
   * Returns a {@link UnaryOperator} that always returns its input argument.
   */
  static override identity = <T>(): UnaryOperator<T> =>
    new UnaryOperator((t: T) => t);


  /**
   * Verifies if the given `input` is an instance of {@link UnaryOperator}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link UnaryOperator},
   *         `false` otherwise
   */
  static isUnaryOperator = <T>(input?: any): input is UnaryOperator<T> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as UnaryOperator<T>).andThen &&
    undefined !== (input as UnaryOperator<T>).apply &&
    undefined !== (input as UnaryOperator<T>).compose &&
    undefined !== (input as UnaryOperator<T>).getMapper &&
    isFUnaryOperator((input as UnaryOperator<T>).getMapper());


  static override of<T>(func: FUnaryOperator<T>): UnaryOperator<T>;
  static override of<T>(func: TUnaryOperator<T>): UnaryOperator<T>;

  /**
   * Returns a {@link UnaryOperator} based on provided {@link TUnaryOperator} parameter.
   *
   * @param func
   *    {@link TUnaryOperator} instance to convert to a {@link UnaryOperator} one
   *
   * @return {@link UnaryOperator} based on provided {@link TUnaryOperator}
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static override of<T>(func: TUnaryOperator<T>): UnaryOperator<T> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return UnaryOperator.isUnaryOperator<T>(func)
      ? func
      : new UnaryOperator(func);
  }

}
