// ── CONFIG ──
const ANTHROPIC_API_KEY = "YOUR_API_KEY_HERE";

// ── DATA ──
const LEVELS = [
  { name:"Foundation",    min:0,     max:500,   col:"#8A9BB5", icon:"🌱" },
  { name:"Competitive",   min:500,   max:1500,  col:"#00C8FF", icon:"⚡" },
  { name:"Elite",         min:1500,  max:3500,  col:"#FFB800", icon:"🏆" },
  { name:"MLS NEXT",      min:3500,  max:7000,  col:"#FF7A00", icon:"🎯" },
  { name:"MLS NEXT Ready",min:7000,  max:15000, col:"#FF3D5A", icon:"🚀" },
  { name:"Captain",       min:15000, max:999999,col:"#A855F7", icon:"👑" },
];
const ADULT_LEVELS = [
  { name:"Consistent",    min:0,     max:500,   col:"#8A9BB5", icon:"🌱" },
  { name:"Disciplined",   min:500,   max:1500,  col:"#00C8FF", icon:"💪" },
  { name:"High Performer",min:1500,  max:3500,  col:"#FFB800", icon:"🔥" },
  { name:"Elite",         min:3500,  max:7000,  col:"#FF7A00", icon:"⚡" },
  { name:"Champion",      min:7000,  max:99999, col:"#FF3D5A", icon:"🏆" },
];
const POSITIONS = ["Striker","Winger","Midfielder","Defender","Goalkeeper"];
const ACCOUNT_TYPES = ["Player","Coach / Parent"];
const AVATAR_COLORS = ["#1A56FF","#FF3D5A","#00C8FF","#FFB800","#A855F7","#00E87A","#FF7A00","#06B6D4"];

const SOCCER_DRILLS = [
  {id:"team",name:"Team Practice",icon:"👥",col:"#1A56FF",xpPer:2,defReps:90,unit:"mins",cat:"Team",wf:false,desc:"Full team training session. Count total minutes on the field."},
  {id:"ballmastery",name:"Ball Mastery",icon:"⚽",col:"#1A56FF",xpPer:1.5,defReps:100,unit:"touches",cat:"Technical",wf:true,desc:"V-pulls, inside-outside, toe taps, rollovers. Count every touch."},
  {id:"juggling",name:"Juggling",icon:"🔮",col:"#00C8FF",xpPer:2,defReps:50,unit:"juggles",cat:"Technical",wf:true,desc:"Consecutive juggles without dropping. Count your best set."},
  {id:"shooting",name:"Shooting",icon:"🥅",col:"#FF7A00",xpPer:3,defReps:25,unit:"shots",cat:"Finishing",wf:true,desc:"Strike low to corners. Count shots on target only."},
  {id:"passing",name:"Passing",icon:"📐",col:"#A855F7",xpPer:2,defReps:40,unit:"passes",cat:"Technical",wf:true,desc:"Short-long combinations. Count completed accurate passes."},
  {id:"agility",name:"Agility",icon:"⚡",col:"#FFB800",xpPer:2.5,defReps:20,unit:"reps",cat:"Athletic",wf:false,desc:"Cone weaves, ladder drills, hard direction changes."},
  {id:"sprint",name:"Sprint Work",icon:"💨",col:"#FF3D5A",xpPer:3,defReps:10,unit:"sprints",cat:"Athletic",wf:false,desc:"Max effort 20-40 yard sprints. Full recovery between each."},
  {id:"conditioning",name:"Conditioning",icon:"🔥",col:"#FF7A00",xpPer:1.5,defReps:20,unit:"mins",cat:"Athletic",wf:false,desc:"Continuous cardio. Count total minutes."},
  {id:"recovery",name:"Recovery",icon:"🧘",col:"#00E87A",xpPer:1,defReps:15,unit:"mins",cat:"Recovery",wf:false,desc:"Active recovery, foam rolling, light stretching."},
];
const STRENGTH_DRILLS = [
  {id:"pushups",name:"Pushups",icon:"💪",col:"#1A56FF",xpPer:1.5,defReps:20,unit:"reps"},
  {id:"situps",name:"Situps",icon:"🔥",col:"#FF7A00",xpPer:1.5,defReps:30,unit:"reps"},
  {id:"squats",name:"Squats",icon:"🦵",col:"#A855F7",xpPer:2,defReps:20,unit:"reps"},
  {id:"lunges",name:"Lunges",icon:"🏃",col:"#00C8FF",xpPer:2,defReps:20,unit:"reps"},
  {id:"core",name:"Core Circuit",icon:"⚙️",col:"#FFB800",xpPer:2,defReps:3,unit:"rounds"},
  {id:"planks",name:"Planks",icon:"🧱",col:"#00E87A",xpPer:5,defReps:3,unit:"sets"},
  {id:"pullups",name:"Pullups",icon:"🏋️",col:"#FF3D5A",xpPer:4,defReps:5,unit:"reps"},
  {id:"legs",name:"Leg Workouts",icon:"🦿",col:"#FF7A00",xpPer:2,defReps:15,unit:"reps"},
  {id:"mobility",name:"Mobility",icon:"🤸",col:"#8A9BB5",xpPer:1,defReps:15,unit:"mins"},
];
const PLAYER_HABITS = [
  {id:"water",name:"Hydration",icon:"💧",unit:"glasses",step:1,max:12},
  {id:"sleep",name:"Sleep",icon:"😴",unit:"hrs",step:1,max:12},
  {id:"homework",name:"Homework",icon:"📚",unit:"mins",step:15,max:180},
  {id:"stretching",name:"Stretching",icon:"🤸",unit:"mins",step:5,max:60},
  {id:"screentime",name:"Screen Time",icon:"📱",unit:"hrs",step:1,max:8},
  {id:"protein",name:"Protein Meal",icon:"🥩",unit:"meals",step:1,max:4},
];
const ADULT_WORKOUTS = [
  {id:"weights",name:"Weight Training",icon:"🏋️",col:"#1A56FF",xpPer:3,defReps:5,unit:"sets",desc:"Compound lifts — squat, deadlift, bench, rows. Log total sets."},
  {id:"run",name:"Running",icon:"🏃",col:"#00C8FF",xpPer:2,defReps:30,unit:"mins",desc:"Steady state or intervals. Count total minutes."},
  {id:"hiit",name:"HIIT",icon:"⚡",col:"#FF3D5A",xpPer:4,defReps:20,unit:"mins",desc:"High intensity intervals. Count total active minutes."},
  {id:"cycling",name:"Cycling",icon:"🚴",col:"#FFB800",xpPer:1.5,defReps:45,unit:"mins",desc:"Bike or stationary. Count total minutes."},
  {id:"swim",name:"Swimming",icon:"🏊",col:"#00C8FF",xpPer:2,defReps:30,unit:"mins",desc:"Laps or open water. Count total minutes."},
  {id:"yoga",name:"Yoga / Stretch",icon:"🧘",col:"#A855F7",xpPer:1.5,defReps:30,unit:"mins",desc:"Yoga, stretching, or mobility work."},
  {id:"walk",name:"Walk",icon:"🚶",col:"#00E87A",xpPer:1,defReps:30,unit:"mins",desc:"Brisk walk. Count total minutes."},
  {id:"soccer_dad",name:"Train With Squad",icon:"⚽",col:"#FF7A00",xpPer:3,defReps:60,unit:"mins",desc:"Train alongside the kids. Count total minutes."},
];
const ADULT_HABITS = [
  {id:"a_water",name:"Hydration",icon:"💧",unit:"glasses",step:1,max:16},
  {id:"a_sleep",name:"Sleep",icon:"😴",unit:"hrs",step:1,max:12},
  {id:"a_protein",name:"Protein",icon:"🥩",unit:"meals",step:1,max:6},
  {id:"a_steps",name:"Steps",icon:"👟",unit:"k steps",step:1,max:30},
  {id:"a_meditate",name:"Meditation",icon:"🧠",unit:"mins",step:5,max:60},
  {id:"a_reading",name:"Reading",icon:"📖",unit:"mins",step:15,max:120},
  {id:"a_cold",name:"Cold Shower",icon:"🧊",unit:"done",step:1,max:1},
  {id:"a_alcohol",name:"Alcohol Free",icon:"✅",unit:"day",step:1,max:1},
];
const BUSINESS_CATS = [
  {id:"b_calls",name:"Prospect Calls",icon:"📞",unit:"calls",step:1,max:50,col:"#1A56FF"},
  {id:"b_emails",name:"Outreach Emails",icon:"📧",unit:"emails",step:1,max:100,col:"#00C8FF"},
  {id:"b_meetings",name:"Client Meetings",icon:"🤝",unit:"meetings",step:1,max:20,col:"#FFB800"},
  {id:"b_listings",name:"Listings Worked",icon:"🏢",unit:"listings",step:1,max:20,col:"#FF7A00"},
  {id:"b_loi",name:"LOIs / Offers",icon:"📝",unit:"LOIs",step:1,max:10,col:"#A855F7"},
  {id:"b_content",name:"Content Published",icon:"📲",unit:"posts",step:1,max:10,col:"#FF3D5A"},
  {id:"b_revenue",name:"Revenue Logged",icon:"💰",unit:"$k",step:5,max:500,col:"#00E87A"},
  {id:"b_followup",name:"Follow-Ups Sent",icon:"🔁",unit:"followups",step:1,max:50,col:"#06B6D4"},
];
const WIN_PROMPTS = [
  "What was your biggest win today?","One thing you're proud of today?",
  "What deal moved forward today?","Who did you help today?",
  "What did you finish that you'd been putting off?",
];
const PLAYER_BADGES = [
  {id:"first",icon:"🎯",name:"First Workout",check:(p)=>p.sessions>=1},
  {id:"s3",icon:"🔥",name:"3-Day Streak",check:(p)=>p.streak>=3},
  {id:"s7",icon:"💥",name:"7-Day Streak",check:(p)=>p.streak>=7},
  {id:"t1k",icon:"⚽",name:"1K Touches",check:(p)=>p.touches>=1000},
  {id:"t5k",icon:"🌟",name:"5K Touches",check:(p)=>p.touches>=5000},
  {id:"wf",icon:"👟",name:"Two-Footed",check:(p)=>(p.wfSessions||0)>=5},
  {id:"elite",icon:"🏆",name:"Elite Level",check:(p)=>p.xp>=1500},
  {id:"warrior",icon:"⚔️",name:"Weekly Warrior",check:(p)=>p.sessions>=5},
  {id:"sniper",icon:"🥅",name:"Sniper",check:(p)=>(p.shotTouches||0)>=500},
];
const ADULT_BADGES = [
  {id:"a_first",icon:"💪",name:"First Session",check:(p)=>p.sessions>=1},
  {id:"a_s3",icon:"🔥",name:"3-Day Streak",check:(p)=>p.streak>=3},
  {id:"a_s7",icon:"💥",name:"7-Day Streak",check:(p)=>p.streak>=7},
  {id:"a_s30",icon:"👑",name:"30-Day Streak",check:(p)=>p.streak>=30},
  {id:"a_calls",icon:"📞",name:"50 Calls",check:(p)=>(p.totalCalls||0)>=50},
  {id:"a_wins",icon:"🏆",name:"10 Daily Wins",check:(p)=>(p.dailyWins||[]).length>=10},
  {id:"a_elite",icon:"⚡",name:"High Performer",check:(p)=>p.xp>=1500},
  {id:"a_deal",icon:"🤝",name:"Deal Maker",check:(p)=>(p.totalLOIs||0)>=5},
  {id:"a_content",icon:"📲",name:"Content Creator",check:(p)=>(p.totalContent||0)>=20},
];
const COACH_PROMPTS = {
  Striker:"You are an elite AI soccer coach for MLS NEXT striker development. Focus on finishing, movement, weak foot, pressing triggers, near-post runs. Under 100 words. Be demanding but encouraging.",
  Winger:"You are an elite AI soccer coach for MLS NEXT winger development. Focus on 1v1, crossing, weak foot, cutting inside, overlapping runs. Under 100 words. Be sharp and precise.",
  Midfielder:"You are an elite AI soccer coach for MLS NEXT midfielder development. Focus on passing range, press resistance, scanning, split passes. Under 100 words.",
  Defender:"You are an elite AI soccer coach for MLS NEXT defender development. Focus on 1v1 defending, body shape, line management, cover shadows. Under 100 words.",
  Goalkeeper:"You are an elite AI soccer coach for MLS NEXT goalkeeper development. Focus on shot-stopping, distribution, sweeper-keeper role, set position. Under 100 words.",
  Adult:"You are a high-performance life coach for a commercial real estate broker and soccer dad in Orlando/Puerto Rico. Help with fitness discipline, CRE business productivity, work-life balance, and daily habits. Be direct, practical, motivating. Reference CRE, deals, prospecting, content creation when relevant. Under 120 words.",
};
const STARTERS_PLAYER = ["What should I focus on today?","How do I improve my weak foot?","Give me a 15-minute solo drill","How do I get faster?","What do MLS NEXT scouts look for?","Rate my training this week"];
const STARTERS_ADULT  = ["How do I stay consistent with training?","Give me a 20-minute morning workout","How do I balance CRE hustle and fitness?","I skipped 3 days — how do I get back on track?","What habits should I build this month?","Rate my week based on my logs"];
const BG_ICONS = ["⚽","👟","⚡","🏃","🥅","🔥","💪","🎯","⚽","👟","🌟","⚽","💨","🦵","⚽","📐","🔮","⚽","👟","⚡"];
const INTENSITIES_SOCCER = ["Technical","Moderate","Match Speed","Explosive"];
const INTENSITIES_STR    = ["Technical","Moderate","Explosive","Max Effort"];
const INTENSITIES_ADULT  = ["Light","Moderate","Hard","Max Effort"];
const SEASON_DATE = new Date("2026-07-31");

// ── STATE ──
const S = {
  screen:"login",authMode:"login",tab:"home",
  logSubTab:"soccer",adultLogTab:"workout",drillFilter:"All",
  registerPos:"Winger",registerType:"Player",
  players:JSON.parse(localStorage.getItem("mlsnr_v3_players")||"[]"),
  currentPlayer:null,logEntries:{},expandedDrill:null,
  chatMessages:[],chatLoading:false,chatInput:"",
  toast:null,toastTimer:null,animFrames:{},winInput:"",showWinInput:false,
};

function save(){localStorage.setItem("mlsnr_v3_players",JSON.stringify(S.players));}
function getLevel(xp,adult=false){const a=adult?ADULT_LEVELS:LEVELS;return a.find(l=>xp>=l.min&&xp<l.max)||a[a.length-1];}
function getDaysLeft(){return Math.max(0,Math.ceil((SEASON_DATE-new Date())/86400000));}
function avatarColor(i){return AVATAR_COLORS[i%AVATAR_COLORS.length];}
function getEntry(id){return S.logEntries[id]||{reps:0,sets:1,intensity:"Technical",wf:false};}
function isAdult(){return S.currentPlayer?.accountType==="Coach / Parent";}
function setEntry(id,field,val){S.logEntries={...S.logEntries,[id]:{...getEntry(id),[field]:val}};render();}
function showToast(msg,type="success"){
  if(S.toastTimer)clearTimeout(S.toastTimer);
  S.toast={msg,type};S.toastTimer=setTimeout(()=>{S.toast=null;renderToast();},3000);renderToast();
}
function renderToast(){
  let el=document.querySelector(".toast");
  if(S.toast){if(!el){el=document.createElement("div");document.body.appendChild(el);}el.className="toast"+(S.toast.type==="error"?" error":"");el.textContent=S.toast.msg;}
  else{if(el)el.remove();}
}
function buildBg(){
  const el=document.getElementById("bgPattern");if(!el)return;let html="";
  for(let i=0;i<28;i++){const icon=BG_ICONS[i%BG_ICONS.length];html+=`<div class="bg-icon" style="left:${Math.random()*100}%;top:${Math.random()*120}%;font-size:${18+Math.random()*18}px;animation-duration:${18+Math.random()*22}s;animation-delay:-${Math.random()*20}s;">${icon}</div>`;}
  el.innerHTML=html;
}
function drillSVG(drill,w,h){
  const key="anim_"+drill.id,f=S.animFrames[key]||0;
  const b=Math.sin(f*.15)*9,a=Math.sin(f*.08)*32,p=.82+Math.sin(f*.12)*.18,spin=(f*4)%360,c=drill.col;
  return `<svg viewBox="0 0 200 100" width="${w}" height="${h}" style="display:block;"><defs><radialGradient id="g${drill.id}" cx="50%" cy="60%"><stop offset="0%" stop-color="${c}" stop-opacity=".22"/><stop offset="100%" stop-color="#080C18" stop-opacity=".97"/></radialGradient></defs><rect width="200" height="100" fill="url(#g${drill.id})" rx="10"/><line x1="12" y1="84" x2="148" y2="84" stroke="${c}" stroke-opacity=".18" stroke-width="1"/>${[32,62,92,122].map(x=>`<polygon points="${x},78 ${x+6},86 ${x-6},86" fill="${c}" opacity=".6"/>`).join("")}<g transform="translate(${54+a},${72+b})"><circle r="${7*p}" fill="white" opacity=".94"/><circle r="${7*p}" fill="none" stroke="${c}" stroke-width="1.5"/><line x1="${-5*p}" y1="0" x2="${5*p}" y2="0" stroke="${c}" stroke-width="1" opacity=".5" transform="rotate(${spin})"/><line x1="0" y1="${-5*p}" x2="0" y2="${5*p}" stroke="${c}" stroke-width="1" opacity=".5" transform="rotate(${spin})"/></g><g transform="translate(${44+a*.6},50)"><circle cy="-15" r="5" fill="${c}" opacity=".9"/><line x1="0" y1="-10" x2="0" y2="4" stroke="${c}" stroke-width="2.5" stroke-opacity=".85"/><line x1="0" y1="-2" x2="-9" y2="7" stroke="${c}" stroke-width="2" stroke-opacity=".75"/><line x1="0" y1="-2" x2="9" y2="7" stroke="${c}" stroke-width="2" stroke-opacity=".75"/><line x1="0" y1="4" x2="-5" y2="15" stroke="${c}" stroke-width="2" stroke-opacity=".75"/><line x1="0" y1="4" x2="5" y2="15" stroke="${c}" stroke-width="2" stroke-opacity=".75"/></g><path d="M22,82 Q${50+a*.4},60 ${80+a*.6},82" stroke="${c}" stroke-width="1.5" fill="none" stroke-dasharray="5,4" opacity=".4"/><rect x="110" y="7" width="46" height="18" rx="9" fill="${c}" opacity=".14"/><text x="133" y="20" text-anchor="middle" fill="${c}" font-size="9" font-family="monospace" font-weight="bold">${drill.defReps} ${drill.unit}</text></svg>`;
}
function tickAnims(){
  SOCCER_DRILLS.forEach(d=>{S.animFrames["anim_"+d.id]=(S.animFrames["anim_"+d.id]||0)+1;});
  document.querySelectorAll("[data-anim]").forEach(el=>{const id=el.getAttribute("data-anim"),drill=SOCCER_DRILLS.find(d=>d.id===id);if(drill)el.innerHTML=drillSVG(drill,parseInt(el.getAttribute("data-w")),parseInt(el.getAttribute("data-h")));});
  requestAnimationFrame(tickAnims);
}
function render(){const app=document.getElementById("app");if(!app)return;app.innerHTML=(S.screen==="login"||S.screen==="register")?renderAuth():renderMain();}

function renderAuth(){
  const isReg=S.authMode==="register";
  return `<div class="auth-screen fade-up"><div class="auth-logo"><div class="sub">MLS NEXT</div><div class="main">READY</div><div class="tagline">ELITE SOCCER · PEAK PERFORMANCE</div></div>
  <div class="auth-card"><div class="auth-tab"><button class="${!isReg?"active":""}" onclick="switchAuth('login')">SIGN IN</button><button class="${isReg?"active":""}" onclick="switchAuth('register')">JOIN</button></div>
  ${isReg?`<div class="field"><label>FULL NAME</label><input id="reg-name" placeholder="Diego Sampson" maxlength="30"/></div><div class="field"><label>EMAIL</label><input id="reg-email" type="email" placeholder="you@email.com"/></div><div class="field"><label>PASSWORD</label><input id="reg-pass" type="password" placeholder="Create password"/></div>
  <div style="font-size:10px;color:var(--silver);letter-spacing:.1em;font-weight:700;margin-bottom:8px;">ACCOUNT TYPE</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">${ACCOUNT_TYPES.map(t=>`<div class="pos-btn${S.registerType===t?" active":""}" onclick="S.registerType='${t}';render()">${t==="Player"?"⚽ Player":"🏆 Coach / Parent"}</div>`).join("")}</div>
  ${S.registerType==="Player"?`<div class="field"><label>AGE</label><input id="reg-age" type="number" placeholder="14" min="8" max="20"/></div><div class="field"><label>TEAM</label><input id="reg-team" placeholder="Nona Soccer U14" maxlength="30"/></div><div style="font-size:10px;color:var(--silver);letter-spacing:.1em;font-weight:700;margin-bottom:8px;">MY POSITION</div><div class="pos-grid">${POSITIONS.map(pos=>`<div class="pos-btn${S.registerPos===pos?" active":""}" onclick="S.registerPos='${pos}';render()">${pos}</div>`).join("")}</div>`:`<div class="field"><label>TEAM</label><input id="reg-team" placeholder="Nona Soccer U14" maxlength="30"/></div>`}
  <button class="btn-primary" onclick="doRegister()">CREATE ACCOUNT →</button>`
  :`<div class="field"><label>EMAIL</label><input id="login-email" placeholder="your@email.com"/></div><div class="field"><label>PASSWORD</label><input id="login-pass" type="password" placeholder="Password"/></div><button class="btn-primary" style="margin-top:4px;" onclick="doLogin()">SIGN IN →</button>
  `}
  </div></div>`;
}

function renderMain(){
  const p=S.currentPlayer,adult=isAdult(),lv=getLevel(p.xp,adult);
  const lvArr=adult?ADULT_LEVELS:LEVELS,nx=lvArr[lvArr.indexOf(lv)+1];
  const pct=nx?((p.xp-lv.min)/(nx.min-lv.min))*100:100;
  const nav=adult?[{id:"home",icon:"⚡",label:"HOME"},{id:"log",icon:"📋",label:"LOG"},{id:"coach",icon:"🧠",label:"COACH"},{id:"squad",icon:"🏅",label:"SQUAD"},{id:"profile",icon:"🏆",label:"ME"}]:[{id:"home",icon:"⚡",label:"HOME"},{id:"log",icon:"📋",label:"LOG"},{id:"drills",icon:"🎯",label:"DRILLS"},{id:"coach",icon:"🧠",label:"COACH"},{id:"squad",icon:"🏅",label:"SQUAD"},{id:"profile",icon:"🏆",label:"ME"}];
  return `<div class="header"><div class="header-top"><div class="logo-sm"><div class="sub">MLS NEXT</div><div class="main">READY</div></div><div class="header-right"><div class="pos-label">${adult?"Coach / Parent":p.position}</div><div class="level-badge" style="background:${lv.col}18;border:1px solid ${lv.col}45;color:${lv.col};">${lv.icon} ${lv.name}</div></div></div>
  <div><div class="xp-labels"><span style="color:${lv.col};font-weight:800;">${lv.icon} ${lv.name}</span><span style="color:var(--silver);">${p.xp.toLocaleString()} XP${nx?" / "+nx.min.toLocaleString():""}</span></div><div class="xp-track"><div class="xp-fill" style="width:${pct}%;background:linear-gradient(90deg,${lv.col},var(--cyan));box-shadow:0 0 8px ${lv.col}70;"></div></div></div></div>
  <div class="content fade-up">${renderTab()}</div>
  <div class="bottom-nav">${nav.map(t=>`<button class="nav-btn${S.tab===t.id?" active":""}" onclick="goTab('${t.id}')"><div class="nav-icon">${t.icon}</div><div>${t.label}</div></button>`).join("")}</div>`;
}

function renderTab(){
  if(S.tab==="home")return isAdult()?renderAdultHome():renderPlayerHome();
  if(S.tab==="log")return isAdult()?renderAdultLog():renderPlayerLog();
  if(S.tab==="drills")return renderDrills();
  if(S.tab==="coach")return renderCoach();
  if(S.tab==="squad")return renderSquad();
  if(S.tab==="profile")return renderProfile();
  return "";
}

function renderPlayerHome(){
  const p=S.currentPlayer,days=getDaysLeft(),wkPct=Math.min(((p.weeklyTouches||0)/5000)*100,100);
  return `<div class="countdown-card"><div style="font-size:9px;color:var(--silver);letter-spacing:.15em;margin-bottom:6px;">SEASON STARTS · JULY 31, 2026</div><div class="countdown-num">${days}</div><div class="countdown-sub">DAYS TO GET READY</div><div class="countdown-bar"><div class="countdown-fill" style="width:${Math.min(100,(1-days/365)*100)}%;"></div></div></div>
  <div class="stats-row"><div class="stat-card"><div class="stat-label">STREAK</div><div class="stat-val">${p.streak||0}🔥</div><div class="stat-sub">days</div></div><div class="stat-card"><div class="stat-label">TOUCHES</div><div class="stat-val">${(p.touches||0).toLocaleString()}</div><div class="stat-sub">total</div></div><div class="stat-card"><div class="stat-label">SESSIONS</div><div class="stat-val">${p.sessions||0}</div><div class="stat-sub">logged</div></div></div>
  <div class="weekly-card"><div class="weekly-top"><span style="font-size:11px;font-weight:800;letter-spacing:.07em;">WEEKLY TOUCH GOAL</span><span style="font-size:11px;color:var(--cyan);font-weight:700;">${(p.weeklyTouches||0).toLocaleString()} / 5,000</span></div><div class="weekly-track"><div class="weekly-fill" style="width:${wkPct}%;background:linear-gradient(90deg,var(--blue),var(--cyan));"></div></div><div class="weekly-bottom"><span style="font-size:10px;color:var(--silver);">${Math.max(0,5000-(p.weeklyTouches||0)).toLocaleString()} remaining</span><span style="font-size:10px;color:var(--gold);font-weight:700;">${Math.round(wkPct)}% complete</span></div></div>
  <button class="btn-primary" style="margin-bottom:12px;" onclick="goTab('log')">+ LOG TODAY'S TRAINING</button>
  <div class="section-label">RECOMMENDED FOR ${p.position.toUpperCase()}</div>
  ${SOCCER_DRILLS.slice(0,3).map(d=>`<div class="card" style="display:flex;align-items:center;gap:11px;cursor:pointer;" onclick="goTab('log');S.expandedDrill='${d.id}';render()"><div style="width:42px;height:42px;border-radius:10px;background:${d.col}18;border:1px solid ${d.col}30;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${d.icon}</div><div style="flex:1;min-width:0;"><div style="font-weight:800;font-size:13px;margin-bottom:3px;">${d.name}</div><div style="display:flex;gap:5px;flex-wrap:wrap;"><span style="font-size:9px;color:${d.col};background:${d.col}12;border-radius:4px;padding:2px 7px;font-weight:700;">${d.cat}</span><span style="font-size:9px;color:var(--silver);">Target: ${d.defReps} ${d.unit}</span>${d.wf?`<span style="font-size:9px;color:var(--gold);background:rgba(255,184,0,.12);border-radius:4px;padding:2px 7px;">👟 WF</span>`:""}</div></div><div style="font-size:11px;color:var(--gold);font-weight:800;flex-shrink:0;">+XP</div></div>`).join("")}
  <div class="section-label" style="margin-top:12px;">RECENT SESSIONS</div>
  ${(p.recentSessions||[]).slice(0,4).map(s=>`<div class="card" style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-weight:800;font-size:13px;">${s.name}</div><div style="font-size:10px;color:var(--silver);margin-top:2px;">${s.reps}r × ${s.sets} · ${s.intensity} · ${s.date}${s.wf?" · 👟":""}</div></div><div style="text-align:right;"><div style="font-size:12px;color:var(--gold);font-weight:800;">+${s.xp}</div><div style="font-size:9px;color:var(--silver);">${s.touches} touches</div></div></div>`).join("")||`<div style="text-align:center;color:var(--silver);padding:20px;font-size:12px;">No sessions yet. Start logging! 🚀</div>`}`;
}

function renderAdultHome(){
  const p=S.currentPlayer,today=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),wins=(p.dailyWins||[]).slice(0,3),biz=p.todayBiz||{};
  return `<div style="font-size:11px;color:var(--silver);margin-bottom:4px;letter-spacing:.06em;">${today.toUpperCase()}</div>
  <div style="font-size:22px;font-weight:900;margin-bottom:16px;">Good morning, ${p.name.split(" ")[0]} 👊</div>
  <div class="stats-row"><div class="stat-card"><div class="stat-label">STREAK</div><div class="stat-val">${p.streak||0}🔥</div><div class="stat-sub">days</div></div><div class="stat-card"><div class="stat-label">SESSIONS</div><div class="stat-val">${p.sessions||0}</div><div class="stat-sub">logged</div></div><div class="stat-card"><div class="stat-label">WINS</div><div class="stat-val">${(p.dailyWins||[]).length}</div><div class="stat-sub">total</div></div></div>
  <div class="card" style="margin-bottom:10px;"><div style="font-size:11px;font-weight:800;letter-spacing:.08em;margin-bottom:12px;">TODAY'S BUSINESS</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">${[{icon:"📞",label:"CALLS",val:biz.b_calls||0,col:"#1A56FF"},{icon:"📧",label:"EMAILS",val:biz.b_emails||0,col:"#00C8FF"},{icon:"🤝",label:"MEETINGS",val:biz.b_meetings||0,col:"#FFB800"}].map(item=>`<div style="background:var(--card2);border:1px solid ${item.col}30;border-radius:10px;padding:10px;text-align:center;"><div style="font-size:16px;margin-bottom:3px;">${item.icon}</div><div style="font-size:20px;font-weight:900;color:${item.col};">${item.val}</div><div style="font-size:8px;color:var(--silver);letter-spacing:.08em;">${item.label}</div></div>`).join("")}</div></div>
  <button class="btn-primary" style="margin-bottom:10px;" onclick="goTab('log')">+ LOG TODAY'S ACTIVITY</button>
  <div class="card" style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><div style="font-size:11px;font-weight:800;letter-spacing:.08em;">DAILY WINS 🏆</div><button onclick="S.showWinInput=!S.showWinInput;render()" style="background:var(--blue);border:none;border-radius:7px;padding:5px 12px;color:white;font-size:10px;font-weight:800;cursor:pointer;font-family:inherit;">+ ADD WIN</button></div>
  ${S.showWinInput?`<div style="margin-bottom:10px;"><input id="winInput" placeholder="${WIN_PROMPTS[new Date().getDay()%WIN_PROMPTS.length]}" oninput="S.winInput=this.value" onkeydown="if(event.key==='Enter')addWin()" style="width:100%;background:var(--card2);border:1.5px solid var(--blue);border-radius:9px;padding:10px 12px;color:var(--white);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;"/><button onclick="addWin()" style="width:100%;margin-top:7px;background:var(--blue);border:none;border-radius:9px;padding:10px;color:white;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit;">SAVE WIN ✓</button></div>`:""}
  ${wins.length?wins.map((w,i)=>`<div style="display:flex;gap:10px;align-items:flex-start;${i<wins.length-1?"padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid var(--border);":""}"><div style="font-size:18px;flex-shrink:0;">🏆</div><div style="flex:1;"><div style="font-size:12px;font-family:'DM Sans',sans-serif;line-height:1.5;">${w.text}</div><div style="font-size:9px;color:var(--silver);margin-top:3px;">${w.date}</div></div></div>`).join(""):`<div style="text-align:center;color:var(--silver);padding:10px;font-size:12px;">No wins logged yet — add your first one! 🏆</div>`}</div>
  <div class="section-label">RECENT WORKOUTS</div>
  ${(p.recentSessions||[]).slice(0,3).map(s=>`<div class="card" style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-weight:800;font-size:13px;">${s.name}</div><div style="font-size:10px;color:var(--silver);margin-top:2px;">${s.reps}r × ${s.sets} · ${s.intensity} · ${s.date}</div></div><div style="text-align:right;"><div style="font-size:12px;color:var(--gold);font-weight:800;">+${s.xp} XP</div></div></div>`).join("")||`<div style="text-align:center;color:var(--silver);padding:20px;font-size:12px;">No workouts yet. Start today! 💪</div>`}`;
}

function renderPlayerLog(){
  return `<div style="font-size:20px;font-weight:900;letter-spacing:.04em;margin-bottom:4px;">DAILY LOG</div><div style="font-size:11px;color:var(--silver);margin-bottom:14px;">${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</div>
  <div class="sub-tabs">${["soccer","strength","habits"].map(t=>`<button class="sub-tab${S.logSubTab===t?" active":""}" onclick="S.logSubTab='${t}';S.expandedDrill=null;render()">${t}</button>`).join("")}</div>
  ${S.logSubTab==="soccer"?renderSoccerLog():S.logSubTab==="strength"?renderStrengthLog():renderPlayerHabits()}
  <div style="height:12px;"></div><button class="btn-primary" onclick="saveLog()">💾 SAVE TODAY'S LOG</button>`;
}

function renderAdultLog(){
  return `<div style="font-size:20px;font-weight:900;letter-spacing:.04em;margin-bottom:4px;">DAILY LOG</div><div style="font-size:11px;color:var(--silver);margin-bottom:14px;">${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</div>
  <div class="sub-tabs" style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;">${["workout","habits","business","wins"].map(t=>`<button class="sub-tab${S.adultLogTab===t?" active":""}" onclick="S.adultLogTab='${t}';S.expandedDrill=null;render()">${t}</button>`).join("")}</div>
  ${S.adultLogTab==="workout"?renderAdultWorkouts():S.adultLogTab==="habits"?renderAdultHabits():S.adultLogTab==="business"?renderBusinessLog():renderWinsLog()}
  ${S.adultLogTab!=="wins"?`<div style="height:12px;"></div><button class="btn-primary" onclick="saveAdultLog()">💾 SAVE TODAY'S LOG</button>`:""}`;
}

function renderAccord(d,open,logged,projXP,extraContent,unit,meta){
  return `<div class="accord${logged?" logged":""}">
    <div class="accord-header" onclick="S.expandedDrill=S.expandedDrill==='${d.id}'?null:'${d.id}';render()">
      <div class="accord-icon" style="background:${d.col}18;border:1px solid ${d.col}30;">${d.icon}</div>
      <div style="flex:1;"><div class="accord-title">${d.name}</div>${logged?`<div class="accord-meta" style="color:${d.col};">${meta}</div>`:""}</div>
      <div style="display:flex;align-items:center;gap:8px;">${logged?`<div style="width:7px;height:7px;border-radius:99px;background:var(--green);"></div>`:""}<div class="accord-arrow${open?" open":""}">∨</div></div>
    </div>
    ${open?`<div class="accord-body">${extraContent}</div>`:""}
  </div>`;
}

function setsRow(id,e){return `<div class="sets-row">${[1,2,3,4,5].map(n=>`<button class="set-btn${e.sets===n?" active":""}" onclick="setEntry('${id}','sets',${n})">${n}</button>`).join("")}</div>`;}

function renderSoccerLog(){
  return SOCCER_DRILLS.map(d=>{
    const e=getEntry(d.id),open=S.expandedDrill===d.id,logged=e.reps>0;
    const step=(d.id==="team"||d.id==="conditioning"||d.id==="recovery")?5:10;
    const projT=e.reps*e.sets,projXP=Math.round(e.reps*e.sets*d.xpPer);
    const body=`<div data-anim="${d.id}" data-w="380" data-h="100" style="border-radius:10px;overflow:hidden;">${drillSVG(d,380,100)}</div><div class="drill-desc">${d.desc}</div>
      <div class="controls-grid"><div><div class="ctrl-label">REPS / ${d.unit.toUpperCase()}</div><div class="counter-row"><button class="counter-btn" onclick="setEntry('${d.id}','reps',Math.max(0,${e.reps}-${step}))">−</button><div class="counter-val">${e.reps}</div><button class="counter-btn" onclick="setEntry('${d.id}','reps',${e.reps}+${step})">+</button></div></div><div><div class="ctrl-label">SETS</div>${setsRow(d.id,e)}</div></div>
      <div class="intensity-label">INTENSITY</div><div class="intensity-grid">${INTENSITIES_SOCCER.map(l=>`<button class="intensity-btn${e.intensity===l?" active":""}" onclick="setEntry('${d.id}','intensity','${l}')">${l}</button>`).join("")}</div>
      ${d.wf?`<div class="wf-toggle${e.wf?" active":""}" onclick="setEntry('${d.id}','wf',${!e.wf})"><div class="wf-check">${e.wf?"✓":""}</div><div><div style="font-weight:800;font-size:12px;color:${e.wf?"var(--gold)":"var(--white)"};">👟 WEAK FOOT COMPLETED</div><div style="font-size:10px;color:var(--silver);">Did you train your weak foot?</div></div></div>`:""}
      ${e.reps>0?`<div class="preview-card"><div><div style="font-size:8px;color:var(--silver);font-weight:700;letter-spacing:.1em;">TOUCHES</div><div class="preview-val" style="color:var(--cyan);">${projT}</div></div><div style="text-align:right;"><div style="font-size:8px;color:var(--silver);font-weight:700;letter-spacing:.1em;">XP</div><div class="preview-val" style="color:var(--gold);">+${projXP}</div></div></div>`:""}`;
    return renderAccord(d,open,logged,projXP,body,d.unit,`${e.reps}r × ${e.sets} · +${projXP} XP`);
  }).join("");
}

function renderStrengthLog(){
  return STRENGTH_DRILLS.map(d=>{
    const e=getEntry(d.id),open=S.expandedDrill===d.id,logged=e.reps>0,projXP=Math.round(e.reps*e.sets*d.xpPer);
    const body=`<div class="controls-grid" style="margin-top:14px;"><div><div class="ctrl-label">REPS / ${d.unit.toUpperCase()}</div><div class="counter-row"><button class="counter-btn" onclick="setEntry('${d.id}','reps',Math.max(0,${e.reps}-5))">−</button><div class="counter-val">${e.reps}</div><button class="counter-btn" onclick="setEntry('${d.id}','reps',${e.reps}+5)">+</button></div></div><div><div class="ctrl-label">SETS</div>${setsRow(d.id,e)}</div></div>
      <div class="intensity-label">INTENSITY</div><div class="intensity-grid">${INTENSITIES_STR.map(l=>`<button class="intensity-btn${e.intensity===l?" active":""}" onclick="setEntry('${d.id}','intensity','${l}')">${l}</button>`).join("")}</div>
      ${e.reps>0?`<div class="preview-card" style="justify-content:center;"><div style="text-align:center;"><div style="font-size:8px;color:var(--silver);font-weight:700;letter-spacing:.1em;">XP EARNED</div><div class="preview-val" style="color:var(--gold);font-size:36px;">+${projXP}</div></div></div>`:""}`;
    return renderAccord(d,open,logged,projXP,body,d.unit,`${e.reps}r × ${e.sets} · +${projXP} XP`);
  }).join("");
}

function renderPlayerHabits(){
  return PLAYER_HABITS.map(h=>{const val=(S.logEntries[h.id]?.reps)||0;return `<div class="habit-row"><div class="habit-icon">${h.icon}</div><div class="habit-info"><div class="habit-name">${h.name}</div><div class="habit-val">${val} ${h.unit}</div></div><div class="habit-controls"><button class="habit-btn" onclick="setEntry('${h.id}','reps',Math.max(0,${val}-${h.step}))">−</button><div class="habit-num">${val}</div><button class="habit-btn" onclick="setEntry('${h.id}','reps',Math.min(${h.max},${val}+${h.step}))">+</button></div></div>`;}).join("");
}

function renderAdultWorkouts(){
  return ADULT_WORKOUTS.map(d=>{
    const e=getEntry(d.id),open=S.expandedDrill===d.id,logged=e.reps>0,projXP=Math.round(e.reps*e.sets*d.xpPer);
    const body=`<div class="drill-desc">${d.desc}</div>
      <div class="controls-grid"><div><div class="ctrl-label">${d.unit.toUpperCase()}</div><div class="counter-row"><button class="counter-btn" onclick="setEntry('${d.id}','reps',Math.max(0,${e.reps}-5))">−</button><div class="counter-val">${e.reps}</div><button class="counter-btn" onclick="setEntry('${d.id}','reps',${e.reps}+5)">+</button></div></div><div><div class="ctrl-label">SETS / ROUNDS</div>${setsRow(d.id,e)}</div></div>
      <div class="intensity-label">INTENSITY</div><div class="intensity-grid">${INTENSITIES_ADULT.map(l=>`<button class="intensity-btn${e.intensity===l?" active":""}" onclick="setEntry('${d.id}','intensity','${l}')">${l}</button>`).join("")}</div>
      ${e.reps>0?`<div class="preview-card" style="justify-content:center;"><div style="text-align:center;"><div style="font-size:8px;color:var(--silver);font-weight:700;letter-spacing:.1em;">XP EARNED</div><div class="preview-val" style="color:var(--gold);font-size:36px;">+${projXP}</div></div></div>`:""}`;
    return renderAccord(d,open,logged,projXP,body,d.unit,`${e.reps} ${d.unit} × ${e.sets} · +${projXP} XP`);
  }).join("");
}

function renderAdultHabits(){
  return ADULT_HABITS.map(h=>{const val=(S.logEntries[h.id]?.reps)||0;return `<div class="habit-row"><div class="habit-icon">${h.icon}</div><div class="habit-info"><div class="habit-name">${h.name}</div><div class="habit-val">${val} ${h.unit}</div></div><div class="habit-controls"><button class="habit-btn" onclick="setEntry('${h.id}','reps',Math.max(0,${val}-${h.step}))">−</button><div class="habit-num">${val}</div><button class="habit-btn" onclick="setEntry('${h.id}','reps',Math.min(${h.max},${val}+${h.step}))">+</button></div></div>`;}).join("");
}

function renderBusinessLog(){
  return `<div style="font-size:11px;color:var(--silver);margin-bottom:12px;line-height:1.5;">Log your CRE activity for today. Every action builds your score.</div>
  ${BUSINESS_CATS.map(b=>{const val=(S.logEntries[b.id]?.reps)||0;return `<div class="habit-row" style="border-color:${val>0?b.col+"50":"var(--border)"};background:${val>0?b.col+"08":"var(--card)"};">
    <div class="habit-icon">${b.icon}</div><div class="habit-info"><div class="habit-name">${b.name}</div><div class="habit-val" style="color:${val>0?b.col:"var(--silver)"};">${val} ${b.unit}</div></div>
    <div class="habit-controls"><button class="habit-btn" onclick="setEntry('${b.id}','reps',Math.max(0,${val}-${b.step}))">−</button><div class="habit-num" style="color:${val>0?b.col:"var(--white)"};">${val}</div><button class="habit-btn" onclick="setEntry('${b.id}','reps',Math.min(${b.max},${val}+${b.step}))">+</button></div>
  </div>`;}).join("")}`;
}

function renderWinsLog(){
  const p=S.currentPlayer,wins=(p.dailyWins||[]);
  return `<div style="font-size:11px;color:var(--silver);margin-bottom:12px;line-height:1.5;">Record your wins — deals, calls, content, personal. Everything counts.</div>
  <div style="margin-bottom:14px;">
    <input id="winInputLog" placeholder="${WIN_PROMPTS[new Date().getDay()%WIN_PROMPTS.length]}" oninput="S.winInput=this.value" onkeydown="if(event.key==='Enter')addWin()"
      style="width:100%;background:var(--card);border:1.5px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--white);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;margin-bottom:8px;"/>
    <button onclick="addWin()" style="width:100%;background:var(--gold);border:none;border-radius:10px;padding:12px;color:#000;font-weight:900;font-size:14px;cursor:pointer;font-family:inherit;letter-spacing:.04em;">🏆 LOG THIS WIN</button>
  </div>
  ${wins.length?`<div class="section-label">ALL WINS (${wins.length})</div>`:""}
  ${wins.map(w=>`<div class="card" style="display:flex;gap:10px;align-items:flex-start;"><div style="font-size:20px;flex-shrink:0;">🏆</div><div style="flex:1;"><div style="font-size:13px;font-family:'DM Sans',sans-serif;line-height:1.5;font-weight:500;">${w.text}</div><div style="font-size:9px;color:var(--silver);margin-top:4px;">${w.date}</div></div></div>`).join("")||`<div style="text-align:center;color:var(--silver);padding:20px;font-size:12px;">No wins yet — log your first one above! 🏆</div>`}`;
}

function renderDrills(){
  const cats=["All","Technical","Finishing","Athletic","Recovery","Team"];
  const filtered=S.drillFilter==="All"?SOCCER_DRILLS:SOCCER_DRILLS.filter(d=>d.cat===S.drillFilter);
  return `<div style="font-size:20px;font-weight:900;letter-spacing:.04em;margin-bottom:13px;">DRILL LIBRARY</div>
  <div class="filter-row">${cats.map(c=>`<button class="filter-pill${S.drillFilter===c?" active":""}" onclick="S.drillFilter='${c}';render()">${c}</button>`).join("")}</div>
  ${filtered.map(d=>`<div class="drill-card" onclick="goTab('log');S.logSubTab='soccer';S.expandedDrill='${d.id}';render()"><div data-anim="${d.id}" data-w="400" data-h="100">${drillSVG(d,400,100)}</div><div class="drill-info"><div><div style="font-weight:900;font-size:15px;margin-bottom:4px;">${d.name}</div><div class="drill-badges"><span class="drill-badge" style="color:${d.col};background:${d.col}12;">${d.cat}</span><span class="drill-badge" style="color:var(--silver);background:#1A2744;">${d.defReps} ${d.unit}</span>${d.wf?`<span class="drill-badge" style="color:var(--gold);background:rgba(255,184,0,.12);">👟 WF</span>`:""}</div></div><div style="text-align:right;flex-shrink:0;"><div style="font-size:9px;color:var(--silver);">UP TO</div><div style="font-size:14px;color:var(--gold);font-weight:900;">+${Math.round(d.defReps*3*d.xpPer)} XP</div></div></div></div>`).join("")}`;
}

function renderCoach(){
  const p=S.currentPlayer,adult=isAdult();
  if(S.chatMessages.length===0)initCoach();
  const starters=adult?STARTERS_ADULT:STARTERS_PLAYER;
  return `<div style="font-size:20px;font-weight:900;letter-spacing:.04em;margin-bottom:3px;">${adult?"PERFORMANCE COACH":"AI COACH"}</div>
  <div style="font-size:11px;color:var(--silver);margin-bottom:14px;">${adult?"Your personal high-performance coach":"Position-tuned for: <span style='color:var(--cyan);font-weight:700;'>"+p.position+"</span>"}</div>
  ${S.chatMessages.length<=1?`<div class="section-label">QUICK QUESTIONS</div><div class="starter-chips">${starters.map(q=>`<button class="starter-chip" onclick="sendChat(${JSON.stringify(q)})">${q}</button>`).join("")}</div>`:""}
  <div class="chat-area" id="chatArea">${S.chatMessages.map(m=>`<div class="msg ${m.role}"><div class="msg-bubble">${m.content.replace(/\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}</div></div>`).join("")}${S.chatLoading?`<div class="msg assistant"><div class="msg-bubble pulsing" style="color:var(--silver);">Coach is thinking...</div></div>`:""}<div id="chatEnd"></div></div>
  <div class="chat-input-row"><input class="chat-input" id="chatInput" placeholder="Ask your coach..." value="${S.chatInput.replace(/"/g,"&quot;")}" oninput="S.chatInput=this.value" onkeydown="if(event.key==='Enter')sendChat(S.chatInput)"/><button class="chat-send" onclick="sendChat(S.chatInput)">→</button></div>`;
}

function initCoach(){
  const p=S.currentPlayer,adult=isAdult(),lv=getLevel(p.xp,adult);
  S.chatMessages=[{role:"assistant",content:adult?`Hey ${p.name.split(" ")[0]}! 👊 I'm your performance coach.\n\nI'll help you stay disciplined with fitness, crush your CRE targets, and be the best coach for your squad. You're at **${lv.name}** with ${p.xp} XP and a **${p.streak||0}-day streak**. What do you need today?`:`Hey ${p.name}! 👋 I'm your AI coach for **${p.position}** development.\n\nYou're at **${lv.name}** level with ${p.xp} XP and ${(p.touches||0).toLocaleString()} total touches. Season starts in **${getDaysLeft()} days**. Let's get you MLS NEXT ready! 🚀`}];
}

async function sendChat(text){
  if(!text||!text.trim()||S.chatLoading)return;
  S.chatInput="";const p=S.currentPlayer,adult=isAdult(),lv=getLevel(p.xp,adult);
  S.chatMessages=[...S.chatMessages,{role:"user",content:text}];S.chatLoading=true;render();scrollChat();
  const sys=adult?COACH_PROMPTS.Adult+` Stats: ${p.name}, Coach/Parent, ${lv.name}, ${p.xp} XP, ${p.streak||0}-day streak, ${p.sessions||0} sessions, ${(p.dailyWins||[]).length} wins.`:(COACH_PROMPTS[p.position]||COACH_PROMPTS.Midfielder)+` Player: ${p.name}, ${p.position}, ${lv.name}, ${p.xp} XP, ${p.touches||0} touches, ${p.streak||0}-day streak, ${getDaysLeft()} days to season.`;
  try{
    const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:S.chatMessages.map(m=>({role:m.role,content:m.content}))})});
    const data=await res.json();
    S.chatMessages=[...S.chatMessages,{role:"assistant",content:data.content?.[0]?.text||"Add your API key in app.js to activate the coach."}];
  }catch{S.chatMessages=[...S.chatMessages,{role:"assistant",content:"Network issue. Add your API key in app.js to activate the coach."}];}
  S.chatLoading=false;render();scrollChat();
}
function scrollChat(){setTimeout(()=>{document.getElementById("chatEnd")?.scrollIntoView({behavior:"smooth"});},100);}

function renderSquad(){
  const sorted=[...S.players].sort((a,b)=>b.xp-a.xp),medals=["🥇","🥈","🥉"];
  return `<div style="font-size:20px;font-weight:900;letter-spacing:.04em;margin-bottom:4px;">SQUAD</div><div style="font-size:11px;color:var(--silver);margin-bottom:14px;">Nona Soccer · Full Leaderboard</div>
  ${sorted.map((pl,i)=>{const lv=getLevel(pl.xp,pl.accountType==="Coach / Parent"),isMe=pl.email===S.currentPlayer.email,ac=avatarColor(i);return `<div class="lb-row${isMe?" me":""}"><div class="lb-rank">${i<3?medals[i]:i+1}</div><div class="lb-avatar" style="background:${ac}22;border:2px solid ${ac}50;color:${ac};">${pl.name.charAt(0)}</div><div class="lb-info"><div class="lb-name">${pl.name}${isMe?" 👈":""}${pl.accountType==="Coach / Parent"?" 🏆":""}</div><div class="lb-pos">${pl.accountType==="Coach / Parent"?"Coach / Parent":pl.position} · ${lv.icon} ${lv.name}</div></div><div class="lb-xp">${pl.xp.toLocaleString()}</div></div>`;}).join("")||`<div style="text-align:center;color:var(--silver);padding:40px;font-size:13px;">No players yet 🚀</div>`}`;
}

function renderProfile(){
  const p=S.currentPlayer,adult=isAdult(),lv=getLevel(p.xp,adult),lvArr=adult?ADULT_LEVELS:LEVELS,nx=lvArr[lvArr.indexOf(lv)+1];
  const pct=nx?((p.xp-lv.min)/(nx.min-lv.min))*100:100,badges=(adult?ADULT_BADGES:PLAYER_BADGES).map(b=>({...b,earned:b.check(p)}));
  return `<div style="text-align:center;margin-bottom:16px;"><div style="width:62px;height:62px;border-radius:50%;background:${avatarColor(0)}22;border:2px solid ${avatarColor(0)}50;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:${avatarColor(0)};margin:0 auto 8px;">${p.name.charAt(0)}</div><div style="font-size:22px;font-weight:900;">${p.name}</div><div style="font-size:11px;color:var(--silver);">${adult?"Coach / Parent":p.position} · ${p.team||"Nona Soccer"}</div><div style="margin-top:8px;display:inline-block;background:${adult?"rgba(255,184,0,.15)":"rgba(26,86,255,.15)"};border:1px solid ${adult?"var(--gold)":"var(--blue)"};border-radius:99px;padding:4px 14px;font-size:10px;font-weight:800;color:${adult?"var(--gold)":"var(--cyan)"};">${adult?"🏆 COACH / PARENT":"⚽ PLAYER"}</div></div>
  <div class="card" style="background:linear-gradient(135deg,${lv.col}18,var(--card));border-color:${lv.col}40;text-align:center;padding:20px;margin-bottom:12px;"><div style="font-size:46px;margin-bottom:7px;">${lv.icon}</div><div style="font-size:24px;font-weight:900;color:${lv.col};margin-bottom:3px;">${lv.name}</div><div style="font-size:13px;color:var(--silver);margin-bottom:14px;">${p.xp.toLocaleString()} XP TOTAL</div><div class="xp-labels"><span style="color:${lv.col};font-weight:800;">${lv.icon} ${lv.name}</span><span style="color:var(--silver);">${p.xp.toLocaleString()}${nx?" / "+nx.min.toLocaleString():""}</span></div><div class="xp-track" style="margin-top:4px;"><div class="xp-fill" style="width:${pct}%;background:linear-gradient(90deg,${lv.col},var(--cyan));"></div></div></div>
  ${!adult?`<div style="font-size:10px;color:var(--silver);font-weight:700;letter-spacing:.1em;margin-bottom:8px;">MY POSITION</div><div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px;">${POSITIONS.map(pos=>`<button onclick="updatePos('${pos}')" style="padding:7px 14px;border-radius:99px;background:${p.position===pos?"var(--blue)":"transparent"};border:1.5px solid ${p.position===pos?"var(--blue)":"var(--border)"};color:${p.position===pos?"white":"var(--silver)"};font-weight:700;font-size:11px;cursor:pointer;font-family:inherit;">${pos}</button>`).join("")}</div>`:""}
  <div class="stats-row"><div class="stat-card"><div class="stat-label">TOTAL XP</div><div class="stat-val" style="font-size:17px;">${p.xp.toLocaleString()}</div></div><div class="stat-card"><div class="stat-label">${adult?"SESSIONS":"TOUCHES"}</div><div class="stat-val" style="font-size:17px;">${adult?p.sessions||0:(p.touches||0).toLocaleString()}</div></div><div class="stat-card"><div class="stat-label">STREAK</div><div class="stat-val" style="font-size:17px;">${p.streak||0}🔥</div></div></div>
  <div style="font-size:10px;color:var(--silver);font-weight:700;letter-spacing:.1em;margin:14px 0 9px;">DEVELOPMENT PATHWAY</div>
  <div class="card" style="margin-bottom:14px;">${lvArr.map((l,i)=>{const active=p.xp>=l.min&&p.xp<l.max,done=p.xp>=l.max;return`<div class="pathway-row"><div class="pathway-icon" style="${done||active?`background:${l.col}22;border-color:${l.col};`:"background:#131D30;"}">${l.icon}</div><div style="flex:1;"><div style="font-weight:800;font-size:12px;color:${active?l.col:done?"var(--white)":"var(--silver)"};">${l.name}</div><div style="font-size:9px;color:var(--silver);">${l.min.toLocaleString()}–${l.max===99999?"∞":l.max.toLocaleString()} XP</div></div>${done?`<span style="color:var(--green);font-size:14px;">✓</span>`:""}${active?`<span style="font-size:9px;color:${l.col};font-weight:800;">CURRENT</span>`:""}</div>`;}).join("")}</div>
  <div style="font-size:10px;color:var(--silver);font-weight:700;letter-spacing:.1em;margin-bottom:9px;">BADGES</div>
  <div class="badge-grid" style="margin-bottom:16px;">${badges.map(b=>`<div class="badge-card${b.earned?" earned":""}"><div class="badge-icon">${b.icon}</div><div class="badge-name">${b.name}</div></div>`).join("")}</div>
  <button class="btn-primary" style="background:linear-gradient(135deg,#1A2744,#0F1624);border:1px solid var(--border);margin-bottom:8px;" onclick="signOut()">SIGN OUT</button>`;
}

// ── ACTIONS ──
function switchAuth(m){S.authMode=m;render();}
function doRegister(){
  const name=document.getElementById("reg-name")?.value.trim(),email=document.getElementById("reg-email")?.value.trim().toLowerCase(),pass=document.getElementById("reg-pass")?.value,age=document.getElementById("reg-age")?.value,team=document.getElementById("reg-team")?.value.trim();
  if(!name||!email||!pass){showToast("Fill in all required fields","error");return;}
  if(S.players.find(p=>p.email===email)){showToast("Email already registered","error");return;}
  const player={name,email,pass,age:parseInt(age)||14,team:team||"Nona Soccer",accountType:S.registerType,position:S.registerPos,xp:0,touches:0,weeklyTouches:0,streak:0,sessions:0,wfSessions:0,shotTouches:0,dailyWins:[],totalCalls:0,totalLOIs:0,totalContent:0,recentSessions:[]};
  S.players.push(player);save();S.currentPlayer=player;S.screen="app";S.tab="home";S.chatMessages=[];render();showToast("Welcome! 🚀");
}
function doLogin(){
  const email=document.getElementById("login-email")?.value.trim().toLowerCase(),pass=document.getElementById("login-pass")?.value,player=S.players.find(p=>p.email===email&&p.pass===pass);
  if(!player){showToast("Invalid email or password","error");return;}
  S.currentPlayer=player;S.screen="app";S.tab="home";S.chatMessages=[];render();
}
function signOut(){S.currentPlayer=null;S.screen="login";S.chatMessages=[];render();}
function goTab(id){S.tab=id;if(id==="coach"&&S.chatMessages.length===0)initCoach();render();}
function updatePos(pos){S.currentPlayer.position=pos;const idx=S.players.findIndex(p=>p.email===S.currentPlayer.email);if(idx>=0)S.players[idx].position=pos;save();S.chatMessages=[];render();}

function addWin(){
  const input=document.getElementById("winInput")||document.getElementById("winInputLog");
  const text=(input?.value||S.winInput).trim();if(!text)return;
  const p=S.currentPlayer;p.dailyWins=[{text,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})},...(p.dailyWins||[])];
  p.xp+=50;const idx=S.players.findIndex(pl=>pl.email===p.email);if(idx>=0)S.players[idx]=p;
  save();S.winInput="";S.showWinInput=false;showToast("Win logged! +50 XP 🏆");render();
}

function saveLog(){
  const entries=Object.entries(S.logEntries).filter(([_,v])=>v.reps>0);
  if(!entries.length){showToast("Log at least one activity!","error");return;}
  let gainXP=0,gainTouches=0,wfDone=false,shotT=0;
  const today=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}),newSessions=[];
  entries.forEach(([id,v])=>{
    const drill=[...SOCCER_DRILLS,...STRENGTH_DRILLS].find(d=>d.id===id);
    const xp=Math.round(v.reps*v.sets*(drill?.xpPer||1.5)),t=S.logSubTab==="soccer"?v.reps*v.sets:0;
    gainXP+=xp;gainTouches+=t;if(v.wf)wfDone=true;if(id==="shooting")shotT+=t;
    newSessions.push({name:drill?.name||id,reps:v.reps,sets:v.sets,intensity:v.intensity,wf:v.wf||false,xp,touches:t,date:today});
  });
  const p=S.currentPlayer;
  p.xp+=gainXP;p.touches=(p.touches||0)+gainTouches;p.weeklyTouches=(p.weeklyTouches||0)+gainTouches;p.sessions=(p.sessions||0)+1;p.streak=(p.streak||0)+1;
  if(wfDone)p.wfSessions=(p.wfSessions||0)+1;p.shotTouches=(p.shotTouches||0)+shotT;
  p.recentSessions=[...newSessions,...(p.recentSessions||[])].slice(0,10);
  const idx=S.players.findIndex(pl=>pl.email===p.email);if(idx>=0)S.players[idx]=p;
  save();S.logEntries={};S.expandedDrill=null;showToast(`SAVED · +${gainXP} XP${gainTouches?" · +"+gainTouches+" TOUCHES":""}`);S.tab="home";render();
}

function saveAdultLog(){
  const entries=Object.entries(S.logEntries).filter(([_,v])=>v.reps>0);
  if(!entries.length){showToast("Log at least one activity!","error");return;}
  let gainXP=0;const today=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}),newSessions=[],bizToday={};
  entries.forEach(([id,v])=>{
    const w=ADULT_WORKOUTS.find(d=>d.id===id),b=BUSINESS_CATS.find(x=>x.id===id),h=ADULT_HABITS.find(x=>x.id===id);
    if(w){const xp=Math.round(v.reps*v.sets*w.xpPer);gainXP+=xp;newSessions.push({name:w.name,reps:v.reps,sets:v.sets,intensity:v.intensity,wf:false,xp,touches:0,date:today});}
    if(b){bizToday[id]=(bizToday[id]||0)+v.reps;gainXP+=v.reps*5;}
    if(h){gainXP+=v.reps*2;}
  });
  const p=S.currentPlayer;
  p.xp+=gainXP;p.sessions=(p.sessions||0)+1;p.streak=(p.streak||0)+1;p.todayBiz=bizToday;
  p.totalCalls=(p.totalCalls||0)+(S.logEntries["b_calls"]?.reps||0);
  p.totalLOIs=(p.totalLOIs||0)+(S.logEntries["b_loi"]?.reps||0);
  p.totalContent=(p.totalContent||0)+(S.logEntries["b_content"]?.reps||0);
  if(newSessions.length)p.recentSessions=[...newSessions,...(p.recentSessions||[])].slice(0,10);
  const idx=S.players.findIndex(pl=>pl.email===p.email);if(idx>=0)S.players[idx]=p;
  save();S.logEntries={};S.expandedDrill=null;showToast(`SAVED · +${gainXP} XP 🏆`);S.tab="home";render();
}

buildBg();render();requestAnimationFrame(tickAnims);
