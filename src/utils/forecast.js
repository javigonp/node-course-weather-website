const request = require('postman-request')

// We only use response.body -> we can destructure it
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f178b3741becef8dbcf94be54ec725f5&query=${latitude},${longitude}&units=m`

    // in the options object we can use the property shorthand
    request( { url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) { 
            callback('Unable to find location', undefined)
        } else {
            // humidity - > the humidity is x%
            const current = body.current
            const temperature = current.temperature
            const feelsLike = current.feelslike
            const weatherDescription = current.weather_descriptions[0]
            const humidity = current.humidity

            callback(undefined, `${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out. The humidity is ${humidity}%.`)
        }
    })
}

module.exports = forecast





// ********** CODE WITHOUT DESTRUCTURING **********

// const request = require('postman-request')

// // We only use response.body -> we can destructure it
// const forecast = (lat, long, callback) => {
//     const url = `http://api.weatherstack.com/current?access_key=f178b3741becef8dbcf94be54ec725f5&query=${lat},${long}&units=m`

//     // in the options object we can use the property shorthand
//     request( {url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service', undefined)
//         } else if (response.body.error) { 
//             callback('Unable to find location', undefined)
//         } else {
//             const current = response.body.current
//             const temperature = current.temperature
//             const feelsLike = current.feelslike
//             const weatherDescription = current.weather_descriptions[0]

//             callback(undefined, `${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`)
//         }
//     })
// }

// module.exports = forecast
