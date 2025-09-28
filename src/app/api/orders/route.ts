import { NextResponse } from "next/server";
import clientPromise, { dbName } from "@component/lib/db";


// Getting all Order for Admin Visibility
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const orders = await db.collection("orders").find({}).toArray();

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error", database: dbName },
      { status: 500 }
    );
  }
}


// Create Order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(dbName);

    const newOrder = {
      customerName: body.customerName,
      address: body.address,
      partner: body.partner,
      statusHistory: [{ status: "pending", updatedAt: new Date() }],
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(newOrder);

    return NextResponse.json({ success: true, orderId: result.insertedId });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}















