const express = require('express')
const productRouter = require('./routes/productRouter.js')
const ProductManagerFile = require('./productManager')


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/products', productRouter)


app.listen(PORT, () => console.log('Listen port 8080'))