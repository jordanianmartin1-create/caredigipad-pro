(function injectEnhancementStyles() {
  const st = document.createElement('style');
  st.textContent = `
    .entry-card { border-left: 3.5px solid var(--teal); position: relative; }
    .entry-hdr { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid var(--border); }
    .entry-num { font-size: 0.78rem; font-weight: 800; color: var(--teal); text-transform: uppercase; letter-spacing: 0.3px; }
    .sum-mod-hdr { display: inline-flex; align-items: center; gap: 6px; font-weight: 800; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.4px; color: var(--teal); background: var(--teal-light); padding: 3px 8px; border-radius: 6px; margin-bottom: 4px; cursor: pointer; }
    .task-badge { font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 10px; background: var(--bg); color: var(--text-sub); border: 1px solid var(--border); }
    .task-badge.overdue { background: var(--red); color: #fff; border-color: var(--red); }
  `;
  document.head.appendChild(st);
})();

function getLocaleCode() {
  if (curLang === 'en') return 'en-GB';
  return curLang;
}

function computeTaskDueTs(dueStr, refMs) {
  if (!dueStr) return null;
  const parts = dueStr.split(':').map(Number);
  if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
  const base = refMs ? new Date(refMs) : new Date();
  const dt = new Date(base.getFullYear(), base.getMonth(), base.getDate(), parts[0], parts[1], 0, 0);
  if (dt.getTime() < base.getTime() - 60 * 60 * 1000) {
    dt.setDate(dt.getDate() + 1);
  }
  return dt.getTime();
}

function isTaskOverdue(r) {
  if (!r || r.done || !r.due) return false;
  if (!r.dueTs) {
    r.dueTs = computeTaskDueTs(r.due, r.createdTs || Date.now());
  }
  return r.dueTs ? Date.now() >= r.dueTs : false;
}

function hasOverdueTask(b) {
  if (!isPro) return false;
  const p = getPt(b);
  return p.reminders.some(r => isTaskOverdue(r));
}

function startAlertTimer() {
  if (alertTimerId) clearInterval(alertTimerId);
  alertTimerId = setInterval(() => {
    if (!isPro) return;
    let triggered = false;
    alloc.forEach(b => {
      const p = getPt(b);
      p.reminders.forEach(r => {
        if (!r.done && !r.alerted && isTaskOverdue(r)) {
          r.alerted = true;
          triggered = true;
        }
      });
    });
    if (triggered) {
      saveDB();
      playAlarmBeep();
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      renderUI();
    }
  }, 20000);
}

function getPt(b) {
  if (!db[b]) db[b] = {};
  const p = db[b];
  if (!Array.isArray(p.obs)) p.obs = [];
  if (!Array.isArray(p.bm)) p.bm = [];
  if (!Array.isArray(p.bp)) p.bp = [];
  const hrs = getShiftHours();
  if (!Array.isArray(p.fluids) || p.fluids.length !== 12) {
    const old = Array.isArray(p.fluids) ? p.fluids : [];
    p.fluids = hrs.map((h, idx) => {
      const ex = old[idx] || {};
      return {
        t: h,
        i: Number(ex.i) || 0,
        o: Number(ex.o) || 0,
        src: ex.src || '',
        wet: Number(ex.wet) || 0,
        done: !!ex.done
      };
    });
  } else {
    p.fluids.forEach((f, idx) => { f.t = hrs[idx]; });
  }
  if (!Array.isArray(p.bowel)) p.bowel = [];
  if (!p.skin || typeof p.skin !== 'object') p.skin = { sacrum: '', groin: '', heels: '', elbows: '' };
  if (!Array.isArray(p.skinCustom)) p.skinCustom = [];
  if (!Array.isArray(p.skinCare)) p.skinCare = [];
  if (typeof p.skinDone !== 'boolean') p.skinDone = false;
  if (!Array.isArray(p.dressings)) p.dressings = [];
  if (!p.diet || typeof p.diet !== 'object') p.diet = { b: '', l: '', d: '', supp: '', supps: [], flags: [], done: false };
  if (!Array.isArray(p.diet.supps)) p.diet.supps = [];
  if (!Array.isArray(p.diet.flags)) p.diet.flags = [];
  if (typeof p.turnFreq !== 'string') p.turnFreq = '';
  if (typeof p.turnPlanDone !== 'boolean') p.turnPlanDone = false;
  if (!Array.isArray(p.turns)) p.turns = [];
  if (!Array.isArray(p.turnChecks)) p.turnChecks = [];
  if (typeof p.mhLevel !== 'string') p.mhLevel = '';
  if (!Array.isArray(p.mh)) p.mh = [];
  if (!Array.isArray(p.events)) p.events = [];
  if (!Array.isArray(p.reminders)) p.reminders = [];
  if (!p.admit || typeof p.admit !== 'object') p.admit = { w: '', h: '', wb: false, list: [], other: '', loc: '', items: {}, done: false };
  if (!Array.isArray(p.admit.list)) {
    p.admit.list = [];
    if (p.admit.items && typeof p.admit.items === 'object') {
      Object.keys(p.admit.items).forEach(k => {
        const idx = parseInt(k.replace('std_', ''));
        if (!isNaN(idx) && !p.admit.list.includes(idx)) p.admit.list.push(idx);
        if (!p.admit.loc && p.admit.items[k]) p.admit.loc = p.admit.items[k];
      });
    }
  }
  if (typeof p.admit.other !== 'string') p.admit.other = '';
  if (typeof p.admit.loc !== 'string') p.admit.loc = '';
  return p;
}

function isObsFilled(o) {
  if (!o) return false;
  const hasVal = v => v !== undefined && v !== null && String(v).trim() !== '' && String(v).trim() !== '-';
  return hasVal(o.rr) || hasVal(o.sp) || hasVal(o.o2) || hasVal(o.sys) || hasVal(o.dia) || (hasVal(o.bp) && o.bp !== '-/-') || hasVal(o.hr) || hasVal(o.tm) || (o.aIdx !== null && o.aIdx !== undefined && o.aIdx !== '') || hasVal(o.pn);
}

function modEntryCount(b, modId) {
  const p = getPt(b);
  switch (modId) {
    case 'obs': return p.obs.filter(isObsFilled).length;
    case 'bm': return p.bm.filter(x => x.v && String(x.v).trim() !== '').length;
    case 'bp': return p.bp.filter(x => x.lSys || x.lDia || x.sSys || x.sDia || (x.l && x.l !== '-') || (x.s && x.s !== '-')).length;
    case 'fluid': return p.fluids.reduce((acc, f) => acc + ((f.i > 0 || f.o > 0 || f.wet > 0) ? 1 : 0), 0);
    case 'bowel': return p.bowel.filter(x => !!x.a).length;
    case 'amy': return Object.values(p.skin).filter(Boolean).length + p.skinCustom.filter(c => c.site && c.cond).length + p.dressings.filter(d => d.l && d.l.trim() !== '').length;
    case 'food': return [p.diet.b, p.diet.l, p.diet.d].filter(Boolean).length + p.diet.supps.length + (p.diet.supp ? 1 : 0);
    case 'turn': return p.turns.filter(tr => !!tr.p).length + (p.turnFreq ? 1 : 0);
    case 'mh': return p.mh.filter(m => m.m || m.r || m.rat || m.n).length;
    case 'events': return p.events.filter(e => (e.e && e.e.trim() !== '') || typeof e.pIdx === 'number').length;
    case 'reminders': return p.reminders.filter(r => !r.done && ((r.txt && r.txt.trim() !== '') || typeof r.tIdx === 'number')).length;
    case 'admit': return (p.admit.w || p.admit.h || p.admit.wb || p.admit.list.length > 0 || (p.admit.other && p.admit.other.trim() !== '')) ? 1 : 0;
    default: return 0;
  }
}

function commitPendingForm() {
  saveDB();
}

function refreshSubNavCounts() {
  const subNav = document.getElementById('subNav');
  const bedTabs = document.getElementById('bedTabs');
  if (!subNav || showSummary) return;
  const activeSecs = getActiveSections();
  subNav.innerHTML = activeSecs.map(s => {
    const cnt = modEntryCount(curBed, s.id);
    const badge = cnt > 0 ? `<span class="mod-count">${cnt}</span>` : '';
    const alertDot = (s.id === 'reminders' && hasOverdueTask(curBed)) ? `<span class="alert-dot"></span>` : '';
    return `<button type="button" class="tab-btn ${curSec === s.id ? 'active-sec' : ''}" onclick="selectSec('${s.id}')">${esc(t(s.id))}${badge}${alertDot}</button>`;
  }).join('');
  if (bedTabs) {
    let bedHtml = `<button type="button" class="tab-btn ${showSummary ? 'active-summary' : ''}" onclick="toggleSummary(true)">${esc(t('summary'))}</button>`;
    alloc.forEach((b, bIdx) => {
      const isAct = !showSummary && curBed === b;
      const alertDot = hasOverdueTask(b) ? `<span class="alert-dot"></span>` : '';
      bedHtml += `<button type="button" class="tab-btn ${isAct ? 'active-bed' : ''}" onclick="selectBedIdx(${bIdx})">${esc(b)}${alertDot}</button>`;
    });
    bedHtml += `<button type="button" class="tab-btn-add" onclick="toggleQuickAddBed()">+</button>`;
    bedTabs.innerHTML = bedHtml;
  }
}

function autoJumpBp(val, nextId) {
  const s = String(val || '').trim();
  const n = Number(s);
  if (s.length >= 3 || (s.length === 2 && n >= 60 && n <= 99)) {
    const nextEl = document.getElementById(nextId);
    if (nextEl) {
      nextEl.focus();
      if (nextEl.select) nextEl.select();
    }
  }
}

function splitBpParts(entry, sysKey, diaKey, legacyKey) {
  let sys = entry[sysKey] !== undefined ? entry[sysKey] : '';
  let dia = entry[diaKey] !== undefined ? entry[diaKey] : '';
  if (!sys && !dia && entry[legacyKey] && entry[legacyKey] !== '-') {
    const parts = String(entry[legacyKey]).split('/');
    sys = (parts[0] && parts[0] !== '-') ? parts[0] : '';
    dia = (parts[1] && parts[1] !== '-') ? parts[1] : '';
  }
  return [sys, dia];
}

function renderSection() {
  const area = document.getElementById('contentArea');
  if (!curBed || !area) return;
  const p = getPt(curBed);

  let topHtml = `<div class="bed-bar">
    <div style="font-weight:800; font-size:1.1rem; color:var(--teal);">${esc(curBed)} — ${esc(t(curSec))}</div>
    <button type="button" class="btn-subtle btn-sm" onclick="toggleManageBed()">⚙ ${esc(t('manageBed'))}</button>
  </div>`;

  if (showQuickAddBed) {
    const unalloc = wardBeds.map((b, idx) => ({ b, idx })).filter(x => !alloc.includes(x.b));
    topHtml += `<div class="manage-panel">
      <div style="font-weight:800; margin-bottom:8px;">${esc(t('quickAddBedTitle'))}</div>
      <div style="display:flex; gap:8px; margin-bottom:8px;">
        <input type="text" id="quickBedInput" maxlength="4" style="text-transform:uppercase;">
        <button type="button" class="btn btn-primary btn-sm" onclick="quickAddBedToShift()">${esc(t('add'))}</button>
      </div>
      ${unalloc.length > 0 ? `<div style="font-size:0.78rem; color:var(--text-sub); margin-bottom:6px;">${esc(t('savedWardBeds'))}</div>
      <div class="chip-row">${unalloc.map(x => `<span class="chip" onclick="quickAddBedByIdx(${x.idx})">+ ${esc(x.b)}</span>`).join('')}</div>` : ''}
    </div>`;
  }

  if (showManageBed) {
    topHtml += `<div class="manage-panel">
      <div style="font-weight:800; margin-bottom:8px;">${esc(t('manageBed'))}: ${esc(curBed)}</div>
      <div style="display:flex; gap:8px; margin-bottom:8px;">
        <input type="text" id="renameBedInput" maxlength="4" value="${esc(curBed)}" style="text-transform:uppercase;">
        <button type="button" class="btn btn-primary btn-sm" onclick="renameCurrentBed()">${esc(t('renameBed'))}</button>
      </div>
      <div class="manage-grid">
        <button type="button" class="btn btn-subtle btn-sm" onclick="transferCurrentBed()">⇄ ${esc(t('transferBed'))}</button>
        <button type="button" class="btn btn-subtle btn-sm" onclick="clearCurrentBed()">🧹 ${esc(t('clearBed'))}</button>
        <button type="button" class="btn btn-danger btn-sm" style="grid-column:1/-1;" onclick="removeCurrentBedFromShift()">✕ ${esc(t('removeBed'))}</button>
        ${isPro && activeLayoutName ? `<button type="button" class="btn btn-primary btn-sm" style="grid-column:1/-1;" onclick="updateActiveLayoutFromShift()">💾 ${esc(t('updLayout'))} "${esc(activeLayoutName)}"</button>` : ''}
      </div>
    </div>`;
  }

  let bodyHtml = '';

  if (curSec === 'obs') {
    const acvpuList = getLangList('acvpu');
    bodyHtml = p.obs.map((o, i) => {
      const [sysVal, diaVal] = splitBpParts(o, 'sys', 'dia', 'bp');
      const o2Val = (o.o2 && o.o2 !== '-') ? o.o2 : '';
      const rrVal = (o.rr && o.rr !== '-') ? o.rr : '';
      const spVal = (o.sp && o.sp !== '-') ? o.sp : '';
      const hrVal = (o.hr && o.hr !== '-') ? o.hr : '';
      const tmVal = (o.tm && o.tm !== '-') ? o.tm : '';
      const pnVal = (o.pn !== undefined && o.pn !== null && o.pn !== '-') ? o.pn : '';
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num">${esc(t('obs'))} #${i + 1}</span>
          <button type="button" class="del-btn" onclick="delItem('obs', ${i})">✕</button>
        </div>
        <div class="row">
          <div><label>${esc(t('time'))}</label><input type="time" value="${esc(o.t || '')}" oninput="updObsField(${i}, 't', this.value)"></div>
          <div><label>${esc(t('rrLbl'))}</label><input type="number" inputmode="numeric" value="${esc(rrVal)}" oninput="updObsField(${i}, 'rr', this.value)"></div>
        </div>
        <div class="row">
          <div><label>${esc(t('spo2Lbl'))}</label><input type="number" inputmode="numeric" value="${esc(spVal)}" oninput="updObsField(${i}, 'sp', this.value)"></div>
          <div>
            <label>${esc(t('o2Lbl'))}</label>
            <select onchange="updObsField(${i}, 'o2', this.value)">
              <option value="" ${!o2Val ? 'selected' : ''}>—</option>
              <option value="air" ${o2Val === 'air' || o2Val === t('air') ? 'selected' : ''}>${esc(t('air'))}</option>
              <option value="o2" ${o2Val === 'o2' ? 'selected' : ''}>${esc(getOxygenLabel())}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div>
            <label>${esc(t('bpLbl'))}</label>
            <div class="bp-pair">
              <input type="number" id="obsSys_${i}" inputmode="numeric" value="${esc(sysVal)}" oninput="updObsBp(${i}, 'sys', this.value); autoJumpBp(this.value, 'obsDia_${i}')">
              <span>/</span>
              <input type="number" id="obsDia_${i}" inputmode="numeric" value="${esc(diaVal)}" oninput="updObsBp(${i}, 'dia', this.value)">
            </div>
          </div>
          <div><label>${esc(t('hrLbl'))}</label><input type="number" inputmode="numeric" value="${esc(hrVal)}" oninput="updObsField(${i}, 'hr', this.value)"></div>
        </div>
        <div class="row">
          <div><label>${esc(t('tempLbl'))} (${esc(o.u || tempUnit)})</label><input type="number" step="0.1" inputmode="decimal" value="${esc(tmVal)}" oninput="updObsField(${i}, 'tm', this.value)"></div>
          <div>
            <label>${esc(t('acvpuLbl'))}</label>
            <select onchange="updObsField(${i}, 'aIdx', this.value === '' ? null : parseInt(this.value))">
              <option value="" ${o.aIdx === null || o.aIdx === undefined || o.aIdx === '' ? 'selected' : ''}>—</option>
              ${acvpuList.map((v, idx) => `<option value="${idx}" ${o.aIdx === idx ? 'selected' : ''}>${esc(v)}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="row" style="margin-bottom:0;">
          <div><label>${esc(t('painLbl'))}</label><input type="number" min="0" max="10" inputmode="numeric" value="${esc(pnVal)}" oninput="updObsField(${i}, 'pn', this.value)"></div>
        </div>
      </div>`;
    }).join('') + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createObsEntry()">${esc(t('add'))} ${esc(t('obs'))}</button>`;
  }

  else if (curSec === 'bm') {
    const ctxOpts = ['bmPreB','bmPostB','bmPreL','bmPostL','bmPreD','bmPostD','bmBed','bmNight','bmRandom','bmRepeat'];
    bodyHtml = p.bm.map((b, i) => {
      const flags = Array.isArray(b.f) ? b.f : [];
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num">${esc(t('bm'))} #${i + 1}</span>
          <button type="button" class="del-btn" onclick="delItem('bm', ${i})">✕</button>
        </div>
        <div class="row">
          <div><label>${esc(t('time'))}</label><input type="time" value="${esc(b.t || '')}" oninput="updBmField(${i}, 't', this.value)"></div>
          <div><label>${esc(t('bmValLbl'))} (${esc(b.u || bmUnit)})</label><input type="number" step="0.1" inputmode="decimal" value="${esc(b.v || '')}" oninput="updBmField(${i}, 'v', this.value)"></div>
        </div>
        <div style="margin-bottom:10px;">
          <label>${esc(t('context'))}</label>
          <select onchange="updBmField(${i}, 'c', this.value)">
            <option value="" ${!b.c ? 'selected' : ''}>—</option>
            ${ctxOpts.map(k => `<option value="${k}" ${b.c === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}
          </select>
        </div>
        <div class="chip-row" style="margin-bottom:0;">
          <span class="chip ${flags.includes('hypoTreated') ? 'active-red' : ''}" onclick="toggleBmFlag(${i}, 'hypoTreated')">${esc(t('hypoTreated'))}</span>
          <span class="chip ${flags.includes('ketones') ? 'active-amber' : ''}" onclick="toggleBmFlag(${i}, 'ketones')">${esc(t('ketones'))}</span>
          <span class="chip ${flags.includes('escRn') ? 'active' : ''}" onclick="toggleBmFlag(${i}, 'escRn')">${esc(t('escRn'))}</span>
        </div>
      </div>`;
    }).join('') + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createBmEntry()">${esc(t('add'))} ${esc(t('bm'))}</button>`;
  }

  else if (curSec === 'bp') {
    bodyHtml = p.bp.map((x, i) => {
      const [lSys, lDia] = splitBpParts(x, 'lSys', 'lDia', 'l');
      const [sSys, sDia] = splitBpParts(x, 'sSys', 'sDia', 's');
      const syms = Array.isArray(x.sym) ? x.sym : [];
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num">${esc(t('bp'))} #${i + 1}</span>
          <button type="button" class="del-btn" onclick="delItem('bp', ${i})">✕</button>
        </div>
        <div class="row">
          <div><label>${esc(t('time'))}</label><input type="time" value="${esc(x.t || '')}" oninput="updBpField(${i}, 't', this.value)"></div>
        </div>
        <div class="row">
          <div>
            <label>${esc(t('lying'))} BP (Sys / Dia)</label>
            <div class="bp-pair">
              <input type="number" id="bpLSys_${i}" inputmode="numeric" value="${esc(lSys)}" oninput="updBpPair(${i}, 'l', 'Sys', this.value); autoJumpBp(this.value, 'bpLDia_${i}')">
              <span>/</span>
              <input type="number" id="bpLDia_${i}" inputmode="numeric" value="${esc(lDia)}" oninput="updBpPair(${i}, 'l', 'Dia', this.value)">
            </div>
          </div>
        </div>
        <div class="row">
          <div>
            <label>${esc(t('standing'))} BP (Sys / Dia)</label>
            <div class="bp-pair">
              <input type="number" id="bpSSys_${i}" inputmode="numeric" value="${esc(sSys)}" oninput="updBpPair(${i}, 's', 'Sys', this.value); autoJumpBp(this.value, 'bpSDia_${i}')">
              <span>/</span>
              <input type="number" id="bpSDia_${i}" inputmode="numeric" value="${esc(sDia)}" oninput="updBpPair(${i}, 's', 'Dia', this.value)">
            </div>
          </div>
        </div>
        <div class="chip-row" style="margin-bottom:0;">
          <span class="chip ${syms.includes('noSym') ? 'active' : ''}" onclick="toggleBpSym(${i}, 'noSym')">${esc(t('noSym'))}</span>
          <span class="chip ${syms.includes('dizzy') ? 'active-amber' : ''}" onclick="toggleBpSym(${i}, 'dizzy')">${esc(t('dizzy'))}</span>
          <span class="chip ${syms.includes('unableStand') ? 'active-red' : ''}" onclick="toggleBpSym(${i}, 'unableStand')">${esc(t('unableStand'))}</span>
        </div>
      </div>`;
    }).join('') + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createBpEntry()">${esc(t('add'))} ${esc(t('bp'))}</button>`;
  }

  else if (curSec === 'fluid') {
    if (activeFluidIdx >= p.fluids.length) activeFluidIdx = 0;
    let totI = 0, totO = 0;
    p.fluids.forEach(f => { totI += (Number(f.i) || 0); totO += (Number(f.o) || 0); });
    const net = totI - totO;
    const actHr = p.fluids[activeFluidIdx] ? p.fluids[activeFluidIdx].t : '';

    bodyHtml = `<div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.82rem; font-weight:700; color:var(--text-sub); flex-wrap:wrap; gap:4px;">
        <span id="flHdrStatus">${esc(t('time'))}: <strong style="color:var(--teal);">${esc(actHr)}</strong> (${esc(activeFluidType === 'i' ? t('flIn') : t('flOut'))})</span>
        <span id="flHdrTotal"><strong>${esc(t('flTotal'))}:</strong> ${esc(t('flIn'))} <b>${totI}ml</b> | ${esc(t('flOut'))} <b>${totO}ml</b> | <b>${net > 0 ? '+' + net : net}ml</b></span>
      </div>
      <div class="fluid-btn-grid" style="margin-bottom:8px;">
        ${[50, 100, 150, 200, 250, 500].map(v => `<button type="button" class="quick-fluid-btn ${activeFluidType === 'o' ? 'out-mode' : ''}" onclick="addQuickFluid(${v})">+${v}ml ${esc(activeFluidType === 'i' ? t('flIn') : t('flOut'))}</button>`).join('')}
      </div>
      <div class="chip-row" id="flSrcChips" style="margin-bottom:8px;">
        ${['srcPu','srcCath','srcBowel','srcVomit'].map(sc => {
          const curSrc = p.fluids[activeFluidIdx] ? p.fluids[activeFluidIdx].src : '';
          return `<span class="chip ${curSrc === sc ? 'active-amber' : ''}" data-src="${sc}" onclick="setFluidSource('${sc}')">${esc(t(sc))}</span>`;
        }).join('')}
        <span class="chip" onclick="addWetPad()">+1 ${esc(t('wetPad'))}</span>
      </div>
      <div style="display:flex; gap:6px; padding:4px 0; font-size:0.74rem; font-weight:700; color:var(--text-sub); border-bottom:1.5px solid var(--border);">
        <div style="flex:0 0 50px; text-align:center;">${esc(t('time'))}</div>
        <div style="flex:1;">${esc(t('flIn'))} (ml)</div>
        <div style="flex:1;">${esc(t('flOut'))} (ml)</div>
        <div style="flex:0 0 42px;"></div>
      </div>
      <div id="fluidRows">
        ${p.fluids.map((f, idx) => `<div class="hour-row">
          <div id="flHr_${idx}" class="hour-badge" style="${activeFluidIdx === idx ? 'color:var(--teal);' : ''}">${esc(f.t)}</div>
          <div style="flex:1; min-width:0;">
            <input id="flIn_${idx}" type="number" inputmode="numeric" class="${activeFluidIdx === idx && activeFluidType === 'i' ? 'fl-target-in' : ''}" value="${f.i || ''}" onfocus="setFluidTarget(${idx}, 'i')" oninput="updFluid(${idx}, 'i', this.value)">
          </div>
          <div style="flex:1; min-width:0;">
            <input id="flOut_${idx}" type="number" inputmode="numeric" class="${activeFluidIdx === idx && activeFluidType === 'o' ? 'fl-target-out' : ''}" value="${f.o || ''}" onfocus="setFluidTarget(${idx}, 'o')" oninput="updFluid(${idx}, 'o', this.value)">
            ${(f.src || f.wet) ? `<div style="font-size:0.7rem; color:var(--amber); font-weight:700; margin-top:2px; display:flex; align-items:center; gap:4px; flex-wrap:wrap;">
              ${f.src ? `<span>${esc(trCode(f.src))}</span>` : ''}
              ${f.wet ? `<span onclick="decWetPad(${idx})" style="cursor:pointer; text-decoration:underline;">${esc(t('wetPad'))} x${f.wet} (✕)</span>` : ''}
            </div>` : ''}
          </div>
          <div style="flex:0 0 42px; text-align:right;">
            <button type="button" class="btn-subtle btn-sm" style="padding:6px 8px; font-size:0.74rem;" onclick="clrFluidRow(${idx})">✕</button>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  }

  else if (curSec === 'bowel') {
    const amtOpts = ['bno','small','medium','large','smear'];
    const typeOpts = ['type1','type2','type3','type4','type5','type6','type7'];
    const methOpts = ['mToilet','mCommode','mBedpan','mPad'];
    bodyHtml = p.bowel.map((b, i) => `<div class="card entry-card">
      <div class="entry-hdr">
        <span class="entry-num">${esc(t('bowel'))} #${i + 1}</span>
        <button type="button" class="del-btn" onclick="delItem('bowel', ${i})">✕</button>
      </div>
      <div class="row">
        <div><label>${esc(t('time'))}</label><input type="time" value="${esc(b.t || '')}" oninput="updBowelField(${i}, 't', this.value)"></div>
        <div>
          <label>${esc(t('amt'))}</label>
          <select onchange="updBowelField(${i}, 'a', this.value, true)">
            <option value="" ${!b.a ? 'selected' : ''}>—</option>
            ${amtOpts.map(k => `<option value="${k}" ${b.a === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      ${b.a !== 'bno' ? `<div class="row">
        <div>
          <label>${esc(t('type'))}</label>
          <select onchange="updBowelField(${i}, 'ty', this.value)">
            <option value="" ${!b.ty ? 'selected' : ''}>—</option>
            ${typeOpts.map(k => `<option value="${k}" ${b.ty === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="row" style="margin-bottom:0;">
        <div>
          <label>${esc(t('method'))}</label>
          <select onchange="updBowelField(${i}, 'm', this.value)">
            <option value="" ${!b.m ? 'selected' : ''}>—</option>
            ${methOpts.map(k => `<option value="${k}" ${b.m === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>` : ''}
    </div>`).join('') + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createBowelEntry()">${esc(t('add'))} ${esc(t('bowel'))}</button>`;
  }

  else if (curSec === 'amy') {
    const skinStates = ['', 'intact', 'blanching', 'nonBlanch', 'moisture', 'broken', 'tear', 'drySkin'];
    const coreSites = ['sacrum', 'groin', 'heels', 'elbows'];
    const extraSites = ['siteHip','siteAnkle','siteShin','siteFoot','siteArm','siteSpine','siteShoulder','siteEar','siteOther'];
    const sides = ['', 'sideL', 'sideR', 'sideBoth'];
    const drSites = getLangList('drSites');

    const skinCardHtml = `<div class="card">
      <h3><span>${esc(t('amy'))}</span><button type="button" class="btn btn-primary btn-sm" onclick="markAllSkinIntact()">✓ ${esc(t('markIntact'))}</button></h3>
      <div class="row" style="flex-wrap:wrap;">
        ${coreSites.map(site => `<div style="flex:1 1 45%; margin-bottom:8px;">
          <label>${esc(t(site))}</label>
          <select onchange="updSkin('${site}', this.value)">
            ${skinStates.map(st => `<option value="${st}" ${p.skin[site] === st ? 'selected' : ''}>${st ? esc(t(st)) : '—'}</option>`).join('')}
          </select>
        </div>`).join('')}
      </div>
      ${p.skinCustom.map((c, idx) => `<div style="padding:10px; background:var(--bg); border-radius:8px; border:1px solid var(--border); margin-bottom:8px;">
        <div class="row" style="margin-bottom:6px;">
          <div>
            <label>${esc(t('locNotes'))}</label>
            <select onchange="updCustomSkinField(${idx}, 'site', this.value)">
              <option value="" ${!c.site ? 'selected' : ''}>—</option>
              ${extraSites.map(s => `<option value="${s}" ${c.site === s ? 'selected' : ''}>${esc(t(s))}</option>`).join('')}
            </select>
          </div>
          <div>
            <label>Side</label>
            <select onchange="updCustomSkinField(${idx}, 'side', this.value)">
              ${sides.map(s => `<option value="${s}" ${c.side === s ? 'selected' : ''}>${s ? esc(t(s)) : '—'}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="row" style="margin-bottom:0;">
          <div>
            <label>Status</label>
            <select onchange="updCustomSkinField(${idx}, 'cond', this.value)">
              <option value="" ${!c.cond ? 'selected' : ''}>—</option>
              ${skinStates.filter(Boolean).map(s => `<option value="${s}" ${c.cond === s ? 'selected' : ''}>${esc(t(s))}</option>`).join('')}
            </select>
          </div>
          <div style="flex:0 0 auto;"><button type="button" class="btn btn-danger btn-sm" onclick="delCustomSkin(${idx})">✕</button></div>
        </div>
      </div>`).join('')}
      <button type="button" class="btn btn-subtle btn-sm" style="margin-bottom:10px;" onclick="createCustomSkin()">${esc(t('addSite'))}</button>
      <div class="chip-row" style="margin-bottom:0;">
        ${['cBarrier','cOffload','cBoots'].map(ck => `<span class="chip ${p.skinCare.includes(ck) ? 'active' : ''}" onclick="toggleSkinCare('${ck}')">${esc(t(ck))}</span>`).join('')}
      </div>
    </div>`;

    const drCardsHtml = p.dressings.map((d, i) => `<div class="card entry-card">
      <div class="entry-hdr">
        <span class="entry-num">${esc(t('dressing'))} #${i + 1}</span>
        <button type="button" class="del-btn" onclick="delDressing(${i})">✕</button>
      </div>
      <div class="chip-row">
        ${drSites.map((ds, sIdx) => `<span class="chip ${d.l === ds ? 'active' : ''}" onclick="setDrCardSite(${i}, ${sIdx})">${esc(ds)}</span>`).join('')}
      </div>
      <div class="row">
        <div><label>${esc(t('locNotes'))}</label><input type="text" id="drLoc_${i}" value="${esc(d.l || '')}" oninput="updDressingField(${i}, 'l', this.value)"></div>
        <div>
          <label>${esc(t('dueIn'))}</label>
          <select onchange="updDressingField(${i}, 'f', this.value ? parseInt(this.value) : 0, true)">
            <option value="" ${!d.f ? 'selected' : ''}>—</option>
            <option value="1" ${d.f === 1 ? 'selected' : ''}>${esc(t('day1'))}</option>
            <option value="2" ${d.f === 2 ? 'selected' : ''}>${esc(t('day2'))}</option>
            <option value="3" ${d.f === 3 ? 'selected' : ''}>${esc(t('day3'))}</option>
            <option value="5" ${d.f === 5 ? 'selected' : ''}>${esc(t('day5'))}</option>
            <option value="7" ${d.f === 7 ? 'selected' : ''}>${esc(t('day7'))}</option>
          </select>
        </div>
      </div>
      <div class="chip-row">
        ${['drIntact','drChanged','drLeak','drLift'].map(st => `<span class="chip ${d.st === st ? 'active' : ''}" onclick="toggleDressingStatus(${i}, '${st}')">${esc(t(st))}</span>`).join('')}
      </div>
      <div class="row" style="margin-bottom:0; align-items:center;">
        <div>
          <label>${esc(t('date'))}</label>
          <input type="date" value="${esc(d.dt || todayIsoStr())}" onchange="updDressingField(${i}, 'dt', this.value, true)">
        </div>
        <div style="font-size:0.84rem; padding-top:14px;">
          ${d.f ? `<strong>${esc(t('due'))}:</strong> <b style="color:var(--teal);">${esc(calcDue(d.dt || todayIsoStr(), d.f))}</b>` : ''}
        </div>
      </div>
    </div>`).join('');

    bodyHtml = skinCardHtml + drCardsHtml + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createDressingEntry()">${esc(t('add'))} ${esc(t('dressing'))}</button>`;
  }

  else if (curSec === 'food') {
    const mealOpts = ['100%', '75%', '50%', '25%', 'refused', 'nbm'];
    const meals = [['b', t('b')], ['l', t('l')], ['d', t('d')]];
    bodyHtml = `<div class="card">
      ${meals.map(([k, lbl]) => `<label>${esc(lbl)}</label>
      <div class="diet-grid">
        ${mealOpts.map(opt => {
          const disp = (opt === 'refused' || opt === 'nbm') ? t(opt) : opt;
          return `<button type="button" class="diet-btn ${p.diet[k] === opt ? 'selected' : ''}" onclick="setMeal('${k}', '${opt}')">${esc(disp)}</button>`;
        }).join('')}
      </div>`).join('')}
      <label>${esc(t('supp'))}</label>
      <div class="chip-row">
        <span class="chip" onclick="quickLogSupp('taken')">+ ${esc(t('taken'))}</span>
        <span class="chip" onclick="quickLogSupp('refused')">+ ${esc(t('refused'))}</span>
      </div>
      <div style="display:flex; gap:8px; margin-bottom:10px;">
        <input type="text" id="suppInput" value="${esc(p.diet.supp || '')}" oninput="updSuppText(this.value)">
        <button type="button" class="btn btn-primary btn-sm" onclick="addCustomSupp()">${esc(t('add'))}</button>
      </div>
      ${p.diet.supps.map((s, idx) => `<div style="display:flex; justify-content:space-between; align-items:center; padding:6px 10px; background:var(--bg); border-radius:6px; margin-bottom:6px; font-size:0.86rem;">
        <span><strong>${esc(s.t)}</strong> — ${esc(trCode(s.v))}</span>
        <button type="button" class="del-btn" onclick="delSupp(${idx})">✕</button>
      </div>`).join('')}
      <div class="chip-row" style="margin-top:8px; margin-bottom:0;">
        ${['dIndep','dAssist','dPrompt','dThick'].map(fl => `<span class="chip ${p.diet.flags.includes(fl) ? 'active' : ''}" onclick="toggleDietFlag('${fl}')">${esc(t(fl))}</span>`).join('')}
      </div>
    </div>`;
  }

  else if (curSec === 'turn') {
    const tfOpts = ['', 'tf2h', 'tf3h', 'tf4h', 'tfComfort', 'tfIndep'];
    const posOpts = ['back', 'left', 'right', 'chair', 'walking'];
    const planCard = `<div class="card">
      <div style="margin-bottom:10px;">
        <label>${esc(t('turnFreqLbl'))}</label>
        <select onchange="setTurnFreq(this.value)">
          ${tfOpts.map(k => `<option value="${k}" ${p.turnFreq === k ? 'selected' : ''}>${k ? esc(t(k)) : '—'}</option>`).join('')}
        </select>
      </div>
      <div class="chip-row" style="margin-bottom:0;">
        ${['tBell','tRails','tMattress'].map(ck => `<span class="chip ${p.turnChecks.includes(ck) ? 'active' : ''}" onclick="toggleTurnCheck('${ck}')">${esc(t(ck))}</span>`).join('')}
      </div>
    </div>`;

    const listHtml = p.turns.map((tr, i) => `<div class="card entry-card">
      <div class="entry-hdr">
        <span class="entry-num">${esc(t('turn'))} #${i + 1}</span>
        <button type="button" class="del-btn" onclick="delItem('turns', ${i})">✕</button>
      </div>
      <div class="row" style="margin-bottom:0;">
        <div><label>${esc(t('time'))}</label><input type="time" value="${esc(tr.t || '')}" oninput="updTurnField(${i}, 't', this.value)"></div>
        <div>
          <label>${esc(t('posLbl'))}</label>
          <select onchange="updTurnField(${i}, 'p', this.value)">
            <option value="" ${!tr.p ? 'selected' : ''}>—</option>
            ${posOpts.map(k => `<option value="${k}" ${tr.p === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>`).join('');

    bodyHtml = planCard + listHtml + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createTurnEntry()">${esc(t('turnNow'))}</button>`;
  }

  else if (curSec === 'mh') {
    const lvlOpts = ['', 'lvl1', 'lvl2', 'lvl3', 'lvl4'];
    const moodOpts = ['calm', 'anxious', 'agitated', 'low', 'confused', 'vocal', 'elevated', 'hostile'];
    const locOpts = ['asleep', 'settled', 'mhChair', 'restless', 'mhBath', 'mhCommunal', 'mhVisit', 'outOfBed'];
    const ratOpts = ['mhRatRoutine', 'mhRatEngage', 'mhRatDeesc', 'mhRatReorient', 'mhRatEnv', 'mhRatFluids', 'mhRatPrn', 'mhRatEsc'];

    const lvlCard = `<div class="card">
      <label>${esc(t('obsLevel'))}</label>
      <select onchange="setMhLevel(this.value)">
        ${lvlOpts.map(k => `<option value="${k}" ${p.mhLevel === k ? 'selected' : ''}>${k ? esc(t(k)) : '—'}</option>`).join('')}
      </select>
    </div>`;

    const listHtml = p.mh.map((m, i) => `<div class="card entry-card">
      <div class="entry-hdr">
        <span class="entry-num">${esc(t('mh'))} #${i + 1}</span>
        <button type="button" class="del-btn" onclick="delItem('mh', ${i})">✕</button>
      </div>
      <div class="row">
        <div><label>${esc(t('time'))}</label><input type="time" value="${esc(m.t || '')}" oninput="updMhField(${i}, 't', this.value)"></div>
        <div>
          <label>${esc(t('mood'))}</label>
          <select onchange="updMhField(${i}, 'm', this.value)">
            <option value="" ${!m.m ? 'selected' : ''}>—</option>
            ${moodOpts.map(k => `<option value="${k}" ${m.m === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="row">
        <div>
          <label>${esc(t('rest'))}</label>
          <select onchange="updMhField(${i}, 'r', this.value)">
            <option value="" ${!m.r ? 'selected' : ''}>—</option>
            ${locOpts.map(k => `<option value="${k}" ${m.r === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="row">
        <div>
          <label>${esc(t('mhRationaleLbl'))}</label>
          <select onchange="updMhField(${i}, 'rat', this.value)">
            <option value="" ${!m.rat ? 'selected' : ''}>—</option>
            ${ratOpts.map(k => `<option value="${k}" ${m.rat === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      <div style="margin-bottom:0;">
        <label>${esc(t('mhNoteLbl'))}</label>
        <input type="text" value="${esc(m.n || '')}" oninput="updMhField(${i}, 'n', this.value)">
      </div>
    </div>`).join('');

    bodyHtml = lvlCard + listHtml + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createMhEntry()">${esc(t('add'))} ${esc(t('mh'))}</button>`;
  }

  else if (curSec === 'events') {
    const phrases = getLangList('phrases');
    const quickCard = `<div class="card">
      <label>${esc(t('events'))}</label>
      <div class="chip-row" style="margin-bottom:0;">
        ${phrases.map((ph, idx) => `<span class="chip" onclick="addQuickPhrase(${idx})">+ ${esc(ph)}</span>`).join('')}
      </div>
    </div>`;

    const listHtml = p.events.map((e, i) => {
      const noteTxt = (typeof e.pIdx === 'number' && phrases[e.pIdx] && !e.customEdited) ? phrases[e.pIdx] : (e.e || '');
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num">${esc(t('events'))} #${i + 1}</span>
          <button type="button" class="del-btn" onclick="delItem('events', ${i})">✕</button>
        </div>
        <div class="row">
          <div><label>${esc(t('time'))}</label><input type="time" value="${esc(e.t || '')}" oninput="updEventField(${i}, 't', this.value)"></div>
        </div>
        <div style="margin-bottom:8px;">
          <label>${esc(t('events'))}</label>
          <textarea rows="2" oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px';updEventField(${i}, 'e', this.value)">${esc(noteTxt)}</textarea>
        </div>
        <div style="margin-bottom:0;">
          <label>${esc(t('outcome'))}</label>
          <input type="text" value="${esc(e.o || '')}" oninput="updEventField(${i}, 'o', this.value)">
        </div>
      </div>`;
    }).join('');

    bodyHtml = quickCard + listHtml + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createEventEntry()">${esc(t('add'))} ${esc(t('events'))}</button>`;
  }

  else if (curSec === 'reminders') {
    const taskList = getLangList('tasks');
    const quickCard = `<div class="card">
      <label>${esc(t('reminders'))}</label>
      <div class="chip-row" style="margin-bottom:0;">
        ${taskList.map((tk, idx) => `<span class="chip" onclick="quickAddTaskPreset(${idx})">+ ${esc(tk)}</span>`).join('')}
      </div>
    </div>`;

    const listHtml = p.reminders.map((r, i) => {
      const tkTxt = (typeof r.tIdx === 'number' && taskList[r.tIdx] && !r.customEdited) ? taskList[r.tIdx] : (r.txt || '');
      const overdue = isTaskOverdue(r);
      return `<div class="card entry-card ${overdue ? 'task-alert' : ''}">
        <div class="entry-hdr">
          <label style="display:flex; align-items:center; gap:8px; margin:0; font-size:0.9rem; color:var(--text); cursor:pointer;">
            <input type="checkbox" ${r.done ? 'checked' : ''} onchange="toggleTaskDone(${i})">
            <span class="task-badge ${overdue ? 'overdue' : ''}">${r.done ? esc(t('done')) : (overdue ? 'OVERDUE' : esc(t('due')) + ' ' + esc(r.due || '--:--'))}</span>
          </label>
          <button type="button" class="del-btn" onclick="delItem('reminders', ${i})">✕</button>
        </div>
        <div class="chip-row" style="margin-bottom:8px;">
          ${[[15,'+15m'],[30,'+30m'],[60,'+1h'],[120,'+2h'],[240,'+4h']].map(([mins, lbl]) => `<span class="chip" onclick="setTaskOffset(${i}, ${mins})">${lbl}</span>`).join('')}
        </div>
        <div class="row" style="margin-bottom:0;">
          <div style="flex:0 0 115px;"><label>${esc(t('dueTime'))}</label><input type="time" value="${esc(r.due || '')}" onchange="updTaskDue(${i}, this.value)"></div>
          <div><label>${esc(t('reminders'))}</label><input type="text" value="${esc(tkTxt)}" oninput="updTaskText(${i}, this.value)"></div>
        </div>
      </div>`;
    }).join('');

    bodyHtml = quickCard + listHtml + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createTaskEntry()">${esc(t('add'))} ${esc(t('reminders'))}</button>`;
  }

  else if (curSec === 'admit') {
    const admitList = getLangList('admits');
    const locs = ['locPt', 'locSafe', 'locHome'];

    bodyHtml = `<div class="card">
      <div class="row">
        <div><label>${esc(t('weight'))}</label><input type="number" step="0.1" inputmode="decimal" value="${esc(p.admit.w)}" oninput="updAdmitField('w', this.value)"></div>
        <div><label>${esc(t('height'))}</label><input type="number" step="0.1" inputmode="decimal" value="${esc(p.admit.h)}" oninput="updAdmitField('h', this.value)"></div>
      </div>
      <div style="margin-bottom:12px;">
        <span class="chip ${p.admit.wb ? 'active' : ''}" onclick="updAdmitField('wb', !getPt(curBed).admit.wb); renderSection();">✓ ${esc(t('wristband'))}</span>
      </div>
      <label>${esc(t('admit'))}</label>
      <div class="chip-row">
        ${admitList.map((itemLbl, idx) => {
          const isOn = p.admit.list.includes(idx);
          return `<span class="chip ${isOn ? 'active' : ''}" onclick="toggleAdmitPill(${idx})">${isOn ? '✓ ' : '+ '}${esc(itemLbl)}</span>`;
        }).join('')}
      </div>
      <div style="margin-bottom:12px;">
        <label>${esc(t('locNotes'))}</label>
        <input type="text" value="${esc(p.admit.other || '')}" oninput="updAdmitField('other', this.value)">
      </div>
      <div class="chip-row" style="margin-bottom:0;">
        ${locs.map(lc => `<span class="chip ${p.admit.loc === lc ? 'active' : ''}" onclick="toggleAdmitLoc('${lc}')">${esc(t(lc))}</span>`).join('')}
      </div>
    </div>`;
  }

  area.innerHTML = topHtml + bodyHtml;
}

function createObsEntry() {
  const p = getPt(curBed);
  p.obs.push({ t: nowTimeStr(), rr: '', sp: '', o2: '', sys: '', dia: '', bp: '-', hr: '', tm: '', u: tempUnit, aIdx: null, pn: '', done: false });
  saveDB();
  renderUI();
}

function updObsField(idx, k, val) {
  const p = getPt(curBed);
  if (!p.obs[idx]) return;
  p.obs[idx][k] = val;
  p.obs[idx].done = false;
  saveDB();
  refreshSubNavCounts();
}

function updObsBp(idx, part, val) {
  const p = getPt(curBed);
  if (!p.obs[idx]) return;
  const o = p.obs[idx];
  const [curSys, curDia] = splitBpParts(o, 'sys', 'dia', 'bp');
  o.sys = part === 'sys' ? val.trim() : curSys;
  o.dia = part === 'dia' ? val.trim() : curDia;
  o.bp = (o.sys || o.dia) ? `${o.sys || '-'}/${o.dia || '-'}` : '-';
  o.done = false;
  saveDB();
  refreshSubNavCounts();
}

function createBmEntry() {
  const p = getPt(curBed);
  p.bm.push({ t: nowTimeStr(), v: '', u: bmUnit, c: '', f: [], done: false });
  saveDB();
  renderUI();
}

function updBmField(idx, k, val) {
  const p = getPt(curBed);
  if (!p.bm[idx]) return;
  p.bm[idx][k] = val;
  p.bm[idx].done = false;
  saveDB();
  refreshSubNavCounts();
}

function toggleBmFlag(idx, code) {
  const p = getPt(curBed);
  if (!p.bm[idx]) return;
  if (!Array.isArray(p.bm[idx].f)) p.bm[idx].f = [];
  const pos = p.bm[idx].f.indexOf(code);
  if (pos > -1) p.bm[idx].f.splice(pos, 1);
  else p.bm[idx].f.push(code);
  p.bm[idx].done = false;
  saveDB();
  renderSection();
}

function createBpEntry() {
  const p = getPt(curBed);
  p.bp.push({ t: nowTimeStr(), lSys: '', lDia: '', sSys: '', sDia: '', l: '-', s: '-', sym: [], done: false });
  saveDB();
  renderUI();
}

function updBpField(idx, k, val) {
  const p = getPt(curBed);
  if (!p.bp[idx]) return;
  p.bp[idx][k] = val;
  p.bp[idx].done = false;
  saveDB();
}

function updBpPair(idx, posKey, part, val) {
  const p = getPt(curBed);
  if (!p.bp[idx]) return;
  const x = p.bp[idx];
  const [curSys, curDia] = splitBpParts(x, posKey + 'Sys', posKey + 'Dia', posKey);
  x[posKey + 'Sys'] = part === 'Sys' ? val.trim() : curSys;
  x[posKey + 'Dia'] = part === 'Dia' ? val.trim() : curDia;
  const s = x[posKey + 'Sys'];
  const d = x[posKey + 'Dia'];
  x[posKey] = (s || d) ? `${s || '-'}/${d || '-'}` : '-';
  x.done = false;
  saveDB();
  refreshSubNavCounts();
}

function toggleBpSym(idx, code) {
  const p = getPt(curBed);
  if (!p.bp[idx]) return;
  if (!Array.isArray(p.bp[idx].sym)) p.bp[idx].sym = [];
  const arr = p.bp[idx].sym;
  const pos = arr.indexOf(code);
  if (pos > -1) {
    arr.splice(pos, 1);
  } else {
    if (code === 'noSym') {
      p.bp[idx].sym = ['noSym'];
    } else {
      const noPos = arr.indexOf('noSym');
      if (noPos > -1) arr.splice(noPos, 1);
      arr.push(code);
    }
  }
  p.bp[idx].done = false;
  saveDB();
  renderSection();
}

function setFluidTarget(idx, type) {
  activeFluidIdx = idx;
  activeFluidType = type;
  const p = getPt(curBed);
  for (let i = 0; i < 12; i++) {
    const inEl = document.getElementById('flIn_' + i);
    const outEl = document.getElementById('flOut_' + i);
    const hrEl = document.getElementById('flHr_' + i);
    if (inEl) inEl.classList.toggle('fl-target-in', i === idx && type === 'i');
    if (outEl) outEl.classList.toggle('fl-target-out', i === idx && type === 'o');
    if (hrEl) hrEl.style.color = (i === idx) ? 'var(--teal)' : '';
  }
  document.querySelectorAll('.quick-fluid-btn').forEach(btn => {
    btn.classList.toggle('out-mode', type === 'o');
    const m = btn.textContent.match(/\+\d+ml/);
    if (m) btn.textContent = `${m[0]} ${type === 'i' ? t('flIn') : t('flOut')}`;
  });
  const stEl = document.getElementById('flHdrStatus');
  const actHr = p.fluids[idx] ? p.fluids[idx].t : '';
  if (stEl) stEl.innerHTML = `${esc(t('time'))}: <strong style="color:var(--teal);">${esc(actHr)}</strong> (${esc(type === 'i' ? t('flIn') : t('flOut'))})`;
  const curSrc = p.fluids[idx] ? p.fluids[idx].src : '';
  document.querySelectorAll('#flSrcChips .chip[data-src]').forEach(ch => {
    ch.classList.toggle('active-amber', ch.getAttribute('data-src') === curSrc);
  });
}

function updFluid(idx, type, val) {
  const p = getPt(curBed);
  if (!p.fluids[idx]) return;
  p.fluids[idx][type] = Math.max(0, parseInt(val) || 0);
  p.fluids[idx].done = false;
  saveDB();
  let totI = 0, totO = 0;
  p.fluids.forEach(f => { totI += (Number(f.i) || 0); totO += (Number(f.o) || 0); });
  const net = totI - totO;
  const totEl = document.getElementById('flHdrTotal');
  if (totEl) {
    totEl.innerHTML = `<strong>${esc(t('flTotal'))}:</strong> ${esc(t('flIn'))} <b>${totI}ml</b> | ${esc(t('flOut'))} <b>${totO}ml</b> | <b>${net > 0 ? '+' + net : net}ml</b>`;
  }
  refreshSubNavCounts();
}

function addQuickFluid(vol) {
  const p = getPt(curBed);
  if (!p.fluids[activeFluidIdx]) activeFluidIdx = 0;
  const row = p.fluids[activeFluidIdx];
  row[activeFluidType] = (Number(row[activeFluidType]) || 0) + vol;
  row.done = false;
  saveDB();
  renderUI();
}

function setFluidSource(sc) {
  const p = getPt(curBed);
  if (!p.fluids[activeFluidIdx]) activeFluidIdx = 0;
  const row = p.fluids[activeFluidIdx];
  row.src = (row.src === sc) ? '' : sc;
  activeFluidType = 'o';
  saveDB();
  renderUI();
}

function addWetPad() {
  const p = getPt(curBed);
  if (!p.fluids[activeFluidIdx]) activeFluidIdx = 0;
  const row = p.fluids[activeFluidIdx];
  row.wet = (Number(row.wet) || 0) + 1;
  row.done = false;
  saveDB();
  renderUI();
}

function decWetPad(idx) {
  const p = getPt(curBed);
  if (!p.fluids[idx]) return;
  p.fluids[idx].wet = Math.max(0, (Number(p.fluids[idx].wet) || 0) - 1);
  saveDB();
  renderUI();
}

function clrFluidRow(idx) {
  const p = getPt(curBed);
  if (!p.fluids[idx]) return;
  const hr = p.fluids[idx].t;
  p.fluids[idx] = { t: hr, i: 0, o: 0, src: '', wet: 0, done: false };
  saveDB();
  renderUI();
}

function createBowelEntry() {
  const p = getPt(curBed);
  p.bowel.push({ t: nowTimeStr(), a: '', ty: '', m: '', done: false });
  saveDB();
  renderUI();
}

function updBowelField(idx, k, val, rerender) {
  const p = getPt(curBed);
  if (!p.bowel[idx]) return;
  p.bowel[idx][k] = val;
  if (k === 'a' && val === 'bno') {
    p.bowel[idx].ty = '';
    p.bowel[idx].m = '';
  }
  p.bowel[idx].done = false;
  saveDB();
  refreshSubNavCounts();
  if (rerender) renderSection();
}

function updSkin(site, val) {
  const p = getPt(curBed);
  p.skin[site] = val;
  p.skinDone = false;
  saveDB();
  renderUI();
}

function markAllSkinIntact() {
  const p = getPt(curBed);
  const allIntact = ['sacrum', 'groin', 'heels', 'elbows'].every(s => p.skin[s] === 'intact');
  ['sacrum', 'groin', 'heels', 'elbows'].forEach(s => { p.skin[s] = allIntact ? '' : 'intact'; });
  p.skinDone = false;
  saveDB();
  renderUI();
}

function createCustomSkin() {
  const p = getPt(curBed);
  p.skinCustom.push({ site: '', side: '', cond: '' });
  p.skinDone = false;
  saveDB();
  renderUI();
}

function updCustomSkinField(idx, k, val) {
  const p = getPt(curBed);
  if (!p.skinCustom[idx]) return;
  p.skinCustom[idx][k] = val;
  p.skinDone = false;
  saveDB();
  refreshSubNavCounts();
}

function delCustomSkin(idx) {
  const p = getPt(curBed);
  p.skinCustom.splice(idx, 1);
  saveDB();
  renderUI();
}

function toggleSkinCare(ck) {
  const p = getPt(curBed);
  const pos = p.skinCare.indexOf(ck);
  if (pos > -1) p.skinCare.splice(pos, 1);
  else p.skinCare.push(ck);
  p.skinDone = false;
  saveDB();
  renderUI();
}

function createDressingEntry() {
  const p = getPt(curBed);
  p.dressings.push({ l: '', dt: todayIsoStr(), f: 0, st: '', done: false });
  saveDB();
  renderUI();
}

function setDrCardSite(idx, siteIdx) {
  const p = getPt(curBed);
  const drSites = getLangList('drSites');
  if (!p.dressings[idx] || !drSites[siteIdx]) return;
  p.dressings[idx].l = (p.dressings[idx].l === drSites[siteIdx]) ? '' : drSites[siteIdx];
  p.dressings[idx].done = false;
  saveDB();
  renderUI();
}

function updDressingField(idx, k, val, rerender) {
  const p = getPt(curBed);
  if (!p.dressings[idx]) return;
  p.dressings[idx][k] = val;
  p.dressings[idx].done = false;
  saveDB();
  refreshSubNavCounts();
  if (rerender) renderSection();
}

function toggleDressingStatus(idx, stCode) {
  const p = getPt(curBed);
  if (!p.dressings[idx]) return;
  p.dressings[idx].st = (p.dressings[idx].st === stCode) ? '' : stCode;
  p.dressings[idx].done = false;
  saveDB();
  renderSection();
}

function delDressing(idx) {
  if (!confirm(t('delConfirm'))) return;
  const p = getPt(curBed);
  p.dressings.splice(idx, 1);
  saveDB();
  renderUI();
}

function setMeal(mealKey, val) {
  const p = getPt(curBed);
  p.diet[mealKey] = (p.diet[mealKey] === val) ? '' : val;
  p.diet.done = false;
  saveDB();
  renderUI();
}

function quickLogSupp(statusCode) {
  const p = getPt(curBed);
  p.diet.supps.push({ t: nowTimeStr(), v: statusCode });
  p.diet.done = false;
  saveDB();
  renderUI();
}

function updSuppText(val) {
  const p = getPt(curBed);
  p.diet.supp = val;
  p.diet.done = false;
  saveDB();
  refreshSubNavCounts();
}

function addCustomSupp() {
  const inp = document.getElementById('suppInput');
  const val = (inp ? inp.value : '').trim();
  if (!val) return;
  const p = getPt(curBed);
  p.diet.supps.push({ t: nowTimeStr(), v: val });
  p.diet.supp = '';
  p.diet.done = false;
  saveDB();
  renderUI();
}

function delSupp(idx) {
  const p = getPt(curBed);
  p.diet.supps.splice(idx, 1);
  saveDB();
  renderUI();
}

function toggleDietFlag(fl) {
  const p = getPt(curBed);
  const idx = p.diet.flags.indexOf(fl);
  if (idx > -1) p.diet.flags.splice(idx, 1);
  else p.diet.flags.push(fl);
  p.diet.done = false;
  saveDB();
  renderUI();
}

function setTurnFreq(val) {
  const p = getPt(curBed);
  p.turnFreq = val;
  p.turnPlanDone = false;
  saveDB();
  renderUI();
}

function createTurnEntry() {
  const p = getPt(curBed);
  p.turns.push({ t: nowTimeStr(), p: '', done: false });
  saveDB();
  renderUI();
}

function updTurnField(idx, k, val) {
  const p = getPt(curBed);
  if (!p.turns[idx]) return;
  p.turns[idx][k] = val;
  p.turns[idx].done = false;
  saveDB();
  refreshSubNavCounts();
}

function toggleTurnCheck(ck) {
  const p = getPt(curBed);
  const idx = p.turnChecks.indexOf(ck);
  if (idx > -1) p.turnChecks.splice(idx, 1);
  else p.turnChecks.push(ck);
  saveDB();
  renderUI();
}

function setMhLevel(val) {
  const p = getPt(curBed);
  p.mhLevel = val;
  saveDB();
}

function createMhEntry() {
  const p = getPt(curBed);
  p.mh.push({ t: nowTimeStr(), m: '', r: '', rat: '', n: '', done: false });
  saveDB();
  renderUI();
}

function updMhField(idx, k, val) {
  const p = getPt(curBed);
  if (!p.mh[idx]) return;
  p.mh[idx][k] = val;
  p.mh[idx].done = false;
  saveDB();
  refreshSubNavCounts();
}

function addQuickPhrase(pIdx) {
  const p = getPt(curBed);
  const phrases = getLangList('phrases');
  p.events.push({ t: nowTimeStr(), pIdx, e: phrases[pIdx] || '', o: '', done: false });
  saveDB();
  renderUI();
}

function createEventEntry() {
  const p = getPt(curBed);
  p.events.push({ t: nowTimeStr(), e: '', o: '', done: false });
  saveDB();
  renderUI();
}

function updEventField(idx, k, val) {
  const p = getPt(curBed);
  if (!p.events[idx]) return;
  p.events[idx][k] = val;
  if (k === 'e') p.events[idx].customEdited = true;
  p.events[idx].done = false;
  saveDB();
  refreshSubNavCounts();
}

function quickAddTaskPreset(tIdx) {
  const p = getPt(curBed);
  const taskList = getLangList('tasks');
  const nowMs = Date.now();
  const due = nowTimeStr();
  p.reminders.push({
    due,
    createdTs: nowMs,
    dueTs: nowMs + 30 * 60 * 1000,
    txt: taskList[tIdx] || '',
    tIdx,
    done: false,
    alerted: false
  });
  const dt = new Date(nowMs + 30 * 60 * 1000);
  p.reminders[p.reminders.length - 1].due = String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
  saveDB();
  renderUI();
}

function createTaskEntry() {
  const p = getPt(curBed);
  const nowMs = Date.now();
  const dt = new Date(nowMs + 30 * 60 * 1000);
  const due = String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
  p.reminders.push({
    due,
    createdTs: nowMs,
    dueTs: dt.getTime(),
    txt: '',
    done: false,
    alerted: false
  });
  saveDB();
  renderUI();
}

function setTaskOffset(idx, mins) {
  const p = getPt(curBed);
  if (!p.reminders[idx]) return;
  const targetMs = Date.now() + mins * 60 * 1000;
  const dt = new Date(targetMs);
  p.reminders[idx].due = String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
  p.reminders[idx].createdTs = Date.now();
  p.reminders[idx].dueTs = targetMs;
  p.reminders[idx].alerted = false;
  saveDB();
  renderUI();
}

function updTaskDue(idx, dueStr) {
  const p = getPt(curBed);
  if (!p.reminders[idx]) return;
  const nowMs = Date.now();
  p.reminders[idx].due = dueStr;
  p.reminders[idx].createdTs = nowMs;
  p.reminders[idx].dueTs = computeTaskDueTs(dueStr, nowMs);
  p.reminders[idx].alerted = false;
  saveDB();
  renderUI();
}

function updTaskText(idx, val) {
  const p = getPt(curBed);
  if (!p.reminders[idx]) return;
  p.reminders[idx].txt = val;
  p.reminders[idx].customEdited = true;
  saveDB();
  refreshSubNavCounts();
}

function toggleTaskDone(idx) {
  const p = getPt(curBed);
  if (!p.reminders[idx]) return;
  p.reminders[idx].done = !p.reminders[idx].done;
  saveDB();
  renderUI();
}

function updAdmitField(k, val) {
  const p = getPt(curBed);
  p.admit[k] = val;
  p.admit.done = false;
  saveDB();
  refreshSubNavCounts();
}

function toggleAdmitPill(idx) {
  const p = getPt(curBed);
  const pos = p.admit.list.indexOf(idx);
  if (pos > -1) p.admit.list.splice(pos, 1);
  else p.admit.list.push(idx);
  p.admit.done = false;
  saveDB();
  renderUI();
}

function toggleAdmitLoc(lc) {
  const p = getPt(curBed);
  p.admit.loc = (p.admit.loc === lc) ? '' : lc;
  p.admit.done = false;
  saveDB();
  renderUI();
}

function delItem(sec, idx) {
  if (!confirm(t('delConfirm'))) return;
  const p = getPt(curBed);
  if (Array.isArray(p[sec])) {
    p[sec].splice(idx, 1);
    saveDB();
    renderUI();
  }
}

function jumpToBedMod(bIdx, modId) {
  if (!alloc[bIdx]) return;
  curBed = alloc[bIdx];
  curSec = modId;
  showSummary = false;
  renderUI();
}

function doneBtnHtml(bIdx, sec, idx, isDone) {
  const lbl = isDone ? esc(t('done')) : esc(t('markDone'));
  const style = isDone
    ? 'background:var(--green); color:#fff; border:1px solid var(--green); padding:3px 9px; border-radius:6px; font-size:0.74rem; font-weight:700; cursor:pointer; flex-shrink:0;'
    : 'background:transparent; color:var(--text-sub); border:1px solid var(--input-border); padding:3px 9px; border-radius:6px; font-size:0.74rem; font-weight:700; cursor:pointer; flex-shrink:0;';
  return `<button type="button" style="${style}" onclick="toggleSumDone(${bIdx}, '${sec}', ${idx})">${lbl}</button>`;
}

function sumRowWrap(leftHtml, bIdx, sec, idx, isDone) {
  if (hideCompleted && isDone) return '';
  const textStyle = isDone ? 'opacity:0.48; color:var(--text-sub); flex:1;' : 'flex:1;';
  return `<div style="display:flex; justify-content:space-between; align-items:center; gap:10px; padding:5px 0; border-bottom:1px solid var(--border);">
    <span style="${textStyle}">${leftHtml}</span>
    ${doneBtnHtml(bIdx, sec, idx, isDone)}
  </div>`;
}

function toggleSumDone(bedOrIdx, sec, idx) {
  const bed = typeof bedOrIdx === 'number' ? alloc[bedOrIdx] : bedOrIdx;
  if (!bed) return;
  const p = getPt(bed);
  if (sec === 'skin') p.skinDone = !p.skinDone;
  else if (sec === 'diet') p.diet.done = !p.diet.done;
  else if (sec === 'turnPlan') p.turnPlanDone = !p.turnPlanDone;
  else if (sec === 'admit') p.admit.done = !p.admit.done;
  else if (Array.isArray(p[sec]) && p[sec][idx]) {
    p[sec][idx].done = !p[sec][idx].done;
  }
  saveDB();
  renderSummary();
}

function markBedDone(bedOrIdx) {
  const bed = typeof bedOrIdx === 'number' ? alloc[bedOrIdx] : bedOrIdx;
  if (!bed) return;
  const p = getPt(bed);
  p.obs.forEach(x => x.done = true);
  p.bm.forEach(x => x.done = true);
  p.bp.forEach(x => x.done = true);
  p.fluids.forEach(x => x.done = true);
  p.bowel.forEach(x => x.done = true);
  p.skinDone = true;
  p.dressings.forEach(x => x.done = true);
  p.diet.done = true;
  p.turnPlanDone = true;
  p.turns.forEach(x => x.done = true);
  p.mh.forEach(x => x.done = true);
  p.events.forEach(x => x.done = true);
  p.reminders.forEach(x => x.done = true);
  p.admit.done = true;
  saveDB();
  renderSummary();
}

function buildModuleSummaryForBed(b, modId) {
  const bIdx = alloc.indexOf(b);
  const p = getPt(b);
  const acvpuList = getLangList('acvpu');
  const phrases = getLangList('phrases');
  const taskList = getLangList('tasks');
  const admitList = getLangList('admits');
  let rows = '';

  if (modId === 'obs') {
    p.obs.forEach((o, i) => {
      if (!isObsFilled(o)) return;
      const parts = [];
      if (o.rr && o.rr !== '-') parts.push(`RR <b>${esc(o.rr)}</b>`);
      if (o.sp && o.sp !== '-') {
        const o2Txt = (o.o2 && o.o2 !== '-') ? ` (${esc(trCode(o.o2))})` : '';
        parts.push(`SpO2 <b>${esc(o.sp)}%</b>${o2Txt}`);
      } else if (o.o2 && o.o2 !== '-') {
        parts.push(`<b>${esc(trCode(o.o2))}</b>`);
      }
      if (o.bp && o.bp !== '-' && o.bp !== '-/-') parts.push(`BP <b>${esc(o.bp)}</b>`);
      if (o.hr && o.hr !== '-') parts.push(`HR <b>${esc(o.hr)}</b>`);
      if (typeof o.aIdx === 'number' && acvpuList[o.aIdx]) parts.push(`<b>${esc(acvpuList[o.aIdx])}</b>`);
      if (o.tm && o.tm !== '-') parts.push(`Temp <b>${esc(o.tm)}${esc(o.u || tempUnit)}</b>`);
      if (o.pn !== '' && o.pn !== undefined && o.pn !== null && o.pn !== '-') parts.push(`${esc(t('pain'))} <b>${esc(o.pn)}/10</b>`);
      const txt = `<strong>${esc(o.t || '--:--')}</strong> — ${parts.join(' • ')}`;
      rows += sumRowWrap(txt, bIdx, 'obs', i, !!o.done);
    });
  }

  else if (modId === 'bm') {
    p.bm.forEach((x, i) => {
      if (!x.v || String(x.v).trim() === '') return;
      const txt = `<strong>${esc(x.t)}</strong> — <b>${esc(x.v)} ${esc(x.u || bmUnit)}</b>${x.c ? ' (' + esc(trCode(x.c)) + ')' : ''}${(x.f && x.f.length) ? ' • ' + x.f.map(f => esc(trCode(f))).join(', ') : ''}`;
      rows += sumRowWrap(txt, bIdx, 'bm', i, !!x.done);
    });
  }

  else if (modId === 'bp') {
    p.bp.forEach((x, i) => {
      const hasL = x.l && x.l !== '-' && x.l !== '-/-';
      const hasS = x.s && x.s !== '-' && x.s !== '-/-';
      if (!hasL && !hasS && (!x.sym || !x.sym.length)) return;
      const bpParts = [];
      if (hasL) bpParts.push(`${esc(t('lying'))}: <b>${esc(x.l)}</b>`);
      if (hasS) bpParts.push(`${esc(t('standing'))}: <b>${esc(x.s)}</b>`);
      const txt = `<strong>${esc(x.t)}</strong> — ${bpParts.join(' | ')}${(x.sym && x.sym.length) ? ' (' + x.sym.map(s => esc(trCode(s))).join(', ') + ')' : ''}`;
      rows += sumRowWrap(txt, bIdx, 'bp', i, !!x.done);
    });
  }

  else if (modId === 'fluid') {
    let totI = 0, totO = 0;
    p.fluids.forEach((f, i) => {
      const fi = Number(f.i) || 0;
      const fo = Number(f.o) || 0;
      const fw = Number(f.wet) || 0;
      totI += fi;
      totO += fo;
      if (fi > 0 || fo > 0 || fw > 0) {
        const segs = [];
        if (fi > 0) segs.push(`${esc(t('flIn'))} <b>${fi}ml</b>`);
        if (fo > 0) segs.push(`${esc(t('flOut'))} <b>${fo}ml</b>${f.src ? ' (' + esc(trCode(f.src)) + ')' : ''}`);
        else if (f.src) segs.push(`<b>${esc(trCode(f.src))}</b>`);
        if (fw > 0) segs.push(`${esc(t('wetPad'))} x<b>${fw}</b>`);
        const txt = `<strong>${esc(f.t || '')}</strong> — ${segs.join(' | ')}`;
        rows += sumRowWrap(txt, bIdx, 'fluids', i, !!f.done);
      }
    });
    if (rows) {
      const net = totI - totO;
      rows += `<div style="padding-top:6px; font-size:0.9rem;"><strong>${esc(t('flTotal'))}:</strong> ${esc(t('flIn'))} <b>${totI}ml</b> | ${esc(t('flOut'))} <b>${totO}ml</b> | ${esc(t('flNet'))} <b>${net > 0 ? '+' + net : net}ml</b></div>`;
    }
  }

  else if (modId === 'bowel') {
    p.bowel.forEach((x, i) => {
      if (!x.a) return;
      const txt = x.a === 'bno'
        ? `<strong>${esc(x.t)}</strong> — <b>${esc(t('bnoFull'))}</b>`
        : `<strong>${esc(x.t)}</strong> — <b>${esc(trCode(x.a))}</b>${x.ty ? ' — ' + esc(trCode(x.ty)) : ''}${x.m ? ' • ' + esc(trCode(x.m)) : ''}`;
      rows += sumRowWrap(txt, bIdx, 'bowel', i, !!x.done);
    });
  }

  else if (modId === 'amy') {
    const skParts = [];
    ['sacrum', 'groin', 'heels', 'elbows'].forEach(st => {
      if (p.skin[st]) skParts.push(`${esc(t(st))}: <b>${esc(trCode(p.skin[st]))}</b>`);
    });
    p.skinCustom.forEach(c => {
      if (c.site && c.cond) {
        skParts.push(`${esc(trCode(c.site))}${c.side ? ' (' + esc(trCode(c.side)) + ')' : ''}: <b>${esc(trCode(c.cond))}</b>`);
      }
    });
    if (p.skinCare.length > 0) {
      skParts.push(p.skinCare.map(ck => `<b>${esc(trCode(ck))}</b>`).join(', '));
    }
    if (skParts.length > 0) {
      rows += sumRowWrap(skParts.join(', '), bIdx, 'skin', 0, !!p.skinDone);
    }
    p.dressings.forEach((d, i) => {
      if (!d.l || !d.l.trim()) return;
      const txt = `<strong>${esc(t('dressing'))}:</strong> <b>${esc(d.l)}</b>${d.st ? ' (' + esc(trCode(d.st)) + ')' : ''}${d.f ? ` — ${esc(t('due'))}: <b>${esc(calcDue(d.dt, d.f))}</b>` : ` — ${esc(formatIsoDate(d.dt))}`}`;
      rows += sumRowWrap(txt, bIdx, 'dressings', i, !!d.done);
    });
  }

  else if (modId === 'food') {
    const dParts = [];
    if (p.diet.b) dParts.push(`${esc(t('b'))}: <b>${esc(trCode(p.diet.b))}</b>`);
    if (p.diet.l) dParts.push(`${esc(t('l'))}: <b>${esc(trCode(p.diet.l))}</b>`);
    if (p.diet.d) dParts.push(`${esc(t('d'))}: <b>${esc(trCode(p.diet.d))}</b>`);
    if (p.diet.supp) dParts.push(`${esc(t('supp'))}: <b>${esc(p.diet.supp)}</b>`);
    p.diet.supps.forEach(s => {
      dParts.push(`${esc(s.t)} <b>${esc(trCode(s.v))}</b>`);
    });
    if (p.diet.flags.length > 0) {
      dParts.push(p.diet.flags.map(fl => `<b>${esc(trCode(fl))}</b>`).join(', '));
    }
    if (dParts.length > 0) {
      rows += sumRowWrap(dParts.join(' | '), bIdx, 'diet', 0, !!p.diet.done);
    }
  }

  else if (modId === 'turn') {
    if (p.turnFreq || p.turnChecks.length > 0) {
      const planTxt = `${p.turnFreq ? `${esc(t('turnFreqLbl'))}: <b>${esc(trCode(p.turnFreq))}</b>` : ''}${p.turnChecks.length ? (p.turnFreq ? ' • ' : '') + p.turnChecks.map(ck => `<b>${esc(trCode(ck))}</b>`).join(', ') : ''}`;
      rows += sumRowWrap(planTxt, bIdx, 'turnPlan', 0, !!p.turnPlanDone);
    }
    p.turns.forEach((tr, i) => {
      if (!tr.p) return;
      const txt = `<strong>${esc(tr.t)}</strong> — <b>${esc(trCode(tr.p))}</b>`;
      rows += sumRowWrap(txt, bIdx, 'turns', i, !!tr.done);
    });
  }

  else if (modId === 'mh') {
    p.mh.forEach((m, i) => {
      if (!m.m && !m.r && !m.rat && !m.n) return;
      const txt = `<strong>${esc(m.t)}</strong>${p.mhLevel ? ' (' + esc(trCode(p.mhLevel)) + ')' : ''} — ${m.m ? `<b>${esc(trCode(m.m))}</b>` : ''}${m.r ? (m.m ? ' • ' : '') + esc(trCode(m.r)) : ''}${m.rat ? ' • ' + esc(trCode(m.rat)) : ''}${m.n ? ' (' + esc(m.n) + ')' : ''}`;
      rows += sumRowWrap(txt, bIdx, 'mh', i, !!m.done);
    });
  }

  else if (modId === 'events') {
    p.events.forEach((e, i) => {
      const noteTxt = (typeof e.pIdx === 'number' && phrases[e.pIdx] && !e.customEdited) ? phrases[e.pIdx] : (e.e || '');
      if (!noteTxt.trim()) return;
      const txt = `<strong>${esc(e.t)}</strong> — ${esc(noteTxt)}${e.o ? ' → <b>' + esc(e.o) + '</b>' : ''}`;
      rows += sumRowWrap(txt, bIdx, 'events', i, !!e.done);
    });
  }

  else if (modId === 'reminders') {
    p.reminders.forEach((r, i) => {
      const tkTxt = (typeof r.tIdx === 'number' && taskList[r.tIdx] && !r.customEdited) ? taskList[r.tIdx] : (r.txt || '');
      if (!tkTxt.trim()) return;
      const overdue = isTaskOverdue(r);
      const txt = `<strong>${esc(r.due || '--:--')}</strong> — <b>${esc(tkTxt)}</b>${overdue ? ' <span class="task-badge overdue">OVERDUE</span>' : ''}`;
      rows += sumRowWrap(txt, bIdx, 'reminders', i, !!r.done);
    });
  }

  else if (modId === 'admit') {
    const aParts = [];
    if (p.admit.w) aParts.push(`${esc(t('weight'))}: <b>${esc(p.admit.w)}kg</b>`);
    if (p.admit.h) aParts.push(`${esc(t('height'))}: <b>${esc(p.admit.h)}cm</b>`);
    if (p.admit.wb) aParts.push(`<b>✓ ${esc(t('wristband'))}</b>`);
    if (p.admit.list.length > 0) {
      const itemsTxt = p.admit.list.map(idx => admitList[idx] ? esc(admitList[idx]) : '').filter(Boolean).join(', ');
      if (itemsTxt) aParts.push(`<b>${itemsTxt}</b>`);
    }
    if (p.admit.other && p.admit.other.trim()) {
      aParts.push(`<b>${esc(p.admit.other.trim())}</b>`);
    }
    if (p.admit.loc) {
      aParts.push(`(${esc(trCode(p.admit.loc))})`);
    }
    if (aParts.length > 0) {
      rows += sumRowWrap(aParts.join(' • '), bIdx, 'admit', 0, !!p.admit.done);
    }
  }

  return rows;
}

function renderSummary() {
  const area = document.getElementById('contentArea');
  const activeSecs = getActiveSections();

  let html = `<div class="summary-toolbar">
    <button type="button" class="tool-btn ${summaryGroup === 'bed' ? 'active' : ''}" onclick="setSumGroup('bed')">${esc(t('byBed'))}</button>
    <button type="button" class="tool-btn ${summaryGroup === 'mod' ? 'active' : ''}" onclick="setSumGroup('mod')">${esc(t('byMod'))}</button>
    <button type="button" class="tool-btn ${hideCompleted ? 'active' : ''}" onclick="toggleHideCompleted()">${esc(hideCompleted ? t('showAll') : t('pending'))}</button>
    <button type="button" class="tool-btn ${wakeLockObj ? 'active' : ''}" onclick="toggleWakeLock()">💡 ${esc(t('keepOn'))}</button>
  </div>`;

  if (summaryGroup === 'bed') {
    alloc.forEach((b, bIdx) => {
      let bedContent = '';
      activeSecs.forEach(s => {
        const modRows = buildModuleSummaryForBed(b, s.id);
        if (modRows) {
          bedContent += `<div class="summary-sec">
            <div class="sum-mod-hdr" onclick="jumpToBedMod(${bIdx}, '${s.id}')">${esc(t(s.id))} ✎</div>
            ${modRows}
          </div>`;
        }
      });
      if (bedContent) {
        html += `<div class="card">
          <h3>
            <span>${esc(b)}</span>
            <button type="button" class="btn-subtle btn-sm" style="background:var(--header-bg); color:#fff; border:none;" onclick="markBedDone(${bIdx})">${esc(t('markBed'))}</button>
          </h3>
          ${bedContent}
        </div>`;
      }
    });
  } else {
    activeSecs.forEach(s => {
      let modContent = '';
      alloc.forEach((b, bIdx) => {
        const modRows = buildModuleSummaryForBed(b, s.id);
        if (modRows) {
          modContent += `<div class="summary-sec">
            <div class="sum-mod-hdr" onclick="jumpToBedMod(${bIdx}, '${s.id}')">${esc(b)} ✎</div>
            ${modRows}
          </div>`;
        }
      });
      if (modContent) {
        html += `<div class="card">
          <h3><span>${esc(t(s.id))}</span></h3>
          ${modContent}
        </div>`;
      }
    });
  }

  area.innerHTML = html;
}

function setSumGroup(g) {
  summaryGroup = g;
  renderSummary();
}

function toggleHideCompleted() {
  hideCompleted = !hideCompleted;
  renderSummary();
}
