import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  "https://n8n.srv889952.hstgr.cloud/webhook/make_reservation";

export async function POST(req: NextRequest) {
  const { guestName, groupSize, bookingTime } = await req.json();

  if (!guestName || !groupSize || !bookingTime) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": process.env.RESERVATION_WEBHOOK_SECRET!,
      },
      body: JSON.stringify({
        guest_name: guestName,
        group_size: groupSize,
        booking_time: bookingTime,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error(`Webhook error ${response.status}:`, text);
      return NextResponse.json(
        { error: "Failed to submit reservation" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook fetch failed:", err);
    return NextResponse.json(
      { error: "Could not reach reservation service" },
      { status: 503 }
    );
  }
}
