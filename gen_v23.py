# -*- coding: utf-8 -*-
"""v23: Recrea los 12 planes mensuales de Inicial (Ago/Sep/Oct x 4 grados) con la
estructura oficial MINERD de Planificación Mensual (Unidad de Aprendizaje):
datos identificativos, situación de aprendizaje (partida/estrategia/proceso/producto),
competencias fundamentales + específicas, contenidos (triada), desglose por semanas y
evaluación (indicadores, técnicas, metacognición). Momentos de clase enriquecidos con
guías paso a paso ultra detalladas con ejemplos para docentes sin experiencia."""
import json, datetime, re, os

D = datetime.date

# ---------- helpers + datos v22 (Ago/Sep) ----------
src22 = open("gen_v22.py", encoding="utf-8").read()
seg22 = src22[:src22.find("# ======================= ENSAMBLADO")]
ns = {"json": json, "datetime": datetime, "os": os, "re": re}
exec(seg22, ns)
AGO, SEP = ns["AGO"], ns["SEP"]
TEMA_AGO, TEMA_SEP = ns["TEMA_AGO"], ns["TEMA_SEP"]
momentos_v17 = ns["momentos_v17"]; cotejo_v17 = ns["cotejo_v17"]
dias_habiles, trocear, etq = ns["dias_habiles"], ns["trocear"], ns["etq"]
COMP_INI, AREAS_INI, DESC_GRADO = ns["COMP_INI"], ns["AREAS_INI"], ns["DESC_GRADO"]
GRADOS_INI = ns["GRADOS_INI"]

# ---------- datos v17 (Octubre) ----------
src17 = open("gen_inicial_v17.py", encoding="utf-8").read()
seg17 = src17[:src17.find("def record_mensual(")]
exec(seg17, ns)
OCT, TEMA_OCT = ns["OCT"], ns["TEMA_OCT"]

# ==================== ESTRUCTURA MINERD POR PLAN ====================
TECNICAS_INI = [
  "Observación directa y sistemática durante cada momento de la clase",
  "Registro de logros en la app: Logrado, En proceso o Iniciado",
  "Lista de cotejo con evidencias por semana",
  "Portafolio del grado: producciones, fotos y anecdotario",
]

MINERD = {}

MINERD[("Maternal","Agosto")] = dict(
 partida="Los bebés llegan por primera vez a un espacio nuevo: extrañan a su familia, lloran o se aferran a objetos de casa mientras descubren a su maestra y a sus compañeros.",
 estrategia="Adaptación progresiva bajo la estrategia Centro de Interés: rutinas idénticas cada día, canciones-señal y acompañamiento afectivo uno a uno.",
 proceso="Semana a semana el bebé explora el aula con sus sentidos, reconoce las voces que lo cuidan, anticipa las rutinas con las canciones y acepta la merienda y el descanso en calma, con su objeto transicional siempre a mano.",
 producto="Un bebé que se despide de su familia sin angustia, reconoce su rincón, responde a la voz de su maestra y participa de las rutinas del día con bienestar.",
 conceptuales=["El aula y sus espacios: rincón de mimos, área de juego y espacio de descanso","Las personas que me cuidan: mi familia y mi maestra","Las rutinas del día: llegada, juego, merienda y descanso","Los objetos de apego: mi peluche y mi manta","Las sensaciones de calma: voz suave, abrazo y música"],
 procedimentales=["Explorar el entorno con los sentidos: tocar, mirar y escuchar","Responder con gestos, movimientos o balbuceos a la voz y a la canción","Aceptar el cuidado de la maestra en alimentación, higiene y sueño","Participar del juego libre con materiales seguros","Anticipar la rutina al escuchar la canción-señal"],
 actitudinales=["Confianza en las personas adultas que lo cuidan","Bienestar emocional durante la separación temporal de la familia","Disposición gozosa a explorar el entorno","Aceptación serena de las rutinas de cuidado"],
 especificas=["Comunicación: responde con balbuceos, gestos y miradas a la voz de su maestra","Pensamiento lógico: explora y reconoce objetos y espacios por sus cualidades sensoriales","Desarrollo socioemocional: establece vínculos de apego seguro con sus figuras de cuidado","Desarrollo motriz: se mueve con libertad y seguridad en el espacio del aula"],
 metacognicion=["¿Qué le causó calma o alegría hoy y cómo lo mostró?","¿Qué apoyo necesitó durante la separación de su familia?","¿Qué rutina disfruta más y qué señal la anticipa para él o ella?"])

MINERD[("Maternal","Septiembre")] = dict(
 partida="El bebé ya reconoce su escuela; ahora extraña y busca a su familia durante el día: necesita ver, escuchar y sentir que su casa vive también en el aula.",
 estrategia="Centro de Interés «Mi familia me abraza»: el aula se llena de voces, fotos y objetos queridos que traen las familias.",
 proceso="Cada semana el bebé escucha voces y canciones de casa, mira fotos de sus seres queridos, juega con su tesoro familiar y recibe el masaje y la canción que lo abrazan.",
 producto="Un bebé que muestra placer al ver y escuchar las señales de su familia, comparte su tesoro del hogar y se deja cuidar con serenidad.",
 conceptuales=["Mi familia: las manos, voces y rostros que me cuidan","Las canciones de cuna y los cuentos de mi casa","Las fotos de mi familia en el mural del aula","Mi objeto transicional: el tesoro que traigo de casa","Los juegos de mi familia"],
 procedimentales=["Reaccionar con calma a las rutinas de cuidado de su maestra","Voltear hacia la voz que reconoce","Mirar con atención fotos y rostros familiares","Explorar y mostrar su tesoro del hogar","Disfrutar el masaje, la canción y el juego compartido"],
 actitudinales=["Apego seguro hacia su familia y su maestra","Placer en el encuentro y el juego compartido","Tranquilidad al compartir objetos de casa en la escuela"],
 especificas=["Comunicación: reacciona a voces y canciones familiares con sonrisas, gestos o vocalizaciones","Pensamiento lógico: reconoce y diferencia rostros y objetos significativos","Desarrollo socioemocional: amplía su círculo de confianza entre casa y escuela","Desarrollo motriz: coordina movimientos sencillos en juegos de exploración"],
 metacognicion=["¿Cómo reaccionó hoy ante las voces y fotos de su familia?","¿Qué objeto de casa le da más calma y en qué momentos lo pide?","¿Cómo participa ahora de los cuidados de su maestra?"])

MINERD[("Maternal","Octubre")] = dict(
 partida="El bebé empieza a descubrirse a sí mismo: se mira las manos, siente texturas, reacciona al calor, al frío y a los sonidos de su propio cuerpo.",
 estrategia="Centro de Interés «Mi cuerpo y mis sensaciones»: experiencias sensoriales seguras, canciones de las partes del cuerpo y juegos de espejo.",
 proceso="Semana a semana el bebé toca y explora con su piel, escucha sonidos, se mira en el espejo y recibe el cuidado afectuoso de su cuerpo en la merienda y la higiene.",
 producto="Un bebé que explora su cuerpo con placer, responde a estímulos sensoriales con expresiones de bienestar y acepta el cuidado de su cuerpo con confianza.",
 conceptuales=["Mi cuerpo: manos, pies, cara y cabeza","Las sensaciones: suave, áspero, frío y cálido","Los sonidos de mi cuerpo y de mi voz","Mi imagen en el espejo","El cuidado de mi cuerpo: limpieza y comida"],
 procedimentales=["Explorar texturas y temperaturas con las manos y la piel","Responder con movimientos o vocalizaciones a estímulos sonoros","Reconocer su imagen y la de su maestra en el espejo","Colaborar en la merienda y la higiene con calma","Disfrutar el masaje y las canciones del cuerpo"],
 actitudinales=["Bienestar y placer al sentir y mover su cuerpo","Confianza al recibir el cuidado de su persona","Curiosidad gozosa ante nuevas sensaciones"],
 especificas=["Comunicación: vocaliza y gestúa al escuchar canciones de las partes del cuerpo","Pensamiento lógico: discrimina sensaciones y sonidos de su entorno y de sí mismo","Desarrollo socioemocional: expresa bienestar con su cuerpo y su imagen","Desarrollo motriz: ejercita sus manos y su desplazamiento con seguridad"],
 metacognicion=["¿Qué sensación (textura, sonido, temperatura) le produjo más placer hoy?","¿Cómo respondió ante su imagen en el espejo?","¿Qué parte de la rutina de cuidado acepta con más calma?"])

MINERD[("Pre-Kínder","Agosto")] = dict(
 partida="Los niños y niñas de 3 años inician su vida escolar: algunos se despiden con llanto, otros con timidez, y todos necesitan descubrir que su escuela es un lugar seguro y feliz.",
 estrategia="Centro de Interés «Mi escuela feliz»: rutinas visuales, canciones de bienvenida y exploración guiada de los rincones del aula.",
 proceso="Cada semana el grupo aprende a llegar y despedirse, explora y cuida los rincones del salón, conoce a sus compañeros y domina la agenda del día con pictogramas.",
 producto="Un grupo que entra al aula con alegría, elige rincones, dice su nombre y el de sus amigos y sigue la rutina del día con autonomía creciente.",
 conceptuales=["Mi escuela y mi salón: lugares y personas que me cuidan","Los rincones del aula y sus materiales","Mis compañeros y sus nombres","La rutina del día: llegada, encuentro, merienda, patio y salida","Los acuerdos sencillos del salón"],
 procedimentales=["Colgar su colgante de foto al llegar y saludar a su maestra","Nombrar los rincones del aula y sus materiales","Presentarse con su nombre frente al grupo","Seguir la agenda con pictogramas","Guardar los materiales usados con ayuda"],
 actitudinales=["Seguridad y alegría al llegar a su escuela","Respeto por los materiales y espacios comunes","Amabilidad al conocer a sus compañeros","Compromiso con los acuerdos del salón"],
 especificas=["Comunicación oral: dice su nombre y saluda con frases claras","Pensamiento lógico: ubica y clasifica los espacios y materiales del aula","Convivencia: participa de las rutinas y acuerda normas con sus pares","Desarrollo personal: gana autonomía en la rutina diaria"],
 metacognicion=["¿Cómo me sentí hoy al llegar a mi escuela y qué me ayudó a estar feliz?","¿Qué rincón elegí y qué hice allí?","¿Qué acuerdo del salón cumplí hoy?"])

MINERD[("Pre-Kínder","Septiembre")] = dict(
 partida="El grupo ya conoce su escuela; ahora quiere hablar de lo que más ama: su familia, su casa y lo que hacen juntos cada día.",
 estrategia="Centro de Interés «Mi familia y mi casa»: el corazón del aula se llena de fotos, maquetas y testimonios de las familias de cada niño y niña.",
 proceso="Semana a semana el grupo nombra a su familia, construye la maqueta de su casa, cuenta lo que hace en familia y prepara una tarjeta de cariño para entregar en casa.",
 producto="Un mural del corazón familiar, la maqueta de la casa y una tarjeta de agradecimiento que viaja a cada hogar.",
 conceptuales=["Mi familia: mamá, papá, hermanos, abuelos y quienes me cuidan","Los espacios de mi casa y lo que hacemos en cada uno","Las rutinas de mi casa: comer, jugar, bañarse y dormir","Las tradiciones y celebraciones de mi familia","El agradecimiento: decir te quiero"],
 procedimentales=["Nombrar y dibujar a los integrantes de su familia","Ubicar los espacios de la casa en una maqueta","Narrar una actividad familiar con ayuda de una marioneta","Dramatizar escenas de la vida en casa","Elaborar una tarjeta de cariño con su huella"],
 actitudinales=["Amor y gratitud hacia su familia","Respeto por las diferentes formas de familia","Colaboración en las tareas del hogar que se comparten en el aula","Generosidad al expresar cariño"],
 especificas=["Comunicación oral: narra con palabras sencillas rutinas y celebraciones de su familia","Pensamiento lógico: relaciona espacios de la casa con las acciones que allí se realizan","Convivencia: valora y respeta la diversidad de las familias del grupo","Educación artística: expresa su afecto con dibujos, huellas y decoración"],
 metacognicion=["¿Quiénes son las personas de mi familia y qué hace cada una?","¿Qué es lo que más disfruto haciendo en mi casa?","¿Cómo le dije a mi familia que la quiero?"])

MINERD[("Pre-Kínder","Octubre")] = dict(
 partida="A los 3 años el cuerpo es el gran descubrimiento: los niños y niñas quieren mirarse, tocarse, nombrar lo que ven y sentir el mundo con todos los sentidos.",
 estrategia="Centro de Interés «Mi cuerpo y mis sentidos»: juegos de espejo, cajas sensoriales, canciones de las partes del cuerpo y circuitos de movimiento seguro.",
 proceso="Cada semana el grupo descubre una parte distinta: la cara y el pelo, las manos que hacen, los pies que caminan, los sentidos que exploran y los hábitos que cuidan el cuerpo.",
 producto="Un muñeco del aula con las partes del cuerpo nombradas por todo el grupo y una rutina de cuidado personal practicada cada día.",
 conceptuales=["Las partes de mi cuerpo: cara, manos, pies, tronco","Mis cinco sentidos y sus órganos","Lo que mi cuerpo puede hacer: correr, saltar, agarrar","Los hábitos que cuidan mi cuerpo: lavado, cepillado y comida sana","Mi nombre y mi identidad: único e irrepetible"],
 procedimentales=["Nombrar y señalar las partes del propio cuerpo y en el espejo","Explorar texturas, olores y sonidos en cajas sensoriales","Realizar movimientos coordinados en circuitos sencillos","Practicar el lavado de manos y el cuidado personal","Expresar con su cuerpo emociones y preferencias"],
 actitudinales=["Aceptación y valoración de su propio cuerpo","Cuidado y respeto por su cuerpo y el de los demás","Hábitos de higiene y salud con gusto","Confianza al probar movimientos nuevos"],
 especificas=["Comunicación oral: nombra las partes del cuerpo y describe lo que siente","Pensamiento lógico: compara y clasifica sensaciones y cualidades","Convivencia: espera turnos y cuida a sus compañeros en el juego","Desarrollo motriz: coordina desplazamientos y movimientos finos con seguridad"],
 metacognicion=["¿Qué parte de mi cuerpo usé hoy para jugar y descubrir?","¿Qué sensación me gustó más: suave, áspera, fría o cálida?","¿Cómo cuido mi cuerpo todos los días?"])

MINERD[("Kínder","Agosto")] = dict(
 partida="Los niños y niñas de 4 años regresan o ingresan a Kínder con emociones intensas: ilusión, miedo y muchas ganas de jugar; el salón debe convertirse en su segunda casa.",
 estrategia="Centro de Interés «Me adapto y aprendo»: círculo de emociones, asamblea de acuerdos, tablero de responsabilidades y proyecto de cuidado del salón.",
 proceso="Semana a semana el grupo nombra lo que siente, construye sus acuerdos de convivencia, asume encargos del aula y adopta un rincón para embellecerlo.",
 producto="Un cartel de acuerdos firmado por el grupo, un tablero de responsabilidades en marcha y un rincón del salón renovado por los equipos.",
 conceptuales=["Las emociones del reencuentro: alegría, miedo y nervios","Los acuerdos de convivencia del salón","Las rutinas y responsabilidades del aula","El cuidado del entorno y los materiales","Mi grupo y mi maestra: comunidad de aprendizaje"],
 procedimentales=["Nombrar emociones y sus causas en el círculo diario","Proponer y explicar acuerdos de convivencia","Cumplir un encargo del tablero de responsabilidades","Ordenar, limpiar y decorar un rincón del aula","Narrar su día con secuencia de rutinas"],
 actitudinales=["Respeto por las emociones propias y ajenas","Compromiso con los acuerdos construidos en grupo","Responsabilidad con los encargos asumidos","Cuidado del espacio que comparte con otros"],
 especificas=["Comunicación oral: expresa emociones y opiniones en asamblea","Pensamiento lógico: ordena la rutina y anticipa las actividades del día","Convivencia: participa en la construcción de acuerdos y cumple su encargo","Desarrollo personal: gana autonomía en las rutinas del aula"],
 metacognicion=["¿Cómo me sentí hoy y qué acuerdo me ayudó a estar bien?","¿Qué encargo cumplí y cómo lo hice?","¿Qué hice yo para que mi salón quede más bonito y ordenado?"])

MINERD[("Kínder","Septiembre")] = dict(
 partida="El grupo ya convive en el aula; ahora quiere saber cómo se vive y se ayuda en su casa, y descubrir que su salón también puede trabajar en comunidad.",
 estrategia="Centro de Interés «Convivimos en comunidad»: árbol genealógico, juegos de roles, torres de equipo y torneo de juegos tradicionales dominicanos.",
 proceso="Cada semana el grupo describe los roles de su familia, dramatiza la ayuda en casa, construye en equipos con roles asignados y juega con reglas de convivencia.",
 producto="Un árbol genealógico por niño o niña, un mural de convivencia construido por equipos y un torneo de juegos tradicionales jugado con reglas.",
 conceptuales=["Mi familia: integrantes, roles y aportes","La convivencia en casa: ayudar, compartir y dialogar","El trabajo en equipo: roles y metas comunes","Las reglas de los juegos grupales","Los juegos tradicionales dominicanos"],
 procedimentales=["Describir roles familiares con dibujo y palabras","Dramatizar escenas de convivencia y ayuda","Cumplir un rol dentro de un equipo","Aplicar las reglas en juegos grupales","Aceptar resultados y celebrar al compañero"],
 actitudinales=["Valoración de cada aporte familiar","Solidaridad y ayuda en el grupo","Respeto por las reglas del juego","Deporte sutil: ganar y perder con calma"],
 especificas=["Comunicación oral: narra roles y situaciones de convivencia con vocabulario preciso","Pensamiento lógico: planifica y ejecuta construcciones en equipo","Convivencia: coopera, dialoga y resuelve conflictos en el juego","Identidad cultural: disfruta juegos tradicionales de su país"],
 metacognicion=["¿Quién ayuda en mi casa y qué aporta cada quien?","¿Qué rol cumplí en mi equipo y cómo sumó al resultado?","¿Cómo me sentí al ganar o perder y qué me ayudó a estar tranquilo?"])

MINERD[("Kínder","Octubre")] = dict(
 partida="A los 4 años cada niño y niña descubre que su cuerpo es único: se miran, comparan, preguntan y quieren saber cómo funcionan sus ojos, oídos y demás sentidos.",
 estrategia="Centro de Interés «Soy único: mi cuerpo y mis sentidos»: circuitos sensoriales, canciones temáticas, experimentos sencillos y huertos del aula.",
 proceso="Semana a semana el grupo explora su imagen personal, descubre el cuidado de dientes y cuerpo, experimenta con los sentidos, investiga las plantas y el aire, y cuida el agua.",
 producto="Una expo sensorial del aula: murales del cuerpo, huerto en crecimiento y carteles de agua y salud hechos por los equipos.",
 conceptuales=["Mi imagen personal: rasgos y nombre","Las partes externas del cuerpo y su cuidado","Los cinco sentidos y sus órganos","Las plantas y el aire que respiro","El agua y mi salud"],
 procedimentales=["Describir su imagen y sus rasgos frente al espejo","Practicar hábitos de higiene y cuidado personal","Experimentar con texturas, sonidos, olores y sabores seguros","Sembrar y registrar el crecimiento de una planta","Filtrar agua y explicar su cuidado"],
 actitudinales=["Aceptación y orgullo de su imagen única","Cuidado responsable de su cuerpo y salud","Curiosidad científica y respeto por la naturaleza","Colaboración en los experimentos del grupo"],
 especificas=["Comunicación oral: describe su cuerpo, sus sentidos y sus descubrimientos con oraciones completas","Pensamiento lógico: compara, clasifica y registra observaciones de sus experimentos","Convivencia: comparte materiales y turnos en los circuitos","Desarrollo motriz: afina su coordinación en circuitos y cuidado del huerto"],
 metacognicion=["¿Qué descubrí hoy con mis sentidos y cómo lo comprobé?","¿Qué hago cada día para cuidar mi cuerpo y mi salud?","¿Qué aprendí del agua y de las plantas que puedo contar en mi casa?"])

MINERD[("Pre-Primario","Agosto")] = dict(
 partida="Los niños y niñas de 5 años inician su último año de Inicial listos para ser estudiantes: quieren metas, acuerdos justos y una escuela que cuidar.",
 estrategia="Centro de Interés «Mi escuela y yo»: mural de metas, parlamento del salón, agenda del estudiante y proyecto Manos a la Obra de mejora escolar.",
 proceso="Cada semana el grupo entrevista y comparte, construye normas con consecuencias, organiza su agenda personal y ejecuta una mejora real de su escuela con evidencia.",
 producto="Un mural de metas del año, el decálogo de normas del salón y un espacio escolar mejorado con fotos del antes y el después.",
 conceptuales=["Mi escuela: personas, espacios y funciones","Las normas de convivencia y sus consecuencias","La agenda y la organización del tiempo escolar","El cuidado del entorno escolar","Mis metas del año"],
 procedimentales=["Formular una meta personal y expresarla al grupo","Debatir, votar y redactar normas de convivencia","Organizar su día con la agenda visual","Planificar y ejecutar una acción de cuidado escolar","Presentar hallazgos con evidencia fotográfica"],
 actitudinales=["Responsabilidad con sus metas y compromisos","Respeto por las normas construidas en grupo","Orgullo y cuidado por su escuela","Escucha activa en asamblea y debate"],
 especificas=["Comunicación oral: argumenta, entrevista y presenta con claridad ante el grupo","Pensamiento lógico: ordena, planifica y secuencia las actividades del día","Convivencia y ciudadanía: participa en la construcción de acuerdos y respeta las decisiones colectivas","Desarrollo personal: asume su agenda con autonomía e iniciativa"],
 metacognicion=["¿Qué meta me puse y qué hice hoy para avanzar?","¿Por qué son importantes nuestras normas y qué pasa si se olvidan?","¿Qué mejoré en mi escuela y cómo puedo demostrarlo?"])

MINERD[("Pre-Primario","Septiembre")] = dict(
 partida="El grupo ya funciona como comunidad escolar; ahora amplía el círculo: la familia con sus derechos y deberes, y la comunidad que se conoce y se cuida.",
 estrategia="Centro de Interés «Convivimos y compartimos»: entrevistas a familiares, decálogo viviente, mural cooperativo y mapa humano de la escuela.",
 proceso="Semana a semana el grupo entrevista a su familia, dramatiza acuerdos de convivencia, produce un mural por equipos y explora los espacios y personas de su comunidad escolar.",
 producto="Un panel de aportes familiares, el decálogo de convivencia del salón, un mural colectivo y el mapa humano de la escuela.",
 conceptuales=["La familia como comunidad de amor y cuidado","Derechos y deberes en la convivencia","El trabajo cooperativo: roles y metas comunes","La comunidad escolar: personas, espacios y funciones","El mapa como representación del espacio"],
 procedimentales=["Entrevistar a un familiar y presentar sus aportes","Dramatizar acuerdos y explicar sus beneficios","Cumplir un rol dentro de un equipo de trabajo","Ubicar espacios y personas en un mapa escolar","Narrar el proceso de una obra colectiva"],
 actitudinales=["Valoración del aporte de cada familiar y de cada compañero","Compromiso con los acuerdos de convivencia","Cooperación y escucha en el trabajo de equipo","Pertenencia y cuidado de su comunidad escolar"],
 especificas=["Comunicación oral: entrevista, narra y presenta con seguridad creciente","Pensamiento lógico: ubica y representa espacios en croquis y mapas","Convivencia y ciudadanía: distingue derechos y deberes y los practica","Desarrollo personal: coopera asumiendo roles con responsabilidad"],
 metacognicion=["¿Qué aprendí de mi familia con la entrevista?","¿Qué acuerdo del decálogo practiqué hoy y cómo benefició al grupo?","¿Qué rol cumplí en el mural y qué pasó cuando trabajamos juntos?"])

MINERD[("Pre-Primario","Octubre")] = dict(
 partida="Con 5 años el cuerpo se vuelve pregunta: ¿cómo funciona?, ¿por qué me enfermo?, ¿qué hacen mi corazón y mis pulmones cuando juego? El grupo quiere respuestas con ciencia.",
 estrategia="Centro de Interés «Mi cuerpo, mis sentidos y mi salud»: experimentos de respiración y pulso, modelado del cuerpo, campañas de salud y menú balanceado dominicano.",
 proceso="Semana a semana el grupo descubre su cuerpo por dentro, aprende a respirar y medir su pulso, investiga alimentos y menús, y organiza una campaña de salud para su escuela.",
 producto="Una maqueta del cuerpo humano, un menú balanceado dominicano y una campaña de salud presentada a la comunidad escolar.",
 conceptuales=["El cuerpo humano por dentro: corazón, pulmones, huesos y músculos","La respiración y el pulso en reposo y en movimiento","Los alimentos y sus nutrientes: el plato saludable dominicano","Hábitos que protegen la salud: higiene, sueño, agua y deporte","La prevención de enfermedades: dengue y limpieza"],
 procedimentales=["Modelar el cuerpo humano y nombrar sus órganos","Medir y comparar pulso y respiración antes y después de jugar","Analizar etiquetas y diseñar un menú balanceado","Practicar hábitos de higiene y registrar su cumplimiento","Planificar y presentar una campaña de salud"],
 actitudinales=["Valoración y cuidado del propio cuerpo","Responsabilidad con los hábitos saludables","Cooperación científica y respeto por los datos","Solidaridad al compartir mensajes de salud"],
 especificas=["Comunicación oral: explica con precisión procesos del cuerpo y de la salud","Pensamiento lógico: observa, mide, compara y registra datos de sus experimentos","Convivencia: trabaja en equipo en la campaña de salud","Desarrollo personal: decide y practica hábitos que protegen su vida"],
 metacognicion=["¿Qué descubrí hoy de mi cuerpo y cómo lo comprobé?","¿Qué hábito saludable practico ya y cuál quiero mejorar?","¿Cómo puedo enseñar a mi familia lo que aprendí sobre la salud?"])

# ==================== MOMENTOS ENRIQUECIDOS v23 ====================
def enriquecer_momentos(titulo, sem, grado):
    bebe = grado == "Maternal"
    r0 = (sem.get("recursos") or ["materiales"])[0].lower()
    momentos = momentos_v17(titulo, sem, grado)
    ejemplos = {
      "Inicio": f"Ejemplo listo: tapa {r0} con un pañuelo, sacúdelo y pregunta «¿qué será?». Acepta todas las hipótesis con asombro («¡puede ser!»), destapa y di: «¡Es {r0}! Hoy vamos a descubrir «{titulo}». ¿Qué saben ustedes de esto?». Cierra el momento repitiendo la pregunta generadora: {sem['pregunta']}",
      "Práctica": f"Ejemplo listo: si la actividad es «{sem['actividad'][:90]}...», hazla tú primero completo y en silencio; luego repítela narrando («primero tomo..., luego pego..., al final muestro»). Invita a un niño o niña valiente a repetir contigo tomándole la mano, y después abre la actividad a todo el grupo mesa por mesa.",
      "Desarrollo": f"Ejemplo listo: mientras trabajan «{titulo}», camina con las manos a la espalda y haz una pregunta distinta en cada mesa: «¿qué hiciste primero?», «¿me muestras cómo?», «¿qué harás después?». Al oír una respuesta valiosa dila en voz alta al grupo: «¡Escuchen cómo lo resolvió {sem['tema'].lower()}!». Anota en la app a los que observaste.",
      "Cierre": f"Ejemplo listo: en círculo, muestra una producción de cada mesa y pregunta al autor o autora «¿qué hiciste? ¿qué aprendiste?». Repite su respuesta amplificándola («María descubrió que...») y cierra con la frase del día: {sem['cierre']}",
    }
    pasos_extra = {
      "Inicio": [
        "Ten todo listo ANTES de que lleguen: materiales del día a la vista, butaca del encuentro ordenada y la canción elegida; los minutos de preparación evitan el desorden del grupo.",
        "Si el grupo llega inquieto, haz dos respiraciones juntos levantando los brazos y soltándolos con un «¡fuuu!»; funciona mejor que pedir silencio a gritos.",
      ],
      "Práctica": [
        "Prepara una mesa de modelado aparte donde todos vean; usa al niño o niña que suele distraerse como ayudante: tener un rol lo enfoca.",
        "Si dos o tres se adelantan y terminan rápido, dales una misión extra («¿puedes hacerlo también con este material?») en lugar de esperar a los demás sentados.",
      ],
      "Desarrollo": [
        "Lleva un registro mental de 3 o 4 niños por día y obsérvalos de cerca: no intentes evaluar a todo el grupo el mismo día; en una semana todos habrán tenido su turno.",
        "Si el ruido sube, baja tú la voz y pon una mano en alto esperando imitación: el grupo se calma siguiendo el modelo, sin regañar.",
      ],
      "Cierre": [
        "Guarda los materiales cantando una canción de orden; convertir la limpieza en juego evita el caos de la salida.",
        "Al final, registra en la app la evaluación de los niños y niñas que observaste HOY, con el estado (Logrado, En proceso, Iniciado) mientras lo recuerdas fresco.",
      ],
    }
    apoyos = {
      "Inicio": "Si un niño o niña no quiere participar, no lo fuerces: siéntalo contigo como «ayudante especial» que sostiene el material. A los maternales, cántales cerca del oído y ofrécele el peluche; el vínculo primero, la participación después.",
      "Práctica": "Si alguien se atasca, reduce la tarea a un solo paso («solo pega esta pieza»), señala el modelo terminado y acompaña la mano al inicio. Celebra el intento, no exijas perfección: en Inicial el error es parte del juego.",
      "Desarrollo": "Ten una variante más fácil (menos piezas, plantilla con contorno) y una más retadora (añadir un detalle propio) listas en la mesa; así nadie se queda sin nada que hacer y nadie termina aburrido.",
      "Cierre": "Si el grupo está agotado, acorta el círculo a dos producciones y una sola pregunta; un cierre breve y cálido funciona mejor que uno largo con niños cansados.",
    }
    for m in momentos:
        guia = m.get("guia") or []
        for blk in guia:
            if str(blk.get("t","")).startswith("Cómo guiar"):
                blk["li"] = list(blk.get("li") or []) + pasos_extra.get(m["nombre"], [])
        # insertar ejemplo tras el paso a paso
        guia_nueva = []
        for blk in guia:
            guia_nueva.append(blk)
            if str(blk.get("t","")).startswith("Cómo guiar"):
                guia_nueva.append({"t":"Ejemplo real para tu clase", "d": ejemplos.get(m["nombre"], "")})
        guia_nueva.append({"t":"Si un niño o niña se atasca (apoyo diferenciado)", "d": apoyos.get(m["nombre"], "")})
        m["guia"] = guia_nueva
    return momentos

# ==================== CONSTRUCCIÓN DE REGISTROS ====================
BASE = "https://raw.githubusercontent.com/Mingo20/colegio-reformado-esperanza/main/semanas-2027/"

def slug_de(t):
    return re.sub(r"[^a-z0-9]+","-", t.lower()).strip("-")[:70]

def record_inicial(grado, sems_data, tema, mes_oficial, f0, f1):
    md = MINERD[(grado, mes_oficial.split()[0])]
    dias = dias_habiles(f0, f1)
    trozos = trocear(dias, len(sems_data))
    semanas = []
    indicadores = []
    for k, sem in enumerate(sems_data):
        chunk = trozos[k]
        ds = []
        for j, d in enumerate(chunk):
            t = sem["dias"][j % len(sem["dias"])]
            ds.append({
              "id": d.strftime("%Y-%m-%d"), "etiqueta": etq(d), "titulo": t,
              "desempenos": [sem["desempeno"], f"Participa con autonomía en la actividad de «{t}»."],
              "recursos": sem["recursos"], "orientacion": sem["orientacion"],
              "momentos": enriquecer_momentos(t, sem, grado),
              "cotejo": cotejo_v17(t, sem["desempeno"]),
            })
        indicadores.append(f"Semana {k+1} · {sem['tema']}: {sem['desempeno']}")
        a, b = chunk[0], chunk[-1]
        mes_low = mes_oficial.split()[0].lower()
        semanas.append({"numero":k+1,"tema":sem["tema"],"fechas":f"{a.day}–{b.day} de {mes_low} 2026",
            "inicio":sem["pregunta"],"desarrollo":sem["concepto"],"cierre":sem["cierre"],"dias":ds})
    indicadores += [
      "Participa con autonomía creciente en las actividades del centro de interés",
      "Expresa con sus palabras, gestos o producciones lo que aprendió cada semana",
    ]
    titulo = f"Plan Mensual · Inicial {grado} · {mes_oficial} · {tema}"
    rec = {
      "titulo": titulo, "mes": mes_oficial, "tema": tema,
      "nivel": "Inicial", "grado": grado,
      "descripcion": md["partida"] + " " + md["estrategia"] + " " + md["producto"],
      "docente_id": "", "activo": True, "anio_escolar": "2026-2027",
      "competencias_json": json.dumps(COMP_INI, ensure_ascii=False),
      "areas_json": json.dumps(AREAS_INI, ensure_ascii=False),
      "situacion_json": json.dumps({"partida": md["partida"], "estrategia": md["estrategia"],
                                    "proceso": md["proceso"], "producto": md["producto"]}, ensure_ascii=False),
      "contenidos_json": json.dumps({"conceptuales": md["conceptuales"],
                                     "procedimentales": md["procedimentales"],
                                     "actitudinales": md["actitudinales"]}, ensure_ascii=False),
      "evaluacion_json": json.dumps({"especificas": md["especificas"], "indicadores": indicadores,
                                     "tecnicas": TECNICAS_INI, "metacognicion": md["metacognicion"]}, ensure_ascii=False),
      "ciclo_json": json.dumps({"titulo": f"{tema} · Centro de Interés", "etapas":[
          {"n": s["tema"], "d": s["cierre"], "sem": f"Semana {k+1}"} for k, s in enumerate(sems_data)]}, ensure_ascii=False),
    }
    return rec, semanas

MESES = [
  ("Agosto 2026",  AGO, TEMA_AGO, D(2026,8,3),  D(2026,8,31)),
  ("Septiembre 2026", SEP, TEMA_SEP, D(2026,9,1), D(2026,9,30)),
  ("Octubre 2026", OCT, TEMA_OCT, D(2026,10,1), D(2026,10,31)),
]

RECS_NUEVOS = []
for grado in GRADOS_INI:
    for mes_oficial, DATA, TEMAS, f0, f1 in MESES:
        rec, semanas = record_inicial(grado, DATA[grado], TEMAS[grado], mes_oficial, f0, f1)
        s = slug_de(rec["titulo"])
        json.dump(semanas, open(f"semanas-2027/{s}.json","w",encoding="utf-8"), ensure_ascii=False)
        rec["semanas_json"] = f"url:{BASE}{s}.json#sem={len(semanas)}"
        RECS_NUEVOS.append(rec)

# biblioteca completa: los otros 16 registros vienen de v5
v5 = json.load(open("planapp_records_v5.json", encoding="utf-8"))
titulos_nuevos = {r["titulo"] for r in RECS_NUEVOS}
RECS = RECS_NUEVOS + [r for r in v5 if r["titulo"] not in titulos_nuevos]
json.dump(RECS, open("planapp_records_v6.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)

n_dias = sum(len(json.load(open("semanas-2027/" + r["semanas_json"][4:].rsplit("#sem=",1)[0].rsplit("/",1)[-1], encoding="utf-8"))) for r in RECS_NUEVOS)
print("registros v6:", len(RECS), "| planes Inicial regenerados:", len(RECS_NUEVOS), "| clases diarias Inicial:", n_dias)
import subprocess
tot = 0
for r in RECS_NUEVOS:
    fn = "semanas-2027/" + r["semanas_json"][4:].rsplit("#sem=",1)[0].rsplit("/",1)[-1]
    kb = os.path.getsize(fn)//1024
    tot += kb
    print(" -", r["titulo"][:60], f"| {kb} KB")
print("total semanas Inicial:", tot, "KB")
