import fs from 'fs';

let chromium;
try {
  const pw = await import('playwright-core');
  chromium = pw.chromium;
} catch (e) {
  const fallbackPath = process.env.PLAYWRIGHT_PATH || 'playwright-core';
  if (fs.existsSync(fallbackPath)) {
    const pw = await import(fallbackPath);
    chromium = pw.chromium;
  } else {
    throw new Error('playwright-core module not found. Please install playwright-core or set PLAYWRIGHT_PATH.');
  }
}

async function verifyAllPressReleases() {
  console.log('Connecting to Rebrowser CDP session on 127.0.0.1:9225...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9225');
  const context = browser.contexts()[0] || await browser.newContext();

  const pressReleases = [
    { id: 'cpu-intel-10th', url: 'https://www.intel.com/content/www/us/en/newsroom/news/10th-gen-intel-core-s-series-processors.html' },
    { id: 'apu-amd-renoir', url: 'https://ir.amd.com/news-events/press-releases/detail/964/amd-ryzen-4000-series-desktop-processors-with-radeon' },
    { id: 'cpu-intel-11th', url: 'https://www.intel.com/content/www/us/en/newsroom/news/11th-gen-intel-core-s-series-launch.html' },
    { id: 'apu-amd-cezanne', url: 'https://ir.amd.com/news-events/press-releases/detail/1005/amd-ryzen-5000-g-series-desktop-processors-with-radeon' },
    { id: 'cpu-intel-12th', url: 'https://www.intel.com/content/www/us/en/newsroom/news/12th-gen-intel-core-unveiled.html' },
    { id: 'igpu-amd-rdna2-am5', url: 'https://ir.amd.com/news-events/press-releases/detail/1085/amd-launches-ryzen-7000-series-desktop-processors-the' },
    { id: 'cpu-intel-13th', url: 'https://www.intel.com/content/www/us/en/newsroom/news/13th-gen-intel-core-launch.html' },
    { id: 'cpu-intel-14th', url: 'https://www.intel.com/content/www/us/en/newsroom/news/14th-gen-intel-core-desktop-launch.html' },
    { id: 'apu-amd-phoenix', url: 'https://ir.amd.com/news-events/press-releases/detail/1173/amd-introduces-next-generation-desktop-processors-bringing' },
    { id: 'cpu-amd-zen5', url: 'https://ir.amd.com/news-events/press-releases/detail/1218/amd-launches-ryzen-7-9800x3d-processor' },
    { id: 'cpu-intel-arrow-lake', url: 'https://www.intel.com/content/www/us/en/newsroom/news/core-ultra-200s-series-desktop-processors.html' },
    { id: 'cpu-intel-nova-lake', url: 'https://www.intel.com/content/www/us/en/newsroom/news/intel-foundry-direct-connect-2024.html' }
  ];

  const results = [];

  for (const item of pressReleases) {
    console.log(`\nVerifying [${item.id}]: ${item.url}`);
    const page = await context.newPage();
    try {
      await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);

      const data = await page.evaluate(() => {
        const title = document.title;
        const h1 = document.querySelector('h1')?.innerText?.trim() || '';
        return { title, h1 };
      });

      console.log(` -> Title: "${data.title}"`);
      console.log(` -> H1: "${data.h1}"`);

      results.push({
        id: item.id,
        url: item.url,
        status: 'VERIFIED_200',
        title: data.title,
        h1: data.h1
      });
    } catch (err) {
      console.error(` -> Failed to verify ${item.id}:`, err.message);
      results.push({
        id: item.id,
        url: item.url,
        status: 'ERROR',
        error: err.message
      });
    } finally {
      await page.close().catch(() => {});
    }
  }

  fs.writeFileSync('verified_rebrowser_results.json', JSON.stringify(results, null, 2));
  console.log('\nSaved verification results to verified_rebrowser_results.json');
}

verifyAllPressReleases().catch(console.error);
