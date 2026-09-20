// console.log("ебать я фулстак");
import express from 'express'
import cors from 'cors'
import { trpcRouter } from './router'
import { applyTrpcTpExpressApp } from './lib'

const expressApp = express()

expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

applyTrpcTpExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
  console.info('слушать http://localhost:3000')
})
