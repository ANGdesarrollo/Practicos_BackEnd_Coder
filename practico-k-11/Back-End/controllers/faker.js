import faker from "faker";
import {log} from "../utils/logger.js";

export const fakerProducts = (req, res) => {
    try {
        const products = [];

        for (let i = 0; i < 5; i++) {
            const { commerce, image } = faker
            const product = {
                product: commerce.product(),
                price: commerce.price(),
                thumbnail: image.cats(190, 190, true)
            }
            products.push(product);
        }

        res.json({
            status: true,
            message: 'Faker JS products created successfully',
            products: products
        })

    } catch (err) {
        log.info(err)
        res.json({
            status: false,
            message: 'Products cant be created'
        })
    }
}
