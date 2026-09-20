import { trpc } from '../lib'
import { createIdeaTrpcRoute } from './create-idea'
import { getIdeaTrpcRoute } from './get-idea'
import { getIdeasTrpcRoute } from './get-ideas'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
