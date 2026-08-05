# APU & Desktop Processors Research Specifications (2020 – 2026+)

This document contains the verified architecture, data schema, timeline roadmap, table interface, and maintenance guidelines for the APU & Desktop Processors Research project (Intel & AMD Desktop Processors with Integrated Graphics 2020 – 2026+).

---

## 1. Verified Desktop Processor & iGPU Release Nodes (2020 – 2026+)

| ID | Title | Family / Codename | Launch Date | Socket | CPU Architecture | iGPU Architecture | iGPU Specs | Official Press Release URL |
|---|---|---|---|---|---|---|---|---|
| `cpu-intel-10th` | Comet Lake-S | 10th Gen Intel Core | April 30, 2020 | LGA 1200 | Skylake 14nm | Intel Gen9.5 | Intel UHD 630 (24 EUs @ 1.20 GHz) | [Intel Press Release](https://www.intel.com/content/www/us/en/newsroom/news/10th-gen-intel-core-s-series-processors.html) |
| `apu-amd-renoir` | Ryzen 4000G | AMD Renoir APU | July 21, 2020 | Socket AM4 | Zen 2 7nm | Radeon Vega | Vega 8 (8 CUs @ 2.1 GHz, 2.15 TFLOPS) | [AMD Press Release](https://ir.amd.com/news-events/press-releases/detail/964/amd-ryzen-4000-series-desktop-processors-with-radeon) |
| `cpu-intel-11th` | Rocket Lake-S | 11th Gen Intel Core | March 16, 2021 | LGA 1200 | Cypress Cove 14nm | Intel Xe-LP | Intel UHD 750 (32 EUs @ 1.30 GHz) | [Intel Press Release](https://www.intel.com/content/www/us/en/newsroom/news/11th-gen-intel-core-s-series-launch.html) |
| `apu-amd-cezanne` | Ryzen 5000G | AMD Cezanne APU | August 5, 2021 | Socket AM4 | Zen 3 7nm | Radeon Vega | Vega 8 (8 CUs @ 2.0 GHz, 2.05 TFLOPS) | [AMD Press Release](https://ir.amd.com/news-events/press-releases/detail/1005/amd-ryzen-5000-g-series-desktop-processors-with-radeon) |
| `cpu-intel-12th` | Alder Lake-S | 12th Gen Intel Core | November 4, 2021 | LGA 1700 | Golden Cove + Gracemont | Intel Xe-LP | Intel UHD 770 (32 EUs @ 1.55 GHz) | [Intel Press Release](https://www.intel.com/content/www/us/en/newsroom/news/12th-gen-intel-core-unveiled.html) |
| `igpu-amd-rdna2-am5` | Ryzen 7000 AM5 | AMD Raphael Desktop | September 27, 2022 | Socket AM5 | Zen 4 5nm / 6nm IOD | AMD RDNA 2 | 2 CUs @ 2.2 GHz (0.56 TFLOPS) | [AMD Press Release](https://ir.amd.com/news-events/press-releases/detail/1085/amd-launches-ryzen-7000-series-desktop-processors-the) |
| `cpu-intel-13th` | Raptor Lake-S | 13th Gen Intel Core | October 20, 2022 | LGA 1700 | Raptor Cove + Gracemont | Intel Xe-LP | Intel UHD 770 (32 EUs @ 1.65 GHz) | [Intel Press Release](https://www.intel.com/content/www/us/en/newsroom/news/13th-gen-intel-core-launch.html) |
| `cpu-intel-14th` | Raptor Lake Refresh | 14th Gen Intel Core | October 17, 2023 | LGA 1700 | Raptor Cove + Gracemont | Intel Xe-LP | Intel UHD 770 (32 EUs @ 1.65 GHz) | [Intel Press Release](https://www.intel.com/content/www/us/en/newsroom/news/14th-gen-intel-core-desktop-launch.html) |
| `apu-amd-phoenix` | Ryzen 8000G | AMD Phoenix / Hawk Point | January 31, 2024 | Socket AM5 | Zen 4 4nm | AMD RDNA 3 | Radeon 780M (12 CUs @ 2.9 GHz, 8.9 TFLOPS) + 16 TOPS NPU | [AMD Press Release](https://ir.amd.com/news-events/press-releases/detail/1173/amd-introduces-next-generation-desktop-processors-bringing) |
| `cpu-amd-zen5` | Zen 5 & 9800X3D | AMD Granite Ridge | August 8, 2024 | Socket AM5 | Zen 5 4nm | AMD RDNA 2 | 2 CUs @ 2.2 GHz (0.56 TFLOPS) | [AMD Press Release](https://ir.amd.com/news-events/press-releases/detail/1218/amd-launches-ryzen-7-9800x3d-processor) |
| `cpu-intel-arrow-lake` | Arrow Lake-S | Core Ultra 200S | October 24, 2024 | LGA 1851 | Lion Cove + Skymont | Intel Xe-LPG | Intel Graphics (4 Xe-Cores @ 2.0 GHz) + 13 TOPS NPU | [Intel Press Release](https://www.intel.com/content/www/us/en/newsroom/news/core-ultra-200s-series-desktop-processors.html) |
| `cpu-intel-nova-lake` | Nova Lake-S | Core Ultra 400S | H2 2026+ | LGA 1851 / Next | Panther Cove 18A | Intel Xe3 Celestial | Xe3 Celestial Tile + 100+ TOPS NPU 5 | [Intel Disclosures](https://www.intel.com/content/www/us/en/newsroom/news/intel-foundry-direct-connect-2024.html) |

---

## 2. Unvalidated & Non-Existent SKUs Audit log

The following fake, unvalidated, or non-desktop entries were audited and **removed**:
- ❌ **Lunar Lake Xe2 / Core Ultra 200V**: Soldered mobile-only laptop platform (no desktop CPUs or LGA sockets).
- ❌ **Ryzen 7 7700X3D**: Non-existent model number.
- ❌ **Ryzen 9 PRO 9965X3D / 9955 / PRO X3D**: Fake model numbers.
- ❌ **Ryzen 9 9950X3D2 Dual Edition**: Non-existent SKU.
- ❌ **Ryzen AI 7 PRO 450G / 440G**: Non-existent desktop APU SKUs (Ryzen AI 300 series are FP11 mobile chips).
- ❌ **Ryzen 7 PRO 8705G / 8605G**: Fake model numbers (official series is 8700G, 8600G).
