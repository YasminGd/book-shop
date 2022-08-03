'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
    doTrans()
    renderModalOnPageLoad()
    renderButtons()
}

function renderBooks() {
    const books = getBooksForDisplay()
    const elBooks = document.querySelector('tbody')
    const currLang = getCurrLang()

    if (books.length === 0) {
        elBooks.innerHTML = ''
        return
    }

    const booksHTML = books.map(book =>
        `<article>
            <tr>
                <td>
                    ${book.id}
                </td>
                <td>
                    <img onerror="this.src='img/1.jpg'" src="img/${book.img}.jpg"/>
                </td>
                <td>
                    ${book.title[currLang]}
                </td>   
                <td>
                   ${getPrice(book.price)}
                </td >
                <td>    
                    <button data-trans="read" onclick="onShowBookDetails('${book.id}')"></button> 
                </td>
                <td> 
                    <form onsubmit="onUpdateBook('${book.id}', event)">
                        <input type="text" class="update-price ${book.id}">
                        <button data-trans="update"></button> 
                    </form>
                </td>
                <td>
                    <button data-trans="delete" onclick="onRemoveBook('${book.id}')"></button> 
                </td>
            </tr >
        </article > `)
    elBooks.innerHTML = booksHTML.join('')
}

function renderModalOnPageLoad() {
    if (getActiveBook()) onShowBookDetails(getActiveBook().id)
}

function renderAndTranslate() {
    renderBooks()
    renderButtons()
    doTrans()
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    flashMsg('book deleted')
    renderAndTranslate()
}

function onAddBook(ev) {
    ev.preventDefault()

    const elName = document.querySelector('.new-book-name')
    const elPrice = document.querySelector('.new-book-price')

    if (!elName.value || !+elPrice.value) {
        const elWarning = document.querySelector('.warning')
        elWarning.style.display = 'inline'
        setTimeout(() => elWarning.style.display = 'none', 2000)
        return
    }

    addBook(elName.value, +elPrice.value)

    flashMsg('book created')
    renderAndTranslate()

    elName.value = ''
    elPrice.value = ''
}

function onUpdateBook(bookId, ev) {
    ev.preventDefault()

    const newPrice = +document.querySelector(`.${bookId} `).value
    if (!newPrice) return

    updateBook(bookId, newPrice)
    flashMsg('book updated')
    renderAndTranslate()
}

function flashMsg(msg) {
    const msgInLang = getTrans(msg)
    const elBookModal = document.querySelector('.modal-update')
    elBookModal.innerText = msgInLang
    elBookModal.classList.remove('modal-hide')
    setTimeout(() => elBookModal.classList.add('modal-hide'), 2000)
}

function onShowBookDetails(bookId) {
    const book = getBookById(bookId)
    const currLang = getCurrLang()

    const modalHTML = `
    <button class="modal-details-close-btn" onclick = "onHideBookDetails()" >X</button>
    <h1>${book.title[currLang]}</h1>
    <img src="img/${book.img}.jpg" alt="" />
    <h2 data-trans="price">${getTrans('price')} ${getPrice(book.price)}</h2>
    <p>${book.summery[currLang]}</p>
    <div class="rating-container">
        <button class="rating-btn" value="-1" onclick="onChangeRating(this.value)">-</button>
        <div class="rating">${book.rate}</div>
        <button class="rating-btn" value="1" onclick="onChangeRating(this.value)">+</button>
    </div>
`

    const elBookModal = document.querySelector('.modal-details')
    elBookModal.innerHTML = modalHTML
    elBookModal.classList.remove('modal-hide')
}

function onHideBookDetails() {
    const elBookModal = document.querySelector('.modal-details')
    elBookModal.classList.add('modal-hide')
    removeActiveBook()
}

function onChangeRating(rating) {
    changeRating(+rating)

    const book = getActiveBook()
    const elBookModal = document.querySelector('.modal-details')
    elBookModal.querySelector('.rating').innerText = book.rate
}

function onSetFilterBy(filter) {
    const filterOptions = setBookFilter(filter)
    renderAndTranslate()

    const queryStringParams = `? maxPrice = ${filterOptions.maxPrice}& minRate=${filterOptions.minRate} `
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onSetSortBy(sort) {
    setSortBy(sort)
    renderAndTranslate()
}

function onSetSearchByTitle(value) {
    setSearchTitle(value)
    renderAndTranslate()
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 100,
        minRate: +queryStringParams.get('minRate') || 0
    }

    document.querySelector('.filter-by-max-price').value = filterBy.maxPrice
    document.querySelector('.filter-by-min-rate').value = filterBy.minRate
    setBookFilter(filterBy)
}

function onPageChange(change) {
    pageChange(change)
    renderAndTranslate()
}

function renderButtons() {
    const page = getPageDetails()
    const elNext = document.querySelector('.next')
    const elPrev = document.querySelector('.prev')

    elNext.disabled = page.page === page.maxPage ? true : false
    elPrev.disabled = page.page === 0 ? true : false
}

function onSetLang(lang) {
    setLang(lang)

    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    renderAndTranslate()
}




