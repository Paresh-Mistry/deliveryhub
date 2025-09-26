import { NextResponse } from "next/server";
import clientPromise, { dbName } from "@component/lib/db";
import { verifyToken } from "@component/lib/auth";

export async function GET(req: Request) {
  try {
    // ✅ Extract partner token from cookies
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("partnerToken="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    // ✅ Verify token
    const payload = await verifyToken(token);
    if (!payload?.partner) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    // ✅ Only fetch orders assigned to this partner
    const orders = await db
      .collection("orders")
      .find({ partner: payload.partner })
      .toArray();

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
