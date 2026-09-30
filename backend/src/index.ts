// console.log("ебать я фулстак");
import { env } from './lib/env'
import cors from 'cors'
import express from 'express'
import { applyTrpcToExpressApp } from './lib'
import type { AppContex } from './lib/ctx'
import { createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'
import { trpcRouter } from './router'

void (async () => {
  let ctx: AppContex | null = null

  try {
    ctx = createAppContext()

    const expressApp = express()

    expressApp.use(cors())

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })

    applyPassportToExpressApp(expressApp, ctx)

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(env.PORT, () => {
      console.info(`слушать http://localhost:${env.PORT}`)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
