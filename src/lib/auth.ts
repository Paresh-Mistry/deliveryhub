import { SignJWT, jwtVerify } from "jose";

// Initializing Secret key
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");

// Generate JWT token
export async function generateToken(payload: object) {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()

    // Expires in 2 hours
    .setExpirationTime("2h")
    .sign(secret);
}

// Verify JWT token & returning payload
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (e) {
    console.error("Token verification failed:", e);
    return null;
  }
}
