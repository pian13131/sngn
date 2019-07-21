// Async
console.log('start');

setTimeout(() => {
    console.log('2s Timer');
}, 2000)
setTimeout(() => {
    console.log('0s Timer');
}, 0) // if the time is 0s, it will also be after other sycn code
console.log('end');

/**
 * 1. call stack: all func running
 * 2. Node APIs: setTimeout will wait here, while others run in the call stack
 * 3. callback queue: when setTimeout finished wait, callback func will be in callback queue
 * 4. event loop: manage the callback queue only when the call stack is empty
 * 5. call stack --> Node APIs --> callback queue --> call stack
 */

// Request: simple HTTP client
const request = require('request');

// grab info from url
const url = 'https://api.darksky.net/';

request({
    url: url
}, (err, res) => {
    console.log(res) // res will be a long json file, and we need the body prop
    const data = JSON.parse(res.body) // convert json file to object
    console.log(data)
})

request({
    url: url,
    json: true
}, (err, res) => {
    console.log(res.body) // with json set to true, the object got auto
})

// add option setting to the url, this should refer to API document
const url = 'https://api.darksky.net?lang=eu&otherkey=othervalue'; // set the language as english

// Error Handle
request({
    url: url,
    json: true
}, (err, res) => {
    if (err) {
        console.log('Unable connect to server') // to provide readable error info
    } else if (res.body.error) {
        console.log('Unable find valid response')
    } else {
        console.log('Connectted!')
    }
})

// Callback Function: call a function in the future
setTimeout(() => {
    console.log('I am callback function!')
}, 2000)

const names = ['pian', '13', 'lyu']
const shortNames = names.filter((name) => {
    return name.length <= 4
})


/**
 * 1. you can just use it as normal func, get the return value
 */
const geocode = (add, callback) => {
    const data = {
        lati: 0,
        long: 0
    }
    return data
}
const val = geocode('place')
/**
 * 2. or you can use the callback function
 */
const geocode = (add, callback) => {
    setTimeout(() => {
        const data = {
            lati: 0,
            long: 0
        }
        //return data // this return is for the callback function in setTimeout, not for geocode
        callback(data) // this will call console.log(e)
    }, 2000)
}
geocode('place', (e) => {
    console.log(e)
})

// conbine the functions

const geocode = (add, callback) => {
    const url = 'https://api.darksky.net/';

    request({
        url: url,
        json: true
    }, (err, res) => {
        if (err) {
            callback('Unable to connect to server', undefined)
        } else if (res.body.features.length === 0) { // empty data
            callback('Unable to find location', undefined)
        } else { // return the data
            callback(undefined, {
                lati: res.body.features[0],
                long: res.body.features[1]
            })
        }
    })
}

geocode('place', (err, data) => {
    console.log('Error', err)
    console.log('Data', data)
})

// Callback Chaining

geocode('place', (err, data) => {
    if (err) {
        return console.log(err) // this return will finish the function
    }
    // in the callback function, call another function
    forecast(data.lati, data.long, (err, forecastData) => {
        if (err) {
            return console.log(err)
        }
        console.log('Data', forecastData)
    })
})

// Object Property Shorhand
const name = 'Lyu'
const userAge = 27
const user = {
    // name: name, // when the property is the same with var
    name,
    age: userAge,
    loc: 'San Diego'
}
