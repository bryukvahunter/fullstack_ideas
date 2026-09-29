import jwt from 'jsonwebtoken'

export function signJWT(userId: string): string {
  return jwt.sign(userId, 'not-really-secret-jwt-key')
}
