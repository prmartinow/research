import { initDatabase, getReleases, getCPUModels } from './db.js';

async function test() {
  console.log('Testing PGlite database setup...');
  await initDatabase();

  const allReleases = await getReleases('all', 'all', 'desc');
  console.log(`\nPGlite Query Success: Returned ${allReleases.length} releases from PostgreSQL!`);

  allReleases.forEach((r, idx) => {
    console.log(` ${idx + 1}. [${r.id}] (${r.brand.toUpperCase()}) - ${r.headline}`);
  });

  const cpuModels = await getCPUModels('AMD');
  console.log(`\nPGlite Query Success: Returned ${cpuModels.length} AMD CPU/APU models from cpu_models PostgreSQL table!`);
  cpuModels.slice(0, 5).forEach((c, idx) => {
    console.log(` ${idx + 1}. [${c.cpu}] ${c.family} | ${c.cores_threads} | iGPU: ${c.igpu} (${c.arch}, ${c.compute_cores} CUs @ ${c.clock} GHz)`);
  });
}

test().catch(err => {
  console.error('PGlite Test Error:', err);
  process.exit(1);
});
