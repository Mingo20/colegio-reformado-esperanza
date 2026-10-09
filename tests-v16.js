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

/* ===== PRUEBAS V16 ===== */
(async ()=>{
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

  await probar("registro: aviso destacado bajo el login", ()=>{
    S.docente.id = null;
    mostrar("onboarding");
    const html = document.getElementById("scr-onboarding").innerHTML;
    if(!html.includes("onb-aviso")) throw new Error("sin tarjeta aviso");
    if(!html.includes("Completa tu perfil docente")) throw new Error("sin mensaje del perfil");
    if(!html.includes("personalizados y coherentes")) throw new Error("sin motivo");
    const iLogin = html.indexOf('id="cardLogin"'), iAviso = html.indexOf("onb-aviso"), iReg = html.indexOf('id="cardRegistro"');
    if(!(iLogin>-1 && iLogin<iAviso && iAviso<iReg)) throw new Error("posición incorrecta del aviso");
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

  await probar("borrar datos: modal elegante en vez de confirm", ()=>{
    borrarTodo();
    if(!document.getElementById("modalBorrarFondo").classList.contains("abierto")) throw new Error("modal no abre");
    if(!document.getElementById("modalBorrarHoja").classList.contains("abierta")) throw new Error("hoja no abre");
    S.asistencia["2026-10-01"] = { 1:"Presente" };
    confirmarBorrado();
    if(Object.keys(S.asistencia).length!==0) throw new Error("no borró");
    if(document.getElementById("modalBorrarFondo").classList.contains("abierto")) throw new Error("modal no cerró");
    cerrarBorrar();
  });

  await probar("perfil: tarjeta Estrategia eliminada y WhatsApp en datos", ()=>{
    mostrar("info");
    const html = document.getElementById("scr-info").innerHTML;
    if(html.includes("Estrategia de planificación")) throw new Error("tarjeta estrategia aún visible");
    if(html.includes("estGS") || html.includes("guardarEstrategia")) throw new Error("formularios de estrategia presentes");
    if(!html.includes("<span>WhatsApp</span>")) throw new Error("sin fila WhatsApp");
    if(html.includes("<span>Distrito</span>")) throw new Error("fila Distrito presente");
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

  await probar("clase: momentos expandibles sin Iniciar momento", ()=>{
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["Identifica las partes del cuerpo"], recursos:["Papelógrafo"], orientacion:"Celebrar cada logro",
      momentos:[{ nombre:"Inicio", duracion:"10 min", proposito:"Activar saberes previos", pasos:["a","b"] },{ nombre:"Desarrollo", duracion:"20 min", proposito:"p", pasos:["a"] }] }] }] };
    mostrar("clase", HOY);
    const html = document.getElementById("scr-clase").innerHTML;
    if(html.includes("Iniciar momento")) throw new Error("botón Iniciar momento presente");
    if(!html.includes("m-exp")) throw new Error("sin tarjetas expandibles");
    if(!html.includes("toggleMomentoCard(0)")) throw new Error("sin toggle");
    if(!html.includes("m-chevron")) throw new Error("sin icono chevron");
    if(!html.includes("QUÉ DEBE LOGRARSE HOY") && !html.includes("Qué debe lograrse hoy")) throw new Error("sin guía en tarjeta");
    if(!html.includes("Identifica las partes del cuerpo")) throw new Error("instrucciones no contextuales");
    if(!html.includes("Papelógrafo")) throw new Error("recursos ausentes en tarjeta");
    // acordeón: abrir 0, luego abrir 1 debe dejar solo una abierta
    S.ui.momentoAbierto = -1;
    toggleMomentoCard(0);
    if(S.ui.momentoAbierto!==0) throw new Error("no abrió: "+S.ui.momentoAbierto);
    toggleMomentoCard(1);
    if(S.ui.momentoAbierto!==1) throw new Error("no cambió a la segunda");
    toggleMomentoCard(1);
    if(S.ui.momentoAbierto!==-1) throw new Error("no contrajo");
  });

  await probar("evaluación: botón único con lista de cotejo", ()=>{
    planAbierto = { titulo:"P", semanas:[{ numero:1, dias:[{ id:HOY, etiqueta:"Hoy", titulo:"T", desempenos:["d"], recursos:["r"],
      cotejo:{ "Logrado":["Nombra las partes del cuerpo sin ayuda","Señala el papelógrafo con precisión"],
               "En proceso":["Nombra con pistas de la maestra","Señala al ser guiado"],
               "Iniciado":["Observa el papelógrafo","Imita a sus compañeros"] },
      momentos:[] }] }] };
    mostrar("clase", HOY);
    const zona = alumnosHTML(HOY, "E");
    if(!zona.includes("Evaluar alumno")) throw new Error("sin botón Evaluar alumno");
    if(zona.includes(">L</button>")) throw new Error("botones L/E/I presentes");
    abrirEvalAlumno(HOY, 3);
    if(!document.getElementById("modalEval2Hoja").classList.contains("abierta")) throw new Error("hoja no abrió");
    if(document.getElementById("eval2Alum").textContent!=="ALUMNO 3") throw new Error("título: "+document.getElementById("eval2Alum").textContent);
    if(!document.getElementById("eval2Cotejo").innerHTML.includes("explorar los tres")) throw new Error("sin guía de exploración");
    selEval2Estado("En proceso");
    if(!document.getElementById("eval2Cotejo").innerHTML.includes("Nombra con pistas de la maestra")) throw new Error("cotejo En proceso ausente");
    selEval2Estado("Logrado");
    if(!document.getElementById("eval2Cotejo").innerHTML.includes("Nombra las partes del cuerpo sin ayuda")) throw new Error("cotejo Logrado ausente");
    if(!document.getElementById("ev2-L").classList.contains("sel")) throw new Error("botón Logrado no resaltado");
    toggleEvid(0); toggleEvid(1);
    document.getElementById("eval2Obs").value = "Llegó feliz y contó a su mamá";
    confirmarEvalAlumno();
    if(S.evaluacion[HOY][3]!=="Logrado") throw new Error("estado no guardado");
    if(!S.evalsCom[HOY+"|3"].includes("Evidencias: Nombra las partes del cuerpo sin ayuda")) throw new Error("evidencias no guardadas: "+S.evalsCom[HOY+"|3"]);
    if(!S.evalsCom[HOY+"|3"].includes("Llegó feliz y contó a su mamá")) throw new Error("observación no guardada");
    if(document.getElementById("modalEval2Hoja").classList.contains("abierta")) throw new Error("hoja no cerró");
    // historial lo muestra
    abrirHistorial(3,"progreso");
    const cuerpo = document.getElementById("histCuerpo").innerHTML;
    if(!cuerpo.includes("Logrado")) throw new Error("estado ausente en historial");
    if(!cuerpo.includes("Evidencias: Nombra las partes del cuerpo sin ayuda")) throw new Error("evidencias ausentes en historial");    cerrarHistorial();
    // sin estado no guarda
    S.evaluacion[HOY] = {};
    abrirEvalAlumno(HOY, 4);
    const antes = JSON.stringify(S.evaluacion[HOY]);
    confirmarEvalAlumno();
    if(JSON.stringify(S.evaluacion[HOY])!==antes) throw new Error("guardó sin estado");
    cerrarEvalAlumno();
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

  console.log(fallos===0? "\nV16 TODO OK: 0 fallos" : "\nV16 FALLOS: "+fallos);
  process.exit(fallos===0?0:1);
})();
