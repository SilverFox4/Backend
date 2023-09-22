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
       res.status(400).send('server error')
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
        const newProduct = req.body; 
        const addedProduct = await productManager.add(newProduct);
        res.status(201).json(addedProduct);
    } catch (error) {
        res.status(400).send('server error');
    }
});

router.post('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const updateProduct = req.body; 
        const updateProd = await productManager.updateProduct(pid, updateProduct);
        res.status(201).json(updateProd);
    } catch (error) {
        res.status(400).send('server error');
    }
});

router.delete(':pid', async (req, res) => {
    try {
    const { pid } = req.params
    const products = await productManager.deleteProduct(pid)
    res.status(201).json(products);
    } catch (error) {
        res.status(400).send('server error');
    }

})


module.exports = router;