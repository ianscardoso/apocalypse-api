import * as restify from 'restify'
import { ControllerModel } from '../common/controller.model';
import { Item } from '../models/item.model';

class ItemController extends ControllerModel<Item>{
    constructor() {
        super(Item)
    }

    setRoutes(application: restify.Server) {
        application.get(`${this.baseUri}`, this.getAll)
        application.get(`${this.baseUri}/:id`, this.getById)
        application.post(`${this.baseUri}`, this.insert)
        application.put(`${this.baseUri}/:id`, this.replace)
        application.del(`${this.baseUri}/:id`, this.delete)
    }
}

export const itemController = new ItemController()