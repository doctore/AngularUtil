import { bench, describe } from 'vitest';
import { SetUtil } from '@app-core/util';
import {
  ImmutableHashSet,
  ImmutableLinkedHashSet,
  MutableHashSet,
  MutableLinkedHashSet
} from '@app-core/type/collection/set';

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

  bench("MutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.copy(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash);
  });


  bench("MutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.copy(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash);
  });


  bench("MutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.copy(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash);
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


  bench("ImmutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.copy(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash);
  });


  bench("ImmutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.copy(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash);
  });


  bench("ImmutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.copy(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash);
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


  bench("MutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.copy(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash);
  });


  bench("MutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.copy(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash);
  });


  bench("MutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.copy(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash);
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

  bench("ImmutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.copy(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash);
  });


  bench("ImmutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.copy(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash);
  });


  bench("ImmutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.copy(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash);
  });


/*
 Native Set copy: lowNumberOfItemsConsecutiveIds                                            1,599,182.40  0.0004  1.1344  0.0006  0.0006  0.0012  0.0013  0.0030  ±0.59%   799592

 MutableHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash                        268,475.96  0.0030  0.3047  0.0037  0.0038  0.0060  0.0065  0.0081  ±0.30%   134238
 MutableHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                    252,273.92  0.0031  0.3018  0.0040  0.0040  0.0064  0.0070  0.0086  ±0.29%   126137
 MutableHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash                      260,512.77  0.0032  0.3041  0.0038  0.0038  0.0063  0.0067  0.0084  ±0.33%   130257

 MutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash                  237,368.49  0.0031  2.8319  0.0042  0.0042  0.0077  0.0100  0.0166  ±1.19%   118685
 MutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash              242,365.27  0.0032  0.2538  0.0041  0.0042  0.0067  0.0072  0.0083  ±0.28%   121183
 MutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash                255,059.28  0.0032  0.2256  0.0039  0.0040  0.0063  0.0068  0.0079  ±0.26%   127530

 ImmutableHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash                      260,848.70  0.0030  0.3470  0.0038  0.0039  0.0061  0.0068  0.0082  ±0.29%   130425
 ImmutableHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                  255,872.49  0.0031  0.3258  0.0039  0.0040  0.0064  0.0069  0.0084  ±0.26%   127937
 ImmutableHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash                    266,266.97  0.0031  0.1443  0.0038  0.0038  0.0061  0.0066  0.0080  ±0.27%   133134

 ImmutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - noCollisionHash                257,462.78  0.0031  0.4856  0.0039  0.0039  0.0066  0.0073  0.0084  ±0.33%   128732
 ImmutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash            234,965.10  0.0031  0.6160  0.0043  0.0041  0.0095  0.0114  0.0212  ±0.57%   117483
 ImmutableLinkedHashSet copy: lowNumberOfItemsConsecutiveIds - highCollisionHash              261,160.15  0.0031  0.3120  0.0038  0.0039  0.0062  0.0067  0.0079  ±0.29%   130581

 Native Set copy: mediumNumberOfItemsNoConsecutiveIds                                          16,046.96  0.0469  3.1418  0.0623  0.0559  0.0838  0.1492  2.7340  ±4.77%     8024

 MutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                     3,160.51  0.2796  1.7284  0.3164  0.3089  1.1736  1.3039  1.6087  ±1.74%     1581
 MutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash                 7,704.40  0.1137  0.3688  0.1298  0.1295  0.2021  0.2748  0.3273  ±0.39%     3853
 MutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                   3,224.76  0.2855  0.7922  0.3101  0.3122  0.3904  0.4609  0.7121  ±0.41%     1613

 MutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash               2,994.62  0.2951  1.6298  0.3339  0.3228  1.1232  1.2525  1.6262  ±1.69%     1498
 MutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash           4,931.20  0.1833  0.6978  0.2028  0.2048  0.3440  0.4845  0.5549  ±0.60%     2466
 MutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash             2,576.11  0.3691  0.6754  0.3882  0.3915  0.5131  0.6047  0.6624  ±0.36%     1289

 ImmutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                   3,136.10  0.2760  1.5658  0.3189  0.3122  1.1426  1.2866  1.5487  ±1.68%     1569
 ImmutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash               7,828.84  0.1152  0.5954  0.1277  0.1284  0.1786  0.2696  0.3202  ±0.43%     3915
 ImmutableHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                 3,297.55  0.2764  0.7826  0.3033  0.3069  0.3792  0.4526  0.5376  ±0.37%     1649

 ImmutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             2,994.92  0.2873  1.4508  0.3339  0.3236  1.1122  1.2086  1.3198  ±1.57%     1498
 ImmutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         4,925.54  0.1850  0.7236  0.2030  0.2039  0.3704  0.4397  0.6488  ±0.62%     2463
 ImmutableLinkedHashSet copy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash           2,565.67  0.3593  0.7254  0.3898  0.3919  0.5285  0.6397  0.7090  ±0.41%     1283
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


  bench("MutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.count(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("MutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.count(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("MutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.count(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, isItemIdEven);
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


  bench("ImmutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.count(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.count(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.count(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, isItemIdEven);
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


  bench("MutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.count(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("MutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.count(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("MutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.count(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, isItemIdEven);
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


  bench("ImmutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.count(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.count(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.count(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


/*
 Native Set count: lowNumberOfItemsConsecutiveIds                                           2,483,488.90  0.0003  0.4849  0.0004  0.0004  0.0008  0.0010  0.0019  ±0.27%  1241745

 MutableHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash                       717,918.21  0.0012  3.6767  0.0014  0.0014  0.0021  0.0028  0.0043  ±1.46%   358960
 MutableHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                   773,519.93  0.0011  0.3492  0.0013  0.0013  0.0021  0.0028  0.0041  ±0.23%   386760
 MutableHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash                     871,795.86  0.0010  0.3335  0.0011  0.0011  0.0020  0.0025  0.0038  ±0.22%   435898

 MutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash               1,054,311.29  0.0008  2.6271  0.0009  0.0009  0.0015  0.0018  0.0033  ±1.07%   527156
 MutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           1,056,072.35  0.0008  0.2167  0.0009  0.0010  0.0016  0.0018  0.0034  ±0.26%   528037
 MutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash             1,002,095.78  0.0008  0.1935  0.0010  0.0010  0.0016  0.0018  0.0035  ±0.27%   501048

 ImmutableHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash                     748,321.76  0.0012  2.9973  0.0013  0.0013  0.0024  0.0030  0.0041  ±1.20%   374161
 ImmutableHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                 763,483.47  0.0011  0.3335  0.0013  0.0013  0.0022  0.0028  0.0039  ±0.14%   381742
 ImmutableHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash                   866,879.57  0.0010  0.1736  0.0012  0.0011  0.0019  0.0024  0.0038  ±0.09%   433440

 ImmutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - noCollisionHash             1,066,184.45  0.0008  2.8507  0.0009  0.0009  0.0016  0.0018  0.0034  ±1.15%   533093
 ImmutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         1,057,318.91  0.0008  0.3659  0.0009  0.0009  0.0016  0.0018  0.0034  ±0.33%   528660
 ImmutableLinkedHashSet count: lowNumberOfItemsConsecutiveIds - highCollisionHash           1,004,679.13  0.0008  2.8007  0.0010  0.0010  0.0016  0.0018  0.0036  ±1.13%   502340

 Native Set count: mediumNumberOfItemsNoConsecutiveIds                                         26,669.92  0.0336  0.3254  0.0375  0.0377  0.0459  0.0594  0.1581  ±0.34%    13335

 MutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                   20,350.34  0.0443  0.4031  0.0491  0.0495  0.0803  0.1038  0.1582  ±0.32%    10176
 MutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash               24,743.95  0.0354  0.1901  0.0404  0.0404  0.0625  0.0739  0.1365  ±0.29%    12372
 MutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                 27,370.27  0.0326  0.4055  0.0365  0.0365  0.0533  0.0640  0.1349  ±0.33%    13686

 MutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             24,601.03  0.0358  0.2887  0.0406  0.0408  0.0574  0.0717  0.1415  ±0.30%    12301
 MutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         24,627.02  0.0363  0.3906  0.0406  0.0409  0.0564  0.0613  0.1346  ±0.28%    12314
 MutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash           24,113.30  0.0360  0.3784  0.0415  0.0419  0.0623  0.0867  0.1413  ±0.32%    12057

 ImmutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                 19,153.29  0.0473  0.3398  0.0522  0.0527  0.0721  0.0911  0.1805  ±0.32%     9577
 ImmutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash             23,337.61  0.0375  0.2429  0.0428  0.0431  0.0612  0.0764  0.1446  ±0.30%    11669
 ImmutableHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash               25,808.83  0.0348  0.1776  0.0387  0.0389  0.0543  0.0636  0.1469  ±0.28%    12905

 ImmutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash           22,556.08  0.0374  0.3832  0.0443  0.0451  0.0611  0.0737  0.1526  ±0.34%    11279
 ImmutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash       22,648.99  0.0384  0.3247  0.0442  0.0447  0.0612  0.0735  0.1460  ±0.31%    11325
 ImmutableLinkedHashSet count: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash         23,059.79  0.0372  0.3158  0.0434  0.0438  0.0580  0.0711  0.1483  ±0.30%    11530
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


  bench("MutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.filter(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("MutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.filter(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("MutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.filter(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, isItemIdEven);
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


  bench("ImmutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.filter(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.filter(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.filter(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, isItemIdEven);
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


  bench("MutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.filter(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("MutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.filter(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("MutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.filter(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, isItemIdEven);
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


  bench("ImmutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.filter(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.filter(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.filter(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, isItemIdEven);
  });


/*
 Native Set filter: lowNumberOfItemsConsecutiveIds                                            720,105.08  0.0011  0.3534  0.0014  0.0014  0.0022  0.0026  0.0042  ±0.15%   360053

 MutableHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash                      337,755.05  0.0024  0.2494  0.0030  0.0030  0.0050  0.0055  0.0065  ±0.29%   168878
 MutableHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                  329,555.05  0.0024  3.5386  0.0030  0.0030  0.0051  0.0057  0.0075  ±1.42%   164778
 MutableHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash                    329,361.66  0.0024  0.1799  0.0030  0.0031  0.0050  0.0056  0.0067  ±0.26%   164681

 MutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash                325,125.91  0.0026  0.3849  0.0031  0.0031  0.0051  0.0056  0.0066  ±0.29%   162563
 MutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash            316,153.55  0.0025  0.2312  0.0032  0.0032  0.0052  0.0057  0.0068  ±0.28%   158077
 MutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash              327,544.39  0.0025  0.3145  0.0031  0.0031  0.0051  0.0056  0.0066  ±0.30%   163773

 ImmutableHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash                    339,323.93  0.0024  0.3348  0.0029  0.0030  0.0048  0.0055  0.0066  ±0.33%   169662
 ImmutableHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                332,521.13  0.0024  2.8892  0.0030  0.0030  0.0052  0.0058  0.0075  ±1.17%   166261
 ImmutableHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash                  348,524.94  0.0023  0.2646  0.0029  0.0029  0.0048  0.0056  0.0071  ±0.34%   174263

 ImmutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - noCollisionHash              345,520.27  0.0024  0.2638  0.0029  0.0029  0.0050  0.0055  0.0071  ±0.29%   172761
 ImmutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - mediumCollisionHash          339,676.97  0.0024  0.1926  0.0029  0.0029  0.0048  0.0055  0.0068  ±0.32%   169839
 ImmutableLinkedHashSet filter: lowNumberOfItemsConsecutiveIds - highCollisionHash            339,195.10  0.0024  3.0720  0.0029  0.0029  0.0051  0.0059  0.0092  ±1.24%   169598

 Native Set filter: mediumNumberOfItemsNoConsecutiveIds                                         9,420.89  0.0879  0.7021  0.1061  0.1053  0.2236  0.2823  0.4421  ±0.67%     4711

 MutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                   6,785.44  0.1338  0.6048  0.1474  0.1466  0.2556  0.3314  0.4175  ±0.53%     3393
 MutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash              11,768.16  0.0775  0.4139  0.0850  0.0854  0.1263  0.1732  0.2423  ±0.35%     5885
 MutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                 5,929.90  0.1568  0.3806  0.1686  0.1696  0.2029  0.2386  0.3554  ±0.27%     2965

 MutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             6,391.10  0.1433  1.9684  0.1565  0.1542  0.3127  0.3414  0.4428  ±0.88%     3196
 MutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         7,975.64  0.1147  0.6849  0.1254  0.1257  0.1887  0.2231  0.2681  ±0.40%     3988
 MutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash           4,214.79  0.2092  0.6866  0.2373  0.2372  0.3160  0.3863  0.6034  ±0.47%     2108

 ImmutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                 6,330.23  0.1398  0.5052  0.1580  0.1582  0.2889  0.3002  0.3622  ±0.45%     3166
 ImmutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash             9,284.36  0.0965  0.4131  0.1077  0.1072  0.1978  0.2336  0.2986  ±0.43%     4643
 ImmutableHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash               3,711.19  0.2433  0.6525  0.2695  0.2729  0.3910  0.4507  0.5233  ±0.43%     1856

 ImmutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash           6,097.75  0.1525  0.5094  0.1640  0.1630  0.3065  0.3167  0.3350  ±0.44%     3049
 ImmutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash       8,092.79  0.1137  0.5327  0.1236  0.1227  0.1837  0.2943  0.3578  ±0.48%     4047
 ImmutableLinkedHashSet filter: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash         4,152.69  0.2200  0.5287  0.2408  0.2454  0.3144  0.4021  0.4647  ±0.37%     2077
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


  bench("MutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.groupBy(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, getItemId, isItemIdEven);
  });


  bench("MutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.groupBy(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, getItemId, isItemIdEven);
  });


  bench("MutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.groupBy(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, getItemId, isItemIdEven);
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


  bench("ImmutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.groupBy(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.groupBy(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.groupBy(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, getItemId, isItemIdEven);
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


  bench("MutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.groupBy(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, getItemId, isItemIdEven);
  });


  bench("MutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.groupBy(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, getItemId, isItemIdEven);
  });


  bench("MutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.groupBy(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, getItemId, isItemIdEven);
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


  bench("ImmutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.groupBy(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.groupBy(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, getItemId, isItemIdEven);
  });


  bench("ImmutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.groupBy(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, getItemId, isItemIdEven);
  });


/*
 Native Set groupBy: lowNumberOfItemsConsecutiveIds                                           228,606.89  0.0036  0.3178  0.0044  0.0044  0.0070  0.0075  0.0088  ±0.35%   114304

 MutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash                     185,098.44  0.0044  0.3352  0.0054  0.0054  0.0088  0.0105  0.0126  ±0.25%    92550
 MutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                 185,570.84  0.0044  7.1780  0.0054  0.0051  0.0181  0.0187  0.0214  ±2.83%    92786
 MutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash                   198,001.98  0.0043  0.2295  0.0051  0.0051  0.0078  0.0084  0.0099  ±0.29%    99001

 MutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash               216,230.27  0.0040  0.1952  0.0046  0.0046  0.0071  0.0076  0.0087  ±0.31%   108116
 MutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash           215,524.39  0.0040  0.2194  0.0046  0.0046  0.0073  0.0079  0.0095  ±0.31%   107763
 MutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash             206,145.78  0.0041  0.2005  0.0049  0.0048  0.0077  0.0084  0.0103  ±0.32%   103073

 ImmutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash                   184,535.48  0.0046  2.7599  0.0054  0.0054  0.0084  0.0090  0.0117  ±1.11%    92268
 ImmutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash               186,869.37  0.0046  0.2997  0.0054  0.0054  0.0081  0.0086  0.0107  ±0.27%    93435
 ImmutableHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash                 201,209.03  0.0042  0.3297  0.0050  0.0050  0.0077  0.0084  0.0108  ±0.27%   100605

 ImmutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - noCollisionHash             201,545.06  0.0041  0.2485  0.0050  0.0050  0.0080  0.0087  0.0112  ±0.27%   100773
 ImmutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         201,146.32  0.0042  0.1684  0.0050  0.0050  0.0080  0.0085  0.0103  ±0.26%   100574
 ImmutableLinkedHashSet groupBy: lowNumberOfItemsConsecutiveIds - highCollisionHash           199,285.30  0.0041  0.2245  0.0050  0.0050  0.0079  0.0084  0.0102  ±0.30%    99643

 Native Set groupBy: mediumNumberOfItemsNoConsecutiveIds                                        4,062.45  0.2164  1.0385  0.2462  0.2476  0.5396  0.6940  0.8648  ±1.07%     2032

 MutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                  4,047.35  0.2300  0.6978  0.2471  0.2438  0.4879  0.5552  0.6389  ±0.65%     2024
 MutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash              4,024.75  0.2298  0.6375  0.2485  0.2453  0.4844  0.5409  0.6150  ±0.63%     2013
 MutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                4,010.94  0.2260  0.9696  0.2493  0.2475  0.5264  0.5786  0.6433  ±0.77%     2006

 MutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash            4,252.10  0.2205  0.6797  0.2352  0.2328  0.3824  0.4615  0.5425  ±0.52%     2127
 MutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash        4,079.93  0.2202  0.8676  0.2451  0.2454  0.4657  0.5120  0.5601  ±0.61%     2040
 MutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash          3,990.87  0.2283  0.6464  0.2506  0.2477  0.4774  0.5455  0.6216  ±0.60%     1996

 ImmutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                3,792.03  0.2413  2.7427  0.2637  0.2593  0.4931  0.5684  0.6452  ±1.15%     1897
 ImmutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash            3,854.72  0.2386  0.9640  0.2594  0.2573  0.4244  0.4843  0.5718  ±0.55%     1928
 ImmutableHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash              4,206.24  0.2140  1.3917  0.2377  0.2392  0.4776  0.5322  0.8671  ±0.88%     2104

 ImmutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash          4,170.40  0.2238  0.5984  0.2398  0.2374  0.4152  0.4781  0.5417  ±0.52%     2086
 ImmutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash      4,143.82  0.2232  0.8087  0.2413  0.2381  0.4772  0.5307  0.5960  ±0.67%     2072
 ImmutableLinkedHashSet groupBy: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash        4,181.61  0.2238  0.7418  0.2391  0.2362  0.4044  0.4945  0.6082  ±0.57%     2091
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


  bench("MutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.sort(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, itemsComparator);
  });


  bench("MutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.sort(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, itemsComparator);
  });


  bench("MutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.sort(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, itemsComparator);
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


  bench("ImmutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.sort(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash, itemsComparator);
  });


  bench("ImmutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.sort(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash, itemsComparator);
  });


  bench("ImmutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.sort(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash, itemsComparator);
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


  bench("MutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.sort(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, itemsComparator);
  });


  bench("MutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.sort(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, itemsComparator);
  });


  bench("MutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.sort(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, itemsComparator);
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


  bench("ImmutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.sort(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash, itemsComparator);
  });


  bench("ImmutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.sort(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash, itemsComparator);
  });


  bench("ImmutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.sort(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash, itemsComparator);
  });


/*
 Native Set sort: lowNumberOfItemsConsecutiveIds                                               779,467.55  0.0011  0.3872  0.0013  0.0013  0.0021  0.0029  0.0040  ±0.21%   389734

 MutableHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash                         299,431.66  0.0027  1.8174  0.0033  0.0033  0.0056  0.0062  0.0087  ±0.76%   149716
 MutableHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                     317,947.08  0.0027  0.3773  0.0031  0.0032  0.0052  0.0058  0.0069  ±0.29%   158974
 MutableHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash                       173,207.34  0.0051  0.3248  0.0058  0.0058  0.0086  0.0092  0.0115  ±0.29%    86604

 MutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash                   854,848.14  0.0010  0.5161  0.0012  0.0012  0.0018  0.0024  0.0038  ±0.35%   427425
 MutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash               810,210.43  0.0010  0.2664  0.0012  0.0013  0.0018  0.0022  0.0039  ±0.23%   405106
 MutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash                 849,016.56  0.0010  3.3380  0.0012  0.0012  0.0019  0.0023  0.0038  ±1.33%   424509

 ImmutableHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash                       316,931.27  0.0027  0.2172  0.0032  0.0032  0.0052  0.0058  0.0071  ±0.25%   158466
 ImmutableHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                   318,202.72  0.0027  0.3770  0.0031  0.0032  0.0051  0.0057  0.0070  ±0.29%   159102
 ImmutableHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash                     172,552.18  0.0051  0.4289  0.0058  0.0058  0.0085  0.0092  0.0123  ±0.34%    86277

 ImmutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - noCollisionHash                 796,176.19  0.0010  0.3625  0.0013  0.0012  0.0031  0.0034  0.0069  ±0.37%   398090
 ImmutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - mediumCollisionHash             832,218.20  0.0010  0.2633  0.0012  0.0012  0.0019  0.0023  0.0039  ±0.31%   416110
 ImmutableLinkedHashSet sort: lowNumberOfItemsConsecutiveIds - highCollisionHash               785,264.50  0.0010  5.9397  0.0013  0.0013  0.0022  0.0030  0.0098  ±2.35%   392633

 Native Set sort: mediumNumberOfItemsNoConsecutiveIds                                           17,942.79  0.0475  0.3344  0.0557  0.0567  0.0798  0.0947  0.2601  ±0.36%     8972

 MutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                      6,897.55  0.1265  0.5814  0.1450  0.1512  0.2081  0.3224  0.3708  ±0.47%     3449
 MutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash                  2,831.11  0.3080  1.0391  0.3532  0.3596  0.5264  0.5574  0.8907  ±0.59%     1416
 MutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                    3,353.72  0.2643  0.9328  0.2982  0.3036  0.4554  0.5215  0.6335  ±0.51%     1677

 MutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash               20,389.42  0.0431  0.2835  0.0490  0.0501  0.0680  0.0745  0.1767  ±0.29%    10195
 MutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash           20,383.47  0.0434  0.3472  0.0491  0.0502  0.0635  0.0729  0.2136  ±0.31%    10192
 MutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash             19,506.27  0.0437  0.4965  0.0513  0.0522  0.0751  0.0869  0.2532  ±0.43%     9754

 ImmutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                    6,906.36  0.1272  0.4954  0.1448  0.1503  0.2187  0.2639  0.2893  ±0.37%     3454
 ImmutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash                2,817.48  0.3228  0.6440  0.3549  0.3606  0.5004  0.5662  0.6107  ±0.39%     1409
 ImmutableHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                  3,168.30  0.2782  0.6875  0.3156  0.3200  0.4644  0.5204  0.6190  ±0.44%     1585

 ImmutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash             19,555.60  0.0439  0.3311  0.0511  0.0523  0.0684  0.0742  0.2346  ±0.32%     9778
 ImmutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash         20,566.68  0.0425  0.5219  0.0486  0.0498  0.0637  0.0875  0.2011  ±0.39%    10284
 ImmutableLinkedHashSet sort: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash           20,371.09  0.0434  0.4231  0.0491  0.0501  0.0659  0.0749  0.2359  ±0.35%    10186
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


  bench("MutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.toArray(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash);
  });


  bench("MutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.toArray(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash);
  });


  bench("MutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.toArray(mutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash);
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


  bench("ImmutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash", () => {
    SetUtil.toArray(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_NoCollisionHash);
  });


  bench("ImmutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.toArray(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_MediumCollisionHash);
  });


  bench("ImmutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash", () => {
    SetUtil.toArray(immutableLinkedHashSet_LowNumberOfItemsConsecutiveIds_HighCollisionHash);
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


  bench("MutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.toArray(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash);
  });


  bench("MutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.toArray(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash);
  });


  bench("MutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.toArray(mutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash);
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


  bench("ImmutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash", () => {
    SetUtil.toArray(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_NoCollisionHash);
  });


  bench("ImmutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash", () => {
    SetUtil.toArray(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_MediumCollisionHash);
  });


  bench("ImmutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash", () => {
    SetUtil.toArray(immutableLinkedHashSet_MediumNumberOfItemsNoConsecutiveIds_HighCollisionHash);
  });


/*
 Native Set toArray: lowNumberOfItemsConsecutiveIds                                          4,409,882.81  0.0002  0.4603  0.0002  0.0002  0.0004  0.0005  0.0009  ±0.33%  2204943

 MutableHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash                      483,175.03  0.0017  0.3705  0.0021  0.0021  0.0036  0.0041  0.0054  ±0.39%   241588
 MutableHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                  478,705.65  0.0017  0.3120  0.0021  0.0021  0.0036  0.0042  0.0054  ±0.36%   239353
 MutableHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash                    516,449.54  0.0015  0.5889  0.0019  0.0019  0.0031  0.0039  0.0050  ±0.41%   258225

 MutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash             10,135,760.58  0.0001  0.0426  0.0001  0.0001  0.0002  0.0003  0.0004  ±0.05%  5067881
 MutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash         10,857,118.85  0.0001  0.5485  0.0001  0.0001  0.0002  0.0003  0.0004  ±0.22%  5428560
 MutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash           11,010,176.35  0.0001  0.4701  0.0001  0.0001  0.0002  0.0003  0.0004  ±0.26%  5505089

 ImmutableHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash                    490,401.11  0.0017  0.2525  0.0020  0.0020  0.0035  0.0041  0.0052  ±0.35%   245201
 ImmutableHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash                496,327.24  0.0017  0.3177  0.0020  0.0020  0.0033  0.0041  0.0051  ±0.42%   248164
 ImmutableHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash                  535,878.30  0.0015  0.3668  0.0019  0.0019  0.0029  0.0037  0.0049  ±0.39%   267940

 ImmutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - noCollisionHash            7,613,649.48  0.0001  0.1172  0.0001  0.0001  0.0002  0.0004  0.0010  ±0.07%  3806825
 ImmutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - mediumCollisionHash        7,721,985.34  0.0001  0.0463  0.0001  0.0001  0.0002  0.0003  0.0005  ±0.05%  3860993
 ImmutableLinkedHashSet toArray: lowNumberOfItemsConsecutiveIds - highCollisionHash          7,631,217.94  0.0001  0.5563  0.0001  0.0001  0.0002  0.0003  0.0005  ±0.35%  3815609

 Native Set toArray: mediumNumberOfItemsNoConsecutiveIds                                       138,070.35  0.0058  0.3963  0.0072  0.0073  0.0097  0.0105  0.0124  ±0.33%    69036

 MutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                  10,885.29  0.0791  0.4958  0.0919  0.0919  0.1371  0.2149  0.3088  ±0.47%     5443
 MutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash              12,637.91  0.0695  0.3782  0.0791  0.0798  0.1080  0.1940  0.2238  ±0.38%     6319
 MutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash                13,127.47  0.0674  0.2870  0.0762  0.0770  0.0971  0.2049  0.2418  ±0.39%     6564

 MutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash           272,872.30  0.0014  0.2972  0.0037  0.0037  0.0045  0.0064  0.0088  ±0.47%   136437
 MutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash       271,767.79  0.0010  0.3729  0.0037  0.0037  0.0046  0.0065  0.0087  ±0.51%   135884
 MutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash         272,677.52  0.0018  0.5674  0.0037  0.0037  0.0046  0.0066  0.0086  ±0.50%   136339

 ImmutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash                11,260.87  0.0786  0.2846  0.0888  0.0889  0.1337  0.1777  0.2534  ±0.36%     5631
 ImmutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash            12,683.24  0.0691  0.3673  0.0788  0.0792  0.1260  0.1641  0.2098  ±0.36%     6342
 ImmutableHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash              13,028.96  0.0672  0.4003  0.0768  0.0773  0.1170  0.1669  0.2049  ±0.37%     6515

 ImmutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - noCollisionHash         269,795.54  0.0019  0.3664  0.0037  0.0038  0.0046  0.0067  0.0092  ±0.47%   134898
 ImmutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - mediumCollisionHash     261,027.49  0.0023  0.4212  0.0038  0.0038  0.0048  0.0067  0.0098  ±0.58%   130514
 ImmutableLinkedHashSet toArray: mediumNumberOfItemsNoConsecutiveIds - highCollisionHash       260,463.92  0.0022  0.4514  0.0038  0.0038  0.0048  0.0068  0.0093  ±0.63%   130233
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

