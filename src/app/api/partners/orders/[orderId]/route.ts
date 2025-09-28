import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { verifyToken } from "@component/lib/auth";
import clientPromise from "@component/lib/db";

// Partner can only update order assigned to them
export async function PUT(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params;
    const body = await req.json();

    // Check token
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("orders");

    // Ensure this order is assigned to the partner
    const order = await collection.findOne({ _id: new ObjectId(orderId), partner: payload?.partner });

    if (!order) {
      return NextResponse.json({ error: "Not allowed to update this order" }, { status: 403 });
    }

    // Update status only
    const updateDoc: any = {
      $push: { statusHistory: { status: body.status, updatedAt: new Date() } },
    };

    await collection.updateOne({ _id: new ObjectId(orderId) }, updateDoc);
    const updatedOrder = await collection.findOne({ _id: new ObjectId(orderId) });

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error("Error updating partner order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
