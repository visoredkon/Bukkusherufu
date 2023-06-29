class Book {
    constructor (id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt) {
        if (!name) {
            let errorMessage = updatedAt ? 'Gagal memperbarui buku. ' : 'Gagal menambahkan buku. '
            errorMessage += 'Mohon isi nama buku'

            throw new Error(errorMessage)
        }

        if (typeof name !== 'string') {
            throw new Error('Nama buku harus berupa string')
        }
        if (typeof year !== 'number') {
            throw new Error('Tahun buku harus berupa angka')
        }
        if (typeof author !== 'string') {
            throw new Error('Penulis buku harus berupa string')
        }
        if (typeof summary !== 'string') {
            throw new Error('Ringkasan buku harus berupa string')
        }
        if (typeof publisher !== 'string') {
            throw new Error('Penerbit buku harus berupa string')
        }
        if (typeof pageCount !== 'number') {
            throw new Error('Jumlah halaman buku harus berupa angka')
        }
        if (typeof readPage !== 'number') {
            throw new Error('Halaman buku yang sudah dibaca harus berupa angka')
        }
        if (typeof reading !== 'boolean') {
            throw new Error('Status buku yang sedang dibaca harus berupa boolean')
        }

        if (readPage < 0 || readPage > pageCount) {
            let errorMessage = updatedAt ? 'Gagal memperbarui buku. ' : 'Gagal menambahkan buku. '
            if (readPage < 0) errorMessage += 'readPage tidak boleh kurang dari 1'
            if (readPage < 0 && readPage > pageCount) errorMessage += ' dan '
            if (readPage > pageCount) errorMessage += 'readPage tidak boleh lebih besar dari pageCount'
            throw new Error(errorMessage)
        }

        this.id = id
        this.name = name
        this.year = year
        this.author = author
        this.summary = summary
        this.publisher = publisher
        this.pageCount = pageCount
        this.readPage = readPage
        this.finished = readPage === pageCount
        this.reading = reading
        this.insertedAt = insertedAt || new Date().toISOString()
        this.updatedAt = updatedAt || this.insertedAt
    }
}

module.exports = Book
