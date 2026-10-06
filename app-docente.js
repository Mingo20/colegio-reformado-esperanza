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
  Inicial:   ["Maternal","3 años","4 años","5 años"],
  Primaria:  ["1ro","2ro","3ro","4ro","5ro","6to"],
  Secundaria:["1ro","2ro","3ro","4ro","5ro","6to"],
};
const JORNADAS = ["Matutina","Vespertina","Nocturna","Jornada Extendida"];
const MESES_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const PERIODOS = ["1er periodo","2do periodo","3er periodo","4to periodo"];
function periodoDeMes(m){ if(m>=8&&m<=10) return 1; if(m>=11||m===1||m===12) return 2; if(m>=2&&m<=4) return 3; return 4; }
function periodoDeFecha(f){ return PERIODOS[periodoDeMes(parseInt((f||HOY).slice(5,7)))-1] || PERIODOS[0]; }
function numDePeriodo(p){ const i = PERIODOS.indexOf(p); return i>=0? i+1 : periodoDeMes(parseInt(HOY.slice(5,7))); }
const SECCIONES = ["A","B","C","D","E","F"];
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
    docente:{ id:"",codigo:"",nombre:"",colegio:"",distrito:"",nivel:"Inicial",grado:"",seccion:"A",asignaturasSel:[],secciones:[],gradosSecciones:[],alumnosPorSeccion:{},foto:"",jornada:"",duracionMin:0,alumnos:24,periodo:"1er periodo",recursos:[] },
    asistencia:{}, evaluacion:{}, tiempoClase:{}, puntos:{}, crono:{}, obs:{}, calificaciones:{}, libreta:{},
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
function guardar(){
  try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); }catch(e){}
  programarSyncEstado();
}
const CLAVES_SYNC = ["docente","ui","asistencia","evaluacion","puntos","crono","tiempoClase","obs","calificaciones","libreta","notificaciones","vistosPlanes","lastSync"];
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
  }catch(e){ }
}

/* ---------- API ---------- */
async function apiAccion(accion, datos){
  const r = await fetch(APP_URL, { method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ accion, ...datos }) });
  return await r.json();
}
async function cargarPlanes(){
  try{
    const r = await apiAccion("planes", { nivel: S.docente.nivel, docente_id: S.docente.id });
    if(r.success) S.listaPlanes = r.planes;
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
  if(S.docente.nivel === "Inicial") return PLAN_MARIPOSA;
  return { titulo:"Sin plan activo", mes:"", tema:"", nivel:S.docente.nivel, descripcion:"", competencias:[], areas:[], semanas:[] };
}
async function obtenerPlan(id){
  if(!id || id==="local-mariposa") return PLAN_MARIPOSA;
  if(id.startsWith("der-")) return unidadDerivada(...id.slice(4).split("-"));
  if(S.planesCache[id]) return S.planesCache[id];
  try{
    const r = await apiAccion("plan", { id });
    if(r.success){ S.planesCache[id] = r.plan; guardar(); return r.plan; }
  }catch(e){}
  return null;
}
function todasClases(plan){ const arr=[]; (plan.semanas||[]).forEach(s=>(s.dias||[]).forEach(d=>arr.push(d))); return arr; }
function clasePorId(plan, id){ return todasClases(plan).find(d=>d.id===id); }
function pctDia(claseId, tipo){
  const N = alumnosDe(S.docente.seccion);
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
  return {
    tipo:"derivado", id:"der-"+nivel+"-"+idx, nivel,
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
  let n = parseInt(aps[g+"|"+s]);
  if(!(n>0)) n = parseInt(aps[s]);
  return (n>0)? n : (S.docente.alumnos||24);
}
function diasDuracionPlan(plan){
  const ids = todasClases(plan||{}).map(d=>d.id).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)).sort();
  if(!ids.length) return (plan&&plan.semanas||[]).length*5 || 0;
  return diffDias(ids[0], ids[ids.length-1])+1;
}
function estadoMes(mesTxt){
  const m = parseMes(mesTxt);
  if(!m) return { k:"pend", t:"Pendiente" };
  const actual = HOY.slice(0,7);
  if(m < actual) return { k:"fin", t:"Terminado" };
  if(m === actual) return { k:"curso", t:"En curso" };
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
function planDiario(){
  const activo = planActivo();
  const lunes = lunesActual(); const domingo = new Date(lunes); domingo.setDate(lunes.getDate()+6);
  const enCurso = (activo.semanas||[]).find(s=>(s.dias||[]).some(d=>{ try{ const f=new Date(d.id+"T12:00"); return f>=lunes && f<=domingo; }catch(e){ return false; } }));
  if(enCurso) return { plan: activo, semana: enCurso, generado:false };
  const ym = HOY.slice(0,7);
  const nivel = S.docente.nivel;
  let u = null;
  if(activo.tipo==="derivado" && parseMes(activo.mes)===ym) u = activo;
  else {
    const anual = PLANES_ANUALES[nivel] || PLANES_ANUALES["Inicial"];
    const idx = anual.temas.findIndex(t=>parseMes(t.mes)===ym);
    if(idx>=0) u = unidadDerivada(anual===PLANES_ANUALES[nivel]? nivel : "Inicial", String(idx));
  }
  if(u){
    const dias = generarDiasDerivados(u);
    const wrapper = { tipo:"derivado", id:"der-diaria", nivel, titulo:u.titulo, mes:u.mes, tema:u.tema,
      semanas:[{ numero:1, tema:u.tema, fechas:"Semana en curso", dias }] };
    return { plan: wrapper, semana: wrapper.semanas[0], generado:true };
  }
  return { plan: activo, semana: null, generado:false };
}

/* ---------- NOTIFICACIONES ---------- */
function actualizarCampana(){
  const n = S.notificaciones.filter(x=>!x.leida).length;
  const b = $("badgeNotif");
  if(b){ b.textContent = n>99? "99+" : String(n); b.classList.toggle("visible", n>0); }
}
function pushNotif(texto, icono){
  if(S.notificaciones.some(x=>x.texto===texto)) return;
  S.notificaciones.unshift({ id: Date.now()+"-"+Math.random().toString(36).slice(2,6), texto, icono: icono||"campana", fecha: new Date().toISOString(), leida:false });
  if(S.notificaciones.length>60) S.notificaciones.pop();
  guardar(); actualizarCampana();
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
  if($("scr-info").classList.contains("visible")) renderInfo();
}
document.addEventListener("visibilitychange", ()=>{ if(!document.hidden && S.docente.id){ flush(); generarNotificaciones(); } });

/* ---------- NAVEGACIÓN ---------- */
let navStack = [];
const TITULOS = {
  anio:["Planificación anual","El plan anual de tu nivel educativo"],
  "anio-detalle":["",""],
  mes:["Planificación mensual","Unidades de aprendizaje por semestre"],
  "mes-detalle":["",""],
  diaria:["Planificación diaria","Planes diarios de la semana en curso"],
  clase:["",""],
  progreso:["Progreso y Libreta","Calificaciones y registro porcentual"],
  info:["Información y Ajustes","Tu perfil y sincronización"],
  notificaciones:["",""],
  onboarding:["Bienvenida","Regístrate para comenzar"],
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
  $("tituloApp").textContent = t; $("subtituloApp").textContent = s;
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
      if(scr==="mes"){ await cargarPlanes(); if(pantallaActual!==scr) return; }
      const y = window.scrollY||0;
      if(scr==="anio") renderAnio();
      else if(scr==="mes") renderMes();
      else if(scr==="diaria") renderDiaria();
      window.scrollTo(0,y);
    }catch(e){}
  }, 10000);
}

/* ---------- ONBOARDING ---------- */
function renderOnboarding(){
  $("scr-onboarding").innerHTML = `
  <div class="onb-hero">
    ${ic("logo",64,"#fff")}
    <h2>Planificación Docente RD</h2>
    <p>Docentes de Inicial, Primaria y Secundaria.<br>Currículo MINERD · La app se adapta a tu nivel.</p>
  </div>
  <div class="card">
    <h2>${ic("usuarios")} Regístrate</h2>
    <label class="lbl">Nombre del colegio o escuela</label>
    <input class="inp" id="onbColegio" placeholder="Ej: Colegio Reformado la Esperanza">
    <label class="lbl">Distrito educativo</label>
    <input class="inp" id="onbDistrito" placeholder="Ej: 10-01">
    <label class="lbl">Tu nombre completo</label>
    <input class="inp" id="onbNombre" placeholder="Ej: María Pérez">
    <label class="lbl">Nivel que impartes</label>
    <select class="inp" id="onbNivel" onchange="filtrarGrados()">
      <option value="Inicial" selected>Inicial</option>
      <option value="Primaria">Primaria</option>
      <option value="Secundaria">Secundaria</option>
    </select>
    <label class="lbl">Grado que impartes</label>
    <select class="inp" id="onbGrado"></select>
    <div id="filaAsignaturas" style="display:none">
      <label class="lbl">Asignaturas que impartes</label>
      <input class="inp" id="onbAsignaturas" placeholder="Ej: Lengua Española, Matemática">
    </div>
    <div style="display:none">
      <label class="lbl">Sección</label>
      <input class="inp" id="onbSeccion" placeholder="Ej: A" value="A">
    </div>
    <label class="lbl">Jornada del centro educativo</label>
    <select class="inp" id="onbJornada">
      <option value="Matutina" selected>Matutina</option>
      <option value="Vespertina">Vespertina</option>
      <option value="Nocturna">Nocturna</option>
      <option value="Jornada Extendida">Jornada Extendida</option>
    </select>
    <button class="dl grande" onclick="registrarDocente()">Crear mi cuenta</button>
  </div>
  <div class="card">
    <h2>${ic("nota")} ¿Ya estás registrado?</h2>
    <p class="muted" style="margin-bottom:10px">Ingresa el código que te dimos cuando te registraste.</p>
    <input class="inp" id="onbCodigo" placeholder="Tu código (ej: AB3K9Z)" style="text-transform:uppercase;letter-spacing:3px;text-align:center;font-weight:800">
    <button class="dl alt" onclick="entrarConCodigo()">Entrar con mi código</button>
  </div>`;
  filtrarGrados();
}
function filtrarGrados(){
  const nivel = $("onbNivel").value;
  $("onbGrado").innerHTML = GRADOS_POR_NIVEL[nivel].map(g=>`<option value="${esc(g)}">${esc(g)}${nivel!=="Inicial"? " ("+nivel+")":""}</option>`).join("");
  $("filaAsignaturas").style.display = nivel==="Inicial"? "none":"";
}
async function registrarDocente(){
  const colegio = $("onbColegio").value.trim();
  const distrito = $("onbDistrito").value.trim();
  const nombre = $("onbNombre").value.trim();
  const nivel = $("onbNivel").value;
  const grado = $("onbGrado").value;
  const seccion = $("onbSeccion").value.trim() || "A";
  const jornada = $("onbJornada").value;
  const asignaturas = ($("onbAsignaturas")? $("onbAsignaturas").value.trim() : "") || "";
  if(!colegio || !distrito || !nombre){ toast("Completa colegio, distrito y tu nombre"); return; }
  toast("Registrando...");
  try{
    const r = await apiAccion("onboarding", { colegio, distrito, nombre, nivel, grado, seccion, jornada, asignaturas });
    if(!r.success){ toast("Error: "+(r.error||"intenta de nuevo")); return; }
    S.docente = Object.assign({}, S.docente, { id:r.id, codigo:r.codigo, nombre, colegio, distrito, nivel, grado, seccion, jornada,
      asignaturasSel: asignaturas? asignaturas.split(/,\s*/).filter(Boolean) : [], secciones:[seccion] });
    guardar();
    await cargarPlanes();
    generarNotificaciones();
    toast("¡Bienvenida/o, "+nombre.split(" ")[0]+"! Tu código: "+r.codigo);
    irA("mes");
  }catch(e){ toast("Sin conexión. Verifica tu internet e intenta de nuevo."); }
}
async function entrarConCodigo(){
  const codigo = $("onbCodigo").value.trim().toUpperCase();
  if(!codigo){ toast("Escribe tu código"); return; }
  try{
    const r = await apiAccion("perfil", { codigo });
    if(!r.success){ toast("Código no encontrado"); return; }
    const p = r.perfil;
    S.docente.id = r.id; S.docente.codigo = r.codigo;
    S.docente.nombre = p.nombre_completo; S.docente.colegio = p.colegio;
    S.docente.distrito = p.distrito; S.docente.nivel = p.nivel; S.docente.grado = p.grado;
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
      ["asistencia","evaluacion","puntos","crono","tiempoClase","obs","notificaciones","vistosPlanes","lastSync"].forEach(k=>{
        if(remoto[k]!==undefined) S[k] = remoto[k];
      });
      if(remoto.ui) S.ui = Object.assign({}, S.ui, remoto.ui);
      if(remoto.docente){
        if(remoto.docente.foto) S.docente.foto = remoto.docente.foto;
        if(Array.isArray(remoto.docente.recursos)) S.docente.recursos = remoto.docente.recursos;
      }
      if(!S.docente.foto) S.docente.foto = fotoPerfilActual;
    }
    if(!S.ui.progGrado) S.ui.progGrado = S.docente.grado;
    if(!S.ui.progSec) S.ui.progSec = S.docente.seccion;
    guardar();
    await cargarPlanes();
    generarNotificaciones();
    actualizarFotoTopbar();
    toast("¡Hola de nuevo, "+S.docente.nombre.split(" ")[0]+"! Datos sincronizados");
    irA("diaria");
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
    <h2>Delega</h2>
    <p class="eslogan">Tu agente administrativo</p>
    <p>Planificación anual ${ANIO_ESCOLAR} · Nivel ${esc(nivel)}</p>
    <div class="row">
      <div class="ringbox">${ring(100,56,7,"#fff","1")}<small>Anual</small></div>
      <div class="ringbox">${ring(100,56,7,"#FFD6DB",String(info.temas.length))}<small>Unidad</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff",String(info.temas.length*4))}<small>Semana</small></div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("plan")} Tu perfil docente</h2>
    <div class="stat-row"><span>Colegio</span><b>${esc(S.docente.colegio)}</b></div>
    <div class="stat-row"><span>Distrito</span><b>${esc(S.docente.distrito)}</b></div>
    <div class="stat-row"><span>Nivel / Grado</span><b>${esc(nivel)} · ${esc(S.docente.grado)}</b></div>
    <div class="stat-row"><span>Jornada</span><b>${esc(S.docente.jornada||"—")}</b></div>
  </div>
  <h2 class="mini">Tu plan anual</h2>
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
      <div class="kv"><b>Distrito</b><span>Distrito ${esc(S.docente.distrito||"—")}</span></div>
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
  <button class="dl grande" onclick="descargarPlanAnualDocx('${esc(nivel)}')">${ic("descarga")} Descargar plan anual en Word</button>
  <div style="height:14px"></div>`;
  $("scr-anio-detalle").innerHTML = html;
}

/* ---------- RENDER: MES ---------- */
function planesMensuales(){
  const nivel = S.docente.nivel;
  const arr = [];
  PLANES_ANUALES[nivel].temas.forEach((m,i)=>{
    if(nivel==="Inicial" && /septiembre/i.test(m.mes)){
      arr.push({ id:"local-mariposa", titulo:PLAN_MARIPOSA.titulo, mes:PLAN_MARIPOSA.mes, tema:PLAN_MARIPOSA.tema, nSem:(PLAN_MARIPOSA.semanas||[]).length, detallado:true, propio:false });
    } else {
      arr.push({ id:"der-"+nivel+"-"+i, titulo:m.tema, mes:m.mes, tema:m.tema, nSem:4, detallado:false, propio:false });
    }
  });
  (S.listaPlanes||[]).forEach(p=>arr.push({ id:p.id, titulo:p.titulo, mes:p.mes, tema:p.tema, nSem:p.semanas||0, detallado:true, propio:p.propio }));
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
    <h2>Delega</h2>
    <p class="eslogan">Tu agente administrativo</p>
    <p>Planificación mensual · Unidades de aprendizaje del nivel ${esc(S.docente.nivel)}</p>
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
    if(!lista.length) html += `<p class="vacio">Aún no hay planes para este semestre.</p>`;
  };
  html += `<div class="sep">1er Semestre · Agosto a Diciembre</div>`;
  pintar(unicos.filter(p=>semestreDe(p.mes)==="1er"));
  html += `<div class="sep">2do Semestre · Enero a Junio</div>`;
  pintar(unicos.filter(p=>semestreDe(p.mes)==="2do"));
  html += `<button class="dl grande" onclick="descargarAsistenciaTrimPdf()">${ic("descarga")} Asistencia del trimestre</button>
  <button class="dl alt" onclick="descargarEvaluacionTrimPdf()">${ic("descarga")} Evaluación del trimestre</button>
  <div style="height:14px"></div>`;
  $("scr-mes").innerHTML = html;
}
async function refrescarPlanes(){
  toast("Buscando planes nuevos...");
  await cargarPlanes();
  generarNotificaciones();
  renderMes();
  toast("Planes actualizados");
}
async function abrirPlan(id){
  toast("Cargando plan...");
  const plan = await obtenerPlan(id);
  if(!plan){ toast("No se pudo cargar el plan"); return; }
  irA("mes-detalle", plan);
}

/* ---------- RENDER: MES DETALLE (unidad de aprendizaje MINERD) ---------- */
let planAbierto = null;
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
      <div class="kv"><b>Docente</b><span>${esc(S.docente.nombre||"—")}</span></div>
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
      <div class="kv"><b>Tema</b><span>${esc(plan.tema||"")}</span></div>
      ${(plan.areas||[]).length? `<div class="kv"><b>Áreas</b><span>${esc((plan.areas||[]).join(", "))}</span></div>`:""}
      ${(plan.ciclo&&plan.ciclo.titulo)? `<div class="kv"><b>Ciclo</b><span>${esc(plan.ciclo.titulo)}</span></div>`:""}
      `}
    </div>
  </div>
  <div class="card">
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
    ${(plan.areas||[]).length? `<h3>Áreas curriculares</h3>${(plan.areas||[]).map(a=>`<span class="chip roja">${esc(a)}</span>`).join("")}`:""}
  </div>
  <div class="card">
    <h2>${ic("lista")} 4. Secuencia didáctica</h2>`;
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
    const semanasInv = [...(plan.semanas||[])].reverse();
    semanasInv.forEach(s=>{
      const dias = s.dias||[];
      const pctW = dias.length? Math.round(dias.reduce((a,d)=>a+pctDia(d.id,"asis"),0)/dias.length) : 0;
      html += `<div class="item" onclick="abrirClase('${dias[dias.length-1].id}')">
        <div class="ic">${ic("lista")}</div>
        <div class="tx"><b>Semana ${s.numero} · ${esc(s.tema)}</b><span>${esc(s.fechas)} · ${dias.length} clases diarias</span></div>
        <div class="rg">${ring(pctW,46,6,"#0033A0")}</div>
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
  }
  html += `
  </div>
  <button class="dl grande" onclick="descargarUnidadDocx()">${ic("descarga")} Descargar unidad en Word (.docx)</button>
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
  const N = alumnosDe(S.ui.libSec||S.docente.seccion||"A");
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
  return { t: nombreDiaDe(id), cls:"pasada" };
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
    <h2>Delega</h2>
    <p class="eslogan">Tu agente administrativo</p>
    <p>Planificación diaria · ${totalPlan} clases del plan mensual en curso${w.generado? " · Generado desde tu plan mensual de este mes":""}. Toca una clase para registrar asistencia y logros.</p>
    <div class="row">
      <div class="ringbox">${ring(100,56,7,"#fff", String(totalPlan))}<small>Clases</small></div>
      <div class="ringbox">${ring(100,56,7,"#FFD6DB", String(dias.filter(d=>d.id===HOY).length))}<small>Hoy</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff", String(dias.filter(d=>d.id===sumarDias(HOY,1)).length))}<small>Mañana</small></div>
    </div>
  </div>`;
  if(!ordenados.length){
    html += `<p class="vacio">Tu plan activo no tiene clases diarias.<br>Pídele a Delega tu plan detallado con clases diarias.</p>`;
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
function renderClase(claseId){
  const plan = planAbierto || planActivo();
  const d = clasePorId(plan, claseId);
  if(!d){ irA("mes"); return; }
  claseActualId = claseId;
  guiaActual = { titulo:"Guía técnica · Planificación diaria", html: guiaClase() };
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
    <div class="mcard" style="margin-top:12px">
      <div class="kv"><b>Fecha</b><span>${esc(claseId)}</span></div>
      <div class="kv"><b>Nivel / Grado</b><span>${esc(S.docente.nivel)} · ${esc(S.docente.grado)}</span></div>
      <div class="kv"><b>Sección</b><span>${esc(S.docente.seccion)}</span></div>
      <div class="kv"><b>Asignaturas</b><span>${esc(S.docente.asignaturasSel.join(", ")||S.docente.nivel)}</span></div>
      <div class="kv"><b>Docente</b><span>${esc(S.docente.nombre||"—")}</span></div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("objetivo")} Intención pedagógica e indicadores</h2>
    ${(d.desempenos||[]).map(x=>`<p style="font-size:13px;margin-bottom:6px">✓ ${esc(x)}</p>`).join("")}
    <h3>Indicador de logro de la sesión</h3>
    <p class="muted">${esc((d.desempenos||[])[0]||"—")}</p>
    <h3>Estrategias de enseñanza-aprendizaje</h3>
    <div><span class="chip">Indagación dialógica</span><span class="chip">Socialización</span><span class="chip">Recuperación de saberes previos</span></div>
    <div style="margin-top:8px">${COMPETENCIAS.slice(0,3).map(c=>`<span class="chip roja">${esc(c.n)}</span>`).join("")}</div>
  </div>
  ${S.docente.duracionMin? `<p class="vacio" style="padding:4px">Momentos ajustados a tu clase de ${S.docente.duracionMin} min (cámbialo en Info).</p>`:""}
  <div class="card">
    <h2>${ic("reloj")} Cronómetro de la clase</h2>
    <p class="muted" style="margin-bottom:8px;font-size:12.5px">Cronometra cada momento o la clase completa. Si sales o recargas, el tiempo queda guardado tal como lo dejaste.</p>
    ${temporizadorHTML(durs.length? durs : null)}
  </div>
  <h2 class="mini">Momentos de la clase</h2>
  ${momentos.map((m,i)=>`
    <div class="momento">
      <div class="m-head" onclick="abrirMomento(${i})" title="Ver cómo desarrollar este momento">
        <div class="m-num">${i+1}</div><b>${esc(m.nombre)}</b>
        <span class="dur">${ic("reloj",12)} ${esc(duracionAjustada(m, baseTotal))}</span>
        <span class="m-ver" title="Toca para ver la guía del momento">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.5" r="0.8" fill="currentColor"/></svg>
        </span>
      </div>
      <p class="prop">Propósito: ${esc(m.proposito)}</p>
      <ol>${(m.pasos||[]).map(p=>`<li>${esc(p)}</li>`).join("")}</ol>
    </div>`).join("")}
  <div class="card">
    <h2>${ic("etiqueta")} Recursos y evaluación</h2>
    ${(d.recursos||[]).map(r=>`<span class="chip roja">${esc(r)}</span>`).join("")}
    <div class="nota" style="margin-top:10px"><b>Evaluación</b>Tipo: formativa diaria · Instrumento: observación con lista de cotejo y registro de logros.</div>
    ${(d.orientacion||"").length? `<div class="nota" style="margin-top:10px"><b>${ic("bombilla")} Orientaciones pedagógicas</b>${esc(d.orientacion)}</div>`:""}
  </div>
  <div class="card">
    <div style="display:flex;align-items:center;gap:8px">
      <h2 style="flex:1;margin-bottom:0">${ic("usuarios")} Registro del día · ${alumnosDe(S.docente.seccion)} alumnos</h2>
      <button class="btn-colapsa" id="btnColapsa" onclick="toggleRegistro()" title="Desplegar lista">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>
    <div class="colapso" id="zonaRegistro">
      <div>
        <div class="tabs" style="margin-top:12px">
          <div class="tab sel" id="tabA" onclick="tabClase('A')">Asistencia</div>
          <div class="tab" id="tabE" onclick="tabClase('E')">Evaluación</div>
        </div>
        <div id="zonaA">${alumnosHTML(claseId,"A")}</div>
        <div id="zonaE" style="display:none">${alumnosHTML(claseId,"E")}</div>
      </div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("nota")} Nota de observación del día</h2>
    <textarea class="obs" id="obsTxt" placeholder="Registra aquí lo más relevante del día: logros, dificultades, situaciones del grupo...">${esc(S.obs[claseId]||"")}</textarea>
    <p class="muted" style="margin-top:6px">Se guarda automáticamente y se sincroniza con la dirección.</p>
  </div>
  <button class="dl alt" onclick="descargarAsistenciaDiaPdf('${claseId}')">${ic("descarga")} Descargar asistencia en PDF</button>
  <button class="dl alt" onclick="descargarEvaluacionPdf('${claseId}')">${ic("descarga")} Descargar logros en PDF</button>
  <button class="dl" onclick="descargarPlanDiarioDocx('${claseId}')">${ic("descarga")} Descargar plan diario en Word (.docx)</button>
  <div style="height:14px"></div>`;
  $("scr-clase").innerHTML = html;
  initTimer(durs.length? durs : null);
  $("obsTxt").addEventListener("input", ()=>{
    S.obs[claseId] = $("obsTxt").value;
    guardar();
    clearTimeout(window._obsT);
    window._obsT = setTimeout(()=>{ encolar("observacion", claseId, null, S.obs[claseId]); toast("Observación sincronizada"); }, 1500);
  });
}
function alumnosHTML(claseId, tipo){
  const N = alumnosDe(S.docente.seccion);
  const reg = (tipo==="A"? S.asistencia : S.evaluacion)[claseId]||{};
  let html = "";
  for(let i=1;i<=N;i++){
    const st = reg[i]||null;
    if(tipo==="A"){
      html += `<div class="alumno"><div class="an">${i}</div><div class="anx">Alumno ${i}</div>
        <div class="seg">
          <button class="${st==="Presente"?"selP":""}" title="Presente" onclick="marcar('A','${claseId}',${i},'Presente')">P</button>
          <button class="${st==="Tarde"?"selT":""}" title="Tarde" onclick="marcar('A','${claseId}',${i},'Tarde')">T</button>
          <button class="${st==="Ausente"?"selA":""}" title="Ausente" onclick="marcar('A','${claseId}',${i},'Ausente')">A</button>
        </div></div>`;
    } else {
      html += `<div class="alumno"><div class="an">${i}</div><div class="anx">Alumno ${i}</div>
        <div class="seg">
          <button class="${st==="Logrado"?"selL":""}" title="Logrado" onclick="marcar('E','${claseId}',${i},'Logrado')">L</button>
          <button class="${st==="En proceso"?"selEP":""}" title="En proceso" onclick="marcar('E','${claseId}',${i},'En proceso')">E</button>
          <button class="${st==="Iniciando"?"selA":""}" title="Iniciando" onclick="marcar('E','${claseId}',${i},'Iniciando')">I</button>
        </div></div>`;
    }
  }
  return html;
}
function ringDuo(claseId){
  return `<div class="ringitem">${ring(pctDia(claseId,"asis"),44,5,"#0033A0")}<small>Presentes</small></div>
  <div class="ringitem">${ring(pctDia(claseId,"eval"),44,5,"#CE1126")}<small>Logrado</small></div>`;
}
function marcar(tipo, claseId, n, valor){
  const mapa = tipo==="A"? S.asistencia : S.evaluacion;
  if(!mapa[claseId]) mapa[claseId] = {};
  mapa[claseId][n] = valor;
  if(valor===null) delete mapa[claseId][n];
  guardar();
  encolar(tipo==="A"?"asistencia":"evaluacion", claseId, { alumno:"Alumno "+n, estado: valor||"Sin registrar" });
  toast("Alumno "+n+": "+(valor||"Sin registrar"));
  if(!$("scr-clase").classList.contains("visible")) return;
  if(tipo==="A") $("zonaA").innerHTML = alumnosHTML(claseId,"A");
  else $("zonaE").innerHTML = alumnosHTML(claseId,"E");
  const el = $("headRings");
  if(el) el.innerHTML = ringDuo(claseId);
}
function toggleRegistro(){
  $("zonaRegistro").classList.toggle("abierta");
  $("btnColapsa").classList.toggle("abierto");
}
function tabClase(t){
  $("tabA").classList.toggle("sel", t==="A");
  $("tabE").classList.toggle("sel", t==="E");
  $("zonaA").style.display = t==="A"?"":"none";
  $("zonaE").style.display = t==="E"?"":"none";
}

/* ---------- TEMPORIZADOR ---------- */
function temporizadorHTML(durs){
  durs = (durs && durs.length)? durs : [5,10,15];
  const btns = durs.map((m,i)=>`<button class="dur-btn ${i===0?"sel":""}" onclick="setDur(${m},this)">${m} min</button>`).join("");
  return `
  <div class="timer-wrap" id="timerBox">
    <div class="timer-ring">
      <svg width="96" height="96">
        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(0,51,160,.12)" stroke-width="8"/>
        <circle id="timerRing" cx="48" cy="48" r="40" fill="none" stroke="#CE1126" stroke-width="8"
          stroke-linecap="round" stroke-dasharray="${2*Math.PI*40}" stroke-dashoffset="0"/>
      </svg>
      <div class="t-txt"><b id="timerTxt">${String(Math.floor((durs[0]*60)/60)).padStart(2,"0")}:00</b><small id="timerEstado">Listo</small></div>
    </div>
    <div class="timer-ctrl">
      <div class="timer-durs">${btns}</div>
      <div class="timer-btns">
        <button class="btn-soft" id="btnPlay" onclick="playTimer()">${ic("play",14)} Iniciar</button>
        <button class="btn-soft" onclick="resetTimer()">${ic("reiniciar",14)} Reiniciar</button>
      </div>
    </div>
  </div>`;
}
const CIRC = 2*Math.PI*40;
let T = { dur:300, resta:300, corriendo:false, iv:null };
let claseActualId = null;
function cronoGuarda(){
  if(!claseActualId) return;
  if(!S.crono) S.crono = {};
  S.crono[claseActualId] = { dur: T.dur, resta: T.resta };
}
function setDur(min, btn){
  document.querySelectorAll(".dur-btn").forEach(b=>b.classList.remove("sel"));
  btn.classList.add("sel");
  T.dur = min*60; T.resta = T.dur; T.corriendo = false;
  clearInterval(T.iv); pintarTimer(); $("timerEstado").textContent="Listo";
  $("btnPlay").innerHTML = ic("play",14)+" Iniciar";
  $("timerBox").classList.remove("timer-corriendo");
  cronoGuarda();
}
function pintarTimer(){
  const m = Math.floor(T.resta/60), s = T.resta%60;
  $("timerTxt").textContent = String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  $("timerRing").style.strokeDashoffset = CIRC*(1-T.resta/T.dur);
}
function playTimer(){
  if(T.corriendo){
    T.corriendo=false; clearInterval(T.iv); cronoGuarda();
    $("btnPlay").innerHTML = ic("play",14)+" Continuar"; $("timerEstado").textContent="En pausa";
    $("timerBox").classList.remove("timer-corriendo");
    return;
  }
  if(T.resta<=0) T.resta = T.dur;
  T.corriendo=true; $("btnPlay").innerHTML = ic("pausa",14)+" Pausar"; $("timerEstado").textContent="¡Corriendo!";
  $("timerBox").classList.add("timer-corriendo");
  T.iv = setInterval(()=>{
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
      beepFuerte();
      try{ if(navigator.vibrate) navigator.vibrate([400,200,400,200,600]); }catch(e){}
      toast("¡Se acabó el tiempo del momento!");
    }
  },1000);
}
function resetTimer(){
  clearInterval(T.iv); T.corriendo=false; T.resta=T.dur;
  pintarTimer(); $("btnPlay").innerHTML = ic("play",14)+" Iniciar"; $("timerEstado").textContent="Listo";
  $("timerBox").classList.remove("timer-corriendo");
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
function initTimer(durs){
  const d = (durs && durs.length)? durs[0]*60 : 300;
  T={dur:d,resta:d,corriendo:false,iv:null};
  const g = claseActualId && S.crono && S.crono[claseActualId];
  if(g && g.dur){ T.dur = g.dur; T.resta = Math.max(0, g.resta); }
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
  abrirGuia();
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
function abrirHistorial(n, fuente){
  histActual = { n, fuente };
  const grupo = grupoProg();
  const periodoSel = PERIODOS[(parseInt(S.ui.histFiltro)||numDePeriodo(S.docente.periodo))-1] || S.docente.periodo;
  $("histTitulo").textContent = "Calificaciones · Alumno "+n;
  $("histSub").textContent = "Promedios por asignatura y periodo · desliza hacia los lados";
  const asigs = asignaturasVista();
  const ancho = Math.max(1, asigs.length);
  const rings = asigs.map(a=>{
    const v = notaAsig(n, a, periodoSel);
    const color = v===null? "#94a3b8" : (v>=70? "#0033A0" : "#CE1126");
    return `<div class="ringbox2">${ring(v===null?0:v,64,7,color, v===null? "—":String(v))}<small>${esc(a.length>20? a.slice(0,19)+"…" : a)}</small></div>`;
  }).join("");
  const NUMS = ["1er","2do","3er","4to"];
  const chips = PERIODOS.map((p,i)=>`<span class="chip chip-mini ${periodoSel===p?"sel":""}" onclick="filtrarHist('${i+1}')">${NUMS[i]} periodo</span>`).join("");
  let arr = puntosDe(grupo, n).slice();
  arr = arr.filter(x=>trimDeFecha(x.f)===periodoSel);
  const filas = arr.length? arr.map(x=>`
    <div class="g-paso"><b>${esc(fmtFechaLinda(x.f))} · ${esc(x.asig||"General")} · ${esc(TIPOS_PUNTO[x.tipo]||x.tipo)} · ${x.pts} pts</b>
    <span>${x.com? esc(x.com) : "Sin comentario"}</span></div>`).join("")
    : `<p class="g-intro">Sin registros en ${esc(periodoSel)} todavía.</p>`;
  const esInicial = S.docente.nivel==="Inicial";
  $("histCuerpo").innerHTML = `
  <div class="hscroll rings-scroll">${rings}</div>
  <div class="g-chips hscroll g-chips-centro" style="margin-bottom:10px">${chips}</div>
  <h3 class="hist-sep">Registrar un punto</h3>
  <div class="hist-grid">
    ${esInicial? "" : `
    <div><label class="lbl">Asignatura</label>
      <select class="inp" id="hpAsig">
        ${asigs.filter(a=>a!=="General").concat(asigs.includes("General")?["General"]:[]).map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join("")}
      </select></div>
    <div><label class="lbl">Tipo</label>
      <select class="inp" id="hpTipo">
        <option value="P">Participación</option>
        <option value="T">Trabajo</option>
        <option value="E">Exámenes</option>
      </select></div>`}
    <div><label class="lbl">Puntos (0 a 100)</label><input type="number" min="0" max="100" class="inp" id="hpPts" placeholder="Ej. 85"></div>
    <div><label class="lbl">Comentario</label><input type="text" class="inp" id="hpCom" placeholder="¿Por qué? (opcional)"></div>
  </div>
  <p class="muted" style="font-size:11.5px;margin-top:4px">El punto se registra con la fecha de hoy (${esc(fmtFechaLinda(HOY))}) en ${esc(periodoSel)}.</p>
  <div class="hist-sticky"><button class="dl grande" style="margin:0" onclick="registrarPunto()">${ic("cuaderno")} Registrar punto</button></div>
  <h3 class="hist-sep">Historial de puntos · ${esc(periodoSel)}</h3>
  ${filas}
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
  const esInicial = S.docente.nivel==="Inicial";
  const asig = esInicial? "Asignatura integrada" : ($("hpAsig")? ($("hpAsig").value||"General") : "General");
  const tipo = esInicial? "P" : ($("hpTipo")? $("hpTipo").value : "P");
  const pv = parseFloat($("hpPts").value);
  if(isNaN(pv) || pv<0 || pv>100){ toast("Escribe los puntos entre 0 y 100"); return; }
  const pts = Math.round(pv);
  const com = $("hpCom").value||"";
  const grupo = grupoProg();
  const arr = puntosDe(grupo, n);
  const ex = arr.find(x=>x.f===f && x.tipo===tipo && (x.asig||"General")===asig);
  if(ex){ ex.pts = pts; if(com) ex.com = com; }
  else arr.push({ f, tipo, pts, com, asig });
  arr.sort((a,b)=> a.f<b.f? 1 : -1);
  guardar();
  abrirHistorial(n, "progreso");
  if($("scr-progreso").classList.contains("visible")) renderProgreso();
  toast("Punto de "+asig+" registrado para Alumno "+n);
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
    <h2>Delega</h2>
    <p class="eslogan">Tu agente administrativo</p>
    <p>Progreso · Calificaciones de ${esc(S.docente.periodo)} · Grado ${esc(g)} · Sección ${esc(sc)}</p>
    <div class="row">
      <div class="ringbox">${ring(promedioGrupo(),56,7,"#fff")}<small>Promedio</small></div>
      <div class="ringbox">${ring(pctMes(plan,"asis"),56,7,"#FFD6DB")}<small>Asistencia</small></div>
      <div class="ringbox">${ring(pctMes(plan,"eval"),56,7,"#fff")}<small>Logros</small></div>
    </div>
  </div>`;
}
function htmlProgresoPanel(){
  const nivel = S.docente.nivel;
  const g = S.ui.progGrado || S.docente.grado;
  const sc = S.ui.progSec || S.docente.seccion || "A";
  const N = alumnosDe(sc);
  let html = `
  <div class="card">
    <h2>${ic("boletin")} Filtrar por grupos</h2>
    <div class="grid-2col">
      <div><label class="lbl">Grado</label>
        <select class="inp" id="progGrado" onchange="progSel('grado')">
          ${GRADOS_POR_NIVEL[nivel].map(x=>`<option value="${esc(x)}" ${x===g?"selected":""}>${esc(x)}</option>`).join("")}
        </select></div>
      <div><label class="lbl">Sección</label>
        <select class="inp" id="progSec" onchange="progSel('sec')">
          ${SECCIONES.map(x=>`<option value="${esc(x)}" ${x===sc?"selected":""}>Sección ${esc(x)}</option>`).join("")}
        </select></div>
    </div>
  </div>
  <h2 class="mini">Calificación por alumno · Grado ${esc(g)} · Sección ${esc(sc)}</h2>`;
  for(let i=1;i<=N;i++){
    const nf = notaDe(i);
    const k = nf===null? "—" : escalaDe(nf);
    const color = nf===null? "#94a3b8" : (nf>=70? "#0033A0" : "#CE1126");
    const asis = asistenciaDe(i);
    html += `<div class="prog-card">
      <div class="pc-top" onclick="abrirHistorial(${i},'progreso')" title="Ver promedios y registrar puntos">
        <div class="an an-persona">${ic("persona",14)}</div>
        <div class="pc-nombre">Alumno ${i}</div>
        <span class="escala ${nf===null?"":k}">${nf===null? "Sin calificar" : esc(escalaTexto(k))}</span>
        <div class="rg">
          <div class="ring-duo">${ring(nf===null?0:nf,46,5,color, nf===null? "—":String(nf))}
          ${ring(asis===null?0:asis,46,5,asis===null? "#94a3b8":"#0033A0", asis===null? "—":String(asis))}</div>
        </div>
      </div>
      <div class="pc-bottom">
        <button class="dl dl-chico dl-gris" onclick="abrirHistorial(${i},'progreso')">${ic("cuaderno",14)} Registrar puntos</button>
        <button class="btn-mini" title="Reporte individual" onclick="descargarBoletinIndividual(${i})">${ic("descarga",15)}</button>
      </div>
    </div>`;
  }
  html += `<button class="dl grande" onclick="descargarBoletinGrupo()">${ic("descarga")} Descargar boletín del grupo en PDF</button>
  <div style="height:14px"></div>`;
  return html;
}
function renderProgreso(){
  let html = htmlProgresoHero();
  html += htmlProgresoPanel();
  $("scr-progreso").innerHTML = html;
}
function progSel(q){
  if(q==="grado") S.ui.progGrado = $("progGrado").value;
  if(q==="sec") S.ui.progSec = $("progSec").value;
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
  if(S.notificaciones.length){
    html += `<button class="dl alt" onclick="borrarNotificaciones()">Borrar todas las notificaciones</button>`;
  }
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
function renderInfo(){
  const pend = S.cola.length;
  const ult = S.lastSync? new Date(S.lastSync).toLocaleString("es-DO") : "Aún no sincroniza";
  const durH = Math.floor((S.docente.duracionMin||0)/60), durM = (S.docente.duracionMin||0)%60;
  const nivel = S.docente.nivel;
  const asigs = ASIGNATURAS_RD[nivel] || [];
  const secs = S.docente.secciones.length? S.docente.secciones : [S.docente.seccion||"A"];
  $("scr-info").innerHTML = `
  <div class="hero"><h2>Delega</h2>
    <p class="eslogan">Tu agente administrativo</p>
    <p>Perfil del docente · ${esc(S.docente.nombre)} · ${esc(S.docente.colegio)}</p></div>
  <div class="card">
    <h2>${ic("usuarios")} Foto de perfil</h2>
    <div style="display:flex;align-items:center;gap:12px">
      <img id="prevFoto" src="${S.docente.foto||""}" style="${S.docente.foto?"":"display:none"};width:60px;height:60px;border-radius:50%;object-fit:cover;border:3px solid rgba(0,51,160,.15)">
      <div style="flex:1">
        <p class="muted" style="margin-bottom:8px">Tu foto aparece en el encabezado de la app. Se guarda en tu dispositivo.</p>
        <input type="file" id="inpFoto" accept="image/*" style="display:none" onchange="subirFotoPerfil(event)">
        <button class="btn-soft" style="flex:0 0 auto;padding:8px 14px" onclick="$('inpFoto').click()">${ic("refrescar")} ${S.docente.foto? "Cambiar foto":"Subir foto de perfil"}</button>
      </div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("usuarios")} Datos registrados</h2>
    <div class="stat-row"><span>Nombre</span><b>${esc(S.docente.nombre)}</b></div>
    <div class="stat-row"><span>Colegio</span><b>${esc(S.docente.colegio)}</b></div>
    <div class="stat-row"><span>Distrito</span><b>${esc(S.docente.distrito)}</b></div>
    <div class="stat-row"><span>Nivel / Grado</span><b>${esc(nivel)} · ${esc(S.docente.grado)}</b></div>
    <div class="stat-row"><span>Sección / Alumnos</span><b>${esc(S.docente.seccion)} · ${S.docente.alumnos}</b></div>
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
      <select class="inp" id="selGradoGS" style="flex:1">
        ${(GRADOS_POR_NIVEL[nivel]||[]).map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join("")}
      </select>
      <select class="inp" id="selSeccionGS" style="flex:0 0 auto;width:86px">
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
    <h2>${ic("reloj")} Duración de mis clases</h2>
    <p class="muted" style="margin-bottom:10px">Define cuánto dura tu clase. La app reparte los minutos de cada momento de la clase de forma proporcional.</p>
    <div style="display:flex;gap:8px;align-items:center">
      <input class="inp" id="inpDurH" type="number" min="0" max="8" placeholder="horas" value="${durH}" style="text-align:center">
      <span style="font-weight:800;color:var(--tinta-suave)">h</span>
      <input class="inp" id="inpDurM" type="number" min="0" max="59" placeholder="minutos" value="${durM}" style="text-align:center">
      <span style="font-weight:800;color:var(--tinta-suave)">min</span>
    </div>
    <button class="dl" onclick="guardarDuracion()">Guardar duración</button>
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
    <h2>${ic("refrescar")} Sincronización automática</h2>
    <div class="stat-row"><span><span class="punto" style="background:${pend?"#f59e0b":"#10b981"}"></span>Estado</span><b>${pend? pend+" pendiente(s) en cola":"Todo sincronizado"}</b></div>
    <div class="stat-row"><span>Última sincronización</span><b>${esc(ult)}</b></div>
    <button class="dl" onclick="flush(); toast('Sincronizando...')">${ic("refrescar")} Sincronizar ahora</button>
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
    const i = S.docente.asignaturasSel.indexOf(valor);
    if(i>=0) S.docente.asignaturasSel.splice(i,1); else S.docente.asignaturasSel.push(valor);
  } else {
    if(!Array.isArray(S.docente.secciones)) S.docente.secciones = [];
    const i = S.docente.secciones.indexOf(valor);
    if(i>=0) S.docente.secciones.splice(i,1); else S.docente.secciones.push(valor);
  }
  guardar();
  renderInfo();
}
function agregarGS(){
  const g = $("selGradoGS").value, s = $("selSeccionGS").value;
  if(!g){ toast("Selecciona un grado"); return; }
  if(!Array.isArray(S.docente.gradosSecciones)) S.docente.gradosSecciones = [];
  if(S.docente.gradosSecciones.includes(g+"|"+s)){ toast("Ese grupo ya está agregado"); return; }
  S.docente.gradosSecciones.push(g+"|"+s);
  S.docente.secciones = [...new Set(S.docente.gradosSecciones.map(x=>x.split("|")[1]))];
  guardar();
  renderInfo();
  toast("Grupo agregado: "+g+" · "+s);
}
function quitarGS(gs){
  S.docente.gradosSecciones = (S.docente.gradosSecciones||[]).filter(x=>x!==gs);
  S.docente.secciones = [...new Set(S.docente.gradosSecciones.map(x=>x.split("|")[1]))];
  guardar();
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
  if(!confirm("¿Borrar asistencias, evaluaciones, calificaciones, libreta y observaciones guardadas en este dispositivo?")) return;
  S.asistencia={}; S.evaluacion={}; S.tiempoClase={}; S.obs={}; S.calificaciones={}; S.libreta={}; guardar();
  toast("Datos locales borrados"); renderInfo();
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
function confirmarCierre(){
  cerrarConfCierre();
  cerrarSesion();
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
  S = Object.assign({}, def, { asistencia:{}, evaluacion:{}, obs:{}, calificaciones:{}, libreta:{}, puntos:{}, crono:{}, tiempoClase:{}, cola:[], planesCache:{}, listaPlanes:null, notificaciones:[] });
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
  const TOTAL = 9000;
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
    const doc = new D.Document({ sections:[{ children:[
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
      h2docx(D, "2.3 Contenidos dosificados"),
      tblDocx(D, ["Tipo","Contenidos"], [
        ["Conceptuales (Saber)", info.temas.map(t=>t.mes+": "+t.contenidos).join(" | ")],
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
    if(esDerivado){
      children.push(tblDocx(D, ["Componente","Descripción"], [
        ["Escenario", plan.situacion.escenario],
        ["Problema o reto", plan.situacion.reto],
        ["Estrategia", plan.situacion.estrategia],
        ["Producto final", plan.situacion.producto],
      ]));
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
    const doc = new D.Document({ sections:[{ children }]});
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
      ]),
      h2docx(D, "2. Los tres momentos de la clase"),
      tblDocx(D, ["Momento","Tiempo","Propósito","Actividades"],
        momentos.map(m=>[m.nombre, duracionAjustada(m, baseTotal), m.proposito, (m.pasos||[]).join(" ")])),
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
    const N = alumnosDe(S.docente.seccion);
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
function descargarBoletinGrupo(fuente){
  try{
    const dt = datosBoletin(fuente||"progreso");
    const N = alumnosDe(dt.seccion);
    const doc = new jspdf.jsPDF();
    cabeceraPdf(doc, dt.titulo,
      "Nivel "+S.docente.nivel+" · Grado "+dt.grado+" · Sección "+dt.seccion+" · Docente: "+(S.docente.nombre||"—")+" · "+ANIO_ESCOLAR);
    let y = 48;
    doc.setFillColor(0,51,160); doc.rect(14, y-5, 182, 7, "F");
    doc.setTextColor(255); doc.setFontSize(8.5);
    doc.text("Alumno", 17, y); doc.text("Part.", 95, y); doc.text("Trab.", 118, y);
    doc.text("Examen", 141, y); doc.text("Final", 165, y); doc.text("Escala", 182, y);
    y += 10;
    let sum=0, cont=0;
    for(let i=1;i<=N;i++){
      if(y>280){ doc.addPage(); y=25; }
      const c = dt.store[i]||{};
      const nf = c? notaFinalDe(c.p,c.t,c.e) : null;
      if(nf!==null){ sum+=nf; cont++; }
      const esc2 = nf===null? "—" : escalaDe(nf);
      doc.setTextColor(nf===null?120:(nf>=70?0:206), nf===null?120:(nf>=70?51:17), nf===null?120:(nf>=70?160:38));
      doc.setFontSize(9.5);
      doc.text("Alumno "+String(i).padStart(2,"0"), 17, y);
      doc.text(c.p!==undefined? String(c.p):"—", 98, y);
      doc.text(c.t!==undefined? String(c.t):"—", 121, y);
      doc.text(c.e!==undefined? String(c.e):"—", 144, y);
      doc.setFontSize(10.5); doc.setFont(undefined,"bold");
      doc.text(nf===null? "—": String(nf), 166, y);
      doc.setFontSize(9); doc.setFont(undefined,"normal");
      doc.text(esc2, 184, y);
      y += 8;
    }
    y += 4;
    const prom = cont? Math.round(sum/cont) : 0;
    doc.setFontSize(11); doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
    doc.text("Promedio del grupo: "+prom+"/100 · "+escalaTexto(escalaDe(prom)), 14, Math.min(y,288));
    doc.setFontSize(8); doc.setTextColor(120); doc.setFont(undefined,"normal");
    doc.text("Escala MINERD: L = Logrado (90-100) · EP = En proceso (70-89) · I = Iniciando (<70). Final = Part. 30% + Trab. 30% + Examen 40%.", 14, Math.min(y+5,292), {maxWidth:182});
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
    const filas = [
      ["Participación", c.p!==undefined? c.p : "—"],
      ["Trabajos", c.t!==undefined? c.t : "—"],
      ["Examen", c.e!==undefined? c.e : "—"],
      ["Nota final (ponderada)", nf===null? "—" : nf+" / 100"],
      ["Escala MINERD", nf===null? "—" : escalaDe(nf)+" ("+escalaTexto(escalaDe(nf))+")"],
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
if(S.docente && S.docente.id){
  if(!S.ui.progTab) S.ui.progTab = "progreso";
  if(!S.ui.progGrado) S.ui.progGrado = S.docente.grado;
  if(!S.ui.progSec) S.ui.progSec = S.docente.seccion || "A";
  mostrar("diaria");
  cargarPlanes().then(()=>{ generarNotificaciones(); if(pantallaActual==="diaria") renderDiaria(); });
  flush();
}else{
  mostrar("onboarding");
}
