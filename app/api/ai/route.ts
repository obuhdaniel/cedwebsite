import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const severity = /fire|injur|collapse|spill|explosion/i.test(body.message ?? "") ? "critical" : "high";
  return NextResponse.json({ severity, summary: `Operations triage: ${body.message || "Site assistance requested"}`, route: severity === "critical" ? "Emergency response unit" : "Site operations desk", eta: severity === "critical" ? 12 : 24, simulated: !process.env.AI_PROVIDER_URL });
}
