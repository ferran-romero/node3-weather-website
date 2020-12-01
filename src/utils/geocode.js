const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFrb2tpYmNuIiwiYSI6ImNraDZvZXRwMTBmOGkyeXFjbjIwbmk5aTUifQ.-7c4q-0R0Skm9CLadlBHgA&limit=1'
    request({ url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to mapbox service', undefined)
        } else if (!body.features.length) {
            callback('Cannot find this location, try to search another one', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
