/* ============================================================
   PLANIFICACIÓN DOCENTE · LA MARIPOSA 🦋
   Colegio Reformado la Esperanza · Nivel Inicial
   Alineada al Currículo MINERD · Rep. Dominicana · 2026-2027
   ============================================================ */

const SYNC_URL = "https://ca-68f01a11.base44.app/functions/syncDatosDocente";
const ANIO_ESCOLAR = "2026-2027";
const HOY = new Date().toISOString().slice(0,10);

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

/* ---------- PLAN ANUAL 2026-2027 (calendario MINERD) ---------- */
const PLAN_ANUAL = [
  { mes:"Agosto 2026", trimestre:"1er Trimestre", tema:"Mi escuela y yo", enfoque:"Adaptación escolar, hábitos y rutinas, normas de convivencia.", contenidos:"Mi salón · Mi maestra · Mis compañeros · Rutinas del día", evaluacion:"Observación directa del proceso de adaptación." },
  { mes:"Septiembre 2026", trimestre:"1er Trimestre", tema:"La Mariposa", actual:true, enfoque:"El ciclo de vida de la mariposa: descubrimiento, indagación y metamorfosis.", contenidos:"Características · Ciclo de vida · Cuidado de la naturaleza", evaluacion:"Evaluación lúdica por estaciones · Registro diario de logros." },
  { mes:"Octubre 2026", trimestre:"1er Trimestre", tema:"Mi cuerpo y mis sentidos", enfoque:"Identificación de partes del cuerpo y los cinco sentidos.", contenidos:"Mi cuerpo · Los sentidos · Higiene y autocuidado", evaluacion:"Circuitos de experimentación sensorial." },
  { mes:"Noviembre 2026", trimestre:"Cierre 1er T.", tema:"La familia y mi comunidad", enfoque:"Estructura familiar, roles y espacios de la comunidad.", contenidos:"Mi familia · Mi casa · Mi barrio · Oficios", evaluacion:"Maqueta comunitaria y socialización familiar." },
  { mes:"Diciembre 2026", trimestre:"2do Trimestre", tema:"Festividades y tradiciones dominicanas", enfoque:"Identidad cultural y celebraciones locales.", contenidos:"Navidad · Gusta (guilt trip) · Villancicos · Comidas típicas", evaluacion:"Festival navideño infantil." },
  { mes:"Enero 2027", trimestre:"2do Trimestre", tema:"El invierno y el clima", enfoque:"Fenómenos naturales: lluvia, sol, viento y frío.", contenidos:"El clima · Vestimenta según estación · El agua y el sol", evaluacion:"Experimentos sencillos de observación." },
  { mes:"Febrero 2027", trimestre:"2do Trimestre", tema:"Los medios de transporte", enfoque:"Medios de transporte terrestres, aéreos y acuáticos.", contenidos:"Vehículos · Señales de tránsito · Viajes imaginarios", evaluacion:"Circuito de tránsito escolar." },
  { mes:"Marzo 2027", trimestre:"3er Trimestre", tema:"Las plantas y la primavera", enfoque:"Cultivo, cuidado y partes de una planta.", contenidos:"La semilla · La raíz · La flor · Huerto escolar", evaluacion:"Exposición del huerto del aula." },
  { mes:"Abril 2027", trimestre:"3er Trimestre", tema:"El agua, fuente de vida", enfoque:"Importancia del agua y su cuidado responsable.", contenidos:"El agua · Estados del agua · Cuidado del recurso", evaluacion:"Proyecto: Ahorradores de agua." },
  { mes:"Mayo 2027", trimestre:"3er Trimestre", tema:"Los alimentos saludables", enfoque:"Alimentación balanceada y hábitos de salud.", contenidos:"Frutas · Verduras · El desayuno · La lonchera", evaluacion:"Mercadito saludable." },
  { mes:"Junio 2027", trimestre:"Cierre de año", tema:"El mar y sus criaturas · Cierre", enfoque:"Vida marina y recapitulación del año escolar.", contenidos:"El mar · Peces · Playa limpia · Repaso general", evaluacion:"Evaluación final lúdica y acto de clausura." },
];

/* ---------- MESES DISPONIBLES (más reciente arriba) ---------- */
const MESES = [
  { id:"sep-2026", titulo:"Planificación Mensual · La Mariposa 🦋", mes:"Septiembre 2026", tema:"La Mariposa", estado:"activa", semanas:5 },
  { id:"oct-2026", titulo:"Planificación Mensual · Mi cuerpo y mis sentidos", mes:"Octubre 2026", tema:"Mi cuerpo y mis sentidos", estado:"preparacion", semanas:4 },
  { id:"nov-2026", titulo:"Planificación Mensual · La familia y mi comunidad", mes:"Noviembre 2026", tema:"La familia y mi comunidad", estado:"preparacion", semanas:4 },
  { id:"dic-2026", titulo:"Planificación Mensual · Festividades y tradiciones", mes:"Diciembre 2026", tema:"Festividades dominicanas", estado:"preparacion", semanas:3 },
];

/* ---------- UNIDAD: LA MARIPOSA (Septiembre 2026) ---------- */
const UNIDAD = {
  id:"sep-2026",
  titulo:"Planificación Mensual · La Mariposa 🦋",
  mes:"Septiembre 2026",
  nivel:"Inicial", grado:"Inicial", seccion:"A",
  tema:"La Mariposa",
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
const LS_KEY = "mariposa_app_v1";
function cargarEstado(){
  try{ const d = JSON.parse(localStorage.getItem(LS_KEY)); if(d && d.docente) return d; }catch(e){}
  return { docente:{nombre:"",grado:"Inicial",seccion:"A",alumnos:24}, asistencia:{}, evaluacion:{}, obs:{}, cola:[], lastSync:null };
}
let S = cargarEstado();
function guardar(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); }catch(e){} }

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
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(124,58,237,.12)" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 ${size/2} ${size/2})"/>
    <text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle" font-size="${Math.round(size/4)}" font-weight="800" fill="${color}">${esc(txt)}</text>
  </svg>`;
}
function todasClases(){
  const arr=[];
  UNIDAD.semanas.forEach(s=>s.dias.forEach(d=>arr.push(d)));
  return arr;
}
function clasePorId(id){ return todasClases().find(d=>d.id===id); }
function pctDia(claseId, tipo){
  const N = S.docente.alumnos;
  const mapa = tipo==="asis"? S.asistencia : S.evaluacion;
  const reg = mapa[claseId]||{};
  const clave = tipo==="asis"? "Presente":"Logrado";
  let n=0; for(let i=1;i<=N;i++) if(reg[i]===clave) n++;
  return Math.round(n*100/N);
}
function pctAsisMes(){
  const clases = todasClases().filter(d=>S.asistencia[d.id]&&Object.keys(S.asistencia[d.id]).length);
  if(!clases.length) return 0;
  let sum=0; clases.forEach(c=>sum+=pctDia(c.id,"asis"));
  return Math.round(sum/clases.length);
}
function pctEvalMes(){
  const clases = todasClases().filter(d=>S.evaluacion[d.id]&&Object.keys(S.evaluacion[d.id]).length);
  if(!clases.length) return 0;
  let sum=0; clases.forEach(c=>sum+=pctDia(c.id,"eval"));
  return Math.round(sum/clases.length);
}

/* ---------- SINCRONIZACIÓN (función Deno) ---------- */
function metaClase(claseId){
  const d = clasePorId(claseId) || {id:claseId, etiqueta:"", titulo:""};
  return {
    docente_nombre: S.docente.nombre || "Docente",
    asignatura: "Nivel Inicial · La Mariposa",
    grado: S.docente.grado || "Inicial",
    seccion: S.docente.seccion || "A",
    fecha: claseId,
    clase_id: claseId,
    clase_titulo: (d.etiqueta? d.etiqueta+" · ":"") + (d.titulo||""),
    anio_escolar: ANIO_ESCOLAR,
  };
}
function encolar(tipo, claseId, item, texto){
  S.cola.push({ tipo, claseId, item: item||null, texto: texto||null, ts: Date.now() });
  guardar();
  programarFlush();
}
function programarFlush(){ clearTimeout(window._flushT); window._flushT = setTimeout(flush, 1200); }
async function flush(){
  if(window._flushing || !S.cola.length) return;
  window._flushing = true;
  const pend = S.cola.slice(0, 20);
  // Agrupar por tipo+clase
  const grupos = {};
  pend.forEach(p=>{
    const k = p.tipo+"|"+p.claseId;
    if(!grupos[k]) grupos[k] = { tipo:p.tipo, claseId:p.claseId, items:[], texto:null };
    if(p.tipo==="observacion"){ grupos[k].texto = p.texto; }
    else if(p.item){ grupos[k].items.push(p.item); }
  });
  let enviados = 0;
  for(const k of Object.keys(grupos)){
    const g = grupos[k];
    const body = { tipo:g.tipo, ...metaClase(g.claseId) };
    if(g.tipo==="observacion"){ body.observacion = g.texto||""; }
    else { body.items = g.items; }
    try{
      const r = await fetch(SYNC_URL, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
      if(r.ok){ enviados++; }
    }catch(e){ /* sin conexión: queda en cola */ }
  }
  if(enviados>0){
    // quitar de la cola los enviados
    S.cola = S.cola.slice(pend.length);
    S.lastSync = new Date().toISOString();
    guardar();
  }
  window._flushing = false;
  if(S.cola.length) programarFlush();
  if($("scr-info").classList.contains("visible")) renderInfo();
}
document.addEventListener("visibilitychange", ()=>{ if(!document.hidden) flush(); });

/* ---------- NAVEGACIÓN ---------- */
let navStack = [];
const TITULOS = {
  anio:["Plan Anual "+ANIO_ESCOLAR,"Calendario escolar MINERD · 3 trimestres"],
  mes:["Planificación Mensual","Elige un plan para ver el detalle"],
  semanas:["Semanas del año escolar","Organizadas de más reciente a más antigua"],
  ciclo:["El Ciclo de la Mariposa","Huevo → Oruga → Crisálida → Mariposa"],
  info:["Información y Ajustes","Datos del docente y sincronización"],
  "mes-detalle":["Planificación Mensual","Detalle completo de la unidad"],
  clase:["Clase del día","Lista para enseñar"],
};
function irA(scr, arg){
  if(!navStack.length || navStack[navStack.length-1]!==scr) navStack.push(scr);
  mostrar(scr, arg);
}
function volver(){
  navStack.pop();
  const prev = navStack.pop() || "mes";
  irA(prev);
}
function mostrar(scr, arg){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("visible"));
  const el = $("scr-"+scr); if(el) el.classList.add("visible");
  document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("sel", b.dataset.scr===scr));
  const esNivel1 = ["anio","mes","semanas","ciclo","info"].includes(scr);
  $("btnAtras").classList.toggle("visible", !esNivel1);
  const [t, s] = TITULOS[scr]||["Planificación La Mariposa",""];
  $("tituloApp").textContent = t; $("subtituloApp").textContent = s;
  if(scr==="anio") renderAnio();
  if(scr==="mes") renderMes();
  if(scr==="mes-detalle") renderMesDetalle(arg);
  if(scr==="semanas") renderSemanas();
  if(scr==="clase") renderClase(arg);
  if(scr==="ciclo") renderCiclo();
  if(scr==="info") renderInfo();
  window.scrollTo({top:0});
}

/* ---------- RENDER: AÑO ---------- */
function renderAnio(){
  const actual = PLAN_ANUAL.find(m=>m.actual);
  let html = `
  <div class="hero">
    <h2>Plan Anual ${ANIO_ESCOLAR} 🦋</h2>
    <p>Planificación docente alineada al currículo MINERD. Año escolar: agosto 2026 – junio 2027 · 3 trimestres.</p>
    <div class="row">
      <div class="ringbox">${ring(pctAsisMes(),56,7,"#fff")}<small>Asistencia</small></div>
      <div class="ringbox">${ring(pctEvalMes(),56,7,"#fff")}<small>Logros</small></div>
      <div class="ringbox">${ring(Math.round((Object.keys(S.obs).length/todasClases().length)*100),56,7,"#fff","")}${Object.keys(S.obs).length}/${todasClases().length}<small>Notas</small></div>
    </div>
  </div>
  <div class="card">
    <h2>🏆 Unidad actual</h2>
    <b style="color:var(--violeta-osc)">${actual.mes} · ${actual.tema}</b>
    <p class="muted" style="margin-top:4px">${actual.enfoque}</p>
    <p class="muted" style="margin-top:6px"><b>Contenidos:</b> ${actual.contenidos}</p>
    <p class="muted" style="margin-top:6px"><b>Evaluación:</b> ${actual.evaluacion}</p>
  </div>
  <h2 class="mini">Calendario por trimestre (MINERD)</h2>`;
  let trimestreAnt = "";
  PLAN_ANUAL.forEach(m=>{
    if(m.trimestre!==trimestreAnt){ trimestreAnt=m.trimestre; html+=`<div class="sep">${m.trimestre}</div>`; }
    const esActual = m.actual;
    html += `<div class="item" style="cursor:default">
      <div class="ic">${esActual?"🦋":" 📅"}</div>
      <div class="tx"><b>${esc(m.mes)} · ${esc(m.tema)}</b><span>${esc(m.contenidos)}</span></div>
      ${esActual?'<span class="hoy-badge">ACTUAL</span>':""}
    </div>`;
  });
  html += `
  <div class="card">
    <h2>🎯 Competencias fundamentales (MINERD)</h2>
    ${COMPETENCIAS.map((c,i)=>`<p style="font-size:12.5px;margin-bottom:8px"><b style="color:var(--violeta-osc)">${i+1}. ${esc(c.n)}:</b> <span class="muted">${esc(c.d)}</span></p>`).join("")}
  </div>
  <button class="dl dl-grande" onclick="descargarPlanAnualDocx()">⬇ Descargar plan anual (Word .docx)</button>
  <div style="height:14px"></div>`;
  $("scr-anio").innerHTML = html;
}

/* ---------- RENDER: MES ---------- */
function renderMes(){
  let html = `<div class="hero"><h2>Planes Mensuales 🗓️</h2>
    <p>Toca una tarjeta para ver el plan completo de la unidad.</p></div>
    <div class="sep">Más reciente primero</div>`;
  MESES.forEach(m=>{
    const activa = m.estado==="activa";
    const ico = activa? "🦋" : "🗓️";
    const chip = activa? '<span class="hoy-badge">ACTIVA</span>':'<span class="chip gris">En preparación</span>';
    html += `<div class="item" onclick="irA('mes-detalle','${m.id}')">
      <div class="ic">${ico}</div>
      <div class="tx"><b>${esc(m.titulo)}</b><span>${esc(m.mes)} · ${m.semanas} semanas</span></div>
      ${activa? `<div class="rg">${ring(pctAsisMes(),46,6,"#14b8a6")}</div>` : chip}
    </div>`;
  });
  html += `<p class="muted" style="text-align:center;padding:10px 16px">Los planes en preparación muestran el avance previsto según el plan anual MINERD.</p>`;
  $("scr-mes").innerHTML = html;
}

/* ---------- RENDER: MES DETALLE ---------- */
function renderMesDetalle(mesId){
  const m = MESES.find(x=>x.id===mesId);
  if(!m){ irA("mes"); return; }
  if(m.estado!=="activa"){
    const anual = PLAN_ANUAL.find(p=>p.mes===m.mes);
    $("scr-mes-detalle").innerHTML = `
      <div class="hero"><h2>${esc(m.titulo)}</h2><p>Plan en preparación 🚧</p></div>
      <div class="card"><h2>📖 Enfoque previsto</h2><p class="muted">${esc(anual? anual.enfoque:"")}</p>
      <h3>Contenidos</h3><p class="muted">${esc(anual? anual.contenidos:"")}</p>
      <h3>Evaluación prevista</h3><p class="muted">${esc(anual? anual.evaluacion:"")}</p></div>
      <p class="vacio">Las clases diarias de esta unidad se activarán cuando la dirección la apruebe.</p>`;
    return;
  }
  const semanasInv = [...UNIDAD.semanas].reverse();
  let html = `
  <div class="hero">
    <h2>${esc(UNIDAD.titulo)}</h2>
    <p>${esc(UNIDAD.mes)} · Nivel ${esc(UNIDAD.nivel)} · Sección ${esc(S.docente.seccion)} · Tema: ${esc(UNIDAD.tema)}</p>
    <div class="row">
      <div class="ringbox">${ring(pctAsisMes(),56,7,"#fff")}<small>Asistencia</small></div>
      <div class="ringbox">${ring(pctEvalMes(),56,7,"#fff")}<small>Logros</small></div>
      <div class="ringbox">${ring(100,56,7,"#fff","5")}<small>Semanas</small></div>
    </div>
  </div>
  <div class="card">
    <h2>🎯 Competencias de la unidad</h2>
    ${COMPETENCIAS.slice(0,5).map(c=>`<span class="chip">${esc(c.n)}</span>`).join("")}
    <h3>Áreas curriculares (MINERD Inicial)</h3>
    ${UNIDAD.areas.map(a=>`<span class="chip teal">${esc(a)}</span>`).join("")}
  </div>
  <div class="sep">Semanas · más reciente arriba</div>`;
  semanasInv.forEach(s=>{
    const pctW = Math.round(s.dias.reduce((a,d)=>a+pctDia(d.id,"asis"),0)/s.dias.length);
    html += `<div class="item" onclick="irA('clase'); abrirSemana(${s.numero})">
      <div class="ic">🐛</div>
      <div class="tx"><b>Semana ${s.numero} · ${esc(s.tema)}</b><span>${esc(s.fechas)} · ${s.dias.length} clases diarias</span></div>
      <div class="rg">${ring(pctW,46,6,"#14b8a6")}</div>
    </div>
    <div class="card" style="padding:10px 12px">
      ${s.dias.slice().reverse().map(d=>{
        const esHoy = d.id===HOY;
        return `<div class="item" style="margin-bottom:8px;box-shadow:none;background:rgba(255,255,255,.6)" onclick="event.stopPropagation(); abrirClase('${d.id}')">
          <div class="ic" style="width:38px;height:38px;font-size:17px;border-radius:12px">🦋</div>
          <div class="tx"><b style="font-size:12.5px">${esc(d.etiqueta)} · ${esc(d.titulo)}</b><span>${esHoy?"HOY":"Ver clase completa ›"}</span></div>
          ${esHoy?'<span class="hoy-badge">HOY</span>':""}
        </div>`;
      }).join("")}
    </div>`;
  });
  html += `<button class="dl dl-grande" onclick="descargarPlanMensualDocx()">⬇ Descargar plan mensual en Word (.docx)</button>
  <div style="height:14px"></div>`;
  $("scr-mes-detalle").innerHTML = html;
}
function abrirSemana(num){ /* placeholder: el usuario navega por clases */ }

/* ---------- RENDER: SEMANAS ---------- */
function renderSemanas(){
  let html = `<div class="hero"><h2>Semanas del año 🗓️</h2><p>Organizadas de más reciente a más antigua, con el mes identificado.</p></div>`;
  const porMes = {};
  UNIDAD.semanas.forEach(s=>{
    (porMes["Septiembre 2026"] = porMes["Septiembre 2026"]||[]).push(s);
  });
  Object.keys(porMes).forEach(mes=>{
    const semanasInv = [...porMes[mes]].reverse();
    semanasInv.forEach(s=>{
      const actual = s.dias.some(d=>d.id===HOY);
      html += `<div class="sep">${mes}${actual?" · EN CURSO":""}</div>`;
      const pctW = Math.round(s.dias.reduce((a,d)=>a+pctDia(d.id,"asis"),0)/s.dias.length);
      html += `<div class="card" style="padding:13px">
        <div style="display:flex;align-items:center;gap:12px;cursor:pointer" onclick="irA('mes-detalle','sep-2026')">
          <div class="rg">${ring(pctW,50,6,"#14b8a6")}</div>
          <div style="flex:1"><b style="color:var(--violeta-osc);font-size:14px">Semana ${s.numero} · ${esc(s.tema)}</b>
          <p class="muted" style="margin-top:2px">${esc(s.fechas)}</p></div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
        ${s.dias.slice().reverse().map(d=>`<span class="chip ${d.id===HOY?"rosa":""}" style="cursor:pointer" onclick="abrirClase('${d.id}')">${d.id===HOY?"⭐ ":""}${esc(d.etiqueta.split(" ")[0])} ${esc(d.etiqueta.split(" ")[1])}</span>`).join("")}
        </div>
      </div>`;
    });
  });
  $("scr-semanas").innerHTML = html;
}
function abrirClase(claseId){ irA("clase", claseId); }

/* ---------- RENDER: CLASE ---------- */
let claseActual = null;
function renderClase(claseId){
  const d = clasePorId(claseId);
  if(!d){ irA("mes"); return; }
  claseActual = claseId;
  const pctA = pctDia(claseId,"asis"), pctE = pctDia(claseId,"eval");
  const s = UNIDAD.semanas.find(w=>w.dias.some(x=>x.id===claseId));
  let html = `
  <div class="card">
    <div class="clase-head">
      <div class="tit">
        ${d.id===HOY?'<span class="hoy-badge">HOY</span>':""}
        <h2 style="font-size:18px">${esc(d.etiqueta)} · ${esc(d.titulo)}</h2>
        <p>Semana ${s.numero}: ${esc(s.tema)} · ${esc(UNIDAD.mes)}</p>
      </div>
      <div class="rg" id="headRings" style="display:flex;gap:2px">
        ${ring(pctA,52,6,"#14b8a6")}${ring(pctE,52,6,"#ec4899")}
      </div>
    </div>
  </div>
  <div class="card">
    <h2>🎯 Desempeños y objetivos de la clase</h2>
    ${d.desempenos.map(x=>`<p style="font-size:13px;margin-bottom:6px">✅ ${esc(x)}</p>`).join("")}
    <div style="margin-top:8px">${COMPETENCIAS.slice(0,3).map(c=>`<span class="chip">${esc(c.n)}</span>`).join("")}</div>
  </div>
  <h2 class="mini">Momentos de la clase · paso a paso</h2>
  ${d.momentos.map((m,i)=>`
    <div class="momento">
      <div class="m-head"><div class="m-num">${i+1}</div><b>${m.icono} ${esc(m.nombre)}</b><span class="dur">${esc(m.duracion)}</span></div>
      <p class="prop">Propósito: ${esc(m.proposito)}</p>
      <ol>${m.pasos.map(p=>`<li>${esc(p)}</li>`).join("")}</ol>
      ${i===0? temporizadorHTML() : ""}
    </div>`).join("")}
  <div class="card">
    <h2>🎒 Recursos de la clase</h2>
    ${d.recursos.map(r=>`<span class="chip rosa">${esc(r)}</span>`).join("")}
    <div class="nota" style="margin-top:12px"><b>💡 Orientaciones pedagógicas</b>${esc(d.orientacion)}</div>
  </div>
  <div class="card">
    <h2>🧒 Registro del día · ${S.docente.alumnos} alumnos</h2>
    <div class="tabs">
      <div class="tab sel" id="tabA" onclick="tabClase('A')">✅ Asistencia</div>
      <div class="tab" id="tabE" onclick="tabClase('E')">📝 Evaluación</div>
    </div>
    <div id="zonaA">${alumnosHTML(claseId,"A")}</div>
    <div id="zonaE" style="display:none">${alumnosHTML(claseId,"E")}</div>
    <div class="row-rings" style="display:flex;justify-content:space-around;margin-top:12px">
      <div style="text-align:center">${ring(pctA,64,7,"#14b8a6")}<small class="muted" style="display:block;font-weight:700">Presentes</small></div>
      <div style="text-align:center">${ring(pctE,64,7,"#ec4899")}<small class="muted" style="display:block;font-weight:700">Logrado</small></div>
    </div>
  </div>
  <div class="card">
    <h2>🗒️ Nota de observación del día</h2>
    <textarea class="obs" id="obsTxt" placeholder="Registra aquí lo más relevante del día: logros, dificultades, situaciones del grupo...">${esc(S.obs[claseId]||"")}</textarea>
    <p class="muted" style="margin-top:6px">💾 Se guarda automáticamente y se sincroniza con la dirección.</p>
  </div>
  <button class="dl" onclick="descargarPlanDiarioDocx('${claseId}')">⬇ Descargar plan diario en Word (.docx)</button>
  <button class="dl alt" onclick="descargarAsistenciaXlsx('${claseId}')">⬇ Descargar asistencia en Excel (.xlsx)</button>
  <button class="dl alt2" onclick="descargarEvaluacionPdf('${claseId}')">⬇ Descargar evaluación en PDF</button>
  <div style="height:14px"></div>`;
  $("scr-clase").innerHTML = html;
  initTimer();
  $("obsTxt").addEventListener("input", ()=>{
    S.obs[claseId] = $("obsTxt").value;
    guardar();
    clearTimeout(window._obsT);
    window._obsT = setTimeout(()=>{ encolar("observacion", claseId, null, S.obs[claseId]); toast("Observación sincronizada ✓"); }, 1500);
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
          <button class="${st===null?"selA":""}" onclick="marcar('A','${claseId}',${i},null)">Sin registrar</button>
          <button class="${st==="Ausente"?"selP":""}" onclick="marcar('A','${claseId}',${i},'Ausente')">Ausente</button>
        </div></div>`;
    } else {
      html += `<div class="alumno"><div class="an">${i}</div><div class="anx">Alumno ${i}</div>
        <div class="seg">
          <button class="${st==="Logrado"?"selL":""}" onclick="marcar('E','${claseId}',${i},'Logrado')">Logrado</button>
          <button class="${st==="En proceso"?"selEP":""}" onclick="marcar('E','${claseId}',${i},'En proceso')">En proceso</button>
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
  if(claseId!==claseActual) return;
  if(tipo==="A") $("zonaA").innerHTML = alumnosHTML(claseId,"A");
  else $("zonaE").innerHTML = alumnosHTML(claseId,"E");
  refrescarRingsClase(claseId);
}
function refrescarRingsClase(claseId){
  const el = $("headRings");
  if(el) el.innerHTML = ring(pctDia(claseId,"asis"),52,6,"#14b8a6") + ring(pctDia(claseId,"eval"),52,6,"#ec4899");
}
function tabClase(t){
  $("tabA").classList.toggle("sel", t==="A");
  $("tabE").classList.toggle("sel", t==="E");
  $("zonaA").style.display = t==="A"?"":"none";
  $("zonaE").style.display = t==="E"?"":"none";
}

/* ---------- TEMPORIZADOR INTERACTIVO ---------- */
function temporizadorHTML(){
  return `
  <div class="timer-wrap" id="timerBox">
    <div class="timer-ring">
      <svg width="96" height="96">
        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(124,58,237,.12)" stroke-width="8"/>
        <circle id="timerRing" cx="48" cy="48" r="40" fill="none" stroke="#ec4899" stroke-width="8"
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
        <button class="btn-soft" id="btnPlay" onclick="playTimer()">▶ Iniciar</button>
        <button class="btn-soft" onclick="resetTimer()">↺ Reiniciar</button>
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
  $("btnPlay").textContent = "▶ Iniciar";
  $("timerBox").classList.remove("timer-corriendo");
}
function pintarTimer(){
  const m = Math.floor(T.resta/60), s = T.resta%60;
  $("timerTxt").textContent = String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  const off = CIRC*(1-T.resta/T.dur);
  $("timerRing").style.strokeDashoffset = off;
}
function playTimer(){
  if(T.corriendo){ // pausar
    T.corriendo=false; clearInterval(T.iv);
    $("btnPlay").textContent="▶ Continuar"; $("timerEstado").textContent="En pausa";
    $("timerBox").classList.remove("timer-corriendo");
    return;
  }
  T.corriendo=true; $("btnPlay").textContent="⏸ Pausar"; $("timerEstado").textContent="¡Corriendo!";
  $("timerBox").classList.add("timer-corriendo");
  T.iv = setInterval(()=>{
    T.resta--;
    pintarTimer();
    if(T.resta<=0){
      clearInterval(T.iv); T.corriendo=false; T.resta=T.dur;
      $("btnPlay").textContent="▶ Iniciar"; $("timerEstado").textContent="¡Tiempo!";
      $("timerBox").classList.remove("timer-corriendo");
      beep(); toast("⏰ ¡Se acabó el tiempo del Inicio!");
    }
  },1000);
}
function resetTimer(){
  clearInterval(T.iv); T.corriendo=false; T.resta=T.dur;
  pintarTimer(); $("btnPlay").textContent="▶ Iniciar"; $("timerEstado").textContent="Listo";
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

/* ---------- RENDER: CICLO ---------- */
function renderCiclo(){
  const etapas = [
    { em:"🥚", n:"Huevo", d:"La mariposa mamá pone sus huevos en las hojas.", sem:"Semana 2" },
    { em:"🐛", n:"Oruga", d:"Nace, come hojas y crece cada día más.", sem:"Semana 2" },
    { em:"🛖", n:"Crisálida", d:"Teje su casa y duerme mientras se transforma.", sem:"Semana 3" },
    { em:"🦋", n:"Mariposa", d:"¡Sale con sus alas nuevas y vuela al jardín!", sem:"Semanas 4-5" },
  ];
  const pct = pctAsisMes();
  let html = `
  <div class="hero">
    <h2>El Ciclo de la Mariposa 🦋</h2>
    <p>Eje central de la unidad de septiembre. Cuatro etapas que los niños descubren, dramatizan y cantan.</p>
    <div class="row">
      <div class="ringbox">${ring(pct,56,7,"#fff")}<small>Progreso unidad</small></div>
      <div class="ringbox">${ring(pctEvalMes(),56,7,"#fff")}<small>Logros</small></div>
    </div>
  </div>
  <div class="ciclo-grid">
    ${etapas.map(e=>`<div class="ciclo-card ${e.n==="Mariposa"?"activo":""}">
      <div class="em">${e.em}</div><b>${esc(e.n)}</b><span>${esc(e.d)}</span>
      <span class="chip rosa" style="margin-top:8px">${esc(e.sem)}</span>
    </div>`).join("")}
  </div>
  <div class="card" style="margin-top:14px">
    <h2>🎼 Nuestra rima del ciclo</h2>
    <p style="font-size:14px;line-height:2;text-align:center;font-style:italic">
      "Huevo, oruga, capullo y mariposa,<br>así crece, así crece una cosa hermosa;<br>
      come hojas, se hace su casita,<br>y de pronto... ¡sale a volar cual mariposita!" 🦋
    </p>
  </div>
  <div class="card">
    <h2>🌿 Valores del ciclo (competencias MINERD)</h2>
    <span class="chip verde">Cuidado de la vida y el ambiente</span>
    <span class="chip">Razonamiento lógico y creativo</span>
    <span class="chip rosa">Convivencia y ciudadanía</span>
  </div>`;
  $("scr-ciclo").innerHTML = html;
}

/* ---------- RENDER: INFO ---------- */
function renderInfo(){
  const pend = S.cola.length;
  const ult = S.lastSync? new Date(S.lastSync).toLocaleString("es-DO") : "Aún no sincroniza";
  $("scr-info").innerHTML = `
  <div class="hero"><h2>Ajustes e información ℹ️</h2>
  <p>Planificación La Mariposa · PWA oficial del Colegio Reformado la Esperanza.</p></div>
  <div class="card">
    <h2>👩‍🏫 Datos del docente</h2>
    <label class="lbl">Nombre completo</label>
    <input class="inp" id="inpNombre" value="${esc(S.docente.nombre)}" placeholder="Tu nombre">
    <label class="lbl">Sección</label>
    <input class="inp" id="inpSeccion" value="${esc(S.docente.seccion)}" placeholder="A">
    <label class="lbl">Cantidad de alumnos</label>
    <input class="inp" id="inpAlumnos" type="number" min="1" max="60" value="${S.docente.alumnos}">
    <button class="dl" onclick="guardarDocente()">💾 Guardar datos</button>
  </div>
  <div class="card">
    <h2>🔄 Sincronización automática</h2>
    <div class="stat-row"><span><span class="punto" style="background:${pend?"#f59e0b":"#10b981"}"></span>Estado</span><b>${pend? pend+" pendiente(s) en cola":"Todo sincronizado ✓"}</b></div>
    <div class="stat-row"><span>Última sincronización</span><b>${esc(ult)}</b></div>
    <div class="stat-row"><span>Destino</span><b style="font-size:11px">Función Deno · Dirección</b></div>
    <button class="dl alt" onclick="flush(); toast('Sincronizando...')">🔄 Sincronizar ahora</button>
  </div>
  <div class="card">
    <h2>🎓 Alineación curricular</h2>
    <p class="muted">Contenido basado en el currículo vigente del MINERD para Nivel Inicial: enfoque por competencias fundamentales, situaciones de aprendizaje lúdicas y evaluación formativa diaria. Calendario escolar dominicano: agosto – junio, 3 trimestres.</p>
  </div>
  <div class="card">
    <h2>⚠️ Zona delicada</h2>
    <p class="muted">Borrar los datos locales elimina asistencias, evaluaciones y observaciones guardadas en este dispositivo (ya enviadas a la dirección no se pierden).</p>
    <button class="dl alt2" onclick="borrarTodo()">🗑 Borrar datos locales</button>
  </div>
  <p class="vacio">Colegio Reformado la Esperanza · DGtech · Delega IA · 2026</p>`;
}
function guardarDocente(){
  S.docente.nombre = $("inpNombre").value.trim();
  S.docente.seccion = $("inpSeccion").value.trim()||"A";
  S.docente.alumnos = Math.max(1, Math.min(60, parseInt($("inpAlumnos").value)||24));
  guardar(); toast("Datos del docente guardados ✓"); renderInfo();
}
function borrarTodo(){
  if(!confirm("¿Seguro que deseas borrar asistencias, evaluaciones y observaciones de este dispositivo?")) return;
  S.asistencia={}; S.evaluacion={}; S.obs={}; guardar();
  toast("Datos locales borrados"); renderInfo();
}

/* ---------- DESCARGAS ---------- */
function docxCabecera(D, labels){
  return new D.TableRow({ tableHeader:true, children: labels.map(t=> new D.TableCell({
    shading:{fill:"7c3aed"},
    children:[ new D.Paragraph({ children:[ new D.TextRun({ text:t, bold:true, color:"FFFFFF" }) ] }) ]
  }))});
}


function nombreArchivo(base){ return base+"-la-mariposa-septiembre-2026"; }
async function docxDe(blob, nombre){
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = nombre;
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 400);
}
async function descargarPlanAnualDocx(){
  try{
    const D = docx;
    const filas = [];
    PLAN_ANUAL.forEach(m=>{
      filas.push(new D.TableRow({ children:[
        new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:m.mes, bold:true})]})]}),
        new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:m.tema})]})]}),
        new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:m.trimestre})]})]}),
      ]}));
    });
    const doc = new D.Document({ sections:[{ children:[
      new D.Paragraph({ text:"Colegio Reformado la Esperanza", heading:D.HeadingLevel.HEADING_1, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Plan Anual Docente "+ANIO_ESCOLAR+" · Nivel Inicial · Currículo MINERD", alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Docente: "+(S.docente.nombre||"—")+" · Sección "+S.docente.seccion, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Año escolar: agosto 2026 – junio 2027 · 3 trimestres", alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"", spacing:{after:200} }),
      new D.Table({ width:{size:100, type:D.WidthType.PERCENTAGE}, rows:[
        docxCabecera(D, ["Mes","Tema","Trimestre"]),
        ...filas ]}),
      new D.Paragraph({ text:"Competencias fundamentales (MINERD)", spacing:{before:300}, heading:D.HeadingLevel.HEADING_2 }),
      ...COMPETENCIAS.map(c=>new D.Paragraph({ text:"• "+c.n+": "+c.d })),
      new D.Paragraph({ text:"Enfoques por mes", spacing:{before:300}, heading:D.HeadingLevel.HEADING_2 }),
      ...PLAN_ANUAL.map(m=>new D.Paragraph({ spacing:{before:120}, children:[
        new D.TextRun({ text:m.mes+" — "+m.tema, bold:true, break:0 }),
        new D.TextRun({ text:" Enfoque: "+m.enfoque+" | Evaluación: "+m.evaluacion })
      ]})),
    ]}]});
    await docxDe(await D.Packer.toBlob(doc), "plan-anual-"+ANIO_ESCOLAR+".docx");
    toast("Plan anual descargado ✓");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
async function descargarPlanMensualDocx(){
  try{
    const D = docx;
    const children = [
      new D.Paragraph({ text:"Colegio Reformado la Esperanza", heading:D.HeadingLevel.HEADING_1, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:UNIDAD.titulo.replace("🦋","").trim(), heading:D.HeadingLevel.HEADING_2, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:UNIDAD.mes+" · Nivel Inicial · Sección "+S.docente.seccion+" · Año "+ANIO_ESCOLAR, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Docente: "+(S.docente.nombre||"—"), alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Competencias fundamentales vinculadas" }),
      ...COMPETENCIAS.slice(0,5).map(c=>new D.Paragraph({ text:"• "+c.n })),
    ];
    UNIDAD.semanas.forEach(s=>{
      children.push(new D.Paragraph({ spacing:{before:300}, heading:D.HeadingLevel.HEADING_2, text:"Semana "+s.numero+": "+s.tema+" ("+s.fechas+")" }));
      const filas = s.dias.map(d=> new D.TableRow({ children:[
        new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:d.etiqueta, bold:true})]})]}),
        new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:d.titulo})]})]}),
        new D.TableCell({ children:[new D.Paragraph({children:[new D.TextRun({text:d.desempenos.join("; ")})]})]}),
      ]}));
      children.push(new D.Table({ width:{size:100, type:D.WidthType.PERCENTAGE}, rows:[
        docxCabecera(D, ["Día","Clase","Desempeños"]),
        ...filas ]}));
    });
    const doc = new D.Document({ sections:[{ children }]});
    await docxDe(await D.Packer.toBlob(doc), nombreArchivo("plan-mensual")+".docx");
    toast("Plan mensual descargado ✓");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
async function descargarPlanDiarioDocx(claseId){
  try{
    const d = clasePorId(claseId); const s = UNIDAD.semanas.find(w=>w.dias.some(x=>x.id===claseId));
    const D = docx;
    const children = [
      new D.Paragraph({ text:"Colegio Reformado la Esperanza", heading:D.HeadingLevel.HEADING_1, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:d.etiqueta+" · "+d.titulo, heading:D.HeadingLevel.HEADING_2, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:UNIDAD.mes+" · Semana "+s.numero+": "+s.tema+" · Nivel Inicial · Sección "+S.docente.seccion, alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ text:"Docente: "+(S.docente.nombre||"—"), alignment:D.AlignmentType.CENTER }),
      new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Desempeños de la clase" }),
      ...d.desempenos.map(x=>new D.Paragraph({ text:"• "+x })),
      new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Momentos de la clase" }),
    ];
    d.momentos.forEach(m=>{
      children.push(new D.Paragraph({ spacing:{before:200}, children:[ new D.TextRun({ text:m.nombre+" ("+m.duracion+")", bold:true }) ]}));
      children.push(new D.Paragraph({ children:[ new D.TextRun({ text:"Propósito: "+m.proposito, italics:true }) ]}));
      m.pasos.forEach(p=>children.push(new D.Paragraph({ text:"  "+p, bullet:{level:0} })));
    });
    children.push(new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Recursos" }));
    children.push(new D.Paragraph({ text:d.recursos.map(r=>r.replace(/^[^\s]+\s/,"")).join(" · ") }));
    children.push(new D.Paragraph({ spacing:{before:200}, heading:D.HeadingLevel.HEADING_2, text:"Nota de observación del día" }));
    children.push(new D.Paragraph({ text:S.obs[claseId]||"—" }));
    const doc = new D.Document({ sections:[{ children }]});
    await docxDe(await D.Packer.toBlob(doc), "clase-"+claseId+"-"+d.titulo.replace(/[^\w]+/g,"-").toLowerCase()+".docx");
    toast("Plan diario descargado ✓");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarAsistenciaXlsx(claseId){
  try{
    const d = clasePorId(claseId);
    const N = S.docente.alumnos;
    const wb = XLSX.utils.book_new();
    const meta = [["Colegio Reformado la Esperanza"],["Asistencia · "+d.etiqueta+" · "+d.titulo],[UNIDAD.mes+" · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—")],[]];
    const a = meta.concat([["Alumno","Asistencia"]]);
    for(let i=1;i<=N;i++) a.push(["Alumno "+i, (S.asistencia[claseId]||{})[i]||"Sin registrar"]);
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a), "Asistencia del día");
    const b = meta.concat([["Alumno","Día","Fecha","Asistencia"]]);
    todasClases().forEach(c=>{
      const reg = S.asistencia[c.id]||{};
      for(let i=1;i<=N;i++) if(reg[i]) b.push(["Alumno "+i, c.etiqueta, c.id, reg[i]]);
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(b), "Historial del mes");
    XLSX.writeFile(wb, "asistencia-"+claseId+"-la-mariposa.xlsx");
    toast("Asistencia descargada ✓");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}
function descargarEvaluacionPdf(claseId){
  try{
    const d = clasePorId(claseId);
    const N = S.docente.alumnos;
    const doc = new jspdf.jsPDF();
    doc.setFillColor(124,58,237); doc.rect(0,0,210,30,"F");
    doc.setTextColor(255); doc.setFontSize(15); doc.text("Colegio Reformado la Esperanza", 105, 13, {align:"center"});
    doc.setFontSize(10); doc.text("Evaluación de logros · "+d.etiqueta+" · "+d.titulo, 105, 21, {align:"center"});
    doc.setTextColor(60); doc.setFontSize(9);
    doc.text(UNIDAD.mes+" · Nivel Inicial · Sección "+S.docente.seccion+" · Docente: "+(S.docente.nombre||"—"), 105, 38, {align:"center"});
    let y = 50;
    const reg = S.evaluacion[claseId]||{};
    for(let i=1;i<=N;i++){
      if(y>275){ doc.addPage(); y=20; }
      const st = reg[i]||"Sin evaluar";
      doc.setFillColor(st==="Logrado"?(16):st==="En proceso"?(245):(220), st==="Logrado"?(185):st==="En proceso"?(158):(220), st==="Logrado"?(129):st==="En proceso"?(11):(220));
      doc.circle(18, y-1.5, 2.2, "F");
      doc.setFontSize(10.5); doc.setTextColor(50);
      doc.text("Alumno "+String(i).padStart(2,"0"), 26, y);
      doc.setTextColor(st==="Logrado"?(4,120,87):st==="En proceso"?(180,83,9):(120));
      doc.text(st, 160, y);
      y += 9;
    }
    y += 6;
    const pct = pctDia(claseId,"eval");
    doc.setFontSize(12); doc.setTextColor(124,58,237);
    doc.text("Resumen: "+pct+"% de los alumnos con logro alcanzado · "+(S.obs[claseId]||"Sin observación del día."), 14, Math.min(y,285), {maxWidth:180});
    doc.save("evaluacion-"+claseId+"-la-mariposa.pdf");
    toast("Evaluación descargada ✓");
  }catch(e){ toast("Se necesita conexión para descargar"); }
}

/* ---------- INICIO ---------- */
mostrar("mes");
flush();
