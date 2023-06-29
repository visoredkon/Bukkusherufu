const bookController = require('../handlers/bookHandler')

const bookRoutes = [
    {
        method: 'POST',
        path: '/books',
        handler: bookController.saveBook
    },
    {
        method: 'GET',
        path: '/books',
        handler: bookController.getAllBooks
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: bookController.getBookById
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: bookController.updateBookById
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: bookController.deleteBookById
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
