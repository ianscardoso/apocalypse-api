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
            .catch(next)
    }

    getById = (req, res, next) => {
        this.model.findById(req.params.id)
            .then(document => {
                if (document)
                    res.json(document)
                else
                    res.send(404)

                return next()
            })
            .catch(next)
    }

    insert = (req, res, next) => {
        let document = new this.model(req.body)
        document.save()
            .then(doc => {
                res.json(doc)

                return next()
            })
            .catch(next)
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

                        })

                return next()
            })
            .catch(next)
    }

    delete = (req, res, next) => {
        this.model.remove({ _id: req.params.id }).exec()
            .then(result => {
                if (result.deletedCount)
                    res.send(204)
                else
                    res.send(404)

                return next()
            })
            .catch(next)
    }
}