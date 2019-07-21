// Jestjs.io
/**
 * 1. npm i jest
 * 2. add script: :"test": "jest --watch"
 * 3. new test folder with js files  "filename.test.js"
 * 4. npm test
 */

/**
 * filename.test.js
 */
//    'test name'
test("Hello world", () => {}); // if it throw error, test failed

const calculateTip = (total, tipPercent) => {
  const tip = total * tipPercent;
  return total + tip;
};

module.exports = { calculateTip };

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13); // just like the if below
  // if (total !== 13) {
  //     throw new Error('Total tip should be 13. Got ' + total);
  // }
});

// test asychronized codes

test('Async test demo', () => {
    setTimeout(() => {
        expect(1).toBe(2) // this will not cause the test failed, pretty funny huh?
    }, 2000)
})

test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(2)
        done()
    }, 2000)
})

test('test Async add', (done) => {
    add(2, 3).then((sum) => { // or you can use async & await
        expect(sum).toBe(5)
        done()
    })
})

// test with API
// when you are in test mode, you can create a new env file

// config Jest
/**
 * in the package.json file, add:
 * "jest" : {
 *      "testEnvironment" : "node"
 * }
 */

// Mochajs
