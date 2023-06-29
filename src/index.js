require('dotenv').config()
const Hapi = require('@hapi/hapi')
const process = require('process')
const bookRoutes = require('./routes/bookRoute')

const init = async () => {
    const server = Hapi.server({
        host: process.env.HOST,
        port: process.env.PORT
    })

    server.route(bookRoutes)

    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
