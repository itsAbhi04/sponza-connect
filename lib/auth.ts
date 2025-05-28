import jwt from "jsonwebtoken"

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    return decoded
  } catch (error) {
    return null
  }
}

export function generateToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET || "fallback-secret", { expiresIn: "7d" })
}
