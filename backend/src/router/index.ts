import { trpc } from '../lib'
import { createIdeaTrpcRoute } from './create-idea'
import { getIdeaTrpcRoute } from './get-idea'
import { getIdeasTrpcRoute } from './get-ideas'
import { signInTrpcRoute } from './sign-in'
import { signUpTrpcRoute } from './sign-up'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
