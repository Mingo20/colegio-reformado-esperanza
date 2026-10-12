# -*- coding: utf-8 -*-
"""Parche v23: franja ovalada, sin texto de minutos, cronómetro flotante centrado con
   estado + arrastrable sin línea roja ni clic-ocultar, estructura MINERD en el
   plan mensual (situación, competencias específicas, triada, evaluación y
   metacognición) y momentos con guía detallada."""
import sys

JS = open("app-docente.js", encoding="utf-8").read()
HT = open("plan-docente-inicial.html", encoding="utf-8").read()
BE = open("functions/appDocentes.ts", encoding="utf-8").read()
LO = open("functions/cargarBibliotecaPlanes.ts", encoding="utf-8").read()

def rep(txt, viejo, nuevo, nombre, archivo="JS"):
    if viejo not in txt:
        print("FALTA ANCLA:", nombre); sys.exit(1)
    print("ok:", nombre)
    return txt.replace(viejo, nuevo, 1)

# ================= JS =================
# 1. Ocultar texto de minutos ajustados
JS = rep(JS, '''  ${S.docente.duracionMin? `<p class="vacio" style="padding:4px">Momentos ajustados a tu clase de ${S.docente.duracionMin} minutos, si lo deseas (cámbialo en perfil).</p>`:""}
''', '', "sin texto de minutos ajustados")

# 2. Cronómetro: etiqueta de estado bajo el número
JS = rep(JS, '''      <div class="t-txt"><b id="timerTxt">${String(Math.floor((durs[0]*60)/60)).padStart(2,"0")}:00</b></div>''',
'''      <div class="t-txt"><b id="timerTxt">${String(Math.floor((durs[0]*60)/60)).padStart(2,"0")}:00</b><small id="timerEstado">Listo</small></div>''',
 "etiqueta de estado en el cronómetro")

# 3. Arrastre del cronómetro flotante
JS = rep(JS, '''function setBtn(html){ const b=$("btnPlay"); if(b) b.innerHTML = html; }''',
'''function habilitarArrastreCrono(){
  const el = $("cronoFlotante");
  if(!el || !el.addEventListener) return;
  let ox=0, oy=0, dragging=false, movio=false;
  el.addEventListener("pointerdown", e=>{
    dragging=true; movio=false;
    const r = el.getBoundingClientRect();
    ox = e.clientX - r.left; oy = e.clientY - r.top;
    try{ el.setPointerCapture(e.pointerId); }catch(_e){}
    el.classList.add("arrastrando");
  });
  el.addEventListener("pointermove", e=>{
    if(!dragging) return;
    movio=true;
    const w = (window.innerWidth||360), h = (window.innerHeight||640);
    el.style.left = Math.max(4, Math.min(w-92, e.clientX-ox))+"px";
    el.style.top  = Math.max(4, Math.min(h-92, e.clientY-oy))+"px";
    el.style.right = "auto"; el.style.bottom = "auto";
  });
  const soltar = ()=>{
    if(!dragging) return;
    dragging=false;
    el.classList.remove("arrastrando");
    if(movio){
      const r = el.getBoundingClientRect();
      if(!S.ui) S.ui = {};
      S.ui.cronoPos = { left: Math.round(r.left), top: Math.round(r.top) };
      guardar();
    }
  };
  el.addEventListener("pointerup", soltar);
  el.addEventListener("pointercancel", soltar);
}
function aplicarPosCrono(){
  const el = $("cronoFlotante");
  if(!el) return;
  const p = S.ui && S.ui.cronoPos;
  if(p && typeof p.left === "number" && typeof p.top === "number"){
    el.style.left = p.left+"px"; el.style.top = p.top+"px";
    el.style.right = "auto"; el.style.bottom = "auto";
  }
}
function setBtn(html){ const b=$("btnPlay"); if(b) b.innerHTML = html; }''',
 "cronómetro arrastrable")

# 4. Boot: habilitar arrastre y restaurar posición
JS = rep(JS, '''    restaurarCrono();
    animLogin(''',
'''    restaurarCrono();
    habilitarArrastreCrono();
    aplicarPosCrono();
    animLogin(''', "boot arrastre y posición")

# 5. renderMesDetalle: situación de aprendizaje MINERD
JS = rep(JS, '''      <div class="kv"><b>Descripción</b><span>${esc(plan.descripcion||"")}</span></div>
      <div class="kv"><b>Tema</b><span>${esc(plan.tema||"")}</span></div>''',
'''      <div class="kv"><b>Descripción</b><span>${esc(plan.descripcion||"")}</span></div>
      ${(plan.situacion)? `
      <div class="kv"><b>Punto de partida</b><span>${esc(plan.situacion.partida||"")}</span></div>
      <div class="kv"><b>Estrategia</b><span>${esc(plan.situacion.estrategia||"")}</span></div>
      <div class="kv"><b>Proceso</b><span>${esc(plan.situacion.proceso||"")}</span></div>
      <div class="kv"><b>Producto final</b><span>${esc(plan.situacion.producto||"")}</span></div>`:""}
      <div class="kv"><b>Tema</b><span>${esc(plan.tema||"")}</span></div>''',
 "situación de aprendizaje MINERD")

# 6. renderMesDetalle: competencias específicas + triada de contenidos
JS = rep(JS, '''    ${(plan.areas||[]).length? `<h3>Áreas curriculares</h3>${(plan.areas||[]).map(a=>`<span class="chip roja">${esc(a)}</span>`).join("")}`:""}
  </div>''',
'''    ${(!esDerivado && plan.evaluacion && Array.isArray(plan.evaluacion.especificas) && plan.evaluacion.especificas.length)? `
    <h3>Competencias específicas</h3>
    <div class="mcard"><ul>${plan.evaluacion.especificas.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>`:""}
    ${(!esDerivado && plan.contenidos)? `
    <h3>Contenidos de la unidad</h3>
    <div class="mcard"><div class="m-tit"><div class="n">C</div><b>Conceptuales (Saber)</b></div><ul>${(plan.contenidos.conceptuales||[]).map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <div class="mcard"><div class="m-tit"><div class="n">P</div><b>Procedimentales (Saber hacer)</b></div><ul>${(plan.contenidos.procedimentales||[]).map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <div class="mcard"><div class="m-tit"><div class="n">A</div><b>Actitudinales y valores (Saber ser)</b></div><ul>${(plan.contenidos.actitudinales||[]).map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>`:""}
    ${(plan.areas||[]).length? `<h3>Áreas curriculares</h3>${(plan.areas||[]).map(a=>`<span class="chip roja">${esc(a)}</span>`).join("")}`:""}
  </div>''',
 "competencias específicas y triada")

# 7. renderMesDetalle: sección 5 de evaluación
JS = rep(JS, '''    if(!esAnualPlan(plan)) html += `<p class="vacio">Las clases diarias de este mes se trabajan desde la pantalla «Planificación diaria».</p>`;
  }''',
'''    if(!esAnualPlan(plan)) html += `<p class="vacio">Las clases diarias de este mes se trabajan desde la pantalla «Planificación diaria».</p>`;
  }
  if(!esDerivado && plan.evaluacion){
    const ev = plan.evaluacion;
    html += `
  <div class="card">
    <h2>${ic("nota")} 5. Evaluación de la unidad</h2>
    ${(ev.indicadores||[]).length? `<h3>Indicadores de logro</h3><div class="mcard"><ul>${ev.indicadores.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>`:""}
    ${(ev.tecnicas||[]).length? `<h3>Técnicas e instrumentos</h3><div class="mcard"><ul>${ev.tecnicas.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>`:""}
    ${(ev.metacognicion||[]).length? `<h3>Metacognición</h3><div class="mcard"><ul>${ev.metacognicion.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>`:""}
  </div>`;
  }''', "sección 5 evaluación de la unidad")

open("app-docente.js","w",encoding="utf-8").write(JS)

# ================= HTML =================
HT = rep(HT, '.timer-corriendo{outline:2px solid rgba(206,17,38,.5);outline-offset:2px;border-radius:20px}',
            '.timer-corriendo{outline:none}', "sin línea roja alrededor", "HT")
HT = rep(HT, '<div id="cronoFlotante" class="crono-flotante" style="display:none" onclick="volverAClaseActiva()"></div>',
            '<div id="cronoFlotante" class="crono-flotante" style="display:none"></div>',
            "clic del cronómetro eliminado", "HT")
HT = rep(HT, '.foto-card::before{border-radius:var(--radio) var(--radio) 0 0}',
            '.foto-card::before{height:6px;border-radius:16px 16px 0 0}',
            "franja roja ovalada", "HT")
css_v23 = '''/* ---------- v23 ---------- */
.crono-flotante{right:14px;bottom:calc(88px + env(safe-area-inset-bottom));touch-action:none;cursor:grab}
.crono-flotante.arrastrando{cursor:grabbing}
.crono-flotante .timer-ring{width:88px;height:88px}
.crono-flotante .timer-ring svg{width:88px;height:88px;display:block}
.crono-flotante .t-txt b{font-size:16px;letter-spacing:0}
.crono-flotante .t-txt small{display:block;font-size:8.5px;line-height:1.1;color:#1D4ED8;font-weight:800;letter-spacing:0}
</style>'''
HT = rep(HT, '</style>', css_v23, "css v23", "HT")
open("plan-docente-inicial.html","w",encoding="utf-8").write(HT)

# ================= BACKEND =================
BE = rep(BE, '''        ciclo: parseSeguro(d.ciclo_json, null),
        semanas,''',
'''        ciclo: parseSeguro(d.ciclo_json, null),
        situacion: parseSeguro(d.situacion_json, null),
        contenidos: parseSeguro(d.contenidos_json, null),
        evaluacion: parseSeguro(d.evaluacion_json, null),
        semanas,''', "backend: situacion/contenidos/evaluacion")
open("functions/appDocentes.ts","w",encoding="utf-8").write(BE)

# ================= LOADER =================
LO = rep(LO, 'const url = "https://raw.githubusercontent.com/Mingo20/colegio-reformado-esperanza/main/planapp_records_v5.json";',
            'const url = "https://raw.githubusercontent.com/Mingo20/colegio-reformado-esperanza/main/planapp_records_v6.json";',
            "loader url v6", "LO")
LO = rep(LO, '''        ciclo_json: String(reg.ciclo_json || "{}"),''',
'''        ciclo_json: String(reg.ciclo_json || "{}"),
        situacion_json: String(reg.situacion_json || "{}"),
        contenidos_json: String(reg.contenidos_json || "{}"),
        evaluacion_json: String(reg.evaluacion_json || "{}"),''',
            "loader campos MINERD", "LO")
open("functions/cargarBibliotecaPlanes.ts","w",encoding="utf-8").write(LO)
print("PATCH v23 COMPLETO")
