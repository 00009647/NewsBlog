const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const rootFolder = path.dirname(
    require.main.filename || process.require.main.filename
)
const Validator = require("../services/validation")
const v = new Validator()

const db = `${rootFolder}/data/news.json`

router.get('/', (req, res) => {
  res.render('create')
})

router.post("/create", (req, res) => {
  if (v.isValid(req.body)) {
    dbc.saveOne(req.body, () => res.render("create", { success: true }))
  } else {
    res.render("create", { error: true, success: false })
  }
})



router.post('/', (req, res)=>{
  const title = req.body.title
  const description = req.body.description
  
  if (title.trim() === '' && description.trim() === ''){
    res.render('create', { error: true })
  } else{
    fs.readFile(db, (err, data) => {
      if (err) throw err

      const news = JSON.parse(data)

      news.push({
        id: id(),
        title:title,
        description:description,
      })
      fs.writeFile(db, JSON.stringify(news), err =>{
        if (err) throw err

        res.render('create', { success: true})
      })
    })
  }
})


module.exports = router

function id () {
  return '_' + Math.random().toString(36).substr(2,9);
}