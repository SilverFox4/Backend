const { Router } = require('express');
const ProductManagerFile = require('../productManager')

const router = Router()
const PORT = 8080
const productManager = new ProductManagerFile()



router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProduct()
        res.json(products)
    } catch (error) {
       res.status(400).send('Error en el servidor')
    }
})

router.get('/:id', async (req, res) => {
    const products = await productManager.getProduct()
    const { id } = req.params
    const product = products.find(products => products.id === Number(id))
    if (!product) {
        return res.status(400).send({error: 'no found product'})
    }
    
    res.json(product)
})

router.post('/', async (req, res) => {
    try {
        const newProduct = req.body; // Obtén el nuevo producto de la solicitud
        const addedProduct = await productManager.add(newProduct);
        res.status(201).json(addedProduct); // Responde con el producto agregado
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});



module.exports = router;