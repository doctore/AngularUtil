import { NullableOrUndefined } from '@app-core/types';
import { Consumer2, Consumer3, FConsumer3, isFConsumer3 } from '@app-core/types/consumer';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/consumer/consumer3.type.spec.ts
 */
describe('isFConsumer3', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFConsumer3()).toBeFalse();
    expect(isFConsumer3(null)).toBeFalse();
    expect(isFConsumer3(12)).toBeFalse();
    expect(isFConsumer3({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFConsumer3(() => {})).toBeFalse();
    expect(isFConsumer3((t1: number) => { t1 += 1; } )).toBeFalse();
    expect(isFConsumer3((t1: number, t2: number) => t1 + t2)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFConsumer3((t1: string, t2: string, t3: string) => {})).toBeTrue();
    expect(isFConsumer3((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBeTrue();
  });

});




describe('Consumer3', () => {


  describe('isConsumer', () => {

    it('when no consumer is provided then false is returned', () => {
      expect(Consumer3.isConsumer()).toBeFalse();
      expect(Consumer3.isConsumer(null)).toBeFalse();
      expect(Consumer3.isConsumer('')).toBeFalse();
      expect(Consumer3.isConsumer(12)).toBeFalse();
      expect(Consumer3.isConsumer({})).toBeFalse();
    });


    it('when provided consumer is different than Consumer3 then false is returned', () => {
      const consumer: Consumer2<NullableOrUndefined<number>, NullableOrUndefined<string>> =
        Consumer2.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>) => { n! += 2; s! += 'V2'; });

      expect(Consumer3.isConsumer(consumer)).toBeFalse();
    });


    it('when a Consumer3 is provided then true is returned', () => {
      const consumer: Consumer3<NullableOrUndefined<number>, NullableOrUndefined<string>, boolean> =
        Consumer3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean) => { n! += 2; s! += 'V2'; b = !b; });

      expect(Consumer3.isConsumer(consumer)).toBeTrue();
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

      expect(Consumer3.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
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

      expect(Consumer3.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
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

      expect(Consumer3.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeTrue();
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
      expect(externalBoolean).toBeFalse();
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

      expect(Consumer3.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(7);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeTrue();
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

      expect(Consumer3.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBeTrue();
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

      expect(Consumer3.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBeTrue();
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

      expect(Consumer3.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBeTrue();
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

      expect(Consumer3.isConsumer(consumer)).toBeTrue();
      expect(externalInt).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
    });

  });

});
