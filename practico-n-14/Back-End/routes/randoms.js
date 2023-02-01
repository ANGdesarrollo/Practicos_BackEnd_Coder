import { Router } from 'express';
import { calculateRandoms } from "../controllers/randoms.js";
export const routerRandoms = Router();

routerRandoms.post('/', calculateRandoms)
