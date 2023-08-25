class ProductManager {
    constructor() {
        this.product = []
    }
    #precioBaseGanancia = 1.15

    getProduct = () => this.product

    addProduct = (title, description, price, thumbnail, code, stock = 50) => {
        const product = {
            title,
            description,
            price: price * this.#precioBaseGanancia,
            thumbnail,
            code,
            stock
        }
        
        const resultProduct = this.product.find(product => product.code === code);
        if (resultProduct) {
            return 'El código del producto ya está en uso.';
        }


        if (this.product.length == 0) {
            product.id = 1
        } else {
            product.id = this.product.length + 1
        }

        this.product.push(product)
    }

    getProductByID(id) {
        const product = this.product.find(product => product.id == id);
        if (!product) {
            return 'not found';
        }
    
        return product;
    }

}

const product = new ProductManager();

//Pruebas 
/* product.addProduct('Gato', 'Marrón', 400, '', '1');
product.addProduct('Gato', 'Naranja', 400, '', '2');
console.log(product.getProduct())
const productoEncontrado = product.getProductByID(3);
console.log(productoEncontrado);
product.addProduct('Gato', 'Naranja', 400, '', '2'); */


