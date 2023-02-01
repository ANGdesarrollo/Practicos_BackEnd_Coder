import { Router } from 'express';
import { auth, authVerification, destroySession } from "../controllers/auth.js";

export const routerAuth = Router();

routerAuth.get('/', authVerification)
routerAuth.get('/logout', destroySession)
routerAuth.post( '/',  auth );

