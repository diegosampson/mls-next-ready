// ── CONFIG ──
const ANTHROPIC_API_KEY = "YOUR_API_KEY_HERE"; // paste your key when ready

// ── DATA ──
const LEVELS = [
  { name:"Foundation",    min:0,     max:500,   col:"#8A9BB5", icon:"🌱" },
  { name:"Competitive",   min:500,   max:1500,  col:"#00C8FF", icon:"⚡" },
  { name:"Elite",         min:1500,  max:3500,  col:"#FFB800", icon:"🏆" },
  { name:"MLS NEXT",      min:3500,  max:7000,  col:"#FF7A00", icon:"🎯" },
  { name:"MLS NEXT Ready",min:7000,  max:15000, col:"#FF3D5A", icon:"🚀" },
  { name:"Captain",       min:15000, max:999999,col:"#A855F7", icon:"👑" },
];

const POSITIONS = ["Striker","Winger","Midfielder","Defender","Goalkeeper"];

const AVATAR_COLORS = ["#1A56FF","#FF3D5A","#00C8FF","#FFB800","#A855F7","#00E87A","#FF7A00","#06B6D4"];

const SOCCER_DRILLS = [
  { id:"team",        name:"Team Practice",  icon:"👥", col:"#1A56FF", xpPer:2,   defReps:90,  unit:"mins",    cat:"Team",      wf:false, desc:"Full team training session. Count total minutes on the field." },
  { id:"ballmastery", name:"Ball Mastery",   icon:"⚽", col:"#1A56FF", xpPer:1.5, defReps:100, unit:"touches", cat:"Technical", wf:true,  desc:"V-pulls, inside-outside, toe taps, rollovers. Count every touch." },
  { id:"juggling",    name:"Juggling",       icon:"🔮", col:"#00C8FF", xpPer:2,   defReps:50,  unit:"juggles", cat:"Technical", wf:true,  desc:"Consecutive juggles without dropping. Count your best set." },
  { id:"shooting",    name:"Shooting",       icon:"🥅", col:"#FF7A00", xpPer:3,   defReps:25,  unit:"shots",   cat:"Finishing", wf:true,  desc:"Strike low to corners. Count shots on target only." },
  { id:"passing",     name:"Passing",        icon:"📐", col:"#A855F7", xpPer:2,   defReps:40,  unit:"passes",  cat:"Technical", wf:true,  desc:"Short-long combinations. Count completed accurate passes." },
  { id:"agility",     name:"Agility",        icon:"⚡", col:"#FFB800", xpPer:2.5, defReps:20,  unit:"reps",    cat:"Athletic",  wf:false, desc:"Cone weaves, ladder drills, hard direction changes." },
  { id:"sprint",      name:"Sprint Work",    icon:"💨", col:"#FF3D5A", xpPer:3,   defReps:10,  unit:"sprints", cat:"Athletic",  wf:false, desc:"Max effort 20–40 yard sprints. Full recovery between each." },
  { id:"conditioning",name:"Conditioning",   icon:"🔥", col:"#FF7A00", xpPer:1.5, defReps:20,  unit:"mins",    cat:"Athletic",  wf:false, desc:"Continuous cardio — runs, circuits. Count total minutes." },
  { id:"recovery",    name:"Recovery",       icon:"🧘", col:"#00E87A", xpPer:1,   defReps:15,  unit:"mins",    cat:"Recovery",  wf:false, desc:"Active recovery, foam rolling, light stretching." },
];

const STRENGTH_DRILLS = [
  { id:"pushups",  name:"Pushups",          icon:"💪", col:"#1A56FF", xpPer:1.5, defReps:20, unit:"reps"   },
  { id:"situps",   name:"Situps",           icon:"🔥", col:"#FF7A00", xpPer:1.5, defReps:30, unit:"reps"   },
  { id:"squats",   name:"Squats",           icon:"🦵", col:"#A855F7", xpPer:2,   defReps:20, unit:"reps"   },
  { id:"lunges",   name:"Lunges",           icon:"🏃", col:"#00C8FF", xpPer:2,   defReps:20, unit:"reps"   },
  { id:"core",     name:"Core Circuit",     icon:"⚙️", col:"#FFB800", xpPer:2,   defReps:3,  unit:"rounds" },
  { id:"planks",   name:"Planks",           icon:"🧱", col:"#00E87A", xpPer:5,   defReps:3,  unit:"sets"   },
  { id:"pullups",  name:"Pullups",          icon:"🏋️", col:"#FF3D5A", xpPer:4,   defReps:5,  unit:"reps"   },
  { id:"legs",     name:"Leg Workouts",     icon:"🦿", col:"#FF7A00", xpPer:2,   defReps:15, unit:"reps"   },
  { id:"mobility", name:"Mobility",         icon:"🤸", col:"#8A9BB5", xpPer:1,   defReps:15, unit:"mins"   },
];

const HABITS = [
  { id:"water",      name:"Hydration",        icon:"💧", unit:"glasses", step:1,  max:12  },
  { id:"sleep",      name:"Sleep",            icon:"😴", unit:"hrs",     step:1,  max:12  },
  { id:"homework",   name:"Homework",         icon:"📚", unit:"mins",    step:15, max:180 },
  { id:"stretching", name:"Stretching",       icon:"🤸", unit:"mins",    step:5,  max:60  },
  { id:"screentime", name:"Screen Time",      icon:"📱", unit:"hrs",     step:1,  max:8   },
  { id:"protein",    name:"Protein Meal",     icon:"🥩", unit:"meals",   step:1,  max:4   },
];

const BADGES = [
  { id:"first",    icon:"🎯", name:"First Workout",  check:(p)=> p.sessions >= 1 },
  { id:"s3",       icon:"🔥", name:"3-Day Streak",   check:(p)=> p.streak >= 3 },
  { id:"s7",       icon:"💥", name:"7-Day Streak",   check:(p)=> p.streak >= 7 },
  { id:"t1k",      icon:"⚽", name:"1K Touches",     check:(p)=> p.touches >= 1000 },
  { id:"t5k",      icon:"🌟", name:"5K Touches",     check:(p)=> p.touches >= 5000 },
  { id:"wf",       icon:"👟", name:"Two-Footed",     check:(p)=> (p.wfSessions||0) >= 5 },
  { id:"elite",    icon:"🏆", name:"Elite Level",    check:(p)=> p.xp >= 1500 },
  { id:"warrior",  icon:"⚔️", name:"Weekly Warrior", check:(p)=> p.sessions >= 5 },
  { id:"sniper",   icon:"🥅", name:"Sniper",         check:(p)=> (p.shotTouches||0) >= 500 },
];

const COACH_PROMPTS = {
  Striker:    "You are an elite AI soccer coach specializing in striker development for MLS NEXT. Focus on finishing, movement off the ball, weak foot, pressing triggers, near-post runs, hold-up play. Be demanding but encouraging. Under 100 words.",
  Winger:     "You are an elite AI soccer coach specializing in winger development for MLS NEXT. Focus on 1v1 ability, crossing quality, weak foot, cutting inside, overlapping runs, driven crosses. Be sharp and precise. Under 100 words.",
  Midfielder: "You are an elite AI soccer coach specializing in midfielder development for MLS NEXT. Focus on passing range, press resistance, third-man runs, split passes, scanning. Be intelligent and detail-oriented. Under 100 words.",
  Defender:   "You are an elite AI soccer coach specializing in defender development for MLS NEXT. Focus on 1v1 defending, jockeying, body shape, line management, cover shadows. Be disciplined and rigorous. Under 100 words.",
  Goalkeeper: "You are an elite AI soccer coach specializing in goalkeeper development for MLS NEXT. Focus on shot-stopping, distribution, sweeper-keeper role, set position, diving technique. Be precise and confidence-building. Under 100 words.",
};

const STARTER_QUESTIONS = [
  "What should I focus on today?",
  "How do I improve my weak foot?",
  "Give me a 15-minute solo drill",
  "How do I get faster?",
  "What do MLS NEXT scouts look for?",
  "Rate my training this week",
];

const BG_ICONS = ["⚽","👟","⚡","🏃","🥅","🔥","💪","🎯","⚽","👟","🌟","⚽","💨","🦵","⚽","📐","🔮","⚽","👟","⚡"];

const INTENSITIES_SOCCER = ["Technical","Moderate","Match Speed","Explosive"];
const INTENSITIES_STR    = ["Technical","Moderate","Explosive","Max Effort"];

const SEASON_DATE = new Date("2026-07-31");

// ── STATE ──
const S = {
  screen:       "login",
  authMode:     "login",
  tab:          "home",
  logSubTab:    "soccer",
  drillFilter:  "All",
  registerPos:  "Winger",
  players:      JSON.parse(localStorage.getItem("mlsnr_v2_players") || "[]"),
  currentPlayer: null,
  logEntries:   {},
  expandedDrill: null,
  chatMessages: [],
  chatLoading:  false,
  chatInput:    "",
  toast:        null,
  toastTimer:   null,
  animFrames:   {},
  animRAF:      null,
};

// ── HELPERS ──
function save() { localStorage.setItem("mlsnr_v2_players", JSON.stringify(S.players)); }
function getLevel(xp) { return LEVELS.find(l => xp >= l.min && xp < l.max) || LEVELS[LEVELS.length - 1]; }
function getDaysLeft() { return Math.max(0, Math.ceil((SEASON_DATE - new Date()) / 86400000)); }
function avatarColor(i) { return AVATAR_COLORS[i % AVATAR_COLORS.length]; }
function getEntry(id) { return S.logEntries[id] || { reps: 0, sets: 1, intensity: "Technical", wf: false }; }

function setEntry(id, field, val) {
  S.logEntries = { ...S.logEntries, [id]: { ...getEntry(id), [field]: val } };
  render();
}

function showToast(msg, type = "success") {
  if (S.toastTimer) clearTimeout(S.toastTimer);
  S.toast = { msg, type };
  S.toastTimer = setTimeout(() => { S.toast = null; renderToast(); }, 3000);
  renderToast();
}

function renderToast() {
  let el = document.querySelector(".toast");
  if (S.toast) {
    if (!el) { el = document.createElement("div"); document.body.appendChild(el); }
    el.className = "toast" + (S.toast.type === "error" ? " error" : "");
    el.textContent = S.toast.msg;
  } else {
    if (el) el.remove();
  }
}

// ── BACKGROUND ──
function buildBg() {
  const el = document.getElementById("bgPattern");
  if (!el) return;
  let html = "";
  for (let i = 0; i < 28; i++) {
    const icon = BG_ICONS[i % BG_ICONS.length];
    const left = Math.random() * 100;
    const top  = Math.random() * 120;
    const dur  = 18 + Math.random() * 22;
    const del  = Math.random() * 20;
    const size = 18 + Math.random() * 18;
    html += `<div class="bg-icon" style="left:${left}%;top:${top}%;font-size:${size}px;animation-duration:${dur}s;animation-delay:-${del}s;">${icon}</div>`;
  }
  el.innerHTML = html;
}

// ── DRILL SVG ANIMATION ──
function drillSVG(drill, w, h) {
  const key = "anim_" + drill.id;
  const f = S.animFrames[key] || 0;
  const b = Math.sin(f * 0.15) * 9;
  const a = Math.sin(f * 0.08) * 32;
  const p = 0.82 + Math.sin(f * 0.12) * 0.18;
  const spin = (f * 4) % 360;
  const c = drill.col;
  return `<svg viewBox="0 0 200 100" width="${w}" height="${h}" style="display:block;">
    <defs><radialGradient id="g${drill.id}" cx="50%" cy="60%">
      <stop offset="0%" stop-color="${c}" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#080C18" stop-opacity=".97"/>
    </radialGradient></defs>
    <rect width="200" height="100" fill="url(#g${drill.id})" rx="10"/>
    <line x1="12" y1="84" x2="148" y2="84" stroke="${c}" stroke-opacity=".18" stroke-width="1"/>
    ${[32,62,92,122].map(x => `<polygon points="${x},78 ${x+6},86 ${x-6},86" fill="${c}" opacity=".6"/>`).join("")}
    <g transform="translate(${54+a},${72+b})">
      <circle r="${7*p}" fill="white" opacity=".94"/>
      <circle r="${7*p}" fill="none" stroke="${c}" stroke-width="1.5"/>
      <line x1="${-5*p}" y1="0" x2="${5*p}" y2="0" stroke="${c}" stroke-width="1" opacity=".5" transform="rotate(${spin})"/>
      <line x1="0" y1="${-5*p}" x2="0" y2="${5*p}" stroke="${c}" stroke-width="1" opacity=".5" transform="rotate(${spin})"/>
    </g>
    <g transform="translate(${44+a*0.6},50)">
      <circle cy="-15" r="5" fill="${c}" opacity=".9"/>
      <line x1="0" y1="-10" x2="0" y2="4" stroke="${c}" stroke-width="2.5" stroke-opacity=".85"/>
      <line x1="0" y1="-2" x2="-9" y2="7" stroke="${c}" stroke-width="2" stroke-opacity=".75"/>
      <line x1="0" y1="-2" x2="9" y2="7" stroke="${c}" stroke-width="2" stroke-opacity=".75"/>
      <line x1="0" y1="4" x2="-5" y2="15" stroke="${c}" stroke-width="2" stroke-opacity=".75"/>
      <line x1="0" y1="4" x2="5" y2="15" stroke="${c}" stroke-width="2" stroke-opacity=".75"/>
    </g>
    <path d="M22,82 Q${50+a*0.4},60 ${80+a*0.6},82" stroke="${c}" stroke-width="1.5" fill="none" stroke-dasharray="5,4" opacity=".4"/>
    <rect x="110" y="7" width="46" height="18" rx="9" fill="${c}" opacity=".14"/>
    <text x="133" y="20" text-anchor="middle" fill="${c}" font-size="9" font-family="monospace" font-weight="bold">${drill.defReps} ${drill.unit}</text>
  </svg>`;
}

function tickAnims() {
  SOCCER_DRILLS.forEach(d => { S.animFrames["anim_"+d.id] = (S.animFrames["anim_"+d.id]||0) + 1; });
  // Only re-render SVGs that are visible to avoid full re-render cost
  document.querySelectorAll("[data-anim]").forEach(el => {
    const id = el.getAttribute("data-anim");
    const drill = SOCCER_DRILLS.find(d => d.id === id);
    if (drill) el.innerHTML = drillSVG(drill, parseInt(el.getAttribute("data-w")), parseInt(el.getAttribute("data-h")));
  });
  S.animRAF = requestAnimationFrame(tickAnims);
}

// ── RENDER ENGINE ──
function render() {
  const app = document.getElementById("app");
  if (!app) return;
  if (S.screen === "login" || S.screen === "register") {
    app.innerHTML = renderAuth();
  } else {
    app.innerHTML = renderMain();
  }
}

// ── AUTH ──
function renderAuth() {
  const isReg = S.authMode === "register";
  const demoPlayers = S.players.slice(0, 4);
  return `<div class="auth-screen fade-up">
    <div class="auth-logo">
      <div class="sub">MLS NEXT</div>
      <div class="main">READY</div>
      <div class="tagline">ELITE YOUTH SOCCER DEVELOPMENT</div>
    </div>
    <div class="auth-card">
      <div class="auth-tab">
        <button class="${!isReg?"active":""}" onclick="switchAuth('login')">SIGN IN</button>
        <button class="${isReg?"active":""}" onclick="switchAuth('register')">JOIN TEAM</button>
      </div>
      ${isReg ? renderRegisterForm() : renderLoginForm(demoPlayers)}
    </div>
  </div>`;
}

function renderRegisterForm() {
  return `
    <div class="field"><label>FULL NAME</label><input id="reg-name" placeholder="Diego Sampson Jr." maxlength="30"/></div>
    <div class="field"><label>EMAIL</label><input id="reg-email" type="email" placeholder="player@email.com"/></div>
    <div class="field"><label>PASSWORD</label><input id="reg-pass" type="password" placeholder="Create password"/></div>
    <div class="field"><label>AGE</label><input id="reg-age" type="number" placeholder="14" min="8" max="20"/></div>
    <div class="field"><label>TEAM / CLUB</label><input id="reg-team" placeholder="Nona Soccer U14" maxlength="30"/></div>
    <div style="font-size:10px;color:var(--silver);letter-spacing:.1em;font-weight:700;margin-bottom:8px;">MY POSITION</div>
    <div class="pos-grid">${POSITIONS.map(pos => `<div class="pos-btn${S.registerPos===pos?" active":""}" onclick="S.registerPos='${pos}';render()">${pos}</div>`).join("")}</div>
    <button class="btn-primary" onclick="doRegister()">JOIN THE SQUAD →</button>`;
}

function renderLoginForm(demoPlayers) {
  return `
    <div class="field"><label>EMAIL</label><input id="login-email" placeholder="your@email.com"/></div>
    <div class="field"><label>PASSWORD</label><input id="login-pass" type="password" placeholder="Password"/></div>
    <button class="btn-primary" style="margin-top:4px;" onclick="doLogin()">SIGN IN →</button>
    ${demoPlayers.length > 0 ? `
    <div class="demo-players">
      <div class="demo-label">── QUICK LOGIN ──</div>
      ${demoPlayers.map((pl, i) => `
        <button class="demo-btn" onclick="quickLogin('${pl.email}')">
          <div class="avatar-sm" style="background:${avatarColor(i)}22;border:2px solid ${avatarColor(i)}50;color:${avatarColor(i)};">${pl.name.charAt(0)}</div>
          <span>${pl.name}</span>
          <span style="color:var(--silver);font-size:10px;margin-left:auto;">${pl.position} · ${pl.xp} XP</span>
        </button>`).join("")}
    </div>` : ""}`;
}

// ── MAIN APP ──
function renderMain() {
  const p = S.currentPlayer;
  const lv = getLevel(p.xp);
  const nx = LEVELS[LEVELS.indexOf(lv) + 1];
  const pct = nx ? ((p.xp - lv.min) / (nx.min - lv.min)) * 100 : 100;

  return `
    <div class="header">
      <div class="header-top">
        <div class="logo-sm"><div class="sub">MLS NEXT</div><div class="main">READY</div></div>
        <div class="header-right">
          <div class="pos-label">${p.position}</div>
          <div class="level-badge" style="background:${lv.col}18;border:1px solid ${lv.col}45;color:${lv.col};">${lv.icon} ${lv.name}</div>
        </div>
      </div>
      <div>
        <div class="xp-labels">
          <span style="color:${lv.col};font-weight:800;">${lv.icon} ${lv.name}</span>
          <span style="color:var(--silver);">${p.xp.toLocaleString()} XP${nx ? " / "+nx.min.toLocaleString() : ""}</span>
        </div>
        <div class="xp-track"><div class="xp-fill" style="width:${pct}%;background:linear-gradient(90deg,${lv.col},var(--cyan));box-shadow:0 0 8px ${lv.col}70;"></div></div>
      </div>
    </div>
    <div class="content fade-up">${renderTab()}</div>
    <div class="bottom-nav">
      ${[
        {id:"home",   icon:"⚡", label:"HOME"},
        {id:"log",    icon:"📋", label:"LOG"},
        {id:"drills", icon:"🎯", label:"DRILLS"},
        {id:"coach",  icon:"🧠", label:"COACH"},
        {id:"squad",  icon:"🏅", label:"SQUAD"},
        {id:"profile",icon:"🏆", label:"ME"},
      ].map(t => `<button class="nav-btn${S.tab===t.id?" active":""}" onclick="goTab('${t.id}')">
        <div class="nav-icon">${t.icon}</div><div>${t.label}</div>
      </button>`).join("")}
    </div>`;
}

function renderTab() {
  switch(S.tab) {
    case "home":    return renderHome();
    case "log":     return renderLog();
    case "drills":  return renderDrills();
    case "coach":   return renderCoach();
    case "squad":   return renderSquad();
    case "profile": return renderProfile();
    default:        return renderHome();
  }
}

// ── HOME ──
function renderHome() {
  const p = S.currentPlayer;
  const days = getDaysLeft();
  const wkGoal = 5000;
  const wkTouches = p.weeklyTouches || 0;
  const wkPct = Math.min((wkTouches / wkGoal) * 100, 100);
  const seasonPct = Math.min(100, (1 - days/365) * 100);

  return `
    <div class="countdown-card">
      <div style="font-size:9px;color:var(--silver);letter-spacing:.15em;margin-bottom:6px;">SEASON STARTS · JULY 31, 2026</div>
      <div class="countdown-num">${days}</div>
      <div class="countdown-sub">DAYS TO GET READY</div>
      <div class="countdown-bar"><div class="countdown-fill" style="width:${seasonPct}%;"></div></div>
    </div>

    <div class="stats-row">
      <div class="stat-card"><div class="stat-label">STREAK</div><div class="stat-val">${p.streak||0}🔥</div><div class="stat-sub">days</div></div>
      <div class="stat-card"><div class="stat-label">TOUCHES</div><div class="stat-val">${(p.touches||0).toLocaleString()}</div><div class="stat-sub">total</div></div>
      <div class="stat-card"><div class="stat-label">SESSIONS</div><div class="stat-val">${p.sessions||0}</div><div class="stat-sub">logged</div></div>
    </div>

    <div class="weekly-card">
      <div class="weekly-top">
        <span style="font-size:11px;font-weight:800;letter-spacing:.07em;">WEEKLY TOUCH GOAL</span>
        <span style="font-size:11px;color:var(--cyan);font-weight:700;">${wkTouches.toLocaleString()} / ${wkGoal.toLocaleString()}</span>
      </div>
      <div class="weekly-track"><div class="weekly-fill" style="width:${wkPct}%;background:linear-gradient(90deg,var(--blue),var(--cyan));box-shadow:0 0 10px rgba(0,200,255,.4);"></div></div>
      <div class="weekly-bottom">
        <span style="font-size:10px;color:var(--silver);">${Math.max(0,wkGoal-wkTouches).toLocaleString()} remaining</span>
        <span style="font-size:10px;color:var(--gold);font-weight:700;">${Math.round(wkPct)}% complete</span>
      </div>
    </div>

    <button class="btn-primary" style="margin-bottom:12px;" onclick="goTab('log')">+ LOG TODAY'S TRAINING</button>

    <div class="section-label">RECOMMENDED FOR ${p.position.toUpperCase()}</div>
    ${SOCCER_DRILLS.slice(0,3).map(d => `
      <div class="card" style="display:flex;align-items:center;gap:11px;cursor:pointer;" onclick="goTab('log');S.expandedDrill='${d.id}';render()">
        <div style="width:42px;height:42px;border-radius:10px;background:${d.col}18;border:1px solid ${d.col}30;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${d.icon}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:800;font-size:13px;margin-bottom:3px;">${d.name}</div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            <span style="font-size:9px;color:${d.col};background:${d.col}12;border-radius:4px;padding:2px 7px;font-weight:700;">${d.cat}</span>
            <span style="font-size:9px;color:var(--silver);">Target: ${d.defReps} ${d.unit}</span>
            ${d.wf ? `<span style="font-size:9px;color:var(--gold);background:rgba(255,184,0,.12);border-radius:4px;padding:2px 7px;">👟 WF</span>` : ""}
          </div>
        </div>
        <div style="font-size:11px;color:var(--gold);font-weight:800;flex-shrink:0;">+XP</div>
      </div>`).join("")}

    <div class="section-label" style="margin-top:12px;">RECENT SESSIONS</div>
    ${(p.recentSessions||[]).slice(0,4).map(s => `
      <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-weight:800;font-size:13px;">${s.name}</div>
          <div style="font-size:10px;color:var(--silver);margin-top:2px;">${s.reps}r × ${s.sets} · ${s.intensity} · ${s.date}${s.wf?" · 👟":""}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:12px;color:var(--gold);font-weight:800;">+${s.xp}</div>
          <div style="font-size:9px;color:var(--silver);">${s.touches} touches</div>
        </div>
      </div>`).join("") || `<div style="text-align:center;color:var(--silver);padding:20px;font-size:12px;">No sessions yet. Start logging! 🚀</div>`}`;
}

// ── LOG ──
function renderLog() {
  return `
    <div style="font-size:20px;font-weight:900;letter-spacing:.04em;margin-bottom:4px;">DAILY LOG</div>
    <div style="font-size:11px;color:var(--silver);margin-bottom:14px;">${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</div>
    <div class="sub-tabs">
      ${["soccer","strength","habits"].map(t => `<button class="sub-tab${S.logSubTab===t?" active":""}" onclick="S.logSubTab='${t}';S.expandedDrill=null;render()">${t}</button>`).join("")}
    </div>
    ${S.logSubTab==="soccer" ? renderSoccerLog() : S.logSubTab==="strength" ? renderStrengthLog() : renderHabitsLog()}
    <div style="height:12px;"></div>
    <button class="btn-primary" onclick="saveLog()">💾 SAVE TODAY'S LOG</button>`;
}

function renderSoccerLog() {
  return SOCCER_DRILLS.map(d => {
    const e = getEntry(d.id);
    const open = S.expandedDrill === d.id;
    const logged = e.reps > 0;
    const projT = e.reps * e.sets;
    const projXP = Math.round(e.reps * e.sets * d.xpPer);
    const step = (d.id==="team"||d.id==="conditioning"||d.id==="recovery") ? 5 : 10;
    return `<div class="accord${logged?" logged":""}">
      <div class="accord-header" onclick="S.expandedDrill=S.expandedDrill==='${d.id}'?null:'${d.id}';render()">
        <div class="accord-icon" style="background:${d.col}18;border:1px solid ${d.col}30;">${d.icon}</div>
        <div style="flex:1;">
          <div class="accord-title">${d.name}</div>
          ${logged ? `<div class="accord-meta" style="color:${d.col};">${e.reps}r × ${e.sets} · +${projXP} XP</div>` : ""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          ${logged ? `<div style="width:7px;height:7px;border-radius:99px;background:var(--green);"></div>` : ""}
          <div class="accord-arrow${open?" open":""}">∨</div>
        </div>
      </div>
      ${open ? `<div class="accord-body">
        <div data-anim="${d.id}" data-w="380" data-h="100" style="border-radius:10px;overflow:hidden;margin-bottom:0;">${drillSVG(d,380,100)}</div>
        <div class="drill-desc">${d.desc}</div>
        <div class="controls-grid">
          <div>
            <div class="ctrl-label">REPS / ${d.unit.toUpperCase()}</div>
            <div class="counter-row">
              <button class="counter-btn" onclick="setEntry('${d.id}','reps',Math.max(0,${e.reps}-${step}))">−</button>
              <div class="counter-val">${e.reps}</div>
              <button class="counter-btn" onclick="setEntry('${d.id}','reps',${e.reps}+${step})">+</button>
            </div>
          </div>
          <div>
            <div class="ctrl-label">SETS</div>
            <div class="sets-row">${[1,2,3,4,5].map(n=>`<button class="set-btn${e.sets===n?" active":""}" onclick="setEntry('${d.id}','sets',${n})">${n}</button>`).join("")}</div>
          </div>
        </div>
        <div class="intensity-label">INTENSITY</div>
        <div class="intensity-grid">
          ${INTENSITIES_SOCCER.map(l=>`<button class="intensity-btn${e.intensity===l?" active":""}" onclick="setEntry('${d.id}','intensity','${l}')">${l}</button>`).join("")}
        </div>
        ${d.wf ? `<div class="wf-toggle${e.wf?" active":""}" onclick="setEntry('${d.id}','wf',${!e.wf})">
          <div class="wf-check">${e.wf?"✓":""}</div>
          <div>
            <div style="font-weight:800;font-size:12px;color:${e.wf?"var(--gold)":"var(--white)"};">👟 WEAK FOOT COMPLETED</div>
            <div style="font-size:10px;color:var(--silver);">Did you train your weak foot?</div>
          </div>
        </div>` : ""}
        ${e.reps > 0 ? `<div class="preview-card">
          <div><div style="font-size:8px;color:var(--silver);font-weight:700;letter-spacing:.1em;">TOUCHES</div><div class="preview-val" style="color:var(--cyan);">${projT}</div></div>
          <div style="text-align:right;"><div style="font-size:8px;color:var(--silver);font-weight:700;letter-spacing:.1em;">XP</div><div class="preview-val" style="color:var(--gold);">+${projXP}</div></div>
        </div>` : ""}
      </div>` : ""}
    </div>`;
  }).join("");
}

function renderStrengthLog() {
  return STRENGTH_DRILLS.map(d => {
    const e = getEntry(d.id);
    const open = S.expandedDrill === d.id;
    const logged = e.reps > 0;
    const projXP = Math.round(e.reps * e.sets * d.xpPer);
    return `<div class="accord${logged?" logged":""}">
      <div class="accord-header" onclick="S.expandedDrill=S.expandedDrill==='${d.id}'?null:'${d.id}';render()">
        <div class="accord-icon" style="background:${d.col}18;border:1px solid ${d.col}30;">${d.icon}</div>
        <div style="flex:1;">
          <div class="accord-title">${d.name}</div>
          ${logged ? `<div class="accord-meta" style="color:${d.col};">${e.reps}r × ${e.sets} · +${projXP} XP</div>` : ""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          ${logged ? `<div style="width:7px;height:7px;border-radius:99px;background:var(--green);"></div>` : ""}
          <div class="accord-arrow${open?" open":""}">∨</div>
        </div>
      </div>
      ${open ? `<div class="accord-body">
        <div class="controls-grid" style="margin-top:14px;">
          <div>
            <div class="ctrl-label">REPS / ${d.unit.toUpperCase()}</div>
            <div class="counter-row">
              <button class="counter-btn" onclick="setEntry('${d.id}','reps',Math.max(0,${e.reps}-5))">−</button>
              <div class="counter-val">${e.reps}</div>
              <button class="counter-btn" onclick="setEntry('${d.id}','reps',${e.reps}+5)">+</button>
            </div>
          </div>
          <div>
            <div class="ctrl-label">SETS</div>
            <div class="sets-row">${[1,2,3,4,5].map(n=>`<button class="set-btn${e.sets===n?" active":""}" onclick="setEntry('${d.id}','sets',${n})">${n}</button>`).join("")}</div>
          </div>
        </div>
        <div class="intensity-label">INTENSITY</div>
        <div class="intensity-grid">
          ${INTENSITIES_STR.map(l=>`<button class="intensity-btn${e.intensity===l?" active":""}" onclick="setEntry('${d.id}','intensity','${l}')">${l}</button>`).join("")}
        </div>
        ${e.reps > 0 ? `<div class="preview-card" style="justify-content:center;">
          <div style="text-align:center;"><div style="font-size:8px;color:var(--silver);font-weight:700;letter-spacing:.1em;">XP EARNED</div><div class="preview-val" style="color:var(--gold);font-size:36px;">+${projXP}</div></div>
        </div>` : ""}
      </div>` : ""}
    </div>`;
  }).join("");
}

function renderHabitsLog() {
  return HABITS.map(h => {
    const val = (S.logEntries[h.id]?.reps) || 0;
    return `<div class="habit-row">
      <div class="habit-icon">${h.icon}</div>
      <div class="habit-info"><div class="habit-name">${h.name}</div><div class="habit-val">${val} ${h.unit}</div></div>
      <div class="habit-controls">
        <button class="habit-btn" onclick="setEntry('${h.id}','reps',Math.max(0,${val}-${h.step}))">−</button>
        <div class="habit-num">${val}</div>
        <button class="habit-btn" onclick="setEntry('${h.id}','reps',Math.min(${h.max},${val}+${h.step}))">+</button>
      </div>
    </div>`;
  }).join("");
}

// ── DRILLS ──
function renderDrills() {
  const cats = ["All","Technical","Finishing","Athletic","Recovery","Team"];
  const filtered = S.drillFilter==="All" ? SOCCER_DRILLS : SOCCER_DRILLS.filter(d => d.cat===S.drillFilter);
  return `
    <div style="font-size:20px;font-weight:900;letter-spacing:.04em;margin-bottom:13px;">DRILL LIBRARY</div>
    <div class="filter-row">${cats.map(c=>`<button class="filter-pill${S.drillFilter===c?" active":""}" onclick="S.drillFilter='${c}';render()">${c}</button>`).join("")}</div>
    ${filtered.map(d => `
      <div class="drill-card" onclick="goTab('log');S.logSubTab='soccer';S.expandedDrill='${d.id}';render()">
        <div data-anim="${d.id}" data-w="400" data-h="100">${drillSVG(d,400,100)}</div>
        <div class="drill-info">
          <div>
            <div style="font-weight:900;font-size:15px;margin-bottom:4px;">${d.name}</div>
            <div class="drill-badges">
              <span class="drill-badge" style="color:${d.col};background:${d.col}12;">${d.cat}</span>
              <span class="drill-badge" style="color:var(--silver);background:#1A2744;">${d.defReps} ${d.unit}</span>
              ${d.wf ? `<span class="drill-badge" style="color:var(--gold);background:rgba(255,184,0,.12);">👟 WF</span>` : ""}
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div style="font-size:9px;color:var(--silver);">UP TO</div>
            <div style="font-size:14px;color:var(--gold);font-weight:900;">+${Math.round(d.defReps*3*d.xpPer)} XP</div>
          </div>
        </div>
      </div>`).join("")}`;
}

// ── COACH ──
function renderCoach() {
  const p = S.currentPlayer;
  if (S.chatMessages.length === 0) initCoach();
  return `
    <div style="font-size:20px;font-weight:900;letter-spacing:.04em;margin-bottom:3px;">AI COACH</div>
    <div style="font-size:11px;color:var(--silver);margin-bottom:14px;">Position-tuned for: <span style="color:var(--cyan);font-weight:700;">${p.position}</span></div>
    ${S.chatMessages.length <= 1 ? `
    <div class="section-label">QUICK QUESTIONS</div>
    <div class="starter-chips">${STARTER_QUESTIONS.map(q=>`<button class="starter-chip" onclick="sendChat(${JSON.stringify(q)})">${q}</button>`).join("")}</div>` : ""}
    <div class="chat-area" id="chatArea">
      ${S.chatMessages.map(m => `<div class="msg ${m.role}"><div class="msg-bubble">${m.content.replace(/\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}</div></div>`).join("")}
      ${S.chatLoading ? `<div class="msg assistant"><div class="msg-bubble pulsing" style="color:var(--silver);">Coach is thinking...</div></div>` : ""}
      <div id="chatEnd"></div>
    </div>
    <div class="chat-input-row">
      <input class="chat-input" id="chatInput" placeholder="Ask your coach..." value="${S.chatInput.replace(/"/g,'&quot;')}"
        oninput="S.chatInput=this.value"
        onkeydown="if(event.key==='Enter'){sendChat(S.chatInput);}" />
      <button class="chat-send" onclick="sendChat(S.chatInput)">→</button>
    </div>`;
}

function initCoach() {
  const p = S.currentPlayer;
  const lv = getLevel(p.xp);
  S.chatMessages = [{
    role: "assistant",
    content: `Hey ${p.name}! 👋 I'm your AI coach built specifically for your position: **${p.position}**.\n\nYou're at **${lv.name}** level with ${p.xp} XP and ${(p.touches||0).toLocaleString()} total touches. Season starts in **${getDaysLeft()} days**.\n\nAsk me anything — drills, weak foot, positioning, mindset. Let's get you MLS NEXT ready! 🚀`
  }];
}

async function sendChat(text) {
  if (!text || !text.trim() || S.chatLoading) return;
  S.chatInput = "";
  const p = S.currentPlayer;
  const lv = getLevel(p.xp);
  S.chatMessages = [...S.chatMessages, { role:"user", content:text }];
  S.chatLoading = true;
  render();
  scrollChat();

  const sys = (COACH_PROMPTS[p.position] || COACH_PROMPTS.Midfielder) +
    ` Player stats: ${p.name}, ${p.position}, ${lv.name} level, ${p.xp} XP, ${p.touches||0} total touches, ${p.streak||0}-day streak, ${p.sessions||0} sessions logged, ${getDaysLeft()} days until season July 31 2026.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: sys,
        messages: S.chatMessages.map(m => ({ role: m.role, content: m.content }))
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || "Connection issue — try again.";
    S.chatMessages = [...S.chatMessages, { role:"assistant", content:reply }];
  } catch(e) {
    S.chatMessages = [...S.chatMessages, { role:"assistant", content:"Network issue. Add your API key in app.js to activate the coach." }];
  }
  S.chatLoading = false;
  render();
  scrollChat();
}

function scrollChat() {
  setTimeout(() => {
    const el = document.getElementById("chatEnd");
    if (el) el.scrollIntoView({ behavior:"smooth" });
  }, 100);
}

// ── SQUAD ──
function renderSquad() {
  const sorted = [...S.players].sort((a,b) => b.xp - a.xp);
  const medals = ["🥇","🥈","🥉"];
  return `
    <div style="font-size:20px;font-weight:900;letter-spacing:.04em;margin-bottom:4px;">SQUAD</div>
    <div style="font-size:11px;color:var(--silver);margin-bottom:14px;">Nona Soccer · MLS NEXT Leaderboard</div>
    ${sorted.length === 0 ? `<div style="text-align:center;color:var(--silver);padding:40px 20px;font-size:13px;">No players yet. Share the app link with your squad! 🚀</div>` :
    sorted.map((pl, i) => {
      const lv = getLevel(pl.xp);
      const isMe = pl.email === S.currentPlayer.email;
      const ac = avatarColor(i);
      return `<div class="lb-row${isMe?" me":""}">
        <div class="lb-rank">${i < 3 ? medals[i] : i+1}</div>
        <div class="lb-avatar" style="background:${ac}22;border:2px solid ${ac}50;color:${ac};">${pl.name.charAt(0)}</div>
        <div class="lb-info">
          <div class="lb-name">${pl.name}${isMe?" 👈":""}</div>
          <div class="lb-pos">${pl.position} · ${lv.icon} ${lv.name} · ${(pl.touches||0).toLocaleString()} touches</div>
        </div>
        <div class="lb-xp">${pl.xp.toLocaleString()}</div>
      </div>`;
    }).join("")}`;
}

// ── PROFILE ──
function renderProfile() {
  const p = S.currentPlayer;
  const lv = getLevel(p.xp);
  const nx = LEVELS[LEVELS.indexOf(lv)+1];
  const pct = nx ? ((p.xp-lv.min)/(nx.min-lv.min))*100 : 100;
  const badges = BADGES.map(b => ({...b, earned:b.check(p)}));

  return `
    <div style="text-align:center;margin-bottom:16px;">
      <div style="width:62px;height:62px;border-radius:50%;background:${avatarColor(0)}22;border:2px solid ${avatarColor(0)}50;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:${avatarColor(0)};margin:0 auto 8px;">${p.name.charAt(0)}</div>
      <div style="font-size:22px;font-weight:900;">${p.name}</div>
      <div style="font-size:11px;color:var(--silver);">${p.position} · ${p.team||"Nona Soccer"}</div>
    </div>

    <div class="card" style="background:linear-gradient(135deg,${lv.col}18,var(--card));border-color:${lv.col}40;text-align:center;padding:20px;margin-bottom:12px;">
      <div style="font-size:46px;margin-bottom:7px;">${lv.icon}</div>
      <div style="font-size:24px;font-weight:900;color:${lv.col};margin-bottom:3px;">${lv.name}</div>
      <div style="font-size:13px;color:var(--silver);margin-bottom:14px;">${p.xp.toLocaleString()} XP TOTAL</div>
      <div class="xp-labels">
        <span style="color:${lv.col};font-weight:800;">${lv.icon} ${lv.name}</span>
        <span style="color:var(--silver);">${p.xp.toLocaleString()}${nx?" / "+nx.min.toLocaleString():""}</span>
      </div>
      <div class="xp-track" style="margin-top:4px;"><div class="xp-fill" style="width:${pct}%;background:linear-gradient(90deg,${lv.col},var(--cyan));"></div></div>
    </div>

    <div style="font-size:10px;color:var(--silver);font-weight:700;letter-spacing:.1em;margin-bottom:8px;">MY POSITION</div>
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px;">
      ${POSITIONS.map(pos => `<button onclick="updatePos('${pos}')" style="padding:7px 14px;border-radius:99px;background:${p.position===pos?"var(--blue)":"transparent"};border:1.5px solid ${p.position===pos?"var(--blue)":"var(--border)"};color:${p.position===pos?"white":"var(--silver)"};font-weight:700;font-size:11px;cursor:pointer;font-family:inherit;">${pos}</button>`).join("")}
    </div>

    <div class="stats-row">
      <div class="stat-card"><div class="stat-label">TOTAL XP</div><div class="stat-val" style="font-size:17px;">${p.xp.toLocaleString()}</div></div>
      <div class="stat-card"><div class="stat-label">TOUCHES</div><div class="stat-val" style="font-size:17px;">${(p.touches||0).toLocaleString()}</div></div>
      <div class="stat-card"><div class="stat-label">STREAK</div><div class="stat-val" style="font-size:17px;">${p.streak||0}🔥</div></div>
    </div>

    <div style="font-size:10px;color:var(--silver);font-weight:700;letter-spacing:.1em;margin:14px 0 9px;">DEVELOPMENT PATHWAY</div>
    <div class="card" style="margin-bottom:14px;">
      ${LEVELS.map((l,i) => {
        const active = p.xp>=l.min && p.xp<l.max;
        const done = p.xp >= l.max;
        return `<div class="pathway-row">
          <div class="pathway-icon" style="${done||active?`background:${l.col}22;border-color:${l.col};`:"background:#131D30;"}">${l.icon}</div>
          <div style="flex:1;">
            <div style="font-weight:800;font-size:12px;color:${active?l.col:done?"var(--white)":"var(--silver)"};">${l.name}</div>
            <div style="font-size:9px;color:var(--silver);">${l.min.toLocaleString()}–${l.max===999999?"∞":l.max.toLocaleString()} XP</div>
          </div>
          ${done ? `<span style="color:var(--green);font-size:14px;">✓</span>` : ""}
          ${active ? `<span style="font-size:9px;color:${l.col};font-weight:800;letter-spacing:.05em;">CURRENT</span>` : ""}
        </div>`;
      }).join("")}
    </div>

    <div style="font-size:10px;color:var(--silver);font-weight:700;letter-spacing:.1em;margin-bottom:9px;">BADGES</div>
    <div class="badge-grid" style="margin-bottom:16px;">
      ${badges.map(b => `<div class="badge-card${b.earned?" earned":""}">
        <div class="badge-icon">${b.icon}</div>
        <div class="badge-name">${b.name}</div>
      </div>`).join("")}
    </div>

    <button class="btn-primary" style="background:linear-gradient(135deg,#1A2744,#0F1624);border:1px solid var(--border);margin-bottom:8px;" onclick="signOut()">SIGN OUT</button>`;
}

// ── ACTIONS ──
function switchAuth(mode) { S.authMode = mode; render(); }

function doRegister() {
  const name  = document.getElementById("reg-name")?.value.trim();
  const email = document.getElementById("reg-email")?.value.trim().toLowerCase();
  const pass  = document.getElementById("reg-pass")?.value;
  const age   = document.getElementById("reg-age")?.value;
  const team  = document.getElementById("reg-team")?.value.trim();
  if (!name || !email || !pass) { showToast("Fill in all required fields", "error"); return; }
  if (S.players.find(p => p.email === email)) { showToast("Email already registered", "error"); return; }
  const player = {
    name, email, pass, age:parseInt(age)||14, team:team||"Nona Soccer",
    position: S.registerPos, xp:0, touches:0, weeklyTouches:0,
    streak:0, sessions:0, wfSessions:0, shotTouches:0, recentSessions:[]
  };
  S.players.push(player);
  save();
  S.currentPlayer = player;
  S.screen = "app"; S.tab = "home"; S.chatMessages = [];
  render();
  showToast("Welcome to the squad! 🚀");
}

function doLogin() {
  const email = document.getElementById("login-email")?.value.trim().toLowerCase();
  const pass  = document.getElementById("login-pass")?.value;
  const player = S.players.find(p => p.email===email && p.pass===pass);
  if (!player) { showToast("Invalid email or password", "error"); return; }
  S.currentPlayer = player; S.screen = "app"; S.tab = "home"; S.chatMessages = [];
  render();
}

function quickLogin(email) {
  const player = S.players.find(p => p.email===email);
  if (!player) return;
  S.currentPlayer = player; S.screen = "app"; S.tab = "home"; S.chatMessages = [];
  render();
}

function signOut() { S.currentPlayer = null; S.screen = "login"; S.chatMessages = []; render(); }

function goTab(id) { S.tab = id; if (id==="coach" && S.chatMessages.length===0) initCoach(); render(); }

function updatePos(pos) {
  S.currentPlayer.position = pos;
  const idx = S.players.findIndex(p => p.email===S.currentPlayer.email);
  if (idx >= 0) S.players[idx].position = pos;
  save(); S.chatMessages = []; render();
}

function saveLog() {
  const entries = Object.entries(S.logEntries).filter(([_,v]) => v.reps > 0);
  if (!entries.length) { showToast("Log at least one activity first!", "error"); return; }
  let gainXP=0, gainTouches=0, wfDone=false, shotT=0;
  const today = new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"});
  const newSessions = [];
  entries.forEach(([id,v]) => {
    const drill = [...SOCCER_DRILLS,...STRENGTH_DRILLS].find(d => d.id===id);
    const xp = Math.round(v.reps * v.sets * (drill?.xpPer||1.5));
    const t  = S.logSubTab==="soccer" ? v.reps * v.sets : 0;
    gainXP += xp; gainTouches += t;
    if (v.wf) wfDone = true;
    if (id==="shooting") shotT += t;
    newSessions.push({ name:drill?.name||id, reps:v.reps, sets:v.sets, intensity:v.intensity, wf:v.wf||false, xp, touches:t, date:today });
  });
  const p = S.currentPlayer;
  p.xp += gainXP;
  p.touches = (p.touches||0) + gainTouches;
  p.weeklyTouches = (p.weeklyTouches||0) + gainTouches;
  p.sessions = (p.sessions||0) + 1;
  p.streak = (p.streak||0) + 1;
  if (wfDone) p.wfSessions = (p.wfSessions||0) + 1;
  p.shotTouches = (p.shotTouches||0) + shotT;
  p.recentSessions = [...newSessions, ...(p.recentSessions||[])].slice(0, 10);
  const idx = S.players.findIndex(pl => pl.email===p.email);
  if (idx >= 0) S.players[idx] = p;
  save();
  S.logEntries = {}; S.expandedDrill = null;
  showToast(`SESSION SAVED · +${gainXP} XP · +${gainTouches} TOUCHES`);
  S.tab = "home"; render();
}

// ── SEED DEMO PLAYERS ──
function seedDemo() {
  if (S.players.length > 0) return;
  S.players = [
    { name:"Diego Jr.", email:"diego@demo.com", pass:"demo", age:14, team:"Nona Soccer U14", position:"Winger",
      xp:820, touches:3140, weeklyTouches:2340, streak:5, sessions:12, wfSessions:6, shotTouches:200,
      recentSessions:[
        {name:"Ball Mastery",reps:100,sets:3,intensity:"Technical",wf:true,xp:450,touches:300,date:"May 8"},
        {name:"Shooting",reps:25,sets:4,intensity:"Match Speed",wf:true,xp:300,touches:100,date:"May 7"},
        {name:"Juggling",reps:50,sets:2,intensity:"Moderate",wf:false,xp:200,touches:100,date:"May 6"},
      ]},
    { name:"Marco R.",  email:"marco@demo.com",  pass:"demo", age:13, team:"Nona Soccer U14", position:"Striker",
      xp:1240, touches:4800, weeklyTouches:1800, streak:8, sessions:20, wfSessions:10, shotTouches:620,
      recentSessions:[
        {name:"Shooting",reps:30,sets:4,intensity:"Explosive",wf:true,xp:360,touches:120,date:"May 8"},
      ]},
    { name:"Tyler K.",  email:"tyler@demo.com",  pass:"demo", age:15, team:"Nona Soccer U14", position:"Midfielder",
      xp:430, touches:1600, weeklyTouches:900, streak:2, sessions:7, wfSessions:2, shotTouches:80,
      recentSessions:[]},
    { name:"Sofia M.",  email:"sofia@demo.com",  pass:"demo", age:14, team:"Nona Soccer U14", position:"Defender",
      xp:650, touches:2200, weeklyTouches:1100, streak:4, sessions:9, wfSessions:3, shotTouches:40,
      recentSessions:[]},
  ];
  save();
}

// ── INIT ──
seedDemo();
buildBg();
render();
requestAnimationFrame(tickAnims);
