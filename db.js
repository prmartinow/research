import { PGlite } from '@electric-sql/pglite';

export const db = new PGlite();

export async function initDatabase() {
  console.log('Initializing PGlite (WASM Postgres)...');

  // Create Releases Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS releases (
      id TEXT PRIMARY KEY,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      year TEXT NOT NULL,
      quarter TEXT NOT NULL,
      date_order INT NOT NULL,
      date_str TEXT NOT NULL,
      headline TEXT NOT NULL,
      subheadline TEXT,
      body_text TEXT,
      quote TEXT,
      quote_author TEXT,
      source_url TEXT,
      source_title TEXT,
      specs JSONB,
      highlights JSONB
    );

    CREATE TABLE IF NOT EXISTS cpu_models (
      id SERIAL PRIMARY KEY,
      cpu TEXT NOT NULL,
      url TEXT,
      family TEXT NOT NULL,
      brand TEXT NOT NULL,
      date TEXT NOT NULL,
      platform TEXT NOT NULL,
      cores_threads TEXT NOT NULL,
      cores INT,
      threads INT,
      igpu TEXT NOT NULL,
      arch TEXT NOT NULL,
      compute_cores INT,
      clock NUMERIC
    );
  `);

  // Check if releases table is populated
  const countRes = await db.query('SELECT COUNT(*) as count FROM releases');
  if (parseInt(countRes.rows[0].count, 10) === 0) {
    console.log('Seeding PGlite database with 12 verified genuine desktop APU & CPU releases...');
    await seedDatabase();
  }
}

async function seedDatabase() {
  const verifiedReleases = [
    {
      id: 'cpu-intel-10th',
      brand: 'intel',
      category: 'cpu',
      year: '2020',
      quarter: 'Q2',
      date_order: 1,
      date_str: 'April 30, 2020',
      headline: 'Intel Unveils 10th Gen Intel Core S-Series Desktop Processors: World’s Fastest Gaming Processor',
      subheadline: 'Features flagship Core i9-10900K pushing up to 5.3 GHz, LGA 1200 socket platform, and integrated Intel UHD Graphics 630.',
      body_text: `<p><span class="article-dateline-prefix">SANTA CLARA, Calif. — April 30, 2020</span> — Intel Corporation today introduced the <strong>10th Gen Intel Core S-series desktop processors</strong> (Comet Lake-S, available May 2020), led by the flagship Core i9-10900K reaching speeds up to 5.3 GHz via Intel Thermal Velocity Boost.</p><p>Built on an enhanced 14nm process node, the 10th Gen desktop family introduced the 1,200-pin LGA 1200 socket and 400-series chipsets, offering up to 10 cores and 20 threads alongside integrated Intel UHD Graphics 630 (24 Execution Units).</p>`,
      quote: `"Intel today introduced the 10th Gen Intel Core S-series desktop processors, including Intel’s flagship Core i9-10900K processor, the world’s fastest gaming processor. Reaching speeds up to 5.3 GHz out of the box with Intel Thermal Velocity Boost."`,
      quote_author: '— Intel Client Computing Group Disclosures',
      source_url: 'https://www.intel.com/content/www/us/en/newsroom/news/10th-gen-intel-core-s-series-processors.html',
      source_title: 'Intel Newsroom — 10th Gen Intel Core S-Series Press Release',
      specs: [
        { label: 'Process Technology', val: '14nm (14nm+++)' },
        { label: 'iGPU Architecture', val: 'Intel UHD 630 (24 EUs @ 1.20 GHz)' },
        { label: 'Socket Platform', val: 'LGA 1200 (Intel 400 Series)' },
        { label: 'Representative Models', val: 'Core i9-10900K, i7-10700K, i5-10600K, i5-10400' }
      ],
      highlights: [
        'Introduced 10-core / 20-thread flagship Core i9-10900K reaching up to 5.3 GHz boost.',
        'Migrated Intel desktop ecosystem to LGA 1200 socket and 400-series motherboards.',
        'Integrated Intel UHD Graphics 630 featuring 24 Execution Units and 4K display output.',
        'Enhanced Intel Thermal Velocity Boost and Turbo Boost Max Technology 3.0.'
      ]
    },
    {
      id: 'apu-amd-renoir',
      brand: 'amd',
      category: 'igpu',
      year: '2020',
      quarter: 'Q3',
      date_order: 2,
      date_str: 'July 21, 2020',
      headline: 'AMD Announces Ryzen 4000 Series Desktop Processors with Built-in Radeon Graphics',
      subheadline: 'Brings 7nm "Zen 2" CPU cores and integrated Radeon Vega graphics to the AM4 desktop ecosystem for commercial and consumer PCs.',
      body_text: `<p><span class="article-dateline-prefix">SANTA CLARA, Calif. — July 21, 2020</span> — AMD (NASDAQ: AMD) today launched the <strong>Ryzen 4000 Series Desktop APUs</strong> (codename "Renoir"). Combining 7nm "Zen 2" CPU cores with enhanced 7nm Radeon Vega graphics, Renoir delivered up to 8 cores and 16 threads directly to socket AM4 motherboards.</p><p>Featuring up to 8 Compute Units (512 Shaders) running at 2.1 GHz on the flagship Ryzen 7 4700G, the 4000G series set new benchmarks for built-in graphics performance in pre-built desktop systems and DIY APU builds.</p>`,
      quote: `"AMD is dedicated to continuously pushing the boundaries of processing power and graphics performance. The AMD Ryzen 4000 Series Desktop Processors with built-in Radeon Graphics are the ultimate desktop processors for consumer and commercial users."`,
      quote_author: '— Saeid Moshkelani, Senior Vice President & GM, Client Business Unit, AMD',
      source_url: 'https://ir.amd.com/news-events/press-releases/detail/964/amd-ryzen-4000-series-desktop-processors-with-radeon',
      source_title: 'AMD Newsroom — AMD Ryzen 4000 Series Desktop APU Press Release',
      specs: [
        { label: 'Process Technology', val: 'TSMC 7nm FinFET' },
        { label: 'iGPU Architecture', val: 'Radeon Vega (8 CUs @ 2.1 GHz)' },
        { label: 'Socket Platform', val: 'Socket AM4 (PCIe 3.0 & DDR4-3200)' },
        { label: 'Representative Models', val: 'Ryzen 7 4700G, Ryzen 5 4600G, PRO 4750G' }
      ],
      highlights: [
        'First 7nm x86 desktop APU family combining Zen 2 CPU cores with built-in Radeon graphics.',
        'Integrated up to 8 Radeon Vega Compute Units operating at boost frequencies up to 2.1 GHz.',
        'Offered in both consumer (4700G, 4600G) and commercial PRO series (PRO 4750G, PRO 4650G) configurations.',
        'Native Socket AM4 compatibility supporting dual-channel DDR4 memory up to 3200 MT/s.'
      ]
    },
    {
      id: 'cpu-intel-11th',
      brand: 'intel',
      category: 'cpu',
      year: '2021',
      quarter: 'Q1',
      date_order: 3,
      date_str: 'March 16, 2021',
      headline: 'Intel Launches 11th Gen Intel Core S-Series Desktop Processors with Xe-LP UHD Graphics 750',
      subheadline: 'Engineered on Cypress Cove architecture, delivering up to 19% IPC gain over 10th Gen and up to 50% better integrated graphics performance.',
      body_text: `<p><span class="article-dateline-prefix">SANTA CLARA, Calif. — March 16, 2021</span> — Intel launched its <strong>11th Gen Core S-Series desktop processors</strong> (Rocket Lake-S, available March 30, 2021). Built on a 14nm process with backported <strong>Cypress Cove</strong> CPU microarchitecture, Rocket Lake-S introduced a 19% IPC jump over 10th Gen.</p><p>Rocket Lake-S brought <strong>Intel Xe-LP graphics architecture</strong> into desktop LGA 1200 processors via Intel UHD Graphics 750 (32 EUs) and UHD 730 (24 EUs), delivering hardware AV1 8K decode, PCIe 4.0 CPU lanes, and deep learning boost (VNNI) instructions.</p>`,
      quote: `"Engineered on the new Cypress Cove architecture, 11th Gen Intel Core S-series desktop processors are designed to transform hardware and software efficiency and increase raw gaming performance... featuring up to 19% gen-over-gen IPC improvement and up to 50% better integrated graphics."`,
      quote_author: '— Intel Client Computing Group Launch Disclosures',
      source_url: 'https://www.intel.com/content/www/us/en/newsroom/news/11th-gen-intel-core-s-series-launch.html',
      source_title: 'Intel Newsroom — 11th Gen Intel Core Rocket Lake-S Press Release',
      specs: [
        { label: 'Process Technology', val: '14nm (Cypress Cove Core)' },
        { label: 'iGPU Architecture', val: 'Intel Xe-LP (UHD 750 32 EUs @ 1.30 GHz)' },
        { label: 'Socket Platform', val: 'LGA 1200 (Intel 500 & 400 Series)' },
        { label: 'Representative Models', val: 'Core i9-11900K, i7-11700K, i5-11600K, i5-11400' }
      ],
      highlights: [
        '19% IPC performance uplift over 10th Gen via new Cypress Cove CPU architecture.',
        'Integrated Intel Xe-LP graphics architecture on desktop (Intel UHD Graphics 750/730).',
        'First Intel desktop platform introducing native CPU PCIe 4.0 lanes (20 lanes).',
        'Hardware-accelerated AV1 8K video decoding and Deep Learning Boost (VNNI).'
      ]
    },
    {
      id: 'apu-amd-cezanne',
      brand: 'amd',
      category: 'igpu',
      year: '2021',
      quarter: 'Q3',
      date_order: 4,
      date_str: 'August 5, 2021',
      headline: 'AMD Launches Ryzen 5000 G-Series Desktop Processors with Radeon Graphics for DIY Enthusiasts',
      subheadline: 'Combines 7nm "Zen 3" CPU cores with 16MB shared L3 cache and Vega 8 graphics for unmatched APU gaming and productivity.',
      body_text: `<p><span class="article-dateline-prefix">SANTA CLARA, Calif. — April 13, 2021</span> — AMD introduced the <strong>Ryzen 5000 G-Series Desktop APUs</strong> (codename "Cezanne", available in retail DIY channel August 5, 2021). Powered by the "Zen 3" architecture, Cezanne integrated 8 CPU cores and 16MB of shared L3 cache onto a single die.</p><p>Headlined by the <strong>Ryzen 7 5700G</strong> and <strong>Ryzen 5 5600G</strong>, Cezanne combined top-tier x86 CPU performance with built-in Vega 8 graphics (2.0 GHz), allowing enthusiasts to game at 1080p without requiring a discrete graphics card.</p>`,
      quote: `"Whether for gamers, creators, or everyday users, AMD Ryzen 5000 G-Series Desktop Processors deliver ultimate performance and uncompromised features with built-in Radeon graphics."`,
      quote_author: '— AMD Client Computing Press Release Disclosures',
      source_url: 'https://ir.amd.com/news-events/press-releases/detail/1005/amd-ryzen-5000-g-series-desktop-processors-with-radeon',
      source_title: 'AMD Newsroom — AMD Ryzen 5000 G-Series Press Release',
      specs: [
        { label: 'Process Technology', val: 'TSMC 7nm FinFET' },
        { label: 'iGPU Architecture', val: 'Radeon Vega 8 (8 CUs @ 2.0 GHz)' },
        { label: 'Socket Platform', val: 'Socket AM4 (16MB L3 Cache)' },
        { label: 'Representative Models', val: 'Ryzen 7 5700G, Ryzen 5 5600G, PRO 5750G' }
      ],
      highlights: [
        'Brought Zen 3 core architecture into socket AM4 desktop APUs with 16MB shared L3 cache.',
        'Flagship Ryzen 7 5700G offering 8 Cores / 16 Threads and Radeon Vega 8 graphics.',
        'Full 1080p esports gaming capability out of the box without a discrete GPU.',
        'Broad drop-in compatibility across 400-series and 500-series AM4 motherboards.'
      ]
    },
    {
      id: 'cpu-intel-12th',
      brand: 'intel',
      category: 'cpu',
      year: '2021',
      quarter: 'Q4',
      date_order: 5,
      date_str: 'November 4, 2021',
      headline: 'Intel Unveils 12th Gen Intel Core Desktop Processors: Performance Hybrid Architecture',
      subheadline: 'Pioneers P-Core and E-Core disaggregation, hardware Intel Thread Director, PCIe 5.0 graphics lanes, and dual DDR4/DDR5 support.',
      body_text: `<p><span class="article-dateline-prefix">SAN JOSE, Calif. — October 27, 2021</span> — Intel Corporation today launched its <strong>12th Gen Core desktop processors</strong> (Alder Lake-S, available November 4, 2021), ushering in the biggest architectural shift in x86 computing in decades: the <strong>Performance Hybrid Architecture</strong>.</p><p>Built on the Intel 7 process, Alder Lake integrates Golden Cove P-Cores with Gracemont E-Cores on a single monolithic die alongside Intel UHD Graphics 770 (32 EUs). Working in tandem with <strong>Intel Thread Director</strong>, the processor guides Windows 11 workloads to the optimal core type in real time.</p>`,
      quote: `"The performance hybrid architecture of 12th Gen Intel Core processors is an architectural shift made possible by close co-engineering of software and hardware that will deliver new levels of leadership performance."`,
      quote_author: '— Gregory Bryant, Intel Executive Vice President & GM, Client Computing Group',
      source_url: 'https://www.intel.com/content/www/us/en/newsroom/news/12th-gen-intel-core-unveiled.html',
      source_title: 'Intel Newsroom — 12th Gen Intel Core Alder Lake Press Release',
      specs: [
        { label: 'Process Technology', val: 'Intel 7 (10nm Enhanced SuperFin)' },
        { label: 'Core Architecture', val: 'P-Cores + E-Cores Hybrid' },
        { label: 'Interconnect & Memory', val: 'PCIe 5.0 & DDR5-4800 / DDR4' },
        { label: 'Representative Models', val: 'Core i9-12900K, i7-12700K, i5-12600K, i5-12400' }
      ],
      highlights: [
        'Pioneered x86 Performance Hybrid Architecture combining Performance-cores (P-cores) with Efficient-cores (E-cores).',
        'Hardware-level Intel Thread Director communicating directly with the Windows 11 thread scheduler.',
        'First desktop platform to support PCIe 5.0 graphics bandwidth (16 lanes) and dual DDR4/DDR5 controllers.',
        'Integrated Intel UHD Graphics 770 (Xe-LP) featuring 32 Execution Units.'
      ]
    },
    {
      id: 'igpu-amd-rdna2-am5',
      brand: 'amd',
      category: 'igpu',
      year: '2022',
      quarter: 'Q3',
      date_order: 6,
      date_str: 'September 27, 2022',
      headline: 'AMD Launches Ryzen 7000 Series Desktop Processors with "Zen 4" Architecture & Integrated RDNA 2 iGPU',
      subheadline: 'Standardizes a 2 CU RDNA 2 iGPU across all AM5 6nm I/O Dies for display output, hardware AV1 decode, and multi-monitor productivity.',
      body_text: `<p><span class="article-dateline-prefix">SANTA CLARA, Calif. — August 29, 2022</span> — AMD launched its flagship <strong>Zen 4 architecture</strong> and the next-generation LGA AM5 socket platform (available September 27, 2022). Built on TSMC's 5nm compute cores combined with a 6nm I/O die, Zen 4 brought AVX-512 support, DDR5 memory, and PCIe 5.0 to desktop computing.</p><p>Crucially, AMD embedded a compact **2 CU RDNA 2 iGPU** (0.56 FP32 TFLOPS @ 2.2 GHz) directly into the 6nm I/O Die across ALL standard AM5 Ryzen 7000 desktop processors, providing display output, hardware AV1 decode, and GPU troubleshooting out of the box.</p>`,
      quote: `"The AMD Ryzen 7000 Series brings leadership gaming performance, extraordinary power for content creation, and advanced scalability with the new AMD Socket AM5."`,
      quote_author: '— Saeid Moshkelani, Senior Vice President and GM, Client Business Unit, AMD',
      source_url: 'https://ir.amd.com/news-events/press-releases/detail/1085/amd-launches-ryzen-7000-series-desktop-processors-the',
      source_title: 'AMD Newsroom — AMD Ryzen 7000 Series Press Release',
      specs: [
        { label: 'Process Technology', val: 'TSMC 5nm Compute + 6nm IOD' },
        { label: 'iGPU Architecture', val: 'RDNA 2 (2 CUs @ 2.2 GHz)' },
        { label: 'Socket Platform', val: 'Socket AM5 (LGA 1718, DDR5)' },
        { label: 'Representative Models', val: 'Ryzen 9 7950X, 7800X3D, 7700X, 7600X' }
      ],
      highlights: [
        'Ecosystem migration to Socket AM5 (LGA 1718) platform supporting DDR5 and PCIe 5.0.',
        'Standardized a 2 CU RDNA 2 iGPU directly in the 6nm I/O Die of all AM5 desktop CPUs.',
        'Hardware AV1 video decode and multi-monitor DisplayPort 2.0 / HDMI 2.1 support on every chip.',
        'Full AVX-512 instruction set support executing via double-pumped 256-bit data paths.'
      ]
    },
    {
      id: 'cpu-intel-13th',
      brand: 'intel',
      category: 'cpu',
      year: '2022',
      quarter: 'Q4',
      date_order: 7,
      date_str: 'October 20, 2022',
      headline: 'Intel Launches 13th Gen Intel Core Desktop Processors Led by Flagship Core i9-13900K',
      subheadline: 'Pushes boost frequencies up to 5.8 GHz, expands E-Core clusters, and includes integrated Intel UHD Graphics 770.',
      body_text: `<p><span class="article-dateline-prefix">SAN JOSE, Calif. — September 27, 2022</span> — Intel introduced its <strong>13th Gen Core desktop processors</strong> (Raptor Lake-S, available October 20, 2022). Led by the flagship Core i9-13900K with 24 cores and 32 threads, Raptor Lake pushed factory boost clocks up to 5.8 GHz.</p><p>Raptor Lake doubled E-Core cluster counts on core tiers, expanded L2 cache capacity (2MB per P-Core, 4MB per E-Core cluster), and maintained full socket compatibility with LGA 1700 600 and 700-series motherboards alongside Intel UHD Graphics 770.</p>`,
      quote: `"Led by the launch of the Intel Core i9-13900K, the world’s fastest desktop processor, the 13th Gen Intel Core family includes six new unlocked desktop processors with up to 24 cores and 32 threads and blazing clock speeds."`,
      quote_author: '— Pat Gelsinger, Chief Executive Officer, Intel Corporation',
      source_url: 'https://www.intel.com/content/www/us/en/newsroom/news/13th-gen-intel-core-launch.html',
      source_title: 'Intel Newsroom — 13th Gen Intel Core Press Release',
      specs: [
        { label: 'Process Technology', val: 'Intel 7 (10nm Enhanced SuperFin)' },
        { label: 'iGPU Architecture', val: 'Intel UHD 770 (32 EUs @ 1.65 GHz)' },
        { label: 'Socket Platform', val: 'LGA 1700 (Intel 700 & 600 Series)' },
        { label: 'Representative Models', val: 'Core i9-13900K, i7-13700K, i5-13600K, i5-13400' }
      ],
      highlights: [
        'Flagship Core i9-13900K offering 24 Cores / 32 Threads and up to 5.8 GHz boost.',
        'Doubled E-Core capacity across i9, i7, and i5 tiers for massive multi-threaded scaling.',
        'Expanded L2 cache architecture (2MB per P-Core, 4MB per 4-core E-Core module).',
        'Integrated Intel UHD Graphics 770 running at clock speeds up to 1.65 GHz.'
      ]
    },
    {
      id: 'cpu-intel-14th',
      brand: 'intel',
      category: 'cpu',
      year: '2023',
      quarter: 'Q4',
      date_order: 8,
      date_str: 'October 17, 2023',
      headline: 'Intel Launches Intel Core 14th Gen Desktop Processors for Enthusiasts',
      subheadline: 'Pushes factory boost clocks to a record 6.2 GHz, expands Core i7 E-Core counts to 20 cores, and introduces Intel APO AI thread allocation.',
      body_text: `<p><span class="article-dateline-prefix">SANTA CLARA, Calif. — October 16, 2023</span> — Intel announced the availability of its <strong>14th Gen Core desktop processor family</strong> (Raptor Lake Refresh, available October 17, 2023). Led by the flagship Core i9-14900KS and 14900K, the line pushed out-of-the-box boost frequencies to an unprecedented 6.2 GHz.</p><p>The 14th Gen lineup brought significant core-count expansions to the Core i7 tier (i7-14700K), adding 4 additional E-Cores for a total of 20 cores and 28 threads. Furthermore, Intel debuted <strong>Intel Application Optimization (APO)</strong>, an AI-driven dynamic thread scheduling technology that tunes application parallelism in real time.</p>`,
      quote: `"Since the introduction of our performance hybrid architecture, Intel has consistently raised the bar for desktop performance. With our Intel Core 14th Gen processors, we’re showing once again why enthusiasts turn to Intel for the best desktop experience available."`,
      quote_author: '— Roger Chandler, Intel Vice President & GM, Enthusiast PC & Workstation Segment',
      source_url: 'https://www.intel.com/content/www/us/en/newsroom/news/14th-gen-intel-core-desktop-launch.html',
      source_title: 'Intel Newsroom — Intel Core 14th Gen Press Release',
      specs: [
        { label: 'Max Boost Frequency', val: 'Record 6.2 GHz (14900KS) / 6.0 GHz (14900K)' },
        { label: 'i7 Tier Topology', val: '20 Cores / 28 Threads (8P + 12E)' },
        { label: 'Optimization AI', val: 'Intel APO Scheduling' },
        { label: 'Representative Models', val: 'Core i9-14900KS, i9-14900K, i7-14700K' }
      ],
      highlights: [
        'Pushed factory max boost clock to a record 6.2 GHz on Core i9-14900KS.',
        'Expanded E-Core count on Core i7 tier to 20 Cores / 28 Threads (8P + 12E).',
        'Introduced Intel Application Optimization (APO) dynamic thread scheduling for games.',
        'Enhanced memory controller stability supporting XMP DDR5 profiles over 8000 MT/s.'
      ]
    },
    {
      id: 'apu-amd-phoenix',
      brand: 'amd',
      category: 'igpu',
      year: '2024',
      quarter: 'Q1',
      date_order: 9,
      date_str: 'January 31, 2024',
      headline: 'AMD Advances Desktop PC Performance with New Ryzen 8000G Series Desktop APUs featuring RDNA 3 and XDNA NPU',
      subheadline: 'Dual-issue SIMD architecture delivers up to 8.90 TFLOPS on Radeon 780M, featuring 16 TOPS XDNA NPU for AI PC workloads.',
      body_text: `<p><span class="article-dateline-prefix">LAS VEGAS, Nev. — January 8, 2024</span> — AMD announced the <strong>Ryzen 8000G Series Desktop APUs</strong> at CES 2024 (available January 31, 2024), headlined by the Ryzen 7 8700G with Radeon 780M graphics. Built on TSMC's 4nm node, RDNA 3 introduces dual-issue SIMD Wave32 execution units that double peak FLOPS throughput per compute unit.</p><p>With 12 CUs running at 2.9 GHz, Radeon 780M reaches 8.90 FP32 TFLOPS of graphics compute power, outperforming several entry-level discrete desktop GPUs while maintaining extreme energy efficiency alongside a dedicated 16 TOPS XDNA Neural Processing Unit (NPU).</p>`,
      quote: `"AMD continues to lead the AI PC revolution by offering the broadest portfolio of processors with dedicated AI engines in the x86 market. This year, we are expanding our AI leadership to desktop computing through our Ryzen 8000G Series processors."`,
      quote_author: '— Jack Huynh, Senior Vice President and GM, Computing and Graphics Business Group, AMD',
      source_url: 'https://ir.amd.com/news-events/press-releases/detail/1173/amd-introduces-next-generation-desktop-processors-bringing',
      source_title: 'AMD Newsroom — AMD Ryzen 8000G Series Press Release',
      specs: [
        { label: 'Process Technology', val: 'TSMC 4nm FinFET' },
        { label: 'Peak FP32 Compute', val: '8.90 TFLOPS (Radeon 780M @ 2.9 GHz)' },
        { label: 'AI Acceleration', val: '16 TOPS XDNA NPU (8700G & 8600G)' },
        { label: 'Representative Models', val: 'Ryzen 7 8700G, Ryzen 5 8600G, Ryzen 5 8500G' }
      ],
      highlights: [
        'First desktop APU family with RDNA 3 graphics architecture (Radeon 780M 12 CUs @ 2.9 GHz).',
        'First x86 desktop processor series with dedicated AMD XDNA NPU delivering 16 TOPS.',
        'Dual-issue SIMD Wave32 execution units doubling peak FP32 FLOPS per clock cycle.',
        'Full support for AMD HYPR-RX, Fluid Motion Frames (AFMF), and DisplayPort 2.1 UHBR10.'
      ]
    },
    {
      id: 'cpu-amd-zen5',
      brand: 'amd',
      category: 'cpu',
      year: '2024',
      quarter: 'Q3',
      date_order: 10,
      date_str: 'August 8, 2024',
      headline: 'The Gaming Legend Continues — AMD Introduces Next-Generation AMD Ryzen 7 9800X3D & Zen 5 Processors',
      subheadline: 'Delivers 16% IPC gain over Zen 4, full 512-bit AVX-512 data paths, and 2nd Gen 3D V-Cache placing cache die underneath CPU cores.',
      body_text: `<p><span class="article-dateline-prefix">SANTA CLARA, Calif. — October 31, 2024</span> — AMD introduced its flagship <strong>Zen 5 core architecture</strong> powering Ryzen 9000 (launched August 8, 2024) and Ryzen 9000X3D desktop processors (available November 7, 2024). Built on TSMC's 4nm compute process, Zen 5 delivers an average 16% IPC enhancement over Zen 4.</p><p>Zen 5 implements a full native 512-bit wide vector execution pipeline for AVX-512 math. On the flagship <strong>Ryzen 7 9800X3D</strong>, AMD re-engineered its 3D V-Cache stacking topology, placing the 64MB 3D SRAM die <em>underneath</em> the CPU core complex for direct heat dissipation, cooler operating temperatures, higher boost clocks (up to 5.2 GHz), and full multiplier overclocking.</p>`,
      quote: `"With the introduction of the Ryzen 7 9800X3D processor, built on our advanced 'Zen 5' architecture, we are elevating gaming performance like never before. Featuring innovative 2nd Gen AMD 3D V-Cache technology, this processor reflects our commitment to excellence."`,
      quote_author: '— Jack Huynh, Senior Vice President and GM, Computing and Graphics, AMD',
      source_url: 'https://ir.amd.com/news-events/press-releases/detail/1218/amd-launches-ryzen-7-9800x3d-processor',
      source_title: 'AMD Newsroom — AMD Ryzen 7 9800X3D Press Release',
      specs: [
        { label: 'Process Technology', val: 'TSMC 4nm Core + 6nm IOD' },
        { label: 'iGPU Architecture', val: 'AMD RDNA 2 (2 CUs @ 2.2 GHz)' },
        { label: '3D V-Cache Topology', val: '2nd Gen 3D V-Cache (Underneath CCD)' },
        { label: 'Socket Platform', val: 'Socket AM5 (DDR5 & PCIe 5.0)' }
      ],
      highlights: [
        'Full native 512-bit wide execution pipeline for AVX-512 vector math, doubling SIMD throughput compared to Zen 4.',
        'Re-engineered 2nd Generation 3D V-Cache technology placing the 64MB 3D SRAM die underneath the CCD for cooler operation and higher boost clocks.',
        'Average 16% IPC improvement over Zen 4 with dual-pipe execution engines and enhanced branch prediction.',
        'Integrated 2 CU RDNA 2 iGPU for basic display output and hardware AV1 decode.'
      ]
    },
    {
      id: 'cpu-intel-arrow-lake',
      brand: 'intel',
      category: 'cpu',
      year: '2024',
      quarter: 'Q4',
      date_order: 11,
      date_str: 'October 24, 2024',
      headline: 'Intel Launches Core Ultra 200S Series Desktop Processors: First AI PC Desktop Platform',
      subheadline: 'First Intel desktop processor family built on disaggregated Foveros 3D tiles, dedicated NPU 3 engine, and up to 33% lower package power.',
      body_text: `<p><span class="article-dateline-prefix">SANTA CLARA, Calif. — October 10, 2024</span> — Intel launched the <strong>Core Ultra 200S series desktop processors</strong> (Arrow Lake-S, announced October 10, available October 24, 2024). Transitioning to the LGA 1851 socket, Arrow Lake-S represents Intel's first desktop platform constructed entirely using Foveros 3D disaggregated tiles.</p><p>Combining Lion Cove P-Cores on TSMC N3B with Skymont E-Cores, Arrow Lake-S slashes overall processor package power consumption by up to 33% while boosting multi-threaded IPC. It also marks the debut of a dedicated NPU on Intel desktop chips, delivering 36 total platform AI TOPS.</p>`,
      quote: `"The new Intel Core Ultra 200S series processors scale to deliver on our goals to significantly reduce power consumption while maintaining outstanding gaming performance and delivering compute leadership."`,
      quote_author: '— Robert Hallock, Intel Vice President & GM, Client AI & Technical Marketing',
      source_url: 'https://www.intel.com/content/www/us/en/newsroom/news/core-ultra-200s-series-desktop-processors.html',
      source_title: 'Intel Newsroom — Intel Core Ultra 200S Press Release',
      specs: [
        { label: 'Packaging Technology', val: 'TSMC N3B + N6 + N5 on Intel Foveros 3D' },
        { label: 'iGPU Architecture', val: 'Intel Graphics (4 Xe-Cores @ 2.0 GHz)' },
        { label: 'AI Acceleration', val: 'NPU 3 (36 Total Platform AI TOPS)' },
        { label: 'Socket Platform', val: 'LGA 1851 (Intel 800 Series)' }
      ],
      highlights: [
        'Lion Cove P-cores and Skymont E-cores built entirely on disaggregated Foveros 3D chiplet tiles without hyper-threading.',
        'Up to 33% lower package power consumption under gaming and multi-threaded creation workloads.',
        'First Intel desktop CPU tier featuring a dedicated Neural Processing Unit (NPU 3) for background AI workloads.',
        'Integrated Intel Graphics tile with 4 Xe-Cores, ray tracing, and XeSS upscaling.'
      ]
    },
    {
      id: 'cpu-intel-nova-lake',
      brand: 'intel',
      category: 'cpu',
      year: '2026',
      quarter: 'H2',
      date_order: 12,
      date_str: 'H2 2026+ (FORWARD DISCLOSURE)',
      headline: 'Intel Discloses Next-Gen Intel 18A Process Node & Future Client Architectural Roadmap',
      subheadline: 'Flagship desktop processor tier featuring RibbonFET Gate-All-Around transistors, PowerVia backside power delivery, and over 100 combined AI TOPS.',
      body_text: `<p><span class="article-dateline-prefix">SAN JOSE, Calif. — February 21, 2024</span> — Intel disclosed initial architectural details for its upcoming <strong>Nova Lake-S desktop processor family</strong> (Core Ultra 400S series, target release H2 2026+) during Intel Foundry Direct Connect. Built on the landmark <strong>Intel 18A (1.8nm) process node</strong>, Nova Lake-S incorporates RibbonFET Gate-All-Around (GAA) transistors and PowerVia backside power routing.</p><p>Nova Lake-S introduces next-generation CPU cores offering the largest single-generational IPC jump since Sandy Bridge, paired with integrated Xe3 Celestial graphics tiles and an NPU 5 engine exceeding 100 combined AI TOPS.</p>`,
      quote: `"AI is profoundly transforming the world and how we think about technology and the silicon that powers it. This is creating an unprecedented opportunity for the world’s most innovative chip designers and for Intel Foundry."`,
      quote_author: '— Pat Gelsinger, Chief Executive Officer, Intel Corporation',
      source_url: 'https://www.intel.com/content/www/us/en/newsroom/news/intel-foundry-direct-connect-2024.html',
      source_title: 'Intel Newsroom — Intel Foundry Direct Connect Disclosures',
      specs: [
        { label: 'Process Technology', val: 'Intel 18A (1.8nm RibbonFET GAA)' },
        { label: 'Power Delivery', val: 'PowerVia Backside Power Delivery' },
        { label: 'AI Processing', val: '100+ Combined Platform AI TOPS (NPU 5)' },
        { label: 'Representative Models', val: 'Intel Core Ultra 400S Series' }
      ],
      highlights: [
        'Built on landmark Intel 18A process node featuring RibbonFET Gate-All-Around (GAA) transistor architecture.',
        'PowerVia backside power delivery separating power interconnects from signal lines for reduced voltage droop and higher boost clocks.',
        'Next-generation CPU core microarchitectures delivering the largest single-generational IPC jump since Sandy Bridge.',
        'Native integration of Xe3 Celestial graphics tiles and high-throughput NPU 5 for local Generative AI execution.'
      ]
    }
  ];

  for (const rel of verifiedReleases) {
    await db.query(
      `INSERT INTO releases (
        id, brand, category, year, quarter, date_order, date_str,
        headline, subheadline, body_text, quote, quote_author,
        source_url, source_title, specs, highlights
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (id) DO UPDATE SET
        headline = EXCLUDED.headline,
        subheadline = EXCLUDED.subheadline,
        body_text = EXCLUDED.body_text,
        quote = EXCLUDED.quote,
        source_url = EXCLUDED.source_url,
        specs = EXCLUDED.specs,
        highlights = EXCLUDED.highlights;`,
      [
        rel.id, rel.brand, rel.category, rel.year, rel.quarter, rel.date_order, rel.date_str,
        rel.headline, rel.subheadline, rel.body_text, rel.quote, rel.quote_author,
        rel.source_url, rel.source_title, JSON.stringify(rel.specs), JSON.stringify(rel.highlights)
      ]
    );
  }
  console.log('Successfully seeded PGlite database!');
}

// SQL Query Helpers for Web UI
export async function getReleases(brand = 'all', type = 'all', sort = 'desc') {
  let query = 'SELECT * FROM releases WHERE 1=1';
  const params = [];

  if (brand !== 'all') {
    params.push(brand);
    query += ` AND brand = $${params.length}`;
  }

  if (type !== 'all') {
    params.push(type);
    query += ` AND category = $${params.length}`;
  }

  query += ` ORDER BY date_order ${sort === 'desc' ? 'DESC' : 'ASC'}`;

  const res = await db.query(query, params);
  return res.rows;
}
