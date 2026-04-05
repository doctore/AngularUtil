import { bench, describe } from 'vitest';
import { ImmutableHashSet, MutableHashSet } from '@app-core/type/collection/set';

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


/*
 Native Set of: lowNumberOfItemsConsecutiveIds                                          516,835.03  0.0013   0.8810  0.0019  0.0019   0.0038   0.0049   0.0087  ±0.48%   258418
 MutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash                    422,797.14  0.0017   1.7115  0.0024  0.0024   0.0034   0.0045   0.0127  ±0.74%   211399
 MutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                379,457.84  0.0021   0.3173  0.0026  0.0027   0.0040   0.0047   0.0072  ±0.28%   189729
 MutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash                  401,031.52  0.0020   0.3919  0.0025  0.0025   0.0041   0.0049   0.0059  ±0.33%   200516
 ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash                  425,894.35  0.0018   2.4754  0.0023  0.0024   0.0035   0.0046   0.0070  ±1.01%   212948
 ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash              326,822.91  0.0022   6.5572  0.0031  0.0028   0.0078   0.0217   0.0265  ±2.60%   163412
 ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash                422,609.95  0.0019   0.1603  0.0024  0.0024   0.0033   0.0039   0.0061  ±0.30%   211305

 Native Set of: mediumNumberOfItemsConsecutiveIds                                         5,104.49  0.1640   3.5021  0.1959  0.1954   0.2871   0.4015   3.2757  ±3.12%     2553
 MutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash                   4,039.93  0.2207   1.7256  0.2475  0.2457   0.3501   1.2500   1.4781  ±1.73%     2020
 MutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash               7,968.15  0.1154   0.5036  0.1255  0.1274   0.1562   0.1890   0.3339  ±0.37%     3985
 MutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash                 3,289.18  0.2836   1.0106  0.3040  0.3077   0.4026   0.4537   0.9167  ±0.51%     1645
 ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash                 4,062.42  0.2208   1.5759  0.2462  0.2407   0.3573   1.2614   1.4630  ±1.69%     2032
 ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash             7,460.28  0.1168   0.6222  0.1340  0.1351   0.1956   0.2906   0.3699  ±0.46%     3731
 ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash               3,141.04  0.2977   0.9307  0.3184  0.3168   0.4202   0.5048   0.6824  ±0.44%     1571

 Native Set of: mediumNumberOfItemsNoConsecutiveIds                                       5,025.81  0.1695   3.6251  0.1990  0.2006   0.2531   0.3131   3.0324  ±2.82%     2513
 MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                 3,821.53  0.2295   1.9092  0.2617  0.2572   0.3737   1.3511   1.8008  ±1.90%     1911
 MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash             7,965.00  0.1142   0.5167  0.1255  0.1266   0.1861   0.3204   0.4252  ±0.56%     3983
 MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash               3,293.23  0.2768   0.8013  0.3037  0.3071   0.4511   0.6055   0.7551  ±0.57%     1647
 ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash               4,020.40  0.2195   2.2513  0.2487  0.2460   0.5201   1.2643   1.4735  ±1.85%     2011
 ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash           8,057.50  0.1143   0.5744  0.1241  0.1258   0.1556   0.2117   0.3480  ±0.42%     4029
 ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash             3,419.26  0.2769   0.8427  0.2925  0.2931   0.3599   0.4093   0.8193  ±0.41%     1710
*/



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


/*
 Native Set add: lowNumberOfItemsConsecutiveIds                                         581,845.46  0.0013   0.3441  0.0017  0.0018   0.0025   0.0031   0.0048  ±0.37%   290923
 MutableHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash                   369,247.25  0.0020   0.2718  0.0027  0.0028   0.0039   0.0047   0.0059  ±0.37%   184624
 MutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash               366,256.35  0.0021   2.8271  0.0027  0.0028   0.0047   0.0053   0.0073  ±1.14%   183129
 MutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash                 392,824.96  0.0019   5.4787  0.0025  0.0024   0.0050   0.0169   0.0199  ±2.19%   196413
 ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash                   6,693.15  0.1361   0.5769  0.1494  0.1498   0.2635   0.2740   0.2928  ±0.44%     3347
 ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash               6,705.77  0.1357   0.5024  0.1491  0.1496   0.2770   0.2902   0.3203  ±0.44%     3353
 ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash                 8,943.38  0.0998   0.4284  0.1118  0.1125   0.2195   0.2298   0.2518  ±0.39%     4472

 Native Set add: mediumNumberOfItemsConsecutiveIds                                        5,437.23  0.1572   3.4110  0.1839  0.1860   0.2309   0.4085   2.9467  ±2.91%     2719
 MutableHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash                  4,019.82  0.2208   1.9326  0.2488  0.2435   0.3780   1.3171   1.6317  ±1.90%     2010
 MutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash              8,075.93  0.1135   0.5252  0.1238  0.1259   0.1517   0.1827   0.2760  ±0.34%     4038
 MutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash                3,317.94  0.2820   0.8479  0.3014  0.3011   0.3710   0.4041   0.6659  ±0.42%     1659
 ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash                  1.9018  519.14   546.99  525.81  528.64   546.99   546.99   546.99  ±1.44%       10
 ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash              7.8124  125.54   134.17  128.00  130.65   134.17   134.17   134.17  ±1.79%       10
 ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash               59.0000 15.3000  19.4779 16.9492 18.7098  19.4779  19.4779  19.4779  ±3.41%       30

 Native Set add: mediumNumberOfItemsNoConsecutiveIds                                      5,268.40  0.1578   3.5212  0.1898  0.1905   0.2654   0.4404   3.0325  ±3.06%     2635
 MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                4,057.56  0.2195   1.8915  0.2465  0.2409   0.3622   1.2588   1.5597  ±1.82%     2029
 MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash            7,227.64  0.1121   0.7346  0.1384  0.1280   0.2820   0.3123   0.5984  ±1.17%     3614
 MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash              3,233.49  0.2881   0.8881  0.3093  0.3084   0.4014   0.4758   0.8000  ±0.46%     1617
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                1.9131  517.26   531.19  522.72  525.82   531.19   531.19   531.19  ±0.56%       10
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash            7.6373  129.89   132.25  130.94  131.34   132.25   132.25   132.25  ±0.47%       10
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash             56.7878  15.2402 19.0224 17.6094 18.5839  19.0224  19.0224  19.0224  ±3.18%       29
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


/*
 MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash                375,294.63  0.0020   0.1540  0.0027  0.0027   0.0038   0.0047   0.0061  ±0.25%   187648
 MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash            367,266.90  0.0021   1.6231  0.0027  0.0028   0.0045   0.0051   0.0074  ±0.69%   183634
 MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash              399,705.60  0.0020   0.2899  0.0025  0.0025   0.0038   0.0047   0.0057  ±0.30%   199853
 ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash              354,249.39  0.0020   6.0376  0.0028  0.0027   0.0053   0.0075   0.0233  ±2.39%   177125
 ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash          356,169.36  0.0022   0.3437  0.0028  0.0028   0.0043   0.0052   0.0068  ±0.36%   178085
 ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash            384,773.20  0.0021   0.1968  0.0026  0.0026   0.0044   0.0050   0.0068  ±0.34%   192387

 MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash               3,789.86  0.2286   2.8039  0.2639  0.2535   0.4745   1.4394   2.1163  ±2.22%     1895
 MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash           8,036.67  0.1152   0.5877  0.1244  0.1264   0.1536   0.2724   0.3383  ±0.42%     4019
 MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash             3,143.36  0.3013   0.9316  0.3181  0.3167   0.3837   0.4407   0.6162  ±0.40%     1572
 ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash             3,887.18  0.2259   3.5404  0.2573  0.2525   0.3690   1.2856   1.5195  ±2.08%     1944
 ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash         7,351.33  0.1234   0.7474  0.1360  0.1371   0.1819   0.2095   0.4569  ±0.51%     3676
 ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash           3,047.94  0.3022   1.0942  0.3281  0.3323   0.4493   0.5004   0.9264  ±0.58%     1524

 MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             3,843.03  0.2277   1.8769  0.2602  0.2509   0.3824   1.3578   1.7071  ±1.88%     1922
 MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         7,661.47  0.1163   0.6424  0.1305  0.1320   0.1701   0.1950   0.3467  ±0.39%     3831
 MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash           3,131.71  0.2969   0.9201  0.3193  0.3196   0.3970   0.4302   0.7055  ±0.38%     1566
 ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash           3,952.02  0.2261   1.8733  0.2530  0.2447   0.3937   1.3552   1.7092  ±1.84%     1977
 ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash       7,387.71  0.1185   0.5511  0.1354  0.1401   0.1497   0.1680   0.2687  ±0.33%     3694
 ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash         3,095.63  0.2998   1.7091  0.3230  0.3202   0.4444   0.6823   1.5990  ±0.94%     1548
*/



  /**
   * has comparison:
   */
  bench("Native Set has: lowNumberOfItemsConsecutiveIds", () => {
    const set = new Set(lowNumberOfItemsConsecutiveIds);
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("Native Set has: mediumNumberOfItemsConsecutiveIds", () => {
    const set = new Set<Item>(mediumNumberOfItemsConsecutiveIds);
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("Native Set has: mediumNumberOfItemsNoConsecutiveIds", () => {
    const set = new Set<Item>(mediumNumberOfItemsNoConsecutiveIds);
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


/*
 Native Set has: lowNumberOfItemsConsecutiveIds                                         554,173.80  0.0013   0.3049  0.0018  0.0019   0.0025   0.0027   0.0048  ±0.28%   277087
 MutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash                   299,928.53  0.0026   0.7035  0.0033  0.0035   0.0052   0.0068   0.0085  ±0.40%   149965
 MutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash               282,575.94  0.0029   0.2908  0.0035  0.0036   0.0050   0.0057   0.0082  ±0.40%   141288
 MutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash                 266,313.39  0.0028   9.0349  0.0038  0.0035   0.0103   0.0186   0.0230  ±3.56%   133157
 ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash                 300,775.34  0.0026   0.4101  0.0033  0.0034   0.0054   0.0059   0.0079  ±0.34%   150388
 ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash             262,681.76  0.0030   0.3840  0.0038  0.0039   0.0059   0.0066   0.0085  ±0.38%   131341
 ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash               301,449.03  0.0028   0.1932  0.0033  0.0034   0.0044   0.0053   0.0079  ±0.26%   150725

 Native Set has: mediumNumberOfItemsConsecutiveIds                                        4,949.43  0.1716   3.7221  0.2020  0.2027   0.2394   0.2861   3.2421  ±3.17%     2475
 MutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash                  2,861.41  0.3099   2.1159  0.3495  0.3512   0.4888   1.6676   1.9180  ±1.87%     1431
 MutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash              4,156.35  0.2128   0.6201  0.2406  0.2412   0.3132   0.4835   0.6043  ±0.48%     2079
 MutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash                1,574.08  0.6022   1.4113  0.6353  0.6345   0.7326   0.8715   1.4113  ±0.48%      788
 ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash                2,957.45  0.2976   2.0772  0.3381  0.3347   0.7208   1.6885   2.0319  ±2.06%     1479
 ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash            4,441.50  0.2096   0.7672  0.2251  0.2256   0.2870   0.3627   0.5127  ±0.42%     2221
 ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash              1,659.16  0.5791   1.3367  0.6027  0.6032   0.7562   0.8648   1.3367  ±0.46%      830

 Native Set has: mediumNumberOfItemsNoConsecutiveIds                                      5,251.29  0.1644   3.0855  0.1904  0.1938   0.2384   0.2865   2.9378  ±2.61%     2626
 MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                2,808.95  0.3057   2.0719  0.3560  0.3550   0.7516   1.6997   2.0182  ±2.00%     1405
 MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash            4,505.48  0.2081   0.5908  0.2220  0.2229   0.2726   0.3447   0.5792  ±0.40%     2253
 MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash              1,704.07  0.5639   0.9456  0.5868  0.5875   0.7007   0.7611   0.9456  ±0.33%      853
 ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash              3,059.95  0.2971   1.9579  0.3268  0.3159   0.4835   1.5839   1.8589  ±1.86%     1531
 ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash          4,227.06  0.2181   0.5818  0.2366  0.2378   0.2934   0.3571   0.5000  ±0.35%     2114
 ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash            1,707.27  0.5621   1.3628  0.5857  0.5836   0.7890   0.9655   1.3628  ±0.56%      854
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


/*
 Native Set delete: lowNumberOfItemsConsecutiveIds                                      320,206.99  0.0024   0.5358  0.0031  0.0033   0.0043   0.0048   0.0076  ±0.36%   160104
 MutableHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash                144,194.90  0.0055   2.0711  0.0069  0.0071   0.0102   0.0110   0.0149  ±0.86%    72098
 MutableHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash            136,052.29  0.0061   0.3818  0.0074  0.0075   0.0106   0.0114   0.0144  ±0.35%    68027
 MutableHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash              150,419.92  0.0057   0.4727  0.0066  0.0067   0.0096   0.0102   0.0135  ±0.37%    75210
 ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash                5,373.63  0.1663   2.0831  0.1861  0.1854   0.2839   0.2893   0.4527  ±0.84%     2687
 ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash            5,385.39  0.1677   0.5165  0.1857  0.1859   0.2731   0.2900   0.3626  ±0.36%     2694
 ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash              7,800.95  0.1120   0.7896  0.1282  0.1286   0.2211   0.2330   0.3053  ±0.45%     3901

 Native Set delete: mediumNumberOfItemsConsecutiveIds                                     3,178.80  0.2732   2.4306  0.3146  0.3179   0.4058   1.7632   2.2719  ±2.01%     1590
 MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash               1,937.09  0.4557   1.7259  0.5162  0.5136   1.2213   1.3892   1.7259  ±1.35%      969
 MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash           3,012.93  0.3122   0.7624  0.3319  0.3336   0.4819   0.5421   0.7251  ±0.42%     1507
 MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash             1,940.37  0.4898   0.9438  0.5154  0.5155   0.6916   0.7461   0.9438  ±0.42%      971
 ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash               1.9067  518.64   534.72  524.47  527.46   534.72   534.72   534.72  ±0.71%       10
 ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash           7.5471  131.10   134.29  132.50  133.50   134.29   134.29   134.29  ±0.60%       10
 ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash            61.2204 15.7591  19.6439 16.3344  16.3934 19.6439  19.6439  19.6439  ±1.48%       31

 Native Set delete: mediumNumberOfItemsNoConsecutiveIds                                   3,383.69  0.2604   2.4160  0.2955  0.3008   0.3961   1.6419   2.1736  ±2.11%     1692
 MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             2,097.07  0.4413   1.6935  0.4769  0.4638   1.1269   1.1862   1.6566  ±1.25%     1049
 MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         3,031.99  0.3120   0.7414  0.3298  0.3319   0.4660   0.5139   0.7232  ±0.39%     1516
 MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash           1,984.15  0.4807   0.8219  0.5040  0.5037   0.6974   0.7467   0.8219  ±0.38%      993
 ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             1.9107  518.81   531.21  523.37  525.44   531.21   531.21   531.21  ±0.60%       10
 ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         8.0179  123.88   125.31  124.72  125.20   125.31   125.31   125.31  ±0.28%       10
 ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          60.8004 15.6356  19.7097 16.4472 16.1409  19.7097  19.7097  19.7097  ±2.91%       31
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


/*
 MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash             147,257.90  0.0056   0.2644  0.0068  0.0069   0.0099   0.0108   0.0137  ±0.38%    73629
 MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         144,574.33  0.0057   0.2860  0.0069  0.0070   0.0100   0.0111   0.0147  ±0.36%    72288
 MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash           159,022.66  0.0054   0.3260  0.0063  0.0064   0.0090   0.0099   0.0136  ±0.37%    79512
 ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash           107,993.95  0.0077   2.2302  0.0093  0.0093   0.0129   0.0156   0.0481  ±0.92%    53997
 ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash        99,999.93  0.0082   0.4879  0.0100  0.0101   0.0132   0.0140   0.0186  ±0.34%    50001
 ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash         128,060.13  0.0068   0.1638  0.0078  0.0079   0.0104   0.0114   0.0176  ±0.27%    64031

 MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash            1,963.25  0.4509   3.4792  0.5094  0.5027   1.8219   1.8789   3.4792  ±2.32%      982
 MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        2,819.60  0.3165   5.5673  0.3547  0.3455   0.5332   0.5801   0.6631  ±2.16%     1410
 MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash          1,961.01  0.4841   0.8572  0.5099  0.5095   0.6595   0.7440   0.8572  ±0.40%      981
 ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash          1,297.05  0.6990   2.6249  0.7710  0.7296   2.3453   2.3882   2.6249  ±2.56%      649
 ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash      2,579.32  0.3494   2.5159  0.3877  0.3775   0.6101   0.8056   2.1439  ±1.41%     1290
 ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash        1,889.82  0.5018   0.9562  0.5291  0.5316   0.6729   0.7353   0.9562  ±0.39%      945

 MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          2,028.45  0.4480   2.5030  0.4930  0.4878   1.4197   1.5904   2.0626  ±1.83%     1015
 MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      2,945.19  0.3160   0.6374  0.3395  0.3405   0.4644   0.5584   0.6143  ±0.40%     1473
 MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        1,981.64  0.4751   1.0100  0.5046  0.5076   0.6587   0.7170   1.0100  ±0.42%      991
 ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash        1,307.39  0.6991   2.1303  0.7649  0.7476   1.8873   1.9896   2.1303  ±1.96%      654
 ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash    2,624.19  0.3507   0.7781  0.3811  0.3864   0.5517   0.6004   0.7245  ±0.48%     1313
 ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash      1,927.52  0.4960   0.8762  0.5188  0.5178   0.6690   0.7783   0.8762  ±0.37%      964
*/



  /**
   * for...of comparison:
   */
  bench("Native Set for...of: lowNumberOfItemsConsecutiveIds", () => {
    const set = new Set(lowNumberOfItemsConsecutiveIds);
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      lowNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("Native Set for...of: mediumNumberOfItemsConsecutiveIds", () => {
    const set = new Set<Item>(mediumNumberOfItemsConsecutiveIds);
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("Native Set for...of: mediumNumberOfItemsNoConsecutiveIds", () => {
    const set = new Set<Item>(mediumNumberOfItemsNoConsecutiveIds);
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


  bench("ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      areItemsEquals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


/*
 Native Set for...of: lowNumberOfItemsConsecutiveIds                                    513,248.54  0.0014   0.4032  0.0019  0.0020   0.0028   0.0032   0.0057  ±0.32%   256625
 MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash              289,092.58  0.0027   1.8071  0.0035  0.0035   0.0056   0.0066   0.0116  ±0.76%   144547
 MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash          286,257.13  0.0028   0.3799  0.0035  0.0036   0.0053   0.0061   0.0082  ±0.31%   143129
 MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash            320,084.88  0.0026   0.3375  0.0031  0.0032   0.0051   0.0058   0.0074  ±0.17%   160043
 ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash            295,714.49  0.0027   0.3139  0.0034  0.0034   0.0053   0.0061   0.0077  ±0.29%   147858
 ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash        293,457.92  0.0027   0.3131  0.0034  0.0035   0.0053   0.0060   0.0081  ±0.30%   146729
 ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash          323,431.43  0.0025   0.3648  0.0031  0.0032   0.0048   0.0056   0.0073  ±0.17%   161716

 Native Set for...of: mediumNumberOfItemsConsecutiveIds                                   4,815.18  0.1710   3.3913  0.2077  0.2114   0.2390   0.4007   3.0934  ±2.87%     2408
 MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash             3,542.58  0.2477   1.5941  0.2823  0.2759   1.1285   1.2760   1.5830  ±1.81%     1772
 MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash         6,833.81  0.1347   0.6703  0.1463  0.1493   0.2161   0.3133   0.3641  ±0.47%     3417
 MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash           3,061.36  0.2947   5.7484  0.3267  0.3215   0.4621   0.5214   0.8482  ±2.18%     1531
 ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash           3,555.69  0.2516   1.5890  0.2812  0.2702   1.3069   1.3610   1.5708  ±2.01%     1780
 ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash       6,836.54  0.1332   0.5293  0.1463  0.1506   0.1887   0.2901   0.3690  ±0.41%     3419
 ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash         3,080.54  0.2993   0.7058  0.3246  0.3274   0.4042   0.4993   0.5718  ±0.36%     1541

 Native Set for...of: mediumNumberOfItemsNoConsecutiveIds                                 4,868.34  0.1710   3.9968  0.2054  0.2024   0.4014   0.4867   3.3210  ±3.21%     2435
 MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash           3,364.52  0.2587   1.7277  0.2972  0.2857   1.2096   1.4185   1.7064  ±2.03%     1683
 MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash       6,821.72  0.1340   0.5179  0.1466  0.1518   0.2052   0.2632   0.2926  ±0.39%     3411
 MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash         3,009.05  0.3036   0.6890  0.3323  0.3353   0.4159   0.4798   0.6337  ±0.35%     1505
 ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash         3,509.83  0.2507   2.7160  0.2849  0.2776   1.1627   1.2586   1.9017  ±2.06%     1755
 ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash     6,861.96  0.1333   0.5311  0.1457  0.1522   0.1802   0.2455   0.2898  ±0.34%     3431
 ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash       3,045.14  0.3040   0.8583  0.3284  0.3312   0.4565   0.4892   0.6843  ±0.42%     1523
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
