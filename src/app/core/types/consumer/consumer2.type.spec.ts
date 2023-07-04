import { NullableOrUndefined } from '@app-core/types';
import { Consumer2, Consumer3, FConsumer2, isFConsumer2 } from '@app-core/types/consumer';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/consumer/consumer2.type.spec.ts
 */
describe('isFConsumer2', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFConsumer2()).toBeFalse();
    expect(isFConsumer2(null)).toBeFalse();
    expect(isFConsumer2(12)).toBeFalse();
    expect(isFConsumer2({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFConsumer2(() => {})).toBeFalse();
    expect(isFConsumer2((t1: number) => { t1 += 1; } )).toBeFalse();
    expect(isFConsumer2((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFConsumer2((t1: number, t2: number) => {} )).toBeTrue();
    expect(isFConsumer2((t1: number, t2: number) => t1 + t2)).toBeTrue();
  });

});




describe('Consumer2', () => {


  describe('isConsumer', () => {

    it('when no function is provided then false is returned', () => {
      expect(Consumer2.isConsumer()).toBeFalse();
      expect(Consumer2.isConsumer(null)).toBeFalse();
      expect(Consumer2.isConsumer('')).toBeFalse();
      expect(Consumer2.isConsumer(12)).toBeFalse();
      expect(Consumer2.isConsumer({})).toBeFalse();
    });


    it('when provided consumer is different than Consumer2 then false is returned', () => {
      const consumer: Consumer3<NullableOrUndefined<number>, NullableOrUndefined<string>, boolean> =
        Consumer3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean) => { n! += 2; s! += 'V2'; b = !b; });

      expect(Consumer2.isConsumer(consumer)).toBeFalse();
    });


    it('when a Consumer2 is provided then true is returned', () => {
      const consumer: Consumer2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
        Consumer2.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) => { n! += 2; s! += 'V2'; });

      expect(Consumer2.isConsumer(consumer)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined consumer is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Consumer2.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Consumer2.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FConsumer2 is provided then a valid Consumer2 is returned', () => {
      let externalInt = 10;
      let externalString = 'abc';

      const plusNAndAddS = (n: number, s: string) => { externalInt += n; externalString += s; };

      const consumer = Consumer2.of(plusNAndAddS);
      consumer.apply(5, 'V2');

      expect(Consumer2.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
    });


    it('when an instance of FConsumer2 is provided then a valid Consumer2 is returned', () => {
      let externalInt = 10;
      let externalString = 'abc';

      const plusNAndAddS: FConsumer2<number, string> =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) => { externalInt += n!; externalString += s!; };

      const consumer = Consumer2.of(plusNAndAddS);
      consumer.apply(5, 'V2');

      expect(Consumer2.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
    });


    it('when an instance of Consumer2 is provided then the same one is returned', () => {
      let externalInt = 10;
      let externalString = 'abc';

      const plusNAndAddS: Consumer2<number, string> =
        Consumer2.of((n: number, s: string) => { externalInt += n; externalString += s; });

      const consumer = Consumer2.of(plusNAndAddS);
      consumer.apply(5, 'V2');

      expect(Consumer2.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
    });

  });



  describe('getAction', () => {

    it('then return internal action', () => {
      let externalInt = 10;
      let externalString = 'abc';

      const plusNAndAddS: Consumer2<number, string> =
        Consumer2.of((n: number, s: string) => { externalInt += n; externalString += s; });

      const action: FConsumer2<number, string> = plusNAndAddS.getAction();
      action(5, 'V2');

      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
    });

  });



  describe('andThen', () => {

    it('when given Consumer2 is null or undefined then only this will be applied', () => {
      let externalInt = 2;
      let externalString = 'abc';

      const plusNAndAddS: Consumer2<number, string> =
        Consumer2.of((n: number, s: string) => { externalInt += n; externalString += s; });

      // @ts-ignore
      const consumer = plusNAndAddS.andThen(undefined);
      consumer.apply(5, 'V2');

      expect(Consumer2.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(7);
      expect(externalString).toEqual('abcV2');
    });


    it('when a raw function equivalent to FConsumer2 is provided then it will be applied after current one', () => {
      let externalInt = 2;
      let externalString = 'abc';

      const plusNAndAddS: Consumer2<number, string> =
        Consumer2.of((n: number, s: string) => { externalInt += n; externalString += s; });

      const multiplyNAddS = (n: number, s: string) => { externalInt *= n!; externalString += s!; };

      const consumer = plusNAndAddS.andThen(multiplyNAddS);
      consumer.apply(5, 'V2');

      expect(Consumer2.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
    });


    it('when a FConsumer2 is provided then it will be applied after current one', () => {
      let externalInt = 2;
      let externalString = 'abc';

      const plusNAndAddS: Consumer2<number, string> =
        Consumer2.of((n: number, s: string) => { externalInt += n; externalString += s; });

      const multiplyNAddS: FConsumer2<number, string> =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) => { externalInt *= n!; externalString += s!; };

      const consumer = plusNAndAddS.andThen(multiplyNAddS);
      consumer.apply(5, 'V2');

      expect(Consumer2.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
    });


    it('when a Consumer2 is provided then it will be applied after current one', () => {
      let externalInt = 2;
      let externalString = 'abc';

      const plusNAndAddS: Consumer2<number, string> =
        Consumer2.of((n: number, s: string) => { externalInt += n; externalString += s; });

      const multiplyNAddS: Consumer2<number, string> =
        Consumer2.of((n: number, s: string) => { externalInt *= n!; externalString += s!; });

      const consumer = plusNAndAddS.andThen(multiplyNAddS);
      consumer.apply(5, 'V2');

      expect(Consumer2.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
    });

  });



  describe('apply', () => {

    it('when a Consumer2 is provided then a new instance of internal type is returned', () => {
      let externalInt = 10;
      let externalString = 'abc';

      const plusNAndAddS: Consumer2<number, string> =
        Consumer2.of((n: number, s: string) => { externalInt += n; externalString += s; });

      const consumer = Consumer2.of(plusNAndAddS);
      consumer.apply(5, 'V2');

      expect(Consumer2.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
    });

  });

});
