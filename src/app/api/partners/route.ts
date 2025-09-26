import { NextResponse } from "next/server";
import clientPromise, { dbName } from "@component/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const partners = await db.collection("partners").find({}).toArray();

    return NextResponse.json(partners);
  } catch (error: any) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error", database: dbName },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(dbName);

    const newPartner = {
      PartnerName: body.partnerName,
      emailId: body.emailId,
      contactNo: body.contactNo,
      role: body.role,
      vehicleType: body.vehicleType || "Two Wheeler",
      createdAt: new Date(),
    };

    const result = await db.collection("partners").insertOne(newPartner);

    return NextResponse.json({ success: true, partnerId: result.insertedId });
  } catch (error: any) {
    console.error("Error Adding Partner:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }   
    );
  }
}
