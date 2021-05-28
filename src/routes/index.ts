import { Application } from 'express'
import JokesRouter from './jokes'

export default function Routes(app: Application) {
    app.use('/', JokesRouter)
}