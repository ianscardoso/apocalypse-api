import * as restify from 'restify'
import { ControllerModel } from '../common/controller.model';
import { Trade } from '../models/trade.model';

class TradeController extends ControllerModel<Trade>{
    constructor() {
        super(Trade)
    }

    setRoutes(application: restify.Server) {
        throw new Error("Method not implemented.");
    }
}

export const tradeController = new TradeController();