// import { connectToDb } from "@/lib/db";
// import { ObjectId } from "mongodb";

// export default async function handler(req, res) {
//   const db = await connectToDb();
//   const { id } = req.query;

//   if (req.method === "PUT") {
//     const { status, partner } = req.body;
//     const updatedOrder = await db.collection("orders").findOneAndUpdate(
//       { _id: new ObjectId(id) },
//       { $set: { status, partner, updatedAt: new Date() } },
//       { returnDocument: "after" }
//     );
//     return res.status(200).json(updatedOrder.value);
//   }

//   if (req.method === "DELETE") {
//     await db.collection("orders").deleteOne({ _id: new ObjectId(id) });
//     return res.status(204).end();
//   }
// }
