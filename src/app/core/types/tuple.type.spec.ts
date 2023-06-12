import { Nullable, NullableOrUndefined, Tuple, Tuple1, Tuple2, Tuple3, Tuple4, Tuple5 } from '@app-core/types';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/tuple.type.spec.ts
 */
describe('Tuple', () => {


  describe('ofT1', () => {

    it('when a value is given then Tuple1 instance is returned', () => {
      const intValue = 11;
      const stringValue = '19';

      expect(Tuple.ofT1<NullableOrUndefined<number>>(undefined)._1).toBeUndefined();
      expect(Tuple.ofT1<Nullable<number>>(null)._1).toBeNull();

      expect(Tuple.ofT1(intValue)._1).toEqual(intValue);
      expect(Tuple.ofT1(stringValue)._1).toEqual(stringValue);
    });

  });



  describe('ofT2', () => {

    it('when values are given then Tuple2 instance is returned', () => {
      const intValue = 11;
      const stringValue = '19';

      expect(Tuple.ofT2<NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined)._1).toBeUndefined();
      expect(Tuple.ofT2<NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined)._2).toBeUndefined();

      expect(Tuple.ofT2<Nullable<number>, Nullable<string>>(null, null)._1).toBeNull();
      expect(Tuple.ofT2<Nullable<number>, Nullable<string>>(null, null)._2).toBeNull();

      expect(Tuple.ofT2(intValue, stringValue)._1).toEqual(intValue);
      expect(Tuple.ofT2(stringValue, stringValue)._2).toEqual(stringValue);
    });

  });



  describe('ofT3', () => {

    it('when values are given then Tuple3 instance is returned', () => {
      const intValue = 11;
      const stringValue = '19';
      const booleanValue = true;

      expect(Tuple.ofT3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>>(undefined, undefined, undefined)._1).toBeUndefined();
      expect(Tuple.ofT3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>>(undefined, undefined, undefined)._2).toBeUndefined();
      expect(Tuple.ofT3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>>(undefined, undefined, undefined)._3).toBeUndefined();

      expect(Tuple.ofT3<Nullable<number>, Nullable<string>, Nullable<boolean>>(null, null, null)._1).toBeNull();
      expect(Tuple.ofT3<Nullable<number>, Nullable<string>, Nullable<boolean>>(null, null, null)._2).toBeNull();
      expect(Tuple.ofT3<Nullable<number>, Nullable<string>, Nullable<boolean>>(null, null, null)._3).toBeNull();

      expect(Tuple.ofT3(intValue, stringValue, booleanValue)._1).toEqual(intValue);
      expect(Tuple.ofT3(stringValue, stringValue, booleanValue)._2).toEqual(stringValue);
      expect(Tuple.ofT3(stringValue, stringValue, booleanValue)._3).toEqual(booleanValue);
    });

  });



  describe('ofT4', () => {

    it('when values are given then Tuple4 instance is returned', () => {
      const intValue1 = 11;
      const intValue2 = 15;
      const stringValue = '19';
      const booleanValue = true;

      expect(Tuple.ofT4<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>>(undefined, undefined, undefined, undefined)._1).toBeUndefined();
      expect(Tuple.ofT4<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>>(undefined, undefined, undefined, undefined)._2).toBeUndefined();
      expect(Tuple.ofT4<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>>(undefined, undefined, undefined, undefined)._3).toBeUndefined();
      expect(Tuple.ofT4<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>>(undefined, undefined, undefined, undefined)._4).toBeUndefined();

      expect(Tuple.ofT4<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>>(null, null, null, null)._1).toBeNull();
      expect(Tuple.ofT4<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>>(null, null, null, null)._2).toBeNull();
      expect(Tuple.ofT4<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>>(null, null, null, null)._3).toBeNull();
      expect(Tuple.ofT4<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>>(null, null, null, null)._4).toBeNull();

      expect(Tuple.ofT4(intValue1, stringValue, booleanValue, intValue2)._1).toEqual(intValue1);
      expect(Tuple.ofT4(intValue1, stringValue, booleanValue, intValue2)._2).toEqual(stringValue);
      expect(Tuple.ofT4(intValue1, stringValue, booleanValue, intValue2)._3).toEqual(booleanValue);
      expect(Tuple.ofT4(intValue1, stringValue, booleanValue, intValue2)._4).toEqual(intValue2);
    });

  });



  describe('ofT5', () => {

    it('when values are given then Tuple5 instance is returned', () => {
      const intValue1 = 11;
      const intValue2 = 15;
      const stringValue1 = '19';
      const stringValue2 = 'abc';
      const booleanValue = true;

      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._1).toBeUndefined();
      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._2).toBeUndefined();
      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._3).toBeUndefined();
      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._4).toBeUndefined();
      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._5).toBeUndefined();

      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._1).toBeNull();
      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._2).toBeNull();
      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._3).toBeNull();
      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._4).toBeNull();
      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._5).toBeNull();

      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._1).toEqual(intValue1);
      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._2).toEqual(stringValue1);
      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._3).toEqual(booleanValue);
      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._4).toEqual(intValue2);
      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._5).toEqual(stringValue2);
    });

  });

});




describe('Tuple1', () => {


  describe('arity', () => {

    it('then 1 is returned', () => {
      expect(Tuple1.of<NullableOrUndefined<number>>(undefined).arity()).toEqual(1);
      expect(Tuple1.of<Nullable<number>>(null).arity()).toEqual(1);
      expect(Tuple1.of(12).arity()).toEqual(1);
    });

  });



  describe('of', () => {

    it('when a value is given then Tuple1 instance is returned', () => {
      const intValue = 11;
      const stringValue = '19';

      expect(Tuple1.of<NullableOrUndefined<number>>(undefined)._1).toBeUndefined();
      expect(Tuple1.of<Nullable<number>>(null)._1).toBeNull();

      expect(Tuple1.of(intValue)._1).toEqual(intValue);
      expect(Tuple1.of(stringValue)._1).toEqual(stringValue);
    });

  });

});




describe('Tuple2', () => {


  describe('arity', () => {

    it('then 2 is returned', () => {
      expect(Tuple2.of<NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined).arity()).toEqual(2);
      expect(Tuple2.of<Nullable<number>, Nullable<string>>(null, null).arity()).toEqual(2);
      expect(Tuple2.of(12, 'a').arity()).toEqual(2);
    });

  });



  describe('of', () => {

    it('when a value is given then Tuple2 instance is returned', () => {
      const intValue = 11;
      const stringValue = '19';

      expect(Tuple2.of<NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined)._1).toBeUndefined();
      expect(Tuple2.of<NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined)._2).toBeUndefined();

      expect(Tuple2.of<Nullable<number>, Nullable<string>>(null, null)._1).toBeNull();
      expect(Tuple2.of<Nullable<number>, Nullable<string>>(null, null)._2).toBeNull();

      expect(Tuple.ofT2(intValue, stringValue)._1).toEqual(intValue);
      expect(Tuple.ofT2(stringValue, stringValue)._2).toEqual(stringValue);
    });

  });

});




describe('Tuple3', () => {


  describe('arity', () => {

    it('then 3 is returned', () => {
      expect(Tuple3.of<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>>(undefined, undefined, undefined).arity()).toEqual(3);
      expect(Tuple3.of<Nullable<number>, Nullable<string>, Nullable<boolean>>(null, null, null).arity()).toEqual(3);
      expect(Tuple3.of(12, 'a', true).arity()).toEqual(3);
    });

  });



  describe('of', () => {

    it('when a value is given then Tuple3 instance is returned', () => {
      const intValue = 11;
      const stringValue = '19';
      const booleanValue = true;

      expect(Tuple.ofT3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>>(undefined, undefined, undefined)._1).toBeUndefined();
      expect(Tuple.ofT3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>>(undefined, undefined, undefined)._2).toBeUndefined();
      expect(Tuple.ofT3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>>(undefined, undefined, undefined)._3).toBeUndefined();

      expect(Tuple.ofT3<Nullable<number>, Nullable<string>, Nullable<boolean>>(null, null, null)._1).toBeNull();
      expect(Tuple.ofT3<Nullable<number>, Nullable<string>, Nullable<boolean>>(null, null, null)._2).toBeNull();
      expect(Tuple.ofT3<Nullable<number>, Nullable<string>, Nullable<boolean>>(null, null, null)._3).toBeNull();

      expect(Tuple.ofT3(intValue, stringValue, booleanValue)._1).toEqual(intValue);
      expect(Tuple.ofT3(stringValue, stringValue, booleanValue)._2).toEqual(stringValue);
      expect(Tuple.ofT3(stringValue, stringValue, booleanValue)._3).toEqual(booleanValue);
    });

  });

});




describe('Tuple4', () => {


  describe('arity', () => {

    it('then 4 is returned', () => {
      expect(Tuple4.of<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>>(undefined, undefined, undefined, undefined).arity()).toEqual(4);
      expect(Tuple4.of<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>>(null, null, null, null).arity()).toEqual(4);
      expect(Tuple4.of(12, 'a', true, 11).arity()).toEqual(4);
    });

  });



  describe('of', () => {

    it('when values are given then Tuple4 instance is returned', () => {
      const intValue1 = 11;
      const intValue2 = 15;
      const stringValue = '19';
      const booleanValue = true;

      expect(Tuple.ofT4<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>>(undefined, undefined, undefined, undefined)._1).toBeUndefined();
      expect(Tuple.ofT4<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>>(undefined, undefined, undefined, undefined)._2).toBeUndefined();
      expect(Tuple.ofT4<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>>(undefined, undefined, undefined, undefined)._3).toBeUndefined();
      expect(Tuple.ofT4<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>>(undefined, undefined, undefined, undefined)._4).toBeUndefined();

      expect(Tuple.ofT4<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>>(null, null, null, null)._1).toBeNull();
      expect(Tuple.ofT4<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>>(null, null, null, null)._2).toBeNull();
      expect(Tuple.ofT4<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>>(null, null, null, null)._3).toBeNull();
      expect(Tuple.ofT4<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>>(null, null, null, null)._4).toBeNull();

      expect(Tuple.ofT4(intValue1, stringValue, booleanValue, intValue2)._1).toEqual(intValue1);
      expect(Tuple.ofT4(intValue1, stringValue, booleanValue, intValue2)._2).toEqual(stringValue);
      expect(Tuple.ofT4(intValue1, stringValue, booleanValue, intValue2)._3).toEqual(booleanValue);
      expect(Tuple.ofT4(intValue1, stringValue, booleanValue, intValue2)._4).toEqual(intValue2);
    });

  });

});




describe('Tuple5', () => {


  describe('arity', () => {

    it('then 5 is returned', () => {
      expect(Tuple5.of<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined).arity()).toEqual(5);
      expect(Tuple5.of<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null).arity()).toEqual(5);
      expect(Tuple5.of(12, 'a', true, 11, '21').arity()).toEqual(5);
    });

  });



  describe('of', () => {

    it('when values are given then Tuple5 instance is returned', () => {
      const intValue1 = 11;
      const intValue2 = 15;
      const stringValue1 = '19';
      const stringValue2 = 'abc';
      const booleanValue = true;

      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._1).toBeUndefined();
      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._2).toBeUndefined();
      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._3).toBeUndefined();
      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._4).toBeUndefined();
      expect(Tuple.ofT5<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, NullableOrUndefined<number>, NullableOrUndefined<string>>(undefined, undefined, undefined, undefined, undefined)._5).toBeUndefined();

      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._1).toBeNull();
      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._2).toBeNull();
      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._3).toBeNull();
      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._4).toBeNull();
      expect(Tuple.ofT5<Nullable<number>, Nullable<string>, Nullable<boolean>, Nullable<number>, Nullable<string>>(null, null, null, null, null)._5).toBeNull();

      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._1).toEqual(intValue1);
      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._2).toEqual(stringValue1);
      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._3).toEqual(booleanValue);
      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._4).toEqual(intValue2);
      expect(Tuple.ofT5(intValue1, stringValue1, booleanValue, intValue2, stringValue2)._5).toEqual(stringValue2);
    });

  });

});
