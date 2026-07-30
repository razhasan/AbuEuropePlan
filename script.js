(() => {
  'use strict';

  /* ===================== CONFIG ===================== */
  const TRIP_START = new Date(2026, 7, 10, 18, 10);  // Aug 10 2026, 18:10 — landing at CGN
  const TRIP_END   = new Date(2026, 9, 19, 19, 0);   // Oct 19 2026, 19:00 — return flight
  const BROTHER_WEEKS = 1; // fixed

  const COLORS = {
    sisterFirst: '#1E88E5',
    withYou: '#FF5A5F',
    brother: '#7C4DFF',
    sisterFinal: '#FFC93C'
  };

  const state = {
    sisterFirst: 1,
    withYou: 4,
    sisterFinal: 4
  };

  /* ===================== PLACES DATA ===================== */
  const PLACES = [
    { id: 'eiffel', name: 'Eiffel Tower', visited: true, category: 'view', emoji: '🗼', img: 'images/eiffel-tower.jpg',
      desc: 'Already visited — a great spot to revisit at night when it sparkles on the hour.', duration: '2-3 hrs', best: 'Evening' },
    { id: 'ladefense', name: 'La Défense', visited: true, category: 'walk', emoji: '🏙️', img: 'images/la-defense.jpg',
      desc: 'Already visited — Paris\'s modern skyline and the Grande Arche.', duration: '2 hrs', best: 'Afternoon' },
    { id: 'bateaumouche', name: 'Bateau Mouche (Seine Cruise)', visited: true, category: 'view', emoji: '🚤', img: 'images/bateau-mouche.jpg',
      desc: 'Already visited — the classic river cruise past Paris\'s landmarks.', duration: '1 hr', best: 'Evening' },
    { id: 'champs', name: 'Champs-Élysées', visited: true, category: 'walk', emoji: '🛍️', img: 'images/champs-elysees.jpg',
      desc: 'Already visited — the grand avenue of shops and cafés.', duration: '2 hrs', best: 'Afternoon' },

    { id: 'sacrecoeur', name: 'Sacré-Cœur & Montmartre', visited: false, category: 'culture', emoji: '⛪', img: 'images/sacre-coeur.jpg',
      desc: 'A hilltop basilica with the best panoramic view of Paris, plus the artists\' square of Montmartre.', duration: '3 hrs', best: 'Morning' },
    { id: 'notredame', name: 'Notre-Dame & Sainte-Chapelle', visited: false, category: 'culture', emoji: '🕍', img: 'images/notre-dame.jpg',
      desc: 'The newly reopened cathedral and the jewel-box stained-glass chapel nearby on Île de la Cité.', duration: '2-3 hrs', best: 'Morning' },
    { id: 'arc', name: 'Arc de Triomphe', visited: false, category: 'view', emoji: '🏛️', img: 'images/arc-de-triomphe.jpg',
      desc: 'Climb to the rooftop for a view straight down the Champs-Élysées — a nice pairing with his last visit there.', duration: '1-2 hrs', best: 'Late afternoon' },
    { id: 'trocadero', name: 'Trocadéro Gardens', visited: false, category: 'view', emoji: '🌳', img: 'images/trocadero.jpg',
      desc: 'The postcard view of the Eiffel Tower from across the river — easy walking, lots of benches.', duration: '1 hr', best: 'Golden hour' },
    { id: 'louvre', name: 'Louvre Museum', visited: false, category: 'museum', emoji: '🖼️', img: 'images/louvre.jpg',
      desc: 'The world\'s most famous museum — even a short visit to see the Mona Lisa and the glass pyramid is memorable.', duration: '3-4 hrs', best: 'Morning' },
    { id: 'orsay', name: 'Musée d\'Orsay', visited: false, category: 'museum', emoji: '🎨', img: 'images/orsay.jpg',
      desc: 'A grand former railway station full of Impressionist masterpieces — smaller and calmer than the Louvre.', duration: '2-3 hrs', best: 'Morning' },
    { id: 'latin', name: 'Latin Quarter & Panthéon', visited: false, category: 'culture', emoji: '📚', img: 'images/latin-quarter.jpg',
      desc: 'Historic student quarter, narrow streets, and the domed Panthéon resting place of France\'s great figures.', duration: '2-3 hrs', best: 'Afternoon' },
    { id: 'luxembourg', name: 'Luxembourg Gardens', visited: false, category: 'walk', emoji: '🌷', img: 'images/luxembourg-gardens.jpg',
      desc: 'A gentle, beautiful park to relax in — fountains, tree-lined paths, easy on the legs.', duration: '1-2 hrs', best: 'Late morning' },
    { id: 'versailles', name: 'Palace of Versailles', visited: false, category: 'daytrip', emoji: '👑', img: 'images/versailles.jpg',
      desc: 'A full day trip to the opulent royal palace and gardens just outside Paris — book ahead, wear comfortable shoes.', duration: 'Full day', best: 'Early morning start' }
  ];

  const CATEGORY_LABELS = {
    all: 'All', culture: 'Culture', view: 'Views', museum: 'Museums', walk: 'Easy Walks', daytrip: 'Day Trip'
  };

  /* ===================== DATE HELPERS ===================== */
  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }
  function fmt(date, opts) {
    return date.toLocaleDateString('en-GB', opts || { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }
  function fmtShort(date) {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }
  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  /* ===================== SCHEDULE COMPUTATION ===================== */
  function computeSchedule() {
    const legs = [];
    let cursor = new Date(TRIP_START);

    const sisterFirstEnd = addDays(cursor, state.sisterFirst * 7);
    legs.push({
      key: 'sisterFirst', name: 'Bonn — Arrival stay with Busrah', color: COLORS.sisterFirst,
      start: cursor, end: sisterFirstEnd,
      detail: `Landing at Cologne Bonn Airport at 18:10 on ${fmt(TRIP_START)}, picked up by Busrah. Rest and settle in before the trip to Paris.`
    });
    cursor = sisterFirstEnd;

    const withYouEnd = addDays(cursor, state.withYou * 7);
    legs.push({
      key: 'withYou', name: 'Paris / Verneuil-en-Halatte — with you', color: COLORS.withYou,
      start: cursor, end: withYouEnd,
      detail: 'Travel by train from Bonn to Paris (car as backup option), picked up by you. First week is rest, then Paris sightseeing — see the Day-by-Day Plan section below.'
    });
    cursor = withYouEnd;

    const brotherEnd = addDays(cursor, BROTHER_WEEKS * 7);
    legs.push({
      key: 'brother', name: 'Stuttgart — with your brother', color: COLORS.brother,
      start: cursor, end: brotherEnd,
      detail: 'Travel by train from Paris to Stuttgart. One week staying with his son.'
    });
    cursor = brotherEnd;

    const sisterFinalEnd = addDays(cursor, state.sisterFinal * 7);
    legs.push({
      key: 'sisterFinal', name: 'Bonn — Final stay with Busrah', color: COLORS.sisterFinal,
      start: cursor, end: sisterFinalEnd,
      detail: `Back to Bonn by train from Stuttgart. Final stretch before the return flight home on ${fmt(TRIP_END)} at 19:00.`
    });

    return { legs, calculatedEnd: sisterFinalEnd };
  }

  /* ===================== COUNTDOWN ===================== */
  function renderCountdown() {
    const now = new Date();
    const target = now < TRIP_START ? TRIP_START : TRIP_END;
    const diff = target - now;
    const els = {
      days: document.getElementById('cd-days'),
      hours: document.getElementById('cd-hours'),
      mins: document.getElementById('cd-mins'),
      secs: document.getElementById('cd-secs')
    };
    if (diff <= 0) {
      els.days.textContent = '0'; els.hours.textContent = '0'; els.mins.textContent = '0'; els.secs.textContent = '0';
      return;
    }
    const totalSecs = Math.floor(diff / 1000);
    els.days.textContent = Math.floor(totalSecs / 86400);
    els.hours.textContent = Math.floor((totalSecs % 86400) / 3600);
    els.mins.textContent = Math.floor((totalSecs % 3600) / 60);
    els.secs.textContent = totalSecs % 60;
  }

  function renderRouteStrip() {
    const stops = ['CGN Airport', 'Bonn (Busrah)', 'Paris (You)', 'Stuttgart (Brother)', 'Bonn (Busrah)', 'Flight Home'];
    const el = document.getElementById('routeStrip');
    el.innerHTML = stops.map((s, i) =>
      `<span class="stop">${s}</span>${i < stops.length - 1 ? '<span class="arrow">→</span>' : ''}`
    ).join('');
  }

  /* ===================== PLANNER ===================== */
  function renderPlanner() {
    document.getElementById('val-sisterFirst').textContent = state.sisterFirst + (state.sisterFirst === 1 ? ' week' : ' weeks');
    document.getElementById('val-withYou').textContent = state.withYou + (state.withYou === 1 ? ' week' : ' weeks');
    document.getElementById('val-sisterFinal').textContent = state.sisterFinal + (state.sisterFinal === 1 ? ' week' : ' weeks');

    const { calculatedEnd } = computeSchedule();
    const totalWeeks = state.sisterFirst + state.withYou + BROTHER_WEEKS + state.sisterFinal;
    const totalDays = Math.round((calculatedEnd - TRIP_START) / 86400000);
    const statusEl = document.getElementById('plannerStatus');

    if (sameDay(calculatedEnd, TRIP_END)) {
      statusEl.className = 'planner-status ok';
      statusEl.textContent = `✓ Lines up perfectly with the Oct 19 return flight (${totalWeeks} weeks total).`;
    } else {
      const diffDays = Math.round((calculatedEnd - TRIP_END) / 86400000);
      statusEl.className = 'planner-status warn';
      statusEl.textContent = diffDays > 0
        ? `⚠ This combination runs ${diffDays} day(s) past the Oct 19 return flight. Reduce one of the durations above.`
        : `⚠ This combination finishes ${Math.abs(diffDays)} day(s) before the Oct 19 return flight. Add more days above.`;
    }

    document.getElementById('sum-total').textContent = totalWeeks;
    document.getElementById('sum-days').textContent = totalDays;
    document.getElementById('sum-sister').textContent = state.sisterFirst + state.sisterFinal;
    document.getElementById('sum-you').textContent = state.withYou;
    document.getElementById('sum-end').textContent = fmtShort(calculatedEnd);
  }

  function initPlanner() {
    ['sisterFirst', 'withYou', 'sisterFinal'].forEach(key => {
      const input = document.getElementById(key);
      input.value = state[key];
      input.addEventListener('input', () => {
        state[key] = parseInt(input.value, 10);
        renderAll();
      });
    });
  }

  /* ===================== TIMELINE ===================== */
  function renderTimeline() {
    const { legs } = computeSchedule();
    const container = document.getElementById('timelineContainer');
    container.innerHTML = legs.map((leg, i) => `
      <div class="tl-item">
        <div class="tl-dot" style="border-color:${leg.color}"></div>
        <div class="tl-card" data-idx="${i}">
          <span class="chevron">▾</span>
          <h4>${leg.name}</h4>
          <div class="tl-dates">${fmt(leg.start)} → ${fmt(leg.end)}</div>
          <div class="tl-detail">${leg.detail}</div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.tl-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('open'));
    });
  }

  /* ===================== CALENDAR ===================== */
  function legForDate(legs, date) {
    const d0 = stripTime(date);
    const found = legs.find(leg => d0 >= stripTime(leg.start) && d0 < stripTime(leg.end));
    if (found) return found;
    const lastLeg = legs[legs.length - 1];
    return sameDay(d0, stripTime(lastLeg.end)) ? lastLeg : null;
  }

  function renderCalendarLegend() {
    const { legs } = computeSchedule();
    const seen = new Set();
    const el = document.getElementById('calLegend');
    el.innerHTML = legs.filter(l => {
      if (seen.has(l.key)) return false;
      seen.add(l.key); return true;
    }).map(l => `<span><i style="background:${l.color}"></i>${l.name}</span>`).join('');
  }

  function buildMonth(year, month, legs) {
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
    const today = new Date();

    let cells = '';
    for (let i = 0; i < startOffset; i++) cells += `<div class="cal-day empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d, 12, 0);
      const leg = legForDate(legs, date);
      const bg = leg ? leg.color + '2A' : 'transparent';
      const border = leg ? `border:1px solid ${leg.color}` : '';
      const isToday = sameDay(date, today);
      cells += `<div class="cal-day${isToday ? ' today' : ''}" style="background:${bg};${border}" title="${leg ? leg.name : ''}">${d}</div>`;
    }

    return `
      <div class="cal-month">
        <h4>${monthNames[month]} ${year}</h4>
        <div class="cal-grid">
          ${['M','T','W','T','F','S','S'].map(d => `<div class="dow">${d}</div>`).join('')}
          ${cells}
        </div>
      </div>
    `;
  }

  function renderCalendar() {
    const { legs } = computeSchedule();
    renderCalendarLegend();
    const container = document.getElementById('calMonths');
    container.innerHTML =
      buildMonth(2026, 7, legs) +  // August
      buildMonth(2026, 8, legs) +  // September
      buildMonth(2026, 9, legs);   // October
  }

  /* ===================== PARIS GUIDE ===================== */
  let activeFilter = 'all';

  function renderFilterBar() {
    const bar = document.getElementById('filterBar');
    bar.innerHTML = Object.keys(CATEGORY_LABELS).map(key =>
      `<button data-cat="${key}" class="${key === activeFilter ? 'active' : ''}">${CATEGORY_LABELS[key]}</button>`
    ).join('');
    bar.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.cat;
        renderFilterBar();
        renderPlaceGrid();
      });
    });
  }

  function placeMediaHTML(place) {
    const custom = getCustomImageSrc(place.id);
    return `<img src="${custom || place.img}" alt="${place.name}" loading="lazy"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <span class="emoji-fallback" style="display:none">${place.emoji}</span>
      <span class="place-badge">${place.visited ? 'Revisit' : 'New'}</span>
      <button type="button" class="media-edit-btn" data-editid="${place.id}">${custom ? '✎ Edit Photo' : '+ Add Photo'}</button>`;
  }

  function bindMediaEditButtons(scope) {
    scope.querySelectorAll('.media-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageEditModal(btn.dataset.editid);
      });
    });
  }

  function renderPlaceGrid() {
    const grid = document.getElementById('placeGrid');
    const newPlaces = PLACES.filter(p => !p.visited);
    const list = activeFilter === 'all' ? newPlaces : newPlaces.filter(p => p.category === activeFilter);
    grid.innerHTML = list.map(p => `
      <div class="place-card">
        <div class="place-media">${placeMediaHTML(p)}</div>
        <div class="place-body">
          <div class="meta">${CATEGORY_LABELS[p.category]}</div>
          <h4>${p.name}</h4>
          <p>${p.desc}</p>
          <div class="stats"><span>⏱ ${p.duration}</span><span>☀ ${p.best}</span></div>
        </div>
      </div>
    `).join('') || '<p>No places in this category.</p>';
    bindMediaEditButtons(grid);
  }

  /* ===================== DAY-BY-DAY ITINERARY ===================== */
  function renderItinerary() {
    const { legs } = computeSchedule();
    const withYouLeg = legs.find(l => l.key === 'withYou');
    const totalDays = Math.round((withYouLeg.end - withYouLeg.start) / 86400000);
    const restDays = Math.min(7, totalDays);
    const newPlaces = PLACES.filter(p => !p.visited);

    const container = document.getElementById('itineraryContainer');
    let html = '';
    let placeIdx = 0;
    let dayNum = 1;
    let cursor = new Date(withYouLeg.start);

    for (let i = 0; i < restDays; i++) {
      html += itinDayHTML(dayNum, cursor, 'rest',
        i === 0 ? 'Arrival at your home — welcome dinner, no plans, just family time.' : 'Rest day — recover from travel, walk around the neighbourhood, home-cooked meals.');
      cursor = addDays(cursor, 1); dayNum++;
    }

    let remaining = totalDays - restDays;
    let outingToggle = true;
    while (remaining > 0) {
      if (outingToggle && placeIdx < newPlaces.length) {
        const place = newPlaces[placeIdx++];
        html += itinDayHTML(dayNum, cursor, 'outing', `${place.emoji} Visit <strong>${place.name}</strong> — ${place.desc} (Best time: ${place.best}, ~${place.duration}).`);
      } else if (placeIdx >= newPlaces.length) {
        html += itinDayHTML(dayNum, cursor, 'rest', 'Free day — optional revisit of a favourite spot, shopping, or simply relaxing at home.');
      } else {
        html += itinDayHTML(dayNum, cursor, 'rest', 'Rest day between outings — keep the pace comfortable.');
      }
      outingToggle = !outingToggle;
      cursor = addDays(cursor, 1); dayNum++; remaining--;
    }

    container.innerHTML = html || '<p>Increase the "Paris / Verneuil-en-Halatte" duration in the planner to generate a day plan.</p>';
    container.querySelectorAll('.itin-day').forEach((d, idx) => { if (idx === restDays) d.open = true; });
  }

  function itinDayHTML(dayNum, date, type, text) {
    return `
      <details class="itin-day">
        <summary>Day ${dayNum} · ${fmt(date, { weekday: 'short', day: 'numeric', month: 'short' })}
          <span class="tag ${type}">${type === 'outing' ? 'Outing' : 'Rest'}</span>
        </summary>
        <div class="itin-body">${text}</div>
      </details>
    `;
  }

  /* ===================== GALLERY ===================== */
  let activeGalleryTab = 'new';

  function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    const list = PLACES.filter(p => activeGalleryTab === 'new' ? !p.visited : p.visited);
    grid.innerHTML = list.map(p => {
      const custom = getCustomImageSrc(p.id);
      return `
      <div class="gallery-item" data-id="${p.id}">
        <img src="${custom || p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="emoji-fallback" style="display:none">${p.emoji}</span>
        <button type="button" class="media-edit-btn" data-editid="${p.id}">${custom ? '✎ Edit' : '+ Add Photo'}</button>
        <div class="cap">${p.name}</div>
      </div>
    `;
    }).join('');

    grid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(item.dataset.id));
    });
    bindMediaEditButtons(grid);
  }

  function initGalleryTabs() {
    document.querySelectorAll('.gallery-tabs button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-tabs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeGalleryTab = btn.dataset.tab;
        renderGallery();
      });
    });
  }

  function openLightbox(id) {
    const place = PLACES.find(p => p.id === id);
    if (!place) return;
    document.getElementById('lightboxTitle').textContent = place.name;
    document.getElementById('lightboxDesc').textContent = place.desc;
    const media = document.getElementById('lightboxMedia');
    const custom = getCustomImageSrc(place.id);
    media.innerHTML = `<img src="${custom || place.img}" alt="${place.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <span class="emoji-fallback" style="display:none">${place.emoji}</span>`;
    document.getElementById('lightbox').classList.add('open');
  }

  function initLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', () => {
      document.getElementById('lightbox').classList.remove('open');
    });
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') e.target.classList.remove('open');
    });
  }

  /* ===================== APPROVAL ===================== */
  const APPROVAL_KEY = 'europeTripApproval';
  const PEOPLE = ['You', 'Busrah', 'Brother'];

  function loadApproval() {
    try { return JSON.parse(localStorage.getItem(APPROVAL_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveApproval(data) {
    localStorage.setItem(APPROVAL_KEY, JSON.stringify(data));
  }

  function renderApproval() {
    const data = loadApproval();
    const grid = document.getElementById('approvalGrid');
    grid.innerHTML = PEOPLE.map(person => {
      const rec = data[person] || { stars: 0, approved: false };
      return `
        <div class="approval-card" data-person="${person}">
          <h4>${person}</h4>
          <div class="stars" data-stars="${rec.stars}">
            ${[1,2,3,4,5].map(n => `<span data-n="${n}" class="${n <= rec.stars ? 'filled' : ''}">★</span>`).join('')}
          </div>
          <button class="${rec.approved ? 'approved' : ''}">${rec.approved ? '✓ Approved' : 'Approve Plan'}</button>
          <div class="approval-note">Saved on this device only</div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.approval-card').forEach(card => {
      const person = card.dataset.person;
      card.querySelectorAll('.stars span').forEach(star => {
        star.addEventListener('click', () => {
          const data = loadApproval();
          data[person] = data[person] || { stars: 0, approved: false };
          data[person].stars = parseInt(star.dataset.n, 10);
          saveApproval(data);
          renderApproval();
        });
      });
      card.querySelector('button').addEventListener('click', () => {
        const data = loadApproval();
        data[person] = data[person] || { stars: 0, approved: false };
        data[person].approved = !data[person].approved;
        saveApproval(data);
        renderApproval();
      });
    });

    const approvedCount = PEOPLE.filter(p => (data[p] || {}).approved).length;
    document.getElementById('overallApproval').textContent =
      approvedCount === PEOPLE.length ? '🎉 Everyone has approved the plan!' : `${approvedCount} of ${PEOPLE.length} family members have approved so far.`;
  }

  /* ===================== CUSTOM IMAGES (per-card, one image each) ===================== */
  const CUSTOM_IMAGES_KEY = 'europeTripCustomImages';

  function loadCustomImages() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_IMAGES_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveCustomImages(data) {
    localStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(data));
  }
  function getCustomImageSrc(id) {
    return loadCustomImages()[id] || null;
  }

  /* ===================== IMAGE COMPRESSION HELPER ===================== */
  function compressImage(file, maxDim, quality) {
    maxDim = maxDim || 1000;
    quality = quality || 0.72;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) { height = Math.round(height * maxDim / width); width = maxDim; }
            else { width = Math.round(width * maxDim / height); height = maxDim; }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /* ===================== IMAGE EDIT MODAL (used by Paris Guide + Gallery cards) ===================== */
  let currentEditPlaceId = null;
  let pendingFileSrc = null;

  function setModalMode(mode) {
    document.querySelectorAll('.modal-tabs button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    document.getElementById('imageUrlInput').style.display = mode === 'url' ? 'block' : 'none';
    document.getElementById('imageFileDrop').style.display = mode === 'file' ? 'block' : 'none';
  }

  function openImageEditModal(placeId) {
    const place = PLACES.find(p => p.id === placeId);
    if (!place) return;
    currentEditPlaceId = placeId;
    pendingFileSrc = null;
    const custom = getCustomImageSrc(placeId);
    document.getElementById('imageEditTitle').textContent = `Photo for ${place.name}`;
    document.getElementById('imageUrlInput').value = (custom && !custom.startsWith('data:')) ? custom : '';
    document.getElementById('imageFileInput').value = '';
    document.getElementById('imageEditPreview').innerHTML = custom
      ? `<img src="${custom}" alt="">`
      : `<span class="none">No image set — the ${place.emoji} placeholder is showing.</span>`;
    setModalMode('url');
    document.getElementById('imageEditModal').classList.add('open');
  }

  function closeImageEditModal() {
    document.getElementById('imageEditModal').classList.remove('open');
  }

  function initImageEditModal() {
    document.querySelectorAll('.modal-tabs button').forEach(btn => {
      btn.addEventListener('click', () => setModalMode(btn.dataset.mode));
    });
    document.getElementById('imageFileInput').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      pendingFileSrc = await compressImage(file);
      document.getElementById('imageEditPreview').innerHTML = `<img src="${pendingFileSrc}" alt="">`;
    });
    document.getElementById('imageSaveBtn').addEventListener('click', () => {
      const mode = document.querySelector('.modal-tabs button.active').dataset.mode;
      const src = mode === 'file' ? pendingFileSrc : document.getElementById('imageUrlInput').value.trim();
      if (!src) { alert('Please paste an image URL or choose a photo from your device first.'); return; }
      const data = loadCustomImages();
      data[currentEditPlaceId] = src;
      saveCustomImages(data);
      closeImageEditModal();
      renderPlaceGrid();
      renderGallery();
    });
    document.getElementById('imageRemoveBtn').addEventListener('click', () => {
      const data = loadCustomImages();
      delete data[currentEditPlaceId];
      saveCustomImages(data);
      closeImageEditModal();
      renderPlaceGrid();
      renderGallery();
    });
    document.getElementById('imageEditClose').addEventListener('click', closeImageEditModal);
    document.getElementById('imageEditModal').addEventListener('click', (e) => {
      if (e.target.id === 'imageEditModal') closeImageEditModal();
    });
  }

  /* ===================== SOUVENIRS ===================== */
  const SOUVENIR_KEY = 'europeTripSouvenirs';

  function loadSouvenirs() {
    try { return JSON.parse(localStorage.getItem(SOUVENIR_KEY)) || []; } catch (e) { return []; }
  }
  function saveSouvenirs(list) {
    localStorage.setItem(SOUVENIR_KEY, JSON.stringify(list));
  }
  function uid(prefix) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function renderSouvenirs() {
    const list = loadSouvenirs();
    const grid = document.getElementById('souvenirGrid');
    if (!list.length) {
      grid.innerHTML = '<p class="souvenir-empty">No categories yet — click "+ Add Category" above to start keeping a photo record (e.g. "Eiffel Tower", "Garden").</p>';
      return;
    }

    grid.innerHTML = list.map(cat => `
      <div class="souvenir-category">
        <div class="souvenir-cat-header">
          <h4>${cat.name}</h4>
          <button type="button" class="icon-btn cat-delete" data-cat="${cat.id}" title="Delete category">🗑</button>
        </div>
        <div class="souvenir-photos">
          ${cat.photos.map(p => `
            <div class="souvenir-photo">
              <img src="${p.src}" alt="${p.caption || cat.name}">
              <button type="button" class="photo-delete" data-cat="${cat.id}" data-photo="${p.id}" title="Delete photo">&times;</button>
              ${p.caption ? `<div class="cap">${p.caption}</div>` : ''}
            </div>
          `).join('')}
          <label class="souvenir-add-tile">
            <span>+ Add<br>Photo</span>
            <input type="file" accept="image/*" hidden class="souvenir-file-input" data-cat="${cat.id}">
          </label>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.cat-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('Delete this whole category and its photos?')) return;
        saveSouvenirs(loadSouvenirs().filter(c => c.id !== btn.dataset.cat));
        renderSouvenirs();
      });
    });
    grid.querySelectorAll('.photo-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const data = loadSouvenirs();
        const cat = data.find(c => c.id === btn.dataset.cat);
        if (cat) cat.photos = cat.photos.filter(p => p.id !== btn.dataset.photo);
        saveSouvenirs(data);
        renderSouvenirs();
      });
    });
    grid.querySelectorAll('.souvenir-file-input').forEach(input => {
      input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const src = await compressImage(file);
        const caption = (prompt('Optional caption for this photo (leave blank to skip):', '') || '').trim();
        const data = loadSouvenirs();
        const cat = data.find(c => c.id === input.dataset.cat);
        if (cat) cat.photos.push({ id: uid('p'), src, caption });
        saveSouvenirs(data);
        renderSouvenirs();
      });
    });
  }

  function initSouvenirs() {
    document.getElementById('addCategoryBtn').addEventListener('click', () => {
      const name = (prompt('Category name (e.g. "Eiffel Tower", "Garden"):') || '').trim();
      if (!name) return;
      const data = loadSouvenirs();
      data.push({ id: uid('c'), name, photos: [] });
      saveSouvenirs(data);
      renderSouvenirs();
    });
  }

  /* ===================== BACKUP EXPORT / IMPORT ===================== */
  function exportBackup() {
    const payload = {
      approval: loadApproval(),
      customImages: loadCustomImages(),
      souvenirs: loadSouvenirs(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'abu-europe-trip-backup.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function initBackup() {
    document.getElementById('exportBackupBtn').addEventListener('click', exportBackup);
    document.getElementById('importBackupInput').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const payload = JSON.parse(reader.result);
          if (payload.approval) saveApproval(payload.approval);
          if (payload.customImages) saveCustomImages(payload.customImages);
          if (payload.souvenirs) saveSouvenirs(payload.souvenirs);
          renderApproval();
          renderPlaceGrid();
          renderGallery();
          renderSouvenirs();
          alert('Backup restored successfully.');
        } catch (err) {
          alert('Could not read that backup file — make sure it\'s an export from this page.');
        }
        e.target.value = '';
      };
      reader.readAsText(file);
    });
  }

  /* ===================== FOOTER STATS ===================== */
  function renderFooter() {
    const { legs, calculatedEnd } = computeSchedule();
    const totalDays = Math.round((calculatedEnd - TRIP_START) / 86400000);
    document.getElementById('footerStats').textContent =
      `${totalDays} days across 3 cities (Bonn, Paris/Verneuil-en-Halatte, Stuttgart) · ` +
      `${state.sisterFirst + state.sisterFinal} weeks with Busrah · ${state.withYou} weeks with you · ${BROTHER_WEEKS} week with brother.`;
  }

  /* ===================== NAV ===================== */
  function initNav() {
    document.getElementById('navToggle').addEventListener('click', () => {
      document.getElementById('navLinks').classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
    });
  }

  /* ===================== RENDER ALL ===================== */
  function renderAll() {
    renderPlanner();
    renderTimeline();
    renderCalendar();
    renderItinerary();
    renderFooter();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderRouteStrip();
    initNav();
    initPlanner();
    renderFilterBar();
    renderPlaceGrid();
    initGalleryTabs();
    renderGallery();
    initLightbox();
    initImageEditModal();
    renderApproval();
    initSouvenirs();
    renderSouvenirs();
    initBackup();
    renderAll();

    renderCountdown();
    setInterval(renderCountdown, 1000);
  });
})();
