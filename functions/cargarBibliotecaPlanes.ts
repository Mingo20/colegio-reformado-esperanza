import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const JSON_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

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
    return new Response(null, { status: 204, headers: JSON_HEADERS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Solo se acepta POST" }), { status: 405, headers: JSON_HEADERS });
  }
  const base44 = createClientFromRequest(req) as any;
  const db = base44.asServiceRole ?? base44;
  try {
    const url = "https://raw.githubusercontent.com/Mingo20/colegio-reformado-esperanza/main/planapp_records_v5.json";
    // v5: reconstruir la biblioteca completa: Inicial (anual + Ago/Sep/Oct por grado),
    //     Primaria 3ro (anual + Octubre por asignatura básica) y Secundaria 1ro Matemática

    const r = await fetch(url);
    if (!r.ok) {
      return new Response(JSON.stringify({ success: false, error: "No se pudo descargar la biblioteca (" + r.status + ")" }), { status: 502, headers: JSON_HEADERS });
    }
    const registros: any[] = await r.json();
    const existentes = await listar(db, "PlanApp");
    let eliminados = 0;
    for (const rec of existentes) {
      const x: any = rec.data ?? rec;
      if (!String(x.docente_id ?? "")) {
        try { await db.entities.PlanApp.delete(x.id); eliminados++; } catch (_e) {}
      }
    }
    let creados = 0;
    const titulosExistentes = new Set<string>();
    for (const reg of registros) {
      if (!reg || !reg.titulo || titulosExistentes.has(String(reg.titulo))) continue;
      const creado = await db.entities.PlanApp.create({
        titulo: String(reg.titulo),
        mes: String(reg.mes || ""),
        tema: String(reg.tema || ""),
        nivel: String(reg.nivel || "Inicial"),
        grado: String(reg.grado || ""),
        descripcion: String(reg.descripcion || ""),
        competencias_json: String(reg.competencias_json || "[]"),
        areas_json: String(reg.areas_json || "[]"),
        ciclo_json: String(reg.ciclo_json || "{}"),
        semanas_json: String(reg.semanas_json || "[]"),
        anio_escolar: String(reg.anio_escolar || "2026-2027"),
        docente_id: "",
        activo: true,
      });
      const id = creado?.id ?? creado?.data?.id ?? null;
      if (id) { creados++; titulosExistentes.add(String(reg.titulo)); }
    }
    return new Response(JSON.stringify({ success: true, creados, eliminados, omitidos: registros.length - creados, total: registros.length }), { status: 200, headers: JSON_HEADERS });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: String(e?.message ?? e) }), { status: 500, headers: JSON_HEADERS });
  }
});