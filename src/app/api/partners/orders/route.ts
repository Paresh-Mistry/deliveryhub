import { NextResponse } from "next/server";
import clientPromise, { dbName } from "@component/lib/db";
import { verifyToken } from "@component/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // read cookie properly
    const cookieStore = cookies();
    const token = (await cookieStore).get("partnerToken")?.value;

    console.log("Received Token:", token)

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized: No token" }, { status: 401 });
    }

    // verify token
    const payload = await verifyToken(token);

    console.log("Token Payload: ", payload)


    const client = await clientPromise;
    const db = client.db(dbName);

    // fetch only assigned orders for this partner
    const orders = await db
      .collection("orders")
      .find({ partner: payload?.partner })
      .toArray();

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("Partner Orders Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
