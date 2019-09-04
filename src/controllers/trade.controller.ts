import * as restify from 'restify'
import { ControllerModel } from '../common/controller.model';
import { Trade } from '../models/trade.model';

class TradeController extends ControllerModel<Trade>{
    constructor() {
        super(Trade)
    }

    setRoutes(application: restify.Server) {
        application.post(`${this.baseUri}`, this.insert)
        application.get(`${this.baseUri}`, this.getAll)
    }
}

export const tradeController = new TradeController();