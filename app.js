const express = require('express')
const ProductManagerFile = require('./src/productManager')

const app = express()
const productManager = new ProductManagerFile()

app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProduct()
        res.json(products)
    } catch (error) {
       res.send('Error en el servidor')
    }
})

app.get('/products/:id', async (req, res) => {
    const products = await productManager.getProduct()
    const { id } = req.params
    const product = products.find(products => products.id === Number(id))
    if (!product) {
        return res.send({error: 'no se encuentra el producto'})
    }
    
    res.json(product)
})

app.listen(8080, () => console.log('Escuchando en el puerto 8080'))