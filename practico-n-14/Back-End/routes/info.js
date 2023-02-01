import { Router } from 'express';
import { getInfo } from '../controllers/info.js';
export const routerInfo = Router();

routerInfo.get('/', getInfo)
