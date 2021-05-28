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

app.listen(3000, 'localhost')
export const handler: serverless.Handler = serverless(app)