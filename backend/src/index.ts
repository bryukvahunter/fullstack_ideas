// console.log("ебать я фулстак");
import cors from 'cors'
import express from 'express'
import { applyTrpcTpExpressApp } from './lib'
import { trpcRouter } from './router'

const expressApp = express()

expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

applyTrpcTpExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
  console.info('слушать http://localhost:3000')
})
