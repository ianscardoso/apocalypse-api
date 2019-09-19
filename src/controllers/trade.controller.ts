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

    validateSurvivor = async (idSurvivor) => {
        return Survivor.findById(idSurvivor)
    }

    countTradePoints = async (items: InventoryItem[]) => {
        let pointsSurvivor = 0

        for (let inventoryItem of items) {
            pointsSurvivor += await Item.findById(inventoryItem.item).then((item) => {
                return item.points * inventoryItem.quantity
            })
        }

        console.log("Survivor has " + pointsSurvivor + " points for trade")

        return pointsSurvivor
    }

    validateTrade = async (req, res, next) => {
        try {
            if (req.body) {
                const survivor1 = await this.validateSurvivor(req.body.survivor1)
                const survivor2 = await this.validateSurvivor(req.body.survivor2)
                const pointsSurvivor1 = await this.countTradePoints(req.body.itemsTradeSurvivor1)
                const pointsSurvivor2 = await this.countTradePoints(req.body.itemsTradeSurvivor2)

                console.log("Survivor 1: " + survivor1)
                console.log("Survivor 2: " + survivor2)
                console.log("Points survivor 1: " + pointsSurvivor1)
                console.log("Points survivor 2: " + pointsSurvivor2)
            }

            res.send(200)

            return next()
        }
        catch (error) {
            return next(error)
        }
    }

    setRoutes(application: restify.Server) {
        application.post(`${this.baseUri}`, this.validateTrade)
        application.get(`${this.baseUri}`, this.getAll)
    }
}

export const tradeController = new TradeController();