const fileSystem = require('node:fs')
const { promises } = fileSystem
const fs = promises

class ProductManagerFile {
    constructor() {
        this.path = './files/Products.json' 
    }

    getProduct = async () => await this.readFileProducts()

    readFileProducts = async () => {
        try {
            const productsJson = await fs.readFile(this.path, 'utf-8')
            return await JSON.parse(productsJson)            
        } catch (error) {
            return []
        }
    }

    add = async ( { title, description, price, img, code, stock } ) => {
        if(!title || !description || !price || !img || !code || !stock) return 'ingrese todos los parámetros parametros'

        const products = await this.readFileProducts()        

        const productExist = products.findIndex(product => product.code === code) 

        if (productExist !== -1) return 'El producto con ese codigo ya existe'

        products.push({ title, description, price, img, code, stock, id: products.length + 1 })

        await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8' )

        return 'producto agregado'
    }

    getProductByID = async (id)=> {
        const products = await this.readFileProducts()
       if(products.length === 0 ) return 'no hay productos' 


        const product = this.product.find(product => product.id == id);
        if (!product) {
            return 'not found';
        }
    
        return product;

    
    }

}

const product = new ProductManagerFile();

product.getById(3)
.then(res => console.log(res))
.catch(err => console.log(err))
const prod = {
    title: 'prod 1',
    description: 'esta es una descripción',
    price: 1500,
    img: 'img',
    code: 2,
    stock: 150
}

