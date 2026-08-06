import { initDatabase, getReleases, getCPUModels, db } from './db.js';

async function test() {
  console.log('Testing PGlite database setup...');
  await initDatabase();

  const allReleases = await getReleases('all', 'all', 'desc');
  console.log(`\nPGlite Query Success: Returned ${allReleases.length} releases from PostgreSQL!`);

  const amdCpuSpecs = await db.query('SELECT COUNT(*) as count FROM amd_cpu_specs');
  console.log(`AMD CPU Specs: ${amdCpuSpecs.rows[0].count} rows`);

  const amdIgpuSpecs = await db.query('SELECT COUNT(*) as count FROM amd_igpu_specs');
  console.log(`AMD iGPU Specs: ${amdIgpuSpecs.rows[0].count} rows`);

  const intelCpuSpecs = await db.query('SELECT COUNT(*) as count FROM intel_cpu_specs');
  console.log(`Intel CPU Specs: ${intelCpuSpecs.rows[0].count} rows`);

  const intelIgpuSpecs = await db.query('SELECT COUNT(*) as count FROM intel_igpu_specs');
  console.log(`Intel iGPU Specs: ${intelIgpuSpecs.rows[0].count} rows`);

  const intelCpuSeries = await db.query('SELECT COUNT(*) as count FROM intel_cpu_series');
  console.log(`Intel CPU Series: ${intelCpuSeries.rows[0].count} rows`);

  const intelIgpuSeries = await db.query('SELECT COUNT(*) as count FROM intel_igpu_series');
  console.log(`Intel iGPU Series: ${intelIgpuSeries.rows[0].count} rows`);
}

test().catch(err => {
  console.error('PGlite Test Error:', err);
  process.exit(1);
});
