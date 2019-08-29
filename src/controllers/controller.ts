import * as restify from 'restify'

export abstract class Controller {
    abstract setRoutes(application: restify.Server)
}