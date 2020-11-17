import 'dotenv/config'
import './config/mongodb'
import serverless from 'serverless-http'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import Routes from './routes'

const app: express.Application = express()

app.use(morgan('combined'))
app.use(bodyParser.json())

Routes(app)

// const NODE_PORT: Number = Number(process.env.NODE_PORT || 3000)
//
// app.listen(NODE_PORT, function () {
//     console.log("[INFO] HTTP Server created on port", NODE_PORT);
// })

export const handler: serverless.Handler = serverless(app)