import { db, initDatabase } from './db.js';

async function main() {
  await initDatabase();

  const sqlArg = process.argv[2];

  if (!sqlArg) {
    console.log('\n--- PGlite PostgreSQL Database Overview ---');
    const tablesRes = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    for (const row of tablesRes.rows) {
      const countRes = await db.query(`SELECT COUNT(*) as count FROM ${row.table_name}`);
      console.log(`Table: ${row.table_name.padEnd(15)} | Rows: ${countRes.rows[0].count}`);
    }

    console.log('\nUsage Examples:');
    console.log('  node query_db.mjs "SELECT * FROM releases"');
    console.log('  node query_db.mjs "SELECT cpu, family, igpu, clock FROM cpu_models LIMIT 5"');
    process.exit(0);
  }

  console.log(`\nExecuting SQL: ${sqlArg}`);
  const result = await db.query(sqlArg);
  console.log(`Returned ${result.rows.length} rows:\n`);
  console.table(result.rows);
}

main().catch(err => {
  console.error('SQL Error:', err.message);
  process.exit(1);
});
