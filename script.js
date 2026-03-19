/* ===================================================
   OverDiet — Dashboard Inteligente v3
   script.js
   =================================================== */
'use strict';

// ===================================================
//  BANCO DE ALIMENTOS PADRÃO (por 100g)
// ===================================================
const DEFAULT_FOOD_DB = [
  // Proteinas
  { id:'df1',  name:'Frango peito grelhado',   category:'Proteinas',      cal:165, protein:31,  carb:0,   fat:3.6, isDefault:true },
  { id:'df2',  name:'Carne bovina patinho',     category:'Proteinas',      cal:158, protein:27,  carb:0,   fat:5.0, isDefault:true },
  { id:'df3',  name:'Ovo inteiro',              category:'Proteinas',      cal:155, protein:13,  carb:1.1, fat:11,  isDefault:true },
  { id:'df4',  name:'Whey Protein',             category:'Proteinas',      cal:400, protein:80,  carb:8,   fat:5,   isDefault:true },
  { id:'df5',  name:'Atum em agua (lata)',      category:'Proteinas',      cal:100, protein:23,  carb:0,   fat:0.5, isDefault:true },
  { id:'df6',  name:'Tilapia grelhada',         category:'Proteinas',      cal:128, protein:26,  carb:0,   fat:2.6, isDefault:true },
  { id:'df7',  name:'Queijo cottage',           category:'Proteinas',      cal:98,  protein:11,  carb:3.4, fat:4.3, isDefault:true },
  // Carboidratos
  { id:'dc1',  name:'Arroz branco cozido',      category:'Carboidratos',   cal:130, protein:2.7, carb:28,  fat:0.3, isDefault:true },
  { id:'dc2',  name:'Batata-doce cozida',       category:'Carboidratos',   cal:86,  protein:1.6, carb:20,  fat:0.1, isDefault:true },
  { id:'dc3',  name:'Batata inglesa cozida',    category:'Carboidratos',   cal:77,  protein:2.0, carb:17,  fat:0.1, isDefault:true },
  { id:'dc4',  name:'Pao frances',              category:'Carboidratos',   cal:300, protein:8,   carb:58,  fat:3.5, isDefault:true },
  { id:'dc5',  name:'Aveia em flocos',          category:'Carboidratos',   cal:379, protein:13,  carb:66,  fat:7.0, isDefault:true },
  { id:'dc6',  name:'Macarrao cozido',          category:'Carboidratos',   cal:158, protein:5.5, carb:31,  fat:0.9, isDefault:true },
  { id:'dc7',  name:'Mandioca cozida',          category:'Carboidratos',   cal:125, protein:0.6, carb:30,  fat:0.2, isDefault:true },
  // Gorduras
  { id:'dg1',  name:'Azeite de oliva',          category:'Gorduras',       cal:884, protein:0,   carb:0,   fat:100, isDefault:true },
  { id:'dg2',  name:'Castanha-do-para',         category:'Gorduras',       cal:656, protein:14,  carb:12,  fat:66,  isDefault:true },
  { id:'dg3',  name:'Amendoim torrado',         category:'Gorduras',       cal:567, protein:26,  carb:16,  fat:49,  isDefault:true },
  { id:'dg4',  name:'Abacate',                  category:'Gorduras',       cal:160, protein:2,   carb:9,   fat:15,  isDefault:true },
  // Vegetais
  { id:'dv1',  name:'Brocolis cozido',          category:'Vegetais',       cal:34,  protein:2.8, carb:6.6, fat:0.4, isDefault:true },
  { id:'dv2',  name:'Alface',                   category:'Vegetais',       cal:15,  protein:1.4, carb:2.2, fat:0.2, isDefault:true },
  { id:'dv3',  name:'Tomate',                   category:'Vegetais',       cal:18,  protein:0.9, carb:3.9, fat:0.2, isDefault:true },
  { id:'dv4',  name:'Espinafre cru',            category:'Vegetais',       cal:23,  protein:2.9, carb:3.6, fat:0.4, isDefault:true },
  { id:'dv5',  name:'Abobrinha cozida',         category:'Vegetais',       cal:17,  protein:1.2, carb:3.5, fat:0.3, isDefault:true },
  // Frutas
  { id:'df8',  name:'Banana',                   category:'Frutas',         cal:89,  protein:1.1, carb:23,  fat:0.3, isDefault:true },
  { id:'df9',  name:'Maca',                     category:'Frutas',         cal:52,  protein:0.3, carb:14,  fat:0.2, isDefault:true },
  { id:'df10', name:'Mamao',                    category:'Frutas',         cal:43,  protein:0.5, carb:11,  fat:0.3, isDefault:true },
  { id:'df11', name:'Laranja',                  category:'Frutas',         cal:47,  protein:0.9, carb:12,  fat:0.1, isDefault:true },
  // Industrializados
  { id:'di1',  name:'Club Social original',     category:'Industrializados',cal:493, protein:7.5, carb:64,  fat:23,  isDefault:true },
  { id:'di2',  name:'Barra proteica Quest',     category:'Industrializados',cal:380, protein:21,  carb:48,  fat:9,   isDefault:true },
  { id:'di3',  name:'Iogurte grego integral',   category:'Industrializados',cal:97,  protein:9,   carb:3.6, fat:5,   isDefault:true },
  // Bebidas
  { id:'db1',  name:'Leite integral',           category:'Bebidas',        cal:61,  protein:3.2, carb:4.8, fat:3.3, isDefault:true },
  { id:'db2',  name:'Leite desnatado',          category:'Bebidas',        cal:35,  protein:3.4, carb:5,   fat:0.2, isDefault:true },
];

// ===================================================
//  ESTADO GLOBAL
// ===================================================
const STATE = {
  goals: { currentWeight:0, targetWeight:0, calories:2200, protein:160, carb:220, fat:65, deadline:'' },
  todayLog: { foods:[], trainingDone:false, trainingType:'', trainingObs:'', trainingExercises:'', date:getTodayStr() },
  weightHistory: [],
  trainingHistory: [],   // [{date, type, obs, exercises}]
  loadHistory: [],       // [{id, date, exercise, weight, sets, reps, note}]
  bioimpHistory: [],
  photos: { front:null, side:null, back:null },
  logoPhoto: null,
  foodDB: [],
  foodSearch: { selectedFood:null, baseQty:100 }
};

const TRACKED_EXERCISES = ['supino','agachamento','remada','desenvolvimento','levantamento terra','rosca direta'];

// ===================================================
//  UTILS
// ===================================================
function getTodayStr() { return new Date().toISOString().split('T')[0]; }
function formatDate(d) { if(!d) return '—'; const [y,m,dd] = d.split('-'); return `${dd}/${m}/${y}`; }
function clamp(v,min,max) { return Math.min(Math.max(v,min),max); }
function daysBetween(d1,d2) { return Math.floor((new Date(d2)-new Date(d1))/86400000); }
function uid() { return 'u' + Date.now() + Math.random().toString(36).slice(2,6); }
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function showToast(msg, type='') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show' + (type ? ' toast-'+type : '');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 3200);
}

function animKPI(el) { el.classList.remove('updating'); void el.offsetWidth; el.classList.add('updating'); }

// ===================================================
//  PERSISTÊNCIA
// ===================================================
function saveAll() {
  localStorage.setItem('od3_goals',      JSON.stringify(STATE.goals));
  localStorage.setItem('od3_todayLog',   JSON.stringify(STATE.todayLog));
  localStorage.setItem('od3_weightHist', JSON.stringify(STATE.weightHistory));
  localStorage.setItem('od3_trainHist',  JSON.stringify(STATE.trainingHistory));
  localStorage.setItem('od3_loadHist',   JSON.stringify(STATE.loadHistory));
  localStorage.setItem('od3_bioHist',    JSON.stringify(STATE.bioimpHistory));
  localStorage.setItem('od3_photos',     JSON.stringify(STATE.photos));
  localStorage.setItem('od3_foodDB',     JSON.stringify(STATE.foodDB));
  if (STATE.logoPhoto) localStorage.setItem('od3_logoPhoto', STATE.logoPhoto);
}

function loadAll() {
  const get = k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
  const g  = get('od3_goals');
  const t  = get('od3_todayLog');
  const wh = get('od3_weightHist');
  const th = get('od3_trainHist');
  const lh = get('od3_loadHist');
  const bh = get('od3_bioHist');
  const ph = get('od3_photos');
  const fdb= get('od3_foodDB');
  const lp = localStorage.getItem('od3_logoPhoto');

  if (g)  Object.assign(STATE.goals, g);
  if (wh) STATE.weightHistory   = wh;
  if (th) STATE.trainingHistory = th;
  if (lh) STATE.loadHistory     = lh;
  if (bh) STATE.bioimpHistory   = bh;
  if (ph) Object.assign(STATE.photos, ph);
  if (lp) STATE.logoPhoto = lp;

  if (fdb && fdb.length > 0) {
    const userCustom = fdb.filter(f => !f.isDefault);
    STATE.foodDB = [...DEFAULT_FOOD_DB, ...userCustom];
  } else {
    STATE.foodDB = [...DEFAULT_FOOD_DB];
  }

  if (t) {
    if (t.date === getTodayStr()) {
      STATE.todayLog = t;
    } else {
      // Archive previous day training if it was done
      if (t.trainingDone && t.trainingType) {
        archiveSession({ date: t.date, type: t.trainingType, obs: t.trainingObs||'', exercises: t.trainingExercises||'' });
      }
      STATE.todayLog.date = getTodayStr();
    }
  }
}

function archiveSession(session) {
  if (!STATE.trainingHistory.find(s => s.date === session.date)) {
    STATE.trainingHistory.push(session);
  }
}

// ===================================================
//  CLOCK
// ===================================================
function updateClock() {
  document.getElementById('topbar-clock').textContent =
    new Date().toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
function updateGreeting() {
  const h = new Date().getHours();
  document.getElementById('greeting').textContent = h<12?'Bom dia':h<18?'Boa tarde':'Boa noite';
  document.getElementById('topbar-date').textContent =
    new Date().toLocaleDateString('pt-BR',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}

// ===================================================
//  NAVIGATION
// ===================================================
function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.dataset.section;
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      const target = document.getElementById('section-'+sec);
      if (target) target.classList.add('active');
      document.getElementById('sidebar').classList.remove('open');
      if (sec === 'progress') drawWeightChart();
      if (sec === 'bioimp') drawBioChart();
    });
  });
  document.getElementById('mobile-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

// ===================================================
//  ANÁLISE DE CONSISTÊNCIA
// ===================================================
function analyzeConsistency() {
  const today = getTodayStr();
  const result = { daysSinceLastWeight:null, daysSinceLastTraining:null, trainingCountLast7:0, weightTrend:null, avgWeeklyLoss:null };

  if (STATE.weightHistory.length > 0) {
    const sorted = [...STATE.weightHistory].sort((a,b) => b.date.localeCompare(a.date));
    result.daysSinceLastWeight = daysBetween(sorted[0].date, today);
  }

  const allTrainDates = [
    ...STATE.trainingHistory.map(s => s.date),
    ...(STATE.todayLog.trainingDone ? [today] : [])
  ].sort((a,b) => b.localeCompare(a));
  if (allTrainDates.length > 0) result.daysSinceLastTraining = daysBetween(allTrainDates[0], today);

  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate()-7);
  result.trainingCountLast7 = allTrainDates.filter(d => new Date(d) >= weekAgo).length;

  if (STATE.weightHistory.length >= 2) {
    const sorted = [...STATE.weightHistory].sort((a,b) => a.date.localeCompare(b.date));
    const recent = sorted.filter(w => daysBetween(w.date, today) <= 14);
    if (recent.length >= 2) {
      const first = parseFloat(recent[0].weight);
      const last  = parseFloat(recent[recent.length-1].weight);
      const diff  = last - first;
      const isLoss = STATE.goals.targetWeight < STATE.goals.currentWeight;
      if (Math.abs(diff) < 0.3) result.weightTrend = 'stagnated';
      else if ((isLoss && diff < 0) || (!isLoss && diff > 0)) result.weightTrend = 'improving';
      else result.weightTrend = 'regressing';
      const weeks = (new Date(recent[recent.length-1].date) - new Date(recent[0].date)) / (7*86400000);
      if (weeks > 0) result.avgWeeklyLoss = Math.abs(diff/weeks);
    }
  }
  return result;
}

// ===================================================
//  PROJEÇÃO — lógica melhorada com ritmo categorizado
// ===================================================
function calcProjection() {
  const g  = STATE.goals;
  const wh = STATE.weightHistory;
  const curr = parseFloat(g.currentWeight) || 0;
  const tgt  = parseFloat(g.targetWeight)  || 0;
  if (!curr || !tgt) return null;

  const diff = curr - tgt; // pode ser negativo se quiser ganhar peso
  const absDiff = Math.abs(diff);
  let pct = 0, daysEst = null, avgPerWeek = null, pace = null, paceLabel = null;

  if (wh.length >= 2) {
    const sorted = [...wh].sort((a,b) => a.date.localeCompare(b.date));
    const first = sorted[0];
    const last  = sorted[sorted.length-1];
    const weeks = (new Date(last.date) - new Date(first.date)) / (7*86400000);
    if (weeks > 0) {
      const totalChange = Math.abs(parseFloat(first.weight) - parseFloat(last.weight));
      avgPerWeek = totalChange / weeks;
      if (avgPerWeek > 0) daysEst = Math.round(absDiff / (avgPerWeek / 7));
    }
    const startW = parseFloat(first.weight);
    const lastW  = parseFloat(last.weight);
    if (startW !== tgt) pct = clamp(Math.abs((startW - lastW) / (startW - tgt)) * 100, 0, 100);
  }

  // Categoriza ritmo baseado nos dias estimados
  if (daysEst !== null) {
    if (daysEst > 100)      { pace = 'lento';     paceLabel = 'Lento'; }
    else if (daysEst > 60)  { pace = 'adequado';  paceLabel = 'Adequado'; }
    else                     { pace = 'agressivo'; paceLabel = 'Agressivo'; }
  }

  // Cenários alternativos
  const scenarios = [];
  if (avgPerWeek) {
    const kgPerDay = avgPerWeek / 7;
    scenarios.push({ label: 'Ritmo atual',        days: daysEst });
    scenarios.push({ label: '+100 kcal/dia a menos', days: Math.round(absDiff / (kgPerDay + 0.014)) });
    scenarios.push({ label: 'Ritmo conservador (0.5kg/sem)', days: Math.round(absDiff / (0.5/7)) });
  }

  return { diff:absDiff, pct, daysEst, pace, paceLabel, avgPerWeek, scenarios };
}

// ===================================================
//  SCORE
// ===================================================
function calcScore() {
  const t = STATE.todayLog;
  const g = STATE.goals;
  let score = 0;
  const breakdown = [];
  const totalProt = t.foods.reduce((a,f) => a+f.protein, 0);
  const totalCal  = t.foods.reduce((a,f) => a+f.calories, 0);

  if (g.protein > 0) {
    const pct = totalProt / g.protein;
    if (pct >= 1.0)       { score += 30; breakdown.push({label:'Meta de proteina atingida',pts:30}); }
    else if (pct >= 0.85) { score += 18; breakdown.push({label:'Proteina quase na meta',pts:18}); }
    else if (pct >= 0.70) { score += 10; breakdown.push({label:'Proteina abaixo do ideal',pts:10}); }
  }
  if (g.calories > 0 && totalCal > 0) {
    const pct = totalCal / g.calories;
    if (pct >= 0.85 && pct <= 1.08)     { score += 25; breakdown.push({label:'Calorias na faixa ideal',pts:25}); }
    else if (pct >= 0.70 && pct < 0.85) { score += 12; breakdown.push({label:'Calorias um pouco abaixo',pts:12}); }
    else if (pct > 1.08 && pct <= 1.15) { score += 10; breakdown.push({label:'Leve superavit',pts:10}); }
  }
  if (t.trainingDone) { score += 20; breakdown.push({label:'Treino concluido',pts:20}); }
  if (t.foods.length >= 4)      { score += 15; breakdown.push({label:'Registro completo',pts:15}); }
  else if (t.foods.length >= 2) { score += 7;  breakdown.push({label:'Registro parcial',pts:7}); }
  if (STATE.weightHistory.find(w => w.date === getTodayStr())) { score += 5; breakdown.push({label:'Peso registrado hoje',pts:5}); }
  const c = analyzeConsistency();
  if (c.trainingCountLast7 >= 4) { score += 5; breakdown.push({label:'Alta consistencia semanal',pts:5}); }
  return { score:Math.min(score,100), breakdown };
}

function getScoreClass(s) { return s>=90?'Excelente':s>=70?'Bom':s>=50?'Regular':'Fraco'; }
function getScorePhrase(s, totalProt, g) {
  if (s>=90) return 'Dia excelente. Voce esta no caminho certo.';
  if (s>=70) { if (g.protein>0 && totalProt<g.protein*0.9) return 'Bom dia, mas proteina ainda pode melhorar.'; return 'Bom dia. Pequenos ajustes te levariam ao topo.'; }
  if (s>=50) return 'Dia regular. Foque em proteina e treino amanha.';
  return 'Dia fraco. Ajuste agora antes de repetir isso.';
}
function getScoreColor(s) { return s>=70?'var(--green)':s>=50?'var(--yellow)':'var(--red)'; }

// ===================================================
//  DIAGNÓSTICO (COACH)
// ===================================================
function getAllExerciseRecords(exerciseName) {
  // Now pulls from the dedicated load history
  return STATE.loadHistory
    .filter(r => r.exercise.toLowerCase().includes(exerciseName.toLowerCase()))
    .map(r => ({ date: r.date, weight: parseFloat(r.weight) || 0 }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function buildDiagnosis(totalCal, totalProt, totalCarb, totalFat) {
  const g = STATE.goals;
  const t = STATE.todayLog;
  const c = analyzeConsistency();
  const problems = [], positives = [], infos = [];

  if (g.protein > 0 && t.foods.length > 0) {
    const pct = totalProt / g.protein;
    const faltam = (g.protein - totalProt).toFixed(0);
    if (pct < 0.6)       problems.push({type:'bad',  msg:`Proteina critica: ${totalProt.toFixed(0)}g de ${g.protein}g. Faltam ${faltam}g. Adicione frango, ovo ou whey agora.`});
    else if (pct < 0.85) problems.push({type:'warn', msg:`Proteina abaixo da meta. Faltam ${faltam}g para ${g.protein}g. Corrija nas proximas refeicoes.`});
    else if (pct >= 1.0) positives.push({type:'good', msg:`Meta de proteina batida: ${totalProt.toFixed(0)}g / ${g.protein}g.`});
  }

  if (g.calories > 0 && totalCal > 0) {
    const balance = totalCal - g.calories;
    const pct = totalCal / g.calories;
    if (pct < 0.55)       problems.push({type:'bad',  msg:`Deficit muito agressivo: apenas ${totalCal} kcal. Risco real de perda de massa muscular.`});
    else if (pct < 0.80)  problems.push({type:'warn', msg:`Calorias abaixo do esperado (${totalCal} / ${g.calories}). Considere uma refeicao extra.`});
    else if (pct > 1.15)  problems.push({type:'bad',  msg:`Superavit inesperado: +${balance} kcal acima da meta. Isso compromete o deficit semanal.`});
    else if (pct > 1.06)  problems.push({type:'warn', msg:`Leve superavit de ${balance} kcal. Ajuste a ultima refeicao do dia.`});
    else positives.push({type:'good', msg:`Calorias dentro da faixa ideal (${totalCal} / ${g.calories} kcal).`});
  }

  if (!t.trainingDone) {
    if (c.daysSinceLastTraining !== null && c.daysSinceLastTraining >= 2) problems.push({type:'bad', msg:`Treino nao realizado ha ${c.daysSinceLastTraining} dias. Isso compromete sua evolucao muscular.`});
    else problems.push({type:'warn', msg:`Treino nao registrado hoje. Selecione o tipo e registre.`});
  } else {
    const typeStr = t.trainingType ? ` (${t.trainingType})` : '';
    positives.push({type:'good', msg:`Treino concluido hoje${typeStr}. Consistencia gera resultado.`});
    if (c.trainingCountLast7 >= 4) positives.push({type:'good', msg:`${c.trainingCountLast7} treinos esta semana. Alta consistencia.`});
  }

  if (c.daysSinceLastWeight === null) infos.push({type:'info', msg:`Nenhuma pesagem registrada ainda. Comece a registrar para ativar a projecao.`});
  else if (c.daysSinceLastWeight >= 5) problems.push({type:'warn', msg:`${c.daysSinceLastWeight} dias sem pesar. Registre o peso para manter a projecao precisa.`});

  if (c.weightTrend === 'regressing') problems.push({type:'bad', msg:`Tendencia de peso regressiva nos ultimos 14 dias. Revise dieta e deficit.`});
  else if (c.weightTrend === 'stagnated') problems.push({type:'warn', msg:`Peso estagnado nos ultimos 14 dias. Considere ajustar calorias ou aumentar atividade.`});
  else if (c.weightTrend === 'improving') positives.push({type:'good', msg:`Tendencia de peso positiva. Continue no ritmo atual.`});

  TRACKED_EXERCISES.forEach(ex => {
    const records = getAllExerciseRecords(ex);
    if (records.length >= 2) {
      const last = records[records.length-1].weight;
      const prev = records[records.length-2].weight;
      if (last < prev) problems.push({type:'warn', msg:`Queda de carga no ${capitalize(ex)}: ${prev}kg → ${last}kg.`});
      else if (last > prev) positives.push({type:'good', msg:`Progressao no ${capitalize(ex)}: ${prev}kg → ${last}kg.`});
    }
  });

  return { problems, positives, infos };
}

function getCoachMainMessage(problems, positives, score) {
  const badCount  = problems.filter(p => p.type==='bad').length;
  const warnCount = problems.filter(p => p.type==='warn').length;
  if (problems.length === 0 && score >= 80) return { msg:'Dia excelente. Todos os indicadores estao dentro do esperado.', status:'green' };
  if (badCount > 0)  return { msg:problems.find(p => p.type==='bad').msg,  status:'red' };
  if (warnCount > 0) return { msg:problems.find(p => p.type==='warn').msg, status:'yellow' };
  if (score >= 70) return { msg:'Bom dia. Alguns pontos ainda podem ser ajustados.', status:'yellow' };
  return { msg:'Registre seus dados para ativar o diagnostico.', status:'neutral' };
}

// ===================================================
//  ALERTAS
// ===================================================
function generateAlerts() {
  const alerts = [];
  const t = STATE.todayLog;
  const g = STATE.goals;
  const c = analyzeConsistency();
  const totalCal  = t.foods.reduce((a,f) => a+f.calories, 0);
  const totalProt = t.foods.reduce((a,f) => a+f.protein, 0);

  if (g.protein > 0 && totalProt < g.protein * 0.6 && t.foods.length > 0)
    alerts.push({type:'bad', title:'Proteina critica', impact:'Em deficit calorico, proteina baixa = perda de massa muscular.', action:`Consuma mais ${(g.protein-totalProt).toFixed(0)}g. Opcoes: frango, whey, ovo.`});
  else if (g.protein > 0 && totalProt < g.protein * 0.85 && t.foods.length > 0)
    alerts.push({type:'warn', title:'Proteina abaixo da meta', impact:'Menor recuperacao muscular pos-treino.', action:`Faltam ${(g.protein-totalProt).toFixed(0)}g. Adicione 1 dose de whey ou porcao de frango.`});

  if (g.calories > 0 && totalCal > 0 && totalCal < g.calories * 0.6)
    alerts.push({type:'bad', title:'Deficit calorico agressivo', impact:'Corpo entra em modo de catabolismo.', action:`Voce consumiu apenas ${totalCal} kcal. Adicione refeicoes densas.`});
  if (g.calories > 0 && totalCal > g.calories * 1.15)
    alerts.push({type:'warn', title:'Superavit calorico inesperado', impact:`${(totalCal-g.calories).toFixed(0)} kcal acima da meta.`, action:'Evite refeicoes extras hoje.'});

  if (!t.trainingDone) {
    const d = c.daysSinceLastTraining;
    if (d !== null && d >= 3) alerts.push({type:'bad', title:`${d} dias sem treinar`, impact:'Frequencia abaixo do ideal.', action:'Treinar hoje, mesmo que seja uma sessao curta.'});
    else alerts.push({type:'info', title:'Treino nao registrado hoje', impact:'Nao sabemos se voce treinou.', action:'Registre seus exercicios e marque como concluido.'});
  }

  if (c.daysSinceLastWeight !== null && c.daysSinceLastWeight >= 5)
    alerts.push({type:'warn', title:`${c.daysSinceLastWeight} dias sem registrar peso`, impact:'Projecao fica imprecisa sem dados regulares.', action:'Pese-se amanha cedo, em jejum.'});
  else if (c.daysSinceLastWeight === null)
    alerts.push({type:'info', title:'Nenhuma pesagem registrada', impact:'Sem historico de peso, nao ha projecao.', action:'Registre seu peso na secao Progresso Fisico.'});

  if (c.weightTrend === 'regressing') alerts.push({type:'bad', title:'Peso indo na direcao errada', impact:'Nos ultimos 14 dias seu peso esta contra a meta.', action:'Revise deficit calorico, qualidade das refeicoes e sono.'});
  if (c.weightTrend === 'stagnated' && STATE.weightHistory.length >= 4) alerts.push({type:'warn', title:'Peso estagnado (14 dias)', impact:'Corpo adaptou ao deficit atual.', action:'Reduza 100-150 kcal/dia ou aumente atividade fisica.'});

  TRACKED_EXERCISES.forEach(ex => {
    const records = getAllExerciseRecords(ex);
    if (records.length >= 2) {
      const last = records[records.length-1].weight;
      const prev = records[records.length-2].weight;
      if (last < prev) alerts.push({type:'warn', title:`Queda de carga: ${capitalize(ex)}`, impact:`De ${prev}kg para ${last}kg.`, action:'Verifique sono, proteina e volume de treino.'});
      else if (last > prev) alerts.push({type:'good', title:`Progressao: ${capitalize(ex)}`, impact:`${prev}kg → ${last}kg. Forca aumentando.`, action:'Continue a sobrecarga progressiva.'});
    }
  });

  if (g.protein > 0 && totalProt >= g.protein) alerts.push({type:'good', title:'Meta de proteina batida', impact:`${totalProt.toFixed(0)}g consumidos.`, action:'Continue priorizando fontes proteicas.'});
  if (t.trainingDone) alerts.push({type:'good', title:'Treino concluido', impact:'Estimulo muscular gerado.', action:'Garanta boa noite de sono e proteina adequada.'});
  if (c.trainingCountLast7 >= 4) alerts.push({type:'good', title:`${c.trainingCountLast7} treinos essa semana`, impact:'Alta consistencia de treino.', action:'Mantenha o ritmo.'});
  if (c.weightTrend === 'improving') alerts.push({type:'good', title:'Tendencia de peso positiva', impact:'Voce esta evoluindo na direcao certa.', action:'Nao mude o que esta funcionando.'});

  return alerts;
}

// ===================================================
//  RENDER — HOME
// ===================================================
function renderHome() {
  const t  = STATE.todayLog;
  const g  = STATE.goals;
  const wh = STATE.weightHistory;

  const totalCal  = t.foods.reduce((a,f) => a+f.calories, 0);
  const totalProt = t.foods.reduce((a,f) => a+f.protein, 0);
  const totalCarb = t.foods.reduce((a,f) => a+f.carb, 0);
  const totalFat  = t.foods.reduce((a,f) => a+f.fat, 0);

  const currW = wh.length>0 ? parseFloat(wh[wh.length-1].weight) : parseFloat(g.currentWeight)||0;
  const tgtW  = parseFloat(g.targetWeight)||0;

  // KPIs
  const kwv = document.getElementById('kpi-weight-val');
  kwv.textContent = currW>0 ? currW.toFixed(1) : '—'; animKPI(kwv);
  if (wh.length >= 2) {
    const delta = currW - parseFloat(wh[wh.length-2].weight);
    const el = document.getElementById('kpi-weight-delta');
    el.textContent = (delta>0?'+':'') + delta.toFixed(1) + 'kg';
    el.style.color = delta<=0 ? 'var(--green)' : 'var(--red)';
  }
  document.getElementById('kpi-goal-weight-val').textContent = tgtW>0 ? tgtW.toFixed(1) : '—';
  if (currW && tgtW) {
    const dist = currW - tgtW;
    const el = document.getElementById('kpi-goal-distance');
    el.textContent = Math.abs(dist).toFixed(1) + 'kg ' + (dist>0?'acima':'abaixo') + ' da meta';
    el.style.color = Math.abs(dist)<1?'var(--green)':Math.abs(dist)<3?'var(--yellow)':'var(--text-secondary)';
  }
  const kcv = document.getElementById('kpi-calories-val');
  kcv.textContent = totalCal; animKPI(kcv);
  document.getElementById('kpi-calorie-target').textContent = g.calories ? `meta: ${g.calories} kcal` : 'Meta nao definida';

  const balance = totalCal - g.calories;
  const kbv = document.getElementById('kpi-deficit-val');
  kbv.textContent = (balance>=0?'+':'') + balance; animKPI(kbv);
  document.getElementById('kpi-deficit-label').textContent = balance<0?'deficit':'superavit';
  document.getElementById('kpi-deficit-label').style.color = balance<0?'var(--green)':'var(--red)';
  document.getElementById('kpi-deficit').className = 'kpi-card ' + (balance<0?'status-good':balance>200?'status-bad':'status-warn');

  const kpv = document.getElementById('kpi-protein-val');
  kpv.textContent = totalProt.toFixed(0); animKPI(kpv);
  document.getElementById('kpi-protein-target').textContent = g.protein ? `meta: ${g.protein}g` : 'Meta nao definida';
  const ps = !g.protein?'':totalProt>=g.protein?'status-good':totalProt>=g.protein*0.8?'status-warn':'status-bad';
  document.getElementById('kpi-protein').className = 'kpi-card ' + ps;

  const ktv = document.getElementById('kpi-training-val');
  ktv.textContent = t.trainingDone ? 'Concluido' : 'Pendente';
  ktv.style.color = t.trainingDone ? 'var(--green)' : 'var(--text-muted)';
  document.getElementById('kpi-training-label').textContent = t.trainingDone ? (t.trainingType || 'Registrado') : 'Nenhum registrado';

  // Macro bars
  const setBar = (barId, pctElId, val, max) => {
    const pct = max>0 ? (val/max)*100 : 0;
    document.getElementById(barId).style.width = clamp(pct,0,100) + '%';
    document.getElementById(pctElId).textContent = Math.round(pct) + '%';
  };
  setBar('bar-protein','pct-protein',totalProt,g.protein);
  setBar('bar-carb','pct-carb',totalCarb,g.carb);
  setBar('bar-fat','pct-fat',totalFat,g.fat);
  document.getElementById('total-protein-g').textContent = totalProt.toFixed(0)+'g prot';
  document.getElementById('total-carb-g').textContent    = totalCarb.toFixed(0)+'g carb';
  document.getElementById('total-fat-g').textContent     = totalFat.toFixed(0)+'g gord';

  // Score
  const {score, breakdown} = calcScore();
  document.getElementById('score-number').textContent       = score;
  document.getElementById('topbar-score-value').textContent = score;
  document.getElementById('score-class').textContent        = getScoreClass(score);
  document.getElementById('score-phrase').textContent       = getScorePhrase(score, totalProt, g);
  const circ = 326.7;
  const fill = document.getElementById('score-ring-fill');
  fill.style.strokeDashoffset = circ - (score/100)*circ;
  fill.style.stroke = getScoreColor(score);
  document.getElementById('score-breakdown').innerHTML = breakdown.map(b =>
    `<div class="score-item"><span>${b.label}</span><span class="pts">+${b.pts}</span></div>`
  ).join('');

  // Coach
  renderCoach(totalCal, totalProt, totalCarb, totalFat, score);

  // Projecao home card
  renderProjectionHomeCard();
}

function renderCoach(totalCal, totalProt, totalCarb, totalFat, score) {
  const {problems, positives, infos} = buildDiagnosis(totalCal, totalProt, totalCarb, totalFat);
  const {msg, status} = getCoachMainMessage(problems, positives, score);
  const c = analyzeConsistency();

  document.getElementById('coach-main-msg').textContent = msg;

  const statusDot  = document.getElementById('day-status-dot');
  const statusText = document.getElementById('day-status-text');
  statusDot.className  = 'day-status-dot ' + (status!=='neutral' ? status : '');
  statusText.textContent = {green:'Excelente',yellow:'Atencao',red:'Revisar',neutral:'—'}[status] || '—';

  ['green','yellow','red'].forEach(s => {
    document.getElementById('sem-'+s).className = 'semaforo-item' + (status===s?' active':'');
  });

  const cb = document.getElementById('coach-block');
  cb.className = 'coach-block status-' + (status==='neutral'?'yellow':status);

  const allItems = [...problems, ...infos, ...positives];
  const filtered = allItems.filter((item,i) => {
    if (i===0 && ((status==='red'&&item.type==='bad')||(status==='yellow'&&item.type==='warn'))) return false;
    return true;
  }).slice(0,4);

  document.getElementById('coach-actions').innerHTML = filtered.map(item => {
    const icons = {bad:'!',warn:'~',good:'+',info:'i'};
    return `<div class="coach-action-item type-${item.type}"><span class="coach-action-icon">${icons[item.type]||'·'}</span><span>${item.msg}</span></div>`;
  }).join('');

  const rows = [];
  if (c.trainingCountLast7 !== null) rows.push(`Treinos (7 dias) <span>${c.trainingCountLast7}</span>`);
  if (c.daysSinceLastTraining !== null) rows.push(`Ultimo treino <span>${c.daysSinceLastTraining===0?'hoje':c.daysSinceLastTraining+'d atras'}</span>`);
  if (c.daysSinceLastWeight !== null) rows.push(`Ultima pesagem <span>${c.daysSinceLastWeight===0?'hoje':c.daysSinceLastWeight+'d atras'}</span>`);
  if (c.avgWeeklyLoss !== null) rows.push(`Ritmo semanal <span>${c.avgWeeklyLoss.toFixed(2)} kg/sem</span>`);
  if (c.weightTrend) rows.push(`Tendencia <span>${{improving:'Progredindo',stagnated:'Estagnado',regressing:'Regressivo'}[c.weightTrend]}</span>`);

  const consEl = document.getElementById('coach-consistency');
  consEl.innerHTML = rows.length>0
    ? '<div class="consistency-title">HISTORICO RECENTE</div>' + rows.map(r=>`<div class="consistency-item">${r}</div>`).join('')
    : '';
}

function renderProjectionHomeCard() {
  const proj = calcProjection();
  const mainEl = document.getElementById('proj-home-main');
  const subEl  = document.getElementById('proj-home-sub');
  const paceWrap = document.getElementById('proj-home-pace-wrap');
  const paceEl = document.getElementById('proj-home-pace-badge');
  const etaEl  = document.getElementById('proj-home-eta');
  const barEl  = document.getElementById('proj-home-bar');

  if (!proj) {
    mainEl.textContent = 'Defina metas para ver a projecao';
    subEl.textContent  = '';
    etaEl.textContent  = '';
    barEl.style.width  = '0%';
    paceWrap.style.display = 'none';
    return;
  }

  mainEl.textContent = `Faltam ${proj.diff.toFixed(1)} kg para sua meta`;
  subEl.textContent  = proj.daysEst
    ? `Mantendo o ritmo atual, voce chega em aproximadamente ${proj.daysEst} dias`
    : 'Registre mais pesagens para calcular a estimativa';
  barEl.style.width = clamp(proj.pct,0,100) + '%';
  etaEl.textContent = `${proj.pct.toFixed(0)}% do objetivo concluido`;

  if (proj.pace) {
    paceWrap.style.display = 'flex';
    paceEl.textContent = proj.paceLabel;
    paceEl.className   = 'proj-home-pace-badge ' + proj.pace;
  } else {
    paceWrap.style.display = 'none';
  }
}

// ===================================================
//  RENDER — NUTRITION
// ===================================================
function renderNutrition() {
  const t = STATE.todayLog;
  const g = STATE.goals;
  const totalCal  = t.foods.reduce((a,f) => a+f.calories, 0);
  const totalProt = t.foods.reduce((a,f) => a+f.protein, 0);
  const totalCarb = t.foods.reduce((a,f) => a+f.carb, 0);
  const totalFat  = t.foods.reduce((a,f) => a+f.fat, 0);

  document.getElementById('nut-cal-consumed').textContent = totalCal;
  document.getElementById('nut-cal-target').textContent   = g.calories || '—';
  const calPct = g.calories ? (totalCal/g.calories)*100 : 0;
  const barCal = document.getElementById('bar-calorie-main');
  barCal.style.width = clamp(calPct,0,100) + '%';
  barCal.className   = 'bar-fill bar-calorie' + (calPct>110?' over':'');
  const bal = totalCal - (g.calories||0);
  const balEl = document.getElementById('calorie-balance-text');
  balEl.textContent = g.calories ? (bal<0?`Deficit de ${Math.abs(bal)} kcal`:`Superavit de ${bal} kcal`) : 'Meta nao definida';
  balEl.style.color = bal<0 ? 'var(--green)' : 'var(--red)';

  const macros = [
    {name:'Proteina', val:totalProt, goal:g.protein, bar:'bar-protein'},
    {name:'Carboidrato', val:totalCarb, goal:g.carb, bar:'bar-carb'},
    {name:'Gordura', val:totalFat, goal:g.fat, bar:'bar-fat'},
  ];
  document.getElementById('macro-detail-rows').innerHTML = macros.map(m => {
    const pct = m.goal ? clamp((m.val/m.goal)*100,0,100) : 0;
    return `<div class="macro-detail-row">
      <div class="macro-detail-info"><span class="macro-detail-name">${m.name}</span><span class="macro-detail-nums">${m.val.toFixed(0)}g / ${m.goal||'—'}g</span></div>
      <div class="bar-wrap"><div class="bar-fill ${m.bar}" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');

  const tbody = document.getElementById('food-log-body');
  if (t.foods.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="6">Nenhum alimento registrado hoje.</td></tr>`;
  } else {
    tbody.innerHTML = t.foods.map((f,i) => `<tr>
      <td>${f.name}</td><td>${f.calories}</td><td>${f.protein}g</td><td>${f.carb}g</td><td>${f.fat}g</td>
      <td><button class="btn-remove" data-i="${i}">remover</button></td>
    </tr>`).join('');
    tbody.querySelectorAll('.btn-remove').forEach(btn =>
      btn.addEventListener('click', () => { STATE.todayLog.foods.splice(parseInt(btn.dataset.i),1); saveAll(); renderAll(); })
    );
  }
}

function renderQuickFoods() {
  // Quick foods = primeiros 8 do banco (proteinas + carbs)
  const quick = STATE.foodDB.filter(f => f.isDefault).slice(0, 8);
  const el = document.getElementById('quick-foods');
  el.innerHTML = quick.map(f =>
    `<button class="quick-food-btn" data-id="${f.id}">${f.name.split(' ')[0]}</button>`
  ).join('');
  el.querySelectorAll('.quick-food-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const food = STATE.foodDB.find(f => f.id === btn.dataset.id);
      if (!food) return;
      // Adiciona 100g por padrão
      STATE.todayLog.foods.push({name:food.name, calories:food.cal, protein:food.protein, carb:food.carb, fat:food.fat});
      saveAll(); renderAll();
      showToast(`${food.name} adicionado`, 'good');
    });
  });
}

// ===================================================
//  FOOD SEARCH
// ===================================================
function initFoodSearch() {
  const searchInput  = document.getElementById('food-search-input');
  const searchResults= document.getElementById('food-search-results');
  const clearBtn     = document.getElementById('food-search-clear');
  const addPanel     = document.getElementById('food-add-panel');
  const qtyInput     = document.getElementById('food-qty');

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    clearBtn.style.display = q ? 'block' : 'none';
    if (!q) { searchResults.innerHTML = ''; addPanel.style.display = 'none'; return; }

    const results = STATE.foodDB.filter(f =>
      f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
    ).slice(0, 12);

    if (results.length === 0) {
      searchResults.innerHTML = `<div class="food-no-results">Nenhum alimento encontrado. Cadastre no Banco de Alimentos.</div>`;
      return;
    }

    searchResults.innerHTML = results.map(f => `
      <div class="food-result-item" data-id="${f.id}">
        <div>
          <div class="food-result-name">${f.name}</div>
          <div class="food-result-cat">${f.category} · por 100g</div>
        </div>
        <div class="food-result-macros">
          <div class="food-result-macro"><span class="food-result-macro-val">${f.cal}</span><span class="food-result-macro-label">KCAL</span></div>
          <div class="food-result-macro"><span class="food-result-macro-val">${f.protein}g</span><span class="food-result-macro-label">PROT</span></div>
          <div class="food-result-macro"><span class="food-result-macro-val">${f.carb}g</span><span class="food-result-macro-label">CARB</span></div>
          <div class="food-result-macro"><span class="food-result-macro-val">${f.fat}g</span><span class="food-result-macro-label">GORD</span></div>
        </div>
      </div>
    `).join('');

    searchResults.querySelectorAll('.food-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const food = STATE.foodDB.find(f => f.id === item.dataset.id);
        if (!food) return;
        STATE.foodSearch.selectedFood = food;
        openFoodAddPanel(food);
        searchResults.innerHTML = '';
      });
    });
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = ''; clearBtn.style.display = 'none';
    searchResults.innerHTML = ''; addPanel.style.display = 'none';
    STATE.foodSearch.selectedFood = null;
  });

  qtyInput.addEventListener('input', () => {
    if (STATE.foodSearch.selectedFood) updateMacrosPreview(STATE.foodSearch.selectedFood, parseFloat(qtyInput.value)||100);
  });

  document.getElementById('btn-confirm-add-food').addEventListener('click', () => {
    const food = STATE.foodSearch.selectedFood;
    if (!food) return;
    const qty = parseFloat(qtyInput.value) || 100;
    const factor = qty / 100;
    STATE.todayLog.foods.push({
      name: `${food.name} (${qty}g)`,
      calories: Math.round(food.cal * factor),
      protein:  parseFloat((food.protein * factor).toFixed(1)),
      carb:     parseFloat((food.carb * factor).toFixed(1)),
      fat:      parseFloat((food.fat * factor).toFixed(1)),
    });
    saveAll(); renderAll();
    showToast(`${food.name} adicionado`, 'good');
    // Reset
    searchInput.value = ''; clearBtn.style.display = 'none';
    searchResults.innerHTML = ''; addPanel.style.display = 'none';
    STATE.foodSearch.selectedFood = null;
    qtyInput.value = '100';
  });

  document.getElementById('btn-cancel-food-search').addEventListener('click', () => {
    addPanel.style.display = 'none';
    STATE.foodSearch.selectedFood = null;
    searchInput.value = ''; clearBtn.style.display = 'none';
    searchResults.innerHTML = '';
  });
}

function openFoodAddPanel(food) {
  const panel = document.getElementById('food-add-panel');
  document.getElementById('food-add-selected').textContent = food.name;
  document.getElementById('food-qty').value = '100';
  panel.style.display = 'block';
  updateMacrosPreview(food, 100);
}

function updateMacrosPreview(food, qty) {
  const f = qty / 100;
  document.getElementById('food-add-macros-preview').innerHTML = `
    <div class="macro-preview-item"><div class="macro-preview-val">${Math.round(food.cal*f)}</div><div class="macro-preview-label">KCAL</div></div>
    <div class="macro-preview-item"><div class="macro-preview-val">${(food.protein*f).toFixed(1)}g</div><div class="macro-preview-label">PROT</div></div>
    <div class="macro-preview-item"><div class="macro-preview-val">${(food.carb*f).toFixed(1)}g</div><div class="macro-preview-label">CARB</div></div>
    <div class="macro-preview-item"><div class="macro-preview-val">${(food.fat*f).toFixed(1)}g</div><div class="macro-preview-label">GORD</div></div>
  `;
}

// ===================================================
//  RENDER — FOOD DATABASE
// ===================================================
function renderFoodDB() {
  const filterCat = document.getElementById('db-filter-category').value;
  const list = document.getElementById('fooddb-list');
  document.getElementById('db-count').textContent = STATE.foodDB.length;

  const filtered = filterCat ? STATE.foodDB.filter(f => f.category === filterCat) : STATE.foodDB;

  if (filtered.length === 0) {
    list.innerHTML = '<div class="fooddb-empty">Nenhum alimento encontrado.</div>';
    return;
  }

  // Agrupa por categoria
  const grouped = {};
  filtered.forEach(f => {
    if (!grouped[f.category]) grouped[f.category] = [];
    grouped[f.category].push(f);
  });

  list.innerHTML = Object.entries(grouped).map(([cat, foods]) => `
    <div class="fooddb-cat-header">${cat}</div>
    ${foods.map(f => `
      <div class="fooddb-item">
        <div class="fooddb-item-left">
          <div class="fooddb-item-name">${f.name}</div>
          <div class="fooddb-item-cat">por 100g</div>
        </div>
        <div class="fooddb-item-macros">
          <span>${f.cal} kcal</span>
          <span>${f.protein}g P</span>
          <span>${f.carb}g C</span>
          <span>${f.fat}g G</span>
        </div>
        <div class="fooddb-item-btns">
          ${!f.isDefault ? `<button class="btn-edit-sm" data-id="${f.id}">editar</button>` : ''}
          ${!f.isDefault ? `<button class="btn-remove" data-id="${f.id}">rem</button>` : ''}
        </div>
      </div>`).join('')}
  `).join('');

  list.querySelectorAll('.btn-edit-sm').forEach(btn => {
    btn.addEventListener('click', () => editFoodDB(btn.dataset.id));
  });
  list.querySelectorAll('[data-id].btn-remove').forEach(btn => {
    btn.addEventListener('click', () => deleteFoodDB(btn.dataset.id));
  });
}

function editFoodDB(id) {
  const food = STATE.foodDB.find(f => f.id === id);
  if (!food) return;
  document.getElementById('db-food-name').value    = food.name;
  document.getElementById('db-food-category').value= food.category;
  document.getElementById('db-food-calories').value= food.cal;
  document.getElementById('db-food-protein').value = food.protein;
  document.getElementById('db-food-carb').value    = food.carb;
  document.getElementById('db-food-fat').value     = food.fat;
  document.getElementById('db-food-editing-id').value = id;
  document.getElementById('fooddb-form-title').textContent = 'EDITAR ALIMENTO';
  document.getElementById('btn-cancel-db-edit').style.display = 'block';
  document.getElementById('btn-save-db-food').textContent = 'Salvar alteracoes';
}

function deleteFoodDB(id) {
  if (!confirm('Remover este alimento do banco?')) return;
  STATE.foodDB = STATE.foodDB.filter(f => f.id !== id);
  saveAll(); renderFoodDB(); renderQuickFoods();
  showToast('Alimento removido.');
}

function cancelEditFoodDB() {
  document.getElementById('db-food-editing-id').value = '';
  ['db-food-name','db-food-calories','db-food-protein','db-food-carb','db-food-fat'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fooddb-form-title').textContent = 'CADASTRAR ALIMENTO';
  document.getElementById('btn-cancel-db-edit').style.display = 'none';
  document.getElementById('btn-save-db-food').textContent = 'Salvar alimento';
}

function initFoodDB() {
  document.getElementById('btn-save-db-food').addEventListener('click', () => {
    const name     = document.getElementById('db-food-name').value.trim();
    const category = document.getElementById('db-food-category').value;
    const cal      = parseFloat(document.getElementById('db-food-calories').value) || 0;
    const protein  = parseFloat(document.getElementById('db-food-protein').value)  || 0;
    const carb     = parseFloat(document.getElementById('db-food-carb').value)     || 0;
    const fat      = parseFloat(document.getElementById('db-food-fat').value)      || 0;
    const editId   = document.getElementById('db-food-editing-id').value;

    if (!name) { showToast('Informe o nome do alimento.','warn'); return; }
    if (!cal)  { showToast('Informe as calorias.','warn'); return; }

    if (editId) {
      const idx = STATE.foodDB.findIndex(f => f.id === editId);
      if (idx !== -1) STATE.foodDB[idx] = { ...STATE.foodDB[idx], name, category, cal, protein, carb, fat };
      showToast('Alimento atualizado.','good');
    } else {
      STATE.foodDB.push({ id:uid(), name, category, cal, protein, carb, fat, isDefault:false });
      showToast(`${name} cadastrado no banco.`,'good');
    }

    saveAll(); renderFoodDB(); renderQuickFoods(); cancelEditFoodDB();
  });

  document.getElementById('btn-cancel-db-edit').addEventListener('click', cancelEditFoodDB);
  document.getElementById('db-filter-category').addEventListener('change', renderFoodDB);
}

// ===================================================
//  RENDER — TRAINING V2 (simplified, type-based)
// ===================================================
function renderTraining() {
  const t = STATE.todayLog;
  const statusEl = document.getElementById('training-today-status');

  if (!t.trainingDone) {
    statusEl.innerHTML = '<div class="tts-empty">Nenhum treino registrado hoje.</div>';
  } else {
    const exList = t.trainingExercises
      ? t.trainingExercises.split(',').map(e => e.trim()).filter(Boolean)
      : [];
    statusEl.innerHTML = `<div class="tts-done">
      <span class="tts-type-badge">${t.trainingType || 'Treino'}</span>
      ${t.trainingObs ? `<div class="tts-obs">${t.trainingObs}</div>` : ''}
      ${exList.length > 0 ? `<div class="tts-ex-list">${exList.map(e => `<span class="tts-ex-tag">${e}</span>`).join('')}</div>` : ''}
    </div>`;
  }

  // Sync type pills
  document.querySelectorAll('.type-pill').forEach(pill => {
    pill.classList.toggle('selected', pill.dataset.type === t.trainingType);
  });

  // History
  const hist = document.getElementById('training-history-v2');
  const sessions = [...STATE.trainingHistory].reverse();
  if (sessions.length === 0) {
    hist.innerHTML = '<p style="color:var(--text-muted);font-size:12px;padding:8px 0">Nenhum treino arquivado.</p>';
  } else {
    hist.innerHTML = sessions.map((s, i) => {
      const exList = s.exercises
        ? s.exercises.split(',').map(e => e.trim()).filter(Boolean)
        : [];
      return `<div class="th2-session">
        <span class="th2-date">${formatDate(s.date)}</span>
        <span class="th2-type">${s.type || '—'}</span>
        <span class="th2-obs">${s.obs || ''}</span>
        <div class="th2-exs">${exList.map(e => `<span class="th2-ex">${e}</span>`).join('')}</div>
        <button class="btn-remove th2-remove" data-i="${STATE.trainingHistory.length - 1 - i}">rem</button>
      </div>`;
    }).join('');
    hist.querySelectorAll('.btn-remove').forEach(btn =>
      btn.addEventListener('click', () => {
        STATE.trainingHistory.splice(parseInt(btn.dataset.i), 1);
        saveAll(); renderAll();
      })
    );
  }
}

// ===================================================
//  RENDER — LOAD TRACKING
// ===================================================
function renderLoadTrack() {
  const lh = STATE.loadHistory;

  // Build unique exercise names for filter + datalist
  const exNames = [...new Set(lh.map(r => r.exercise))].sort();
  const datalist = document.getElementById('lt-ex-suggestions');
  if (datalist) datalist.innerHTML = exNames.map(n => `<option value="${n}">`).join('');

  const filterSelect = document.getElementById('lt-filter-ex');
  if (filterSelect) {
    const current = filterSelect.value;
    filterSelect.innerHTML = '<option value="">Todos os exercicios</option>' +
      exNames.map(n => `<option value="${n}" ${n===current?'selected':''}>${n}</option>`).join('');
  }

  // Exercise summary cards
  const listEl = document.getElementById('lt-exercise-list');
  if (exNames.length === 0) {
    listEl.innerHTML = '<div class="lt-empty">Nenhum exercicio registrado ainda.</div>';
  } else {
    listEl.innerHTML = exNames.map(name => {
      const records = lh.filter(r => r.exercise === name).sort((a,b) => a.date.localeCompare(b.date));
      const last = records[records.length - 1];
      const prev = records.length >= 2 ? records[records.length - 2] : null;
      let trendClass = 'lt-trend-same', trendText = 'Estagnado';
      if (prev) {
        const diff = parseFloat(last.weight) - parseFloat(prev.weight);
        if (diff > 0)       { trendClass = 'lt-trend-up';   trendText = `+${diff.toFixed(1)}kg vs anterior`; }
        else if (diff < 0)  { trendClass = 'lt-trend-down'; trendText = `${diff.toFixed(1)}kg vs anterior`; }
        else                { trendText = 'Mesmo peso que anterior'; }
      }
      const vol = last.sets && last.reps ? `${last.sets}x${last.reps} = ${(last.sets * last.reps * parseFloat(last.weight)).toFixed(0)}kg vol` : '';
      return `<div class="lt-ex-card">
        <div class="lt-ex-name">${name}</div>
        <div class="lt-ex-stats">
          <div class="lt-ex-stat"><div class="lt-ex-stat-val">${last.weight}kg</div><div class="lt-ex-stat-label">ULTIMA CARGA</div></div>
          <div class="lt-ex-stat"><div class="lt-ex-stat-val">${records.length}</div><div class="lt-ex-stat-label">REGISTROS</div></div>
        </div>
        <div class="lt-ex-trend ${trendClass}">${trendText}</div>
        ${vol ? `<div style="font-size:10px;color:var(--text-muted);margin-top:3px">${vol}</div>` : ''}
      </div>`;
    }).join('');
  }

  // History table
  const filterVal = filterSelect ? filterSelect.value : '';
  const filtered = filterVal ? lh.filter(r => r.exercise === filterVal) : lh;
  const sorted = [...filtered].sort((a,b) => b.date.localeCompare(a.date));
  const tbody = document.getElementById('lt-history-body');
  if (sorted.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="8">Nenhum registro de carga ainda.</td></tr>`;
  } else {
    tbody.innerHTML = sorted.map((r, i) => {
      const vol = r.sets && r.reps ? (r.sets * r.reps * parseFloat(r.weight)).toFixed(0) : '—';
      const origIdx = lh.indexOf(r);
      return `<tr>
        <td>${formatDate(r.date)}</td>
        <td>${r.exercise}</td>
        <td style="font-family:var(--font-display);font-weight:700;color:var(--text-primary)">${r.weight}kg</td>
        <td>${r.sets||'—'}</td>
        <td>${r.reps||'—'}</td>
        <td>${vol}</td>
        <td style="color:var(--text-muted)">${r.note||'—'}</td>
        <td><button class="btn-remove" data-i="${origIdx}">rem</button></td>
      </tr>`;
    }).join('');
    tbody.querySelectorAll('.btn-remove').forEach(btn =>
      btn.addEventListener('click', () => {
        STATE.loadHistory.splice(parseInt(btn.dataset.i), 1);
        saveAll(); renderAll();
      })
    );
  }
}

// ===================================================
//  RENDER — PROGRESS
// ===================================================
function renderProgress() {
  const wh = STATE.weightHistory;
  if (wh.length===0) {
    ['prog-initial-weight','prog-current-weight','prog-total-change','prog-7day-avg'].forEach(id => document.getElementById(id).textContent='—');
  } else {
    const sorted = [...wh].sort((a,b) => a.date.localeCompare(b.date));
    const first  = sorted[0], last = sorted[sorted.length-1];
    const change = parseFloat(last.weight) - parseFloat(first.weight);
    document.getElementById('prog-initial-weight').textContent = parseFloat(first.weight).toFixed(1)+'kg';
    document.getElementById('prog-current-weight').textContent = parseFloat(last.weight).toFixed(1)+'kg';
    const chEl = document.getElementById('prog-total-change');
    chEl.textContent = (change>=0?'+':'')+change.toFixed(1)+'kg';
    chEl.style.color = change<=0?'var(--green)':'var(--red)';
    const last7 = sorted.filter(w => daysBetween(w.date,getTodayStr())<=7);
    if (last7.length>0) {
      const avg = last7.reduce((a,w)=>a+parseFloat(w.weight),0)/last7.length;
      document.getElementById('prog-7day-avg').textContent = avg.toFixed(1)+'kg';
    }
  }

  const tbody = document.getElementById('weight-history-body');
  if (wh.length===0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="6">Nenhuma pesagem registrada.</td></tr>`;
  } else {
    const sorted = [...wh].sort((a,b)=>b.date.localeCompare(a.date));
    tbody.innerHTML = sorted.map((w,i)=>{
      const next = sorted[i+1];
      const delta = next ? (parseFloat(w.weight)-parseFloat(next.weight)).toFixed(1) : '—';
      const dc = delta!=='—'?(parseFloat(delta)<=0?'var(--green)':'var(--red)'):'var(--text-muted)';
      return `<tr>
        <td>${formatDate(w.date)}</td><td>${parseFloat(w.weight).toFixed(1)} kg</td>
        <td>${w.fatPct?w.fatPct+'%':'—'}</td>
        <td style="color:${dc}">${delta!=='—'?(parseFloat(delta)>=0?'+':'')+delta:'—'}</td>
        <td>${w.note||'—'}</td>
        <td><button class="btn-remove" data-d="${w.date}">rem</button></td>
      </tr>`;
    }).join('');
    tbody.querySelectorAll('.btn-remove').forEach(btn =>
      btn.addEventListener('click',()=>{STATE.weightHistory=STATE.weightHistory.filter(w=>w.date!==btn.dataset.d);saveAll();renderAll();})
    );
  }

  drawWeightChart();
  renderPhotos();
}

function renderPhotos() {
  ['front','side','back'].forEach(type=>{
    const el=document.getElementById('preview-'+type);
    if(STATE.photos[type]) el.innerHTML=`<img src="${STATE.photos[type]}" alt="Foto ${type}" />`;
  });
}

// ===================================================
//  RENDER — BIOIMPEDÂNCIA
// ===================================================
function renderBioimp() {
  const bh = STATE.bioimpHistory;

  // Ultimo registro
  const latestEl = document.getElementById('bioimp-latest');
  if (bh.length === 0) {
    latestEl.innerHTML = '<p style="color:var(--text-muted);font-size:12px;padding:8px 0">Nenhum registro ainda.</p>';
  } else {
    const last = bh[bh.length-1];
    const prev = bh.length>=2 ? bh[bh.length-2] : null;
    const fields = [
      {label:'Peso',       val:last.weight,    unit:'kg', prev:prev?.weight},
      {label:'% Gordura',  val:last.fatPct,    unit:'%',  prev:prev?.fatPct},
      {label:'Massa Magra',val:last.lean,       unit:'kg', prev:prev?.lean},
      {label:'Musculo',    val:last.muscle,     unit:'kg', prev:prev?.muscle},
      {label:'IMC',        val:last.bmi,        unit:'',   prev:prev?.bmi},
      {label:'TMB',        val:last.bmr,        unit:'kcal',prev:prev?.bmr},
      {label:'Agua',       val:last.water,      unit:'%',  prev:prev?.water},
      {label:'G.Visceral', val:last.visceral,   unit:'',   prev:prev?.visceral},
      {label:'Id.Metab.',  val:last.metage,     unit:'anos',prev:prev?.metage},
      {label:'Ossea',      val:last.bone,       unit:'kg', prev:prev?.bone},
    ].filter(f => f.val !== undefined && f.val !== null && f.val !== '');

    latestEl.innerHTML = fields.map(f => {
      const delta = f.prev !== undefined && f.prev !== null && f.val !== undefined
        ? (parseFloat(f.val) - parseFloat(f.prev)).toFixed(1) : null;
      const isBad = (f.label==='% Gordura'||f.label==='G.Visceral') && delta>0 || (f.label==='Massa Magra'||f.label==='Musculo') && delta<0;
      const isGood = (f.label==='% Gordura'||f.label==='G.Visceral') && delta<0 || (f.label==='Massa Magra'||f.label==='Musculo') && delta>0;
      return `<div class="bioimp-latest-item">
        <div class="bioimp-latest-label">${f.label}</div>
        <div class="bioimp-latest-val">${f.val}${f.unit}</div>
        ${delta!==null?`<div class="bioimp-latest-delta" style="color:${isGood?'var(--green)':isBad?'var(--red)':'var(--text-muted)'}">${parseFloat(delta)>=0?'+':''}${delta}</div>`:''}
      </div>`;
    }).join('');

    // Mapa segmentar se tiver dados
    const hasSegmental = last.ms_trunk || last.ms_arm_l || last.fs_trunk;
    if (hasSegmental) {
      latestEl.innerHTML += `
        <div class="bio-body-map" style="grid-column:1/-1;margin-top:10px">
          <div class="bio-segment-col">
            <div class="bio-segment-title">MUSCULO SEGMENTAR (kg)</div>
            ${[['Tronco',last.ms_trunk],['Br. Esq.',last.ms_arm_l],['Br. Dir.',last.ms_arm_r],['Pn. Esq.',last.ms_leg_l],['Pn. Dir.',last.ms_leg_r]].filter(s=>s[1]).map(s=>`
              <div class="bio-segment-row"><span class="bio-segment-name">${s[0]}</span><span class="bio-segment-val">${s[1]}kg</span></div>`).join('')}
          </div>
          <div class="bio-segment-col">
            <div class="bio-segment-title">GORDURA SEGMENTAR (%)</div>
            ${[['Tronco',last.fs_trunk],['Br. Esq.',last.fs_arm_l],['Br. Dir.',last.fs_arm_r],['Pn. Esq.',last.fs_leg_l],['Pn. Dir.',last.fs_leg_r]].filter(s=>s[1]).map(s=>`
              <div class="bio-segment-row"><span class="bio-segment-name">${s[0]}</span><span class="bio-segment-val">${s[1]}%</span></div>`).join('')}
          </div>
        </div>`;
    }
  }

  // Tabela histórico
  const tbody = document.getElementById('bioimp-body');
  if (bh.length===0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="10">Nenhum registro de bioimpedancia.</td></tr>`;
  } else {
    tbody.innerHTML = [...bh].reverse().map((b,i)=>`<tr>
      <td>${formatDate(b.date)}</td>
      <td>${b.weight||'—'}</td>
      <td>${b.fatPct?b.fatPct+'%':'—'}</td>
      <td>${b.lean?b.lean+'kg':'—'}</td>
      <td>${b.muscle?b.muscle+'kg':'—'}</td>
      <td>${b.bmi||'—'}</td>
      <td>${b.bmr?b.bmr+' kcal':'—'}</td>
      <td>${b.visceral||'—'}</td>
      <td>${b.water?b.water+'%':'—'}</td>
      <td><button class="btn-remove" data-i="${bh.length-1-i}">rem</button></td>
    </tr>`).join('');
    tbody.querySelectorAll('.btn-remove').forEach(btn=>
      btn.addEventListener('click',()=>{STATE.bioimpHistory.splice(parseInt(btn.dataset.i),1);saveAll();renderAll();})
    );
  }

  drawBioChart();
}

// ===================================================
//  RENDER — GOALS
// ===================================================
function renderGoals() {
  const g = STATE.goals;
  const setVal = (id, v) => { if (document.getElementById(id) && v) document.getElementById(id).value = v; };
  setVal('goal-current-weight', g.currentWeight||'');
  setVal('goal-target-weight',  g.targetWeight||'');
  setVal('goal-calories',       g.calories||'');
  setVal('goal-protein',        g.protein||'');
  setVal('goal-carb',           g.carb||'');
  setVal('goal-fat',            g.fat||'');
  setVal('goal-deadline',       g.deadline||'');

  const proj = calcProjection();

  // Hero block
  const heroMain = document.getElementById('proj-hero-main');
  const heroEta  = document.getElementById('proj-hero-eta');
  if (proj) {
    heroMain.textContent = `Faltam ${proj.diff.toFixed(1)} kg para sua meta`;
    heroEta.textContent  = proj.daysEst
      ? `Mantendo o ritmo atual, voce chega em aproximadamente ${proj.daysEst} dias`
      : 'Registre mais pesagens para calcular a estimativa';
    document.getElementById('proj-hero-kg').textContent  = proj.diff.toFixed(1) + ' kg';
    document.getElementById('proj-hero-pct').textContent = proj.pct.toFixed(0) + '%';
    const paceEl = document.getElementById('proj-hero-pace');
    paceEl.textContent = proj.paceLabel || '—';
    paceEl.className = 'proj-hero-stat-val proj-pace ' + (proj.pace||'');
    document.getElementById('proj-hero-kgw').textContent = proj.avgPerWeek ? proj.avgPerWeek.toFixed(2)+' kg' : '—';
  } else {
    heroMain.textContent = 'Defina metas de peso para ver a projecao';
    heroEta.textContent  = '';
  }

  // Cenarios
  const scenariosEl = document.getElementById('proj-scenarios');
  if (proj && proj.scenarios && proj.scenarios.length) {
    scenariosEl.innerHTML = proj.scenarios.map(s =>
      `<div class="proj-scenario-row"><span class="proj-scenario-label">${s.label}</span><span class="proj-scenario-val">${s.days?'~'+s.days+' dias':'—'}</span></div>`
    ).join('');
  } else {
    scenariosEl.innerHTML = '<p style="color:var(--text-muted);font-size:12px;padding:8px 0">Registre pesagens para calcular cenarios.</p>';
  }

  // Resumo metas
  document.getElementById('goals-summary').innerHTML = [
    ['Calorias alvo', g.calories?g.calories+' kcal/dia':'—'],
    ['Proteina alvo', g.protein?g.protein+'g/dia':'—'],
    ['Carboidrato alvo', g.carb?g.carb+'g/dia':'—'],
    ['Gordura alvo', g.fat?g.fat+'g/dia':'—'],
    ['Prazo', g.deadline?formatDate(g.deadline):'—'],
  ].map(([l,v])=>`<div class="goal-summary-row"><span class="label">${l}</span><span class="value">${v}</span></div>`).join('');
}

// ===================================================
//  RENDER — ALERTS
// ===================================================
function renderAlerts() {
  const alerts = generateAlerts();
  const badCount = alerts.filter(a=>a.type==='bad'||a.type==='warn').length;
  const badge = document.getElementById('alert-badge');
  badge.textContent = badCount>0 ? String(badCount) : '';

  const grid = document.getElementById('alerts-grid');
  if (alerts.length===0) { grid.innerHTML='<div class="alert-empty">Nenhum alerta gerado.</div>'; return; }
  grid.innerHTML = alerts.map(a=>`
    <div class="alert-card alert-${a.type}">
      <div class="alert-title">${a.title}</div>
      ${a.impact?`<div class="alert-impact">${a.impact}</div>`:''}
      ${a.action?`<div class="alert-action">${a.action}</div>`:''}
    </div>`).join('');
}

// ===================================================
//  CHARTS
// ===================================================
function drawWeightChart() {
  drawLineChart('weight-chart','weight-chart-empty',
    STATE.weightHistory.map(w=>({date:w.date,val:parseFloat(w.weight)})),
    parseFloat(STATE.goals.targetWeight)||null, 'kg'
  );
}

function drawBioChart() {
  const bh = STATE.bioimpHistory;
  const data = bh.filter(b=>b.weight).map(b=>({date:b.date, val:parseFloat(b.weight)}));
  drawLineChart('bio-chart','bio-chart-empty', data, null, 'kg');
}

function drawLineChart(canvasId, emptyId, data, goalLine, unit) {
  const canvas  = document.getElementById(canvasId);
  const emptyMsg= document.getElementById(emptyId);
  if (!canvas) return;

  if (data.length < 2) {
    canvas.style.display='none';
    if (emptyMsg) { emptyMsg.style.display='block'; }
    return;
  }
  canvas.style.display='block';
  if (emptyMsg) emptyMsg.style.display='none';

  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth||700, H=210;
  canvas.width=W; canvas.height=H;
  const vals = data.map(d=>d.val);
  const minV = Math.min(...vals)-1.5, maxV=Math.max(...vals)+1.5;
  const padX=52, padY=22;
  const xS = i => padX+(i/(data.length-1))*(W-padX*2);
  const yS = v => padY+((maxV-v)/(maxV-minV))*(H-padY*2);

  ctx.clearRect(0,0,W,H);

  // Grid
  for(let i=0;i<=4;i++){
    const y=padY+(i/4)*(H-padY*2);
    ctx.strokeStyle='#252b37'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(padX,y); ctx.lineTo(W-padX,y); ctx.stroke();
    const val=maxV-(i/4)*(maxV-minV);
    ctx.fillStyle='#434e62'; ctx.font='10px Geist Mono, monospace';
    ctx.textAlign='right'; ctx.fillText(val.toFixed(1),padX-7,y+4);
  }

  // Area
  const grad=ctx.createLinearGradient(0,padY,0,H-padY);
  grad.addColorStop(0,'rgba(34,211,168,0.16)');
  grad.addColorStop(1,'rgba(34,211,168,0)');
  ctx.beginPath();
  ctx.moveTo(xS(0),yS(vals[0]));
  for(let i=1;i<vals.length;i++) ctx.lineTo(xS(i),yS(vals[i]));
  ctx.lineTo(xS(vals.length-1),H-padY); ctx.lineTo(xS(0),H-padY);
  ctx.closePath(); ctx.fillStyle=grad; ctx.fill();

  // Line
  ctx.beginPath(); ctx.moveTo(xS(0),yS(vals[0]));
  for(let i=1;i<vals.length;i++) ctx.lineTo(xS(i),yS(vals[i]));
  ctx.strokeStyle='#22d3a8'; ctx.lineWidth=2; ctx.lineJoin='round'; ctx.stroke();

  // Goal line
  if(goalLine && goalLine>minV && goalLine<maxV){
    const gy=yS(goalLine);
    ctx.setLineDash([5,4]); ctx.beginPath(); ctx.moveTo(padX,gy); ctx.lineTo(W-padX,gy);
    ctx.strokeStyle='rgba(240,180,41,0.55)'; ctx.lineWidth=1; ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='#f0b429'; ctx.font='9px Geist Mono, monospace'; ctx.textAlign='left';
    ctx.fillText('meta',W-padX+5,gy+4);
  }

  // Dots + dates
  data.forEach((d,i)=>{
    const x=xS(i),y=yS(d.val);
    ctx.beginPath(); ctx.arc(x,y,3.5,0,Math.PI*2); ctx.fillStyle='#22d3a8'; ctx.fill();
    if(i===0||i===data.length-1||data.length<=10){
      const [,,dd]=d.date.split('-');
      ctx.fillStyle='#434e62'; ctx.font='9px Geist Mono, monospace'; ctx.textAlign='center';
      ctx.fillText(dd,x,H-5);
    }
  });
}

// ===================================================
//  RENDER ALL
// ===================================================
function renderAll() {
  renderHome();
  renderNutrition();
  renderTraining();
  renderLoadTrack();
  renderProgress();
  renderBioimp();
  renderGoals();
  renderAlerts();
  renderFoodDB();
}

// ===================================================
//  EVENTOS — NUTRITION
// ===================================================
function initNutrition() {
  document.getElementById('btn-add-food').addEventListener('click', () => {
    const name = document.getElementById('food-name').value.trim();
    const cal  = parseFloat(document.getElementById('food-calories').value)||0;
    const prot = parseFloat(document.getElementById('food-protein').value)||0;
    const carb = parseFloat(document.getElementById('food-carb').value)||0;
    const fat  = parseFloat(document.getElementById('food-fat').value)||0;
    if (!name) { showToast('Informe o nome.','warn'); return; }
    if (!cal)  { showToast('Informe as calorias.','warn'); return; }
    STATE.todayLog.foods.push({name,calories:cal,protein:prot,carb,fat});
    saveAll(); renderAll();
    showToast(`${name} adicionado`,'good');
    ['food-name','food-calories','food-protein','food-carb','food-fat'].forEach(id=>document.getElementById(id).value='');
  });
  document.getElementById('btn-clear-food-log').addEventListener('click', () => {
    if(!confirm('Limpar todos os alimentos de hoje?')) return;
    STATE.todayLog.foods=[];
    saveAll(); renderAll(); showToast('Log alimentar limpo.');
  });
}

// ===================================================
//  EVENTOS — TRAINING V2
// ===================================================
function initTraining() {
  // Type pills selection
  document.querySelectorAll('.type-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      STATE.todayLog.trainingType = pill.dataset.type;
      document.querySelectorAll('.type-pill').forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
  });

  // Register training
  document.getElementById('btn-log-training').addEventListener('click', () => {
    if (!STATE.todayLog.trainingType) {
      showToast('Selecione o tipo de treino.', 'warn'); return;
    }
    STATE.todayLog.trainingDone     = true;
    STATE.todayLog.trainingObs      = document.getElementById('training-obs').value.trim();
    STATE.todayLog.trainingExercises= document.getElementById('training-exercises-list').value.trim();

    // Archive immediately so the coach sees it right away
    archiveSession({
      date: getTodayStr(),
      type: STATE.todayLog.trainingType,
      obs:  STATE.todayLog.trainingObs,
      exercises: STATE.todayLog.trainingExercises
    });

    saveAll(); renderAll();
    showToast(`Treino de ${STATE.todayLog.trainingType} registrado.`, 'good');
    document.getElementById('training-obs').value = '';
    document.getElementById('training-exercises-list').value = '';
  });

  // Undo today's training
  document.getElementById('btn-undo-training').addEventListener('click', () => {
    STATE.todayLog.trainingDone      = false;
    STATE.todayLog.trainingType      = '';
    STATE.todayLog.trainingObs       = '';
    STATE.todayLog.trainingExercises = '';
    // Remove from history if same date
    STATE.trainingHistory = STATE.trainingHistory.filter(s => s.date !== getTodayStr());
    saveAll(); renderAll();
    showToast('Treino desfeito.', 'warn');
  });
}

// ===================================================
//  EVENTOS — LOAD TRACKING
// ===================================================
function initLoadTrack() {
  document.getElementById('lt-date').value = getTodayStr();

  document.getElementById('btn-save-lt').addEventListener('click', () => {
    const exercise = document.getElementById('lt-ex-name').value.trim();
    const date     = document.getElementById('lt-date').value;
    const weight   = parseFloat(document.getElementById('lt-weight').value);
    const sets     = parseInt(document.getElementById('lt-sets').value) || null;
    const reps     = parseInt(document.getElementById('lt-reps').value) || null;
    const note     = document.getElementById('lt-note').value.trim();

    if (!exercise) { showToast('Informe o exercicio.', 'warn'); return; }
    if (!weight)   { showToast('Informe a carga.', 'warn'); return; }
    if (!date)     { showToast('Informe a data.', 'warn'); return; }

    STATE.loadHistory.push({ id: uid(), date, exercise: capitalize(exercise), weight, sets, reps, note });
    saveAll(); renderAll();
    showToast(`${capitalize(exercise)} — ${weight}kg registrado.`, 'good');
    ['lt-ex-name','lt-weight','lt-sets','lt-reps','lt-note'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('lt-date').value = getTodayStr();
  });

  document.getElementById('lt-filter-ex').addEventListener('change', renderLoadTrack);
}

// ===================================================
//  LOGO UPLOAD
// ===================================================
function initLogoUpload() {
  const input       = document.getElementById('logo-upload');
  const img         = document.getElementById('logo-img');
  const placeholder = document.getElementById('logo-placeholder');

  // If user previously uploaded a custom logo, use it (overrides logo.png)
  if (STATE.logoPhoto) {
    img.src = STATE.logoPhoto;
    img.style.display = 'block';
    placeholder.style.display = 'none';
  }
  // Otherwise logo.png is already set as src in HTML — onerror handles missing file

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      STATE.logoPhoto = ev.target.result;
      img.src = STATE.logoPhoto;
      img.style.display = 'block';
      placeholder.style.display = 'none';
      saveAll();
      showToast('Logo atualizada.', 'good');
    };
    reader.readAsDataURL(file);
  });
}

// ===================================================
//  EVENTOS — PROGRESS
// ===================================================
function initProgress() {
  document.getElementById('prog-date').value = getTodayStr();
  document.getElementById('btn-add-progress').addEventListener('click', () => {
    const date  = document.getElementById('prog-date').value;
    const weight= parseFloat(document.getElementById('prog-weight').value);
    const fatPct= parseFloat(document.getElementById('prog-fat-pct').value)||null;
    const note  = document.getElementById('prog-note').value.trim();
    if (!date)   { showToast('Informe a data.','warn'); return; }
    if (!weight) { showToast('Informe o peso.','warn'); return; }
    STATE.weightHistory=STATE.weightHistory.filter(w=>w.date!==date);
    STATE.weightHistory.push({date,weight,fatPct,note});
    STATE.weightHistory.sort((a,b)=>a.date.localeCompare(b.date));
    STATE.goals.currentWeight=weight;
    saveAll(); renderAll(); showToast(`Peso ${weight}kg registrado.`,'good');
    ['prog-weight','prog-fat-pct','prog-note'].forEach(id=>document.getElementById(id).value='');
  });

  document.querySelectorAll('.photo-input').forEach(input=>{
    input.addEventListener('change', e=>{
      const type=input.dataset.type, file=e.target.files[0];
      if(!file) return;
      const reader=new FileReader();
      reader.onload=ev=>{STATE.photos[type]=ev.target.result;saveAll();renderPhotos();showToast('Foto adicionada.','good');};
      reader.readAsDataURL(file);
    });
  });
}

// ===================================================
//  EVENTOS — BIOIMPEDÂNCIA
// ===================================================
function initBioimp() {
  document.getElementById('bio-date').value = getTodayStr();
  document.getElementById('btn-save-bio').addEventListener('click', () => {
    const date = document.getElementById('bio-date').value;
    if (!date) { showToast('Informe a data.','warn'); return; }

    const g = s => { const v=parseFloat(document.getElementById(s).value); return isNaN(v)?null:v; };
    const record = {
      date,
      weight:     g('bio-weight'),
      fatPct:     g('bio-fat-pct'),
      fatKg:      g('bio-fat-kg'),
      lean:       g('bio-lean'),
      muscle:     g('bio-muscle'),
      bone:       g('bio-bone'),
      water:      g('bio-water'),
      bmi:        g('bio-bmi'),
      metage:     g('bio-metage'),
      bmr:        g('bio-bmr'),
      visceral:   g('bio-visceral'),
      ms_trunk:   g('bio-ms-trunk'),
      ms_arm_l:   g('bio-ms-arm-l'),
      ms_arm_r:   g('bio-ms-arm-r'),
      ms_leg_l:   g('bio-ms-leg-l'),
      ms_leg_r:   g('bio-ms-leg-r'),
      fs_trunk:   g('bio-fs-trunk'),
      fs_arm_l:   g('bio-fs-arm-l'),
      fs_arm_r:   g('bio-fs-arm-r'),
      fs_leg_l:   g('bio-fs-leg-l'),
      fs_leg_r:   g('bio-fs-leg-r'),
      note: document.getElementById('bio-note').value.trim(),
    };

    const isEmpty = !record.weight && !record.fatPct && !record.lean && !record.muscle;
    if (isEmpty) { showToast('Preencha pelo menos um campo.','warn'); return; }

    STATE.bioimpHistory = STATE.bioimpHistory.filter(b=>b.date!==date);
    STATE.bioimpHistory.push(record);
    STATE.bioimpHistory.sort((a,b)=>a.date.localeCompare(b.date));

    // Atualiza peso nas metas se informado
    if (record.weight) STATE.goals.currentWeight = record.weight;

    saveAll(); renderAll(); showToast('Bioimpedancia registrada.','good');
    ['bio-weight','bio-fat-pct','bio-fat-kg','bio-lean','bio-muscle','bio-bone','bio-water',
     'bio-bmi','bio-metage','bio-bmr','bio-visceral','bio-ms-trunk','bio-ms-arm-l','bio-ms-arm-r',
     'bio-ms-leg-l','bio-ms-leg-r','bio-fs-trunk','bio-fs-arm-l','bio-fs-arm-r','bio-fs-leg-l',
     'bio-fs-leg-r','bio-note'].forEach(id=>document.getElementById(id).value='');
  });
}

// ===================================================
//  EVENTOS — GOALS
// ===================================================
function initGoals() {
  document.getElementById('btn-save-goals').addEventListener('click', () => {
    const g = STATE.goals;
    g.currentWeight = parseFloat(document.getElementById('goal-current-weight').value)||g.currentWeight;
    g.targetWeight  = parseFloat(document.getElementById('goal-target-weight').value)||g.targetWeight;
    g.calories      = parseFloat(document.getElementById('goal-calories').value)||g.calories;
    g.protein       = parseFloat(document.getElementById('goal-protein').value)||g.protein;
    g.carb          = parseFloat(document.getElementById('goal-carb').value)||g.carb;
    g.fat           = parseFloat(document.getElementById('goal-fat').value)||g.fat;
    g.deadline      = document.getElementById('goal-deadline').value||g.deadline;
    saveAll(); renderAll(); showToast('Metas salvas.','good');
  });
}

// ===================================================
//  DADOS DE EXEMPLO
// ===================================================
function loadSampleData() {
  STATE.goals = {currentWeight:88.5,targetWeight:80,calories:2200,protein:165,carb:220,fat:65,deadline:'2025-09-01'};
  const today = new Date();
  STATE.weightHistory = [];
  for(let i=13;i>=0;i--){
    const d=new Date(today); d.setDate(today.getDate()-i);
    const w=88.5-(13-i)*0.23+(Math.random()-0.5)*0.3;
    STATE.weightHistory.push({date:d.toISOString().split('T')[0],weight:parseFloat(w.toFixed(1)),fatPct:i===13?22.5:null,note:i===0?'Em jejum':''});
  }
  STATE.todayLog = {
    date:getTodayStr(),
    trainingDone:true,
    trainingType:'Peito',
    trainingObs:'Foco em hipertrofia',
    trainingExercises:'Supino reto, Crucifixo, Triceps pulley',
    foods:[
      {name:'Whey Protein',calories:120,protein:25,carb:4,fat:2},
      {name:'Frango grelhado (200g)',calories:330,protein:62,carb:0,fat:7.2},
      {name:'Arroz (150g)',calories:195,protein:4,carb:42,fat:0.5},
      {name:'Ovo inteiro x2',calories:156,protein:12,carb:1.2,fat:10},
      {name:'Batata-doce (150g)',calories:129,protein:2.4,carb:30,fat:0.2},
    ]
  };
  const daysAgo=n=>{const d=new Date();d.setDate(d.getDate()-n);return d.toISOString().split('T')[0];};
  STATE.trainingHistory=[
    {date:daysAgo(2),type:'Costas',obs:'Treino pesado',exercises:'Remada curvada, Puxada frontal, Levantamento terra'},
    {date:daysAgo(4),type:'Perna',obs:'',exercises:'Agachamento, Leg press, Cadeira extensora'},
    {date:daysAgo(7),type:'Ombro',obs:'',exercises:'Desenvolvimento, Elevacao lateral, Face pull'},
    {date:getTodayStr(),type:'Peito',obs:'Foco em hipertrofia',exercises:'Supino reto, Crucifixo, Triceps pulley'},
  ];
  // Load history examples
  STATE.loadHistory=[
    {id:'l1',date:daysAgo(14),exercise:'Supino reto',   weight:75,  sets:4,reps:8,note:''},
    {id:'l2',date:daysAgo(7), exercise:'Supino reto',   weight:77.5,sets:4,reps:8,note:'Boa execucao'},
    {id:'l3',date:getTodayStr(),exercise:'Supino reto', weight:80,  sets:4,reps:8,note:'PR!'},
    {id:'l4',date:daysAgo(14),exercise:'Agachamento',   weight:95,  sets:4,reps:8,note:''},
    {id:'l5',date:daysAgo(7), exercise:'Agachamento',   weight:100, sets:4,reps:8,note:''},
    {id:'l6',date:daysAgo(14),exercise:'Remada curvada',weight:65,  sets:4,reps:8,note:''},
    {id:'l7',date:daysAgo(7), exercise:'Remada curvada',weight:70,  sets:4,reps:8,note:'Carga subiu'},
    {id:'l8',date:daysAgo(14),exercise:'Desenvolvimento',weight:45, sets:3,reps:10,note:''},
    {id:'l9',date:daysAgo(7), exercise:'Desenvolvimento',weight:50, sets:3,reps:10,note:''},
  ];
  STATE.bioimpHistory=[
    {date:daysAgo(30),weight:91.0,fatPct:24.5,lean:68.6,muscle:62.0,bone:3.2,water:55.0,bmi:28.2,metage:32,bmr:1980,visceral:12,note:'Primeiro registro'},
    {date:daysAgo(0), weight:88.5,fatPct:22.0,lean:69.0,muscle:63.2,bone:3.3,water:57.0,bmi:27.4,metage:30,bmr:2010,visceral:10,note:'Segundo registro'},
  ];
  saveAll(); renderAll(); showToast('Dados de exemplo carregados.','good');
}

// ===================================================
//  RESET
// ===================================================
function resetAll() {
  if(!confirm('Apagar todos os dados? Esta acao nao pode ser desfeita.')) return;
  ['od3_goals','od3_todayLog','od3_weightHist','od3_trainHist','od3_loadHist','od3_bioHist','od3_photos','od3_foodDB'].forEach(k=>localStorage.removeItem(k));
  STATE.goals={currentWeight:0,targetWeight:0,calories:2200,protein:160,carb:220,fat:65,deadline:''};
  STATE.todayLog={foods:[],trainingDone:false,trainingType:'',trainingObs:'',trainingExercises:'',date:getTodayStr()};
  STATE.weightHistory=[]; STATE.trainingHistory=[]; STATE.loadHistory=[]; STATE.bioimpHistory=[];
  STATE.photos={front:null,side:null,back:null};
  STATE.foodDB=[...DEFAULT_FOOD_DB];
  renderAll(); showToast('Dados resetados.');
}

// ===================================================
//  INIT
// ===================================================
function init() {
  loadAll();
  initNavigation();
  initNutrition();
  initFoodSearch();
  initFoodDB();
  initTraining();
  initLoadTrack();
  initProgress();
  initBioimp();
  initGoals();
  initLogoUpload();
  renderQuickFoods();

  document.getElementById('btn-sample-data').addEventListener('click', loadSampleData);
  document.getElementById('btn-reset').addEventListener('click', resetAll);

  updateGreeting();
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(updateGreeting, 60000);

  renderAll();

  let resizeT;
  window.addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(()=>{drawWeightChart();drawBioChart();},200); });
}

document.addEventListener('DOMContentLoaded', init);