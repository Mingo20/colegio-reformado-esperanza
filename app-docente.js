/* ============================================================
   PLANIFICACIÓN DOCENTE · RD · v4
   Multi-nivel (Inicial/Primaria/Secundaria) · Adecuación
   Curricular MINERD 2023 · Libreta · Progreso por grupo
   Colegio Reformado la Esperanza · DGtech · Delega IA
   ============================================================ */

const SYNC_URL  = "https://ca-68f01a11.base44.app/functions/syncDatosDocente";
const APP_URL   = "https://ca-68f01a11.base44.app/functions/appDocentes";
const ANIO_ESCOLAR = "2026-2027";
const HOY = new Date().toISOString().slice(0,10);

/* ---------- ÍCONOS MINIMALISTAS (SVG) ---------- */
function ic(nombre, s=18, color="currentColor"){
  const paths = {
    logo:      '<path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 10.5V15c0 1.7 3 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 8v5"/>',
    descarga:  '<path d="M12 3v12"/><polyline points="7 11 12 16 17 11"/><path d="M4 20h16"/>',
    objetivo:  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    reloj:     '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
    etiqueta:  '<path d="M20 12l-8 8-9-9V4h7l10 8z"/><circle cx="7.5" cy="7.5" r="1" fill="currentColor"/>',
    nota:      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>',
    usuarios:  '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    play:      '<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>',
    pausa:     '<rect x="5" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="15" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/>',
    reiniciar:  '<path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 9 8 9"/>',
    refrescar: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><polyline points="21 3 21 9 15 9"/>',
    bombilla:  '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
    lista:     '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1" fill="currentColor"/><circle cx="3.5" cy="12" r="1" fill="currentColor"/><circle cx="3.5" cy="18" r="1" fill="currentColor"/>',
    calendario:'<rect x="3" y="4" width="18" height="18" rx="3"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>',
    plan:      '<path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 10.5V15c0 1.7 3 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 8v5"/>',
    campana:   '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    tendencia: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    boletin:   '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>',
    libro:     '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    diaria:    '<rect x="3" y="4" width="18" height="18" rx="3"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><polyline points="8.5 14.5 11 17 15.5 12.5"/>',
    cuaderno:  '<path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><line x1="8.5" y1="7.5" x2="15" y2="7.5"/><line x1="8.5" y1="11" x2="15" y2="11"/><line x1="8.5" y1="14.5" x2="12.5" y2="14.5"/>',
    persona:   '<circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
    calAnual:  '<rect x="3" y="4" width="18" height="18" rx="3"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>',
    calMensual:'<rect x="3" y="4" width="18" height="17" rx="3"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="2" x2="9" y2="6"/><line x1="15" y1="2" x2="15" y2="6"/><line x1="7" y1="13" x2="13" y2="13"/><line x1="7" y1="17" x2="17" y2="17"/>',
    salir:     '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  };
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[nombre]||paths.objetivo}</svg>`;
}

/* ---------- COMPETENCIAS FUNDAMENTALES (MINERD · Adecuación 2023) ---------- */
const COMPETENCIAS = [
  { n:"Comunicativa", d:"Comunicación de manera integral: expresa ideas, sentimientos y experiencias mediante el lenguaje oral, escrito, artístico y corporal." },
  { n:"Ética y Ciudadana", d:"Convivencia y ciudadanía: participa, coopera y respeta las reglas en la vida en comunidad con sentido de justicia." },
  { n:"Pensamiento Lógico, Creativo y Crítico", d:"Explora, compara, clasifica y resuelve problemas de su entorno inmediato con autonomía." },
  { n:"Ambiental y de la Salud", d:"Manejo y cuidado de la vida y del ambiente: valora, cuida y protege los seres vivos y la salud integral." },
  { n:"Tecnológica y Científica", d:"Manejo de la información y recursos tecnológicos: indaga, observa y comparte información con criterio." },
  { n:"Desarrollo Personal y Espiritual", d:"Reconoce sus emociones, desarrolla su identidad y practica hábitos saludables." },
  { n:"Habilidades para la Vida", d:"Toma decisiones, resuelve conflictos y actúa con autonomía en situaciones cotidianas." },
];

/* ---------- CATÁLOGOS ---------- */
const GRADOS_POR_NIVEL = {
  Inicial:   ["Maternal","Pre-Kínder","Kínder","Pre-Primario"],
  Primaria:  ["1ro","2do","3ro","4to","5to","6to"],
  Secundaria:["1ro","2do","3ro","4to","5to","6to"],
};
function normalizaGrado(g){
  const map = {"3 años":"Pre-Kínder","4 años":"Kínder","5 años":"Pre-Primario","pre-kinder":"Pre-Kínder","preprimario":"Pre-Primario"};
  return map[String(g||"").trim()] || map[String(g||"").trim().toLowerCase()] || g;
}
function misGradosDocente(){
  const gs = [...new Set((S.docente.gradosSecciones||[]).map(x=>String(x).split("|")[0]))].filter(Boolean)
    .map(normalizaGrado);
  return gs.length? gs : [S.docente.grado].filter(Boolean).map(normalizaGrado);
}
function misSeccionesDe(g){
  const gN = normalizaGrado(g);
  const ss = [...new Set((S.docente.gradosSecciones||[]).filter(x=>normalizaGrado(String(x).split("|")[0])===gN).map(x=>String(x).split("|")[1]))].filter(Boolean);
  return ss.length? ss : SECCIONES;
}
function asigsDisponibles(){
  const nivel = S.docente.nivel;
  if(nivel==="Primaria"){
    const esp = S.docente.especialidad;
    if(esp && ASIG_ESP_PRIM.includes(esp)) return [esp];
    const sel = (S.docente.asignaturasSel||[]).filter(a=>ASIG_ESP_PRIM.includes(a));
    if(sel.length) return [sel[0]];
    return ASIG_BASICAS_PRIM;
  }
  if(nivel==="Secundaria"){
    const sel = (S.docente.asignaturasSel||[]).filter(Boolean);
    if(sel.length===1) return [sel[0]];
    return (ASIGNATURAS_RD["Secundaria"]||[]);
  }
  return (ASIGNATURAS_RD[nivel]||[]);
}
function asigDeTitulo(t){
  t = t||"";
  if(t.indexOf("FIHyR")>=0) return "Formación Integral Humana y Religiosa";
  const asigs = (ASIGNATURAS_RD["Primaria"]||[]).concat(ASIGNATURAS_RD["Secundaria"]||[]);
  return asigs.find(a=> t.indexOf(a+" ")===0 || t.indexOf("· "+a)>=0) || "";
}
function planParaDocente(p){
  if(!p) return false;
  const nivel = S.docente.nivel;
  if(p.nivel && p.nivel!==nivel) return false;
  if(nivel==="Inicial"){
    const pg = normalizaGrado(p.grado);
    const mis = misGradosDocente();
    if(pg && mis.length && !mis.includes(pg)) return false;
    const dg = normalizaGrado(S.docente.grado);
    if(pg && dg && !mis.length && pg!==dg) return false;
  } else {
    const mis = misGradosDocente();
    const pg = normalizaGrado(p.grado);
    if(pg && mis.length && !mis.includes(pg)) return false;
    const asigs = (S.docente.asignaturasSel||[]).filter(Boolean);
    if(p.asig && asigs.length && !asigs.includes(p.asig)) return false;
    const pa = asigDeTitulo(p.titulo);
    if(pa && asigs.length && !asigs.includes(pa)) return false;
  }
  return true;
}
const JORNADAS = ["Matutina","Vespertina","Nocturna","Jornada Extendida"];
const MESES_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const PERIODOS = ["1er periodo","2do periodo","3er periodo","4to periodo"];
function periodoDeMes(m){ if(m>=8&&m<=10) return 1; if(m>=11||m===1||m===12) return 2; if(m>=2&&m<=4) return 3; return 4; }
function periodoDeFecha(f){ return PERIODOS[periodoDeMes(parseInt((f||HOY).slice(5,7)))-1] || PERIODOS[0]; }
function numDePeriodo(p){ const i = PERIODOS.indexOf(p); return i>=0? i+1 : periodoDeMes(parseInt(HOY.slice(5,7))); }
const SECCIONES = ["A","B","C","D","E","F"];
const ASIG_BASICAS_PRIM = ["Lengua Española","Matemática","Ciencias de la Naturaleza","Ciencias Sociales","Formación Integral Humana y Religiosa"];
const ASIG_ESP_PRIM = ["Inglés","Francés","Educación Física","Educación Artística"];
function puedeElegirGrado(){
  const nivel = S.docente.nivel;
  if(nivel==="Secundaria") return true;
  if(nivel==="Primaria"){
    const asigs = (S.docente.asignaturasSel||[]).filter(Boolean);
    return asigs.some(a=> ASIG_ESP_PRIM.indexOf(a)>=0);
  }
  return false;
}
function nivelUsaEvaluacionCualitativa(){ return S.docente.nivel==="Inicial"; }
const ESTRATEGIAS_RD = {
  "Inicial": ["Centro de Interés","Unidad de aprendizaje","Proyecto de Aula"],
  "Primaria": ["Unidad de Aprendizaje","Proyecto de Investigación","Proyecto Participativo de Aula (PPA)","Proyecto de Intervención de Aula","Eje Temático"],
  "Secundaria": ["Unidad de Aprendizaje","Proyecto de Investigación","Proyecto Participativo de Aula (PPA)","Proyecto de Intervención de Aula"]
};
function estrategiaDe(gs, asig, periodo){
  const e = S.docente.estrategias||{};
  return e[gs+"|"+(asig||"—")+"|"+periodo] || null;
}
function evalsAlumno(n){
  let L=0, EP=0, I=0;
  Object.keys(S.evaluacion||{}).forEach(f=>{
    if(!/^\d{4}-\d{2}-\d{2}$/.test(f)) return;
    const v = (S.evaluacion[f]||{})[n];
    if(v==="Logrado") L++; else if(v==="En proceso") EP++; else if(v==="Iniciado") I++;
  });
  const t = L+EP+I;
  return { L, EP, I, total:t,
    pL: t? Math.round(L*100/t) : null,
    pEP: t? Math.round(EP*100/t) : null,
    pI: t? Math.round(I*100/t) : null };
}
function grupoReg(){ return { g: S.ui.regGrado||S.docente.grado||"", s: S.ui.regSec||S.docente.seccion||"A" }; }
const ASIGNATURAS_RD = {
  Inicial: ["Identidad y Autonomía","Convivencia y Ciudadanía","Comprensión del Lenguaje","Comprensión del Mundo Físico y Natural","Expresión Artística y Corporal"],
  Primaria: ["Lengua Española","Matemática","Ciencias Sociales","Ciencias de la Naturaleza","Inglés","Francés","Formación Integral Humana y Religiosa","Educación Física","Educación Artística"],
  Secundaria: ["Lengua Española","Matemática","Biología","Física","Química","Ciencias Sociales","Geografía","Historia","Inglés","Francés","Formación Integral Humana y Religiosa","Educación Física","Educación Artística","Informática","Psicología","Filosofía y Sociología","Economía","Gestión Empresarial"],
};

/* ---------- PLANES ANUALES POR NIVEL (unidades por mes) ---------- */
const PLAN_ANUAL_INICIAL = [
  { mes:"Agosto 2026", trimestre:"1er Trimestre", tema:"Mi escuela y yo", enfoque:"Adaptación escolar, hábitos y rutinas, normas de convivencia.", contenidos:"Mi salón · Mi maestra · Mis compañeros · Rutinas del día", evaluacion:"Observación directa del proceso de adaptación." },
  { mes:"Septiembre 2026", trimestre:"1er Trimestre", tema:"La Mariposa", enfoque:"El ciclo de vida de la mariposa: descubrimiento, indagación y metamorfosis.", contenidos:"Características · Ciclo de vida · Cuidado de la naturaleza", evaluacion:"Evaluación lúdica por estaciones · Registro diario de logros." },
  { mes:"Octubre 2026", trimestre:"1er Trimestre", tema:"Mi cuerpo y mis sentidos", enfoque:"Identificación de partes del cuerpo y los cinco sentidos.", contenidos:"Mi cuerpo · Los sentidos · Higiene y autocuidado", evaluacion:"Circuitos de experimentación sensorial." },
  { mes:"Noviembre 2026", trimestre:"Cierre 1er T.", tema:"La familia y mi comunidad", enfoque:"Estructura familiar, roles y espacios de la comunidad.", contenidos:"Mi familia · Mi casa · Mi barrio · Oficios", evaluacion:"Maqueta comunitaria y socialización familiar." },
  { mes:"Diciembre 2026", trimestre:"2do Trimestre", tema:"Festividades y tradiciones dominicanas", enfoque:"Identidad cultural y celebraciones locales.", contenidos:"Navidad · Villancicos · Comidas típicas", evaluacion:"Festival navideño infantil." },
  { mes:"Enero 2027", trimestre:"2do Trimestre", tema:"El invierno y el clima", enfoque:"Fenómenos naturales: lluvia, sol, viento y frío.", contenidos:"El clima · Vestimenta según estación · El agua y el sol", evaluacion:"Experimentos sencillos de observación." },
  { mes:"Febrero 2027", trimestre:"2do Trimestre", tema:"Los medios de transporte", enfoque:"Medios de transporte terrestres, aéreos y acuáticos.", contenidos:"Vehículos · Señales de tránsito · Viajes imaginarios", evaluacion:"Circuito de tránsito escolar." },
  { mes:"Marzo 2027", trimestre:"3er Trimestre", tema:"Las plantas y la primavera", enfoque:"Cultivo, cuidado y partes de una planta.", contenidos:"La semilla · La raíz · La flor · Huerto escolar", evaluacion:"Exposición del huerto del aula." },
  { mes:"Abril 2027", trimestre:"3er Trimestre", tema:"El agua, fuente de vida", enfoque:"Importancia del agua y su cuidado responsable.", contenidos:"El agua · Estados del agua · Cuidado del recurso", evaluacion:"Proyecto: Ahorradores de agua." },
  { mes:"Mayo 2027", trimestre:"3er Trimestre", tema:"Los alimentos saludables", enfoque:"Alimentación balanceada y hábitos de salud.", contenidos:"Frutas · Verduras · El desayuno · La lonchera", evaluacion:"Mercadito saludable." },
  { mes:"Junio 2027", trimestre:"Cierre de año", tema:"El mar y sus criaturas · Cierre", enfoque:"Vida marina y recapitulación del año escolar.", contenidos:"El mar · Peces · Playa limpia · Repaso general", evaluacion:"Evaluación final lúdica y acto de clausura." },
];
const PLAN_ANUAL_PRIMARIA = [
  { mes:"Agosto 2026", trimestre:"1er Trimestre", tema:"Convivencia y organización escolar", enfoque:"Normas de convivencia, rutinas y organización del aula.", contenidos:"Acuerdos de convivencia · Rutinas · Valores", evaluacion:"Sociograma y registro anecdótico." },
  { mes:"Septiembre 2026", trimestre:"1er Trimestre", tema:"La naturaleza y sus seres vivos", enfoque:"Indagación científica del entorno natural.", contenidos:"Ecosistemas · Cadenas alimenticias · Cuidado ambiental", evaluacion:"Proyecto de ciencias por equipos." },
  { mes:"Octubre 2026", trimestre:"1er Trimestre", tema:"Mi cuerpo, mi salud", enfoque:"Anatomía básica, higiene y alimentación saludable.", contenidos:"Partes del cuerpo · Hábitos de higiene · Alimentación", evaluacion:"Cartel informativo y exposición." },
  { mes:"Noviembre 2026", trimestre:"Cierre 1er T.", tema:"Mi comunidad dominicana", enfoque:"Instituciones, oficios y servicios de la comunidad.", contenidos:"Instituciones · Oficios · Símbolos patrios", evaluacion:"Maqueta de la comunidad y presentación oral." },
  { mes:"Diciembre 2026", trimestre:"2do Trimestre", tema:"Cultura e identidad dominicana", enfoque:"Tradiciones, música y festividades del país.", contenidos:"Navidad dominicana · Merengue · Comidas típicas", evaluacion:"Festival cultural escolar." },
  { mes:"Enero 2027", trimestre:"2do Trimestre", tema:"El clima y el medio ambiente", enfoque:"Fenómenos atmosféricos y cuidado del planeta.", contenidos:"El clima · El agua · Reciclaje", evaluacion:"Experimento guiado con informe." },
  { mes:"Febrero 2027", trimestre:"2do Trimestre", tema:"Patria y ciudadanía", enfoque:"Símbolos patrios, efemérides y democracia.", contenidos:"27 de Febrero · Duarte · Democracia", evaluacion:"Debate guiado y periódico mural." },
  { mes:"Marzo 2027", trimestre:"3er Trimestre", tema:"Las plantas y la agricultura", enfoque:"Partes de la planta y agricultura dominicana.", contenidos:"La planta · La agricultura · Productos del campo", evaluacion:"Huerto escolar con registro de observación." },
  { mes:"Abril 2027", trimestre:"3er Trimestre", tema:"Tecnología e información", enfoque:"Uso responsable de la tecnología y búsqueda de información.", contenidos:"Medios digitales · Búsqueda segura · Presentaciones", evaluacion:"Presentación digital por equipos." },
  { mes:"Mayo 2027", trimestre:"3er Trimestre", tema:"Alimentación y vida saludable", enfoque:"Nutrición, deporte y bienestar.", contenidos:"Grupos alimenticios · Deporte · Descanso", evaluacion:"Feria de vida saludable." },
  { mes:"Junio 2027", trimestre:"Cierre de año", tema:"República Dominicana: proyecto integrador", enfoque:"Síntesis de aprendizajes del año con proyecto final.", contenidos:"Repaso general · Proyecto integrador", evaluacion:"Exposición final y portafolio." },
];
const PLAN_ANUAL_SECUNDARIA = [
  { mes:"Agosto 2026", trimestre:"1er Trimestre", tema:"Proyecto de aula y convivencia", enfoque:"Acuerdos de convivencia y metodología de proyectos.", contenidos:"Normas · Trabajo colaborativo · Pensamiento crítico", evaluacion:"Diagnóstico inicial y contrato de aula." },
  { mes:"Septiembre 2026", trimestre:"1er Trimestre", tema:"Ciencia e indagación", enfoque:"Método científico aplicado a problemas del entorno.", contenidos:"Método científico · Experimentos · Informes", evaluacion:"Informe de laboratorio por equipos." },
  { mes:"Octubre 2026", trimestre:"1er Trimestre", tema:"Salud integral e identidad", enfoque:"Adolescencia, salud y desarrollo personal.", contenidos:"Cambios en la adolescencia · Salud emocional · Hábitos", evaluacion:"Portafolio personal reflexivo." },
  { mes:"Noviembre 2026", trimestre:"Cierre 1er T.", tema:"Comunidad, democracia y participación", enfoque:"Ciudadanía activa y problemáticas comunitarias.", contenidos:"Democracia · Participación · Proyectos comunitarios", evaluacion:"Debate formal y ensayo argumentativo." },
  { mes:"Diciembre 2026", trimestre:"2do Trimestre", tema:"Cultura dominicana y patrimonio", enfoque:"Identidad nacional, música, arte y patrimonio.", contenidos:"Patrimonio · Arte dominicano · Tradiciones", evaluacion:"Exposición museográfica del aula." },
  { mes:"Enero 2027", trimestre:"2do Trimestre", tema:"Medio ambiente y sostenibilidad", enfoque:"Problemáticas ambientales y desarrollo sostenible.", contenidos:"Cambio climático · Energías renovables · Basura cero", evaluacion:"Campaña ambiental con evidencias." },
  { mes:"Febrero 2027", trimestre:"2do Trimestre", tema:"Patria, memoria y ciudadanía", enfoque:"Efemérides patrias y construcción de la democracia dominicana.", contenidos:"Independencia · Restauración · Ciudadanía", evaluacion:"Ensayo y foro histórico." },
  { mes:"Marzo 2027", trimestre:"3er Trimestre", tema:"Género, derechos e igualdad", enfoque:"Derechos humanos, equidad e igualdad de oportunidades.", contenidos:"Derechos humanos · Equidad · Respeto", evaluacion:"Proyecto de sensibilización." },
  { mes:"Abril 2027", trimestre:"3er Trimestre", tema:"Tecnología, medios y sociedad", enfoque:"Alfabetización mediática y ciudadanía digital.", contenidos:"Medios · Redes sociales · Ética digital", evaluacion:"Producción audiovisual crítica." },
  { mes:"Mayo 2027", trimestre:"3er Trimestre", tema:"Economía y emprendimiento", enfoque:"Educación financiera y proyectos emprendedores.", contenidos:"Ahorro · Presupuesto · Proyecto de negocio", evaluacion:"Feria de emprendimiento." },
  { mes:"Junio 2027", trimestre:"Cierre de año", tema:"Proyecto integrador de cierre", enfoque:"Síntesis interdisciplinaria del año escolar.", contenidos:"Integración de áreas · Socialización", evaluacion:"Defensa de proyectos y evaluación final." },
];
const PLANES_ANUALES = {
  "Inicial":    { titulo:"Plan Anual Inicial",    temas: PLAN_ANUAL_INICIAL },
  "Primaria":   { titulo:"Plan Anual Primaria",   temas: PLAN_ANUAL_PRIMARIA },
  "Secundaria": { titulo:"Plan Anual Secundaria", temas: PLAN_ANUAL_SECUNDARIA },
};

/* ---------- COMPONENTES MINERD (Adecuación Curricular 2023) ---------- */
const ANUAL_MINERD = {
  "Inicial": {
    descripcion:"Planificación integral del Nivel Inicial (no por asignaturas aisladas), basada en el desarrollo infantil y las áreas de aprendizaje del currículo vigente.",
    compEspecificas:[
      "Establece relaciones afectuosas y de confianza con las personas de su entorno inmediato.",
      "Se expresa con seguridad mediante el lenguaje oral, artístico y corporal.",
      "Explora e interpreta el mundo natural y social con curiosidad e iniciativa.",
      "Desarrolla hábitos de autonomía, higiene y cuidado personal acordes a su edad.",
      "Participa y coopera en actividades grupales respetando las normas construidas.",
    ],
    estrategias:["Aprendizaje basado en el juego","Indagación lúdica y rincones de interés","Socialización y trabajo cooperativo","Situaciones de la vida cotidiana"],
    ejes:["Salud y Bienestar","Ciudadanía y Convivencia","Medio Ambiente y Desarrollo Sostenible","Cultura e Identidad Dominicana","Educación en Valores"],
    tecnicas:["Observación directa y registro anecdótico","Lista de cotejo con logros del desarrollo","Portafolio de trabajos del niño","Escala de valoración cualitativa"],
    indicadores:[
      "Identifica y nombra los elementos principales de la unidad trabajada.",
      "Participa activamente en las situaciones de aprendizaje lúdicas propuestas.",
      "Expresa lo aprendido mediante el lenguaje oral, artístico y corporal.",
      "Muestra hábitos de orden, convivencia y cuidado del entorno.",
    ],
    procContenidos:["Observar, explorar y manipular materiales del entorno","Comparar y clasificar elementos según sus características","Expresar lo aprendido de forma oral, plástica y corporal"],
    actContenidos:["Convivencia y respeto hacia los compañeros y adultos","Cuidado del material y del entorno inmediato","Participación con alegría, seguridad y autonomía"],
    recursosFis:"Materiales concretos del aula, libros de imágenes, juguetes didácticos, material reciclado, papelografía, recursos del entorno.",
    recursosDig:"Videos educativos, canciones y audios infantiles, aplicaciones educativas seleccionadas.",
    situacion(m){ return {
      escenario:"El aula y los espacios del centro educativo (rincones, patio, zonas verdes).",
      reto:"¿Cómo podemos descubrir y aprender más sobre "+m.tema.toLowerCase()+" con nuestros sentidos y mediante el juego?",
      estrategia:"Indagación lúdica, exploración sensorial y trabajo en rincones de interés.",
      producto:"Mural colectivo y exposición oral sobre "+m.tema.toLowerCase()+".",
    }; },
  },
  "Primaria": {
    descripcion:"Planificación anual por competencias fundamentales del Nivel Primario, articulando las áreas curriculares con proyectos y trabajo colaborativo.",
    compEspecificas:[
      "Comprende y produce textos orales y escritos acordes a su grado y contexto.",
      "Aplica el razonamiento lógico-matemático en situaciones de la vida cotidiana.",
      "Indaga sobre los fenómenos naturales y sociales de su entorno con método.",
      "Convive y participa respetando la diversidad y los acuerdos del grupo.",
      "Utiliza recursos tecnológicos para buscar, organizar y presentar información.",
    ],
    estrategias:["Aprendizaje basado en proyectos","Indagación dialógica","Trabajo colaborativo por equipos","Aprendizaje basado en retos"],
    ejes:["Salud y Bienestar","Ciudadanía y Convivencia","Medio Ambiente y Desarrollo Sostenible","Cultura e Identidad Dominicana","Educación Vial y para la Paz"],
    tecnicas:["Rúbricas analíticas","Listas de cotejo","Portafolio de evidencias","Pruebas escritas y proyectos integradores"],
    indicadores:[
      "Explica con sus palabras los conceptos clave de la unidad trabajada.",
      "Aplica los procedimientos estudiados en situaciones nuevas.",
      "Colabora en equipo cumpliendo roles y acuerdos.",
      "Presenta sus trabajos con orden, claridad y creatividad.",
    ],
    procContenidos:["Investigar e interpretar información de fuentes sencillas","Elaborar esquemas, maquetas y material de apoyo","Exponer y socializar los hallazgos del equipo"],
    actContenidos:["Respeto y valoración del trabajo propio y ajeno","Responsabilidad con las tareas y el cuidado del ambiente","Solidaridad y cooperación en el grupo"],
    recursosFis:"Libros de texto, cuadernos, papelografía, materiales del entorno, material reciclado, biblioteca de aula.",
    recursosDig:"Proyector, videos educativos, computadora o tablet, plataformas educativas del MINERD.",
    situacion(m){ return {
      escenario:"El aula, la escuela y la comunidad del entorno cercano.",
      reto:"¿Cómo podemos conocer y dar a conocer lo esencial de "+m.tema.toLowerCase()+" a nuestra comunidad escolar?",
      estrategia:"Aprendizaje basado en proyectos con trabajo colaborativo por equipos.",
      producto:"Exposición con cartelería sobre "+m.tema.toLowerCase()+" y portafolio de evidencias.",
    }; },
  },
  "Secundaria": {
    descripcion:"Planificación anual del Nivel Secundario con enfoque por competencias, proyectos, pensamiento crítico y participación ciudadana.",
    compEspecificas:[
      "Analiza y argumenta con criterio sobre problemas del contexto social y natural.",
      "Comunica ideas con claridad en formatos orales, escritos y digitales.",
      "Aplica el método científico en la investigación y resolución de problemas.",
      "Ejerce una ciudadanía crítica, democrática y responsable.",
      "Gestiona proyectos personales y colaborativos con autonomía y ética.",
    ],
    estrategias:["Aprendizaje basado en proyectos y problemas","Indagación dialógica y debate","Estudio de casos","Aula invertida con tutoría entre pares"],
    ejes:["Salud y Bienestar","Ciudadanía y Convivencia","Medio Ambiente y Desarrollo Sostenible","Cultura e Identidad Dominicana","Educación para la Paz y la Equidad"],
    tecnicas:["Rúbricas analíticas y holísticas","Debates y mesas redondas con escala de valoración","Portafolio digital","Pruebas objetivas y ensayos argumentativos"],
    indicadores:[
      "Argumenta sus posiciones con evidencias y fuentes verificables.",
      "Diseña y ejecuta productos que responden al reto de la unidad.",
      "Reflexiona sobre su proceso de aprendizaje (metacognición).",
      "Trabaja en equipos diversos con respeto y responsabilidad compartida.",
    ],
    procContenidos:["Analizar fuentes, datos y contextos del problema planteado","Diseñar y ejecutar el proyecto con informe de avance","Socializar y defender los resultados con evidencias"],
    actContenidos:["Responsabilidad y compromiso con el aprendizaje","Respeto a la diversidad y a los acuerdos democráticos","Ética digital y uso responsable de la información"],
    recursosFis:"Libros de texto y fuentes impresas, documentos de trabajo, biblioteca del centro.",
    recursosDig:"Proyector, computadoras, plataformas educativas, recursos web del MINERD, portafolio digital.",
    situacion(m){ return {
      escenario:"El aula, el centro educativo y el contexto comunitario y digital.",
      reto:"¿Qué problema o necesidad real sobre "+m.tema.toLowerCase()+" podemos investigar y resolver?",
      estrategia:"Aprendizaje basado en proyectos y problemas con investigación documental.",
      producto:"Informe y socialización del proyecto con evidencias en portafolio digital.",
    }; },
  },
};
const SEMANAS_PLANTILLA = [
  { semana:1, inicio:"Exploración de saberes previos y presentación del reto de la unidad.", desarrollo:"Aproximación al tema mediante actividades guiadas y trabajo colaborativo.", cierre:"Socialización de los primeros hallazgos y acuerdos del equipo." },
  { semana:2, inicio:"Recuperación de lo aprendido y reformulación del reto.", desarrollo:"Construcción de los conceptos clave y actividades de práctica.", cierre:"Metacognición parcial y registro de avances." },
  { semana:3, inicio:"Repaso de los contenidos con preguntas problematizadoras.", desarrollo:"Aplicación práctica y elaboración del producto final.", cierre:"Revisión del avance del producto y ajustes." },
  { semana:4, inicio:"Integración de los aprendizajes de la unidad.", desarrollo:"Terminación, ensayo y presentación del producto final.", cierre:"Evaluación del producto y cierre metacognitivo." },
];

const PLAN_MARIPOSA = {
  id:"sep-2026",
  titulo:"Planificación Mensual · La Mariposa 🦋",
  mes:"Septiembre 2026",
  nivel:"Inicial", grado:"Inicial", seccion:"A",
  tema:"La Mariposa",
  descripcion:"Unidad de indagación sobre el ciclo de vida de la mariposa: descubrimiento, huevo, oruga, crisálida y mariposa. Evaluación lúdica por estaciones.",
  ciclo:{ titulo:"Ciclo de la mariposa", etapas:[
    { n:"Huevo", d:"La mariposa mamá pone sus huevos en las hojas.", sem:"Semana 2" },
    { n:"Oruga", d:"Nace, come hojas y crece cada día más.", sem:"Semana 2" },
    { n:"Crisálida", d:"Teje su casa y duerme mientras se transforma.", sem:"Semana 3" },
    { n:"Mariposa", d:"Sale con sus alas nuevas y vuela al jardín.", sem:"Semanas 4-5" },
  ]},
  areas:["Comunicación oral","Matemática","Entorno social y natural","Educación artística","Educación física"],
  semanas: [
    { numero:1, tema:"Descubriendo la mariposa", fechas:"1 – 4 sep", dias: [
      { id:"2026-09-01", etiqueta:"Martes 1", titulo:"¿Qué es una mariposa?",
        desempenos:["Muestra curiosidad e interés por la mariposa.","Expresa sus ideas mediante lenguaje oral."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Activar la curiosidad y los conocimientos previos.",
            pasos:["Presentar la caja misteriosa y agitarla suavemente para crear expectativa.","Preguntar: ¿qué habrá dentro? ¿será grande o pequeña?","Descubrir juntos la mariposa de juguete y observar con atención."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Observar y describir las características de la mariposa.",
            pasos:["Mostrar láminas de mariposas reales en la pizarra.","Guiar la observación con preguntas: ¿qué tiene en la cabeza? ¿de qué color son sus alas?","Escribir en la pizarra las palabras que aportan los niños: alas, antenas, colores."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Representar la mariposa con material concreto.",
            pasos:["Entregar material moldeable para crear una mariposa.","Conversar sobre los colores y el tamaño de cada creación.","Colocar los trabajos en el mural del aula."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Socializar lo aprendido.",
            pasos:["Cantar la canción 'La mariposa' con gestos.","Preguntar: ¿qué aprendimos hoy de la mariposa?","Guardar los materiales cantando la canción de orden."] }
        ],
        recursos:["📦 Caja misteriosa","🦋 Mariposa de juguete","🖼️ Láminas de mariposas","🎨 Material moldeable"],
        orientacion:"Acompañar la exploración con preguntas abiertas; no corregir, solo ampliar el vocabulario de los niños." },
      { id:"2026-09-02", etiqueta:"Miércoles 2", titulo:"Las partes de la mariposa",
        desempenos:["Nombra las partes de la mariposa: alas, antenas, cuerpo y patas."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Recordar la clase anterior con la canción.",
            pasos:["Cantar 'Vuela la mariposa' con movimientos.","Mostrar la mariposa de juguete y repasar su nombre."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Identificar las partes del cuerpo de la mariposa.",
            pasos:["Presentar la mariposa gigante de papel en la pared.","Señalar y nombrar: alas, antenas, cuerpo y patas.","Pegar las etiquetas con nombres junto a cada parte."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Ubicar las partes en la mariposa gigante.",
            pasos:["Cada niño pega una parte del cuerpo en la mariposa gigante.","Repetir el nombre de la parte mientras la pegan.","Contar juntos cuántas alas tiene la mariposa."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Consolidar el vocabulario con el cuerpo.",
            pasos:["Jugar 'Simón dice': toca tus alas, tus antenas.","Imitar el vuelo de la mariposa por el aula.","Felicitación grupal con aplausos de mariposas."] }
        ],
        recursos:["🦋 Mariposa gigante de papel","🏷️ Etiquetas con nombres","🎵 Canción 'Vuela la mariposa'"],
        orientacion:"Repetir los nombres de las partes varias veces; los niños de 4 años necesitan mucha repetición lúdica." },
      { id:"2026-09-03", etiqueta:"Jueves 3", titulo:"Mariposas de colores",
        desempenos:["Clasifica mariposas según su color y tamaño.","Compara objetos: grande / pequeño."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Activar la percepción de colores.",
            pasos:["Canción de los colores.","Mostrar la canasta con mariposas de papel de colores."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Clasificar por color.",
            pasos:["Presentar los canastos de colores.","Explicar el juego: cada mariposa va a su casa de color.","Modelar un ejemplo y dejar que los niños expliquen el resto."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Crear secuencias simples de color.",
            pasos:["Formar parejas para ordenar patrones: roja, azul, roja, azul.","Comparar tamaños: mariposas grandes y pequeñas.","Contar cuántas hay de cada color."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Verificar el logro con juego rápido.",
            pasos:["Juego: levanta la mariposa azul, la roja, la grande.","Guardar cada canasto con su color.","Canción de despedida de la mariposa."] }
        ],
        recursos:["🧺 Canastos de colores","🦋 Mariposas de papel variadas"],
        orientacion:"Permitir que manipulen libremente antes de dar la consigna; la clasificación surge del juego." },
      { id:"2026-09-04", etiqueta:"Viernes 4", titulo:"¿Dónde viven las mariposas?",
        desempenos:["Identifica el jardín como hogar de las mariposas.","Muestra actitudes de cuidado hacia las plantas."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Generar expectativa sobre el paseo.",
            pasos:["Conversar: ¿dónde viven las mariposas?","Mostrar láminas de jardines con flores.","Explicar el paseo por el patio y las reglas de cuidado."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Explorar el entorno natural.",
            pasos:["Paseo por el patio del colegio observando flores, hojas e insectos.","Conversar sobre lo que ven: colores, olores, tamaños.","Hablar sobre el cuidado de las plantas: no arrancarlas."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Representar el jardín de las mariposas.",
            pasos:["Dibujar el jardín que observaron.","Añadir mariposas con crayones.","Nombrar los elementos de su dibujo."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Reflexionar sobre el cuidado del ambiente.",
            pasos:["Exponer los dibujos en el mural.","Conversar: ¿cómo cuidamos las plantas?","Compromiso grupal: regar la planta del aula."] }
        ],
        recursos:["🌸 Láminas de jardines","🖍️ Crayones","🌳 Patio del colegio"],
        orientacion:"En el paseo, mantener al grupo en círculo y nombrar cada hallazgo en voz alta para todos." }
    ]},
    { numero:2, tema:"El huevo y la oruga", fechas:"7 – 11 sep", dias: [
      { id:"2026-09-07", etiqueta:"Lunes 7", titulo:"La mariposa mamá pone sus huevos",
        desempenos:["Identifica el huevo como primera etapa del ciclo de la mariposa."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Introducir el cuento de la semana.",
            pasos:["Leer el cuento 'La oruga glotona' (inicio).","Preguntar: ¿de dónde vienen las mariposas?"] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Conocer dónde la mariposa pone sus huevos.",
            pasos:["Mostrar la hoja grande de papel.","Explicar que la mariposa mamá pone huevitos en las hojas.","Observar imágenes reales de huevos en hojas."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Representar los huevos en la hoja.",
            pasos:["Cada niño pega sus bolitas de papel (huevos) en la hoja.","Contar los huevitos pegados.","Comparar: ¿quién tiene más huevitos?"] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Repetir la secuencia aprendida.",
            pasos:["Repasar: primero el huevo…","Canción de la oruga.","Guardar materiales."] }
        ],
        recursos:["🍃 Hoja grande de papel","⚪ Bolitas de papel (huevos)","📖 Cuento 'La oruga glotona'"],
        orientacion:"Refuerzar el vocabulario 'huevo' y 'hoja'; los niños tienden a confundir huevo con bolita." },
      { id:"2026-09-08", etiqueta:"Martes 8", titulo:"¡Nace la oruga!",
        desempenos:["Describe qué come la oruga: hojas verdes.","Expresa la secuencia huevo → oruga."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Reactivar el contenido previo.",
            pasos:["Canción de la oruga.","Mostrar la hoja con huevos de la clase anterior: ¡se movieron!"] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Presentar la oruga.",
            pasos:["Presentar la oruga de juguete: ¡nació!","Observar su cuerpo: largo, con patitas.","Explicar que la oruga come muchas hojas verdes."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Alimentar a la oruga.",
            pasos:["Cada niño entrega una hoja verde a la oruga.","Contar cuántas hojas comió.","Imitar el movimiento de la oruga gateando."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Ordenar la secuencia.",
            pasos:["Ordenar tarjetas: primero huevo, luego oruga.","Canción 'La oruga camina' con gestos.","Guardar materiales."] }
        ],
        recursos:["🐛 Oruga de juguete","🍃 Hojas verdes de papel","🃏 Tarjetas de secuencia"],
        orientacion:"Movimiento corporal primero, vocabulario después: en Inicial el cuerpo aprende antes que la palabra." },
      { id:"2026-09-09", etiqueta:"Miércoles 9", titulo:"La oruga crece y crece",
        desempenos:["Ordena objetos de pequeño a grande.","Usa comparativos: pequeño, mediano, grande."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Contar cómo la oruga crece.",
            pasos:["Cuento: la oruga comió y comió y creció.","Mostrar tres orugas de distinto tamaño."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Comparar tamaños.",
            pasos:["Nombrar: oruga pequeña, mediana, grande.","Ordenar las orugas de menor a mayor en la pizarra.","Pedir a los niños que señalen con sus manos el tamaño."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Ordenar en grupos.",
            pasos:["En parejas, ordenar las orugas de papel por tamaño.","Verificar cada pareja con preguntas.","Contar cuántas orugas hay."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Jugar con el cuerpo los tamaños.",
            pasos:["Hacerse pequeños, medianos y grandes con el cuerpo.","Canción de la oruga creciente.","Guardar materiales."] }
        ],
        recursos:["🐛 Orugas de juguete en 3 tamaños","🃏 Orugas de papel"],
        orientacion:"Usar las manos y el cuerpo como medida natural antes de introducir reglas formales." },
      { id:"2026-09-10", etiqueta:"Jueves 10", titulo:"Orugas hambrientas (contamos hojas)",
        desempenos:["Cuenta del 1 al 5 con correspondencia.","Agrega y quita objetos en juegos."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Activar el conteo.",
            pasos:["Canción de los números.","Repasar: la oruga come hojas, ¡contemos las suyas!"] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Contar hojas del 1 al 5.",
            pasos:["Dar a cada niño una 'oruga' (sobre de papel) con 5 hojas.","Contar juntos las hojas tocando cada una.","Jugar: la oruga comió 2, ¿cuántas quedan?"] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Conteo con material concreto.",
            pasos:["Cada niño recibe hojitas de papel.","El docente dice un número y colocan esa cantidad.","Verificar uno a uno mientras juegan."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Consolidar el conteo.",
            pasos:["Conteo final grupal del 1 al 5 con palmas.","Canción 'Cinco hojitas'.","Guardar materiales."] }
        ],
        recursos:["🃏 Hojitas de papel","🎵 Canción 'Cinco hojitas'"],
        orientacion:"El conteo siempre con objetos concretos en las manos; el número dicho se asocia al objeto tocado." },
      { id:"2026-09-11", etiqueta:"Viernes 11", titulo:"Dramatizamos la oruga",
        desempenos:["Expresa mediante el movimiento corporal la vida de la oruga.","Espera turnos en juegos grupales."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Preparar el cuento motor.",
            pasos:["Explicar el cuento motor de la oruga.","Espacio amplio y libre del aula.","Reglas: caminamos, no corremos."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Dramatizar con el cuerpo.",
            pasos:["Ser el huevo: agachados y muy quietos.","Nacer y ser oruga: gatear lento y comer.","Ser la oruga grande: estirar y gatear más rápido."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Crear la oruga grupal.",
            pasos:["Formar una 'oruga humana' tomados de la cintura.","Caminar juntos sin soltarse.","Girar y volver al punto de partida."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Relajación final.",
            pasos:["Respirar como mariposa: lento y suave.","Estirar 'alas' y brazos.","Canción relajante de despedida."] }
        ],
        recursos:["🎵 Música suave","🏟️ Espacio amplio del aula"],
        orientacion:"Dramatizar es evaluar: observar quién comprende la secuencia del ciclo mientras se mueve." }
    ]},
    { numero:3, tema:"Crisálida y metamorfosis", fechas:"14 – 18 sep", dias: [
      { id:"2026-09-14", etiqueta:"Lunes 14", titulo:"La oruga hace su capullo",
        desempenos:["Identifica la crisálida como etapa del ciclo.","Expresa paciencia y espera en actividades."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Introducir la etapa de crisálida.",
            pasos:["Cuento: la oruga está cansada y teje su casa.","Mostrar imágenes reales de crisálidas."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Comprender qué es la crisálida.",
            pasos:["Explicar: la oruga se envuelve y descansa.","Observar el 'capullo' de papel del aula (colgarlo).","Preguntar: ¿qué pasará adentro?"] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Representar la crisálida.",
            pasos:["Con papel crepé, envolver una 'crisálida' grupal.","Cada niño pinta su capullo en papel.","Colgar las crisálidas del techo o mural."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Juego de espera.",
            pasos:["Jugar a ser crisálidas: quietos como estatuas.","Contar hasta 10 despacio y 'despertar'.","Canción de la crisálida."] }
        ],
        recursos:["🛖 Capullo de papel","🎨 Papel crepé","🖼️ Imágenes de crisálidas"],
        orientacion:"La crisálida es abstracta para los niños: siempre anclarla a la idea de 'casa para dormir y cambiar'." },
      { id:"2026-09-15", etiqueta:"Martes 15", titulo:"El sueño de la mariposa",
        desempenos:["Imagina y expresa qué pasa dentro de la crisálida.","Desarrolla la escucha atenta de cuentos."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Crear ambiente de imaginación.",
            pasos:["Música suave y luz baja (si es posible).","Observar las crisálidas colgadas del aula."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Imaginar el cambio interior.",
            pasos:["Narrar: dentro del capullo la oruga sueña que tiene alas.","Cada niño dice qué sueña la oruga.","Registrar las ideas en la pizarra."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Dibujar el sueño.",
            pasos:["Dibujar lo que pasa dentro de la crisálida.","Compartir su dibujo con un compañero.","Colgar los dibujos junto a las crisálidas."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Relajación creativa.",
            pasos:["Cerrar los ojos e imaginar ser la oruga."," Respirar lento tres veces.","Abrir 'alas' despacio al despertar."] }
        ],
        recursos:["🎵 Música relajante","🖍️ Crayones","🛖 Crisálidas del aula"],
        orientacion:"No anticipar el final del ciclo todavía; el misterio de la metamorfosis se revela mañana." },
      { id:"2026-09-16", etiqueta:"Miércoles 16", titulo:"¡Metamorfosis! El gran cambio",
        desempenos:["Explica el cambio de crisálida a mariposa.","Expresa sorpresa y alegría ante el descubrimiento."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Sorpresa del descubrimiento.",
            pasos:["Cantar la canción de la crisálida.","Revisar el capullo grande: ¡se está moviendo!","Descubrir juntos la mariposa que salió."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Comprender la metamorfosis.",
            pasos:["Narrar el cambio: la oruga se convirtió en mariposa.","Mostrar la secuencia con las tarjetas del ciclo.","Nombrar las 4 etapas en orden."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Representar el cambio con el cuerpo.",
            pasos:["Dramatizar: huevo → oruga → crisálida → mariposa.","Volar como mariposas por el aula.","Elegir un compa ñero y mostrarle su etapa favorita."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Verbalizar la secuencia.",
            pasos:["Cada niño nombra las 4 etapas (ayudados por tarjetas).","Canción del ciclo de la mariposa.","Aplausos de mariposas."] }
        ],
        recursos:["🦋 Mariposa sorpresa","🃏 Tarjetas del ciclo","🎵 Canción del ciclo"],
        orientacion:"Día clave de la unidad: celebrar el descubrimiento y reforzar el orden de las etapas con las tarjetas." },
      { id:"2026-09-17", etiqueta:"Jueves 17", titulo:"El ciclo de vida en secuencia",
        desempenos:["Ordena las 4 etapas del ciclo de la mariposa.","Trabaja en equipo respetando turnos."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Repasar las etapas.",
            pasos:["Juego rápido con las tarjetas: nombro la etapa.","Canción del ciclo."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Ordenar el ciclo.",
            pasos:["Entregar sets de 4 tarjetas por grupo.","Explicar: ordenar de huevo a mariposa.","Verificar cada grupo y corregir jugando."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Armar el ciclo en el mural.",
            pasos:["Cada grupo pega su secuencia en el mural del ciclo.","Contar las etapas en voz alta.","Nombrar la etapa favorita de cada niño."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Juego de memoria.",
            pasos:["Esconder una tarjeta y adivinar cuál falta.","Repaso coral de las 4 etapas.","Guardar materiales."] }
        ],
        recursos:["🃏 Sets de tarjetas del ciclo","🧱 Mural del aula"],
        orientacion:"El mural del ciclo será la evidencia central de la unidad: cuidar que quede completo y visible." },
      { id:"2026-09-18", etiqueta:"Viernes 18", titulo:"Cantamos y rimamos el ciclo",
        desempenos:["Memoriza la secuencia del ciclo mediante rimas.","Participa en expresión musical grupal."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Recordar con la rima.",
            pasos:["Enseñar la rima del ciclo (creada en el aula).","Repetirla con palmas: 'Huevo, oruga, capullo y mariposa'."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Cantar con instrumentos.",
            pasos:["Entregar instrumentos sencillos (panderetas, palitos).","Cantar la rima con el ritmo de los instrumentos.","Acompañar con gestos de cada etapa."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Presentar la canción.",
            pasos:["Ensayar en dos grupos.","Cada grupo presenta su versión del ciclo cantado.","Aplausos mutuos."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Cierre musical.",
            pasos:["Cantar todos juntos la versión final.","Grabar o presentar a otra aula (si es posible).","Canción de despedida."] }
        ],
        recursos:["🥁 Panderetas y palitos","🎵 Rima del ciclo","🎤 Espacio de presentación"],
        orientacion:"La repetición cantada consolida la secuencia: los niños que aún no verbalizan suelen poder cantarla." }
    ]},
    { numero:4, tema:"Mariposas al vuelo", fechas:"21 – 25 sep", dias: [
      { id:"2026-09-21", etiqueta:"Lunes 21", titulo:"¡La mariposa sale de su casa!",
        desempenos:["Describe cómo la mariposa sale de la crisálida.","Expresa el proceso con movimiento."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Recordar la metamorfosis.",
            pasos:["Repasar el mural del ciclo.","Preguntar: ¿cómo saldrá la mariposa?"] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Observar la salida de la mariposa.",
            pasos:["Narrar: la crisálida se rompe y la mariposa estira sus alas.","Mostrar imágenes/video corto de una mariposa saliendo.","Explicar que primero debe secar sus alas para volar."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Dramatizar el primer vuelo.",
            pasos:["Ser la mariposa saliendo: lento y despacio.","Estirar alas (brazos) y esperar a que sequen.","Primer vuelo suave por el aula."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Vocabulario del vuelo.",
            pasos:["Palabras nuevas: volar, aletear, secar.","Canción 'Vuela la mariposa'.","Guardar materiales."] }
        ],
        recursos:["🖼️ Imágenes/video de metamorfosis","🎵 Canción del vuelo"],
        orientacion:"El vuelo lento y controlado también desarrolla motricidad gruesa: valorar cada movimiento." },
      { id:"2026-09-22", etiqueta:"Martes 22", titulo:"¿Cómo vuelan las mariposas?",
        desempenos:["Experimenta cómo el aire mueve objetos livianos.","Formula ideas a partir de la observación."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Pregunta de indagación.",
            pasos:["Preguntar: ¿cómo hace la mariposa para volar?","Soplar una mariposa de papel: ¡se mueve!"] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Experimentar con el aire.",
            pasos:["Cada niño hace volar su mariposa de papel soplando.","Observar: ¿sube? ¿cae? ¿a dónde va?","Conversar sobre el aire que aunque no se ve, mueve cosas."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Vuelo dirigido.",
            pasos:["Soplar la mariposa hacia un objetivo (canasto).","Contar cuántas llegan.","Comparar resultados entre compañeros."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Concluir el experimento.",
            pasos:["Concluir: el aire mueve cosas livianas.","Imitar el aleteo rápido con los brazos.","Canción de despedida."] }
        ],
        recursos:["🦋 Mariposas de papel liviano","🧺 Canastos objetivo"],
        orientacion:"Experimento MINERD clave: dejar que el error ocurra; la mariposa que no vuela también enseña." },
      { id:"2026-09-23", etiqueta:"Miércoles 23", titulo:"El jardín de las mariposas (proyecto)",
        desempenos:["Participa en un proyecto grupal","Aporta ideas para el trabajo colectivo."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Presentar el proyecto del jardín.",
            pasos:["Anunciar el proyecto: crear el jardín de las mariposas.","Conversar qué necesita un jardín: flores, hojas, sol, agua."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Planificar el jardín.",
            pasos:["Listar en la pizarra lo que tendrá el jardín.","Asignar tareas: flores de papel, hojas, mariposas.","Recordar el trabajo en equipo y los turnos."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Construir el jardín.",
            pasos:["Decorar el mural/pared con flores y hojas.","Pegar las mariposas que cada uno hizo.","Nombrar el jardín en grupo."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Celebrar el logro.",
            pasos:["Contemplar el jardín terminado.","Foto grupal frente al jardín.","Canción de celebración."] }
        ],
        recursos:["🌸 Flores de papel","🎨 Colores y pegamento","📷 Cámara del docente"],
        orientacion:"Proyecto de convivencia: cada aporte es necesario; ningún trabajo queda fuera del jardín." },
      { id:"2026-09-24", etiqueta:"Jueves 24", titulo:"Mariposas por parejas: similitudes y diferencias",
        desempenos:["Compara mariposas: similitudes y diferencias.","Describe atributos: color, tamaño, forma de alas."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Juego de observación.",
            pasos:["Mostrar dos mariposas de papel diferentes.","Preguntar: ¿en qué se parecen? ¿en qué son distintas?"] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Comparar en parejas.",
            pasos:["Cada pareja recibe 2 mariposas distintas.","Comparar: color, tamaño, puntos de las alas.","Cada pareja presenta una diferencia que encontró."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Juego de parejas de mariposas.",
            pasos:["Esparcir mariposas en el suelo y buscar pares iguales.","Contar cuántos pares encontró cada uno.","Guardar cada par en su canasto."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Resumen comparativo.",
            pasos:["Repasar palabras: igual, distinto, parecido.","Canción del jardín.","Orden del aula."] }
        ],
        recursos:["🦋 Pares de mariposas de papel","🧺 Canastos"],
        orientacion:"Las comparaciones preparan el pensamiento matemático y la atención al detalle." },
      { id:"2026-09-25", etiqueta:"Viernes 25", titulo:"Mi mariposa favorita (creación final)",
        desempenos:["Crea su propia mariposa con materiales variados.","Explica su creación con lenguaje oral."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Inspirar la creación.",
            pasos:["Recordar todo lo aprendido: partes, colores, ciclo.","Mostrar materiales disponibles y ejemplos."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Crear la mariposa propia.",
            pasos:["Cada niño crea su mariposa con los materiales.","El docente pregunta: ¿qué colores usaste? ¿dónde están sus antenas?","Ayudar sin imponer decisiones."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Presentar la obra.",
            pasos:["Cada niño presenta su mariposa al grupo.","Colocar las mariposas en el jardín del aula.","Aplausos por cada presentación."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Reflexión de la semana.",
            pasos:["Conversar: ¿qué fue lo más divertido?","Volar como mariposas felices.","Canción de cierre semanal."] }
        ],
        recursos:["🎨 Témperas, crayones, papel, brillo","🧻 Tubos de papel (cuerpo)","🌟 Materiales reciclados"],
        orientacion:"Creación libre: el producto no importa tanto como el proceso y el lenguaje al describirlo." }
    ]},
    { numero:5, tema:"Cierre de la unidad", fechas:"28 – 30 sep", dias: [
      { id:"2026-09-28", etiqueta:"Lunes 28", titulo:"Repasamos el ciclo con el mural",
        desempenos:["Repasa las 4 etapas del ciclo con apoyo visual.","Responde preguntas sobre la unidad."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Activar el repaso.",
            pasos:["Canción del ciclo con gestos.","Sentarse frente al mural del ciclo."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Repasar cada etapa.",
            pasos:["Señalar cada etapa del mural y nombrarla.","Preguntar: ¿qué pasa primero? ¿y después?","Recordar las clases favoritas de cada etapa."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Juego de repaso grupal.",
            pasos:["Carrera de tarjetas: ordenar el ciclo en equipos.","Gana el equipo que lo ordene bien.","Ayudar a todos a terminar."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Preparar la evaluación.",
            pasos:["Anunciar el juego de estaciones de mañana.","Canción del ciclo.","Guardar materiales."] }
        ],
        recursos:["🧱 Mural del ciclo","🃏 Tarjetas del ciclo"],
        orientacion:"Repaso sin presión: es preparación lúdica, no examen." },
      { id:"2026-09-29", etiqueta:"Martes 29", titulo:"Evaluación lúdica: estaciones del ciclo",
        desempenos:["Demuestra el logro de las competencias de la unidad.","Participa con autonomía en 4 estaciones."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Explicar el circuito.",
            pasos:["Presentar las 4 estaciones: Huevo, Oruga, Crisálida y Mariposa.","Explicar la dinámica: pasan por todas jugando.","Formar grupos pequeños."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Estación Huevo y Oruga.",
            pasos:["Estación Huevo: contar los huevitos en la hoja.","Estación Oruga: alimentar la oruga con las hojas correctas.","Observar y registrar logros por alumno."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Estación Crisálida y Mariposa.",
            pasos:["Estación Crisálida: quietos como estatuas 10 segundos.","Estación Mariposa: volar y clasificar por color.","Registrar logros y celebrar cada avance."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Celebración del logro.",
            pasos:["Reunirse y contar la experiencia.","Sello o calcomanía de mariposa para cada niño.","Canción de celebración."] }
        ],
        recursos:["🃏 Material de las 4 estaciones","🏅 Sellos o calcomanías","📋 Registro de evaluación"],
        orientacion:"Registrar en la pestaña Evaluación de esta clase el logro de cada alumno: es la evidencia del trimestre." },
      { id:"2026-09-30", etiqueta:"Miércoles 30", titulo:"Fiesta de las mariposas 🎉",
        desempenos:["Socializa lo aprendido con otros.","Expresa alegría y pertenencia al grupo."],
        momentos:[
          { nombre:"Inicio", icono:"✨", duracion:"15 min", proposito:"Preparar la fiesta.",
            pasos:["Decorar el aula con las mariposas creadas.","Poner música alegre.","Elegir la canción favorita del mes."] },
          { nombre:"Desarrollo", icono:"📖", duracion:"20 min", proposito:"Celebrar el aprendizaje.",
            pasos:["Cantar todas las canciones de la unidad.","Dramatizar el ciclo completo una última vez.","Recorrer el jardín de las mariposas."] },
          { nombre:"Práctica", icono:"🎨", duracion:"15 min", proposito:"Compartir con invitados.",
            pasos:["Invitar a otra aula o a la dirección a ver el mural.","Cada niño dice algo que aprendió.","Foto grupal de la unidad."] },
          { nombre:"Cierre", icono:"🌈", duracion:"10 min", proposito:"Despedida de la unidad.",
            pasos:["Aplauso general de mariposas.","Anunciar el próximo tema: Mi cuerpo y mis sentidos.","Canción de despedida."] }
        ],
        recursos:["🎈 Decoración del aula","🎵 Música de fiesta","📷 Cámara"],
        orientacion:"Día de socialización: observar y registrar observaciones generales del grupo en la nota del día." }
    ]}
  ]
};


/* ---------- ESTADO LOCAL ---------- */
const LS_KEY = "plan_docente_rd_v5";
const LS_VIEJO = "plan_docente_rd_v4";
const LS_VIEJO2 = "plan_docente_rd_v2";
function estadoDefault(){
  return {
    docente:{ id:"",codigo:"",nombre:"",colegio:"",distrito:"",nivel:"Inicial",grado:"",seccion:"A",asignaturasSel:[],secciones:[],gradosSecciones:[],alumnosPorSeccion:{},foto:"",jornada:"",duracionMin:0,duracionOn:true,alumnos:24,periodo:"1er periodo",recursos:[],estGuarda:null,estrategias:{} },
    asistencia:{}, evaluacion:{}, evalsCom:{}, evalsEvid:{}, tiempoClase:{}, puntos:{}, crono:{}, obs:{}, calificaciones:{}, libreta:{},
    cola:[], lastSync:null, planesCache:{}, listaPlanes:null,
    notificaciones:[], vistosPlanes:0,
    ui:{ progTab:"progreso", progGrado:null, progSec:null, libGrado:null, libSec:null, libTrim:"1er periodo", libFecha:null, histFiltro:String(periodoDeMes(parseInt(HOY.slice(5,7)))) },
    puntosMigrados: true,
  };
}
function normalizar(d){
  const def = estadoDefault();
  const doc = Object.assign({}, def.docente, d.docente||{});
  if(!Array.isArray(doc.recursos)) doc.recursos = [];
  if(!Array.isArray(doc.gradosSecciones) || !doc.gradosSecciones.length){
    const base = doc.grado || "";
    const secs = (Array.isArray(doc.secciones) && doc.secciones.length)? doc.secciones
      : (doc.seccion? [doc.seccion] : ["A"]);
    doc.gradosSecciones = secs.map(s=>base+"|"+s).filter(x=>x!=="|");
    if(!doc.gradosSecciones.length) doc.gradosSecciones = ["|A"];
  }
  const aps = doc.alumnosPorSeccion || {};
  doc.gradosSecciones.forEach(gs=>{
    const sec = gs.split("|")[1];
    if(aps[gs]===undefined && aps[sec]!==undefined) aps[gs] = aps[sec];
  });
  doc.alumnosPorSeccion = aps;
  const MAPA_PERIODO = { "1er Trimestre":"1er periodo", "2do Trimestre":"2do periodo", "3er Trimestre":"3er periodo" };
  if(MAPA_PERIODO[doc.periodo]) doc.periodo = MAPA_PERIODO[doc.periodo];
  if(typeof doc.asignaturas === "string") doc.asignaturasSel = doc.asignaturas? doc.asignaturas.split(/,\s*/).filter(Boolean) : [];
  if(!Array.isArray(doc.asignaturasSel)) doc.asignaturasSel = Array.isArray(doc.asignaturas)? doc.asignaturas : [];
  if(typeof doc.secciones === "string") doc.secciones = doc.secciones? doc.secciones.split(/,\s*/).filter(Boolean) : [];
  if(!Array.isArray(doc.secciones)) doc.secciones = [];
  return {
    docente: doc,
    asistencia: d.asistencia||{}, evaluacion: d.evaluacion||{}, obs: d.obs||{},
    calificaciones: d.calificaciones||{}, libreta: d.libreta||{},
    tiempoClase: d.tiempoClase||{}, crono: d.crono||{},
    cola: d.cola||[], lastSync: d.lastSync||null,
    planesCache: d.planesCache||{}, listaPlanes: d.listaPlanes||null,
    notificaciones: d.notificaciones||[], vistosPlanes: d.vistosPlanes||0,
    ui: Object.assign({}, def.ui, d.ui||{}),
    puntosMigrados: true,
    puntos: migrarPuntos(d),
  };
}
function migrarPuntos(d){
  const puntos = d.puntos && typeof d.puntos==="object"? d.puntos : {};
  Object.keys(puntos).forEach(g=>{ const gs = puntos[g]||{};
    Object.keys(gs).forEach(n=>{ if(Array.isArray(gs[n])) gs[n].forEach(x=>{ if(!x.asig) x.asig = "General"; }); }); });
  if(d.puntosMigrados) return puntos;
  const fechasTrim = { "1er Trimestre":"2026-10-31", "2do Trimestre":"2027-01-29", "3er Trimestre":"2027-04-30" };
  const gruposF = (mapa)=>{ const out = [];
    if(!mapa || typeof mapa!=="object") return out;
    Object.keys(mapa).forEach(t=>{ const gs = mapa[t]||{};
      Object.keys(gs).forEach(k=>{ const als = gs[k]||{};
        Object.keys(als).forEach(n=>{ out.push({ grupo:k, n:+n, trim:t, v:als[n] }); }); }); });
    return out; };
  const sembrar = (regs, fuente)=>{
    regs.forEach(o=>{
      if(!o.v) return;
      if(!puntos[o.grupo]) puntos[o.grupo] = {};
      const arr = Array.isArray(puntos[o.grupo][o.n])? puntos[o.grupo][o.n] : (puntos[o.grupo][o.n] = []);
      const fecha = fechasTrim[o.trim] || HOY;
      [["P",o.v.p],["T",o.v.t],["E",o.v.e]].forEach(([tipo,val])=>{
        if(val!==undefined && val!==null && !arr.some(x=>x.f===fecha && x.tipo===tipo)){
          arr.push({ f:fecha, tipo, pts:+val||0, com:"Migrado de "+fuente });
        }
      });
      arr.sort((a,b)=> a.f<b.f? 1 : -1);
    });
  };
  sembrar(gruposF(d.libreta), "libreta");
  sembrar(gruposF(d.calificaciones), "progreso");
  return puntos;
}
function cargarEstado(){
  try{ const d = JSON.parse(localStorage.getItem(LS_KEY)); if(d && d.docente) return normalizar(d); }catch(e){}
  try{ const d = JSON.parse(localStorage.getItem(LS_VIEJO)); if(d && d.docente && d.docente.id) return normalizar(d); }catch(e){}
  try{ const d = JSON.parse(localStorage.getItem(LS_VIEJO2)); if(d && d.docente && d.docente.id) return normalizar(d); }catch(e){}
  return estadoDefault();
}
let S = cargarEstado();
/* ---------- ALMACENAMIENTO: IndexedDB (principal, gran capacidad) + localStorage (respaldo) ---------- */
const IDB_NOMBRE = "planapp-v1", IDB_STORE = "estado";
function idbAbrir(){
  return new Promise((res, rej)=>{
    const r = indexedDB.open(IDB_NOMBRE, 1);
    r.onupgradeneeded = ()=>{ r.result.createObjectStore(IDB_STORE); };
    r.onsuccess = ()=> res(r.result);
    r.onerror = ()=> rej(r.error);
  });
}
async function idbGuardar(obj){
  try{
    const db = await idbAbrir();
    await new Promise((res, rej)=>{
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(obj, "S");
      tx.oncomplete = ()=> res(true);
      tx.onerror = ()=> rej(tx.error);
    });
    return true;
  }catch(e){ return false; }
}
async function idbCargar(){
  try{
    const db = await idbAbrir();
    return await new Promise((res)=>{
      const tx = db.transaction(IDB_STORE, "readonly");
      const rq = tx.objectStore(IDB_STORE).get("S");
      rq.onsuccess = ()=> res(rq.result || null);
      rq.onerror = ()=> res(null);
    });
  }catch(e){ return null; }
}
function guardar(){
  try{ localStorage.setItem(LS_KEY, JSON.stringify({...S, planesCache:{}})); }catch(e){}
  idbGuardar(S);
  programarSyncEstado();
}
const CLAVES_SYNC = ["docente","ui","asistencia","evaluacion","evalsCom","evalsEvid","puntos","crono","tiempoClase","obs","calificaciones","libreta","notificaciones","vistosPlanes","lastSync"];
let _syncT = null;
function programarSyncEstado(){
  if(!S.docente.id || !S.docente.codigo) return;
  clearTimeout(_syncT); _syncT = setTimeout(syncEstado, 2500);
}
async function syncEstado(){
  if(!S.docente.codigo) return;
  try{
    const o = {};
    CLAVES_SYNC.forEach(k=>{ o[k] = S[k]; });
    await apiAccion("guardar-estado", { codigo: S.docente.codigo, estado: JSON.stringify(o) });
    S.lastSync = new Date().toISOString();
  }catch(e){ }
}
/* Sync bidireccional en tiempo real:
   - Con internet: cada registro se envía a la base de datos al instante (syncAhora).
   - Sin internet: todo queda guardado local (guardar) y al volver la conexión se sincroniza solo.
   - Cada 25s se consulta la base de datos para traer planes nuevos generados por el agente. */
function syncAhora(){ syncEstado(); flush(); }
window.addEventListener("online", ()=>{
  if(S && S.docente && S.docente.codigo){
    syncEstado(); flush();
    cargarPlanes().then(()=>{ generarNotificaciones(); if(pantallaActual==="diaria"){ abrirPlanEnCurso().then(()=>{ if(pantallaActual==="diaria") renderDiaria(); }); } else if(pantallaActual==="mes") renderMes(); });
  }
});
setInterval(()=>{
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
    cargarPlanes().then(()=>{ if(pantallaActual!=="diaria") return; const antes = firmaDiaria(); abrirPlanEnCurso().then(()=>{ if(pantallaActual==="diaria" && firmaDiaria()!==antes) renderDiaria(); }); });
  }catch(e){ }
}, 25000);

/* ---------- API ---------- */
async function apiAccion(accion, datos){
  const r = await fetch(APP_URL, { method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ accion, ...datos }) });
  return await r.json();
}
async function cargarPlanes(){
  try{
    const r = await apiAccion("planes", { nivel: S.docente.nivel, docente_id: S.docente.id });
    if(r.success) S.listaPlanes = (r.planes||[]).filter(planParaDocente);
  }catch(e){ /* offline */ }
  guardar();
}

/* ---------- UTILIDADES ---------- */
function esc(s){ return String(s||"").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function $(id){ return document.getElementById(id); }
function toast(msg){
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(window._toastT); window._toastT = setTimeout(()=>t.classList.remove("show"), 2600);
}
function ring(pct, size, stroke, color, label){
  pct = Math.max(0, Math.min(100, pct||0));
  const r=(size-stroke)/2, c=2*Math.PI*r, off=c*(1-pct/100);
  const txt = label!==undefined? label : Math.round(pct)+"%";
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(0,51,160,.12)" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 ${size/2} ${size/2})"/>
    <text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle" font-size="${Math.round(size/4)}" font-weight="800" fill="${color}">${esc(txt)}</text>
  </svg>`;
}
function planActivo(){
  const ids = Object.keys(S.planesCache);
  if(ids.length) return S.planesCache[ids[ids.length-1]];
  return { titulo:"Sin plan activo", mes:"", tema:"", nivel:S.docente.nivel, descripcion:"", competencias:[], areas:[], semanas:[] };
  return { titulo:"Sin plan activo", mes:"", tema:"", nivel:S.docente.nivel, descripcion:"", competencias:[], areas:[], semanas:[] };
}
async function obtenerPlan(id, forzar){
  if(!id || id==="local-mariposa") return PLAN_MARIPOSA;
  if(id.startsWith("der-")) return unidadDerivada(...id.slice(4).split("-"));
  if(S.planesCache[id] && !forzar) return S.planesCache[id];
  try{
    const r = await apiAccion("plan", { id });
    if(r.success){ S.planesCache[id] = r.plan; guardar(); return r.plan; }
  }catch(e){}
  return null;
}
function todasClases(plan){ const arr=[]; (plan.semanas||[]).forEach(s=>(s.dias||[]).forEach(d=>arr.push(d))); return arr; }
function clasePorId(plan, id){ return todasClases(plan).find(d=>d.id===id); }
function pctDia(claseId, tipo){
  const N = alumnosDe(grupoReg().s, grupoReg().g);
  const mapa = tipo==="asis"? S.asistencia : S.evaluacion;
  const reg = mapa[claseId]||{};
  let n=0;
  for(let i=1;i<=N;i++){
    if(tipo==="asis"){ if(reg[i]==="Presente"||reg[i]==="Tarde") n++; }
    else if(reg[i]==="Logrado") n++;
  }
  return Math.round(n*100/N);
}
function pctMes(plan, tipo){
  const clases = todasClases(plan).filter(d=>{ const m=(tipo==="asis"?S.asistencia:S.evaluacion)[d.id]; return m&&Object.keys(m).length; });
  if(!clases.length) return 0;
  let sum=0; clases.forEach(c=>sum+=pctDia(c.id,tipo));
  return Math.round(sum/clases.length);
}
function parseMes(txt){
  const m = String(txt||"").match(/(\w+)\s+(\d{4})/);
  if(!m) return null;
  const idx = MESES_ES.findIndex(x=> x.toLowerCase() === m[1].toLowerCase());
  return idx>=0? m[2]+"-"+String(idx+1).padStart(2,"0") : null;
}
function avanceAnual(){
  const mesesConReg = new Set();
  Object.keys(S.asistencia).forEach(f=>{ if(/^\d{4}-\d{2}-\d{2}$/.test(f)) mesesConReg.add(f.slice(0,7)); });
  const temas = PLANES_ANUALES[S.docente.nivel].temas;
  let hechas = 0;
  temas.forEach(t=>{ const mes = parseMes(t.mes); if(mes && mesesConReg.has(mes)) hechas++; });
  return Math.round(hechas*100/temas.length);
}
function avanceSemanas(plan){
  const sems = (plan||planActivo()).semanas||[];
  if(!sems.length) return 0;
  let con=0;
  sems.forEach(s=>{ if((s.dias||[]).some(d=>{ const r=S.asistencia[d.id]; return r&&Object.keys(r).length; })) con++; });
  return Math.round(con*100/sems.length);
}
function avanceClases(plan){
  const clases = todasClases(plan||planActivo());
  if(!clases.length) return 0;
  const con = clases.filter(d=>{ const r=S.asistencia[d.id]; return r&&Object.keys(r).length; }).length;
  return Math.round(con*100/clases.length);
}
function semestreDe(mes){
  if(/enero|febrero|marzo|abril|mayo|junio/i.test(mes||"")) return "2do";
  return "1er";
}
function minsDe(txt){
  const m = String(txt||"").match(/(\d+)\s*(min|minuto|hora|h)/i);
  if(!m) return null;
  const v = +m[1];
  return /h/i.test(m[2])? v*60 : v;
}
function notaFinalDe(p,t,e){
  p = Math.max(0,Math.min(100,+p||0)); t = Math.max(0,Math.min(100,+t||0)); e = Math.max(0,Math.min(100,+e||0));
  return Math.round(p*0.3 + t*0.3 + e*0.4);
}
function escalaDe(n){ return n>=90?"L":(n>=70?"EP":"I"); }
function escalaTexto(k){ return k==="L"?"Logrado":(k==="EP"?"En proceso":"Iniciando"); }
function unidadDerivada(nivel, idxStr){
  const idx = parseInt(idxStr);
  const A = ANUAL_MINERD[nivel];
  const m = PLANES_ANUALES[nivel].temas[idx];
  if(!m) return null;
  const s = A.situacion(m);
  const ym = parseMes(m.mes);
  const perPlan = ym? PERIODOS[periodoDeMes(parseInt(ym.slice(5,7)))-1] : S.docente.periodo;
  const asigPlan = (S.docente.asignaturasSel||[])[0] || "—";
  const est = estrategiaDe((S.docente.grado||"")+"|"+(S.docente.seccion||"A"), asigPlan, perPlan);
  if(est) s.estrategia = est;
  return {
    tipo:"derivado", id:"der-"+nivel+"-"+idx, nivel,
    estrategia: est || "Unidad de Aprendizaje",
    titulo: m.tema, mes: m.mes, trimestre: m.trimestre, tema: m.tema,
    enfoque: m.enfoque, evaluacion: m.evaluacion,
    eje: A.ejes[idx % A.ejes.length],
    contenidos: { conceptuales: (m.contenidos||"").split(" · ").filter(Boolean), procedimentales: A.procContenidos, actitudinales: A.actContenidos },
    indicadores: A.indicadores,
    competencias: COMPETENCIAS.slice(0,4), compEsp: A.compEspecificas,
    situacion: s,
    estrategias: A.estrategias,
    tecnicas: A.tecnicas,
    recursosFis: A.recursosFis, recursosDig: A.recursosDig,
    duracion: "4 semanas (aprox. 20 horas pedagógicas)",
    semanas: SEMANAS_PLANTILLA.map(w=>({ numero:w.semana, tema:"Semana "+w.semana+" · "+m.tema, inicio:w.inicio, desarrollo:w.desarrollo, cierre:w.cierre })),
  };
}
function alumnosDe(sec, grado){
  const aps = S.docente.alumnosPorSeccion||{};
  const s = sec || S.docente.seccion || "A";
  const g = (grado!==undefined && grado!==null && grado!=="")? grado : (S.docente.grado||"");
  const n = parseInt(aps[g+"|"+s]);
  if(n>0) return n;
  if((S.docente.gradosSecciones||[]).length) return 0;
  const n2 = parseInt(aps[s]);
  return (n2>0)? n2 : (S.docente.alumnos||24);
}
function diasDuracionPlan(plan){
  const ids = todasClases(plan||{}).map(d=>d.id).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)).sort();
  if(!ids.length) return (plan&&plan.semanas||[]).length*5 || 0;
  return diffDias(ids[0], ids[ids.length-1])+1;
}
/* ---------- EFEMÉRIDES Y VALORES (calendario escolar RD 2026-2027) ---------- */
const EFEMERIDES_RD = {
  "08": { lema:"Inicio del año escolar · Restauración de la República", valor:"Perseverancia", lista:["16: Día de la Restauración de la República","Agosto: acogida, adaptación y planificación docente"] },
  "09": { lema:"Mes de la Integración escolar", valor:"Fraternidad", lista:["8: Día Mundial de la Alfabetización","21: Día Internacional de la Paz","24: Nuestra Señora de las Mercedes"] },
  "10": { lema:"Mes de la Canción Escolar · Mes de la Alimentación Saludable", valor:"Identidad y autocuidado", lista:["5: Día Mundial del Docente","12: Día de la Hispanidad","16: Día Mundial de la Alimentación","Octubre (Inicial): Me reconozco como persona: mi nombre, mi cuerpo y mi identidad"] },
  "11": { lema:"Mes de la Familia · Mes del Buen Trato", valor:"Solidaridad y buen trato", lista:["9: Día de la Constitución (trasladado del 6)","20: Día Universal del Niño y la Niña","25: Día Internacional de la Eliminación de la Violencia contra la Mujer"] },
  "12": { lema:"Mes de la Navidad y la solidaridad", valor:"Generosidad", lista:["10: Día de los Derechos Humanos","25: Día de Navidad","18 dic – 6 ene: Vacaciones navideñas"] },
  "01": { lema:"Mes de la Patria y del gentilicio", valor:"Patriotismo", lista:["1: Año Nuevo","26: Natalicio de Juan Pablo Duarte","4: Día de Reyes (trasladado)"] },
  "02": { lema:"Mes de la Patria", valor:"Patriotismo", lista:["14: Día de la Amistad y el Amor","27: Día de la Independencia Nacional"] },
  "03": { lema:"Mes de la mujer y la equidad", valor:"Equidad y respeto", lista:["8: Día Internacional de la Mujer","21: Día Mundial de la Poesía","30: Día Nacional del Suelo y el Agua"] },
  "04": { lema:"Mes de la salud y la vida", valor:"Cuidado de la vida", lista:["7: Día Mundial de la Salud","22: Día de la Tierra","23: Día Mundial del Libro"] },
  "05": { lema:"Mes del trabajo y la madre dominicana", valor:"Trabajo y gratitud", lista:["1: Día del Trabajo","17: Día del Agricultor","Último domingo: Día de las Madres"] },
  "06": { lema:"Cierre del año escolar", valor:"Responsabilidad", lista:["5: Día Mundial del Medio Ambiente","Junio: cierre, recuperación y transición del año escolar"] }
};
function mesNumDe(txt){
  const t = String(txt||"").toLowerCase();
  const M = {enero:"01",febrero:"02",marzo:"03",abril:"04",mayo:"05",junio:"06",julio:"07",agosto:"08",septiembre:"09",octubre:"10",noviembre:"11",diciembre:"12"};
  for(const k in M){ if(t.includes(k)) return M[k]; }
  const m = t.match(/(\d{4})-(\d{2})/);
  return m? m[2] : "";
}
function efemeridesDeMes(txt){
  const e = EFEMERIDES_RD[mesNumDe(txt)];
  return e || null;
}
function efemerideDe(fecha){
  const num = String(fecha||"").slice(5,7);
  const e = EFEMERIDES_RD[num];
  if(!e) return null;
  const d = String(fecha||"").slice(8,10);
  const hit = (e.lista||[]).find(x=>String(parseInt(x.split(":")[0],10))===String(parseInt(d,10)));
  return hit? (hit.split(": ").slice(1).join(": ")||hit.split(":").slice(1).join(":")) : null;
}
function tablaEfemeridesAnual(){
  const orden = ["08","09","10","11","12","01","02","03","04","05","06"];
  const nombres = {"08":"Agosto","09":"Septiembre","10":"Octubre","11":"Noviembre","12":"Diciembre","01":"Enero","02":"Febrero","03":"Marzo","04":"Abril","05":"Mayo","06":"Junio"};
  return `<p class="mg-nota">Las conmemoraciones del calendario escolar ordenan los valores del año: nacen aquí, dan contexto en el plan mensual y se ejecutan en los momentos de la clase diaria.</p>` +
    orden.map(mn=>{
      const e = EFEMERIDES_RD[mn]; if(!e) return "";
      return `<div class="stat-row"><span><b>${nombres[mn]}</b> · ${esc(e.lema)}</span><b>${esc(e.valor)}</b></div>
        <div class="g-chips" style="margin:4px 0 12px">${(e.lista||[]).map(x=>`<span class="chip chip-mini">${esc(x)}</span>`).join("")}</div>`;
    }).join("");
}
function estadoMes(mesTxt){
  const m = parseMes(mesTxt);
  if(!m) return { k:"pend", t:"Pendiente" };
  const actual = HOY.slice(0,7);
  if(m < actual) return { k:"fin", t:"Terminado" };
  if(m === actual) return { k:"curso", t:"En curso" };
  const dt = new Date(HOY+"T12:00"); dt.setMonth(dt.getMonth()+1);
  const sig = dt.toISOString().slice(0,7);
  if(m === sig) return { k:"prox", t:"Próximo" };
  return { k:"pend", t:"Pendiente" };
}
const DIAS_SEMANA = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
function lunesActual(){ const h=new Date(HOY+"T12:00"); const l=new Date(h); l.setDate(h.getDate()-((h.getDay()+6)%7)); return l; }
function isoDe(d){ return d.toISOString().slice(0,10); }
function generarDiasDerivados(u){
  const lunes = lunesActual();
  const base = +S.docente.duracionMin || 45;
  const dIni = Math.max(5, Math.round(base*0.15)), dDes = Math.max(10, Math.round(base*0.65)), dCie = Math.max(5, Math.round(base*0.20));
  const conceptos = u.contenidos.conceptuales.length? u.contenidos.conceptuales : [u.tema];
  const dias = [];
  for(let i=0;i<5;i++){
    const f = new Date(lunes); f.setDate(lunes.getDate()+i);
    const c = conceptos[i % conceptos.length];
    dias.push({
      id: isoDe(f),
      etiqueta: DIAS_SEMANA[f.getDay()]+" "+f.getDate(),
      titulo: u.tema+" · "+c,
      desempenos: [ u.indicadores[i % u.indicadores.length], "Aplica lo aprendido sobre "+c.toLowerCase() ],
      momentos: [
        { nombre:"Inicio", duracion:"~"+dIni+" min", proposito:"Saludo, pase de lista y recuperación de saberes previos",
          pasos:[ "Saludo, bienvenida y pase de lista", "Retroalimentación breve de la clase anterior", "Preguntas problematizadoras: ¿Qué sabemos sobre "+c.toLowerCase()+"?" ] },
        { nombre:"Desarrollo", duracion:"~"+dDes+" min", proposito:"Construcción del concepto y actividades prácticas del día",
          pasos:[ "Presentación y construcción del contenido: "+c, "Actividad práctica y trabajo colaborativo", "Acompañamiento y retroalimentación durante la tarea" ] },
        { nombre:"Cierre", duracion:"~"+dCie+" min", proposito:"Cierre pedagógico y metacognición",
          pasos:[ "¿Qué aprendimos hoy?", "¿Cómo lo hicimos?", "¿Para qué nos sirve lo aprendido?" ] },
      ],
      recursos: ["Libro de texto","Pizarra y marcadores","Recursos del entorno","Material del aula"],
    });
  }
  return dias;
}
function planDiarioFirma(){
  const p = planDiario().plan;
  return (p.titulo||"")+"|"+((p.semanas||[]).map(s=>(s.dias||[]).map(d=>d.id).join(",")).join(";"));
}
function firmaDiaria(){
  return JSON.stringify((S.listaPlanes||[]).map(x=>x.id))+ "|" + planDiarioFirma();
}
function planDiario(){
  const ym = HOY.slice(0,7);
  let plan = null;
  const cand = (S.listaPlanes||[]).find(p=>parseMes(p.mes)===ym && !esAnualPlan(p));
  if(cand && S.planesCache[cand.id] && (S.planesCache[cand.id].semanas||[]).length) plan = S.planesCache[cand.id];
  if(!plan){
    const activo = planActivo();
    if(activo && parseMes(activo.mes||"")===ym && (activo.semanas||[]).length) plan = activo;
  }
  if(!plan){
    return { plan:{ titulo:"Sin plan del mes en curso", mes:"", tema:"", nivel:S.docente.nivel, descripcion:"Pídele a Delega tu plan mensual con clases diarias.", competencias:[], areas:[], semanas:[] }, semana:null, generado:false };
  }
  const lunes = lunesActual(); const domingo = new Date(lunes); domingo.setDate(lunes.getDate()+6);
  const enCurso = (plan.semanas||[]).find(s=>(s.dias||[]).some(d=>{ try{ const f=new Date(d.id+"T12:00"); return f>=lunes && f<=domingo; }catch(e){ return false; } }));
  return { plan, semana: enCurso||null, generado:false };
}

/* ---------- NOTIFICACIONES ---------- */
function actualizarCampana(){
  const n = S.notificaciones.filter(x=>!x.leida).length;
  const b = $("badgeNotif");
  if(b){ b.textContent = n>99? "99+" : String(n); b.classList.toggle("visible", n>0); }
}
function beepNotif(){
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
}
function generarNotificaciones(){
  if(!S.docente.id) return;
  if(S.cola.length) pushNotif("Tienes "+S.cola.length+" registro(s) pendiente(s) de sincronización.","refrescar");
  const claseHoy = todasClases(planActivo()).find(d=>d.id===HOY);
  if(claseHoy){
    const reg = S.asistencia[HOY]||{};
    if(Object.keys(reg).length===0) pushNotif("Recuerda registrar la asistencia de la clase de hoy.","calendario");
  }
  const num = (S.listaPlanes||[]).length;
  if(S.vistosPlanes>0 && num > S.vistosPlanes) pushNotif("Hay planes nuevos disponibles en Planificación Mensual.","plan");
  S.vistosPlanes = num;
  guardar(); actualizarCampana();
}

/* ---------- SINCRONIZACIÓN ---------- */
function metaClase(claseId){
  const esFecha = /^\d{4}-\d{2}-\d{2}$/.test(claseId||"");
  const plan = planActivo();
  const d = esFecha? clasePorId(plan, claseId) : null;
  const nivel = S.docente.nivel || "Inicial";
  return {
    docente_id: S.docente.id || "",
    docente_nombre: S.docente.nombre || "Docente",
    colegio: S.docente.colegio || "",
    distrito: S.docente.distrito || "",
    nivel,
    asignatura: (S.docente.asignaturasSel.length? S.docente.asignaturasSel.join(", ") : nivel) + (plan.tema && plan.tema!=="Sin plan activo"? " · "+plan.tema : ""),
    grado: S.docente.grado || nivel,
    seccion: S.docente.seccion || "A",
    fecha: esFecha? claseId : HOY,
    clase_id: esFecha? claseId : "",
    clase_titulo: esFecha? ((d&&d.etiqueta? d.etiqueta+" · ":"")+(d?d.titulo||"":"")) : ("Calificaciones "+claseId),
    anio_escolar: ANIO_ESCOLAR,
  };
}
function encolar(tipo, claseId, item, texto, grupo){
  if(item){
    const i = S.cola.findIndex(p=>p.tipo===tipo && p.claseId===claseId && p.item && p.item.alumno===item.alumno);
    if(i>=0) S.cola.splice(i,1);
  }
  S.cola.push({ tipo, claseId, item: item||null, texto: texto||null, grupo: grupo||null });
  guardar();
  programarFlush();
}
function programarFlush(){ clearTimeout(window._flushT); window._flushT = setTimeout(flush, 1200); }
async function flush(){
  if(window._flushing || !S.cola.length) return;
  window._flushing = true;
  const pend = S.cola.slice(0, 20);
  const grupos = {};
  pend.forEach(p=>{
    const k = p.tipo+"|"+p.claseId+"|"+((p.grupo&&p.grupo.grado)||"")+"|"+((p.grupo&&p.grupo.seccion)||"");
    if(!grupos[k]) grupos[k] = { tipo:p.tipo, claseId:p.claseId, items:[], texto:null, grupo:p.grupo };
    if(p.tipo==="observacion"){ grupos[k].texto = p.texto; }
    else if(p.item){
      const ex = grupos[k].items.findIndex(x=>x.alumno===p.item.alumno);
      if(ex>=0) grupos[k].items[ex] = p.item; else grupos[k].items.push(p.item);
    }
  });
  let enviados = 0;
  for(const k of Object.keys(grupos)){
    const g = grupos[k];
    const body = { tipo:g.tipo, ...metaClase(g.claseId) };
    if(g.grupo){ body.grado = g.grupo.grado || body.grado; body.seccion = g.grupo.seccion || body.seccion; }
    if(g.tipo==="observacion"){ body.observacion = g.texto||""; }
    else if(g.tipo==="calificaciones"){ body.periodo = g.claseId; body.items = g.items; }
    else { body.items = g.items; }
    try{
      const r = await fetch(SYNC_URL, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
      if(r.ok){ enviados++; }
    }catch(e){ }
  }
  if(enviados>0){
    S.cola = S.cola.slice(pend.length);
    S.lastSync = new Date().toISOString();
    guardar();
  }
  window._flushing = false;
  if(S.cola.length) programarFlush();
  actualizarCampana();
  if($("scr-info").classList.contains("visible")){
    const a = document.activeElement;
    const editando = a && a.tagName && ["INPUT","TEXTAREA","SELECT"].indexOf(a.tagName)>=0;
    const modalAbierto = $("modalHoja") && $("modalHoja").classList.contains("abierta");
    if(!editando && !modalAbierto) renderInfo();
  }
}
document.addEventListener("visibilitychange", ()=>{ if(!document.hidden && S.docente.id){ flush(); generarNotificaciones(); } });

/* ---------- NAVEGACIÓN ---------- */
let navStack = [];
const TITULOS = {
  anio:["PlanApp","Tu plan listo para enseñar"],
  "anio-detalle":["PlanApp","Tu plan listo para enseñar"],
  mes:["PlanApp","Tu plan listo para enseñar"],
  "mes-detalle":["PlanApp","Tu plan listo para enseñar"],
  diaria:["PlanApp","Tu plan listo para enseñar"],
  clase:["PlanApp","Tu plan listo para enseñar"],
  progreso:["PlanApp","Tu plan listo para enseñar"],
  info:["PlanApp","Tu plan listo para enseñar"],
  notificaciones:["PlanApp","Tu plan listo para enseñar"],
  onboarding:["PlanApp","Tu plan listo para enseñar"],
};
function irA(scr, arg){
  if(!navStack.length || navStack[navStack.length-1]!==scr) navStack.push(scr);
  mostrar(scr, arg);
}
function volver(){ navStack.pop(); const prev = navStack.pop() || "mes"; irA(prev); }
function mostrar(scr, arg){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("visible"));
  const el = $("scr-"+scr); if(el) el.classList.add("visible");
  const registrado = !!S.docente.id;
  const esOnb = scr==="onboarding";
  $("nav").classList.toggle("oculto", !registrado || esOnb);
  $("nav").style.display = (!registrado || esOnb)? "none" : "flex";
  $("topbar").style.display = esOnb? "none":"flex";
  document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("sel", b.dataset.scr===scr));
  const esNivel1 = ["anio","mes","diaria","progreso","info"].includes(scr);
  const esDetalle = ["anio-detalle","mes-detalle","clase"].includes(scr);
  const esLimpio = esDetalle || scr==="notificaciones";
  $("btnAtras").classList.toggle("visible", registrado && !esNivel1);
  $("btnGuia").classList.toggle("visible", registrado && esDetalle);
  $("logoTop").style.display = esLimpio? "none":"flex";
  $("ttApp").style.display = esLimpio? "none":"block";
  $("btnCampana").classList.toggle("visible", registrado && !esOnb);
  actualizarCampana();
  actualizarFotoTopbar();
  pantallaActual = scr;
  autoRefresco(scr);
  let [t, s] = TITULOS[scr]||["Planificación Docente",""];
  $("tituloApp").textContent = t; if($("subtituloApp")) $("subtituloApp").textContent = s;
  const bg = $("btnGuia");
  if(bg) bg.style.display = ["anio","anio-detalle","mes","mes-detalle"].includes(scr)? "" : "none";
  const seguro = (fn)=>{ try{ fn(); }catch(e){
    console.error("Error renderizando "+scr, e);
    const el2 = $("scr-"+scr);
    if(el2) el2.innerHTML = `<div class="card"><h2>No se pudo cargar esta pantalla</h2>
      <p class="muted">Ocurrió un error inesperado: ${esc(String(e.message||e))}. Tus datos están a salvo.</p>
      <button class="dl" onclick="location.reload()">Recargar aplicación</button></div>`;
  }};
  if(scr==="onboarding") seguro(()=>renderOnboarding());
  if(scr==="anio") seguro(()=>renderAnio());
  if(scr==="anio-detalle") seguro(()=>renderAnioDetalle(arg));
  if(scr==="mes") seguro(()=>renderMes());
  if(scr==="mes-detalle") seguro(()=>renderMesDetalle(arg));
  if(scr==="diaria") seguro(()=>renderDiaria());
  if(scr==="clase") seguro(()=>renderClase(arg));
  if(scr==="progreso") seguro(()=>renderProgreso());
  if(scr==="notificaciones") seguro(()=>renderNotificaciones());
  if(scr==="info") seguro(()=>renderInfo());
  if(scr==="diaria" && S.docente.id){
    abrirPlanEnCurso().then(ok=>{ if(ok && pantallaActual==="diaria") renderDiaria(); });
  }
  window.scrollTo({top:0});
}
let pantallaActual = null;
let autoRefIv = null;
function autoRefresco(scr){
  if(autoRefIv){ clearInterval(autoRefIv); autoRefIv = null; }
  if(!["anio","mes","diaria"].includes(scr) || !S.docente.id) return;
  autoRefIv = setInterval(async ()=>{
    try{
      if(document.hidden) return;
      const hoja = $("modalHoja");
      if(hoja && hoja.classList.contains("abierta")) return;
      const a = document.activeElement;
      if(a && ["INPUT","TEXTAREA","SELECT"].includes(a.tagName)) return;
      if(pantallaActual !== scr) return;
      await cargarPlanes(); if(pantallaActual!==scr) return;
      const y = window.scrollY||0;
      if(scr==="diaria"){
        const antes = firmaDiaria();
        await abrirPlanEnCurso();
        if(pantallaActual===scr && firmaDiaria()!==antes) renderDiaria();
      }
      else if(scr==="anio") renderAnio();
      else if(scr==="mes") renderMes();
      window.scrollTo(0,y);
    }catch(e){}
  }, 10000);
}

/* ---------- ONBOARDING ---------- */
function renderOnboarding(){
  $("scr-onboarding").innerHTML = `
  <div class="onb-hero">
    ${ic("logo",64,"#fff")}
    <h2>PlanApp</h2>
    <p>Docentes de Inicial, Primaria y Secundaria.<br>Currículo MINERD · La app se adapta a tu nivel.</p>
  </div>
  <div class="card" id="cardLogin">
    <h2>${ic("nota")} Iniciar sesión</h2>
    <p class="muted" style="margin-bottom:10px">Ingresa tu número de WhatsApp y el código que te dimos al registrarte para entrar a tu planificación.</p>
    <label class="lbl">Tu WhatsApp (usuario)</label>
    <input class="inp" id="onbWhatsLogin" type="tel" placeholder="Ej: 809-555-1234" style="text-align:center;letter-spacing:1px;font-weight:800">
    <label class="lbl">Tu código (contraseña)</label>
    <input class="inp" id="onbCodigo" placeholder="Ej: AB3K9Z" style="text-transform:uppercase;letter-spacing:3px;text-align:center;font-weight:800">
    <button class="dl grande" onclick="entrarConCodigo()">Entrar con mi código</button>
    <div class="onb-div"></div>
    <p class="muted" style="text-align:center;margin-bottom:10px">¿Aún no tienes tu cuenta?</p>
    <button class="dl alt" style="width:100%" onclick="mostrarRegistro()">Regístrate Gratis</button>
  </div>
  <div class="card" id="cardRegistro" style="display:none">
    <h2>${ic("usuarios")} Regístrate</h2>
    <label class="lbl">Nombre del colegio o escuela</label>
    <input class="inp" id="onbColegio" list="dlColegios" autocomplete="off" placeholder="Ej: Colegio Reformado la Esperanza">
    <label class="lbl">Tu nombre completo</label>
    <input class="inp" id="onbNombre" placeholder="Ej: María Pérez">
    <div class="grid-2col">
      <div><label class="lbl">Jornada del centro</label>
        <select class="inp" id="onbJornada">
          <option value="" selected disabled>Seleccionar</option>
          <option value="Matutina">Matutina</option>
          <option value="Vespertina">Vespertina</option>
          <option value="Nocturna">Nocturna</option>
          <option value="Jornada Extendida">Jornada Extendida</option>
        </select></div>
      <div><label class="lbl">Nivel que impartes</label>
        <select class="inp" id="onbNivel" onchange="onbNivelChange()">
          <option value="" selected disabled>Seleccionar</option>
          <option value="Inicial">Inicial</option>
          <option value="Primaria">Primaria</option>
          <option value="Secundaria">Secundaria</option>
        </select></div>
    </div>
    <div id="onbSmart"></div>
    <div class="grid-2col">
      <div><label class="lbl">Número de WhatsApp</label>
        <input class="inp" id="onbWhats" type="tel" placeholder="Ej: 809-555-1234" style="text-align:center;letter-spacing:1px"></div>
      <div><label class="lbl">Distrito educativo</label>
        <input class="inp" id="onbDistrito" list="dlDistritos" autocomplete="off" placeholder="Ej: 15-05" style="text-align:center;letter-spacing:1px"></div>
    </div>
    <datalist id="dlColegios"></datalist>
    <datalist id="dlDistritos"></datalist>
    <button class="dl grande" onclick="registrarDocente()">Crear mi cuenta</button>
    <button class="btn-mini" style="width:100%;margin-top:10px" onclick="mostrarLogin()">Ya tengo código · Iniciar sesión</button>
  </div>`;
}
function mostrarRegistro(){
  animIn("cardRegistro");
  cargarSugerencias();
  $("cardLogin").style.display = "none";
  $("cardRegistro").style.display = "";
  $("scr-onboarding").scrollTop = 0;
}
function mostrarLogin(){
  animIn("cardLogin");
  $("cardRegistro").style.display = "none";
  $("cardLogin").style.display = "";
  $("scr-onboarding").scrollTop = 0;
}
function animLogin(nombre, luego){
  const ov = $("loginAnim");
  if(!ov){ luego(); return; }
  $("animNombre").textContent = nombre? "¡Hola, "+nombre+"!" : "Entrando...";
  ov.classList.add("activo");
  setTimeout(()=>{ ov.classList.remove("activo"); luego(); }, 2000);
}
function animIn(id){
  const el = typeof id==="string"? $(id) : id;
  if(!el) return;
  el.classList.remove("anim-in");
  void el.offsetWidth;
  el.classList.add("anim-in");
}
let onbSecsSel = [];
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
    </div>`;
  } else if(nivel==="Primaria"){
    cont.innerHTML = `
    <label class="lbl">Asignatura que impartes</label>
    <select class="inp" id="onbAsigPrim">
      <option value="" selected disabled>Selecciona tu asignatura…</option>
      <option value="Básicas">Asignaturas básicas</option>
      ${ASIG_ESP_PRIM.map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join("")}
    </select>`;
  } else {
    cont.innerHTML = `
    <label class="lbl">Asignatura que impartes</label>
    <select class="inp" id="onbAsigSec">
      <option value="" selected disabled>Selecciona tu asignatura…</option>
      ${(ASIGNATURAS_RD["Secundaria"]||[]).map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join("")}
    </select>`;
  }
  animIn("onbSmart");
}
async function registrarDocente(){
  const colegio = $("onbColegio").value.trim();
  const nombre = $("onbNombre").value.trim();
  const nivel = $("onbNivel").value;
  if(!nivel){ toast("Selecciona el nivel que impartes"); return; }
  const jornada = $("onbJornada").value;
  if(!jornada){ toast("Selecciona la jornada de tu centro"); return; }
  const whatsapp = ($("onbWhats")? $("onbWhats").value.trim() : "");
  if(!colegio || !nombre){ toast("Completa el colegio y tu nombre"); return; }
  if(!whatsapp){ toast("Escribe tu número de WhatsApp"); return; }
  const distrito = ($("onbDistrito")? $("onbDistrito").value.trim() : "");
  let grado = "", especialidad = "", asignaturas = [], seccionesSel = [];
  if(nivel==="Inicial"){
    grado = ($("onbGradoIni")? $("onbGradoIni").value : "") || "";
    if(!grado){ toast("Selecciona el grado que atiendes"); return; }
    seccionesSel = (onbSecsSel||[]).slice().sort();
    if(!seccionesSel.length){ toast("Selecciona al menos una sección (A–F)"); return; }
  } else if(nivel==="Primaria"){
    especialidad = ($("onbAsigPrim")? $("onbAsigPrim").value : "") || "";
    if(!especialidad){ toast("Selecciona tu tipo de docente"); return; }
    if(especialidad==="Básicas") asignaturas = ["Lengua Española","Matemática","Ciencias Sociales","Ciencias de la Naturaleza","Formación Integral Humana y Religiosa"];
    else if(ASIG_ESP_PRIM.includes(especialidad)) asignaturas = [especialidad];
  } else {
    const asig = ($("onbAsigSec")? $("onbAsigSec").value : "") || "";
    if(!asig){ toast("Selecciona la asignatura que impartes"); return; }
    asignaturas = [asig];
  }
  toast("Registrando...");
  try{
    const r = await apiAccion("onboarding", { colegio, nombre, whatsapp, distrito, nivel, grado, seccion: seccionesSel[0]||"", jornada,
      secciones: seccionesSel.join(", "), asignaturas: asignaturas.join(", "), especialidad });
    if(!r.success){ toast("Error: "+(r.error||"intenta de nuevo")); return; }
    const apsIni = {};
    seccionesSel.forEach(s=>{ apsIni[grado+"|"+s] = 24; });
    S.docente = Object.assign({}, S.docente, { id:r.id, codigo:r.codigo, nombre, colegio, distrito, whatsapp, nivel,
      grado, seccion: seccionesSel[0]||"A", jornada, especialidad, asignaturasSel: asignaturas,
      secciones: seccionesSel, gradosSecciones: seccionesSel.map(s=>grado+"|"+s), alumnosPorSeccion: apsIni });
    guardar();
    pushNotif("¡Bienvenida/o a PlanApp! Completa tu perfil en la pantalla Perfil (grados, secciones, alumnos y duración de clase) para que generemos planes personalizados para ti.","perfil");
    await cargarPlanes();
    generarNotificaciones();
    animLogin(nombre.split(" ")[0], ()=>{
      toast("¡Bienvenida/o, "+nombre.split(" ")[0]+"! Tu código: "+r.codigo);
      irA("info");
      toast("Completa tu perfil: tus grados, secciones y asignaturas");
    });
  }catch(e){ toast("Sin conexión. Verifica tu internet e intenta de nuevo."); }
}
async function entrarConCodigo(){
  const codigo = $("onbCodigo").value.trim().toUpperCase();
  const whats = ($("onbWhatsLogin")? $("onbWhatsLogin").value.trim() : "");
  if(!whats){ toast("Escribe tu número de WhatsApp"); return; }
  if(!codigo){ toast("Escribe tu código"); return; }
  try{
    const r = await apiAccion("perfil", { codigo, whatsapp: whats });
    if(!r.success){ toast(r.error || "Datos incorrectos"); return; }
    const p = r.perfil;
    S.docente.id = r.id; S.docente.codigo = r.codigo;
    S.docente.nombre = p.nombre_completo; S.docente.colegio = p.colegio;
    S.docente.distrito = p.distrito; S.docente.whatsapp = p.whatsapp || ""; S.docente.nivel = p.nivel; S.docente.grado = p.grado;
    S.docente.seccion = p.seccion || "A";
    S.docente.jornada = p.jornada || "";
    S.docente.asignaturasSel = (p.asignaturas||"").split(/,\s*/).filter(Boolean);
    S.docente.secciones = (p.secciones||"").split(/,\s*/).filter(Boolean);
    S.docente.duracionMin = +p.duracion_min || 0;
    try{ S.docente.alumnosPorSeccion = JSON.parse(p.alumnos_por_seccion||"{}")||{}; }catch(e){ S.docente.alumnosPorSeccion = {}; }
    const fotoPerfilActual = S.docente.foto||"";
    let remoto = null;
    try{
      const e2 = await apiAccion("cargar-estado", { codigo });
      if(e2.success && e2.estado) remoto = e2.estado;
    }catch(e2){ }
    if(remoto){
      ["asistencia","evaluacion","evalsCom","evalsEvid","puntos","crono","tiempoClase","obs","notificaciones","vistosPlanes","lastSync"].forEach(k=>{
        if(remoto[k]!==undefined) S[k] = remoto[k];
      });
      if(remoto.ui) S.ui = Object.assign({}, S.ui, remoto.ui);
      if(remoto.docente){
        ["foto","recursos","estGuarda","gradosSecciones","alumnosPorSeccion","asignaturasSel","secciones","duracionMin","duracionOn","grado","seccion","jornada","especialidad","alumnos","whatsapp","distrito","periodo"].forEach(k=>{
          const v = remoto.docente[k];
          if(v===undefined || v===null || v==="") return;
          if(Array.isArray(v) && !v.length) return;
          if(k==="gradosSecciones" && !Array.isArray(v)) return;
          if(k==="alumnosPorSeccion" && typeof v!=="object") return;
          if(k==="duracionMin" && !(+v>0)) return;
          S.docente[k] = v;
        });
      }
      if(!S.docente.foto) S.docente.foto = fotoPerfilActual;
    }
    if(!S.ui.progGrado) S.ui.progGrado = S.docente.grado;
    if(!S.ui.progSec) S.ui.progSec = S.docente.seccion;
    guardar();
    await cargarPlanes();
    generarNotificaciones();
    actualizarFotoTopbar();
    animLogin(S.docente.nombre? S.docente.nombre.split(" ")[0] : "", ()=>{
      toast("¡Hola de nuevo, "+S.docente.nombre.split(" ")[0]+"! Datos sincronizados");
      irA("diaria");
    });
  }catch(e){ toast("Sin conexión a internet"); }
}

/* ---------- MODAL GUÍA TÉCNICA ---------- */
let guiaActual = null;
function abrirGuia(){
  if(!guiaActual) return;
  $("modalGuiaTitulo").textContent = guiaActual.titulo;
  $("modalGuiaCuerpo").innerHTML = guiaActual.html;
  $("modalFondo").classList.add("abierto");
  $("modalHoja").classList.add("abierta");
}
function cerrarGuia(){
  $("modalFondo").classList.remove("abierto");
  $("modalHoja").classList.remove("abierta");
}
function guiaAnual(){
  return `
  <p class="g-intro">Tu planificación anual es la hoja de ruta del año escolar: organiza las competencias, contenidos y situaciones de aprendizaje de agosto a junio, en cuatro periodos, según la Adecuación Curricular 2023.</p>
  <h3>Cómo aplicarla paso a paso</h3>
  <div class="g-paso"><b>1. Parte de las competencias</b><span>Lee las competencias fundamentales y las específicas del grado: son el norte de todas tus unidades. Todo lo que planifiques debe movilizarlas.</span></div>
  <div class="g-paso"><b>2. Contextualiza las situaciones</b><span>Adapta el reto y el producto final de cada unidad a la realidad de tus estudiantes y de tu comunidad educativa.</span></div>
  <div class="g-paso"><b>3. Dosifica los contenidos</b><span>Sigue la secuencia mes a mes: cada mes desarrolla un tema con sus contenidos conceptuales, procedimentales y actitudinales.</span></div>
  <div class="g-paso"><b>4. Planifica la evaluación desde el inicio</b><span>Define qué evidencias e instrumentos usarás en cada trimestre antes de comenzar, no al final.</span></div>
  <div class="g-paso"><b>5. Revisa y ajusta cada trimestre</b><span>Al cierre de cada trimestre revisa el avance real (asistencia, logros y calificaciones en la app) y ajusta tiempos y estrategias.</span></div>
  <h3>Sugerencias prácticas</h3>
  <ul class="g-lista">
    <li>Integra los ejes transversales de forma natural, no como temas aislados.</li>
    <li>Usa la app como evidencia: tus registros diarios alimentan la revisión trimestral.</li>
    <li>Descarga el plan anual en Word para entregarlo a coordinación o dirección.</li>
  </ul>`;
}
function guiaMensual(){
  return `
  <p class="g-intro">La unidad de aprendizaje es el puente entre tu plan anual y tu práctica diaria: un tema integrador que se desarrolla en varias semanas a partir de una situación con reto real.</p>
  <h3>Cómo aplicarla paso a paso</h3>
  <div class="g-paso"><b>1. Comprende la situación de aprendizaje</b><span>Lee el escenario, el reto, la estrategia y el producto final: todo lo que hagas en el mes apunta a ese producto.</span></div>
  <div class="g-paso"><b>2. Revisa los componentes curriculares</b><span>Verifica qué competencias, contenidos (conceptuales, procedimentales y actitudinales) e indicadores de logro se movilizan en la unidad.</span></div>
  <div class="g-paso"><b>3. Sigue la secuencia didáctica</b><span>Cada semana avanza del inicio al cierre: exploración de saberes previos, construcción y práctica, y consolidación con el producto final.</span></div>
  <div class="g-paso"><b>4. Registra el avance en la app</b><span>Pasa lista y evalúa logros desde la clase diaria; el progreso de la unidad se calcula automáticamente.</span></div>
  <div class="g-paso"><b>5. Cierra con evaluación auténtica</b><span>Evalúa el producto final con las técnicas e instrumentos del plan (rúbricas, portafolios, listas de cotejo).</span></div>
  <h3>Sugerencias prácticas</h3>
  <ul class="g-lista">
    <li>Si la situación no conecta con tu grupo, adáptala manteniendo la competencia y el indicador.</li>
    <li>Usa el progreso de Clases para detectar días con baja asistencia y reprogramar.</li>
    <li>Pídele a Delega un plan con clases diarias detalladas para esta unidad.</li>
  </ul>`;
}
function guiaClase(){
  return `
  <p class="g-intro">La planificación diaria es el nivel más operativo: aquí movilizas las competencias en una sesión concreta con la secuencia oficial Inicio · Desarrollo · Cierre.</p>
  <h3>Cómo aplicar la clase</h3>
  <div class="g-paso"><b>1. Prepara antes de entrar</b><span>Revisa la intención pedagógica y el indicador de logro, y ten listos los recursos del día.</span></div>
  <div class="g-paso"><b>2. Inicio: recupera saberes previos</b><span>Saludo, pase de lista y preguntas problematizadoras que conecten la clase anterior con la de hoy.</span></div>
  <div class="g-paso"><b>3. Desarrollo: construye y practica</b><span>Es el cuerpo de la clase: los estudiantes interactúan con el contenido y realizan la tarea principal. Usa el temporizador con los minutos reales de cada momento.</span></div>
  <div class="g-paso"><b>4. Cierre: metacognición</b><span>Pregunta qué aprendimos, cómo lo hicimos y para qué nos sirve. Registra la asistencia y los logros desde esta misma pantalla.</span></div>
  <div class="g-paso"><b>5. Deja evidencia</b><span>Escribe la observación del día y descarga los PDFs de asistencia y logros cuando los necesites.</span></div>
  <h3>Sugerencias prácticas</h3>
  <ul class="g-lista">
    <li>El temporizador se adapta a los tiempos de cada momento y a la clase completa.</li>
    <li>El registro del día está contraído: despliégalo solo cuando vayas a marcar.</li>
    <li>Usa las iniciales P (presente), A (ausente) y N (neutral) para marcar más rápido.</li>
  </ul>`;
}

/* ---------- RENDER: AÑO (plan anual del nivel del docente) ---------- */
function renderAnio(){
  const nivel = S.docente.nivel;
  const info = PLANES_ANUALES[nivel];
  const A = ANUAL_MINERD[nivel];
  let html = `
  <div class="hero">
    <h2>Planificación anual</h2>
    <p class="eslogan">El plan anual de tu nivel educativo</p>
    <p>Nivel ${esc(nivel)} · Año escolar ${ANIO_ESCOLAR}</p>
    <div class="row">
      <div class="ringbox">${ring(100,56,7,"#fff","1")}<small>Anual</small></div>
      <div class="ringbox">${ring(100,56,7,"#FFD6DB",String(info.temas.length))}<small>Unidad</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff",String(info.temas.length*4))}<small>Semana</small></div>
    </div>
  </div>
  <h2 class="mini">Tus planes anuales</h2>
  <div class="item" onclick="irA('anio-detalle','${esc(nivel)}')">
    <div class="ic">${ic("calAnual")}</div>
    <div class="tx"><b>${esc(info.titulo)} ${ANIO_ESCOLAR}</b><span>${esc(A.descripcion)}</span></div>
  </div>`;
  $("scr-anio").innerHTML = html;
}

/* ---------- RENDER: AÑO DETALLE (estructura MINERD completa) ---------- */
function renderAnioDetalle(nivel){
  nivel = (nivel && PLANES_ANUALES[nivel])? nivel : S.docente.nivel;
  guiaActual = { titulo:"Guía técnica · Planificación anual", html: guiaAnual() };
  const info = PLANES_ANUALES[nivel];
  const A = ANUAL_MINERD[nivel];
  const temas = info.temas;
  const tiempo = {};
  temas.forEach(t=>{ const k=t.trimestre; tiempo[k]=tiempo[k]||{u:0,s:0}; tiempo[k].u++; tiempo[k].s+=4; });
  let html = `
  <div class="hero">
    <h2>${esc(info.titulo)} ${ANIO_ESCOLAR}</h2>
    <p>Nivel ${esc(nivel)} · Adecuación Curricular vigente (Ordenanza 2023) · Docente: ${esc(S.docente.nombre)}</p>
    <div class="row">
      <div class="ringbox">${ring(100,56,7,"#fff",String(temas.length))}<small>Unidad</small></div>
      <div class="ringbox">${ring(100,56,7,"#FFD6DB",String(temas.length*4))}<small>Semana</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff",String(temas.length*4*5))}<small>Clases</small></div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("nota")} 1. Identificación y contexto</h2>
    <div class="mcard">
      <div class="kv"><b>Centro</b><span>${esc(S.docente.colegio||"—")}</span></div>
      <div class="kv"><b>WhatsApp</b><span>${esc(S.docente.whatsapp || S.docente.distrito || "—")}</span></div>
      <div class="kv"><b>Nivel / Grado</b><span>${esc(nivel)} · ${esc(S.docente.grado)}</span></div>
      <div class="kv"><b>Sección(es)</b><span>${esc((S.docente.secciones.length?S.docente.secciones:[S.docente.seccion||"A"]).join(", "))}</span></div>
      <div class="kv"><b>Año escolar</b><span>${ANIO_ESCOLAR} (agosto–junio)</span></div>
      <div class="kv"><b>Docente</b><span>${esc(S.docente.nombre||"—")}</span></div>
      <div class="kv"><b>Jornada</b><span>${esc(S.docente.jornada||"—")}</span></div>
      <div class="kv"><b>Asignaturas</b><span>${nivel==="Inicial"? "Planificación integral del nivel": esc(S.docente.asignaturasSel.join(", ")||"—")}</span></div>
    </div>
    <h3>Tiempo estimado</h3>
    <div class="mcard">
      ${Object.keys(tiempo).map(t=>`<div class="kv"><b>${esc(t)}</b><span>${tiempo[t].u} unidades · aprox. ${tiempo[t].s} semanas</span></div>`).join("")}
    </div>
  </div>
  <div class="card">
    <h2>${ic("objetivo")} 2. Componentes curriculares</h2>
    <h3>Competencias fundamentales (transversales)</h3>
    ${COMPETENCIAS.map((c,i)=>`<p style="font-size:12.5px;margin-bottom:6px"><b style="color:var(--azul)">C${i+1} · ${esc(c.n)}:</b> <span class="muted">${esc(c.d)}</span></p>`).join("")}
    <h3>Competencias específicas del grado</h3>
    <div class="mcard"><ul>${A.compEspecificas.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <h3>Contenidos (dosificados en tres tipos)</h3>
    <div class="mcard">
      <div class="m-tit"><div class="n">C</div><b>Conceptuales (Saber)</b></div>
      <ul>${temas.slice(0,6).map(t=>`<li><b>${esc(t.mes)}:</b> ${esc(t.contenidos)}</li>`).join("")}</ul>
    </div>
    <div class="mcard">
      <div class="m-tit"><div class="n">P</div><b>Procedimentales (Saber hacer)</b></div>
      <ul>${A.procContenidos.map(c=>`<li>${esc(c)}</li>`).join("")}</ul>
    </div>
    <div class="mcard">
      <div class="m-tit"><div class="n">A</div><b>Actitudinales y valores (Saber ser)</b></div>
      <ul>${A.actContenidos.map(c=>`<li>${esc(c)}</li>`).join("")}</ul>
    </div>
    <h3>Indicadores de logro</h3>
    <div class="mcard"><ul>${A.indicadores.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>
  </div>
  <div class="card">
    <h2>${ic("bombilla")} 3. Diseño didáctico</h2>
    <h3>Estrategias de enseñanza y aprendizaje</h3>
    ${A.estrategias.map(e=>`<span class="chip">${esc(e)}</span>`).join("")}
    <h3>Ejes transversales</h3>
    ${A.ejes.map(e=>`<span class="chip roja">${esc(e)}</span>`).join("")}
    <h3>Secuencia de unidades (situaciones de aprendizaje)</h3>
    ${temas.map((t,i)=>{
      const s = A.situacion(t);
      return `<div class="mcard">
        <div class="m-tit"><div class="n">${i+1}</div><b>${esc(t.mes)} · ${esc(t.tema)}</b></div>
        <div class="kv"><b>Reto</b><span>${esc(s.reto)}</span></div>
        <div class="kv"><b>Estrategia</b><span>${esc(s.estrategia)}</span></div>
        <div class="kv"><b>Producto</b><span>${esc(s.producto)}</span></div>
        <div class="kv"><b>Eje</b><span>${esc(A.ejes[i % A.ejes.length])}</span></div>
      </div>`;
    }).join("")}
  </div>
  <div class="card">
    <h2>${ic("lista")} 4. Evaluación y recursos</h2>
    <h3>Técnicas e instrumentos</h3>
    <div class="mcard"><ul>${A.tecnicas.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>
    <h3>Recursos físicos</h3>
    <p class="muted">${esc(A.recursosFis)}</p>
    <h3>Recursos digitales</h3>
    <p class="muted">${esc(A.recursosDig)}</p>
  </div>
`;
  html += `<div class="card"><h2>${ic("calAnual")} Efemérides y valores del año escolar</h2>${tablaEfemeridesAnual()}</div>
  <button class="dl grande" onclick="descargarPlanAnualDocx('${esc(nivel)}')">${ic("descarga")} Descargar plan anual en Word</button>
  <div style="height:14px"></div>`;
  $("scr-anio-detalle").innerHTML = html;
}

/* ---------- RENDER: MES ---------- */
function planesMensuales(){
  const nivel = S.docente.nivel;
  const perN = numDePeriodo(S.docente.periodo);
  const arr = [];
  const mesesReales = new Set((S.listaPlanes||[]).filter(p=>!/plan anual/i.test(p.titulo)).map(p=>parseMes(p.mes)).filter(Boolean));
  if(nivel==="Inicial") PLANES_ANUALES[nivel].temas.forEach(()=>{});
  else PLANES_ANUALES[nivel].temas.forEach((m,i)=>{
    const ym = parseMes(m.mes);
    if(ym && periodoDeMes(parseInt(ym.slice(5,7)))!==perN) return;
    if(ym && mesesReales.has(ym)) return;
    arr.push({ id:"der-"+nivel+"-"+i, titulo:m.tema, mes:m.mes, tema:m.tema, nSem:4, detallado:false, propio:false });
  });
  (S.listaPlanes||[]).forEach(p=>{
    if(/plan anual/i.test(p.titulo)) return;
    arr.push({ id:p.id, titulo:p.titulo, mes:p.mes, tema:p.tema, nSem:p.semanas||0, detallado:true, propio:p.propio });
  });
  return arr;
}
function renderMes(){
  const plan = planActivo();
  const planes = planesMensuales();
  const vistos0 = new Set();
  const unicos0 = planes.filter(p=>{ if(vistos0.has(p.id)) return false; vistos0.add(p.id); return true; });
  const totalSem0 = unicos0.reduce((a,p)=>a+(p.nSem||0),0);
  let html = `
  <div class="hero">
    <h2>Planificación mensual</h2>
    <p class="eslogan">Las unidades de aprendizaje de tu nivel</p>
    <p>Nivel ${esc(S.docente.nivel)} · Periodo ${esc(S.docente.periodo)}</p>
    <div class="row">
      <div class="ringbox">${ring(100,56,7,"#fff",String(unicos0.length))}<small>Unidades</small></div>
      <div class="ringbox">${ring(100,56,7,"#FFD6DB",String(totalSem0))}<small>Semanas</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff",String(totalSem0*5))}<small>Clases</small></div>
    </div>
  </div>`;
  const vistos = new Set();
  const unicos = planes.filter(p=>{ if(vistos.has(p.id)) return false; vistos.add(p.id); return true; });
  const pintar = (lista)=>{
    lista.forEach(p=>{
      const est = estadoMes(p.mes);
      html += `<div class="item" onclick="abrirPlan('${p.id}')">
        <div class="ic">${ic("calMensual")}</div>
        <div class="tx"><b>${esc(p.titulo)}</b><span>${esc(p.mes)} · ${p.nSem} semanas</span></div>
        <span style="display:inline-flex;flex-direction:column;gap:4px;align-items:flex-end;flex-shrink:0">
          <span class="estado ${est.k}">${est.t}</span>
          ${p.propio? '<span class="hoy-badge">PARA TI</span>':""}
        </span>
      </div>`;
    });
    if(!lista.length) html += `<p class="vacio">Aún no hay unidades generadas en este período. Cuando completes tu planificación se mostrarán aquí.</p>`;
  };
  html += `<div class="sep">Unidades del año escolar</div>`;
  pintar(unicos);
  html += `<div style="height:14px"></div>`;
  $("scr-mes").innerHTML = html;
}
async function refrescarPlanes(){
  toast("Buscando planes nuevos...");
  await cargarPlanes();
  generarNotificaciones();
  renderMes();
  toast("Planes actualizados");
}
async function abrirPlanEnCurso(){
  try{
    const ym = HOY.slice(0,7);
    let cand = (S.listaPlanes||[]).find(p=>parseMes(p.mes)===ym && !/plan anual/i.test(p.titulo));
    if(!cand) return false;
    const plan = await obtenerPlan(cand.id, true);
    if(!plan) return false;
    planAbierto = plan;
    return true;
  }catch(e){ return false; }
}
async function abrirPlan(id){
  toast("Cargando plan...");
  const plan = await obtenerPlan(id);
  if(!plan){ toast("No se pudo cargar el plan"); return; }
  irA("mes-detalle", plan);
}

/* ---------- RENDER: MES DETALLE (unidad de aprendizaje MINERD) ---------- */
let planAbierto = null;
function esAnualPlan(plan){ return /plan anual/i.test(plan&&plan.titulo||""); }
function renderMesDetalle(plan){
  if(!plan){ irA("mes"); return; }
  planAbierto = plan;
  guiaActual = { titulo:"Guía técnica · Unidad de aprendizaje", html: guiaMensual() };
  const esDerivado = plan.tipo==="derivado";
  let html = `
  <div class="hero">
    <h2>${esc(plan.titulo)}</h2>
    <p>${esc(plan.mes)} · Nivel ${esc(plan.nivel||S.docente.nivel)} · Grado ${esc(plan.grado||S.docente.grado)} · Sección ${esc(S.docente.seccion)}</p>
    <div class="row">
      <div class="ringbox">${ring(100,56,7,"#fff",String((plan.semanas||[]).length))}<small>Semanas</small></div>
      <div class="ringbox">${ring(100,56,7,"#FFD6DB",String(todasClases(plan).length))}<small>Clases</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff",String(diasDuracionPlan(plan)))}<small>Días</small></div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("nota")} 1. Elementos de identificación</h2>
    <div class="mcard">
      <div class="kv"><b>Título</b><span>${esc(plan.titulo)}</span></div>
      <div class="kv"><b>Nivel / Grado</b><span>${esc(plan.nivel||S.docente.nivel)} · ${esc(plan.grado||S.docente.grado)}</span></div>
      <div class="kv"><b>Sección</b><span>${esc(S.docente.seccion)}</span></div>
      <div class="kv"><b>Tiempo</b><span>${esDerivado? esc(plan.duracion||"4 semanas") : (plan.semanas||[]).length+" semanas"}</span></div>
      <div class="kv"><b>Eje temático</b><span>${esc(plan.eje||"Según plan")}</span></div>
      <div class="kv"><b>Estrategia</b><span>${esc(plan.estrategia || (plan.nivel==="Inicial"? "Centro de Interés" : "Unidad de Aprendizaje"))}</span></div>
      <div class="kv"><b>Docente</b><span>${esc(S.docente.nombre||"—")}</span></div>
      <div class="kv"><b>Tanda</b><span>${esc(S.docente.jornada||"—")}</span></div>
      <div class="kv"><b>Tipo de planificación</b><span>Unidad de aprendizaje</span></div>
      <div class="kv"><b>Fechas de la unidad</b><span>${(function(){ const f=(plan.semanas||[]).flatMap(s=>s.dias||[]).map(x=>x.id).filter(Boolean); return f.length? esc(fmtFechaLinda(f[0]))+" al "+esc(fmtFechaLinda(f[f.length-1])) : "—"; })()}</span></div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("bombilla")} 2. Situación de aprendizaje</h2>
    <div class="mcard">
      ${esDerivado? `
      <div class="kv"><b>Escenario</b><span>${esc(plan.situacion.escenario)}</span></div>
      <div class="kv"><b>Reto</b><span>${esc(plan.situacion.reto)}</span></div>
      <div class="kv"><b>Estrategia</b><span>${esc(plan.situacion.estrategia)}</span></div>
      <div class="kv"><b>Producto final</b><span>${esc(plan.situacion.producto)}</span></div>
      <div class="kv"><b>Enfoque</b><span>${esc(plan.enfoque||"")}</span></div>
      ` : `
      <div class="kv"><b>Descripción</b><span>${esc(plan.descripcion||"")}</span></div>
      ${(plan.situacion)? `
      <div class="kv"><b>Punto de partida</b><span>${esc(plan.situacion.partida||"")}</span></div>
      <div class="kv"><b>Estrategia</b><span>${esc(plan.situacion.estrategia||"")}</span></div>
      <div class="kv"><b>Proceso</b><span>${esc(plan.situacion.proceso||"")}</span></div>
      <div class="kv"><b>Producto final</b><span>${esc(plan.situacion.producto||"")}</span></div>`:""}
      <div class="kv"><b>Tema</b><span>${esc(plan.tema||"")}</span></div>
      ${(plan.areas||[]).length? `<div class="kv"><b>Áreas</b><span>${esc((plan.areas||[]).join(", "))}</span></div>`:""}
      ${(plan.ciclo&&plan.ciclo.titulo)? `<div class="kv"><b>Ciclo</b><span>${esc(plan.ciclo.titulo)}</span></div>`:""}
      `}
    </div>
  </div>
  ${(plan.anticipacion)? `
  <div class="card">
    <h2>${ic("nota")} Cuadro de anticipación</h2>
    <div class="grid-2col" style="grid-template-columns:1fr 1fr 1fr;gap:8px">
      <div class="mcard"><div class="m-tit"><div class="n">S</div><b>¿Qué sabemos?</b></div><ul>${(plan.anticipacion.sabemos||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="mcard"><div class="m-tit"><div class="n">Q</div><b>¿Qué queremos saber?</b></div><ul>${(plan.anticipacion.queremos||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="mcard"><div class="m-tit"><div class="n">H</div><b>¿Cómo lo vamos a saber?</b></div><ul>${(plan.anticipacion.como||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
    </div>
  </div>`:""}
  ${(plan.dominios||[]).length? `
  <div class="card">
    <h2>${ic("bombilla")} Dominios del desarrollo</h2>
    ${plan.dominios.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}
  </div>`:""}
  ${(plan.experiencias||[]).length? `
  <div class="card">
    <h2>${ic("usuarios")} Experiencias clave de aprendizaje</h2>
    ${plan.experiencias.map(e=>`
    <div class="mcard">
      <div class="m-tit"><div class="n">${e.semana}</div><b>Semana ${e.semana} · ${esc(e.tema||"")}</b></div>
      <div class="kv"><b>Encuentro de grupo</b><span>${esc(e.encuentro||"—")}</span></div>
      <div class="kv"><b>Grupo pequeño</b><span>${esc(e.indPequeno||"")} · ${esc(e.actPequeno||"—")}</span></div>
      <div class="kv"><b>Grupo grande</b><span>${esc(e.indGrande||"")} · ${esc(e.actGrande||"—")}</span></div>
      ${e.taller? `<div class="kv"><b>Taller de ${esc(e.taller)}</b><span>${esc(e.indTaller||"")} · ${esc(e.actTaller||"—")}</span></div>`:""}
    </div>`).join("")}
  </div>`:""}
  <div class="card">
    <div class="card">
      <h2>${ic("calAnual")} Efemérides del mes</h2>
      ${(function(){ const e = efemeridesDeMes(plan.mes||plan.titulo); return e? `<p class="mg-nota"><b>${esc(e.lema)}</b> · Valor del mes: <b>${esc(e.valor)}</b></p><div class="g-chips">${e.lista.map(x=>`<span class="chip chip-mini">${esc(x)}</span>`).join("")}</div>` : `<p class="mg-nota">Sin efemérides registradas para este mes.</p>`; })()}
    </div>
    <h2>${ic("objetivo")} 3. Componentes curriculares</h2>
    <h3>Competencias fundamentales</h3>
    ${(plan.competencias&&plan.competencias.length? plan.competencias : COMPETENCIAS.slice(0,4)).map(c=>`<span class="chip">${esc(c.n||c)}</span>`).join("")}
    ${esDerivado? `<h3>Competencias específicas</h3><div class="mcard"><ul>${plan.compEsp.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <h3>Contenidos dosificados</h3>
    <div class="mcard"><div class="m-tit"><div class="n">C</div><b>Conceptuales (Saber)</b></div><ul>${plan.contenidos.conceptuales.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <div class="mcard"><div class="m-tit"><div class="n">P</div><b>Procedimentales (Saber hacer)</b></div><ul>${plan.contenidos.procedimentales.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <div class="mcard"><div class="m-tit"><div class="n">A</div><b>Actitudinales y valores (Saber ser)</b></div><ul>${plan.contenidos.actitudinales.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <h3>Indicadores de logro</h3>
    <div class="mcard"><ul>${plan.indicadores.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>`:""}
    ${(!esDerivado && plan.evaluacion && Array.isArray(plan.evaluacion.especificas) && plan.evaluacion.especificas.length)? `
    <h3>Competencias específicas</h3>
    <div class="mcard"><ul>${plan.evaluacion.especificas.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>`:""}
    ${(!esDerivado && plan.contenidos)? `
    <h3>Contenidos de la unidad</h3>
    <div class="mcard"><div class="m-tit"><div class="n">C</div><b>Conceptuales (Saber)</b></div><ul>${(plan.contenidos.conceptuales||[]).map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <div class="mcard"><div class="m-tit"><div class="n">P</div><b>Procedimentales (Saber hacer)</b></div><ul>${(plan.contenidos.procedimentales||[]).map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <div class="mcard"><div class="m-tit"><div class="n">A</div><b>Actitudinales y valores (Saber ser)</b></div><ul>${(plan.contenidos.actitudinales||[]).map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>`:""}
    ${(plan.areas||[]).length? `<h3>Áreas curriculares</h3>${(plan.areas||[]).map(a=>`<span class="chip roja">${esc(a)}</span>`).join("")}`:""}
  </div>
  <div class="card">
    <h2>${ic("lista")} 4. Desglose por semanas</h2>`;
  if(esDerivado){
    html += plan.semanas.map(s=>`<div class="mcard">
      <div class="m-tit"><div class="n">${s.numero}</div><b>${esc(s.tema)}</b></div>
      <div class="kv"><b>Inicio</b><span>${esc(s.inicio)}</span></div>
      <div class="kv"><b>Desarrollo</b><span>${esc(s.desarrollo)}</span></div>
      <div class="kv"><b>Cierre</b><span>${esc(s.cierre)}</span></div>
    </div>`).join("");
    html += `<div class="nota"><b>${ic("bombilla")} Evaluación de la unidad</b>${esc(plan.evaluacion||"")}</div>
    <p class="vacio">¿Quieres este plan con clases diarias completas? Pídeselo a Delega por WhatsApp y aparecerá aquí como plan detallado.</p>`;
  } else {
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
  }
  html += `
  </div>
  <button class="dl grande" onclick="descargarUnidadDocx()">${ic("descarga")} Descargar unidad en Word</button>
  <div style="height:14px"></div>`;
  $("scr-mes-detalle").innerHTML = html;
}
async function abrirClase(claseId){
  const plan = planAbierto || planActivo();
  const d = clasePorId(plan, claseId);
  if(!d){ toast("Clase no encontrada"); return; }
  irA("clase", claseId);
}

/* ---------- LIBRETA ---------- */
function grupoLibreta(){ return ((S.ui.libGrado||S.docente.grado)+"|"+(S.ui.libSec||S.docente.seccion||"A")); }
function califsLib(){
  const N = alumnosDe(S.ui.libSec||S.docente.seccion||"A", S.ui.libGrado||S.docente.grado);
  const grupo = grupoLibreta();
  const t = S.ui.libTrim || trimDeFecha(S.ui.libFecha||HOY);
  const out = {};
  for(let i=1;i<=N;i++){ const c = valoresDe(puntosDe(grupo,i), t); if(c) out[i] = c; }
  return out;
}
function notaLib(n){ const c = califsLib()[n]; return c? notaFinalDe(c.p,c.t,c.e) : null; }
function promedioLib(){
  let sum=0, cont=0;
  for(let i=1;i<=S.docente.alumnos;i++){ const nf=notaLib(i); if(nf!==null){ sum+=nf; cont++; } }
  return cont? Math.round(sum/cont) : 0;
}
function asistenciaAnio(){
  let sum=0, cont=0;
  Object.keys(S.asistencia).filter(f=>/^\d{4}-\d{2}-\d{2}$/.test(f)).forEach(f=>{ sum += pctDia(f,"asis"); cont++; });
  return cont? Math.round(sum/cont) : 0;
}
function horasSemana(){
  const w = planDiario();
  const dias = w.semana? (w.semana.dias||[]) : [];
  const totalSec = dias.reduce((a,d)=>a+(claseMinutos(d.id)*60),0);
  const hechas = dias.reduce((a,d)=>a+(S.tiempoClase[d.id]||0),0);
  return { h: hechas/3600, pct: totalSec? Math.min(100,Math.round(hechas*100/totalSec)) : 0 };
}
function claseMinutos(claseId){
  let d = null;
  try{ d = clasePorId(planAbierto || planActivo(), claseId); }catch(e){}
  if(!d){ try{ d = clasePorId(planDiario().plan, claseId); }catch(e){} }
  if(!d) return (+S.docente.duracionMin || 45);
  const momentos = d.momentos||[];
  const base = momentos.reduce((a,m)=>a+(minsDe(m.duracion)||0),0);
  return (+S.docente.duracionMin || base || 45);
}
function pctCrono(claseId){
  const total = claseMinutos(claseId)*60;
  const e = S.tiempoClase[claseId]||0;
  return total? Math.min(100, Math.round(e*100/total)) : 0;
}
function fmtCrono(seg){
  seg = Math.max(0, Math.round(seg||0));
  const h = Math.floor(seg/3600), m = Math.floor((seg%3600)/60), s = seg%60;
  if(h>0) return h+"h "+String(m).padStart(2,"0")+"m";
  return m+"m "+String(s).padStart(2,"0")+"s";
}
/* ---------- RENDER: DIARIA ---------- */
const DIAS_ES = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
function diaDeId(id){ try{ return new Date(id+"T12:00").getDay(); }catch(e){ return 1; } }
function nombreDiaDe(id){ return DIAS_ES[diaDeId(id)]||"—"; }
function sumarDias(id, n){
  try{ const d = new Date(id+"T12:00"); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }
  catch(e){ return id; }
}
function diffDias(desde, hasta){
  try{ return Math.round((new Date(hasta+"T12:00") - new Date(desde+"T12:00"))/86400000); }
  catch(e){ return 0; }
}
function etqClase(id){
  if(id===HOY) return { t:"Hoy", cls:"hoy" };
  const dif = diffDias(HOY, id);
  if(dif===1) return { t:"Mañana", cls:"manana" };
  if(dif>1) return { t:"-"+dif+" días", cls:"futura" };
  return { t:"Termino", cls:"pasada" };
}
function ordenarClases(dias){
  return dias.slice().sort((a,b)=>{
    const da = diffDias(HOY, a.id), db = diffDias(HOY, b.id);
    const fa = da>=0?0:1, fb = db>=0?0:1;
    if(fa!==fb) return fa-fb;
    return fa? db-da : da-db;
  });
}
function ordenDiario(dias){
  const hoyIdx = diaDeId(HOY);
  return dias.slice().sort((a,b)=>{
    const sa = (diaDeId(a.id)-hoyIdx+7)%7, sb = (diaDeId(b.id)-hoyIdx+7)%7;
    return sa-sb;
  });
}
function renderDiaria(){
  const w = planDiario();
  const plan = w.plan;
  const dias = (plan && plan.semanas||[]).reduce((a,s)=>a.concat((s&&s.dias)||[]),[]);
  const totalPlan = dias.length;
  const conReg = dias.filter(d=>{ const r=S.asistencia[d.id]; return r&&Object.keys(r).length; }).length;
  const ordenados = ordenarClases(dias);
  let html = `
  <div class="hero">
    <h2>Planificación diaria</h2>
    <p class="eslogan">Tus clases del plan mensual en curso</p>
    <p>${totalPlan} clases disponibles · Toca una clase para registrar asistencia y logros</p>
    <div class="row">
      <div class="ringbox">${ring(100,56,7,"#fff", String(totalPlan))}<small>Clases</small></div>
      <div class="ringbox">${ring(100,56,7,"#FFD6DB", String(dias.filter(d=>d.id===HOY).length))}<small>Hoy</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff", String(dias.filter(d=>d.id===sumarDias(HOY,1)).length))}<small>Mañana</small></div>
    </div>
  </div>
  <h2 class="mini" style="text-transform:uppercase;letter-spacing:1.2px">Tus clases diarias</h2>`;
  if(!ordenados.length){
    html += `<p class="vacio">No hay plan mensual del mes en curso.<br>Pídele a Delega tu plan detallado con clases diarias.</p>`;
  } else {
    ordenados.forEach(d=>{
      const etq = etqClase(d.id);
      html += `<div class="item" onclick="abrirClaseDiaria('${d.id}')">
        <div class="ic">${ic("diaria")}</div>
        <div class="tx"><b>${esc(d.etiqueta)} · ${esc(d.titulo)}</b><span>${esc((d.desempenos||[""])[0])}</span></div>
        <span class="dia-etq ${etq.cls}">${esc(etq.t)}</span>
      </div>`;
    });
  }
  $("scr-diaria").innerHTML = html;
}
function abrirClaseDiaria(claseId){
  const w = planDiario();
  planAbierto = w.plan;
  const d = clasePorId(planAbierto, claseId);
  if(!d){ toast("Clase no encontrada"); return; }
  irA("clase", claseId);
}

/* ---------- RENDER: CLASE ---------- */
function duracionAjustada(m, baseTotal){
  const claseMin = +S.docente.duracionMin || 0;
  if(!claseMin || !baseTotal) return m.duracion;
  const b = minsDe(m.duracion);
  if(!b) return m.duracion;
  const factor = claseMin / baseTotal;
  return "~"+Math.max(2, Math.round(b*factor))+" min";
}
let claseAbiertaId = null;
function renderClase(claseId){
  claseAbiertaId = claseId;
  const plan = planAbierto || planActivo();
  const d = clasePorId(plan, claseId);
  if(!d){ irA("mes"); return; }
  claseActualId = claseId;
  if(S.ui._claseVista !== claseId){ S.ui.momentoAbierto = 0; S.ui._claseVista = claseId; }
  if(S.ui.momentoAbierto==null) S.ui.momentoAbierto = 0;

  const s = (plan.semanas||[]).find(w=>w.dias.some(x=>x.id===claseId));
  const pctA = pctDia(claseId,"asis"), pctE = pctDia(claseId,"eval");
  const momentos = d.momentos||[];
  const baseTotal = momentos.reduce((a,m)=>a+(minsDe(m.duracion)||0),0);
  const dursMomento = momentos.map(m=>minsDe(duracionAjustada(m, baseTotal))).filter(x=>x&&x>0);
  const durs = [...new Set(dursMomento)];
  if(durs.length && S.docente.duracionMin) durs.push(Math.round((+S.docente.duracionMin)));
  else if(durs.length) durs.push(dursMomento.reduce((a,b)=>a+b,0));
  let html = `
  <div class="card">
    <div class="clase-head">
      <div class="tit">
        ${d.id===HOY?'<span class="hoy-badge">HOY</span>':""}
        <h2>${esc(d.etiqueta)} · ${esc(d.titulo)}</h2>
        <p>Semana ${s?s.numero:""}: ${s?esc(s.tema):""} · ${esc(plan.mes)}</p>
      </div>
      <div class="ringcol" id="headRings">${ringDuo(claseId)}</div>
    </div>
    ${efemerideDe(claseId)? `<div class="mcard" style="margin-top:12px"><div class="kv"><b>Conmemoración</b><span>${esc(efemerideDe(claseId))}</span></div></div>` : ""}
  </div>
  <h2 class="mini">Momentos de la clase</h2>
  ${(S.docente.duracionMin || !duracionActiva())? "" : `<p class="bol-hint">Configura la duración de tu clase en Perfil para activar el temporizador de cada momento</p>`}
  ${momentos.map((m,i)=>`
    <div class="momento m-exp ${(S.ui.momentoAbierto===i)? "abierta":""}" id="mexp-${i}" onclick="toggleMomentoCard(${i})">
      <div class="m-head">
        <div class="m-num">${i+1}</div><b>${esc(m.nombre)}</b>
        ${(S.docente.duracionMin && duracionActiva())? `<span class="dur dur-chip" id="durchip-${i}" title="Iniciar el cronómetro de este momento" onclick="iniciarMomento(event, ${i})">${ic("reloj",13)} ${esc(duracionAjustada(m, baseTotal))}</span>` : ""}
        <span class="m-chevron" title="Toca para abrir o contraer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
      </div>
      <div class="m-cuerpo"><div class="m-scroll">${guiaMomentoHTML(m, i, d)}</div></div>
    </div>`).join("")}
  <div class="card" style="cursor:pointer" onclick="abrirRegistroDia('${claseId}')">
    <div style="display:flex;align-items:center;gap:8px">
      <h2 style="flex:1;margin-bottom:0">${ic("usuarios")} Registro del día · <span id="regCuenta">${alumnosDe(grupoReg().s, grupoReg().g)}</span> alumnos</h2>
      <span class="m-chevron" title="Toca para registrar asistencia y evaluación"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
      <span class="chip chip-mini" style="background:#DCFCE7;color:#15803d">Asistencia: ${cuentaReg(claseId,"A")}/${alumnosDe(grupoReg().s, grupoReg().g)}</span>
      ${nivelUsaEvaluacionCualitativa()? `<span class="chip chip-mini" style="background:#FEF3C7;color:#b45309">Evaluación: ${cuentaReg(claseId,"E")}/${alumnosDe(grupoReg().s, grupoReg().g)}</span>`:""}
      <span class="chip chip-mini" style="background:#f0f5ff;color:#0033A0">Toca la tarjeta para registrar</span>
    </div>
  </div>
  <div class="card">
    <h2>${ic("nota")} Nota de observación del día</h2>
    <textarea class="obs" id="obsTxt" placeholder="Registra aquí lo más relevante del día: logros, dificultades, situaciones del grupo...">${esc(S.obs[claseId]||"")}</textarea>
    <p class="muted" style="margin-top:6px">Se guarda automáticamente y se sincroniza con la dirección.</p>
  </div>
  <div class="card hist-collap" onclick="toggleDescargas(this)">
    <b>${ic("descarga",16)} Descargar documentos</b>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  </div>
  <div id="zonaDescargas" class="zona-desc">
    <button class="dl alt" onclick="descargarAsistenciaDiaPdf('${claseId}')">${ic("descarga")} Descargar asistencias</button>
    ${nivelUsaEvaluacionCualitativa()? `<button class="dl alt" onclick="descargarEvaluacionPdf('${claseId}')">${ic("descarga")} Descargar evaluación</button>`:""}
    <button class="dl" onclick="descargarPlanDiarioDocx('${claseId}')">${ic("descarga")} Descargar planificación diaria</button>
  </div>
  <div style="height:6px"></div>
  <div style="height:14px"></div>`;
  $("scr-clase").innerHTML = html;
  pintarCronoFlotante(durs.length? durs : null);
  sincronizarCrono(durs.length? durs : null);
  $("obsTxt").addEventListener("input", ()=>{
    S.obs[claseId] = $("obsTxt").value;
    guardar();
    clearTimeout(window._obsT);
    window._obsT = setTimeout(()=>{ encolar("observacion", claseId, null, S.obs[claseId]); toast("Observación sincronizada"); }, 1500);
  });
}
function regSel(q){
  if(q==="g") S.ui.regGrado = $("regGrado").value;
  if(q==="s") S.ui.regSec = $("regSec").value;
  guardar();
  const c = $("regCuenta"); if(c) c.textContent = alumnosDe(grupoReg().s, grupoReg().g);
  $("zonaA").innerHTML = alumnosHTML(claseAbiertaId,"A");
  if($("zonaE")) $("zonaE").innerHTML = alumnosHTML(claseAbiertaId,"E");
}
function alumnosHTML(claseId, tipo){
  const N = alumnosDe(grupoReg().s, grupoReg().g);
  if(N<=0) return `<p class="vacio" style="padding:8px 0">No tienes alumnos registrados en este grupo. Añádelos desde tu perfil, en «Grados y secciones a tu cargo».</p>`;
  const reg = (tipo==="A"? S.asistencia : S.evaluacion)[claseId]||{};
  let html = "";
  for(let i=1;i<=N;i++){
    const st = reg[i]||null;
    if(tipo==="A"){
      const color = st==="Presente"? "background:#DCFCE7;color:#15803d" : st==="Tarde"? "background:#FEF3C7;color:#b45309" : st==="Ausente"? "background:#FEE2E2;color:#b91c1c" : "";
      html += `<div class="alumno"><div class="an">${ic("persona",13)}</div><div class="anx">Alumno ${i}</div>
        <div class="seg">
          ${st? `<span class="chip chip-mini" style="${color}">${esc(st)}</span>`:""}
          <button class="btn-evaluar" onclick="abrirAsistencia('${claseId}', ${i})">${st? "Registrada":"Tomar asistencia"}</button>
        </div></div>`;
    } else {
      const colEv = st==="Logrado"? "background:#0033A0;color:#fff" : st==="En proceso"? "background:#f59e0b;color:#fff" : st==="Iniciado"? "background:#CE1126;color:#fff" : "";
      html += `<div class="alumno"><div class="an"${st? ' style="background:#DCFCE7;color:#15803d;font-size:16px"':''}>${st? "✓" : ic("persona",13)}</div><div class="anx">Alumno ${i}</div>
        <div class="seg">${st? `<span class="chip chip-mini" style="${colEv}">${esc(st)}</span>`:""}<button class="btn-evaluar" onclick="abrirEvalAlumno('${claseId}', ${i})">${st? "Registrada":"Evaluar"}</button></div></div>`;
    }
  }
  return html;
}
function ringDuo(claseId){
  let html = `<div class="ringitem">${ring(pctDia(claseId,"asis"),44,5,"#0033A0")}<small>Presentes</small></div>`;
  if(nivelUsaEvaluacionCualitativa()) html += `<div class="ringitem">${ring(pctDia(claseId,"eval"),44,5,"#CE1126")}<small>Logrado</small></div>`;
  return html;
}
function marcar(tipo, claseId, n, valor){
  const mapa = tipo==="A"? S.asistencia : S.evaluacion;
  if(!mapa[claseId]) mapa[claseId] = {};
  mapa[claseId][n] = valor;
  if(valor===null) delete mapa[claseId][n];
  guardar();
  encolar(tipo==="A"?"asistencia":"evaluacion", claseId, { alumno:"Alumno "+n, estado: valor||"Sin registrar" });
  syncAhora();
  toast("Alumno "+n+": "+(valor||"Sin registrar"));
  if(!$("scr-clase").classList.contains("visible")) return;
  if(tipo==="A") $("zonaA").innerHTML = alumnosHTML(claseId,"A");
  else $("zonaE").innerHTML = alumnosHTML(claseId,"E");
  const el = $("headRings");
  if(el) el.innerHTML = ringDuo(claseId);
}
let _asisSel = null;
function abrirAsistencia(claseId, n){
  _asisSel = { claseId, n };
  const t = $("asisTitulo"); if(t) t.textContent = "Alumno "+n+" · toca su estado de asistencia";
  $("asisFondo").classList.add("abierto");
  $("asisHoja").classList.add("abierta");
}
function cerrarAsistencia(){
  $("asisFondo").classList.remove("abierto");
  $("asisHoja").classList.remove("abierta");
  _asisSel = null;
}
function marcarDesdeHoja(valor){
  if(!_asisSel) return;
  const c = _asisSel;
  cerrarAsistencia();
  marcar('A', c.claseId, c.n, valor);
}
function cuentaReg(claseId, tipo){
  const reg = (tipo==="A"? S.asistencia : S.evaluacion)[claseId]||{};
  return Object.keys(reg).filter(k=>reg[k]).length;
}
function abrirRegistroDia(claseId){
  claseAbiertaId = claseId;
  const s = planAbierto || planActivo();
  const d = clasePorId(s, claseId);
  const n = alumnosDe(grupoReg().s, grupoReg().g);
  $("regHojaTitulo").textContent = "Registro del día · " + n + " alumnos";
  $("regHojaSub").textContent = d? (d.etiqueta+" · "+d.titulo) : "";
  $("regHojaCuerpo").innerHTML = `
    ${puedeElegirGrado()? `
    <div class="grid-2col">
      <select class="inp" id="regGrado" onchange="regSel('g')">
        ${misGradosDocente().map(x=>`<option value="${esc(x)}" ${x===grupoReg().g?"selected":""}>${esc(x)}</option>`).join("")}
      </select>
      <select class="inp" id="regSec" onchange="regSel('s')">
        ${misSeccionesDe(grupoReg().g).map(x=>`<option value="${esc(x)}" ${x===grupoReg().s?"selected":""}>Sección ${esc(x)}</option>`).join("")}
      </select>
    </div>`:""}
    <div class="tabs" style="margin-top:10px">
      <div class="tab sel" id="tabA" onclick="tabClase('A')">Asistencia</div>
      ${nivelUsaEvaluacionCualitativa()? `<div class="tab" id="tabE" onclick="tabClase('E')">Evaluación</div>`:""}
    </div>
    <div id="zonaA">${alumnosHTML(claseId,"A")}</div>
    ${nivelUsaEvaluacionCualitativa()? `<div id="zonaE" style="display:none">${alumnosHTML(claseId,"E")}</div>`:""}`;
  $("regFondo").classList.add("abierto");
  $("regHoja").classList.add("abierta");
}
function cerrarRegistroDia(){
  $("regFondo").classList.remove("abierto");
  $("regHoja").classList.remove("abierta");
}
function tabClase(t){
  if(t==="E" && !nivelUsaEvaluacionCualitativa()) return;
  $("tabA").classList.toggle("sel", t==="A");
  $("tabE").classList.toggle("sel", t==="E");
  $("zonaA").style.display = t==="A"?"":"none";
  $("zonaE").style.display = t==="E"?"":"none";
}

/* ---------- TEMPORIZADOR ---------- */
function habilitarArrastreCrono(){
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
    } else if(S.cronoActivo){
      try{ irA("clase", S.cronoActivo); }catch(e){}
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
function setBtn(html){ const b=$("btnPlay"); if(b) b.innerHTML = html; }
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
      <div class="t-txt"><b id="timerTxt">${String(Math.floor((durs[0]*60)/60)).padStart(2,"0")}:00</b><small id="timerEstado">Listo</small></div>
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
}
let evalPend = null;
const PREGUNTAS_EVAL = {
  "Logrado": "¿Qué avance ha tenido?",
  "En proceso": "¿Qué apoyos está necesitando?",
  "Iniciando": "¿Qué indicios ha mostrado?"
};
function abrirEvalModal(claseId, n, valor){
  evalPend = { claseId, n, valor };
  const el = $("evalPreg");
  if(el) el.textContent = PREGUNTAS_EVAL[valor] || "Cuéntanos sobre esta evaluación";
  const inp = $("evalCom"), lbl = $("evalLbl");
  if(inp){ inp.value = ""; lbl.classList.remove("esc"); }
  const tit = $("evalAlum"); if(tit) tit.textContent = "ALUMNO "+n+" · "+valor.toUpperCase();
  $("modalEvalFondo").classList.add("abierto");
  $("modalEvalHoja").classList.add("abierta");
}
function cerrarEvalModal(){
  $("modalEvalFondo").classList.remove("abierto");
  $("modalEvalHoja").classList.remove("abierta");
  evalPend = null;
}
function onEvalInput(v){
  $("evalLbl").classList.toggle("esc", (v||"").length>0);
}
function guardarEvalCom(){
  if(!evalPend) return;
  const com = ($("evalCom").value||"").trim();
  if(!S.evalsCom) S.evalsCom = {};
  const k = evalPend.claseId+"|"+evalPend.n;
  if(com) S.evalsCom[k] = com; else delete S.evalsCom[k];
  guardar();
  const p = evalPend; cerrarEvalModal();
  toast("Evaluación guardada"+(com? " con comentario de evidencia":""));
  if(!$("scr-clase").classList.contains("visible")) return;
  $("zonaE").innerHTML = alumnosHTML(p.claseId,"E");
}
/* ---------- v16: Evaluación cualitativa con lista de cotejo ---------- */
let eval2 = null;
const COTEJO_BASE = {
  "Logrado":["Realizó la actividad completa con autonomía","Explica con sus palabras lo que aprendió","Muestra satisfacción al compartir su logro","Colabora y comparte materiales sin recordárselo"],
  "En proceso":["Inicia la actividad con acompañamiento","Completa la tarea cuando se le anima","Nombra el contenido con ayuda de pistas","Participa al ser invitado"],
  "Iniciado":["Observa la actividad con atención","Imita a sus compañeros","Responde con gestos o palabras sueltas","Permanece en el espacio de trabajo"]
};
function cotejoDe(claseId){
  try{
    const d = clasePorId(planAbierto || planActivo(), claseId);
    if(d && d.cotejo && Object.keys(d.cotejo).length) return d.cotejo;
  }catch(e){}
  return COTEJO_BASE;
}
function abrirEvalAlumno(claseId, n){
  if(!S.evalsEvid) S.evalsEvid = {};
  const guardado = S.evalsEvid[claseId+"|"+n]||null;
  eval2 = { claseId, n, estado:null, evid:{} };
  const prev = (S.evaluacion[claseId]||{})[n];
  if(prev) eval2.estado = prev;
  if(guardado && guardado.estado){
    eval2.estado = guardado.estado;
    eval2.evid[guardado.estado] = Object.assign({}, guardado.sel||{});
  }
  $("eval2Alum").textContent = "ALUMNO "+n;
  const obs = $("eval2Obs"); if(obs) obs.value = guardado? (guardado.obs||"") : "";
  pintarEval2Estados(); pintarEval2Cotejo();
  $("modalEval2Fondo").classList.add("abierto");
  $("modalEval2Hoja").classList.add("abierta");
}
function cerrarEvalAlumno(){
  $("modalEval2Fondo").classList.remove("abierto");
  $("modalEval2Hoja").classList.remove("abierta");
  eval2 = null;
}
let _ev2Deb = null;
function onEval2ObsInput(){
  clearTimeout(_ev2Deb);
  _ev2Deb = setTimeout(autoGuardarEval2, 600);
}
function autoGuardarEval2(){
  if(!eval2 || !eval2.estado) return;
  try{
    const claseId = eval2.claseId, n = eval2.n, estado = eval2.estado;
    if(!S.evaluacion[claseId]) S.evaluacion[claseId] = {};
    S.evaluacion[claseId][n] = estado;
    if(!S.evalsEvid) S.evalsEvid = {};
    if(!S.evalsCom) S.evalsCom = {};
    const k = claseId+"|"+n;
    const obsEl = $("eval2Obs");
    const obs = obsEl? (obsEl.value||"").trim() : "";
    if(obs) S.evalsCom[k] = obs; else delete S.evalsCom[k];
    S.evalsEvid[k] = { estado, sel: Object.assign({}, eval2.evid[estado]||{}), obs };
    guardar();
    syncAhora();
    if($("scr-clase").classList.contains("visible")){
      const el = $("headRings"); if(el) el.innerHTML = ringDuo(claseId);
    }
  }catch(e){}
}
function selEval2Estado(e){
  if(!eval2) return;
  eval2.estado = e;
  pintarEval2Estados(); pintarEval2Cotejo();
  autoGuardarEval2();
}
function pintarEval2Estados(){
  const map = { "Logrado":"ev2-L", "En proceso":"ev2-E", "Iniciado":"ev2-I" };
  Object.keys(map).forEach(e=>{
    const b = $(map[e]); if(b) b.classList.toggle("sel", !!(eval2 && eval2.estado===e));
  });
}
function pintarEval2Cotejo(){
  const cont = $("eval2Cotejo");
  if(!cont) return;
  if(!eval2){ cont.innerHTML = ""; return; }
  if(!eval2.estado){
    cont.innerHTML = `<p class="mg-nota">Toca un estado para ver su lista de cotejo de referencia: es tu guía de observación durante la actividad.</p>`;
    return;
  }
  const listas = cotejoDe(eval2.claseId);
  const items = (listas[eval2.estado]||COTEJO_BASE[eval2.estado]||[]);
  cont.innerHTML = items.map(it=>`<div class="cotejo-item guia"><span class="ck on">✓</span>${esc(it)}</div>`).join("")
    + `<p class="mg-nota" style="margin-top:2px">Lista de cotejo de referencia: observa estos logros en el alumno o la alumna al evaluar el estado «${esc(eval2.estado)}».</p>`;
}
function toggleEvid(ix){ /* v27: el cotejo es guía de observación, ya no se selecciona */ }
function confirmarEvalAlumno(){
  if(!eval2) return;
  if(!eval2.estado){ toast("Selecciona un estado: Logrado, En proceso o Iniciado"); return; }
  const claseId = eval2.claseId, n = eval2.n, estado = eval2.estado;
  const listas = cotejoDe(claseId);
  const items = listas[estado]||COTEJO_BASE[estado]||[];
  const obsEl = $("eval2Obs");
  const obs = obsEl? (obsEl.value||"").trim() : "";
  if(!S.evaluacion[claseId]) S.evaluacion[claseId] = {};
  S.evaluacion[claseId][n] = estado;
  const comFinal = obs || "";
  if(!S.evalsCom) S.evalsCom = {};
  if(!S.evalsEvid) S.evalsEvid = {};
  const k = claseId+"|"+n;
  if(comFinal) S.evalsCom[k] = comFinal; else delete S.evalsCom[k];
  S.evalsEvid[k] = { estado, sel: Object.assign({}, eval2.evid[estado]||{}), obs };
  guardar();
  syncAhora();
  encolar("evaluacion", claseId, { alumno:"Alumno "+n, estado });
  syncAhora();
  cerrarEvalAlumno();
  toast("Alumno "+n+": "+estado+" registrado");
  if(!$("scr-clase").classList.contains("visible")) return;
  $("zonaE").innerHTML = alumnosHTML(claseId,"E");
  const el = $("headRings"); if(el) el.innerHTML = ringDuo(claseId);
}
/* ---------- v16: Momentos expandibles ---------- */
function toggleMomentoCard(i){
  const t = $("mexp-"+i);
  if(!t) return;
  const abierto = t.classList.contains("abierta");
  document.querySelectorAll(".momento.m-exp").forEach(c=>c.classList.remove("abierta"));
  if(!abierto) t.classList.add("abierta");
  if(!S.ui) S.ui = {};
  S.ui.momentoAbierto = abierto? -1 : i;
  guardar();
}
function rolMomento(nombre){
  const n = String(nombre||"").toLowerCase();
  if(n.includes("inicio") || n.includes("apertura")) return "Apertura · Intención pedagógica";
  if(n.includes("práctica") || n.includes("practica")) return "Práctica guiada en el aula";
  if(n.includes("desarrollo")) return "Desarrollo · Construcción del aprendizaje";
  if(n.includes("cierre")) return "Cierre · Metacognición y transferencia";
  return "Momento de la clase";
}
function guiaMomentoHTML(m, i, d){
  let html = "";
  if(Array.isArray(m.guia) && m.guia.length){
    m.guia.forEach(b=>{
      if(b.t) html += `<p class="mg-t">${esc(b.t)}</p>`;
      if(b.d) html += `<p class="mg-d">${esc(b.d)}</p>`;
      if(Array.isArray(b.li) && b.li.length) html += `<ul class="mg-li">${b.li.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
    });
  } else {
    html += `<p class="mg-rol">${esc(rolMomento(m.nombre))}</p>`;
    if(m.proposito) html += `<p class="mg-d"><b>${esc(m.proposito)}</b></p>`;
    if(Array.isArray(m.pasos) && m.pasos.length){
      html += `<ul class="mg-li">${m.pasos.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
    }
  }
  if(m.desempeno){
    html += `<p class="mg-t">Qué debe lograrse en este momento</p><p class="mg-d">${esc(m.desempeno)}</p>`;
  } else if(d && Array.isArray(d.desempenos) && d.desempenos.length){
    html += `<p class="mg-t">Qué debe lograrse en este momento</p><p class="mg-d">${esc(d.desempenos[0])}</p>`;
  }
  if(m.practica){
    html += `<p class="mg-t">Cómo ejecutar la práctica</p><p class="mg-d">${esc(m.practica)}</p>`;
  }
  const rec = (Array.isArray(m.recursos) && m.recursos.length)? m.recursos : (d && d.recursos);
  if(Array.isArray(rec) && rec.length){
    html += `<p class="mg-t">Recursos del momento</p><p class="mg-d">${esc(rec.join(" · "))}</p>`;
  }
  if(m.orientacion){
    html += `<p class="mg-nota">${ic("bombilla",12)} ${esc(m.orientacion)}</p>`;
  } else if(d && d.orientacion){
    html += `<p class="mg-nota">${ic("bombilla",12)} ${esc(d.orientacion)}</p>`;
  }
    try{
    const _efe = d && efemerideDe(d.id);
    if(_efe){
      const _gu = { "Inicio":"úsala para motivar y activar saberes previos", "Desarrollo":"conviértela en la actividad central de aprendizaje", "Práctica":"transforma la conmemoración en ejercicio o juego", "Cierre":"guía la metacognición: ¿cómo vivo yo este valor o hecho hoy?" };
      html += `<p class="mg-nota">⭐ Conmemoración del día: ${esc(_efe)} · En ${esc(m.nombre)}: ${esc(_gu[m.nombre]||"intégrela según el propósito del momento")}.</p>`;
    }
  }catch(e){}
  return html;
}
const CIRC = 2*Math.PI*40;
let T = { dur:300, resta:300, corriendo:false, iv:null };
let claseActualId = null;
function cronoGuarda(){
  const cid = S.cronoActivo || claseActualId;
  if(!cid) return;
  if(!S.crono) S.crono = {};
  S.crono[cid] = { dur: T.dur, resta: T.resta, corriendo: !!T.corriendo, momentoActivo: (T.momentoActivo==null? null : T.momentoActivo), t: Date.now() };
  if(T.corriendo && T.resta>0 && T.momentoActivo!=null) S.cronoActivo = cid;
  else if(T.resta<=0) delete S.cronoActivo;
  guardar();
}
function sincronizarCrono(durs){
  try{
    if(S.cronoActivo && S.crono && S.crono[S.cronoActivo]){
      restaurarCrono(false);
      pintarDurChips();
      pintarTimer();
      return;
    }
  }catch(e){}
  initTimer(durs);
}
function restaurarCrono(fijarClase){
  try{
    const cid = S.cronoActivo;
    if(!cid || !S.crono || !S.crono[cid]) return;
    const g = S.crono[cid];
    if(!g.resta || g.resta<=0){ delete S.cronoActivo; return; }
    try{ if(T && T.iv) clearInterval(T.iv); }catch(e){}
    if(fijarClase || !claseActualId) claseActualId = cid;
    T = { dur: g.dur||300, resta: g.resta, corriendo: false, momentoActivo: (g.momentoActivo==null? null : g.momentoActivo), iv:null };
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
}
function setDur(min, btn){
  T.dur = min*60; T.resta = T.dur; T.corriendo = false;
  clearInterval(T.iv); pintarTimer(); setEstado("Listo");
  setBtn(ic("play",14)+" Iniciar");
  const tb=$("timerBox"); if(tb) tb.classList.remove("timer-corriendo");
  cronoGuarda();
}
function pintarDurChips(){
  try{
    if(!claseActualId || !T) return;
    const d = clasePorId(planAbierto || planActivo(), claseActualId);
    const momentos = (d && d.momentos)||[];
    const base = momentos.reduce((a,x)=>a+(minsDe(x.duracion)||0),0);
    momentos.forEach((m,i)=>{
      const el = $("durchip-"+i); if(!el) return;
      if((S.cronoActivo===claseActualId || !S.cronoActivo) && T.momentoActivo===i && T.resta>0){
        el.innerHTML = T.corriendo? "▶ En curso" : "⏸ En pausa";
      } else {
        el.innerHTML = ic("reloj",13)+" "+esc(duracionAjustada(m, base));
      }
    });
  }catch(e){}
}
function pintarTimer(){
  pintarDurChips();
  const m = Math.floor(T.resta/60), s = T.resta%60;
  const tt = $("timerTxt");
  if(tt) tt.textContent = String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  const circ = $("timerCirc");
  if(circ && circ.setAttribute) circ.setAttribute("stroke-dashoffset", String(Math.round(251.3*(1-(T.resta/Math.max(1,T.dur))))));
  const cf = $("cronoFlotante");
  if(cf) cf.style.display = (claseActualId && T && T.momentoActivo!=null && T.resta>0)? "" : "none";
}
function playTimer(){
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
  const tb2=$("timerBox"); if(tb2) tb2.classList.add("timer-corriendo");
    T.iv = setInterval(()=>{
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
  },1000);
}
let alarmaIv = null;
function iniciarAlarma(claseId){
  const pitar = ()=>{ beepFuerte(); try{ if(navigator.vibrate) navigator.vibrate([400,200,400,200,600]); }catch(e){} };
  pitar();
  clearInterval(alarmaIv);
  alarmaIv = setInterval(pitar, 1500);
  const el = $("alarmaClase");
  if(el) el.textContent = claseId? fmtFechaLinda(claseId) : "";
  $("modalAlarmaFondo").classList.add("abierto");
  $("modalAlarmaHoja").classList.add("abierta");
}
function detenerAlarma(){
  clearInterval(alarmaIv); alarmaIv = null;
  $("modalAlarmaFondo").classList.remove("abierto");
  $("modalAlarmaHoja").classList.remove("abierta");
  toast("Alarma detenida · momento finalizado");
}
function toggleDescargas(btn){
  const z = $("zonaDescargas"); if(!z) return;
  const abierto = !z.classList.contains("abierta");
  z.classList.toggle("abierta", abierto);
  btn.classList.toggle("abierto", abierto);
}
function resetTimer(){
  T.momentoActivo = null; pintarDurChips();
  clearInterval(T.iv); T.corriendo=false; T.resta=T.dur;
  delete S.cronoActivo;
  pintarTimer(); setBtn(ic("play",14)+" Iniciar"); setEstado("Listo");
  const tb=$("timerBox"); if(tb) tb.classList.remove("timer-corriendo");
  cronoGuarda();
}
function beep(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    [0,0.25,0.5].forEach((delay,i)=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.connect(g); g.connect(ctx.destination); o.frequency.value=880+i*220; o.type="sine";
      g.gain.setValueAtTime(0.0001, ctx.currentTime+delay);
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime+delay+0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+delay+0.22);
      o.start(ctx.currentTime+delay); o.stop(ctx.currentTime+delay+0.25);
    });
  }catch(e){}
}
function beepFuerte(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    [0,0.3,0.6,0.9].forEach((delay,i)=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.connect(g); g.connect(ctx.destination); o.frequency.value=980+i*260; o.type="square";
      g.gain.setValueAtTime(0.0001, ctx.currentTime+delay);
      g.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime+delay+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+delay+0.28);
      o.start(ctx.currentTime+delay); o.stop(ctx.currentTime+delay+0.3);
    });
  }catch(e){}
}
function iniciarMomento(ev, i){
  ev.stopPropagation();
  const plan = planAbierto || planActivo();
  const d = clasePorId(plan, claseActualId);
  const momentos = (d && d.momentos)||[];
  const m = momentos[i]; if(!m) return;
  if((S.cronoActivo===claseActualId || !S.cronoActivo) && T.momentoActivo===i && T.resta>0){
    playTimer();
    pintarDurChips();
    pintarTimer();
    return;
  }
  if(S.cronoActivo && S.cronoActivo!==claseActualId) delete S.cronoActivo;
  const base = momentos.reduce((a,x)=>a+(minsDe(x.duracion)||0),0);
  const mins = Math.max(1, minsDe(duracionAjustada(m, base)) || 5);
  setDur(mins, null);
  T.momentoActivo = i;
  if(!T.corriendo) playTimer();
  pintarDurChips();
  pintarTimer();
  cronoGuarda();
  toast("Momento en marcha: "+m.nombre+" · "+mins+" min");
}
function initTimer(durs){
  try{ if(T && T.iv) clearInterval(T.iv); }catch(e){}
  const d = (durs && durs.length)? durs[0]*60 : 300;
  T={dur:d,resta:d,corriendo:false,iv:null};
  const g = claseActualId && S.crono && S.crono[claseActualId];
  if(g && g.dur){ T.dur = g.dur; T.resta = Math.max(0, g.resta); T.momentoActivo = (g.momentoActivo==null? null : g.momentoActivo); }
  pintarTimer();
}
function abrirMomento(i){
  const plan = planAbierto || planActivo();
  const d = clasePorId(plan, claseActualId);
  const momentos = (d && d.momentos)||[];
  const m = momentos[i]; if(!m) return;
  const base = momentos.reduce((a,x)=>a+(minsDe(x.duracion)||0),0);
  const dur = duracionAjustada(m, base);
  const obj = (d.desempenos||[])[0]||"el objetivo de la sesión";
  const roles = [
    { rol:"Apertura · Despertar la intención pedagógica", guia:[
      "Saluda al grupo con calidez y aplica la rutina de entrada (canción, saludo o dinámica breve de dos minutos).",
      "Presenta el tema de forma vivencial: un objeto real, una imagen llamativa o una pregunta sorpresa que despierte la curiosidad.",
      "Recupera los saberes previos con preguntas abiertas: ¿qué saben de…? ¿qué han visto sobre…?",
      "Anuncia el objetivo de la sesión en lenguaje sencillo y cercano para el nivel.",
      "Acuerda con el grupo las normas de convivencia para la actividad de hoy." ]},
    { rol:"Desarrollo · Construcción del aprendizaje", guia:[
      "Desarrolla el contenido paso a paso, combinando explicaciones breves con demostraciones concretas.",
      "Promueve la participación activa: preguntas dirigidas, turnos de palabra y trabajo en parejas o equipos.",
      "Usa material del entorno real: en el nivel inicial los niños aprenden manipulando, no solo escuchando.",
      "Acompaña a quienes avanzan distinto: recorre el aula, pregunta y apoya sin dar la respuesta directamente.",
      "Vincula cada paso con el objetivo de la clase: «¿cómo nos ayuda esto con…?»." ]},
    { rol:"Práctica · Ejercitación guiada", guia:[
      "Propón la actividad práctica con consignas claras y cortas (máximo dos instrucciones a la vez).",
      "Modela primero cómo hacer la actividad; después deja que el grupo lo intente de forma autónoma.",
      "Observa y registra los logros mientras trabajan: es el momento ideal para la evaluación formativa.",
      "Diferencia el acompañamiento: algunos niños necesitarán más apoyo que otros.",
      "Comparte 2 o 3 trabajos del grupo para valorarlos en colectivo y dar retroalimentación." ]},
    { rol:"Cierre · Metacognición y transferencia", guia:[
      "Retoma el objetivo y pregunta: ¿qué aprendimos hoy? ¿qué fue lo que más nos gustó?",
      "Permite que varios niños expresen con sus propias palabras lo aprendido.",
      "Conecta el aprendizaje con la vida diaria: ¿dónde más vemos o usamos esto?",
      "Anticipa brevemente el tema de la próxima clase para mantener la motivación abierta.",
      "Felicita el esfuerzo del grupo y refuerza positivamente los logros del día." ]}
  ][i] || { rol:"Momento de la clase", guia:[] };
  guiaActual = { titulo: "Momento "+(i+1)+" · "+m.nombre, html: `
    <div class="g-bloque b-azul"><b>${ic("objetivo",15)} Objetivo de la sesión</b><span>${esc(obj)}</span></div>
    <div class="g-chips"><span class="chip">Duración: ${esc(dur)} min</span><span class="chip roja">${esc(m.nombre)}</span></div>
    <div class="g-bloque b-verde"><b>${ic("bombilla",15)} ${esc(roles.rol)}</b>
      <ol class="g-pasos">${roles.guia.map(x=>`<li>${x}</li>`).join("")}</ol></div>
    <div class="g-bloque b-crema"><b>${ic("nota",15)} Pasos del plan de clase</b>
      <ol class="g-pasos">${(m.pasos||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>
    <div class="g-bloque b-gris"><b>Propósito oficial</b><span>${esc(m.proposito)}</span></div>` };
}

/* ---------- HISTORIAL DE PUNTOS (modal por alumno) ---------- */
let histActual = null;
const TIPOS_PUNTO = { P:"Participación", T:"Trabajo", E:"Exámenes" };
function trimDeFecha(f){ return periodoDeFecha(f); }
function fmtFechaLinda(f){
  try{ const d = new Date(f+"T12:00"); return d.getDate()+" "+MESES_ES[d.getMonth()].slice(0,3)+" "+d.getFullYear(); }catch(e){ return f||"—"; }
}
function puntosDe(grupo, n){
  if(!S.puntos) S.puntos = {};
  if(!S.puntos[grupo]) S.puntos[grupo] = {};
  if(!Array.isArray(S.puntos[grupo][n])) S.puntos[grupo][n] = [];
  return S.puntos[grupo][n];
}
function upsertPunto(grupo, n, f, tipo, pts, com, asig){
  const arr = puntosDe(grupo, n);
  const a = asig || "General";
  const ex = arr.find(x=>x.f===f && x.tipo===tipo && (x.asig||"General")===a);
  if(ex){ ex.pts = pts; if(com) ex.com = com; if(asig) ex.asig = asig; }
  else arr.push({ f, tipo, pts, com: com||"", asig: a });
  return arr.sort((a,b)=> a.f<b.f? 1 : -1);
}
let histRegAbierto = false;
function toggleRegCal(){
  histRegAbierto = !histRegAbierto;
  const z = $("zonaRegCal"); if(z) z.style.display = histRegAbierto? "" : "none";
  const c = $("collapReg"); if(c) c.classList.toggle("abierto", histRegAbierto);
}
function filasEval(n){
  const fechas = Object.keys(S.evaluacion||{}).filter(f=>/^\d{4}-\d{2}-\d{2}$/.test(f)).sort().reverse();
  if(!fechas.length) return `<p class="g-intro">Sin evaluaciones registradas todavía. Regístralas en Planificación diaria → Registro del día → Evaluación.</p>`;
  return fechas.map(f=>{
    const v = (S.evaluacion[f]||{})[n];
    const col = v==="Logrado"? "#0033A0" : v==="En proceso"? "#f59e0b" : v==="Iniciando"? "#CE1126" : "#94a3b8";
    const com = (S.evalsCom||{})[f+"|"+n] || "";
    return `<div class="g-paso"><b>${esc(fmtFechaLinda(f))} · ${v? `<span style="color:${col}">${esc(v)}</span>` : "<span class=\"muted\">Sin registrar</span>"}</b>${com? `<span>${esc(com)}</span>`:""}</div>`;
  }).join("");
}
function histEvalsHTML(n){
  try{
    const keys = Object.keys(S.evaluacion||{}).filter(k=>/^\d{4}-\d{2}-\d{2}$/.test(k) && S.evaluacion[k] && S.evaluacion[k][n]).sort();
    if(!keys.length) return "";
    const cols = { "Logrado":"background:#0033A0;color:#fff", "En proceso":"background:#f59e0b;color:#fff", "Iniciado":"background:#CE1126;color:#fff" };
    const filas = keys.map(k=>{
      const e = S.evaluacion[k][n];
      const g = (S.evalsEvid||{})[k+"|"+n]||{};
      const cot = g.sel? Object.keys(g.sel).filter(x=>g.sel[x]).length : 0;
      const com = (S.evalsCom||{})[k+"|"+n];
      return `<div class="g-paso"><b><span class="chip chip-mini" style="${cols[e]||""}">${esc(e)}</span> · ${esc(fmtFechaLinda(k))}${cot? " · "+cot+" logros del cotejo":""}</b><span>${com? esc(com) : (cot? "Evidencias marcadas en la lista de cotejo." : "")}</span></div>`;
    }).join("");
    return `<h3 style="margin:12px 2px 6px;font-size:13px;color:#001C5A">Historial de evaluaciones con cotejo</h3>${filas}`;
  }catch(e){ return ""; }
}
function abrirHistorial(n, fuente){
  histActual = { n, fuente };
  histRegAbierto = false;
  const grupo = grupoProg();
  const periodoSel = PERIODOS[(parseInt(S.ui.histFiltro)||numDePeriodo(S.docente.periodo))-1] || S.docente.periodo;
  $("histTitulo").textContent = ((nivelUsaEvaluacionCualitativa()? "Evaluación":"Calificar")+" · Alumno "+n).toUpperCase();
  $("histSub").textContent = "Promedios por asignatura y periodo · desliza hacia los lados";
  const esInicial = nivelUsaEvaluacionCualitativa();
  const asigs = asignaturasVista();
  let rings;
  if(esInicial){
    const ev = evalsAlumno(n);
    $("histSub").textContent = "Evaluación acumulada de tus clases · desliza hacia los lados";
    rings = [
      ["Logrado", ev.pL, "#0033A0"],
      ["En proceso", ev.pEP, "#f59e0b"],
      ["Iniciado", ev.pI, "#CE1126"]
    ].map(([etq, p, col])=>`<div class="ringbox2">${ring(p||0,64,7, p===null? "#94a3b8":col, p===null? "—":String(p))}<small>${etq}</small></div>`).join("");
  } else {
    rings = asigs.map(a=>{
      const v = notaAsig(n, a, periodoSel);
      const color = v===null? "#94a3b8" : (v>=70? "#0033A0" : "#CE1126");
      return `<div class="ringbox2">${ring(v===null?0:v,64,7,color, v===null? "—":String(v))}<small>${esc(a.length>20? a.slice(0,19)+"…" : a)}</small></div>`;
    }).join("");
  }
  const NUMS = ["1er","2do","3er","4to"];
  const chips = PERIODOS.map((p,i)=>`<span class="chip chip-mini ${periodoSel===p?"sel":""}" onclick="filtrarHist('${i+1}')">${NUMS[i]} periodo</span>`).join("");
  let arr = puntosDe(grupo, n).slice();
  arr = arr.filter(x=>trimDeFecha(x.f)===periodoSel);
  const filas = arr.length? arr.map(x=>`
    <div class="g-paso"><b>${esc(fmtFechaLinda(x.f))} · ${esc(x.asig||"General")} · ${esc(TIPOS_PUNTO[x.tipo]||x.tipo)} · ${x.pts} pts</b>
    <span>${x.com? esc(x.com) : ""}</span></div>`).join("")
    : `<p class="g-intro">Sin registros en ${esc(periodoSel)} todavía.</p>`;
  $("histCuerpo").innerHTML = `
  <div class="hscroll rings-scroll">${rings}</div>
  <div class="g-chips hscroll g-chips-centro" style="margin-bottom:10px">${chips}</div>
  ${esInicial? histEvalsHTML(n) : ""}
  ${esInicial? "" : `
  <div class="hist-collap" id="collapReg" onclick="toggleRegCal()">
    <b>${ic("cuaderno",15)} Registrar calificación</b>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  </div>
  <div id="zonaRegCal" style="display:${histRegAbierto? "":"none"}">
    <div class="hist-grid">
      <select class="inp" id="hpAsig">
        <option value="" disabled selected>Asignatura</option>
        ${asigs.filter(a=>a!=="General").concat(asigs.includes("General")?["General"]:[]).map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join("")}
      </select>
      <select class="inp" id="hpTipo">
        <option value="" disabled selected>Tipo</option>
        <option value="P">Participación</option>
        <option value="T">Trabajo</option>
        <option value="E">Exámenes</option>
      </select>
      <input type="number" min="0" max="100" class="inp" id="hpPts" placeholder="Puntos (0 a 100)">
      <input type="text" class="inp" id="hpCom" placeholder="Comentario">
    </div>
    <p class="muted" style="font-size:11.5px;margin-top:4px">La calificación se registra con la fecha de hoy (${esc(fmtFechaLinda(HOY))}) en ${esc(periodoSel)}.</p>
    <div class="hist-sticky"><button class="dl grande" style="margin:0" onclick="registrarPunto()">${ic("cuaderno")} Registrar calificación</button></div>
  </div>`}
  <h3 class="hist-sep">Historial ${esInicial? "de evaluaciones":"de calificaciones"} · ${esc(periodoSel)}</h3>
  ${esInicial? "" : filas}
  ${esInicial? filasEval(n) : ""}
  <div style="height:26px"></div>`;
  $("modalHistFondo").classList.add("abierto");
  $("modalHistHoja").classList.add("abierta");
}
function deslizarRings(dir){
  const el = document.querySelector(".rings-scroll");
  if(el) el.scrollBy({ left: dir*220, behavior: "smooth" });
}
function filtrarHist(f){
  S.ui.histFiltro = f;
  const p = PERIODOS[(parseInt(f)||1)-1];
  if(p && S.docente.periodo!==p) S.docente.periodo = p;
  guardar();
  if(histActual) abrirHistorial(histActual.n, histActual.fuente);
}
function cerrarHistorial(){
  $("modalHistFondo").classList.remove("abierto");
  $("modalHistHoja").classList.remove("abierta");
}
function registrarPunto(){
  if(!histActual) return;
  const n = histActual.n;
  const f = HOY;
  if(nivelUsaEvaluacionCualitativa()){ toast("Inicial trabaja con evaluación cualitativa, no con puntos"); return; }
  const asig = $("hpAsig")? $("hpAsig").value : "";
  const tipo = $("hpTipo")? $("hpTipo").value : "";
  if(!asig){ toast("Selecciona la asignatura"); return; }
  if(!tipo){ toast("Selecciona el tipo de calificación"); return; }
  const pv = parseFloat($("hpPts").value);
  if(isNaN(pv) || pv<0 || pv>100){ toast("Escribe los puntos entre 0 y 100"); return; }
  const pts = Math.round(pv);
  const com = $("hpCom").value||"";
  const grupo = grupoProg();
  const arr = puntosDe(grupo, n);
  arr.push({ f, tipo, pts, com, asig });
  arr.sort((a,b)=> a.f<b.f? 1 : -1);
  guardar();
  syncAhora();
  abrirHistorial(n, "progreso");
  if($("scr-progreso").classList.contains("visible")) renderProgreso();
  toast("Calificación de "+asig+" registrada para Alumno "+n);
}

/* ---------- PROGRESO ---------- */
function grupoProg(){ return ((S.ui.progGrado||S.docente.grado)+"|"+(S.ui.progSec||S.docente.seccion||"A")); }
function valoresDe(arr, soloPeriodo, asig){
  let filtro = soloPeriodo? arr.filter(x=>trimDeFecha(x.f)===soloPeriodo) : arr;
  if(asig) filtro = filtro.filter(x=>(x.asig||"General")===asig);
  const prom = tipo=>{ const vs = filtro.filter(x=>x.tipo===tipo).map(x=>+x.pts||0); return vs.length? Math.round(vs.reduce((a,b)=>a+b,0)/vs.length) : null; };
  const p = prom("P"), t = prom("T"), e = prom("E");
  if(p===null && t===null && e===null) return null;
  return { p:p||0, t:t||0, e:e||0 };
}
function asignaturasVista(){
  if(S.docente.nivel==="Inicial") return ["Asignatura integrada"];
  const propias = (S.docente.asignaturasSel||[]).filter(Boolean);
  const lista = propias.length? propias.slice() : ["Global"];
  const grupo = grupoProg();
  const hayGeneral = Object.keys(S.puntos&&S.puntos[grupo]||{}).some(k=>{
    const arr = S.puntos[grupo][k]||[];
    return Array.isArray(arr) && arr.some(x=>(x.asig||"General")==="General");
  });
  if(hayGeneral && !lista.includes("General")) lista.push("General");
  return lista;
}
function notaAsig(n, asig, periodo){
  let puntos = puntosDe(grupoProg(), n);
  if(S.docente.nivel==="Inicial" && asig==="Asignatura integrada"){
    puntos = puntos.map(x=> (x.asig||"General")==="General"? Object.assign({}, x, {asig:"Asignatura integrada"}) : x);
  }
  const v = valoresDe(puntos, periodo, asig);
  return v? notaFinalDe(v.p, v.t, v.e) : null;
}
function pctTardeAlumno(n){
  const fechas = fechasRegistradas("asis");
  if(!fechas.length) return null;
  let t = 0, marcados = 0;
  fechas.forEach(f=>{ const v = (S.asistencia[f]||{})[n]; if(v){ marcados++; if(v==="Tarde") t++; } });
  return marcados? Math.round(t*100/marcados) : null;
}
function pctTardeGrupo(){
  const N = alumnosDe(S.ui.progSec || S.docente.seccion || "A", S.ui.progGrado || S.docente.grado);
  const fechas = fechasRegistradas("asis");
  if(!N || !fechas.length) return null;
  let t = 0, marks = 0;
  fechas.forEach(f=>{
    const reg = S.asistencia[f]||{};
    for(let i=1;i<=N;i++){ const v = reg[i]; if(v){ marks++; if(v==="Tarde") t++; } }
  });
  return marks? Math.round(t*100/marks) : null;
}
function asistenciaDe(n){
  const fechas = fechasRegistradas("asis");
  if(!fechas.length) return null;
  let p = 0;
  fechas.forEach(f=>{ const v = (S.asistencia[f]||{})[n]; if(v==="Presente"||v==="Tarde") p++; });
  return Math.round(p*100/fechas.length);
}
function ringPersona(pct, size, stroke, color){
  pct = Math.max(0, Math.min(100, pct||0));
  const r=(size-stroke)/2, c=2*Math.PI*r, off=c*(1-pct/100);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(0,51,160,.12)" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 ${size/2} ${size/2})"/>
    <g transform="translate(${size/2-8} ${size/2-9}) scale(0.66)">
      <circle cx="12" cy="8" r="3.4" fill="none" stroke="${color}" stroke-width="2"/>
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    </g>
  </svg>`;
}
function califs(){
  const N = alumnosDe(S.ui.progSec||S.docente.seccion||"A", S.ui.progGrado||S.docente.grado);
  const grupo = grupoProg();
  const out = {};
  for(let i=1;i<=N;i++){ const c = valoresDe(puntosDe(grupo,i), S.docente.periodo); if(c) out[i] = c; }
  return out;
}
function promedioGrupoTrim(trim){
  const N = alumnosDe(S.ui.progSec||S.docente.seccion||"A", S.ui.progGrado||S.docente.grado);
  const grupo = grupoProg();
  let s=0, c=0;
  for(let i=1;i<=N;i++){ const v = valoresDe(puntosDe(grupo,i), trim); if(v){ s+=notaFinalDe(v.p,v.t,v.e); c++; } }
  return c? Math.round(s/c) : null;
}
function notaDe(n){
  const periodo = S.docente.periodo;
  const asigs = asignaturasVista();
  let s=0, c=0;
  asigs.forEach(a=>{ const v = notaAsig(n, a, periodo); if(v!==null){ s+=v; c++; } });
  return c? Math.round(s/c) : null;
}
function promedioGrupo(){
  let sum=0, cont=0;
  for(let i=1;i<=S.docente.alumnos;i++){ const nf=notaDe(i); if(nf!==null){ sum+=nf; cont++; } }
  return cont? Math.round(sum/cont) : 0;
}
function htmlProgresoHero(){
  const g = S.ui.progGrado || S.docente.grado;
  const sc = S.ui.progSec || S.docente.seccion || "A";
  const plan = planAbierto || planActivo();
  return `
  <div class="hero">
    <h2>Progreso</h2>
    <p class="eslogan">Seguimiento de tus estudiantes</p>
    <p>${esc(g)} · Sección ${esc(sc)} · Periodo ${esc(S.docente.periodo)}</p>
    <div class="row">
      ${nivelUsaEvaluacionCualitativa()? "" : `<div class="ringbox">${ring(promedioGrupo(),56,7,"#fff",promedioGrupo()+"★")}<small>Promedio</small></div>`}
      <div class="ringbox">${ring(pctMes(plan,"asis"),56,7,"#FFD6DB")}<small>Asistencia</small></div>
      <div class="ringbox">${ring(pctTardeGrupo()===null?0:pctTardeGrupo(),56,7,"#fff",pctTardeGrupo()===null? "—":String(pctTardeGrupo())+"%")}<small>Tarde</small></div>
      ${nivelUsaEvaluacionCualitativa()? `<div class="ringbox">${ring(pctMes(plan,"eval"),56,7,"#fff")}<small>Logrado</small></div>` : ""}
    </div>
  </div>`;
}
function htmlProgresoPanel(){
  const nivel = S.docente.nivel;
  const g = S.ui.progGrado || S.docente.grado;
  const sc = S.ui.progSec || S.docente.seccion || "A";
  const gradosOpts = [...new Set(misGradosDocente().filter(x=>GRADOS_POR_NIVEL[nivel].includes(normalizaGrado(x))))];
  const gOpts = gradosOpts.length? gradosOpts : GRADOS_POR_NIVEL[nivel];
  const sOpts = misSeccionesDe(g).length? misSeccionesDe(g) : SECCIONES;
  const N = alumnosDe(sc, g);
  let html = `
  ${puedeElegirGrado()? `
  <div class="card">
    <h2>${ic("boletin")} Filtrar por grupos</h2>
    <div class="grid-2col">
      <div><label class="lbl">Grado</label>
        <select class="inp" id="progGrado" onchange="progSel('grado')">
          ${gOpts.map(x=>`<option value="${esc(x)}" ${x===g?"selected":""}>${esc(x)}</option>`).join("")}
        </select></div>
      <div><label class="lbl">Sección</label>
        <select class="inp" id="progSec" onchange="progSel('sec')">
          ${sOpts.map(x=>`<option value="${esc(x)}" ${x===sc?"selected":""}>Sección ${esc(x)}</option>`).join("")}
        </select></div>
    </div>
  </div>`:""}
  <h2 class="mini">${esc(g).toUpperCase()} · SECCIÓN ${esc(sc)}</h2>`;
  if(N<=0){
    html += `<p class="vacio">No tienes alumnos registrados en este grupo. Añádelos desde tu perfil, en «Grados y secciones a tu cargo».</p>`;
  }
  for(let i=1;i<=N;i++){
    const inicial = nivelUsaEvaluacionCualitativa();
    const nf = notaDe(i);
    const color = nf===null? "#94a3b8" : (nf>=70? "#0033A0" : "#CE1126");
    const asis = asistenciaDe(i);
    const ev = evalsAlumno(i);
    const segundoRing = inicial
      ? ring(ev.total? ev.pL:0,46,5, ev.total? "#CE1126":"#94a3b8", ev.total? ev.pL+"%":"—")
      : ring(nf===null?0:nf,46,5,color, nf===null? "—":nf+"★");
    const segundaEtq = inicial? "Logrado" : "Promedio";
    const tarde = pctTardeAlumno(i);
    html += `<div class="prog-card">
      <div class="pc-top" onclick="abrirHistorial(${i},'progreso')" title="Ver detalle del alumno">
        <div class="pc-user">${ic("persona",39)}<span class="pc-nombre">Alumno ${i}</span></div>
        <div class="rg pc-rings">
          <div class="ringitem">${ring(asis===null?0:asis,46,5,asis===null? "#94a3b8":"#0033A0", asis===null? "—":asis+"%")}<small>Asistencia</small></div>
          <div class="ringitem">${segundoRing}<small>${segundaEtq}</small></div>
          <div class="ringitem">${ring(tarde===null?0:tarde,46,5,tarde===null? "#94a3b8":"#f59e0b", tarde===null? "—":tarde+"%")}<small>Tarde</small></div>
        </div>
      </div>
      <div class="pc-bottom">
        <button class="dl dl-chico dl-detalle" onclick="abrirHistorial(${i},'progreso')">Ver detalle</button>
        <button class="btn-mini" title="Reporte individual" onclick="descargarBoletinIndividual(${i})">${ic("descarga",15)}</button>
      </div>
    </div>`;
  }
  html += `<button class="dl grande" onclick="abrirModalBoletines()">${ic("descarga")} Descargar boletines</button>
  <div style="height:14px"></div>`;
  return html;
}
function renderProgreso(){
  let html = htmlProgresoHero();
  html += htmlProgresoPanel();
  $("scr-progreso").innerHTML = html;
}
function progSel(q){
  if(q==="grado" && $("progGrado")) S.ui.progGrado = $("progGrado").value;
  if(q==="sec" && $("progSec")) S.ui.progSec = $("progSec").value;
  guardar();
  renderProgreso();
}
function cambiarPeriodo(){
  S.docente.periodo = $("selPeriodo").value;
  guardar();
  renderProgreso();
}
/* ---------- NOTIFICACIONES ---------- */
function renderNotificaciones(){
  let html = `<div class="hero"><h2>Notificaciones</h2>
  <p>Avisos importantes de tu app docente. Se marcan como leídas al abrirlas.</p></div>`;
  if(!S.notificaciones.length){
    html += `<p class="vacio">No tienes notificaciones por ahora.</p>`;
  }
  S.notificaciones.forEach(n=>{
    const fecha = new Date(n.fecha).toLocaleString("es-DO");
    html += `<div class="notif ${n.leida?"leida":"no-leida"}">
      <div class="n-ic">${ic(n.icono||"campana",17)}</div>
      <div class="n-tx">${esc(n.texto)}<small>${esc(fecha)}</small></div>
    </div>`;
  });
   $("scr-notificaciones").innerHTML = html;
  setTimeout(()=>{
    S.notificaciones.forEach(n=>n.leida = true);
    guardar(); actualizarCampana();
  }, 600);
}
function borrarNotificaciones(){
  S.notificaciones = [];
  guardar(); actualizarCampana();
  renderNotificaciones();
}

/* ---------- INFO ---------- */
function duracionActiva(){ return S.docente.duracionOn !== false; }
function toggleDuracion(){
  S.docente.duracionOn = !duracionActiva();
  guardar();
  if(document.getElementById("scr-info") && document.getElementById("scr-info").classList.contains("visible")) renderInfo();
  toast(duracionActiva()? "Duración de momentos activada" : "Duración de momentos oculta");
}
function renderInfo(){
  const pend = S.cola.length;
  const ult = S.lastSync? new Date(S.lastSync).toLocaleString("es-DO") : "Aún no sincroniza";
  const durH = Math.floor((S.docente.duracionMin||0)/60), durM = (S.docente.duracionMin||0)%60;
  const nivel = S.docente.nivel;
  const asigs = asigsDisponibles();
  const secs = S.docente.secciones.length? S.docente.secciones : [S.docente.seccion||"A"];
  $("scr-info").innerHTML = `
  <div class="card foto-card">
    <div style="display:flex;gap:8px;align-items:stretch">
      <span class="foto-chip">${ic("usuarios",13)} Foto de perfil</span>
      <button class="foto-chip" style="padding:7px 6px;font-size:12px;white-space:nowrap" onclick="$('inpFoto').click()">${ic("refrescar",13)} ${S.docente.foto? "Cambiar foto":"Subir foto"}</button>
    </div>
    <input type="file" id="inpFoto" accept="image/*" style="display:none" onchange="subirFotoPerfil(event)">
    <div class="foto-wrap" ${S.docente.foto? "":"style='display:none'"}>
      <img id="prevFoto" src="${S.docente.foto||""}">
    </div>
    ${S.docente.foto? "" : `<p class="muted" style="text-align:center;font-size:12.5px;margin:10px 0 0">Aún no has subido tu foto</p>`}
  </div>
  <div class="card">
    <h2>${ic("logo")} Tu perfil docente</h2>
    <div class="stat-row"><span>Nombre</span><b>${esc(S.docente.nombre)}</b></div>
    <div class="stat-row"><span>Distrito</span><b>${esc(S.docente.distrito||"—")}</b></div>
    <div class="stat-row"><span>Colegio</span><b>${esc(S.docente.colegio)}</b></div>
    <div class="stat-row"><span>WhatsApp</span><b>${esc(S.docente.whatsapp||"—")}</b></div>
    <div class="stat-row"><span>Nivel / Grado</span><b>${esc(nivel)} · ${esc(S.docente.grado)}</b></div>
    <div class="stat-row"><span>Jornada</span><b>${esc(S.docente.jornada||"—")}</b></div>
    <div class="codigo-box"><span class="muted" style="font-weight:800;letter-spacing:1px">TU CÓDIGO</span>
      <div class="cod">${esc(S.docente.codigo)}</div>
      <p class="muted">Úsalo para entrar desde otro dispositivo</p></div>
  </div>
  ${nivel==="Inicial"? "" : `
  <div class="card">
    <h2>${ic("libro")} Asignaturas que impartes</h2>
    <p class="muted" style="margin-bottom:8px">${nivel==="Inicial"? "Nivel Inicial: áreas de desarrollo (planificación integral).":"Selecciona una o más asignaturas del currículo dominicano."}</p>
    <div class="chips-sel">
      ${asigs.map(a=>`<span class="chip ${S.docente.asignaturasSel.includes(a)?"sel":""}" onclick="toggleSel('asig','${esc(a)}')">${esc(a)}</span>`).join("")}
    </div>
  </div>
  `}
  <div class="card">
    <h2>${ic("refrescar")} Recursos disponibles en mi centro</h2>
    <p class="muted" style="margin-bottom:8px">Registra los recursos con los que cuentas: proyector, tabletas, pizarra digital, huerto, biblioteca...</p>
    <div style="display:flex;gap:8px">
      <input type="text" class="inp" id="inpRecurso" placeholder="Ej. Proyector" onkeydown="if(event.key==='Enter')agregarRecurso()">
      <button class="btn-soft" style="flex:0 0 auto;padding:10px 16px" onclick="agregarRecurso()">${ic("nota",14)} Agregar</button>
    </div>
    <div class="chips-sel" style="margin-top:10px">
      ${(S.docente.recursos||[]).map(r=>`<span class="chip sel">${esc(r)} <b style="cursor:pointer;padding-left:4px" onclick="quitarRecurso('${esc(r).replace(/'/g,"")}')">✕</b></span>`).join("") || '<span class="muted" style="font-size:12px">Aún no has registrado recursos.</span>'}
    </div>
  </div>
  <div class="card">
    <h2>${ic("usuarios")} Grados y secciones a tu cargo</h2>
    <p class="muted" style="margin-bottom:8px">Agrega cada combinación de grado y sección en la que impartes docencia (ej. 3ro · A). Ideal para Secundaria, donde atiendes varios grupos.</p>
    <div style="display:flex;gap:8px">
      ${(nivel==="Inicial")
        ? `<div class="inp" style="flex:1;display:flex;align-items:center;font-weight:800;color:var(--azul-osc)">${esc(S.docente.grado||"Tu grado")}</div>`
        : `<select class="inp" id="selGradoGS" style="flex:1">
        <option value="" selected>Grados</option>
        ${(GRADOS_POR_NIVEL[nivel]||[]).map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join("")}
      </select>`}
      <select class="inp" id="selSeccionGS" style="flex:0 0 auto;width:96px">
        <option value="" selected>Secciones</option>
        ${SECCIONES.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join("")}
      </select>
      <button class="btn-soft" style="flex:0 0 auto;padding:10px 14px" onclick="agregarGS()">Agregar</button>
    </div>
    <div class="chips-sel" style="margin-top:10px">
      ${(S.docente.gradosSecciones||[]).map(gs=>{ const [g,s] = gs.split("|");
        return `<span class="chip sel">${esc(g)} · ${esc(s)} <b style="cursor:pointer;padding-left:4px" onclick="quitarGS('${esc(gs)}')">✕</b></span>`; }).join("")
        || '<span class="muted" style="font-size:12px">Aún no has agregado grupos.</span>'}
    </div>
  </div>
  <div class="card">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:2px">
      <h2 style="flex:1;margin:0">${ic("reloj")} Duración de mis clases</h2>
      <button class="switch ${duracionActiva()? "on":""}" onclick="toggleDuracion()" title="${duracionActiva()? "Ocultar":"Mostrar"} la duración de los momentos de la clase"><span></span></button>
    </div>
    <p class="muted" style="margin-bottom:10px">Define cuánto dura tu clase. La app reparte los minutos de cada momento de la clase de forma proporcional.</p>
    <div style="display:flex;gap:8px;align-items:center${duracionActiva()? "":";opacity:.45;pointer-events:none"}">
      <input class="inp" id="inpDurH" type="number" min="0" max="8" placeholder="horas" value="${durH}" style="text-align:center">
      <span style="font-weight:800;color:var(--tinta-suave)">h</span>
      <input class="inp" id="inpDurM" type="number" min="0" max="59" placeholder="minutos" value="${durM}" style="text-align:center">
      <span style="font-weight:800;color:var(--tinta-suave)">min</span>
    </div>
    <button class="dl" onclick="guardarDuracion()"${duracionActiva()? "":" style='opacity:.45;pointer-events:none'"}>Guardar duración</button>
  </div>
  <div class="card">
    <h2>${ic("calendario")} Mi jornada</h2>
    <label class="lbl">Tipo de centro educativo</label>
    <select class="inp" id="inpJornada">
      <option value="">Selecciona tu jornada…</option>
      ${JORNADAS.map(j=>`<option value="${esc(j)}" ${j===S.docente.jornada?"selected":""}>${esc(j)}</option>`).join("")}
    </select>
    <button class="dl" onclick="guardarJornada()">Guardar jornada</button>
  </div>
  <div class="card">
    <h2>${ic("usuarios")} Alumnos por grado y sección</h2>
    <p class="muted" style="margin-bottom:10px">Define cuántos alumnos tiene cada grupo agregado arriba.</p>
    ${(S.docente.gradosSecciones||[]).map(gs=>{ const [g,s] = gs.split("|");
      return `
    <label class="lbl">${esc(g)} · Sección ${esc(s)}</label>
    <input class="inp inpAlum" data-sec="${esc(gs)}" type="number" min="1" max="60" value="${alumnosDe(s, g)}" style="text-align:center;font-weight:800">`; }).join("")}
    <button class="dl" onclick="guardarAlumnosPorSeccion()">Guardar</button>
  </div>
  <div class="card">
    <h2>${ic("plan")} Alineación curricular</h2>
    <p class="muted">Contenido basado en el currículo vigente del MINERD y la Adecuación Curricular 2023 para los niveles Inicial, Primaria y Secundaria. Calendario escolar dominicano: agosto – junio, 4 periodos. Tu nivel: ${esc(nivel)}.</p>
  </div>
  <div class="card">
    <h2>${ic("salir")} Zona delicada</h2>
    <button class="dl alt" onclick="borrarTodo()">Borrar datos locales</button>
    <button class="dl alt" style="margin-top:8px" onclick="abrirConfCierre()">Cerrar sesión en este dispositivo</button>
  </div>
`;
}
function toggleSel(tipo, valor){
  if(tipo==="asig"){
    if(S.docente.nivel==="Secundaria"){
      const i = S.docente.asignaturasSel.indexOf(valor);
      S.docente.asignaturasSel = i>=0? [] : [valor];
    } else {
      const i = S.docente.asignaturasSel.indexOf(valor);
      if(i>=0) S.docente.asignaturasSel.splice(i,1); else S.docente.asignaturasSel.push(valor);
    }
    apiAccion("actualizar-perfil", { id:S.docente.id, asignaturas:S.docente.asignaturasSel.join(", ") }).catch(()=>{});
  } else {
    if(!Array.isArray(S.docente.secciones)) S.docente.secciones = [];
    const i = S.docente.secciones.indexOf(valor);
    if(i>=0) S.docente.secciones.splice(i,1); else S.docente.secciones.push(valor);
  }
  guardar();
  renderInfo();
}
function agregarGS(){
  const esIni = S.docente.nivel==="Inicial";
  const g = esIni? (S.docente.grado||"") : (($("selGradoGS")||{}).value||"");
  const s = $("selSeccionGS").value;
  if(!g){ toast(esIni? "Registra tu grado en el formulario de registro" : "Selecciona un grado"); return; }
  if(!s){ toast("Selecciona una sección"); return; }
  if(!Array.isArray(S.docente.gradosSecciones)) S.docente.gradosSecciones = [];
  if(S.docente.gradosSecciones.includes(g+"|"+s)){ toast("Ese grupo ya está agregado"); return; }
  S.docente.gradosSecciones.push(g+"|"+s);
  S.docente.secciones = [...new Set(S.docente.gradosSecciones.map(x=>x.split("|")[1]))];
  guardar();
  apiAccion("actualizar-perfil", { id:S.docente.id, secciones:S.docente.secciones.join(", ") }).catch(()=>{});
  renderInfo();
  toast("Grupo agregado: "+g+" · "+s);
}
function quitarGS(gs){
  S.docente.gradosSecciones = (S.docente.gradosSecciones||[]).filter(x=>x!==gs);
  S.docente.secciones = [...new Set(S.docente.gradosSecciones.map(x=>x.split("|")[1]))];
  guardar();
  apiAccion("actualizar-perfil", { id:S.docente.id, secciones:S.docente.secciones.join(", ") }).catch(()=>{});
  renderInfo();
  toast("Grupo eliminado");
}
function guardarAcademicos(){
  S.docente.secciones = [...new Set((S.docente.gradosSecciones||[]).map(x=>x.split("|")[1]))];
  apiAccion("actualizar-perfil", { id:S.docente.id, asignaturas:S.docente.asignaturasSel.join(", "), secciones:S.docente.secciones.join(", ") }).catch(()=>{});
  toast("Asignaturas guardadas");
}
function guardarDuracion(){
  const h = Math.max(0, Math.min(8, parseInt($("inpDurH").value)||0));
  const m = Math.max(0, Math.min(59, parseInt($("inpDurM").value)||0));
  const total = h*60 + m;
  if(total<15){ toast("Define al menos 15 minutos de clase"); return; }
  S.docente.duracionMin = total;
  guardar();
  apiAccion("actualizar-perfil", { id:S.docente.id, duracion_min: total }).catch(()=>{});
  toast("Clases de "+(h?h+"h ":"")+m+"min · momentos reajustados");
  renderInfo();
}
function subirFotoPerfil(ev){
  const archivo = ev.target && ev.target.files && ev.target.files[0];
  if(!archivo) return;
  try{
    const lector = new FileReader();
    lector.onload = ()=>{
      const img = new Image();
      img.onload = ()=>{
        const lado = 200;
        const canvas = document.createElement("canvas");
        canvas.width = lado; canvas.height = lado;
        const ctx = canvas.getContext("2d");
        const min = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width-min)/2, (img.height-min)/2, min, min, 0, 0, lado, lado);
        S.docente.foto = canvas.toDataURL("image/jpeg", 0.82);
        guardar();
        actualizarFotoTopbar();
        renderInfo();
        toast("Foto de perfil actualizada");
      };
      img.src = lector.result;
    };
    lector.readAsDataURL(archivo);
  }catch(e){ toast("No se pudo procesar la imagen"); }
}
function actualizarFotoTopbar(){
  const el = $("fotoPerfil");
  if(!el) return;
  if(S.docente && S.docente.foto){ el.src = S.docente.foto; el.style.display = "block"; }
  else el.style.display = "none";
}
function guardarJornada(){
  S.docente.jornada = $("inpJornada").value;
  guardar();
  apiAccion("actualizar-perfil", { id:S.docente.id, jornada: S.docente.jornada }).catch(()=>{});
  toast(S.docente.jornada? "Jornada guardada: "+S.docente.jornada : "Jornada vacía");
  renderInfo();
}
function guardarAlumnosPorSeccion(){
  const inputs = document.querySelectorAll(".inpAlum");
  if(!S.docente.alumnosPorSeccion) S.docente.alumnosPorSeccion = {};
  let primero = null;
  inputs.forEach(el=>{
    const n = Math.max(1, Math.min(60, parseInt(el.value)||0));
    S.docente.alumnosPorSeccion[el.dataset.sec] = n;
    if(primero===null) primero = n;
  });
  if(primero) S.docente.alumnos = primero;
  guardar();
  apiAccion("actualizar-perfil", { id:S.docente.id, alumnos_por_seccion: JSON.stringify(S.docente.alumnosPorSeccion) }).catch(()=>{});
  toast("Alumnos por grado y sección guardados");
  renderInfo();
}
function borrarTodo(){
  $("modalBorrarFondo").classList.add("abierto");
  $("modalBorrarHoja").classList.add("abierta");
}
function cerrarBorrar(){
  $("modalBorrarFondo").classList.remove("abierto");
  $("modalBorrarHoja").classList.remove("abierta");
}
function confirmarBorrado(){
  cerrarBorrar();
  animarAccion("Borrando datos locales…", ()=>{
    S.asistencia={}; S.evaluacion={}; S.tiempoClase={}; S.obs={}; S.evalsCom={}; S.evalsEvid={}; S.calificaciones={}; S.libreta={}; guardar();
    toast("Datos locales borrados"); renderInfo();
  });
}
function agregarRecurso(){
  const inp = $("inpRecurso");
  const v = (inp.value||"").trim();
  if(!v){ toast("Escribe el recurso"); return; }
  if(!Array.isArray(S.docente.recursos)) S.docente.recursos = [];
  if(S.docente.recursos.some(x=>x.toLowerCase()===v.toLowerCase())){ toast("Ya está registrado"); return; }
  S.docente.recursos.push(v);
  guardar();
  renderInfo();
  toast("Recurso agregado: "+v);
}
function quitarRecurso(r){
  S.docente.recursos = (S.docente.recursos||[]).filter(x=>x!==r);
  guardar();
  renderInfo();
  toast("Recurso eliminado");
}
function abrirConfCierre(){
  $("modalConfFondo").classList.add("abierto");
  $("modalConfHoja").classList.add("abierta");
}
function cerrarConfCierre(){
  $("modalConfFondo").classList.remove("abierto");
  $("modalConfHoja").classList.remove("abierta");
}
function animarAccion(texto, luego){
  const ov = $("accAnim");
  if(!ov){ luego(); return; }
  $("accTxt").textContent = texto;
  ov.classList.add("activo");
  setTimeout(()=>{ ov.classList.remove("activo"); luego(); }, 3000);
}
function confirmarCierre(){
  cerrarConfCierre();
  animarAccion("Cerrando tu sesión…", cerrarSesion);
}
async function cerrarSesion(){
  const codigo = S.docente.codigo;
  if(codigo){
    try{
      const o = {};
      CLAVES_SYNC.forEach(k=>{ o[k] = S[k]; });
      await apiAccion("guardar-estado", { codigo, estado: JSON.stringify(o) });
    }catch(e){ }
  }
  const def = estadoDefault();
  S = Object.assign({}, def, { asistencia:{}, evaluacion:{}, evalsCom:{}, evalsEvid:{}, obs:{}, calificaciones:{}, libreta:{}, puntos:{}, crono:{}, tiempoClase:{}, cola:[], planesCache:{}, listaPlanes:null, notificaciones:[] });
  guardar();
  clearTimeout(_syncT);
  actualizarFotoTopbar();
  navStack = [];
  irA("onboarding");
}

/* ---------- DESCARGAS: utilidades ---------- */
async function docxDe(blob, nombre){
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = nombre;
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 400);
}
function pesosDe(headers){
  const n = headers.length;
  const j = headers.join("|");
  if(n===2) return /Dato|Componente|Tipo|Técnica|Indicador|Momento/.test(headers[0])? [2,5] : [1,1];
  if(j.includes("Momento")) return [2,2,4,7];
  if(j.includes("Semana") && n===4) return [1,3,3,3];
  if(j.includes("Día")) return [1,2,5];
  if(j.includes("Competencia") && n===3) return [1,3,8];
  if(n===5) return [2,3,5,4,3];
  if(n===3) return [1,2,3];
  return headers.map(()=>1);
}
function tblDocx(D, headers, rows, pesos){
  const TOTAL = 14570;
  const n = headers.length;
  const ws = (Array.isArray(pesos) && pesos.length===n)? pesos : pesosDe(headers);
  const suma = ws.reduce((a,b)=>a+b,0);
  const anchos = ws.map(w=>Math.max(700, Math.floor(TOTAL*w/suma)));
  const b = { style: D.BorderStyle.SINGLE, size: 4, color: "9DB2CE" };
  return new D.Table({
    width: { size: TOTAL, type: D.WidthType.DXA },
    columnWidths: anchos,
    layout: D.TableLayoutType.FIXED,
    borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b },
    rows: [
      new D.TableRow({ tableHeader: true, children: headers.map((h,i)=> new D.TableCell({
        shading: { fill: "0033A0" },
        width: { size: anchos[i], type: D.WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new D.Paragraph({ children: [new D.TextRun({ text: String(h), bold: true, color: "FFFFFF", size: 20 }) ] })],
      }))}),
      ...rows.map(r=> new D.TableRow({ children: r.map((c,i)=> new D.TableCell({
        width: { size: anchos[i], type: D.WidthType.DXA },
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new D.Paragraph({ children: [new D.TextRun({ text: String(c), size: 20 }) ] })],
      }))})),
    ],
  });
}
function par(D, text, opts){
  return new D.Paragraph(Object.assign({ children:[new D.TextRun({ text: String(text) })] }, opts||{}));
}
function h2docx(D, text){
  return new D.Paragraph({ text: String(text), heading: D.HeadingLevel.HEADING_2, spacing:{before:280} });
}
function cabeceraPdf(doc, titulo, subtitulo){
  doc.setFillColor(0,51,160); doc.rect(0,0,210,30,"F");
  doc.setFillColor(206,17,38); doc.rect(0,0,210,5,"F");
  doc.setTextColor(255); doc.setFontSize(14);
  doc.text(String(S.docente.colegio||"Colegio").slice(0,48), 105, 13, {align:"center"});
  doc.setFontSize(10); doc.text(titulo, 105, 21, {align:"center"});
  doc.setTextColor(60); doc.setFontSize(8.5);
  doc.text(subtitulo, 105, 37, {align:"center"});
}

/* ---------- DESCARGAS: WORD (MINERD) ---------- */
async function descargarPlanAnualDocx(nivel){
  try{
    const D = docx;
    nivel = (nivel && PLANES_ANUALES[nivel])? nivel : S.docente.nivel;
    const info = PLANES_ANUALES[nivel];
    const A = ANUAL_MINERD[nivel];
    const asigs = nivel==="Inicial"? "Planificación integral del nivel" : (S.docente.asignaturasSel.join(", ")||"—");
    const secs = (S.docente.secciones.length? S.docente.secciones:[S.docente.seccion||"A"]).join(", ");
    const tiempo = {};
    info.temas.forEach(t=>{ tiempo[t.trimestre]=(tiempo[t.trimestre]||0)+1; });
    const doc = new D.Document({ sections:[{ properties:{ page:{ size:{ width:16838, height:11906, orientation:D.PageOrientation.LANDSCAPE }, margin:{ top:1134, right:1134, bottom:1134, left:1134 } } }, children:[
      new D.Paragraph({ text:S.docente.colegio||"Colegio", heading:D.HeadingLevel.HEADING_1, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:info.titulo+" "+ANIO_ESCOLAR+" · Nivel "+nivel, heading:D.HeadingLevel.HEADING_2, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Adecuación Curricular vigente (Ordenanza 2023) · MINERD · República Dominicana", alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"", spacing:{after:200} }),
      h2docx(D, "1. Identificación y contexto"),
      tblDocx(D, ["Dato","Descripción"], [
        ["Centro educativo", S.docente.colegio||"—"],
        ["Distrito", "Distrito "+(S.docente.distrito||"—")],
        ["Nivel / Grado", nivel+" · "+S.docente.grado],
        ["Sección(es)", secs],
        ["Asignaturas", asigs],
        ["Docente", S.docente.nombre||"—"],
        ["Jornada", S.docente.jornada||"—"],
        ["Año escolar", ANIO_ESCOLAR+" (agosto–junio, 3 trimestres)"],
        ["Tiempo estimado", Object.keys(tiempo).map(t=>t+": "+tiempo[t]+" unidades (~"+(tiempo[t]*4)+" semanas)").join(" | ")],
      ]),
      h2docx(D, "2. Componentes curriculares"),
      h2docx(D, "2.1 Competencias fundamentales"),
      tblDocx(D, ["#","Competencia","Descripción"], COMPETENCIAS.map((c,i)=>[ "C"+(i+1), c.n, c.d ])),
      h2docx(D, "2.2 Competencias específicas del grado"),
      tblDocx(D, ["#","Capacidad"], A.compEspecificas.map((c,i)=>["E"+(i+1), c])),
      h2docx(D, "2.3 Contenidos dosificados por mes"),
      tblDocx(D, ["Mes","Conceptuales (Saber)"],
        info.temas.map(t=>[t.mes, t.contenidos])),
      tblDocx(D, ["Tipo","Contenidos"], [
        ["Procedimentales (Saber hacer)", A.procContenidos.join(" · ")],
        ["Actitudinales y valores (Saber ser)", A.actContenidos.join(" · ")],
      ]),
      h2docx(D, "2.4 Indicadores de logro"),
      tblDocx(D, ["#","Indicador de logro"], A.indicadores.map((i,idx)=>["I"+(idx+1), i])),
      h2docx(D, "3. Diseño didáctico"),
      h2docx(D, "3.1 Estrategias de enseñanza y aprendizaje"),
      par(D, A.estrategias.join(" · ")),
      h2docx(D, "3.2 Ejes transversales"),
      par(D, A.ejes.join(" · ")),
      h2docx(D, "3.3 Secuencia de unidades y situaciones de aprendizaje"),
      tblDocx(D, ["Mes","Unidad","Situación de aprendizaje (reto)","Producto final","Eje transversal"],
        info.temas.map(t=>{
          const s = A.situacion(t);
          return [t.mes, t.tema, s.reto, s.producto, A.ejes[info.temas.indexOf(t) % A.ejes.length]];
        })),
      h2docx(D, "4. Evaluación y recursos"),
      h2docx(D, "4.1 Técnicas e instrumentos"),
      tblDocx(D, ["Técnica / Instrumento"], A.tecnicas.map(t=>[t])),
      h2docx(D, "4.2 Recursos y medios"),
      tblDocx(D, ["Físicos","Digitales"], [[A.recursosFis, A.recursosDig]]),
      h2docx(D, "Efemérides y valores del año escolar"),
      tblDocx(D, ["Mes","Lema del mes","Conmemoraciones","Valor"], (function(){
        const _orden = ["08","09","10","11","12","01","02","03","04","05","06"];
        const _nombres = {"08":"Agosto","09":"Septiembre","10":"Octubre","11":"Noviembre","12":"Diciembre","01":"Enero","02":"Febrero","03":"Marzo","04":"Abril","05":"Mayo","06":"Junio"};
        return _orden.map(mn=>{ const e = EFEMERIDES_RD[mn]; return e? [_nombres[mn], e.lema, (e.lista||[]).join(" · "), e.valor] : null; }).filter(Boolean);
      })()),
    ]}]});
    await docxDe(await D.Packer.toBlob(doc), "plan-anual-"+nivel.toLowerCase()+"-"+ANIO_ESCOLAR+".docx");
    toast("Plan anual descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
async function descargarUnidadDocx(){
  try{
    const D = docx;
    const plan = planAbierto || planActivo();
    const esDerivado = plan.tipo==="derivado";
    const secs = (S.docente.secciones.length? S.docente.secciones:[S.docente.seccion||"A"]).join(", ");
    const nivel = plan.nivel || S.docente.nivel;
    const children = [
      new D.Paragraph({ text:S.docente.colegio||"Colegio", heading:D.HeadingLevel.HEADING_1, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Unidad de Aprendizaje: "+plan.titulo, heading:D.HeadingLevel.HEADING_2, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Planificación mensual · Adecuación Curricular vigente (MINERD)", alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"", spacing:{after:200} }),
      h2docx(D, "1. Elementos de identificación"),
      tblDocx(D, ["Dato","Descripción"], [
        ["Título de la unidad", plan.titulo],
        ["Mes / Tiempo", (plan.mes||"—")+" · "+(esDerivado? (plan.duracion||"4 semanas") : ((plan.semanas||[]).length+" semanas"))],
        ["Nivel / Grado", nivel+" · "+(plan.grado||S.docente.grado)],
        ["Sección(es)", secs],
        ["Docente", S.docente.nombre||"—"],
        ["Eje temático transversal", plan.eje||"Según plan anual"],
      ]),
      h2docx(D, "2. Situación de aprendizaje"),
    ];
    const _efeM = efemeridesDeMes(plan.mes||plan.titulo) || { lema:"—", lista:[], valor:"—" };
    const anticipacionDocx = ()=>{
      const a = plan.anticipacion;
      if(!a) return;
      children.push(
        h2docx(D, "Cuadro de anticipación"),
        tblDocx(D, ["¿Qué sabemos sobre el tema?","¿Qué queremos saber?","¿Cómo lo vamos a saber?"], [[(a.sabemos||[]).join(" · "), (a.queremos||[]).join(" · "), (a.como||[]).join(" · ")]])
      );
      if((plan.dominios||[]).length) children.push(par(D, "Dominios del desarrollo: "+plan.dominios.join(" · ")));
      (plan.experiencias||[]).forEach(e=>{
        children.push(
          h2docx(D, "Experiencias clave · Semana "+e.semana+": "+(e.tema||"")),
          tblDocx(D, ["Experiencia","Indicador","Actividad"], [
            ["Encuentro de grupo", "Rutina de encuentro: saludo, canción y activación", e.encuentro||"—"],
            ["Experiencia grupal (grupo pequeño)", e.indPequeno||"—", e.actPequeno||"—"],
            ["Experiencia grupal (grupo grande)", e.indGrande||"—", e.actGrande||"—"],
            ["Taller: "+(e.taller||""), e.indTaller||"—", e.actTaller||"—"],
          ])
        );
      });
    };
    const efemeridesDocx = ()=> children.push(
      h2docx(D, "Efemérides del mes"),
      tblDocx(D, ["Mes","Lema oficial","Conmemoraciones","Valor del mes"], [
        [ (plan.mes||"—"), _efeM.lema||"—", (_efeM.lista||[]).join(" · "), _efeM.valor||"—" ]
      ])
    );
    if(esDerivado){
      children.push(tblDocx(D, ["Componente","Descripción"], [
        ["Escenario", plan.situacion.escenario],
        ["Problema o reto", plan.situacion.reto],
        ["Estrategia", plan.situacion.estrategia],
        ["Producto final", plan.situacion.producto],
      ]));
      efemeridesDocx();
      anticipacionDocx();
      children.push(h2docx(D, "3. Componentes curriculares (tabla de coherencia)"));
      children.push(tblDocx(D, ["Componente","Contenido"], [
        ["Competencias fundamentales", COMPETENCIAS.slice(0,4).map(c=>c.n).join(" · ")],
        ["Competencias específicas", plan.compEsp.join(" · ")],
        ["Conceptuales (Saber)", plan.contenidos.conceptuales.join(" · ")],
        ["Procedimentales (Saber hacer)", plan.contenidos.procedimentales.join(" · ")],
        ["Actitudinales (Saber ser)", plan.contenidos.actitudinales.join(" · ")],
        ["Indicadores de logro", plan.indicadores.join(" · ")],
      ]));
      children.push(h2docx(D, "4. Secuencia didáctica (Inicio · Desarrollo · Cierre)"));
      children.push(tblDocx(D, ["Semana","Inicio","Desarrollo","Cierre"],
        plan.semanas.map(s=>[String(s.numero), s.inicio, s.desarrollo, s.cierre])));
      children.push(h2docx(D, "5. Evaluación"));
      children.push(tblDocx(D, ["Tipo","Instrumentos"], [["Formativa y sumativa", plan.tecnicas.join(" · ")+" · Evaluación: "+(plan.evaluacion||"")]]));
      children.push(h2docx(D, "6. Recursos y medios"));
      children.push(tblDocx(D, ["Físicos","Digitales"], [[plan.recursosFis, plan.recursosDig]]));
    } else {
      efemeridesDocx();
      anticipacionDocx();
      children.push(tblDocx(D, ["Componente","Descripción"], [
        ["Descripción de la unidad", plan.descripcion||"—"],
        ["Tema", plan.tema||"—"],
        ["Áreas", (plan.areas||[]).join(", ")||"—"],
        ["Ciclo", (plan.ciclo&&plan.ciclo.titulo)||"—"],
      ]));
      children.push(h2docx(D, "3. Componentes curriculares"));
      children.push(tblDocx(D, ["Componente","Contenido"], [
        ["Competencias fundamentales", (plan.competencias&&plan.competencias.length? plan.competencias.map(c=>c.n||c) : COMPETENCIAS.slice(0,4).map(c=>c.n)).join(" · ")],
        ["Áreas del nivel", (plan.areas||[]).join(" · ")||"—"],
      ]));
      children.push(h2docx(D, "4. Secuencia didáctica por semanas"));
      (plan.semanas||[]).forEach(s=>{
        children.push(h2docx(D, "Semana "+s.numero+": "+s.tema+" ("+s.fechas+")"));
        children.push(tblDocx(D, ["Día","Clase","Desempeños"],
          (s.dias||[]).map(d=>[d.etiqueta, d.titulo, (d.desempenos||[]).join("; ")])));
      });
      children.push(h2docx(D, "5. Evaluación"));
      children.push(par(D, "Evaluación formativa diaria con registro de logros, observación y lista de cotejo."));
    }
    const doc = new D.Document({ sections:[{ properties:{ page:{ size:{ width:16838, height:11906, orientation:D.PageOrientation.LANDSCAPE }, margin:{ top:1134, right:1134, bottom:1134, left:1134 } } }, children }]});
    await docxDe(await D.Packer.toBlob(doc), "unidad-"+(plan.tema||plan.titulo).replace(/[^\w]+/g,"-").toLowerCase()+".docx");
    toast("Unidad de aprendizaje descargada");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
async function descargarPlanDiarioDocx(claseId){
  try{
    const D = docx;
    const plan = planAbierto || planActivo();
    const d = clasePorId(plan, claseId);
    const s = (plan.semanas||[]).find(w=>w.dias.some(x=>x.id===claseId));
    const momentos = d.momentos||[];
    const baseTotal = momentos.reduce((a,m)=>a+(minsDe(m.duracion)||0),0);
    const asigs = S.docente.asignaturasSel.length? S.docente.asignaturasSel.join(", ") : S.docente.nivel;
    const doc = new D.Document({ sections:[{ children:[
      new D.Paragraph({ text:S.docente.colegio||"Colegio", heading:D.HeadingLevel.HEADING_1, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Plan de Clase Diario", heading:D.HeadingLevel.HEADING_2, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Adecuación Curricular vigente (MINERD) · Secuencia: Inicio · Desarrollo · Cierre", alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"", spacing:{after:200} }),
      h2docx(D, "1. Elementos de identificación e intención"),
      tblDocx(D, ["Dato","Descripción"], [
        ["Fecha", claseId],
        ["Unidad / Tema", plan.titulo+" · "+(plan.tema||"")],
        ["Nivel / Grado / Sección", S.docente.nivel+" · "+S.docente.grado+" · "+S.docente.seccion],
        ["Asignaturas / Áreas", asigs],
        ["Docente", S.docente.nombre||"—"],
        ["Intención pedagógica del día", (d.desempenos||[]).join(" · ")||d.titulo],
        ["Indicador de logro", (d.desempenos||[]).join("; ")||"—"],
        ["Estrategias", "Indagación dialógica · socialización · recuperación de saberes previos"],
        ["Conmemoración del día", (function(){ try{ return efemerideDe(claseId)||"—"; }catch(_e){ return "—"; } })()],
      ]),
      h2docx(D, "2. Los tres momentos de la clase"),
      tblDocx(D, ["Momento","Tiempo","Propósito","Actividades"],
        momentos.map(m=>[m.nombre, duracionAjustada(m, baseTotal), m.proposito, (m.pasos||[]).join(" ")])),
      par(D, (function(){ try{ const _e = efemerideDe(claseId); return _e? "Conmemoración del día: "+_e+" — Integración pedagógica: en Inicio como motivación y saberes previos, en Desarrollo como actividad central de aprendizaje, en Práctica como ejercicio o juego y en Cierre como metacognición del valor." : "Sin conmemoración oficial en esta fecha."; }catch(_e){ return "—"; } })()),
      h2docx(D, "3. Recursos y evaluación"),
      tblDocx(D, ["Componente","Descripción"], [
        ["Recursos", (d.recursos||[]).join(" · ")||"—"],
        ["Tipo de evaluación", "Formativa diaria (con componentes diagnósticos y sumativos del ciclo)"],
        ["Instrumento", "Observación con lista de cotejo · registro de logros"],
        ["Orientaciones", d.orientacion||"—"],
      ]),
      h2docx(D, "4. Nota de observación del día"),
      par(D, S.obs[claseId]||"—"),
    ]}]});
    await docxDe(await D.Packer.toBlob(doc), "clase-"+claseId+".docx");
    toast("Plan diario descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}

/* ---------- DESCARGAS: PDF ---------- */
function fechasRegistradas(tipo){
  const mapa = tipo==="asis"? S.asistencia : S.evaluacion;
  return Object.keys(mapa).filter(f=>/^\d{4}-\d{2}-\d{2}$/.test(f) && Object.keys(mapa[f]).length).sort();
}
function trimestreDeMes(m){ return periodoDeMes(m); }
function trimDePeriodo(t){ return numDePeriodo(t); }
function fechasTrim(tipo, trim){ return fechasRegistradas(tipo).filter(f=>trimestreDeMes(parseInt(f.slice(5,7)))===trim); }
function fechasMesDe(tipo, ym){ return fechasRegistradas(tipo).filter(f=>f.slice(0,7)===ym); }
function pdfResumen(tipo, titulo, sub, fechas, conClases, nombre){
  try{
    const doc = new jspdf.jsPDF();
    cabeceraPdf(doc, titulo, sub);
    const N = alumnosDe(S.ui.progSec||S.docente.seccion||"A", S.ui.progGrado||S.docente.grado);
    const mapa = tipo==="asis"? S.asistencia : S.evaluacion;
    let y = 50;
    const aseg = s=>{ if(y+s>282){ doc.addPage(); y=20; } };
    if(!fechas.length){
      doc.setFontSize(11); doc.setTextColor(90);
      doc.text("Aún no hay registros de "+(tipo==="asis"?"asistencia":"evaluación")+" para este período.", 14, y);
      doc.save(nombre); toast("PDF descargado (sin registros aún)");
      return;
    }
    doc.setFontSize(9.5); doc.setFont(undefined,"bold"); doc.setTextColor(0,51,160);
    doc.text("Alumno", 16, y);
    doc.text(tipo==="asis"? "Presentes":"Logrados", 78, y);
    doc.text(tipo==="asis"? "Ausentes":"En proc.", 112, y);
    doc.text("Sin reg.", 146, y); doc.text("%", 184, y);
    y += 3; doc.setDrawColor(190); doc.line(14, y, 196, y); y += 6;
    doc.setFont(undefined,"normal"); doc.setTextColor(30); doc.setFontSize(9);
    let sumPct = 0;
    for(let i=1;i<=N;i++){
      aseg(8);
      let p=0,o=0,n=0;
      fechas.forEach(f=>{
        const v = (mapa[f]||{})[i];
        if(tipo==="asis"){ if(v==="Presente"||v==="Tarde")p++; else if(v==="Ausente")o++; else n++; }
        else { if(v==="Logrado")p++; else if(v==="En proceso")o++; else n++; }
      });
      const pct = Math.round(p*100/fechas.length);
      sumPct += pct;
      doc.text("Alumno "+i, 16, y); doc.text(String(p), 86, y); doc.text(String(o), 120, y);
      doc.text(String(n), 154, y); doc.text(pct+"%", 184, y);
      y += 7;
    }
    aseg(16);
    doc.line(14, y, 196, y); y += 7;
    const gen = Math.round(sumPct/N);
    doc.setFont(undefined,"bold"); doc.setFontSize(10.5); doc.setTextColor(0,51,160);
    doc.text((tipo==="asis"? "Asistencia general: ":"Evaluación general: ")+gen+"%", 16, y); y += 7;
    doc.setFont(undefined,"normal"); doc.setFontSize(9); doc.setTextColor(90);
    doc.text("Clases registradas en el período: "+fechas.length, 16, y); y += 10;
    if(conClases){
      aseg(14);
      doc.setFont(undefined,"bold"); doc.setFontSize(10.5); doc.setTextColor(0,51,160);
      doc.text("Registro por clase", 14, y); y += 6;
      doc.setFontSize(8.5); doc.setFont(undefined,"normal"); doc.setTextColor(60);
      doc.text("Fecha", 16, y); doc.text("Asist.", 62, y); doc.text("Evaluac.", 92, y);
      doc.text("Logrados", 126, y); doc.text("Presentes", 162, y);
      y += 3; doc.line(14, y, 196, y); y += 5;
      fechas.forEach(f=>{
        aseg(6);
        const regA = S.asistencia[f]||{}, regE = S.evaluacion[f]||{};
        let pres=0, logr=0;
        for(let i=1;i<=N;i++){ if(regA[i]==="Presente"||regA[i]==="Tarde")pres++; if(regE[i]==="Logrado")logr++; }
        doc.text(f, 16, y); doc.text(pctDia(f,"asis")+"%", 64, y); doc.text(pctDia(f,"eval")+"%", 96, y);
        doc.text(String(logr), 132, y); doc.text(String(pres), 168, y);
        y += 6;
      });
    }
    doc.save(nombre);
    toast("PDF descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarAsistenciaPlanPdf(nivel){
  pdfResumen("asis", "Asistencia del plan anual",
    "Nivel "+(nivel||S.docente.nivel)+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion,
    fechasRegistradas("asis"), false, "asistencia-plan-anual.pdf");
}
function descargarEvaluacionPlanPdf(nivel){
  pdfResumen("eval", "Evaluación del plan anual",
    "Nivel "+(nivel||S.docente.nivel)+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion+" · Resumen por alumno, general y por clase",
    fechasRegistradas("eval"), true, "evaluacion-plan-anual.pdf");
}
function descargarAsistenciaTrimPdf(){
  const trim = trimDePeriodo(S.docente.periodo);
  pdfResumen("asis", "Asistencia del trimestre",
    S.docente.periodo+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion,
    fechasTrim("asis", trim), false, "asistencia-"+trim+"er-trimestre.pdf");
}
function descargarEvaluacionTrimPdf(){
  const trim = trimDePeriodo(S.docente.periodo);
  pdfResumen("eval", "Evaluación del trimestre",
    S.docente.periodo+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion,
    fechasTrim("eval", trim), false, "evaluacion-"+trim+"er-trimestre.pdf");
}
function descargarAsistenciaUnidadPdf(){
  const plan = planAbierto || planActivo();
  const ym = parseMes(plan.mes);
  pdfResumen("asis", "Asistencia de la unidad",
    (plan.titulo||"")+" · "+(plan.mes||"")+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion,
    ym? fechasMesDe("asis", ym) : [], false, "asistencia-unidad.pdf");
}
function descargarEvaluacionUnidadPdf(){
  const plan = planAbierto || planActivo();
  const ym = parseMes(plan.mes);
  pdfResumen("eval", "Evaluación de la unidad",
    (plan.titulo||"")+" · "+(plan.mes||"")+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion,
    ym? fechasMesDe("eval", ym) : [], false, "evaluacion-unidad.pdf");
}
function descargarRegistroPdf(tipo){
  try{
    const mapa = tipo==="asis"? S.asistencia : S.evaluacion;
    const fechas = Object.keys(mapa).filter(k=>/^\d{4}-\d{2}-\d{2}$/.test(k)).sort();
    if(!fechas.length){ toast("Aún no hay registros de "+(tipo==="asis"?"asistencia":"logros")); return; }
    const N = S.docente.alumnos;
    const doc = new jspdf.jsPDF({ orientation:"landscape", unit:"mm", format:"a4" });
    const porPagina = 12;
    const letra = (estado)=> tipo==="asis"? (estado==="Presente"?"P":estado==="Ausente"?"A":"–") : (estado==="Logrado"?"L":estado==="En proceso"?"EP":"–");
    const paginas = Math.ceil(fechas.length/porPagina);
    for(let pg=0; pg<paginas; pg++){
      const sub = fechas.slice(pg*porPagina, (pg+1)*porPagina);
      if(pg>0) doc.addPage();
      cabeceraPdf(doc, tipo==="asis"? "Registro de asistencias" : "Registro de logros",
        "Nivel "+S.docente.nivel+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—")+" · Página "+(pg+1)+"/"+paginas);
      let y = 46;
      doc.setFillColor(0,51,160); doc.rect(14, y-5, 268, 7, "F");
      doc.setTextColor(255); doc.setFontSize(8.5); doc.setFont(undefined,"bold");
      doc.text("Alumno", 17, y);
      sub.forEach((f,i)=> doc.text(f.slice(8,10)+"/"+f.slice(5,7), 44+i*20, y));
      y += 8;
      doc.setFont(undefined,"normal");
      for(let n=1;n<=N;n++){
        if(y>195) break;
        doc.setTextColor(50); doc.setFontSize(9);
        doc.text("Alumno "+String(n).padStart(2,"0"), 17, y);
        sub.forEach((f,i)=>{
          const st = (mapa[f]||{})[n];
          const L = st? letra(st) : "–";
          const ok = (tipo==="asis" && st==="Presente") || (tipo==="logros" && st==="Logrado");
          doc.setTextColor(st? (ok?0:206):(150), st? (ok?51:17):(150), st? (ok?160:38):(150));
          doc.setFontSize(tipo==="logros" && L==="EP"? 7.5 : 9);
          doc.text(L, 44+i*20, y);
          doc.setFontSize(9);
        });
        y += 7;
      }
      doc.setTextColor(120); doc.setFontSize(7.5);
      doc.text(tipo==="asis"? "Leyenda: P = Presente · A = Ausente · – = sin registrar" : "Leyenda: L = Logrado · EP = En proceso · – = sin evaluar", 14, y+3);
    }
    doc.save((tipo==="asis"? "asistencias":"logros")+"-"+S.docente.grado.replace(/ /g,"")+"-"+S.docente.seccion+".pdf");
    toast("PDF descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarAsistenciaDiaPdf(claseId){
  try{
    const plan = planAbierto || planActivo();
    const d = clasePorId(plan, claseId);
    const N = S.docente.alumnos;
    const doc = new jspdf.jsPDF();
    cabeceraPdf(doc, "Asistencia del día · "+d.etiqueta,
      plan.mes+" · Nivel "+S.docente.nivel+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—"));
    let y = 50;
    const reg = S.asistencia[claseId]||{};
    for(let i=1;i<=N;i++){
      if(y>275){ doc.addPage(); y=20; }
      const st = reg[i]||"Sin registrar";
      const ok = st==="Presente"||st==="Tarde";
      if(st==="Presente") doc.setFillColor(0,51,160);
      else if(st==="Tarde") doc.setFillColor(245,158,11);
      else if(st==="Ausente") doc.setFillColor(206,17,38);
      else doc.setFillColor(200,203,210);
      doc.circle(18, y-1.5, 2.2, "F");
      doc.setFontSize(10.5); doc.setTextColor(50);
      doc.text("Alumno "+String(i).padStart(2,"0"), 26, y);
      doc.setTextColor(ok?(0,51,160):st==="Ausente"?(206,17,38):(120));
      doc.text(st, 160, y);
      y += 8;
    }
    y += 4;
    const pct = pctDia(claseId,"asis");
    doc.setFontSize(11.5); doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
    doc.text("Resumen: "+pct+"% de asistencia · "+d.etiqueta+" · "+d.titulo, 14, Math.min(y,285));
    doc.setFontSize(9); doc.setTextColor(120); doc.setFont(undefined,"normal");
    doc.text("Observación del día: "+(S.obs[claseId]||"—"), 14, Math.min(y+6,290), {maxWidth:180});
    doc.save("asistencia-"+claseId+".pdf");
    toast("Asistencia descargada");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarEvaluacionPdf(claseId){
  try{
    const plan = planAbierto || planActivo();
    const d = clasePorId(plan, claseId);
    const N = S.docente.alumnos;
    const doc = new jspdf.jsPDF();
    cabeceraPdf(doc, "Evaluación de logros · "+d.etiqueta,
      plan.mes+" · Nivel "+S.docente.nivel+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—"));
    let y = 50;
    const reg = S.evaluacion[claseId]||{};
    for(let i=1;i<=N;i++){
      if(y>275){ doc.addPage(); y=20; }
      const st = reg[i]||"Sin evaluar";
      if(st==="Logrado") doc.setFillColor(0,51,160);
      else if(st==="En proceso") doc.setFillColor(206,17,38);
      else doc.setFillColor(200,203,210);
      doc.circle(18, y-1.5, 2.2, "F");
      doc.setFontSize(10.5); doc.setTextColor(50);
      doc.text("Alumno "+String(i).padStart(2,"0"), 26, y);
      doc.setTextColor(st==="Logrado"?(0,51,160):st==="En proceso"?(206,17,38):(120));
      doc.text(st, 160, y);
      y += 8;
    }
    y += 4;
    const pct = pctDia(claseId,"eval");
    doc.setFontSize(11.5); doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
    doc.text("Resumen: "+pct+"% de los alumnos con logro alcanzado.", 14, Math.min(y,285));
    doc.setFontSize(9); doc.setTextColor(120); doc.setFont(undefined,"normal");
    doc.text("Observación del día: "+(S.obs[claseId]||"—"), 14, Math.min(y+6,290), {maxWidth:180});
    doc.save("evaluacion-"+claseId+".pdf");
    toast("Evaluación descargada");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}

function descargarPlanDiarioPdf(claseId){
  try{
    const plan = planAbierto || planActivo();
    const d = clasePorId(plan, claseId);
    const momentos = d.momentos||[];
    const baseTotal = momentos.reduce((a,m)=>a+(minsDe(m.duracion)||0),0);
    const doc = new jspdf.jsPDF();
    cabeceraPdf(doc, "Plan de Clase Diario · "+d.etiqueta,
      "Nivel "+S.docente.nivel+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—"));
    let y = 50;
    const aseg = (salto)=>{ if(y+salto>280){ doc.addPage(); y=20; } };
    doc.setFontSize(11.5); doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
    doc.text("1. Elementos de identificación e intención", 14, y); y += 7; doc.setFont(undefined,"normal");
    const ident = [
      ["Fecha", claseId],
      ["Unidad / Tema", (plan.titulo||"")+" · "+(d.titulo||"")],
      ["Nivel / Grado / Sección", S.docente.nivel+" · "+S.docente.grado+" · "+S.docente.seccion],
      ["Asignaturas", S.docente.asignaturasSel.join(", ")||S.docente.nivel],
      ["Docente", S.docente.nombre||"—"],
      ["Intención pedagógica", (d.desempenos||[]).join(" · ")||"—"],
      ["Indicador de logro", (d.desempenos||[])[0]||"—"],
      ["Estrategias", "Indagación dialógica · socialización · recuperación de saberes previos"],
    ];
    ident.forEach(f=>{
      aseg(10);
      doc.setFontSize(8.5); doc.setTextColor(120); doc.text(String(f[0]), 16, y);
      doc.setFontSize(9.5); doc.setTextColor(30);
      const lineas = doc.splitTextToSize(String(f[1]), 138);
      doc.text(lineas, 66, y);
      y += 6 + (lineas.length-1)*4.5;
    });
    y += 3;
    aseg(12);
    doc.setFontSize(11.5); doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
    doc.text("2. Los tres momentos de la clase", 14, y); y += 7; doc.setFont(undefined,"normal");
    momentos.forEach((m,i)=>{
      aseg(14);
      doc.setFontSize(10); doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
      doc.text((i+1)+". "+m.nombre+" ("+duracionAjustada(m, baseTotal)+")", 16, y); y += 5;
      doc.setFontSize(8.5); doc.setTextColor(110); doc.setFont(undefined,"italic");
      doc.text("Propósito: "+m.proposito, 16, y); y += 5;
      doc.setFont(undefined,"normal"); doc.setTextColor(40); doc.setFontSize(9.5);
      (m.pasos||[]).forEach(p=>{
        const ls = doc.splitTextToSize("• "+p, 168);
        ls.forEach(l=>{ aseg(6); doc.text(l, 20, y); y += 5; });
      });
      y += 3;
    });
    aseg(12);
    doc.setFontSize(11.5); doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
    doc.text("3. Recursos y evaluación", 14, y); y += 6; doc.setFont(undefined,"normal");
    doc.setFontSize(9.5); doc.setTextColor(40);
    doc.text(doc.splitTextToSize("Recursos: "+((d.recursos||[]).join(" · ")||"—"), 180), 16, y); y += 6;
    doc.text(doc.splitTextToSize("Evaluación: formativa diaria · Instrumento: lista de cotejo, observación y registro de logros.", 180), 16, y); y += 6;
    doc.text(doc.splitTextToSize("Observación del día: "+(S.obs[claseId]||"—"), 180), 16, y);
    doc.save("plan-diario-"+claseId+".pdf");
    toast("Plan diario descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}

/* ---------- BOLETINES PDF (Progreso y Libreta) ---------- */
function datosBoletin(fuente){
  if(fuente==="libreta") return { store: califsLib(), titulo: "Libreta · "+(S.ui.libTrim||"1er periodo"),
    grado: S.ui.libGrado||S.docente.grado, seccion: S.ui.libSec||S.docente.seccion||"A" };
  return { store: califs(), titulo: "Boletín de calificaciones · "+S.docente.periodo,
    grado: S.ui.progGrado||S.docente.grado, seccion: S.ui.progSec||S.docente.seccion||"A" };
}

function abrirModalBoletines(){
  const contenido = $("bolContenido"); if(!contenido) return;
  const grado = S.ui.progGrado||S.docente.grado, seccion = S.ui.progSec||S.docente.seccion||"A";
  const sub = $("bolSub"); if(sub) sub.textContent = "Nivel "+S.docente.nivel+" · Grado "+grado+" · Sección "+seccion+" · "+(nivelUsaEvaluacionCualitativa()? "Evaluación cualitativa":"Calificaciones numéricas");
  contenido.innerHTML = `
    <b class="bol-sec">Por período</b>
    <div class="bol-grid">${PERIODOS.map(p=>`<button class="dl dl-chico" onclick="boletinDetallePdf('periodo','${esc(p)}')">${esc(p)}</button>`).join("")}</div>
    <b class="bol-sec">Por fecha</b>
    <div class="bol-fechas">
      <div class="eval-campo"><input type="date" id="bolDesde" value="${HOY.slice(0,8)}01"></div>
      <div class="eval-campo"><input type="date" id="bolHasta" value="${HOY}"></div>
    </div>
    <button class="dl grande" style="width:100%;margin:4px 0 8px" onclick="boletinFechaDesdeModal()">${ic("descarga")} Boletín detallado por fechas</button>
    <button class="dl grande" style="width:100%;background:#fff;color:#0033A0;border:1.5px solid rgba(0,51,160,.25)" onclick="descargarBoletinGrupo()">Resumen del grupo (tabla)</button>
    <button class="bol-cerrar" onclick="cerrarModalBoletines()">Cerrar</button>`;
  $("bolFondo").classList.add("abierto");
  $("bolHoja").classList.add("abierta");
}
function cerrarModalBoletines(){
  $("bolFondo").classList.remove("abierto");
  $("bolHoja").classList.remove("abierta");
}
function boletinFechaDesdeModal(){
  const d = ($("bolDesde")&&$("bolDesde").value)||"";
  const h = ($("bolHasta")&&$("bolHasta").value)||"";
  if(!d||!h||h<d){ toast("Revisa el rango de fechas"); return; }
  boletinDetallePdf("fecha", null, d, h);
}
function letraEscala(nf){ return nf>=90? "A":nf>=80? "B":nf>=70? "C":nf>=60? "D":"F"; }
function textoEscala(l){ return l==="A"?"Excelente":l==="B"?"Muy bueno":l==="C"?"Bueno":l==="D"?"Suficiente":"Insuficiente"; }
function bloqueCualitativoPdf(doc, i, enRango, y){
  const evs = Object.keys(S.evaluacion||{}).filter(k=>/^\d{4}-\d{2}-\d{2}$/.test(k) && (S.evaluacion[k]||{})[i] && enRango(k)).sort();
  const cuenta = { "Logrado":0, "En proceso":0, "Iniciado":0 };
  evs.forEach(k=>{ const e=S.evaluacion[k][i]; if(cuenta[e]!=null) cuenta[e]++; });
  doc.setFillColor("#F0F5FF"); doc.roundedRect(14, y-4, 182, 9, 2, 2, "F");
  doc.setTextColor(0,51,160); doc.setFontSize(10); doc.setFont(undefined,"bold");
  doc.text("EVALUACIÓN CUALITATIVA · NIVEL INICIAL", 105, y+2, {align:"center"});
  doc.setFont(undefined,"normal"); doc.setTextColor(30); doc.setFontSize(9);
  y += 13;
  [["Logrado"],["En proceso"],["Iniciado"]].forEach((fila,ix)=>{
    doc.setFillColor(ix%2? "#F8FAFC":"#FFFFFF"); doc.rect(14, y-5, 182, 7.5, "F");
    doc.text(fila[0], 17, y);
    doc.text(String(cuenta[fila[0]])+" clases evaluadas", 90, y);
    y += 7.5;
  });
  const dom = Object.keys(cuenta).sort((a,b)=>cuenta[b]-cuenta[a])[0];
  doc.setFont(undefined,"bold"); doc.setFontSize(9.5);
  doc.text("Escala final: "+(evs.length? dom : "Sin evaluar")+(evs.length? " ("+cuenta[dom]+" de "+evs.length+" clases evaluadas)" : ""), 17, y+2);
  doc.setFont(undefined,"normal"); doc.setFontSize(9);
  y += 11;
  const regs = evs.map(k=>{
    const g = (S.evalsEvid||{})[k+"|"+i]||{};
    const nc = g.sel? Object.keys(g.sel).filter(x=>g.sel[x]).length : 0;
    return { k, e:S.evaluacion[k][i], nc, c:(S.evalsCom||{})[k+"|"+i]||"" };
  });
  if(regs.length){
    doc.setFillColor(0,51,160); doc.rect(14, y-5, 182, 7, "F");
    doc.setTextColor(255); doc.setFontSize(8);
    doc.text("Historial de evaluación y cotejo (últimas "+Math.min(8,regs.length)+")", 17, y);
    y += 8;
    regs.slice(-8).forEach(r=>{
      if(y>262){ doc.addPage(); y=20; }
      doc.setTextColor(30); doc.setFontSize(8.5);
      doc.text(fmtFechaLinda(r.k)+" · "+r.e+(r.nc? " · "+r.nc+" logros del cotejo":""), 17, y, {maxWidth:120});
      if(r.c) doc.text(String(r.c).slice(0,50), 140, y, {maxWidth:56});
      y += 6;
    });
  }
  return y;
}
function boletinDetallePdf(modo, periodo, desde, hasta){
  try{
    const grado = S.ui.progGrado||S.docente.grado, seccion = S.ui.progSec||S.docente.seccion||"A";
    const N = alumnosDe(seccion, grado);
    if(!N){ toast("No hay alumnos en este grupo"); return; }
    const grupo = grado+"|"+seccion;
    const asigs = asignaturasVista();
    const esPeriodo = modo==="periodo";
    const enRango = f => esPeriodo? (trimDeFecha(f)===periodo) : (f>=desde && f<=hasta);
    const doc = new jspdf.jsPDF();
    let y;
    for(let i=1;i<=N;i++){
      if(i>1) doc.addPage();
      cabeceraPdf(doc, "Boletín de calificaciones", (esPeriodo? "Periodo: "+periodo : "Fechas: "+desde+" a "+hasta)+" · "+ANIO_ESCOLAR);
      y = 36;
      doc.setTextColor(40); doc.setFontSize(9);
      doc.text("Nivel "+S.docente.nivel+" · Grado "+grado+" · Sección "+seccion+" · Docente: "+(S.docente.nombre||"—")+" · Distrito educativo "+(S.docente.distrito||"—"), 105, y, {align:"center", maxWidth:180});
      y += 9;
      doc.setFillColor("#F0F5FF"); doc.roundedRect(14, y, 182, 12, 2, 2, "F");
      doc.setTextColor(0,51,160); doc.setFontSize(11); doc.setFont(undefined,"bold");
      doc.text("ALUMNO "+String(i).padStart(2,"0"), 105, y+8, {align:"center"});
      y += 18;
      doc.setFont(undefined,"normal");
      if(nivelUsaEvaluacionCualitativa()){
        y = bloqueCualitativoPdf(doc, i, enRango, y);
      } else {
      const arr = puntosDe(grupo, i);
      const calc = asig => {
        const f = asig? arr.filter(x=>(x.asig||"General")===asig && enRango(x.f)) : arr.filter(x=>enRango(x.f));
        const prom = t=>{ const vs = f.filter(x=>x.tipo===t).map(x=>+x.pts||0); return vs.length? Math.round(vs.reduce((a,b)=>a+b,0)/vs.length) : null; };
        const p = prom("P"), t = prom("T"), e = prom("E");
        if(p===null && t===null && e===null) return null;
        return { p:p||0, t:t||0, e:e||0 };
      };
      doc.setFillColor(0,51,160); doc.rect(14, y-5, 182, 7, "F");
      doc.setTextColor(255); doc.setFontSize(8);
      doc.text("Asignatura", 17, y); doc.text("Part.", 92, y); doc.text("Trab.", 108, y);
      doc.text("Examen", 124, y); doc.text("Final", 141, y); doc.text("Escala", 158, y);
      y += 8;
      const filas = asigs.map(a=>({ a, c: calc(a) }));
      filas.push({ a:"Promedio general", c: calc(null) });
      filas.forEach((fila, idx)=>{
        if(y>262){ doc.addPage(); y=20; }
        const c = fila.c;
        const nf = c? notaFinalDe(c.p,c.t,c.e) : null;
        const fondo2 = idx===filas.length-1? "#F2F6FF" : (idx%2? "#F8FAFC":"#FFFFFF");
        doc.setFillColor(fondo2); doc.rect(14, y-5, 182, 7.5, "F");
        doc.setTextColor(30);
        doc.setFontSize(9);
        doc.setFont(undefined, idx===filas.length-1? "bold":"normal");
        doc.text(String(fila.a).slice(0,36), 17, y);
        doc.text(c? String(c.p):"—", 95, y);
        doc.text(c? String(c.t):"—", 111, y);
        doc.text(c? String(c.e):"—", 127, y);
        doc.setFontSize(10);
        doc.text(nf===null? "—": String(nf), 143, y);
        doc.setFontSize(8.5); doc.setFont(undefined,"normal");
        doc.setTextColor(nf===null? 140 : (nf>=70? 22: 190), nf===null? 140 : (nf>=70? 100: 60), nf===null? 140 : (nf>=70? 16: 30));
        doc.text(nf===null? "—" : letraEscala(nf), 158, y);
        y += 7.5;
      });
      y += 4;
      }
      if(y>250){ doc.addPage(); y=20; }
      const fechasA = fechasRegistradas("asis").filter(enRango);
      let pres=0, tar=0, aus=0, marc=0;
      fechasA.forEach(f=>{ const v=(S.asistencia[f]||{})[i]; if(v){ marc++; if(v==="Presente")pres++; else if(v==="Tarde")tar++; else if(v==="Ausente")aus++; } });
      const evFe = Object.keys(S.evaluacion||{}).filter(f=>/^\d{4}-\d{2}-\d{2}$/.test(f) && Object.keys(S.evaluacion[f]||{}).length).filter(enRango);
      let log=0, ep=0, ini=0, evTot=0;
      evFe.forEach(f=>{ const v=(S.evaluacion[f]||{})[i]; if(v){ evTot++; if(v==="Logrado")log++; else if(v==="En proceso")ep++; else if(v==="Iniciado")ini++; } });
      doc.setTextColor(0,51,160); doc.setFontSize(10); doc.setFont(undefined,"bold");
      doc.text("Asistencia y desempeño", 14, y+4); doc.setFont(undefined,"normal"); doc.setTextColor(40); doc.setFontSize(9);
      doc.text("Días registrados: "+marc+" · Presente: "+pres+" · Tarde: "+tar+" · Ausente: "+aus, 14, y+11);
      doc.text("Logros evaluados: "+(evTot? (log+" Logrado · "+ep+" En proceso · "+ini+" Iniciado") : "sin registros en el rango"), 14, y+17);
      y += 24;
      if(y>265){ doc.addPage(); y=20; }
      doc.setFontSize(8); doc.setTextColor(110);
      doc.text("Escala: Logrado (90-100) · En proceso (70-89) · Iniciando (<70). Final = Part. 30% + Trab. 30% + Examen 40%.", 14, y, {maxWidth:182});
      y += 14;
      doc.setDrawColor(140); doc.line(20, y, 65, y); doc.line(85, y, 130, y); doc.line(150, y, 195, y);
      doc.setTextColor(70); doc.setFontSize(8);
      doc.text("Docente", 20, y+4); doc.text("Dirección del centro", 85, y+4); doc.text("Madre / Padre / Tutor", 150, y+4);
    }
    const sufijo = esPeriodo? periodo.replace(/ /g,"-") : (desde+"_"+hasta);
    doc.save("boletines-"+grado.replace(/ /g,"")+"-"+seccion+"-"+sufijo+".pdf");
    toast("Boletines descargados");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarBoletinGrupo(fuente){
  try{
    const dt = datosBoletin(fuente||"progreso");
    const N = alumnosDe(dt.seccion, dt.grado);
    const doc = new jspdf.jsPDF();
    cabeceraPdf(doc, dt.titulo,
      "Nivel "+S.docente.nivel+" · Grado "+dt.grado+" · Sección "+dt.seccion+" · Docente: "+(S.docente.nombre||"—")+" · "+ANIO_ESCOLAR);
    let y = 48;
    doc.setFillColor(0,51,160); doc.rect(14, y-5, 182, 7, "F");
    doc.setTextColor(255); doc.setFontSize(8.5);
    if(nivelUsaEvaluacionCualitativa()){
      doc.text("Alumno", 17, y); doc.text("Logrado", 92, y); doc.text("En proc.", 118, y);
      doc.text("Iniciado", 144, y); doc.text("Escala", 172, y);
    } else {
      doc.text("Alumno", 17, y); doc.text("Part.", 95, y); doc.text("Trab.", 118, y);
      doc.text("Examen", 141, y); doc.text("Final", 165, y); doc.text("Escala", 182, y);
    }
    y += 10;
    let sum=0, cont=0;
    for(let i=1;i<=N;i++){
      if(y>280){ doc.addPage(); y=25; }
      if(nivelUsaEvaluacionCualitativa()){
        const ev = evalsAlumno(i);
        const ordenEv = [["Logrado",ev.pL],["En proceso",ev.pEP],["Iniciado",ev.pI]].filter(x=>x[1]);
        ordenEv.sort((a,b)=>b[1]-a[1]);
        doc.setTextColor(30); doc.setFontSize(9.5);
        doc.text("Alumno "+String(i).padStart(2,"0"), 17, y);
        doc.text(String(ev.pL||0), 98, y);
        doc.text(String(ev.pEP||0), 124, y);
        doc.text(String(ev.pI||0), 150, y);
        doc.setFontSize(10.5); doc.setFont(undefined,"bold");
        doc.text(ordenEv.length? ordenEv[0][0] : "—", 174, y);
        doc.setFont(undefined,"normal");
        y += 8;
      } else {
      const c = dt.store[i]||{};
      const nf = c? notaFinalDe(c.p,c.t,c.e) : null;
      if(nf!==null){ sum+=nf; cont++; }
      doc.setTextColor(nf===null?120:(nf>=70?0:206), nf===null?120:(nf>=70?51:17), nf===null?120:(nf>=70?160:38));
      doc.setFontSize(9.5);
      doc.text("Alumno "+String(i).padStart(2,"0"), 17, y);
      doc.text(c.p!==undefined? String(c.p):"—", 98, y);
      doc.text(c.t!==undefined? String(c.t):"—", 121, y);
      doc.text(c.e!==undefined? String(c.e):"—", 144, y);
      doc.setFontSize(10.5); doc.setFont(undefined,"bold");
      doc.text(nf===null? "—": String(nf), 166, y);
      doc.setFontSize(9); doc.setFont(undefined,"normal");
      doc.text(nf===null? "—": letraEscala(nf), 184, y);
      y += 8;
      }
    }
    y += 4;
    const prom = cont? Math.round(sum/cont) : 0;
    doc.setFontSize(11); doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
    doc.text(nivelUsaEvaluacionCualitativa()? "Evaluación cualitativa del nivel Inicial · Nivel de logro dominante por alumno" : "Promedio del grupo: "+prom+"/100 · "+letraEscala(prom)+" ("+textoEscala(letraEscala(prom))+")", 14, Math.min(y,288));
    doc.setFontSize(8); doc.setTextColor(120); doc.setFont(undefined,"normal");
    doc.text(nivelUsaEvaluacionCualitativa()? "Escala del nivel Inicial: L = Logrado · EP = En proceso · I = Iniciando (evaluación cualitativa)." : "Escala: A = Excelente (90-100) · B = Muy bueno (80-89) · C = Bueno (70-79) · D = Suficiente (60-69) · F = Insuficiente (<60). Final = Part. 30% + Trab. 30% + Examen 40%.", 14, Math.min(y+5,292), {maxWidth:182});
    doc.save("boletin-"+dt.grado.replace(/ /g,"")+"-"+dt.seccion+".pdf");
    toast("Boletín descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarBoletinIndividual(n, fuente){
  try{
    const dt = datosBoletin(fuente);
    const c = dt.store[n]||{};
    const nf = c? notaFinalDe(c.p,c.t,c.e) : null;
    const doc = new jspdf.jsPDF();
    cabeceraPdf(doc, "Reporte individual · Alumno "+n+" · "+dt.titulo,
      "Nivel "+S.docente.nivel+" · Grado "+dt.grado+" · Sección "+dt.seccion+" · Docente: "+(S.docente.nombre||"—"));
    const plan = planAbierto || planActivo();
    const filas = nivelUsaEvaluacionCualitativa()? (function(){
      const ev = evalsAlumno(n);
      const ordenEv = [["Logrado",ev.pL],["En proceso",ev.pEP],["Iniciado",ev.pI]].filter(x=>x[1]);
      ordenEv.sort((a,b)=>b[1]-a[1]);
      let cot = 0;
      Object.keys(S.evalsEvid||{}).forEach(k=>{ if(k.endsWith("|"+n)){ const g = S.evalsEvid[k]; cot += g.sel? Object.keys(g.sel).filter(x=>g.sel[x]).length : 0; } });
      return [
        ["Evaluación cualitativa", "Logrado "+(ev.pL||0)+" · En proceso "+(ev.pEP||0)+" · Iniciado "+(ev.pI||0)],
        ["Escala dominante", ordenEv.length? ordenEv[0][0] : "Sin evaluar"],
        ["Logros marcados en cotejo", String(cot)],
        ["Asistencia del plan activo", pctMes(plan,"asis")+"%"],
        ["Logros del plan activo", pctMes(plan,"eval")+"%"],
      ];
    })() : [
      ["Participación", c.p!==undefined? c.p : "—"],
      ["Trabajos", c.t!==undefined? c.t : "—"],
      ["Examen", c.e!==undefined? c.e : "—"],
      ["Nota final (ponderada)", nf===null? "—" : nf+" / 100"],
      ["Escala de calificaciones", nf===null? "—" : letraEscala(nf)+" ("+textoEscala(letraEscala(nf))+")"],
      ["Asistencia del plan activo", pctMes(plan,"asis")+"%"],
      ["Logros del plan activo", pctMes(plan,"eval")+"%"],
    ];
    let y = 52;
    doc.setFillColor(0,51,160); doc.rect(14, y-5, 182, 7, "F");
    doc.setTextColor(255); doc.setFontSize(9);
    doc.text("Indicador", 17, y); doc.text("Valor", 140, y);
    y += 10;
    filas.forEach(f=>{
      doc.setTextColor(50); doc.setFontSize(10);
      doc.text(f[0], 17, y);
      doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
      doc.text(String(f[1]), 140, y);
      doc.setFont(undefined,"normal");
      y += 9;
    });
    doc.setFontSize(8.5); doc.setTextColor(120);
    doc.text("Generado por Planificación Docente RD · "+new Date().toLocaleString("es-DO"), 105, 288, {align:"center"});
    doc.save("reporte-alumno-"+n+".pdf");
    toast("Reporte individual descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}

/* ---------- INICIO ---------- */
async function initApp(){
  const enIDB = await idbCargar();
  if(enIDB && enIDB.docente && enIDB.docente.id) S = normalizar(enIDB);
  if(S.docente && S.docente.id){
    if(!S.ui.progTab) S.ui.progTab = "progreso";
    if(!S.ui.progGrado) S.ui.progGrado = S.docente.grado;
    if(!S.ui.progSec) S.ui.progSec = S.docente.seccion || "A";
    restaurarCrono();
    habilitarArrastreCrono();
    aplicarPosCrono();
    animLogin(S.docente.nombre? S.docente.nombre.split(" ")[0] : "", ()=>{
      mostrar("diaria");
      cargarPlanes().then(()=>{ generarNotificaciones(); abrirPlanEnCurso().then(()=>{ if(pantallaActual==="diaria") renderDiaria(); }); });
      flush();
    });
  }else{
    mostrar("onboarding");
  }
}
initApp();
