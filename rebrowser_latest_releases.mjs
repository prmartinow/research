import fs from 'fs';
import path from 'path';

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

async function searchAndFetchReleaseDetails() {
  console.log('Connecting to Rebrowser CDP session at http://127.0.0.1:9225...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9225');
  const context = browser.contexts()[0] || await browser.newContext();

  const queries = [
    {
      name: 'amd_latest',
      query: 'AMD Launches Ryzen 7 9800X3D Processor site:ir.amd.com',
      expectedDomain: 'ir.amd.com'
    },
    {
      name: 'intel_latest',
      query: 'Intel Core Ultra 200S Series Desktop Processors press release site:newsroom.intel.com',
      expectedDomain: 'newsroom.intel.com'
    }
  ];

  const results = {};

  for (const q of queries) {
    console.log(`\n--- Searching for ${q.name} via Rebrowser Google Search ---`);
    const page = await context.newPage();
    try {
      await page.goto(`https://www.google.com/search?q=${encodeURIComponent(q.query)}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(2000);

      // Find search result link
      const links = await page.$$eval('a[href^="http"]', (anchors, targetDomain) => {
        return anchors
          .map(a => a.href)
          .filter(href => href.includes(targetDomain) && !href.includes('google.com'));
      }, q.expectedDomain);

      console.log(`Found target search links for ${q.expectedDomain}:`, links);

      const targetUrl = links[0] || (q.name === 'amd_latest' ? 'https://ir.amd.com/news-events/press-releases/detail/1218/amd-launches-ryzen-7-9800x3d-processor' : 'https://www.intel.com/content/www/us/en/newsroom/news/core-ultra-200s-series-desktop-processors.html');
      
      console.log(`Navigating to verified press release page: ${targetUrl}`);
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);

      const pageData = await page.evaluate(() => {
        const title = document.title;
        const h1 = document.querySelector('h1')?.innerText?.trim() || '';
        const bodyText = document.body.innerText;
        return { title, h1, textSnippet: bodyText.substring(0, 3000) };
      });

      results[q.name] = {
        url: targetUrl,
        title: pageData.title,
        h1: pageData.h1,
        snippet: pageData.textSnippet
      };

    } catch (err) {
      console.error(`Error processing query ${q.name}:`, err.message);
    } finally {
      await page.close().catch(() => {});
    }
  }

  fs.writeFileSync('latest_releases_rebrowser.json', JSON.stringify(results, null, 2));
  console.log('\nSaved Rebrowser research results to latest_releases_rebrowser.json');
}

searchAndFetchReleaseDetails().catch(console.error);
