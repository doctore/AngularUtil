import { NullableOrUndefined } from '@app-core/types';
import { Consumer3, Consumer4, FConsumer4, isFConsumer4 } from '@app-core/types/consumer';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/consumer/consumer4.type.spec.ts
 */
describe('isFConsumer4', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFConsumer4()).toBeFalse();
    expect(isFConsumer4(null)).toBeFalse();
    expect(isFConsumer4(12)).toBeFalse();
    expect(isFConsumer4({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFConsumer4(() => {})).toBeFalse();
    expect(isFConsumer4((t1: number) => { t1 += 1; } )).toBeFalse();
    expect(isFConsumer4((t1: number, t2: number) => t1 + t2)).toBeFalse();
    expect(isFConsumer4((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFConsumer4((t1: string, t2: string, t3: string, t4: string) => {})).toBeTrue();
    expect(isFConsumer4((t1: number, t2: number, t3: number, t4: number) => t1 + t2 + t3 + t4)).toBeTrue();
  });

});




describe('Consumer4', () => {


  describe('isConsumer', () => {

    it('when no consumer is provided then false is returned', () => {
      expect(Consumer4.isConsumer()).toBeFalse();
      expect(Consumer4.isConsumer(null)).toBeFalse();
      expect(Consumer4.isConsumer('')).toBeFalse();
      expect(Consumer4.isConsumer(12)).toBeFalse();
      expect(Consumer4.isConsumer({})).toBeFalse();
    });


    it('when provided consumer is different than Consumer4 then false is returned', () => {
      const consumer: Consumer3<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>> =
        Consumer3.of((n: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>) => { n! += 2; s! += 'V2'; b! = !b; });

      expect(Consumer4.isConsumer(consumer)).toBeFalse();
    });


    it('when a Consumer4 is provided then true is returned', () => {
      const consumer: Consumer4<number, string, boolean, number> =
        Consumer4.of((n1: number, s: string, b: boolean, n2: number) => { n1 += 2; s += 'V2'; b = !b; n2 -= 2; });

      expect(Consumer4.isConsumer(consumer)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined consumer is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Consumer4.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Consumer4.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FConsumer4 is provided then a valid Consumer4 is returned', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = true;
      let externalInt2 = 15;

      const plusNAndAddSAndChangeB = (n1: number, s: string, b: boolean, n2: number) => {
          externalInt1 += n1;
          externalString += s;
          externalBoolean = b;
          externalInt2 += n2;
        };

      const consumer = Consumer4.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', false, 7);

      expect(Consumer4.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
      expect(externalInt2).toEqual(22);
    });


    it('when an instance of FConsumer4 is provided then a valid Consumer4 is returned', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = true;
      let externalInt2 = 15;

      const plusNAndAddSAndChangeB: FConsumer4<number, string, boolean, number> =
        (n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean, n2: number) => {
          externalInt1 += n1!;
          externalString += s!;
          externalBoolean = b;
          externalInt2 += n2;
      };

      const consumer = Consumer4.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', false, 7);

      expect(Consumer4.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
      expect(externalInt2).toEqual(22);
    });


    it('when an instance of Consumer4 is provided then the same one is returned', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 15;

      const plusNAndAddSAndChangeB: Consumer4<number, string, boolean, number> =
        Consumer4.of(
          (n1: number, s: string, b: boolean, n2: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
        });

      const consumer = Consumer4.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', true, 7);

      expect(Consumer4.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(22);
    });

  });



  describe('getAction', () => {

    it('then return internal action', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = true;
      let externalInt2 = 15;

      const plusNAndAddSAndChangeB: Consumer4<number, string, boolean, number> =
        Consumer4.of(
          (n1: number, s: string, b: boolean, n2: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
          });

      const action = plusNAndAddSAndChangeB.getAction();
      action(5, 'V2', false, 7);

      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
      expect(externalInt2).toEqual(22);
    });

  });



  describe('andThen', () => {

    it('when given Consumer4 is null or undefined then only this will be applied', () => {
      let externalInt1 = 2;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 3;

      const plusNAndAddSAndChangeB: Consumer4<number, string, boolean, number> =
        Consumer4.of(
          (n1: number, s: string, b: boolean, n2: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 *= n2;
          });

      // @ts-ignore
      const consumer = plusNAndAddSAndChangeB.andThen(undefined);
      consumer.apply(5, 'V2', true, 2);

      expect(Consumer4.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(7);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(6);
    });


    it('when a raw function equivalent to FConsumer4 is provided then it will be applied after current one', () => {
      let externalInt1 = 2;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 3;

      const plusNAndAddSAndChangeB: Consumer4<number, string, boolean, number> =
        Consumer4.of(
          (n1: number, s: string, b: boolean, n2: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
          });

      const multiplyNAddSAndChangeB = (n1: number, s: string, b: boolean, n2: number) => {
        externalInt1 *= n1;
        externalString += s;
        externalBoolean = b;
        externalInt2 *= n2;
      };

      const consumer = plusNAndAddSAndChangeB.andThen(multiplyNAddSAndChangeB);
      consumer.apply(5, 'V2', true, 3);

      expect(Consumer4.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(18);
    });


    it('when a FConsumer4 is provided then it will be applied after current one', () => {
      let externalInt1 = 2;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 3;

      const plusNAndAddSAndChangeB: Consumer4<number, string, boolean, number> =
        Consumer4.of(
          (n1: number, s: string, b: boolean, n2: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
          });

      const multiplyNAddSAndChangeB: FConsumer4<number, string, boolean, number> =
        (n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean, n2: number) => {
          externalInt1 *= n1!;
          externalString += s!;
          externalBoolean = b;
          externalInt2 *= n2;
      };

      const consumer = plusNAndAddSAndChangeB.andThen(multiplyNAddSAndChangeB);
      consumer.apply(5, 'V2', true, 3);

      expect(Consumer4.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(18);
    });


    it('when a Consumer4 is provided then it will be applied after current one', () => {
      let externalInt1 = 2;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 3;

      const plusNAndAddSAndChangeB: Consumer4<number, string, boolean, number> =
        Consumer4.of(
          (n1: number, s: string, b: boolean, n2: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
          });

      const multiplyNAddS: Consumer4<number, string, boolean, number> =
        Consumer4.of((n1: number, s: string, b: boolean, n2: number) => {
          externalInt1 *= n1!;
          externalString += s!;
          externalBoolean = b;
          externalInt2 *= n2;
        });

      const consumer = plusNAndAddSAndChangeB.andThen(multiplyNAddS);
      consumer.apply(5, 'V2', true, 3);

      expect(Consumer4.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(18);
    });

  });



  describe('apply', () => {

    it('when a Consumer4 is provided then the defined operation is performed based on provided arguments', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = true;
      let externalInt2 = 15;

      const plusNAndAddSAndChangeB: Consumer4<number, string, boolean, number> =
        Consumer4.of(
          (n1: number, s: string, b: boolean, n2: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
          });

      const consumer = Consumer4.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', false, 7);

      expect(Consumer4.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
      expect(externalInt2).toEqual(22);
    });

  });

});
