import { trpc } from '../../../lib'
import { toClientMe } from '../../../utils/models'

export const getMeTrpcRoute = trpc.procedure.query(({ ctx }) => {
  return { me: toClientMe(ctx.me) }
})
