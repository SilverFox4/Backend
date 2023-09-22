const express = require('express')
const productRouter = require('./routes/productRouter.js')
const ProductManagerFile = require('./productManager')
const cartRouter = require('./routes/cartsRouter.js')


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/products', productRouter)
app.use('/carts', cartRouter)


app.listen(PORT, () => console.log('Listen port 8080'))