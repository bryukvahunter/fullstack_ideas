import { trpc } from '../../../lib'
import { toClientMe } from '../../../utils/models'
import { zUpdateProfileTrpcInput } from './input'

export const updateProfileTrpcRoute = trpc.procedure.input(zUpdateProfileTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }

  if (ctx.me.nick !== input.nick) {
    const existingUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    })

    if (existingUser) {
      throw new Error('User with this nick already exists')
    }
  }

  const updateMe = await ctx.prisma.user.update({
    where: {
      id: ctx.me.id,
    },
    data: input,
  })

  ctx.me = updateMe

  return toClientMe(updateMe)
})
