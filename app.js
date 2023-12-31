const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

const restaurants = require('./public/jsons/restaurant.json').results

app.get('/', (req, res) => {
    res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
    res.render('index', { restaurants: restaurants })
})

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    const restaurant = restaurants.find((r) => r.id.toString() === id)
    res.render('detail', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim()
    const results = keyword ? restaurants.filter((r) =>
        r.name.toLowerCase().includes(keyword.toLowerCase()) || r.category.includes(keyword.toLowerCase())
    ) : restaurants
    res.render('index', { restaurants: results, keyword: keyword })
})

app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`)
})