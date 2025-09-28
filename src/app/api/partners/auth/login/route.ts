import { NextResponse } from "next/server";
import clientPromise from "@component/lib/db";
import { generateToken } from "@component/lib/auth";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key");

export async function POST(req: Request) {

  try {
    const { partnerName } = await req.json();

    if (!partnerName) {
      return NextResponse.json(
        { success: false, message: "Partner name required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("deliveryhub");
    const collection = db.collection("partners");

    // Fix: match with "PartnerName" field from DB
    const partner = await collection.findOne({ PartnerName: partnerName });

    if (!partner) {
      return NextResponse.json(
        { success: false, message: "Partner not found" },
        { status: 404 }
      );
    }

    const token = await generateToken({ partner: partner.PartnerName });

    console.log("token : ", token)

    const response = NextResponse.json({
      success: true,
      partner: partner,
      token: token
    });

    response.cookies.set("partnerToken", token, {
      httpOnly: true,
      // only secure in production
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax", 

      // Expiring in 1 day 
      maxAge: 60 * 60 * 24, 
      path: "/",
    });

    console.log("Set-Cookie Header:", response.headers.get("Set-Cookie"));

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

