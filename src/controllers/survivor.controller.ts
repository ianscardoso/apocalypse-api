import * as restify from 'restify'
import { Controller } from './controller';
import { Survivor } from '../models/survivor.model';

class SurvivorController extends Controller {

    setRoutes(application: restify.Server) {
        application.get('/survivors', (req, res, next) => {
            Survivor.find()
                .then(survivors => {
                    res.json(survivors)

                    return next()
                })
        })

        application.get('/survivors/:id', (req, res, next) => {
            Survivor.findById(req.params.id)
                .then(survivor => {
                    res.json(survivor)

                    return next()
                })
        })

        application.post('/survivors', (req, res, next) => {
            let survivorsAdded: Survivor[] = []

            if (req.body.length) {
                for (let body of req.body) {
                    let survivor = new Survivor(body)
                    survivor.save()

                    survivorsAdded.push(survivor)
                }
                
                res.json(survivorsAdded)
            }

            return next()
        })

        application.put('/survivors/:id', (req, res, next) => {
            const options = {
                overwrite: true
            }

            Survivor.update({ _id: req.params.id }, req.body, options).exec()
                .then(result => {
                    if (result.n)
                        Survivor.findById(req.params.id).exec()
                            .then(survivor => {
                                res.json(survivor)

                                return next()
                            })
                })
        })

        application.del('/survivors/:id', (req, res, next) => {
            Survivor.remove({ _id: req.params.id }).exec()
                .then(result => {
                    if (result.deletedCount)
                        res.json(204)

                    return next()
                })
        })
    }

}

export const survivorController = new SurvivorController()