# -*- coding: utf-8 -*-
"""Biblioteca v22:
   - Inicial: restaura Agosto y Septiembre 2026 (4 grados, Centro de Interés,
     mismos momentos v17: Inicio · Práctica · Desarrollo · Cierre).
   - Primaria 3ro: anual + mensual Octubre por asignatura básica (Matemática,
     Ciencias Sociales, Ciencias de la Naturaleza, Lengua Española, FIHyR).
   - Secundaria 1ro: anual + mensual Octubre de Matemática.
   - planapp_records_v5.json = biblioteca completa (28 registros)."""
import json, datetime, re

D = datetime.date

# ---------- helpers de gen_planes.py (sin efectos secundarios) ----------
src_planes = open("gen_planes.py", encoding="utf-8").read()
seg = src_planes[:src_planes.find("# ============================ ANUALES")]
ns = {"json": json, "datetime": datetime, "re": re}
exec(seg, ns)
dias_habiles, trocear, etq, CF = ns["dias_habiles"], ns["trocear"], ns["etq"], ns["CF"]
unidad_record = ns["unidad_record"]; anual_record = ns["anual_record"]
MOM_PRIM = ns["MOM_PRIM"]; PRI_MOM = ns["PRI_MOM"]
PRI_MAT, PRI_LEN = ns["PRI_MAT"], ns["PRI_LEN"]
momentos_prim = ns["momentos"]

# ---------- helpers de gen_inicial_v17.py (solo funciones) ----------
src17 = open("gen_inicial_v17.py", encoding="utf-8").read()
seg17 = src17[:src17.find("# ======================= OCTUBRE 2026 POR GRADO")]
ns17 = {"json": json, "datetime": datetime}
exec(seg17, ns17)
momentos_v17 = ns17["momentos_v17"]; cotejo_v17 = ns17["cotejo_v17"]
AREAS_INI = ns17["AREAS_INI"]; COMP_INI = ns17["COMP_INI"]

def W(tema, desempeno, pregunta, concepto, actividad, cierre, recursos, orientacion, dias):
    return {"tema":tema,"desempeno":desempeno,"pregunta":pregunta,"concepto":concepto,
            "actividad":actividad,"cierre":cierre,"recursos":recursos,"orientacion":orientacion,"dias":dias}

GRADOS_INI = ["Maternal","Pre-Kínder","Kínder","Pre-Primario"]
DESC_GRADO = {
 "Maternal":"Nivel Maternal (0 a 2 años): exploración sensorial y vínculo afectivo",
 "Pre-Kínder":"Nivel Pre-Kínder (3 años): descubrimiento guiado del cuerpo y los sentidos",
 "Kínder":"Nivel Kínder (4 años): descripción y vocabulario del cuerpo, la identidad y la salud",
 "Pre-Primario":"Nivel Pre-Primario (5 años): autonomía, funciones del cuerpo y hábitos saludables",
}

# ======================= INICIAL · AGOSTO 2026 =======================
AGO = {}
AGO["Maternal"] = [
 W("Me quedo feliz en mi escuela","Permanece tranquilo en el espacio nuevo con acompañamiento afectivo.","¿Quién me abraza y me cuida en mi escuela?",
   "la adaptación: rostros y voces nuevas, su maestra de confianza y el espacio tranquilo del salón.",
   "recibimiento uno a uno: abrazo, canción suave y exploración libre del rincón de los peluches.",
   "Sonríe cuando su persona de confianza se aleja un momento.",
   ["Peluches","Sonajero","Manta suave","Canción de bienvenida"],
   "Adaptación gradual: la familia puede quedarse unos minutos los primeros días.",
   ["Mi maestra y yo","Mi espacio tranquilo","Abrazos en mi rincón","Voces que me cuidan","Juego libre feliz"]),
 W("Mi salón y sus rincones","Explora con los sentidos los espacios y materiales del aula.","¿Qué descubro en mi salón?",
   "los espacios del aula y sus materiales: rincón de mimos, rincón de juegos y espacio de descanso.",
   "paseo sensorial por los rincones: tocan, miran y escuchan cada espacio con la maestra.",
   "Elije con la mirada o el gesto el rincón que prefiere.",
   ["Sonajeros","Peluche","Alfombra suave","Cajas sensoriales"],
   "Nombrar cada rincón siempre igual: la repetición construye seguridad.",
   ["Paseo por mi salón","El rincón de mimos","Cajas que suenan","Mi alfombra suave","Elijo mi rincón"]),
 W("Mis primeras rutinas","Anticipa la rutina del día con ayuda de gestos y canciones.","¿Qué viene después en mi día?",
   "las rutinas del día: llegada, merienda, juego y descanso; siempre en el mismo orden.",
   "rutina con canciones señal: canción de llegada, canción de merienda y canción de dormir.",
   "Responde con el cuerpo a la señal de la rutina.",
   ["Canciones de rutina","Biberón o taza","Cuna o colchoneta","Pictogramas grandes"],
   "La rutina idéntica cada día es el mejor maestro de la adaptación.",
   ["Llego y me reciben","La canción de la merienda","Juego y descanso","Mi canción de dormir","Mi día completo"]),
 W("Como y descanso tranquilo","Acepta la merienda y el descanso con serenidad.","¿Cómo me alimento y descanso en mi escuela?",
   "sus necesidades básicas con ternura: alimentación tranquila e higiene y descanso del bebé.",
   "momento de merienda con canción y luego descanso con música suave y movimiento de cuna.",
   "Se alimenta tranquilo y se relaja al escuchar la música.",
   ["Música suave","Toallitas húmedas","Cuna o moisés","Babero"],
   "Cada bebé lleva su ritmo: nunca forzar, siempre acompañar.",
   ["Merienda con canción","Mi carita limpia","Música para dormir","Mi descanso tranquilo","Despierto feliz"]),
]
AGO["Pre-Kínder"] = [
 W("Llego feliz a mi escuela","Se separa de su familia con tranquilidad y entra al aula contento.","¿Cómo empieza mi día en mi escuela?",
   "la llegada a la escuela: el saludo, su colgante con foto y la rutina de entrada.",
   "rutina de llegada con abrazo, canción y colgante de foto en el mural de la asistencia.",
   "Cuelga su colgante y saluda a la maestra.",
   ["Colgantes con foto","Canción de bienvenida","Mural de asistencia","Peluche del salón"],
   "Validar el sentimiento de la separación: 'te extraño y aquí te cuidan'.",
   ["Mi foto en el mural","El abrazo de bienvenida","La canción de llegada","¿Quién llegó hoy?","Mi escuela feliz"]),
 W("Mi salón y sus rincones","Nombra los rincones del aula y elige dónde jugar.","¿Qué rincones tiene mi salón?",
   "los rincones del aula (construcción, dramatizo, arte, libros) y el cuidado de sus materiales.",
   "recorrido guiado con reglas simples: en cada rincón se juega, se comparte y se guarda.",
   "Nombra un rincón y guarda un material con ayuda.",
   ["Bloques","Disfraces sencillos","Crayones","Libros de cuentos"],
   "Enseñar dónde va cada cosa: el orden se aprende practicando.",
   ["Recorro mi salón","Rincón de bloques","Rincón de disfrazarme","Rincón de libros","Guardo mis materiales"]),
 W("Mis compañeros y yo","Dice su nombre y el de dos compañeros del salón.","¿Quiénes están conmigo en mi salón?",
   "el nombre propio y el de sus compañeros: presentarse, pedir turnos y jugar juntos.",
   "juego de la pelota-presentación: lanza la pelota y dice su nombre; el grupo responde '¡Hola, …!'.",
   "Dice su nombre frente al grupo con ayuda.",
   ["Pelota suave","Títeres","Tarjetas con nombres","Canción de los nombres"],
   "Celebrar cada presentación con aplauso: el nombre es la primera identidad.",
   ["¿Cómo te llamas?","La pelota de los nombres","Mi títere me presenta","Juego con mi compañero","Todos somos amigos"]),
 W("Aprendo mis rutinas","Sigue la agenda del día con pictogramas.","¿Qué hacemos cada día en mi escuela?",
   "la agenda del día con pictogramas: llegada, encuentro, merienda, patio, despedida.",
   "construcción del panel de rutinas: ordenan las tarjetas del día y anticipan lo que sigue.",
   "Señala en el panel qué viene después.",
   ["Pictogramas de rutina","Panel del día","Canciones de transición","Sellos"],
   "Anticipar los cambios con la canción o el panel evita las rabietas.",
   ["Mi panel del día","La canción del encuentro","Merienda y patio","La despedida feliz","Mi rutina completa"]),
]
AGO["Kínder"] = [
 W("Mi primer día","Describe sus emociones del primer día con palabras sencillas.","¿Cómo me siento en mi primer día de escuela?",
   "las emociones del reencuentro escolar: alegría, miedo y nervios; todos se sienten y se cuidan.",
   "círculo de emociones: eligen la carita que sienten y cuentan por qué, con la maestra de guía.",
   "Nombra una emoción y una causa sencilla.",
   ["Láminas de emociones","Espejo","Peluche","Canción de bienvenida"],
   "Normalizar todas las emociones: sentir miedo también está bien.",
   ["¿Cómo me siento hoy?","Mi carita en el espejo","Cuento del primer día","Comparto mi emoción","Mi compromiso feliz"]),
 W("Construimos nuestros acuerdos","Aporta ideas para los acuerdos de convivencia del salón.","¿Cómo queremos vivir juntos en nuestro salón?",
   "los acuerdos de convivencia: hablar con respeto, cuidar los materiales y pedir turnos.",
   "asamblea del salón: proponen acuerdos con dibujos y firman con su huella en el cartel.",
   "Explica un acuerdo con sus palabras.",
   ["Cartel grande","Crayones","Almohadilla y sellos","Cinta"],
   "Pocos acuerdos, claros y positivos: mejor 'caminamos' que 'no corremos'.",
   ["Asamblea del salón","Nuestros acuerdos con dibujos","La firma de mi huella","Practicamos los acuerdos","Nuestro cartel de convivencia"]),
 W("Mis rutinas escolares","Ejecuta la rutina del día con autonomía creciente.","¿Qué toca hacer ahora en mi día?",
   "la rutina del aula: entrada, encuentro, trabajo, merienda, patio y salida; con responsabilidades asignadas.",
   "tablero de responsabilidades: cada niño/a asume un encargo (repartir, ordenar, regar) y lo vive el día entero.",
   "Cumple su responsabilidad del día.",
   ["Tablero de encargos","Tarjetas de rutina","Canciones de transición","Sellos de logro"],
   "Rotar los encargos: la autonomía se construye con responsabilidades reales.",
   ["El tablero de encargos","Mi encargo del día","Trabajo y merienda","Patio con acuerdos","Mi rutina en orden"]),
 W("Cuido mi salón","Participa en el cuidado del espacio y los materiales del aula.","¿Cómo cuidamos nuestro salón?",
   "el cuidado del entorno: ordenar, limpiar, reciclar y embellecer el salón que compartimos.",
   "proyecto del rincón bonito: equipos adoptan un rincón, lo ordenan y lo decoran.",
   "Explica cómo cuida su rincón.",
   ["Escobilla y pala de juguete","Papel crepé","Cinta","Plantita del salón"],
   "Cerrar el proyecto con celebración: el cuidado sostenido también se celebra.",
   ["Adopto mi rincón","Ordenamos juntos","Decoramos nuestro rincón","Mi salón brilla","Celebramos nuestro salón"]),
]
AGO["Pre-Primario"] = [
 W("Regreso a mi escuela","Explica qué le gusta de su escuela y qué espera del año.","¿Qué me gusta de mi escuela y qué quiero lograr?",
   "el reencuentro escolar: lo que me gusta, lo que aprendí el año pasado y mis metas del nuevo año.",
   "entrevista por parejas + mural de metas: se entrevistan y dibujan su meta del año.",
   "Dice una meta escolar sencilla.",
   ["Fichas de entrevista","Cartulina del mural","Crayones","Fotos del salón"],
   "Modelar la meta en positivo: 'quiero leer mejor' y no 'no quiero equivocarme'.",
   ["Qué me gusta de mi escuela","Mi entrevista con un amigo","Mi meta del año","El mural de metas","Mi compromiso"]),
 W("Construimos acuerdos","Participa en la creación de las normas del aula y sus consecuencias.","¿Cómo construimos las normas de nuestro salón?",
   "las normas de convivencia: cómo se crean, por qué sirven y qué pasa cuando se olvidan.",
   "parlamento del salón: debaten, votan y escriben las normas con consecuencias acordadas.",
   "Explica una norma y su consecuencia.",
   ["Papelógrafo","Marcadores","Urna de votación","Cartel de normas"],
   "Votar las normas las vuelve de todos: se cumplen mejor las que uno ayudó a crear.",
   ["El parlamento del salón","Proponemos normas","Votamos nuestras normas","¿Qué pasa si se olvida?","Firmamos nuestro acuerdo"]),
 W("Mi agenda de estudiante","Organiza su día con la agenda visual del aula.","¿Cómo organizo mi día en la escuela?",
   "la agenda del estudiante: horario, materiales y transiciones; la autonomía se planifica.",
   "construcción de la agenda personal: arman su horario con tarjetas y lo revisan cada mañana.",
   "Ordena tres momentos de su día en la agenda.",
   ["Tarjetas de horario","Reloj de papel","Agenda personal","Gomets"],
   "Revisar la agenda cada mañana: predecir el día reduce la ansiedad.",
   ["Armo mi agenda","Mi horario con tarjetas","Transiciones sin apuro","Reviso mi agenda","Mi día organizado"]),
 W("Cuido mi escuela","Propone acciones concretas para cuidar su escuela.","¿Qué podemos hacer para cuidar nuestra escuela?",
   "el cuidado del entorno escolar: espacios comunes, materiales y áreas verdes; todos somos responsables.",
   "proyecto 'Manos a la obra': eligen un espacio, planifican y ejecutan una mejora con evidencia fotográfica.",
   "Describe la acción de cuidado que realizó.",
   ["Cámara o celular","Guantes pequeños","Bolsas","Plantas del patio"],
   "Evidenciar con fotos antes/después: el cambio visible motiva el hábito.",
   ["Diagnóstico: mi escuela hoy","Planificamos la mejora","Manos a la obra","Antes y después","Presentamos nuestro proyecto"]),
]

# ======================= INICIAL · SEPTIEMBRE 2026 =======================
SEP = {}
SEP["Maternal"] = [
 W("Las manos que me cuidan","Reacciona con calma a las rutinas de cuidado de su maestra.","¿Quién me cuida en la escuela y en mi casa?",
   "las personas que lo cuidan: mamá, papá, abuelos y su maestra; manos que alimentan y consuelan.",
   "juego de las manitos: masaje suave de manos con canción 'las manitas de mi mamá'.",
   "Estira sus manitos para el masaje con gusto.",
   ["Crema o loción suave","Canción de las manitas","Muñeco","Manta"],
   "El masaje con canción fortalece el vínculo y regula las emociones del bebé.",
   ["Las manitos de mamá","Masaje con canción","Mi muñeco come","Manos que consuelan","Mi familia me cuida"]),
 W("Voces de mi casa","Reconoce y responde a voces y canciones familiares.","¿Qué voces escucho en mi casa?",
   "las voces y canciones de su casa: la voz de mamá, el cuento del abuelo y la canción de cuna.",
   "ronda de voces: escuchan voces grabadas y canciones de cuna mientras mecen a los muñecos.",
   "Voltea hacia la voz que reconoce.",
   ["Voces grabadas","Canciones de cuna","Muñecos","Sonajero"],
   "Pedir a las familias una canción de su casa: la cultura del hogar entra al aula.",
   ["La canción de mi casa","Mecemos a los bebés","El cuento con voz suave","¿De dónde viene esa voz?","Ronda de voces"]),
 W("Rostros que amo","Mira con atención fotos de sus familiares y reacciona con expresión.","¿Quiénes están en las fotos de mi familia?",
   "los rostros de su familia: la foto traída de casa en el mural 'mi familia me abraza'.",
   "mural de las familias: cada bebé muestra la foto de su familia y la maestra nombra a cada persona.",
   "Señala o mira la foto de su familia.",
   ["Fotos de familias","Mural del salón","Cinta adhesiva","Peluche"],
   "El mural permanente de familias sostiene el vínculo casa-escuela todo el año.",
   ["Traigo mi foto","Mi familia en el mural","Miro y nombro","El abrazo de mi familia","Mi familia y mi maestra"]),
 W("Mi familia y yo jugamos","Comparte el juego con la maestra y sus pares en calma.","¿Cómo juego con lo que me trae mi casa?",
   "el juego compartido: objetos de casa (sonajero, muñeco) que acompañan la separación temporal.",
   "caja de tesoros familiar: cada bebé explora con la maestra el objeto que trajo de casa.",
   "Explora el objeto y lo muestra al grupo.",
   ["Objetos de casa","Caja decorada","Tapete suave","Canción de mostrar"],
   "El objeto transicional es un puente legítimo entre la casa y la escuela.",
   ["Mi tesoro de casa","Lo muestro a mi maestra","Jugamos juntos","Mi caja de tesoros","Casa y escuela: un solo abrazo"]),
]
SEP["Pre-Kínder"] = [
 W("Mi familia es tesoro","Nombra a los integrantes de su familia.","¿Quiénes son las personas de mi familia?",
   "la familia: mamá, papá, hermanos, abuelos y todas las familias son valiosas y diferentes.",
   "dibujo de su familia en el corazón gigante y presentación frente al grupo.",
   "Nombra dos integrantes de su familia.",
   ["Corazón de papel","Crayones","Fotos de familia","Canción 'Mi familia'"],
   "Respetar todas las formas de familia sin corregir: cada familia es su normal.",
   ["Mi familia en mi corazón","Presento a mi familia","Las familias son diferentes","La canción de mi familia","Mi familia es tesoro"]),
 W("Mi casa y sus espacios","Identifica los espacios de la casa y qué se hace en cada uno.","¿Qué hacemos en cada espacio de mi casa?",
   "los espacios de la casa: cocina, dormitorio, baño y patio; en cada uno se vive y se ayuda.",
   "maqueta del aula con cajas: construyen su casa y ubican los espacios con tarjetas.",
   "Señala dos espacios de la casa.",
   ["Cajas de cartón","Tarjetas de espacios","Silicona o cinta","Figuras de familia"],
   "Preguntar quién ayuda en casa: la colaboración también se cuenta.",
   ["Los espacios de mi casa","Construyo mi casa","En la cocina de mi casa","Mi dormitorio tranquilo","Maqueta: mi casa y mi familia"]),
 W("Lo que hacemos en familia","Describe rutinas y celebraciones que comparte con su familia.","¿Qué hacemos juntos en mi familia?",
   "las rutinas familiares: comer juntos, bañarse, jugar y celebrar; cada familia tiene sus costumbres.",
   "círculo de testimonios: cada niño/a cuenta con la marioneta qué hace con su familia el domingo.",
   "Cuenta una actividad familiar con ayuda de la marioneta.",
   ["Marionetas","Lámina del domingo familiar","Canción","Fotos o dibujos"],
   "Cada relato se celebra: el testimonio del hogar es cultura viva.",
   ["Mi domingo en familia","La marioneta cuenta","Comemos en familia","Los juegos de mi casa","Celebramos nuestras costumbres"]),
 W("Gracias, familia","Expresa cariño y gratitud hacia su familia con gestos y palabras.","¿Cómo le digo a mi familia que la quiero?",
   "el agradecimiento: decir te quiero, abrazar, ayudar en casa; las palabras y gestos cuidan el vínculo.",
   "tarjeta de cariño: decoran su tarjeta para casa con huella y un 'te quiero' dictado a la maestra.",
   "Entrega su tarjeta y dice 'te quiero' con su modo.",
   ["Tarjetas","Temperas","Cinta","Sobre decorado"],
   "La tarjeta viaja a casa: la escuela devuelve el gesto que la familia siembra.",
   ["Hablo de mi cariño","Preparo mi tarjeta","Mi huella de cariño","El sobre sorpresa","Gracias, familia mía"]),
]
SEP["Kínder"] = [
 W("Mi familia: quiénes somos","Describe los integrantes y roles de su familia con dibujo y palabras.","¿Quiénes somos en mi familia y qué hace cada quien?",
   "los integrantes y roles de la familia: quién cocina, quién trabaja, quién cuida; todos aportan.",
   "árbol genealógico simple con fotos o dibujos: cada quien pinta su familia y presenta los roles.",
   "Nombra dos roles dentro de su familia.",
   ["Árbol de cartulina","Fotos o dibujos","Crayones","Cinta"],
   "Presentar sin comparar: cada árbol familiar es único y valioso.",
   ["Mi árbol familiar","Los roles en mi familia","Mi familia dibujada","Presento mi árbol","Todos aportamos en casa"]),
 W("En casa convivimos","Explica cómo ayuda y comparte en su casa.","¿Cómo ayudo y comparto en mi casa?",
   "la convivencia en casa: ayudar sin que me lo pidan, compartir con mis hermanos y dialogar.",
   "juego de roles 'en mi casa yo ayudo': dramatizan escenas familiares y sus soluciones.",
   "Dramatiza una forma de ayudar en casa.",
   ["Disfraces de adulto","Utensilios de juguete","Cocina de juguete","Teléfono de juguete"],
   "Dramatizar primero, nombrar después: el juego ensaya la vida.",
   ["En mi casa yo ayudo","Dramatizo mi domingo","Comparto con mi hermano","Cuando hay conflicto en casa","Mi casa en armonía"]),
 W("Mi escuela: comunidad que aprende","Describe cómo se trabaja en equipo en su salón.","¿Cómo aprendemos juntos en mi salón?",
   "la comunidad del aula: equipos, turnos y metas comunes; mi salón también es una familia que aprende.",
   "reto de equipos: construyen la torre de la convivencia por grupos con roles asignados.",
   "Cumple su rol dentro del equipo.",
   ["Bloques grandes","Pañuelos de roles","Sellos","Cronómetro visual"],
   "Asignar roles rotativos: portavoz, materials y animador del equipo.",
   ["Mi salón es comunidad","La torre de la convivencia","Trabajo con mi rol","Nuestra meta común","Celebramos en equipo"]),
 W("Compartimos y nos cuidamos","Aplica las reglas de convivencia en juegos grupales.","¿Cómo jugamos cuidándonos unos a otros?",
   "las reglas del juego grupal: pedir turnos, aceptar resultados y celebrar al que gana.",
   "torneo de juegos tradicionales: la Gallinita Ciega y Arroz con Leche con reglas de convivencia.",
   "Acepta el resultado del juego sin enojarse.",
   ["Pañuelo","Cinta de marcar","Sellos de buen deportista","Canción de cierre"],
   "El buen deportista se nombra al final: los valores se hacen visibles.",
   ["Las reglas del juego","Juego con turnos","Ganar y perder con calma","El sello del buen deportista","Torneo de la convivencia"]),
]
SEP["Pre-Primario"] = [
 W("Mi familia: todos importantes","Explica por qué cada integrante de su familia es importante.","¿Por qué cada persona de mi familia es importante?",
   "la familia como comunidad de amor y cuidado: roles, apoyo y la dignidad de cada integrante.",
   "entrevista a un familiar (tarea) + puesta en común con panel de roles y aportes.",
   "Presenta el aporte de un familiar entrevistado.",
   ["Cuestionario de entrevista","Panel de aportes","Crayones","Fotos"],
   "La tarea-puente conecta la escuela con la voz real de las familias.",
   ["Preparo mi entrevista","¿Qué hace mi familia?","El panel de los aportes","Todos somos importantes","Mi familia, mi primera comunidad"]),
 W("Normas para convivir","Construye y aplica acuerdos para convivir mejor en familia y escuela.","¿Qué acuerdos nos ayudan a convivir mejor?",
   "los acuerdos de convivencia en la familia y la escuela: dialogar, escuchar y respetar los turnos.",
   "glosario viviente de la convivencia: dramatizan acuerdos y crean el decálogo del salón.",
   "Dramatiza un acuerdo y explica su beneficio.",
   ["Papelógrafo del decálogo","Marcadores","Tarjetas de acuerdo","Sellos"],
   "Ensayar los acuerdos en juego antes de exigirlos en la vida real.",
   ["¿Qué es convivir?","Dramatizo mis acuerdos","El decálogo del salón","Acuerdos en mi casa","Convivimos mejor"]),
 W("Compartimos tareas y juegos","Participa en trabajos cooperativos con roles definidos.","¿Qué logramos cuando trabajamos en equipo?",
   "el trabajo cooperativo: roles, metas comunes y la fuerza del aporte de todos.",
   "proyecto del mural compartido: cada equipo produce una parte que se ensambla en un solo mural.",
   "Describe cómo su aporte sumó al resultado final.",
   ["Papelógrafo grande","Temperas","Brochas","Pegamento"],
   "El mural se ensambla al final: la obra colectiva enseña más que la individual.",
   ["Nuestro mural en equipo","Cada rol importa","Producimos nuestra parte","Ensamblamos el mural","Inauguramos la obra"]),
 W("Mi comunidad escolar","Identifica a las personas y espacios que forman su comunidad escolar.","¿Quiénes forman mi comunidad escolar?",
   "la comunidad escolar: dirección, maestras, personal de apoyo, estudiantes y familias trabajando juntos.",
   "mapa humano de la escuela: entrevistan a un adulto de la escuela y ubican los espacios en el mapa.",
   "Ubica dos espacios y nombra dos personas de su comunidad escolar.",
   ["Mapa de la escuela","Cámara","Fichas de entrevista","Crayones"],
   "Cada persona de la escuela se presenta con su función: comunidad que se conoce se cuida.",
   ["Los lugares de mi escuela","Entrevisto a un adulto","El mapa humano","Presentamos hallazgos","Mi comunidad y yo"]),
]

TEMA_AGO = {"Maternal":"Adaptación y vínculo","Pre-Kínder":"Mi escuela feliz","Kínder":"Me adapto y aprendo","Pre-Primario":"Mi escuela y yo"}
TEMA_SEP = {"Maternal":"Mi familia me abraza","Pre-Kínder":"Mi familia y mi casa","Kínder":"Convivimos en comunidad","Pre-Primario":"Convivimos y compartimos"}

def record_mensual_inicial(grado, sems_data, mes_label, mes_num, f0, f1, tema):
    dias = dias_habiles(f0, f1)
    trozos = trocear(dias, len(sems_data))
    semanas = []
    for k, sem in enumerate(sems_data):
        chunk = trozos[k]
        ds = []
        for j, d in enumerate(chunk):
            t = sem["dias"][j % len(sem["dias"])]
            ds.append({
              "id": d.strftime("%Y-%m-%d"), "etiqueta": etq(d), "titulo": t,
              "desempenos": [sem["desempeno"], f"Participa con autonomía en la actividad de «{t}»."],
              "recursos": sem["recursos"], "orientacion": sem["orientacion"],
              "momentos": momentos_v17(t, sem, grado),
              "cotejo": cotejo_v17(t, sem["desempeno"]),
            })
        a, b = chunk[0], chunk[-1]
        semanas.append({"numero":k+1,"tema":sem["tema"],"fechas":f"{a.day}–{b.day} de {mes_label.lower()} 2026",
            "inicio":sem["pregunta"],"desarrollo":sem["concepto"],"cierre":sem["cierre"],"dias":ds})
    return sems_data, semanas

# ======================= PRIMARIA 3ro: NUEVAS UNIDADES =======================
PRI_CSS = dict(PRI_MOM, **{
 "titulo":"Ciencias Sociales 3ro · Mi comunidad me cuida","mes":"Octubre 2026","tema":"Mi comunidad: espacios, instituciones y convivencia ciudadana",
 "grado":"3ro","areas":["Ciencias Sociales"],
 "descripcion":"Unidad de Ciencias Sociales 3ro alineada al tema integrador 'Mi comunidad me cuida': orientación espacial del barrio, las instituciones que protegen a las personas (escuela, hospital, cuerpos de seguridad), derechos y deberes para convivir y los símbolos patrios que nos unen como dominicanos.",
 "ciclo":"De mi barrio a mi patria",
 "semanas":[
  {"tema":"Mi barrio y sus lugares","desempeno":"Ubica en un croquis los lugares importantes de su barrio.",
   "pregunta":"¿Qué lugares hay en mi barrio y para qué sirven?",
   "concepto":"orientación espacial (puntos cardinales básicos), croquis y los lugares del barrio: escuela, colmado, iglesia, parque y parqueo; puntos de referencia.",
   "actividad":"construcción del croquis del barrio con maquetas de cajas y una leyenda de lugares.",
   "cierre":"Presenta su croquis y explica un punto de referencia.",
   "recursos":["Cajas de cartón","Cartulina","Crayones","Brújula de juguete"],
   "orientacion":"Caminar el barrio mentalmente: partir siempre desde la escuela como referencia.",
   "dias":["Mi barrio en un croquis","Puntos de referencia","Los lugares que sirven","Norte, sur, este y oeste","Maqueta: mi barrio","Presento mi croquis"]},
  {"tema":"Instituciones que nos cuidan","desempeno":"Explica la función de las instituciones que protegen a la comunidad.",
   "pregunta":"¿Quiénes cuidan y protegen a mi comunidad?",
   "concepto":"las instituciones de la comunidad: escuela, hospital, Defensa Civil, Policía y bomberos; a quién acudir según la necesidad; servicios públicos.",
   "actividad":"feria de las instituciones: equipos investigan una institución y crean su stand informativo.",
   "cierre":"Explica a quién acudir en una emergencia determinada.",
   "recursos":["Fichas de investigación","Cartulinas","Láminas de instituciones","Teléfono de juguete"],
   "orientacion":"Practicar el 911 y los números de emergencia con dramatizaciones seguras.",
   "dias":["Las instituciones de mi barrio","El hospital y mi salud","La escuela: comunidad que enseña","911 y emergencias","Preparo mi stand","Feria: instituciones que cuidan"]},
  {"tema":"Convivimos con derechos y deberes","desempeno":"Distingue derechos y deberes en situaciones de convivencia escolar.",
   "pregunta":"¿Qué derechos tengo y qué deberes cumplo en mi comunidad?",
   "concepto":"derechos del niño/a (educación, salud, nombre y protección) y deberes de convivencia (respeto, cuidado del entorno y colaboración).",
   "actividad":"tribunal de la convivencia: dramatizan casos y el 'jurado' decide con la carta de derechos.",
   "cierre":"Fundamenta un veredicto con un derecho y un deber.",
   "recursos":["Carta de los derechos","Tarjetas de casos","Mazo de juguete","Papelógrafo"],
   "orientacion":"Casos cercanos a la vida escolar: el recreo, la fila, el préstamo de materiales.",
   "dias":["Mis derechos","Mis deberes","Dramatizamos casos","El tribunal decide","Nuestro pacto de convivencia","Tribunal de la convivencia"]},
  {"tema":"Símbolos que nos unen","desempeno":"Reconoce y describe los símbolos patrios de la República Dominicana.",
   "pregunta":"¿Qué símbolos nos unen como dominicanos?",
   "concepto":"los símbolos patrios: la bandera, el escudo y el himno nacional; su historia, significado y el respeto que merecen.",
   "actividad":"galería patria: dibujan la bandera, analizan el escudo y practican la postura del himno.",
   "cierre":"Explica el significado de un símbolo patrio.",
   "recursos":["Bandera","Lámina del escudo","Audio del himno","Crayones"],
   "orientacion":"Vivir el respeto: práctica del saludo a la bandera con significado, no solo por rutina.",
   "dias":["Nuestra bandera","El escudo nacional","El himno y su historia","Historia de la bandera","Galería patria","Celebramos lo dominicano"]},
 ]})

PRI_CSN = dict(PRI_MOM, **{
 "titulo":"Ciencias de la Naturaleza 3ro · Los seres vivos y mi salud","mes":"Octubre 2026","tema":"Los seres vivos, mis sentidos y el cuidado de la vida",
 "grado":"3ro","areas":["Ciencias de la Naturaleza"],
 "descripcion":"Unidad de Ciencias de la Naturaleza 3ro alineada al tema integrador 'Mi cuerpo y mi salud': características de los seres vivos, los órganos de los sentidos y su cuidado, las plantas y el aire que respiramos, y el agua como recurso que protege la salud.",
 "ciclo":"Indagar la vida que me rodea",
 "semanas":[
  {"tema":"Ser vivo o no vivo","desempeno":"Clasifica seres vivos y materia inerte según sus características.",
   "pregunta":"¿Cómo sé si algo está vivo o no está vivo?",
   "concepto":"características de los seres vivos (nacen, se alimentan, crecen, respiran y se reproducen) frente a la materia inerte; clasificación con ejemplos del entorno dominicano.",
   "actividad":"safari del patio: recolectan muestras, las observan con lupa y las clasifican en tabla viva/inerte.",
   "cierre":"Justifica una clasificación con dos características.",
   "recursos":["Lupas","Frascos recolectores","Tabla de registro","Bolsas"],
   "orientacion":"La evidencia antes del nombre: observar bien y luego clasificar.",
   "dias":["¿Qué está vivo?","Los seres vivos crecen","La materia inerte","Safari del patio","Clasifico mis hallazgos","Tabla viva e inerte"]},
  {"tema":"Mis sentidos exploran","desempeno":"Relaciona cada sentido con su órgano y su función.",
   "pregunta":"¿Cómo conozco el mundo con mis cinco sentidos?",
   "concepto":"los órganos de los sentidos (ojos, oídos, nariz, lengua y piel) y sus funciones; hábitos de cuidado de cada sentido y evaluación de la propia salud sensorial.",
   "actividad":"circuito sensorial por estaciones: experimentan con texturas, sonidos, olores y sabores seguros y registran.",
   "cierre":"Nombra el órgano que usó en cada estación.",
   "recursos":["Bolsas de texturas","Frascos de olores","Vendas de juego","Frutas del país"],
   "orientacion":"Incluir el cuidado de los sentidos: gafas al sol, volumen bajo, no tocar lo desconocido.",
   "dias":["Mis ojos y la vista","Mis oídos y el oído","Nariz, lengua y piel","Circuito sensorial","Cuido mis sentidos","Informe: mis cinco puertas"]},
  {"tema":"Las plantas nos dan vida","desempeno":"Identifica las partes de una planta y explica su aporte al aire y la salud.",
   "pregunta":"¿Qué me dan las plantas a mi salud?",
   "concepto":"las partes de la planta (raíz, tallo, hojas, flor y fruto), la fotosíntesis sencilla y el aporte de las plantas al aire limpio y la alimentación.",
   "actividad":"huerto del aula: siembran habichuelas o cilantro en vasos y registran el crecimiento diario.",
   "cierre":"Predice cuánto crecerá su planta y explica el cuidado que le dará.",
   "recursos":["Vasos","Semillas","Algodón o tierra","Regadera pequeña"],
   "orientacion":"El registro diario del huerto es el primer dato científico del grado.",
   "dias":["Las partes de la planta","La raíz y el tallo","Hojas que respiran","Siembro mi huerto","Registro el crecimiento","Las plantas y mi plato"]},
  {"tema":"Agua limpia, cuerpo sano","desempeno":"Explica por qué el agua y el saneamiento protegen la salud.",
   "pregunta":"¿Por qué el agua limpia me mantiene sano?",
   "concepto":"el agua como recurso vital: usos, cuidado del agua, el ciclo del agua sencillo y la relación entre agua limpia, lavado de manos y prevención de enfermedades.",
   "actividad":"experimento del agua: filtran agua turbia con capas y diseñan el cartel del uso responsable.",
   "cierre":"Explica cómo el agua filtrada se ve y por qué hervirla o purificarla la hace segura.",
   "recursos":["Botella cortada","Algodón, arena y grava","Agua turbia","Cartel"],
   "orientacion":"Conectar con el dengue y el agua estancada: la ciencia previene en casa.",
   "dias":["El agua que me cuida","El ciclo del agua","Filtro el agua turbia","Uso responsable del agua","Agua y dengue","Cartel: agua limpia, vida sana"]},
 ]})

PRI_FIHR = dict(PRI_MOM, **{
 "titulo":"FIHyR 3ro · Me conozco, me cuido y amo","mes":"Octubre 2026","tema":"Identidad, emociones, familia y cuidado de la vida",
 "grado":"3ro","areas":["Formación Integral Humana y Religiosa"],
 "descripcion":"Unidad de Formación Integral Humana y Religiosa 3ro alineada al tema integrador 'Me conozco, me cuido y amo': la dignidad de la persona, el nombre y la identidad, las emociones y los valores, la familia como escuela de amor y el cuidado de la vida propia y del entorno con gratitud.",
 "ciclo":"Crezco en dignidad y amor",
 "semanas":[
  {"tema":"Soy único y valioso","desempeno":"Explica por qué cada persona tiene dignidad y valor único.",
   "pregunta":"¿Por qué soy valioso y único?",
   "concepto":"la dignidad de la persona: creado/a con valor, mis talentos, mi nombre y mis sueños; todas las personas merecen respeto.",
   "actividad":"la caja del tesoro personal: decoran su caja con su nombre, sus talentos y sueños y la presentan.",
   "cierre":"Dice un talento propio y por qué lo agradece.",
   "recursos":["Cajas pequeñas","Papel crepé","Espejo","Crayones"],
   "orientacion":"Mirar al espejo y decir 'soy valioso/a' antes de escribir: la palabra construye identidad.",
   "dias":["Mi nombre, mi historia","El espejo del valor","Mis talentos","La caja del tesoro","Presento mi tesoro","Soy único y valioso"]},
  {"tema":"Mis emociones y mis valores","desempeno":"Identifica sus emociones y aplica valores para convivir.",
   "pregunta":"¿Qué siento y cómo lo cuido con valores?",
   "concepto":"las emociones (alegría, tristeza, enojo, miedo) y los valores (respeto, honestidad, gratitud y solidaridad) como brújula de la convivencia.",
   "actividad":"el semáforo emocional: dramatizan situaciones, identifican la emoción y eligen la respuesta con valores.",
   "cierre":"Aplica el semáforo a un caso real del salón.",
   "recursos":["Semáforo de cartulina","Tarjetas de casos","Espejo","Canción de la calma"],
   "orientacion":"Nombrar la emoción baja su intensidad: validar antes de corregir.",
   "dias":["¿Qué siento hoy?","El semáforo emocional","Respeto y honestidad","Gratitud en mi día","Solidaridad en acción","Mi brújula de valores"]},
  {"tema":"Mi familia: escuela de amor","desempeno":"Describe cómo su familia le enseña a amar y a cuidar.",
   "pregunta":"¿Qué aprendo del amor en mi familia?",
   "concepto":"la familia como primera comunidad de amor: cuidados, enseñanzas y tradiciones; el mandamiento del amor (amar a Dios y al prójimo) vivido en casa.",
   "actividad":"el álbum del amor familiar: crean una página por familia con foto o dibujo, una tradición y una frase de amor.",
   "cierre":"Comparte una tradición familiar y lo que le enseña.",
   "recursos":["Hojas del álbum","Crayones","Fotos","Cinta"],
   "orientacion":"Todas las familias aman distinto: el álbum no compara, celebra.",
   "dias":["Mi familia me enseña","Las tradiciones de casa","El mandamiento del amor","Álbum del amor","Comparto mi página","Gracias por mi familia"]},
  {"tema":"Cuido la vida que me rodea","desempeno":"Propone acciones de cuidado de su vida y del entorno.",
   "pregunta":"¿Cómo cuido mi vida y la vida que me rodea?",
   "concepto":"el cuidado de la vida: mi cuerpo (salud, higiene y buen trato), los demás (buen trato y ayuda) y la creación (plantas, agua y animales) como regalo que se agradece.",
   "actividad":"alianza del cuidado: firman compromisos de cuidado personal, comunitario y ambiental con seguimiento semanal.",
   "cierre":"Explica su compromiso y cómo lo cumplirá esta semana.",
   "recursos":["Cartel de la alianza","Sellos","Plantita del salón","Hojas de compromiso"],
   "orientacion":"Compromisos pequeños y verificables: 'regaré la planta', no 'salvaré el planeta'.",
   "dias":["Mi cuerpo es regalo","Buen trato a los demás","La creación y yo","Mi compromiso de cuidado","La alianza del cuidado","Celebro la vida"]},
 ]})

# ======================= SECUNDARIA 1ro: MATEMÁTICA =======================
SEC_MAT = {
 "titulo":"Matemática 1ro · Los números que cuidan mi salud","mes":"Octubre 2026","tema":"Conjuntos, números naturales, potencias y divisibilidad con datos de salud",
 "nivel":"Secundaria","grado":"1ro","inicio":D(2026,10,1),"fin":D(2026,10,31),
 "areas":["Matemática"],"competencias":[CF[2],CF[4],CF[3],CF[6]],
 "descripcion":"Unidad de Matemática 1ro de Secundaria alineada al tema integrador 'Salud integral e identidad': conjuntos y sus operaciones, números naturales y jerarquía de operaciones, potencias y raíces exactas, y divisibilidad (múltiplos, divisores, MCD y mcm) resolviendo problemas con datos reales de salud: pulsaciones, hidratación, horas de sueño y control del azúcar.",
 "ciclo":"Del conjunto al número que resuelve",
 "semanas":[
  {"tema":"Conjuntos y mi entorno","desempeno":"Representa conjuntos por extensión y comprensión y opera con ellos.",
   "pregunta":"¿Cómo agrupo y organizo la información de mi vida con conjuntos?",
   "concepto":"conjuntos: determinación por extensión y comprensión, pertenencia e inclusión, subconjuntos, unión, intersección y diferencia; diagramas de Venn aplicados a grupos de hábitos saludables (quién hace ejercicio, quién hidratado, quién duerme 8 horas).",
   "actividad":"estudio de campo del aula: encuestan hábitos, representan los resultados en diagramas de Venn y extraen conclusiones.",
   "cierre":"Interpreta un diagrama de Venn del aula y formula una conclusión.",
   "recursos":["Diagramas de Venn","Fichas de encuesta","Papelógrafo","Crayones"],
   "orientacion":"Que los datos sean de los propios estudiantes: la matemática se entiende cuando habla de uno.",
   "dias":["¿Qué es un conjunto?","Extensión y comprensión","Pertenencia e inclusión","Unión e intersección","Diferencia y complemento","Venn: hábitos del 1ro"]},
  {"tema":"Números naturales en acción","desempeno":"Opera con números naturales aplicando la jerarquía correcta.",
   "pregunta":"¿Cómo me ayudan las operaciones con naturales en problemas de salud?",
   "concepto":"números naturales: adición, sustracción, multiplicación y división; propiedades y jerarquía de operaciones combinadas con paréntesis; problemas con datos de salud: calorías, minutos de actividad, vasos de agua y horas de sueño semanales.",
   "actividad":"taller del Expediente Matemático: calculan el balance semanal de su salud (actividad, agua, sueño) con operaciones combinadas.",
   "cierre":"Presenta su expediente y verifica una operación ante el grupo.",
   "recursos":["Tablas de datos","Calculadora de verificación","Expediente impreso","Cuaderno"],
   "orientacion":"Estimación primero, cálculo después: ¿el resultado es razonable?",
   "dias":["Opero con naturales","Propiedades que facilitan","Jerarquía de operaciones","Paréntesis y combinadas","Problemas de mi salud","Taller: expediente matemático"]},
  {"tema":"Potencias y raíces exactas","desempeno":"Calcula potencias y raíces cuadradas exactas con aplicaciones.",
   "pregunta":"¿Para qué sirven las potencias y las raíces en la vida real?",
   "concepto":"potencias de base natural y exponente natural: lectura, cálculo y propiedades básicas; raíz cuadrada exacta; aplicaciones: el área de la cancha al cuadrado, duplicaciones (bacterias) y cuadrículas del patio.",
   "actividad":"laboratorio de patios: miden el área de espacios de la escuela, calculan con potencias y verifican con la raíz.",
   "cierre":"Explica cómo la raíz cuadrada devuelve la medida del lado.",
   "recursos":["Cinta métrica","Cuadrícula del patio","Calculadora","Hojas de laboratorio"],
   "orientacion":"De lo concreto (el patio medido) a lo abstracto (el exponente).",
   "dias":["La potencia y su lenguaje","Cuadrados perfectos","Propiedades de potencias","Raíz cuadrada exacta","Áreas al cuadrado","Laboratorio: mido y verifico"]},
  {"tema":"Divisibilidad y datos de salud","desempeno":"Aplica múltiplos, divisores, MCD y mcm para resolver problemas.",
   "pregunta":"¿Cómo la divisibilidad organiza turnos, dosis y tiempos?",
   "concepto":"divisibilidad: múltiplos y divisores, criterios de 2, 3, 5 y 10, números primos y compuestos, MCD y mcm; problemas reales: turnos de limpieza, cada cuánto se repite una dosis y embalar kits de higiene.",
   "actividad":"proyecto 'El turno perfecto': diseñan con mcm el calendario de turnos y con MCD el reparto justo de kits entre grupos.",
   "cierre":"Justifica con divisibilidad el calendario presentado.",
   "recursos":["Calendario en blanco","Fichas de kits","Tabla de criterios","Cuaderno"],
   "orientacion":"El MCD reparte; el mcm coordina: dar a cada concepto su verbo de uso.",
   "dias":["Múltiplos y divisores","Criterios de divisibilidad","Primos y compuestos","MCD: reparto justo","mcm: turnos y ciclos","Proyecto: el turno perfecto"]},
 ]}

# ======================= ANUALES POR ASIGNATURA =======================
MESES_ANUAL = ["Agosto 2026","Septiembre 2026","Octubre 2026","Noviembre 2026","Diciembre 2026",
               "Enero 2027","Febrero 2027","Marzo 2027","Abril 2027","Mayo 2027","Junio 2027"]
ANUAL_TEMAS = {
 ("Primaria","3ro","Matemática"): ["Diagnóstico y números hasta 999","Suma y resta hasta 999","Números, operaciones y problemas de mi cuerpo saludable",
   "Multiplicación como suma repetida","División exacta y reparto","Fracciones en mi vida","Figuras planas y ángulos","Medición: longitud, masa y tiempo",
   "Datos, tablas y gráficos","Repaso e integración","Proyecto matemático del año"],
 ("Primaria","3ro","Ciencias Sociales"): ["Mi escuela y mi comunidad","Mi municipio y sus gentes","Mi comunidad me cuida",
   "Trabajos y profesiones de mi país","Navidad y tradiciones dominicanas","Mi provincia en el mapa","Mi patria dominicana",
   "Comunidad y medio ambiente","Medios de transporte y comunicación","Héroes y heroínas dominicanas","Proyecto: soy ciudadano/a"],
 ("Primaria","3ro","Ciencias de la Naturaleza"): ["Mi cuerpo y mis sentidos","Los seres vivos de mi entorno","Los seres vivos y mi salud",
   "El agua y el aire en mi vida","Animales del país y sus cuidos","Nutrición y salud","Las plantas y el clima",
   "Energía y movimiento","Universo y planetas","Cuidemos el ambiente","Proyecto: pequeños científicos"],
 ("Primaria","3ro","Lengua Española"): ["Comunicación y adaptación","Narramos historias de mi escuela","Narramos mi mundo saludable",
   "Poesía y tradición oral","Navidad en palabras","Textos instructivos","La noticia y mi comunidad",
   "Describo y argumento","Teatro y dramatización","Comprensión y vocabulario","Proyecto: mi antología"],
 ("Primaria","3ro","Formación Integral Humana y Religiosa"): ["Me presento con dignidad","Convivimos y celebramos la vida","Me conozco, me cuido y amo",
   "Dignidad y derechos del niño/a","Navidad: el regalo mayor","Pertenezco y participo","Identidad y respeto",
   "Cuido la creación","Solidaridad y servicio","Decido con valores","Proyecto: mi vida, mi regalo"],
 ("Secundaria","1ro","Matemática"): ["Conjuntos y números naturales","Números enteros y operaciones","Los números que cuidan mi salud",
   "Números racionales y decimales","Proporcionalidad y porcentaje","Ecuaciones sencillas","Geometría: puntos, rectas y ángulos",
   "Perímetro, área y volumen","Estadística descriptiva","Repaso e integración","Proyecto matemático integrador"],
}

def anual_asignatura(nivel, grado, asig, temas, areas, comps):
    rec = anual_record(nivel, f"Plan Anual 2026-2027 · {nivel} {grado} · {asig}",
                       list(zip(MESES_ANUAL, temas)), areas, comps,
                       f"Dosificación anual {asig} de {grado} de {nivel}: once unidades temáticas integradoras de agosto 2026 a junio 2027, "
                       f"alineadas a la Adecuación Curricular 2023 del MINERD, con evaluación por competencias y 4 periodos escolares.",
                       "Unidad de Aprendizaje")
    rec["grado"] = grado
    rec["tema"] = f"Dosificación anual · {asig} {grado}"
    return rec

# ======================= ENSAMBLADO =======================
BASE = "https://raw.githubusercontent.com/Mingo20/colegio-reformado-esperanza/main/semanas-2027/"
RECS = []
import os
os.makedirs("semanas-2027", exist_ok=True)

def slug_de(t):
    return re.sub(r"[^a-z0-9]+","-", t.lower()).strip("-")[:70]

def con_url_semanas(rec, semanas):
    s = slug_de(rec["titulo"])
    json.dump(semanas, open(f"semanas-2027/{s}.json","w",encoding="utf-8"), ensure_ascii=False)
    rec["semanas_json"] = f"url:{BASE}{s}.json#sem={len(semanas)}"
    return rec

# --- Inicial: restaurar Agosto y Septiembre por grado ---
for grado in GRADOS_INI:
    for data, tema, mes_label, f0, f1 in [
        (AGO[grado], TEMA_AGO[grado], "agosto", D(2026,8,3), D(2026,8,31)),
        (SEP[grado], TEMA_SEP[grado], "septiembre", D(2026,9,1), D(2026,9,30)),
    ]:
        mes_oficial = f"{'Agosto' if mes_label=='agosto' else 'Septiembre'} 2026"
        sems_data, semanas = record_mensual_inicial(grado, data, mes_label, None, f0, f1, tema)
        titulo = f"Plan Mensual · Inicial {grado} · {mes_oficial} · {tema}"
        rec = {
          "titulo": titulo, "mes": mes_oficial, "tema": tema,
          "nivel": "Inicial", "grado": grado, "asig": "",
          "descripcion": f"{DESC_GRADO[grado]}. Plan mensual de {mes_label} 2026: {tema.lower()} bajo la estrategia Centro de Interés, según la Adecuación Curricular 2023, con clases diarias completas (momentos Inicio · Práctica · Desarrollo · Cierre).",
          "docente_id": "", "activo": True, "anio_escolar": "2026-2027",
          "competencias_json": json.dumps(COMP_INI, ensure_ascii=False),
          "areas_json": json.dumps(AREAS_INI, ensure_ascii=False),
          "ciclo_json": json.dumps({"titulo": f"{tema} · Centro de Interés", "etapas":[
              {"n": s["tema"], "d": s["cierre"], "sem": f"Semana {k+1}"} for k, s in enumerate(sems_data)]}, ensure_ascii=False),
        }
        RECS.append(con_url_semanas(rec, semanas))

# --- Primaria 3ro: anual + mensual por asignatura básica ---
COMP_PRI = [CF[0],CF[1],CF[2],CF[3],CF[4],CF[6]]
UNIDADES_PRI = {"Matemática": PRI_MAT, "Lengua Española": PRI_LEN, "Ciencias Sociales": PRI_CSS,
                "Ciencias de la Naturaleza": PRI_CSN, "Formación Integral Humana y Religiosa": PRI_FIHR}
for asig, u in UNIDADES_PRI.items():
    RECS.append(anual_asignatura("Primaria","3ro", asig, ANUAL_TEMAS[("Primaria","3ro",asig)],
                                 ["Matemática","Lengua Española","Ciencias Sociales","Ciencias de la Naturaleza","Formación Integral Humana y Religiosa"],
                                 COMP_PRI))
    rec = unidad_record(u)
    semanas = json.loads(rec["semanas_json"])
    RECS.append(con_url_semanas(rec, semanas))

# --- Secundaria 1ro Matemática: anual + mensual ---
RECS.append(anual_asignatura("Secundaria","1ro","Matemática", ANUAL_TEMAS[("Secundaria","1ro","Matemática")],
                             ["Matemática"], [CF[2],CF[3],CF[4],CF[6]]))
rec = unidad_record(SEC_MAT)
semanas = json.loads(rec["semanas_json"])
RECS.append(con_url_semanas(rec, semanas))

# --- Biblioteca completa: sumar los 8 registros vigentes de v4 (4 anuales + 4 octubre Inicial) ---
v4 = json.load(open("planapp_records_v4.json", encoding="utf-8"))
RECS = v4 + RECS

json.dump(RECS, open("planapp_records_v5.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
n_dias = 0
for r in RECS:
    sj = r.get("semanas_json","")
    if sj.startswith("url:"):
        fn = "semanas-2027/" + sj[4:].rsplit("#sem=",1)[0].rsplit("/",1)[-1]
        n_dias += sum(len(s.get("dias",[])) for s in json.load(open(fn,encoding="utf-8")))
    else:
        n_dias += sum(len(s.get("dias",[])) for s in json.loads(sj or "[]"))
print("registros v5:", len(RECS), "| clases diarias en biblioteca:", n_dias)
for r in RECS:
    print(" -", r["titulo"][:78])
