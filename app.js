const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine' ,'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false}))

//localhost:8000
app.get('/', (req,res)=>{
  res.render('home')

})

app.get('/create', (req, res)=>{
  res.render('create')
})

app.post('/create', (req, res)=>{
  const title = req.body.title
  const description = req.body.description
  
  if (title.trim() === '' && description.trim() === ''){
    res.render('create', { error: true })
  } else{
    fs.readFile('./data/news.json', (err, data) => {
      if (err) throw err

      const news = JSON.parse(data)

      news.push({
        id: id(),
        title:title,
        description:description,
      })
      fs.writeFile('./data/news.json', JSON.stringify(news), err =>{
        if (err) throw err

        res.render('create', { success: true})
      })
    })
  }
})

app.get('/news/:id', (req, res) => {
  const id = req.params.id

  fs.readFile('./data/news.json', (err, data) => {
    if (err) throw err

    const news = JSON.parse(data)

    const newz = news.filter(newz => newz.id == id)[0]

    res.render('detail', { newz: newz })
  })
})



app.get('/news', (req, res) => {
  fs.readFile('./data/news.json', (err, data) => {
    if (err) throw err

    const news = JSON.parse(data)

    res.render('news', { news: news })
  })
})

app.listen(8000, err=> {
    if(err) console.log(err)
    console.log('Your server is running on the port 8000')
})

function id () {
  return '_' + Math.random().toString(36).substr(2,9);
}