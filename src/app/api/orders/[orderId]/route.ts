// app/api/orders/[orderId]/route.ts
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/db";
import { NextResponse } from "next/server";

// GEtting each order with parameter ID 
export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("orders");

    const order = await collection.findOne({ _id: new ObjectId(orderId) });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// UPDATE order 
export async function PUT(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params;
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("orders");

    const updateDoc :any = {
      $set: { partner: body.partner },
      $push: { statusHistory: { status: body.status, updatedAt: new Date() } },
    };

    const result = await collection.updateOne({ _id: new ObjectId(orderId) }, updateDoc);
    const updatedOrder = await collection.findOne({ _id: new ObjectId(orderId) });

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE order
export async function DELETE(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("orders");

    const result = await collection.deleteOne({ _id: new ObjectId(orderId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

