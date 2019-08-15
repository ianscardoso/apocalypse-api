import * as restify from 'restify'

export class Server {
    application: restify.Server

    Start() {
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
}