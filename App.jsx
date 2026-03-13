import { useState, useRef } from "react";

/* ─── GLOBAL CSS ─────────────────────────────────────────────────── */
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --black:   #070707;
  --black2:  #0e0e0e;
  --black3:  #161616;
  --black4:  #1e1e1e;
  --gold:    #C8940A;
  --gold2:   #E8B84B;
  --gold3:   #F5D080;
  --goldDim: #7a5a06;
  --white:   #F5F0E8;
  --gray:    #888888;
  --gray2:   #555555;
  --gray3:   #333333;
  --green:   #4ade80;
  --red:     #f87171;
  --blue:    #60a5fa;
  --border:  rgba(200,148,10,0.15);
  --border2: rgba(200,148,10,0.3);
}

html, body { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; height: 100%; overflow: hidden; }
button { font-family: 'DM Sans', sans-serif; cursor: pointer; }
input, textarea, select { font-family: 'DM Sans', sans-serif; }
* { scrollbar-width: thin; scrollbar-color: var(--gold) transparent; }
*::-webkit-scrollbar { width: 4px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb { background: var(--goldDim); border-radius: 2px; }

.app { display: flex; height: 100vh; overflow: hidden; }

/* SIDEBAR */
.sidebar { width: 255px; min-width: 255px; background: var(--black2); border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden; }
.sidebar-logo { padding: 20px 18px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 11px; }
.logo-img { width: 38px; height: 38px; border-radius: 8px; background: var(--black3); border: 1px solid var(--border2); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; overflow: hidden; }
.logo-img img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; }
.logo-name { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; color: var(--gold2); line-height: 1.2; }
.logo-sub { font-size: 9px; letter-spacing: 2px; color: var(--gray); text-transform: uppercase; margin-top: 2px; }
.sidebar-user { padding: 13px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
.user-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--goldDim)); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--black); flex-shrink: 0; }
.user-name { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role { font-size: 10px; color: var(--gold); letter-spacing: 1px; text-transform: uppercase; }
.sidebar-nav { flex: 1; padding: 10px 8px; overflow-y: auto; }
.nav-label { font-size: 9px; letter-spacing: 3px; color: var(--gray2); text-transform: uppercase; padding: 8px 10px 5px; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 11px; border-radius: 8px; font-size: 13px; color: var(--gray); border: none; background: none; width: 100%; text-align: left; transition: all 0.2s; margin-bottom: 2px; }
.nav-item:hover { background: var(--black3); color: var(--white); }
.nav-item.active { background: rgba(200,148,10,0.1); color: var(--gold2); border: 1px solid var(--border); }
.nav-icon { font-size: 15px; width: 20px; text-align: center; flex-shrink: 0; }
.nav-badge { margin-left: auto; background: var(--gold); color: var(--black); font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px; }
.sidebar-footer { padding: 12px 18px; border-top: 1px solid var(--border); font-size: 10px; color: var(--gray2); text-align: center; line-height: 1.6; }

/* MAIN */
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.topbar { height: 54px; border-bottom: 1px solid var(--border); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; background: var(--black2); flex-shrink: 0; }
.topbar-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; }
.topbar-right { display: flex; align-items: center; gap: 8px; }
.page-content { flex: 1; overflow-y: auto; padding: 24px; }

/* CARDS */
.card { background: var(--black2); border: 1px solid var(--border); border-radius: 12px; padding: 18px; }
.card-gold { background: linear-gradient(135deg, rgba(200,148,10,0.08), rgba(200,148,10,0.03)); border-color: var(--border2); }

/* STATS */
.stats-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px; }
.stat-card { background: var(--black2); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; }
.stat-label { font-size: 10px; letter-spacing: 2px; color: var(--gray); text-transform: uppercase; margin-bottom: 6px; }
.stat-value { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; color: var(--gold2); line-height: 1; margin-bottom: 3px; }
.stat-sub { font-size: 11px; color: var(--gray2); }

/* TABLE */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; letter-spacing: 2px; color: var(--gray); text-transform: uppercase; padding: 9px 12px; text-align: left; border-bottom: 1px solid var(--border); }
.data-table td { padding: 11px 12px; border-bottom: 1px solid rgba(200,148,10,0.06); font-size: 13px; }
.data-table tr:hover td { background: var(--black3); }
.data-table tr:last-child td { border-bottom: none; }

/* BADGES */
.badge { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 100px; font-size: 10px; letter-spacing: 1px; font-weight: 600; text-transform: uppercase; }
.badge-gold  { background: rgba(200,148,10,0.12); color: var(--gold2);  border: 1px solid rgba(200,148,10,0.25); }
.badge-green { background: rgba(74,222,128,0.08); color: var(--green);  border: 1px solid rgba(74,222,128,0.2); }
.badge-red   { background: rgba(248,113,113,0.08);color: var(--red);    border: 1px solid rgba(248,113,113,0.2); }
.badge-gray  { background: rgba(136,136,136,0.1); color: var(--gray);   border: 1px solid rgba(136,136,136,0.15); }
.badge-blue  { background: rgba(96,165,250,0.08); color: var(--blue);   border: 1px solid rgba(96,165,250,0.2); }

/* BUTTONS */
.btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 8px; border: none; font-size: 13px; font-weight: 500; transition: all 0.2s; }
.btn-gold    { background: linear-gradient(135deg, var(--gold), #8a6200); color: var(--black); font-weight: 700; }
.btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,148,10,0.3); }
.btn-outline { background: none; border: 1px solid var(--border2); color: var(--gold2); }
.btn-outline:hover { background: rgba(200,148,10,0.08); }
.btn-ghost   { background: none; border: 1px solid var(--border); color: var(--gray); }
.btn-ghost:hover { color: var(--white); border-color: var(--border2); }
.btn-red     { background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.2); color: var(--red); }
.btn-sm      { padding: 5px 11px; font-size: 12px; }
.btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

/* FORMS */
.form-group  { margin-bottom: 16px; }
.form-label  { font-size: 11px; letter-spacing: 1px; color: var(--gray); text-transform: uppercase; margin-bottom: 7px; display: block; }
.form-input  { width: 100%; padding: 9px 13px; border-radius: 8px; border: 1px solid var(--border2); background: var(--black3); color: var(--white); font-size: 14px; outline: none; transition: border-color 0.2s; }
.form-input:focus { border-color: var(--gold); }
.form-select { width: 100%; padding: 9px 13px; border-radius: 8px; border: 1px solid var(--border2); background: var(--black3); color: var(--white); font-size: 14px; outline: none; }
.form-textarea { resize: vertical; min-height: 80px; }

/* TABS */
.tabs { display: flex; gap: 2px; border-bottom: 1px solid var(--border); margin-bottom: 20px; overflow-x: auto; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tab-btn { padding: 9px 16px; border: none; border-bottom: 2px solid transparent; background: none; color: var(--gray); font-size: 13px; cursor: pointer; margin-bottom: -1px; transition: all 0.2s; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.tab-btn:hover { color: var(--white); }
.tab-btn.active { color: var(--gold2); border-bottom-color: var(--gold); }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; animation: fadeIn 0.2s ease; }
.modal { background: var(--black2); border: 1px solid var(--border2); border-radius: 16px; padding: 26px; width: 100%; max-width: 500px; max-height: 88vh; overflow-y: auto; animation: slideUp 0.3s ease; }
.modal-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; margin-bottom: 5px; }
.modal-sub   { font-size: 13px; color: var(--gray); margin-bottom: 22px; }

/* PROGRESS */
.progress-bar  { height: 4px; background: var(--black4); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--gold2)); border-radius: 2px; transition: width 0.4s ease; }

/* GOAL CARDS */
.goal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 10px; }
.goal-card { padding: 16px; border-radius: 12px; border: 1.5px solid var(--border); background: var(--black3); cursor: pointer; transition: all 0.25s; text-align: left; position: relative; }
.goal-card:hover { border-color: var(--border2); transform: translateY(-2px); }
.goal-card.selected { border-color: var(--gold); background: rgba(200,148,10,0.06); box-shadow: 0 0 0 1px rgba(200,148,10,0.2); }
.goal-card.locked   { opacity: 0.4; cursor: not-allowed; transform: none !important; }
.goal-emoji  { font-size: 26px; margin-bottom: 9px; display: block; }
.goal-title  { font-size: 13px; font-weight: 600; color: var(--white); margin-bottom: 3px; line-height: 1.3; }
.goal-desc   { font-size: 11px; color: var(--gray); line-height: 1.5; }

/* VOCAB */
.vocab-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
.vocab-card { padding: 15px; border-radius: 10px; border: 1.5px solid var(--border); background: var(--black3); cursor: pointer; transition: all 0.2s; min-height: 85px; display: flex; flex-direction: column; justify-content: center; }
.vocab-card:hover { border-color: var(--border2); }
.vocab-card.flip  { border-color: var(--gold); background: rgba(200,148,10,0.06); }
.vocab-word  { font-size: 16px; font-weight: 600; margin-bottom: 3px; }
.vocab-hint  { font-size: 10px; color: var(--gray2); letter-spacing: 1px; }
.vocab-trans { font-size: 14px; color: var(--gold2); margin-bottom: 5px; font-weight: 500; }
.vocab-ex    { font-size: 11px; color: var(--gray); font-style: italic; line-height: 1.4; }

/* VERBS */
.verb-card   { padding: 16px 18px; border-radius: 10px; border: 1px solid var(--border); background: var(--black3); margin-bottom: 10px; }
.verb-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 10px; }
.verb-inf    { font-size: 19px; font-weight: 700; }
.verb-tr     { font-size: 13px; color: var(--gray); }
.verb-conj   { display: flex; gap: 22px; flex-wrap: wrap; }
.conj-lbl    { font-size: 9px; letter-spacing: 2px; color: var(--gray2); text-transform: uppercase; margin-bottom: 2px; }
.conj-val    { font-size: 14px; color: var(--gold3); }

/* STORIES */
.story-card  { border-radius: 12px; border: 1px solid var(--border); background: var(--black3); overflow: hidden; margin-bottom: 13px; }
.story-head  { padding: 12px 17px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 7px; }
.story-body  { padding: 16px 17px; }
.story-text  { font-size: 14px; line-height: 1.85; color: #c0b898; margin-bottom: 13px; }
.story-tr    { font-size: 13px; color: var(--gray); font-style: italic; line-height: 1.7; }

/* DIALOGUES */
.dl-title { font-size: 11px; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; margin-bottom: 13px; display: flex; align-items: center; gap: 8px; }
.dl-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.exchange    { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 9px; }
.exchange.r  { flex-direction: row-reverse; }
.av          { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
.av-a        { background: rgba(200,148,10,0.15); border: 1px solid rgba(200,148,10,0.25); }
.av-b        { background: rgba(96,165,250,0.1);  border: 1px solid rgba(96,165,250,0.2); }
.bw          { max-width: 65%; }
.bspk        { font-size: 9px; color: var(--gray2); letter-spacing: 1px; margin-bottom: 3px; }
.exchange.r .bspk { text-align: right; }
.bbl         { padding: 9px 12px; border-radius: 10px; border: 1px solid; }
.bb-a        { background: rgba(200,148,10,0.05); border-color: rgba(200,148,10,0.12); border-bottom-left-radius: 3px; }
.bb-b        { background: rgba(96,165,250,0.04);  border-color: rgba(96,165,250,0.1);  border-bottom-right-radius: 3px; }
.b-line      { font-size: 14px; color: var(--white); margin-bottom: 3px; line-height: 1.4; }
.b-tr        { font-size: 11px; color: var(--gray); font-style: italic; }

/* EXERCISES */
.ex-card     { padding: 17px 19px; border-radius: 10px; border: 1px solid var(--border); background: var(--black3); margin-bottom: 11px; transition: border-color 0.2s; }
.ex-card.ok  { border-color: rgba(74,222,128,0.35); }
.ex-card.no  { border-color: rgba(248,113,113,0.3); }
.ex-inp      { width: 100%; padding: 9px 12px; border-radius: 7px; border: 1px solid var(--border2); background: var(--black); color: var(--white); font-size: 14px; outline: none; transition: border-color 0.2s; }
.ex-inp:focus { border-color: var(--gold); }
.mc-opt      { width: 100%; padding: 9px 13px; border-radius: 7px; border: 1px solid var(--border); background: var(--black); color: var(--gray); font-size: 13px; text-align: left; margin-bottom: 6px; display: flex; align-items: center; gap: 9px; transition: all 0.15s; }
.mc-opt:hover:not(:disabled) { border-color: var(--border2); color: var(--white); }
.mc-opt.c-ok { border-color: rgba(74,222,128,0.4); color: var(--green); background: rgba(74,222,128,0.05); }
.mc-opt.c-no { border-color: rgba(248,113,113,0.3); color: var(--red);   background: rgba(248,113,113,0.04); }
.opt-l       { width: 19px; height: 19px; border-radius: 50%; border: 1px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 10px; flex-shrink: 0; opacity: 0.6; }

/* LOADING */
.load-wrap  { display: flex; flex-direction: column; align-items: center; padding: 60px 20px; gap: 14px; }
.load-ring  { width: 46px; height: 46px; border: 2px solid var(--black4); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.9s linear infinite; }
.ls         { font-size: 11px; letter-spacing: 2px; color: var(--gray2); text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
.ls.active  { color: var(--gold2); }
.ls.done    { color: var(--green); }

/* MISC */
.section-heading { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 10px; }
.section-title   { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; }
.section-sub     { font-size: 13px; color: var(--gray); margin-top: 2px; }
.sec-label       { font-size: 10px; letter-spacing: 3px; color: var(--gray2); text-transform: uppercase; margin-bottom: 12px; }
.divider         { height: 1px; background: var(--border); margin: 18px 0; }
.notif           { position: fixed; bottom: 22px; right: 22px; background: var(--black2); border: 1px solid var(--border2); border-radius: 10px; padding: 12px 16px; font-size: 13px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); z-index: 2000; animation: slideUp 0.3s ease; display: flex; align-items: center; gap: 9px; }

@keyframes spin    { to { transform: rotate(360deg); } }
@keyframes fadeIn  { from { opacity:0; transform:translateY(6px);  } to { opacity:1; transform:translateY(0); } }
@keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

@media (max-width: 700px) {
  .sidebar { width: 200px; min-width: 200px; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .goal-grid  { grid-template-columns: 1fr 1fr; }
  .vocab-grid { grid-template-columns: 1fr 1fr; }
}
`;

/* ─── DATA ──────────────────────────────────────────────────────── */
const LANGUAGES = [
  { code:"es", name:"Spanish",    flag:"🇪🇸" },
  { code:"fr", name:"French",     flag:"🇫🇷" },
  { code:"de", name:"German",     flag:"🇩🇪" },
  { code:"it", name:"Italian",    flag:"🇮🇹" },
  { code:"en", name:"English",    flag:"🇬🇧" },
];

const PRESET_GOALS = [
  { id:"restaurant", emoji:"🍽️", title:"Order at a Restaurant",  desc:"Menus, waiters & payments" },
  { id:"date",       emoji:"💌", title:"Ask Someone on a Date",   desc:"Compliments & invitations" },
  { id:"hotel",      emoji:"🏨", title:"Book a Hotel Room",       desc:"Reservations & check-in" },
  { id:"taxi",       emoji:"🚕", title:"Talk to a Taxi Driver",   desc:"Directions & small talk" },
  { id:"shopping",   emoji:"🛍️", title:"Shop at a Market",        desc:"Prices & negotiating" },
  { id:"doctor",     emoji:"🏥", title:"Visit a Doctor",          desc:"Symptoms & advice" },
  { id:"directions", emoji:"🗺️", title:"Ask for Directions",      desc:"Streets & navigation" },
  { id:"phone",      emoji:"📞", title:"Make a Phone Call",       desc:"Greetings & goodbyes" },
  { id:"airport",    emoji:"✈️", title:"Navigate the Airport",    desc:"Check-in, boarding & customs" },
  { id:"office",     emoji:"💼", title:"Talk in the Office",      desc:"Meetings & colleagues" },
  { id:"bank",       emoji:"🏦", title:"Visit a Bank",            desc:"Accounts & transfers" },
  { id:"custom",     emoji:"✨", title:"Custom Goal",             desc:"Describe your own situation" },
];

const LOAD_STEPS = ["Analyzing your goal","Generating vocabulary","Building verb tables","Writing stories","Crafting dialogues","Creating exercises"];

const MOCK_MEMBERS = [
  { id:1,  name:"Sofia Martinez",   email:"sofia@email.com",   lang:"es", goal:"restaurant", status:"active",   progress:72, joined:"Jan 3",  testBooked:true,  lastTest:"Pass" },
  { id:2,  name:"James Wilson",     email:"james@email.com",   lang:"fr", goal:"hotel",      status:"active",   progress:45, joined:"Jan 7",  testBooked:false, lastTest:"Pass" },
  { id:3,  name:"Priya Patel",      email:"priya@email.com",   lang:"de", goal:"taxi",       status:"active",   progress:88, joined:"Dec 28", testBooked:true,  lastTest:"Fail" },
  { id:4,  name:"Marco Rossi",      email:"marco@email.com",   lang:"it", goal:"doctor",     status:"inactive", progress:20, joined:"Jan 10", testBooked:false, lastTest:"—" },
  { id:5,  name:"Aisha Johnson",    email:"aisha@email.com",   lang:"es", goal:"shopping",   status:"active",   progress:60, joined:"Jan 1",  testBooked:true,  lastTest:"Pass" },
  { id:6,  name:"Chen Wei",         email:"chen@email.com",    lang:"en", goal:"office",     status:"active",   progress:35, joined:"Jan 12", testBooked:false, lastTest:"—" },
  { id:7,  name:"Fatima Al-Rashid", email:"fatima@email.com",  lang:"fr", goal:"airport",    status:"active",   progress:91, joined:"Dec 20", testBooked:true,  lastTest:"Pass" },
  { id:8,  name:"Luca Bianchi",     email:"luca@email.com",    lang:"it", goal:"date",       status:"active",   progress:55, joined:"Jan 5",  testBooked:false, lastTest:"Pass" },
];

const MOCK_TUTORS = [
  { id:1, name:"Isabella Torres", lang:"es", tests:12, available:true,  rating:4.9 },
  { id:2, name:"Pierre Dubois",   lang:"fr", tests:8,  available:true,  rating:4.8 },
  { id:3, name:"Klaus Weber",     lang:"de", tests:5,  available:false, rating:4.7 },
  { id:4, name:"Giulia Ferrari",  lang:"it", tests:9,  available:true,  rating:5.0 },
];

const CORE_VOCAB = {
  people:   [{w:"el amigo",    t:"friend"},{w:"la familia",  t:"family"},{w:"el jefe",     t:"boss"},{w:"el vecino",  t:"neighbor"},{w:"la pareja",   t:"partner"}],
  food:     [{w:"el desayuno", t:"breakfast"},{w:"la cena",  t:"dinner"},{w:"la bebida",   t:"drink"},{w:"el postre",  t:"dessert"},{w:"la fruta",    t:"fruit"}],
  travel:   [{w:"el vuelo",    t:"flight"},{w:"el pasaporte",t:"passport"},{w:"la maleta", t:"suitcase"},{w:"el boleto", t:"ticket"},{w:"el mapa",    t:"map"}],
  work:     [{w:"la reunión",  t:"meeting"},{w:"el proyecto",t:"project"},{w:"el contrato",t:"contract"},{w:"la empresa",t:"company"},{w:"el sueldo",  t:"salary"}],
  emotions: [{w:"feliz",       t:"happy"},{w:"nervioso",    t:"nervous"},{w:"emocionado",  t:"excited"},{w:"cansado",   t:"tired"},{w:"tranquilo",   t:"calm"}],
};

const TOP_VERBS = [
  {v:"ser",    t:"to be (permanent)", yo:"soy",    tu:"eres",    el:"es"},
  {v:"estar",  t:"to be (temporary)", yo:"estoy",  tu:"estás",   el:"está"},
  {v:"tener",  t:"to have",           yo:"tengo",  tu:"tienes",  el:"tiene"},
  {v:"ir",     t:"to go",             yo:"voy",    tu:"vas",     el:"va"},
  {v:"querer", t:"to want",           yo:"quiero", tu:"quieres", el:"quiere"},
  {v:"poder",  t:"can / to be able",  yo:"puedo",  tu:"puedes",  el:"puede"},
  {v:"hacer",  t:"to do / make",      yo:"hago",   tu:"haces",   el:"hace"},
  {v:"decir",  t:"to say / tell",     yo:"digo",   tu:"dices",   el:"dice"},
];

const getLang = (code) => LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
const getGoal = (id)   => PRESET_GOALS.find(g => g.id === id);

/* ─── ROOT ──────────────────────────────────────────────────────── */
export default function App() {
  const [role,    setRole]    = useState(null);
  const [page,    setPage]    = useState("dashboard");
  const [notif,   setNotif]   = useState(null);
  const [modal,   setModal]   = useState(null);
  const [members, setMembers] = useState(MOCK_MEMBERS);

  /* student state */
  const [sLang,    setSLang]    = useState("es");
  const [sGoal,    setSGoal]    = useState(null);
  const [customTxt,setCustomTxt]= useState("");
  const [content,  setContent]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [loadStep, setLoadStep] = useState(-1);
  const [cTab,     setCTab]     = useState("vocabulary");
  const [flipped,  setFlipped]  = useState({});
  const [answers,  setAnswers]  = useState({});
  const [checked,  setChecked]  = useState({});
  const [coreTab,  setCoreTab]  = useState("vocab");
  const [coreFlip, setCoreFlip] = useState({});
  const [tBooked,  setTBooked]  = useState(false);
  const timer = useRef(null);

  const notify = (msg, icon="✦") => { setNotif({msg,icon}); setTimeout(()=>setNotif(null),3000); };

  const generate = async () => {
    const goalObj = getGoal(sGoal);
    const langObj = getLang(sLang);
    const goalText = sGoal==="custom" ? customTxt : goalObj?.title;
    if (!goalText) return;
    setLoading(true); setContent(null); setLoadStep(0);
    setFlipped({}); setAnswers({}); setChecked({});
    let s=0;
    timer.current = setInterval(()=>{ s++; if(s<LOAD_STEPS.length) setLoadStep(s); },800);

    const prompt = `Generate language learning content as JSON only. No markdown, no backticks, ONLY the raw JSON object.
Goal: "${goalText}"
Target Language: ${langObj.name}
Native Language: English
Return this exact structure:
{"vocabulary":[{"word":"...","translation":"...","example":"..."}],"verbs":[{"verb":"...","translation":"...","yo":"...","tu":"...","el":"..."}],"stories":[{"title":"...","tense":"Present|Past|Future","perspective":"First person|Third person","text":"4-6 sentences in target language","translation":"English translation"}],"dialogues":[{"title":"...","exchanges":[{"speaker":"Role name","line":"line in target language","translation":"English"}]}],"exercises":[{"type":"fill-in-the-blank","sentence":"sentence with ___","answer":"correct word","hint":"English hint"},{"type":"multiple-choice","question":"question in English","options":["A","B","C","D"],"correct":0}]}
Generate: 10 vocabulary, 6 verbs, 3 stories (vary tenses and perspectives), 2 dialogues (7 exchanges each), 8 exercises (mix types). Return ONLY the JSON object.`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const parsed = JSON.parse(data.text.replace(/```json|```/g, "").trim());
      clearInterval(timer.current);
      setLoadStep(LOAD_STEPS.length);
      setTimeout(()=>{ setContent(parsed); setLoading(false); notify("Lesson plan ready!"); },350);
    } catch(err) {
      clearInterval(timer.current);
      setLoading(false);
      notify("Generation failed — " + (err.message || "please try again"), "⚠");
    }
  };

  const checkEx = (i,ex,val) => {
    const ok = ex.type==="multiple-choice"
      ? parseInt(val)===ex.correct
      : val?.toLowerCase().trim()===ex.answer?.toLowerCase().trim();
    setChecked(p=>({...p,[i]:ok}));
  };

  if (!role) return <RoleSelect onSelect={r=>{ setRole(r); setPage("dashboard"); }} />;

  const NAV = role==="admin" ? [
    {id:"dashboard",label:"Dashboard",  icon:"📊"},
    {id:"members",  label:"Members",    icon:"👥", badge:members.length},
    {id:"tutors",   label:"Tutors",     icon:"🎓"},
    {id:"schedule", label:"Schedule",   icon:"📅"},
    {id:"content",  label:"Content",    icon:"📚"},
    {id:"settings", label:"Settings",   icon:"⚙️"},
  ] : role==="tutor" ? [
    {id:"dashboard",label:"Dashboard",  icon:"📊"},
    {id:"tests",    label:"My Tests",   icon:"📅"},
    {id:"students", label:"Students",   icon:"👥"},
    {id:"scripts",  label:"Scripts",    icon:"📝"},
  ] : [
    {id:"dashboard",label:"Dashboard",  icon:"📊"},
    {id:"goals",    label:"My Goal",    icon:"🎯"},
    {id:"learn",    label:"Learn",      icon:"📚"},
    {id:"core",     label:"Core Library",icon:"🏛️"},
    {id:"test",     label:"Book Test",  icon:"📅"},
    {id:"progress", label:"Progress",   icon:"📈"},
  ];

  const userName = role==="admin"?"Admin":role==="tutor"?"Isabella Torres":"Sofia Martinez";
  const langObj  = getLang(sLang);

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-img">🌐</div>
            <div>
              <div className="logo-name">Artificial Immersion</div>
              <div className="logo-sub">GoluremiLanguages.com</div>
            </div>
          </div>
          <div className="sidebar-user">
            <div className="user-avatar">{userName[0]}</div>
            <div style={{flex:1,minWidth:0}}>
              <div className="user-name">{userName}</div>
              <div className="user-role">{role}</div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-label">Navigation</div>
            {NAV.map(n=>(
              <button key={n.id} className={`nav-item${page===n.id?" active":""}`} onClick={()=>setPage(n.id)}>
                <span className="nav-icon">{n.icon}</span>{n.label}
                {n.badge&&<span className="nav-badge">{n.badge}</span>}
              </button>
            ))}
            <div style={{marginTop:14}}>
              <div className="nav-label">Account</div>
              <button className="nav-item" onClick={()=>setRole(null)}>
                <span className="nav-icon">🚪</span>Switch Role
              </button>
            </div>
          </nav>
          <div className="sidebar-footer">Artificial Immersion<br/>© 2025 GoluremiLanguages.com</div>
        </aside>

        {/* MAIN */}
        <main className="main">
          <div className="topbar">
            <span className="topbar-title">{NAV.find(n=>n.id===page)?.label||"Dashboard"}</span>
            <div className="topbar-right">
              {role==="student"&&(
                <select className="form-select" style={{width:"auto",padding:"5px 10px",fontSize:13}}
                  value={sLang} onChange={e=>{setSLang(e.target.value);setContent(null);setSGoal(null);}}>
                  {LANGUAGES.map(l=><option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
                </select>
              )}
            </div>
          </div>

          <div className="page-content">
            {role==="admin"&&page==="dashboard" &&<AdminDash  members={members} onNav={setPage}/>}
            {role==="admin"&&page==="members"   &&<MembersPage members={members} setMembers={setMembers} notify={notify} setModal={setModal}/>}
            {role==="admin"&&page==="tutors"    &&<TutorsPage  tutors={MOCK_TUTORS} notify={notify}/>}
            {role==="admin"&&page==="schedule"  &&<SchedulePage members={members} notify={notify}/>}
            {role==="admin"&&page==="content"   &&<ContentPage notify={notify}/>}
            {role==="admin"&&page==="settings"  &&<SettingsPage notify={notify}/>}

            {role==="tutor"&&page==="dashboard" &&<TutorDash   members={members} notify={notify}/>}
            {role==="tutor"&&page==="tests"     &&<TutorTests  members={members} setMembers={setMembers} notify={notify}/>}
            {role==="tutor"&&page==="students"  &&<TutorStudents members={members}/>}
            {role==="tutor"&&page==="scripts"   &&<TutorScripts/>}

            {role==="student"&&page==="dashboard"&&<StudentDash lang={langObj} goal={sGoal?getGoal(sGoal):null} content={content} tBooked={tBooked} onNav={setPage}/>}
            {role==="student"&&page==="goals"   &&<GoalsPage   lang={langObj} selected={sGoal} customTxt={customTxt} setCustomTxt={setCustomTxt}
                onSelect={g=>{setSGoal(g);setContent(null);setFlipped({});setAnswers({});setChecked({});notify("Goal selected! Go to Learn.");}}/>}
            {role==="student"&&page==="learn"   &&<LearnPage   goal={sGoal} goalObj={getGoal(sGoal)} lang={langObj} customTxt={customTxt}
                content={content} loading={loading} loadStep={loadStep}
                cTab={cTab} setCTab={setCTab} flipped={flipped} setFlipped={setFlipped}
                answers={answers} setAnswers={setAnswers} checked={checked} checkEx={checkEx}
                onGenerate={generate} onNav={setPage}/>}
            {role==="student"&&page==="core"    &&<CoreLibrary coreTab={coreTab} setCoreTab={setCoreTab} coreFlip={coreFlip} setCoreFlip={setCoreFlip} lang={langObj}/>}
            {role==="student"&&page==="test"    &&<TestBooking lang={langObj} goal={sGoal?getGoal(sGoal):null} tBooked={tBooked} setTBooked={setTBooked} notify={notify}/>}
            {role==="student"&&page==="progress"&&<ProgressPage lang={langObj} goal={sGoal?getGoal(sGoal):null} content={content} checked={checked}/>}
          </div>
        </main>
      </div>

      {modal&&(
        <div className="modal-overlay" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            {modal.type==="member"    &&<MemberModal    member={modal.data} members={members} setMembers={setMembers} onClose={()=>setModal(null)} notify={notify}/>}
            {modal.type==="add-member"&&<AddMemberModal members={members} setMembers={setMembers} onClose={()=>setModal(null)} notify={notify}/>}
          </div>
        </div>
      )}
      {notif&&<div className="notif"><span>{notif.icon}</span>{notif.msg}</div>}
    </>
  );
}

/* ─── ROLE SELECT ───────────────────────────────────────────────── */
function RoleSelect({onSelect}){
  return(
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",background:"var(--black)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <div style={{fontSize:52,marginBottom:16}}>🌐</div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(30px,5vw,50px)",fontWeight:700,color:"var(--gold2)",marginBottom:6}}>Artificial Immersion</h1>
          <p style={{color:"var(--gray)",fontSize:13,letterSpacing:2}}>by GoluremiLanguages.com</p>
        </div>
        <p style={{color:"var(--gray)",fontSize:11,letterSpacing:3,textTransform:"uppercase",marginBottom:22}}>Select your role to continue</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,width:"100%",maxWidth:660}}>
          {[
            {role:"student",emoji:"📚",title:"Student", desc:"Access lessons, goals & tests"},
            {role:"tutor",  emoji:"🎓",title:"Tutor",   desc:"Manage tests & student calls"},
            {role:"admin",  emoji:"⚙️",title:"Admin",   desc:"Full platform management"},
          ].map(r=>(
            <button key={r.role} onClick={()=>onSelect(r.role)}
              style={{padding:"26px 18px",borderRadius:14,border:"1.5px solid var(--border)",background:"var(--black2)",cursor:"pointer",transition:"all 0.25s",textAlign:"center"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{fontSize:34,marginBottom:10}}>{r.emoji}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:600,color:"var(--white)",marginBottom:5}}>{r.title}</div>
              <div style={{fontSize:12,color:"var(--gray)",lineHeight:1.5}}>{r.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── ADMIN DASHBOARD ───────────────────────────────────────────── */
function AdminDash({members,onNav}){
  const active=members.filter(m=>m.status==="active").length;
  const booked=members.filter(m=>m.testBooked).length;
  const passed=members.filter(m=>m.lastTest==="Pass").length;
  const tested=members.filter(m=>m.lastTest!=="—").length;
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading">
        <div><div className="section-title">Platform Overview</div><div className="section-sub">All members, languages and test activity</div></div>
        <button className="btn btn-gold" onClick={()=>onNav("members")}>+ Add Member</button>
      </div>
      <div className="stats-row">
        {[
          {label:"Total Members",   value:members.length,sub:`${active} active`},
          {label:"Tests Booked",    value:booked,        sub:"this month"},
          {label:"Pass Rate",       value:`${Math.round(passed/Math.max(tested,1)*100)}%`,sub:"last cycle"},
          {label:"Languages",       value:[...new Set(members.map(m=>m.lang))].length,sub:"of 5 available"},
        ].map((s,i)=>(
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div className="card">
          <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:13}}>Recent Members</div>
          {members.slice(0,5).map(m=>(
            <div key={m.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--goldDim))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"var(--black)",flexShrink:0}}>{m.name[0]}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13}}>{m.name}</div>
                <div style={{fontSize:11,color:"var(--gray)"}}>{getLang(m.lang).flag} {getLang(m.lang).name}</div>
              </div>
              <span className={`badge ${m.status==="active"?"badge-green":"badge-gray"}`}>{m.status}</span>
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" style={{marginTop:11,width:"100%"}} onClick={()=>onNav("members")}>View All →</button>
        </div>
        <div className="card">
          <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:13}}>Language Breakdown</div>
          {LANGUAGES.map(l=>{
            const count=members.filter(m=>m.lang===l.code).length;
            const pct=Math.round(count/members.length*100);
            return(
              <div key={l.code} style={{marginBottom:13}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5}}>
                  <span>{l.flag} {l.name}</span>
                  <span style={{color:"var(--gold2)",fontWeight:600}}>{count}</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`}}/></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── MEMBERS PAGE ──────────────────────────────────────────────── */
function MembersPage({members,setMembers,notify,setModal}){
  const [search,setSearch]=useState("");
  const [filterS,setFilterS]=useState("all");
  const [filterL,setFilterL]=useState("all");
  const filtered=members.filter(m=>{
    const q=m.name.toLowerCase().includes(search.toLowerCase())||m.email.toLowerCase().includes(search.toLowerCase());
    const s=filterS==="all"||m.status===filterS;
    const l=filterL==="all"||m.lang===filterL;
    return q&&s&&l;
  });
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading">
        <div><div className="section-title">Members</div><div className="section-sub">{members.length} total enrolled</div></div>
        <button className="btn btn-gold" onClick={()=>setModal({type:"add-member"})}>+ Add Member</button>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <input className="form-input" style={{flex:1,minWidth:180}} placeholder="Search name or email…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <select className="form-select" style={{width:"auto"}} value={filterS} onChange={e=>setFilterS(e.target.value)}>
          <option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
        </select>
        <select className="form-select" style={{width:"auto"}} value={filterL} onChange={e=>setFilterL(e.target.value)}>
          <option value="all">All Languages</option>
          {LANGUAGES.map(l=><option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
        </select>
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="data-table">
          <thead><tr><th>Member</th><th>Language</th><th>Goal</th><th>Progress</th><th>Test</th><th>Last Result</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(m=>(
              <tr key={m.id}>
                <td>
                  <div style={{display:"flex",alignItems:"center",gap:9}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--goldDim))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"var(--black)",flexShrink:0}}>{m.name[0]}</div>
                    <div><div style={{fontSize:13,fontWeight:500}}>{m.name}</div><div style={{fontSize:11,color:"var(--gray)"}}>{m.email}</div></div>
                  </div>
                </td>
                <td>{getLang(m.lang).flag} {getLang(m.lang).name}</td>
                <td style={{fontSize:12}}>{getGoal(m.goal)?.emoji} {getGoal(m.goal)?.title||m.goal}</td>
                <td>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <div className="progress-bar" style={{width:65}}><div className="progress-fill" style={{width:`${m.progress}%`}}/></div>
                    <span style={{fontSize:12,color:"var(--gold2)"}}>{m.progress}%</span>
                  </div>
                </td>
                <td><span className={`badge ${m.testBooked?"badge-green":"badge-gray"}`}>{m.testBooked?"Booked":"Pending"}</span></td>
                <td><span className={`badge ${m.lastTest==="Pass"?"badge-green":m.lastTest==="Fail"?"badge-red":"badge-gray"}`}>{m.lastTest}</span></td>
                <td>
                  <div style={{display:"flex",gap:5}}>
                    <button className="btn btn-outline btn-sm" onClick={()=>setModal({type:"member",data:m})}>Edit</button>
                    <button className="btn btn-red btn-sm" onClick={()=>{setMembers(p=>p.filter(x=>x.id!==m.id));notify(`${m.name} removed`);}}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0&&<div style={{padding:40,textAlign:"center",color:"var(--gray)"}}>No members found</div>}
      </div>
    </div>
  );
}

function MemberModal({member,members,setMembers,onClose,notify}){
  const [form,setForm]=useState({...member});
  const save=()=>{setMembers(p=>p.map(m=>m.id===member.id?form:m));notify("Member updated");onClose();};
  return(
    <>
      <div className="modal-title">{member.name}</div>
      <div className="modal-sub">Edit member details and test result</div>
      <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></div>
      <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div className="form-group"><label className="form-label">Language</label>
          <select className="form-select" value={form.lang} onChange={e=>setForm(p=>({...p,lang:e.target.value}))}>
            {LANGUAGES.map(l=><option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
          </select>
        </div>
        <div className="form-group"><label className="form-label">Status</label>
          <select className="form-select" value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}>
            <option value="active">Active</option><option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div className="form-group"><label className="form-label">Last Test</label>
          <select className="form-select" value={form.lastTest} onChange={e=>setForm(p=>({...p,lastTest:e.target.value}))}>
            <option value="—">—</option><option value="Pass">Pass</option><option value="Fail">Fail</option>
          </select>
        </div>
        <div className="form-group"><label className="form-label">Goal</label>
          <select className="form-select" value={form.goal} onChange={e=>setForm(p=>({...p,goal:e.target.value}))}>
            {PRESET_GOALS.filter(g=>g.id!=="custom").map(g=><option key={g.id} value={g.id}>{g.emoji} {g.title}</option>)}
          </select>
        </div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn btn-gold" style={{flex:1}} onClick={save}>Save</button>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
      </div>
    </>
  );
}

function AddMemberModal({members,setMembers,onClose,notify}){
  const [form,setForm]=useState({name:"",email:"",lang:"es",goal:"restaurant",status:"active"});
  const add=()=>{
    if(!form.name||!form.email)return;
    setMembers(p=>[...p,{...form,id:Date.now(),progress:0,joined:"Today",testBooked:false,lastTest:"—"}]);
    notify(`${form.name} added`);onClose();
  };
  return(
    <>
      <div className="modal-title">Add New Member</div>
      <div className="modal-sub">Manually enroll a student</div>
      <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="John Smith" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></div>
      <div className="form-group"><label className="form-label">Email</label><input className="form-input" placeholder="john@email.com" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div className="form-group"><label className="form-label">Language</label>
          <select className="form-select" value={form.lang} onChange={e=>setForm(p=>({...p,lang:e.target.value}))}>
            {LANGUAGES.map(l=><option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
          </select>
        </div>
        <div className="form-group"><label className="form-label">Goal</label>
          <select className="form-select" value={form.goal} onChange={e=>setForm(p=>({...p,goal:e.target.value}))}>
            {PRESET_GOALS.filter(g=>g.id!=="custom").map(g=><option key={g.id} value={g.id}>{g.emoji} {g.title}</option>)}
          </select>
        </div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn btn-gold" style={{flex:1}} onClick={add}>Add Member</button>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
      </div>
    </>
  );
}

/* ─── TUTORS ────────────────────────────────────────────────────── */
function TutorsPage({tutors,notify}){
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading">
        <div><div className="section-title">Tutors</div><div className="section-sub">Manage your tutor team</div></div>
        <button className="btn btn-gold" onClick={()=>notify("Add tutor coming soon")}>+ Add Tutor</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:13}}>
        {tutors.map(t=>(
          <div key={t.id} className="card card-gold">
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--goldDim))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:"var(--black)"}}>{t.name[0]}</div>
              <div><div style={{fontWeight:600,fontSize:14}}>{t.name}</div><div style={{fontSize:12,color:"var(--gray)"}}>{getLang(t.lang).flag} {getLang(t.lang).name}</div></div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:10}}>
              <span style={{color:"var(--gray)"}}>Tests this month</span><span style={{color:"var(--gold2)",fontWeight:700}}>{t.tests}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:14}}>
              <span style={{color:"var(--gray)"}}>Rating</span><span style={{color:"var(--gold2)",fontWeight:700}}>⭐ {t.rating}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span className={`badge ${t.available?"badge-green":"badge-red"}`}>{t.available?"Available":"Busy"}</span>
              <button className="btn btn-outline btn-sm" onClick={()=>notify(`Contacting ${t.name}…`)}>Contact</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SCHEDULE ──────────────────────────────────────────────────── */
function SchedulePage({members,notify}){
  const booked=members.filter(m=>m.testBooked);
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading">
        <div><div className="section-title">Test Schedule</div><div className="section-sub">Monthly test day — January 31st</div></div>
        <button className="btn btn-gold" onClick={()=>notify("Schedule exported!")}>Export</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div className="card">
          <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:14}}>January 2025</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:7}}>
            {["M","T","W","T","F","S","S"].map((d,i)=><div key={i} style={{fontSize:10,color:"var(--gray)",textAlign:"center"}}>{d}</div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
            {Array.from({length:2},(_,i)=><div key={`e${i}`}/>)}
            {Array.from({length:31},(_,i)=>i+1).map(d=>(
              <div key={d} style={{aspectRatio:"1",borderRadius:5,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:10,border:"1px solid",borderColor:d===31?"var(--gold)":"var(--border)",background:d===31?"rgba(200,148,10,0.12)":d<13?"rgba(255,255,255,0.01)":"var(--black3)",color:d===31?"var(--gold2)":d<13?"var(--gray2)":"var(--white)",fontWeight:d===31?700:400}}>
                {d}{d===31&&<div style={{width:3,height:3,borderRadius:"50%",background:"var(--gold)",marginTop:1}}/>}
              </div>
            ))}
          </div>
          <div style={{marginTop:11,padding:9,borderRadius:8,background:"rgba(200,148,10,0.08)",border:"1px solid var(--border2)",fontSize:12,color:"var(--gold2)"}}>
            ✦ Test Day: Jan 31st — {booked.length} booked
          </div>
        </div>
        <div className="card">
          <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:13}}>Booked Tests</div>
          {booked.map((m,i)=>(
            <div key={m.id} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 0",borderBottom:"1px solid var(--border)"}}>
              <div style={{fontSize:11,color:"var(--gray)",width:38}}>{9+Math.floor(i/4)}:{String((i%4)*15).padStart(2,"0")}</div>
              <div style={{flex:1}}><div style={{fontSize:13}}>{m.name}</div><div style={{fontSize:11,color:"var(--gray)"}}>{getLang(m.lang).flag} {getGoal(m.goal)?.title}</div></div>
              <button className="btn btn-outline btn-sm" onClick={()=>notify("Link sent!")}>Send Link</button>
            </div>
          ))}
          {booked.length===0&&<div style={{color:"var(--gray)",fontSize:13}}>No tests booked yet</div>}
        </div>
      </div>
    </div>
  );
}

/* ─── CONTENT & SETTINGS ────────────────────────────────────────── */
function ContentPage({notify}){
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading">
        <div><div className="section-title">Content Manager</div><div className="section-sub">Manage lessons across all languages</div></div>
        <button className="btn btn-gold" onClick={()=>notify("AI generating…")}>+ AI Generate</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:13}}>
        {LANGUAGES.map(l=>(
          <div key={l.code} className="card card-gold">
            <div style={{fontSize:28,marginBottom:9}}>{l.flag}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:600,marginBottom:5}}>{l.name}</div>
            <div style={{fontSize:12,color:"var(--gray)",marginBottom:13}}>{PRESET_GOALS.filter(g=>g.id!=="custom").length} goals</div>
            <div style={{display:"flex",gap:7}}>
              <button className="btn btn-outline btn-sm" onClick={()=>notify(`Opening ${l.name}…`)}>Manage</button>
              <button className="btn btn-ghost btn-sm" onClick={()=>notify(`Generating ${l.name}…`)}>AI Generate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({notify}){
  const [s,setS]=useState({name:"Artificial Immersion",testDay:"31",maxTests:"4",apiKey:""});
  return(
    <div style={{animation:"fadeIn .4s ease",maxWidth:580}}>
      <div className="section-heading"><div><div className="section-title">Settings</div><div className="section-sub">Platform configuration</div></div></div>
      <div className="card" style={{marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:14}}>General</div>
        <div className="form-group"><label className="form-label">Platform Name</label><input className="form-input" value={s.name} onChange={e=>setS(p=>({...p,name:e.target.value}))}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div className="form-group"><label className="form-label">Test Day</label><input className="form-input" type="number" min="1" max="31" value={s.testDay} onChange={e=>setS(p=>({...p,testDay:e.target.value}))}/></div>
          <div className="form-group"><label className="form-label">Max Tests/Hour</label><input className="form-input" type="number" min="1" max="10" value={s.maxTests} onChange={e=>setS(p=>({...p,maxTests:e.target.value}))}/></div>
        </div>
      </div>
      <div className="card" style={{marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:14}}>API Keys</div>
        <div className="form-group"><label className="form-label">OpenAI API Key</label><input className="form-input" type="password" placeholder="sk-…" value={s.apiKey} onChange={e=>setS(p=>({...p,apiKey:e.target.value}))}/></div>
        <div style={{fontSize:12,color:"var(--gray)",marginTop:-8}}>Used for AI lesson content generation (OpenAI GPT-4o-mini)</div>
      </div>
      <button className="btn btn-gold" onClick={()=>notify("Settings saved!")}>Save Settings</button>
    </div>
  );
}

/* ─── TUTOR PAGES ───────────────────────────────────────────────── */
function TutorDash({members,notify}){
  const booked=members.filter(m=>m.testBooked);
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading"><div><div className="section-title">Welcome, Isabella</div><div className="section-sub">Your test schedule</div></div></div>
      <div className="stats-row">
        {[
          {label:"Tests This Month",value:booked.length,sub:"students booked"},
          {label:"Hours Required",  value:`${Math.ceil(booked.length/4)}h`,sub:"on test day"},
          {label:"My Language",     value:"🇪🇸",sub:"Spanish"},
          {label:"Test Day",        value:"31st",sub:"January 2025"},
        ].map((s,i)=>(
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{fontSize:28}}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:13}}>Today's Prep</div>
        {["Review test script for current goal","Confirm all Zoom links are working","Check student progress levels","Prepare feedback notes"].map((t,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
            <div style={{width:18,height:18,borderRadius:"50%",border:"1px solid var(--border2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"var(--gold)"}}>○</div>
            <span style={{fontSize:13}}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TutorTests({members,setMembers,notify}){
  const booked=members.filter(m=>m.testBooked);
  const mark=(id,result)=>{ setMembers(p=>p.map(m=>m.id===id?{...m,lastTest:result,testBooked:false}:m)); notify(`Marked as ${result}!`); };
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading"><div><div className="section-title">Test Sessions</div><div className="section-sub">{booked.length} students scheduled</div></div></div>
      {booked.length===0&&<div className="card" style={{textAlign:"center",padding:44,color:"var(--gray)"}}>No tests booked yet</div>}
      {booked.map((m,i)=>(
        <div key={m.id} className="card" style={{marginBottom:11}}>
          <div style={{display:"flex",alignItems:"center",gap:13,flexWrap:"wrap"}}>
            <div style={{fontSize:12,color:"var(--gray)",width:46}}>{9+Math.floor(i/4)}:{String((i%4)*15).padStart(2,"0")}</div>
            <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--goldDim))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"var(--black)"}}>{m.name[0]}</div>
            <div style={{flex:1}}><div style={{fontWeight:600}}>{m.name}</div><div style={{fontSize:12,color:"var(--gray)"}}>{getLang(m.lang).flag} {getGoal(m.goal)?.title} · {m.progress}%</div></div>
            <div style={{display:"flex",gap:7}}>
              <button className="btn btn-outline btn-sm" onClick={()=>notify("Opening Zoom…")}>Join Call</button>
              <button className="btn btn-sm" style={{background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.3)",color:"var(--green)"}} onClick={()=>mark(m.id,"Pass")}>✓ Pass</button>
              <button className="btn btn-sm" style={{background:"rgba(248,113,113,0.1)",border:"1px solid rgba(248,113,113,0.2)",color:"var(--red)"}} onClick={()=>mark(m.id,"Fail")}>✗ Fail</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TutorStudents({members}){
  const mine=members.filter(m=>m.lang==="es");
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading"><div><div className="section-title">My Students</div><div className="section-sub">Spanish learners</div></div></div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="data-table">
          <thead><tr><th>Student</th><th>Goal</th><th>Progress</th><th>Test</th><th>Last</th></tr></thead>
          <tbody>
            {mine.map(m=>(
              <tr key={m.id}>
                <td><div style={{fontWeight:500}}>{m.name}</div><div style={{fontSize:11,color:"var(--gray)"}}>{m.email}</div></td>
                <td>{getGoal(m.goal)?.emoji} {getGoal(m.goal)?.title}</td>
                <td><div style={{display:"flex",alignItems:"center",gap:7}}><div className="progress-bar" style={{width:55}}><div className="progress-fill" style={{width:`${m.progress}%`}}/></div><span style={{fontSize:12,color:"var(--gold2)"}}>{m.progress}%</span></div></td>
                <td><span className={`badge ${m.testBooked?"badge-green":"badge-gray"}`}>{m.testBooked?"Booked":"Pending"}</span></td>
                <td><span className={`badge ${m.lastTest==="Pass"?"badge-green":m.lastTest==="Fail"?"badge-red":"badge-gray"}`}>{m.lastTest}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TutorScripts(){
  const [sel,setSel]=useState("restaurant");
  const scripts={
    restaurant:{open:"¡Buenas noches! Bienvenido al restaurante. ¿Tiene reserva?",follow:["¿Qué le gustaría ordenar?","¿Algo de beber?","¿Les traigo la cuenta?"],pass:"Student understands and orders in Spanish.",fail:"Student only responds in English."},
    hotel:{open:"¡Buenas tardes! Bienvenido al hotel. ¿Tiene reserva?",follow:["¿Cuántas noches?","¿Individual o doble?","Aquí tiene su llave."],pass:"Student completes check-in in Spanish.",fail:"Cannot state name or dates in Spanish."},
  };
  const s=scripts[sel]||scripts.restaurant;
  return(
    <div style={{animation:"fadeIn .4s ease",maxWidth:680}}>
      <div className="section-heading"><div><div className="section-title">Test Scripts</div><div className="section-sub">Follow these during student tests</div></div></div>
      <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
        {PRESET_GOALS.filter(g=>g.id!=="custom").slice(0,4).map(g=>(
          <button key={g.id} className={`btn ${sel===g.id?"btn-gold":"btn-ghost"} btn-sm`} onClick={()=>setSel(g.id)}>{g.emoji} {g.title}</button>
        ))}
      </div>
      <div className="card card-gold" style={{marginBottom:13}}>
        <div style={{fontSize:10,letterSpacing:3,color:"var(--gold)",textTransform:"uppercase",marginBottom:9}}>Opening Line</div>
        <div style={{fontSize:16,color:"var(--white)",fontStyle:"italic"}}>"{s.open}"</div>
      </div>
      <div className="card" style={{marginBottom:13}}>
        <div style={{fontSize:10,letterSpacing:3,color:"var(--gray)",textTransform:"uppercase",marginBottom:9}}>Follow-up Questions</div>
        {s.follow.map((q,i)=><div key={i} style={{fontSize:14,padding:"6px 0",borderBottom:"1px solid var(--border)",fontStyle:"italic"}}>"{q}"</div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
        <div className="card" style={{borderColor:"rgba(74,222,128,0.2)",background:"rgba(74,222,128,0.03)"}}>
          <div style={{fontSize:10,color:"var(--green)",letterSpacing:2,marginBottom:7}}>✓ PASS IF</div>
          <div style={{fontSize:13,lineHeight:1.6}}>{s.pass}</div>
        </div>
        <div className="card" style={{borderColor:"rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.03)"}}>
          <div style={{fontSize:10,color:"var(--red)",letterSpacing:2,marginBottom:7}}>✗ FAIL IF</div>
          <div style={{fontSize:13,lineHeight:1.6}}>{s.fail}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── STUDENT DASHBOARD ─────────────────────────────────────────── */
function StudentDash({lang,goal,content,tBooked,onNav}){
  const daysLeft=Math.max(0,31-new Date().getDate());
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading">
        <div><div className="section-title">Welcome back, Sofia</div><div className="section-sub">{lang.flag} {lang.name} · {daysLeft} days until test day</div></div>
        {!goal&&<button className="btn btn-gold" onClick={()=>onNav("goals")}>Choose Your Goal →</button>}
      </div>
      <div className="stats-row">
        {[
          {label:"Current Goal", value:goal?goal.emoji:"—",   sub:goal?goal.title:"Not selected"},
          {label:"Days to Test", value:daysLeft,              sub:"until the 31st"},
          {label:"Lessons Done", value:content?"5/5":"0/5",  sub:"this month"},
          {label:"Test Status",  value:tBooked?"✓":"—",      sub:tBooked?"Booked!":"Not booked"},
        ].map((s,i)=>(
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{fontSize:28}}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      {!goal?(
        <div className="card card-gold" style={{textAlign:"center",padding:40}}>
          <div style={{fontSize:36,marginBottom:11}}>🎯</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,marginBottom:7}}>Choose your goal to start</div>
          <div style={{color:"var(--gray)",fontSize:13,marginBottom:18}}>Pick one real-life situation. Your entire month of lessons will be built around it.</div>
          <button className="btn btn-gold" onClick={()=>onNav("goals")}>Browse Goals</button>
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13}}>
          <div className="card card-gold">
            <div style={{fontSize:26,marginBottom:7}}>{goal.emoji}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,marginBottom:5}}>{goal.title}</div>
            <div style={{fontSize:13,color:"var(--gray)",marginBottom:14}}>{goal.desc}</div>
            <button className="btn btn-gold btn-sm" onClick={()=>onNav("learn")}>{content?"Continue →":"Generate Lessons →"}</button>
          </div>
          <div className="card">
            <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:13}}>Study Checklist</div>
            {["📚 Vocabulary","⚡ Verbs","📖 Stories","💬 Dialogues","✏️ Exercises"].map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid var(--border)"}}>
                <div style={{width:17,height:17,borderRadius:"50%",border:`1px solid ${content?"var(--green)":"var(--border2)"}`,background:content?"rgba(74,222,128,0.1)":"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"var(--green)"}}>{content?"✓":""}</div>
                <span style={{fontSize:13,color:content?"var(--white)":"var(--gray)"}}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── GOALS PAGE ────────────────────────────────────────────────── */
function GoalsPage({lang,selected,customTxt,setCustomTxt,onSelect}){
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading"><div><div className="section-title">Choose Your Goal</div><div className="section-sub">{lang.flag} {lang.name} · One situation to master this month</div></div></div>
      <div style={{marginBottom:18,padding:14,borderRadius:10,background:"rgba(200,148,10,0.06)",border:"1px solid var(--border2)",fontSize:13,color:"var(--gray)",lineHeight:1.7}}>
        ✦ Pick a preset goal below, or describe your own custom situation at the bottom.
      </div>
      <div className="goal-grid" style={{marginBottom:22}}>
        {PRESET_GOALS.filter(g=>g.id!=="custom").map(g=>(
          <div key={g.id} className={`goal-card${selected===g.id?" selected":""}`} onClick={()=>onSelect(g.id)}>
            <span className="goal-emoji">{g.emoji}</span>
            <div className="goal-title">{g.title}</div>
            <div className="goal-desc">{g.desc}</div>
            {selected===g.id&&<div style={{position:"absolute",top:10,right:10,color:"var(--gold)"}}>✓</div>}
          </div>
        ))}
      </div>
      <div className="divider"/>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,marginBottom:5}}>✨ Custom Goal</div>
      <div style={{fontSize:13,color:"var(--gray)",marginBottom:13}}>Have a specific situation? Describe it and AI will build your lessons around it.</div>
      <textarea className="form-input form-textarea" placeholder="e.g. I'm an architect and want to discuss projects with Spanish-speaking clients…" value={customTxt} onChange={e=>setCustomTxt(e.target.value)}/>
      <button className="btn btn-gold" style={{marginTop:11}} disabled={!customTxt.trim()} onClick={()=>onSelect("custom")}>Use Custom Goal</button>
    </div>
  );
}

/* ─── LEARN PAGE ────────────────────────────────────────────────── */
function LearnPage({goal,goalObj,lang,customTxt,content,loading,loadStep,cTab,setCTab,flipped,setFlipped,answers,setAnswers,checked,checkEx,onGenerate,onNav}){
  const goalText=goal==="custom"?customTxt:goalObj?.title;
  if(!goal) return(
    <div style={{textAlign:"center",padding:60}}>
      <div style={{fontSize:44,marginBottom:14}}>📚</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,marginBottom:9}}>No goal selected yet</div>
      <div style={{color:"var(--gray)",marginBottom:22}}>Choose a goal first to generate your lesson plan</div>
      <button className="btn btn-gold" onClick={()=>onNav("goals")}>Choose a Goal</button>
    </div>
  );
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading">
        <div>
          <div style={{fontSize:10,letterSpacing:3,color:"var(--gold)",textTransform:"uppercase",marginBottom:4}}>Lesson Plan · {lang.flag} {lang.name}</div>
          <div className="section-title">{goalObj?.emoji||"✨"} {goalText}</div>
        </div>
        {!loading&&<button className="btn btn-gold" onClick={onGenerate}>{content?"↻ Regenerate":"✦ Generate Lessons"}</button>}
      </div>
      {!content&&!loading&&(
        <div className="card card-gold" style={{textAlign:"center",padding:44}}>
          <div style={{fontSize:44,marginBottom:13}}>✦</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,marginBottom:7}}>Ready to generate your lesson plan</div>
          <div style={{color:"var(--gray)",fontSize:13,marginBottom:22}}>AI will create vocabulary, verbs, stories, dialogues and exercises for your goal.</div>
          <button className="btn btn-gold" onClick={onGenerate}>Generate Full Lesson Plan</button>
        </div>
      )}
      {loading&&(
        <div className="load-wrap">
          <div className="load-ring"/>
          <p style={{fontSize:11,letterSpacing:3,color:"var(--gray)",textTransform:"uppercase"}}>Building your lesson plan</p>
          <div style={{display:"flex",flexDirection:"column",gap:7,marginTop:8}}>
            {LOAD_STEPS.map((s,i)=>(
              <div key={i} className={`ls${loadStep===i?" active":loadStep>i?" done":""}`}>
                <span>{loadStep>i?"✓":loadStep===i?"◈":"○"}</span>{s}
              </div>
            ))}
          </div>
        </div>
      )}
      {content&&!loading&&(
        <>
          <div style={{display:"flex",gap:9,padding:12,borderRadius:9,background:"rgba(74,222,128,0.05)",border:"1px solid rgba(74,222,128,0.15)",marginBottom:18,flexWrap:"wrap"}}>
            <span style={{color:"var(--green)"}}>✦</span>
            <span style={{fontSize:13,color:"var(--green)",fontWeight:600}}>Lesson Plan Ready</span>
            <span style={{fontSize:12,color:"var(--gray)"}}>· {content.vocabulary?.length} words · {content.verbs?.length} verbs · {content.stories?.length} stories · {content.exercises?.length} exercises</span>
          </div>
          <div className="tabs">
            {[{id:"vocabulary",l:"📚 Vocabulary"},{id:"verbs",l:"⚡ Verbs"},{id:"stories",l:"📖 Stories"},{id:"dialogues",l:"💬 Dialogues"},{id:"exercises",l:"✏️ Exercises"}].map(t=>(
              <button key={t.id} className={`tab-btn${cTab===t.id?" active":""}`} onClick={()=>setCTab(t.id)}>{t.l}</button>
            ))}
          </div>

          {cTab==="vocabulary"&&(
            <>
              <div className="sec-label">Tap a card to reveal translation</div>
              <div className="vocab-grid">
                {content.vocabulary?.map((v,i)=>(
                  <div key={i} className={`vocab-card${flipped[i]?" flip":""}`} onClick={()=>setFlipped(p=>({...p,[i]:!p[i]}))}>
                    {flipped[i]?<><div className="vocab-trans">{v.translation}</div><div className="vocab-ex">{v.example}</div></>:<><div className="vocab-word">{v.word}</div><div className="vocab-hint">tap to reveal</div></>}
                  </div>
                ))}
              </div>
            </>
          )}
          {cTab==="verbs"&&content.verbs?.map((v,i)=>(
            <div key={i} className="verb-card">
              <div className="verb-header"><span className="verb-inf">{v.verb}</span><span className="verb-tr">{v.translation}</span></div>
              <div className="verb-conj">{[["yo",v.yo],["tú",v.tu],["él/ella",v.el]].map(([l,val])=>(
                <div key={l}><div className="conj-lbl">{l}</div><div className="conj-val">{val}</div></div>
              ))}</div>
            </div>
          ))}
          {cTab==="stories"&&content.stories?.map((s,i)=>(
            <div key={i} className="story-card">
              <div className="story-head">
                <div style={{display:"flex",gap:6}}><span className="badge badge-gold">{s.tense}</span><span className="badge badge-blue">{s.perspective}</span></div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15}}>{s.title}</div>
              </div>
              <div className="story-body">
                <div className="story-text">{s.text}</div>
                <div className="divider"/>
                <div className="sec-label">Translation</div>
                <div className="story-tr">{s.translation}</div>
              </div>
            </div>
          ))}
          {cTab==="dialogues"&&content.dialogues?.map((d,di)=>(
            <div key={di} style={{marginBottom:26}}>
              <div className="dl-title">{d.title}</div>
              {d.exchanges?.map((ex,ei)=>(
                <div key={ei} className={`exchange${ei%2===1?" r":""}`}>
                  <div className={`av ${ei%2===0?"av-a":"av-b"}`}>{ei%2===0?"🧑":"👤"}</div>
                  <div className="bw">
                    <div className="bspk">{ex.speaker}</div>
                    <div className={`bbl ${ei%2===0?"bb-a":"bb-b"}`}>
                      <div className="b-line">{ex.line}</div>
                      <div className="b-tr">{ex.translation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {cTab==="exercises"&&content.exercises?.map((ex,i)=>(
            <div key={i} className={`ex-card${checked[i]===true?" ok":checked[i]===false?" no":""}`}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
                <span className="badge badge-green" style={{fontSize:10}}>{ex.type?.replace(/-/g," ")}</span>
                {checked[i]!==undefined&&<span style={{fontSize:18}}>{checked[i]?"✅":"❌"}</span>}
              </div>
              {ex.type==="fill-in-the-blank"?(
                <>
                  <div style={{fontSize:15,marginBottom:5}}>{ex.sentence}</div>
                  <div style={{fontSize:12,color:"var(--gray)",fontStyle:"italic",marginBottom:11}}>Hint: {ex.hint}</div>
                  <div style={{display:"flex",gap:8}}>
                    <input className="ex-inp" placeholder="Your answer…" value={answers[i]||""} onChange={e=>setAnswers(p=>({...p,[i]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&checkEx(i,ex,answers[i])}/>
                    <button className="btn btn-outline btn-sm" onClick={()=>checkEx(i,ex,answers[i])}>Check</button>
                  </div>
                  {checked[i]===false&&<div style={{fontSize:12,color:"var(--gray)",marginTop:7}}>Answer: <strong style={{color:"var(--green)"}}>{ex.answer}</strong></div>}
                </>
              ):(
                <>
                  <div style={{fontSize:15,marginBottom:11}}>{ex.question}</div>
                  {ex.options?.map((opt,oi)=>{
                    const done=checked[i]!==undefined,isRight=oi===ex.correct,isPicked=answers[i]===oi;
                    return(
                      <button key={oi} className={`mc-opt${done&&isRight?" c-ok":done&&isPicked&&!isRight?" c-no":""}`} disabled={done}
                        onClick={()=>{setAnswers(p=>({...p,[i]:oi}));checkEx(i,ex,oi);}}>
                        <span className="opt-l">{String.fromCharCode(65+oi)}</span>{opt}
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

/* ─── CORE LIBRARY ──────────────────────────────────────────────── */
function CoreLibrary({coreTab,setCoreTab,coreFlip,setCoreFlip,lang}){
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading"><div><div className="section-title">Core Library</div><div className="section-sub">{lang.flag} Foundation that works in every situation</div></div></div>
      <div className="tabs">
        {[{id:"vocab",l:"📚 Vocabulary"},{id:"verbs",l:"⚡ Top Verbs"},{id:"grammar",l:"📐 Grammar"}].map(t=>(
          <button key={t.id} className={`tab-btn${coreTab===t.id?" active":""}`} onClick={()=>setCoreTab(t.id)}>{t.l}</button>
        ))}
      </div>
      {coreTab==="vocab"&&(
        <>
          {Object.entries(CORE_VOCAB).map(([cat,words])=>(
            <div key={cat} style={{marginBottom:22}}>
              <div className="sec-label" style={{textTransform:"capitalize"}}>{cat}</div>
              <div className="vocab-grid">
                {words.map((v,i)=>{
                  const k=`${cat}-${i}`;
                  return(
                    <div key={i} className={`vocab-card${coreFlip[k]?" flip":""}`} onClick={()=>setCoreFlip(p=>({...p,[k]:!p[k]}))}>
                      {coreFlip[k]?<div className="vocab-trans">{v.t}</div>:<><div className="vocab-word">{v.w}</div><div className="vocab-hint">tap to reveal</div></>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}
      {coreTab==="verbs"&&(
        <div>
          <div style={{fontSize:13,color:"var(--gray)",marginBottom:16}}>The 8 most essential verbs — used in every situation</div>
          {TOP_VERBS.map((v,i)=>(
            <div key={i} className="verb-card">
              <div className="verb-header"><span className="verb-inf">{v.v}</span><span className="verb-tr">{v.t}</span></div>
              <div className="verb-conj">{[["yo",v.yo],["tú",v.tu],["él/ella",v.el]].map(([l,val])=>(
                <div key={l}><div className="conj-lbl">{l}</div><div className="conj-val">{val}</div></div>
              ))}</div>
            </div>
          ))}
        </div>
      )}
      {coreTab==="grammar"&&(
        <div>
          {[
            {title:"How to ask a question",content:"Put ¿ at the start and ? at the end.\nExample: ¿Dónde está el baño? → Where is the bathroom?"},
            {title:"How to say NO (negative)",content:"Put 'no' before the verb.\nNo quiero → I don't want · No tengo → I don't have"},
            {title:"Talking about the PAST",content:"Add -é/-aste/-ó endings to regular verbs.\nComí → I ate · Hablé → I spoke · Fui → I went"},
            {title:"Talking about the FUTURE",content:"Use 'voy a' + infinitive verb.\nVoy a comer → I'm going to eat · Voy a ir → I'm going to go"},
          ].map((g,i)=>(
            <div key={i} className="card" style={{marginBottom:11}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:600,color:"var(--gold2)",marginBottom:9}}>{g.title}</div>
              {g.content.split("\n").map((line,j)=><div key={j} style={{fontSize:13,color:j===0?"var(--white)":"var(--gray)",lineHeight:1.7,fontStyle:line.startsWith("Example")||line.startsWith("No ")||line.startsWith("Com")||line.startsWith("Voy")?"italic":"normal"}}>{line}</div>)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── TEST BOOKING ──────────────────────────────────────────────── */
function TestBooking({lang,goal,tBooked,setTBooked,notify}){
  const [selTime,setSelTime]=useState(null);
  const slots=["09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45","14:00","14:15","14:30","14:45"];
  const bookedSlots=["09:15","09:45","10:30","11:00"];
  if(tBooked) return(
    <div style={{animation:"fadeIn .4s ease",textAlign:"center",padding:48}}>
      <div style={{fontSize:60,marginBottom:14}}>✅</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,marginBottom:7}}>Test Booked!</div>
      <div style={{color:"var(--gray)",marginBottom:22,fontSize:14}}>January 31st · {selTime||"09:00"} · 15 minutes</div>
      <div className="card card-gold" style={{maxWidth:380,margin:"0 auto",textAlign:"left"}}>
        <div style={{fontSize:13,color:"var(--gold2)",fontWeight:600,marginBottom:11}}>What to expect</div>
        {[`Your tutor will greet you in ${lang.name}`,`Respond naturally in ${lang.name}`,"The conversation lasts 10-15 minutes","You get your result immediately after","Pass → new goal next month"].map((t,i)=>(
          <div key={i} style={{fontSize:13,padding:"6px 0",borderBottom:"1px solid var(--border)",display:"flex",gap:8}}><span style={{color:"var(--gold)"}}>✦</span>{t}</div>
        ))}
      </div>
      <button className="btn btn-ghost" style={{marginTop:18}} onClick={()=>setTBooked(false)}>Cancel Booking</button>
    </div>
  );
  return(
    <div style={{animation:"fadeIn .4s ease",maxWidth:580}}>
      <div className="section-heading"><div><div className="section-title">Book Your Test</div><div className="section-sub">January 31st · 15-minute speaking test</div></div></div>
      {!goal&&<div className="card" style={{marginBottom:14,color:"var(--gray)",fontSize:13}}>⚠ Please select a goal first before booking.</div>}
      <div className="card card-gold" style={{marginBottom:18}}>
        <div style={{fontSize:13,color:"var(--gray)",lineHeight:1.9}}>
          {["Tests happen on the 31st only",`Your tutor will speak ${lang.name} with you`,"Each session is exactly 15 minutes","No rescheduling after booking","Pass → unlock a new goal. Fail → repeat with support"].map((r,i)=><div key={i}>✦ {r}</div>)}
        </div>
      </div>
      <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:11}}>Available Slots — January 31st</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,marginBottom:22}}>
        {slots.map(s=>{
          const isB=bookedSlots.includes(s),isSel=selTime===s;
          return(
            <button key={s} disabled={isB} onClick={()=>setSelTime(s)} style={{padding:"9px 5px",borderRadius:7,border:"1px solid",borderColor:isSel?"var(--gold)":isB?"var(--border)":"var(--border2)",background:isSel?"rgba(200,148,10,0.12)":isB?"var(--black4)":"var(--black3)",color:isSel?"var(--gold2)":isB?"var(--gray2)":"var(--white)",fontSize:13,cursor:isB?"not-allowed":"pointer",textDecoration:isB?"line-through":"none",transition:"all .15s"}}>
              {s}
            </button>
          );
        })}
      </div>
      <button className="btn btn-gold" style={{width:"100%"}} disabled={!selTime||!goal} onClick={()=>{setTBooked(true);notify("Test booked for January 31st!");}}>
        {selTime?`Confirm — ${selTime}`:"Select a time slot first"}
      </button>
    </div>
  );
}

/* ─── PROGRESS PAGE ─────────────────────────────────────────────── */
function ProgressPage({lang,goal,content,checked}){
  const totalEx=content?.exercises?.length||0;
  const doneEx=Object.keys(checked).length;
  const passedEx=Object.values(checked).filter(Boolean).length;
  const score=totalEx?Math.round(passedEx/totalEx*100):0;
  return(
    <div style={{animation:"fadeIn .4s ease"}}>
      <div className="section-heading"><div><div className="section-title">My Progress</div><div className="section-sub">{lang.flag} {lang.name} · This month</div></div></div>
      <div className="stats-row">
        {[
          {label:"Exercise Score",  value:`${score}%`,          sub:`${passedEx}/${doneEx} correct`},
          {label:"Lessons Studied", value:content?"5/5":"0/5", sub:"this month"},
          {label:"Current Goal",    value:goal?.emoji||"—",     sub:goal?.title||"Not set"},
          {label:"Language",        value:lang.flag,            sub:lang.name},
        ].map((s,i)=>(
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{fontSize:28}}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{fontSize:13,fontWeight:600,color:"var(--gold2)",marginBottom:14}}>Monthly Journey</div>
        {[
          {label:"Choose goal",        done:!!goal},
          {label:"Generate lessons",   done:!!content},
          {label:"Study vocabulary",   done:!!content},
          {label:"Practice exercises", done:doneEx>0},
          {label:"Book test slot",     done:false},
          {label:"Pass speaking test", done:false},
        ].map((step,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 0",borderBottom:"1px solid var(--border)"}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:step.done?"rgba(74,222,128,0.1)":"var(--black4)",border:`1px solid ${step.done?"rgba(74,222,128,0.4)":"var(--border2)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:step.done?"var(--green)":"var(--gray2)",flexShrink:0}}>{step.done?"✓":i+1}</div>
            <span style={{fontSize:13,color:step.done?"var(--white)":"var(--gray)"}}>{step.label}</span>
            {step.done&&<span className="badge badge-green" style={{marginLeft:"auto"}}>Done</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
