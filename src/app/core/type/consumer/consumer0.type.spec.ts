import { Consumer0, Consumer1, FConsumer0, isFConsumer0 } from '@app-core/type/consumer';
import { IllegalArgumentError } from '@app-core/error';
import { NullableOrUndefined } from '@app-core/type';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/consumer/consumer0.type.spec.ts
 */
describe('isFConsumer0', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFConsumer0()).toBe(false);
    expect(isFConsumer0(null)).toBe(false);
    expect(isFConsumer0(12)).toBe(false);
    expect(isFConsumer0({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFConsumer0((t1: number) => t1)).toBe(false);
    expect(isFConsumer0((t1: number, t2: number) => t1 + t2)).toBe(false);
    expect(isFConsumer0((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFConsumer0(() => {})).toBe(true);
    expect(isFConsumer0(() => { const a = 1; })).toBe(true);
  });

});




describe('Consumer0', () => {


  describe('isConsumer', () => {

    it('when no consumer is provided then false is returned', () => {
      expect(Consumer0.isConsumer()).toBe(false);
      expect(Consumer0.isConsumer(null)).toBe(false);
      expect(Consumer0.isConsumer('')).toBe(false);
      expect(Consumer0.isConsumer(12)).toBe(false);
      expect(Consumer0.isConsumer({})).toBe(false);
    });


    it('when provided consumer is different than Consumer0 then false is returned', () => {
      const consumer: Consumer1<NullableOrUndefined<number>> =
        Consumer1.of((n: NullableOrUndefined<number>) => { n! += 2; });

      expect(Consumer0.isConsumer(consumer)).toBe(false);
    });


    it('when a Consumer0 is provided then true is returned', () => {
      const consumer: Consumer0 =
        Consumer0.of(() => { let a = 1;  a += 2; });

      expect(Consumer0.isConsumer(consumer)).toBe(true);
    });

  });



  describe('of', () => {

    it('when null or undefined consumer is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Consumer0.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Consumer0.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FConsumer0 is provided then a valid Consumer0 is returned', () => {
      let externalInt = 10;

      const externalIntPlus1 = () => { externalInt += 1; };

      const consumer = Consumer0.of(externalIntPlus1);
      consumer.apply();

      expect(Consumer0.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(11);
    });


    it('when an instance of FConsumer0 is provided then a valid Consumer0 is returned', () => {
      let externalInt = 10;

      const externalIntPlus1: FConsumer0 =
        () => { externalInt += 1; };

      const consumer = Consumer0.of(externalIntPlus1);
      consumer.apply();

      expect(Consumer0.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(11);
    });


    it('when an instance of Consumer0 is provided then the same one is returned', () => {
      let externalInt = 10;

      const externalIntPlus1: Consumer0 =
        Consumer0.of(() => { externalInt += 1; });

      const consumer = Consumer0.of(externalIntPlus1);
      consumer.apply();

      expect(Consumer0.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(11);
    });

  });



  describe('getAction', () => {

    it('then return internal action', () => {
      let externalString = 'abc';

      const externalStringPlusV2: Consumer0 =
        Consumer0.of(() => { externalString += 'V2'; });

      const action: FConsumer0 = externalStringPlusV2.getAction();
      action();

      expect(externalString).toEqual('abcV2');
    });

  });



  describe('andThen', () => {

    it('when given Consumer0 is null or undefined then only this will be applied', () => {
      let externalInt = 1;

      const plus10: Consumer0 =
        Consumer0.of(() => { externalInt += 10 });

      // @ts-ignore
      const consumer = plus10.andThen(null);
      consumer.apply();

      expect(externalInt).toEqual(11);
    });


    it('when a raw function equivalent to FConsumer0 is provided then it will be applied after current one', () => {
      let externalInt = 1;

      const plus10: Consumer0 =
        Consumer0.of(() => { externalInt += 10 });

      const plus2 = () => { externalInt += 2 };

      const consumer = plus10.andThen(plus2);
      consumer.apply();

      expect(externalInt).toEqual(13);
    });


    it('when a Consumer0 is provided then it will be applied after current one', () => {
      let externalInt = 1;

      const plus10: Consumer0 =
        Consumer0.of(() => { externalInt += 10 });

      const plus2: Consumer0 =
        Consumer0.of(() => { externalInt += 2 });

      const consumer = plus10.andThen(plus2);
      consumer.apply();

      expect(externalInt).toEqual(13);
    });


    it('when a FConsumer0 is provided then it will be applied after current one', () => {
      let externalInt = 1;

      const plus10: Consumer0 =
        Consumer0.of(() => { externalInt += 10 });

      const plus2: FConsumer0 = () => { externalInt += 2 };

      const consumer = plus10.andThen(plus2);
      consumer.apply();

      expect(externalInt).toEqual(13);
    });

  });



  describe('apply', () => {

    it('when a Consumer0 is provided then the defined operation is performed based on provided arguments', () => {
      let externalString = 'abc';

      const externalStringPlusV2: Consumer0 =
        Consumer0.of(() => { externalString += 'V2'; });

      const consumer = Consumer0.of(externalStringPlusV2);
      consumer.apply();

      expect(Consumer0.isConsumer(consumer)).toBe(true);
      expect(externalString).toEqual('abcV2');
    });

  });

});
