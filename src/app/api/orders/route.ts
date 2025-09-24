import { NextResponse } from "next/server";
import clientPromise, { dbName } from "@component/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(dbName);
    console.log(db)
    const collection = db.collection("orders");

    const newOrder = {
      customerName: body.customerName,
      address: body.address,
      partner: body.partner,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newOrder);
    return NextResponse.json({ success: true, orderId: result.insertedId });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("orders");

    const orders = await collection.find({}).toArray();
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
