const request = require('postman-request')



const forecast = (latitude, longitude, callback) => {
    const uri = `http://api.weatherstack.com/current?access_key=217817397ad54a512ce2e5687fd44223&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`

    request({ uri, json: true }, (error, { body }) => {
        if (error) {
            callback(
                'Something went wrong', undefined
            )
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.current)
        }
    })

}

module.exports = forecast