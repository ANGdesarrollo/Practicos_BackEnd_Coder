import express from 'express';
import { config } from 'dotenv';
import productRouter from '../routes/products.js';
import cartRouter from'../routes/cart.js';
import  log from '../utils/logger.js';
import dbConnectionMongo from "../database/mongoDB/config.js";

config({ path:'./environment/.env' });

process.env.INSTANCE === 'Mongo' && await dbConnectionMongo();
process.env.INSTANCE === 'FileSystem' && log.info('FileSystem database Online');
process.env.INSTANCE === 'Memory' && log.info('Memory instance Online');

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    log.info(`Listening on http://localhost:${PORT}`);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);









