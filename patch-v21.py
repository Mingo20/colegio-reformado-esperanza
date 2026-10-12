# -*- coding: utf-8 -*-
"""Parche v21: registro inteligente (secciones multi, básicas, autocompletado),
sonido de notificaciones, perfil (foto, animaciones, distrito, fix teclado),
cronómetro flotante, cotejos bidireccionales con backend, limpieza planes Inicial."""
import re, sys, json

JS = open("app-docente.js", encoding="utf-8").read()
HT = open("plan-docente-inicial.html", encoding="utf-8").read()
BK = open("functions/appDocentes.ts", encoding="utf-8").read()

def rep(viejo, nuevo, nombre, src=None):
    global JS
    if viejo not in JS:
        print("FALTA ANCLA:", nombre); sys.exit(1)
    JS = JS.replace(viejo, nuevo, 1)
    print("ok:", nombre)

# ================= 1. REGISTRO =================
rep('<button class="dl alt" style="width:100%" onclick="mostrarRegistro()">Registrarme</button>',
    '<button class="dl alt" style="width:100%" onclick="mostrarRegistro()">Regístrate Gratis</button>',
    "botón Regístrate Gratis")

rep('''<input class="inp" id="onbColegio" placeholder="Ej: Colegio Reformado la Esperanza">''',
    '''<input class="inp" id="onbColegio" list="dlColegios" autocomplete="off" placeholder="Ej: Colegio Reformado la Esperanza">''',
    "datalist colegio")

rep('''        <input class="inp" id="onbDistrito" placeholder="Ej: 15-05" style="text-align:center;letter-spacing:1px"></div>
    </div>
    <button class="dl grande" onclick="registrarDocente()">Crear mi cuenta</button>''',
    '''        <input class="inp" id="onbDistrito" list="dlDistritos" autocomplete="off" placeholder="Ej: 15-05" style="text-align:center;letter-spacing:1px"></div>
    </div>
    <datalist id="dlColegios"></datalist>
    <datalist id="dlDistritos"></datalist>
    <button class="dl grande" onclick="registrarDocente()">Crear mi cuenta</button>''',
    "datalists en registro")

rep('''function onbNivelChange(){
  const nivel = $("onbNivel").value;
  const cont = $("onbSmart");
  if(nivel==="Inicial"){
    cont.innerHTML = `
    <label class="lbl">Grado que atiendes</label>
    <select class="inp" id="onbGradoIni">
      <option value="" selected disabled>Selecciona el grado…</option>
      ${GRADOS_POR_NIVEL["Inicial"].map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join("")}
    </select>`;''',
    '''let onbSecsSel = [];
function toggleOnbSec(s){
  const idx = onbSecsSel.indexOf(s);
  if(idx>=0) onbSecsSel.splice(idx,1); else onbSecsSel.push(s);
  try{ const el = document.querySelector('.onb-sec[data-s="'+s+'"]'); if(el && el.classList && el.classList.toggle) el.classList.toggle("sel", idx<0); }catch(e){}
}
async function cargarSugerencias(){
  try{
    const r = await apiAccion("sugerencias", {});
    if(!r || !r.success) return;
    const lc = $("dlColegios"), ld = $("dlDistritos");
    if(lc) lc.innerHTML = (r.colegios||[]).map(x=>`<option value="${esc(x)}">`).join("");
    if(ld) ld.innerHTML = (r.distritos||[]).map(x=>`<option value="${esc(x)}">`).join("");
  }catch(e){}
}
function onbNivelChange(){
  onbSecsSel = [];
  const nivel = $("onbNivel").value;
  const cont = $("onbSmart");
  if(nivel==="Inicial"){
    cont.innerHTML = `
    <div class="grid-2col">
      <div><label class="lbl">Grado que atiendes</label>
        <select class="inp" id="onbGradoIni">
          <option value="" selected disabled>Selecciona…</option>
          ${GRADOS_POR_NIVEL["Inicial"].map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join("")}
        </select></div>
      <div><label class="lbl">Sección que impartes</label>
        <div class="onb-secs" id="onbSecs">
          ${["A","B","C","D","E","F"].map(s=>`<button type="button" class="onb-sec" data-s="${s}" onclick="toggleOnbSec('${s}')">${s}</button>`).join("")}
        </div></div>
    </div>`;''', "nivel Inicial con secciones multi")

# registrarDocente: capturar secciones, básicas y notificación de bienvenida
rep('''  let grado = "", especialidad = "", asignaturas = [];
  if(nivel==="Inicial"){
    grado = ($("onbGradoIni")? $("onbGradoIni").value : "") || "";
    if(!grado){ toast("Selecciona el grado que atiendes"); return; }
  } else if(nivel==="Primaria"){
    especialidad = ($("onbAsigPrim")? $("onbAsigPrim").value : "") || "";
    if(!especialidad){ toast("Selecciona tu tipo de docente"); return; }
    if(ASIG_ESP_PRIM.includes(especialidad)) asignaturas = [especialidad];''',
    '''  let grado = "", especialidad = "", asignaturas = [], seccionesSel = [];
  if(nivel==="Inicial"){
    grado = ($("onbGradoIni")? $("onbGradoIni").value : "") || "";
    if(!grado){ toast("Selecciona el grado que atiendes"); return; }
    seccionesSel = (onbSecsSel||[]).slice().sort();
    if(!seccionesSel.length){ toast("Selecciona al menos una sección (A–F)"); return; }
  } else if(nivel==="Primaria"){
    especialidad = ($("onbAsigPrim")? $("onbAsigPrim").value : "") || "";
    if(!especialidad){ toast("Selecciona tu tipo de docente"); return; }
    if(especialidad==="Básicas") asignaturas = ["Lengua Española","Matemática","Ciencias Sociales","Ciencias de la Naturaleza","Formación Integral Humana y Religiosa"];
    else if(ASIG_ESP_PRIM.includes(especialidad)) asignaturas = [especialidad];''',
    "registrarDocente secciones y básicas")

rep('''    const r = await apiAccion("onboarding", { colegio, nombre, whatsapp, distrito, nivel, grado, seccion:"", jornada,
      asignaturas: asignaturas.join(", "), especialidad });
    if(!r.success){ toast("Error: "+(r.error||"intenta de nuevo")); return; }
    S.docente = Object.assign({}, S.docente, { id:r.id, codigo:r.codigo, nombre, colegio, distrito, whatsapp, nivel,
      grado, seccion:"", jornada, especialidad, asignaturasSel: asignaturas, secciones:[] });
    guardar();''',
    '''    const r = await apiAccion("onboarding", { colegio, nombre, whatsapp, distrito, nivel, grado, seccion: seccionesSel[0]||"", jornada,
      secciones: seccionesSel.join(", "), asignaturas: asignaturas.join(", "), especialidad });
    if(!r.success){ toast("Error: "+(r.error||"intenta de nuevo")); return; }
    const apsIni = {};
    seccionesSel.forEach(s=>{ apsIni[grado+"|"+s] = 24; });
    S.docente = Object.assign({}, S.docente, { id:r.id, codigo:r.codigo, nombre, colegio, distrito, whatsapp, nivel,
      grado, seccion: seccionesSel[0]||"A", jornada, especialidad, asignaturasSel: asignaturas,
      secciones: seccionesSel, gradosSecciones: seccionesSel.map(s=>grado+"|"+s), alumnosPorSeccion: apsIni });
    guardar();
    pushNotif("¡Bienvenida/o a PlanApp! Completa tu perfil en la pantalla Perfil (grados, secciones, alumnos y duración de clase) para que generemos planes personalizados para ti.","perfil");''',
    "notificación bienvenida + datos en perfil")

rep('''  const nivel = S.docente.nivel;
  if(p.nivel && p.nivel!==nivel) return false;
  if(nivel==="Inicial"){
    const pg = normalizaGrado(p.grado), dg = normalizaGrado(S.docente.grado);
    if(pg && dg && pg!==dg) return false;''',
    '''  const nivel = S.docente.nivel;
  if(p.nivel && p.nivel!==nivel) return false;
  if(nivel==="Inicial"){
    const pg = normalizaGrado(p.grado);
    const mis = misGradosDocente();
    if(pg && mis.length && !mis.includes(pg)) return false;
    const dg = normalizaGrado(S.docente.grado);
    if(pg && dg && !mis.length && pg!==dg) return false;''',
    "planParaDocente Inicial multi-grado")

# ================= 2. NOTIFICACIONES: sonido =================
rep('''function pushNotif(texto, icono){
  if(S.notificaciones.some(x=>x.texto===texto)) return;
  S.notificaciones.unshift({ id: Date.now()+"-"+Math.random().toString(36).slice(2,6), texto, icono: icono||"campana", fecha: new Date().toISOString(), leida:false });
  if(S.notificaciones.length>60) S.notificaciones.pop();
  guardar(); actualizarCampana();
}''',
    '''function beepNotif(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    [[659,0],[784,0.16],[988,0.32]].forEach(([f,d])=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.connect(g); g.connect(ctx.destination); o.frequency.value=f; o.type="sine";
      g.gain.setValueAtTime(0.0001, ctx.currentTime+d);
      g.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime+d+0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+d+0.55);
      o.start(ctx.currentTime+d); o.stop(ctx.currentTime+d+0.6);
    });
    try{ if(navigator.vibrate) navigator.vibrate([90,60,90]); }catch(e){}
  }catch(e){}
}
function pushNotif(texto, icono){
  if(S.notificaciones.some(x=>x.texto===texto)) return;
  S.notificaciones.unshift({ id: Date.now()+"-"+Math.random().toString(36).slice(2,6), texto, icono: icono||"campana", fecha: new Date().toISOString(), leida:false });
  if(S.notificaciones.length>60) S.notificaciones.pop();
  guardar(); actualizarCampana();
  beepNotif();
}''', "beepNotif estético")

# ================= 3. PERFIL =================
rep('''      <span class="foto-chip">${ic("usuarios",13)} Foto de perfil</span>
      <button class="btn-soft foto-chip" style="padding:7px 6px;font-size:12px;white-space:nowrap;background:#fff" onclick="$('inpFoto').click()">${ic("refrescar",13)} ${S.docente.foto? "Cambiar foto":"Subir foto"}</button>''',
    '''      <span class="foto-chip">${ic("usuarios",13)} Foto de perfil</span>
      <button class="foto-chip" style="padding:7px 6px;font-size:12px;white-space:nowrap" onclick="$('inpFoto').click()">${ic("refrescar",13)} ${S.docente.foto? "Cambiar foto":"Subir foto"}</button>''',
    "chips foto sin fondo inline")

rep('''    <h2>${ic("usuarios")} Datos registrados</h2>
    <div class="stat-row"><span>Nombre</span><b>${esc(S.docente.nombre)}</b></div>
    <div class="stat-row"><span>Colegio</span><b>${esc(S.docente.colegio)}</b></div>''',
    '''    <h2>${ic("logo")} Tu perfil docente</h2>
    <div class="stat-row"><span>Nombre</span><b>${esc(S.docente.nombre)}</b></div>
    <div class="stat-row"><span>Distrito</span><b>${esc(S.docente.distrito||"—")}</b></div>
    <div class="stat-row"><span>Colegio</span><b>${esc(S.docente.colegio)}</b></div>''',
    "Tu perfil docente + Distrito bajo Nombre")

# quitar la fila Distrito antigua (quedaba tras Colegio)
rep('''    <div class="stat-row"><span>Colegio</span><b>${esc(S.docente.colegio)}</b></div>
    <div class="stat-row"><span>Distrito</span><b>${esc(S.docente.distrito||"—")}</b></div>''',
    '''    <div class="stat-row"><span>Colegio</span><b>${esc(S.docente.colegio)}</b></div>''',
    "fila Distrito sin duplicar")

# fix teclado/select: no re-renderizar Perfil mientras se edita
rep('''  actualizarCampana();
  if($("scr-info").classList.contains("visible")) renderInfo();
}''',
    '''  actualizarCampana();
  if($("scr-info").classList.contains("visible")){
    const a = document.activeElement;
    const editando = a && a.tagName && ["INPUT","TEXTAREA","SELECT"].indexOf(a.tagName)>=0;
    const modalAbierto = $("modalHoja") && $("modalHoja").classList.contains("abierta");
    if(!editando && !modalAbierto) renderInfo();
  }
}''', "guard de re-render en flush")

# animaciones de 3 segundos
rep('''function confirmarCierre(){
  cerrarConfCierre();
  cerrarSesion();
}''',
    '''function animarAccion(texto, luego){
  const ov = $("accAnim");
  if(!ov){ luego(); return; }
  $("accTxt").textContent = texto;
  ov.classList.add("activo");
  setTimeout(()=>{ ov.classList.remove("activo"); luego(); }, 3000);
}
function confirmarCierre(){
  cerrarConfCierre();
  animarAccion("Cerrando tu sesión…", cerrarSesion);
}''', "animación cierre de sesión")

rep('''function confirmarBorrado(){
  S.asistencia={}; S.evaluacion={}; S.tiempoClase={}; S.obs={}; S.evalsCom={}; S.calificaciones={}; S.libreta={}; guardar();
  cerrarBorrar();
  toast("Datos locales borrados"); renderInfo();
}''',
    '''function confirmarBorrado(){
  cerrarBorrar();
  animarAccion("Borrando datos locales…", ()=>{
    S.asistencia={}; S.evaluacion={}; S.tiempoClase={}; S.obs={}; S.evalsCom={}; S.evalsEvid={}; S.calificaciones={}; S.libreta={}; guardar();
    toast("Datos locales borrados"); renderInfo();
  });
}''', "animación borrar datos")

# ================= 4. CLASE DIARIA =================
rep('''  if(T.momentoActivo===i && T.resta>0){
        el.innerHTML = T.corriendo? "▶ En curso" : "⏸ Pausada";''',
    '''  if(T.momentoActivo===i && T.resta>0){
        el.innerHTML = T.corriendo? "▶ En curso" : "⏸ En pausa";''', "etiqueta En pausa")

rep('''function iniciarMomento(ev, i){
  ev.stopPropagation();
  const plan = planAbierto || planActivo();
  const d = clasePorId(plan, claseActualId);
  const momentos = (d && d.momentos)||[];
  const m = momentos[i]; if(!m) return;
  const base = momentos.reduce((a,x)=>a+(minsDe(x.duracion)||0),0);
  const mins = Math.max(1, minsDe(duracionAjustada(m, base)) || 5);
  setDur(mins, null);
  T.momentoActivo = i;
  if(!T.corriendo) playTimer();
  pintarDurChips();''',
    '''function iniciarMomento(ev, i){
  ev.stopPropagation();
  const plan = planAbierto || planActivo();
  const d = clasePorId(plan, claseActualId);
  const momentos = (d && d.momentos)||[];
  const m = momentos[i]; if(!m) return;
  if(T.momentoActivo===i && T.resta>0){
    playTimer();
    pintarDurChips();
    pintarTimer();
    return;
  }
  const base = momentos.reduce((a,x)=>a+(minsDe(x.duracion)||0),0);
  const mins = Math.max(1, minsDe(duracionAjustada(m, base)) || 5);
  setDur(mins, null);
  T.momentoActivo = i;
  if(!T.corriendo) playTimer();
  pintarDurChips();
  pintarTimer();''', "chip pausa/reanuda")

# quitar tarjeta Cronómetro y crear flotante
rep('''  <div class="card">
    <h2>${ic("reloj")} Cronómetro de la clase</h2>
    <p class="muted" style="margin-bottom:8px;font-size:12.5px">Cronometra cada momento o la clase completa.</p>
    ${temporizadorHTML(durs.length? durs : null)}
  </div>
  <h2 class="mini">Momentos de la clase</h2>''',
    '''  <h2 class="mini">Momentos de la clase</h2>''', "sin tarjeta cronómetro")

rep('''function temporizadorHTML(durs){
  durs = (durs && durs.length)? durs : [5,10,15];
  
  return `
  <div class="timer-wrap" id="timerBox">
    <div class="timer-ring">
      <svg width="96" height="96">
        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(0,51,160,.12)" stroke-width="8"/>

      </svg>
      <div class="t-txt"><b id="timerTxt">${String(Math.floor((durs[0]*60)/60)).padStart(2,"0")}:00</b><small id="timerEstado">Listo</small></div>
    </div>
    <div class="timer-ctrl">
      <div class="timer-btns">
        <button class="btn-soft" id="btnPlay" onclick="playTimer()">${ic("play",14)} Iniciar</button>
        <button class="btn-soft" onclick="resetTimer()">${ic("reiniciar",14)} Reiniciar</button>
      </div>
    </div>
  </div>`;
}''',
    '''function temporizadorHTML(durs){
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
}
function pintarCronoFlotante(durs){
  const cf = $("cronoFlotante");
  if(!cf) return;
  if(!claseActualId){ cf.style.display = "none"; return; }
  const llave = JSON.stringify(durs||null);
  if(cf.dataset.durs !== llave){
    cf.innerHTML = temporizadorHTML(durs && durs.length? durs : null);
    cf.dataset.durs = llave;
  }
}
function volverAClaseActiva(){
  if(claseActualId && clasePorId(planAbierto || planActivo(), claseActualId)) irA("clase", claseActualId);
}''', "temporizador flotante")

rep('''function pintarTimer(){
  pintarDurChips();
  const m = Math.floor(T.resta/60), s = T.resta%60;
  $("timerTxt").textContent = String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
}''',
    '''function pintarTimer(){
  pintarDurChips();
  const m = Math.floor(T.resta/60), s = T.resta%60;
  const tt = $("timerTxt");
  if(tt) tt.textContent = String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  const circ = $("timerCirc");
  if(circ) circ.setAttribute("stroke-dashoffset", String(Math.round(251.3*(1-(T.resta/Math.max(1,T.dur))))));
  const cf = $("cronoFlotante");
  if(cf) cf.style.display = (claseActualId && T && T.momentoActivo!=null && T.resta>0)? "" : "none";
}''', "pintarTimer con flotante")

# pintar flotante al renderizar clase
rep('''  $("scr-clase").innerHTML = html;
  initTimer(durs.length? durs : null);''',
    '''  $("scr-clase").innerHTML = html;
  pintarCronoFlotante(durs.length? durs : null);
  initTimer(durs.length? durs : null);''', "pintar flotante al abrir clase")

# ================= COTEJOS: backend bidireccional =================
rep('''  S.evalsEvid[k] = { estado, sel: Object.assign({}, eval2.evid[estado]||{}), obs };
  guardar();''',
    '''  S.evalsEvid[k] = { estado, sel: Object.assign({}, eval2.evid[estado]||{}), obs };
  guardar();
  syncAhora();''', "evaluación se envía al backend al instante")

rep('''setInterval(()=>{
  try{
    if(!navigator.onLine || !S || !S.docente.codigo || document.hidden) return;
    syncEstado();
    cargarPlanes().then(()=>{ if(pantallaActual==="diaria") abrirPlanEnCurso().then(()=>{ if(pantallaActual==="diaria") renderDiaria(); }); });
  }catch(e){ }
}, 25000);''',
    '''setInterval(()=>{
  try{
    if(!navigator.onLine || !S || !S.docente.codigo || document.hidden) return;
    syncEstado();
    apiAccion("pull-evals", { codigo: S.docente.codigo }).then(r=>{
      if(!r || !r.success) return;
      let cambio = false;
      const ev = r.evalsEvid||{}, com = r.evalsCom||{};
      Object.keys(ev).forEach(k=>{ if(!(k in S.evalsEvid)){ S.evalsEvid[k] = ev[k]; cambio = true; } });
      Object.keys(com).forEach(k=>{ if(!(k in S.evalsCom)){ S.evalsCom[k] = com[k]; cambio = true; } });
      if(cambio) guardar();
    }).catch(()=>{});
    cargarPlanes().then(()=>{ if(pantallaActual==="diaria") abrirPlanEnCurso().then(()=>{ if(pantallaActual==="diaria") renderDiaria(); }); });
  }catch(e){ }
}, 25000);''', "pull-evals bidireccional")

# ================= 5. PLANES MENSUALES INICIAL =================
rep('''  const arr = [];
  const mesesReales = new Set((S.listaPlanes||[]).filter(p=>!/plan anual/i.test(p.titulo)).map(p=>parseMes(p.mes)).filter(Boolean));
  PLANES_ANUALES[nivel].temas.forEach((m,i)=>{''',
    '''  const arr = [];
  const mesesReales = new Set((S.listaPlanes||[]).filter(p=>!/plan anual/i.test(p.titulo)).map(p=>parseMes(p.mes)).filter(Boolean));
  if(nivel==="Inicial") PLANES_ANUALES[nivel].temas.forEach(()=>{});
  else PLANES_ANUALES[nivel].temas.forEach((m,i)=>{''', "sin unidades derivadas en Inicial")

rep('''<div class="kv"><b>Estrategia</b><span>${esc(plan.estrategia || "Unidad de Aprendizaje")}</span></div>''',
    '''<div class="kv"><b>Estrategia</b><span>${esc(plan.estrategia || (plan.nivel==="Inicial"? "Centro de Interés" : "Unidad de Aprendizaje"))}</span></div>''',
    "estrategia Centro de Interés")

# sugerencias al renderizar onboarding
rep('''function mostrarRegistro(){
  animIn("cardRegistro");''',
    '''function mostrarRegistro(){
  animIn("cardRegistro");
  cargarSugerencias();''', "sugerencias al abrir registro")

open("app-docente.js","w",encoding="utf-8").write(JS)

# ================= CSS + HTML shell =================
css_v21 = '''/* ---------- v21 ---------- */
.foto-card{overflow:visible}
.foto-card::before{border-radius:20px 20px 0 0}
.foto-card .foto-chip{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:transparent;
  border:1.5px solid rgba(255,255,255,.65);border-radius:12px;padding:7px 6px;font-size:12px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden}
.onb-secs{display:flex;gap:6px;flex-wrap:wrap}
.onb-sec{flex:1;min-width:36px;padding:9px 0;border:1.5px solid rgba(0,51,160,.25);border-radius:12px;background:#fff;
  font-weight:800;font-size:13px;color:var(--azul-osc);transition:all .15s ease}
.onb-sec.sel{background:var(--azul);color:#fff;border-color:var(--azul);transform:scale(1.05)}
.m-exp.abierta .m-cuerpo{max-height:1600px}
.crono-flotante{position:fixed;right:14px;bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:90;
  background:linear-gradient(135deg,#001C5A 0%,#0033A0 55%,#0B4FD8 100%);border-radius:24px;padding:14px 14px 12px;
  box-shadow:0 14px 34px rgba(0,30,90,.45);border:1px solid rgba(255,255,255,.25);width:150px}
.crono-flotante .timer-wrap{flex-direction:column;gap:10px}
.crono-flotante .timer-ring svg{width:74px;height:74px}
.crono-flotante .t-txt b{color:#fff}
.crono-flotante .t-txt small{color:rgba(255,255,255,.85)}
.crono-flotante .timer-btns{flex-direction:column;gap:6px}
.crono-flotante .timer-btns .btn-soft{width:100%;padding:8px 6px;font-size:11.5px;background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.35)}
.acc-anim{position:fixed;inset:0;background:rgba(3,17,53,.58);backdrop-filter:blur(3px);z-index:300;display:none;align-items:center;justify-content:center}
.acc-anim.activo{display:flex}
.acc-card{background:#fff;border-radius:22px;padding:22px 30px;text-align:center;box-shadow:0 18px 40px rgba(0,30,90,.4)}
.acc-card p{font-weight:800;color:var(--azul-osc);font-size:14px;margin-top:12px}
.acc-spin{width:38px;height:38px;border-radius:50%;border:4px solid rgba(0,51,160,.15);border-top-color:var(--azul);animation:accSpin .9s linear infinite;margin:0 auto}
@keyframes accSpin{to{transform:rotate(360deg)}}
/* ---------- v20 ----------'''
HT = HT.replace("/* ---------- v20 ----------", css_v21, 1)
HT = HT.replace('<div id="toast"></div>',
'''<div id="cronoFlotante" class="crono-flotante" style="display:none" onclick="volverAClaseActiva()"></div>
<div id="accAnim" class="acc-anim"><div class="acc-card"><div class="acc-spin"></div><p id="accTxt">Un momento…</p></div></div>
<div id="toast"></div>''', 1)
open("plan-docente-inicial.html","w",encoding="utf-8").write(HT)
print("CSS v21 ok")

# ================= BACKEND =================
viejo = '''    return new Response(JSON.stringify({ success: false, error: "Acción no soportada: " + accion }), { status: 400, headers: JSON_HEADERS });'''
nuevo = '''    /* ---------- SUGERENCIAS: colegios y distritos registrados ---------- */
    if (accion === "sugerencias") {
      const docentes = await listar(db, "DocenteApp");
      const colegios = new Set<string>();
      const distritos = new Set<string>();
      docentes.forEach((x: any) => {
        const d = x.data ?? x;
        const c = String(d.colegio ?? "").trim();
        const di = String(d.distrito ?? "").trim();
        if (c) colegios.add(c);
        if (di) distritos.add(di);
      });
      return new Response(JSON.stringify({
        success: true,
        colegios: Array.from(colegios).slice(0, 80),
        distritos: Array.from(distritos).slice(0, 80),
      }), { status: 200, headers: JSON_HEADERS });
    }

    /* ---------- PULL-EVALS: servir cotejos guardados en backend ---------- */
    if (accion === "pull-evals") {
      const codigo = String(payload.codigo || "").trim().toUpperCase();
      if (!codigo) {
        return new Response(JSON.stringify({ success: false, error: "Falta codigo" }), { status: 400, headers: JSON_HEADERS });
      }
      const docentes = await listar(db, "DocenteApp");
      const d = docentes.find((x: any) => String(x.data?.codigo ?? x.codigo ?? "").toUpperCase() === codigo);
      if (!d) {
        return new Response(JSON.stringify({ success: false, error: "Docente no encontrado" }), { status: 404, headers: JSON_HEADERS });
      }
      const p = { ...(d.data ?? d) };
      let evalsEvid: any = {};
      let evalsCom: any = {};
      if (p.estado_json) {
        try {
          const est = JSON.parse(p.estado_json);
          evalsEvid = (est && typeof est === "object" && est.evalsEvid) ? est.evalsEvid : {};
          evalsCom = (est && typeof est === "object" && est.evalsCom) ? est.evalsCom : {};
        } catch (_e) { /* estado corrupto: devolver vacío */ }
      }
      return new Response(JSON.stringify({ success: true, evalsEvid, evalsCom }), { status: 200, headers: JSON_HEADERS });
    }

    return new Response(JSON.stringify({ success: false, error: "Acción no soportada: " + accion }), { status: 400, headers: JSON_HEADERS });'''
if viejo not in BK:
    print("FALTA ANCLA: backend"); sys.exit(1)
BK = BK.replace(viejo, nuevo, 1)
open("functions/appDocentes.ts","w",encoding="utf-8").write(BK)
print("backend ok")

# ================= DESCRIPCIONES LIMPIAS (seed) =================
DESCS = {
 "Maternal": "Nivel Maternal: exploración sensorial del propio cuerpo con canciones, masajes y juegos de sensación. Identidad y autoconocimiento (mi cuerpo, mis sensaciones) bajo la estrategia Centro de Interés, según la Adecuación Curricular 2023.",
 "Pre-Kínder": "Nivel Pre-Kínder (3 años): descubrimiento guiado del cuerpo y los sentidos mediante el juego y la exploración. Identidad y autoconocimiento (mi cuerpo, mis sentidos) bajo la estrategia Centro de Interés, según la Adecuación Curricular 2023.",
 "Kínder": "Nivel Kínder (4 años): descripción y vocabulario del cuerpo, la identidad y la salud. Identidad y autoconocimiento (mi cuerpo, mis sentidos) bajo la estrategia Centro de Interés, según la Adecuación Curricular 2023.",
 "Pre-Primario": "Nivel Pre-Primario (5 años): autonomía, funciones del cuerpo y hábitos saludables. Identidad y autoconocimiento (mi cuerpo, mis sentidos y mi salud) bajo la estrategia Centro de Interés, según la Adecuación Curricular 2023.",
}
recs = json.load(open("planapp_records_v4.json", encoding="utf-8"))
n = 0
for r in recs:
    t = r.get("titulo","")
    for g, desc in DESCS.items():
        if g in t and "Plan Mensual" in t:
            r["descripcion"] = desc; n += 1
json.dump(recs, open("planapp_records_v4.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
print("seed descripciones limpias:", n)
print("PATCH v21 COMPLETO")
