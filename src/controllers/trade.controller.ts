import * as restify from 'restify'
import { ControllerModel } from '../common/controller.model';
import { Trade } from '../models/trade.model';

class TradeController extends ControllerModel<Trade>{
    constructor() {
        super(Trade)
    }

    setRoutes(application: restify.Server) {
<<<<<<< Updated upstream
        throw new Error("Method not implemented.");
=======
        application.post(`${this.baseUri}`, this.insert)
        application.get(`${this.baseUri}`, this.getAll)
>>>>>>> Stashed changes
    }
}

export const tradeController = new TradeController();