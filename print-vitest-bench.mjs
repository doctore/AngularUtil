import fs from 'node:fs';

/**
 * Used in some vitest benchmarks that do not expose the results in the console. In that case, the steps are:
 * <p>
 *    <ul>
 *      <li>Launch the benchmark: `vitest bench src/app/core/.../my-benchmark.bench.ts --outputJson bench.json`</li>
 *      <li>Run with Node.js `node print-vitest-bench.mjs`</li>
 *    </ul>
 * <p>
 */
const data = JSON.parse(fs.readFileSync('./bench.json', 'utf8'));

const ROUND = 5;

const round = (v, digits = ROUND) =>
  typeof v === 'number' && isFinite(v)
    ? Number(v.toFixed(digits))
    : 'n/a';

function printRow(cols, widths) {
  console.log(
    cols
      .map((c, i) => String(c).padEnd(widths[i]))
      .join(' | ')
  );
}

function separator(widths) {
  console.log(widths.map(w => '-'.repeat(w)).join('-+-'));
}

for (const file of data.files ?? []) {
  for (const group of file.groups ?? []) {

    console.log('\n' + group.fullName);

    const headers = [
      'benchmark',
      'hz',
      'mean',
      'min',
      'max',
      'p75',
      'p99',
      'rme'
    ];

    const widths = [55, 12, 12, 12, 12, 12, 12, 10];

    printRow(headers, widths);
    separator(widths);

    for (const b of group.benchmarks ?? []) {
      printRow([
        b.name,
        round(b.hz),
        round(b.mean),
        round(b.min),
        round(b.max),
        round(b.p75),
        round(b.p99),
        typeof b.rme === 'number' ? round(b.rme) + '%' : 'n/a'
      ], widths);
    }
  }
}
