// lib/db.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB! || "deliveryhub";

if (!uri) throw new Error("❌ Please define MONGODB_URI in .env.local");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  clientPromise = client.connect();
}

/**
 * Debug function: lists all collections in development
 */
async function debugConnection() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    console.log(`✅ Connected to MongoDB: ${dbName}`);
    console.log("📂 Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

if (process.env.NODE_ENV === "development") {
  debugConnection();
}

export { dbName };
export default clientPromise;
