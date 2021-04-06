const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const rootFolder = path.dirname(
    require.main.filename || process.require.main.filename
)

const db = `${rootFolder}/data/news.json`

router.get('/:id', (req, res) => {
    const id = req.params.id
  
    fs.readFile(db, (err, data) => {
      if (err) throw err
  
      const news = JSON.parse(data)
  
      const newz = news.filter(newz => newz.id == id)[0]
  
      // delete news (newz => newz.id == id)[0]
  
      res.render('detail', { newz: newz })
    })
  })

  router.get('/:id/delete', (req, res) => {
    const id = req.params.id
  
    fs.readFile(db, (err, data) => {
      if (err) throw err 
  
      const news = JSON.parse(data)
  
      const filteredNews = news.filter(newz => newz.id != id)
  
  
      fs.writeFile(db, JSON.stringify(filteredNews), (err) => {
        res.render('news', { news: filteredNews, deleted: true })
      })
    })
})
  

  
  
  router.get('/', (req, res) => {
    fs.readFile(db, (err, data) => {
      if (err) throw err
  
      const news = JSON.parse(data)
  
      res.render('news', { news: news })
    })
  })

  module.exports = router