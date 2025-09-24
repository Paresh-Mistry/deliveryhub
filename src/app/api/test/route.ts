import clientPromise from "@component/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.listCollections().toArray();   
    
    console.log("Connect to DB/..........")

    return NextResponse.json({
      message: "DB connected successfully!",
      collections: collections.map(c => c.name)
    });

  } catch (error) {
    console.log("Not Connect to DB/..........")
    console.error(error);
    return NextResponse.json({ message: "DB connection failed", error: error }, { status: 500 });
  }
}
