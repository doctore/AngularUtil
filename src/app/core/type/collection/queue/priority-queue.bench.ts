import { bench, describe } from 'vitest';
import { MutablePriorityQueue, ImmutablePriorityQueue } from '@app-core/type/collection/queue';
import { FComparator } from '@app-core/type/comparator';

/**
 * Benchmarks for comparing the performance of the {@link Set}s implementations backed by a hash table.
 *
 * To invoke only this benchmark:
 *
 *    vitest bench src/app/core/type/collection/queue/priority-queue.bench.ts
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
 *
 * @see MutablePriorityQueue
 * @see ImmutablePriorityQueue
 */
describe("Benchmark: MutablePriorityQueue vs ImmutablePriorityQueue", () => {


  /**
   * dequeue comparison:
   */
  bench("MutablePriorityQueue dequeue: lowNumberOfItemsConsecutiveIds", () => {
    const queue = MutablePriorityQueue.of<Item>(
      itemIdComparator,
      lowNumberOfItemsConsecutiveIds
    );
    for (let i = 0; i < lowNumberOfItemsConsecutiveIds.length; i++) {
      queue.dequeue();
    }
  });


  bench("ImmutablePriorityQueue dequeue: lowNumberOfItemsConsecutiveIds", () => {
    let queue = ImmutablePriorityQueue.of<Item>(
      itemIdComparator,
      lowNumberOfItemsConsecutiveIds
    );
    for (let i = 0; i < lowNumberOfItemsConsecutiveIds.length; i++) {
      queue = queue.dequeue()[1];
    }
  });


  bench("MutablePriorityQueue dequeue: mediumNumberOfItemsConsecutiveIds", () => {
    const queue = MutablePriorityQueue.of<Item>(
      itemIdComparator,
      mediumNumberOfItemsConsecutiveIds
    );
    for (let i = 0; i < mediumNumberOfItemsConsecutiveIds.length; i++) {
      queue.dequeue();
    }
  });


  bench("ImmutablePriorityQueue dequeue: mediumNumberOfItemsConsecutiveIds", () => {
    let queue = ImmutablePriorityQueue.of<Item>(
      itemIdComparator,
      mediumNumberOfItemsConsecutiveIds
    );
    for (let i = 0; i < mediumNumberOfItemsConsecutiveIds.length; i++) {
      queue = queue.dequeue()[1];
    }
  });


  bench("MutablePriorityQueue dequeue: mediumNumberOfItemsNoConsecutiveIds", () => {
    const queue = MutablePriorityQueue.of<Item>(
      itemIdComparator,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (let i = 0; i < mediumNumberOfItemsNoConsecutiveIds.length; i++) {
      queue.dequeue();
    }
  });


  bench("ImmutablePriorityQueue dequeue: mediumNumberOfItemsNoConsecutiveIds", () => {
    let queue = ImmutablePriorityQueue.of<Item>(
      itemIdComparator,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (let i = 0; i < mediumNumberOfItemsNoConsecutiveIds.length; i++) {
      queue = queue.dequeue()[1];
    }
  });


/*
 name                                                                                    hz |       min |      max |     mean |      p75 |      p99 |     p995 |     p999 |    rme |  samples
--------------------------------------------------------------------------------------------+-----------+----------+----------+----------+----------+----------+----------+--------+----------
 MutablePriorityQueue dequeue: lowNumberOfItemsConsecutiveIds                  387,849.9900     0.0020      0.3638     0.0026     0.0026     0.0048     0.0056     0.0073   ±0.22%     193925
 ImmutablePriorityQueue dequeue: lowNumberOfItemsConsecutiveIds                 14,764.7300     0.0564      4.9908     0.0677     0.0648     0.1812     0.1929     0.2146   ±2.03%       7383

 MutablePriorityQueue dequeue: mediumNumberOfItemsConsecutiveIds                 3,807.7900      0.2343     0.8423     0.2626     0.2633     0.3387     0.3780     0.6448   ±0.39%       1904
 ImmutablePriorityQueue dequeue: mediumNumberOfItemsConsecutiveIds                   6.6731    144.9800   154.7100   149.8600   151.2800   154.7100   154.7100   154.7100   ±1.26%         10

 MutablePriorityQueue dequeue: mediumNumberOfItemsNoConsecutiveIds               2,067.5700      0.4476     0.9918     0.4837     0.4834     0.5972     0.7210     0.9460   ±0.41%       1034
 ImmutablePriorityQueue dequeue: mediumNumberOfItemsNoConsecutiveIds                 6.6671    146.1600   155.6300   149.9900   151.7000   155.6300   155.6300   155.6300   ±1.38%         10
*/



  /**
   * enqueue comparison:
   */
  bench("MutablePriorityQueue enqueue: lowNumberOfItemsConsecutiveIds", () => {
    const queue = MutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      queue.enqueue(item);
    }
  });


  bench("ImmutablePriorityQueue enqueue: lowNumberOfItemsConsecutiveIds", () => {
    let queue = ImmutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      queue = queue.enqueue(item);
    }
  });


  bench("MutablePriorityQueue enqueue: mediumNumberOfItemsConsecutiveIds", () => {
    const queue = MutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      queue.enqueue(item);
    }
  });


  bench("ImmutablePriorityQueue enqueue: mediumNumberOfItemsConsecutiveIds", () => {
    let queue = ImmutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      queue = queue.enqueue(item);
    }
  });


  bench("MutablePriorityQueue enqueue: mediumNumberOfItemsNoConsecutiveIds", () => {
    const queue = MutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      queue.enqueue(item);
    }
  });


  bench("ImmutablePriorityQueue enqueue: mediumNumberOfItemsNoConsecutiveIds", () => {
    let queue = ImmutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      queue = queue.enqueue(item);
    }
  });


/*
 name                                                                                   hz |       min |      max |     mean |      p75 |      p99 |     p995 |     p999 |    rme |  samples
-------------------------------------------------------------------------------------------+-----------+----------+----------+----------+----------+----------+----------+--------+----------
 MutablePriorityQueue enqueue: lowNumberOfItemsConsecutiveIds                  76,032.5000      0.0109     0.3700     0.0132     0.0130     0.0183     0.0212     0.0860   ±0.29%      38017
 ImmutablePriorityQueue enqueue: lowNumberOfItemsConsecutiveIds                11,186.3900      0.0792     0.2521     0.0894     0.0893     0.1774     0.1884     0.2249   ±0.36%       5594

 MutablePriorityQueue enqueue: mediumNumberOfItemsConsecutiveIds                1,319.4200      0.6579     1.3162     0.7579     0.7546     0.9859     1.0369     1.3162   ±0.50%        660
 ImmutablePriorityQueue enqueue: mediumNumberOfItemsConsecutiveIds                  5.9265    163.4400   175.4000   168.7300   173.3000   175.4000   175.4000   175.4000   ±1.96%         10

 MutablePriorityQueue enqueue: mediumNumberOfItemsNoConsecutiveIds                774.3100      1.2149     1.7897     1.2915     1.2901     1.5842     1.6260     1.7897   ±0.50%        388
 ImmutablePriorityQueue enqueue: mediumNumberOfItemsNoConsecutiveIds                5.4495    181.0000   188.7600   183.5000   183.6400   188.7600   188.7600   188.7600   ±0.88%         10
*/



  /**
   * enqueueAll comparison:
   */
  bench("MutablePriorityQueue enqueueAll: lowNumberOfItemsConsecutiveIds", () => {
    const queue = MutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    queue.enqueueAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutablePriorityQueue enqueueAll: lowNumberOfItemsConsecutiveIds", () => {
    let queue = ImmutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    queue.enqueueAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutablePriorityQueue enqueueAll: mediumNumberOfItemsConsecutiveIds", () => {
    const queue = MutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    queue.enqueueAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutablePriorityQueue enqueueAll: mediumNumberOfItemsConsecutiveIds", () => {
    let queue = ImmutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    queue.enqueueAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutablePriorityQueue enqueueAll: mediumNumberOfItemsNoConsecutiveIds", () => {
    const queue = MutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    queue.enqueueAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutablePriorityQueue enqueueAll: mediumNumberOfItemsNoConsecutiveIds", () => {
    let queue = ImmutablePriorityQueue.empty<Item>(
      itemIdComparator
    );
    queue.enqueueAll(mediumNumberOfItemsNoConsecutiveIds);
  });


/*
 name                                                                                  hz |     min |    max |   mean |    p75 |    p99 |   p995 |   p999 |    rme |  samples
------------------------------------------------------------------------------------------+---------+--------+--------+--------+--------+--------+--------+--------+----------
 MutablePriorityQueue enqueueAll: lowNumberOfItemsConsecutiveIds               707,683.36    0.0010   0.2090   0.0014   0.0015   0.0022   0.0027   0.0043   ±0.27%     353842
 ImmutablePriorityQueue enqueueAll: lowNumberOfItemsConsecutiveIds             403,902.30    0.0019   1.4907   0.0025   0.0025   0.0042   0.0051   0.0073   ±0.62%     201952

 MutablePriorityQueue enqueueAll: mediumNumberOfItemsConsecutiveIds             15,002.82    0.0571   0.3349   0.0667   0.0694   0.0860   0.1043   0.2282   ±0.34%       7502
 ImmutablePriorityQueue enqueueAll: mediumNumberOfItemsConsecutiveIds            8,336.05    0.1048   0.4549   0.1200   0.1225   0.1505   0.1862   0.3145   ±0.36%       4169

 MutablePriorityQueue enqueueAll: mediumNumberOfItemsNoConsecutiveIds            3,441.26    0.2476   0.7054   0.2906   0.2912   0.3722   0.4052   0.6931   ±0.39%       1721
 ImmutablePriorityQueue enqueueAll: mediumNumberOfItemsNoConsecutiveIds          2,929.52    0.2943   0.8218   0.3414   0.3438   0.4171   0.4501   0.7887   ±0.42%       1465
*/




  /**
   * for...of comparison:
   */
  bench("MutablePriorityQueue for...of: lowNumberOfItemsConsecutiveIds", () => {
    let cont = 0;
    for (const item of mutablePriorityQueue_LowNumberOfItemsConsecutiveIds) {
      cont = item.id;
    }
  });


  bench("ImmutablePriorityQueue for...of: lowNumberOfItemsConsecutiveIds", () => {
    let cont = 0;
    for (const item of immutablePriorityQueue_LowNumberOfItemsConsecutiveIds) {
      cont = item.id;
    }
  });


  bench("MutablePriorityQueue for...of: mediumNumberOfItemsConsecutiveIds", () => {
    let cont = 0;
    for (const item of mutablePriorityQueue_MediumNumberOfItemsConsecutiveIds) {
      cont = item.id;
    }
  });


  bench("ImmutablePriorityQueue for...of: mediumNumberOfItemsConsecutiveIds", () => {
    let cont = 0;
    for (const item of immutablePriorityQueue_MediumNumberOfItemsConsecutiveIds) {
      cont = item.id;
    }
  });


  bench("MutablePriorityQueue for...of: mediumNumberOfItemsNoConsecutiveIds", () => {
    let cont = 0;
    for (const item of mutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds) {
      cont = item.id;
    }
  });


  bench("ImmutablePriorityQueue for...of: mediumNumberOfItemsNoConsecutiveIds", () => {
    let cont = 0;
    for (const item of immutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds) {
      cont = item.id;
    }
  });


/*
 name                                                                                  hz |    min |    max |   mean |    p75 |    p99 |   p995 |   p999 |    rme |  samples
------------------------------------------------------------------------------------------+--------+--------+--------+--------+--------+--------+--------+--------+----------
 MutablePriorityQueue for...of: lowNumberOfItemsConsecutiveIds              10,967,594.60   0.0001   0.0143   0.0001   0.0001   0.0002   0.0003   0.0006   ±0.05%    5483798
 ImmutablePriorityQueue for...of: lowNumberOfItemsConsecutiveIds            10,794,131.50   0.0001   0.0534   0.0001   0.0001   0.0001   0.0003   0.0006   ±0.05%    5397066

 MutablePriorityQueue for...of: mediumNumberOfItemsConsecutiveIds              368,665.67   0.0023   0.0536   0.0027   0.0027   0.0046   0.0055   0.0066   ±0.09%     184333
 ImmutablePriorityQueue for...of: mediumNumberOfItemsConsecutiveIds            370,319.31   0.0022   0.0429   0.0027   0.0027   0.0045   0.0053   0.0064   ±0.07%     185160

 MutablePriorityQueue for...of: mediumNumberOfItemsNoConsecutiveIds            393,323.63   0.0023   0.0261   0.0025   0.0025   0.0044   0.0051   0.0065   ±0.06%     196662
 ImmutablePriorityQueue for...of: mediumNumberOfItemsNoConsecutiveIds          393,906.20   0.0023   0.0420   0.0025   0.0025   0.0041   0.0050   0.0058   ±0.06%     196954
*/



  /**
   * has comparison:
   */
  bench("MutablePriorityQueue has: lowNumberOfItemsConsecutiveIds ", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      mutablePriorityQueue_LowNumberOfItemsConsecutiveIds.has(item);
    }
  });


  bench("ImmutablePriorityQueue has: lowNumberOfItemsConsecutiveIds ", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      immutablePriorityQueue_LowNumberOfItemsConsecutiveIds.has(item);
    }
  });


  bench("MutablePriorityQueue has: mediumNumberOfItemsConsecutiveIds ", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      mutablePriorityQueue_MediumNumberOfItemsConsecutiveIds.has(item);
    }
  });


  bench("ImmutablePriorityQueue has: mediumNumberOfItemsConsecutiveIds ", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      immutablePriorityQueue_MediumNumberOfItemsConsecutiveIds.has(item);
    }
  });


  bench("MutablePriorityQueue has: mediumNumberOfItemsNoConsecutiveIds ", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      mutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds.has(item);
    }
  });


  bench("ImmutablePriorityQueue has: mediumNumberOfItemsNoConsecutiveIds ", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      immutablePriorityQueue_MediumNumberOfItemsNoConsecutiveIds.has(item);
    }
  });


/*
 name                                                                                hz |    min |    max |   mean |    p75 |    p99 |   p995 |   p999 |    rme |  samples
----------------------------------------------------------------------------------------+--------+--------+--------+--------+--------+--------+--------+--------+----------
 MutablePriorityQueue has: lowNumberOfItemsConsecutiveIds                     76,780.67   0.0114   0.4209   0.0130   0.0128   0.0180   0.0201   0.0245   ±0.47%      38391
 ImmutablePriorityQueue has: lowNumberOfItemsConsecutiveIds                   76,672.50   0.0115   0.4478   0.0130   0.0129   0.0172   0.0189   0.0278   ±0.43%      38337

 MutablePriorityQueue has: mediumNumberOfItemsConsecutiveIds                   1,412.55   0.6506   1.0718   0.7079   0.7285   0.9551   0.9776   1.0718   ±0.50%        707
 ImmutablePriorityQueue has: mediumNumberOfItemsConsecutiveIds                 1,393.01   0.6633   1.2628   0.7179   0.7261   0.9721   1.0021   1.2628   ±0.53%        697

 MutablePriorityQueue has: mediumNumberOfItemsNoConsecutiveIds                 1,303.39   0.7196   1.2778   0.7672   0.7626   1.0134   1.0335   1.2778   ±0.50%        652
 ImmutablePriorityQueue has: mediumNumberOfItemsNoConsecutiveIds               1,294.53   0.7382   1.2830   0.7725   0.7664   1.0655   1.1636   1.2830   ±0.56%        648
*/



  /**
   * of comparison:
   */
  bench("MutablePriorityQueue of: lowNumberOfItemsConsecutiveIds", () => {
    MutablePriorityQueue.of<Item>(
      itemIdComparator,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutablePriorityQueue of: lowNumberOfItemsConsecutiveIds", () => {
    ImmutablePriorityQueue.of<Item>(
      itemIdComparator,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("MutablePriorityQueue of: mediumNumberOfItemsConsecutiveIds", () => {
    MutablePriorityQueue.of<Item>(
      itemIdComparator,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutablePriorityQueue of: mediumNumberOfItemsConsecutiveIds", () => {
    ImmutablePriorityQueue.of<Item>(
      itemIdComparator,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("MutablePriorityQueue of: mediumNumberOfItemsNoConsecutiveIds", () => {
    MutablePriorityQueue.of<Item>(
      itemIdComparator,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutablePriorityQueue of: mediumNumberOfItemsNoConsecutiveIds", () => {
    ImmutablePriorityQueue.of<Item>(
      itemIdComparator,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


/*
 name                                                                                hz |    min |    max |   mean |    p75 |    p99 |   p995 |   p999 |    rme |  samples
----------------------------------------------------------------------------------------+--------+--------+--------+--------+--------+--------+--------+--------+----------
 MutablePriorityQueue of: lowNumberOfItemsConsecutiveIds                     889,233.64   0.0009   0.2805   0.0011   0.0012   0.0017   0.0020   0.0038   ±0.15%     444617
 ImmutablePriorityQueue of: lowNumberOfItemsConsecutiveIds                   885,604.43   0.0009   0.4668   0.0011   0.0012   0.0018   0.0020   0.0036   ±0.26%     442803

 MutablePriorityQueue of: mediumNumberOfItemsConsecutiveIds                   18,784.53   0.0464   0.6880   0.0532   0.0543   0.0709   0.0758   0.2056   ±0.38%       9393
 ImmutablePriorityQueue of: mediumNumberOfItemsConsecutiveIds                 18,438.16   0.0462   0.6666   0.0542   0.0550   0.0741   0.0818   0.3099   ±0.49%       9220

 MutablePriorityQueue of: mediumNumberOfItemsNoConsecutiveIds                  3,576.94   0.2376   1.1224   0.2796   0.2784   0.3802   0.4584   0.8747   ±0.58%       1789
 ImmutablePriorityQueue of: mediumNumberOfItemsNoConsecutiveIds                3,598.26   0.2429   0.8683   0.2779   0.2782   0.3410   0.3911   0.8239   ±0.41%       1800
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
