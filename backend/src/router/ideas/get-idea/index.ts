import _ from 'lodash'
import z from 'zod'
import { trpc } from '../../../lib'

export const getIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      ideaNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const rawIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.ideaNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        ideaLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id ? ctx.me.id : '',
          },
        },
        _count: {
          select: {
            ideaLikes: true,
          },
        },
      },
    })

    const isLikedByMe = !!rawIdea?.ideaLikes.length
    const likesCount = rawIdea?._count.ideaLikes || 0
    const idea = rawIdea && { ..._.omit(rawIdea, ['ideaLikes', '_count']), isLikedByMe, likesCount }

    return { idea }
  })
