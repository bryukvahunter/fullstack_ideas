import z from 'zod'

export const zSetIdeaLikeTrpcRoute = z.object({
  ideaId: z.string().min(1),
  isLikedByMe: z.boolean(),
})
