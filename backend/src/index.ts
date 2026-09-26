// console.log("ебать я фулстак");
import cors from 'cors'
import express from 'express'
import { applyTrpcTpExpressApp } from './lib'
import type { AppContex } from './lib/ctx'
import { createAppContext } from './lib/ctx'
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

    applyTrpcTpExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(3000, () => {
      console.info('слушать http://localhost:3000')
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
