import * as restify from 'restify'
import { Controller } from './controller';
import { Survivor } from '../models/survivor.model';
import { ControllerModel } from '../common/controller.model';

class SurvivorController extends ControllerModel<Survivor> {
    constructor() {
        super(Survivor)
    }

    updateLocation = (req, res, next) => {
        Survivor.update({ _id: req.params.id }, req.body.location).exec()
            .then(result)
    }

    getInventory = (req, res, next) => {
        Survivor.findById(req.params.id, "+inventory")
            .then(survivor => {
                if (survivor)
                    res.json(survivor.inventory)
                else
                    res.send(404)

                return next()
            })
    }

    setRoutes(application: restify.Server) {
        application.get(`${this.baseUri}`, this.getAll)
        application.get(`${this.baseUri}/:id`, this.getById)
        application.post(`${this.baseUri}`, this.insert)
        application.put(`${this.baseUri}/:id`, this.replace)
        application.del(`${this.baseUri}/:id`, this.delete)

        application.get(`${this.baseUri}/:id/inventory`, this.getInventory)
        application.put(`${this.baseUri}/:id/location`, this.updateLocation)
    }

}

export const survivorController = new SurvivorController()