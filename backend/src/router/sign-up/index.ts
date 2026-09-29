import { trpc } from '../../lib'
import { getPasswordHash } from '../../utils/get-password-hash'
import { signJWT } from '../../utils/sign-jwt'
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

  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  })

  const token = signJWT(user.id)

  return { token }
})
