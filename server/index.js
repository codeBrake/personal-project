require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const bodyParser = require('body-parser')
const stripe = require('stripe')(process.env.STRIPEAPIKEY_PRIVATE)


const ac = require('./controllers/Auth')
const pc = require('./controllers/Products')
const cc = require('./controllers/Cart')
const sc = require('./controllers/Search')
const bc = require('./controllers/Boots')
const bindc = require('./controllers/Bindings')
const gc = require('./controllers/Goggles')

const app = express()

const {CONNECTION_STRING, SERVER_PORT: PORT, SESSION_SECRET} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is connected bro')
})

app.use(bodyParser.json())

app.use(express.static( `${__dirname}/../build` ) )

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.post('/auth/login', ac.login)
app.post('/auth/register', ac.register)
app.get('/auth/logout', ac.logout)
app.get('/auth/currentUser', ac.getCurrentUser)

app.get('/api/cart', cc.getCart)
app.post('/api/cart', cc.addToCart)
app.put('/api/cart/:id', cc.updateQuantity)
app.delete('/api/cart/checkout', cc.checkout)
app.delete('/api/cart/:id', cc.deleteItem)


app.get('/api/products', pc.getProducts)
app.get('/api/products/search', sc.searchProducts)
app.get('/api/products/:id', pc.getProductDetails)

app.get('/api/boots', bc.getBoots)
app.get('/api/bindings', bindc.getBindings)
app.get('/api/goggles', gc.getGoggles)

app.post('/charge', async (req, res) => {
    try {
        let {amount} = req.body
        
        console.log(req.body)
      let {status} = await stripe.charges.create({
        amount,
        currency: "usd",
        description: "An example charge",
        source: req.body.data.token
      });
  
      res.json({status});
    } catch (err) {
        console.log(123455678789, err)
      res.status(500).end();
    }
  });

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
