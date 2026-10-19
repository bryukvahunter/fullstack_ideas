import { type inferRouterOutputs, type inferRouterInputs } from '@trpc/server'
import { trpc } from '../lib'
import { getMeTrpcRoute } from './auth/get-me'
import { signInTrpcRoute } from './auth/sign-in'
import { signUpTrpcRoute } from './auth/sign-up'
import { updateProfileTrpcRoute } from './auth/update-profile'
import { createIdeaTrpcRoute } from './ideas/create-idea'
import { getIdeaTrpcRoute } from './ideas/get-idea'
import { getIdeasTrpcRoute } from './ideas/get-ideas'
import { updateIdeaTrpcRoute } from './ideas/update-idea'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
