import { Server } from './server'
import { survivorController } from './controllers/survivor.controller';

const server = new Server()

server.bootstrap([
    survivorController
]).then(server => {
    console.log('Server is listening on: ', server.application.address())
})