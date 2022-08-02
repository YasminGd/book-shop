'use strict'

const KEY_BOOKS = 'booksDB'
const KEY_BOOK = 'bookDB'
const PAGE_SIZE = 5

var gBooks
var gRegex
var gPage = { page: 0, maxPage: 0 }
var gSortBy = { title: -1, price: -1 }
var gFilterBy = {}

_createBooks()


function getBooksForDisplay() {
    console.log(gFilterBy);
    var books = gBooks.filter(book => book.price <= gFilterBy.maxPrice && book.rate >= gFilterBy.minRate)
    if (gRegex) {
        books = books.filter(book => gRegex.test(book.title))
    }

    gPage.maxPage = parseInt(books.length / PAGE_SIZE)
    while (gPage.page > gPage.maxPage) gPage.page--

    return books.slice(gPage.page * PAGE_SIZE, gPage.page * PAGE_SIZE + PAGE_SIZE)
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    const book = gBooks.splice(bookIdx, 1)[0]
    saveToStorage(KEY_BOOKS, gBooks)
    gPage.maxPage = parseInt(gBooks.length / PAGE_SIZE)
    return book
}

function addBook(title, price) {
    if (!title || !price) return
    const book = _createBook(title, price)
    gBooks.unshift(book)
    saveToStorage(KEY_BOOKS, gBooks)
    return book
}

function updateBook(bookId, newPrice) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks[bookIdx].price = newPrice
    saveToStorage(KEY_BOOKS, gBooks)
    return gBooks[bookIdx]
}

function getBookById(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    saveToStorage(KEY_BOOK, book)
    return book
}

function changeRating(rating) {
    const activeBookId = loadFromStorage(KEY_BOOK).id
    const activeBookIdx = gBooks.findIndex(book => book.id === activeBookId)

    const activeBook = gBooks[activeBookIdx]
    if (activeBook.rate + rating >= 0 && activeBook.rate + rating <= 10) {
        activeBook.rate += rating
        saveToStorage(KEY_BOOKS, gBooks)
        saveToStorage(KEY_BOOK, gBooks[activeBookIdx])
    }
    return
}

function getActiveBook() {
    return loadFromStorage(KEY_BOOK)
}

function removeActiveBook() {
    saveToStorage(KEY_BOOK, '')
}

function setBookFilter(filterBy = {}) {
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    return gFilterBy
}

function SetSortBy(sort) {
    gSortBy[sort] = -gSortBy[sort]
    if (sort === 'title') gBooks.sort((book1, book2) => book1.title.localeCompare(book2.title) * gSortBy[sort])
    if (sort === 'price') gBooks.sort((book1, book2) => (book1.price - book2.price) * gSortBy[sort])
    gPage.page = 0
}

function setSearchTitle(searchWords) {
    const regex = new RegExp(`${searchWords}`, 'i')
    gRegex = regex
}

function getPageDetails() {
    return gPage
}

function pageChange(change) {
    if (gPage.page + change < 0 || gPage.page + change > gPage.maxPage) return
    gPage.page += change
}


//---------------------------------

function _createBooks() {
    const books = loadFromStorage(KEY_BOOKS)
    if (!books || !books.length) {
        gBooks = []
        var numOfBooks = 26
        while (numOfBooks > 0) {
            gBooks.unshift(_createBook(makeLorem().trim()))
            numOfBooks--
        }
        saveToStorage(KEY_BOOKS, gBooks)
        return
    }
    else {
        gBooks = books
    }
}

function _createBook(name, price = getRandomInt(1, 51)) {
    return {
        id: makeId(3),
        img: getRandomInt(1, 10),
        title: name,
        price: price,
        summery: makeLorem(200),
        rate: getRandomInt(0, 11)
    }
}