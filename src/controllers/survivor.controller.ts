import * as restify from 'restify'
import { Survivor } from '../models/survivor.model';
import { ControllerModel } from '../common/controller.model';

class SurvivorController extends ControllerModel<Survivor> {
    constructor() {
        super(Survivor)
    }

    reportInfection = (req, res, next) => {
        Survivor.findById(req.params.id)
            .then(survivor => {
                if (survivor) {
                    let infectionReports = ++survivor.infectionReports

                    Survivor.updateOne({ _id: req.params.id }, { infectionReports: infectionReports })
                        .then(res.json({ infectionReports }))
                }
                else
                    res.send(404)

                return next()
            })
            .catch(next)
    }

    updateLastLocation = (req, res, next) => {
        const options = {
            new: true,
            useFindAndModify: false
        }

        Survivor.findByIdAndUpdate(req.params.id, { lastLocation: req.body.lastLocation }, options)
            .then(result => {
                if (result)
                    res.json(result)
                else
                    res.send(404)

                return next()
            })
            .catch(next)
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
            .catch(next)
    }

    setRoutes(application: restify.Server) {
        application.get(`${this.baseUri}`, this.getAll)
        application.get(`${this.baseUri}/:id`, this.getById)
        application.post(`${this.baseUri}`, this.insert)
        application.put(`${this.baseUri}/:id`, this.replace)
        application.del(`${this.baseUri}/:id`, this.delete)

        application.get(`${this.baseUri}/:id/inventory`, this.getInventory)
        application.put(`${this.baseUri}/:id/lastLocation`, this.updateLastLocation)
        application.put(`${this.baseUri}/:id/infectionReport`, this.reportInfection)
    }
}

export const survivorController = new SurvivorController()