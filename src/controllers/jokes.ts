import { Request, Response, NextFunction } from 'express'
import { Document } from 'mongoose'
import JokesModel from '../models/jokes'

export interface Joke {
    joke: String,
    answer: String,
    approved: Boolean,
    mainTheme: [String],
    author: String
}

const defaultResponse = (
    http_code: number,
    error: Error | null,
    data: Document | Document[] | null) => {
        if (!(error) && !(data)) {
            console.error('[ERROR] JokesController.defaultResponse: No ' +
                '"Error" ou "Data" was passed to default response')
        } else if (error) {
            return {
                status: http_code,
                error: error.message,
                data: []
            }
        } else {
            return {
                status: http_code,
                error: null,
                data: data
            }
        }
}

const GetAll = (req: Request, res: Response, next: NextFunction) => {
    console.debug('[DEBUG] JokesController.GetAll: function started.')
    
    JokesModel.find({}).limit(10).then(result => {
        console.debug('[DEBUG] JokesController.GetAll: Query find() success. Data:', result)
        
        return res.status(200).json(defaultResponse(200, null, result))
        
    }).catch(err => {
        console.error('[DEBUG] JokesController.GetAll: Query find() failed with error')
        return res.status(500).json(defaultResponse(500, err, null))
    })
}

const GetRandom = (req: Request, res: Response, next: NextFunction) => {     
    JokesModel.countDocuments().exec(function (err, count) {
        var random: number = Math.floor(Math.random() * count)

        JokesModel.findOne().skip(random).then(result => {
            if (result) {
                console.log('[DEBUG] JokesController.GetRandom: Found random Joke:', result)
                return res.status(200).json(defaultResponse(200, null, result))
            } else {
                let err = Error('Can\'t find random Joke: Null response from DB')
                console.error('[ERROR] JokesController.GetOne:', err.message)
                return res.status(404).json(defaultResponse(404, err, null))
            }
        }).catch(err => {
            console.error('[ERROR] JokesController.GetRandom: Failed to execute query findOne().skip(random):', err)
            return res.status(500).json(defaultResponse(500, err, null))
        })
    })
}

const GetOne = (req: Request, res: Response, next: NextFunction) => {
    let jokeid: String = req.params.jokeid

    if (!jokeid) {
        console.log('[INFO] JokesController.GetOne: Any id was passed:', jokeid)
        return res.status(400).json(defaultResponse(404, Error('Must pass an Id'), null))
    }

    JokesModel.findOne({ _id: jokeid }).then(result => {
        if (result) {
            console.log('[INFO] JokesController.GetOne: Found joke with Id', jokeid, ': ', result)
            return res.status(200).json(defaultResponse(200, null, result))
        } else {
            console.error('[ERROR] JokesController.GetOne: Joke not found with id' + jokeid)
            return res.status(404).json(defaultResponse(404, Error(`Joke not found with id ${jokeid}`), null))
        }
    }).catch(err => {
        console.error('[ERROR] JokesController.GetOne: Failed to execute query FindOne() with JokeID', jokeid)
        return res.status(500).json(defaultResponse(500, err, null))
    })
}

const Create = (req: Request, res: Response, next: NextFunction) => {
    let body = req.body

    if (!body) {
        let err = Error('[INFO] JokesController.Create: Body can\'t be null. Passed: ' + body)
        console.log(err.message)
        return res.status(400).json(defaultResponse(400, err, null))
    }

    let newJoke = new JokesModel({
        joke: body.joke,
        answer: body.answer,
        mainTheme: body.themes,
        author: []
    })    

    newJoke.save().then(result => {
        console.log('[INFO] JokesController.Create: Joke saved with success:', result)
        return res.status(201).send(result)
        
    }).catch(err => {
        let custom_err = Error('[ERROR] JokesController.Create: Fail to save the new Joke:' + err)
        console.error(custom_err.message)
        return res.status(500).json(defaultResponse(500, err, null))
    })
}

const Delete = (req: Request, res: Response, next: NextFunction) => {
    let jokeid: String = req.params.jokeid

    if (!jokeid) {
        console.log('[INFO] JokesController.Delete: Any id was passed:', jokeid)
        return res.status(400).json(defaultResponse(404, Error('Must pass an Id'), null))
    }

    JokesModel.findByIdAndDelete({ _id: jokeid }).then(result => {
        if (result) {
            console.log('[INFO] JokesController.Delete: Found and Deleted joke with Id', jokeid, ': ', result)
            return res.status(200).json(defaultResponse(200, null, result))
        } else {
            console.error('[ERROR] JokesController.Delete: Joke not found with id' + jokeid)
            return res.status(404).json(defaultResponse(404, Error(`Joke not found with id ${jokeid}`), null))
        }
    }).catch(err => {
        console.error('[ERROR] JokesController.Delete: Failed to execute query findByIdAndDelete() with JokeID', jokeid)
        return res.status(500).json(defaultResponse(500, err, null))
    })
}

const _ChangeStatus = (status: String, value: Boolean, jokeid: String) => {
    if (status && value && jokeid) {
        
    }
}

export default {
    GetAll,
    GetRandom,
    GetOne,
    Create,
    Delete
}