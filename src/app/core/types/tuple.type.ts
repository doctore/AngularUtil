/**
 * The base class of all tuples.
 */
export abstract class Tuple {

  /**
   * The maximum {@link this#arity()} developed. Currently {@code 5} related with {@link Tuple5}.
   */
  static MAX_ALLOWED_ARITY = 5;


  /**
   * Returns the number of elements of this tuple.
   *
   * @return the number of elements.
   */
  abstract arity(): number;


  /**
   * Creates a {@link Tuple} of one element.
   *
   * @param t1
   *    The 1st element
   *
   * @return {@link Tuple1}
   */
  static ofT1 = <T1>(t1: T1): Tuple1<T1> =>
    Tuple1.of(t1);


  /**
   * Creates a {@link Tuple} of two elements.
   *
   * @param t1
   *    The 1st element
   * @param t2
   *    The 2nd element
   *
   * @return {@link Tuple2}
   */
  static ofT2 = <T1, T2>(t1: T1,
                         t2: T2): Tuple2<T1, T2> =>
    Tuple2.of(t1, t2);



  /**
   * Creates a {@link Tuple} of three elements.
   *
   * @param t1
   *    The 1st element
   * @param t2
   *    The 2nd element
   * @param t3
   *    The 3rd element
   *
   * @return {@link Tuple3}
   */
  static ofT3 = <T1, T2, T3>(t1: T1,
                             t2: T2,
                             t3: T3): Tuple3<T1, T2, T3> =>
    Tuple3.of(t1, t2, t3);


  /**
   * Creates a {@link Tuple} of four elements.
   *
   * @param t1
   *    The 1st element
   * @param t2
   *    The 2nd element
   * @param t3
   *    The 3rd element
   * @param t4
   *    The 4th element
   *
   * @return {@link Tuple4}
   */
  static ofT4 = <T1, T2, T3, T4>(t1: T1,
                                 t2: T2,
                                 t3: T3,
                                 t4: T4): Tuple4<T1, T2, T3, T4> =>
    Tuple4.of(t1, t2, t3, t4);


  /**
   * Creates a {@link Tuple} of five elements.
   *
   * @param t1
   *    The 1st element
   * @param t2
   *    The 2nd element
   * @param t3
   *    The 3rd element
   * @param t4
   *    The 4th element
   * @param t5
   *    The 5th element
   *
   * @return {@link Tuple5}
   */
  static ofT5 = <T1, T2, T3, T4, T5>(t1: T1,
                                     t2: T2,
                                     t3: T3,
                                     t4: T4,
                                     t5: T5): Tuple5<T1, T2, T3, T4, T5> =>
    Tuple5.of(t1, t2, t3, t4, t5);

}




/**
 * A {@link Tuple} of one element.
 *
 * @typeParam <T1>
 *    Type of the 1st element
 */
export class Tuple1<T1> extends Tuple {

  private constructor(public readonly _1: T1) {
    super();
  }


  /**
   * Returns a new instance of {@link Tuple1}.
   *
   * @param t1
   *    Internal value of the {@link Tuple1}
   *
   * @return {@link Tuple1}
   */
  static of = <T1>(t1: T1): Tuple1<T1> =>
    new Tuple1(t1);


  override arity = (): number =>
    1;

}




/**
 * A {@link Tuple} of two elements.
 *
 * @typeParam <T1>
 *    Type of the 1st element
 * @typeParam <T2>
 *    Type of the 2nd element
 */
export class Tuple2<T1, T2> extends Tuple {

  private constructor(public readonly _1: T1,
                      public readonly _2: T2) {
    super();
  }


  /**
   * Returns a new instance of {@link Tuple2}.
   *
   * @param t1
   *    First internal value of the {@link Tuple2}
   * @param t2
   *    Second internal value of the {@link Tuple2}
   *
   * @return {@link Tuple2}
   */
  static of = <T1, T2>(t1: T1,
                       t2: T2): Tuple2<T1, T2> =>
    new Tuple2(t1, t2);


  override arity = (): number =>
    2;

}




/**
 * A {@link Tuple} of three elements.
 *
 * @typeParam <T1>
 *    Type of the 1st element
 * @typeParam <T2>
 *    Type of the 2nd element
 * @typeParam <T3>
 *    Type of the 3rd element
 */
export class Tuple3<T1, T2, T3> extends Tuple {

  private constructor(public readonly _1: T1,
                      public readonly _2: T2,
                      public readonly _3: T3) {
    super();
  }


  /**
   * Returns a new instance of {@link Tuple3}.
   *
   * @param t1
   *    First internal value of the {@link Tuple3}
   * @param t2
   *    Second internal value of the {@link Tuple3}
   * @param t3
   *    Third internal value of the {@link Tuple3}
   *
   * @return {@link Tuple3}
   */
  static of = <T1, T2, T3>(t1: T1,
                           t2: T2,
                           t3: T3): Tuple3<T1, T2, T3> =>
    new Tuple3(t1, t2, t3);


  override arity = (): number =>
    3;

}




/**
 * A {@link Tuple} of four elements.
 *
 * @typeParam <T1>
 *    Type of the 1st element
 * @typeParam <T2>
 *    Type of the 2nd element
 * @typeParam <T3>
 *    Type of the 3rd element
 * @typeParam <T4>
 *    Type of the 4th element
 */
export class Tuple4<T1, T2, T3, T4> extends Tuple {

  private constructor(public readonly _1: T1,
                      public readonly _2: T2,
                      public readonly _3: T3,
                      public readonly _4: T4) {
    super();
  }


  /**
   * Returns a new instance of {@link Tuple4}.
   *
   * @param t1
   *    First internal value of the {@link Tuple4}
   * @param t2
   *    Second internal value of the {@link Tuple4}
   * @param t3
   *    Third internal value of the {@link Tuple4}
   * @param t4
   *    Fourth internal value of the {@link Tuple4}
   *
   * @return {@link Tuple4}
   */
  static of = <T1, T2, T3, T4>(t1: T1,
                               t2: T2,
                               t3: T3,
                               t4: T4): Tuple4<T1, T2, T3, T4> =>
    new Tuple4(t1, t2, t3, t4);


  override arity = (): number =>
    4;

}




/**
 * A {@link Tuple} of four elements.
 *
 * @typeParam <T1>
 *    Type of the 1st element
 * @typeParam <T2>
 *    Type of the 2nd element
 * @typeParam <T3>
 *    Type of the 3rd element
 * @typeParam <T4>
 *    Type of the 4th element
 * @typeParam <T5>
 *    Type of the 5th element
 */
export class Tuple5<T1, T2, T3, T4, T5> extends Tuple {

  private constructor(public readonly _1: T1,
                      public readonly _2: T2,
                      public readonly _3: T3,
                      public readonly _4: T4,
                      public readonly _5: T5) {
    super();
  }


  /**
   * Returns a new instance of {@link Tuple5}.
   *
   * @param t1
   *    First internal value of the {@link Tuple5}
   * @param t2
   *    Second internal value of the {@link Tuple5}
   * @param t3
   *    Third internal value of the {@link Tuple5}
   * @param t4
   *    Fourth internal value of the {@link Tuple5}
   * @param t5
   *    Fifth internal value of the {@link Tuple5}
   *
   * @return {@link Tuple2}
   */
  static of = <T1, T2, T3, T4, T5>(t1: T1,
                                   t2: T2,
                                   t3: T3,
                                   t4: T4,
                                   t5: T5): Tuple5<T1, T2, T3, T4, T5> =>
    new Tuple5(t1, t2, t3, t4, t5);


  override arity = (): number =>
    5;

}
