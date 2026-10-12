import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const JSON_HEADERS = { ...CORS_HEADERS, "Content-Type": "application/json" };

function rand6(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

async function listar(db: any, entidad: string): Promise<any[]> {
  let res: any;
  try {
    res = await db.entities[entidad].list({});
  } catch (_e) {
    res = await db.entities[entidad].list({ get_params: {} });
  }
  if (Array.isArray(res)) return res;
  if (res && Array.isArray(res.data)) return res.data;
  if (res && Array.isArray(res.records)) return res.records;
  if (res && res.list) return res.list;
  return [];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Solo se acepta POST" }), { status: 405, headers: JSON_HEADERS });
  }
  let payload: any;
  try { payload = await req.json(); } catch (_e) {
    return new Response(JSON.stringify({ success: false, error: "JSON inválido" }), { status: 400, headers: JSON_HEADERS });
  }
  const accion = String(payload?.accion || "");
  const base44 = createClientFromRequest(req) as any;
  const db = base44.asServiceRole ?? base44;

  try {
    /* ---------- ONBOARDING: registrar docente ---------- */
    if (accion === "onboarding") {
      const nombre = String(payload.nombre || "").trim();
      const colegio = String(payload.colegio || "").trim();
      const distrito = String(payload.distrito || "").trim();
      const whatsapp = String(payload.whatsapp || "").trim();
      const nivel = String(payload.nivel || "Inicial").trim();
      const grado = String(payload.grado || "").trim();
      const seccion = String(payload.seccion || "").trim();
      if (!nombre || !colegio) {
        return new Response(JSON.stringify({ success: false, error: "Faltan datos obligatorios" }), { status: 400, headers: JSON_HEADERS });
      }
      const jornada = String(payload.jornada || "").trim();
      const asignaturas = String(payload.asignaturas || "").trim();
      const secciones = String(payload.secciones || "").trim();
      const alumnos_por_seccion = String(payload.alumnos_por_seccion || "").trim();
      const especialidad = String(payload.especialidad || "").trim();
      const duracion_min = Number(payload.duracion_min) || 0;
      const perfil = {
        nombre_completo: nombre,
        colegio,
        distrito,
        whatsapp,
        nivel,
        grado,
        seccion,
        asignaturas,
        jornada,
        secciones,
        alumnos_por_seccion,
        especialidad,
        duracion_min,
        codigo: rand6(),
        activo: true,
        fecha_registro: new Date().toISOString().slice(0, 10),
      };
      const creado = await db.entities.DocenteApp.create(perfil);
      const id = creado?.id ?? creado?.data?.id ?? null;
      return new Response(JSON.stringify({
        success: true,
        id,
        codigo: perfil.codigo,
        perfil: { ...perfil, id },
      }), { status: 200, headers: JSON_HEADERS });
    }

    /* ---------- PERFIL: entrar con código ---------- */
    if (accion === "perfil") {
      const codigo = String(payload.codigo || "").trim().toUpperCase();
      const id = String(payload.id || "").trim();
      const whatsappIn = String(payload.whatsapp || "").replace(/\D/g, "");
      const docentes = await listar(db, "DocenteApp");
      const waDe = (x: any) => String(x.data?.whatsapp ?? x.whatsapp ?? "").replace(/\D/g, "");
      let d: any = null;
      if (whatsappIn) {
        const wIn = whatsappIn.slice(-10);
        const porCod = codigo ? docentes.filter((x: any) => String(x.data?.codigo ?? x.codigo ?? "").toUpperCase() === codigo) : [];
        const conWa = docentes.filter((x: any) => { const w = waDe(x); return w && w.slice(-10) === wIn; });
        if (!porCod.length && !conWa.length) {
          return new Response(JSON.stringify({ success: false, error: "El número de WhatsApp y el código son incorrectos" }), { status: 401, headers: JSON_HEADERS });
        }
        if (!porCod.length) {
          return new Response(JSON.stringify({ success: false, error: "El código es incorrecto" }), { status: 401, headers: JSON_HEADERS });
        }
        if (waDe(porCod[0]).slice(-10) !== wIn) {
          return new Response(JSON.stringify({ success: false, error: "El número de WhatsApp no coincide con el código" }), { status: 401, headers: JSON_HEADERS });
        }
        d = porCod[0];
      } else {
        d = docentes.find((x: any) =>
          (codigo && String(x.data?.codigo ?? x.codigo ?? "").toUpperCase() === codigo) ||
          (id && String(x.id) === id)
        );
      }
      if (!d) {
        return new Response(JSON.stringify({ success: false, error: "Código o ID no encontrado" }), { status: 404, headers: JSON_HEADERS });
      }
      const p = { ...(d.data ?? d), id: d.id };
      return new Response(JSON.stringify({ success: true, id: d.id, codigo: p.codigo, perfil: p }), { status: 200, headers: JSON_HEADERS });
    }

    /* ---------- PLANES: lista mensual disponibles ---------- */
    if (accion === "planes") {
      const nivel = String(payload.nivel || "Inicial");
      const docenteId = String(payload.docente_id || "");
      const planes = await listar(db, "PlanApp");
      const visibles = planes.filter((p: any) => {
        const d = p.data ?? p;
        const activo = d.activo !== false;
        const esBiblioteca = !d.docente_id || d.docente_id === "";
        const paraMi = d.docente_id === docenteId;
        const nivelOk = !d.nivel || d.nivel === nivel;
        return activo && (esBiblioteca || paraMi) && nivelOk;
      }).map((p: any) => {
        const d = p.data ?? p;
        let nSemanas = 0;
        const sjsonLista = String(d.semanas_json || "[]");
        if (sjsonLista.startsWith("url:")) {
          const m = sjsonLista.match(/#sem=(\d+)/);
          nSemanas = m ? parseInt(m[1], 10) : 4;
        } else {
          try {
            const sem = JSON.parse(sjsonLista);
            nSemanas = Array.isArray(sem) ? sem.length : 0;
          } catch (_e) { nSemanas = 0; }
        }
        return {
          id: p.id,
          titulo: d.titulo || "Plan mensual",
          mes: d.mes || "",
          tema: d.tema || "",
          descripcion: d.descripcion || "",
          nivel: d.nivel || "Inicial",
          grado: d.grado || "",
          asig: d.asig || "",
          semanas: nSemanas,
          propio: d.docente_id === docenteId,
        };
      });
      return new Response(JSON.stringify({ success: true, planes: visibles }), { status: 200, headers: JSON_HEADERS });
    }

    /* ---------- PLAN: detalle completo ---------- */
    if (accion === "plan") {
      const id = String(payload.id || "");
      const planes = await listar(db, "PlanApp");
      const rec = planes.find((p: any) => String(p.id) === id);
      if (!rec) {
        return new Response(JSON.stringify({ success: false, error: "Plan no encontrado" }), { status: 404, headers: JSON_HEADERS });
      }
      const d = rec.data ?? rec;
      const parseSeguro = (t: string, fb: any) => { try { return JSON.parse(t || "null") ?? fb; } catch (_e) { return fb; } };
      let semanas: any[] = parseSeguro(d.semanas_json, []);
      const sjsonPlan = String(d.semanas_json || "[]");
      if (sjsonPlan.startsWith("url:")) {
        const urlSemanas = sjsonPlan.slice(4).split("#")[0];
        try {
          const respSemanas = await fetch(urlSemanas);
          if (respSemanas.ok) {
            const arrSemanas = await respSemanas.json();
            semanas = Array.isArray(arrSemanas) ? arrSemanas : [];
          } else { semanas = []; }
        } catch (_e) { semanas = []; }
      }
      const plan = {
        id: rec.id,
        titulo: d.titulo || "",
        mes: d.mes || "",
        tema: d.tema || "",
        nivel: d.nivel || "Inicial",
        grado: d.grado || "",
        descripcion: d.descripcion || "",
        competencias: parseSeguro(d.competencias_json, []),
        areas: parseSeguro(d.areas_json, []),
        ciclo: parseSeguro(d.ciclo_json, null),
        situacion: parseSeguro(d.situacion_json, null),
        contenidos: parseSeguro(d.contenidos_json, null),
        evaluacion: parseSeguro(d.evaluacion_json, null),
        semanas,
        anio_escolar: d.anio_escolar || "2026-2027",
      };
      return new Response(JSON.stringify({ success: true, plan }), { status: 200, headers: JSON_HEADERS });
    }

    /* ---------- ACTUALIZAR PERFIL: jornada, duración, asignaturas ---------- */
    if (accion === "actualizar-perfil") {
      const id = String(payload.id || "");
      const docentes = await listar(db, "DocenteApp");
      const d = docentes.find((x: any) => String(x.id) === id);
      if (!d) {
        return new Response(JSON.stringify({ success: false, error: "Docente no encontrado" }), { status: 404, headers: JSON_HEADERS });
      }
      const cambios: any = {};
      if (payload.jornada !== undefined) cambios.jornada = String(payload.jornada || "");
      if (payload.asignaturas !== undefined) cambios.asignaturas = String(payload.asignaturas || "");
      if (payload.secciones !== undefined) cambios.secciones = String(payload.secciones || "");
      if (payload.alumnos_por_seccion !== undefined) cambios.alumnos_por_seccion = String(payload.alumnos_por_seccion || "");
      if (payload.duracion_min !== undefined) cambios.duracion_min = Number(payload.duracion_min) || 0;
      try {
        await db.entities.DocenteApp.update(id, cambios);
      } catch (e: any) {
        return new Response(JSON.stringify({ success: false, error: "No se pudo actualizar: " + String(e?.message ?? e) }), { status: 500, headers: JSON_HEADERS });
      }
      return new Response(JSON.stringify({ success: true, actualizado: cambios }), { status: 200, headers: JSON_HEADERS });
    }

    /* ---------- ESTADO: guardar snapshot completo del docente ---------- */
    if (accion === "guardar-estado") {
      const codigo = String(payload.codigo || "").trim().toUpperCase();
      const estado = typeof payload.estado === "string" ? payload.estado : JSON.stringify(payload.estado ?? null);
      if (!codigo || !estado) {
        return new Response(JSON.stringify({ success: false, error: "Faltan codigo o estado" }), { status: 400, headers: JSON_HEADERS });
      }
      if (estado.length > 1_500_000) {
        return new Response(JSON.stringify({ success: false, error: "Estado demasiado grande" }), { status: 413, headers: JSON_HEADERS });
      }
      const docentes = await listar(db, "DocenteApp");
      const d = docentes.find((x: any) => String(x.data?.codigo ?? x.codigo ?? "").toUpperCase() === codigo);
      if (!d) {
        return new Response(JSON.stringify({ success: false, error: "Docente no encontrado" }), { status: 404, headers: JSON_HEADERS });
      }
      try {
        await db.entities.DocenteApp.update(d.id, { estado_json: estado });
      } catch (e: any) {
        return new Response(JSON.stringify({ success: false, error: "No se pudo guardar: " + String(e?.message ?? e) }), { status: 500, headers: JSON_HEADERS });
      }
      return new Response(JSON.stringify({ success: true, guardado: new Date().toISOString() }), { status: 200, headers: JSON_HEADERS });
    }

    /* ---------- ESTADO: cargar snapshot completo del docente ---------- */
    if (accion === "cargar-estado") {
      const codigo = String(payload.codigo || "").trim().toUpperCase();
      const id = String(payload.id || "").trim();
      const docentes = await listar(db, "DocenteApp");
      const d = docentes.find((x: any) =>
        (codigo && String(x.data?.codigo ?? x.codigo ?? "").toUpperCase() === codigo) ||
        (id && String(x.id) === id)
      );
      if (!d) {
        return new Response(JSON.stringify({ success: false, error: "Docente no encontrado" }), { status: 404, headers: JSON_HEADERS });
      }
      const p = { ...(d.data ?? d), id: d.id };
      let estado: any = null;
      if (p.estado_json) {
        try { estado = JSON.parse(p.estado_json); } catch (_e) { estado = null; }
      }
      return new Response(JSON.stringify({ success: true, id: d.id, codigo: p.codigo, estado }), { status: 200, headers: JSON_HEADERS });
    }

    /* ---------- SUGERENCIAS: colegios y distritos registrados ---------- */
    if (accion === "sugerencias") {
      const docentes = await listar(db, "DocenteApp");
      const colegios = new Set<string>();
      const distritos = new Set<string>();
      docentes.forEach((x: any) => {
        const d = x.data ?? x;
        const c = String(d.colegio ?? "").trim();
        const di = String(d.distrito ?? "").trim();
        if (c) colegios.add(c);
        if (di) distritos.add(di);
      });
      return new Response(JSON.stringify({
        success: true,
        colegios: Array.from(colegios).slice(0, 80),
        distritos: Array.from(distritos).slice(0, 80),
      }), { status: 200, headers: JSON_HEADERS });
    }

    /* ---------- PULL-EVALS: servir cotejos guardados en backend ---------- */
    if (accion === "pull-evals") {
      const codigo = String(payload.codigo || "").trim().toUpperCase();
      if (!codigo) {
        return new Response(JSON.stringify({ success: false, error: "Falta codigo" }), { status: 400, headers: JSON_HEADERS });
      }
      const docentes = await listar(db, "DocenteApp");
      const d = docentes.find((x: any) => String(x.data?.codigo ?? x.codigo ?? "").toUpperCase() === codigo);
      if (!d) {
        return new Response(JSON.stringify({ success: false, error: "Docente no encontrado" }), { status: 404, headers: JSON_HEADERS });
      }
      const p = { ...(d.data ?? d) };
      let evalsEvid: any = {};
      let evalsCom: any = {};
      if (p.estado_json) {
        try {
          const est = JSON.parse(p.estado_json);
          evalsEvid = (est && typeof est === "object" && est.evalsEvid) ? est.evalsEvid : {};
          evalsCom = (est && typeof est === "object" && est.evalsCom) ? est.evalsCom : {};
        } catch (_e) { /* estado corrupto: devolver vacío */ }
      }
      return new Response(JSON.stringify({ success: true, evalsEvid, evalsCom }), { status: 200, headers: JSON_HEADERS });
    }

    return new Response(JSON.stringify({ success: false, error: "Acción no soportada: " + accion }), { status: 400, headers: JSON_HEADERS });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e?.message ? e.message : String(e) }), { status: 500, headers: JSON_HEADERS });
  }
});
