import * as restify from 'restify'
import * as mongoose from 'mongoose'

export abstract class Controller {
    abstract setRoutes(application: restify.Server)
}