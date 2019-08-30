import * as restify from 'restify'

export const handleError = (req: restify.Request, res: restify.Response, error, done) => {
    console.log(error)

    error.toJSON = () => {
        return {
            message: error.message
        }
    }

    switch (error.name) {
        case 'MongoError':
            if (error.code === 11000) {  // 11000 = duplicate key error
                error.statusCode = 400
            }
            break
        case 'ValidationError':
            error.statusCode = 400
            const messages: any[] = []

            for (let e in error.errors) {
                messages.push({ message: error.errors[e].message })
            }

            error.toJSON = () => ({
                errors: messages
            })
            break
    }

    done()
}