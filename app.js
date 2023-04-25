const express = require("express")
const MiniSearch = require("minisearch")
const port = process.env.PORT || 3001;
var someObject = require('./data.json')
var file = require('./stop_words_english.json')

let stopWords = new Set(file)

app = express()

let miniSearch = new MiniSearch({
    fields: ['spices'],
    processTerm: (term) =>
      stopWords.has(term) ? null : term.toLowerCase(), // index term processing
    searchOptions: {
      processTerm: (term) => term.toLowerCase(),
      // boost: { spices: 2 },
      fuzzy: 0.2 // search query processing
    }
  })

miniSearch.addAll(someObject)
  

app.get('/p/:spicename', function(req, res) {
    result = miniSearch.search(req.params.spicename)
    console.log(result)
    res.json(result)})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));