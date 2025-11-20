import { NextRequest } from "next/server";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Let xlsx auto-detect csv/xlsx
    const workbook = XLSX.read(buffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON rows
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    return new Response(JSON.stringify({ rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Upload parse error:", err);
    return new Response(
      JSON.stringify({ error: err?.message || "Failed to parse file" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}