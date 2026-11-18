function normDec(val) {
  if (val === null || val === undefined) return '';
  return String(val).replace(/,/g, '.');
}

function getEventText(e, phrases) {
  if (!e) return '';
  const list = phrases || getLangList('phrases');
  if (typeof e.pIdx === 'number' && !e.customEdited && list[e.pIdx]) return list[e.pIdx];
  return e.e || '';
}

function getTaskText(r, taskList) {
  if (!r) return '';
  const list = taskList || getLangList('tasks');
  if (typeof r.tIdx === 'number' && !r.customEdited && list[r.tIdx]) return list[r.tIdx];
  return r.txt || '';
}

function computeTaskDueTs(dueStr, refMs) {
  if (!dueStr) return null;
  const parts = dueStr.split(':').map(Number);
  if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
  const base = refMs ? new Date(refMs) : new Date();
  const dt = new Date(base.getFullYear(), base.getMonth(), base.getDate(), parts[0], parts[1], 0, 0);
  if (base.getTime() - dt.getTime() > 6 * 60 * 60 * 1000) {
    dt.setDate(dt.getDate() + 1);
  }
  return dt.getTime();
}

function isTaskOverdue(r) {
  if (!r || r.done || !r.due || !getTaskText(r).trim()) return false;
  if (!r.createdTs) r.createdTs = Date.now();
  if (!r.dueTs) r.dueTs = computeTaskDueTs(r.due, r.createdTs);
  return r.dueTs ? Date.now() >= r.dueTs : false;
}

function hasOverdueTask(b) {
  if (!isPro) return false;
  return getPt(b).reminders.some(r => isTaskOverdue(r));
}

function playAlarmBeep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!alarmAudioCtx) alarmAudioCtx = new Ctx();
    if (alarmAudioCtx.state === 'suspended') alarmAudioCtx.resume();
    const osc = alarmAudioCtx.createOscillator();
    const gain = alarmAudioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, alarmAudioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, alarmAudioCtx.currentTime);
    osc.connect(gain);
    gain.connect(alarmAudioCtx.destination);
    osc.start();
    osc.stop(alarmAudioCtx.currentTime + 0.25);
  } catch (e) {}
}

function renderOverdueBanner() {
  const el = document.getElementById('overdueBanner');
  if (!el) return;
  if (!isPro || !safeGetRaw('cdu_start')) {
    el.classList.add('hidden');
    el.innerHTML = '';
    return;
  }
  const overdueBeds = [];
  alloc.forEach((b, bIdx) => {
    if (hasOverdueTask(b) && !(b === curBed && !showSummary && curSec === 'reminders')) {
      overdueBeds.push({ b, bIdx });
    }
  });
  if (overdueBeds.length === 0) {
    el.classList.add('hidden');
    el.innerHTML = '';
    return;
  }
  el.innerHTML = `<div class="overdue-banner-inner">
    <span>${esc(t('overdueTasks'))}:</span>
    ${overdueBeds.map(x => `<button type="button" class="overdue-pill" onclick="jumpToBedMod(${x.bIdx}, 'reminders')">${esc(x.b)} →</button>`).join('')}
  </div>`;
  el.classList.remove('hidden');
}

function checkOverdueTasks(triggerSound = true) {
  if (checkShiftExpiry()) return;
  if (!isPro) {
    renderOverdueBanner();
    return;
  }
  let newlyTriggered = false;
  alloc.forEach(b => {
    getPt(b).reminders.forEach(r => {
      if (!r.done && !r.alerted && isTaskOverdue(r) && triggerSound) {
        r.alerted = true;
        newlyTriggered = true;
      }
    });
  });
  if (newlyTriggered) {
    saveDB();
    playAlarmBeep();
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  }
  renderOverdueBanner();
  refreshSubNavCounts();
  if (showSummary && newlyTriggered) {
    renderSummary();
  } else if (!showSummary && curSec === 'reminders' && curBed) {
    const p = getPt(curBed);
    p.reminders.forEach((r, idx) => {
      const overdue = isTaskOverdue(r);
      const cardEl = document.getElementById('taskCard_' + idx);
      const badgeEl = document.getElementById('taskBadge_' + idx);
      if (cardEl) cardEl.classList.toggle('task-alert', overdue);
      if (badgeEl) {
        badgeEl.classList.toggle('overdue', overdue);
        badgeEl.textContent = r.done ? t('done') : (overdue ? t('overdue') : `${t('due')} ${r.due || '--:--'}`);
      }
    });
  }
}

function startAlertTimer() {
  if (alertTimerId) clearInterval(alertTimerId);
  alertTimerId = setInterval(() => {
    checkOverdueTasks(true);
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
      return { t: h, i: Number(ex.i) || 0, o: Number(ex.o) || 0, src: ex.src || '', wet: Number(ex.wet) || 0, done: !!ex.done };
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
  if (typeof p.mhLevelDone !== 'boolean') p.mhLevelDone = false;
  if (!Array.isArray(p.mh)) p.mh = [];
  if (!Array.isArray(p.events)) p.events = [];
  if (!Array.isArray(p.reminders)) p.reminders = [];
  if (!p.admit || typeof p.admit !== 'object') p.admit = { w: '', h: '', wb: false, items: {}, custom: [], other: '', done: false };
  if (!p.admit.items || typeof p.admit.items !== 'object') p.admit.items = {};
  if (!Array.isArray(p.admit.custom)) p.admit.custom = [];
  if (Array.isArray(p.admit.list)) {
    p.admit.list.forEach(idx => {
      const k = 'std_' + idx;
      if (p.admit.items[k] === undefined) p.admit.items[k] = p.admit.loc || 'locPt';
    });
    delete p.admit.list;
  }
  if (typeof p.admit.other !== 'string') p.admit.other = '';
  return p;
}

function isObsFilled(o) {
  if (!o) return false;
  const hasVal = v => v !== undefined && v !== null && String(v).trim() !== '' && String(v).trim() !== '-';
  return hasVal(o.rr) || hasVal(o.sp) || hasVal(o.o2) || hasVal(o.sys) || hasVal(o.dia) || (hasVal(o.bp) && o.bp !== '-/-') || hasVal(o.hr) || hasVal(o.tm) || (o.aIdx !== null && o.aIdx !== undefined && o.aIdx !== '') || hasVal(o.pn);
}

function isBpFilled(x) {
  if (!x) return false;
  const hasL = (x.lSys || x.lDia) || (x.l && x.l !== '-' && x.l !== '-/-');
  const hasS = (x.sSys || x.sDia) || (x.s && x.s !== '-' && x.s !== '-/-');
  const hasSym = Array.isArray(x.sym) && x.sym.length > 0;
  return !!(hasL || hasS || hasSym);
}

function isFluidRowFilled(f) {
  if (!f) return false;
  return (Number(f.i) || 0) > 0 || (Number(f.o) || 0) > 0 || (Number(f.wet) || 0) > 0 || !!f.src;
}

function kvPill(label, valHtml) {
  if (!label) return `<span class="sum-kv"><span class="sum-v">${valHtml}</span></span>`;
  return `<span class="sum-kv"><span class="sum-k">${esc(label)}</span><span class="sum-v">${valHtml}</span></span>`;
}

function timePill(tStr) {
  return `<span class="sum-time ltr-num">${esc(tStr || '--:--')}</span>`;
}

function formatObsLine(o) {
  const acvpuList = getLangList('acvpu');
  const parts = [];
  if (o.rr && o.rr !== '-') parts.push(kvPill(t('rrShort'), `<span class="ltr-num">${esc(o.rr)}</span>`));
  if (o.sp && o.sp !== '-') {
    const o2Txt = (o.o2 && o.o2 !== '-') ? ` (${esc(trCode(o.o2))})` : '';
    parts.push(kvPill(t('spo2Short'), `<span class="ltr-num">${esc(o.sp)}%</span>${o2Txt}`));
  } else if (o.o2 && o.o2 !== '-') {
    parts.push(kvPill(t('o2Short'), esc(trCode(o.o2))));
  }
  if (o.bp && o.bp !== '-' && o.bp !== '-/-') parts.push(kvPill(t('bpShort'), `<span class="ltr-num">${esc(o.bp)}</span>`));
  if (o.hr && o.hr !== '-') parts.push(kvPill(t('pulseShort'), `<span class="ltr-num">${esc(o.hr)}</span>`));
  if (typeof o.aIdx === 'number' && acvpuList[o.aIdx]) parts.push(kvPill(t('acvpuShort'), esc(acvpuList[o.aIdx])));
  if (o.tm && o.tm !== '-') parts.push(kvPill(t('tempLbl'), `<span class="ltr-num">${esc(o.tm)}${esc(o.u || tempUnit)}</span>`));
  if (o.pn !== '' && o.pn !== undefined && o.pn !== null && o.pn !== '-') parts.push(kvPill(t('pain'), `<span class="ltr-num">${esc(o.pn)}/10</span>`));
  return parts.join('');
}

function modEntryCount(b, modId) {
  const p = getPt(b);
  switch (modId) {
    case 'obs': return p.obs.filter(isObsFilled).length;
    case 'bm': return p.bm.filter(x => x.v && String(x.v).trim() !== '').length;
    case 'bp': return p.bp.filter(isBpFilled).length;
    case 'fluid': return p.fluids.reduce((acc, f) => acc + (isFluidRowFilled(f) ? 1 : 0), 0);
    case 'bowel': return p.bowel.filter(x => !!x.a).length;
    case 'amy': return Object.values(p.skin).filter(Boolean).length + p.skinCustom.filter(c => c.site && c.cond).length + (p.skinCare.length > 0 ? 1 : 0) + p.dressings.filter(d => d.l && d.l.trim() !== '').length;
    case 'food': return [p.diet.b, p.diet.l, p.diet.d].filter(Boolean).length + p.diet.supps.length + (p.diet.supp && p.diet.supp.trim() ? 1 : 0) + (p.diet.flags.length > 0 ? 1 : 0);
    case 'turn': return p.turns.filter(tr => !!tr.p).length + ((p.turnFreq || p.turnChecks.length > 0) ? 1 : 0);
    case 'mh': return p.mh.filter(m => m.m || m.r || m.rat || m.n).length + (p.mhLevel ? 1 : 0);
    case 'events': {
      const phrases = getLangList('phrases');
      return p.events.filter(e => getEventText(e, phrases).trim() !== '').length;
    }
    case 'reminders': {
      const taskList = getLangList('tasks');
      return p.reminders.filter(r => !r.done && getTaskText(r, taskList).trim() !== '').length;
    }
    case 'admit': return (p.admit.w || p.admit.h || p.admit.wb || Object.keys(p.admit.items).length > 0 || p.admit.custom.length > 0 || (p.admit.other && p.admit.other.trim() !== '')) ? 1 : 0;
    default: return 0;
  }
}

function hasAnyBedData(b) {
  if (!db[b]) return false;
  return ALL_MODS.some(m => modEntryCount(b, m.id) > 0);
}

function clearExpandedForBed(b) {
  if (!b) return;
  Object.keys(expandedCards).forEach(k => {
    if (k.startsWith(b + '_')) delete expandedCards[k];
  });
}

function migrateExpandedForBed(oldBed, newBed) {
  if (!oldBed || !newBed) return;
  const next = {};
  Object.keys(expandedCards).forEach(k => {
    if (k.startsWith(oldBed + '_')) {
      next[newBed + '_' + k.slice(oldBed.length + 1)] = expandedCards[k];
    } else if (!k.startsWith(newBed + '_')) {
      next[k] = expandedCards[k];
    }
  });
  expandedCards = next;
}

function swapExpandedForBeds(bedA, bedB) {
  if (!bedA || !bedB) return;
  const next = {};
  Object.keys(expandedCards).forEach(k => {
    if (k.startsWith(bedA + '_')) {
      next[bedB + '_' + k.slice(bedA.length + 1)] = expandedCards[k];
    } else if (k.startsWith(bedB + '_')) {
      next[bedA + '_' + k.slice(bedB.length + 1)] = expandedCards[k];
    } else {
      next[k] = expandedCards[k];
    }
  });
  expandedCards = next;
}

function getExpIdx(sec, len) {
  if (len === 0) return -1;
  const key = curBed + '_' + sec;
  if (expandedCards[key] === undefined) {
    expandedCards[key] = len - 1;
  }
  return expandedCards[key];
}

function setExpIdx(sec, idx) {
  const key = curBed + '_' + sec;
  if (expandedCards[key] === undefined) {
    const p = getPt(curBed);
    const len = p[sec] ? p[sec].length : (sec === 'dressings' ? p.dressings.length : 0);
    expandedCards[key] = len - 1;
  }
  expandedCards[key] = (expandedCards[key] === idx) ? -1 : idx;
  renderSection();
}

function renderUI() {
  if (checkShiftExpiry()) return;
  if (typeof sortBedArray === 'function') alloc = sortBedArray(alloc);
  const bedTabs = document.getElementById('bedTabs');
  const subNav = document.getElementById('subNav');
  const activeSecs = getActiveSections();

  let bedHtml = `<button type="button" class="tab-btn ${showSummary ? 'active-summary' : ''}" onclick="toggleSummary(true)">${esc(t('summary'))}</button>`;
  alloc.forEach((b, bIdx) => {
    const isAct = !showSummary && curBed === b;
    const alertDot = hasOverdueTask(b) ? `<span class="alert-dot"></span>` : '';
    bedHtml += `<button type="button" class="tab-btn ${isAct ? 'active-bed' : ''}" onclick="selectBedIdx(${bIdx})">${esc(b)}${alertDot}</button>`;
  });
  bedHtml += `<button type="button" class="tab-btn-add" onclick="toggleQuickAddBed()">+</button>`;
  bedTabs.innerHTML = bedHtml;

  if (showSummary) {
    subNav.classList.add('hidden');
    if (typeof syncNavHeight === 'function') syncNavHeight();
    renderOverdueBanner();
    renderSummary();
    return;
  }

  subNav.classList.remove('hidden');
  if (activeSecs.length > 0 && !activeSecs.some(s => s.id === curSec)) curSec = activeSecs[0].id;

  subNav.innerHTML = activeSecs.map(s => {
    const cnt = modEntryCount(curBed, s.id);
    const badge = cnt > 0 ? `<span class="mod-count">${cnt}</span>` : '';
    const alertDot = (s.id === 'reminders' && hasOverdueTask(curBed)) ? `<span class="alert-dot"></span>` : '';
    return `<button type="button" class="tab-btn ${curSec === s.id ? 'active-sec' : ''}" onclick="selectSec('${s.id}')">${esc(t(s.id))}${badge}${alertDot}</button>`;
  }).join('');

  if (typeof syncNavHeight === 'function') syncNavHeight();
  renderOverdueBanner();
  renderSection();

  setTimeout(() => {
    const actBed = bedTabs.querySelector('.active-bed');
    if (actBed && typeof actBed.scrollIntoView === 'function') {
      actBed.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    const actSub = subNav.querySelector('.active-sec');
    if (actSub && typeof actSub.scrollIntoView === 'function') {
      actSub.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, 10);
}

function refreshSubNavCounts() {
  const subNav = document.getElementById('subNav');
  const bedTabs = document.getElementById('bedTabs');
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
  if (!subNav || showSummary) return;
  const activeSecs = getActiveSections();
  subNav.innerHTML = activeSecs.map(s => {
    const cnt = modEntryCount(curBed, s.id);
    const badge = cnt > 0 ? `<span class="mod-count">${cnt}</span>` : '';
    const alertDot = (s.id === 'reminders' && hasOverdueTask(curBed)) ? `<span class="alert-dot"></span>` : '';
    return `<button type="button" class="tab-btn ${curSec === s.id ? 'active-sec' : ''}" onclick="selectSec('${s.id}')">${esc(t(s.id))}${badge}${alertDot}</button>`;
  }).join('');
}

function selectBedIdx(bIdx) {
  if (!alloc[bIdx]) return;
  saveDB();
  showSummary = false;
  showManageBed = false;
  showQuickAddBed = false;
  curBed = alloc[bIdx];
  activeFluidIdx = typeof getCurrentShiftHourIdx === 'function' ? getCurrentShiftHourIdx() : 0;
  renderUI();
}

function selectSec(s) {
  saveDB();
  showSummary = false;
  curSec = s;
  if (s === 'fluid') {
    activeFluidIdx = typeof getCurrentShiftHourIdx === 'function' ? getCurrentShiftHourIdx() : 0;
  }
  renderUI();
}

function toggleSummary(val) {
  saveDB();
  showSummary = val;
  showManageBed = false;
  showQuickAddBed = false;
  if (val && typeof pushNavState === 'function') pushNavState({ cduSummary: true });
  renderUI();
}

function toggleManageBed() {
  showManageBed = !showManageBed;
  showQuickAddBed = false;
  if (showManageBed && typeof pushNavState === 'function') pushNavState({ cduManageBed: true });
  renderSection();
}

function toggleQuickAddBed() {
  showQuickAddBed = !showQuickAddBed;
  showManageBed = false;
  if (showSummary) showSummary = false;
  if (showQuickAddBed && typeof pushNavState === 'function') pushNavState({ cduQuickAdd: true });
  renderUI();
}

function quickAddBedByIdx(wIdx) { if (wardBeds[wIdx]) quickAddBedToShift(wardBeds[wIdx]); }

function quickAddBedToShift(bedName) {
  const inp = document.getElementById('quickBedInput');
  const val = (bedName || (inp ? inp.value : '')).trim().toUpperCase().slice(0, 4);
  if (!val) return;
  if (!isPro && alloc.length >= FREE_BED_LIMIT && !alloc.includes(val)) { alert(t('proSub')); return; }
  if (!wardBeds.includes(val)) wardBeds.push(val);
  if (!alloc.includes(val)) alloc.push(val);
  curBed = val;
  showQuickAddBed = false;
  saveDB();
  renderUI();
}

function renameCurrentBed() {
  const inp = document.getElementById('renameBedInput');
  const newName = (inp ? inp.value : '').trim().toUpperCase().slice(0, 4);
  if (!newName || newName === curBed) return;
  if (alloc.includes(newName) || hasAnyBedData(newName)) {
    alert(`${newName}: ${t('bedOccupied')}`);
    return;
  }
  db[newName] = db[curBed];
  delete db[curBed];
  migrateExpandedForBed(curBed, newName);
  const idx = alloc.indexOf(curBed);
  if (idx > -1) alloc[idx] = newName;
  const wIdx = wardBeds.indexOf(curBed);
  if (wIdx > -1) wardBeds[wIdx] = newName;
  else wardBeds.push(newName);
  curBed = newName;
  showManageBed = false;
  saveDB();
  renderUI();
}

function transferCurrentBed() {
  const dest = (prompt(t('transferPrompt')) || '').trim().toUpperCase().slice(0, 4);
  if (!dest || dest === curBed) return;
  const destOccupied = alloc.includes(dest) || hasAnyBedData(dest);
  if (destOccupied) {
    const swapMsg = `${dest} ${t('swapConfirm')}`;
    if (!confirm(swapMsg)) return;
    const temp = db[dest];
    db[dest] = db[curBed];
    if (temp !== undefined) {
      db[curBed] = temp;
    } else {
      delete db[curBed];
    }
    swapExpandedForBeds(curBed, dest);
    if (!alloc.includes(dest)) {
      const cIdx = alloc.indexOf(curBed);
      if (cIdx > -1) alloc[cIdx] = dest;
      else alloc.push(dest);
    }
  } else {
    db[dest] = db[curBed];
    delete db[curBed];
    migrateExpandedForBed(curBed, dest);
    const cIdx = alloc.indexOf(curBed);
    if (cIdx > -1) alloc[cIdx] = dest;
    else alloc.push(dest);
  }
  if (!wardBeds.includes(dest)) wardBeds.push(dest);
  curBed = dest;
  showManageBed = false;
  saveDB();
  renderUI();
}

function clearCurrentBed() {
  if (!confirm(t('clearBedConfirm'))) return;
  delete db[curBed];
  clearExpandedForBed(curBed);
  showManageBed = false;
  saveDB();
  renderUI();
}

function removeCurrentBedFromShift() {
  if (!confirm(t('removeBedConfirm'))) return;
  delete db[curBed];
  clearExpandedForBed(curBed);
  alloc = alloc.filter(b => b !== curBed);
  showManageBed = false;
  saveDB();
  if (alloc.length === 0) {
    if (typeof safeRemove === 'function') safeRemove('cdu_start');
    else localStorage.removeItem('cdu_start');
    initSetup();
  } else {
    curBed = alloc[0];
    renderUI();
  }
}

function updateActiveLayoutFromShift() {
  if (!isPro || !activeLayoutName) return;
  layouts[activeLayoutName] = sortBedArray(alloc);
  if (typeof safeSet === 'function') safeSet('cdu_layouts', JSON.stringify(layouts));
  else localStorage.setItem('cdu_layouts', JSON.stringify(layouts));
  alert(`${t('layoutSaved')}: ${activeLayoutName}`);
}

async function toggleWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try {
    if (wakeLockObj) {
      wakeLockWanted = false;
      await wakeLockObj.release();
      wakeLockObj = null;
    } else {
      wakeLockWanted = true;
      wakeLockObj = await navigator.wakeLock.request('screen');
      wakeLockObj.addEventListener('release', () => {
        wakeLockObj = null;
        if (showSummary) renderSummary();
      });
    }
    renderSummary();
  } catch (e) {}
}

function autoJumpBp(val, nextId, minTwoDigit = 60) {
  const s = String(val || '').trim();
  const n = Number(s);
  if (s.length >= 3 || (s.length === 2 && n >= minTwoDigit && n <= 99)) {
    const nextEl = document.getElementById(nextId);
    if (nextEl) { nextEl.focus(); if (nextEl.select) nextEl.select(); }
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
    <button type="button" class="btn-subtle btn-sm" onclick="toggleManageBed()">${esc(t('manageBed'))}</button>
  </div>`;

  if (showQuickAddBed) {
    const unalloc = wardBeds.map((b, idx) => ({ b, idx })).filter(x => !alloc.includes(x.b));
    topHtml += `<div class="manage-panel">
      <div style="font-weight:800; margin-bottom:8px;">${esc(t('quickAddBedTitle'))}</div>
      <div style="display:flex; gap:8px; margin-bottom:8px;">
        <input type="text" id="quickBedInput" maxlength="4" placeholder="${esc(t('bedPh'))}" style="text-transform:uppercase; font-size:1rem;" onkeydown="if(event.key==='Enter'){event.preventDefault();quickAddBedToShift();}">
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
        <input type="text" id="renameBedInput" maxlength="4" value="${esc(curBed)}" style="text-transform:uppercase; font-size:1rem;" onkeydown="if(event.key==='Enter'){event.preventDefault();renameCurrentBed();}">
        <button type="button" class="btn btn-primary btn-sm" onclick="renameCurrentBed()">${esc(t('renameBed'))}</button>
      </div>
      <div class="manage-grid">
        <button type="button" class="btn btn-subtle btn-sm" onclick="transferCurrentBed()">⇄ ${esc(t('transferBed'))}</button>
        <button type="button" class="btn btn-subtle btn-sm" onclick="clearCurrentBed()">${esc(t('clearBed'))}</button>
        <button type="button" class="btn btn-danger btn-sm" style="grid-column:1/-1;" onclick="removeCurrentBedFromShift()">✕ ${esc(t('removeBed'))}</button>
        ${isPro && activeLayoutName ? `<button type="button" class="btn btn-primary btn-sm" style="grid-column:1/-1;" onclick="updateActiveLayoutFromShift()">${esc(t('updLayout'))} "${esc(activeLayoutName)}"</button>` : ''}
      </div>
    </div>`;
  }

  let bodyHtml = '';

  if (curSec === 'obs') {
    const acvpuList = getLangList('acvpu');
    const expIdx = getExpIdx('obs', p.obs.length);
    bodyHtml = p.obs.map((o, i) => {
      if (i !== expIdx && isObsFilled(o)) {
        return `<div class="card entry-card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="setExpIdx('obs', ${i})">
          <div style="line-height:1.8;">${timePill(o.t)}${formatObsLine(o)} <span style="color:var(--teal); font-weight:700; font-size:0.78rem; margin-inline-start:4px;">✎</span></div>
          <button type="button" class="del-btn" onclick="event.stopPropagation(); delItem('obs', ${i})">✕</button>
        </div>`;
      }
      const [sysVal, diaVal] = splitBpParts(o, 'sys', 'dia', 'bp');
      const o2Val = (o.o2 && o.o2 !== '-') ? o.o2 : '';
      const rrVal = (o.rr && o.rr !== '-') ? o.rr : '';
      const spVal = (o.sp && o.sp !== '-') ? o.sp : '';
      const hrVal = (o.hr && o.hr !== '-') ? o.hr : '';
      const tmVal = (o.tm && o.tm !== '-') ? o.tm : '';
      const pnVal = (o.pn !== undefined && o.pn !== null && o.pn !== '-') ? o.pn : '';
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num" style="cursor:pointer;" onclick="setExpIdx('obs', ${i})">${esc(t('obs'))} #${i + 1} ▲</span>
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
              <option value="air" ${o2Val === 'air' ? 'selected' : ''}>${esc(t('air'))}</option>
              <option value="o2Nasal" ${o2Val === 'o2Nasal' ? 'selected' : ''}>${esc(t('o2Nasal'))}</option>
              <option value="o2Mask" ${o2Val === 'o2Mask' ? 'selected' : ''}>${esc(t('o2Mask'))}</option>
              <option value="o2Venturi" ${o2Val === 'o2Venturi' ? 'selected' : ''}>${esc(t('o2Venturi'))}</option>
              <option value="o2" ${o2Val === 'o2' ? 'selected' : ''}>${esc(getOxygenLabel())}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div>
            <label>${esc(t('bpLbl'))}</label>
            <div class="bp-pair">
              <input type="number" id="obsSys_${i}" inputmode="numeric" value="${esc(sysVal)}" oninput="updObsBp(${i}, 'sys', this.value); autoJumpBp(this.value, 'obsDia_${i}', 60)">
              <span>/</span>
              <input type="number" id="obsDia_${i}" inputmode="numeric" value="${esc(diaVal)}" oninput="updObsBp(${i}, 'dia', this.value); autoJumpBp(this.value, 'obsHr_${i}', 40)">
            </div>
          </div>
          <div><label>${esc(t('hrLbl'))}</label><input type="number" id="obsHr_${i}" inputmode="numeric" value="${esc(hrVal)}" oninput="updObsField(${i}, 'hr', this.value)"></div>
        </div>
        <div class="row">
          <div><label>${esc(t('tempLbl'))} (${esc(o.u || tempUnit)})</label><input type="text" inputmode="decimal" value="${esc(tmVal)}" oninput="this.value=normDec(this.value); updObsField(${i}, 'tm', this.value)"></div>
          <div><label>${esc(t('painLbl'))}</label><input type="number" min="0" max="10" inputmode="numeric" value="${esc(pnVal)}" oninput="updObsField(${i}, 'pn', this.value)"></div>
        </div>
        <label>${esc(t('acvpuLbl'))}</label>
        <div class="chip-row" style="margin-bottom:0;">
          ${acvpuList.map((v, idx) => `<span class="chip ${o.aIdx === idx ? 'active' : ''}" onclick="toggleObsAcvpu(${i}, ${idx})">${esc(v)}</span>`).join('')}
        </div>
      </div>`;
    }).join('') + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createObsEntry()">${esc(t('add'))} ${esc(t('obs'))}</button>`;
  }

  else if (curSec === 'bm') {
    const ctxOpts = ['bmPreB','bmPostB','bmPreL','bmPostL','bmPreD','bmPostD','bmBed','bmNight','bmRandom','bmRepeat'];
    const expIdx = getExpIdx('bm', p.bm.length);
    bodyHtml = p.bm.map((b, i) => {
      const flags = Array.isArray(b.f) ? b.f : [];
      if (i !== expIdx && b.v && String(b.v).trim() !== '') {
        return `<div class="card entry-card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="setExpIdx('bm', ${i})">
          <div style="line-height:1.8;">${timePill(b.t)}${kvPill(b.c ? trCode(b.c) : t('bm'), `<span class="ltr-num">${esc(b.v)} ${esc(b.u || bmUnit)}</span>`)}${flags.map(f => kvPill('', esc(trCode(f)))).join('')} <span style="color:var(--teal); font-weight:700; font-size:0.78rem; margin-inline-start:4px;">✎</span></div>
          <button type="button" class="del-btn" onclick="event.stopPropagation(); delItem('bm', ${i})">✕</button>
        </div>`;
      }
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num" style="cursor:pointer;" onclick="setExpIdx('bm', ${i})">${esc(t('bm'))} #${i + 1} ▲</span>
          <button type="button" class="del-btn" onclick="delItem('bm', ${i})">✕</button>
        </div>
        <div class="row">
          <div><label>${esc(t('time'))}</label><input type="time" value="${esc(b.t || '')}" oninput="updBmField(${i}, 't', this.value)"></div>
          <div><label>${esc(t('bmValLbl'))} (${esc(b.u || bmUnit)})</label><input type="text" inputmode="decimal" value="${esc(b.v || '')}" oninput="this.value=normDec(this.value); updBmField(${i}, 'v', this.value)"></div>
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
    const expIdx = getExpIdx('bp', p.bp.length);
    bodyHtml = p.bp.map((x, i) => {
      const [lSys, lDia] = splitBpParts(x, 'lSys', 'lDia', 'l');
      const [sSys, sDia] = splitBpParts(x, 'sSys', 'sDia', 's');
      const syms = Array.isArray(x.sym) ? x.sym : [];
      if (i !== expIdx && isBpFilled(x)) {
        const hasL = x.l && x.l !== '-' && x.l !== '-/-';
        const hasS = x.s && x.s !== '-' && x.s !== '-/-';
        return `<div class="card entry-card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="setExpIdx('bp', ${i})">
          <div style="line-height:1.8;">${timePill(x.t)}${hasL ? kvPill(t('lying'), `<span class="ltr-num">${esc(x.l)}</span>`) : ''}${hasS ? kvPill(t('standing'), `<span class="ltr-num">${esc(x.s)}</span>`) : ''}${syms.map(s => kvPill('', esc(trCode(s)))).join('')} <span style="color:var(--teal); font-weight:700; font-size:0.78rem; margin-inline-start:4px;">✎</span></div>
          <button type="button" class="del-btn" onclick="event.stopPropagation(); delItem('bp', ${i})">✕</button>
        </div>`;
      }
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num" style="cursor:pointer;" onclick="setExpIdx('bp', ${i})">${esc(t('bp'))} #${i + 1} ▲</span>
          <button type="button" class="del-btn" onclick="delItem('bp', ${i})">✕</button>
        </div>
        <div class="row">
          <div><label>${esc(t('time'))}</label><input type="time" value="${esc(x.t || '')}" oninput="updBpField(${i}, 't', this.value)"></div>
        </div>
        <div class="row">
          <div>
            <label>${esc(t('lying'))} — ${esc(t('bpLbl'))}</label>
            <div class="bp-pair">
              <input type="number" id="bpLSys_${i}" inputmode="numeric" value="${esc(lSys)}" oninput="updBpPair(${i}, 'l', 'Sys', this.value); autoJumpBp(this.value, 'bpLDia_${i}', 60)">
              <span>/</span>
              <input type="number" id="bpLDia_${i}" inputmode="numeric" value="${esc(lDia)}" oninput="updBpPair(${i}, 'l', 'Dia', this.value); autoJumpBp(this.value, 'bpSSys_${i}', 40)">
            </div>
          </div>
        </div>
        <div class="row">
          <div>
            <label>${esc(t('standing'))} — ${esc(t('bpLbl'))}</label>
            <div class="bp-pair">
              <input type="number" id="bpSSys_${i}" inputmode="numeric" value="${esc(sSys)}" oninput="updBpPair(${i}, 's', 'Sys', this.value); autoJumpBp(this.value, 'bpSDia_${i}', 60)">
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

    bodyHtml = `<div id="fluidStickyCard" class="card fluid-sticky-card ${activeFluidType === 'o' ? 'out-active' : ''}">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.82rem; font-weight:700; color:var(--text-sub); flex-wrap:wrap; gap:6px;">
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <span id="flHdrStatus">${esc(t('time'))}: <strong class="ltr-num" style="color:var(--teal);">${esc(actHr)}</strong></span>
          <button type="button" id="flModeInBtn" class="fl-mode-pill ${activeFluidType === 'i' ? 'active-in' : ''}" onclick="setFluidMode('i')">${esc(t('flIn'))}</button>
          <button type="button" id="flModeOutBtn" class="fl-mode-pill ${activeFluidType === 'o' ? 'active-out' : ''}" onclick="setFluidMode('o')">${esc(t('flOut'))}</button>
        </div>
        <span id="flHdrTotal"><strong>${esc(t('flTotal'))}:</strong> ${esc(t('flIn'))} <b class="ltr-num">${totI}ml</b> | ${esc(t('flOut'))} <b class="ltr-num">${totO}ml</b> | <b class="ltr-num">${net > 0 ? '+' + net : net}ml</b></span>
      </div>
      <div class="fluid-btn-grid" style="margin-bottom:8px;">
        ${[50, 100, 150, 200, 250, 500].map(v => `<button type="button" data-vol="${v}" class="quick-fluid-btn ${activeFluidType === 'o' ? 'out-mode' : ''}" onclick="addQuickFluid(${v})"><span class="ltr-num">+${v}ml</span> ${esc(activeFluidType === 'i' ? t('flIn') : t('flOut'))}</button>`).join('')}
      </div>
      <div style="display:flex; gap:6px; margin-bottom:8px;">
        <input type="number" id="customFluidMl" inputmode="numeric" placeholder="${esc(t('customMlPh'))}" style="flex:1; font-size:1rem;" onkeydown="if(event.key==='Enter'){event.preventDefault();addCustomFluid();}">
        <button type="button" id="btnAddCustomFl" class="btn btn-primary btn-sm" style="${activeFluidType === 'o' ? 'background:var(--amber);' : ''}" onclick="addCustomFluid()">${esc(t('add'))} (${esc(activeFluidType === 'i' ? t('flIn') : t('flOut'))})</button>
      </div>
      <div class="chip-row" id="flSrcChips" style="margin-bottom:0;">
        ${['srcPu','srcCath','srcBowel','srcVomit'].map(sc => {
          const curSrc = p.fluids[activeFluidIdx] ? p.fluids[activeFluidIdx].src : '';
          return `<span class="chip ${curSrc === sc ? 'active-amber' : ''}" data-src="${sc}" onclick="setFluidSource('${sc}')">${esc(t(sc))}</span>`;
        }).join('')}
        <span class="chip" onclick="addWetPad()"><span class="ltr-num">+1</span>&nbsp;${esc(t('wetPad'))}</span>
      </div>
    </div>
    <div class="card">
      <div style="display:flex; gap:6px; padding:4px 0; font-size:0.74rem; font-weight:700; color:var(--text-sub); border-bottom:1.5px solid var(--border);">
        <div style="flex:0 0 54px; text-align:center;">${esc(t('time'))}</div>
        <div style="flex:1;">${esc(t('flIn'))} (ml)</div>
        <div style="flex:1;">${esc(t('flOut'))} (ml)</div>
        <div style="flex:0 0 42px;"></div>
      </div>
      <div id="fluidRows">
        ${p.fluids.map((f, idx) => `<div class="hour-row">
          <div id="flHr_${idx}" class="hour-badge ltr-num ${activeFluidIdx === idx ? 'active-hr' : ''}" onclick="selectFluidHour(${idx})">${esc(f.t)}</div>
          <div style="flex:1; min-width:0;">
            <input id="flIn_${idx}" type="number" inputmode="numeric" class="${activeFluidIdx === idx && activeFluidType === 'i' ? 'fl-target-in' : ''}" value="${f.i || ''}" onfocus="setFluidTarget(${idx}, 'i')" oninput="updFluid(${idx}, 'i', this.value)">
          </div>
          <div style="flex:1; min-width:0;">
            <input id="flOut_${idx}" type="number" inputmode="numeric" class="${activeFluidIdx === idx && activeFluidType === 'o' ? 'fl-target-out' : ''}" value="${f.o || ''}" onfocus="setFluidTarget(${idx}, 'o')" oninput="updFluid(${idx}, 'o', this.value)">
            ${(f.src || f.wet) ? `<div style="font-size:0.7rem; color:var(--amber); font-weight:700; margin-top:2px; display:flex; align-items:center; gap:4px; flex-wrap:wrap;">
              ${f.src ? `<span>${esc(trCode(f.src))}</span>` : ''}
              ${f.wet ? `<span onclick="decWetPad(${idx})" style="cursor:pointer; text-decoration:underline;">${esc(t('wetPad'))} <span class="ltr-num">x${f.wet}</span> (✕)</span>` : ''}
            </div>` : ''}
          </div>
          <div style="flex:0 0 42px; text-align:end;">
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
    const expIdx = getExpIdx('bowel', p.bowel.length);
    bodyHtml = p.bowel.map((b, i) => {
      if (i !== expIdx && b.a) {
        const sumTxt = b.a === 'bno'
          ? kvPill('', esc(t('bnoFull')))
          : `${kvPill(t('amt'), esc(trCode(b.a)))}${b.ty ? kvPill('', esc(trCode(b.ty))) : ''}${b.m ? kvPill('', esc(trCode(b.m))) : ''}`;
        return `<div class="card entry-card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="setExpIdx('bowel', ${i})">
          <div style="line-height:1.8;">${timePill(b.t)}${sumTxt} <span style="color:var(--teal); font-weight:700; font-size:0.78rem; margin-inline-start:4px;">✎</span></div>
          <button type="button" class="del-btn" onclick="event.stopPropagation(); delItem('bowel', ${i})">✕</button>
        </div>`;
      }
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num" style="cursor:pointer;" onclick="setExpIdx('bowel', ${i})">${esc(t('bowel'))} #${i + 1} ▲</span>
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
      </div>`;
    }).join('') + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createBowelEntry()">${esc(t('add'))} ${esc(t('bowel'))}</button>`;
  }

  else if (curSec === 'amy') {
    const skinStates = ['', 'intact', 'blanching', 'nonBlanch', 'moisture', 'broken', 'tear', 'drySkin'];
    const coreSites = ['sacrum', 'groin', 'heels', 'elbows'];
    const extraSites = ['siteHip','siteAnkle','siteShin','siteFoot','siteArm','siteSpine','siteShoulder','siteEar','siteOther'];
    const sides = ['', 'sideL', 'sideR', 'sideBoth'];
    const drSites = getLangList('drSites');
    const expDrIdx = getExpIdx('dressings', p.dressings.length);

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
            <label>${esc(t('sideLbl'))}</label>
            <select onchange="updCustomSkinField(${idx}, 'side', this.value)">
              ${sides.map(s => `<option value="${s}" ${c.side === s ? 'selected' : ''}>${s ? esc(t(s)) : '—'}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="row" style="margin-bottom:0;">
          <div>
            <label>${esc(t('statusLbl'))}</label>
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

    const drCardsHtml = p.dressings.map((d, i) => {
      if (i !== expDrIdx && d.l && d.l.trim() !== '') {
        const drSummary = [
          kvPill(t('dressing'), esc(d.l)),
          d.st ? kvPill('', esc(trCode(d.st))) : '',
          d.f ? kvPill(t('due'), esc(calcDue(d.dt || todayIsoStr(), d.f))) : kvPill(t('date'), esc(formatIsoDate(d.dt || todayIsoStr())))
        ].join('');
        return `<div class="card entry-card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="setExpIdx('dressings', ${i})">
          <div style="line-height:1.8;">${drSummary} <span style="color:var(--teal); font-weight:700; font-size:0.78rem; margin-inline-start:4px;">✎</span></div>
          <button type="button" class="del-btn" onclick="event.stopPropagation(); delDressing(${i})">✕</button>
        </div>`;
      }
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num" style="cursor:pointer;" onclick="setExpIdx('dressings', ${i})">${esc(t('dressing'))} #${i + 1} ▲</span>
          <button type="button" class="del-btn" onclick="delDressing(${i})">✕</button>
        </div>
        <div class="chip-row">
          ${drSites.map((ds, sIdx) => `<span class="chip ${d.l === ds ? 'active' : ''}" onclick="setDrCardSite(${i}, ${sIdx})">${esc(ds)}</span>`).join('')}
        </div>
        <div class="row">
          <div><label>${esc(t('locNotes'))}</label><input type="text" id="drLoc_${i}" value="${esc(d.l || '')}" oninput="updDressingField(${i}, 'l', this.value)"></div>
          <div>
            <label>${esc(t('dueIn'))}</label>
            <select onchange="updDressingField(${i}, 'f', this.value ? parseInt(this.value, 10) : 0, true)">
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
      </div>`;
    }).join('');

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
        <input type="text" id="suppInput" value="${esc(p.diet.supp || '')}" oninput="updSuppText(this.value)" onkeydown="if(event.key==='Enter'){event.preventDefault();addCustomSupp();}">
        <button type="button" class="btn btn-primary btn-sm" onclick="addCustomSupp()">${esc(t('add'))}</button>
      </div>
      ${p.diet.supps.map((s, idx) => `<div style="display:flex; justify-content:space-between; align-items:center; padding:6px 10px; background:var(--bg); border-radius:6px; margin-bottom:6px; font-size:0.86rem;">
        <span>${timePill(s.t)} ${kvPill('', esc(trCode(s.v)))}</span>
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
    const expTurnIdx = getExpIdx('turns', p.turns.length);
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

    const listHtml = p.turns.map((tr, i) => {
      if (i !== expTurnIdx && tr.p) {
        return `<div class="card entry-card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="setExpIdx('turns', ${i})">
          <div style="line-height:1.8;">${timePill(tr.t)}${kvPill(t('posLbl'), esc(trCode(tr.p)))} <span style="color:var(--teal); font-weight:700; font-size:0.78rem; margin-inline-start:4px;">✎</span></div>
          <button type="button" class="del-btn" onclick="event.stopPropagation(); delItem('turns', ${i})">✕</button>
        </div>`;
      }
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num" style="cursor:pointer;" onclick="setExpIdx('turns', ${i})">${esc(t('turn'))} #${i + 1} ▲</span>
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
      </div>`;
    }).join('');

    bodyHtml = planCard + listHtml + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createTurnEntry()">${esc(t('turnNow'))}</button>`;
  }

  else if (curSec === 'mh') {
    const lvlOpts = ['', 'lvl1', 'lvl2', 'lvl3', 'lvl4'];
    const moodOpts = ['calm', 'anxious', 'agitated', 'low', 'confused', 'vocal', 'elevated', 'hostile'];
    const locOpts = ['asleep', 'settled', 'mhChair', 'restless', 'mhBath', 'mhCommunal', 'mhVisit', 'outOfBed'];
    const ratOpts = ['mhRatRoutine', 'mhRatEngage', 'mhRatDeesc', 'mhRatReorient', 'mhRatEnv', 'mhRatFluids', 'mhRatPrn', 'mhRatEsc'];
    const expIdx = getExpIdx('mh', p.mh.length);

    const lvlCard = `<div class="card">
      <label>${esc(t('obsLevel'))}</label>
      <select onchange="setMhLevel(this.value)">
        ${lvlOpts.map(k => `<option value="${k}" ${p.mhLevel === k ? 'selected' : ''}>${k ? esc(t(k)) : '—'}</option>`).join('')}
      </select>
    </div>`;

    const listHtml = p.mh.map((m, i) => {
      if (i !== expIdx && (m.m || m.r || m.rat || m.n)) {
        return `<div class="card entry-card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="setExpIdx('mh', ${i})">
          <div style="line-height:1.8;">${timePill(m.t)}${m.m ? kvPill(t('mood'), esc(trCode(m.m))) : ''}${m.r ? kvPill('', esc(trCode(m.r))) : ''}${m.rat ? kvPill('', esc(trCode(m.rat))) : ''}${m.n ? kvPill('', esc(m.n)) : ''} <span style="color:var(--teal); font-weight:700; font-size:0.78rem; margin-inline-start:4px;">✎</span></div>
          <button type="button" class="del-btn" onclick="event.stopPropagation(); delItem('mh', ${i})">✕</button>
        </div>`;
      }
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num" style="cursor:pointer;" onclick="setExpIdx('mh', ${i})">${esc(t('mh'))} #${i + 1} ▲</span>
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
      </div>`;
    }).join('');

    bodyHtml = lvlCard + listHtml + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createMhEntry()">${esc(t('add'))} ${esc(t('mh'))}</button>`;
  }

  else if (curSec === 'events') {
    const phrases = getLangList('phrases');
    const expEvIdx = getExpIdx('events', p.events.length);
    const quickCard = `<div class="card">
      <label>${esc(t('events'))}</label>
      <div class="chip-row" style="margin-bottom:0;">
        ${phrases.map((ph, idx) => `<span class="chip" onclick="addQuickPhrase(${idx})">+ ${esc(ph)}</span>`).join('')}
      </div>
    </div>`;

    const listHtml = p.events.map((e, i) => {
      const noteTxt = getEventText(e, phrases);
      if (i !== expEvIdx && noteTxt.trim() !== '') {
        return `<div class="card entry-card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="setExpIdx('events', ${i})">
          <div style="line-height:1.8;">${timePill(e.t)}<span style="font-weight:700;">${esc(noteTxt)}</span>${e.o ? ' ' + kvPill(t('outcome'), esc(e.o)) : ''} <span style="color:var(--teal); font-weight:700; font-size:0.78rem; margin-inline-start:4px;">✎</span></div>
          <button type="button" class="del-btn" onclick="event.stopPropagation(); delItem('events', ${i})">✕</button>
        </div>`;
      }
      return `<div class="card entry-card">
        <div class="entry-hdr">
          <span class="entry-num" style="cursor:pointer;" onclick="setExpIdx('events', ${i})">${esc(t('events'))} #${i + 1} ▲</span>
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
    const expIdx = getExpIdx('reminders', p.reminders.length);
    const offsets = [
      [15, `+15${t('minShort')}`],
      [30, `+30${t('minShort')}`],
      [60, `+1${t('hrShort')}`],
      [120, `+2${t('hrShort')}`],
      [240, `+4${t('hrShort')}`]
    ];
    const quickCard = `<div class="card">
      <label>${esc(t('reminders'))}</label>
      <div class="chip-row" style="margin-bottom:0;">
        ${taskList.map((tk, idx) => `<span class="chip" onclick="quickAddTaskPreset(${idx})">+ ${esc(tk)}</span>`).join('')}
      </div>
    </div>`;

    const listHtml = p.reminders.map((r, i) => {
      const tkTxt = getTaskText(r, taskList);
      const overdue = isTaskOverdue(r);
      if (i !== expIdx && tkTxt.trim()) {
        return `<div id="taskCard_${i}" class="card entry-card ${overdue ? 'task-alert' : ''}" style="display:flex; justify-content:space-between; align-items:center;">
          <label style="display:flex; align-items:center; gap:8px; margin:0; font-size:0.92rem; color:var(--text); cursor:pointer; flex:1;" onclick="event.stopPropagation()">
            <input type="checkbox" ${r.done ? 'checked' : ''} onchange="toggleTaskDone(${i})">
            <span id="taskBadge_${i}" class="task-badge ${overdue ? 'overdue' : ''}">${r.done ? esc(t('done')) : (overdue ? esc(t('overdue')) : esc(t('due')) + ' ' + esc(r.due || '--:--'))}</span>
            <span style="${r.done ? 'text-decoration:line-through; opacity:0.55;' : 'font-weight:700;'}" onclick="event.preventDefault(); setExpIdx('reminders', ${i})">${esc(tkTxt)} <span style="color:var(--teal); font-size:0.78rem;">✎</span></span>
          </label>
          <button type="button" class="del-btn" onclick="delItem('reminders', ${i})">✕</button>
        </div>`;
      }
      return `<div id="taskCard_${i}" class="card entry-card ${overdue ? 'task-alert' : ''}">
        <div class="entry-hdr">
          <label style="display:flex; align-items:center; gap:8px; margin:0; font-size:0.9rem; color:var(--text); cursor:pointer;">
            <input type="checkbox" ${r.done ? 'checked' : ''} onchange="toggleTaskDone(${i})">
            <span id="taskBadge_${i}" class="task-badge ${overdue ? 'overdue' : ''}">${r.done ? esc(t('done')) : (overdue ? esc(t('overdue')) : esc(t('due')) + ' ' + esc(r.due || '--:--'))}</span>
          </label>
          <div style="display:flex; align-items:center; gap:4px;">
            <button type="button" class="btn-subtle btn-sm" style="padding:2px 8px; font-size:0.74rem;" onclick="setExpIdx('reminders', ${i})">▲</button>
            <button type="button" class="del-btn" onclick="delItem('reminders', ${i})">✕</button>
          </div>
        </div>
        <div class="chip-row" style="margin-bottom:8px;">
          ${offsets.map(([mins, lbl]) => `<span class="chip" onclick="setTaskOffset(${i}, ${mins})"><span class="ltr-num">${esc(lbl)}</span></span>`).join('')}
        </div>
        <div class="row" style="margin-bottom:0;">
          <div style="flex:0 0 134px;"><label>${esc(t('dueTime'))}</label><input type="time" value="${esc(r.due || '')}" oninput="updTaskDue(${i}, this.value)"></div>
          <div><label>${esc(t('reminders'))}</label><input type="text" value="${esc(tkTxt)}" oninput="updTaskText(${i}, this.value)"></div>
        </div>
      </div>`;
    }).join('');

    bodyHtml = quickCard + listHtml + `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="createTaskEntry()">${esc(t('add'))} ${esc(t('reminders'))}</button>`;
  }

  else if (curSec === 'admit') {
    const admitList = getLangList('admits');
    const locs = ['locPt', 'locSafe', 'locHome'];
    const selectedStdKeys = Object.keys(p.admit.items);

    bodyHtml = `<div class="card">
      <div class="row">
        <div><label>${esc(t('weight'))}</label><input type="text" inputmode="decimal" value="${esc(p.admit.w)}" oninput="this.value=normDec(this.value); updAdmitField('w', this.value)"></div>
        <div><label>${esc(t('height'))}</label><input type="text" inputmode="decimal" value="${esc(p.admit.h)}" oninput="this.value=normDec(this.value); updAdmitField('h', this.value)"></div>
      </div>
      <div style="margin-bottom:12px;">
        <span class="chip ${p.admit.wb ? 'active' : ''}" onclick="updAdmitField('wb', !getPt(curBed).admit.wb); renderSection();">✓ ${esc(t('wristband'))}</span>
      </div>
      <label>${esc(t('admit'))}</label>
      <div class="chip-row">
        ${admitList.map((itemLbl, idx) => {
          const isOn = p.admit.items['std_' + idx] !== undefined;
          return `<span class="chip ${isOn ? 'active' : ''}" onclick="toggleAdmitStdItem(${idx})">${isOn ? '✓ ' : '+ '}${esc(itemLbl)}</span>`;
        }).join('')}
      </div>
      <div style="display:flex; gap:8px; margin-bottom:12px;">
        <input type="text" id="admitCustomInput" placeholder="${esc(t('otherItemPh'))}" value="${esc(p.admit.other || '')}" oninput="updAdmitField('other', this.value)" onkeydown="if(event.key==='Enter'){event.preventDefault();addAdmitCustomItem();}">
        <button type="button" class="btn btn-primary btn-sm" onclick="addAdmitCustomItem()">${esc(t('add'))}</button>
      </div>
      ${selectedStdKeys.map(k => {
        const idx = parseInt(k.replace('std_', ''), 10);
        const lbl = !isNaN(idx) && admitList[idx] ? admitList[idx] : k;
        const curLoc = p.admit.items[k] || '';
        return `<div style="display:flex; justify-content:space-between; align-items:center; gap:6px; padding:8px 10px; background:var(--bg); border-radius:8px; border:1px solid var(--border); margin-bottom:6px; flex-wrap:wrap;">
          <span style="font-weight:700; font-size:0.86rem;">${esc(lbl)}</span>
          <div style="display:flex; gap:4px; align-items:center; flex-wrap:wrap;">
            ${locs.map(lc => `<span class="chip ${curLoc === lc ? 'active' : ''}" style="padding:4px 8px; font-size:0.74rem;" onclick="setAdmitStdLoc('${k}', '${lc}')">${esc(t(lc))}</span>`).join('')}
            <button type="button" class="del-btn" onclick="toggleAdmitStdItem(${idx})">✕</button>
          </div>
        </div>`;
      }).join('')}
      ${p.admit.custom.map((ci, cIdx) => `<div style="display:flex; justify-content:space-between; align-items:center; gap:6px; padding:8px 10px; background:var(--bg); border-radius:8px; border:1px solid var(--border); margin-bottom:6px; flex-wrap:wrap;">
        <span style="font-weight:700; font-size:0.86rem;">${esc(ci.name)}</span>
        <div style="display:flex; gap:4px; align-items:center; flex-wrap:wrap;">
          ${locs.map(lc => `<span class="chip ${ci.loc === lc ? 'active' : ''}" style="padding:4px 8px; font-size:0.74rem;" onclick="setAdmitCustomLoc(${cIdx}, '${lc}')">${esc(t(lc))}</span>`).join('')}
          <button type="button" class="del-btn" onclick="delAdmitCustomItem(${cIdx})">✕</button>
        </div>
      </div>`).join('')}
    </div>`;
  }

  area.innerHTML = topHtml + bodyHtml;
  area.querySelectorAll('textarea').forEach(ta => {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  });
}

function createObsEntry() {
  const p = getPt(curBed);
  p.obs.push({ t: nowTimeStr(), rr: '', sp: '', o2: '', sys: '', dia: '', bp: '-', hr: '', tm: '', u: tempUnit, aIdx: null, pn: '', done: false });
  expandedCards[curBed + '_obs'] = p.obs.length - 1;
  saveDB(); renderUI();
}
function updObsField(idx, k, val) { const p = getPt(curBed); if (!p.obs[idx]) return; p.obs[idx][k] = val; p.obs[idx].done = false; saveDB(); refreshSubNavCounts(); }
function toggleObsAcvpu(idx, aIdx) {
  const p = getPt(curBed); if (!p.obs[idx]) return;
  p.obs[idx].aIdx = (p.obs[idx].aIdx === aIdx) ? null : aIdx;
  p.obs[idx].done = false; saveDB(); renderSection(); refreshSubNavCounts();
}
function updObsBp(idx, part, val) {
  const p = getPt(curBed); if (!p.obs[idx]) return;
  const o = p.obs[idx]; const [curSys, curDia] = splitBpParts(o, 'sys', 'dia', 'bp');
  o.sys = part === 'sys' ? val.trim() : curSys; o.dia = part === 'dia' ? val.trim() : curDia;
  o.bp = (o.sys || o.dia) ? `${o.sys || '-'}/${o.dia || '-'}` : '-'; o.done = false; saveDB(); refreshSubNavCounts();
}

function createBmEntry() {
  const p = getPt(curBed);
  p.bm.push({ t: nowTimeStr(), v: '', u: bmUnit, c: '', f: [], done: false });
  expandedCards[curBed + '_bm'] = p.bm.length - 1;
  saveDB(); renderUI();
}
function updBmField(idx, k, val) { const p = getPt(curBed); if (!p.bm[idx]) return; p.bm[idx][k] = val; p.bm[idx].done = false; saveDB(); refreshSubNavCounts(); }
function toggleBmFlag(idx, code) {
  const p = getPt(curBed); if (!p.bm[idx]) return;
  if (!Array.isArray(p.bm[idx].f)) p.bm[idx].f = [];
  const pos = p.bm[idx].f.indexOf(code);
  if (pos > -1) p.bm[idx].f.splice(pos, 1); else p.bm[idx].f.push(code);
  p.bm[idx].done = false; saveDB(); renderSection();
}

function createBpEntry() {
  const p = getPt(curBed);
  p.bp.push({ t: nowTimeStr(), lSys: '', lDia: '', sSys: '', sDia: '', l: '-', s: '-', sym: [], done: false });
  expandedCards[curBed + '_bp'] = p.bp.length - 1;
  saveDB(); renderUI();
}
function updBpField(idx, k, val) { const p = getPt(curBed); if (!p.bp[idx]) return; p.bp[idx][k] = val; p.bp[idx].done = false; saveDB(); }
function updBpPair(idx, posKey, part, val) {
  const p = getPt(curBed); if (!p.bp[idx]) return;
  const x = p.bp[idx]; const [curSys, curDia] = splitBpParts(x, posKey + 'Sys', posKey + 'Dia', posKey);
  x[posKey + 'Sys'] = part === 'Sys' ? val.trim() : curSys; x[posKey + 'Dia'] = part === 'Dia' ? val.trim() : curDia;
  const s = x[posKey + 'Sys'], d = x[posKey + 'Dia'];
  x[posKey] = (s || d) ? `${s || '-'}/${d || '-'}` : '-'; x.done = false; saveDB(); refreshSubNavCounts();
}
function toggleBpSym(idx, code) {
  const p = getPt(curBed); if (!p.bp[idx]) return;
  if (!Array.isArray(p.bp[idx].sym)) p.bp[idx].sym = [];
  const arr = p.bp[idx].sym, pos = arr.indexOf(code);
  if (pos > -1) arr.splice(pos, 1);
  else if (code === 'noSym') p.bp[idx].sym = ['noSym'];
  else { const noPos = arr.indexOf('noSym'); if (noPos > -1) arr.splice(noPos, 1); arr.push(code); }
  p.bp[idx].done = false; saveDB(); renderSection(); refreshSubNavCounts();
}

function selectFluidHour(idx) {
  setFluidTarget(idx, activeFluidType);
}

function setFluidMode(type) {
  setFluidTarget(activeFluidIdx, type);
}

function setFluidTarget(idx, type) {
  activeFluidIdx = idx; activeFluidType = type;
  const p = getPt(curBed);
  for (let i = 0; i < 12; i++) {
    const inEl = document.getElementById('flIn_' + i), outEl = document.getElementById('flOut_' + i), hrEl = document.getElementById('flHr_' + i);
    if (inEl) inEl.classList.toggle('fl-target-in', i === idx && type === 'i');
    if (outEl) outEl.classList.toggle('fl-target-out', i === idx && type === 'o');
    if (hrEl) hrEl.classList.toggle('active-hr', i === idx);
  }
  const stickyCard = document.getElementById('fluidStickyCard');
  if (stickyCard) stickyCard.classList.toggle('out-active', type === 'o');
  const modeInBtn = document.getElementById('flModeInBtn');
  const modeOutBtn = document.getElementById('flModeOutBtn');
  if (modeInBtn) modeInBtn.classList.toggle('active-in', type === 'i');
  if (modeOutBtn) modeOutBtn.classList.toggle('active-out', type === 'o');

  document.querySelectorAll('.quick-fluid-btn').forEach(btn => {
    btn.classList.toggle('out-mode', type === 'o');
    const vol = btn.getAttribute('data-vol');
    if (vol) btn.innerHTML = `<span class="ltr-num">+${vol}ml</span> ${esc(type === 'i' ? t('flIn') : t('flOut'))}`;
  });
  const customBtn = document.getElementById('btnAddCustomFl');
  if (customBtn) {
    customBtn.style.background = type === 'o' ? 'var(--amber)' : '';
    customBtn.textContent = `${t('add')} (${type === 'i' ? t('flIn') : t('flOut')})`;
  }
  const stEl = document.getElementById('flHdrStatus'), actHr = p.fluids[idx] ? p.fluids[idx].t : '';
  if (stEl) stEl.innerHTML = `${esc(t('time'))}: <strong class="ltr-num" style="color:var(--teal);">${esc(actHr)}</strong>`;
  const curSrc = p.fluids[idx] ? p.fluids[idx].src : '';
  document.querySelectorAll('#flSrcChips .chip[data-src]').forEach(ch => ch.classList.toggle('active-amber', ch.getAttribute('data-src') === curSrc));
}

function updFluid(idx, type, val) {
  const p = getPt(curBed); if (!p.fluids[idx]) return;
  p.fluids[idx][type] = Math.max(0, parseInt(val, 10) || 0); p.fluids[idx].done = false; saveDB();
  let totI = 0, totO = 0;
  p.fluids.forEach(f => { totI += (Number(f.i) || 0); totO += (Number(f.o) || 0); });
  const net = totI - totO, totEl = document.getElementById('flHdrTotal');
  if (totEl) totEl.innerHTML = `<strong>${esc(t('flTotal'))}:</strong> ${esc(t('flIn'))} <b class="ltr-num">${totI}ml</b> | ${esc(t('flOut'))} <b class="ltr-num">${totO}ml</b> | <b class="ltr-num">${net > 0 ? '+' + net : net}ml</b>`;
  refreshSubNavCounts();
}

function addQuickFluid(vol) {
  const p = getPt(curBed);
  if (!p.fluids[activeFluidIdx]) activeFluidIdx = 0;
  p.fluids[activeFluidIdx][activeFluidType] = (Number(p.fluids[activeFluidIdx][activeFluidType]) || 0) + vol;
  p.fluids[activeFluidIdx].done = false;
  saveDB();
  renderSection();
  refreshSubNavCounts();
}

function addCustomFluid() {
  const inp = document.getElementById('customFluidMl');
  const vol = Math.max(0, parseInt(inp ? inp.value : '', 10) || 0);
  if (!vol) return;
  const p = getPt(curBed);
  if (!p.fluids[activeFluidIdx]) activeFluidIdx = 0;
  p.fluids[activeFluidIdx][activeFluidType] = (Number(p.fluids[activeFluidIdx][activeFluidType]) || 0) + vol;
  p.fluids[activeFluidIdx].done = false;
  if (inp) inp.value = '';
  saveDB();
  renderSection();
  refreshSubNavCounts();
}

function setFluidSource(sc) {
  const p = getPt(curBed);
  if (!p.fluids[activeFluidIdx]) activeFluidIdx = 0;
  p.fluids[activeFluidIdx].src = (p.fluids[activeFluidIdx].src === sc) ? '' : sc;
  p.fluids[activeFluidIdx].done = false;
  activeFluidType = 'o';
  saveDB();
  renderSection();
  refreshSubNavCounts();
}

function addWetPad() {
  const p = getPt(curBed);
  if (!p.fluids[activeFluidIdx]) activeFluidIdx = 0;
  p.fluids[activeFluidIdx].wet = (Number(p.fluids[activeFluidIdx].wet) || 0) + 1;
  p.fluids[activeFluidIdx].done = false;
  saveDB();
  renderSection();
  refreshSubNavCounts();
}

function decWetPad(idx) {
  const p = getPt(curBed);
  if (!p.fluids[idx]) return;
  p.fluids[idx].wet = Math.max(0, (Number(p.fluids[idx].wet) || 0) - 1);
  p.fluids[idx].done = false;
  saveDB();
  renderSection();
  refreshSubNavCounts();
}

function clrFluidRow(idx) {
  if (!confirm(t('delConfirm'))) return;
  const p = getPt(curBed);
  if (!p.fluids[idx]) return;
  p.fluids[idx] = { t: p.fluids[idx].t, i: 0, o: 0, src: '', wet: 0, done: false };
  saveDB();
  renderSection();
  refreshSubNavCounts();
}

function createBowelEntry() {
  const p = getPt(curBed);
  p.bowel.push({ t: nowTimeStr(), a: '', ty: '', m: '', done: false });
  expandedCards[curBed + '_bowel'] = p.bowel.length - 1;
  saveDB(); renderUI();
}
function updBowelField(idx, k, val, rerender) {
  const p = getPt(curBed); if (!p.bowel[idx]) return;
  p.bowel[idx][k] = val;
  if (k === 'a' && val === 'bno') { p.bowel[idx].ty = ''; p.bowel[idx].m = ''; }
  p.bowel[idx].done = false; saveDB(); refreshSubNavCounts(); if (rerender) renderSection();
}

function updSkin(site, val) { const p = getPt(curBed); p.skin[site] = val; p.skinDone = false; saveDB(); renderUI(); }
function markAllSkinIntact() {
  const p = getPt(curBed), core = ['sacrum', 'groin', 'heels', 'elbows'];
  const allIntact = core.every(s => p.skin[s] === 'intact');
  if (allIntact) core.forEach(s => { p.skin[s] = ''; });
  else core.forEach(s => { if (!p.skin[s]) p.skin[s] = 'intact'; });
  p.skinDone = false; saveDB(); renderUI();
}
function createCustomSkin() { const p = getPt(curBed); p.skinCustom.push({ site: '', side: '', cond: '' }); p.skinDone = false; saveDB(); renderUI(); }
function updCustomSkinField(idx, k, val) { const p = getPt(curBed); if (!p.skinCustom[idx]) return; p.skinCustom[idx][k] = val; p.skinDone = false; saveDB(); refreshSubNavCounts(); }
function delCustomSkin(idx) {
  if (!confirm(t('delConfirm'))) return;
  const p = getPt(curBed);
  p.skinCustom.splice(idx, 1);
  p.skinDone = false; saveDB(); renderUI();
}
function toggleSkinCare(ck) { const p = getPt(curBed), pos = p.skinCare.indexOf(ck); if (pos > -1) p.skinCare.splice(pos, 1); else p.skinCare.push(ck); p.skinDone = false; saveDB(); renderUI(); }

function createDressingEntry() {
  const p = getPt(curBed);
  p.dressings.push({ l: '', dt: todayIsoStr(), f: 0, st: '', done: false });
  expandedCards[curBed + '_dressings'] = p.dressings.length - 1;
  saveDB(); renderUI();
}
function setDrCardSite(idx, siteIdx) { const p = getPt(curBed), drSites = getLangList('drSites'); if (!p.dressings[idx] || !drSites[siteIdx]) return; p.dressings[idx].l = (p.dressings[idx].l === drSites[siteIdx]) ? '' : drSites[siteIdx]; p.dressings[idx].done = false; saveDB(); renderUI(); }
function updDressingField(idx, k, val, rerender) { const p = getPt(curBed); if (!p.dressings[idx]) return; p.dressings[idx][k] = val; p.dressings[idx].done = false; saveDB(); refreshSubNavCounts(); if (rerender) renderSection(); }
function toggleDressingStatus(idx, stCode) { const p = getPt(curBed); if (!p.dressings[idx]) return; p.dressings[idx].st = (p.dressings[idx].st === stCode) ? '' : stCode; p.dressings[idx].done = false; saveDB(); renderSection(); }
function delDressing(idx) {
  if (!confirm(t('delConfirm'))) return;
  const p = getPt(curBed);
  p.dressings.splice(idx, 1);
  const key = curBed + '_dressings';
  if (expandedCards[key] === idx) expandedCards[key] = -1;
  else if (expandedCards[key] > idx) expandedCards[key]--;
  saveDB(); renderUI();
}

function setMeal(mealKey, val) { const p = getPt(curBed); p.diet[mealKey] = (p.diet[mealKey] === val) ? '' : val; p.diet.done = false; saveDB(); renderUI(); }
function quickLogSupp(statusCode) { const p = getPt(curBed); p.diet.supps.push({ t: nowTimeStr(), v: statusCode }); p.diet.done = false; saveDB(); renderUI(); }
function updSuppText(val) { const p = getPt(curBed); p.diet.supp = val; p.diet.done = false; saveDB(); refreshSubNavCounts(); }
function addCustomSupp() { const inp = document.getElementById('suppInput'), val = (inp ? inp.value : '').trim(); if (!val) return; const p = getPt(curBed); p.diet.supps.push({ t: nowTimeStr(), v: val }); p.diet.supp = ''; p.diet.done = false; saveDB(); renderUI(); }
function delSupp(idx) {
  if (!confirm(t('delConfirm'))) return;
  const p = getPt(curBed);
  p.diet.supps.splice(idx, 1);
  p.diet.done = false; saveDB(); renderUI();
}
function toggleDietFlag(fl) { const p = getPt(curBed), idx = p.diet.flags.indexOf(fl); if (idx > -1) p.diet.flags.splice(idx, 1); else p.diet.flags.push(fl); p.diet.done = false; saveDB(); renderUI(); }

function setTurnFreq(val) { const p = getPt(curBed); p.turnFreq = val; p.turnPlanDone = false; saveDB(); renderUI(); }
function createTurnEntry() {
  const p = getPt(curBed);
  p.turns.push({ t: nowTimeStr(), p: '', done: false });
  expandedCards[curBed + '_turns'] = p.turns.length - 1;
  saveDB(); renderUI();
}
function updTurnField(idx, k, val) { const p = getPt(curBed); if (!p.turns[idx]) return; p.turns[idx][k] = val; p.turns[idx].done = false; saveDB(); refreshSubNavCounts(); }
function toggleTurnCheck(ck) { const p = getPt(curBed), idx = p.turnChecks.indexOf(ck); if (idx > -1) p.turnChecks.splice(idx, 1); else p.turnChecks.push(ck); p.turnPlanDone = false; saveDB(); renderUI(); }

function setMhLevel(val) { const p = getPt(curBed); p.mhLevel = val; p.mhLevelDone = false; saveDB(); refreshSubNavCounts(); }
function createMhEntry() {
  const p = getPt(curBed);
  p.mh.push({ t: nowTimeStr(), m: '', r: '', rat: '', n: '', done: false });
  expandedCards[curBed + '_mh'] = p.mh.length - 1;
  saveDB(); renderUI();
}
function updMhField(idx, k, val) { const p = getPt(curBed); if (!p.mh[idx]) return; p.mh[idx][k] = val; p.mh[idx].done = false; saveDB(); refreshSubNavCounts(); }

function addQuickPhrase(pIdx) {
  const p = getPt(curBed), phrases = getLangList('phrases');
  p.events.push({ t: nowTimeStr(), pIdx, e: phrases[pIdx] || '', o: '', done: false });
  expandedCards[curBed + '_events'] = p.events.length - 1;
  saveDB(); renderUI();
}
function createEventEntry() {
  const p = getPt(curBed);
  p.events.push({ t: nowTimeStr(), e: '', o: '', done: false });
  expandedCards[curBed + '_events'] = p.events.length - 1;
  saveDB(); renderUI();
}
function updEventField(idx, k, val) { const p = getPt(curBed); if (!p.events[idx]) return; p.events[idx][k] = val; if (k === 'e') p.events[idx].customEdited = true; p.events[idx].done = false; saveDB(); refreshSubNavCounts(); }

function quickAddTaskPreset(tIdx) {
  const p = getPt(curBed), taskList = getLangList('tasks'), nowMs = Date.now(), dt = new Date(nowMs + 30 * 60 * 1000);
  const due = String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
  p.reminders.push({ due, createdTs: nowMs, dueTs: dt.getTime(), txt: taskList[tIdx] || '', tIdx, done: false, alerted: false });
  expandedCards[curBed + '_reminders'] = p.reminders.length - 1;
  saveDB(); renderUI();
}
function createTaskEntry() {
  const p = getPt(curBed), nowMs = Date.now(), dt = new Date(nowMs + 30 * 60 * 1000);
  const due = String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
  p.reminders.push({ due, createdTs: nowMs, dueTs: dt.getTime(), txt: '', done: false, alerted: false });
  expandedCards[curBed + '_reminders'] = p.reminders.length - 1;
  saveDB(); renderUI();
}
function setTaskOffset(idx, mins) {
  const p = getPt(curBed); if (!p.reminders[idx]) return;
  const targetMs = Date.now() + mins * 60 * 1000, dt = new Date(targetMs);
  p.reminders[idx].due = String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
  p.reminders[idx].createdTs = Date.now(); p.reminders[idx].dueTs = targetMs; p.reminders[idx].alerted = false;
  saveDB(); renderUI();
}
function updTaskDue(idx, dueStr) {
  const p = getPt(curBed); if (!p.reminders[idx]) return;
  const r = p.reminders[idx];
  const nowMs = Date.now();
  r.due = dueStr; r.createdTs = nowMs; r.dueTs = computeTaskDueTs(dueStr, nowMs); r.alerted = false;
  saveDB();
  const overdue = isTaskOverdue(r);
  const cardEl = document.getElementById('taskCard_' + idx);
  const badgeEl = document.getElementById('taskBadge_' + idx);
  if (cardEl) cardEl.classList.toggle('task-alert', overdue);
  if (badgeEl) {
    badgeEl.classList.toggle('overdue', overdue);
    badgeEl.textContent = r.done ? t('done') : (overdue ? t('overdue') : `${t('due')} ${r.due || '--:--'}`);
  }
  renderOverdueBanner();
  refreshSubNavCounts();
}
function updTaskText(idx, val) {
  const p = getPt(curBed); if (!p.reminders[idx]) return;
  const r = p.reminders[idx];
  r.txt = val;
  r.customEdited = true;
  saveDB();
  const overdue = isTaskOverdue(r);
  const cardEl = document.getElementById('taskCard_' + idx);
  const badgeEl = document.getElementById('taskBadge_' + idx);
  if (cardEl) cardEl.classList.toggle('task-alert', overdue);
  if (badgeEl) {
    badgeEl.classList.toggle('overdue', overdue);
    badgeEl.textContent = r.done ? t('done') : (overdue ? t('overdue') : `${t('due')} ${r.due || '--:--'}`);
  }
  renderOverdueBanner();
  refreshSubNavCounts();
}
function toggleTaskDone(idx) {
  const p = getPt(curBed); if (!p.reminders[idx]) return;
  p.reminders[idx].done = !p.reminders[idx].done;
  saveDB(); renderUI();
}

function updAdmitField(k, val) { const p = getPt(curBed); p.admit[k] = val; p.admit.done = false; saveDB(); refreshSubNavCounts(); }
function toggleAdmitStdItem(idx) {
  const p = getPt(curBed), k = 'std_' + idx;
  if (p.admit.items[k] !== undefined) delete p.admit.items[k];
  else p.admit.items[k] = 'locPt';
  p.admit.done = false; saveDB(); renderUI();
}
function setAdmitStdLoc(key, lc) {
  const p = getPt(curBed);
  p.admit.items[key] = (p.admit.items[key] === lc) ? '' : lc;
  p.admit.done = false; saveDB(); renderSection();
}
function addAdmitCustomItem() {
  const inp = document.getElementById('admitCustomInput');
  const val = (inp ? inp.value : '').trim();
  if (!val) return;
  const p = getPt(curBed);
  p.admit.custom.push({ name: val, loc: 'locPt' });
  p.admit.other = '';
  p.admit.done = false; saveDB(); renderUI();
}
function setAdmitCustomLoc(cIdx, lc) {
  const p = getPt(curBed); if (!p.admit.custom[cIdx]) return;
  p.admit.custom[cIdx].loc = (p.admit.custom[cIdx].loc === lc) ? '' : lc;
  p.admit.done = false; saveDB(); renderSection();
}
function delAdmitCustomItem(cIdx) {
  if (!confirm(t('delConfirm'))) return;
  const p = getPt(curBed);
  p.admit.custom.splice(cIdx, 1);
  p.admit.done = false; saveDB(); renderUI();
}

function delItem(sec, idx) {
  if (!confirm(t('delConfirm'))) return;
  const p = getPt(curBed);
  if (Array.isArray(p[sec])) {
    p[sec].splice(idx, 1);
    const key = curBed + '_' + sec;
    if (expandedCards[key] === idx) expandedCards[key] = -1;
    else if (expandedCards[key] > idx) expandedCards[key]--;
    saveDB();
    renderUI();
  }
}

function jumpToBedMod(bIdx, modId) {
  if (!alloc[bIdx]) return;
  curBed = alloc[bIdx]; curSec = modId; showSummary = false; renderUI();
}

function doneBtnHtml(bIdx, sec, idx, isDone) {
  const lbl = isDone ? esc(t('done')) : esc(t('markDone'));
  return `<button type="button" class="sum-done-btn ${isDone ? 'is-done' : ''}" onclick="toggleSumDone(${bIdx}, '${sec}', ${idx})">${lbl}</button>`;
}

function sumRowWrap(leftHtml, bIdx, sec, idx, isDone) {
  if (hideCompleted && isDone) return '';
  const textStyle = isDone ? 'opacity:0.45; color:var(--text-sub); flex:1; line-height:1.8;' : 'flex:1; line-height:1.8;';
  return `<div style="display:flex; justify-content:space-between; align-items:center; gap:10px; padding:6px 0; border-bottom:1px solid var(--border);">
    <div style="${textStyle}">${leftHtml}</div>
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
  else if (sec === 'mhLevel') p.mhLevelDone = !p.mhLevelDone;
  else if (sec === 'admit') p.admit.done = !p.admit.done;
  else if (Array.isArray(p[sec]) && p[sec][idx]) p[sec][idx].done = !p[sec][idx].done;
  saveDB();
  renderOverdueBanner();
  refreshSubNavCounts();
  renderSummary();
}

function isBedAllDone(b) {
  const activeSecs = getActiveSections();
  for (const s of activeSecs) {
    if (countPendingForBedMod(b, s.id) > 0) return false;
  }
  return true;
}

function isModAllDone(modId) {
  return alloc.every(b => countPendingForBedMod(b, modId) === 0);
}

function countPendingForBedMod(b, modId) {
  const p = getPt(b);
  switch (modId) {
    case 'obs': return p.obs.filter(o => isObsFilled(o) && !o.done).length;
    case 'bm': return p.bm.filter(x => x.v && String(x.v).trim() !== '' && !x.done).length;
    case 'bp': return p.bp.filter(x => isBpFilled(x) && !x.done).length;
    case 'fluid': return p.fluids.filter(f => isFluidRowFilled(f) && !f.done).length;
    case 'bowel': return p.bowel.filter(x => !!x.a && !x.done).length;
    case 'amy': {
      const hasSkin = Object.values(p.skin).some(Boolean) || p.skinCustom.some(c => c.site && c.cond) || p.skinCare.length > 0;
      return (hasSkin && !p.skinDone ? 1 : 0) + p.dressings.filter(d => d.l && d.l.trim() !== '' && !d.done).length;
    }
    case 'food': {
      const hasDiet = !!(p.diet.b || p.diet.l || p.diet.d || (p.diet.supp && p.diet.supp.trim()) || p.diet.supps.length || p.diet.flags.length);
      return (hasDiet && !p.diet.done) ? 1 : 0;
    }
    case 'turn': {
      const hasPlan = !!(p.turnFreq || p.turnChecks.length);
      return (hasPlan && !p.turnPlanDone ? 1 : 0) + p.turns.filter(tr => !!tr.p && !tr.done).length;
    }
    case 'mh': {
      const filledMh = p.mh.filter(m => m.m || m.r || m.rat || m.n);
      if (filledMh.length > 0) return filledMh.filter(m => !m.done).length;
      return (p.mhLevel && !p.mhLevelDone) ? 1 : 0;
    }
    case 'events': {
      const phrases = getLangList('phrases');
      return p.events.filter(e => getEventText(e, phrases).trim() !== '' && !e.done).length;
    }
    case 'reminders': {
      const taskList = getLangList('tasks');
      return p.reminders.filter(r => getTaskText(r, taskList).trim() !== '' && !r.done).length;
    }
    case 'admit': {
      const hasAdmit = !!(p.admit.w || p.admit.h || p.admit.wb || Object.keys(p.admit.items).length || p.admit.custom.length || (p.admit.other && p.admit.other.trim()));
      return (hasAdmit && !p.admit.done) ? 1 : 0;
    }
    default: return 0;
  }
}

function setModDoneForBed(p, modId, targetState) {
  if (modId === 'obs') p.obs.forEach(x => { if (isObsFilled(x)) x.done = targetState; });
  else if (modId === 'bm') p.bm.forEach(x => { if (x.v && String(x.v).trim() !== '') x.done = targetState; });
  else if (modId === 'bp') p.bp.forEach(x => { if (isBpFilled(x)) x.done = targetState; });
  else if (modId === 'fluid') p.fluids.forEach(f => { if (isFluidRowFilled(f)) f.done = targetState; });
  else if (modId === 'bowel') p.bowel.forEach(x => { if (x.a) x.done = targetState; });
  else if (modId === 'amy') {
    p.skinDone = targetState;
    p.dressings.forEach(d => { if (d.l && d.l.trim() !== '') d.done = targetState; });
  }
  else if (modId === 'food') p.diet.done = targetState;
  else if (modId === 'turn') {
    p.turnPlanDone = targetState;
    p.turns.forEach(tr => { if (tr.p) tr.done = targetState; });
  }
  else if (modId === 'mh') {
    p.mhLevelDone = targetState;
    p.mh.forEach(m => { if (m.m || m.r || m.rat || m.n) m.done = targetState; });
  }
  else if (modId === 'events') {
    const phrases = getLangList('phrases');
    p.events.forEach(e => { if (getEventText(e, phrases).trim() !== '') e.done = targetState; });
  }
  else if (modId === 'reminders') {
    const taskList = getLangList('tasks');
    p.reminders.forEach(r => { if (getTaskText(r, taskList).trim() !== '') r.done = targetState; });
  }
  else if (modId === 'admit') p.admit.done = targetState;
}

function markBedDone(bedOrIdx) {
  const bed = typeof bedOrIdx === 'number' ? alloc[bedOrIdx] : bedOrIdx;
  if (!bed) return;
  const p = getPt(bed);
  const targetState = !isBedAllDone(bed);
  const activeSecs = getActiveSections();
  activeSecs.forEach(s => setModDoneForBed(p, s.id, targetState));
  saveDB();
  renderOverdueBanner();
  refreshSubNavCounts();
  renderSummary();
}

function markModDone(modId) {
  const targetState = !isModAllDone(modId);
  alloc.forEach(b => {
    setModDoneForBed(getPt(b), modId, targetState);
  });
  saveDB();
  renderOverdueBanner();
  refreshSubNavCounts();
  renderSummary();
}

function buildModuleSummaryForBed(b, modId) {
  const bIdx = alloc.indexOf(b), p = getPt(b), phrases = getLangList('phrases'), taskList = getLangList('tasks'), admitList = getLangList('admits');
  let rows = '';

  if (modId === 'obs') {
    p.obs.forEach((o, i) => {
      if (!isObsFilled(o)) return;
      rows += sumRowWrap(`${timePill(o.t)}${formatObsLine(o)}`, bIdx, 'obs', i, !!o.done);
    });
  } else if (modId === 'bm') {
    p.bm.forEach((x, i) => {
      if (!x.v || String(x.v).trim() === '') return;
      const flagsHtml = (x.f && x.f.length) ? x.f.map(f => kvPill('', esc(trCode(f)))).join('') : '';
      rows += sumRowWrap(`${timePill(x.t)}${kvPill(x.c ? trCode(x.c) : t('bm'), `<span class="ltr-num">${esc(x.v)} ${esc(x.u || bmUnit)}</span>`)}${flagsHtml}`, bIdx, 'bm', i, !!x.done);
    });
  } else if (modId === 'bp') {
    p.bp.forEach((x, i) => {
      if (!isBpFilled(x)) return;
      const hasL = x.l && x.l !== '-' && x.l !== '-/-', hasS = x.s && x.s !== '-' && x.s !== '-/-';
      const bpParts = [];
      if (hasL) bpParts.push(kvPill(t('lying'), `<span class="ltr-num">${esc(x.l)}</span>`));
      if (hasS) bpParts.push(kvPill(t('standing'), `<span class="ltr-num">${esc(x.s)}</span>`));
      if (x.sym && x.sym.length) x.sym.forEach(s => bpParts.push(kvPill('', esc(trCode(s)))));
      rows += sumRowWrap(`${timePill(x.t)}${bpParts.join('')}`, bIdx, 'bp', i, !!x.done);
    });
  } else if (modId === 'fluid') {
    let totI = 0, totO = 0, hasFluidActivity = false;
    p.fluids.forEach((f, i) => {
      const fi = Number(f.i) || 0, fo = Number(f.o) || 0, fw = Number(f.wet) || 0;
      totI += fi; totO += fo;
      if (isFluidRowFilled(f)) {
        hasFluidActivity = true;
        const segs = [];
        if (fi > 0) segs.push(kvPill(t('flIn'), `<span class="ltr-num">${fi}ml</span>`));
        if (fo > 0) segs.push(kvPill(t('flOut'), `<span class="ltr-num">${fo}ml</span>${f.src ? ' (' + esc(trCode(f.src)) + ')' : ''}`));
        else if (f.src) segs.push(kvPill(t('flOut'), esc(trCode(f.src))));
        if (fw > 0) segs.push(kvPill(t('wetPad'), `<span class="ltr-num">x${fw}</span>`));
        rows += sumRowWrap(`${timePill(f.t)}${segs.join('')}`, bIdx, 'fluids', i, !!f.done);
      }
    });
    if (rows || (hasFluidActivity && !hideCompleted)) {
      const net = totI - totO;
      rows += `<div style="padding-top:8px;">${kvPill(t('flIn'), `<span class="ltr-num">${totI}ml</span>`)}${kvPill(t('flOut'), `<span class="ltr-num">${totO}ml</span>`)}${kvPill(t('flNet'), `<span class="ltr-num">${net > 0 ? '+' + net : net}ml</span>`)}</div>`;
    }
  } else if (modId === 'bowel') {
    p.bowel.forEach((x, i) => {
      if (!x.a) return;
      const pills = x.a === 'bno'
        ? kvPill('', esc(t('bnoFull')))
        : `${kvPill(t('amt'), esc(trCode(x.a)))}${x.ty ? kvPill('', esc(trCode(x.ty))) : ''}${x.m ? kvPill('', esc(trCode(x.m))) : ''}`;
      rows += sumRowWrap(`${timePill(x.t)}${pills}`, bIdx, 'bowel', i, !!x.done);
    });
  } else if (modId === 'amy') {
    const skParts = [];
    ['sacrum', 'groin', 'heels', 'elbows'].forEach(st => { if (p.skin[st]) skParts.push(kvPill(t(st), esc(trCode(p.skin[st])))); });
    p.skinCustom.forEach(c => { if (c.site && c.cond) skParts.push(kvPill(`${trCode(c.site)}${c.side ? ' (' + trCode(c.side) + ')' : ''}`, esc(trCode(c.cond)))); });
    p.skinCare.forEach(ck => skParts.push(kvPill('', esc(trCode(ck)))));
    if (skParts.length > 0) rows += sumRowWrap(skParts.join(''), bIdx, 'skin', 0, !!p.skinDone);
    p.dressings.forEach((d, i) => {
      if (!d.l || !d.l.trim()) return;
      const drPills = [
        kvPill(t('dressing'), esc(d.l)),
        d.st ? kvPill('', esc(trCode(d.st))) : '',
        d.f ? kvPill(t('due'), esc(calcDue(d.dt || todayIsoStr(), d.f))) : kvPill(t('date'), esc(formatIsoDate(d.dt || todayIsoStr())))
      ].join('');
      rows += sumRowWrap(drPills, bIdx, 'dressings', i, !!d.done);
    });
  } else if (modId === 'food') {
    const dParts = [];
    if (p.diet.b) dParts.push(kvPill(t('b'), esc(trCode(p.diet.b))));
    if (p.diet.l) dParts.push(kvPill(t('l'), esc(trCode(p.diet.l))));
    if (p.diet.d) dParts.push(kvPill(t('d'), esc(trCode(p.diet.d))));
    if (p.diet.supp && p.diet.supp.trim()) dParts.push(kvPill(t('supp'), esc(p.diet.supp.trim())));
    p.diet.supps.forEach(s => dParts.push(`${timePill(s.t)}${kvPill(t('supp'), esc(trCode(s.v)))}`));
    p.diet.flags.forEach(fl => dParts.push(kvPill('', esc(trCode(fl)))));
    if (dParts.length > 0) rows += sumRowWrap(dParts.join(''), bIdx, 'diet', 0, !!p.diet.done);
  } else if (modId === 'turn') {
    if (p.turnFreq || p.turnChecks.length > 0) {
      const planPills = [];
      if (p.turnFreq) planPills.push(kvPill(t('turnFreqLbl'), esc(trCode(p.turnFreq))));
      p.turnChecks.forEach(ck => planPills.push(kvPill('', esc(trCode(ck)))));
      rows += sumRowWrap(planPills.join(''), bIdx, 'turnPlan', 0, !!p.turnPlanDone);
    }
    p.turns.forEach((tr, i) => { if (tr.p) rows += sumRowWrap(`${timePill(tr.t)}${kvPill(t('posLbl'), esc(trCode(tr.p)))}`, bIdx, 'turns', i, !!tr.done); });
  } else if (modId === 'mh') {
    const hasFilledMh = p.mh.some(m => m.m || m.r || m.rat || m.n);
    if (p.mhLevel && !hasFilledMh) {
      rows += sumRowWrap(kvPill(t('obsLevel'), esc(trCode(p.mhLevel))), bIdx, 'mhLevel', 0, !!p.mhLevelDone);
    }
    p.mh.forEach((m, i) => {
      if (!m.m && !m.r && !m.rat && !m.n) return;
      const mhPills = [
        timePill(m.t),
        p.mhLevel ? kvPill(t('obsLevel'), esc(trCode(p.mhLevel))) : '',
        m.m ? kvPill(t('mood'), esc(trCode(m.m))) : '',
        m.r ? kvPill(t('rest'), esc(trCode(m.r))) : '',
        m.rat ? kvPill('', esc(trCode(m.rat))) : '',
        m.n ? kvPill('', esc(m.n)) : ''
      ].join('');
      rows += sumRowWrap(mhPills, bIdx, 'mh', i, !!m.done);
    });
  } else if (modId === 'events') {
    p.events.forEach((e, i) => {
      const noteTxt = getEventText(e, phrases);
      if (noteTxt.trim()) rows += sumRowWrap(`${timePill(e.t)}<span style="font-weight:700;">${esc(noteTxt)}</span>${e.o ? ' ' + kvPill(t('outcome'), esc(e.o)) : ''}`, bIdx, 'events', i, !!e.done);
    });
  } else if (modId === 'reminders') {
    p.reminders.forEach((r, i) => {
      const tkTxt = getTaskText(r, taskList);
      if (!tkTxt.trim()) return;
      const overdue = isTaskOverdue(r);
      rows += sumRowWrap(`${timePill(r.due)}${kvPill(t('reminders'), esc(tkTxt))}${overdue ? ` <span class="task-badge overdue">${esc(t('overdue'))}</span>` : ''}`, bIdx, 'reminders', i, !!r.done);
    });
  } else if (modId === 'admit') {
    const aParts = [];
    if (p.admit.w) aParts.push(kvPill(t('weight'), `<span class="ltr-num">${esc(p.admit.w)}kg</span>`));
    if (p.admit.h) aParts.push(kvPill(t('height'), `<span class="ltr-num">${esc(p.admit.h)}cm</span>`));
    if (p.admit.wb) aParts.push(kvPill('', `✓ ${esc(t('wristband'))}`));
    Object.entries(p.admit.items).forEach(([k, lc]) => {
      const idx = parseInt(k.replace('std_', ''), 10);
      const lbl = !isNaN(idx) && admitList[idx] ? admitList[idx] : k;
      aParts.push(kvPill(lbl, lc ? esc(trCode(lc)) : '✓'));
    });
    p.admit.custom.forEach(ci => {
      aParts.push(kvPill(ci.name, ci.loc ? esc(trCode(ci.loc)) : '✓'));
    });
    if (p.admit.other && p.admit.other.trim()) aParts.push(kvPill('', esc(p.admit.other.trim())));
    if (aParts.length > 0) rows += sumRowWrap(aParts.join(''), bIdx, 'admit', 0, !!p.admit.done);
  }
  return rows;
}

function renderSummary() {
  if (typeof sortBedArray === 'function') alloc = sortBedArray(alloc);
  const area = document.getElementById('contentArea');
  const activeSecs = getActiveSections();
  let pendingTotal = 0;
  alloc.forEach(b => {
    activeSecs.forEach(s => {
      pendingTotal += countPendingForBedMod(b, s.id);
    });
  });
  const pendingLbl = hideCompleted
    ? t('showAll')
    : `${t('pending')}${pendingTotal > 0 ? ' (' + pendingTotal + ')' : ''}`;

  let html = `<div class="summary-toolbar">
    <button type="button" class="tool-btn ${summaryGroup === 'bed' ? 'active' : ''}" onclick="setSumGroup('bed')">${esc(t('byBed'))}</button>
    <button type="button" class="tool-btn ${summaryGroup === 'mod' ? 'active' : ''}" onclick="setSumGroup('mod')">${esc(t('byMod'))}</button>
    <button type="button" class="tool-btn ${hideCompleted ? 'active' : ''}" onclick="toggleHideCompleted()">${esc(pendingLbl)}</button>
    <button type="button" class="tool-btn ${wakeLockObj ? 'active' : ''}" onclick="toggleWakeLock()">${esc(t('keepOn'))}</button>
  </div>`;

  let anyVisible = false;
  if (summaryGroup === 'bed') {
    alloc.forEach((b, bIdx) => {
      let bedContent = '';
      activeSecs.forEach(s => {
        const modRows = buildModuleSummaryForBed(b, s.id);
        if (modRows) bedContent += `<div class="summary-sec"><div class="sum-mod-hdr" onclick="jumpToBedMod(${bIdx}, '${s.id}')">${esc(t(s.id))} ✎</div>${modRows}</div>`;
      });
      if (bedContent) {
        anyVisible = true;
        const allDone = isBedAllDone(b);
        html += `<div class="card"><h3><span>${esc(b)}</span><button type="button" class="sum-batch-btn" onclick="markBedDone(${bIdx})">${esc(allDone ? t('undoBed') : t('markBed'))}</button></h3>${bedContent}</div>`;
      }
    });
  } else {
    activeSecs.forEach(s => {
      let modContent = '';
      alloc.forEach((b, bIdx) => {
        const modRows = buildModuleSummaryForBed(b, s.id);
        if (modRows) modContent += `<div class="summary-sec"><div class="sum-mod-hdr" onclick="jumpToBedMod(${bIdx}, '${s.id}')">${esc(b)} ✎</div>${modRows}</div>`;
      });
      if (modContent) {
        anyVisible = true;
        const allModDone = isModAllDone(s.id);
        html += `<div class="card"><h3><span>${esc(t(s.id))}</span><button type="button" class="sum-batch-btn" onclick="markModDone('${s.id}')">${esc(allModDone ? t('undoAll') : t('markAllDone'))}</button></h3>${modContent}</div>`;
      }
    });
  }

  if (!anyVisible) {
    html += `<div class="card" style="text-align:center; color:var(--text-sub); padding:24px 14px; font-weight:600;">${esc(hideCompleted ? t('allDoneMsg') : t('nothingLoggedMsg'))}</div>`;
  }
  area.innerHTML = html;
}

function setSumGroup(g) { summaryGroup = g; renderSummary(); }
function toggleHideCompleted() { hideCompleted = !hideCompleted; renderSummary(); }

window.CDP_MOD_VER = 12;
