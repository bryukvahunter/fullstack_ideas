import { trpc } from '../../lib'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }

  const existingIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (existingIdea) {
    throw Error('idea with this nick already exists')
  }

  await ctx.prisma.idea.create({
    data: { ...input, authorId: ctx.me.id },
  })

  return true
})
