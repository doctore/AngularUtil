import { NullableOrUndefined } from '@app-core/types';
import { Consumer4, Consumer5, FConsumer5, isFConsumer5 } from '@app-core/types/consumer';
import { IllegalArgumentError } from '@app-core/errors';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/types/consumer/consumer5.type.spec.ts
 */
describe('isFConsumer5', () => {

  it('when no function is provided then false is returned', () => {
    expect(isFConsumer5()).toBeFalse();
    expect(isFConsumer5(null)).toBeFalse();
    expect(isFConsumer5(12)).toBeFalse();
    expect(isFConsumer5({})).toBeFalse();
  });


  it('when a function that does not match is provided then false is returned', () => {
    expect(isFConsumer5(() => {})).toBeFalse();
    expect(isFConsumer5((t1: number) => { t1 += 1; } )).toBeFalse();
    expect(isFConsumer5((t1: number, t2: number) => t1 + t2)).toBeFalse();
    expect(isFConsumer5((t1: number, t2: number, t3: number) => t1 + t2 + t3)).toBeFalse();
    expect(isFConsumer5((t1: number, t2: number, t3: number, t4: number) => t1 + t2 + t3 + t4)).toBeFalse();
  });


  it('when a function that matches is provided then true is returned', () => {
    expect(isFConsumer5((t1: string, t2: string, t3: string, t4: string, t5: string) => {})).toBeTrue();
    expect(isFConsumer5((t1: number, t2: number, t3: number, t4: number, t5: number) => t1 + t2 + t3 + t4 + t5)).toBeTrue();
  });

});




describe('Consumer5', () => {


  describe('isConsumer', () => {

    it('when no consumer is provided then false is returned', () => {
      expect(Consumer5.isConsumer()).toBeFalse();
      expect(Consumer5.isConsumer(null)).toBeFalse();
      expect(Consumer5.isConsumer('')).toBeFalse();
      expect(Consumer5.isConsumer(12)).toBeFalse();
      expect(Consumer5.isConsumer({})).toBeFalse();
    });


    it('when provided consumer is different than Consumer5 then false is returned', () => {
      const consumer: Consumer4<NullableOrUndefined<number>, NullableOrUndefined<string>, NullableOrUndefined<boolean>, number> =
        Consumer4.of((n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: NullableOrUndefined<boolean>, n2: number) => { n1! += 2; s! += 'V2'; b! = !b; n2 += 1; });

      expect(Consumer5.isConsumer(consumer)).toBeFalse();
    });


    it('when a Consumer5 is provided then true is returned', () => {
      const consumer: Consumer5<number, string, boolean, number, number> =
        Consumer5.of((n1: number, s: string, b: boolean, n2: number, n3: number) => { n1 += 2; s += 'V2'; b = !b; n2 -= 2; n3 += 4; });

      expect(Consumer5.isConsumer(consumer)).toBeTrue();
    });

  });



  describe('of', () => {

    it('when null or undefined consumer is given then an error is thrown', () => {
      // @ts-ignore
      expect(() => Consumer5.of(null)).toThrowError(IllegalArgumentError);
      // @ts-ignore
      expect(() => Consumer5.of(undefined)).toThrowError(IllegalArgumentError);
    });


    it('when a raw function equivalent to FConsumer5 is provided then a valid Consumer5 is returned', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = true;
      let externalInt2 = 15;
      let externalInt3 = -5;

      const plusNAndAddSAndChangeB = (n1: number, s: string, b: boolean, n2: number, n3: number) => {
          externalInt1 += n1;
          externalString += s;
          externalBoolean = b;
          externalInt2 += n2;
          externalInt3 += n3;
        };

      const consumer = Consumer5.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', false, 7, 5);

      expect(Consumer5.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
      expect(externalInt2).toEqual(22);
      expect(externalInt3).toEqual(0);
    });


    it('when an instance of FConsumer5 is provided then a valid Consumer5 is returned', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = true;
      let externalInt2 = 15;
      let externalInt3 = -5;

      const plusNAndAddSAndChangeB: FConsumer5<number, string, boolean, number, number> =
        (n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean, n2: number, n3: number) => {
          externalInt1 += n1!;
          externalString += s!;
          externalBoolean = b;
          externalInt2 += n2;
          externalInt3 += n3;
      };

      const consumer = Consumer5.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', false, 7, 5);

      expect(Consumer5.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
      expect(externalInt2).toEqual(22);
      expect(externalInt3).toEqual(0);
    });


    it('when an instance of Consumer5 is provided then the same one is returned', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 15;
      let externalInt3 = -5;

      const plusNAndAddSAndChangeB: Consumer5<number, string, boolean, number, number> =
        Consumer5.of(
          (n1: number, s: string, b: boolean, n2: number, n3: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
            externalInt3 += n3;
        });

      const consumer = Consumer5.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', true, 7, 5);

      expect(Consumer5.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(22);
      expect(externalInt3).toEqual(0);
    });

  });



  describe('getAction', () => {

    it('then return internal action', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = true;
      let externalInt2 = 15;
      let externalInt3 = -5;

      const plusNAndAddSAndChangeB: Consumer5<number, string, boolean, number, number> =
        Consumer5.of(
          (n1: number, s: string, b: boolean, n2: number, n3: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
            externalInt3 += n3;
          });

      const action = plusNAndAddSAndChangeB.getAction();
      action(5, 'V2', false, 7, 5);

      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
      expect(externalInt2).toEqual(22);
      expect(externalInt3).toEqual(0);
    });

  });



  describe('andThen', () => {

    it('when given Consumer5 is null or undefined then only this will be applied', () => {
      let externalInt1 = 2;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 3;
      let externalInt3 = -2;

      const plusNAndAddSAndChangeB: Consumer5<number, string, boolean, number, number> =
        Consumer5.of(
          (n1: number, s: string, b: boolean, n2: number, n3: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 *= n2;
            externalInt3 -= n3;
          });

      // @ts-ignore
      const consumer = plusNAndAddSAndChangeB.andThen(undefined);
      consumer.apply(5, 'V2', true, 2, 3);

      expect(Consumer5.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(7);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(6);
      expect(externalInt3).toEqual(-5);
    });


    it('when a raw function equivalent to FConsumer5 is provided then it will be applied after current one', () => {
      let externalInt1 = 2;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 3;
      let externalInt3 = -2;

      const plusNAndAddSAndChangeB: Consumer5<number, string, boolean, number, number> =
        Consumer5.of(
          (n1: number, s: string, b: boolean, n2: number, n3: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
            externalInt3 += n3;
          });

      const multiplyNAddSAndChangeB = (n1: number, s: string, b: boolean, n2: number, n3: number) => {
        externalInt1 *= n1;
        externalString += s;
        externalBoolean = b;
        externalInt2 *= n2;
        externalInt3 *= n3;
      };

      const consumer = plusNAndAddSAndChangeB.andThen(multiplyNAddSAndChangeB);
      consumer.apply(5, 'V2', true, 3, 4);

      expect(Consumer5.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(18);
      expect(externalInt3).toEqual(8);
    });


    it('when a FConsumer5 is provided then it will be applied after current one', () => {
      let externalInt1 = 2;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 3;
      let externalInt3 = -2;

      const plusNAndAddSAndChangeB: Consumer5<number, string, boolean, number, number> =
        Consumer5.of(
          (n1: number, s: string, b: boolean, n2: number, n3: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
            externalInt3 += n3;
          });

      const multiplyNAddSAndChangeB: FConsumer5<number, string, boolean, number, number> =
        (n1: NullableOrUndefined<number>, s: NullableOrUndefined<string>, b: boolean, n2: number, n3: number) => {
          externalInt1 *= n1!;
          externalString += s!;
          externalBoolean = b;
          externalInt2 *= n2;
          externalInt3 *= n3;
      };

      const consumer = plusNAndAddSAndChangeB.andThen(multiplyNAddSAndChangeB);
      consumer.apply(5, 'V2', true, 3, 4);

      expect(Consumer5.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(18);
      expect(externalInt3).toEqual(8);
    });


    it('when a Consumer5 is provided then it will be applied after current one', () => {
      let externalInt1 = 2;
      let externalString = 'abc';
      let externalBoolean = false;
      let externalInt2 = 3;
      let externalInt3 = -2;

      const plusNAndAddSAndChangeB: Consumer5<number, string, boolean, number, number> =
        Consumer5.of(
          (n1: number, s: string, b: boolean, n2: number, n3: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
            externalInt3 += n3;
          });

      const multiplyNAddS: Consumer5<number, string, boolean, number, number> =
        Consumer5.of((n1: number, s: string, b: boolean, n2: number, n3: number) => {
          externalInt1 *= n1!;
          externalString += s!;
          externalBoolean = b;
          externalInt2 *= n2;
          externalInt3 *= n3;
        });

      const consumer = plusNAndAddSAndChangeB.andThen(multiplyNAddS);
      consumer.apply(5, 'V2', true, 3, 4);

      expect(Consumer5.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(35);
      expect(externalString).toEqual('abcV2V2');
      expect(externalBoolean).toBeTrue();
      expect(externalInt2).toEqual(18);
      expect(externalInt3).toEqual(8);
    });

  });



  describe('apply', () => {

    it('when a Consumer5 is provided then the defined operation is performed based on provided arguments', () => {
      let externalInt1 = 10;
      let externalString = 'abc';
      let externalBoolean = true;
      let externalInt2 = 15;
      let externalInt3 = -5;

      const plusNAndAddSAndChangeB: Consumer5<number, string, boolean, number, number> =
        Consumer5.of(
          (n1: number, s: string, b: boolean, n2: number, n3: number) => {
            externalInt1 += n1;
            externalString += s;
            externalBoolean = b;
            externalInt2 += n2;
            externalInt3 += n3;
          });

      const consumer = Consumer5.of(plusNAndAddSAndChangeB);
      consumer.apply(5, 'V2', false, 7, 5);

      expect(Consumer5.isConsumer(consumer)).toBeTrue();
      expect(externalInt1).toEqual(15);
      expect(externalString).toEqual('abcV2');
      expect(externalBoolean).toBeFalse();
      expect(externalInt2).toEqual(22);
      expect(externalInt3).toEqual(0);
    });

  });

});
