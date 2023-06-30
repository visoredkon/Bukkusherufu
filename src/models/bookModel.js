class Book {
    constructor (id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt) {
        this.validateStringInput(name, 'Nama buku')
        this.validateNumberInput(year, 'Tahun buku')
        this.validateStringInput(author, 'Penulis buku')
        this.validateStringInput(summary, 'Ringkasan buku')
        this.validateStringInput(publisher, 'Penerbit buku')
        this.validateNumberInput(pageCount, 'Jumlah halaman buku')
        this.validateNumberInput(readPage, 'Halaman buku yang sudah dibaca')
        this.validateBooleanInput(reading, 'Status buku yang sedang dibaca')

        this.validateReadPageRange(readPage, pageCount)

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

    validateStringInput (value, fieldName) {
        if (!value) {
            const errorMessage = `Gagal memperbarui buku. ${fieldName} harus diisi`
            throw new Error(errorMessage)
        }
        if (typeof value !== 'string') {
            throw new Error(`${fieldName} harus berupa string`)
        }
    }

    validateNumberInput (value, fieldName) {
        if (typeof value !== 'number') {
            throw new Error(`${fieldName} harus berupa angka`)
        }
    }

    validateBooleanInput (value, fieldName) {
        if (typeof value !== 'boolean') {
            throw new Error(`${fieldName} harus berupa boolean`)
        }
    }

    validateReadPageRange (readPage, pageCount) {
        if (readPage < 0 || readPage > pageCount) {
            throw new Error(`Gagal ${this.updatedAt ? 'memperbarui' : 'menambahkan'} buku. ` +
                `${readPage < 0 ? 'readPage tidak boleh kurang dari 1' : ''}` +
                `${readPage < 0 && readPage > pageCount ? ' dan ' : ''}` +
                `${readPage > pageCount ? 'readPage tidak boleh lebih besar dari pageCount' : ''}`)
        }
    }
}

module.exports = Book
