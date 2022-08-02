'use strict'

function makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function makeLorem(wordCount = 2) {
    const words = ['The', 'above', 'port', 'was', 'color', 'tuned', 'to', 'a dead channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit', 'people', 'and', 'as generally', 'happens', 'cases', 'each time', 'it', 'was', 'story', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function makeLoremHe(wordCount = 2) {
    const words = ['אכל', 'חתול', 'חוף', 'איש', 'אדמה', 'פינה', 'קעקוע', 'עצוב', 'שמח', 'אהבה', 'פחות או יותר', 'אני', 'הוא', 'סיפור', 'ארון', 'בוכה', 'וגם', 'כרגיל', 'קורה', 'תיקים', 'כל פעם', 'זה', 'היה', 'סיפור', 'זה', 'תופי', 'געגוע', 'בכי', 'להישרף']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function exchangeMoney(num) {
    const currLang = getCurrLang()

    return currLang === 'en' ? num : num * 3.5
}