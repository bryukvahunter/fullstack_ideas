import crypto from 'crypto'
import { trpc } from '../../lib'
import { zSignUpTrpcInput } from './input'

export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const existingUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (existingUser) {
    throw new Error('A user with this nick alrady exists')
  }

  await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: crypto.createHash('sha256').update(input.password).digest('hex'),
    },
  })
  return true
})
