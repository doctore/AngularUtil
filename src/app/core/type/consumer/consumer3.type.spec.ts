import { NullableOrUndefined } from '@app-core/type';
import { Consumer2, Consumer3, FConsumer3, isFConsumer3 } from '@app-core/type/consumer';
import { IllegalArgumentError } from '@app-core/error';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/type/consumer/consumer3.type.spec.ts
 */
describe('isFConsumer3', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFConsumer3()).toBe(false);
    expect(isFConsumer3(null)).toBe(false);
    expect(isFConsumer3(12)).toBe(false);
    expect(isFConsumer3({})).toBe(false);
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFConsumer3(() => {})).toBe(false);
    expect(isFConsumer3((t1: number) => { t1 += 1; } )).toBe(false);
    expect(isFConsumer3((t1: number, t2: number) => t1 + t2)).toBe(false);
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFConsumer3((t1: string, t2: string, t3: string) => {})).toBe(true);
    expect(isFConsumer3((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBe(true);
  });

});




describe('Consumer3', () => {


  describe('isConsumer', () => {

    it('when no consumer is provided then false is returned', () => {
      expect(Consumer3.isConsumer()).toBe(false);
      expect(Consumer3.isConsumer(null)).toBe(false);
      expect(Consumer3.isConsumer('')).toBe(false);
      expect(Consumer3.isConsumer(12)).toBe(false);
      expect(Consumer3.isConsumer({})).toBe(false);
    });


    it('when provided consumer is different than Consumer3 then false is returned', () => {
      const consumer: Consumer2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
        Consumer2.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) => { n! += 2; s! += 'V2'; });

      expect(Consumer3.isConsumer(consumer)).toBe(false);
    });


    it('when a Consumer3 is provided then true is returned', () => {
      const consumer: Consumer3<NullableOrUndefined<number>, NullableOrUndefined<string>, boolean> =
        Consumer3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean) => { n! += 2; s! += 'V2'; b = !b; });

      expect(Consumer3.isConsumer(consumer)).toBe(true);
    });

  });



  describe('of', () => {

    it('when null or undefined consumer is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Consumer3.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Consumer3.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FConsumer3 is provided then a valid Consumer3 is returned', () => {
      let externalInt = 10;
      let externalString = 'abc';
      let externalBoolean = true;

      const plusNAndAddSAndChangeB = (n: number, s: string, b: boolean) => {
          externalInt += n;
          externalString += s;
          externalBoolean = b;
        };

      const consumer = Consumer3.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', false);

      expect(Consumer3.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBe(false);
    });


    it('when an instance of FConsumer3 is provided then a valid Consumer3 is returned', () => {
      let externalInt = 10;
      let externalString = 'abc';
      let externalBoolean = true;

      const plusNAndAddSAndChangeB: FConsumer3<number, string, boolean> =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean) => {
          externalInt += n!;
          externalString += s!;
          externalBoolean = b;
      };

      const consumer = Consumer3.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', false);

      expect(Consumer3.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBe(false);
    });


    it('when an instance of Consumer3 is provided then the same one is returned', () => {
      let externalInt = 10;
      let externalString = 'abc';
      let externalBoolean = false;

      const plusNAndAddSAndChangeB: Consumer3<number, string, boolean> =
        Consumer3.of(
          (n: number, s: string, b: boolean) => {
            externalInt += n;
            externalString += s;
            externalBoolean = b;
        });

      const consumer = Consumer3.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', true);

      expect(Consumer3.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBe(true);
    });

  });



  describe('getAction', () => {

    it('then return internal action', () => {
      let externalInt = 10;
      let externalString = 'abc';
      let externalBoolean = true;

      const plusNAndAddSAndChangeB: Consumer3<number, string, boolean> =
        Consumer3.of(
          (n: number, s: string, b: boolean) => {
            externalInt += n;
            externalString += s;
            externalBoolean = b;
          });

      const action = plusNAndAddSAndChangeB.getAction();
      action(5, 'V2', false);

      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBe(false);
    });

  });



  describe('andThen', () => {

    it('when given Consumer3 is null or undefined then only this will be applied', () => {
      let externalInt = 2;
      let externalString = 'abc';
      let externalBoolean = false;

      const plusNAndAddSAndChangeB: Consumer3<number, string, boolean> =
        Consumer3.of(
          (n: number, s: string, b: boolean) => {
            externalInt += n;
            externalString += s;
            externalBoolean = b;
          });

      // @ts-ignore
      const consumer = plusNAndAddSAndChangeB.andThen(undefined);
      consumer.apply(5, 'V2', true);

      expect(Consumer3.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(7);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBe(true);
    });


    it('when a raw function equivalent to FConsumer3 is provided then it will be applied after current one', () => {
      let externalInt = 2;
      let externalString = 'abc';
      let externalBoolean = false;

      const plusNAndAddSAndChangeB: Consumer3<number, string, boolean> =
        Consumer3.of(
          (n: number, s: string, b: boolean) => {
            externalInt += n;
            externalString += s;
            externalBoolean = b;
          });

      const multiplyNAddSAndChangeB = (n: number, s: string, b: boolean) => {
        externalInt *= n;
        externalString += s;
        externalBoolean = b;
      };

      const consumer = plusNAndAddSAndChangeB.andThen(multiplyNAddSAndChangeB);
      consumer.apply(5, 'V2', true);

      expect(Consumer3.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBe(true);
    });


    it('when a FConsumer3 is provided then it will be applied after current one', () => {
      let externalInt = 2;
      let externalString = 'abc';
      let externalBoolean = false;

      const plusNAndAddSAndChangeB: Consumer3<number, string, boolean> =
        Consumer3.of(
          (n: number, s: string, b: boolean) => {
            externalInt += n;
            externalString += s;
            externalBoolean = b;
          });

      const multiplyNAddSAndChangeB: FConsumer3<number, string, boolean> =
        (n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) => {
          externalInt *= n!;
          externalString += s!;
          externalBoolean = b!;
      };

      const consumer = plusNAndAddSAndChangeB.andThen(multiplyNAddSAndChangeB);
      consumer.apply(5, 'V2', true);

      expect(Consumer3.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBe(true);
    });


    it('when a Consumer3 is provided then it will be applied after current one', () => {
      let externalInt = 2;
      let externalString = 'abc';
      let externalBoolean = false;

      const plusNAndAddSAndChangeB: Consumer3<number, string, boolean> =
        Consumer3.of(
          (n: number, s: string, b: boolean) => {
            externalInt += n;
            externalString += s;
            externalBoolean = b;
          });

      const multiplyNAddS: Consumer3<number, string, boolean> =
        Consumer3.of((n: number, s: string, b: boolean) => {
          externalInt *= n;
          externalString += s;
          externalBoolean = b;
        });

      const consumer = plusNAndAddSAndChangeB.andThen(multiplyNAddS);
      consumer.apply(5, 'V2', true);

      expect(Consumer3.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBe(true);
    });

  });



  describe('apply', () => {

    it('when a Consumer3 is provided then the defined operation is performed based on provided arguments', () => {
      let externalInt = 10;
      let externalString = 'abc';
      let externalBoolean = true;

      const plusNAndAddSAndChangeB: Consumer3<number, string, boolean> =
        Consumer3.of(
          (n: number, s: string, b: boolean) => {
            externalInt += n;
            externalString += s;
            externalBoolean = b;
          });

      const consumer = Consumer3.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', false);

      expect(Consumer3.isConsumer(consumer)).toBe(true);
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBe(false);
    });

  });

});
