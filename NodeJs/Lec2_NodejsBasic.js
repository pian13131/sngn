//CoreModule

// file system
const fs = require('fs');
fs.writeFileSync('notes.txt', 'This file was created by nodejs');
fs.appendFileSync('notes.txt', 'I append some stuff');

//ImportFile

// in the app.js
var name = require('./out.js');
console.log(name);
// in the out.js
var myName = 'Mike';
module.exports = myName;

// export function, in the out.js

const add = (a, b) => {
    return a + b;
}

module.exports = add;

// npm module

// validator
const validator = require('validator');

validator.isEmail('sample@sample.com') // return True or False


// get the input of command line

const input = process.argv // return a list ['node path', 'js file path', 'input']

// 