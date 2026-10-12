const elementos = {};
function fakeEl(id){
  if(!elementos[id]){
    const el = { id, innerHTML:"", textContent:"", value:"", style:{}, _clases:new Set(), addEventListener(){}, dataset:{}, scrollTop:0 };
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
  getElementById: fakeEl, querySelectorAll: ()=>({ forEach(){} }),
  querySelector: ()=>({ classList:{ add(){}, remove(){} } }),
  createElement: ()=>fakeEl("t"+Math.random()),
  addEventListener(){}, hidden:false, activeElement:undefined,
};
globalThis.localStorage = { _d:{}, getItem(k){ return this._d[k]||null; }, setItem(k,v){ this._d[k]=v; } };
globalThis.window = globalThis;
globalThis.scrollTo = ()=>{};
globalThis.AudioContext = function(){ this.destination={}; this.createOscillator=()=>({connect(){},start(){},stop(){},frequency:{},type:''}); this.createGain=()=>({connect(){},gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}}}); this.currentTime=0; };
globalThis.navigator = { vibrate: ()=>{ globalThis.__vibras++; return true; } };
globalThis.fetch = async (url, opts)=>{
  const body = JSON.parse(opts.body);
  globalThis.__llamadas.push({ url, body });
  return { ok:true, json: async ()=>({ success:true, planes:[] }) };
};
globalThis.__pdfTextos = []; globalThis.__ultimosPdf = [];
function FakePdf(){
  this.addPage=()=>{}; this.save=(n)=>{ globalThis.__ultimosPdf.push(n); };
  this.text=(...a)=>{ globalThis.__pdfTextos.push(a.filter(x=>typeof x==="string"||typeof x==="number").map(String).join(" ")); };
  this.rect=()=>{}; this.circle=()=>{}; this.line=()=>{}; this.setDrawColor=()=>{}; this.setFillColor=()=>{};
  this.setTextColor=()=>{}; this.setFontSize=()=>{}; this.setFont=()=>this; this.splitTextToSize=(t)=>[String(t)];
}
globalThis.jspdf = { jsPDF: FakePdf };

/* ===== PRUEBAS V22 ===== */
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
    if(!ch.includes("Momentos ajustados a tu clase de 45 minutos, si lo deseas (cámbialo en perfil)")) throw new Error("texto momentos no actualizado");
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

  await probar("evaluación: cotejo de solo lectura con ✓ verde", ()=>{
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["d"], recursos:["r"],
      cotejo:{ "Logrado":["Nombra las partes del cuerpo sin ayuda","Señala el papelógrafo con precisión"],
               "En proceso":["Nombra con pistas de la maestra","Señala al ser guiado"],
               "Iniciado":["Observa el papelógrafo","Imita a sus compañeros"] },
      momentos:[] }] }] };
    mostrar("clase", HOY);
    const zona = alumnosHTML(HOY, "E");
    if(!zona.includes(">Evaluar<")) throw new Error("sin botón Evaluar");
    if(zona.includes("Evaluar alumno")) throw new Error("etiqueta vieja Evaluar alumno");
    abrirEvalAlumno(HOY, 3);
    if(document.getElementById("eval2Alum").textContent!=="ALUMNO 3") throw new Error("título: "+document.getElementById("eval2Alum").textContent);
    if(!document.getElementById("eval2Cotejo").innerHTML.includes("guía de observación")) throw new Error("sin guía de exploración");
    selEval2Estado("Logrado");
    const cj = document.getElementById("eval2Cotejo").innerHTML;
    if(!cj.includes("cotejo-item guia")) throw new Error("cotejo sin clase guia");
    if(!cj.includes("✓")) throw new Error("sin check verde");
    if(cj.includes("toggleEvid")) throw new Error("cotejo sigue siendo clickeable");
    if(!cj.includes("Nombra las partes del cuerpo sin ayuda")) throw new Error("cotejo Logrado ausente");
    if(!document.getElementById("ev2-L").classList.contains("sel")) throw new Error("botón Logrado no resaltado");
    confirmarEvalAlumno();
    if(S.evaluacion[HOY][3]!=="Logrado") throw new Error("estado no guardado");
    const kg = S.evalsEvid[HOY+"|3"];
    if(!kg || kg.estado!=="Logrado") throw new Error("evalsEvid no persistido");
    if(kg.sel && Object.keys(kg.sel).length) throw new Error("cotejo no debe marcar selecciones");
    if(document.getElementById("modalEval2Hoja").classList.contains("abierta")) throw new Error("hoja no cerró");
    const zona2 = alumnosHTML(HOY, "E");
    if(!zona2.includes(">Evaluado<")) throw new Error("botón Evaluado ausente tras evaluar");
    abrirEvalAlumno(HOY, 3);
    if(eval2.estado!=="Logrado") throw new Error("estado no restaurado al reabrir");
    cerrarEvalAlumno();
    abrirHistorial(3,"progreso");
    const cuerpo = document.getElementById("histCuerpo").innerHTML;
    if(!cuerpo.includes("Logrado")) throw new Error("estado ausente en historial");
    cerrarHistorial();
    // sin estado no guarda
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

  console.log(fallos===0? "\nV22 TODO OK: 0 fallos" : "\nV22 FALLOS: "+fallos);
  process.exit(fallos===0?0:1);
})();
