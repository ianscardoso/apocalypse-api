import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Controller } from './controllers/controller';

export class Server {
    application: restify.Server

    initDatabase() {
        let options = { useNewUrlParser: true }

        return mongoose.connect('mongodb://localhost:27017/apocalypse', options)
    }

    initRoutes(controllers: Controller[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'apocalypse-api',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.bodyParser())

                for (let controller of controllers)
                    controller.setRoutes(this.application)

                this.application.listen(8080, () => {
                    resolve(this.application)
                })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    bootstrap(controllers: Controller[]): Promise<Server> {
        return this.initDatabase()
            .then(() => this.initRoutes(controllers))
            .then(() => this)
    }
}