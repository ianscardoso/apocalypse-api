import * as restify from 'restify'
import { Controller } from './controller';
import { Survivor } from '../models/survivor.model';
import { ControllerModel } from '../common/controller.model';

class SurvivorController extends ControllerModel<Survivor> {
    constructor() {
        super(Survivor)
    }

    setRoutes(application: restify.Server) {
        application.get(`${this.baseUri}`, this.getAll)
        application.get(`${this.baseUri}/:id`, this.getById)
        application.post(`${this.baseUri}`, this.insert)
        application.put(`${this.baseUri}/:id`, this.replace)
        application.del(`${this.baseUri}/:id`, this.delete)
    }

}

export const survivorController = new SurvivorController()