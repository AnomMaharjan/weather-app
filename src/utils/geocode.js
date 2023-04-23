const request = require('postman-request')

const geoCode = (address, callback) => {
    const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5vbW1haGFyamFuIiwiYSI6ImNsZzM1bnJ5dzBjMTkzZXBoOTNnampza3cifQ.l5ljxJe0cORnK2MbaAGBog&limit=1`

    request({ uri, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services.", undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })

}



module.exports = geoCode