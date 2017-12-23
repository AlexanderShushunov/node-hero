const express = require('express');
const bodyParser = require('body-parser');
const {resource} = require('./resource');
const dataProviders = require('../data-providers');
const {getCurrentTemperatureInMoscow} = require('../servises/temerature');

const port = 8000;

module.exports.startServer = function () {
    const app = express();

    app.use(bodyParser.json());

    app.use(({url, body}, response, next) => {
        console.log(url, body);
        next();
    });

    resource(app, dataProviders.users, 'users');

    app.get('/current-temperature-in-moscow', async (request, response, next) => {
        try {
            const temp = await getCurrentTemperatureInMoscow();
            response.send(String(temp));
        } catch (err) {
            next(err);
        }
    });

    app.use((err, request, response, next) => {
        console.log(err);
        response.status(500).send('Something went wrong :( Sorry, it is my first app on nodejs.');
        next();
    });

    app.listen(port, (err) => {
        if (err) {
            console.log('Ups', err);
        }
        console.log(`server is listening on ${port}`);
    });
};
