import { bench, describe } from 'vitest';
import { SetUtil } from '@app-core/util';
import { ImmutableHashSet, MutableHashSet } from '@app-core/type/collection/set';

/**
 * Benchmarks for comparing the performance of the {@link SetUtil} methods.
 *
 * To invoke only this benchmark:
 *
 *    vitest bench src/app/core/util/set-util.bench.ts
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
describe("Benchmark: SetUtil", () => {

  /**
   * copy comparison:
   */
  bench("Native Set copy: lowNumberOfItemsConsecutiveIds", () => {
    SetUtil.copy(nativeSet_LowNumberOfItemsConsecutiveIds);
  });

  bench("MutableHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.copy(mutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash);
  });


  bench("MutableHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.copy(mutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash);
  });


  bench("MutableHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.copy(mutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash);
  });


  bench("ImmutableHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.copy(immutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash);
  });


  bench("ImmutableHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.copy(immutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash);
  });


  bench("ImmutableHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.copy(immutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash);
  });


  bench("Native Set copy: mediumNumberOfItemsNoConsecutiveIds", () => {
    SetUtil.copy(nativeSet_MediumNumberOfItemsNoConsecutiveIds);
  });

  bench("MutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.copy(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash);
  });


  bench("MutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.copy(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash);
  });


  bench("MutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.copy(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash);
  });


  bench("ImmutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.copy(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash);
  });


  bench("ImmutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.copy(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash);
  });


  bench("ImmutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.copy(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash);
  });


/*
 Native Set copy: lowNumberOfItemsConsecutiveIds                                     1,675,420.73  0.0003  2.9782  0.0006  0.0006  0.0012  0.0014  0.0032  ±1.29%   837711
 MutableHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash                 277,763.81  0.0030  0.4135  0.0036  0.0037  0.0056  0.0064  0.0078  ±0.35%   138882
 MutableHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash             257,365.97  0.0031  0.4988  0.0039  0.0039  0.0062  0.0070  0.0097  ±0.46%   128683
 MutableHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash               280,595.35  0.0030  0.3723  0.0036  0.0036  0.0061  0.0067  0.0083  ±0.33%   140298
 ImmutableHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash               259,701.18  0.0030  0.5261  0.0039  0.0039  0.0064  0.0070  0.0094  ±0.50%   129851
 ImmutableHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           261,584.05  0.0031  0.4721  0.0038  0.0039  0.0059  0.0068  0.0094  ±0.45%   130793
 ImmutableHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash             268,609.84  0.0030  0.6040  0.0037  0.0038  0.0058  0.0066  0.0083  ±0.46%   134305

 Native Set copy: mediumNumberOfItemsNoConsecutiveIds                                   15,244.54  0.0474  9.0820  0.0656  0.0572  0.1094  0.1623  3.0216  ±6.07%     7626
 MutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash              3,098.52  0.2853  1.9191  0.3227  0.3165  1.1688  1.2545  1.9068  ±1.72%     1550
 MutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash          7,536.68  0.1144  0.5221  0.1327  0.1327  0.1891  0.3035  0.3926  ±0.48%     3769
 MutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash            3,125.96  0.2913  0.7508  0.3199  0.3211  0.4068  0.4873  0.7378  ±0.41%     1563
 ImmutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            2,985.36  0.2952  1.7281  0.3350  0.3304  1.1549  1.2930  1.5020  ±1.65%     1493
 ImmutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash        8,193.63  0.1088  0.7637  0.1220  0.1217  0.2282  0.2680  0.3262  ±0.51%     4097
 ImmutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          3,422.98  0.2707  0.6495  0.2921  0.2907  0.3777  0.4508  0.6453  ±0.42%     1712
*/



  /**
   * count comparison:
   */
  bench("Native Set count: lowNumberOfItemsConsecutiveIds", () => {
    SetUtil.count(nativeSet_LowNumberOfItemsConsecutiveIds, isItemIdEven);
  });

  bench("MutableHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.count(mutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("MutableHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.count(mutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("MutableHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.count(mutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.count(immutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.count(immutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.count(immutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


  bench("Native Set count: mediumNumberOfItemsNoConsecutiveIds", () => {
    SetUtil.count(nativeSet_MediumNumberOfItemsNoConsecutiveIds, isItemIdEven);
  });

  bench("MutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.count(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("MutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.count(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("MutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.count(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.count(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.count(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.count(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


/*
 Native Set count: lowNumberOfItemsConsecutiveIds                                    2,589,155.65  0.0003  0.2224  0.0004  0.0004  0.0008  0.0012  0.0021  ±0.11%  1294578
 MutableHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash                743,118.28  0.0011  0.3154  0.0013  0.0013  0.0025  0.0030  0.0042  ±0.20%   371560
 MutableHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash            714,472.78  0.0012  2.3324  0.0014  0.0014  0.0022  0.0029  0.0043  ±0.93%   357237
 MutableHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash              811,082.38  0.0010  0.1674  0.0012  0.0012  0.0018  0.0023  0.0040  ±0.11%   405542
 ImmutableHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash              715,555.74  0.0012  0.2178  0.0014  0.0014  0.0021  0.0027  0.0042  ±0.15%   357778
 ImmutableHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash          675,419.48  0.0011  4.1848  0.0015  0.0014  0.0036  0.0042  0.0068  ±1.65%   337710
 ImmutableHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash            778,384.18  0.0010  0.7329  0.0013  0.0012  0.0030  0.0035  0.0070  ±0.39%   389193

 Native Set count: mediumNumberOfItemsNoConsecutiveIds                                  26,383.60  0.0323  0.3303  0.0379  0.0380  0.0474  0.0523  0.1491  ±0.32%    13192
 MutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            19,119.29  0.0452  0.4539  0.0523  0.0525  0.0635  0.0760  0.2118  ±0.38%     9560
 MutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash        23,605.98  0.0353  0.2027  0.0424  0.0426  0.0508  0.0613  0.1475  ±0.27%    11804
 MutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          25,525.10  0.0348  0.3502  0.0392  0.0389  0.0526  0.0659  0.1523  ±0.32%    12763
 ImmutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          19,087.78  0.0450  0.3733  0.0524  0.0527  0.0632  0.0748  0.1835  ±0.33%     9544
 ImmutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      23,165.55  0.0376  0.2956  0.0432  0.0431  0.0524  0.0671  0.1424  ±0.27%    11583
 ImmutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        25,717.99  0.0333  0.1958  0.0389  0.0386  0.0543  0.0660  0.1469  ±0.29%    12859
*/



  /**
   * filter comparison:
   */
  bench("Native Set filter: lowNumberOfItemsConsecutiveIds", () => {
    SetUtil.filter(nativeSet_LowNumberOfItemsConsecutiveIds, isItemIdEven);
  });

  bench("MutableHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.filter(mutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("MutableHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.filter(mutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("MutableHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.filter(mutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.filter(immutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.filter(immutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.filter(immutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


  bench("Native Set filter: mediumNumberOfItemsNoConsecutiveIds", () => {
    SetUtil.filter(nativeSet_MediumNumberOfItemsNoConsecutiveIds, isItemIdEven);
  });

  bench("MutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.filter(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("MutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.filter(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("MutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.filter(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.filter(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.filter(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("ImmutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.filter(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


/*
 Native Set filter: lowNumberOfItemsConsecutiveIds                                     751,617.36  0.0010  0.2238  0.0013  0.0014  0.0020  0.0025  0.0041  ±0.12%   375809
 MutableHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash               334,671.83  0.0024  3.2162  0.0030  0.0030  0.0051  0.0059  0.0088  ±1.29%   167336
 MutableHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           336,412.61  0.0024  0.4075  0.0030  0.0030  0.0050  0.0056  0.0069  ±0.31%   168207
 MutableHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash             332,527.56  0.0024  0.3279  0.0030  0.0030  0.0049  0.0054  0.0066  ±0.26%   166264
 ImmutableHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash             309,320.64  0.0024  2.1316  0.0032  0.0031  0.0062  0.0076  0.0156  ±1.52%   154661
 ImmutableHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         317,485.57  0.0024  2.2117  0.0031  0.0031  0.0058  0.0066  0.0120  ±1.35%   158743
 ImmutableHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash           252,291.04  0.0023  4.5473  0.0040  0.0029  0.0062  0.0075  0.0124  ±8.47%   126146

 Native Set filter: mediumNumberOfItemsNoConsecutiveIds                                  8,991.14  0.0934  4.3811  0.1112  0.1120  0.1822  0.2315  0.2693  ±1.73%     4496
 MutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            6,170.34  0.1399  0.7358  0.1621  0.1602  0.3135  0.3873  0.5999  ±0.69%     3086
 MutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash       10,183.59  0.0880  0.3697  0.0982  0.1002  0.1257  0.2113  0.2224  ±0.34%     5092
 MutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          3,857.19  0.2362  0.5645  0.2593  0.2647  0.3244  0.4387  0.5534  ±0.39%     1929
 ImmutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          6,576.19  0.1322  2.4766  0.1521  0.1497  0.3028  0.3366  0.5368  ±1.15%     3289
 ImmutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash     11,696.62  0.0778  0.2671  0.0855  0.0860  0.1034  0.1806  0.1990  ±0.27%     5849
 ImmutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        5,386.07  0.1623  0.5316  0.1857  0.1888  0.2418  0.3217  0.4954  ±0.43%     2694
*/



  /**
   * groupBy comparison:
   */
  bench("Native Set groupBy: lowNumberOfItemsConsecutiveIds", () => {
    SetUtil.groupBy(nativeSet_LowNumberOfItemsConsecutiveIds, getItemId, isItemIdEven);
  });

  bench("MutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.groupBy(mutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, getItemId, isItemIdEven);
  });


  bench("MutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.groupBy(mutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, getItemId, isItemIdEven);
  });


  bench("MutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.groupBy(mutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.groupBy(immutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.groupBy(immutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.groupBy(immutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, getItemId, isItemIdEven);
  });


  bench("Native Set groupBy: mediumNumberOfItemsNoConsecutiveIds", () => {
    SetUtil.groupBy(nativeSet_MediumNumberOfItemsNoConsecutiveIds, getItemId, isItemIdEven);
  });

  bench("MutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.groupBy(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, getItemId, isItemIdEven);
  });


  bench("MutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.groupBy(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, getItemId, isItemIdEven);
  });


  bench("MutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.groupBy(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.groupBy(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.groupBy(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.groupBy(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, getItemId, isItemIdEven);
  });


/*
 Native Set groupBy: lowNumberOfItemsConsecutiveIds                                     237,961.62  0.0035  0.3520  0.0042  0.0043  0.0072  0.0082  0.0127  ±0.30%   118981
 MutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash               189,810.52  0.0045  0.2029  0.0053  0.0053  0.0082  0.0088  0.0121  ±0.25%    94906
 MutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           184,640.85  0.0045  0.3589  0.0054  0.0055  0.0085  0.0094  0.0141  ±0.25%    92321
 MutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash             189,486.79  0.0044  0.3290  0.0053  0.0053  0.0081  0.0086  0.0101  ±0.28%    94744
 ImmutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash             198,103.61  0.0044  0.2106  0.0050  0.0051  0.0077  0.0082  0.0098  ±0.23%    99052
 ImmutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         196,789.57  0.0045  0.1809  0.0051  0.0051  0.0081  0.0086  0.0110  ±0.25%    98395
 ImmutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash           189,911.17  0.0042  2.8861  0.0053  0.0052  0.0082  0.0088  0.0113  ±1.16%    94956

 Native Set groupBy: mediumNumberOfItemsNoConsecutiveIds                                  4,033.06  0.2205  0.6156  0.2480  0.2456  0.4391  0.4911  0.6071  ±0.55%     2017
 MutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            3,854.18  0.2340  1.0319  0.2595  0.2619  0.5330  0.5617  0.6777  ±0.79%     1928
 MutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash        4,001.34  0.2314  0.7712  0.2499  0.2462  0.5113  0.5914  0.6931  ±0.71%     2003
 MutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          4,241.52  0.2188  0.6893  0.2358  0.2328  0.4005  0.5151  0.6632  ±0.60%     2121
 ImmutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          3,738.92  0.2336  0.7320  0.2675  0.2654  0.4776  0.5590  0.6597  ±0.63%     1870
 ImmutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      3,876.34  0.2312  0.7543  0.2580  0.2573  0.4783  0.5826  0.7281  ±0.71%     1939
 ImmutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        3,980.66  0.2229  0.6199  0.2512  0.2490  0.5138  0.5540  0.5976  ±0.71%     1991
*/



  /**
   * sort comparison:
   */
  bench("Native Set sort: lowNumberOfItemsConsecutiveIds", () => {
    SetUtil.sort(nativeSet_LowNumberOfItemsConsecutiveIds, itemsComparator);
  });

  bench("MutableHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.sort(mutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, itemsComparator);
  });


  bench("MutableHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.sort(mutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, itemsComparator);
  });


  bench("MutableHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.sort(mutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, itemsComparator);
  });


  bench("ImmutableHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.sort(immutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, itemsComparator);
  });


  bench("ImmutableHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.sort(immutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, itemsComparator);
  });


  bench("ImmutableHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.sort(immutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, itemsComparator);
  });


  bench("Native Set sort: mediumNumberOfItemsNoConsecutiveIds", () => {
    SetUtil.sort(nativeSet_MediumNumberOfItemsNoConsecutiveIds, itemsComparator);
  });

  bench("MutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.sort(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, itemsComparator);
  });


  bench("MutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.sort(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, itemsComparator);
  });


  bench("MutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.sort(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, itemsComparator);
  });


  bench("ImmutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.sort(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, itemsComparator);
  });


  bench("ImmutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.sort(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, itemsComparator);
  });


  bench("ImmutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.sort(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, itemsComparator);
  });


/*
 Native Set sort: lowNumberOfItemsConsecutiveIds                                       786,136.26  0.0010  0.1815  0.0013  0.0013  0.0021  0.0026  0.0039  ±0.09%   393069
 MutableHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash                 324,241.97  0.0026  0.3277  0.0031  0.0031  0.0049  0.0056  0.0072  ±0.28%   162121
 MutableHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash             323,578.39  0.0026  0.3340  0.0031  0.0031  0.0051  0.0056  0.0070  ±0.30%   161790
 MutableHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash               171,006.07  0.0050  0.3518  0.0058  0.0059  0.0088  0.0101  0.0128  ±0.27%    85504
 ImmutableHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash               322,542.31  0.0026  0.1621  0.0031  0.0031  0.0050  0.0056  0.0070  ±0.25%   161272
 ImmutableHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           306,834.95  0.0026  0.3691  0.0033  0.0033  0.0058  0.0067  0.0089  ±0.34%   153419
 ImmutableHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash             162,778.13  0.0052  0.3012  0.0061  0.0062  0.0089  0.0097  0.0125  ±0.27%    81390

 Native Set sort: mediumNumberOfItemsNoConsecutiveIds                                   17,541.99  0.0487  0.5503  0.0570  0.0579  0.0764  0.0824  0.2471  ±0.38%     8772
 MutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash              6,716.28  0.1265  0.3983  0.1489  0.1545  0.2407  0.2688  0.3717  ±0.43%     3359
 MutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash          2,756.53  0.3316  0.8579  0.3628  0.3660  0.5145  0.5881  0.8172  ±0.47%     1379
 MutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash            3,131.74  0.2910  0.7940  0.3193  0.3241  0.4625  0.5322  0.7152  ±0.45%     1566
 ImmutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            6,773.85  0.1286  0.3946  0.1476  0.1538  0.2252  0.3017  0.3428  ±0.41%     3387
 ImmutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash        2,751.26  0.3256  0.7925  0.3635  0.3665  0.4976  0.5950  0.7885  ±0.47%     1376
 ImmutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          3,191.37  0.2735  1.6342  0.3133  0.3205  0.5259  0.6225  0.9874  ±0.84%     1596
*/



  /**
   * toArray comparison:
   */
  bench("Native Set toArray: lowNumberOfItemsConsecutiveIds", () => {
    SetUtil.toArray(nativeSet_LowNumberOfItemsConsecutiveIds);
  });

  bench("MutableHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.toArray(mutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash);
  });


  bench("MutableHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.toArray(mutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash);
  });


  bench("MutableHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.toArray(mutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash);
  });


  bench("ImmutableHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.toArray(immutableHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash);
  });


  bench("ImmutableHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.toArray(immutableHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash);
  });


  bench("ImmutableHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.toArray(immutableHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash);
  });


  bench("Native Set toArray: mediumNumberOfItemsNoConsecutiveIds", () => {
    SetUtil.toArray(nativeSet_MediumNumberOfItemsNoConsecutiveIds);
  });

  bench("MutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.toArray(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash);
  });


  bench("MutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.toArray(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash);
  });


  bench("MutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.toArray(mutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash);
  });


  bench("ImmutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.toArray(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash);
  });


  bench("ImmutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.toArray(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash);
  });


  bench("ImmutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.toArray(immutableHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash);
  });


/*
 Native Set toArray: lowNumberOfItemsConsecutiveIds                                   4,864,318.19  0.0002  0.2189  0.0002  0.0002  0.0004  0.0005  0.0008  ±0.28%  2432160
 MutableHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash               477,253.88  0.0017  0.2777  0.0021  0.0021  0.0031  0.0041  0.0052  ±0.32%   238627
 MutableHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           476,871.96  0.0017  0.3294  0.0021  0.0021  0.0032  0.0041  0.0051  ±0.32%   238436
 MutableHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash             548,829.85  0.0015  0.2347  0.0018  0.0018  0.0030  0.0037  0.0048  ±0.35%   274415
 ImmutableHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash             471,508.90  0.0017  0.3113  0.0021  0.0021  0.0033  0.0042  0.0054  ±0.33%   235755
 ImmutableHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         472,573.03  0.0018  0.2966  0.0021  0.0021  0.0031  0.0041  0.0052  ±0.37%   236287
 ImmutableHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash           535,737.79  0.0015  0.3057  0.0019  0.0019  0.0030  0.0038  0.0048  ±0.28%   267869

 Native Set toArray: mediumNumberOfItemsNoConsecutiveIds                                135,740.71  0.0051  0.5901  0.0074  0.0074  0.0100  0.0116  0.0161  ±0.42%    67871
 MutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash           10,432.30  0.0808  0.4873  0.0959  0.0957  0.1712  0.2200  0.3054  ±0.49%     5217
 MutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash       12,218.20  0.0707  0.2487  0.0818  0.0824  0.1087  0.1954  0.2124  ±0.33%     6110
 MutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash         12,413.03  0.0697  0.3634  0.0806  0.0810  0.1175  0.2149  0.2434  ±0.41%     6207
 ImmutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash         11,016.37  0.0801  0.4759  0.0908  0.0908  0.1481  0.1903  0.2429  ±0.41%     5509
 ImmutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash     12,855.36  0.0694  0.2529  0.0778  0.0784  0.1088  0.1927  0.2233  ±0.35%     6428
 ImmutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash       13,149.47  0.0673  0.4563  0.0760  0.0768  0.1156  0.1861  0.2035  ±0.36%     6575
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

const getItemId =
  (item: Item) => item.id;

const isItemIdEven =
  (item: Item) => 0 == item.id % 2;

const itemsComparator =
  (a: Item, b: Item) => a.id - b.id;


const nativeSet_LowNumberOfItemsConsecutiveIds = new Set<Item>(
  lowNumberOfItemsConsecutiveIds
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
