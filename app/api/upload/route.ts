import { NextRequest } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "../../lib/prisma";
import { excelDateToJavascript } from "@/app/lib";

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

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);

    const data = rawRows.map((row) => {

      const enteredStr = row["Entered Date"];      // CSV header
      const effectiveStr = row["Effective Date"];  // adjust to your actual header
      return {
        account: String(row.account ?? ""),
        accountDescription: String(row.account_description ?? ""),
        enteredDate: enteredStr
          ? excelDateToJavascript(enteredStr)
          : null,
        effectiveDate: effectiveStr
          ? excelDateToJavascript(effectiveStr)
          : null,
        memo: String(row.memo ?? ""),
        source: String(row.source ?? ""),
        transaction: String(row.transaction ?? ""),
        debit: String(row.debit ?? ""),
        credit: String(row.credit ?? ""),
        // type is optional, since not in all sample GL files
        type: row.type ? String(row.type) : null,
      }
    });

    if (data.length === 0) {
      return new Response(
        JSON.stringify({ error: "No data rows found in sheet" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await prisma.transaction.createMany({
      data,
      skipDuplicates: false, // flip to true if you later add unique constraints
    });

    return new Response(
      JSON.stringify({
        insertedCount: result.count,
        records: data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Upload parse/DB error:", err);
    return new Response(
      JSON.stringify({ error: err?.message || "Failed to parse or save file" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}