import { initDatabase, getReleases } from './db.js';

let activeType = 'all';
let activeBrand = 'all';
let currentReleases = [];

document.addEventListener('DOMContentLoaded', async () => {
  await initDatabase();
  await refreshTimelineData();
  setupFilterListeners();
  setupModalListeners();
  setupDragToScroll();
  restoreScrollPosition();
});

async function refreshTimelineData() {
  currentReleases = await getReleases(activeBrand, activeType, 'asc');
  renderTimeline();
}

function restoreScrollPosition() {
  const viewport = document.getElementById('timeline-viewport');
  if (!viewport) return;
  const savedPos = localStorage.getItem('apu_timeline_scroll_position');
  if (savedPos !== null) {
    viewport.scrollLeft = parseInt(savedPos, 10);
  }
  viewport.addEventListener('scroll', () => {
    localStorage.setItem('apu_timeline_scroll_position', viewport.scrollLeft);
  });
}

function renderTimeline() {
  const nodesTrack = document.getElementById('timeline-track') || document.getElementById('timeline-nodes-track');
  const svgOverlay = document.getElementById('timeline-svg-overlay');
  if (!nodesTrack) return;

  // Clear existing items
  nodesTrack.innerHTML = '';
  if (svgOverlay) svgOverlay.innerHTML = '';

  if (currentReleases.length === 0) {
    nodesTrack.innerHTML = `
      <div style="width: 100%; text-align: center; padding: 6rem 2rem; color: var(--text-muted); font-size: 0.95rem;">
        No timeline cards match your filter criteria.
      </div>
    `;
    return;
  }

  // Render horizontal cards track from PGlite PostgreSQL dataset
  currentReleases.forEach(item => {
    const cardEl = document.createElement('div');
    cardEl.className = `timeline-card ${item.brand}`;
    cardEl.dataset.id = item.id;

    const specsList = typeof item.specs === 'string' ? JSON.parse(item.specs) : (item.specs || []);
    const specsHtml = specsList.map(s => `
      <div class="spec-row">
        <span class="spec-label">${s.label}:</span>
        <span class="spec-val">${s.val}</span>
      </div>
    `).join('');

    cardEl.innerHTML = `
      <div class="card-header">
        <span class="card-date">${item.quarter} ${item.year}</span>
        <span class="card-brand-badge ${item.brand}">${item.brand.toUpperCase()}</span>
      </div>
      <h3 class="card-title">${item.id.replace('cpu-', '').replace('apu-', '').replace('igpu-', '').toUpperCase()}</h3>
      <p class="card-subtitle">${item.headline.split(':')[0]}</p>
      <div class="card-specs">
        ${specsHtml}
      </div>
      <a href="notes.html#${item.id}" class="card-details-btn">View Release Notes →</a>
    `;

    nodesTrack.appendChild(cardEl);
  });
}

function setupFilterListeners() {
  // Category Pill Filters
  document.querySelectorAll('[data-filter-type], [data-type]').forEach(pill => {
    pill.addEventListener('click', async () => {
      document.querySelectorAll('[data-filter-type], [data-type]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeType = pill.getAttribute('data-filter-type') || pill.getAttribute('data-type');
      await refreshTimelineData();
    });
  });

  // Brand Pill Filters
  document.querySelectorAll('[data-filter-brand], [data-brand]').forEach(pill => {
    pill.addEventListener('click', async () => {
      document.querySelectorAll('[data-filter-brand], [data-brand]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeBrand = pill.getAttribute('data-filter-brand') || pill.getAttribute('data-brand');
      await refreshTimelineData();
    });
  });
}

function setupModalListeners() {
  const modal = document.getElementById('detail-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.remove('open');
}

function setupDragToScroll() {
  const viewport = document.getElementById('timeline-viewport');
  if (!viewport) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('.timeline-card') || e.target.closest('.timeline-node-card')) return;
    isDown = true;
    viewport.classList.add('active');
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
  });

  viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.classList.remove('active');
  });

  viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.classList.remove('active');
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.5;
    viewport.scrollLeft = scrollLeft - walk;
  });
}
