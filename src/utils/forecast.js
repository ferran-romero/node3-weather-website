const request = require('postman-request')

const forecast = (latitude, longitud, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7e2451eebf9cac5bceb72cf1cc22c15d&query=' + latitude + ',' + longitud
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try to seach another one', undefined);
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] 
                    + '. It\'s ' + body.current.temperature 
                    + ' degrees out, but it feels like ' + body.current.feelslike
                    + ' with ' + body.current.humidity + ' humidity.'
            );
        }
    });
}

module.exports = forecast
