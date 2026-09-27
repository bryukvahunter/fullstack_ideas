import { trpc } from '../lib'
import { createIdeaTrpcRoute } from './create-idea'
import { getIdeaTrpcRoute } from './get-idea'
import { getIdeasTrpcRoute } from './get-ideas'
import { signUpTrpcRoute } from './sign-up'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
