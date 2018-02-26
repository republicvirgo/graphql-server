const express = require('express')
const fetch = require('node-fetch')

const app = express()
const PORT = 4000

const fetchSource = () => fetch(`https://newsapi.org/v2/sources?apiKey=871c4309f5864dc28ac26a72e3ada496`)
  .then(response => response.json())
  .then(data => data.sources)
  .catch(error => {
    console.log('ERR', error)
  })

const fetchArticles = sourceId => fetch(`https://newsapi.org/v2/everything?sources=abc-news&apiKey=871c4309f5864dc28ac26a72e3ada496`)
  .then(response => response.json())
  .then(data => data.articles)
  .catch(error => {
    console.log('ERR', error)
  })

// fetchSource()
// fetchArticles()

app.listen(PORT)
console.log('Listening', PORT)