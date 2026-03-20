import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  "https://n8n.srv889952.hstgr.cloud/webhook/0d9fdfec-7ecc-4cb4-8c2e-fa6979d39ccf/chat";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": req.headers.get("Content-Type") ?? "application/json",
    },
    body,
  });

  const data = await response.text();

  return new NextResponse(data, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
    },
  });
}
