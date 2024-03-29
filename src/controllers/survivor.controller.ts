import * as restify from 'restify'
import { Survivor } from '../models/survivor.model';
import { ControllerModel } from '../common/controller.model';
import { InventoryItem } from '../models/inventoryItem.model';
import { response } from 'spdy';

class SurvivorController extends ControllerModel<Survivor> {
    constructor() {
        super(Survivor)
    }

    reportInfection = (req, res, next) => {
        Survivor.findById(req.params.id)
            .then(survivor => {
                if (survivor) {
                    if (survivor.isInfected) {
                        let isInfected = survivor.isInfected
                        res.json({ isInfected })

                        return
                    }

                    let infectionReports = survivor.infectionReports + 1

                    if (infectionReports <= 3) {
                        survivor.infectionReports = infectionReports

                        if (infectionReports == 3)
                            survivor.isInfected = true

                        Survivor.updateOne({ _id: req.params.id }, survivor)
                            .then(res.json({ infectionReports }))
                    }
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
            .populate('inventory.item')
            .exec((err, survivor) => {
                if (err)
                    return next(err)
                else if (!survivor)
                    res.send(404)
                else
                    res.json(survivor.inventory)
            })

        return next()
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