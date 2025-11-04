import { executeScript } from "@/lib/sql-script-manager";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dropTablesScript = fs.readFileSync(path.join(process.cwd(), 'scripts', 'reinitialize_database.sql'), 'utf8');
    const initialSchemaScript = fs.readFileSync(path.join(process.cwd(), 'scripts', '001_initial_schema.sql'), 'utf8');
    const seedDataScript = fs.readFileSync(path.join(process.cwd(), 'scripts', '002_seed_data.sql'), 'utf8');

    // Remove \i commands as they are not supported by executeScript
    const combinedScript = `
      ${dropTablesScript.replace(/\\i\s+\S+\.sql/g, '')}
      ${initialSchemaScript}
      ${seedDataScript}
    `;

    await executeScript(combinedScript);

    return NextResponse.json({ message: "Database reinitialized successfully!" });
  } catch (error: any) {
    console.error("Error reinitializing database:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}