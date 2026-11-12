const EN_DICT = {
  setup: "Shift Setup",
  sub: "100% offline digital shift notepad. Data never leaves your device.",
  disclaimer: "Personal shift scratchpad only. Does not provide clinical advice, diagnosis or decision support.",
  proTitle: "Unlock Care Digipad Pro (Lifetime)",
  proSub: "Unlocks unlimited beds, saved ward layouts, themes, task alarms and all specialist modules.",
  proPlaceholder: "Enter licence key",
  unlock: "Unlock",
  getPro: "Get a Lifetime Licence Key →",
  prefs: "Preferences & Units",
  theme: "Theme",
  thTeal: "Clinical Teal",
  thBlue: "Healthcare Blue",
  thGreen: "Scrub Green",
  thBerry: "Plum & Berry",
  thSlate: "Midnight Slate",
  thCoral: "Warm Coral",
  shiftHrs: "Shift Hours",
  dayShift: "Day (07:00)",
  nightShift: "Night (19:00)",
  bmUnit: "Glucose Unit",
  tempUnit: "Temp Unit",
  savedLay: "Saved Ward Layouts",
  noLay: "Select a saved layout...",
  addBed: "Your Patient Beds (Max 4 chars)",
  bedHelper: "Tap a bed below to select (✓) or deselect it for today:",
  noBedsYet: "No beds added yet. Type a bed number or initials above and tap + Add.",
  selectAtLeastOne: "Please tap at least one bed to select (✓) it for today's shift.",
  add: "+ Add",
  del: "Del",
  save: "+ Save New",
  activeMods: "Active Modules (Tick to show • Tap ▲ ▼ to reorder)",
  saveLay: "Or save as new layout (e.g. Night)",
  toggleSettings: "⚙ Shift Hours, Units & Active Modules ▾",
  start: "Start Shift",
  startEmpty: "Select Beds to Start",
  returnShift: "Save & Return to Shift",
  bedSingular: "Bed",
  bedPlural: "Beds",
  share: "Share Care Digipad with a Colleague",
  endShift: "End Shift / Clear Data",
  edit: "Edit",
  hide: "Hide",
  dark: "Dark",
  hiddenTitle: "Screen Hidden",
  hiddenSub: "Tap anywhere to return to shift notes",
  delConfirm: "Delete this entry?",
  manageBed: "Manage Bed",
  renameBed: "Rename Bed",
  transferBed: "Transfer / Swap Patient",
  transferPrompt: "Enter destination bed (max 4 chars):",
  swapConfirm: "is occupied. Swap patients? (Cancel = Overwrite destination)",
  clearBed: "Clear Bed (Discharge)",
  clearBedConfirm: "Clear all shift data for this bed?",
  removeBed: "Remove Bed from Shift",
  removeBedConfirm: "Remove this bed and its data from the shift?",
  updLayout: "Save to",
  layoutSaved: "Saved to layout",
  quickAddBedTitle: "Add Bed to Shift",
  savedWardBeds: "Saved Ward Beds (Tap to add):",
  summary: "Summary",
  obs: "Vitals",
  bm: "Glucose",
  bp: "Lying/Standing BP",
  fluid: "Fluids",
  bowel: "Bowels",
  amy: "Skin & Dressings",
  food: "Diet",
  turn: "Turning",
  mh: "Mental Health",
  events: "Notes",
  reminders: "Tasks",
  admit: "Admissions",
  done: "Done",
  markDone: "Mark Done",
  markBed: "Mark Bed Done",
  pending: "Pending Only",
  showAll: "Show All",
  keepOn: "Keep Screen On",
  byBed: "By Bed",
  byMod: "By Module",
  time: "Time",
  dueTime: "Due Time",
  air: "Air",
  context: "When Taken / Context",
  rrLbl: "Respirations (RR)",
  spo2Lbl: "Oxygen Sats (SpO2%)",
  o2Lbl: "Air / Oxygen (O2)",
  bpLbl: "Blood Pressure (Sys / Dia)",
  hrLbl: "Pulse / Heart Rate (HR)",
  tempLbl: "Temperature",
  acvpuLbl: "Alertness (ACVPU)",
  pain: "Pain",
  painLbl: "Pain Score (0-10)",
  o2Nasal: "Nasal Cannula",
  o2Mask: "Mask",
  o2Venturi: "Venturi",
  bmValLbl: "Blood Glucose",
  bmPreB: "Pre-Breakfast (Fasting)",
  bmPostB: "Post-Breakfast (2hr)",
  bmPreL: "Pre-Lunch",
  bmPostL: "Post-Lunch (2hr)",
  bmPreD: "Pre-Dinner",
  bmPostD: "Post-Dinner (2hr)",
  bmBed: "Bedtime",
  bmNight: "Night (02:00 - 04:00)",
  bmRandom: "Random / Symptomatic",
  bmRepeat: "Repeat (Post-Hypo)",
  preMeal: "Pre-Meal",
  postMeal: "Post-Meal",
  night: "Night",
  hypoTreated: "Hypo Treated",
  ketones: "Ketones Checked",
  escRn: "Escalated to RN",
  lying: "Lying",
  standing: "Standing",
  noSym: "No Symptoms",
  dizzy: "Dizzy / Lightheaded",
  unableStand: "Unable to Stand",
  flIn: "Input",
  flOut: "Output",
  flNet: "Balance",
  flTotal: "Total",
  flClr: "Clear",
  wetPad: "Wet Pad",
  srcPu: "Urine (PU)",
  srcCath: "Catheter",
  srcBowel: "Bowels",
  srcVomit: "Vomit",
  amt: "Amount",
  type: "Consistency / Stool Type (1-7)",
  bno: "BNO",
  bnoFull: "Bowels Not Opened (BNO)",
  method: "Method",
  small: "Small",
  medium: "Medium",
  large: "Large",
  smear: "Smear",
  type1: "Hard — Type 1 (Separate hard lumps)",
  type2: "Hard — Type 2 (Lumpy sausage)",
  type3: "Normal — Type 3 (Cracked sausage)",
  type4: "Normal — Type 4 (Smooth & soft)",
  type5: "Soft — Type 5 (Soft blobs)",
  type6: "Loose — Type 6 (Mushy)",
  type7: "Liquid — Type 7 (Watery)",
  mToilet: "Toilet",
  mCommode: "Commode",
  mBedpan: "Bedpan",
  mPad: "Pad (Incontinent)",
  sacrum: "Sacrum",
  groin: "Groin",
  heels: "Heels",
  elbows: "Elbows",
  intact: "Intact",
  blanching: "Red (Blanching)",
  nonBlanch: "Red (Non-Blanching)",
  moisture: "Moisture Lesion / Excoriated",
  broken: "Broken / Cavity",
  tear: "Skin Tear / Bruising",
  drySkin: "Dry / Fragile",
  markIntact: "Mark All Intact",
  addSite: "+ Add Body Site",
  siteHip: "Hip",
  siteAnkle: "Ankle",
  siteShin: "Shin / Leg",
  siteFoot: "Foot / Toes",
  siteArm: "Arm / Forearm",
  siteSpine: "Back / Spine",
  siteShoulder: "Shoulder",
  siteEar: "Ear",
  siteOther: "Other Site",
  sideL: "Left",
  sideR: "Right",
  sideBoth: "Both",
  cBarrier: "Barrier Cream",
  cOffload: "Repositioned / Offloaded",
  cBoots: "Heel Boots / Pillows",
  dressing: "Dressing",
  locNotes: "Location / Notes",
  dueIn: "Next Due In",
  date: "Date Applied / Checked",
  today: "Today",
  due: "Due",
  selectDate: "Select Date",
  day1: "1 Day",
  day2: "2 Days",
  day3: "3 Days",
  day5: "5 Days",
  day7: "7 Days",
  drIntact: "Intact & Dry",
  drChanged: "Changed Today",
  drLeak: "Leaking / Strikethrough",
  drLift: "Lifting",
  b: "Breakfast",
  l: "Lunch",
  d: "Dinner",
  supp: "Supplements / Snacks",
  taken: "Taken",
  refused: "Refused",
  nbm: "Nil By Mouth (NBM)",
  dIndep: "Independent",
  dAssist: "Assisted",
  dPrompt: "Prompted",
  dThick: "Thickened Fluids",
  turnFreqLbl: "Turn / Repositioning Plan",
  tf2h: "2-Hourly Turns",
  tf3h: "3-Hourly Turns",
  tf4h: "4-Hourly Turns",
  tfComfort: "PRN / Comfort Only",
  tfIndep: "Independent (Self-Turning)",
  posLbl: "Position",
  back: "Back (Supine)",
  left: "Left Side",
  right: "Right Side",
  chair: "Sitting in Chair",
  walking: "Walking / Mobilising",
  turnNow: "+ Log Turn / Position",
  tBell: "Call Bell in Reach",
  tRails: "Bed Rails Up",
  tMattress: "Air Mattress Checked",
  obsLevel: "Observation Level",
  lvl1: "Level 1: General",
  lvl2: "Level 2: Intermittent",
  lvl3: "Level 3: Within Eyesight",
  lvl4: "Level 4: Within Arm's Length",
  mood: "Mood / Presentation",
  calm: "Calm & Cooperative",
  anxious: "Anxious / Distressed",
  agitated: "Agitated / Restless",
  low: "Low in Mood / Withdrawn",
  confused: "Confused / Disorientated",
  vocal: "Vocal / Calling Out",
  elevated: "Elevated / Elated",
  hostile: "Hostile / Aggressive",
  rest: "Location / Activity",
  asleep: "Asleep in Bed",
  settled: "Resting on Bed",
  mhChair: "Sitting in Chair",
  restless: "Walking / Pacing",
  mhBath: "In Bathroom / Personal Care",
  mhCommunal: "In Communal Area",
  mhVisit: "With Visitors",
  outOfBed: "Attempting to Leave Ward",
  mhRationaleLbl: "Intervention / Clinical Rationale",
  mhRatRoutine: "Routine Check — Safe & Settled",
  mhRatEngage: "1:1 Engagement & Reassurance",
  mhRatDeesc: "Verbal De-escalation / Redirection",
  mhRatReorient: "Reorientated to Time & Ward",
  mhRatEnv: "Environment Checked & Safe",
  mhRatFluids: "Food & Fluids Encouraged",
  mhRatPrn: "PRN Medication Given",
  mhRatEsc: "Escalated to Nurse in Charge / Medic",
  mhNoteLbl: "Additional Notes (Optional)",
  outcome: "Outcome / Action",
  weight: "Weight (kg)",
  height: "Height (cm)",
  wristband: "ID Wristband Checked",
  locPt: "With Patient",
  locSafe: "In Ward Safe",
  locHome: "Sent Home",
  acvpu: ["A (Alert)", "C (New Confusion)", "V (Voice)", "P (Pain)", "U (Unresponsive)"],
  phrases: ["Personal care given", "Washed & dressed", "Pressure areas intact", "Mobilised to chair", "Escalated to RN", "Family updated"],
  tasks: ["Bloods", "ECG", "Repeat Vitals", "Blood Glucose (BM)", "Bladder Scan", "Cannula Check"],
  admits: ["Dentures", "Glasses", "Hearing Aid", "Walking Frame / Stick", "Phone & Charger", "Keys", "Cash / Wallet"],
  drSites: ["Sacrum", "Left Heel", "Right Heel", "Left Leg", "Right Leg", "Abdomen"]
};

const RTL_LANGS = ['ar', 'ur', 'fa'];
const ALL_MODS = [
  {id:'obs', pro:false},
  {id:'bm', pro:false},
  {id:'bp', pro:true},
  {id:'fluid', pro:false},
  {id:'bowel', pro:false},
  {id:'amy', pro:true},
  {id:'food', pro:false},
  {id:'turn', pro:false},
  {id:'mh', pro:true},
  {id:'events', pro:false},
  {id:'reminders', pro:true},
  {id:'admit', pro:true}
];

let isPro = localStorage.getItem('cdu_pro') === '1';
let curLang = localStorage.getItem('cdu_lang') || 'en';
let curTheme = localStorage.getItem('cdu_color') || 'teal';
let isDark = localStorage.getItem('cdu_dark') === '1';
let curShift = localStorage.getItem('cdu_shift') || 'day';
let bmUnit = localStorage.getItem('cdu_bm_unit') || 'mmol/L';
let tempUnit = localStorage.getItem('cdu_temp_unit') || '°C';

let wardBeds = JSON.parse(localStorage.getItem('cdu_ward') || '[]');
let alloc = JSON.parse(localStorage.getItem('cdu_alloc') || '[]');
let db = JSON.parse(localStorage.getItem('cdu_db') || '{}');
let layouts = JSON.parse(localStorage.getItem('cdu_layouts') || '{}');
let activeLayoutName = localStorage.getItem('cdu_active_lay') || '';
let modConfig = JSON.parse(localStorage.getItem('cdu_mods') || 'null');

let curBed = alloc[0] || '';
let curSec = 'obs';
let showSummary = false;
let summaryGroup = 'bed';
let hideCompleted = false;
let showManageBed = false;
let showQuickAddBed = false;
let settingsOpen = false;
let openForms = {};
let activeFluidIdx = 0;
let activeFluidType = 'i';
let wakeLockObj = null;
let alertTimerId = null;
let alarmAudioCtx = null;

function normalizeLayouts() {
  if (!layouts || typeof layouts !== 'object') {
    layouts = {};
    return;
  }
  Object.keys(layouts).forEach(k => {
    const val = layouts[k];
    if (Array.isArray(val)) return;
    if (val && typeof val === 'object') {
      if (Array.isArray(val.alloc)) layouts[k] = val.alloc;
      else if (Array.isArray(val.beds)) layouts[k] = val.beds;
      else if (Array.isArray(val.ward)) layouts[k] = val.ward;
      else delete layouts[k];
    } else {
      delete layouts[k];
    }
  });
}
normalizeLayouts();

function getShiftHours() {
  const startHr = curShift === 'night' ? 19 : 7;
  const hrs = [];
  for (let i = 0; i < 12; i++) {
    const h = (startHr + i) % 24;
    hrs.push(String(h).padStart(2, '0') + ':00');
  }
  return hrs;
}

function getDict() {
  if (curLang !== 'en' && window.CDU_LANGS && window.CDU_LANGS[curLang]) {
    return window.CDU_LANGS[curLang];
  }
  return EN_DICT;
}

function t(k) {
  const dict = getDict();
  let val = (dict && dict[k] !== undefined) ? dict[k] : (EN_DICT[k] || k);
  if (k === 'proTitle' && typeof val === 'string') {
    val = val.replace(/£9\.99\s*|9,99\s*£\s*/g, '');
  }
  return val;
}

function getOxygenLabel() {
  const lbl = t('o2Lbl');
  if (typeof lbl === 'string' && lbl.includes('/')) {
    return lbl.split('/')[1].trim();
  }
  return 'Oxygen (O2)';
}

function getLangList(k) {
  const dict = getDict();
  if (dict && Array.isArray(dict[k])) return dict[k];
  return EN_DICT[k] || [];
}

function trCode(val) {
  if (!val) return '';
  if (val === 'o2') return getOxygenLabel();
  const dict = getDict();
  if (dict && dict[val] !== undefined && typeof dict[val] === 'string') return dict[val];
  if (EN_DICT[val] !== undefined && typeof EN_DICT[val] === 'string') return EN_DICT[val];
  return val;
}

function esc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function getLocaleCode() {
  if (curLang === 'en') {
    return (navigator.language && navigator.language.toLowerCase().startsWith('en')) ? navigator.language : 'en-GB';
  }
  return curLang;
}

function todayIsoStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function formatIsoDate(isoStr) {
  if (!isoStr) return '';
  const parts = isoStr.split('-');
  if (parts.length !== 3) return isoStr;
  const dt = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  if (isNaN(dt)) return isoStr;
  return dt.toLocaleDateString(getLocaleCode(), { day: 'numeric', month: 'short', year: 'numeric' });
}

function calcDue(dateStr, days = 3) {
  if (!dateStr || !days) return '—';
  const parts = dateStr.split('-');
  let dt;
  if (parts.length === 3) {
    dt = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  } else {
    dt = new Date(dateStr);
  }
  if (isNaN(dt)) return '—';
  dt.setDate(dt.getDate() + (parseInt(days) || 3));
  return dt.toLocaleDateString(getLocaleCode(), { day: 'numeric', month: 'short', year: 'numeric' });
}

function nowTimeStr() {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

function initModConfig() {
  if (!Array.isArray(modConfig) || modConfig.length === 0) {
    modConfig = ALL_MODS.map(m => ({ id: m.id, on: true }));
  } else {
    ALL_MODS.forEach(m => {
      if (!modConfig.some(x => x.id === m.id)) modConfig.push({ id: m.id, on: true });
    });
  }
  if (!isPro) {
    modConfig.forEach(m => {
      const def = ALL_MODS.find(x => x.id === m.id);
      if (def && def.pro) m.on = false;
    });
  }
}

function getActiveSections() {
  initModConfig();
  return modConfig.filter(m => {
    const def = ALL_MODS.find(x => x.id === m.id);
    if (!def) return false;
    if (def.pro && !isPro) return false;
    return m.on;
  });
}

function saveDB() {
  localStorage.setItem('cdu_db', JSON.stringify(db));
  localStorage.setItem('cdu_alloc', JSON.stringify(alloc));
  localStorage.setItem('cdu_ward', JSON.stringify(wardBeds));
}

async function unlockPro() {
  const inp = document.getElementById('proKeyInput');
  const btn = document.getElementById('btnUnlock');
  const key = (inp ? inp.value : '').trim().toUpperCase();
  if (!key) return;

  if (key === 'JORDAN-CDP-MASTER') {
    isPro = true;
    localStorage.setItem('cdu_pro', '1');
    modConfig = ALL_MODS.map(m => ({ id: m.id, on: true }));
    localStorage.setItem('cdu_mods', JSON.stringify(modConfig));
    initSetup();
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  try {
    const res = await fetch('https://api.lemonsqueezy.com/v1/licenses/activate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        license_key: key,
        instance_name: 'CareDigipad_Device'
      })
    });
    const data = await res.json();
    if (data && data.activated === true) {
      isPro = true;
      localStorage.setItem('cdu_pro', '1');
      if (data.instance && data.instance.id) {
        localStorage.setItem('cdu_pro_instance', data.instance.id);
      }
      modConfig = ALL_MODS.map(m => ({ id: m.id, on: true }));
      localStorage.setItem('cdu_mods', JSON.stringify(modConfig));
      initSetup();
    } else {
      alert((data && data.error) ? data.error : 'Invalid or already activated licence key (1-device limit).');
    }
  } catch (err) {
    alert('Please connect to the internet for 1 second to verify and activate your licence key.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = t('unlock'); }
  }
}

function initSetup() {
  normalizeLayouts();
  document.documentElement.lang = curLang;
  document.documentElement.dir = RTL_LANGS.includes(curLang) ? 'rtl' : 'ltr';
  document.body.setAttribute('data-theme', isDark ? 'night' : 'day');
  document.body.setAttribute('data-color', isPro ? curTheme : 'teal');
  document.getElementById('darkToggle').checked = isDark;
  document.getElementById('langSelect').value = curLang;

  initModConfig();
  applyStaticTranslations();
  renderThemeOptions();
  renderLayoutDropdown();
  renderSetupBeds();
  renderModList();

  document.getElementById('proBanner').classList.toggle('hidden', isPro);
  document.getElementById('savedLayoutRow').classList.toggle('hidden', !isPro);

  if (alloc.length > 0 && localStorage.getItem('cdu_start')) {
    document.getElementById('setupView').classList.add('hidden');
    document.getElementById('mainView').classList.remove('hidden');
    document.getElementById('editBtn').classList.remove('hidden');
    if (!curBed || !alloc.includes(curBed)) curBed = alloc[0];
    const activeSecs = getActiveSections();
    if (activeSecs.length > 0 && !activeSecs.some(s => s.id === curSec)) curSec = activeSecs[0].id;
    renderUI();
    if (isPro) startAlertTimer();
  } else {
    document.getElementById('setupView').classList.remove('hidden');
    document.getElementById('mainView').classList.add('hidden');
    document.getElementById('editBtn').classList.add('hidden');
  }
}

function applyStaticTranslations() {
  document.getElementById('editBtn').textContent = t('edit');
  document.getElementById('hideBtn').textContent = t('hide');
  document.getElementById('darkLbl').textContent = t('dark');
  document.getElementById('privTitle').textContent = t('hiddenTitle');
  document.getElementById('privSub').textContent = t('hiddenSub');
  document.getElementById('lblSetup').textContent = t('setup');
  document.getElementById('lblSub').textContent = t('sub');
  document.getElementById('lblDisclaimer').textContent = t('disclaimer');
  document.getElementById('lblProTitle').textContent = t('proTitle');
  document.getElementById('lblProSub').textContent = t('proSub');
  document.getElementById('proKeyInput').placeholder = t('proPlaceholder');
  document.getElementById('btnUnlock').textContent = t('unlock');
  document.getElementById('lnkGetPro').textContent = t('getPro');
  document.getElementById('lblSavedLay').textContent = t('savedLay');
  document.getElementById('delLayBtn').textContent = t('del');
  document.getElementById('lblAddBed').textContent = t('addBed');
  document.getElementById('btnAddBed').textContent = t('add');
  document.getElementById('lblBedHelper').textContent = t('bedHelper');
  document.getElementById('btnToggleSettings').textContent = t('toggleSettings');
  document.getElementById('lblPrefs').textContent = t('prefs');
  document.getElementById('lblTheme').textContent = t('theme');
  document.getElementById('lblShiftHrs').textContent = t('shiftHrs');
  document.getElementById('btnDayShift').textContent = t('dayShift');
  document.getElementById('btnNightShift').textContent = t('nightShift');
  document.getElementById('lblBmUnit').textContent = t('bmUnit');
  document.getElementById('lblTempUnit').textContent = t('tempUnit');
  document.getElementById('lblActiveMods').textContent = t('activeMods');
  document.getElementById('newLayoutName').placeholder = t('saveLay');
  document.getElementById('btnSaveLay').textContent = t('save');
  document.getElementById('btnShareSetup').textContent = t('share');
  document.getElementById('btnShareMain').textContent = t('share');
  document.getElementById('btnEndShift').textContent = t('endShift');

  document.getElementById('btnDayShift').classList.toggle('selected', curShift === 'day');
  document.getElementById('btnNightShift').classList.toggle('selected', curShift === 'night');
  document.getElementById('btnBmMmol').classList.toggle('selected', bmUnit === 'mmol/L');
  document.getElementById('btnBmMg').classList.toggle('selected', bmUnit === 'mg/dL');
  document.getElementById('btnTempC').classList.toggle('selected', tempUnit === '°C');
  document.getElementById('btnTempF').classList.toggle('selected', tempUnit === '°F');
}

function setLang(l) {
  curLang = l;
  localStorage.setItem('cdu_lang', l);
  initSetup();
}

function renderThemeOptions() {
  const themes = [
    ['teal', t('thTeal')],
    ['blue', t('thBlue')],
    ['green', t('thGreen')],
    ['berry', t('thBerry')],
    ['slate', t('thSlate')],
    ['coral', t('thCoral')]
  ];
  const sel = document.getElementById('themeSelect');
  sel.innerHTML = themes.map(([val, lbl]) => `<option value="${val}" ${curTheme===val?'selected':''}>${esc(lbl)}${!isPro && val!=='teal' ? ' (Pro)' : ''}</option>`).join('');
  sel.disabled = !isPro;
}

function setTheme(th) {
  if (!isPro) return;
  curTheme = th;
  localStorage.setItem('cdu_color', th);
  document.body.setAttribute('data-color', th);
}

function setShift(s) {
  curShift = s;
  localStorage.setItem('cdu_shift', s);
  const hrs = getShiftHours();
  Object.keys(db).forEach(b => {
    if (db[b] && Array.isArray(db[b].fluids) && db[b].fluids.length === 12) {
      db[b].fluids.forEach((f, i) => { f.t = hrs[i]; });
    }
  });
  saveDB();
  applyStaticTranslations();
}

function setBmUnit(u) {
  bmUnit = u;
  localStorage.setItem('cdu_bm_unit', u);
  applyStaticTranslations();
}

function setTempUnit(u) {
  tempUnit = u;
  localStorage.setItem('cdu_temp_unit', u);
  applyStaticTranslations();
}

function toggleSettingsPanel() {
  settingsOpen = !settingsOpen;
  document.getElementById('settingsBody').classList.toggle('hidden', !settingsOpen);
}

function renderLayoutDropdown() {
  const sel = document.getElementById('layoutSelect');
  const delBtn = document.getElementById('delLayBtn');
  if (!sel) return;
  const names = Object.keys(layouts);
  sel.innerHTML = `<option value="">${esc(t('noLay'))}</option>` +
    names.map(n => {
      const cnt = Array.isArray(layouts[n]) ? layouts[n].length : 0;
      return `<option value="${esc(n)}" ${activeLayoutName === n ? 'selected' : ''}>${esc(n)} (${cnt})</option>`;
    }).join('');
  if (delBtn) delBtn.classList.toggle('hidden', !activeLayoutName || !layouts[activeLayoutName]);
}

function loadLayout(name) {
  if (!name || !Array.isArray(layouts[name])) {
    activeLayoutName = '';
    localStorage.setItem('cdu_active_lay', '');
    renderLayoutDropdown();
    return;
  }
  activeLayoutName = name;
  localStorage.setItem('cdu_active_lay', name);
  const layBeds = layouts[name];
  layBeds.forEach(b => { if (!wardBeds.includes(b)) wardBeds.push(b); });
  alloc = [...layBeds];
  saveDB();
  renderLayoutDropdown();
  renderSetupBeds();
}

function saveLayout() {
  if (!isPro) return;
  const inp = document.getElementById('newLayoutName');
  const name = (inp ? inp.value : '').trim();
  if (!name) return;
  if (alloc.length === 0) {
    alert(t('selectAtLeastOne'));
    return;
  }
  layouts[name] = [...alloc];
  activeLayoutName = name;
  localStorage.setItem('cdu_layouts', JSON.stringify(layouts));
  localStorage.setItem('cdu_active_lay', name);
  inp.value = '';
  renderLayoutDropdown();
}

function deleteLayout() {
  if (!activeLayoutName || !layouts[activeLayoutName]) return;
  if (!confirm(t('delConfirm'))) return;
  delete layouts[activeLayoutName];
  activeLayoutName = '';
  localStorage.setItem('cdu_layouts', JSON.stringify(layouts));
  localStorage.setItem('cdu_active_lay', '');
  renderLayoutDropdown();
}

function renderSetupBeds() {
  const grid = document.getElementById('setupBedGrid');
  if (!grid) return;
  if (wardBeds.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; font-size:0.84rem; color:var(--text-sub); padding:8px 0;">${esc(t('noBedsYet'))}</div>`;
  } else {
    grid.innerHTML = wardBeds.map((b, idx) => {
      const sel = alloc.includes(b);
      return `<div class="bed-item ${sel ? 'selected' : ''}" onclick="toggleBedAlloc(${idx})">
        ${sel ? '✓ ' : ''}${esc(b)}
        <button type="button" class="bed-del" onclick="event.stopPropagation(); deleteWardBed(${idx})">✕</button>
      </div>`;
    }).join('');
  }
  updateStartBtn();
}

function addCustomBed() {
  const inp = document.getElementById('newBedInput');
  const val = (inp ? inp.value : '').trim().toUpperCase().slice(0, 4);
  if (!val) return;
  if (!isPro && alloc.length >= 4 && !alloc.includes(val)) {
    alert(t('proSub'));
    return;
  }
  if (!wardBeds.includes(val)) wardBeds.push(val);
  if (!alloc.includes(val)) alloc.push(val);
  inp.value = '';
  saveDB();
  renderSetupBeds();
}

function toggleBedAlloc(idx) {
  const b = wardBeds[idx];
  if (!b) return;
  const pos = alloc.indexOf(b);
  if (pos > -1) {
    alloc.splice(pos, 1);
  } else {
    if (!isPro && alloc.length >= 4) {
      alert(t('proSub'));
      return;
    }
    alloc.push(b);
  }
  saveDB();
  renderSetupBeds();
}

function deleteWardBed(idx) {
  const b = wardBeds[idx];
  if (!b) return;
  wardBeds.splice(idx, 1);
  alloc = alloc.filter(x => x !== b);
  saveDB();
  renderSetupBeds();
}

function updateStartBtn() {
  const btn = document.getElementById('startBtn');
  if (!btn) return;
  const inShift = !!localStorage.getItem('cdu_start');
  if (alloc.length === 0) {
    btn.textContent = t('startEmpty');
    btn.disabled = true;
    btn.style.opacity = '0.6';
  } else {
    btn.disabled = false;
    btn.style.opacity = '1';
    const bedWord = alloc.length === 1 ? t('bedSingular') : t('bedPlural');
    btn.textContent = inShift ? `${t('returnShift')} (${alloc.length} ${bedWord})` : `${t('start')} (${alloc.length} ${bedWord})`;
  }
}

function renderModList() {
  const wrap = document.getElementById('modList');
  if (!wrap) return;
  initModConfig();
  wrap.innerHTML = modConfig.map((m, idx) => {
    const def = ALL_MODS.find(x => x.id === m.id);
    const locked = def && def.pro && !isPro;
    return `<div class="mod-item" style="${locked ? 'opacity:0.6;' : ''}">
      <label style="display:flex; align-items:center; gap:8px; margin:0; font-size:0.88rem; color:var(--text); cursor:pointer;">
        <input type="checkbox" ${m.on && !locked ? 'checked' : ''} ${locked ? 'disabled' : ''} onchange="toggleMod(${idx}, this.checked)">
        <span>${esc(t(m.id))}</span>
        ${def && def.pro ? '<span class="pro-badge">PRO</span>' : ''}
      </label>
      <div style="display:flex; gap:4px;">
        <button type="button" class="btn-subtle btn-sm" style="padding:2px 8px;" onclick="moveMod(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>▲</button>
        <button type="button" class="btn-subtle btn-sm" style="padding:2px 8px;" onclick="moveMod(${idx}, 1)" ${idx === modConfig.length - 1 ? 'disabled' : ''}>▼</button>
      </div>
    </div>`;
  }).join('');
}

function toggleMod(idx, checked) {
  if (!modConfig[idx]) return;
  modConfig[idx].on = checked;
  localStorage.setItem('cdu_mods', JSON.stringify(modConfig));
}

function moveMod(idx, dir) {
  const target = idx + dir;
  if (target < 0 || target >= modConfig.length) return;
  const temp = modConfig[idx];
  modConfig[idx] = modConfig[target];
  modConfig[target] = temp;
  localStorage.setItem('cdu_mods', JSON.stringify(modConfig));
  renderModList();
}

function startShift() {
  if (alloc.length === 0) {
    alert(t('selectAtLeastOne'));
    return;
  }
  localStorage.setItem('cdu_start', '1');
  if (!curBed || !alloc.includes(curBed)) curBed = alloc[0];
  const activeSecs = getActiveSections();
  if (activeSecs.length > 0 && !activeSecs.some(s => s.id === curSec)) curSec = activeSecs[0].id;
  saveDB();
  document.getElementById('setupView').classList.add('hidden');
  document.getElementById('mainView').classList.remove('hidden');
  document.getElementById('editBtn').classList.remove('hidden');
  renderUI();
  if (isPro) startAlertTimer();
}

function editBeds() {
  if (typeof commitPendingForm === 'function') commitPendingForm();
  document.getElementById('mainView').classList.add('hidden');
  document.getElementById('setupView').classList.remove('hidden');
  document.getElementById('editBtn').classList.add('hidden');
  renderSetupBeds();
}

function clearShift() {
  if (!confirm(t('endShift') + '?')) return;
  db = {};
  openForms = {};
  localStorage.removeItem('cdu_db');
  localStorage.removeItem('cdu_start');
  showSummary = false;
  showManageBed = false;
  showQuickAddBed = false;
  initSetup();
}

function toggleDark(checked) {
  isDark = checked;
  localStorage.setItem('cdu_dark', checked ? '1' : '0');
  document.body.setAttribute('data-theme', isDark ? 'night' : 'day');
}

function togglePrivacy(show) {
  document.getElementById('privacyScreen').classList.toggle('hidden', !show);
}

function shareApp() {
  const shareData = {
    title: 'Care Digipad',
    text: t('sub'),
    url: window.location.href
  };
  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard');
  }
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
  if (!p.admit || typeof p.admit !== 'object') p.admit = { w: '', h: '', wb: false, items: {}, done: false };
  if (!p.admit.items || typeof p.admit.items !== 'object') p.admit.items = {};
  return p;
}

function modEntryCount(b, modId) {
  const p = getPt(b);
  switch (modId) {
    case 'obs': return p.obs.length;
    case 'bm': return p.bm.length;
    case 'bp': return p.bp.length;
    case 'fluid': return p.fluids.reduce((acc, f) => acc + ((f.i > 0 || f.o > 0 || f.wet > 0) ? 1 : 0), 0);
    case 'bowel': return p.bowel.length;
    case 'amy': return Object.values(p.skin).filter(Boolean).length + p.skinCustom.length + p.dressings.length;
    case 'food': return [p.diet.b, p.diet.l, p.diet.d].filter(Boolean).length + p.diet.supps.length + (p.diet.supp ? 1 : 0);
    case 'turn': return p.turns.length + (p.turnFreq ? 1 : 0);
    case 'mh': return p.mh.length;
    case 'events': return p.events.length;
    case 'reminders': return p.reminders.filter(r => !r.done).length;
    case 'admit': return (p.admit.w || p.admit.h || p.admit.wb || Object.keys(p.admit.items).length > 0) ? 1 : 0;
    default: return 0;
  }
}

function hasOverdueTask(b) {
  if (!isPro) return false;
  const p = getPt(b);
  const now = new Date();
  const curMins = now.getHours() * 60 + now.getMinutes();
  return p.reminders.some(r => {
    if (r.done || !r.due) return false;
    const [hh, mm] = r.due.split(':').map(Number);
    if (isNaN(hh) || isNaN(mm)) return false;
    return curMins >= (hh * 60 + mm);
  });
}

function toggleForm(formKey, show) {
  openForms[formKey] = show;
  renderSection();
}

function renderUI() {
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
    renderSummary();
    return;
  }

  subNav.classList.remove('hidden');
  if (activeSecs.length > 0 && !activeSecs.some(s => s.id === curSec)) {
    curSec = activeSecs[0].id;
  }

  subNav.innerHTML = activeSecs.map(s => {
    const cnt = modEntryCount(curBed, s.id);
    const badge = cnt > 0 ? `<span class="mod-count">${cnt}</span>` : '';
    const alertDot = (s.id === 'reminders' && hasOverdueTask(curBed)) ? `<span class="alert-dot"></span>` : '';
    return `<button type="button" class="tab-btn ${curSec === s.id ? 'active-sec' : ''}" onclick="selectSec('${s.id}')">${esc(t(s.id))}${badge}${alertDot}</button>`;
  }).join('');

  renderSection();
}

function selectBedIdx(bIdx) {
  if (!alloc[bIdx]) return;
  if (typeof commitPendingForm === 'function') commitPendingForm();
  showSummary = false;
  showManageBed = false;
  showQuickAddBed = false;
  curBed = alloc[bIdx];
  activeFluidIdx = 0;
  renderUI();
}

function selectSec(s) {
  if (typeof commitPendingForm === 'function') commitPendingForm();
  showSummary = false;
  curSec = s;
  renderUI();
}

function toggleSummary(val) {
  if (typeof commitPendingForm === 'function') commitPendingForm();
  showSummary = val;
  showManageBed = false;
  showQuickAddBed = false;
  renderUI();
}

function toggleManageBed() {
  showManageBed = !showManageBed;
  showQuickAddBed = false;
  renderSection();
}

function toggleQuickAddBed() {
  showQuickAddBed = !showQuickAddBed;
  showManageBed = false;
  if (showSummary) showSummary = false;
  renderUI();
}

function quickAddBedByIdx(wIdx) {
  if (wardBeds[wIdx]) quickAddBedToShift(wardBeds[wIdx]);
}

function quickAddBedToShift(bedName) {
  const inp = document.getElementById('quickBedInput');
  const val = (bedName || (inp ? inp.value : '')).trim().toUpperCase().slice(0, 4);
  if (!val) return;
  if (!isPro && alloc.length >= 4 && !alloc.includes(val)) {
    alert(t('proSub'));
    return;
  }
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
  if (alloc.includes(newName)) {
    alert(newName + ' ' + t('swapConfirm'));
    return;
  }
  db[newName] = db[curBed];
  delete db[curBed];
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
  if (db[dest] && Object.keys(db[dest]).length > 0) {
    if (confirm(`${dest} ${t('swapConfirm')}`)) {
      const temp = db[dest];
      db[dest] = db[curBed];
      db[curBed] = temp;
    } else {
      db[dest] = db[curBed];
      delete db[curBed];
    }
  } else {
    db[dest] = db[curBed];
    delete db[curBed];
  }
  if (!wardBeds.includes(dest)) wardBeds.push(dest);
  if (!alloc.includes(dest)) {
    const idx = alloc.indexOf(curBed);
    if (idx > -1) alloc[idx] = dest;
    else alloc.push(dest);
  }
  curBed = dest;
  showManageBed = false;
  saveDB();
  renderUI();
}

function clearCurrentBed() {
  if (!confirm(t('clearBedConfirm'))) return;
  delete db[curBed];
  showManageBed = false;
  saveDB();
  renderUI();
}

function removeCurrentBedFromShift() {
  if (!confirm(t('removeBedConfirm'))) return;
  delete db[curBed];
  alloc = alloc.filter(b => b !== curBed);
  showManageBed = false;
  saveDB();
  if (alloc.length === 0) {
    localStorage.removeItem('cdu_start');
    initSetup();
  } else {
    curBed = alloc[0];
    renderUI();
  }
}

function updateActiveLayoutFromShift() {
  if (!activeLayoutName) return;
  layouts[activeLayoutName] = [...alloc];
  localStorage.setItem('cdu_layouts', JSON.stringify(layouts));
  alert(`${t('layoutSaved')}: ${activeLayoutName}`);
}

async function toggleWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try {
    if (wakeLockObj) {
      await wakeLockObj.release();
      wakeLockObj = null;
    } else {
      wakeLockObj = await navigator.wakeLock.request('screen');
      wakeLockObj.addEventListener('release', () => { wakeLockObj = null; if (showSummary) renderSummary(); });
    }
    renderSummary();
  } catch (e) {}
}

function playAlarmBeep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!alarmAudioCtx) alarmAudioCtx = new Ctx();
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

function startAlertTimer() {
  if (alertTimerId) clearInterval(alertTimerId);
  alertTimerId = setInterval(() => {
    if (!isPro) return;
    const now = new Date();
    const curMins = now.getHours() * 60 + now.getMinutes();
    let triggered = false;
    alloc.forEach(b => {
      const p = getPt(b);
      p.reminders.forEach(r => {
        if (!r.done && !r.alerted && r.due) {
          const [hh, mm] = r.due.split(':').map(Number);
          if (!isNaN(hh) && !isNaN(mm) && curMins >= (hh * 60 + mm)) {
            r.alerted = true;
            triggered = true;
          }
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

window.addEventListener('DOMContentLoaded', initSetup);
