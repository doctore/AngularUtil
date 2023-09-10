import { AssertUtil, ObjectUtil } from '@app-core/util';

/**
 * Union type of {@link FComparator} and {@link Comparator}
 */
export type TComparator<T> = FComparator<T> | Comparator<T>;


/**
 * Represents the function approach of a function that accepts two arguments of the same type and returns a `number` value.
 *
 * @typeParam<T>
 *   Type of the inputs of {@link FComparator}
 */
export type FComparator<T> =
  (t1: T,
   t2: T) => number;


/**
 * Verifies if the given `input` is potentially an instance of {@link FComparator}.
 * <p>
 *    It is important to know `input` could be 'something' different from {@link FComparator}. To improve
 * the performance:
 * <p>
 *   1. Its type has been compared to a function.
 *   2. Check its number of parameters, however the default ones are not considered by the `length` function.
 *
 * @param input
 *    Object to verify
 *
 * @return `true` if `input` is potentially an instance of {@link FComparator},
 *         `false` otherwise
 */
export function isFComparator<T>(input?: any): input is FComparator<T> {
  return ObjectUtil.nonNullOrUndefined(input) &&
    'function' === typeof input &&
    2 === input.length;
}




/**
 *    A comparison function, which imposes a total ordering on some collection of objects. Comparators can be passed to
 * a `sort`, `min`, `max` methods to allow precise control over the sort order.
 * <p>
 *    Returned `number` specifies the order of provided parameters `(a, b)` and should verify the formula:
 * <p>
 *      > 0    sort `a` after `b`, e.g. [b, a]      (`b` is less than `a`)
 * <p>
 *      < 0    sort `a` before `b`, e.g. [a, b]     (`b` is greater than `a`)
 * <p>
 *        0    keep original order of `a` and `b`   (`b` is equals to `a`)
 *
 * @typeParam <T>
 *   Type of the inputs of {@link Comparator}
 */
export class Comparator<T> {

  protected constructor(protected readonly comparator: FComparator<T>) {}


  /**
   * Returns a null-undefined-friendly {@link Comparator} that considers `null` and `undefined` to be less than `non-null`.
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static nullOrUndefinedFirst = <T>(func: TComparator<T>): Comparator<T> =>
    new Comparator<T>((a: T, b: T) => {
      const finalComparator = Comparator.of(func);
      const isANullOrUndefined = ObjectUtil.isNullOrUndefined(a);
      const isBNullOrUndefined = ObjectUtil.isNullOrUndefined(b);

      if (!isANullOrUndefined && !isBNullOrUndefined) {
        return finalComparator.compare(a, b);
      }
      return isANullOrUndefined
        ? isBNullOrUndefined
          ? 0
          : -1
        : 1;
    });


  /**
   * Returns a null-undefined-friendly {@link Comparator} that considers `null` and `undefined` to be greater than `non-null`.
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static nullOrUndefinedLast = <T>(func: TComparator<T>): Comparator<T> =>
    new Comparator<T>((a: T, b: T) => {
      const finalComparator = Comparator.of(func);
      const isANullOrUndefined = ObjectUtil.isNullOrUndefined(a);
      const isBNullOrUndefined = ObjectUtil.isNullOrUndefined(b);

      if (!isANullOrUndefined && !isBNullOrUndefined) {
        return finalComparator.compare(a, b);
      }
      return isANullOrUndefined
        ? isBNullOrUndefined
          ? 0
          : 1
        : -1;
    });


  /**
   * Verifies if the given `input` is an instance of {@link Comparator}.
   *
   * @param input
   *    Object to verify
   *
   * @return `true` if `input` is an instance of {@link Comparator},
   *         `false` otherwise
   */
  static isComparator = <T>(input?: any): input is Comparator<T> =>
    ObjectUtil.nonNullOrUndefined(input) &&
    undefined !== (input as Comparator<T>).compare &&
    undefined !== (input as Comparator<T>).getComparator &&
    isFComparator((input as Comparator<T>).getComparator());


  static of<T>(func: FComparator<T>): Comparator<T>;
  static of<T>(func: TComparator<T>): Comparator<T>;

  /**
   * Returns a {@link Comparator} based on provided {@link TComparator} parameter.
   *
   * @param func
   *    {@link TComparator} instance to convert to a {@link Comparator} one
   *
   * @return {@link Comparator} based on provided {@link TComparator}
   *
   * @throws {@link IllegalArgumentError} if `func` is `null` or `undefined`
   */
  static of<T>(func: TComparator<T>): Comparator<T> {
    AssertUtil.notNullOrUndefined(
      func,
      'func must be not null and not undefined'
    );
    return Comparator.isComparator<T>(func)
      ? func
      : new Comparator(func);
  }


  /**
   * Applies this {@link Comparator} to the given arguments.
   *
   * @param a
   *    The first input argument
   * @param b
   *    The second input argument
   *
   * @return `number` representing the ordering between `a` and `b`
   */
  compare = (a: T,
             b: T): number =>
    this.comparator(a, b);


  /**
   * Returns internal `comparator`.
   *
   * @return {@link FComparator}
   */
  getComparator = (): FComparator<T> =>
    this.comparator;


  /**
   * Applies the reverse ordering of `this` {@link Comparator}.
   *
   * @param a
   *    The first input argument
   * @param b
   *    The second input argument
   *
   * @return `number` representing the reversed ordering between `a` and `b`
   */
  reversed = (a: T,
              b: T): number => {
    const comparison = this.comparator(a, b);
    return 0 == comparison
      ? comparison
      : -comparison;
  }

}
