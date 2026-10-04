import { type inferRouterOutputs, type inferRouterInputs } from '@trpc/server'
import { trpc } from '../lib'
import { createIdeaTrpcRoute } from './create-idea'
import { getIdeaTrpcRoute } from './get-idea'
import { getIdeasTrpcRoute } from './get-ideas'
import { getMeTrpcRoute } from './get-me'
import { signInTrpcRoute } from './sign-in'
import { signUpTrpcRoute } from './sign-up'
import { updateIdeaTrpcRoute } from './update-idea'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  updateIdeaTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
