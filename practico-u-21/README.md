# Entrega 21

```
Back-End = Realizado con Node JS y express.

Para inicializar este trabajo:
De el lado de ngNix, entrar a la carpeta NginxNode/public y para incializar el fork junto con sus respectivos clusters utilizar el comando "npm dev", para inicializarlo con nodemon utilizar "npm start" .
iniciarlizarlo con test utilizar "npm test"
```

## Consigna 

### Revisar en forma completa el proyecto entregable que venimos realizando, refactorizando y reformando todo lo necesario para llegar al esquema de servidor API RESTful (*solo la parte de productos tal cual dice en la otra diapositiva, o sea, pasar los res.render() a res.json() PERO NO BORRAR LOS RENDER SOLO COMENTAR PORQUE MAS ADELANTE VA A VOLVER!) en capas planteado en esta clase.

```
Mi proyecto esta hecho con un front en REACT asi que todas las respuestas son con .JSON.
```

### Asegurarse de dejar al servidor bien estructurado con su ruteo / controlador, servicio, negocio, validaciones (sobre todo el post y el put), persistencia y configuraciones (preferentemente utilizando en la codificación clases de ECMAScript).

```
Las capas estan separadas. Si hay algo que este mal estructurado agradezco la correccion.
Utilice clases para todos los routers y sus respectivos controladores / servicios.
```

Ejemplo endpoint products:

Router:

```
const express = require( 'express' );
const { ProductController } = require( "../controllers/productController" );
const Router = express.Router;
const router = Router();

class RouterProduct {
    constructor() {
        this. productController = new ProductController();
    }

    start() {
        router.post('/', this.productController.saveProduct);
        router.get('/', this.productController.getAllProducts);
        return router;
    }
}

module.exports = {
    RouterProduct
}
```

Controlador: En este controlador tuve un problema que no pude resolver, si te fijas, en saveProduct 
estoy llamando al servicio instanciando el servicio en la misma linea y no usando el constructor,
esto es debido a que si uso el constructor, por alguna razon me da undefined, no pude encontrar el problema

```
const logger = require( "../utils/winstonLogger/winstonLogger" );
const { ProductService } = require( "../services/productService" );

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async saveProduct( req, res ) {
        try {
            await new ProductService().saveProductService( req.body )

            res.status(201).json( {
                status: true,
                message: "Product successfully saved",
            } );
        } catch ( err ) {
            logger.error( err, `${ err }` );
        }
    }

    async getAllProducts( req, res ) {
        try {
            const products = await new ProductService().getAllProductsService()
            res.json( {
                status: true,
                data: products,
            } );
        } catch ( err ) {
            logger.error( err, `${ err }` );
        }
    }
}

module.exports = {
    ProductController,
};

```

Servicio:

```
const ProductDaos = require( '../daos/productsDaos/productDaos' );
const dayjs = require( "dayjs" );


class ProductService {
    constructor() {
        this.database = ProductDaos;
    }

    async saveProductService( product ) {
        try {
            if ( product.name && product.price && product.thumbnail ) {
                const dateNow = dayjs().format( 'YYYY/MM/DD hh:mm:ss' );
                const finalProduct = { ...product, timestamp: dateNow };
                await this.database.create( finalProduct );
            }
        } catch ( err ) {
            console.log( err );
        }
    }

    async getAllProductsService() {
        try {
            return await this.database.getAll()
        }catch(err) {
            console.log(err)
        }
    }
}

module.exports = {
    ProductService
}

```
Daos:
```
const CrudServiceFirebase = require( "../../container/firebaseContainer" );
const ProductModel = require( "../../models/product" );
const CrudServiceMongo = require( "../../container/mongoContainer" );

let ProductDaos;
let mode = process.env.DB

if ( mode === 'mongo' ) {
    class UserDaosModel extends CrudServiceMongo {
        constructor() {
            super( ProductModel );
        }
    }
    ProductDaos = new UserDaosModel();
}

if ( mode === 'firebase' ) {
    console.log("Soy factory y me llamaron desde firebase")
    class UserDaosModel extends CrudServiceFirebase {
        constructor() {
            super( ProductModel );
        }
    }
    ProductDaos = new UserDaosModel();
}

if (!mode) {
    throw new Error('No database Selected')
}

module.exports = ProductDaos;

```




## Consigna (cont.):

### Desarrollar un cliente de pruebas propio que utilice Axios para enviar peticiones, y realizar un test de la funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles, creación de productos, modificación y borrado (opcional).

```
Es opcional, no lo realicé.
```

### Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos (si o si).


```
const request = require( 'supertest' )( 'http://localhost:8080' );
const expect = require( 'chai' ).expect;
const faker = require( '@faker-js/faker' ).faker;

const generateProduct = () => {
    return {
        name: faker.commerce.productName(),
        date: faker.commerce.productName(),
        thumbnail: faker.image.imageUrl(),
        price: faker.commerce.price()
    }
}

describe( 'test all endpoints', () => {
    describe( 'GET ALL', () => {
        it( 'It should return status 200 and be an array', async () => {
            const res = await request.get( '/api/products' );
            expect( res.status ).to.eql( 200 );
            expect( res.body ).to.be.a( 'object' );
        } )
    } );

    describe( 'POST', () => {
        it( 'It should be a new post', async () => {
            const product = generateProduct();
            console.log(product)
            const res = await request.post( '/api/products' ).send( product )
            expect( res.status ).to.eql( 201);
            expect( res.body ).to.be.a( 'object' );
            expect( res.body ).to.include.keys('message', 'status');
        } )
    } )
} )
```

Respuesta al test = 


<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1679268228/test_passed_puasaz.png" width="500">
