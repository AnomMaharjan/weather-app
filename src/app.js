const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Setup handlebars engine and views location 
app.set('view engine', 'hbs')  // tells express which templating engine we've installed
app.set('views', viewsPath) //pointing the views path

// Partials allows us to reuse the code 
hbs.registerPartials(partialsPath)  //registers partials path

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anom Maharjan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anom'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        message: 'For any help visit www.anommaharjan.com.np',
        title: 'help',
        name: 'Anom'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: 'Please provide an address.' })
    } else {
        geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
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
    }



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
    res.render('404', {
        title: 'Help Error Page',
        error: 'Help article not found.'
        , name: "Anom Maharjan"

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        error: 'Page not found.'
        , name: "Anom Maharjan"

    })
})


app.listen(3000, () => {
    console.log('Listening at port 3000')
})  // starts the server at port 3000
