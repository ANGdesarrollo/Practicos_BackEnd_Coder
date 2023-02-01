import { Router } from 'express';
import { auth, destroySession, registerUser, isAuthenticated } from "../controllers/auth.js";
import passport from "passport";
import { checkAuthentication } from "../middlewares/authentication.js";

export const routerAuth = Router();

routerAuth.get('/', checkAuthentication, isAuthenticated)
routerAuth.get('/logout' , destroySession);
routerAuth.post( '/login', passport.authenticate('login'),  auth );
routerAuth.post('/register', passport.authenticate('signup'),  registerUser);



