const fileSystem = require('node:fs')
const { promises } = fileSystem
const fs = promises

class ProductManagerFile {
    constructor() {
        this.path = './src/files/Products.json' 
    }

    readFileProducts = async () => {
        try {
            const productsJson = await fs.readFile(this.path, 'utf-8')
            return await JSON.parse(productsJson)            
        } catch (error) {
            return []
        }
    }

    getProduct = async () => await this.readFileProducts()

    getProductByID = async (pid)=> {
        const products = await this.readFileProducts()
       if(products.length === 0 ) return 'No existen productos' 


        const product = products.find(product => product.id == pid);
        if (!product) {
            return 'not found';
        }
    
        return product;

    
    }

    add = async ( { title, description, price, img, code, stock } ) => {
        if(!title || !description || !price || !img || !code || !stock) return 'ingrese todos los parámetros parametros'

        const products = await this.readFileProducts()        

        const productExist = products.findIndex(product => product.code === code) 

        if (productExist !== -1) return 'El producto con ese codigo ya existe'

        products.push({ title, description, price, img, code, stock, id: products.length + 1 })

        await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8' )

        return 'Producto agregado'
    }

    updateProduct = async (pid, fieldToUpdate, newValue) => {
        try {
            const products = await this.readFileProducts();

            const productIndex = products.findIndex(product => product.id === pid);

            if (!pid || !fieldToUpdate || newValue === undefined) {
                return ('Parámetros inválidos para la actualización');
            }

            if (productIndex === -1) {
                return ('No existe ese producto');
            }

            const productToUpdate = products[productIndex];

            if (!(fieldToUpdate in productToUpdate)) {
                return (`El campo '${fieldToUpdate}' no existe en el producto`);
            }

            productToUpdate[fieldToUpdate] = newValue;

            await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');

            return 'Producto actualizado exitosamente';
        } catch (error) {
            throw error;
        }
    }

    deleteProduct = async (pid) => {
        try {
            const products = await this.readFileProducts();

            const productIndex = products.findIndex(product => product.id === pid);

            if (productIndex === -1) {
                return ('No existe ese producto');
            }

            products.splice(productIndex, 1);

            await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');

            return 'Producto eliminado';
        } catch (err) {
            throw err;
        }
    }

}

const productFile = new ProductManagerFile();
module.exports = ProductManagerFile;

//Pruebas

//productFile.getProduct()
//.then(res => console.log(res))
//.catch(err => console.log(err))

// productFile.getProductByID(1)
// .then(res => console.log(res))
// .catch(err => console.log(err))

 //const prod = {
 //    title: 'prod 4',
 //    description: 'esta es una descripción',
 //    price: 1500,
 //    img: 'img',
 //    code: 9,
 //    stock: 150}
 //productFile.add(prod)
 //.then(res => console.log(res))
 //.catch(err => console.log(err))

// productFile.deleteProduct(1)
// .then(res => console.log(res))
// .catch(err => console.log(err))

//productFile.updateProduct(1, "stock", 100)
//.then(res => console.log(res))
//.catch(err => console.log(err))