import z from 'zod'
import { ideas, trpc } from '../../lib'

export const createIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      name: z.string().min(3).max(15),
      nick: z
        .string()
        .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, number and dashes')
        .min(1)
        .max(30),
      description: z.string().min(3).max(50),
      text: z.string().min(0).max(100, 'The text must contain no more than 100 characters'),
    })
  )
  .mutation(({ input }) => {
    // const idea = ideas.find((idea) => idea.nick === input.ideaNick)

    ideas.unshift(input)

    return true
  })
