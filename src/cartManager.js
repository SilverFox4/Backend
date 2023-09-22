const fileSystem = require('node:fs')
const { promises } = fileSystem
const fs = promises
const ProductManagerFile = require('./productManager')

const productManager = new ProductManagerFile()


class CartManagerFile {
    constructor() {
        this.path = './src/files/Carts.json'
    }

    readFileCarts = async () => {
        try {
            const cartsJson = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(cartsJson);
        } catch (error) {
            return [];
        }
    }

    getCart = async () => await this.readFileCarts();

    getCartByCID = async (cid)=> {
        const carts = await this.readFileCarts()
       if(carts.length === 0 ) return 'No existen productos' 


        const cart = carts.find(cart => cart.id == cid);
        if (!cart) {
            return 'not found';
        }
    
        return cart;
    
    }

    createCart = async () => {
        const carts = await this.readFileCarts();

        if (!Array.isArray(carts)) {
            carts = [];
        }

        const newCart = { cid: carts.length + 1, products: [] };
        carts.push(newCart);

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
        return newCart;
    }
    
    addCart = async ({ cid, pid }) => {
        try {
            const carts = await this.readFileCarts();
            const cart = carts.find((cart) => cart.cid == cid);
    
            if (!cart) {
                return { error: 'Carrito no encontrado' };
            }
    
            const products = await productManager.readFileProducts();
            const productIndex = products.findIndex(product => product.id === pid);
    
            if (productIndex === -1) {
                return { error: 'No existe ese producto' };
            }
    
            const existingProductIndex = cart.products.findIndex((p) => p.productId == pid);
    
            if (existingProductIndex === -1) {
                cart.products.push({ productId: pid, quantity: 1 });
            } else {
                cart.products[existingProductIndex].quantity += 1;
            }
    
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
    
            return { success: 'Producto agregado al carrito', cart: cart };
        } catch (error) {
            throw error;
        }
    }
    
}


const cartFile = new CartManagerFile();
module.exports = CartManagerFile;

//cartFile.addCart({ cid: 1, pid: 5 })
//.then(res => console.log(res))
//.catch(err => console.log(err))
