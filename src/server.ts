import * as restify from 'restify'
import * as mongoose from 'mongoose'

export class Server {
    application: restify.Server

    initDatabase() {
        let options = { useNewUrlParser: true }

        return mongoose.connect('mongodb://localhost:27017/apocalypse', options)
    }

    initRoutes() {
        this.application = restify.createServer({
            name: 'apocalypse-api',
            version: '1.0.0'
        })

        this.application.get('/', (req, res, next) => {
            res.send({ message: 'ok' })
            next()
        })

        this.application.listen(8080, () => {
            console.log('listening on 8080')
        })
    }

    bootstrap(): Promise<Server> {
        return this.initDatabase()
            .then(() => this.initRoutes())
            .then(() => this)
    }
}