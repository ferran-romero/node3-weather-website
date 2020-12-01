const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Configure handlebars and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// Define static folder to server
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ferran'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ferran'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This message really helps',
        title: 'Help me!',
        name: 'Ferran'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ferran',
        message: 'Help article does not exists'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an adress to search'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ferran',
        message: 'Oopppssss this page doesn\'t exists'
    })
})

app.listen(3000, () => {
    console.log('Starting the server')
})
