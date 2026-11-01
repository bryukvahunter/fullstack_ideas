import _ from 'lodash'
import { trpc } from '../../../lib'
import { zGetIdeasTrpcRoute } from './input'

export const getIdeasTrpcRoute = trpc.procedure.input(zGetIdeasTrpcRoute).query(async ({ ctx, input }) => {
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '_') : undefined

  const rawIdeas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createdAt: true,
      serialNumber: true,
      _count: {
        select: {
          ideaLikes: true,
        },
      },
    },

    where: !input.search
      ? undefined
      : {
          OR: [
            {
              name: {
                search: normalizedSearch,
              },
            },
            {
              description: {
                search: normalizedSearch,
              },
            },
            {
              text: {
                search: normalizedSearch,
              },
            },
          ],
        },

    orderBy: [{ createdAt: 'desc' }, { serialNumber: 'desc' }],
    ...(input.cursor !== undefined && { cursor: { serialNumber: input.cursor } }),
    take: input.limit + 1,
  })

  const nextIdea = rawIdeas.at(input.limit)
  const nextCursor = nextIdea?.serialNumber
  const rawIdeasExceptNext = rawIdeas.slice(0, input.limit)
  const ideasExceptNext = rawIdeasExceptNext.map((idea) => ({
    ..._.omit(idea, ['_count']),
    likesCount: idea._count.ideaLikes,
  }))

  return { ideas: ideasExceptNext, nextCursor }
})
