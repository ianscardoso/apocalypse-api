import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { ControllerModel } from '../common/controller.model';
import { Trade } from '../models/trade.model';
import { Survivor } from '../models/survivor.model';
import { InventoryItem } from '../models/inventoryItem.model';
import { Item } from '../models/item.model';

class TradeController extends ControllerModel<Trade>{
    constructor() {
        super(Trade)
    }

    validateTrade(req, res, next) {
        if (req.body) {
            let idSurvivor1 = req.body.survivor1
            let idSurvivor2 = req.body.survivor2
            let items1: InventoryItem[] = req.body.itemsTradeSurvivor1
            let items2: InventoryItem[] = req.body.itemsTradeSurvivor2
            let pointsSurvivor1 = 0
            let pointsSurvivor2 = 0

            if (idSurvivor1) {
                Survivor.findById(idSurvivor1)
                    .then(survivor => console.log(survivor))
                    .catch(next)
            }

            if (idSurvivor2) {
                Survivor.findById(idSurvivor2)
                    .then(survivor => console.log(survivor))
                    .catch(next)
            }

            if (items1) {
                for (let item1 of items1) {
                    Item.findById(item1.item)
                        .exec((err, item) => {
                            pointsSurvivor1 += item.points * item1.quantity

                            console.log("Survivor 1 has " + pointsSurvivor1 + " points for trade")
                        })
                }
            }            
        }

        return next()
    }

    setRoutes(application: restify.Server) {
        application.post(`${this.baseUri}`, this.validateTrade)
        application.get(`${this.baseUri}`, this.getAll)
    }
}

export const tradeController = new TradeController();