import * as restify from 'restify'
import { Controller } from './controller';

class SurvivorController extends Controller{
    
    setRoutes(application: restify.Server) {
        // application.get('/survivor')
    }

}

export const survivorController = new SurvivorController()