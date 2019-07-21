// data type
var name = 'Max';
var age = 29;
var has = true;

function sum(name, age) {
    return 'name is ' + name + ' age is ' + age;
}

let name = 'scoped in block'; // var scoped in function
const cst = 'never change'

// arrow function
const sumArrow = (name, age) => {
    return 'name is ' + name + ' age is ' + age;
}

const add = (a, b) => a + b;
const add1 = a => a + 1;
const hello = () => 'hello';

// object
const person = {
    name: 'Max',
    age: 29,
    greet() {
        console.log('Hi, ' + this.name); // this is person
    }
};

person.greet();

// array
const arr = ['name', 'age', 29, true];
for (let e in arr) {
    console.log(e);
}

arr.map(e => {
    return e + '!';
}); // return a new same array and apply to func

// spread
const cped = arr.slice();
const samecped = [...arr]; // pulled out all elements
const cpperson = {
    ...person
};

// rest
const toArray = (a, b, c) => {
    return [a, b, c];
};
const restToArray = (...args) => {
    return args;
}
restToArray(1, 2, 3, 4, 4, 5);

// destructuring
const printName = (personData) => {
    console.log(personData.name);
}
printName(person);

const printName = ({
    name
}) => { // only receive name
    console.log(name);
}
// distruc object and array
const {
    name,
    age
} = person;
const [e1, e2] = arr;

// Async
setTimeout(() => {
    console.log('Timer is done!');
}, 2000) // wait 2s to finished, async

const fetch = callback => {
    setTimeout(() => {
        callback('Done!');
    }, 1500);
}

setTimeout(() => {
    console.log('Timer is done!');
    fetch(text => { // the callback function passed in fetch is print(text)
        console.log(text);
    });
}, 2000) // wait 2s to finished, async

// promise
let toCleanRoom = new Promise((resolve, reject) => {
    // cleaning the room

    const isClean = true;
    if (isClean) {
        resolve('Clean');
    } else {
        reject('not Clean');
    }
});

toCleanRoom.then(fromResolve => {
    console.log('the room is ' + fromResolve);
}).catch(fromReject => {
    console.log('the room is ' + fromReject);
})

// Template Literals
const name = 'Max';
const age = 29;
console.log(`My name is ${name} and ${age} years old`);