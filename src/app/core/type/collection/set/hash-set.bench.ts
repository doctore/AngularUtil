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
describe("Benchmark: Native Set vs MutableHashSet vs ImmutableHashSet vs SwissTableHashSet", () => {

  /**
   * of comparison:
   */
  bench("Native Set of: lowNumberOfItemsConsecutiveIds", () => {
    new Set<Item>(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    MutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
  });


  bench("Native Set of: mediumNumberOfItemsConsecutiveIds", () => {
    new Set<Item>(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    MutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("MutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
  });


  bench("Native Set of: mediumNumberOfItemsNoConsecutiveIds", () => {
    new Set<Item>(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    MutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


  bench("ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
  });


/*
 Native Set of: lowNumberOfItemsConsecutiveIds                                   535,543.34  0.0013  0.8761  0.0019  0.0019  0.0035  0.0040  0.0065  ±0.47%   267772
 MutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash             421,592.14  0.0017  2.0508  0.0024  0.0024  0.0037  0.0048  0.0077  ±0.86%   210797
 MutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         378,614.87  0.0021  0.3467  0.0026  0.0027  0.0039  0.0049  0.0068  ±0.30%   189308
 MutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash           422,541.37  0.0019  0.3427  0.0024  0.0024  0.0035  0.0046  0.0055  ±0.31%   211271
 ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - noCollisionHash           427,505.02  0.0018  0.3758  0.0023  0.0024  0.0034  0.0038  0.0068  ±0.27%   213753
 ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash       328,090.90  0.0021  7.1978  0.0030  0.0028  0.0082  0.0208  0.0248  ±2.85%   164046
 ImmutableHashSet of: lowNumberOfItemsConsecutiveIds - highCollisionHash         397,933.46  0.0020  0.2333  0.0025  0.0025  0.0039  0.0049  0.0060  ±0.31%   198967

 Native Set of: mediumNumberOfItemsConsecutiveIds                                  4,959.54  0.1711  2.9431  0.2016  0.2027  0.2484  0.4288  2.8858  ±2.68%     2480
 MutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash            3,758.87  0.2287  1.8978  0.2660  0.2675  0.3864  1.3828  1.6820  ±1.85%     1880
 MutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        7,923.54  0.1139  0.6293  0.1262  0.1278  0.1616  0.2136  0.3052  ±0.35%     3962
 MutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash          3,442.37  0.2765  0.7006  0.2905  0.2921  0.3734  0.3935  0.5341  ±0.31%     1722
 ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - noCollisionHash          4,009.90  0.2190  1.7670  0.2494  0.2443  0.3425  1.3013  1.4959  ±1.76%     2005
 ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash      9,799.49  0.0925  0.6143  0.1020  0.1022  0.1306  0.1596  0.3816  ±0.48%     4900
 ImmutableHashSet of: mediumNumberOfItemsConsecutiveIds - highCollisionHash       14,771.58  0.0601  0.3615  0.0677  0.0693  0.0926  0.1008  0.2811  ±0.37%     7386

 Native Set of: mediumNumberOfItemsNoConsecutiveIds                                5,191.35  0.1650  3.5935  0.1926  0.1952  0.2369  0.3288  3.1869  ±3.06%     2596
 MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          3,990.91  0.2221  1.8567  0.2506  0.2448  0.3412  1.3251  1.5196  ±1.78%     1996
 MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      7,969.30  0.1147  0.7007  0.1255  0.1276  0.1615  0.2104  0.4145  ±0.47%     3985
 MutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        3,365.97  0.2817  0.9120  0.2971  0.2974  0.3777  0.4339  0.8209  ±0.43%     1683
 ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash        3,973.01  0.2213  1.9086  0.2517  0.2502  0.3546  1.2990  1.6264  ±1.80%     1987
 ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash    9,773.92  0.0927  0.5054  0.1023  0.1046  0.1301  0.1675  0.2575  ±0.34%     4887
 ImmutableHashSet of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash     14,771.53  0.0592  0.5928  0.0677  0.0694  0.0910  0.1023  0.2750  ±0.41%     7386
*/



  /**
   * Add comparison:
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
      equals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      mediumCollisionHash,
      equals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      highCollisionHash,
      equals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      noCollisionHash,
      equals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      mediumCollisionHash,
      equals
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      highCollisionHash,
      equals
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
      equals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      mediumCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      highCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      noCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      mediumCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      highCollisionHash,
      equals
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
      equals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      mediumCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.empty<Item>(
      highCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      noCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      mediumCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      highCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      noCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      mediumCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


  bench("ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.empty<Item>(
      highCollisionHash,
      equals
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.add(item);
    }
  });


/*
 Native Set add: lowNumberOfItemsConsecutiveIds                                   569,342.42  0.0013  0.9248  0.0018  0.0018  0.0032  0.0036  0.0054  ±0.51%   284672
 MutableHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash             425,323.44  0.0018  1.8686  0.0024  0.0024  0.0035  0.0047  0.0073  ±0.79%   212662
 MutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         350,678.29  0.0021  0.3681  0.0029  0.0029  0.0052  0.0057  0.0075  ±0.29%   175340
 MutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash           415,296.58  0.0019  0.3437  0.0024  0.0024  0.0038  0.0048  0.0061  ±0.29%   207649
 ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - noCollisionHash             6,400.37  0.1425  0.5194  0.1562  0.1572  0.2520  0.2681  0.2883  ±0.38%     3201
 ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         6,406.50  0.1431  0.4660  0.1561  0.1570  0.2575  0.2730  0.3083  ±0.37%     3204
 ImmutableHashSet add: lowNumberOfItemsConsecutiveIds - highCollisionHash           8,531.92  0.1043  0.2758  0.1172  0.1180  0.2031  0.2143  0.2241  ±0.30%     4266

 Native Set add: mediumNumberOfItemsConsecutiveIds                                  5,481.41  0.1560  3.3578  0.1824  0.1846  0.2442  0.3823  3.1109  ±2.93%     2741
 MutableHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash            3,816.52  0.2284  1.8961  0.2620  0.2533  0.3823  1.3845  1.8111  ±1.91%     1909
 MutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        8,118.86  0.1128  0.6493  0.1232  0.1252  0.1561  0.1852  0.2820  ±0.35%     4060
 MutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash          3,371.73  0.2802  0.7041  0.2966  0.2956  0.3963  0.4707  0.6024  ±0.40%     1686
 ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - noCollisionHash            1.8941  519.14  537.69  527.97  531.52  537.69  537.69  537.69  ±0.79%       10
 ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        7.4803  132.55  135.70  133.69  134.21  135.70  135.70  135.70  ±0.60%       10
 ImmutableHashSet add: mediumNumberOfItemsConsecutiveIds - highCollisionHash          130.88  7.3378  8.6676  7.6406  7.7142  8.6676  8.6676  8.6676  ±0.82%       66

 Native Set add: mediumNumberOfItemsNoConsecutiveIds                                5,314.66  0.1580  3.3562  0.1882  0.1904  0.2390  0.3241  3.2467  ±3.01%     2658
 MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          4,031.08  0.2186  1.8723  0.2481  0.2451  0.3473  1.2505  1.5192  ±1.79%     2016
 MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      8,046.82  0.1131  0.5365  0.1243  0.1258  0.1665  0.2005  0.2990  ±0.35%     4024
 MutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        3,452.07  0.2762  0.7073  0.2897  0.2907  0.3435  0.3714  0.5852  ±0.28%     1727
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          1.8596  521.61  568.41  537.76  559.78  568.41  568.41  568.41  ±2.48%       10
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      7.3541  129.98  140.60  135.98  138.98  140.60  140.60  140.60  ±2.08%       10
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        132.56  7.3489  8.0341  7.5438  7.5943  8.0341  8.0341  8.0341  ±0.46%       67
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          1.8652  521.74  558.44  536.13  553.28  558.44  558.44  558.44  ±2.07%       10
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      7.6566  129.05  133.98  130.61  130.68  133.98  133.98  133.98  ±0.72%       10
 ImmutableHashSet add: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        132.93  7.2950  8.0076  7.5228  7.5767  8.0076  8.0076  8.0076  ±0.50%       67
*/



  /**
   * AddAll comparison:
   */
  bench("MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      equals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals
    );
    set.addAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals
    );
    set.addAll(mediumNumberOfItemsNoConsecutiveIds);
  });


/*
 MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash             390,338.32  0.0018  1.1967  0.0026  0.0026  0.0052  0.0060  0.0126  ±0.63%   195170
 MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         357,037.26  0.0021  1.9022  0.0028  0.0029  0.0044  0.0053  0.0080  ±0.79%   178519
 MutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash           373,580.91  0.0020  1.8527  0.0027  0.0026  0.0059  0.0067  0.0112  ±0.80%   186791
 ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - noCollisionHash           377,410.42  0.0020  0.3904  0.0026  0.0027  0.0041  0.0050  0.0063  ±0.32%   188706
 ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash       338,538.41  0.0024  0.2809  0.0030  0.0030  0.0047  0.0055  0.0066  ±0.27%   169270
 ImmutableHashSet addAll: lowNumberOfItemsConsecutiveIds - highCollisionHash         333,500.55  0.0022  6.4134  0.0030  0.0028  0.0092  0.0207  0.0252  ±2.54%   166751

 MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash            2,805.55  0.3140  1.9132  0.3564  0.3596  0.4692  1.5778  1.9012  ±1.76%     1403
 MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        7,320.38  0.1227  0.5150  0.1366  0.1377  0.1777  0.2437  0.4022  ±0.42%     3661
 MutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash          3,165.52  0.2941  0.8461  0.3159  0.3177  0.3927  0.4044  0.7053  ±0.37%     1583
 ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash          3,797.50  0.2272  1.7602  0.2633  0.2677  0.3585  1.4077  1.5909  ±1.79%     1899
 ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash      7,177.03  0.1278  0.4471  0.1393  0.1404  0.1983  0.2483  0.3731  ±0.40%     3589
 ImmutableHashSet addAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash        3,026.75  0.3005  0.9317  0.3304  0.3298  0.4335  0.4780  0.9097  ±0.49%     1514

 MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          3,819.78  0.2321  1.6622  0.2618  0.2564  0.3717  1.3136  1.5844  ±1.74%     1910
 MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      7,243.50  0.1262  0.4450  0.1381  0.1391  0.1881  0.2132  0.4022  ±0.43%     3622
 MutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        3,017.13  0.3101  1.0819  0.3314  0.3310  0.4013  0.4291  0.6242  ±0.38%     1509
 ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash        3,803.16  0.2311  1.6297  0.2629  0.2597  0.3662  1.3786  1.5772  ±1.74%     1902
 ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash    7,180.15  0.1257  0.4876  0.1393  0.1408  0.1822  0.2026  0.3925  ±0.40%     3591
 ImmutableHashSet addAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash      2,882.54  0.3129  0.9048  0.3469  0.3465  0.4356  0.4864  0.6591  ±0.37%     1442
*/



  /**
   * Has comparison:
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
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
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
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
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
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


  bench("ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.has(item);
    }
  });


/*
 Native Set has: lowNumberOfItemsConsecutiveIds                                           504,791.76  0.0014  0.2981  0.0020  0.0021  0.0032  0.0039  0.0054  ±0.33%   252396
 MutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash                     175,844.59  0.0045  1.8282  0.0057  0.0058  0.0087  0.0095  0.0114  ±0.76%    87923
 MutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                 165,258.90  0.0049  0.2184  0.0061  0.0062  0.0090  0.0098  0.0122  ±0.24%    82630
 MutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash                   178,848.44  0.0047  0.2346  0.0056  0.0057  0.0086  0.0093  0.0128  ±0.28%    89425
 ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - noCollisionHash                   178,953.49  0.0045  0.1812  0.0056  0.0057  0.0084  0.0091  0.0108  ±0.21%    89477
 ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - mediumCollisionHash               160,026.09  0.0049  0.3348  0.0062  0.0063  0.0103  0.0120  0.0297  ±0.29%    80014
 ImmutableHashSet has: lowNumberOfItemsConsecutiveIds - highCollisionHash                 192,773.41  0.0045  0.2172  0.0052  0.0053  0.0082  0.0099  0.0136  ±0.30%    96387

 Native Set has: mediumNumberOfItemsConsecutiveIds                                          5,233.74  0.1651  3.1493  0.1911  0.1942  0.2415  0.3247  2.8903  ±2.67%     2617
 MutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash                    2,289.33  0.3729  2.7785  0.4368  0.4356  1.0419  1.9879  2.2307  ±2.21%     1145
 MutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash                2,961.34  0.3063  0.8355  0.3377  0.3368  0.4682  0.5348  0.7975  ±0.44%     1481
 MutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash                  1,354.95  0.7091  1.2557  0.7380  0.7377  0.8962  0.9380  1.2557  ±0.37%      678
 ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - noCollisionHash                  2,405.48  0.3739  2.3458  0.4157  0.4171  0.5476  1.5852  2.0331  ±1.76%     1203
 ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash              3,321.71  0.2800  1.6209  0.3010  0.3002  0.4015  0.5362  0.7685  ±0.70%     1661
 ImmutableHashSet has: mediumNumberOfItemsConsecutiveIds - highCollisionHash                2,172.67  0.4388  0.9918  0.4603  0.4586  0.6113  0.6886  0.8027  ±0.44%     1087

 Native Set has: mediumNumberOfItemsNoConsecutiveIds                                        5,149.71  0.1647  3.5943  0.1942  0.1955  0.2493  0.3185  3.0654  ±2.92%     2575
 MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                  2,406.31  0.3742  2.1465  0.4156  0.4175  0.5647  1.6023  2.0239  ±1.64%     1204
 MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash              3,153.90  0.3000  0.7779  0.3171  0.3184  0.3695  0.4795  0.6291  ±0.34%     1577
 MutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                1,400.52  0.6894  1.1700  0.7140  0.7125  0.8455  0.8675  1.1700  ±0.38%      701
 ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                2,377.33  0.3744  2.1824  0.4206  0.4199  0.5776  2.0276  2.1696  ±1.86%     1189
 ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash            3,340.12  0.2812  0.6206  0.2994  0.3006  0.3681  0.4576  0.6014  ±0.33%     1671
 ImmutableHashSet has: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash              2,124.39  0.4487  1.1792  0.4707  0.4687  0.5829  0.6797  1.1411  ±0.54%     1063
*/



  /**
   * Delete comparison:
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
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("ImmutableHashSet remove: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.remove(item);
    }
  });


  bench("ImmutableHashSet remove: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.remove(item);
    }
  });


  bench("ImmutableHashSet remove: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    for (const item of lowNumberOfItemsConsecutiveIds) {
      set = set.remove(item);
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
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("ImmutableHashSet remove: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.remove(item);
    }
  });


  bench("ImmutableHashSet remove: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.remove(item);
    }
  });


  bench("ImmutableHashSet remove: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    for (const item of mediumNumberOfItemsConsecutiveIds) {
      set = set.remove(item);
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
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set.delete(item);
    }
  });


  bench("ImmutableHashSet remove: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.remove(item);
    }
  });


  bench("ImmutableHashSet remove: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.remove(item);
    }
  });


  bench("ImmutableHashSet remove: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    let set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    for (const item of mediumNumberOfItemsNoConsecutiveIds) {
      set = set.remove(item);
    }
  });


/*
 Native Set delete: lowNumberOfItemsConsecutiveIds                                   301,524.35  0.0024   0.2324  0.0033  0.0034   0.0054   0.0062   0.0086  ±0.29%   150763
 MutableHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash             144,288.73  0.0050   9.1593  0.0069  0.0066   0.0176   0.0221   0.0324  ±3.62%    72145
 MutableHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         132,063.51  0.0062   0.3430  0.0076  0.0078   0.0111   0.0117   0.0154  ±0.32%    66032
 MutableHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash           148,593.95  0.0055   0.3676  0.0067  0.0068   0.0102   0.0114   0.0165  ±0.38%    74297
 ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - noCollisionHash             5,525.93  0.1573   0.5489  0.1810  0.1836   0.2838   0.3426   0.4119  ±0.48%     2763
 ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         5,677.66  0.1620   0.4350  0.1761  0.1767   0.2716   0.2810   0.3758  ±0.35%     2839
 ImmutableHashSet delete: lowNumberOfItemsConsecutiveIds - highCollisionHash           8,163.88  0.1101   0.3055  0.1225  0.1235   0.2109   0.2264   0.2597  ±0.34%     4082

 Native Set delete: mediumNumberOfItemsConsecutiveIds                                  3,166.80  0.2674   4.1604  0.3158  0.3126   0.6665   1.5998   2.7200  ±2.59%     1584
 MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash            2,003.31  0.4497   2.4075  0.4992  0.4999   1.5756   1.7565   2.0251  ±2.00%     1002
 MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        2,965.38  0.3152   1.8830  0.3372  0.3372   0.5051   0.5286   0.6545  ±0.72%     1483
 MutableHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash          1,948.74  0.4888   1.0135  0.5132  0.5136   0.6130   0.7516   1.0135  ±0.39%      975
 ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - noCollisionHash            1.8527  521.51   563.32  539.76  560.62   563.32   563.32   563.32  ±2.39%       10
 ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        6.9699  142.56   145.12  143.47  143.90   145.12   145.12   145.12  ±0.44%       10
 ImmutableHashSet delete: mediumNumberOfItemsConsecutiveIds - highCollisionHash          103.93  9.4258  10.1370  9.6215  9.6485  10.1370  10.1370  10.1370  ±0.41%       53

 Native Set delete: mediumNumberOfItemsNoConsecutiveIds                                3,141.94  0.2661   2.2580  0.3183  0.3222   0.5172   1.9379   2.2070  ±2.09%     1571
 MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          2,016.18  0.4512   1.9013  0.4960  0.5013   1.2017   1.5485   1.7275  ±1.56%     1010
 MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      2,939.10  0.3166   0.7725  0.3402  0.3416   0.4827   0.5541   0.7295  ±0.44%     1470
 MutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        1,919.18  0.4997   0.8351  0.5211  0.5229   0.6306   0.7051   0.8351  ±0.28%      960
 ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          1.8870  521.32   540.91  529.95  532.90   540.91   540.91   540.91  ±0.85%       10
 ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      7.5229  132.02   133.62  132.93  133.43   133.62   133.62   133.62  ±0.30%       10
 ImmutableHashSet delete: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        104.57  8.9411  29.3677  9.5626  9.1981  29.3677  29.3677  29.3677  ±8.02%       53
*/


  /**
   * DeleteAll comparison:
   */
  bench("MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      lowNumberOfItemsConsecutiveIds
    );
    set.deleteAll(lowNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = MutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      noCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      mediumCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


  bench("ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    const set = ImmutableHashSet.of<Item>(
      highCollisionHash,
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    set.deleteAll(mediumNumberOfItemsNoConsecutiveIds);
  });


/*
 MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash             149,231.04  0.0054   0.1937  0.0067  0.0069  0.0099  0.0106   0.0637  ±0.28%    74616
 MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         124,495.47  0.0060   7.6991  0.0080  0.0078  0.0190  0.0235   0.0362  ±3.03%    62248
 MutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash           145,933.78  0.0055   1.8561  0.0069  0.0069  0.0108  0.0121   0.0163  ±0.80%    72967
 ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - noCollisionHash            79,822.17  0.0107   0.3253  0.0125  0.0125  0.0172  0.0190   0.0940  ±0.31%    39912
 ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - mediumCollisionHash        74,899.79  0.0112   0.5837  0.0134  0.0133  0.0180  0.0202   0.0882  ±0.36%    37450
 ImmutableHashSet deleteAll: lowNumberOfItemsConsecutiveIds - highCollisionHash          99,790.26  0.0086   0.1769  0.0100  0.0100  0.0138  0.0148   0.0196  ±0.29%    49896

 MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash            1,983.25  0.4508   2.8167  0.5042  0.5035  1.5309  1.8154   2.8167  ±2.00%      992
 MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        2,944.33  0.3188   1.0044  0.3396  0.3415  0.4838  0.5130   0.6829  ±0.42%     1473
 MutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash          1,994.07  0.4796   0.9935  0.5015  0.5046  0.5993  0.6520   0.9935  ±0.30%      998
 ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - noCollisionHash          1,002.32  0.8371  10.1853  0.9977  0.8949  2.0469  2.1100  10.1853  ±4.51%      502
 ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash      2,366.70  0.3901   1.0656  0.4225  0.4179  0.7406  0.7811   0.9846  ±0.78%     1184
 ImmutableHashSet deleteAll: mediumNumberOfItemsConsecutiveIds - highCollisionHash        1,877.94  0.5002   0.9794  0.5325  0.5343  0.7528  0.7922   0.9794  ±0.48%      939

 MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          1,970.99  0.4515   1.7957  0.5074  0.5115  1.5281  1.7247   1.7957  ±1.72%      986
 MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      2,707.43  0.3425   1.4131  0.3694  0.3696  0.5555  0.6405   0.7925  ±0.60%     1355
 MutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        1,836.60  0.5069   3.2218  0.5445  0.5404  0.7223  0.7498   3.2218  ±1.21%      919
 ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash        1,023.52  0.8671   2.2524  0.9770  0.9282  2.1669  2.2146   2.2524  ±2.11%      512
 ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash    2,171.68  0.4074   2.4814  0.4605  0.4565  0.8231  0.8308   0.9581  ±1.09%     1086
 ImmutableHashSet deleteAll: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash      1,749.84  0.5084   1.0127  0.5715  0.5737  0.7667  0.8199   1.0127  ±0.45%      875
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
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
      equals,
      mediumNumberOfItemsNoConsecutiveIds
    );
    let cont = 0;
    for (const item of set) {
      cont = item.id;
    }
  });


/*
 Native Set for...of: lowNumberOfItemsConsecutiveIds                                   504,812.96  0.0014  0.9367  0.0020  0.0020  0.0036  0.0041  0.0062  ±0.48%   252407
 MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash             209,828.52  0.0037  8.9855  0.0048  0.0045  0.0133  0.0180  0.0265  ±3.54%   104915
 MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         206,989.06  0.0040  0.3755  0.0048  0.0049  0.0083  0.0101  0.0126  ±0.31%   103495
 MutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash           245,653.96  0.0035  0.2586  0.0041  0.0041  0.0064  0.0069  0.0081  ±0.26%   122827
 ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - noCollisionHash           169,221.95  0.0051  0.2807  0.0059  0.0059  0.0087  0.0092  0.0108  ±0.32%    84611
 ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - mediumCollisionHash       160,164.24  0.0054  0.3343  0.0062  0.0062  0.0091  0.0097  0.0116  ±0.32%    80083
 ImmutableHashSet for...of: lowNumberOfItemsConsecutiveIds - highCollisionHash         180,114.09  0.0048  0.1784  0.0056  0.0056  0.0084  0.0091  0.0109  ±0.29%    90058

 Native Set for...of: mediumNumberOfItemsConsecutiveIds                                  5,033.84  0.1718  3.4277  0.1987  0.2007  0.2479  0.4061  3.0967  ±2.91%     2517
 MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash            2,795.61  0.3210  1.6292  0.3577  0.3466  1.3137  1.4059  1.5567  ±1.75%     1398
 MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash        5,041.07  0.1839  0.6925  0.1984  0.2004  0.2620  0.3151  0.3717  ±0.35%     2521
 MutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash          2,789.53  0.3373  0.7756  0.3585  0.3593  0.4909  0.5911  0.6453  ±0.39%     1395
 ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - noCollisionHash          2,314.10  0.3939  1.3809  0.4321  0.4184  0.9878  1.0608  1.3768  ±1.27%     1158
 ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - mediumCollisionHash      3,886.78  0.2326  1.3568  0.2573  0.2541  0.4672  0.5355  1.0588  ±0.87%     1944
 ImmutableHashSet for...of: mediumNumberOfItemsConsecutiveIds - highCollisionHash        2,303.00  0.3884  0.9873  0.4342  0.4335  0.6589  0.7853  0.9575  ±0.62%     1152

 Native Set for...of: mediumNumberOfItemsNoConsecutiveIds                                4,741.21  0.1806  3.7020  0.2109  0.2126  0.2643  0.3575  2.8655  ±2.73%     2371
 MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          2,626.37  0.3326  1.8586  0.3808  0.3730  1.3609  1.4073  1.7092  ±1.80%     1314
 MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      4,663.10  0.1914  0.5691  0.2144  0.2158  0.3165  0.3440  0.3844  ±0.36%     2332
 MutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        2,599.23  0.3616  0.6851  0.3847  0.3853  0.4557  0.5066  0.6797  ±0.31%     1300
 ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash        2,190.75  0.3964  2.1195  0.4565  0.4463  1.0500  1.0840  1.3182  ±1.38%     1096
 ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash    3,941.88  0.2309  0.5448  0.2537  0.2558  0.4048  0.4434  0.4910  ±0.43%     1971
 ImmutableHashSet for...of: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash      2,467.45  0.3831  0.6847  0.4053  0.4077  0.5215  0.6078  0.6507  ±0.35%     1234
*/


});



interface Item {
  id: number;
  name: string;
}

const LOW_COUNT = 100;
const MEDIUM_COUNT = 5000;
const HIGH_COUNT = 50_000;

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
const highNumberOfItemsConsecutiveIds: Item[] = Array.from(
  { length: HIGH_COUNT },
  (_, i) =>
    ({
      id: i,
      name: `Item ${i}`
    })
);

const noCollisionHash =
  (i: Item) => i.id;
const mediumCollisionHash =
  (i: Item) => i.id % 1000;
const highCollisionHash =
  (i: Item) => i.id % 50;

const equals =
  (a: Item, b: Item) => a.id === b.id;
