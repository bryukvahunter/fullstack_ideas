import { ideas, trpc } from '../../lib'
import { zCreateIdeaTrpcInput } from './input'

export const someThing = '123'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  ideas.unshift(input)

  return true
})
