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


  bench("MutablePriorityQueue copy: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.copy(mutablePriorityQueue_MediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutablePriorityQueue copy: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.copy(immutablePriorityQueue_LowNumberOfItemsConsecutiveIds);
  });


  bench("MutablePriorityQueue copy: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.copy(mutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutablePriorityQueue copy: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.copy(immutablePriorityQueue_MediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutablePriorityQueue copy: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.copy(immutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds);
  });


/*
 name                                                                           hz |    min |    max |   mean |    p75 |    p99 |   p995 |   p999 |     rme |  samples
-----------------------------------------------------------------------------------+--------+--------+--------+--------+--------+--------+--------+---------+-----------
 MutablePriorityQueue copy: lowNumberOfItemsConsecutiveIds              327,174.49   0.0025   0.2607   0.0031   0.0030   0.0052   0.0061   0.0098    ±0.35%     163588
 MutablePriorityQueue copy: mediumNumberOfItemsConsecutiveIds             7,869.98   0.1019   0.9736   0.1271   0.1298   0.2411   0.2715   0.4952    ±0.71%       3935
 MutablePriorityQueue copy: mediumNumberOfItemsNoConsecutiveIds           7,765.38   0.1128   0.4308   0.1288   0.1324   0.2143   0.2260   0.2730    ±0.36%       3883

 ImmutablePriorityQueue copy: lowNumberOfItemsConsecutiveIds            324,969.12   0.0023   1.5560   0.0031   0.0030   0.0055   0.0061   0.0097    ±0.74%     162485
 ImmutablePriorityQueue copy: mediumNumberOfItemsConsecutiveIds           7,959.54   0.1108   0.5084   0.1256   0.1283   0.2100   0.2318   0.2560    ±0.37%       3980
 ImmutablePriorityQueue copy: mediumNumberOfItemsNoConsecutiveIds         7,832.42   0.1118   0.4627   0.1277   0.1312   0.2094   0.2249   0.2829    ±0.36%       3917
*/



  /**
   * count comparison:
   */
  bench("MutablePriorityQueue count: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.count(mutablePriorityQueue_LowNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("MutablePriorityQueue count: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.count(mutablePriorityQueue_MediumNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("MutablePriorityQueue count: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.count(mutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds, isItemIdEven);
  });


  bench("ImmutablePriorityQueue count: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.count(immutablePriorityQueue_LowNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("ImmutablePriorityQueue count: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.count(immutablePriorityQueue_MediumNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("ImmutablePriorityQueue count: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.count(immutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds, isItemIdEven);
  });


/*
 name                                                                           hz |    min |    max |   mean |    p75 |    p99 |   p995 |   p999 |     rme |  samples
-----------------------------------------------------------------------------------+--------+--------+--------+--------+--------+--------+--------+---------+-----------
 MutablePriorityQueue count: lowNumberOfItemsConsecutiveIds           1,095,930.16   0.0008   1.2419   0.0009   0.0009   0.0013   0.0014   0.0031    ±0.49%     547966
 MutablePriorityQueue count: mediumNumberOfItemsConsecutiveIds           14,772.88   0.0566   0.4458   0.0677   0.0680   0.0860   0.1038   0.2143    ±0.35%       7387
 MutablePriorityQueue count: mediumNumberOfItemsNoConsecutiveIds         15,108.74   0.0610   0.4169   0.0662   0.0667   0.0792   0.0979   0.1986    ±0.31%       7555

 ImmutablePriorityQueue count: lowNumberOfItemsConsecutiveIds         1,131,314.72   0.0008   0.1709   0.0009   0.0009   0.0013   0.0016   0.0031    ±0.09%     565658
 ImmutablePriorityQueue count: mediumNumberOfItemsConsecutiveIds         14,678.54   0.0588   0.4842   0.0681   0.0683   0.0873   0.1058   0.2156    ±0.36%       7340
 ImmutablePriorityQueue count: mediumNumberOfItemsNoConsecutiveIds       15,076.85   0.0603   0.3699   0.0663   0.0666   0.0871   0.1008   0.2296    ±0.34%       7539
*/



  /**
   * filter comparison:
   */
  bench("MutablePriorityQueue filter: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.filter(mutablePriorityQueue_LowNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("MutablePriorityQueue filter: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.filter(mutablePriorityQueue_MediumNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("MutablePriorityQueue filter: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.filter(mutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds, isItemIdEven);
  });


  bench("ImmutablePriorityQueue filter: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.filter(immutablePriorityQueue_LowNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("ImmutablePriorityQueue filter: mediumNumberOfItemsConsecutiveIds", () => {
    QueueUtil.filter(immutablePriorityQueue_MediumNumberOfItemsConsecutiveIds, isItemIdEven);
  });


  bench("ImmutablePriorityQueue filter: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.filter(immutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds, isItemIdEven);
  });


/*
 name                                                                           hz |    min |    max |   mean |    p75 |    p99 |   p995 |   p999 |     rme |  samples
-----------------------------------------------------------------------------------+--------+--------+--------+--------+--------+--------+--------+---------+-----------
 MutablePriorityQueue filter: lowNumberOfItemsConsecutiveIds            125,508.31   0.0067   0.4647   0.0080   0.0079   0.0114   0.0122   0.0154    ±0.29%      62755
 MutablePriorityQueue filter: mediumNumberOfItemsConsecutiveIds           2,308.77   0.3602   0.9890   0.4331   0.4336   0.6068   0.7314   0.9132    ±0.52%       1155
 MutablePriorityQueue filter: mediumNumberOfItemsNoConsecutiveIds         2,521.56   0.3525   0.9048   0.3966   0.3961   0.5684   0.6514   0.8701    ±0.48%       1261

 ImmutablePriorityQueue filter: lowNumberOfItemsConsecutiveIds          366,089.25   0.0022   0.3645   0.0027   0.0027   0.0045   0.0053   0.0067    ±0.27%     183045
 ImmutablePriorityQueue filter: mediumNumberOfItemsConsecutiveIds         9,285.20   0.0925   0.7568   0.1077   0.1095   0.1483   0.1721   0.3626    ±0.49%       4643
 ImmutablePriorityQueue filter: mediumNumberOfItemsNoConsecutiveIds       9,732.94   0.0885   0.5446   0.1027   0.1072   0.1403   0.2115   0.3383    ±0.48%       4867
*/



  /**
   * groupBy comparison:
   */
  bench("MutablePriorityQueue groupBy: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.groupBy(mutablePriorityQueue_LowNumberOfItemsConsecutiveIds, getItemId, isItemIdEven);
  });


  bench("MutablePriorityQueue groupBy: mediumNumberOfItemsConsecutiveId", () => {
    QueueUtil.groupBy(mutablePriorityQueue_MediumNumberOfItemsConsecutiveIds, getItemId, isItemIdEven);
  });


  bench("MutablePriorityQueue groupBy: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.groupBy(mutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds, getItemId, isItemIdEven);
  });


  bench("ImmutablePriorityQueue groupBy: lowNumberOfItemsConsecutiveIds", () => {
    QueueUtil.groupBy(immutablePriorityQueue_LowNumberOfItemsConsecutiveIds, getItemId, isItemIdEven);
  });


  bench("ImmutablePriorityQueue groupBy: mediumNumberOfItemsConsecutiveId", () => {
    QueueUtil.groupBy(immutablePriorityQueue_MediumNumberOfItemsConsecutiveIds, getItemId, isItemIdEven);
  });


  bench("ImmutablePriorityQueue groupBy: mediumNumberOfItemsNoConsecutiveIds", () => {
    QueueUtil.groupBy(immutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds, getItemId, isItemIdEven);
  });


/*
 name                                                                           hz |    min |    max |   mean |    p75 |    p99 |   p995 |   p999 |     rme |  samples
-----------------------------------------------------------------------------------+--------+--------+--------+--------+--------+--------+--------+---------+-----------
 MutablePriorityQueue groupBy: lowNumberOfItemsConsecutiveIds           181,238.92   0.0043   0.5429   0.0055   0.0056   0.0088   0.0110   0.0164    ±0.33%      90620
 MutablePriorityQueue groupBy: mediumNumberOfItemsConsecutiveId           3,742.90   0.2351   1.3821   0.2672   0.2667   0.5240   0.5507   0.6709    ±0.79%       1872
 MutablePriorityQueue groupBy: mediumNumberOfItemsNoConsecutiveIds        3,763.17   0.2446   0.7936   0.2657   0.2673   0.5075   0.5419   0.6979    ±0.59%       1882

 ImmutablePriorityQueue groupBy: lowNumberOfItemsConsecutiveIds         164,322.20   0.0048   0.2839   0.0061   0.0061   0.0093   0.0107   0.0142    ±0.30%      82162
 ImmutablePriorityQueue groupBy: mediumNumberOfItemsConsecutiveId         3,229.84   0.2804   0.6845   0.3096   0.3081   0.5466   0.5791   0.6594    ±0.56%       1615
 ImmutablePriorityQueue groupBy: mediumNumberOfItemsNoConsecutiveIds      3,244.80   0.2843   0.6625   0.3082   0.3095   0.5641   0.6064   0.6397    ±0.57%       1623
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


const getItemId =
  (item: Item) => item.id;

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
