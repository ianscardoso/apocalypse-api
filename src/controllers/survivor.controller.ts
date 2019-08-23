import * as restify from 'restify'
import { Controller } from './controller';
import { Survivor } from '../models/survivor.model';

class SurvivorController extends Controller {

    setRoutes(application: restify.Server) {
        application.get('/survivors', (req, res, next) => {
            Survivor.find().then(survivors => {
                res.json(survivors)

                return next
            })
        })

        application.post('/survivors', (req, res, next) => {
            let survivor = new Survivor(req.body)

            survivor.save().then(survivor => {
                res.json(survivor)

                return next
            })
        })
    }

}

export const survivorController = new SurvivorController()