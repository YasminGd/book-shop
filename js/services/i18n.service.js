'use strict'

const gTrans = {
    'page-title': {
        en: 'Fr🐸gi\'s Book Shop',
        he: 'חנות ה🐸פרים של פרוגי'
    },
    'new-book-name': {
        en: 'Enter the new book\'s name',
        he: 'שם הספר החדש'
    },
    'new-book-price': {
        en: 'Enter the new book\'s price',
        he: 'מחיר הספר החדש'
    },
    warning: {
        en: 'Please enter proper input',
        he: 'בבקשה הכנס שם ומחיר מתאימים'
    },
    'new-book-btn': {
        en: 'Add a new Book',
        he: 'הוסף ספר חדש'
    },
    'max-price': {
        en: 'Max price:',
        he: 'מחיר מקסימלי:'
    },
    'min-rate': {
        en: 'Min rating:',
        he: 'חוות דעת מינימאלית'
    },
    id: {
        en: 'id',
        he: 'זיהוי'
    },
    img: {
        en: 'img',
        he: 'תמונה'
    },
    'book-title': {
        en: 'title',
        he: 'כותרת'
    },
    'book-price': {
        en: 'price',
        he: 'מחיר'
    },
    actions: {
        en: 'actions',
        he: 'פעולות'
    },
    prev: {
        en: 'prev',
        he: 'הקודם'
    },
    next: {
        en: 'next',
        he: 'הבא'
    },
    price: {
        en: 'Price ',
        he: 'מחיר '
    },
    search: {
        en: 'search a keyword',
        he: 'חיפוש באמצעות מילות מפתח'
    },
    read: {
        en: 'read',
        he: 'לקרוא'
    },
    update: {
        en: 'update',
        he: 'לעדכן'
    },
    delete: {
        en: 'delete',
        he: 'למחוק'
    },
    'book deleted': {
        en: 'Book deleted',
        he: 'הספר נמחק'
    },
    'book updated': {
        en: 'Book updated',
        he: 'הספר עודכן'
    },
    'book created': {
        en: 'Book added',
        he: 'הספר נוסף'
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


