import { initDatabase, getReleases } from './db.js';

async function test() {
  console.log('Testing PGlite database setup...');
  await initDatabase();

  const allReleases = await getReleases('all', 'all', 'desc');
  console.log(`\nPGlite Query Success: Returned ${allReleases.length} releases from PostgreSQL!`);

  allReleases.forEach((r, idx) => {
    console.log(` ${idx + 1}. [${r.id}] (${r.brand.toUpperCase()}) - ${r.headline}`);
  });
}

test().catch(err => {
  console.error('PGlite Test Error:', err);
  process.exit(1);
});
