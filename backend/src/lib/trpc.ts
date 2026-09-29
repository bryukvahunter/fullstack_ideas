import { type inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import type { Express } from 'express'
import superjson from 'superjson'
import { expressHandler } from 'trpc-playground/handlers/express'
import type { TrpcRouter } from '../router'
import { type ExpressRequest } from '../utils/types'
import { type AppContex } from './ctx'

const getCreateTrpcContex =
  (appContext: AppContex) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as ExpressRequest).user || null,
  })

type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContex>>

export const trpc = initTRPC.context<TrpcContext>().create({ transformer: superjson })

export async function applyTrpcTpExpressApp(expressApp: Express, appContext: AppContex, trpcRouter: TrpcRouter) {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContex(appContext),
    })
  )

  expressApp.use(
    '/trpc-playground',
    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc-playground',
      router: trpcRouter,
      request: {
        superjson: true,
      },
    })
  )
}
