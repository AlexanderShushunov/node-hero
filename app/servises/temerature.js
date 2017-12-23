const request = require('request-promise');

const PROTOCOL = 'https';
const DARKSKY_API_URL = 'api.darksky.net/forecast';
const DARKSKY_KEY = 'e35a5878b6a689b4a73b2819efcdbce4';
const MOSCOW_COORDINATES = '55.756950,37.614971';

module.exports.getCurrentTemperatureInMoscow = async function () {
    const options = {
        method: 'GET',
        uri: `${PROTOCOL}://${DARKSKY_API_URL}/${DARKSKY_KEY}/${MOSCOW_COORDINATES}`,
        json: true,
        qs: {
            exclude: 'daily,hourly,alerts,flags,minutely',
            units: 'si'
        }
    };
    const resp = await request(options);
    return resp.currently.temperature;
};
