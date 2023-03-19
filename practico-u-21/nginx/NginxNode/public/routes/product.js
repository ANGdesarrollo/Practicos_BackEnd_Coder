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
