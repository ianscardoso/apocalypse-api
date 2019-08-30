import * as mongoose from 'mongoose'
import { Controller } from '../controllers/controller';

export abstract class ControllerModel<T extends mongoose.Document> extends Controller {
    baseUri: string

    constructor(protected model: mongoose.Model<T>) {
        super()
        this.baseUri = `/${model.collection.name}`
    }

    getAll = (req, res, next) => {
        this.model.find()
            .then(documents => {
                res.json(documents)

                return next()
            })
    }

    getById = (req, res, next) => {
        this.model.findById(req.params.id)
            .then(document => {
                res.json(document)

                return next()
            })
    }

    insert = (req, res, next) => {
        let documentsAdded: any[] = []

        if (req.body && req.body.length) {
            for (let body of req.body) {
                let document = new this.model(body)
                document.save()
                    .catch(next)

                documentsAdded.push(document)
            }

            res.json(documentsAdded) //TODO -  fix response in case of error
        }
        else {
            res.json(400)
        }

        return next()
    }

    replace = (req, res, next) => {
        const options = {
            overwrite: true
        }

        this.model.update({ _id: req.params.id }, req.body, options).exec()
            .then(result => {
                if (result.n)
                    this.model.findById(req.params.id).exec()
                        .then(document => {
                            res.json(document)

                            return next()
                        })
            })
    }

    delete = (req, res, next) => {
        this.model.remove({ _id: req.params.id }).exec()
            .then(result => {
                if (result.deletedCount)
                    res.json(204)

                return next()
            })
    }
}