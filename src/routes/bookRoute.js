const bookHandler = require('../handlers/bookHandler')

const bookRoutes = [
    {
        method: 'POST',
        path: '/books',
        handler: bookHandler.saveBook
    },
    {
        method: 'GET',
        path: '/books',
        handler: bookHandler.getAllBooks
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: bookHandler.getBookById
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: bookHandler.updateBookById
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
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
