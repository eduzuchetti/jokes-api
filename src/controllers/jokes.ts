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
    error: Error | null,
    data: Document | Document[] | null) => {
    if (!(error) && !(data)) {
        console.error('JokesController.defaultResponse: Any "error"' +
            ' or "data" was passed to generate default response')
    } else if (error) {
        return {
            error: error.message,
            data: []
        }
    } else {
        return {
            error: null,
            data: data
        }
    }
}

const defaultFind = {
    approved: true
}

const defaultFields = {
    mainTheme: 1,
    author: 1,
    joke: 1,
    answer: 1
}

const GetAll = (req: Request, res: Response, next: NextFunction) => {
    // Limit response size to 1000
    let limit = 10

    if (typeof req.params.limit !== undefined) {
        limit = parseInt(req.params.limit) === NaN ? 10 : parseInt(req.params.limit)
        limit = limit > 1000 ? 1000 : limit
    }

    JokesModel.find(defaultFind, defaultFields).limit(limit)
        .then(result => res.status(200).json(defaultResponse(null, result)) )
        .catch(err => res.status(500).json(defaultResponse(err, null)) )
}

const GetRandom = (req: Request, res: Response, next: NextFunction) => {
    JokesModel.countDocuments().exec(function (err, count) {
        var random: number = Math.floor(Math.random() * count)

        JokesModel.findOne(defaultFind, defaultFields).skip(random).then(result => {
            if (result) {
                return res.status(200).json(defaultResponse(null, result))
            } else {
                return res.status(404).json(defaultResponse(
                    Error('Can\'t find random Joke: Null response from DB'), null
                ))
            }
        }).catch(err => {
            return res.status(500).json(defaultResponse(err, null))
        })
    })
}

const GetOne = (req: Request, res: Response, next: NextFunction) => {
    let jokeid: String = req.params.jokeid

    if (!jokeid) {
        return res.status(400).json(defaultResponse(Error('Must pass an Id'), null))
    }

    JokesModel.findOne({ _id: jokeid, defaultFind }, defaultFields).then(result => {
        if (result) return res.status(200).json(defaultResponse(null, result))
        else return res.status(404).json(defaultResponse(Error(`Joke not found with id ${jokeid}`), null))
    }).catch(err => {
        return res.status(500).json(defaultResponse(err, null))
    })
}

const Create = (req: Request, res: Response, next: NextFunction) => {
    let body = req.body

    if (!body) {
        return res.status(400).json(defaultResponse(
            Error('JokesController.Create: Body can\'t be null. Passed: ' + body), null
        ))
    }

    let newJoke = new JokesModel({
        joke: body.joke,
        answer: body.answer,
        mainTheme: body.themes,
        language: body.lang || 'pt-br',
        author: []
    })

    newJoke.save()
        .then(() => res.status(201).send())
        .catch(err => res.status(500).json(defaultResponse(
            Error('JokesController.Create: Fail to save the new Joke:' + err), null
        ))
    )
}

const Delete = (req: Request, res: Response, next: NextFunction) => {
    let jokeid: String = req.params.jokeid

    if (!jokeid) return res.status(400).json(defaultResponse(Error('Must pass an Id'), null))
    
    JokesModel.findByIdAndDelete({ _id: jokeid }).then(result => {
        if (result) return res.status(200).json(defaultResponse(null, result))
        else return res.status(404).json(defaultResponse(Error(`Joke not found with Id ${jokeid}`), null))
    }).catch(err => {
        return res.status(500).json(defaultResponse(err, null))
    })
}

export default {
    GetAll,
    GetRandom,
    GetOne,
    Create,
    Delete
}