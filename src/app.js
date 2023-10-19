const express = require('express')
const productRouter = require('./routes/productRouter.js')
const ProductManagerFile = require('./productManager')
const cartRouter = require('./routes/cartsRouter.js')
const handlebars = require('express-handlebars')
const view = require('./routes/view.routers.js')
const util = require('./utils.js')

const app = express()
const PORT = 8081

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('views', __dirname+'/views') 
app.set('view engine', 'hbs')

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', view)


app.listen(PORT, () => console.log('Listen port 8080'))