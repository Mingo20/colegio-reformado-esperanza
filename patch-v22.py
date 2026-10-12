# -*- coding: utf-8 -*-
"""Parche v22: franja foto redondeada, texto momentos, cronómetro flotante mínimo
   y persistente tras recargar, cotejos de solo lectura con ✓ verde, sin observación,
   etiquetas de descargas, mensual con desglose por semanas (sin acceso a diarios),
   Inicial con un solo grado."""
import sys

JS = open("app-docente.js", encoding="utf-8").read()
HT = open("plan-docente-inicial.html", encoding="utf-8").read()

def rep(viejo, nuevo, nombre):
    global JS
    if viejo not in JS:
        print("FALTA ANCLA:", nombre); sys.exit(1)
    JS = JS.replace(viejo, nuevo, 1)
    print("ok:", nombre)

def repHT(viejo, nuevo, nombre):
    global HT
    if viejo not in HT:
        print("FALTA ANCLA HTML:", nombre); sys.exit(1)
    HT = HT.replace(viejo, nuevo, 1)
    print("ok:", nombre)

# ============ 1. TEXTO MOMENTOS AJUSTADOS ============
rep('Momentos ajustados a tu clase de ${S.docente.duracionMin} min (cámbialo en Info).',
    'Momentos ajustados a tu clase de ${S.docente.duracionMin} minutos, si lo deseas (cámbialo en perfil).',
    "texto momentos ajustados")

# ============ 2. CRONÓMETRO FLOTANTE MÍNIMO + PERSISTENTE ============
rep('''function temporizadorHTML(durs){
  durs = (durs && durs.length)? durs : [5,10,15];
  return `
  <div class="timer-wrap" id="timerBox">
    <div class="timer-ring">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="8"/>
        <circle id="timerCirc" cx="48" cy="48" r="40" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"
          stroke-dasharray="251.3" stroke-dashoffset="0" transform="rotate(-90 48 48)"/>
      </svg>
      <div class="t-txt"><b id="timerTxt">${String(Math.floor((durs[0]*60)/60)).padStart(2,"0")}:00</b><small id="timerEstado">Listo</small></div>
    </div>
    <div class="timer-ctrl">
      <div class="timer-btns">
        <button class="btn-soft" id="btnPlay" onclick="event.stopPropagation(); playTimer()">${ic("play",14)} Iniciar</button>
        <button class="btn-soft" onclick="event.stopPropagation(); resetTimer()">${ic("reiniciar",12)} Reiniciar</button>
      </div>
    </div>
  </div>`;
}''',
'''function setBtn(html){ const b=$("btnPlay"); if(b) b.innerHTML = html; }
function setEstado(txt){ const e=$("timerEstado"); if(e) e.textContent = txt; }
function temporizadorHTML(durs){
  durs = (durs && durs.length)? durs : [5,10,15];
  return `
  <div class="timer-wrap" id="timerBox">
    <div class="timer-ring">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="44" fill="#fff"/>
        <circle id="timerCirc" cx="48" cy="48" r="40" fill="none" stroke="#0033A0" stroke-width="7" stroke-linecap="round"
          stroke-dasharray="251.3" stroke-dashoffset="0" transform="rotate(-90 48 48)"/>
      </svg>
      <div class="t-txt"><b id="timerTxt">${String(Math.floor((durs[0]*60)/60)).padStart(2,"0")}:00</b></div>
    </div>
  </div>`;
}''', "temporizador mínimo: solo el círculo")

rep('''function cronoGuarda(){
  if(!claseActualId) return;
  if(!S.crono) S.crono = {};
  S.crono[claseActualId] = { dur: T.dur, resta: T.resta };
}''',
'''function cronoGuarda(){
  const cid = claseActualId;
  if(!cid) return;
  if(!S.crono) S.crono = {};
  S.crono[cid] = { dur: T.dur, resta: T.resta, corriendo: !!T.corriendo, momentoActivo: (T.momentoActivo==null? null : T.momentoActivo), t: Date.now() };
  if(T.corriendo && T.resta>0 && T.momentoActivo!=null) S.cronoActivo = cid;
  else if(T.resta<=0) delete S.cronoActivo;
  guardar();
}
function restaurarCrono(){
  try{
    const cid = S.cronoActivo;
    if(!cid || !S.crono || !S.crono[cid]) return;
    const g = S.crono[cid];
    if(!g.resta || g.resta<=0){ delete S.cronoActivo; return; }
    claseActualId = cid;
    T = { dur: g.dur||300, resta: g.resta, corriendo: false, momentoActivo: g.momentoActivo, iv:null };
    pintarCronoFlotante(null);
    if(g.corriendo){
      if(g.t){
        const seg = Math.floor((Date.now()-g.t)/1000);
        T.resta = Math.max(0, T.resta - seg);
      }
      if(T.resta>0 && T.momentoActivo!=null) playTimer();
      else if(T.resta<=0){ T.resta = 0; cronoGuarda(); }
    }
    pintarTimer();
  }catch(e){}
}''', "cronoGuarda persistente + restaurarCrono")

rep('''function setDur(min, btn){
  T.dur = min*60; T.resta = T.dur; T.corriendo = false;
  clearInterval(T.iv); pintarTimer(); $("timerEstado").textContent="Listo";
  $("btnPlay").innerHTML = ic("play",14)+" Iniciar";
  $("timerBox").classList.remove("timer-corriendo");
  cronoGuarda();
}''',
'''function setDur(min, btn){
  T.dur = min*60; T.resta = T.dur; T.corriendo = false;
  clearInterval(T.iv); pintarTimer(); setEstado("Listo");
  setBtn(ic("play",14)+" Iniciar");
  const tb=$("timerBox"); if(tb) tb.classList.remove("timer-corriendo");
  cronoGuarda();
}''', "setDur con guards")

rep('''function resetTimer(){
  T.momentoActivo = null; pintarDurChips();
  clearInterval(T.iv); T.corriendo=false; T.resta=T.dur;
  pintarTimer(); $("btnPlay").innerHTML = ic("play",14)+" Iniciar"; $("timerEstado").textContent="Listo";
  $("timerBox").classList.remove("timer-corriendo");
  cronoGuarda();
}''',
'''function resetTimer(){
  T.momentoActivo = null; pintarDurChips();
  clearInterval(T.iv); T.corriendo=false; T.resta=T.dur;
  delete S.cronoActivo;
  pintarTimer(); setBtn(ic("play",14)+" Iniciar"); setEstado("Listo");
  const tb=$("timerBox"); if(tb) tb.classList.remove("timer-corriendo");
  cronoGuarda();
}''', "resetTimer con guards")

rep('''function playTimer(){
  if(T.corriendo){
    T.corriendo=false; clearInterval(T.iv); cronoGuarda();
    $("btnPlay").innerHTML = ic("play",14)+" Continuar"; $("timerEstado").textContent="En pausa";
    $("timerBox").classList.remove("timer-corriendo");
    pintarDurChips();
    return;
  }
  if(T.resta<=0) T.resta = T.dur;
  T.corriendo=true; $("btnPlay").innerHTML = ic("pausa",14)+" Pausar"; $("timerEstado").textContent="¡Corriendo!";
  $("timerBox").classList.add("timer-corriendo");''',
'''function playTimer(){
  if(T.corriendo){
    T.corriendo=false; clearInterval(T.iv); cronoGuarda();
    setBtn(ic("play",14)+" Continuar"); setEstado("En pausa");
    const tb=$("timerBox"); if(tb) tb.classList.remove("timer-corriendo");
    pintarDurChips();
    pintarTimer();
    return;
  }
  if(T.resta<=0) T.resta = T.dur;
  T.corriendo=true; setBtn(ic("pausa",14)+" Pausar"); setEstado("¡Corriendo!");
  const tb2=$("timerBox"); if(tb2) tb2.classList.add("timer-corriendo");''', "playTimer con guards")

rep('''  T.iv = setInterval(()=>{
    T.resta--;
    pintarTimer();
    if(claseActualId){
      S.tiempoClase[claseActualId] = (S.tiempoClase[claseActualId]||0)+1;
      if(S.tiempoClase[claseActualId]%15===0){ guardar(); cronoGuarda(); }
      const hr = $("headRings");
      if(hr) hr.innerHTML = ringDuo(claseActualId);
    }
    if(T.resta<=0){
      clearInterval(T.iv); T.corriendo=false; T.resta=0; cronoGuarda();
      $("btnPlay").innerHTML = ic("play",14)+" Reiniciar"; $("timerEstado").textContent="¡Tiempo cumplido!";
      $("timerBox").classList.remove("timer-corriendo");
      pintarDurChips();
      iniciarAlarma(claseActualId);
    }
  },1000);''',
'''    T.iv = setInterval(()=>{
    T.resta--;
    pintarTimer();
    const cidTick = S.cronoActivo || claseActualId;
    if(cidTick){
      S.tiempoClase[cidTick] = (S.tiempoClase[cidTick]||0)+1;
      if(S.tiempoClase[cidTick]%15===0){ cronoGuarda(); }
      const hr = $("headRings");
      if(hr && cidTick===claseActualId) hr.innerHTML = ringDuo(claseActualId);
    }
    if(T.resta<=0){
      clearInterval(T.iv); T.corriendo=false; T.resta=0; cronoGuarda();
      setBtn(ic("play",14)+" Reiniciar"); setEstado("¡Tiempo cumplido!");
      const tb3=$("timerBox"); if(tb3) tb3.classList.remove("timer-corriendo");
      pintarDurChips();
      iniciarAlarma(S.cronoActivo || claseActualId);
    }
  },1000);''', "tick ligado a cronoActivo")

rep('''  T.momentoActivo = i;
  if(!T.corriendo) playTimer();
  pintarDurChips();
  pintarTimer();''',
'''  T.momentoActivo = i;
  if(!T.corriendo) playTimer();
  pintarDurChips();
  pintarTimer();
  cronoGuarda();''', "iniciarMomento persiste cronoActivo")

rep('''  if(S.docente && S.docente.id){
    if(!S.ui.progTab) S.ui.progTab = "progreso";
    if(!S.ui.progGrado) S.ui.progGrado = S.docente.grado;
    if(!S.ui.progSec) S.ui.progSec = S.docente.seccion || "A";
    animLogin(''',
'''  if(S.docente && S.docente.id){
    if(!S.ui.progTab) S.ui.progTab = "progreso";
    if(!S.ui.progGrado) S.ui.progGrado = S.docente.grado;
    if(!S.ui.progSec) S.ui.progSec = S.docente.seccion || "A";
    restaurarCrono();
    animLogin(''', "boot restaura cronómetro")

# ============ 3. COTEJO DE SOLO LECTURA ============
rep('''  if(!eval2.estado){
    cont.innerHTML = `<p class="mg-nota">Toca un estado para ver su lista de cotejo. Puedes explorar los tres estados antes de decidir: solo se guarda lo que confirmes con «Registrar evaluación».</p>`;
    return;
  }
  const listas = cotejoDe(eval2.claseId);
  const items = (listas[eval2.estado]||COTEJO_BASE[eval2.estado]||[]);
  if(!eval2.evid[eval2.estado]) eval2.evid[eval2.estado] = {};
  cont.innerHTML = items.map((it,ix)=>{
    const on = !!eval2.evid[eval2.estado][ix];
    return `<div class="cotejo-item ${on?"on":""}" onclick="toggleEvid(${ix})"><span class="ck">${on? "✓":""}</span>${esc(it)}</div>`;
  }).join("") + `<p class="mg-nota" style="margin-top:2px">Marca solo lo que realmente observaste en el niño o la niña.</p>`;
}''',
'''  if(!eval2.estado){
    cont.innerHTML = `<p class="mg-nota">Toca un estado para ver su lista de cotejo de referencia: es tu guía de observación durante la actividad.</p>`;
    return;
  }
  const listas = cotejoDe(eval2.claseId);
  const items = (listas[eval2.estado]||COTEJO_BASE[eval2.estado]||[]);
  cont.innerHTML = items.map((it,ix)=>`<div class="cotejo-item guia"><span class="ck">✓</span>${esc(it)}</div>`).join("")
    + `<p class="mg-nota" style="margin-top:2px">Guía de observación: verifica estos logros mientras observas al niño o la niña.</p>`;
}''', "cotejo de solo lectura con ✓ verde")

rep('''  const evidTxt = Object.keys(eval2.evid[estado]||{}).filter(k=>eval2.evid[estado][k]).map(k=>items[parseInt(k,10)]).filter(Boolean);
  const obs = ($("eval2Obs").value||"").trim();''',
'''  const obsEl = $("eval2Obs");
  const obs = obsEl? (obsEl.value||"").trim() : "";''', "confirmar sin obs obligatoria")

# ============ 4. ETIQUETAS DE DESCARGAS ============
rep('<button class="dl alt" onclick="descargarAsistenciaDiaPdf(\'${claseId}\')">${ic("descarga")} Descargar asistencias PDF</button>',
    '<button class="dl alt" onclick="descargarAsistenciaDiaPdf(\'${claseId}\')">${ic("descarga")} Descargar asistencias</button>',
    "descargar asistencias")
rep('<button class="dl" onclick="descargarPlanDiarioDocx(\'${claseId}\')">${ic("descarga")} Descargar plan diario Word</button>',
    '<button class="dl" onclick="descargarPlanDiarioDocx(\'${claseId}\')">${ic("descarga")} Descargar planificación diaria</button>',
    "descargar planificación diaria")
rep('<button class="dl alt" onclick="descargarEvaluacionPdf(\'${claseId}\')">${ic("descarga")} Descargar logros PDF</button>',
    '<button class="dl alt" onclick="descargarEvaluacionPdf(\'${claseId}\')">${ic("descarga")} Descargar evaluación</button>',
    "descargar evaluación")

# ============ 5. MENSUAL: DESGLOSE POR SEMANAS SIN ACCESO A DIARIOS ============
rep('''    <h2>${ic("lista")} 4. Secuencia didáctica</h2>`;
  if(esDerivado){''',
'''    <h2>${ic("lista")} 4. Desglose por semanas</h2>`;
  if(esDerivado){''', "título desglose por semanas")

rep('''  } else {
    const semanasInv = [...(plan.semanas||[])].reverse();
    semanasInv.forEach(s=>{
      const dias = s.dias||[];
      const pctW = dias.length? Math.round(dias.reduce((a,d)=>a+pctDia(d.id,"asis"),0)/dias.length) : 0;
      const lblSem = esAnualPlan(plan)? "Mes":"Semana";
      html += `<div class="item" ${dias.length? `onclick="abrirClase('${dias[dias.length-1].id}')"`:""}>
        <div class="ic">${ic("lista")}</div>
        <div class="tx"><b>${lblSem} ${s.numero} · ${esc(s.tema)}</b><span>${esc(s.fechas)}${dias.length? " · "+dias.length+" clases diarias":""}</span></div>
        ${dias.length? `<div class="rg">${ring(pctW,46,6,"#0033A0")}</div>`:""}
      </div>
      <div class="card" style="padding:10px 12px">
        ${dias.slice().reverse().map(d=>{
          const esHoy = d.id===HOY;
          return `<div class="item" style="margin-bottom:8px;box-shadow:none;background:rgba(255,255,255,.6)" onclick="event.stopPropagation(); abrirClase('${d.id}')">
            <div class="ic" style="width:38px;height:38px;border-radius:12px">${ic("plan",18)}</div>
            <div class="tx"><b style="font-size:12.5px">${esc(d.etiqueta)} · ${esc(d.titulo)}</b><span>${esHoy?"HOY · Ver clase completa ›":"Ver clase completa ›"}</span></div>
            ${esHoy?'<span class="hoy-badge">HOY</span>':""}
          </div>`;
        }).join("")}
      </div>`;
    });
  }''',
'''  } else {
    const lblSem = esAnualPlan(plan)? "Mes":"Semana";
    (plan.semanas||[]).forEach(s=>{
      html += `<div class="mcard">
        <div class="m-tit"><div class="n">${s.numero}</div><b>${lblSem} ${s.numero} · ${esc(s.tema)}</b></div>
        ${s.fechas? `<div class="kv"><b>Fechas</b><span>${esc(s.fechas)}</span></div>`:""}
        ${s.inicio? `<div class="kv"><b>Pregunta generadora</b><span>${esc(s.inicio)}</span></div>`:""}
        ${s.desarrollo? `<div class="kv"><b>Contenido central</b><span>${esc(s.desarrollo)}</span></div>`:""}
        ${s.cierre? `<div class="kv"><b>Cierre previsto</b><span>${esc(s.cierre)}</span></div>`:""}
      </div>`;
    });
    if(!esAnualPlan(plan)) html += `<p class="vacio">Las clases diarias de este mes se trabajan desde la pantalla «Planificación diaria».</p>`;
  }''', "desglose por semanas sin días")

# ============ 6. INICIAL: UN SOLO GRADO ============
rep('''      <select class="inp" id="selGradoGS" style="flex:1">
        <option value="" selected>Grados</option>
        ${(nivel==="Inicial"? ["Maternal","Pre-Kínder","Kínder","Pre-Primario"] : (GRADOS_POR_NIVEL[nivel]||[])).map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join("")}
      </select>''',
'''      ${(nivel==="Inicial")
        ? `<div class="inp" style="flex:1;display:flex;align-items:center;font-weight:800;color:var(--azul-osc)">${esc(S.docente.grado||"Tu grado")}</div>`
        : `<select class="inp" id="selGradoGS" style="flex:1">
        <option value="" selected>Grados</option>
        ${(GRADOS_POR_NIVEL[nivel]||[]).map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join("")}
      </select>`}''', "perfil: grado fijo para Inicial")

rep('''function agregarGS(){
  const g = $("selGradoGS").value, s = $("selSeccionGS").value;
  if(!g){ toast("Selecciona un grado"); return; }''',
'''function agregarGS(){
  const esIni = S.docente.nivel==="Inicial";
  const g = esIni? (S.docente.grado||"") : (($("selGradoGS")||{}).value||"");
  const s = $("selSeccionGS").value;
  if(!g){ toast(esIni? "Registra tu grado en el formulario de registro" : "Selecciona un grado"); return; }''', "agregarGS respeta grado único Inicial")

open("app-docente.js","w",encoding="utf-8").write(JS)

# ================= HTML =================
repHT('  <textarea class="obs" id="eval2Obs" placeholder="Observación opcional: algo que no esté en la lista de cotejo"></textarea>\n',
      '', "sin textarea de observación")

repHT('.foto-card::before{border-radius:20px 20px 0 0}',
      '.foto-card::before{border-radius:var(--radio) var(--radio) 0 0}', "franja redondeada como la tarjeta")

css_v22 = '''/* ---------- v22 ---------- */
.cotejo-item{cursor:default}
.cotejo-item .ck{background:#16a34a;border-color:#16a34a;color:#fff}
.crono-flotante{background:transparent;border:none;box-shadow:none;padding:0;width:auto;border-radius:50%}
.crono-flotante .timer-wrap{flex-direction:column;gap:2px;padding:0}
.crono-flotante .timer-ring{filter:drop-shadow(0 6px 14px rgba(0,30,90,.28))}
.crono-flotante .timer-ring svg{width:88px;height:88px}
.crono-flotante .t-txt b{color:var(--azul-osc);font-size:17px;letter-spacing:.5px}
.crono-flotante .t-txt small{display:none}
</style>'''
repHT('</style>', css_v22, "css v22")

open("plan-docente-inicial.html","w",encoding="utf-8").write(HT)
print("PATCH v22 COMPLETO")
