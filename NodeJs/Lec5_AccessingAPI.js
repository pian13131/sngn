// query string
const query = 'localhost:3000/products?serach=game&rating=5'
// this will result the req contain a object
const reqObject = {
    serach: game,
    rating: 5,
}
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Unvalid search'
        })
    }
    req.send({
        products: []
    })
})

// Default Function Parameters
// just like python

// fetch: frontend receive the data from backend
// This is a Promise
fetch('http://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log(data)
    })
})

// this is running on the client side
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // avoid refresh
    const location = search.value
})