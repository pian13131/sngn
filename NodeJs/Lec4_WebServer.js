// Express

/**
 * 1. import express
 */
const express = require('express')
const app = express()

/**
 * 2. access to different urls
 */ 
app.get('', (req, res) => {
    res.send('Hello, world!') // you can send html and even object
})

app.get('/help', (req, res) => {
    res.send('help')
})

/**
 * 3. start the server, it will keep running
 */
app.listen(3000, () => {
    console.log('Server is up!')
})

// Path: use to manage the path
const path = require('path')

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath)) // set the default home page, index.html
// if url becomes 3000/help, the express will search help.html in publicPath
// then you do not need app.get('/help') such stuff

// set
app.set('key', 'value')

// 404: mathced no url
app.get('*', (req, res) => { // match all url, this should be put in the file line
    res.send('My 404 Page')
})

