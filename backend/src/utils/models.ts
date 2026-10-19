import { type User } from '@prisma/client'
import _ from 'lodash'

export function toClientMe(user: User | null) {
  return user && _.pick(user, ['id', 'nick', 'name'])
}
