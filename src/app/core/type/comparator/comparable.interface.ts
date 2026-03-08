/**
 *    Imposes a total ordering on the objects of each class that implements it. This ordering is referred to as the
 * class's natural ordering, and the class's `compareTo` method is referred to as its natural comparison method.
 *
 * @typeParam <T>
 *   Type of the inputs of {@link Comparable}
 */
export interface Comparable<T> {

  /**
   * Compares `this` object with the given `other` for order, returning:
   * <p>
   *      > 0    `this` is greater than `other`
   * <p>
   *      < 0    `this` is less than `other`
   * <p>
   *        0    `this` is equal to `other`
   *
   * @param other
   *    Object to compare
   *
   * @return negative number, zero, or a positive number as `this` object is less than, equal to, or greater than `other`
   */
  compareTo(other: T): number;

}
