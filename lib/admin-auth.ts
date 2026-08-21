import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';

const JWT_SECRET_STRING = process.env.ADMIN_JWT_SECRET || 'resumeforge-default-secure-admin-jwt-secret-key-32-chars-min';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

export interface AdminSessionPayload {
  username: string;
  role: string;
  [key: string]: unknown;
}

/**
 * Creates a signed JWT session for an authenticated admin
 */
export async function createAdminSession(username: string, role = 'admin'): Promise<string> {
  return await new SignJWT({ username, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

/**
 * Verifies an admin JWT token
 */
export async function verifyAdminSession(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as AdminSessionPayload;
  } catch {
    return null;
  }
}
