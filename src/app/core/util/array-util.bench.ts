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
   * collect comparison:
   */
  bench("collect: lowNumberOfItems", () => {
    ArrayUtil.collect(lowNumberOfItems, itemToString, isItemIdEven);
  });


  bench("collect: mediumNumberOfItems", () => {
    ArrayUtil.collect(mediumNumberOfItems, itemToString, isItemIdEven);
  });


  bench("collect: highNumberOfItems", () => {
    ArrayUtil.collect(highNumberOfItems, itemToString, isItemIdEven);
  });


/*
 collect: lowNumberOfItems                 687,321.74    0.0012    6.9212    0.0015    0.0014    0.0037    0.0042    0.0099  ±2.74%   343661
 collect: mediumNumberOfItems               20,671.32    0.0412    0.3649    0.0484    0.0475    0.1125    0.1333    0.2513  ±0.50%    10336
 collect: highNumberOfItems                  1,123.97    0.6977    5.3216    0.8897    0.7716    2.6925    3.4566    5.3216  ±4.34%      562
*/



  /**
   * copy comparison:
   */
  bench("copy: lowNumberOfItems", () => {
    ArrayUtil.copy(lowNumberOfItems);
  });


  bench("copy: mediumNumberOfItems", () => {
    ArrayUtil.copy(mediumNumberOfItems);
  });


  bench("copy: highNumberOfItems", () => {
    ArrayUtil.copy(highNumberOfItems);
  });


/*
 copy: lowNumberOfItems                 16,173,271.45    0.0000    0.3805    0.0001    0.0001    0.0002    0.0002    0.0009  ±0.25%  8086636
 copy: mediumNumberOfItems                 274,992.47    0.0017    0.4011    0.0036    0.0037    0.0045    0.0061    0.0090  ±0.48%   137497
 copy: highNumberOfItems                     8,181.81    0.0981    2.7443    0.1222    0.1111    0.1840    0.3220    2.4888  ±4.03%     4091
*/



  /**
   * delete comparison:
   */
  bench("delete: lowNumberOfItems - not found Item", () => {
    const itemToDelete: Item = {
      id: 100000,
      name: 'Item 100000'
    };
    ArrayUtil.delete(lowNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("delete: mediumNumberOfItems - not found Item", () => {
    const itemToDelete: Item = {
      id: 100000,
      name: 'Item 100000'
    };
    ArrayUtil.delete(mediumNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("delete: highNumberOfItems - not found Item", () => {
    const itemToDelete: Item = {
      id: 100000,
      name: 'Item 100000'
    };
    ArrayUtil.delete(highNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("delete: lowNumberOfItems - found Item (first positions)", () => {
    const itemToDelete: Item = {
      id: 10,
      name: 'Item 10'
    };
    ArrayUtil.delete(lowNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("delete: mediumNumberOfItems - found Item (first positions)", () => {
    const itemToDelete: Item = {
      id: 100,
      name: 'Item 100'
    };
    ArrayUtil.delete(mediumNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("delete: highNumberOfItems - found Item (first positions)", () => {
    const itemToDelete: Item = {
      id: 1000,
      name: 'Item 1000'
    };
    ArrayUtil.delete(highNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("delete: lowNumberOfItems - found Item (last positions)", () => {
    const itemToDelete: Item = {
      id: 90,
      name: 'Item 90'
    };
    ArrayUtil.delete(lowNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("delete: mediumNumberOfItems - found Item (last positions)", () => {
    const itemToDelete: Item = {
      id: 4900,
      name: 'Item 4900'
    };
    ArrayUtil.delete(mediumNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("delete: highNumberOfItems - found Item (last positions)", () => {
    const itemToDelete: Item = {
      id: 49000,
      name: 'Item 49000'
    };
    ArrayUtil.delete(highNumberOfItems, itemToDelete, areItemsEquals);
  });


/*
 delete: lowNumberOfItems - not found Item                         2,260,528.68    0.0003    0.4925    0.0004    0.0004    0.0010    0.0012    0.0025  ±0.49%  1130265
 delete: mediumNumberOfItems - not found Item                         43,873.92    0.0180    0.4440    0.0228    0.0240    0.0335    0.0360    0.2772  ±0.76%    21937
 delete: highNumberOfItems - not found Item                            2,442.48    0.3498    3.5000    0.4094    0.3831    2.7869    3.1017    3.4451  ±3.96%     1225

 delete: lowNumberOfItems - found Item (first positions)           2,258,301.39    0.0003    0.3031    0.0004    0.0005    0.0010    0.0011    0.0015  ±0.45%  1129151
 delete: mediumNumberOfItems - found Item (first positions)           48,225.28    0.0154    0.4439    0.0207    0.0204    0.0289    0.0315    0.1816  ±0.56%    24113
 delete: highNumberOfItems - found Item (first positions)              2,478.77    0.3483    4.0129    0.4034    0.3760    2.9159    2.9673    3.4138  ±3.98%     1240

 delete: lowNumberOfItems - found Item (last positions)            2,349,100.31    0.0003    0.3024    0.0004    0.0004    0.0008    0.0010    0.0024  ±0.35%  1174551
 delete: mediumNumberOfItems - found Item (last positions)            48,220.80    0.0173    0.3664    0.0207    0.0205    0.0279    0.0313    0.1793  ±0.51%    24111
 delete: highNumberOfItems - found Item (last positions)               2,488.57    0.3438    3.4428    0.4018    0.3749    2.7787    2.8466    3.0384  ±3.74%     1245
*/



  /**
   * deleteFirst comparison:
   */
  bench("deleteFirst: lowNumberOfItems - not found Item", () => {
    const itemToDelete: Item = {
      id: 100000,
      name: 'Item 100000'
    };
    ArrayUtil.deleteFirst(lowNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("deleteFirst: mediumNumberOfItems - not found Item", () => {
    const itemToDelete: Item = {
      id: 100000,
      name: 'Item 100000'
    };
    ArrayUtil.deleteFirst(mediumNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("deleteFirst: highNumberOfItems - not found Item", () => {
    const itemToDelete: Item = {
      id: 100000,
      name: 'Item 100000'
    };
    ArrayUtil.deleteFirst(highNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("deleteFirst: lowNumberOfItems - found Item (first positions)", () => {
    const itemToDelete: Item = {
      id: 10,
      name: 'Item 10'
    };
    ArrayUtil.deleteFirst(lowNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("deleteFirst: mediumNumberOfItems - found Item (first positions)", () => {
    const itemToDelete: Item = {
      id: 100,
      name: 'Item 100'
    };
    ArrayUtil.deleteFirst(mediumNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("deleteFirst: highNumberOfItems - found Item (first positions)", () => {
    const itemToDelete: Item = {
      id: 1000,
      name: 'Item 1000'
    };
    ArrayUtil.deleteFirst(highNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("deleteFirst: lowNumberOfItems - found Item (last positions)", () => {
    const itemToDelete: Item = {
      id: 90,
      name: 'Item 90'
    };
    ArrayUtil.deleteFirst(lowNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("deleteFirst: mediumNumberOfItems - found Item (last positions)", () => {
    const itemToDelete: Item = {
      id: 4900,
      name: 'Item 4900'
    };
    ArrayUtil.deleteFirst(mediumNumberOfItems, itemToDelete, areItemsEquals);
  });


  bench("deleteFirst: highNumberOfItems - found Item (last positions)", () => {
    const itemToDelete: Item = {
      id: 49000,
      name: 'Item 49000'
    };
    ArrayUtil.deleteFirst(highNumberOfItems, itemToDelete, areItemsEquals);
  });


/*
 deleteFirst: lowNumberOfItems - not found Item                    3,262,131.01    0.0003    0.3108    0.0003    0.0003    0.0007    0.0009    0.0012  ±0.14%  1631066
 deleteFirst: mediumNumberOfItems - not found Item                    92,599.58    0.0089    0.3241    0.0108    0.0108    0.0153    0.0171    0.0255  ±0.43%    46300
 deleteFirst: highNumberOfItems - not found Item                       4,421.02    0.1900    3.0167    0.2262    0.2268    0.3219    0.3953    2.7071  ±3.20%     2211

 deleteFirst: lowNumberOfItems - found Item (first positions)      1,273,205.07    0.0004    0.3814    0.0008    0.0008    0.0012    0.0013    0.0032  ±0.63%   636603
 deleteFirst: mediumNumberOfItems - found Item (first positions)      31,392.59    0.0157    0.5020    0.0319    0.0383    0.0421    0.0457    0.2153  ±0.73%    15697
 deleteFirst: highNumberOfItems - found Item (first positions)         1,691.21    0.5012    5.1540    0.5913    0.5430    3.0686    3.2094    5.1540  ±4.28%      846

 deleteFirst: lowNumberOfItems - found Item (last positions)       1,938,268.69    0.0003    0.3284    0.0005    0.0005    0.0010    0.0012    0.0027  ±0.48%   969135
 deleteFirst: mediumNumberOfItems - found Item (last positions)       52,655.68    0.0150    0.2540    0.0190    0.0192    0.0280    0.0302    0.1616  ±0.47%    26328
 deleteFirst: highNumberOfItems - found Item (last positions)          1,873.49    0.4541    3.5231    0.5338    0.4892    2.6932    2.8315    3.5231  ±3.64%      937
*/



  /**
   * filter comparison:
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
   * filterFirst comparison:
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
   * filterFirstIndex comparison:
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
   * find comparison:
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
   * findIndex comparison:
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
   * groupMap comparison:
   */
  bench("groupMap: lowNumberOfItems", () => {
    ArrayUtil.groupMap(lowNumberOfItems, getItemId, itemIdentity, isItemIdEven);
  });


  bench("groupMap: mediumNumberOfItems", () => {
    ArrayUtil.groupMap(mediumNumberOfItems, getItemId, itemIdentity, isItemIdEven);
  });


  bench("groupMap: highNumberOfItems", () => {
    ArrayUtil.groupMap(highNumberOfItems, getItemId, itemIdentity, isItemIdEven);
  });


/*
 groupMap: lowNumberOfItems                 72,026.51    0.0121    0.3979    0.0139    0.0138    0.0181    0.0202    0.0299  ±0.33%    36014
 groupMap: mediumNumberOfItems               1,472.30    0.6289    1.1825    0.6792    0.6714    1.0108    1.0833    1.1825  ±0.68%      737
 groupMap: highNumberOfItems                   123.51    6.9367   14.0960    8.0966    8.9888   14.0960   14.0960   14.0960  ±4.07%       62
*/



  /**
   * removeAll comparison:
   */
  bench("removeAll: lowNumberOfItems", () => {
    ArrayUtil.removeAll(lowNumberOfItems, lowNumberOfItems, areItemsEquals);
  });


  bench("removeAll: mediumNumberOfItems", () => {
    ArrayUtil.removeAll(mediumNumberOfItems, mediumNumberOfItems, areItemsEquals);
  });


  bench("removeAll: highNumberOfItems", () => {
    ArrayUtil.removeAll(highNumberOfItems, highNumberOfItems, areItemsEquals);
  });


/*
 removeAll: lowNumberOfItems               118,792.35    0.0078    0.7500    0.0084    0.0084    0.0115    0.0126    0.0170  ±0.46%    59397
 removeAll: mediumNumberOfItems               54.2949   18.1589   20.2854   18.4179   18.4708   20.2854   20.2854   20.2854  ±0.87%       28
 removeAll: highNumberOfItems                  0.5214  1,858.87  1,982.22  1,917.86  1,972.30  1,982.22  1,982.22  1,982.22  ±2.01%       10
*/



  /**
   * retainAll comparison:
   */
  bench("retainAll: lowNumberOfItems", () => {
    ArrayUtil.retainAll(lowNumberOfItems, lowNumberOfItems, areItemsEquals);
  });


  bench("retainAll: mediumNumberOfItems", () => {
    ArrayUtil.retainAll(mediumNumberOfItems, mediumNumberOfItems, areItemsEquals);
  });


  bench("retainAll: highNumberOfItems", () => {
    ArrayUtil.retainAll(highNumberOfItems, highNumberOfItems, areItemsEquals);
  });


/*
 retainAll: lowNumberOfItems               114,446.46    0.0081    0.4296    0.0087    0.0089    0.0114    0.0126    0.0157  ±0.25%    57224
 retainAll: mediumNumberOfItems               51.1446   19.0934   21.6959   19.5524   19.6131   21.6959   21.6959   21.6959  ±1.22%       26
 retainAll: highNumberOfItems                  0.4976  2,004.47  2,015.73  2,009.60  2,012.52  2,015.73  2,015.73  2,015.73  ±0.13%       10
*/



  /**
   * sort comparison:
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

const getItemId =
  (item: Item) => item.id;

const isItemIdEven =
  (item: Item) => 0 == item.id % 2;

const isItemIdEvenAndHigherThan2500 =
  (item: Item) => 0 == item.id % 2 && 2500 > item.id;

const itemIdentity =
  (item: Item) => item;

const itemsComparator =
  (a: Item, b: Item) => a.id - b.id;

const itemToString =
  (item: Item) => item.id + item.name;
