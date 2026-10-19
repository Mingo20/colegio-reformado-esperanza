import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// v8: carga ADITIVA por título — elimina solo los registros huérfanos y crea solo los faltantes.
// La biblioteca completa está en planapp_records_v8.json (GitHub Pages).
const JSON_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};
const dormir = (ms: number) => new Promise(r => setTimeout(r, ms));

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: JSON_HEADERS });
  try {
    const base44 = createClientFromRequest(req) as any;
    const db = base44.asServiceRole ?? base44;
    const url = "https://raw.githubusercontent.com/Mingo20/colegio-reformado-esperanza/main/planapp_records_v8.json";
    const resp = await fetch(url, { cache: "no-store" });
    if (!resp.ok) return new Response(JSON.stringify({ success: false, error: "No se pudo descargar planapp_records_v8.json (" + resp.status + ")" }), { status: 502, headers: JSON_HEADERS });
    const registros: any[] = await resp.json();

    let planesRes: any = await db.entities.PlanApp.list({});
    let actuales: any[] = [];
    if (Array.isArray(planesRes)) actuales = planesRes;
    else if (planesRes && Array.isArray(planesRes.data)) actuales = planesRes.data;
    else if (planesRes && Array.isArray(planesRes.items)) actuales = planesRes.items;
    else if (planesRes && Array.isArray(planesRes.records)) actuales = planesRes.records;

    const nuevos = new Set<string>(registros.map(r => String(r.titulo)));
    const existentes = new Set<string>(actuales.map(p => String(p.titulo ?? p.data?.titulo ?? "")));

    // 1) eliminar solo huérfanos (títulos que ya no están en v8)
    let eliminados = 0, erroresDel = 0;
    const muestraErrores: string[] = [];
    for (const p of actuales) {
      const titulo = String(p.titulo ?? p.data?.titulo ?? "");
      if (nuevos.has(titulo)) continue;
      const pid = p?.id ?? p?.data?.id ?? null;
      if (!pid) { erroresDel++; continue; }
      let ok = false;
      for (let intento = 0; intento < 3 && !ok; intento++) {
        try { await db.entities.PlanApp.delete(pid); ok = true; }
        catch (e: any) {
          if (muestraErrores.length < 3) muestraErrores.push(String(e?.message ?? e).slice(0, 200));
          await dormir(400 + intento * 600);
        }
      }
      if (ok) eliminados++; else erroresDel++;
      await dormir(60);
    }

    // 2) crear solo los faltantes
    let creados = 0, omitidos = 0, erroresCre = 0;
    const muestraCre: string[] = [];
    for (const reg of registros) {
      if (existentes.has(String(reg.titulo))) { omitidos++; continue; }
      try {
        await db.entities.PlanApp.create({
          titulo: String(reg.titulo),
          mes: String(reg.mes || ""),
          tema: String(reg.tema || ""),
          nivel: String(reg.nivel || "Inicial"),
          grado: String(reg.grado || ""),
          descripcion: String(reg.descripcion || ""),
          competencias_json: String(reg.competencias_json || "[]"),
          areas_json: String(reg.areas_json || "[]"),
          ciclo_json: String(reg.ciclo_json || "{}"),
          situacion_json: String(reg.situacion_json || "{}"),
          anticipacion_json: String(reg.anticipacion_json || "{}"),
          dominios_json: String(reg.dominios_json || "[]"),
          experiencias_json: String(reg.experiencias_json || "[]"),
          contenidos_json: String(reg.contenidos_json || "{}"),
          evaluacion_json: String(reg.evaluacion_json || "{}"),
          semanas_json: String(reg.semanas_json || "[]"),
          anio_escolar: String(reg.anio_escolar || "2026-2027"),
          docente_id: "",
          activo: true,
        });
        creados++;
        await dormir(60);
      } catch (e: any) {
        erroresCre++;
        if (muestraCre.length < 6) muestraCre.push(String(reg.titulo).slice(0,60) + " => " + String(e?.message ?? e).slice(0, 300));
      }
    }
    return new Response(JSON.stringify({ success: true, encontrados: actuales.length, eliminados, erroresDel, muestraErrores, creados, omitidos, erroresCre, muestraCre, total: registros.length }), { status: 200, headers: JSON_HEADERS });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: String(e?.message ?? e) }), { status: 500, headers: JSON_HEADERS });
  }
});
