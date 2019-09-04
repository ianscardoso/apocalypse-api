import { Server } from './server/server'
import { survivorController } from './controllers/survivor.controller';
import { tradeController } from './controllers/trade.controller';
<<<<<<< Updated upstream
=======
import { itemController } from './controllers/item.controller';
>>>>>>> Stashed changes

const server = new Server()

server.bootstrap([
    survivorController,
<<<<<<< Updated upstream
    tradeController
=======
    tradeController,
    itemController
>>>>>>> Stashed changes
]).then(server => {
    console.log('Server is listening on: ', server.application.address())
})