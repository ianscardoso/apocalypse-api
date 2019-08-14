import * as restify from 'restify'

const server = restify.createServer()

server.listen(8080, function () {
    console.log('ready on %s', server.url);
  });