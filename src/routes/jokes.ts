import { Router } from 'express'
import JokesController from '../controllers/jokes'

const JokesRouter: Router = Router()

JokesRouter.get('/', JokesController.GetAll)
JokesRouter.post('/', JokesController.Create)
JokesRouter.get('/random', JokesController.GetRandom)
JokesRouter.get('/:jokeid', JokesController.GetOne)
JokesRouter.delete('/:jokeid', JokesController.Delete)

/**
JokesRouter.put('/:jokeid', JokesController.Update)
JokesRouter.put('/:jokeid/upvote', JokesController.UpVote)      # UpVote no conteúdo
JokesRouter.put('/:jokeid/downvote', JokesController.DownVote)  # DownVote no conteúdo
JokesRouter.put('/:jokeid/approve', JokesController.Approve)    # Aprovar o conteúdo
JokesRouter.put('/:jokeid/reject', JokesController.Disable)     # Reprovar o conteúdo
JokesRouter.put('/:jokeid/review', JokesController.Review)      # Enviar para análise
*/

export default JokesRouter