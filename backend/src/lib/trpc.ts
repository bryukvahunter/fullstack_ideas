import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import type { Express } from 'express'
import type { TrpcRouter } from '../router'
import { type AppContex } from './ctx'

export const trpc = initTRPC.context<AppContex>().create()

export function applyTrpcTpExpressApp(expressApp: Express, appContext: AppContex, trpcRouter: TrpcRouter) {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )
}
