<div align="center">

<img src="https://raw.githubusercontent.com/Mingo20/dtech/main/assets/brand/dg-logo-512.png" width="84" alt="DGTech" />

# PlanApp · Panel Docente

**Planificación, asistencia, calificaciones y boletines para docentes del Colegio Reformado la Esperanza, alineado al currículo oficial del Ministerio de Educación.**

![Versión](https://img.shields.io/badge/versión-26.0.0-FF6A13?style=flat-square) ![Estado](https://img.shields.io/badge/estado-Producción-2EA44F?style=flat-square) ![Tipo](https://img.shields.io/badge/tipo-PWA_%2B_backend_Base44-0B2545?style=flat-square) ![DGTech](https://img.shields.io/badge/by-DGTech-FF6A13?style=flat-square)

[**Abrir la aplicación**](https://mingo20.github.io/colegio-reformado-esperanza/) · [Hub DGTech](https://mingo20.github.io/dtech/) · [Guía para agentes](AGENTS.md) · [Cambios](CHANGELOG.md)

<img src="https://raw.githubusercontent.com/Mingo20/dtech/main/assets/shots/colegio.jpg" alt="PlanApp · Panel Docente" width="720" />

</div>

## El problema

Los docentes dedican más tiempo a la burocracia que a enseñar y deben entregar planes con el formato oficial.

## Qué hace

- Biblioteca de planes anuales, mensuales y diarios 2026-2027 (Inicial, Primaria y Secundaria)
- Estructura oficial: situación de aprendizaje, triada de contenidos, evaluación de unidad con metacognición
- Efemérides: nacen en el anual, se sientan en el mensual y se ejecutan en el diario
- Asistencia con estados por color y evaluación con cotejos persistentes
- Boletines por período o rango de fechas: cualitativo en Inicial y escala A-F en Primaria y Secundaria
- Cronómetro flotante arrastrable de la clase en curso
- Exportación a Word en horizontal

## Cómo está construido

**Tipo:** PWA + backend Base44

El panel consume las funciones appDocentes y syncDatosDocente. Los planes se generan con scripts y se publican como archivos referenciados desde la biblioteca.

**Tecnologías**

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

## Datos sensibles

Datos de menores de edad y calificaciones. Acceso restringido por rol.

## Reglas del proyecto

- Antes de generar un plan leer la malla curricular, el calendario escolar y el manual operativo oficiales
- El año escolar va de agosto a junio, en 3 trimestres
- Octubre: Canción Escolar y Alimentación Saludable; Noviembre: Familia y Buen Trato; Diciembre: Navidad

## Pendientes conocidos

- Proteger los paneles de administración con autenticación real
- Retirar del repositorio los archivos de depuración (patch-*.py, mk_tests_*.py)

## Estructura del repositorio

Consulta [AGENTS.md](AGENTS.md) para el mapa de archivos y las instrucciones de trabajo.

## Parte de DGTech

Este proyecto forma parte del ecosistema **DGTech**, un estudio de software dominicano que construye aplicaciones instalables para resolver problemas reales. Todas las aplicaciones están en [https://mingo20.github.io/dtech/](https://mingo20.github.io/dtech/).

---

<sub>© 2026 DGTech · Domingo Guerra · Todos los derechos reservados. Consulta el archivo NOTICE.</sub>
