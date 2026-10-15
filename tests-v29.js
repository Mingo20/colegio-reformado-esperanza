const elementos = {};
function fakeEl(id){
  if(!elementos[id]){
    const el = { id, innerHTML:"", textContent:"", value:"", style:{}, _clases:new Set(), addEventListener(){}, dataset:{}, scrollTop:0, appendChild(){}, remove(){}, setAttribute(){}, click(){} };
    el.classList = {
      add(...cs){ cs.forEach(c=>el._clases.add(c)); },
      remove(...cs){ cs.forEach(c=>el._clases.delete(c)); },
      toggle(c,f){ if(f===undefined){ el._clases.has(c)? el._clases.delete(c) : el._clases.add(c); } else { f? el._clases.add(c) : el._clases.delete(c); } },
      contains(c){ return el._clases.has(c); },
    };
    elementos[id] = el;
  }
  return elementos[id];
}
globalThis.__llamadas = [];
globalThis.__vibras = 0;
globalThis.document = {
  getElementById: (id)=>{ if(elementos[id]) return elementos[id]; for(const k in elementos){ if(elementos[k].id===id) return elementos[k]; } return fakeEl(id); }, querySelectorAll: ()=>({ forEach(){} }),
  querySelector: ()=>({ classList:{ add(){}, remove(){} } }),
  createElement: ()=>fakeEl("t"+Math.random()),
  addEventListener(){}, hidden:false, activeElement:undefined, body:{ appendChild(){}, removeChild(){} },
};
globalThis.localStorage = { _d:{}, getItem(k){ return this._d[k]||null; }, setItem(k,v){ this._d[k]=v; } };
globalThis.window = globalThis;
globalThis.addEventListener = ()=>{};
globalThis.removeEventListener = ()=>{};
globalThis.scrollTo = ()=>{};
globalThis.AudioContext = function(){ this.destination={}; this.createOscillator=()=>({connect(){},start(){},stop(){},frequency:{},type:''}); this.createGain=()=>({connect(){},gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}}}); this.currentTime=0; };
globalThis.navigator = { vibrate: ()=>{ globalThis.__vibras++; return true; } };
globalThis.__PLAN_REMOTO = { titulo:"Plan Remoto Fresco", mes:"Octubre 2026", nivel:"Inicial", grado:"Kínder", semanas:[{ numero:1, tema:"S1", fechas:"f", dias:[{ id:"2026-10-01", etiqueta:"jue 1 oct", titulo:"Clase remota", desempenos:["d1"], recursos:[], momentos:[] }] }] };
globalThis.fetch = async (url, opts)=>{
  const body = JSON.parse(opts.body);
  globalThis.__llamadas.push({ url, body });
  if(body.accion==="plan") return { ok:true, json: async ()=>({ success:true, plan: globalThis.__PLAN_REMOTO }) };
  return { ok:true, json: async ()=>({ success:true, planes:[] }) };
};
globalThis.__pdfTextos = []; globalThis.__ultimosPdf = [];
function FakePdf(){
  this.addPage=()=>{}; this.save=(n)=>{ globalThis.__ultimosPdf.push(n); };
  this.text=(...a)=>{ globalThis.__pdfTextos.push(a.filter(x=>typeof x==="string"||typeof x==="number").map(String).join(" ")); };
  this.rect=()=>{}; this.roundedRect=()=>{}; this.circle=()=>{}; this.line=()=>{}; this.setDrawColor=()=>{}; this.setFillColor=()=>{};
  this.setTextColor=()=>{}; this.setFontSize=()=>{}; this.setFont=()=>this; this.splitTextToSize=(t)=>[String(t)];
}
globalThis.jspdf = { jsPDF: FakePdf };

/* ===== PRUEBAS V29 ===== */
(async ()=>{
  S.docente.id = ""; S.docente.codigo = ""; animLogin = ()=>{}; // initApp (async) no debe arrancar diaria durante los tests
  let fallos = 0;
  const probar = async (nombre, fn) => {
    try{ await fn(); console.log("OK  ", nombre); }
    catch(e){ fallos++; console.log("FAIL", nombre, "->", e.message); }
  };

  S.docente = Object.assign(S.docente, { id:"id1", codigo:"TEST15", nombre:"Docente V15", colegio:"C", distrito:"", whatsapp:"809",
    nivel:"Inicial", grado:"Pre-primario", seccion:"A", asignaturasSel:[], secciones:["A"], gradosSecciones:["Pre-primario|A"],
    alumnosPorSeccion:{ "Pre-primario|A":20 }, jornada:"Matutina", duracionMin:45, alumnos:20, periodo:"1er periodo", recursos:[], estrategias:{}, estGuarda:null });
  S.ui = { progTab:"progreso", progGrado:"Pre-primario", progSec:"A", histFiltro:"1" };
  S.puntos = {}; S.asistencia = {}; S.evaluacion = {}; S.evalsCom = {}; S.crono = {}; S.tiempoClase = {}; S.notificaciones = [];
  S.listaPlanes = []; S.cola = [];

  await probar("registro: sin aviso, con distrito y registro inteligente", ()=>{
    S.docente.id = null;
    mostrar("onboarding");
    const html = document.getElementById("scr-onboarding").innerHTML;
    if(html.includes("onb-aviso")) throw new Error("tarjeta aviso presente");
    if(!html.includes('id="onbDistrito"')) throw new Error("sin campo distrito");
    if(!html.includes('id="onbSmart"')) throw new Error("sin contenedor inteligente");
    if(!html.includes("onbNivelChange()")) throw new Error("sin onbNivelChange");
    if(!html.includes('id="onbJornada"') || !html.includes("selected disabled>Seleccionar</option>")) throw new Error("sin placeholders Seleccionar");
    if(!html.includes("Jornada del centro</label>")) throw new Error("etiqueta jornada no simplificada");
    if(html.includes("Jornada del centro educativo")) throw new Error("etiqueta vieja de jornada");
    if(!html.includes('id="onbWhatsLogin"')) throw new Error("sin campo WhatsApp en login");
    const iW = html.indexOf('id="onbWhats"'), iD = html.indexOf('id="onbDistrito"');
    if(iW<0 || iD<0) throw new Error("faltan campos whats/distrito");
    if(!html.includes("grid-2col")) throw new Error("sin filas de dos columnas");
    S.docente.id = "id1";
  });

  await probar("perfil: sin hero y foto rediseñada", ()=>{
    mostrar("info");
    const html = document.getElementById("scr-info").innerHTML;
    if(html.includes("Perfil del docente ·")) throw new Error("hero visible");
    if(html.includes("Tu foto aparece en el encabezado")) throw new Error("texto viejo presente");
    if(!html.includes("foto-card")) throw new Error("sin tarjeta foto-card");
    if(!html.includes('class="foto-wrap"')) throw new Error("sin foto envuelta");
    const iBtn = html.indexOf(S.docente.foto? "Cambiar foto":"Subir foto"), iTit = html.indexOf("Foto de perfil");
    if(!(iTit>-1 && iTit<iBtn)) throw new Error("botón no sigue al título");
  });

  await probar("borrar datos: modal elegante con animación de 3 segundos", async ()=>{
    borrarTodo();
    if(!document.getElementById("modalBorrarFondo").classList.contains("abierto")) throw new Error("modal no abre");
    if(!document.getElementById("modalBorrarHoja").classList.contains("abierta")) throw new Error("hoja no abre");
    S.asistencia["2026-10-01"] = { 1:"Presente" };
    confirmarBorrado();
    if(!document.getElementById("accAnim").classList.contains("activo")) throw new Error("sin animación de borrado");
    if(document.getElementById("modalBorrarFondo").classList.contains("abierto")) throw new Error("modal no cerró");
    await new Promise(r=>setTimeout(r,3200));
    if(Object.keys(S.asistencia).length!==0) throw new Error("no borró");
    if(document.getElementById("accAnim").classList.contains("activo")) throw new Error("animación no terminó");
    cerrarBorrar();
  });

  await probar("perfil: foto card con chip par y sin tarjeta sincronización", ()=>{
    mostrar("info");
    const html = document.getElementById("scr-info").innerHTML;
    if(!html.includes("foto-chip")) throw new Error("sin chips par en foto card");
    if(html.includes("Sincronización automática")) throw new Error("tarjeta sincronización presente");
    if(typeof syncAhora !== "function") throw new Error("sin syncAhora");
    if(typeof abrirPlanEnCurso !== "function") throw new Error("sin abrirPlanEnCurso");
  });

  await probar("perfil: tarjeta Estrategia eliminada y WhatsApp en datos", ()=>{
    mostrar("info");
    const html = document.getElementById("scr-info").innerHTML;
    if(html.includes("Estrategia de planificación")) throw new Error("tarjeta estrategia aún visible");
    if(html.includes("estGS") || html.includes("guardarEstrategia")) throw new Error("formularios de estrategia presentes");
    if(!html.includes("<span>WhatsApp</span>")) throw new Error("sin fila WhatsApp");
    if(!html.includes("<span>Distrito</span>")) throw new Error("sin fila Distrito");
    const iN = html.indexOf("<span>Nombre</span>"), iD = html.indexOf("<span>Distrito</span>"), iC = html.indexOf("<span>Colegio</span>");
    if(!(iN>-1 && iD>iN && iC>iD)) throw new Error("Distrito no está entre Nombre y Colegio");
    if(!html.includes(">"+S.docente.whatsapp+"<")) throw new Error("número de WhatsApp ausente");
  });

  await probar("progreso: Logrado en hero y EVALUACIÓN en modal Inicial", ()=>{
    mostrar("progreso");
    const html = document.getElementById("scr-progreso").innerHTML;
    if(!html.includes("<small>Logrado</small>")) throw new Error("sin Logrado en hero");
    if(html.includes("<small>Logros</small>")) throw new Error("etiqueta Logros presente");
    abrirHistorial(2,"progreso");
    if(document.getElementById("histTitulo").textContent!=="EVALUACIÓN · ALUMNO 2") throw new Error("título: "+document.getElementById("histTitulo").textContent);
    cerrarHistorial();
    S.docente.nivel="Primaria"; S.docente.asignaturasSel=["Matemática"];
    abrirHistorial(2,"progreso");
    if(document.getElementById("histTitulo").textContent!=="CALIFICAR · ALUMNO 2") throw new Error("Primaria cambió");
    cerrarHistorial();
    S.docente.nivel="Inicial"; S.docente.asignaturasSel=[];
  });

  await probar("progreso: rings con % y ★", ()=>{
    S.docente.nivel = "Primaria"; S.docente.asignaturasSel = ["Matemática"];
    S.puntos = {}; S.asistencia = {}; S.evaluacion = {};
    mostrar("progreso");
    const html = document.getElementById("scr-progreso").innerHTML;
    if(!html.includes("★")) throw new Error("sin estrella de promedio");
    if(!html.includes("—")) throw new Error("sin placeholder");
    const srcJS = require("fs").readFileSync("app-docente.js","utf8");
    if(!srcJS.includes('asis+"%"')) throw new Error("sin % en asistencia");
    S.docente.nivel = "Inicial"; S.docente.asignaturasSel = [];
  });

  await probar("calificaciones: registrar dos calificaciones el mismo día", ()=>{
    S.docente.nivel = "Primaria"; S.docente.asignaturasSel = ["Matemática"];
    S.puntos = {}; S.ui.histFiltro = "1";
    histActual = null;
    abrirHistorial(3, "progreso");
    document.getElementById("hpAsig").value = "Matemática";
    document.getElementById("hpTipo").value = "P";
    document.getElementById("hpPts").value = "80";
    document.getElementById("hpCom").value = "";
    registrarPunto();
    document.getElementById("hpPts").value = "90";
    registrarPunto();
    const arr = puntosDe(grupoProg(), 3);
    const mismoTipo = arr.filter(x=>x.tipo==="P" && (x.asig||"General")==="Matemática");
    if(mismoTipo.length!==2) throw new Error("segunda calificación no guardada: "+mismoTipo.length);
    S.docente.nivel = "Inicial"; S.docente.asignaturasSel = [];
  });

  await probar("secundaria: solo una asignatura", ()=>{
    S.docente.nivel = "Secundaria"; S.docente.asignaturasSel = [];
    toggleSel("asig", "Matemática");
    if(JSON.stringify(S.docente.asignaturasSel)!==JSON.stringify(["Matemática"])) throw new Error("no asignó única: "+S.docente.asignaturasSel);
    toggleSel("asig", "Inglés");
    if(S.docente.asignaturasSel.length!==1 || S.docente.asignaturasSel[0]!=="Inglés") throw new Error("no reemplazó: "+S.docente.asignaturasSel);
    S.docente.nivel = "Inicial"; S.docente.asignaturasSel = [];
  });

  await probar("mensual: sin anuales ni plan demo en la lista", ()=>{
    S.docente.nivel = "Inicial"; S.docente.grado = "Pre-Primario"; S.docente.periodo = "1er periodo";
    S.listaPlanes = [
      { id:"a1", titulo:"Plan Anual 2026-2027 · Inicial · Pre-Primario", mes:"Agosto 2026 – Junio 2027", tema:"", semanas:11, propio:false },
      { id:"m1", titulo:"Plan Mensual · Inicial Pre-Primario · Octubre 2026 · Mi cuerpo, mis sentidos y mi salud", mes:"Octubre 2026", tema:"", semanas:4, propio:false },
    ];
    const arr = planesMensuales();
    if(arr.some(p=>/plan anual/i.test(p.titulo))) throw new Error("anual en lista mensual");
    if(arr.some(p=>p.id==="local-mariposa")) throw new Error("plan demo mariposa en lista");
    if(!arr.some(p=>p.id==="m1")) throw new Error("plan mensual real ausente");
    if(arr.some(p=>p.id && p.id.startsWith("der-") && parseMes(p.mes)===HOY.slice(0,7))) throw new Error("unidad derivada duplicando el mes real");
  });

  await probar("v19: ring Tarde, fix Iniciado y login con WhatsApp", ()=>{
    S.docente.nivel = "Inicial"; S.docente.grado = "Kínder";
    S.ui.progGrado = "Kínder"; S.ui.progSec = "A";
    S.asistencia = {}; S.evaluacion = {};
    S.asistencia[HOY] = { 1:"Presente", 2:"Tarde", 3:"Tarde", 4:"Ausente" };
    mostrar("progreso");
    const html = document.getElementById("scr-progreso").innerHTML;
    if(!html.includes("<small>Tarde</small>")) throw new Error("sin ring Tarde");
    if(!html.includes("KÍNDER · SECCIÓN")) throw new Error("etiqueta grado·sección ausente");
    S.evaluacion[HOY] = { 1:"Iniciado" };
    const ev = evalsAlumno(1);
    if(ev.pI!==100) throw new Error("Iniciado sigue en cero: "+ev.pI);
    S.docente.id = null; mostrar("onboarding");
    const onb = document.getElementById("scr-onboarding").innerHTML;
    if(!onb.includes("Tu WhatsApp (usuario)")) throw new Error("login sin campo usuario WhatsApp");
    if(typeof animIn!=="function") throw new Error("sin función animIn");
    onbNivelChange();
    if(!document.getElementById("onbSmart").classList.contains("anim-in")) throw new Error("sin animación al elegir nivel");
    S.docente.id = "id1";
    S.asistencia = {}; S.evaluacion = {};
  });

  await probar("v20: IndexedDB, filtro por grado y sección, topbar PlanApp, estructura Mariposa", ()=>{
    if(typeof idbGuardar!=="function" || typeof idbCargar!=="function") throw new Error("sin helpers de IndexedDB");
    S.docente.nivel = "Primaria"; S.docente.grado = "3ro";
    S.docente.gradosSecciones = ["3ro|A","4to|B"]; S.docente.alumnosPorSeccion = {"3ro|A":20,"4to|B":15};
    if(alumnosDe("A","3ro")!==20) throw new Error("3ro|A mal filtrado");
    if(alumnosDe("B","4to")!==15) throw new Error("4to|B mal filtrado");
    if(alumnosDe("A","4to")!==0) throw new Error("grupo sin alumnos no da 0");
    S.ui.progGrado = "6to"; S.ui.progSec = "A";
    mostrar("progreso");
    const hp = document.getElementById("scr-progreso").innerHTML;
    if(!hp.includes("<small>Tarde</small>")) throw new Error("héroe sin ring Tarde");
    if(!hp.includes("No tienes alumnos registrados")) throw new Error("sin aviso de grupo vacío");
    S.ui.progGrado = "3ro"; S.ui.progSec = "A";
    mostrar("progreso");
    if(document.getElementById("scr-progreso").innerHTML.includes("No tienes alumnos registrados")) throw new Error("aviso vacío con grupo registrado");
    mostrar("anio");
    if(document.getElementById("tituloApp").textContent!=="PlanApp") throw new Error("topbar sin PlanApp");
    if(document.getElementById("subtituloApp").textContent!=="Tu plan listo para enseñar") throw new Error("topbar sin lema");
    if(document.getElementById("btnGuia").style.display!=="") throw new Error("botón guía oculto en anual");
    mostrar("onboarding");
    const fs = require("fs");
    const d = JSON.parse(fs.readFileSync("semanas-2027/plan-mensual-inicial-pre-k-nder-octubre-2026-mi-cuerpo-y-mis.json","utf-8"));
    const sem = d[0];
    if(JSON.stringify(Object.keys(sem))!==JSON.stringify(["numero","tema","fechas","dias"])) throw new Error("semana con campos extra: "+Object.keys(sem));
    const dia = sem.dias[0];
    if("cotejo" in dia) throw new Error("cotejo presente en día");
    if(JSON.stringify(dia.momentos.map(m=>m.nombre))!==JSON.stringify(["Inicio","Desarrollo","Práctica","Cierre"])) throw new Error("orden de momentos incorrecto");
    dia.momentos.forEach(m=>{
      if(JSON.stringify(Object.keys(m))!==JSON.stringify(["nombre","icono","duracion","proposito","pasos"])) throw new Error("momento con campos extra: "+Object.keys(m));
    });
    S.docente.gradosSecciones = []; S.docente.alumnosPorSeccion = {};
    S.docente.nivel = "Inicial"; S.docente.grado = "Pre-Primario"; S.docente.seccion = "A";
    S.ui.progGrado = null; S.ui.progSec = null;
    S.asistencia = {}; S.evaluacion = {}; S.evalsCom = {}; S.evalsEvid = {};
  });

  await probar("v21: registro inteligente, sonido, perfil y planes Inicial", ()=>{
    mostrar("onboarding");
    let oh = document.getElementById("scr-onboarding").innerHTML;
    if(!oh.includes("Regístrate Gratis")) throw new Error("sin botón Regístrate Gratis");
    if(!oh.includes('list="dlColegios"') || !oh.includes('list="dlDistritos"')) throw new Error("sin autocompletado");
    document.getElementById("onbNivel").value = "Inicial";
    onbNivelChange();
    let sh = document.getElementById("onbSmart").innerHTML;
    if(!sh.includes("onbSecs")) throw new Error("sin selector de secciones");
    if(!sh.includes("toggleOnbSec('F')")) throw new Error("sin sección F");
    toggleOnbSec("B"); toggleOnbSec("C");
    if(onbSecsSel.join(",")!=="B,C") throw new Error("multi-selector no acumula");
    toggleOnbSec("B");
    if(onbSecsSel.join(",")!=="C") throw new Error("multi-selector no deselecciona");
    document.getElementById("onbNivel").value = "Primaria";
    onbNivelChange();
    if(!document.getElementById("onbSmart").innerHTML.includes("Asignaturas básicas")) throw new Error("sin opción básicas");
    if(typeof beepNotif!=="function" || typeof animarAccion!=="function" || typeof cargarSugerencias!=="function") throw new Error("funciones v21 ausentes");
    const notifsAntes = S.notificaciones.length;
    pushNotif("Prueba de notificación v21","campana");
    if(S.notificaciones.length!==notifsAntes+1) throw new Error("pushNotif no agregó");
    if(typeof beepNotif!=="function") throw new Error("sin sonido de notificación");
    S.docente.distrito = "10-04";
    mostrar("info");
    const hi = document.getElementById("scr-info").innerHTML;
    if(!hi.includes("Tu perfil docente")) throw new Error("tarjeta no renombrada");
    if(!(hi.indexOf("Nombre")>-1 && hi.indexOf("Distrito")>hi.indexOf("Nombre") && hi.indexOf("Distrito")<hi.indexOf("Colegio"))) throw new Error("Distrito no está debajo de Nombre");
    if(hi.includes("Datos registrados")) throw new Error("título antiguo presente");
    S.docente.nivel = "Inicial"; S.docente.grado = "Pre-Kínder";
    mostrar("mes");
    const mh = document.getElementById("scr-mes").innerHTML;
    if(mh.includes('abrirPlan(\'der-Inicial')) throw new Error("unidades derivadas aún visibles en Inicial");
    if(typeof syncAhora!=="function") throw new Error("sin sync inmediato");
  });

  await probar("v22: texto momentos, cronómetro persistente y perfil Inicial", ()=>{
    S.docente.nivel = "Inicial"; S.docente.grado = "Pre-Kínder"; S.docente.duracionMin = 45;
    S.docente.gradosSecciones = ["Pre-Kínder|A"];
    S.docente.seccion = "A";
    S.docente.alumnosPorSeccion = { "Pre-Kínder|A": 5 };
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["d"], recursos:["r"],
      momentos:[{ nombre:"Inicio", duracion:"10 min", proposito:"p", pasos:["a"] }] }] }] };
    mostrar("clase", HOY);
    const ch = document.getElementById("scr-clase").innerHTML;
    if(ch.includes("Momentos ajustados")) throw new Error("texto de minutos sigue visible");
    if(typeof habilitarArrastreCrono !== "function" || typeof aplicarPosCrono !== "function") throw new Error("funciones de arrastre ausentes");
    if(!ch.includes("Descargar asistencias</button>")) throw new Error("etiqueta Descargar asistencias");
    if(!ch.includes("Descargar evaluación</button>")) throw new Error("etiqueta Descargar evaluación");
    if(!ch.includes("Descargar planificación diaria</button>")) throw new Error("etiqueta Descargar planificación diaria");
    if(ch.includes("Descargar plan diario Word") || ch.includes("Descargar logros PDF") || ch.includes("Descargar asistencias PDF")) throw new Error("etiquetas viejas presentes");
    iniciarMomento({ stopPropagation(){} }, 0);
    if(S.cronoActivo!==HOY) throw new Error("cronoActivo no registrado");
    const resta1 = T.resta;
    restaurarCrono();
    if(T.resta>resta1+5) throw new Error("restaurarCrono alteró el tiempo");
    // recarga simulada: estado guardado y restauración
    T = { dur:600, resta:600, corriendo:false, iv:null, momentoActivo:null };
    claseActualId = null;
    S.cronoActivo = HOY;
    S.crono[HOY] = { dur:600, resta:300, corriendo:true, momentoActivo:1, t: Date.now()-20000 };
    restaurarCrono();
    if(claseActualId!==HOY) throw new Error("cronómetro no restaurado tras recarga");
    if(!T.corriendo) throw new Error("cronómetro restaurado no sigue contando");
    if(T.resta>281) throw new Error("no descontó el tiempo transcurrido: "+T.resta);
    if(document.getElementById("cronoFlotante").style.display!=="") throw new Error("flotante no visible tras restaurar");
    const fl = document.getElementById("cronoFlotante").innerHTML;
    if(fl.includes("btnPlay") || fl.includes("Pausar")) throw new Error("botones presentes en cronómetro flotante");
    if(fl.includes("btn-soft")) throw new Error("fondo azul de botones presente");
    if(!fl.includes("timerEstado")) throw new Error("sin etiqueta de estado en el cronómetro");
    S.ui.cronoPos = { left: 30, top: 200 };
    aplicarPosCrono();
    if(document.getElementById("cronoFlotante").style.left!=="30px" || document.getElementById("cronoFlotante").style.top!=="200px") throw new Error("posición del cronómetro no se aplica");
    // finalizar: se limpia
    T.resta = 1; T.corriendo = true; T.iv = setInterval(()=>{}, 100000);
    T.resta = 0; clearInterval(T.iv); T.corriendo = false; cronoGuarda();
    if(S.cronoActivo!==undefined && S.cronoActivo===HOY) throw new Error("cronoActivo no se limpió al finalizar");
    pintarTimer();
    if(document.getElementById("cronoFlotante").style.display!=="none") throw new Error("flotante no se oculta");
    // perfil Inicial: grado fijo
    S.docente.nivel = "Inicial";
    mostrar("info");
    const ih = document.getElementById("scr-info").innerHTML;
    if(ih.includes('id="selGradoGS"')) throw new Error("Inicial aún puede elegir grado en perfil");
    if(!ih.includes("Pre-Kínder")) throw new Error("grado fijo ausente");
    resetTimer();
  });

  await probar("clase: momentos expandibles sin Iniciar momento", ()=>{
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["Identifica las partes del cuerpo"], recursos:["Papelógrafo"], orientacion:"Celebrar cada logro",
      momentos:[{ nombre:"Inicio", duracion:"10 min", proposito:"Activar saberes previos", pasos:["a","b"] },{ nombre:"Desarrollo", duracion:"20 min", proposito:"p", pasos:["a"] }] }] }] };
    mostrar("clase", HOY);
    const html = document.getElementById("scr-clase").innerHTML;
    if(html.includes("Iniciar momento")) throw new Error("botón Iniciar momento presente");
    if(!html.includes("m-exp")) throw new Error("sin tarjetas expandibles");
    if(!html.includes("toggleMomentoCard(0)")) throw new Error("sin toggle");
    if(!html.includes("m-chevron")) throw new Error("sin icono chevron");

    if(!html.includes("Identifica las partes del cuerpo")) throw new Error("instrucciones no contextuales");
    if(!html.includes("Papelógrafo")) throw new Error("recursos ausentes en tarjeta");
    if(!html.includes("Qué debe lograrse en este momento")) throw new Error("sin etiqueta nuevo logro");
    if(html.includes("Recursos del día")) throw new Error("etiqueta vieja Recursos del día");
    S.ui._claseVista = null; S.ui.momentoAbierto = null;
    renderClase(HOY);
    if(S.ui.momentoAbierto!==0) throw new Error("inicio no abierto por defecto: "+S.ui.momentoAbierto);
    if(!document.getElementById("scr-clase").innerHTML.includes('abierta" id="mexp-0"')) throw new Error("tarjeta inicio no abierta");
    if(document.getElementById("scr-clase").innerHTML.includes("dur-btn")) throw new Error("botones circulares del cronómetro presentes");
    if(!document.getElementById("scr-clase").innerHTML.includes("dur-chip")) throw new Error("sin chip de duración en momentos");
    if(document.getElementById("scr-clase").innerHTML.includes(" min min")) throw new Error("etiqueta min duplicada");
    if(!document.getElementById("scr-clase").innerHTML.includes('onclick="iniciarMomento(event, 0)"')) throw new Error("chip de duración no inicia cronómetro");
    if(!document.getElementById("durchip-0")) throw new Error("chip sin id durchip");
    if(document.getElementById("btnGuia").style.display!=="none") throw new Error("botón guía visible en clase diaria");
    if(typeof guiaActual!=="undefined" && guiaActual && /diaria/i.test(guiaActual.titulo||"")) throw new Error("guía del plan diaria activa");
    iniciarMomento({ stopPropagation(){} }, 0);
    if(document.getElementById("modalHoja").classList.contains("abierta")) throw new Error("la guía se abrió al iniciar el momento");
    if(!T.corriendo) throw new Error("cronómetro no corrió al tocar el chip");
    if(!document.getElementById("durchip-0").innerHTML.includes("En curso")) throw new Error("chip no muestra En curso");
    if(document.getElementById("cronoFlotante").style.display!=="") throw new Error("cronómetro flotante no visible");
    if(document.getElementById("scr-clase").innerHTML.includes("Cronómetro de la clase")) throw new Error("tarjeta cronómetro sigue presente");
    const _restaAntesPausa = T.resta;
    playTimer();
    if(!document.getElementById("durchip-0").innerHTML.includes("En pausa")) throw new Error("chip no muestra En pausa");
    if(document.getElementById("cronoFlotante").style.display!=="") throw new Error("flotante no visible en pausa");
    iniciarMomento({ stopPropagation(){} }, 0);
    if(!T.corriendo) throw new Error("no reanudó al pulsar de nuevo");
    if(T.resta!==_restaAntesPausa) throw new Error("no retomó el tiempo exacto donde se quedó");
    const zd = document.getElementById("zonaDescargas");
    const bd = document.createElement("button");
    toggleDescargas(bd);
    if(!zd.classList.contains("abierta")) throw new Error("descargas no despliegan con animación");
    toggleDescargas(bd);
    if(zd.classList.contains("abierta")) throw new Error("descargas no colapsan");
    playTimer();
    resetTimer();
    if(document.getElementById("cronoFlotante").style.display!=="none") throw new Error("flotante no se oculta al finalizar");
    // acordeón: abrir 0, luego abrir 1 debe dejar solo una abierta
    S.ui.momentoAbierto = -1;
    toggleMomentoCard(0);
    if(S.ui.momentoAbierto!==0) throw new Error("no abrió: "+S.ui.momentoAbierto);
    toggleMomentoCard(1);
    if(S.ui.momentoAbierto!==1) throw new Error("no cambió a la segunda");
    toggleMomentoCard(1);
    if(S.ui.momentoAbierto!==-1) throw new Error("no contrajo");
  });

  await probar("evaluación: cotejo guía de observación con check fijo", ()=>{
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["d"], recursos:["r"],
      cotejo:{ "Logrado":["Nombra las partes del cuerpo sin ayuda","Señala el papelógrafo con precisión"],
               "En proceso":["Nombra con pistas de la maestra","Señala al ser guiado"],
               "Iniciado":["Observa el papelógrafo","Imita a sus compañeros"] },
      momentos:[] }] }] };
    mostrar("clase", HOY);
    const zona = alumnosHTML(HOY, "E");
    if(!zona.includes(">Evaluar<")) throw new Error("sin botón Evaluar");
    S.evaluacion = {}; S.evalsCom = {}; S.evalsEvid = {};
    abrirEvalAlumno(HOY, 3);
    if(document.getElementById("eval2Alum").textContent!=="ALUMNO 3") throw new Error("título: "+document.getElementById("eval2Alum").textContent);
    selEval2Estado("Logrado");
    const cj = document.getElementById("eval2Cotejo").innerHTML;
    if(cj.includes('onclick="toggleEvid')) throw new Error("cotejo sigue siendo seleccionable");
    if(!cj.includes("cotejo-item guia")) throw new Error("sin clase guia");
    if(!cj.includes(">✓<")) throw new Error("sin check fijo de guía");
    if(!cj.includes("Nombra las partes del cuerpo sin ayuda")) throw new Error("cotejo Logrado ausente");
    if(!cj.includes("Lista de cotejo de referencia")) throw new Error("sin nota de guía");
    if(S.evaluacion[HOY][3]!=="Logrado") throw new Error("estado no autoguardado al seleccionar");
    if(require("fs").readFileSync("plan-docente-inicial.html","utf8").includes("eval2Obs")) throw new Error("campo de comentario presente");
    if(!document.getElementById("ev2-L").classList.contains("sel")) throw new Error("botón Logrado no resaltado");
    confirmarEvalAlumno();
    if(document.getElementById("modalEval2Hoja").classList.contains("abierta")) throw new Error("hoja no cerró");
    const zona2 = alumnosHTML(HOY, "E");
    if(!zona2.includes(">Registrada<")) throw new Error("botón Registrada ausente tras evaluar");
    abrirEvalAlumno(HOY, 3);
    if(eval2.estado!=="Logrado") throw new Error("estado no restaurado al reabrir");
    cerrarEvalAlumno();
    eval2 = { claseId:HOY, n:5, estado:null, evid:{} };
    confirmarEvalAlumno();
    if(S.evaluacion[HOY][5]) throw new Error("guardó sin estado");
  });

  await probar("nav: Perfil con persona y Progreso con torta", ()=>{
    const nav = document.getElementById("nav");
    const html = document.getElementById("nav") ? document.getElementById("nav").innerHTML : "";
    const archivo = require("fs").readFileSync("plan-docente-inicial.html","utf-8");
    if(!archivo.includes("Perfil</button>")) throw new Error("sin etiqueta Perfil");
    if(archivo.includes("Info</button>")) throw new Error("etiqueta Info presente");
    const iPerfil = archivo.indexOf("Perfil</button>");
    if(!archivo.slice(iPerfil-500, iPerfil).includes("M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5")) throw new Error("icono persona ausente");
    const iTorta = archivo.indexOf("Progreso</button>");
    if(!archivo.slice(iTorta-500, iTorta).includes("M12 3a9 9 0 0 1 9 9h-9z")) throw new Error("icono torta ausente");
  });

  await probar("v22: biblioteca filtrada por asignatura del docente", ()=>{
    S.docente.nivel = "Primaria"; S.docente.grado = "3ro";
    S.docente.gradosSecciones = ["3ro|A"]; S.docente.seccion = "A";
    S.docente.asignaturasSel = ["Matemática"];
    if(planParaDocente({ nivel:"Primaria", grado:"3ro", titulo:"Matemática 3ro · Los números de mi salud" })!==true) throw new Error("docente de Matemática no ve su plan");
    if(planParaDocente({ nivel:"Primaria", grado:"3ro", titulo:"Lengua Española 3ro · Narramos mi mundo saludable" })) throw new Error("docente de Matemática ve Lengua");
    if(!planParaDocente({ nivel:"Primaria", grado:"3ro", titulo:"Plan Anual 2026-2027 · Primaria 3ro · Matemática" })) throw new Error("no ve su plan anual de Matemática");
    if(planParaDocente({ nivel:"Primaria", grado:"3ro", titulo:"Plan Anual 2026-2027 · Primaria 3ro · Lengua Española" })) throw new Error("ve anual de otra asignatura");
    if(asigDeTitulo("FIHyR 3ro · Me conozco, me cuido y amo")!=="Formación Integral Humana y Religiosa") throw new Error("asigDeTitulo no resuelve FIHyR");
    if(asigDeTitulo("Matemática 1ro · Los números que cuidan mi salud")!=="Matemática") throw new Error("asigDeTitulo no resuelve Matemática");
    if(asigDeTitulo("Plan Mensual · Inicial Kínder · Octubre 2026 · X")!=="") throw new Error("asigDeTitulo inventa asignatura en Inicial");
    S.docente.asignaturasSel = ["Matemática","Lengua Española","Ciencias Sociales","Ciencias de la Naturaleza","Formación Integral Humana y Religiosa"];
    ["Matemática 3ro · X","Lengua Española 3ro · X","Ciencias Sociales 3ro · X","Ciencias de la Naturaleza 3ro · X","FIHyR 3ro · X"].forEach(tit=>{
      if(!planParaDocente({ nivel:"Primaria", grado:"3ro", titulo:tit })) throw new Error("docente de básicas no ve: "+tit);
    });
    S.docente.nivel = "Secundaria"; S.docente.grado = "1ro";
    S.docente.gradosSecciones = ["1ro|A"];
    S.docente.asignaturasSel = ["Matemática"];
    if(!planParaDocente({ nivel:"Secundaria", grado:"1ro", titulo:"Matemática 1ro · Los números que cuidan mi salud" })) throw new Error("secundaria no ve su plan de Matemática");
    S.docente.nivel = "Inicial"; S.docente.grado = "Kínder"; S.docente.asignaturasSel = [];
  });

  await probar("v23: plan mensual con estructura curricular oficial completa", ()=>{
    const plan = { titulo:"Plan Mensual · Inicial Kínder · Octubre 2026 · Prueba", mes:"Octubre 2026", nivel:"Inicial", grado:"Kínder",
      descripcion:"Unidad de prueba",
      situacion:{ partida:"Los niños llegan con miedo", estrategia:"Centro de Interés", proceso:"Semana a semana", producto:"Un mural" },
      contenidos:{ conceptuales:["Las partes del cuerpo"], procedimentales:["Señalar partes"], actitudinales:["Cuidar el cuerpo"] },
      evaluacion:{ especificas:["Comunicación oral: narra con palabras"], indicadores:["Nombra dos partes del cuerpo"],
                   tecnicas:["Observación directa"], metacognicion:["¿Qué descubrí hoy?"] },
      semanas:[{ numero:1, tema:"Mi cuerpo", fechas:"1–7 oct 2026", dias:[{ id:"2026-10-01", etiqueta:"jue 1 oct", titulo:"Conozco mi cuerpo" }] }] };
    mostrar("mes-detalle", plan);
    const mh = document.getElementById("scr-mes-detalle").innerHTML;
    if(!mh.includes("Punto de partida")) throw new Error("sin punto de partida");
    if(!mh.includes("Producto final")) throw new Error("sin producto final");
    if(!mh.includes("Competencias específicas")) throw new Error("sin competencias específicas");
    if(!mh.includes("Conceptuales (Saber)")) throw new Error("sin contenidos conceptuales");
    if(!mh.includes("Procedimentales (Saber hacer)")) throw new Error("sin contenidos procedimentales");
    if(!mh.includes("Actitudinales y valores (Saber ser)")) throw new Error("sin contenidos actitudinales");
    if(!mh.includes("5. Evaluación de la unidad")) throw new Error("sin sección 5 de evaluación");
    if(!mh.includes("Indicadores de logro")) throw new Error("sin indicadores");
    if(!mh.includes("Técnicas e instrumentos")) throw new Error("sin técnicas");
    if(!mh.includes("Metacognición")) throw new Error("sin metacognición");
  });

  await probar("v23: momentos con guía detallada paso a paso y ejemplos", ()=>{
    S.docente.nivel = "Inicial"; S.docente.grado = "Kínder"; S.docente.duracionMin = 45;
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"Conozco mi cuerpo", desempenos:["Nombra partes del cuerpo"], recursos:["Espejo"],
      momentos:[{ nombre:"Inicio", duracion:"8 min", proposito:"Despertar curiosidad", pasos:["Saluda"],
        guia:[{t:"Qué harás en este momento", d:"Despertar la curiosidad"},
              {t:"Cómo guiar la actividad (paso a paso)", li:["Recibe con canción","Muestra el espejo","Haz la pregunta"]},
              {t:"Ejemplo real para tu clase", d:"La maestra tapa el espejo y pregunta qué será"},
              {t:"Si un niño o niña se atasca (apoyo diferenciado)", d:"Siéntalo contigo como ayudante"}] }] }] }] };
    mostrar("clase", HOY);
    const gx = document.getElementById("scr-clase").innerHTML;
    if(!gx.includes("Ejemplo real para tu clase")) throw new Error("sin bloque de ejemplo");
    if(!gx.includes("Si un niño o niña se atasca")) throw new Error("sin bloque de apoyo diferenciado");
    if(!gx.includes("Cómo guiar la actividad")) throw new Error("sin paso a paso");
    toggleMomentoCard(0);
  });

  await probar("v22: mensual con desglose por semanas sin acceso a diarios", ()=>{
    const plan = { titulo:"Plan Mensual · Inicial Kínder · Octubre 2026 · Prueba", mes:"Octubre 2026", nivel:"Inicial", grado:"Kínder",
      semanas:[{ numero:1, tema:"Mi cuerpo es único", fechas:"1–7 oct 2026", inicio:"¿Quién soy?", desarrollo:"las partes del cuerpo", cierre:"Señala dos partes",
                dias:[{ id:"2026-10-01", etiqueta:"jue 1 oct", titulo:"Conozco mi cuerpo" }] },
               { numero:2, tema:"Mis ojos y oídos", fechas:"8–14 oct 2026", inicio:"¿Qué veo?", desarrollo:"la vista y el oído", cierre:"Nombra un sonido", dias:[] }] };
    mostrar("mes-detalle", plan);
    const mh = document.getElementById("scr-mes-detalle").innerHTML;
    if(!mh.includes("4. Desglose por semanas")) throw new Error("sin tarjeta de desglose");
    if(mh.includes("Secuencia didáctica")) throw new Error("título viejo presente");
    if(mh.includes("abrirClase(")) throw new Error("acceso a clases diarias desde mensual");
    if(mh.includes("Ver clase completa")) throw new Error("enlaces a clase presentes");
    if(!mh.includes("Semana 1 · Mi cuerpo es único")) throw new Error("semana 1 ausente");
    if(!mh.includes("Pregunta generadora")) throw new Error("sin pregunta generadora");
    if(!mh.includes("Contenido central")) throw new Error("sin contenido central");
    if(!mh.includes("Planificación diaria")) throw new Error("sin nota de clases diarias");
  });

  await probar("anual: semanas sin días y etiqueta Mes", ()=>{
    const planAnual = { titulo:"Plan Anual 2026-2027 · Inicial", mes:"Agosto 2026", nivel:"Inicial", semanas:[
      { numero:1, tema:"Mi escuela y yo", fechas:"Agosto 2026", dias:[] },
      { numero:2, tema:"La Mariposa", fechas:"Septiembre 2026", dias:[] } ] };
    mostrar("mes-detalle", planAnual);
    const html = document.getElementById("scr-mes-detalle").innerHTML;
    if(!html.includes("Mes 1 · Mi escuela y yo")) throw new Error("etiqueta Mes ausente");
    if(!html.includes("Mes 2 · La Mariposa")) throw new Error("segundo mes ausente");
    if(!esAnualPlan(planAnual)) throw new Error("esAnualPlan no detecta");
  });

  await probar("sync y barrido general con PDF", async ()=>{
    planAbierto = null;
    ["anio","mes","diaria","progreso","info","notificaciones"].forEach(s=>{ mostrar(s); });
    mostrar("anio-detalle","Inicial");
    const u = unidadDerivada("Inicial","0");
    mostrar("mes-detalle", u);
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["x"], recursos:[], momentos:[] }] }] };
    mostrar("clase", HOY);
    __llamadas.length = 0;
    guardar();
    await new Promise(r=>setTimeout(r,5500));
    if(!__llamadas.some(l=>l.body.accion==="guardar-estado")) throw new Error("no se llamó guardar-estado");
    if(!__llamadas.some(l=>JSON.stringify(l.body).includes("evalsCom"))) throw new Error("evalsCom no viaja en el estado");
    __ultimosPdf.length = 0;
    descargarBoletinGrupo();
    if(!__ultimosPdf.length) throw new Error("boletín no genera");
  });

  await probar("v24: franja de foto eliminada y versión 24", ()=>{
    const fs = require("fs");
    const h = fs.readFileSync("plan-docente-inicial.html","utf8");
    if(h.includes("foto-card::before")) throw new Error("franja todavía presente");
    if(!h.includes("app-docente.js?v=29")) throw new Error("versión 29 no aplicada");
  });

  await probar("v24: Word anual y unidad en horizontal", ()=>{
    const fs = require("fs");
    const j = fs.readFileSync("app-docente.js","utf8");
    if((j.match(/PageOrientation.LANDSCAPE/g)||[]).length!==2) throw new Error("páginas no apaisadas");
    if(!j.includes("const TOTAL = 14570;")) throw new Error("tablas sin ancho horizontal");
  });

  await probar("v25: boletines en hoja deslizante inferior", ()=>{
    abrirModalBoletines();
    const cont = document.getElementById("bolContenido");
    if(!cont || !cont.innerHTML.includes("Por período")) throw new Error("sin opción por período");
    if(!cont.innerHTML.includes("Por fecha")) throw new Error("sin opción por fecha");
    if(!cont.innerHTML.includes('id="bolDesde"') || !cont.innerHTML.includes('id="bolHasta"')) throw new Error("sin campos de fecha");
    if(!cont.innerHTML.includes("Resumen del grupo")) throw new Error("sin resumen opcional");
    if(!document.getElementById("bolFondo").classList.contains("abierto")) throw new Error("fondo no abre");
    if(!document.getElementById("bolHoja").classList.contains("abierta")) throw new Error("hoja no desliza");
    cerrarModalBoletines();
    if(document.getElementById("bolHoja").classList.contains("abierta")) throw new Error("hoja no se oculta");
  });

  await probar("v24: boletín detallado por período genera PDF completo", ()=>{
    S.ui.progGrado = "Pre-primario"; S.ui.progSec = "A";
    S.docente.nivel = "Inicial"; S.docente.gradosSecciones = ["Pre-primario|A"];
    S.docente.alumnosPorSeccion = { "Pre-primario|A":4 };
    S.puntos = { "Pre-primario|A": { 1:[ { f:"2026-10-05", tipo:"P", pts:80, com:"", asig:"General" },
                                              { f:"2026-10-06", tipo:"T", pts:90, com:"", asig:"General" },
                                              { f:"2026-10-07", tipo:"E", pts:85, com:"", asig:"General" } ] } };
    S.asistencia = { "2026-10-05": { 1:"Presente" }, "2026-10-06": { 1:"Tarde" } };
    S.evaluacion = { "2026-10-05": { 1:"Logrado" } };
    __ultimosPdf.length = 0; __pdfTextos.length = 0;
    boletinDetallePdf("periodo", "1er periodo");
    if(!__ultimosPdf.length || __ultimosPdf[0]!=="boletines-Pre-primario-A-1er-periodo.pdf") throw new Error("nombre incorrecto: "+(__ultimosPdf[0]||""));
    const todo = __pdfTextos.join(" ");
    if(!todo.includes("Boletín de calificaciones")) throw new Error("sin título");
    if(!todo.includes("ALUMNO 01")) throw new Error("sin alumno 1");
    if(!todo.includes("Logros evaluados")) throw new Error("sin sección desempeño");
    if(!todo.includes("Logrado")) throw new Error("sin logro");
  });

  await probar("v24: boletín detallado por fecha usa el rango", ()=>{
    S.docente.gradosSecciones = ["Pre-primario|A"];
    S.docente.alumnosPorSeccion = { "Pre-primario|A":4 };
    __ultimosPdf.length = 0;
    boletinDetallePdf("fecha", null, "2026-10-01", "2026-10-12");
    if(!__ultimosPdf[0] || !__ultimosPdf[0].includes("2026-10-01_2026-10-12")) throw new Error("sufijo de fechas incorrecto");
    __pdfTextos.length = 0;
    boletinDetallePdf("fecha", null, "2026-10-01", "2026-10-12");
    if(!__pdfTextos.join(" ").includes("Fechas: 2026-10-01 a 2026-10-12")) throw new Error("rango no impreso");
  });

  await probar("v24: planDiario muestra el mes completo sin versión semanal", ()=>{
    const semanas = [];
    for(let s=1;s<=4;s++){
      const dias = [];
      for(let d=0;d<5;d++){ const dia = ((s-1)*7+d+1); dias.push({ id:"2026-10-"+String(dia).padStart(2,"0"), etiqueta:"d"+dia, titulo:"Clase "+dia, desempenos:["x"], recursos:[], momentos:[] }); }
      semanas.push({ numero:s, tema:"S"+s, fechas:"f"+s, dias });
    }
    S.listaPlanes = [{ id:"pm1", titulo:"Plan Mensual · Inicial Kínder · Octubre 2026 · X", mes:"Octubre 2026", semanas:4 }];
    S.planesCache = { pm1: { titulo:"Plan Mensual · Inicial Kínder · Octubre 2026 · X", mes:"Octubre 2026", nivel:"Inicial", semanas } };
    const w = planDiario();
    if(!w.plan.titulo.includes("Plan Mensual")) throw new Error("plan del mes no detectado");
    if(w.plan.semanas.length!==4) throw new Error("semanas incompletas: "+w.plan.semanas.length);
    const total = w.plan.semanas.reduce((a,s)=>a+(s.dias||[]).length,0);
    if(total!==20) throw new Error("clases incompletas: "+total);
    if(w.plan.tipo==="derivado") throw new Error("usa unidad derivada semanal");
  });

  await probar("v24: sin plan del mes, estado claro sin caché vieja", ()=>{
    S.listaPlanes = []; S.planesCache = {};
    const w = planDiario();
    if(w.plan.titulo!=="Sin plan del mes en curso") throw new Error("estado vacío incorrecto: "+w.plan.titulo);
    if((w.plan.semanas||[]).length!==0) throw new Error("debe venir sin clases");
  });

  await probar("v24: obtenerPlan(forzar) trae la versión fresca", async ()=>{
    S.planesCache["x1"] = { titulo:"VIEJO", semanas:[{ numero:1, dias:[] }] };
    __llamadas.length = 0;
    const p = await obtenerPlan("x1", true);
    if(p.titulo!=="Plan Remoto Fresco") throw new Error("no trajo el plan remoto: "+p.titulo);
    if(S.planesCache["x1"].titulo!=="Plan Remoto Fresco") throw new Error("caché no actualizada");
    __llamadas.length = 0;
    const p2 = await obtenerPlan("x1");
    if(p2.titulo!=="Plan Remoto Fresco") throw new Error("caché rota tras forzar");
    if(__llamadas.some(l=>l.body.accion==="plan")) throw new Error("debe usar caché sin forzar");
  });

  await probar("v24: firma de diaria detecta cambios de versión", ()=>{
    S.listaPlanes = [{ id:"pm1", titulo:"P", mes:"Octubre 2026", semanas:4 }];
    S.planesCache = { pm1: { titulo:"V1", mes:"Octubre 2026", semanas:[{ numero:1, dias:[{ id:"2026-10-01" }] }] } };
    const f1 = firmaDiaria();
    S.planesCache.pm1.semanas[0].dias.push({ id:"2026-10-02" });
    const f2 = firmaDiaria();
    if(f1===f2) throw new Error("la firma no detecta el cambio");
  });

  await probar("v25: foto-chip sutil, cotejo interactivo y etiqueta boletines", ()=>{
    const fs = require("fs");
    const h = fs.readFileSync("plan-docente-inicial.html","utf8");
    if(!h.includes("border:1px solid rgba(255,255,255,.38);border-radius:16px")) throw new Error("foto-chip sin borde sutil");
    if(h.includes("border:1.5px solid rgba(255,255,255,.65)")) throw new Error("borde viejo presente");
    if(!h.includes(".cotejo-item.guia")) throw new Error("sin estilo guía del cotejo");
    if(!h.includes('id="asisHoja"') || !h.includes('id="bolHoja"')) throw new Error("hojas modales ausentes");
    const j = fs.readFileSync("app-docente.js","utf8");
    if(!j.includes("Descargar boletines</button>") || j.includes("Descargar boletines del grupo")) throw new Error("etiqueta del botón boletines incorrecta");
  });

  await probar("v25: anual sin tarjeta de perfil", ()=>{
    mostrar("anio");
    const h = document.getElementById("scr-anio").innerHTML;
    if(h.includes("Tu perfil docente")) throw new Error("tarjeta de perfil presente en anual");
    if(!h.includes("Tus planes anuales")) throw new Error("sin bloque de planes anuales");
  });

  await probar("v25: chips de momento ocultos sin duración configurada", ()=>{
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["d"], recursos:["r"],
      momentos:[{ nombre:"Inicio", duracion:"8 min", proposito:"p", pasos:["a"] }] }] }] };
    S.docente.duracionMin = 0;
    renderClase(HOY);
    if(document.getElementById("scr-clase").innerHTML.includes("durchip-0")) throw new Error("chip visible sin configurar");
    if(!document.getElementById("scr-clase").innerHTML.includes("Configura la duración de tu clase en Perfil")) throw new Error("sin pista de configuración");
    S.docente.duracionMin = 45;
    renderClase(HOY);
    if(!document.getElementById("scr-clase").innerHTML.includes('id="durchip-0"')) throw new Error("chip oculto con duración configurada");
  });

  await probar("v25: asistencia con hoja deslizante y registro automático", ()=>{
    S.ui.progGrado = "Pre-primario"; S.ui.progSec = "A"; S.ui.regGrado = null; S.ui.regSec = null;
    S.docente.grado = "Pre-primario"; S.docente.seccion = "A";
    S.docente.gradosSecciones = ["Pre-primario|A"];
    S.docente.alumnosPorSeccion = { "Pre-primario|A":3 };
    S.docente.nivel = "Inicial";
    S.asistencia = {};
    const zona = alumnosHTML("c25", "A");
    if(!zona.includes("Tomar asistencia")) throw new Error("sin botón Tomar asistencia");
    if(zona.includes(">P<") || zona.includes(">T<") || zona.includes(">A<")) throw new Error("botones P/T/A presentes");
    if(!zona.includes("abrirAsistencia('c25', 1)")) throw new Error("sin apertura de hoja por alumno");
    abrirAsistencia("c25", 2);
    if(!document.getElementById("asisHoja").classList.contains("abierta")) throw new Error("hoja no desliza");
    if(!document.getElementById("asisFondo").classList.contains("abierto")) throw new Error("fondo no abre");
    marcarDesdeHoja("Tarde");
    if(S.asistencia["c25"][2]!=="Tarde") throw new Error("asistencia no registrada");
    if(document.getElementById("asisHoja").classList.contains("abierta")) throw new Error("hoja no se oculta sola");
    const zona2 = alumnosHTML("c25", "A");
    if(!zona2.includes("Tarde")) throw new Error("estado no visible en la fila");
  });

  await probar("v25: cronómetro continúa al salir y volver de la clase", async ()=>{
    try{ if(T && T.iv) clearInterval(T.iv); }catch(e){}
    delete S.cronoActivo; S.crono = {}; S.tiempoClase = {};
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[
      { id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["d"], recursos:["r"], momentos:[{ nombre:"Inicio", duracion:"10 min", proposito:"p", pasos:["a"] }] },
      { id:"2026-10-15", etiqueta:"jue 15 oct", titulo:"Otra", desempenos:["d"], recursos:["r"], momentos:[{ nombre:"Inicio", duracion:"10 min", proposito:"p", pasos:["a"] }] }] }] };
    S.docente.duracionMin = 45;
    renderClase(HOY);
    iniciarMomento({ stopPropagation(){} }, 0);
    if(!T.corriendo || S.cronoActivo!==HOY) throw new Error("cronómetro no arrancó");
    const resta0 = T.resta;
    await new Promise(r=>setTimeout(r,2100));
    if(!(T.resta < resta0)) throw new Error("el crono no avanza");
    mostrar("mes");
    if(!T.corriendo) throw new Error("se detuvo al salir de la clase");
    mostrar("clase", HOY);
    if(!T.corriendo || T.momentoActivo!==0) throw new Error("no continuó al volver a la clase");
    if(document.getElementById("cronoFlotante").style.display==="none") throw new Error("anillo oculto al volver");
    mostrar("clase", "2026-10-15");
    if(S.cronoActivo!==HOY) throw new Error("el crono activo cambió de clase al abrir otra");
    if(!T.corriendo) throw new Error("se detuvo al abrir otra clase");
    try{ if(T && T.iv) clearInterval(T.iv); }catch(e){}
    T = { dur:300, resta:300, corriendo:false, iv:null };
    delete S.cronoActivo; S.crono = {};
  });

  await probar("v26: encabezado sin subtítulo y PlanApp grande", ()=>{
    const fs = require("fs");
    const h = fs.readFileSync("plan-docente-inicial.html","utf8");
    if(h.includes('id="subtituloApp"')) throw new Error("subtítulo todavía presente");
    if(h.includes("Tu plan listo para enseñar")) throw new Error("texto viejo presente");
    if(!h.includes(".topbar .tt h1{font-size:19px")) throw new Error("PlanApp sin tamaño grande");
  });

  await probar("v26: diaria con etiqueta Tus clases diarias", ()=>{
    const semanas = [];
    for(let s=1;s<=4;s++){
      const dias = [];
      for(let d=0;d<5;d++){ const dia = ((s-1)*7+d+1); dias.push({ id:"2026-10-"+String(dia).padStart(2,"0"), etiqueta:"d"+dia, titulo:"Clase "+dia, desempenos:["x"], recursos:[], momentos:[] }); }
      semanas.push({ numero:s, tema:"S"+s, fechas:"f"+s, dias });
    }
    S.listaPlanes = [{ id:"pm1", titulo:"Plan Mensual · Inicial Kínder · Octubre 2026 · X", mes:"Octubre 2026", semanas:4 }];
    S.planesCache = { pm1: { titulo:"Plan Mensual · Inicial Kínder · Octubre 2026 · X", mes:"Octubre 2026", nivel:"Inicial", semanas } };
    mostrar("diaria");
    const h = document.getElementById("scr-diaria").innerHTML;
    if(!h.includes("Tus clases diarias")) throw new Error("sin etiqueta de clases diarias");
  });

  await probar("v26: etiqueta Registrada en asistencia y evaluación", ()=>{
    S.ui.progGrado = "Pre-primario"; S.ui.progSec = "A"; S.ui.regGrado = null; S.ui.regSec = null;
    S.docente.grado = "Pre-primario"; S.docente.seccion = "A";
    S.docente.gradosSecciones = ["Pre-primario|A"];
    S.docente.alumnosPorSeccion = { "Pre-primario|A":3 };
    S.docente.nivel = "Inicial";
    S.asistencia = { c26: { 1:"Presente" } };
    S.evaluacion = { c26: { 1:"Logrado" } };
    const za = alumnosHTML("c26", "A");
    if(!za.includes(">Registrada<")) throw new Error("asistencia sin etiqueta Registrada");
    if(za.includes("evaluado")) throw new Error("asistencia con fondo verde evaluado");
    const ze = alumnosHTML("c26", "E");
    if(!ze.includes(">Registrada<")) throw new Error("evaluación sin etiqueta Registrada");
    if(!ze.includes("background:#0033A0")) throw new Error("chip Logrado sin color azul");
    if(ze.includes("chip-mini sel\"")) throw new Error("chip de estado sin color");
    if(!za.includes(">Tomar asistencia<")) throw new Error("fila sin asistencia no muestra Tomar asistencia");
    if(!ze.includes(">Evaluar<")) throw new Error("fila sin evaluar no muestra Evaluar");
  });

  await probar("v26: noviembre Próximo y diciembre Pendiente", ()=>{
    const en = estadoMes("Noviembre 2026");
    if(en.t!=="Próximo" || en.k!=="prox") throw new Error("noviembre no es Próximo: "+en.t);
    const dic = estadoMes("Diciembre 2026");
    if(dic.t!=="Pendiente") throw new Error("diciembre no es Pendiente: "+dic.t);
    if(estadoMes("Octubre 2026").t!=="En curso") throw new Error("octubre no es En curso");
  });

  await probar("v26: efemérides en diario, mensual y anual", ()=>{
    const fs = require("fs");
    if(!String(efemerideDe("2026-11-09")).includes("Constitución")) throw new Error("sin Constitución el 9 nov");
    if(!String(efemerideDe("2026-10-16")).includes("Alimentación")) throw new Error("sin Alimentación el 16 oct");
    const plan = { titulo:"Plan Mensual · Inicial Kínder · Noviembre 2026 · Prueba", mes:"Noviembre 2026", nivel:"Inicial", grado:"Kínder",
      descripcion:"Unidad de prueba",
      situacion:{ partida:"p", estrategia:"Centro de Interés", proceso:"proceso", producto:"producto" },
      contenidos:{ conceptuales:["La familia"], procedimentales:["p"], actitudinales:["a"] },
      evaluacion:{ especificas:["e"], indicadores:["i"], tecnicas:["t"], metacognicion:["m"] },
      semanas:[] };
    mostrar("mes-detalle", plan);
    const mh = document.getElementById("scr-mes-detalle").innerHTML;
    if(!mh.includes("Efemérides del mes")) throw new Error("sin sección de efemérides");
    if(!mh.includes("Mes de la Familia")) throw new Error("sin lema de noviembre");
    if(!mh.includes("20: Día Universal del Niño y la Niña")) throw new Error("sin efemérides del mes listadas");
    mostrar("anio-detalle", "Inicial");
    const ah = document.getElementById("scr-anio-detalle").innerHTML;
    if(!ah.includes("Efemérides y valores del año escolar")) throw new Error("sin tabla anual de efemérides");
    if(!ah.includes("Efemérides y Valores")===false && !ah.includes("27: Día de la Independencia")) throw new Error("sin independencia en anual");
  });

  await probar("v26: boletín Inicial cualitativo e historial con cotejo", ()=>{
    S.ui.progGrado = "Pre-primario"; S.ui.progSec = "A";
    S.docente.grado = "Pre-primario"; S.docente.seccion = "A";
    S.docente.gradosSecciones = ["Pre-primario|A"];
    S.docente.alumnosPorSeccion = { "Pre-primario|A":2 };
    S.docente.nivel = "Inicial";
    S.evaluacion = { "2026-10-05": { 1:"Logrado" }, "2026-10-08": { 1:"En proceso" } };
    S.evalsEvid = { "2026-10-05|1": { estado:"Logrado", sel:{ 0:true, 1:true }, obs:"Gran avance" } };
    S.evalsCom = { "2026-10-05|1": "Gran avance" };
    __ultimosPdf.length = 0; __pdfTextos.length = 0;
    boletinDetallePdf("periodo", "1er periodo");
    const todo = __pdfTextos.join(" | ");
    if(!todo.includes("EVALUACIÓN CUALITATIVA · NIVEL INICIAL")) throw new Error("sin bloque cualitativo");
    if(!todo.includes("Historial de evaluación y cotejo")) throw new Error("sin historial de cotejo");
    if(!todo.includes("Gran avance")) throw new Error("sin comentario en boletín");
    abrirHistorial(1, "progreso");
    const hc = document.getElementById("histCuerpo").innerHTML;
    if(!hc.includes("Historial de evaluaciones con cotejo")) throw new Error("historial sin cotejo");
    if(!hc.includes("logros del cotejo")) throw new Error("sin conteo de logros del cotejo");
    cerrarHistorial();
  });

  await probar("v26: cronómetro como acceso directo y escala por nivel", ()=>{
    const fs = require("fs");
    const j = fs.readFileSync("app-docente.js","utf8");
    if(!j.includes('irA("clase", S.cronoActivo)')) throw new Error("cronómetro sin acceso directo");
    if(!j.includes("function letraEscala")) throw new Error("sin escala numérica por nivel");
    if(!j.includes("function textoEscala")) throw new Error("sin texto de escala por nivel");
    if(letraEscala(95)!=="A" || letraEscala(82)!=="B" || letraEscala(71)!=="C" || letraEscala(64)!=="D" || letraEscala(50)!=="F") throw new Error("letras de escala incorrectas");
  });

  await probar("v27: botón Word anual bajo efemérides y sección en el documento", ()=>{
    mostrar("anio-detalle", "Inicial");
    const h = document.getElementById("scr-anio-detalle").innerHTML;
    const iEfe = h.indexOf("Efemérides y valores del año escolar");
    const iBtn = h.indexOf("Descargar plan anual en Word");
    if(iEfe<0 || iBtn<0 || iBtn < iEfe) throw new Error("botón Word no está bajo la tarjeta de efemérides");
    const fs = require("fs");
    const j = fs.readFileSync("app-docente.js","utf8");
    if(!j.includes('h2docx(D, "Efemérides y valores del año escolar")')) throw new Error("Word anual sin sección efemérides");
  });

  await probar("v27: Word mensual con Efemérides del mes", ()=>{
    const fs = require("fs");
    const j = fs.readFileSync("app-docente.js","utf8");
    if(!j.includes('h2docx(D, "Efemérides del mes")')) throw new Error("Word mensual sin sección efemérides");
    if(j.split("efemeridesDocx();").length < 3) throw new Error("efemérides no insertada en ambos formatos de unidad");
  });

  await probar("v27: Progreso sin etiqueta Sin comentario", ()=>{
    S.ui.progGrado = "Kínder"; S.ui.progSec = "A";
    S.docente.grado = "Kínder"; S.docente.seccion = "A";
    S.docente.gradosSecciones = ["Kínder|A"];
    S.docente.alumnosPorSeccion = { "Kínder|A":3 };
    S.docente.nivel = "Inicial";
    S.evaluacion = { "2026-10-05": { 1:"Logrado", 2:"En proceso" } };
    S.evalsEvid = {}; S.evalsCom = {}; S.puntos = {};
    abrirHistorial(1, "progreso");
    const hc = document.getElementById("histCuerpo").innerHTML;
    if(hc.includes("Sin comentario")) throw new Error("etiqueta Sin comentario presente");
    if(!hc.includes("Logrado")) throw new Error("estado ausente en historial");
    cerrarHistorial();
  });

  await probar("v27: switch de duración en Perfil oculta chips de momentos", ()=>{
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["d"], recursos:[],
      momentos:[{ nombre:"Inicio", duracion:"8 min", proposito:"p", pasos:["a"] },{ nombre:"Desarrollo", duracion:"12 min", proposito:"p", pasos:["a"] }] }] }] };
    S.docente.duracionMin = 45;
    delete S.docente.duracionOn;
    mostrar("info");
    const pi = document.getElementById("scr-info").innerHTML;
    if(!pi.includes("Duración de mis clases")) throw new Error("sin tarjeta de duración");
    if(!pi.includes('class="switch on"')) throw new Error("switch ausente o no encendido por defecto");
    toggleDuracion();
    if(S.docente.duracionOn!==false) throw new Error("switch no apagó duracionOn");
    mostrar("clase", HOY);
    let hc = document.getElementById("scr-clase").innerHTML;
    if(hc.includes("dur-chip")) throw new Error("chips visibles con switch apagado");
    mostrar("info");
    if(document.getElementById("scr-info").innerHTML.includes('class="switch on"')) throw new Error("switch sigue encendido tras apagar");
    toggleDuracion();
    if(S.docente.duracionOn!==true) throw new Error("switch no encendió duracionOn");
    mostrar("clase", HOY);
    hc = document.getElementById("scr-clase").innerHTML;
    if(!hc.includes("dur-chip")) throw new Error("chips ausentes con switch encendido");
  });

  await probar("v28: botones redondeados y check verde en evaluados", ()=>{
    const fs = require("fs");
    const h = fs.readFileSync("plan-docente-inicial.html","utf8");
    if(!h.includes(".btn-evaluar{padding:8px 14px;border-radius:14px;")) throw new Error("botones sin esquinas redondeadas");
    S.docente.gradosSecciones = ["Kínder|A"];
    S.docente.alumnosPorSeccion = { "Kínder|A":3 };
    S.docente.nivel = "Inicial";
    S.evaluacion = {}; S.evaluacion[HOY] = { 1:"Logrado", 2:"En proceso" };
    const zona = alumnosHTML(HOY, "E");
    if(!zona.includes("background:#DCFCE7;color:#15803d")) throw new Error("sin check verde en cuadrito del evaluado");
    if(!zona.includes(">✓</div>")) throw new Error("sin ícono check en cuadrito");
    if(!zona.includes("Evaluar</button>")) throw new Error("botón Evaluar ausente");
  });

  await probar("v28: Registro del día abre hoja deslizante desde abajo", ()=>{
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"Tema de hoy", desempenos:["d"], recursos:["r"],
      momentos:[{ nombre:"Inicio", duracion:"8 min", proposito:"p", pasos:["a"] }] }] }] };
    S.docente.gradosSecciones = ["Kínder|A"];
    S.docente.alumnosPorSeccion = { "Kínder|A":2 };
    S.docente.nivel = "Inicial";
    S.asistencia = {}; S.evaluacion = {};
    mostrar("clase", HOY);
    const hc = document.getElementById("scr-clase").innerHTML;
    if(hc.includes("btnColapsa") || hc.includes("zonaRegistro")) throw new Error("el registro sigue desplegándose hacia abajo");
    if(!hc.includes("Toca la tarjeta para registrar")) throw new Error("sin invitación a tocar la tarjeta");
    if(!hc.includes("abrirRegistroDia")) throw new Error("la tarjeta no abre la hoja");
    abrirRegistroDia(HOY);
    if(!document.getElementById("regHoja").classList.contains("abierta")) throw new Error("hoja no se abrió");
    const cuerpo = document.getElementById("regHojaCuerpo").innerHTML;
    if(!cuerpo.includes("zonaA") || !cuerpo.includes("Tomar asistencia")) throw new Error("hoja sin lista de asistencia");
    if(!cuerpo.includes("tabE")) throw new Error("hoja sin pestaña de evaluación");
    tabClase("E");
    if(document.getElementById("zonaE").style.display==="none") throw new Error("pestaña de evaluación no cambia");
    cerrarRegistroDia();
    if(document.getElementById("regHoja").classList.contains("abierta")) throw new Error("hoja no cerró");
  });

  await probar("v28: conmemoración por momento y en Word diario", ()=>{
    const fs = require("fs");
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:"2026-10-16", etiqueta:"vie 16 oct", titulo:"Día de la alimentación", desempenos:["d"], recursos:[],
      momentos:[{ nombre:"Inicio", duracion:"8 min", proposito:"p", pasos:["a"] },{ nombre:"Desarrollo", duracion:"12 min", proposito:"p", pasos:["a"] }] }] }] };
    S.docente.gradosSecciones = ["Kínder|A"];
    S.docente.alumnosPorSeccion = { "Kínder|A":2 };
    S.docente.nivel = "Inicial";
    mostrar("clase", "2026-10-16");
    const hc = document.getElementById("scr-clase").innerHTML;
    if(!hc.includes("Conmemoración del día")) throw new Error("sin conmemoración en la clase");
    if(!hc.includes("En Inicio: úsala para motivar")) throw new Error("sin guía de conmemoración en Inicio");
    if(!hc.includes("En Desarrollo: conviértela")) throw new Error("sin guía de conmemoración en Desarrollo");
    const j = fs.readFileSync("app-docente.js","utf8");
    if(!j.includes('["Conmemoración del día", (function()')) throw new Error("Word diario sin fila de conmemoración");
    if(!j.includes("Integración pedagógica: en Inicio")) throw new Error("Word diario sin guía de integración");
  });

  await probar("v28: mensual con cuadro de anticipación, dominios y experiencias", ()=>{
    const plan = { titulo:"Plan Mensual · Inicial Kínder · Noviembre 2026 · Prueba", mes:"Noviembre 2026", nivel:"Inicial", grado:"Kínder",
      descripcion:"Unidad de prueba",
      anticipacion:{ sabemos:["Las familias son distintas"], queremos:["Cómo son las familias"], como:["Investigando","Dramatizando"] },
      dominios:["Socioemocional","Comunicativo","Creativo y Artístico","Psicomotor y de Salud","Descubriendo el mundo","Cognitivo"],
      experiencias:[{ semana:1, tema:"Las familias son diversas", encuentro:"Saludo y canción", indPequeno:"Describe su familia", actPequeno:"Dibujamos", indGrande:"Conversa", actGrande:"Dramatizamos", taller:"dramatización y juegos", indTaller:"Participa", actTaller:"Juego de roles" }],
      situacion:{ partida:"p", estrategia:"Centro de Interés", proceso:"proceso", producto:"producto" },
      contenidos:{ conceptuales:["La familia"], procedimentales:["p"], actitudinales:["a"] },
      evaluacion:{ especificas:["e"], indicadores:["i"], tecnicas:["t"], metacognicion:["m"] },
      semanas:[{ numero:1, tema:"S1", fechas:"2 – 6 nov", dias:[{ id:"2026-11-02", etiqueta:"lun 2 nov", titulo:"T", desempenos:["d"], recursos:[], momentos:[] }] }] };
    mostrar("mes-detalle", plan);
    const mh = document.getElementById("scr-mes-detalle").innerHTML;
    if(!mh.includes("Cuadro de anticipación")) throw new Error("sin cuadro de anticipación");
    if(!mh.includes("¿Qué sabemos?") || !mh.includes("¿Qué queremos saber?") || !mh.includes("¿Cómo lo vamos a saber?")) throw new Error("columnas del cuadro ausentes");
    if(!mh.includes("Dominios del desarrollo")) throw new Error("sin dominios del desarrollo");
    if(!mh.includes("Socioemocional")) throw new Error("dominio ausente");
    if(!mh.includes("Experiencias clave de aprendizaje")) throw new Error("sin experiencias clave");
    if(!mh.includes("Encuentro de grupo")) throw new Error("sin encuentro de grupo");
    if(!mh.includes("Taller de dramatización y juegos")) throw new Error("sin taller");
    if(!mh.includes("Tipo de planificación")) throw new Error("sin tipo de planificación");
    if(!mh.includes("Tanda")) throw new Error("sin tanda");
    const fs = require("fs");
    const j = fs.readFileSync("app-docente.js","utf8");
    if(!j.includes('h2docx(D, "Cuadro de anticipación")')) throw new Error("Word mensual sin cuadro de anticipación");
    if(!j.includes('h2docx(D, "Experiencias clave · Semana"))') && !j.includes("Experiencias clave · Semana ")) throw new Error("Word mensual sin experiencias clave");
  });

  await probar("v28: planes de noviembre y diciembre con secciones nuevas", ()=>{
    const fs = require("fs");
    const regs = JSON.parse(fs.readFileSync("planapp_records_v6.json","utf8"));
    const nuevos = regs.filter(r=>/Noviembre 2026|Diciembre 2026/.test(r.mes||""));
    if(nuevos.length!==8) throw new Error("planes Nov/Dic: "+nuevos.length);
    nuevos.forEach(r=>{
      const a = JSON.parse(r.anticipacion_json||"{}");
      if(!a.sabemos || !a.queremos || !a.como) throw new Error("anticipación incompleta en "+r.titulo);
      const dom = JSON.parse(r.dominios_json||"[]");
      if(dom.length!==6) throw new Error("dominios incompletos en "+r.titulo);
      const exps = JSON.parse(r.experiencias_json||"[]");
      const nSem = parseInt(String(r.semanas_json).match(/#sem=(\d+)/)[1], 10);
      if(exps.length!==nSem) throw new Error("experiencias != semanas en "+r.titulo);
      exps.forEach(e=>{
        if(!e.encuentro || !e.indPequeno || !e.actPequeno || !e.indGrande || !e.actGrande || !e.taller) throw new Error("experiencia incompleta en "+r.titulo);
      });
    });
  });

  await probar("v29: clase sin tarjetas redundantes", ()=>{
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:"2026-10-16", etiqueta:"vie 16 oct", titulo:"Alimentación saludable", desempenos:["d"], recursos:["r"],
      momentos:[{ nombre:"Inicio", duracion:"8 min", proposito:"p", pasos:["a"] }] }] }] };
    S.docente.gradosSecciones = ["Kínder|A"];
    S.docente.alumnosPorSeccion = { "Kínder|A":2 };
    S.docente.nivel = "Inicial";
    S.asistencia = {}; S.evaluacion = {};
    mostrar("clase", "2026-10-16");
    const hc = document.getElementById("scr-clase").innerHTML;
    if(hc.includes("<b>Fecha</b>")) throw new Error("sigue mostrando Fecha");
    if(hc.includes("<b>Nivel / Grado</b>")) throw new Error("sigue mostrando Nivel / Grado");
    if(hc.includes("<b>Sección</b>")) throw new Error("sigue mostrando Sección");
    if(hc.includes("<b>Asignaturas</b>")) throw new Error("sigue mostrando Asignaturas");
    if(hc.includes("<b>Docente</b>")) throw new Error("sigue mostrando Docente");
    if(hc.includes("Intención pedagógica e indicadores")) throw new Error("tarjeta de intención sigue presente");
    if(hc.includes("Recursos y evaluación")) throw new Error("tarjeta de recursos sigue presente");
    if(!hc.includes("Conmemoración")) throw new Error("conmemoración del día perdida");
    if(!hc.includes("Registro del día")) throw new Error("registro del día perdido");
    if(!hc.includes("Nota de observación")) throw new Error("nota de observación perdida");
  });

  await probar("v29: registro del día con indicador de clic", ()=>{
    const fs = require("fs");
    const h = fs.readFileSync("plan-docente-inicial.html","utf8");
    if(!h.includes(".m-scroll{max-height:520px")) throw new Error("momentos sin altura ampliada");
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:"2026-10-16", etiqueta:"vie 16 oct", titulo:"T", desempenos:["d"], recursos:[],
      momentos:[{ nombre:"Inicio", duracion:"8 min", proposito:"p", pasos:["a"] }] }] }] };
    S.docente.gradosSecciones = ["Kínder|A"];
    S.docente.alumnosPorSeccion = { "Kínder|A":2 };
    S.docente.nivel = "Inicial";
    S.asistencia = {}; S.evaluacion = {};
    mostrar("clase", "2026-10-16");
    const hc = document.getElementById("scr-clase").innerHTML;
    if(!hc.includes('title="Toca para registrar asistencia y evaluación"')) throw new Error("sin indicador de clic en Registro del día");
    const posReg = hc.indexOf("Registro del día");
    const posChev = hc.indexOf("Toca para registrar asistencia y evaluación");
    if(posReg<0 || posChev<posReg) throw new Error("chevron no está en la tarjeta de registro");
  });

  await probar("v29: mensual muestra noviembre y diciembre sin importar el período", ()=>{
    S.docente.nivel = "Inicial"; S.docente.grado = "Pre-Primario"; S.docente.periodo = "1er periodo";
    S.listaPlanes = [
      { id:"m-ago", titulo:"Plan Mensual · Inicial Pre-Primario · Agosto 2026 · Mi escuela y yo", mes:"Agosto 2026", tema:"", semanas:1, propio:false },
      { id:"m-oct", titulo:"Plan Mensual · Inicial Pre-Primario · Octubre 2026 · Mi cuerpo", mes:"Octubre 2026", tema:"", semanas:4, propio:false },
      { id:"m-nov", titulo:"Plan Mensual · Inicial Pre-Primario · Noviembre 2026 · La familia", mes:"Noviembre 2026", tema:"", semanas:4, propio:false },
      { id:"m-dic", titulo:"Plan Mensual · Inicial Pre-Primario · Diciembre 2026 · Navidad", mes:"Diciembre 2026", tema:"", semanas:3, propio:false },
    ];
    const arr = planesMensuales();
    if(!arr.some(p=>p.id==="m-nov")) throw new Error("noviembre filtrado");
    if(!arr.some(p=>p.id==="m-dic")) throw new Error("diciembre filtrado");
    if(!arr.some(p=>p.id==="m-oct")) throw new Error("octubre ausente");
    renderMes();
    const mh = document.getElementById("scr-mes").innerHTML;
    if(!mh.includes("Noviembre 2026")) throw new Error("noviembre no visible en mensual");
    if(!mh.includes("Diciembre 2026")) throw new Error("diciembre no visible en mensual");
    if(!mh.includes("Próximo")) throw new Error("estado Próximo no visible");
    if(!mh.includes("Unidades del año escolar")) throw new Error("separador no actualizado");
  });

  console.log(fallos===0? "\nV29 TODO OK: 0 fallos" : "\nV29 FALLOS: "+fallos);
  process.exit(fallos===0?0:1);
})();
