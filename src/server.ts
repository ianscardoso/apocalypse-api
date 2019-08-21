import * as restify from 'restify'
import * as mongoose from 'mongoose'

export class Server {
    application: restify.Server

    initDatabase() {
        mongoose.connect('mongodb://localhost:27017/apocalypse')
    }

    initRoutes() {
        this.application.get('/', (req, res, next) => {
            res.send({ message: 'ok' })
            next()
        })
    }

    bootstrap() {
        this.initDatabase()

        this.application = restify.createServer({
            name: 'apocalypse-api',
            version: '1.0.0'
        })

        this.initRoutes()

        this.application.listen(8080, () => {
            console.log('listening on 8080')
        })
    }
}