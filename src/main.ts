import { Server } from './server/server'
import { survivorController } from './controllers/survivor.controller';
import { tradeController } from './controllers/trade.controller';
import { itemController } from './controllers/item.controller';

const server = new Server()

server.bootstrap([
    survivorController,
    tradeController,
    itemController
]).then(server => {
    console.log('Server is listening on: ', server.application.address())
})