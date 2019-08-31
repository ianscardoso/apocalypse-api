import * as restify from 'restify'
import { Controller } from './controller';
import { Survivor } from '../models/survivor.model';
import { ControllerModel } from '../common/controller.model';

class SurvivorController extends ControllerModel<Survivor> {
    constructor() {
        super(Survivor)
    }
    
    // this works but is a mess. Fix it later
    reportInfection = (req, res, next) => {
        const options = {
            new: true
        }
        
        Survivor.findById(req.params.id)
            .then(survivor => {
                if (survivor) {
                    if (!survivor.infectionReports) {
                        survivor.infectionReports = 0
                    }

                    survivor.infectionReports += 1

                    Survivor.findByIdAndUpdate(req.params.id, survivor, options)
                        .then(result => {
                            res.json(result)
                        })
                }
                else
                    res.send(404)

                return next()
            })
    }

    updateLastLocation = (req, res, next) => {
        Survivor.findByIdAndUpdate(req.params.id, { lastLocation: req.body.lastLocation })
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