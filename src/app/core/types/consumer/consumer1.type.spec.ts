import { NullableOrUndefined } from '@app-core/types';
import { Consumer1, FConsumer1, isFConsumer1 } from '@app-core/types/consumer';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/consumer/consumer1.type.spec.ts
 */
describe('isFConsumer1', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFConsumer1()).toBeFalse();
    expect(isFConsumer1(null)).toBeFalse();
    expect(isFConsumer1(12)).toBeFalse();
    expect(isFConsumer1({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFConsumer1(() => {})).toBeFalse();
    expect(isFConsumer1((t1: number, t2: number) => t1 + t2)).toBeFalse();
    expect(isFConsumer1((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFConsumer1((t1: number) => {} )).toBeTrue();
    expect(isFConsumer1((t1: number) => { t1 += 1; } )).toBeTrue();
  });

});




describe('Consumer1', () => {


  describe('isConsumer', () => {

    it('when no function is provided then false is returned', () => {
      expect(Consumer1.isConsumer()).toBeFalse();
      expect(Consumer1.isConsumer(null)).toBeFalse();
      expect(Consumer1.isConsumer('')).toBeFalse();
      expect(Consumer1.isConsumer(12)).toBeFalse();
      expect(Consumer1.isConsumer({})).toBeFalse();
    });


    it('when a function is provided then true is returned', () => {
      const consumer: Consumer1<NullableOrUndefined<number>> =
        Consumer1.of((n: NullableOrUndefined<number>) => { n! += 2; });

      expect(Consumer1.isConsumer(consumer)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined consumer is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Consumer1.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Consumer1.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FConsumer1 is provided then a valid Consumer1 is returned', () => {
      let externalInt = 10;

      const plusN = (n: NullableOrUndefined<number>) => { externalInt += n!; };

      const consumer = Consumer1.of(plusN);
      consumer.apply(5);

      expect(Consumer1.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
    });


    it('when an instance of FConsumer1 is provided then a valid Consumer1 is returned', () => {
      let externalInt = 10;

      const plusN: FConsumer1<number> =
        (n: NullableOrUndefined<number>) => { externalInt += n!; };

      const consumer = Consumer1.of(plusN);
      consumer.apply(5);

      expect(Consumer1.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
    });


    it('when an instance of Consumer1 is provided then the same one is returned', () => {
      let externalInt = 10;

      const plusN: Consumer1<number> =
        Consumer1.of((n: number) => { externalInt += n; });

      const consumer = Consumer1.of(plusN);
      consumer.apply(5);

      expect(Consumer1.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
    });

  });



  describe('andThen', () => {

    it('when given Consumer1 is null or undefined then only this will be applied', () => {
      let externalInt = 1;

      const plusN: Consumer1<number> =
        Consumer1.of((n: number) => { externalInt += n });

      // @ts-ignore
      const consumer = plusN.andThen(undefined);
      consumer.apply(2);

      expect(externalInt).toEqual(3);
    });


    it('when a raw function equivalent to FConsumer1 is provided then it will be applied after current one', () => {
      let externalInt = 1;

      const plusN: Consumer1<number> =
        Consumer1.of((n: number) => { externalInt += n });

      const multiplyN = (n: number) => { externalInt *= n };

      const consumer = plusN.andThen(multiplyN);
      consumer.apply(2);

      expect(externalInt).toEqual(6);
    });


    it('when a FConsumer1 is provided then it will be applied after current one', () => {
      let externalInt = 1;

      const plusN: Consumer1<number> =
        Consumer1.of((n: number) => { externalInt += n });

      const multiplyN: FConsumer1<number> =
        (n: NullableOrUndefined<number>) => { externalInt *= n! };

      const consumer = plusN.andThen(multiplyN);
      consumer.apply(2);

      expect(externalInt).toEqual(6);
    });


    it('when a Consumer1 is provided then it will be applied after current one', () => {
      let externalInt = 1;

      const plusN: Consumer1<number> =
        Consumer1.of((n: number) => { externalInt += n });

      const multiplyN: Consumer1<number> =
        Consumer1.of((n: number) => { externalInt *= n });

      const consumer = plusN.andThen(multiplyN);
      consumer.apply(2);

      expect(externalInt).toEqual(6);
    });

  });



  describe('apply', () => {

    it('when a Consumer1 is provided then a new instance of internal type is returned', () => {
      let externalString = 'abc';

      const stringAddS: Consumer1<string> =
        Consumer1.of((s: string) => { externalString += s; });

      const consumer = Consumer1.of(stringAddS);
      consumer.apply('V2');

      expect(Consumer1.isConsumer(consumer)).toBeTrue();
      expect(externalString).toEqual('abcV2');
    });

  });

});
