const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000; // Allows Heroku to utilize default port on their service OR it runs on 3000 locally

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'James McKee',
        copyright: '2019 cc0a'
    })
});

app.get('/help', (req, res) => {
   res.render('help', {
       helpText:'This is some helpful TEXT!',
       title: 'Help',
       name: 'James McKee',
       copyright: '2019 cc0a'
   });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'James McKee',
        copyright: '2019 cc0a'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { // Setting up a default object in this case prevents the server from crashing, because it covers all possible bad searches
       if(error) {
           return res.send({ error })
       }
       forecast(latitude, longitude, (error, forecastData) => {
          if(error) {
              return res.send({ error })
          }
          res.send({
              forecast: forecastData,
              location,
              address: req.query.address
          });
       });
    });
});

app.get('/help/*', (req, res) => {
   res.render('helpmissing', {
       title: '404 Page',
       helpMissing: 'Help Article not Found',
       copyright: '2019 cc0a'
   });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        prompt: '404: Page Not Found',
        copyright: '2019 cc0a'
    });
});

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port' + port);
});









