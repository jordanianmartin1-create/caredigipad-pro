function commitPendingForm() {
  if (!curBed) return;
  if (openForms.obs && document.getElementById('obsTime')) addObs(true);
  if (openForms.bm && document.getElementById('bmTime')) addBm(true);
  if (openForms.bp && document.getElementById('bpTime')) addBp(true);
  if (openForms.bowel && document.getElementById('bwTime')) addBowel(true);
  if (openForms.skinSite && document.getElementById('csSite')) addCustomSkin(true);
  if (openForms.dr && document.getElementById('drLoc')) {
    const loc = (document.getElementById('drLoc').value || '').trim();
    if (loc) addDressing(todayIsoStr(), true);
  }
  if (openForms.turn && document.getElementById('trnTime')) addTurn(true);
  if (openForms.mh && document.getElementById('mhTime')) addMh(true);
  if (openForms.events && document.getElementById('evTime')) addEvent(true);
  if (openForms.reminders && document.getElementById('remDue')) addReminder(true);
}

function renderSection() {
  const area = document.getElementById('contentArea');
  if (!curBed || !area) return;
  const p = getPt(curBed);
  const nowStr = nowTimeStr();

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
    const listHtml = p.obs.map((o, i) => {
      const acvTxt = (typeof o.aIdx === 'number' && acvpuList[o.aIdx]) ? acvpuList[o.aIdx] : (o.a || '-');
      const o2Txt = trCode(o.o2) || '-';
      return `<div class="card" style="display:flex; justify-content:space-between; align-items:center;">
        <div><strong>${esc(o.t)}</strong> — RR <b>${esc(o.rr)}</b>, SpO2 <b>${esc(o.sp)}%</b> (${esc(o2Txt)}), BP <b>${esc(o.bp)}</b>, HR <b>${esc(o.hr)}</b>, ${esc(acvTxt)}, Temp <b>${esc(o.tm)}${esc(o.u || tempUnit)}</b>${o.pn !== '' && o.pn !== undefined ? `, ${esc(t('pain'))} <b>${esc(o.pn)}/10</b>` : ''}</div>
        <button type="button" class="del-btn" onclick="delItem('obs', ${i})">✕</button>
      </div>`;
    }).join('');

    const formHtml = openForms.obs ? `<div class="card">
      <div class="form-hdr">
        <span class="form-hdr-title">${esc(t('add'))} ${esc(t('obs'))}</span>
        <button type="button" class="del-btn" onclick="toggleForm('obs', false)">✕</button>
      </div>
      <div class="row">
        <div><label>${esc(t('time'))}</label><input type="time" id="obsTime" value="${nowStr}"></div>
        <div><label>${esc(t('rrLbl'))}</label><input type="number" id="obsRr" inputmode="numeric"></div>
      </div>
      <div class="row">
        <div><label>${esc(t('spo2Lbl'))}</label><input type="number" id="obsSpo2" inputmode="numeric"></div>
        <div>
          <label>${esc(t('o2Lbl'))}</label>
          <select id="obsO2">
            <option value="">—</option>
            <option value="air">${esc(t('air'))}</option>
            <option value="o2">${esc(getOxygenLabel())}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div>
          <label>${esc(t('bpLbl'))}</label>
          <div class="bp-pair">
            <input type="number" id="obsSys" inputmode="numeric">
            <span>/</span>
            <input type="number" id="obsDia" inputmode="numeric">
          </div>
        </div>
        <div><label>${esc(t('hrLbl'))}</label><input type="number" id="obsHr" inputmode="numeric"></div>
      </div>
      <div class="row">
        <div><label>${esc(t('tempLbl'))} (${esc(tempUnit)})</label><input type="number" step="0.1" id="obsTemp" inputmode="decimal"></div>
        <div>
          <label>${esc(t('acvpuLbl'))}</label>
          <select id="obsAcvpu">
            <option value="">—</option>
            ${acvpuList.map((v, i) => `<option value="${i}">${esc(v)}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="row">
        <div><label>${esc(t('painLbl'))}</label><input type="number" min="0" max="10" id="obsPain" inputmode="numeric"></div>
      </div>
      <button type="button" class="btn btn-primary" onclick="addObs(false)">✓ ${esc(t('add'))} ${esc(t('obs'))}</button>
    </div>` : `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="toggleForm('obs', true)">${esc(t('add'))} ${esc(t('obs'))}</button>`;

    bodyHtml = listHtml + formHtml;
  }

  else if (curSec === 'bm') {
    const ctxOpts = ['bmPreB','bmPostB','bmPreL','bmPostL','bmPreD','bmPostD','bmBed','bmNight','bmRandom','bmRepeat'];
    const listHtml = p.bm.map((b, i) => `<div class="card" style="display:flex; justify-content:space-between; align-items:center;">
      <div><strong>${esc(b.t)}</strong> — <b>${esc(b.v)} ${esc(b.u || bmUnit)}</b>${b.c ? ' (' + esc(trCode(b.c)) + ')' : ''}${(b.f && b.f.length) ? ' • ' + b.f.map(x => esc(trCode(x))).join(', ') : ''}</div>
      <button type="button" class="del-btn" onclick="delItem('bm', ${i})">✕</button>
    </div>`).join('');

    const formHtml = openForms.bm ? `<div class="card">
      <div class="form-hdr">
        <span class="form-hdr-title">${esc(t('add'))} ${esc(t('bm'))}</span>
        <button type="button" class="del-btn" onclick="toggleForm('bm', false)">✕</button>
      </div>
      <div class="row">
        <div><label>${esc(t('time'))}</label><input type="time" id="bmTime" value="${nowStr}"></div>
        <div><label>${esc(t('bmValLbl'))} (${esc(bmUnit)})</label><input type="number" step="0.1" id="bmVal" inputmode="decimal"></div>
      </div>
      <div style="margin-bottom:10px;">
        <label>${esc(t('context'))}</label>
        <select id="bmCtx">
          <option value="">—</option>
          ${ctxOpts.map(k => `<option value="${k}">${esc(t(k))}</option>`).join('')}
        </select>
      </div>
      <div class="chip-row" id="bmFlags">
        <span class="chip" data-code="hypoTreated" onclick="this.classList.toggle('active-red')">${esc(t('hypoTreated'))}</span>
        <span class="chip" data-code="ketones" onclick="this.classList.toggle('active-amber')">${esc(t('ketones'))}</span>
        <span class="chip" data-code="escRn" onclick="this.classList.toggle('active')">${esc(t('escRn'))}</span>
      </div>
      <button type="button" class="btn btn-primary" onclick="addBm(false)">✓ ${esc(t('add'))} ${esc(t('bm'))}</button>
    </div>` : `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="toggleForm('bm', true)">${esc(t('add'))} ${esc(t('bm'))}</button>`;

    bodyHtml = listHtml + formHtml;
  }

  else if (curSec === 'bp') {
    const listHtml = p.bp.map((x, i) => `<div class="card" style="display:flex; justify-content:space-between; align-items:center;">
      <div><strong>${esc(x.t)}</strong> — ${esc(t('lying'))}: <b>${esc(x.l)}</b> | ${esc(t('standing'))}: <b>${esc(x.s)}</b>${(x.sym && x.sym.length) ? ' (' + x.sym.map(s => esc(trCode(s))).join(', ') + ')' : ''}</div>
      <button type="button" class="del-btn" onclick="delItem('bp', ${i})">✕</button>
    </div>`).join('');

    const formHtml = openForms.bp ? `<div class="card">
      <div class="form-hdr">
        <span class="form-hdr-title">${esc(t('add'))} ${esc(t('bp'))}</span>
        <button type="button" class="del-btn" onclick="toggleForm('bp', false)">✕</button>
      </div>
      <div class="row">
        <div><label>${esc(t('time'))}</label><input type="time" id="bpTime" value="${nowStr}"></div>
      </div>
      <div class="row">
        <div>
          <label>${esc(t('lying'))} BP (Sys / Dia)</label>
          <div class="bp-pair"><input type="number" id="bpLSys" inputmode="numeric"><span>/</span><input type="number" id="bpLDia" inputmode="numeric"></div>
        </div>
      </div>
      <div class="row">
        <div>
          <label>${esc(t('standing'))} BP (Sys / Dia)</label>
          <div class="bp-pair"><input type="number" id="bpSSys" inputmode="numeric"><span>/</span><input type="number" id="bpSDia" inputmode="numeric"></div>
        </div>
      </div>
      <div class="chip-row" id="bpSyms">
        <span class="chip" data-code="noSym" onclick="this.classList.toggle('active')">${esc(t('noSym'))}</span>
        <span class="chip" data-code="dizzy" onclick="this.classList.toggle('active-amber')">${esc(t('dizzy'))}</span>
        <span class="chip" data-code="unableStand" onclick="this.classList.toggle('active-red')">${esc(t('unableStand'))}</span>
      </div>
      <button type="button" class="btn btn-primary" onclick="addBp(false)">✓ ${esc(t('add'))} ${esc(t('bp'))}</button>
    </div>` : `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="toggleForm('bp', true)">${esc(t('add'))} ${esc(t('bp'))}</button>`;

    bodyHtml = listHtml + formHtml;
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
            ${(f.src || f.wet) ? `<div style="font-size:0.7rem; color:var(--amber); font-weight:700; margin-top:2px;">${f.src ? esc(trCode(f.src)) : ''}${f.src && f.wet ? ' • ' : ''}${f.wet ? esc(t('wetPad')) + ' x' + f.wet : ''}</div>` : ''}
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
    const listHtml = p.bowel.map((b, i) => `<div class="card" style="display:flex; justify-content:space-between; align-items:center;">
      <div><strong>${esc(b.t)}</strong> — ${b.a === 'bno' ? `<b>${esc(t('bnoFull'))}</b>` : `<b>${esc(trCode(b.a))}</b>${b.ty ? ' — ' + esc(trCode(b.ty)) : ''}${b.m ? ' • ' + esc(trCode(b.m)) : ''}`}</div>
      <button type="button" class="del-btn" onclick="delItem('bowel', ${i})">✕</button>
    </div>`).join('');

    const formHtml = openForms.bowel ? `<div class="card">
      <div class="form-hdr">
        <span class="form-hdr-title">${esc(t('add'))} ${esc(t('bowel'))}</span>
        <button type="button" class="del-btn" onclick="toggleForm('bowel', false)">✕</button>
      </div>
      <div class="row">
        <div><label>${esc(t('time'))}</label><input type="time" id="bwTime" value="${nowStr}"></div>
        <div>
          <label>${esc(t('amt'))}</label>
          <select id="bwAmt" onchange="document.getElementById('bwExtra').classList.toggle('hidden', this.value==='bno')">
            <option value="">—</option>
            ${amtOpts.map(k => `<option value="${k}">${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      <div id="bwExtra">
        <div class="row">
          <div>
            <label>${esc(t('type'))}</label>
            <select id="bwType">
              <option value="">—</option>
              ${typeOpts.map(k => `<option value="${k}">${esc(t(k))}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="row">
          <div>
            <label>${esc(t('method'))}</label>
            <select id="bwMeth">
              <option value="">—</option>
              ${methOpts.map(k => `<option value="${k}">${esc(t(k))}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" onclick="addBowel(false)">✓ ${esc(t('add'))} ${esc(t('bowel'))}</button>
    </div>` : `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="toggleForm('bowel', true)">${esc(t('add'))} ${esc(t('bowel'))}</button>`;

    bodyHtml = listHtml + formHtml;
  }

  else if (curSec === 'amy') {
    const skinStates = ['', 'intact', 'blanching', 'nonBlanch', 'moisture', 'broken', 'tear', 'drySkin'];
    const coreSites = ['sacrum', 'groin', 'heels', 'elbows'];
    const extraSites = ['siteHip','siteAnkle','siteShin','siteFoot','siteArm','siteSpine','siteShoulder','siteEar','siteOther'];
    const sides = ['', 'sideL', 'sideR', 'sideBoth'];
    const drSites = getLangList('drSites');
    const todayIso = todayIsoStr();

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
      ${p.skinCustom.map((c, idx) => `<div style="display:flex; justify-content:space-between; align-items:center; padding:6px 10px; background:var(--bg); border-radius:6px; margin-bottom:6px; font-size:0.88rem;">
        <span><strong>${esc(trCode(c.site))}${c.side ? ' (' + esc(trCode(c.side)) + ')' : ''}:</strong> ${esc(trCode(c.cond))}</span>
        <button type="button" class="del-btn" onclick="delCustomSkin(${idx})">✕</button>
      </div>`).join('')}
      ${openForms.skinSite ? `<div style="padding:10px; background:var(--bg); border-radius:8px; border:1px solid var(--border); margin-bottom:10px;">
        <div class="form-hdr">
          <span class="form-hdr-title">${esc(t('addSite'))}</span>
          <button type="button" class="del-btn" onclick="toggleForm('skinSite', false)">✕</button>
        </div>
        <div class="row">
          <div>
            <label>${esc(t('locNotes'))}</label>
            <select id="csSite">
              <option value="">—</option>
              ${extraSites.map(s => `<option value="${s}">${esc(t(s))}</option>`).join('')}
            </select>
          </div>
          <div>
            <label>Side</label>
            <select id="csSide">${sides.map(s => `<option value="${s}">${s ? esc(t(s)) : '—'}</option>`).join('')}</select>
          </div>
        </div>
        <div class="row">
          <div>
            <label>Status</label>
            <select id="csCond">
              <option value="">—</option>
              ${skinStates.filter(Boolean).map(s => `<option value="${s}">${esc(t(s))}</option>`).join('')}
            </select>
          </div>
          <div><button type="button" class="btn btn-primary" onclick="addCustomSkin(false)">✓ ${esc(t('add'))}</button></div>
        </div>
      </div>` : `<button type="button" class="btn btn-subtle btn-sm" style="margin-bottom:10px;" onclick="toggleForm('skinSite', true)">${esc(t('addSite'))}</button>`}
      <div class="chip-row" style="margin-bottom:0;">
        ${['cBarrier','cOffload','cBoots'].map(ck => `<span class="chip ${p.skinCare.includes(ck) ? 'active' : ''}" onclick="toggleSkinCare('${ck}')">${esc(t(ck))}</span>`).join('')}
      </div>
    </div>`;

    const drListHtml = p.dressings.map((d, i) => `<div class="card" style="display:flex; justify-content:space-between; align-items:center;">
      <div><strong>${esc(d.l)}</strong>${d.st ? ' (' + esc(trCode(d.st)) + ')' : ''} — ${esc(t('date'))}: <b>${esc(formatIsoDate(d.dt))}</b>${d.f ? ` • ${esc(t('due'))}: <b>${esc(calcDue(d.dt, d.f))}</b>` : ''}</div>
      <button type="button" class="del-btn" onclick="delDressing(${i})">✕</button>
    </div>`).join('');

    const drFormHtml = openForms.dr ? `<div class="card">
      <div class="form-hdr">
        <span class="form-hdr-title">${esc(t('add'))} ${esc(t('dressing'))}</span>
        <button type="button" class="del-btn" onclick="toggleForm('dr', false)">✕</button>
      </div>
      <div class="chip-row">
        ${drSites.map((ds, idx) => `<span class="chip" onclick="setDrSitePreset(${idx})">+ ${esc(ds)}</span>`).join('')}
      </div>
      <div class="row">
        <div><label>${esc(t('locNotes'))}</label><input type="text" id="drLoc"></div>
        <div>
          <label>${esc(t('dueIn'))}</label>
          <select id="drFreq">
            <option value="">—</option>
            <option value="1">${esc(t('day1'))}</option>
            <option value="2">${esc(t('day2'))}</option>
            <option value="3">${esc(t('day3'))}</option>
            <option value="5">${esc(t('day5'))}</option>
            <option value="7">${esc(t('day7'))}</option>
          </select>
        </div>
      </div>
      <div class="chip-row" id="drStatusChips">
        ${['drIntact','drChanged','drLeak','drLift'].map(st => `<span class="chip" data-code="${st}" onclick="selectDrStatus(this)">${esc(t(st))}</span>`).join('')}
      </div>
      <div>
        <label>${esc(t('date'))}</label>
        <div style="display:flex; gap:8px;">
          <button type="button" class="btn btn-primary" style="flex:1;" onclick="addDressing('${todayIso}', false)">✓ ${esc(t('today'))}</button>
          <div class="date-btn-wrap" style="flex:1;">
            <div class="date-display-btn"><span>📅 ${esc(t('selectDate'))}</span></div>
            <input type="date" class="date-native-overlay" onchange="if(this.value) addDressing(this.value, false)">
          </div>
        </div>
      </div>
    </div>` : `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="toggleForm('dr', true)">${esc(t('add'))} ${esc(t('dressing'))}</button>`;

    bodyHtml = skinCardHtml + drListHtml + drFormHtml;
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

    const listHtml = p.turns.map((tr, i) => `<div class="card" style="display:flex; justify-content:space-between; align-items:center;">
      <div><strong>${esc(tr.t)}</strong> — <b>${esc(trCode(tr.p))}</b></div>
      <button type="button" class="del-btn" onclick="delItem('turns', ${i})">✕</button>
    </div>`).join('');

    const formHtml = openForms.turn ? `<div class="card">
      <div class="form-hdr">
        <span class="form-hdr-title">${esc(t('turnNow'))}</span>
        <button type="button" class="del-btn" onclick="toggleForm('turn', false)">✕</button>
      </div>
      <div class="row">
        <div><label>${esc(t('time'))}</label><input type="time" id="trnTime" value="${nowStr}"></div>
        <div>
          <label>${esc(t('posLbl'))}</label>
          <select id="trnPos">
            <option value="">—</option>
            ${posOpts.map(k => `<option value="${k}">${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      <button type="button" class="btn btn-primary" onclick="addTurn(false)">✓ ${esc(t('turnNow'))}</button>
    </div>` : `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="toggleForm('turn', true)">${esc(t('turnNow'))}</button>`;

    bodyHtml = planCard + listHtml + formHtml;
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

    const listHtml = p.mh.map((m, i) => `<div class="card" style="display:flex; justify-content:space-between; align-items:center;">
      <div><strong>${esc(m.t)}</strong> — ${m.m ? `<b>${esc(trCode(m.m))}</b>` : ''}${m.r ? (m.m ? ' • ' : '') + esc(trCode(m.r)) : ''}${m.rat ? ' • ' + esc(trCode(m.rat)) : ''}${m.n ? ' (' + esc(m.n) + ')' : ''}</div>
      <button type="button" class="del-btn" onclick="delItem('mh', ${i})">✕</button>
    </div>`).join('');

    const formHtml = openForms.mh ? `<div class="card">
      <div class="form-hdr">
        <span class="form-hdr-title">${esc(t('add'))} ${esc(t('mh'))}</span>
        <button type="button" class="del-btn" onclick="toggleForm('mh', false)">✕</button>
      </div>
      <div class="row">
        <div><label>${esc(t('time'))}</label><input type="time" id="mhTime" value="${nowStr}"></div>
        <div>
          <label>${esc(t('mood'))}</label>
          <select id="mhMood">
            <option value="">—</option>
            ${moodOpts.map(k => `<option value="${k}">${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="row">
        <div>
          <label>${esc(t('rest'))}</label>
          <select id="mhLoc">
            <option value="">—</option>
            ${locOpts.map(k => `<option value="${k}">${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="row">
        <div>
          <label>${esc(t('mhRationaleLbl'))}</label>
          <select id="mhRat">
            <option value="">—</option>
            ${ratOpts.map(k => `<option value="${k}">${esc(t(k))}</option>`).join('')}
          </select>
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <label>${esc(t('mhNoteLbl'))}</label>
        <input type="text" id="mhNote">
      </div>
      <button type="button" class="btn btn-primary" onclick="addMh(false)">✓ ${esc(t('add'))} ${esc(t('mh'))}</button>
    </div>` : `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="toggleForm('mh', true)">${esc(t('add'))} ${esc(t('mh'))}</button>`;

    bodyHtml = lvlCard + listHtml + formHtml;
  }

  else if (curSec === 'events') {
    const phrases = getLangList('phrases');
    const listHtml = p.events.map((e, i) => {
      const noteTxt = (typeof e.pIdx === 'number' && phrases[e.pIdx]) ? phrases[e.pIdx] : e.e;
      return `<div class="card" style="display:flex; justify-content:space-between; align-items:center;">
        <div><strong>${esc(e.t)}</strong> — ${esc(noteTxt)}${e.o ? ' → <b>' + esc(e.o) + '</b>' : ''}</div>
        <button type="button" class="del-btn" onclick="delItem('events', ${i})">✕</button>
      </div>`;
    }).join('');

    const formHtml = openForms.events ? `<div class="card">
      <div class="form-hdr">
        <span class="form-hdr-title">${esc(t('add'))} ${esc(t('events'))}</span>
        <button type="button" class="del-btn" onclick="toggleForm('events', false)">✕</button>
      </div>
      <div class="chip-row">
        ${phrases.map((ph, idx) => `<span class="chip" onclick="addQuickPhrase(${idx})">+ ${esc(ph)}</span>`).join('')}
      </div>
      <div class="row">
        <div><label>${esc(t('time'))}</label><input type="time" id="evTime" value="${nowStr}"></div>
      </div>
      <div style="margin-bottom:10px;">
        <label>${esc(t('events'))}</label>
        <textarea id="evNote" rows="2" oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
      </div>
      <div style="margin-bottom:10px;">
        <label>${esc(t('outcome'))}</label>
        <input type="text" id="evOut">
      </div>
      <button type="button" class="btn btn-primary" onclick="addEvent(false)">✓ ${esc(t('add'))} ${esc(t('events'))}</button>
    </div>` : `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="toggleForm('events', true)">${esc(t('add'))} ${esc(t('events'))}</button>`;

    bodyHtml = listHtml + formHtml;
  }

  else if (curSec === 'reminders') {
    const taskList = getLangList('tasks');
    const now = new Date();
    const curMins = now.getHours() * 60 + now.getMinutes();

    const listHtml = p.reminders.map((r, i) => {
      const tkTxt = (typeof r.tIdx === 'number' && taskList[r.tIdx]) ? taskList[r.tIdx] : r.txt;
      let isOverdue = false;
      if (!r.done && r.due) {
        const [hh, mm] = r.due.split(':').map(Number);
        if (!isNaN(hh) && !isNaN(mm) && curMins >= (hh * 60 + mm)) isOverdue = true;
      }
      return `<div class="card ${isOverdue ? 'task-alert' : ''}" style="display:flex; justify-content:space-between; align-items:center;">
        <label style="display:flex; align-items:center; gap:8px; margin:0; font-size:0.92rem; color:var(--text); cursor:pointer; white-space:normal;">
          <input type="checkbox" ${r.done ? 'checked' : ''} onchange="toggleTaskDone(${i})">
          <span style="${r.done ? 'text-decoration:line-through; opacity:0.55;' : ''}"><strong>${esc(r.due || '--:--')}</strong> — ${esc(tkTxt)}</span>
        </label>
        <button type="button" class="del-btn" onclick="delItem('reminders', ${i})">✕</button>
      </div>`;
    }).join('');

    const formHtml = openForms.reminders ? `<div class="card">
      <div class="form-hdr">
        <span class="form-hdr-title">${esc(t('add'))} ${esc(t('reminders'))}</span>
        <button type="button" class="del-btn" onclick="toggleForm('reminders', false)">✕</button>
      </div>
      <div class="chip-row">
        ${taskList.map((tk, idx) => `<span class="chip" onclick="setTaskPreset(${idx})">+ ${esc(tk)}</span>`).join('')}
      </div>
      <div class="row">
        <div style="flex:0 0 115px;"><label>${esc(t('dueTime'))}</label><input type="time" id="remDue" value="${nowStr}"></div>
        <div><label>${esc(t('reminders'))}</label><input type="text" id="remText"></div>
      </div>
      <button type="button" class="btn btn-primary" onclick="addReminder(false)">✓ ${esc(t('add'))} ${esc(t('reminders'))}</button>
    </div>` : `<button type="button" class="btn btn-primary" style="margin-bottom:12px;" onclick="toggleForm('reminders', true)">${esc(t('add'))} ${esc(t('reminders'))}</button>`;

    bodyHtml = listHtml + formHtml;
  }

  else if (curSec === 'admit') {
    const admitList = getLangList('admits');
    const locs = ['', 'locPt', 'locSafe', 'locHome'];

    bodyHtml = `<div class="card">
      <div class="row">
        <div><label>${esc(t('weight'))}</label><input type="number" step="0.1" inputmode="decimal" value="${esc(p.admit.w)}" oninput="updAdmitField('w', this.value)"></div>
        <div><label>${esc(t('height'))}</label><input type="number" step="0.1" inputmode="decimal" value="${esc(p.admit.h)}" oninput="updAdmitField('h', this.value)"></div>
      </div>
      <div style="margin-bottom:12px;">
        <span class="chip ${p.admit.wb ? 'active' : ''}" onclick="updAdmitField('wb', !getPt(curBed).admit.wb); renderSection();">✓ ${esc(t('wristband'))}</span>
      </div>
      ${admitList.map((itemLbl, idx) => {
        const key = 'std_' + idx;
        const curVal = p.admit.items[key] || '';
        return `<div class="row" style="align-items:center; margin-bottom:6px;">
          <div style="font-size:0.86rem; font-weight:700;">${esc(itemLbl)}</div>
          <div>
            <select onchange="setAdmitItem('${key}', this.value)">
              ${locs.map(lc => `<option value="${lc}" ${curVal === lc ? 'selected' : ''}>${lc ? esc(t(lc)) : '—'}</option>`).join('')}
            </select>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }

  area.innerHTML = topHtml + bodyHtml;
}

function setDrSitePreset(idx) {
  const inp = document.getElementById('drLoc');
  const drSites = getLangList('drSites');
  if (inp && drSites[idx]) inp.value = drSites[idx];
}

function addObs(silent) {
  const p = getPt(curBed);
  const tEl = document.getElementById('obsTime');
  if (!tEl) return;
  const tVal = tEl.value || nowTimeStr();
  const rr = document.getElementById('obsRr').value.trim();
  const sp = document.getElementById('obsSpo2').value.trim();
  const o2 = document.getElementById('obsO2').value;
  const sys = document.getElementById('obsSys').value.trim();
  const dia = document.getElementById('obsDia').value.trim();
  const hr = document.getElementById('obsHr').value.trim();
  const tm = document.getElementById('obsTemp').value.trim();
  const acvVal = document.getElementById('obsAcvpu').value;
  const aIdx = acvVal !== '' ? parseInt(acvVal) : null;
  const pn = document.getElementById('obsPain').value.trim();

  if (!rr && !sp && !o2 && !sys && !dia && !hr && !tm && aIdx === null && !pn) {
    if (silent) openForms.obs = false;
    return;
  }
  p.obs.push({
    t: tVal,
    rr: rr || '-',
    sp: sp || '-',
    o2: o2 || '-',
    bp: (sys || dia) ? `${sys || '-'}/${dia || '-'}` : '-',
    hr: hr || '-',
    tm: tm || '-',
    u: tempUnit,
    aIdx,
    pn,
    done: false
  });
  openForms.obs = false;
  saveDB();
  if (!silent) renderUI();
}

function addBm(silent) {
  const p = getPt(curBed);
  const vEl = document.getElementById('bmVal');
  if (!vEl) return;
  const tVal = document.getElementById('bmTime').value || nowTimeStr();
  const v = vEl.value.trim();
  if (!v) {
    if (silent) openForms.bm = false;
    return;
  }
  const c = document.getElementById('bmCtx').value;
  const f = [];
  document.querySelectorAll('#bmFlags .chip').forEach(ch => {
    if (ch.classList.contains('active') || ch.classList.contains('active-red') || ch.classList.contains('active-amber')) {
      f.push(ch.getAttribute('data-code'));
    }
  });
  p.bm.push({ t: tVal, v, u: bmUnit, c, f, done: false });
  openForms.bm = false;
  saveDB();
  if (!silent) renderUI();
}

function addBp(silent) {
  const p = getPt(curBed);
  const tEl = document.getElementById('bpTime');
  if (!tEl) return;
  const tVal = tEl.value || nowTimeStr();
  const lSys = document.getElementById('bpLSys').value.trim();
  const lDia = document.getElementById('bpLDia').value.trim();
  const sSys = document.getElementById('bpSSys').value.trim();
  const sDia = document.getElementById('bpSDia').value.trim();
  if (!lSys && !lDia && !sSys && !sDia) {
    if (silent) openForms.bp = false;
    return;
  }
  const sym = [];
  document.querySelectorAll('#bpSyms .chip').forEach(ch => {
    if (ch.classList.contains('active') || ch.classList.contains('active-red') || ch.classList.contains('active-amber')) {
      sym.push(ch.getAttribute('data-code'));
    }
  });
  p.bp.push({
    t: tVal,
    l: (lSys || lDia) ? `${lSys || '-'}/${lDia || '-'}` : '-',
    s: (sSys || sDia) ? `${sSys || '-'}/${sDia || '-'}` : '-',
    sym,
    done: false
  });
  openForms.bp = false;
  saveDB();
  if (!silent) renderUI();
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

function clrFluidRow(idx) {
  const p = getPt(curBed);
  if (!p.fluids[idx]) return;
  const hr = p.fluids[idx].t;
  p.fluids[idx] = { t: hr, i: 0, o: 0, src: '', wet: 0, done: false };
  saveDB();
  renderUI();
}

function addBowel(silent) {
  const p = getPt(curBed);
  const aEl = document.getElementById('bwAmt');
  if (!aEl) return;
  const tVal = document.getElementById('bwTime').value || nowTimeStr();
  const a = aEl.value;
  if (!a) {
    if (silent) openForms.bowel = false;
    return;
  }
  const ty = a === 'bno' ? '' : document.getElementById('bwType').value;
  const m = a === 'bno' ? '' : document.getElementById('bwMeth').value;
  p.bowel.push({ t: tVal, a, ty, m, done: false });
  openForms.bowel = false;
  saveDB();
  if (!silent) renderUI();
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
  ['sacrum', 'groin', 'heels', 'elbows'].forEach(s => { p.skin[s] = 'intact'; });
  p.skinDone = false;
  saveDB();
  renderUI();
}

function addCustomSkin(silent) {
  const p = getPt(curBed);
  const sEl = document.getElementById('csSite');
  if (!sEl) return;
  const site = sEl.value;
  const side = document.getElementById('csSide').value;
  const cond = document.getElementById('csCond').value;
  if (!site || !cond) {
    if (silent) openForms.skinSite = false;
    return;
  }
  p.skinCustom.push({ site, side, cond });
  p.skinDone = false;
  openForms.skinSite = false;
  saveDB();
  if (!silent) renderUI();
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

function selectDrStatus(el) {
  const wasActive = el.classList.contains('active');
  document.querySelectorAll('#drStatusChips .chip').forEach(c => c.classList.remove('active'));
  if (!wasActive) el.classList.add('active');
}

function addDressing(dateStr, silent) {
  const p = getPt(curBed);
  const lEl = document.getElementById('drLoc');
  if (!lEl) return;
  const loc = (lEl.value || '').trim();
  if (!loc) {
    if (!silent) alert(t('locNotes'));
    return;
  }
  const fVal = document.getElementById('drFreq').value;
  const f = fVal ? parseInt(fVal) : 0;
  const actChip = document.querySelector('#drStatusChips .chip.active');
  const st = actChip ? actChip.getAttribute('data-code') : '';
  p.dressings.push({ l: loc, dt: dateStr || todayIsoStr(), f, st, done: false });
  openForms.dr = false;
  saveDB();
  if (!silent) renderUI();
}

function delDressing(idx) {
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

function addTurn(silent) {
  const p = getPt(curBed);
  const pEl = document.getElementById('trnPos');
  if (!pEl) return;
  const tVal = document.getElementById('trnTime').value || nowTimeStr();
  const pos = pEl.value;
  if (!pos) {
    if (silent) openForms.turn = false;
    return;
  }
  p.turns.push({ t: tVal, p: pos, done: false });
  openForms.turn = false;
  saveDB();
  if (!silent) renderUI();
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

function addMh(silent) {
  const p = getPt(curBed);
  const tEl = document.getElementById('mhTime');
  if (!tEl) return;
  const tVal = tEl.value || nowTimeStr();
  const m = document.getElementById('mhMood').value;
  const r = document.getElementById('mhLoc').value;
  const rat = document.getElementById('mhRat').value;
  const n = (document.getElementById('mhNote').value || '').trim();
  if (!m && !r && !rat && !n) {
    if (silent) openForms.mh = false;
    return;
  }
  p.mh.push({ t: tVal, m, r, rat, n, done: false });
  openForms.mh = false;
  saveDB();
  if (!silent) renderUI();
}

function addQuickPhrase(pIdx) {
  const p = getPt(curBed);
  const phrases = getLangList('phrases');
  p.events.push({ t: nowTimeStr(), pIdx, e: phrases[pIdx] || '', o: '', done: false });
  openForms.events = false;
  saveDB();
  renderUI();
}

function addEvent(silent) {
  const p = getPt(curBed);
  const eEl = document.getElementById('evNote');
  if (!eEl) return;
  const tVal = document.getElementById('evTime').value || nowTimeStr();
  const e = (eEl.value || '').trim();
  const o = (document.getElementById('evOut').value || '').trim();
  if (!e) {
    if (silent) openForms.events = false;
    return;
  }
  p.events.push({ t: tVal, e, o, done: false });
  openForms.events = false;
  saveDB();
  if (!silent) renderUI();
}

function setTaskPreset(tIdx) {
  const taskList = getLangList('tasks');
  const inp = document.getElementById('remText');
  if (inp && taskList[tIdx]) {
    inp.value = taskList[tIdx];
    inp.setAttribute('data-tidx', tIdx);
  }
}

function addReminder(silent) {
  const p = getPt(curBed);
  const inp = document.getElementById('remText');
  if (!inp) return;
  const due = document.getElementById('remDue').value || nowTimeStr();
  const txt = (inp.value || '').trim();
  if (!txt) {
    if (silent) openForms.reminders = false;
    return;
  }
  const taskList = getLangList('tasks');
  const presetIdx = taskList.indexOf(txt);
  p.reminders.push({
    due,
    txt,
    tIdx: presetIdx > -1 ? presetIdx : undefined,
    done: false,
    alerted: false
  });
  openForms.reminders = false;
  saveDB();
  if (!silent) renderUI();
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
}

function setAdmitItem(key, locCode) {
  const p = getPt(curBed);
  if (!locCode) delete p.admit.items[key];
  else p.admit.items[key] = locCode;
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
  return `<div style="display:flex; justify-content:space-between; align-items:center; gap:10px; padding:4px 0; border-bottom:1px solid var(--border);">
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
      const acvTxt = (typeof o.aIdx === 'number' && acvpuList[o.aIdx]) ? acvpuList[o.aIdx] : (o.a || '-');
      const o2Txt = trCode(o.o2) || '-';
      const txt = `<strong>${esc(o.t)}</strong> - RR <b>${esc(o.rr)}</b>, SpO2 <b>${esc(o.sp)}%</b> (${esc(o2Txt)}), BP <b>${esc(o.bp)}</b>, HR <b>${esc(o.hr)}</b>, <b>${esc(acvTxt)}</b>, Temp <b>${esc(o.tm)}${esc(o.u || tempUnit)}</b>${o.pn !== '' && o.pn !== undefined ? `, ${esc(t('pain'))} <b>${esc(o.pn)}/10</b>` : ''}`;
      rows += sumRowWrap(txt, bIdx, 'obs', i, !!o.done);
    });
  }

  else if (modId === 'bm') {
    p.bm.forEach((x, i) => {
      const txt = `<strong>${esc(x.t)}</strong> - <b>${esc(x.v)} ${esc(x.u || bmUnit)}</b>${x.c ? ' (' + esc(trCode(x.c)) + ')' : ''}${(x.f && x.f.length) ? ' • ' + x.f.map(f => esc(trCode(f))).join(', ') : ''}`;
      rows += sumRowWrap(txt, bIdx, 'bm', i, !!x.done);
    });
  }

  else if (modId === 'bp') {
    p.bp.forEach((x, i) => {
      const txt = `<strong>${esc(x.t)}</strong> - ${esc(t('lying'))}: <b>${esc(x.l)}</b> | ${esc(t('standing'))}: <b>${esc(x.s)}</b>${(x.sym && x.sym.length) ? ' (' + x.sym.map(s => esc(trCode(s))).join(', ') + ')' : ''}`;
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
        const bal = fi - fo;
        const txt = `<strong>${esc(f.t || '')}</strong> - ${esc(t('flIn'))} <b>${fi}ml</b> | ${esc(t('flOut'))} <b>${fo}ml</b>${f.src ? ' (' + esc(trCode(f.src)) + ')' : ''} | ${esc(t('flNet'))} <b>${bal}ml</b>${fw ? ` • ${esc(t('wetPad'))} x<b>${fw}</b>` : ''}`;
        rows += sumRowWrap(txt, bIdx, 'fluids', i, !!f.done);
      }
    });
    if (rows) {
      const net = totI - totO;
      rows += `<div style="padding-top:6px; font-size:0.9rem;">${esc(t('flTotal'))}: ${esc(t('flIn'))} <b>${totI}ml</b> | ${esc(t('flOut'))} <b>${totO}ml</b> | ${esc(t('flNet'))} <b>${net}ml</b></div>`;
    }
  }

  else if (modId === 'bowel') {
    p.bowel.forEach((x, i) => {
      const txt = x.a === 'bno'
        ? `<strong>${esc(x.t)}</strong> - <b>${esc(t('bnoFull'))}</b>`
        : `<strong>${esc(x.t)}</strong> - <b>${esc(trCode(x.a))}</b>${x.ty ? ' — ' + esc(trCode(x.ty)) : ''}${x.m ? ' • ' + esc(trCode(x.m)) : ''}`;
      rows += sumRowWrap(txt, bIdx, 'bowel', i, !!x.done);
    });
  }

  else if (modId === 'amy') {
    const skParts = [];
    ['sacrum', 'groin', 'heels', 'elbows'].forEach(st => {
      if (p.skin[st]) skParts.push(`${esc(t(st))}: <b>${esc(trCode(p.skin[st]))}</b>`);
    });
    p.skinCustom.forEach(c => {
      skParts.push(`${esc(trCode(c.site))}${c.side ? ' (' + esc(trCode(c.side)) + ')' : ''}: <b>${esc(trCode(c.cond))}</b>`);
    });
    if (p.skinCare.length > 0) {
      skParts.push(p.skinCare.map(ck => `<b>${esc(trCode(ck))}</b>`).join(', '));
    }
    if (skParts.length > 0) {
      rows += sumRowWrap(skParts.join(', '), bIdx, 'skin', 0, !!p.skinDone);
    }
    p.dressings.forEach((d, i) => {
      const txt = `<strong>${esc(t('dressing'))}:</strong> <b>${esc(d.l)}</b>${d.st ? ' (' + esc(trCode(d.st)) + ')' : ''}${d.f ? ` — ${esc(t('due'))}: <b>${esc(calcDue(d.dt, d.f))}</b>` : ''}`;
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
    if (p.turnFreq) {
      const planTxt = `${esc(t('turnFreqLbl'))}: <b>${esc(trCode(p.turnFreq))}</b>${p.turnChecks.length ? ' (' + p.turnChecks.map(ck => esc(trCode(ck))).join(', ') + ')' : ''}`;
      rows += sumRowWrap(planTxt, bIdx, 'turnPlan', 0, !!p.turnPlanDone);
    }
    p.turns.forEach((tr, i) => {
      const txt = `<strong>${esc(tr.t)}</strong> - <b>${esc(trCode(tr.p))}</b>`;
      rows += sumRowWrap(txt, bIdx, 'turns', i, !!tr.done);
    });
  }

  else if (modId === 'mh') {
    p.mh.forEach((m, i) => {
      const txt = `<strong>${esc(m.t)}</strong>${p.mhLevel ? ' (' + esc(trCode(p.mhLevel)) + ')' : ''} - ${m.m ? `<b>${esc(trCode(m.m))}</b>` : ''}${m.r ? (m.m ? ' • ' : '') + esc(trCode(m.r)) : ''}${m.rat ? ' • ' + esc(trCode(m.rat)) : ''}${m.n ? ' (' + esc(m.n) + ')' : ''}`;
      rows += sumRowWrap(txt, bIdx, 'mh', i, !!m.done);
    });
  }

  else if (modId === 'events') {
    p.events.forEach((e, i) => {
      const noteTxt = (typeof e.pIdx === 'number' && phrases[e.pIdx]) ? phrases[e.pIdx] : e.e;
      const txt = `<strong>${esc(e.t)}</strong> - ${esc(noteTxt)}${e.o ? ' → <b>' + esc(e.o) + '</b>' : ''}`;
      rows += sumRowWrap(txt, bIdx, 'events', i, !!e.done);
    });
  }

  else if (modId === 'reminders') {
    p.reminders.forEach((r, i) => {
      const tkTxt = (typeof r.tIdx === 'number' && taskList[r.tIdx]) ? taskList[r.tIdx] : r.txt;
      const txt = `<strong>${esc(r.due || '--:--')}</strong> - <b>${esc(tkTxt)}</b>`;
      rows += sumRowWrap(txt, bIdx, 'reminders', i, !!r.done);
    });
  }

  else if (modId === 'admit') {
    const aParts = [];
    if (p.admit.w) aParts.push(`${esc(t('weight'))}: <b>${esc(p.admit.w)}kg</b>`);
    if (p.admit.h) aParts.push(`${esc(t('height'))}: <b>${esc(p.admit.h)}cm</b>`);
    if (p.admit.wb) aParts.push(`<b>${esc(t('wristband'))}</b>`);
    Object.entries(p.admit.items).forEach(([k, lc]) => {
      const idx = parseInt(k.replace('std_', ''));
      const lbl = !isNaN(idx) && admitList[idx] ? admitList[idx] : k;
      aParts.push(`${esc(lbl)}: <b>${esc(trCode(lc))}</b>`);
    });
    if (aParts.length > 0) {
      rows += sumRowWrap(aParts.join(' | '), bIdx, 'admit', 0, !!p.admit.done);
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
            <div style="font-weight:800; margin-bottom:2px;">${esc(t(s.id))}:</div>
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
      alloc.forEach(b => {
        const modRows = buildModuleSummaryForBed(b, s.id);
        if (modRows) {
          modContent += `<div class="summary-sec">
            <div style="font-weight:800; color:var(--teal); margin-bottom:2px;">${esc(b)}:</div>
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
