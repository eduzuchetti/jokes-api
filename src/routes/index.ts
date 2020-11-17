import { Router, Application } from 'express'
import JokesRouter from './jokes'

// const IndexRouter: Router = Router()
// 
// IndexRouter.get('/', (req, res, next) => res.json({ version: '1.0' }))
// 
// export default function Routes(app: Application) {
//     app.use('/', IndexRouter)
//     app.use('/jokes', JokesRouter)
// }

export default function Routes(app: Application) {
    app.use('/', JokesRouter)
}