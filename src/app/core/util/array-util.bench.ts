import { bench, describe } from 'vitest';
import { ArrayUtil } from '@app-core/util';

/**
 * Benchmarks for comparing the performance of the {@link ArrayUtil} methods.
 *
 * To invoke only this benchmark:
 *
 *    vitest bench src/app/core/util/array-util.bench.ts
 *
 * Results:
 *
 *   hz      = ops/sec. Higher = faster
 *   min     = Fastest single run time (lowest observed time per iteration). Lower = better.
 *   max     = Slowest single run time. If max is much larger than min, you may have: GC pauses, CPU interruptions, System noise
 *   mean    = Average time per operation. Lower = better.  `hz` and `mean` are inverses of each other. High `hz` = low `mean`
 *   p75     = 75th percentile: 75% of runs were faster than this time. Shows typical performance.
 *   p99     = 99th percentile. Shows near worst-case latency. Important for: Real-time systems, APIs, Performance-sensitive UI
 *   p995    = Extreme tail latency. Used to detect: Rare pauses, GC spikes, JIT de-optimizations. If these are much larger than `mean`, performance is inconsistent
 *   p999    = p995
 *   rme     = Relative Margin of Error. Lower = more stable results. <1% → excellent; 1–3% → good; 5% → noisy benchmark
 *   samples = How many times Vitest measured it. More samples = more reliable statistics.
 */
describe("Benchmark: ArrayUtil", () => {

  /**
   * Filter comparison:
   */
  bench("filter: lowNumberOfItems", () => {
    ArrayUtil.filter(lowNumberOfItems, isItemIdEven);
  });


  bench("filter: mediumNumberOfItems", () => {
    ArrayUtil.filter(mediumNumberOfItems, isItemIdEven);
  });


  bench("filter: highNumberOfItems", () => {
    ArrayUtil.filter(highNumberOfItems, isItemIdEven);
  });


/*
 filter: lowNumberOfItems               3,112,065.10    0.0003    2.9968    0.0003    0.0003    0.0011    0.0012    0.0017  ±1.18%  1556033
 filter: mediumNumberOfItems               86,429.95    0.0088    3.2845    0.0116    0.0117    0.0151    0.0174    0.0934  ±1.35%    43215
 filter: highNumberOfItems                  3,898.92    0.2147    4.1468    0.2565    0.2403    0.4125    2.5451    3.0291  ±3.68%     1950
*/



  /**
   * FilterFirst comparison:
   */
  bench("filterFirst: lowNumberOfItems", () => {
    ArrayUtil.filterFirst(lowNumberOfItems, isItemIdEvenAndHigherThan2500);
  });


  bench("filterFirst: mediumNumberOfItems", () => {
    ArrayUtil.filterFirst(mediumNumberOfItems, isItemIdEvenAndHigherThan2500);
  });


  bench("filterFirst: highNumberOfItems", () => {
    ArrayUtil.filterFirst(highNumberOfItems, isItemIdEvenAndHigherThan2500);
  });


/*
 filterFirst: lowNumberOfItems          7,422,176.22    0.0001    0.4102    0.0001    0.0001    0.0002    0.0003    0.0005  ±0.18%  3711089
 filterFirst: mediumNumberOfItems       7,486,762.23    0.0001    0.4905    0.0001    0.0001    0.0002    0.0003    0.0005  ±0.25%  3743382
 filterFirst: highNumberOfItems         7,282,619.65    0.0001    0.5994    0.0001    0.0001    0.0002    0.0003    0.0005  ±0.25%  3641310
*/



  /**
   * FilterFirstIndex comparison:
   */
  bench("filterFirstIndex: lowNumberOfItems", () => {
    ArrayUtil.filterFirstIndex(lowNumberOfItems, isItemIdEvenAndHigherThan2500);
  });


  bench("filterFirstIndex: mediumNumberOfItems", () => {
    ArrayUtil.filterFirstIndex(mediumNumberOfItems, isItemIdEvenAndHigherThan2500);
  });


  bench("filterFirstIndex: highNumberOfItems", () => {
    ArrayUtil.filterFirstIndex(highNumberOfItems, isItemIdEvenAndHigherThan2500);
  });


/*
 filterFirstIndex: lowNumberOfItems     7,417,767.33    0.0001    0.2827    0.0001    0.0001    0.0002    0.0003    0.0005  ±0.12%  3708884
 filterFirstIndex: mediumNumberOfItems  7,580,484.68    0.0001    0.4445    0.0001    0.0001    0.0002    0.0003    0.0005  ±0.22%  3790243
 filterFirstIndex: highNumberOfItems    8,183,428.35    0.0001    0.3790    0.0001    0.0001    0.0002    0.0003    0.0005  ±0.16%  4091715
*/



  /**
   * Find comparison:
   */
  bench("find: lowNumberOfItems", () => {
    for (const item of lowNumberOfItems) {
      ArrayUtil.find(lowNumberOfItems, item, areItemsEquals);
    }
  });


  bench("find: mediumNumberOfItems", () => {
    for (const item of mediumNumberOfItems) {
      ArrayUtil.find(mediumNumberOfItems, item, areItemsEquals);
    }
  });


  bench("find: highNumberOfItems", () => {
    for (const item of highNumberOfItems) {
      ArrayUtil.find(highNumberOfItems, item, areItemsEquals);
    }
  });


/*
 find: lowNumberOfItems                    77,760.33    0.0117    0.3504    0.0129    0.0128    0.0176    0.0201    0.0258  ±0.24%    38881
 find: mediumNumberOfItems                    114.72    8.6067    9.3573    8.7169    8.7278    9.3573    9.3573    9.3573  ±0.51%       58
 find: highNumberOfItems                      0.9618  1,029.99  1,048.12  1,039.66  1,042.32  1,048.12  1,048.12  1,048.12  ±0.34%       10
*/



  /**
   * FindIndex comparison:
   */
  bench("findIndex: lowNumberOfItems", () => {
    for (const item of lowNumberOfItems) {
      ArrayUtil.findIndex(lowNumberOfItems, item, areItemsEquals);
    }
  });


  bench("findIndex: mediumNumberOfItems", () => {
    for (const item of mediumNumberOfItems) {
      ArrayUtil.findIndex(mediumNumberOfItems, item, areItemsEquals);
    }
  });


  bench("findIndex: highNumberOfItems", () => {
    for (const item of highNumberOfItems) {
      ArrayUtil.findIndex(highNumberOfItems, item, areItemsEquals);
    }
  });


/*
 findIndex: lowNumberOfItems               58,622.63    0.0152    0.4297    0.0171    0.0171    0.0234    0.0278    0.0370  ±0.36%    29312
 findIndex: mediumNumberOfItems              51.6232   18.9309   20.8615   19.3711   19.5082   20.8615   20.8615   20.8615  ±1.03%       26
 findIndex: highNumberOfItems                 0.5228  1,898.43  1,933.87  1,912.66  1,919.17  1,933.87  1,933.87  1,933.87  ±0.44%       10
*/



  /**
   * Has comparison:
   */
  bench("has: lowNumberOfItems", () => {
    for (const item of lowNumberOfItems) {
      ArrayUtil.has(lowNumberOfItems, item, areItemsEquals);
    }
  });


  bench("has: mediumNumberOfItems", () => {
    for (const item of mediumNumberOfItems) {
      ArrayUtil.has(mediumNumberOfItems, item, areItemsEquals);
    }
  });


  bench("has: highNumberOfItems", () => {
    for (const item of highNumberOfItems) {
      ArrayUtil.has(highNumberOfItems, item, areItemsEquals);
    }
  });


/*
 has: lowNumberOfItems                     72,171.69    0.0120    0.3212    0.0139    0.0146    0.0184    0.0205    0.0290  ±0.29%    36086
 has: mediumNumberOfItems                     113.50    8.6039    9.9121    8.8105    8.8335    9.9121    9.9121    9.9121  ±0.86%       57
 has: highNumberOfItems                       0.9541  1,043.95  1,052.29  1,048.16  1,049.81  1,052.29  1,052.29  1,052.29  ±0.17%       10
*/



  /**
   * Sort comparison:
   */
  bench("sort: lowNumberOfItems", () => {
    ArrayUtil.sort(lowNumberOfItems, itemsComparator);
  });


  bench("sort: mediumNumberOfItems", () => {
    ArrayUtil.sort(mediumNumberOfItems, itemsComparator);
  });


  bench("sort: highNumberOfItems", () => {
    ArrayUtil.sort(highNumberOfItems, itemsComparator);
  });


/*
 sort: lowNumberOfItems                    30,711.07    0.0290    0.3983    0.0326    0.0323    0.0460    0.0515    0.0813  ±0.30%    15356
 sort: mediumNumberOfItems                    654.78    1.3999    2.4537    1.5272    1.5072    2.4275    2.4379    2.4537  ±1.21%      328
 sort: highNumberOfItems                     57.8641   14.2702   21.1384   17.2819   19.9917   21.1384   21.1384   21.1384  ±5.62%       29
*/


});



interface Item {
  id: number;
  name: string;
}

const LOW_COUNT = 100;
const MEDIUM_COUNT = 5000;
const HIGH_COUNT = 50_000;

const lowNumberOfItems: Item[] = Array.from(
  { length: LOW_COUNT },
  (_, i) =>
    ({
      id: i,
      name: `Item ${i}`
    })
);
const mediumNumberOfItems: Item[] = Array.from(
  { length: MEDIUM_COUNT },
  (_, i) =>
    ({
      id: i,
      name: `Item ${i}`
    })
);
const highNumberOfItems: Item[] = Array.from(
  { length: HIGH_COUNT },
  (_, i) =>
    ({
      id: i,
      name: `Item ${i}`
    })
);

const areItemsEquals =
  (a: Item, b: Item) => a.id === b.id;

const isItemIdEven =
  (item: Item) => 0 == item.id % 2;

const isItemIdEvenAndHigherThan2500 =
  (item: Item) => 0 == item.id % 2 && 2500 > item.id;

const itemsComparator =
  (a: Item, b: Item) => a.id - b.id;
