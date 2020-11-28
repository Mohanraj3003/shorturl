require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const mongoose = require('./connect/db')
const URL = require('./connect/Schema')
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const sen = await URL.find()
    res.render('index', { sen: sen })
})

app.post('/', async (req, res) => {
    const input = new URL({
        full: req.body.full,
        short: req.body.short,
        clicks: 0
    })
    try {
        const update = await input.save()
        res.redirect('/');
    } catch (e) {
        res.send(e);
    }
})

app.get('/:short', async (req, res) => {
    const last = await URL.findOne({ short: req.params.short })
    if (last == null) return res.sendStatus(404)

    last.clicks++;
    last.save()

    res.redirect(last.full)
})

app.get('/submit/:id', async (req, res) => {
    const view = await URL.findOne({ short: req.params.id })
    res.json(view)
})
app.listen(PORT, () => console.log("server Started at " + PORT))