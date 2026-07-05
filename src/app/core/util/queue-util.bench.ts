import { bench, describe } from 'vitest';
import { FComparator } from '@app-core/type/comparator';
import { ImmutablePriorityQueue, MutablePriorityQueue } from '@app-core/type/collection/queue';
import { QueueUtil } from '@app-core/util';

/**
 * Benchmarks for comparing the performance of the {@link SetUtil} methods.
 *
 * To invoke only this benchmark:
 *
 *    vitest bench src/app/core/util/queue-util.bench.ts
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
describe("Benchmark: QueueUtil", () => {


  /**
   * copy comparison:
   */
  bench("MutablePriorityQueue copy: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.copy(mutablePriorityQueue_LowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutablePriorityQueue copy: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.copy(immutablePriorityQueue_LowNumberOfItemsConsecutiveIds);
  });


  bench("MutablePriorityQueue copy: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.copy(mutablePriorityQueue_MediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutablePriorityQueue copy: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.copy(immutablePriorityQueue_MediumNumberOfItemsConsecutiveIds);
  });


  bench("MutablePriorityQueue copy: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.copy(mutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutablePriorityQueue copy: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.copy(immutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds);
  });


/*
 name                                                                           hz |    min |    max |   mean |    p75 |    p99 |   p995 |   p999 |     rme |  samples
-----------------------------------------------------------------------------------+--------+--------+--------+--------+--------+--------+--------+---------+-----------
 MutablePriorityQueue copy: lowNumberOfItemsConsecutiveIds              327,174.49   0.0025   0.2607   0.0031   0.0030   0.0052   0.0061   0.0098    ±0.35%     163588
 ImmutablePriorityQueue copy: lowNumberOfItemsConsecutiveIds            324,969.12   0.0023   1.5560   0.0031   0.0030   0.0055   0.0061   0.0097    ±0.74%     162485

 MutablePriorityQueue copy: mediumNumberOfItemsConsecutiveIds             7,869.98   0.1019   0.9736   0.1271   0.1298   0.2411   0.2715   0.4952    ±0.71%       3935
 ImmutablePriorityQueue copy: mediumNumberOfItemsConsecutiveIds           7,959.54   0.1108   0.5084   0.1256   0.1283   0.2100   0.2318   0.2560    ±0.37%       3980

 MutablePriorityQueue copy: mediumNumberOfItemsNoConsecutiveIds           7,765.38   0.1128   0.4308   0.1288   0.1324   0.2143   0.2260   0.2730    ±0.36%       3883
 ImmutablePriorityQueue copy: mediumNumberOfItemsNoConsecutiveIds         7,832.42   0.1118   0.4627   0.1277   0.1312   0.2094   0.2249   0.2829    ±0.36%       3917
*/



  /**
   * count comparison:
   */
  bench("MutablePriorityQueue count: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.count(mutablePriorityQueue_LowNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("ImmutablePriorityQueue count: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.count(immutablePriorityQueue_LowNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("MutablePriorityQueue count: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.count(mutablePriorityQueue_MediumNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("ImmutablePriorityQueue count: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.count(immutablePriorityQueue_MediumNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("MutablePriorityQueue count: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.count(mutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds, isItemIdEven);
  });


  bench("ImmutablePriorityQueue count: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.count(immutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds, isItemIdEven);
  });


/*
 name                                                                           hz |    min |    max |   mean |    p75 |    p99 |   p995 |   p999 |     rme |  samples
-----------------------------------------------------------------------------------+--------+--------+--------+--------+--------+--------+--------+---------+-----------
 MutablePriorityQueue count: lowNumberOfItemsConsecutiveIds           1,095,930.16   0.0008   1.2419   0.0009   0.0009   0.0013   0.0014   0.0031    ±0.49%     547966
 ImmutablePriorityQueue count: lowNumberOfItemsConsecutiveIds         1,131,314.72   0.0008   0.1709   0.0009   0.0009   0.0013   0.0016   0.0031    ±0.09%     565658

 MutablePriorityQueue count: mediumNumberOfItemsConsecutiveIds           14,772.88   0.0566   0.4458   0.0677   0.0680   0.0860   0.1038   0.2143    ±0.35%       7387
 ImmutablePriorityQueue count: mediumNumberOfItemsConsecutiveIds         14,678.54   0.0588   0.4842   0.0681   0.0683   0.0873   0.1058   0.2156    ±0.36%       7340

 MutablePriorityQueue count: mediumNumberOfItemsNoConsecutiveIds         15,108.74   0.0610   0.4169   0.0662   0.0667   0.0792   0.0979   0.1986    ±0.31%       7555
 ImmutablePriorityQueue count: mediumNumberOfItemsNoConsecutiveIds       15,076.85   0.0603   0.3699   0.0663   0.0666   0.0871   0.1008   0.2296    ±0.34%       7539
*/






});



interface Item {
  id: number;
  name: string;
}

const LOW_COUNT = 100;
const MEDIUM_COUNT = 5000;

const lowNumberOfItemsConsecutiveIds: Item[] = Array.from(
  { length: LOW_COUNT },
  (_, i) =>
    ({
      id: i,
      name: `Item ${i}`
    })
);
const mediumNumberOfItemsConsecutiveIds: Item[] = Array.from(
  { length: MEDIUM_COUNT },
  (_, i) =>
    ({
      id: i,
      name: `Item ${i}`
    })
);
const mediumNumberOfItemsNoConsecutiveIds: Item[] = Array.from(
  { length: MEDIUM_COUNT },
  (_, i) =>
    ({
      id: i * (i % 2 == 0 ? -1 : 1),
      name: `Item ${(i * (i % 2 == 0 ? -1 : 1))}`
    })
);


const isItemIdEven =
  (item: Item) => 0 == item.id % 2;

const itemIdComparator: FComparator<Item> =
  (i1: Item, i2: Item) => i1.id - i2.id;


const mutablePriorityQueue_LowNumberOfItemsConsecutiveIds = MutablePriorityQueue.of<Item>(
  itemIdComparator,
  lowNumberOfItemsConsecutiveIds
);
const mutablePriorityQueue_MediumNumberOfItemsConsecutiveIds = MutablePriorityQueue.of<Item>(
  itemIdComparator,
  mediumNumberOfItemsConsecutiveIds
);
const mutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds = MutablePriorityQueue.of<Item>(
  itemIdComparator,
  mediumNumberOfItemsNoConsecutiveIds
);

const immutablePriorityQueue_LowNumberOfItemsConsecutiveIds = ImmutablePriorityQueue.of<Item>(
  itemIdComparator,
  lowNumberOfItemsConsecutiveIds
);
const immutablePriorityQueue_MediumNumberOfItemsConsecutiveIds = ImmutablePriorityQueue.of<Item>(
  itemIdComparator,
  mediumNumberOfItemsConsecutiveIds
);
const immutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds = ImmutablePriorityQueue.of<Item>(
  itemIdComparator,
  mediumNumberOfItemsNoConsecutiveIds
);
