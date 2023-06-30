const bookHandler = require('../handlers/bookHandler')

const mainPath = '/books'

const bookRoutes = [
    {
        method: 'POST',
        path: mainPath,
        handler: bookHandler.saveBook
    },
    {
        method: 'GET',
        path: mainPath,
        handler: bookHandler.getAllBooks
    },
    {
        method: 'GET',
        path: mainPath + '/{bookId}',
        handler: bookHandler.getBookById
    },
    {
        method: 'PUT',
        path: mainPath + '/{bookId}',
        handler: bookHandler.updateBookById
    },
    {
        method: 'DELETE',
        path: mainPath + '/{bookId}',
        handler: bookHandler.deleteBookById
    },
    {
        method: '*',
        path: '/{any*}',
        handler: () => {
            return {
                status: 'failed',
                message: 'Maaf, URL API yang anda akses tidak valid. Silakan periksa kembali URL dan method yang anda gunakan.'
            }
        }
    }
]

module.exports = bookRoutes
