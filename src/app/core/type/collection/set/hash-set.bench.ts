import { bench, describe } from 'vitest';
import { ImmutableHashSet, ImmutableLinkedHashSet, MutableHashSet, MutableLinkedHashSet } from '@app-core/type/collection/set';

/**
 * Benchmarks for comparing the performance of the {@link Set}s implementations backed by a hash table.
 *
 * To invoke only this benchmark:
 *
 *    vitest bench src/app/core/type/collection/set/hash-set.bench.ts
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
 * @see MutableHashSet
 * @see ImmutableHashSet
 */
describe("Benchmark: Native Set vs MutableHashSet vs ImmutableHashSet", () => {


  /**
   * add comparison:
   */
  bench("Native Set add: lowNumberOfItemsConsecutiveIds", () => {
    const set = new Set<Item>();
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableLinkedHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableLinkedHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableLinkedHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("Native Set add: mediumNumberOfItemsConsecutiveIds", () => {
    const set = new Set<Item>();
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableLinkedHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableLinkedHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableLinkedHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("Native Set add: mediumNumberOfItemsNoConsecutiveIds", () => {
    const set = new Set<Item>();
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableLinkedHashSet.empty<Item>(
      noCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableLinkedHashSet.empty<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableLinkedHashSet.empty<Item>(
      highCollisionHash,
      areItemsEquals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


/*
 Native Set add: lowNumberOfItemsConsecutiveIds                                            527,175.10   0.0013   0.3194   0.0019   0.0019   0.0033   0.0043   0.0077  ±0.34%   263588

 MutableHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash                      388,587.10   0.0018   7.2895   0.0026   0.0024   0.0059   0.0071   0.0251  ±2.88%   194294
 MutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                  372,122.57   0.0021   0.3790   0.0027   0.0027   0.0042   0.0050   0.0066  ±0.34%   186062
 MutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash                    390,869.02   0.0020   0.2891   0.0026   0.0026   0.0041   0.0050   0.0069  ±0.32%   195435

 MutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash                375,135.96   0.0021   0.5556   0.0027   0.0027   0.0042   0.0051   0.0065  ±0.33%   187569
 MutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash            328,986.87   0.0024   0.4141   0.0030   0.0031   0.0050   0.0057   0.0067  ±0.36%   164494
 MutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash              378,513.08   0.0021   0.3861   0.0026   0.0027   0.0043   0.0051   0.0063  ±0.36%   189257

 ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash                      5,921.03   0.1469   0.4844   0.1689   0.1689   0.2908   0.3238   0.4395  ±0.47%     2961
 ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                  5,727.93   0.1560   0.5260   0.1746   0.1755   0.2853   0.3050   0.3551  ±0.42%     2864
 ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash                    8,260.89   0.1004   0.4663   0.1211   0.1222   0.2044   0.2160   0.2628  ±0.38%     4131

 ImmutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash                5,480.55   0.1614   0.4893   0.1825   0.1840   0.2659   0.2749   0.3215  ±0.33%     2741
 ImmutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash            5,827.65   0.1535   0.4959   0.1716   0.1717   0.2920   0.3040   0.3638  ±0.45%     2914
 ImmutableLinkedHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash              7,072.63   0.1251   0.4758   0.1414   0.1422   0.2472   0.2566   0.2901  ±0.38%     3537

 Native Set add: mediumNumberOfItemsConsecutiveIds                                           5,131.87   0.1665   3.2805   0.1949   0.1956   0.2392   0.3504   3.0133  ±2.87%     2566

 MutableHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash                     3,751.99   0.2334   1.8393   0.2665   0.2664   0.3830   1.3757   1.5251  ±1.80%     1876
 MutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                 7,460.62   0.1157   0.3492   0.1340   0.1357   0.1603   0.2236   0.2858  ±0.27%     3731
 MutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash                   3,154.56   0.2862   0.7928   0.3170   0.3172   0.3977   0.4147   0.6546  ±0.37%     1578

 MutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash               3,580.54   0.2353   2.0418   0.2793   0.2728   1.0545   1.1220   1.4435  ±1.75%     1791
 MutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash           6,385.00   0.1330   0.8469   0.1566   0.1592   0.3261   0.4405   0.6995  ±0.82%     3193
 MutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash             3,104.17   0.2958   0.7337   0.3221   0.3225   0.4280   0.4708   0.6512  ±0.41%     1553

 ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash                     1.8216   522.12   558.71   548.95   556.39   558.71   558.71   558.71  ±1.67%       10
 ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                 7.4168   132.65   138.99   134.83   134.98   138.99   138.99   138.99  ±0.96%       10
 ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash                  59.8237  15.3456  19.2116  16.7158  18.6473  19.2116  19.2116  19.2116  ±3.31%       30

 ImmutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash               1.7796   545.99   580.57   561.94   575.24   580.57   580.57   580.57  ±1.74%       10
 ImmutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash           6.5531   146.58   157.03   152.60   154.68   157.03   157.03   157.03  ±1.81%       10
 ImmutableLinkedHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash            22.7987  41.0465  45.8363  43.8622  44.8642  45.8363  45.8363  45.8363  ±2.40%       12

 Native Set add: mediumNumberOfItemsNoConsecutiveIds                                         5,439.43   0.1574   3.0757   0.1838   0.1863   0.2439   0.2965   2.9077  ±2.79%     2720

 MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                   3,978.33   0.2165   2.1189   0.2514   0.2485   0.4008   1.2922   1.8164  ±1.87%     1990
 MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash               8,059.65   0.1134   0.5671   0.1241   0.1260   0.1607   0.2254   0.3330  ±0.40%     4030
 MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                 3,303.49   0.2806   0.8497   0.3027   0.3055   0.3693   0.4050   0.7983  ±0.44%     1652

 MutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             3,773.96   0.2336   1.4991   0.2650   0.2570   1.0258   1.1271   1.4567  ±1.68%     1887
 MutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         6,928.00   0.1301   0.5570   0.1443   0.1491   0.1868   0.3862   0.4908  ±0.58%     3464
 MutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash           3,075.80   0.3028   0.8071   0.3251   0.3259   0.4318   0.5553   0.7379  ±0.43%     1538

 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                   1.8478   517.94   550.49   541.20   547.29   550.49   550.49   550.49  ±1.53%       10
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash               7.5248   131.87   133.78   132.89   133.05   133.78   133.78   133.78  ±0.30%       10
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                59.1347  15.4533  18.8878  16.9106  18.6211  18.8878  18.8878  18.8878  ±3.20%       30

 ImmutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             1.7881   540.97   589.49   559.26   570.90   589.49   589.49   589.49  ±2.21%       10
 ImmutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         6.7734   145.73   150.56   147.64   149.09   150.56   150.56   150.56  ±0.82%       10
 ImmutableLinkedHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          22.8233  41.0211  44.8607  43.8149  44.5993  44.8607  44.8607  44.8607  ±2.00%       12
*/



  /**
   * addAll comparison:
   */
  bench("MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


/*
 MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash                     350,645.67   0.0021   0.3713   0.0029   0.0029   0.0046   0.0053   0.0066  ±0.29%   175323
 MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                 349,135.17   0.0022   0.3642   0.0029   0.0029   0.0047   0.0053   0.0069  ±0.30%   174568
 MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash                   390,586.47   0.0020   2.1004   0.0026   0.0026   0.0045   0.0050   0.0064  ±0.88%   195294

 MutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash               355,459.16   0.0023   0.3081   0.0028   0.0029   0.0044   0.0052   0.0067  ±0.30%   177730
 MutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           347,396.02   0.0023   0.3099   0.0029   0.0029   0.0044   0.0052   0.0063  ±0.28%   173699
 MutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash             360,802.87   0.0022   0.3992   0.0028   0.0028   0.0046   0.0054   0.0069  ±0.33%   180402

 ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash                   357,099.46   0.0019   7.9144   0.0028   0.0026   0.0062   0.0214   0.0247  ±3.13%   178550
 ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash               341,547.35   0.0023   0.5019   0.0029   0.0030   0.0046   0.0053   0.0067  ±0.35%   170774
 ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash                 395,878.17   0.0020   0.6343   0.0025   0.0025   0.0044   0.0051   0.0058  ±0.38%   197940

 ImmutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash             327,432.60   0.0024   0.3999   0.0031   0.0031   0.0045   0.0054   0.0073  ±0.36%   163717
 ImmutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         293,855.08   0.0027   0.1624   0.0034   0.0035   0.0055   0.0060   0.0077  ±0.27%   146928
 ImmutableLinkedHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash           311,266.76   0.0026   0.3851   0.0032   0.0033   0.0050   0.0056   0.0067  ±0.32%   155634

 MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash                    4,052.86   0.2181   1.5920   0.2467   0.2421   0.3882   1.2982   1.4274  ±1.76%     2027
 MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                8,068.06   0.1139   0.7471   0.1239   0.1261   0.1568   0.1856   0.3078  ±0.41%     4035
 MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash                  3,352.34   0.2851   0.9438   0.2983   0.2988   0.3723   0.3966   0.8894  ±0.44%     1677

 MutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash              3,752.91   0.2354   1.5174   0.2665   0.2565   1.0489   1.2707   1.5157  ±1.86%     1877
 MutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash          6,818.92   0.1328   0.7117   0.1467   0.1508   0.1979   0.4497   0.5596  ±0.73%     3410
 MutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash            3,181.31   0.2948   0.9919   0.3143   0.3159   0.4158   0.5821   0.7415  ±0.51%     1591

 ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash                  4,059.15   0.2188   1.6369   0.2464   0.2379   0.3566   1.3273   1.5391  ±1.85%     2030
 ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash              7,971.40   0.1151   0.5789   0.1254   0.1270   0.1745   0.2581   0.4542  ±0.52%     3986
 ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash                3,346.75   0.2754   1.1876   0.2988   0.2942   0.6395   0.7322   0.9454  ±0.92%     1674

 ImmutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash            3,280.37   0.2691   1.4536   0.3048   0.2940   1.1350   1.2420   1.4350  ±1.69%     1641
 ImmutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        5,859.12   0.1530   0.8437   0.1707   0.1728   0.3681   0.4377   0.6872  ±0.76%     2930
 ImmutableLinkedHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash          2,804.76   0.3264   0.9382   0.3565   0.3617   0.4442   0.5619   0.9078  ±0.58%     1403

 MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                  4,024.62   0.2190   1.8540   0.2485   0.2425   0.3596   1.3878   1.6276  ±1.96%     2013
 MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash              8,084.53   0.1131   0.4933   0.1237   0.1257   0.1520   0.1852   0.4043  ±0.44%     4043
 MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                3,177.68   0.2939   0.9074   0.3147   0.3189   0.3774   0.4303   0.7228  ±0.41%     1589

 MutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            3,771.54   0.2323   1.6189   0.2651   0.2532   1.0609   1.2591   1.4872  ±1.81%     1886
 MutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash        6,516.87   0.1332   0.6408   0.1534   0.1560   0.3159   0.4385   0.5571  ±0.73%     3259
 MutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          2,897.37   0.3051   1.3413   0.3451   0.3463   0.4473   0.6525   0.9166  ±0.61%     1449

 ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                3,814.06   0.2234   1.9862   0.2622   0.2548   0.3595   1.4125   1.9098  ±1.96%     1908
 ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash            7,525.04   0.1218   0.5390   0.1329   0.1341   0.1691   0.2253   0.4075  ±0.46%     3763
 ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash              3,154.52   0.2919   0.8522   0.3170   0.3161   0.4235   0.5457   0.7850  ±0.50%     1578

 ImmutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          3,280.31   0.2676   1.5338   0.3048   0.2979   1.1436   1.2842   1.5127  ±1.71%     1641
 ImmutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      5,542.32   0.1594   0.7865   0.1804   0.1825   0.2703   0.5181   0.6416  ±0.69%     2772
 ImmutableLinkedHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        2,651.67   0.3452   0.9295   0.3771   0.3772   0.4689   0.5566   0.8702  ±0.46%     1326
*/



  /**
   * delete comparison:
   */
  bench("Native Set delete: lowNumberOfItemsConsecutiveIds", () => {
    const set = new Set(lowNumberOfItemsConsecutiveIds);
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("Native Set delete: mediumNumberOfItemsConsecutiveIds", () => {
    const set = new Set<Item>(mediumNumberOfItemsConsecutiveIds);
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("Native Set delete: mediumNumberOfItemsNoConsecutiveIds", () => {
    const set = new Set<Item>(mediumNumberOfItemsNoConsecutiveIds);
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.delete(item);
    }
  });


  bench("ImmutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.delete(item);
    }
  });


/*
 Native Set delete: lowNumberOfItemsConsecutiveIds                                          305,784.56   0.0025   0.3061   0.0033   0.0034   0.0053   0.0059   0.0076  ±0.27%   152893

 MutableHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash                    145,493.01   0.0056   3.8125   0.0069   0.0069   0.0106   0.0117   0.0175  ±1.53%    72747
 MutableHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                134,639.08   0.0062   0.2532   0.0074   0.0076   0.0108   0.0118   0.0149  ±0.32%    67320
 MutableHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash                  158,663.86   0.0054   0.3763   0.0063   0.0064   0.0093   0.0100   0.0131  ±0.33%    79332

 MutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash               30,274.52   0.0294   2.4819   0.0330   0.0330   0.0444   0.0639   0.1521  ±1.02%    15138
 MutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           30,426.79   0.0298   0.1843   0.0329   0.0328   0.0436   0.0492   0.1305  ±0.28%    15214
 MutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash             30,766.16   0.0296   0.3820   0.0325   0.0322   0.0451   0.0700   0.1448  ±0.37%    15384

 ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash                    5,849.37   0.1553   0.4573   0.1710   0.1719   0.2582   0.2668   0.2809  ±0.31%     2925
 ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                5,727.32   0.1574   0.4630   0.1746   0.1752   0.2614   0.2685   0.3095  ±0.32%     2864
 ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash                  7,855.47   0.1085   0.2696   0.1273   0.1301   0.2150   0.2282   0.2493  ±0.33%     3928

 ImmutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash              4,855.02   0.1870   0.5061   0.2060   0.2060   0.3123   0.3186   0.3693  ±0.36%     2428
 ImmutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash          4,856.80   0.1895   0.3787   0.2059   0.2061   0.3042   0.3099   0.3707  ±0.33%     2429
 ImmutableLinkedHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash            6,573.24   0.1397   0.3058   0.1521   0.1538   0.2414   0.2547   0.2758  ±0.31%     3287

 Native Set delete: mediumNumberOfItemsConsecutiveIds                                         3,207.93   0.2672   2.2493   0.3117   0.3168   0.4408   0.4850   2.2212  ±1.88%     1604

 MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash                   1,979.70   0.4490   2.3689   0.5051   0.4999   1.5286   1.6020   2.3689  ±1.86%      990
 MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash               2,976.33   0.3135   3.1726   0.3360   0.3348   0.4800   0.5059   0.6709  ±1.18%     1489
 MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash                 1,976.19   0.4825   0.9029   0.5060   0.5058   0.6535   0.7189   0.9029  ±0.37%      989

 MutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash              18.6186  52.8039  56.5209  53.7096  53.9150  56.5209  56.5209  56.5209  ±1.43%       10
 MutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash          18.9326  52.3618  53.6884  52.8190  53.0068  53.6884  53.6884  53.6884  ±0.54%       10
 MutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash            18.6552  52.4038  54.9524  53.6043  54.6297  54.9524  54.9524  54.9524  ±1.42%       10

 ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash                   1.8719   522.32   552.95   534.21   548.89   552.95   552.95   552.95  ±1.84%       10
 ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash               7.5056   132.35   135.47   133.23   133.84   135.47   135.47   135.47  ±0.51%       10
 ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash                57.7511  16.8239  20.2979  17.3157  17.2853  20.2979  20.2979  20.2979  ±1.79%       29

 ImmutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash             1.6956   575.24   613.91   589.76   606.60   613.91   613.91   613.91  ±1.88%       10
 ImmutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash         5.5886   172.71   184.85   178.93   181.92   184.85   184.85   184.85  ±1.81%       10
 ImmutableLinkedHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash          15.2490  64.3461  67.7786  65.5779  66.1475  67.7786  67.7786  67.7786  ±1.17%       10

 Native Set delete: mediumNumberOfItemsNoConsecutiveIds                                       3,313.68   0.2616   2.3151   0.3018   0.3045   0.4770   1.6346   2.2824  ±2.30%     1657

 MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                 1,971.54   0.4501   2.5814   0.5072   0.4993   1.5273   1.7850   2.5814  ±2.03%      986
 MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash             2,971.67   0.3173   2.2319   0.3365   0.3366   0.4897   0.5294   0.5994  ±0.82%     1486
 MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash               1,945.51   0.4867   1.0509   0.5140   0.5138   0.6279   0.7503   1.0509  ±0.41%      973

 MutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            18.4359  52.8063  56.3266  54.2419  54.6642  56.3266  56.3266  56.3266  ±1.36%       10
 MutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash        18.4151  52.5809  56.0023  54.3034  55.1205  56.0023  56.0023  56.0023  ±1.52%       10
 MutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          18.4183  53.4342  55.3865  54.2937  54.8952  55.3865  55.3865  55.3865  ±0.96%       10

 ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                 1.8462   520.77   557.17   541.66   553.24   557.17   557.17   557.17  ±2.01%       10
 ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash             7.8253   126.55   129.58   127.79   128.35   129.58   129.58   129.58  ±0.51%       10
 ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash              60.3020  16.1943  17.2364  16.5832  16.7035  17.2364  17.2364  17.2364  ±0.58%       31

 ImmutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash           1.6969   574.88   609.40   589.29   603.90   609.40   609.40   609.40  ±1.74%       10
 ImmutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash       5.6780   173.25   183.54   176.12   177.07   183.54   183.54   183.54  ±1.49%       10
 ImmutableLinkedHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        14.9121  66.3055  69.3417  67.0596  67.2339  69.3417  69.3417  69.3417  ±0.94%       10
*/



  /**
   * deleteAll comparison:
   */
  bench("MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


/*
 MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash                  137,895.33   0.0058   0.1741   0.0073   0.0074   0.0104   0.0112   0.0152  ±0.27%    68948
 MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash              132,864.77   0.0061   0.5071   0.0075   0.0077   0.0108   0.0116   0.0145  ±0.30%    66433
 MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash                147,899.26   0.0059   0.2759   0.0068   0.0069   0.0096   0.0103   0.0136  ±0.26%    73950

 MutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash             28,933.23   0.0304   0.3238   0.0346   0.0343   0.0463   0.0559   0.1564  ±0.35%    14467
 MutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         28,741.34   0.0312   0.2139   0.0348   0.0345   0.0481   0.0557   0.1505  ±0.31%    14371
 MutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash           29,165.20   0.0307   0.3524   0.0343   0.0340   0.0467   0.0531   0.1452  ±0.32%    14583

 ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash                101,188.39   0.0083   2.4424   0.0099   0.0099   0.0140   0.0160   0.0393  ±1.00%    50595
 ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash             94,693.79   0.0085   0.3302   0.0106   0.0106   0.0158   0.0169   0.0234  ±0.28%    47347
 ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash              117,729.36   0.0072   0.3855   0.0085   0.0085   0.0120   0.0134   0.0184  ±0.32%    58865

 ImmutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash           77,089.84   0.0112   0.3944   0.0130   0.0129   0.0183   0.0206   0.0275  ±0.31%    38546
 ImmutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash       73,040.86   0.0118   0.3888   0.0137   0.0138   0.0193   0.0222   0.0297  ±0.31%    36521
 ImmutableLinkedHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash         89,831.61   0.0096   2.0230   0.0111   0.0110   0.0158   0.0184   0.0375  ±0.86%    44916

 MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash                 2,015.27   0.4489   1.9869   0.4962   0.4810   1.6326   1.7896   1.8977  ±1.97%     1008
 MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash             2,971.69   0.3150   0.7291   0.3365   0.3383   0.4771   0.5214   0.5666  ±0.36%     1486
 MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash               1,988.31   0.4773   0.7859   0.5029   0.5047   0.6344   0.6892   0.7859  ±0.32%      995

 MutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash            18.6502  53.0159  54.2777  53.6187  53.9070  54.2777  54.2777  54.2777  ±0.52%       10
 MutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        18.2349  53.3887  57.8058  54.8399  55.4409  57.8058  57.8058  57.8058  ±1.78%       10
 MutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash          18.4583  53.7281  55.8088  54.1762  54.1577  55.8088  55.8088  55.8088  ±0.82%       10

 ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash               1,239.79   0.7219   2.3516   0.8066   0.7727   2.0413   2.1591   2.3516  ±2.04%      620
 ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash           2,338.25   0.3899   0.9375   0.4277   0.4289   0.6686   0.7723   0.9246  ±0.58%     1170
 ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash               787.83   1.1867   1.9390   1.2693   1.2659   1.5178   1.6297   1.9390  ±0.43%      394

 ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash           601.67   1.5087   3.9586   1.6620   1.6598   3.4712   3.5574   3.9586  ±2.04%      301
 ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash       787.83   1.1925   2.1552   1.2693   1.2688   1.6615   1.7491   2.1552  ±0.62%      395
 ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash         479.30   2.0217   2.7980   2.0864   2.0847   2.3777   2.7954   2.7980  ±0.48%      240

 MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash               1,897.26   0.4647   2.2218   0.5271   0.5140   1.7327   1.9858   2.2218  ±2.06%      949
 MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash           2,756.38   0.3342   2.4628   0.3628   0.3616   0.5233   0.5561   0.6012  ±0.91%     1379
 MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash             1,825.93   0.4927   1.0390   0.5477   0.5491   0.6845   0.7338   1.0390  ±0.39%      913

 MutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          18.2445  54.2057  55.6701  54.8110  55.2163  55.6701  55.6701  55.6701  ±0.66%       10
 MutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      18.4571  53.7713  54.9212  54.1796  54.3760  54.9212  54.9212  54.9212  ±0.46%       10
 MutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        18.4661  53.7217  54.7113  54.1532  54.3454  54.7113  54.7113  54.7113  ±0.40%       10

 ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             1,238.69   0.7151   2.3406   0.8073   0.7722   1.9431   2.1312   2.3406  ±1.98%      620
 ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         2,345.72   0.3893   0.9381   0.4263   0.4277   0.7163   0.8349   0.9064  ±0.62%     1173
 ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash             850.76   1.1279   2.0422   1.1754   1.1720   1.5192   1.7329   2.0422  ±0.55%      426

 ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash         627.60   1.4717   5.1293   1.5934   1.5865   3.1881   3.6082   5.1293  ±2.35%      314
 ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash     835.75   1.1464   1.6879   1.1965   1.2008   1.5470   1.5971   1.6879  ±0.47%      418
 ImmutableLinkedHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash       511.14   1.9064   2.5225   1.9564   1.9473   2.3398   2.4837   2.5225  ±0.46%      256
*/



  /**
   * for...of comparison:
   */
  bench("Native Set for...of: lowNumberOfItemsConsecutiveIds", () => {
    let cont = 0;
    for (const item of nativeSet_LowNumberOfItemsConsecutiveIds) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of mutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of mutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of mutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of immutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of immutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of immutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("Native Set for...of: mediumNumberOfItemsConsecutiveIds", () => {
    let cont = 0;
    for (const item of nativeSet_MediumNumberOfItemsConsecutiveIds) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of mutableHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of mutableHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of mutableHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of mutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of mutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of mutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of immutableHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of immutableHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of immutableHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of immutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of immutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of immutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("Native Set for...of: mediumNumberOfItemsNoConsecutiveIds", () => {
    let cont = 0;
    for (const item of nativeSet_MediumNumberOfItemsNoConsecutiveIds) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("MutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let cont = 0;
    for (const item of immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let cont = 0;
    for (const item of immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash) {
      cont = item.id;
    }
  });


  bench("ImmutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let cont = 0;
    for (const item of immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash) {
      cont = item.id;
    }
  });


/*
 Native Set for...of: lowNumberOfItemsConsecutiveIds                                           5,127,418.27   0.0002   0.0223   0.0002   0.0002   0.0002   0.0004   0.0009  ±0.04%   2563710

 MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash                     1,185,605.67   0.0006   0.3313   0.0008   0.0009   0.0014   0.0016   0.0033  ±0.38%    592803
 MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                 1,199,194.07   0.0006   0.2590   0.0008   0.0009   0.0013   0.0016   0.0032  ±0.33%    599598
 MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash                   1,300,395.16   0.0006   0.1561   0.0008   0.0008   0.0014   0.0015   0.0031  ±0.28%    650198

 MutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash              11,612,121.68   0.0001   0.0385   0.0001   0.0001   0.0001   0.0002   0.0005  ±0.05%   5806061
 MutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash          11,361,671.84   0.0001   0.2035   0.0001   0.0001   0.0001   0.0003   0.0005  ±0.09%   5680836
 MutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash            12,058,197.04   0.0001   0.0139   0.0001   0.0001   0.0001   0.0002   0.0005  ±0.04%   6029099

 ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash                   1,195,326.63   0.0006   0.1893   0.0008   0.0009   0.0015   0.0016   0.0033  ±0.35%    597664
 ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash               1,223,315.90   0.0006   0.2408   0.0008   0.0008   0.0016   0.0016   0.0032  ±0.36%    611659
 ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash                 1,273,482.22   0.0006   0.3365   0.0008   0.0008   0.0013   0.0015   0.0032  ±0.41%    636742

 ImmutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash            12,262,172.28   0.0001   0.0548   0.0001   0.0001   0.0001   0.0003   0.0005  ±0.06%   6131087
 ImmutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash        11,529,087.70   0.0001   0.0484   0.0001   0.0001   0.0001   0.0002   0.0005  ±0.05%   5764544
 ImmutableLinkedHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash          12,202,220.63   0.0001   0.0403   0.0001   0.0001   0.0002   0.0003   0.0005  ±0.05%   6101111

 Native Set for...of: mediumNumberOfItemsConsecutiveIds                                          132,679.16   0.0073   0.0708   0.0075   0.0074   0.0103   0.0113   0.0132  ±0.07%     66340

 MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash                     34,236.67   0.0253   0.4907   0.0292   0.0294   0.0387   0.0473   0.1949  ±0.48%     17119
 MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                 40,201.99   0.0184   0.4463   0.0249   0.0255   0.0336   0.0396   0.1612  ±0.47%     20101
 MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash                   42,230.91   0.0151   0.3486   0.0237   0.0246   0.0286   0.0327   0.2218  ±0.55%     21122

 MutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash              396,878.75   0.0023   0.0428   0.0025   0.0025   0.0036   0.0040   0.0050  ±0.05%    198440
 MutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash          400,431.92   0.0023   0.0334   0.0025   0.0025   0.0037   0.0044   0.0054  ±0.05%    200216
 MutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash            398,519.63   0.0023   0.0439   0.0025   0.0025   0.0038   0.0043   0.0054  ±0.06%    199261

 ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash                   34,692.78   0.0241   0.2312   0.0288   0.0288   0.0406   0.0499   0.1713  ±0.40%     17347
 ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash               39,295.49   0.0201   0.2754   0.0254   0.0257   0.0337   0.0425   0.1645  ±0.43%     19648
 ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash                 42,163.10   0.0147   0.3732   0.0237   0.0247   0.0321   0.0369   0.2206  ±0.64%     21082

 ImmutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash            375,979.21   0.0023   0.0354   0.0027   0.0026   0.0046   0.0052   0.0065  ±0.07%    187990
 ImmutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        378,296.75   0.0023   0.0588   0.0026   0.0026   0.0044   0.0051   0.0060  ±0.07%    189149
 ImmutableLinkedHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash          377,599.88   0.0023   0.0430   0.0026   0.0026   0.0044   0.0051   0.0060  ±0.06%    188800

 Native Set for...of: mediumNumberOfItemsNoConsecutiveIds                                        124,179.38   0.0074   0.0417   0.0081   0.0079   0.0120   0.0144   0.0199  ±0.09%     62090

 MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                   34,823.01   0.0241   0.4395   0.0287   0.0288   0.0370   0.0460   0.1464  ±0.41%     17412
 MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash               38,660.82   0.0197   0.3849   0.0259   0.0262   0.0386   0.0448   0.1641  ±0.47%     19331
 MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                 41,939.48   0.0152   0.4390   0.0238   0.0248   0.0304   0.0341   0.2097  ±0.59%     20970

 MutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            387,251.53   0.0023   0.0460   0.0026   0.0025   0.0041   0.0049   0.0058  ±0.06%    193626
 MutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash        384,433.07   0.0022   0.0431   0.0026   0.0025   0.0043   0.0049   0.0058  ±0.06%    192217
 MutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          412,736.44   0.0022   0.0454   0.0024   0.0024   0.0035   0.0039   0.0049  ±0.05%    206369

 ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                 36,813.76   0.0233   0.2093   0.0272   0.0273   0.0394   0.0466   0.1399  ±0.35%     18407
 ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash             38,754.15   0.0195   0.3475   0.0258   0.0265   0.0378   0.0466   0.2223  ±0.56%     19378
 ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash               41,858.64   0.0159   0.3764   0.0239   0.0250   0.0324   0.0366   0.1630  ±0.47%     20934

 ImmutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          384,826.49   0.0022   0.0360   0.0026   0.0025   0.0045   0.0052   0.0064  ±0.08%    192414
 ImmutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      411,830.70   0.0022   0.0360   0.0024   0.0024   0.0034   0.0040   0.0050  ±0.05%    205916
 ImmutableLinkedHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        406,563.57   0.0022   0.0432   0.0025   0.0024   0.0040   0.0050   0.0060  ±0.07%    203282
*/



  /**
   * has comparison:
   */
  bench("Native Set has: lowNumberOfItemsConsecutiveIds", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      nativeSet_LowNumberOfItemsConsecutiveIds.has(item);
    }
  });


  bench("MutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      mutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("MutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      mutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("MutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      mutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("MutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("MutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("MutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      immutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      immutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      immutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("ImmutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("ImmutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("ImmutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    for (const item of lowNumberOfItemsConsecutiveIds) {
      immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("Native Set has: mediumNumberOfItemsConsecutiveIds", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      nativeSet_MediumNumberOfItemsConsecutiveIds.has(item);
    }
  });

  bench("MutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      mutableHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      mutableHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      mutableHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("MutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      mutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("MutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      mutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("MutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      mutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      immutableHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      immutableHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      immutableHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("ImmutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      immutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("ImmutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      immutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("ImmutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      immutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("Native Set has: mediumNumberOfItemsNoConsecutiveIds", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      nativeSet_MediumNumberOfItemsNoConsecutiveIds.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("MutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("MutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("MutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash.has(item);
    }
  });


  bench("ImmutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash.has(item);
    }
  });


  bench("ImmutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash.has(item);
    }
  });


  bench("ImmutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash.has(item);
    }
  });


/*
 Native Set has: lowNumberOfItemsConsecutiveIds                                               24,170,305.76   0.0000   0.0285   0.0000   0.0000   0.0001   0.0001   0.0002  ±0.05%  12085153

 MutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash                          1,603,148.42   0.0006   0.0236   0.0006   0.0006   0.0011   0.0013   0.0014  ±0.04%    801575
 MutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                      1,085,931.50   0.0009   0.0259   0.0009   0.0009   0.0014   0.0017   0.0033  ±0.05%    542966
 MutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash                        1,028,595.97   0.0009   0.0468   0.0010   0.0010   0.0016   0.0018   0.0033  ±0.05%    514298

 MutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash                    1,614,188.10   0.0006   0.0532   0.0006   0.0006   0.0011   0.0013   0.0014  ±0.04%    807095
 MutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                1,120,399.34   0.0008   0.0428   0.0009   0.0009   0.0014   0.0016   0.0032  ±0.05%    560200
 MutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash                  1,011,519.86   0.0009   0.0231   0.0010   0.0010   0.0017   0.0018   0.0033  ±0.05%    505760

 ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash                        1,506,327.68   0.0006   0.0339   0.0007   0.0007   0.0012   0.0014   0.0027  ±0.05%    753164
 ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                    1,089,381.80   0.0008   0.0489   0.0009   0.0009   0.0014   0.0016   0.0032  ±0.05%    544691
 ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash                      1,029,249.64   0.0009   0.0539   0.0010   0.0010   0.0016   0.0017   0.0032  ±0.06%    514625

 ImmutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash                  1,631,284.54   0.0006   0.0307   0.0006   0.0006   0.0009   0.0012   0.0014  ±0.04%    815643
 ImmutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash              1,095,129.94   0.0008   0.0303   0.0009   0.0009   0.0016   0.0017   0.0032  ±0.06%    547565
 ImmutableLinkedHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash                1,019,891.11   0.0009   0.0292   0.0010   0.0010   0.0017   0.0017   0.0033  ±0.05%    509946

 Native Set has: mediumNumberOfItemsConsecutiveIds                                               918,919.45   0.0011   0.0540   0.0011   0.0011   0.0015   0.0018   0.0030  ±0.04%    459460

 MutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash                          14,666.25   0.0642   0.1542   0.0682   0.0687   0.0850   0.0982   0.1206  ±0.15%      7334
 MutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                      11,582.81   0.0811   0.1346   0.0863   0.0873   0.1023   0.1069   0.1281  ±0.14%      5792
 MutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash                         3,670.45   0.2645   0.5296   0.2724   0.2725   0.3273   0.3495   0.4726  ±0.24%      1836

 MutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash                    14,773.74   0.0642   0.1094   0.0677   0.0682   0.0817   0.0863   0.1000  ±0.10%      7387
 MutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                11,736.31   0.0807   0.2887   0.0852   0.0854   0.1133   0.1303   0.2037  ±0.25%      5869
 MutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash                   3,644.06   0.2671   0.4704   0.2744   0.2720   0.3390   0.3794   0.4617  ±0.25%      1823

 ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash                        14,755.66   0.0644   0.1142   0.0678   0.0683   0.0781   0.0834   0.0937  ±0.09%      7378
 ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                    11,816.89   0.0810   0.1985   0.0846   0.0851   0.1012   0.1170   0.1564  ±0.16%      5909
 ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash                       3,666.20   0.2664   0.5147   0.2728   0.2721   0.3175   0.3587   0.5141  ±0.23%      1834

 ImmutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash                  14,449.62   0.0655   0.1222   0.0692   0.0697   0.0818   0.0922   0.1077  ±0.11%      7225
 ImmutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash              11,937.49   0.0800   0.1332   0.0838   0.0845   0.1014   0.1128   0.1293  ±0.12%      5969
 ImmutableLinkedHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash                 3,649.61   0.2623   0.4284   0.2740   0.2770   0.3419   0.3641   0.4274  ±0.29%      1825

 Native Set has: mediumNumberOfItemsNoConsecutiveIds                                             917,116.44   0.0011   0.0453   0.0011   0.0011   0.0017   0.0019   0.0031  ±0.04%    458559

 MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                        14,528.88   0.0651   0.1985   0.0688   0.0690   0.0886   0.0963   0.1258  ±0.16%      7265
 MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash                    11,793.48   0.0815   0.1391   0.0848   0.0855   0.1019   0.1075   0.1323  ±0.11%      5897
 MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                       3,640.68   0.2688   0.4017   0.2747   0.2736   0.3284   0.3593   0.4009  ±0.19%      1821

 MutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                  14,321.84   0.0658   0.1760   0.0698   0.0701   0.0860   0.1036   0.1186  ±0.15%      7161
 MutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash              11,530.85   0.0831   0.2863   0.0867   0.0874   0.1057   0.1126   0.1322  ±0.14%      5766
 MutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                 3,671.97   0.2649   0.4558   0.2723   0.2729   0.3211   0.3464   0.3914  ±0.19%      1836

 ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                      14,436.97   0.0657   0.1272   0.0693   0.0700   0.0751   0.0817   0.1049  ±0.09%      7219
 ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash                  11,796.14   0.0807   0.2049   0.0848   0.0856   0.1024   0.1187   0.1454  ±0.16%      5899
 ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                     3,650.97   0.2652   0.7749   0.2739   0.2724   0.3736   0.4239   0.7249  ±0.39%      1826

 ImmutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                14,565.92   0.0644   0.1535   0.0687   0.0691   0.0893   0.0974   0.1127  ±0.15%      7283
 ImmutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash            11,813.50   0.0807   0.1461   0.0846   0.0852   0.1052   0.1158   0.1266  ±0.13%      5907
 ImmutableLinkedHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash               3,670.64   0.2654   0.5581   0.2724   0.2713   0.3381   0.3480   0.4339  ±0.24%      1836
*/



  /**
   * of comparison:
   */
  bench("Native Set of: lowNumberOfItemsConsecutiveIds", () => {
    new Set<Item>(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("Native Set of: mediumNumberOfItemsConsecutiveIds", () => {
    new Set<Item>(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("Native Set of: mediumNumberOfItemsNoConsecutiveIds", () => {
    new Set<Item>(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("MutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    MutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("MutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    MutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("MutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    MutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    ImmutableLinkedHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    ImmutableLinkedHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    ImmutableLinkedHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


/*
 Native Set of: lowNumberOfItemsConsecutiveIds                                             538,637.17   0.0013   0.4911   0.0019   0.0019   0.0027   0.0031   0.0048  ±0.37%   269319

 MutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash                       379,916.92   0.0020   2.9596   0.0026   0.0027   0.0040   0.0050   0.0075  ±1.20%   189959
 MutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                   374,651.44   0.0021   0.3877   0.0027   0.0027   0.0038   0.0046   0.0063  ±0.29%   187326
 MutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash                     415,921.43   0.0019   0.4904   0.0024   0.0025   0.0034   0.0040   0.0055  ±0.35%   207961

 MutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash                 361,329.18   0.0022   0.3935   0.0028   0.0028   0.0041   0.0050   0.0066  ±0.31%   180665
 MutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash             353,974.97   0.0023   0.2671   0.0028   0.0029   0.0041   0.0050   0.0066  ±0.35%   176988
 MutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash               381,474.66   0.0021   0.3213   0.0026   0.0027   0.0038   0.0046   0.0059  ±0.27%   190738

 ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash                     380,718.98   0.0020   0.2972   0.0026   0.0027   0.0038   0.0047   0.0069  ±0.36%   190360
 ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                 380,922.28   0.0021   0.4523   0.0026   0.0027   0.0039   0.0048   0.0063  ±0.30%   190462
 ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash                   406,021.55   0.0020   0.2701   0.0025   0.0025   0.0039   0.0046   0.0056  ±0.26%   203011

 ImmutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash               313,312.00   0.0026   3.9766   0.0032   0.0032   0.0056   0.0062   0.0085  ±1.59%   156656
 ImmutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           306,981.17   0.0026   0.2288   0.0033   0.0033   0.0051   0.0059   0.0076  ±0.32%   153491
 ImmutableLinkedHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash             315,558.13   0.0026   1.9359   0.0032   0.0032   0.0054   0.0060   0.0081  ±0.80%   157780

 Native Set of: mediumNumberOfItemsConsecutiveIds                                            5,110.66   0.1659   4.2446   0.1957   0.1956   0.2439   0.3482   3.5677  ±3.43%     2556

 MutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash                      4,036.89   0.2203   1.9251   0.2477   0.2374   0.3319   1.3773   1.8207  ±2.09%     2019
 MutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                  8,023.70   0.1148   0.5051   0.1246   0.1261   0.1557   0.1913   0.2555  ±0.31%     4012
 MutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash                    3,442.48   0.2766   0.6982   0.2905   0.2916   0.3620   0.3883   0.6977  ±0.35%     1722

 MutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash                3,615.72   0.2389   3.2188   0.2766   0.2702   1.0702   1.1517   2.4307  ±2.17%     1808
 MutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash            6,643.39   0.1331   0.6019   0.1505   0.1538   0.2276   0.4292   0.5254  ±0.67%     3323
 MutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash              3,002.87   0.3068   0.7077   0.3330   0.3348   0.4206   0.4686   0.6441  ±0.34%     1502

 ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash                    3,818.81   0.2272   2.0691   0.2619   0.2522   0.3711   1.6601   1.8916  ±2.20%     1910
 ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                6,228.43   0.1478   0.7059   0.1606   0.1618   0.1983   0.2324   0.3508  ±0.35%     3115
 ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash                    962.31   0.9826   1.8223   1.0392   1.0377   1.1912   1.2340   1.8223  ±0.43%      482

 ImmutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash              3,317.45   0.2621   1.7665   0.3014   0.2892   1.2116   1.4099   1.6417  ±1.92%     1659
 ImmutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash          5,180.79   0.1754   0.7421   0.1930   0.1953   0.2974   0.5238   0.6770  ±0.69%     2591
 ImmutableLinkedHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash              997.35   0.9672   1.4490   1.0027   0.9984   1.1881   1.3211   1.4490  ±0.37%      499

 Native Set of: mediumNumberOfItemsNoConsecutiveIds                                          5,208.54   0.1653   3.7497   0.1920   0.1942   0.2500   0.3224   3.0510  ±3.09%     2605

 MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                    4,018.99   0.2212   2.1048   0.2488   0.2417   0.3673   1.2940   1.6094  ±1.99%     2010
 MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash                8,069.68   0.1149   0.4297   0.1239   0.1257   0.1530   0.1944   0.3653  ±0.39%     4035
 MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                  3,327.14   0.2824   0.7876   0.3006   0.2994   0.4619   0.7036   0.7342  ±0.62%     1664

 MutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash              3,536.51   0.2390   2.9057   0.2828   0.2704   1.1461   1.2945   1.6391  ±2.10%     1769
 MutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash          6,777.26   0.1316   0.8523   0.1476   0.1517   0.3203   0.4186   0.5406  ±0.73%     3389
 MutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash            2,940.56   0.3137   0.7122   0.3401   0.3409   0.4239   0.4536   0.6854  ±0.36%     1471

 ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                  3,847.78   0.2284   1.9588   0.2599   0.2493   0.3770   1.4179   1.8816  ±2.00%     1924
 ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash              6,630.00   0.1392   0.6274   0.1508   0.1520   0.2236   0.3227   0.4285  ±0.47%     3316
 ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                1,042.11   0.9386   1.4710   0.9596   0.9592   1.0855   1.1493   1.4710  ±0.28%      522

 ImmutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            3,509.91   0.2556   1.6012   0.2849   0.2712   1.0627   1.2203   1.5792  ±1.73%     1756
 ImmutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash        5,125.80   0.1771   0.6856   0.1951   0.1981   0.2524   0.4025   0.5701  ±0.51%     2563
 ImmutableLinkedHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash            989.29   0.9764   1.5276   1.0108   1.0063   1.3036   1.3333   1.5276  ±0.42%      495
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
      id: i + (i * 100),
      name: `Item ${(i + (i * 100))}`
    })
);

const noCollisionHash =
  (i: Item) => i.id;
const mediumCollisionHash =
  (i: Item) => i.id % 1000;
const highCollisionHash =
  (i: Item) => i.id % 50;

const areItemsEquals =
  (a: Item, b: Item) => a.id === b.id;


const nativeSet_LowNumberOfItemsConsecutiveIds = new Set<Item>(
  lowNumberOfItemsConsecutiveIds
);
const nativeSet_MediumNumberOfItemsConsecutiveIds = new Set<Item>(
  mediumNumberOfItemsConsecutiveIds
);
const nativeSet_MediumNumberOfItemsNoConsecutiveIds = new Set<Item>(
  mediumNumberOfItemsNoConsecutiveIds
);

const mutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash = MutableHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const mutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash = MutableHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const mutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash = MutableHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const mutableHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash = MutableHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const mutableHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash = MutableHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const mutableHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash = MutableHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash = MutableHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);
const mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash = MutableHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);
const mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash = MutableHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);

const mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash = MutableLinkedHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash = MutableLinkedHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash = MutableLinkedHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const mutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash = MutableLinkedHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const mutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash = MutableLinkedHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const mutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash = MutableLinkedHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash = MutableLinkedHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);
const mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash = MutableLinkedHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);
const mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash = MutableLinkedHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);

const immutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash = ImmutableHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const immutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash = ImmutableHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const immutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash = ImmutableHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const immutableHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash = ImmutableHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const immutableHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash = ImmutableHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const immutableHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash = ImmutableHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash = ImmutableHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);
const immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash = ImmutableHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);
const immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash = ImmutableHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);

const immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash = ImmutableLinkedHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash = ImmutableLinkedHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash = ImmutableLinkedHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  lowNumberOfItemsConsecutiveIds
);
const immutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_NoCollisionHash = ImmutableLinkedHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const immutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_MediumCollisionHash = ImmutableLinkedHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const immutableLinkedHashSet_MediumNumberOfItemsConsecutiveIds_HighCollisionHash = ImmutableLinkedHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsConsecutiveIds
);
const immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash = ImmutableLinkedHashSet.of<Item>(
  noCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);
const immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash = ImmutableLinkedHashSet.of<Item>(
  mediumCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);
const immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash = ImmutableLinkedHashSet.of<Item>(
  highCollisionHash,
  areItemsEquals,
  mediumNumberOfItemsNoConsecutiveIds
);
