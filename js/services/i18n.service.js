'use strict'

const gTrans = {
    'page-title': {
        en: 'Fr馃惛gi\'s Book Shop',
        he: '讞谞讜转 讛馃惛驻专讬诐 砖诇 驻专讜讙讬'
    },
    'new-book-name': {
        en: 'Enter the new book\'s name',
        he: '砖诐 讛住驻专 讛讞讚砖'
    },
    'new-book-price': {
        en: 'Enter the new book\'s price',
        he: '诪讞讬专 讛住驻专 讛讞讚砖'
    },
    warning: {
        en: 'Please enter proper input',
        he: '讘讘拽砖讛 讛讻谞住 砖诐 讜诪讞讬专 诪转讗讬诪讬诐'
    },
    'new-book-btn': {
        en: 'Add a new Book',
        he: '讛讜住祝 住驻专 讞讚砖'
    },
    'max-price': {
        en: 'Max price:',
        he: '诪讞讬专 诪拽住讬诪诇讬:'
    },
    'min-rate': {
        en: 'Min rating:',
        he: '讞讜讜转 讚注转 诪讬谞讬诪讗诇讬转:'
    },
    id: {
        en: 'id',
        he: '讝讬讛讜讬'
    },
    img: {
        en: 'img',
        he: '转诪讜谞讛'
    },
    'book-title': {
        en: 'title',
        he: '讻讜转专转'
    },
    'book-price': {
        en: 'price',
        he: '诪讞讬专'
    },
    actions: {
        en: 'actions',
        he: '驻注讜诇讜转'
    },
    prev: {
        en: 'prev',
        he: '讛拽讜讚诐'
    },
    next: {
        en: 'next',
        he: '讛讘讗'
    },
    price: {
        en: 'Price ',
        he: '诪讞讬专 '
    },
    search: {
        en: 'search a keyword',
        he: '讞讬驻讜砖 讘讗诪爪注讜转 诪讬诇讜转 诪驻转讞'
    },
    read: {
        en: 'read',
        he: '诇拽专讜讗'
    },
    update: {
        en: 'update',
        he: '诇注讚讻谉'
    },
    delete: {
        en: 'delete',
        he: '诇诪讞讜拽'
    },
    'book deleted': {
        en: 'Book deleted',
        he: '讛住驻专 谞诪讞拽'
    },
    'book updated': {
        en: 'Book updated',
        he: '讛住驻专 注讜讚讻谉'
    },
    'book created': {
        en: 'Book added',
        he: '讛住驻专 谞讜住祝'
    }
}

var gCurrLang = 'en'

function setLang(lang) {
    gCurrLang = lang
}

function getTrans(translateKey) {
    const key = gTrans[translateKey]
    if (!key) return 'UNKNOWN'

    var translateVal = key[gCurrLang]
    if (!translateVal) translateVal = key['en']

    return translateVal
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const translateKey = el.dataset.trans
        const translateVal = getTrans(translateKey)
        el.innerText = translateVal
        if (el.placeholder !== undefined) el.placeholder = translateVal
    })
}

function getCurrLang() {
    return gCurrLang
}

function getPrice(price) {
    const num = gCurrLang === 'en' ? price : price * 3.5
    var curr = {}

    curr.style = 'currency'
    curr.currency = gCurrLang === 'en' ? 'USD' : 'ILS'

    return new Intl.NumberFormat(gCurrLang, curr).format(num)
}


