import { env } from '../lib/env'
import jwt from 'jsonwebtoken'

export function signJWT(userId: string): string {
  return jwt.sign(userId, env.JWT_SECRET)
}
