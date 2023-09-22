const { Router } = require('express');
const CartManagerFile = require('../cartManager')

const router = Router()
const cartManager = new CartManagerFile()

router.post('/', async (req, res) => {
    try {
        const carts = await cartManager.createCart()
        res.json(carts)
    }
    catch{
        res.status(400).send('server error')
    }
})

router.get('/:cid', async (req, res) => {
    const carts = await cartManager.getCart()
    const { cid } = req.params
    const cart = carts.find(cart => cart.cid === Number(cid))
    if (!cart) {
        return res.status(400).send({error: 'no found cart'})
    }
    
    res.json(cart)

})
 
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addCart(cid, pid)
        console.log(cart)
        res.status(201).json(cart)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
        
 })
module.exports = router