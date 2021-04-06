const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine' ,'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false}))

const news = require('./routes/news')
const create = require('./routes/create')


//localhost:8000
app.get('/', (req,res) => {
  res.render('home')
})

app.use('/news', news)
app.use('/create', create)

app.listen(8000, err=> {
    if(err) console.log(err)
    console.log('Your server is running on the port 8000')
})
                   // API 
app.get('/api/v1/news', (req, res) => {
  fs.readFile('./data/news.json', (err, data) => {
    if (err) throw err
  
    const news = JSON.parse(data)
  
    res.json(news)
  })
})