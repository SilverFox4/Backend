const fileSystem = require('node:fs')
const { promises } = fileSystem
const fs = promises
const ProductManagerFile = require('./productManager')

const productManager = new ProductManagerFile()


class CartManagerFile {
    constructor() {
        this.cart = './src/files/Cart.json'
    }

    readFileCart = async () => {
        try {
            const productsJson = await fs.readFile(this.path, 'utf-8')
            return await JSON.parse(productsJson)            
        } catch (error) {
            return []
        }
    }

    getCart = async () => await this.readFileCart()

    addProductsCart = async (pid) => {

        const products = await productManager.getProductByID(pid)

        const cart = await this.readFileCart(products)

        const productExist = cart.findIndex(product => product.id === pid)

         
        

    }


}

const cartFile = new CartManagerFile

cartFile.addProductsCart(1)
.then(res => console.log(res))
.catch(err => console.log(err))