const path = require('path')
const express = require('express') //express exposes just a function
// const { readdirSync } = require('fs')

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// this options parameters allows to remove the routing for the 
// endpoints. Now the static takes cares of it
const options = {
    extensions: ['htm', 'html']
}


// Setpup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // configure express to look for the views in templates folder
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory, options))

// ** routes

// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Javi Gonzalez'
    })
})

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful.',
        title: 'Help',
        name: 'Javi Gonzalez'
    })
})

// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Javi Gonzalez'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('not_found', {
        title: '404',
        name: 'Javi Gonzalez',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('not_found', {
        title: '404',
        name: 'Javi Gonzalez',
        message: 'Page not found'
    })
})

// starts the server in 3000 port
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
