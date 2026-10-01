/* ============================================================
   PLANIFICACIÓN DOCENTE · RD
   App multi-docente multi-nivel (Inicial, Primaria, Secundaria)
   Currículo MINERD · República Dominicana
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
    salir:     '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  };
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[nombre]||paths.objetivo}</svg>`;
}

/* ---------- COMPETENCIAS FUNDAMENTALES (MINERD) ---------- */
const COMPETENCIAS = [
  { n:"Comunicación de manera integral", d:"Expresa ideas, sentimientos y experiencias mediante lenguaje oral, artístico y corporal." },
  { n:"Razonamiento lógico, creativo y crítico", d:"Explora, compara, clasifica y resuelve problemas de su entorno inmediato." },
  { n:"Convivencia y ciudadanía", d:"Participa, coopera y respeta reglas en la vida en comunidad." },
  { n:"Manejo de la información y recursos tecnológicos", d:"Indaga, observa y comparte información de su interés." },
  { n:"Manejo y cuidado de la vida y del ambiente", d:"Valora, cuida y protege los seres vivos y la naturaleza." },
  { n:"Desarrollo personal y espiritual", d:"Reconoce sus emociones y desarrolla hábitos saludables." },
  { n:"Habilidades para la vida", d:"Toma decisiones y actúa con autonomía en situaciones cotidianas." },
];

/* ---------- GRADOS Y JORNADAS POR NIVEL ---------- */
const GRADOS_POR_NIVEL = {
  Inicial:   ["Maternal","3 años","4 años","5 años"],
  Primaria:  ["1ro","2ro","3ro","4ro","5ro","6to"],
  Secundaria:["1ro","2ro","3ro","4ro","5ro","6to"],
};
const JORNADAS = ["Matutina","Vespertina","Nocturna","Jornada Extendida"];
const MESES_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const PERIODOS = ["1er Trimestre","2do Trimestre","3er Trimestre"];

/* ---------- PLANES ANUALES SUGERIDOS POR NIVEL (MINERD) ---------- */
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
  { mes:"Mayo 2027", trimestre:"3er Trimestre", tema:"Economía y emprendimiento", enfoque:"Educación financiera y proyectos emprendedores.", contenidos:"Ahorro · Presupuesto · Proyecto de negocio", evaluacion:"Ferias de emprendimiento." },
  { mes:"Junio 2027", trimestre:"Cierre de año", tema:"Proyecto integrador de cierre", enfoque:"Síntesis interdisciplinaria del año escolar.", contenidos:"Integración de áreas · Socialización", evaluacion:"Defensa de proyectos y evaluación final." },
];
const PLANES_ANUALES = {
  "Inicial":    { titulo:"Plan Anual Inicial",    descripcion:"Unidades temáticas con enfoque lúdico, situaciones de aprendizaje y evaluación formativa.", temas: PLAN_ANUAL_INICIAL },
  "Primaria":   { titulo:"Plan Anual Primaria",   descripcion:"Unidades que desarrollan competencias fundamentales con proyectos y trabajo colaborativo.", temas: PLAN_ANUAL_PRIMARIA },
  "Secundaria": { titulo:"Plan Anual Secundaria", descripcion:"Unidades basadas en proyectos, pensamiento crítico y participación ciudadana.", temas: PLAN_ANUAL_SECUNDARIA },
};
const NIVELES = ["Inicial","Primaria","Secundaria"];

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


/* ---------- ESTADO LOCAL (LocalStorage) ---------- */
const LS_KEY = "plan_docente_rd_v2";
function cargarEstado(){
  try{ const d = JSON.parse(localStorage.getItem(LS_KEY)); if(d) return d; }catch(e){}
  return {
    docente:{ id:"",codigo:"",nombre:"",colegio:"",distrito:"",nivel:"Inicial",grado:"",seccion:"A",asignaturas:"",jornada:"",duracionMin:0,alumnos:24,periodo:"1er Trimestre" },
    asistencia:{}, evaluacion:{}, obs:{}, calificaciones:{},
    cola:[], lastSync:null, planesCache:{}, listaPlanes:null,
    notificaciones:[], vistosPlanes:0,
  };
}
let S = cargarEstado();
function guardar(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); }catch(e){} }

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
  if(!id || id.startsWith("local-")) return PLAN_MARIPOSA;
  if(S.planesCache[id]) return S.planesCache[id];
  try{
    const r = await apiAccion("plan", { id });
    if(r.success){ S.planesCache[id] = r.plan; guardar(); return r.plan; }
  }catch(e){}
  return null;
}
function todasClases(plan){ const arr=[]; (plan.semanas||[]).forEach(s=>s.dias.forEach(d=>arr.push(d))); return arr; }
function clasePorId(plan, id){ return todasClases(plan).find(d=>d.id===id); }
function pctDia(claseId, tipo){
  const N = S.docente.alumnos;
  const mapa = tipo==="asis"? S.asistencia : S.evaluacion;
  const reg = mapa[claseId]||{};
  const clave = tipo==="asis"? "Presente":"Logrado";
  let n=0; for(let i=1;i<=N;i++) if(reg[i]===clave) n++;
  return Math.round(n*100/N);
}
function pctMes(plan, tipo){
  const clases = todasClases(plan).filter(d=>{ const m=(tipo==="asis"?S.asistencia:S.evaluacion)[d.id]; return m&&Object.keys(m).length; });
  if(!clases.length) return 0;
  let sum=0; clases.forEach(c=>sum+=pctDia(c.id,tipo));
  return Math.round(sum/clases.length);
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
function escalaTexto(k){ return k==="L"?"Logrado":(k==="EP"?"En proceso":"Insuficiente"); }

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
  const plan = planActivo();
  const claseHoy = todasClases(plan).find(d=>d.id===HOY);
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
    asignatura: (S.docente.asignaturas || nivel) + (plan.tema? " · "+plan.tema : ""),
    grado: S.docente.grado || nivel,
    seccion: S.docente.seccion || "A",
    fecha: esFecha? claseId : HOY,
    clase_id: esFecha? claseId : "",
    clase_titulo: esFecha? ((d&&d.etiqueta? d.etiqueta+" · ":"")+(d?d.titulo||"":"")) : ("Calificaciones "+claseId),
    anio_escolar: ANIO_ESCOLAR,
  };
}
function encolar(tipo, claseId, item, texto){
  // deduplicar en cola por tipo+clase+alumno (se queda el último valor)
  if(item){
    const i = S.cola.findIndex(p=>p.tipo===tipo && p.claseId===claseId && p.item && p.item.alumno===item.alumno);
    if(i>=0) S.cola.splice(i,1);
  }
  S.cola.push({ tipo, claseId, item: item||null, texto: texto||null });
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
    const k = p.tipo+"|"+p.claseId;
    if(!grupos[k]) grupos[k] = { tipo:p.tipo, claseId:p.claseId, items:[], texto:null };
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
  anio:["Planes Anuales","Elige el plan anual de tu nivel educativo"],
  "anio-detalle":["Planes Anuales","Detalle completo del plan"],
  mes:["Planificación Mensual","Planes disponibles organizados por semestre"],
  semanas:["Semanas del mes en curso","Solo las semanas del mes actual"],
  progreso:["Progreso y Calificaciones","Registra notas y visualiza el avance de tus alumnos"],
  info:["Información y Ajustes","Tu perfil y sincronización"],
  notificaciones:["Notificaciones","Avisos de tu app docente"],
  "mes-detalle":["Planificación Mensual","Detalle completo del plan"],
  clase:["Clase del día","Lista para enseñar"],
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
  $("topbar").style.display = esOnb? "none":"flex";
  document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("sel", b.dataset.scr===scr));
  const esNivel1 = ["anio","mes","semanas","progreso","info"].includes(scr);
  $("btnAtras").classList.toggle("visible", registrado && !esNivel1);
  $("btnCampana").classList.toggle("visible", registrado && !esOnb);
  actualizarCampana();
  let [t, s] = TITULOS[scr]||["Planificación Docente",""];
  if(scr==="anio-detalle" && arg) t = "Plan Anual · "+arg;
  $("tituloApp").textContent = t; $("subtituloApp").textContent = s;
  if(scr==="onboarding") renderOnboarding();
  if(scr==="anio") renderAnio();
  if(scr==="anio-detalle") renderAnioDetalle(arg);
  if(scr==="mes") renderMes();
  if(scr==="mes-detalle") renderMesDetalle(arg);
  if(scr==="semanas") renderSemanas();
  if(scr==="clase") renderClase(arg);
  if(scr==="progreso") renderProgreso();
  if(scr==="notificaciones") renderNotificaciones();
  if(scr==="info") renderInfo();
  window.scrollTo({top:0});
}

/* ---------- ONBOARDING (multi-nivel) ---------- */
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
    <label class="lbl">Sección</label>
    <input class="inp" id="onbSeccion" placeholder="Ej: A" value="A">
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
  const asignaturas = $("onbAsignaturas")? ($("onbAsignaturas").value.trim()||"") : "";
  if(!colegio || !distrito || !nombre){ toast("Completa colegio, distrito y tu nombre"); return; }
  toast("Registrando...");
  try{
    const r = await apiAccion("onboarding", { colegio, distrito, nombre, nivel, grado, seccion, jornada, asignaturas });
    if(!r.success){ toast("Error: "+(r.error||"intenta de nuevo")); return; }
    S.docente = { ...S.docente, id:r.id, codigo:r.codigo, nombre, colegio, distrito, nivel, grado, seccion, jornada, asignaturas };
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
    S.docente.asignaturas = p.asignaturas || "";
    S.docente.duracionMin = +p.duracion_min || 0;
    guardar();
    await cargarPlanes();
    generarNotificaciones();
    toast("¡Hola de nuevo, "+S.docente.nombre.split(" ")[0]+"!");
    irA("mes");
  }catch(e){ toast("Sin conexión a internet"); }
}

/* ---------- RENDER: AÑO (lista de planes anuales) ---------- */
function renderAnio(){
  const plan = planActivo();
  let html = `
  <div class="hero">
    <h2>Planes Anuales ${ANIO_ESCOLAR}</h2>
    <p>Elige el plan anual de tu nivel educativo. Cada plan sigue el calendario escolar MINERD: agosto 2026 – junio 2027, en 3 trimestres.</p>
    <div class="row">
      <div class="ringbox">${ring(pctMes(plan,"asis"),56,7,"#fff")}<small>Asistencia</small></div>
      <div class="ringbox">${ring(pctMes(plan,"eval"),56,7,"#FFD6DB")}<small>Logros</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff","11")}<small>Unidades</small></div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("plan")} Tu perfil docente</h2>
    <div class="stat-row"><span>Colegio</span><b>${esc(S.docente.colegio)}</b></div>
    <div class="stat-row"><span>Distrito</span><b>${esc(S.docente.distrito)}</b></div>
    <div class="stat-row"><span>Nivel / Grado</span><b>${esc(S.docente.nivel)} · ${esc(S.docente.grado)}</b></div>
    <div class="stat-row"><span>Jornada</span><b>${esc(S.docente.jornada||"—")}</b></div>
  </div>
  <h2 class="mini">Elige tu plan anual</h2>`;
  NIVELES.forEach(nv=>{
    const info = PLANES_ANUALES[nv];
    const esMio = S.docente.nivel===nv;
    html += `<div class="item" onclick="irA('anio-detalle','${nv}')">
      <div class="ic">${ic("plan")}</div>
      <div class="tx"><b>${esc(info.titulo)} ${ANIO_ESCOLAR}</b><span>${esc(info.descripcion)}</span></div>
      ${esMio?'<span class="hoy-badge">TU NIVEL</span>':""}
    </div>`;
  });
  $("scr-anio").innerHTML = html;
}

/* ---------- RENDER: AÑO DETALLE ---------- */
function renderAnioDetalle(nivel){
  const info = PLANES_ANUALES[nivel] || PLANES_ANUALES.Inicial;
  let html = `
  <div class="hero">
    <h2>${esc(info.titulo)} ${ANIO_ESCOLAR}</h2>
    <p>Nivel ${esc(nivel)} · ${esc(info.descripcion)}</p>
    <p style="margin-top:8px">Docente: ${esc(S.docente.nombre)} · ${esc(S.docente.colegio)} · Sección ${esc(S.docente.seccion)}</p>
  </div>`;
  let trimestreAnt = "";
  info.temas.forEach(m=>{
    if(m.trimestre!==trimestreAnt){ trimestreAnt=m.trimestre; html+=`<div class="sep">${m.trimestre}</div>`; }
    html += `<div class="item" style="cursor:default">
      <div class="ic">${ic("calendario")}</div>
      <div class="tx"><b>${esc(m.mes)} · ${esc(m.tema)}</b><span>${esc(m.contenidos)}</span></div>
    </div>
    <div class="card" style="padding:12px 14px;margin-top:-6px">
      <p style="font-size:12.5px"><b style="color:var(--azul)">Enfoque:</b> <span class="muted">${esc(m.enfoque)}</span></p>
      <p style="font-size:12.5px;margin-top:4px"><b style="color:var(--rojo)">Evaluación:</b> <span class="muted">${esc(m.evaluacion)}</span></p>
    </div>`;
  });
  html += `
  <div class="card">
    <h2>${ic("objetivo")} Competencias fundamentales (MINERD)</h2>
    ${COMPETENCIAS.map((c,i)=>`<p style="font-size:12.5px;margin-bottom:8px"><b style="color:var(--azul)">${i+1}. ${esc(c.n)}:</b> <span class="muted">${esc(c.d)}</span></p>`).join("")}
  </div>
  <button class="dl grande" onclick="descargarPlanAnualDocx('${esc(nivel)}')">${ic("descarga")} Descargar plan anual en Word</button>
  <div style="height:14px"></div>`;
  $("scr-anio-detalle").innerHTML = html;
}

/* ---------- RENDER: MES (por semestres) ---------- */
function renderMes(){
  let html = `<div class="hero">
    <h2>Planes Mensuales</h2>
    <p>Planes de tu nivel (${esc(S.docente.nivel)}) organizados por semestre escolar. Pide planes nuevos a Delega por WhatsApp y aparecerán aquí.</p>
  </div>
  <div style="display:flex;justify-content:flex-end;margin-bottom:4px">
    <button class="btn-soft" style="flex:0 0 auto;padding:8px 14px" onclick="refrescarPlanes()">${ic("refrescar")} Actualizar</button>
  </div>`;
  let planes = [];
  if(S.listaPlanes && S.listaPlanes.length){
    planes = S.listaPlanes.map(p=>({ id:p.id, titulo:p.titulo, mes:p.mes, tema:p.tema, nSem:p.semanas||0, propio:p.propio }));
  }
  if(S.docente.nivel==="Inicial"){
    planes.push({ id:"local-mariposa", titulo:PLAN_MARIPOSA.titulo, mes:PLAN_MARIPOSA.mes, tema:PLAN_MARIPOSA.tema, nSem:(PLAN_MARIPOSA.semanas||[]).length, propio:false });
  }
  const vistos = new Set();
  planes = planes.filter(p=>{ if(vistos.has(p.titulo)) return false; vistos.add(p.titulo); return true; });

  const sem1 = planes.filter(p=>semestreDe(p.mes)==="1er");
  const sem2 = planes.filter(p=>semestreDe(p.mes)==="2do");
  const pintarPlanes = (lista)=>{
    lista.forEach(p=>{
      const esLocal = p.id.startsWith("local-");
      const chip = p.propio? '<span class="hoy-badge">PARA TI</span>' : `<span class="chip gris">${esLocal?"Biblioteca":"En línea"}</span>`;
      html += `<div class="item" onclick="abrirPlan('${p.id}')">
        <div class="ic">${ic("lista")}</div>
        <div class="tx"><b>${esc(p.titulo)}</b><span>${esc(p.mes)} · ${p.nSem} semanas${p.tema? " · Tema: "+esc(p.tema):""}</span></div>
        ${chip}
      </div>`;
    });
    if(!lista.length) html += `<p class="vacio">Aún no hay planes publicados para este semestre.</p>`;
  };
  html += `<div class="sep">1er Semestre · Agosto a Diciembre</div>`;
  pintarPlanes(sem1);
  html += `<div class="sep">2do Semestre · Enero a Junio</div>`;
  pintarPlanes(sem2);
  html += `<div class="card">
    <h2>${ic("bombilla")} ¿Necesitas un plan nuevo?</h2>
    <p class="muted">Escribe a Delega, tu asistente escolar, por WhatsApp y pide el plan mensual del tema que estás trabajando. Se crea alineado al currículo MINERD y aparece aquí automáticamente al presionar Actualizar.</p>
  </div>`;
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

/* ---------- RENDER: MES DETALLE ---------- */
let planAbierto = null;
function renderMesDetalle(plan){
  if(!plan){ irA("mes"); return; }
  planAbierto = plan;
  const semanasInv = [...(plan.semanas||[])].reverse();
  let html = `
  <div class="hero">
    <h2>${esc(plan.titulo)}</h2>
    <p>${esc(plan.mes)} · Nivel ${esc(plan.nivel||S.docente.nivel)} · Grado ${esc(plan.grado||S.docente.grado)} · Sección ${esc(S.docente.seccion)}</p>
    <div class="row">
      <div class="ringbox">${ring(pctMes(plan,"asis"),56,7,"#fff")}<small>Asistencia</small></div>
      <div class="ringbox">${ring(pctMes(plan,"eval"),56,7,"#FFD6DB")}<small>Logros</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff", (plan.semanas||[]).length+"")}<small>Semanas</small></div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("objetivo")} Competencias del plan</h2>
    ${(plan.competencias||[]).length? (plan.competencias||[]).map(c=>`<span class="chip">${esc(c.n||c)}</span>`).join("") : COMPETENCIAS.slice(0,5).map(c=>`<span class="chip">${esc(c.n)}</span>`).join("")}
    ${(plan.areas||[]).length? `<h3>Áreas curriculares</h3>`+(plan.areas||[]).map(a=>`<span class="chip roja">${esc(a)}</span>`).join("") : ""}
  </div>
  <div class="sep">Semanas · más reciente arriba</div>`;
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
  html += `<button class="dl grande" onclick="descargarPlanMensualDocx()">${ic("descarga")} Descargar plan mensual en Word (.docx)</button>
  <div style="height:14px"></div>`;
  $("scr-mes-detalle").innerHTML = html;
}

/* ---------- RENDER: SEMANAS (solo mes en curso) ---------- */
function renderSemanas(){
  const plan = planAbierto || planActivo();
  const ahora = new Date();
  const pref = ahora.getFullYear()+"-"+String(ahora.getMonth()+1).padStart(2,"0");
  const nombreMes = MESES_ES[ahora.getMonth()]+" "+ahora.getFullYear();
  const semanasAct = (plan.semanas||[]).filter(s=>(s.dias||[]).some(d=>d.id && String(d.id).startsWith(pref)));
  let html = `<div class="hero"><h2>Semanas de ${esc(nombreMes)}</h2>
  <p>Se muestran únicamente las semanas del mes en curso${plan.tema? " del plan "+esc(plan.tema):""}.</p></div>`;
  if(!semanasAct.length){
    html += `<div class="card"><h2>${ic("calendario")} Sin clases este mes</h2>
    <p class="muted">El plan activo (${esc(plan.titulo)}) no tiene clases diarias programadas en ${esc(nombreMes)}. Puedes abrir otro plan desde Planificación Mensual o pedirle a Delega un plan para este mes.</p></div>`;
  }
  const semanasInv = [...semanasAct].reverse();
  html += `<div class="sep">${esc(nombreMes)}</div>`;
  semanasInv.forEach(s=>{
    const dias = s.dias.filter(d=>d.id && String(d.id).startsWith(pref));
    if(!dias.length) return;
    const actual = dias.some(d=>d.id===HOY);
    const pctW = dias.length? Math.round(dias.reduce((a,d)=>a+pctDia(d.id,"asis"),0)/dias.length):0;
    html += `<div class="card" style="padding:13px">
      <div style="display:flex;align-items:center;gap:12px">
        <div class="rg">${ring(pctW,50,6,"#0033A0")}</div>
        <div style="flex:1"><b style="color:var(--azul-osc);font-size:14px">Semana ${s.numero} · ${esc(s.tema)}</b>
        <p class="muted" style="margin-top:2px">${esc(s.fechas)}${actual?" · EN CURSO":""}</p></div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
      ${dias.slice().reverse().map(d=>`<span class="chip ${d.id===HOY?"roja":""}" style="cursor:pointer" onclick="abrirClase('${d.id}')">${d.id===HOY?"HOY · ":""}${esc(d.etiqueta)}</span>`).join("")}
      </div>
    </div>`;
  });
  $("scr-semanas").innerHTML = html;
}
async function abrirClase(claseId){
  const plan = planAbierto || planActivo();
  const d = clasePorId(plan, claseId);
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
  const s = (plan.semanas||[]).find(w=>w.dias.some(x=>x.id===claseId));
  const pctA = pctDia(claseId,"asis"), pctE = pctDia(claseId,"eval");
  const momentos = d.momentos||[];
  const baseTotal = momentos.reduce((a,m)=>a+(minsDe(m.duracion)||0),0);
  let html = `
  <div class="card">
    <div class="clase-head">
      <div class="tit">
        ${d.id===HOY?'<span class="hoy-badge">HOY</span>':""}
        <h2>${esc(d.etiqueta)} · ${esc(d.titulo)}</h2>
        <p>Semana ${s?s.numero:""}: ${s?esc(s.tema):""} · ${esc(plan.mes)}</p>
      </div>
      <div class="rg" id="headRings" style="display:flex;gap:2px">
        ${ring(pctA,52,6,"#0033A0")}${ring(pctE,52,6,"#CE1126")}
      </div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("objetivo")} Desempeños y objetivos de la clase</h2>
    ${(d.desempenos||[]).map(x=>`<p style="font-size:13px;margin-bottom:6px">✓ ${esc(x)}</p>`).join("")}
    <div style="margin-top:8px">${COMPETENCIAS.slice(0,3).map(c=>`<span class="chip">${esc(c.n)}</span>`).join("")}</div>
  </div>
  ${S.docente.duracionMin? `<p class="vacio" style="padding:4px">Tus momentos están ajustados a una clase de ${S.docente.duracionMin} minutos (cámbialo en Info).</p>`:""}
  <h2 class="mini">Momentos de la clase · paso a paso</h2>
  ${momentos.map((m,i)=>`
    <div class="momento">
      <div class="m-head"><div class="m-num">${i+1}</div><b>${esc(m.nombre)}</b><span class="dur">${ic("reloj",12)} ${esc(duracionAjustada(m, baseTotal))}</span></div>
      <p class="prop">Propósito: ${esc(m.proposito)}</p>
      <ol>${(m.pasos||[]).map(p=>`<li>${esc(p)}</li>`).join("")}</ol>
      ${i===0? temporizadorHTML() : ""}
    </div>`).join("")}
  <div class="card">
    <h2>${ic("etiqueta")} Recursos de la clase</h2>
    ${(d.recursos||[]).map(r=>`<span class="chip roja">${esc(r)}</span>`).join("")}
    ${(d.orientacion||"").length? `<div class="nota" style="margin-top:12px"><b>${ic("bombilla")} Orientaciones pedagógicas</b>${esc(d.orientacion)}</div>`:""}
  </div>
  <div class="card">
    <h2>${ic("usuarios")} Registro del día · ${S.docente.alumnos} alumnos</h2>
    <div class="tabs">
      <div class="tab sel" id="tabA" onclick="tabClase('A')">Asistencia</div>
      <div class="tab" id="tabE" onclick="tabClase('E')">Evaluación</div>
    </div>
    <div id="zonaA">${alumnosHTML(claseId,"A")}</div>
    <div id="zonaE" style="display:none">${alumnosHTML(claseId,"E")}</div>
    <div style="display:flex;justify-content:space-around;margin-top:12px">
      <div style="text-align:center">${ring(pctA,64,7,"#0033A0")}<small class="muted" style="display:block;font-weight:700">Presentes</small></div>
      <div style="text-align:center">${ring(pctE,64,7,"#CE1126")}<small class="muted" style="display:block;font-weight:700">Logrado</small></div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("nota")} Nota de observación del día</h2>
    <textarea class="obs" id="obsTxt" placeholder="Registra aquí lo más relevante del día: logros, dificultades, situaciones del grupo...">${esc(S.obs[claseId]||"")}</textarea>
    <p class="muted" style="margin-top:6px">Se guarda automáticamente y se sincroniza con la dirección.</p>
  </div>
  <button class="dl" onclick="descargarPlanDiarioDocx('${claseId}')">${ic("descarga")} Descargar plan diario en Word (.docx)</button>
  <button class="dl alt" onclick="descargarAsistenciaXlsx('${claseId}')">${ic("descarga")} Descargar asistencia en Excel (.xlsx)</button>
  <button class="dl alt" onclick="descargarEvaluacionPdf('${claseId}')">${ic("descarga")} Descargar evaluación en PDF</button>
  <div style="height:14px"></div>`;
  $("scr-clase").innerHTML = html;
  initTimer();
  $("obsTxt").addEventListener("input", ()=>{
    S.obs[claseId] = $("obsTxt").value;
    guardar();
    clearTimeout(window._obsT);
    window._obsT = setTimeout(()=>{ encolar("observacion", claseId, null, S.obs[claseId]); toast("Observación sincronizada"); }, 1500);
  });
}
function alumnosHTML(claseId, tipo){
  const N = S.docente.alumnos;
  const reg = (tipo==="A"? S.asistencia : S.evaluacion)[claseId]||{};
  let html = "";
  for(let i=1;i<=N;i++){
    const st = reg[i]||null;
    if(tipo==="A"){
      html += `<div class="alumno"><div class="an">${i}</div><div class="anx">Alumno ${i}</div>
        <div class="seg">
          <button class="${st==="Presente"?"selP":""}" onclick="marcar('A','${claseId}',${i},'Presente')">Presente</button>
          <button class="${st===null?"selA":""}" onclick="marcar('A','${claseId}',${i},null)">Sin reg.</button>
          <button class="${st==="Ausente"?"selA":""}" onclick="marcar('A','${claseId}',${i},'Ausente')">Ausente</button>
        </div></div>`;
    } else {
      html += `<div class="alumno"><div class="an">${i}</div><div class="anx">Alumno ${i}</div>
        <div class="seg">
          <button class="${st==="Logrado"?"selL":""}" onclick="marcar('E','${claseId}',${i},'Logrado')">Logrado</button>
          <button class="${st==="En proceso"?"selEP":""}" onclick="marcar('E','${claseId}',${i},'En proceso')">En proc.</button>
          <button class="${st===null?"selA":""}" onclick="marcar('E','${claseId}',${i},null)">Sin evaluar</button>
        </div></div>`;
    }
  }
  return html;
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
  if(el) el.innerHTML = ring(pctDia(claseId,"asis"),52,6,"#0033A0") + ring(pctDia(claseId,"eval"),52,6,"#CE1126");
}
function tabClase(t){
  $("tabA").classList.toggle("sel", t==="A");
  $("tabE").classList.toggle("sel", t==="E");
  $("zonaA").style.display = t==="A"?"":"none";
  $("zonaE").style.display = t==="E"?"":"none";
}

/* ---------- TEMPORIZADOR ---------- */
function temporizadorHTML(){
  return `
  <div class="timer-wrap" id="timerBox">
    <div class="timer-ring">
      <svg width="96" height="96">
        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(0,51,160,.12)" stroke-width="8"/>
        <circle id="timerRing" cx="48" cy="48" r="40" fill="none" stroke="#CE1126" stroke-width="8"
          stroke-linecap="round" stroke-dasharray="${2*Math.PI*40}" stroke-dashoffset="0"/>
      </svg>
      <div class="t-txt"><b id="timerTxt">05:00</b><small id="timerEstado">Listo</small></div>
    </div>
    <div class="timer-ctrl">
      <div class="timer-durs">
        <button class="dur-btn sel" onclick="setDur(5,this)">5 min</button>
        <button class="dur-btn" onclick="setDur(10,this)">10 min</button>
        <button class="dur-btn" onclick="setDur(15,this)">15 min</button>
        <button class="dur-btn" onclick="setDur(20,this)">20 min</button>
      </div>
      <div class="timer-btns">
        <button class="btn-soft" id="btnPlay" onclick="playTimer()">${ic("play",14)} Iniciar</button>
        <button class="btn-soft" onclick="resetTimer()">${ic("reiniciar",14)} Reiniciar</button>
      </div>
    </div>
  </div>`;
}
const CIRC = 2*Math.PI*40;
let T = { dur:300, resta:300, corriendo:false, iv:null };
function setDur(min, btn){
  document.querySelectorAll(".dur-btn").forEach(b=>b.classList.remove("sel"));
  btn.classList.add("sel");
  T.dur = min*60; T.resta = T.dur; T.corriendo = false;
  clearInterval(T.iv); pintarTimer(); $("timerEstado").textContent="Listo";
  $("btnPlay").innerHTML = ic("play",14)+" Iniciar";
  $("timerBox").classList.remove("timer-corriendo");
}
function pintarTimer(){
  const m = Math.floor(T.resta/60), s = T.resta%60;
  $("timerTxt").textContent = String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  $("timerRing").style.strokeDashoffset = CIRC*(1-T.resta/T.dur);
}
function playTimer(){
  if(T.corriendo){
    T.corriendo=false; clearInterval(T.iv);
    $("btnPlay").innerHTML = ic("play",14)+" Continuar"; $("timerEstado").textContent="En pausa";
    $("timerBox").classList.remove("timer-corriendo");
    return;
  }
  T.corriendo=true; $("btnPlay").innerHTML = ic("pausa",14)+" Pausar"; $("timerEstado").textContent="¡Corriendo!";
  $("timerBox").classList.add("timer-corriendo");
  T.iv = setInterval(()=>{
    T.resta--;
    pintarTimer();
    if(T.resta<=0){
      clearInterval(T.iv); T.corriendo=false; T.resta=T.dur;
      $("btnPlay").innerHTML = ic("play",14)+" Iniciar"; $("timerEstado").textContent="¡Tiempo!";
      $("timerBox").classList.remove("timer-corriendo");
      beep(); toast("¡Se acabó el tiempo del Inicio!");
    }
  },1000);
}
function resetTimer(){
  clearInterval(T.iv); T.corriendo=false; T.resta=T.dur;
  pintarTimer(); $("btnPlay").innerHTML = ic("play",14)+" Iniciar"; $("timerEstado").textContent="Listo";
  $("timerBox").classList.remove("timer-corriendo");
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
function initTimer(){ T={dur:300,resta:300,corriendo:false,iv:null}; }

/* ---------- RENDER: PROGRESO (calificaciones y avance) ---------- */
function califs(){
  const p = S.docente.periodo;
  if(!S.calificaciones[p]) S.calificaciones[p] = {};
  return S.calificaciones[p];
}
function notaDe(n){
  const c = califs()[n];
  if(!c) return null;
  return notaFinalDe(c.p, c.t, c.e);
}
function promedioGrupo(){
  let sum=0, cuenta=0;
  for(let i=1;i<=S.docente.alumnos;i++){
    const nf = notaDe(i);
    if(nf!==null){ sum+=nf; cuenta++; }
  }
  return cuenta? Math.round(sum/cuenta) : 0;
}
function renderProgreso(){
  const plan = planAbierto || planActivo();
  const N = S.docente.alumnos;
  const prom = promedioGrupo();
  let html = `
  <div class="hero">
    <h2>Progreso del grupo</h2>
    <p>Calificaciones de tus alumnos · Promedio del grupo en ${esc(S.docente.periodo)}</p>
    <div class="row">
      <div class="ringbox">${ring(prom,56,7,"#fff")}<small>Promedio</small></div>
      <div class="ringbox">${ring(pctMes(plan,"asis"),56,7,"#FFD6DB")}<small>Asistencia</small></div>
      <div class="ringbox">${ring(pctMes(plan,"eval"),56,7,"#fff")}<small>Logros</small></div>
    </div>
  </div>
  <div class="card">
    <h2>${ic("boletin")} Período y escala MINERD</h2>
    <label class="lbl">Período</label>
    <select class="inp" id="selPeriodo" onchange="cambiarPeriodo()">
      ${PERIODOS.map(p=>`<option value="${esc(p)}" ${p===S.docente.periodo?"selected":""}>${esc(p)}</option>`).join("")}
    </select>
    <p class="muted">Nota final = Participación 30% + Trabajos 30% + Examen 40%. Escala: L ≥ 90 (Logrado) · EP 70–89 (En proceso) · I < 70.</p>
  </div>
  <h2 class="mini">Calificaciones por alumno</h2>`;
  for(let i=1;i<=N;i++){
    const c = califs()[i]||{};
    const nf = notaDe(i);
    const esc2 = nf===null? "—" : escalaDe(nf);
    const color = nf===null? "#94a3b8" : (nf>=70? "#0033A0" : "#CE1126");
    html += `<div class="alumno" style="flex-wrap:wrap">
      <div class="an">${i}</div>
      <div class="anx" style="flex:1;min-width:0">
        <b>Alumno ${i}</b>
        <div class="prog-inputs" style="margin-top:5px">
          <label>Part.<input type="number" min="0" max="100" inputmode="numeric" id="calP_${i}" value="${c.p!==undefined?esc(c.p):""}" oninput="guardarCalif(${i})"></label>
          <label>Trab.<input type="number" min="0" max="100" inputmode="numeric" id="calT_${i}" value="${c.t!==undefined?esc(c.t):""}" oninput="guardarCalif(${i})"></label>
          <label>Examen<input type="number" min="0" max="100" inputmode="numeric" id="calE_${i}" value="${c.e!==undefined?esc(c.e):""}" oninput="guardarCalif(${i})"></label>
        </div>
      </div>
      <div class="rg" style="text-align:center">
        ${ring(nf===null?0:nf,50,6,color, nf===null? "—" : String(nf))}
        <span class="escala ${esc2}" style="display:${nf===null?"none":""}">${esc(escalaTexto(esc2))}</span>
      </div>
      <button class="btn-mini" title="Reporte individual" onclick="descargarBoletinIndividual(${i})">${ic("descarga",15)}</button>
    </div>`;
  }
  html += `
  <button class="dl grande" onclick="descargarBoletinGrupo()">${ic("descarga")} Descargar boletín del grupo en PDF</button>
  <div style="height:14px"></div>`;
  $("scr-progreso").innerHTML = html;
}
function cambiarPeriodo(){
  S.docente.periodo = $("selPeriodo").value;
  guardar();
  renderProgreso();
}
function guardarCalif(n){
  const c = califs();
  const p = $("calP_"+n).value, t = $("calT_"+n).value, e = $("calE_"+n).value;
  if(p==="" && t==="" && e===""){ delete c[n]; }
  else {
    c[n] = { p: p===""?0:+p, t: t===""?0:+t, e: e===""?0:+e };
  }
  guardar();
  const nf = notaDe(n);
  encolar("calificaciones", S.docente.periodo, { alumno:"Alumno "+n, participacion: c[n]?c[n].p:0, trabajos: c[n]?c[n].t:0, examen: c[n]?c[n].e:0, final: nf===null?0:nf });
  clearTimeout(window._calT);
  window._calT = setTimeout(()=>{
    if($("scr-progreso").classList.contains("visible")) renderProgreso();
    toast("Calificación de Alumno "+n+" sincronizada");
  }, 900);
}

/* ---------- RENDER: NOTIFICACIONES ---------- */
function renderNotificaciones(){
  let html = `<div class="hero"><h2>Notificaciones</h2>
  <p>Avisos importantes de tu app docente. Se marcan como leídas al abrirlas.</p></div>`;
  if(!S.notificaciones.length){
    html += `<p class="vacio">No tienes notificaciones por ahora. 💙</p>`;
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

/* ---------- RENDER: INFO ---------- */
function renderInfo(){
  const pend = S.cola.length;
  const ult = S.lastSync? new Date(S.lastSync).toLocaleString("es-DO") : "Aún no sincroniza";
  const durH = Math.floor((S.docente.duracionMin||0)/60), durM = (S.docente.duracionMin||0)%60;
  $("scr-info").innerHTML = `
  <div class="hero"><h2>Tu perfil docente</h2>
    <p>${esc(S.docente.nombre)} · ${esc(S.docente.colegio)}</p></div>
  <div class="card">
    <h2>${ic("usuarios")} Datos registrados</h2>
    <div class="stat-row"><span>Nombre</span><b>${esc(S.docente.nombre)}</b></div>
    <div class="stat-row"><span>Colegio</span><b>${esc(S.docente.colegio)}</b></div>
    <div class="stat-row"><span>Distrito</span><b>${esc(S.docente.distrito)}</b></div>
    <div class="stat-row"><span>Nivel / Grado</span><b>${esc(S.docente.nivel)} · ${esc(S.docente.grado)}</b></div>
    <div class="stat-row"><span>Sección / Alumnos</span><b>${esc(S.docente.seccion)} · ${S.docente.alumnos}</b></div>
    <div class="stat-row"><span>Jornada</span><b>${esc(S.docente.jornada||"—")}</b></div>
    <div class="stat-row"><span>Asignaturas</span><b>${esc(S.docente.asignaturas||"—")}</b></div>
    <div class="codigo-box"><span class="muted" style="font-weight:800;letter-spacing:1px">TU CÓDIGO</span>
      <div class="cod">${esc(S.docente.codigo)}</div>
      <p class="muted">Úsalo para entrar desde otro dispositivo</p></div>
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
    <h2>${ic("usuarios")} Cantidad de alumnos</h2>
    <input class="inp" id="inpAlumnos" type="number" min="1" max="60" value="${S.docente.alumnos}">
    <button class="dl" onclick="guardarAlumnos()">Guardar</button>
  </div>
  <div class="card">
    <h2>${ic("refrescar")} Sincronización automática</h2>
    <div class="stat-row"><span><span class="punto" style="background:${pend?"#f59e0b":"#10b981"}"></span>Estado</span><b>${pend? pend+" pendiente(s) en cola":"Todo sincronizado"}</b></div>
    <div class="stat-row"><span>Última sincronización</span><b>${esc(ult)}</b></div>
    <div class="stat-row"><span>Destino</span><b>Función Deno · Dirección escolar</b></div>
    <button class="dl" onclick="flush(); toast('Sincronizando...')">${ic("refrescar")} Sincronizar ahora</button>
  </div>
  <div class="card">
    <h2>${ic("plan")} Alineación curricular</h2>
    <p class="muted">Contenido basado en el currículo vigente del MINERD para los niveles Inicial, Primaria y Secundaria: enfoque por competencias fundamentales, situaciones de aprendizaje y evaluación formativa. Calendario escolar dominicano: agosto – junio, 3 trimestres. La app se adapta a tu nivel: ${esc(S.docente.nivel)}.</p>
  </div>
  <div class="card">
    <h2>${ic("salir")} Zona delicada</h2>
    <button class="dl alt" onclick="borrarTodo()">Borrar datos locales</button>
    <button class="dl alt" style="margin-top:8px" onclick="cerrarSesion()">Cerrar sesión en este dispositivo</button>
  </div>
  <p class="vacio">Planificación Docente RD · Delega IA · DGtech · 2026</p>`;
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
function guardarJornada(){
  S.docente.jornada = $("inpJornada").value;
  guardar();
  apiAccion("actualizar-perfil", { id:S.docente.id, jornada: S.docente.jornada }).catch(()=>{});
  toast(S.docente.jornada? "Jornada guardada: "+S.docente.jornada : "Jornada vacía");
  renderInfo();
}
function guardarAlumnos(){
  S.docente.alumnos = Math.max(1, Math.min(60, parseInt($("inpAlumnos").value)||24));
  guardar(); toast("Cantidad de alumnos guardada"); renderInfo();
}
function borrarTodo(){
  if(!confirm("¿Borrar asistencias, evaluaciones, calificaciones y observaciones guardadas en este dispositivo?")) return;
  S.asistencia={}; S.evaluacion={}; S.obs={}; S.calificaciones={}; guardar();
  toast("Datos locales borrados"); renderInfo();
}
function cerrarSesion(){
  if(!confirm("¿Cerrar sesión? Necesitarás tu código para volver a entrar.")) return;
  S.docente = { id:"",codigo:"",nombre:"",colegio:"",distrito:"",nivel:"Inicial",grado:"",seccion:"A",asignaturas:"",jornada:"",duracionMin:0,alumnos:24,periodo:"1er Trimestre" };
  S.planesCache = {};
  guardar();
  navStack = [];
  irA("onboarding");
}

/* ---------- DESCARGAS ---------- */
function docxCabecera(D, labels){
  return new D.TableRow({ tableHeader:true, children: labels.map(t=> new D.TableCell({
    shading:{fill:"0033A0"},
    children:[ new D.Paragraph({ children:[ new D.TextRun({ text:t, bold:true, color:"FFFFFF" }) ] }) ]
  }))});
}
async function docxDe(blob, nombre){
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = nombre;
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 400);
}
async function descargarPlanAnualDocx(nivel){
  try{
    const info = PLANES_ANUALES[nivel] || PLANES_ANUALES.Inicial;
    const D = docx;
    const filas = info.temas.map(m=> new D.TableRow({ children:[
      new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:m.mes, bold:true})]})]}),
      new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:m.tema})]})]}),
      new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:m.trimestre})]})]}),
    ]}));
    const doc = new D.Document({ sections:[{ children:[
      new D.Paragraph({ text:S.docente.colegio||"Colegio", heading:D.HeadingLevel.HEADING_1, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:info.titulo+" "+ANIO_ESCOLAR+" · Nivel "+nivel+" · Currículo MINERD", alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Docente: "+S.docente.nombre+" · Distrito "+S.docente.distrito+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Año escolar: agosto 2026 – junio 2027 · 3 trimestres", alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"", spacing:{after:200} }),
      new D.Table({ width:{size:100, type:D.WidthType.PERCENTAGE}, rows:[ docxCabecera(D,["Mes","Tema","Trimestre"]), ...filas ]}),
      new D.Paragraph({ text:"Competencias fundamentales (MINERD)", spacing:{before:300}, heading:D.HeadingLevel.HEADING_2 }),
      ...COMPETENCIAS.map(c=>new D.Paragraph({ text:"• "+c.n+": "+c.d })),
      new D.Paragraph({ text:"Enfoques y evaluación por mes", spacing:{before:300}, heading:D.HeadingLevel.HEADING_2 }),
      ...info.temas.map(m=>new D.Paragraph({ spacing:{before:120}, children:[
        new D.TextRun({ text:m.mes+" — "+m.tema, bold:true, break:0 }),
        new D.TextRun({ text:" Enfoque: "+m.enfoque+" | Evaluación: "+m.evaluacion })
      ]})),
    ]}]});
    await docxDe(await D.Packer.toBlob(doc), "plan-anual-"+nivel.toLowerCase()+"-"+ANIO_ESCOLAR+".docx");
    toast("Plan anual descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
async function descargarPlanMensualDocx(){
  try{
    const plan = planAbierto || planActivo();
    const D = docx;
    const children = [
      new D.Paragraph({ text:S.docente.colegio||"Colegio", heading:D.HeadingLevel.HEADING_1, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:plan.titulo, heading:D.HeadingLevel.HEADING_2, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:plan.mes+" · Nivel "+(plan.nivel||S.docente.nivel)+" · Grado "+(plan.grado||S.docente.grado)+" · Sección "+S.docente.seccion+" · Año "+ANIO_ESCOLAR, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Docente: "+(S.docente.nombre||"—"), alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Competencias fundamentales vinculadas" }),
      ...COMPETENCIAS.slice(0,5).map(c=>new D.Paragraph({ text:"• "+c.n })),
    ];
    (plan.semanas||[]).forEach(s=>{
      children.push(new D.Paragraph({ spacing:{before:300}, heading:D.HeadingLevel.HEADING_2, text:"Semana "+s.numero+": "+s.tema+" ("+s.fechas+")" }));
      const filas = (s.dias||[]).map(d=> new D.TableRow({ children:[
        new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:d.etiqueta, bold:true})]})]}),
        new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:d.titulo})]})]}),
        new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:(d.desempenos||[]).join("; ")})]})]}),
      ]}));
      children.push(new D.Table({ width:{size:100, type:D.WidthType.PERCENTAGE}, rows:[ docxCabecera(D,["Día","Clase","Desempeños"]), ...filas ]}));
    });
    const doc = new D.Document({ sections:[{ children }]});
    await docxDe(await D.Packer.toBlob(doc), "plan-mensual-"+(plan.tema||"unidad").replace(/[^\w]+/g,"-").toLowerCase()+".docx");
    toast("Plan mensual descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
async function descargarPlanDiarioDocx(claseId){
  try{
    const plan = planAbierto || planActivo();
    const d = clasePorId(plan, claseId);
    const s = (plan.semanas||[]).find(w=>w.dias.some(x=>x.id===claseId));
    const D = docx;
    const momentos = d.momentos||[];
    const baseTotal = momentos.reduce((a,m)=>a+(minsDe(m.duracion)||0),0);
    const children = [
      new D.Paragraph({ text:S.docente.colegio||"Colegio", heading:D.HeadingLevel.HEADING_1, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:d.etiqueta+" · "+d.titulo, heading:D.HeadingLevel.HEADING_2, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:plan.mes+" · Semana "+(s?s.numero:"")+": "+(s?s.tema:"")+" · Nivel "+S.docente.nivel+" · Sección "+S.docente.seccion, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Docente: "+(S.docente.nombre||"—"), alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Desempeños de la clase" }),
      ...(d.desempenos||[]).map(x=>new D.Paragraph({ text:"• "+x })),
      new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Momentos de la clase" }),
    ];
    momentos.forEach(m=>{
      children.push(new D.Paragraph({ spacing:{before:200}, children:[ new D.TextRun({ text:m.nombre+" ("+duracionAjustada(m, baseTotal)+")", bold:true }) ]}));
      children.push(new D.Paragraph({ children:[ new D.TextRun({ text:"Propósito: "+m.proposito, italics:true }) ]}));
      (m.pasos||[]).forEach(p=>children.push(new D.Paragraph({ text:"  "+p, bullet:{level:0} })));
    });
    children.push(new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Recursos" }));
    children.push(new D.Paragraph({ text:(d.recursos||[]).join(" · ") }));
    children.push(new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Nota de observación del día" }));
    children.push(new D.Paragraph({ text:S.obs[claseId]||"—" }));
    const doc = new D.Document({ sections:[{ children }]});
    await docxDe(await D.Packer.toBlob(doc), "clase-"+claseId+".docx");
    toast("Plan diario descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarAsistenciaXlsx(claseId){
  try{
    const plan = planAbierto || planActivo();
    const d = clasePorId(plan, claseId);
    const N = S.docente.alumnos;
    const wb = XLSX.utils.book_new();
    const meta = [[S.docente.colegio||"Colegio"],["Asistencia · "+d.etiqueta+" · "+d.titulo],[plan.mes+" · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—")],[]];
    const a = meta.concat([["Alumno","Asistencia"]]);
    for(let i=1;i<=N;i++) a.push(["Alumno "+i, (S.asistencia[claseId]||{})[i]||"Sin registrar"]);
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a), "Asistencia del día");
    const b = meta.concat([["Alumno","Día","Fecha","Asistencia"]]);
    todasClases(plan).forEach(c=>{
      const reg = S.asistencia[c.id]||{};
      for(let i=1;i<=N;i++) if(reg[i]) b.push(["Alumno "+i, c.etiqueta, c.id, reg[i]]);
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(b), "Historial del mes");
    XLSX.writeFile(wb, "asistencia-"+claseId+".xlsx");
    toast("Asistencia descargada");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarEvaluacionPdf(claseId){
  try{
    const plan = planAbierto || planActivo();
    const d = clasePorId(plan, claseId);
    const N = S.docente.alumnos;
    const doc = new jspdf.jsPDF();
    doc.setFillColor(0,51,160); doc.rect(0,0,210,30,"F");
    doc.setFillColor(206,17,38); doc.rect(0,0,210,5,"F");
    doc.setTextColor(255); doc.setFontSize(15); doc.text(S.docente.colegio||"Colegio", 105, 15, {align:"center"});
    doc.setFontSize(10); doc.text("Evaluación de logros · "+d.etiqueta+" · "+d.titulo, 105, 22, {align:"center"});
    doc.setTextColor(60); doc.setFontSize(9);
    doc.text(plan.mes+" · Nivel "+S.docente.nivel+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—"), 105, 38, {align:"center"});
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
      y += 9;
    }
    y += 6;
    const pct = pctDia(claseId,"eval");
    doc.setFontSize(12); doc.setTextColor(0,51,160);
    doc.text("Resumen: "+pct+"% de los alumnos con logro alcanzado.", 14, Math.min(y,285), {maxWidth:180});
    doc.setFontSize(9); doc.setTextColor(120);
    doc.text("Observación del día: "+(S.obs[claseId]||"—"), 14, Math.min(y+7,290), {maxWidth:180});
    doc.save("evaluacion-"+claseId+".pdf");
    toast("Evaluación descargada");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}

/* ---------- BOLETINES PDF (Progreso) ---------- */
function cabeceraPdf(doc, titulo, subtitulo){
  doc.setFillColor(0,51,160); doc.rect(0,0,210,30,"F");
  doc.setFillColor(206,17,38); doc.rect(0,0,210,5,"F");
  doc.setTextColor(255); doc.setFontSize(14);
  doc.text(String(S.docente.colegio||"Colegio").slice(0,48), 105, 13, {align:"center"});
  doc.setFontSize(10); doc.text(titulo, 105, 21, {align:"center"});
  doc.setTextColor(60); doc.setFontSize(8.5);
  doc.text(subtitulo, 105, 37, {align:"center"});
}
function descargarBoletinGrupo(){
  try{
    const N = S.docente.alumnos;
    const doc = new jspdf.jsPDF();
    cabeceraPdf(doc, "Boletín de calificaciones · "+S.docente.periodo,
      "Nivel "+S.docente.nivel+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—")+" · "+ANIO_ESCOLAR);
    let y = 48;
    doc.setFillColor(0,51,160); doc.rect(14, y-5, 182, 7, "F");
    doc.setTextColor(255); doc.setFontSize(8.5);
    doc.text("Alumno", 17, y); doc.text("Part.", 95, y); doc.text("Trab.", 118, y);
    doc.text("Examen", 141, y); doc.text("Final", 165, y); doc.text("Escala", 182, y);
    y += 10;
    for(let i=1;i<=N;i++){
      if(y>280){ doc.addPage(); y=25; }
      const c = califs()[i]||{};
      const nf = notaDe(i);
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
    const prom = promedioGrupo();
    doc.setFontSize(11); doc.setTextColor(0,51,160); doc.setFont(undefined,"bold");
    doc.text("Promedio del grupo: "+prom+"/100 · "+(prom>=90?"Logrado":(prom>=70?"En proceso":"Insuficiente")), 14, Math.min(y,288));
    doc.setFontSize(8); doc.setTextColor(120); doc.setFont(undefined,"normal");
    doc.text("Escala MINERD: L = Logrado (90-100) · EP = En proceso (70-89) · I = Insuficiente (<70). Final = Part. 30% + Trab. 30% + Examen 40%.", 14, Math.min(y+5,292), {maxWidth:182});
    doc.save("boletin-grupo-"+S.docente.periodo.replace(/ /g,"-").toLowerCase()+".pdf");
    toast("Boletín del grupo descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarBoletinIndividual(n){
  try{
    const c = califs()[n]||{};
    const nf = notaDe(n);
    const doc = new jspdf.jsPDF();
    cabeceraPdf(doc, "Reporte individual · Alumno "+n+" · "+S.docente.periodo,
      "Nivel "+S.docente.nivel+" · Grado "+S.docente.grado+" · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—"));
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
    doc.save("reporte-alumno-"+n+"-"+S.docente.periodo.replace(/ /g,"-").toLowerCase()+".pdf");
    toast("Reporte individual descargado");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}

/* ---------- INICIO ---------- */
if(S.docente && S.docente.id){
  mostrar("mes");
  cargarPlanes().then(()=>{ generarNotificaciones(); if($("scr-mes").classList.contains("visible")) renderMes(); });
  flush();
}else{
  mostrar("onboarding");
}
