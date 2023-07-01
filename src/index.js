import 'dotenv/config'
import Hapi from '@hapi/hapi'
import process from 'process'
import bookRoutes from './routes/bookRoute.js'

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
