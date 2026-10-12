# -*- coding: utf-8 -*-
t = open("tests-v22.js",encoding="utf-8").read()
t = t.replace("PRUEBAS V22","PRUEBAS V23").replace("V22 TODO OK","V23 TODO OK").replace("V22 FALLOS","V23 FALLOS")

# --- v22 cronómetro/perfil test: texto ya no existe + arrastre + estado ---
t = t.replace('''    const ch = document.getElementById("scr-clase").innerHTML;
    if(!ch.includes("Momentos ajustados a tu clase de 45 minutos, si lo deseas (cámbialo en perfil)")) throw new Error("texto momentos no actualizado");''',
'''    const ch = document.getElementById("scr-clase").innerHTML;
    if(ch.includes("Momentos ajustados")) throw new Error("texto de minutos sigue visible");
    if(typeof habilitarArrastreCrono !== "function" || typeof aplicarPosCrono !== "function") throw new Error("funciones de arrastre ausentes");''')

t = t.replace('''    const fl = document.getElementById("cronoFlotante").innerHTML;
    if(fl.includes("btnPlay") || fl.includes("Pausar")) throw new Error("botones presentes en cronómetro flotante");
    if(fl.includes("btn-soft")) throw new Error("fondo azul de botones presente");''',
'''    const fl = document.getElementById("cronoFlotante").innerHTML;
    if(fl.includes("btnPlay") || fl.includes("Pausar")) throw new Error("botones presentes en cronómetro flotante");
    if(fl.includes("btn-soft")) throw new Error("fondo azul de botones presente");
    if(!fl.includes("timerEstado")) throw new Error("sin etiqueta de estado en el cronómetro");
    S.ui.cronoPos = { left: 30, top: 200 };
    aplicarPosCrono();
    if(document.getElementById("cronoFlotante").style.left!=="30px" || document.getElementById("cronoFlotante").style.top!=="200px") throw new Error("posición del cronómetro no se aplica");''')

# --- nuevos tests v23 ---
t = t.replace('''  await probar("v22: mensual con desglose por semanas sin acceso a diarios", ()=>{''',
'''  await probar("v23: plan mensual con estructura curricular oficial completa", ()=>{
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

  await probar("v22: mensual con desglose por semanas sin acceso a diarios", ()=>{''')

open("tests-v23.js","w",encoding="utf-8").write(t)
i = t.find("/* ===== PRUEBAS V23 ===== */")
open("/tmp/v23_cuerpo.js","w",encoding="utf-8").write(t[i:])
print("tests-v23 listo")
