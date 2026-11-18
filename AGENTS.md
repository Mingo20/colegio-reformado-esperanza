# AGENTS.md · PlanApp · Panel Docente

Guía para agentes de IA y para personas que necesiten modificar este proyecto. Léela completa antes de tocar el código.

## Contexto

- **Organización:** DGTech (República Dominicana). Fundador: Domingo Guerra.
- **Proyecto:** PlanApp · Panel Docente · versión actual **26.0.0** · estado **Producción**.
- **Repositorio:** `Mingo20/colegio-reformado-esperanza`
- **Aplicación en vivo:** https://mingo20.github.io/colegio-reformado-esperanza/
- **Hub del ecosistema:** https://mingo20.github.io/dtech/
- **Idioma de la interfaz y de las respuestas:** español dominicano.

## Qué resuelve

Los docentes dedican más tiempo a la burocracia que a enseñar y deben entregar planes con el formato oficial.

## Resumen técnico

**Tipo:** PWA + backend Base44

El panel consume las funciones appDocentes y syncDatosDocente. Los planes se generan con scripts y se publican como archivos referenciados desde la biblioteca.

**Stack**

- JavaScript sin frameworks (app-docente.js)
- Generadores en Python para planes (gen_v22.py, gen_v23.py)
- Backend: appDocentes y syncDatosDocente en Base44
- Biblioteca de planes en Supabase

**Backend**

- appDocentes
- syncDatosDocente
- cargarBibliotecaPlanes

**Datos**

- PlanApp
- DocenteApp
- Estudiante
- Asistencia
- Calificacion

## Reglas que no se pueden romper

- Antes de generar un plan leer la malla curricular, el calendario escolar y el manual operativo oficiales
- El año escolar va de agosto a junio, en 3 trimestres
- Octubre: Canción Escolar y Alimentación Saludable; Noviembre: Familia y Buen Trato; Diciembre: Navidad

## Datos sensibles

Datos de menores de edad y calificaciones. Acceso restringido por rol.

## Cómo trabajar aquí

1. Lee el README y este archivo. Luego abre el código que vayas a cambiar.
2. Haz el cambio más pequeño que resuelva el problema. No reescribas lo que funciona.
3. Prueba en el navegador antes de dar algo por terminado: abre la aplicación, recorre el flujo afectado y revisa la consola.
4. Si la app tiene Service Worker, **sube el número de la caché** al cambiar archivos, o los usuarios seguirán viendo la versión vieja.
5. Registra cada cambio en `CHANGELOG.md` con la versión, la fecha y una línea clara.
6. Sube la versión según la regla: *mayor* si rompes algo, *menor* si añades una función, *parche* si corriges un error.

## Reglas de seguridad

- **Nunca** escribas contraseñas, tokens, claves de API ni PIN en el código, en los README ni en los mensajes de commit. Este repositorio es público.
- Las claves van como secretos del backend. En el navegador solo puede haber datos públicos.
- Si encuentras una credencial expuesta, avisa al dueño y recomienda rotarla antes de seguir.
- No borres datos de producción sin confirmación explícita del dueño.

## Pendientes conocidos

- Proteger los paneles de administración con autenticación real
- Retirar del repositorio los archivos de depuración (patch-*.py, mk_tests_*.py)

## Estilo

- Textos para el usuario en español dominicano, claros y cordiales.
- Horas en formato de 12 horas (9:45 p. m.). Fechas con el mes en letras.
- Diseño limpio, rápido y pensado primero para el celular.

## Contacto

Domingo Guerra · DGTech · WhatsApp 829-646-9885
