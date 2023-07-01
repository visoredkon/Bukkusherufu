import { nanoid } from 'nanoid'
import Book from '../models/bookModel.js'
import books from '../data/booksData.js'

const responseCode = {
    created: 201,
    badRequest: 400,
    notFound: 404
}

/**
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 * @returns {import('@hapi/hapi').ResponseObject}
 */
const saveBook = (request, h) => {
    try {
        const lengthId = 16
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

        const newBook = new Book(nanoid(lengthId), name, year, author, summary, publisher, pageCount, readPage, reading)

        books.push(newBook)

        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: newBook.id
            }
        }).code(responseCode.created)
    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message
        }).code(responseCode.badRequest)
    }
}

/**
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 * @returns {import('@hapi/hapi').ResponseObject}
 */
const getAllBooks = (request, _h) => {
    const { name, reading, finished } = request.query

    let selectedBooks = books

    if (name) {
        const booksName = name.toLowerCase()
        selectedBooks = selectedBooks.filter(book =>
            book.name.toLowerCase().includes(booksName)
        )
    }

    if (reading) {
        const isReading = +reading === 1
        selectedBooks = selectedBooks.filter(book => book.reading === isReading)
    }

    if (finished) {
        const isFinished = +finished === 1
        selectedBooks = selectedBooks.filter(book => book.finished === isFinished)
    }

    const formattedBooks = selectedBooks.map(({ id, name: bookName, publisher }) => ({
        id,
        publisher,
        name: bookName

    }))

    return {
        status: 'success',
        data: {
            books: formattedBooks
        }
    }
}

/**
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 * @returns {import('@hapi/hapi').ResponseObject}
 */
const getBookById = (request, h) => {
    const id = request.params.bookId

    const selectedBook = books.find(book => book.id === id)

    if (selectedBook) {
        return {
            status: 'success',
            data: {
                book: selectedBook
            }
        }
    }

    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    }).code(responseCode.notFound)
}

/**
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 * @returns {import('@hapi/hapi').ResponseObject}
 */
const updateBookById = (request, h) => {
    const id = request.params.bookId

    const bookIndex = books.findIndex(book => book.id === id)

    if (bookIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }).code(responseCode.notFound)
    }

    try {
        const { insertedAt } = books[bookIndex]
        const updatedAt = new Date().toISOString()

        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

        const newBook = new Book(id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt)

        books[bookIndex] = newBook

        return {
            status: 'success',
            message: 'Buku berhasil diperbarui'
        }
    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message
        }).code(responseCode.badRequest)
    }
}

/**
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 * @returns {import('@hapi/hapi').ResponseObject}
 */
const deleteBookById = (request, h) => {
    const id = request.params.bookId

    const bookIndex = books.findIndex(book => book.id === id)

    if (bookIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        }).code(responseCode.notFound)
    }

    books.splice(bookIndex, 1)

    return {
        status: 'success',
        message: 'Buku berhasil dihapus'
    }
}

export default {
    saveBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
}
